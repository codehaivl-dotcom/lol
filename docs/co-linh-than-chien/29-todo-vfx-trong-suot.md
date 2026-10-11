# TODO — VFX trong suốt (pass 2, 2026-10-07)

Phản hồi: "vẫn hơi đặc. Chưa trong suốt hiệu ứng" (@lukasai). Pass 1 (GLASS add .55 / soft .65) chưa đủ.

Phạm vi: chỉ VFX. Không đổi cơ chế skill, chỉ số, animation, HUD, map.

- [x] Hạ GLASS: alpha phát sáng .55→.3, khói .65→.4, hdr .6→.42, số hạt burst .75→.5
- [x] Mới: giảm `rate=` và vệt đuôi `.lives(N)` của hạt phát sáng (đây là chỗ cộng dồn thành đặc)
- [x] Mới: ánh sáng skill (LK) giảm ~30%
- [x] Vòng/ô dưới đất: opacity + emissive giảm ~40%
- [x] Kiểm: transform mẫu Hỏa Tủy E / Mộc Lẫm R, parse không lỗi
- [x] Kiểm hình: chụp effect trong scene (helper, không phải màn hình creator)
- [~] Audit sau khi làm, ghi kết quả dưới đây (2026-10-08: bảng 30 ô trên helper, client NOT RUN — xem doc 24 Đợt 3)

## Audit
- GLASS = { add .3, soft .4, hdr .42, count .5, rate .5, wave .4, light .7, ground .6 } — một núm cho cả 6 tướng (scripts/lib/skillfx.js).
- Hạt rắn (chip, droplet alpha, leaf, petal alpha) giữ nguyên.
- Emit Hỏa Tủy E + Mộc Lẫm R trong dev room: chạy ok. Ảnh camera chụp trễ nên chỉ bắt đuôi effect: vòng đất mờ, hạt thưa. Chưa phải xác nhận trên màn hình creator.
- **2026-10-08 (wisp QA, helper CPU, client NOT RUN):** bench 6 tướng × 6 slot ở đường giữa, camera trận. 0/36 rơi hiệu ứng mặc định. Quá chói: Hỏa Tủy LMB + R (lõi cầu lửa trắng). Che thân: Vân Dao R (vòm phủ thân). Quá mờ/khó bắt: Mộc LMB, Kha LMB/Q, Nham LMB, Vân RMB/E/passive, Hỏa passive. Bảng đủ + ảnh /cdn/ ở doc 24 Đợt 3.
- **Mộc Lẫm W (QA m34) đã sửa trong skillfx.js:** veil land alpha (không HDR/add), ít/nhỏ hơn; flash 6/4/.4 → 3/3/.3; R flash 60/12/.5 → 30/10/.4. Helper sau sửa: không khối trắng (`/cdn/value.cc03d68b79af44fe6c83082934ffb9b6b8610fcc14c94bcfaee3944fb4a60583.jpeg`). Creator cần nghiệm thu trên client.
- Ghi nhận: lớp “hình chính” (skillfx dòng ~462) vẫn vẽ vòng/dải đất cho area/skillshot — là vòng ngắn (<0,5 s) đã có, không thêm vệt đất mới trong đợt này.
- Còn chờ: creator nghiệm thu. Nếu vẫn đặc → hạ tiếp add/hdr, không cần sửa từng tướng.

## Gate VFX cho 21 tướng candidate

Giá trị `GLASS` và pass 3 ở trên là chuẩn trình bày chung đã duyệt; chúng không phải phê duyệt VFX riêng theo hero/skill và không cấp quyền bật tướng. Trước khi tạo VFX production cho candidate:

- Dùng kit Cổ Linh mới trong `scripts/lib/data/heroes.yml` sau owner review/mô phỏng; không lấy số, shape, event, màu hoặc behavior từ legacy game làm đích. Đối chiếu silhouette/vũ khí với doc 03.
- Điền từng slot áp dụng theo manifest/acceptance ở doc 25 và checklist A–J ở doc 23: trigger thật, origin/socket, shape, phe nhìn thấy, telegraph đã được duyệt, lifecycle/cleanup, asset receipt và capture. Không suy player-visible tell từ bot aim metadata, animation slug hay prototype.
- Thiếu kit field, gameplay event, visibility/telegraph decision, socket/rig hoặc cleanup contract thì giữ `BLOCKED`; VFX prototype, helper screenshot và hiệu ứng trong lobby không phải bằng chứng combat PASS.
- Giữ activation `OFF` cho mọi candidate tới khi creator duyệt riêng; VFX approval không tự mở roster hoặc gameplay.

## Pass 3 (2026-10-07) — "vẫn hơi đậm, cứng, quá nắn nót, quá vuông, quá tam giác"
- [x] Vòng/ô/vệt dưới đất: bỏ ring/circle/box hình học + viền đen. Thay bằng plane mang `scripts/tex-skillmark.js?k=ring|disc|strip`: viền mềm, lệch nhẹ, đứt mờ, xoay ngẫu nhiên mỗi lần cast.
- [x] Mảnh tam giác: `sprite(shard,add)` → ember vệt dài; `sprite(shard,alpha)` → chip (trong glass pass, mọi tướng).
- [x] Slash: mặc định noise forward, glow light, alpha thân .15–.35 (trong suốt, tan dần).
- [x] GLASS: add .24, soft .34, hdr .36.
- Kiểm: chụp 3 dấu đất bằng look object (helper CPU): vòng và vệt mềm, đọc được tầm. Chưa chụp trong trận, chưa trên màn hình creator.
- Creator: "passs" (2026-10-07) sau pass 3 + vòng ngắm mềm + camera 17 m.
