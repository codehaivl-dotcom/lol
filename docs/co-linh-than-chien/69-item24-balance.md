# 69 · Cân bằng 24 item candidate-0.1.0 — vòng 1 (phương án C ÁP THỬ vào runtime 2026-10-09, chưa chốt)

Baseline: `scripts/lib/data/economy.yml › itemCatalogs.candidate-0.1.0` (ACTIVE). Công cụ: `bun tools/balance/items.mjs --scen tools/balance/item-scenarios-24.yml [--items tools/balance/item-variants/c24/X.yml]`.
Công thức giảm sát thương đã kiểm: `100/(100+max(0,res−pen))` (combat.js hurt + DOT) — đúng, không có cộng/nhân sai. Thước giá stat lấy từ 8 basic (90 HP=250, 12 giáp/KP=240, 10 AD=300, 18 AP=300, 10% AS=300).
Kịch bản vàng theo profile mg1v1: L1 300g, L4 900g, L7 2000g, L11 4000g (tổng đã tiêu).
Hạn chế mô phỏng: knapsack chưa trừ nguyên liệu bị tiêu thụ; TTK = full kit vào mục tiêu đứng yên; nội tại tính tối giản. PASS_MODEL ≠ PASS_HARNESS.

## Bảng 24 món (BEFORE · hiệu quả vàng = giá trị stat / giá, không tính nội tại)
| item | bậc | giá | chỉ số | eff | phys EHP L1 / L6 | đánh giá |
|---|---|---|---|---|---|---|
| mach_tinh | basic | 250 | 90 HP | 1.00 | +11–18% / +6–10% | ổn |
| dong_van | basic | 240 | 12 giáp | 1.00 | +9–10% / +7–8% | ổn |
| ngoc_am | basic | 240 | 12 KP | 1.00 | mag +9% | ổn |
| nanh_mach / kinh_luu / soi_nhip | basic | 300 | 10 AD / 18 AP / 10% AS | 1.00 | — | ổn |
| hat_sinh | basic | 200 | 1 HP/s | 1.00 | — | ổn |
| buoc_van | basic | 300 | 0.25 m/s | 1.00 | — | ổn |
| iron_plate | inter | 550 | 24 giáp | 0.87 | +17–20% / +15–17% | **UP** (ghép đắt hơn 2 basic 70g mà không thêm gì) |
| quickstring | inter | 650 | 21% AS | 0.97 | — | ổn |
| kinh_song | inter | 700 | 36 AP, 90 HP | **1.21** | +11–18% | **OP** |
| binh_mach | inter | 750 | 180 HP, 1 HP/s | 0.93 | +22–36% | hơi UP |
| nanh_khep | inter | 750 | 20 AD | **0.80** | — | **UP** |
| an_tinh | inter | 600 | 24 KP | **0.80** | mag +18–19% | **UP** |
| oathguard_plate | completed | 1600 | 240 HP, 35 giáp, 24 KP + khiên | **1.15** | **+62–89% / +43–57%** | **OP** — vừa HP vừa giáp vừa KP, rẻ hơn giá trị |
| keeneye | completed | 1700 | 30 AD, 25% AS + đòn thứ 4 | 0.97 | — | ổn |
| thornseed_quiver | completed | 1400 | 180 HP, 25% AS + làm chậm | 0.89 | +22–36% | hơi UP |
| heartforge | completed | 1500 | 350 HP, 3 HP/s + hồi ngoài giao tranh | 1.05 | +42–70% / +25–39% | hơi OP (phòng thủ) |
| lo_than_ky | completed | 1700 | 85 AP, 120 HP + sát thương thêm | 1.03 | +14–24% | ổn |
| dang_hoi_am | completed | 1800 | 70 AP, 120 HP, 24 KP + tốc chạy | **1.10** | mag +35–47% | **OP** |
| chuong_may | completed | 1600 | 36 AP, 270 HP, 2 HP/s + hồi/khiên ×1.08 | **1.09** | +33–54% | **OP** |
| qua_mach | completed | 1900 | 30 AD, 180 HP, 24 giáp + đòn sau skill | 0.99 | +43–62% | ổn |
| phial_of_dawn / bastion_stone | relic | 150 / 300 | active hồi 150 / khiên 180 | n/a | — | active, không đo bằng stat |

