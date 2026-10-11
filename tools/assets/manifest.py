#!/usr/bin/env python3
"""Cổ Linh Thần Chiến — asset manifest (luật lukasai 2026-10-08, doc 42).

  python3 tools/assets/manifest.py build     quét world, ghi assets/manifest.yml, manifest.csv, INDEX.md
  python3 tools/assets/manifest.py check     báo asset chưa khai báo trong assets/registry.yml (exit 1 nếu có)
  python3 tools/assets/manifest.py declare   thêm dòng nháp vào registry cho asset mới (rồi sửa tên/danh mục tay)
  python3 tools/assets/manifest.py replace <địa-chỉ-cũ> <địa-chỉ-mới>   thay mọi tham chiếu trong world + registry
  python3 tools/assets/manifest.py prune     xoá dòng registry của asset không còn ai tham chiếu (luật 2026-10-10: không giữ rác)
  python3 tools/assets/manifest.py sources   ghi assets/SOURCES.md: asset đang dùng → file nguồn để sửa (Blender, code)

Nguồn sự thật: code/scene/config đang tham chiếu gì. registry.yml là phần người khai báo (tên, danh mục, ghi chú,
nguồn local). Không quét: clips/ (bake của engine, engine tự sinh lại) và docs/**/legacy-* (data game cũ, chỉ là chữ tham khảo).
"""
import os, re, sys, csv, json, datetime
import yaml

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
BASE = 'https://www.spawn.co'
SKIP_DIRS = {'history', 'memory', 'engine-reference', 'node_modules', '__pycache__', '.git', 'assets'}
TEXT_EXT = {'.js', '.mjs', '.yml', '.yaml', '.scene', '.json', '.md', '.py', '.csv'}
REG = os.path.join(ROOT, 'assets', 'registry.yml')
HEROES = {'moc-lam': 'Mộc Lẫm', 'kha-tan': 'Kha Tàn', 'mi-dang': 'Mị Đăng', 'hoa-tuy': 'Hỏa Tủy', 'nham-vu': 'Nham Vũ', 'van-dao': 'Vân Dao'}
CATS = {  # danh mục: mã → nhãn tiếng Việt (thêm danh mục mới = thêm dòng ở đây trước)
  'model/hero': 'Model 3D · Tướng', 'model/minion': 'Model 3D · Lính', 'model/creature': 'Model 3D · Quái rừng / Minh Ước',
  'model/boss': 'Model 3D · Boss', 'model/environment': 'Model 3D · Môi trường / map', 'model/prop': 'Model 3D · Đạo cụ',
  'anim/hero-skill': 'Animation · Chiêu tướng', 'anim/hero-death': 'Animation · Chết tướng', 'anim/minion': 'Animation · Lính',
  'anim/library': 'Animation · Thư viện chung', 'anim/pose': 'Animation · Pose / track JSON',
  'audio/sfx': 'Âm thanh · SFX', 'audio/music': 'Âm thanh · Nhạc', 'audio/voice': 'Âm thanh · Lồng tiếng',
  'texture/terrain': 'Texture · Địa hình', 'texture/surface': 'Texture · Bề mặt vật thể',
  'image/reference': 'Ảnh · Tham chiếu / concept', 'image/portrait': 'Ảnh · Chân dung / icon', 'image/ui': 'Ảnh · UI',
  'image/qa': 'Ảnh · Chụp kiểm tra (QA)', 'image/other': 'Ảnh · Khác',
  'code/geometry': 'Code · Hình học sinh thủ tục', 'code/texture': 'Code · Texture vẽ bằng code', 'code/fx': 'Code · Hiệu ứng FX',
  'source/blender': 'Nguồn · Script Blender', 'other': 'Khác',
}
EXT_KIND = {'.glb': 'model', '.gltf': 'model', '.mp3': 'audio', '.wav': 'audio', '.ogg': 'audio', '.png': 'image', '.jpg': 'image',
            '.jpeg': 'image', '.webp': 'image', '.json': 'anim', '.js': 'code', '.py': 'source'}

def walk():
  for d, dirs, files in os.walk(ROOT):
    rel = os.path.relpath(d, ROOT)
    dirs[:] = [x for x in dirs if x not in SKIP_DIRS and not (rel == '.' and x == 'tools' and False)]
    for f in files:
      if os.path.splitext(f)[1] in TEXT_EXT:
        yield os.path.relpath(os.path.join(d, f), ROOT)

