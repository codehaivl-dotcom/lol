# 03 · Gameplay Contract — #47 Cổ Lỗ (Huyền Quy Thần Cơ Sư)

**Trạng thái:** `CONTRACT_LOCKED / PRODUCTION_READY`  
**Khóa định danh:** `#47 / co_lo`  
**Vai trò chuẩn hóa:** Xạ Thủ Pháo Đài (Siege Artillery / Marksman) | **Hệ thống điều khiển:** Q/W/E/R + D Universal Dash (Chuẩn Doc 91)

---

## 1. Bảng Thông Số Căn Bản & Tăng Trưởng (Base Stats & Growth)

| Chỉ số | Giá trị cấp 1 (Base) | Tăng trưởng mỗi cấp (Growth) | Giá trị tại cấp 15 |
|---|---|---|---|
| **Máu (HP)** | 600 | +82 / cấp | 1,748 |
| **Nội năng / Mana** | 330 | +35 / cấp | 820 |
| **Sát thương vật lý (AD)** | 64 | +4.0 / cấp | 120.0 |
| **Sức mạnh phép thuật (AP)** | 0 | 0 | 0 |
| **Giáp (Armor)** | 28 | +3.2 / cấp | 72.8 (+40 ở thế Cắm Chốt) |
| **Kháng phép (MR)** | 30 | +1.2 / cấp | 46.8 (+40 ở thế Cắm Chốt) |
| **Tốc độ di chuyển (Move Speed)** | 6.1 m/s (Bằng 0 khi Cắm Chốt) | 0 | 6.1 m/s |
| **Tốc độ đánh cơ bản (Attack Speed)** | 0.625 đòn/s | +0.020 / cấp | 0.905 đòn/s |
| **Hồi máu (HP Regen)** | 1.3 HP/s | +0.12 / cấp | 2.98 HP/s |
| **Hồi năng lượng (Mana Regen)** | 1.4 MP/s | +0.12 / cấp | 3.08 MP/s |
| **Tuning hệ số:** | `{ hp: 0.95, dmg: 1.04 }` | (Xạ thủ công thành tầm xa hạng nặng) | |

---

## 2. Đặc Tả Bộ Kỹ Năng Chi Tiết (Full Kit Specifications)

### 2.1. Đánh Thường — `basic_attack` (Tách riêng theo Doc 91)
- **Kiểu tác động:** Đạn đạo tầm xa bắn từ nỏ thần cơ khí đa nòng.
- **Tầm bắn ở Trạng thái Di Động:** `5.5m`.
- **Tầm bắn ở Trạng thái Cắm Chốt (W):** `8.5m` (`siegeRange: 8.5`).
- **VÙNG MÙ CẬN CHIẾN (Chỉ áp dụng khi Cắm Chốt):** Kẻ địch đứng trong bán kính `2.5m` quanh thân (`blindspotRadius: 2.5`) **hoàn toàn không thể bị chọn làm mục tiêu đánh thường**.
- **Sát thương:** $100\%$ Tổng AD (Sát thương vật lý). Mũi tên bắn vào Trụ/Công trình bị giảm $50\%$ sát thương.
- **Vận tốc tên bay:** $32\text{ m/s}$. Độ trễ ra đòn (Windup): $0.15\text{s}$.

### 2.2. Nội Tại — Pháo Đài Mai Rùa (`passive: siege_stance`)
- **Cơ chế 1 — Chuyển Thế Pháo Đài (Fortress Stance):**
  - Khi kích hoạt W, Cổ Lỗ chuyển sang trạng thái pháo đài sau $0.6\text{s}$ cắm chân.
  - Tốc độ di chuyển giảm về $0$ (tự bất động).
  - Tầm bắn đánh thường tăng vọt lên **$8.5\text{m}$**.
  - Nhận thêm **+40 Giáp và +40 Kháng Phép** (`siegeArmorBonus: 40`, `siegeMrBonus: 40`) nhờ lớp mai rùa đồng bảo vệ lưng.
