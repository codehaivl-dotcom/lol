// Đấu Máy (thu_tran) trọn vòng — mock trọng tài NGOÀI ENGINE (docs/co-linh-than-chien/15, luật 14 §B0, doc14 P3).
// 2026-10-10: pointed at the sanh referee (split, doc 51). Lobby/pick/host/mode/bot-seat checks hold here; the checks after
// handOff (GAME-*, RES-*, PRAC-* in-match, BOT body/results) belong to the match referee in main and need a two-place harness: OPEN.
// Chạy places/main/sim.js tick() với một place giả: người chơi, request, đồng hồ, objects. Không engine, không mạng,
// không client: PASS ở đây chỉ là logic trọng tài, KHÔNG phải client PASS.
// Run: bun tools/test/lobby-referee-bot.mjs   → một dòng PASS/FAIL mỗi kiểm tra, exit 1 nếu có FAIL.
const SIM = new URL('../../places/sanh/sim.js', import.meta.url).pathname // lobby referee lives in sanh since the split
const L = (await import(new URL('../../scripts/lib/data/lobby.yml', import.meta.url).pathname)).default
let fails = 0, n = 0
const ok = (id, cond, what) => { n++; if (!cond) fails++; console.log(`${cond ? 'PASS' : 'FAIL'} ${id}: ${what}`) }
const BOT = 'bot-red-1'

async function room() {
  const sim = await import(`${SIM}?r=${Math.random()}`)
  const W = { t: 1000, players: [], state: {}, objects: {}, spawned: [] }
  const ctx = {
    now: () => W.t, cross: () => ({ crossed: 'departing' }), random: () => 0.37, emit() {}, log() {}, query: () => [], destroy: (id) => { delete W.objects[id] },
    spawn: (id, spec) => { if (typeof id !== 'string') { spec = id; id = spec.id ?? 'x' + Math.random() } W.objects[id] = { state: spec?.state ?? {}, parent: spec?.parent ?? null, behavior: spec?.behavior, tags: spec?.tags }; W.spawned.push(id); return id },
    getObject: (id) => W.objects[id] ?? null,
    query: () => [], get world() { return { places: {}, players: W.players } }, get place() { return { state: W.state, players: W.players, playerCount: W.players.length, objects: W.objects } },
  }
  const r = {
    W, sim,
    tick(sec = 0.25) { W.t += sec * 1000; for (const p of W.players) if (!p.ghost) { p.state.beat = W.t; p.state.activeAt = W.t }; r.sim.tick(ctx) },
    run(sec) { for (let s = 0; s < sec; s += 0.25) r.tick() },
    join(uid) { W.players.push({ id: 'p-' + uid, userId: uid, displayName: uid.toUpperCase(), state: {} }); r.tick() },
    drop(uid) { W.players = W.players.filter((p) => p.userId !== uid); r.tick() },
    p: (uid) => W.players.find((p) => p.userId === uid),
    seq: {},
    req(uid, op, args = {}) { const s = (r.seq[uid] = (r.lb().ack[uid] ?? 0) + 1); r.p(uid).state.lobbyReq = { seq: s, op, ...args }; r.tick() },
    lb: () => W.state.lobby, err: (uid) => W.state.lobby.err[uid]?.code ?? null,
    nexus(team) { W.objects['nexus-' + team] = { state: { team, fallen: true } } },
    // lane.js resets structures on a new round in the engine; the mock stands in for it
    clearNexus() { delete W.objects['nexus-blue']; delete W.objects['nexus-red'] },
  }
  return r
}
// host a + spectator b; host picks Đấu Máy, BẮT ĐẦU, locks `hero`
async function toIngame(hero = 'kha_tan') {
  const r = await room(); r.join('a'); r.join('b')
  r.req('a', 'mode', { mode: 'thu_tran', map: 'mach_giua' })
  return { r, go() { r.req('a', 'start'); r.req('a', 'hover', { hero }); r.req('a', 'lock') } }
}

