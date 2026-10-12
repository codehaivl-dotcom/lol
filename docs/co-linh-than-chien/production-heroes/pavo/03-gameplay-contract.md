# 03 · Gameplay Contract — #35 Pavo (Khổng Tước Quạt Mắt Dọa Sợ)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#35 / pavo`  
**Vai trò chuẩn hóa:** Pháp Sư Chống Lao Vào (Mage / Anti-Dive Gaze Controller) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

Dữ liệu kế thừa chính xác từ Candidate YAML (`tools/sim/candidates/pavo.yml`):

| Chỉ số (Stat) | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 (Max Level) |
|---|---|---|---|
| **Máu (HP)** | 620 | +86 / cấp | 1,824 |
| **Năng lượng (Mana)** | 350 | +42 / cấp | 938 |
| **Sát thương vật lý (AD)** | 50 | +3.0 / cấp | 92.0 |
| **Sức mạnh phép thuật (AP)** | 0 | +0 / cấp (tăng theo trang bị) | 0 (gốc) |
| **Giáp vật lý (Armor)** | 28 | +3.3 / cấp | 74.2 |
| **Kháng phép (Magic Resist)** | 32 | +1.6 / cấp | 54.4 |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.64 đòn/s | +0.016 / cấp | 0.864 đòn/s |
| **Hồi máu tự nhiên (HP Regen)** | 1.4 HP/s | +0.13 / cấp | 3.22 HP/s |
| **Hồi năng lượng (Mana Regen)** | 1.8 Mana/s | +0.15 / cấp | 3.90 Mana/s |
| **Hệ số cân bằng (Balance Tuning)** | HP: 0.98 | DMG: 1.02 | — |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Chuột trái / LMB)
- **Kiểu ngắm:** Đạn đạo tầm xa đơn mục tiêu (Ranged Projectile).
- **Tầm bắn (Range):** `6.2m`.
- **Tốc độ đạn (Speed):** `26 m/s`.
- **Sát thương:** $100\%$ Tổng AD + $20\%$ AP (Sát thương phép thuật).
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$.
- **Hiệu ứng:** Bắn ra một phiến lông vũ quang học phát sáng màu xanh ngọc bích óng ánh.

### 2.2. Nội Tại — Khổng Tước Quạt Mắt Dọa Sợ (`passive: peacock_gaze`)
- **Cơ chế Khống Chế Hướng Nhìn:**
  - Khi kỹ năng W được kích hoạt, quạt đuôi của Pavo bung xòe phát ra trường quang học thôi miên trong bán kính **5.5m** (`gazeRadius: 5.5`).
  - **Điều kiện xét duyệt hướng nhìn:**
    - Tính tích vô hướng giữa véc-tơ hướng mặt của mục tiêu $\vec{F}_{\text{target}}$ và véc-tơ chỉ từ mục tiêu tới Pavo $\vec{V}_{\text{to\_pavo}}$:
    - Nếu $\vec{F}_{\text{target}} \cdot \vec{V}_{\text{to\_pavo}} > 0.707$ (Mục tiêu đang nhìn thẳng hoặc chếch góc dưới $45^\circ$ về phía Pavo):
      - Mục tiêu bị dính trạng thái **Hoảng Sợ (Fear / Flee) trong 1.2 giây** (`gazeFear: 1.2`, kích hoạt `proc("passive:peacock_fear")`). Mục tiêu mất kiểm soát di chuyển và tự động chạy ngược hướng Pavo với $100\%$ tốc độ chạy.
    - Nếu $\vec{F}_{\text{target}} \cdot \vec{V}_{\text{to\_pavo}} \le 0.707$ (Mục tiêu đang quay mặt đi hoặc quay lưng lại):
      - **Miễn nhiễm hoàn toàn** trạng thái Hoảng Sợ, chỉ chịu làm chậm nhẹ $35\%$ trong 1.2s.

### 2.3. Kỹ Năng Q — Kim Vũ Tiễn (`skill_q`)
- **Kiểu ngắm:** Bắn hình quạt đa tia (Fan Projectiles).
- **Số lượng tia (Count):** `3 tia lông vũ`.
- **Góc xòe (Spread):** `35 độ`.
- **Chiều rộng mỗi tia (Width):** `1.2m`.
- **Tốc độ bay (Speed):** `30 m/s`.
- **Tầm xa (Range):** `8.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[45, 50, 55, 60, 65]` mana.
- **Sát thương phép thuật mỗi tia:**
  - Cấp 1: $65 + 65\%$ AP
  - Cấp 2: $100 + 65\%$ AP
  - Cấp 3: $135 + 65\%$ AP
  - Cấp 4: $170 + 65\%$ AP
  - Cấp 5: $205 + 65\%$ AP
