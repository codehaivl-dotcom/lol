// Phone/tablet match controls, Arena-of-Valor shaped (doc 19 §4 Mobile, doc14 B9). ui.js draws this only in a
// match, on a coarse pointer, with a hero, alive or dead, while no shop panel stands over it.
// Bottom-right: basic attack 96 px, Q W E R (slots q / rmb / e / r, the desktop's Q W E R) on an arc of 64 px, and
// D (dodge) / F (relic) / recall at 48 px on an outer arc. Left edge: the shop as a tall button with the gold.
// Every press is the action hero.js already reads, sent as a held button (down on press, up on release), so the
// phone quick-cast and the held basic attack in hero.js onInput behave as the engine chips did. The move stick
// stays the engine's (world.config inputs.touch). Presentation only: no number here is gameplay.
import { heroIcons } from '../assets/resolver.js' // doc53 §10: ảnh tướng qua bundle
import { HEROES } from './heroes.js'
import ECO from './data/economy.yml'
import ART from './data/art.yml'
import { rankOf, pick } from './combat.js'
import { anyItem, itemsOf } from './items.js'

const ABS = 'position:absolute;'
// geometry, px from the attack button's centre (x left-negative, y up-positive); cx/cy = that centre's distance from the box's right/bottom edge
export const GEO = { attack: 112, skill: 74, small: 48, arcR: 168, arcA: [180, 150, 120, 90], outR: 218, outA: [155, 130, 105], cx: 60, cy: 70,
  // the right thumb's fight buttons beside the arc (mobile HUD, @lukasai 2026-10-08 "nút né quá xa"): dodge low-left of the attack past Q, where the thumb rolls off it; relic outside W
  side: { dodge: [-244, -16], relic: [-312, -16], recall: [-380, -16] }, sideSize: 58 } // AoV's spell row (@lukasai ref 2026-10-08): recall · relic · dodge in a labelled row at the bottom, dodge hugging Q // dodge and relic hug the attack button (AoV's two small chips, @lukasai 2026-10-08)
const SLOTS = [['q', 'q', 'Q'], ['rmb', 'rmb', 'W'], ['e', 'e', 'E'], ['r', 'r', 'R']] // [kit slot, action hero.js reads, desktop key]
const at = (r, deg) => [Math.cos((deg * Math.PI) / 180) * r, Math.sin((deg * Math.PI) / 180) * r]
// the cluster box: wide enough for the outer arc, tall enough for its top
const W = Math.ceil(GEO.cx - Math.min(...GEO.outA.map((a) => at(GEO.outR, a)[0]), ...Object.values(GEO.side).map((p) => p[0])) + GEO.sideSize / 2)
const H = Math.ceil(GEO.cy + Math.max(...GEO.outA.map((a) => at(GEO.outR, a)[1])) + GEO.small / 2)
// the right column only (attack + R straight above it) can meet Spawn's rail; its height decides the step-off
const RAIL_H = Math.ceil(GEO.cy + GEO.arcR + GEO.skill / 2 + 6)
export const BOX = { W, H, RAIL_H }
const R_UNLOCK = (() => { for (let l = 1; l <= 30; l++) if (rankOf('r', l) >= 0) return l; return 0 })()

const press = (act) => `onpointerdown="event.preventDefault();try{this.setPointerCapture(event.pointerId)}catch(e){};sendAction('${act}',undefined,{down:true})" onpointerup="sendAction('${act}',undefined,{down:false})" onpointercancel="sendAction('${act}',undefined,{down:false})" oncontextmenu="event.preventDefault()"`

