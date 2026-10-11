// Nội tại trang bị (doc 59 §2, doc 67). Một registry cho người chơi VÀ bot: dữ liệu ở economy.yml
// itemCatalogs.<v>.items.<id>.passive, logic ở đây theo passive.id. Mọi hàm chạy trên máy của chính tướng
// (ctx.self = tướng có đồ). Sát thương thưởng đi thẳng qua hurt(), không qua strike(), nên không kích lại nội tại khác.
// Hồi chiêu theo nhóm (passive.group) ở s.itemCd[group] = mốc sẵn sàng (ms): sống qua bán/mua/ghép/chết.
import { hurt, applyEffects, selfStatus } from './combat.js'
import { catOf, itemOf } from './items.js'

// nhóm → passive đang có (một nhóm một hiệu lực, doc 59 §5.4)
function held(s) {
  const v = catOf(s), out = {}
  for (const id of s.items ?? []) {
    const p = itemOf(id, v)?.passive
    if (p?.implemented && !out[p.group]) out[p.group] = p
  }
  return out
}
const ready = (s, g, now) => (s.itemCd?.[g] ?? 0) <= now
function cool(s, g, now, sec) { if (sec > 0) s.itemCd = { ...(s.itemCd ?? {}), [g]: now + sec * 1000 } }
const chest = (u) => ({ x: u.pos.x, y: u.pos.y + (u.height ?? 1.8) * 0.75, z: u.pos.z })
function tag(ctx, u, text, color) {
  ctx.emit('damageNumber', { position: chest(u), text, color, size: 0.8, lifetime: 0.7 }, { audience: { nearby: u.pos, radius: 30 } })
}

// một đòn đã trúng từ strike(): slot 'lmb' = đánh thường, còn lại = chiêu. d = sát thương sau kháng (>0).
export function onStrike(ctx, src, u, d, slot) {
  const s = ctx.self.state
  if (!(d > 0) || !s.items?.length) return
  const P = held(s)
  if (!Object.keys(P).length) return
  const now = ctx.now()
  const basic = slot === 'lmb'
  const hero = u.kind === 'hero'

  if (basic) {
    // Mắt Sắc: đòn thường thứ n (tướng/lính/neutral, không công trình) +12 vật lý; 4s không trúng thì đếm lại
    const ke = P.farseeing_pulse
    if (ke && u.kind !== 'structure') {
      const t = ke.trigger
      const c = (now - (s.ipKeAt ?? 0) > t.counterResetAfterSeconds * 1000 ? 0 : s.ipKe ?? 0) + 1
      s.ipKeAt = now
      if (c >= t.n) {
        s.ipKe = 0
        hurt(ctx, u, ke.effect.base, ke.effect.damageType, src, { quiet: false, slot: 'item:keeneye' })
        ctx.emit('slash', { position: chest(u), size: 1.1, shape: 'crescent' })
      } else s.ipKe = c
    }
    // Ống Tên Gai Ký: 3 đòn liên tiếp vào CÙNG một tướng → chậm 15% trong 1s, CD 8s; đổi mục tiêu/4s thì đếm lại
    const th = P.thorn_anchor
    if (th && hero) {
      const t = th.trigger
      const same = s.ipThT === u.id && now - (s.ipThAt ?? 0) <= t.counterResetAfterSeconds * 1000
      const c = (same ? s.ipTh ?? 0 : 0) + 1
      s.ipThT = u.id; s.ipThAt = now
      if (c >= t.n && ready(s, th.group, now)) {
        s.ipTh = 0
        applyEffects(ctx, u, [{ slow: th.effect.ratio, duration: th.durationSeconds }], src)
        cool(s, th.group, now, th.cooldownSeconds)
      } else s.ipTh = c >= t.n ? 0 : c
    }
    // Qua Khắc Mạch: trong 3s sau khi cast chiêu, đòn thường đầu tiên trúng TƯỚNG +18 vật lý; CD 6s tính từ lúc kích
    const qm = P.etched_followup
    if (qm && hero && (s.ipQmUntil ?? 0) > now && ready(s, qm.group, now)) {
      s.ipQmUntil = 0
      hurt(ctx, u, qm.effect.base, qm.effect.damageType, src, { slot: 'item:qua_mach' })
      cool(s, qm.group, now, qm.cooldownSeconds)
      ctx.emit('slash', { position: chest(u), size: 1.6, shape: 'crescent' })
    }
    return
  }

  if (!hero) return
  // Lò Than Ký: chiêu trúng tướng → +20 + 0.1 AP phép, CD 8s (một lần mỗi cast nhờ CD)
  const lt = P.archive_ember
  if (lt && ready(s, lt.group, now)) {
    hurt(ctx, u, lt.effect.base + (lt.effect.apRatio ?? 0) * (s.ap ?? 0), lt.effect.damageType, src, { slot: 'item:lo_than_ky' })
    cool(s, lt.group, now, lt.cooldownSeconds)
    tag(ctx, u, 'Lò Than', '#ff9a5a')
  }
  // Đăng Hồi Âm: chiêu trúng tướng → bản thân +0.3 m/s trong 2s, CD 8s
  const dh = P.echo_step
  if (dh && ready(s, dh.group, now)) {
    s.itemMs = dh.effect.amount; s.itemMsUntil = now + dh.durationSeconds * 1000
    cool(s, dh.group, now, dh.cooldownSeconds)
    selfStatus(ctx, ctx.self, 'haste', dh.durationSeconds)
  }
}

