// Combat damage trace (doc 70, GAP P0). Off unless world.state.dmgTrace.on (dev measurement only).
// Each striking body keeps its own rows under world.state.dmgTrace.by[<its id>] so two machines never write one row.
// Row: [t s since match start, kind, slot, srcHero, target, srcL, tgtL, type, raw, res, pen, dealt, hpBefore, maxHp, shield]
// kind: 'cast' (a skill or basic swing released) | 'hit' (hurt() resolved on a target) | 'miss' (a swing with nothing under it).
const buf = {}, flushAt = {}
const tOf = (ctx) => Math.round((ctx.now() - (ctx.place.state?.match?.startedAt ?? ctx.now())) / 100) / 10
export const traceOn = (ctx) => !!ctx.world.state?.dmgTrace?.on
export function trace(ctx, row) {
  if (!traceOn(ctx)) return
  const key = String(ctx.self?.id ?? 'x').replace(/[^\w-]/g, '_')
  ;(buf[key] ??= []).push([tOf(ctx), ...row])
  const now = ctx.now()
  if (now < (flushAt[key] ?? 0) && buf[key].length < 40) return
  flushAt[key] = now + 2000
  const T = ctx.world.state.dmgTrace
  const prev = T.by?.[key] ?? []
  const next = prev.concat(buf[key]).slice(-(T.cap ?? 600))
  T.by = { ...(T.by ?? {}), [key]: next }
  buf[key] = []
}

// Recovery rows (doc 70, 2026-10-09): every HP gain that is not damage, summed per (target, kind) and flushed once a second.
// Row: [t, 'heal', kind, '', targetLabel, 0, tgtL, '', 0, 0, 0, gained, hpAfter, maxHp, 0]
// kind: regen | fountain | potion | shield (a shield's soak refunds HP after hurt()) | skill | lifesteal
const RACC = {}
export const bodyLabel = (s, id) => `${s?.hero ?? '?'}@${s?.team ?? '?'}#${String(id ?? '').slice(-6)}`
export function recov(ctx, s, id, kind, gained) {
  if (!(gained > 0) || !traceOn(ctx)) return
  const key = `${id}|${kind}`, now = ctx.now()
  const a = (RACC[key] ??= { sum: 0, at: now })
  a.sum += gained
  if (kind !== 'regen' && kind !== 'fountain' && kind !== 'potion' || now - a.at >= 1000) {
    trace(ctx, ['heal', kind, '', bodyLabel(s, id), 0, s.level ?? 0, '', 0, 0, 0, Math.round(a.sum), Math.round(s.hp), Math.round(s.maxHp ?? 0), 0])
    a.sum = 0; a.at = now
  }
}