## 3 phương án (chỉ trong file variant, CHƯA áp)
- **A · cắt chỉ số, giữ giá:** oathguard 200 HP/30 giáp/20 KP; heartforge 320 HP; chuong_may 230 HP; dang_hoi_am 60 AP; kinh_song 28 AP; nanh_khep 24 AD; an_tinh 28 KP; iron_plate 26 giáp; thornseed 200 HP.
- **B · giữ chỉ số, đổi giá:** oathguard 1850, heartforge 1580, chuong_may 1750, dang_hoi_am 1950, kinh_song 800, nanh_khep 650, an_tinh 520, iron_plate 500, thornseed 1300.
- **C · (đề xuất)** đồ phòng thủ/hoàn chỉnh OP cắt chỉ số như A (giữ mốc giá người chơi đã quen), intermediate/UP sửa giá như B.

| | oathguard phys EHP L1 / L6 | eff oathguard | TTK L4_role (Mộc Lẫm…Vân Dao) | TTK L7_maxdef |
|---|---|---|---|---|
| BEFORE | +62–89% / +43–57% | 1.15 | 28.3 27.0 26.3 20.6 16.6 24.8 | 26.7 26.8 25.7 19.6 17.3 21.9 |
| A | +51–73% / +35–47% | 0.97 | 28.4 27.6 26.5 20.8 16.8 24.9 | 26.6 26.1 25.3 19.5 16.9 21.6 |
| B | +62–89% / +43–57% | 1.00 | 27.7 26.6 25.4 19.4 15.6 22.3 | 26.8 26.6 25.7 19.8 16.6 22.0 |
| C | +51–73% / +35–47% | 0.97 | 27.7 26.6 25.4 19.4 15.6 22.3 | 26.2 25.9 25.3 19.6 16.3 21.3 |

Nhận xét: đổi item chỉ dịch TTK ±1–2 s. TTK 13–30 s (full kit, mục tiêu đứng yên) dài so với chuẩn MOBA → **GAP riêng: thang sát thương/HP tướng** (không sửa trong vòng item theo luật creator).

## OPEN / NOT TESTED
- Nội tại 24 món áp vào combat thật: NOT TESTED (engine). Stat thật trên tướng sau mua: PASS 1 trận bot (quickstring); người chơi NOT TESTED.
- Bán / hoàn 60% / ID trùng legacy (iron_plate, quickstring, keeneye, thornseed, heartforge, oathguard): NOT TESTED engine.
- Bot vs Bot, farm kém/TB/tốt, thua 1–2 mạng, 6 tướng engine: NOT TESTED.

## Áp C (2026-10-09, @lukasai duyệt thử)
Nguyên nhân UP trước khi đổi giá: Giáp Thiết/Nanh Khép/Ấn Tĩnh là ghép 2 basic nhưng **chỉ số = đúng 2 basic, không có nội tại**, lại đắt hơn 70–150g → "phí ghép" không mua được gì. Sửa bằng **tăng chỉ số, giữ giá** (không giảm giá để không kéo sớm mốc completed): Giáp Thiết 24→26 giáp, Nanh Khép 20→24 AD, Ấn Tĩnh 24→28 KP, Ống Tên Gai 180→200 HP. OP: Giáp Minh Ước 240/35/24→200 HP/30 giáp/20 KP; Tâm Lò 350→320 HP; Chuông Mây 270→230 HP; Đăng Hồi Âm 70→60 AP; Kính Song giá 700→800 (giá ghép tăng → Đăng Hồi Âm/Chuông Mây không đổi tổng vì giá completed là tổng). Item có nội tại mạnh (Mắt Sắc đòn thứ 4, Quả Mạch đòn sau skill, khiên Giáp Minh Ước) cần đo nội tại trong engine riêng; giảm stat không chạm tới nội tại.
Mô phỏng sau áp: Giáp Minh Ước eff 1.15→0.97, phys EHP L1 +62–89%→+51–73%; Kính Song 1.21→1.06; Nanh Khép 0.80→0.96; Ấn Tĩnh 0.80→0.93; Giáp Thiết 0.87→0.95. `items-runtime.test` 25 PASS (fixture).
Engine: NOT TESTED (mua/ghép/bán/nội tại/6 tướng).

