// doc 55 · the composer: turns one row of scripts/lib/data/vfx-heroes.yml + the hero's real numbers (heroes.yml range/width/radius)
// into the moments skillFx plays. The library draws the READABLE layer (missile body, slash, impact, area edge); the hero's own
// hand-made KIT entries ride beside it as dressing (sounds, dust, rocks), never instead of it.
import ROWS from '../data/vfx-heroes.yml'
import { HEROES } from '../heroes.js'
import { PAL } from './look.js'
const M = 'scripts/effects/vfx-missile.fx.js', I = 'scripts/effects/vfx-impact.fx.js', S = 'scripts/effects/vfx-slash.fx.js'
const yawOf = (f) => (Math.atan2(-(f?.x ?? 0), -(f?.z ?? -1)) * 180) / Math.PI
const flat = (f) => { const l = Math.hypot(f?.x ?? 0, f?.z ?? 0) || 1; return [(f?.x ?? 0) / l, (f?.z ?? -1) / l] }
let flip = false
export function libFx(hero, slot, ev) {
  const row = ROWS?.[hero]
  if (!row) return null
  const spec = HEROES.heroes?.[hero]?.[slot] ?? {}
  const sk = slot === 'lmb' ? {} : row.skills?.[slot] ?? {}
  const el = sk.el ?? row.el, motif = sk.motif ?? row.motif
  const tier = slot === 'lmb' || slot === 'passive' ? 1 : sk.tier ?? (slot === 'r' ? 3 : 2)
  if (slot === 'passive') return null
  if (slot === 'lmb') {
    const b = row.basic ?? {}
    // doc 76 B: a single-target melee basic is a SHORT trail on the weapon's path ending at the target, never a reach-sized crescent
    if (ev === 'swing' && (b.melee || b.slash)) return (o) => { flip = !flip; return [['fx', { position: meleeAt(o), script: meleeTrail(b.melee ?? 'blade', PAL[el] ?? PAL.thach, o.fwd, flip) }]] }
    if (ev === 'fly' && b.shape) return (o) => [['fx', { position: o.a, script: M, params: { el, tier, shape: b.shape, motif, v: vel(o), t: o.t, size: b.size ?? 0.26 } }]]
    if (ev === 'hit') return (o) => [['fx', { position: o.at, script: I, params: { el, tier, motif: (b.melee || b.slash) ? (row.motif === 'blood' ? 'blood' : 'spark') : motif, size: (b.melee || b.slash) ? 0.55 : 0.42 } }]]
    return null
  }
  if (ev === 'fly') {
    if (sk.shape === 'none') return null // the hero's own KIT draws this body (a dash, a rope): no missile
    // volley: n: a wide band drawn as n parallel shots side by side, together exactly the hitbox width (Nhạm Vũ's fan of arrows)
    // a fan (heroes.yml fan) is flown lane by lane by the game: one shot per call, its diameter the arrow's own collision width
    const n = spec.fan ? 1 : Math.max(1, sk.volley ?? 1), w = spec.width ?? 1, each = n > 1 ? (w / n) * 0.8 : w // the rim's diameter IS the hitbox width
    return (o) => {
      const [fx_, fz_] = flat({ x: o.b.x - o.a.x, z: o.b.z - o.a.z }), sx = -fz_, sz = fx_
      return Array.from({ length: n }, (_, i) => {
        const off = n > 1 ? (i - (n - 1) / 2) * (w / n) : 0
        return ['fx', { position: { x: o.a.x + sx * off, y: o.a.y, z: o.a.z + sz * off }, script: M, params: { el, tier, shape: sk.shape ?? 'comet', motif, v: vel(o), t: o.t, size: each } }]
      })
    }
  }
  if (ev === 'hit') return (o) => [['fx', { position: o.at, script: I, params: { el, tier, motif, size: 1 } }]]
  if (ev === 'land') {
    const r = spec.radius
    if (spec.aim === 'target') return (o) => [['fx', { position: { x: o.at.x, y: o.at.y + 1.1, z: o.at.z }, script: I, params: { el, tier, motif, size: 1.2, dir: flat(o.fwd) } }]]
    if (!r) return null
    // doc 76: a cone (heroes.yml arc) is ONE front stroke over exactly its arc; only a full circle keeps the front+back pair
    if (sk.shape === 'sweep' && spec.arc && spec.arc < 360) return (o) => [['fx', { position: { x: o.at.x, y: o.at.y + 1, z: o.at.z }, script: S, params: { el, tier, shape: spec.arc <= 190 ? 'halfsweep' : 'sweep', arc: spec.arc, yaw: yawOf(o.fwd), reach: r, motif } }]]
    if (sk.shape === 'sweep') return (o) => [['fx', { position: { x: o.at.x, y: o.at.y + 1, z: o.at.z }, script: S, params: { el, tier, shape: 'sweep', yaw: yawOf(o.fwd), reach: r, motif } }], ['fx', { position: { x: o.at.x, y: o.at.y + 1, z: o.at.z }, script: S, params: { el, tier, shape: 'sweep', yaw: yawOf(o.fwd) + 180, reach: r, motif } }]]
    return (o) => [['fx', { position: { x: o.at.x, y: (o.at.y ?? 0) + 0.3, z: o.at.z }, script: I, params: { el, tier, motif, size: 1.2, span: o.r ?? r } }]] // the wave ends on the real radius
  }
  return null
}
const vel = (o) => { const t = Math.max(0.05, o.t ?? 0.4); return [(o.b.x - o.a.x) / t, (o.b.y - o.a.y) / t, (o.b.z - o.a.z) / t] }

