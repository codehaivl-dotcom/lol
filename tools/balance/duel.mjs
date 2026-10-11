// Cổ Linh balance: 1v1 duel simulator. Reads scripts/lib/data/heroes.yml. Run: bun tools/balance/duel.mjs [--n 300] [--json out.json]
// A duel is a line: two heroes start 14 m apart and fight to the death (40 s cap = draw, half a win each).
// What it models: stats by level, item gold by level (builds table), ranks by level (D1), cooldowns, cost, windups,
// skillshot/area dodge by sidestep and the V dodge (08 §3), CC, dashes, shields, heals, bleed/burn/mark passives.
// What it does not: terrain, minions, towers, teammates, player skill. A 1v1 number is a tuning signal, not truth.
import DATA from "../../scripts/lib/data/heroes.yml";
// Candidate roster (doc 23 §0.1): kits that are NOT playable ride here only, never in heroes.yml slice/lobby. tools/balance/cand.mjs fills it.
const HEROES = { ...DATA.heroes }, BUILDS = { ...DATA.builds };
export function addCandidates(heroes = {}, builds = {}) { Object.assign(HEROES, heroes); Object.assign(BUILDS, builds); }
export const heroData = (id) => HEROES[id];

export const LEVELS = [4, 7, 10, 13];
export const GOLD = { 4: 1500, 7: 3800, 10: 6200, 13: 9300 };   // vàng đã tiêu tới cấp đó (ước tính nhịp trận 25 phút)
const DT = 0.05, MAXT = 40, START = 14;
const DODGE = { stamina: 25, cd: 1.5, iframe: 0.42, chance: 0.35 };

function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
const rankOf = (slot, L) => slot === "r" ? [6, 11, 15].filter((x) => x <= L).length : [1, 3, 5, 7, 9].filter((x) => x <= L).length;
const at = (v, r) => Array.isArray(v) ? v[Math.max(0, Math.min(v.length - 1, r - 1))] : v;

export function makeHero(id, L, gold, mult = {}) {
  const k = HEROES[id], b = BUILDS[k.build], g = gold / 1000, s = {};
  for (const key of Object.keys(k.stats)) s[key] = k.stats[key] + (L - 1) * (k.growth[key] ?? 0);
  const baseAd = s.ad;
  s.hp += (b.hp ?? 0) * g; s.ad += (b.ad ?? 0) * g; s.ap = (s.ap ?? 0) + (b.ap ?? 0) * g;
  s.armor += (b.armor ?? 0) * g; s.mr += (b.mr ?? 0) * g; s.attackSpeed *= 1 + (b.attackSpeed ?? 0) * g;
  const hpM = mult.hp ?? 1, dmgM = mult.dmg ?? 1;
  s.hp *= hpM;
  return { id, k, L, s, bonusAd: s.ad - baseAd, magicPen: (b.magicPenFlat ?? 0) * g, armorPen: Math.min(0.35, (b.armorPenPct ?? 0) * g), dmgM,
    hp: s.hp, res: s.resource, x: 0, cds: {}, lockUntil: 0, pending: null, shields: [], stunUntil: 0, rootUntil: 0,
    charmUntil: 0, slows: [], untargetUntil: 0, iframeUntil: 0, dodgeAt: 0, stamina: 100, atkReady: 0, hitN: 0,
    bleed: { n: 0, until: 0 }, burns: [], mark: null, empowered: false, buffs: [], lastHurt: -9, ultReady: L >= 6,
    lastSlot: null, pendingRoot: null };
}

function ms(h, t) {
  let m = h.s.moveSpeed * (1 + h.buffs.filter((b) => b.until > t).reduce((a, b) => a + (b.moveSpeed ?? 0), 0));
  const sl = h.slows.filter((x) => x.until > t).reduce((a, x) => Math.max(a, x.pct), 0);
  return m * (1 - sl);
}
const aspd = (h, t) => h.s.attackSpeed * (1 + h.buffs.filter((b) => b.until > t).reduce((a, b) => a + (b.attackSpeed ?? 0), 0));
const hardCC = (h, t) => h.stunUntil > t || h.charmUntil > t;

