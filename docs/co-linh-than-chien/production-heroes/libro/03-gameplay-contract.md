# 03 · Gameplay Contract — #28 Libro (Sổ Nợ Nghiệp Báo)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#28 / libro`  
**Vai trò chuẩn hóa:** Hỗ Trợ Chống Dồn Sát Thương (Support / Anti-Burst Enabler) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

Dữ liệu kế thừa chính xác từ Candidate YAML (`tools/sim/candidates/libro.yml`):

| Chỉ số (Stat) | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 (Max Level) |
|---|---|---|---|
| **Máu (HP)** | 630 | +86 / cấp | 1,834 |
| **Năng lượng (Mana)** | 350 | +45 / cấp | 980 |
| **Sát thương vật lý (AD)** | 46 | +2.6 / cấp | 82.4 |
| **Sức mạnh phép thuật (AP)** | 0 | +0 / cấp (tăng theo trang bị) | 0 (gốc) |
| **Giáp vật lý (Armor)** | 30 | +3.4 / cấp | 77.6 |
| **Kháng phép (Magic Resist)** | 34 | +1.8 / cấp | 59.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.15 m/s | 0 | 6.15 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.62 đòn/s | +0.014 / cấp | 0.816 đòn/s |
| **Hồi máu tự nhiên (HP Regen)** | 1.5 HP/s | +0.14 / cấp | 3.46 HP/s |
| **Hồi năng lượng (Mana Regen)** | 2.2 Mana/s | +0.18 / cấp | 4.72 Mana/s |
| **Hệ số cân bằng (Balance Tuning)** | HP: 1.02 | DMG: 0.90 | — |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Chuột trái / LMB)
- **Kiểu ngắm:** Đạn đạo tầm xa đơn mục tiêu (Ranged Projectile).
- **Tầm bắn (Range):** `6.0m`.
- **Tốc độ đạn (Speed):** `24 m/s`.
- **Sát thương:** $100\%$ Tổng AD + $20\%$ AP (Sát thương phép thuật).
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$.
- **Hiệu ứng:** Phóng ra một phiến đá thẻ tre phát quang màu tím lam lướt xé gió.

### 2.2. Nội Tại — Sổ Nợ Nghiệp Báo (`passive: debt_ledger`)
- **Cơ chế Hoãn Sát Thương:**
  - Khi kỹ năng W hoặc R được kích hoạt, các mục tiêu đồng minh được bao bọc bởi Sổ Nợ trong cửa sổ thời gian **2.5 giây** (`debtWindow: 2.5`).
  - Trong cửa sổ này, **70% toàn bộ sát thương nhận vào** (`debtPostponeRatio: 0.70`) sẽ không trừ ngay vào máu mà được hoãn lại đưa vào **Kho Nợ Treo (Debt Pool)** (`proc("passive:debt_postponed")`). Chỉ có $30\%$ sát thương là trừ thẳng vào máu hiện tại.
- **Cơ chế Trả Nợ & Đáo Hạn:**
  - Mọi lượng hồi máu (`heal`) và khiên chắn (`shield`) ban cho mục tiêu trong thời gian này sẽ được ưu tiên **khấu trừ trực tiếp vào Kho Nợ Treo**.
  - Khi hết thời gian 2.5s, khoản nợ chưa được trả hết sẽ **đáo hạn**: Chuyển thành sát thương duy trì theo thời gian (DoT) trừ dần vào máu trong **3.0 giây** (`debtPaybackDur: 3.0`) qua các nhịp `tickDots`.

