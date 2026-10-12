# 03 · Gameplay Contract — #34 Jeli (Sóng Chuông Hộ Vệ & Hồi Phục)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#34 / jeli`  
**Vai trò chuẩn hóa:** Hỗ Trợ (Support / Enchanter) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

Dữ liệu kế thừa chính xác từ Candidate YAML (`tools/sim/candidates/jeli.yml`):

| Chỉ số (Stat) | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 (Max Level) |
|---|---|---|---|
| **Máu (HP)** | 640 | +88 / cấp | 1,872 |
| **Năng lượng (Mana)** | 340 | +45 / cấp | 970 |
| **Sát thương vật lý (AD)** | 48 | +2.8 / cấp | 87.2 |
| **Sức mạnh phép thuật (AP)** | 0 | +0 / cấp (tăng theo trang bị) | 0 (gốc) |
| **Giáp vật lý (Armor)** | 30 | +3.5 / cấp | 79.0 |
| **Kháng phép (Magic Resist)** | 34 | +1.8 / cấp | 59.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.1 m/s | 0 | 6.1 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.625 đòn/s | +0.015 / cấp | 0.835 đòn/s |
| **Hồi máu tự nhiên (HP Regen)** | 1.5 HP/s | +0.14 / cấp | 3.46 HP/s |
| **Hồi năng lượng (Mana Regen)** | 2.0 Mana/s | +0.15 / cấp | 4.10 Mana/s |
| **Hệ số cân bằng (Balance Tuning)** | HP: 1.02 | DMG: 0.90 | — |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Chuột trái / LMB)
- **Kiểu ngắm:** Đạn đạo tầm xa đơn mục tiêu (Ranged Target Projectile).
- **Tầm bắn (Range):** `6.2m`.
- **Tốc độ đạn (Projectile Speed):** `22 m/s`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.16\text{s}$.
- **Hiệu ứng đặc biệt:** Đòn đánh bắn ra một giọt nước phát quang ngọc bích, không tiêu hao năng lượng.

### 2.2. Nội Tại — Sóng Chuông Cộng Hưởng (`passive: chime_resonance`)
- **Cơ chế hoạt động:**
  - Đồng hồ nhịp thở nội tại chạy tự động với chu kỳ **3.5 giây** (`interval: 3.5`).
  - Khi đồng hồ chạm mốc 3.5s, chuông ngân phát ra một xung sóng âm thủy ba lan tỏa trong bán kính **6.0m** quanh Jeli.
- **Xử lý mục tiêu đồng minh:**
  - Quét tìm đồng minh trong bán kính có tỷ lệ phần trăm máu hiện tại thấp nhất ($HP / MaxHP$).
  - **Hồi máu cho đồng minh được chọn:** $35 + 30\%$ AP (`chimeHeal: { base: 35, ap: 0.3 }`).
  - **Ban khiên nhẹ cho đồng minh được chọn:** $25 + 20\%$ AP (`chimeShield: { base: 25, ap: 0.2 }`), khiên tồn tại trong **2.5 giây**.
- **Tự hồi phục bản thân:**
  - Jeli tự nhận $50\%$ lượng hồi máu trên ($17.5 + 15\%$ AP).
- **Bộ đếm số liệu độc lập:** Ghi nhận vào chỉ số `m.allyHealed`, `m.healed`, `m.shieldGiven` và kích hoạt proc sự kiện `passive:chime_resonance`.

### 2.3. Kỹ Năng Q — Thủy Ba Chấn Động (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đường đạn (Width):** `1.6m`.
- **Tốc độ bay đạn (Speed):** `24 m/s` (Bay chậm hơn đạn pháp sư thông thường, tạo cửa sổ né tránh).
- **Tầm xa (Range):** `8.5m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s` theo cấp kỹ năng 1 đến 5.
- **Tiêu hao năng lượng (Mana Cost):** `[50, 55, 60, 65, 70]` mana.
- **Sát thương phép thuật:**
  - Cấp 1: $50 + 45\%$ AP
  - Cấp 2: $80 + 45\%$ AP
  - Cấp 3: $110 + 45\%$ AP
  - Cấp 4: $140 + 45\%$ AP
  - Cấp 5: $170 + 45\%$ AP
