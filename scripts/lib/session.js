// The one door to the room's session (doc 44 §10 C1). Every screen and behavior READS the room through here;
// places/main/sim.js (the referee) is the only writer of lobby / match / results.
// Today it all lives in place.state; when the lobby and the maps become separate places, only this file changes.
//   lobby   room: phase (lobby | picking | loading | ingame | results), mode, map, host, teams, picks, ack, err
//   match   roster, saved, startedAt          results  the last match's table
//   battle  the field's clock: phase (waiting | playing | ended), startedAt, winner, round, wave
const EMPTY_LOBBY = { phase: 'lobby', teams: { blue: [], red: [] }, joinOrder: [], names: {}, pick: {}, ack: {}, err: {} }

export function sessionOf(bag) {
  const s = bag ?? {}
  return {
    lobby: s.lobby ?? null,
    room: s.lobby ?? EMPTY_LOBBY,
    roomPhase: s.lobby?.phase ?? 'lobby',
    match: s.match ?? null,
    results: s.results ?? null,
    battle: { phase: s.phase ?? 'waiting', startedAt: s.startedAt ?? null, winner: s.winner ?? null, round: s.round ?? 0, wave: s.wave ?? 0 },
    bots: s.bots ?? {},
    feed: s.feed ?? null,
  }
}
export const session = (ctx) => sessionOf(ctx.place.state)

// the few writes a match behavior owns besides the referee
export function postFeed(ctx, key, vars) { ctx.place.state.feed = { key, vars, at: ctx.now() } }
export function setBotRow(ctx, id, row) { ctx.place.state.bots = { ...(ctx.place.state.bots ?? {}), [id]: row } }
