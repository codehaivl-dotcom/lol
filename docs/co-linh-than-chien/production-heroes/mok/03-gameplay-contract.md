# 03 · Gameplay Contract — #37 Mok (Trinh Sát Cổ Đăng Tác Chiến)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#37 / mok`  
**Vai trò chuẩn hóa:** Hỗ Trợ / Trinh Sát Tác Chiến (Support / Scout) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

Dữ liệu kế thừa chính xác từ Candidate YAML (`tools/sim/candidates/mok.yml`):

| Chỉ số (Stat) | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 (Max Level) |
|---|---|---|---|
| **Máu (HP)** | 650 | +90 / cấp | 1,910 |
| **Năng lượng (Mana)** | 330 | +40 / cấp | 890 |
| **Sát thương vật lý (AD)** | 50 | +2.9 / cấp | 90.6 |
| **Sức mạnh phép thuật (AP)** | 0 | +0 / cấp (tăng theo trang bị) | 0 (gốc) |
| **Giáp vật lý (Armor)** | 32 | +3.6 / cấp | 82.4 |
| **Kháng phép (Magic Resist)** | 34 | +1.8 / cấp | 59.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.25 m/s | 0 | 6.25 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.625 đòn/s | +0.015 / cấp | 0.835 đòn/s |
| **Hồi máu tự nhiên (HP Regen)** | 1.6 HP/s | +0.15 / cấp | 3.70 HP/s |
| **Hồi năng lượng (Mana Regen)** | 1.8 Mana/s | +0.14 / cấp | 3.76 Mana/s |
| **Hệ số cân bằng (Balance Tuning)** | HP: 1.02 | DMG: 0.92 | — |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Chuột trái / LMB)
- **Kiểu ngắm:** Đạn đạo tầm xa đơn mục tiêu (Ranged Projectile).
- **Tầm bắn (Range):** `5.8m`.
- **Tốc độ đạn (Speed):** `22 m/s`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$.
- **Hiệu ứng:** Bắn ra một hạt phấn hoa huỳnh quang phát sáng màu vàng lục.

### 2.2. Nội Tại — Cổ Đăng Tác Chiến (`passive: lantern_beacon`)
- **Cơ chế Cổ Đăng:**
  - Mok mang theo một Cổ Đăng Tinh Thạch trên lưng. Khi thi triển kỹ năng Q, Cổ Đăng được cắm tại vị trí chỉ định.
  - Cổ Đăng tồn tại trong **8.0 giây** (`lanternDuration: 8.0`), mở ra vùng tầm nhìn chuẩn bán kính **6.0m** (`lanternRadius: 6.0`).
  - Soi sáng sương mù chiến tranh (Fog of War) và **phát hiện mọi đơn vị tàng hình / ngụy trang** trong vùng bán kính 6.0m.
  - Cổ Đăng có **2 vạch máu**; đòn đánh thường của tướng địch trừ 1 vạch.
- **Tiêu thụ đèn (Detonation):**
  - Khi Mok kích hoạt kỹ năng W, ngọn Cổ Đăng hiện có trên sân lập tức bị tiêu thụ và bùng nổ sóng huỳnh quang:
    - Làm chậm kẻ địch trong vùng $6.0\text{m}$ đi **30%** trong **1.5s** (`detonateSlow: 0.30`).
    - Hồi phục thêm **50 HP** (`detonateHeal: 50`) cho đồng minh đứng quanh đèn.
    - Cổ Đăng biến mất ngay lập tức sau khi nổ (`proc("passive:lantern_detonated")`).

### 2.3. Kỹ Năng Q — Cắm Cổ Đăng (`skill_q`)
- **Kiểu ngắm:** Định hướng ném vật thể (Skillshot Projectile / Ground Placement).
- **Chiều rộng đạn ném (Width):** `1.4m`.
- **Tốc độ bay (Speed):** `26 m/s`.
- **Tầm xa (Range):** `8.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[40, 45, 50, 55, 60]` mana.
- **Sát thương phép thuật khi ném trúng:**
  - Cấp 1: $50 + 45\%$ AP
  - Cấp 2: $80 + 45\%$ AP
  - Cấp 3: $110 + 45\%$ AP
  - Cấp 4: $140 + 45\%$ AP
  - Cấp 5: $170 + 45\%$ AP
- **Hiệu ứng kèm theo:** Làm chậm kẻ địch trúng đòn $25\%$ trong **1.2s**. Tại điểm tiếp đất, cắm ngọn Cổ Đăng soi sáng bán kính $6.0\text{m}$ trong 8.0s (kích hoạt nội tại `lantern_beacon`, ghi nhận `proc("passive:lantern_placed")`).

