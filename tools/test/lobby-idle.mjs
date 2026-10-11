// Idle lobby tab (2026-10-10 @lukasai: "Tab sảnh cũ không được tự ngồi lại ghế trong phòng mới khi người chơi chưa
// xác nhận tham gia"). Drives scripts/referee/lobby.js lobbyTick with a fake place. Run: bun tools/test/lobby-idle.mjs
import { lobbyTick } from '../../scripts/referee/lobby.js'
let fails = 0; const ok = (c, m) => { if (!c) fails++; console.log(`${c ? 'PASS' : 'FAIL'} ${m}`) }
const W = { t: 100000, players: [], state: {}, objects: {} }
const ctx = { now: () => W.t, log() {}, emit() {}, cross: () => ({ crossed: 'departing' }), query: () => [], getObject: () => null, spawn: () => 'x',
  get place() { return { state: W.state, players: W.players, playerCount: W.players.length, objects: W.objects } },
  get world() { return { players: W.players, places: {}, state: {}, mode: 'dev' } } }
const tick = (n = 1) => { for (let i = 0; i < n; i++) { W.t += 250; for (const p of W.players) if (!p.parked) p.state.beat = W.t; lobbyTick(ctx) } }
const P = (u, st = {}) => { const p = { id: 'p-' + u, userId: u, displayName: u, state: st }; W.players.push(p); return p }
const seated = (u) => W.state.lobby.teams.blue.includes(u) || W.state.lobby.teams.red.includes(u)
P('host', { bootAt: W.t }); tick(2)
ok(seated('host'), 'a page that just opened is seated (host)')
const old = P('old', { bootAt: W.t - 3600000, activeAt: W.t - 3600000 }); tick(2)
ok(!seated('old'), 'an old idle tab arriving (woken) spectates')
ok(W.state.lobby.joinOrder.includes('old'), 'it is still in the room (can press Join)')
old.state.lobbyReq = { seq: 1, op: 'join', team: 'blue' }; tick(2)
ok(seated('old'), 'its player presses Join: seated')
const act = P('act', { bootAt: W.t - 3600000, activeAt: W.t - 5000 }); tick(2)
ok(seated('act'), 'a tab its player is using is seated')
console.log(fails ? `${fails} FAIL` : 'lobby-idle: all pass'); process.exit(fails ? 1 : 0)
