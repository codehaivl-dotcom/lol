// Bộ giả lập chuẩn Cổ Linh (doc 73) · động cơ giao tranh: mặt phẳng 2D (x,z), bước 0,05 s, nhiều đơn vị, nhiều phe.
// Công thức trùng runtime: chỉ số = base + (L-1)·growth, tuning.hp/dmg, đồ cộng như items.js addItemStats, giảm sát thương
// 100/(100+kháng−xuyên) như combat.js hurt, cấp chiêu như combat.js rankOf. Trụ/lính từ structures.yml, quái/boss từ objectives.yml.
// KHÔNG mô phỏng: địa hình, tường, tầm nhìn, đường đạn bị chặn bởi thân (trừ luật passMinions), bụi cỏ, điều khiển tay thật.
import { kit as KIT, ST, OBJ, itemDef, GATES } from "./data.mjs";
import { inArc, shotLanes, fanStruck } from "../../scripts/lib/kitmech.js";
export const DT = 0.05;
const DODGE = { stamina: 25, cd: 1.5, iframe: 0.42 };

export function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
export const rankOf = (slot, L) => slot === "r" ? [6, 11, 15].filter((x) => x <= L).length : [1, 3, 5, 7, 9].filter((x) => x <= L).length;
const at = (v, r) => Array.isArray(v) ? v[Math.max(0, Math.min(v.length - 1, r - 1))] : v;
const d2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const norm = (x, z) => { const l = Math.hypot(x, z) || 1; return { x: x / l, z: z / l }; };
const toward = (a, b) => norm(b.x - a.x, b.z - a.z);
const step = (u, dir, dist) => { u.pos.x += dir.x * dist; u.pos.z += dir.z * dist; };

let UID = 0;
function unit(kind, team, pos, extra) {
  return { uid: `${kind}-${++UID}`, kind, team, pos: { x: pos.x, z: pos.z ?? 0 }, r: 0.5, shields: [], slows: [], buffs: [], burns: [],
    stunUntil: 0, rootUntil: 0, charmUntil: 0, charmBy: null, untargetUntil: 0, pendingRoot: null, cds: {}, lockUntil: 0, pending: null,
    atkReady: 0, hitN: 0, bleed: { n: 0, until: 0 }, mark: null, lastHurt: -99, dead: false, aggro: {}, armorPen: 0, magicPen: 0,
    heat: 0, cuongNhip: null, staffUntil: 0, chimeTimer: 0,
    by: {}, procs: {}, casts: {}, m: { dealt: 0, heroDealt: 0, taken: 0, healed: 0, allyHealed: 0, absorbed: 0, shieldGiven: 0, cc: 0, kills: 0, deaths: 0, diedAt: null }, ...extra };
}

// ── đơn vị ───────────────────────────────────────────────────────────────────────────────────────────────
export function heroUnit(id, { level = 1, items = [], team = "blue", pos = { x: 0, z: 0 }, profile = "newbie", hpPct = 1 } = {}) {
  const k = KIT(id), s = {};
  for (const key of Object.keys(k.stats)) s[key] = k.stats[key] + (level - 1) * (k.growth[key] ?? 0);
  s.hp *= k.tuning?.hp ?? 1;
  const baseAd = s.ad; s.ap = s.ap ?? 0;
  const P = {}; let relic = null;
  for (const iid of items) {
    const it = itemDef(iid); if (!it) continue;
    s.ad += it.ad ?? 0; s.ap += it.ap ?? 0; s.hp += it.hp ?? 0; s.armor += it.armor ?? 0; s.mr += it.mr ?? 0;
    s.hpRegen += it.hpRegen ?? 0; s.moveSpeed += it.moveSpeed ?? 0; s.attackSpeed *= 1 + (it.attackSpeed ?? 0);
    if (it.passive?.implemented && !P[it.passive.group]) P[it.passive.group] = it.passive;
    if (it.active) relic = { ...it.active, readyAt: 0 };
  }
  const prof = GATES.players[profile];
  return unit("hero", team, pos, { id, name: id, k, L: level, s, bonusAd: s.ad - baseAd, dmgM: k.tuning?.dmg ?? 1, hp: s.hp * hpPct, res: s.resource,
    stamina: 100, dodgeAt: 0, ultReady: level >= 6, items, P, relic, itemCd: {}, prof, profile, lastSlot: null, empowered: false, heroCombatAt: -99, castAt: -99 });
}
export function towerUnit(tier, team, pos) {
  const T = ST.tower[tier];
  return unit("tower", team, pos, { id: `tower${tier}`, tier, s: { hp: T.hp, armor: T.armor, mr: T.mr }, hp: T.hp, r: ST.towerRadius, range: T.range, interval: T.interval, damage: T.damage, streak: { uid: null, n: 0 }, fixed: true });
}
export function minionUnit(kind, team, pos) {
  const K = ST.minions.kinds[kind];
  return unit("minion", team, pos, { id: kind, s: { hp: K.hp, armor: 0, mr: 0, moveSpeed: K.speed }, hp: K.hp, r: K.radius, range: K.range, interval: K.interval, damage: K.damage, gold: K.gold, xp: K.xp });
}
export function neutralUnit(id, level, team = "neutral", pos = { x: 0, z: 0 }) {
  const N = OBJ.neutral_v01, U = N.units[id], sc = id === "river_whale" ? N.scaling.whale : N.scaling.camp, dl = level - U.anchor;
  const hpM = Math.max(sc.multMin, 1 + sc.hpPerDelta * dl), dmM = Math.max(sc.multMin, 1 + sc.dmgPerDelta * dl);
  const hp = U.hp * hpM;
  return unit("neutral", team, pos, { id, level, s: { hp, armor: Math.max(sc.resistMin, U.armor + sc.armorPerDelta * dl), mr: Math.max(sc.resistMin, U.mr + sc.mrPerDelta * dl), moveSpeed: 4.5 },
    hp, r: U.miniboss ? 1.4 : 0.9, range: U.miniboss ? 3 : 2.2, interval: U.interval, damage: U.dmg * dmM, miniboss: !!U.miniboss, home: { ...pos } });
}
export function titanUnit(rank, avgLevel, team = "neutral", pos = { x: 0, z: 0 }) {
  const T = OBJ.titan, hp = T.baseHp * (1 + T.hpPerAvgLevel * (avgLevel - 1)) * T.rankHp[rank - 1], res = T.resist.base + T.resist.perRank * (rank - 1);
  return unit("titan", team, pos, { id: `titan-r${rank}`, rank, s: { hp, armor: res, mr: res, moveSpeed: T.walkSpeed }, hp, r: 3, A: T.actions, acts: {}, act: null });
}

// ── thế giới ────────────────────────────────────────────────────────────────────────────────────────────
export function world(units, { seed = 1, maxT = 60, end = "teamWipe", objective = null } = {}) {
  const W = { units, t: 0, R: rng(seed), maxT, end, objective, log: [], zones: [] };
  for (const u of units) u._world = W;
  return W;
}
const alive = (W, f) => W.units.filter((u) => !u.dead && f(u));
const enemiesOf = (W, u) => alive(W, (o) => o.team !== u.team && (u.team !== "neutral" || o.kind === "hero") && !(o.team === "neutral" && u.kind === "minion"));
const alliesOf = (W, u) => alive(W, (o) => o.team === u.team && o.kind === "hero");
export const ms = (u, t) => {
  let m = u.s.moveSpeed * (1 + u.buffs.filter((b) => b.until > t).reduce((a, b) => a + (b.moveSpeed ?? 0), 0)) + u.buffs.filter((b) => b.until > t).reduce((a, b) => a + (b.flatMs ?? 0), 0);
  if (u._world?.zones) {
    for (const z of u._world.zones) {
      if (z.until > t && d2(u.pos, z.pos) <= z.r + u.r) {
        if (z.type === "frost_trail") {
          if (z.team === u.team) m *= 1 + (z.speedBoost ?? 0.20);
          else m *= 1 - (z.slowRatio ?? 0.25);
        }
        if (z.type === "ink_path") {
          if (z.team === u.team) m *= 1 + (z.speedBoost ?? 0.20);
          else m *= 1 - (z.slowRatio ?? 0.25);
        }
        if (z.type === "shadow_wake") {
          if (z.team === u.team) m *= 1 + (z.speedBoost ?? 0.35);
        }
      }
    }
  }
  if (u.k?.passive?.type === "mounted_momentum" && (u.momentum ?? 0) > 0) {
    m *= 1 + (u.momentum / 100) * (u.k.passive.bonusMsRatio ?? 0.20);
  }
  if (u.k?.passive?.type === "scale_shedding" && (u.shedUntil ?? 0) > t) {
    m *= 1 + (u.k.passive.shedSpeedBonus ?? 0.20);
  }
  if (u.k?.passive?.type === "carpet_bomb_strafe") {
    m *= 1 + (u.k.passive.strafeSpeedBonus ?? 0.15);
  }
  if (u.k?.passive?.type === "siege_stance" && (u.siegeUntil ?? 0) > t) {
    m = 0;
  }
  if (u.k?.passive?.type === "directional_shield" && (u.guardUntil ?? 0) > t) {
    m *= 1 - (u.k.passive.shieldSpeedPenalty ?? 0.20);
  }
  if (u.k?.passive?.type === "shadow_wake" && (u.shadowWakeUntil ?? 0) > t) {
    m *= 1 + (u.k.passive.wakeSpeedBonus ?? 0.35);
  }
  return m * (1 - u.slows.filter((x) => x.until > t).reduce((a, x) => Math.max(a, x.pct), 0));
};
export const aspd = (u, t) => {
  let a = u.s.attackSpeed * (1 + u.buffs.filter((b) => b.until > t).reduce((a, b) => a + (b.attackSpeed ?? 0), 0));
  if (u.cuongNhip && u.cuongNhip.stacks > 0) {
    const p = u.k?.passive;
    a *= 1 + Math.floor(u.cuongNhip.stacks) * (p?.aspdPerStack ?? 0.08);
  }
  if (u.k?.passive?.type === "staff_reach" && (u.staffUntil ?? 0) <= t) {
    a *= 1 + (u.k.passive.shortAspdBonus ?? 0.15);
  }
  if (u.k?.passive?.type === "scale_shedding" && (u.shedUntil ?? 0) > t) {
    a *= 1 + (u.k.passive.shedAspdBonus ?? 0.25);
  }
  if ((u.solarSlowUntil ?? 0) > t) {
    a *= 1 - (u.solarSlowPct ?? 0.25);
  }
  return a;
};
const targetable = (u, t) => !u.dead && u.untargetUntil <= t;

