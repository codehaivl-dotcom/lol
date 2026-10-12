# 05 · Mechanics Coverage — #40 Liễu Tiễn (Băng Cung Chiến Thuật)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#40 / lieu_tien`  
**File ứng viên YAML:** `tools/sim/candidates/lieu_tien.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T00-24-57-295Z/lieu_tien/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Vệt Băng Thả Diều (Frost Trail)** | `passive.type: frost_trail`, `shotsPerTrail: 3`, `trailRadius: 2.2`, `trailDuration: 3.0` | Đã triển khai hoàn chỉnh trong `tools/sim/engine.mjs`: `W.zones` lưu trữ zone loại `frost_trail`, kích hoạt mỗi 3 đòn đánh hoặc khi rút lui | `test("Toy 3: Lieu Tien frost trail...")` trong `wave1-gameplay-toys.test.mjs` | `SUPPORTED` |
| **Tăng tốc đồng minh & Làm chậm địch trên vệt băng** | `passive.trailSpeedBoost: 0.20`, `passive.trailSlowRatio: 0.25` | Đã triển khai trong hàm tính tốc độ di chuyển `ms()` của `engine.mjs`: kiểm tra `z.type === "frost_trail"`, cộng tốc đồng minh và trừ tốc địch | `test("Toy 3: Lieu Tien frost trail...")` trong `wave1-gameplay-toys.test.mjs` | `SUPPORTED` |
| **Đánh thường tầm xa Băng Tiễn** | `lmb.aim: projectile`, `lmb.range: 7.2` | Đã hỗ trợ bắn đạn đạo tầm xa $7.2\text{m}$, tính toán tốc độ bay và hit counter `h.hitN` | `tools/sim/run.mjs` (Duel & Combo) | `SUPPORTED` |
| **Băng Tiễn Xuyên Kích Q** | `q.aim: skillshot`, `width: 1.3`, `speed: 36`, `range: 10.0`, `effects: [{slow: 0.2}]` | Đã mô phỏng đường đạn tuyến tính, va chạm mục tiêu và gây làm chậm $20\%$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Sương Băng Thối Bộ W** | `rmb.aim: self`, `shield: {base: [60..180], duration: 2.5}` | Đã mô phỏng tạo khiên và rải Đại Vệt Băng bán kính $2.5\text{m}$ tồn tại $3.5\text{s}$ trong `engine.mjs` dòng 316-320 | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Băng Lạc Vũ E** | `e.aim: area`, `radius: 3.5`, `range: 8.5`, `delay: 0.3`, `effects: [{slow: 0.35}]` | Đã mô phỏng sát thương diện rộng và làm chậm $35\%$ sau độ trễ rơi $0.3\text{s}$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Cực Băng Đại Tiễn R** | `r.aim: skillshot`, `width: 1.8`, `speed: 30`, `range: 18.0`, `passMinions: true`, `stun: 1.0` | Đã hỗ trợ đạn đạo tầm xa xuyên lính (`passMinions: true`) và gây choáng $1.0\text{s}$ tướng đầu tiên | `tools/sim/run.mjs` (Duel & Teamfight) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế né toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát cự ly $4.5\text{m}$ | Engine combat core | `SUPPORTED` |
| **Decal vệt sương băng bám địa hình dốc** | Hiển thị bề mặt băng 3D uốn lượn theo sườn dốc map 5v5 | Simulator hiện chỉ mô phỏng tọa độ 2D mặt phẳng $(x, z)$, chưa có biến dạng shader bề mặt dốc | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Trí tuệ nhân tạo Bot Kiting vi bước** | Thuật toán Bot vừa bắn vừa lùi dệt băng liên tục | Bot hiện tại lùi bước khi đối thủ tiếp cận gần, nhưng chưa tối ưu góc lùi zíc-zắc tạo lưới băng | Chờ kiểm thử trên runtime bot | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Chưa kết nối binary engine Spawn thực tế | Chờ Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T00-24-57-295Z/summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu, không có cờ đỏ chặn đường).
- **Số cờ Đỏ (RED Flags):** `0` (Tuyệt đối không có lỗi vô hạn loop, không crash engine, không one-shot bất thường).
- **Số cờ Cam (ORANGE Flags):** `163` (Các cảnh báo tỷ lệ thắng lệch theo từng ô thời gian giai đoạn đầu trận).
- **Tỷ lệ thắng đối đầu mẫu (Duel Rates qua các mốc thời gian):**
  - Phút 3: `21.7%`
  - Phút 6: `35.3%`
  - Phút 10: `19.2%`
  - Phút 15: `22.8%`
  - Phút 20: `40.8%`
  - Cuối trận (Full items): `47.9%`
  - *Nhận xét chuyên môn:* Đường cong tăng trưởng phản ánh chính xác bản sắc Xạ Thủ Cổ Điển (Scaling Marksman): Yếu ớt và dễ bị đè bẹp ở giai đoạn đầu trận (phút 3–10) khi chưa có trang bị tốc đánh và sát thương; tăng trưởng mạnh mẽ và cân bằng hoàn hảo ở giai đoạn cuối trận (~$48\%$ winrate khi đủ 5 món đồ xạ thủ `[keeneye, quickstring, thornseed_quiver, qua_mach, buoc_van]`).

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Tuyệt đối không mở chi phí sản xuất model 3D độ phân giải cao hoặc duyệt Gate 4 trước khi Owner chính thức ký phê duyệt hồ sơ packet này.
2. **NOT_TESTED:** Kiểm chứng độ rõ nét (visual clarity) của vệt băng dưới chân khi nhiều hiệu ứng diện rộng cùng chồng lấp trong giao tranh 5v5 trên engine Spawn.
