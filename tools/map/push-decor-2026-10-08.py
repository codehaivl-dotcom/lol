# Pushes dressing that the shrink left on the walkable corridor out to the wall foot (doc14 §M).
import yaml, glob, math, re
M = yaml.safe_load(open('scripts/lib/data/map.yml'))
L = M['lane']; CH = M['corridorHalf']; OUT = CH + 2.5
def near(x, z):
    best = (1e9, None)
    for (ax, az), (bx, bz) in zip(L, L[1:]):
        dx, dz = bx - ax, bz - az; t = max(0, min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz)))
        px, pz = ax + t * dx, az + t * dz; dd = math.hypot(x - px, z - pz)
        if dd < best[0]: best = (dd, (px, pz))
    return best
def inside(x, z):
    if any(math.hypot(x - a['at'][0], z - a['at'][1]) < a['r'] for a in M['alcoves']): return 'alc'
    if any(math.hypot(x - c[0], z - c[1]) < M['baseRadius'] + 1 for c in M['bases'].values()): return 'base'
    return None
moved = []
for f in sorted(glob.glob('places/main/cells/*.scene')):
    lines = open(f).read().split('\n'); cur = None; ch = False
    for i, ln in enumerate(lines):
        if re.match(r'^\S.*:$', ln): cur = {'k': ln[:-1], 'tags': '', 'fp': None}; continue
        if cur is None: continue
        if ln.startswith('  tags:'): cur['tags'] = ln
        if ln.startswith('  feetPosition:'): cur['fp'] = i
        if cur['fp'] is not None and 'dressing' in cur['tags'] and not cur.get('done'):
            fp = yaml.safe_load(lines[cur['fp']][len('  feetPosition:'):])
            x, z = fp.get('x', 0), fp.get('z', 0)
            if x == 0 and z == 0: cur['done'] = True; continue
            dd, p = near(x, z)
            if dd < OUT or inside(x, z):
                if inside(x, z) == 'alc':  # keep alcove dressing, but out of its brush/middle
                    a = min(M['alcoves'], key=lambda a: math.hypot(x - a['at'][0], z - a['at'][1])); cx, cz, R = a['at'][0], a['at'][1], a['r'] + 1.5
                elif inside(x, z) == 'base':
                    c = min(M['bases'].values(), key=lambda c: math.hypot(x - c[0], z - c[1])); cx, cz, R = c[0], c[1], M['baseRadius'] + 2.5
                else: cx, cz, R = p[0], p[1], OUT
                ux, uz = x - cx, z - cz; n = math.hypot(ux, uz) or 1
                nx, nz = round(cx + ux / n * R, 1), round(cz + uz / n * R, 1)
                if near(nx, nz)[0] < OUT - 0.1 and not inside(nx, nz): pass
                fp['x'], fp['z'] = nx, nz
                lines[cur['fp']] = '  feetPosition: ' + yaml.dump(fp, default_flow_style=True, width=1e9).strip()
                moved.append((cur['k'][-6:], (x, z), (nx, nz))); ch = True
            cur['done'] = True
    if ch: open(f, 'w').write('\n'.join(lines))
for m in moved: print(m)