function raw(src, d, r, tgt) {
  if (!d) return 0;
  let v = at(d.base, r) ?? 0;
  v += (d.ad ?? 0) * src.s.ad + (d.bonusAd ?? 0) * (src.bonusAd ?? 0) + (d.ap ?? 0) * (src.s.ap ?? 0) + (d.perLevel ?? 0) * ((src.L ?? 1) - 1) + (d.selfMaxHp ?? 0) * src.s.hp;
  if (d.missingHp && tgt) v += d.missingHp * (tgt.s.hp - tgt.hp);
  if (d.maxHp && tgt) v += d.maxHp * tgt.s.hp;
  return v;
}

export function hurt(W, src, tgt, amount, type, opt = {}) {
  if (!(amount > 0) || tgt.dead) return 0;
  if (tgt.kind === "hero" && src.kind === "hero") amount *= src.dmgM ?? 1; // combat.js: tuning.dmg chỉ tướng↔tướng
  // Kiko: Ảo ảnh quang học hấp thụ đòn đánh đầu tiên
  if (tgt.decoyUntil && tgt.decoyUntil > W.t && !tgt.decoyHit) {
    tgt.decoyHit = true;
    proc(tgt, "passive:decoy_absorbed");
    return 0;
  }
  // Brak: Parry Piston đón đỡ và phản kích
  if (tgt.parryUntil && tgt.parryUntil > W.t) {
    tgt.parryUntil = 0;
    amount *= 0.4; // giảm 60% sát thương
    if (src.kind === "hero") {
      const counterDmg = tgt.s.ad * (tgt.k?.passive?.counterBonusRatio ?? 0.35);
      hurt(W, tgt, src, counterDmg, "physical", { tag: "passive:parry_counter" });
      applyEffects(W, tgt, src, [{ stun: tgt.k?.passive?.counterStun ?? 0.5 }]);
      proc(tgt, "passive:parry_piston_proc");
    }
  }
  // Kora: Directional shield đón đỡ phía trước
  if (tgt.guardUntil && tgt.guardUntil > W.t && src.kind === "hero") {
    amount *= 1 - (tgt.k?.passive?.frontMitigation ?? 0.60);
    proc(tgt, "passive:directional_shield_block");
  }
  // Libro: Sổ Nợ hoãn sát thương
  if (tgt.debtUntil && tgt.debtUntil > W.t && !opt.debt) {
    const postRatio = tgt.debtRatio ?? 0.70;
    const postAmt = amount * postRatio;
    amount *= (1 - postRatio);
    tgt.debtPool = (tgt.debtPool ?? 0) + postAmt;
    proc(tgt, "passive:debt_postponed");
  }
  // Kymos: Acoustic node giảm sát thương sốc cho đồng minh
  if (W.zones) {
    for (const z of W.zones) {
      if (z.type === "acoustic_node" && z.team === tgt.team && z.until > W.t && d2(tgt.pos, z.pos) <= z.r) {
        amount *= 1 - (z.burstMitigation ?? 0.40);
        proc(tgt, "passive:acoustic_mitigation");
        break;
      }
    }
  }
  const pre = amount;
  let tgtArmor = tgt.s.armor;
  let tgtMr = tgt.s.mr;
  // Trieu Ba: Tam long xoáy nước cho giáp/kháng phép
  if (tgt.k?.passive?.type === "orbital_dragons") {
    const dN = tgt.dragons ?? 3;
    const res = dN * (tgt.k.passive.resistPerDragon ?? 12);
    tgtArmor += res;
    tgtMr += res;
  }
  // Tan Son: Vách núi ngọc bích gia cố giáp
  if (tgt.k?.passive?.type === "passable_ridge" && (tgt.ridgeUntil ?? 0) > W.t) {
    tgtArmor += 25;
    tgtMr += 25;
  }
  // Co Lo: Mai rùa cắm chốt tăng giáp lưng
  if (tgt.k?.passive?.type === "siege_stance" && (tgt.siegeUntil ?? 0) > W.t) {
    tgtArmor += (tgt.k.passive.siegeArmorBonus ?? 40);
    tgtMr += (tgt.k.passive.siegeMrBonus ?? 40);
  }
  // Forge: Quá nhiệt tăng sức chống chịu
  if (tgt.k?.passive?.type === "heat_gauge" && (tgt.heat ?? 0) >= 50) {
    const bonusRes = (tgt.heat - 50) * 0.3;
    tgtArmor += bonusRes;
    tgtMr += bonusRes;
  }
  // Rolo: Tháo vảy chuyển dạng (thủ tăng/công giảm giáp)
  if (tgt.k?.passive?.type === "scale_shedding") {
    const p = tgt.k.passive;
    if ((tgt.shedUntil ?? 0) > W.t) {
      tgtArmor -= (p.shedResistPenalty ?? 25);
      tgtMr -= (p.shedResistPenalty ?? 25);
    } else {
      tgtArmor += (p.baseResistBonus ?? 35);
      tgtMr += (p.baseResistBonus ?? 35);
    }
  }
  if (type === "physical") amount *= 100 / (100 + Math.max(0, tgtArmor * (1 - (src.armorPen ?? 0))));
  else if (type === "magic") amount *= 100 / (100 + Math.max(0, tgtMr - (src.magicPen ?? 0)));
  // Vero: Tích lũy vết nứt thời gian
  if (src.k?.passive?.type === "delayed_echo" && tgt.kind === "hero" && !opt.echo) {
    tgt.echoDmg = (tgt.echoDmg ?? 0) + amount * (src.k.passive.echoRatio ?? 0.30);
    tgt.echoPopAt = W.t + (src.k.passive.echoDelay ?? 2.5);
    tgt.echoSrc = src;
  }
  if (tgt.mark && tgt.mark.until > W.t && !opt.mark) { const m = tgt.mark; tgt.mark = null; hurt(W, m.src, tgt, m.amount, m.type, { mark: true, tag: "skill:mark" }); if (tgt.dead) return amount; }
  tgt.m.mitigated = (tgt.m.mitigated ?? 0) + (pre - amount);
  let left = amount;
  for (const sh of tgt.shields) {
    if (sh.until <= W.t || sh.amt <= 0) continue;
    const a = Math.min(sh.amt, left); sh.amt -= a; left -= a; tgt.m.absorbed += a; if (sh.src?.m) sh.src.m.shieldAbs = (sh.src.m.shieldAbs ?? 0) + a;
    if (sh.amt <= 0) sh.brokeAt = W.t;
  }
  tgt.hp -= left; tgt.lastHurt = W.t;
  // Forge: Tích nhiệt khi nhận sát thương
  if (tgt.k?.passive?.type === "heat_gauge") {
    const p = tgt.k.passive;
    tgt.heat = Math.min(100, (tgt.heat ?? 0) + amount * (p.heatPerDmgTaken ?? 0.04));
  }
  if (src.uid) (tgt.hitBy ??= new Set()).add(src.uid);
  src.m.dealt += amount; tgt.m.taken += amount;
  const tag = opt.tag ?? "other"; src.by[tag] = (src.by[tag] ?? 0) + amount;
  if (W.replay && (src.kind === "hero" || tgt.kind === "hero")) W.replay.push([+W.t.toFixed(2), src.name ?? src.id, tag, tgt.name ?? tgt.id, Math.round(amount), Math.round(Math.max(0, tgt.hp))]);
  if (tgt.kind === "hero") { src.m.heroDealt += amount; tgt.heroCombatAt = src.kind === "hero" ? W.t : tgt.heroCombatAt; if (src.kind === "hero") { src.heroCombatAt = W.t; tgt.lastHeroHitBy = src; tgt.lastHeroHitAt = W.t; } }
  tgt.aggro[src.uid] = (tgt.aggro[src.uid] ?? 0) + amount;
  if (src.kind === "hero" && tgt.kind === "hero" && src.team !== tgt.team) src.hitHeroAt = W.t;
  if (tgt.hp <= 0) { tgt.dead = true; tgt.hp = 0; tgt.m.deaths++; tgt.m.diedAt = W.t; src.m.kills++; tgt.killedBy = src.uid; }
  return amount;
}
function heal(W, src, tgt, amount, kit = true) {
  if (tgt.dead || !(amount > 0)) return 0;
  if (kit && src.P?.concord_blessing) amount *= src.P.concord_blessing.effect.multiplier;
  if (tgt.antiHeal && tgt.antiHeal.until > W.t) amount *= 1 - tgt.antiHeal.pct;
  const before = tgt.hp; tgt.hp = Math.min(tgt.s.hp, tgt.hp + amount);
  const got = tgt.hp - before;
  if (tgt !== src && got > 0 && before / tgt.s.hp < 0.3) tgt.savedBy = src.uid;
  if (tgt === src) src.m.healed += got; else src.m.allyHealed += got;
  return got;
}
function shieldOn(W, src, tgt, amt, dur, extra = {}) {
  if (tgt !== src && tgt.hp / tgt.s.hp < 0.3) tgt.savedBy = src.uid;
  if (src.P?.concord_blessing && !extra.item) amt *= src.P.concord_blessing.effect.multiplier;
  src.m.shieldGiven = (src.m.shieldGiven ?? 0) + amt;
  tgt.shields.push({ amt, until: W.t + dur, at: W.t, src, ...extra });
}
function applyEffects(W, src, tgt, list) {
  for (const e of list ?? []) {
    const cc = (e.stun ?? 0) + (e.root ?? 0) + (e.charm ?? 0) + (e.slow ? (e.duration ?? 1) * e.slow : 0);
    if (e.after) { if (d2(tgt.pos, src.pos) + ms(tgt, W.t) * e.after * (tgt.prof?.sidestep ?? 0) * 0.5 <= e.holdRange) { tgt.pendingRoot = { at: W.t + e.after, dur: e.root }; src.m.cc += e.root; } continue; }
    src.m.cc += cc;
    if (e.heal) {
      const amt = typeof e.heal === "number" ? e.heal : raw(src, e.heal, 1, tgt);
      if (e.heal.ally || e.ally) {
        const a = alliesOf(W, src).filter((x) => x !== src && !x.dead).sort((p, q) => p.hp / p.s.hp - q.hp / q.s.hp)[0];
        if (a) heal(W, src, a, amt); else heal(W, src, src, amt);
      } else if (e.heal.allies || e.allies) {
        for (const a of alliesOf(W, src)) if (d2(a.pos, src.pos) <= (e.radius ?? 6)) heal(W, src, a, amt);
      } else {
        heal(W, src, tgt.team === src.team ? tgt : src, amt);
      }
    }
    if (tgt.kind === "titan" || tgt.kind === "tower") continue; // boss/trụ không nhận khống chế
    if (e.stun) tgt.stunUntil = Math.max(tgt.stunUntil, W.t + e.stun);
    if (e.root) tgt.rootUntil = Math.max(tgt.rootUntil, W.t + e.root);
    if (e.charm) { tgt.charmUntil = Math.max(tgt.charmUntil, W.t + e.charm); tgt.charmBy = src; }
    if (e.slow) tgt.slows.push({ pct: e.slow, until: W.t + (e.duration ?? 1) });
  }
}

