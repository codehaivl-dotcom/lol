# 03 · Gameplay Contract — #44 Tản Sơn (Thánh Sơn Cổ Thạch)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#44 / tan_son`  
**Vai trò chuẩn hóa:** Đỡ Đòn / Kiến Tạo (Tank / Juggernaut) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 780 | +105 / cấp | 2,250 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 58 | +3.2 / cấp | 102.8 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 44 | +4.5 / cấp | 107.0 |
| **Kháng phép (MR)** | 36 | +2.0 / cấp | 64.0 |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.62 đòn/s | +0.014 / cấp | 0.816 đòn/s |
| **Hồi máu (HP Regen)** | 2.0 HP/s | +0.18 / cấp | 4.52 HP/s |
| **Tuning hệ số:** | `{ hp: 1.06, dmg: 0.94 }` | (Đỡ đòn chuyên dụng trong simulator) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Cận chiến định hướng đơn mục tiêu bằng nắm đấm granite.
- **Tầm đánh cơ bản:** `2.0m`.
- **Sát thương cơ bản:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.18\text{s}$. Tốc độ đánh tối đa: $1.8$ đòn/s.

### 2.2. Nội Tại — Vách Núi Khả Thông & Thái Dương Trấn Áp (`passive: passable_ridge`)
- **Cơ chế 1 — Vách Núi Ngọc Bích Khả Thông (Passable Ridge Integration):**
  - Khi Tản Sơn kích hoạt kỹ năng W, một vách núi ngọc bích được dựng lên tồn tại trong **3.0 giây** (`ridgeDuration: 3.0`).
  - Kẻ địch bị chặn hoàn toàn bước di chuyển và mọi loại đạn đạo va chạm.
  - Tướng đồng minh có thể bước xuyên qua vách đá (hóa dạng năng lượng xanh ngọc) và nhận một lớp lá chắn đá ngọc bích hấp thụ **80 đến 240 sát thương + 8% Máu tối đa** trong 3.0 giây.
  - Tản Sơn nhận thêm **+25 Giáp và +25 Kháng phép** trong thời gian vách núi còn tồn tại.
- **Cơ chế 2 — Thái Dương Đông Sơn Trấn Áp (Solar Suppression):**
  - Khi Tản Sơn kích hoạt chiêu E, đĩa trống đồng trước ngực phát luồng hào quang mặt trời làm giảm **25% Tốc độ đánh** (`solarAsSlow: 0.25`) của mọi kẻ địch đối diện trong $1.5\text{ giây}$.

### 2.3. Kỹ Năng Q — Sơn Thạch Chấn Kích (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng tác động (Width):** `1.6m`.
- **Vận tốc lan truyền (Speed):** `22 m/s`.
- **Tầm xa (Range):** `6.5m`.
- **Thời gian gồng (Windup):** `0.2s`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $65 + 70\%$ Bonus AD
  - Cấp 2: $95 + 70\%$ Bonus AD
  - Cấp 3: $125 + 70\%$ Bonus AD
  - Cấp 4: $155 + 70\%$ Bonus AD
  - Cấp 5: $185 + 70\%$ Bonus AD
- **Hiệu ứng đi kèm:** Làm chậm $35\%$ tốc độ di chuyển của mọi mục tiêu trúng đòn trong **$1.2\text{ giây}$**.