function raw(src, d, r, tgt) {
  if (!d) return 0;
  let v = at(d.base, r) ?? 0;
  v += (d.ad ?? 0) * src.s.ad + (d.bonusAd ?? 0) * src.bonusAd + (d.ap ?? 0) * src.s.ap + (d.perLevel ?? 0) * (src.L - 1) + (d.selfMaxHp ?? 0) * src.s.hp;
  if (d.missingHp && tgt) v += d.missingHp * (tgt.s.hp - tgt.hp);
  return v * src.dmgM;
}
function hurt(src, tgt, amount, type, t, log) {
  if (amount <= 0 || tgt.hp <= 0) return 0;
  if (type === "physical") amount *= 100 / (100 + Math.max(0, tgt.s.armor * (1 - (src.armorPen ?? 0))));
  else if (type === "magic") amount *= 100 / (100 + Math.max(0, tgt.s.mr - src.magicPen));
  if (tgt.mark && tgt.mark.until > t) { const m = tgt.mark; tgt.mark = null; hurt(m.src, tgt, m.amount, m.type, t, log); }
  let left = amount;
  for (const sh of tgt.shields) { if (sh.until <= t || sh.amt <= 0) continue; const a = Math.min(sh.amt, left); sh.amt -= a; left -= a; if (log) log.absorbed[tgt.id] = (log.absorbed[tgt.id] ?? 0) + a; if (sh.amt <= 0 && sh.burst && !sh.popped) { sh.popped = true; sh.popNow = true; } }
  tgt.hp -= left; tgt.lastHurt = t;
  if (log) log.dealt[src.id] = (log.dealt[src.id] ?? 0) + amount;
  return amount;
}
function applyEffects(src, tgt, list, t, log) {
  for (const e of list ?? []) {
    if (log) log.cc[src.id] = (log.cc[src.id] ?? 0) + (e.stun ?? 0) + (e.root ?? 0) + (e.charm ?? 0) + (e.slow ? (e.duration ?? 1) * e.slow : 0);
    if (e.after) { // a tether: the root lands after `after` s unless the target walked out of holdRange first
      const gap = Math.abs(tgt.x - src.x);
      if (gap + ms(tgt, t) * e.after * 0.5 <= e.holdRange) tgt.pendingRoot = { at: t + e.after, dur: e.root };
      continue;
    }
    if (e.stun) tgt.stunUntil = Math.max(tgt.stunUntil, t + e.stun);
    if (e.root) tgt.rootUntil = Math.max(tgt.rootUntil, t + e.root);
    if (e.charm) tgt.charmUntil = Math.max(tgt.charmUntil, t + e.charm);
    if (e.slow) tgt.slows.push({ pct: e.slow, until: t + (e.duration ?? 1) });
  }
}
function onAbilityHit(src, tgt, t, log) {
  const p = src.k.passive;
  if (p?.type === "burn_on_ability") { tgt.burns.push({ src, dps: (p.maxHp * tgt.s.hp) / p.duration, until: t + p.duration }); if (p.antiHeal) tgt.antiHeal = { pct: p.antiHeal, until: t + p.duration }; }
  if (p?.type === "after_ability") src.empowered = true;
}
function addBleed(src, tgt, n, t) {
  if (src.k.passive?.type !== "bleed") return;
  const p = src.k.passive;
  tgt.bleed = { src, n: Math.min(p.maxStacks, (tgt.bleed.until > t ? tgt.bleed.n : 0) + n), until: t + p.duration };
}

