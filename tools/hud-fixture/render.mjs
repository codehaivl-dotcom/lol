// Dev-only fixture (Group A, 2026-10-08): renders scripts/ui.js's in-match phone HUD outside the engine with a fixed
// player state, then screenshots it at 844×390 and 390×844 with Spawn's rail drawn as a red box. Not a client run.
// node tools/hud-fixture/render.mjs  → /tmp/hudfx/*.png
import fs from 'fs'; import path from 'path'; import { execSync } from 'child_process'
const ROOT = process.cwd(), OUT = '/tmp/hudfx', SRC = path.join(OUT, 'src')
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(SRC, { recursive: true })
const py = (f) => execSync(`python3 -c "import yaml,json,sys;print(json.dumps(yaml.safe_load(open(sys.argv[1],encoding='utf-8'))))" ${f}`).toString()
const copy = (rel) => {
  const dst = path.join(SRC, rel)
  fs.mkdirSync(path.dirname(dst), { recursive: true })
  if (rel.endsWith('.yml')) return fs.writeFileSync(dst + '.mjs', 'export default ' + py(path.join(ROOT, rel)))
  let s = fs.readFileSync(path.join(ROOT, rel), 'utf-8')
  s = s.replace(/from '(\.[^']+\.yml)'/g, "from '$1.mjs'").replace(/from '(\.[^']+)\.js'/g, "from '$1.js'")
  s = s.replace(/from ['"]builtin\/[^'"]+['"]/g, `from '${path.join(SRC, 'builtin.mjs')}'`)
  fs.writeFileSync(dst.replace(/\.js$/, '.js'), s)
  for (const m of s.matchAll(/from '(\.[^']+)'/g)) { const r = path.join(path.dirname(rel), m[1]).replace(/\.mjs$/, ''); if (!fs.existsSync(path.join(SRC, r)) && !fs.existsSync(path.join(SRC, r + '.mjs'))) copy(r) }
}
fs.writeFileSync(path.join(SRC, 'package.json'), '{"type":"module"}')
fs.writeFileSync(path.join(SRC, 'builtin.mjs'), 'export const animate=()=>{};export const raycast=()=>null;export default {}')
const walk = (d) => fs.readdirSync(path.join(ROOT, d), { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])
for (const rel of walk('scripts')) if (/\.(js|yml)$/.test(rel)) copy(rel) // every script, so the lazily imported match HUD is there too
const NOW = 600000
globalThis.matchMedia = () => ({ matches: true })
let VW = 844, VH = 390
Object.defineProperty(globalThis, 'innerWidth', { get: () => VW }); Object.defineProperty(globalThis, 'innerHeight', { get: () => VH }) // the HUD fits itself to the viewport at render time
const { default: render } = await import(path.join(SRC, 'scripts/ui.js'))
const fixtures = {
  // level 4, Q on cooldown 3.4 s, W short of energy, R locked (unlocks 6), E ready, relic carried and cooling
  alive: { hero: 'mi_dang', team: 'blue', level: 4, xp: 120, hp: 610, maxHp: 900, mana: 20, maxMana: 400, gold: 1350, kills: 2, deaths: 1, cs: 34,
    cd: { q: NOW + 3400, lmb: NOW }, cdLen: { q: 8 }, items: ['bastion_stone'], relicReadyAt: NOW + 21000, dodgeReadyAt: NOW + 1500 },
  dead: { hero: 'moc_lam', team: 'red', level: 7, hp: 0, maxHp: 1400, mana: 0, maxMana: 0, gold: 900, kills: 1, deaths: 3, cs: 50, dead: true, respawnAt: NOW + 9000, cd: {}, cdLen: {}, items: [] },
}
fixtures.shop = { ...fixtures.alive, shopOpen: true }; fixtures.menu = { ...fixtures.alive, menuOpen: true }
const ctx = (loc) => ({ now: () => NOW, world: { mode: 'dev', state: {}, players: [] }, place: { state: { phase: 'playing', startedAt: NOW - 754000, lobby: { phase: 'ingame', mode: 'tai_hien', host: 'me', startedAt: NOW - 754000, match: { roster: { me: { hero: 'mi_dang', team: 'blue' } } } }, bots: {} },
  players: [{ id: 'me', isLocal: true, displayName: 'tester', feetPosition: { x: -60, y: 0, z: 50 }, state: {} }] }, query: () => [], getObject: () => null })