const STYLE = `<style>
.tc{${ABS}pointer-events:none;width:${W}px;height:${H}px;bottom:calc(10px + var(--spawn-safe-area-bottom,0px));
 right:calc(var(--spawn-safe-area-right,0px) + clamp(14px,(${RAIL_H}px - (100vh - var(--spawn-chrome-reservation-right-top,100vh) - var(--spawn-chrome-reservation-right-height,0px))) * 999,var(--spawn-chrome-reservation-right-inset,50px) + 14px))}
.tb{${ABS}pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none;border-radius:999px;padding:0;overflow:hidden;
 background:radial-gradient(circle at 40% 35%,oklch(.42 .06 250),oklch(.2 .04 250)) center/cover;border:3px solid var(--gold,oklch(.78 .12 85));
 color:var(--paper,#f4ecd8);box-shadow:0 0 0 2px var(--ink,#0b1020),0 0 10px oklch(.6 .15 220 / .45);font-family:inherit}
.tb:active{transform:scale(.93);filter:brightness(1.3)}
.tb .ov{${ABS}inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;line-height:1;text-shadow:0 1px 2px #000,0 0 3px #000}
.tb .k{${ABS}left:50%;top:3px;transform:translateX(-50%);font-size:11px;background:var(--ink,#0b1020);color:var(--gold,#e8c46a);padding:0 4px;border-radius:3px;line-height:14px}
.tb.atk{border-width:4px;background-color:oklch(.3 .08 40)}
.tb.atk .lbl{font-size:16px;font-weight:800;letter-spacing:.04em;background:#0008;padding:2px 5px;border-radius:4px}
.tb.sm{border-width:2px;font-size:11px;font-weight:700}
.tb.sm .lbl{font-size:10px;white-space:nowrap}
.tb.cd .ov{background:#000a;font-size:20px;color:#fff}
.tb.sm.cd .ov{font-size:15px}
.tb.nomana{filter:grayscale(1)}.tb.nomana .ov{background:oklch(.45 .14 255 / .55)}
.tb.lock{filter:grayscale(1) brightness(.7)}.tb.lock .ov{background:#0009;font-size:13px}
.tb.off{filter:grayscale(1) brightness(.55)}
.tb.dead{filter:grayscale(1) brightness(.5)}
.tlbl{position:absolute;transform:translateX(-50%);max-width:86px;padding:1px 6px;border-radius:7px;background:oklch(.14 .03 255 / .92);box-shadow:0 0 0 1px var(--gold2,#a88a4a);text-align:center;font-size:10px;line-height:12px;font-weight:700;color:var(--paper,#f4ecd8);pointer-events:none;text-shadow:0 1px 2px #000,0 0 3px #000;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tshop{${ABS}pointer-events:auto;touch-action:none;left:var(--spawn-safe-area-left,0px);top:190px;width:46px;min-height:120px;padding:8px 0;
 display:flex;flex-direction:column;align-items:center;gap:6px;background:linear-gradient(oklch(.3 .06 80),oklch(.17 .04 255));
 border:2px solid var(--gold,#e8c46a);border-left:none;border-radius:0 10px 10px 0;box-shadow:0 0 0 2px var(--ink,#0b1020);color:var(--gold,#e8c46a)}
.tshop .w{writing-mode:vertical-rl;font-size:13px;letter-spacing:.08em;white-space:nowrap;color:var(--paper,#f4ecd8)}
.tshop .g{font-size:14px;font-weight:700}
</style>`

const secs = (left) => (left < 1 ? left.toFixed(1) : String(Math.ceil(left)))

// one button: id stays the same render to render so a held press keeps its pointer capture
function button(id, act, x, y, size, cls, bg, inner, aria) {
  return `<button id="tb-${id}" class="tb ${cls}" aria-label="${aria}" style="left:${(W - GEO.cx + x - size / 2).toFixed(0)}px;bottom:${(GEO.cy + y - size / 2).toFixed(0)}px;width:${size}px;height:${size}px;${bg}" ${press(act)}><div class="ov">${inner}</div></button>`
}

// state of one kit slot for this viewer: what the button shows. Pure: the fixture test calls it too.
export function slotState(s, k, now) {
  const kit = HEROES.heroes[s.hero]?.[k]
  const rank = rankOf(k, s.level ?? 1)
  const left = ((s.cd?.[k] ?? 0) - now) / 1000
  const cost = kit && rank >= 0 ? pick(kit.cost, rank) ?? 0 : 0
  if (s.dead) return { st: 'dead' }
  if (rank < 0) return { st: 'lock', unlock: R_UNLOCK }
  if (left > 0) return { st: 'cd', left }
  if (cost > (s.mana ?? 0)) return { st: 'nomana', cost }
  return { st: 'ready' }
}

