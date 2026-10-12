# 04 · Skill Visual Contract — #45 Triều Bá (Hắc Long Thủy Tộc)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#45 / trieu_ba`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Thủy Thần Kích ba chĩa bằng san hô đen và ngọc biển sâu.
- **Dạng tác động:** Đạn đạo ma thuật tầm xa (Ranged Hydro Missile).
- **Animation:** Triều Bá giơ kích về phía trước, ba mũi kích lóe sáng lân tinh xanh biển bắn ra tia nước áp lực cao hình ba mũi chĩa.
- **Thời điểm phóng đạn (Cast frame):** Tại giây $0.14\text{s}$ của hoạt ảnh.
- **Vận tốc bay:** $24\text{ m/s}$. Tầm bắn: $6.0\text{m}$.
- **VFX đạn đạo:** Tia nước màu đen tím đậm bọc bọt biển xanh lam xoáy tít trong không khí.
- **VFX trúng đích:** Nước bùng nổ tóe bọt trên người nạn nhân kèm hiệu ứng ướt sàn nhỏ.
- **SFX:** Tiếng rít xé gió của tia nước áp lực cao "XOẸT", âm thanh bọt nước vỡ giòn tan.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Quả Cầu Rồng Nội Tại — Tam Long Xoáy Nước (`passive: orbital_dragons`)
- **VFX mô hình:** 3 chú rồng nước thu nhỏ (dài $0.6\text{m}$ mỗi con) cấu tạo từ nước đen tím trong suốt, mắt phát sáng xanh lam, uốn lượn nhịp nhàng theo quỹ đạo tròn quanh eo Triều Bá (bán kính xoay $0.9\text{m}$).
- **Trạng thái hao hụt:** Khi phóng Q, 1 con rồng tách khỏi quỹ đạo phóng đi, số rồng còn lại tự động giãn đều góc $180^\circ$ (nếu còn 2) hoặc $360^\circ$ (nếu còn 1). Khi hết rồng, vòng xoáy quanh eo biến mất hoàn toàn.

### 2.2. Kỹ Năng Q — Thủy Long Đạn Đạo (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line).
2. **Preview khi giữ nút:** Dải mũi tên nước màu xanh đen bán trong suốt dài $8.5\text{m}$, rộng $1.5\text{m}$ trên mặt đất.
3. **Telegraph trước khi tác động:** Triều Bá vung tay trái, một con rồng nước gầm lên lao vút về phía trước trong $0.15\text{s}$.
4. **VFX trạng thái & chất liệu:** Con rồng nước đen phóng đi với cái đầu rồng mở rộng há miệng đớp mục tiêu, thân rồng kéo dài thành vệt nước xoáy bọt biển ngập trên mặt đất.
5. **Hit geometry server:** Khối trụ nằm ngang kích thước dài $8.5\text{m} \times$ rộng $1.5\text{m}$.
6. **Collision:** Xuyên qua toàn bộ đơn vị trên đường bay.
7. **Lifetime:** Đạn bay hết quãng đường trong $0.32\text{s}$ (tốc độ $26\text{ m/s}$); vệt nước trên sàn tồn tại $4.0\text{ giây}$.
8. **Damage/CC:** Sát thương phép và để lại vệt nước làm chậm $25\%$.

### 2.3. Kỹ Năng W — Triều Dòng Quy Hồi (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Toàn bộ các vệt nước đang tồn tại trên bản đồ phát sáng lân tinh xanh biển rực rỡ.
3. **Telegraph:** Kích hoạt tức thời $0\text{s}$; Triều Bá nắm chặt bàn tay trái.
4. **VFX trạng thái & chất liệu:** Các con rồng nước ở cuối vệt nước hóa thành các luồng xoáy đen tím lao ngược trở lại thân Triều Bá với tốc độ cực nhanh; mặt nước trên vệt nước cuộn sóng giật lùi, kéo theo kẻ địch. Khi rồng chạm vào Triều Bá, một quả cầu bong bóng nước bảo hộ bọc lấy thân mình.
5. **Hit geometry server:** Toàn bộ diện tích các dải vệt nước `water_trail` đang hoạt động.
6. **Collision:** Kéo mọi kẻ địch trên vệt nước $2.0\text{m}$ về hướng Triều Bá.
7. **Lifetime:** Hoàn tất thu hồi trong $0.25\text{s}$; khiên tồn tại $2.5\text{s}$.
8. **SFX:** Tiếng nước rút ầm ầm như thủy triều rút đáy biển, kết thúc bằng tiếng nổ bong bóng nước bảo vệ.