// một chiêu vừa cast (người chơi hoặc bot): mở cửa sổ Qua Khắc Mạch. Cast lại không tích tầng, chỉ làm mới.
export function onCast(ctx) {
  const s = ctx.self.state
  const qm = s.items?.length && held(s).etched_followup
  if (qm) s.ipQmUntil = ctx.now() + qm.trigger.windowSeconds * 1000
}

// Chuông Mây Hợp Ký: hồi/khiên TỪ KIT của chính tướng nhân 1.08 (không áp cho hồi/khiên của đồ)
export function kitHealMult(s) {
  const cb = s?.items?.length && held(s).concord_blessing
  return cb ? cb.effect.multiplier : 1
}

// Tâm Lò Dưỡng Ký: không gây/nhận sát thương tướng trong 8s → thêm 2 HP/s. Trả HP/s cộng thêm.
export function bonusRegen(ctx, s) {
  const hf = s?.items?.length && held(s).restoring_memory
  if (!hf) return 0
  const last = Math.max(s.heroCombatAt ?? 0, s.hitHeroAt ?? 0)
  return ctx.now() - last >= hf.trigger.afterSeconds * 1000 ? hf.effect.amountPerSecond : 0
}

// tốc chạy phẳng từ đồ (m/s) đang còn hiệu lực
export const itemMs = (s, now) => ((s?.itemMsUntil ?? 0) > now ? s.itemMs ?? 0 : 0)

// mỗi tick sau khi khiên đã hút sát thương. Giáp Minh Ước: khiên TỪ KIT hết hạn hoặc vỡ sau ≥0.5s → khiên 4% maxHP / 2s, CD 12s.
// Khiên của đồ mang cờ item: true nên không dây chuyền. Đếm đòn reset khi chết ở onDeath.
const SEEN = new Map() // id → { until, at } của khiên kit đang theo dõi (máy chủ sở hữu tướng)
export function tick(ctx) {
  const s = ctx.self.state, now = ctx.now(), id = ctx.self.id
  const sh = s.shield
  const live = sh && sh.until > now && sh.amt > 0
  const w = SEEN.get(id)
  if (live && !sh.item) { if (!w || w.until !== sh.until) SEEN.set(id, { until: sh.until, at: w && w.live ? w.at : now, live: true }); return }
  if (!w) return
  SEEN.delete(id)
  if (live) return // khiên đồ thay chỗ: không kích
  const oa = s.items?.length && held(s).concord_shell
  if (!oa || s.dead || now - w.at < oa.trigger.minimumLifetimeSeconds * 1000 || !ready(s, oa.group, now)) return
  s.shield = { amt: (oa.effect.base ?? 0) + oa.effect.maxHpRatio * (s.maxHp ?? 0), until: now + oa.durationSeconds * 1000, item: true }
  cool(s, oa.group, now, oa.cooldownSeconds)
  ctx.emit('highlightSet', { target: id, color: '#e8c56a', style: 'outline', duration: oa.durationSeconds })
  ctx.emit('damageNumber', { position: { x: ctx.self.feetPosition.x, y: ctx.self.feetPosition.y + 2.4, z: ctx.self.feetPosition.z }, text: 'Minh Ước', color: '#e8c56a', size: 0.8, lifetime: 0.8 }, { audience: { nearby: ctx.self.feetPosition, radius: 30 } })
}

export function onDeath(ctx) {
  const s = ctx.self.state
  s.ipKe = 0; s.ipTh = 0; s.ipThT = null; s.ipQmUntil = 0; s.itemMsUntil = 0
  SEEN.delete(ctx.self.id)
}
