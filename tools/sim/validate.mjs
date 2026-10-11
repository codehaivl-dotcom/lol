// COLINH Balance Lab · NGHIỆM THU THỐNG KÊ (creator 2026-10-10). Áp chuẩn vai (standard/tuning.yml). Chỉ trong Lab: không đụng runtime.
//   bun tools/sim/validate.mjs duel --heroes a,b,c [--n 1000] [--raw]   1v1 vs nhóm mốc 6 tướng gốc, mỗi ô (cặp×phút) n lượt, nửa đảo phe, + hồ sơ average
//   bun tools/sim/validate.mjs team --heroes a,b [--n 100]              2v2/3v3: có tướng X vs đối chứng thay X bằng carry; đo heal/shield/CC/cứu/KP
//   bun tools/sim/validate.mjs diag --heroes a [--n 500]                chẩn đoán kit: dùng chiêu, trúng, util, combo, nguyên nhân thua, tách từng chiêu
// --out <tên> ghi reports/sim/<ngày>-<tên>/report.json. PASS_MODEL only; NOT_TESTED engine.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import YAML from "yaml";
import { LIVE, ROOT, ROLES, kit, roleGroup, loadAllCandidates, loadStandard, patchKit, revision } from "./data.mjs";
import { snapshot } from "./progress.mjs";
import { fight } from "./scenarios.mjs";
import { rankOf } from "./engine.mjs";
const argv = process.argv.slice(2), mode = argv[0], arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; }, flag = (k) => argv.includes(k);
loadAllCandidates(); const STD = flag("--raw") ? {} : loadStandard();
const HEROES = (arg("--heroes", "") || "").split(",").filter(Boolean), PANEL = [...LIVE], MIN = ROLES.minutes;
// --healx q:1.3 : nhân hồi máu (base + ap) của một chiêu của tướng đầu, chỉ trong lượt chạy này (A/B, không sửa file ứng viên)
if (arg("--healx")) { const [sl, f] = arg("--healx").split(":"); const ab = kit(HEROES[0])[sl]; ab.heal = { ...ab.heal, base: Array.isArray(ab.heal.base) ? ab.heal.base.map((x) => x * +f) : ab.heal.base * +f, ap: ab.heal.ap * +f }; }
const wilson = (p, n, z = 1.96) => { if (!n) return [0, 1]; const d = 1 + z * z / n, c = (p + z * z / (2 * n)) / d, h = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d; return [Math.max(0, c - h), Math.min(1, c + h)]; };
const pc = (x) => (x * 100).toFixed(1);
const ci = (w, n) => { const [l, h] = wilson(w, n); return { win: +w.toFixed(4), lo: +l.toFixed(4), hi: +h.toFixed(4), n }; };
const hash = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0; return h % 900000 + 1; };
import { buildOf } from "./data.mjs";
// NHIỄU TIẾN TRÌNH (creator: sửa farm variance + thứ tự mua đồ trước khi chấm khắc chế): mỗi lượt bốc 1 trong VK biến thể/tướng:
// vàng farm ×(1 ± 25%), XP ×(1 ± 10%), 50% đổi chỗ hai món đầu build. --novar tắt (snapshot cố định như cũ).
const VK = flag("--novar") ? 1 : 16;
const SN = {}; const snap = (id, m, profile = "newbie", v = 0) => (SN[id + "|" + m + "|" + profile + "|" + v] ??= (() => {
  if (VK === 1 || m === "full") return snapshot(id, m, { profile });
  const u = (k) => (hash(`${id}|${m}|${v}|${k}`) % 10000) / 10000, b0 = snapshot(id, m, { profile });
  const build = [...buildOf(id)]; if (u("o") < 0.5 && build.length > 1) [build[0], build[1]] = [build[1], build[0]];
  return snapshot(id, m, { profile, build, goldAdd: (b0.gold - 0) * 0.5 * (u("g") - 0.5), xpAdd: b0.xp * 0.2 * (u("x") - 0.5) });
})());
// khoảng tin cậy phân tầng: trung bình đều các ô, phương sai = Σ p(1-p)/n / k² (mỗi ô độc lập); Wilson chỉ dùng cho từng ô
const strat = (cells) => { const k = cells.length, m = cells.reduce((a, c) => a + c.win, 0) / k, v = cells.reduce((a, c) => a + c.win * (1 - c.win) / c.n, 0) / (k * k), h = 1.96 * Math.sqrt(v); return { win: +m.toFixed(4), lo: +Math.max(0, m - h).toFixed(4), hi: +Math.min(1, m + h).toFixed(4), cells: k, perCell: cells[0]?.n, total: cells.reduce((a, c) => a + c.n, 0), spread: [+Math.min(...cells.map((c) => c.win)).toFixed(3), +Math.max(...cells.map((c) => c.win)).toFixed(3)] }; };
const group = (id) => (kit(id).role ?? "").includes("tank") || roleGroup(id) === "support" ? "ts" : roleGroup(id);
const R = { mode, at: new Date().toISOString(), revision: revision(), standard: flag("--raw") ? "raw" : "standard/tuning.yml", status: "PASS_MODEL · NOT_TESTED engine", rows: {} };
// một ô 1v1: n lượt, nửa đầu a bên xanh, nửa sau đảo phe (b xanh); seed độc lập theo cặp/phút
function cell(a, b, m, n, profile = "newbie") {
  const base = hash(`${a}|${b}|${m}|${profile}`) * 1000;
  let w = 0, t = 0; const half = n >> 1;
  for (let i = 0; i < n; i++) { const sa = snap(a, m, profile, (i * 7) % VK), sb = snap(b, m, profile, (i * 11 + 3) % VK); const sw = i >= half; const r = sw ? fight([{ id: b, snap: sb }], [{ id: a, snap: sa }], { seed: base + i, profile }) : fight([{ id: a, snap: sa }], [{ id: b, snap: sb }], { seed: base + i, profile }); w += sw ? 1 - r.w : r.w; t += r.t; }
  return { w: w / n, t: t / n };
}
if (mode === "duel") {
  const N = +arg("--n", 1000), NA = +arg("--na", 200);
  for (const id of HEROES) {
    const cells = [], counter = []; let W = 0, C = 0;
    for (const b of PANEL) if (b !== id) for (const m of MIN) {
      const r = cell(id, b, m, N); const c = ci(r.w, N); cells.push({ vs: b, minute: m, ...c, avgT: +r.t.toFixed(1) }); W += r.w * N; C += N;
      if (c.lo > 0.70 || c.hi < 0.30) counter.push(`${b}@${m}: ${pc(c.win)}% [${pc(c.lo)}–${pc(c.hi)}]`);
    }
    let WA = 0, CA = 0; for (const b of PANEL) if (b !== id) for (const m of MIN) { WA += cell(id, b, m, NA, "average").w * NA; CA += NA; }
    const pooled = strat(cells), avg = ci(WA / CA, CA);
    R.rows[id] = { role: kit(id).role, P: STD[id]?.P ?? 1, pooled, average: avg, perCell: N, cells, counter };
    console.log(`${id} (${kit(id).role}) ×${(STD[id]?.P ?? 1).toFixed(2)}: newbie ${pc(pooled.win)}% [${pc(pooled.lo)}–${pc(pooled.hi)}] (phân tầng ${cells.length} ô × ${N} = ${C} trận; ô thấp–cao ${pc(pooled.spread[0])}–${pc(pooled.spread[1])}%) · average ${pc(avg.win)}% n=${CA}${counter.length ? " · KHẮC CHẾ LỆCH: " + counter.join(", ") : ""}`);
  }
}
// ── team: X + đồng đội vs đối thủ; đối chứng: X thay bằng một carry (đội thiếu tank/support) ──
function teamFight(blue, red, m, seed) {
  const r = fight(blue.map((id) => ({ id, snap: snap(id, m) })), red.map((id) => ({ id, snap: snap(id, m) })), { seed });
  return r;
}
function xMetrics(r, xi) {
  const U = r.units, x = U[xi], foes = U.filter((u) => u.team !== x.team), dead = foes.filter((u) => u.dead);
  const saves = U.filter((u) => u.team === x.team && u !== x && u.savedBy === x.uid && !u.dead).length;
  return { allyHealed: x.m.allyHealed, shieldGiven: x.m.shieldGiven ?? 0, shieldAbs: x.m.shieldAbs ?? 0, cc: x.m.cc, dealt: x.m.heroDealt, taken: x.m.taken,
    survived: x.dead ? 0 : 1, saves, kp: dead.length ? dead.filter((u) => u.hitBy?.has(x.uid)).length / dead.length : null };
}
if (mode === "team") {
  const N = +arg("--n", 100), M = +arg("--minute", 10);
  const ok = (id) => Math.abs(Math.log(STD[id]?.P ?? 1)) <= Math.log(ROLES.bakeLimit);
  const pool = [...PANEL, ...Object.keys(STD).filter((id) => !PANEL.includes(id))].filter((id) => ok(id) || PANEL.includes(id));
  const by = (g, not = []) => pool.filter((id) => group(id) === g && !not.includes(id)).sort();
  const CARRY = ["assassin", "fighter", "mage", "marksman"];
  for (const X of HEROES) {
    const pick = (g, k, not = []) => { const L = by(g, [X, ...not]); return L.length ? L[k % L.length] : null; };
    const ts = (k) => pick("ts", k);
    const out = { role: kit(X).role, minute: M, perCell: N };
    for (const size of [2, 3]) {
      const comps = size === 2 ? CARRY.map((g, k) => [pick(g, k)]) : [["assassin", "marksman"], ["fighter", "mage"], ["mage", "marksman"], ["fighter", "marksman"]].map((gs, k) => gs.map((g) => pick(g, k)));
      const opps = []; for (let k = 0; k < 3; k++) { const c = CARRY.map((g, j) => pick(g, k + j)); opps.push([ts(k + 1), ...c.slice(0, size - 1)]); opps.push(c.slice(k % 2, k % 2 + size)); }
      let wX = 0, wC = 0, n = 0; const met = { allyHealed: 0, shieldGiven: 0, shieldAbs: 0, cc: 0, dealt: 0, taken: 0, survived: 0, saves: 0, kp: 0, kpN: 0 };
      const cellsX = [];
      for (const [ci_, mates] of comps.entries()) {
        if (mates.some((x) => !x)) continue;
        const ctrlGroup = CARRY.find((g) => !mates.some((mm) => group(mm) === g)) ?? "fighter";
        const ctrl = pick(ctrlGroup, ci_, mates);
        for (const [oi, opp] of opps.entries()) {
          if (opp.some((x) => !x) || opp.length !== size) continue;
          const base = hash(`${X}|${mates}|${opp}|${M}`) * 1000; let cx = 0;
          for (let i = 0; i < N; i++) {
            const sw = i >= N >> 1, A = [X, ...mates], Cc = [ctrl, ...mates];
            const r = sw ? teamFight(opp, A, M, base + i) : teamFight(A, opp, M, base + i);
            const xi = sw ? opp.length : 0; const wv = sw ? 1 - r.w : r.w; wX += wv; cx += wv;
            const mm = xMetrics(r, xi); for (const k of Object.keys(mm)) if (k === "kp") { if (mm.kp !== null) { met.kp += mm.kp; met.kpN++; } } else met[k] += mm[k];
            const rc = sw ? teamFight(opp, Cc, M, base + i) : teamFight(Cc, opp, M, base + i); wC += sw ? 1 - rc.w : rc.w; n++;
          }
          cellsX.push({ mates, opp, ctrl, ...ci(cx / N, N) });
        }
      }
      const f = (k) => +(met[k] / n).toFixed(1), waste = met.shieldGiven ? 1 - met.shieldAbs / met.shieldGiven : null;
      out[`${size}v${size}`] = { withX: ci(wX / n, n), control: ci(wC / n, n), value: +((wX - wC) / n).toFixed(4), cells: cellsX.length,
        perFight: { allyHealed: f("allyHealed"), shieldGiven: f("shieldGiven"), shieldAbsorbed: f("shieldAbs"), shieldWaste: waste === null ? null : +waste.toFixed(3), ccSec: +(met.cc / n).toFixed(2), heroDamage: f("dealt"), taken: f("taken"), survival: +(met.survived / n).toFixed(3), saves: +(met.saves / n).toFixed(3), killParticipation: met.kpN ? +(met.kp / met.kpN).toFixed(3) : null } };
      const o = out[`${size}v${size}`];
      console.log(`${X} ${size}v${size} phút ${M}: có X ${pc(o.withX.win)}% [${pc(o.withX.lo)}–${pc(o.withX.hi)}] · đối chứng (thay carry) ${pc(o.control.win)}% [${pc(o.control.lo)}–${pc(o.control.hi)}] · giá trị ${o.value >= 0 ? "+" : ""}${pc(o.value)} điểm · n=${n} (${cellsX.length} ô × ${N}) · heal ${o.perFight.allyHealed} · khiên ${o.perFight.shieldAbsorbed}/${o.perFight.shieldGiven} · CC ${o.perFight.ccSec}s · cứu ${o.perFight.saves} · KP ${o.perFight.killParticipation} · sống ${o.perFight.survival}`);
    }
    R.rows[X] = out;
  }
}
// ── diag: vì sao tướng này thắng/thua ──
if (mode === "diag") {
  const N = +arg("--n", 500), NB = +arg("--nb", 200), SL = ["lmb", "q", "rmb", "e", "r"];
  const winVsPanel = (id, n) => { let w = 0, c = 0; for (const b of PANEL) if (b !== id) for (const m of MIN) { w += cell(id, b, m, n).w * n; c += n; } return { w: w / c, c }; };
  for (const X of HEROES) {
    const agg = { fights: 0, wins: 0, casts: {}, util: {}, hit: {}, by: {}, combo: 0, loss: { died: 0, timeout: 0, foeHpLeft: 0 }, dealt: 0, taken: 0 };
    for (const b of PANEL) if (b !== X) for (const m of MIN) {
      const sa = snap(X, m), sb = snap(b, m), base = hash(`diag|${X}|${b}|${m}`) * 1000;
      for (let i = 0; i < N; i++) {
        const r = fight([{ id: X, snap: sa }], [{ id: b, snap: sb }], { seed: base + i }), x = r.units[0], o = r.units[1];
        agg.fights++; agg.wins += r.w; agg.dealt += x.m.heroDealt; agg.taken += x.m.taken;
        for (const s of SL) { const n = x.casts[s] ?? 0; agg.casts[s] = (agg.casts[s] ?? 0) + n; const cd = kit(X)[s]?.cooldown; if (cd && r.t > 0) { const v = Array.isArray(cd) ? cd[Math.max(0, rankOf(s, sa.level) - 1)] : cd; agg.util[s] = (agg.util[s] ?? 0) + Math.min(1, (n * v) / r.t); } }
        for (const [s, [tr, la]] of Object.entries(x.ht ?? {})) { const h = (agg.hit[s] ??= [0, 0]); h[0] += tr; h[1] += la; }
        for (const [k, v] of Object.entries(x.by)) agg.by[k] = (agg.by[k] ?? 0) + v;
        const need = ["q", "rmb", "e", ...(sa.level >= 6 ? ["r"] : [])]; if (need.every((s) => (x.casts[s] ?? 0) > 0)) agg.combo++;
        if (r.w < 1) { if (x.dead) agg.loss.died++; else agg.loss.timeout++; agg.loss.foeHpLeft += o.hp / o.s.hp; }
      }
    }
    const F = agg.fights, losses = F - agg.wins, tot = Object.values(agg.by).reduce((a, b) => a + b, 0) || 1;
    const out = { role: kit(X).role, P: STD[X]?.P ?? 1, n: F, win: ci(agg.wins / F, F),
      castsPerFight: Object.fromEntries(SL.map((s) => [s, +((agg.casts[s] ?? 0) / F).toFixed(2)])),
      cooldownUtil: Object.fromEntries(Object.entries(agg.util).map(([s, v]) => [s, +(v / F).toFixed(3)])),
      hitRate: Object.fromEntries(Object.entries(agg.hit).map(([s, [t, l]]) => [s, +(l / t).toFixed(3)])),
      damageShare: Object.fromEntries(Object.entries(agg.by).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, +(v / tot).toFixed(3)])),
      comboCompletion: +(agg.combo / F).toFixed(3),
      lossCause: losses ? { died: +(agg.loss.died / losses).toFixed(3), timeout: +(agg.loss.timeout / losses).toFixed(3), foeHpLeftOnLoss: +(agg.loss.foeHpLeft / losses).toFixed(3) } : null,
      dealtPerFight: Math.round(agg.dealt / F), takenPerFight: Math.round(agg.taken / F), ablation: {} };
    const base = winVsPanel(X, NB);
    for (const s of ["q", "rmb", "e", "r", "lmb"]) {
      const k0 = kit(X)[s]; if (!k0) continue; const has = !!k0.damage || !!k0.mimic || s === "lmb"; const row = {};
      for (const f of [0, 1.25]) {
        const saved = structuredClone(kit(X));
        patchKit(X, (k) => { if (s === "lmb") { k.stats.ad *= f || 0.001; k.growth.ad *= f || 0.001; } else if (f === 0) { k[s] = { ...k[s], damage: undefined, effects: undefined, heal: undefined, shield: undefined, mimic: undefined, dash: undefined, cooldown: [999, 999, 999, 999, 999], cost: [1e9, 1e9, 1e9, 1e9, 1e9] }; } else if (k[s].mimic) { k[s].mimic.scale = k[s].mimic.scale.map((v) => v * f); } else if (k[s].damage) { k[s].damage.base = Array.isArray(k[s].damage.base) ? k[s].damage.base.map((v) => v * f) : (k[s].damage.base ?? 0) * f; for (const key of ["ad", "ap", "bonusAd"]) if (k[s].damage[key]) k[s].damage[key] *= f; } });
        for (const key of Object.keys(SN)) if (key.startsWith(X)) delete SN[key];
        row[f === 0 ? "removed" : "x1.25"] = +(winVsPanel(X, NB).w - base.w).toFixed(4);
        patchKit(X, () => saved); for (const key of Object.keys(SN)) if (key.startsWith(X)) delete SN[key];
      }
      if (!has) delete row["x1.25"];
      out.ablation[s] = row;
    }
    out.ablationBase = +base.w.toFixed(4);
    R.rows[X] = out;
    console.log(`${X} (${out.role}) ×${out.P.toFixed(2)}: win ${pc(out.win.win)}% [${pc(out.win.lo)}–${pc(out.win.hi)}] n=${F}\n  chiêu/trận ${JSON.stringify(out.castsPerFight)}\n  dùng hồi chiêu ${JSON.stringify(out.cooldownUtil)}\n  trúng ${JSON.stringify(out.hitRate)}\n  combo đủ ${pc(out.comboCompletion)}% · sát thương ${JSON.stringify(out.damageShare)}\n  thua: ${JSON.stringify(out.lossCause)} · gây ${out.dealtPerFight}/nhận ${out.takenPerFight}\n  tách chiêu (Δwin, gốc ${pc(base.w)}%): ${JSON.stringify(out.ablation)}`);
  }
}
// ── team2 (creator 2026-10-10): giá trị biên của X so với (a) TANK CÙNG VAI và (b) CARRY trong đội thiếu tuyến trước ──
// cùng đồng đội, cùng đối thủ, cùng seed, đảo phe, nhiễu tiến trình. Đối thủ: có tuyến trước và không có.
const CARRY = ["assassin", "fighter", "mage", "marksman"];
const front = (id) => (kit(id).role ?? "").includes("tank");
function teamValue(X, { N = 60, M = 10, tanks, refs, quiet = false } = {}) {
  const lim = (id) => Math.abs(Math.log(STD[id]?.P ?? 1)) <= Math.log(ROLES.bakeLimit);
  const pool = [...new Set([...PANEL, ...Object.keys(STD)])].filter((id) => id !== X && lim(id) && kit(id));
  const carries = (g) => pool.filter((id) => roleGroup(id) === g && !front(id)).sort();
  const pick = (g, k) => { const L = carries(g); return L[k % L.length]; };
  const T = tanks ?? pool.filter(front).sort(); const REF = refs ?? T; // refs: đối chứng cùng vai (support so support); T: tuyến trước của đối thủ
  const res = { hero: X, minute: M, perCell: N, tanks: T, refs: refs ?? null, sizes: {} };
  const play = (A, B, i, base) => { const sw = i >= N >> 1, v1 = (i * 7) % VK, v2 = (i * 11 + 3) % VK;
    const mk = (L, v) => L.map((id, j) => ({ id, snap: snap(id, M, "newbie", (v + j * 5) % VK) }));
    const r = sw ? fight(mk(B, v2), mk(A, v1), { seed: base + i }) : fight(mk(A, v1), mk(B, v2), { seed: base + i });
    return { w: sw ? 1 - r.w : r.w, x: r.units[sw ? B.length : 0], r }; };
  for (const size of [2, 3]) {
    const mates = size === 2 ? CARRY.map((g, k) => [pick(g, k)]) : [["assassin", "marksman"], ["fighter", "mage"], ["mage", "marksman"], ["fighter", "marksman"]].map((gs, k) => gs.map((g) => pick(g, k)));
    const opps = []; for (let k = 0; k < 2; k++) { const c = CARRY.map((g, j) => pick(g, k + j + 1)); opps.push({ kind: "frontline", team: [T[(k + 1) % T.length], ...c.slice(0, size - 1)] }); opps.push({ kind: "no-frontline", team: c.slice(k, k + size) }); }
    const rows = []; const met = { absorbed: 0, mitigated: 0, taken: 0, dealt: 0, cc: 0, survived: 0, saves: 0, kp: 0, kpN: 0, n: 0 };
    for (const [mi, mt] of mates.entries()) for (const op of opps) {
      if (op.team.some((id) => !id || mt.includes(id))) continue;
      const base = hash(`t2|${X}|${mt}|${op.team}|${M}`) * 1000; const ctrlC = pick(CARRY.find((g) => !mt.some((x) => roleGroup(x) === g)) ?? "fighter", mi + 2);
      let wX = 0, wC = 0; const wT = Object.fromEntries(REF.filter((t) => !op.team.includes(t) && !mt.includes(t)).map((t) => [t, 0]));
      for (let i = 0; i < N; i++) {
        const a = play([X, ...mt], op.team, i, base); wX += a.w;
        const x = a.x, U = a.r.units, foes = U.filter((u) => u.team !== x.team), dead = foes.filter((u) => u.dead);
        met.absorbed += x.m.absorbed; met.mitigated += x.m.mitigated ?? 0; met.taken += x.m.taken; met.dealt += x.m.heroDealt; met.cc += x.m.cc; met.survived += x.dead ? 0 : 1;
        met.saves += U.filter((u) => u.team === x.team && u !== x && u.savedBy === x.uid && !u.dead).length; if (dead.length) { met.kp += dead.filter((u) => u.hitBy?.has(x.uid)).length / dead.length; met.kpN++; } met.n++;
        wC += play([ctrlC, ...mt], op.team, i, base).w;
        for (const t of Object.keys(wT)) wT[t] += play([t, ...mt], op.team, i, base).w;
      }
      const tAvg = Object.values(wT).reduce((p, q) => p + q, 0) / Object.keys(wT).length / N;
      rows.push({ mates: mt, opp: op.team, oppKind: op.kind, carry: ctrlC, withX: ci(wX / N, N), withCarry: ci(wC / N, N), withTank: Object.fromEntries(Object.entries(wT).map(([t, w]) => [t, +(w / N).toFixed(3)])), dTank: +(wX / N - tAvg).toFixed(4), dCarry: +((wX - wC) / N).toFixed(4) });
    }
    const avg = (k) => rows.reduce((p, r) => p + r[k], 0) / rows.length, f = (k) => +(met[k] / met.n).toFixed(1);
    const nX = rows.length * N, wx = rows.reduce((p, r) => p + r.withX.win, 0) / rows.length;
    const S = { cells: rows.length, total: nX, withX: strat(rows.map((r) => r.withX)), dTank: +avg("dTank").toFixed(4), dCarry: +avg("dCarry").toFixed(4), dCarryOver15: rows.filter((r) => r.dCarry > 0.15).length,
      seDiff: +(1.96 * Math.sqrt(2 * 0.25 / nX)).toFixed(4), perFight: { absorbed: f("absorbed"), mitigatedByArmorMr: f("mitigated"), taken: f("taken"), heroDamage: f("dealt"), ccSec: +(met.cc / met.n).toFixed(2), survival: +(met.survived / met.n).toFixed(3), saves: +(met.saves / met.n).toFixed(3), kp: +(met.kp / met.kpN).toFixed(3) }, rows };
    res.sizes[`${size}v${size}`] = S;
    if (!quiet) console.log(`${X} ${size}v${size} p${M}: đội có X ${pc(S.withX.win)}% [${pc(S.withX.lo)}–${pc(S.withX.hi)}] (${S.cells} ô × ${N}) · Δ so tank cùng vai ${S.dTank >= 0 ? "+" : ""}${pc(S.dTank)} · Δ so carry ${S.dCarry >= 0 ? "+" : ""}${pc(S.dCarry)} (ô >+15: ${S.dCarryOver15}/${S.cells}) · ±${pc(S.seDiff)} · hấp thụ ${S.perFight.absorbed} · giáp/kháng chặn ${S.perFight.mitigatedByArmorMr} · chịu ${S.perFight.taken} · gây ${S.perFight.heroDamage} · CC ${S.perFight.ccSec}s · sống ${S.perFight.survival} · cứu ${S.perFight.saves} · KP ${S.perFight.kp}`);
  }
  return res;
}
function soloFloor(X, n = 200) { const cells = []; for (const b of PANEL) if (b !== X) for (const m of MIN) { const r = cell(X, b, m, n); cells.push({ vs: b, minute: m, ...ci(r.w, n) }); } return { ...strat(cells), byFoe: Object.fromEntries(PANEL.filter((b) => b !== X).map((b) => [b, +(cells.filter((c) => c.vs === b).reduce((p, c) => p + c.win, 0) / MIN.length).toFixed(3)])) }; }
if (mode === "team2") {
  const tanks = arg("--tanks") ? arg("--tanks").split(",") : undefined, refs = arg("--refs") ? arg("--refs").split(",") : undefined;
  for (const X of HEROES) R.rows[X] = teamValue(X, { N: +arg("--n", 100), M: +arg("--minute", 10), tanks, refs });
}
// ── fittank: chỉ chỉnh chỉ số phòng thủ (hp, armor, mr + growth) — không đụng sát thương. Mục tiêu: Δ so tank cùng vai ∈ [−5, +5] (trung bình 2v2/3v3), sàn solo mềm ──
if (mode === "fittank") {
  const X = HEROES[0], tanks = arg("--tanks") ? arg("--tanks").split(",") : undefined, refs = arg("--refs") ? arg("--refs").split(",") : undefined, grid = (arg("--grid", "0.8,0.85,0.9,0.95,1.0,1.05")).split(",").map(Number), N = +arg("--n", 60);
  // --patch '{"r.effects.0.stun":0.6}': thử nghiệm kit trong Lab (đường dẫn chấm), áp trước lưới phòng thủ
  if (arg("--patch")) patchKit(X, (k) => { for (const [path, v] of Object.entries(JSON.parse(arg("--patch")))) { const ps = path.split("."), last = ps.pop(); let o = k; for (const q of ps) o = o[q]; o[last] = v; } });
  const orig = structuredClone(kit(X)); patchKit(X, (k) => { k.tuning = { hp: 1, dmg: 1 }; });
  const apply = (d) => patchKit(X, (k) => { for (const key of ["hp", "armor", "mr"]) { k.stats[key] = +(orig.stats[key] * d).toFixed(1); k.growth[key] = +(orig.growth[key] * d).toFixed(2); } k.tuning = { hp: 1, dmg: 1 }; });
  const clr = () => { for (const key of Object.keys(SN)) if (key.startsWith(X + "|")) delete SN[key]; };
  const out = [];
  for (const d of grid) { apply(d); clr(); const tv = teamValue(X, { N, tanks, refs, quiet: true }); const s2 = tv.sizes["2v2"], s3 = tv.sizes["3v3"]; const solo = soloFloor(X, +arg("--ns", 150));
    const row = { d, dTank: +((s2.dTank + s3.dTank) / 2).toFixed(4), dCarry: +((s2.dCarry + s3.dCarry) / 2).toFixed(4), over15: s2.dCarryOver15 + s3.dCarryOver15, cells: s2.cells + s3.cells, solo: solo.win, soloMin: Math.min(...Object.values(solo.byFoe)), absorbed: s3.perFight.absorbed, mitigated: s3.perFight.mitigatedByArmorMr };
    out.push(row); console.log(`d=${d}: Δtank ${pc(row.dTank)} · Δcarry ${pc(row.dCarry)} (ô >+15: ${row.over15}/${row.cells}) · solo ${pc(row.solo)} (cặp thấp nhất ${pc(row.soloMin)}) · giáp/kháng chặn ${row.mitigated}/trận`); }
  const okRows = out.filter((r) => Math.abs(r.dTank) <= 0.05); const best = (okRows.length ? okRows : out).sort((a, b) => Math.abs(a.dTank) - Math.abs(b.dTank))[0];
  R.rows[X] = { grid: out, chosen: best, before: { stats: orig.stats, growth: orig.growth, tuning: orig.tuning } };
  console.log(`→ chọn d=${best.d}`);
  if (flag("--write")) { apply(best.d); const k = kit(X); mkdirSync(ROOT + "tools/sim/standard/kits", { recursive: true });
    writeFileSync(ROOT + `tools/sim/standard/kits/${X}.yml`, `# Lab-only (creator 2026-10-10): ${X} fit theo chức năng tank — chỉ hp/armor/mr ×${best.d}, sát thương giữ số gốc, tuning = 1.\n# Mục tiêu: Δ so cùng vai (${(refs ?? tanks ?? []).join(", ")}) trong [−5, +5] điểm. KHÔNG phải dữ liệu runtime.\n` + YAML.stringify({ heroes: { [X]: { stats: { hp: k.stats.hp, armor: k.stats.armor, mr: k.stats.mr }, growth: { hp: k.growth.hp, armor: k.growth.armor, mr: k.growth.mr } } } })); console.log(`ghi tools/sim/standard/kits/${X}.yml`); }
}
if (arg("--out")) { const d = `reports/sim/${R.at.slice(0, 10)}-${arg("--out")}`; mkdirSync(ROOT + d, { recursive: true }); writeFileSync(ROOT + d + "/report.json", JSON.stringify(R, null, 1)); console.log("→ " + d + "/report.json"); }
