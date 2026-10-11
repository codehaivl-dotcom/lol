// Slice 1.5 referee acceptance harness (docs/co-linh-than-chien/11 §Slice 1.5, rules 14 §B0).
// 2026-10-10: pointed at the sanh referee (split, doc 51). Lobby/pick/host/mode/bot-seat checks hold here; the checks after
// handOff (GAME-*, RES-*, PRAC-* in-match, BOT body/results) belong to the match referee in main and need a two-place harness: OPEN.
// Drives places/main/sim.js tick() with a fake place: players, requests, clock. No engine, no network.
// Run: bun tools/test/lobby-referee.mjs   → one PASS/FAIL line per check, exit 1 on any FAIL.
const SIM = '/workspace/world/places/sanh/sim.js' // lobby referee lives in sanh since the split (doc 51)
let fails = 0, n = 0
const ok = (id, cond, what) => { n++; if (!cond) fails++; console.log(`${cond ? 'PASS' : 'FAIL'} ${id}: ${what}`) }

async function room() {
  const sim = await import(`${SIM}?r=${Math.random()}`) // a fresh module = a fresh referee (restart)
  const W = { t: 1000, players: [], state: {}, objects: {} }
  const ctx = {
    now: () => W.t, cross: () => ({ crossed: 'departing' }), random: () => 0.37, emit() {}, log() {}, spawn: (id, spec) => { if (typeof id !== 'string') { spec = id; id = spec.id ?? 'x' + Math.random() } W.objects[id] = { state: spec?.state ?? {} }; return id }, getObject: (id) => W.objects[id] ?? null,
    query: () => [], get world() { return { places: {}, players: W.players } }, get place() { return { state: W.state, players: W.players, playerCount: W.players.length, objects: W.objects } },
  }
  const r = {
    W, sim,
    tick(sec = 0.25) { W.t += sec * 1000; for (const p of W.players) if (!p.ghost) { p.state.beat = W.t; p.state.activeAt = W.t }; r.sim.tick(ctx) },
    run(sec) { for (let s = 0; s < sec; s += 0.25) r.tick() },
    join(uid) { W.players.push({ id: 'p-' + uid, userId: uid, displayName: uid.toUpperCase(), state: {} }); r.tick() },
    ghost(uid) { const p = r.p(uid); if (p) p.ghost = true; else W.players.push({ id: 'p-' + uid, userId: uid, displayName: uid.toUpperCase(), state: {}, ghost: true }); r.tick() },
    drop(uid) { W.players = W.players.filter((p) => p.userId !== uid); r.tick() },
    p: (uid) => W.players.find((p) => p.userId === uid),
    seq: {},
    req(uid, op, args = {}, again) { const s = again ? r.seq[uid] : (r.seq[uid] = (r.lb().ack[uid] ?? 0) + 1); r.p(uid).state.lobbyReq = { seq: s, op, ...args }; r.tick() },
    lb: () => W.state.lobby, err: (uid) => W.state.lobby.err[uid]?.code ?? null,
    restart: async () => { const fresh = await import(`${SIM}?r=${Math.random()}`); r.sim = fresh },
  }
  return r
}

// LOBBY-02 host
{ const r = await room(); r.join('a'); r.join('b'); r.join('c')
  ok('LOBBY-02', r.lb().host === 'a', 'first arrival is host')
  r.drop('a'); ok('LOBBY-02', r.lb().host === 'b', 'host leaves → next earliest is host within one 250 ms tick') }

// LOBBY-03 teams + team_full
{ const r = await room(); for (const u of 'abcdefghijk') r.join(u)
  const L = r.lb(); ok('LOBBY-03', L.teams.blue.length === 5 && L.teams.red.length === 5, `auto-seat fills 5/5 (got ${L.teams.blue.length}/${L.teams.red.length}), 11th spectates`)
  r.req('k', 'join', { team: 'blue' }); ok('LOBBY-03', r.err('k') === 'team_full', '6th into a full team → team_full')
  r.req('a', 'leave'); ok('LOBBY-03', !r.lb().teams.blue.includes('a'), 'leave frees the slot')
  r.req('k', 'join', { team: 'blue' }); ok('LOBBY-03', r.lb().teams.blue.includes('k'), 'join into the freed slot')
  r.req('c', 'join', { team: 'red' }); ok('LOBBY-03', r.err('c') === 'team_full' && r.lb().teams.blue.includes('c'), 'switch into full red → team_full') }

