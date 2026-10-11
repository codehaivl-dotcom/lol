// Overhead plate (lukasai 2026-10-08, AoV ref: level badge, name over a slim stacked HP bar, a thin mana thread).
// Heroes, player and bot, keep the numbers on their own row (hpW, mpW, tickPx, level; tickPlate writes them only
// when they move). The plate itself is drawn per machine by scripts/camera.js: a local panel held square to that
// viewer's camera (yaw AND pitch), so it never reads squashed from the high MOBA eye ("thanh máu bị lép / méo").
const STACK = 250, BAR = 1520 // hp per stack · hp bar width in panel px
const COL = { blue: ['#7dea7a', '#2fae3a'], red: ['#ff9aa0', '#df2f3d'] } // xanh lá như thẻ chỉ số; địch đỏ
const esc = (t) => String(t ?? '').replace(/[<>&"]/g, '')
export const PLATE_KEYS = ['hpW', 'mpW', 'tickPx', 'level']
export function plateUi(team, name) {
  const [hi, lo] = COL[team] ?? COL.blue
  const A = 'position:absolute;'
  return `<div face="front" at="0.5 0.5" width="2.2m" emissive style="position:relative;width:1800px;height:300px">
<div style="${A}left:260px;top:0px;width:1520px;height:100px;overflow:hidden;color:#ffffff;font:700 84px/100px sans-serif;text-shadow:0 0 10px #000,0 0 4px #000,0 0 2px #000;white-space:nowrap">${esc(name)}</div>
<div style="${A}left:180px;top:108px;width:1620px;height:132px;background:#05070ce0"></div>
<div style="${A}left:260px;top:118px;width:${BAR}px;height:82px;background:#262b36"></div>
<div style="${A}left:260px;top:118px;width:{{ state.hpW }}px;height:82px;background:linear-gradient(180deg,${hi},${lo})"></div>
<div style="${A}left:260px;top:118px;width:${BAR}px;height:82px;background-image:linear-gradient(90deg,#05070c 0px,#05070c 8px,rgba(0,0,0,0) 8px);background-size:{{ state.tickPx }}px 82px;background-repeat:repeat-x"></div>
<div style="${A}left:260px;top:208px;width:${BAR}px;height:22px;background:#262b36"></div>
<div style="${A}left:260px;top:208px;width:{{ state.mpW }}px;height:22px;background:#4f86ff"></div>
<div style="${A}left:70px;top:80px;width:220px;height:220px;border-radius:50%;background:#e9d8a6"></div>
<div style="${A}left:86px;top:96px;width:188px;height:188px;border-radius:50%;background:linear-gradient(180deg,#2e3856,#0c1120);color:#ffffff;font:700 104px/188px sans-serif;text-align:center">{{ state.level }}</div>
</div>`
}
export function tickPlate(s) {
  const f = (a, b) => Math.max(0, Math.min(1, (a ?? 0) / (b || 1)))
  const hp = s.dead ? 0 : Math.round(f(s.hp, s.maxHp) * BAR)
  const mp = Math.round(f(s.mana, s.maxMana) * BAR)
  const tk = Math.round((BAR * STACK) / Math.max(STACK, s.maxHp || STACK))
  if (s.hpW !== hp) s.hpW = hp
  if (s.mpW !== mp) s.mpW = mp
  if (s.tickPx !== tk) s.tickPx = tk
}
