# 03 · Gameplay Contract — #17 Forge (Lò Cổ)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#17 / forge`  
**Vai trò chuẩn hóa:** Đỡ Đòn Lao Vào (Vanguard Tank) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 780 | +112 / cấp | 2,348 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 56 | +3.2 / cấp | 100.8 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 44 | +4.8 / cấp | 111.2 |
| **Kháng phép (MR)** | 34 | +1.8 / cấp | 59.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.0 m/s | 0 | 6.0 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.62 đòn/s | +0.016 / cấp | 0.844 đòn/s |
| **Hồi máu (HP Regen)** | 1.9 HP/s | +0.18 / cấp | 4.42 HP/s |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (LMB)
- **Kiểu tác động:** Cận chiến va chạm nặng đơn mục tiêu (Melee Target).
- **Tầm đánh cơ bản:** `1.7m`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.18\text{s}$.
- **Tương tác nội tại:** Mỗi đòn đánh trúng cộng **+12 điểm nhiệt** vào thanh nhiệt lò nung.

### 2.2. Nội Tại — Thanh Nhiệt Lò Nung (`passive: heat_gauge`)
- **Cơ chế tích lũy nhiệt lượng (Heat Accumulation):**
  - Chịu sát thương: Mỗi 1 điểm sát thương thực tế nhận vào tích **+0.04 điểm nhiệt** (`heatPerDmgTaken: 0.04`). (Ví dụ: Nhận 500 sát thương tích +20 nhiệt).
  - Tấn công bằng đòn đánh thường: Tích **+12 điểm nhiệt** mỗi hit (`heatPerHit: 12`).
  - Thi triển kỹ năng (Q, E, R): Tích **+15 điểm nhiệt** mỗi lần dùng (`heatPerCast: 15`).
  - Mức nhiệt tối đa: **100 điểm** (Thanh nhiệt chuyển sang màu trắng rực khi đầy).
- **Cơ chế suy giảm nhiệt (Decay):**
  - Khi không nhận hoặc gây sát thương trong 4.0s, nhiệt lượng tự giảm dần với tốc độ 10 điểm/giây.
- **Cơ chế Xả Áp (Heat Vent qua W):**
  - Khi kích hoạt W, toàn bộ số nhiệt hiện có bị tiêu hao sạch về 0.
  - Mỗi điểm nhiệt xả ra chuyển hóa thành:
    - **+1.6 Khiên chắn** bổ sung (`shieldPerHeat: 1.6`).
    - **+1.2 Sát thương phép** nổ diện rộng quanh người (`ventDmgPerHeat: 1.2`).