- **Cơ chế 2 — Tử Huyệt Cận Chiến & Giới Hạn Xoay Nòng:**
  - Vùng mù cận chiến bán kính $2.5\text{m}$ quanh thân không thể bắn thường.
  - Tốc độ xoay nòng ngắm (Pivot Rate) bị giới hạn $180^\circ/\text{s}$; khi mục tiêu di chuyển vòng ra sau lưng, nòng nỏ cần thời gian xoay đuổi theo.
  - Sát thương lên công trình bị giảm áp trần $50\%$.

### 2.3. Kỹ Năng Q — Liên Châu Xuyên Kích (`skill_q`)
- **Kiểu ngắm:** Định hướng đường thẳng (Skillshot Line Burst).
- **Chiều rộng đạn đạo (Width):** `1.4m`.
- **Tốc độ đạn (Speed):** `32 m/s`.
- **Tầm xa (Range):** `8.5m`.
- **Số mũi tên liên tiếp (Hits):** `3 mũi tên` (`hits: 3`).
- **Thời gian gồng (Windup):** `0.15s`.
- **Thời gian hồi chiêu (Cooldown):** `[7.0, 6.5, 6.0, 5.5, 5.0]s` theo cấp kỹ năng.
- **Tiêu hao năng lượng:** `[40, 45, 50, 55, 60] MP`.
- **Sát thương mỗi mũi tên:**
  - Cấp 1: $25 + 35\%$ Bonus AD (Tổng 3 mũi: $75 + 105\%$ Bonus AD)
  - Cấp 2: $40 + 35\%$ Bonus AD (Tổng 3 mũi: $120 + 105\%$ Bonus AD)
  - Cấp 3: $55 + 35\%$ Bonus AD (Tổng 3 mũi: $165 + 105\%$ Bonus AD)
  - Cấp 4: $70 + 35\%$ Bonus AD (Tổng 3 mũi: $210 + 105\%$ Bonus AD)
  - Cấp 5: $85 + 35\%$ Bonus AD (Tổng 3 mũi: $255 + 105\%$ Bonus AD)
- **Hiệu ứng đi kèm:** Làm chậm $20\%$ tốc độ di chuyển trong **$1.0\text{ giây}$**.

### 2.4. Kỹ Năng W — Cắm Chốt Huyền Quy (`skill_w`, chuẩn hóa từ candidate YAML `rmb`)
- **Kiểu ngắm:** Tự niệm chuyển dạng (Self Stance Toggle).
- **Thời gian gồng cắm chân (Windup):** `0.6s`.
- **Thời gian gồng thu nỏ (Recast Windup):** `0.4s`.
- **Thời gian hồi chiêu (Cooldown):** `[12.0, 11.0, 10.0, 9.0, 8.0]s`.
- **Tiêu hao năng lượng:** `50 MP`.
- **Lớp lá chắn hấp thụ (Shield khi cắm chốt):**
  - Cấp 1: $70$ điểm (tồn tại $3.0\text{s}$)
  - Cấp 2: $105$ điểm
  - Cấp 3: $140$ điểm
  - Cấp 4: $175$ điểm
  - Cấp 5: $210$ điểm
- **Hiệu ứng chuyển dạng:**
  - Kích hoạt lần 1: Vào trạng thái Cắm Chốt pháo đài (tầm $8.5\text{m}$, $+40$ Giáp/Kháng phép, tốc độ chạy $= 0$).
  - Tái kích hoạt: Nhổ 4 chân cơ khí sau $0.4\text{s}$, khôi phục trạng thái di động cơ bản (tầm $5.5\text{m}$, tốc độ chạy $6.1\text{m/s}$).