export function touchCluster(s, now, T, SK, opt = {}) {
  if (!s.hero) return ''
  const ic = heroIcons(s.hero)
  const img = (u) => (u ? `background-image:url('${u}');` : '')
  let out = ''
  // basic attack
  const dead = !!s.dead
  const atkLeft = ((s.cd?.lmb ?? 0) - now) / 1000
  const respawn = Math.max(0, Math.ceil(((s.respawnAt ?? now) - now) / 1000))
  out += button('lmb', 'attack', 0, 0, GEO.attack, `atk ${dead ? 'dead' : ''}`, img(ic.lmb ?? ART.attackIcon),
    dead ? `<span style="font-size:26px">${respawn}</span><span class="lbl" style="font-size:12px;margin-top:4px">${T('hud.touch.dead')}</span>` : atkLeft > 0.15 ? `<span style="font-size:15px;background:#0009;padding:1px 6px;border-radius:6px">${secs(atkLeft)}</span>` : '',
    SK(s.hero, 'lmb'))
  // Q W E R
  SLOTS.forEach(([k, act, key], i) => {
    const [x, y] = at(GEO.arcR, GEO.arcA[i])
    const st = slotState(s, k, now)
    const inner = st.st === 'cd' ? secs(st.left) : st.st === 'lock' ? `🔒<span style="font-size:11px;margin-top:3px">${T('hud.touch.lv', { n: st.unlock })}</span>` : ''
    const aria = `${SK(s.hero, k)}${st.st === 'nomana' ? ' · ' + T('hud.touch.noMana') : st.st === 'lock' ? ' · ' + T('msg.rLocked') : ''}`
    out += button(k, act, x, y, GEO.skill, st.st === 'ready' ? '' : st.st, img(ic[k]), `${inner}<span class="k">${key}</span>`, aria)
    out += `<div class="tlbl" style="left:${(W - GEO.cx + x).toFixed(0)}px;bottom:${(GEO.cy + y - GEO.skill / 2 - 7).toFixed(0)}px">${SK(s.hero, k)}</div>`
  })
  // D / F / recall
  const dodgeL = ((s.dodgeReadyAt ?? 0) - now) / 1000
  const relicL = ((s.relicReadyAt ?? 0) - now) / 1000
  const hasRelic = (s.items ?? []).some((i) => anyItem(i)?.slot === 'relic')
  const recalling = !!s.recallAt
  const smalls = [
    ['dodge', 'dodge', T('hud.touch.dodge'), dead ? 'dead' : dodgeL > 0 ? 'cd' : '', dodgeL > 0 ? secs(dodgeL) : null],
    ['relic', 'relic', T('hud.touch.relic'), dead ? 'dead' : !hasRelic ? 'off' : relicL > 0 ? 'cd' : '', hasRelic && relicL > 0 ? secs(relicL) : null],
    ['recall', 'recall', T('hud.touch.recall'), dead ? 'dead' : recalling ? 'cd' : '', recalling ? secs(Math.max(0, (s.recallAt - now) / 1000)) : null],
  ]
  if (!opt.noSmall) smalls.forEach(([id, act, label, cls, num], i) => {
    const [x, y] = at(GEO.outR, GEO.outA[i])
    const icon = id === 'dodge' ? ART.dodgeIcon : id === 'recall' ? ART.recallIcon : ART.items?.[(s.items ?? []).find((i) => anyItem(i)?.slot === 'relic')]
    out += button(id, act, x, y, GEO.small, `sm ${cls}`, img(icon), num != null ? num : `<span class="lbl" style="background:#000a;padding:0 3px;border-radius:3px">${label}</span>`, label)
  })
  // the side pair (opt.side): dodge + relic on the right thumb, each with its name under it
  if (opt.side) smalls.forEach(([id, act, label, cls, num]) => {
    const [x, y] = GEO.side[id]
    const icon = id === 'dodge' ? ART.dodgeIcon : id === 'recall' ? ART.recallIcon : ART.items?.[(s.items ?? []).find((i) => anyItem(i)?.slot === 'relic')]
    out += button(id, act, x, y, GEO.sideSize, `sm ${cls}`, img(icon), num != null ? num : icon ? '' : `<span style="font-size:20px;color:#e8c46a99">${id === 'dodge' ? '»' : '◇'}</span>`, label)
    out += `<div class="tlbl" style="left:${(W - GEO.cx + x).toFixed(0)}px;bottom:${(GEO.cy + y - GEO.sideSize / 2 - 15).toFixed(0)}px">${label}</div>`
  })
  return `${STYLE}<div class="tc" id="touch-cluster"${opt.style ? ` style="${opt.style}"` : ''}>${out}</div>`
}

