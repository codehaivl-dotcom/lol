// Tiến trình theo phút: cấp (xpTable), cấp chiêu (rankOf như combat.js), vàng (profile kinh tế của map) và túi đồ mua theo
// build của catalog qua scripts/lib/items.js quote() (cùng đường mua với người chơi/bot). Mô hình, không phải trận thật.
import { ECO, ST, buildOf, itemDef } from "./data.mjs";
import { quote } from "../../scripts/lib/items.js";
import { GATES } from "./data.mjs";

const M = ST.minions;
export const WAVE_XP = M.composition.reduce((a, k) => a + M.kinds[k].xp, 0);
export const WAVE_GOLD = M.composition.reduce((a, k) => a + M.kinds[k].gold, 0);
export const ecoProfile = (map = "mach_giua") => ECO.economyProfiles[ECO.economyByMap[map] ?? ECO.economyByMap.default];

export function levelOf(xp) {
  let L = 1, need = 0;
  for (const step of ECO.xpTable) { need += step; if (xp >= need && L < ECO.maxLevel) L++; else break; }
  return L;
}
export const xpFor = (L) => ECO.xpTable.slice(0, L - 1).reduce((a, b) => a + b, 0);

// mua dần theo build: món đích mua được thì mua, không thì gom thành phần (đệ quy); dừng khi không mua nổi gì
export function shop(heroId, gold, bag = [], build = null) {
  let left = gold;
  const tryBuy = (id) => { const q = quote(bag, id, left); if (!q.ok) return false; bag = q.bag; left -= q.fee; return true; };
  const toward = (id) => { // true = túi vừa tiến thêm một bước về món id
    if (tryBuy(id)) return true;
    const comps = itemDef(id)?.components ?? [];
    for (const c of new Set(comps)) {
      if (bag.filter((x) => x === c).length >= comps.filter((x) => x === c).length) continue;
      return toward(c);
    }
    return false;
  };
  for (const id of build ?? buildOf(heroId)) {
    for (let i = 0; i < 40 && !bag.includes(id); i++) if (!toward(id)) break;
    if (!bag.includes(id)) break;
  }
  return { bag, left };
}

// snapshot của một tướng ở phút m với hiệu suất farm của profile người chơi
export function snapshot(heroId, minute, { profile = "newbie", map = "mach_giua", xpAdd = 0, goldAdd = 0, build = null } = {}) {
  if (minute === "full") { const { bag } = shop(heroId, 99999, [], build); return { heroId, minute, level: ECO.maxLevel, xp: xpFor(ECO.maxLevel), gold: 99999, unspent: 0, items: bag, profile, map, eco: "full-build" }; }
  const P = GATES.players[profile], E = ecoProfile(map), t = minute * 60;
  const waves = t < M.firstWave ? 0 : Math.floor((t - M.firstWave) / M.waveInterval) + 1;
  const done = Math.max(0, waves - 1) + Math.min(1, Math.max(0, (t - M.firstWave - (waves - 1) * M.waveInterval) / 20)); // đợt đang đánh tính dở
  const xp = done * WAVE_XP * P.xpShare + xpAdd;
  const gold = E.startGold + E.passiveGold * t + done * WAVE_GOLD * E.minionGoldMult * P.farm + goldAdd;
  const L = levelOf(xp);
  const { bag, left } = shop(heroId, gold, [], build);
  return { heroId, minute, level: L, xp: Math.round(xp), gold: Math.round(gold), unspent: Math.round(left), items: bag, profile, map, eco: E.version };
}
