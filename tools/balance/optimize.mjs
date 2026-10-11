// Coordinate descent over per-hero hp and damage multipliers.
// Goal: every hero's 1v1 average in 45–55%, no pair past 70/30 (04 §3). Writes tools/balance/out/mults.json.
import DATA from "../../scripts/lib/data/heroes.yml";
import { matrix } from "./duel.mjs";
const ids = DATA.slice, n = +(process.argv[2] ?? 40), rounds = +(process.argv[3] ?? 6);
let P = {}; try { P = JSON.parse(await Bun.file("tools/balance/out/mults.json").text()); } catch {}
for (const i of ids) P[i] ??= { hp: 1, dmg: 1 };
function score(P) {
  const m = matrix(ids, n, P); let j = 0, worst = 0;
  for (const a of ids) {
    const avg = ids.filter((b) => b !== a).reduce((s, b) => s + m[a][b], 0) / (ids.length - 1);
    j += 6 * Math.max(0, Math.abs(avg - 0.5) - 0.02) ** 2;
    for (const b of ids) if (b !== a) { const d = Math.abs(m[a][b] - 0.5); worst = Math.max(worst, m[a][b]); j += Math.max(0, d - 0.12) ** 2 + 4 * Math.max(0, d - 0.18) ** 2; }
  }
  return { j, worst };
}
let best = score(P), step = 0.1;
console.log("start", best.j.toFixed(4), "worst", best.worst.toFixed(2));
for (let r = 0; r < rounds; r++, step *= 0.65) {
  for (const i of ids) for (const key of ["hp", "dmg"]) for (const sgn of [1, -1]) {
    const Q = structuredClone(P); Q[i][key] = Math.min(1.6, Math.max(0.6, Q[i][key] * (1 + sgn * step)));
    const s = score(Q); if (s.j < best.j) { P = Q; best = s; break; }
  }
  console.log("round", r, best.j.toFixed(4), "worst", best.worst.toFixed(2), JSON.stringify(Object.fromEntries(ids.map((i) => [i, [P[i].hp.toFixed(2), P[i].dmg.toFixed(2)]]))));
  await Bun.write("tools/balance/out/mults.json", JSON.stringify(P, null, 1));
}
