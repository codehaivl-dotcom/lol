# 04 · Skill Visual Contract — #44 Tản Sơn (Thánh Sơn Cổ Thạch)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#44 / tan_son`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Nắm đấm cự thạch granite bọc tinh thể ngọc bích.
- **Dạng tác động:** Cận chiến cự thạch (Colossus Melee Strike).
- **Animation:** 
  - *Đòn A:* Nện thẳng nắm đấm phải từ trên xuống nứt nhẹ mặt đất.
  - *Đòn B:* Vung tay trái móc ngang từ sườn vào tâm chấn.
- **Thời điểm trúng đòn (HIT frame):** Tại giây $0.16\text{s}$ của hoạt ảnh đòn đánh.
- **Vệt chuyển động (Weapon Trail):** Dải bụi đá xám kết hợp tia sáng ngọc bích mỏng bám theo quỹ đạo nắm đấm.
- **VFX va chạm:** Bụi đất và mảnh vụn granite bắn tung tóe dưới chân mục tiêu.
- **SFX:** Tiếng va đập trầm đục nặng nề "ẦM", âm sắc tảng đá va chạm kim loại hoặc thịt xương.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Sơn Thạch Chấn Kích (`skill_q`)
1. **Cast targeting:** Dải đường thẳng hướng trỏ chuột (Skillshot Line).
2. **Preview khi giữ nút:** Dải chữ nhật bán trong suốt màu nâu đất viền xanh ngọc dài $6.5\text{m}$, rộng $1.6\text{m}$ trên mặt đất.
3. **Telegraph trước khi tác động:** Tản Sơn nhấc cao một chân dậm mạnh xuống đất trong $0.2\text{s}$; các vết nứt bắt đầu phát sáng xanh ngọc từ bàn chân.
4. **VFX trạng thái & chất liệu:** Một chuỗi gai đá ngọc bích nhọn hoắt nhô lên liên tiếp theo đường thẳng, mặt đất nứt toác bốc khói bụi đất cổ xưa.
5. **Hit geometry server:** Khối hộp chữ nhật kích thước dài $6.5\text{m} \times$ rộng $1.6\text{m} \times$ cao $1.8\text{m}$.
6. **Collision:** Xuyên qua toàn bộ đơn vị trên đường đi.
7. **Lifetime:** Sóng địa chấn lan truyền hết quãng đường trong $0.3\text{s}$ (tốc độ $22\text{ m/s}$).
8. **Damage/CC:** Gây sát thương vật lý và làm chậm $35\%$ ngay khi gai đá trồi lên trúng mục tiêu.

### 2.2. Kỹ Năng W — Vách Núi Ngọc Bích (`skill_w`)
1. **Cast targeting:** Vị trí và hướng đặt vách đá (Linear Terrain Vector Placement).
2. **Preview khi giữ nút:** Khối chữ nhật 3D mờ hiển thị trước vị trí vách đá dài $6.0\text{m}$, dày $1.2\text{m}$, cao $2.8\text{m}$.
3. **Telegraph:** Tản Sơn đấm cả hai tay xuống đất trong $0.1\text{s}$; mặt đất rung chuyển dữ dội.
4. **VFX trạng thái & chất liệu:** Một dãy núi đá granite nguyên khối dựng đứng từ lòng đất, bên trên đan xen các khối ngọc bích phát quang xanh thẫm. Đối với đồng minh, vách đá có ánh hào quang ngọc bích bán trong suốt báo hiệu có thể đi xuyên qua. Đối với kẻ địch, bề mặt vách đá là khối đá đặc cứng cáp cản hoàn toàn tầm nhìn và bước đi.
5. **Hit geometry server:** Khối địa hình cản va chạm (Dynamic NavMesh / Collider Obstacle) dài $6.0\text{m} \times$ dày $1.2\text{m} \times$ cao $3.0\text{m}$.
6. **Collision:** Chặn hoàn toàn tướng và đạn đạo của đối phương; cho phép đồng minh đi xuyên qua nhận khiên.
7. **Lifetime:** Tồn tại trong $3.0\text{ giây}$ hoặc vỡ tức thì khi Tản Sơn bấm tái kích hoạt.
8. **Recast VFX:** Khi tái kích hoạt, vách đá nổ tung thành hàng trăm mảnh tinh thạch ngọc bích bắn ra xung quanh, để lại làn sương bụi đá làm chậm kẻ địch.

