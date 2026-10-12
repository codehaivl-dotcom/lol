# 03 · Gameplay Contract — #33 Eelix (Lươn Sóng Thủy Uyên)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#33 / eelix`  
**Vai trò chuẩn hóa:** Sát Thủ Thủy Uyên (Assassin / Abyssal Wake Skirmisher) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

Dữ liệu kế thừa chính xác từ Candidate YAML (`tools/sim/candidates/eelix.yml`):

| Chỉ số (Stat) | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 (Max Level) |
|---|---|---|---|
| **Máu (HP)** | 630 | +86 / cấp | 1,834 |
| **Năng lượng / Nội năng (Resource)** | **0 (Không dùng tài nguyên)** | 0 | 0 |
| **Sát thương vật lý (AD)** | 66 | +3.7 / cấp | 117.8 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp vật lý (Armor)** | 30 | +3.4 / cấp | 77.6 |
| **Kháng phép (Magic Resist)** | 30 | +1.2 / cấp | 46.8 |
| **Tốc độ di chuyển (Move Speed)** | 6.6 m/s (Rất nhanh) | 0 | 6.6 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.70 đòn/s | +0.024 / cấp | 1.036 đòn/s |
| **Hồi máu tự nhiên (HP Regen)** | 1.5 HP/s | +0.13 / cấp | 3.32 HP/s |
| **Hồi tài nguyên (Resource Regen)** | 0 | 0 | 0 |
| **Hệ số cân bằng (Balance Tuning)** | HP: 0.98 | DMG: 1.03 | — |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Chuột trái / LMB)
- **Kiểu ngắm:** Cận chiến đơn mục tiêu (Melee Strike).
- **Tầm đánh (Range):** `1.7m`.
- **Tốc độ đòn đánh:** Theo Attack Speed ($0.70$ đòn/s gốc).
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.12\text{s}$.
- **Hiệu ứng đặc biệt trên vệt nước:** Nếu Eelix đang đứng trên vệt nước `shadow_wake`, đòn đánh kích hoạt **Lôi Điện Lan Tỏa (Chain Lightning)**: Gây thêm sát thương phép tương đương **45% bonus AD** (`chainLightningAd: 0.45`) giật lan sang tối đa 2 mục tiêu lân cận trong bán kính $3.0\text{m}$ (`proc("passive:shadow_wake_strike")`).

### 2.2. Nội Tại — Lươn Sóng Thủy Uyên (`passive: shadow_wake`)
- **Cơ chế Vệt Nước Bóng Tối:**
  - Kỹ năng Q để lại một vệt nước bóng tối ẩm ướt lơ lửng $0.3\text{m}$ trên mặt đất kéo dài trong **3.5 giây** (`wakeDuration: 3.5`).
- **Gia tốc trườn lướt:**
  - Khi di chuyển trên vệt nước, Eelix nhận thêm **+35% Tốc độ di chuyển** (`wakeSpeedBonus: 0.35`). Tốc độ thực tế đạt trên $8.9\text{m/s}$.
- **Cường hóa đòn đánh:** Kích hoạt thuộc tính giật sét lan tỏa cho đòn đánh thường cận chiến.

