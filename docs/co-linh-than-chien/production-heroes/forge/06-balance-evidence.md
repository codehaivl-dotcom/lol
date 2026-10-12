# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #17 FORGE

**Tướng:** Forge (#17)  
**Vai trò:** Đỡ đòn lò nung / Lao vào mở giao tranh (`tank_engage`)  
**Tập tin ứng viên:** `tools/sim/candidates/forge.yml`  
**Phiên bản mã nguồn mô phỏng:** `3f7bf9b09f76` (Chiến dịch: `reports/sim/production26/2026-10-12T00-24-57-295Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave1-gameplay-toys.test.mjs` — *Toy 4: Forge heat gauge - damage intake heating, bonus resist & heat vent*)  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 780 (+112/lv), AD 56 (+3.2/lv), Armor 44 (+4.8/lv), MR 34 (+1.8/lv), MS 6.0, AS 0.62 (+0.016/lv), HP Regen 1.9 (+0.18/lv). Tài nguyên: `none` (sử dụng thanh Nhiệt Lò Nung).
- **Tuning thử nghiệm:** `{ hp: 1.10, dmg: 0.92 }`.
- **Bộ trang bị chuẩn 5 món:** `oathguard_plate`, `heartforge`, `iron_plate`, `an_tinh`, `buoc_van`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — ĐÁNH GIÁ THEO CHUẨN ĐỠ ĐÒN

*Quy định Doc 105 §S5 & Hướng dẫn Lead: Tướng Đỡ đòn không bị ép phải đạt 50% duel thuần túy với mọi chất tướng, mà đánh giá sự tương quan giữa khả năng chịu đòn và áp lực khống chế.*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Áp Đảo | Đối Thủ Thua Nặng | Phân Tích Cơ Học |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **44.2%** | Vạn Đao (100%), Mặc Liên (100%) | Kha Tấn (1%), Hỏa Tùy (1%) | Cực kỳ trâu bò trước sát thương vật lý cận chiến; bị cấu rỉa phép tầm xa |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **57.1%** | Bạch Diện (93%), Vạn Đao (83%), Mặc Liên (100%) | Kha Tấn (0%), Hỏa Tùy (18%) | Đạt đỉnh cao khi có R Đại Bộc Phá Lò Cổ (choáng 1.1s diện rộng) |
| **Phút 10** | Cấp 9 / 2 trang bị | **45.6%** | Mặc Liên (100%), Bạch Diện (59%) | Kha Tấn (5%), Hỏa Tùy (10%) | Khả năng tích nhiệt xả khiên giúp giữ thế trận cân bằng |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **59.5%** | Bạch Diện (94%), Kha Tấn (57%), Mặc Liên (100%) | Hỏa Tùy (6%) | Chống chịu cực tốt; bắt đầu đè bẹp cả xạ thủ Kha Tấn nhờ lượng giáp lớn |
| **Phút 20** | Cấp 15 / 5 trang bị | **55.2%** | Bạch Diện (97%), Vạn Đao (50%), Mặc Liên (100%) | Hỏa Tùy (4%), Kha Tấn (30%) | Pháo đài thép tiền tuyến; trừng phạt sát thủ vật lý |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **49.4%** | Bạch Diện (51%), Vạn Đao (50%), Mặc Liên (100%) | Hỏa Tùy (3%), Kha Tấn (43%) | Cân bằng hoàn hảo quanh mốc 50% |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank (Utility Metrics)

### 3.1. Giao Tranh Đội Nhỏ (Team Impact — Chỉ Số Vàng)
- **Đội hình 2v2:** Tỉ lệ thắng **64.3%** ($n=91$, CI95: 54.3% – 73.2%). Forge là đối tác mở giao tranh số một của Wave 1. Q hất văng (0.8s stun) kết hợp R chấn động (1.1s stun) tạo tiền đề hạ gục tức thì.
- **Đội hình 3v3:** Tỉ lệ thắng **58.5%** ($n=171$, CI95: 51.0% – 65.7%). Khả năng xả áp suất nổ nhiệt diện rộng chiêu E và R chia cắt hoàn toàn đội hình đối phương.

### 3.2. Chịu Gank 1v2 (Gank Survival & Tankiness)
- **Phút 6 (Forge dẫn trước đồ):** Tỉ lệ thắng / lật kèo gank **7.1%** ($CI95: 5.5\% – 9.2\%$). **Cao nhất toàn bộ Wave 1!** Khi bị 2 tướng đánh hội đồng, thanh nhiệt của Forge tăng vọt lên 100 cực nhanh, xả áp suất W tạo lượng khiên khổng lồ giúp Forge câu giờ hoặc phản sát thương hạ gục 1 tướng.
- **Phút 10:** Thắng 0.1% trong thế bị 2 tướng áp sát.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst)

Mô phỏng chuỗi mở giao tranh: **Q (Đột kích lò nung hất văng) → R (Đại bộc phá chấn động 1.1s) → E (Phun hơi quạt lửa) → RMB (Xả nhiệt tạo khiên nổ):**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 368 sát thương | **31.5% HP** | Chuẩn xác cho Đỡ đòn; không cướp sát thương của Đấu sĩ |
| **Kha Tấn** | Phút 3 | 422 sát thương | **39.5% HP** | Giữ chân tốt nhưng không tự mình one-shot xạ thủ |
| **Vạn Đao** | Phút 3 | 439 sát thương | **34.0% HP** | Hoàn toàn hợp lý |
| **Hỏa Tùy** | Phút 3 | 460 sát thương | **44.3% HP** | Đủ uy hiếp để ép pháp sư bấm Tốc biến/Dash D |
| **Bạch Diện** | Phút 3 | 442 sát thương | **41.6% HP** | Ngắt nhịp combo của sát thủ |

*Kết luận Combo:* Tổng sát thương dồn của Forge dao động từ 31% đến 44% máu mục tiêu, đúng chuẩn thiết kế của một Vanguard/Engage Tank (lấy hiệu ứng khống chế và độ trâu bò làm chủ đạo).

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Chịu đòn trụ solo (Tower Tanking):**
  - Thời gian sống sót: **30.5 giây** (Trụ còn 32.8% máu). **Bền bỉ nhất Wave 1**, minh chứng cho lượng giáp gốc (44 giáp) và cơ chế xả nhiệt tạo khiên cực mạnh.
- **Ăn Boss Cổ Thần Long:** Forge là nhân tố không thể thiếu để đứng chặn đòn cắn quét của Thuồng Luồng trong các đợt ăn mục tiêu lớn.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **132 cờ**.
  - Không có cờ đỏ nào về logic hoặc chỉ số. Các cờ cam phản ánh điểm yếu chiến thuật cố hữu trước Pháp sư cấu rỉa phép (Hỏa Tùy với 80-90% tỉ lệ thắng trước Forge). Điều này hoàn toàn lành mạnh cho hệ sinh thái Counter-Pick của MOBA.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Va chạm kích thước mô hình (Capsule Radius)`: Forge có mô hình đồ sộ; cần kiểm tra va chạm để không bị kẹt ở các lối đi hẹp trong rừng map Mạch Giữa.
3. `Hiệu ứng thị giác nhiệt độ (Heat Emission VFX)`: Thanh nhiệt chưa được render trực quan trên HUD máu runtime.
