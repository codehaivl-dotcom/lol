# 04 · Skill Visual Contract — #34 Jeli (Sóng Chuông Hộ Vệ & Hồi Phục)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#34 / jeli`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Quả chuông nước Cổ Linh (Water Chime Relic) rung động trong khoang sứa.
- **Dạng tác động:** Đạn đạo sóng nước phát quang tầm xa (Ranged Hydro-Acoustic Projectile).
- **Animation cử động:** Vòm chuông sứa co lại nhẹ nhàng trong $0.16\text{s}$, lõi chuông phát sáng và rung chuyển, sau đó vòm sứa nở bung ra đẩy giọt nước bắn về phía trước.
- **Thời điểm phóng đạn (Release Frame):** Tại giây $0.16\text{s}$ của animation đòn đánh.
- **Hình thái đạn đạo (Projectile VFX):** Một giọt nước tinh khiết hình thoi phát quang màu xanh ngọc bích (aquatic cyan-emerald), đường kính $0.35\text{m}$, bay với tốc độ $22\text{m/s}$. Đuôi đạn để lại vệt bọt khí mỏng và gợn sóng âm lăn tăn.
- **Điểm tiếp xúc & Phản hồi va chạm (Impact Feedback):** Khi chạm mục tiêu, giọt nước vỡ tan thành những tia bọt nước li ti kèm vòng gợn sóng nhỏ $0.6\text{m}$, số sát thương vật lý nảy mỏng gọn gàng.
- **SFX:** Tiếng chuông gió thủy tinh gõ nhẹ "KENG..." thanh mảnh khi phóng đạn và tiếng "TÕM" nước vỡ êm ái khi chạm mục tiêu. Tuyệt đối không có tiếng nổ gắt gỏng.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Sóng Chuông Cộng Hưởng (`passive: chime_resonance`)
1. **Cast targeting:** Tự động phát xung theo chu kỳ $3.5\text{s}$ (Passive Periodic Pulse).
2. **Preview khi giữ nút:** Không có (nội tại tự động).
3. **Telegraph trước khi tác động:** Tại giây thứ $3.3$ (trước khi phát xung $0.2\text{s}$), vòm sứa phát sáng rực rỡ từ tâm, quả chuông bên trong rung lên với âm thanh ngân dài chuẩn bị bùng nổ.
4. **VFX thái & chất liệu:** Một vòng sóng âm nước mỏng màu xanh ngọc bích (Cyan Jade Ring) lan tỏa từ tâm Jeli ra bán kính $6.0\text{m}$. Khi chạm đồng minh yếu máu nhất: một cột nước xoáy nhẹ dâng lên dưới chân đồng minh, ngưng tụ thành một lớp màng bảo hộ trong suốt hình vòm chuông mỏng tồn tại $2.5\text{s}$.
5. **Hit geometry server:** Quét hình cầu bán kính $6.0\text{m}$ quanh Jeli.
6. **Collision:** Đi xuyên mọi vật cản và địa hình, không chặn đạn hay người.
7. **Lifetime:** Sóng âm lan tỏa trong $0.4\text{s}$; màng khiên tồn tại $2.5\text{s}$.
8. **Damage/CC/Buff:** Hồi phục $35 + 0.3\text{AP}$ và cấp khiên $25 + 0.2\text{AP}$ ngay khi sóng âm chạm mục tiêu.

### 2.2. Kỹ Năng Q — Thủy Ba Chấn Động (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line).
2. **Preview khi giữ nút:** Dải chỉ thị đường thẳng màu xanh lam ngọc trong suốt trên mặt đất, chiều dài $8.5\text{m}$, bề rộng $1.6\text{m}$.
3. **Telegraph trước khi tác động:** Jeli ngả người về phía sau trong $0.15\text{s}$, tích tụ một quả cầu bọt nước xoáy lớn ở phía trước miệng vòm sứa.
4. **VFX thái & chất liệu:** Quả cầu nước phát quang khổng lồ (đường kính $1.6\text{m}$) bay chậm chạp theo đường thẳng ($24\text{m/s}$), bên trong quả cầu có các vòng âm ba xoay tít, để lại vệt nước ẩm ướt trên mặt đất. Khi trúng mục tiêu, quả cầu nổ tung thành một vụ nổ bọt nước ẩm ướt kèm các bọt khí nổi bồng bềnh.
5. **Hit geometry server:** Khối trụ tròn di chuyển theo véc-tơ hướng (Capsule Sweep), bán kính $0.8\text{m}$ (bề rộng $1.6\text{m}$), chiều dài hành trình $8.5\text{m}$.
6. **Collision:** Va chạm với tướng hoặc lính đầu tiên trúng phải; không xuyên qua mục tiêu.
7. **Lifetime:** Bay tối đa $0.35\text{s}$ hoặc phát nổ khi va chạm.
8. **Damage/CC/Buff:** Gây sát thương phép và áp dụng làm chậm $35\%$ trong $1.5\text{s}$ lên các mục tiêu trong bán kính nổ $1.2\text{m}$.