// ---- doc 76 B · melee basic trails: blade (diagonal cut, ~1 m), thrust (straight jab along the aim), heavy (wider, low, with grit), claw (three rakes)
const hx = (c, k = 1) => `hdr(${(c[0] * k).toFixed(2)},${(c[1] * k).toFixed(2)},${(c[2] * k).toFixed(2)})`
const meleeAt = (o) => o.to ? { x: o.to.x, y: o.to.y, z: o.to.z } : { x: o.at.x + (o.fwd?.x ?? 0) * 1.3, y: o.at.y + 1.1, z: o.at.z + (o.fwd?.z ?? -1) * 1.3 }
function meleeTrail(kind, pal, fwd, flip) {
  const [fx_, fz_] = flat(fwd), sx = -fz_, sz = fx_, sg = flip ? -1 : 1, f = (n) => n.toFixed(2)
  const edge = (len, dx, dy, dz, n, w) => `pop edge burst=${n} on=line(${f(len)},${f(dx)},${f(dy)},${f(dz)}) life=.08..0.15 size=${w} col=${hx(pal.rim, 0.7)}>${hx(pal.body)} a=1>0 sz=$size*(1>.3) r=sprite(soft-disc,add)`
  const glint = (len, dx, dy, dz, n) => `pop glint burst=${n} on=line(${f(len)},${f(dx)},${f(dy)},${f(dz)}) life=.12..0.22 v=sdir()*(.6..1.4) size=.015..0.03 acc=drag(4) col=${hx(pal.rim)} a=1>0 sz=$size r=sprite(ember,add,velocity,.03)`
  if (kind === 'thrust') return `fx\n${edge(0.9, fx_, 0.05, fz_, 22, '.035..0.055')}\n${glint(0.5, fx_, 0, fz_, 6)}`
  if (kind === 'claw') return `fx\n` + [-0.12, 0, 0.12].map((o, i) => edge(0.8, sx * sg, -0.5, sz * sg, 12, '.03..0.045').replace('pop edge', `pop rake${i}`).replace('on=line', `on=line`) + ` pos=<${f(fx_ * o)},${f(o)},${f(fz_ * o)}>`).join('\n')
  if (kind === 'heavy') return `fx\n${edge(1.3, sx * sg, -0.25 * sg, sz * sg, 34, '.05..0.08')}\n${glint(0.8, sx, 0, sz, 10)}\npop grit burst=6 life=.3..0.5 v=sdir()*(1..2)+<0,1,0> size=.03..0.05 acc=grav() col=<.35,.3,.25> a=1>0 sz=$size r=sprite(chip,alpha)`
  return `fx\n${edge(1.0, sx * sg, 0.45 * sg, sz * sg, 28, '.04..0.065')}\n${glint(0.6, sx * sg, 0.45 * sg, sz * sg, 8)}`
}
