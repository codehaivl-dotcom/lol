// Mạch Giữa walk fence (2026-10-09 @lukasai "Chặn player rơi xuống"). One rule for player and bot bodies:
// a hero may stand on the corridor, the bases, the alcoves and pockets; across the river band only on the
// bridge deck. A step that would leave that area slides along the edge instead (dash and knockback too),
// so the parapet gaps, the river and the outer karst lip can never take a hero. Data: map.yml.
import { MAP } from './map.js'
const L = MAP.lane
const DECK = MAP.bridgeHalf ?? 7.8          // bridge deck half-width minus the body radius (deck 17 m)
const EDGE = MAP.walkPad ?? 2               // slack past corridorHalf: the cliff foot is noisy, the slope stops you first
function laneDist(x, z) {
  let best = 1e9
  for (let i = 0; i < L.length - 1; i++) {
    const [ax, az] = L[i], [bx, bz] = L[i + 1]
    const dx = bx - ax, dz = bz - az, t = Math.min(1, Math.max(0, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz)))
    best = Math.min(best, Math.hypot(x - ax - dx * t, z - az - dz * t))
  }
  return best
}
export function walkable(x, z) {
  const ld = laneDist(x, z)
  if (Math.abs(x - z) / Math.SQRT2 < MAP.bankWall + 0.4) return ld <= DECK
  if (ld <= MAP.corridorHalf + EDGE) return true
  for (const b of Object.values(MAP.bases)) if (Math.hypot(x - b[0], z - b[1]) <= MAP.baseRadius + EDGE) return true
  for (const a of [...(MAP.alcoves ?? []), ...(MAP.pockets ?? [])]) if (Math.hypot(x - a.at[0], z - a.at[1]) <= a.r + 1.5) return true
  return false
}
// v: the velocity about to be written; returns it, or its slide along the fence. Look-ahead 0.25 s.
export function fence(p, v) {
  if (!p || (!v.x && !v.z) || !walkable(p.x, p.z)) return v // already outside (an editor, a spawn): never trap
  const k = 0.25
  if (walkable(p.x + v.x * k, p.z + v.z * k)) return v
  if (walkable(p.x + v.x * k, p.z)) return { x: v.x, y: v.y, z: 0 }
  if (walkable(p.x, p.z + v.z * k)) return { x: 0, y: v.y, z: v.z }
  return { x: 0, y: v.y, z: 0 }
}
