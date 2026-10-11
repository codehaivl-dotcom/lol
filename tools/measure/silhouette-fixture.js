// Silhouette retest fixture (doc24 Đợt 4). Dev room only; NOT a game script: nothing imports it.
// Each block is pasted whole into run_script (room: "dev", persist: false). No ship number changes:
// MOC_L6 adds xp through the hero's own level-up loop (hero.js update), DIE sets hp = 0 so hero.js die() runs
// its normal path (deathAnim, respawn timer, sounds). No input is sent, no bot is added, nothing is spawned.
// Valid R target for Mộc (heroes.yml moc_lam.r: aim target, range 5): any enemy unit from combat.js units(),
// i.e. a red minion of the Sân Tập wave; stand within 5 m of one. Nham walk/LMB/E work at L1 (rankOf e = 0).
// After the run: "Làm lại" returns the hero to L1 base; write the match/round and that the fixture ran once.

// ---- READ (readOnly: true): who is in the match, level, hp, nearest red minion ----
export const READ = `
const s = ctx.place.state, lb = s.lobby ?? {}
const host = ctx.place.players.find((p) => p.state?.hero)
if (!host) return { mode: lb.mode, phase: lb.phase, hero: null }
const m = ctx.query({ tags: ['minion'], center: host.feetPosition, radius: 40 }).filter((r) => r.state.team !== host.state.team && !r.state.dead)
return { mode: lb.mode, phase: lb.phase, matchId: lb.matchId, round: s.round, hero: host.state.hero, level: host.state.level,
  xp: host.state.xp, hp: host.state.hp, dead: !!host.state.dead, cd: host.state.cd ?? null,
  nearestEnemyMinionM: m[0] ? +Math.hypot(m[0].feetPosition.x - host.feetPosition.x, m[0].feetPosition.z - host.feetPosition.z).toFixed(1) : null }`

// ---- MOC_L6 (persist: false): once per round; Mộc Lẫm L1-5 -> L6 so R (rank 0) opens ----
export const MOC_L6 = `
const s = ctx.place.state, lb = s.lobby ?? {}
if (ctx.world.mode !== 'dev' || lb.phase !== 'ingame' || lb.mode !== 'san_tap') return { refused: 'needs dev room, Sân Tập, ingame', mode: lb.mode, phase: lb.phase }
const host = ctx.place.players.find((p) => p.state?.hero === 'moc_lam')
if (!host) return { refused: 'no Mộc Lẫm in the match' }
if (host.state.level >= 6) return { refused: 'already L' + host.state.level }
const XP = [280, 380, 480, 580, 700]                       // economy.yml xpTable[0..4]: L1 -> L6
const need = XP.slice(host.state.level - 1).reduce((a, b) => a + b, 0) - (host.state.xp ?? 0)
host.state.xp += need                                      // hero.js level-up loop does the rest next tick
return { ok: true, round: s.round, fromLevel: host.state.level, xpAdded: need }`

// ---- DIE (persist: false): once; the match hero falls by its own die() path ----
export const DIE = `
const s = ctx.place.state, lb = s.lobby ?? {}
if (ctx.world.mode !== 'dev' || lb.phase !== 'ingame' || lb.mode !== 'san_tap') return { refused: 'needs dev room, Sân Tập, ingame', mode: lb.mode, phase: lb.phase }
const HERO = 'nham_vu'                                     // change only between runs; write it in the report row
const host = ctx.place.players.find((p) => p.state?.hero === HERO)
if (!host) return { refused: 'no ' + HERO + ' in the match' }
if (host.state.dead) return { refused: 'already dead' }
host.state.hp = 0
return { ok: true, round: s.round, hero: HERO }`
