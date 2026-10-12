# 03 · Gameplay Contract — #48 Oneira (Mộng Thể Mặt Nạ Hút Khống Chế)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#48 / oneira`  
**Vai trò chuẩn hóa:** Hỗ Trợ Thanh Tẩy Chuyển Hóa (Support / CC Transmuter & Enchanter) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

Dữ liệu kế thừa chính xác từ Candidate YAML (`tools/sim/candidates/oneira.yml`):

| Chỉ số (Stat) | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 (Max Level) |
|---|---|---|---|
| **Máu (HP)** | 640 | +88 / cấp | 1,872 |
| **Năng lượng (Mana)** | 350 | +45 / cấp | 980 |
| **Sát thương vật lý (AD)** | 46 | +2.7 / cấp | 83.8 |
| **Sức mạnh phép thuật (AP)** | 0 | +0 / cấp (tăng theo trang bị) | 0 (gốc) |
| **Giáp vật lý (Armor)** | 30 | +3.5 / cấp | 79.0 |
| **Kháng phép (Magic Resist)** | 34 | +1.8 / cấp | 59.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.62 đòn/s | +0.015 / cấp | 0.830 đòn/s |
| **Hồi máu tự nhiên (HP Regen)** | 1.5 HP/s | +0.14 / cấp | 3.46 HP/s |
| **Hồi năng lượng (Mana Regen)** | 2.0 Mana/s | +0.16 / cấp | 4.24 Mana/s |
| **Hệ số cân bằng (Balance Tuning)** | HP: 1.02 | DMG: 0.90 | — |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Chuột trái / LMB)
- **Kiểu ngắm:** Đạn đạo tầm xa đơn mục tiêu (Ranged Projectile).
- **Tầm bắn (Range):** `6.0m`.
- **Tốc độ đạn (Speed):** `24 m/s`.
- **Sát thương:** $100\%$ Tổng AD + $20\%$ AP (Sát thương phép thuật).
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$.
- **Hiệu ứng:** Bắn ra một quả cầu khói mộng cảnh màu tím lavender phát sáng nhẹ.

### 2.2. Nội Tại — Mộng Thể Mặt Nạ Hút Khống Chế (`passive: cc_absorb_transmute`)
- **Cơ chế Hút Khống Chế (CC Absorb):**
  - Khi kỹ năng W được kích hoạt, Oneira quét toàn bộ đồng minh trong bán kính **6.0m** quanh người.
  - Hút chính xác **1 hiệu ứng khống chế** có thời gian tồn tại còn lại lâu nhất khỏi đồng minh yếu máu nhất (`maxAbsorb: 1`):
    - Xóa sạch hiệu ứng bất lợi đó khỏi đồng minh: `slows = []`, `rootUntil = 0`, `stunUntil = 0`, `silenceUntil = 0`.
    - Ghi nhận proc sự kiện `proc("passive:cc_transmuted")`.
  - **Giới hạn kỹ thuật bất biến (Doc 100):**
    - Oneira **KHÔNG THỂ** kích hoạt W nếu chính bản thân Oneira đang bị Choáng (Stun), Câm Lặng (Silence) hoặc Áp Chế (Suppression).
    - **Chỉ áp dụng cho:** Choáng, Trói chân, Làm chậm, Câm lặng.
    - **Tuyệt đối KHÔNG HÚT:** Áp Chế (Suppression) và Hất Tung / Đẩy Lùi (Airborne / Knockback).
- **Cơ chế Chuyển Hóa Phúc Lành (Transmutation):**
  - Sau thời gian trễ đúng **2.0 giây** (`transmuteDelay: 2.0`), năng lượng tiêu cực được thanh tẩy hoàn toàn.
  - Mặt nạ phát nổ sóng hồi phục bừng sáng bán kính **6.0m**, hồi phục thêm **80 HP** (`transmuteHeal: 80`) và ban $+25\%$ tốc độ di chuyển trong $1.5\text{s}$ cho toàn bộ đồng minh.

