// Per-hero SFX lookup (doc 34 · SFX_PROPOSED). heroSfx(hero, key) → "/cdn/…mp3" | null.
// key: lmb | q | rmb | e | r | passive | hit | death. null = no hero-specific clip: the caller keeps its shared SOUND.*.
import SFX from './data/hero-sfx.yml'

export const SFX_KEYS = ['lmb', 'q', 'rmb', 'e', 'r', 'passive', 'hit', 'death']

export function heroSfx(hero, key) {
  const name = SFX?.heroes?.[hero]?.[key]
  return name ? `${SFX.base}${name}` : null
}
