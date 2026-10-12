# 00 · Source Lock — #15 Aero (Phi Công Cổ Khí)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#15`
- `runtimeId`: `aero`
- `displayName`: `Aero` (Tiếng Anh: `Aero - Ancient Aviator Bombardier`)
- `productionWave`: `Wave 3 (Linear Zone Marksman & Aerial Strafe)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../104-full-approved-roster-production-master-plan.md) | §1 Mục 1 & §4 Wave 3 | Khóa chính thức ID `#15`, runtime `aero`, vai trò Xạ thủ (Marksman). Core toy: Phi công rải thảm bom plasma tuyến tính chia cắt giao tranh. Đưa vào Wave 3 dây chuyền sản xuất. |
| [100 — Rivalry Audit](../100-roster-v5-round4-selection-rivalry-audit.md) | §2 Mục 3 (Phi Công Cổ Khí / Aero #15) | Xác nhận "Strong Keep" (Top 10 hạt nhân độc bản). Khác biệt cốt lõi: Bỏ quán tính trôi dạt của phi cơ nhưng **giữ trọn vẹn Core Toy: Oanh Tạc Rải Thảm Tuyến Tính (Linear Strafing Bomb Run)**. Aero luôn di chuyển liên tục (+15% MS), xả đạn và thả thảm bom thành vệt dọc theo hướng di chuyển, giải tỏa tình trạng toàn bộ xạ thủ là người đi bộ. |
| [102 — Beginner Shortlist](../102-roster-v5-beginner-concept-shortlist.md) | §1 & §2 (Concept Lịch Sử Đã Thay Thế) | Xác nhận `#15-OLD Brak` đã bị loại bỏ/thay thế bằng `Aero #15`; giữ vững bản sắc phi công lái phi cơ cổ khí một chỗ ngồi bằng đồng thau và đá nhẹ. |
| [Candidate YAML](../../../tools/sim/candidates/aero.yml) | `tools/sim/candidates/aero.yml` | Thông số nền tảng, passive `carpet_bomb_strafe` (`strafeSpeedBonus: 0.15`, `plasmaDuration: 3.0`, `plasmaDpsAd: 0.30`), Q oanh tạc tuyến tính, W (rmb) tăng áp lượn vòng khiên & tốc độ, E pháo sáng phản lực đẩy lùi, R đại oanh tạc chiến dịch bão bom plasma $10.0\text{m}$. |
| [Engine Toy Test](../../../tools/test/wave3-gameplay-toys.test.mjs) | `test("Toy 7: Aero continuous strafe speed bonus & plasma strafe zone DoT")` | Kiểm chứng thành công tốc độ bay nội tại tăng $+15\%$ MS, tung Q rải vệt dung nham plasma `plasma_strafe` tồn tại $3.0\text{s}$ gây sát thương DoT theo thời gian. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Phương tiện & Silhouette — Cỗ Phi Cơ Cổ Khí Bay Lượn Một Chỗ Ngồi:** Aero không phải xạ thủ đi bộ bằng hai chân! Aero ngồi trong buồng lái lộ diện của một cỗ phi cơ cơ khí cổ đại bằng đồng thau và đá nhẹ (`ancient_aircraft`), cánh kép vát ngược, tua-bin năng lượng Cổ Linh xoay tròn, bay lượn lơ lửng sát mặt đất.
2. **Vũ khí chính — Súng Đôi Plasma Cổ Linh:** Hai họng súng năng lượng gắn hai bên mạn phi cơ (`dual_plasma_cannons`), bắn loạt xung kích đạn đôi plasma tầm xa ($6.2\text{m}$).
3. **Cơ chế Cốt Lõi — Oanh Tạc Rải Thảm Tuyến Tính (Linear Strafing Bomb Run):** Luôn duy trì đà bay di chuyển liên tục nhận $+15\%$ Tốc độ di chuyển (`strafeSpeedBonus: 0.15`). Khi lướt bay tung Q, Aero xả vệt thảm bom plasma dài $7.5\text{m}$ tồn tại trong $3.0\text{s}$, thiêu đốt mọi kẻ địch đứng trên vệt với $30\%$ AD sát thương mỗi giây (`plasmaDpsAd: 0.30`).
4. **Tư duy chiến thuật "Vẽ đường bay chia cắt giao tranh":** Không đứng im bắn từng phát như xạ thủ thông thường; người chơi Aero phải liên tục vạch góc lướt bay để chia cắt đội hình địch, cô lập tiền tuyến với hậu phương đối phương.
5. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; kỹ năng Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng LMB/RMB làm tên chiêu thức trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100), định hình xạ thủ phi cơ rải thảm bom độc nhất của Roster V5.
- **2026-10-11:** Phê duyệt thay thế Brak cũ `#15-OLD` bằng Aero `#15` trong Tài liệu 102.
- **2026-10-12:** Đưa vào Master Plan Wave 3 (Tài liệu 104); kiểm chứng thành công trên simulator engine trong `wave3-gameplay-toys.test.mjs` (Toy 7).
- **Thẩm quyền:** Lead Game Designer & Technical Combat Designer đã ký duyệt canon lock.
