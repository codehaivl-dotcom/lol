#!/usr/bin/env python3
# Lô E (2026-10-11): tách scripts/lib/data/strings.yml (vi-VN) thành hai file để giảm tải vào trận:
# - strings.yml      : khoá ngắn (HUD, sảnh, tên tướng/chiêu…) — nạp tĩnh qua scripts/lib/i18n.js, đi theo boot.
# - strings-long.yml : chữ dài chưa cần lúc đứng vào trận (tip.*, hero.<h>.bio, hero.<h>.<slot>.desc, lore.*) —
#                      i18n.js import() sau lần gọi t() đầu tiên; trước khi về, khoá dài đọc ra chuỗi rỗng.
# Định dạng mới: `khoá: "chuỗi vi"` (bỏ vỏ { vi-VN: … }, i18n đọc được cả hai). Chạy lại được (đọc cả hai file nếu có).
# build-strings.py gọi split() sau khi sinh; chạy tay: python3 tools/l10n/split-strings.py
import json, os, re, yaml
D = 'scripts/lib/data/'
LONG = re.compile(r'^(tip\.|lore\.|hero\.[a-z_]+\.bio$|hero\.[a-z_]+\.[a-z]+\.desc$)')
def split(table=None, head='# SINH TỰ ĐỘNG — sửa tools/l10n/*.yml rồi chạy build-strings.py (đã tách bởi split-strings.py).'):
  if table is None:
    table = {}
    for f in ('strings.yml', 'strings-long.yml'):
      if os.path.exists(D + f): table.update(yaml.safe_load(open(D + f, encoding='utf-8')) or {})
  q = lambda s: json.dumps(s, ensure_ascii=False)
  core, long = [head, '# khoá ngắn → chuỗi vi-VN, nạp ở boot. Chữ dài ở strings-long.yml (import() sau khi đứng).'], [head, '# chữ dài vi-VN (tip/bio/desc/lore): scripts/lib/i18n.js import() sau khi đứng; xem LONG trong split-strings.py.']
  for k, v in table.items():
    s = v['vi-VN'] if isinstance(v, dict) else v
    (long if LONG.match(k) else core).append(f'{k}: {q(s)}')
  open(D + 'strings.yml', 'w', encoding='utf-8').write('\n'.join(core) + '\n')
  open(D + 'strings-long.yml', 'w', encoding='utf-8').write('\n'.join(long) + '\n')
  return len(core) - 2, len(long) - 2
if __name__ == '__main__':
  before = yaml.safe_load(open(D + 'strings.yml', encoding='utf-8'))
  n = split()
  after = yaml.safe_load(open(D + 'strings.yml', encoding='utf-8')); after.update(yaml.safe_load(open(D + 'strings-long.yml', encoding='utf-8')))
  flat = {k: (v['vi-VN'] if isinstance(v, dict) else v) for k, v in before.items()}
  assert flat == after or not all(isinstance(v, dict) for v in before.values()), 'tách làm mất/đổi khoá'
  print('core', n[0], 'long', n[1], 'B', os.path.getsize(D + 'strings.yml'), os.path.getsize(D + 'strings-long.yml'))
