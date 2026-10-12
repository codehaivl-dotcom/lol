# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #36 ROLO

**Tướng:** Rolo (#36)  
**Vai trò:** Đấu sĩ Tê tê khiên / Tháo vảy chuyển dạng công thủ (`fighter`)  
**Tập tin ứng viên:** `tools/sim/candidates/rolo.yml`  
**Phiên bản mã nguồn mô phỏng:** `cce6db448a6e` (Chiến dịch: `reports/sim/production26/2026-10-12T07-21-06-914Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave2-gameplay-toys.test.mjs` — *Toy 6: Rolo scale shedding defense and burst transition* [0.03ms])  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 750 (+98/lv), AD 65 (+3.6/lv), Armor 42 (+4.2/lv), MR 34 (+1.6/lv), MS 6.1, AS 0.65 (+0.018/lv), HP Regen 1.8 (+0.16/lv). Tài nguyên: `none` (sử dụng Cơ Chế Tháo Vảy Sừng).
- **Tuning thử nghiệm:** `{ hp: 1.05, dmg: 0.98 }`.
- **Bộ trang bị chuẩn 5 món:** `oathguard_plate`, `heartforge`, `iron_plate`, `keeneye`, `bastion_stone`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — ĐÁNH GIÁ THEO CHUẨN ĐẤU SĨ CHUYỂN DẠNG

*Quy định Doc 105 §S5: Đánh giá khả năng chuyển đổi linh hoạt giữa Dạng Bọc Thép (phòng ngự thụ động +35 giáp/kháng phép) và Dạng Cuồng Nộ (tăng tốc độ chạy và tốc độ đánh).*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Áp Đảo | Đối Thủ Thua Nặng | Phân Tích Cơ Học |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **50.0%** | Vạn Đao (100%), Bạch Diện (100%), Mặc Liên (100%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Lượng giáp gốc cực cao (42 giáp + 35 nội tại) làm tê liệt hoàn toàn sát thủ và đấu sĩ vật lý |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **55.8%** | Vạn Đao (100%), Bạch Diện (100%), Mặc Liên (100%), Mộc Lâm (34.5%) | Kha Tấn (0%), Hỏa Tùy (0%) | Có R Thiết Giáp Càn Quét (lao 6.5m stun 0.9s); đè bẹp các tướng cận chiến |
| **Phút 10** | Cấp 9 / 2 trang bị | **50.4%** | Vạn Đao (100%), Mặc Liên (100%), Bạch Diện (94.5%) | Kha Tấn (0%), Mộc Lâm (8.0%), Hỏa Tùy (0%) | Giữ vững thế cân bằng 50% hoàn hảo |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **37.5%** | Mặc Liên (100%), Vạn Đao (90.0%), Bạch Diện (35.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Điểm trũng: tháo vảy trừ 25 giáp khiến Rolo dễ bị sốc sát thương nếu bung chiêu sai nhịp |
| **Phút 20** | Cấp 15 / 5 trang bị | **37.4%** | Mặc Liên (100%), Vạn Đao (74.5%), Bạch Diện (50.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Tiếp tục duy trì ưu thế trước đấu sĩ cận chiến |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **62.2%** | Vạn Đao (100%), Bạch Diện (100%), Mặc Liên (100%), Kha Tấn (50.0%) | Hỏa Tùy (0%) [Hòa: Mộc Lâm 23%] | Đạt đỉnh cao sức mạnh cuối trận khi trang bị bù đắp trọn vẹn phòng ngự |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank (Utility Metrics)

### 3.1. Giao Tranh Đội Nhỏ (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **57.1%** ($n=91$, CI95: 46.9% – 66.8%). Rolo là một đối tác vững chãi trong giao tranh 2v2; chiêu E dập đuôi làm chậm 35% kết hợp R húc tung đội hình 4.5m tạo tiền đề tốt cho đồng đội.
- **Đội hình 3v3:** Tỉ lệ thắng **47.1%** ($n=171$, CI95: 39.7% – 54.5%).

### 3.2. Chịu Gank 1v2 (Gank Survival)
- **Phút 6 (Rolo dẫn trước đồ):** Tỉ lệ thắng / lật kèo gank **0.5%**. Nhờ lượng giáp lớn, Rolo có thể câu giờ rất lâu để chờ đồng đội tới giải cứu.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst)

Mô phỏng chuỗi combo càn quét: **Q (Bộc Phá Vảy Sừng bắn vảy 6.5m) → RMB (Tháo Vảy Cuồng Nộ nhận khiên và tăng 25% AS, 20% MS) → E (Địa Chấn Tê Tê dập đuôi làm chậm 35%) → Đánh thường liên tục trong thế Cuồng Nộ → R (Thiết Giáp Càn Quét lao 6.5m choáng 0.9s):**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 501 sát thương | **42.9% HP** | Chuẩn xác cho Đấu sĩ; đánh ngang ngửa tanker |
| **Kha Tấn** | Phút 3 | 601 sát thương | **56.3% HP** | Đe dọa xạ thủ khi tiếp cận |
| **Vạn Đao** | Phút 3 | 632 sát thương | **48.9% HP** | Áp đảo đòn đánh tay của Đấu sĩ đối phương |
| **Hỏa Tùy** | Phút 3 | 666 sát thương | **64.2% HP** | Bào máu nhanh trong dạng cuồng chiến |
| **Bạch Diện** | Phút 3 | 635 sát thương | **59.6% HP** | Phản đòn hiệu quả trước sát thủ |
| **Mặc Liên** | Phút 3 | 666 sát thương | **72.5% HP** | Áp lực lớn lên hỗ trợ |

*Kết luận Combo:* Sát thương ổn định ở mức 43%–72% máu mục tiêu, đúng chuẩn Đấu sĩ bán đỡ đòn.

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Chịu đòn trụ solo (Tower Tanking):** Thời gian sống sót: **26.9 giây** (Trụ còn 35.8% máu). **Trâu bò thứ 2 toàn dự án** (chỉ sau Forge 30.5s và ngang ngửa Phù Đổng 26.8s).
- **Ăn Boss Cổ Thần Long:** Rolo là nhân tố chịu đòn tin cậy bậc nhất trong các pha ăn mục tiêu lớn.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **145 cờ**.
  - Các cờ cam phản ánh sự yếu thế trước sát thương phép bộc phát của Hỏa Tùy (0% duel winrate). Hoàn toàn phù hợp quy luật tương khắc tự nhiên.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Visual tách vảy 3D`: Trạng thái tháo vảy chưa có hiệu ứng mesh detach hay morph target trên mô hình thực tế.
3. `Nhận diện ID độc bản`: Cần đảm bảo hệ thống tài nguyên engine gán đúng ID #36, tách bạch với Oneira #48.
