// COLINH Balance Lab · CLI (doc 73). bun tools/sim/run.mjs <suite> [--n 200] [--heroes a,b] [--cand] [--minutes 3,6,10] [--seed 1] [--out dir]
// suites: parity progress duel gank team tower wave jungle boss combo all · compare <a.json> <b.json>
// Kết quả là PASS_MODEL / FLAG / NOT_TESTED; bộ giả lập không bao giờ ghi PASS_ENGINE (doc 73 §1).
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { loadStandard, LIVE, GATES, OBJ, loadAllCandidates, revision, inputs, roleGroup, kit, isCandidate, itemDef, CAT } from "./data.mjs";
import { snapshot, shop } from "./progress.mjs";
import { heroUnit } from "./engine.mjs";
import { duelRate, soloVs2, fight, towerSolo, waveClear, campClear, boss, combo } from "./scenarios.mjs";
import { addItemStats } from "../../scripts/lib/items.js";

const argv = process.argv.slice(2), suite = argv[0] ?? "all";
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const flag = (k) => argv.includes(k);
const N = +arg("--n", 200), SEED = +arg("--seed", 1), PROFILE = arg("--profile", "newbie");
const cands = flag("--cand") ? loadAllCandidates() : [];
if (flag("--std")) loadStandard(); // chạy gate trên số đã chuẩn hóa trong Lab
const HEROES = arg("--heroes") ? arg("--heroes").split(",") : [...LIVE, ...cands];
const MINUTES = arg("--minutes") ? arg("--minutes").split(",").map((x) => x === "full" ? "full" : +x) : [...GATES.minutes, "full"];
const G = GATES.gates;
const wilson = (p, n, z = 1.96) => { if (!n) return [0, 1]; const d = 1 + z * z / n, c = (p + z * z / (2 * n)) / d, h = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d; return [Math.max(0, c - h), Math.min(1, c + h)]; };
const pct = (x) => (x * 100).toFixed(1) + "%";
const R = { suite, at: new Date().toISOString(), revision: revision(), inputs: inputs(), n: N, seed: SEED, heroes: HEROES, minutes: MINUTES, verdict: "PASS_MODEL", flags: [], sections: {} };
const flagIt = (gate, sev, msg, data = {}) => R.flags.push({ gate, sev, msg, ...data });
const sec = (name, obj) => { R.sections[name] = obj; };
const want = (s) => suite === "all" || suite === s;
const log = (...a) => console.log(...a);

// ── parity: công thức của bộ giả lập = công thức runtime ────────────────────────────────────────────────
if (want("parity")) {
  const rows = [];
  for (const id of HEROES) for (const m of MINUTES) {
    const sn = snapshot(id, m), k = kit(id), L = sn.level;
    const ref = {}; for (const key of Object.keys(k.stats)) ref[key] = k.stats[key] + (L - 1) * (k.growth[key] ?? 0);
    ref.hp *= k.tuning?.hp ?? 1; ref.ap = ref.ap ?? 0;
    addItemStats(ref, sn.items, CAT.enabled !== false ? undefined : undefined);
    const u = heroUnit(id, { level: L, items: sn.items });
    const bad = ["hp", "ad", "ap", "armor", "mr", "attackSpeed", "moveSpeed", "hpRegen"].filter((x) => Math.abs((u.s[x] ?? 0) - (ref[x] ?? 0)) > 1e-6);
    rows.push({ id, minute: m, level: L, items: sn.items.length, ok: !bad.length, bad });
    if (bad.length) flagIt("parity", "red", `${id} phút ${m}: lệch ${bad.join(",")} so với items.js addItemStats`);
  }
  // deterministic: cùng seed hai lần ra cùng kết quả
  const a = HEROES[0], b = HEROES[1] ?? HEROES[0];
  const x = JSON.stringify(duelRate(a, b, 10, { n: 10, seed: 7 })), y = JSON.stringify(duelRate(a, b, 10, { n: 10, seed: 7 }));
  if (x !== y) flagIt("parity", "red", "không deterministic với cùng seed");
  sec("parity", { rows, deterministic: x === y, note: "so với scripts/lib/items.js addItemStats + base+(L-1)·growth + tuning.hp (combat.js heroStats). Kháng 100/(100+res) chép từ combat.js hurt." });
  log(`parity: ${rows.filter((r) => r.ok).length}/${rows.length} khớp · deterministic ${x === y}`);
}

