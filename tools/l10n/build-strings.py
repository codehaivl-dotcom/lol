# Sinh scripts/lib/data/strings.yml (vi-VN, nạp sẵn ở boot) và scripts/lib/data/strings-en.yml (en, chỉ tải bằng import()
# khi người chơi chọn locale=en; B1 doc 48 v3) từ docs/co-linh-than-chien/data/roster-display-map.csv (09 §1),
# tools/l10n/ui-strings.yml (UI viết tay) và tools/l10n/tip-strings.yml (tooltip kỹ năng). Nguồn vẫn viết { vi-VN, en } cạnh nhau.
# Không sửa tay hai file sinh ra: khoá mới vào tools/l10n/*.yml rồi chạy lại.
import csv, json, yaml
HEROES = ["moc_lam", "kha_tan", "mi_dang", "hoa_tuy", "nham_vu", "van_dao", "hao_nhat", "huong_mai"]
rows = {r["hero_id"]: r for r in csv.DictReader(open("docs/co-linh-than-chien/data/roster-display-map.csv", encoding="utf-8"))}
q = lambda s: json.dumps(s, ensure_ascii=False)
src = []
for h in HEROES:
    r = rows[h]
    for f in ["name", "epithet", "role", "passive", "lmb", "q", "rmb", "e", "r"]:
        src.append(f"hero.{h}.{f}: {{ vi-VN: {q(r[f+'_vi'])}, en: {q(r[f+'_en'])} }}")
src.append(open("tools/l10n/ui-strings.yml", encoding="utf-8").read())
src.append(open("tools/l10n/tip-strings.yml", encoding="utf-8").read())
table = yaml.safe_load("\n".join(src))
head = "# SINH TỰ ĐỘNG bởi tools/l10n/build-strings.py — sửa tools/l10n/*.yml hoặc roster CSV, rồi chạy lại."
vi = [head, "# khoá → { vi-VN }. Đọc qua scripts/lib/i18n.js t(key, locale, vars); en nằm ở strings-en.yml (tải khi cần)."]
en = [head, "# khoá → chuỗi en. scripts/lib/i18n.js import() file này khi locale=en; thiếu khoá thì đọc vi-VN."]
for k, v in table.items():
    vi.append(f"{k}: {{ vi-VN: {q(v['vi-VN'])} }}")
    if v.get("en") is not None: en.append(f"{k}: {q(v['en'])}")
open("scripts/lib/data/strings.yml", "w", encoding="utf-8").write("\n".join(vi) + "\n")
open("scripts/lib/data/strings-en.yml", "w", encoding="utf-8").write("\n".join(en) + "\n")
print("ok", len(table), "keys")

# Lô E: tách chữ dài (tip/lore/bio/desc) sang strings-long.yml, tải sau khi đứng.
import runpy; runpy.run_path("tools/l10n/split-strings.py")
