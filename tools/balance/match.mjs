// Cổ Linh balance: 5v5 macro match simulator, one step per second. Answers "how long is a match" (target 20–35 min, 04 §3).
// Model: three lanes with their own structures (T1 → T2 → Tâm Mạch), 30 s waves, laning to 14:00, then grouped play;
// teamfights at every Call and at random after laning; winners siege while the losers' death timers run.
// Hero strength comes from heroes.yml stats + rank damage at the hero's level and gold (duel.mjs makeHero).
// Numbers it tunes: structures (D5), death timer by level, kill/structure gold. Run: bun tools/balance/match.mjs [matches]
import DATA from "../../scripts/lib/data/heroes.yml";
import { makeHero } from "./duel.mjs";

export const RULES = {
  xpTable: [280, 380, 480, 580, 700, 820, 940, 1080, 1220, 1380, 1540, 1720, 1900, 2100],
  passiveGold: 3, startGold: 500,
  wave: { every: 30, first: 5, gold: 171, xp: 290, hp: 2960, siegeDps: 132, reachSeconds: 6 },   // 3 melee + 2 caster + 1 siege, raw dps; reachSeconds = giây một wave thắng thế đánh được vào trụ
  structures: { t1: { hp: 9800, armor: 40 }, t2: { hp: 18900, armor: 65 }, core: { hp: 14000, armor: 20, shield: 10500, shieldRegenAfter: 12 } },   // ×3,5 so với 08 §7 (sweep 2026-10-07)
  towerDps: 125,                       // 150 / 1,2 s
  waveTank: 0.75,
  coreBeam: { dps: 260, perStandingT2: 0.35 },   // tia Tâm Mạch (08 §7.2 [TBD-SIM]): dps × (1 + 0,35 × số Trấn Mạch còn đứng)                      // phần phát bắn trụ trúng lính thay vì tướng
  superWave: 1.5,                      // lane wave siege × khi Trấn Mạch lane đó sụp
  deathTimer: { base: 12, perLevel: 2.0 },
  killGold: 300, assistShare: 0.5, killXp: 300,
  structureGold: { t1: 150, t2: 250 },   // mỗi người trong đội
  laningEnds: 14 * 60,
  fightExponent: 1.6,
  catchUp: { scale: 2.0, max: 0.35 },   // đội thua vàng nhận thêm vàng/XP lính: min(35%, 2 × tỉ lệ thua vàng)
  defense: { t1: 0.6, t2: 0.9, core: 1.3 },   // phòng thủ dưới trụ: sức mạnh người thủ × (1 + giá trị)
  fortify: { until: 840, reduction: 0.7 },   // Trụ T1/T2 nhận ít sát thương hơn trước 10:00 (đề xuất)
  fightChance: 0.15,                   // mỗi chu kỳ 30 s sau laning
  callFirst: 150 + 45, callNextDelay: 30 + 45,   // pit mở 02:30 + 45 s capture; Call sau: horn → 30 s → 45 s capture
  titan: { hp: 9000, structureShare: 0.034, every: 1.6, towerTrue: 333 },
};

function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

export function heroPower(id, L, gold) {
  const h = makeHero(id, L, gold), k = h.k;
  let dps = h.s.ad * h.s.attackSpeed;
  for (const slot of ["q", "rmb", "e", "r"]) {
    const ab = k[slot]; const rank = slot === "r" ? [6, 11, 15].filter((x) => x <= L).length : [1, 3, 5, 7, 9].filter((x) => x <= L).length;
    if (!ab?.damage || !rank) continue;
    const d = ab.damage, at = (v) => Array.isArray(v) ? v[rank - 1] : v;
    const v = (at(d.base) ?? 0) + (d.ad ?? 0) * h.s.ad + (d.bonusAd ?? 0) * h.bonusAd + (d.ap ?? 0) * h.s.ap;
    dps += (v * (ab.hits ?? 1)) / (slot === "r" ? 45 : at(ab.cooldown));
  }
  const ehp = h.s.hp * (1 + (h.s.armor + h.s.mr) / 200);
  const siege = h.s.ad * h.s.attackSpeed;
  return { power: Math.sqrt(dps * ehp), siege };
}

