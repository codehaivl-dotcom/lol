// QA bench (doc 76 acceptance, 2026-10-11): build room only. world.state.qaBench = { quiet, dummies: [ids], draw, log }.
//   quiet   → lane.js spawns no waves, minions on the lane hold, towers hold fire (clean hit attribution: no minion/tower damage)
//   dummies → bot bodies by id stand frozen where placed: no think, no walk, no attack
//   draw    → every hero cast draws its AUTHORITATIVE hit geometry on the floor (the same heroes.yml spec + kitmech maths)
//   cursor  → the local hero mirrors its pointer's ground point into state.qaCursor (aim tests place the cursor exactly)
//   log     → world.state.qaLog keeps the last 40 rows: casts { k:'cast', hero, slot, p, fwd, c } and hits { k:'hit', slot, by, to, d }
// Delete world.state.qaBench and the game is untouched. The live room never reads any of it.
import { fanDirs, wallOf } from './kitmech.js'

export const bench = (ctx) => (ctx.world?.mode === 'dev' ? ctx.world.state?.qaBench ?? null : null)
export const frozen = (ctx, id) => !!bench(ctx)?.dummies?.includes(id)

export function qaLog(ctx, row) {
  const b = bench(ctx)
  if (!b?.log) return
  const old = ctx.world.state.qaLog ?? []
  ctx.world.state.qaLog = [...old.slice(-39), { t: ctx.now(), ...row }]
}

const r2 = (v) => Math.round(v * 100) / 100
const COL = 'oklch(0.75 0.3 330)'
// one floor segment a→b: a thin glowing bar, yaw from the engine's −Z forward
function seg(a, b, y) {
  const dx = b.x - a.x, dz = b.z - a.z, L = Math.hypot(dx, dz)
  return { feetPosition: { x: (a.x + b.x) / 2, y, z: (a.z + b.z) / 2 }, rotation: (Math.atan2(-dx, -dz) * 180) / Math.PI, primitive: { kind: 'box', width: 0.07, height: 0.03, depth: L }, material: { color: COL, emissive: COL, emissiveIntensity: 2 } }
}
const at = (c, d, along, side = 0) => ({ x: c.x + d.x * along - d.z * side, z: c.z + d.z * along + d.x * side })

// the hit geometry a cast resolves with, drawn: cone sector, fan lanes, a straight shot, a wall band, or a circle
export function drawGeom(ctx, spec, p, fwd, center) {
  if (!bench(ctx)?.draw || !spec) return
  const l = Math.hypot(fwd?.x ?? 0, fwd?.z ?? 0) || 1, f = { x: (fwd?.x ?? 0) / l, z: (fwd?.z ?? -1) / l }
  const y = (center ?? p).y + 0.06, segs = []
  if (spec.aim === 'skillshot') {
    const half = (spec.width ?? 1) / 2
    for (const d of fanDirs(f, spec)) {
      const a0 = at(p, d, 0, -half), a1 = at(p, d, 0, half), b0 = at(p, d, spec.range, -half), b1 = at(p, d, spec.range, half)
      segs.push(seg(a0, b0, y), seg(a1, b1, y), seg(b0, b1, y), seg(a0, a1, y))
    }
  } else if (spec.aim === 'area') {
    const c = center ?? p, wall = wallOf(spec)
    if (wall) {
      const k = [[-wall.w / 2, -wall.half], [-wall.w / 2, wall.half], [wall.w / 2, wall.half], [wall.w / 2, -wall.half]].map(([a, s]) => at(c, f, a, s))
      for (let i = 0; i < 4; i++) segs.push(seg(k[i], k[(i + 1) % 4], y))
    } else {
      const arc = spec.arc ?? 360, n = Math.max(8, Math.round(arc / 12)), base = Math.atan2(f.z, f.x), R = spec.radius
      const pts = Array.from({ length: n + 1 }, (_, i) => { const a = base + ((-arc / 2 + (arc * i) / n) * Math.PI) / 180; return { x: c.x + Math.cos(a) * R, z: c.z + Math.sin(a) * R } })
      for (let i = 0; i < n; i++) segs.push(seg(pts[i], pts[i + 1], y))
      if (arc < 360) segs.push(seg(c, pts[0], y), seg(c, pts[n], y))
    }
  } else return
  ctx.spawn({ feetPosition: { x: 0, y: 0, z: 0 }, lifetime: 3, audience: 'all', tags: ['qa-geom'], children: segs })
}
export const castRow = (hero, slot, p, fwd, c) => ({ k: 'cast', hero, slot, p: { x: r2(p.x), z: r2(p.z) }, fwd: { x: r2(fwd?.x ?? 0), z: r2(fwd?.z ?? 0) }, c: c ? { x: r2(c.x), z: r2(c.z) } : null })