const views = { p844: [844, 390, 15, 360], p667: [667, 375, 8, 360], p932: [932, 430, 35, 360], w738: [738, 444, 42, 360] }
const html = []
for (const loc of ['vi-VN', 'en']) render(ctx(loc), { id: 'me', isLocal: true, state: { ...fixtures.alive, locale: loc } }) // first pass fetches the lazy match HUD
await new Promise((r) => setTimeout(r, 500))
for (const [vn, [w, ht]] of Object.entries(views)) { VW = w; VH = ht
  for (const [fx, st] of Object.entries(fixtures)) for (const loc of ['vi-VN', 'en']) {
    const player = { id: 'me', isLocal: true, state: { ...st, locale: loc }, feetPosition: { x: -60, y: 0, z: 50 } }
    const c = ctx(loc); c.place.players[0].state = player.state
    html.push([`${fx}-${loc}-${vn}`, render(c, player), vn])
  } }
fs.writeFileSync(path.join(OUT, 'html.json'), JSON.stringify(html))
const { chromium } = await import('playwright')
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--no-sandbox'] })
const report = []
for (const [name, h, vn] of html) { const [w, ht, rt, rh] = views[vn]
  const page = await browser.newPage({ viewport: { width: w, height: ht }, hasTouch: true, isMobile: true })
  await page.setContent(`<html style="--spawn-chrome-reservation-right-inset:50px;--spawn-chrome-reservation-right-top:${rt}px;--spawn-chrome-reservation-right-height:${rh}px"><head><meta name="viewport" content="width=device-width,initial-scale=1"><script src="https://cdn.tailwindcss.com"></script></head>
  <body style="margin:0;background:linear-gradient(135deg,#3a5a3a,#5b6d47 50%,#2f4a5a);font-family:'Noto Sans',sans-serif;overflow:hidden">
  <div style="position:fixed;left:35%;top:45%;width:60px;height:110px;background:#c84;border-radius:30px;opacity:.8"></div>
  <div style="position:fixed;right:0;top:${rt}px;width:50px;height:${rh}px;outline:2px dashed red;background:#f002"></div>
  <div style="position:fixed;left:20px;bottom:20px;width:120px;height:120px;border-radius:999px;border:3px dashed #fff8"></div>
  ${h}<script>window.sendAction=()=>{}</script></body></html>`, { waitUntil: 'load', timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/${name}.png` })
  // measure: every touch button's box, overlap with the rail, off-screen, label overflow
  const m = await page.evaluate(([rt, rh]) => [...document.querySelectorAll('.tb,.tshop')].map((e) => { const r = e.getBoundingClientRect(); const lbl = e.querySelector('.lbl,.w'); return { id: e.id, x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), rail: r.right > innerWidth - 50 && r.bottom > rt && r.top < rt + rh, off: r.left < 0 || r.right > innerWidth || r.top < 0 || r.bottom > innerHeight, clip: lbl ? lbl.scrollWidth > e.clientWidth || (lbl.getBoundingClientRect().left < r.left - 1) || (lbl.getBoundingClientRect().right > r.right + 1) : false } }), [rt, rh])
  report.push({ shot: name, buttons: m })
  await page.close()
}
await browser.close()
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1))
for (const r of report) console.log(r.shot, r.buttons.length, 'rail:', r.buttons.filter((b) => b.rail).map((b) => b.id).join(',') || '-', 'off:', r.buttons.filter((b) => b.off).map((b) => b.id).join(',') || '-', 'clip:', r.buttons.filter((b) => b.clip).map((b) => b.id).join(',') || '-', 'min:', Math.min(...r.buttons.map((b) => Math.min(b.w, b.h))))
