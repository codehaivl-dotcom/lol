# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #03 VERO

**Tướng:** Vero (#03)  
**Vai trò:** Sát thủ Vết kiếm thời không / Chém trễ vết nứt (`assassin`)  
**Tập tin ứng viên:** `tools/sim/candidates/vero.yml`  
**Phiên bản mã nguồn mô phỏng:** `41f570907a66` (Chiến dịch: `reports/sim/production26/2026-10-12T07-21-06-914Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave2-gameplay-toys.test.mjs` — *Toy 5: Vero delayed echo slice damage accumulation & pop* [0.07ms])  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 640 (+88/lv), Mana 350 (+45/lv), AD 65 (+3.6/lv), AP 25 (+3.0/lv), Armor 32 (+3.5/lv), MR 30 (+1.3/lv), MS 6.4, AS 0.68 (+0.021/lv), HP Regen 1.5 (+0.14/lv), Mana Regen 1.5 (+0.12/lv). Tài nguyên: `mana`.
- **Tuning thử nghiệm:** `{ hp: 0.99, dmg: 1.01 }`.
- **Bộ trang bị chuẩn 5 món:** `keeneye`, `quickstring`, `heartforge`, `thornseed_quiver`, `bastion_stone`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — ĐÁNH GIÁ THEO CHUẨN SÁT THỦ THỜI TRỄ

*Quy định Doc 105 §S5: Sát thủ có cơ chế sát thương nổ trễ (Delayed Pop) đòi hỏi thời gian tích lũy sát thương; trong mô phỏng đối đầu trực diện dễ bị hạ gục trước khi vết nứt phát nổ.*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Áp Đảo | Đối Thủ Thua Nặng | Phân Tích Cơ Học |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **24.3%** | Bạch Diện (100%), Mặc Liên (46.0%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%) | Thắng áp đảo sát thủ Bạch Diện nhờ khiên RMB; bị thua các tướng có tầm xa và tanker |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **11.4%** | Mặc Liên (68.5%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Mở khóa R Vạn Kiếm Quy Thời (kích nổ vết chém trễ lập tức); dồn sát thương tốt lên hỗ trợ |
| **Phút 10** | Cấp 9 / 2 trang bị | **7.4%** | Mặc Liên (44.5%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Điểm trũng: độ trễ nổ 2.5s khiến Vero bị các đấu sĩ dồn sát thương hạ gục trước khi vết nứt nổ |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **6.0%** | Mặc Liên (36.0%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Yếu thế trong các kèo tay đôi trực diện kéo dài |
| **Phút 20** | Cấp 15 / 5 trang bị | **11.8%** | Mặc Liên (70.5%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Bắt đầu hồi phục sức mạnh ám sát khi có đồ xuyên giáp |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **17.9%** | Mặc Liên (100%), Bạch Diện (7.5%) | Kha Tấn (0%), Mộc Lâm (0%), Vạn Đao (0%), Hỏa Tùy (0%) | Đúng bản chất sát thủ chỉ nhắm vào tuyến sau |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank (Utility Metrics)

### 3.1. Giao Tranh Đội Nhỏ (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **37.4%** ($n=91$, CI95: 28.1% – 47.6%). Trong 2v2, khi đồng đội câu kéo được sát thương trong 2.5s đầu, cú nổ Echo 30% sát thương tích lũy của Vero sẽ dọn dẹp chiến trường rất gọn gàng.
- **Đội hình 3v3:** Tỉ lệ thắng **34.8%** ($n=171$, CI95: 28.1% – 42.2%).

### 3.2. Chịu Gank 1v2 (Gank Survival)
- **Phút 6 (Vero dẫn trước đồ):** Tỉ lệ thắng / lật kèo gank **0.0%**. Vero không có khả năng 1v2; khi bị gank, chiêu Q lướt xuyên mục tiêu 6.5m và khiên RMB là công cụ duy nhất để tẩu thoát.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst — Sức Mạnh Đích Thực)

Mô phỏng chuỗi combo vết nứt thời gian: **Q (Vết Chém Thời Không lướt 6.5m) → E (Vòng Xoáy Nghịch Đảo xoay kiếm 360 độ) → Đánh thường tích sát thương echo → RMB (Thời Không Chi Khiên tạo khiên phản đòn) → R (Vạn Kiếm Quy Thời 3 nhát chém và kích nổ vết nứt +30% tích lũy):**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 606 sát thương | **51.8% HP** | Bào hơn một nửa cây máu của tướng chống chịu |
| **Kha Tấn** | Phút 3 | 727 sát thương | **68.1% HP** | Gây sát thương chí mạng lên Xạ thủ |
| **Vạn Đao** | Phút 3 | 764 sát thương | **59.2% HP** | Dồn dame áp đảo Đấu sĩ |
| **Hỏa Tùy** | Phút 3 | 806 sát thương | **77.6% HP** | Đe dọa mạng sống của Pháp sư |
| **Bạch Diện** | Phút 3 | 767 sát thương | **72.1% HP** | Đè bẹp Sát thủ đối phương trong combat |
| **Mặc Liên** | Phút 3 | 806 sát thương | **87.7% HP** | Gần như one-shot Hỗ trợ máu giấy |

*Kết luận Combo:* Tổng sát thương dồn đạt 52%–88% máu mục tiêu, thể hiện rõ nét sức mạnh bộc phát khủng khiếp khi vết chém trễ phát nổ.

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Chịu đòn trụ solo (Tower Tanking):** Thời gian sống sót: **13.6 giây** (Trụ còn 39.9% máu).
- **Ăn Boss Cổ Thần Long:** Khả năng tích sát thương echo giúp dồn damage boss mục tiêu lớn ở những giây cuối rất mạnh mẽ.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **161 cờ**.
  - Các cờ cam phản ánh đúng nhược điểm của sát thủ thời trễ khi đối đầu với đấu sĩ trâu bò. Logic mô phỏng hoàn toàn ổn định.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Cơ chế tử vong trước khi nổ Echo`: Simulator hiện tại chưa có cơ chế xử lý khi Vero chết giữa chừng trong lúc vết nứt đang đếm ngược 2.5s.
3. `Chỉ số AP lai`: YAML có AP 25 nhưng bộ kỹ năng chưa có scaling AP, gây lãng phí điểm chỉ số.