### 2.3. Kỹ Năng W — Chuông Nước Hộ Thể (`skill_w`)
1. **Cast targeting:** Tự niệm diện rộng tức thời (Self-Centered PBAoE Aura).
2. **Preview khi giữ nút:** Vòng tròn đường biên màu xanh ngọc bích bán kính $6.0\text{m}$ hiển thị quanh chân Jeli.
3. **Telegraph trước khi tác động:** $0\text{s}$ windup (Kích hoạt tức thì, không có độ trễ báo trước).
4. **VFX thái & chất liệu:** Quả chuông trong người Jeli rung mạnh phát ra tiếng ngân "BOOONG...", lập tức tạo ra một vòm lồng nước trong suốt hình chuông khổng lồ bao trùm cả vùng bán kính $6.0\text{m}$ trong $0.3\text{s}$. Toàn bộ đồng minh bên trong được bao bọc bởi một lớp khiên vòm ngọc bích có hoa văn gợn sóng nước xoay tròn quanh người, kèm theo hiệu ứng các giọt nước phát sáng dâng lên từ bàn chân biểu thị hồi máu.
5. **Hit geometry server:** Hình trụ tròn bán kính $6.0\text{m}$, chiều cao $3.0\text{m}$ quanh Jeli tại thời điểm bấm nút.
6. **Collision:** Không có collision vật lý (đồng minh và địch di chuyển tự do qua lại, không chặn đạn đạo).
7. **Lifetime:** Vòm nước xuất hiện $0.3\text{s}$; khiên trên từng tướng đồng minh tồn tại trong $3.0\text{s}$.
8. **Damage/CC/Buff:** Lập tức hồi máu ($40 - 140 + 0.25\text{AP}$) và cấp khiên ($60 - 180$) cho bản thân và toàn bộ đồng minh trong vùng.

### 2.4. Kỹ Năng E — Thủy Luân Âm Vực (`skill_e`)
1. **Cast targeting:** Tỏa tròn quanh thân (Area PBAoE).
2. **Preview khi giữ nút:** Vòng tròn bán kính $4.2\text{m}$ quanh chân Jeli.
3. **Telegraph trước khi tác động:** Jeli xoay nhẹ vòm sứa $180^\circ$ trong $0.1\text{s}$, các dải xúc tu xòe rộng ra xung quanh.
4. **VFX thái & chất liệu:** Các xúc tu quất một vòng xoáy nước $360^\circ$ quanh người, tạo thành một đĩa sóng âm nước ngọc bích cắt ngang mặt đất bán kính $4.2\text{m}$. Vành ngoài của đĩa sóng âm nổi bọt khí cuồn cuộn làm biến dạng thị giác không khí (distortion shader).
5. **Hit geometry server:** Hình trụ tròn bán kính $4.2\text{m}$, chiều cao $1.8\text{m}$ quanh tâm Jeli.
6. **Collision:** Đi xuyên đơn vị, không cản trở di chuyển vật lý.
7. **Lifetime:** Quét hoàn tất trong $0.25\text{s}$.
8. **Damage/CC/Buff:** Gây sát thương phép và áp dụng làm chậm $30\%$ trong $1.2\text{s}$ lên tất cả kẻ địch trúng đĩa sóng âm.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Đại Triều Thánh Chuông (Chuẩn Tài Liệu 79)

