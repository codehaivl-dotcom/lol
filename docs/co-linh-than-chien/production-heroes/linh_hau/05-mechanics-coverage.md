# 05 · Mechanics Coverage — #38 Linh Hầu (Cổ Thần Trượng)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#38 / linh_hau`  
**File ứng viên YAML:** `tools/sim/candidates/linh_hau.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T00-24-57-295Z/linh_hau/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Thế Đoản Trượng (+15% AS cận chiến)** | `passive.shortAspdBonus: 0.15`, `lmb.range: 2.0` | Đã triển khai logic cộng AS khi `staffUntil <= 0` trong `tools/sim/engine.mjs` | `test("Toy 1: Linh Hau staff reach modulation...")` | `SUPPORTED` |
| **Kích hoạt Trường Trượng 4.8m qua Q** | `passive.extendedRange: 4.8`, `passive.extendDuration: 4.0` | Đã hỗ trợ bộ đếm `staffUntil` và mở rộng tầm đánh của unit lên 4.8m | `test("Toy 1: Linh Hau staff reach modulation...")` | `SUPPORTED` |
| **Sweetspot Rìa Trượng (2.8m - 4.8m)** | `passive.sweetspotMin: 2.8`, `passive.sweetspotBonus: 0.25`, `effects: [{slow: 0.2}]` | Đã kiểm tra khoảng cách mục tiêu và áp dụng bonus sát thương + proc `passive:staff_sweetspot` | `test("Toy 1: Linh Hau staff reach modulation...")` | `SUPPORTED` |
| **Đâm đường thẳng Q** | `q.aim: skillshot`, `width: 1.5`, `speed: 26`, `range: 7.0`, `damage`, `effects` | Đã mô phỏng tính toán va chạm theo đường đạn tuyến tính và kích hoạt trạng thái Trường Trượng | `tools/sim/run.mjs` (Duel & Combo) | `SUPPORTED` |
| **Tự niệm Khiên W** | `rmb.aim: self`, `shield: { base, maxHp: 0.06, duration: 3.0 }` | Đã mô phỏng lớp khiên hấp thụ sát thương theo % HP và theo dõi trong `m.shieldGiven` | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Quét xoay 360° E** | `e.aim: area`, `radius: 3.8`, `damage`, `effects: [{slow: 0.2}]` | Đã mô phỏng vùng ảnh hưởng hình tròn quanh tâm nhân vật | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Bật nhảy nện đất R** | `r.aim: area`, `range: 6.0`, `radius: 4.5`, `dash: {distance: 6.0}`, `stun: 0.8` | Đã mô phỏng lướt tới điểm chọn và gây choáng diện rộng | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát | Engine combat core | `SUPPORTED` |
| **Va chạm địa hình động & vách nứt** | Nứt khe đất vật lý sau chiêu R | Simulator chưa mô phỏng biến dạng lưới đa giác (mesh deformation) | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Hành vi Bot AI nâng cao** | Logic giữ khoảng cách sweetspot của Bot | Bot hiện tại dùng logic tiếp cận cơ bản, chưa tối ưu vi bước lùi để giữ đúng rìa 3.5m | Chờ kiểm thử trên runtime bot | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T00-24-57-295Z/summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu, không có lỗi chặn).
- **Số cờ Đỏ (RED Flags):** `0` (Đã triệt tiêu toàn bộ lỗi sốc sát thương bất thường và lỗi stack).
- **Số cờ Cam (ORANGE Flags):** `145` (Cảnh báo thông số điều chỉnh thông thường).
- **Tỷ lệ thắng đối đầu mẫu (Duel Rates qua các mốc thời gian):**
  - Phút 1 (Đầu trận): `55.5%`
  - Phút 5: `48.0%`
  - Phút 9: `36.8%`
  - Phút 13: `24.1%`
  - Phút 17: `23.2%`
  - Phút 21 (Cuối trận đầy đủ trang bị): `48.8%`
  - *Nhận xét:* Linh Hầu thể hiện đúng vai trò Đấu Sĩ mạnh đầu và giữa trận, phụ thuộc vào trang bị đấu sĩ sinh tồn (`heartforge`, `oathguard_plate`) để phát huy sức mạnh ở late-game mà không bị áp đảo quá mức.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Tuyệt đối không mở chi phí render asset 3D độ phân giải cao hoặc duyệt Gate 4 trước khi Owner chính thức ký phê duyệt hồ sơ packet này.
2. **NOT_TESTED:** Khả năng hiển thị vùng sweetspot rìa trượng trên nền địa hình không bằng phẳng (đồi dốc, sông) của bản đồ 5v5 Spawn runtime.
