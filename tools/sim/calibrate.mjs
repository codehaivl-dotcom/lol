// COLINH Balance Lab · hiệu chỉnh theo CHUẨN VAI (tools/sim/standard/roles.yml). Chỉ ghi tools/sim/standard/tuning.yml (Lab), không đụng runtime.
//   bun tools/sim/calibrate.mjs panel                    → nhóm mốc (6 tướng cũ) đánh vòng tròn, chỉnh tới khi mỗi tướng ≈ 50%
//   bun tools/sim/calibrate.mjs fit --heroes a,b,c       → tướng ứng viên dò P so với nhóm mốc đã chuẩn (đợt 3–5 tướng)
//   [--n 100] [--seed 1] [--write]  (--write: ghi kết quả vào standard/tuning.yml; không có thì chỉ in)
import YAML from "yaml";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { LIVE, ROOT, ROLES, kit, loadAllCandidates, loadStandard, setPower, hpShare } from "./data.mjs";
import { duelRate } from "./scenarios.mjs";
const argv = process.argv.slice(2), arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const mode = argv[0], N = +arg("--n", 100), SEED = +arg("--seed", 1), MIN = ROLES.minutes, PANEL = LIVE;
loadAllCandidates(); const std = loadStandard();
const P = {}; for (const id of Object.keys(std)) P[id] = std[id].P ?? 1;
const avg = (id, opp) => { let s = 0, c = 0; for (const m of MIN) for (const b of opp) if (b !== id) { s += duelRate(id, b, m, { n: N, seed: SEED }).win; c++; } return s / c; };
const rows = {};
if (mode === "panel") {
  for (const id of PANEL) { P[id] = 1; setPower(id, 1); }
  for (let r = 0; r < 14; r++) {
    const w = Object.fromEntries(PANEL.map((id) => [id, avg(id, PANEL)]));
    console.log(`vòng ${r}: ` + PANEL.map((id) => `${id} ${(w[id] * 100).toFixed(0)}% ×${P[id].toFixed(2)}`).join(" · "));
    if (PANEL.every((id) => Math.abs(w[id] - ROLES.target) <= 0.03)) break;
    for (const id of PANEL) { const x = Math.min(0.97, Math.max(0.03, w[id])); P[id] *= Math.min(1.12, Math.max(0.89, Math.pow((1 - x) / x, 0.12 / (1 + r * 0.15)))); setPower(id, P[id]); }
  }
  for (const id of PANEL) rows[id] = { P: +P[id].toFixed(3), ...kit(id).tuning, win: +avg(id, PANEL).toFixed(3) };
} else if (mode === "fit") {
  for (const id of PANEL) setPower(id, P[id] ?? 1);
  for (const id of arg("--heroes", "").split(",").filter(Boolean)) {
    let lo = Math.log(0.4), hi = Math.log(3), w = 0;
    for (let i = 0; i < 8; i++) { const m = (lo + hi) / 2; setPower(id, Math.exp(m)); w = avg(id, PANEL); if (w < ROLES.target) lo = m; else hi = m; }
    const p = Math.exp((lo + hi) / 2); setPower(id, p); w = avg(id, PANEL);
    rows[id] = { P: +p.toFixed(3), ...kit(id).tuning, win: +w.toFixed(3) };
    console.log(`${id} (${kit(id).role}): P ×${p.toFixed(2)} → hp ×${kit(id).tuning.hp.toFixed(2)} dmg ×${kit(id).tuning.dmg.toFixed(2)} · ${(w * 100).toFixed(1)}% vs nhóm mốc${p > ROLES.bakeLimit || p < 1 / ROLES.bakeLimit ? " · VƯỢT bakeLimit: kit cần sửa thiết kế" : ""}`);
  }
} else { console.log("mode: panel | fit"); process.exit(1); }
for (const [id, r] of Object.entries(rows)) for (const k of ["hp", "dmg"]) r[k] = +r[k].toFixed(3);
if (argv.includes("--write")) {
  const f = ROOT + "tools/sim/standard/tuning.yml", cur = existsSync(f) ? YAML.parse(readFileSync(f, "utf8")) ?? {} : {};
  cur.note = "Lab-only tuning theo chuẩn vai (roles.yml). Chưa vào runtime; PASS_MODEL only."; cur.heroes = { ...(cur.heroes ?? {}), ...rows };
  writeFileSync(f, YAML.stringify(cur)); console.log("→ tools/sim/standard/tuning.yml");
}
