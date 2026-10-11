// Một cửa cho mọi import() sau khi đứng (doc53 §6/§11): thử lại có giãn cách, thôi sau 4 lần, và nói rõ phần nào hỏng.
// Mỗi máy (worker hành vi, khung UI) giữ sổ riêng của nó. Không dùng setTimeout: lần thử kế tiếp chờ `now` của caller.
//   lazy(key, () => import('./x.js'), now) → module | null (null = chưa về, đang thử, hoặc đã hỏng)
//   failed() → [{ key, err }] phần đã thôi thử; retryAll() → cho thử lại từ đầu (nút Thử lại)
// Giới hạn: đây chỉ là script/data mình import. Model/clip/âm thanh do engine tải; engine chưa có hook báo hỏng,
// nên không có retry và không có trạng thái "đã tải" cho chúng ở đây.
const WAIT = [0, 1000, 3000, 8000] // ms trước lần thử thứ n
const AGAIN = 15000 // a part past its 4 tries still tries again this often: a dropped fetch heals without the button
const BOOK = new Map()
// a tab the browser hid (or the engine parked) can't fetch: a miss there is not the part's fault and is not counted
// (2026-10-09 @lukasai: tab hidden while builds landed → "Đã thử lại 4 lần", room screen never loaded)
const hidden = () => typeof document === 'object' && document?.visibilityState === 'hidden'
export function lazy(key, load, now = 0) {
  let r = BOOK.get(key)
  if (!r) BOOK.set(key, (r = { mod: null, busy: false, fails: 0, nextAt: 0, err: '' }))
  if (r.mod || r.busy || now < r.nextAt) return r.mod
  if (r.fails >= WAIT.length) { if (hidden()) return null; r.nextAt = now + AGAIN } // the card shows; the part still heals itself
  r.busy = true
  const wasHidden = hidden()
  load().then((m) => { r.mod = m; r.busy = false; r.err = ''; r.fails = 0 }, (e) => {
    r.busy = false; if (!wasHidden && !hidden() && r.fails < WAIT.length) r.fails++
    r.nextAt = Math.max(r.nextAt, now + (WAIT[Math.min(r.fails, WAIT.length - 1)] || 1000)); r.err = String(e?.message ?? e).slice(0, 120)
  })
  return null
}
export const failed = () => [...BOOK].filter(([, r]) => !r.mod && r.fails >= WAIT.length).map(([key, r]) => ({ key, err: r.err }))
export const loaded = (key) => !!BOOK.get(key)?.mod
export function retryAll() { for (const r of BOOK.values()) if (!r.mod && r.fails >= WAIT.length) { r.fails = 0; r.nextAt = 0 } }
