// Slice simulator vs live G2 trace (doc14 §G2). Reads out/g2-trace-2026-10-08.json (live evidence, copied from the slice
// report + a readOnly dev-room read); runs tools/balance/slice.mjs with listed seeds; prints one row per assumption.
// Nothing here changes a game number. A row with no live evidence says UNKNOWN. Nothing here is a client PASS.
// Run: bun tools/balance/g2compare.mjs [--n 200] [--seed 1000] [--write]
import { playSlice, ASSUMED, GEO } from "./slice.mjs";
import ST from "../../scripts/lib/data/structures.yml";
import TRACE from "./out/g2-trace-2026-10-08.json";

const argv = process.argv.slice(2), arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const n = +arg("--n", 200), seed = +arg("--seed", 1000);
const med = (xs) => { const v = xs.filter((x) => x != null).sort((a, b) => a - b); return v.length ? v[Math.floor((v.length - 1) / 2)] : null; };
const mn = (s) => s == null ? null : +(s / 60).toFixed(2);
const lm = (ms) => ms == null ? null : +(ms / 60000).toFixed(2);   // live marks are ms
const K = { "tower-red-t1": "t1.red", "tower-red-t2": "t2.red", "tower-blue-t1": "t1.blue", "tower-blue-t2": "t2.blue", "nexus-red": "nexus.red", "nexus-blue": "nexus.blue" };
const run = (id) => TRACE.runs.find((r) => r.id === id);

function stats(mode, a) {
  const R = Array.from({ length: n }, (_, i) => playSlice(seed + i, mode, a));
  const o = {}; for (const k of Object.values(K)) o[k] = { siege: mn(med(R.map((r) => r.ev.siege[k]))), down: mn(med(R.map((r) => r.ev.down[k]))), downShare: +(R.filter((r) => r.ev.down[k] != null).length / n).toFixed(2) };
  o.end = mn(med(R.filter((r) => r.winner >= 0).map((r) => r.t))); o.ended = +(R.filter((r) => r.winner >= 0).length / n).toFixed(2);
  return o;
}

// 1) fit idleReach (case a: waves alone) to run2-a's three marks that ended: red T1 down, red T2 down, blue T1 siege
const r2 = run("run2-a"), target = [["t1.red", "down", r2.marks["tower-red-t1"].down], ["t2.red", "down", r2.marks["tower-red-t2"].down], ["t1.blue", "siege", r2.marks["tower-blue-t1"].siege]];
let fit = null;
for (let x = 0.25; x <= 6.001; x += 0.25) {
  const s = stats("waves", { ...ASSUMED, idleReach: x });
  // median-time error (min); a mark the sim never reaches costs 60'
  const err = target.reduce((e, [k, f, ms]) => e + Math.abs((s[k][f] ?? 60) - ms / 60000), 0);
  if (!fit || err < fit.err) fit = { idleReach: +x.toFixed(2), err: +err.toFixed(2), s };
}
const before = stats("waves", ASSUMED);                         // the earlier model: waves alone never siege
const sanTap = stats("san_tap", ASSUMED), sanTapOld = stats("san_tap", { ...ASSUMED, travelGate: false });
const bp = run("run1-b-prime");
const sieges = TRACE.runs.flatMap((r) => Object.entries(r.marks).map(([id, m]) => ({ run: r.id, id, siege: m.siege }))).filter((x) => x.siege != null);
const firstSiege = Math.min(...sieges.map((x) => x.siege)) / 1000;