// ── tướng: chiêu ───────────────────────────────────────────────────────────────────────────────────────
function landChance(W, src, tgt, ab, dist) {
  if (!targetable(tgt, W.t)) return 0;
  if (tgt.kind !== "hero") return 1;
  if (W.allHit) return 1;
  const t = W.t, P = tgt.prof;
  const travel = ab.aim === "skillshot" ? (ab.windup ?? 0) + dist / (ab.speed ?? 20) : (ab.windup ?? 0) + (ab.delay ?? 0);
  const ccLeft = Math.max(tgt.stunUntil, tgt.rootUntil, tgt.charmUntil) - t;
  if (ccLeft >= travel) return 0.97;
  const free = Math.max(0, travel - P.react - Math.max(0, ccLeft));
  const need = ab.aim === "skillshot" ? (ab.fan ? (ab.width ?? 1) / 2 + 0.5 + dist * Math.tan((ab.fan.spread ?? 0) * Math.PI / 360) * 0.5 : (ab.width ?? 1) / 2 + 0.5) : (ab.radius ?? 2) * 0.8;
  const p = Math.min(0.95, Math.max(0.2, 1 - (ms(tgt, t) * free * P.sidestep) / (need * 2.4)));
  if (free > 0.15 && tgt.dodgeAt <= t && tgt.stamina >= DODGE.stamina && W.R() < P.dodge) {
    tgt.dodgeAt = t + DODGE.cd; tgt.stamina -= DODGE.stamina; tgt.untargetUntil = Math.max(tgt.untargetUntil, t + DODGE.iframe * 0.5);
    const dp = tgt.k.passive; if (dp?.type === "dodge_stealth") { tgt.untargetUntil = Math.max(tgt.untargetUntil, t + dp.stealth); tgt.empowered = true; }
    return 0;
  }
  return p;
}
const abRange = (ab) => ab.aim === "area" && !ab.range ? ab.radius : ab.aim === "self" ? Infinity : ab.range ?? 3;

