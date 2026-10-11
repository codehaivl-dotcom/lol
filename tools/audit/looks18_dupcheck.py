#!/usr/bin/env python3
"""Kiểm trùng look 18 tướng (PROPOSAL, chỉ tài liệu).
Đọc bảng trong DUYET-TAO-HINH-18.md và docs/co-linh-than-chien/85-de-xuat-18-tuong.md
(cột 'Tạo hình đề xuất' + 'Dự phòng', lấy số look 3 chữ số đầu tiên của ô).
Kiểm: (1) 36 số không trùng nhau; (2) không trùng look đã giữ/chặn cho 9 tướng đang có;
(3) hai file khớp nhau từng tướng. Thoát 1 nếu lỗi.
Chạy: python3 tools/audit/looks18_dupcheck.py
"""
import re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
FILES = [ROOT / "DUYET-TAO-HINH-18.md", ROOT / "docs/co-linh-than-chien/85-de-xuat-18-tuong.md"]
# Look đã gắn / chặn cho 9 tướng đang có (doc 74 §Ghép, doc 75). Tướng 'giữ nguyên' không chiếm số.
RESERVED = {
    "023": "moc_lam (đề xuất 023 Cá Sấu; doc 75: giữ canon, 023 để dành)",
    "081": "kha_tan (phụ 081 Thuồng Luồng Con)",
    "013": "hao_nhat (CURRENT_CANON khóa; 013 Tượng Đồng Xanh gần dáng)",
    "092": "nham_vu (đề xuất 092 Cưỡi Gà Chọi)",
    "088": "nham_vu (phụ 088 Dơi Quạ)",
    "009": "hoa_tuy (chặn trùng dung nham)",
    "020": "hoa_tuy (chặn trùng than, doc 74 §020)",
    "076": "hoa_tuy (chặn trùng nhật thực)",
    "098": "bach_dien (Vũ Công Gương Đồng: giữ 098 vũ công để khỏi trùng)",
}
# mi_dang, van_dao, huong_mai: giữ nguyên, không chiếm số look.

def parse(path):
    rows, hdr = {}, None
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if "Tạo hình đề xuất" in cells and "Dự phòng" in cells:
            hdr = {n: i for i, n in enumerate(cells)}
            continue
        if not hdr or set(cells[0]) <= set("-: "):
            continue
        if len(cells) <= max(hdr["Tạo hình đề xuất"], hdr["Dự phòng"]):
            continue
        name = cells[hdr["Tướng"]].replace("*", "").strip()
        a = re.search(r"\b(\d{3})\b", cells[hdr["Tạo hình đề xuất"]])
        b = re.search(r"\b(\d{3})\b", cells[hdr["Dự phòng"]])
        if a and b:
            rows[name] = (a.group(1), b.group(1))
    return rows

err = 0
tables = {}
for f in FILES:
    if not f.exists():
        print(f"THIẾU FILE {f}"); err += 1; continue
    t = parse(f); tables[f.name] = t
    print(f"{f.name}: {len(t)} tướng")
    if len(t) != 18:
        print(f"  LỖI: cần 18 tướng, đọc được {len(t)}"); err += 1
    seen = {}
    for hero, (m, fb) in t.items():
        for kind, n in (("chính", m), ("dự phòng", fb)):
            if n in seen:
                print(f"  TRÙNG {n}: {hero} ({kind}) và {seen[n]}"); err += 1
            else:
                seen[n] = f"{hero} ({kind})"
            if n in RESERVED:
                print(f"  TRÙNG TƯỚNG ĐANG CÓ {n}: {hero} ({kind}) ↔ {RESERVED[n]}"); err += 1
    print(f"  {len(seen)} số look riêng biệt")
if len(tables) == 2:
    a, b = tables.values()
    for h in sorted(set(a) | set(b)):
        if a.get(h) != b.get(h):
            print(f"LỆCH giữa hai file: {h}: {a.get(h)} ≠ {b.get(h)}"); err += 1
print("KẾT QUẢ:", "PASS" if err == 0 else f"FAIL ({err} lỗi)")
sys.exit(1 if err else 0)
