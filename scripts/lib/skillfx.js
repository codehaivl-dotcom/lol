// Every hero's own skill effects: one table, played by the match (scripts/hero.js) and the dais demo (scripts/camera.js).
// skillFx(ctx, hero, slot, ev, o, audience): ev is the moment of the cast:
//   cast  the wind-up at the caster          o: { at (feet), fwd: {x,z}, ground? }
//   fly   a missile from a to b in t seconds  o: { a, b, t, fwd, back? }
//   land  the payoff: an area, a self cast, a blow on a chosen target   o: { at, r?, fwd }
//   hit   one unit struck                      o: { at (chest height) }
// A moment a skill does not draw falls back to the plain team-tinted bolt / ring / spark.
import { HEROES } from './heroes.js'
import BAKED from './data/skill-clips.yml' // hero → slot → [clip address, seconds]: the Blender-keyed whole-body moves
import { animate } from 'builtin/tween'
import { floorY } from './combat.js'
import { libFx } from './vfx/compose.js'
const SFX = (n) => `/cdn/moodboard-painterly-fantasy/sfx-${n}.mp3`
const n2 = (v) => (Math.round(v * 100) / 100).toString()
const V = (v) => `<${n2(v.x ?? 0)},${n2(v.y ?? 0)},${n2(v.z ?? 0)}>`
const up = (p, y) => ({ x: p.x, y: p.y + y, z: p.z })
const fwdOf = (o) => { const f = o.fwd ?? { x: 0, z: -1 }, l = Math.hypot(f.x, f.z) || 1; return { x: f.x / l, y: 0, z: f.z / l } }
const turn = (f, deg) => { const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a); return { x: f.x * c - f.z * s, y: 0, z: f.x * s + f.z * c } }
const vel = (a, b, t) => ({ x: (b.x - a.x) / t, y: (b.y - a.y) / t, z: (b.z - a.z) / t })
const yawOf = (f) => (Math.atan2(-f.x, -f.z) * 180) / Math.PI

// pieces every hero composes
const fx = (position, script) => ['fx', { position, script }]
const snd = (name, position, volume = 0.55, pitch = 1) => ['playSound', { clip: SFX(name), position, volume, pitch }]
let LK = 0.5
const Lt = (col, int, rad) => `light(${col},${n2(int * LK)},${rad})`
const flash = (col, int, rad, life = 0.3) => `pop flash burst=1 life=${life} at=point().c(.8) r=light(${col},${n2(int * LK)}*(1>0),${rad})`
const dust = (r, n, col = '<.55,.48,.38>') => `pop dust burst=${n} on=disc(${r}) life=.7..1.3 v=up(.4..1.2)+sdir()*.8 size=.3..0.6 acc=buoy(.3)+drag(1.6) sz=$size*(.6>1.8) col=${col} a=0>.12:.45>.7:.3>0 rot=spin(.2) r=sprite(smoke-puff,alpha)`
const chips = (n, sp, col = '<.5,.46,.4>', dir = '<0,1,0>') => `pop chips burst=${n} life=.6..1.1 v=${dir}*(${sp})+sdir()*(1..2.5) size=.06..0.14 spin=-9..9 acc=grav()+drag(.4) col=${col} a=1 sz=$size rot=$age*$spin floor=bounce(.3) r=sprite(chip,alpha)`
const sparks = (n, col, sp = '3..7') => `pop sparks burst=${n} life=.2..0.45 v=sdir()*(${sp}) size=.02..0.04 acc=grav()*.5+drag(1.5) sz=$size col=${col} a=1>0 r=sprite(ember,add,velocity,.03)`
const bolt = (a, b, t, core, size, trailCol, trailSprite = 'soft-disc', light = null) => {
  const v = vel(a, b, t)
  return `pop head burst=1 life=${n2(t)} v=${V(v)} sz=${n2(Math.max(0.55, size))} col=${core} a=1 r=sprite(soft-disc,add)
pop trail on=@head.lives(80) life=.25..0.45 size=${n2(size * 0.7)} sz=$size*(1>0) col=${trailCol} a=.8>0 rot=spin(.5) r=sprite(${trailSprite},add)` +
    (light ? `\npop lamp burst=1 life=${n2(t)} v=${V(v)} r=${Lt(light, 6, 5)}` : '')
}

// ---------- the six heroes ----------
const JADE = 'hdr(.7,2.6,1.3)', JADE_L = '<.45,1,.6>'
const BLOOD = 'hdr(2.6,.25,.2)', IRON = 'hdr(2.4,1.6,1)'
const VIOLET = 'hdr(1.8,.8,3.2)', MOON = 'hdr(2.4,2.2,3)', VIOLET_L = '<.75,.45,1>'
const FIRE = 'hdr(4.8,2.2,.6)', FIRE_L = '<1,.5,.18>'
const AMBER = 'hdr(3.4,2,.6)', AMBER_L = '<1,.7,.3>'
const BELL = 'hdr(2.6,1.9,.7)'   // Ngư Đăng: bronze bell glint
const MUD_C = '<.36,.27,.17>', SEED = 'hdr(1.2,3.4,1)', SEED_L = '<.55,1,.4>'   // Cốt Bện: paddy mud, rice-seedling glow
const SUN = 'hdr(4.6,3.6,1.5)', SUNW = 'hdr(4.4,4.3,3.6)', DAWN = 'hdr(4.4,1.8,.5)', SUN_L = '<1,.82,.45>'
const ROSE = 'hdr(4.4,1.9,1.5)', ROSE_L = '<1,.62,.55>', LANT = 'hdr(4.6,3.2,1.2)', LANTW = 'hdr(4.6,4.2,3.2)', LANT_L = '<1,.75,.45>'
const STORM = 'hdr(1.6,2.6,3.4)', STORM_L = '<.6,.85,1>', HEALC = 'hdr(1,2.8,1.2)'

const FLAMES = (r, rate, rise, h = 1) => `pop flame rate=flick(.45,.2)*${rate} on=disc(${r}) life=.45..0.9 v=up(${rise})+cone(20)*(.3..0.8) size=${n2(0.3 * h)}..${n2(0.6 * h)} acc=curl(.5)*1.2+buoy(2.3)+drag(1.5) sz=$size*(.5>.25:1>.7:.7>.15) col=hdr(4.8,3.6,1.5)>.3:hdr(3.4,1.5,.35)>.65:hdr(1.9,.55,.12)>hdr(.7,.14,.03) a=0>.12:1>.75:.85>0 rot=spin(.2) r=sprite(flame-wisp,add)`

