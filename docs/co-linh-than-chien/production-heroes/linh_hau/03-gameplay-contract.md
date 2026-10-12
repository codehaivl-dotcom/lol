# 03 · Gameplay Contract — #38 Linh Hầu (Cổ Thần Trượng)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#38 / linh_hau`  
**Vai trò chuẩn hóa:** Đấu Sĩ (Fighter) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 740 | +98 / cấp | 2,112 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 65 | +3.8 / cấp | 118.2 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 38 | +4.0 / cấp | 94.0 |
| **Kháng phép (MR)** | 32 | +1.6 / cấp | 54.4 |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.65 đòn/s | +0.018 / cấp | 0.902 đòn/s |
| **Hồi máu (HP Regen)** | 1.8 HP/s | +0.16 / cấp | 4.04 HP/s |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (LMB)
- **Kiểu tác động:** Cận chiến định hướng đơn mục tiêu (Melee Target).
- **Tầm đánh cơ bản (Đoản Trượng):** `2.0m`.
- **Tầm đánh mở rộng (Trường Trượng):** `4.8m` (khi buff `staff_reach` đang kích hoạt).
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.18\text{s}$. Tốc độ đánh tối đa theo animation: $2.5$ đòn/s.

### 2.2. Nội Tại — Thần Trượng Biến Điệu (`passive: staff_reach`)
- **Cơ chế 1 — Thế Đoản Trượng (Mặc định):**
  - Khi không ở trạng thái kích hoạt của Q, Linh Hầu cầm Đoản Trượng.
  - Tăng thêm **+15% Tốc độ đánh** (`shortAspdBonus: 0.15`) cho mọi đòn đánh thường cận chiến ở cự ly $\le 2.0\text{m}$.
- **Cơ chế 2 — Thế Trường Trượng (Kích hoạt qua Q):**
  - Khi tung trúng kỹ năng Q, chuyển sang thế Trường Trượng trong **4.0 giây** (`extendDuration: 4.0`).
  - Tầm đánh thường tăng vọt lên **4.8m** (`extendedRange: 4.8`).
- **Cơ chế 3 — Điểm Ngọt Rìa Trượng (Sweetspot Zone):**
  - Vùng sweetspot được xác định từ **2.8m đến 4.8m** (`sweetspotMin: 2.8`).
  - Mọi đòn đánh thường trúng mục tiêu nằm trong vùng này được:
    - Gây thêm **+25% sát thương** (`sweetspotBonus: 0.25`).
    - Làm chậm mục tiêu **20% trong 0.8 giây** (`slow: 0.2, duration: 0.8`).
  - Nếu mục tiêu đứng ở cự ly $< 2.8\text{m}$, đòn đánh chỉ gây sát thương 100% AD cơ bản và không có làm chậm.

