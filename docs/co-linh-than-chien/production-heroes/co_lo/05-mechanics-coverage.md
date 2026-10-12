# 05 · Mechanics Coverage — #47 Cổ Lỗ (Huyền Quy Thần Cơ Sư)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#47 / co_lo`  
**File ứng viên YAML:** `tools/sim/candidates/co_lo.yml`  
**Kiểm thử đơn vị tự động:** `tools/test/wave3-gameplay-toys.test.mjs`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Cắm Chốt Mở Rộng Tầm 8.5m & Bất Động** | `passive.siegeRange: 8.5`, `siegeArmorBonus: 40`, `siegeMrBonus: 40` | Đã hỗ trợ cờ `cl.siegeUntil`, đặt `ms(cl, W.t) = 0` và tăng tầm đánh trong `autoAttack()` của `tools/sim/engine.mjs` | `test("Toy 4: Co Lo siege stance range expansion & melee blindspot...")` | `SUPPORTED` |
| **Vùng Mù Cận Chiến 2.5m Khi Cắm Chốt** | `passive.blindspotRadius: 2.5` | Đã triển khai kiểm tra cự ly $< 2.5\text{m}$ trả về `false` trong `autoAttack()` khi đang ở trạng thái cắm chốt | `test("Toy 4: Co Lo siege stance range expansion & melee blindspot...")` | `SUPPORTED` |
| **Liên Châu Xuyên Kích Q (3 mũi tên)** | `q.aim: skillshot`, `range: 8.5`, `speed: 32`, `hits: 3`, `damage` | Đã mô phỏng chùm 3 mũi tên liên tiếp và áp dụng làm chậm $20\%$ | `tools/sim/run.mjs` (Duel & Teamfight) | `SUPPORTED` |
| **Cắm Chốt Huyền Quy W (YAML rmb) Cấp Khiên** | `rmb.aim: self`, `shield: { base: [70..210], duration: 3.0 }` | Đã mô phỏng lớp khiên hấp thụ và chuyển dạng pháo đài | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Thần Cơ Kích Thoái Đẩy Lùi Cận Chiến E** | `e.aim: skillshot`, `range: 5.0`, `knockback: 3.5`, `damage` | Đã mô phỏng đẩy lùi $3.5\text{m}$ thoát khỏi vùng mù và làm chậm $30\%$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Vạn Tiễn Quy Tông Siêu Xa 12.0m R** | `r.aim: area`, `range: 12.0`, `radius: 4.5`, `damage`, `effects: [{slow: 0.4}]` | Đã mô phỏng bão tiễn tầm xa, sát thương diện rộng và làm chậm $40\%$ | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D) Hủy Cắm Chốt** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát $4.5\text{m}$ và ngắt trạng thái cắm chốt | Engine combat core | `SUPPORTED` |
| **Giới hạn tốc độ xoay nòng (Pivot Rate)** | Góc quay nòng nỏ $180^\circ/\text{s}$ trên không gian 3D | Simulator xử lý góc quay tức thời; chưa giới hạn vận tốc góc xoay xương | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Giảm 50% sát thương lên công trình khi cắm chốt** | Áp trần sát thương lên Trụ / Nhà lính | Simulator hiện tại tập trung trận đấu tướng với tướng (Duel / Teamfight) | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo dữ liệu chạy cân bằng mô phỏng của bộ tướng Xạ Thủ Pháo Đài (`co_lo`):
- **Phân khúc chỉ số:** Máu cơ bản $600$, Sát thương vật lý $64$ ($+4.0$/lv), Giáp $28$ ($+40$ khi cắm chốt = $68$), Kháng phép $30$ ($+40$ khi cắm chốt = $70$).
- **Đặc tính chiến đấu:** Khả năng gây sát thương từ xa cực kỳ áp đảo khi được bảo kê tốt; nhưng tỷ lệ tử vong tăng vọt nếu bị sát thủ áp sát vào vùng mù $2.5\text{m}$.
- **Tỷ lệ thắng trung bình (Mô hình 200 trận đối đầu):** Nằm trong biên độ chuẩn an toàn $48.8\% - 52.4\%$.
- **Trang bị đề xuất đã kiểm chứng:** `[keeneye, quickstring, thornseed_quiver, qua_mach, buoc_van]`.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Khả năng kiểm soát vùng mù cận chiến $2.5\text{m}$ bằng con trỏ chuột trong giao tranh nhiều mục tiêu hỗn loạn trên Spawn runtime (Smart targeting override).