// ── progress ───────────────────────────────────────────────────────────────────────────────────────────
if (want("progress")) {
  const rows = HEROES.flatMap((id) => MINUTES.map((m) => snapshot(id, m)));
  sec("progress", { rows });
  log("progress: " + HEROES.length + " tướng × " + MINUTES.length + " mốc");
}

// ── 1v1 ────────────────────────────────────────────────────────────────────────────────────────────────
if (want("duel")) {
  const out = {};
  for (const m of MINUTES) {
    const mat = {};
    for (const a of HEROES) mat[a] = {};
    for (let i = 0; i < HEROES.length; i++) for (let j = i + 1; j < HEROES.length; j++) {
      const a = HEROES[i], b = HEROES[j], r = duelRate(a, b, m, { n: N, seed: SEED + i * 1000 + j * 10, profile: PROFILE });
      mat[a][b] = r.win; mat[b][a] = 1 - r.win;
      const ci = wilson(Math.max(r.win, 1 - r.win), N);
      if (ci[0] > G.duel.pairMax) flagIt("duel", "orange", `phút ${m}: ${r.win >= 0.5 ? a : b} thắng ${r.win >= 0.5 ? b : a} ${pct(Math.max(r.win, 1 - r.win))} (CI95 ${pct(ci[0])}–${pct(ci[1])}) > ${pct(G.duel.pairMax)}`, { minute: m, a, b });
    }
    const avg = {};
    for (const a of HEROES) { const o = HEROES.filter((b) => b !== a); avg[a] = o.reduce((s, b) => s + mat[a][b], 0) / o.length; const ci = wilson(avg[a], N * o.length);
      if (ci[1] < G.duel.heroAvg[0] || ci[0] > G.duel.heroAvg[1]) flagIt("duel", "orange", `phút ${m}: ${a} trung bình ${pct(avg[a])} (CI95 ${pct(ci[0])}–${pct(ci[1])}) ngoài ${G.duel.heroAvg.map(pct).join("–")}`, { minute: m, hero: a }); }
    out[m] = { mat, avg };
    log(`duel phút ${m}: ` + HEROES.map((a) => `${a} ${pct(avg[a])}`).join(" · "));
  }
  sec("duel", out);
}

// ── 1v2 ────────────────────────────────────────────────────────────────────────────────────────────────
if (want("gank")) {
  const out = {}, n = Math.max(20, Math.round(N / 4)), mins = MINUTES.filter((m) => m !== "full").slice(1, 4);
  for (const a of HEROES) {
    out[a] = {};
    const others = HEROES.filter((x) => x !== a), pairs = [];
    for (let i = 0; i < others.length; i++) for (let j = i + 1; j < others.length; j++) pairs.push([others[i], others[j]]);
    for (const m of mins) {
      let eq = 0, ah = 0, worst = { w: 0 };
      for (const [b, c] of pairs) { const w = soloVs2(a, b, c, m, { n, seed: SEED, profile: PROFILE }); eq += w; if (w > worst.w) worst = { w, b, c }; ah += soloVs2(a, b, c, m, { n, seed: SEED, ahead: true, profile: PROFILE }); }
      eq /= pairs.length; ah /= pairs.length;
      const ciE = wilson(eq, n * pairs.length), ciA = wilson(ah, n * pairs.length);
      out[a][m] = { equal: eq, ahead: ah, ciEqual: ciE, ciAhead: ciA, worstPair: worst };
      if (ciE[0] > G.solo_vs_2.winMax) flagIt("solo_vs_2", "orange", `${a} phút ${m}: thắng 1v2 ${pct(eq)} (CI95 ${pct(ciE[0])}–${pct(ciE[1])}) > ${pct(G.solo_vs_2.winMax)}; cặp dễ nhất ${worst.b}+${worst.c} ${pct(worst.w)}`, { hero: a, minute: m });
      if (ciA[0] > G.solo_vs_2.aheadWinMax) flagIt("solo_vs_2", "orange", `${a} phút ${m} đi trước +1500 XP/+1500 vàng: thắng 1v2 ${pct(ah)} > ${pct(G.solo_vs_2.aheadWinMax)}`, { hero: a, minute: m });
    }
    log(`gank ${a}: ` + mins.map((m) => `p${m} ${pct(out[a][m].equal)}/${pct(out[a][m].ahead)}`).join(" · "));
  }
  sec("gank", out);
}

