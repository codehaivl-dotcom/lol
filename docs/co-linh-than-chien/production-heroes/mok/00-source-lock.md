# 00 · Source Lock — #37 Mok (Trinh Sát Cổ Đăng Tác Chiến)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#37`
- `runtimeId`: `mok`
- `displayName`: `Mok` (Tiếng Việt: `Đăng Mộc` / English: `Mok - The Combat Lantern Scout`)
- `productionWave`: `Wave 4 (Specialist & Advanced Control Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 16, §4 Bảng Wave 4 & §6 Kế hoạch triển khai | Cấp mã nghiên cứu `#37`, runtime `mok`, vai trò Hỗ Trợ / Trinh Sát Tác Chiến (Combat Lantern Scout Support). Bố trí vào Wave 4 chuyên sâu về kiểm soát tầm nhìn và hỗ trợ đồng đội. |
| [99 — Mok Master Bible](../../99-hero-concept-mok-scout-master-bible.md) | Toàn bộ tài liệu (§1 đến §6) | Khóa toàn bộ bản sắc thiết kế V2 tinh giản: Cắt bỏ bẻ đạn, cắt bỏ lướt tường, ngụy trang, bẫy nổ rải mìn. Tập trung vào một Core Toy duy nhất: **Cắm Đèn Lồng & Hai Quyết Định Đánh Đổi (Giữ đèn lấy tầm nhìn vs Tiêu thụ đèn kích nổ)**. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | §1 Cặp 4 (Mok vs Teko/Spora) & §2 Mục 16 | Phán quyết độc lập: Chọn Mok vào danh sách chính, loại bỏ Teko (#20) và chuyển Spora vào Reserve. Mok mang lại lối chơi trinh sát lành mạnh, có tương tác chủ động và counterplay minh bạch. |
| [95 — Scout Concept Spec](../../95-hero-concept-sylva-scout-gameplay-spec.md) | Đánh giá lịch sử và chuyển đổi | Quy chuẩn đổi tên từ Sylva/Cổ Đăng Thảo thành Đăng Mộc / Mok; gỡ bỏ cơ chế chiếm dụng phím D. |
| [Candidate YAML](../../../../tools/sim/candidates/mok.yml) | `tools/sim/candidates/mok.yml` | Chỉ số gốc (HP: 650, Mana: 330, Speed: 6.25 m/s), nội tại `lantern_beacon` (bán kính 6.0m, thời lượng 8.0s), bộ kỹ năng Q/W/E/R. |
| [Engine Toy Test](../../../../tools/test/wave4-gameplay-toys.test.mjs) | `Toy 2: Mok lantern beacon vision zone & detonation` | Kiểm chứng thành công việc cắm Cổ Đăng bằng Q tạo vùng `lantern_beacon` bán kính 6.0m, ghi nhận `proc("passive:lantern_placed")` và tiêu thụ kích nổ qua W ghi nhận `proc("passive:lantern_detonated")`. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thái Thực Thể Gỗ Hóa Thạch Cổ Sinh (Biophilic Automaton):**
   - Mok là người máy sinh học cổ đại nhỏ gọn, cấu tạo từ các khối gỗ hóa thạch màu hổ phách kết hợp khung đồng cổ oxy hóa.
   - Mang một **Nhánh Đăng Mạch** vươn từ sau lưng qua vai, treo lơ lửng một chiếc **Cổ Đăng Tinh Thạch**. Tuyệt đối không cầm gậy phép, không có chân chạy theo đuôi mục tiêu.
2. **Cơ chế cốt lõi — Hai Quyết Định Cốt Lõi Của Cổ Đăng:**
   - **Quyết định 1 (Đặt đèn ở đâu):** Cắm đèn lồng gỗ soi sáng vùng bán kính **6.0m** trong **8.0s**, xua tan sương mù chiến tranh và phát hiện kẻ địch.
   - **Quyết định 2 (Giữ hay Tiêu thụ):** Giữ đèn để lấy thông tin vị trí liên tục; hoặc kích hoạt W để **tiêu thụ đèn**, phát nổ làn sóng huỳnh quang làm chậm đối thủ $30\%$, giải phóng hồi máu cho đồng minh và đèn biến mất ngay lập tức.
3. **Cổ Đăng là Static Prop công bằng:**
   - Đèn cắm cố định tại chỗ, phát ra ánh sáng mờ mà cả hai phe đều nhìn thấy. Kẻ địch có thể đánh 2 đòn đánh thường để phá hủy đèn.
4. **Chuẩn hóa Input Contract (Doc 91):**
   - Đánh thường tách riêng (`basic_attack` tầm 5.8m).
   - Q (Cắm Cổ Đăng - ném đèn soi sáng).
   - W (Huỳnh Quang Hộ Mệnh - hồi máu/khiên diện rộng và lệnh tiêu thụ đèn kích nổ, legacy `rmb` đã ánh xạ sang W).
   - E (Đăng Mộc Triền Nhiễu - rễ cây quét trói chân).
   - R (Vạn Thảo Quang Minh - đại trận huỳnh quang bảo hộ và làm chậm).
   - D là Universal Dash chung toàn game. Tuyệt đối không có kỹ năng lướt riêng vào phím D.
5. **Danh sách tính năng đã bị cắt vĩnh viễn (Doc 99):**
   - Cắt bỏ bẻ góc projectile; cắt bỏ lướt tường tới đèn; cắt bỏ ngụy trang tàng hình; cắt bỏ bẫy nổ độc tố.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Soát xét Vòng 4 Audit (Tài liệu 100); chọn Mok, phê chuẩn bản V2 tinh giản tại Tài liệu 99.
- **2026-10-12:** Đưa vào Master Plan Wave 4 (Tài liệu 104); kiểm chứng thành công trong `tools/test/wave4-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