// LOBBY-04 permissions
{ const r = await room(); r.join('a'); r.join('b')
  const before = JSON.stringify([r.lb().mode, r.lb().phase])
  r.req('b', 'mode', { mode: 'san_tap', map: 'mach_giua' }); ok('LOBBY-04', r.err('b') === 'not_host' && r.lb().mode === 'tai_hien', 'non-host mode → not_host, unchanged')
  r.req('b', 'start'); ok('LOBBY-04', r.err('b') === 'not_host' && JSON.stringify([r.lb().mode, r.lb().phase]) === before, 'non-host start → not_host, unchanged')
  ok('LOBBY-04', r.lb().ack.b === r.seq.b, 'rejected requests are still acked') }

// LOBBY-05 no repeats, restart-safe
{ const r = await room(); r.join('a'); r.join('b'); r.join('c')
  r.req('c', 'join', { team: 'blue' }); const once = JSON.stringify(r.lb().teams)
  r.req('c', 'join', { team: 'blue' }, true); r.req('c', 'join', { team: 'blue' }, true)
  ok('LOBBY-05', JSON.stringify(r.lb().teams) === once, 'same seq 3× = once')
  await r.restart(); r.req('c', 'join', { team: 'blue' }, true)
  ok('LOBBY-05', JSON.stringify(r.lb().teams) === once && r.lb().ack.c === r.seq.c, 'restarted referee ignores the old seq (ack lives in place.state)') }

// LOBBY-06 start rules
{ const r = await room(); r.join('a'); r.req('a', 'start')
  ok('LOBBY-06', r.err('a') === 'bad_phase' && r.lb().phase === 'lobby', 'tai_hien with an empty team cannot start')
  r.req('a', 'mode', { mode: 'san_tap', map: 'mach_giua' }); r.req('a', 'start')
  ok('LOBBY-06', r.lb().phase === 'picking', 'san_tap: host always starts') }

// PICK-01 picking
{ const r = await room(); for (const u of 'abcd') r.join(u) // blue a,c  red b,d
  r.req('a', 'start'); ok('PICK-01', r.lb().phase === 'picking' && Math.round((r.lb().phaseEndsAt - r.W.t) / 1000) === 30, '30 s pick clock')
  r.req('a', 'hover', { hero: 'moc_lam' }); ok('PICK-01', r.lb().pick.a.hero === 'moc_lam' && !r.lb().pick.a.locked, 'hover visible in lobby.pick')
  r.req('a', 'lock'); r.req('c', 'hover', { hero: 'moc_lam' })
  ok('PICK-01', r.err('c') === 'hero_taken' && r.lb().pick.c.hero !== 'moc_lam', 'same hero on the same team → hero_taken')
  r.req('b', 'hover', { hero: 'moc_lam' }); ok('PICK-01', r.err('b') === 'hero_taken' && r.lb().pick.b?.hero !== 'moc_lam', 'PvP: the other team may not take it either (2026-10-08)')
  r.run(31); ok('PICK-01', r.lb().phase === 'loading' || r.lb().phase === 'ingame', 'timeout ends picking')
  const ro = r.W.state.match.roster; const blue = ['a', 'c'].map((u) => ro[u].hero)
  ok('PICK-01', Object.keys(ro).length === 4 && new Set(Object.values(ro).map((x) => x.hero)).size === 4 && ro.c.hero && ro.d.hero, `unlocked get a random free hero (blue ${blue}, red ${ro.b.hero},${ro.d.hero})`)
  r.run(3.5); ok('PICK-01', r.lb().phase === 'ingame' && ['a', 'b', 'c', 'd'].every((u) => r.p(u).state.ticket), 'loading 3 s → ingame, every human holds a ticket to the map place (split, doc 51)') }
{ const r = await room(); r.join('a'); r.join('b'); r.req('a', 'start'); r.req('a', 'hover', { hero: 'kha_tan' }); r.req('a', 'lock'); r.req('b', 'hover', { hero: 'van_dao' }); r.req('b', 'lock')
  ok('PICK-01', r.lb().phase === 'loading', 'all locked → loading at once') }

// PICK-02 cancel
{ const r = await room(); r.join('a'); r.join('b'); r.req('a', 'start'); r.drop('b')
  ok('PICK-02', r.lb().phase === 'lobby' && r.lb().notice?.key === 'err.cancelled', 'a team empties while picking → lobby with notice') }

