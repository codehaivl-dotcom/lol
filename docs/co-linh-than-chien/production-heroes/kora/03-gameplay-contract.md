# 03 · Gameplay Contract — #32 Kora (Hải Mẫu Cổ Giáp)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#32 / kora`  
**Vai trò chuẩn hóa:** Đỡ Đòn (Tank) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 800 | +110 / cấp | 2,340 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 55 | +3.0 / cấp | 97.0 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 46 | +4.6 / cấp | 110.4 |
| **Kháng phép (MR)** | 38 | +2.0 / cấp | 66.0 |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.60 đòn/s | +0.012 / cấp | 0.768 đòn/s |
| **Hồi máu (HP Regen)** | 2.2 HP/s | +0.20 / cấp | 5.00 HP/s |
| **Tuning hệ số:** | `{ hp: 1.08, dmg: 0.92 }` | (Áp dụng chỉ số đỡ đòn đầm chắc trong simulator) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Cận chiến kẹp càng cơ khí đơn mục tiêu.
- **Tầm đánh cơ bản:** `1.9m`.
- **Sát thương cơ bản:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.18\text{s}$. Tốc độ đánh tối đa: $1.8$ đòn/s.
- **Diễn hoạt:** Càng phải kẹp mạnh vào thân mục tiêu tạo âm thanh va đập kim loại đanh chắc.

### 2.2. Nội Tại — Hải Mẫu Hộ Giáp Cửa Đập (`passive: directional_shield`)
- **Cơ chế 1 — Giảm thiểu sát thương đạn đạo trực diện (Frontal Mitigation):**
  - Khi Kora kích hoạt thế thủ hoặc bật kỹ năng W (`guardUntil > W.t`), mọi sát thương đạn đạo (Projectiles) xuất phát từ góc $180^\circ$ hình cánh quạt phía trước mặt Kora sẽ được **giảm thiểu chính xác $60\%$ sát thương** (`frontMitigation: 0.60`).
  - Simulator ghi nhận proc sự kiện: `passive:directional_shield_block`.
- **Cơ chế 2 — Điểm yếu sườn và lưng (Vulnerable Flanks):**
  - Đạn đạo và đòn đánh đến từ góc $180^\circ$ phía sau lưng và hai bên mạn sườn chịu đủ $100\%$ sát thương bình thường (không giảm trừ).
- **Cơ chế 3 — Phạt tốc độ di chuyển khi thủ (Speed Penalty):**
  - Trong thời gian giương càng thế thủ, tốc độ di chuyển của Kora bị giảm **$20\%$** (`shieldSpeedPenalty: 0.20`).

