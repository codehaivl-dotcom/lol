# 03 · Gameplay Contract — #45 Triều Bá (Hắc Long Thủy Tộc)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#45 / trieu_ba`  
**Vai trò chuẩn hóa:** Pháp Sư Kiểm Soát (Mage / Controller) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 620 | +84 / cấp | 1,796 |
| **Nội năng / Mana** | 360 | +45 / cấp | 990 |
| **Sát thương vật lý (AD)** | 50 | +2.8 / cấp | 89.2 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 (Tăng từ trang bị pháp sư) |
| **Giáp (Armor)** | 26 | +3.2 / cấp | 70.8 (+36 từ 3 rồng nội tại) |
| **Kháng phép (MR)** | 30 | +1.5 / cấp | 51.0 (+36 từ 3 rồng nội tại) |
| **Tốc độ di chuyển (Move Speed)** | 6.2 m/s | 0 | 6.2 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.64 đòn/s | +0.015 / cấp | 0.850 đòn/s |
| **Hồi máu (HP Regen)** | 1.4 HP/s | +0.13 / cấp | 3.22 HP/s |
| **Hồi năng lượng (Mana Regen)** | 2.0 MP/s | +0.16 / cấp | 4.24 MP/s |
| **Tuning hệ số:** | `{ hp: 0.96, dmg: 1.02 }` | (Pháp sư kiểm soát diện rộng trong simulator) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Đạn đạo tầm xa từ mũi Thủy Thần Kích ba chĩa.
- **Tầm bắn cơ bản:** `6.0m`.
- **Sát thương:** $100\%$ Tổng AD (Vật lý) $+ 20\%$ Tổng AP (Sát thương phép).
- **Vận tốc đạn:** $24\text{ m/s}$. Độ trễ ra đòn (Windup): $0.14\text{s}$.

### 2.2. Nội Tại — Tam Long Xoáy Nước (`passive: orbital_dragons`)
- **Cơ chế 1 — Quả Cầu Rồng Phòng Ngự (Orbital Dragon Armor):**
  - Triều Bá có tối đa **3 con rồng nước đen** (`maxDragons: 3`) xoay quanh thân thể.
  - Mỗi con rồng nước mang lại **+12 Giáp và +12 Kháng phép** (`resistPerDragon: 12`). Khi đủ 3 con rồng, Triều Bá nhận tổng cộng **+36 Giáp và +36 Kháng phép**.
- **Cơ chế 2 — Phóng Rồng & Vệt Nước (Dragon Trail):**
  - Mỗi lần tung chiêu Q, Triều Bá tiêu hao 1 con rồng nước phóng đi và để lại một dải **vệt nước xoáy** (`water_trail`) kéo dài trên mặt đất trong $4.0\text{ giây}$. Kẻ địch đứng trên vệt nước bị làm chậm $25\%$ tốc độ di chuyển (`trailSlow: 0.25`).
- **Cơ chế 3 — Tái Nạp Rồng (Dragon Recharge):**
  - Nếu không thu hồi bằng chiêu W, mỗi con rồng nước tự động hồi lại sau **$4.0\text{ giây}$** (`dragonRecharge: 4.0`). Khi mất hết cả 3 rồng, Triều Bá mất toàn bộ lượng chỉ số phòng thủ cộng thêm.

### 2.3. Kỹ Năng Q — Thủy Long Đạn Đạo (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line Missile).
- **Chiều rộng đạn đạo (Width):** `1.5m`.
- **Tốc độ đạn (Speed):** `26 m/s`.
- **Tầm xa (Range):** `8.5m`.
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `[45, 50, 55, 60, 65] MP`.
- **Sát thương phép:**
  - Cấp 1: $65 + 65\%$ AP
  - Cấp 2: $100 + 65\%$ AP
  - Cấp 3: $135 + 65\%$ AP
  - Cấp 4: $170 + 65\%$ AP
  - Cấp 5: $205 + 65\%$ AP
- **Hiệu ứng đi kèm:** Để lại dải vệt nước ngập sàn làm chậm $25\%$ trong $1.2\text{ giây}$. Tiêu hao 1 rồng nước nội tại.

