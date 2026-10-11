// Kinh tế trận: MỘT nguồn cho mọi dòng vàng của tướng (người chơi và bot cùng luật). Profile theo map, stamp lên tướng
// lúc vào trận (state.ecoP) như itemCat: trận đang chạy giữ profile tới hết. Telemetry tách nguồn ở state.econ.
// economy.yml: economyProfiles.<id> + economyByMap.<map>. Đổi số: sửa profile hoặc thêm profile mới, đừng sửa code.
import ECO from './data/economy.yml'

const P = ECO.economyProfiles ?? {}
const BASE = { startGold: ECO.startGold, passiveGold: ECO.passiveGold, minionGoldMult: 1, heroKillGold: ECO.heroKill?.gold ?? 300, towerGold: 150 }
export const SOURCES = ['passive', 'minion', 'kill', 'objective', 'refund']

export const profileIdFor = (map) => (map && ECO.economyByMap?.[map]) || ECO.economyByMap?.default || null
export const profileOf = (s) => ({ ...BASE, ...(P[s?.ecoP] ?? P[profileIdFor(null)] ?? {}) })

// vào trận: chốt profile, vàng khởi đầu, sổ cái về 0
// map: map của trận (vé/roster). Người chơi chạy trên máy mình, bản lobby ở đó có thể chưa tới: luôn truyền map nếu có.
export function stampEcon(ctx, s, map) {
  s.ecoP = profileIdFor(map ?? ctx.place.state?.lobby?.map ?? s.ecoMap)
  s.ecoMap = map ?? ctx.place.state?.lobby?.map ?? s.ecoMap ?? null
  ctx.log('econ stamp', { id: ctx.self?.id, map, lobbyMap: ctx.place.state?.lobby?.map ?? null, prof: s.ecoP, byMap: ECO.economyByMap ?? null })
  const p = profileOf(s)
  s.gold = p.startGold
  s.goldF = 0
  s.econ = { start: p.startGold, passive: 0, minion: 0, kill: 0, objective: 0, refund: 0, spent: 0 }
}

const book = (s, k, n) => { const e = s.econ ?? { start: 0, passive: 0, minion: 0, kill: 0, objective: 0, refund: 0, spent: 0 }; s.econ = { ...e, [k]: (e[k] ?? 0) + n } }
export function earn(s, src, n) {
  n = Math.round(n)
  if (!(n > 0)) return 0
  s.gold = (s.gold ?? 0) + n
  book(s, src, n)
  return n
}
export function spend(s, n) { if (n > 0) { s.gold -= n; book(s, 'spent', n) } }

// mỗi tick khi sống: vàng thụ động theo profile, cộng nguyên; mỗi phút trận ghi một dòng log (đọc bằng getLogs 'econ')
export function passiveGold(ctx, s, dt, who) {
  s.goldF = (s.goldF ?? 0) + profileOf(s).passiveGold * dt
  if (s.goldF >= 1) { const g = Math.floor(s.goldF); s.goldF -= g; earn(s, 'passive', g) }
  const t0 = ctx.place.state.match?.startedAt
  if (!t0) return
  const min = Math.floor((ctx.now() - t0) / 60000)
  if (min > (s.econMin ?? 0)) { s.econMin = min; ctx.log('econ', { min, who, hero: s.hero, profile: s.ecoP, gold: s.gold, ...econTotals(s), items: s.items }) }
}

export const econTotals = (s) => {
  const e = s.econ ?? {}
  return { ...e, totalEarned: (e.start ?? 0) + SOURCES.reduce((a, k) => a + (k === 'refund' ? 0 : e[k] ?? 0), 0) }
}
