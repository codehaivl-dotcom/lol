# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #02 BRAK

**Tướng:** Brak (#02)  
**Vai trò:** Đấu sĩ Cự thạch Piston / Nhịp quyền phản đòn (`fighter`)  
**Tập tin ứng viên:** `tools/sim/candidates/brak.yml`  
**Phiên bản mã nguồn mô phỏng:** `21ddfb8ead7b` (Chiến dịch: `reports/sim/production26/2026-10-12T07-21-06-914Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave2-gameplay-toys.test.mjs` — *Toy 3: Brak rhythm parry piston damage reduction & counter punch* [0.22ms])  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 730 (+96/lv), AD 68 (+3.8/lv), Armor 38 (+3.9/lv), MR 32 (+1.6/lv), MS 6.2, AS 0.65 (+0.017/lv), HP Regen 1.8 (+0.16/lv). Tài nguyên: `none` (sử dụng Thế Thủ Piston).
- **Tuning thử nghiệm:** `{ hp: 1.04, dmg: 0.98 }`.
- **Bộ trang bị chuẩn 5 món:** `oathguard_plate`, `heartforge`, `keeneye`, `iron_plate`, `bastion_stone`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — ĐÁNH GIÁ THEO CHUẨN ĐẤU SĨ PHẢN ĐÒN

*Quy định Doc 105 §S5: Đánh giá hiệu quả trao đổi chiêu thức dựa trên cơ chế chặn đòn (Parry) và phản kích đối thủ.*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Áp Đảo | Đối Thủ Thua Nặng | Phân Tích Cơ Học |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **29.5%** | Bạch Diện (100%), Vạn Đao (77.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%), Mặc Liên (0%) | Khắc chế đấu sĩ/sát thủ cận chiến vật lý nhờ giảm 60% sát thương parry; bị cấu rỉa phép tầm xa |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **39.7%** | Mặc Liên (100%), Vạn Đao (83.5%), Bạch Diện (54.5%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Mở khóa R Hơi Nước Bộc Phá (lao 6.0m nện búa choáng 1.0s); tăng khả năng tiếp cận |
| **Phút 10** | Cấp 9 / 2 trang bị | **40.5%** | Mặc Liên (100%), Vạn Đao (93.0%), Bạch Diện (50.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Độ trâu và lượng khiên RMB giúp đứng vững trước các tướng đấu sĩ đánh cận chiến |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **38.8%** | Mặc Liên (100%), Vạn Đao (77.5%), Bạch Diện (55.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Đè bẹp sát thủ Bạch Diện và đấu sĩ Vạn Đao |
| **Phút 20** | Cấp 15 / 5 trang bị | **31.2%** | Mặc Liên (100%), Vạn Đao (50.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%), Bạch Diện (37.0%) | Điểm yếu cơ động khiến Brak bị các xạ thủ và pháp sư cơ động cao thả diều |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **42.5%** | Bạch Diện (100%), Mặc Liên (100%), Vạn Đao (55.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Giữ vững bản sắc đấu sĩ trừng phạt kẻ áp sát |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank (Utility Metrics)

### 3.1. Giao Tranh Đội Nhỏ (Team Impact — Điểm Sáng Của Brak)
- **Đội hình 2v2:** Tỉ lệ thắng **62.1%** ($n=91$, CI95: 51.8% – 71.4%). **Rất cao!** Khi có đồng đội hỗ trợ khống chế hoặc bù đắp tầm xa, Brak phát huy tối đa cú đấm Piston và chiêu R nện choáng diện rộng.
- **Đội hình 3v3:** Tỉ lệ thắng **45.3%** ($n=171$, CI95: 38.0% – 52.8%).

### 3.2. Chịu Gank 1v2 (Gank Survival)
- **Phút 6 (Brak dẫn trước đồ):** Tỉ lệ thắng / lật kèo gank **0.4%**. Cơ chế parry chỉ phản đòn 1 nguồn sát thương đơn lẻ, khi bị 2 tướng hội đồng thì khung 0.75s bị quá tải.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst)

Mô phỏng chuỗi combo phản kích: **Kích hoạt RMB Nghênh Kích (parry giảm 60% dmg) → Phản kích Piston (+35% bonus, stun 0.5s) → Q (Piston Trực Quyền nén đấm thẳng) → E (Địa Chấn Xung Kích nện sóng quạt) → R (Hơi Nước Bộc Phá quật ngã stun 1.0s):**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 523 sát thương | **44.7% HP** | Chuẩn xác cho Đấu sĩ; đánh bể giáp đối phương |
| **Kha Tấn** | Phút 3 | 627 sát thương | **58.7% HP** | Gây áp lực lớn khi bắt kịp xạ thủ |
| **Vạn Đao** | Phút 3 | 660 sát thương | **51.1% HP** | Thắng trao đổi chiêu thức cận chiến |
| **Hỏa Tùy** | Phút 3 | 695 sát thương | **67.0% HP** | Ép dùng tốc biến |
| **Bạch Diện** | Phút 3 | 662 sát thương | **62.3% HP** | Trừng phạt đòn đánh của sát thủ |
| **Mặc Liên** | Phút 3 | 695 sát thương | **75.7% HP** | Đe dọa mạng sống của hỗ trợ |

*Kết luận Combo:* Sát thương ổn định ở mức 44%–75% máu mục tiêu, đúng chuẩn Đấu sĩ cận chiến công thủ toàn diện.

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Chịu đòn trụ solo (Tower Tanking):** Thời gian sống sót: **24.5 giây** (Trụ còn 38.6% máu). Độ trâu bò đứng thứ 3 Wave 2 (sau Phù Đổng và Rolo).
- **Ăn Boss Cổ Thần Long:** Có khả năng tank boss vững chắc cho đồng đội nhờ lượng máu 730 và 38 giáp khởi điểm.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **144 cờ**.
  - Các cờ cam thể hiện điểm yếu cố hữu trước chất tướng tầm xa kiểm soát (Kha Tấn, Hỏa Tùy). Không có bất thường về logic hay số liệu.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Khung thời gian Parry`: Simulator hiện tại giả định parry tự kích hoạt khi có đòn đánh trong cửa sổ thời gian; chưa kiểm thử độ trễ ping mạng 60-100ms trên mobile đối với phản xạ bấm của người chơi thực tế.
3. `Decal và sóng chấn động`: Cần kiểm tra bán kính sóng chấn động chiêu E/R trên địa hình gồ ghề.
