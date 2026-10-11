# NỢ TỒN · Cổ Linh Thần Chiến (11-10-2026)

Đọc nhanh. Chi tiết từng dòng: `docs/co-linh-than-chien/57-no-ton-dong.md`.

## Tổng quan

| Hạng mục | Đã có | Còn nợ |
|---|---|---|
| Tướng | 8 / 27 chơi được | 1 đang làm (Bách Diện), **18 chưa làm** |
| Map 1v1 Mạch Giữa | chạy được, vẫn là map demo cũ | polish toàn bộ theo ảnh ref R2 |
| Map 5v5 | 0 / 2 | cả 2 map |
| Boss | thiết kế (doc 35, 36, 37) | model 3D, rig, số liệu chờ hội đồng |
| Hệ thống | trận, sảnh, phòng, item 24 món, bot | tải trang, reconnect, regression 5v5 |

## 1. Tướng (lớn nhất)

**Chơi được (8):** Mộc Lẫm, Kha Tàn, Mị Đăng, Hỏa Tủy, Nham Vũ, Vân Dao, Hạo Nhật, Hương Mai.

**Đang làm (1):** Bách Diện: kit đã cân trong Lab (49,6%), R đã có VFX + SFX. Wisp đang đưa vào trận.

**Chưa làm (18):** Tĩnh Lôi, Lam Nghi, Lộc Thảo, Ngư Đăng, Cốt Bện, Sấm Kha, Dực Nham, Nanh Núi, Kính Ngôn, Mặc Liên, Tầm Vũ, Hàn Chi, Tam Dấu, Thạch Hộ, Trắc Nham, Sắc Nhiên, Sa Tẫn, Vân Ấn.

Mỗi tướng đi đủ: thiết kế + tạo hình → model + rig → clip từng chiêu → VFX/SFX → kit trong Lab → vào trận → R đạt chuẩn doc 79.

Nợ của 8 tướng đã có:
- R chưa đạt chuẩn Ultimate (doc 79): đang rà, bảng thiếu sẽ vào doc 78.
- 6 trận 1v1 tự chơi từ sảnh tới kết quả, ghi lỗi chiêu/đánh/bot.
- Tay cầm vũ khí + động tác trên bục sảnh từng tướng.
- Vân Dao E chắn đạn trong trận.

## 2. Map 1v1 Mạch Giữa (vẫn là map demo)

Theo ảnh ref R2 (doc 38):
- Bờ chiến: cỏ rêu, đá lát vỡ, lau ở mép.
- Lan can đá + cột đèn pha lê hai màu dọc hành lang.
- Cầu hai vòm đá + lan can.
- Thác + sương ở mép vách.
- Fountain Tâm Mạch quá sáng.
- Bụi: thấy tướng mình trong bụi, cue trụ.
- Walk 5 khung góc chơi, đối chiếu R2.
- Tải trận 562 KB → dưới 500 KB. Đo xong: sắp xếp cell chỉ bớt 38 KB; ~400 KB là script. Cần tách script trận ra tải sau (import()), lô riêng.

## 3. Map 5v5 (chưa có)

- **Map 1 · Cửu Mạch, ba đường:** chờ chốt cổng §7 doc 27 + geometry manifest.
  - B · [doc 80](docs/co-linh-than-chien/80-cuu-mach-gate.md): báo cáo G1–G6 + 5 câu creator cần trả lời; manifest nháp `docs/co-linh-than-chien/data/cuu-mach-manifest.yml` (chỉ số doc 07, còn lại TBD).
- **Map 2 · Hải Tâm:** concept đã duyệt 11-10.
  - B · [doc 81](docs/co-linh-than-chien/81-map-hai-tam.md): concept + topology đối xứng + palette; không thuỷ triều, chưa 3D.

## 4. Hệ thống

- Sảnh tải 734 KB → dưới 450 KB.
- Reconnect còn: park-exploit, tab sảnh cũ, ẩn thân lúc chờ.
- Regression 5v5: 10 chỗ spawn, trùng tướng cùng đội, quyền chủ phòng với bot.
- Cảnh báo runtime, frame/tick trận.
- HUD lệch ở sảnh và trận (1828×860, 1366×768).

## 5. Sau này

- Boss Thuồng Luồng 3D + rig 7 clip.
  - E · [doc 82](docs/co-linh-than-chien/82-spec-asset-thuong-luong.md): spec asset (19k tam giác, 16 xương, 7+Roar clip, VFX/SFX còn thiếu); số TẠM.
- Sảnh desktop theo ảnh mẫu.
- Phim lore.

## KẾ HOẠCH 5 LUỒNG (creator chốt 11-10, thay thứ tự cũ)

Mục tiêu số 1: **27 tướng PRODUCTION_PLAYABLE**. Chỉ đếm tướng vào trận thật (model, rig, clip, skill, VFX, SFX, R đạt doc 79). Concept/PASS_MODEL không tính.

| Luồng | Việc | Trạng thái |
|---|---|---|
| A · Hero Factory | Bách Diện vào trận → lô 3 tướng → đủ 27. Doc 76 + Basic Attack + doc 79 từ đầu. Lab: baseline → playable → nghiệm thu engine → tune tiếp, không kéo vô hạn | Bách Diện: wisp đang làm. Audit 18 tướng (tạo hình + kit) đang chạy → bảng duyệt tạo hình 1 lần → lô 1 |
| B · Map | 1v1 polish theo R2 (bờ/lan can → cầu/thác → fountain/bụi, lần lượt để không đè scene). Cửu Mạch: báo cáo gate §7 doc 27 + manifest. Hải Tâm: chỉ tài liệu | đang chạy |
| C · Combat Quality | Sửa R theo doc 78 R3, lô 2–3 tướng, không chặn A | lô 1 (Hạo Nhật, Mị Đăng, Mộc Lẫm) đang chạy |
| D · Core Stability | Bug mất trận/quyền điều khiển/trùng body/exploit trước. Tải trận ≤500 KB, sảnh ≤450 KB theo đợt | tách script trận chạy sau lô C |
| E · Boss & Lore | Spec asset Thuồng Luồng; phim lore preproduction | chưa lấy nguồn của A/B |

Chỉ xin duyệt khi đổi identity, kit, gameplay geometry, balance lớn, hướng art chủ đạo.

**Map 5v5 số 2 · Hải Tâm, Thành Phố Ký Ức Chìm**: 3 lane trên thành phố cổ giữa biển, cầu đá, nền đường nổi, tháp ký ức phát sáng. Chỉ concept + topology + tài liệu. Chưa 3D tới khi Cửu Mạch có manifest + qua cổng. Không thuỷ triều đổi đường.
