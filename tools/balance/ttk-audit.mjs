// Cổ Linh combat TTK audit (GAP P0, 2026-10-09). Run: bun tools/balance/ttk-audit.mjs [--n 12] [--json out]
// Four measures per attacker→defender pair, at L1/L6/L11, gear none / basic (≈300g) / completed (first completed of the catalog build):
//   aa     : basic attacks only, closed form: EHP / (AD·tuning.dmg·mitigation·AS); no passives, no regen, no movement
//   combo  : one rotation (Q, RMB, E, R if L≥6) of damage at the hero's rank, after resist, as % of target HP
//   kit    : duel.mjs fightReady, full kit + movement vs an idle dummy that only regens (the number doc 69 quoted)
//   fight  : duel.mjs fightReady, both act (dodge, kite, shields, heals); time until the first death (cap MAXT)
// Mirrors combat.js mitigation 100/(100+res). A model, not engine evidence (PASS_MODEL ≠ PASS_ENGINE).
import DATA from "../../scripts/lib/data/heroes.yml";
import { makeHero, fightReady } from "./duel.mjs";
import { readFileSync, writeFileSync } from "fs";
import YAML from "yaml";
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const ECO = YAML.parse(readFileSync("scripts/lib/data/economy.yml", "utf8"));
const CAT = ECO.itemCatalogs[ECO.itemCatalog], ITEMS = CAT.items, N = +arg("--n", 12);
const IDS = DATA.slice;
const BASIC = { fighter: ["nanh_mach"], marksman: ["soi_nhip"], mage: ["kinh_luu"], mage_assassin: ["kinh_luu"], support: ["mach_tinh"] };
const gear = (h, tier) => tier === "none" ? [] : tier === "basic" ? BASIC[DATA.heroes[h].build] ?? ["mach_tinh"] : [CAT.builds[h][0]];
function hero(id, L, items) {
  const k = DATA.heroes[id], h = makeHero(id, L, 0, { dmg: k.tuning?.dmg ?? 1 });
  h.s.hp *= k.tuning?.hp ?? 1;
  let asMul = 1;
  for (const i of items) { const it = ITEMS[i]; h.s.hp += it.hp ?? 0; h.s.ad += it.ad ?? 0; h.s.ap = (h.s.ap ?? 0) + (it.ap ?? 0); h.s.armor += it.armor ?? 0; h.s.mr += it.mr ?? 0; h.s.hpRegen += it.hpRegen ?? 0; asMul *= 1 + (it.attackSpeed ?? 0); }
  h.s.attackSpeed *= asMul; h.bonusAd = h.s.ad - (k.stats.ad + (L - 1) * (k.growth.ad ?? 0)); h.magicPen = 0; h.armorPen = 0; h.hp = h.s.hp;
  return h;
}
const mit = (res) => 100 / (100 + Math.max(0, res));
const rank = (L, slot) => slot === "r" ? (L >= 11 ? 1 : 0) : Math.min(4, Math.floor((L - 1) / 2));
const at = (v, i) => Array.isArray(v) ? v[Math.min(i, v.length - 1)] : (v ?? 0);
function comboDmg(A, D, L) {
  let t = 0;
  for (const slot of ["q", "rmb", "e", "r"]) {
    if (slot === "r" && L < 6) continue;
    const sk = A.k[slot]; const d = sk?.damage; if (!d) continue;
    const i = rank(L, slot);
    let raw = at(d.base, i) + (d.ad ?? 0) * A.s.ad + (d.bonusAd ?? 0) * A.bonusAd + (d.ap ?? 0) * (A.s.ap ?? 0) + (d.maxHp ?? 0) * D.s.hp;
    if (d.hits) raw *= at(d.hits, i);
    raw *= A.dmgM;
    t += d.type === "true" ? raw : raw * mit(d.type === "magic" ? D.s.mr : D.s.armor);
  }
  return t;
}
function aaTtk(A, D) { const type = A.k.lmb?.damageType ?? "physical"; const per = A.s.ad * A.dmgM * mit(type === "magic" ? D.s.mr : D.s.armor); return D.s.hp / (per * A.s.attackSpeed); }
const out = { cat: ECO.itemCatalog, rows: [] };
for (const L of [1, 6, 11]) for (const tier of ["none", "basic", "completed"]) for (const a of IDS) for (const d of IDS) {
  if (a === d) continue;
  const A = () => hero(a, L, gear(a, tier)), D = () => hero(d, L, gear(d, tier));
  const aa = aaTtk(A(), D()), combo = comboDmg(A(), D(), L) / D().s.hp;
  let kit = 0, kn = 0, fight = 0, fw = 0;
  for (let s = 1; s <= N; s++) { const r = fightReady(A(), D(), s * 7919, { bIdle: true }); if (r.w === 1) { kit += r.t; kn++; }
    const f = fightReady(A(), D(), s * 104729); fight += f.t; fw += f.w; }
  out.rows.push({ L, tier, a, d, aa: +aa.toFixed(1), combo: +(combo * 100).toFixed(0), kit: kn ? +(kit / kn).toFixed(1) : null, fight: +(fight / N).toFixed(1), win: +(fw / N).toFixed(2) });
}
if (arg("--json")) writeFileSync(arg("--json"), JSON.stringify(out, null, 1));
const R = out.rows, mean = (xs) => xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : NaN;
console.log("mean over pairs  L  gear       AA-only(s)  combo(%HP)  kit-vs-idle(s)  fight(s)");
for (const L of [1, 6, 11]) for (const tier of ["none", "basic", "completed"]) { const r = R.filter((x) => x.L === L && x.tier === tier);
  console.log(`              ${String(L).padStart(3)}  ${tier.padEnd(10)} ${mean(r.map((x) => x.aa)).toFixed(1).padStart(8)} ${mean(r.map((x) => x.combo)).toFixed(0).padStart(10)} ${mean(r.filter((x) => x.kit != null).map((x) => x.kit)).toFixed(1).padStart(14)} ${mean(r.map((x) => x.fight)).toFixed(1).padStart(9)}`); }
for (const L of [1, 6]) { console.log(`\nL${L} none — attacker → defender: AA s / combo %HP / kit s / fight s (win)`); console.log("".padEnd(9) + IDS.map((d) => d.padStart(22)).join(""));
  for (const a of IDS) console.log(a.padEnd(9) + IDS.map((d) => { const x = R.find((r) => r.L === L && r.tier === "none" && r.a === a && r.d === d); return (x ? `${x.aa}/${x.combo}%/${x.kit ?? "-"}/${x.fight}(${x.win})` : "—").padStart(22); }).join("")); }