// ── đội: 2v2, 3v3, 5v5 ngẫu nhiên (không trùng tướng trong một đội) ─────────────────────────────────────
if (want("team")) {
  const out = {}; let seed = SEED;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const pickTeam = (k) => { const a = [...HEROES]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, k); };
  for (const size of [2, 3, 5].filter((s) => s <= HEROES.length)) {
    const pres = Object.fromEntries(HEROES.map((h) => [h, { w: 0, n: 0 }])), times = [];
    for (let i = 0; i < N; i++) {
      const m = MINUTES.filter((x) => x !== "full")[i % (MINUTES.length - 1)];
      const A = pickTeam(size), B = pickTeam(size);
      const r = fight(A.map((id) => ({ id, snap: snapshot(id, m) })), B.map((id) => ({ id, snap: snapshot(id, m) })), { seed: SEED + i, maxT: 60 });
      times.push(r.t);
      for (const id of A) { pres[id].w += r.w; pres[id].n++; } for (const id of B) { pres[id].w += 1 - r.w; pres[id].n++; }
    }
    const rates = Object.fromEntries(Object.entries(pres).map(([k, v]) => [k, { rate: v.w / Math.max(1, v.n), n: v.n, ci: wilson(v.w / Math.max(1, v.n), v.n) }]));
    const tAvg = times.reduce((a, b) => a + b, 0) / times.length;
    for (const [k, v] of Object.entries(rates)) if (v.ci[1] < G.team.heroPresence[0] || v.ci[0] > G.team.heroPresence[1]) flagIt("team", "orange", `${size}v${size}: đội có ${k} thắng ${pct(v.rate)} (CI95 ${pct(v.ci[0])}–${pct(v.ci[1])})`, { hero: k, size });
    if (tAvg < G.team.fightSeconds[0] || tAvg > G.team.fightSeconds[1]) flagIt("team", "yellow", `${size}v${size}: giao tranh trung bình ${tAvg.toFixed(1)} s ngoài ${G.team.fightSeconds.join("–")} s`);
    out[`${size}v${size}`] = { rates, avgSeconds: tAvg };
    log(`team ${size}v${size}: ${tAvg.toFixed(1)} s · ` + Object.entries(rates).map(([k, v]) => `${k} ${pct(v.rate)}`).join(" · "));
  }
  sec("team", out);
}