const KIT = {
  moc_lam: {
    passive: {
      hit: (o) => [fx(o.at, `fx\n${chips(12, '2..4', '<.5,.46,.4>')}\n${dust(0.4, 5)}\npop jolt burst=1 life=.2 sz=.9*(.4>1.2) col=${JADE} a=.6>0 r=sprite(soft-disc,add)`), snd('stone-knuckle-heavy-thud', o.at, 0.6)],
    },
    q: {
      cast: (o) => [fx(o.at, `fx\n${dust(0.8, 10)}\npop kick burst=14 on=disc(.5) life=.4..0.7 v=<${n2(-fwdOf(o).x * 3)},2,${n2(-fwdOf(o).z * 3)}>+sdir()*1.5 size=.05..0.1 acc=grav() col=<.5,.45,.38> a=1 sz=$size floor=stick r=sprite(chip,alpha)`)],
      fly: (o) => [fx(o.a, `fx\n${bolt(o.a, o.b, o.t, JADE, 0.7, 'hdr(.5,1.8,.9)', 'soft-disc', JADE_L)}\npop rocks on=@core.lives(40) life=.6..1 v=up(1.5..3)+sdir() size=.07..0.14 spin=-8..8 acc=grav() col=<.48,.44,.38> a=1 sz=$size rot=$age*$spin floor=stick r=sprite(chip,alpha)`), snd('earth-spear-charge-rumble', o.a, 0.6)],
      hit: (o) => [fx(o.at, `fx\npop spikes burst=10 on=disc(.9).c(-1) life=1.1 v=up(5..7) size=.25..0.4 acc=drag(8) col=<.5,.47,.4> a=1>.8:1>0 sz=$size*(.3>1:1>1) r=sprite(shard,alpha,velocity,.05)\npop roots burst=18 on=disc(.8).c(-.9) life=1..1.5 v=up(1..2.5)+sdir()*.5 size=.08..0.14 acc=vortex(3)+drag(2) col=<.35,.6,.25> a=1>.7:1>0 sz=$size r=sprite(leaf,alpha)\n${flash(JADE_L, 20, 5)}`), snd('stone-root-bind-crack', o.at, 0.6)],
    },
    rmb: {
      land: (o) => [fx(o.at, `fx\npop slabs burst=8 on=disc(1.1) life=1.4 v=up(.8) size=.35..0.5 spin=-1..1 acc=vortex(2)+drag(2.5) col=<.36,.31,.24> a=0>.15:1>.8:1>0 sz=$size rot=$age*$spin r=sprite(shard,alpha)\npop veil burst=28 on=disc(1.3) life=.6..1 v=up(.5..1.1)+radial(.8) size=.04..0.08 acc=vortex(3)+drag(1.5) col=<.12,.55,.3> a=0>.2:.7>0 sz=$size r=sprite(mote,alpha)\n${dust(1.2, 8, '<.42,.36,.28>')}\n${flash(JADE_L, 3, 3, 0.3)}`), snd('mountain-shield-stone-rise', o.at, 0.6)],
    },
    e: {
      land: (o) => [
        fx(o.at, `fx\npop reeds burst=70 on=disc(1.2) life=.5..0.9 v=radial(7..10)+up(1..2) size=.12..0.22 acc=vortex(9)+drag(2.5) tint=<.75,.8,.45>..<.5,.65,.3> col=$tint a=1>.7:1>0 sz=$size r=sprite(stalk,alpha,velocity,.04)\npop gust burst=24 on=disc(1) life=.35..0.6 v=radial(9) size=.4..0.7 acc=vortex(8)+drag(3) col=hdr(.45,.95,.6) a=.35>0 sz=$size*(.5>1.5) r=sprite(soft-disc,add,velocity,.08)\n${dust(3, 14)}`),
        // A5b 2026-10-11: the engine's white 'slash' circle doubled the library sweep pair and blanked the fight; the jade sweeps are the stroke
        snd('reed-whirl-wind-spin', o.at, 0.6),
      ],
    },
    r: {
      cast: (o) => [fx(o.at, `fx\n${dust(1, 14)}\npop gather burst=40 on=sphere(2).c(1) life=.35 v=attract(14) size=.05..0.1 col=${JADE} a=1>0 sz=$size r=sprite(mote,add)`), snd('earth-leap-heavy-whoosh', o.at, 0.6)],
      land: (o) => [
        fx(o.at, `fx\npop vein burst=36 on=disc(.3) life=.6..1 v=radial(9..14) size=.15..0.28 acc=drag(6) col=${JADE} a=1>.6:1>0 sz=$size r=sprite(ember,add,velocity,.06)\n${chips(28, '4..8')}\n${dust(2.5, 22)}\npop pillar burst=20 on=disc(.5) life=.6..1 v=up(8..12) size=.3..0.6 acc=drag(3) col=${JADE} a=.5>0 sz=$size r=sprite(soft-disc,add,velocity,.08)\npop dome burst=60 on=sphere(3.5) life=1.4..2 v=sdir()*.2 size=.04..0.08 col=hdr(.5,1.8,1.4) a=0>.2:.8>.7:.6>0 sz=$size r=sprite(mote,add)\n${flash(JADE_L, 12, 9, 0.4)}`),
        ['shockwave', { position: o.at, speed: 18, thickness: 1.5, intensity: 0.8 }],
        ['screenShake', { intensity: 0.4, duration: 0.3 }],
        snd('earth-vein-slam-impact', o.at, 0.8),
      ],
      // doc 78 R3 #6: the ally shield's reach (heroes.yml r.shield.radius) rises as a jade wall of motes on its rim; shapeOf draws the ring
      ward: (o) => [fx(o.at, `fx\npop rim burst=${Math.round((o.r ?? 6) * 14)} on=disc(${n2(o.r ?? 6)}).c(.1) life=.7..1.1 v=up(1.5..3) size=.06..0.12 acc=drag(1.5) sz=$size*(1>.4) col=${JADE} a=0>.15:1>.7:.8>0 r=sprite(ember,add,velocity,.06)\npop slabs burst=10 on=disc(${n2(o.r ?? 6)}).c(.05) life=.9 v=up(.6) size=.3..0.45 spin=-1..1 acc=drag(2) col=<.36,.31,.24> a=0>.15:1>.7:1>0 sz=$size rot=$age*$spin r=sprite(shard,alpha)`)],
      // on each ally who takes the shield: a jade shell closing round the body
      gift: (o) => [fx(o.at, `fx\npop shell burst=30 on=sphere(1.1).c(1) life=.6..0.9 v=attract(3) size=.05..0.09 col=hdr(.5,1.8,1.2) a=0>.2:1>.7:.8>0 sz=$size r=sprite(mote,add)\npop slab burst=6 on=disc(.7).c(.3) life=.8 v=up(1.2) size=.25..0.35 spin=-2..2 acc=drag(2.5) col=<.36,.31,.24> a=0>.2:1>0 sz=$size rot=$age*$spin r=sprite(shard,alpha)\npop glow burst=1 life=.5 at=point().c(1) sz=1.6*(.6>1.1) col=${JADE} a=.4>0 r=sprite(soft-disc,add)`), snd('jade-shield-shell-closing-stone-chime', o.at, 0.45)],
    },
  },

  kha_tan: {
    passive: {
      hit: (o) => [fx(o.at, `fx\npop blood burst=10 life=.4..0.8 v=sdir()*(1.5..3)+up(1) size=.05..0.1 acc=grav() col=<.55,.04,.05> a=1 sz=$size floor=stick r=sprite(droplet,alpha,velocity,.02)\npop tally burst=1 life=.5 sz=.6*(.4>1) col=${BLOOD} a=.9>0 r=sprite(soft-disc,add)`)],
    },
    q: {
      land: (o) => {
        const f = fwdOf(o)
        return [
          // doc 76: the stroke itself is the library's 180° sweep at the real 4.5 m (vfx-heroes q.shape sweep + heroes.yml arc)
          fx(up(o.at, 1), `fx\npop arc burst=60 on=arc() life=.3..0.5 v=<${n2(f.x * 9)},0,${n2(f.z * 9)}>+sdir()*3 size=.03..0.06 acc=drag(3) col=${IRON} a=1>0 sz=$size r=sprite(ember,add,velocity,.04)\npop blood burst=22 life=.5..0.9 v=<${n2(f.x * 5)},2,${n2(f.z * 5)}>+sdir()*2.5 size=.05..0.11 acc=grav() col=<.5,.03,.04> a=1 sz=$size floor=stick r=sprite(droplet,alpha,velocity,.02)\npop drink burst=20 on=sphere(2.5) life=.5..0.8 v=attract(6) size=.05..0.1 col=${BLOOD} a=0>.3:1>0 sz=$size r=sprite(mote,add)\n${flash('<1,.3,.25>', 8, 6)}`), // A5b: 20 lit the pale floor white across the whole fan
          snd('heavy-scythe-axe-reap', o.at, 0.7),
        ]
      },
    },
    rmb: {
      cast: (o) => [fx(o.at, `fx\npop streak burst=24 on=disc(.4).c(1) life=.25..0.4 v=<${n2(fwdOf(o).x * 12)},0,${n2(fwdOf(o).z * 12)}>+sdir() size=.04..0.07 col=${IRON} a=1>0 sz=$size r=sprite(ember,add,velocity,.05)\n${dust(0.5, 6)}`)],
      land: (o) => [['slash', { position: up(o.at, 0.6), size: 2.4, shape: 'crescent' }], fx(up(o.at, 0.5), `fx\n${sparks(24, IRON, '4..8')}\npop blood burst=14 life=.4..0.7 v=sdir()*(2..4) size=.05..0.09 acc=grav() col=<.55,.04,.05> a=1 sz=$size floor=stick r=sprite(droplet,alpha,velocity,.02)`), snd('blade-tendon-slash', o.at, 0.6)],
    },
    e: {
      cast: (o) => [snd('iron-chain-rattle-throw', o.at, 0.6)],
      fly: (o) => [fx(o.a, `fx\npop hook burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.45 col=${IRON} a=1 r=sprite(shard,add)\npop links on=@hook.lives(55) life=${n2(o.t + 0.25)} size=.12..0.16 spin=-3..3 col=<.4,.38,.36> a=1>.8:1>0 sz=$size rot=$age*$spin r=sprite(chip,alpha)\npop glint on=@hook.lives(20) life=.2 size=.05 sz=$size col=${IRON} a=1>0 r=sprite(ember,add)`)],
      hit: (o) => [fx(o.at, `fx\n${sparks(30, IRON, '3..8')}\npop jolt burst=1 life=.2 sz=1.1*(.5>1.3) col=${IRON} a=1>0 r=sprite(soft-disc,add)`), snd('chain-hook-yank-metal', o.at, 0.7)],
    },
    r: {
      cast: (o) => [fx(o.at, `fx\npop debt burst=50 on=sphere(3).c(1) life=.3 v=attract(14) size=.05..0.1 col=${BLOOD} a=1>0 sz=$size r=sprite(mote,add)\npop pool burst=1 life=.6 at=point().c(.04) sz=2.6*(.3>1) col=<.25,0,0> a=.7>0 r=sprite(soft-disc,alpha,full,0)`), snd('dark-debt-execution-charge', o.at, 0.6)],
      land: (o) => [
        ['slash', { position: up(o.at, 1.2), size: 3.6, shape: 'crescent' }],
        fx(up(o.at, 1), `fx\npop cleave burst=1 life=.3 sz=3*(.3>1) asp=.06 col=hdr(2.6,.4,.3) a=.9>0 r=sprite(soft-disc,add,full,0)\npop blood burst=40 life=.6..1.1 v=sdir()*(3..6)+up(2) size=.06..0.14 acc=grav() col=<.5,.02,.03> a=1 sz=$size floor=stick r=sprite(droplet,alpha,velocity,.02)\n${sparks(30, BLOOD, '5..10')}\n${flash('<1,.15,.1>', 50, 9, 0.4)}`),
        ['screenShake', { intensity: 0.35, duration: 0.25 }],
        snd('final-debt-execution-cleave', o.at, 0.8),
      ],
    },
  },

  mi_dang: {
    passive: {
      hit: (o) => [fx(o.at, `fx\npop wick burst=12 life=.4..0.8 v=up(1..2)+sdir()*1.2 size=.12..0.22 acc=buoy(1) sz=$size*(1>.2) col=${VIOLET} a=1>0 r=sprite(flame-wisp,add)\n${sparks(12, VIOLET)}`)],
    },
    q: {
      fly: (o) => [fx(o.a, `fx\npop lantern burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.55*flick(6,.15) col=hdr(3,1.8,3.4) a=1 r=sprite(soft-disc,add)\npop flame on=@lantern.lives(50) life=.3..0.6 v=up(1)+sdir()*.4 size=.15..0.28 acc=buoy(1.5) sz=$size*(1>.2) col=${VIOLET} a=.9>0 rot=spin(.3) r=sprite(flame-wisp,add)\npop motes on=@lantern.lives(25) life=.6..1 v=sdir()*.4 size=.03..0.05 col=${MOON} a=1>0 sz=$size r=sprite(mote,add)\npop lamp burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} r=${Lt(VIOLET_L, 8, 6)}`), snd(o.back ? 'lantern-return-chime' : 'lantern-throw-whoosh-chime', o.a, 0.5)],
      hit: (o) => [fx(o.at, `fx\npop burst burst=20 life=.3..0.6 v=sdir()*(2..4) size=.1..0.2 acc=drag(2) sz=$size*(1>0) col=${VIOLET} a=1>0 r=sprite(flame-wisp,add)\n${sparks(10, MOON)}`)],
    },
    rmb: {
      cast: (o) => [fx(o.at, `fx\npop veil burst=16 on=disc(.5).c(1) life=.5..0.9 v=sdir()*.6 size=.4..0.7 acc=drag(2) sz=$size*(.6>1.5) col=<.35,.22,.5> a=.5>0 r=sprite(smoke-puff,alpha)`)],
      land: (o) => [['slash', { position: up(o.at, 1.1), size: 2.8, shape: 'crescent' }], fx(up(o.at, 1), `fx\npop moon burst=1 life=.35 sz=1.6*(.3>1) col=${MOON} a=.6>0 r=sprite(soft-disc,add)\npop petals burst=24 life=.8..1.4 v=sdir()*(2..4) size=.08..0.14 spin=-6..6 acc=grav()*.2+drag(2) col=hdr(1.6,1.2,2.4) a=1>.6:1>0 sz=$size rot=$age*$spin r=sprite(petal,alpha)\n${flash(VIOLET_L, 20, 6)}`), snd('moon-blade-silver-slash', o.at, 0.6)],
    },
    e: {
      fly: (o) => [fx(o.a, `fx\npop call burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.45*flick(4,.2) col=hdr(3.2,1.2,2.4) a=1 r=sprite(flame-wisp,add)\npop petals on=@call.lives(40) life=.6..1 v=sdir()*.6 size=.06..0.1 spin=-5..5 acc=drag(1) col=hdr(2.2,1,1.8) a=1>0 sz=$size rot=$age*$spin r=sprite(petal,add)`), snd('beckoning-flame-whisper', o.a, 0.5)],
      hit: (o) => [fx(o.at, `fx\npop charm burst=26 on=disc(.9) life=1.1 v=up(.6) size=.07..0.12 acc=vortex(6) col=hdr(2.6,1.1,2.2) a=0>.2:1>.8:1>0 sz=$size r=sprite(petal,add)\npop heart burst=1 life=1.1 at=point().c(1.6) sz=.5*(.6>1:1>.8) col=hdr(3,1,2) a=1>.7:1>0 r=sprite(soft-disc,add)\n${flash('<1,.45,.8>', 14, 5, 0.8)}`)],
    },
    r: {
      // doc 78 R3 #5: the blink cue is hero-sfx.yml r (played on the press); the cast draws only the veil, no second sound
      cast: (o) => [fx(o.at, `fx\npop veil burst=30 on=disc(.8).c(1) life=.6..1.1 v=sdir()*.8 size=.5..0.9 acc=drag(2) sz=$size*(.6>1.6) col=<.3,.18,.45> a=.6>0 r=sprite(smoke-puff,alpha)\npop ghosts burst=12 on=disc(.4).c(1) life=.6 v=sdir()*2 size=.25..0.4 col=hdr(1.2,.6,2) a=.35>0 sz=$size r=sprite(soft-disc,add)`)],
      // doc 78 R3 #4–5: one land per dash beat (o.beat 0/1/2 = hits at 0.12/0.52/0.92 s); each its own stroke and cue, the third the heaviest
      land: (o) => {
        const b = Math.min(2, o.beat ?? 0), at = up(o.at, 1.1)
        if (b < 2) return [
          ['slash', { position: at, size: b ? 2.4 : 2.6, shape: 'crescent' }],
          fx(up(o.at, 1), `fx\npop puff burst=${b ? 8 : 12} life=.5..0.8 v=sdir()*1 size=.4..0.7 acc=drag(2) sz=$size*(.6>1.6) col=<.3,.18,.45> a=.6>0 r=sprite(smoke-puff,alpha)\npop ghost burst=1 life=.3 sz=${b ? 1.3 : 1.1}*(.5>1.2) col=${b ? MOON : VIOLET} a=.55>0 r=sprite(soft-disc,add)\n${sparks(b ? 22 : 16, b ? MOON : VIOLET, '4..8')}\n${flash(VIOLET_L, 14, 4, 0.18)}`),
          snd('shadow-blink-dagger-cut-quick-swish', o.at, 0.5, b ? 1.12 : 1),
        ]
        return [
          ['slash', { position: at, size: 3.4, shape: 'crescent' }],
          fx(up(o.at, 1), `fx\npop cross burst=2 life=.32 at=point() size=2.6 rot=.785..2.356 sz=$size*(.4>1.15) col=${MOON} a=1>.4:.8>0 r=sprite(soft-disc,add,velocity,.0)\npop petals burst=26 life=.6..1.1 v=sdir()*(3..6) size=.08..0.14 spin=-7..7 acc=grav()*.2+drag(2) col=hdr(1.6,1.1,2.6) a=1>.6:1>0 sz=$size rot=$age*$spin r=sprite(petal,alpha)\npop flames burst=16 life=.4..0.7 v=up(1.5)+sdir()*2 size=.2..0.35 acc=buoy(1.2)+drag(2) sz=$size*(1>.2) col=${VIOLET} a=.9>0 r=sprite(flame-wisp,add)\n${sparks(28, MOON, '5..10')}\n${flash(VIOLET_L, 26, 6, 0.24)}`),
          ['shockwave', { position: up(o.at, 0.6), speed: 12, thickness: 0.6, intensity: 0.35 }],
          ['screenShake', { intensity: 0.22, duration: 0.16 }],
          snd('shadow-dagger-finishing-cross-slash-heavy-ghost-flame-burst', o.at, 0.7),
        ]
      },
    },
  },

  hoa_tuy: {
    passive: {
      hit: (o) => [fx(o.at, `fx\n${FLAMES(0.3, 40, '1..2', 0.5).replace('rate=flick(.45,.2)*40', 'burst=10')}\npop embers burst=10 life=.5..1 v=up(2)+sdir() size=.02..0.04 acc=grav()*.4 col=${FIRE} a=1>0 sz=$size r=sprite(ember,add,velocity,.02)`)],
    },
    q: {
      land: (o) => {
        const R = Math.min(2.6, o.r ?? 2.6)
        return [
          fx(o.at, `fx\npop column burst=70 on=disc(${n2(R * 0.55)}) life=.5..0.9 v=up(7..11)+cone(10)*.6 size=.5..0.9 acc=curl(.6)+drag(1.2) sz=$size*(.5>.25:1>.7:.7>.2) col=hdr(5,3.6,1.5)>.3:hdr(3.6,1.4,.3)>.65:hdr(1.6,.4,.1)>hdr(.5,.1,.02) a=0>.08:1>.7:.8>0 rot=spin(.3) r=sprite(flame-wisp,add)\npop embers burst=40 on=disc(${n2(R * 0.6)}) life=.8..1.5 v=up(6..10)+sdir()*1.5 size=.02..0.05 acc=grav()*.5+curl(.6) col=${FIRE} a=1>0 sz=$size r=sprite(ember,add,velocity,.03)\npop smoke on=@column?.2 inh=p;v:$v*.3 life=1.2..2 size=.5..0.8 acc=buoy(.8)+drag(.8) sz=$size*(.7>2.4) col=<.25,.2,.18> a=0>.2:.35>.7:.2>0 rot=spin(.15) r=sprite(smoke-puff,alpha)\n${chips(12, '3..6', '<.25,.2,.18>')}\n${flash(FIRE_L, 70, 12, 0.6)}`),
          ['shockwave', { position: o.at, speed: 10, thickness: 0.8, intensity: 0.5 }],
          snd('fire-pillar-eruption-roar', o.at, 0.75),
        ]
      },
    },
    rmb: {
      fly: (o) => [fx(o.a, `fx\n${bolt(o.a, o.b, o.t, 'hdr(5,2.6,.8)', 0.5, FIRE, 'flame-wisp', FIRE_L)}\npop smoke on=@core.lives(30) life=.5..0.9 v=up(.4) size=.2..0.3 acc=buoy(.5) sz=$size*(.7>2) col=<.32,.28,.26> a=.4>0 r=sprite(smoke-puff,alpha)`), snd('coal-shot-fire-whoosh', o.a, 0.5)],
      hit: (o) => [fx(o.at, `fx\npop brand burst=14 on=disc(.6) life=1.2 size=.06..0.1 acc=vortex(4) col=${FIRE} a=0>.15:1>.8:1>0 sz=$size*flick(5,.3) r=sprite(ember,add)\npop burst burst=16 life=.3..0.6 v=sdir()*(2..4) size=.15..0.3 acc=drag(2) sz=$size*(1>0) col=${FIRE} a=1>0 r=sprite(flame-wisp,add)\n${flash(FIRE_L, 18, 4)}`), snd('ember-brand-sizzle', o.at, 0.5)],
    },
    e: {
      land: (o) => [
        fx(o.at, `fx\npop wave burst=90 on=disc(.6) life=.35..0.55 v=radial(9..12)+up(.5) size=.3..0.55 acc=drag(3) sz=$size*(.5>1:1>.3) col=hdr(4.4,2,.5)>hdr(1.4,.3,.05) a=1>0 rot=spin(.3) r=sprite(flame-wisp,add)\npop haze burst=14 on=disc(2) life=.6 v=radial(4) size=1.2..1.8 col=<.006,.006,0> a=.8>0 sz=$size r=sprite(soft-disc,distort)\n${dust(3, 12, '<.4,.32,.26>')}\n${flash(FIRE_L, 40, 9, 0.4)}`),
        ['shockwave', { position: up(o.at, 1), speed: 14, thickness: 1, intensity: 0.5 }],
        snd('heat-pulse-fire-blast', o.at, 0.65),
      ],
    },
    r: {
      cast: (o) => {
        const g = o.ground ?? o.at, top = { x: g.x - 6, y: g.y + 24, z: g.z - 4 }
        return [['body', { kind: 'meteor', scale: 1.4, a: top, b: { x: g.x, y: g.y + 0.6, z: g.z }, t: 1.25 }], snd('meteor-falling-roar', g, 0.7)]
      },
      land: (o) => [
        fx(o.at, `fx\npop blast burst=120 on=disc(1) life=.4..0.9 v=radial(6..12)+up(2..6) size=.6..1.1 acc=drag(2.5)+buoy(1) sz=$size*(.5>1.4:1>.4) col=hdr(2.8,1.5,.45)>.3:hdr(2.2,.8,.16)>hdr(.8,.18,.04) a=.85>.6:.85>0 rot=spin(.3) r=sprite(flame-wisp,add)\n${chips(40, '6..11', '<.22,.18,.16>')}\npop smoke burst=24 on=disc(2) life=1.6..2.6 v=up(1..3)+sdir() size=.9..1.4 acc=buoy(.5)+drag(.8) sz=$size*(.7>2.6) col=<.32,.28,.26> a=0>.1:.5>.7:.3>0 rot=spin(.12) r=sprite(smoke-puff,alpha)\npop embers burst=60 on=disc(3) life=1..2 v=up(4..9)+sdir()*2 size=.02..0.05 acc=grav()*.5+curl(.5) col=${FIRE} a=1>0 sz=$size r=sprite(ember,add,velocity,.03)\npop scorch burst=1 life=3 at=point().c(.05) sz=7 col=hdr(2,.6,.1)>hdr(.3,.05,0) a=.8>0 r=sprite(soft-disc,add)\n${flash(FIRE_L, 70, 18, 0.5)}`),
        ['shockwave', { position: up(o.at, 0.5), speed: 22, thickness: 2, intensity: 1 }],
        ['screenShake', { intensity: 0.6, duration: 0.4 }],
        snd('meteor-impact-explosion-huge', o.at, 0.9),
      ],
    },
  },

  nham_vu: {
    passive: {
      hit: (o) => [fx(o.at, `fx\n${chips(14, '2..5', '<.85,.6,.25>')}\npop amber burst=1 life=.3 sz=1*(.4>1.2) col=${AMBER} a=.9>0 r=sprite(soft-disc,add)`), snd('pebble-heavy-crack', o.at, 0.5)],
    },
    q: {
      fly: (o) => {
        // doc 76 fan projectiles: the game calls this once per arrow lane (o.a → o.b on that lane's own heading); one arrow each
        return [fx(o.a, `fx\n${bolt(o.a, o.b, o.t, AMBER, 0.28, 'hdr(1.8,1.1,.4)', 'ember')}\npop grit on=@core.lives(30) life=.4..0.7 v=sdir()*.5 size=.03..0.05 acc=grav()*.6 col=<.6,.48,.3> a=1>0 sz=$size r=sprite(grain,alpha)`)]
          .concat(o.lane ? [] : [snd('stone-fan-triple-arrow', o.a, 0.55)])
      },
      hit: (o) => [fx(o.at, `fx\n${chips(10, '2..4', '<.75,.55,.3>')}\n${sparks(8, AMBER)}`)],
    },
    rmb: {
      cast: (o) => [fx(up(o.at, 1.3), `fx\npop draw burst=50 on=sphere(1.6) life=.55 v=attract(4) size=.04..0.08 col=${AMBER} a=0>.5:1>0 sz=$size r=sprite(mote,add)\npop bow burst=1 life=.6 at=point() sz=.1>.35 col=${AMBER} a=.3>.9:1>0 r=sprite(soft-disc,add)\npop lamp burst=1 life=.6 r=light(${AMBER_L},${n2(6 * LK)}*(0>1),5)`), snd('amber-bow-charge-hum', o.at, 0.55)],
      fly: (o) => [fx(o.a, `fx\n${bolt(o.a, o.b, o.t, 'hdr(5,3,1)', 0.6, AMBER, 'soft-disc', AMBER_L)}\npop streak on=@core.lives(90) life=.5 size=.15 sz=$size*(1>0) col=hdr(2.4,1.5,.4) a=.7>0 r=sprite(ember,add)`), snd('amber-arrow-release-crack', o.a, 0.6)],
      hit: (o) => [fx(o.at, `fx\npop shards burst=22 life=.4..0.8 v=sdir()*(3..6) size=.06..0.12 spin=-8..8 acc=grav()*.7 col=hdr(2.4,1.4,.4) a=1>0 sz=$size rot=$age*$spin r=sprite(shard,add)\npop resin burst=10 on=disc(.5) life=2 size=.05..0.08 col=${AMBER} a=0>.1:1>.8:1>0 sz=$size r=sprite(mote,add)\n${flash(AMBER_L, 22, 5)}`), snd('amber-shatter-impact', o.at, 0.6)],
    },
    e: {
      land: (o) => [fx(o.at, `fx\npop feathers burst=34 on=disc(.6).c(1) life=1..1.8 v=sdir()*(2..4)+up(2) size=.1..0.18 spin=-4..4 acc=grav()*.15+drag(1.5)+curl(.6) tint=<1,.95,.85>..<.95,.75,.45> col=$tint a=1>.7:1>0 sz=$size rot=$age*$spin r=sprite(leaf,alpha)\npop wing burst=2 life=.5 at=point().c(1.4) sz=1.6*(.4>1.3) col=${AMBER} a=.6>0 r=sprite(soft-disc,add)\npop wind burst=16 on=disc(.8) life=.3..0.5 v=<${n2(-fwdOf(o).x * 8)},0.5,${n2(-fwdOf(o).z * 8)}>+sdir() size=.3..0.5 acc=drag(3) col=hdr(1.4,1.3,1.1) a=.4>0 sz=$size r=sprite(soft-disc,add,velocity,.06)\n${dust(0.8, 8)}`), snd('bird-wings-burst-takeoff', o.at, 0.6)],
    },
    r: {
      cast: (o) => [fx(o.at, `fx\n${dust(1.2, 16)}\n${chips(14, '2..4')}`), snd('cliff-leap-back-grunt-whoosh', o.at, 0.55)],
      fly: (o) => [fx(o.a, `fx\n${bolt(o.a, o.b, o.t, 'hdr(5.5,3.6,1.4)', 1.1, AMBER, 'soft-disc', AMBER_L)}\npop rubble on=@core.lives(60) life=.6..1.1 v=sdir()*(1..3)+up(1) size=.08..0.16 spin=-8..8 acc=grav() col=<.55,.45,.32> a=1 sz=$size rot=$age*$spin floor=stick r=sprite(chip,alpha)\npop wake on=@core.lives(70) life=.4..0.7 v=sdir()*.6 size=.6..1 acc=drag(2) sz=$size*(.6>1.6) col=<.5,.42,.32> a=.35>0 r=sprite(smoke-puff,alpha)`), ['screenShake', { intensity: 0.25, duration: 0.2 }], snd('cliff-spear-launch-boom', o.a, 0.8)],
      hit: (o) => [fx(o.at, `fx\n${chips(26, '4..8', '<.7,.52,.3>')}\n${sparks(20, AMBER, '5..10')}\n${flash(AMBER_L, 40, 7)}`), snd('amber-shatter-impact', o.at, 0.7, 0.8)],
    },
  },

  van_dao: {
    passive: {
      hit: (o) => [fx(o.at, `fx\n${sparks(16, 'hdr(2.4,3,4)', '4..9')}\npop arc burst=1 life=.15 sz=1.2 col=hdr(2,2.6,4) a=1>0 r=sprite(soft-disc,add)\n${flash(STORM_L, 25, 5, 0.15)}`), snd('storm-spark-zap', o.at, 0.5)],
    },
    q: {
      land: (o) => {
        const R = o.r ?? 4
        return [
          fx(o.at, `fx\npop cloud burst=22 on=disc(${n2(R * 0.8)}).c(4.5) life=1.2..1.6 v=sdir()*.3 size=1.4..2.2 acc=drag(1) sz=$size*(.6>1.2) col=<.25,.3,.4> a=0>.15:.7>.75:.6>0 rot=spin(.1) r=sprite(smoke-puff,alpha)\npop rain burst=120 on=disc(${n2(R * 0.85)}).c(4) delay=.15 life=.4..0.6 v=<0,-12,0> size=.02 sz=$size col=hdr(1.4,1.8,2.4) a=.6 r=sprite(droplet,add,velocity,.04)\npop strike burst=1 delay=.2 life=.18 at=point().c(2.2) sz=.9 asp=4 col=hdr(3,3.6,5) a=1>0 r=sprite(soft-disc,add,full,0)\npop mend burst=30 on=disc(${n2(R * 0.7)}) delay=.3 life=.8..1.3 v=up(1.2..2.4) size=.05..0.09 col=${HEALC} a=0>.2:1>0 sz=$size r=sprite(mote,add)\npop bolt burst=1 delay=.2 life=.25 at=point().c(3) r=light(<.7,.85,1>,${n2(60 * LK)}*(1>0),${n2(R * 3)})`),
          snd('gathering-storm-thunder-crack', o.at, 0.7),
        ]
      },
    },
    rmb: {
      fly: (o) => [fx(o.a, `fx\npop seal burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.6 col=${STORM} a=1 r=sprite(soft-disc,add)\npop gust on=@seal.lives(70) life=.35..0.6 v=sdir()*1.2 size=.12..0.2 acc=vortex(10)+drag(2) col=hdr(1.4,2,2.6) a=.8>0 sz=$size r=sprite(soft-disc,add,velocity,.05)\npop leaf on=@seal.lives(14) life=.6..1 v=sdir()*1.5 size=.07..0.11 spin=-6..6 acc=drag(1.5) col=<.6,.75,.6> a=1>0 sz=$size rot=$age*$spin r=sprite(leaf,alpha)`), snd('wind-seal-whistle-cast', o.a, 0.5)],
      hit: (o) => [fx({ x: o.at.x, y: o.at.y - 1, z: o.at.z }, `fx\npop bind burst=36 on=disc(.8) life=1.5 v=up(.4) size=.08..0.14 acc=vortex(9) col=${STORM} a=0>.1:1>.85:1>0 sz=$size r=sprite(soft-disc,add,velocity,.06)\npop rune burst=1 life=1.5 at=point().c(.05) sz=2 col=hdr(1,1.6,2.4) a=0>.1:.6>.8:.6>0 r=sprite(soft-disc,add)\n${flash(STORM_L, 16, 4, 0.5)}`), snd('wind-bind-lock', o.at, 0.5)],
    },
    e: {
      land: (o) => [
        fx(o.at, `fx\npop mantle burst=70 on=disc(1) life=.8..1.4 v=up(1..2.5) size=.08..0.14 acc=vortex(10)+drag(1) col=${STORM} a=0>.15:1>0 sz=$size r=sprite(soft-disc,add,velocity,.05)\npop leaves burst=24 on=disc(1.2) life=.8..1.4 v=up(1..2)+radial(2) size=.08..0.13 spin=-6..6 acc=vortex(7)+drag(1.2) col=<.55,.72,.5> a=1>0 sz=$size rot=$age*$spin r=sprite(leaf,alpha)\npop push burst=40 on=disc(.6) life=.3..0.5 v=radial(10) size=.3..0.5 acc=drag(3) col=hdr(1.2,1.6,2) a=.5>0 sz=$size r=sprite(soft-disc,add,velocity,.06)\n${flash(STORM_L, 22, 6, 0.6)}`),
        ['shockwave', { position: up(o.at, 1), speed: 10, thickness: 0.6, intensity: 0.35 }],
        snd('storm-mantle-wind-wrap', o.at, 0.6),
      ],
    },
    r: {
      cast: (o) => [fx(up(o.at, 1), `fx\npop pull burst=60 on=sphere(4) life=.3 v=attract(18) size=.05..0.1 col=${STORM} a=1>0 sz=$size r=sprite(mote,add)`)],
      land: (o) => [
        fx(o.at, `fx\npop shear burst=90 on=disc(.8) life=.4..0.65 v=radial(12..16)+up(.2..0.6) size=.18..0.34 acc=drag(2.5) col=hdr(.7,1,1.4) a=.6>0 sz=$size r=sprite(soft-disc,add,velocity,.08)\npop leaves burst=50 on=disc(1.5) life=1..1.6 v=radial(8..12)+up(2) size=.08..0.14 spin=-8..8 acc=drag(1.8)+curl(.6) col=<.55,.72,.5> a=1>0 sz=$size rot=$age*$spin r=sprite(leaf,alpha)\n${dust(5, 24, '<.6,.6,.62>')}\npop mend burst=60 on=disc(5) delay=.2 life=1..1.6 v=up(1.5..3) size=.06..0.1 col=${HEALC} a=0>.2:1>0 sz=$size r=sprite(mote,add)\n${flash(STORM_L, 30, 10, 0.4)}`),
        ['shockwave', { position: up(o.at, 1), speed: 20, thickness: 1, intensity: 0.5 }],
        ['screenShake', { intensity: 0.4, duration: 0.3 }],
        snd('wind-shear-gale-blast', o.at, 0.8),
      ],
    },
  },
  // Hạo Nhật · Khiên Bình Minh (doc 03 §3, heroes.yml hao_nhat). Light of dawn: white-gold core, orange edge, nothing solid.
  hao_nhat: {
    // Ánh Thệ: the basic after a shield burns with sunlight (+ slow): a sun-flare on the struck body, cinders lifting off it
    passive: {
      hit: (o) => [fx(o.at, `fx\npop flare burst=1 life=.28 sz=1.5*(.4>1) col=${SUNW} a=.9>0 r=sprite(soft-disc,add)\npop burn burst=18 on=sphere(.35) life=.5..0.9 v=up(1..2)+sdir()*.6 size=.12..0.24 acc=buoy(1.4)+drag(1.2) sz=$size*(1>.3) col=${SUN}>${DAWN} a=0>.1:1>0 rot=spin(.4) r=sprite(flame-wisp,add)\n${sparks(12, SUN, '3..6')}\n${flash(SUN_L, 22, 5, 0.25)}`)],
    },
    lmb: { hit: (o) => [snd('steel-blade-strike-on-armor-bright-clang', o.at, 0.4)] },
    // Xông Khiên: a 1.6 m skillshot DASH: the shield face of light leads him down the line, the ground scrapes under it, the first hero is stunned
    q: {
      cast: (o) => [fx(o.at, `fx\n${dust(0.6, 7)}`), fx(handOf(o, 1.2, 0.5), `fx\npop face burst=1 life=.18 sz=.6>1.4 col=${SUN} a=0>.3:.8>0 r=sprite(soft-disc,add)`)],
      fly: (o) => {
        const v = V(vel(o.a, o.b, o.t)), w = 1.6, g = { x: o.a.x, y: o.a.y - 1.3, z: o.a.z }
        return [
          fx(o.a, `fx\npop headface burst=1 life=${n2(o.t)} v=${v} sz=${n2(w * 0.95)} col=${SUN} a=.55 r=sprite(soft-disc,add)\npop headcore burst=1 life=${n2(o.t)} v=${v} sz=.55 col=${SUNW} a=.9 r=sprite(soft-disc,add)\npop wake on=@headface.lives(90) life=.25..0.45 v=sdir()*.4 size=.25..0.5 acc=drag(3) sz=$size*(1>.2) col=${SUN}>${DAWN} a=.7>0 rot=spin(.6) r=sprite(flame-wisp,add)\npop lamp burst=1 life=${n2(o.t)} v=${v} r=${Lt(SUN_L, 7, 6)}`),
          fx(g, `fx\npop skid burst=1 life=${n2(o.t)} v=${v} a=0 sz=.1 r=sprite(soft-disc,add)\npop scrape on=@skid.lives(50) life=.25..0.5 v=up(1..2.5)+sdir()*1.5 size=.02..0.05 acc=grav()+drag(1) sz=$size col=${SUN} a=1>0 r=sprite(ember,add,velocity,.03)\npop dust on=@skid.lives(16) life=.7..1.1 v=up(.3..0.8)+sdir()*.4 size=.3..0.55 acc=buoy(.3)+drag(1.6) sz=$size*(.6>1.8) col=<.6,.53,.42> a=0>.12:.4>.7:.25>0 rot=spin(.2) r=sprite(smoke-puff,alpha)`),
        ]
      },
      hit: (o) => [fx(o.at, `fx\npop bash burst=1 life=.2 sz=2*(.3>1) col=${SUNW} a=.9>0 r=sprite(soft-disc,add)\npop ring burst=40 on=disc(.2) life=.3..0.4 v=radial(6..8) size=.08..0.14 acc=drag(4) sz=$size col=${SUN} a=1>0 r=sprite(ember,add,velocity,.05)\n${chips(6, '1..2', '<.6,.5,.35>')}\n${flash(SUN_L, 30, 6, 0.2)}`), ['cameraPunch', { direction: { x: 0, y: 0, z: -1 }, intensity: 0.15 }]],
    },
    // Vỡ Nắng: land without r = the shield rises (3 s); land with r = it breaks or runs out and bursts once, edge on the real 4 m
    rmb: {
      land: (o) => {
        if (!o.r) return [fx(o.at, `fx\npop shell burst=46 on=sphere(1.1).c(1.1) life=.6..1 v=up(.3..0.8) size=.05..0.1 acc=drag(1.5) sz=$size col=${SUN} a=0>.2:1>0 r=sprite(mote,add)\npop glow burst=1 at=point().c(1.1) life=.5 sz=2.4*(.5>1) col=${SUN} a=0>.2:.35>0 r=sprite(soft-disc,add)\n${flash(SUN_L, 14, 5, 0.5)}`)]
        const r = o.r, sp = n2(r / 0.42)
        return [
          fx(o.at, `fx\npop core burst=1 at=point().c(1.1) life=.3 sz=2.6*(.3>1) col=${SUNW} a=1>0 r=sprite(soft-disc,add)\npop shatter burst=50 on=sphere(.8).c(1.1) life=.35..0.55 v=sdir()*(6..10) size=.04..0.09 acc=drag(1.5) sz=$size col=${SUN} a=1>0 r=sprite(ember,add,velocity,.06)\npop edge burst=80 on=disc(.3).c(.25) life=.42 v=radial(${sp}) size=.3..0.5 sz=$size*(.6>1) col=${SUN}>${DAWN} a=.8>.6:.8>0 r=sprite(soft-disc,add)\npop haze burst=14 on=disc(${n2(r * 0.7)}) life=.6..1 v=up(.6..1.4) size=.6..1 acc=buoy(.4)+drag(1) sz=$size*(.6>1.4) col=${DAWN} a=0>.15:.3>0 r=sprite(soft-disc,add)\n${flash(SUN_L, 40, r + 3, 0.35)}`),
          ['shockwave', { position: up(o.at, 1), speed: r / 0.4, thickness: 0.6, intensity: 0.35 }],
        ]
      },
      hit: (o) => [fx(o.at, `fx\n${sparks(10, SUN, '2..5')}\npop sear burst=1 life=.2 sz=.9*(.4>1) col=${SUN} a=.8>0 r=sprite(soft-disc,add)`)],
    },
    // Dây Sáng: a 1.4 m rope of burning light thrown 12 m, through minions, stopping on the first hero; the struck one is bound and slowed
    e: {
      cast: (o) => [gather(o, SUN, 1, 22)],
      fly: (o) => {
        const v = V(vel(o.a, o.b, o.t))
        return [fx(o.a, `fx\npop headtip burst=1 life=${n2(o.t)} v=${v} sz=.75*flick(12,.2) col=${SUN} a=.95 r=sprite(soft-disc,add)\npop headtipcore burst=1 life=${n2(o.t)} v=${v} sz=.28 col=${SUNW} a=1 r=sprite(soft-disc,add)\npop headrope on=@headtip.lives(140) life=${n2(o.t + 0.3)} size=.12..0.2 sz=$size*flick(16,.3) col=${DAWN}>${SUN} a=.9>.7:.85>0 r=sprite(soft-disc,add)\npop burn on=@headtip.lives(36) life=.35..0.7 v=up(.4..1) size=.1..0.2 acc=buoy(1)+drag(1.4) sz=$size*(1>.3) col=${SUN}>${DAWN} a=0>.1:.9>0 rot=spin(.4) r=sprite(flame-wisp,add)\npop lamp burst=1 life=${n2(o.t)} v=${v} r=${Lt(SUN_L, 6, 5)}`)]
      },
      hit: (o) => [fx(o.at, `fx\npop coil burst=44 on=disc(.7).c(-.6) life=.9..1.2 v=up(.6..1) size=.06..0.12 acc=vortex(11)+drag(1) sz=$size col=${SUN} a=0>.1:1>.8:1>0 r=sprite(soft-disc,add,velocity,.06)\npop sear burst=1 life=.22 sz=1.3*(.4>1) col=${SUNW} a=.85>0 r=sprite(soft-disc,add)\n${sparks(10, DAWN, '2..5')}\n${flash(SUN_L, 18, 4, 0.3)}`)],
    },
    // Hai Nhịp Trời: the sword goes up, a sun gathers over the ground; 0.7 s later two sunbeams fall 0.6 s apart on the 4.5 m area,
    // the second one heavier (it stuns). o.echo = 0 first beat, 1 second.
    r: {
      cast: (o) => {
        const sky = o.ground ? up(o.ground, 9) : null
        return [
          fx(handOf(o, 1.9, 0.2), `fx\npop rise burst=34 on=sphere(.25) life=.3..0.5 v=up(7..10) size=.04..0.08 sz=$size col=${SUN} a=1>0 r=sprite(ember,add,velocity,.05)\npop blade burst=1 life=.5 sz=.7*(.5>1) col=${SUNW} a=0>.2:1>0 r=sprite(soft-disc,add)`),
          ...(sky ? [fx(sky, `fx\npop sun burst=1 life=1 sz=1.2>3.2 col=${SUN} a=0>.6:.8>.9:0 r=sprite(soft-disc,add)\npop pull burst=50 on=sphere(4) life=.8 v=attract(5) size=.05..0.1 sz=$size col=${SUN} a=0>.3:1>0 r=sprite(mote,add)\npop lamp burst=1 life=1 r=light(${SUN_L},${n2(10 * LK)}*(0>.8:1>0),14)`)] : []),
        ]
      },
      land: (o) => {
        const r = o.r ?? 4.5, two = (o.echo ?? 0) >= 1, k = two ? 1.35 : 1
        return [
          fx(o.at, `fx\npop markcol burst=${two ? 80 : 60} on=box(${n2(r * 0.4 * k)},7,${n2(r * 0.4 * k)}).c(3.6) life=.3..0.45 v=<0,-14,0> size=.22..0.4 sz=$size*${n2(k)} col=${SUNW}>${SUN} a=.8>0 r=sprite(soft-disc,add,velocity,.12)\npop markcore burst=12 on=box(.1,6,.1).c(3.2) life=.25 size=1.1..1.4 sz=$size*${n2(k)}*(1>.4) col=${SUN} a=.35>0 r=sprite(soft-disc,add)\npop markedge burst=${two ? 90 : 70} on=disc(.3).c(.15) life=.35..0.45 v=radial(${n2(r * 2.5)}..${n2(r * 2.7)}) size=.08..0.14 acc=drag(1.2) sz=$size col=${SUN} a=1>.7:.8>0 r=sprite(ember,add,velocity,.05)\npop flames burst=${two ? 48 : 34} on=disc(${n2(r)}) life=.6..1.1 v=up(1..2.4) size=.2..0.4 acc=buoy(1.2)+curl(.4)+drag(1.2) sz=$size*(1>.3) col=${SUN}>${DAWN} a=0>.1:.9>0 rot=spin(.3) r=sprite(flame-wisp,add)\n${dust(r * 0.8, two ? 16 : 10)}\n${flash(SUN_L, two ? 60 : 42, r + 5, 0.22)}`), // doc 78 R3 #3: glare ≤0.25 s
          ['shockwave', { position: up(o.at, 0.6), speed: r / 0.35, thickness: two ? 1 : 0.7, intensity: two ? 0.55 : 0.4 }],
          ['screenShake', { intensity: two ? 0.4 : 0.22, duration: two ? 0.3 : 0.18 }],
          // doc 78 R3 #2: each beat sounds as it falls (1.0 / 1.6 s); the second, the stun, heavier
          two ? snd('second-sunbeam-crashes-down-heavy-thunder-boom-stun', o.at, 0.85) : snd('sunbeam-pillar-slams-ground-bright-boom', o.at, 0.65),
        ]
      },
      hit: (o) => [fx(o.at, `fx\n${sparks(12, SUN, '3..6')}\npop sear burst=1 life=.2 sz=1.1*(.4>1) col=${SUNW} a=.85>0 r=sprite(soft-disc,add)`)],
    },
  },

  // Bách Diện · Vũ Công Gương Đồng (heroes.yml bach_dien, R1 2026-10-11). Vũ Khúc Trăm Gương: one authored effect
  // (scripts/effects/vfx-bach-r.fx.js) born at her feet on the cast; its beats B = 0.4 / 1.0 / 1.6 s ARE the kit's
  // windup .2 + delay .2 then kitmech ECHO_GAP .6, so the flare (B[2]) lands on the stun beat (beatSpec: CC on the last beat only).
  // Sound (hero-sfx.yml bach_dien r*): cast = r, beats 1–2 = r_beat, beat 3 = r_flare with r_tail under it (playSound has no delay).
  bach_dien: {
    r: {
      cast: (o) => [['fx', { position: o.at, script: 'scripts/effects/vfx-bach-r.fx.js', params: { r: HEROES.heroes?.bach_dien?.r?.radius ?? 4.5 } }],
        snd('bronze-mirrors-rising-from-floor-shimmering-glass-chime-swell', o.at, 0.6)],
      land: (o) => ((o.echo ?? 0) >= 2
        ? [snd('mirror-ring-blinding-flash-crystal-boom-and-high-glass-shriek', o.at, 0.7), snd('bronze-mirrors-shattering-glass-rain-fading-chimes', o.at, 0.45),
          ['shockwave', { position: up(o.at, 0.8), speed: (o.r ?? 4.5) / 0.35, thickness: 0.9, intensity: 0.45 }], ['screenShake', { intensity: 0.3, duration: 0.22 }]]
        : [snd('hundred-bronze-mirrors-ringing-in-unison-bright-dance-bell-hit', o.at, 0.55, 1 + 0.06 * (o.echo ?? 0))]),
      hit: (o) => [fx(o.at, `fx\n${sparks(10, 'hdr(.7,2.6,1.6)', '2..5')}\npop glint burst=1 life=.18 sz=.9*(.4>1) col=hdr(3.6,3,2.2) a=.85>0 r=sprite(soft-disc,add)`)],
    },
  },
  // Mặc Liên · Người Sơn Mài (heroes.yml mac_lien, R2 2026-10-11). Nét Cuối: one authored effect (scripts/effects/vfx-mac-r.fx.js)
  // born at the ring's centre on cast; its stroke closes at 0.8 s = windup .3 + delay .5, the frame the area lands (damage + knockback).
  // Sound (hero-sfx.yml mac_lien): cast = r (dip + long stroke), land = r_close. Q/RMB/LMB ride the generic flying bodies (vfx-heroes.yml).
  mac_lien: {
    r: {
      cast: (o) => [['fx', { position: o.at, script: 'scripts/effects/vfx-mac-r.fx.js', params: { r: HEROES.heroes?.mac_lien?.r?.radius ?? 5.5 } }],
        snd('giant-brush-dipping-in-lacquer-then-long-sweeping-stroke', o.at, 0.6)],
      land: (o) => [snd('giant-wet-brush-stroke-slamming-shut-heavy-lacquer-boom', o.at, 0.7),
        ['shockwave', { position: up(o.at, 0.5), speed: (o.r ?? 5.5) / 0.3, thickness: 0.8, intensity: 0.4 }], ['screenShake', { intensity: 0.3, duration: 0.2 }]],
      hit: (o) => [fx(o.at, `fx\n${sparks(10, 'hdr(2.6,.5,.3)', '2..5')}`)],
    },
  },

  // Ngư Đăng · Gấu Ngựa Đeo Chuông (heroes.yml ngu_dang, doc 85 §4). Bronze bells: gold-bronze sparks, toll rings (orbit motes on the
  // real radius, never a ground plane). Q Ném Chuông flies as a body (BODY.ngu_dang.q); the 0.5 s windup aim is the skillshot's own
  // width-1.2 lane telegraph. RMB Chuông Kết Bạn: a bell planted at the feet, a gold ring of motes on the 6 m shield radius rising as a dome.
  // E Quét Xích: links whipped round the 3.5 m ring. R Lồng Vọng: scripts/effects/vfx-ngu-r.fx.js (doc 79 five phases, timed on windup .3 + delay .25).
  ngu_dang: {
    lmb: { hit: (o) => [fx(o.at, `fx\n${sparks(8, BELL, '2..5')}`), snd('bronze-bell-on-chain-whipping-hit-clang', o.at, 0.5)] },
    q: { cast: (o) => [snd('heavy-bronze-bell-hurled-on-rattling-chain-whoosh', o.at, 0.6)],
      hit: (o) => [fx(o.at, `fx\n${sparks(16, BELL, '3..7')}\npop toll burst=1 life=.3 sz=1.4*(.4>1) col=${BELL} a=.8>0 r=sprite(soft-disc,add)`), snd('bronze-bell-slamming-into-armor-loud-ringing-gong-stun', o.at, 0.7)] },
    rmb: { cast: (o) => { const r = HEROES.heroes?.ngu_dang?.rmb?.shield?.radius ?? 6
      return [fx(o.at, `fx\npop plant burst=14 on=disc(.4) life=.4..0.7 v=sdir()*(2..4)+up(1) size=.1..0.2 acc=grav()+drag(1) col=<.42,.36,.28> a=1>0 sz=$size r=sprite(chip,alpha)
pop rim burst=48 on=arc(${r},360).c(.2) life=1.1..1.5 v=up(.8..1.4) size=.12..0.2 acc=drag(1.2) sz=$size*(1>.4) col=${BELL} a=0>.1:1>.7:.8>0 r=sprite(soft-disc,add)
pop dome burst=30 on=sphere(${n2(r * 0.55)}).c(.4) life=.8..1.1 v=attract(1.5) size=.06..0.1 sz=$size col=hdr(2.2,1.8,.8) a=0>.2:.9>0 r=sprite(mote,add)
pop lamp burst=1 life=.6 at=disc(.05).c(1) a=1>0 r=${Lt('<1,.8,.4>', 6, r)}`), snd('bronze-bell-planted-in-earth-deep-resonant-hum', o.at, 0.6)] } },
    e: { land: (o) => { const r = HEROES.heroes?.ngu_dang?.e?.radius ?? 3.5
      return [fx(o.at, `fx\npop links burst=40 on=arc(${r},360).c(.6) life=.35..0.5 v=vortex(9)+up(.5) size=.08..0.14 acc=drag(1) sz=$size col=<.72,.58,.36> a=1>0 r=sprite(chip,alpha)
pop gleam burst=24 on=arc(${r},360).c(.7) life=.25..0.4 v=vortex(11) size=.1..0.18 sz=$size*(1>.3) col=${BELL} a=1>0 r=sprite(ember,add,velocity,.05)`), snd('iron-chain-sweeping-circle-rattle-and-small-bells-jingle', o.at, 0.6)] } },
    r: {
      cast: (o) => [['fx', { position: o.at, script: 'scripts/effects/vfx-ngu-r.fx.js', params: { r: HEROES.heroes?.ngu_dang?.r?.radius ?? 5 } }],
        snd('three-giant-phantom-bronze-bells-descending-rising-hum', o.at, 0.6)],
      land: (o) => [snd('bronze-bell-cage-slamming-shut-huge-gong-and-echoing-toll', o.at, 0.75),
        ['shockwave', { position: up(o.at, 0.6), speed: (o.r ?? 5) / 0.3, thickness: 0.8, intensity: 0.4 }], ['screenShake', { intensity: 0.28, duration: 0.22 }]],
      hit: (o) => [fx(o.at, `fx\n${sparks(10, BELL, '2..4')}`)],
    },
  },
  // Cốt Bện · Người Bùn Ruộng (heroes.yml cot_ben, doc 85 §5). Paddy mud (brown alpha puffs, clods), braided straw, glowing seedlings.
  // Q Bừa Tre flies as a body (BODY.cot_ben.q). RMB Phun Bùn: the cone's own readable layer comes from the library shape (arc 100, r 3.5);
  // here only mud thrown inside that same cone. R Vùi Bùn, doc 79 five beats in one program timed on the kit (windup .2, untargetable 1.75):
  // 1 anticipation (cast: belly swells, seedlings on the back stand up and glow) · 2 commit (land: mud ropes wrap the victim and are sucked in)
  // 3 hold (seedlings burn bright for the 1.75 s the victim is inside) · 4 release (delay 1.75: spit burst + shockwave + sound) · 5 aftermath (a mud puddle of low puffs, no ground mesh).
  cot_ben: {
    q: { hit: (o) => [fx(o.at, `fx\n${chips(14, '3..5', MUD_C)}\npop splat burst=6 on=sphere(.3) life=.5..0.8 v=sdir()*(1.5..3) size=.3..0.5 acc=grav()*.4+drag(2) sz=$size*(.6>1.4) col=${MUD_C} a=.9>0 r=sprite(smoke-puff,alpha)`), snd('wet-mud-slap-hit-heavy-splat', o.at, 0.6)] },
    rmb: { cast: (o) => { const f = fwdOf(o), r = HEROES.heroes?.cot_ben?.rmb?.radius ?? 3.5, base = up(o.at, 1.1)
      const rays = [-42, -21, 0, 21, 42].map((d) => turn(f, d)).map((d, i) => `pop spray${i} burst=10 life=.35..0.55 v=<${n2(d.x * r * 2.1)},.6,${n2(d.z * r * 2.1)}>+sdir()*.7 size=.25..0.45 acc=grav()*.6+drag(1.2) sz=$size*(.5>1.6) col=${MUD_C} a=.85>.6:.7>0 rot=spin(.4) r=sprite(smoke-puff,alpha)`).join('\n')
      return [fx(base, `fx\n${rays}\n${chips(16, '2..4', MUD_C, `<${n2(f.x)},.4,${n2(f.z)}>`)}`), snd('thick-wet-mud-spray-gushing-splatter', o.at, 0.6)] } },
    e: { hit: (o) => [fx(o.at, `fx\n${chips(12, '4..6', MUD_C)}\npop gush burst=8 on=disc(.4) life=.5..0.8 v=up(3..5)+sdir()*.6 size=.3..0.5 acc=grav()*.7+drag(1) sz=$size*(.6>1.3) col=${MUD_C} a=.9>0 r=sprite(smoke-puff,alpha)`), snd('two-hands-scooping-heavy-wet-mud-suction-pop', o.at, 0.6)] },
    r: {
      cast: (o) => [fx(o.at, `fx\npop swell burst=18 on=sphere(.9).c(1.1) life=.3..0.5 v=attract(3) size=.3..0.5 sz=$size*(1>.5) col=${MUD_C} a=0>.3:.8>0 r=sprite(smoke-puff,alpha)
pop seed burst=9 on=disc(.45).c(2.15) life=2.1 size=.07..0.1 sz=$size*(.3>.1:1>.95:1.2>1:0) col=${SEED} a=0>.08:1>.9:1>0 r=sprite(soft-disc,add)
pop seedmote burst=26 on=disc(.45).c(2.1) life=1.2..2 delay=.2 v=up(.5..1) size=.03..0.05 sz=$size col=${SEED} a=1>0 r=sprite(mote,add)
pop seedlamp burst=1 life=2.1 at=point().c(2.2) glo=0>.1:1>.85:1>0 r=light(${SEED_L},$glo*${n2(5 * LK)},5)`)],
      land: (o) => { const r = 2.6
        return [fx(o.at, `fx\npop wrap burst=28 on=sphere(1.3).c(1) life=.35..0.5 v=attract(6) size=.35..0.6 sz=$size*(1>.3) col=${MUD_C} a=.9>0 rot=spin(.6) r=sprite(smoke-puff,alpha)
pop hold n=10 on=sphere(.55).c(1.1) life=1.75 size=.4..0.6 sz=$size col=${MUD_C} a=0>.1:.85>.9:.85>0 rot=spin(.3) r=sprite(smoke-puff,alpha)
pop spit burst=36 delay=1.75 on=sphere(.4).c(1) life=.5..0.9 v=sdir()*(4..7)+up(1.5) size=.25..0.5 acc=grav()*.8+drag(1) sz=$size*(.6>1.5) col=${MUD_C} a=.95>0 r=sprite(smoke-puff,alpha)
pop clods burst=18 delay=1.75 life=.6..1 v=sdir()*(3..6)+up(3) size=.08..0.16 spin=-9..9 acc=grav()+drag(.3) col=${MUD_C} a=1 sz=$size rot=$age*$spin floor=stick r=sprite(chip,alpha)
pop puddle burst=14 delay=1.8 on=disc(${r}).c(.12) life=2.2..2.8 size=.9..1.3 sz=$size*(.6>1:1>1) col=<.26,.2,.13> a=0>.1:.55>.75:.45>0 rot=spin(.05) r=sprite(smoke-puff,alpha)
pop shine burst=1 delay=1.75 life=.25 at=point().c(1) glo=1>0 r=light(${SEED_L},$glo*${n2(8 * LK)},6)`),
          snd('mud-golem-belly-swallowing-victim-deep-gulp-and-squelch', o.at, 0.7), ['screenShake', { intensity: 0.22, duration: 0.2 }]] },
      hit: (o) => [['later', { at: o.at, s: (HEROES.heroes?.cot_ben?.r?.untargetable ?? 1.75) - 0.35, rows: [snd('mud-golem-spitting-out-victim-wet-burst-and-splash', o.at, 0.7), ['screenShake', { intensity: 0.3, duration: 0.25 }], ['shockwave', { position: o.at, speed: 9, thickness: 0.5, intensity: 0.5 * GLASS.wave }]] }]], // the spit: land fires at the swallow (≈0.33 s after cast), release at 1.75 s after cast
    },
  },

  // Hương Mai · Linh Điểu Đầu Ngày (heroes.yml huong_mai). Dawn rose and lantern amber, petals, green-gold mending motes.
  huong_mai: {
    // Cổng Khép: each basic that lands ticks her gate: three petals fold shut over the struck body
    passive: { hit: (o) => [fx(o.at, `fx\npop fold burst=3 on=disc(.4) life=.45 v=attract(3) size=.18..0.24 spin=-4..4 sz=$size*(1>.4) col=${ROSE} a=0>.15:.9>0 rot=$age*$spin r=sprite(petal,add)\npop tick burst=1 life=.2 sz=.5*(.4>1) col=${LANT} a=.7>0 r=sprite(soft-disc,add)`)] },
    lmb: { cast: (o) => [fx(handOf(o, 1.2, 0.6), `fx\npop mouth burst=1 life=.18 sz=.35>.7 col=${LANT} a=.8>0 r=sprite(soft-disc,add)\npop sp burst=8 life=.2..0.35 v=sdir()*2+<${n2(fwdOf(o).x * 3)},0,${n2(fwdOf(o).z * 3)}> size=.03..0.05 col=${LANT} a=1>0 sz=$size r=sprite(ember,add,velocity,.03)`)] },
    // Mạch Lành: a straight lance of dawn; on a foe it burns, on the weakest ally in reach it blooms into mending motes
    q: {
      cast: (o) => [gather(o, LANT, 0.9, 20)],
      hit: (o) => [fx(o.at, `fx\npop bloom burst=1 life=.3 sz=1.3*(.3>1) col=${LANT} a=.85>0 r=sprite(soft-disc,add)\npop petals burst=16 on=sphere(.3) life=.6..1 v=sdir()*(2..3.5) size=.08..0.14 spin=-6..6 acc=drag(2) col=${ROSE} a=1>0 sz=$size rot=$age*$spin r=sprite(petal,add)\n${flash(LANT_L, 16, 4, 0.25)}`)],
      mend: (o) => [fx(o.at, `fx\npop mend burst=26 on=disc(.5) life=.8..1.3 v=up(1.2..2.4) size=.05..0.09 col=${HEALC} a=0>.2:1>0 sz=$size r=sprite(mote,add)\npop petals burst=8 on=disc(.4).c(1) life=.8..1.2 v=up(.5..1) size=.1..0.16 spin=-3..3 acc=drag(1) col=${ROSE} a=0>.2:1>0 sz=$size rot=$age*$spin r=sprite(petal,add)`)],
    },
    // Vòng Hương: a spinning ring of incense smoke and rose light flies out and comes home, hitting twice
    rmb: {
      cast: (o) => [fx(handOf(o, 1.1, 0.4), `fx\npop puff burst=6 on=sphere(.2) life=.5..0.8 v=sdir()*.6 size=.2..0.35 acc=buoy(.4)+drag(1.4) sz=$size*(.6>1.6) col=<.75,.6,.6> a=0>.2:.3>0 rot=spin(.2) r=sprite(smoke-puff,alpha)`)],
      fly: (o) => {
        const v = V(vel(o.a, o.b, o.t)), w = 0.8
        const vv = vel(o.a, o.b, o.t)
        return [['fx', { position: o.a, script: 'scripts/effects/vfx-huong-ring.fx.js', params: { v: [vv.x, vv.y, vv.z], t: o.t, w: 2.6 } }], fx(o.a, `fx\npop hub burst=1 life=${n2(o.t)} v=${v} a=0 sz=.1 r=sprite(soft-disc,add)\npop rim on=@hub.lives(140) life=.22..0.35 v=sdir()*${n2(w * 5)} size=.12..0.2 acc=vortex(14)+drag(5) sz=$size*(1>.3) col=${ROSE}>${LANT} a=.85>0 r=sprite(soft-disc,add,velocity,.06)\npop smoke on=@hub.lives(40) life=.5..0.9 v=sdir()*.4 size=.2..0.4 acc=buoy(.4)+curl(.4)+drag(1.4) sz=$size*(.6>1.6) col=<.8,.62,.62> a=0>.2:.25>0 rot=spin(.2) r=sprite(smoke-puff,alpha)\npop petals on=@hub.lives(16) life=.6..1 v=sdir()*1 size=.08..0.13 spin=-6..6 acc=drag(1.4) col=${ROSE} a=1>0 sz=$size rot=$age*$spin r=sprite(petal,add)\npop lamp burst=1 life=${n2(o.t)} v=${v} r=${Lt(ROSE_L, 5, 4)}`)]
      },
      hit: (o) => [fx(o.at, `fx\npop cut burst=24 on=disc(.5) life=.3..0.45 v=vortex(9)+radial(2) size=.08..0.14 acc=drag(3) col=${ROSE} a=1>0 sz=$size r=sprite(ember,add,velocity,.05)\npop scent burst=4 on=sphere(.3) life=.6..0.9 size=.3..0.5 acc=buoy(.3)+drag(1.4) sz=$size*(.6>1.5) col=<.8,.6,.62> a=0>.2:.3>0 r=sprite(smoke-puff,alpha)`)],
    },
    // Chặn Lối: the staff is struck into the earth and a palisade of standing light rises around the 3 m area: tall thin blades
    // of amber that hold, flicker and sink; those who touch it are slowed hard
    e: {
      cast: (o) => [fx(o.at, `fx\n${dust(0.4, 5)}\npop knock burst=1 life=.25 sz=.8*(.3>1) col=${LANT} a=.7>0 r=sprite(soft-disc,add)`)],
      land: (o) => {
        const r = o.r ?? 3, f = fwdOf(o), sx = -f.z, sz = f.x // across the aim: the wall stands square to her line
        return [
          // Chặn Lối (doc 30): a standing wall of light 2r long, square to her aim, held 2 s: three glowing courses stacked to 2 m,
          // a hot seam on the ground, a crown of sparks on top, motes climbing its face. 'mark' pops keep full body (what gameplay reads).
          ...[0, 1].map((k) => ['wall', { feetPosition: { x: o.at.x, y: o.at.y + 0.02 + (k ? 0.85 : 1.15), z: o.at.z }, rotation: { yaw: Math.atan2(-f.x, -f.z) * 180 / Math.PI + k * 180 }, lifetime: 2, physics: 'none', castShadow: false, receiveShadow: false,
            primitive: { kind: 'plane', width: r * 2 * (k ? 0.9 : 1), height: k ? 2.0 : 2.6 }, material: { texture: 'scripts/tex-lightwall.js?s=1', color: k ? '#ffd27a' : '#ff9aa8', emissive: k ? '#ffb347' : '#ff7f90', emissiveIntensity: 1.8, transparent: true, opacity: k ? 0.65 : 0.9, depthWrite: false, side: 'double' } }]),
          // the footprint under the MOBA camera: a glowing strip exactly the hitbox (2r × mark width 0.9 m), held the same 2 s, so from above the wall reads as its real rectangle
          ['wall', { feetPosition: { x: o.at.x, y: o.at.y + 0.03, z: o.at.z }, rotation: { yaw: Math.atan2(-f.x, -f.z) * 180 / Math.PI }, lifetime: 2, physics: 'none', castShadow: false, receiveShadow: false,
            primitive: { kind: 'box', width: r * 2, height: 0.04, depth: o.w ?? 0.9 }, material: { texture: 'scripts/tex-lightwall.js?s=1', color: '#ffc68a', emissive: '#ff9a6a', emissiveIntensity: 1.4, transparent: true, opacity: 0.55, depthWrite: false } }],
          fx(o.at, `fx\npop markseam burst=${Math.round(r * 14)} on=line(${n2(r * 2)},${n2(sx)},0,${n2(sz)}).c(.06) life=2 size=.22..0.3 col=${LANTW} a=0>.08:.9>.85:.9>0 sz=$size r=sprite(soft-disc,add)\npop markcrown burst=${Math.round(r * 10)} on=line(${n2(r * 2)},${n2(sx)},0,${n2(sz)}).c(2.15) life=2 size=.08..0.13 col=${LANTW} a=(0>.1:1>.85:1>0)*flick(9,.4) sz=$size r=sprite(ember,add)\npop markrise rate=${Math.round(r * 14)} win=0;1.7 on=line(${n2(r * 2)},${n2(sx)},0,${n2(sz)}).c(.1) life=.8..1.2 v=up(1.2..1.9) size=.05..0.08 col=${LANT} a=1>0 sz=$size r=sprite(ember,add)`),
          // doc 76: everything at the landing lies along the wall line: no round shockwave, no disc of dust
          fx(o.at, `fx\n${chips(10, '1.5..3', '<.5,.45,.4>')}\npop walldust burst=14 on=line(${n2(r * 2)},${n2(sx)},0,${n2(sz)}) life=.6..1 v=up(.4..0.9) size=.3..0.5 acc=drag(1.5) sz=$size*(.6>1.6) col=<.72,.64,.55> a=0>.1:.35>0 r=sprite(smoke-puff,alpha)\n${flash(LANT_L, 24, r + 3, 0.4)}`),
        ]
      },
      hit: (o) => [fx(o.at, `fx\n${sparks(8, LANT, '2..4')}\npop bind burst=10 on=disc(.5).c(-.6) life=.8 v=up(.6) acc=vortex(8)+drag(1) size=.05..0.1 col=${ROSE} a=0>.1:1>0 sz=$size r=sprite(soft-disc,add)`)],
    },
    // Ánh Đầu Ngày: a rose dawn gathers over the 6 m area for a second (motes drawn upward to a sun in the sky), then breaks:
    // a dome of light blooms from the ground, foes burn, she and her allies inside are washed in mending motes
    r: {
      cast: (o) => {
        const g = o.ground ?? o.at, R = o.r ?? 6
        return [
          fx(handOf(o, 2.0, 0.1), `fx\npop lift burst=30 on=sphere(.3) life=.4..0.6 v=up(5..8) size=.04..0.08 col=${LANT} a=1>0 sz=$size r=sprite(ember,add,velocity,.05)`),
          fx(g, `fx\npop motes burst=70 on=disc(${n2(R)}) life=1..1.2 v=up(1.5..3) size=.04..0.08 acc=attract(2) col=${ROSE}>${LANT} a=0>.2:1>.8:1>0 sz=$size r=sprite(mote,add)\npop sun burst=1 at=point().c(7) life=1.1 sz=1>3.4 col=${LANT} a=0>.6:.8>.95:0 r=sprite(soft-disc,add)\npop lamp burst=1 at=point().c(5) life=1.1 r=light(${ROSE_L},${n2(10 * LK)}*(0>.9:1>0),${n2(R * 2)})`),
          // doc 78 R2 #8: the 1 s warning's real edge: a painted ring of radius R (texture ring sits at 0.86 of the half-width) held to the blast
          ['wall', { feetPosition: { x: g.x, y: (g.y ?? o.at.y) + 0.12, z: g.z }, rotation: { yaw: 0, pitch: -90 }, lifetime: 1.1, physics: 'none', castShadow: false, receiveShadow: false,
            primitive: { kind: 'plane', width: (R / 0.86) * 2, height: (R / 0.86) * 2 }, material: { texture: 'scripts/tex-skillmark.js?k=ring', color: '#ffc68a', emissive: '#ff9aa8', emissiveIntensity: 1.6, transparent: true, opacity: 0.85, depthWrite: false } }],
        ]
      },
      land: (o) => {
        const R = o.r ?? 6
        return [
          fx(o.at, `fx\npop dome burst=110 on=sphere(${n2(R * 0.92)}) life=.5..0.8 v=up(.4..1) size=.18..0.3 acc=drag(2) sz=$size*(1>.4) col=${LANTW}>${ROSE} a=0>.06:.8>0 r=sprite(soft-disc,add)\npop rays burst=40 on=disc(${n2(R * 0.85)}) life=.5..0.8 v=up(9..13) size=.12..0.2 asp=6 acc=drag(4) sz=$size col=${LANT} a=.8>0 r=sprite(soft-disc,add,velocity,.2)\npop petals burst=60 on=disc(${n2(R * 0.8)}) life=1.2..1.9 v=radial(2..4)+up(1.5..3) size=.1..0.18 spin=-5..5 acc=drag(1.2)+curl(.4) col=${ROSE} a=0>.1:1>.6:1>0 sz=$size rot=$age*$spin r=sprite(petal,add)\npop mend burst=60 on=disc(${n2(R * 0.8)}) delay=.2 life=1..1.6 v=up(1.5..3) size=.06..0.1 col=${HEALC} a=0>.2:1>0 sz=$size r=sprite(mote,add)\n${flash(LANT_L, 60, R + 6, 0.45)}`),
          snd('dawn-dome-burst-boom', o.at, 0.85), ['screenShake', { intensity: 0.25, duration: 0.3 }], // doc 78 R2 #7: the blast is heard
          fx(o.at, `fx\npop markpillar burst=24 on=disc(.7).c(12) life=.5..0.8 v=up(-14..-10) size=.4..0.6 asp=8 sz=$size col=${LANTW}>${LANT} a=.5>0 floor=die r=sprite(soft-disc,add,velocity,.3)\npop core burst=1 at=point().c(1) life=.6 sz=${n2(R * 0.9)}*(.3>1) col=${LANTW} a=.8>0 r=sprite(soft-disc,add)`),
          ...Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return fx({ x: o.at.x + Math.cos(a) * R, y: o.at.y, z: o.at.z + Math.sin(a) * R }, `fx\npop markshaft burst=3 on=disc(.2) life=.9..1.2 v=up(6..8) size=.16..0.24 asp=7 acc=drag(5) sz=$size col=${LANT}>${ROSE} a=0>.05:.5>0 r=sprite(soft-disc,add,velocity,.22)`) }),
          ['shockwave', { position: up(o.at, 0.6), speed: R / 0.35, thickness: 1.1, intensity: 0.5 }],
          ['screenShake', { intensity: 0.25, duration: 0.25 }],
        ]
      },
      hit: (o) => [fx(o.at, `fx\n${sparks(12, LANT, '3..6')}\npop sear burst=1 life=.2 sz=1*(.4>1) col=${LANTW} a=.85>0 r=sprite(soft-disc,add)`)],
    },
  },
}