// BOT-01 trọn vòng, Tâm Mạch đỏ vỡ → Xanh thắng
{ const { r, go } = await toIngame('kha_tan')
  ok('BOT-01', L.modes.includes('thu_tran') && !L.lockedModes.includes('thu_tran'), 'lobby.yml mở thu_tran')
  ok('BOT-01', r.lb().mode === 'thu_tran' && JSON.stringify(r.lb().teams) === JSON.stringify({ blue: ['a'], red: [BOT] }), `sảnh Đấu Máy: chủ một mình Xanh, bot ngồi Đỏ (${JSON.stringify(r.lb().teams)})`)
  ok('BOT-01', r.lb().names[BOT] === 'Máy' && !r.lb().joinOrder.includes(BOT) && r.lb().host === 'a', 'bot có tên “Máy”, không vào joinOrder, không thể làm chủ')
  r.req('b', 'join', { team: 'red' }); ok('BOT-01', r.err('b') === 'spectator' && !r.lb().teams.red.includes('b'), 'người thứ hai xin vào Đỏ → spectator, đội không đổi')
  r.req('a', 'start')
  const pk = r.lb().pick
  ok('BOT-01', r.lb().phase === 'picking' && Math.round((r.lb().phaseEndsAt - r.W.t) / 1000) === L.pickSeconds, `BẮT ĐẦU → picking ${L.pickSeconds} s`)
  ok('BOT-01', pk[BOT]?.locked && L.heroes.includes(pk[BOT].hero), `bot khoá ngay một tướng hợp lệ (${pk[BOT]?.hero})`)
  ok('BOT-01', pk.a && !pk.a.locked && !pk.b, 'chủ chưa khoá; spectator không có ô chọn')
  r.req('a', 'hover', { hero: 'kha_tan' }); ok('BOT-01', r.lb().phase === 'picking' && r.lb().pick.a.hero === 'kha_tan' && !r.lb().pick.a.locked, 'chủ hover kha_tan')
  r.req('a', 'lock')
  ok('BOT-01', r.lb().phase === 'loading' && Math.round((r.lb().phaseEndsAt - r.W.t) / 1000) === L.loadSeconds, 'chủ khoá → mọi ô đã khoá → loading ngay')
  const ro = r.W.state.match.roster
  ok('BOT-01', Object.keys(ro).sort().join() === ['a', BOT].sort().join(), `roster = chủ + bot, không có spectator (${Object.keys(ro)})`)
  ok('BOT-01', ro.a.team === 'blue' && ro.a.hero === 'kha_tan' && !ro.a.bot, 'roster chủ: Xanh, kha_tan')
  ok('BOT-01', ro[BOT].team === 'red' && ro[BOT].bot === true && ro[BOT].hero === pk[BOT].hero && ro[BOT].hero !== ro.a.hero, `roster bot: Đỏ, bot:true, tướng khác chủ ở ca này (${ro[BOT].hero} vs ${ro.a.hero})`)
  ok('BOT-01', /^Máy · /.test(ro[BOT].name), `tên bot trong roster “${ro[BOT].name}”`)
  ok('BOT-01', !r.W.objects[BOT], 'loading: chưa sinh thân bot')
  r.run(L.loadSeconds + 0.5)
  const bo = r.W.objects[BOT]
  ok('BOT-01', r.lb().phase === 'ingame' && r.lb().matchId === 1 && r.p('a').state.ticket?.matchId === 1, 'loading hết giờ → ingame, chủ cầm vé sang place trận (tách sảnh, doc 51)')
  ok('BOT-01', !bo && r.lb().inMatch?.[BOT]?.bot === true && r.lb().inMatch[BOT].hero === ro[BOT].hero, 'ingame: bot đi theo roster sang place trận (thân bot sinh ở trọng tài trận, không ở sảnh)')
  r.run(60); ok('BOT-01', r.lb().phase === 'ingame' && r.lb().host === 'a', 'trận chạy 60 s không tự kết thúc (bot không tính là “người còn lại” nhưng chủ online)')
  Object.assign(r.p('a').state, { hero: 'kha_tan', team: 'blue', matchId: 1, level: 6, kills: 2, deaths: 1, cs: 33, gold: 2100 })
  Object.assign(bo.state, { level: 5, kills: 1, deaths: 2, cs: 28, gold: 1700 }); r.tick()
  r.nexus('red'); r.tick()
  const R = r.W.state.results, rb = R?.rows.find((x) => x.userId === BOT), ra = R?.rows.find((x) => x.userId === 'a')
  ok('BOT-01', r.lb().phase === 'results' && R?.winner === 'blue' && r.W.state.winner === 'blue' && r.W.state.phase === 'ended' && R.mode === 'thu_tran', 'Tâm Mạch Đỏ vỡ → results, winner blue, lane phase ended')
  ok('BOT-01', ra?.level === 6 && ra.k === 2 && ra.cs === 33 && rb?.level === 5 && rb.k === 1 && rb.d === 2 && rb.cs === 28 && rb.gold === 1700 && rb.team === 'red', 'bảng kết quả có cả chủ và bot, số đọc từ thân bot')
  ok('BOT-01', Math.round((r.lb().phaseEndsAt - r.W.t) / 1000) === L.resultsSeconds, `results giữ ${L.resultsSeconds} s`)
  r.run(L.resultsSeconds - 1); ok('BOT-01', r.lb().phase === 'results' && !!r.W.objects[BOT], 'trước hết giờ results: còn ở results, bot còn đứng')
  r.clearNexus(); r.run(1.5)
  ok('BOT-01', r.lb().phase === 'lobby' && !r.W.state.match && r.W.state.phase === 'waiting' && !r.lb().notice, 'hết giờ results → về sảnh, match xoá, không notice')
  ok('BOT-01', !r.W.objects[BOT] && r.W.state.bots === null, 'về sảnh: thân bot đã dọn')
  ok('BOT-01', r.lb().mode === 'thu_tran' && r.lb().host === 'a' && JSON.stringify(r.lb().teams) === JSON.stringify({ blue: ['a'], red: [BOT] }) && JSON.stringify(r.lb().pick) === '{}', 'sảnh giữ mode Đấu Máy, chủ Xanh, bot lại ngồi Đỏ (ghế, chưa có thân)')
  r.req('a', 'start'); r.req('a', 'lock')
  ok('BOT-01', r.lb().phase === 'picking' && r.err('a') === 'no_hero', 'ván 2 mở lại được: khoá khi chưa hover → no_hero')
  r.run(L.pickSeconds + 0.5); r.run(L.loadSeconds + 0.5)
  ok('BOT-01', r.lb().phase === 'ingame' && r.lb().matchId === 2 && !!r.W.objects[BOT] && L.heroes.includes(r.W.state.match.roster.a.hero), 'ván 2: hết giờ pick → chủ được gán tướng, ingame, bot sinh lại') }

