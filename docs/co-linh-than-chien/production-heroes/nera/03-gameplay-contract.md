# 03 · Gameplay Contract — #07 Nera (Dạ Neo)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#07 / nera`  
**Vai trò chuẩn hóa:** Xạ Thủ Tự Bảo Kê Cơ Động (High-Mobility Self-Peel Marksman) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 600 | +84 / cấp | 1,776 |
| **Nội năng / Mana** | 340 | +40 / cấp | 900 |
| **Sát thương vật lý (AD)** | 62 | +3.5 / cấp | 111.0 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 28 | +3.2 / cấp | 72.8 |
| **Kháng phép (MR)** | 30 | +1.2 / cấp | 46.8 |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.67 đòn/s | +0.024 / cấp | 1.006 đòn/s |
| **Hồi máu (HP Regen)** | 1.4 HP/s | +0.12 / cấp | 3.08 HP/s |
| **Hồi nội năng (Mana Regen)** | 1.6 Mana/s | +0.10 / cấp | 3.00 Mana/s |
| **Tầm bắn cơ bản (Attack Range)** | 7.0m | 0 | 7.0m |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (LMB)
- **Kiểu tác động:** Đạn đạo tầm xa đơn mục tiêu (Ranged Projectile).
- **Tầm đánh cơ bản:** `7.0m`.
- **Tốc độ đạn bay (Projectile Speed):** `38 m/s`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.12\text{s}$.
- **Tương tác nội tại:** Tích lũy điểm cộng dồn cho Nội tại `anchor_tether` lên mục tiêu tướng.

### 2.2. Nội Tại — Dạ Neo Tự Bảo Kê (`passive: anchor_tether`)
- **Nguyên lý kích hoạt:**
  - Mỗi khi Nera tấn công trúng cùng một tướng địch **3 đòn đánh thường** liên tiếp (`shotsPerAnchor: 3`):
  - Mục tiêu bị găm một sợi **Xích Neo Cổ Linh** trong **3.0 giây** (`anchorDuration: 3.0`).
- **Hiệu ứng Kiting (Thả diều an toàn):**
  - Trong thời gian xích neo tồn tại, mỗi khi Nera di chuyển theo phương tạo góc tù ($>90^\circ$, tức là di chuyển cách xa mục tiêu):
  - Nera nhận ngay **+18% Tốc độ di chuyển** (`kitingSpeedBoost: 0.18`), tương đương tăng từ $6.2\text{ m/s} \rightarrow 7.316\text{ m/s}$.
  - Giúp Nera duy trì hoàn hảo khoảng cách vàng an toàn 6.5m–7.0m mà không bị đối thủ áp sát.

### 2.3. Kỹ Năng Q — Xuyên Thấu Tiễn (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng tầm xa (Skillshot Piercing Line).
- **Chiều rộng mũi tên (Width):** `1.4m`.
- **Tốc độ mũi tên (Speed):** `34 m/s`.
- **Khoảng cách tác động (Range):** `9.5m`.
- **Thời gian gồng (Windup):** `0.12s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s`.
- **Tiêu hao năng lượng (Mana):** `[40, 45, 50, 55, 60]`.
- **Sát thương vật lý:**
  - Cấp 1: $60 + 85\%$ Bonus AD
  - Cấp 2: $95 + 85\%$ Bonus AD
  - Cấp 3: $130 + 85\%$ Bonus AD
  - Cấp 4: $165 + 85\%$ Bonus AD
  - Cấp 5: $200 + 85\%$ Bonus AD
- **Cơ chế xuyên phá & Khống chế:** Mũi tên xuyên qua toàn bộ lính trên đường bay; gây sát thương đầy đủ và **làm chậm 25% trong 1.2 giây** tướng địch đầu tiên trúng phải.

### 2.4. Kỹ Năng W — Phóng Tời Hai Chiều (`skill_w`, Legacy RMB)
- **Kiểu ngắm:** Định hướng phóng móc kèm lướt lùi phản lực (Skillshot Hook & Recoil Dash).
- **Chiều rộng móc neo (Width):** `1.6m`.
- **Tốc độ móc bay (Speed):** `30 m/s`.
- **Khoảng cách phóng (Range):** `7.0m`.
- **Khoảng cách lướt lùi (Dash Distance):** `4.5m` ngược hướng ngắm (`toward: false`).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao năng lượng (Mana):** `[60, 65, 70, 75, 80]`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 50\%$ Tổng AD
  - Cấp 2: $80 + 50\%$ Tổng AD
  - Cấp 3: $110 + 50\%$ Tổng AD
  - Cấp 4: $140 + 50\%$ Tổng AD
  - Cấp 5: $170 + 50\%$ Tổng AD
