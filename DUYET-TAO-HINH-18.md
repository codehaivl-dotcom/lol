# DUYỆT TẠO HÌNH · 18 tướng (11-10-2026)

**Trạng thái: PROPOSAL, CHƯA DUYỆT.** Hồ sơ từng tướng (chiêu, R 5 pha, hình học, rủi ro): [doc 85](docs/co-linh-than-chien/85-de-xuat-18-tuong.md).

Bạn duyệt một lần. Nguồn: `docs/co-linh-than-chien/audit-18/a.md`, `b.md`, `c.md`. Vai lấy từ `role` trong `tools/sim/candidates/`.
Số Lab là PASS_MODEL trên kit cũ, chưa tune. Kit sẽ viết lại cho khớp hình rồi chạy Lab lại.

## Kết luận audit

- **Tạo hình:** 18/18 drift. Kit cũ viết cho tướng-người. Mỗi tướng đã có 1 hình đề xuất + 1 dự phòng từ doc 74, không trùng nhau, không trùng 9 tướng đang có. Đã sửa: 048 trùng ở Dực Nham/Tầm Vũ → **006 / 099**; Lộc Thảo 020 (chặn bởi Hỏa Tùy) → **048**. Kiểm: `python3 tools/audit/looks18_dupcheck.py` → PASS.
- **Skill:** 17/18 phải viết lại 1–3 chiêu. Mặc Liên chỉ đổi chất liệu (mực → sơn mài).
- **R theo doc 79:** chỉ ~7 đạt về ý. 11 R phải làm lại (một nhịp, thiếu signature, hoặc là buff tự thân).
- **Hình học (doc 76):** 7 chỗ Lab đang mô hình sai (nón/quạt/đường thành vòng tròn).
- **Stat:** 4 cờ đỏ One-Combo (Tĩnh Lôi, Tầm Vũ, Trắc Nham, Vân Ấn). 2 nội tại reset hồi chiêu 8 lần/combo (Ngư Đăng, Thạch Hộ). OP đội: Hàn Chi 66%. UP: Dực Nham, Nanh Núi, Kính Ngôn, Lam Nghi, Sắc Nhiên (duel; Support/Tank xét theo đội).
- **Trùng ý tưởng:** Kính Ngôn dùng gương giống Bách Diện → đổi thành Đèn Kéo Quân.

## Bảng duyệt

| # | Tướng | Vai | Tạo hình đề xuất | Dự phòng | Chiêu viết lại | R | Lab | Việc phải sửa |
|---|---|---|---|---|---|---|---|---|
| 1 | Tĩnh Lôi | Đấu sĩ dồn | 002 Người Sấm | 038 | 2 | làm lại | ĐỎ combo, duel yếu | burst xuống, duel lên |
| 2 | Lam Nghi | Hỗ trợ khống chế | 034 Hươu Sao Gạc Đóm | 019 | 1 (Q → quạt) | đạt ý | yếu duel | mô hình Q đúng quạt |
| 3 | Lộc Thảo | Xạ thủ vùng | 030 Bọ Cạp Đá Ong | 048 | 2 | làm lại | nghi yếu | rig 8 chân |
| 4 | Ngư Đăng | Đỡ đòn che chở | 025 Gấu Ngựa Đeo Chuông | 005 | 2 | đạt ý | ĐỎ reset | sửa nội tại trước |
| 5 | Cốt Bện | Đỡ đòn càn | 008 Người Bùn Ruộng | 031 | 2 | đạt ý | cân | RMB nón |
| 6 | Sấm Kha | Đấu sĩ mở giao tranh | 039 Tê Giác Một Sừng | 017 | 2 | thêm vách | cân | RMB quạt 2 đạn |
| 7 | Dực Nham | Xạ thủ cơ động | 053 Người Giấy Dó | 006 | 1 | cần signature | yếu | R đàn chim giấy |
| 8 | Nanh Núi | Đỡ đòn phản công | 069 Cối Xay Thóc | 064 | 2 | motif quen | yếu muộn | Q nón |
| 9 | Kính Ngôn | Hỗ trợ phép | 066 Đèn Kéo Quân | 063 | 3 | làm lại | yếu đội | bỏ gương (trùng Bách Diện) |
| 10 | Mặc Liên | Pháp sư dọn giao tranh | 052 Người Sơn Mài | 042 | 0 | đạt | cân | Q quạt 3 đạn |
| 11 | Tầm Vũ | Xạ thủ tầm xa | 043 Tre Đằng Ngà | 099 | 1 | đạt | ĐỎ, 5v5 61% | burst xuống |
| 12 | Hàn Chi | Pháp sư khống chế | 061 Đồng Hồ Nước Đóng Băng | 055 | 1 | đạt | mạnh 5v5 66% | E nón |
| 13 | Tam Dấu | Hỗ trợ khống chế | 085 Sứa Chuông | 074 | 2 | thiếu signature | yếu (Support) | rig xúc tu |
| 14 | Thạch Hộ | Đỡ đòn bảo kê | 082 Cá Ông Nam Hải | 077 | 2 | làm lại | ĐỎ reset | sửa nội tại |
| 15 | Trắc Nham | Pháp sư khống chế | 087 Nhện Dệt Thổ Cẩm | 089 | 2 | cần đỉnh | ĐỎ combo | R/RMB là đường |
| 16 | Sắc Nhiên | Pháp sư dồn | 084 Mực Ống Lân Quang | 073 | 2 | gần đạt | yếu duel | rig xúc tu |
| 17 | Sa Tẫn | Hỗ trợ hồi | 078 Người Mộng | 072 | 2 | làm lại | WARN | trùng Lillia |
| 18 | Vân Ấn | Đấu sĩ dồn | 096 Người Một Chân | 083 | 3 | làm lại | ĐỎ, duel 73,6% | Q sai loại |

## Lô 1 đề xuất (ít rủi ro nhất, mở ngay khi duyệt)

**Sấm Kha (Tê Giác) · Cốt Bện (Người Bùn) · Mặc Liên (Người Sơn Mài)**: cả ba Lab cân, ít chiêu phải viết lại.
Lô 2: Lam Nghi, Dực Nham, Hàn Chi. Lô có cờ đỏ (Tĩnh Lôi, Tầm Vũ, Ngư Đăng, Thạch Hộ, Trắc Nham, Vân Ấn) đi sau, sửa nội tại/burst trong lúc viết kit mới.

## Cần bạn quyết

1. Duyệt cột tạo hình (hoặc đổi từng tướng sang dự phòng).
2. Lộc Thảo: bọ cạp 030 (rig 8 chân, mất chủ đề rễ) hay 048 Hoa Gạo (giữ thực vật)?
3. Nhận 4 rig lạ (8 chân ×2, xúc tu ×2, một chân, nằm bay)? Mỗi loại cần spike rig trước.
4. Kính Ngôn R "chiếu lại chiêu cuối địch": tốn sản xuất nhất; nhận hay đơn giản hóa?

## Bạn trả lời

- "duyệt hết" → dùng cột đề xuất.
- Hoặc ghi số tướng + "dự phòng" / số look khác.