- **Hiệu ứng khống chế:** Làm chậm mục tiêu trúng đòn **35% trong 1.5 giây** (`slow: 0.35, duration: 1.5`).
- **Quy tắc trúng đích:** Nổ tung tại mục tiêu đầu tiên va phải (tướng hoặc lính), gây sát thương và làm chậm trong vùng nổ bán kính nhỏ 1.2m quanh điểm va chạm.

### 2.4. Kỹ Năng W — Chuông Nước Hộ Thể (`skill_w`, Legacy RMB)
- **Kiểu ngắm:** Tự niệm diện rộng tức thời (Self-Centered PBAoE Aura).
- **Bán kính bảo vệ (Radius):** `6.0m`.
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thì, hoàn toàn không làm khựng hay gián đoạn bước di chuyển).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `[65, 70, 75, 80, 85]` mana.
- **Lượng khiên bảo hộ (Shield - Tồn tại 3.0s):**
  - Cấp 1: $60$ điểm khiên
  - Cấp 2: $90$ điểm khiên
  - Cấp 3: $120$ điểm khiên
  - Cấp 4: $150$ điểm khiên
  - Cấp 5: $180$ điểm khiên
- **Lượng hồi phục tức thời (Heal):**
  - Cấp 1: $40 + 25\%$ AP
  - Cấp 2: $65 + 25\%$ AP
  - Cấp 3: $90 + 25\%$ AP
  - Cấp 4: $115 + 25\%$ AP
  - Cấp 5: $140 + 25\%$ AP
- **Phạm vi tác động:** Áp dụng đầy đủ cả Khiên và Hồi phục cho bản thân Jeli và TẤT CẢ tướng đồng minh đang đứng trong bán kính 6.0m tại thời điểm niệm chiêu.

