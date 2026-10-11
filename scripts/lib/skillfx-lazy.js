// B1 (doc 48 v3): skillfx.js (~57 KB) is not needed before a player stands, so it leaves the arrival set and loads
// with import() after standing (camera.js kicks it on its first frame) or on first need. Until it lands each call
// answers like a skill with no effect of its own: skillFx → false (the caller keeps its fallback), skillAnim /
// skillMotion → null. fxReady() lets the dais preview wait for it so the preview plays exactly as before.
// scripts/lib/loader.js: retried with backoff. A skill effect is never required to play, so a failure here only
// drops effects (callers keep their fallback); it stays off the load-fail card.
import { lazy } from './loader.js'
const LZ = { M: null, tick: 0 } // machine-local lazy handle
export function loadSkillFx() { if (!LZ.M) LZ.M = lazy('skillfx', () => import('./skillfx.js'), (LZ.tick += 33)) }
export const fxReady = () => !!LZ.M
export function skillFx(...a) { if (!LZ.M) { loadSkillFx(); return false } return LZ.M.skillFx(...a) }
export function skillAnim(...a) { if (!LZ.M) { loadSkillFx(); return null } return LZ.M.skillAnim(...a) }
export function skillMotion(...a) { if (!LZ.M) { loadSkillFx(); return null } return LZ.M.skillMotion(...a) }
export function isBaked(...a) { if (!LZ.M) { loadSkillFx(); return false } return !!LZ.M.isBaked?.(...a) } // a tab that loaded skillfx before isBaked existed answers false