// ── trụ, lính, rừng, boss ──────────────────────────────────────────────────────────────────────────────
const nObj = Math.max(5, Math.round(N / 20));
const avgRuns = (f) => { const rs = Array.from({ length: nObj }, (_, i) => f(SEED + i)); const o = {}; for (const k of Object.keys(rs[0])) o[k] = typeof rs[0][k] === "boolean" ? rs.filter((r) => r[k]).length / rs.length : rs.reduce((a, r) => a + (r[k] ?? 0), 0) / rs.length; return o; };
if (want("tower")) {
  const out = {};
  for (const id of HEROES) {
    out[id] = {};
    for (const m of MINUTES.filter((x) => x !== "full")) {
      const solo = avgRuns((seed) => towerSolo(id, m, { seed })), wave = avgRuns((seed) => towerSolo(id, m, { seed, withWave: true }));
      out[id][m] = { solo, wave };
      if (G.tower.noWaveMustLose && m <= 15 && solo.razed > 0 && solo.died < 1) flagIt("tower", "red", `${id} phút ${m}: phá trụ cấp 1 KHÔNG cần lính ${pct(solo.razed)} lượt, sống ${pct(1 - solo.died)}`, { hero: id, minute: m });
      if (m === 10 && (wave.t < G.tower.withWaveSeconds[0] || wave.t > G.tower.withWaveSeconds[1])) flagIt("tower", "yellow", `${id} phút 10 + 1 đợt lính: phá trụ ${wave.t.toFixed(1)} s ngoài ${G.tower.withWaveSeconds.join("–")} s`, { hero: id });
    }
    log(`tower ${id}: ` + Object.entries(out[id]).map(([m, r]) => `p${m} solo ${pct(r.solo.razed)} phá/${pct(r.solo.died)} chết, có lính ${r.wave.t.toFixed(0)}s`).join(" · "));
  }
  sec("tower", out);
}
if (want("wave")) {
  const out = {};
  for (const id of HEROES) {
    out[id] = Object.fromEntries(MINUTES.filter((x) => x !== "full").map((m) => [m, avgRuns((seed) => waveClear(id, m, { seed }))]));
    const r = out[id][6];
    if (r && (r.cleared < 1 || r.t > G.wave.clearSeconds[1] || r.hpLost > G.wave.hpLostMax)) flagIt("wave", "yellow", `${id} phút 6: dọn 1 đợt lính ${pct(r.cleared)} lượt, ${r.t.toFixed(1)} s, mất ${pct(r.hpLost)} máu, chết ${pct(r.died)}`, { hero: id });
    log(`wave ${id}: ` + Object.entries(out[id]).map(([m, r]) => `p${m} ${pct(r.cleared)} dọn ${r.t.toFixed(0)}s -${pct(r.hpLost)}`).join(" · "));
  }
  sec("wave", out);
}
if (want("jungle")) {
  const out = {}, U = OBJ.neutral_v01.units;
  const minuteFor = (id, L) => { for (let m = 1; m <= 30; m++) if (snapshot(id, m).level >= L) return m; return 30; };
  for (const id of HEROES) {
    out[id] = {};
    for (const [uid, u] of Object.entries(U)) {
      if (u.notTitan) continue;
      const m = minuteFor(id, u.anchor), r = avgRuns((seed) => campClear(id, uid, m, { seed, level: u.anchor }));
      out[id][uid] = { minute: m, ...r };
      if (!u.miniboss && (r.killed < 1 || r.t > G.jungle.campSeconds[1] || r.hpLeft < G.jungle.campHpLeftMin)) flagIt("jungle", "yellow", `${id} p${m} vs ${uid}: hạ ${pct(r.killed)}, ${r.t.toFixed(0)} s, còn ${pct(r.hpLeft)} máu`, { hero: id, camp: uid });
      if (u.miniboss && r.killed >= 1 && r.hpLeft > 1 - G.jungle.minibossSoloMin) flagIt("jungle", "yellow", `${id} p${m} solo quái lớn ${uid} chỉ mất ${pct(1 - r.hpLeft)} máu`, { hero: id, camp: uid });
    }
    log(`jungle ${id}: ` + Object.entries(out[id]).map(([k, r]) => `${k} ${r.t.toFixed(0)}s ${pct(r.hpLeft)}`).join(" · "));
  }
  sec("jungle", out);
}
if (want("boss")) {
  const out = { solo: {}, team: {} };
  for (const id of HEROES) { const r = avgRuns((seed) => boss([id], 10, { seed, maxT: 120 })); out.solo[id] = r; if (G.boss.soloMustFail && r.killed > 0 && r.deaths < 1) flagIt("boss", "red", `${id} phút 10 solo Titan rank 1: hạ ${pct(r.killed)} lượt, ${r.t.toFixed(0)} s`, { hero: id }); }
  for (const k of [2, 3, 5].filter((x) => x <= HEROES.length)) {
    const rows = [];
    for (let i = 0; i < nObj; i++) { const team = HEROES.slice(i % HEROES.length).concat(HEROES).slice(0, k); rows.push({ team, ...boss(team, 10, { seed: SEED + i }) }); }
    const kill = rows.filter((r) => r.killed).length / rows.length, t = rows.reduce((a, r) => a + r.t, 0) / rows.length, deaths = rows.reduce((a, r) => a + r.deaths, 0) / rows.length;
    out.team[k] = { kill, t, deaths, rows };
    if (k === 3 && (t < G.boss.teamSeconds[0] || t > G.boss.teamSeconds[1] || deaths > G.boss.teamDeathsMax)) flagIt("boss", "yellow", `3 tướng phút 10 vs Titan rank 1: hạ ${pct(kill)}, ${t.toFixed(0)} s, chết ${deaths.toFixed(1)}`);
  }
  log("boss solo: " + Object.entries(out.solo).map(([k, r]) => `${k} ${pct(r.killed)}`).join(" · ") + " | đội: " + Object.entries(out.team).map(([k, r]) => `${k} người ${pct(r.kill)} ${r.t.toFixed(0)}s chết ${r.deaths.toFixed(1)}`).join(" · "));
  sec("boss", out);
}