// ---------- basic attacks + the wind-ups the kit table lacked (doc 20) ----------
// lmb.swing (melee) o: { at: feet, fwd, to: chest of the target }; lmb.fly o: { a, b, t, fwd }; lmb.hit o: { at: chest }
const handOf = (o, h = 1.3, d = 0.5) => { const f = fwdOf(o); return { x: o.at.x + f.x * d, y: o.at.y + h, z: o.at.z + f.z * d } }
const gather = (o, col, r = 1.2, n = 30) => fx(handOf(o), `fx\npop gather burst=${n} on=sphere(${r}) life=.3..0.4 v=attract(${n2(r * 9)}) size=.04..0.08 col=${col} a=0>.3:1>0 sz=$size r=sprite(mote,add)\npop core burst=1 life=.35 sz=.2>.6 col=${col} a=.8>0 r=sprite(soft-disc,add)`)
const EXTRA = {
  moc_lam: {
    lmb: {
      swing: (o) => [fx(o.to ?? handOf(o, 1.1, 1.4), `fx\npop arc burst=26 on=arc() life=.18..0.3 v=sdir()*2 size=.04..0.07 acc=drag(4) col=${JADE} a=1>0 sz=$size r=sprite(ember,add,velocity,.04)`)],
      hit: (o) => [fx(o.at, `fx\n${chips(8, '1.5..3', '<.5,.46,.4>')}\npop jolt burst=1 life=.14 sz=.7*(.4>1.1) col=${JADE} a=.8>0 r=sprite(soft-disc,add)`), snd('stone-blade-hit-thud', o.at, 0.45)],
    },
  },
  kha_tan: {
    lmb: {
      swing: (o) => [fx(o.to ?? handOf(o, 1.1, 1.4), `fx\npop arc burst=30 on=arc() life=.15..0.28 v=sdir()*3 size=.03..0.06 acc=drag(4) col=${IRON} a=1>0 sz=$size r=sprite(ember,add,velocity,.05)`)],
      hit: (o) => [fx(o.at, `fx\n${sparks(12, IRON, '3..6')}\npop blood burst=6 life=.3..0.6 v=sdir()*(1.5..3) size=.04..0.08 acc=grav() col=<.55,.04,.05> a=1 sz=$size floor=stick r=sprite(droplet,alpha,velocity,.02)`), snd('axe-flesh-hit-chop', o.at, 0.45)],
    },
    q: { cast: (o) => [gather(o, IRON, 1.4, 26), fx(o.at, `fx\n${dust(0.9, 6)}`)] },
  },
  mi_dang: {
    lmb: {
      fly: (o) => [fx(o.a, `fx\npop head burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.62*flick(8,.12) col=hdr(1.6,.7,2.2) a=.95 r=sprite(soft-disc,add)\npop headcore burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.24 col=hdr(3,2.4,3.4) a=1 r=sprite(soft-disc,add)\npop trail on=@head.lives(70) life=.2..0.35 size=.16 sz=$size*(1>0) col=${VIOLET} a=.7>0 r=sprite(flame-wisp,add)`), snd('wisp-mote-throw-whoosh', o.a, 0.35)],
      hit: (o) => [fx(o.at, `fx\npop pop burst=10 life=.2..0.4 v=sdir()*(1.5..3) size=.08..0.14 acc=drag(3) sz=$size*(1>0) col=${VIOLET} a=1>0 r=sprite(flame-wisp,add)`)],
    },
    q: { cast: (o) => [gather(o, VIOLET, 1.2, 30)] },
    e: { cast: (o) => [gather(o, 'hdr(3.2,1.2,2.4)', 1, 24), fx(handOf(o), `fx\npop petals burst=10 life=.6..1 v=sdir()*.8 size=.06..0.1 acc=drag(1.5) col=hdr(2.6,1.1,2.2) a=1>0 sz=$size r=sprite(petal,add)`)] },
  },
  hoa_tuy: {
    lmb: {
      fly: (o) => [fx(o.a, `fx\n${bolt(o.a, o.b, o.t, 'hdr(2.4,1,.22)', 0.32, FIRE, 'flame-wisp')}`), snd('ember-flick-throw-fire', o.a, 0.35)],
      hit: (o) => [fx(o.at, `fx\n${FLAMES(0.25, 30, '1..2', 0.4).replace('rate=flick(.45,.2)*30', 'burst=8')}\n${sparks(8, FIRE, '2..4')}`)],
    },
    q: { cast: (o) => { const g = o.ground ?? o.at; return [gather(o, FIRE, 1.2, 30), fx(g, `fx\npop warn burst=1 life=.9 at=point().c(.06) sz=4.6*(.2>1) col=hdr(2.4,.7,.1) a=.0>.2:.7>.9:.7>0 r=sprite(soft-disc,add)\npop cracks burst=24 on=disc(2.2) life=.9 v=up(.4..1) size=.04..0.07 col=${FIRE} a=0>.3:1>0 sz=$size r=sprite(ember,add)`)] } },
    rmb: { cast: (o) => [gather(o, FIRE, 1, 22)] },
    e: { cast: (o) => [fx(up(o.at, 1), `fx\npop heat burst=36 on=sphere(2.4) life=.25..0.35 v=attract(12) size=.06..0.12 col=${FIRE} a=0>.3:1>0 sz=$size r=sprite(ember,add)`)] },
  },
  nham_vu: {
    lmb: {
      fly: (o) => [fx(o.a, `fx\npop head burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.9 asp=.14 col=hdr(3,2.1,.9) a=1 r=sprite(ember,add,velocity,.1)\npop headglow burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.42 col=hdr(1.4,.8,.25) a=.8 r=sprite(soft-disc,add)\npop trail on=@head.lives(60) life=.2 size=.08 sz=$size*(1>0) col=${AMBER} a=.6>0 r=sprite(soft-disc,add)`), snd('bow-arrow-release-twang', o.a, 0.4)],
      hit: (o) => [fx(o.at, `fx\n${chips(6, '1.5..3', '<.75,.55,.3>')}\n${sparks(6, AMBER, '2..4')}`)],
    },
    q: { cast: (o) => [gather(o, AMBER, 1, 22)] },
  },
  van_dao: {
    lmb: {
      fly: (o) => [fx(o.a, `fx\npop head burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.58*flick(14,.25) col=hdr(1.2,1.8,2.8) a=.95 r=sprite(soft-disc,add)\npop headcore burst=1 life=${n2(o.t)} v=${V(vel(o.a, o.b, o.t))} sz=.22 col=hdr(3,3.2,3.6) a=1 r=sprite(soft-disc,add)\npop zig on=@head.lives(90) life=.12..0.2 v=sdir()*1.5 size=.05..0.08 col=${STORM} a=1>0 sz=$size r=sprite(ember,add,velocity,.04)`), snd('storm-staff-zap-bolt', o.a, 0.35)],
      hit: (o) => [fx(o.at, `fx\n${sparks(10, 'hdr(2.4,3,4)', '3..6')}`)],
    },
    q: { cast: (o) => [fx(up(o.ground ?? o.at, 4), `fx\npop cloud burst=8 on=disc(2) life=.6..0.9 v=sdir()*.3 size=1..1.6 acc=drag(1) sz=$size*(.4>1) col=<.25,.3,.4> a=0>.3:.5>0 r=sprite(smoke-puff,alpha)`), gather(o, STORM, 1, 24)] },
    rmb: { cast: (o) => [gather(o, STORM, 1, 24)] },
  },
}
for (const [h, slots] of Object.entries(EXTRA)) for (const [sl, evs] of Object.entries(slots)) {
  KIT[h][sl] ??= {}
  for (const [ev, f] of Object.entries(evs)) KIT[h][sl][ev] ??= f
}