### 2.4. Kỹ Năng E — Thủy Ba Xoáy Ngầm (`skill_e`)
1. **Cast targeting:** Bùng nổ diện rộng quanh thân (Point Blank AoE).
2. **Preview:** Vòng tròn bán kính $3.8\text{m}$ quanh vị trí lơ lửng của Triều Bá.
3. **Telegraph:** Cột nước xoáy dưới chân bùng lên trong $0.1\text{s}$.
4. **VFX trạng thái & chất liệu:** Một cột sóng nước đen xoắn ốc bùng nổ từ dưới đất hất tung ra xung quanh bán kính $3.8\text{m}$, đẩy kẻ địch cận chiến lùi ra mép ngoài của vòng nước.
5. **Hit geometry server:** Khối trụ tròn bán kính $3.8\text{m}$, chiều cao $3.0\text{m}$.
6. **Collision:** Đẩy lùi tức thì các đơn vị trúng đòn.
7. **Lifetime:** Bùng nổ hoàn tất trong $0.2\text{s}$.
8. **Damage/CC:** Sát thương phép, đẩy lùi nhẹ và làm chậm $35\%$ trong $1.5\text{s}$.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Đại Hồng Thủy (Chuẩn Tài Liệu 79)

```yaml
R · Đại Hồng Thủy · trieu_ba
fantasy:        Triều Bá cắm Thủy Thần Kích xuống lòng đất gọi bão tố biển sâu, dâng lên một bức tường sóng thần nước đen khổng lồ quét dọc làn đường, cuốn phăng toàn bộ phòng tuyến quân thù.
kit:            aim: area | range: 8.0m | radius: 6.5m | windup: 0.25s | delay: 0.3s | stun: 0.8s | magic damage | knockback
phases:
  - Pha 1 (Cast / Invocation t=0.0–0.25s): Triều Bá bay vút lên cao 1.0m, hai tay cầm Thủy Thần Kích chĩa ngược xuống dưới, toàn thân bao phủ luồng khí đen tím cuồn cuộn, tiếng sấm bão và tiếng nước biển dâng gầm rú vang trời.
  - Pha 2 (Leap / Strike t=0.25–0.55s): Cắm mạnh mũi kích xuống sàn đấu; một vết nứt thủy vực xé toạc mặt đất, nước đen từ đáy vực sâu phun trào dữ dội.
  - Pha 3 (Signature Structure t=0.55s): Một bức tường sóng thần cao 4.0m, rộng 6.5m hình thành tại vị trí chân kích, đỉnh sóng uốn lượn hình hàm rồng Hắc Long há miệng chực nuốt chửng tất cả.
  - Pha 4 (Impact Đỉnh t=0.55–0.85s): Bức tường sóng thần quét dọc làn đường cự ly 8.0m với sức tàn phá kinh hoàng; toàn bộ kẻ địch trúng đợt sóng bị hất tung và cuốn lùi theo dòng nước, chịu 100% sát thương phép và bị làm choáng 0.8s. Mọi chiêu thức niệm chú bị bẻ gãy hoàn toàn.
  - Pha 5 (Decay / Flooded Terrain t=0.85–3.0s): Sóng thần tan rã thành biển nước ngập tràn lan trên mặt đất, bọt nước đen tím tan biến dần trong 2.15 giây trước khi sàn đấu khô ráo trở lại.
hitbox:         Khối sóng di động hình chữ nhật rộng 6.5m quét dọc 8.0m; tác động toàn bộ đơn vị trên đường quét.
animation:      Clip riêng `trieu_ba_r`: Lơ lửng dâng cao -> Cắm kích xuống đất -> Dang hai tay điều khiển đợt sóng quét tới.
VFX layers:     Layer khí đen tím tích tụ -> Layer vết nứt thủy vực -> Layer sóng thần hàm rồng 3D -> Layer bọt sóng cuộn đẩy lùi -> Layer biển nước ngập tràn.
SFX:            Tiếng bão biển gầm rú rùng rợn -> Tiếng kích cắm phập xuống sàn -> Tiếng sóng thần đổ ầm ầm như vỡ đê -> Tiếng nước dạt êm dần.
material:       Shader nước khúc xạ cao (High-refraction Deluge Water Shader) đen tím với bọt sóng emissive xanh ngọc.
camera read:    Đợt sóng thần trong suốt ở góc camera nhìn xuống, không che khuất hoàn toàn sàn đấu hay thanh máu của tướng.
performance:    Mesh sóng thần biến dạng động tối ưu hóa dưới 12k đa giác, tự hủy sau khi quét xong; duy trì ổn định 60 FPS.
status:         PASS_MODEL (Thiết kế hoàn tất) / TESTED_SIM (Đã kiểm chứng trong wave3-gameplay-toys.test.mjs).
```
