# 67 · P0 item pass — runtime (Savi, 09/10/2026)

Thực thi #51212 theo 66 → 63 → 59. Runtime trước: 8 món legacy. TODO trước, audit sau.

## TODO
- [x] T1. Audit công thức: heroStats, hurt, DoT, penetration, tuning, shield, AS (combat.js, bot.js, hero/match/*).
- [x] T2. Bench 3 phương án cho 8 món legacy (A giữ giá / B giá theo tầng / C tách trục), cùng vàng, chọn theo số.
- [x] T3. Một nguồn catalog có version trong economy.yml: legacy (rollback), legacy-2 (live), candidate-0.1.0 (nhập từ JSON, tắt).
- [x] T4. scripts/lib/items.js: resolver + giao dịch (ghép, credit, maxCopies, ô sau tiêu thụ, relic), giá bán.
- [x] T5. heroStats đọc AP/MR/tốc chạy từ đồ; HP: tăng max giữ HP hiện tại, giảm max thì clamp.
- [x] T6. Player + bot cùng đường mua; bot thirdHit Quickstring; bot build theo kit.
- [x] T7. Stamp itemCat theo tướng khi vào trận; seed/reconnect mang theo.
- [x] T8. Shop/tooltip/ô đồ/gợi ý/scoreboard đọc cùng catalog đã stamp.
- [ ] T9. Engine 1v1: mua/bán/HP/stat thật trong trận; bot vs bot.
- [ ] T10. Báo cáo: TTK sáu tướng trước/sau cùng vàng, OLD→NEW, GAP.

## Trạng thái 09/10 tối
- @lukasai: "đưa tất cả vào đi. Rồi test sau" → `itemCatalog: candidate-0.1.0` (24 món) cho trận mới. Trận đang chạy giữ version đã stamp. Rollback: đổi `itemCatalog` về `legacy-2` hoặc `legacy`.
- Chạy được: chỉ số 24 món (AD/AP/HP/giáp/MR/AS/hồi máu/tốc chạy), ghép + tín dụng nguyên liệu, maxCopies, 1 relic, bán 60%, relic active. Shop/tooltip/ô đồ/gợi ý/bot đọc cùng catalog. 16 icon mới vẽ + khai báo registry.
- Engine (fixture bot, không phải trận thật): bot mới stamp candidate; Mi Dang L7 + Lò Thần Ký + Ấn Tĩnh = AP 85, MR 61.8 đúng. legacy-2 Iron Plate L1 = giáp 54, HP 878 đúng. Túi chưa stamp → legacy.
- Unit (bun tools/balance/items-runtime.test.mjs): 12/12 PASS fixture.
- GAP OPEN: nội tại 8 món hoàn chỉnh (passive.implemented: false) chưa chạy; trận 1v1 thật, bot mua đồ trong trận, shop 24 món trên màn hình, reconnect: NOT RUN.

## Bench 3 phương án (8 món legacy, mô hình, chưa engine)
| | eff vàng | Iron Plate physEHP L1 | Oathguard physEHP L1 | TTK L1 1 món / không đồ |
|---|---|---|---|---|
| OLD | 1.48–3.14 | +63–90% | +150–220% | +19% |
| A giữ giá | 0.99–1.29 | +18–24% | +51–73% | +8% |
| B giá theo tầng (chọn → legacy-2) | 1.00–1.18 | +18–24% | +62–89% | +8% |
| C tách trục | 1.00–1.24 | +14–16% | +56–79% | +10% |
B: lệch eff nhỏ nhất, TTK L11 theo vai trò đều nhất giữa 6 tướng (cv 0.06 vs 0.08 OLD).
