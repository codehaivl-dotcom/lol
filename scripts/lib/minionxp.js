// Minion XP, 1v1 rule (2026-10-09 @lukasai, doc 08 §5.1): independent of the last hit. Whatever killed the minion
// (hero, allied minion, tower), every living enemy hero within minions.xpRange (12 m, XZ plane) gets 100% once.
// Gold/CS stay with the last hitter (lane.js reward). Player and bot are both heroBodies; a parked seat (stand-in
// playing it) is excluded there, so a disconnected seat earns through its one stand-in body. 5v5 sharing: not designed.
import S from './data/structures.yml'
import { heroBodies } from './bodies.js'
export function grantMinionXp(ctx, minion, xp) {
  const R = S.minions.xpRange ?? 12, at = minion.feetPosition, got = []
  for (const x of heroBodies(ctx)) {
    if (!x.state?.team || x.state.team === minion.state.team || x.state.dead) continue
    const d = Math.hypot(x.feetPosition.x - at.x, x.feetPosition.z - at.z)
    if (d > R) continue
    x.state.xp = (x.state.xp ?? 0) + xp
    got.push([x.id, Math.round(d * 10) / 10])
  }
  if (ctx.world.state.xpTrace) ctx.log('minionXp', { kind: minion.state.kind, by: minion.state.lastHitBy ?? null, xp, got })
  return got
}
