# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #43 PHÙ ĐỔNG

**Tướng:** Phù Đổng (#43)  
**Vai trò:** Tiên phong Kỵ mã Thần thoại / Mở giao tranh càn quét (`vanguard` / `fighter`)  
**Tập tin ứng viên:** `tools/sim/candidates/phu_dong.yml`  
**Phiên bản mã nguồn mô phỏng:** `e2cff122c67b` (Chiến dịch: `reports/sim/production26/2026-10-12T07-21-06-914Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave2-gameplay-toys.test.mjs` — *Toy 1: Phu Dong mounted momentum & bamboo transformation* [0.83ms])  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 760 (+102/lv), AD 66 (+3.6/lv), Armor 40 (+4.2/lv), MR 34 (+1.8/lv), MS 6.4, AS 0.64 (+0.016/lv), HP Regen 1.8 (+0.16/lv). Tài nguyên: `none` (sử dụng thanh Xung Lượng Thiết Mã).
- **Tuning thử nghiệm:** `{ hp: 1.05, dmg: 0.96 }`.
- **Bộ trang bị chuẩn 5 món:** `oathguard_plate`, `heartforge`, `iron_plate`, `keeneye`, `bastion_stone`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — ĐÁNH GIÁ THEO CHUẨN TIÊN PHONG

*Quy định Doc 105 §S5: Đánh giá sự tương quan giữa khả năng mở giao tranh, tốc độ tiếp cận mục tiêu và độ bền bỉ trong combat dài hơi.*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Áp Đảo | Đối Thủ Thua Nặng | Phân Tích Cơ Học |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **55.0%** | Vạn Đao (100%), Bạch Diện (100%), Mặc Liên (100%) | Kha Tấn (0.5%), Mộc Lâm (3.0%), Hỏa Tùy (26.5%) | Sát thủ và đấu sĩ cận chiến không thể xuyên thủng giáp ngựa sắt; bị xạ thủ và pháp sư thả diều tầm xa |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **70.4%** | Vạn Đao (100%), Bạch Diện (100%), Mặc Liên (100%), Mộc Lâm (90.0%) | Kha Tấn (3.5%), Hỏa Tùy (29.0%) | Đạt đỉnh cao khi mở khóa R Thiên Lôi Cổ Trúc (lướt 5.5m, stun 1.0s) quét sạch tuyến sau |
| **Phút 10** | Cấp 9 / 2 trang bị | **59.1%** | Vạn Đao (100%), Mặc Liên (100%), Bạch Diện (93.0%) | Mộc Lâm (12.8%), Hỏa Tùy (19.5%), Kha Tấn (29.5%) | Độ trâu và lượng khiên RMB giúp trụ vững trước các đợt cấu rỉa |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **54.4%** | Vạn Đao (99.3%), Mặc Liên (100%), Kha Tấn (55.8%), Bạch Diện (55.0%) | Hỏa Tùy (5.0%), Mộc Lâm (11.5%) | Bắt đầu áp đảo cả xạ thủ Kha Tấn nhờ xung lượng tiếp cận 7.2m từ chiêu Q |
| **Phút 20** | Cấp 15 / 5 trang bị | **56.5%** | Mặc Liên (100%), Vạn Đao (78.3%), Kha Tấn (54.5%), Mộc Lâm (50.0%) | Hỏa Tùy (9.5%), Bạch Diện (46.5%) | Khắc chế cứng mọi sát thủ vật lý và xạ thủ thiếu cơ động |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **69.5%** | Kha Tấn (100%), Bạch Diện (100%), Mặc Liên (100%) | Hỏa Tùy (17.0%) [Hòa: Mộc Lâm 50%, Vạn Đao 50%] | Tiên phong thần thoại càn quét cực mạnh cuối trận |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank (Utility Metrics)

### 3.1. Giao Tranh Đội Nhỏ (Team Impact — Chỉ Số Vàng)
- **Đội hình 2v2:** Tỉ lệ thắng **70.9%** ($n=91$, CI95: 60.9% – 79.2%). Phù Đổng là đối tác mở giao tranh mạnh nhất Wave 2; chiêu Q húc văng kết hợp R sấm sét choáng 1.0s tạo tiền đề hoàn hảo cho đồng đội dồn sát thương.
- **Đội hình 3v3:** Tỉ lệ thắng **58.5%** ($n=171$, CI95: 51.0% – 65.6%). Khả năng càn lướt diện rộng chia cắt tuyến trước và tuyến sau kẻ địch.

### 3.2. Chịu Gank 1v2 (Gank Survival & Tankiness)
- **Phút 6 (Phù Đổng dẫn trước đồ):** Tỉ lệ thắng / lật kèo gank **16.3%** ($CI95: 13.9\% – 19.1\%$). Tỉ lệ cao kỷ lục nhờ lượng giáp cơ bản 40, khiên RMB 8% max HP và chiêu Q lướt thoát hiểm 7.2m.
- **Phút 10:** Thắng 0.9% trong thế bị 2 tướng áp sát.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst)

