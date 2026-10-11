// 5v5 room regression (2026-10-10 @lukasai). Drives scripts/referee/core.js handleLobby/finishPicking + lib/spawnspot.js.
// Run: bun tools/test/room-5v5.mjs
import { handleLobby, fresh, finishPicking, startPicking, teamOf } from '../../scripts/referee/core.js'
import { seatSpot } from '../../scripts/lib/spawnspot.js'
import { MAP } from '../../scripts/lib/map.js'
let fails = 0; const ok = (c, m) => { if (!c) fails++; console.log(`${c ? 'PASS' : 'FAIL'} ${m}`) }
let t = 1000, rnd = 0.37
const ctx = { now: () => t, random: () => (rnd = (rnd * 9301 + 0.4927) % 1), log() {}, place: { players: [], terrain: { heightAt: () => 0 } } }
const lb = fresh(); lb.host = 'h'; lb.joinOrder = ['h', 'g']; lb.teams.blue = ['h']; lb.teams.red = ['g']; lb.names = { h: 'H', g: 'G' }
const req = (u, r) => handleLobby(ctx, {}, lb, u, r)
ok(req('g', { op: 'addBot', team: 'blue' }) === 'not_host', 'guest cannot add a bot')
for (let i = 0; i < 4; i++) req('h', { op: 'addBot', team: 'blue' })
for (let i = 0; i < 4; i++) req('h', { op: 'addBot', team: 'red' })
ok(lb.teams.blue.length === 5 && lb.teams.red.length === 5, `10 seats (${lb.teams.blue.length}/${lb.teams.red.length})`)
ok(req('h', { op: 'addBot', team: 'red' }) === 'team_full', '11th seat refused: team_full')
const ids = [...lb.teams.blue, ...lb.teams.red]; ok(new Set(ids).size === 10, 'no seat twice')
const b = lb.teams.red.find((u) => u.startsWith('bot-'))
ok(req('g', { op: 'removeBot', id: b }) === 'not_host', 'guest cannot remove a bot')
ok(req('h', { op: 'removeBot', id: b }) === null && !teamOf(lb, b), 'host removes a bot')
req('h', { op: 'addBot', team: 'red' }); ok(lb.teams.red.length === 5, 'host adds it back: 5/5')
startPicking(ctx, lb)
ok(req('h', { op: 'lock', hero: 'moc_lam' }) === null, 'host locks moc_lam')
// same team: a human teammate can't take it (only one human per team here, so check the rule directly)
lb.teams.blue.push('h2'); lb.pick.h2 = { hero: null, locked: false }
ok(req('h2', { op: 'lock', hero: 'moc_lam' }) === 'hero_taken', 'teammate locking the same hero: hero_taken')
lb.teams.blue = lb.teams.blue.filter((u) => u !== 'h2'); delete lb.pick.h2
const s = {}; finishPicking(ctx, s, lb)
const R = s.match?.roster ?? {}
for (const team of ['blue', 'red']) { const hs = Object.values(R).filter((r) => r.team === team).map((r) => r.hero); ok(hs.length === 5 && new Set(hs).size === 5, `${team}: 5 heroes, none twice in the team (${hs.join(',')})`) }
const spots = Object.values(R).map((r) => seatSpot(ctx, { x: MAP.fountains[r.team][0], z: MAP.fountains[r.team][1] }, r.slot))
let minGap = Infinity; for (let i = 0; i < spots.length; i++) for (let j = i + 1; j < spots.length; j++) minGap = Math.min(minGap, Math.hypot(spots[i].x - spots[j].x, spots[i].z - spots[j].z))
ok(minGap >= 2, `10 spawn spots, nearest two ${minGap.toFixed(2)} m apart (≥ 2 m)`)
console.log(fails ? `${fails} FAIL` : 'room-5v5: all pass'); process.exit(fails ? 1 : 0)