function mimicOf(h, ab, rank) {
  const src = h.lastSlot && h.k[h.lastSlot]; if (!src) return null;
  const sc = at(ab.mimic.scale, rank), d = src.damage;
  return { ...src, windup: ab.windup ?? src.windup, cooldown: ab.cooldown, cost: ab.cost, mimicked: true,
    damage: d && { ...d, base: at(d.base, Math.min(5, 1 + 2 * rank)) * sc, ad: (d.ad ?? 0) * sc, ap: (d.ap ?? 0) * sc, bonusAd: (d.bonusAd ?? 0) * sc } };
}
function wantCast(W, h, e, slot, ab) {
  const t = W.t, dist = d2(h.pos, e.pos), hpPct = h.hp / h.s.hp, ePct = e.hp / e.s.hp, P = h.prof, hero = e.kind === "hero";
  if (ab.mimic) { const m = mimicOf(h, ab, 1); if (!m) return false; ab = m; }
  if (slot === "r" && !hero && e.kind !== "titan" && !P.ultOnUnits) return false;
  if (ab.heal?.ally) { const hurtAlly = alliesOf(W, h).find((a) => a !== h && a.hp / a.s.hp < 0.7 && d2(a.pos, h.pos) <= (ab.range ?? 8)); if (hurtAlly) return true; if (!ab.damage) return false; }
  if (ab.aim === "self") {
    if (ab.dash && ab.dash.toward === false) return dist < 4.5;
    if (ab.shield) return t - h.lastHurt < 1 && hpPct < 0.92;
    if (ab.buff) return dist < ((h.k.lmb.range ?? 2) + 4);
    if (ab.knockback) return dist < 4;
    return false;
  }
  const r = abRange(ab) + (ab.aim === "area" && ab.range ? ab.radius * 0.5 : 0);
  if (dist > r + e.r * 0.5 + 0.2) return false;
  if (slot === "r" && P.saveUlt && hero) {
    if (ab.damage?.missingHp || ab.damage?.perStack) return ePct < 0.4 || hpPct < 0.25;
    if (ab.heal) return hpPct < 0.5 || alliesOf(W, h).some((a) => a.hp / a.s.hp < 0.45);
    if (ab.dash && ab.dash.toward === false) return ePct < 0.35 || dist < 4;
  }
  if (ab.dash && ab.dash.toward === false) return dist < 4;
  return !!(ab.damage || ab.effects || ab.heal || ab.shield);
}
export function castStart(W, h, e, slot, ab, rank) {
  if (ab.mimic) { const m = mimicOf(h, ab, rank); if (m) ab = m; }
  if (slot !== "r") h.lastSlot = slot;
  h.casts[slot] = (h.casts[slot] ?? 0) + 1; if (h.combo) h.combo.used.add(slot); h.combo && (h.combo.lastCast = W.t);
  if (W.replay) W.replay.push([+W.t.toFixed(2), h.name, "cast:" + slot, e?.name ?? e?.id, 0, null]);
  h.cds[slot] = W.t + at(ab.cooldown, rank);
  h.res -= at(ab.cost, rank) ?? 0;
  if (slot === "r") h.ultReady = false;
  if (ab.dash && ab.aim === "target") h.untargetUntil = Math.max(h.untargetUntil, W.t + (ab.untargetable ?? 0));
  if (ab.aim === "self" && ab.untargetable) h.untargetUntil = Math.max(h.untargetUntil, W.t + ab.untargetable); // Xoay Né Lụa (Bách Diện)
  h.pending = { slot, ab, rank: ab.mimicked ? Math.min(5, 1 + 2 * rank) : rank, at: W.t + (ab.windup ?? 0), tgt: e };
  h.lockUntil = W.t + (ab.windup ?? 0);
  h.castAt = W.t;
  if (h.P.etched_followup) h.qmUntil = W.t + h.P.etched_followup.trigger.windowSeconds;
}
// area <slot>.lines = [{ angle (deg off the aim), width, length }]: straight cracks centred on the aim point; a body strikes if it touches any one
function inLine(o, c, fw, L) {
  const a = (L.angle ?? 0) * Math.PI / 180, dx = Math.cos(a) * fw.x - Math.sin(a) * fw.z, dz = Math.sin(a) * fw.x + Math.cos(a) * fw.z;
  const rx = o.pos.x - c.x, rz = o.pos.z - c.z;
  return Math.abs(rx * dx + rz * dz) <= (L.length ?? 4) / 2 + o.r && Math.abs(rx * dz - rz * dx) <= (L.width ?? 1) / 2 + o.r;
}
// dash.to = "ally": the leap lands beside the ally closest to the foe, within dash.distance; no ally in reach, no leap
function dashAlly(W, h, e, ab) {
  const reach = ab.dash.distance, foe = e?.pos ?? h.pos;
  const a = alliesOf(W, h).filter((x) => x !== h && x.kind === "hero" && x.hp > 0 && d2(x.pos, h.pos) <= reach).sort((p, q) => d2(p.pos, foe) - d2(q.pos, foe))[0];
  if (a) step(h, toward(h.pos, a.pos), Math.max(0, d2(h.pos, a.pos) - 1 - a.r));
}
// ai trúng chiêu
function struck(W, h, e, ab) {
  const t = W.t, foes = enemiesOf(W, h).filter((o) => targetable(o, t));
  if (ab.aim === "target" || ab.aim === "melee") return d2(h.pos, e.pos) <= (ab.range ?? 3) + e.r + 0.6 && targetable(e, t) ? [e] : [];
  if (ab.aim === "area") {
    let c = h.pos;
    if (ab.range && !ab.arc) { const dir = toward(h.pos, e.pos), dd = Math.min(ab.range, d2(h.pos, e.pos)); c = { x: h.pos.x + dir.x * dd, z: h.pos.z + dir.z * dd }; } // doc 76: a cone is centred at the caster's feet
    const fw = toward(h.pos, e.pos); // doc 76: a cone AoE (arc) faces the target and strikes only its sector
    if (ab.lines) return foes.filter((o) => ab.lines.some((L) => inLine(o, c, fw, L))); // crossing lines through the aim point: only the lines strike
    return foes.filter((o) => d2(o.pos, c) <= ab.radius + o.r && (!ab.arc || inArc(o, c, fw, ab.arc)));
  }
  if (ab.fan) { // doc 76 fan projectiles: count separate lanes, each its own width; the gaps strike nothing; one strike per body
    const { struck } = fanStruck(shotLanes(foes, h.pos, toward(h.pos, e.pos), { ...ab, range: ab.range ?? 8 }), ab);
    return struck.map((x) => x.u);
  }
  // skillshot: đường thẳng về phía e
  const dir = toward(h.pos, e.pos), out = [];
  for (const o of foes) {
    const rx = o.pos.x - h.pos.x, rz = o.pos.z - h.pos.z, along = rx * dir.x + rz * dir.z, off = Math.abs(rx * dir.z - rz * dir.x);
    if (along < -0.5 || along > (ab.range ?? 8) + o.r || off > (ab.width ?? 1) / 2 + o.r) continue;
    out.push({ o, along });
  }
  out.sort((a, b) => a.along - b.along);
  if (ab.pierce) return out.map((x) => x.o);
  if (ab.passMinions) { const firstHero = out.find((x) => x.o.kind === "hero"); const mins = out.filter((x) => x.o.kind !== "hero" && (!firstHero || x.along < firstHero.along)); return [...mins.map((x) => x.o), ...(firstHero ? [firstHero.o] : [])]; }
  return out.length ? [out[0].o] : [];
}
export function resolve(W, h) {
  const { ab, rank, tgt, slot } = h.pending; h.pending = null; h._slot = slot;
  const t = W.t, e = tgt;
  if (ab.aim === "self") {
    let shieldAmt = ab.shield ? raw(h, { base: ab.shield.base, ap: ab.shield.ap, ad: ab.shield.ad }, rank) + (ab.shield.maxHp ?? 0) * h.s.hp : 0;
    if (h.k.passive?.type === "heat_gauge" && (h.heat ?? 0) > 0 && (slot === "rmb" || ab.ventHeat)) {
      const heatSpent = h.heat; h.heat = 0;
      shieldAmt += heatSpent * (h.k.passive.shieldPerHeat ?? 1.5);
      const ventDmg = heatSpent * (h.k.passive.ventDmgPerHeat ?? 1.2);
      for (const o of enemiesOf(W, h)) if (d2(o.pos, h.pos) <= 4.0 + o.r && targetable(o, t)) hurt(W, h, o, ventDmg, "magic", { tag: "passive:heat_vent" });
      proc(h, "passive:heat_vent");
    }
    if (ab.shield) shieldOn(W, h, h, shieldAmt, ab.shield.duration, { burst: ab.shield.burst, rank, kit: true });
    if (ab.shield?.allies) for (const a of alliesOf(W, h)) if (a !== h && d2(a.pos, h.pos) <= (ab.shield.radius ?? 6)) shieldOn(W, h, a, raw(h, { base: ab.shield.base, ap: ab.shield.ap }, rank), ab.shield.duration, { kit: true });
    if (ab.shield && h.k.passive?.type === "shield_strike") h.empowered = true;
    if (ab.buff) h.buffs.push({ moveSpeed: ab.buff.moveSpeed ?? 0, attackSpeed: at(ab.buff.attackSpeed ?? 0, rank), until: t + ab.buff.duration });
    if (ab.dash?.to === "ally") dashAlly(W, h, e, ab);
    if (ab.dash && ab.dash.toward === false && e) step(h, toward(e.pos, h.pos), ab.dash.distance);
    if (ab.dash && ab.dash.toward && e) step(h, toward(h.pos, e.pos), Math.min(ab.dash.distance, Math.max(0, d2(h.pos, e.pos) - 1.5 - e.r))); // lướt tới (Bách Diện E)
    passiveBuff(W, h);
    if (ab.knockback) for (const o of enemiesOf(W, h)) if (d2(o.pos, h.pos) <= 4 && o.kind !== "titan" && o.kind !== "tower") { step(o, toward(h.pos, o.pos), ab.knockback); o.slows.push({ pct: 0.3, until: t + 1 }); }
    if (ab.cleanse) { h.slows = []; h.rootUntil = Math.min(h.rootUntil, t); if (ab.cleanse === "bleed") h.bleed = { n: 0, until: 0 }; }
    if (ab.heal?.self) heal(W, h, h, raw(h, { base: ab.heal.base, ap: ab.heal.ap }, rank));
    if (ab.heal?.allies) for (const a of alliesOf(W, h)) if (d2(a.pos, h.pos) <= (ab.heal.radius ?? ab.radius ?? 6)) heal(W, h, a, raw(h, { base: ab.heal.base, ap: ab.heal.ap }, rank));
    if (ab.heal?.ally) { const a = alliesOf(W, h).filter((x) => x !== h && d2(x.pos, h.pos) <= (ab.heal.range ?? ab.range ?? 8) + 1).sort((p, q) => p.hp / p.s.hp - q.hp / q.s.hp)[0]; if (a) heal(W, h, a, raw(h, { base: ab.heal.base, ap: ab.heal.ap }, rank)); }
    if (h.k.passive?.type === "frost_trail" && slot === "rmb") {
      W.zones ??= [];
      W.zones.push({ type: "frost_trail", team: h.team, pos: { x: h.pos.x, z: h.pos.z }, r: 2.5, until: t + 3.5, speedBoost: 0.25, slowRatio: 0.30 });
      proc(h, "passive:frost_trail");
    }
    if (h.k.passive?.type === "holographic_decoy" && (slot === "rmb" || slot === "q")) {
      h.decoyUntil = t + (h.k.passive.decoyDuration ?? 3.0);
      h.decoyHit = false;
      proc(h, "passive:decoy_spawn");
    }
    if (h.k.passive?.type === "parry_piston" && slot === "rmb") {
      h.parryUntil = t + (h.k.passive.parryWindow ?? 0.75);
      proc(h, "passive:parry_stance");
    }
    if (h.k.passive?.type === "scale_shedding" && slot === "rmb") {
      h.shedUntil = t + (h.k.passive.shedDuration ?? 5.0);
      proc(h, "passive:scale_shedding_burst");
    }
    if (h.k.passive?.type === "passable_ridge" && slot === "rmb") {
      h.ridgeUntil = t + (h.k.passive.ridgeDuration ?? 3.0);
      W.zones ??= [];
      W.zones.push({ type: "passable_ridge", team: h.team, pos: { x: h.pos.x, z: h.pos.z }, r: 3.5, until: t + (h.k.passive.ridgeDuration ?? 3.0) });
      proc(h, "passive:passable_ridge");
    }
    if (h.k.passive?.type === "orbital_dragons" && slot === "rmb") {
      h.dragons = 3;
      proc(h, "passive:dragons_recalled");
    }
    if (h.k.passive?.type === "fissure_cleave" && slot === "rmb") {
      h.slows = []; h.rootUntil = Math.min(h.rootUntil, t);
      for (const enemy of enemiesOf(W, h)) {
        if (d2(enemy.pos, h.pos) <= 5.0) enemy.buffs.push({ dmgM: -0.25, until: t + 1.5 });
      }
      h.lockUntil = Math.max(h.lockUntil, t + 1.0);
      proc(h, "passive:celestial_harp");
    }
    if (h.k.passive?.type === "siege_stance" && slot === "rmb") {
      h.siegeUntil = t + 5.0;
      proc(h, "passive:siege_mode");
    }
    if (h.k.passive?.type === "directional_shield" && slot === "rmb") {
      h.guardUntil = t + 3.5;
      proc(h, "passive:directional_guard");
    }
    if (h.k.passive?.type === "debt_ledger" && slot === "rmb") {
      h.debtUntil = t + (h.k.passive.debtWindow ?? 2.5);
      h.debtRatio = h.k.passive.debtPostponeRatio ?? 0.70;
      proc(h, "passive:debt_ledger");
    }
    if (h.k.passive?.type === "peacock_gaze" && slot === "rmb") {
      for (const enemy of enemiesOf(W, h)) {
        if (d2(enemy.pos, h.pos) <= (h.k.passive.gazeRadius ?? 5.5)) {
          enemy.charmUntil = Math.max(enemy.charmUntil, t + (h.k.passive.gazeFear ?? 1.2));
          enemy.charmBy = h;
        }
      }
      proc(h, "passive:peacock_fear");
    }
    if (h.k.passive?.type === "acoustic_node" && slot === "rmb") {
      W.zones ??= [];
      W.zones.push({ type: "acoustic_node", team: h.team, pos: { x: h.pos.x, z: h.pos.z }, r: 4.5, until: t + 3.5, burstMitigation: 0.40 });
      proc(h, "passive:acoustic_node");
    }
    if (h.k.passive?.type === "lantern_beacon" && slot === "rmb") {
      proc(h, "passive:lantern_detonated");
    }
    if (h.k.passive?.type === "cc_absorb_transmute" && slot === "rmb") {
      for (const ally of alliesOf(W, h)) {
        ally.slows = []; ally.rootUntil = Math.min(ally.rootUntil, t);
      }
      proc(h, "passive:cc_transmuted");
    }
    return;
  }
  if (ab.dash?.to === "ally") dashAlly(W, h, e, ab);
  if (ab.dash && ab.dash.toward === false) step(h, toward(e.pos, h.pos), ab.dash.distance);
  if (h.k.passive?.type === "staff_reach" && slot === "q") {
    h.staffUntil = t + (h.k.passive.extendDuration ?? 4.0);
    proc(h, "passive:staff_extend");
  }
  if (h.k.passive?.type === "mounted_momentum" && slot === "r") {
    h.bambooUntil = t + 6.0;
    proc(h, "passive:bamboo_transformation");
  }
  if (h.k.passive?.type === "holographic_decoy" && slot === "q") {
    h.decoyUntil = t + (h.k.passive.decoyDuration ?? 3.0);
    h.decoyHit = false;
    proc(h, "passive:decoy_spawn");
  }
  if (h.k.passive?.type === "heat_gauge") {
    h.heat = Math.min(100, (h.heat ?? 0) + (h.k.passive.heatPerCast ?? 15));
  }
  if (h.k.passive?.type === "orbital_dragons" && slot === "q") {
    h.dragons = Math.max(0, (h.dragons ?? 3) - 1);
    W.zones ??= [];
    if (e) W.zones.push({ type: "water_trail", team: h.team, pos: { x: (h.pos.x + e.pos.x)/2, z: (h.pos.z + e.pos.z)/2 }, r: 3.0, until: t + 3.0, slowRatio: 0.25 });
    proc(h, "passive:dragon_launch");
  }
  if (h.k.passive?.type === "passable_ridge" && slot === "e") {
    for (const enemy of enemiesOf(W, h)) {
      if (d2(enemy.pos, h.pos) <= 5.0) {
        enemy.solarSlowUntil = t + 2.0;
        enemy.solarSlowPct = 0.25;
      }
    }
    proc(h, "passive:solar_aegis");
  }
  if (h.k.passive?.type === "spore_pounce" && slot === "q" && e) {
    e.sporeUntil = t + (h.k.passive.sporeDuration ?? 4.0);
    proc(h, "passive:spore_applied");
  }
  if (h.k.passive?.type === "carpet_bomb_strafe" && slot === "q") {
    W.zones ??= [];
    W.zones.push({ type: "plasma_strafe", src: h, team: h.team, pos: { x: h.pos.x, z: h.pos.z }, r: 2.8, until: t + 3.0, dps: h.s.ad * (h.k.passive.plasmaDpsAd ?? 0.3) });
    proc(h, "passive:plasma_strafe");
  }
  if (h.k.passive?.type === "laser_sniper" && slot === "q") {
    proc(h, "passive:sniper_shot");
  }
  if (h.k.passive?.type === "ink_path" && slot === "q") {
    W.zones ??= [];
    W.zones.push({ type: "ink_path", team: h.team, pos: { x: h.pos.x, z: h.pos.z }, r: 2.5, until: t + 4.0, speedBoost: 0.20, slowRatio: 0.25 });
    proc(h, "passive:ink_path");
  }
  if (h.k.passive?.type === "lantern_beacon") {
    if (slot === "q" && e) {
      W.zones ??= [];
      W.zones.push({ type: "lantern_beacon", team: h.team, pos: { x: e.pos.x, z: e.pos.z }, r: 6.0, until: t + 8.0 });
      proc(h, "passive:lantern_placed");
    } else if (slot === "rmb") {
      proc(h, "passive:lantern_detonated");
    }
  }
  if (h.k.passive?.type === "shadow_wake" && slot === "q") {
    h.shadowWakeUntil = t + 3.5;
    W.zones ??= [];
    W.zones.push({ type: "shadow_wake", team: h.team, pos: { x: h.pos.x, z: h.pos.z }, r: 2.5, until: t + 3.5, speedBoost: 0.35 });
    proc(h, "passive:shadow_wake");
  }
  const hitList = struck(W, h, e, ab);
  if (ab.dash && ab.dash.toward) { const go = Math.min(ab.dash.distance, Math.max(0, d2(h.pos, e.pos) - 1.2 - e.r)); step(h, toward(h.pos, e.pos), go); }
  if (ab.heal?.self && !ab.heal.damageShare) heal(W, h, h, raw(h, { base: ab.heal.base, ap: ab.heal.ap }, rank));
  if (ab.heal?.allies) for (const a of alliesOf(W, h)) if (a !== h && d2(a.pos, h.pos) <= (ab.heal.radius ?? ab.radius ?? 6) + 2) heal(W, h, a, raw(h, { base: ab.heal.base, ap: ab.heal.ap }, rank));
  if (ab.heal?.ally) { const a = alliesOf(W, h).filter((x) => x !== h && d2(x.pos, h.pos) <= (ab.heal.range ?? ab.range ?? 8) + 1).sort((p, q) => p.hp / p.s.hp - q.hp / q.s.hp)[0]; if (a) heal(W, h, a, raw(h, { base: ab.heal.base, ap: ab.heal.ap }, rank)); }
  if (ab.shield?.allies) for (const a of alliesOf(W, h)) if (d2(a.pos, h.pos) <= (ab.shield.radius ?? 6)) shieldOn(W, h, a, raw(h, { base: ab.shield.base, ap: ab.shield.ap }, rank), ab.shield.duration, { kit: true });
  let dealt = 0, heroHit = false;
  for (const o of hitList) {
    const dist = d2(h.pos, o.pos);
    const chance = ab.aim === "target" || ab.aim === "melee" || (ab.aim === "area" && !ab.delay && !ab.range) ? (targetable(o, t) ? 1 : 0) : landChance(W, h, o, ab, dist);
    let landed = 0; for (let i = 0; i < (ab.hits ?? 1); i++) if (W.R() < chance) landed++;
    if (o.kind === "hero") { const ht = (h.ht ??= {}); const c = (ht[h._slot] ??= [0, 0]); c[0] += ab.hits ?? 1; c[1] += landed; } // đếm thử/trúng (Lab, không tốn R)
    if (!landed) continue;
    let amt = raw(h, ab.damage, rank, o);
    if (ab.damage?.perStack) amt *= 1 + at(ab.damage.perStack, rank) * (o.bleed.until > t ? o.bleed.n : 0);
    for (let i = 0; i < landed; i++) dealt += hurt(W, h, o, amt, ab.damage?.type ?? "physical", { tag: "skill:" + h._slot });
    if (ab.stacks) addBleed(W, h, o, ab.stacks);
    if (ab.mark) o.mark = { src: h, amount: raw(h, ab.mark, rank), type: ab.mark.type, until: t + 4 };
    if (o.kind !== "titan" && o.kind !== "tower") {
      if (ab.pull) { const nd = Math.max(1.2, d2(o.pos, h.pos) - ab.pull); const dir = toward(h.pos, o.pos); o.pos = { x: h.pos.x + dir.x * nd, z: h.pos.z + dir.z * nd }; }
      if (ab.knockback) { step(o, toward(h.pos, o.pos), ab.knockback); o.stunUntil = Math.max(o.stunUntil, t + 0.4); }
    }
    if (ab.effectsOn !== "last" || landed === (ab.hits ?? 1)) applyEffects(W, h, o, ab.effects); // effectsOn: last = only the final beat carries it (Bách Diện R stun)
    onAbilityHit(W, h, o);
    if (o.kind === "hero") heroHit = true;
  }
  if (ab.heal?.damageShare) heal(W, h, h, dealt * ab.heal.damageShare);
  if (ab.aim === "area" && ab.buff) h.buffs.push({ moveSpeed: ab.buff.moveSpeed ?? 0, attackSpeed: at(ab.buff.attackSpeed ?? 0, rank), until: t + ab.buff.duration }); // vùng + buff bản thân (Bách Diện R)
  if (dealt > 0 || ab.aim === "area") passiveBuff(W, h);
  if (heroHit) itemOnAbilityHero(W, h, hitList.find((o) => o.kind === "hero"));
}
// Nhịp Lụa: nội tại after_ability có buff → tăng tốc một lần mỗi lần chiêu trúng (runtime: hitAny trong cast)
function passiveBuff(W, h) { const b = h.k.passive?.type === "after_ability" && h.k.passive.buff; if (b) h.buffs.push({ moveSpeed: b.moveSpeed ?? 0, until: W.t + b.duration }); }
function onAbilityHit(W, h, o) {
  const p = h.k.passive;
  if (p?.type === "burn_on_ability") { o.burns.push({ src: h, dps: (p.maxHp * o.s.hp) / p.duration, until: W.t + p.duration }); if (p.antiHeal) o.antiHeal = { pct: p.antiHeal, until: W.t + p.duration }; }
  if (p?.type === "after_ability") h.empowered = true;
}
function addBleed(W, src, tgt, n) {
  if (src.k.passive?.type !== "bleed") return;
  const p = src.k.passive;
  tgt.bleed = { src, n: Math.min(p.maxStacks, (tgt.bleed.until > W.t ? tgt.bleed.n : 0) + n), until: W.t + p.duration };
}
// nội tại trang bị (passives.js), cùng số từ economy.yml
const ready = (h, g) => (h.itemCd[g] ?? 0) <= 0 || (h.itemCd[g] ?? 0) <= h._now;
function itemOnAbilityHero(W, h, o) {
  h._now = W.t;
  const lt = h.P.archive_ember;
  if (lt && ready(h, lt.group)) { hurt(W, h, o, lt.effect.base + (lt.effect.apRatio ?? 0) * h.s.ap, lt.effect.damageType, { tag: "item:lo_than_ky" }); proc(h, "lo_than_ky"); h.itemCd[lt.group] = W.t + lt.cooldownSeconds; }
  const dh = h.P.echo_step;
  if (dh && ready(h, dh.group)) { h.buffs.push({ flatMs: dh.effect.amount, until: W.t + dh.durationSeconds }); proc(h, "dang_hoi_am"); h.itemCd[dh.group] = W.t + dh.cooldownSeconds; }
}
const proc = (u, k) => { u.procs[k] = (u.procs[k] ?? 0) + 1; };
export function autoAttack(W, h, e) {
  const t = W.t, lmb = h.k.lmb, dist = d2(h.pos, e.pos);
  if (h.k.passive?.type === "siege_stance" && (h.siegeUntil ?? 0) > t) {
    if (dist < (h.k.passive.blindspotRadius ?? 2.5)) return false; // Vùng mù cận chiến pháo đài
  }
  const reach = (h.k.passive?.type === "staff_reach" && (h.staffUntil ?? 0) > t ? (h.k.passive.extendedRange ?? 4.5) :
                ((h.k.passive?.type === "mounted_momentum" && (h.bambooUntil ?? 0) > t) ? 3.5 :
                ((h.k.passive?.type === "siege_stance" && (h.siegeUntil ?? 0) > t) ? (h.k.passive.siegeRange ?? 8.5) :
                ((h.k.passive?.type === "laser_sniper") ? ((lmb.range ?? 7.5) + Math.min(h.k.passive.maxFocusRange ?? 6.0, (h.focusTime ?? 0) * (h.k.passive.focusPerSec ?? 1.5))) :
                (lmb.range ?? 2)))));
  if (dist > reach + e.r + 0.3 || !targetable(e, t)) return false;
  const iv = 1 / aspd(h, t);
  h.atkReady = t + iv; h.lockUntil = t + Math.min(0.35, iv * 0.3); h.hitN++; h._now = t;
  let amt = h.s.ad, type = "physical";
  if (lmb.damageType === "magic") { amt = h.s.ad + (lmb.ap ?? 0) * h.s.ap; type = "magic"; }
  const projectile = lmb.aim === "projectile" && e.kind === "hero" && W.R() < e.prof.dodge * 0.3; // newbie gần như không né đòn thường
  if (projectile) return true;
  hurt(W, h, e, amt, type, { tag: "aa" });
  const p = h.k.passive;
  if (p?.type === "fissure_cleave" && h.hitN % (p.cleaveHit ?? 3) === 0) {
    const bonusTrue = amt * (p.trueDmgRatio ?? 0.35);
    hurt(W, h, e, bonusTrue, "true", { tag: "passive:fissure_cleave" });
    proc(h, "passive:fissure_cleave");
  }
  if (p?.type === "spore_pounce" && (e.sporeUntil ?? 0) > t) {
    const pounceBonus = amt * (p.pounceBonusAd ?? 0.40);
    hurt(W, h, e, pounceBonus, "physical", { tag: "passive:spore_pounce" });
    proc(h, "passive:spore_pounce");
    e.sporeUntil = 0; // Vồ mồi tiêu thụ dấu ấn bào tử
  }
  if (p?.type === "shadow_wake" && (h.shadowWakeUntil ?? 0) > t) {
    const chainBonus = amt * (p.chainLightningAd ?? 0.45);
    hurt(W, h, e, chainBonus, "magic", { tag: "passive:chain_lightning" });
    proc(h, "passive:shadow_wake_strike");
    h.shadowWakeUntil = 0; // Đòn chém tiêu thụ cường hóa lôi điện
  }
  if (p?.type === "staff_reach" && (h.staffUntil ?? 0) > t) {
    if (dist >= (p.sweetspotMin ?? 2.8)) {
      const bonus = amt * (p.sweetspotBonus ?? 0.25);
      hurt(W, h, e, bonus, "physical", { tag: "passive:staff_sweetspot" });
      applyEffects(W, h, e, [{ slow: 0.2, duration: 0.8 }]);
      proc(h, "passive:staff_sweetspot");
    }
  }
  if (p?.type === "mounted_momentum") {
    if ((h.bambooUntil ?? 0) > t) {
      const sweepBonus = amt * 0.35;
      hurt(W, h, e, sweepBonus, "physical", { tag: "passive:bamboo_sweep" });
      if (!h._bambooProcLogged) { proc(h, "passive:bamboo_sweep"); h._bambooProcLogged = true; }
    } else if ((h.momentum ?? 0) >= 80) {
      const chargeDmg = h.s.ad * (p.chargeBonusAd ?? 0.50);
      hurt(W, h, e, chargeDmg, "physical", { tag: "passive:mounted_charge" });
      applyEffects(W, h, e, [{ stun: p.chargeStun ?? 0.6 }]);
      proc(h, "passive:mounted_momentum_hit");
      h.momentum = 0;
    }
  }
  if (p?.type === "anchor_tether" && e.kind === "hero" && h.hitN % (p.shotsPerAnchor ?? 3) === 0) {
    h.buffs.push({ moveSpeed: p.kitingSpeedBoost ?? 0.18, until: t + (p.anchorDuration ?? 3.0) });
    applyEffects(W, h, e, [{ slow: 0.25, duration: 1.5 }]);
    if (!h._anchorProcLogged || t - h._anchorProcLogged >= (p.anchorDuration ?? 3.0)) {
      proc(h, "passive:anchor_kiting");
      h._anchorProcLogged = t;
    }
  }
  if (p?.type === "cuong_nhip") {
    h.cuongNhip ??= { stacks: 0, lastHit: -99 };
    const gain = e.kind === "hero" ? (p.stackPerHit ?? 1) : (p.stackPerMinion ?? 0.5);
    const max = p.maxStacks ?? 6;
    h.cuongNhip.stacks = Math.min(max, (h.cuongNhip.stacks ?? 0) + gain);
    h.cuongNhip.lastHit = t;
    if (h.cuongNhip.stacks >= max && !h.cuongNhip._maxLogged) { proc(h, "passive:cuong_nhip_max"); h.cuongNhip._maxLogged = true; }
  }
  if (p?.type === "frost_trail" && h.hitN % (p.shotsPerTrail ?? 4) === 0) {
    W.zones ??= [];
    W.zones.push({ type: "frost_trail", team: h.team, pos: { x: h.pos.x, z: h.pos.z }, r: p.trailRadius ?? 2.2, until: t + (p.trailDuration ?? 3.0), speedBoost: p.trailSpeedBoost ?? 0.20, slowRatio: p.trailSlowRatio ?? 0.25 });
  }
  if (p?.type === "heat_gauge") {
    h.heat = Math.min(100, (h.heat ?? 0) + (p.heatPerHit ?? 10));
  }
  if (p?.type === "every_nth_hit" && h.hitN % p.n === 0) { hurt(W, h, e, raw(h, p.bonusDamage, 1), p.bonusDamage.type, { tag: "passive" }); proc(h, "passive"); applyEffects(W, h, e, p.effects); }
  if (p?.type === "bleed") addBleed(W, h, e, 1);
  if (p?.type === "cdr_on_hit" && !(p.minGap && t - (h.cdrAt ?? -1e9) < p.minGap)) {
    // perCast (ngu_dang 2026-10-11): mỗi chiêu bị rút tối đa perCast lần trong một lượt hồi (mốc = thời điểm sẵn sàng đã rút); thiếu = hành vi cũ
    h.cdrAt = t; h.cdrTaken ??= {}; let any = false;
    for (const k of Object.keys(h.cds)) {
      if (k === "r" && !p.ult) continue;
      if (p.perCast) { const m = h.cdrTaken[k]; if (m && m.ready === h.cds[k] && m.n >= p.perCast) continue; if ((h.cds[k] ?? 0) <= t) continue; }
      h.cds[k] -= p.seconds; any = true;
      if (p.perCast) { const m = h.cdrTaken[k]; h.cdrTaken[k] = { ready: h.cds[k], n: m && m.ready === h.cds[k] + p.seconds ? m.n + 1 : 1 }; }
    }
    if (any) proc(h, "passive:cdr");
  }
  if ((p?.type === "after_ability" || p?.type === "dodge_stealth" || p?.type === "shield_strike") && h.empowered) { h.empowered = false; hurt(W, h, e, raw(h, p.bonusDamage, 1), p.bonusDamage.type, { tag: "passive" }); proc(h, "passive"); applyEffects(W, h, e, p.effects); }
  const ke = h.P.farseeing_pulse;
  if (ke && e.kind !== "tower") { h.keN = (t - (h.keAt ?? -99) > ke.trigger.counterResetAfterSeconds ? 0 : h.keN ?? 0) + 1; h.keAt = t; if (h.keN >= ke.trigger.n) { h.keN = 0; hurt(W, h, e, ke.effect.base, ke.effect.damageType, { tag: "item:keeneye" }); proc(h, "keeneye"); } }
  const th = h.P.thorn_anchor;
  if (th && e.kind === "hero") { const same = h.thT === e.uid && t - (h.thAt ?? -99) <= th.trigger.counterResetAfterSeconds; h.thN = (same ? h.thN ?? 0 : 0) + 1; h.thT = e.uid; h.thAt = t;
    if (h.thN >= th.trigger.n && ready(h, th.group)) { h.thN = 0; proc(h, "thornseed_quiver"); e.slows.push({ pct: th.effect.ratio, until: t + th.durationSeconds }); h.itemCd[th.group] = t + th.cooldownSeconds; } else if (h.thN >= th.trigger.n) h.thN = 0; }
  const qm = h.P.etched_followup;
  if (qm && e.kind === "hero" && (h.qmUntil ?? 0) > t && ready(h, qm.group)) { h.qmUntil = 0; hurt(W, h, e, qm.effect.base, qm.effect.damageType, { tag: "item:qua_mach" }); proc(h, "qua_mach"); h.itemCd[qm.group] = t + qm.cooldownSeconds; }
  return true;
}

