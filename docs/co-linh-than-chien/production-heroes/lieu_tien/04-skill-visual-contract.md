# 04 · Skill Visual Contract — #40 Liễu Tiễn (Băng Cung Chiến Thuật)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#40 / lieu_tien`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Thần Cung Liễu Diệp (Băng Cung Tinh Thạch Cổ Linh).
- **Dạng tác động:** Đạn đạo tầm xa ngưng tụ khí lạnh (Ranged Ice Projectile).
- **Animation:** Tay trái giương cung hướng mục tiêu, tay phải kéo dây cung tạo mũi tên băng ngưng tụ, buông dây với độ giật lùi nhẹ của cánh cung.
- **Thời điểm trúng đòn (HIT frame / Release):** Xuất đạn tại giây $0.12\text{s}$ của animation bắn; đạn bay với tốc độ $32\text{ m/s}$ tới mục tiêu.
- **Hình thái mũi tên (Projectile VFX):** Mũi tên bằng tinh thể băng trong suốt ánh lam ngọc ($0.6\text{m}$ chiều dài), để lại vệt đuôi sương lạnh và các vụn tinh thể tuyết li ti lấp lánh (Ice Mist Trail).
- **SFX:** Tiếng kéo dây cung căng dẻo thanh thoát ("Vút-Keng") và tiếng găm băng sắc lạnh khi chạm mục tiêu.
- **Hit Feedback:** Tại mục tiêu trúng đòn, một cụm tinh thể băng nhỏ vỡ tung (Shatter flash) nhẹ, không che khuất thanh máu.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Vệt Sương Băng Rút Lui (`passive: frost_trail`)
1. **Cast targeting:** Tự động sinh ra tại chân nhân vật theo chu kỳ bắn hoặc di chuyển rút lui.
2. **Preview:** Không có (nội tại kích hoạt tự động theo hành vi).
3. **Telegraph:** Khi đủ 3 phát bắn hoặc lùi bước, gót chân Liễu Tiễn bừng sáng một quầng ánh sáng xanh ngọc lạnh $0.1\text{s}$ trước khi vệt băng trải ra.
4. **VFX hình thái & vật liệu:**
   - Dải decal mặt đất hình oval tròn bán kính $2.2\text{m}$, mặt sàn phủ một lớp băng mỏng trong suốt có vân rạn nứt tinh thể Cổ Linh lấp lánh, khói sương lạnh bốc lên là là mặt đất cao $0.2\text{m}$.
   - *Phân biệt phe (Team Visibility):* Phe đồng minh thấy viền sáng xanh băng dịu mắt kèm mũi tên chỉ hướng tăng tốc mờ; phe địch thấy viền sương giá đục hơn kèm hiệu ứng tuyết rơi làm chậm.
5. **Hit geometry server:** Vùng tròn kiểm tra vị trí (Circle Zone) bán kính $2.2\text{m}$.
6. **Collision:** `collide: false`. Không chặn di chuyển, không chặn đạn đạo.
7. **Lifetime:** Tồn tại chính xác $3.0\text{s}$, sau đó tan biến dần trong $0.5\text{s}$ (Fade out).
8. **Damage/CC:** Áp dụng aura buff $+20\%$ MS cho đồng minh và debuff $-25\%$ slow cho kẻ địch khi ở trong vùng.