### 2.3. Kỹ Năng Q — Thiết Càng Nghiền Ép (`skill_q`)
- **Kiểu ngắm:** Cận chiến định hướng đơn mục tiêu (Melee Target / Directional Clamp).
- **Tầm xa (Range):** `2.2m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $60 + 70\%$ Bonus AD
  - Cấp 2: $90 + 70\%$ Bonus AD
  - Cấp 3: $120 + 70\%$ Bonus AD
  - Cấp 4: $150 + 70\%$ Bonus AD
  - Cấp 5: $180 + 70\%$ Bonus AD
- **Hiệu ứng khống chế:** **Làm choáng $0.6\text{ giây}$** mục tiêu trúng đòn (`effects: [{ stun: 0.6 }]`).

### 2.4. Kỹ Năng W — Cửa Đập Phòng Ngự (`skill_w` — Migration từ YAML rmb)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thời).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Thời gian hiệu lực thế thủ:** **$3.5\text{ giây}$** (`duration: 3.5`).
- **Lá chắn hấp thụ sát thương (Absorb Shield):**
  - Cấp 1: $90 + 9\%$ Máu tối đa
  - Cấp 2: $135 + 9\%$ Máu tối đa
  - Cấp 3: $180 + 9\%$ Máu tối đa
  - Cấp 4: $225 + 9\%$ Máu tối đa
  - Cấp 5: $270 + 9\%$ Máu tối đa
- **Hiệu ứng kích hoạt:** Mở trạng thái `guardUntil = W.t + 3.5`, kích hoạt cơ chế giảm $60\%$ sát thương đạn đạo phía trước của nội tại.

### 2.5. Kỹ Năng E — Hải Triều Xung Kích (`skill_e`)
- **Kiểu ngắm:** Định hướng đường thẳng lướt tới (Skillshot Line Dash).
- **Chiều rộng đường đạn (Width):** `1.8m`.
- **Tốc độ lướt (Speed):** `20 m/s`.
- **Cự ly lướt (Range & Dash Distance):** `5.5m` (`dash: { distance: 5.5, toward: true }`).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $50 + 50\%$ Tổng AD
  - Cấp 2: $75 + 50\%$ Tổng AD
  - Cấp 3: $100 + 50\%$ Tổng AD
  - Cấp 4: $125 + 50\%$ Tổng AD
  - Cấp 5: $150 + 50\%$ Tổng AD
- **Hiệu ứng:** Hất dạt nhẹ kẻ địch sang hai bên đường ủi và **làm chậm $35\%$ trong $1.2\text{ giây}$** (`effects: [{ slow: 0.35, duration: 1.2 }]`).

### 2.6. Kỹ Năng R — Hải Trấn Thần Uy (`skill_r`)
- **Kiểu ngắm:** Tỏa tròn quanh thân (Point Blank AoE Area).
- **Bán kính tác động (Radius):** `5.5m`.
- **Cự ly cast (Range):** `0m` (Tâm là vị trí Kora).
- **Thời gian gồng (Windup):** `0.3s`.
- **Thời gian trễ chấn động (Delay):** `0.2s` (Tổng thời gian ra đòn: $0.5\text{s}$).
- **Thời gian hồi chiêu (Cooldown):** `[85.0, 75.0, 65.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $150 + 85\%$ Bonus AD
  - Cấp 2: $240 + 85\%$ Bonus AD
  - Cấp 3: $330 + 85\%$ Bonus AD
- **Hiệu ứng khống chế:** **Làm choáng $1.0\text{ giây}$** toàn bộ kẻ địch trong vùng bán kính $5.5\text{m}$ (`effects: [{ stun: 1.0 }]`).

### 2.7. Tốc Biến Lướt Toàn Game — Universal Dash (`dash_d`)
- **Cơ chế:** Phím **D** kích hoạt cú trượt ngang mai cua dạt $4.0\text{m}$ theo hướng chỉ định. Thời gian hồi $12.0\text{s}$. Cho phép Kora nhanh chóng đổi góc che chắn đạn hoặc thoát khỏi vùng bất lợi.

---

## 3. Quy Tắc Mục Tiêu & Các Trường Hợp Biên (Target Rules & Edge Cases)

1. **Quy tắc đạn đạo bị giảm sát thương:**
   - Đạn đạo được tính là "phía trước" nếu góc giữa vector hướng mặt của Kora và vector di chuyển của viên đạn ngược chiều nhau trong phạm vi $\pm 90^\circ$ (góc quét $180^\circ$).
   - Đạn đạo xuyên thấu (Piercing Projectiles): Giảm $60\%$ sát thương khi chạm vào Kora, nhưng viên đạn vẫn tiếp tục bay ra sau (trừ khi đạn có thuộc tính va chạm tiêu biến tại vật cản đầu tiên).
2. **Tương tác với sát thương không phải đạn đạo:**
   - Kỹ năng sát thương diện rộng cắm đất (Ground AoE như thảm bom Aero hay vết nứt Dung Thạch) **KHÔNG bị giảm $60\%$**, Kora chịu đủ sát thương thông thường trừ vào lớp giáp và khiên.
   - Sát thương chuẩn (True Damage): Không bị giảm trừ bởi cơ chế giảm sát thương của khiên.
3. **Các trường hợp biên (Edge Cases):**
   - *Bị khống chế cứng khi đang giương W:* Nếu Kora bị làm choáng hoặc hất tung khi W đang hoạt động, thế giương càng vẫn duy trì hiệu lực giảm đạn đạo cho đến hết $3.5\text{s}$, nhưng Kora không thể di chuyển hay xoay hướng mặt.
   - *Ngắt chiêu R trong $0.5\text{s}$ niệm:* Nếu Kora bị hất tung hoặc đẩy lùi trước khi hai càng chạm đất ($t < 0.5\text{s}$), chiêu R bị ngắt và hoàn trả $50\%$ thời gian hồi chiêu.