// wisp B 2026-10-08: the per-target hit of each area/target skill that fell back to hero.js's team-coloured spark (gap matrix, report wisp-B).
// One volley per struck unit, no light (several units at once), the material of the skill: stone, iron, moon, fire, storm.
// Savi 2026-10-08 (wisp B report, T2 "quá mờ"): Hỏa Tủy's fire on a struck unit read too faint through GLASS on bright stone.
// HOT lifts only the additive cards of that hit, before glass() thins them; the GLASS knob itself stays shared.
const HOT = (src, k = 2.2) => src.split('\n').map((l) => (/r=sprite\([^,)]+,add/.test(l) ? l.replace(/ a=(\S+)/, (_, x) => ` a=(${x})*${k}`) : l)).join('\n')
const HITS = {
  moc_lam: {
    e: { hit: (o) => [fx(o.at, `fx\n${chips(12, '2..4', '<.45,.42,.36>').replace('size=.06..0.14', 'size=.12..0.22')}\npop moss burst=8 life=.4..0.7 v=sdir()*(2..4)+up(1.5) size=.12..0.2 spin=-6..6 acc=grav()*.6+drag(1) col=<.3,.85,.45> a=1>.6:1>0 sz=$size rot=$age*$spin r=sprite(shard,alpha)\npop grit burst=6 life=.5..0.9 v=sdir()*(1..2)+up(1) size=.3..0.5 acc=buoy(.3)+drag(1.6) col=<.5,.45,.38> a=0>.5:.4>0 sz=$size*(.6>1.6) r=sprite(smoke-puff,alpha)`), snd('stone-blade-hit-thud', o.at, 0.4, 0.9)] },
    r: { hit: (o) => [fx(o.at, `fx\n${chips(20, '3..6', '<.45,.42,.36>').replace('size=.06..0.14', 'size=.14..0.26')}\npop moss burst=14 life=.5..0.9 v=sdir()*(3..6)+up(2) size=.16..0.28 spin=-6..6 acc=grav()*.6+drag(1) col=<.3,.9,.5> a=1>.6:1>0 sz=$size rot=$age*$spin r=sprite(shard,alpha)\npop jolt burst=1 life=.25 sz=2.2*(.4>1.3) col=${JADE} a=1>0 r=sprite(soft-disc,add)`), ['screenShake', { intensity: 0.18, duration: 0.15 }]] },
  },
  kha_tan: {
    q: { hit: (o) => [fx(o.at, `fx\npop blood burst=10 life=.35..0.7 v=sdir()*(2..4)+up(1) size=.08..0.14 acc=grav() col=<.6,.04,.05> a=1 sz=$size floor=stick r=sprite(droplet,alpha,velocity,.03)\n${sparks(12, IRON, '3..6')}`)] },
    rmb: { hit: (o) => [fx(o.at, `fx\npop links burst=10 on=disc(.4) life=.5..0.8 v=sdir()*(1.5..3) size=.12..0.2 spin=-8..8 acc=vortex(3)+grav()*.5+drag(1.5) col=<.55,.55,.6> a=1>.7:1>0 sz=$size rot=$age*$spin r=sprite(chip,alpha)\n${sparks(16, IRON, '3..7')}`)] },
    r: { hit: (o) => [fx(o.at, `fx\npop blood burst=18 life=.4..0.8 v=sdir()*(2.5..5)+up(1) size=.1..0.18 acc=grav() col=<.6,.04,.05> a=1 sz=$size floor=stick r=sprite(droplet,alpha,velocity,.03)\npop gash burst=3 life=.3..0.45 v=sdir()*(.5..1) size=.5..0.8 spin=-2..2 col=<.75,.06,.06> a=1>0 sz=$size*(.6>1.2) rot=$age*$spin r=sprite(shard,alpha)\n${sparks(18, BLOOD, '4..8')}`)] },
  },
  mi_dang: {
    rmb: { hit: (o) => [fx(o.at, `fx\npop petals burst=10 life=.5..0.9 v=sdir()*(1.5..3)+up(1) size=.12..0.2 spin=-5..5 acc=drag(1.4)+grav()*.3 col=<.6,.35,.95> a=1>.6:1>0 sz=$size rot=$age*$spin r=sprite(petal,alpha)\npop wick burst=10 life=.3..0.6 v=up(1)+sdir()*1.4 size=.18..0.3 acc=buoy(1)+drag(1) sz=$size*(1>.2) col=${VIOLET} a=1>0 r=sprite(flame-wisp,add)`)] },
    r: { hit: (o) => [fx(o.at, `fx\npop crescent burst=2 life=.25..0.35 v=sdir()*.5 size=.6..0.9 spin=-3..3 col=<.8,.72,1> a=1>0 sz=$size*(.7>1.2) rot=$age*$spin r=sprite(shard,alpha)\npop petals burst=6 life=.4..0.7 v=sdir()*(1.5..3) size=.1..0.16 acc=drag(1.5) col=<.6,.35,.95> a=1>0 sz=$size r=sprite(petal,alpha)\n${sparks(10, VIOLET, '3..6')}`)] },
  },
  hoa_tuy: {
    q: { hit: (o) => [fx(o.at, HOT(`fx\n${FLAMES(0.35, 30, '1..2', 0.8).replace('rate=flick(.45,.2)*30', 'burst=20')}\npop soot burst=5 life=.6..1 v=up(1)+sdir()*.8 size=.3..0.45 acc=buoy(.8)+drag(1.2) col=<.32,.28,.26> a=0>.6:.4>0 sz=$size*(.6>1.6) r=sprite(smoke-puff,alpha)\npop daze burst=8 on=disc(.35).c(.9) life=.75 v=up(.1) size=.08..0.12 acc=vortex(7) col=<1,.75,.2> a=0>.15:1>.8:1>0 sz=$size r=sprite(ember,alpha)`))] },
    e: { hit: (o) => [fx(o.at, HOT(`fx\npop soot burst=6 life=.5..0.8 v=sdir()*2 size=.3..0.45 acc=buoy(.6)+drag(1.4) col=<.32,.28,.26> a=0>.6:.35>0 sz=$size*(.6>1.6) r=sprite(smoke-puff,alpha)\npop cinder burst=10 life=.3..0.6 v=sdir()*(3..6) size=.06..0.1 acc=grav()*.5+drag(1.5) col=<1,.5,.12> a=1>0 sz=$size r=sprite(ember,alpha,velocity,.03)`))] },
    r: { hit: (o) => [fx(o.at, HOT(`fx\n${FLAMES(0.5, 40, '1.5..2.5', 1.1).replace('rate=flick(.45,.2)*40', 'burst=26')}\npop soot burst=8 life=.7..1.2 v=up(1.5)+sdir() size=.4..0.6 acc=buoy(.8)+drag(1.2) col=<.32,.28,.26> a=0>.6:.4>0 sz=$size*(.6>1.8) r=sprite(smoke-puff,alpha)\npop cinder burst=14 life=.5..1.1 v=up(2.5)+sdir()*2 size=.06..0.1 acc=grav()*.4+drag(.6) col=<1,.55,.15> a=1>0 sz=$size r=sprite(ember,alpha,velocity,.03)`))] },
  },
  van_dao: {
    q: { hit: (o) => [fx(o.at, `fx\npop drop burst=12 life=.35..0.7 v=sdir()*(2..3.5)+up(1.2) size=.07..0.12 acc=grav() col=<.45,.65,.9> a=1>0 sz=$size floor=stick r=sprite(droplet,alpha,velocity,.03)\n${sparks(14, 'hdr(2.4,3,4)', '3..7')}`)] },
    r: { hit: (o) => [fx(o.at, `fx\npop gust burst=8 life=.4..0.7 v=sdir()*(2..4) size=.4..0.6 acc=drag(2) col=<.7,.82,.95> a=0>.6:.3>0 sz=$size*(.5>1.8) r=sprite(smoke-puff,alpha)\npop drop burst=10 life=.4..0.7 v=sdir()*(3..5)+up(1) size=.07..0.12 acc=grav() col=<.45,.65,.9> a=1>0 sz=$size r=sprite(droplet,alpha,velocity,.03)\n${sparks(18, 'hdr(2.4,3,4)', '4..9')}\npop arc burst=1 life=.18 sz=1.8 col=hdr(2,2.6,4) a=1>0 r=sprite(soft-disc,add)`)] },
  },
}
for (const [h, slots] of Object.entries(HITS)) for (const [sl, evs] of Object.entries(slots)) {
  KIT[h][sl] ??= {}
  for (const [ev, f] of Object.entries(evs)) KIT[h][sl][ev] ??= f
}

