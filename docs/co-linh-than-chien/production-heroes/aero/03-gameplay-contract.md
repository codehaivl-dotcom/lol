# 03 · Gameplay Contract — #15 Aero (Phi Công Cổ Khí)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#15 / aero`  
**Vai trò chuẩn hóa:** Xạ Thủ (Marksman) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 610 | +84 / cấp | 1,786 |
| **Nội năng / Mana** | 320 | +35 / cấp | 810 |
| **Sát thương vật lý (AD)** | 62 | +3.7 / cấp | 113.8 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 28 | +3.2 / cấp | 72.8 |
| **Kháng phép (MR)** | 30 | +1.2 / cấp | 46.8 |
| **Tốc độ di chuyển (Move Speed)** | 6.4 m/s (chưa tính passive) | 0 | 6.4 m/s (thực tế 7.36 m/s) |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.68 đòn/s | +0.025 / cấp | 1.03 đòn/s |
| **Hồi máu (HP Regen)** | 1.4 HP/s | +0.12 / cấp | 3.08 HP/s |
| **Hồi năng lượng (Mana Regen)** | 1.6 MP/s | +0.12 / cấp | 3.28 MP/s |
| **Tuning hệ số:** | `{ hp: 0.95, dmg: 1.03 }` | (Áp dụng cân bằng xạ thủ di động oanh tạc) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Đạn đạo tầm xa từ súng hai nòng plasma (Dual Plasma Projectiles).
- **Tầm đánh cơ bản:** `6.2m`.
- **Tốc độ đạn bay:** `32 m/s`.
- **Sát thương cơ bản:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.11\text{s}$. Tốc độ đánh tối đa: $2.5$ đòn/s.
- **Diễn hoạt:** Hai nòng súng bắn so le hai viên đạn plasma xanh lam sáng rực vào mục tiêu.

### 2.2. Nội Tại — Oanh Tạc Rải Thảm Tuyến Tính (`passive: carpet_bomb_strafe`)
- **Cơ chế 1 — Tốc độ bay thường trực (Strafe Speed Bonus):**
  - Cỗ phi cơ cổ khí luôn duy trì vận tốc bay, giúp Aero nhận **$+15\%$ Tốc độ di chuyển** liên tục (`strafeSpeedBonus: 0.15`), tương đương $7.36\text{ m/s}$ tại mọi thời điểm.
- **Cơ chế 2 — Vệt thảm bom plasma (Plasma Strafe Zone DoT):**
  - Khi Aero thi triển kỹ năng **Q**, dọc theo đường bay $7.5\text{m}$ sẽ hình thành một vùng thảm bom plasma `plasma_strafe` tồn tại trong **$3.0\text{ giây}$** (`plasmaDuration: 3.0`).
  - Kẻ địch đứng trên vệt thảm bom phải chịu sát thương thiêu đốt liên tục bằng **$30\%$ Tổng AD** mỗi giây (`plasmaDpsAd: 0.30`).
  - Simulator ghi nhận proc sự kiện: `passive:plasma_strafe`.

### 2.3. Kỹ Năng Q — Tuyến Tính Oanh Tạc (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng lướt tới (Skillshot Line Dash).
- **Chiều rộng vệt oanh tạc (Width):** `1.8m`.
- **Tốc độ bay (Speed):** `30 m/s`.
- **Cự ly bay & Chiều dài vệt (Range & Dash Distance):** `7.5m` (`dash: { distance: 7.5, toward: true }`).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `[40, 45, 50, 55, 60] MP`.
- **Sát thương vật lý tức thời:**
  - Cấp 1: $60 + 80\%$ Bonus AD
  - Cấp 2: $95 + 80\%$ Bonus AD
  - Cấp 3: $130 + 80\%$ Bonus AD
  - Cấp 4: $165 + 80\%$ Bonus AD
  - Cấp 5: $200 + 80\%$ Bonus AD
- **Hiệu ứng:** Kẻ địch trúng đòn bị **làm chậm $25\%$ trong $1.2\text{ giây}$** (`effects: [{ slow: 0.25, duration: 1.2 }]`) và chịu thêm sát thương DoT của vệt thảm bom nội tại trong $3.0\text{s}$.