// ── não ───────────────────────────────────────────────────────────────────────────────────────────────
function pickHeroTarget(W, h) {
  const t = W.t, foes = enemiesOf(W, h).filter((o) => targetable(o, t) && o.team !== "neutral" || (o.team === "neutral" && o === W.objective));
  if (W.objective && !W.objective.dead) {
    const threat = foes.find((o) => o.kind === "hero" && d2(o.pos, h.pos) < 6);
    if (threat) return threat;
    if (W.objective.kind === "tower") { const mine = alive(W, (m) => m.kind === "minion" && m.team === h.team && d2(m.pos, W.objective.pos) <= W.objective.range + 1); if (!mine.length && h.prof.kite && h.hp / h.s.hp < 0.35) return null; }
    return W.objective;
  }
  if (!foes.length) return null;
  const heroes = foes.filter((o) => o.kind === "hero");
  const pool = heroes.length ? heroes : foes;
  if (h.prof.focusLow) return pool.sort((a, b) => (a.hp - b.hp) + (d2(a.pos, h.pos) - d2(b.pos, h.pos)) * 30)[0];
  return pool.sort((a, b) => d2(a.pos, h.pos) - d2(b.pos, h.pos))[0];
}
export function heroThink(W, h) {
  const t = W.t;
  if (h.pendingRoot && t >= h.pendingRoot.at) { h.rootUntil = Math.max(h.rootUntil, t + h.pendingRoot.dur); h.pendingRoot = null; }
  if (h.pending && t >= h.pending.at) resolve(W, h);
  if (h.relic && h.relic.readyAt <= t && h.hp / h.s.hp < 0.35 && h.lastHurt > t - 2) { h.relic.readyAt = t + h.relic.cooldown; if (h.relic.heal) h.regenBuff = { hps: h.relic.heal / h.relic.duration, until: t + h.relic.duration }; if (h.relic.shield) shieldOn(W, h, h, h.relic.shield, h.relic.duration, { item: true }); }
  if (t < h.lockUntil || h.stunUntil > t) return;
  if (h.charmUntil > t && h.charmBy) { step(h, toward(h.pos, h.charmBy.pos), Math.min(d2(h.pos, h.charmBy.pos) - 1, ms(h, t) * 0.5 * DT)); return; }
  const e = pickHeroTarget(W, h);
  if (!e) return;
  for (const slot of h.prof.castOrder) {
    const ab = h.k[slot], rank = rankOf(slot, h.L);
    if (!ab || !rank || (h.cds[slot] ?? 0) > t || h.res < (at(ab.cost, rank) ?? 0)) continue;
    if (slot === "r" && !h.ultReady) continue;
    if (h.combo && h.combo.used.has(slot)) continue;
    if (h.rootUntil > t && ab.dash) continue;
    if (!wantCast(W, h, e, slot, ab)) continue;
    castStart(W, h, e, slot, ab, rank); return;
  }
  if (t >= h.atkReady && autoAttack(W, h, e)) return;
  if (h.rootUntil > t) return;
  const baseRange = (h.k.passive?.type === "staff_reach" && (h.staffUntil ?? 0) > t ? (h.k.passive.extendedRange ?? 4.5) : (h.k.lmb.range ?? 2));
  const range = baseRange + e.r, dist = d2(h.pos, e.pos), want = range - 0.4;
  let dir = null, backing = false;
  if (dist > want) dir = toward(h.pos, e.pos);
  else if (h.prof.kite > 0 && e.kind === "hero" && baseRange > (e.k?.lmb?.range ?? 2) + 2 && dist < want - 0.8) { dir = toward(e.pos, h.pos); backing = true; }
  if (dir) {
    step(h, dir, Math.min(Math.abs(dist - want) + 0.01, ms(h, t) * DT * (backing ? +h.prof.kite : 1)));
    if (backing && h.k.passive?.type === "frost_trail" && t - (h.lastTrailDrop ?? -99) >= 1.0) {
      h.lastTrailDrop = t;
      W.zones ??= [];
      W.zones.push({ type: "frost_trail", team: h.team, pos: { x: h.pos.x, z: h.pos.z }, r: 2.2, until: t + 3.0, speedBoost: 0.20, slowRatio: 0.25 });
      proc(h, "passive:frost_trail");
    }
  }
}
// trụ: tướng vừa đánh tướng đồng minh trong tầm → lính gần nhất → tướng gần nhất; phát liên tiếp vào cùng tướng tăng dần
function towerThink(W, u) {
  const t = W.t;
  if (u.shot && t >= u.shot.at) { const v = u.shot.tgt; if (!v.dead) hurt(W, u, v, u.shot.dmg, "physical"); u.shot = null; }
  if (t < u.atkReady || u.shot) return;
  const inR = enemiesOf(W, u).filter((o) => d2(o.pos, u.pos) <= u.range + o.r && targetable(o, t) && o.team !== "neutral");
  const caller = inR.find((o) => o.kind === "hero" && (o.hitHeroAt ?? -99) > t - 2);
  const mins = inR.filter((o) => o.kind === "minion").sort((a, b) => d2(a.pos, u.pos) - d2(b.pos, u.pos));
  const heroes = inR.filter((o) => o.kind === "hero").sort((a, b) => d2(a.pos, u.pos) - d2(b.pos, u.pos));
  const cur = u.lock && !u.lock.dead && inR.includes(u.lock) && (u.lock.kind === "minion" || !mins.length) ? u.lock : null;
  const v = caller ?? cur ?? mins[0] ?? heroes[0];
  if (!v) { u.streak = { uid: null, n: 0 }; return; }
  u.lock = v;
  if (v.kind === "hero") { u.streak = u.streak.uid === v.uid ? { uid: v.uid, n: u.streak.n + 1 } : { uid: v.uid, n: 0 }; } else u.streak = { uid: null, n: 0 };
  const heat = v.kind === "hero" ? Math.min(ST.towerRampMax, u.streak.n * ST.towerRamp) : 0;
  u.atkReady = t + u.interval;
  u.shot = { tgt: v, dmg: u.damage * (1 + heat), at: t + ST.towerTelegraph + d2(u.pos, v.pos) / ST.towerOrbSpeed };
}
function minionThink(W, u) {
  const t = W.t;
  if (t < u.atkReady) return;
  const foes = enemiesOf(W, u).filter((o) => targetable(o, t) && o.team !== "neutral");
  const near = (f) => foes.filter(f).sort((a, b) => d2(a.pos, u.pos) - d2(b.pos, u.pos))[0];
  const ag = ST.minions.aggro;
  const v = near((o) => o.kind === "hero" && (o.hitHeroAt ?? -99) > t - ST.minions.heroAggroWindow && d2(o.pos, u.pos) <= ag)
    ?? near((o) => o.kind === "minion" && d2(o.pos, u.pos) <= ag) ?? near((o) => o.kind === "tower") ?? near((o) => o.kind === "hero" && d2(o.pos, u.pos) <= ag);
  if (!v) { step(u, { x: u.team === "blue" ? 1 : -1, z: 0 }, ms(u, t) * DT); return; }
  if (d2(u.pos, v.pos) > u.range + v.r) { step(u, toward(u.pos, v.pos), ms(u, t) * DT); return; }
  u.atkReady = t + u.interval;
  hurt(W, u, v, v.kind === "tower" ? u.damage * (ST.minions.kinds[u.id]?.structMult ?? 1) : u.damage, "physical");
}
function neutralThink(W, u) {
  const t = W.t;
  if (t < u.atkReady || u.stunUntil > t) return;
  const foes = alive(W, (o) => o.kind === "hero" && targetable(o, t) && u.aggro[o.uid]);
  if (!foes.length) return;
  const v = foes.sort((a, b) => (u.aggro[b.uid] ?? 0) - (u.aggro[a.uid] ?? 0))[0];
  if (d2(u.pos, v.pos) > u.range + v.r) { if (u.rootUntil <= t) step(u, toward(u.pos, v.pos), ms(u, t) * DT); return; }
  u.atkReady = t + u.interval;
  hurt(W, u, v, u.damage, "physical");
}
function titanThink(W, u) {
  const t = W.t, A = u.A, r = u.rank - 1;
  const heroes = alive(W, (o) => o.kind === "hero" && targetable(o, t));
  if (!heroes.length) return;
  if (u.act && t >= u.act.at) {
    const a = u.act; u.act = null;
    if (a.kind === "slam") for (const o of heroes) if (d2(o.pos, u.pos) <= A.slam.radius + o.r && W.R() > o.prof.dodge * 0.5) { hurt(W, u, o, A.slam.dmg[r], "physical"); o.slows.push({ pct: A.slam.slow, until: t + A.slam.slowSeconds }); }
    if (a.kind === "charge") { const dir = a.dir; for (const o of heroes) { const rx = o.pos.x - u.pos.x, rz = o.pos.z - u.pos.z, along = rx * dir.x + rz * dir.z, off = Math.abs(rx * dir.z - rz * dir.x); if (along >= 0 && along <= A.charge.distance && off <= A.charge.width / 2 + o.r && W.R() > o.prof.sidestep * 0.5) { hurt(W, u, o, A.charge.dmg[r], "physical"); step(o, dir, A.charge.knock); } } step(u, dir, Math.min(A.charge.distance, d2(u.pos, a.to) + 2)); }
    if (a.kind === "beam") u.beamUntil = t + A.beam.seconds;
    return;
  }
  if (u.act) return;
  if (u.beamUntil > t) { if ((u.beamTick ?? 0) <= t) { u.beamTick = t + A.beam.tick; for (const o of heroes) if (d2(o.pos, u.pos) <= A.beam.range) hurt(W, u, o, A.beam.dmg[r], "magic"); } }
  const v = heroes.sort((a, b) => (u.aggro[b.uid] ?? 0) - (u.aggro[a.uid] ?? 0) || d2(a.pos, u.pos) - d2(b.pos, u.pos))[0];
  const dist = d2(u.pos, v.pos);
  const inSlam = heroes.filter((o) => d2(o.pos, u.pos) <= A.slam.radius).length;
  if (u.rank >= (A.slam.fromRank ?? 1) && (u.acts.slam ?? 0) <= t && inSlam) { u.acts.slam = t + A.slam.cd; u.act = { kind: "slam", at: t + A.slam.windup }; return; }
  if (u.rank >= (A.beam.fromRank ?? 9) && (u.acts.beam ?? 0) <= t && dist <= A.beam.range) { u.acts.beam = t + A.beam.cd; u.act = { kind: "beam", at: t + A.beam.windup }; return; }
  if (u.rank >= (A.charge.fromRank ?? 1) && (u.acts.charge ?? 0) <= t && dist > A.fist.reach + 2) { u.acts.charge = t + A.charge.cd; u.act = { kind: "charge", at: t + A.charge.windup, dir: toward(u.pos, v.pos), to: { ...v.pos } }; return; }
  if (dist > A.fist.reach + u.r + v.r) { step(u, toward(u.pos, v.pos), ms(u, t) * DT); return; }
  if ((u.atkReady ?? 0) <= t) { u.atkReady = t + A.fist.interval; hurt(W, u, v, A.fist.dmg[r], "physical"); }
}

