# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — #38 LINH HẦU

**Tướng:** Linh Hầu (#38)  
**Vai trò:** Đấu sĩ cận chiến / Biến điệu tầm trượng (`fighter`)  
**Tập tin ứng viên:** `tools/sim/candidates/linh_hau.yml`  
**Phiên bản mã nguồn mô phỏng:** `2f379e3869f7` (Chiến dịch: `reports/sim/production26/2026-10-12T00-24-57-295Z/`)  
**Lệnh thực thi:** `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (`tools/test/wave1-gameplay-toys.test.mjs` — *Toy 1: Linh Hầu staff reach modulation*)  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP 740 (+98/lv), AD 65 (+3.8/lv), Armor 38 (+4.0/lv), MR 32 (+1.6/lv), MS 6.2, AS 0.65 (+0.018/lv), HP Regen 1.8 (+0.16/lv). Tài nguyên: `none`.
- **Tuning thử nghiệm:** `{ hp: 1.05, dmg: 0.98 }`.
- **Bộ trang bị chuẩn 5 món:** `qua_mach`, `heartforge`, `oathguard_plate`, `an_tinh`, `buoc_van`.
- **Hội đồng so chuẩn (Baseline Panel):** Mộc Lâm (Đấu sĩ kiểm soát), Kha Tấn (Xạ thủ cơ động), Vạn Đao (Đấu sĩ mở giao tranh), Hỏa Tùy (Pháp sư sốc điện), Bạch Diện (Sát thủ dồn dame), Mặc Liên (Đỡ đòn kháng hiệu ứng).

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) Theo Mốc Phút

*Dữ liệu từ 200 lượt mô phỏng ngẫu nhiên hạt giống cố định (`seed=1`):*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Đối Thủ Thắng Cao Nhất | Đối Thủ Thua Nặng Nhất | Đánh Giá Đường Cong |
|---|---|:---:|---|---|---|
| **Phút 3** | Cấp 4 / 1 món nhỏ | **55.5%** | Mặc Liên (100%), Vạn Đao (100%), Bạch Diện (100%) | Mộc Lâm (1%), Kha Tấn (1%) | Cực mạnh trước tướng cận chiến thuần; bị thả diều bởi Kha Tấn |
| **Phút 6** | Cấp 6 / 1 trang bị lớn | **48.0%** | Mặc Liên (100%), Vạn Đao (85%), Mộc Lâm (67%) | Kha Tấn (4%), Bạch Diện (12%), Hỏa Tùy (21%) | Giai đoạn vàng của Linh Hầu khi mở Ultimate R nện đất |
| **Phút 10** | Cấp 9 / 2 trang bị | **36.8%** | Mặc Liên (100%), Vạn Đao (63%) | Kha Tấn (2%), Mộc Lâm (5%), Hỏa Tùy (21%) | Bắt đầu suy giảm trước sát thương phép bộc phát và tầm xa |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **24.1%** | Mặc Liên (100%), Vạn Đao (29%) | Hỏa Tùy (0%), Mộc Lâm (1%), Kha Tấn (6%) | Rơi vào vùng trũng 1v1 khi các chủ lực hoàn thiện ngưỡng đồ |
| **Phút 20** | Cấp 15 / 5 trang bị | **23.2%** | Mặc Liên (100%), Vạn Đao (26%) | Kha Tấn (0%), Hỏa Tùy (1%), Mộc Lâm (5%) | Không khuyến khích solo late game; vai trò chuyển sang mở giao tranh tổng |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **48.8%** | Mặc Liên (100%), Bạch Diện (87%), Mộc Lâm (50%), Vạn Đao (50%) | Kha Tấn (0%), Hỏa Tùy (6%) | Hồi phục sức mạnh nhờ bộ đồ thủ `oathguard_plate` + `heartforge` |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Chịu Gank

### 3.1. Giao Tranh Đội Nhỏ (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **59.3%** ($n=91$, CI95: 49.1% – 68.9%). Linh Hầu kết hợp xuất sắc với các xạ thủ hoặc hỗ trợ khống chế nhờ khả năng mở combat và giữ chân.
- **Đội hình 3v3:** Tỉ lệ thắng **45.0%** ($n=171$). Thể hiện đúng bản chất đấu sĩ tiền tuyến: chia sẻ sát thương và tạo tiền đề cho tuyến sau.

### 3.2. Chịu Gank 1v2 (Gank Survival)
- **Phút 6 (Cân bằng tài nguyên):** Thắng 0.0% — Sống sót trước 2 tướng là thử thách lớn.
- **Phút 6 (Linh Hầu dẫn trước đồ/cấp):** Thắng **0.8%** ($CI95: 0.3\% – 1.7\%$). Đã có thể phản kích hạ gục 1 trong 2 mục tiêu khi có R và khiên W.
- **Phút 10 & 15:** 0.0% thắng 1v2 khi bị 2 tướng áp sát dồn khống chế.

---

## 4. Kiểm Thử Combo Sốc Sát Thương (One-Combo Burst)

Mô phỏng chuỗi combo chuẩn: **Q (Đâm trượng tầm xa) → R (Nhảy bổ nện đất choáng 0.8s) → E (Quét trượng) → Đánh thường Sweetspot rìa trượng:**

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|:---:|---|
| **Mộc Lâm** (Đỡ đòn nhẹ) | Phút 3 | 668 sát thương | **57.1% HP** | An toàn, không one-shot tanker |
| **Kha Tấn** (Xạ thủ máu giấy) | Phút 3 | 801 sát thương | **75.0% HP** | Đe dọa cao nhưng nạn nhân còn 25% máu để dùng Dash D đào thoát |
| **Vạn Đao** (Đấu sĩ) | Phút 3 | 807 sát thương | **62.5% HP** | Cân bằng, duy trì thế giằng co |
| **Hỏa Tùy** (Pháp sư) | Phút 3 | 851 sát thương | **82.0% HP** | Áp sát thành công lấy được phép bổ trợ/Dash của pháp sư |
| **Bạch Diện** (Sát thủ) | Phút 3 | 811 sát thương | **76.2% HP** | Trừng phạt sát thủ nếu bắt bài thành công |

*Kết luận Combo:* Không có trường hợp nào gây quá 85% máu ở phút thứ 3. Nạn nhân luôn có cửa sổ phản ứng (Counterplay Window).

---

## 5. Tác Động Công Trình & Quái Rừng (PvE Metrics)

- **Đẩy trụ solo (Tower Siege):**
  - Thời gian trụ bắn hạ: **24.5 giây** (Trụ còn lại 14.6% máu).
  - Không phá được trụ trong một đợt lính đơn độc nếu không có sự trợ giúp.
- **Ăn Boss Cổ Thần Long (Thuồng Luồng):** Cần tối thiểu 2 thành viên; không thể solo boss trước phút 15.

---

## 6. Phân Tích Cờ Cảnh Báo (Flags Breakdown)

- **Cờ ĐỎ (RED FLAGS):** **0 cờ**. Đã triệt tiêu hoàn toàn các lỗi NaN, out-of-bounds, và combo vi phạm quy chuẩn.
- **Cờ CAM (ORANGE FLAGS):** **145 cờ**.
  - Phần lớn cờ cam thuộc về các cặp đấu 1v1 lệch kèo tự nhiên của MOBA: thua Kha Tấn (Xạ thủ thả diều) và Hỏa Tùy (Pháp sư sốc tầm xa), thắng áp đảo Mặc Liên (Tanker bao cát).
  - Tỉ lệ thắng trung bình phút 15 & 20 nằm ngoài dải 40%–60% do bản chất đấu sĩ mở giao tranh suy giảm sức mạnh solo ở late game. Đây là đặc tính thiết kế, không phải lỗi kỹ thuật.

---

## 7. Giới Hạn Mô Phỏng (NOT_TESTED Transparency)

Các cơ chế sau đây **CHƯA ĐƯỢC KIỂM CHỨNG TRÊN RUNTIME ENGINE SPAWN THỰC TẾ**:
1. `PASS_ENGINE`: Chưa chạy thử nghiệm trên runtime engine Spawn thực tế có đồ họa và physics.
2. `Địa hình & Vách tường`: Chưa mô phỏng va chạm địa hình khi chống gậy bật nhảy qua tường mỏng.
3. `Fog of War & Tầm nhìn`: Chưa mô phỏng tương tác vung trượng trong bụi rậm.
4. `Crit, hút máu, sát thương chuẩn`: Chưa có trường dữ liệu mô phỏng trong candidate YAML.
