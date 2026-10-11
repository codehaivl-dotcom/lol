// The one door to battlefield data (doc 44 §10 C2). Today one map (Mạch Giữa, data/map.yml); when maps become
// their own places, mapOf(ctx) picks the map by ctx.place and MAP stays the default for code that has no ctx.
import MAINLINE from './data/map.yml'
export const MAP = MAINLINE
export const MAPS = { mach_giua: MAINLINE }
export function mapOf(ctx) { return MAPS[ctx?.place?.state?.mapId] ?? MAINLINE }
