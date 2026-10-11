#!/usr/bin/env python3
"""Cổ Linh · bundle asset theo nhu cầu (doc53 §10, USER LOCK 2026-10-09).

  python3 tools/assets/bundles.py          sinh scripts/assets/bundles.yml từ data runtime + đối chiếu assets/manifest.yml
  python3 tools/assets/bundles.py check    như trên nhưng không ghi; exit 1 nếu có asset của bundle chưa khai báo

Nguồn: bảng runtime đang dùng (heroes.js BODY/GESTURE, skill-clips, hero-sfx, art) và scene/config của từng place.
Kho asset vẫn là assets/registry.yml + manifest.yml; file này chỉ là bảng sinh cho runtime, không sửa tay.
"""
import os, re, sys, yaml, datetime
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
D = lambda f: yaml.safe_load(open(os.path.join(ROOT, 'scripts/lib/data', f), encoding='utf-8'))
CDN = re.compile(r"/?cdn/[A-Za-z0-9._\-/]+\.(?:glb|gltf|mp3|wav|ogg|png|jpe?g|webp)")
norm = lambda a: '/' + a.lstrip('/')

def manifest():
  m = yaml.safe_load(open(os.path.join(ROOT, 'assets/manifest.yml'), encoding='utf-8'))
  return {r['address'] for r in m.get('assets', [])}

def heroes_js():
  src = open(os.path.join(ROOT, 'scripts/lib/heroes.js'), encoding='utf-8').read()
  body = {k: norm(v) for k, v in re.findall(r"(\w+): \{ model: '([^']+)'", src)}
  height = {k: float(v) for k, v in re.findall(r"(\w+): \{ model: '[^']+', h: ([0-9.]+)", src)}
  gest = {k: norm(v) for k, v in re.findall(r"(\w+): '(cdn/[^']+)'", src)}
  return body, gest, height

def build():
  ids = D('heroes.yml')['heroes'].keys()
  clips, sfx, art = D('skill-clips.yml'), D('hero-sfx.yml'), D('art.yml')
  base = sfx.get('base', '')
  body, gest, height = heroes_js()
  heroes = {}
  for h in ids:
    b = {
      'height': height.get(h, 1.8),
      'model': [body[h]] if h in body else [],
      'clips': sorted({norm(v[0]) for v in (clips.get(h) or {}).values() if isinstance(v, list) and v} | ({gest[h]} if h in gest else set())),
      'sfx': sorted({norm(base + v) for v in ((sfx.get('heroes') or {}).get(h) or {}).values() if isinstance(v, str)}),
      'portrait': norm((art.get('portraits') or {}).get(h)) if isinstance((art.get('portraits') or {}).get(h), str) else None,
      'icons': {k: norm(v) for k, v in ((art.get('icons') or {}).get(h) or {}).items() if isinstance(v, str)},
      'images': sorted({norm(x) for x in [(art.get('portraits') or {}).get(h), (art.get('icons') or {}).get(h)] if isinstance(x, str)} |
                       {norm(x) for x in CDN.findall(str((art.get('icons') or {}).get(h)))}),
    }
    heroes[h] = b
  places = {}
  for p in sorted(os.listdir(os.path.join(ROOT, 'places'))):
    found = set()
    for d, _, fs in os.walk(os.path.join(ROOT, 'places', p)):
      for f in fs:
        if f.endswith(('.scene', '.yaml', '.js')):
          found |= {norm(a) for a in CDN.findall(open(os.path.join(d, f), encoding='utf-8').read())}
    places[p] = sorted(found)
  maps = {k: [norm(v)] for k, v in (art.get('maps') or {}).items()}
  units = {}
  for m, kinds in (D('units.yml') or {}).items():
    sfx_base = '/cdn/moodboard-painterly-fantasy/sfx-'
    assets = set()
    for k in kinds.values():
      for f in ('model', 'red', 'attack', 'die'):
        v = k.get(f)
        if isinstance(v, str) and 'cdn/' in v: assets.add(norm(v))
      for f in ('hit', 'death', 'step'):
        if k.get(f): assets.add(sfx_base + k[f] + '.mp3')
    units[m] = {'kinds': kinds, 'assets': sorted(assets)}
  return {'heroes': heroes, 'places': places, 'maps': maps, 'units': units}

LOAD = ('clips', 'sfx', 'images')
def split(b):
  lite = {k: v for k, v in b.items() if k not in ('heroes', 'places')}
  lite['heroes'] = {h: {k: v for k, v in x.items() if k not in LOAD} for h, x in b['heroes'].items()}
  full = {'heroes': {h: {k: x.get(k, []) for k in LOAD} for h, x in b['heroes'].items()}, 'places': b.get('places', {})}
  return lite, full

def undeclared(b, known):
  out = []
  def walk(n, path):
    if isinstance(n, dict): [walk(v, path + [k]) for k, v in n.items()]
    elif isinstance(n, list): [walk(v, path) for v in n]
    elif isinstance(n, str) and n.startswith('/cdn/') and n not in known and not n.startswith('/cdn/texture-'): out.append(('.'.join(path), n))
  walk(b, [])
  return out

if __name__ == '__main__':
  b = build()
  miss = undeclared(b, manifest())
  for p, a in miss: print('chưa khai báo:', p, a)
  # asset bắt buộc: mỗi tướng chơi được phải có thân (model) và ảnh thẻ; thiếu là lỗi build, không để người chơi gặp
  hole = [(h, k) for h, x in b['heroes'].items() for k in ('model', 'portrait') if not x.get(k)]
  for h, k in hole: print('thiếu asset bắt buộc:', h, k)
  if len(sys.argv) > 1 and sys.argv[1] == 'check': sys.exit(1 if miss or hole else 0)
  head = '# SINH TỰ ĐỘNG bởi tools/assets/bundles.py (doc53 §10). Đừng sửa tay: sửa data runtime hoặc registry rồi chạy lại.\n'
  b = {'generated': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC'), **b}
  # Lô E (2026-10-11): tách khỏi tải vào trận. bundles.yml giữ cái màn/trận đọc lúc đứng (thân, cao, ảnh thẻ, icon, lính, map);
  # bundles-load.yml giữ danh sách nạp trước (clips/sfx/images/places), resolver.js nạp nó bằng import() khi cần.
  lite, full = split(b)
  open(os.path.join(ROOT, 'scripts/assets/bundles.yml'), 'w', encoding='utf-8').write(head + yaml.safe_dump(lite, allow_unicode=True, sort_keys=False, width=200))
  open(os.path.join(ROOT, 'scripts/assets/bundles-load.yml'), 'w', encoding='utf-8').write(head + yaml.safe_dump(full, allow_unicode=True, sort_keys=False, width=200))
  n = {h: sum(len(v) for v in x.values() if isinstance(v, list)) for h, x in b['heroes'].items()}
  print('bundles:', n, '| places:', {p: len(v) for p, v in b['places'].items()}, '| units:', {m: len(u['assets']) for m, u in b['units'].items()}, '| chưa khai báo:', len(miss))
