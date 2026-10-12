# 00 · Source Lock — #28 Libro (Sổ Nợ Nghiệp Báo)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#28`
- `runtimeId`: `libro`
- `displayName`: `Libro` (Danh hiệu: `Sổ Nợ Nghiệp Báo` / English: `Libro - The Karmic Debt Ledger`)
- `productionWave`: `Wave 4 (Specialist & Advanced Control Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 8, §4 Bảng Wave 4 & §6 Kế hoạch triển khai | Cấp mã nghiên cứu `#28`, runtime `libro`, vai trò Hỗ Trợ Chống Dồn Sát Thương (Support / Anti-Burst Enabler). Bố trí vào Wave 4 chuyên trách cơ chế tài chính sinh mệnh: hoãn nợ và đáo hạn sát thương. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | §2 Mục 12 & §3 Mục 12 | Phán quyết độc lập: Libro giữ vị trí "Hỗ trợ hoãn nợ đơn mục tiêu số một". Khóa cơ chế chuyển 70% sát thương bộc phát trong 2.5s thành Nợ Treo trả chậm bằng hồi máu/khiên. Khác biệt hoàn toàn với bất tử của Dazzle (Dota 2) hay khiên chắn thông thường. |
| [96 — Top 15 Concept Bibles](../../96-roster-v5-top15-concept-bibles.md) | Mục 12 (Ghi Nợ / Libro #28) | Khóa câu pick-up nền tảng: *"Tôi pick Libro vì tôi cầm trong tay Sổ Nợ Nghiệp Báo: chuyển toàn bộ đợt dồn sát thương chí mạng của đồng đội thành một khoản nợ trả chậm để cứu họ trong gang tấc."* Khóa hình ảnh Người chép sử Cổ Linh mang áo choàng trang nhã, lơ lửng trên bệ đá, mở cuốn Sổ Nợ Di Vật khổng lồ. |
| [94 — Fantasy & Marketing Audit](../../94-roster-v5-audit-player-fantasy-marketing.md) | Đánh giá Concept Sổ Nợ | Đánh giá cao cơ chế tài chính nghiệp báo (Karmic Accounting): vừa độc đáo về gameplay vừa gắn chặt với văn hóa sổ sinh tử Đông phương. |
| [Candidate YAML](../../../../tools/sim/candidates/libro.yml) | `tools/sim/candidates/libro.yml` | Chỉ số gốc (HP: 630, Mana: 350, Speed: 6.15 m/s), nội tại `debt_ledger` (hoãn 70% sát thương trong 2.5s, trả nợ DoT trong 3.0s), bộ chiêu Q/W/E/R theo chuẩn Input 91. |
| [Engine Toy Test](../../../../tools/test/wave4-gameplay-toys.test.mjs) | `Toy 3: Libro debt ledger postponement & gradual payback` | Kiểm chứng thành công việc mở sổ nợ qua W, hoãn 70% sát thương thành `debtPool`, ghi nhận `proc("passive:debt_postponed")`, và trả nợ dần qua `tickDots` khi nợ đáo hạn. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thái Người Chép Sử Cổ Linh (Karmic Scribe):**
   - Nhân vật thanh nhã mang áo choàng dài màu lam sẫm viền chỉ vàng kim, lơ lửng nhẹ $0.2\text{m}$ trên một bệ đá Tinh Thạch nhỏ.
   - Trước ngực lơ lửng cuốn **Đại Thư Nghiệp Báo (The Great Ledger Relic)** bằng các phiến đá và thẻ tre cổ tự, liên tục lật mở và phát ra ánh sáng tím lam.
2. **Cơ chế cốt lõi — Hoãn Sát Thương & Nợ Đáo Hạn (Debt Ledger):**
   - Khi kích hoạt Sổ Nợ, **70% sát thương nhận vào** trong cửa sổ **2.5 giây** (`debtWindow: 2.5`) không trừ thẳng vào máu mà được hoãn lại thành **Nợ Treo (Deferred Debt Pool)**.
   - Trong thời gian hoãn nợ, mọi lượng hồi máu và khiên chắn ban cho mục tiêu sẽ được ưu tiên **trừ bớt vào khoản nợ treo này**.
   - Sau khi hết 2.5s, khoản nợ chưa trả hết sẽ **đáo hạn**: Chuyển thành sát thương duy trì (DoT) trừ dần vào máu trong **3.0 giây** (`debtPaybackDur: 3.0`).
3. **Thanh Nợ Treo Minh Bạch (Deferred Debt Bar):**
   - Khi dính nợ, trên thanh máu của mục tiêu hiển thị một thanh phụ màu xám viền đỏ biểu thị số nợ hiện tại để cả hai phe đều đọc được tình thế.
4. **Chuẩn hóa Input Contract (Doc 91):**
   - Đánh thường tách riêng (`basic_attack` tầm 6.0m).
   - Q (Trang Sử Trừng Phạt - phóng phiến đá cổ).
   - W (Sổ Nợ Ký Ức - mở Sổ Nợ hoãn sát thương và bọc khiên, legacy `rmb` đã ánh xạ sang W).
   - E (Ân Hạn Nghiệp Báo - cuộn thư hồi máu lớn và tăng tốc cho 1 đồng minh).
   - R (Chung Quyết Phán Thư - đại kết giới hoãn nợ diện rộng và làm chậm).
   - D là Universal Dash chung toàn game. Tuyệt đối không dùng RMB hay D làm nút riêng của tướng.
5. **Ranh giới với Jeli (#34) và Kymos (#49):**
   - Jeli hồi máu duy trì bền bỉ theo chu kỳ $3.5\text{s}$; Kymos cắm cọc cắt ngọn 40% sát thương sốc tức thời; còn Libro là **chuyên gia hoãn nợ tín dụng sinh mệnh** (cứu mạng ngay tức khắc nhưng buộc phải trả nợ sau đó).

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xác lập concept tại Tài liệu 96 & bảo vệ thành công tại Tài liệu 100 §2 Mục 12.
- **2026-10-12:** Đưa vào Master Plan Wave 4 tại Tài liệu 104; kiểm chứng thành công trong `tools/test/wave4-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
