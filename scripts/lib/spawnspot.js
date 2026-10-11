// Where a hero stands at its fountain (start, respawn, recall): SPAWN_OUT m off the basin toward the map's centre, and
// a seat of its own along the line across it, so a full 5v5 team never stands stacked on one point (@lukasai 2026-10-10
// "Kiểm tra chính xác 10 vị trí spawn"). Shared by players (hero/match/base.js) and bots (scripts/bot.js).
export const SPAWN_OUT = 5
export const SEAT_GAP = 2.2 // m between neighbouring seats; slot 0..4 → −2..+2 gaps around the centre spot
export function seatSpot(ctx, f, slot) {
  const l = Math.hypot(f.x, f.z) || 1, ux = f.x / l, uz = f.z / l
  const k = Number.isInteger(slot) ? Math.max(0, Math.min(4, slot)) - 2 : 0
  const x = f.x - ux * SPAWN_OUT - uz * k * SEAT_GAP, z = f.z - uz * SPAWN_OUT + ux * k * SEAT_GAP
  return { x, y: (ctx.place.terrain.heightAt(x, z) ?? 0) + 1.0, z }
}
