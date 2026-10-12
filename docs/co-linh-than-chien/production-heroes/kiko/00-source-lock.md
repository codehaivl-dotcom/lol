# 00 · Source Lock — #01 Kiko (Ảnh Hầu Song Trảo)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#01`
- `runtimeId`: `kiko`
- `displayName`: `Kiko` (Tiếng Anh: `Kiko - Optical Shadow Claw`)
- `productionWave`: `Wave 2 (Expanded Roster / High-Execution Assassin)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) | §1 Mục 1 & §4 Wave 2 | Cấp mã nghiên cứu độc bản `#01`, runtime `kiko`, vai trò Sát thủ (Assassin). Core toy: Ảo ảnh quang học 1-hit threshold. Chuyển sang Wave 2 để Jeli làm mẫu Hỗ trợ Wave 1. |
| [102 — Beginner Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md) | §2 (Phân định Kiko vs. Linh Hầu) | Chính thức xác nhận Phương án B: Giữ nguyên Kiko (#01) là Sát Thủ Ảo Ảnh Song Trảo; Linh Hầu (#38) là Đấu Sĩ Cổ Trượng. Phân định triệt để vóc dáng, dáng chạy và vũ khí. |
| [100 — Rivalry Audit](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/100-roster-v5-round4-selection-rivalry-audit.md) | §7 Ảnh Hầu / Kiko | Thoát khỏi khuôn mẫu Wukong clone; loại bỏ hoàn toàn tàng hình phân thân múa gậy lốc xoáy; chuyển hóa thành sát thủ outplay quang học và dấu chân giả. |
| [94 — Deep Audit](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/94-roster-v5-team-deep-audit.md) | Phiếu cảnh báo & Gỡ bỏ ràng buộc | Kiko phải có silhouette độc lập, bộ động tác nhào lộn 4 chi, vũ khí là vuốt cơ khí gắn mu tay, không được có bất kỳ dáng đứng tựa gậy nào. |
| [Candidate YAML](file:///d:/Project/Test/24tuong/tools/sim/candidates/kiko.yml) | `tools/sim/candidates/kiko.yml` | Thông số nền tảng, passive `holographic_decoy` (decoyDuration 3.0, bonusMsOnDecoy 0.20, burstBonusAd 0.35), QWER kit. |
| [Engine Toy Test](file:///d:/Project/Test/24tuong/tools/test/wave2-gameplay-toys.test.mjs) | `test("Toy 2: Kiko holographic decoy 1-hit threshold absorption...")` | Kiểm chứng thành công cơ chế Ảo ảnh quang học hấp thụ trọn vẹn 1 đòn đánh/kỹ năng đầu tiên (1-hit threshold) trên simulator engine. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí độc bản — Song Trảo Cơ Khí Gắn Mu Tay:** Hai bộ vuốt hợp kim cơ khí sắc lẹm gắn chặt vào mu bàn tay (`wrist_mechanical_claws`). **Tuyệt đối không cầm gậy như ý, không cầm dao kiếm hay trượng phép**. Phân định nhận diện triệt để với #38 Linh Hầu.
2. **Cơ chế Cốt Lõi — Ảo Ảnh Quang Học 1-Hit Threshold (Holographic Decoy):** Sau khi tung Q hoặc W, Kiko tạo ra một ảo ảnh khúc xạ ánh sáng tồn tại trong 3.0 giây. Ảo ảnh có khả năng **hấp thụ và triệt tiêu hoàn toàn 1 đòn đánh hoặc kỹ năng đầu tiên của đối thủ** (giảm sát thương đòn đó về 0). Kiko nhận $+20\%$ tốc độ di chuyển và đòn đánh kế tiếp được cường hóa $+35\%$ bonus AD bộc phát.
3. **Thoát bóng Wukong / Tôn Ngộ Không:** Tuyệt đối không có kỹ năng tàng hình phân thân truyền thống, không có chiêu múa lốc xoáy 360° hất tung (Cyclone knockup). Kiko là sát thủ ám toán tốc độ cao, dồn sát thương đơn mục tiêu và outplay bằng ảo ảnh khúc xạ quang học.
4. **Vóc dáng & Dáng chạy đặc thù:** Thể hình nhỏ thó ($1.65\text{m}$), gầy gò, lưng cong linh hoạt, trọng tâm thấp, di chuyển trườn bò nhào lộn 4 chi thoắt ẩn thoắt hiện.
5. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng RMB làm skill độc lập trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Owner phê duyệt Phương án B phân tách độc lập Kiko (#01) và Linh Hầu (#38) trong Tài liệu 102.
- **2026-10-12:** Đưa vào Master Plan Wave 2 tại Tài liệu 104; kiểm chứng engine trong `wave2-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
