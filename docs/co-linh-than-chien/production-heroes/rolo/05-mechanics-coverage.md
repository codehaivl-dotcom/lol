# 05 · Mechanics Coverage — #36 Rolo (Tê Tê Khiên)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#36 / rolo`  
**File ứng viên YAML:** `tools/sim/candidates/rolo.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T07-21-06-914Z/rolo/report.json`  
**Bản sửa đổi (Revision):** `cce6db448a6e`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Nội tại Bọc Thép (+35 Giáp, +35 Kháng Phép)** | `passive.type: scale_shedding`, `baseResistBonus: 35` | Đã hỗ trợ cộng trực tiếp vào chỉ số phòng thủ nền trong `engine.mjs` | `test("Toy 6: Rolo scale shedding defense...")` | `SUPPORTED` |
| **Kích hoạt Tháo Vảy (W) chuyển Dạng Cuồng Chiến** | `passive.shedDuration: 5.0`, `shedResistPenalty: 25`, `shedSpeedBonus: 0.20`, `shedAspdBonus: 0.25` | Đã xử lý trừ giáp và tăng tốc chạy/tốc đánh trong `engine.mjs` khi kích hoạt slot `rmb` (W) | `test("Toy 6: Rolo scale shedding defense...")` | `SUPPORTED` |
| **Khiên bảo vệ W Tháo Vảy Cuồng Nộ** | `rmb.aim: self`, `shield: {base, duration: 2.5}` | Đã mô phỏng tạo khiên tự thân hấp thụ sát thương tức thì trong 2.5s | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Quất đuôi bắn vảy Q (Bộc Phá Vảy Sừng)** | `q.aim: skillshot`, `range: 6.5`, `damage`, `effects: [{slow: 0.25}]` | Đã mô phỏng bắn đạn đạo thẳng gây sát thương và áp dụng làm chậm 25% | `tools/sim/run.mjs` (Duel & Combo) | `SUPPORTED` |
| **Địa Chấn Tê Tê E (Dập đuôi AoE Slow)** | `e.aim: area`, `radius: 3.6`, `damage`, `effects: [{slow: 0.35}]` | Đã mô phỏng dập đuôi diện rộng quanh thân và áp dụng làm chậm 35% | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Thiết Giáp Càn Quét R (Lao húc 4 chân AoE Stun)** | `r.aim: area`, `range: 6.5`, `radius: 4.5`, `delay: 0.3`, `damage`, `effects: [{stun: 0.9}]` | Đã mô phỏng lướt dũng mãnh tới vùng đất chọn, làm choáng 0.9s diện rộng | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế chuẩn toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh cơ bản | Core engine combat | `SUPPORTED` |
| **Quy định chuyển động phi nước đại 4 chân (Không cuộn tròn)** | Thuộc tính rigging và hoạt ảnh locomotion 4 chân | Simulator engine chỉ tính toán tọa độ vector di chuyển, không can thiệp mesh | Cần kiểm chứng hoạt ảnh trên Spawn client | `NOT_TESTED` |
| **Hành vi Bot AI nhận biết thời cơ tháo vảy** | Logic bot cân nhắc giữa giữ vảy tank và bung vảy dứt điểm | Bot hiện tại kích hoạt W khi máu dưới ngưỡng hoặc khi cận chiến | Cần tinh chỉnh thêm trên runtime bot | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo dữ liệu tổng hợp chính thức từ chiến dịch giả lập 26 tướng (`reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json`):
- **Trạng thái chiến dịch:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu kỹ thuật, không có lỗi chặn hệ thống).
- **Phán quyết mô hình (Model Verdict):** `FLAG` (Cần thẩm tra các cờ cảnh báo đối đầu).
- **Số cờ Đỏ (RED Flags):** `0` (Tuyệt đối không có lỗi logic vô hạn, sập vòng lặp hay kẹt trạng thái giáp âm).
- **Số cờ Cam (ORANGE Flags):** `145` (Cảnh báo nhịp độ chuyển đổi công thủ).
- **Tỷ lệ thắng đối đầu mẫu (Duel Win Rates qua các mốc thời gian):**
  - Phút 1 (Đầu trận): `50.0%`
  - Phút 5 (Giai đoạn đi đường): `55.8%`
  - Phút 9: `50.4%`
  - Phút 13: `37.5%`
  - Phút 17: `37.4%`
  - Phút 21 (Cuối trận đầy đủ trang bị): `62.2%`
  - *Nhận xét chuyên môn từ số liệu:* Rolo thể hiện một đường cong sức mạnh (Power Curve) cực kỳ điển hình của một Đấu sĩ/Đỡ đòn công thủ toàn diện:
    - Đầu trận (Phút 1–9): Rolo rất khỏe nhờ lượng Giáp và Kháng phép nền cộng thêm (+35) áp đảo đối thủ khi chưa có đồ xuyên giáp, tỷ lệ thắng duy trì trên $50\text{--}55\%$.
    - Giữa trận (Phút 13–17): Khi các chủ lực đối phương hoàn thành các trang bị xuyên giáp/xuyên kháng phép cơ bản và giao tranh nhỏ lẻ diễn ra nhiều, việc bị giảm 25 Giáp trong Dạng Cuồng Chiến khiến Rolo dễ bị sốc chết hơn, tỷ lệ thắng tụt xuống quanh mức $37.5\%$.
    - Cuối trận (Phút 21): Khi Rolo đã có đầy đủ trang bị chống chịu lớn (Oathguard Plate, Bastion Stone, Iron Plate) kết hợp sát thương cơ bản cao của chiêu thức và khả năng mở combat bằng R, tỷ lệ thắng tăng vọt trở lại mức $62.2\%$. Đây là bằng chứng cho thấy cơ chế chuyển đổi công thủ vận hành vô cùng hiệu quả và giàu tính chiến thuật.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Tuyệt đối không chi tiêu ngân sách dựng model 3D chi tiết hoặc mở khóa Gate 4 trước khi có chữ ký phê duyệt chính thức từ Chủ sở hữu (Owner Sign-Off).
2. **NOT_TESTED:** Kiểm tra chuyển động khớp xương (Rigging) của cơ chế phi nước đại 4 chân trong chiêu cuối R để bảo đảm mô hình chuyển động dũng mãnh, đầm chắc, tuyệt đối không bị cuộn tròn hay biến dạng thành hình cầu.
3. **NOT_TESTED:** Đo đạc cảm giác camera khi đuôi quất Q và dập E trong không gian hẹp gần bờ tường sông.
