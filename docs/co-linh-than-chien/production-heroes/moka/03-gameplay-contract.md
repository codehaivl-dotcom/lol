# 03 · Gameplay Contract — #31 Moka (Hổ Nấm Răng Kiếm)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#31 / moka`  
**Vai trò chuẩn hóa:** Sát Thủ (Assassin) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 640 | +88 / cấp | 1,872 |
| **Nội năng / Mana** | 0 (Không dùng tài nguyên) | 0 | 0 |
| **Sát thương vật lý (AD)** | 68 | +3.8 / cấp | 121.2 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 32 | +3.5 / cấp | 81.0 |
| **Kháng phép (MR)** | 30 | +1.3 / cấp | 48.2 |
| **Tốc độ di chuyển (Move Speed)** | 6.55 m/s | 0 | 6.55 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.68 đòn/s | +0.022 / cấp | 0.988 đòn/s |
| **Hồi máu (HP Regen)** | 1.5 HP/s | +0.13 / cấp | 3.32 HP/s |
| **Tuning hệ số:** | `{ hp: 0.98, dmg: 1.03 }` | (Áp dụng cân bằng sát thủ dã thú bộc phát) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Cận chiến cào xé bằng nanh vuốt dã thú đơn mục tiêu.
- **Tầm đánh cơ bản:** `1.8m`.
- **Sát thương cơ bản:** $100\%$ Tổng AD (Sát thương vật lý).
- **Độ trễ ra đòn (Attack Windup):** $0.12\text{s}$. Tốc độ đánh tối đa: $2.5$ đòn/s.
- **Diễn hoạt:** Vuốt phải cào vát chéo $\rightarrow$ hàm răng kiếm đớp mạnh vào mục tiêu.

### 2.2. Nội Tại — Hổ Nấm Bào Tử Rình Vồ (`passive: spore_pounce`)
- **Cơ chế 1 — Đánh dấu bào tử & Lộ diện (Spore Mark & True Sight):**
  - Khi mục tiêu trúng kỹ năng **Q**, chúng bị bao phủ bởi lớp bào tử nấm huỳnh quang trong suốt **$4.0\text{ giây}$** (`sporeDuration: 4.0`).
  - Mục tiêu dính bào tử bị lộ diện hoàn toàn (mất hiệu ứng tàng hình hoặc ẩn nấp trong bụi rậm).
- **Cơ chế 2 — Vồ mồi tầm xa (Long-range Pounce):**
  - Khi mục tiêu đang dính hiệu ứng Bào Tử và nằm trong cự ly **$7.0\text{m}$** (`pounceRange: 7.0`), đòn đánh thường tiếp theo của Moka sẽ biến thành cú phóng người vồ mồi xuyên khoảng cách, đưa Moka áp sát ngay cạnh mục tiêu.
- **Cơ chế 3 — Sát thương bộc phát cộng thêm (Pounce Burst Bonus):**
  - Cú vồ mồi nội tại gây thêm **$+40\%$ Bonus AD** sát thương vật lý bộc phát (`pounceBonusAd: 0.40`).
  - Simulator ghi nhận proc sự kiện: `passive:spore_pounce`.

### 2.3. Kỹ Năng Q — Bào Tử Phóng Thích (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line Missile).
- **Chiều rộng đường đạn (Width):** `1.4m`.
- **Tốc độ đạn bay (Speed):** `28 m/s`.
- **Tầm xa (Range):** `6.5m`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $65 + 85\%$ Bonus AD
  - Cấp 2: $100 + 85\%$ Bonus AD
  - Cấp 3: $135 + 85\%$ Bonus AD
  - Cấp 4: $170 + 85\%$ Bonus AD
  - Cấp 5: $205 + 85\%$ Bonus AD
- **Hiệu ứng:** Áp dụng hiệu ứng Bào Tử ($4.0\text{s}$) và **làm chậm $25\%$ trong $1.2\text{ giây}$** (`effects: [{ slow: 0.25, duration: 1.2 }]`).

### 2.4. Kỹ Năng W — Ẩn Tích Bào Quang (`skill_w` — Migration từ YAML rmb)
- **Kiểu ngắm:** Tự niệm (Self Cast).
- **Thời gian gồng (Windup):** `0s` (Kích hoạt tức thời).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Thời gian hiệu lực khiên:** **$2.5\text{ giây}$** (`duration: 2.5`).
- **Lớp khiên bào tử hấp thụ sát thương:**
  - Cấp 1: $60$ Base
  - Cấp 2: $95$ Base
  - Cấp 3: $130$ Base
  - Cấp 4: $165$ Base
  - Cấp 5: $200$ Base
