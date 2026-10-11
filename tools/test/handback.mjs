// Regression: reconnect hand-back race (P0 2026-10-09, matchId 17098 lost 290 XP on a second drop before the first
// hand-back was taken). Drives scripts/referee/handback.js, the code the referee runs, against a model of the referee
// tick (250 ms), the player's machine (its own lag seeing the saved row, its own replication lag back), and a stand-in.
// Run: node tools/test/handback.mjs   ·  exits 1 on any failure. `--old` runs the pre-fix rules to prove the test bites.
import * as NEW from '../../scripts/referee/handback.js'
const OLD = {
  pending: NEW.pending,
  liveIsTruth: (saved, live) => !!live?.hero,
  onDrop: (saved, cache) => (cache ? { saved: cache, cache } : { saved, cache }),
  seedOf: (saved, cache, live) => (live?.hero ? live : cache ?? saved ?? {}),
  nextAt: (now) => now,
  settled: NEW.settled,
}
const H = process.argv.includes('--old') ? OLD : NEW
const MID = 17098

function run({ seed, script, seeLag, repLag, gain = 5, subGain = 7 }) {
  let rnd = seed; const rand = () => ((rnd = (rnd * 16807) % 2147483647) / 2147483647)
  const S = { saved: null, cache: null, sub: null, wasOnline: true }
  const P = { online: true, live: { hero: 'kha_tan', matchId: MID, xp: 0, gold: 0, resumedAt: null }, hist: [] }
  const savedHist = [] // [t, saved] so the player's view of it can lag
  const fails = []; let best = 0, maxBodies = 0
  const view = (hist, t, lag) => { let v = null; for (const [at, x] of hist) if (at <= t - lag) v = x; return v }
  for (let t = 0; t <= 120000; t += 250) {
    const want = script(t)
    if (want !== P.online) { P.online = want }
    // --- player machine (only while its tab runs) ---
    if (P.online) {
      const sv = view(savedHist, t, seeLag + rand() * 250)
      if (H.pending(sv, P.live) && sv.at > (P.live.resumedAt ?? 0) && !S.sub) P.live = { ...P.live, xp: sv.xp, gold: sv.gold, resumedAt: sv.at }
      else if (!H.pending(S.saved, P.live) && !S.sub) P.live = { ...P.live, xp: P.live.xp + gain, gold: P.live.gold + 1 }
      P.hist.push([t, { ...P.live }])
    }
    const liveSeen = view(P.hist, t, repLag) // what the referee reads of the player's row
    // --- referee tick ---
    if (P.online && S.sub) { S.saved = { ...S.sub, at: H.nextAt(t, S.saved) }; S.cache = S.saved; S.sub = null; savedHist.push([t, S.saved]) }
    if (P.online && H.liveIsTruth(S.saved, liveSeen)) S.cache = { ...liveSeen }
    if (P.online && S.saved && H.settled(S.saved, liveSeen, MID)) { S.saved = null; savedHist.push([t, null]) }
    if (!P.online && !S.sub) {
      const d = H.onDrop(S.saved, S.cache); S.cache = d.cache
      if (d.saved !== S.saved) { S.saved = d.saved; savedHist.push([t, S.saved]) }
      const st = H.seedOf(S.saved, S.cache, null)
      S.sub = { hero: 'kha_tan', xp: st.xp ?? 0, gold: st.gold ?? 0 }
    }
    if (S.sub) S.sub = { ...S.sub, xp: S.sub.xp + subGain, gold: S.sub.gold + 1 }
    // --- invariants ---
    // the seat's truth as the room holds it: the stand-in, else an untaken hand-back, else the player's row as it reached the room
    // (a gain still in flight from a tab that then closed never reached anyone, so it is not a loss)
    const auth = S.sub ? S.sub.xp : S.saved?.at && H.pending(S.saved, liveSeen) ? S.saved.xp : liveSeen?.xp ?? 0
    if (auth < best) fails.push(`t=${t / 1000}s seat XP fell ${best} → ${auth}`)
    best = Math.max(best, auth)
    const bodies = (S.sub ? 1 : 0) + (P.online && !S.sub ? 1 : 0)
    maxBodies = Math.max(maxBodies, bodies)
    if (bodies > 1) fails.push(`t=${t / 1000}s two combat bodies`)
  }
  return { fails: [...new Set(fails)].slice(0, 3), finalXp: P.live.xp, best, maxBodies }
}

// the exact creator case: level 2 at 290 XP, drop, stand-in, back, drop again BEFORE the hand-back is taken, back
const at = (spans) => (t) => !spans.some(([a, b]) => t >= a && t < b)
const cases = [{ name: 'double-drop (17098 case)', script: at([[14500, 40000], [40250, 70000]]), seeLag: 1500, repLag: 500 }]
for (let i = 0; i < 200; i++) { // many cycles, varied lags and gap lengths
  let r = i * 7919 + 1; const R = () => ((r = (r * 48271) % 2147483647) / 2147483647)
  const spans = []; let t = 5000
  while (t < 110000) { const off = 250 + Math.floor(R() * 40) * 250; const on = 250 + Math.floor(R() * 12) * 250; spans.push([t, t + off]); t += off + on }
  cases.push({ name: `random-${i}`, script: at(spans), seeLag: Math.floor(R() * 12) * 250, repLag: Math.floor(R() * 8) * 250, seed: i + 1 })
}
let bad = 0
for (const c of cases) {
  const r = run({ seed: 1, ...c })
  if (r.fails.length) { bad++; if (bad <= 5) console.log('FAIL', c.name, r.fails.join(' | ')) }
  else if (c.name.startsWith('double')) console.log('PASS', c.name, 'final XP', r.finalXp, 'max bodies', r.maxBodies)
}
console.log(`${process.argv.includes('--old') ? 'OLD rules' : 'NEW rules'}: ${cases.length - bad}/${cases.length} cases pass`)
process.exit(bad ? 1 : 0)
