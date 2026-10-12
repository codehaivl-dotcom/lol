# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #39 KAEL

**Tướng:** Kael (#39)  
**Vai trò:** Đấu sĩ cận chiến / Đánh tay lướt chém (`fighter_skirmisher`)  
**Tập tin ứng viên:** `tools/sim/candidates/kael.yml`  
**Phiên bản mã nguồn mô phỏng:** `86ed0d9fc8ed` (Chiến dịch: `reports/sim/production26/2026-10-12T00-24-57-295Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave1-gameplay-toys.test.mjs` — *Toy 2: Kael Cuong Nhip - stack accumulation, attack speed bonus & decay*)  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 670 (+88/lv), AD 64 (+3.2/lv), Armor 34 (+3.6/lv), MR 30 (+1.4/lv), MS 6.3, AS 0.68 (+0.020/lv), HP Regen 1.6 (+0.14/lv). Tài nguyên: `none`.
- **Tuning thử nghiệm:** `{ hp: 1.0, dmg: 0.95 }`.
- **Bộ trang bị chuẩn 5 món:** `buoc_van`, `qua_mach`, `heartforge`, `thornseed_quiver`, `an_tinh`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) Theo Mốc Phút

*Dữ liệu từ 200 lượt mô phỏng ngẫu nhiên hạt giống cố định (`seed=1`):*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Cao Nhất | Đối Thủ Thua Nặng Nhất | Đánh Giá Khách Quan |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **40.3%** | Mặc Liên (100%), Bạch Diện (79%), Vạn Đao (62%) | Mộc Lâm (0%), Kha Tấn (0%), Hỏa Tùy (1%) | Khởi đầu ổn định trước sát thủ/đấu sĩ đỡ đòn; bị khống chế cứng đè nén |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **11.7%** | Mặc Liên (31%), Bạch Diện (23%), Vạn Đao (15%) | Mộc Lâm (0%), Kha Tấn (0%), Hỏa Tùy (2%) | Bắt đầu tụt dốc thảm hại; không đủ độ cứng để tích Cuồng Nhịp |
| **Phút 10** | Cấp 9 / 2 trang bị | **6.9%** | Mặc Liên (40%) | Mộc Lâm (0%), Kha Tấn (0%), Vạn Đao (1%), Hỏa Tùy (1%), Bạch Diện (1%) | Thất bại toàn diện trước hầu hết tướng chuẩn; chết trước khi chạm vào địch |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **7.7%** | Mặc Liên (44%) | Mộc Lâm (0%), Kha Tấn (0%), Hỏa Tùy (0%), Vạn Đao (1%), Bạch Diện (2%) | Hầu như không có cơ hội sống sót trong các pha solo |
| **Phút 20** | Cấp 15 / 5 trang bị | **4.1%** | Mặc Liên (21%) | Mộc Lâm (0%), Kha Tấn (0%), Vạn Đao (0%), Hỏa Tùy (0%), Bạch Diện (4%) | Suy sụp hoàn toàn; tỉ lệ thắng thấp nhất toàn bộ Wave 1 |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **19.9%** | Mặc Liên (100%), Bạch Diện (11%), Vạn Đao (8%) | Mộc Lâm (0%), Kha Tấn (0%), Hỏa Tùy (0%) | Không hề bị vỡ balance lên 80%+; trái lại đang bị thiếu hụt sức mạnh nghiêm trọng |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank

### 3.1. Giao Tranh Đội Nhỏ (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **31.9%** ($n=91$). Kael thường xuyên bị dồn sát thương chết đầu tiên trong combat 2v2 do lượng máu cơ bản khiêm tốn (670 HP) và khiên E (`55..175`) không đủ bù đắp.
- **Đội hình 3v3:** Tỉ lệ thắng **33.0%** ($n=171$). Cần có tuyến trước cứng cáp hút chiêu thì Kael mới có thể chém tay tích tầng.

### 3.2. Chịu Gank 1v2 (Gank Survival)
- **Phút 6, 10, 15:** Đều là **0.0%**. Kael không có kỹ năng đào thoát vượt địa hình, một khi bị 2 tướng đối phương gank sẽ gần như nắm chắc cái chết.

---

## 4. Kiểm Thử Combo Sốc Sát Thương (One-Combo Burst)

Mô phỏng chuỗi combo lướt chém: **Q (Cuồng Trảm Lướt) → R (Huyết Cuồng Phong Ma 3 chém) → RMB (Song Đao Toái Kích chém kép) → Đánh thường:**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 632 sát thương | **54.1% HP** | Phù hợp đấu sĩ đánh tay duy trì nhịp |
| **Kha Tấn** | Phút 3 | 759 sát thương | **71.1% HP** | Áp sát tốt nhưng vẫn cho xạ thủ cơ hội phản ứng |
| **Vạn Đao** | Phút 3 | 798 sát thương | **61.8% HP** | Cân đối |
| **Hỏa Tùy** | Phút 3 | 841 sát thương | **81.1% HP** | Sát thương cao nhưng đòi hỏi phải lướt trúng |
| **Bạch Diện** | Phút 3 | 801 sát thương | **75.3% HP** | Đe dọa vừa phải |

*Kết luận Combo:* Sát thương bộc phát tức thời của Kael không bị lỗi over-burst; bản chất của nhân vật nằm ở sát thương duy trì sau khi tích đủ 5 tầng Cuồng Nhịp.

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Đẩy trụ solo (Tower Siege):**
  - Thời gian sống sót: **18.4 giây** (Trụ còn 36.5% máu). Chết khá nhanh dưới hỏa lực trụ.
  - Tuân thủ quy tắc Doc 102 §3.2: Đòn đánh vào trụ không hồi máu và không tích thêm tầng Cuồng Nhịp.
- **Ăn Boss Cổ Thần Long (Thuồng Luồng):** Cần sự hỗ trợ của Đỡ đòn hoặc Hỗ trợ; solo boss sẽ bị phản đòn hạ gục.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **156 cờ**.
  - Phần lớn cờ cam phản ánh tình trạng Kael có tỉ lệ thắng trung bình dưới 40% ở phút 6 (11.7%), phút 10 (6.9%), phút 15 (7.7%), phút 20 (4.1%).
  - Báo động: Kael không có nguy cơ "vỡ 80%+" mà đang gặp nguy cơ "phế hoàn toàn ở late game" nếu không được gia cố khả năng chống chịu hoặc kháng hiệu ứng.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Kháng hiệu ứng (Tenacity)`: Simulator chưa mô phỏng giảm thời gian làm chậm/choáng khi đạt cực đại 5 tầng Cuồng Nhịp.
3. `Quy tắc lính tối đa 2 tầng`: Trong engine hiện tại lính cộng 0.5 tầng/hit nhưng chưa chặn cứng trần 2 tầng nếu đánh lính liên tục.
4. `Hút máu & Sát thương chuẩn`: Chưa có trường dữ liệu mô phỏng.