export function playMatch(seed, rules = RULES) {
  const R = rng(seed), ids = DATA.slice;
  const pick = () => [...ids].sort(() => R() - 0.5).slice(0, 5);
  const teams = [pick(), pick()].map((comp, ti) => comp.map((id, i) => ({ id, team: ti, lane: ["top", "mid", "bot", "bot", "jungle"][i], xp: 0, L: 1, gold: rules.startGold, deadUntil: 0 })));
  const all = teams.flat();
  const lanes = ["top", "mid", "bot"];
  const S = [0, 1].map(() => Object.fromEntries(lanes.map((l) => [l, { t1: rules.structures.t1.hp, t2: rules.structures.t2.hp }])));
  const core = [0, 1].map(() => ({ hp: rules.structures.core.hp, shield: rules.structures.core.shield, lastHit: -99 }));
  const stat = { kills: [0, 0], fights: 0, calls: 0, log: globalThis.TRACE ? [] : null };
  let nextCall = rules.callFirst, titan = null;
  const giveXp = (h, xp) => { h.xp += xp; while (h.L < 15 && h.xp >= rules.xpTable[h.L - 1]) { h.xp -= rules.xpTable[h.L - 1]; h.L++; } };
  const alive = (h, t) => h.deadUntil <= t;
  const pw = (h) => heroPower(h.id, h.L, h.gold * 0.85);
  const kill = (h, t, by) => {
    h.deadUntil = t + rules.deathTimer.base + rules.deathTimer.perLevel * (h.L - 1);
    stat.kills[1 - h.team]++;
    const winners = all.filter((x) => x.team !== h.team && alive(x, t) && (!by || by.includes(x)));
    if (winners.length) { const k = winners[Math.floor(R() * winners.length)]; k.gold += rules.killGold; giveXp(k, rules.killXp); for (const w of winners) if (w !== k) w.gold += rules.killGold * rules.assistShare / Math.max(1, winners.length - 1); }
  };
  // damage on team `def`'s lane `l`: outermost standing piece takes it; returns true when the match ends
  const src = (stat.src ??= {}); let tag = '';
  const siege = (def, l, raw, t, pierce = false) => {
    src[tag] = (src[tag] ?? 0) + raw;
    const s = S[def][l], f = t < rules.fortify.until ? 1 - rules.fortify.reduction : 1, m = (a) => pierce ? 1 : 100 / (100 + a);

    if (s.t1 > 0) { s.t1 -= raw * f * m(rules.structures.t1.armor); if (s.t1 <= 0) { stat.log?.push(`${(t/60).toFixed(1)} t1 ${def} ${l} by ${tag}`); } if (s.t1 <= 0) for (const h of teams[1 - def]) h.gold += rules.structureGold.t1; return false; }
    if (s.t2 > 0) { s.t2 -= raw * f * m(rules.structures.t2.armor); if (s.t2 <= 0) { stat.log?.push(`${(t/60).toFixed(1)} t2 ${def} ${l} by ${tag}`); } if (s.t2 <= 0) for (const h of teams[1 - def]) h.gold += rules.structureGold.t2; return false; }
    if (!lanes.some((x) => S[def][x].t2 <= 0)) return false;
    const c = core[def]; let d = raw * m(rules.structures.core.armor);
    const a = Math.min(c.shield, d); c.shield -= a; d -= a; c.hp -= d; c.lastHit = t;
    return c.hp <= 0;
  };
  const fight = (t, members) => {
    stat.fights++;
    const sides = [0, 1].map((ti) => members.filter((h) => h.team === ti && alive(h, t)));
    if (!sides[0].length || !sides[1].length) return sides[0].length ? 0 : sides[1].length ? 1 : -1;
    const P = sides.map((s) => s.reduce((a, h) => a + pw(h).power, 0));
    const e = rules.fightExponent, pA = P[0] ** e / (P[0] ** e + P[1] ** e);
    const win = R() < pA ? 0 : 1, lose = 1 - win;
    const lost = Math.max(1, Math.round(sides[lose].length * (0.3 + R() * 0.5)));
    const traded = Math.round(lost * R() * 0.5);
    [...sides[lose]].sort(() => R() - 0.5).slice(0, lost).forEach((h) => kill(h, t, sides[win]));
    [...sides[win]].sort(() => R() - 0.5).slice(0, Math.min(traded, sides[win].length - 1)).forEach((h) => kill(h, t, sides[lose]));
    return win;
  };
  let push = null;   // { team, lane, until }
  const behind = (ti) => { const g = [0, 1].map((x) => teams[x].reduce((a, h) => a + h.gold, 0)); return g[ti] < g[1 - ti] ? Math.min(rules.catchUp.max, (g[1 - ti] - g[ti]) / Math.max(1, g[1 - ti]) * rules.catchUp.scale) : 0; };
  for (let t = 0; t < 3600; t++) {
    for (const h of all) if (alive(h, t)) h.gold += rules.passiveGold;
    for (const ti of [0, 1]) { const c = core[ti]; if (t - c.lastHit >= rules.structures.core.shieldRegenAfter) c.shield = rules.structures.core.shield; }
    // the Call: a fight at the pit; the winner's Titan walks the weakest enemy lane
    if (t === nextCall) {
      stat.calls++;
      const w = fight(t, all.filter((h) => alive(h, t)));
      if (w >= 0) { const lane = lanes.reduce((a, l) => (S[1 - w][l].t1 + S[1 - w][l].t2 < S[1 - w][a].t1 + S[1 - w][a].t2 ? l : a)); titan = { team: w, lane, hp: rules.titan.hp * (1 + 0.06 * (avgL(all) - 1)) * [1, 1.15, 1.35, 1.7, 2.1, 2.6, 3.2, 3.9][Math.min(7, stat.calls - 1)] }; push = { team: w, lane, until: t + 40 }; }
      nextCall = -1;
    }
    if (titan) {
      const s = S[1 - titan.team][titan.lane], piece = s.t1 > 0 ? rules.structures.t1.hp : s.t2 > 0 ? rules.structures.t2.hp : 0;
      tag = 'titan'; if (piece && siege(1 - titan.team, titan.lane, piece * rules.titan.structureShare / rules.titan.every, t, true)) return { winner: titan.team, t, stat, teams };
      titan.hp -= rules.titan.towerTrue + teams[1 - titan.team].filter((h) => alive(h, t)).reduce((a, h) => a + pw(h).siege * 0.6, 0);
      if (titan.hp <= 0 || !piece) { titan = null; nextCall = t + rules.callNextDelay; }
    }
    // waves: every 30 s, each lane resolves who pushes this cycle
    if (t >= rules.wave.first && (t - rules.wave.first) % rules.wave.every === 0) {
      const late = t >= rules.laningEnds;
      if (late && R() < rules.fightChance && !push) {
        const w = fight(t, all.filter((h) => alive(h, t)));
        if (w >= 0) { const lane = lanes.reduce((a, l) => (S[1 - w][l].t1 + S[1 - w][l].t2 < S[1 - w][a].t1 + S[1 - w][a].t2 ? l : a)); const longest = Math.max(0, ...teams[1 - w].map((h) => h.deadUntil - t)); push = { team: w, lane, until: t + Math.min(45, longest) }; }
      }
      for (const l of lanes) {
        const on = (ti) => teams[ti].filter((h) => alive(h, t) && (late ? true : h.lane === l || (h.lane === "jungle" && R() < 0.25)));
        const pA = on(0).reduce((a, h) => a + pw(h).power, 0) + 1, pB = on(1).reduce((a, h) => a + pw(h).power, 0) + 1;
        const share = pA ** 2 / (pA ** 2 + pB ** 2), lw = R() < share ? 0 : 1;
        for (const ti of [0, 1]) { const here = on(ti); const cu = 1 + behind(ti); for (const h of here) { h.gold += cu * (rules.wave.gold * (ti === lw ? 0.8 : 0.55)) / (late ? 5 : here.length); giveXp(h, cu * rules.wave.xp * 0.8 / (late ? 3 : here.length)); } }
        for (const h of all.filter((x) => x.lane === "jungle" && alive(x, t) && !late)) { h.gold += 70; giveXp(h, 120); }
        if (!late && R() < 0.05 + 0.3 * Math.abs(share - 0.5)) { const v = on(1 - lw); if (v.length) kill(v[0], t, on(lw)); }
        // minions that out-trade reach the tower: a fraction of a wave's siege
        const sup = S[1 - lw][l].t2 <= 0 ? rules.superWave : 1;   // own T2 down = the enemy's waves are stronger: lw pushes harder into 1-lw? (super waves belong to the attacker)
        const mine = S[lw === 0 ? 1 : 0][l].t2 <= 0 ? rules.superWave : 1;
        const minionSiege = rules.wave.siegeDps * rules.wave.reachSeconds * Math.abs(share - 0.5) * 2 * mine;
        const heroSiege = late ? 0 : on(lw).reduce((a, h) => a + pw(h).siege, 0) * 2 * Math.abs(share - 0.5) * 2;
        tag = 'lane'; if (siege(1 - lw, l, minionSiege + heroSiege, t)) return { winner: lw, t, stat, teams };
        void sup;
      }
    }
    if (push && t < push.until) {
      const attackers = teams[push.team].filter((h) => alive(h, t));
      const defenders = teams[1 - push.team].filter((h) => alive(h, t));
      const piece0 = S[1 - push.team][push.lane], hold = piece0.t1 > 0 ? rules.defense.t1 : piece0.t2 > 0 ? rules.defense.t2 : rules.defense.core;
      const pAtk = attackers.reduce((a, h) => a + pw(h).power, 0), pDef = defenders.reduce((a, h) => a + pw(h).power, 0);
      if (!attackers.length || pDef * (1 + hold) >= pAtk) { push = null; continue; }
      const raw = attackers.reduce((a, h) => a + pw(h).siege, 0) + rules.wave.siegeDps * 0.6;
      // the tower shoots: the wave tanks most shots, the rest land on the frontline hero
      const piece = S[1 - push.team][push.lane];
      {
        const atCore = !(piece.t1 > 0 || piece.t2 > 0);
        const standing = lanes.filter((x) => S[1 - push.team][x].t2 > 0).length;   // beam Tâm Mạch mạnh hơn khi còn nhiều Trấn Mạch
        const dps = atCore ? rules.coreBeam.dps * (1 + rules.coreBeam.perStandingT2 * standing) : rules.towerDps;
        const front = attackers[0]; front.towerHurt = (front.towerHurt ?? 0) + dps * (1 - rules.waveTank);
        if (front.towerHurt >= makeHero(front.id, front.L, front.gold * 0.85).s.hp * 0.7) { front.towerHurt = 0; kill(front, t, defenders); }
      }
      tag = 'push'; if (siege(1 - push.team, push.lane, raw, t)) return { winner: push.team, t, stat, teams };
    } else push = null;
  }
  return { winner: -1, t: 3600, stat, teams };
}
const avgL = (all) => all.reduce((a, h) => a + h.L, 0) / all.length;

export function summary(n, rules = RULES) {
  const mins = [], levels = []; let done = 0, ok = 0, kills = 0;
  for (let i = 0; i < n; i++) { const r = playMatch(1000 + i, rules); mins.push(r.t / 60); levels.push(avgL(r.teams.flat())); kills += r.stat.kills[0] + r.stat.kills[1]; if (r.winner >= 0) done++; if (r.t >= 1200 && r.t <= 2100) ok++; }
  mins.sort((a, b) => a - b);
  const q = (p) => mins[Math.floor(p * (mins.length - 1))].toFixed(1);
  return { n, ended: done / n, inWindow: ok / n, p10: q(0.1), median: q(0.5), p90: q(0.9), avgEndLevel: (levels.reduce((a, b) => a + b, 0) / n).toFixed(1), killsPerMatch: (kills / n).toFixed(1) };
}
if (import.meta.main) {
  if (process.argv.includes('--profile') && process.argv[process.argv.indexOf('--profile') + 1] === 'slice') { const { run } = await import('./slice.mjs'); run(process.argv.slice(2)); }
  else console.log(summary(+(process.argv[2] ?? 300)));
}