export function tickDots(W, u) {
  if (u.dead) return;
  const t = W.t;
  if (u.bleed.until > t && u.bleed.n) { const s = u.bleed.src; hurt(W, s, u, raw(s, s.k.passive.perStack, 1) * u.bleed.n * DT, "physical", { tag: "passive:dot" }); }
  for (const b of u.burns) if (b.until > t) hurt(W, b.src, u, b.dps * DT, "magic", { tag: "passive:dot" });
  if (u.kind !== "hero" || u.dead) return;

  // Kael: Cuồng Nhịp suy giảm dần
  if (u.cuongNhip && u.cuongNhip.stacks > 0) {
    const p = u.k.passive;
    const delay = p?.decayDelay ?? 2.0;
    if (t - u.cuongNhip.lastHit >= delay) {
      const decayRate = p?.decayRate ?? 2.0;
      u.cuongNhip.stacks = Math.max(0, u.cuongNhip.stacks - decayRate * DT);
    }
  }

  // Forge: Hạ nhiệt ngoài giao tranh
  if (u.k?.passive?.type === "heat_gauge" && (u.heat ?? 0) > 0) {
    if (t - u.lastHurt > 3.0 && t - (u.hitHeroAt ?? -99) > 3.0) {
      u.heat = Math.max(0, u.heat - 10 * DT);
    }
  }

  // Jeli: Sóng chuông ngân theo nhịp
  if (u.k?.passive?.type === "chime_resonance") {
    u.chimeTimer = (u.chimeTimer ?? 0) + DT;
    const interval = u.k.passive.interval ?? 3.5;
    if (u.chimeTimer >= interval) {
      u.chimeTimer = 0;
      const p = u.k.passive;
      const healAmt = raw(u, p.chimeHeal, 1);
      const shieldAmt = p.chimeShield ? raw(u, p.chimeShield, 1) : 0;
      const allies = alliesOf(W, u);
      const lowestAlly = allies.filter((a) => a !== u && !a.dead).sort((p, q) => p.hp / p.s.hp - q.hp / q.s.hp)[0];
      if (lowestAlly) {
        heal(W, u, lowestAlly, healAmt);
        if (shieldAmt > 0) shieldOn(W, u, lowestAlly, shieldAmt, 2.5, { kit: true });
      }
      heal(W, u, u, healAmt * 0.5);
      proc(u, "passive:chime_resonance");
    }
  }

  // Phù Dong: Tích đà di chuyển liên tục
  if (u.k?.passive?.type === "mounted_momentum") {
    u.momentum = Math.min(100, (u.momentum ?? 0) + (u.k.passive.momentumPerSec ?? 25) * DT);
  }

  // Vero: Kích nổ vết nứt thời gian
  if (u.echoPopAt && t >= u.echoPopAt && (u.echoDmg ?? 0) > 0 && !u.dead && u.echoSrc) {
    const popDmg = u.echoDmg;
    u.echoDmg = 0;
    u.echoPopAt = 0;
    hurt(W, u.echoSrc, u, popDmg, "magic", { echo: true, tag: "passive:delayed_echo_pop" });
    proc(u.echoSrc, "passive:delayed_echo_pop");
  }

  // Libro: Nợ đáo hạn trả dần
  if (u.debtPool && u.debtPool > 0 && (u.debtUntil ?? 0) <= t) {
    const dps = u.debtPool / 3.0;
    hurt(W, u, u, dps * DT, "true", { debt: true, tag: "passive:debt_payback" });
    u.debtPool = Math.max(0, u.debtPool - dps * DT);
  }

  // Aero: Plasma strafe zone damage
  if (W.zones && u.kind === "hero") {
    for (const z of W.zones) {
      if (z.type === "plasma_strafe" && z.team !== u.team && z.until > t && d2(u.pos, z.pos) <= z.r) {
        hurt(W, z.src ?? u, u, z.dps * DT, "magic", { tag: "passive:plasma_strafe_dot" });
      }
    }
  }

  let regen = u.s.hpRegen;
  if (u.regenBuff && u.regenBuff.until > t) regen += u.regenBuff.hps;
  const hf = u.P.restoring_memory; if (hf && t - u.heroCombatAt >= hf.trigger.afterSeconds) regen += hf.effect.amountPerSecond;
  u.hp = Math.min(u.s.hp, u.hp + regen * DT);
  u.res = Math.min(u.s.resource, u.res + u.s.resourceRegen * DT);
  u.stamina = Math.min(100, u.stamina + 18 * DT);
  // khiên hết hạn/vỡ: nổ (kit) và Giáp Minh Ước (đồ)
  for (const sh of u.shields) {
    if (sh.done || (sh.until > t && !(sh.amt <= 0))) continue;
    sh.done = true;
    if (sh.burst) for (const o of enemiesOf(W, u)) if (d2(o.pos, u.pos) <= sh.burst.radius + o.r && targetable(o, t)) { hurt(W, u, o, raw(u, sh.burst, sh.rank), sh.burst.type, { tag: "skill:shieldBurst" }); applyEffects(W, u, o, sh.burst.effects); }
    const oa = u.P.concord_shell;
    if (oa && sh.kit && t - sh.at >= oa.trigger.minimumLifetimeSeconds && (u.itemCd[oa.group] ?? 0) <= t) { u.itemCd[oa.group] = t + oa.cooldownSeconds; shieldOn(W, u, u, (oa.effect.base ?? 0) + oa.effect.maxHpRatio * u.s.hp, oa.durationSeconds, { item: true }); proc(u, "oathguard_plate"); }
  }
  u.shields = u.shields.filter((sh) => !sh.done || sh.until > t && sh.amt > 0);
}

