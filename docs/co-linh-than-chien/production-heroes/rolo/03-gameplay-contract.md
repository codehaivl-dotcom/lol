# 03 · Gameplay Contract — #36 Rolo (Tê Tê Khiên)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#36 / rolo`  
**Vai trò chuẩn hóa:** Đấu Sĩ / Đỡ Đòn Cận Chiến (Fighter / Juggernaut) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 750 | +98 / cấp | 2,122 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 65 | +3.6 / cấp | 115.4 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp cơ bản (Armor)** | 42 *(+35 Nội tại Bọc Thép = 77)* | +4.2 / cấp | 100.8 *(+35 = 135.8)* |
| **Kháng phép (MR)** | 34 *(+35 Nội tại Bọc Thép = 69)* | +1.6 / cấp | 56.4 *(+35 = 91.4)* |
| **Tốc độ di chuyển (Move Speed)** | 6.1 m/s | 0 | 6.1 m/s *(+20% khi bung vảy = 7.32 m/s)* |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.65 đòn/s | +0.018 / cấp | 0.902 đòn/s *(+25% khi bung vảy = 1.128)* |
| **Hồi máu (HP Regen)** | 1.8 HP/s | +0.16 / cấp | 4.04 HP/s |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (LMB)
- **Kiểu tác động:** Cận chiến đơn mục tiêu (Melee Target).
- **Tầm đánh cơ bản:** `1.8m`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$. Tốc độ đánh tối đa theo animation: $2.4$ đòn/s.
- **Animation:** Vuốt trước bên phải cào xé ngang $\rightarrow$ Vuốt trước bên trái cào xéo lên. Khi ở Dạng Cuồng Chiến, Rolo cào liên hoàn 2 vuốt dồn dập.

### 2.2. Nội Tại — Tháo Vảy Chuyển Dạng (`passive: scale_shedding`)
- **Dạng Bọc Thép (Armored Form - Trạng thái mặc định):**
  - Rolo nhận thêm vĩnh viễn **+35 Giáp** và **+35 Kháng Phép** (`baseResistBonus: 35`).
- **Kích hoạt chuyển sang Dạng Cuồng Chiến (Berserk Shedding Form):**
  - Xảy ra khi Rolo kích hoạt kỹ năng **W (Tháo Vảy Cuồng Nộ)**.
  - Thời gian duy trì: **5.0 giây** (`shedDuration: 5.0`).
  - Trong thời gian này:
    - Rolo bị trừ **-25 Giáp** (`shedResistPenalty: 25`). *(Vẫn giữ nguyên +35 Kháng phép từ dạng bọc thép).*
    - Rolo nhận thêm **+20% Tốc độ di chuyển** (`shedSpeedBonus: 0.20`).
    - Rolo nhận thêm **+25% Tốc độ đánh** (`shedAspdBonus: 0.25`).
- **Hồi phục vảy giáp:**
  - Hết 5.0s, Rolo tự động khép vảy trở lại Dạng Bọc Thép, nhận lại đầy đủ chỉ số chống chịu ban đầu.

