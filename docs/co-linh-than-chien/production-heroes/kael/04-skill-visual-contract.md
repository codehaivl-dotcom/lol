# 04 · Skill Visual Contract — #39 Kael (Cuồng Đao)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#39 / kael`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Song Đao Huyết Thạch Cổ Linh (Twin Bloodstone Sabers).
- **Dạng tác động:** Cận chiến chém xé đan chéo (Melee Slashing).
- **Animation:** Chém liên hoàn luân phiên tay phải (nhát chém chéo xuống) rồi tay trái (nhát chém ngang hất lên). Khi đạt 5 tầng Cuồng Nhịp, Kael chuyển sang tư thế chém đan chữ X liên hồi cực nhanh.
- **Thời điểm trúng đòn (HIT frame):** Tại giây $0.10\text{s}$ (đao phải) và $0.18\text{s}$ (đao trái).
- **Vệt chuyển động (Weapon Trail):** Hai dải vệt chém mỏng màu đỏ thạch anh sẫm bám sát theo đường lưỡi đao. Khi ở 5 tầng Cuồng Nhịp, vệt chém lóe sáng rực rỡ hơn kèm các hạt tinh thể đỏ văng nhẹ.
- **SFX:** Tiếng "XẸT… XẸT" kim khí sắc bén chém rách không khí, kèm âm thanh va đập giòn tan khi chạm giáp.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Cuồng Trảm Lướt (`skill_q`)
1. **Cast targeting:** Dải thẳng định hướng theo hướng trỏ chuột (Skillshot Dash Line).
2. **Preview khi giữ nút:** Dải mũi tên lướt màu đỏ trong suốt dài 6.5m, rộng 1.4m trên mặt đất.
3. **Telegraph trước khi tác động:** Kael chùng gối hạ thấp người trong 0.1s; hai lưỡi đao bắt chéo sau lưng lóe ánh sáng đỏ.
4. **VFX thái & chất liệu:** Kael lướt vút về phía trước để lại vệt bóng mờ (After-image) màu đỏ thẫm kéo dài; đường lướt cắt qua mục tiêu tạo ra hai vệt chém chéo chữ X phát sáng trên ngực đối thủ.
5. **Hit geometry server:** Khối hộp va chạm di động kích thước dài 6.5m $\times$ rộng 1.4m.
6. **Collision:** Lướt xuyên qua lính và tướng địch; không đi xuyên qua tường địa hình dày.
7. **Lifetime:** Hoàn tất hành trình lướt trong 0.25s.
8. **Damage/CC:** Gây sát thương vật lý ngay khi va chạm với mục tiêu trên đường lướt.

### 2.2. Kỹ Năng W — Song Đao Toái Kích (`skill_w`)
1. **Cast targeting:** Diện rộng bán nguyệt quanh người (PBAoE Cone/Circle).
2. **Preview:** Vòng cung bán nguyệt bán kính 3.2m phía trước và quanh thân.
3. **Telegraph:** Kael vung hai tay ra sau trong 0.15s; hai lưỡi đao rít lên tiếng kim loại cọ xát.
4. **VFX thái & chất liệu:** Hai vòng chém kép hình trăng khuyết màu đỏ thạch anh quét liên tiếp $360^\circ$ quanh người; các mảnh vụn tinh thể đỏ vỡ tung ra rìa ngoài của vòng chém.
5. **Hit geometry:** Hình trụ tròn bán kính 3.2m quanh tâm nhân vật.
6. **Collision:** Xuyên qua toàn bộ đơn vị trong bán kính.
7. **Lifetime:** 2 nhịp chém diễn ra trong tổng cộng 0.3s.
8. **Damage/CC:** Nhịp 1 gây sát thương tại $0.1\text{s}$, Nhịp 2 gây sát thương và áp dụng làm chậm 25% tại $0.22\text{s}$.