### 2.3. Kỹ Năng Q — Đột Kích Lò Nung (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng kèm lướt (Skillshot Dash).
- **Chiều rộng đường húc (Width):** `1.6m`.
- **Tốc độ lướt (Speed):** `23 m/s`.
- **Khoảng cách lướt (Range / Dash Distance):** `7.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[12.0, 11.0, 10.0, 9.0, 8.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương phép:**
  - Cấp 1: $40 + 30\%$ AP
  - Cấp 2: $65 + 30\%$ AP
  - Cấp 3: $90 + 30\%$ AP
  - Cấp 4: $115 + 30\%$ AP
  - Cấp 5: $140 + 30\%$ AP
- **Hiệu ứng khống chế cứng:** **Làm choáng (Stun) 0.8 giây** và hất văng nhẹ tướng địch đầu tiên trúng phải.

### 2.4. Kỹ Năng W — Khóa Áp Suất & Xả Áp (`skill_w`, Legacy RMB)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì).
- **Thời gian hồi chiêu (Cooldown):** `[15.0, 14.0, 13.0, 12.0, 11.0]s`.
- **Tiêu hao:** `0` (Tiêu hao 100% thanh nhiệt hiện có).
- **Lượng khiên chắn (Shield):** Tồn tại trong `3.5s`.
  - Khiên cơ bản: $\text{Base} [80, 120, 160, 200, 240] + 8\%\text{ Máu tối đa}$.
  - Khiên nhiệt bổ sung: $+ 1.6 \times \text{Nhiệt lượng hiện tại}$ (Tối đa +160 khiên tại 100 nhiệt).
- **Sát thương nổ nhiệt (Vent Explosion):** Bán kính 4.0m quanh thân.
  - Sát thương phép bộc phát: $1.2 \times \text{Nhiệt lượng hiện tại}$ (Tối đa 120 sát thương phép tại 100 nhiệt).

### 2.5. Kỹ Năng E — Phun Hơi Thiêu Đốt (`skill_e`)
- **Kiểu ngắm:** Diện rộng hình nón phía trước (PBAoE Cone).
- **Bán kính nón (Radius):** `4.0m` (Góc quét $60^\circ$).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương phép:**
  - Cấp 1: $45 + 40\%$ AP
  - Cấp 2: $75 + 40\%$ AP
  - Cấp 3: $105 + 40\%$ AP
  - Cấp 4: $135 + 40\%$ AP
  - Cấp 5: $165 + 40\%$ AP
- **Hiệu ứng khống chế:** Làm chậm kẻ địch trúng hơi nóng **25% trong 1.2 giây**.

### 2.6. Kỹ Năng R — Đại Bộc Phá Lò Cổ (`skill_r` — Ultimate)
- **Kiểu ngắm:** Diện rộng chọn điểm kèm nhảy lao nện (Area Ground Target + Heavy Leap).
- **Khoảng cách lao (Range / Dash Distance):** `5.0m`.
- **Bán kính vụ nổ (Explosion Radius):** `5.5m`.
- **Thời gian thi triển:** `0.3s windup` (nén áp suất) + `0.5s delay` (lao tới và nổ chấn động).
- **Thời gian hồi chiêu (Cooldown):** `[85.0, 75.0, 65.0]s` tại các cấp 6/11/15.
- **Tiêu hao:** `0`.
- **Sát thương phép:**
  - Cấp 1 (Lvl 6): $150 + 50\%$ AP
  - Cấp 2 (Lvl 11): $240 + 50\%$ AP
  - Cấp 3 (Lvl 15): $330 + 50\%$ AP
- **Hiệu ứng khống chế cứng:** **Làm choáng (Stun) 1.1 giây** toàn bộ mục tiêu trong bán kính 5.5m.

### 2.7. Tốc Biến Lướt Phổ Quát — `universal_dash` (Phím D)
- Tuân thủ quy định tại Tài liệu 91: Lướt nhanh 4.5m theo hướng di chuyển, i-frame né tránh 0.15s, tiêu hao thể lực chung, độc lập với kỹ năng Q.

---

## 3. Quy Tắc Tương Tác Mục Tiêu & Cơ Chế Cạnh Biên (Edge Cases)

| Đối tượng | Quy tắc tương tác |
|---|---|
| **Tướng địch (Enemy Heroes)** | Nhận 100% sát thương, choáng và làm chậm. Đòn đánh từ tướng sạc nhiệt cho Forge hiệu quả nhất. |
| **Lính & Quái rừng (Minions & Monsters)** | Nhận 100% sát thương từ Q, E, R, W. Sát thương nhận từ lính/quái vẫn sạc nhiệt cho Forge với tỷ lệ bình thường. |
| **Công trình (Turrets & Core)** | Nhận sát thương AD cơ bản từ đánh thường. Không bị làm chậm bởi E, không bị choáng bởi Q/R. |
| **Tương tác ngắt chiêu (CC Interrupts)** | Khi đang lao Q hoặc nhảy R, nếu bị trói hoặc choáng cứng sẽ bị ngắt hành động di chuyển; tuy nhiên áp suất nhiệt không bị mất. |
| **Tương tác Bot AI** | Bot Forge sẽ ưu tiên mở combat bằng Q khi có mục tiêu trong tầm 7.0m; tự động dùng W khi thanh nhiệt đạt trên 60 hoặc khi máu dưới 40%; dùng R vào vị trí có đông đối thủ nhất. |
