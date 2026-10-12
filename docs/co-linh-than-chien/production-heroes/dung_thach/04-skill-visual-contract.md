# 04 · Skill Visual Contract — #46 Dũng Thạch (Thần Rìu & Thiên Cầm)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#46 / dung_thach`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Đại Rìu Cổ Linh khổng lồ lưỡi sáng ánh bạc.
- **Dạng tác động:** Cận chiến trảm kích (Heavy Axe Melee).
- **Trình tự Animation 3 đòn:**
  - *Đòn 1:* Vung rìu chém chéo từ vai phải xuống nách trái, vệt sáng bạc mỏng xé gió.
  - *Đòn 2:* Xoay cổ tay chém ngang từ trái sang phải, vệt sáng bạc mở rộng góc $120^\circ$.
  - *Đòn 3 (Trảm Kích Nứt Đất):* Nâng cao rìu quá đầu bằng cả hai tay, bổ thẳng xuống đất tạo rãnh nứt địa chấn bốc khói bụi và tia lửa ngọc bích.
- **Thời điểm trúng đòn (HIT frame):** Đòn 1 & 2 tại $0.15\text{s}$; Đòn 3 tại $0.20\text{s}$.
- **VFX va chạm Đòn 3:** Rãnh nứt đất dài $2.5\text{m}$, số sát thương chuẩn màu trắng bốc lên kèm chữ "CRACK" hiệu ứng comic cổ điển.
- **SFX:** Tiếng kim loại xé gió "VÚT" cho đòn 1-2, và tiếng nổ "XOẢNG - ẦM" chấn động mặt đất cho đòn 3.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Khai Sơn Phách (`skill_q`)
1. **Cast targeting:** Dải đường thẳng hướng trỏ chuột (Skillshot Line).
2. **Preview khi giữ nút:** Dải chữ nhật bán trong suốt màu nâu cam viền trắng bạc dài $6.8\text{m}$, rộng $1.6\text{m}$ trên mặt đất.
3. **Telegraph trước khi tác động:** Dũng Thạch ngả người ra sau lấy đà vung rìu trong $0.18\text{s}$; lưỡi rìu lóe sáng chói lọi.
4. **VFX trạng thái & chất liệu:** Một luồng sóng xung kích hình lưỡi rìu khổng lồ cày nát mặt đất phóng thẳng về phía trước, đá vụn và đất cát bắn tung tóe sang hai bên mép rãnh.
5. **Hit geometry server:** Khối hộp chữ nhật kích thước dài $6.8\text{m} \times$ rộng $1.6\text{m} \times$ cao $1.5\text{m}$.
6. **Collision:** Xuyên qua toàn bộ đơn vị trên đường đi.
7. **Lifetime:** Sóng rìu quét hết quãng đường trong $0.28\text{s}$ (tốc độ $24\text{ m/s}$).
8. **Damage/CC:** Sát thương vật lý và làm chậm $30\%$ trong $1.2\text{s}$.

### 2.2. Kỹ Năng W — Thiên Cầm Thánh Âm (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast / Area Harmonic Aura).
2. **Preview:** Vòng tròn sóng âm màu xanh ngọc bích bán kính $4.0\text{m}$ quanh chân Dũng Thạch.
3. **Telegraph:** Dũng Thạch rút cây đàn 7 dây sau lưng đưa ra trước ngực trong $0.1\text{s}$.
4. **VFX trạng thái & chất liệu:**
   - Khi gảy đàn: Một chùm sóng âm thanh nhẹ nhàng hình những nốt nhạc cổ xưa và cánh hoa rừng phát sáng xanh ngọc lan tỏa theo từng gợn sóng bán kính $4.0\text{m}$.
   - Bản thân Dũng Thạch được bao bọc trong một quả cầu hào quang ngọc bích mỏng (lớp khiên). Kẻ địch trúng sóng âm có biểu tượng "Hòa Bình" (Cành ngô đồng nhỏ) lơ lửng trên đầu biểu thị bị giảm $25\%$ sát thương.
5. **Hit geometry server:** Khối trụ tròn bán kính $4.0\text{m}$, chiều cao $2.5\text{m}$.
6. **Collision:** Tác động ngay lập tức lên mọi đơn vị trong bán kính.
7. **Lifetime:** Hoạt ảnh gảy đàn kéo dài $1.0\text{s}$; hiệu ứng giảm sát thương duy trì $1.5\text{s}$.
8. **SFX:** Tiếng đàn tơ 7 dây thánh thót, trong trẻo như suối reo hòa lẫn tiếng chim hót ("TÍNH TÍNH TANG TANG"), làm dịu đi toàn bộ tiếng ồn chiến trường xung quanh.

