// G2 live-measurement fixture (doc14 §G2 bước 3). Dev room only; NOT a game script: nothing imports it.
// Each block is pasted whole into run_script (room: dev). No gameplay number is touched: the ally is an ordinary
// scripts/bot.js hero (same stats/rules as Đấu Máy's bot), on blue, while a Sân Tập match runs.
//
// Cases
//  (a) wave alone        : Sân Tập, host stays at the blue fountain (no hero within 30 m of red structures).
//  (b) wave + 1 hero     : Sân Tập, host pushes with each wave, hits structures only while allied minions tank.
//  (c) wave + 2 heroes   : (b) + ALLY_ON below (bot ally, blue). Two real teammates in Tái Hiện replace it when available.
// One run = one case, from match start (or Làm lại) until nexus-red falls or 25 min, whichever first.

// ---- READ (readOnly: true) : one log row; paste its return into the report table ----
export const READ = `
const s = ctx.place.state, lb = s.lobby ?? {}, st = s.startedAt
const rel = (ms) => ms == null ? null : +(ms / 60000).toFixed(2)
const ids = ['tower-red-t1','tower-red-t2','nexus-red','tower-blue-t1','tower-blue-t2','nexus-blue']
const rows = Object.fromEntries(ids.filter((i) => s.siegeAt?.[i] != null || s.towersDown?.[i] != null).map((i) => [i, {
  siegeMin: rel(s.siegeAt?.[i]), downMin: rel(s.towersDown?.[i]),
  breakMin: s.siegeAt?.[i] != null && s.towersDown?.[i] != null ? rel(s.towersDown[i] - s.siegeAt[i]) : null,
  hp: ctx.getObject(i)?.state.hp, shield: ctx.getObject(i)?.state.shield }]))
const heroes = [...ctx.place.players.filter((p) => p.state?.hero).map((p) => ({ who: p.displayName, hero: p.state.hero, team: p.state.team, level: p.state.level, items: (p.state.items ?? []).length })),
  ...ctx.query({ tags: ['bot-hero'] }).map((r) => ctx.getObject(r.id)).filter(Boolean).map((o) => ({ who: o.id, hero: o.state.hero, team: o.state.team, level: o.state.level, items: (o.state.items ?? []).length }))]
const logOk = s.siegeAt?._round === s.round && s.towersDown?._round === s.round  // false = the rows are another round's: do not record
return { logOk, logRound: s.siegeAt?._round ?? null, mode: lb.mode, phase: lb.phase, matchId: lb.matchId, round: s.round, elapsedMin: st ? rel(ctx.now() - st) : null, wave: s.wave, heroes, structures: rows }`

// ---- ALLY_ON (persist: false) : case (c) fixture; refuses outside a dev Sân Tập match ----
export const ALLY_ON = `
const s = ctx.place.state, lb = s.lobby ?? {}
if (ctx.world.mode !== 'dev' || lb.phase !== 'ingame' || lb.mode !== 'san_tap') return { refused: 'needs dev room, Sân Tập, ingame', mode: lb.mode, phase: lb.phase }
const HERO = 'nham_vu'   // fixed per run; change only between runs and write it in the log row
const host = ctx.place.players.find((p) => p.state?.hero)
if (host?.state.hero === HERO) return { refused: 'host already plays ' + HERO + '; pick another HERO' }
const { BODY } = await import('scripts/lib/lobby-stage.js')
const { armBody } = await import('scripts/lib/weapons.js')
if (ctx.place.objects['g2-ally-1']) delete ctx.place.objects['g2-ally-1']
ctx.spawn('g2-ally-1', { tags: ['bot-hero', 'g2-fixture'], behavior: 'scripts/bot.js', physics: { body: 'character' },
  model: { id: BODY[HERO].model }, layout: { maxExtents: { y: BODY[HERO].h } }, castShadow: true, feetPosition: { x: 0, y: 2, z: 0 },
  mixer: { base: { clip: 'Idle', loop: 'loop', weight: 1 } }, state: { hero: HERO, team: 'blue', botName: 'G2 ally', hpPct: 100 } })
armBody(ctx, 'g2-ally-1', HERO)
return { ally: 'g2-ally-1', hero: HERO }`

// ---- ALLY_OFF (persist: false) : remove the fixture ally and its score row ----
export const ALLY_OFF = `
if (ctx.place.objects['g2-ally-1']) delete ctx.place.objects['g2-ally-1']
const b = { ...(ctx.place.state.bots ?? {}) }; delete b['g2-ally-1']; ctx.place.state.bots = Object.keys(b).length ? b : null
return { removed: true }`

// ---- READ_T1 (readOnly: true) : what stands around one structure right now, for the operator to match against a screenshot ----
// Edit AT to read another structure. Range = tower range 14 m (structures.yml) + 10 m margin. Hero `order` is the client's own
// session (hero.js ctx.session.order) and never reaches the server: it is null here by design; compare the screenshot instead.
export const READ_T1 = `
const AT = 'tower-red-t1', R = 24
const t = ctx.getObject(AT); if (!t) return { error: 'no ' + AT }
const c = t.feetPosition, d = (p) => +Math.hypot(p.x - c.x, p.z - c.z).toFixed(1)
const xz = (p) => ({ x: +p.x.toFixed(1), z: +p.z.toFixed(1) })
const minions = ctx.query({ tags: ['minion'] }).filter((m) => !m.state.dead && d(m.feetPosition) <= R)
  .map((m) => ({ id: m.id, team: m.state.team, kind: m.state.kind, hp: Math.round(m.state.hp), dist: d(m.feetPosition), at: xz(m.feetPosition) })).sort((a, b) => a.dist - b.dist)
const aimObj = t.state.aim ? ctx.getObject(t.state.aim) : null
const heroes = [...ctx.place.players.filter((p) => p.state?.hero).map((p) => ({ who: p.displayName, row: p })),
  ...ctx.query({ tags: ['bot-hero'] }).map((r) => ({ who: r.id, row: ctx.getObject(r.id) })).filter((h) => h.row)]
  .map(({ who, row }) => ({ who, hero: row.state.hero, team: row.state.team, hp: Math.round(row.state.hp ?? 0), hpPct: row.state.hpPct, dead: !!row.state.dead,
    level: row.state.level, dist: d(row.feetPosition), at: xz(row.feetPosition), inTowerRange: d(row.feetPosition) <= 14, order: null }))
const s = ctx.place.state
return { round: s.round, elapsedMin: s.startedAt ? +((ctx.now() - s.startedAt) / 60000).toFixed(2) : null,
  tower: { id: AT, hp: Math.round(t.state.hp ?? 0), fallen: !!t.state.fallen, at: xz(c), aim: t.state.aim ?? null,
    aimKind: aimObj ? (aimObj.tags?.includes('minion') ? 'minion' : 'hero') : null, aimDist: aimObj ? d(aimObj.feetPosition) : null },
  minions: { blue: minions.filter((m) => m.team === 'blue'), red: minions.filter((m) => m.team === 'red') }, heroes }`

// Reset between runs (host's own buttons, nothing scripted):
//  1. ALLY_OFF (case c)   2. host presses Làm lại (op practice/reset → round+1, startedAt=now, siegeAt={_round}, towersDown={_round} via scripts/lib/g2log.js g2Open,
//     lane reset, hero level 1/items []/cd {})   3. READ once: structures must be {} and elapsedMin ≈ 0   4. ALLY_ON (case c).
// End: Kết thúc (op practice/end) → lobby; ALLY_OFF first so no fixture body outlives the match.
