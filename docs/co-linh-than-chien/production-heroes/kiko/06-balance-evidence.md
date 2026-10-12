# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #01 KIKO

**Tướng:** Kiko (#01)  
**Vai trò:** Sát thủ Ảo ảnh quang học / Rình rập song trảo (`assassin`)  
**Tập tin ứng viên:** `tools/sim/candidates/kiko.yml`  
**Phiên bản mã nguồn mô phỏng:** `36abf8947ca4` (Chiến dịch: `reports/sim/production26/2026-10-12T07-21-06-914Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave2-gameplay-toys.test.mjs` — *Toy 2: Kiko holographic decoy 1-hit threshold absorption* [0.31ms])  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 630 (+86/lv), AD 67 (+3.7/lv), Armor 30 (+3.4/lv), MR 30 (+1.2/lv), MS 6.5, AS 0.70 (+0.022/lv), HP Regen 1.5 (+0.13/lv). Tài nguyên: `none` (sử dụng Ảo Ảnh Quang Học).
- **Tuning thử nghiệm:** `{ hp: 0.98, dmg: 1.02 }`.
- **Bộ trang bị chuẩn 5 món:** `keeneye`, `quickstring`, `heartforge`, `thornseed_quiver`, `bastion_stone`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — ĐÁNH GIÁ THEO CHUẨN SÁT THỦ

*Quy định Doc 105 §S5: Sát thủ được thiết kế để ám sát dồn sát thương các mục tiêu máu mỏng; không bắt buộc phải tay đôi thắng Đỡ đòn hoặc Đấu sĩ bọc thép.*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Áp Đảo | Đối Thủ Thua Nặng | Phân Tích Cơ Học |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **48.0%** | Bạch Diện (100%), Mặc Liên (100%), Vạn Đao (88.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Sát thương bộc phát đầu game cực lớn; hạ gục sát thủ và hỗ trợ ngay tức thì |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **43.2%** | Vạn Đao (100%), Mặc Liên (100%), Bạch Diện (59.5%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%) | Có R Vạn Ảnh Trảo Sát dồn dame đơn mục tiêu; tiếp tục áp đảo tướng tuyến sau |
| **Phút 10** | Cấp 9 / 2 trang bị | **29.8%** | Mặc Liên (100%), Vạn Đao (79.0%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Tỉ lệ thắng sụt giảm khi các tướng lên trang bị phòng thủ và kháng bộc phát |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **24.3%** | Mặc Liên (100%), Vạn Đao (45.5%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Máu giấy (630 HP gốc) khiến Kiko dễ bị sốc chết nếu bị dính khống chế |
| **Phút 20** | Cấp 15 / 5 trang bị | **20.9%** | Mặc Liên (100%), Vạn Đao (25.5%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Trở thành sát thủ cảm tử; cần chọn góc vào hợp lý thay vì đối đầu trực diện |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **23.9%** | Mặc Liên (100%), Vạn Đao (43.5%) | Kha Tấn (0%), Mộc Lâm (0%), Hỏa Tùy (0%), Bạch Diện (0%) | Ổn định quanh ngưỡng phân hóa chuẩn của Assassin |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank (Utility Metrics)

### 3.1. Giao Tranh Đội Nhỏ (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **44.5%** ($n=91$, CI95: 34.7% – 54.7%). Kiko hoạt động tốt nhất khi đi kèm Đỡ đòn hoặc Đấu sĩ hút chiêu thức (như Forge hoặc Phù Đổng), giúp Kiko lẻn vào tuyến sau dồn sát thương.
- **Đội hình 3v3:** Tỉ lệ thắng **37.4%** ($n=171$, CI95: 30.5% – 44.9%). Trong giao tranh tổng đông người, diện tích sát thương của đối thủ dễ vô tình quét vỡ ảo ảnh của Kiko.

### 3.2. Chịu Gank 1v2 (Gank Survival)
- **Phút 6 (Kiko dẫn trước đồ):** Tỉ lệ thắng / lật kèo gank **0.3%**. Đặc thù của chất tướng Assassin máu mỏng không sinh ra để chịu gank 1v2. Khi bị 2 tướng áp sát, giải pháp tối ưu là dùng Q lướt vượt rào hoặc Dash D tháo lui.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst — Điểm Sáng Của Kiko)

Mô phỏng chuỗi combo ám sát: **Q (Toái Trảo lướt 6.0m) → Kích hoạt Ảo ảnh (chặn 1 hit) → E (Khúc Xạ Trảm Kích 2 lần quét trảo) → Đánh thường có nội tại bộc phát (+35% bonus AD) → R (Vạn Ảnh Trảo Sát đơn mục tiêu choáng 0.8s):**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|---|---|
| **Mộc Lâm** | Phút 3 | 670 sát thương | **57.3% HP** | Bào hơn nửa cây máu của tướng Đỡ đòn |
| **Kha Tấn** | Phút 3 | 803 sát thương | **75.2% HP** | Áp lực tử vong cực lớn lên Xạ thủ |
| **Vạn Đao** | Phút 3 | 845 sát thương | **65.4% HP** | Dồn sát thương áp đảo Đấu sĩ |
| **Hỏa Tùy** | Phút 3 | 890 sát thương | **85.8% HP** | Gần như tiễn Pháp sư lên bảng đếm số |
| **Bạch Diện** | Phút 3 | 848 sát thương | **79.7% HP** | Thắng áp đảo trong kèo đấu Sát thủ vs Sát thủ |
| **Mặc Liên** | Phút 3 | 890 sát thương | **96.9% HP** | One-combo tiễn Hỗ trợ máu giấy tức thì (cờ warn) |

*Kết luận Combo:* Sát thương combo của Kiko là cao nhất toàn bộ Wave 2, đạt 75%–97% máu tướng máu giấy. Đúng hoàn toàn tôn chỉ thiết kế của một Burst Assassin.

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Chịu đòn trụ solo (Tower Tanking):** Thời gian sống sót: **14.8 giây** (Trụ còn 24.8% máu).
- **Ăn Boss Cổ Thần Long:** Kiko không thể solo mục tiêu lớn mà cần đồng đội tank trước; tốc độ đánh cao (0.70 AS) giúp ăn lén quái rừng rất nhanh.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**.
- **Cờ CAM (ORANGE FLAGS):** **173 cờ**.
  - Các cờ cam phản ánh đặc tính sát thủ máu giấy bị khắc chế bởi tướng khống chế cứng và đấu sĩ trâu bò (Mộc Lâm, Kha Tấn tầm xa). Không có cờ đỏ logic runtime.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

1. `PASS_ENGINE`: Chưa chạy và kiểm chứng trên engine Spawn thực tế.
2. `Ảo ảnh quang học (Kiko)`: Simulator hiện tại mới tính toán hấp thụ 1 hit cơ học thô (`1-hit threshold`); chưa mô phỏng hành vi AI đối thủ bị đánh lừa tung chiêu định hướng vào bóng ảo.
3. `Độ trễ và góc nhìn 4 chi`: Cần kiểm tra góc xoay nhân vật khi chạy 4 chân trên camera isometric để không bị méo mesh.
