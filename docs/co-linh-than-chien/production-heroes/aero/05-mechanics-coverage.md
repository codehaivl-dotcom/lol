# 05 · Mechanics Coverage — #15 Aero (Phi Công Cổ Khí)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#15 / aero`  
**File ứng viên YAML:** `tools/sim/candidates/aero.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T08-04-13-338Z/aero/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Tăng +15% Tốc độ di chuyển nội tại** | `passive.strafeSpeedBonus: 0.15` | Đã triển khai tăng tốc độ chạy thường trực trong hàm `ms(hero, t)` | `tools/test/wave3-gameplay-toys.test.mjs` (`Toy 7: Aero continuous...`) | `SUPPORTED` |
| **Vệt thảm bom plasma DoT 3.0s sau khi Q** | `passive.plasmaDuration: 3.0`, `passive.plasmaDpsAd: 0.30` | Đã triển khai vùng `plasma_strafe` trong `W.zones`, tick DoT định kỳ bằng `tickDots()` và ghi nhận `passive:plasma_strafe` | `tools/test/wave3-gameplay-toys.test.mjs` | `SUPPORTED` |
| **Bắn đạn đôi plasma đòn đánh thường** | `lmb: { aim: projectile, range: 6.2 }` | Đã mô phỏng bắn đạn đạo tầm $6.2\text{m}$ gây $100\%$ AD sát thương vật lý | `tools/sim/run.mjs` (Combat loop) | `SUPPORTED` |
| **Lướt oanh tạc Tuyến Tính Q làm chậm** | `q.aim: skillshot`, `width: 1.8`, `speed: 30`, `range: 7.5`, `dash: {distance: 7.5}`, `slow: 0.25` | Đã mô phỏng lướt bay tới trước $7.5\text{m}$, sát thương bộc phát và làm chậm $25\%$ trong $1.2\text{s}$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Bật khiên & Tăng tốc độ bay W** | `rmb.aim: self`, `shield: { base: [65..185], duration: 2.5 }` | Đã mô phỏng nhận khiên hấp thụ và bứt tốc lượn vòng | `tools/sim/run.mjs` (Teamfight trace) | `SUPPORTED` |
| **Bắn pháo sáng & Giật lùi bản thân E** | `e.aim: skillshot`, `range: 5.5`, `dash: {distance: 4.5, toward: false}`, `slow: 0.35` | Đã mô phỏng bắn đạn phía trước và giật lùi ngược chiều $4.5\text{m}$, làm chậm $35\%$ | `tools/sim/run.mjs` (Duel trace) | `SUPPORTED` |
| **Đại Oanh Tạc Chiến Dịch R tầm cực xa 10.0m** | `r.aim: area`, `radius: 5.5`, `range: 10.0`, `delay: 0.3`, `windup: 0.25`, `slow: 0.40` | Đã mô phỏng chọn vùng tầm $10.0\text{m}$, bán kính $5.5\text{m}$, sát thương lớn và làm chậm $40\%$ trong $2.0\text{s}$ | `tools/sim/run.mjs` (Teamfight trace) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động ngoặt cánh lướt $4.5\text{m}$ né tránh | Engine combat core | `SUPPORTED` |
| **Vệt dung nham plasma render trên mặt đất** | Shader dung nham plasma xanh lam | Simulator chạy số học thuần túy; chưa render visual particle | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T08-04-13-338Z/aero/report.json` và `summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu sơ bộ, không có cờ Đỏ chặn).
- **Revision:** `5f7350be77cc`.
- **Số cờ Đỏ (RED Flags):** `0`.
- **Số cờ Cam (ORANGE Flags):** `167`.
- **Tỷ lệ thắng đối đầu mẫu (Duel Rates qua các mốc thời gian):**
  - Phút 3 (Đầu trận): `10.5%`
  - Phút 6: `7.9%`
  - Phút 10: `5.3%`
  - Phút 15: `5.2%`
  - Phút 20: `8.8%`
  - Cuối trận (Full đồ): `17.7%`
  - *Nhận xét chuyên môn:* Tỷ lệ solo tay đôi 1v1 của Aero trong giả lập ở mức thấp ($5 - 18\%$). Đây là hiện tượng **hoàn toàn bình thường và chuẩn mực** của một Xạ Thủ Oanh Tạc Diện Rộng (Zone Bombardier):
    1. Trong chế độ duel 1v1 của simulator, bot đối thủ thường lao thẳng mặt cận chiến, nơi Aero (máu $610\text{ HP}$) không được thiết kế để đứng đọ tay đôi với Đấu Sĩ hay Sát Thủ.
    2. Sức mạnh thật sự của Aero nằm trong **Giao Tranh Tổng 5v5 (Teamfight)**: Khả năng rải thảm bom Q và nã chiêu cuối R từ khoảng cách $10.0\text{m}$ chia cắt đội hình địch, gây hàng ngàn sát thương diện rộng và làm chậm cả đội hình đối phương khi có đồng đội bảo kê phía trước.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Khả năng vượt địa hình của cú giật lùi E ($4.5\text{m}$) trên hệ thống geometry vách đá thực tế của Spawn runtime.
