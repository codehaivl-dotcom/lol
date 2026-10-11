// Windswept bonsai pine (refs map1-1): a grey-brown twisting trunk leaning downwind, short limbs, and flat
// layered foliage pads, dark underneath, lit on top. Shared by banyan.js (lane-side trees) and karst.js (crowns).
import { tube, loft, ringXZ } from "./mesh.js";
export const BARK = "cdn/texture-gnarled-banyan-tree-bark.png";
export const PINE = { under: "oklch(0.30 0.07 150)", pad: "oklch(0.45 0.09 145)", top: "oklch(0.56 0.10 138)", bark: "oklch(0.80 0.02 55)" };
const lerp3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
// one foliage pad: a flat lumpy cushion centred at c, radius rh, thickness th
export function pad(ctx, c, rh, th, rnd, lod, T = (p) => p) {
  const n = lod <= 2 ? 9 : lod === 3 ? 7 : 5;
  const j = Array.from({ length: n }, () => 0.78 + rnd() * 0.42), ph = rnd() * 6;
  const R = (k, y) => ringXZ(n, rh * k, rh * k * 0.85, c[1] + y, { cx: c[0], cz: c[2], phase: ph, r: (i) => j[i] });
  const r0 = R(0.62, -th * 0.28), r1 = R(1, 0), r2 = R(0.7, th * 0.58), apex = [[c[0], c[1] + th, c[2]]];
  ctx.albedo(null); ctx.flat(); ctx.roughness(0.88); ctx.metalness(0);
  ctx.color(PINE.under); loft(ctx, [r0, r1], T, { capBottom: true });
  ctx.color(PINE.pad); loft(ctx, [r1, r2], T);
  ctx.color(PINE.top); loft(ctx, [r2, apex], T);
}
// o: { h, spread, girth, lean (0..1 of h), pads, wind (rad), rnd }
export function pine(ctx, o = {}, T = (p) => p) {
  const lod = ctx.lod, rnd = o.rnd ?? (() => ctx.random());
  const h = o.h ?? 8, sp = o.spread ?? h * 0.5, wind = o.wind ?? rnd() * 6.283;
  const wx = Math.cos(wind), wz = Math.sin(wind), sx = -wz, sz = wx;
  const ts = lod <= 2 ? 7 : lod === 3 ? 4 : 3, lean = (o.lean ?? 0.3) * h, wob = (rnd() - 0.5) * 0.35 * h;
  const at = (t) => { const b = lean * t * t, s = wob * Math.sin(t * Math.PI * 1.3); return [wx * b + sx * s, -0.3 + t * (h * 0.82 + 0.3), wz * b + sz * s]; };
  const g = o.girth ?? h * 0.05, path = [], rr = [];
  for (let k = 0; k <= ts; k++) { const t = k / ts; path.push(at(t)); rr.push(g * (1.25 - 0.85 * t) * (k === 0 ? 1.5 : 1)); }
  ctx.smooth(); ctx.albedo(BARK); ctx.color(PINE.bark); ctx.roughness(0.95); ctx.metalness(0);
  tube(ctx, path, rr, lod <= 2 ? 7 : 5, T);
  const np = lod >= 5 ? 1 : lod === 4 ? 2 : Math.min(o.pads ?? 5, lod === 3 ? 3 : 7);
  const top = at(1), pads = [[top[0], top[1] + 0.1, top[2], sp * 0.42]];
  for (let i = 1; i < np; i++) {
    const t = 0.4 + (i / np) * 0.52 + (rnd() - 0.5) * 0.08, b = at(t);
    const a = wind + (i % 2 ? 1 : -1) * (0.4 + rnd() * 1.2), L = sp * (0.55 + rnd() * 0.45) * (1 - t * 0.35);
    const e = [b[0] + Math.cos(a) * L, b[1] + (rnd() - 0.35) * h * 0.08, b[2] + Math.sin(a) * L], m = lerp3(b, e, 0.5);
    m[1] += h * 0.06;
    if (lod <= 4) { ctx.smooth(); ctx.albedo(BARK); ctx.color(PINE.bark); ctx.roughness(0.95); tube(ctx, [b, m, e], [g * 0.55 * (1 - t * 0.5), g * 0.38, g * 0.22], lod <= 2 ? 5 : 4, T); }
    pads.push([e[0], e[1] + 0.15, e[2], sp * (0.3 + rnd() * 0.12)]);
  }
  for (const [x, y, z, r] of pads) {
    pad(ctx, [x, y, z], r, r * 0.38, rnd, lod, T);
    if (lod <= 2 && r > 0.5) pad(ctx, [x - wx * r * 0.15, y + r * 0.34, z - wz * r * 0.15], r * 0.62, r * 0.32, rnd, lod, T);
  }
}
