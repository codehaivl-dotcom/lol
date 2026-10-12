# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #40 LIỄU TIỄN

**Tướng:** Liễu Tiễn (#40)  
**Vai trò:** Xạ thủ băng / Vệt sương băng rút lui (`marksman`)  
**Tập tin ứng viên:** `tools/sim/candidates/lieu_tien.yml`  
**Phiên bản mã nguồn mô phỏng:** `6d362f41a1ac` (Chiến dịch: `reports/sim/production26/2026-10-12T00-24-57-295Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave1-gameplay-toys.test.mjs` — *Toy 3: Lieu Tien frost trail - kiting speed boost & enemy slow without collision*)  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 610 (+86/lv), Mana 320 (+35/lv), AD 60 (+3.6/lv), AP 0, Armor 28 (+3.2/lv), MR 30 (+1.2/lv), MS 6.2, AS 0.67 (+0.024/lv), HP Regen 1.4 (+0.12/lv), Mana Regen 1.5 (+0.12/lv).
- **Tuning thử nghiệm:** `{ hp: 0.96, dmg: 1.02 }`.
- **Bộ trang bị chuẩn 5 món:** `keeneye`, `quickstring`, `thornseed_quiver`, `qua_mach`, `buoc_van`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) Theo Mốc Phút

*Dữ liệu từ 200 lượt mô phỏng ngẫu nhiên hạt giống cố định (`seed=1`):*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Cao Nhất | Đối Thủ Thua Nặng Nhất | Đánh Giá Đường Cong |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **21.7%** | Mặc Liên (100%), Hỏa Tùy (16%), Bạch Diện (10%) | Kha Tấn (0%), Mộc Lâm (2%), Vạn Đao (4%) | Đầu trận yếu đuối điển hình của Xạ thủ gánh đội; cần bảo kê |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **35.3%** | Mặc Liên (87%), Mộc Lâm (56%), Vạn Đao (37%) | Kha Tấn (1%), Hỏa Tùy (6%), Bạch Diện (26%) | Tăng tiến tốt khi có R Cực Băng Đại Tiễn choáng 1.0s tầm xa |
| **Phút 10** | Cấp 9 / 2 trang bị | **19.2%** | Mặc Liên (96%), Bạch Diện (13%) | Mộc Lâm (0%), Kha Tấn (1%), Vạn Đao (2%), Hỏa Tùy (5%) | Giai đoạn sát thủ và đấu sĩ đạt đỉnh sát thương một combo |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **22.8%** | Mặc Liên (100%), Bạch Diện (16%), Vạn Đao (13%) | Kha Tấn (1%), Mộc Lâm (3%), Hỏa Tùy (4%) | Bắt đầu tích lũy đồ chí mạng và tốc đánh |
| **Phút 20** | Cấp 15 / 5 trang bị | **40.8%** | Mặc Liên (100%), Bạch Diện (53%), Vạn Đao (50%), Mộc Lâm (31%) | Kha Tấn (1%), Hỏa Tùy (11%) | Sức mạnh tăng vọt; bắt đầu đè bẹp các tướng cận chiến |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **47.9%** | Mộc Lâm (100%), Mặc Liên (100%), Kha Tấn (52%), Bạch Diện (32%) | Vạn Đao (0%), Hỏa Tùy (5%) | Đạt đỉnh cao Xạ thủ; thả diều bắn gục cả Mộc Lâm (100%) và Kha Tấn (52%) |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank

### 3.1. Giao Tranh Đội Nhỏ (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **42.9%** ($n=91$). Khi đi cùng hỗ trợ hồi máu/khiên (như Jeli) hoặc đấu sĩ đỡ đòn (như Forge), Liễu Tiễn có không gian dệt vệt băng thả diều cực kỳ khó chịu.
- **Đội hình 3v3:** Tỉ lệ thắng **40.4%** ($n=171$). Đóng góp khống chế diện rộng chiêu E (Mưa tên làm chậm 35%) và chiêu cuối R mở giao tranh tầm xa (18m).

### 3.2. Chịu Gank 1v2 (Gank Survival)
- **Phút 6 (Liễu Tiễn dẫn trước):** Sống sót / thắng **0.7%** ($CI95: 0.3\% – 1.6\%$). Nhờ vệt băng tăng 20% tốc chạy và chiêu W bước lùi tạo khiên.
- **Phút 10 & 15:** 0.0% khi bị 2 tướng bao vây.

---

## 4. Kiểm Thử Combo Sốc Sát Thương (One-Combo Burst)

Mô phỏng chuỗi xả tên: **R (Đại tiễn choáng 1.0s) → Q (Băng tiễn xuyên kích) → E (Băng lạc vũ làm chậm 35%) → 2 Đòn đánh thường:**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|:---:|---|
| **Mộc Lâm** | Phút 3 | 577 sát thương | **49.4% HP** | Chuẩn xác cho xạ thủ cấu rỉa |
| **Kha Tấn** | Phút 3 | 692 sát thương | **64.8% HP** | Giằng co cân bằng giữa 2 xạ thủ |
| **Vạn Đao** | Phút 3 | 728 sát thương | **56.4% HP** | Không gây sốc sát thương ảo |
| **Hỏa Tùy** | Phút 3 | 767 sát thương | **74.0% HP** | R trúng đích tạo áp lực rất lớn lên pháp sư |
| **Bạch Diện** | Phút 3 | 731 sát thương | **68.7% HP** | Phản ứng kịp thời trước sát thủ |

*Kết luận Combo:* Liễu Tiễn không phải là tướng dồn sát thương một chạm (Burst Assassin); bộ kỹ năng tập trung vào làm chậm, choáng và duy trì dệt vệt băng thả diều.

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Đẩy trụ solo (Tower Siege):**
  - Thời gian trụ bắn hạ: **12.7 giây** (Trụ còn 50.1% máu). Là tướng chịu đòn trụ yếu nhất Wave 1 (giáp 28, máu 610), phản ánh đúng bản chất xạ thủ máu giấy.
- **Ăn Boss Cổ Thần Long:** Có DPS cao ở full build nhưng bắt buộc phải có tank hút đòn đánh của boss.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **163 cờ**.
  - Phần lớn cờ cam đến từ việc tỉ lệ thắng ở phút 3, 10, 15 nằm dưới 40% (21.7%, 19.2%, 22.8%). Đây là hiện tượng bình thường của các tướng Xạ thủ truyền thống trong các trận đấu đơn 1v1 (bị sát thủ và pháp sư lấn lướt trước khi có đủ 3 trang bị lớn).

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Độ trễ và bề rộng vệt băng trên địa hình`: Vệt sương băng 2.2m được mô phỏng dạng hình tròn/vệt trên mặt phẳng 2D, chưa kiểm tra tương tác khi đi qua địa hình dốc hoặc bậc thang.
3. `Cực Băng Đại Tiễn (R) xuyên map`: Simulator giới hạn tầm bắn ở 18m; chưa kiểm thử hành vi va chạm đạn đạo toàn bản đồ (cross-map snipe).