### 2.5. Kỹ Năng E — Thần Cơ Kích Thoái (`skill_e`)
- **Kiểu ngắm:** Định hướng đường thẳng cự ly gần (Close-range Skillshot Knockback).
- **Chiều rộng (Width):** `1.5m`.
- **Tốc độ đạn (Speed):** `28 m/s`.
- **Tầm xa (Range):** `5.0m`.
- **Thời gian gồng (Windup):** `0.1s`.
- **Thời gian hồi chiêu (Cooldown):** `[11.0, 10.5, 10.0, 9.5, 9.0]s`.
- **Tiêu hao năng lượng:** `[55, 60, 65, 70, 75] MP`.
- **Sát thương vật lý:**
  - Cấp 1: $50 + 50\%$ Tổng AD
  - Cấp 2: $80 + 50\%$ Tổng AD
  - Cấp 3: $110 + 50\%$ Tổng AD
  - Cấp 4: $140 + 50\%$ Tổng AD
  - Cấp 5: $170 + 50\%$ Tổng AD
- **Hiệu ứng đẩy lùi sống còn:** Bắn mũi tên cọc cơ khí hất văng mục tiêu đầu tiên trúng đòn ra xa **$3.5\text{m}$** (`knockback: 3.5m`) và làm chậm $30\%$ trong $1.2\text{s}$. (Đẩy mục tiêu từ trong vùng mù $2.5\text{m}$ văng ra cự ly an toàn $6.0\text{m}$).

### 2.6. Kỹ Năng R — Vạn Tiễn Quy Tông (`skill_r`, Ultimate)
- **Kiểu ngắm:** Diện rộng chỉ định tầm siêu xa (Long-range Targeted AoE Barrage).
- **Tầm bắn tối đa (Range):** `12.0m` (Nửa màn hình MOBA).
- **Bán kính vùng nổ (Radius):** `4.5m`.
- **Độ trễ phóng & rơi (Windup & Delay):** `0.3s windup` $+ 0.4\text{s delay rơi tiễn}`.
- **Thời gian hồi chiêu (Cooldown):** `[80.0, 70.0, 60.0]s`.
- **Tiêu hao năng lượng:** `100 MP`.
- **Sát thương vật lý:**
  - Cấp 1: $190 + 105\%$ Bonus AD
  - Cấp 2: $290 + 105\%$ Bonus AD
  - Cấp 3: $390 + 105\%$ Bonus AD
- **Hiệu ứng đi kèm:** Làm chậm $40\%$ tốc độ di chuyển của toàn bộ kẻ địch trong vùng nổ trong **$1.5\text{ giây}$**.

### 2.7. Universal Dash — Phím D (Chuẩn Doc 91)
- Lướt né khoảng cách $4.5\text{m}$. Thời gian hồi chiêu 14s.
- **Quy tắc khẩn cấp:** Nếu Cổ Lỗ đang ở trạng thái Cắm Chốt (W) mà người chơi bấm phím **D**, cỗ nỏ sẽ lập tức gãy chốt neo sàn, Cổ Lỗ lướt thoát hiểm ngay lập tức và tự động chuyển về trạng thái di động.

---

## 3. Quy Tắc Tác Động & Xử Lý Tình Huống Giới Hạn (Edge Cases)

1. **Kẻ địch di chuyển xuyên qua vùng mù cận chiến:**
   - Nếu một kẻ địch bắt đầu ở khoảng cách $7.0\text{m}$ và bước vào cự ly $< 2.5\text{m}$, đòn đánh thường đang bay dở vẫn gây sát thương; nhưng đòn đánh thường tiếp theo sẽ không thể khai hỏa vào mục tiêu này cho đến khi mục tiêu bị đẩy ra ngoài cự ly $2.5\text{m}$.
2. **Kỹ năng Q và E không có vùng mù:**
   - Kỹ năng Q (Liên Châu Xuyên Kích) và E (Thần Cơ Kích Thoái) là kỹ năng định hướng bằng tay, **vẫn bắn trúng kẻ địch đứng trong vùng mù cận chiến $2.5\text{m}$**. Đây là công cụ duy nhất để Cổ Lỗ tự giải thoát khi bị áp sát.
3. **Cắm chốt trong bụi rậm:**
   - Khi Cổ Lỗ cắm chốt trong bụi rậm, nếu chưa khai hỏa đòn đánh thường thì tầm nhìn của chàng vẫn được ẩn giấu; ngay khi bắn phát tên đầu tiên, vị trí cắm chốt sẽ bị lộ diện trong $1.5\text{s}$.
