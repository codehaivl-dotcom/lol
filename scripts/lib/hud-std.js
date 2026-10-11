// The one standard match HUD's shared pieces (2026-10-08, creator's mock /cdn/hud-mobile-u1l5turj9.webp):
// a crest top-centre (kills · clock · kills, towers destroyed and team gold under it), each team's heroes as round
// portraits on its own side (the viewer's team always left), a Notices panel, the hero card (portrait, name, HP and
// energy, a stat row) and round skill buttons with their full names under them. Desktop and phone both draw these;
// only sizes and placement differ. Presentation only: every number is read from state that already exists.
import { heroPortrait } from '../assets/resolver.js' // doc53 §10: ảnh tướng qua bundle
import ECO from './data/economy.yml'
import { MAP } from './map.js'
import { heroStats } from './combat.js'

const pct = (a, b) => Math.max(0, Math.min(100, (100 * (a ?? 0)) / (b || 1)))
const esc = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
export const clock = (ms) => { const t = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }

// small line glyphs, currentColor, one stroke family
const G = (d, vb = 16) => `<svg viewBox="0 0 ${vb} ${vb}" width="1em" height="1em" style="vertical-align:-.12em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
export const GLYPH = {
  tower: G('<path d="M4 14h8M5 14V7h6v7M4 7V3h2v2h1V3h2v2h1V3h2v4"/>'),
  gold: G('<circle cx="8" cy="8" r="5.5"/><path d="M8 5v6M6.2 6.5h2.8a1.2 1.2 0 010 2.4H7a1.2 1.2 0 000 2.4h2.8"/>'),
  ad: G('<path d="M3 13L11 5M9 3l4 0 0 4M3 10l3 3"/>'),
  armor: G('<path d="M8 2l5 2v4c0 3-2.2 5-5 6-2.8-1-5-3-5-6V4z"/>'),
  mr: G('<path d="M8 2l1.6 4.4L14 8l-4.4 1.6L8 14l-1.6-4.4L2 8l4.4-1.6z"/>'),
  ms: G('<path d="M2 11h7l3-3M5 7h5M3 4h4"/>'),
  swords: G('<path d="M3 3l10 10M13 3L3 13M2 10l4 4M10 14l4-4"/>'),
}

export const STD_STYLE = `<style>
.crest{position:absolute;top:0;left:50%;transform:translateX(-50%);display:flex;align-items:flex-start;pointer-events:auto;filter:drop-shadow(0 4px 8px #000b)}
.crest .side{display:flex;align-items:center;gap:14px;height:46px;padding:0 18px;font-size:14px;color:var(--paper);white-space:nowrap;
 background:linear-gradient(180deg,oklch(.24 .06 var(--th) / .96),oklch(.13 .04 var(--th) / .96));border-bottom:2px solid var(--gold2)}
.crest .side.l{clip-path:polygon(0 0,100% 0,100% 100%,22px 100%);padding-left:30px}.crest .side.r{clip-path:polygon(0 0,100% 0,calc(100% - 22px) 100%,0 100%);padding-right:30px}
.crest .k{font-size:30px;font-weight:800;line-height:1;min-width:34px;text-align:center;text-shadow:0 0 10px currentColor}
.crest .mid{position:relative;display:flex;align-items:center;justify-content:center;width:104px;height:58px;margin:0 -2px;
 background:linear-gradient(180deg,oklch(.3 .05 80),oklch(.14 .03 255) 40%);clip-path:polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)}
.crest .mid::before{content:"";position:absolute;inset:2px 2px 3px;background:radial-gradient(circle at 50% 25%,oklch(.24 .05 250),oklch(.1 .03 255));clip-path:polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)}
.crest .mid b{position:relative;font-size:22px;color:var(--gold);letter-spacing:.05em;line-height:1;margin-top:-10px;font-variant-numeric:tabular-nums}
.crest .st{display:inline-flex;align-items:center;gap:5px;font-weight:700;font-size:14px;font-variant-numeric:tabular-nums}
.crest .st svg{width:15px;height:15px}
.roster{position:absolute;top:6px;display:flex;gap:8px;pointer-events:auto}
.hp-por{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px}
.hp-por .f{position:relative;width:var(--sz);height:var(--sz);border-radius:999px;background:#000 center 18%/cover;box-shadow:0 0 0 2px var(--gold2),0 0 0 3px #000}
.hp-por.dead .f{filter:grayscale(1) brightness(.45)}
.hp-por .lv{position:absolute;left:-4px;bottom:-3px;min-width:17px;height:17px;border-radius:999px;font-size:10px;line-height:17px;text-align:center;background:var(--ink);color:var(--paper);box-shadow:inset 0 0 0 1px var(--gold2)}
.hp-por .rs{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#ff6b6b;text-shadow:0 0 4px #000}
.hp-por .b{width:var(--sz);height:5px;background:#000a;box-shadow:0 0 0 1px #000}.hp-por .b i{display:block;height:100%}
.hp-por .me{box-shadow:0 0 0 2px var(--gold),0 0 0 3px #000,0 0 10px oklch(.85 .12 85 / .6)}
.notice{position:absolute;width:300px;pointer-events:none;background:linear-gradient(180deg,oklch(.19 .04 255 / .92),oklch(.13 .03 255 / .92));box-shadow:inset 0 0 0 1px var(--gold2),0 4px 16px #0008}
.notice h4{margin:0;padding:6px 12px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);box-shadow:inset 0 -1px 0 var(--goldd)}
.notice .row{display:flex;gap:10px;padding:5px 12px;font-size:13px;line-height:17px;color:var(--paper);animation:slidein .25s both}
.notice .row time{color:var(--mute);font-variant-numeric:tabular-nums;flex:none}
.hcard{position:absolute;display:flex;align-items:center;gap:12px;padding:8px 14px 8px 10px;pointer-events:auto;
 background:linear-gradient(180deg,oklch(.2 .045 255 / .94),oklch(.12 .03 255 / .94));box-shadow:inset 0 0 0 1px var(--gold2),0 4px 16px #0009;clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%)}
.hcard .nm{font-size:15px;font-weight:700;color:var(--paper);margin-bottom:4px}
.hcard .bar{position:relative}
.hcard .stats{display:flex;gap:12px;margin-top:6px;font-size:13px;color:var(--paper);white-space:nowrap}
.hcard .stats span{display:inline-flex;align-items:center;gap:4px}.hcard .stats .gd{color:var(--gold);font-weight:700}
.rb{position:relative;display:flex;flex-direction:column;align-items:center;pointer-events:auto;width:calc(var(--d) + 18px)}
.rb .o{position:relative;width:var(--d);height:var(--d);border-radius:999px;background:radial-gradient(circle at 50% 30%,oklch(.4 .08 var(--h,220)),oklch(.15 .04 255)) center/cover;
 box-shadow:0 0 0 2px oklch(.55 .08 80),0 0 0 4px #000c,inset 0 0 10px #000a}
.rb.ready .o{box-shadow:0 0 0 2px var(--cyan),0 0 0 4px #000c,0 0 14px oklch(.8 .13 210 / .55)}
.rb.aim .o{box-shadow:0 0 0 3px var(--gold),0 0 0 5px #000c,0 0 18px oklch(.82 .11 85 / .8)}
.rb.off .o{filter:grayscale(.85) brightness(.55)}
.rb .cd{position:absolute;inset:0;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:calc(var(--d) * .38);font-weight:800;color:#fff;text-shadow:0 0 4px #000,0 1px 2px #000}
.rb .key{position:absolute;left:50%;bottom:-8px;transform:translateX(-50%);min-width:18px;height:16px;padding:0 4px;border-radius:4px;font-size:11px;line-height:16px;text-align:center;font-weight:800;
 background:var(--ink);color:var(--gold);box-shadow:inset 0 0 0 1px var(--gold2)}
.rb .mpc{position:absolute;right:-4px;top:-4px;min-width:20px;height:16px;padding:0 4px;border-radius:8px;font-size:10px;line-height:16px;text-align:center;background:oklch(.28 .1 250);color:oklch(.9 .08 235);box-shadow:0 0 0 1px #000}
.rb .mpc.no{color:#ffb0b0;background:oklch(.3 .1 20)}
.rb .lbl{margin-top:12px;max-width:calc(var(--d) + 22px);text-align:center;font-size:12px;line-height:14px;font-weight:600;color:var(--paper);text-shadow:0 1px 3px #000,0 0 2px #000;
 display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.rb.off .lbl{color:var(--mute)}
.rb:hover .tipc{display:block}
</style>`

// every hero in the match, players and bots, as one list: { id, hero, team, level, hp, maxHp, dead, respawnAt, me, gold }
export function heroesInMatch(ctx) {
  const out = []
  for (const p of ctx.place.players) {
    const st = p.state ?? {}
    if (!st.hero || !st.team) continue
    out.push({ id: p.id, hero: st.hero, team: st.team, level: st.level ?? 1, hp: st.hp, maxHp: st.maxHp, dead: !!st.dead, respawnAt: st.respawnAt, me: !!p.isLocal, gold: st.gold ?? 0 })
  }
  for (const [id, row] of Object.entries(ctx.place.state.bots ?? {})) {
    let st = {}
    try { st = ctx.getObject(id)?.state ?? {} } catch {}
    out.push({ id, hero: row.hero, team: row.team, level: st.level ?? row.level ?? 1, hp: st.hp, maxHp: st.maxHp, dead: !!st.dead, respawnAt: st.respawnAt, me: false, gold: st.gold ?? row.gold ?? 0 })
  }
  return out
}

function towersDown(ctx) {
  const down = { blue: 0, red: 0 } // keyed by the team that destroyed them
  for (const [id, t] of Object.entries(MAP.towers ?? {})) {
    let fallen = false
    try { fallen = !!ctx.getObject(id)?.state?.fallen } catch {}
    if (fallen) down[t.team === 'blue' ? 'red' : 'blue']++
  }
  return down
}

export function crest(ctx, s, now, T, compact) {
  const ps = ctx.place.state
  const mine = s.team === 'red' ? 'red' : 'blue', theirs = mine === 'red' ? 'blue' : 'red'
  const kills = { blue: 0, red: 0 }, gold = { blue: 0, red: 0 }
  for (const p of ctx.place.players) { const st = p.state ?? {}; if (st.team in kills) { kills[st.team] += st.kills ?? 0; gold[st.team] += st.gold ?? 0 } }
  for (const b of Object.values(ps.bots ?? {})) if (b.team in kills) { kills[b.team] += b.kills ?? 0; gold[b.team] += b.gold ?? 0 }
  const tw = towersDown(ctx)
  const t = ps.phase === 'playing' ? clock(now - (ps.startedAt ?? now)) : ps.phase === 'ended' ? T('hud.end') : T('hud.wait')
  const g = (n) => (n >= 10000 ? (n / 1000).toFixed(1) + 'K' : String(n))
  const info = (tm) => compact ? '' : `<span class="st" title="${esc(T('hud.towersDown'))}">${GLYPH.tower}${tw[tm]}</span><span class="st" title="${esc(T('hud.teamGold'))}" style="color:var(--gold)">${GLYPH.gold}${g(gold[tm])}</span>`
  // own team left, its colour stays its own (blue is blue for both sides)
  const sideCls = (tm, pos) => `side ${pos}" style="--th:${tm === 'blue' ? 240 : 20}`
  const kcol = (tm) => `color:var(--${tm})`
  return `<div class="crest"><div class="${sideCls(mine, 'l')}">${info(mine)}<span class="k" style="${kcol(mine)}">${kills[mine]}</span></div>
    <div class="mid"><b>${t}</b></div>
    <div class="${sideCls(theirs, 'r')}"><span class="k" style="${kcol(theirs)}">${kills[theirs]}</span>${info(theirs)}</div></div>`
}

export function rosterRow(list, now, size, side) {
  return list.map((h) => {
    const col = h.team === 'red' ? '#e8424e' : '#3fc3ff'
    const rs = h.dead ? Math.max(0, Math.ceil(((h.respawnAt ?? now) - now) / 1000)) : 0
    return `<div class="hp-por ${h.dead ? 'dead' : ''}" style="--sz:${size}px"><div class="f ${h.me ? 'me' : ''}" style="background-image:url('${heroPortrait(h.hero) ?? ''}')">${h.dead && rs ? `<div class="rs">${rs}</div>` : ''}<div class="lv">${h.level}</div></div>
      <div class="b"><i style="width:${h.dead ? 0 : pct(h.hp, h.maxHp)}%;background:${col}"></i></div></div>`
  }).join('')
}

// the notices panel keeps the last few feed lines this machine saw, stamped with the match clock
const SEEN = []
export function notices(ctx, now, T, TV, keep = 4) {
  const ps = ctx.place.state, f = ps.feed
  if (f && f.at && !SEEN.some((x) => x.at === f.at)) { SEEN.unshift({ at: f.at, f, t: clock(f.at - (ps.startedAt ?? f.at)) }); SEEN.length = Math.min(SEEN.length, 8) }
  const rows = SEEN.filter((x) => now - x.at < 30000 && x.at >= (ps.startedAt ?? 0)).slice(0, keep)
  if (!rows.length) return ''
  return `<h4>${T('hud.notify')}</h4>${rows.map((x) => `<div class="row" id="nt${x.at}"><time>${x.t}</time><span>${x.f.key ? TV(x.f.key, x.f.vars) : esc(x.f.text ?? '')}</span></div>`).join('')}`
}

export function statRow(s, T) {
  let st = {}
  try { st = heroStats(s.hero, s.level ?? 1, s.items ?? []) } catch {}
  const n = (v, d = 0) => (v == null ? '–' : Number(v).toFixed(d))
  return `<div class="stats"><span class="gd" title="${esc(T('hud.shop'))}">${GLYPH.gold}${s.gold ?? 0}</span><span title="${esc(T('stat.ad'))}">${GLYPH.ad}${n(st.ad)}</span><span title="${esc(T('stat.armor'))}">${GLYPH.armor}${n(st.armor)}</span><span title="${esc(T('stat.mr'))}">${GLYPH.mr}${n(st.mr)}</span><span title="${esc(T('stat.moveSpeed'))}">${GLYPH.ms}${n(st.moveSpeed, 1)}</span></div>`
}

// one round skill button: d = diameter; state 'ready' | 'off' | 'aim'; cd = seconds left (0 = none); tip = the hover card html
export function roundBtn({ d, icon, key, label, state, cd = 0, sweep = 0, cost = 0, noMana = false, lock = '', tip = '', hue = 220, id = '' }) {
  const num = lock ? `<div class="cd" style="background:#0009;font-size:${Math.round(d * 0.24)}px">${lock}</div>` : cd > 0 ? `<div class="cd" style="background:conic-gradient(#000c ${sweep}%,#0006 0)">${cd < 1 ? cd.toFixed(1) : Math.ceil(cd)}</div>` : ''
  return `<div class="rb ${state}" ${id ? `id="${id}"` : ''} style="--d:${d}px;--h:${hue}"><div class="o" style="${icon ? `background-image:url('${icon}')` : ''}">${num}${cost > 0 ? `<span class="mpc ${noMana ? 'no' : ''}">${cost}</span>` : ''}${key ? `<span class="key">${key}</span>` : ''}</div>${label ? `<div class="lbl">${esc(label)}</div>` : ''}${tip}</div>`
}