// BOT-02 Tâm Mạch xanh vỡ → Đỏ (bot) thắng
{ const { r, go } = await toIngame('van_dao'); go(); r.run(L.loadSeconds + 0.5)
  ok('BOT-02', r.lb().phase === 'ingame' && !!r.W.objects[BOT], 'vào trận Đấu Máy')
  r.nexus('blue'); r.tick()
  ok('BOT-02', r.lb().phase === 'results' && r.W.state.results?.winner === 'red' && r.W.state.winner === 'red', 'Tâm Mạch Xanh vỡ → results, winner red')
  r.clearNexus(); r.run(L.resultsSeconds + 0.5)
  ok('BOT-02', r.lb().phase === 'lobby' && !r.W.objects[BOT] && !r.W.state.match, 'hết giờ results → sảnh, bot dọn') }

// BOT-03 chủ khoá trùng tướng bot: luật hiện hành (sim.js startPicking) cho phép — khác đội
{ const { r } = await toIngame(); r.req('a', 'start'); const bh = r.lb().pick[BOT].hero
  r.req('a', 'hover', { hero: bh }); r.req('a', 'lock')
  ok('BOT-03', r.err('a') === null && r.lb().phase === 'loading' && r.W.state.match.roster.a.hero === bh, `chủ khoá đúng tướng của bot (${bh}) → được, vì khác đội (sim.js dòng 87)`) }

// BOT-04 chủ hết giờ pick không khoá → được gán tướng
{ const { r } = await toIngame(); r.req('a', 'start'); r.run(L.pickSeconds + 0.5)
  const ro = r.W.state.match?.roster
  ok('BOT-04', ro && L.heroes.includes(ro.a.hero) && ro[BOT]?.bot, `hết ${L.pickSeconds} s → chủ được gán ${ro?.a.hero}, bot giữ ${ro?.[BOT]?.hero}`) }

