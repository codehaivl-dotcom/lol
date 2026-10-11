// Kit mechanics shared by the player's hands (hero/match/combat.js) and a bot's (bot.js): one rule, two bodies.
// Added for Hạo Nhật (H1, 2026-10-10); every field here is a kit field in heroes.yml, schema in doc 09.
//   passive.type shield_strike   the next basic after this hero raises a kit shield deals passive.bonusDamage + passive.effects
//   <slot>.shield.burst          when that shield breaks or runs out: { type, base[rank], ap, radius, effects? } around the hero
//   <slot>.passMinions           a skillshot flies through minions (striking each) and stops at the first hero
//   area <slot>.hits = n         the area lands n times, ECHO_GAP s apart, on the same centre (Hai Nhịp Trời)
//   passive.type cdr_on_hit      each basic that lands pulls the ready time of q/rmb/e (and r when passive.ult) passive.seconds sooner (Hương Mai, H1b)
//   <slot>.heal.ally             a skillshot cast heals the most hurt ally (not self) within range + 1 m (Mạch Lành)
export const ECHO_GAP = 0.6

// Cổng Khép: the cooldown row after a basic lands; null when the passive is not this one
// taken (optional, mutated): per slot, the ready-time this passive already cut; with pas.perCast a slot is cut once per cooldown (ngu_dang Chuông Dồn)
export function cdrOnHit(pas, cd, now, taken) {
  if (pas?.type !== 'cdr_on_hit' || !cd) return null
  const ms = (pas.seconds ?? 0) * 1000, out = { ...cd }
  for (const k of ['q', 'rmb', 'e', ...(pas.ult ? ['r'] : [])]) {
    if (!((out[k] ?? 0) > now)) continue
    if (pas.perCast && taken && taken[k] === out[k]) continue
    out[k] = Math.max(now, out[k] - ms)
    if (pas.perCast && taken) taken[k] = out[k]
  }
  return out
}

// Mạch Lành: of the allies near (rows { id, hp, maxHp, d }), the one the beam mends: lowest hp share within reach, never the caster
export function mendTarget(allies, selfId, reach) {
  let best = null
  for (const a of allies) {
    if (a.id === selfId || a.d > reach || !(a.maxHp > 0) || a.hp <= 0) continue
    if (!best || a.hp / a.maxHp < best.hp / best.maxHp) best = a
  }
  return best
}

// which of the candidates (sorted near→far, { u, along }) a skillshot strikes, and how far it flies
export function skillshotStruck(hits, spec) {
  const pierce = spec.pierce ?? ((spec.hits ?? 1) > 1 || (spec.width ?? 0) >= 2)
  if (pierce) return { struck: hits, reach: spec.range, stopped: false }
  if (spec.passMinions) {
    const i = hits.findIndex((x) => x.u.kind === 'hero')
    if (i < 0) return { struck: hits, reach: spec.range, stopped: false }
    return { struck: hits.slice(0, i + 1), reach: hits[i].along, stopped: true }
  }
  return hits.length ? { struck: hits.slice(0, 1), reach: hits[0].along, stopped: true } : { struck: [], reach: spec.range, stopped: false }
}

// the passive that rides the next basic: after_ability (any skill) and shield_strike (a kit shield)
export const empowersBasic = (pas) => pas?.type === 'after_ability' || pas?.type === 'shield_strike'
export const empowersOnShield = (pas) => pas?.type === 'shield_strike'
export const passiveBonus = (pas, s) => (pas.bonusDamage.base ?? 0) + (pas.bonusDamage.ap ?? 0) * s.ap + (pas.bonusDamage.ad ?? 0) * s.ad + (pas.bonusDamage.perLevel ?? 0) * ((s.level ?? 1) - 1)

// the shield row a kit shield writes, carrying its burst
export const shieldRow = (amt, sh, rank, now) => ({ amt, until: now + (sh.duration ?? 3) * 1000, ...(sh.item ? { item: true } : {}), ...(sh.burst ? { burst: { ...sh.burst, rank } } : {}) })

// a burst due this tick: the shield broke or ran out and has not burst yet; marks it spent
export function dueBurst(s, now) {
  const sh = s.shield
  if (!sh?.burst || sh.burst.spent) return null
  if (sh.amt > 0 && sh.until > now) return null
  const b = sh.burst
  s.shield = { ...sh, burst: { ...b, spent: true } }
  return b
}
// the next echo of a multi-hit area, or null
export const nextEcho = (spec, pl) => ((spec.hits ?? 1) > 1 && (pl.echo ?? 0) < spec.hits - 1 ? { ...pl, echo: (pl.echo ?? 0) + 1 } : null)
// a multi-beat area deals its damage every beat; its CC lands on the last beat only (the Lab counts the stun once)
// the ground warning lasts until the LAST beat falls (doc 78 R3 #1): windup + delay + (hits-1) × ECHO_GAP on an area echo
export const teleSpan = (spec) => (spec?.windup ?? 0) + (spec?.delay ?? 0) + (spec?.aim === 'area' && (spec?.hits ?? 1) > 1 ? (spec.hits - 1) * ECHO_GAP : 0)
export const beatSpec = (spec, pl) => ((spec.hits ?? 1) > 1 && (pl.echo ?? 0) < spec.hits - 1 ? { ...spec, effects: null } : spec)