CDN = re.compile(r"(?<![A-Za-z0-9])/?cdn/([A-Za-z0-9._\-/]+\.(?:glb|gltf|mp3|wav|ogg|png|jpe?g|webp))(\?[A-Za-z0-9=&]*)?")
TEX = re.compile(r"(?<![A-Za-z0-9/])(texture-[a-z0-9\-]+\.png)")
SFX_CALL = re.compile(r"\b(?:SFX|snd)\(\s*['\"`]([a-z0-9\-]+)['\"`]")
SFX_KEY = re.compile(r"\b(?:hit|death|step|sfx|sound):\s*'([a-z0-9][a-z0-9\-]+)'")
CLIP_CALL = re.compile(r"\bA\(\s*'([a-z0-9\-]+)'")

def norm(path):
  return '/cdn/' + path

def scan():
  refs = {}  # address → set(files)
  def add(addr, f): refs.setdefault(addr, set()).add(f)
  for f in walk():
    if f.startswith('tools/assets/') or '/legacy-' in f: continue
    try: txt = open(os.path.join(ROOT, f), encoding='utf-8').read()
    except Exception: continue
    for m in CDN.finditer(txt): add(norm(m.group(1)), f)
    for m in TEX.finditer(txt): add(norm(m.group(1)), f)
    if '/cdn/moodboard-painterly-fantasy/sfx-${' in txt:
      for m in SFX_CALL.finditer(txt): add(f'/cdn/moodboard-painterly-fantasy/sfx-{m.group(1)}.mp3', f)
      for m in SFX_KEY.finditer(txt): add(f'/cdn/moodboard-painterly-fantasy/sfx-{m.group(1)}.mp3', f)
    if 'cdn/clip-${' in txt:
      for m in CLIP_CALL.finditer(txt): add(f'/cdn/clip-{m.group(1)}.glb', f)
  # units.yml: âm lính theo map ghi bằng tên (hit/death/step) → địa chỉ moodboard painterly-fantasy
  un = yaml.safe_load(open(os.path.join(ROOT, 'scripts/lib/data/units.yml'), encoding='utf-8')) or {}
  for kinds in un.values():
    for k in (kinds or {}).values():
      for f in ('hit', 'death', 'step'):
        if k.get(f): add('/cdn/moodboard-painterly-fantasy/sfx-' + k[f] + '.mp3', 'scripts/lib/data/units.yml')
  # hero-sfx.yml: base + tên file theo tướng (doc53 §10: bundle tướng phải khai báo đủ)
  hs = yaml.safe_load(open(os.path.join(ROOT, 'scripts/lib/data/hero-sfx.yml'), encoding='utf-8')) or {}
  for h, row in (hs.get('heroes') or {}).items():
    for v in (row or {}).values():
      if isinstance(v, str): add('/' + (hs.get('base', '') + v).lstrip('/'), 'scripts/lib/data/hero-sfx.yml')
  return refs

def uploads():
  p = os.path.join(ROOT, 'world.assets.yaml')
  if not os.path.exists(p): return {}
  return ((yaml.safe_load(open(p)) or {}).get('assets') or {}).get('metadata') or {}

def world_files():
  """Assets that live as world files: clips/*.json, scripts/gen, tex-, fx, art/ Blender sources."""
  out = {}
  for d, cat in (('scripts/gen', 'code/geometry'), ('scripts/fx', 'code/fx'), ('art', 'source/blender')):
    base = os.path.join(ROOT, d)
    for dd, dirs, files in os.walk(base):
      dirs[:] = [x for x in dirs if x != '__pycache__']
      for f in files:
        rel = os.path.relpath(os.path.join(dd, f), ROOT)
        if os.path.splitext(f)[1] in ('.json', '.js', '.py'): out[rel] = cat
  for f in os.listdir(os.path.join(ROOT, 'scripts')):
    if f.startswith('tex-') and f.endswith('.js'): out['scripts/' + f] = 'code/texture'
  return out

