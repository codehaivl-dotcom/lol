# 03 · Gameplay Contract — #03 Vero (Vết Kiếm)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#03 / vero`  
**Vai trò chuẩn hóa:** Sát Thủ / Pháp Sư Kiếm Thuật (Assassin / Mage Hybrid) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 640 | +88 / cấp | 1,872 |
| **Năng lượng (Mana)** | 350 | +45 / cấp | 980 |
| **Sát thương vật lý (AD)** | 65 | +3.6 / cấp | 115.4 |
| **Sức mạnh phép thuật (AP)** | 25 | +3.0 / cấp | 67.0 |
| **Giáp (Armor)** | 32 | +3.5 / cấp | 81.0 |
| **Kháng phép (MR)** | 30 | +1.3 / cấp | 48.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.4 m/s | 0 | 6.4 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.68 đòn/s | +0.021 / cấp | 0.974 đòn/s |
| **Hồi máu (HP Regen)** | 1.5 HP/s | +0.14 / cấp | 3.46 HP/s |
| **Hồi năng lượng (Mana Regen)** | 1.5 MP/s | +0.12 / cấp | 3.18 MP/s |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (LMB)
- **Kiểu tác động:** Cận chiến đơn mục tiêu (Melee Target).
- **Tầm đánh cơ bản:** `1.8m`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.12\text{s}$. Tốc độ đánh trần hoạt ảnh: $2.5$ đòn/s.
- **Tương tác nội tại:** Đòn đánh thường lên tướng địch sẽ găm hoặc tích lũy thêm sát thương vào Vết Nứt Thời Gian.

### 2.2. Nội Tại — Vết Nứt Thời Gian (`passive: delayed_echo`)
- **Điều kiện kích hoạt:**
  - Bất kỳ nguồn sát thương nào từ Vero (đòn đánh thường hoặc kỹ năng Q, E, R) đánh trúng tướng địch sẽ găm một dấu ấn Vết Nứt Thời Gian lên nạn nhân.
  - Nếu nạn nhân chưa có dấu ấn: Mở bộ đếm thời gian trễ $2.5\text{s}$ (`echoDelay: 2.5`).
  - Nếu nạn nhân đã có dấu ấn: Tiếp tục tích lũy sát thương trong suốt thời gian $2.5\text{s}$ đó (không làm mới lại thời gian đếm ngược của ấn đầu tiên, tránh việc bị trì hoãn nổ vô tận).
- **Cơ chế tích lũy sát thương (Damage Accumulation):**
  - Tích lũy đúng **30% tổng sát thương** (`echoRatio: 0.30`) mà Vero gây ra lên nạn nhân từ mọi nguồn trong khoảng thời gian đếm ngược.
- **Kích nổ nổ trễ (Echo Pop):**
  - Sau đúng $2.5\text{s}$, dấu ấn tự động phát nổ, gây lượng sát thương tích lũy tương ứng thành **Sát thương Phép thuật** (Magic Damage) lên nạn nhân.
  - Nạn nhân chỉ nhận sát thương đơn mục tiêu; không nổ lan sang đồng minh xung quanh.
- **Quy tắc phân biệt mục tiêu:**
  - Áp dụng $100\%$ lên Tướng địch.
  - Lính và quái rừng: Không áp dụng cơ chế tích nổ trễ (gây sát thương kỹ năng bình thường).
  - Trụ công trình: Không áp dụng.

### 2.3. Kỹ Năng Q — Vết Chém Thời Không (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng kèm lướt xuyên thấu (Skillshot Dash Line).
- **Khoảng cách lướt (Range / Dash Distance):** `6.5m`.
- **Độ rộng đường chém (Width):** `1.4m`.
- **Tốc độ lướt (Dash Speed):** `28 m/s`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[45, 50, 55, 60, 65]`.
- **Sát thương vật lý:**
  - Cấp 1: $65 + 85\%$ Bonus AD
  - Cấp 2: $100 + 85\%$ Bonus AD
  - Cấp 3: $135 + 85\%$ Bonus AD
  - Cấp 4: $170 + 85\%$ Bonus AD
  - Cấp 5: $205 + 85\%$ Bonus AD
- **Cơ chế đặc thù:** Lướt xuyên qua toàn bộ kẻ địch trên đường bay. Để lại một vệt nứt không gian phát sáng kéo dài dọc đường lướt.

### 2.4. Kỹ Năng W — Thời Không Chi Khiên (`skill_w`, Legacy RMB)
- **Kiểu ngắm:** Tự niệm tức thì (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt ngay lập tức, không ngắt lệnh di chuyển hoặc chém thường).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[50, 55, 60, 65, 70]`.
- **Lượng khiên hấp thụ (Shield Base):** Tồn tại trong `2.5s`.
  - Cấp 1: $65$
  - Cấp 2: $100$
  - Cấp 3: $135$
  - Cấp 4: $170$
  - Cấp 5: $205$
- **Hiệu ứng phụ:** Trong thời gian khiên tồn tại, Vero nhận thêm $15\%$ Tốc độ di chuyển để dễ dàng bám đuổi hoặc rút lui.