// Skill marks (bible §skill marks): a wall skill's hit zone IS its wall: 2×radius long, square to the aim, mark.width thick,
// standing mark.hold seconds; whoever touches it while it stands takes the effects again (Hương Mai E "chạm vào bị chậm").
export const wallOf = (spec) => (spec?.mark?.kind === 'wall' ? { half: spec.radius ?? 2, w: spec.mark.width ?? 0.8, hold: spec.mark.hold ?? 2, every: 0.25 } : null)
export function inWall(u, c, fwd, wall) {
  const l = Math.hypot(fwd?.x ?? 0, fwd?.z ?? 0) || 1, fx = (fwd?.x ?? 0) / l, fz = (fwd?.z ?? -1) / l
  const dx = u.pos.x - c.x, dz = u.pos.z - c.z, r = u.r ?? 0.5
  return Math.abs(dx * fx + dz * fz) <= wall.w / 2 + r && Math.abs(-dx * fz + dz * fx) <= wall.half + r * 0.5
}

// doc 76 · cone AoE vs fan projectiles: two different geometries, never confused.
// area <slot>.arc = deg      a cone AoE: the WHOLE sector hits: radius in front of the cast facing, arc° wide (Khả Tận Q 180°)
// skillshot <slot>.fan       fan projectiles: { count, spread (deg, whole fan) }: count separate shots, each <slot>.width wide,
//                            each flying <slot>.range along its own heading; only what a shot touches is hit; the gaps hit nothing.
//                            A body touched by several shots of one cast is struck once (fan.oncePerTarget, default true).
export function inArc(u, c, fwd, deg) {
  const dx = u.pos.x - c.x, dz = u.pos.z - c.z, d = Math.hypot(dx, dz), r = u.r ?? 0.5
  if (d <= r) return true // standing on the caster
  const l = Math.hypot(fwd?.x ?? 0, fwd?.z ?? 0) || 1, cos = (dx * (fwd?.x ?? 0) + dz * (fwd?.z ?? -1)) / (l * d)
  const off = Math.acos(Math.max(-1, Math.min(1, cos))), half = (deg * Math.PI) / 360
  return off <= half + Math.asin(Math.min(1, r / d)) // the body's edge counts, as it does for a circle
}
export function fanDirs(fwd, spec) {
  const n = Math.max(1, spec?.fan?.count ?? 1), sp = n > 1 ? (spec.fan.spread ?? 0) : 0
  const l = Math.hypot(fwd.x, fwd.z) || 1, fx = fwd.x / l, fz = fwd.z / l
  return Array.from({ length: n }, (_, i) => { const a = (n > 1 ? -sp / 2 + (sp * i) / (n - 1) : 0) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return { x: fx * c - fz * s, z: fx * s + fz * c } })
}
// candidates for each shot, sorted near→far: [{ dir, hits: [{ u, along }] }]: one lane per shot (one lane for a plain skillshot)
export function shotLanes(list, p, fwd, spec) {
  const half = (spec.width ?? 1) / 2, range = spec.range
  return fanDirs(fwd, spec).map((dir) => {
    const hits = []
    for (const u of list) {
      const dx = u.pos.x - p.x, dz = u.pos.z - p.z, along = dx * dir.x + dz * dir.z, perp = Math.abs(dx * dir.z - dz * dir.x)
      if (along < -u.r || along > range + u.r || perp > half + u.r) continue
      hits.push({ u, along })
    }
    return { dir, hits: hits.sort((a, b) => a.along - b.along) }
  })
}
// each lane through skillshotStruck, then one strike per body per cast (the nearest arrow's arrival)
export function fanStruck(lanes, spec) {
  const out = lanes.map((ln) => ({ dir: ln.dir, ...skillshotStruck(ln.hits, spec) }))
  if (spec?.fan?.oncePerTarget === false) return { lanes: out, struck: out.flatMap((l) => l.struck) }
  const seen = new Map()
  for (const l of out) for (const h of l.struck) { const k = h.u.id ?? h.u; if (!seen.has(k) || seen.get(k).along > h.along) seen.set(k, h) }
  return { lanes: out, struck: [...seen.values()] }
}

// the telegraph's own form (doc 76): a wall band square to the aim, a cone's sector along it, else null (a circle)
export function markOf(spec, fwd) {
  const yaw = (Math.atan2(-(fwd?.x ?? 0), -(fwd?.z ?? -1)) * 180) / Math.PI
  if (spec?.mark?.kind === 'wall') return { ...spec.mark, yaw: yaw + 90 }
  if (spec?.arc) return { kind: 'arc', arc: spec.arc, yaw }
  return null
}