export function touchShop(s, T) {
  if (!s.hero) return ''
  return `<button id="tb-shop" class="tshop" onclick="sendAction('shop')" aria-label="${T('hud.shop')}"><span class="g">◈</span><span class="g">${s.gold ?? 0}</span><span class="w">${T('hud.touch.shop')}</span></button>`
}

// ---------- the row layout (creator's mobile HUD reference /cdn/hud-mobile-u1l5turj9.webp, 2026-10-08) ----------
// one horizontal row along the bottom: recall · relic · dodge · Q W E R, each with its name under it, then the big
// Tấn Công button. Laid out in design px inside ui.js's scaled canvas; same presses, same slot states as the arc.
const ROW_STYLE = `<style>
.trow{position:absolute;display:flex;align-items:flex-end;gap:8px;pointer-events:none}
.tcell{display:flex;flex-direction:column;align-items:center;gap:3px}
.tcell .tb{position:relative}
.tcell .nm2{margin-top:5px;font-size:11px;line-height:13px;font-weight:700;color:var(--paper,#f4ecd8);text-shadow:0 1px 2px #000,0 0 3px #000;white-space:nowrap;max-width:84px;overflow:hidden;text-overflow:ellipsis}
.tcell .kk{position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);font-size:10px;line-height:13px;min-width:14px;text-align:center;background:var(--ink,#0b1020);color:var(--gold,#e8c46a);box-shadow:inset 0 0 0 1px var(--gold2,#a88a4a);border-radius:3px;padding:0 3px;z-index:2}
.tcell .wrap{position:relative}
</style>`
function cell(id, act, size, cls, bg, inner, aria, name, key) {
  return `<div class="tcell"><div class="wrap"><button id="tb-${id}" class="tb ${cls}" aria-label="${aria}" style="width:${size}px;height:${size}px;${bg}" ${press(act)}><div class="ov">${inner}</div></button>${key ? `<span class="kk">${key}</span>` : ''}</div><div class="nm2">${name}</div></div>`
}
export function touchRow(s, now, T, SK, style, sz = { skill: 56, small: 42, attack: 80 }) {
  if (!s.hero) return ''
  const ic = heroIcons(s.hero)
  const img = (u) => (u ? `background-image:url('${u}');` : '')
  const dead = !!s.dead
  const dodgeL = ((s.dodgeReadyAt ?? 0) - now) / 1000
  const relicL = ((s.relicReadyAt ?? 0) - now) / 1000
  const relicId = (s.items ?? []).find((i) => anyItem(i)?.slot === 'relic')
  const recalling = !!s.recallAt
  const small = [
    ['recall', 'recall', T('hud.touch.recall'), 'B', dead ? 'dead' : recalling ? 'cd' : '', recalling ? secs(Math.max(0, (s.recallAt - now) / 1000)) : '', ART.recallIcon],
    ['relic', 'relic', relicId ? (LOCv(T) === 'en' ? anyItem(relicId).en : anyItem(relicId).vi) : T('hud.touch.relic'), 'F', dead ? 'dead' : !relicId ? 'off' : relicL > 0 ? 'cd' : '', relicId && relicL > 0 ? secs(relicL) : '', ART.items?.[relicId]],
    ['dodge', 'dodge', T('hud.touch.dodge'), 'D', dead ? 'dead' : dodgeL > 0 ? 'cd' : '', dodgeL > 0 ? secs(dodgeL) : '', ART.dodgeIcon],
  ]
  let out = small.map(([id, act, name, key, cls, num, icon]) => cell(id, act, sz.small, `sm ${cls}`, img(icon), num || (icon ? '' : `<span style="font-size:16px;color:#e8c46a99">${id === 'relic' ? '◇' : id === 'recall' ? '⌂' : '»'}</span>`), name, name, key)).join('')
  for (const [k, act, key] of SLOTS) {
    const st = slotState(s, k, now)
    const inner = st.st === 'cd' ? secs(st.left) : st.st === 'lock' ? `🔒<span style="font-size:11px;margin-top:3px">${T('hud.touch.lv', { n: st.unlock })}</span>` : ''
    const aria = `${SK(s.hero, k)}${st.st === 'nomana' ? ' · ' + T('hud.touch.noMana') : st.st === 'lock' ? ' · ' + T('msg.rLocked') : ''}`
    out += cell(k, act, sz.skill, st.st === 'ready' ? '' : st.st, img(ic[k]), inner, aria, SK(s.hero, k), key)
  }
  const atkLeft = ((s.cd?.lmb ?? 0) - now) / 1000
  const respawn = Math.max(0, Math.ceil(((s.respawnAt ?? now) - now) / 1000))
  out += `<span style="width:6px"></span>` + cell('lmb', 'attack', sz.attack, `atk ${dead ? 'dead' : ''}`, img(ic.lmb),
    dead ? `<span style="font-size:24px">${respawn}</span>` : atkLeft > 0.15 ? `<span style="font-size:14px">${secs(atkLeft)}</span>` : ic.lmb ? '' : '<svg viewBox="0 0 16 16" width="34" height="34" fill="none" stroke="#e8c46a" stroke-width="1.4" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13M2 10l4 4M10 14l4-4"/></svg>',
    SK(s.hero, 'lmb'), dead ? T('hud.touch.dead') : T('hud.attack'), '')
  return `${STYLE}${ROW_STYLE}<div class="trow" id="touch-row" style="${style}">${out}</div>`
}
const LOCv = (T) => (T('shop.buy') === 'Buy' ? 'en' : 'vi')

