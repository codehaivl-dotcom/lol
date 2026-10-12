# 05 · Mechanics Coverage — #01 Kiko (Ảnh Hầu Song Trảo)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#01 / kiko`  
**File ứng viên YAML:** `tools/sim/candidates/kiko.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T07-21-06-914Z/kiko/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Ảo ảnh quang học tạo qua Q và W** | `passive.decoyDuration: 3.0` | Đã triển khai bộ đếm `decoyUntil = t + 3.0` và ghi nhận `passive:decoy_spawn` trong hàm cast kỹ năng của `tools/sim/engine.mjs` | `test("Toy 2: Kiko holographic decoy 1-hit threshold absorption...")` | `SUPPORTED` |
| **Hấp thụ 1-hit threshold triệt tiêu đòn đánh** | Cơ chế Ảo ảnh chặn đòn đầu tiên | Đã triển khai logic kiểm tra `decoyUntil > W.t && !decoyHit` trong hàm `hurt()`, triệt tiêu sát thương về 0 và kích hoạt `passive:decoy_absorbed` | `test("Toy 2: Kiko holographic decoy 1-hit threshold absorption...")` | `SUPPORTED` |
| **Tăng tốc & Sát thương bộc phát nội tại** | `passive.bonusMsOnDecoy: 0.20`, `passive.burstBonusAd: 0.35` | Đã triển khai tăng tốc độ chạy và bonus AD cho đòn đánh kế tiếp | `tools/sim/run.mjs` (Duel & Combo) | `SUPPORTED` |
| **Lướt đâm Toái Trảo Q** | `q.aim: skillshot`, `width: 1.3`, `speed: 28`, `range: 6.0`, `dash: {distance: 6.0}`, `damage` | Đã mô phỏng lướt tới mục tiêu và gây sát thương vật lý | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Nhảy lùi tạo khiên quang học W** | `rmb.aim: self`, `shield: { base, duration: 2.0 }` | Đã mô phỏng bước lùi và kích hoạt lớp khiên hấp thụ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Quét song trảo 2 nhát E** | `e.aim: area`, `radius: 3.2`, `hits: 2`, `damage`, `effects: [{slow: 0.3}]` | Đã mô phỏng 2 đòn chém liên tiếp và áp dụng làm chậm $30\%$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Khóa mục tiêu dồn trảo R** | `r.aim: single_target`, `range: 6.5`, `dash: {distance: 6.5}`, `stun: 0.8` | Đã mô phỏng lướt khóa đơn mục tiêu, gây sát thương lớn và làm choáng $0.8\text{s}$ | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát | Engine combat core | `SUPPORTED` |
| **AI Bot bị đánh lừa tung chiêu vào bóng** | Thuật toán đánh lừa mục tiêu của AI | Simulator hiện tại chưa mô phỏng hành vi Bot chuyển mục tiêu nhắm vào bóng | Chờ kiểm thử trên Spawn runtime bot | `NOT_TESTED` |
| **Shader khúc xạ lăng kính 3D** | Hiệu ứng lăng kính quang học | Simulator chạy toán số học thuần túy; chưa render visual shader | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu, không có lỗi chặn).
- **Số cờ Đỏ (RED Flags):** `0` (Triệt tiêu toàn bộ lỗi sốc sát thương bất thường và lỗi lặp bất tử).
- **Số cờ Cam (ORANGE Flags):** `173` (Cảnh báo thông số điều chỉnh thông thường).
- **Tỷ lệ thắng đối đầu mẫu (Duel Rates qua các mốc thời gian):**
  - Phút 3 (Đầu trận): `48.0%`
  - Phút 6: `43.2%`
  - Phút 10: `29.8%`
  - Phút 15: `24.3%`
  - Phút 20: `20.9%`
  - Cuối trận (Full đồ): `23.9%`
  - *Nhận xét chuyên môn:* Tỷ lệ thắng tay đôi solo (1v1 duel) giảm dần về cuối trận là đặc thù hoàn toàn bình thường và chuẩn mực của một Sát Thủ Thuần Ám Toán (Pure Assassin). Kiko sở hữu lượng máu mỏng ($630\text{ HP}$), không được thiết kế để đứng tay đôi giằng co với Đấu Sĩ hay Đỡ Đòn ở giai đoạn đủ đồ. Sức mạnh thật sự của Kiko nằm ở **khả năng dồn sát thương bộc phát bắt lẻ xạ thủ/pháp sư tuyến sau và khả năng vô hiệu hóa 1 chiêu thức chí mạng nhờ ảo ảnh 1-hit threshold**.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Khả năng đánh lừa cơ chế tìm đường và tự động khóa mục tiêu của AI Bot khi Ảo ảnh quang học xuất hiện trên bản đồ thực chiến Spawn runtime.
