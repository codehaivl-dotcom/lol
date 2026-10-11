// Đài Hồi Tưởng: the lobby stage on the cliff over Mạch Giữa (objects tagged "lobby", cell x0z0).
// While a player has no hero in a match, their own camera (scripts/camera.js) frames this stage and only the
// hero they are looking at stands on it (the other five are faded to 0 on their screen alone).
// Hero bodies and greeting clips live in the hero registry (scripts/lib/heroes.js: BODY, GESTURE).
import L from './data/lobby.yml'
import { sessionOf } from './session.js'
export const STAGE = { x: 31.1, y: 26, z: 31.1 }
const OUT = { x: 0.7071, z: 0.7071 }, SIDE = { x: 0.7071, z: -0.7071 }
const at = (o, s, y) => ({ x: STAGE.x + OUT.x * o + SIDE.x * s, y: STAGE.y + y, z: STAGE.z + OUT.z * o + SIDE.z * s })
// shots: eye and aim in stage space (out = toward the camera side, side = screen-left/right, y up)
export const SHOTS = {
  home: { eye: at(4.7, 0.2, 1.75), aim: at(0, -0.55, 1.12), fov: 42 },  // the hero a touch right of centre, big; logo and PLAY left
  hero: { eye: at(5.6, 0, 1.4), aim: at(0, 0, 1.1), fov: 38 },      // the hero centred between roster (left) and info (right), big
  play: { eye: at(9, 0, 1.3), aim: at(0, 0, 0.55), fov: 40 },        // dead centre: the hero stands inside the Play hub's portal ring
  pick: { eye: at(4.8, 0.2, 1.7), aim: at(0, 0.8, 1.05), fov: 42 },      // near centre: the team on the left, info on the right
}
export function shownHero(ps, player) {
  const s = player?.state ?? {}
  const se = sessionOf(ps), lb = se.lobby
  const uid = player?.userId ?? player?.id
  if (lb?.phase === 'picking' && lb.pick?.[uid]?.hero) return lb.pick[uid].hero
  if (lb?.phase === 'loading' && se.match?.roster?.[uid]) return se.match.roster[uid].hero
  return L.heroes.includes(s.browse) ? s.browse : L.heroes[0]
}
export function shotOf(ps, player) {
  const ph = sessionOf(ps).roomPhase
  const v = player?.state?.view
  if (ph === 'picking' || ph === 'loading') return 'pick'
  if (v == null || v === 'room') return 'play'
  if (v === 'heroes' || String(v ?? '').startsWith('done')) return 'hero'
  return 'home'
}

// the skill demo on the dais: player.state.demo = { keys, at } (hero.js); every screen reads the same clock
export const DEMO_STEP = 1.9
export function demoNow(s, now) {
  const d = s?.demo
  if (!d?.keys?.length) return null
  const i = Math.floor((now - d.at) / (DEMO_STEP * 1000))
  return i >= 0 && i < d.keys.length ? { key: d.keys[i], i, start: d.at + i * DEMO_STEP * 1000 } : null
}