// Savi 2026-10-08: the wind-up of the four self-aimed skills (hero.js:674 and bot.js:184 fire 'cast' for every slot; these had none,
// so the foot effect came only with 'land'). Each gathers its own material in toward the caster: stone, reeds, feathers, wind.
const SELF_CAST = {
  moc_lam: {
    rmb: { cast: (o) => [fx(o.at, `fx\n${dust(0.9, 8)}\npop rise burst=26 on=disc(1.3) life=.35..0.5 v=attract(5)+up(1.5..2.5) size=.05..0.09 col=<.12,.62,.32> a=0>.3:1>0 sz=$size r=sprite(mote,alpha)\npop grit burst=10 on=disc(1.1) life=.4..0.6 v=attract(4)+up(1) size=.05..0.1 acc=grav()*.5 col=<.34,.29,.22> a=1>0 sz=$size r=sprite(chip,alpha)`)] },
    e: { cast: (o) => [fx(o.at, `fx\npop reeds burst=20 on=disc(1.6) life=.35..0.5 v=attract(6)+up(.5..1) size=.1..0.18 acc=vortex(10) tint=<.75,.8,.45>..<.5,.65,.3> col=$tint a=0>.2:1>0 sz=$size r=sprite(stalk,alpha,velocity,.04)\n${dust(0.8, 6)}`)] },
  },
  nham_vu: {
    e: { cast: (o) => { const f = fwdOf(o); return [fx(o.at, `fx\npop kick burst=12 on=disc(.4) life=.4..0.7 v=<${n2(f.x * 2.5)},1.5,${n2(f.z * 2.5)}>+sdir()*1 size=.05..0.1 acc=grav() col=<.55,.45,.32> a=1 sz=$size floor=stick r=sprite(chip,alpha)\npop plume burst=10 on=disc(.5).c(1.2) life=.5..0.8 v=up(1..2)+sdir()*.8 size=.1..0.16 spin=-4..4 acc=drag(1.5)+grav()*.15 tint=<1,.95,.85>..<.95,.75,.45> col=$tint a=1>0 sz=$size rot=$age*$spin r=sprite(leaf,alpha)\n${dust(0.6, 6)}`)] } },
  },
  van_dao: {
    e: { cast: (o) => [fx(o.at, `fx\npop draft burst=40 on=disc(1.5) life=.35..0.5 v=attract(5)+up(2..3.5) size=.05..0.1 acc=vortex(12) col=${STORM} a=0>.2:1>0 sz=$size r=sprite(soft-disc,add,velocity,.05)\npop leaves burst=8 on=disc(1.3) life=.5..0.8 v=up(1.5)+attract(3) size=.08..0.14 acc=vortex(8)+drag(1) col=<.55,.75,.5> a=1>0 sz=$size r=sprite(leaf,alpha)`)] },
  },
}
for (const [h, slots] of Object.entries(SELF_CAST)) for (const [sl, evs] of Object.entries(slots)) {
  KIT[h][sl] ??= {}
  for (const [ev, f] of Object.entries(evs)) KIT[h][sl][ev] ??= f
}

