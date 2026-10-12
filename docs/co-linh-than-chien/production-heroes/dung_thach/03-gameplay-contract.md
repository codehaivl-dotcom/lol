# 03 · Gameplay Contract — #46 Dũng Thạch (Thần Rìu & Thiên Cầm)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#46 / dung_thach`  
**Vai trò chuẩn hóa:** Đấu Sĩ Hài Hòa (Harmonic Bruiser / Fighter) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 740 | +98 / cấp | 2,112 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 68 | +3.8 / cấp | 121.2 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 38 | +4.0 / cấp | 94.0 |
| **Kháng phép (MR)** | 32 | +1.8 / cấp | 57.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.35 m/s | 0 | 6.35 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.66 đòn/s | +0.018 / cấp | 0.912 đòn/s |
| **Hồi máu (HP Regen)** | 1.8 HP/s | +0.15 / cấp | 3.90 HP/s |
| **Tuning hệ số:** | `{ hp: 1.04, dmg: 0.98 }` | (Đấu sĩ cận chiến công thủ toàn diện) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Cận chiến vung Đại Rìu Cổ Linh.
- **Tầm đánh cơ bản:** `2.1m`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Windup):** $0.15\text{s}$. Tốc độ đánh tối đa: $2.0$ đòn/s.

### 2.2. Nội Tại — Trảm Kích Rìu Nứt Đất & Thiên Cầm Giải Hòa (`passive: fissure_cleave`)
- **Cơ chế 1 — Trảm Kích Rìu Nứt Đất (Fissure Cleave True Damage):**
  - Đòn đánh thường liên tiếp của Dũng Thạch tích lũy nhịp chém.
  - Mỗi đòn đánh thường thứ **3** (`cleaveHit: 3`) giáng thẳng rìu xuống đất xẻ rãnh địa chấn, gây thêm **+35% Sát thương chuẩn (True Damage)** dựa trên tổng AD (`trueDmgRatio: 0.35`) cho mục tiêu chính và lan $50\%$ sát thương chuẩn này cho kẻ địch trong rãnh nứt dài $2.5\text{m}$.
- **Cơ chế 2 — Khúc Ca Thiên Cầm (Harmonic Cleanse & Mitigation):**
  - Khi kích hoạt chiêu W, Dũng Thạch gảy khúc ca giải hòa:
    - Giải trừ toàn bộ hiệu ứng khống chế mềm (Làm chậm, Trói chân) cho bản thân và đồng minh sát cạnh.
    - Giảm **25% Sát thương gây ra** của mọi kẻ địch trong bán kính $4.0\text{m}$ trong **$1.5\text{ giây}$** (`harpDmgReduction: 0.25`, `harpDuration: 1.5`).
    - Dũng Thạch bị khóa tấn công trong **$1.0\text{ giây}$** (`harpChannel: 1.0`, `lockUntil = t + 1.0`).

### 2.3. Kỹ Năng Q — Khai Sơn Phách (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line Cleave).
- **Chiều rộng tác động (Width):** `1.6m`.
- **Tốc độ lan truyền (Speed):** `24 m/s`.
- **Tầm xa (Range):** `6.8m`.
- **Thời gian gồng (Windup):** `0.18s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $65 + 80\%$ Bonus AD
  - Cấp 2: $100 + 80\%$ Bonus AD
  - Cấp 3: $135 + 80\%$ Bonus AD
  - Cấp 4: $170 + 80\%$ Bonus AD
  - Cấp 5: $205 + 80\%$ Bonus AD
- **Hiệu ứng đi kèm:** Làm chậm $30\%$ tốc độ di chuyển trong **$1.2\text{ giây}$**.

### 2.4. Kỹ Năng W — Thiên Cầm Thánh Âm (`skill_w`, chuẩn hóa từ candidate YAML `rmb`)
- **Kiểu ngắm:** Tự niệm (Self Cast / Song of Peace).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[15.0, 14.0, 13.0, 12.0, 11.0]s`.
- **Tiêu hao:** `0`.
- **Lớp lá chắn hấp thụ (Shield):**
  - Cấp 1: $70$ điểm (tồn tại $2.5\text{s}$)
  - Cấp 2: $105$ điểm
  - Cấp 3: $140$ điểm
  - Cấp 4: $175$ điểm
  - Cấp 5: $210$ điểm
