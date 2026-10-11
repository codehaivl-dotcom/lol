# One-shot greybox shrink of Mạch Giữa (doc14 §M, 2026-10-08). Run ONCE on the pre-shrink scenes.
# u = along the diagonal toward the base (blue +), v = across. Structures are placed by tower reach, not scaled.
import yaml, glob, math, sys
R2 = math.sqrt(2)
UK = [(0, 0), (44.5, 25), (80.2, 58), (130.7, 77), (157.4, 93)]
VS = 0.545
def mu(u):
    s, a = (1 if u >= 0 else -1), abs(u)
    for (a0, b0), (a1, b1) in zip(UK, UK[1:]):
        if a <= a1: return s * (b0 + (a - a0) * (b1 - b0) / (a1 - a0))
    return s * (93 + (a - 157.4) * 0.6)
def mp(x, z):
    u, v = (-x + z) / R2, (x + z) / R2
    u2, v2 = mu(u), v * VS
    return round((v2 - u2) / R2, 2), round((u2 + v2) / R2, 2)
ax = lambda u: (round(-u / R2, 1), round(u / R2, 1))
T1, T2, NX, FT, BC = ax(25), ax(58), ax(77), ax(93), ax(87.7)
FIXED = {
  'tower-blue-t1': T1, 'tower-blue-t2': T2, 'nexus-blue': NX, 'fountain-blue': FT,
  'tower-red-t1': (-T1[0], -T1[1]), 'tower-red-t2': (-T2[0], -T2[1]), 'nexus-red': (-NX[0], -NX[1]), 'fountain-red': (-FT[0], -FT[1]),
  'shop-blue': (round(FT[0] + 9.3, 1), round(FT[1] + 1.5, 1)), 'shop-red': (round(-FT[0] - 9.3, 1), round(-FT[1] - 1.5, 1)),
}
DEC = 0.6
if __name__ == '__main__':
    if '--print' in sys.argv:
        print(dict(T1=T1, T2=T2, NX=NX, FT=FT, BC=BC, shop=FIXED['shop-blue']))
        old = [[-79.8,79.8],[-72.3,72.3],[-56.7,56.7],[-42.1,32.8],[-30.2,20.9],[30.2,-20.9],[42.1,-32.8],[56.7,-56.7],[72.3,-72.3],[79.8,-79.8]]
        print('lane', [list(mp(*p)) for p in old])
        for p in [(-46,0),(0,46),(46,0),(0,-46)]: print('alc', p, mp(*p))
        for n,p in dict(rtb=(-17.9,3.2), rbb=(-3.2,17.9), ftb=(-58.5,34.9), fbb=(-36.5,48.5), atb=(-47,1), abb=(-1,47)).items(): print(n, mp(*p))
        sys.exit()
    for f in sorted(glob.glob('places/main/cells/*.scene')):
        d = yaml.safe_load(open(f)) or {}
        ch = 0
        for k, v in d.items():
            tags = v.get('tags') or []
            fp = v.get('feetPosition') or {}
            if k in FIXED:
                fp['x'], fp['z'] = FIXED[k]; ch += 1
                if k.startswith('tower'): v['scale'] = {'x': 1, 'y': 0.8, 'z': 1}
                if k.startswith('nexus'): v['scale'] = {'x': 1, 'y': 0.85, 'z': 1}
                if k.startswith('shop'):
                    sg = 1 if k.endswith('blue') else -1
                    v['rotation'] = {'lookAt': {'x': round(fp['x'] - 61 * sg, 2), 'y': 0, 'z': round(fp['z'] + 45.6 * sg, 2)}}
            elif k == 'bridge':
                v['scale'] = {'x': 0.38, 'y': 0.7, 'z': 0.38}; v['rotation'] = {'yaw': -61.5, 'pitch': 0, 'roll': 0}
                for c in v.get('children', []):
                    if str(c.get('id', '')).startswith('lantern'): c['scale'] = {'x': 1, 'y': round(0.38 / 0.7, 3), 'z': 1}
                ch += 1
            elif 'dressing' in tags or k == 'thuong-luong-preview':
                if 'scatter' in v:
                    b = v['scatter']['bounds']
                    b['points'] = [list(mp(x, z)) for x, z in b['points']]
                    v['scatter']['count'] = max(4, round(v['scatter'].get('count', 10) * DEC))
                    var = v['scatter'].setdefault('variation', {})
                    if 'scale' in var: var['scale'] = [round(s * DEC, 3) for s in var['scale']]
                else:
                    fp['x'], fp['z'] = mp(fp.get('x', 0), fp.get('z', 0))
                    if k != 'thuong-luong-preview':
                        s = v.get('scale', 1)
                        v['scale'] = round(s * DEC, 3) if isinstance(s, (int, float)) else {a: round(s[a] * DEC, 3) for a in 'xyz'}
                ch += 1
        if ch:
            open(f, 'w').write(yaml.safe_dump(d, sort_keys=True, allow_unicode=True, width=100000))
            print(f, ch)
