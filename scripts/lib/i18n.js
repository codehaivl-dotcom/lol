// t(key, locale, vars): the one way a screen reads words (docs 09 §1, 14 §B0.5).
// B1 (doc 48 v3): vi-VN rides the boot (strings.yml); en is strings-en.yml, fetched with import() the first time a
// render asks for locale 'en'. Until it lands, and for any key it lacks, the line reads vi-VN, then the key itself.
// Lô E (2026-10-11): long vi-VN text (tip.*, hero.<h>.bio, hero.<h>.<slot>.desc, lore.*) lives in strings-long.yml,
// fetched with import() on the first t() call (after standing), so it stays off the match arrival. Until it lands a
// long key reads '' (never the raw key). Split by tools/l10n/split-strings.py.
import STR from './data/strings.yml'
export const LOCALES = ['vi-VN', 'en']
let EN = null, asked = false, LONG = null, askedLong = false
const IS_LONG = /^(tip\.|lore\.|hero\.[a-z_]+\.bio$|hero\.[a-z_]+\.[a-z]+\.desc$)/
export function loadEn() {
  if (asked) return
  asked = true
  import('./data/strings-en.yml').then((m) => { EN = m.default ?? m }).catch(() => { asked = false })
}
export function loadLong() {
  if (askedLong) return
  askedLong = true
  import('./data/strings-long.yml').then((m) => { LONG = m.default ?? m }).catch(() => { askedLong = false })
}
export const enReady = () => !!EN
export const longReady = () => !!LONG
export const hasKey = (key) => key in STR || (LONG ? key in LONG : IS_LONG.test(key))
export function localeOf(player) { return player?.state?.locale === 'en' ? 'en' : 'vi-VN' }
const vi = (row) => (row == null ? null : typeof row === 'object' ? row['vi-VN'] : row)
export function t(key, locale, vars) {
  if (!LONG) loadLong()
  let s
  if (locale === 'en') { if (!EN) loadEn(); s = EN?.[key] }
  if (s == null) s = vi(STR[key]) ?? vi(LONG?.[key]) ?? (!LONG && IS_LONG.test(key) ? '' : key)
  if (s == null) s = String(key ?? '')
  if (vars) for (const k in vars) s = String(s).split(`{${k}}`).join(String(vars[k]))
  return s
}
