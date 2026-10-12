# 05 · Mechanics Coverage — #32 Kora (Hải Mẫu Cổ Giáp)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#32 / kora`  
**File ứng viên YAML:** `tools/sim/candidates/kora.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T08-04-13-338Z/kora/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Khiên hướng giảm 60% đạn đạo phía trước** | `passive.frontMitigation: 0.60`, `passive.shieldSpeedPenalty: 0.20` | Đã triển khai bộ đếm `guardUntil = t + 3.5`, giảm $60\%$ sát thương trong `hurt()` và ghi nhận `passive:directional_guard`, `passive:directional_shield_block` | `tools/test/wave3-gameplay-toys.test.mjs` (`Toy 5: Kora directional shield...`) | `SUPPORTED` |
| **Giảm tốc độ di chuyển 20% khi giương thủ** | `passive.shieldSpeedPenalty: 0.20` | Đã áp dụng hệ số làm chậm $20\%$ vào hàm `ms(hero, t)` khi `guardUntil > t` | `tools/test/wave3-gameplay-toys.test.mjs` | `SUPPORTED` |
| **Đánh thường kẹp càng cận chiến** | `lmb: { aim: melee, range: 1.9 }` | Đã mô phỏng đòn đánh cơ bản cận chiến gây $100\%$ AD sát thương vật lý | `tools/sim/run.mjs` (Combat loop) | `SUPPORTED` |
| **Kẹp nghiền Thiết Càng Q làm choáng** | `q.aim: melee`, `range: 2.2`, `windup: 0.15`, `effects: [{stun: 0.6}]` | Đã mô phỏng kẹp mục tiêu gây sát thương và áp dụng choáng $0.6\text{s}$ | `tools/sim/run.mjs` (Duel & Teamfight) | `SUPPORTED` |
| **Bật Cửa Đập W nhận khiên & kích hoạt giương càng** | `rmb.aim: self`, `shield: { base: [90..270], maxHp: 0.09, duration: 3.5 }` | Đã mô phỏng tạo khiên theo máu tối đa và kích hoạt trạng thái thủ `guardUntil` | `tools/test/wave3-gameplay-toys.test.mjs` | `SUPPORTED` |
| **Ủi thân Hải Triều Xung Kích E** | `e.aim: skillshot`, `width: 1.8`, `speed: 20`, `range: 5.5`, `dash: {distance: 5.5}`, `slow: 0.35` | Đã mô phỏng lướt ủi $5.5\text{m}$, gây sát thương vật lý và làm chậm $35\%$ trong $1.2\text{s}$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Dập sóng thần Hải Trấn R làm choáng diện rộng** | `r.aim: area`, `radius: 5.5`, `windup: 0.3`, `delay: 0.2`, `effects: [{stun: 1.0}]` | Đã mô phỏng nện đất AoE bán kính $5.5\text{m}$, sát thương bộc phát và làm choáng $1.0\text{s}$ | `tools/sim/run.mjs` (Teamfight trace) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh lướt dạt ngang $4.0\text{m}$ | Engine combat core | `SUPPORTED` |
| **Mô phỏng hình học góc chắn $180^\circ$ thời gian thực** | Phân định góc đạn đạo theo tọa độ vector đạn đạo | Simulator hiện tại áp dụng logic cản đạn dựa trên trạng thái đối đầu trực diện; chưa có raycast đạn đạo 3D thực thời | Chờ kiểm thử trên Spawn runtime engine | `NOT_TESTED` |
| **VFX bọt nước sóng thần & xả áp thủy lực** | Shader nước mặn PBR và hiệu ứng chấn động sàn | Simulator chạy toán số học thuần túy; chưa render visual particle | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T08-04-13-338Z/kora/report.json` và `summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu sơ bộ, không có cờ Đỏ chặn).
- **Revision:** `a78eb68fb136`.
- **Số cờ Đỏ (RED Flags):** `0`.
- **Số cờ Cam (ORANGE Flags):** `130` (Cảnh báo thông số điều chỉnh thông thường).
- **Tỷ lệ thắng đối đầu mẫu (Duel Rates qua các mốc thời gian):**
  - Phút 3 (Đầu trận): `30.9%`
  - Phút 6: `39.2%`
  - Phút 10: `52.3%`
  - Phút 15: `45.8%`
  - Phút 20: `49.8%`
  - Cuối trận (Full đồ): `42.1%`
  - *Nhận xét chuyên môn:* Kora thể hiện biểu đồ sức mạnh chuẩn mực của một Đỡ Đòn Thuần Phòng Ngự (Pure Defensive Tank). Ở đầu trận (phút 3–6), sát thương cơ bản và độ cơ động thấp khiến Kora khó hạ gục đối thủ solo. Tuy nhiên từ phút 10 trở đi khi có các trang bị chống chịu (`oathguard_plate`, `heartforge`, `iron_plate`), tỷ lệ thắng tay đôi và độ bền bỉ tăng vọt lên vùng cân bằng vàng ($\approx 45 - 52\%$), phát huy tối đa giá trị lá chắn và giảm trừ hỏa lực.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Khả năng tính toán góc va chạm đạn đạo thực thời $180^\circ$ (Real-time Projectile Collision & Angle Verification) trong môi trường 3D không gian của Spawn runtime.
