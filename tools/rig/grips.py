# Bakes each hero's grip: finger curl quaternions (a raw-track hand pose, scripts/lib/weapons.js gripChannel)
# and each weapon's seat in its hand (offset + quat in the hand bone's frame) from the hero GLBs' rigs.
# also bakes each hero's grip on the match body's rig (/cdn/neutral-default-avatar.glb?raw) under <hero>.avatar
# usage: python3 tools/rig/grips.py <dir with moc.glb kha.glb … huong.glb> [hero,hero]  (heroes named = only those re-baked, the rest kept)
# reads scripts/lib/data/weapons.yml (kind, hand, seat), writes scripts/lib/data/grips.yml
import json, struct, sys, math, yaml, numpy as np
D = sys.argv[1] if len(sys.argv) > 1 else '/tmp'
AVATAR = 'neutral-default-avatar'
FILES = { 'moc_lam': 'moc', 'kha_tan': 'kha', 'mi_dang': 'mi', 'hoa_tuy': 'hoa', 'nham_vu': 'nham', 'van_dao': 'van', 'hao_nhat': 'hao', 'huong_mai': 'huong' }
W = yaml.safe_load(open('scripts/lib/data/weapons.yml'))
CURL = W['curl']  # degrees per segment: fingers [1,2,3], thumb [1,2,3]

def load(f):
  b = open(f, 'rb').read(); n = struct.unpack('<I', b[12:16])[0]; return json.loads(b[20:20 + n]), b[20 + n + 8:]
def acc(j, b, i):
  a = j['accessors'][i]; v = j['bufferViews'][a['bufferView']]; o = v.get('byteOffset', 0) + a.get('byteOffset', 0)
  k = {'SCALAR': 1, 'VEC3': 3, 'VEC4': 4}[a['type']]; return np.frombuffer(b, np.float32, a['count'] * k, o).reshape(a['count'], k)
def qm(q):
  x, y, z, w = q
  return np.array([[1-2*(y*y+z*z), 2*(x*y-z*w), 2*(x*z+y*w)], [2*(x*y+z*w), 1-2*(x*x+z*z), 2*(y*z-x*w)], [2*(x*z-y*w), 2*(y*z+x*w), 1-2*(x*x+y*y)]])
def qmul(a, b):
  ax, ay, az, aw = a; bx, by, bz, bw = b
  return [aw*bx+ax*bw+ay*bz-az*by, aw*by-ax*bz+ay*bw+az*bx, aw*bz+ax*by-ay*bx+az*bw, aw*bw-ax*bx-ay*by-az*bz]
def qaxis(ax, deg):
  s = math.sin(math.radians(deg) / 2); return [ax[0]*s, ax[1]*s, ax[2]*s, math.cos(math.radians(deg) / 2)]
def mq(m):
  t = m.trace()
  if t > 0: s = math.sqrt(t + 1) * 2; return [(m[2,1]-m[1,2])/s, (m[0,2]-m[2,0])/s, (m[1,0]-m[0,1])/s, s/4]
  i = int(np.argmax([m[0,0], m[1,1], m[2,2]])); j, k = (i+1) % 3, (i+2) % 3
  s = math.sqrt(1 + m[i,i] - m[j,j] - m[k,k]) * 2; q = [0, 0, 0, 0]
  q[i] = s/4; q[j] = (m[j,i]+m[i,j])/s; q[k] = (m[k,i]+m[i,k])/s; q[3] = (m[k,j]-m[j,k])/s; return q
nz = lambda v: v / np.linalg.norm(v)
r4 = lambda q: [round(float(c), 4) for c in q]

