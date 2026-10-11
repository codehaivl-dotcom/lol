// Workshop-only mock of scripted geometry calls (quad=2, tri=1); not an engine mesh/boot measurement.
// instances() is intentionally a no-op here, so instanced geometry is omitted. Run after geo_rows.py in the box.
import fs from 'fs'
const rows = JSON.parse(fs.readFileSync('/tmp/bench/rows.json','utf8'))
const W = '/workspace/world/'
const out = []
const seen = new Map()
for (const r of rows) {
  const key = r.script + JSON.stringify(r.params) + r.seed
  if (seen.has(key)) { seen.get(key).n++; continue }
  let rec = { script: r.script, id: r.id, cell: r.cell, n: 1, tris: 0, inst: 0, err: null }
  seen.set(key, rec); out.push(rec)
  try {
    const m = await import(W + r.script)
    if (!m.geometry) { rec.err = 'no geometry'; continue }
    let s = (r.seed ?? 1) * 9301 + 49297
    const ctx = new Proxy({
      params: r.params, seed: r.seed, lod: 0,
      random: () => { s = (s * 9301 + 49297) % 233280; return s / 233280 },
      noise: () => 0, groundY: () => 0,
      quad: () => { rec.tris += 2 }, tri: () => { rec.tris += 1 },
      instances: () => {}, instance: () => { rec.inst++ },
    }, { get: (t, k) => k in t ? t[k] : (() => {}) })
    m.geometry(ctx)
  } catch (e) { rec.err = String(e.message).slice(0, 90) }
}
out.sort((a, b) => b.tris - a.tris)
for (const o of out) console.log(String(o.tris).padStart(8), 'x' + o.n, o.cell, o.id, o.script, o.inst ? 'inst=' + o.inst : '', o.err ?? '')
console.log('errors', out.filter(o => o.err).map(o => o.script + ':' + o.err).slice(0, 8))