### 2.3. Kỹ Năng Q — Bộc Phá Vảy Sừng (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng cự ly trung bình (Skillshot Projectile / Tail Whip).
- **Khoảng cách tác động (Range):** `6.5m`.
- **Độ rộng dải tác động (Width):** `1.5m`.
- **Tốc độ đạn đạo vảy sừng (Speed):** `26 m/s`.
- **Thời gian gồng (Windup):** `0.12s`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s`.
- **Tiêu hao:** `0` (Không tốn tài nguyên).
- **Sát thương vật lý:**
  - Cấp 1: $60 + 80\%$ Bonus AD
  - Cấp 2: $95 + 80\%$ Bonus AD
  - Cấp 3: $130 + 80\%$ Bonus AD
  - Cấp 4: $165 + 80\%$ Bonus AD
  - Cấp 5: $200 + 80\%$ Bonus AD
- **Hiệu ứng khống chế:** Làm chậm kẻ địch trúng đòn **25% trong 1.0 giây**.

### 2.4. Kỹ Năng W — Tháo Vảy Cuồng Nộ (`skill_w`, Legacy RMB)
- **Kiểu ngắm:** Tự niệm tức thì (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt ngay lập tức, không ngắt lệnh di chuyển).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao:** `0`.
- **Lượng khiên hấp thụ (Shield Base):** Tồn tại trong `2.5s`.
  - Cấp 1: $75$
  - Cấp 2: $115$
  - Cấp 3: $155$
  - Cấp 4: $195$
  - Cấp 5: $235$
- **Tương tác nội tại:** Kích hoạt ngay lập tức **Dạng Cuồng Chiến** trong 5.0s theo quy định của nội tại `scale_shedding`.

### 2.5. Kỹ Năng E — Địa Chấn Tê Tê (`skill_e`)
- **Kiểu ngắm:** Diện rộng quanh tâm nhân vật (Area PBAoE Circle).
- **Bán kính rung chấn (Radius):** `3.6m`.
- **Cự ly thi triển (Range):** `0m` (Tâm là Rolo).
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 60\%$ Tổng AD
  - Cấp 2: $80 + 60\%$ Tổng AD
  - Cấp 3: $110 + 60\%$ Tổng AD
  - Cấp 4: $140 + 60\%$ Tổng AD
  - Cấp 5: $170 + 60\%$ Tổng AD
- **Hiệu ứng khống chế:** Làm chậm kẻ địch trúng đòn **35% trong 1.2 giây**.

### 2.6. Kỹ Năng R — Thiết Giáp Càn Quét (`skill_r` — Ultimate)
- **Kiểu ngắm:** Chọn vùng đất kèm phi nước đại dũng mãnh bằng 4 chân (Area Ground Target Dash).
- **Khoảng cách lao húc (Range / Dash Distance):** `6.5m`.
- **Bán kính chấn động tại điểm rơi (Radius):** `4.5m`.
- **Thời gian thi triển:** `0.2s windup + 0.3s delay` (Tổng thời gian telegraph: $0.5\text{s}$).
- **Thời gian hồi chiêu (Cooldown):** `[75.0, 65.0, 55.0]s` tại các cấp 6/11/15.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1 (Lvl 6): $160 + 110\%$ Bonus AD
  - Cấp 2 (Lvl 11): $260 + 110\%$ Bonus AD
  - Cấp 3 (Lvl 15): $360 + 110\%$ Bonus AD
- **Hiệu ứng khống chế:** Gây Choáng (Stun) toàn bộ kẻ địch trong bán kính tác động trong **0.9 giây**.
- **QUY CHUẨN ĐẶC BIỆT VỀ CƠ ĐỘNG:** Rolo phi nước đại bằng 4 chân lực lưỡng cày xới mặt đất lao tới điểm chọn. **TUYỆT ĐỐI KHÔNG CUỘN TRÒN LĂN HÚC**.

### 2.7. Tốc Biến Lướt Phổ Quát — `universal_dash` (Phím D)
- Tuân thủ quy định tại Tài liệu 91: Lướt né 4.5m theo hướng di chuyển, 0.15s i-frame, tiêu hao thể lực chung, hồi chiêu độc lập.

---

## 3. Quy Tắc Tương Tác Mục Tiêu & Cơ Chế Cạnh Biên (Edge Cases)

| Đối tượng / Tình huống | Quy tắc xử lý |
|---|---|
| **Tướng địch (Enemy Heroes)** | Nhận trọn vẹn 100% sát thương, làm chậm từ Q/E và choáng từ R. |
| **Lính & Quái rừng (Minions & Monsters)** | Nhận 100% sát thương từ Q, E, R; chịu hiệu ứng làm chậm và làm choáng bình thường. |
| **Công trình (Turrets & Core)** | Đánh thường gây sát thương AD cơ bản. Tốc độ đánh tăng thêm từ Dạng Cuồng Chiến (+25% AS) có hiệu lực khi đập trụ, giúp Rolo đẩy trụ nhanh. Chiêu thức không gây sát thương lên trụ. |
| **Ngắt chiêu khi đang lao R** | Nếu Rolo bị dính hiệu ứng Choáng hoặc Trói chân trong khi đang phi nước đại của chiêu R, hành trình lao bị chặn lại ngay lập tức tại vị trí dính CC; vụ nổ chấn động tại điểm đích bị hủy bỏ. |
| **Tương tác khiên W và lượng giáp giảm** | Lớp khiên tồn tại 2.5s trong khi Dạng Cuồng Chiến tồn tại 5.0s. Sau 2.5s khiên biến mất, Rolo vẫn tiếp tục chịu trừ 25 Giáp trong 2.5s còn lại. Đây là điểm trừng phạt có chủ đích trong thiết kế. |
| **Tương tác Bot AI** | Bot Rolo luôn duy trì dạng bọc thép khi di chuyển; dùng R mở giao tranh khi phát hiện từ 2 tướng địch tụ lại; ngay sau khi tiếp đất kích hoạt E làm chậm; bấm W khi bắt đầu áp sát đánh tay hoặc khi máu tụt xuống dưới 60%. |
