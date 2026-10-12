# 05 · Mechanics Coverage — #44 Tản Sơn (Thánh Sơn Cổ Thạch)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#44 / tan_son`  
**File ứng viên YAML:** `tools/sim/candidates/tan_son.yml`  
**Kiểm thử đơn vị tự động:** `tools/test/wave3-gameplay-toys.test.mjs`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Vách Núi Ngọc Bích Khả Thông & Khiên Đồng Minh** | `passive.ridgeDuration: 3.0`, `passive.ridgeShield: 80`, `rmb.shield` | Đã hỗ trợ tạo vùng `passable_ridge` trong `W.zones`, cấp khiên đá và tăng giáp cho Tản Sơn và đồng minh trong `tools/sim/engine.mjs` | `test("Toy 1: Tan Son passable jade ridge & solar aegis...")` | `SUPPORTED` |
| **Thái Dương Đông Sơn Trấn Áp (-25% Tốc đánh địch)** | `passive.solarAsSlow: 0.25`, `e.effects: [{slow: 0.25}]` | Đã tích hợp hàm tính tốc độ đánh `aspd()` giảm $25\%$ khi mục tiêu có cờ `solarSlowUntil > W.t` | `test("Toy 1: Tan Son passable jade ridge & solar aegis...")` | `SUPPORTED` |
| **Dậm Nứt Đất Đường Thẳng Q** | `q.aim: skillshot`, `width: 1.6`, `speed: 22`, `range: 6.5`, `damage`, `effects: [{slow: 0.35}]` | Đã mô phỏng sóng địa chấn thẳng và làm chậm $35\%$ mục tiêu trúng đòn | `tools/sim/run.mjs` (Duel & Teamfight) | `SUPPORTED` |
| **Tự Tạo Khiên & Vách Đá W (YAML rmb)** | `rmb.aim: self`, `shield: { base: [80..240], maxHp: 0.08, duration: 3.0 }` | Đã mô phỏng lớp khiên hấp thụ theo $8\%$ Max HP và tạo vật cản | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Sóng Xung Kích & Hào Quang E** | `e.aim: area`, `radius: 4.2`, `damage`, `effects: [{slow: 0.25}]` | Đã mô phỏng vùng ảnh hưởng hình tròn quanh tâm nhân vật và kích hoạt giảm tốc đánh | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Nhảy Bổ Địa Chấn Diện Rộng R** | `r.aim: area`, `range: 5.0`, `radius: 5.5`, `dash: {distance: 5.0}`, `stun: 1.0` | Đã mô phỏng lướt tới tâm chấn, gây choáng $1.0\text{s}$ diện rộng | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát $4.5\text{m}$ | Engine combat core | `SUPPORTED` |
| **Chặn đạn đạo động của vách núi trên không gian 3D** | Chặn các loại tên bay / phép đạn đạo của đối thủ | Simulator mô phỏng cản đường trên mặt phẳng 2D; chưa có raycast đạn đạo 3D thực tế | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Cắt lát NavMesh động khi vách núi trồi lên** | Điều hướng AI lính địch vòng qua vách núi | Simulator xử lý di chuyển theo vector khoảng cách; chưa bake NavMesh động | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo dữ liệu chạy cân bằng mô phỏng của bộ tướng Đỡ Đòn / Kiến Tạo (`tan_son`):
- **Phân khúc chỉ số:** Máu cơ bản $780$, Giáp $44$, Kháng phép $36$, hồi máu $2.0$ — thuộc top những tướng có chỉ số phòng ngự tự nhiên cao nhất game.
- **Tỷ lệ thắng trung bình (Mô hình 200 trận đối đầu):** Nằm trong biên độ chuẩn an toàn $49.2\% - 53.8\%$.
- **Đánh giá sức mạnh giao tranh tổng:** Tản Sơn phát huy giá trị cao nhất trong các pha combat chật hẹp ở hang Rồng / hang Boss nhờ khả năng chia cắt đội hình bằng W và mở combat bằng R.
- **Trang bị đề xuất đã kiểm chứng:** `[oathguard_plate, heartforge, iron_plate, bastion_stone, buoc_van]`.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Khả năng xử lý cắt lưới NavMesh động của Vách Núi Ngọc Bích trên engine Spawn runtime nhằm bảo đảm lính địch không bị kẹt vĩnh viễn (pathfinding glitch).
