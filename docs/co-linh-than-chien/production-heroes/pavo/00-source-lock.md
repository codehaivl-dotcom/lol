# 00 · Source Lock — #35 Pavo (Khổng Tước Quạt Mắt Dọa Sợ)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#35`
- `runtimeId`: `pavo`
- `displayName`: `Pavo` (Danh hiệu: `Khổng Tước Quạt Mắt Dọa Sợ` / English: `Pavo - The Anti-Dive Gaze Controller`)
- `productionWave`: `Wave 4 (Specialist & Advanced Control Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 14, §4 Bảng Wave 4 & §6 Kế hoạch triển khai | Cấp mã nghiên cứu `#35`, runtime `pavo`, vai trò Pháp Sư Chống Lao Vào (Mage / Anti-Dive Gaze Controller). Bố trí vào Wave 4 chuyên trách cơ chế khống chế hướng nhìn mô hình độc bản. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | §2 Mục 14 & §3 Mục 14 | Phán quyết độc lập: Pavo giữ vị trí "Pháp sư khắc chế các đội hình lao thẳng mặt (Anti-Dive Gaze Mage) dựa trên hướng nhìn của mô hình". Kẻ địch đối diện đang nhìn vào Pavo bị hoảng sợ chạy lùi (Fear 1.2s); kẻ địch quay lưng né được hoàn toàn. Khóa Input Spike quay đầu 180°. |
| [96 — Top 15 Concept Bibles](../../96-roster-v5-top15-concept-bibles.md) | Mục 14 (Chim Công / Pavo #35) | Khóa câu pick-up nền tảng: *"Tôi pick Pavo vì tôi xòe quạt đuôi cơ khí đầy những con mắt thôi miên, ép bất kỳ kẻ địch nào dám nhìn thẳng vào tôi phải kinh hãi quay đầu tháo chạy."* Khóa hình ảnh Khổng tước hình nhân quý phái, quạt đuôi cơ khí đồng cổ lộng lẫy giương hàng chục con mắt quang học thôi miên. |
| [94 — Fantasy & Marketing Audit](../../94-roster-v5-audit-player-fantasy-marketing.md) | Đánh giá Concept Khổng Tước | Đánh giá cao cơ chế Facing Vector Gaze Control: tạo ra tâm lý đối kháng đỉnh cao trong các pha áp sát của sát thủ. |
| [Candidate YAML](../../../../tools/sim/candidates/pavo.yml) | `tools/sim/candidates/pavo.yml` | Chỉ số gốc (HP: 620, Mana: 350, Speed: 6.2 m/s), nội tại `peacock_gaze` (bán kính 5.5m, dọa sợ 1.2s), bộ chiêu Q/W/E/R theo chuẩn Input 91. |
| [Engine Toy Test](../../../../tools/test/wave4-gameplay-toys.test.mjs) | `Toy 4: Pavo peacock gaze directional fear` | Kiểm chứng thành công việc mở quạt đuôi qua W, áp dụng trạng thái dọa sợ `charmUntil > W.t` lên mục tiêu đối diện và ghi nhận `proc("passive:peacock_fear")`. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thái Khổng Tước Quý Phái & Quạt Đuôi Cơ Khí:**
   - Nhân vật mang phong thái quý tộc hoàng gia Cổ Linh thanh thoát, khoác lễ phục gấm thêu lộng lẫy màu xanh lông công óng ánh và vàng hoàng kim.
   - Phía sau lưng là bộ **Quạt Đuôi Cơ Khí Khổng Tước (Biomechanical Peacock Tail-Fan)** ghép từ hàng trăm phiến lông vũ kim loại mạ vàng, gắn các thấu kính quang học "mắt công" có thể đồng loạt mở trừng mắt phát sáng.
2. **Cơ chế cốt lõi — Quạt Mắt Dọa Sợ Theo Hướng Nhìn (Facing Vector Gaze Control):**
   - Khi Pavo xòe quạt đuôi (W):
     - Kẻ địch trong bán kính **5.5m** VÀ **đang quay mặt về phía Pavo** ($\vec{F}_{\text{target}} \cdot \vec{V}_{\text{to\_pavo}} > 0.707$): Lập tức dính hiệu ứng **Hoảng Sợ (Fear / Flee) trong 1.2 giây**, mất kiểm soát và tự động quay đầu tháo chạy.
     - Kẻ địch **đang quay lưng lại Pavo**: **Miễn nhiễm hoàn toàn** hiệu ứng Fear, chỉ bị làm chậm nhẹ bởi luồng gió quạt.
3. **Counterplay Minh Bạch (Thao tác quay lưng 180°):**
   - Trước khi giương mắt dọa sợ, quạt đuôi phát ra âm thanh cơ khí cảnh báo đanh thép, cho phép nạn nhân có $0.2\text{s}$ phản xạ click chuột quay mặt đi hướng khác để hóa giải.
4. **Chuẩn hóa Input Contract (Doc 91):**
   - Đánh thường tách riêng (`basic_attack` tầm 6.2m).
   - Q (Kim Vũ Tiễn - bắn chùm lông vũ hình quạt 3 tia).
   - W (Khai Mạc Khổng Tước - xòe quạt đuôi dọa sợ và nhận khiên, legacy `rmb` đã ánh xạ sang W).
   - E (Huyễn Ảnh Quang Tráo - cầu gương làm chậm diện rộng).
   - R (Vạn Nhãn Thôi Miên - đại quang thôi miên ép toàn đội địch tháo chạy).
   - D là Universal Dash chung toàn game. Tuyệt đối không dùng RMB hay D làm nút riêng của tướng.
5. **Ranh giới với Inka (#19):**
   - Inka kiểm soát địa hình tuyến tính bằng các đường vẽ tĩnh trên sàn đấu; trong khi Pavo kiểm soát không gian động dựa trên **véc-tơ hướng nhìn đối mặt** của tướng địch.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xác lập concept tại Tài liệu 96 & bảo vệ thành công tại Tài liệu 100 §2 Mục 14.
- **2026-10-12:** Đưa vào Master Plan Wave 4 tại Tài liệu 104; kiểm chứng thành công trong `tools/test/wave4-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