// GAME-01 / GAME-02 / RES-01
{ const r = await room(); r.join('a'); r.join('b')
  ok('GAME-01', r.W.state.phase === 'waiting', 'no lane phase before ingame')
  r.req('a', 'start'); r.req('a', 'hover', { hero: 'mi_dang' }); r.req('a', 'lock'); r.req('b', 'hover', { hero: 'nham_vu' }); r.req('b', 'lock'); r.run(3.5)
  const ro = r.W.state.match.roster
  ok('GAME-01', ro.a.team === 'blue' && ro.a.hero === 'mi_dang' && ro.b.team === 'red' && ro.b.hero === 'nham_vu' && r.W.state.phase === 'playing', 'roster frozen with the picks, lane runs only now')
  Object.assign(r.p('b').state, { hero: 'nham_vu', team: 'red', level: 4, xp: 900, gold: 1234, items: ['x'], kills: 2, deaths: 1, cs: 17 }); r.tick()
  r.drop('b'); const sv = r.W.state.match.saved.b
  ok('GAME-02', sv && sv.level === 4 && sv.gold === 1234 && sv.cs === 17 && r.lb().disconnected.b > r.W.t, 'disconnect snapshots level/gold/items/K/D/cs and holds the slot 60 s')
  r.run(20); r.join('b'); ok('GAME-02', !r.lb().disconnected.b && r.W.state.match.roster.b.hero === 'nham_vu', 'back within 60 s: same roster row, hold cleared')
  r.drop('b'); r.run(61); ok('GAME-02', r.W.state.match.roster.b.left === true && r.lb().phase === 'ingame', 'past 60 s the slot reads left, match runs on')
  r.join('b'); Object.assign(r.p('a').state, { hero: 'mi_dang', team: 'blue', level: 7, kills: 5, deaths: 0, cs: 40, gold: 3000 }); r.tick()
  r.W.objects['nexus-red'] = { state: { fallen: true } }; r.tick()
  const R = r.W.state.results, ra = R?.rows.find((x) => x.userId === 'a')
  ok('RES-01', R?.winner === 'blue' && ra.level === 7 && ra.k === 5 && ra.cs === 40 && ra.gold === 3000 && r.lb().phase === 'results', 'results snapshot this match\'s rows before any reset')
  delete r.W.objects['nexus-red']; r.run(20.5)
  ok('RES-01', r.lb().phase === 'lobby' && r.lb().host === 'a' && r.lb().teams.blue.includes('a') && r.lb().teams.red.includes('b'), '20 s → whole room back in lobby, teams and host kept') }

// PRAC-01 / PRAC-02
{ const r = await room(); for (const u of 'abc') r.join(u)
  r.req('a', 'mode', { mode: 'san_tap', map: 'mach_giua' })
  ok('PRAC-02', JSON.stringify(r.lb().teams) === JSON.stringify({ blue: ['a'], red: [] }), 'san_tap: everyone else leaves the teams')
  r.req('b', 'join', { team: 'blue' }); ok('PRAC-02', r.err('b') === 'spectator' && !r.lb().teams.blue.includes('b'), 'spectator join → spectator, unchanged')
  r.req('a', 'start'); r.req('a', 'hover', { hero: 'hoa_tuy' }); r.req('a', 'lock'); r.run(3.5)
  ok('PRAC-02', Object.keys(r.W.state.match.roster).join() === 'a', 'only the host is rostered (spectators get no body)')
  const round = r.W.state.round; r.req('a', 'practice', { action: 'reset' })
  ok('PRAC-01', r.lb().phase === 'ingame' && r.W.state.round === round + 1, 'Làm lại: new round, still ingame')
  r.req('b', 'practice', { action: 'end' }); ok('PRAC-01', r.err('b') === 'not_host' && r.lb().phase === 'ingame', 'only the host may end')
  r.W.objects['nexus-red'] = { state: { fallen: true } }; r.tick()
  ok('PRAC-01', r.lb().phase === 'results' && r.W.state.results.winner === null, 'red nexus broken in Sân Tập → results, winner null')
  delete r.W.objects['nexus-red']; r.run(20.5)
  r.req('a', 'start'); r.req('a', 'lock'); r.req('a', 'hover', { hero: 'van_dao' }); r.req('a', 'lock'); r.run(3.5)
  r.req('a', 'practice', { action: 'end' }); ok('PRAC-01', r.lb().phase === 'lobby' && !r.W.state.results, 'Kết thúc: straight to lobby, no results')
  for (const u of 'defghijkl') r.join(u)
  r.req('a', 'mode', { mode: 'tai_hien', map: 'mach_giua' }); const L = r.lb()
  ok('PRAC-02', L.teams.blue[0] === 'a' && L.teams.blue.length === 5 && L.teams.red.length === 5 && L.teams.red[0] === 'b' && L.teams.blue[1] === 'c', `back to 5v5: joinOrder into the smaller team, ties blue (blue ${L.teams.blue}, red ${L.teams.red})`)
  ok('PRAC-02', !L.teams.blue.includes('l') && !L.teams.red.includes('l') && L.joinOrder.includes('l'), '11th+ keeps spectating') }

