// Cổ Linh balance, profile `slice` (doc14 §G2 bước 2): one lane, Mạch Giữa, the numbers that SHIP.
// Reads structures/minions from scripts/lib/data/structures.yml and gold/xp/respawn from economy.yml; nothing is retuned here.
// OFF (not shipped in Slice): The Call, Titan, camps/jungle, fortify, keeps, boons, the V1 ×3,5 trial HP.
// Remaining abstractions (named in every report): 1 s steps; fights resolved by summed hero power ^ fightExponent, not skills or
// positions; hero strength from duel.mjs makeHero (stats + build gold); a wave that out-trades reaches the tower for
// `reachSeconds` of its raw structure dps × the trade margin [TBD-MEASURE, doc14 §G2 bước 3]; hero lane siege uses the V1 model's
// margin formula; defenders hold under a structure by the V1 `defense` factors; tower shots on the front hero use `waveTank`.
// Run: bun tools/balance/match.mjs --profile slice [--n 300] [--seed 1000] [--mode tai_hien:5|tai_hien:1|dau_may|san_tap|all] [--reach 6]
import ST from "../../scripts/lib/data/structures.yml";
import ECO from "../../scripts/lib/data/economy.yml";
import DATA from "../../scripts/lib/data/heroes.yml";
import { heroPower, RULES as V1 } from "./match.mjs";
import { makeHero } from "./duel.mjs";
import MAP from "../../scripts/lib/data/map.yml";

export const ASSUMED = {          // model knobs, not game numbers: each is replaced by a measurement or stays labelled
  reachSeconds: 6,                // [TBD-MEASURE] s of raw wave dps a winning wave lands on the structure per cycle
  fightExponent: V1.fightExponent, fightChance: V1.fightChance, waveTank: V1.waveTank,
  defense: V1.defense,            // hold factor of defenders under t1/t2/core
  heroSiegeMargin: 2,             // V1 laning formula: Σ hero siege × 2 × trade margin
  window: [12, 20],               // khung ĐỀ XUẤT (chưa duyệt, G2); only reported, never a pass
  travelGate: true,               // 2026-10-08 (Wisp C): no structure takes damage before a wave can WALK to it (GEO below); --no-travel = the earlier model
  idleReach: 0,                   // [FIT g2-compare] s of wave dps per won cycle when NEITHER side has a hero on the lane (case a); 0 = earlier model (never sieges)
};

// Mạch Giữa geometry from map.yml (the route lane.js walks: own nexus → lane points → enemy nexus; spawn 16 m up the route).
// Used for: wave travel time to each enemy structure (the earliest a siege mark can exist). Not used: brush, river, positions in fights.
const P = (a) => ({ x: a[0], z: a[1] });
const ROUTE = [P(MAP.nexus.blue), ...MAP.lane.map(P), P(MAP.nexus.red)];
const seg = ROUTE.slice(1).map((b, i) => Math.hypot(b.x - ROUTE[i].x, b.z - ROUTE[i].z));
const along = (pt) => {   // distance along the blue route of the closest point to pt
  let best = 1e9, at = 0, acc = 0;
  for (let i = 0; i < seg.length; i++) {
    const a = ROUTE[i], b = ROUTE[i + 1], dx = b.x - a.x, dz = b.z - a.z, u = Math.max(0, Math.min(1, ((pt.x - a.x) * dx + (pt.z - a.z) * dz) / (seg[i] ** 2)));
    const d = Math.hypot(a.x + dx * u - pt.x, a.z + dz * u - pt.z); if (d < best) { best = d; at = acc + seg[i] * u; } acc += seg[i];
  }
  return at;
};
export const GEO = (() => {
  const L = seg.reduce((a, b) => a + b, 0), spawn = 16, lead = ST.minions.kinds.caster.speed;
  const tw = MAP.towers, dist = { "t1.red": along(P(tw["tower-red-t1"].at)), "t2.red": along(P(tw["tower-red-t2"].at)), "nexus.red": L };
  for (const k of ["t1", "t2", "nexus"]) dist[`${k}.blue`] = dist[`${k}.red`];   // point symmetry: red walks the mirrored route
  const hit = Math.max(...Object.values(ST.minions.kinds).map((k) => k.range));   // the first blow comes from the longest reach (caster)
  const reach = (k) => Math.max(0, dist[k] - spawn - (k.startsWith("nexus") ? ST.nexus.radius : ST.towerRadius) - hit);
  const travel = Object.fromEntries(Object.keys(dist).map((k) => [k, +(reach(k) / lead).toFixed(1)]));
  const meet = +((L / 2 - spawn) / lead).toFixed(1);
  return { routeLength: +L.toFixed(1), spawnAlong: spawn, leadSpeed: lead, meetSeconds: meet, alongRoute: Object.fromEntries(Object.entries(dist).map(([k, v]) => [k, +v.toFixed(1)])),
    travelSeconds: travel, earliestSiege: Object.fromEntries(Object.entries(travel).map(([k, v]) => [k, +(ST.minions.firstWave + v).toFixed(1)])) };
})();

