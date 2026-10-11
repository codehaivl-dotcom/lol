# Liệt kê mọi primitive scripted trong place (cells + config) -> /tmp/bench/rows.json. Dùng: python3 tools/perf/geo_rows.py [place]
import yaml, glob, json, sys, os
place = sys.argv[1] if len(sys.argv) > 1 else 'main'
rows = []
def walk(o, cell, rid):
    if isinstance(o, dict):
        p = o.get('primitive')
        if isinstance(p, dict) and p.get('kind') == 'scripted':
            rows.append({'cell': cell, 'id': rid, 'script': p.get('script'), 'params': p.get('params') or {}, 'seed': p.get('seed')})
        for c in o.get('children') or []: walk(c, cell, rid + '/child')
for f in sorted(glob.glob(f'places/{place}/cells/*.scene')):
    for k, v in (yaml.safe_load(open(f)) or {}).items(): walk(v, os.path.basename(f), k)
os.makedirs('/tmp/bench', exist_ok=True)
json.dump(rows, open('/tmp/bench/rows.json', 'w'))
print(len(rows), 'scripted rows')