// scripted dummy: world.state.qaCases = { caster, i, at, rows: [{ aim (deg from −Z, clockwise), along, side }] }.
// The dummy stands at rows[i] (relative to the caster's spot and the row's aim); a cast logged after it stood moves it
// to the next row 1.2 s later and clears the caster's cooldowns. Each stand is logged { k:'stand', i, pos }.
export function stepDummy(ctx, self) {
  const C = ctx.world.state.qaCases
  if (!C?.rows?.length || C.i >= C.rows.length) return
  const now = ctx.now()
  const caster = ctx.world.players.find((p) => p.id === C.caster)
  if (!caster) return
  const casts = (ctx.world.state.qaLog ?? []).filter((r) => r.k === 'cast' && r.t > (C.at ?? 0))
  if (C.at && casts.length && now - casts[casts.length - 1].t > 1200) {
    caster.state.cd = {}
    ctx.world.state.qaCases = { ...C, i: C.i + 1, at: null }
    return
  }
  if (C.at) return
  const r = C.rows[C.i], a = ((r.aim ?? 0) * Math.PI) / 180, f = { x: Math.sin(a), z: -Math.cos(a) }
  const P = C.origin ?? caster.feetPosition
  const pos = { x: P.x + f.x * r.along - f.z * (r.side ?? 0), y: P.y, z: P.z + f.z * r.along + f.x * (r.side ?? 0) }
  self.feetPosition = pos
  self.state.hp = self.state.maxHp
  ctx.world.state.qaCases = { ...C, at: now }
  qaLog(ctx, { k: 'stand', i: C.i, pos: { x: r2(pos.x), z: r2(pos.z) } })
}

// dev bench fx replay: world.state.qaBench.fx = { seq, hero, slot, evs?, d?, r?, fwd? } plays that kit's effect at the
// frozen dummy exactly as a cast would emit it (the caller hands skillFx in, so this file stays free of the fx library).
export function replayFx(ctx, self, play) {
  const R = bench(ctx)?.fx
  if (!R?.hero || R.seq === self.state.qaFxSeq) return
  self.state.qaFxSeq = R.seq
  const p = self.feetPosition, f = R.fwd ?? { x: 0, z: 1 }, d = R.d ?? 6
  const a = { x: p.x, y: p.y + 1.3, z: p.z }, b = { x: p.x + f.x * d, y: p.y + 1.1, z: p.z + f.z * d }
  for (const ev of R.evs ?? ['cast', 'fly', 'land', 'hit']) {
    const o = ev === 'fly' ? { a, b, t: R.t ?? d / 20, fwd: f } : ev === 'hit' ? { at: R.land != null ? { x: p.x + f.x * R.land, y: p.y + 1.1, z: p.z + f.z * R.land } : { x: b.x, y: b.y, z: b.z } } : ev === 'land' ? { at: { x: p.x + f.x * (R.land ?? 0), y: p.y, z: p.z + f.z * (R.land ?? 0) }, r: R.r, fwd: f } : { at: p, fwd: f }
    try { play(ctx, R.hero, R.slot, ev, o) } catch (e) { qaLog(ctx, { k: 'fxerr', hero: R.hero, slot: R.slot, ev, e: String(e).slice(0, 80) }) }
  }
}
