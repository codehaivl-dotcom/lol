// Hands each hero their weapons (scripts/lib/data/weapons.yml): children of a body riding its hand bones,
// seated in the closed fist by scripts/lib/data/grips.yml (baked per rig by tools/rig/grips.py), and the
// hand pose that closes the fingers round them (gripChannel: a mixer channel of raw finger-bone tracks).
// Used by scripts/camera.js (the local lobby preview) and scripts/hero.js (the match body, seen by everyone).
import W from './data/weapons.yml'
import G from './data/grips.yml'

// rig: null = the hero's own GLB (the lobby preview) · 'avatar' = the match body (the player's neutral avatar rig)
const grip = (hero, rig) => (rig ? G[hero]?.[rig] : G[hero]) ?? G[hero]
export function weaponSpecs(hero, audience, rig) {
  return (W.heroes[hero] ?? []).map((w, i) => {
    const seat = grip(hero, rig)?.pieces?.[i] ?? {}
    const [x = 0, y = 0, z = 0] = seat.offset ?? w.offset ?? []
    const q = seat.quat ?? w.quat
    const spec = {
      tags: ['weapon', `weapon-${w.kind}`], attachment: { bone: W.bones[w.hand] ?? W.bones.right },
      feetPosition: { x, y, z }, rotation: q ? { x: q[0], y: q[1], z: q[2], w: q[3] } : { yaw: 0, pitch: 0, roll: 0, ...(w.rotation ?? {}) }, scale: w.scale ?? 1,
      primitive: { kind: 'scripted', script: 'scripts/gen/weapons.js', params: { kind: w.kind } },
      material: { pbr: true }, castShadow: true, state: { weapon: w.kind, hand: w.hand, slot: i },
    }
    if (audience) spec.audience = audience
    if (w.light) {
      const [lx = 0, ly = 0, lz = 0] = w.light.at ?? []
      spec.children = [{ tags: ['weapon-light'], feetPosition: { x: lx, y: ly, z: lz }, light: { kind: 'point', color: w.light.color, intensity: Math.min(1, w.light.intensity ?? 1), distance: w.light.distance ?? 3 }, ...(audience ? { audience } : {}) }]
    }
    return spec
  })
}

// the closed hand(s): a mixer channel that overrides only the holding hands' finger bones; the arm stays the gait's/gesture's
export function gripChannel(hero, rig) {
  const f = grip(hero, rig)?.fingers
  if (!f) return null
  return {
    clip: { name: `grip-${hero}${rig ? '-' + rig : ''}`, tracks: Object.entries(f).map(([bone, q]) => ({ bone, prop: 'rotation', times: [0, 1], values: [...q, ...q] })) },
    weight: 1, loop: 'loop', blend: 'override',
  }
}

// spawn the hero's weapons under body; returns their ids
export function armBody(ctx, bodyId, hero, audience, rig) {
  return weaponSpecs(hero, audience, rig).map((s) => ctx.spawn({ ...s, parent: bodyId }))
}

// destroy every weapon riding body
export function disarmBody(ctx, bodyId) {
  for (const r of ctx.query({ tags: ['weapon'] })) {
    const o = ctx.getObject(r.id)
    if (o && (o.parent?.id ?? o.parent) === bodyId) ctx.destroy(r.id)
  }
}
