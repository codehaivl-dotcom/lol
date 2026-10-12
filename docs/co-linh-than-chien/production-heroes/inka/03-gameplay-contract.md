# 03 · Gameplay Contract — #19 Inka (Mực Thư Pháp Tuyến Tính)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#19 / inka`  
**Vai trò chuẩn hóa:** Pháp Sư (Mage / Geometric Zone Controller) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

Dữ liệu kế thừa chính xác từ Candidate YAML (`tools/sim/candidates/inka.yml`):

| Chỉ số (Stat) | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 (Max Level) |
|---|---|---|---|
| **Máu (HP)** | 615 | +85 / cấp | 1,805 |
| **Năng lượng (Mana)** | 360 | +45 / cấp | 990 |
| **Sát thương vật lý (AD)** | 48 | +2.8 / cấp | 87.2 |
| **Sức mạnh phép thuật (AP)** | 0 | +0 / cấp (tăng theo trang bị) | 0 (gốc) |
| **Giáp vật lý (Armor)** | 28 | +3.3 / cấp | 74.2 |
| **Kháng phép (Magic Resist)** | 32 | +1.5 / cấp | 53.0 |
| **Tốc độ di chuyển (Move Speed)** | 6.15 m/s | 0 | 6.15 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.625 đòn/s | +0.015 / cấp | 0.835 đòn/s |
| **Hồi máu tự nhiên (HP Regen)** | 1.4 HP/s | +0.13 / cấp | 3.22 HP/s |
| **Hồi năng lượng (Mana Regen)** | 2.0 Mana/s | +0.16 / cấp | 4.24 Mana/s |
| **Hệ số cân bằng (Balance Tuning)** | HP: 0.96 | DMG: 1.02 | — |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Chuột trái / LMB)
- **Kiểu ngắm:** Đạn đạo tầm xa đơn mục tiêu (Ranged Projectile).
- **Tầm bắn (Range):** `6.0m`.
- **Tốc độ đạn (Speed):** `24 m/s`.
- **Sát thương:** $100\%$ Tổng AD + $20\%$ AP (Sát thương phép thuật).
- **Độ trễ ra đòn (Attack Windup):** $0.16\text{s}$.
- **Hiệu ứng:** Vung ngòi bút bắn ra một giọt mực phát quang màu đen ánh vàng kim.

### 2.2. Nội Tại — Vệt Mực Thư Pháp Tuyến Tính (`passive: ink_path`)
- **Cơ chế hoạt động:**
  - Các kỹ năng Q và R của Inka vẽ các đường mực tồn tại trên sàn đấu trong **4.0 giây** (`inkDuration: 4.0`).
  - Tối đa **2 vệt mực đồng thời** trên bản đồ. Nếu vẽ vệt thứ 3, vệt cũ nhất sẽ phân rã sớm.
- **Tương tác môi trường:**
  - **Đồng minh (bao gồm Inka):** Di chuyển trên vệt mực nhận thêm **+20% Tốc độ di chuyển** (`inkAllySpeed: 0.20`).
  - **Kẻ địch:** Di chuyển trên vệt mực bị **làm chậm 25%** (`inkEnemySlow: 0.25`).
- **Giao điểm kích nổ:** Điểm giao nhau giữa hai vệt mực tích tụ linh khí đậm đặc hơn, chuẩn bị cho tương tác chiêu E.

### 2.3. Kỹ Năng Q — Thư Pháp Tuyến Kích (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đường đạn (Width):** `1.5m`.
- **Tốc độ bay đạn (Speed):** `28 m/s`.
- **Tầm xa (Range):** `8.5m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[45, 50, 55, 60, 65]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $65 + 65\%$ AP
  - Cấp 2: $100 + 65\%$ AP
  - Cấp 3: $135 + 65\%$ AP
  - Cấp 4: $170 + 65\%$ AP
  - Cấp 5: $205 + 65\%$ AP
- **Hiệu ứng kèm theo:** Làm chậm kẻ địch trúng đòn $25\%$ trong **1.2s**. Để lại một vệt mực rộng $1.5\text{m}$, dài $8.5\text{m}$ tồn tại trên mặt đất trong 4.0s (kích hoạt nội tại `ink_path`).

### 2.4. Kỹ Năng W — Mặc Thủy Hộ Thể (`skill_w` — Ánh xạ từ legacy `rmb`)
- **Kiểu ngắm:** Tự niệm tức thời diện rộng quanh thân (Self PBAoE).
- **Thời gian gồng (Windup):** `0s` (Không làm ngắt bước di chuyển).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[55, 60, 65, 70, 75]` mana.
- **Giá trị khiên chắn (Shield):**
  - Cấp 1: $65 + 30\%$ AP
  - Cấp 2: $100 + 30\%$ AP
  - Cấp 3: $135 + 30\%$ AP
  - Cấp 4: $170 + 30\%$ AP
  - Cấp 5: $205 + 30\%$ AP
