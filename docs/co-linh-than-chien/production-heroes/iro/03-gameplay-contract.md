# 03 · Gameplay Contract — #30 Iro (Mắt Thiên Cơ)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#30 / iro`  
**Vai trò chuẩn hóa:** Xạ Thủ (Marksman) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 590 | +80 / cấp | 1,710 |
| **Nội năng / Mana** | 340 | +35 / cấp | 830 |
| **Sát thương vật lý (AD)** | 65 | +4.2 / cấp | 123.8 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 26 | +3.0 / cấp | 68.0 |
| **Kháng phép (MR)** | 30 | +1.2 / cấp | 46.8 |
| **Tốc độ di chuyển (Move Speed)** | 6.0 m/s | 0 | 6.0 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.60 đòn/s | +0.018 / cấp | 0.852 đòn/s |
| **Hồi máu (HP Regen)** | 1.3 HP/s | +0.11 / cấp | 2.84 HP/s |
| **Hồi năng lượng (Mana Regen)** | 1.5 MP/s | +0.12 / cấp | 3.18 MP/s |
| **Tuning hệ số:** | `{ hp: 0.94, dmg: 1.05 }` | (Áp dụng cân bằng xạ thủ bắn tỉa tĩnh viễn chinh) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Đạn đạo laser xung kích từ thấu kính pha lê (Ruby Crystal Laser Projectile).
- **Tầm đánh cơ bản:** `7.5m` (khi di chuyển); mở rộng tới **`13.5m`** (khi đứng yên tích ngắm tối đa).
- **Tốc độ đạn bay:** `38 m/s`.
- **Sát thương cơ bản:** $100\%$ Tổng AD ($+30\%$ sát thương khi đạt mốc ngắm tối đa).
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$. Tốc độ đánh tối đa: $1.8$ đòn/s.
- **Diễn hoạt:** Thấu kính pha lê rực sáng đỏ, nã luồng xung kích laser thẳng tắp vào mục tiêu.

### 2.2. Nội Tại — Mắt Thiên Cơ Ngắm Tĩnh Tầm Xa (`passive: laser_sniper`)
- **Cơ chế 1 — Tích lũy tiêu cự đứng yên (Static Focus Accumulation):**
  - Khi Iro đứng yên hoàn toàn không di chuyển, mỗi giây trôi qua tăng thêm **$+1.5\text{m}$ cự ly tầm đánh cơ bản** (`focusPerSec: 1.5`).
  - Mức gia tăng cự ly tối đa đạt **$+6.0\text{m}$** sau $4.0\text{ giây}$ đứng yên (`maxFocusRange: 6.0`), nâng tổng tầm đánh lên tới $13.5\text{m}$.
  - Nếu Iro thực hiện bất kỳ hành động di chuyển nào (bước đi, bị đẩy lùi, lướt D), bộ đếm `focusTime` lập tức reset về $0$.
- **Cơ chế 2 — Khuếch đại sát thương ngắm tối đa (Focus Damage Bonus):**
  - Khi đạt trạng thái ngắm tối đa ($+6.0\text{m}$ tầm xa), đòn đánh thường của Iro được gia tăng thêm **$+30\%$ Tổng AD** sát thương bộc phát (`focusDmgBonus: 0.30`).
- **Cơ chế 3 — Tia laser cảnh báo minh bạch (Laser Warning Beam):**
  - Khi khóa mục tiêu ở tầm xa trên $7.5\text{m}$, một tia laser đỏ mỏng chiếu rọi lên mục tiêu cảnh báo trong suốt **$1.0\text{ giây}$** trước khi phát bắn kích hoạt (`laserWarnTime: 1.0`).
  - Simulator ghi nhận proc sự kiện: `passive:static_focus_snipe`.

### 2.3. Kỹ Năng Q — Tụ Quang Xuyên Phá (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng xuyên thấu (Piercing Skillshot Laser Line).
- **Chiều rộng tia laser (Width):** `1.4m`.
- **Tốc độ tia laser (Speed):** `40 m/s`.
- **Tầm bắn (Range):** `12.0m`.
- **Thời gian gồng nạp tụ năng (Windup):** `0.25s` (Tụ năng lượng trong $0.8\text{s}$ trước khi bắn).
- **Thuộc tính xuyên thấu:** **Xuyên qua toàn bộ đơn vị lính** (`passMinions: true`).
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `[45, 50, 55, 60, 65] MP`.
- **Sát thương vật lý:**
  - Cấp 1: $70 + 95\%$ Bonus AD
  - Cấp 2: $110 + 95\%$ Bonus AD
  - Cấp 3: $150 + 95\%$ Bonus AD
  - Cấp 4: $190 + 95\%$ Bonus AD
  - Cấp 5: $230 + 95\%$ Bonus AD
- **Hiệu ứng:** Gây sát thương lên mọi kẻ địch trúng đòn và **làm chậm $20\%$ trong $1.0\text{ giây}$** (`effects: [{ slow: 0.2, duration: 1.0 }]`).