### 2.3. Kỹ Năng E — Thái Dương Đông Sơn (`skill_e`)
1. **Cast targeting:** Diện rộng quanh thân kết hợp hướng mặt trống đồng (Point Blank AoE / Facing Cone).
2. **Preview khi giữ nút:** Vòng tròn bán kính $4.2\text{m}$ quanh chân Tản Sơn kèm hình nón sáng $90^\circ$ theo hướng quay mặt.
3. **Telegraph:** Mặt trống đồng trên ngực Tản Sơn phát ra âm thanh cộng hưởng "KENG" và tỏa hào quang vàng chói trong $0.15\text{s}$.
4. **VFX trạng thái & chất liệu:** Luồng sáng mặt trời nguyên thủy rực rỡ phóng ra từ lồng ngực, hoa văn chim Lạc và mặt trời 12 cánh của Trống Đồng Đông Sơn in hình rõ nét trên mặt đất và cơ thể các tướng đối diện.
5. **Hit geometry server:** Hình trụ tròn bán kính $4.2\text{m}$, chiều cao $2.5\text{m}$.
6. **Collision:** Tác động tức thì lên toàn bộ đơn vị trong bán kính.
7. **Lifetime:** Vùng sáng bùng nổ trong $0.25\text{s}$, hiệu ứng làm chậm và giảm tốc đánh duy trì $1.5\text{s}$.
8. **Damage/CC:** Sát thương vật lý, làm chậm di chuyển $25\%$ và làm chậm tốc độ đánh $25\%$.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Địa Chấn Cổ Sơn (Chuẩn Tài Liệu 79)

```yaml
R · Địa Chấn Cổ Sơn · tan_son
fantasy:        Tản Sơn dồn toàn bộ trọng lượng ngọn núi linh thiêng, nhảy vọt lên không trung và giáng ầm xuống sàn đấu làm sụp đổ địa tầng, hất tung toàn bộ quân thù trong bán kính chấn động.
kit:            aim: area | range: 5.0m | dash: 5.0m | radius: 5.5m | windup: 0.3s | delay: 0.3s | stun: 1.0s | physical damage
phases:
  - Pha 1 (Cast / Invocation t=0.0–0.3s): Tản Sơn gập người khuỵu gối dồn trọng lượng xuống đất, hai vai ngọc bích phát sáng chói lọi, mặt trống đồng rực lửa cam vàng, mặt đất dưới chân rạn nứt phát ra âm thanh đá cọ sát dữ dội.
  - Pha 2 (Leap / Flight t=0.3–0.6s): Tản Sơn bật nhảy vút lên không trung cao 3.5m lao về vị trí chỉ định; toàn thân hóa thành một khối thiên thạch ngọc bích khổng lồ lao xuống với vệt bụi đá và năng lượng kéo dài.
  - Pha 3 (Signature Structure t=0.6s): Tại điểm tiếp đất, một trận đồ hoa văn Thái Dương Đông Sơn khổng lồ viền ngọc bích bừng sáng trên mặt sàn bán kính 5.5m cảnh báo vùng va chạm nguy hiểm.
  - Pha 4 (Impact Đỉnh t=0.6–0.7s): Tản Sơn nện cả hai nắm đấm và hai chân xuống tâm chấn; mặt đất sụp đổ nổ tung ra các cột đá ngọc bích chọc thẳng lên trời. Toàn bộ kẻ địch trong bán kính 5.5m bị hất tung lên cao và làm choáng 1.0s, nhận 100% sát thương.
  - Pha 5 (Decay / Ground Rupture t=0.7–3.0s): Sóng xung kích tản biến, mặt đất giữ lại các rãnh nứt phát quang ngọc bích mờ trong 2.3 giây trước khi liền lại; Tản Sơn đứng thẳng người uy nghiêm ở tâm chấn.
hitbox:         Hình tròn bán kính 5.5m tại tâm điểm rơi; tác động đồng loạt lên toàn bộ mục tiêu trong phạm vi.
animation:      Clip riêng `tan_son_r`: Khuỵu gối dồn lực -> Bật nhảy trên không vung hai nắm đấm -> Nện đất bùng nổ -> Đứng thẳng sẵn sàng thế võ.
VFX layers:     Layer nứt đất dồn lực -> Layer vệt bay thiên thạch -> Layer trận đồ trống đồng báo trước -> Layer nổ bão đá hất tung -> Layer rãnh địa chấn dư chấn.
SFX:            Tiếng đá nghiền rền vang -> Tiếng rít xé gió khi bay -> Tiếng nổ "ẦM ẦM" long trời lở đất khi tiếp đất -> Tiếng chuông trống đồng ngân vang dư âm.
material:       PBR Shader granite xám cổ kết hợp ngọc bích phát quang emissive và hoa văn trống đồng Đông Sơn vàng rực rỡ.
camera read:    Cực kỳ rõ ràng ở góc camera isometric; vùng báo trước hiện rõ 0.3s cho phép đối thủ nhận diện nguy cơ. Không che khuất tầm nhìn của đồng minh.
performance:    Mảnh đá vỡ tối đa 24 hạt GPU particles, tự tan biến sau 1.0s; tối ưu hóa bảo đảm 60 FPS trong combat 10 tướng.
status:         PASS_MODEL (Thiết kế hoàn tất) / TESTED_SIM (Đã kiểm chứng trong wave3-gameplay-toys.test.mjs).
```
