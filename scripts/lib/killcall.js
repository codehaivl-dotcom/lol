// Thông báo hạ gục (Slain): một lần hạ tướng → danh hiệu (chiến công đầu, song…ngũ sát, chặn đứng, chuỗi), dòng feed có cấu trúc
// cho banner + bảng thông báo, và giọng xướng riêng cho từng người nghe (góc nhìn + ngôn ngữ). Gọi đúng một lần, từ thân đang gục
// (scripts/hero/match/life.js và scripts/bot.js), sau khi đã cộng kills cho kẻ hạ. Số liệu: scripts/lib/data/killcall.yml.
import K from './data/killcall.yml'
import { heroName } from './bodies.js'

const MULTI = ['double', 'triple', 'quadra', 'penta']

function titleOf(ps, ks, n, vStreak) {
  if (ps.firstBlood !== (ps.startedAt ?? 0)) { ps.firstBlood = ps.startedAt ?? 0; return 'first' }
  if (n >= 2) return MULTI[Math.min(n, 5) - 2]
  if (vStreak >= K.shutdownStreak) return 'shutdown'
  const st = ks.streak ?? 0
  if (st >= 7) return K.spree[7]
  return K.spree[st] ?? null
}

export function callKill(ctx, victim, killer) {
  const now = ctx.now(), ps = ctx.place.state, vs = victim.state
  const vStreak = vs.streak ?? 0
  vs.streak = 0; vs.multi = null
  let title = null, n = 0
  if (killer) {
    const ks = killer.state
    n = ks.multi && now - ks.multi.at < K.multiWindow * 1000 ? Math.min(5, ks.multi.n + 1) : 1
    ks.multi = { n, at: now }
    ks.streak = (ks.streak ?? 0) + 1
    title = titleOf(ps, ks, n, vStreak)
  }
  const kill = { kh: killer?.state.hero ?? null, kt: killer?.state.team ?? null, kn: killer ? heroName(killer) : null, vh: vs.hero, vt: vs.team, vn: heroName(victim), title, n }
  ps.feed = { key: killer ? 'feed.kill' : 'feed.died', vars: { a: killer ? heroName(killer) : 'feed.env', b: heroName(victim) }, at: now, kill }
  for (const p of ctx.place.players) {
    const team = p.state?.team
    if (!team) continue
    const line = title ?? (killer && p.id === killer.id ? 'you_slain' : p.id === victim.id ? 'you_died' : team === vs.team ? 'ally_died' : 'enemy_died')
    const clip = K.voice[p.state?.locale === 'en' ? 'en' : 'vi']?.[line]
    if (clip) ctx.emit('playSound', { clip, volume: 0.95 }, { audience: { player: p.id } })
  }
  return kill
}
