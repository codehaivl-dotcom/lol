// COLINH Balance Lab · báo cáo HTML một file (mở trực tiếp trong trình duyệt)
const pct = (x) => x == null ? "–" : (x * 100).toFixed(1) + "%";
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
const heat = (p) => `background:hsl(${Math.round(120 - Math.min(1, Math.max(0, p)) * 120)} 60% 30%)`;
export function html(R) {
  const S = R.sections, parts = [];
  parts.push(`<h1>COLINH Balance Lab · ${esc(R.suite)}</h1><p>${esc(R.at)} · rev <b>${R.revision}</b> · n=${R.n} · seed ${R.seed} · catalog ${esc(R.inputs.catalog)} · <b class="v">${R.verdict}</b> (mô hình, không phải PASS_ENGINE)</p>`);
  parts.push(`<p>Tướng: ${R.heroes.map(esc).join(", ")}${R.inputs.candidates.length ? ` · ứng viên: ${R.inputs.candidates.map(esc).join(", ")}` : ""}</p>`);
  parts.push(`<h2>Cờ (${R.flags.length})</h2><table><tr><th>mức</th><th>gate</th><th>nội dung</th></tr>${R.flags.map((f) => `<tr class="${f.sev}"><td>${f.sev}</td><td>${f.gate}</td><td>${esc(f.msg)}</td></tr>`).join("")}</table>`);
  if (S.duel) for (const [m, d] of Object.entries(S.duel)) { const ids = Object.keys(d.mat);
    parts.push(`<h2>1v1 phút ${m}</h2><table><tr><th></th>${ids.map((i) => `<th>${i}</th>`).join("")}<th>TB</th></tr>${ids.map((a) => `<tr><th>${a}</th>${ids.map((b) => a === b ? "<td>–</td>" : `<td style="${heat(d.mat[a][b])}">${pct(d.mat[a][b])}</td>`).join("")}<td><b>${pct(d.avg[a])}</b></td></tr>`).join("")}</table>`); }
  if (S.gank) parts.push(`<h2>1v2</h2><table><tr><th>tướng</th>${Object.keys(Object.values(S.gank)[0]).map((m) => `<th>p${m} ngang</th><th>p${m} đi trước</th>`).join("")}</tr>${Object.entries(S.gank).map(([h, r]) => `<tr><th>${h}</th>${Object.values(r).map((x) => `<td style="${heat(x.equal * 3)}">${pct(x.equal)}</td><td>${pct(x.ahead)}</td>`).join("")}</tr>`).join("")}</table>`);
  if (S.team) for (const [k, v] of Object.entries(S.team)) parts.push(`<h2>Đội ${k} · ${v.avgSeconds.toFixed(1)} s</h2><table>${Object.entries(v.rates).map(([h, r]) => `<tr><th>${h}</th><td>${pct(r.rate)}</td><td>CI ${pct(r.ci[0])}–${pct(r.ci[1])}</td><td>n ${r.n}</td></tr>`).join("")}</table>`);
  if (S.combo) {
    const rows = [...S.combo.rows].sort((a, b) => b.theory.pct - a.theory.pct);
    parts.push(`<h2>One-Combo Kill Test (${rows.length})</h2><table><tr><th>kẻ tung</th><th>mục tiêu</th><th>loại</th><th>phút</th><th>cấp</th><th>hoàn hảo</th><th>newbie</th><th>hạ (newbie)</th><th>giây</th><th>skill</th><th>item</th><th>nội tại</th><th>đánh thường</th><th>hồi combo</th><th>máu kẻ tung</th></tr>${rows.map((r) => { const t = r.theory, sum = t.dealt || 1;
      return `<tr class="${r.band}"><td>${r.attacker}</td><td>${r.target}</td><td>${r.label}</td><td>${r.minute}</td><td>${r.aLevel}/${r.tLevel}</td><td style="${heat(t.pct)}">${pct(t.pct)}${t.killed ? " ☠" : ""}</td><td>${pct(r.newbie.pct)}</td><td>${pct(r.newbie.killRate)}</td><td>${t.killAt != null ? t.killAt.toFixed(2) : t.comboSeconds}</td><td>${pct(t.by.skill / sum)}</td><td>${pct(t.by.item / sum)}</td><td>${pct(t.by.passive / sum)}</td><td>${pct(t.by.aa / sum)}</td><td>${t.comboCooldown}s</td><td>${pct(t.attackerHpLeft)}</td></tr>`; }).join("")}</table>`);
    const rep = rows.filter((r) => r.replay).slice(0, 12);
    for (const r of rep) parts.push(`<details><summary>replay ${r.attacker} → ${r.target} p${r.minute} (${pct(r.theory.pct)})</summary><pre>${r.replay.map((x) => x.join("  ")).map(esc).join("\n")}</pre></details>`);
  }
  for (const k of ["tower", "wave", "jungle", "boss", "progress", "parity"]) if (S[k]) parts.push(`<details><summary><h2 style="display:inline">${k}</h2></summary><pre>${esc(JSON.stringify(S[k], null, 1).slice(0, 60000))}</pre></details>`);
  parts.push(`<h2>Chưa kiểm</h2><ul>${R.notTested.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`);
  return `<!doctype html><meta charset="utf-8"><title>COLINH Balance Lab</title><style>body{font:13px system-ui;background:#11141a;color:#dde;margin:24px}table{border-collapse:collapse;margin:8px 0 20px}td,th{border:1px solid #333a46;padding:3px 7px;text-align:right}th{background:#1c2230}tr.red td{background:#4a1418}tr.orange td{background:#4a3010}tr.yellow td{background:#3c3a12}tr.review{outline:1px solid #f44}.v{color:#ffcf5a}pre{background:#0b0d12;padding:8px;overflow:auto;max-height:420px}</style>${parts.join("\n")}`;
}