### 2.4. Kỹ Năng W — Vách Núi Ngọc Bích (`skill_w`, chuẩn hóa từ candidate YAML `rmb`)
- **Kiểu ngắm:** Tự niệm hoặc đặt hướng vách núi (Self/Targeted Ridge Wall).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[14.0, 13.0, 12.0, 11.0, 10.0]s`.
- **Tiêu hao:** `0`.
- **Lớp lá chắn hấp thụ:**
  - Cấp 1: $80 + 8\%$ Máu tối đa của Tản Sơn (tồn tại 3.0s)
  - Cấp 2: $120 + 8\%$ Máu tối đa
  - Cấp 3: $160 + 8\%$ Máu tối đa
  - Cấp 4: $200 + 8\%$ Máu tối đa
  - Cấp 5: $240 + 8\%$ Máu tối đa
- **Quy tắc an toàn chống phá hoại đồng đội (Anti-Griefing Rules):**
  - Chặn hoàn toàn di chuyển và đạn đạo của đối phương.
  - Đồng minh đi xuyên qua nhận khiên đá bảo hộ.
  - **Tái kích hoạt (Recast):** Tản Sơn có thể bấm lại phím W để đập vỡ vách núi tức thì, giải phóng các mảnh vụn ngọc bích gây sát thương tương đương $50\%$ sát thương cơ bản của Q và làm chậm $35\%$ kẻ địch đứng cạnh.

### 2.5. Kỹ Năng E — Thái Dương Đông Sơn (`skill_e`)
- **Kiểu ngắm:** Diện rộng tỏa tròn quanh thân / quét nón phía trước (Point Blank AoE / Frontal Cone).
- **Bán kính (Radius):** `4.2m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 50\%$ Tổng AD
  - Cấp 2: $75 + 50\%$ Tổng AD
  - Cấp 3: $100 + 50\%$ Tổng AD
  - Cấp 4: $125 + 50\%$ Tổng AD
  - Cấp 5: $150 + 50\%$ Tổng AD
- **Hiệu ứng khống chế & suy yếu:**
  - Làm chậm $25\%$ tốc độ di chuyển trong $1.5\text{ giây}$.
  - Giảm $25\%$ tốc độ đánh của kẻ địch nhìn thẳng vào mặt trống đồng trong $1.5\text{ giây}$.

### 2.6. Kỹ Năng R — Địa Chấn Cổ Sơn (`skill_r`, Ultimate)
- **Kiểu ngắm:** Diện rộng chỉ định điểm nhảy (Targeted Ground Leap AoE).
- **Tầm nhảy (Range & Dash Distance):** `5.0m`.
- **Bán kính tâm chấn (Radius):** `5.5m`.
- **Độ trễ niệm (Windup & Delay):** `0.3s windup` $+ 0.3\text{s delay bay}`.
- **Thời gian hồi chiêu (Cooldown):** `[85.0, 75.0, 65.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $160 + 90\%$ Bonus AD
  - Cấp 2: $250 + 90\%$ Bonus AD
  - Cấp 3: $340 + 90\%$ Bonus AD
- **Hiệu ứng khống chế cứng:** Làm choáng (Stun) và hất tung toàn bộ kẻ địch trong phạm vi $5.5\text{m}$ trong **$1.0\text{ giây}$**.

### 2.7. Universal Dash — Phím D (Chuẩn Doc 91)
- Lướt né khoảng cách $4.5\text{m}$ theo hướng di chuyển. Thời gian hồi chiêu 14s. Không tiêu hao tài nguyên.

---

## 3. Quy Tắc Tác Động & Xử Lý Tình Huống Giới Hạn (Edge Cases)

1. **Tương tác Vách Núi với Lính và Boss:**
   - Lính địch gặp vách núi sẽ tự động tìm đường đi vòng qua hai đầu mút; nếu không có đường đi, lính địch sẽ dừng lại chờ vách núi hết hiệu lực.
   - Quái Rừng và Boss (Thuồng Luồng Cổ Linh Long) không bị chặn đường hoàn toàn bởi vách núi; vách núi sẽ tự vỡ nếu bị Boss dẫm trực tiếp lên.
2. **Tương tác Vách Núi với kỹ năng Lướt và Tốc Biến:**
   - Kẻ địch sử dụng chiêu lướt vượt địa hình (như phím D hoặc kỹ năng vượt tường) có thể nhảy qua Vách Núi Ngọc Bích bình thường.
   - Kỹ năng kéo (Hook) của đối thủ sẽ bị vách núi chặn đứng như một bức tường địa hình kiên cố.
3. **Cộng dồn Khiên Đá:**
   - Mỗi tướng đồng minh chỉ nhận khiên đá từ vách núi 1 lần duy nhất trong mỗi lần kích hoạt W; việc chạy qua lại nhiều lần không cộng dồn thêm lớp khiên mới.
