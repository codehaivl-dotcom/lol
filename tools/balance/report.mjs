// Prints the 1v1 matrix per level, with optional multipliers: bun tools/balance/report.mjs [mults.json] [n]
import DATA from "../../scripts/lib/data/heroes.yml";
import { matrix, LEVELS } from "./duel.mjs";
const mults = process.argv[2] ? JSON.parse(await Bun.file(process.argv[2]).text()) : {};
const n = +(process.argv[3] ?? 60), ids = DATA.slice, pad = (s, w) => String(s).padEnd(w);
for (const lv of [...LEVELS.map((l) => [l]), LEVELS]) {
  const m = matrix(ids, n, mults, lv);
  console.log(`\nlevel ${lv.join(",")}\n` + pad("", 9) + ids.map((x) => pad(x.slice(0, 7), 8)).join("") + "avg");
  for (const a of ids) console.log(pad(a.slice(0, 8), 9) + ids.map((b) => a === b ? pad("-", 8) : pad(Math.round(m[a][b] * 100), 8)).join("") + (ids.filter((b) => b !== a).reduce((s, b) => s + m[a][b], 0) / (ids.length - 1) * 100).toFixed(1));
}