### 2.3. Kỹ Năng Q — Trang Sử Trừng Phạt (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đạn (Width):** `1.4m`.
- **Tốc độ bay (Speed):** `28 m/s`.
- **Tầm xa (Range):** `8.5m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[45, 50, 55, 60, 65]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $55 + 50\%$ AP
  - Cấp 2: $85 + 50\%$ AP
  - Cấp 3: $115 + 50\%$ AP
  - Cấp 4: $145 + 50\%$ AP
  - Cấp 5: $175 + 50\%$ AP
- **Hiệu ứng kèm theo:** Làm chậm kẻ địch trúng đòn $25\%$ trong **1.2s**.

### 2.4. Kỹ Năng W — Sổ Nợ Ký Ức (`skill_w` — Ánh xạ từ legacy `rmb`)
- **Kiểu ngắm:** Tự niệm diện rộng tức thời (Self PBAoE Aura).
- **Bán kính bảo hộ (Radius):** `6.0m` quanh Libro.
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì).
- **Thời gian hồi chiêu (Cooldown):** `[14.0, 13.0, 12.0, 11.0, 10.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[65, 70, 75, 80, 85]` mana.
- **Giá trị khiên chắn (Shield cho bản thân & đồng minh):**
  - Cấp 1: $75$ (kéo dài 3.0s)
  - Cấp 2: $115$
  - Cấp 3: $155$
  - Cấp 4: $195$
  - Cấp 5: $235$
- **Giá trị hồi máu tức thời (Heal):**
  - Cấp 1: $40 + 25\%$ AP
  - Cấp 2: $65 + 25\%$ AP
  - Cấp 3: $90 + 25\%$ AP
  - Cấp 4: $115 + 25\%$ AP
  - Cấp 5: $140 + 25\%$ AP
- **Tương tác hoãn nợ:** Kích hoạt cửa sổ Sổ Nợ 2.5s (`debtWindow: 2.5`, `debtRatio: 0.70`), ghi nhận `proc("passive:debt_ledger")`.

### 2.5. Kỹ Năng E — Ân Hạn Nghiệp Báo (`skill_e`)
- **Kiểu ngắm:** Chọn 1 mục tiêu đồng minh từ xa (Targeted Ally Cast).
- **Tầm thi triển (Range):** `7.5m`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[55, 60, 65, 70, 75]` mana.
- **Lượng hồi máu chuyên biệt:**
  - Cấp 1: $50 + 35\%$ AP
  - Cấp 2: $80 + 35\%$ AP
  - Cấp 3: $110 + 35\%$ AP
  - Cấp 4: $140 + 35\%$ AP
  - Cấp 5: $170 + 35\%$ AP
- **Hiệu ứng đặc biệt:** Lượng hồi máu này ưu tiên xóa bỏ hoàn toàn một khoản Nợ Treo tương đương, đồng thời tăng $25\%$ tốc độ di chuyển cho đồng minh trong $1.5\text{s}$. Nếu dùng lên kẻ địch, gây sát thương phép tương đương và làm chậm $25\%$ trong 1.0s.

### 2.6. Kỹ Năng R — Chung Quyết Phán Thư (`skill_r` — Ultimate Tối Thượng)
- **Kiểu ngắm:** Đại kết giới diện rộng quanh thân (Grand PBAoE Aura).
- **Bán kính đồ trận (Radius):** `6.5m`.
- **Tầm thi triển (Range):** `0m` (Tâm phát tại Libro).
- **Độ trễ phát tác (Delay):** `0.2s`.
- **Thời gian niệm (Windup):** `0.25s`.
- **Thời gian hồi chiêu (Cooldown):** `[85, 75, 65]s`.
- **Tiêu hao năng lượng (Mana Cost):** `100` mana ở mọi cấp.
- **Giá trị khiên đại trào (Shield trong 3.5s):**
  - Cấp 1: $110$
  - Cấp 2: $170$
  - Cấp 3: $230$
- **Giá trị hồi phục đại trào (Heal):**
  - Cấp 1: $90 + 30\%$ AP
  - Cấp 2: $150 + 30\%$ AP
  - Cấp 3: $210 + 30\%$ AP
- **Hiệu ứng khống chế & Hoãn nợ:** Làm chậm toàn bộ kẻ địch $35\%$ trong **2.0s**. Toàn bộ đồng minh nhận hiệu ứng Sổ Nợ 2.5s (hoãn 70% sát thương).

### 2.7. Tốc Biến Phổ Quát — `universal_dash` (Phím D — Doc 91)
- **Tầm lướt:** `4.5m` theo hướng chỉ định.
- **Thời gian thực hiện:** `0.22s`.
- **Tiêu hao:** Nội năng / Stamina chung của hệ thống, hồi chiêu 14s.

---

## 3. Quy Tắc Xử Lý & Edge Cases Kỹ Thuật

1. **Vỡ nợ khi đáo hạn:**
   - Nếu khi hết 2.5s mà lượng máu còn lại của mục tiêu nhỏ hơn tổng lượng nợ chưa trả, sát thương DoT đáo hạn sẽ kết liễu mục tiêu. Mạng hạ gục được tính cho kẻ địch đã gây ra lượng sát thương ban đầu đó.
2. **Tương tác khiên với nợ:**
   - Khiên chắn ban cho mục tiêu trong khi đang dính nợ sẽ ưu tiên trừ vào Kho Nợ Treo trước khi trở thành lớp khiên bảo vệ thanh máu.
3. **Không cộng dồn cửa sổ hoãn nợ:**
   - Nếu bật W rồi bật R tiếp theo, thời gian hoãn nợ 2.5s sẽ được làm mới (refresh) chứ không cộng dồn thời gian.
