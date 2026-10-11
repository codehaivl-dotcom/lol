// Shared combat rules (doc 08 §1.1): who is an enemy, what stands near a point, how a blow lands.
import { animate } from 'builtin/tween'
import { raycast } from 'builtin/physics'
// Every blow is judged on the striker's machine and stepped into the target's row (hp -= d).
// The target's own owner (hero.js for a hero, lane.js for minions/structures) clamps, absorbs shields and dies.
import { MAP } from './map.js'
import S from './data/structures.yml'
import { HEROES } from './heroes.js'
import ECO from './data/economy.yml'
import { heroBodies, heroName } from './bodies.js'
import { trace, traceOn, bodyLabel } from './trace.js'
import { qaLog } from './qabench.js'

export const TOWER_IDS = Object.keys(MAP.towers)
export const NEXUS_IDS = ['nexus-blue', 'nexus-red']
export const STRUCT_IDS = [...TOWER_IDS, ...NEXUS_IDS]
import { addItemStats, catOf } from './items.js'
export const TEAM_COLOR = { blue: [0.25, 0.85, 1.0], red: [1.0, 0.3, 0.35] }
export const other = (team) => (team === 'blue' ? 'red' : 'blue')

const v2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z)
export { v2 as dist2d }

// Hero stats at a level with items (doc 08 §2: base + (L-1) × growth).
export function heroStats(heroId, level, items, itemCat) {
  const h = HEROES.heroes[heroId]
  const out = {}
  for (const k of Object.keys(h.stats)) out[k] = h.stats[k] + (level - 1) * (h.growth[k] ?? 0)
  out.hp *= h.tuning?.hp ?? 1   // tuning trên base+growth, trước HP đồ (doc 63 §3)
  out.baseAd = out.ad
  return addItemStats(out, items, itemCat ?? catOf({ items }))
}

// Ability rank index (D1): Q/RMB/E rank at 1/3/5/7/9; R opens at 6, ranks at 11 and 15. -1 = locked.
export function rankOf(slot, level) {
  if (slot === 'lmb') return 0
  if (slot === 'r') return level >= 15 ? 2 : level >= 11 ? 1 : level >= 6 ? 0 : -1
  return Math.min(4, Math.floor((level - 1) / 2))
}
export const pick = (v, rank) => (Array.isArray(v) ? v[Math.max(0, Math.min(v.length - 1, rank))] : v ?? 0)

// Every hero body in the place: players wearing a hero, and bot heroes (tag bot-hero, scripts/lib/bot-brain.js).
export { heroBodies, heroName } // one home: lib/bodies.js (light, read by the camera's plates)

// Everything of `team` within `radius` of `center` that can be struck. One list: heroes, minions, structures.
export function units(ctx, team, center, radius) {
  const now = ctx.now()
  const out = []
  for (const p of heroBodies(ctx)) {
    const s = p.state
    if (!s || !s.hero || s.team !== team || s.dead) continue
    if ((s.untargetableUntil ?? 0) > now) continue
    const d = v2(p.feetPosition, center)
    if (d <= radius + 0.5) out.push({ h: p, kind: 'hero', id: p.id, pos: p.feetPosition, r: 0.5, height: 1.8, d })
  }
  for (const m of ctx.query({ tags: ['minion'], center, radius: radius + 1.2 })) {
    if (m.state.team !== team || m.state.dead) continue
    const r = S.minions.kinds[m.state.kind]?.radius ?? 0.6
    out.push({ h: m, kind: 'minion', id: m.id, pos: m.feetPosition, r, height: S.minions.kinds[m.state.kind]?.height ?? 1.4, d: v2(m.feetPosition, center) })
  }
  // Cổ Titan (doc 35/37): one giant body, struck at its coil's edge
  for (const t of ctx.query({ tags: ['titan'], center, radius: radius + 4 })) {
    if (t.state.team !== team || t.state.dead) continue
    const o = ctx.getObject(t.id)
    if (o) out.push({ h: o, kind: 'titan', id: t.id, pos: t.feetPosition, r: t.state.r ?? 3, height: 5, d: v2(t.feetPosition, center) })
  }
  for (const id of STRUCT_IDS) {
    const o = ctx.getObject(id)
    if (!o || o.state.team !== team || o.state.fallen) continue
    const r = id.startsWith('nexus') ? S.nexus.radius : S.towerRadius
    const d = v2(o.feetPosition, center)
    if (d <= radius + r) out.push({ h: o, kind: 'structure', id, pos: o.feetPosition, r, height: id.startsWith('nexus') ? 6 : 8, d, locked: !!o.state.locked })
  }
  return out
}