### 2.2. Kỹ Năng Q — Băng Tiễn Xuyên Kích (`skill_q`)
1. **Cast targeting:** Dải thẳng theo hướng trỏ chuột (Skillshot Line).
2. **Preview khi giữ nút:** Dải chữ nhật màu xanh băng trong suốt dài $10.0\text{m}$, rộng $1.3\text{m}$ trên mặt đất với mũi tên định hướng nhọn ở đầu.
3. **Telegraph trước khi tác động:** Liễu Tiễn xoay người kéo căng dây cung cực đại trong $0.15\text{s}$; một luồng gió xoáy sương tuyết gom vào mũi tên.
4. **VFX thái & chất liệu:** Một mũi tên tinh thể băng dài $1.5\text{m}$ phát quang rực rỡ lao vút đi với tốc độ $36\text{ m/s}$, để lại một dải sóng xung kích sương giá thẳng tắp trên mặt đất.
5. **Hit geometry server:** Khối va chạm tuyến tính (Line Segment with Width) dài $10.0\text{m}$, rộng $1.3\text{m}$.
6. **Collision:** Xuyên qua toàn bộ lính trên đường bay; gây sát thương lên mọi tướng địch trong dải.
7. **Lifetime:** Mũi tên bay hết tầm $10.0\text{m}$ trong $0.28\text{s}$; vệt sương trên đất tồn tại $0.4\text{s}$ rồi tan.
8. **Damage/CC:** Sát thương vật lý và làm chậm $20\%$ trong $1.0\text{s}$ ngay khi mũi tên chạm mục tiêu.

### 2.3. Kỹ Năng W — Sương Băng Thối Bộ (`skill_w`)
1. **Cast targeting:** Tự niệm / Tự kích hoạt (`aim: self`).
2. **Preview:** Vòng hào quang băng giá mờ quanh chân.
3. **Telegraph:** Kích hoạt tức thì $0\text{s}$ windup.
4. **VFX thái & chất liệu:**
   - Liễu Tiễn đạp mạnh gót chân lướt giật lùi $1.5\text{m}$; tại điểm xuất phát bùng lên một Đại Vệt Băng bán kính $2.5\text{m}$ bốc sương mù dày đặc.
   - Quanh người Liễu Tiễn xuất hiện một lồng khiên băng mỏng kết tinh từ các phiến hoa tuyết lục giác xoay tròn quanh thân thể.
5. **Hit geometry server:** Vùng tròn bán kính $2.5\text{m}$ (Vệt băng) và khiên chắn bọc quanh capsule nhân vật.
6. **Collision:** Không chặn đạn, không cản đường vật lý.
7. **Lifetime:** Khiên tồn tại $2.5\text{s}$ hoặc tới khi vỡ; Đại Vệt Băng tồn tại $3.5\text{s}$.
8. **Damage/CC:** Không gây sát thương; tạo khiên $60-180\text{ HP}$ và làm chậm kẻ thù $30\%$, tăng tốc đồng minh $+25\%$.

### 2.4. Kỹ Năng E — Băng Lạc Vũ (`skill_e`)
1. **Cast targeting:** Vùng tròn chỉ định trong phạm vi $8.5\text{m}$ (Area Target Circle).
2. **Preview khi giữ nút:** Vòng tròn nét đứt màu xanh ngọc bán kính $3.5\text{m}$ tại vị trí trỏ chuột.
3. **Telegraph trước khi tác động:** Liễu Tiễn giương cung bắn một mũi tên chỉ thiên lên trời ($0.2\text{s}$ windup); tại vùng đất chỉ định xuất hiện vòng báo động gió lạnh cuộn xoáy trong $0.3\text{s}$ delay.
4. **VFX thái & chất liệu:** Hàng trăm mũi tên băng nhỏ như những chiếc kim băng trong suốt từ trên trời rơi cắm như mưa rào xuống mặt đất, tạo nên một trận bão tuyết thu nhỏ làm đông cứng mặt sàn.
5. **Hit geometry server:** Hình trụ tròn (Cylinder) tâm điểm chọn, bán kính $3.5\text{m}$, cao $3.0\text{m}$.
6. **Collision:** Đi xuyên đơn vị, không cản trở di chuyển vật lý.
7. **Lifetime:** Mưa tên dội xuống trong $0.6\text{s}$, mặt sàn băng tuyết tồn tại duy trì làm chậm trong $1.5\text{s}$.
8. **Damage/CC:** Gây sát thương vật lý khi loạt tên chạm đất và duy trì làm chậm $35\%$ cho bất kỳ kẻ địch nào đứng trong vùng.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Cực Băng Đại Tiễn (Chuẩn Tài Liệu 79)