const A = (clip, speed = 1, duration = 1.1, full = false) => ({ clip: `cdn/clip-${clip}.glb`, speed, duration, full })
// doc 25: every hero moves by its own body, class and weapon; each slot its own clip (cdn conjures the words once)
// where each clip's real motion lives (measured from its bone rotations: 12%..88% of the movement). The clips are ~4 s;
// playing their first second showed only the wind-up, so every action now starts at its window and is paced to fit
const WIN = {"sword-and-shield-horizontal-slash":[0.55,3.4],"sword-and-shield-forward-blade-throw":[0.45,3.3],"sword-and-shield-raise-shield-block":[0.6,3.25],"sword-and-shield-shield-bash-lunge":[0.5,3.25],"sword-and-shield-jump-attack-downward-slam":[0.6,3.3],"heavy-polearm-horizontal-sweep":[0.4,3.5],"heavy-polearm-full-spin-sweep":[0.7,3.6],"heavy-polearm-running-lunge-thrust":[0.35,3.6],"heavy-hook-chain-throw-and-pull":[0.5,3.35],"heavy-polearm-overhead-slam":[0.45,3.75],"dual-dagger-quick-slash":[0.45,3.45],"assassin-flick-throw-lantern":[0.6,3.35],"dual-dagger-dash-slash":[0.4,3.4],"seductive-beckon-hand-gesture":[0.3,2.8],"assassin-spinning-dagger-flurry":[1.05,3.65],"mage-staff-swing-fire-flick":[1.25,3.8],"mage-raise-staff-summon-pillar":[0.8,3.25],"mage-one-hand-hurl-fireball":[0.4,3.1],"mage-two-hand-force-push":[0.5,3.2],"mage-arms-wide-great-incantation":[0.6,3.65],"archer-draw-bow-and-shoot":[0.5,3.55],"archer-quickly-shoot-three-arrows-in-a-row":[0.3,3.75],"archer-full-draw-hold-and-release":[0.65,3.0],"archer-backward-leap-dodge":[0.5,3.3],"archer-shoot-arrow-into-sky":[0.45,3.05],"graceful-staff-flick-cast":[1.0,3.2],"graceful-staff-twirl-summon":[1.2,3.5],"graceful-palm-push-wind":[0.75,3.65],"van-dao-staff-raise-overhead-protective-ward":[0.35,3.5],"raise-staff-high-call-storm":[0.55,3.7],"sword-and-shield-forward-lunge-stab":[0.44,3.29],"sword-and-shield-spinning-sweep-slash":[0.58,3.24],"archer-step-back-and-fire-power-shot":[1.59,3.61],"assassin-one-hand-flick-cast-spark":[0.64,2.98]}
const ANIM = {
  // Mộc Lẫm · 2.15 m bruiser-tank, sabre + shield: planted, square, mid tempo
  moc_lam: { lmb: A('sword-and-shield-horizontal-slash', 1.15, 0.8), q: A('sword-and-shield-forward-lunge-stab', 1.1, 0.9, true), rmb: A('sword-and-shield-raise-shield-block', 1, 1.2), e: A('sword-and-shield-spinning-sweep-slash', 1.15, 0.9), r: A('sword-and-shield-jump-attack-downward-slam', 1.05, 1.2, true) },
  // Kha Tàn · 2.2 m heavy polearm diver: wide, slow, all momentum
  kha_tan: { lmb: A('heavy-polearm-horizontal-sweep', 1.1, 0.85), q: A('heavy-polearm-full-spin-sweep', 1.0, 1.1, true), rmb: A('heavy-polearm-running-lunge-thrust', 1.2, 0.8, true), e: A('heavy-hook-chain-throw-and-pull', 1.1, 1.0), r: A('heavy-polearm-overhead-slam', 0.9, 1.4, true) },
  // Mị Đăng · 1.8 m assassin, twin daggers: low, fast, snapping
  mi_dang: { lmb: A('assassin-one-hand-flick-cast-spark', 1.4, 0.6), q: A('assassin-flick-throw-lantern', 1.3, 0.75), rmb: A('dual-dagger-dash-slash', 1.3, 0.7, true), e: A('seductive-beckon-hand-gesture', 1.1, 1.0), r: A('assassin-spinning-dagger-flurry', 1.2, 1.0, true) },
  // Hỏa Tủy · 2.0 m fire mage, censer staff: wide, billowing
  hoa_tuy: { lmb: A('mage-staff-swing-fire-flick', 1.3, 0.7), q: A('mage-raise-staff-summon-pillar', 1.0, 1.2), rmb: A('mage-one-hand-hurl-fireball', 1.2, 0.8), e: A('mage-two-hand-force-push', 1.2, 0.9), r: A('mage-arms-wide-great-incantation', 0.95, 1.5, true) },
  // Nham Vũ · 1.75 m marksman, bow: compact, precise
  nham_vu: { lmb: A('archer-draw-bow-and-shoot', 1.5, 0.6), q: A('archer-quickly-shoot-three-arrows-in-a-row', 1.2, 0.9), rmb: A('archer-full-draw-hold-and-release', 0.9, 1.3), e: A('archer-backward-leap-dodge', 1.2, 0.8, true), r: A('archer-step-back-and-fire-power-shot', 0.9, 1.2, true) },
  // Vân Dao · 1.85 m support, crane staff: soft, flowing
  van_dao: { lmb: A('graceful-staff-flick-cast', 1.3, 0.7), q: A('graceful-staff-twirl-summon', 1.1, 1.1), rmb: A('graceful-palm-push-wind', 1.2, 0.9), e: A('van-dao-staff-raise-overhead-protective-ward', 1.0, 1.0), r: A('raise-staff-high-call-storm', 1.0, 1.4) },
}
// the gesture row for a body: masked from the spine unless the move is the whole body's
// doc 25 (2026-10-08): every skill is now a whole-body move keyed in Blender on that hero's own rig (art/anim/moves.py):
// knees, spine, hips, arms and the spin, the fingers left to the grip. [address, seconds as authored]
export const isBaked = (hero, slot) => !!BAKED?.[hero]?.[slot]
export function skillAnim(hero, slot, opt = {}) {
  const b = BAKED?.[hero]?.[slot]
  if (b) {
    const [clip, len, hit = len * 0.4] = b, k = HEROES.heroes?.[hero]?.[slot] ?? {}
    if (opt.show) return { clip, weight: 4, blend: 'override', speed: 0.8, duration: len / 0.8, loop: 'once', blendIn: 0.06, blendOut: 0.18, ...(opt.now != null ? { time: 0, timeAt: opt.now } : {}) }
    // match: the strike key meets the release (windup + eruption delay + most of the dash): speed 0.8–1.6x, then the wind-up trimmed up to 40% (art/anim/audit.py checks the same sum)
    const rel = (k.windup ?? 0) + (k.delay ?? 0) + (k.dash ? Math.max(0.12, (k.dash.distance ?? 0) / 22) * 0.6 : 0)
    let speed = rel >= 0.1 ? Math.min(1.6, Math.max(0.8, hit / rel)) : 1
    let skip = rel >= 0.1 ? Math.min(hit * 0.4, Math.max(0, hit - rel * speed)) : 0
    // doc 78 R3 #4: a multi-beat target skill (Ba Bước Mờ: hits at 0.12 + i·0.4 s) slows so the clip runs past its last beat
    const last = k.aim === 'target' && (k.hits ?? 1) > 1 ? 0.12 + (k.hits - 1) * 0.4 + 0.1 : 0
    if (last && (len - skip) / speed < last) { speed = Math.max(0.6, (len - skip) / last) }
    return { clip, weight: 4, blend: 'override', speed, duration: (len - skip) / speed, loop: 'once', blendIn: 0.06, blendOut: 0.18, ...(opt.now != null ? { time: skip, timeAt: opt.now } : {}) }
  }
  const a = ANIM[hero]?.[slot]
  if (!a) return null
  const [t0, t1] = WIN[a.clip.slice(9, -4)] ?? [0, 1.2]
  const span = t1 - t0
  // opt.now = ctx.now(): the seek is stamped then, or the engine holds the pose at t0
  // match: the whole move inside the skill's own beat (capped so it never blurs); lobby demo: shown whole at a readable pace
  const speed = opt.show ? span / 2.2 : Math.min(3.2, span / a.duration)
  const duration = opt.show ? 2.3 : a.duration
  return { clip: a.clip, weight: 4, speed, ...(opt.now != null ? { time: t0, timeAt: opt.now } : {}), duration, loop: 'once', blendIn: 0.08, blendOut: 0.2, ...(a.full ? {} : { mask: { from: 'Spine' } }) }
}