// BOT-05 chủ rời giữa trận (Rời trận) → huỷ ngay (sim.js handle 'leave', doc14 P3)
{ const { r, go } = await toIngame(); go(); r.run(L.loadSeconds + 0.5)
  r.req('b', 'leave'); ok('BOT-05', r.lb().phase === 'ingame' && !!r.W.objects[BOT], 'spectator xin rời → trận không đổi')
  r.req('a', 'leave')
  ok('BOT-05', r.lb().phase === 'lobby' && !r.W.state.match && r.lb().notice?.key === 'err.soloLeft' && r.err('a') === null, 'chủ Rời trận → về sảnh ngay, notice err.soloLeft')
  ok('BOT-05', !r.W.objects[BOT] && r.lb().host === 'a' && JSON.stringify(r.lb().teams) === JSON.stringify({ blue: ['a'], red: [BOT] }), 'bot dọn; chủ vẫn là chủ, ghế bot lại ngồi Đỏ') }
// BOT-06 chủ rời lúc loading → huỷ ngay, bot chưa từng sinh
{ const { r, go } = await toIngame(); go()
  ok('BOT-06', r.lb().phase === 'loading', 'đang loading')
  r.req('a', 'leave'); ok('BOT-06', r.lb().phase === 'lobby' && r.lb().notice?.key === 'err.soloLeft' && !r.W.objects[BOT], 'chủ Rời trận lúc loading → sảnh, err.soloLeft, không có bot') }
// BOT-07 chủ mất mạng/reload giữa trận Đấu Máy → giữ 60 s; quá 60 s → huỷ, bot dọn
{ const { r, go } = await toIngame(); go(); r.run(L.loadSeconds + 0.5)
  r.drop('a')
  ok('BOT-07', r.lb().phase === 'ingame' && r.lb().host === 'a' && !!r.W.objects[BOT] && r.lb().disconnected.a > r.W.t, 'chủ rớt → trận và quyền chủ giữ, bot vẫn đứng')
  r.run(30); ok('BOT-07', r.lb().host === 'a' && r.lb().phase === 'ingame', 'spectator không lấy quyền chủ trong 60 s')
  r.join('a'); ok('BOT-07', r.lb().phase === 'ingame' && !r.lb().disconnected.a && r.lb().matchId === 1 && !!r.W.objects[BOT], 'quay lại trong 60 s → cùng trận, bot còn')
  r.drop('a'); r.run(L.reconnectSeconds + 1)
  ok('BOT-07', r.lb().phase === 'lobby' && r.lb().notice?.key === 'err.practiceLeft' && !r.W.state.match && !r.W.objects[BOT], 'quá 60 s → huỷ về sảnh, err.practiceLeft, bot dọn')
  ok('BOT-07', r.lb().host === 'b' && JSON.stringify(r.lb().teams) === JSON.stringify({ blue: ['b'], red: [BOT] }), 'ở sảnh quyền chủ chuyển cho người còn lại, ghế Xanh theo chủ mới') }
// BOT-08 nút Kết thúc (practice end) chỉ dành cho Sân Tập; Đấu Máy dùng Rời trận
{ const { r, go } = await toIngame(); go(); r.run(L.loadSeconds + 0.5)
  r.req('a', 'practice', { action: 'end' })
  ok('BOT-08', r.err('a') === 'bad_phase' && r.lb().phase === 'ingame', 'Đấu Máy: practice end → bad_phase, trận giữ (luật sim.js: practice chỉ san_tap)') }
// BOT-09 phòng trống giữa trận → mặc định, bot dọn
{ const { r, go } = await toIngame(); go(); r.run(L.loadSeconds + 0.5)
  r.W.players = []; r.tick()
  ok('BOT-09', r.lb().phase === 'lobby' && r.lb().mode === 'tai_hien' && !r.W.objects[BOT] && !r.W.state.match, 'mọi người rời → phòng về mặc định, bot dọn') }

console.log(`\n${n - fails}/${n} PASS (mock trọng tài ngoài engine — không phải client PASS)`); process.exit(fails ? 1 : 0)