### 2.4. Kỹ Năng W — Thấu Kính Phòng Vệ (`skill_w` — Migration từ YAML rmb)
- **Kiểu ngắm:** Tự niệm (Self Cast) & Đẩy lùi xung quanh.
- **Bán kính đẩy lùi (Repulsion Radius):** `2.5m`.
- **Cự ly đẩy lùi mục tiêu (Knockback Distance):** `3.0m` ra xa khỏi Iro.
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thời).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `50 MP` tại mọi cấp.
- **Thời gian hiệu lực khiên:** **$2.5\text{ giây}$** (`duration: 2.5`).
- **Lớp khiên quang học bảo hộ:**
  - Cấp 1: $65$ Base
  - Cấp 2: $95$ Base
  - Cấp 3: $125$ Base
  - Cấp 4: $155$ Base
  - Cấp 5: $185$ Base
- **Cơ chế:** Đẩy văng kẻ địch cận chiến đang áp sát và tạo khiên tự vệ.

### 2.5. Kỹ Năng E — Khóa Tiêu Cự (`skill_e`)
- **Kiểu ngắm:** Chọn mục tiêu đơn (Single Target Optical Lock).
- **Tầm thi triển (Range):** `9.0m`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `[55, 60, 65, 70, 75] MP`.
- **Sát thương vật lý:**
  - Cấp 1: $45 + 40\%$ Tổng AD
  - Cấp 2: $70 + 40\%$ Tổng AD
  - Cấp 3: $95 + 40\%$ Tổng AD
  - Cấp 4: $120 + 40\%$ Tổng AD
  - Cấp 5: $145 + 40\%$ Tổng AD
- **Hiệu ứng đặc biệt:** Làm lộ diện mục tiêu (kể cả tàng hình hoặc trong bụi), giảm $20\%$ Giáp của con mồi và **làm chậm $30\%$ trong $1.5\text{ giây}$** (`effects: [{ slow: 0.3, duration: 1.5 }]`).

### 2.6. Kỹ Năng R — Thiên Cơ Hủy Diệt Pháo (`skill_r`)
- **Kiểu ngắm:** Định hướng đường thẳng tầm siêu cực đại (Global Extreme Range Skillshot Laser).
- **Chiều rộng chùm pháo (Width):** `2.0m`.
- **Tốc độ chùm pháo (Speed):** `45 m/s` (Gần như tức thời).
- **Tầm bắn tối đa (Range):** **`22.0m`** (Hơn 1.5 màn hình camera MOBA).
- **Thời gian gồng nạp đạn (Windup):** `0.5s`.
- **Thuộc tính xuyên thấu:** **Xuyên qua toàn bộ lính và quái nhỏ** (`passMinions: true`), dừng lại khi trúng tướng địch đầu tiên hoặc xuyên qua mọi tướng địch theo đường bắn.
- **Thời gian hồi chiêu (Cooldown):** `[85.0, 75.0, 65.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `100 MP` tại mọi cấp.
- **Sát thương vật lý khổng lồ:**
  - Cấp 1: $200 + 120\%$ Bonus AD
  - Cấp 2: $310 + 120\%$ Bonus AD
  - Cấp 3: $420 + 120\%$ Bonus AD
- **Hiệu ứng khống chế:** **Làm chậm $45\%$ trong $2.0\text{ giây}$** mục tiêu trúng đòn (`effects: [{ slow: 0.45, duration: 2.0 }]`).
- **Cơ chế thi triển:** 3 vòng kim loại đồng tâm mở rộng tối đa, hội tụ luồng laser vệ tinh từ không gian nã phát đại pháo laser hủy diệt xé toạc bản đồ.

### 2.7. Tốc Biến Lướt Toàn Game — Universal Dash (`dash_d`)
- **Cơ chế:** Phím **D** kích hoạt cú dịch chuyển vi mô $4.5\text{m}$ theo hướng chỉ định. Thời gian hồi $12.0\text{s}$. Dùng để thoát khỏi góc chết khi bị áp sát bất ngờ.

---

## 3. Quy Tắc Mục Tiêu & Các Trường Hợp Biên (Target Rules & Edge Cases)

1. **Quy tắc đạn đạo xuyên thấu:**
   - Kỹ năng Q và R của Iro mang thuộc tính `passMinions: true`, nghĩa là lính và quái rừng nhỏ không thể làm vật cản che chắn cho tướng địch. Tướng địch đứng sau đàn lính vẫn phải nhận trọn vẹn sát thương.
   - Trụ và công trình: Kỹ năng Q và R không gây sát thương lên trụ; đòn đánh thường vẫn bắn trụ nhưng không nhận bonus $+30\%$ sát thương của nội tại ngắm tĩnh.
2. **Các trường hợp biên (Edge Cases):**
   - *Bị dịch chuyển cưỡng bức khi đang tích ngắm:* Nếu Iro bị kéo bởi mỏ neo Nera, bị hất văng bởi ủi E Kora, hoặc dính bất kỳ hiệu ứng di chuyển cưỡng bức nào, toàn bộ điểm tích lũy `focusTime` lập tức bị xóa về 0 và tầm bắn trở lại $7.5\text{m}$.
   - *Mục tiêu nấp sau vật chắn địa hình:* Tia laser đòn đánh thường yêu cầu tầm nhìn trực tiếp (Line of Sight). Tuy nhiên, kỹ năng Q ($12.0\text{m}$) và R ($22.0\text{m}$) bắn **XUYÊN QUA MỌI ĐỊA HÌNH VÁCH ĐÁ**, trúng đích kẻ địch kể cả khi chúng nấp sau vách núi nếu người chơi đoán đúng tọa độ.