- **Hiệu ứng khống chế mềm:** Kẻ địch trúng móc neo bị **làm chậm 35% trong 1.5 giây**.
- **Cơ chế thoát hiểm:** Nera lập tức lướt bay lùi lại 4.5m ngay khi bắn móc, tạo ra khoảng cách an toàn tức thời.

### 2.5. Kỹ Năng E — Lưới Neo Dây Bẫy (`skill_e`)
- **Kiểu ngắm:** Chọn điểm mặt đất diện rộng (Ground Target Area Trap).
- **Bán kính vùng bẫy (Radius):** `3.4m`.
- **Khoảng cách đặt bẫy (Range):** `7.5m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s`.
- **Tiêu hao năng lượng (Mana):** `[55, 60, 65, 70, 75]`.
- **Sát thương vật lý:**
  - Cấp 1: $45 + 55\%$ Tổng AD
  - Cấp 2: $75 + 55\%$ Tổng AD
  - Cấp 3: $105 + 55\%$ Tổng AD
  - Cấp 4: $135 + 55\%$ Tổng AD
  - Cấp 5: $165 + 55\%$ Tổng AD
- **Hiệu ứng khống chế mềm:** Vùng dây bẫy tồn tại trong 3.5s; bất kỳ kẻ địch nào bước vào hoặc đứng trong vùng đều bị **làm chậm 30% trong 1.5 giây**.

### 2.6. Kỹ Năng R — Đại Cực Neo Trấn Áp (`skill_r` — Ultimate)
- **Kiểu ngắm:** Định hướng tầm cực xa (Extreme Range Skillshot Anchor).
- **Chiều rộng mỏ neo (Width):** `1.8m`.
- **Tốc độ phóng (Speed):** `32 m/s`.
- **Khoảng cách tác động (Range):** `12.0m`.
- **Thời gian gồng (Windup):** `0.25s`.
- **Thời gian hồi chiêu (Cooldown):** `[80.0, 70.0, 60.0]s` tại các cấp 6/11/15.
- **Tiêu hao năng lượng (Mana):** `100` tại mọi cấp.
- **Sát thương vật lý:**
  - Cấp 1 (Lvl 6): $180 + 110\%$ Bonus AD
  - Cấp 2 (Lvl 11): $280 + 110\%$ Bonus AD
  - Cấp 3 (Lvl 15): $380 + 110\%$ Bonus AD
- **Hiệu ứng khống chế cứng:** **Làm choáng (Stun) 1.2 giây** tướng địch đầu tiên trúng phải, đồng thời cuộn tời cơ khí giật mạnh kéo mục tiêu lệch vị trí 2.0m về hướng Nera.

### 2.7. Tốc Biến Lướt Phổ Quát — `universal_dash` (Phím D)
- Tuân thủ quy định tại Tài liệu 91: Lướt nhanh 4.5m theo hướng di chuyển, i-frame né tránh 0.15s, tiêu hao thể lực chung, độc lập với cú giật lùi của W.

---

## 3. Quy Tắc Tương Tác Mục Tiêu & Cơ Chế Cạnh Biên (Edge Cases)

| Tình huống / Đối tượng | Quy tắc giải quyết logic |
|---|---|
| **Va chạm tường khi lướt W (Wall Collision)** | Nếu Nera bấm W khi lưng đang tựa vào tường mỏng ($\le 1.5\text{m}$), Nera có thể lướt giật lùi xuyên qua tường sang bên kia; nếu tường dày ($>1.5\text{m}$), Nera dừng lại ngay mép tường và không bị kẹt va chạm. |
| **Bị trói chân / Sa lầy khi dùng W (Rooted/Grounded)** | Nếu Nera đang chịu hiệu ứng trói chân (Root) hoặc sa lầy (Grounded), Nera không thể kích hoạt cú lướt lùi của W (chỉ phóng móc gây sát thương tại chỗ nếu cố bấm). |
| **Tương tác chặn đạn (Projectile Blockers - Kora #32)** | Càng khiên của Kora chặn hoàn toàn đạn đạo của Q, W và R; không gây sát thương hay làm choáng mục tiêu phía sau khiên. |
| **Độ ưu tiên mục tiêu của đòn đánh thường** | Nera ưu tiên tướng địch có ít máu nhất trong tầm bắn 7.0m; tự động chuyển mục tiêu sang kẻ bị dính xích neo để tối ưu hóa việc thả diều. |
| **Hành vi Bot AI điều khiển Nera** | Bot Nera luôn giữ cự ly 6.0m–7.0m với đối thủ; khi đối thủ áp sát dưới 4.0m lập tức tung W giật lùi; dùng Q để cấu rỉa liên tục khi còn trên 40% mana; tung R khi phát hiện đối thủ yếu máu đang rút lui hoặc khi mở giao tranh từ xa. |