### 2.3. Kỹ Năng Q — Thủy Uyên Trườn Lướt (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng kết hợp Lướt (Skillshot Line + Dash Toward).
- **Chiều rộng đường lướt (Width):** `1.4m`.
- **Tốc độ lướt (Speed):** `30 m/s`.
- **Cự ly lướt (Range / Distance):** `7.2m`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s`.
- **Tiêu hao tài nguyên:** `0` (Không tốn năng lượng).
- **Sát thương vật lý bộc phát:**
  - Cấp 1: $65 + 85\%$ bonus AD
  - Cấp 2: $100 + 85\%$ bonus AD
  - Cấp 3: $135 + 85\%$ bonus AD
  - Cấp 4: $170 + 85\%$ bonus AD
  - Cấp 5: $205 + 85\%$ bonus AD
- **Hiệu ứng kèm theo:** Làm chậm kẻ địch trúng đòn $25\%$ trong **1.2s**. Để lại vệt nước bóng tối tồn tại trong 3.5s (`proc("passive:shadow_wake")`).

### 2.4. Kỹ Năng W — Hắc Thủy Thuẫn (`skill_w` — Ánh xạ từ legacy `rmb`)
- **Kiểu ngắm:** Tự niệm tức thời (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì, không ngắt di chuyển).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao tài nguyên:** `0`.
- **Giá trị khiên chắn (Shield):**
  - Cấp 1: $60$ (kéo dài 2.5s)
  - Cấp 2: $95$
  - Cấp 3: $130$
  - Cấp 4: $165$
  - Cấp 5: $200$
- **Hiệu ứng đặc biệt:** Eelix chìm ngập một phần cơ thể vào bóng tối của vệt nước, miễn nhiễm làm chậm trong $1.0\text{s}$ đầu tiên.

### 2.5. Kỹ Năng E — Lôi Điện Xung Phá (`skill_e`)
- **Kiểu ngắm:** Tỏa tròn quanh thân (Self PBAoE).
- **Bán kính xung điện (Radius):** `3.6m`.
- **Tầm thi triển (Range):** `0m` (Tâm phát tại Eelix).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s`.
- **Tiêu hao tài nguyên:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 50\%$ AD
  - Cấp 2: $80 + 50\%$ AD
  - Cấp 3: $110 + 50\%$ AD
  - Cấp 4: $140 + 50\%$ AD
  - Cấp 5: $170 + 50\%$ AD
- **Hiệu ứng khống chế:** Phóng luồng điện giật làm chậm toàn bộ kẻ địch trong bán kính $3.6\text{m}$ đi $35\%$ trong **1.0 giây**.

### 2.6. Kỹ Năng R — Thâm Hải Cuồng Nộ (`skill_r` — Ultimate Tối Thượng)
- **Kiểu ngắm:** Khóa mục tiêu đơn lẻ kết hợp Lao tới (Targeted Dash Strike).
- **Tầm thi triển (Range / Distance):** `7.5m`.
- **Thời gian gồng (Windup):** `0.2s`.
- **Thời gian hồi chiêu (Cooldown):** `[70, 60, 50]s`.
- **Tiêu hao tài nguyên:** `0`.
- **Sát thương vật lý cực đại:**
  - Cấp 1: $190 + 120\%$ bonus AD
  - Cấp 2: $290 + 120\%$ bonus AD
  - Cấp 3: $390 + 120\%$ bonus AD
- **Hiệu ứng khống chế tối thượng:** Eelix cuộn tròn thân mình lao thẳng xuyên thủng mục tiêu, **Làm Choáng (Stun) 0.8 giây** con mồi và ngắt mọi hành động của đối phương.

### 2.7. Tốc Biến Phổ Quát — `universal_dash` (Phím D — Doc 91)
- **Tầm lướt:** `4.5m` theo hướng chỉ định.
- **Thời gian thực hiện:** `0.22s`.
- **Tiêu hao:** Nội năng / Stamina chung của hệ thống, hồi chiêu 14s.

---

## 3. Quy Tắc Xử Lý & Edge Cases Kỹ Thuật

1. **Tương tác lướt xuyên địa hình mỏng:**
   - Cú lướt Q ($7.2\text{m}$) và R ($7.5\text{m}$) cho phép Eelix vượt qua các gờ tường đá mỏng của rừng nếu khoảng cách lướt đủ để vượt qua bờ bên kia.
2. **Kích hoạt đòn đánh sét lan:**
   - Đòn đánh sét lan chỉ kích hoạt khi vị trí của Eelix nằm trong bán kính vệt nước; nếu đã bước ra ngoài dù chỉ $0.1\text{m}$, đòn đánh chỉ tính sát thương vật lý đơn mục tiêu thông thường.
3. **Cắt ngang cú lao R:**
   - Trong $0.2\text{s}$ windup của R, nếu Eelix bị khống chế cứng (Choáng/Fear), cú lao sẽ bị hủy và hồi chiêu hoàn trả $50\%$.
