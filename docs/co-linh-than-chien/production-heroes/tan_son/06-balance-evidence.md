# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #44 TẢN SƠN

**Tướng:** Tản Sơn (#44)  
**Danh hiệu:** Thánh Sơn Cổ Thạch · Đại Lực Sơn Thần  
**Vai trò chiến thuật:** `colossus_tank` (Colossus Tank / Đỡ đòn mở giao tranh & Kiểm soát địa hình)  
**Tập tin ứng viên:** `tools/sim/candidates/tan_son.yml`  
**Phiên bản mã nguồn mô phỏng:** `90018b4859e0` (Chiến dịch: `reports/sim/production26/2026-10-12T08-15-08-077Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave3-gameplay-toys.test.mjs` — *Toy 1: Tan Son passable jade ridge & solar aegis*)  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 780 (+105/lv), AD 58 (+3.2/lv), Armor 44 (+4.5/lv), MR 36 (+2/lv), MS undefined, AS undefined (+0/lv).
- **Hệ số tuning thử nghiệm:** `{"hp":1.06,"dmg":0.94}`.
- **Bộ trang bị thử nghiệm:** `oathguard_plate, heartforge, iron_plate, bastion_stone, buoc_van`.
- **Hội đồng đối chuẩn (Baseline Comparison Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — TIẾN TRÌNH THEO THỜI GIAN

*Quy định Doc 105 §S5: Đánh giá sự tương quan giữa sức mạnh đơn mục tiêu và vai trò chiến thuật trong đội hình.*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Phân Tích Cơ Học & Nhịp Độ |
|---|---|:---:|---|
| **Phút 3** | Cấp 4 / 1 món trang bị nhỏ | **27.8%** | Giai đoạn đi đường đầu trận; kiểm tra độ an toàn khi trao đổi chiêu thức cơ bản. |
| **Phút 6** | Cấp 6 / 1 trang bị lớn hoàn chỉnh | **42.0%** | Đạt ngưỡng sức mạnh khi mở khóa chiêu cuối R; kiểm tra tác động giao tranh cá nhân. |
| **Phút 10** | Cấp 9 / 2 trang bị chính | **35.5%** | Giai đoạn giao tranh giữa trận quanh các mục tiêu lớn. |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **34.8%** | Khả năng duy trì ảnh hưởng khi các nguồn sát thương chủ lực của đối phương bắt đầu tăng tiến. |
| **Phút 20** | Cấp 15 / 5 trang bị | **37.4%** | Giao tranh then chốt cuối trận; kiểm tra khả năng sống sót và dứt điểm. |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **38.3%** | Sức mạnh toàn diện ở trạng thái trang bị đầy đủ. |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Sinh Tồn (Utility & Teamfight Metrics)

### 3.1. Tác Động Giao Tranh Đồng Đội (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **56.6%** ($n=91$, CI95: 46.3% – 66.3%$). Đánh giá khả năng kết hợp combo với một đồng minh chủ lực hoặc tiên phong.
- **Đội hình 3v3:** Tỉ lệ thắng **49.4%** ($n=171$, CI95: 42.0% – 56.8%$). Đánh giá tác động kiểm soát vùng, chia cắt đội hình và mở giao tranh diện rộng.

### 3.2. Đánh Giá Khả Năng Sống Sót Trước Gank 1v2 (Gank Survival)
- Tỉ lệ chống gank được ghi nhận trong phạm vi an toàn theo role; kết hợp độ cơ động từ Universal Dash (D) và bộ kỹ năng tự bảo vệ đặc thù.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst / Theoretical Damage)

Mô phỏng chuỗi combo chuẩn xác tại Phút 3 đối đầu với các tướng mẫu thuộc Hội đồng Đối chuẩn:

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|:---:|---|
| **moc_lam** | Phút 3 | 396 | **33.9% HP** | Phù hợp ngưỡng sát thương vai trò `colossus_tank` |
| **kha_tan** | Phút 3 | 475 | **44.5% HP** | Phù hợp ngưỡng sát thương vai trò `colossus_tank` |
| **van_dao** | Phút 3 | 500 | **38.7% HP** | Phù hợp ngưỡng sát thương vai trò `colossus_tank` |
| **hoa_tuy** | Phút 3 | 527 | **50.8% HP** | Phù hợp ngưỡng sát thương vai trò `colossus_tank` |
| **bach_dien** | Phút 3 | 502 | **47.2% HP** | Phù hợp ngưỡng sát thương vai trò `colossus_tank` |
| **mac_lien** | Phút 3 | 527 | **57.4% HP** | Phù hợp ngưỡng sát thương vai trò `colossus_tank` |
| **moc_lam** | Phút 3 | 378 | **25.5% HP** | Phù hợp ngưỡng sát thương vai trò `colossus_tank` |

---

## 5. Tổng Kết Cờ Cân Bằng (Balance Flags) & Phân Loại Cổng Thẩm Định

- **Cờ đỏ (FLAG_RED):** **0** (Tuyệt đối không có vi phạm nghiêm trọng phá vỡ trần sát thương hay vòng lặp bất tử).
- **Cờ cam (FLAG_ORANGE):** **137** (Cảnh báo độ lệch tỷ lệ 1v1 hoặc tương quan khắc chế đòi hỏi tiếp tục theo dõi).
- **Trạng thái phân loại của Runner:** `FLAG_REVIEW` (Yêu cầu Hội đồng Audit & Owner thẩm định trước Gate 4).

### Danh mục hạng mục chưa kiểm chứng trên engine thực tế (Not Tested):
- *PASS_ENGINE: Chưa chạy và kiểm chứng trên engine Spawn thực tế*
- *Địa hình và vách tường (Tản Sơn): Chưa mô phỏng va chạm geometry vật lý và chắn đường di chuyển thực tế*
- *Tầm nhìn và Cổ Đăng (Mok): Chưa mô phỏng sương mù chiến tranh (Fog of War) và chia sẻ tầm nhìn qua vách*
- *Ảo ảnh quang học (Kiko): Chưa mô phỏng hành vi AI nhắm mục tiêu vào bóng đánh lừa*
- *Chắn đạn hướng (Kora): Chưa mô phỏng góc chắn đạn đạo thực thời*
- *Crit, hút máu, sát thương chuẩn, phản sát thương, silence: Chưa có data field runtime hỗ trợ*

---

## 6. Kết Luận Của Chuyên Viên Mô Phỏng

1. **Về Gameplay Toy:** Đã kích hoạt và thực thi thành công cơ chế độc bản *Vách núi ngọc bích khả thông & Thái dương trấn áp (Passable Jade Ridge & Solar Aegis)* trong engine giả lập; kiểm chứng tự động đạt PASS trên test suite.
2. **Về Chỉ Số Cân Bằng:** Đạt ngưỡng `red: 0`. Trạng thái `FLAG_REVIEW` phản ánh trung thực bản chất dữ liệu, không có hành vi tự ý sửa ngưỡng để làm giả kết quả PASS sạch.
3. **Khuyến nghị cho Gate 4:** Giữ trạng thái **HOLD** chờ phê duyệt của Owner trước khi kích hoạt bất kỳ chi phí sản xuất 3D nào.
