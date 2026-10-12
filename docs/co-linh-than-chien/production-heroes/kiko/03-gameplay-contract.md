# 03 · Gameplay Contract — #01 Kiko (Ảnh Hầu Song Trảo)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#01 / kiko`  
**Vai trò chuẩn hóa:** Sát Thủ (Assassin) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 630 | +86 / cấp | 1,834 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 67 | +3.7 / cấp | 118.8 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 30 | +3.4 / cấp | 77.6 |
| **Kháng phép (MR)** | 30 | +1.2 / cấp | 46.8 |
| **Tốc độ di chuyển (Move Speed)** | 6.5 m/s | 0 | 6.5 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.70 đòn/s | +0.022 / cấp | 1.008 đòn/s |
| **Hồi máu (HP Regen)** | 1.5 HP/s | +0.13 / cấp | 3.32 HP/s |
| **Tuning hệ số:** | `{ hp: 0.98, dmg: 1.02 }` | (Áp dụng cân bằng sát thủ bộc phát trong simulator) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Cận chiến định hướng đơn mục tiêu bằng song trảo cơ khí gắn mu tay.
- **Tầm đánh cơ bản:** `1.6m`.
- **Sát thương cơ bản:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.12\text{s}$. Tốc độ đánh tối đa: $2.5$ đòn/s.

### 2.2. Nội Tại — Ảo Ảnh Quang Học (`passive: holographic_decoy`)
- **Cơ chế 1 — Khởi tạo Ảo Ảnh (Decoy Spawn):**
  - Khi Kiko thi triển kỹ năng **Q** hoặc **W**, một ảo ảnh quang học khúc xạ ánh sáng được tạo ra và tồn tại trong **$3.0\text{ giây}$** (`decoyDuration: 3.0`).
  - Ảo ảnh là một thực thể targetable mang hình dáng và hoạt ảnh tương tự Kiko.
- **Cơ chế 2 — Ngưỡng Hấp Thụ 1-Hit (1-Hit Threshold Absorption):**
  - Trong thời gian ảo ảnh đang hoạt động (`decoyUntil > W.t` và `!decoyHit`), **chính xác 1 đòn đánh hoặc kỹ năng đầu tiên của kẻ địch nhắm vào Kiko/ảo ảnh sẽ bị triệt tiêu hoàn toàn về $0\text{ sát thương}$** (`tgt.decoyHit = true, proc: passive:decoy_absorbed`).
  - Sau khi hấp thụ thành công 1 đòn đánh, ảo ảnh lập tức tan biến.
- **Cơ chế 3 — Tăng Tốc & Đột Biến Sát Thương (Burst Boost):**
  - Trong thời gian ảo ảnh tồn tại và sau khi hấp thụ đòn đánh, Kiko nhận **$+20\%$ Tốc độ di chuyển** (`bonusMsOnDecoy: 0.20`) trong $2.0\text{s}$.
  - Đòn đánh thường tiếp theo của Kiko được cộng thêm **$+35\%$ Bonus AD** sát thương vật lý bộc phát (`burstBonusAd: 0.35`).

### 2.3. Kỹ Năng Q — Toái Trảo Đột Kích (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line Dash).
- **Chiều rộng đường đạn (Width):** `1.3m`.
- **Tốc độ lướt (Speed):** `28 m/s`.
- **Tầm xa (Range & Dash Distance):** `6.0m` (`dash: { distance: 6.0, toward: true }`).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $65 + 85\%$ Bonus AD
  - Cấp 2: $100 + 85\%$ Bonus AD
  - Cấp 3: $135 + 85\%$ Bonus AD
  - Cấp 4: $170 + 85\%$ Bonus AD
  - Cấp 5: $205 + 85\%$ Bonus AD
- **Tương tác nội tại:** Tự động tạo một Ảo ảnh quang học đứng tại vị trí bắt đầu lướt trong $3.0\text{s}$.

