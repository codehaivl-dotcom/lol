// Docs audit checks for Cổ Linh: bun tools/audit/docs-check.mjs. Exit 1 on any FAIL.
// Checks: 07 point symmetry (bases, gates, towers, camps, pits, brushes, lanes), 07 counts,
// roster ids across CSV / 03 / 09, slice heroes in heroes.yml with CSV names, rank rule agreement,
// dead relative links in docs, legacy-only words outside reference rows.
import DATA from "../../scripts/lib/data/heroes.yml";
import { readdirSync, readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
const D = "docs/co-linh-than-chien/";
const rd = (f) => readFileSync(f, "utf8");
let fails = 0; const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fails++; };
const num = (s) => +s.replace("−", "-").replace("+", "");
const doc7 = rd(D + "07-layout-ban-do-v1.md");
const sec = (n) => doc7.split(/\n## /).find((s) => s.startsWith(n + "."));
const rows = (s) => s.split("\n").filter((l) => /^\| [^-|]/.test(l) && !/^\| (ID|Phe|Camp ID|Layer)\b/.test(l)).map((l) => l.split("|").slice(1, -1).map((c) => c.trim()));
const pt = (s) => { const m = s.match(/\(([−+\-\d.]+),\s*([−+\-\d.]+)\)/); return m && [num(m[1]), num(m[2])]; };
const mirror = (p) => [-p[0], -p[1]], same = (a, b) => Math.abs(a[0] - b[0]) < 0.05 && Math.abs(a[1] - b[1]) < 0.05;
const has = (list, p) => list.some((q) => same(q, p));
// towers
const tw = rows(sec("3")).map((r) => ({ side: r[0], lane: r[1], tier: r[2], p: [num(r[3]), num(r[4])] }));
ok(tw.length === 12, `07 §3: 12 towers (${tw.length})`);
const flip = { "Thượng": "Hạ", "Hạ": "Thượng", "Giữa": "Giữa" };
ok(tw.filter((t) => t.side === "Blue").every((t) => tw.some((u) => u.side === "Red" && u.lane === flip[t.lane] && u.tier === t.tier && same(u.p, mirror(t.p)))), "07 §3: towers point-symmetric (top Blue ↔ bot Red)");
// camps
const camps = rows(sec("5")).map((r) => ({ id: r[0], side: r[1], p: pt(r[3]) }));
ok(camps.length === 12 && camps.filter((c) => c.side === "Blue").length === 6, `07 §5: 12 camps, 6 per side (${camps.length})`);
ok(camps.filter((c) => c.side === "Blue").every((c) => camps.some((d) => d.side === "Red" && d.id.replace("-red", "") === c.id.replace("-blue", "") && same(d.p, mirror(c.p)))), "07 §5: camps point-symmetric");
// pits
const pits = rows(sec("4")).map((r) => pt(r[3]));
ok(pits.length === 2 && same(pits[0], mirror(pits[1])), "07 §4: pits point-symmetric");
// brushes
const br = rows(sec("6")).map((r) => ({ id: r[0], p: [num(r[1]), num(r[2])], rx: +r[3], rz: +r[4], rot: r[5] }));
const blue = br.filter((b) => b.id.endsWith("-blue")), red = br.filter((b) => b.id.endsWith("-red"));
ok(blue.length === 12 && red.length === 12, `07 §6: 12 brushes per side (${blue.length}/${red.length})`);
ok(blue.every((b) => red.some((r) => r.id === b.id.replace("-blue", "-red") && same(r.p, mirror(b.p)) && r.rx === b.rx && r.rz === b.rz && r.rot === b.rot)), "07 §6: brushes point-symmetric, same radii and rotation");
ok(blue.every((b) => b.p[1] - b.p[0] > 0) && red.every((b) => b.p[1] - b.p[0] < 0), "07 §6: each side's brushes on its own half");
// lanes
const lanes = Object.fromEntries([...sec("7").matchAll(/\*\*(\S+) \/ (\w+):\*\* (.+)/g)].map((m) => [m[2], [...m[3].matchAll(/\(([−\-\d.]+),\s*([−\-\d.]+)\)/g)].map((x) => [num(x[1]), num(x[2])])]));
const rev = (a) => [...a].reverse().map(mirror);
ok(lanes.top.length && lanes.top.every((p, i) => same(p, rev(lanes.bot)[i])), "07 §7: top lane = point image of bot lane");
ok(lanes.mid.every((p, i) => same(p, rev(lanes.mid)[i])), "07 §7: mid lane point-symmetric");
// base table + gates
const base = rows(sec("2"));
ok(base.length === 2 && same(pt(base[0][1]), mirror(pt(base[1][1]))) && same(pt(base[0][3]), mirror(pt(base[1][3]))), "07 §2: fountains and Tâm Mạch point-symmetric");
ok(same(pt(base[0][7]), mirror(pt(base[1][9]))) && same(pt(base[0][8]), mirror(pt(base[1][8]))), "07 §2: gates point-symmetric (top ↔ bot)");
ok(/24 vùng bụi \(12\/phe\)/.test(doc7), "07 §9: count line says 24 brushes (12/side)");
// roster
const csv = rd(D + "data/roster-display-map.csv").trim().split("\n").map((l) => l.match(/"([^"]*)"/g).map((c) => c.slice(1, -1)));
const H = csv[0], R = csv.slice(1).map((r) => Object.fromEntries(H.map((h, i) => [h, r[i]])));
ok(R.length === 27 && new Set(R.map((r) => r.hero_id)).size === 27, "CSV: 27 unique hero ids");
const d03 = rd(D + "03-danh-sach-tuong.md"), d09 = rd(D + "09-data-contract-va-roster.md");
ok(R.every((r) => d03.includes("`" + r.hero_id + "`") && d09.includes("`" + r.hero_id + "`")), "CSV ids all present in 03 and 09");
for (const id of DATA.slice) {
  const r = R.find((x) => x.hero_id === id), k = DATA.heroes[id];
  ok(!!r && !!k, `slice ${id}: in CSV and heroes.yml`);
  if (r && k) ok(["passive", "lmb", "q", "rmb", "e", "r"].every((s) => !k[s] || (r[s + "_vi"] && r[s + "_en"])), `slice ${id}: every kit slot has VI/EN names in CSV`);
}
// rank rule
const d08 = rd(D + "08-combat-kinh-te-v1.md"), d10 = rd(D + "10-doi-soat-runtime.md");
ok(/R mở ở cấp 6, lên rank ở 11 và 15/.test(d08) && /11\/15/.test(d10) && !/6\/11\/16/.test(d09) && /6\/11\/15/.test(rd("scripts/lib/data/heroes.yml")), "rank rule 1/3/5/7/9 + R 6/11/15 agrees in 08, 09, 10, heroes.yml");
// links
const mdFiles = [...readdirSync(D).filter((f) => f.endsWith(".md")).map((f) => D + f), "design.md"];
const dead = [];
for (const f of mdFiles) for (const m of rd(f).matchAll(/\]\(([^)#]+)(#[^)]*)?\)/g)) if (!/^https?:/.test(m[1]) && !existsSync(join(dirname(f), m[1]))) dead.push(`${f} → ${m[1]}`);
ok(dead.length === 0, "relative links resolve" + (dead.length ? ": " + dead.join(", ") : ""));
// legacy words in live docs (reference rows in 09 §7 / 10 §1 / 12 allowed)
const banned = /\b(aldric|thrall|kaelthas|jaina|invoker|rubick|axe|sniper|stitches|League of Spawn|Highrift|spawn_extracted|adapter|parity)\b|\[RUNTIME\]|\[GAP\]|legacy rule|rule cũ|game nguồn/i;
const live = mdFiles.filter((f) => !/AUDIT|12-bang|10-doi|balance-log|balance-sim/.test(f));
const hits = [];
for (const f of live) rd(f).split("\n").forEach((l, i) => { if (banned.test(l) && !/reference_id|chỉ tham khảo|không phải đích parity|không dùng làm đích parity|không còn đối soát|ID cũ|^\| `\w+` \| [^|]+ \| \w+ \|$/.test(l)) hits.push(`${f}:${i + 1}`); });
ok(hits.length === 0, "no legacy/parity wording in live docs" + (hits.length ? ": " + hits.join(", ") : ""));
ok(existsSync(D + "balance-log.md"), "balance-log.md exists (heroes.yml header points at it)");
console.log(fails ? `\n${fails} FAIL` : "\nALL PASS");
process.exit(fails ? 1 : 0);
