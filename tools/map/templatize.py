#!/usr/bin/env python3
"""E2/P13 (2026-10-11): gom phần lặp của hàng trang trí map vào template dùng chung, KHÔNG đổi hình/vị trí.
- Nhóm: hàng có tag art/dressing/decor, cùng (tags, model/primitive script). Nhóm >= 3 hàng.
- Template = các khoá giống hệt nhau ở mọi hàng trong nhóm; overrides = phần còn lại (feetPosition, rotation, scale...).
- Số thực làm tròn 6 chữ số thập phân (thay đổi <= 5e-7, dưới độ chính xác float32 của engine).
- Kiểm: template ∪ overrides == hàng cũ (đã làm tròn) cho từng hàng, sai là dừng.
Dùng: python3 tools/map/templatize.py [place] [--write]   (in số byte trước/sau; --write mới ghi)."""
import yaml, glob, json, sys, os, re, collections
place = next((a for a in sys.argv[1:] if not a.startswith('-')), 'main')
WRITE = '--write' in sys.argv
TPL = f'templates/map-{place}.js'
REF = TPL + '#'
OK_TAGS = {'art', 'dressing', 'decor'}

def rnd(o):
  if isinstance(o, float): r = round(o, 6); return int(r) if r == int(r) and abs(r) < 1e15 else r
  if isinstance(o, dict): return {k: rnd(v) for k, v in o.items()}
  if isinstance(o, list): return [rnd(v) for v in o]
  return o
def key(v): return json.dumps(v, sort_keys=True)
def sig(v):
  m = v.get('model'); m = m.get('id') if isinstance(m, dict) else m
  p = v.get('primitive'); p = p.get('script') if isinstance(p, dict) else None
  return (tuple(v.get('tags') or []), m, p, 'fx' if 'fx' in v else '')

cells = {f: (yaml.safe_load(open(f)) or {}) for f in sorted(glob.glob(f'places/{place}/cells/*.scene'))}
old_tpl = {}
if os.path.exists(TPL):  # chạy lại: bung hàng template cũ trước rồi gom lại
  src = open(TPL).read()
  for m in re.finditer(r'^export const (\w+) = (.*);$', src, re.M): old_tpl[m.group(1)] = json.loads(m.group(2))
rows = {}
for f, d in cells.items():
  for k, v in d.items():
    if isinstance(v, dict) and str(v.get('template', '')).startswith(REF):
      v = {**old_tpl[v['template'][len(REF):]], **(v.get('overrides') or {}), 'id': k}
    rows[k] = (f, rnd(v))
groups = collections.defaultdict(list)
for k, (f, v) in rows.items():
  if set(v.get('tags') or []) & OK_TAGS and 'behavior' not in v and 'template' not in v: groups[sig(v)].append(k)
tpls, member = {}, {}
used = collections.Counter()
for s, ks in groups.items():
  if len(ks) < 3: continue
  vs = [rows[k][1] for k in ks]
  common = {a: b for a, b in vs[0].items() if a != 'id' and all(a in v and key(v[a]) == key(b) for v in vs[1:])}
  if len(key(common)) < 40: continue
  base = re.sub(r'[^a-zA-Z0-9]+', '_', (s[0][-1] if s[0] else 'row')).strip('_')
  used[base] += 1; name = f'{base}_{used[base]}'
  tpls[name] = common
  for k in ks: member[k] = name
# ghi lại
before = sum(os.path.getsize(f) for f in cells) + (os.path.getsize(TPL) if os.path.exists(TPL) else 0)
out = {f: {} for f in cells}
for k, (f, v) in rows.items():
  if k in member:
    t = tpls[member[k]]
    ov = {a: b for a, b in v.items() if a != 'id' and a not in t}
    assert key({**t, **ov, 'id': k}) == key(v), k
    out[f][k] = {'overrides': ov, 'template': REF + member[k]}
  else: out[f][k] = v
head = '// Sinh bởi tools/map/templatize.py (E2/P13). Phần chung của hàng trang trí map; vị trí/góc/tỉ lệ ở overrides trong cells.\n// Không sửa tay: sửa hàng trong scene rồi chạy lại công cụ.\n'
tsrc = head + ''.join(f'export const {n} = {json.dumps(t, sort_keys=True, ensure_ascii=False)};\n' for n, t in sorted(tpls.items()))
texts = {f: f'# spawn-scene v2 yaml {os.path.basename(f)[:-6]}\n' + (yaml.safe_dump(d, default_flow_style=None, width=100000, sort_keys=True, allow_unicode=True) if d else '{}\n') for f, d in out.items()}
# kiểm vòng: đọc lại text vừa sinh, bung template, so với hàng cũ
for f, txt in texts.items():
  back = yaml.safe_load(txt) or {}
  for k, v in back.items():
    if 'template' in v: v = {**tpls[v['template'][len(REF):]], **v['overrides'], 'id': k}
    assert key(rnd(v)) == key(rows[k][1]), ('roundtrip', k)
after = sum(len(t.encode()) for t in texts.values()) + len(tsrc.encode())
print(f'{len(tpls)} template, {len(member)} hàng gom; cells+template {before} B -> {after} B ({after-before:+d})')
for f, t in texts.items(): print(f'  {os.path.basename(f):14} {os.path.getsize(f):>7} -> {len(t.encode()):>7}')
print(f'  {TPL:14} {len(tsrc.encode()):>7}')
if WRITE:
  for f, t in texts.items(): open(f, 'w').write(t)
  open(TPL, 'w').write(tsrc); print('đã ghi')