def bake(path, hero, rig=None):
  j, b = load(path); nodes = j['nodes']
  idle = next(a for a in j['animations'] if a['name'] == 'Idle'); q0 = {}
  for c in idle['channels']:
    if c['target']['path'] == 'rotation': q0[nodes[c['target']['node']].get('name', '')] = list(acc(j, b, idle['samplers'][c['sampler']]['output'])[0])
  rest = {nd.get('name', ''): nd for nd in nodes}
  rot = lambda nm: q0.get(nm) or rest[nm].get('rotation') or [0, 0, 0, 1]
  tr = lambda nm: np.array(rest[nm].get('translation', [0, 0, 0]))
  hands = {}
  for side, S in (('right', 'Right'), ('left', 'Left')):
    K = {F: tr(f'{S}Hand{F}1') for F in ('Index', 'Middle', 'Ring')}; T = tr(f'{S}HandThumb1')
    cen = sum(K.values()) / 3
    d = nz(sum(qm(rot(f'{S}Hand{F}1')) @ np.array([0, 1, 0]) for F in K))
    h = nz(K['Index'] - K['Ring'])                      # across the knuckles, toward the thumb side
    n = nz(np.cross(h, d)); n = n if np.dot(n, T - cen) > 0 else -n   # palm normal: out of the palm
    e = nz(d - np.dot(d, n) * n - np.dot(d, h) * h)     # toward the fingertips, in the palm plane
    h = nz(np.cross(n, e)) * (1 if np.dot(np.cross(n, e), h) > 0 else -1)
    a = nz(np.cross(e, n))                              # the curl axis: fingertips swing into the palm
    pose = {}
    for F in [F for F in ('Index', 'Middle', 'Ring', 'Pinky', 'Thumb') if f'{S}Hand{F}1' in rest]:
      R = np.eye(3); degs = CURL['thumb'] if F == 'Thumb' else CURL['fingers']
      for i in (1, 2, 3):
        nm = f'{S}Hand{F}{i}'; q = rot(nm); R = R @ qm(q)
        al = R.T @ a; pose[nm] = r4(qmul(q, qaxis(al, degs[i - 1])))
    hands[side] = dict(pose=pose, cen=cen, n=n, e=e, h=h)
  pieces = []
  for w in W['heroes'][hero]:
    H = hands[w['hand']]; s = w.get('seat', {}); s = {**s, **(s.get(rig) or {})} if rig else s
    t = math.radians(s.get('tilt', 0)); y = nz(s.get('dir', 1) * H['h'] * math.cos(t) - H['e'] * math.sin(t))
    ed = {'knuckles': H['e'], 'wrist': -H['e'], 'back': -H['n'], 'palm': H['n']}[s.get('edge', 'knuckles')]
    z = -nz(ed - np.dot(ed, y) * y); x = np.cross(y, z)
    c = H['cen'] + H['n'] * s.get('palm', 2.4) - H['e'] * s.get('down', 1.0) + H['h'] * s.get('slide', 0)
    pieces.append(dict(offset=[round(float(v) / 100, 4) for v in c], quat=r4(mq(np.column_stack([x, y, z])))))
  holding = sorted({w['hand'] for w in W['heroes'][hero]})
  return dict(fingers={k: v for side in holding for k, v in hands[side]['pose'].items()}, pieces=pieces)
ONLY = sys.argv[2].split(',') if len(sys.argv) > 2 else None
out = yaml.safe_load(open('scripts/lib/data/grips.yml')) if ONLY else {}
for hero, f in FILES.items():
  if ONLY and hero not in ONLY: continue
  out[hero] = bake(f'{D}/{f}.glb', hero)
  try: out[hero]['avatar'] = bake(f'{D}/{AVATAR}.glb', hero, 'avatar')  # legacy: the neutral avatar rig (the match body now wears the hero GLB, rig null)
  except KeyError as e: print('avatar rig has no', e, '- skipped for', hero)
open('scripts/lib/data/grips.yml', 'w').write('# GENERATED by tools/rig/grips.py from the hero GLBs + weapons.yml seats: do not edit by hand.\n' + yaml.safe_dump(out, default_flow_style=None, width=200, sort_keys=False))
print('ok', {h: len(o['fingers']) for h, o in out.items()})
