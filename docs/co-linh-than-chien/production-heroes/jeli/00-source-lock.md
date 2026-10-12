# 00 · Source Lock — #34 Jeli (Sóng Chuông Hộ Vệ & Hồi Phục)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#34`
- `runtimeId`: `jeli`
- `displayName`: `Jeli` (Danh hiệu: `Sóng Chuông Hộ Vệ & Hồi Phục` / English: `Jeli - The Chime Bell Guardian`)
- `productionWave`: `Wave 1 (Vertical Slice / Beginner Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../104-full-approved-roster-production-master-plan.md) | §1 Mục 13, §4 Bảng Wave 1 & §6 Kế hoạch triển khai | Cấp mã nghiên cứu `#34`, runtime `jeli`, vai trò Hỗ Trợ (Support / Enchanter). Điều chuyển chiến lược từ Wave 2 sang Wave 1 để hoàn thiện bộ ngũ cân bằng ngũ giác cốt lõi (Tank: Forge #17 - Fighter: Linh Hầu #38 / Kael #39 - Marksman: Liễu Tiễn #40 - Support: Jeli #34). |
| [102 — Beginner Shortlist](../102-roster-v5-beginner-concept-shortlist.md) | §2 Bảng 5 Tướng Nhập Môn & §4.2 Kế hoạch thử nghiệm | Xác nhận Jeli (#34) là Hỗ Trợ hồi phục diện rộng theo nhịp chuông nước; bảo vệ chủ lực, giữ cự ly an toàn; cam kết trải nghiệm nhập môn thanh nhã, dễ hiểu nhưng giàu chiều sâu vị trí. |
| [100 — Rivalry Audit](../100-roster-v5-round4-selection-rivalry-audit.md) | §1 Cặp 1 (Jeli vs Kymos) & §2 Mục 13 | Phán quyết độc lập: Jeli giữ độc quyền hình tượng "Sứa Chuông Biển Sâu" với nhịp chuông nước du dương phục vụ lối chơi Giao Tranh Dai Dẳng & Hồi Phục Bền Bỉ (Sustain & Tempo). Đối thủ Kymos bị tước bỏ motif quả chuông, chuyển thành Khánh Đá Cổ (Anti-Burst). Loại bỏ 100% trùng lặp thị giác. |
| [94 — Fantasy & Marketing Audit](../94-roster-v5-audit-player-fantasy-marketing.md) | §1 Điểm sáng Top Concept (#6 Jeli - 92/100) | Định vị trải nghiệm "Bữa tiệc ASMR & Ánh sáng phát quang", thẩm mỹ thanh tẩy tuyệt mỹ giữa màn đêm chiến trường Cổ Linh. |
| [92 — Concept Discovery](../92-roster-discovery-v5-concept-candidates.md) | §6 Mục 34 & §7 Nhóm Hạt Nhân 12 | Khóa câu pick-up nền tảng: *"Tôi pick Jeli vì hồi máu và làm chậm theo nhịp chuông nước lan ra từng vòng"*. |
| [Candidate YAML](../../../tools/sim/candidates/jeli.yml) | `tools/sim/candidates/jeli.yml` | Chỉ số gốc (HP: 640, Mana: 340, Speed: 6.1 m/s), nội tại `chime_resonance` (chu kỳ 3.5s, hồi máu $35+0.3\text{AP}$, khiên $25+0.2\text{AP}$), bộ chiêu Q/W/E/R. |
| [Engine Toy Test](../../../tools/test/wave1-gameplay-toys.test.mjs) | `Toy 5: Jeli chime resonance - periodic ally healing and distinct shield tracking` | Kiểm chứng thành công chu kỳ xung nhịp 3.5s, đo đạc độc lập và minh bạch 3 chỉ số `m.allyHealed`, `m.healed` và `m.shieldGiven` trên simulator engine. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thái Dị Thú Sứa Chuông (Non-Humanoid Jellyfish Bell):**
   - Jeli là sinh vật sứa chuông phát quang sinh học lơ lửng, đỉnh vòm gốm ngọc bán trong suốt, các xúc tu buông lơi như lụa nước.
   - **Tuyệt đối không nhân hóa:** Không vẽ thành mỹ nhân ngư hai chân cầm gậy phép, không cánh bướm tiên nữ, không có cơ thể người. Phải giữ nguyên dáng bồng bềnh thanh thoát của loài sứa cổ xưa.
2. **Cơ chế cốt lõi — Sóng Chuông Ngân Tự Động (Chime Resonance):**
   - Nội tại hoạt động theo chu kỳ nhịp thở cố định $3.5\text{s}$, tự động phát xung sóng âm tìm kiếm đồng minh yếu máu nhất trong vùng để hồi máu và cấp khiên nhẹ, đồng thời tự hồi phục bản thân.
   - Không đòi hỏi người chơi phải bấm nút liên tục, tạo nhịp thở chiến đấu thanh thản đặc trưng của một Enchanter âm luật.
3. **Tách biệt minh bạch giữa Khiên Hộ Thể (Shield) và Hồi Phục (Heal):**
   - Kỹ năng W (Chuông Nước Hộ Thể) và R (Đại Triều Thánh Chuông) cung cấp cả khiên và hồi máu diện rộng, nhưng hai giá trị này được tính toán độc lập trong hệ thống (`m.shieldGiven` và `m.allyHealed` / `m.healed`). Khiên có thời hạn phân rã riêng, hồi phục chịu ảnh hưởng của hiệu ứng Vết Thương Sâu riêng.
4. **Chuẩn hóa Input Contract (Doc 91):**
   - Đánh thường tách riêng (`basic_attack` tầm 6.2m).
   - Q (Thủy Ba Chấn Động - bóng nước bay chậm làm chậm từ xa).
   - W (Chuông Nước Hộ Thể - hồi phục và khiên diện rộng, legacy `rmb` đã ánh xạ sang W).
   - E (Thủy Luân Âm Vực - vòng sóng âm xoay tròn làm chậm kẻ địch áp sát).
   - R (Đại Triều Thánh Chuông - Ultimate cứu nguy và bảo kê giao tranh tổng).
   - D là Universal Dash chung toàn game. Không dùng chuột phải (RMB) làm chiêu kích hoạt tự do trên runtime mới.
5. **Ranh giới bất khả xâm phạm với Kymos (#41 / Khánh Đá Cổ):**
   - Jeli chuyên hồi phục và hộ vệ bền bỉ theo thời gian (Sustain & Tempo). Tuyệt đối không nhận cơ chế cắm cọc triệt tiêu sốc sát thương tức thời (Anti-Burst Node) của Kymos.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100); phán quyết giữ cả Jeli và Kymos, đổi visual của Kymos để bảo vệ tạo hình quả chuông cho Jeli.
- **2026-10-11:** Phê duyệt vào danh sách 5 Tướng Nhập Môn tại Tài liệu 102.
- **2026-10-12:** Quyết định chiến lược của Creator/Owner đưa Jeli vào Master Plan Wave 1 (Tài liệu 104); kiểm chứng thành công trong `wave1-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