### 2.4. Kỹ Năng W — Tăng Áp Lượn Vòng (`skill_w` — Migration từ YAML rmb)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thời).
- **Thời gian hồi chiêu (Cooldown):** `[12.0, 11.0, 10.0, 9.0, 8.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `50 MP` tại mọi cấp.
- **Thời gian hiệu lực khiên:** **$2.5\text{ giây}$** (`duration: 2.5`).
- **Lớp khiên áp suất hấp thụ sát thương:**
  - Cấp 1: $65$ Base
  - Cấp 2: $95$ Base
  - Cấp 3: $125$ Base
  - Cấp 4: $155$ Base
  - Cấp 5: $185$ Base
- **Hiệu ứng phụ:** Tăng thêm $+25\%$ Tốc độ di chuyển bộc phát trong $2.0\text{s}$ giúp Aero thực hiện các cú lượn vòng né đạn ngoạn mục.

### 2.5. Kỹ Năng E — Pháo Sáng Phản Lực (`skill_e`)
- **Kiểu ngắm:** Định hướng đường thẳng bắn pháo & Giật lùi bản thân (Skillshot Recoil Dash).
- **Chiều rộng đạn (Width):** `1.5m`.
- **Tốc độ đạn pháo (Speed):** `26 m/s`.
- **Tầm bắn pháo sáng (Range):** `5.5m`.
- **Cự ly giật lùi (Dash Recoil Distance):** `4.5m` về phía sau (`dash: { distance: 4.5, toward: false }`).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `[55, 60, 65, 70, 75] MP`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 50\%$ Tổng AD
  - Cấp 2: $80 + 50\%$ Tổng AD
  - Cấp 3: $110 + 50\%$ Tổng AD
  - Cấp 4: $140 + 50\%$ Tổng AD
  - Cấp 5: $170 + 50\%$ Tổng AD
- **Hiệu ứng:** Đẩy lùi bản thân $4.5\text{m}$, làm mù nhẹ thị giác con mồi và **làm chậm $35\%$ trong $1.2\text{ giây}$** (`effects: [{ slow: 0.35, duration: 1.2 }]`).

### 2.6. Kỹ Năng R — Đại Oanh Tạc Chiến Dịch (`skill_r`)
- **Kiểu ngắm:** Chọn vị trí diện rộng tầm cực xa (Long-range Targeted Area Bombardment).
- **Bán kính vụ nổ (Radius):** `5.5m`.
- **Tầm thi triển tối đa (Range):** `10.0m`.
- **Thời gian gồng (Windup):** `0.25s`.
- **Thời gian trễ bom rơi (Delay):** `0.3s` (Tổng thời gian oanh kích: $0.55\text{s}$).
- **Thời gian hồi chiêu (Cooldown):** `[75.0, 65.0, 55.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `100 MP` tại mọi cấp.
- **Sát thương vật lý:**
  - Cấp 1: $180 + 110\%$ Bonus AD
  - Cấp 2: $280 + 110\%$ Bonus AD
  - Cấp 3: $380 + 110\%$ Bonus AD
- **Hiệu ứng khống chế:** **Làm chậm $40\%$ trong $2.0\text{ giây}$** toàn bộ kẻ địch trúng đòn (`effects: [{ slow: 0.40, duration: 2.0 }]`).
- **Cơ chế thi triển:** Phi cơ cất cánh vút lên cao, dội thảm bão bom plasma xuống tọa độ chỉ định, biến toàn bộ khu vực thành biển lửa dung nham plasma chia cắt đội hình địch.

### 2.7. Tốc Biến Lướt Toàn Game — Universal Dash (`dash_d`)
- **Cơ chế:** Phím **D** kích hoạt cú ngoặt cánh gấp $4.5\text{m}$ theo hướng chỉ định. Thời gian hồi $12.0\text{s}$. Dùng để thoát khỏi góc kẹt hoặc tránh đòn khống chế bất ngờ.

---

## 3. Quy Tắc Mục Tiêu & Các Trường Hợp Biên (Target Rules & Edge Cases)

1. **Quy tắc mục tiêu:**
   - **Tướng địch:** Nhận toàn bộ sát thương đạn, sát thương Q, DoT thảm bom, pháo sáng E và chiêu cuối R.
   - **Lính & Quái rừng:** Vệt thảm bom Q và chiêu cuối R gây đủ $100\%$ sát thương lên lính và quái, giúp Aero trở thành một trong những xạ thủ dọn lính và đẩy đường nhanh nhất game.
   - **Công trình (Trụ):** Đòn đánh thường gây sát thương lên trụ như bình thường; các kỹ năng Q/E/R không gây sát thương lên trụ.
2. **Các trường hợp biên (Edge Cases):**
   - *Bị khống chế cứng trên đường bay Q:* Nếu Aero bị dính làm choáng hoặc hất tung khi đang bay trên đường lướt Q, phi cơ bị khựng lại ngay tại điểm dính chiêu; vệt thảm bom plasma vẫn hình thành từ điểm xuất phát tới điểm bị ngắt.
   - *Giật lùi E qua địa hình:* Cú giật lùi $4.5\text{m}$ của E cho phép Aero vượt qua các vách đá mỏng nếu điểm tiếp đất nằm hoàn toàn bên kia vách tường.
