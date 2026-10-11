// Dev-only fixture: lobby tabs (Home/Room/Heroes/Hall/Lore) on narrow screens. Based on lobby-screens.mjs, which renders the lobby PICK (open + locked), VERSUS and RESULTS screens through the real
// scripts/ui.js router outside the engine with fixed place/player state, at desktop 1280×720 and phone 844×390,
// VI and EN, and screenshots each. Not a client run: no 3D behind, fonts from this box.
// node tools/ui-fixture/lobby-screens.mjs <outDir>   → <outDir>/*.png + html.json (diff two runs to prove a refactor)
import fs from 'fs'; import path from 'path'; import { execSync } from 'child_process'
const ROOT = process.cwd(), OUT = process.argv[2] ?? '/tmp/lobbyfx', SRC = path.join(OUT, 'src')
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(SRC, { recursive: true })
const yml = (f) => execSync(`python3 -c "import yaml,json,sys;print(json.dumps(yaml.safe_load(open(sys.argv[1],encoding='utf-8'))))" ${f}`).toString()
const walk = (d) => fs.readdirSync(path.join(ROOT, d), { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])
for (const rel of walk('scripts')) {
  const dst = path.join(SRC, rel); fs.mkdirSync(path.dirname(dst), { recursive: true })
  if (rel.endsWith('.yml')) fs.writeFileSync(dst + '.mjs', 'export default ' + yml(path.join(ROOT, rel)))
  else if (rel.endsWith('.js')) fs.writeFileSync(dst, fs.readFileSync(path.join(ROOT, rel), 'utf-8')
    .replace(/(['"])(\.[^'"]+\.yml)\1/g, '$1$2.mjs$1').replace(/from ['"]builtin\/[^'"]+['"]/g, `from '${path.join(SRC, 'builtin.mjs')}'`))
}
fs.writeFileSync(path.join(SRC, 'package.json'), '{"type":"module"}')
fs.writeFileSync(path.join(SRC, 'builtin.mjs'), 'export const animate=()=>{};export const raycast=()=>null;export default {}')
let VW = 1280, VH = 720, COARSE = false
globalThis.matchMedia = (q) => ({ matches: q.includes('coarse') ? COARSE : [...q.matchAll(/max-(width|height):\s*(\d+)px/g)].some(([, k, v]) => (k === 'width' ? VW : VH) <= +v) })
Object.defineProperty(globalThis, 'innerWidth', { get: () => VW }); Object.defineProperty(globalThis, 'innerHeight', { get: () => VH })
globalThis.sendAction = () => {}
const { default: render } = await import(path.join(SRC, 'scripts/ui.js'))
const NOW = 600000
const team = { blue: ['me'], red: ['bot-red-1'] }, names = { me: 'tester', 'bot-red-1': 'Máy' }
const base = { mode: 'san_tap', map: 'mach_giua', host: 'me', teams: team, joinOrder: ['me'], names, ack: { me: 3 }, err: {} }
const roster = { me: { team: 'blue', slot: 0, hero: 'van_dao', name: 'tester' }, 'bot-red-1': { team: 'red', slot: 0, hero: 'moc_lam', name: 'Máy' } }
const rows = [{ userId: 'me', team: 'blue', hero: 'van_dao', name: 'tester', level: 9, k: 6, d: 2, cs: 88, gold: 5120 }, { userId: 'bot-red-1', team: 'red', hero: 'moc_lam', name: 'Máy', level: 7, k: 2, d: 6, cs: 61, gold: 3400 }]
const lob = { ...base, phase: 'lobby', pick: {} }
const FX = Object.fromEntries(['home', 'room', 'heroes', 'hall', 'lore'].map((v) => [v, { lobby: lob, view: v === 'home' ? null : v }]))
const VIEWS = { win: [738, 444, false], phone: [844, 390, true] }
const out = []
const draw = (fx, loc) => {
  const st = { locale: loc, view: fx.view ?? null, lobbyReq: fx.req ?? null }
  const ps = { lobby: fx.lobby, match: fx.match ?? null, results: fx.results ?? null }
  const ctx = { now: () => NOW, world: { mode: 'live', state: {}, players: [] }, place: { state: ps, players: [{ id: 'me', userId: 'me', isLocal: true, displayName: 'tester', state: st }] }, query: () => [], getObject: () => null }
  return render(ctx, { id: 'me', userId: 'me', isLocal: true, displayName: 'tester', state: st })
}
for (const [vn, [w, h, coarse]] of Object.entries(VIEWS)) {
  VW = w; VH = h; COARSE = coarse
  for (const fx of Object.values(FX)) for (const l of ['vi-VN', 'en']) draw(fx, l) // first pass fetches the lazy screen modules
  await new Promise((r) => setTimeout(r, 300))
  for (const [name, fx] of Object.entries(FX)) for (const loc of ['vi-VN', 'en']) out.push([`${name}-${loc === 'en' ? 'en' : 'vi'}-${vn}`, w, h, coarse, draw(fx, loc)])
}
fs.writeFileSync(path.join(OUT, 'html.json'), JSON.stringify(out.map(([n, , , , h]) => [n, h])))
const { chromium } = await import('playwright')
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--no-sandbox'] })
for (const [name, w, h, coarse, html] of out) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, hasTouch: coarse, isMobile: coarse })
  await page.setContent(`<html style="--spawn-chrome-reservation-right-inset:50px;--spawn-chrome-reservation-right-top:${Math.round(h * 0.3)}px;--spawn-chrome-reservation-right-height:${Math.round(h * 0.4)}px"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;background:linear-gradient(135deg,#2a3550,#4b4d37 50%,#1f2a3a);font-family:'Noto Sans',sans-serif;color:#eee;overflow:hidden">${html}<script>window.sendAction=()=>{}</script></body></html>`, { waitUntil: 'load', timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(900) // let the rise animations land
  await page.screenshot({ path: path.join(OUT, name + '.png') })
  await page.close()
}
await browser.close()
console.log(`${out.length} renders → ${OUT}`)
