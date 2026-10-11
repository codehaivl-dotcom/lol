// Bộ giả lập chuẩn Cổ Linh (doc 73) · các bài thử. Mỗi bài nhận snapshot (progress.mjs) và trả số liệu thô; run.mjs chấm gate.
import { heroUnit, towerUnit, minionUnit, neutralUnit, titanUnit, world, run, rankOf } from "./engine.mjs";
import { snapshot } from "./progress.mjs";
import { ST, kit, roleGroup } from "./data.mjs";

const hero = (id, snap, team, pos, profile, extra = {}) => heroUnit(id, { level: snap.level, items: snap.items, team, pos, profile, ...extra });
const spread = (n, i) => (i - (n - 1) / 2) * 2.5;

// N vs M tướng. blue/red = [{ id, snap }]
export function fight(blue, red, { seed = 1, profile = "newbie", maxT = 45, gap = 14 } = {}) {
  const U = [...blue.map((b, i) => hero(b.id, b.snap, "blue", { x: -gap / 2, z: spread(blue.length, i) }, profile)),
             ...red.map((b, i) => hero(b.id, b.snap, "red", { x: gap / 2, z: spread(red.length, i) }, profile))];
  const W = run(world(U, { seed, maxT }));
  const up = (team) => U.some((u) => u.team === team && !u.dead);
  return { w: up("blue") && !up("red") ? 1 : up("red") && !up("blue") ? 0 : 0.5, t: W.t, units: U };
}
export function duelRate(a, b, minute, { n = 40, profile = "newbie", seed = 1, snapA, snapB } = {}) {
  if (snapA === undefined && snapB === undefined && minute === "full") { snapA = snapshot(a, "full", { profile }); snapB = snapshot(b, "full", { profile }); }
  const sa = snapA ?? snapshot(a, minute, { profile }), sb = snapB ?? snapshot(b, minute, { profile });
  let w = 0, t = 0;
  for (let i = 0; i < n; i++) { const r = fight([{ id: a, snap: sa }], [{ id: b, snap: sb }], { seed: seed + i, profile }); w += r.w; t += r.t; }
  return { win: w / n, avgT: t / n };
}
// 1 tướng đánh 2 tướng
export function soloVs2(a, b, c, minute, { n = 30, profile = "newbie", ahead = false, seed = 1 } = {}) {
  const sa = ahead ? snapshot(a, minute, { profile, xpAdd: 1500, goldAdd: 1500 }) : snapshot(a, minute, { profile });
  let w = 0;
  for (let i = 0; i < n; i++) w += fight([{ id: a, snap: sa }], [{ id: b, snap: snapshot(b, minute, { profile }) }, { id: c, snap: snapshot(c, minute, { profile }) }], { seed: seed + i, profile }).w;
  return w / n;
}
// trụ cấp 1 đối phương ở x=+18; tướng đứng x=0; withWave = một đợt lính đồng minh đi cùng
export function towerSolo(id, minute, { withWave = false, profile = "newbie", seed = 1, tier = 1 } = {}) {
  const snap = snapshot(id, minute, { profile });
  const T = towerUnit(tier, "red", { x: 18, z: 0 });
  const U = [hero(id, snap, "blue", { x: 0, z: 0 }, profile), T];
  if (withWave) ST.minions.composition.forEach((k, i) => U.push(minionUnit(k, "blue", { x: 2 + (k === "melee" ? 3 : 0) - i * 0.4, z: spread(6, i) * 0.4 })));
  const W = run(world(U, { seed, maxT: 120, end: "objective", objective: T }));
  const h = U[0];
  return { razed: T.dead, died: h.dead, t: W.t, hpLeft: h.hp / h.s.hp, towerHpLeft: T.hp / T.s.hp };
}
// một đợt lính địch lao vào tướng
export function waveClear(id, minute, { profile = "newbie", seed = 1 } = {}) {
  const snap = snapshot(id, minute, { profile });
  const h = hero(id, snap, "blue", { x: 0, z: 0 }, profile);
  const U = [h, ...ST.minions.composition.map((k, i) => minionUnit(k, "red", { x: 9 + (k === "melee" ? 0 : 3), z: spread(6, i) * 0.5 }))];
  for (const m of U.slice(1)) m.hitHeroAtOverride = true;
  const W = run(world(U, { seed, maxT: 90, end: "waveClear" }));
  return { cleared: !U.some((u) => u.kind === "minion" && !u.dead), died: h.dead, t: W.t, hpLost: 1 - h.hp / h.s.hp };
}
// một quái rừng (objectives.yml neutral_v01) ở cấp neo; tướng ở phút chỉ định
export function campClear(id, unitId, minute, { profile = "newbie", seed = 1, level = null, party = null } = {}) {
  const ids = party ?? [id];
  const snaps = ids.map((x) => snapshot(x, minute, { profile }));
  const N = neutralUnit(unitId, level ?? Math.max(...snaps.map((s) => s.level)), "neutral", { x: 4, z: 0 });
  const H = ids.map((x, i) => hero(x, snaps[i], "blue", { x: 0, z: spread(ids.length, i) }, profile));
  const W = run(world([...H, N], { seed, maxT: 120, end: "objective", objective: N }));
  return { killed: N.dead, deaths: H.filter((h) => h.dead).length, t: W.t, hpLeft: Math.min(...H.map((h) => h.hp / h.s.hp)), level: N.level };
}
// Cổ Titan rank r
export function boss(ids, minute, { rank = 1, profile = "newbie", seed = 1, maxT = 180 } = {}) {
  const snaps = ids.map((x) => snapshot(x, minute, { profile }));
  const avgL = snaps.reduce((a, s) => a + s.level, 0) / snaps.length;
  const B = titanUnit(rank, avgL, "neutral", { x: 6, z: 0 });
  const H = ids.map((x, i) => hero(x, snaps[i], "blue", { x: -2, z: spread(ids.length, i) }, profile));
  const W = run(world([...H, B], { seed, maxT, end: "objective", objective: B }));
  return { killed: B.dead, deaths: H.filter((h) => h.dead).length, t: W.t, bossHpLeft: B.hp / B.s.hp };
}

