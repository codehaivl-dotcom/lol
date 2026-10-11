// Contact juice for every landed blow (the-feel): graded by weight so a basic swing, a skill and an ultimate
// read differently. The struck thing squashes and sprays along the blow; the striker alone gets the hitstop and a
// camera punch; one low thud under the swing's snap. Called on the striker's machine right after hurt() lands.
const SFX = (n) => `/cdn/moodboard-painterly-fantasy/sfx-${n}.mp3`
export const IMPACT_SOUND = {
  physical: SFX('heavy-blade-impact-thud'),
  magic: SFX('arcane-bolt-impact-crackle'),
  true: SFX('crystal-pierce-impact-ring'),
}
// weight: light = basic attack, heavy = Q/RMB/E, big = R or a passive proc
// doc54: sized for the MOBA camera (~18 m away): a basic hit's flash is a body-width bloom, sparks a hand long
const W = {
  light: { stop: 0.04, punch: 0.08, n: 14, spd: 6, sz: 0.14, flash: 0.95, squash: 0.16, knock: 0, vol: 0.5 },
  heavy: { stop: 0.06, punch: 0.14, n: 22, spd: 8, sz: 0.18, flash: 1.5, squash: 0.22, knock: 0.6, vol: 0.65 },
  big: { stop: 0.09, punch: 0.22, n: 34, spd: 10, sz: 0.22, flash: 2.3, squash: 0.3, knock: 1.1, vol: 0.85 },
}
const TINT = { physical: [3, 2.2, 1.2], magic: [1.8, 1.2, 3.2], true: [3, 3, 3] }

// u: a combat unit row (lib/combat.js units); from: the striker's feet; type: damage type
export function impact(ctx, u, from, type = 'physical', weight = 'light', strikerId) {
  const w = W[weight] ?? W.light
  let dx = u.pos.x - from.x, dz = u.pos.z - from.z
  const l = Math.hypot(dx, dz) || 1
  dx /= l; dz /= l
  const h = u.height ?? 1.8
  const at = { x: u.pos.x - dx * (u.r ?? 0.5) * 0.8, y: u.pos.y + h * 0.55, z: u.pos.z - dz * (u.r ?? 0.5) * 0.8 }
  const [r, g, b] = TINT[type] ?? TINT.physical
  const near = { audience: { nearby: at, radius: 45 } }
  ctx.emit('fx', { position: at, params: { normal: { x: dx, y: 0.25, z: dz } }, script: `fx
pop spark burst=${w.n} life=.22..0.42 v=<%normal|0,1,0>*(${w.spd}..${w.spd * 1.8})+sdir()*${(w.spd * 0.45).toFixed(1)} size=.02..${w.sz} acc=grav()*.6+drag(3) sz=$size col=<${r},${g},${b}> a=1>0 r=sprite(ember,add,velocity,.03)
pop flash burst=1 life=.12 size=${w.flash} sz=$size*(.5>1.3) col=<${r * 0.9},${g * 0.9},${b * 0.9}> a=1>0 r=sprite(soft-disc,add)
pop core burst=1 life=.07 size=${(w.flash * 0.4).toFixed(2)} sz=$size col=<4,4,4> a=1>0 r=sprite(soft-disc,add)
pop puff burst=${Math.round(w.n / 4)} life=.35..0.6 v=<%normal|0,1,0>*(.5..1.2)+sdir()*.5 size=.18..0.3 acc=drag(3)+buoy(.4) sz=$size*(.6>1.5) col=<.55,.5,.45> a=.35>0 r=sprite(smoke-puff,alpha)` }, near)
  if (u.kind !== 'structure') {
    ctx.emit('squash', { target: u.id, axis: 'z', intensity: w.squash, duration: 0.16 }, near)
    if (w.knock && u.kind === 'minion' && !u.h.state.knock) u.h.state.knock = { vx: dx * w.knock / 0.12, vz: dz * w.knock / 0.12, until: ctx.now() + 120 }
  }
  ctx.emit('playSound', { clip: IMPACT_SOUND[type] ?? IMPACT_SOUND.physical, position: at, volume: w.vol, pitch: 0.9 + ctx.random() * 0.2 }, near)
  if (strikerId) {
    const me = { audience: { player: strikerId } }
    ctx.emit('hitstop', { duration: w.stop }, me)
    ctx.emit('cameraPunch', { direction: { x: dx, y: 0, z: dz }, intensity: w.punch }, me)
  }
}

// a hero taking a blow: a red edge pulse on their own screen, scaled by how much of the bar it took
export function hurtPulse(ctx, playerId, frac) {
  if (frac < 0.02) return
  ctx.emit('screenFlash', { color: '#b0101a', duration: 0.18 + Math.min(0.3, frac), intensity: Math.min(0.45, 0.12 + frac * 2) }, { audience: { player: playerId } })
}