- **Thời hạn khiên:** Tồn tại trong **2.5 giây**.
- **Hiệu ứng đặc biệt:** Vẩy một vòng mực bán kính $3.0\text{m}$ quanh người làm giảm tầm nhìn nhẹ của kẻ địch đứng sát cạnh trong 1.0s.

### 2.5. Kỹ Năng E — Giao Điểm Kích Nổ (`skill_e`)
- **Kiểu ngắm:** Chọn vùng hình tròn từ xa (Ground-Targeted AoE).
- **Bán kính vụ nổ (Radius):** `4.0m`.
- **Tầm thi triển (Range):** `7.5m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[60, 65, 70, 75, 80]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $50 + 50\%$ AP
  - Cấp 2: $80 + 50\%$ AP
  - Cấp 3: $110 + 50\%$ AP
  - Cấp 4: $140 + 50\%$ AP
  - Cấp 5: $170 + 50\%$ AP
- **Hiệu ứng khống chế then chốt:** Kích nổ toàn bộ các đoạn vệt mực nằm trong vùng bán kính $4.0\text{m}$. Bất kỳ kẻ địch nào đang đứng trên vệt mực bị **Trói Chân (Root) trong 1.0 giây**. Nếu kẻ địch đứng ngay tại điểm giao nhau của 2 vệt mực, thời gian trói tăng lên $1.25\text{s}$.

### 2.6. Kỹ Năng R — Thiên Địa Mặc Họa (`skill_r` — Ultimate Tối Thượng)
- **Kiểu ngắm:** Đại hào quang vùng chọn từ xa (Grand Ground-Targeted Area).
- **Bán kính đồ trận (Radius):** `6.5m`.
- **Tầm thi triển (Range):** `8.0m`.
- **Độ trễ kích nổ (Delay):** `0.3s`.
- **Thời gian niệm (Windup):** `0.3s`.
- **Thời gian hồi chiêu (Cooldown):** `[80, 70, 60]s`.
- **Tiêu hao năng lượng (Mana Cost):** `100` mana ở mọi cấp.
- **Sát thương phép thuật cực đại:**
  - Cấp 1: $180 + 85\%$ AP
  - Cấp 2: $280 + 85\%$ AP
  - Cấp 3: $380 + 85\%$ AP
- **Hiệu ứng giao tranh tổng:** Làm chậm toàn bộ kẻ địch trong vùng $40\%$ trong **2.0 giây**. Toàn bộ vùng $6.5\text{m}$ biến thành một vệt mực đại đồ trận tồn tại trong 4.0s (áp dụng đầy đủ cơ chế của `ink_path`: +20% MS đồng minh, -25% MS địch).

### 2.7. Tốc Biến Phổ Quát — `universal_dash` (Phím D — Doc 91)
- **Tầm lướt:** `4.5m` theo hướng chỉ định.
- **Thời gian thực hiện:** `0.22s`.
- **Tiêu hao:** Nội năng / Stamina chung của hệ thống, hồi chiêu 14s.

---

## 3. Quy Tắc Xử Lý & Edge Cases Kỹ Thuật

1. **Thứ tự ưu tiên mục tiêu:**
   - Chiêu Q ưu tiên va chạm với tướng địch đầu tiên trên đường đạn, nhưng vệt mực vẫn kéo dài trọn vẹn $8.5\text{m}$ trên sàn bất kể có trúng vật cản hay không.
2. **Cắt ngang kỹ năng (Interruptibility):**
   - Đòn Q có windup $0.15\text{s}$ và R có windup $0.3\text{s}$. Nếu bị dính khống chế cứng (Choáng/Câm lặng) trong thời gian windup này, chiêu thức sẽ bị ngắt và hoàn trả $50\%$ thời gian hồi chiêu. Chiêu W kích hoạt tức thời ($0\text{s}$) nên không thể bị ngắt.
3. **Chồng lấp vệt mực:**
   - Nếu hai vệt mực nằm đè lên nhau, hiệu ứng gia tốc (+20% MS) và làm chậm (-25% MS) không cộng dồn, chỉ tính giá trị cao nhất một lần.