## 2026-10-09 — Engine check vòng C (bàn đo trong room dev, place main)

Chạy trong engine bằng `scripts/dev-itembench.js` (ears `stats` + `run`): gọi đúng `heroStats()`, `quote()`, `sellPrice()`, `hurt()` và `lib/passives.js` mà Player/Bot dùng. **Không phải trận thật**: chưa có di chuyển, Bot mua đồ hoặc reconnect.

| Kiểm tra | Kết quả engine | Trạng thái |
|---|---|---|
| Catalog đang chạy | `candidate-0.1.0`, 24 món | PASS_HARNESS |
| Giáp Minh Ước stat thật | +200 HP, +30 giáp, +20 MR | PASS_HARNESS (khớp C) |
| Đăng Hồi Âm | +120 HP, +24 MR, +60 AP | PASS_HARNESS |
| Chuông Mây | +230 HP, +36 AP, +2 hồi/s | PASS_HARNESS |
| Kinh Song | +90 HP, +36 AP; giá 800 | PASS_HARNESS |
| Nanh Khép / Ấn Tĩnh / Giáp Thiết | +24 AD / +28 MR / +26 giáp | PASS_HARNESS |
| Tim Lò / Ống Gai | +320 HP +3 hồi / +200 HP +16.5% AS | PASS_HARNESS |
| Ghép Giáp Thiết từ 2 Đồng Văn | phí 70, nguyên liệu tiêu thụ | PASS_HARNESS |
| Thiếu 1 vàng | từ chối `msg.noGold` | PASS_HARNESS |
| Ghép Giáp Minh Ước từ 3 nguyên liệu | phí 200, túi còn 1 món | PASS_HARNESS |
| Ghép Giáp Minh Ước từ 5 basic | phí 390 (tín dụng đệ quy) | PASS_HARNESS |
| Bản thứ 2 Giáp Minh Ước | `msg.maxCopies` | PASS_HARNESS |
| Túi đầy | `msg.bagFull` | PASS_HARNESS |
| Bán 60% | Giáp Minh Ước 960, Kinh Song 480, Giáp Thiết 330… | PASS_HARNESS |
| Nội tại Mắt Tinh (hit 4) | 50,50,50,62,50 | PASS_HARNESS |
| Ống Gai làm chậm + CD | 15% 1s, CD 8s, chặn lần 2 | PASS_HARNESS |
| Quả Mạch sau cast | 68 rồi 50, CD 6s | PASS_HARNESS |
| Lò Thần Ký | 80 rồi 50 | PASS_HARNESS |
| Đăng Hồi Âm tốc chạy | +30%, CD 8s | PASS_HARNESS |
| Chuông Mây hồi kit | ×1.08 | PASS_HARNESS |
| Tim Lò hồi ngoài giao tranh | 0 khi giao tranh, 2/s khi rời | PASS_HARNESS |
| Giáp Minh Ước khiên đồ | khiên vỡ ngay: không kích; sống đủ: 40 (4% maxHP), CD 12s chặn lần 2 | PASS_HARNESS |
| Chết reset bộ đếm | đúng | PASS_HARNESS |
| Mua/bán qua HUD trong trận thật, Bot mua đồ C, reconnect | — | NOT TESTED |
| Balance (EHP/TTK thật) | — | NOT TESTED |

Dọn dẹp: `scripts/screens/match/common.js` (HUD trận cũ một file, không file nào import) đã xoá. Shop trong file đó so vàng với giá đầy đủ, không trừ nguyên liệu. Shop đang chạy (`panels/shop.js`) dùng đúng `quote()` của server. Lấy lại: undo về seq 1704.

> 2026-10-09: các dòng PASS_HARNESS ở trên là harness dev (gọi hàm runtime với state giả lập), không phải trận thật. Mua qua HUD, Bot mua/ghép item C, reconnect + inventory: NOT TESTED.