def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def guess(addr, name):
  n = (name or os.path.basename(addr)).lower()
  ext = os.path.splitext(addr.split('?')[0])[1].lower()
  kind = EXT_KIND.get(ext, 'other')
  hero = next((HEROES[h] for h in HEROES if h in n or h.replace('-', '_') in n), '')
  if kind == 'audio':
    c = 'audio/music' if '/music-' in addr or n.startswith('music') else 'audio/voice' if 'voice-' in addr else 'audio/sfx'
  elif kind == 'model' and 'clip-' in n:
    c = 'anim/hero-death' if 'death' in n and hero else 'anim/hero-skill' if hero else 'anim/minion' if 'linh-' in n else 'anim/library'
  elif kind == 'model':
    c = ('model/boss' if any(k in n for k in ('thuong', 'wyrm', 'titan', 'long', 'whale')) else
         'model/minion' if any(k in n for k in ('minion', 'linh', 'siege', 'melee', 'caster', 'super')) and 'minh-uoc-0' not in n else
         'model/creature' if any(k in n for k in ('minh-uoc', 'hare', 'boar', 'monkey', 'turtle', 'serpent', 'golem', 'crane')) else
         'model/hero' if hero or any(k in n for k in ('hero', 'body', 'avatar')) else
         'model/environment' if any(k in n for k in ('karst', 'bank', 'wall', 'bridge', 'fall', 'water', 'rock', 'cliff', 'tree', 'pine')) else
         'model/prop')
  elif kind == 'image' and 'texture-terrain' in n: c = 'texture/terrain'
  elif kind == 'image' and n.startswith('texture-'): c = 'texture/surface'
  elif kind == 'image':
    c = ('image/qa' if n.startswith('qa-') or 'sil-' in n or 'proof' in n else 'image/ui' if any(k in n for k in ('hud', 'icon', 'logo', 'art-skills', 'art-items', 'economy', 'backdrop')) else
         'image/portrait' if hero or 'portrait' in n else 'image/reference')
  else: c = 'other'
  return c, hero

CONTEXT = {}  # address → name read off where the game uses it (yaml path / js key)

def _yaml_paths(node, path, f):
  if isinstance(node, dict):
    for k, v in node.items(): _yaml_paths(v, path + [str(k)], f)
  elif isinstance(node, list):
    for i, v in enumerate(node): _yaml_paths(v, path + ([] if i == 0 else [str(i)]), f)
  elif isinstance(node, str):
    m = CDN.search(node)
    if m and not path[-1:] == ['assetUrl']:
      a = norm(m.group(1))
      if a not in CONTEXT: CONTEXT[a] = '-'.join(path[-3:]).replace('_', '-')

JS_KEY = re.compile(r"(\w+):\s*\{[^{}]*?\b(model|red|icon|texture|clip|sound)\s*:\s*['\"`]/?cdn/([A-Za-z0-9._\-/]+)")
JS_VAR = re.compile(r"(\w+)\s*[:=]\s*['\"`]/?cdn/(value\.[A-Za-z0-9._\-]+)")

def context():
  for f in walk():
    if f.startswith(('docs/', 'tools/')): continue
    full = os.path.join(ROOT, f)
    try: txt = open(full, encoding='utf-8').read()
    except Exception: continue
    if f.endswith(('.yml', '.yaml', '.scene')) and '/cdn/' in txt and f != 'world.assets.yaml':
      first = [] if f.endswith('.scene') else [os.path.splitext(os.path.basename(f))[0]]  # a scene names it by entity id
      try: _yaml_paths(yaml.safe_load(txt), first, f)
      except Exception: pass
    if f.endswith('.js'):
      for m in JS_KEY.finditer(txt):
        a = norm(m.group(3)); CONTEXT.setdefault(a, f'{m.group(1)}-{m.group(2)}'.replace('_', '-'))
      for m in JS_VAR.finditer(txt):
        a = norm(m.group(2)); CONTEXT.setdefault(a, m.group(1).replace('_', '-').lower())

def readable(addr, meta, used=()):
  base = os.path.basename(addr.split('?')[0])
  if meta and meta.get('name'): return str(meta['name'])
  if addr in CONTEXT: return CONTEXT[addr]
  h = re.search(r'value\.([0-9a-f]{8})', addr)
  if h: return f"{os.path.splitext(os.path.basename(used[0]))[0] if used else 'upload'}-{h.group(1)}"
  stem = os.path.splitext(base)[0]
  return re.sub(r'-(u[0-9a-z]{8,9}|v\d+-[0-9a-f]{8}|[0-9a-f]{8})$', '', stem)

