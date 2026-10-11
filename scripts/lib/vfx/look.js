// Cổ Linh VFX grammar (doc 55): the shared look every hero composes. One effect = ONE silhouette (shape) × FOUR colour tiers (palette).
// Data only: palettes, silhouettes (SVG, baked by the engine as a crisp distance field), motif sprites, tier scales.
// A hero never invents colours or shapes inline: it names an element, a motif and a silhouette per moment (scripts/lib/data/vfx-heroes.yml).

// ---- palettes: 4 tiers + light. rim = white-hot leading edge · body = the saturated element colour · deep = the dark tail/core
// (plain 0..1, it reads as depth, never glow) · accent = the 10–20 % contrast spark (complementary or neighbouring hue) · light = point light.
// Values are linear HDR [r,g,b]; mid-band saturation (Riot style guide: avoid 0 % / 100 %).
export const PAL = {
  hoa:    { name: 'Hỏa · lửa',          rim: [5.0, 4.2, 2.6], body: [4.2, 1.3, 0.22], deep: [0.38, 0.06, 0.02], accent: [4.4, 3.2, 0.7],  light: [1, 0.5, 0.16] },
  dung:   { name: 'Dung nham',          rim: [5.0, 3.6, 1.6], body: [3.6, 0.7, 0.12], deep: [0.16, 0.05, 0.04], accent: [4.6, 2.6, 0.4],  light: [1, 0.4, 0.12] },
  loi:    { name: 'Lôi · sấm',          rim: [3.8, 4.2, 5.0], body: [0.8, 1.8, 4.4],  deep: [0.07, 0.05, 0.32], accent: [3.4, 1.4, 4.2],  light: [0.6, 0.8, 1] },
  phong:  { name: 'Phong · gió bão',    rim: [3.8, 4.6, 4.6], body: [0.6, 2.6, 2.7],  deep: [0.02, 0.16, 0.22], accent: [3.6, 3.8, 4.4],  light: [0.6, 0.95, 1] },
  moc:    { name: 'Mộc · ngọc lá',      rim: [3.2, 4.6, 3.2], body: [0.5, 2.8, 1.1],  deep: [0.02, 0.18, 0.08], accent: [3.6, 3.0, 0.8],  light: [0.45, 1, 0.6] },
  thach:  { name: 'Thạch · hổ phách',   rim: [5.0, 4.2, 2.6], body: [3.6, 1.9, 0.4],  deep: [0.26, 0.12, 0.04], accent: [1.4, 2.8, 3.2],  light: [1, 0.7, 0.3] },
  huyet:  { name: 'Huyết · sắt máu',    rim: [4.8, 3.6, 3.2], body: [3.4, 0.24, 0.2], deep: [0.2, 0.0, 0.02],  accent: [4.2, 2.8, 1.2],  light: [1, 0.25, 0.2] },
  nguyet: { name: 'Nguyệt · đèn tím',   rim: [3.8, 3.6, 4.8], body: [2.0, 0.6, 3.8],  deep: [0.13, 0.02, 0.26], accent: [4.4, 1.6, 2.6],  light: [0.75, 0.45, 1] },
  thuy:   { name: 'Thủy · nước',        rim: [3.6, 4.4, 5.0], body: [0.4, 1.5, 3.6],  deep: [0.01, 0.08, 0.22], accent: [3.0, 4.2, 4.0],  light: [0.4, 0.7, 1] },
  bang:   { name: 'Băng',               rim: [4.4, 4.8, 5.0], body: [1.4, 2.8, 4.2],  deep: [0.06, 0.16, 0.3],  accent: [4.2, 4.2, 4.8],  light: [0.7, 0.9, 1] },
  quang:  { name: 'Quang · nhật',       rim: [5.0, 4.8, 3.6], body: [4.2, 3.0, 0.8],  deep: [0.3, 0.16, 0.02], accent: [4.6, 1.8, 0.6],  light: [1, 0.85, 0.5] },
  doc:    { name: 'Độc',                rim: [3.6, 4.8, 2.4], body: [1.2, 3.2, 0.4],  deep: [0.1, 0.02, 0.16], accent: [2.8, 1.0, 3.6],  light: [0.6, 1, 0.3] },
  am:     { name: 'Ám · bóng',          rim: [3.4, 3.0, 4.6], body: [1.1, 0.4, 2.2],  deep: [0.04, 0.0, 0.08], accent: [4.2, 0.8, 1.6],  light: [0.5, 0.3, 0.9] },
  hong:   { name: 'Hồng · bình minh',   rim: [5.0, 4.3, 3.8], body: [4.2, 1.7, 1.3], deep: [0.3, 0.06, 0.08], accent: [4.6, 3.4, 1.2],  light: [1, 0.66, 0.55] },
  thanh:  { name: 'Thánh · hồi máu',    rim: [4.0, 5.0, 4.0], body: [1.0, 3.4, 1.2],  deep: [0.04, 0.2, 0.06], accent: [4.6, 4.4, 2.2],  light: [0.6, 1, 0.6] },
}

