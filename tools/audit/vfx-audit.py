#!/usr/bin/env python3
"""doc 56 · VFX audit: every hero x slot x moment against the real numbers. `python3 tools/audit/vfx-audit.py` → 0 issues = pass.
Mirrors the size formulas in scripts/lib/vfx/compose.js + scripts/effects/vfx-*.fx.js; change both together."""
import re, sys, yaml, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
H = yaml.safe_load(open(R/'scripts/lib/data/heroes.yml'))['heroes']
V = yaml.safe_load(open(R/'scripts/lib/data/vfx-heroes.yml'))
eff = {p.name: p.read_text() for p in (R/'scripts/effects').glob('*.fx.js')}
STATUS = set(re.findall(r"k === '(\w+)'", eff['vfx-status.fx.js'])) | {'charm'}
issues, rows = [], []
def bad(m): issues.append(m)
# A6/A7: every effect program: no bare `count:` (it is not a burst: it never ends), ≤ 8 populations per fx(...)
for n, t in eff.items():
    if re.search(r"[{,]\s*count:\s*\d", t): bad(f'{n}: bare count: (an endless emitter, not a burst)')
    for m in re.finditer(r"return fx\(([^)]*)\)", t):
        k = len([x for x in m.group(1).split(',') if x.strip()])
        if k > 8: bad(f'{n}: {k} populations in one fx (limit 8)')
PAS = {'burn_on_ability': 'burn', 'bleed': 'bleed'}
for hero, kit in H.items():
    row = V.get(hero)
    if not row: bad(f'{hero}: no row in vfx-heroes.yml'); continue
    for slot in ['lmb', 'rmb', 'q', 'e', 'r', 'passive']:
        sp = kit.get(slot) or {}
        aim = sp.get('aim'); moments = []
        if slot == 'lmb':
            b = row.get('basic', {})
            if aim == 'melee':
                if not b.get('slash'): bad(f'{hero} lmb: melee with no slash')
                reach = (b.get('reach') or sp.get('range', 2)) + 0.3
                moments.append(f"chém {b.get('slash')} r={reach:.1f}m (tầm {sp.get('range')})")
                if abs(reach - sp.get('range', 2)) > 0.5: bad(f'{hero} lmb: slash reach {reach} vs range {sp.get("range")}')
            else:
                d = b.get('size', 0.48)
                moments.append(f"đạn {b.get('shape')} Ø{d:.2f}m")
                if not 0.35 <= d <= 0.6: bad(f'{hero} lmb: basic shot Ø{d} outside 0.35–0.6 m')
            moments.append('va đập')
        elif aim == 'skillshot':
            w = sp.get('width', 1); t = sp.get('range', 0) / max(1, sp.get('speed', 20))
            moments.append(f"đạn Ø{w:.1f}m = hitbox, bay {t:.2f}s")
            if t < 0.25: bad(f'{hero} {slot}: flight {t:.2f}s under 0.25 s (too fast to read/dodge)')
        elif aim == 'area':
            r = sp.get('radius', 0); wait = (sp.get('windup') or 0) + (sp.get('delay') or 0)
            moments.append(f"vùng r={r}m sóng Ø{2*r:.1f}m" + (f", cảnh báo {wait:.2f}s" if wait >= 0.25 else ''))
        elif aim == 'target': moments.append('đòn lên mục tiêu')
        elif aim == 'self': moments.append('tự thân')
        for e in sp.get('effects') or []:
            k = next((x for x in ('stun', 'root', 'charm', 'slow') if x in e), None)
            if k:
                moments.append(f"{k} {e.get(k) if k != 'slow' else e.get('duration')}s")
                if k not in STATUS: bad(f'{hero} {slot}: status {k} has no look')
        if sp.get('knockback') or sp.get('pull'): moments.append('hất/kéo'); 'knock' in STATUS or bad(f'{hero} {slot}: no knock look')
        if sp.get('shield'): moments.append('khiên (viền + vỡ)'); 'shieldbreak' in STATUS or bad(f'{hero} {slot}: shield has no break look')
        if sp.get('buff'): moments.append('tăng tốc'); 'haste' in STATUS or bad(f'{hero} {slot}: buff has no look')
        if sp.get('heal'): moments.append('hồi máu'); 'heal' in STATUS or bad(f'{hero} {slot}: heal has no look')
        if sp.get('mark'): moments.append('dấu ấn 4s'); 'mark' in STATUS or bad(f'{hero} {slot}: mark has no look')
        if slot == 'passive' and sp.get('type') in PAS:
            k = PAS[sp['type']]; moments.append(f'{k} {sp.get("duration")}s'); k in STATUS or bad(f'{hero} passive: {k} has no look')
        rows.append(f'| {hero} | {slot} | {aim or sp.get("type","")} | ' + ' · '.join(moments) + ' |')
print('| tướng | chiêu | kiểu | hình đọc được |\n|---|---|---|---|'); print('\n'.join(rows))
print(f'\nstatus library: {", ".join(sorted(STATUS))}')
print(f'\n{len(issues)} issues'); [print(' -', i) for i in issues]
sys.exit(1 if issues else 0)
