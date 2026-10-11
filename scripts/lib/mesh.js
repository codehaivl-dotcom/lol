// Shared mesh helpers for the dressing generators (scripts/gen/*.js): transforms, auto-wound faces,
// ring lofts, chamfered blocks, lumpy rocks and tubes. Every face orients itself away from a centre point.
export const D = Math.PI / 180;
export const id = (p) => p;
// local point → parent point: scale, roll (Z), pitch (X, + tips −Z up), yaw (Y), then translate. Degrees.
export function xf(o = {}) {
  const { x = 0, y = 0, z = 0, yaw = 0, pitch = 0, roll = 0, s = 1 } = o;
  const cy = Math.cos(yaw * D), sy = Math.sin(yaw * D), cp = Math.cos(pitch * D), sp = Math.sin(pitch * D), cr = Math.cos(roll * D), sr = Math.sin(roll * D);
  return (p) => {
    const px = p[0] * s, py = p[1] * s, pz = p[2] * s;
    const ax = px * cr - py * sr, ay = px * sr + py * cr, az = pz;
    const by = ay * cp - az * sp, bz = ay * sp + az * cp;
    return [ax * cy + bz * sy + x, by + y, -ax * sy + bz * cy + z];
  };
}
export const chain = (...fs) => (p) => fs.reduceRight((q, f) => f(q), p);
export const ctr = (pts) => { let x = 0, y = 0, z = 0; for (const p of pts) { x += p[0]; y += p[1]; z += p[2]; } const n = pts.length; return [x / n, y / n, z / n]; };
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
// a tri or quad, wound so its normal points away from c
export function face(ctx, pts, c) {
  const [a, b, d] = pts;
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
  const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const m = ctr(pts);
  const q = c && nx * (m[0] - c[0]) + ny * (m[1] - c[1]) + nz * (m[2] - c[2]) < 0 ? pts.slice().reverse() : pts;
  if (q.length === 3) ctx.tri(...q[0], ...q[1], ...q[2]);
  else ctx.quad(...q[0], ...q[1], ...q[2], ...q[3]);
}
export function ringXZ(n, rx, rz, y, o = {}) {
  const { phase = 0, cx = 0, cz = 0, r = null, dy = null } = o, out = [];
  for (let i = 0; i < n; i++) { const a = phase + (i / n) * Math.PI * 2, k = r ? r(i, a) : 1; out.push([cx + Math.cos(a) * rx * k, y + (dy ? dy(i, a) : 0), cz + Math.sin(a) * rz * k]); }
  return out;
}
export function ringXY(n, rx, ry, z, o = {}) {
  const { phase = 0, cx = 0, cy = 0, r = null, dz = null } = o, out = [];
  for (let i = 0; i < n; i++) { const a = phase + (i / n) * Math.PI * 2, k = r ? r(i, a) : 1; out.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k, z + (dz ? dz(i, a) : 0)]); }
  return out;
}
function cap(ctx, ring, c, away) { const n = ring.length; for (let j = 0; j < n; j++) face(ctx, [c, ring[j], ring[(j + 1) % n]], away); }
// rings of equal count (or a single apex point) skinned in order
export function loft(ctx, rings, T = id, o = {}) {
  const R = rings.map((r) => r.map(T)), C = R.map(ctr);
  for (let k = 0; k < R.length - 1; k++) {
    const a = R[k], b = R[k + 1], c = mid(C[k], C[k + 1]);
    if (b.length === 1) { for (let j = 0; j < a.length; j++) face(ctx, [a[j], a[(j + 1) % a.length], b[0]], c); }
    else if (a.length === 1) { for (let j = 0; j < b.length; j++) face(ctx, [a[0], b[(j + 1) % b.length], b[j]], c); }
    else for (let j = 0; j < a.length; j++) { const j1 = (j + 1) % a.length; face(ctx, [a[j], a[j1], b[j1], b[j]], c); }
  }
  if (o.capBottom && R[0].length > 2) cap(ctx, R[0], C[0], C[1]);
  if (o.capTop && R[R.length - 1].length > 2) cap(ctx, R[R.length - 1], C[C.length - 1], C[C.length - 2]);
}
export function octPts(hw, hd, c, y) {
  if (c < 0.003) return [[hw, y, -hd], [hw, y, hd], [-hw, y, hd], [-hw, y, -hd]];
  return [[hw, y, -hd + c], [hw, y, hd - c], [hw - c, y, hd], [-hw + c, y, hd], [-hw, y, hd - c], [-hw, y, -hd + c], [-hw + c, y, -hd], [hw - c, y, -hd]];
}
// a block w×h×d from y 0..h, vertical edges cut by c, top and bottom edges bevelled
export function chamferBox(ctx, w, h, d, c, T = id) {
  if (c < 0.003) return loft(ctx, [octPts(w / 2, d / 2, 0, 0), octPts(w / 2, d / 2, 0, h)], T, { capBottom: true, capTop: true });
  const e = Math.min(c * 0.7, h / 3);
  loft(ctx, [octPts(w / 2 - e, d / 2 - e, c * 0.6, 0), octPts(w / 2, d / 2, c, e), octPts(w / 2, d / 2, c, h - e), octPts(w / 2 - e, d / 2 - e, c * 0.6, h)], T, { capBottom: true, capTop: true });
}
export const boxCollider = (ctx, w, h, d, y0 = 0, T = id) => chamferBox(ctx, w, h, d, 0, (p) => T([p[0], p[1] + y0, p[2]]));
// a faceted rock: radius r, height h, n sides
export function lump(ctx, r, h, n, rnd, T = id) {
  const j = Array.from({ length: n }, () => 0.72 + rnd() * 0.5);
  loft(ctx, [
    ringXZ(n, r * 0.8, r * 0.8, -h * 0.3, { r: (i) => j[i] }),
    ringXZ(n, r, r, h * 0.2, { r: (i) => j[(i + 1) % n], phase: 0.3 }),
    ringXZ(n, r * 0.78, r * 0.78, h * 0.68, { r: (i) => j[(i + 2) % n], phase: 0.1 }),
    ringXZ(n, r * 0.34, r * 0.34, h, { r: (i) => j[i], phase: 0.5 }),
  ], T, { capTop: true });
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
// a swept tube along path with per-point radii (a last radius 0 closes to a point)
export function tube(ctx, path, radii, n, T = id, o = {}) {
  const rings = [];
  for (let i = 0; i < path.length; i++) {
    const p = path[i], r = radii[i];
    if (r <= 0) { rings.push([p]); continue; }
    const t = norm(i === 0 ? sub(path[1], path[0]) : i === path.length - 1 ? sub(p, path[i - 1]) : sub(path[i + 1], path[i - 1]));
    const u = norm(cross(t, Math.abs(t[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0])), v = cross(u, t), ring = [];
    for (let j = 0; j < n; j++) { const a = (j / n) * Math.PI * 2 + (o.phase ?? 0), c = Math.cos(a) * r, s = Math.sin(a) * r * (o.flat ?? 1); ring.push([p[0] + u[0] * c + v[0] * s, p[1] + u[1] * c + v[1] * s, p[2] + u[2] * c + v[2] * s]); }
    rings.push(ring);
  }
  loft(ctx, rings, T, { capBottom: o.cap });
}
// relief helpers in the local XY plane, facing +Z (place them with T)
export function annulus(ctx, r0, r1, z, n, T = id) {
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = ((i + 1) / n) * Math.PI * 2, P = (r, a) => T([Math.cos(a) * r, Math.sin(a) * r, z]);
    face(ctx, r0 < 0.001 ? [P(0, 0), P(r1, a0), P(r1, a1)] : [P(r0, a0), P(r1, a0), P(r1, a1), P(r0, a1)], T([0, 0, z - 1]));
  }
}
export function star(ctx, ro, ri, z, k, T = id) {
  const pts = []; for (let i = 0; i < 2 * k; i++) { const r = i % 2 ? ri : ro, a = (i / (2 * k)) * Math.PI * 2 + Math.PI / 2; pts.push(T([Math.cos(a) * r, Math.sin(a) * r, z])); }
  const c = T([0, 0, z]), back = T([0, 0, z - 1]);
  for (let i = 0; i < pts.length; i++) face(ctx, [c, pts[i], pts[(i + 1) % pts.length]], back);
}
// a stylised Lạc bird in flight, profile facing +X, ~1 m long, in XY at z
const BIRD = [[0.55, 0.02], [0.3, 0.07], [0.18, 0.1], [0.06, 0.3], [0.1, 0.09], [-0.05, 0.12], [-0.2, 0.32], [-0.18, 0.08], [-0.5, 0.16], [-0.42, -0.02], [-0.1, -0.06], [0.22, -0.03]];
export function bird(ctx, size, z, T = id) {
  const c = T([0, 0.04 * size, z]), back = T([0, 0, z - 1]), P = BIRD.map(([x, y]) => T([x * size, y * size, z]));
  for (let i = 0; i < P.length; i++) face(ctx, [c, P[i], P[(i + 1) % P.length]], back);
}
