# 00 · Source Lock — #49 Kymos (Thạch Âm Điểm Rung Hạ Âm)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#49`
- `runtimeId`: `kymos`
- `displayName`: `Kymos` (Danh hiệu: `Thạch Âm Điểm Rung Hạ Âm` / English: `Kymos - The Infrasonic Resonator`)
- `productionWave`: `Wave 4 (Specialist & Advanced Control Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 20, §4 Bảng Wave 4 & §6 Kế hoạch triển khai | Cấp mã nghiên cứu `#49`, runtime `kymos`, vai trò Hỗ Trợ Triệt Tiêu Sốc Sát Thương (Support / Anti-Burst Shockwave Saver). Bố trí vào Wave 4 chuyên sâu về cơ chế giảm sốc sát thương vùng cắm cọc. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | §1 Cặp 1 (Jeli vs Kymos) & §2 Mục 17 | Phán quyết độc lập: Tước bỏ hoàn toàn motif "quả chuông" khỏi Kymos để bảo vệ tạo hình độc quyền của Jeli (#34). Kymos chuyển sang hình tượng **Khánh Đá Cổ Linh (Ancient Lithophone / Chime Stone)**. Khóa cơ chế cắm Điểm Rung Hạ Âm (Acoustic Node) giảm 40% sát thương sốc. |
| [98 — Discovery Sprint](../../98-roster-v5-mage-support-discovery-sprint.md) | §3.1 (Kymos / Thanh Âm Triệt Tiêu) | Khóa câu pick-up nền tảng: *"Tôi pick Kymos vì tôi muốn tước bỏ hoàn toàn sức mạnh dồn sát thương bốc hơi của sát thủ đối phương."* Xác lập cơ chế Vùng Triệt Tiêu Xung Kích (Shockwave Null Zone) giảm 40% sát thương bộc phát tức thời. |
| [94 — Fantasy & Marketing Audit](../../94-roster-v5-audit-player-fantasy-marketing.md) | Đánh giá Concept Thạch Âm | Xác nhận giá trị trải nghiệm: Cảm giác trầm ổn của âm trầm hạ âm (infrasound), đối trọng với chuông gió cao vút của Jeli. |
| [Candidate YAML](../../../../tools/sim/candidates/kymos.yml) | `tools/sim/candidates/kymos.yml` | Chỉ số gốc (HP: 660, Mana: 340, Speed: 6.15 m/s), nội tại `acoustic_node` (bán kính 4.5m, thời lượng 3.5s, giảm 40% sát thương bộc phát), bộ chiêu Q/W/E/R. |
| [Engine Toy Test](../../../../tools/test/wave4-gameplay-toys.test.mjs) | `Toy 5: Kymos acoustic node shockwave mitigation` | Kiểm chứng thành công cắm `acoustic_node` qua W, giảm 40% sát thương sốc lên đồng minh (`mitigatedBurst < unmitigatedBurst * 0.7`) và kích hoạt `proc("passive:acoustic_mitigation")`. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thái Thạch Âm Sư & Khánh Đá Cổ Sinh (Lithophone Warden):**
   - Kymos là một hộ vệ cổ sinh bằng đá nguyên khối kết hợp trang phục đạo sĩ trầm mặc, vóc người vững chãi cao $\sim 1.88\text{m}$.
   - Mang theo một bộ **Khánh Đá Cổ Linh (Ancient Lithophone Relic)** gồm các thanh ngọc thạch phẳng lơ lửng sau lưng, khi gõ phát ra các rung cảm hạ âm (Infrasonic vibrations) lan truyền qua mặt đất.
   - **Tuyệt đối không dùng hình ảnh quả chuông:** Quả chuông nước thuộc độc quyền của Jeli (#34).
2. **Cơ chế cốt lõi — Điểm Rung Hạ Âm (Acoustic Node Anchor):**
   - Khi kích hoạt W, Kymos cắm một thanh Khánh Đá xuống đất tạo thành **Điểm Rung Hạ Âm** tồn tại trong **3.5 giây** (`nodeDuration: 3.5`).
   - Trong vùng bán kính **4.5m** quanh điểm cắm (`nodeRadius: 4.5`), mọi đòn sát thương bộc phát nhận vào được **cắt giảm 40%** (`burstMitigation: 0.40`).
3. **Phân biệt rạch ròi với Libro (#28) và Jeli (#34):**
   - Jeli hồi máu và khiên duy trì theo chu kỳ 3.5s; Libro hoãn 70% nợ sát thương đơn mục tiêu; còn Kymos **cắt giảm trực tiếp 40% sát thương sốc diện rộng** bằng sóng hạ âm triệt tiêu.
4. **Chuẩn hóa Input Contract (Doc 91):**
   - Đánh thường tách riêng (`basic_attack` tầm 5.8m).
   - Q (Thạch Ba Kích - phóng sóng rung chấn làm chậm).
   - W (Điểm Rung Hạ Âm - cắm khánh đá giảm sốc sát thương, tạo khiên và hồi máu, legacy `rmb` đã ánh xạ sang W).
   - E (Cộng Hưởng Thạch Cầm - đẩy lùi nhẹ và giải tỏa áp sát).
   - R (Vạn Âm Tĩnh Lặng - xung sóng hạ âm cực đại triệt tiêu sát thương và hồi máu diện rộng).
   - D là Universal Dash chung toàn game. Tuyệt đối không dùng RMB hay D làm nút riêng của tướng.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xác lập concept tại Tài liệu 98; giải quyết xung đột tạo hình chuông với Jeli tại Tài liệu 100 §1 Cặp 1 (chuyển sang Khánh đá cổ).
- **2026-10-12:** Đưa vào Master Plan Wave 4 tại Tài liệu 104; kiểm chứng thành công trong `tools/test/wave4-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
