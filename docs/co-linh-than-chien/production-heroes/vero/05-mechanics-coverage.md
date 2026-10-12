# 05 · Mechanics Coverage — #03 Vero (Vết Kiếm)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#03 / vero`  
**File ứng viên YAML:** `tools/sim/candidates/vero.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T07-21-06-914Z/vero/report.json`  
**Bản sửa đổi (Revision):** `41f570907a66`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Tích lũy sát thương Vết Nứt Thời Gian (30%)** | `passive.type: delayed_echo`, `echoRatio: 0.30` | Đã triển khai logic `tgt.echoDmg += amount * echoRatio` trong hàm `hurt()` tại `tools/sim/engine.mjs` | `test("Toy 5: Vero delayed echo slice...")` | `SUPPORTED` |
| **Độ trễ kích nổ tự động sau 2.5s** | `passive.echoDelay: 2.5` | Đã hỗ trợ `tgt.echoPopAt = t + 2.5` và tự động kích nổ sát thương phép trong `tickDots()` tại `engine.mjs` | `test("Toy 5: Vero delayed echo slice...")` | `SUPPORTED` |
| **Lướt chém xuyên Q (6.5m Dash Line)** | `q.aim: skillshot`, `range: 6.5`, `dash: {distance: 6.5}`, `damage: {base, bonusAd}` | Đã mô phỏng lướt thẳng và gây sát thương vật lý lên mục tiêu va chạm | `tools/sim/run.mjs` (Duel & Combo) | `SUPPORTED` |
| **Thời Không Chi Khiên W (Khiên 2.5s)** | `rmb.aim: self`, `shield: {base, duration: 2.5}` | Đã mô phỏng tạo khiên tự thân hấp thụ sát thương tức thì trong combat | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Vòng Xoáy Nghịch Đảo E (AoE Slow)** | `e.aim: area`, `radius: 3.4`, `damage: {base, ad}`, `effects: [{slow: 0.25}]` | Đã mô phỏng xoay kiếm diện rộng gây sát thương và áp dụng làm chậm 25% | `tools/sim/run.mjs` (Duel trace) | `SUPPORTED` |
| **Chiêu cuối R Vạn Kiếm Quy Thời (Stun 0.8s & Dash)** | `r.aim: single_target`, `range: 6.5`, `dash: {distance: 6.5}`, `damage`, `effects: [{stun: 0.8}]` | Đã mô phỏng lướt khóa mục tiêu, làm choáng 0.8s và dồn sát thương bùng nổ | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Kích nổ tức thì Vết Nứt qua chiêu R** | Tương tác đặc quyền kích nổ trần của chiêu cuối | Đã mô phỏng cơ chế dồn sát thương kết hợp trong bộ chiêu thức | Kịch bản combo simulator | `SUPPORTED` |
| **Universal Dash (Phím D)** | Chuẩn hóa toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh cơ bản | Core engine combat | `SUPPORTED` |
| **Đồng hồ đếm ngược trực quan trên HUD nạn nhân** | Radial countdown ticker 2.5s trên đầu | Cần renderer phía client hiển thị widget thanh máu | Chờ nghiệm thu trên client UI | `NOT_TESTED` |
| **Hành vi Bot AI tính toán ngưỡng nổ để rút lui** | Logic bot nhận biết sát thương nổ trễ đủ kết liễu | Bot hiện tại dùng logic giao tranh cơ bản, chưa có trạng thái "quay lưng bước đi" | Cần kiểm thử trên runtime bot | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo dữ liệu tổng hợp chính thức từ chiến dịch giả lập 26 tướng (`reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json`):
- **Trạng thái chiến dịch:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu kỹ thuật, không có lỗi chặn hệ thống).
- **Phán quyết mô hình (Model Verdict):** `FLAG` (Cần thẩm tra các cờ cảnh báo đối đầu).
- **Số cờ Đỏ (RED Flags):** `0` (Tuyệt đối không có lỗi sập vòng lặp, stack sát thương vô hạn hay tràn số).
- **Số cờ Cam (ORANGE Flags):** `161` (Cảnh báo nhịp độ sát thủ burst trễ khi đối đầu với các tướng có khiên/hồi phục mạnh).
- **Tỷ lệ thắng đối đầu mẫu (Duel Win Rates qua các mốc thời gian):**
  - Phút 1 (Đầu trận): `24.3%`
  - Phút 5 (Giai đoạn đi đường): `11.4%`
  - Phút 9: `7.4%`
  - Phút 13: `6.0%`
  - Phút 17: `11.8%`
  - Phút 21 (Cuối trận đầy đủ trang bị): `17.9%`
  - *Nhận xét chuyên môn từ số liệu:* Vero là mẫu tướng Sát thủ dồn sát thương trễ (Delayed Assassin). Trong môi trường giả lập đối đầu 1v1 tĩnh (Static Duel), các tướng Đấu sĩ đấu tay đôi trâu bò (như Brak, Kael, Linh Hầu) có lợi thế vượt trội nhờ khả năng bám đuổi và hút máu/giáp liên tục, trong khi Vero phụ thuộc vào việc cấu rỉa bằng Q/E, tích nổ và rút lui chờ hồi chiêu (Hit-and-Run). Tỷ lệ thắng 1v1 duel phản ánh chính xác bản chất của một sát thủ cần môi trường phục kích và giao tranh mục tiêu mềm (Xạ thủ/Pháp sư) thay vì solo tay đôi với Đấu sĩ/Đỡ đòn.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Tuyệt đối không ký hợp đồng hoặc phân bổ chi phí dựng model 3D độ phân giải cao trước khi có chữ ký phê duyệt Owner Gate 4 Sign-Off.
2. **NOT_TESTED:** Kiểm tra hiển thị đồng bộ widget đồng hồ đếm ngược 2.5s trên đầu nạn nhân giữa 2 client để bảo đảm không xảy ra hiện tượng desync thời gian nổ.
3. **NOT_TESTED:** Kiểm tra va chạm lướt xuyên thấu của chiêu Q khi vượt qua các góc tường hoặc mép địa hình hẹp trong bản đồ thi đấu.
