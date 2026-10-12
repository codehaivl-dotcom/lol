# 05 · Mechanics Coverage — #43 Phù Đổng (Thiết Mã Thiên Tướng)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#43 / phu_dong`  
**File ứng viên YAML:** `tools/sim/candidates/phu_dong.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T07-21-06-914Z/phu_dong/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Tích tụ Xung Lượng khi chạy (+20% MS)** | `passive.momentumPerSec: 25`, `passive.bonusMsRatio: 0.20`, `maxMomentum: 100` | Đã tích hợp tăng tốc độ di chuyển theo `u.momentum` trong hàm `moveSpeed()` và nạp đà trong `tickDots()` của `tools/sim/engine.mjs` | `test("Toy 1: Phu Dong mounted momentum & bamboo transformation...")` | `SUPPORTED` |
| **Cú Húc Móng Sắt khi $\ge 80$ đà** | `passive.chargeStun: 0.6`, `passive.chargeBonusAd: 0.50` | Đã triển khai kiểm tra đà $\ge 80$ trong `autoAttack()`, gây thêm sát thương và áp dụng stun $0.6\text{s}$ kèm proc `passive:mounted_momentum_hit` | `test("Toy 1: Phu Dong mounted momentum & bamboo transformation...")` | `SUPPORTED` |
| **Thế Thiên Lôi Cổ Trúc quét rộng 3.5m** | Kích hoạt qua chiêu R, mở rộng tầm đánh `reach = 3.5m`, gây thêm $+35\%$ AD sát thương lan | Đã hỗ trợ bộ đếm `bambooUntil = t + 6.0` trong cast R và logic quét `passive:bamboo_sweep` trong `autoAttack()` | `test("Toy 1: Phu Dong mounted momentum & bamboo transformation...")` | `SUPPORTED` |
| **Lướt đâm đường thẳng Q** | `q.aim: skillshot`, `width: 1.6`, `speed: 24`, `range: 7.2`, `dash: {distance: 7.2}`, `damage`, `effects: [{slow: 0.3}]` | Đã mô phỏng lướt xuyên thấu tuyến tính và áp dụng làm chậm $30\%$ | `tools/sim/run.mjs` (Duel & Teamfight) | `SUPPORTED` |
| **Tự niệm Khiên W** | `rmb.aim: self`, `shield: { base, maxHp: 0.08, duration: 3.0 }` | Đã mô phỏng lớp khiên hấp thụ sát thương theo $8\%$ Max HP | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Quét xoay 360° E** | `e.aim: area`, `radius: 3.6`, `damage`, `effects: [{slow: 0.25}]` | Đã mô phỏng vùng ảnh hưởng hình tròn quanh tâm nhân vật | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Nhảy bổ nện đất diện rộng R** | `r.aim: area`, `range: 5.5`, `radius: 4.8`, `dash: {distance: 5.5}`, `stun: 1.0` | Đã mô phỏng lướt tới tâm chấn, gây choáng $1.0\text{s}$ và kích hoạt chuyển thế Cổ Trúc | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát | Engine combat core | `SUPPORTED` |
| **Quán tính bẻ lái (Turn Rate) khi chạy nhanh** | Góc quay đầu vật lý kỵ mã | Simulator mô phỏng vector phẳng đơn giản; chưa có góc bẻ lái động theo góc camera 3D | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Biến dạng lưới địa hình khi R nện đất** | Rãnh nứt đất 3D vật lý | Simulator chưa mô phỏng mesh deformation | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu, không có lỗi chặn).
- **Số cờ Đỏ (RED Flags):** `0` (Triệt tiêu toàn bộ lỗi sốc sát thương bất thường và vô hạn stack).
- **Số cờ Cam (ORANGE Flags):** `143` (Cảnh báo thông số điều chỉnh thông thường).
- **Tỷ lệ thắng đối đầu mẫu (Duel Rates qua các mốc thời gian):**
  - Phút 3 (Đầu trận): `55.0%`
  - Phút 6: `70.4%` (Cực mạnh khi mở combat sớm)
  - Phút 10: `59.1%`
  - Phút 15: `54.4%`
  - Phút 20: `56.5%`
  - Cuối trận (Full đồ): `69.5%`
  - *Nhận xét:* Phù Đổng thể hiện đúng vai trò Tiên Phong / Đấu Sĩ càn quét tiền tuyến (Vanguard / Initiator). Lối lên đồ đấu sĩ đỡ đòn (`oathguard_plate`, `heartforge`, `iron_plate`, `bastion_stone`) giúp Phù Đổng phát huy tối đa khả năng trụ vững giữa lòng giao tranh để xả sát thương quét Cổ Trúc $3.5\text{m}$.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Khả năng xử lý va chạm của kỵ mã khổng lồ (hitbox $0.75\text{m}$) khi luồn lách qua các hành lang rừng chật hẹp trên bản đồ 5v5 Spawn runtime.