### 2.5. Kỹ Năng E — Thủy Luân Âm Vực (`skill_e`)
- **Kiểu ngắm:** Tỏa tròn quanh thân (Area PBAoE).
- **Bán kính âm vực (Radius):** `4.2m`.
- **Khoảng cách chọn điểm (Range):** `0` (Tâm vòng luôn là vị trí của Jeli).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s`.
- **Tiêu hao năng lượng (Mana Cost):** `60` mana ở mọi cấp.
- **Sát thương phép thuật:**
  - Cấp 1: $40 + 35\%$ AP
  - Cấp 2: $65 + 35\%$ AP
  - Cấp 3: $90 + 35\%$ AP
  - Cấp 4: $115 + 35\%$ AP
  - Cấp 5: $140 + 35\%$ AP
- **Hiệu ứng khống chế:** Làm chậm tất cả kẻ địch trúng đòn **30% trong 1.2 giây** (`slow: 0.3, duration: 1.2`).
- **Mục đích chiến thuật:** Kỹ năng tự vệ (peel tool) giúp Jeli bóc tách kẻ địch áp sát hoặc hỗ trợ làm chậm diện rộng trong giao tranh nhỏ.

### 2.6. Kỹ Năng R — Đại Triều Thánh Chuông (`skill_r` — Ultimate)
- **Kiểu ngắm:** Đại hào quang diện rộng quanh thân (Ultimate Grand PBAoE Aura).
- **Bán kính thánh chuông (Radius):** `6.5m`.
- **Độ trễ niệm chiêu:** `0.25s windup` (gồng chuông) + `0.2s delay` (sóng âm kích hoạt bùng nổ).
- **Thời gian hồi chiêu (Cooldown):** `[85.0, 75.0, 65.0]s` tại các cấp độ kỹ năng 1/2/3 (tương ứng cấp tướng 6/11/15).
- **Tiêu hao năng lượng (Mana Cost):** `100` mana ở mọi cấp.
- **Sát thương phép lên kẻ địch:**
  - Cấp 1 (Lvl 6): $80 + 25\%$ AP
  - Cấp 2 (Lvl 11): $130 + 25\%$ AP
  - Cấp 3 (Lvl 15): $180 + 25\%$ AP
- **Hiệu ứng khống chế kẻ địch:** Làm chậm **35% trong 2.0 giây** (`slow: 0.35, duration: 2.0`).
- **Lượng hồi phục cực đại cho toàn bộ đồng minh:**
  - Cấp 1: $100 + 35\%$ AP
  - Cấp 2: $170 + 35\%$ AP
  - Cấp 3: $240 + 35\%$ AP
- **Lượng khiên thánh chuông cho toàn bộ đồng minh (Tồn tại 3.5s):**
  - Cấp 1: $100$ điểm khiên
  - Cấp 2: $160$ điểm khiên
  - Cấp 3: $220$ điểm khiên

### 2.7. Tốc Biến Lướt Phổ Quát — `universal_dash` (Phím D)
- Tuân thủ nghiêm ngặt quy định tại Tài liệu 91: Lướt nhanh $4.5\text{m}$ theo hướng trỏ chuột / hướng di chuyển, thời gian lướt $0.18\text{s}$, $0.15\text{s}$ khung miễn nhiễm va chạm (i-frame), tiêu hao thể lực chung ($50$ stamina), hồi chiêu $14\text{s}$. Hoàn toàn độc lập với bộ kỹ năng Q/W/E/R.

---

## 3. Quy Tắc Tương Tác Mục Tiêu & Cơ Chế Cạnh Biên (Edge Cases)

| Đối tượng / Trường hợp | Quy tắc xử lý gameplay chuẩn |
|---|---|
| **Tướng đồng minh (Allied Heroes)** | Nhận trọn vẹn khiên và hồi phục từ nội tại, W và R. Nếu có nhiều đồng minh cùng máu thấp, nội tại ưu tiên mục tiêu có % máu thấp nhất. Nếu % bằng nhau, ưu tiên mục tiêu đứng gần Jeli nhất. |
| **Lính & Quái rừng đồng minh** | Nội tại **không hồi máu cho lính/quái**. Kỹ năng W và R chỉ tác dụng lên tướng đồng minh, không cấp khiên cho lính đẩy đường. |
| **Tướng địch (Enemy Heroes)** | Chịu sát thương phép và làm chậm từ Q, E và R. Kẻ địch không thể cản phá hay đánh cắp quầng hào quang của W/R. |
| **Công trình (Turrets / Core)** | Đánh thường gây sát thương vật lý $100\%$ AD lên trụ. Toàn bộ kỹ năng Q, W, E, R **không tác động** lên công trình. |
| **Tương tác Vết Thương Sâu (Anti-Heal)** | Lượng hồi phục từ nội tại, W, R bị giảm theo tỷ lệ % của hiệu ứng Vết Thương Sâu. Tuy nhiên, **Lượng Khiên (Shield) hoàn toàn không bị ảnh hưởng** bởi hiệu ứng giảm hồi máu. |
| **Bị ngắt chiêu (Interrupts & Crowd Control)** | Kỹ năng W kích hoạt tức thì ($0\text{s}$ windup) nên không thể bị ngắt. Kỹ năng Q ($0.15\text{s}$) và R ($0.25\text{s}$ windup + $0.2\text{s}$ delay) nếu Jeli bị Choáng/Câm Lặng trong thời gian này sẽ bị hủy đòn và tính thời gian hồi chiêu đầy đủ. |
| **Trạng thái Tử Vong (Death State)** | Khi Jeli ngã xuống, mọi hào quang đang duy trì lập tức tan biến; đồng hồ nội tại dừng lại; các lớp khiên đã cấp cho đồng minh trước đó vẫn tồn tại cho đến khi hết hạn (3.0s/3.5s). |
| **Tương tác Bot AI (Bot Logic)** | Bot Jeli tự động di chuyển giữ cự ly $3.5\text{m} - 5.0\text{m}$ sau tướng đồng minh gần nhất. Bot tự động kích hoạt W khi có đồng minh trong tầm $6.0\text{m}$ tụt máu $< 60\%$ hoặc bản thân bị tấn công. Bot dùng Q khi tướng địch trong cự ly $5.0\text{m} - 8.0\text{m}$, dùng E khi địch áp sát $< 3.5\text{m}$, và kích hoạt R khi giao tranh có từ 2 đồng minh máu $< 45\%$. |