// recall · relic · dodge as one row (Arena of Valor's Recall / Restore / Sprint row), names under each
export function touchSmalls(s, now, T, style, size = 50, only = null) {
  if (!s.hero) return ''
  const dead = !!s.dead
  const dodgeL = ((s.dodgeReadyAt ?? 0) - now) / 1000
  const relicL = ((s.relicReadyAt ?? 0) - now) / 1000
  const relicId = (s.items ?? []).find((i) => anyItem(i)?.slot === 'relic')
  const recalling = !!s.recallAt
  const img = (u) => (u ? `background-image:url('${u}');` : '')
  const rows = [
    ['recall', T('hud.touch.recall'), dead ? 'dead' : recalling ? 'cd' : '', recalling ? secs(Math.max(0, (s.recallAt - now) / 1000)) : '', ART.recallIcon, '⌂'],
    ['relic', relicId ? (LOCv(T) === 'en' ? anyItem(relicId).en : anyItem(relicId).vi) : T('hud.touch.relic'), dead ? 'dead' : !relicId ? 'off' : relicL > 0 ? 'cd' : '', relicId && relicL > 0 ? secs(relicL) : '', ART.items?.[relicId], '◇'],
    ['dodge', T('hud.touch.dodge'), dead ? 'dead' : dodgeL > 0 ? 'cd' : '', dodgeL > 0 ? secs(dodgeL) : '', ART.dodgeIcon, '»'],
  ]
  return `${STYLE}${ROW_STYLE}<div class="trow" id="touch-smalls" style="${style}">${rows.filter(([id]) => !only || only.includes(id)).map(([id, name, cls, num, icon, glyph]) => cell(id, id, size, `sm ${cls}`, img(icon), num || (icon ? '' : `<span style="font-size:18px;color:#e8c46a99">${glyph}</span>`), name, name, '')).join('')}</div>`
}
