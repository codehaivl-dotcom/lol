# 03 · Gameplay Contract — #39 Kael (Cuồng Đao)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#39 / kael`  
**Vai trò chuẩn hóa:** Đấu Sĩ Đánh Tay (Skirmisher) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 670 | +88 / cấp | 1,902 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 64 | +3.2 / cấp | 108.8 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 34 | +3.6 / cấp | 84.4 |
| **Kháng phép (MR)** | 30 | +1.4 / cấp | 49.6 |
| **Tốc độ di chuyển (Move Speed)** | 6.3 m/s | 0 | 6.3 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.68 đòn/s | +0.020 / cấp | 0.960 đòn/s |
| **Hồi máu (HP Regen)** | 1.6 HP/s | +0.14 / cấp | 3.56 HP/s |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (LMB)
- **Kiểu tác động:** Cận chiến đơn mục tiêu (Melee Target).
- **Tầm đánh cơ bản:** `1.7m`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$. Tốc độ đánh tối đa theo animation: $3.0$ đòn/s.

### 2.2. Nội Tại — Cuồng Nhịp (`passive: cuong_nhip`)
- **Cơ chế tích lũy tầng (Stack Accumulation):**
  - Đánh trúng tướng địch bằng đòn đánh thường hoặc kỹ năng: Tích **+1.0 tầng** (`stackPerHit: 1.0`).
  - Đánh trúng lính hoặc quái rừng: Tích **+0.5 tầng** (`stackPerMinion: 0.5`), và bị giới hạn **tối đa 2 tầng**.
  - Đánh trúng công trình (Trụ, Nhà chính): **Không tích tầng** và không hồi phục.
  - Số tầng tối đa: **5 tầng** (`maxStacks: 5`).
- **Lợi ích mỗi tầng:**
  - Mỗi tầng tăng **+8% Tốc độ đánh** (`aspdPerStack: 0.08`).
  - Tại 5 tầng tối đa: Kael nhận tổng cộng **+40% Tốc độ đánh**.
- **Cơ chế suy giảm dần (Gradual Decay):**
  - Sau khi ngừng gây sát thương hoặc nhận sát thương trong **2.0 giây** (`decayDelay: 2.0`), số tầng bắt đầu suy giảm.
  - Tốc độ suy giảm: **2.0 tầng mỗi giây** (`decayRate: 2.0`) cho đến khi về 0. (Không bị mất trắng toàn bộ tầng ngay lập tức).
  - Tấn công công trình sẽ tạm đóng băng (reset) bộ đếm 2.0s của thời gian suy giảm nhưng không làm tăng thêm số tầng.

### 2.3. Kỹ Năng Q — Cuồng Trảm Lướt (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng kèm lướt (Skillshot Dash).
- **Chiều rộng đường lướt (Width):** `1.4m`.
- **Tốc độ lướt (Speed):** `26 m/s`.
- **Khoảng cách lướt (Range / Dash Distance):** `6.5m`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 75\%$ Bonus AD
  - Cấp 2: $80 + 75\%$ Bonus AD
  - Cấp 3: $110 + 75\%$ Bonus AD
  - Cấp 4: $140 + 75\%$ Bonus AD
  - Cấp 5: $170 + 75\%$ Bonus AD
- **Tương tác nội tại:** Chém trúng tướng kích hoạt ngay 1 tầng Cuồng Nhịp.