### 2.3. Kỹ Năng Q — Trượng Kích Xuyên Phá (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đường đạn (Width):** `1.5m`.
- **Tốc độ đâm (Speed):** `26 m/s`.
- **Tầm xa (Range):** `7.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $55 + 80\%$ Bonus AD
  - Cấp 2: $90 + 80\%$ Bonus AD
  - Cấp 3: $125 + 80\%$ Bonus AD
  - Cấp 4: $160 + 80\%$ Bonus AD
  - Cấp 5: $195 + 80\%$ Bonus AD
- **Hiệu ứng khống chế:** Làm chậm tất cả kẻ địch trúng đòn **25% trong 1.0 giây**.
- **Hiệu ứng đặc biệt:** Kích hoạt lập tức trạng thái **Trường Trượng (4.0s)** của Nội tại.

### 2.4. Kỹ Năng W — Trượng Thủ Nghinh Phong (`skill_w`, Legacy RMB)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thời, không ngắt lệnh di chuyển).
- **Thời gian hồi chiêu (Cooldown):** `[14.0, 13.0, 12.0, 11.0, 10.0]s`.
- **Tiêu hao:** `0`.
- **Lượng khiên chắn (Shield):** Tồn tại trong `3.0s`.
  - Cấp 1: $75 + 6\%$ Máu tối đa
  - Cấp 2: $115 + 6\%$ Máu tối đa
  - Cấp 3: $155 + 6\%$ Máu tối đa
  - Cấp 4: $195 + 6\%$ Máu tối đa
  - Cấp 5: $235 + 6\%$ Máu tối đa

### 2.5. Kỹ Năng E — Hoành Tảo Bát Phương (`skill_e`)
- **Kiểu ngắm:** Diện rộng tỏa tròn quanh thân (Area PBAoE).
- **Bán kính quét (Radius):** `3.8m`.
- **Độ trễ ra đòn (Windup + Delay):** `0.1s windup + 0.1s delay`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 60\%$ Tổng AD
  - Cấp 2: $80 + 60\%$ Tổng AD
  - Cấp 3: $110 + 60\%$ Tổng AD
  - Cấp 4: $140 + 60\%$ Tổng AD
  - Cấp 5: $170 + 60\%$ Tổng AD
- **Hiệu ứng khống chế:** Làm chậm kẻ địch trúng quét **20% trong 1.0 giây**.

### 2.6. Kỹ Năng R — Cổ Thần Nộ Phách (`skill_r` — Ultimate)
- **Kiểu ngắm:** Diện rộng chọn điểm kèm lướt (Area Ground Target + Leap Dash).
- **Khoảng cách lướt nhảy (Dash Range):** `6.0m`.
- **Bán kính nện chấn động (Impact Radius):** `4.5m`.
- **Thời gian thi triển:** `0.3s windup` (chống trượng bật nhảy) + `0.4s delay` (trên không trung lao xuống).
- **Thời gian hồi chiêu (Cooldown):** `[75.0, 65.0, 55.0]s` tại các cấp 6/11/15.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1 (Lvl 6): $160 + 110\%$ Bonus AD
  - Cấp 2 (Lvl 11): $260 + 110\%$ Bonus AD
  - Cấp 3 (Lvl 15): $360 + 110\%$ Bonus AD
- **Hiệu ứng khống chế cứng:** **Làm choáng (Stun) 0.8 giây** toàn bộ mục tiêu trong bán kính 4.5m.

### 2.7. Tốc Biến Lướt Phổ Quát — `universal_dash` (Phím D)
- Tuân thủ quy định tại Tài liệu 91: Lướt nhanh 4.5m theo hướng di chuyển, i-frame né tránh 0.15s, tiêu hao thể lực chung, độc lập với kỹ năng R.

---

## 3. Quy Tắc Tương Tác Mục Tiêu & Cơ Chế Cạnh Biên (Edge Cases)

| Đối tượng | Quy tắc tương tác |
|---|---|
| **Tướng địch (Enemy Heroes)** | Nhận 100% sát thương, làm chậm và choáng từ tất cả kỹ năng. Kích hoạt đầy đủ bonus sweetspot rìa trượng. |
| **Lính & Quái rừng (Minions & Monsters)** | Nhận 100% sát thương từ đòn đánh thường, Q, E. Đòn sweetspot vẫn gây thêm 25% sát thương lên quái khủng/lính lớn. |
| **Công trình (Turrets & Core)** | Đánh thường bằng Đoản Trượng gây sát thương AD cơ bản. Trường Trượng **không áp dụng sweetspot** và **không làm chậm** công trình. |
| **Tương tác CC & Bị ngắt chiêu (Interrupts)** | Kỹ năng Q và E nếu bị ngắt trong 0.1s windup sẽ hủy chiêu và kích hoạt thời gian hồi chiêu đầy đủ. Kỹ năng R nếu bị choáng/hất văng khi đang bay trên không sẽ bị rớt xuống đất tại vị trí bị ngắt, hủy chấn động nện đất. |
| **Tương tác Bot AI** | Bot ưu tiên dùng Q khi mục tiêu ở cự ly 4.0m – 7.0m; tự động kích hoạt W khi máu dưới 50% hoặc đang chịu đòn liên tục; dùng R mở combat khi có từ 2 tướng địch đứng trong bán kính 4.5m. |