- **Quy tắc kiểm soát & giới hạn (Audit Rules):**
  - **Không thể bấm nếu đang dính Choáng (Stun), Áp Chế hoặc Hất Tung.**
  - Giải khống chế mềm (Slow/Root) tức thì khi kích hoạt.
  - Giảm $25\%$ sát thương gây ra của kẻ địch xung quanh trong $1.5\text{s}$.
  - Khóa vung rìu đánh thường trong $1.0\text{s}$.

### 2.5. Kỹ Năng E — Cuồng Phách Toái Giáp (`skill_e`)
- **Kiểu ngắm:** Diện rộng xoay tròn quanh thân (Point Blank AoE Whirlwind).
- **Bán kính (Radius):** `3.5m`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 60\%$ Tổng AD
  - Cấp 2: $80 + 60\%$ Tổng AD
  - Cấp 3: $110 + 60\%$ Tổng AD
  - Cấp 4: $140 + 60\%$ Tổng AD
  - Cấp 5: $170 + 60\%$ Tổng AD
- **Hiệu ứng đi kèm:** Làm chậm $25\%$ tốc độ di chuyển trong $1.0\text{s}$ và hồi phục máu tương đương $20\%$ tổng sát thương gây ra lên tướng địch ($10\%$ lên lính).

### 2.6. Kỹ Năng R — Thiên Địa Bạt Sơn (`skill_r`, Ultimate)
- **Kiểu ngắm:** Diện rộng nhảy vồ chỉ định điểm rơi (Targeted Leap Slam AoE).
- **Tầm nhảy (Range & Dash Distance):** `5.5m`.
- **Bán kính tâm chấn (Radius):** `4.8m`.
- **Độ trễ niệm (Windup & Delay):** `0.25s windup` $+ 0.3\text{s delay bay}`.
- **Thời gian hồi chiêu (Cooldown):** `[75.0, 65.0, 55.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $180 + 110\%$ Bonus AD
  - Cấp 2: $280 + 110\%$ Bonus AD
  - Cấp 3: $380 + 110\%$ Bonus AD
- **Hiệu ứng khống chế cứng:** Làm choáng (Stun) và hất tung toàn bộ kẻ địch trong phạm vi $4.8\text{m}$ trong **$0.8\text{ giây}$**.

### 2.7. Universal Dash — Phím D (Chuẩn Doc 91)
- Lướt né khoảng cách $4.5\text{m}$ theo hướng chỉ định. Thời gian hồi chiêu 14s. Không tiêu hao tài nguyên.

---

## 3. Quy Tắc Tác Động & Xử Lý Tình Huống Giới Hạn (Edge Cases)

1. **Bộ đếm đòn đánh thứ 3:** Bộ đếm đòn đánh (hit count) duy trì trong $3.5\text{ giây}$ kể từ đòn đánh gần nhất. Nếu quá $3.5\text{s}$ không tấn công, bộ đếm tự reset về 0.
2. **Khóa đòn đánh trong W và ngắt nhịp:** Nếu trong lúc đang gảy đàn ($1.0\text{s}$) Dũng Thạch bấm chiêu R hoặc D, hoạt ảnh gảy đàn sẽ bị hủy ngay lập tức, Dũng Thạch lấy lại quyền tấn công nhưng hiệu ứng giảm sát thương $25\%$ của tiếng đàn vẫn duy trì đủ $1.5\text{s}$ trên người kẻ địch.
3. **Tương tác Sát thương chuẩn với Lá chắn:** Sát thương chuẩn của đòn thứ 3 bỏ qua toàn bộ Giáp (Armor) của đối phương, nhưng vẫn bị hấp thụ bởi các loại Khiên (Shield).