// chạy tới khi hết điều kiện; trả số liệu
export function run(W) {
  const order = () => { const a = W.units.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(W.R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  while (W.t < W.maxT && !finished(W)) {
    if (W.zones?.length) W.zones = W.zones.filter((z) => z.until > W.t);
    for (const u of order()) {
      if (u.dead) continue;
      if (u.idle) { if (u.kind === "hero" && u.pendingRoot && W.t >= u.pendingRoot.at) { u.rootUntil = W.t + u.pendingRoot.dur; u.pendingRoot = null; } continue; }
      if (u.kind === "hero") heroThink(W, u); else if (u.kind === "tower") towerThink(W, u); else if (u.kind === "minion") minionThink(W, u); else if (u.kind === "neutral") neutralThink(W, u); else if (u.kind === "titan") titanThink(W, u);
    }
    for (const u of W.units) tickDots(W, u);
    W.t += DT;
  }
  return W;
}
function finished(W) {
  if (W.end === "combo") { const h = W.attacker, c = h.combo; if (h.dead || W.units.every((u) => u === h || u.dead || u.kind !== "hero")) return true;
    const avail = ["q", "rmb", "e", "r"].filter((s) => h.k[s] && rankOf(s, h.L) && (s !== "r" || h.L >= 6) && (at(h.k[s].cost, rankOf(s, h.L)) ?? 0) <= h.s.resource);
    if (avail.every((s) => c.used.has(s)) && !h.pending) { c.doneAt ??= W.t; return W.t - c.doneAt >= c.tail; } return false; }
  if (W.end === "objective") return !!W.objective?.dead || !W.units.some((u) => u.kind === "hero" && !u.dead && u.team !== W.objective.team);
  if (W.end === "waveClear") return !W.units.some((u) => u.kind === "minion" && !u.dead) || !W.units.some((u) => u.kind === "hero" && !u.dead);
  const teams = new Set(W.units.filter((u) => u.kind === "hero" && !u.dead).map((u) => u.team));
  return teams.size < 2;
}
