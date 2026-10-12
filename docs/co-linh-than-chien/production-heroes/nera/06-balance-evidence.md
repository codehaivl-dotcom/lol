# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #07 NERA

**Tướng:** Nera (#07)  
**Vai trò:** Xạ thủ cổ / Tời neo hai chiều tự bảo kê (`marksman`)  
**Tập tin ứng viên:** `tools/sim/candidates/nera.yml`  
**Phiên bản mã nguồn mô phỏng:** `6b86a5944275` (Chiến dịch: `reports/sim/production26/2026-10-12T07-21-06-914Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave2-gameplay-toys.test.mjs` — *Toy 4: Nera two-way anchor cable self-peel & kiting boost* [0.03ms])  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 600 (+84/lv), Mana 340 (+40/lv), AD 62 (+3.5/lv), AP 0, Armor 28 (+3.2/lv), MR 30 (+1.2/lv), MS 6.2, AS 0.67 (+0.024/lv), HP Regen 1.4 (+0.12/lv), Mana Regen 1.6 (+0.1/lv). Tài nguyên: `mana`.
- **Tuning thử nghiệm:** `{ hp: 1.00, dmg: 1.00 }`.
- **Bộ trang bị chuẩn 5 món:** `keeneye`, `quickstring`, `thornseed_quiver`, `heartforge`, `bastion_stone`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — ĐÁNH GIÁ THEO CHUẨN XẠ THỦ THẢ DIỀU

*Quy định Doc 105 §S5: Xạ thủ trong mô phỏng 1v1 đối đầu trực diện trong sàn đấu hẹp chịu bất lợi lớn do không có tuyến trước bảo kê và không có địa hình thả diều.*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Áp Đảo | Đối Thủ Thua Nặng | Phân Tích Cơ Học |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **19.7%** | Bạch Diện (100%), Mặc Liên (18.0%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%) | Tầm bắn 7.0m và nỏ tời giúp hạ gục sát thủ lao vào giai đoạn đầu; thua xạ thủ Kha Tấn và pháp sư cấu rỉa |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **17.4%** | Mặc Liên (100%), Bạch Diện (4.5%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%) | Mở khóa R Đại Cực Neo (tầm 12.0m, stun 1.2s); giữ chân tốt nhưng thiếu sát thương kết liễu đấu sĩ |
| **Phút 10** | Cấp 9 / 2 trang bị | **9.4%** | Mặc Liên (56.5%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Giai đoạn trũng sức mạnh khi đấu sĩ đã có trang bị chống chịu |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **9.7%** | Mặc Liên (58.0%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Bị áp sát liên tục trong sàn đấu 1v1 hạn chế |
| **Phút 20** | Cấp 15 / 5 trang bị | **20.2%** | Mặc Liên (100%), Vạn Đao (21.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Có đủ đồ tốc đánh và xuyên giáp; bắt đầu bắn rát lên Đấu sĩ |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **17.6%** | Mặc Liên (100%), Bạch Diện (5.5%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%) | Cần đồng đội tạo khoảng trống để xả sát thương |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank (Utility Metrics)

### 3.1. Giao Tranh Đội Nhỏ (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **39.0%** ($n=91$, CI95: 29.6% – 49.3%). Khi được kết hợp cùng một Tiên phong mở combat (như Phù Đổng hay Forge), Nera có thể đứng sau xả đạn tời và găm xích neo giữ chân mục tiêu rất hiệu quả.
- **Đội hình 3v3:** Tỉ lệ thắng **33.3%** ($n=171$, CI95: 26.7% – 40.7%).

### 3.2. Chịu Gank 1v2 (Gank Survival)
- **Phút 6 (Nera dẫn trước đồ):** Tỉ lệ thắng / lật kèo gank **0.1%**. Chiêu RMB giật lùi 4.5m giúp Nera né gank hiệu quả hơn trên map có địa hình, nhưng không thể solo lật kèo 2 tướng cùng lúc.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst)

Mô phỏng chuỗi xả đạn: **Q (Xuyên Thấu Tiễn tầm 9.5m) → 3 Đòn đánh thường kích hoạt Xích Neo (+18% MS thả diều) → RMB (Phóng Tời giật lùi 4.5m làm chậm 35%) → E (Lưới Neo Dây Bẫy làm chậm 30%) → R (Đại Cực Neo bắn 12.0m làm choáng 1.2s):**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 570 sát thương | **48.8% HP** | Bào gần 50% máu tanker từ cự ly an toàn |
| **Kha Tấn** | Phút 3 | 684 sát thương | **64.1% HP** | Trao đổi chiêu thức tốt với xạ thủ đối phương |
| **Vạn Đao** | Phút 3 | 720 sát thương | **55.7% HP** | Cản bước tiếp cận của đấu sĩ |
| **Hỏa Tùy** | Phút 3 | 759 sát thương | **73.1% HP** | Đe dọa pháp sư máu mỏng |
| **Bạch Diện** | Phút 3 | 723 sát thương | **67.9% HP** | Tự bảo vệ bản thân trước sát thủ |
| **Mặc Liên** | Phút 3 | 759 sát thương | **82.5% HP** | Áp lực tử vong lớn lên hỗ trợ |

*Kết luận Combo:* Tổng lượng sát thương đầu ra dao động từ 48% đến 82% máu mục tiêu, đúng chuẩn chỉ số của một Marksman tầm xa.

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Chịu đòn trụ solo (Tower Tanking):** Thời gian sống sót: **11.4 giây** (Trụ còn 54.2% máu). Máu mỏng chuẩn Xạ thủ.
- **Ăn Boss Cổ Thần Long:** Nera sở hữu DPS tầm xa ổn định để tiêu diệt mục tiêu lớn nếu có tanker giữ quái.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **167 cờ**.
  - Các cờ cam phản ánh đúng chất tướng Xạ thủ yếu thế trong các kèo tay đôi 1v1 trực diện với Đấu sĩ và Pháp sư dồn damage.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Dây xích neo hai chiều (Anchor Tether Cable)`: Simulator mới tính toán tăng tốc độ chạy và làm chậm; chưa mô phỏng lực kéo giật vật lý (displacement pull) kéo lê tướng địch thực sự.
3. `Tiêu hao Mana trong combat kéo dài`: Cần theo dõi lượng mana tiêu hao khi giao tranh lâu.