// ---------- the body's own move (doc 25, 2026-10-08) ----------
// The clips swing arms in place: none lifts or carries the hips more than ~0.25 m, so every skill read as the same stand-and-swing.
// This layer drives the Hips bone itself (a raw-track mixer channel "motion"): the lunge, the leap, the recoil, the spin.
// Keys: [t 0..1 of the move, forward m, up m]; spin = turns of the body about its own axis. Visual only: capsule, dash and hit timing stay the kit's.
const HIPS = { // rest pose of each hero GLB's Hips (rig cm, +Z = the hero's forward) and its rest rotation
  moc_lam: [[0.41, 113.28, 9.04], [-0.0284, 0.0027, 0.0027, 0.9996]], kha_tan: [[0.52, 138.43, 19.78], [-0.0362, 0.0053, 0.0053, 0.9993]],
  mi_dang: [[0.4, 112.3, 11.96], [-0.006, 0.003, 0.003, 1]], hoa_tuy: [[0.5, 127.85, 16.6], [-0.0289, 0.0056, 0.0056, 0.9996]],
  nham_vu: [[0.4, 108.7, 11.62], [-0.0205, 0, 0, 0.9998]], van_dao: [[-0.4, 116.29, 17.89], [0.0306, 0, 0, 0.9995]],
}
const MV = {
  step:     { k: [[0, 0, 0], [0.25, 0.25, -0.07], [0.6, 0.2, -0.05], [1, 0, 0]] },                                    // a planted strike step
  lunge:    { k: [[0, 0, 0], [0.15, -0.12, -0.06], [0.4, 0.8, -0.2], [0.72, 0.65, -0.14], [1, 0, 0]] },                // đâm lao: coil back, drive low and long
  dashLow:  { k: [[0, 0, 0], [0.2, 0.45, -0.22], [0.6, 0.8, -0.2], [1, 0, 0]] },
  leapSlam: { k: [[0, 0, 0], [0.14, -0.05, -0.2], [0.42, 0.45, 1.0], [0.6, 0.7, -0.32], [0.85, 0.6, -0.24], [1, 0, 0]] }, // nhảy chém: crouch, rise high, cleave down
  bigLeap:  { k: [[0, 0, 0], [0.16, -0.08, -0.26], [0.45, 0.4, 1.3], [0.62, 0.65, -0.4], [0.88, 0.55, -0.3], [1, 0, 0]] },
  vault:    { k: [[0, 0, 0], [0.12, 0, -0.14], [0.4, 0.6, 0.6], [0.7, 0.95, -0.1], [1, 0, 0]] },                     // phi thân: a low arc through the air
  blink3:   { k: [[0, 0, 0], [0.12, 0.5, 0.35], [0.26, 0.2, -0.1], [0.4, 0.6, 0.4], [0.55, 0.2, -0.1], [0.7, 0.7, 0.45], [0.86, 0.3, -0.14], [1, 0, 0]], spin: 1 },
  spin:     { k: [[0, 0, 0], [0.2, 0.05, -0.14], [0.8, 0.05, -0.12], [1, 0, 0]], spin: 1 },                           // quét vòng
  reap:     { k: [[0, 0, 0], [0.2, 0.1, -0.22], [0.75, 0.15, -0.2], [1, 0, 0]], spin: 1 },
  brace:    { k: [[0, 0, 0], [0.2, -0.12, -0.2], [0.8, -0.12, -0.2], [1, 0, 0]] },                                   // shield set, weight down
  yank:     { k: [[0, 0, 0], [0.3, 0.3, -0.05], [0.55, -0.45, -0.12], [0.8, -0.25, -0.04], [1, 0, 0]] },              // throw out, then haul back
  recoil:   { k: [[0, 0, 0], [0.4, 0.04, 0], [0.5, -0.22, 0.02], [0.75, -0.1, 0], [1, 0, 0]] },                      // giật lùi khi bắn
  recoil3:  { k: [[0, 0, 0], [0.2, 0, 0], [0.27, -0.16, 0], [0.42, -0.05, 0], [0.5, -0.2, 0], [0.65, -0.08, 0], [0.73, -0.26, 0.02], [1, 0, 0]] },
  drawShot: { k: [[0, 0, 0], [0.25, -0.06, -0.14], [0.58, -0.08, -0.16], [0.65, -0.42, 0], [0.85, -0.2, -0.02], [1, 0, 0]] },
  backLeap: { k: [[0, 0, 0], [0.1, 0.06, -0.14], [0.45, -0.35, 0.7], [0.8, -0.45, -0.16], [1, 0, 0]] },                // bật lùi
  backShot: { k: [[0, 0, 0], [0.25, -0.35, 0.22], [0.45, -0.4, -0.1], [0.62, -0.75, 0], [0.85, -0.35, -0.04], [1, 0, 0]] },
  flick:    { k: [[0, 0, 0], [0.3, 0.1, 0.05], [0.6, -0.05, 0], [1, 0, 0]] },
  twist:    { k: [[0, 0, 0], [0.25, -0.15, -0.04], [0.5, 0.3, -0.06], [1, 0, 0]] },
  sway:     { k: [[0, 0, 0], [0.3, -0.2, 0], [0.6, 0.12, 0], [1, 0, 0]] },
  hurl:     { k: [[0, 0, 0], [0.25, -0.18, 0], [0.5, 0.35, -0.06], [0.68, 0.15, 0], [1, 0, 0]] },
  push:     { k: [[0, 0, 0], [0.25, -0.22, -0.08], [0.5, 0.4, -0.1], [0.8, 0.2, 0], [1, 0, 0]] },
  pillar:   { k: [[0, 0, 0], [0.3, 0, 0.35], [0.5, 0.1, -0.22], [0.8, 0, -0.1], [1, 0, 0]] },                        // rise, then slam the pillar up from the ground
  levitate: { k: [[0, 0, 0], [0.3, 0, 0.5], [0.75, 0, 0.65], [0.9, 0, -0.14], [1, 0, 0]] },                         // bay lên niệm chú
  twirl:    { k: [[0, 0, 0], [0.3, 0, 0.18], [0.75, 0, 0.2], [1, 0, 0]], spin: 1 },
  ward:     { k: [[0, 0, 0], [0.3, 0, 0.22], [0.8, 0, 0.22], [1, 0, 0]] },
  burst:    { k: [[0, 0, 0], [0.3, 0, -0.28], [0.5, 0, 0.35], [0.8, 0, 0.2], [1, 0, 0]], spin: 0.5 },
  palm:     { k: [[0, 0, 0], [0.3, 0.3, -0.05], [0.55, 0.2, 0], [1, 0, 0]] },
}
const MOVE = {
  moc_lam: { lmb: 'step', q: 'lunge', rmb: 'brace', e: 'spin', r: 'leapSlam' },
  kha_tan: { lmb: 'step', q: 'reap', rmb: 'lunge', e: 'yank', r: 'bigLeap' },
  mi_dang: { lmb: 'flick', q: 'twist', rmb: 'vault', e: 'sway', r: 'blink3' },
  hoa_tuy: { lmb: 'flick', q: 'pillar', rmb: 'hurl', e: 'push', r: 'levitate' },
  nham_vu: { lmb: 'recoil', q: 'recoil3', rmb: 'drawShot', e: 'backLeap', r: 'backShot' },
  van_dao: { lmb: 'flick', q: 'twirl', rmb: 'palm', e: 'ward', r: 'burst' },
}
const qmul = (a, b) => [a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1], a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0], a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3], a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]]
// the motion channel for a skill: opt.show = the lobby's readable pace; opt.dur overrides the length
export function skillMotion(hero, slot, opt = {}) {
  if (BAKED?.[hero]?.[slot]) return null // the baked move carries its own body; the old hips layer would fight it
  const m = MV[MOVE[hero]?.[slot]], h = HIPS[hero], a = ANIM[hero]?.[slot]
  if (!m || !h) return null
  const dur = opt.dur ?? (opt.show ? 2.3 : a?.duration ?? 1)
  const [r, rq] = h, s = 100 // metres → rig cm
  const tracks = [{ bone: 'Hips', prop: 'position', times: m.k.map((k) => k[0] * dur), values: m.k.flatMap((k) => [r[0], r[1] + k[2] * s, r[2] + k[1] * s]) }]
  if (m.spin) {
    const n = Math.round(m.spin * 8), times = [], values = []
    for (let i = 0; i <= n; i++) {
      const t = 0.12 + (0.7 * i) / n, th = (-Math.PI * 2 * m.spin * i) / n
      times.push(t * dur); values.push(...qmul([0, Math.sin(th / 2), 0, Math.cos(th / 2)], rq))
    }
    tracks.push({ bone: 'Hips', prop: 'rotation', times: [0, ...times, dur], values: [...rq, ...values, ...rq] })
  }
  return { clip: { name: `mv-${hero}-${slot}-${opt.show ? 's' : 'm'}`, tracks }, weight: 1, loop: 'once', blend: 'override', blendIn: 0.05, blendOut: 0.12, duration: dur, ...(opt.now != null ? { time: 0, timeAt: opt.now } : {}) }
}

