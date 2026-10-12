# 03 · Gameplay Contract — #02 Brak (Nhịp Quyền)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#02 / brak`  
**Vai trò chuẩn hóa:** Đấu Sĩ Phản Đòn Cận Chiến (Heavy Rhythm Brawler) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 730 | +96 / cấp | 2,074 |
| **Nội năng / Mana** | 0 (Không tốn tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 68 | +3.8 / cấp | 121.2 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 38 | +3.9 / cấp | 92.6 |
| **Kháng phép (MR)** | 32 | +1.6 / cấp | 54.4 |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.65 đòn/s | +0.017 / cấp | 0.888 đòn/s |
| **Hồi máu (HP Regen)** | 1.8 HP/s | +0.16 / cấp | 4.04 HP/s |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (LMB)
- **Kiểu tác động:** Cận chiến va chạm nặng đơn mục tiêu (Melee Blunt).
- **Tầm đánh cơ bản:** `1.8m`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$.
- **Animation:** Tung cú đấm thẳng piston bằng tay phải xen kẽ cú móc sườn bằng tay trái; luồng hơi nước phụt nhẹ ở khuỷu tay mỗi cú vung đòn.

### 2.2. Nội Tại — Nhịp Quyền Piston Parry (`passive: parry_piston`)
- **Nguyên lý cơ chế:**
  - Tương tác trực tiếp với thế thủ của **Kỹ năng W**.
  - Khi Brak kích hoạt W, một cửa sổ phản nhịp **0.75 giây** (`parryWindow: 0.75`) được mở ra.
  - Khi nhận bất kỳ đòn đánh thường hoặc kỹ năng gây sát thương nào từ kẻ địch trong cửa sổ 0.75s này:
    1. **Giảm sát thương nhận vào:** Sát thương của đòn đánh đó được giảm trực tiếp **$60\%$** (theo kiểm chứng `wave2-gameplay-toys.test.mjs`).
    2. **Kích hoạt phản kích Piston hơi nước bộc phát (`passive:parry_piston_proc`):** Toàn bộ áp suất buồng thủy lực nén cực đại bung mở, Brak tự động xuất ra một cú đấm phản kích sấm sét vào kẻ tấn công (nếu trong tầm 3.0m).
    3. **Sát thương phản kích:** Gây sát thương vật lý bằng $100\%\text{ AD cơ bản} + 35\%\text{ lượng sát thương bị giảm}$ (`counterBonusRatio: 0.35`).
    4. **Hiệu ứng khống chế cứng:** **Làm choáng (Stun) 0.5 giây** (`counterStun: 0.5`) kẻ tấn công, bẻ gãy tức khắc chuỗi combo của đối thủ.
    5. **Tiêu hao thế thủ:** Ngay khi phản kích thành công, trạng thái thủ parry được tiêu hao (`parryUntil = 0`).

### 2.3. Kỹ Năng Q — Piston Trực Quyền (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đường đấm (Width):** `1.5m`.
- **Tốc độ đòn đấm (Speed):** `26 m/s`.
- **Khoảng cách tác động (Range):** `5.5m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $65 + 85\%$ Bonus AD
  - Cấp 2: $100 + 85\%$ Bonus AD
  - Cấp 3: $135 + 85\%$ Bonus AD
  - Cấp 4: $170 + 85\%$ Bonus AD
  - Cấp 5: $205 + 85\%$ Bonus AD
- **Hiệu ứng khống chế mềm:** Làm chậm mục tiêu đầu tiên trúng phải **25% trong 1.0 giây**.

### 2.4. Kỹ Năng W — Nghênh Kích Thủ Thế (`skill_w`, Legacy RMB)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì).
- **Thời gian hồi chiêu (Cooldown):** `[12.0, 11.0, 10.0, 9.0, 8.0]s`.
- **Tiêu hao:** `0`.
- **Lượng khiên chắn (Shield):** Tồn tại trong `2.0s`.
  - Cấp 1: $80\text{ khiên}$
  - Cấp 2: $125\text{ khiên}$
  - Cấp 3: $170\text{ khiên}$
  - Cấp 4: $215\text{ khiên}$
  - Cấp 5: $260\text{ khiên}$
- **Cửa sổ Parry:** Mở trạng thái phản đòn trong `0.75s`. Nếu nhận đòn đánh trong thời gian này, kích hoạt toàn bộ cơ chế của Nội tại `parry_piston`.

### 2.5. Kỹ Năng E — Địa Chấn Xung Kích (`skill_e`)
- **Kiểu ngắm:** Diện rộng quanh thân (PBAoE Circle).
- **Bán kính xung kích (Radius):** `3.8m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 60\%$ Tổng AD
  - Cấp 2: $80 + 60\%$ Tổng AD
  - Cấp 3: $110 + 60\%$ Tổng AD
  - Cấp 4: $140 + 60\%$ Tổng AD
  - Cấp 5: $170 + 60\%$ Tổng AD
- **Hiệu ứng khống chế mềm:** Làm chậm toàn bộ kẻ địch trong bán kính 3.8m **30% trong 1.2 giây**.

### 2.6. Kỹ Năng R — Hơi Nước Bộc Phá (`skill_r` — Ultimate)
- **Kiểu ngắm:** Chọn điểm mặt đất kèm nhảy lao nện (Area Ground Target Leap).
- **Khoảng cách lướt nhảy (Range / Dash Distance):** `6.0m`.
- **Bán kính vụ nổ va đập (Radius):** `4.5m`.
- **Thời gian thi triển:** `0.2s windup` (gồng áp suất) + `0.3s delay` (lao tới va đập).
- **Thời gian hồi chiêu (Cooldown):** `[75.0, 65.0, 55.0]s` tại các cấp 6/11/15.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1 (Lvl 6): $160 + 110\%$ Bonus AD
  - Cấp 2 (Lvl 11): $260 + 110\%$ Bonus AD
  - Cấp 3 (Lvl 15): $360 + 110\%$ Bonus AD
- **Hiệu ứng khống chế cứng:** **Làm choáng (Stun) 1.0 giây** toàn bộ mục tiêu trong bán kính 4.5m.

### 2.7. Tốc Biến Lướt Phổ Quát — `universal_dash` (Phím D)
- Tuân thủ quy định tại Tài liệu 91: Lướt nhanh 4.5m theo hướng di chuyển, i-frame né tránh 0.15s, tiêu hao thể lực chung, độc lập với kỹ năng của Brak.

---

## 3. Quy Tắc Tương Tác Mục Tiêu & Cơ Chế Cạnh Biên (Edge Cases)

| Tình huống / Đối tượng | Quy tắc giải quyết logic |
|---|---|
| **Đòn tấn công từ xa (Ranged Attack)** | Khi Brak parry thành công đạn đạo từ tướng tầm xa (>3.0m): Vẫn được giảm 60% sát thương và tạo khiên, nhưng cú đấm phản kích cận chiến không thể với tới mục tiêu; thay vào đó xả ra luồng sóng khí nén gây 50% sát thương phản kích mà không làm choáng kẻ địch ở xa. |
| **Sát thương theo thời gian (DoT / Bleed)** | Các tick sát thương DoT không kích hoạt cú đấm phản kích parry; chỉ có đòn đánh trực tiếp (direct hit / ability hit) đầu tiên mới kích hoạt phản kích. |
| **Khống chế cứng khi đang bật W (Hard CC during Parry)** | Nếu đòn tấn công có kèm hiệu ứng làm choáng/hất văng, Brak đón đỡ và vô hiệu hóa hiệu ứng khống chế của đòn đánh đó, đồng thời làm choáng ngược lại kẻ tấn công trong 0.5s. |
| **Bait Parry (Bị nhử hết thời gian W)** | Nếu sau 0.75s không có đòn nào đánh trúng, trạng thái parry hết hiệu lực; lớp khiên cơ bản tồn tại tiếp trong 1.25s rồi biến mất; kỹ năng W rơi vào hồi chiêu 12–8s. |
| **Hành vi Bot AI điều khiển Brak** | Bot ưu tiên dùng Q để tiếp cận khi mục tiêu trong tầm 5.5m; giữ W và chỉ kích hoạt khi đối phương bắt đầu chuỗi animation tấn công hoặc khi máu đối phương dồn sát thương; dùng E sau khi parry thành công để bồi làm chậm; dùng R khi có 2 tướng địch tụ tập trong phạm vi 6.0m. |
