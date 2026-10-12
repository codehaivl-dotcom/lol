# 03 · Gameplay Contract — #43 Phù Đổng (Thiết Mã Thiên Tướng)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#43 / phu_dong`  
**Vai trò chuẩn hóa:** Tiên Phong / Đấu Sĩ (Vanguard / Fighter) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 760 | +102 / cấp | 2,188 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 66 | +3.6 / cấp | 116.4 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 40 | +4.2 / cấp | 98.8 |
| **Kháng phép (MR)** | 34 | +1.8 / cấp | 59.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.4 m/s | 0 | 6.4 m/s (Tối đa ~7.68 m/s khi đủ đà) |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.64 đòn/s | +0.016 / cấp | 0.864 đòn/s |
| **Hồi máu (HP Regen)** | 1.8 HP/s | +0.16 / cấp | 4.04 HP/s |
| **Tuning hệ số:** | `{ hp: 1.05, dmg: 0.96 }` | (Áp dụng cân bằng đấu sĩ tanker trong simulator) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Cận chiến định hướng đơn mục tiêu trên lưng Thiết Mã.
- **Tầm đánh cơ bản (Trạng thái Cổ Thần Kiếm):** `2.1m`.
- **Tầm đánh mở rộng (Trạng thái Thiên Lôi Cổ Trúc):** `3.5m` (khi buff `bambooUntil` kích hoạt sau chiêu R).
- **Sát thương cơ bản:** $100\%$ Tổng AD (Sát thương vật lý).
- **Sát thương trạng thái Cổ Trúc:** Gây sát thương chính và lan thêm **$+35\%$ Tổng AD** sát thương vật lý hình quạt cho mọi kẻ địch trong tầm $3.5\text{m}$.
- **Độ trễ ra đòn (Attack Windup):** $0.16\text{s}$. Tốc độ đánh tối đa: $2.0$ đòn/s.

### 2.2. Nội Tại — Thiết Mã Xung Lượng (`passive: mounted_momentum`)
- **Cơ chế 1 — Tích tụ Xung Lượng (Momentum Charge):**
  - Khi Phù Đổng di chuyển, tích tụ $25\text{ điểm đà/giây}$ (`momentumPerSec: 25`), tối đa $100\text{ điểm}$ (`maxMomentum: 100`).
  - Mỗi điểm đà gia tăng tốc độ di chuyển tỷ lệ thuận, đạt tối đa **$+20\%$ Tốc độ di chuyển** (`bonusMsRatio: 0.20`) ở 100 đà. Khi đứng yên hoặc bị trúng khống chế cứng, đà suy giảm nhanh $40\text{ điểm/giây}$.
- **Cơ chế 2 — Cú Húc Lôi Hỏa (Mounted Charge Stun):**
  - Khi Xung Lượng đạt từ **80 điểm trở lên** ($\ge 80$), đòn đánh thường tiếp theo kích hoạt Cú Húc Lôi Hỏa:
    - Thiết Mã dậm móng sắt húc văng, làm choáng mục tiêu đầu tiên trong **$0.6\text{ giây}$** (`chargeStun: 0.6`).
    - Gây thêm **$+50\%$ Sát thương vật lý** theo AD (`chargeBonusAd: 0.50`).
    - Sau khi húc trúng, thanh Xung Lượng lập tức tiêu hao về 0.
- **Cơ chế 3 — Chuyển Thế Cổ Trúc (Divine Bamboo Stance):**
  - Khi kích hoạt Ultimate R, kích hoạt trạng thái Cổ Trúc trong **6.0 giây** (`bambooUntil = t + 6.0`). Tầm đánh mở rộng thành $3.5\text{m}$, áp dụng sát thương quét diện rộng.

### 2.3. Kỹ Năng Q — Thiết Mã Đột Kích (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line Dash).
- **Chiều rộng đường càn (Width):** `1.6m`.
- **Tốc độ lướt (Speed):** `24 m/s`.
- **Tầm xa (Range & Dash Distance):** `7.2m` (`dash: { distance: 7.2, toward: true }`).
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $60 + 75\%$ Bonus AD
  - Cấp 2: $95 + 75\%$ Bonus AD
  - Cấp 3: $130 + 75\%$ Bonus AD
  - Cấp 4: $165 + 75\%$ Bonus AD
  - Cấp 5: $200 + 75\%$ Bonus AD
- **Hiệu ứng khống chế:** Làm chậm kẻ địch trúng đòn **$30\%$ trong $1.2\text{ giây}$** (`effects: [{ slow: 0.3, duration: 1.2 }]`).