Mô phỏng chuỗi mở giao tranh: **Q (Thiết Mã Đột Kích lướt 7.2m) → Đánh thường có Xung Lượng (+50% bonus AD, stun 0.6s) → E (Lôi Hỏa Trảm chém vòng cung) → RMB (Kim Giáp bật khiên dậm móng) → R (Thiên Lôi Cổ Trúc càn quét 4.8m, stun 1.0s):**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 501 sát thương | **42.9% HP** | Chuẩn xác cho Đấu sĩ Tiên phong; không one-shot tanker |
| **Kha Tấn** | Phút 3 | 601 sát thương | **56.3% HP** | Đủ uy hiếp buộc xạ thủ phải giữ khoảng cách |
| **Vạn Đao** | Phút 3 | 632 sát thương | **48.9% HP** | Giao tranh cận chiến ngang ngửa |
| **Hỏa Tùy** | Phút 3 | 666 sát thương | **64.2% HP** | Ép pháp sư phải dùng Dash D hoặc Tốc Biến |
| **Bạch Diện** | Phút 3 | 634 sát thương | **59.6% HP** | Phản đòn hiệu quả trước sát thủ |
| **Mặc Liên** | Phút 3 | 666 sát thương | **72.5% HP** | Áp lực lớn lên hỗ trợ máu giấy |

*Kết luận Combo:* Tổng sát thương combo giai đoạn đầu dao động từ 42.9% đến 72.5% máu mục tiêu, đúng chuẩn thiết kế của một Vanguard càn lướt (lấy khống chế và độ trâu bò làm chủ đạo).

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Chịu đòn trụ solo (Tower Tanking):** Thời gian sống sót: **26.8 giây** (Trụ còn 26.2% máu). Khả năng chống chịu công trình đứng đầu Wave 2.
- **Ăn Boss Cổ Thần Long:** Đóng vai trò thu hút hỏa lực và cản phá quái vật hàng đầu trong các pha tranh chấp mục tiêu lớn.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **143 cờ**.
  - Các cờ cam phản ánh sự phân hóa tự nhiên trước các pháp sư kiểm soát tầm xa (Hỏa Tùy với tỉ lệ thắng 70-95% trước Phù Đổng do liên tục làm chậm ngắt nhịp tích đà chạy). Hoàn toàn phù hợp nguyên lý counterplay MOBA.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Địa hình và vách tường`: Chưa mô phỏng va chạm vật lý của mô hình Thiết Mã khi lướt xuyên rừng Mạch Giữa.
3. `Chuyển dạng tầm đánh Tre Thần`: Hiệu ứng mở rộng tầm đánh 3.5m của thế Cổ Trúc sau khi dùng R mới được mock logic, chưa có animation blend thực tế.