function resistOf(u) {
  const s = u.h.state
  return { armor: s.armor ?? 0, mr: s.mr ?? 0 }
}

// One blow. type: physical | magic | true. src: { id, team, name } of the striker (a player id or a unit id).
// Returns the damage dealt after resistance (0 = dodged / immune).
// Doc 39 Áo Bão: a warded hero (state.ward, while its shield holds) standing between a targeted shot and its ally takes the shot.
// u = the intended target row, from = the shooter's position, shooterTeam = the shooter's team. Returns the row that is struck.
export function interpose(ctx, u, from, shooterTeam) {
  if (!u || !from) return u
  const now = ctx.now()
  const dx = u.pos.x - from.x, dz = u.pos.z - from.z
  const len = Math.hypot(dx, dz)
  if (len < 1) return u
  const fx = dx / len, fz = dz / len
  let best = null, bestAlong = Infinity
  for (const p of heroBodies(ctx)) {
    const s = p.state
    if (!s || p.id === u.id || s.dead || s.team === shooterTeam || s.team !== (u.h?.state?.team ?? s.team)) continue
    if (!s.ward || s.ward.until <= now || !(s.shield?.until > now && s.shield.amt > 0)) continue
    const ox = p.feetPosition.x - from.x, oz = p.feetPosition.z - from.z
    const along = ox * fx + oz * fz
    const perp = Math.abs(ox * fz - oz * fx)
    if (along < 0.4 || along > len - 0.3 || perp > 0.5 + (s.ward.width ?? 1) / 2) continue
    if (along < bestAlong) { bestAlong = along; best = p }
  }
  if (!best) return u
  const at = best.feetPosition
  ctx.emit('damageNumber', { position: { x: at.x, y: at.y + 2.3, z: at.z }, text: 'chắn', color: '#8fe8ff', size: 0.9 })
  ringFx(ctx, at, 0.9, '#8fe8ff', 0.25, true)
  return { h: best, kind: 'hero', id: best.id, pos: at, r: 0.5, height: 1.8, d: bestAlong }
}

// Damage numbers, graded by who is reading them (presentation only, the blow is already dealt):
// the striker's own screen: big and coloured by type (physical amber, magic violet, true white), a big blow as a crit;
// the struck player's screen: red with a minus; everyone near: small and pale. Minion-on-minion trades print nothing.
const DMG_COL = { physical: '#ffb347', magic: '#c39bff', true: '#ffffff' }
function isPlayer(ctx, id) { return !!id && ctx.place.players.some((p) => p.id === id) }
function damageText(ctx, u, src, at, d, type, big) {
  const n = Math.round(d)
  const byMe = src?.kind === 'hero' && isPlayer(ctx, src.id)
  const onMe = u.kind === 'hero' && isPlayer(ctx, u.id)
  if (byMe) ctx.emit('damageNumber', { position: at, value: n, text: big ? `${n}!` : undefined, color: big ? '#ffe14a' : DMG_COL[type] ?? '#ffb347', crit: big, size: big ? 1.6 : 1.15, lifetime: big ? 1.1 : 0.8 }, { audience: { player: src.id } })
  if (onMe) ctx.emit('damageNumber', { position: { x: at.x, y: at.y + 0.3, z: at.z }, text: `-${n}`, color: '#ff4a4a', crit: big, size: big ? 1.35 : 1, lifetime: 0.9 }, { audience: { player: u.id } })
  if (!byMe && !onMe && (u.kind === 'hero' || src?.kind === 'hero')) ctx.emit('damageNumber', { position: at, value: n, color: DMG_COL[type] ?? '#ffb347', crit: false, size: 0.75, lifetime: 0.6 }, { audience: { nearby: at, radius: 30 } })
}

