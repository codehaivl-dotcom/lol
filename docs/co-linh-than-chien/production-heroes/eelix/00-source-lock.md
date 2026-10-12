# 00 · Source Lock — #33 Eelix (Lươn Sóng Thủy Uyên)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#33`
- `runtimeId`: `eelix`
- `displayName`: `Eelix` (Danh hiệu: `Lươn Sóng Thủy Uyên` / English: `Eelix - The Abyssal Surge Assassin`)
- `productionWave`: `Wave 4 (Specialist & Advanced Control Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 12, §4 Bảng Wave 4 & §6 Kế hoạch triển khai | Cấp mã nghiên cứu `#33`, runtime `eelix`, vai trò Sát Thủ Thủy Uyên (Assassin / Abyssal Wake Skirmisher). Bố trí vào Wave 4 về cơ chế trườn lướt trên vệt nước bóng tối lơ lửng. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | §1 Cặp 5 (Eelix vs Tethys) & §2 Mục 15 | Phán quyết độc lập: Eelix giữ độc quyền vị trí "Sát thủ lướt tuyến tính tốc độ cao gắn liền với địa hình nước do chính mình tạo ra". Tethys bị chuyển vào Reserve. Khóa Phương án A: Lươn biển cổ đại phi nhân hình lơ lửng $0.3\text{m}$. |
| [96 — Top 15 Concept Bibles](../../96-roster-v5-top15-concept-bibles.md) | Mục 15 (Lươn Đêm / Eelix #33) | Khóa câu pick-up nền tảng: *"Tôi pick Eelix vì tôi là một quái thú lươn bóng tối uốn lượn lơ lửng, tạo ra những vệt nước đen rình rập và lao vút theo dòng nước kết liễu con mồi."* Khóa hình tượng quái thú lươn biển uốn lượn thuần túy không chân tay. |
| [94 — Fantasy & Marketing Audit](../../94-roster-v5-audit-player-fantasy-marketing.md) | Đánh giá Concept Sát Thủ Thủy Uyên | Đánh giá cao bản sắc săn mồi động học: lướt nước bóng tối kết hợp phóng điện giật lan tỏa. |
| [Candidate YAML](../../../../tools/sim/candidates/eelix.yml) | `tools/sim/candidates/eelix.yml` | Chỉ số gốc (HP: 630, Resource: 0 / Không tốn mana, AD: 66, Speed: 6.6 m/s), nội tại `shadow_wake` (vệt nước 3.5s, +35% MS, đòn đánh giật sét +45% bonus AD), bộ chiêu Q/W/E/R theo chuẩn Input 91. |
| [Engine Toy Test](../../../../tools/test/wave4-gameplay-toys.test.mjs) | `Toy 6: Eelix shadow wake speed boost & chain lightning strike` | Kiểm chứng thành công việc rải vệt nước `shadow_wake` qua Q, tăng tốc độ di chuyển `ms > baseMs`, và kích hoạt đòn đánh giật sét `chainAtkDmg > normalAtkDmg` ghi nhận `proc("passive:shadow_wake_strike")`. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thái Sinh Vật Lươn Biển Cổ Đại Phi Nhân Hình (Non-Humanoid Abyssal Eel):**
   - Eelix là quái thú lươn biển bóng tối thuần túy uốn lượn, thân dài $\sim 3.2\text{m}$, vảy da nhẵn bóng màu đen tuyền ánh xanh chàm Thủy Uyên.
   - **Tuyệt đối không nhân hóa:** Không vẽ thành người cá cầm xiên, không chân, không tay người. Thân thể uốn lượn mềm mại lơ lửng cách mặt đất đúng **0.3m** (Phương án A Locomotion).
2. **Cơ chế cốt lõi — Lướt Sóng Thủy Uyên & Đòn Đánh Sét Lan (Shadow Wake & Chain Lightning):**
   - Khi tung chiêu Q, Eelix phóng ra một vệt nước bóng tối lơ lửng trên sàn đấu tồn tại **3.5 giây** (`wakeDuration: 3.5`).
   - Khi trườn lướt trên vệt nước, Eelix nhận thêm **+35% Tốc độ di chuyển** (`wakeSpeedBonus: 0.35`).
   - Đòn đánh thường tiếp theo khi đang trên vệt nước kích hoạt **Luồng Điện Lan Tỏa (Chain Lightning)**: Gây thêm sát thương phép lan tỏa bằng **45% bonus AD** (`chainLightningAd: 0.45`).
3. **Không Sử Dụng Tài Nguyên (Manaless / Cooldown-based):**
   - Eelix hoàn toàn không dùng Năng Lượng hay Nội Năng (`resource: none`), vận hành thuần túy dựa trên nhịp hồi chiêu (Cooldown-driven Skirmisher).
4. **Chuẩn hóa Input Contract (Doc 91):**
   - Đánh thường cận chiến tách riêng (`basic_attack` tầm 1.7m).
   - Q (Thủy Uyên Trườn Lướt - phóng vệt nước và lướt thẳng).
   - W (Hắc Thủy Thuẫn - lặn ngập vào vệt nước nhận khiên và tăng tốc, legacy `rmb` đã ánh xạ sang W).
   - E (Lôi Điện Xung Phá - xung điện giật diện rộng quanh vệt nước).
   - R (Thâm Hải Cuồng Nộ - cuộn tròn lao thẳng xuyên thủng mục tiêu sốc điện cực đại).
   - D là Universal Dash chung toàn game. Tuyệt đối không dùng RMB hay D làm nút riêng của tướng.
5. **Ranh giới với các Sát Thủ khác:**
   - Khác với Kiko (#01 - sát thủ ngụy trang phân thân) và Moka (#31 - hổ nấm rình rập bụi rậm), Eelix là **sát thủ lướt tuyến tính tốc độ cao gắn liền với địa hình nước do chính mình tạo ra**.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xác lập concept tại Tài liệu 96 & bảo vệ thành công tại Tài liệu 100 §1 Cặp 5 (loại bỏ Tethys, giữ Eelix lơ lửng 0.3m).
- **2026-10-12:** Đưa vào Master Plan Wave 4 tại Tài liệu 104; kiểm chứng thành công trong `tools/test/wave4-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
