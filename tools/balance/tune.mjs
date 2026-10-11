// Finds per-hero power multipliers (hp × dmg) that pull every hero's 1v1 average toward 50%.
// Output is a proposal: tools/balance/bake.py writes it into heroes.yml as rounded numbers, then duel.mjs re-checks.
import DATA from "../../scripts/lib/data/heroes.yml";
import { matrix } from "./duel.mjs";
const ids = DATA.slice, k = Object.fromEntries(ids.map((i) => [i, 1]));
const iters = +(process.argv[2] ?? 10), n = +(process.argv[3] ?? 60);
for (let it = 0; it < iters; it++) {
  const mults = Object.fromEntries(ids.map((i) => [i, { hp: Math.sqrt(k[i]), dmg: Math.sqrt(k[i]) }]));
  const m = matrix(ids, n, mults);
  const avg = Object.fromEntries(ids.map((a) => [a, ids.filter((b) => b !== a).reduce((s, b) => s + m[a][b], 0) / (ids.length - 1)]));
  const worst = Math.max(...ids.flatMap((a) => ids.filter((b) => b !== a).map((b) => m[a][b])));
  console.log(it, ids.map((i) => `${i}:${(avg[i] * 100).toFixed(0)}%×${k[i].toFixed(2)}`).join(" "), "worst", (worst * 100).toFixed(0) + "%");
  for (const i of ids) k[i] *= Math.min(1.25, Math.max(0.8, Math.pow(0.5 / Math.min(0.97, Math.max(0.03, avg[i])), 0.45)));
}
await Bun.write("tools/balance/out/mults.json", JSON.stringify(Object.fromEntries(ids.map((i) => [i, { hp: Math.sqrt(k[i]), dmg: Math.sqrt(k[i]) }])), null, 1));