### 2.4. Kỹ Năng W — Huỳnh Quang Hộ Mệnh (`skill_w` — Ánh xạ từ legacy `rmb`)
- **Kiểu ngắm:** Tự niệm diện rộng tức thời (Self PBAoE Aura).
- **Bán kính bảo hộ (Radius):** `5.5m` quanh Mok.
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[60, 65, 70, 75, 80]` mana.
- **Giá trị khiên chắn (Shield cho bản thân & đồng minh):**
  - Cấp 1: $65$ (kéo dài 3.0s)
  - Cấp 2: $95$
  - Cấp 3: $125$
  - Cấp 4: $155$
  - Cấp 5: $185$
- **Giá trị hồi máu (Heal cho bản thân & đồng minh):**
  - Cấp 1: $45 + 25\%$ AP
  - Cấp 2: $70 + 25\%$ AP
  - Cấp 3: $95 + 25\%$ AP
  - Cấp 4: $120 + 25\%$ AP
  - Cấp 5: $145 + 25\%$ AP
- **Tương tác tiêu thụ đèn:** Đồng thời kích nổ toàn bộ Cổ Đăng đang tồn tại trên bản đồ theo quy tắc nội tại `passive:lantern_beacon`.

### 2.5. Kỹ Năng E — Đăng Mộc Triền Nhiễu (`skill_e`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đường đạn (Width):** `1.6m`.
- **Tốc độ bay (Speed):** `24 m/s`.
- **Tầm xa (Range):** `7.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[55, 60, 65, 70, 75]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $45 + 35\%$ AP
  - Cấp 2: $70 + 35\%$ AP
  - Cấp 3: $95 + 35\%$ AP
  - Cấp 4: $120 + 35\%$ AP
  - Cấp 5: $145 + 35\%$ AP
- **Hiệu ứng khống chế:** Trói Chân (Root) kẻ địch đầu tiên trúng phải trong **1.0 giây**.

### 2.6. Kỹ Năng R — Vạn Thảo Quang Minh (`skill_r` — Ultimate Tối Thượng)
- **Kiểu ngắm:** Đại hào quang diện rộng quanh thân (Grand PBAoE Aura).
- **Bán kính ảnh hưởng (Radius):** `6.5m`.
- **Tầm thi triển (Range):** `0m` (Tâm phát tại Mok).
- **Độ trễ phát tác (Delay):** `0.2s`.
- **Thời gian niệm (Windup):** `0.25s`.
- **Thời gian hồi chiêu (Cooldown):** `[85, 75, 65]s`.
- **Tiêu hao năng lượng (Mana Cost):** `100` mana ở mọi cấp.
- **Giá trị hồi phục đại trận (Heal cho toàn đội):**
  - Cấp 1: $120 + 40\%$ AP
  - Cấp 2: $190 + 40\%$ AP
  - Cấp 3: $260 + 40\%$ AP
- **Giá trị khiên đại trận (Shield trong 3.5s):**
  - Cấp 1: $80$
  - Cấp 2: $130$
  - Cấp 3: $180$
- **Hiệu ứng lên kẻ địch:** Toàn bộ kẻ địch trong bán kính $6.5\text{m}$ bị làm chậm $35\%$ trong **2.0 giây**.

### 2.7. Tốc Biến Phổ Quát — `universal_dash` (Phím D — Doc 91)
- **Tầm lướt:** `4.5m` theo hướng chỉ định.
- **Thời gian thực hiện:** `0.22s`.
- **Tiêu hao:** Nội năng / Stamina chung của hệ thống, hồi chiêu 14s.

---

## 3. Quy Tắc Xử Lý & Edge Cases Kỹ Thuật

1. **Số lượng đèn tối đa trên sân:**
   - Tại một thời điểm, Mok chỉ được duy trì tối đa **1 ngọn Cổ Đăng**. Nếu cắm ngọn thứ 2 khi ngọn thứ 1 chưa hết hạn, ngọn thứ 1 sẽ biến mất mà không kích hoạt nổ.
2. **Cơ chế phá đèn:**
   - Cổ Đăng không bị tổn thương bởi sát thương diện rộng phép thuật (AoE Magic Damage) nhằm tránh bị phá ngẫu nhiên; chỉ bị tổn thương bởi đòn đánh thường có chủ đích của tướng địch (2 đòn đánh).
3. **Phân tách minh bạch Khiên & Hồi máu:**
   - Chiêu W và R cung cấp cả khiên và hồi máu. Giá trị hồi máu ghi nhận vào `m.allyHealed` / `m.healed`; khiên ghi nhận độc lập vào `m.shieldGiven`.
