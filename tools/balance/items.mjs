// Cổ Linh item balance bench (2026-10-09, P0 item pass). Run: bun tools/balance/items.mjs [--eco path] [--n 40] [--json out]
// Stats mirror scripts/lib/combat.js heroStats() exactly (base + growth, tuning.hp on base, items summed, AS multiplied),
// damage mirrors combat.js hurt() (100/(100+res-pen), tuning.dmg on hero damage). Fights use duel.mjs (kits, CDs, dodge).
// Outputs: physical/magic EHP before/after each item at L1/6/11, gold efficiency, same-gold TTK (full kit, idle dummy),
// same-gold duels (both fight), and the item-vs-item matchups the brief names.
import DATA from "../../scripts/lib/data/heroes.yml";
import { makeHero, fightReady } from "./duel.mjs";
import { readFileSync, writeFileSync } from "fs";
import YAML from "yaml";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const ECO = YAML.parse(readFileSync(arg("--eco", "scripts/lib/data/economy.yml"), "utf8"));
const N = +arg("--n", 40);
if (!ECO.items) ECO.items = ECO.itemCatalogs[arg("--cat", ECO.itemCatalog)].items;
if (arg("--items")) ECO.items = YAML.parse(readFileSync(arg("--items"), "utf8"));
const IDS = Object.keys(DATA.heroes);
// gold value of one stat point (the bench's yardstick; recorded in economy.yml statValue)
// doc59 candidate basics: 90 HP=250, 12 armour=240, 12 MR=240, 10 AD=300, 18 AP=300, 10% AS=300, 1 HP/s=200, 0.25 m/s=300
export const VAL = { hp: 250 / 90, armor: 20, mr: 20, ad: 30, ap: 300 / 18, attackSpeed: 3000, hpRegen: 200, moveSpeed: 1200, thirdHit: 10 };

export function itemStats(ids) {
  const o = { ad: 0, ap: 0, hp: 0, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0, asMul: 1, thirdHit: 0 };
  for (const id of ids) { const it = ECO.items[id]; if (!it) continue;
    o.ad += it.ad ?? 0; o.ap += it.ap ?? 0; o.hp += it.hp ?? 0; o.armor += it.armor ?? 0; o.mr += it.mr ?? 0; o.hpRegen += it.hpRegen ?? 0; o.moveSpeed += it.moveSpeed ?? 0;
    o.asMul *= 1 + (it.attackSpeed ?? 0); o.thirdHit = Math.max(o.thirdHit, it.thirdHit ?? 0); }
  return o;
}
export function hero(id, L, items = []) {
  const k = DATA.heroes[id], h = makeHero(id, L, 0, { dmg: k.tuning?.dmg ?? 1 });
  h.s.hp *= k.tuning?.hp ?? 1;
  const it = itemStats(items);
  h.s.hp += it.hp; h.s.ad += it.ad; h.s.ap = (h.s.ap ?? 0) + it.ap; h.s.armor += it.armor; h.s.mr += it.mr; h.s.hpRegen += it.hpRegen; h.s.moveSpeed += it.moveSpeed ?? 0;
  h.s.attackSpeed *= it.asMul; h.bonusAd = h.s.ad - (k.stats.ad + (L - 1) * (k.growth.ad ?? 0)); h.thirdHit = it.thirdHit;
  h.magicPen = 0; h.armorPen = 0; h.hp = h.s.hp;
  return h;
}
const ehp = (h, kind) => h.s.hp * (1 + (kind === "phys" ? h.s.armor : h.s.mr) / 100);
export function value(id) { const it = ECO.items[id]; let v = 0;
  for (const [k, g] of Object.entries(VAL)) if (it[k]) v += it[k] * (k === "attackSpeed" ? g / 1 : g) * (k === "attackSpeed" ? 1 : 1);
  if (it.active?.heal) v += it.active.heal * 0.5; if (it.active?.shield) v += it.active.shield * 0.5; return v; }
export function totalCost(id) { return ECO.items[id].cost; }

function ttk(att, aItems, def, dItems, L, seeds = N) { let t = 0, k = 0;
  for (let s = 1; s <= seeds; s++) { const r = fightReady(hero(att, L, aItems), hero(def, L, dItems), s * 7919, { bIdle: true }); if (r.w === 1) { t += r.t; k++; } }
  return k ? t / k : Infinity; }