// chance a shot lands: the target sidesteps out of the width, or spends a V dodge
function landChance(src, tgt, ab, dist, t, R) {
  if (tgt.untargetUntil > t) return 0;
  const travel = ab.aim === "skillshot" ? ab.windup + dist / ab.speed : (ab.windup ?? 0) + (ab.delay ?? 0);
  const ccLeft = Math.max(tgt.stunUntil, tgt.rootUntil, tgt.charmUntil) - t;
  if (ccLeft >= travel) return 0.97;
  const free = Math.max(0, travel - 0.25 - Math.max(0, ccLeft));
  const need = ab.aim === "skillshot" ? ab.width / 2 + 0.5 : (ab.radius ?? 2) * 0.8;
  let p = Math.min(0.95, Math.max(0.2, 1 - (ms(tgt, t) * free) / (need * 2.4)));
  if (free > 0.15 && tgt.dodgeAt <= t && tgt.stamina >= DODGE.stamina && R() < DODGE.chance) {
    tgt.dodgeAt = t + DODGE.cd; tgt.stamina -= DODGE.stamina;
    const dp = tgt.k.passive; if (dp?.type === "dodge_stealth") { tgt.untargetUntil = Math.max(tgt.untargetUntil, t + dp.stealth); tgt.empowered = true; }
    return 0;
  }
  return p;
}

function abilityRange(ab) { return ab.aim === "area" && !ab.range ? ab.radius : ab.aim === "self" ? Infinity : ab.range; }

function wantCast(h, e, slot, ab, dist, t) {
  const hpPct = h.hp / h.s.hp, ePct = e.hp / e.s.hp;
  if (ab.aim === "self") {
    if (ab.dash && ab.dash.toward === false) return dist < 4.5;
    if (ab.shield) return t - h.lastHurt < 1 && hpPct < 0.9;
    if (ab.buff) return dist < (h.k.lmb.range + 4);
    return false;
  }
  if (ab.mimic) { const m = mimicOf(h, ab, 1); if (!m) return false; ab = m; if (m.aim === "self") return true; }
  const r = abilityRange(ab) + (ab.aim === "area" && ab.range ? ab.radius * 0.5 : 0);
  if (dist > r + 0.2) return false;
  if (slot === "r") {
    if (ab.damage?.missingHp || ab.damage?.perStack) return ePct < 0.4 || hpPct < 0.25;
    if (ab.heal) return hpPct < 0.5 || dist < ab.radius * 0.6;
    if (ab.dash && ab.dash.toward === false) return ePct < 0.35 || dist < 4;
    return true;
  }
  if (ab.dash && ab.dash.toward === false) return dist < 4;
  return true;
}

