// A hero's fall (doc 25 "Động tác chết"): the Blender-keyed death clip from skill-clips.yml, played once on the
// gesture channel as an override (it replaces the gait on every bone it keys) and held on its last frame; the body
// is hidden HOLD_MS after the clip ends. Shared by hero.js and bot.js; visual only: death, rewards and respawn timing
// stay hero.js/bot.js's.
import BAKED from './data/skill-clips.yml' // hero → death → [clip, seconds as authored, ground-touch seconds]
export const HOLD_MS = 600
// → { row, hideMs, groundMs } or null (a hero with no death row: hide at once, as before)
export function deathAnim(hero, now) {
  const d = BAKED?.[hero]?.death
  if (!d) return null
  const [clip, len, ground = len * 0.7] = d
  return {
    row: { clip, weight: 4, blend: 'override', speed: 1, loop: 'once', blendIn: 0.08, time: 0, timeAt: now }, // no duration: a once clip holds its last key
    hideMs: Math.round(len * 1000) + HOLD_MS,
    groundMs: Math.round(ground * 1000),
  }
}