// audit 78 (2026-10-11): a white-hot rim stretched along a fast missile read as a white light beam (Vân Dao RMB, Hương Mai Q).
// The rim keeps its element's hue: the brightest channel stays, the others sit at most 72 % of it, and the peak caps at 4.6.
for (const p of Object.values(PAL)) { const m = Math.max(...p.rim), k = Math.min(1, 4.6 / m); p.rim = p.rim.map((v) => Math.round((v === m ? m : Math.min(v, m * 0.72)) * k * 100) / 100) }

// ---- tiers (Riot: importance sets size, brightness, length). basic < skill < ult, always.
export const TIER = {
  1: { k: 1.0, life: 1.0, n: 1.0, light: 1.0 },   // đánh thường
  2: { k: 1.45, life: 1.2, n: 1.7, light: 1.8 },  // chiêu
  3: { k: 2.2, life: 1.45, n: 2.6, light: 3.2 },  // tuyệt chiêu
}

// ---- heat (A5b, 2026-10-11): an additive sprite's white-hot share shrinks as it covers more screen. A big sweep or an ult
// burst grows in SIZE and LENGTH (tier), never in whiteness, so it can't bloom into a white wall over the telegraphs.
// span = the sprite's on-ground size in m; ref = the size up to which it may burn full white. Floor 0.4 keeps its colour.
export const heat = (span, ref) => Math.max(0.35, Math.min(1, Math.pow(ref / Math.max(0.01, span), 1.5)))

