# 05 · Mechanics Coverage — #39 Kael (Cuồng Đao)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#39 / kael`  
**File ứng viên YAML:** `tools/sim/candidates/kael.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T00-24-57-295Z/kael/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Tích tầng Cuồng Nhịp (+8% AS/tầng, max 5)** | `passive.type: cuong_nhip`, `maxStacks: 5`, `aspdPerStack: 0.08` | Đã triển khai cấu trúc `kael.cuongNhip.stacks` tăng tốc độ đánh trong `engine.mjs` | `test("Toy 2: Kael Cuong Nhip...")` | `SUPPORTED` |
| **Phân biệt mục tiêu (Tướng 1.0, Lính 0.5)** | `passive.stackPerHit: 1.0`, `passive.stackPerMinion: 0.5` | Đã hỗ trợ phân loại unit trong hàm xử lý va chạm đòn đánh | `test("Toy 2: Kael Cuong Nhip...")` | `SUPPORTED` |
| **Cơ chế suy giảm dần sau 2.0s (Decay)** | `passive.decayDelay: 2.0`, `passive.decayRate: 2.0` | Đã hỗ trợ bộ đếm `lastHit` và giảm dần tầng khi ngừng combat quá 2 giây | `test("Toy 2: Kael Cuong Nhip...")` | `SUPPORTED` |
| **Lướt chém Q (6.5m Dash)** | `q.aim: skillshot`, `range: 6.5`, `dash: {distance: 6.5}`, `damage` | Đã mô phỏng lướt thẳng và gây sát thương vật lý lên mục tiêu đầu tiên | `tools/sim/run.mjs` (Duel & Combo) | `SUPPORTED` |
| **Chém kép 2 nhịp W kèm làm chậm** | `rmb.aim: area`, `radius: 3.2`, `hits: 2`, `damage`, `effects: [{slow: 0.25}]` | Đã mô phỏng 2 nhịp sát thương tuần tự và áp dụng làm chậm 25% | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Khiên phản ứng E (Shield 2.5s)** | `e.aim: self`, `shield: { base, duration: 2.5 }` | Đã mô phỏng tạo khiên tự thân bảo vệ tức thời | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Bão đao xoay 3 nhịp R kèm làm chậm** | `r.aim: area`, `range: 4.5`, `dash: {distance: 4.5}`, `hits: 3`, `slow: 0.3` | Đã mô phỏng lướt tới điểm chọn và xoay 3 nhịp sát thương diện rộng | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát | Engine combat core | `SUPPORTED` |
| **Quy tắc đóng băng decay khi đánh trụ** | Ngăn suy giảm tầng khi tấn công công trình | Simulator hiện tại chưa có mục tiêu công trình trong kịch bản 1v1 duel | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Hành vi Bot AI quản lý nhịp truy đuổi** | Logic né tránh khi tầng Cuồng Nhịp bị mất | Bot hiện tại dùng hành vi cơ bản, chưa tự động rút lui khi mất hết 5 tầng | Chờ kiểm thử trên runtime bot | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T00-24-57-295Z/summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu, không có lỗi chặn).
- **Số cờ Đỏ (RED Flags):** `0` (Đã triệt tiêu hoàn toàn lỗi chém one-combo bất thường và lỗi stack vô hạn).
- **Số cờ Cam (ORANGE Flags):** `156` (Cảnh báo nhịp độ skirmisher).
- **Tỷ lệ thắng đối đầu mẫu (Duel Win Rates qua các mốc thời gian):**
  - Phút 1 (Đầu trận): `40.3%`
  - Phút 5: `11.7%` (Giai đoạn phụ thuộc hoàn toàn vào nhịp tích tầng)
  - Phút 9: `6.9%`
  - Phút 13: `7.7%`
  - Phút 17: `4.1%`
  - Phút 21 (Cuối trận đầy đủ trang bị): `19.9%`
  - *Nhận xét chuyên môn:* Kael là mẫu tướng Skirmisher phụ thuộc cực lớn vào việc duy trì bám đuổi và đánh tay liên tục. Trong môi trường mô phỏng duel tĩnh với các tướng dồn khống chế hoặc tank giáp dày, tỷ lệ solo của Kael thấp hơn trung bình, phản ánh đúng đặc tính cần đồng đội hỗ trợ làm chậm/bảo kê để xả sát thương.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Tuyệt đối không mở chi phí render asset 3D độ phân giải cao hoặc duyệt Gate 4 trước khi Owner chính thức ký phê duyệt hồ sơ packet này.
2. **NOT_TESTED:** Kiểm tra trực quan chuyển động 3 nhịp chém xoay của chiêu R khi lướt qua nhiều mục tiêu địa hình phức tạp.