export function hurt(ctx, u, amount, type, src, opts = {}) {
  const s = u.h.state
  const now = ctx.now()
  const at = { x: u.pos.x, y: u.pos.y + u.height, z: u.pos.z }
  if (u.locked) {
    ctx.emit('damageNumber', { position: at, text: 'khóa', color: '#9aa', size: 0.8 }, { audience: { nearby: at, radius: 30 } })
    return 0
  }
  if (u.kind === 'hero' && (s.dead || !(s.hp > 0))) return 0 // 2026-10-09 trace: a body at 0 HP (a stand-in mid-handback) kept eating hits to −1385
  if (u.kind === 'hero' && (s.iframeUntil ?? 0) > now) {
    ctx.emit('damageNumber', { position: at, text: 'NÉ', color: '#bff3ff', size: 1.1, lifetime: 0.7 }, { audience: { nearby: at, radius: 30 } })
    return 0
  }
  if (u.kind === 'hero' && src?.hero) amount *= HEROES.heroes[src.hero]?.tuning?.dmg ?? 1 // doc 21 A4: hero-on-hero tuning
  const r = resistOf(u)
  const res = type === 'physical' ? r.armor : type === 'magic' ? r.mr : 0
  const d = type === 'true' ? amount : amount * (100 / (100 + Math.max(0, res - (opts.pen ?? 0))))
  if (!(d > 0)) return 0
  if ((u.kind === 'hero' || src?.kind === 'hero') && traceOn(ctx)) trace(ctx, ['hit', opts.slot ?? '?', src?.hero ?? src?.kind ?? '?', u.kind === 'hero' ? bodyLabel(s, u.id) : u.kind, src?.id === ctx.self?.id ? ctx.self.state?.level ?? 0 : 0, s.level ?? 0, type, Math.round(amount), res, opts.pen ?? 0, Math.round(d), Math.round(s.hp), Math.round(s.maxHp ?? 0), Math.round(s.shield?.until > now ? s.shield.amt ?? 0 : 0)])
  s.hp -= d
  qaLog(ctx, { k: 'hit', slot: opts.slot ?? '?', by: src?.hero ?? src?.kind ?? '?', to: u.id, d: Math.round(d) })
  s.lastHitBy = src.id
  s.lastHitAt = now
  if (u.kind === 'hero' && src.kind === 'hero') {
    s.lastHeroHitBy = src.id
    s.heroCombatAt = now // Tâm Lò Dưỡng Ký: giao tranh tướng (cả khi khiên hút)
    const atk = src.id && ctx.getObject(src.id)
    if (atk?.state) { atk.state.hitHeroAt = now; atk.state.hitHeroPos = { x: u.pos.x, z: u.pos.z } } // towers and minions answer this call (lane.js heroAggressor)
  }
  if (!opts.quiet) {
    damageText(ctx, u, src, at, d, type, !!opts.big)
    if (u.kind !== 'structure') ctx.emit('flash', { target: u.id, color: '#ffffff', duration: 0.08 })
  }
  return d
}