export function hasFx(hero, slot, ev) { return !!KIT[hero]?.[slot]?.[ev] || !!libFx(hero, slot, ev) }

// plays the moment; returns false when this skill draws nothing of its own for it (the caller keeps its fallback)
// ---------- the primary shape (doc 21 B1.1): one clear form per skill at its true gameplay size ----------
// Particles above are the secondary layer; this is what reads from the locked match camera:
//   area / self land  → a ring of the skill's real radius, flashing in the hero's colour, gone in under half a second
//   skillshot fly     → a ground strip of the real hitbox width along the path it travels
//   target land       → a tight ring under the one struck
//   cast (non-basic)  → a small ring at the caster's feet: "something is coming"
import { HERO_COL } from './hero-colors.js'
export { HERO_COL }
const gy = (ctx, p) => { try { return floorY(ctx, p) } catch { return ctx.place?.terrain?.heightAt?.(p.x, p.z) ?? p.y ?? 0 } } // bridges and plazas count
function shapeOf(hero, slot, ev, o) {
  if (slot === 'lmb' || slot === 'passive' || o.calm) return null
  const k = HEROES.heroes?.[hero]?.[slot]
  if (!k) return null
  // the shape is the skill's own (heroes.yml mark.kind): no shared circle under every cast
  const mk = k.mark?.kind ?? (k.aim === 'skillshot' ? 'line' : k.aim === 'target' ? 'target' : 'circle')
  if (ev === 'cast' || mk === 'wall' || mk === 'none') return null
  if (ev === 'ward' && o.r) return { ring: o.r, at: o.at, life: 0.6, o: 0.55 } // doc 78 R3 #6: an ally shield's real reach
  if (ev === 'fly' && k.aim === 'skillshot') return { strip: k.width ?? 1, a: o.a, b: o.b, life: Math.min(0.45, (o.t ?? 0.3) + 0.15) }
  if (ev === 'land' && k.aim === 'area' && k.arc) return { sector: k.radius, arc: k.arc, at: o.at, yaw: yawOf(o.fwd ?? { x: 0, z: -1 }), life: 0.45 } // a cone marks its sector, never a circle
  if (ev === 'land' && (k.aim === 'area' || k.aim === 'self') && (k.radius ?? o.r)) return { ring: k.radius ?? o.r, at: o.at, life: 0.45, o: 0.6, fill: true }
  if (ev === 'land' && k.aim === 'target') return { ring: 1.1, at: o.at, life: 0.4, o: 0.6 }
  return null
}
function drawShape(ctx, hero, sh) {
  const col = HERO_COL[hero] ?? '#ffffff'
  const mark = (k) => `scripts/tex-skillmark.js?k=${k}` // one bake per kind; the random yaw keeps casts from repeating
  // a soft painted mark, not a ruled primitive: the texture's alpha is the shape, the hero's colour its tint
  const mat = (k, op, e) => ({ texture: mark(k), color: col, emissive: col, emissiveIntensity: e * GLASS.ground, transparent: true, opacity: op * GLASS.ground, depthWrite: false })
  const base = { castShadow: false, receiveShadow: false, lifetime: sh.life, physics: 'none' }
  const spin = ((ctx.random?.() ?? 0) * 360) | 0
  try {
    if (sh.ring) {
      const y = gy(ctx, sh.at) + 0.14, r = sh.ring, w = (r / 0.86) * 2
      const ring = ctx.spawn({ ...base, primitive: { kind: 'plane', width: w, height: w }, rotation: { yaw: spin, pitch: -90 }, scale: 0.85, material: mat('ring', sh.o * 1.3, 0.8), feetPosition: { x: sh.at.x, y, z: sh.at.z } })
      const h = ctx.getObject(ring); if (h) animate(ctx, h, { scale: [0.85, 1.05, 1.08] }, { duration: sh.life, easing: 'easeOutCubic' })
      if (sh.fill) {
        const f = ctx.spawn({ ...base, lifetime: sh.life * 0.6, primitive: { kind: 'plane', width: w, height: w }, rotation: { yaw: spin + 90, pitch: -90 }, material: mat('disc', 0.3, 0.5), feetPosition: { x: sh.at.x, y: y - 0.01, z: sh.at.z } })
        const fh = ctx.getObject(f); if (fh) animate(ctx, fh, { scale: [1, 0.3] }, { duration: sh.life * 0.6, easing: 'easeInQuad' })
      }
    } else if (sh.sector) {
      const y = gy(ctx, sh.at) + 0.14, w = (sh.sector / 0.86) * 2, k = `sector&a=${Math.round(sh.arc)}`
      const m = ctx.spawn({ ...base, primitive: { kind: 'plane', width: w, height: w }, rotation: { yaw: sh.yaw, pitch: -90 }, scale: 0.9, material: mat(k, 0.75, 0.8), feetPosition: { x: sh.at.x, y, z: sh.at.z } })
      const h = ctx.getObject(m); if (h) animate(ctx, h, { scale: [0.9, 1.0, 1.02] }, { duration: sh.life, easing: 'easeOutCubic' })
    } else if (sh.strip) {
      const dx = sh.b.x - sh.a.x, dz = sh.b.z - sh.a.z, len = Math.hypot(dx, dz)
      if (len < 0.5) return
      const mid = { x: (sh.a.x + sh.b.x) / 2, z: (sh.a.z + sh.b.z) / 2 }
      ctx.spawn({ ...base, primitive: { kind: 'plane', width: sh.strip / 0.62, height: len * 1.15 }, rotation: { yaw: yawOf({ x: dx, z: dz }), pitch: -90 }, material: mat('strip', 0.45, 0.6), feetPosition: { x: mid.x, y: Math.max(gy(ctx, sh.a), gy(ctx, sh.b), gy(ctx, mid)) + 0.1, z: mid.z } })
    }
  } catch {}
}

// the glass pass: real skill light is see-through. Glowing (additive) pops are dimmed and thinned, smoke and
// soft discs go translucent; solid matter (chips, blood, leaves, petals) keeps its body. One knob for every hero.
export const GLASS = { peak: 4.5, sat: 0.62, add: 0.24, soft: 0.34, hdr: 0.36, count: 0.5, rate: 0.5, wave: 0.4, light: 0.7, ground: 0.6 }
// an additive colour keeps its hue: the brightest channel caps at GLASS.peak and the others stay under GLASS.sat of it, so a
// stacked core reads gold/rose/cyan, never a white disc (audit 78, Hạo Nhật / Vân Dao / Hỏa Túy / Hương Mai)
const tame = (c) => {
  if (c.length !== 3 || c.some((v) => !Number.isFinite(v))) return c
  const m = Math.max(...c), k = m > GLASS.peak ? GLASS.peak / m : 1, top = m * k
  return c.map((v) => n2(v * k === top ? top : Math.min(v * k, top * GLASS.sat)))
}
export function glass(src) {
  return String(src).split('\n').map((ln) => {
    const t = ln.trimStart()
    if (!t.startsWith('pop ')) return ln
    const add = /r=sprite\([^,)]+,add/.test(ln), soft = /r=sprite\((smoke-puff|soft-disc)/.test(ln)
    if (add) ln = ln.replace(/hdr\(([^)]*)\)/g, (_, a) => `hdr(${tame(a.split(',').map(Number)).join(',')})`) // audit 78: no additive card burns to white
    if (/^pop (head|mark)\w*\s/.test(t)) return ln // doc54: what gameplay reads (a shot's head, a hit's flash) keeps its full body
    // an alpha card's colour is linear: the palette was written as screen colours, so a stone <.5,.46,.4> drew near white (QA m34,
    // Mộc Lẫm W). Every literal col/tint on an alpha card is taken screen → linear here, once, for all six heroes.
    if (!add && /r=sprite\([^,)]+,alpha/.test(ln)) ln = ln.replace(/ (col|tint)=(\S+)/g, (_, k, v) => ` ${k}=${v.replace(/<([\d.]+),([\d.]+),([\d.]+)>/g, (m, a, b, c) => `<${[a, b, c].map((x) => n2(Math.pow(+x, 2.2))).join(',')}>`)}`)
    if (!add && !soft && !/sprite\(shard/.test(ln)) return ln
    // no hard triangles: a glowing shard becomes a streaked ember, a stone one a rounded chip
    ln = ln.replace(/sprite\(shard,add/, 'sprite(ember,add').replace(/sprite\(shard,alpha/, 'sprite(chip,alpha')
    if (!add && !soft) return ln
    let out = ln.replace(/hdr\(([^)]*)\)/g, (_, a) => `hdr(${a.split(',').map((v) => n2(parseFloat(v) * GLASS.hdr)).join(',')})`)
    out = out.replace(/ a=(\S+)/, (_, x) => ` a=(${x})*${add ? GLASS.add : GLASS.soft}`)
    if (add) out = out.replace(/ burst=(\d+)(?=\s)/, (m, n) => (+n > 3 ? ` burst=${Math.max(3, Math.round(+n * GLASS.count))}` : m))
    if (add) out = out.replace(/ rate=(\S+)/, (_, x) => ` rate=(${x})*${GLASS.rate}`) // a held stream thins too
    out = out.replace(/\.lives\((\d+(?:\.\d+)?)\)/, (_, n) => `.lives(${n2(+n * GLASS.rate)})`) // a trail sheds fewer cards
    return out
  }).join('\n')
}

// doc 57 "vật phóng thật" (@lukasai 2026-10-11): what the description says flies, flies as the thing itself: a textured body from
// scripts/gen/missiles.js flown a→b in the gameplay's own t, its wake from vfx-body.fx.js. It replaces the library's glow missile;
// the hero's own sounds stay. Visual only: hitbox, speed and damage stay heroes.yml's.
const BODY = {
  nham_vu: { lmb: { kind: 'arrow', scale: 1.3 }, q: { kind: 'arrow', scale: 1.3 }, rmb: { kind: 'arrow', head: 'amber', scale: 1.6 }, r: { kind: 'javelin', scale: 1.2 } },
  hoa_tuy: { lmb: { kind: 'coal', scale: 1.1 }, rmb: { kind: 'coal', scale: 1.5 } },
  kha_tan: { e: { kind: 'hook', scale: 1.4, chain: true, thick: true } },
  mi_dang: { q: { kind: 'lantern', scale: 1.2 } },
  huong_mai: { rmb: { kind: 'ring', scale: 1, spin: 720, hold: 0.18 } }, // out, then echoBolt flies it home: each leg is its own flight
  cot_ben: { q: { kind: 'harrow', scale: 1.3, chain: true } },
  ngu_dang: { q: { kind: 'bell', scale: 1.5, chain: true } }, // Ném Chuông: the bronze bell flies on its chain, the chain pays out and reels the catch in // Bừa Tre: the harrow flies, a bamboo cord pays out behind it and reels the catch in
}
export const bodyOf = (hero, slot) => BODY[hero]?.[slot] ?? null
const BODY_TRAIL = 'scripts/effects/vfx-body.fx.js'
function bodyRows(b, o) {
  const t = Math.max(0.06, o.t ?? 0.4)
  return [['body', { ...b, a: o.a, b: o.b, t, back: !!o.back && !b.spin }]]
}
// one flight: the body spawned at a, nosed at b, tweened there in t (out and home again for a returning throw); a chain pays out behind a hook
function flyBody(ctx, p) {
  const { a, b, t } = p, dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, L = Math.hypot(dx, dy, dz) || 0.01
  const rotation = { yaw: (Math.atan2(-dx, -dz) * 180) / Math.PI, pitch: (Math.atan2(dy, Math.hypot(dx, dz)) * 180) / Math.PI }
  const ret = !!(p.chain || p.back), dur = ret ? t * 2 : t, life = dur + 0.06 + (p.hold ?? 0), t0 = ctx.now(), sc = p.scale ?? 1
  const base = { rotation, lifetime: life, physics: 'none', castShadow: false, receiveShadow: false, interpolation: null, behavior: 'scripts/fx-body-fly.js' }
  const prim = (params) => ({ kind: 'scripted', script: 'scripts/gen/missiles.js', params })
  ctx.spawn({ ...base, feetPosition: { ...a }, scale: sc, primitive: prim({ kind: p.kind, ...(p.head ? { head: p.head } : {}), ...(p.thick ? { thick: true } : {}) }), fx: { script: BODY_TRAIL, params: { kind: p.head === 'amber' ? 'amber' : p.kind, scale: sc } }, state: { a, b, t0, dur, ret, ...(p.spin ? { spin: p.spin, yaw0: rotation.yaw } : {}) } })
  if (p.chain) ctx.spawn({ ...base, feetPosition: { ...a }, scale: { x: sc, y: sc, z: 0.01 }, primitive: prim({ kind: 'chain', len: Math.round((L / sc) * 10) / 10, ...(p.thick ? { thick: true } : {}) }), state: { a, b, t0, dur, ret: true, grow: true, sc } })
}

export function skillFx(ctx, hero, slot, ev, o, audience) {
  const sh = !audience && shapeOf(hero, slot, ev, o)
  if (sh) { if (o.holdShape) sh.life *= o.holdShape; drawShape(ctx, hero, sh) } // holdShape: review only, stretches the shape's life
  const bd = ev === 'fly' && o?.a && o?.b ? bodyOf(hero, slot) : null
  const own = KIT[hero]?.[slot]?.[ev], lib = bd ? (o) => bodyRows(bd, o) : libFx(hero, slot, ev)
  if (!own && !lib) return false
  // doc 55: the library draws the readable layer; on a basic or a missile the hand-made entry keeps only its sound and shake
  const f = !lib ? own : (o) => [...lib(o), ...(own ? own(o).filter(([n, p]) => (slot === 'lmb' || ev === 'fly') ? (n !== 'fx' || p?.keep) : true) : [])]
  const opts = audience ? { audience } : undefined
  LK = (o.light ?? 0.5) * GLASS.light
  for (const [name, payload] of f(o)) {
    if (o.calm && (name === 'screenShake' || name === 'shockwave')) continue // the dais stays still
    if (name === 'body') { if (!audience) { try { flyBody(ctx, payload) } catch (e) {} } continue }
    if (name === 'later') { if (!audience) { try { ctx.spawn({ feetPosition: payload.at ?? { x: 0, y: 0, z: 0 }, behavior: 'scripts/fx-later.js', lifetime: (payload.s ?? 0) + 2, state: { s: payload.s, rows: payload.rows } }) } catch (e) {} } continue } // a beat on the kit's own clock (Cốt Bện R release)
    if (name === 'wall') { if (!audience) { try { const id = ctx.spawn(payload); if (id) animate(ctx, id, { 'scale.x': [0.2, 1] }, { duration: 0.18 }) } catch (e) {} } continue } // a standing body of light (Hương Mai E)
    const p = name === 'fx' ? (({ keep, ...rest }) => ({ ...rest, script: glass(rest.script) }))(payload)
      : name === 'slash' ? { noise: 'forward', glow: 'light', edgeAlpha: 0.55, bodyColor1Alpha: 0.35, bodyColor2Alpha: 0.25, bodyColor3Alpha: 0.15, ...payload } // a torn, see-through stroke
      : name === 'shockwave' ? { ...payload, intensity: (payload.intensity ?? 0.5) * GLASS.wave } : payload
    ctx.emit(name, p, opts)
  }
  LK = 0.5
  return true
}