def load_reg():
  if not os.path.exists(REG): return {}
  return (yaml.safe_load(open(REG, encoding='utf-8')) or {}).get('assets') or {}

def save_reg(reg):
  head = ('# Sổ khai báo asset (người viết). Luật: docs/co-linh-than-chien/42-quan-ly-asset.md\n'
          '# Mỗi asset game dùng PHẢI có một dòng ở đây: name (tên dễ đọc), category (mã trong CATS), hero (nếu có),\n'
          '# note, source (file local/Blender gốc để sửa). Chạy: python3 tools/assets/manifest.py check\n')
  with open(REG, 'w', encoding='utf-8') as fh:
    fh.write(head)
    yaml.safe_dump({'assets': dict(sorted(reg.items()))}, fh, allow_unicode=True, sort_keys=False, width=200)

SOURCES = [  # tên upload → script Blender gốc (để tải về sửa local rồi build lại)
  ('karst-wall', 'art/karst-wall/build.py'), ('karst-pillar', 'art/karst/build.py'), ('karst', 'art/karst/build.py'),
  ('minh-uoc', 'art/minh-uoc/'), ('thuong', 'art/thuong-luong/build.py'), ('wyrm', 'art/thuong-luong/build.py'),
  ('statue', 'art/statues/build.py'), ('bank-', 'art/water/build.py'), ('fall', 'art/water/build.py'),
  ('linh', 'art/linh-binh/build.py'), ('-body-v1', 'art/anim/build_hero.py'),
  ('melee-model', 'art/linh-binh/build.py'), ('caster-model', 'art/linh-binh/build.py'), ('super-model', 'art/linh-binh/build.py'),
  ('siege', 'art/linh-binh/build.py'),
  ('-body', 'art/anim/build_hero.py + art/anim/moves.py (động tác chiêu, bake trên rig tướng)'),
  ('bach-dien', 'image→3D (doc 75) · rig: art/anim/rig.py · vũ khí: scripts/gen/weapons.js'),
  ('-model', 'image→3D (tải .glb từ cột link, sửa trong Blender) · rig: art/anim/rig.py · vũ khí: scripts/gen/weapons.js + weapons.yml'),
  ('moc-lam', 'image→3D (tải .glb từ cột link) · rig: art/anim/rig.py'), ('nham-vu', 'image→3D (tải .glb từ cột link) · rig: art/anim/rig.py'),
  ('neutral-default-avatar', 'avatar mặc định của engine (không sửa)'),
  ('clip-', 'thư viện hoạt ảnh engine (`spawn clips`), không có file Blender'),
]

def collect():
  refs, ups, reg = scan(), uploads(), load_reg()
  context()
  rows = {}
  for addr in set(refs) | set(ups):
    if '...' in addr: continue
    meta = ups.get(addr)
    used0 = sorted(refs.get(addr, ()))
    cat, hero = guess(addr, readable(addr, meta, used0))
    r = reg.get(addr) or {}
    used = sorted(f for f in refs.get(addr, ()) )
    game = [f for f in used if not f.startswith('docs/')]
    origin = 'upload' if meta or '/value.' in addr else 'conjured'
    rows[addr] = {
      'name': r.get('name') or readable(addr, meta, used0), 'category': r.get('category') or cat, 'hero': r.get('hero', hero) or '',
      'type': os.path.splitext(addr.split('?')[0])[1].lstrip('.').lower(), 'origin': origin,
      'link': BASE + addr, 'bytes': (meta or {}).get('bytes') or r.get('bytes') or '', 'uploadedAt': (meta or {}).get('uploadedAt', ''),
      'status': 'dùng trong game' if game else ('chỉ trong tài liệu' if used else 'không dùng'),
      'usedBy': used, 'source': r.get('source') or next((s for k, s in SOURCES if k in ((r.get('name') or '') + ' ' + (readable(addr, meta, used0) or addr))), ''),
      'note': r.get('note', ''), 'declared': addr in reg,
    }
  for path, cat in world_files().items():
    r = reg.get(path) or {}
    used = sorted(f for f in refs.get(path, ()))
    rows[path] = {'name': r.get('name') or os.path.splitext(os.path.basename(path))[0], 'category': r.get('category') or cat,
      'hero': r.get('hero', ''), 'type': os.path.splitext(path)[1].lstrip('.'), 'origin': 'world-file',
      'link': f'world:{path}', 'bytes': os.path.getsize(os.path.join(ROOT, path)), 'uploadedAt': '', 'status': 'file trong world',
      'usedBy': used, 'source': r.get('source') or path, 'note': r.get('note', ''), 'declared': path in reg}
  return rows, reg