// Crowd control rows on the target; its owner reads them (player.js for heroes, lane.js for minions).
export function applyEffects(ctx, u, effects, src) {
  if (!effects || u.kind === 'structure') return
  const s = u.h.state
  const now = ctx.now()
  for (const e of effects) {
    if (e.slow != null) { s.slowPct = Math.max(e.slow, (s.slowUntil ?? 0) > now ? s.slowPct ?? 0 : 0); s.slowUntil = Math.max(s.slowUntil ?? 0, now + (e.duration ?? 1) * 1000) }
    if (e.root != null) s.rootUntil = Math.max(s.rootUntil ?? 0, now + e.root * 1000)
    if (e.stun != null) s.stunUntil = Math.max(s.stunUntil ?? 0, now + e.stun * 1000)
    if (e.charm != null) { s.charmUntil = now + e.charm * 1000; s.charmTo = { x: src.pos.x, z: src.pos.z } }
    if (e.engulf != null) { s.engulfUntil = Math.max(s.engulfUntil ?? 0, now + e.engulf * 1000); s.untargetableUntil = Math.max(s.untargetableUntil ?? 0, s.engulfUntil); continue } // Vùi Bùn: lib/engulf.js on the victim; inside the belly no stun ring is drawn
    const kind = e.stun != null ? 'stun' : e.root != null ? 'root' : e.charm != null ? 'charm' : e.slow != null ? 'slow' : null
    if (kind) statusFx(ctx, u, kind, e.stun ?? e.root ?? e.charm ?? e.duration ?? 1)
  }
}
// doc 55 §4: crowd control reads the same on every victim, whoever cast it; rides the body for exactly its duration
const STATUS_FX = 'scripts/effects/vfx-status.fx.js'
export function statusFx(ctx, u, kind, dur, extra) {
  try { ctx.emit('fx', { position: u.pos, script: STATUS_FX, attachTo: u.id, params: { kind, dur, h: u.height ?? 1.8, ...(extra ?? {}) } }) } catch {}
}
// a body's own status (the self-cast haste, a heal, a shield breaking): the same library, built from a handle
export function selfStatus(ctx, h, kind, dur) {
  statusFx(ctx, { id: h.id, pos: h.feetPosition, height: h.bounds?.size?.y ?? 1.8 }, kind, dur)
}
// Hỏa Túy's mark: a sigil that must vanish the moment her blow detonates it, so it rides as a child the caster can take back
const MARKS = new Map()
export function markFx(ctx, u, seconds) {
  clearMark(ctx, u.id)
  try { MARKS.set(u.id, ctx.spawn({ parent: u.id, feetPosition: { x: 0, y: 0, z: 0 }, lifetime: seconds, castShadow: false, fx: { script: STATUS_FX, params: { kind: 'mark', dur: seconds, h: u.height ?? 1.8 } } })) }
  catch { statusFx(ctx, u, 'mark', seconds) }
}
export function clearMark(ctx, id) {
  const fid = MARKS.get(id)
  if (fid) { MARKS.delete(id); if (ctx.getObject(fid)) ctx.destroy(fid) } // a mark past its lifetime is already gone
  if (MARKS.size > 64) MARKS.clear()
}

// A shove: the target's owner slides it `dist` metres along (dx, dz) over 0.25 s.
export function shove(ctx, u, dx, dz, dist) {
  if (u.kind === 'structure') return
  const l = Math.hypot(dx, dz) || 1
  const sp = dist / 0.25
  u.h.state.knock = { vx: (dx / l) * sp, vz: (dz / l) * sp, until: ctx.now() + 250 }
  statusFx(ctx, u, 'knock', 0.4)
}