### 2.3. Kỹ Năng E — Kích Thích Huyết Mạch (`skill_e`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Vòng hào quang đỏ mờ quanh thân.
3. **Telegraph:** 0s gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Một luồng khí huyết màu đỏ tươi bốc lên từ chân Kael, tạo thành lớp khiên tinh thể năng lượng đỏ dạng mai rùa mỏng bao bọc quanh thân thể.
5. **Hit geometry:** Khối cầu bảo vệ bán kính 1.1m quanh tâm nhân vật.
6. **Collision:** Không có va chạm vật lý; chỉ hấp thụ sát thương.
7. **Lifetime:** 2.5 giây hoặc biến mất khi lượng khiên bị tiêu hao hết.
8. **Damage/CC:** Không gây sát thương; hấp thụ lượng sát thương tương ứng.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Huyết Cuồng Phong Ma (Chuẩn Tài Liệu 79)

```
R · Huyết Cuồng Phong Ma · kael
fantasy:        Kael lướt vút vào tâm giao tranh, biến thành một cơn lốc xoay đao cuồng bạo chém 3 nhát liên hoàn xé toạc không gian xung quanh.
kit:            aim: area | range: 4.5m | dash: 4.5m | radius: 4.0m | hits: 3 | delay: 0.2s | windup: 0.2s | slow: 30% | physical damage
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.2s): Kael gầm lên, hai lưỡi đao bùng cháy ngọn lửa huyết thạch đỏ rực, cơ thể lao vút tới điểm chọn cự ly 4.5m.
  - Pha 2 (Multi-beat Spin t=0.2–0.6s): Tại tâm chấn, Kael xoay tròn thân thể tung ra 3 vòng chém bão táp liên tiếp:
      * Nhịp 1 (t=0.25s): Vòng chém ngang bán kính 4.0m, tiếng đao chém rách gió.
      * Nhịp 2 (t=0.40s): Vòng chém chéo góc 45°, vệt đỏ đậm đặc hơn, mảnh tinh thể văng mạnh.
      * Nhịp 3 (t=0.55s): Đỉnh điểm, Kael đập chéo hai đao xuống đất tạo vụ nổ sóng xung kích huyết thạch đỏ chói.
  - Pha 3 (Signature Structure t=0.4–0.6s): Cơn lốc bão đao hình phễu huyết thạch xoay tít cao 2.5m, nhận diện rõ ràng từ camera MOBA.
  - Pha 4 (Impact Đỉnh t=0.55–0.65s): Mặt đất nứt thành hình hoa văn song đao phát sáng; toàn bộ nạn nhân bị làm chậm 30% kèm hiệu ứng vết chém máu rỉ trên ngực.
  - Pha 5 (Decay / End t=0.65–1.0s): Bão đao tan thành làn khói đỏ mỏng, Kael đáp đất trong tư thế song đao bắt chéo thủ thế.
hitbox:         Hình tròn bán kính 4.0m quanh điểm rơi; mỗi nhịp chém gây sát thương độc lập cho toàn bộ kẻ địch bên trong.
animation:      Clip riêng `kael_r_storm`: Chuyển động lướt xoay thân thể 3 vòng trên không trung, trọng tâm hạ thấp khi tiếp đất.
VFX layers:     Layer lao tới (vệt đỏ kéo dài) -> Layer bão đao (lốc xoáy tinh thể 3 nhịp) -> Layer chấn động mặt đất -> Layer khói tan.
SFX:            Tiếng đao rít dồn dập -> 3 tiếng chém bão "XOẸT - XOẸT - ROẸT" dồn dập tăng dần âm lượng -> Tiếng nổ sóng xung kích trầm đục.
material:       Mesh hạt tinh thể huyết thạch kết hợp shader vệt sáng đỏ rực chuyển động nhanh (Additive Trail).
camera read:    Độ đọc hoàn hảo ở camera MOBA; không che khuất nhân vật lân cận; hiệu ứng bão đao tập trung dưới chân và ngang thân.
performance:    Số hạt phát tán tối đa 24 particles/nhịp; bảo đảm mượt mà không tụt FPS trong combat tổng.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
