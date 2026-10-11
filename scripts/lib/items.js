// Trang bị: resolver một nguồn + giao dịch (doc 63 §2–3, doc 67). Mọi consumer đọc catalog qua đây, theo version
// đã stamp lên tướng (state.itemCat). Không ai đọc bảng số item ở chỗ khác.
import ECO from './data/economy.yml'

const CATS = ECO.itemCatalogs ?? {}
const want = ECO.itemCatalog
// catalog cho trận mới: tên trong economy.yml nếu nó bật, không thì catalog bật đầu tiên
export const ACTIVE = CATS[want] && CATS[want].enabled !== false ? want : Object.keys(CATS).find((k) => CATS[k].enabled !== false)
export const MAX_ITEMS = ECO.maxItems ?? 6
export const SELL_RATIO = ECO.sellRatio ?? 0.6

// version của một tướng: đã stamp thì dùng; túi cũ chưa stamp mà có đồ = legacy (không reinterpret giữa trận)
// (doc 67 bug 09/10: túi mua bộ mới nhưng chưa stamp bị lật về legacy). Chưa stamp: catalog chứa ĐỦ mọi món trong túi, ưu tiên ACTIVE.
const holds = (v, bag) => !!CATS[v] && bag.every((id) => CATS[v].items?.[id])
export const catOf = (s) => {
  if (s?.itemCat && CATS[s.itemCat]) return s.itemCat
  const bag = s?.items ?? []
  if (!bag.length || holds(ACTIVE, bag)) return ACTIVE
  return Object.keys(CATS).find((v) => holds(v, bag)) ?? ACTIVE // legacy, legacy-2 … : catalog đầu tiên chứa đủ túi
}
export const itemsOf = (v) => CATS[v ?? ACTIVE]?.items ?? null
export const itemOf = (id, v) => itemsOf(v)?.[id] ?? null
export const buildOf = (heroId, v) => CATS[v ?? ACTIVE]?.builds?.[heroId] ?? []
export const sellPrice = (id, v) => Math.round((itemOf(id, v)?.cost ?? 0) * SELL_RATIO)
export const hasThirdHit = (items, v) => { let n = 0; for (const id of items ?? []) n = Math.max(n, itemOf(id, v)?.thirdHit ?? 0); return n }

// Báo giá mua/ghép. bag = mảng id hiện có. Trả { ok, reason, fee, consumed: [chỉ số trong bag], bag: túi mới }.
// Ưu tiên nguyên liệu trực tiếp có trong túi, thiếu thì đệ quy con; mỗi ô tín dụng đúng giá catalog một lần;
// số ô, maxCopies, relic kiểm trên túi SAU khi tiêu thụ. Từ chối không đổi gì.
export function quote(bag, id, gold, v) {
  const items = itemsOf(v)
  if (!items) return { ok: false, reason: 'msg.itemVersion' }
  const it = items[id]
  if (!it) return { ok: false, reason: 'msg.itemVersion' }
  const taken = new Set()
  const credit = (cid) => {
    const i = bag.findIndex((x, j) => x === cid && !taken.has(j))
    if (i >= 0) { taken.add(i); return items[cid]?.cost ?? 0 }
    let c = 0
    for (const sub of items[cid]?.components ?? []) c += credit(sub)
    return c
  }
  let cr = 0
  for (const cid of it.components ?? []) cr += credit(cid)
  const fee = Math.max(0, it.cost - cr)
  const next = [...bag.filter((_, j) => !taken.has(j)), id]
  const copies = next.filter((x) => x === id).length
  if (next.length > MAX_ITEMS) return { ok: false, reason: 'msg.bagFull', fee }
  if (copies > (it.maxCopies ?? 99)) return { ok: false, reason: 'msg.maxCopies', fee }
  if (it.slot === 'relic' && next.filter((x) => items[x]?.slot === 'relic').length > 1) return { ok: false, reason: 'msg.oneRelic', fee }
  if (gold < fee) return { ok: false, reason: 'msg.noGold', fee }
  return { ok: true, fee, consumed: [...taken], bag: next }
}

// Cộng chỉ số đồ (heroStats dùng). AS nhân từng món, còn lại cộng.
export function addItemStats(out, items, v) {
  for (const id of items ?? []) {
    const it = itemOf(id, v)
    if (!it) continue
    out.ad += it.ad ?? 0
    out.ap = (out.ap ?? 0) + (it.ap ?? 0)
    out.hp += it.hp ?? 0
    out.armor += it.armor ?? 0
    out.mr += it.mr ?? 0
    out.hpRegen += it.hpRegen ?? 0
    out.moveSpeed += it.moveSpeed ?? 0
    out.attackSpeed *= 1 + (it.attackSpeed ?? 0)
  }
  return out
}

// chỉ để HIỂN THỊ tên/icon đồ của người khác (bảng điểm): version của họ không có trong tay
export const anyItem = (id, v) => itemOf(id, v) ?? itemOf(id, ACTIVE) ?? itemOf(id, 'legacy')
// chỉ số hiển thị (tooltip/shop): các khóa cộng vào heroStats
export const STAT_KEYS = ['ad', 'ap', 'attackSpeed', 'armor', 'mr', 'hp', 'hpRegen', 'moveSpeed', 'thirdHit']
