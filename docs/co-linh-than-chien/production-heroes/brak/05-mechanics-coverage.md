# 05 · Mechanics Coverage — #02 Brak (Nhịp Quyền)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#02 / brak`  
**File ứng viên YAML:** `tools/sim/candidates/brak.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T07-21-06-914Z/brak/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Thế thủ Parry giảm 60% sát thương** | `passive.parryWindow: 0.75`, `rmb.shield` | Đã triển khai logic kiểm tra `brak.parryUntil > W.t` trong hàm `hurt()` của `engine.mjs`, áp dụng hệ số giảm sát thương 60% | `test("Toy 3: Brak rhythm parry piston...")` | `SUPPORTED` |
| **Phản kích đấm búa tạ khi đón đòn (+35% bonus)** | `passive.counterBonusRatio: 0.35` | Đã kích hoạt phản đòn lập tức vào kẻ tấn công, ghi nhận proc `passive:parry_piston_proc` và reset thế thủ `parryUntil = 0` | `test("Toy 3: Brak rhythm parry piston...")` | `SUPPORTED` |
| **Làm choáng 0.5s kẻ tấn công khi parry** | `passive.counterStun: 0.5` | Đã mô phỏng hiệu ứng làm choáng 0.5s lên mục tiêu gây sát thương | `test("Toy 3: Brak rhythm parry piston...")` | `SUPPORTED` |
| **Piston Trực Quyền Q đấm thẳng làm chậm 25%** | `q.aim: skillshot`, `range: 5.5`, `speed: 26`, `effects: [{slow: 0.25}]` | Đã mô phỏng kỹ năng định hướng đường thẳng gây sát thương vật lý và làm chậm 25% mục tiêu đầu tiên | `tools/sim/run.mjs` (Combat simulation) | `SUPPORTED` |
| **Nghênh Kích Thủ Thế W tạo khiên chắn 2.0s** | `rmb.shield: {base: [80, 125, 170, 215, 260], duration: 2.0}` | Đã mô phỏng tạo lớp khiên chắn cơ bản cho bản thân | `tools/sim/run.mjs` (Duel & Teamfight) | `SUPPORTED` |
| **Địa Chấn Xung Kích E nện đất làm chậm 30%** | `e.aim: area`, `radius: 3.8`, `effects: [{slow: 0.3}]` | Đã mô phỏng sát thương diện rộng quanh thân và làm chậm 30% trong 1.2s | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Hơi Nước Bộc Phá R nhảy nện làm choáng 1.0s** | `r.aim: area`, `range: 6.0`, `dash: {distance: 6.0}`, `radius: 4.5`, `effects: [{stun: 1.0}]` | Đã mô phỏng nhảy chọn điểm cự ly 6.0m và gây choáng diện rộng 1.0s | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát | Engine combat core | `SUPPORTED` |
| **Mô phỏng nứt rạn địa hình 3D thực tế** | Vết nứt đất cơ học sau chiêu E và R | Simulator hiện tại chưa mô phỏng biến dạng lưới va chạm của bản đồ | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Hành vi Bot AI tính toán bắt bài (Read Animation)** | AI canh timing để bấm parry chuẩn xác | Bot hiện tại kích hoạt W theo ngưỡng máu hoặc khi bị tấn công, chưa đọc chuẩn xác animation vung đòn | Chờ kiểm thử trên runtime bot | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu, không có cờ đỏ chặn).
- **Revision hash:** `21ddfb8ead7b`
- **Số cờ Đỏ (RED Flags):** `0` (Đã triệt tiêu hoàn toàn lỗi sốc sát thương và lỗi tính toán parry bất tử).
- **Số cờ Cam (ORANGE Flags):** `144` (Chỉ số kiểm soát nhịp độ đấu sĩ phản đòn).
- **Tỷ lệ thắng đối đầu mẫu (Duel Win Rates qua các mốc thời gian):**
  - Phút 3: `29.5%` (Giai đoạn đầu trận khi chưa đủ đồ chống chịu và chưa mở chiêu cuối)
  - Phút 6: `39.7%` (Bật tăng khi mở chiêu cuối R mở giao tranh)
  - Phút 10: `40.5%` (Giai đoạn giữa trận ổn định)
  - Phút 15: `38.8%`
  - Phút 20: `31.2%`
  - Full Build (Cuối trận): `42.5%` (Khả năng bắt lẻ và mở combat bằng R rất tốt)
  - *Nhận xét chuyên môn:* Brak thể hiện đúng chất tướng Đấu sĩ Phản Đòn (Counter-Brawler): Không phải mẫu tướng đè đường áp đảo mọi kèo đấu ngay từ cấp 1, mà sức mạnh phụ thuộc vào khả năng bắt bài parry của người chơi trong giao tranh. Tỷ lệ thắng duel $30\% - 43\%$ trong môi trường bot giả lập (nơi bot chưa biết bait parry mà chỉ đánh theo kịch bản) là hoàn toàn an toàn và nằm trong ngưỡng kiểm soát, không gây mất cân bằng.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Tuyệt đối không mở chi phí render asset 3D độ phân giải cao hoặc duyệt Gate 4 trước khi Owner chính thức ký phê duyệt hồ sơ packet này.
2. **NOT_TESTED:** Khả năng hiển thị vầng sáng parry W và vùng nổ hơi nước R trên địa hình dốc và khu vực sông của bản đồ thi đấu 5v5.