- **Hiệu ứng kèm theo:** Làm chậm $25\%$ trong **1.0s**. Nếu mục tiêu ở cự ly gần trúng nhiều tia, các tia sau gây $40\%$ sát thương.

### 2.4. Kỹ Năng W — Khai Mạc Khổng Tước (`skill_w` — Ánh xạ từ legacy `rmb`)
- **Kiểu ngắm:** Tự niệm diện rộng tức thời (Self PBAoE Aura).
- **Bán kính tác động (Radius):** `5.5m` quanh Pavo.
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[55, 60, 65, 70, 75]` mana.
- **Giá trị khiên chắn (Shield):**
  - Cấp 1: $65 + 30\%$ AP (tồn tại 2.5s)
  - Cấp 2: $100 + 30\%$ AP
  - Cấp 3: $135 + 30\%$ AP
  - Cấp 4: $170 + 30\%$ AP
  - Cấp 5: $205 + 30\%$ AP
- **Hiệu ứng đặc biệt:** Làm chậm $35\%$ kẻ địch xung quanh trong **1.2s**; đồng thời kích hoạt hiệu ứng **Hoảng Sợ 1.2s** lên mọi kẻ địch đang nhìn vào Pavo theo quy tắc nội tại `peacock_gaze`.

### 2.5. Kỹ Năng E — Huyễn Ảnh Quang Tráo (`skill_e`)
- **Kiểu ngắm:** Vùng chọn hình tròn từ xa (Ground-Targeted Circle).
- **Bán kính quả cầu (Radius):** `3.8m`.
- **Tầm thi triển (Range):** `7.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[60, 65, 70, 75, 80]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $50 + 50\%$ AP
  - Cấp 2: $80 + 50\%$ AP
  - Cấp 3: $110 + 50\%$ AP
  - Cấp 4: $140 + 50\%$ AP
  - Cấp 5: $170 + 50\%$ AP
- **Hiệu ứng khống chế:** Làm chậm toàn bộ kẻ địch trong vùng $30\%$ trong **1.2s**.

### 2.6. Kỹ Năng R — Vạn Nhãn Thôi Miên (`skill_r` — Ultimate Tối Thượng)
- **Kiểu ngắm:** Đại hào quang diện rộng quanh thân (Grand PBAoE Aura).
- **Bán kính ảnh hưởng (Radius):** `6.0m`.
- **Tầm thi triển (Range):** `0m` (Tâm phát tại Pavo).
- **Độ trễ phát tác (Delay):** `0.2s`.
- **Thời gian niệm (Windup):** `0.25s`.
- **Thời gian hồi chiêu (Cooldown):** `[80, 70, 60]s`.
- **Tiêu hao năng lượng (Mana Cost):** `100` mana ở mọi cấp.
- **Sát thương phép thuật cực đại:**
  - Cấp 1: $180 + 85\%$ AP
  - Cấp 2: $280 + 85\%$ AP
  - Cấp 3: $380 + 85\%$ AP
- **Hiệu ứng khống chế tối thượng:** Toàn bộ 24 thấu kính mắt công chiếu chùm hào quang cực đại, **Làm Choáng (Stun) 0.8 giây** toàn bộ kẻ địch trong bán kính $6.0\text{m}$ (bất kể hướng nhìn).

### 2.7. Tốc Biến Phổ Quát — `universal_dash` (Phím D — Doc 91)
- **Tầm lướt:** `4.5m` theo hướng chỉ định.
- **Thời gian thực hiện:** `0.22s`.
- **Tiêu hao:** Nội năng / Stamina chung của hệ thống, hồi chiêu 14s.

---

## 3. Quy Tắc Xử Lý & Edge Cases Kỹ Thuật

1. **Tính toán véc-tơ hướng nhìn phía Server:**
   - Hướng nhìn được lấy trực tiếp từ `transform.forward` của mô hình đối phương tại thời điểm frame kích hoạt W. Không phụ thuộc vào vị trí trỏ chuột của người chơi đối phương nếu nhân vật của họ chưa kịp xoay người.
2. **Khống chế Fear ngắt chiêu lướt:**
   - Trạng thái Hoảng Sợ có độ ưu tiên cao, ngắt lập tức mọi chiêu thức lướt đang thi triển của đối thủ (trừ các trạng thái Không Thể Cản Phá / Unstoppable như R của Forge).
3. **Pha bẫy quay lưng:**
   - Nếu đối phương quay lưng lại nhưng bị chiêu E làm chậm, Pavo có thể dùng Dash D lướt vượt lên trước mặt họ để ép họ phải nhìn vào mình khi bấm W.