- **Hiệu ứng phụ:** Tăng $+30\%$ Tốc độ di chuyển trong $2.0\text{s}$ cho phép Moka luồn lách qua góc nhìn con mồi.

### 2.5. Kỹ Năng E — Toái Cốt Trảm Kích (`skill_e`)
- **Kiểu ngắm:** Tỏa tròn quanh thân (Point Blank AoE Area).
- **Bán kính tác động (Radius):** `3.2m`.
- **Cự ly cast (Range):** `0m` (Tâm là vị trí Moka).
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[8.0, 7.5, 7.0, 6.5, 6.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $50 + 55\%$ Tổng AD
  - Cấp 2: $80 + 55\%$ Tổng AD
  - Cấp 3: $110 + 55\%$ Tổng AD
  - Cấp 4: $140 + 55\%$ Tổng AD
  - Cấp 5: $170 + 55\%$ Tổng AD
- **Hiệu ứng:** Cào rách da thịt, **làm chậm $35\%$ trong $1.0\text{ giây}$** (`effects: [{ slow: 0.35, duration: 1.0 }]`).

### 2.6. Kỹ Năng R — Mãnh Hổ Tuyệt Sát (`skill_r`)
- **Kiểu ngắm:** Chọn mục tiêu đơn từ xa (Single Target Leap & Pounce Strike).
- **Tầm thi triển & Cự ly vồ (Range & Dash Distance):** `7.0m` (`dash: { distance: 7.0, toward: true }`).
- **Thời gian gồng (Windup):** `0.25s` (Kèm tiếng gầm cảnh báo).
- **Thời gian hồi chiêu (Cooldown):** `[70.0, 60.0, 50.0]s` theo cấp kỹ năng.
- **Tiêu hao:** `0` (Không tiêu hao).
- **Sát thương vật lý:**
  - Cấp 1: $190 + 125\%$ Bonus AD
  - Cấp 2: $290 + 125\%$ Bonus AD
  - Cấp 3: $390 + 125\%$ Bonus AD
- **Hiệu ứng khống chế:** **Làm choáng $0.8\text{ giây}$** mục tiêu chỉ định (`effects: [{ stun: 0.8 }]`).
- **Cơ chế thi triển:** Moka phóng bổng lên không trung, lao vụt $7.0\text{m}$ đè sập mục tiêu xuống đất và cắn ngập đôi răng kiếm vào yếu huyệt.

### 2.7. Tốc Biến Lướt Toàn Game — Universal Dash (`dash_d`)
- **Cơ chế:** Phím **D** kích hoạt cú chồm lướt dã thú $4.5\text{m}$ theo hướng di chuyển. Thời gian hồi $12.0\text{s}$. Dùng để vượt địa hình mỏng hoặc thoát khỏi vùng nguy hiểm.

---

## 3. Quy Tắc Mục Tiêu & Các Trường Hợp Biên (Target Rules & Edge Cases)

1. **Quy tắc mục tiêu:**
   - **Tướng địch:** Nhận toàn bộ sát thương, đánh dấu bào tử lộ diện của Q, làm chậm của E và choáng của R.
   - **Lính & Quái rừng:** Q bắn trúng quái rừng lớn vẫn để lại dấu bào tử $4.0\text{s}$, cho phép Moka vồ mồi farm rừng siêu tốc; E cào lan dọn dẹp bãi quái nhỏ. Chiêu R chỉ có thể nhắm vào tướng địch hoặc quái khủng (Rồng/Baron).
   - **Công trình (Trụ):** Đòn đánh thường vào trụ **KHÔNG kích hoạt cú vồ nội tại hay bonus AD**; các kỹ năng Q/E/R không tác dụng lên trụ.
2. **Các trường hợp biên (Edge Cases):**
   - *Mục tiêu thanh tẩy (Cleanse) bào tử:* Nếu mục tiêu dùng kỹ năng hoặc trang bị hóa giải debuff xóa bỏ Bào Tử của Q, Moka mất ngay lập tức khả năng vồ mồi tầm xa của nội tại.
   - *Cú vồ R bị ngắt trên đường bay:* Nếu Moka đang bay vồ trên không trung mà bị dính khống chế cứng dạng hất tung (Knockup) hoặc làm choáng (Stun), cú vồ bị chặn lại ngay tại vị trí va chạm, sát thương R không kích hoạt và chiêu thức tính đủ thời gian hồi.