function mimicOf(h, ab, rank) { // R that repeats the last basic skill (Bách Diện Đổi Bóng): its numbers ×scale at R rank
  const src = h.lastSlot && h.k[h.lastSlot]; if (!src) return null;
  const sc = at(ab.mimic.scale, rank), d = src.damage;
  return { ...src, windup: ab.windup ?? src.windup, cooldown: ab.cooldown, cost: ab.cost, damage: d && { ...d, base: (Array.isArray(d.base) ? d.base[Math.min(d.base.length - 1, 2 * rank)] : d.base) * sc, ad: (d.ad ?? 0) * sc, ap: (d.ap ?? 0) * sc, bonusAd: (d.bonusAd ?? 0) * sc } };
}
function castStart(h, e, slot, ab, rank, t) {
  if (ab.mimic) { const m = mimicOf(h, ab, rank); if (m) ab = { ...m, mimicked: true }; }
  if (slot !== "r") h.lastSlot = slot;
  h.cds[slot] = t + at(ab.cooldown, rank);
  h.res -= at(ab.cost, rank) ?? 0;
  if (slot === "r") h.ultReady = false;
  if (ab.dash && ab.aim === "target") h.untargetUntil = Math.max(h.untargetUntil, t + (ab.untargetable ?? 0));
  h.pending = { slot, ab, rank: ab.mimicked ? Math.min(5, 1 + 2 * rank) : rank, at: t + (ab.windup ?? 0) };
  h.lockUntil = t + (ab.windup ?? 0);
}
function resolve(h, e, R, t, log) {
  const { slot, ab, rank } = h.pending; h.pending = null;
  const dir = Math.sign(e.x - h.x) || 1;
  let dist = Math.abs(e.x - h.x);
  if (ab.aim === "self") {
    if (ab.shield) h.shields.push({ amt: raw(h, { base: ab.shield.base, ap: ab.shield.ap, ad: ab.shield.ad }, rank) + (ab.shield.maxHp ?? 0) * h.s.hp, until: t + ab.shield.duration, burst: ab.shield.burst, rank, src: h });
    if (ab.shield && h.k.passive?.type === "shield_strike") h.empowered = true;
    if (ab.buff) h.buffs.push({ moveSpeed: ab.buff.moveSpeed ?? 0, attackSpeed: at(ab.buff.attackSpeed ?? 0, rank), until: t + ab.buff.duration });
    if (ab.dash && ab.dash.toward === false) h.x -= dir * ab.dash.distance;
    if (ab.knockback && dist <= 4) { e.x += dir * ab.knockback; e.slows.push({ pct: 0.3, until: t + 1.0 }); }
    if (ab.cleanse) { h.slows = []; h.rootUntil = Math.min(h.rootUntil, t); if (ab.cleanse === "bleed") h.bleed = { n: 0, until: 0 }; }
    return;
  }
  if (ab.dash && ab.dash.toward === false) { h.x -= dir * ab.dash.distance; dist = Math.abs(e.x - h.x); }
  let chance;
  if (ab.aim === "target" || ab.aim === "melee") chance = dist <= (ab.range ?? 3) + 0.6 && e.untargetUntil <= t ? 1 : 0;
  else if (ab.aim === "area" && !ab.range) chance = dist <= ab.radius ? (ab.delay ? landChance(h, e, ab, dist, t, R) : 1) : 0;
  else if (dist > ab.range + (ab.radius ?? 0) * 0.5 + (ab.width ?? 0) / 2) chance = 0;
  else chance = landChance(h, e, ab, dist, t, R);
  if (ab.dash && ab.dash.toward) {
    const go = Math.min(ab.dash.distance, Math.max(0, dist - 1.2));
    h.x += dir * go;
  }
  if (ab.heal?.self && !ab.heal.damageShare) heal(h, raw(h, { base: ab.heal.base, ap: ab.heal.ap }, rank), log, t);
  if (ab.heal?.ally && log) log.allyHeal[h.id] = (log.allyHeal[h.id] ?? 0) + raw(h, { base: ab.heal.base, ap: ab.heal.ap }, rank); // a heal that only lands on an ally: offered, never on self in a 1v1
  if (ab.shield?.allies) h.shields.push({ amt: raw(h, { base: ab.shield.base }, rank), until: t + ab.shield.duration });
  const hits = ab.hits ?? 1;
  let landed = 0, dealt = 0;
  for (let i = 0; i < hits; i++) if (R() < chance) landed++;
  if (!landed) return;
  let amt = raw(h, ab.damage, rank, e);
  if (ab.damage?.perStack) amt *= 1 + at(ab.damage.perStack, rank) * (e.bleed.until > t ? e.bleed.n : 0);
  for (let i = 0; i < landed; i++) dealt += hurt(h, e, amt, ab.damage?.type ?? "physical", t, log);
  if (ab.heal?.damageShare) heal(h, dealt * ab.heal.damageShare, log, t);
  if (ab.stacks) addBleed(h, e, ab.stacks, t);
  if (ab.mark) e.mark = { src: h, amount: raw(h, ab.mark, rank), type: ab.mark.type, until: t + 4 };
  if (ab.pull) { const nd = Math.max(1.2, Math.abs(e.x - h.x) - ab.pull); e.x = h.x + (Math.sign(e.x - h.x) || 1) * nd; }
  if (ab.knockback) e.x += (Math.sign(e.x - h.x) || 1) * ab.knockback, e.stunUntil = Math.max(e.stunUntil, t + 0.4);
  applyEffects(h, e, ab.effects, t, log);
  onAbilityHit(h, e, t, log);
}
function heal(h, amount, log, t = -1) { if (h.antiHeal && h.antiHeal.until > t) amount *= 1 - h.antiHeal.pct; const before = h.hp; h.hp = Math.min(h.s.hp, h.hp + amount); if (log) log.healed[h.id] = (log.healed[h.id] ?? 0) + h.hp - before; }

