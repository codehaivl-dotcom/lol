# 03 · Gameplay Contract — #49 Kymos (Thạch Âm Điểm Rung Hạ Âm)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#49 / kymos`  
**Vai trò chuẩn hóa:** Hỗ Trợ Triệt Tiêu Sát Thương Bộc Phát (Support / Anti-Burst Shockwave Saver) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

Dữ liệu kế thừa chính xác từ Candidate YAML (`tools/sim/candidates/kymos.yml`):

| Chỉ số (Stat) | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 (Max Level) |
|---|---|---|---|
| **Máu (HP)** | 660 | +92 / cấp | 1,948 |
| **Năng lượng (Mana)** | 340 | +40 / cấp | 900 |
| **Sát thương vật lý (AD)** | 48 | +2.7 / cấp | 85.8 |
| **Sức mạnh phép thuật (AP)** | 0 | +0 / cấp (tăng theo trang bị) | 0 (gốc) |
| **Giáp vật lý (Armor)** | 34 | +3.8 / cấp | 87.2 |
| **Kháng phép (Magic Resist)** | 36 | +2.0 / cấp | 64.0 |
| **Tốc độ di chuyển (Move Speed)** | 6.15 m/s | 0 | 6.15 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.62 đòn/s | +0.014 / cấp | 0.816 đòn/s |
| **Hồi máu tự nhiên (HP Regen)** | 1.6 HP/s | +0.15 / cấp | 3.70 HP/s |
| **Hồi năng lượng (Mana Regen)** | 1.8 Mana/s | +0.15 / cấp | 3.90 Mana/s |
| **Hệ số cân bằng (Balance Tuning)** | HP: 1.04 | DMG: 0.90 | — |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Chuột trái / LMB)
- **Kiểu ngắm:** Đạn đạo tầm xa đơn mục tiêu (Ranged Projectile).
- **Tầm bắn (Range):** `5.8m`.
- **Tốc độ đạn (Speed):** `24 m/s`.
- **Sát thương:** $100\%$ Tổng AD + $20\%$ AP (Sát thương phép thuật).
- **Độ trễ ra đòn (Attack Windup):** $0.16\text{s}$.
- **Hiệu ứng:** Gõ vào thanh khánh đá phóng ra một luồng sóng âm rung chấn màu xanh rêu.

### 2.2. Nội Tại — Thạch Âm Điểm Rung Hạ Âm (`passive: acoustic_node`)
- **Cơ chế Điểm Rung Hạ Âm:**
  - Khi Kymos thi triển kỹ năng W, một thanh khánh đá cổ được cắm xuống sàn đấu, tạo ra một **Điểm Rung Hạ Âm (Acoustic Node Anchor)** cố định tại vị trí đó.
  - Vùng hạ âm tồn tại trong **3.5 giây** (`nodeDuration: 3.5`), bán kính tác động **4.5m** (`nodeRadius: 4.5`).
- **Triệt tiêu sát thương bộc phát (Anti-Burst Mitigation):**
  - Mọi tướng đồng minh (bao gồm Kymos) đứng trong bán kính 4.5m của Điểm Rung nhận hiệu ứng: **Cắt giảm 40% toàn bộ sát thương bộc phát nhận vào** (`burstMitigation: 0.40`).
  - Ghi nhận proc sự kiện `passive:acoustic_mitigation` mỗi khi có sát thương bị giảm trừ thành công.