// A damage-over-time row keyed by its source; the owner ticks it.
export function dot(ctx, u, key, dps, seconds, type, src, addStack, maxStacks) {
  if (u.kind === 'structure') return
  const s = u.h.state
  const prev = s.dots?.[key]
  const live = prev && prev.until > ctx.now()
  const stacks = addStack ? Math.min(maxStacks ?? 99, (live ? prev.stacks ?? 1 : 0) + 1) : 1
  const now = ctx.now(), kind = type === 'physical' ? 'bleed' : 'burn'
  // the look rides the body for the dot's life: a fresh one, a new stack (bleed shows its count) or an old look about to end
  const fxUntil = !live || (kind === 'bleed' && stacks !== prev.stacks) || (prev.fxUntil ?? 0) - now < 800 ? now + seconds * 1000 : prev.fxUntil
  if (fxUntil !== prev?.fxUntil || !live) statusFx(ctx, u, kind, seconds, { n: stacks })
  s.dots = { ...(s.dots ?? {}), [key]: { dps, stacks, until: now + seconds * 1000, type, by: src.id, fxUntil } }
}

// Tick a unit's own dots (owner side). Returns damage taken this step.
const DOT_ACC = {}
export function tickDots(ctx, h, dt, isHero) {
  const ds = h.state.dots
  if (!ds) return 0
  const now = ctx.now()
  let total = 0
  let changed = false
  const keep = {}
  for (const [k, d] of Object.entries(ds)) {
    if (d.until <= now) { changed = true; continue }
    keep[k] = d
    const res = d.type === 'physical' ? h.state.armor ?? 0 : d.type === 'magic' ? h.state.mr ?? 0 : 0
    total += d.dps * (d.stacks ?? 1) * dt * (100 / (100 + res))
    h.state.lastHitBy = d.by
  }
  if (changed) h.state.dots = keep
  if (total > 0) {
    if (isHero && traceOn(ctx)) { const a = (DOT_ACC[h.id] ??= { sum: 0, at: now }); a.sum += total; if (now - a.at >= 1000) { trace(ctx, ['dot', 'dot', h.state.lastHitBy ?? '?', bodyLabel(h.state, h.id), 0, h.state.level ?? 0, 'mixed', 0, 0, 0, Math.round(a.sum), Math.round(h.state.hp), Math.round(h.state.maxHp ?? 0), 0]); a.sum = 0; a.at = now } }
    h.state.hp -= total
  }
  return total
}

// A bolt seen flying from a to b in t seconds (team tinted). Visual only.
// doc54: a basic attack's shot flies at one readable speed (m/s); both the player and the bot use it
export const BOLT_SPEED = 18 // 2026-10-09 @lukasai: basic shots fly slower so they read (was 26)
// Any bolt: a dark under-shade, a soft lighter rim of the same hue (never one flat colour), a saturated body, a pale core, a short tail.
// pal = { rim, body, core } as linear 0..1 rgb; boltFx derives it from one colour, minionBoltFx passes its purple.
const v3 = (c, k) => `<${(c[0] * k).toFixed(2)},${(c[1] * k).toFixed(2)},${(c[2] * k).toFixed(2)}>`
const tint = (c, w) => c.map((x) => x + (1 - x) * w)
function boltProg(a, b, t, pal, size) {
  const v = `<${((b.x - a.x) / t).toFixed(2)},${((b.y - a.y) / t).toFixed(2)},${((b.z - a.z) / t).toFixed(2)}>`, L = t.toFixed(3)
  return `fx
pop shade burst=1 life=${L} v=${v} sz=${(size * 1.55).toFixed(2)} col=${v3(pal.body, 0.15)} a=.7 r=sprite(soft-disc,alpha)
pop rim burst=1 life=${L} v=${v} sz=${(size * 1.35).toFixed(2)} col=${v3(pal.rim, 1.1)} a=.55 r=sprite(soft-disc,add)
pop head burst=1 life=${L} v=${v} sz=${size} col=${v3(pal.body, 2.2)} a=1 r=sprite(soft-disc,add)
pop core burst=1 life=${L} v=${v} sz=${(size * 0.45).toFixed(2)} col=${v3(pal.core, 2.6)} a=1 r=sprite(soft-disc,add)
pop trail on=@head.lives(50) life=.2 sz=${(size * 0.55).toFixed(2)}*(1>0) col=${v3(pal.body, 1.4)}>${v3(pal.rim, 0.8)} a=.9>0 r=sprite(soft-disc,add)`
}
export function boltFx(ctx, a, b, t, color, size = 0.55) {
  const pal = { body: color, rim: tint(color, 0.55), core: tint(color, 0.8) }
  ctx.emit('fx', { position: a, script: boltProg(a, b, t, pal, size) })
}