```
R · Cực Băng Đại Tiễn (Glacial Convergence Arrow) · lieu_tien
fantasy:        Liễu Tiễn ngưng tụ toàn bộ hàn khí Cổ Linh vào một mũi Thần Tiễn Băng Khổng Lồ, giương cung bắn xuyên qua chiến trường cắm vào tướng địch và kích nổ Vùng Bão Tuyết Hội Tụ chia cắt tiền tuyến.
kit:            aim: skillshot | range: 18.0m | width: 1.8m | speed: 30 m/s | windup: 0.4s | passMinions: true | stun: 1.0s | area slow: 50% radius 4.5m
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.4s): Liễu Tiễn hạ thấp tấn, hai cánh Thần Cung Liễu Diệp bung mở tối đa phát quang chói lọi; hàn khí cuồn cuộn ngưng tụ thành một mũi tên băng khổng lồ dài 3.0m rực sáng xanh ngọc. Âm thanh tiếng gió hú rít dồn dập.
  - Pha 2 (Release & Flight t=0.4–1.0s): Mũi đại tiễn phóng đi với tốc độ 30 m/s, rẽ đôi không khí tạo thành dải sóng xung kích băng giá kéo dài theo đường bay. Đi xuyên qua toàn bộ lính đối phương.
  - Pha 3 (Impact Đỉnh t=va chạm): Găm thẳng vào tướng địch đầu tiên trên đường bay; một chớp sáng băng giá bùng nổ (Freeze Burst Flash), âm thanh "ĐOÀNG-KENG" như tảng băng trôi vỡ nát. Nạn nhân lập tức bị đóng băng cứng ngắc (Stun 1.0s) với khối băng tinh bao bọc thân thể.
  - Pha 4 (Glacial Convergence Structure t=va chạm +0.1s đến 2.0s): Tại điểm va chạm, một Vùng Bão Tuyết Hội Tụ bán kính 4.5m bộc phát với các cột băng nhọn trồi lên mặt đất tạo thành vành đai ranh giới thị giác, gió tuyết xoáy gầm rít làm chậm 50% toàn bộ kẻ địch xung quanh.
  - Pha 5 (Decay / End t=2.0–2.5s): Các cột băng rạn nứt vỡ tan thành bụi tuyết lấp lánh và thăng hoa vào không khí, tầm nhìn giao tranh trở lại bình thường.
hitbox:         Dải bay rộng 1.8m x dài tối đa 18.0m; vùng nổ tiếp xúc hình tròn bán kính 4.5m tại vị trí va chạm tướng.
animation:      Clip riêng 'lieu_tien_r_cast': Dáng đứng bắn cung tối thượng, kéo cung hết cỡ với lực căng toàn thân, độ giật lùi 0.5m khi buông tên, pose giữ thăng bằng uy nghi.
VFX layers:     Mở (quầng tụ khí lạnh quanh cánh cung) · Duy trì (mũi tên khổng lồ & dải băng trên đường bay) · Impact (chớp nổ đóng băng & cột băng trồi dậy) · Kết (tinh thể vỡ vụn). Màu sắc: Cyan #00F0FF + Deep Blue #0A2540 + Pure White #FFFFFF.
SFX:            Tiếng kéo cung kim loại băng giá ngân vang · Tiếng xé gió rít cao tần · Tiếng nổ va chạm băng vỡ uy lực · Tiếng gió bão tuyết gầm rít duy trì.
material:       Mesh 3D tinh thể băng khúc xạ ánh sáng (Refraction Ice PBR Shader) kết hợp hạt bụi tuyết phát quang (Unlit Particle System).
camera read:    Đường bay của đại tiễn có kích thước rõ nét nhìn từ camera isometric góc 55°; vùng bão tuyết 4.5m có vành đai băng viền ngoài rõ ràng, không làm mờ thanh máu của tướng.
performance:    Tối đa 120 particle emitter tại đỉnh va chạm, tự động gộp mesh mảnh vỡ trên cấu hình di động; không gây tụt khung hình.
status:         PASS_MODEL / READY_FOR_ANIM_VFX_BAKE / TESTED_IN_SIMULATOR (wave1-gameplay-toys.test.mjs).
```