function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
const K = ST.minions.kinds;
const dps = (k) => k.damage / k.interval * (k.structMult ?? 1);
const WAVE = ST.minions.composition.reduce((a, n) => ({ dps: a.dps + dps(K[n]), gold: a.gold + K[n].gold, xp: a.xp + K[n].xp }), { dps: 0, gold: 0, xp: 0 });
const SUPER = { dps: dps(K.super), gold: K.super.gold, xp: K.super.xp };
const T = ST.tower, NX = ST.nexus;

// mode → heroes per side: [blue, red]; san_tap = one hero, no enemy hero (red side holds waves and structures only)
export function sides(mode) {
  if (mode === "waves") return [0, 0];   // G2 case a: no hero pushes (host idle at fountain)
  if (mode === "san_tap") return [1, 0];
  if (mode === "dau_may") return [1, 1];
  const n = +(mode.split(":")[1] ?? 5); return [n, n];
}

export function playSlice(seed, mode, a = ASSUMED) {
  const R = rng(seed), ids = DATA.slice, [nb, nr] = sides(mode);
  const pick = (n) => [...ids].sort(() => R() - 0.5).slice(0, n);
  const teams = [pick(nb), pick(nr)].map((c, ti) => c.map((id) => ({ id, team: ti, xp: 0, L: 1, gold: ECO.startGold, deadUntil: 0, hurt: 0 })));
  const all = teams.flat();
  const S = [0, 1].map(() => ({ t1: T[1].hp, t2: T[2].hp, hp: NX.hp, shield: NX.shield, lastHit: -99 }));
  const ev = { down: {}, siege: {}, kills: [0, 0], fights: 0 };
  const alive = (h, t) => h.deadUntil <= t;
  const pw = (h) => heroPower(h.id, h.L, h.gold * 0.85);
  const giveXp = (h, xp) => { h.xp += xp; while (h.L < ECO.maxLevel && h.xp >= ECO.xpTable[h.L - 1]) { h.xp -= ECO.xpTable[h.L - 1]; h.L++; } };
  const kill = (h, t, by) => {
    h.deadUntil = t + ECO.respawn; h.hurt = 0; ev.kills[1 - h.team]++;
    const w = (by ?? []).filter((x) => alive(x, t));
    if (w.length) { const k = w[Math.floor(R() * w.length)]; k.gold += ECO.heroKill.gold; giveXp(k, ECO.heroKill.xp); }
  };
  const name = (def, p) => `${p}.${def ? "red" : "blue"}`;
  const piece = (def) => S[def].t1 > 0 ? "t1" : S[def].t2 > 0 ? "t2" : "nexus";
  // damage on team def's lane: T1 → T2 → Tâm Mạch (shield first), the lock order of lane.js; true = the match ends
  const siege = (def, raw, t) => {
    if (!(raw > 0)) return false;   // no real damage: no siege mark, no shield-regen refresh
    const s = S[def], p = piece(def);
    if (a.travelGate && t < GEO.earliestSiege[name(def, p)]) return false;   // nobody has walked there yet
    ev.siege[name(def, p)] ??= t;
    if (p !== "nexus") {
      const tier = p === "t1" ? 1 : 2;
      s[p] -= raw * 100 / (100 + T[tier].armor);
      if (s[p] <= 0) { ev.down[name(def, p)] = t; for (const h of teams[1 - def]) { h.gold += 150; giveXp(h, 120); } }   // lane.js fall(): 150 g + 120 xp each
      return false;
    }
    let d = raw * 100 / (100 + NX.armor); const soak = Math.min(s.shield, d); s.shield -= soak; d -= soak; s.hp -= d; s.lastHit = t;
    if (s.hp <= 0) { ev.down[name(def, "nexus")] = t; return true; }
    return false;
  };
  let push = null, beamOn = null, beamRamp = 0;
  for (let t = 0; t < 3600; t++) {
    for (const h of all) if (alive(h, t)) h.gold += ECO.passiveGold;
    for (const ti of [0, 1]) { const s = S[ti]; if (t - s.lastHit > NX.shieldRegenAfter) s.shield = Math.min(NX.shield, s.shield + NX.shield * 0.25); }
    if (t >= ST.minions.firstWave && (t - ST.minions.firstWave) % ST.minions.waveInterval === 0) {
      if (!push && nb && nr && R() < a.fightChance) {
        ev.fights++;
        const sd = [0, 1].map((ti) => teams[ti].filter((h) => alive(h, t)));
        if (sd[0].length && sd[1].length) {
          const P = sd.map((x) => x.reduce((q, h) => q + pw(h).power, 0)), pA = P[0] ** a.fightExponent / (P[0] ** a.fightExponent + P[1] ** a.fightExponent);
          const w = R() < pA ? 0 : 1, l = 1 - w;
          const lost = Math.max(1, Math.round(sd[l].length * (0.3 + R() * 0.5))), traded = Math.round(lost * R() * 0.5);
          [...sd[l]].sort(() => R() - 0.5).slice(0, lost).forEach((h) => kill(h, t, sd[w]));
          [...sd[w]].sort(() => R() - 0.5).slice(0, Math.min(traded, sd[w].length - 1)).forEach((h) => kill(h, t, sd[l]));
          push = { team: w, until: t + Math.min(45, Math.max(0, ...teams[l].map((h) => h.deadUntil - t))) };
        }
      }
      const on = (ti) => teams[ti].filter((h) => alive(h, t));
      const pA = on(0).reduce((q, h) => q + pw(h).power, 0) + 1, pB = on(1).reduce((q, h) => q + pw(h).power, 0) + 1;
      const idle = !nb && !nr;   // case a: waves alone; a coin decides who out-trades this cycle, margin 1 × idleReach
      const share = pA ** 2 / (pA ** 2 + pB ** 2), lw = R() < share ? 0 : 1, m = idle ? (a.idleReach > 0 ? 1 : 0) : Math.abs(share - 0.5) * 2;
      for (const ti of [0, 1]) { const here = on(ti); for (const h of here) { h.gold += (WAVE.gold * (ti === lw ? 0.8 : 0.55)) / here.length; giveXp(h, WAVE.xp * 0.8 / here.length); } }
      const supers = ST.minions.superPerTower * ["t1", "t2"].filter((p) => S[1 - lw][p] <= 0).length;
      const minionSiege = (WAVE.dps + supers * SUPER.dps) * (idle ? a.idleReach : a.reachSeconds) * m;
      const heroSiege = on(lw).reduce((q, h) => q + pw(h).siege, 0) * a.heroSiegeMargin * m;
      if (siege(1 - lw, minionSiege + heroSiege, t)) return { winner: lw, t, ev, teams };
    }
    // a push: after a won fight, or whenever the defending side has nobody alive (Sân Tập, a wipe)
    for (const ti of [0, 1]) if (!push && teams[ti].some((h) => alive(h, t)) && !teams[1 - ti].some((h) => alive(h, t))) push = { team: ti, until: t + 30 };
    if (push && t < push.until) {
      const atk = teams[push.team].filter((h) => alive(h, t)), def = teams[1 - push.team].filter((h) => alive(h, t));
      const p = piece(1 - push.team), hold = a.defense[p === "nexus" ? "core" : p];
      const pAtk = atk.reduce((q, h) => q + pw(h).power, 0), pDef = def.reduce((q, h) => q + pw(h).power, 0);
      if (!atk.length || (def.length && pDef * (1 + hold) >= pAtk)) { push = null; beamOn = null; continue; }
      const front = atk[0];
      if (p === "nexus") {   // the beam picks heroes first and ramps on one target: no wave tanking
        if (beamOn !== front) { beamOn = front; beamRamp = 0; }
        const hs = makeHero(front.id, front.L, front.gold * 0.85).s;
        front.hurt += NX.beamDamage * (1 + beamRamp) / NX.beamInterval * 100 / (100 + hs.mr); beamRamp += NX.beamRamp;
      } else front.hurt += T[1].damage / T[1].interval * (1 - a.waveTank);
      if (front.hurt >= makeHero(front.id, front.L, front.gold * 0.85).s.hp * 0.7) { kill(front, t, def); beamOn = null; }
      // tick order: the structure shoots first; a hero it kills this step does not siege in the same step
      const raw = atk.filter((h) => alive(h, t)).reduce((q, h) => q + pw(h).siege, 0) + WAVE.dps * 0.6;
      if (siege(1 - push.team, raw, t)) return { winner: push.team, t, ev, teams };
    } else { push = null; beamOn = null; }
  }
  return { winner: -1, t: 3600, ev, teams };
}

