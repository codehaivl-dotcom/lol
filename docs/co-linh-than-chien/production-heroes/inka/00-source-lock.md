# 00 · Source Lock — #19 Inka (Mực Thư Pháp Tuyến Tính)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#19`
- `runtimeId`: `inka`
- `displayName`: `Inka` (Danh hiệu: `Mực Thư Pháp Tuyến Tính` / English: `Inka - The Linear Calligraphy Mage`)
- `productionWave`: `Wave 4 (Specialist & Advanced Control Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 7, §4 Bảng Wave 4 & §6 Kế hoạch triển khai | Cấp mã nghiên cứu `#19`, runtime `inka`, vai trò Pháp Sư (Mage / Geometric Zone Controller). Đưa vào nhóm trọng điểm Wave 4 về kiểm soát địa hình tuyến tính bằng cọ thư pháp Cổ Linh. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | §2 Mục 11 & §3 Nhóm 2 Mục 11 | Phán quyết độc lập: Inka giữ độc quyền vị trí "Pháp sư kiểm soát địa hình tuyến tính bằng tư duy hình học duy nhất" (Linear Calligraphy Zone Controller). Khóa cơ chế vẽ vệt mực thư pháp tồn tại trên sàn, tăng tốc đồng minh, làm chậm địch và kích nổ giao điểm. Không trùng lặp với Hwei hay Splatoon. |
| [96 — Top 15 Concept Bibles](../../96-roster-v5-top15-concept-bibles.md) | Mục 11 (Mực Mù / Inka #19) | Khóa câu pick-up nền tảng: *"Tôi pick Inka vì tôi được vẽ mực lên mặt đất Cổ Linh, nối các vệt mực thành mạng lưới hiểm hóc để kích nổ và phong tỏa sàn đấu."* Khóa hình tượng Học giả Cổ Linh thanh tú mang áo dài phong cách thư pháp Á Đông, cọ khổng lồ bằng gỗ hóa thạch ngậm mực phát quang. |
| [94 — Fantasy & Marketing Audit](../../94-roster-v5-audit-player-fantasy-marketing.md) | Đánh giá Concept Thư Pháp Sư | Xác nhận bản sắc mỹ thuật Á Đông độc bản: kết hợp nghệ thuật thủy mặc truyền thống với luồng năng lượng Cổ Linh Thần Chiến. |
| [Candidate YAML](../../../../tools/sim/candidates/inka.yml) | `tools/sim/candidates/inka.yml` | Chỉ số gốc (HP: 615, Mana: 360, Speed: 6.15 m/s), nội tại `ink_path` (thời lượng 4.0s, +20% MS đồng minh, -25% MS địch), bộ chiêu Q/W/E/R theo chuẩn Input 91. |
| [Engine Toy Test](../../../../tools/test/wave4-gameplay-toys.test.mjs) | `Toy 1: Inka ink path zone creation & directional speed modulation` | Kiểm chứng thành công việc rải vệt mực `ink_path` qua chiêu Q, gia tốc đồng minh `allyBaseMs -> higher`, làm chậm đối thủ `foeBaseMs -> lower`, và hoàn trả tốc độ chuẩn xác sau khi hết 4.0s. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thái Học Giả Thư Pháp Á Đông Cổ Sinh:**
   - Inka là học giả thanh tú, khoác tà áo dài thư pháp xẻ tà loang lổ vết mực đen tuyền và bột vàng kim Cổ Linh.
   - Mang theo cây **Đại Thư Bút (Ancient Colinh Calligraphy Brush)** bằng gỗ hóa thạch dài 1.8m, ngòi cọ phát quang lân tinh xanh đen.
2. **Cơ chế cốt lõi — Vệt Mực Thư Pháp Tuyến Tính (Ink Path):**
   - Mọi vệt mực vẽ ra tồn tại trên sàn đấu đúng **4.0 giây**.
   - Đồng minh đi trên mực nhận **+20% Tốc độ di chuyển** (`inkAllySpeed: 0.20`).
   - Kẻ địch dẫm lên vệt mực bị **làm chậm 25%** (`inkEnemySlow: 0.25`).
   - Tối đa 2 vệt mực đồng thời trên sàn đấu để bảo vệ độ trong trẻo thị giác (Visual Clarity).
3. **Kích Nổ Giao Điểm & Mạng Lưới (Ink Grid Detonation):**
   - Kỹ năng E kích nổ các đường mực và giao điểm mực: Gây sát thương phép và trói chân 1.0s kẻ địch đứng trên vệt mực.
4. **Chuẩn hóa Input Contract (Doc 91):**
   - Đánh thường tách riêng (`basic_attack` tầm 6.0m).
   - Q (Thư Pháp Tuyến Kích - vung cọ vẽ vệt mực thẳng gây sát thương).
   - W (Mặc Thủy Hộ Thể - vòng mực bảo vệ bản thân và tạo khiên, legacy `rmb` đã ánh xạ sang W).
   - E (Giao Điểm Kích Nổ - kích nổ vệt mực và trói chân).
   - R (Thiên Địa Mặc Họa - đại đồ trận thư pháp khổng lồ chia cắt sàn đấu).
   - D là Universal Dash chung toàn game. Tuyệt đối không dùng RMB hay D làm nút riêng của tướng.
5. **Ranh giới với các pháp sư khác:**
   - Khác với Pavo (#35 - Anti-Dive Gaze Controller dựa trên hướng mặt), Inka thuần túy kiểm soát không gian qua hình học đường thẳng và mạng lưới giao điểm trên mặt đất.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xác lập concept tại Tài liệu 96 & bảo vệ thành công tại Tài liệu 100 §2 Mục 11.
- **2026-10-12:** Đưa vào Master Plan Wave 4 tại Tài liệu 104; nghiệm thu thành công Toy 1 trong `tools/test/wave4-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Combat Designer ký duyệt canon lock.