// ---- silhouettes, white on clear, viewBox 0 0 100 100. Missile shapes point +x (right); slash shapes open toward −y (forward).
const svg = (d, extra = '') => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='white' ${extra} d='${d}'/></svg>`
const f1 = (v) => Math.round(v * 10) / 10
const poly = (pts) => 'M' + pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L') + ' Z'
// a star of uneven spikes: the impact's one silhouette (seeded so every client draws the same)
const starPts = (n, rIn, rOut, seed) => {
  let s = seed; const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  const pts = []
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2 + (i % 2 ? 0 : (rnd() - 0.5) * 0.25)
    const r = i % 2 ? rIn : rOut * (0.55 + rnd() * 0.45)
    pts.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r])
  }
  return pts
}
// a crescent sweep: outer radius 48 around the centre, thick in the middle, tapering to points; arc in degrees
const crescentPts = (arc, thick) => {
  const pts = [], N = 22, half = (arc * Math.PI) / 360
  for (let i = 0; i <= N; i++) { const t = i / N, a = -Math.PI / 2 - half + t * 2 * half; pts.push([50 + Math.cos(a) * 48, 50 + Math.sin(a) * 48]) }
  for (let i = N; i >= 0; i--) { const t = i / N, a = -Math.PI / 2 - half + t * 2 * half, w = thick * Math.pow(Math.sin(Math.PI * t), 0.8); pts.push([50 + Math.cos(a) * (48 - w), 50 + Math.sin(a) * (48 - w)]) }
  return pts
}
export const SHAPE = {
  comet: svg('M97 50 C97 31 83 23 66 24 C44 26 22 40 3 50 C22 60 44 74 66 76 C83 77 97 69 97 50 Z'),        // quả cầu năng lượng/than: đầu tròn, đuôi thon
  lance: svg('M99 50 L72 36 L74 46 L3 48 L3 52 L74 54 L72 64 Z'),                                              // mũi giáo/phi kiếm/tên: sắc, dài
  arrow: svg('M99 50 L78 41 L80 48 L8 49 L2 44 L6 50 L2 56 L8 51 L80 52 L78 59 Z'),                             // mũi tên có lông đuôi
  shard: svg('M99 50 L60 34 L8 46 L20 50 L8 54 L60 66 Z'),                                                      // mảnh đá/pha lê
  disc: svg('M50 4 A46 46 0 1 1 49.9 4 Z'),                                                                      // tròn đặc (lõi, chớp)
  ring: svg('M50 3 A47 47 0 1 1 49.9 3 Z M50 12 A38 38 0 1 0 50.1 12 Z', "fill-rule='evenodd'"),                // vòng sóng va chạm
  star: svg(poly(starPts(9, 9, 49, 7))),                                                                         // bông gai va chạm (mặc định)
  starWide: svg(poly(starPts(13, 12, 49, 31))),                                                                  // bông gai dày (tuyệt)
  gash: svg('M1 50 Q50 37 99 50 Q50 63 1 50 Z'),                                                                 // vết chém thẳng (đòn kiếm trúng)
  slash: svg(poly(crescentPts(150, 15))),                                                                         // vệt chém lưỡi liềm 150°
  sweep: svg(poly(crescentPts(220, 13))),
  halfsweep: svg(poly(crescentPts(180, 13))),                                                                     // quét nửa vòng 180° (cone AoE, doc 76)                                                                         // quét rộng 220°
  thrust: svg('M50 2 L58 40 L54 92 L50 98 L46 92 L42 40 Z'),                                                     // đâm thẳng
  flame: svg('M50 2 C62 22 82 38 78 64 C76 84 62 98 50 98 C36 98 22 86 22 66 C22 50 34 44 36 30 C42 40 46 46 50 2 Z'), // lưỡi lửa
  leaf: svg('M50 2 C78 22 82 62 50 98 C18 62 22 22 50 2 Z'),
  petal: svg('M50 4 C80 20 86 60 50 96 C14 60 20 20 50 4 Z M50 18 C56 40 56 60 50 84 C44 60 44 40 50 18 Z', "fill-rule='evenodd'"),
  bolt: svg('M60 2 L28 54 L48 54 L38 98 L74 40 L52 40 Z'),                                                      // tia sét
  rune: svg('M50 2 A48 48 0 1 1 49.9 2 Z M50 9 A41 41 0 1 0 50.1 9 Z M50 18 L58 46 L82 50 L58 54 L50 82 L42 54 L18 50 L42 46 Z', "fill-rule='evenodd'"), // ấn/vòng phù
}

// ---- motifs: the hero's own small thing, shed by a missile, thrown by an impact (built-in textures or a SHAPE key)
export const MOTIF = {
  ember: { tex: 'textures/ember', blend: 'add', streak: 0.03, col: 'accent', grav: 0.4 },
  cinder: { tex: 'textures/flame-wisp', blend: 'add', streak: 0, col: 'body', grav: -0.6 },
  chip: { tex: 'textures/chip', blend: 'alpha', streak: 0, col: 'deep', grav: 1 },
  blood: { tex: 'textures/droplet', blend: 'alpha', streak: 0.02, col: 'blood', grav: 1 },
  spark: { tex: 'textures/ember', blend: 'add', streak: 0.04, col: 'rim', grav: 0.5 },
  leaf: { tex: 'textures/leaf', blend: 'alpha', streak: 0, col: 'body', grav: 0.15 },
  petal: { tex: 'textures/petal', blend: 'add', streak: 0, col: 'accent', grav: 0.1 },
  mote: { tex: 'textures/mote', blend: 'add', streak: 0, col: 'accent', grav: 0 },
  shard: { tex: 'textures/shard', blend: 'add', streak: 0, col: 'accent', grav: 0.7 },
  feather: { tex: 'textures/leaf', blend: 'alpha', streak: 0, col: 'rim', grav: 0.1 },
}
export const MOTIF_COL = { blood: [0.5, 0.02, 0.03] }
export const colOf = (pal, key) => MOTIF_COL[key] ?? pal[key] ?? pal.body