### 2.4. Kỹ Năng W — Song Đao Toái Kích (`skill_w`, Legacy RMB)
- **Kiểu ngắm:** Diện rộng bán nguyệt quanh người (Area Self-Centered).
- **Bán kính quét (Radius):** `3.2m`.
- **Số nhịp chém (Hits):** `2 nhịp` liên tiếp trong vòng 0.2s.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s`.
- **Tiêu hao:** `0`.
- **Sát thương vật lý mỗi nhịp:**
  - Cấp 1: $35 + 35\%$ Tổng AD (Tổng 2 nhịp: $70 + 70\%$ AD)
  - Cấp 2: $55 + 35\%$ Tổng AD (Tổng 2 nhịp: $110 + 70\%$ AD)
  - Cấp 3: $75 + 35\%$ Tổng AD (Tổng 2 nhịp: $150 + 70\%$ AD)
  - Cấp 4: $95 + 35\%$ Tổng AD (Tổng 2 nhịp: $190 + 70\%$ AD)
  - Cấp 5: $115 + 35\%$ Tổng AD (Tổng 2 nhịp: $230 + 70\%$ AD)
- **Hiệu ứng khống chế:** Làm chậm kẻ địch trúng đòn **25% trong 1.0 giây**.

### 2.5. Kỹ Năng E — Kích Thích Huyết Mạch (`skill_e`)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì, không ngắt lệnh chém tay).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao:** `0`.
- **Lượng khiên phản ứng (Shield):** Tồn tại trong `2.5s`.
  - Cấp 1: $55$
  - Cấp 2: $85$
  - Cấp 3: $115$
  - Cấp 4: $145$
  - Cấp 5: $175$

### 2.6. Kỹ Năng R — Huyết Cuồng Phong Ma (`skill_r` — Ultimate)
- **Kiểu ngắm:** Diện rộng chọn điểm kèm lướt xoay đao (Area Ground Dash + Spin Slash).
- **Khoảng cách lướt (Range / Dash Distance):** `4.5m`.
- **Bán kính bão đao (Radius):** `4.0m`.
- **Số nhịp chém liên hoàn (Hits):** `3 nhịp` xoay đao dồn dập trong 0.4s.
- **Thời gian thi triển:** `0.2s windup + 0.2s delay`.
- **Thời gian hồi chiêu (Cooldown):** `[70.0, 60.0, 50.0]s` tại các cấp 6/11/15.
- **Tiêu hao:** `0`.
- **Sát thương vật lý mỗi nhịp:**
  - Cấp 1 (Lvl 6): $70 + 50\%$ Bonus AD (Tổng 3 nhịp: $210 + 150\%$ Bonus AD)
  - Cấp 2 (Lvl 11): $110 + 50\%$ Bonus AD (Tổng 3 nhịp: $330 + 150\%$ Bonus AD)
  - Cấp 3 (Lvl 15): $150 + 50\%$ Bonus AD (Tổng 3 nhịp: $450 + 150\%$ Bonus AD)
- **Hiệu ứng khống chế:** Làm chậm kẻ địch trúng đòn **30% trong 1.5 giây**.
- **Tương tác nội tại:** Tích tối đa 3 tầng Cuồng Nhịp nếu cả 3 nhịp đều trúng tướng địch.

### 2.7. Tốc Biến Lướt Phổ Quát — `universal_dash` (Phím D)
- Tuân thủ quy định tại Tài liệu 91: Lướt nhanh 4.5m theo hướng di chuyển, i-frame né tránh 0.15s, tiêu hao thể lực chung, hồi chiêu độc lập với kỹ năng Q.

---

## 3. Quy Tắc Tương Tác Mục Tiêu & Cơ Chế Cạnh Biên (Edge Cases)

| Đối tượng | Quy tắc tương tác |
|---|---|
| **Tướng địch (Enemy Heroes)** | Nhận 100% sát thương, tích 1.0 tầng Cuồng Nhịp mỗi đòn đánh/kỹ năng trúng đích. |
| **Lính & Quái rừng (Minions & Monsters)** | Nhận 100% sát thương kỹ năng; đòn đánh chỉ tích 0.5 tầng Cuồng Nhịp và bị giới hạn trần ở 2 tầng tối đa. |
| **Công trình (Turrets & Core)** | Đánh vào trụ gây 100% sát thương AD cơ bản. **Không tích tầng Cuồng Nhịp**, nhưng giúp duy trì (đóng băng) số tầng hiện có không bị decay trong lúc đập trụ. |
| **Hiệu ứng CC ngắt chiêu (Hard CC Interrupts)** | Nếu Kael bị choáng/trói trong khi đang lướt Q hoặc R, hành động lướt bị dừng lại tại vị trí dính CC, các nhịp chém tiếp theo bị hủy bỏ. |
| **Tương tác Bot AI** | Bot Kael ưu tiên dùng Q để thu hẹp cự ly khi mục tiêu cách 4–6m; kích hoạt E ngay khi nhận đòn đầu tiên từ đối thủ; kích hoạt R khi mục tiêu dưới 40% máu hoặc có từ 2 mục tiêu trong bán kính 4m. |