### 2.3. Kỹ Năng Q — Mộng Ảnh Trói Buộc (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đạn (Width):** `1.5m`.
- **Tốc độ bay (Speed):** `26 m/s`.
- **Tầm xa (Range):** `8.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[45, 50, 55, 60, 65]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $50 + 45\%$ AP
  - Cấp 2: $80 + 45\%$ AP
  - Cấp 3: $110 + 45\%$ AP
  - Cấp 4: $140 + 45\%$ AP
  - Cấp 5: $170 + 45\%$ AP
- **Hiệu ứng khống chế:** Trói Chân (Root) mục tiêu đầu tiên trúng phải trong **1.0 giây**.

### 2.4. Kỹ Năng W — Mặt Nạ Hút Khống Chế (`skill_w` — Ánh xạ từ legacy `rmb`)
- **Kiểu ngắm:** Tự niệm diện rộng tức thời (Self PBAoE Cleanse Aura).
- **Bán kính tác động (Radius):** `6.0m` quanh Oneira.
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì).
- **Thời gian hồi chiêu (Cooldown):** `[14.0, 13.0, 12.0, 11.0, 10.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[65, 70, 75, 80, 85]` mana.
- **Giá trị khiên chắn (Shield cho bản thân & đồng minh):**
  - Cấp 1: $70$ (kéo dài 3.0s)
  - Cấp 2: $105$
  - Cấp 3: $140$
  - Cấp 4: $175$
  - Cấp 5: $210$
- **Giá trị hồi máu tức thời (Heal):**
  - Cấp 1: $45 + 25\%$ AP
  - Cấp 2: $70 + 25\%$ AP
  - Cấp 3: $95 + 25\%$ AP
  - Cấp 4: $120 + 25\%$ AP
  - Cấp 5: $145 + 25\%$ AP
- **Tương tác hút khống chế:** Đồng thời kích hoạt cơ chế nội tại `passive:cc_absorb_transmute`.

### 2.5. Kỹ Năng E — Mộng Cảnh Tương Lân (`skill_e`)
- **Kiểu ngắm:** Vùng chọn hình tròn từ xa (Ground-Targeted Circle).
- **Bán kính sương khói (Radius):** `4.2m`.
- **Tầm thi triển (Range):** `7.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[60, 65, 70, 75, 80]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $45 + 35\%$ AP
  - Cấp 2: $70 + 35\%$ AP
  - Cấp 3: $95 + 35\%$ AP
  - Cấp 4: $120 + 35\%$ AP
  - Cấp 5: $145 + 35\%$ AP
- **Hiệu ứng khống chế & Hỗ trợ:** Làm chậm $35\%$ kẻ địch bước qua trong **1.5s**, đồng thời tăng $20\%$ tốc chạy cho đồng minh bước vào vùng sương khói.

### 2.6. Kỹ Năng R — Đại Mộng Giác Tỉnh (`skill_r` — Ultimate Tối Thượng)
- **Kiểu ngắm:** Đại hào quang diện rộng quanh thân (Grand PBAoE Aura).
- **Bán kính ảnh hưởng (Radius):** `6.5m`.
- **Tầm thi triển (Range):** `0m` (Tâm phát tại Oneira).
- **Độ trễ phát tác (Delay):** `0.2s`.
- **Thời gian niệm (Windup):** `0.25s`.
- **Thời gian hồi chiêu (Cooldown):** `[85, 75, 65]s`.
- **Tiêu hao năng lượng (Mana Cost):** `100` mana ở mọi cấp.
- **Giá trị hồi phục đại trào (Heal cho toàn đội):**
  - Cấp 1: $110 + 35\%$ AP
  - Cấp 2: $180 + 35\%$ AP
  - Cấp 3: $250 + 35\%$ AP
- **Giá trị khiên đại trào (Shield trong 3.5s):**
  - Cấp 1: $90$
  - Cấp 2: $140$
  - Cấp 3: $190$
- **Hiệu ứng khống chế tối thượng:** Toàn bộ mộng thể bùng nổ làm lóa mắt, **Làm Choáng (Stun) 0.8 giây** toàn bộ kẻ địch trong bán kính $6.5\text{m}$.

### 2.7. Tốc Biến Phổ Quát — `universal_dash` (Phím D — Doc 91)
- **Tầm lướt:** `4.5m` theo hướng chỉ định.
- **Thời gian thực hiện:** `0.22s`.
- **Tiêu hao:** Nội năng / Stamina chung của hệ thống, hồi chiêu 14s.

---

## 3. Quy Tắc Xử Lý & Edge Cases Kỹ Thuật

1. **Thứ tự ưu tiên hút khống chế:**
   - Ưu tiên 1: Tướng đồng minh có thời gian khống chế còn lại lâu nhất.
   - Ưu tiên 2: Ưu tiên Choáng > Trói chân > Câm lặng > Làm chậm.
2. **Khống chế ngắt quá trình chuyển hóa:**
   - Trong 2.0s chuyển hóa, nếu Oneira bị dính Choáng hoặc Câm lặng, quá trình chuyển hóa sẽ bị hủy bỏ (không phát nổ +80 HP hồi phục).
3. **Phân tách minh bạch Khiên & Hồi máu:**
   - Khiên của W/R ghi nhận vào `m.shieldGiven`; hồi máu ghi nhận vào `m.allyHealed` / `m.healed` độc lập.
