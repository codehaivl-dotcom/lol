#!/usr/bin/env python3
"""Kiểm trước phát hành (doc14 · quy định model lỗi vĩnh viễn, 2026-10-09).
Mỗi file tải lên (/cdn/value.<sha>.<ext>) trong scripts/assets/bundles.yml phải: trả 2xx, và .glb phải mở đầu bằng 'glTF'.
Tên sinh theo đường dẫn (/cdn/moodboard-…, /cdn/clip-…) KHÔNG gọi ở đây: gọi tên mới là mua asset; engine giữ tên đã phục vụ.
Dùng: python3 tools/assets/verify-urls.py  → in 'ok N' hoặc liệt kê file hỏng và thoát mã 1."""
import re, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor
HOST = 'https://www.spawn.co'
src = open('scripts/assets/bundles.yml', encoding='utf-8').read()
urls = sorted(set(re.findall(r'/cdn/value\.[0-9a-f]{64}\.\w+', src)))
def check(u):
    try:
        req = urllib.request.Request(HOST + u, headers={'Range': 'bytes=0-15', 'User-Agent': 'colinh-verify'})
        with urllib.request.urlopen(req, timeout=20) as r:
            head = r.read(16)
            if u.endswith('.glb') and not head.startswith(b'glTF'): return (u, 'không phải glTF')
            return None
    except Exception as e:
        return (u, str(e)[:80])
with ThreadPoolExecutor(8) as ex: bad = [b for b in ex.map(check, urls) if b]
for u, why in bad: print('HỎNG', u, '·', why)
print(('ok ' if not bad else 'fail ') + f'{len(urls) - len(bad)}/{len(urls)}')
sys.exit(1 if bad else 0)
