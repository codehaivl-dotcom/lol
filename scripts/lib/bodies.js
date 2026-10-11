// Who wears a hero right now: players with a hero and the bot heroes. Light on purpose (no combat rules), so the
// camera's overhead plates read it without pulling lib/combat.js into the boot (B2, doc 48 v3). combat.js re-exports both.
export function heroBodies(ctx) {
  const out = []
  // one combat body per seat (P0, 2026-10-09): while a stand-in plays a seat (referee/match.js spawnSub, id sub-<uid>),
  // the player's own body is parked: a hidden tab keeps it in the place, but it is not a hero anyone can see, strike or aim
  for (const p of ctx.place.players) if (p.state?.hero && !parked(ctx, p)) out.push(p)
  for (const r of ctx.query({ tags: ['bot-hero'] })) { const o = ctx.getObject(r.id); if (o?.state?.hero) out.push(o) }
  return out
}
export const heroName = (h) => h.state?.botName ?? h.displayName ?? ''

// parked: a stand-in plays the seat, or another body of the same uid holds the seat's lease (referee/handback.js leaseOf)
// or a hand-back for this seat is still pending (match.saved[u].at not yet acked): its row is stale until it takes it
export const parked = (ctx, p) => {
  const u = p.userId ?? p.id, st = ctx.place.state, l = st?.lobby?.lease?.[u], sv = st?.match?.saved?.[u]
  return !!ctx.place.objects?.[`sub-${u}`] || (!!l && l !== p.id) || (!!sv?.at && p.state?.resumedAt !== sv.at)
}