const q = (xs, p) => { const v = [...xs].sort((x, y) => x - y); return v.length ? v[Math.floor(p * (v.length - 1))] : null; };
const mm = (s) => s == null ? "—" : (s / 60).toFixed(1);
export function summarize(mode, n, seed, a = ASSUMED) {
  const runs = Array.from({ length: n }, (_, i) => playSlice(seed + i, mode, a));
  const T = runs.filter((r) => r.winner >= 0).map((r) => r.t), ended = T.length;   // percentiles over ENDED matches; timeouts counted apart
  const inWin = runs.filter((r) => r.winner >= 0 && r.t >= a.window[0] * 60 && r.t <= a.window[1] * 60).length;
  const pieces = ["t1.red", "t2.red", "nexus.red", "t1.blue", "t2.blue", "nexus.blue"];
  const per = Object.fromEntries(pieces.map((k) => {
    const d = runs.filter((r) => r.ev.down[k] != null), br = d.map((r) => r.ev.down[k] - r.ev.siege[k]);
    return [k, { n: d.length, downMed: mm(q(d.map((r) => r.ev.down[k]), 0.5)), breakMed: mm(q(br, 0.5)) }];
  }));
  return { mode, n, seeds: [seed, seed + n - 1], ended: +(ended / n).toFixed(3), timeout60: n - ended, inProposedWindow: +(inWin / n).toFixed(3),
    p10: mm(q(T, 0.1)), median: mm(q(T, 0.5)), p90: mm(q(T, 0.9)),
    medianAllCensored: mm(q(runs.map((r) => r.t), 0.5)),   // timeouts counted as 60' (a lower bound, not an end)
    blueWin: +(runs.filter((r) => r.winner === 0).length / n).toFixed(3),
    killsPerMatch: +(runs.reduce((s, r) => s + r.ev.kills[0] + r.ev.kills[1], 0) / n).toFixed(1),
    endLevel: +(runs.reduce((s, r) => s + r.teams.flat().reduce((x, h) => x + h.L, 0) / Math.max(1, r.teams.flat().length), 0) / n).toFixed(1), per };
}

export function run(argv) {
  const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
  const n = +arg("--n", 300), seed = +arg("--seed", 1000), m = arg("--mode", "all");
  const a = { ...ASSUMED, reachSeconds: +arg("--reach", ASSUMED.reachSeconds), idleReach: +arg("--idle-reach", ASSUMED.idleReach), travelGate: !argv.includes("--no-travel") };
  const modes = m === "all" ? ["waves", "san_tap", "dau_may", "tai_hien:1", "tai_hien:2", "tai_hien:5"] : [m];
  const out = { profile: "slice", geo: GEO, data: { structures: { t1: T[1], t2: T[2], nexus: NX }, wave: WAVE, super: SUPER, economy: { startGold: ECO.startGold, passiveGold: ECO.passiveGold, respawn: ECO.respawn, heroKill: ECO.heroKill } },
    assumed: a, off: ["call", "titan", "camps", "fortify", "keeps", "boons", "v1_x3.5_hp"], results: modes.map((x) => summarize(x, n, seed, a)) };
  console.log(JSON.stringify(out, null, 1));
  return out;
}
if (import.meta.main) run(process.argv.slice(2));
