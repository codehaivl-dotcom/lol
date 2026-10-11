// G2 measurement log (doc14 §G2). Log only: nothing in gameplay reads these rows.
// place.state.siegeAt / towersDown = { _round, <structureId>: ms from startedAt }. A row whose _round is not
// place.state.round belongs to an older round and is never written into or read as this round's data.
// place.state.g2Trace = the last 24 events (reset, lane reset, siege, fall, refused writes), each with round + startedAt.
const KEEP = 24
const refusedOnce = new Set()  // this machine's scratch: one refused trace per key/id/round

export function g2Trace(ctx, ev, data = {}) {
  const s = ctx.place.state
  const row = { ev, at: ctx.now(), round: s.round ?? null, startedAt: s.startedAt ?? null, ...data }
  s.g2Trace = [...(s.g2Trace ?? []).slice(-(KEEP - 1)), row]
}

// the referee opens a round's log: whole new objects, stamped, so a missed replace shows as a wrong _round
export function g2Open(ctx, why) {
  const s = ctx.place.state
  const before = JSON.parse(JSON.stringify({ siegeAt: s.siegeAt ?? null, towersDown: s.towersDown ?? null }))  // a copy: a state row read is live
  s.siegeAt = { _round: s.round }
  s.towersDown = { _round: s.round }
  g2Trace(ctx, 'open:' + why, { before })
}

// lane.js writes one mark; laneRound = the round lane.js has already reset its structures for
export function g2Mark(ctx, key, id, laneRound) {
  const s = ctx.place.state
  const row = s[key]
  if (laneRound !== s.round || row?._round !== s.round) {
    const k = key + '|' + id + '|' + s.round
    if (!refusedOnce.has(k)) { refusedOnce.add(k); g2Trace(ctx, 'refused:' + key, { id, laneRound, rowRound: row?._round ?? null }) }
    return false
  }
  if (row[id] != null) return false
  const ms = ctx.now() - (s.startedAt ?? ctx.now())
  s[key] = { ...row, [id]: ms }
  g2Trace(ctx, key, { id, ms })
  return true
}
