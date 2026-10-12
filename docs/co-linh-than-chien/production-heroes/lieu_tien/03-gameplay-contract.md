# 03 · Gameplay Contract — #40 Liễu Tiễn (Băng Cung Chiến Thuật)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#40 / lieu_tien`  
**Vai trò chuẩn hóa:** Xạ Thủ (Marksman) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

*Trích xuất từ `tools/sim/candidates/lieu_tien.yml` (Tuning: `hp: 0.96`, `dmg: 1.02`)*

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 610 | +86 / cấp | 1,814 |
| **Nội năng (Mana)** | 320 | +35 / cấp | 810 |
| **Sát thương vật lý (AD)** | 60 | +3.6 / cấp | 110.4 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 28 | +3.2 / cấp | 72.8 |
| **Kháng phép (MR)** | 30 | +1.2 / cấp | 46.8 |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.67 đòn/s | +0.024 / cấp | 1.006 đòn/s |
| **Hồi máu (HP Regen)** | 1.4 HP/s | +0.12 / cấp | 3.08 HP/s |
| **Hồi nội năng (Mana Regen)** | 1.5 Mana/s | +0.12 / cấp | 3.18 Mana/s |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack`
- **Kiểu tác động:** Đạn đạo tầm xa đơn mục tiêu (`aim: projectile`).
- **Tầm bắn (Range):** `7.2m`.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý).
- **Tốc độ bay của mũi tên (Projectile Speed):** `32 m/s`.
- **Độ trễ ra đòn (Attack Windup):** $0.15\text{s}$.
- **Quy tắc đòn đánh:** Không áp dụng làm chậm mặc định. Là nguồn kích hoạt tích lũy bộ đếm số đòn bắn của nội tại `frost_trail`.

### 2.2. Nội Tại — Vệt Sương Băng Rút Lui (`passive: frost_trail`)
- **Nguyên lý kích hoạt:**
  - *Cơ chế 1 (Đếm đòn bắn):* Cứ sau mỗi **3 phát bắn thường trúng đích** (`shotsPerTrail: 3`), một Vệt Sương Băng tự động sinh ra tại vị trí chân của Liễu Tiễn.
  - *Cơ chế 2 (Vừa bắn vừa lùi):* Khi Liễu Tiễn thực hiện lệnh di chuyển lùi trong khi đang tấn công tướng địch (kiting), vệt băng được dệt liên tục dọc theo vector di chuyển (khoảng cách tối thiểu giữa 2 lần rải tự nhiên là $1.0\text{s}$).
- **Thuộc tính Vệt Băng (Trail Zone):**
  - **Bán kính (Radius):** `2.2m` (`trailRadius: 2.2`).
  - **Thời gian tồn tại (Duration):** `3.0s` (`trailDuration: 3.0`).
  - **Hiệu ứng đồng minh:** Tăng **$+20\%$ Tốc độ di chuyển** (`trailSpeedBoost: 0.20`) cho Liễu Tiễn và toàn bộ tướng đồng minh đứng trong vệt.
  - **Hiệu ứng kẻ địch:** Giảm **$25\%$ Tốc độ di chuyển** (`trailSlowRatio: 0.25`) đối với mọi kẻ địch dẫm vào.
  - **Va chạm (Collision):** Hoàn toàn **KHÔNG CÓ va chạm vật lý** (`collide: false`). Không cản trở đường đi của lính, quái rừng hay xe công thành.

### 2.3. Kỹ Năng Q — Băng Tiễn Xuyên Kích (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line).
- **Chiều rộng đường đạn (Width):** `1.3m`.
- **Tốc độ bay (Speed):** `36 m/s`.
- **Tầm xa (Range):** `10.0m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s` theo cấp kỹ năng.
- **Tiêu hao nội năng (Cost):** `[40, 45, 50, 55, 60] Mana`.
- **Sát thương vật lý:**
  - Cấp 1: $65 + 85\%$ Bonus AD
  - Cấp 2: $105 + 85\%$ Bonus AD
  - Cấp 3: $145 + 85\%$ Bonus AD
  - Cấp 4: $185 + 85\%$ Bonus AD
  - Cấp 5: $225 + 85\%$ Bonus AD
- **Hiệu ứng phụ:** Làm chậm mục tiêu trúng đòn **$20\%$ trong $1.0\text{s}$**. Xuyên qua lính nhưng giảm $15\%$ sát thương cho mỗi đơn vị lính đi qua (tối đa giảm $30\%$).

### 2.4. Kỹ Năng W — Sương Băng Thối Bộ (`skill_w`, legacy `rmb`)
- **Kiểu ngắm:** Tự niệm / Lùi bước phòng ngự (`aim: self`).
- **Thời gian niệm (Windup):** `0s` (Kích hoạt tức thời).
- **Thời gian hồi chiêu (Cooldown):** `[13.0, 12.0, 11.0, 10.0, 9.0]s`.
- **Tiêu hao nội năng (Cost):** `50 Mana` ở mọi cấp.
- **Hiệu ứng kỹ năng:**
  - **Tạo khiên bảo hộ:** Nhận một lớp khiên băng hấp thụ sát thương tồn tại trong $2.5\text{s}$:
    - Cấp 1: $60\text{ HP}$
    - Cấp 2: $90\text{ HP}$
    - Cấp 3: $120\text{ HP}$
    - Cấp 4: $150\text{ HP}$
    - Cấp 5: $180\text{ HP}$
  - **Tạo Đại Vệt Băng (Empowered Frost Trail):** Ngay lập tức rải một Vệt Sương Băng lớn tại vị trí chân với bán kính mở rộng **$2.5\text{m}$**, tồn tại trong **$3.5\text{s}$**, tăng tốc đồng minh **$+25\%$** và làm chậm kẻ địch **$30\%$**.
  - **Bước lùi vi mô:** Liễu Tiễn giật lùi nhẹ một khoảng $1.5\text{m}$ ngược hướng ngắm bắn để nới rộng khoảng cách.

### 2.5. Kỹ Năng E — Băng Lạc Vũ (`skill_e`)
- **Kiểu ngắm:** Vùng chỉ định tầm xa (Targeted Area Circle).
- **Bán kính vùng nổ (Radius):** `3.5m`.
- **Tầm thi triển (Range):** `8.5m`.
- **Độ trễ rơi (Delay):** `0.3s`.
- **Thời gian gồng (Windup):** `0.2s`.
- **Thời gian hồi chiêu (Cooldown):** `[12.0, 11.0, 10.0, 9.0, 8.0]s`.
- **Tiêu hao nội năng (Cost):** `[60, 65, 70, 75, 80] Mana`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 50\%$ AD
  - Cấp 2: $80 + 50\%$ AD
  - Cấp 3: $110 + 50\%$ AD
  - Cấp 4: $140 + 50\%$ AD
  - Cấp 5: $170 + 50\%$ AD
- **Hiệu ứng phụ:** Bão tên rơi làm chậm toàn bộ kẻ địch trong vùng **$35\%$ trong $1.5\text{s}$**.

### 2.6. Chiêu Cuối R — Cực Băng Đại Tiễn (`skill_r`, Ultimate)
- **Kiểu ngắm:** Định hướng tầm cực xa (Long-range Skillshot).
- **Chiều rộng đường đạn (Width):** `1.8m`.
- **Tốc độ bay (Speed):** `30 m/s`.
- **Tầm bắn tối đa (Range):** `18.0m`.
- **Thời gian gồng (Windup):** `0.4s`.
- **Quy tắc xuyên lính (Pass Minions):** `true` (Đi xuyên qua toàn bộ lính và quái rừng thường, chỉ dừng lại khi va chạm tướng địch đầu tiên).
- **Thời gian hồi chiêu (Cooldown):** `[80, 70, 60]s` theo cấp kỹ năng (Cấp 6 / 11 / 15).
- **Tiêu hao nội năng (Cost):** `100 Mana` ở mọi cấp.
- **Sát thương vật lý:**
  - Cấp 1: $180 + 100\%$ Bonus AD
  - Cấp 2: $280 + 100\%$ Bonus AD
  - Cấp 3: $380 + 100\%$ Bonus AD
- **Hiệu ứng khống chế chính:** Gây **Choáng (Stun) $1.0\text{s}$** lên tướng địch đầu tiên bị trúng tên.
- **Vùng Bão Tuyết Hội Tụ (Glacial Convergence):** Khi đại tiễn găm trúng tướng, bộc phát một vụ nổ băng giá bán kính **$4.5\text{m}$**, gây thêm $50\%$ sát thương chiêu và làm chậm $50\%$ toàn bộ kẻ địch xung quanh trong $2.0\text{s}$.

### 2.7. Universal Dash — Phím D (`universal_dash`)
- Tuân thủ nghiêm ngặt Tài liệu 91: Hành động né chung toàn game.
- Tiêu hao thanh thể lực chung, lướt cự ly chuẩn $4.5\text{m}$, có $0.2\text{s}$ i-frame né tránh sát thương. Không cộng dồn và không bị ảnh hưởng bởi kỹ năng W của Liễu Tiễn.

---

## 3. Quy Tắc Ưu Tiên Mục Tiêu & Tương Tác Bot AI

- **Ưu tiên mục tiêu của đòn đánh thường:**
  1. Tướng địch đang dính dấu ấn làm chậm hoặc đang ở gần Liễu Tiễn nhất trong tầm $7.2\text{m}$.
  2. Lính địch sắp chết (Last-hit priority).
  3. Trụ hoặc công trình đối phương.
- **Logic ra chiêu của Bot AI:**
  - Bot dùng Q để cấu rỉa lính và tướng địch khi khoảng cách từ $6.0\text{m} - 9.0\text{m}$.
  - Khi khoảng cách tới tướng địch $< 4.0\text{m}$, Bot lập tức bấm W nhận khiên và kích hoạt lệnh lùi bước (retreat step).
  - Khi có giao tranh cụm $\ge 2$ kẻ địch, Bot ưu tiên thả E vào tâm điểm.
  - Bot ngắm R vào tướng địch đang bị khống chế hoặc đang đứng yên biến về.

---

## 4. Các Trường Hợp Biên & Tương Tác Trạng Thái (Edge Cases)

1. **Vệt băng và Tường địa hình:** Vệt băng được rải trên mặt phẳng điều hướng (NavMesh). Nếu Liễu Tiễn đứng sát vách đá dệt băng, vùng vệt băng sẽ chỉ sinh ra trên bề mặt đất đi được, không tràn qua vách núi.
2. **Kháng làm chậm & Miễn nhiễm khống chế:** Các tướng có hiệu ứng Miễn nhiễm làm chậm (như chiêu chạy của tướng đặc thù) khi dẫm vào vệt băng sẽ không bị giảm tốc độ, nhưng Liễu Tiễn vẫn nhận trọn vẹn $+20\%$ tốc chạy của mình.
3. **Ngắt chiêu (Interruption):** Chiêu R có $0.4\text{s}$ windup. Nếu Liễu Tiễn bị Choáng (Stun), Hất văng (Knockup) hoặc Câm lặng trong $0.4\text{s}$ này, chiêu R sẽ bị hủy bỏ và kích hoạt thời gian hồi chiêu gián đoạn $5.0\text{s}$.
4. **Cleanse (Thanh tẩy):** Tướng địch trúng R có thể dùng phép bổ trợ Thanh tẩy để xóa bỏ $1.0\text{s}$ choáng, nhưng vùng bão tuyết $4.5\text{m}$ dưới chân vẫn tiếp tục làm chậm nếu họ không di chuyển ra ngoài.