function autoAttack(h, e, t, R, log) {
  const lmb = h.k.lmb, dist = Math.abs(e.x - h.x);
  if (dist > lmb.range + 0.3 || e.untargetUntil > t) return false;
  const iv = 1 / aspd(h, t);
  h.atkReady = t + iv; h.lockUntil = t + Math.min(0.35, iv * 0.3);
  h.hitN++;
  let amt = h.s.ad * h.dmgM, type = "physical";
  if (lmb.damageType === "magic") { amt = (h.s.ad + (lmb.ap ?? 0) * h.s.ap) * h.dmgM; type = "magic"; }
  hurt(h, e, amt, type, t, log);
  const p = h.k.passive;
  if (h.thirdHit && h.hitN % 3 === 0) hurt(h, e, h.thirdHit * h.dmgM, "physical", t, log);   // item on-hit (economy.yml thirdHit)
  if (p?.type === "every_nth_hit" && h.hitN % p.n === 0) { hurt(h, e, raw(h, p.bonusDamage, 1), p.bonusDamage.type, t, log); applyEffects(h, e, p.effects, t, log); }
  if (p?.type === "bleed") addBleed(h, e, 1, t);
  if (p?.type === "cdr_on_hit") for (const k of Object.keys(h.cds)) if (k !== "r" || p.ult) h.cds[k] -= p.seconds;
  if ((p?.type === "after_ability" || p?.type === "dodge_stealth" || p?.type === "shield_strike") && h.empowered) { h.empowered = false; hurt(h, e, raw(h, p.bonusDamage, 1), p.bonusDamage.type, t, log); }
  return true;
}

function think(h, e, t, R, log) {
  if (h.hp <= 0) return;
  if (h.pendingRoot && t >= h.pendingRoot.at) { h.rootUntil = Math.max(h.rootUntil, t + h.pendingRoot.dur); h.pendingRoot = null; }
  if (h.pending && t >= h.pending.at) resolve(h, e, R, t, log);
  if (t < h.lockUntil) return;
  const dir = Math.sign(e.x - h.x) || 1, dist = Math.abs(e.x - h.x);
  if (h.stunUntil > t) return;
  if (h.charmUntil > t) { h.x += dir * Math.min(dist - 1, ms(h, t) * 0.5 * DT); return; }
  for (const slot of ["r", "e", "rmb", "q"]) {
    const ab = h.k[slot]; const rank = rankOf(slot, h.L);
    if (!ab || !rank || (h.cds[slot] ?? 0) > t || h.res < (at(ab.cost, rank) ?? 0)) continue;
    if (slot === "r" && !h.ultReady) continue;
    if (h.rootUntil > t && ab.dash) continue;
    if (!wantCast(h, e, slot, ab, dist, t)) continue;
    castStart(h, e, slot, ab, rank, t); return;
  }
  if (t >= h.atkReady && autoAttack(h, e, t, R, log)) return;
  if (h.rootUntil > t) return;
  const range = h.k.lmb.range, eRange = e.k.lmb.range;
  let want = range - 0.4;
  let step = 0;
  if (dist > want) step = dir;
  else if (range > eRange + 2 && dist < want - 0.8) step = -dir;   // kite
  h.x += step * Math.min(Math.abs(dist - want) + 0.01, ms(h, t) * DT);
}

function tickDots(h, t) {
  if (h.hp <= 0) return;
  if (h.bleed.until > t && h.bleed.n) { const s = h.bleed.src; hurt(s, h, raw(s, s.k.passive.perStack, 1) * h.bleed.n * DT, "physical", t); }
  for (const b of h.burns) if (b.until > t) hurt(b.src, h, b.dps * DT, "magic", t);
  h.hp = Math.min(h.s.hp, h.hp + h.s.hpRegen * DT);
  h.res = Math.min(h.s.resource, h.res + h.s.resourceRegen * DT);
  h.stamina = Math.min(100, h.stamina + 18 * DT);
}