// Minion shot: small, saturated purple (team-tinted: blue side indigo, red side magenta) with a pale lilac rim.
const MINION_SHOT = { blue: { body: [0.42, 0.18, 1.0], rim: [0.75, 0.68, 1.0], core: [0.85, 0.8, 1.0] }, red: { body: [0.9, 0.12, 0.78], rim: [1.0, 0.7, 0.92], core: [1.0, 0.85, 0.95] } }
export function minionBoltFx(ctx, a, b, t, team, size = 0.16) {
  ctx.emit('fx', { position: a, script: boltProg(a, b, t, MINION_SHOT[team] ?? MINION_SHOT.blue, size) })
}

// A ground ring telegraph or blast of a given radius (visual).
export function ringFx(ctx, at, radius, color, life = 0.5, blast = false) {
  const [r, g, b] = color
  const n = Math.round(Math.min(90, 20 + radius * 10))
  const prog = blast
    ? `fx
pop burst burst=${n} on=disc(${radius.toFixed(2)}) life=.4..0.8 v=up(2..5)+sdir()*1.5 size=.2..0.45 acc=drag(2) sz=$size*(1>0) col=<${r * 3},${g * 3},${b * 3}> a=1>0 r=sprite(soft-disc,add)
pop flash burst=1 life=.25 at=point().c(1) r=light(<${r},${g},${b}>,40*(1>0),${(radius * 3).toFixed(1)})`
    : `fx
pop ring burst=${n} on=disc(${radius.toFixed(2)}) life=${life.toFixed(2)} v=up(.3) size=.18 sz=$size col=<${r * 2},${g * 2},${b * 2}> a=.2>1 r=sprite(soft-disc,add)`
  ctx.emit('fx', { position: { x: at.x, y: at.y + 0.15, z: at.z }, script: prog })
}

