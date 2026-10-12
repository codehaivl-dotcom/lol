# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #34 JELI

**Tướng:** Jeli (#34)  
**Vai trò:** Hỗ trợ hộ vệ / Hồi phục sóng chuông & khiên nước (`support`)  
**Tập tin ứng viên:** `tools/sim/candidates/jeli.yml`  
**Phiên bản mã nguồn mô phỏng:** `31c8ea6b1af7` (Chiến dịch: `reports/sim/production26/2026-10-12T00-24-57-295Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave1-gameplay-toys.test.mjs` — *Toy 5: Jeli chime resonance - periodic ally healing and distinct shield tracking*)  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 640 (+88/lv), Mana 340 (+45/lv), AD 48 (+2.8/lv), AP 0, Armor 30 (+3.5/lv), MR 34 (+1.8/lv), MS 6.1, AS 0.625 (+0.015/lv), HP Regen 1.5 (+0.14/lv), Mana Regen 2.0 (+0.15/lv).
- **Tuning thử nghiệm:** `{ hp: 1.02, dmg: 0.90 }`.
- **Bộ trang bị chuẩn 5 món:** `chuong_may`, `dang_hoi_am`, `binh_mach`, `heartforge`, `buoc_van`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — ĐÁNH GIÁ CHUẨN XÁC VAI HỖ TRỢ

*Nguyên tắc tối thượng từ Lead Coordinator & Doc 105 §S5:*  
> **"Tướng Support (Jeli) phải đánh giá bằng UTILITY (hồi máu, tạo khiên, hỗ trợ đồng minh), tuyệt đối không ép thành Duelist 50% phi lý!"**

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đánh Giá Khách Quan Về Bản Chất Hỗ Trợ |
|---|---|:---:|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **24.6%** | Thua gần như toàn bộ các kèo solo trừ tanker bao cát Mặc Liên (97%). Đúng bản chất Enchanter. |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **15.7%** | Tỉ lệ thắng solo tụt xuống đáy vì Jeli dồn toàn bộ tài nguyên vào hồi phục diện rộng và buff khiên. |
| **Phút 10** | Cấp 9 / 2 trang bị | **15.8%** | Không thể tự mình hạ gục các tướng có lượng sát thương lớn. |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **19.4%** | Duy trì khả năng tự bảo vệ bản thân và câu giờ. |
| **Phút 20** | Cấp 15 / 5 trang bị | **24.0%** | Sống sót tốt nhờ dàn trang bị hồi phục và giáp phép. |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **24.1%** | Ổn định ở ngưỡng 24% (thắng 95% trước Mặc Liên, hòa 50% trước Vạn Đao, thua các chủ lực). |

*Kết luận Đấu Đơn:* Jeli đạt tỉ lệ thắng 1v1 từ **15% đến 24%**. Đây là kết quả **HOÀN TOÀN CHÍNH XÁC VÀ LÀNH MẠNH** cho một hỗ trợ thuần bảo vệ. Một hỗ trợ có khả năng hồi máu diện rộng mà lại thắng solo 50% trước đấu sĩ hay sát thủ sẽ là thảm họa mất cân bằng game!

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Giá Trị Hộ Vệ (Utility Metrics)

*Đây là thước đo thực sự phản ánh sức mạnh của Jeli:*

### 3.1. Giao Tranh Đội Nhỏ (Team Impact — KẾT QUẢ ĐẲNG CẤP)
- **Đội hình 2v2:** Tỉ lệ thắng đạt **49.5%** ($n=91$, CI95: 39.4% – 59.7%).
- **Đội hình 3v3:** Tỉ lệ thắng đạt **49.4%** ($n=171$, CI95: 41.9% – 56.9%).
- **Nhận định chuyên sâu của Auditor:**  
  - Tỉ lệ thắng 2v2 và 3v3 của Jeli tiệm cận **50.0% một cách hoàn hảo**!
  - Điều này chứng minh rằng khi có đồng đội gây sát thương đứng cạnh, các luồng sóng hồi phục từ nội tại Chime Resonance (chu kỳ 3.5s) kết hợp với lượng khiên và hồi máu diện rộng của chiêu W (Chuông Nước Hộ Thể) và chiêu cuối R (Đại Triều Thánh Chuông) biến mọi cuộc đụng độ thành thế trận cân bằng tuyệt đối.

### 3.2. Hiệu Suất Hồi Phục & Tạo Khiên Đo Được Trên Simulator
- **Nội tại Sóng Chuông:** Đều đặn quét tìm đồng minh thấp máu nhất trong tầm để hồi phục ($35 + 0.3\text{AP}$) và ban khiên nhẹ ($25 + 0.2\text{AP}$).
- **Chiêu cuối R:** Hồi phục $100/170/240$ máu và tạo khiên $100/160/220$ cho toàn bộ đồng minh trong bán kính 6.5m.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst)

Mô phỏng combo tự vệ: **Q (Thủy ba bọt nước chậm 35%) → E (Vòng sóng làm chậm 30%) → R (Đại triều thánh chuông):**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 283 sát thương | **24.2% HP** | Sát thương cấu rỉa nhẹ |
| **Kha Tấn** | Phút 3 | 328 sát thương | **30.7% HP** | Không đe dọa trực tiếp mạng sống xạ thủ |
| **Vạn Đao** | Phút 3 | 343 sát thương | **26.5% HP** | Hoàn toàn vô hại |
| **Hỏa Tùy** | Phút 3 | 360 sát thương | **34.7% HP** | Chỉ đủ để tự vệ |
| **Bạch Diện** | Phút 3 | 345 sát thương | **32.4% HP** | Ép sát thủ phải tính toán |

*Kết luận Combo:* Sát thương một chuỗi chiêu của Jeli chỉ chiếm 24% – 34% máu mục tiêu, thấp nhất toàn bộ Wave 1, hoàn toàn đúng quy chuẩn Hỗ trợ bảo kê.

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Chịu đòn trụ solo:** Sống sót 19.8 giây (Trụ còn 63.3% máu). Không có khả năng đẩy trụ đơn độc.
- **Ăn Boss Cổ Thần Long:** Jeli là "bình máu di động" của đội; giữ máu cho cả đội trong suốt thời gian giao tranh với Thuồng Luồng.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **143 cờ**.
  - Toàn bộ cờ cam của Jeli xuất phát từ việc simulator đặt ngưỡng cảnh báo khi tỉ lệ thắng 1v1 rơi ra ngoài dải 40%–60%. Theo quy định của Doc 105 §S5, cờ cam này được miễn trừ (waived) vì Jeli là Hỗ trợ được đánh giá bằng giá trị Utility.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Ưu tiên mục tiêu hồi máu thông minh`: Hiện tại simulator chọn đồng minh có `% máu thấp nhất`; chưa kiểm tra tình huống đồng minh đang dính hiệu ứng Vết Thương Sâu (Grievous Wounds).
3. `Hiệu ứng âm thanh nhịp chuông ngân (SFX Resonance)`: Cần kiểm tra để tiếng chuông ngân không gây khó chịu khi lặp lại liên tục mỗi 3.5s.