### 2.4. Kỹ Năng W — Kim Giáp Thiết Thuẫn (`skill_w` — Migration từ YAML rmb)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thời).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Lớp khiên hấp thụ sát thương:**
  - Tồn tại trong **$3.0\text{ giây}$** (`duration: 3.0`).
  - Giá trị khiên: Base $[80, 120, 160, 200, 240] + 8\%\text{ Máu tối đa của Phù Đổng}$ (`shield: { maxHp: 0.08 }`).

### 2.5. Kỹ Năng E — Lôi Hỏa Trảm (`skill_e`)
- **Kiểu ngắm:** Tỏa tròn quanh thân (Point Blank AoE Area).
- **Bán kính tác động (Radius):** `3.6m`.
- **Cự ly cast (Range):** `0m` (Tâm là vị trí Phù Đổng).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $55 + 65\%$ Tổng AD
  - Cấp 2: $85 + 65\%$ Tổng AD
  - Cấp 3: $115 + 65\%$ Tổng AD
  - Cấp 4: $145 + 65\%$ Tổng AD
  - Cấp 5: $175 + 65\%$ Tổng AD
- **Hiệu ứng:** Làm chậm toàn bộ kẻ địch trong vòng quét **$25\%$ trong $1.0\text{ giây}$** (`effects: [{ slow: 0.25, duration: 1.0 }]`).

### 2.6. Kỹ Năng R — Thiên Lôi Cổ Trúc (`skill_r`)
- **Kiểu ngắm:** Chọn vị trí mặt đất diện rộng (Ground Target Area Leap).
- **Tầm thi triển (Range & Leap Distance):** `5.5m` (`dash: { distance: 5.5, toward: true }`).
- **Bán kính tâm chấn (Radius):** `4.8m`.
- **Thời gian gồng (Windup):** `0.3s`.
- **Độ trễ bay trên không (Delay):** `0.4s` (Tổng thời gian telegraph trước khi va chạm: $0.7\text{s}$).
- **Thời gian hồi chiêu (Cooldown):** `[80.0, 70.0, 60.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $180 + 115\%$ Bonus AD
  - Cấp 2: $290 + 115\%$ Bonus AD
  - Cấp 3: $400 + 115\%$ Bonus AD
- **Hiệu ứng khống chế:** **Làm choáng $1.0\text{ giây}$** toàn bộ mục tiêu trong bán kính $4.8\text{m}$ (`effects: [{ stun: 1.0 }]`).
- **Cơ chế chuyển dạng:** Cổ Thần Kiếm vỡ vụn, Phù Đổng nhổ Thiên Lôi Cổ Trúc vào tay trong 6.0 giây, kích hoạt đòn đánh quét diện rộng $3.5\text{m}$.

### 2.7. Tốc Biến Lướt Toàn Game — Universal Dash (`dash_d`)
- **Cơ chế:** Phím **D** kích hoạt cú ghìm cương thúc ngựa lướt nhanh $4.5\text{m}$ theo hướng di chuyển. Thời gian hồi $12.0\text{s}$. Không làm mất điểm Xung Lượng đang tích tụ.

---

## 3. Quy Tắc Mục Tiêu & Các Trường Hợp Biên (Target Rules & Edge Cases)

1. **Quy tắc mục tiêu:**
   - **Tướng địch:** Nhận đầy đủ sát thương, hiệu ứng choáng của Cú Húc và chiêu R.
   - **Lính & Quái rừng:** Đòn đánh Cổ Trúc $3.5\text{m}$ gây đủ $100\%$ sát thương quét lên lính, giúp Phù Đổng dọn lính nhanh khi cần đẩy đường. Cú Húc móng sắt vẫn làm choáng lính/quái to.
   - **Công trình (Trụ / Nhà chính):** Đòn đánh vào trụ **KHÔNG kích hoạt Cú Húc và KHÔNG tiêu hao đà Xung Lượng** (bảo lưu đà để sẵn sàng phòng thủ khi đối phương tập kích).
2. **Các trường hợp biên (Edge Cases):**
   - *Bị khống chế cứng khi đang bay R:* Nếu bị làm choáng/hất tung trong $0.3\text{s}$ windup đầu tiên, chiêu R bị ngắt và hồi chiêu tính $50\%$. Nếu đã bay trên không ($0.4\text{s}$ delay), Phù Đổng duy trì trạng thái kháng gián đoạn và tiếp đất hoàn tất cú nện.
   - *Tương tác lướt Q qua địa hình:* Kỹ năng Q chỉ lướt qua được các bờ tường mỏng ($\le 1.5\text{m}$). Nếu đâm vào vách núi dày của Tản Sơn (#44), Phù Đổng dừng lại ở mép tường và gây sát thương tại điểm va chạm.
