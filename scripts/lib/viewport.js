// What kind of screen this machine is: coarse = a finger; compact = phone or small window (the compact HUD).
export const coarse = () => typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches
// a short landscape phone or a small desktop window takes the compact HUD; a full-HD tab keeps the desktop one
// a hidden/parked tab can report a zero or shrunken viewport: it keeps the answer it had while visible, so a
// desktop tab never comes back wearing the mobile HUD (2026-10-09 @lukasai)
let LAST = null
export const compact = () => {
  if (coarse()) return true
  const off = (typeof document === 'object' && document?.visibilityState === 'hidden') || (typeof innerWidth === 'number' && (innerWidth < 64 || innerHeight < 64))
  if (off && LAST != null) return LAST
  LAST = typeof matchMedia === 'function' && matchMedia('(max-width: 960px), (max-height: 540px)').matches
  return LAST
}