// a shield that bursts (Hạo Nhật Vỡ Nắng) when broken or when it runs out: area damage around its owner
function shieldBursts(h, e, t, log) {
  for (const sh of h.shields) {
    if (!sh.burst || sh.popped === "done") continue;
    if (sh.popNow || (sh.until <= t && !sh.popped)) {
      sh.popped = "done"; sh.popNow = false;
      if (Math.abs(e.x - h.x) <= sh.burst.radius && e.untargetUntil <= t) { hurt(h, e, raw(h, sh.burst, sh.rank), sh.burst.type, t, log); applyEffects(h, e, sh.burst.effects, t, log); }
    }
  }
}
export function duel(aId, bId, L, seed, mults = {}) {
  const R = rng(seed);
  const a = makeHero(aId, L, GOLD[L], mults[aId]), b = makeHero(bId, L, GOLD[L], mults[bId]);
  a.x = 0; b.x = START;
  const log = { dealt: {}, healed: {}, absorbed: {}, cc: {}, allyHeal: {} };
  let t = 0;
  const first = R() < 0.5 ? [a, b] : [b, a];
  while (t < MAXT && a.hp > 0 && b.hp > 0) {
    think(first[0], first[1], t, R, log); think(first[1], first[0], t, R, log);
    tickDots(a, t); tickDots(b, t); shieldBursts(a, b, t, log); shieldBursts(b, a, t, log);
    t += DT;
  }
  const w = a.hp > 0 && b.hp <= 0 ? 1 : b.hp > 0 && a.hp <= 0 ? 0 : 0.5;
  return { w, t, log };
}

export function matrix(ids, n, mults = {}, levels = LEVELS) {
  const m = {}; let seed = 1;
  for (const a of ids) m[a] = {};
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    let wa = 0, cnt = 0, len = 0;
    for (const L of levels) for (let k = 0; k < n; k++) { const r = duel(ids[i], ids[j], L, seed++, mults); wa += r.w; len += r.t; cnt++; }
    m[ids[i]][ids[j]] = wa / cnt; m[ids[j]][ids[i]] = 1 - wa / cnt;
  }
  return m;
}

if (import.meta.main) {
  const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
  const n = +arg("--n", 300), ids = DATA.slice;
  const m = matrix(ids, n);
  const pad = (s, w) => String(s).padEnd(w);
  console.log(pad("", 9) + ids.map((x) => pad(x, 9)).join("") + "avg");
  for (const a of ids) {
    const row = ids.map((b) => a === b ? pad("-", 9) : pad((m[a][b] * 100).toFixed(0) + "%", 9)).join("");
    const avg = ids.filter((b) => b !== a).reduce((s, b) => s + m[a][b], 0) / (ids.length - 1);
    console.log(pad(a, 9) + row + (avg * 100).toFixed(1) + "%");
  }
  const out = arg("--json"); if (out) await Bun.write(out, JSON.stringify(m, null, 1));
}

// 2026-10-09 item pass: a duel between two ready heroes (items already on them). bIdle = b never acts (a TTK dummy that still regens).
export function fightReady(a, b, seed, { bIdle = false, maxT = MAXT } = {}) {
  const R = rng(seed);
  a.x = 0; b.x = START;
  const log = { dealt: {}, healed: {}, absorbed: {}, cc: {}, allyHeal: {} };
  let t = 0;
  const first = R() < 0.5 ? [a, b] : [b, a];
  while (t < maxT && a.hp > 0 && b.hp > 0) {
    for (const h of first) if (!(bIdle && h === b)) think(h, h === a ? b : a, t, R, log);
    tickDots(a, t); tickDots(b, t); shieldBursts(a, b, t, log); shieldBursts(b, a, t, log);
    t += DT;
  }
  const w = a.hp > 0 && b.hp <= 0 ? 1 : b.hp > 0 && a.hp <= 0 ? 0 : 0.5;
  return { w, t, log, aHp: Math.max(0, a.hp) / a.s.hp, bHp: Math.max(0, b.hp) / b.s.hp };
}