```
R · Đại Triều Thánh Chuông (Grand Chime Tide) · jeli
fantasy:        Jeli thăng hoa bay vút lên cao, biến thành Đại Thánh Chuông ngọc bích phát quang rực rỡ, phát ra ba hồi chuông thánh âm đại hồi phục và bao bọc toàn quân trong kết giới thủy triều bảo hộ bất khả xâm phạm.
kit:            aim: area | range: 0 | radius: 6.5m | windup: 0.25s | delay: 0.2s | slow: 0.35 (2.0s) | magic damage + grand heal + grand shield (3.5s)
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.25s): Jeli co cụm xúc tu, vòm sứa phát quang ngọc bích cực sáng, hút các dòng thủy lưu từ mặt đất bay bổng lên cao 1.5m so với bình thường.
  - Pha 2 (Duy trì / Multi-beat t=0.25–0.45s): Quả chuông tâm linh phóng đại thành hình bóng Đại Cổ Chuông khổng lồ bằng nước và gốm ngọc bán trong suốt, xoay chậm trên đỉnh đầu Jeli, phát ra âm thanh ngân nga dồn dập tầng tầng lớp lớp.
  - Pha 3 (Signature Structure t=0.45s): Một mặt trận thủy triều tròn đường kính 13m (bán kính 6.5m) bừng sáng dưới đất, bề mặt khắc họa phù điêu sóng nước Cửu Mạch và hoa văn chuông ngọc Cổ Linh xoay tròn phát quang sinh học rực rỡ.
  - Pha 4 (Impact Đỉnh t=0.45–0.65s): Thánh chuông gióng lên một hồi vang rền "BOOOOOMMMM..." làm rung chuyển màn hình (camera micro-shake). Sóng triều thánh âm quét qua: toàn bộ tướng địch bị phủ lớp nước làm chậm 35% và nhận sát thương phép; toàn bộ đồng minh được tắm trong dòng thác ánh sáng ngọc bích hồi máu cực đại và nhận lớp Khiên Đại Thánh Chuông dày dặn bao bọc quanh người.
  - Pha 5 (Decay / End t=0.65–3.5s): Vòng hoa văn dưới đất lắng đọng thành làn nước trong xanh lấp lánh rồi mờ dần sau 1.0s; lớp Khiên Đại Thánh Chuông trên người các tướng đồng minh duy trì ánh sáng ngọc bích vững chãi trong suốt 3.5s trước khi tan biến nhẹ nhàng.
hitbox:         Hình trụ tròn hoàn hảo bán kính 6.5m, chiều cao 3.5m quanh vị trí Jeli. Toàn bộ đối tượng bên trong đều chịu tác động tức thời tại Pha 4.
animation:      Clip riêng `jeli_r`: Pose thăng hoa bay bổng độc bản; vòm sứa phồng căng cực đại, các xúc tu buông lượn như lụa thần thoại xòe rộng 360°, hai xúc tu chính chắp lại như làm lễ rung chuông.
VFX layers:     
  - Layer mở: Cột nước phát quang hội tụ từ đất dâng lên vòm sứa.
  - Layer duy trì: Hình bóng Đại Cổ Chuông nước khổng lồ 3D lơ lửng trên đầu.
  - Layer signature: Vòng phù điêu sóng nước Cửu Mạch rực rỡ đường kính 13m trên mặt đất.
  - Layer impact: Sóng xung kích thủy triều ngọc bích quét ngang, kèm mưa lân tinh hồi phục trút xuống đồng minh.
  - Layer khiên: Lồng bảo hộ hình vòm chuông ngọc bích vững chãi trên từng đồng minh.
SFX:            
  - Cast: Tiếng nước cuộn sâu thẳm từ đáy biển dâng trào.
  - Nhịp: Tiếng chuông gió ngân dồn dập nhiều cao độ hòa âm.
  - Đỉnh impact: Tiếng đại chuông ngân vang dội cổ kính "BOOOONG..." vang xa khắp bản đồ, kèm tiếng sóng đại triều vỗ bờ hùng vĩ.
  - Tàn âm: Tiếng chuông ngân vang xa kéo dài 2.5s như tiếng vọng trong hang động đá vôi.
material:       Shader thủy tinh ngọc bích trong suốt (Translucent Jade Water Shader) kết hợp hiệu ứng phát quang sinh học (Fresnel Bioluminescence) và PBR decal mặt đất. Tuyệt đối không phải mặt phẳng đơn sắc bệt màu.
camera read:    Cực kỳ ấn tượng và dễ nhận biết từ góc camera MOBA; quầng sáng xanh ngọc sáng rõ ràng báo trước vùng an toàn cho đồng minh và vùng cảnh báo cho địch, nhưng hoàn toàn không che lấp thanh máu, chuột ngắm hay model nhân vật bên trong.
performance:    Số lượng hạt phát quang tối đa 40 particles, shader tối ưu hóa render pass đơn, hỗ trợ 60 FPS ổn định trên cấu hình mobile và PC trong giao tranh 10 người.
status:         PASS_MODEL (Thiết kế hoàn tất chuẩn xác) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