### 2.4. Kỹ Năng W — Ảo Ảnh Phân Thân (`skill_w` — Migration từ YAML rmb)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thời).
- **Thời gian hồi chiêu (Cooldown):** `[14.0, 13.0, 12.0, 11.0, 10.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Hành động chuyển động:** Kiko nhảy lùi $2.0\text{m}$ về phía sau.
- **Lớp khiên quang học:**
  - Tồn tại trong **$2.0\text{ giây}$** (`duration: 2.0`).
  - Giá trị khiên: Base $[60, 95, 130, 165, 200]$ hấp thụ sát thương.
- **Tương tác nội tại:** Phóng một Ảo ảnh quang học chạy thẳng về phía trước theo hướng đối diện cú nhảy lùi, tồn tại trong $3.0\text{s}$ để đánh lừa mục tiêu.

### 2.5. Kỹ Năng E — Khúc Xạ Trảm Kích (`skill_e`)
- **Kiểu ngắm:** Tỏa tròn quanh thân (Point Blank AoE Area).
- **Bán kính tác động (Radius):** `3.2m`.
- **Cự ly cast (Range):** `0m` (Tâm là vị trí Kiko).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[9.0, 8.5, 8.0, 7.5, 7.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Số lần chém (Hits):** `2 lần` chém liên tiếp (`hits: 2`).
- **Sát thương vật lý mỗi nhát:**
  - Cấp 1: $40 + 45\%$ Tổng AD (Tổng 2 nhát: $80 + 90\%$ AD)
  - Cấp 2: $65 + 45\%$ Tổng AD (Tổng 2 nhát: $130 + 90\%$ AD)
  - Cấp 3: $90 + 45\%$ Tổng AD (Tổng 2 nhát: $180 + 90\%$ AD)
  - Cấp 4: $115 + 45\%$ Tổng AD (Tổng 2 nhát: $230 + 90\%$ AD)
  - Cấp 5: $140 + 45\%$ Tổng AD (Tổng 2 nhát: $280 + 90\%$ AD)
- **Hiệu ứng:** Làm chậm toàn bộ kẻ địch trúng đòn **$30\%$ trong $1.2\text{ giây}$** (`effects: [{ slow: 0.3, duration: 1.2 }]`).

### 2.6. Kỹ Năng R — Vạn Ảnh Trảo Sát (`skill_r`)
- **Kiểu ngắm:** Chọn mục tiêu đơn (Single Target Dash Strike).
- **Tầm thi triển (Range & Dash Distance):** `6.5m` (`dash: { distance: 6.5, toward: true }`).
- **Thời gian gồng (Windup):** `0.2s`.
- **Thời gian hồi chiêu (Cooldown):** `[70.0, 60.0, 50.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $180 + 120\%$ Bonus AD
  - Cấp 2: $280 + 120\%$ Bonus AD
  - Cấp 3: $380 + 120\%$ Bonus AD
- **Hiệu ứng khống chế:** **Làm choáng $0.8\text{ giây}$** mục tiêu chỉ định (`effects: [{ stun: 0.8 }]`).
- **Cơ chế thi triển:** Kiko biến ảo thành 3 phân ảnh lướt từ các góc chết vào con mồi, tung chuỗi cào xé liên hoàn khiến mục tiêu không thể phản kháng trong thời gian choáng.

### 2.7. Tốc Biến Lướt Toàn Game — Universal Dash (`dash_d`)
- **Cơ chế:** Phím **D** kích hoạt cú trườn bò lướt nhanh $4.5\text{m}$ theo hướng di chuyển. Thời gian hồi $12.0\text{s}$. Cho phép Kiko tái định vị hoặc rút lui sau khi dồn xong combo.

---

## 3. Quy Tắc Mục Tiêu & Các Trường Hợp Biên (Target Rules & Edge Cases)

1. **Quy tắc mục tiêu:**
   - **Tướng địch:** Nhận toàn bộ sát thương, hiệu ứng làm chậm của E và làm choáng của R.
   - **Lính & Quái rừng:** Q lướt xuyên lính gây đủ sát thương; E chém lan 2 nhát dọn bãi rừng nhanh; R chỉ nhắm vào tướng địch hoặc quái to/quái khủng (không lãng phí vào lính thường).
   - **Công trình (Trụ / Nhà chính):** Đòn đánh thường vào trụ **KHÔNG kích hoạt bonus AD bộc phát của nội tại** và trụ không bị ảnh hưởng bởi kỹ năng Q/E/R.
2. **Các trường hợp biên (Edge Cases):**
   - *Đòn đánh nào bị Ảo ảnh 1-hit threshold hấp thụ:* Mọi nguồn sát thương đơn mục tiêu hoặc kỹ năng diện rộng trực tiếp đầu tiên (kể cả phát bắn từ trụ) đều bị triệt tiêu về 0. Tuy nhiên, các hiệu ứng sát thương theo thời gian (DoT) đã dính trước đó (như hiệu ứng thiêu đốt của Hỏa Tủy) vẫn tiếp tục trừ máu bình thường.
   - *Bị ngắt chiêu khi đang khóa R:* Nếu mục tiêu bấm Tốc biến hoặc Dash D ra khỏi tầm nhìn trong $0.2\text{s}$ windup, chiêu R bị hủy và hồi lại $50\%$ thời gian hồi chiêu. Nếu Kiko đã tiếp cận con mồi, cú cào xé không thể bị gián đoạn trừ khi Kiko bị tiêu diệt.