// ── One-Combo Kill Test ────────────────────────────────────────────────────────────────────────────────
if (want("combo")) {
  const C = G.combo, rows = [], band = (p) => p >= C.bands[2] ? "review" : p >= C.bands[1] ? "warn" : p >= C.bands[0] ? "high" : "ok";
  const group = (id) => (kit(id).role ?? "").includes("tank") ? "tank" : roleGroup(id);
  const nNew = Math.max(10, Math.round(N / 10));
  const run1 = (a, sa, t, st, label) => {
    const th = combo(a, sa, t, st, { mode: "theory", seed: SEED, replay: true });
    let nw = { pct: 0, killed: 0 }, kills = 0, ps = [];
    for (let i = 0; i < nNew; i++) { const r = combo(a, sa, t, st, { mode: "newbie", seed: SEED + i }); ps.push(r.pct); kills += r.killed ? 1 : 0; }
    const row = { attacker: a, target: t, label, minute: sa.minute, aLevel: sa.level, tLevel: st.level, aGold: sa.gold, tGold: st.gold, aItems: sa.items, tItems: st.items,
      theory: { ...th, replay: undefined }, newbie: { pct: ps.reduce((x, y) => x + y, 0) / ps.length, killRate: kills / nNew }, band: band(th.pct), replay: th.replay };
    rows.push(row);
    const same = label === "same";
    if (th.resets.length) flagIt("combo", "red", `${a} tung lại ${th.resets.join(",")} trong một combo (reset hồi chiêu)`, { attacker: a });
    for (const [k, v] of Object.entries(th.procs)) if (v > 4) flagIt("combo", "red", `${a}: ${k} kích ${v} lần trong một combo (proc bất thường)`, { attacker: a });
    if (th.pct >= C.bands[2]) {
      const fast = th.killAt != null && th.killAt < C.reactMin;
      const sus = same && C.suspicious.find((s) => s.from.includes(group(a)) && s.to.includes(group(t)));
      const sev = same && (fast || sus || group(t) === "tank") ? "red" : "orange";
      flagIt("combo", sev, `${a} → ${t} (${label}, p${sa.minute}, L${sa.level} vs L${st.level}): combo hoàn hảo ${pct(th.pct)} máu${th.killAt != null ? `, hạ trong ${th.killAt.toFixed(2)} s` : ""}; newbie ${pct(row.newbie.pct)}, hạ ${pct(row.newbie.killRate)} lượt${sus ? " · " + sus.note : ""}${fast ? " · gần như không có cửa phản ứng" : ""}`, { attacker: a, target: t, minute: sa.minute, label });
    } else if (th.pct >= C.bands[1] && same) flagIt("combo", "yellow", `${a} → ${t} p${sa.minute}: ${pct(th.pct)} (cảnh báo 90–99%)`, { attacker: a, target: t, minute: sa.minute });
    return row;
  };
  for (const m of MINUTES) {
    for (const a of HEROES) {
      const sa = snapshot(a, m);
      for (const t of HEROES) if (t !== a) run1(a, sa, t, snapshot(t, m), "same");
      // tank full phòng thủ cùng vàng
      const tank = HEROES.find((h) => (kit(h).role ?? "").includes("tank"));
      if (tank) { const st = snapshot(tank, m, { build: C.tankBuild }); if (tank !== a) run1(a, sa, tank, st, "tank-def"); }
      // lệch cấp/vàng: mục tiêu chậm 3 phút / nhanh 3 phút
      if (m !== "full") for (const [lab, dm] of [["target-behind", -3], ["target-ahead", 3]]) { const mm = m + dm; if (mm < 1) continue; const t = HEROES.find((h) => h !== a && (kit(h).role ?? "").startsWith("marksman")) ?? HEROES.find((h) => h !== a); run1(a, sa, t, snapshot(t, mm), lab); }
    }
    log(`combo phút ${m}: xong`);
  }
  // món nghi OP: thêm từng món hoàn chỉnh vào túi mọi tướng ở phút 15, so % combo lên mục tiêu cùng phút
  const spikes = {};
  for (const [iid, it] of Object.entries(CAT.items)) {
    if (it.tier !== "completed") continue;
    let heroes = [];
    for (const a of HEROES) {
      const sa = snapshot(a, 15); if (sa.items.includes(iid)) continue;
      const withIt = { ...sa, items: [...sa.items.slice(0, 5), iid] };
      let d = 0, k = 0;
      for (const t of HEROES) if (t !== a) { const st = snapshot(t, 15); d += combo(a, withIt, t, st, { seed: SEED }).pct - combo(a, sa, t, st, { seed: SEED }).pct; k++; }
      d /= k; if (d >= C.itemSpike) heroes.push({ hero: a, delta: d });
    }
    spikes[iid] = heroes;
    if (heroes.length >= C.itemSpikeHeroes) flagIt("combo", "orange", `món ${iid}: ${heroes.length} tướng tăng ≥ ${pct(C.itemSpike)} burst (${heroes.map((h) => h.hero + " +" + pct(h.delta)).join(", ")})`, { item: iid });
  }
  sec("combo", { rows: rows.map((r) => ({ ...r, replay: r.band === "review" || r.band === "warn" ? r.replay : undefined })), itemSpikes: spikes });
  const top = [...rows].sort((a, b) => b.theory.pct - a.theory.pct).slice(0, 8);
  log("combo cao nhất: " + top.map((r) => `${r.attacker}→${r.target} p${r.minute} ${pct(r.theory.pct)}`).join(" · "));
}