// PRAC-03 practice reload/drop (creator decision 2026-10-08, doc14 P3)
{ const r = await room(); for (const u of 'ab') r.join(u)
  r.req('a', 'mode', { mode: 'san_tap', map: 'mach_giua' }); r.req('a', 'start'); r.req('a', 'hover', { hero: 'kha_tan' }); r.req('a', 'lock'); r.run(3.5)
  Object.assign(r.p('a').state, { hero: 'kha_tan', team: 'blue', level: 5, gold: 900, items: ['y'] }); r.tick()
  r.drop('a')
  ok('PRAC-03', r.lb().phase === 'ingame' && r.lb().host === 'a', 'host reload: practice keeps running, host held')
  r.run(30); ok('PRAC-03', r.lb().host === 'a' && r.lb().host !== 'b', 'spectator never takes the crown during the 60 s hold')
  r.join('a'); ok('PRAC-03', r.lb().phase === 'ingame' && r.lb().host === 'a' && !r.lb().disconnected.a && r.W.state.match.saved.a?.level === 5, 'back within 60 s: same match restored, saved row kept')
  r.drop('a'); r.run(61)
  ok('PRAC-03', r.lb().phase === 'lobby' && r.lb().notice?.key === 'err.practiceLeft' && !r.W.state.match, 'gone past 60 s → practice cancelled, back to lobby with notice')
  ok('PRAC-03', r.lb().host === 'b', 'in the lobby the room hands host on as usual') }
{ const r = await room(); for (const u of 'ab') r.join(u)
  r.req('a', 'mode', { mode: 'san_tap', map: 'mach_giua' }); r.req('a', 'start'); r.req('a', 'lock'); r.run(31); r.run(3.5)
  r.req('a', 'practice', { action: 'end' })
  ok('PRAC-03', r.lb().phase === 'lobby' && !r.W.state.match, 'intentional leave (Kết thúc) cancels at once') }
{ const r = await room(); for (const u of 'ab') r.join(u)
  r.req('a', 'mode', { mode: 'san_tap', map: 'mach_giua' }); r.req('a', 'start'); r.req('a', 'lock'); r.run(31); r.run(3.5)
  r.req('b', 'leave'); ok('PRAC-03', r.lb().phase === 'ingame', 'a spectator leave request does not touch the practice')
  r.req('a', 'leave'); ok('PRAC-03', r.lb().phase === 'lobby' && !r.W.state.match && r.lb().notice?.key === 'err.soloLeft', 'host leave request mid-practice cancels at once with notice') }
{ const r = await room(); for (const u of 'ab') r.join(u)
  r.req('a', 'mode', { mode: 'thu_tran', map: 'mach_giua' }); r.req('a', 'start'); r.req('a', 'lock'); r.run(31); r.run(3.5)
  ok('PRAC-03', r.lb().phase === 'ingame', 'Đấu Máy ingame')
  r.req('a', 'leave'); ok('PRAC-03', r.lb().phase === 'lobby' && !r.W.state.match && r.lb().notice?.key === 'err.soloLeft' && !r.W.objects['bot-red-1'], 'Đấu Máy: Rời trận cancels at once, bots cleared') }

// PRAC-04 parked bodies (Codex client run 2026-10-08): a body with no live tab neither holds host nor resets the hold
{ const r = await room(); for (const u of 'ab') r.join(u)
  r.req('a', 'mode', { mode: 'san_tap', map: 'mach_giua' }); r.req('a', 'start'); r.req('a', 'lock'); r.run(31); r.run(3.5)
  r.ghost('a'); r.run(15.25); const until = r.lb().disconnected.a
  ok('PRAC-04', until && r.lb().host === 'a' && r.lb().phase === 'ingame', 'tab closes, body stays parked → hold starts, host held')
  ok('PRAC-04', Math.abs(until - (r.W.t - 15250 + 60000)) <= 250, '60 s counts from the last beat, not from when the room noticed')
  r.run(30); ok('PRAC-04', r.lb().disconnected.a === until, 'parked body still listed: deadline does not move')
  r.run(16); ok('PRAC-04', r.lb().phase === 'lobby' && r.lb().notice?.key === 'err.practiceLeft', 'cancel at the first deadline')
  ok('PRAC-04', r.lb().host === 'b', 'parked host body does not keep the lobby crown') }
{ const r = await room(); r.join('a'); r.ghost('z')
  ok('PRAC-04', r.lb().host === 'a' && !r.lb().joinOrder.includes('z'), 'a parked body never joins or becomes host') }
{ const r = await room(); r.join('a'); r.join('b'); r.ghost('a'); r.run(15.25)
  ok('PRAC-04', r.lb().host === 'b', 'lobby: parked host hands the crown to the live player') }

console.log(`\n${n - fails}/${n} PASS`); process.exit(fails ? 1 : 0)