function duelWin(a, aItems, b, bItems, L, seeds = N) { let w = 0;
  for (let s = 1; s <= seeds; s++) w += fightReady(hero(a, L, aItems), hero(b, L, bItems), s * 104729).w;
  return w / seeds; }

function avg(o, f = () => true) { const v = Object.entries(o).filter(([k]) => f(k)).map(([, x]) => x).filter(Number.isFinite); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : NaN; }
const out = { eco: arg("--eco", "economy.yml"), items: {}, ehp: {}, ttk: {}, duels: {} };
// 1. per item: cost, value, efficiency, and physical/magic EHP gain on every hero at L1/6/11
for (const id of Object.keys(ECO.items)) {
  const c = totalCost(id), v = value(id);
  out.items[id] = { cost: c, value: Math.round(v), eff: +(v / c).toFixed(2), tier: ECO.items[id].tier ?? "?" };
  out.ehp[id] = {};
  for (const h of IDS) for (const L of [1, 6, 11]) {
    const b = hero(h, L), a = hero(h, L, [id]);
    out.ehp[id][`${h}@${L}`] = { phys: +(ehp(a, "phys") / ehp(b, "phys") - 1).toFixed(3), mag: +(ehp(a, "mag") / ehp(b, "mag") - 1).toFixed(3) };
  }
}
// 2. same-gold TTK: every attacker on every defender at the scenario's level and gold, full kit, defender idle
const SC = YAML.parse(readFileSync(arg("--scen", "tools/balance/item-scenarios.yml"), "utf8"));
export function bag(list, gold) { // best total cost ≤ gold, one copy each, keeps list order
  const ids = list.filter((id) => ECO.items[id] && ECO.items[id].slot !== "relic");
  let best = [], bestC = 0;
  for (let m = 0; m < 1 << ids.length; m++) { let c = 0, b = [];
    for (let i = 0; i < ids.length; i++) if (m >> i & 1) { c += ECO.items[ids[i]].cost; b.push(ids[i]); }
    if (c <= gold && b.length <= 6 && (c > bestC || (c === bestC && b.length < best.length))) { best = b; bestC = c; } }
  return best;
}
const listOf = (name, h) => { const l = SC.lists[name]; return l[DATA.heroes[h].build] ?? l.default; };
out.bags = {}; out.ttkByDef = {};
for (const [name, sc] of Object.entries(SC.scen)) {
  out.ttk[name] = {}; out.duels[name] = {}; out.bags[name] = {}; out.ttkByDef[name] = {};
  const B = (side, h) => bag(listOf(sc[side], h), sc.gold);
  for (const h of IDS) out.bags[name][h] = { att: B("att", h), def: B("def", h) };
  for (const a of IDS) for (const d of IDS) if (a !== d) out.ttk[name][`${a}>${d}`] = +ttk(a, B("att", a), d, B("def", d), sc.L).toFixed(2);
  for (const d of IDS) out.ttkByDef[name][d] = +avg(out.ttk[name], (k) => k.endsWith(">" + d)).toFixed(2);
  for (const a of IDS) for (const d of IDS) if (a !== d) out.duels[name][`${a}>${d}`] = +duelWin(a, B("att", a), d, B("def", d), sc.L, 12).toFixed(2);
}
if (arg("--json")) writeFileSync(arg("--json"), JSON.stringify(out, null, 1));
// console summary
console.log("item            cost value eff  physEHP@1 (min..max)   magEHP@1");
for (const [id, r] of Object.entries(out.items)) {
  const e1 = Object.entries(out.ehp[id]).filter(([k]) => k.endsWith("@1")).map(([, x]) => x);
  const p = e1.map((x) => x.phys), m = e1.map((x) => x.mag);
  console.log(`${id.padEnd(16)}${String(r.cost).padStart(5)}${String(r.value).padStart(6)} ${r.eff.toFixed(2)}  +${(Math.min(...p) * 100).toFixed(0)}..${(Math.max(...p) * 100).toFixed(0)}%            +${(Math.min(...m) * 100).toFixed(0)}..${(Math.max(...m) * 100).toFixed(0)}%`);
}
console.log("TTK by defender (s, mean of 5 attackers)   " + IDS.join(" "));
for (const [name, t] of Object.entries(out.ttkByDef)) console.log(name.padEnd(16) + IDS.map((h) => String(t[h]).padStart(8)).join(""));