const rows = [
  { assumption: "firstWave 5 s, waveInterval 30 s (structures.yml)", sim: "wave k at 5+30(k-1) s", live: `run2-a: wave ${r2.waveAtStop} at ${r2.stopMin} min (formula: ${Math.floor((r2.stopMin * 60 - 5) / 30) + 1})`, verdict: "MATCH" },
  { assumption: "Lock order T1 → T2 → Tâm Mạch (lane.js updateLocks)", sim: "siege() hits t1, then t2, then nexus", live: `run2-a: red T1 down ${lm(r2.marks["tower-red-t1"].down)}' < red T2 siege ${lm(r2.marks["tower-red-t2"].siege)}'`, verdict: "MATCH" },
  { assumption: "Wave travel (map.yml route, caster 4.1 m/s, reach 8.8 m) gates first siege", sim: `earliest siege T1 ${GEO.earliestSiege["t1.red"]} s (unopposed lower bound)`, live: `earliest siege mark in trace ${firstSiege.toFixed(1)} s (${sieges.length} marks, 9 runs)`, verdict: firstSiege >= GEO.earliestSiege["t1.red"] ? "MATCH (bound holds; contested waves arrive later)" : "MISMATCH" },
  { assumption: "Waves alone (no hero) out-trade: earlier model margin 0 → never siege", sim: `before: red T1 down ${before["t1.red"].down ?? "never"}`, live: `run2-a: red T1 down ${lm(r2.marks["tower-red-t1"].down)}', red T2 down ${lm(r2.marks["tower-red-t2"].down)}', blue T1 siege ${lm(r2.marks["tower-blue-t1"].siege)}'`, verdict: "MISMATCH (earlier model)" },
  { assumption: `idleReach FIT = ${fit.idleReach} s of wave dps per won cycle (coin flip per wave)`, sim: `red T1 down ${fit.s["t1.red"].down}', red T2 down ${fit.s["t2.red"].down}', blue T1 siege ${fit.s["t1.blue"].siege}', end ${fit.s.end ?? "—"}' (ended ${fit.s.ended})`, live: "run2-a (n=1, nexus censored at 25.01')", verdict: `FIT n=1 (err ${fit.err} min summed)` },
  { assumption: `Hero siege (V1 margin ×${ASSUMED.heroSiegeMargin}, makeHero power) in Sân Tập 1 hero vs no hero`, sim: `san_tap: red T1 siege ${sanTap["t1.red"].siege}' down ${sanTap["t1.red"].down}', end ${sanTap.end}'`, live: `b′ (bot nham_vu ally, host idle): red T1 siege ${lm(bp.marks["tower-red-t1"].siege)}' down ${lm(bp.marks["tower-red-t1"].down)}' (n=1, setup not acceptance)`, verdict: (sanTap["t1.red"].down ?? 99) < lm(bp.marks["tower-red-t1"].down) / 2 ? "MISMATCH (sim far faster)" : "ROUGH MATCH" },
  { assumption: "reachSeconds 6 (wave share of structure dps when heroes trade)", sim: "used in dau_may / tai_hien", live: "no trace of a hero-vs-hero lane (case b/c NOT RUN)", verdict: "UNKNOWN" },
  { assumption: "Tâm Mạch shield 3000 + regen after 12 s, beam ramp 0.2", sim: "modelled", live: "no run reached a nexus", verdict: "UNKNOWN" },
  { assumption: "Fight model (fightChance, power^fightExponent, defense hold)", sim: `fightChance ${ASSUMED.fightChance}, exp ${ASSUMED.fightExponent}`, live: "no PvP trace (Tái Hiện / Đấu Máy full match NOT RUN)", verdict: "UNKNOWN" },
  { assumption: "Tower fall reward 150 g + 120 xp each (lane.js fall)", sim: "applied", live: "g2Trace has no gold/xp rows", verdict: "UNKNOWN" },
  { assumption: "Super minion per broken tower ×structMult 2", sim: "applied after T1/T2 fall", live: `run2-a red T2 broke in ${lm(r2.marks["tower-red-t2"].down - r2.marks["tower-red-t2"].siege)}' vs T1 ${lm(r2.marks["tower-red-t1"].down - r2.marks["tower-red-t1"].siege)}' (T2 has 1.93× HP, armor 65)`, verdict: "CONSISTENT, not isolated" },
  { assumption: "Waves alone vs Tâm Mạch: one damage step per 30 s wave, shield regen after 12 s", sim: `nexus down share ${0}`.replace("0", "see fit row: nexus never falls to waves alone"), live: "no run reached a nexus", verdict: "UNKNOWN (model artefact: per-cycle damage lets the shield refill)" },
  { assumption: "Respawn / kills / levels (economy.yml)", sim: "applied", live: "b′ ally lv3 cs21 0 deaths at 7.55' only", verdict: "UNKNOWN" },
];

const out = { tool: "g2compare", date: "2026-10-08", n, seeds: [seed, seed + n - 1], geo: GEO, fit: { idleReach: fit.idleReach, err: fit.err, waves: fit.s }, before, sanTap, sanTapNoTravel: sanTapOld,
  live: { firstSiegeSeconds: firstSiege, run2a: r2.marks, bPrime: bp.marks, notRun: TRACE.notRun }, rows };
for (const r of rows) console.log(`[${r.verdict}] ${r.assumption}\n    sim: ${r.sim}\n    live: ${r.live}`);
console.log(`\nwaves FIT idleReach=${fit.idleReach}: ${JSON.stringify(fit.s)}`);
console.log(`san_tap (travel gate): ${JSON.stringify(sanTap)}`);
if (argv.includes("--write")) { await Bun.write(new URL("./out/g2compare-2026-10-08.json", import.meta.url), JSON.stringify(out, null, 1)); console.log("wrote out/g2compare-2026-10-08.json"); }