// ── One-Combo Kill Test ─────────────────────────────────────────────────────────────────────────────────
// mode "theory": mục tiêu đứng yên, mọi đòn trúng (theoretical maximum burst)
// mode "newbie": hai bên là AI newbie, mục tiêu chống trả/né theo mô hình (realistic newbie combo)
// Một combo = mỗi chiêu sẵn có (Q, RMB, E, R nếu đủ cấp và mana) dùng đúng một lần, xen đòn đánh thường, rồi một nhịp đánh thường.
const CAT_OF = (tag) => tag === "aa" ? "aa" : tag.startsWith("item:") ? "item" : tag.startsWith("passive") ? "passive" : tag.startsWith("skill:") ? "skill" : "other";
export function combo(aId, aSnap, tId, tSnap, { mode = "theory", seed = 1, replay = false, startGap = null } = {}) {
  const prof = mode === "theory" ? "skilled" : "newbie";
  const A = hero(aId, aSnap, "blue", { x: 0, z: 0 }, prof);
  const longest = Math.max(...["q", "rmb", "e", "r"].map((s) => kit(aId)[s]).filter(Boolean).map((ab) => ab.dash?.toward ? 3 : ab.aim === "self" ? 2 : (ab.range || ab.radius || 3)));
  const gap = startGap ?? Math.min(longest, Math.max(2, kit(aId).lmb.range ?? 2)) * 0.9;
  const T = hero(tId, tSnap, "red", { x: gap, z: 0 }, mode === "theory" ? "dummy" : "newbie");
  if (mode === "theory") T.idle = true;
  A.prof = { ...A.prof, castOrder: ["e", "q", "rmb", "r"], saveUlt: false };
  A.combo = { used: new Set(), tail: Math.max(0.4, 1 / A.s.attackSpeed), lastCast: 0 };
  const W = world([A, T], { seed, maxT: 12, end: "combo" });
  W.attacker = A; W.allHit = mode === "theory"; if (replay) W.replay = [];
  run(W);
  const toT = (W.replay ?? []).filter((r) => r[3] === tId);
  const by = { skill: 0, item: 0, passive: 0, aa: 0, other: 0 };
  for (const [tag, v] of Object.entries(A.by)) by[CAT_OF(tag)] += v;
  const dealt = Object.values(by).reduce((a, b) => a + b, 0);
  const firstHit = A.firstHitAt;
  const cdLeft = Math.max(0, ...Object.entries(A.cds).map(([, v]) => v - W.t));
  return { attacker: aId, target: tId, mode, aLevel: aSnap.level, tLevel: tSnap.level, aGold: aSnap.gold, tGold: tSnap.gold,
    dealt: Math.round(dealt), pct: dealt / T.s.hp, hpLostPct: 1 - Math.max(0, T.hp) / T.s.hp, killed: T.dead, killAt: T.m.diedAt,
    comboSeconds: +(A.combo.doneAt ?? W.t).toFixed(2), by, byTag: Object.fromEntries(Object.entries(A.by).map(([k, v]) => [k, Math.round(v)])),
    casts: { ...A.casts }, procs: { ...A.procs }, attackerHpLeft: A.hp / A.s.hp, comboCooldown: +cdLeft.toFixed(1), targetShieldAbsorb: Math.round(T.m.absorbed),
    resets: Object.entries(A.casts).filter(([, n]) => n > 1).map(([s]) => s), replay: W.replay ?? null };
}
