# 20 · Gap skill, VFX, mục tiêu và di chuyển (6 tướng slice 1)
Ngày 2026-10-07. Yêu cầu của @lukasai: "lấp gap skill. đọc docs về tướng đã full, chuẩn bị tướng skill VFX, target + move rõ ràng hơn".
Nguồn đối chiếu: 03-danh-sach-tuong.md (chất chơi hiện hành), heroes.yml (kit runtime), scripts/lib/skillfx.js (KIT/ANIM), scripts/hero.js (aim, order, cast).

## 1. Độ phủ VFX hiện tại (đọc trong skillfx.js)
Các thời điểm: cast = lúc vung tay, fly = đạn đang bay, land = lúc phát nổ hoặc chạm đất, hit = trúng một đơn vị.
| Tướng | Đánh thường | Q | RMB | E | R |
|---|---|---|---|---|---|
| Mộc Lẫm | **không có** (chỉ có vệt chém chung) | cast fly hit | land | land | cast land |
| Kha Tàn | **không có** | land, **thiếu cast** | cast land | cast fly hit | cast land |
| Mị Đăng | **không có** (dùng tia chung theo màu đội) | fly hit, **thiếu cast** | cast land | fly hit, **thiếu cast** | cast land |
| Hỏa Tủy | **không có** | land, **thiếu cast** (cột lửa trễ không có báo trước riêng) | fly hit, **thiếu cast** | land, **thiếu cast** | cast land |
| Nham Vũ | **không có** | fly hit, **thiếu cast** | cast fly hit | land | cast fly hit |
| Vân Dao | **không có** | land, **thiếu cast** | fly hit, **thiếu cast** | land | cast land |

Gap lớn nhất: **đánh thường của cả 6 tướng không có hiệu ứng riêng**, trong khi đây là hành động người chơi làm nhiều nhất (LoL và AoV đều cho mỗi tướng đạn và tiếng đánh thường riêng). Ngoài ra còn 9 chỗ thiếu cast, nên lúc vung tay không có gì báo trước cho đối thủ.

## 2. Mục tiêu và di chuyển (đọc trong hero.js)
| Hệ thống | Hiện tại | LoL/AoV | Gap |
|---|---|---|---|
| Rê chuột lên địch | không có gì | viền đỏ quanh địch, con trỏ đổi thành kiếm | **thiếu viền khi rê** |
| Mục tiêu đang đánh | không có gì | vòng đỏ dưới chân mục tiêu | **thiếu vòng mục tiêu** |
| Click di chuyển | 26 hạt sáng nổ 0,35 s | mũi tên xanh co lại tại điểm click | dấu quá nhỏ, mất ngay |
| Click tấn công | 26 hạt đỏ | viền đỏ nháy trên mục tiêu | yếu |
| Ngắm skillshot | hộp mờ dài theo tầm | dải có mũi tên ở đầu | thiếu đầu mũi tên |
| Ngắm chiêu chọn mục tiêu | vòng 1,2 m ở điểm đất | viền sáng trên địch sẽ trúng, đỏ khi ngoài tầm | **không biết chiêu sẽ trúng ai** |
| Ngắm chiêu vùng | đĩa + viền | đĩa + viền, kẹp trong tầm | ổn |

## 3. Việc làm (TODO)
- [~] skillfx.js: thêm `lmb` {swing | fly, hit} cho cả 6 tướng, theo vũ khí và chất liệu của từng tướng (có code: scripts/lib/skillfx.js KIT `lmb`; client NOT RUN)
- [~] skillfx.js: thêm 9 `cast` còn thiếu (lấy sáng và tụ lực tại tay trong lúc vung) (có code: scripts/lib/skillfx.js `cast`; client NOT RUN cho 9 ô này — m30–m32 r47–49 chỉ kiểm cast tự thân `SELF_CAST`)
- [~] hero.js + bot.js: đánh thường gọi skillFx('lmb'), giữ tia/vệt chém chung làm dự phòng (có code: scripts/hero.js, scripts/bot.js `skillFx(…'lmb'…)` + `boltFx` dự phòng; client NOT RUN)
- [x] hero.js: viền đỏ trên địch dưới con trỏ (chỉ máy mình thấy) (14 UX-P1 match23/round39, ca498b2: **PASS có giới hạn**, lính nhỏ; tướng/lính xe NOT RUN)
- [x] hero.js: vòng đỏ dưới chân mục tiêu đang đánh, bám theo mục tiêu (14 UX-P1 match23/round39: **PASS có giới hạn**, `markRing('tgt')`; trụ INCONCLUSIVE)
- [x] hero.js: dấu đích di chuyển rõ ràng (vòng co lại kèm chấm sáng giữ đến khi tới nơi) (14 UX-P1 match23/round39: click đất trống → vòng xanh, đi — PASS, `markRing('go')`)
- [~] hero.js: chiêu chọn mục tiêu sẽ phát sáng địch nó sẽ trúng, vòng tầm đỏ khi không có ai trong tầm (có code: scripts/hero.js `drawMarks`/`drawAim`; client NOT RUN)
- [x] hero.js: skillshot có đầu mũi tên (§4: Codex fef61c6, Mị Đăng Q match26/round42 trên cầu: vòng tầm + vệt + mũi — **PASS có giới hạn**; endpoint/hitbox, mobile, góc địch chưa kiểm)
- [~] Tự test: chụp từng chiêu và đánh thường của 6 tướng, chụp con trỏ trên địch, chụp đích di chuyển (một phần: match23 con trỏ/đích, match26–28 ngắm, m30–m32 cast tự thân; chưa đủ 6 tướng × mọi chiêu + đánh thường; hit trúng lính INCONCLUSIVE m33 r50)