### 2.3. Kỹ Năng Q — Thạch Ba Kích (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đường sóng (Width):** `1.5m`.
- **Tốc độ bay (Speed):** `26 m/s`.
- **Tầm xa (Range):** `8.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[45, 50, 55, 60, 65]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $50 + 45\%$ AP
  - Cấp 2: $80 + 45\%$ AP
  - Cấp 3: $110 + 45\%$ AP
  - Cấp 4: $140 + 45\%$ AP
  - Cấp 5: $170 + 45\%$ AP
- **Hiệu ứng kèm theo:** Làm chậm kẻ địch trúng đòn $30\%$ trong **1.2s**.

### 2.4. Kỹ Năng W — Điểm Rung Hạ Âm (`skill_w` — Ánh xạ từ legacy `rmb`)
- **Kiểu ngắm:** Tự niệm diện rộng tức thời kết hợp cắm mốc (Self PBAoE / Node Placement).
- **Bán kính bảo hộ (Radius):** `5.5m` quanh Kymos.
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì).
- **Thời gian hồi chiêu (Cooldown):** `[14.0, 13.0, 12.0, 11.0, 10.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[60, 65, 70, 75, 80]` mana.
- **Giá trị khiên chắn (Shield cho bản thân & đồng minh):**
  - Cấp 1: $75$ (kéo dài 3.5s)
  - Cấp 2: $110$
  - Cấp 3: $145$
  - Cấp 4: $180$
  - Cấp 5: $215$
- **Giá trị hồi máu tức thời (Heal):**
  - Cấp 1: $40 + 25\%$ AP
  - Cấp 2: $65 + 25\%$ AP
  - Cấp 3: $90 + 25\%$ AP
  - Cấp 4: $115 + 25\%$ AP
  - Cấp 5: $140 + 25\%$ AP
- **Tương tác cắm mốc:** Đồng thời cắm Điểm Rung Hạ Âm xuống sàn đấu bán kính $4.5\text{m}$ giảm $40\%$ sát thương sốc trong 3.5s (`proc("passive:acoustic_node")`).

### 2.5. Kỹ Năng E — Cộng Hưởng Thạch Cầm (`skill_e`)
- **Kiểu ngắm:** Tỏa tròn quanh thân (Self PBAoE).
- **Bán kính quét (Radius):** `4.0m`.
- **Tầm thi triển (Range):** `0m` (Tâm phát tại Kymos).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[55, 60, 65, 70, 75]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $45 + 35\%$ AP
  - Cấp 2: $70 + 35\%$ AP
  - Cấp 3: $95 + 35\%$ AP
  - Cấp 4: $120 + 35\%$ AP
  - Cấp 5: $145 + 35\%$ AP
- **Hiệu ứng khống chế:** Đẩy lùi nhẹ kẻ địch cận chiến ra xa $1.5\text{m}$ và làm chậm $25\%$ trong **1.2s**.

### 2.6. Kỹ Năng R — Vạn Âm Tĩnh Lặng (`skill_r` — Ultimate Tối Thượng)
- **Kiểu ngắm:** Đại hào quang diện rộng quanh thân (Grand PBAoE Aura).
- **Bán kính ảnh hưởng (Radius):** `6.5m`.
- **Tầm thi triển (Range):** `0m` (Tâm phát tại Kymos).
- **Độ trễ phát tác (Delay):** `0.2s`.
- **Thời gian niệm (Windup):** `0.25s`.
- **Thời gian hồi chiêu (Cooldown):** `[85, 75, 65]s`.
- **Tiêu hao năng lượng (Mana Cost):** `100` mana ở mọi cấp.
- **Giá trị hồi phục đại trào (Heal cho toàn đội):**
  - Cấp 1: $110 + 35\%$ AP
  - Cấp 2: $170 + 35\%$ AP
  - Cấp 3: $230 + 35\%$ AP
- **Giá trị khiên đại trào (Shield trong 3.5s):**
  - Cấp 1: $90$
  - Cấp 2: $140$
  - Cấp 3: $190$
- **Hiệu ứng lên kẻ địch:** Làm chậm toàn bộ kẻ địch $35\%$ trong **2.0s**. Toàn bộ âm thanh chiến trường bị tắt lịm (audio ducking 80%) trong 2.0s mô phỏng sự tĩnh lặng tuyệt đối của sóng hạ âm.

### 2.7. Tốc Biến Phổ Quát — `universal_dash` (Phím D — Doc 91)
- **Tầm lướt:** `4.5m` theo hướng chỉ định.
- **Thời gian thực hiện:** `0.22s`.
- **Tiêu hao:** Nội năng / Stamina chung của hệ thống, hồi chiêu 14s.

---

## 3. Quy Tắc Xử Lý & Edge Cases Kỹ Thuật

1. **Vị trí cố định của Điểm Rung:**
   - Điểm Rung Hạ Âm được cắm cố định tại tọa độ sàn đấu khi bấm W. Nếu Kymos di chuyển ra ngoài vùng $4.5\text{m}$, Kymos sẽ mất buff giảm $40\%$ sát thương, nhưng đồng minh đứng lại trong vùng vẫn nhận đủ buff.
2. **Không cộng dồn giảm sát thương:**
   - Nếu có nhiều hiệu ứng giảm sát thương từ trang bị (như Giáp Kháng Cự), công thức tính nhân chập: $DMG = Raw \times (1 - 0.40) \times (1 - ItemReduc)$.
3. **Phân tách minh bạch Khiên & Hồi máu:**
   - Khiên của W/R ghi nhận vào `m.shieldGiven`; hồi máu ghi nhận vào `m.allyHealed` / `m.healed` độc lập.