// ── compare ────────────────────────────────────────────────────────────────────────────────────────────
if (suite === "compare") {
  const [A, B] = [argv[1], argv[2]].map((p) => JSON.parse(readFileSync(p, "utf8")));
  const diff = [];
  for (const m of Object.keys(B.sections.duel ?? {})) for (const h of Object.keys(B.sections.duel[m].avg)) { const a = A.sections.duel?.[m]?.avg?.[h]; if (a != null) diff.push({ test: "duel", minute: m, hero: h, before: a, after: B.sections.duel[m].avg[h], delta: B.sections.duel[m].avg[h] - a }); }
  const key = (r) => `${r.attacker}>${r.target}>${r.label}>${r.minute}`, prev = new Map((A.sections.combo?.rows ?? []).map((r) => [key(r), r]));
  for (const r of B.sections.combo?.rows ?? []) { const p = prev.get(key(r)); if (p) diff.push({ test: "combo", attacker: r.attacker, target: r.target, minute: r.minute, before: p.theory.pct, after: r.theory.pct, delta: r.theory.pct - p.theory.pct }); }
  diff.sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta));
  console.log(`BEFORE ${A.revision} → AFTER ${B.revision}`);
  for (const d of diff.slice(0, 30)) console.log(`${d.test} ${d.hero ?? d.attacker + "→" + d.target} p${d.minute}: ${pct(d.before)} → ${pct(d.after)} (${d.delta >= 0 ? "+" : ""}${(d.delta * 100).toFixed(1)})`);
  process.exit(0);
}

// ── báo cáo ────────────────────────────────────────────────────────────────────────────────────────────
R.verdict = R.flags.some((f) => f.sev === "red") ? "FLAG_RED" : R.flags.some((f) => f.sev === "orange") ? "FLAG" : "PASS_MODEL";
R.notTested = ["PASS_ENGINE: chưa chạy trong engine", "crit/hút máu/sát thương chuẩn/phản sát thương/silence: data hiện hành chưa có field nào dùng — bộ giả lập sẽ đọc khi có", "địa hình, tầm nhìn, bụi cỏ, đường đạn bị thân chặn (trừ passMinions)"];
const dir = arg("--out", `reports/sim/${R.at.slice(0, 10)}-${suite}-${R.revision}`);
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/report.json`, JSON.stringify(R, null, 1));
writeFileSync(`${dir}/report.html`, (await import("./html.mjs")).html(R));
const counts = ["red", "orange", "yellow"].map((s) => `${s} ${R.flags.filter((f) => f.sev === s).length}`).join(" · ");
console.log(`\n${R.verdict} · rev ${R.revision} · ${counts}\n→ ${dir}/report.html`);
for (const f of R.flags.filter((f) => f.sev === "red").slice(0, 20)) console.log("  RED  " + f.msg);