## 4. Đối chiếu biên + hướng chiêu (Savi, 2026-10-08, theo references/gameplay ảnh 3–4 và doc30 §2)
Giữ nguyên mọi số kit (range/width/radius/delay/dash), luật trúng và timing. Chỉ đổi dấu ngắm local của người niệm.

Đối chiếu §2/§3 với code `hero.js` hiện tại:
| Mục §3 | Code hiện có | Client |
|---|---|---|
| Viền đỏ địch dưới con trỏ | `drawMarks` highlight outline | PASS có giới hạn (lính nhỏ, match23) |
| Vòng đỏ dưới mục tiêu đang đánh | `markRing('tgt')` | PASS có giới hạn (match23) |
| Dấu đích di chuyển giữ tới khi tới | `markRing('go')` | PASS (vòng xanh, match23) |
| Chiêu chọn mục tiêu: viền vàng trên địch sẽ trúng, vòng tầm đỏ khi không có ai | `drawMarks` (aimed) + `drawAim` (bad) | NOT RUN |
| Skillshot có đầu mũi | `drawAim` tip `k=arrow` | PASS có giới hạn (match26/round42, xem dưới; trước ghi NOT RUN) |
| lmb/cast VFX | skillfx KIT có `lmb` 6 tướng | ngoài nhóm này |

Lỗi tìm thấy và sửa (2026-10-08):
- **Dấu ngắm chìm dưới cầu.** `drawAim` và `groundPoint` lấy độ cao địa hình; trên cầu giữa map mặt cầu y≈0 còn địa hình −2…−3 m (đọc raycast tại (−10, 6.9), (0, 0), (10, −7)) nên vòng tầm, vệt skillshot và vùng chiêu nằm dưới mặt cầu, không thấy. Sửa: vòng/vệt theo chân tướng, điểm vùng theo `floorY` (giống telegraph đã dùng). `units()` đo 2D nên luật trúng không đổi.
- **Lướt lùi không báo chỗ đáp.** Nham Vũ R (skillshot, `dash.toward: false`, 6 m): thêm vòng nhỏ + vệt mờ phía sau ở chỗ tướng sẽ đáp, chỉ máy người niệm.
- Kiểm bàn: ảnh scene dựng lại cùng plane/texture trên mặt cầu (vòng tầm 9,5 m, vệt 1,4 m + mũi, vùng 2,6 m, dấu đáp lùi 6 m) đọc rõ trên nền gạch. Không phải test trận.

Giữ mở / BLOCKED:
- Telegraph phía địch cho skillshot/target: doc30 dòng 19 và doc25 §82 yêu cầu owner ghi hình thức/phe/thời gian → **BLOCKED**, không tự tạo. Vùng có delay đã có telegraph theo doc21 B3 (giữ nguyên).
- Chiêu `area` tầm 0 và `self`: niệm ngay, không có pha ngắm (giữ nguyên hành vi).
- Mobile: niệm nhanh không có dấu ngắm → thuộc nhóm thao tác mobile.
- Client (Codex, source fef61c6, 2026-10-08) — **PASS có giới hạn**, local người niệm, khi giữ phím:
  - Mị Đăng Q, match26/round42, trên cầu: vòng tầm + vệt + mũi.
  - Hỏa Tủy Q, match27/round43, trên cầu: vòng tầm + vùng/biên.
  - Nham Vũ R, match28/round44, **fixture dev**: cộng xp lên L6 một lần (không phải lên cấp tự nhiên), không bot/input, không đổi source/kit/balance. Thấy vệt phía trước, vòng đáp nhỏ + vệt mờ phía sau. Sau đó Làm lại về L1/502HP/300mana/R khóa (round45), Kết thúc → lobby/Sân Tập/host lukasai/0bot. Fixture không chạy lại.
  - Nhả phím: dấu ngắm tắt, cooldown hiện.
  - Chưa kiểm (giữ mở): endpoint 6 m/range/hitbox, đổi hướng liên tục, cancel, mobile, góc nhìn địch.
  - Evidence: report + ảnh local `Colinhchienthan/artifacts/qa/2026-10-08/bridge-aim-report.md` (chưa push, Savi chưa đọc trực tiếp).
- Telegraph phía địch: giữ **BLOCKED** chờ owner contract; không thêm gameplay.
