// Hall of Honour data (Bảng Vinh Danh): real match results only, never invented ranks.
// record(ctx, results): match referee, once per finished match → SQL rows (one per human player).
// refresh(ctx, s): lobby referee each tick; every 30 s it reads the board and writes s.hall (place.state.hall):
//   { at, players: [{ uid, name, played, wins, rate, fav: [heroId…≤3], k, d }], recent: [{ matchId, at, winner, seconds, mode, best: { name, hero, k, d } }] }
// players sorted by wins, then rate, then played; ≤ 20 rows. recent ≤ 6 newest matches.
const READ_MS = 30000
const R = { next: 0, busy: false, ready: null, made: false }

async function ensure(ctx) {
  if (R.made) return
  await ctx.sql`CREATE TABLE IF NOT EXISTS hall_rows (match_id INTEGER, at INTEGER, uid TEXT, name TEXT, team TEXT, hero TEXT, won INTEGER, k INTEGER, d INTEGER, mode TEXT, seconds INTEGER, PRIMARY KEY (match_id, uid))`
  R.made = true
}

export function record(ctx, results) {
  if (!results?.rows?.length || !results.winner) return
  const at = ctx.now()
  const rows = results.rows.filter((r) => r.userId && !String(r.userId).startsWith('bot'))
  ;(async () => {
    try {
      await ensure(ctx)
      for (const r of rows) {
        await ctx.sql`INSERT OR IGNORE INTO hall_rows (match_id, at, uid, name, team, hero, won, k, d, mode, seconds) VALUES (${results.matchId ?? 0}, ${at}, ${r.userId}, ${String(r.name ?? '').slice(0, 32)}, ${r.team}, ${r.hero ?? ''}, ${r.team === results.winner ? 1 : 0}, ${r.k ?? 0}, ${r.d ?? 0}, ${results.mode ?? ''}, ${results.seconds ?? 0})`
      }
      R.next = 0
    } catch (e) { ctx.log('hall: record failed', { e: String(e) }) }
  })()
}

export function refresh(ctx, s) {
  if (R.ready) { s.hall = R.ready; R.ready = null }
  const now = ctx.now()
  if (R.busy || now < R.next) return
  R.busy = true; R.next = now + READ_MS
  ;(async () => {
    try {
      await ensure(ctx)
      const p = await ctx.sql`SELECT uid, MAX(name) AS name, COUNT(*) AS played, SUM(won) AS wins, SUM(k) AS k, SUM(d) AS d FROM hall_rows GROUP BY uid ORDER BY wins DESC, (1.0 * SUM(won) / COUNT(*)) DESC, played DESC LIMIT 20`
      const f = await ctx.sql`SELECT uid, hero, COUNT(*) AS n FROM hall_rows WHERE hero <> '' GROUP BY uid, hero ORDER BY n DESC`
      const m = await ctx.sql`SELECT match_id, MAX(at) AS at, MAX(mode) AS mode, MAX(seconds) AS seconds FROM hall_rows GROUP BY match_id ORDER BY at DESC LIMIT 6`
      const ids = m.rows.map((r) => r.match_id)
      const b = ids.length ? await ctx.sql`SELECT match_id, name, hero, team, won, k, d FROM hall_rows WHERE match_id IN (SELECT match_id FROM hall_rows GROUP BY match_id ORDER BY MAX(at) DESC LIMIT 6) ORDER BY k DESC, d ASC` : { rows: [] }
      const fav = {}
      for (const r of f.rows) (fav[r.uid] ??= []).length < 3 && fav[r.uid].push(r.hero)
      const players = p.rows.map((r) => ({ uid: r.uid, name: r.name ?? '', played: r.played | 0, wins: r.wins | 0, rate: r.played ? Math.round((100 * r.wins) / r.played) : 0, fav: fav[r.uid] ?? [], k: r.k | 0, d: r.d | 0 }))
      const recent = m.rows.map((r) => {
        const rs = b.rows.filter((x) => x.match_id === r.match_id)
        const best = rs[0]
        const win = rs.find((x) => x.won)
        return { matchId: r.match_id, at: r.at, mode: r.mode, seconds: r.seconds | 0, winner: win?.team ?? null, best: best ? { name: best.name, hero: best.hero, k: best.k | 0, d: best.d | 0 } : null }
      })
      R.ready = { at: ctx.now(), players, recent }
    } catch (e) { ctx.log('hall: read failed', { e: String(e) }) }
    R.busy = false
  })()
}