def ids(rows):
  seen, out = {}, {}
  for addr in sorted(rows, key=lambda a: (rows[a]['category'], rows[a]['name'])):
    PRE = {'model': 'mdl', 'anim': 'anm', 'audio': 'snd', 'texture': 'tex', 'image': 'img', 'code': 'code', 'source': 'src'}
    p = slug(PRE.get(rows[addr]['category'].split('/')[0], 'etc') + '-' + rows[addr]['name'])[:60]
    seen[p] = seen.get(p, 0) + 1
    out[addr] = p if seen[p] == 1 else f'{p}-{seen[p]}'
  return out

def build():
  rows, reg = collect()
  idm = ids(rows)
  order = sorted(rows, key=lambda a: (list(CATS).index(rows[a]['category']) if rows[a]['category'] in CATS else 99, rows[a]['name']))
  now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
  man = {'generated': now, 'base': BASE, 'count': len(rows), 'categories': {}, 'assets': []}
  for a in order:
    r = rows[a]; man['categories'][r['category']] = man['categories'].get(r['category'], 0) + 1
    man['assets'].append({'id': idm[a], 'address': a, **{k: v for k, v in r.items() if k != 'declared'}})
  with open(os.path.join(ROOT, 'assets', 'manifest.yml'), 'w', encoding='utf-8') as fh:
    fh.write('# SINH TỰ ĐỘNG — đừng sửa tay. Sửa tên/danh mục ở assets/registry.yml rồi chạy build.\n')
    yaml.safe_dump(man, fh, allow_unicode=True, sort_keys=False, width=240)
  with open(os.path.join(ROOT, 'assets', 'manifest.csv'), 'w', encoding='utf-8', newline='') as fh:
    w = csv.writer(fh); w.writerow(['id', 'name', 'category', 'hero', 'type', 'status', 'link', 'bytes', 'source', 'usedBy', 'note'])
    for a in order:
      r = rows[a]; w.writerow([idm[a], r['name'], r['category'], r['hero'], r['type'], r['status'], r['link'], r['bytes'], r['source'], ' '.join(r['usedBy']), r['note']])
  L = [f'# Asset Index — Cổ Linh Thần Chiến', '', f'Sinh lúc {now} · {len(rows)} asset · luật: [doc 42](../docs/co-linh-than-chien/42-quan-ly-asset.md) · bảng tính: [manifest.csv](manifest.csv) · dữ liệu: [manifest.yml](manifest.yml)', '',
       'Link `https://www.spawn.co/cdn/…` mở/tải trực tiếp. `world:` = file nằm trong world (tải qua repo / agent).', '', '## Danh mục', '']
  for c, n in man['categories'].items(): L.append(f'- [{CATS.get(c, c)}](#{slug(c)}) · {n}')
  cur = None
  for a in order:
    r = rows[a]
    if r['category'] != cur:
      cur = r['category']; L += ['', f'<a id="{slug(cur)}"></a>', f'## {CATS.get(cur, cur)} (`{cur}`)', '', '| ID | Tên | Tướng | Loại | Trạng thái | Tải | Nguồn sửa | Dùng ở |', '|---|---|---|---|---|---|---|---|']
    link = f'[tải]({r["link"]})' if r['link'].startswith('http') else f'`{a}`'
    used = ', '.join(f'`{u}`' for u in r['usedBy'][:3]) + (f' +{len(r["usedBy"]) - 3}' if len(r['usedBy']) > 3 else '')
    L.append(f'| `{idm[a]}` | {r["name"]} | {r["hero"]} | {r["type"]} | {r["status"]} | {link} | {r["source"]} | {used} |')
  open(os.path.join(ROOT, 'assets', 'INDEX.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
  und = [a for a in rows if not rows[a]['declared']]
  print(f'manifest: {len(rows)} asset, {len(man["categories"])} danh mục, chưa khai báo: {len(und)}')
  for c, n in man['categories'].items(): print(f'  {c}: {n}')
  return rows

def check():
  rows, reg = collect()
  und = sorted(a for a in rows if not rows[a]['declared'])
  missing = sorted(a for a in reg if a not in rows)
  badcat = sorted(a for a, r in reg.items() if r.get('category') not in CATS)
  for a in und: print('CHƯA KHAI BÁO', a, '←', ', '.join(rows[a]['usedBy'][:2]))
  for a in missing: print('KHAI BÁO NHƯNG KHÔNG CÒN', a)
  for a in badcat: print('DANH MỤC SAI', a, reg[a].get('category'))
  print(f'check: {len(rows)} asset · chưa khai báo {len(und)} · mồ côi {len(missing)} · danh mục sai {len(badcat)}')
  return 1 if und or badcat else 0

def declare():
  rows, reg = collect()
  n = 0
  for a, r in rows.items():
    if r['declared']: continue
    reg[a] = {k: r[k] for k in ('name', 'category', 'hero', 'source', 'note') if r[k]}
    reg[a]['declared'] = datetime.date.today().isoformat(); n += 1
  save_reg(reg); print(f'declare: +{n} dòng vào assets/registry.yml (kiểm tên + danh mục)')

def replace(old, new):
  n = 0
  for f in walk():
    p = os.path.join(ROOT, f); t0 = t = open(p, encoding='utf-8').read()
    t = t.replace(old.lstrip('/'), new.lstrip('/'))  # covers '/cdn/x' and 'cdn/x' alike
    if t != t0: open(p, 'w', encoding='utf-8').write(t); n += 1
  reg = load_reg()
  if old in reg:
    reg[new] = {**reg.pop(old), 'replaces': old, 'declared': datetime.date.today().isoformat()}; save_reg(reg)
  print(f'replace: {old} → {new} ({n} file)')

def prune():
  rows, reg = collect()
  gone = sorted(a for a in reg if a not in rows)
  for a in gone: print('BỎ', a, '·', reg[a].get('name', ''))
  for a in gone: del reg[a]
  save_reg(reg); print(f'prune: bỏ {len(gone)} dòng')

def sources():
  rows, reg = collect()
  keep = ('model/', 'anim/hero', 'anim/minion', 'anim/library', 'texture/', 'code/')
  L = ['# Nguồn sửa asset — Cổ Linh Thần Chiến', '', 'Sinh bởi `python3 tools/assets/manifest.py sources`. Không sửa tay.',
       'Asset ĐANG DÙNG trong game → file để sửa. Model/clip: chạy script Blender trong `art/` (xem `art/**/README` hoặc đầu file), xuất .glb, upload, rồi `manifest.py replace <cũ> <mới>`.', '']
  miss = []
  for cat in sorted({r['category'] for r in rows.values()}):
    if not cat.startswith(keep): continue
    items = [(a, r) for a, r in rows.items() if r['category'] == cat and r['status'] in ('dùng trong game', 'file trong world')]
    if not items: continue
    L += [f'## {CATS.get(cat, cat)}', '', '| Tên | Tướng | Asset | Nguồn sửa |', '|---|---|---|---|']
    for a, r in sorted(items, key=lambda x: x[1]['name']):
      src = r['source'] if r['source'] and r['source'] != a else ''
      if not src and cat.startswith(('model/', 'anim/')): miss.append(r['name'])
      L.append(f"| {r['name']} | {r['hero']} | `{a.split('/')[-1][:48]}` | {('`' + src + '`') if src else '**THIẾU NGUỒN**'} |")
    L.append('')
  L += ['## Thiếu nguồn sửa (model/clip đang dùng)', '', *(f'- {n}' for n in miss), '']
  open(os.path.join(ROOT, 'assets', 'SOURCES.md'), 'w', encoding='utf-8').write('\n'.join(L))
  print(f'sources: assets/SOURCES.md · thiếu nguồn {len(miss)}')

if __name__ == '__main__':
  cmd = sys.argv[1] if len(sys.argv) > 1 else 'build'
  if cmd == 'build': build()
  elif cmd == 'check': sys.exit(check())
  elif cmd == 'declare': declare(); build()
  elif cmd == 'replace': replace(sys.argv[2], sys.argv[3]); build()
  elif cmd == 'prune': prune(); build(); sources()
  elif cmd == 'sources': sources()
  else: print(__doc__)
