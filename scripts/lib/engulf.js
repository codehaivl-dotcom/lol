// Vùi Bùn (Cốt Bện R, heroes.yml cot_ben.r effects engulf): the victim is inside the mud belly: unseen, held still,
// untargetable; when the time runs out the belly spits it back where it was swallowed. The victim's own body runs this
// (player.js, bot.js); the striker writes only the rows (lib/combat.js applyEffects). No imports: player.js stays light.
export function engulfStep(ctx, self) {
  const s = self.state
  if (!s.engulfUntil) return false
  if (s.engulfUntil > ctx.now() && !s.dead) {
    if (self.visible !== false) self.visible = false
    return true
  }
  s.engulfUntil = null
  if (!s.dead && self.visible === false) self.visible = true
  return false
}
