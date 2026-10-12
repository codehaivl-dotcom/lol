# 05 · Mechanics Coverage — #17 Forge (Lò Cổ)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#17 / forge`  
**File ứng viên YAML:** `tools/sim/candidates/forge.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T00-24-57-295Z/forge/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Tích nhiệt khi nhận sát thương (+0.04/dmg)** | `passive.heatPerDmgTaken: 0.04` | Đã triển khai logic cộng dồn `forge.heat` trong hàm `hurt()` của `engine.mjs` | `test("Toy 4: Forge heat gauge...")` | `SUPPORTED` |
| **Tích nhiệt khi tấn công (+12/hit, +15/cast)** | `passive.heatPerHit: 12`, `passive.heatPerCast: 15` | Đã hỗ trợ tăng nhiệt khi tung đòn đánh thường và thi triển kỹ năng | `test("Toy 4: Forge heat gauge...")` | `SUPPORTED` |
| **Xả áp qua W tăng khiên (+1.6/nhiệt)** | `passive.shieldPerHeat: 1.6`, `rmb.shield` | Đã triển khai hàm xả nhiệt, cộng dồn vào `m.shieldGiven` và reset nhiệt về 0 | `test("Toy 4: Forge heat gauge...")` | `SUPPORTED` |
| **Xả áp qua W nổ sát thương phép (+1.2/nhiệt)** | `passive.ventDmgPerHeat: 1.2` | Đã mô phỏng vùng nổ nhiệt diện rộng bán kính 4.0m và ghi nhận proc `passive:heat_vent` | `test("Toy 4: Forge heat gauge...")` | `SUPPORTED` |
| **Đột kích húc lao Q kèm làm choáng 0.8s** | `q.aim: skillshot`, `range: 7.0`, `dash: {distance: 7.0}`, `effects: [{stun: 0.8}]` | Đã mô phỏng lướt thẳng và làm choáng mục tiêu đầu tiên | `tools/sim/run.mjs` (Duel & Combo) | `SUPPORTED` |
| **Phun quạt hơi nóng E làm chậm 25%** | `e.aim: area`, `radius: 4.0`, `damage`, `effects: [{slow: 0.25}]` | Đã mô phỏng vùng quạt lửa và áp dụng hiệu ứng làm chậm | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Đại bộc phá R nhảy lao nện chấn động 1.1s** | `r.aim: area`, `range: 5.0`, `dash: {distance: 5.0}`, `radius: 5.5`, `effects: [{stun: 1.1}]` | Đã mô phỏng nhảy chọn điểm và gây choáng diện rộng 5.5m | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát | Engine combat core | `SUPPORTED` |
| **Mô phỏng va chạm đa giác (Mesh deformation)** | Nứt đất địa hình sau chiêu R | Simulator hiện tại chưa mô phỏng biến dạng lưới va chạm của map | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Hành vi Bot AI tính toán thời điểm xả áp W** | Logic chờ đạt nhiệt cực đại mới xả | Bot hiện tại kích hoạt theo ngưỡng máu cố định, chưa tối ưu xả áp ở 100 nhiệt | Chờ kiểm thử trên runtime bot | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T00-24-57-295Z/summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu, không có lỗi chặn).
- **Số cờ Đỏ (RED Flags):** `0` (Đã triệt tiêu hoàn toàn lỗi sốc sát thương và lỗi tính toán khiên nhiệt).
- **Số cờ Cam (ORANGE Flags):** `132` (Chỉ số kiểm soát nhịp độ tank).
- **Tỷ lệ thắng đối đầu mẫu (Duel Win Rates qua các mốc thời gian):**
  - Phút 3: `44.2%`
  - Phút 6: `57.1%` (Đỉnh cao khi vừa đạt cấp 6 mở chiêu cuối R)
  - Phút 10: `45.6%`
  - Phút 15: `59.5%`
  - Phút 20: `55.2%`
  - Full Build (Cuối trận): `49.4%`
  - *Nhận xét chuyên môn:* Tỷ lệ thắng trung bình dao động hoàn hảo trong khoảng $44\% - 59\%$, đúng chuẩn một Vanguard Tank: cực kỳ mạnh mẽ khi có chiêu cuối mở giao tranh và giữ vững độ trâu bò tiền tuyến xuyên suốt trận đấu.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Tuyệt đối không mở chi phí render asset 3D độ phân giải cao hoặc duyệt Gate 4 trước khi Owner chính thức ký phê duyệt hồ sơ packet này.
2. **NOT_TESTED:** Khả năng hiển thị vòng nổ nhiệt chiêu W và vùng choáng R trên các địa hình dốc và khu vực bụi cỏ của bản đồ 5v5.