### 2.3. Kỹ Năng E — Cuồng Phách Toái Giáp (`skill_e`)
1. **Cast targeting:** Diện rộng quanh thân (Point Blank AoE Whirlwind).
2. **Preview:** Vòng tròn bán kính $3.5\text{m}$ quanh chân Dũng Thạch.
3. **Telegraph:** Hơi hạ trọng tâm người trong $0.1\text{s}$.
4. **VFX trạng thái & chất liệu:** Dũng Thạch xoay tròn cả cơ thể vung đại rìu $360^\circ$; lưỡi rìu vẽ nên một vành đai gió lốc màu bạc hòa lẫn tia lửa đỏ, lá cây và đất vụn bị cuốn theo tạo thành một lốc xoáy nhỏ. Các tia sinh lực màu xanh lá bay ngược về người Dũng Thạch biểu thị hút máu.
5. **Hit geometry server:** Hình trụ tròn bán kính $3.5\text{m}$, chiều cao $2.0\text{m}$.
6. **Collision:** Trúng toàn bộ kẻ địch trong phạm vi.
7. **Lifetime:** Quét hoàn tất trong $0.22\text{s}$.
8. **Damage/CC:** Sát thương vật lý, làm chậm $25\%$ và hồi máu.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Thiên Địa Bạt Sơn (Chuẩn Tài Liệu 79)

```yaml
R · Thiên Địa Bạt Sơn · dung_thach
fantasy:        Dũng Thạch dồn sức mạnh bạt núi bẻ cây, nhảy vút lên không trung vung đại rìu bổ sập sàn đấu, hất tung đội hình quân thù trong cơn cuồng nộ dũng sĩ.
kit:            aim: area | range: 5.5m | dash: 5.5m | radius: 4.8m | windup: 0.25s | delay: 0.3s | stun: 0.8s | physical damage
phases:
  - Pha 1 (Cast / Invocation t=0.0–0.25s): Dũng Thạch gồng căng cơ bắp cuồn cuộn, toàn thân bốc khói lôi hỏa nâu đỏ, cây đại rìu cầm hai tay giương cao phát quang chói lòa, tiếng gầm dũng mãnh vang dội.
  - Pha 2 (Leap / Flight t=0.25–0.55s): Chàng bật nhảy vút lên không trung cao 3.8m lao bổ về điểm chỉ định; vạt giáp da thú và mái tóc đen bay dựng ngược, để lại vệt năng lượng cuồng chiến màu đỏ bạc xé gió.
  - Pha 3 (Signature Structure t=0.55s): Tại điểm tiếp đất, một vòng tròn nứt đất rực sáng khắc hoa văn rìu chiến Cổ Linh hiện rõ trên mặt sàn bán kính 4.8m cảnh báo điểm va chạm chết chóc.
  - Pha 4 (Impact Đỉnh t=0.55–0.65s): Dũng Thạch bổ đại rìu xuống tâm chấn; mặt đất vỡ tung thành một miệng hố thiên thạch sâu, các khối đá nhọn bắn ngược lên cao. Toàn bộ kẻ địch trong 4.8m bị hất tung lên trời, dính choáng 0.8s và chịu 100% sát thương khủng (+110% Bonus AD).
  - Pha 5 (Decay / Ground Crater t=0.65–2.5s): Đất đá rơi rụng, miệng hố tỏa khói bụi mù mịt trong 1.85 giây trước khi liền lại; Dũng Thạch đứng chống rìu bằng một tay ngạo nghễ ở tâm hố.
hitbox:         Hình tròn bán kính 4.8m tại tâm điểm rơi; tác động đồng loạt lên toàn bộ mục tiêu trong phạm vi.
animation:      Clip riêng `dung_thach_r`: Gồng cơ bắp -> Nhảy vút lên không -> Bổ rìu sụp sàn -> Chống rìu đứng thẳng.
VFX layers:     Layer gồng cơ bắp đỏ bạc -> Layer vệt bay dũng sĩ -> Layer vòng tròn rìu chiến cảnh báo -> Layer nổ hố địa chấn hất tung -> Layer khói bụi miệng hố.
SFX:            Tiếng gầm uy dũng chấn động -> Tiếng gió rít khi bay -> Tiếng bổ rìu "XOẢNG - ĐÙNG" như sét đánh vỡ núi -> Tiếng đất đá rơi lộp độp.
material:       PBR Shader cơ bắp đồng đen kết hợp lưỡi rìu bạc phát sáng emissive và bụi đất thiên nhiên chân thực.
camera read:    Cực kỳ rõ nét ở góc camera isometric; vòng cảnh báo hiện rõ 0.3s cho phép đối thủ nhận biết nguy cơ.
performance:    Mảnh đá vỡ tối đa 20 hạt GPU particles, tự tan biến sau 1.0s; bảo đảm duy trì 60 FPS trong giao tranh 10 tướng.
status:         PASS_MODEL (Thiết kế hoàn tất) / TESTED_SIM (Đã kiểm chứng trong wave3-gameplay-toys.test.mjs).
```