### 2.4. Kỹ Năng W — Triều Dòng Quy Hồi (`skill_w`, chuẩn hóa từ candidate YAML `rmb`)
- **Kiểu ngắm:** Tự niệm (Self Cast / Global Dragon Recall).
- **Thời gian gồng (Windup):** `0.0s` (Kích hoạt tức thì).
- **Thời gian hồi chiêu (Cooldown):** `[12.0, 11.0, 10.0, 9.0, 8.0]s`.
- **Tiêu hao năng lượng:** `[55, 60, 65, 70, 75] MP`.
- **Lớp lá chắn hấp thụ (Shield):**
  - Cấp 1: $60$ điểm sát thương (tồn tại $2.5\text{s}$)
  - Cấp 2: $95$ điểm
  - Cấp 3: $130$ điểm
  - Cấp 4: $165$ điểm
  - Cấp 5: $200$ điểm
- **Hiệu ứng thu hồi & giật dòng:**
  - Lập tức thu hồi toàn bộ các con rồng nước đã phóng về lại thân mình, hồi đầy 3 rồng nội tại (khôi phục $+36$ Giáp/Kháng phép).
  - Toàn bộ kẻ địch đang đứng trên bất kỳ vệt nước nào bị kéo nhẹ về phía Triều Bá cự ly $2.0\text{m}$ và chịu trạng thái gián đoạn bước di chuyển.

### 2.5. Kỹ Năng E — Thủy Ba Xoáy Ngầm (`skill_e`)
- **Kiểu ngắm:** Diện rộng bùng nổ quanh thân (Point Blank AoE).
- **Bán kính (Radius):** `3.8m`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[10.0, 9.5, 9.0, 8.5, 8.0]s`.
- **Tiêu hao năng lượng:** `[60, 65, 70, 75, 80] MP`.
- **Sát thương phép:**
  - Cấp 1: $50 + 50\%$ AP
  - Cấp 2: $80 + 50\%$ AP
  - Cấp 3: $110 + 50\%$ AP
  - Cấp 4: $140 + 50\%$ AP
  - Cấp 5: $170 + 50\%$ AP
- **Hiệu ứng đi kèm:** Đẩy lùi nhẹ kẻ địch trong phạm vi ra rìa vòng tròn và làm chậm $35\%$ trong $1.5\text{ giây}$.

### 2.6. Kỹ Năng R — Đại Hồng Thủy (`skill_r`, Ultimate)
- **Kiểu ngắm:** Diện rộng định hướng làn đường (Linear Wave AoE).
- **Tầm xa (Range):** `8.0m`.
- **Bán kính chiều rộng đợt sóng (Radius/Width):** `6.5m`.
- **Độ trễ niệm (Windup & Delay):** `0.25s windup` $+ 0.3\text{s delay dâng sóng}`.
- **Thời gian hồi chiêu (Cooldown):** `[80.0, 70.0, 60.0]s`.
- **Tiêu hao năng lượng:** `100 MP`.
- **Sát thương phép:**
  - Cấp 1: $180 + 85\%$ AP
  - Cấp 2: $280 + 85\%$ AP
  - Cấp 3: $380 + 85\%$ AP
- **Hiệu ứng khống chế:** Đẩy lùi toàn bộ kẻ địch theo hướng sóng chảy, làm gián đoạn mọi kỹ năng niệm chú và làm choáng (Stun) trong **$0.8\text{ giây}$**.

### 2.7. Universal Dash — Phím D (Chuẩn Doc 91)
- Lướt né khoảng cách $4.5\text{m}$ trên một gợn sóng nước. Thời gian hồi chiêu 14s. Không tốn năng lượng.

---

## 3. Quy Tắc Tác Động & Xử Lý Tình Huống Giới Hạn (Edge Cases)

1. **Giới hạn số vệt nước tồn tại:** Tối đa 3 vệt nước có thể tồn tại đồng thời trên sàn đấu tương ứng 3 con rồng đã phóng. Nếu tung Q khi đã có 3 vệt nước, vệt nước cũ nhất sẽ biến mất.
2. **Kéo địch qua địa hình:** Hiệu ứng kéo của chiêu W chỉ kéo trên mặt phẳng sàn đấu; nếu kẻ địch đứng sau vách tường dày, kẻ địch sẽ bị kéo đập vào vách tường và dừng lại chứ không bị kéo xuyên tường.
3. **Tương tác ngắt chiêu của Ultimate R:** Đợt sóng Đại Hồng Thủy có thuộc tính hất văng gián đoạn (Knockback Interrupt), ngắt lập tức các kỹ năng vận sức kéo dài của đối thủ (như gảy đàn của Dũng Thạch hoặc nạp nỏ của Cổ Lỗ).