// Ground telegraph for an area that lands later (doc 21 B3): an edge ring in the caster's team colour and a fill that
// grows to the edge over the delay, so the struck side reads where and when. Everyone sees it; it lives as long as the wait.
// the walk surface under a point: a bridge or a dais counts, not only the terrain beneath it
export function floorY(ctx, c) {
  const top = (ctx.place.terrain.heightAt(c.x, c.z) ?? c.y ?? 0) + 6
  try { const h = raycast(ctx, { x: c.x, y: top, z: c.z }, { x: 0, y: -1, z: 0 }, { distance: 14, bodies: 'static', physicsOnly: true }); if (h) return h.position.y } catch {}
  return ctx.place.terrain.heightAt(c.x, c.z) ?? c.y ?? 0
}
const TELE = { blue: '#3fd2ff', red: '#ff3b47' }
// Each viewer sees it in THEIR side's colour (doc 21 B1.5): blue = my side cast it, red = dodge. The caster broadcasts
// one invisible marker row (tag 'tele'); every player's own body (hero.js watchTele) draws it locally. Spectators see the caster's team colour.
export function telegraph(ctx, c, radius, seconds, team, mark) {
  const life = Math.max(0.25, seconds) + 0.1
  ctx.spawn({ tags: ['tele'], lifetime: life, physics: 'none', feetPosition: { x: c.x, y: floorY(ctx, c) + 0.12, z: c.z }, state: { radius, seconds, team, at: ctx.now(), ...(mark ? { mark } : {}) } })
}
// a viewer's body: draw each new marker once, in its own side colour
const seenTele = new Set()
export function watchTele(ctx, viewerTeam) {
  const now = ctx.now()
  for (const m of ctx.query({ tags: ['tele'], radius: 60 })) {
    if (seenTele.has(m.id)) continue
    seenTele.add(m.id)
    const st = m.state ?? {}, left = (st.seconds ?? 0.5) - (now - (st.at ?? now)) / 1000
    if (left < 0.1) continue
    drawTelegraph(ctx, { ...m.feetPosition, radius: st.radius ?? 2, seconds: left, team: st.team, mark: st.mark }, viewerTeam)
  }
  if (seenTele.size > 200) seenTele.clear()
}
export function drawTelegraph(ctx, t, viewerTeam) {
  const col = viewerTeam ? (viewerTeam === t.team ? TELE.blue : TELE.red) : (TELE[t.team] ?? '#ffffff')
  const life = Math.max(0.25, t.seconds) + 0.1, radius = t.radius
  const mat = (o, e, k) => ({ texture: `scripts/tex-skillmark.js?k=${k}`, color: col, emissive: col, emissiveIntensity: e, transparent: true, opacity: o, depthWrite: false })
  const W = (radius / 0.86) * 2 // the painted mark's rim sits at .86 of its half-width
  const base = { audience: 'local', lifetime: life, castShadow: false, receiveShadow: false, rotation: { pitch: -90 } }
  if (t.mark?.kind === 'wall') { // the skill's own form: a band where the wall will stand, filling along its length
    const rot = { yaw: t.mark.yaw ?? 0, pitch: -90 }, w = (t.mark.width ?? 0.8) / 0.62
    ctx.spawn({ ...base, rotation: rot, primitive: { kind: 'plane', width: w, height: radius * 2 }, material: mat(0.85, 0.9, 'strip'), feetPosition: { x: t.x, y: t.y, z: t.z } })
    const f = ctx.spawn({ ...base, rotation: rot, primitive: { kind: 'plane', width: w, height: radius * 2 }, scale: { x: 1, y: 0.05, z: 1 }, material: mat(0.5, 0.7, 'strip'), feetPosition: { x: t.x, y: t.y + 0.01, z: t.z } })
    const fh = ctx.getObject(f); if (fh) animate(ctx, fh, { 'scale.y': [0.05, 1] }, { duration: Math.max(0.2, t.seconds), easing: 'linear' })
    return
  }
  if (t.mark?.kind === 'arc') { // a cone AoE: the sector it will strike, rim and both edges, filling outward from the caster
    const rot = { yaw: t.mark.yaw ?? 0, pitch: -90 }, k = `sector&a=${Math.round(t.mark.arc)}`
    ctx.spawn({ ...base, rotation: rot, primitive: { kind: 'plane', width: W, height: W }, material: mat(0.9, 0.9, k), feetPosition: { x: t.x, y: t.y, z: t.z } })
    const f = ctx.spawn({ ...base, rotation: rot, primitive: { kind: 'plane', width: W, height: W }, scale: 0.05, material: mat(0.4, 0.6, k + '&fill=1'), feetPosition: { x: t.x, y: t.y + 0.01, z: t.z } })
    const fh = ctx.getObject(f); if (fh) animate(ctx, fh, { scale: [0.05, 1] }, { duration: Math.max(0.2, t.seconds), easing: 'linear' })
    return
  }
  ctx.spawn({ ...base, primitive: { kind: 'plane', width: W, height: W }, material: mat(0.9, 0.9, 'ring'), feetPosition: { x: t.x, y: t.y, z: t.z } })
  const fill = ctx.spawn({ ...base, primitive: { kind: 'plane', width: W, height: W }, scale: 0.05, material: mat(0.4, 0.6, 'disc'), feetPosition: { x: t.x, y: t.y + 0.01, z: t.z } })
  const h = ctx.getObject(fill)
  if (h) animate(ctx, h, { scale: [0.05, 1] }, { duration: Math.max(0.2, t.seconds), easing: 'linear' })
}
