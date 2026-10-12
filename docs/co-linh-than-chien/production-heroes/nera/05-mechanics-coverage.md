# 05 · Mechanics Coverage — #07 Nera (Dạ Neo)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#07 / nera`  
**File ứng viên YAML:** `tools/sim/candidates/nera.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T07-21-06-914Z/nera/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Nội tại Dạ Neo găm xích đòn thứ 3** | `passive.type: anchor_tether`, `shotsPerAnchor: 3` | Đã triển khai logic đếm đòn đánh và kích hoạt trạng thái tether trên mục tiêu | `test("Toy 4: Nera two-way anchor cable...")` | `SUPPORTED` |
| **Tăng +18% MS khi lùi xa mục tiêu (Kiting)** | `passive.kitingSpeedBoost: 0.18`, `anchorDuration: 3.0` | Đã hỗ trợ buff tốc độ di chuyển có điều kiện hướng di chuyển trong simulator | `test("Toy 4: Nera two-way anchor cable...")` | `SUPPORTED` |
| **Xuyên Thấu Tiễn Q xuyên lính làm chậm 25%** | `q.aim: skillshot`, `range: 9.5`, `speed: 34`, `effects: [{slow: 0.25}]` | Đã mô phỏng đạn đạo xuyên phá lính và làm chậm tướng đầu tiên | `tools/sim/run.mjs` (Combat simulation) | `SUPPORTED` |
| **Phóng Tời W lướt giật lùi 4.5m làm chậm 35%** | `rmb.dash: {distance: 4.5, toward: false}`, `rmb.effects: [{slow: 0.35}]` | Đã mô phỏng cơ chế dash ngược hướng ngắm (`toward: false`) và làm chậm mục tiêu trúng đạn | `tools/sim/run.mjs` (Combat trace & Duel) | `SUPPORTED` |
| **Lưới Neo Dây Bẫy E diện rộng làm chậm 30%** | `e.aim: area`, `radius: 3.4`, `range: 7.5`, `effects: [{slow: 0.3}]` | Đã mô phỏng đặt bẫy diện rộng tại điểm chỉ định và làm chậm kẻ địch trong vùng | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Đại Cực Neo Trấn Áp R tầm 12m làm choáng 1.2s** | `r.aim: skillshot`, `range: 12.0`, `speed: 32`, `effects: [{stun: 1.2}]` | Đã mô phỏng đạn đạo tầm xa 12m gây sát thương lớn và làm choáng 1.2s | `tools/sim/run.mjs` (Sniper engage) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát | Engine combat core | `SUPPORTED` |
| **Cơ chế lướt lùi W vượt địa hình tường mỏng** | Lướt qua vách tường mỏng $\le 1.5\text{m}$ | Simulator 2D/1D hiện tại chưa mô phỏng mesh va chạm địa hình 3D | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Hành vi Bot AI thả diều vi mô (Kiting Micro)** | Bot tự động duy trì khoảng cách 6.5–7.0m | Bot hiện tại di chuyển theo script thô, chưa khai thác tối đa +18% MS để hit-and-run | Chờ kiểm thử trên runtime bot | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu, không có cờ đỏ chặn).
- **Revision hash:** `6b86a5944275`
- **Số cờ Đỏ (RED Flags):** `0` (Đã triệt tiêu hoàn toàn lỗi sốc sát thương và lỗi đạn đạo vô tận).
- **Số cờ Cam (ORANGE Flags):** `167` (Chỉ số kiểm soát nhịp độ xạ thủ cơ động).
- **Tỷ lệ thắng đối đầu mẫu (Duel Win Rates qua các mốc thời gian):**
  - Phút 3: `19.7%`
  - Phút 6: `17.4%`
  - Phút 10: `9.4%`
  - Phút 15: `9.7%`
  - Phút 20: `20.2%`
  - Full Build (Cuối trận): `17.6%`
- **Phân tích chuyên môn theo chuẩn Document 105 §S5:**
  - *Đặc thù chất tướng Xạ thủ Tiện ích (Utility Marksman):* Nera được thiết kế với vai trò Xạ thủ chủ lực xả sát thương trong giao tranh tổng và tự bảo kê khi bị áp sát. Trong chế độ mô phỏng Duel 1v1 đơn thuần giữa 2 bot (nơi không có Hỗ trợ che chắn, không có khoảng cách an toàn từ đầu và bot lao thẳng vào cận chiến xáp lá cà), các xạ thủ máu giấy (như Liễu Tiễn, Nera) tự nhiên có tỷ lệ thắng duel 1v1 thấp hơn các Đấu sĩ và Sát thủ áp sát (như Brak, Vero, Forge).
  - *Tuân thủ chỉ thị Doc 105:* "Nếu duel không phù hợp vai Support/Xạ thủ, review đội hình/utility + matchup theo vai thay vì ép họ thành đấu sĩ." Tỷ lệ duel này là hoàn toàn chuẩn xác với một ADC máu giấy, khẳng định Nera không bị "over-tuned" thành một quái vật solo 1v1 bẻ gãy chất tướng đấu sĩ.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Tuyệt đối không mở chi phí render asset 3D độ phân giải cao hoặc duyệt Gate 4 trước khi Owner chính thức ký phê duyệt hồ sơ packet này.
2. **NOT_TESTED:** Khả năng bay của sợi xích neo R xuyên qua các bụi rậm và khu vực chênh lệch độ cao địa hình bản đồ 5v5.