### 2.5. Kỹ Năng E — Vòng Xoáy Nghịch Đảo (`skill_e`)
- **Kiểu ngắm:** Diện rộng quanh tâm nhân vật (Area PBAoE).
- **Bán kính xoay kiếm (Radius):** `3.4m`.
- **Cự ly thi triển (Range):** `0m` (Tâm là Vero).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[55, 60, 65, 70, 75]`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 60\%$ Tổng AD
  - Cấp 2: $80 + 60\%$ Tổng AD
  - Cấp 3: $110 + 60\%$ Tổng AD
  - Cấp 4: $140 + 60\%$ Tổng AD
  - Cấp 5: $170 + 60\%$ Tổng AD
- **Hiệu ứng khống chế:** Làm chậm kẻ địch trúng đòn **25% trong 1.0 giây**.

### 2.6. Kỹ Năng R — Vạn Kiếm Quy Thời (`skill_r` — Ultimate)
- **Kiểu ngắm:** Chọn mục tiêu đơn thể kèm lướt áp sát (Single Target Targeted Dash).
- **Tầm thi triển (Range):** `6.5m`.
- **Thời gian gồng (Windup):** `0.2s`.
- **Thời gian hồi chiêu (Cooldown):** `[75.0, 65.0, 55.0]s` tại các cấp 6/11/15.
- **Tiêu hao năng lượng (Mana Cost):** `[100, 100, 100]`.
- **Sát thương vật lý:**
  - Cấp 1 (Lvl 6): $180 + 115\%$ Bonus AD
  - Cấp 2 (Lvl 11): $280 + 115\%$ Bonus AD
  - Cấp 3 (Lvl 15): $380 + 115\%$ Bonus AD
- **Hiệu ứng khống chế:** Gây Choáng (Stun) mục tiêu trong **0.8 giây**.
- **CƠ CHẾ ĐẶC QUYỀN KÍCH NỔ VẾT NỨT (Instant Echo Detonation):**
  - Khi đòn đánh thứ 3 của chuỗi chém R chạm vào mục tiêu, nếu mục tiêu đang có Vết Nứt Thời Gian (Echo) với bất kỳ lượng sát thương tích lũy nào $> 0$, hệ thống lập tức cưỡng bức kích nổ vết nứt ngay thời điểm đó (`echoPopAt = current_time`), không cần chờ hết chu kỳ 2.5s.
  - Sát thương nổ của vết nứt được tính thêm cả lượng sát thương vừa gây ra từ chính chiêu R này.

### 2.7. Tốc Biến Lướt Phổ Quát — `universal_dash` (Phím D)
- Tuân thủ quy định chuẩn tại Tài liệu 91: Lướt nhanh 4.5m theo hướng di chuyển, 0.15s i-frame né đạn đạo, tiêu hao thể lực chung, hồi chiêu độc lập.

---

## 3. Quy Tắc Tương Tác Mục Tiêu & Cơ Chế Cạnh Biên (Edge Cases)

| Đối tượng / Trường hợp | Quy tắc xử lý |
|---|---|
| **Tướng địch (Enemy Heroes)** | Nhận trọn vẹn 100% sát thương, găm vết nứt thời gian, hiển thị đồng hồ đếm ngược 2.5s trên đầu. |
| **Lính & Quái rừng (Minions & Monsters)** | Nhận 100% sát thương từ Q, E, R; không kích hoạt dấu ấn tích nổ trễ 2.5s để tránh quá tải tính toán và farm dị thường. |
| **Công trình (Turrets & Core)** | Đánh thường gây sát thương AD cơ bản. Chiêu thức không gây sát thương lên trụ và không găm vết nứt. |
| **Kháng phép & Giảm sát thương của đối thủ** | Sát thương nổ trễ là sát thương Phép (Magic Damage), do đó sẽ được giảm trừ bởi Kháng phép (MR) của nạn nhân tại thời điểm phát nổ. |
| **Hiệu ứng Bất Tử / Kháng Sát Thương (Invulnerability / Cleanse)** | Nếu đối thủ kích hoạt hiệu ứng Bất tử hoặc Đồng Hồ Cát (Zhonya) đúng thời điểm 2.5s phát nổ, sát thương nổ sẽ bị chặn 100%. Nếu đối thủ dùng Khăn Giải Thuật / Cleanse: Cleanse chỉ giải hiệu ứng khống chế (làm chậm, choáng), **không giải được Vết Nứt Thời Gian** (vì đây là dấu ấn sát thương trễ, không phải debuff khống chế). |
| **Vero bị hạ gục trước khi hết 2.5s** | Vết nứt thời gian đã găm lên nạn nhân vẫn tự động phát nổ sau khi hết thời gian 2.5s, tính theo lượng sát thương mà Vero đã kịp gây ra trước khi hy sinh. |
| **Tương tác Bot AI** | Bot Vero ưu tiên dùng Q lướt áp sát khi mục tiêu cách 4.5–6.5m; bật W khi máu dưới 70% hoặc bị đối thủ tấn công; dùng E khi có đối thủ trong bán kính 3.4m; dùng R kết liễu khi mục tiêu dưới 45% máu. |
