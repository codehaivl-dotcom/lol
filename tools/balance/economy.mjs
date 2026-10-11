// Mô hình kinh tế Mạch Giữa 1v1 (PASS_MODEL, không phải PASS_ENGINE). Đọc số thật từ economy.yml + structures.yml.
// bun tools/balance/economy.mjs [--json]
import YAML from "yaml"; import { readFileSync } from "fs";
const R = (p) => YAML.parse(readFileSync(new URL("../../" + p, import.meta.url).pathname, "utf8"));
const ECO = R("scripts/lib/data/economy.yml"), ST = R("scripts/lib/data/structures.yml");
const M = ST.minions, waveGold = M.composition.reduce((a, k) => a + M.kinds[k].gold, 0);
const CAT = ECO.itemCatalogs[ECO.itemCatalog].items;
// phương án thử (passive g/s, hệ số vàng lính, thưởng hạ tướng)
export const PLANS = {
  A_now:  { passive: 3,   minionMult: 1,   kill: 300 },
  B_1_5:  { passive: 1.5, minionMult: 1,   kill: 300 },
  C_1_0:  { passive: 1,   minionMult: 1,   kill: 300 },
  D_1_0k: { passive: 1,   minionMult: 1.2, kill: 250 },
  E_lean:  { passive: 1,   minionMult: 0.7, kill: 200 },
  F_lean2: { passive: 1.2, minionMult: 0.6, kill: 200 },
  G_start: { passive: 1,   minionMult: 0.7, kill: 200, start: 350 },
};
// cửa sổ mục tiêu (giả thuyết, trận 12–20 phút): món hoàn chỉnh đầu tiên good 5:30–7:00, avg 6:30–8:30, poor ≤ 11:00, afk ≥ 14:00;
// AFK ≤ 40% vàng của good ở phút 6; 1 mạng ≤ 1,25 đợt lính của good.
// người chơi: phần vàng lính ăn được mỗi đợt (last-hit), đợt đầu tới đường sau ~20s đi bộ
export const FARMERS = { afk: 0, poor: 0.3, avg: 0.55, good: 0.8, perfect: 1 };
const WALK = 20; // s từ lúc đợt sinh tới khi giao nhau giữa đường (ước lượng, chưa đo)
export function earned(plan, cs, t, kills = 0) {
  const waves = Math.max(0, Math.floor((t - M.firstWave - WALK) / M.waveInterval) + 1);
  const passive = plan.passive * t, minion = waves * waveGold * plan.minionMult * cs, kill = kills * plan.kill;
  const start = plan.start ?? ECO.startGold;
  return { start, passive, minion, kill, total: start + passive + minion + kill };
}
export const when = (plan, cs, gold, kills = 0) => { for (let t = 0; t < 3600; t++) if (earned(plan, cs, t, kills).total >= gold) return t; return null; };
const mmss = (t) => t == null ? "—" : `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
if (import.meta.main) {
  console.log(`wave ${waveGold}g / ${M.waveInterval}s · start ${ECO.startGold} · catalog ${ECO.itemCatalog} · map mach_giua 1v1 · MODEL`);
  for (const [pn, plan] of Object.entries(PLANS)) {
    console.log(`\n== ${pn} passive ${plan.passive}g/s · lính x${plan.minionMult} · kill ${plan.kill}`);
    console.log("farmer   " + [2, 4, 6, 8, 10].map((m) => `p${m}`.padStart(7)).join("") + "  passive%@6  vs_good@6  completed1600  2nd(+1600)");
    const g6 = earned(plan, FARMERS.good, 360).total;
    for (const [fn, cs] of Object.entries(FARMERS)) {
      const row = [2, 4, 6, 8, 10].map((m) => String(Math.round(earned(plan, cs, m * 60).total)).padStart(7)).join("");
      const e6 = earned(plan, cs, 360), pp = Math.round(100 * e6.passive / (e6.total - e6.start));
      console.log(fn.padEnd(9) + row + `  ${String(pp).padStart(6)}%   ${String(Math.round(100 * e6.total / g6)).padStart(5)}%     ${mmss(when(plan, cs, 1600)).padStart(6)}      ${mmss(when(plan, cs, 3200)).padStart(6)}`);
    }
    const k = [0, 1, 2, 3].map((n) => mmss(when(plan, FARMERS.avg, 1600, n))).join(" / ");
    console.log(`avg farmer, first completed with 0/1/2/3 kills: ${k}`);
    const W = (fn, lo, hi) => { const t = when(plan, FARMERS[fn], 1600); return t != null && t >= lo && t <= hi; };
    const afkShare = earned(plan, 0, 360).total / g6, killWaves = plan.kill / (waveGold * plan.minionMult * FARMERS.good);
    const checks = { good: W("good", 330, 420), avg: W("avg", 390, 510), poor: W("poor", 0, 660), afk: W("afk", 840, 1e9), afkShare: afkShare <= 0.4, kill: killWaves <= 1.25 };
    console.log(`targets: ${Object.entries(checks).map(([k, v]) => `${k} ${v ? "ok" : "MISS"}`).join(" · ")} (afk ${Math.round(afkShare * 100)}%, kill = ${killWaves.toFixed(2)} wave)`);
  }
}
