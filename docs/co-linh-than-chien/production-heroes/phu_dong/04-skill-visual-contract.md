# 04 · Skill Visual Contract — #43 Phù Đổng (Thiết Mã Thiên Tướng)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#43 / phu_dong`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** 
  - *Mặc định:* **Cổ Thần Kiếm** (Kiếm đồng dài Cổ Linh).
  - *Trong trạng thái Ultimate R (6.0s):* **Thiên Lôi Cổ Trúc** (Cụm tre Tinh Thạch xanh ngọc bọc lôi hỏa vàng kim dài $3.5\text{m}$).
- **Dạng tác động:** Cận chiến kỵ mã (Mounted Melee Strike / Wide Bamboo Sweep).
- **Trạng thái Cổ Thần Kiếm (Mặc định):**
  - *Animation:* Chủ tướng nghiêng người trên yên ngựa, vung kiếm chém vát góc $45^\circ$ từ vai phải xuống hoặc đâm thẳng mũi kiếm.
  - *Thời điểm trúng đòn (HIT frame):* Tại giây $0.14\text{s}$ của hoạt ảnh đòn đánh.
  - *Vệt chuyển động (Weapon Trail):* Dải ánh sáng vàng kim đồng thau mỏng bám theo mũi kiếm.
  - *SFX:* Tiếng kiếm xé gió sắc gọn kết hợp tiếng kim loại rít lên khi chém trúng giáp.
- **Trạng thái Cú Húc Lôi Hỏa ($\ge 80$ Xung Lượng):**
  - *Animation:* Thiết Mã chồm hai chân trước lên cao và dậm mạnh xuống đầu mục tiêu; Chủ tướng ghìm chặt dây cương.
  - *HIT frame:* Tại giây $0.16\text{s}$.
  - *VFX & SFX:* Dưới móng ngựa nổ ra vòng điện quang đỏ cam làm nứt đất; âm thanh "ĐOÀNG" như tiếng sét nổ ngang tai, nạn nhân hiện icon choáng hình móng ngựa lôi đình.
- **Trạng thái Thiên Lôi Cổ Trúc (Sau khi bật R):**
  - *Animation:* Phù Đổng cầm cụm tre bằng hai tay, xoay cả thân trên quất một đường hình quạt $180^\circ$ càn quét cự ly $3.5\text{m}$.
  - *VFX & SFX:* Đường quất tre để lại dải hồ quang điện trường màu xanh ngọc bích hòa lẫn tia chớp vàng rực rỡ, lá tre tinh thạch bắn tung tóe; âm thanh tre quất rít gầm trong gió lốc.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Thiết Mã Đột Kích (`skill_q`)
1. **Cast targeting:** Dải thẳng theo hướng trỏ chuột (Skillshot Line Dash).
2. **Preview khi giữ nút:** Dải chữ nhật màu vàng cam bán trong suốt dài $7.2\text{m}$, rộng $1.6\text{m}$ trên mặt đất.
3. **Telegraph trước khi tác động:** Thiết Mã hí vang, hạ thấp đầu lấy đà trong $0.15\text{s}$; mắt ngựa rực lửa đỏ.
4. **VFX thái & chất liệu:** Cả người và ngựa bọc trong một khối năng lượng lôi hỏa hình mũi giáo lao đi vun vút, mặt đất dưới vó ngựa bốc khói đen và tia lửa điện kéo dài thành 2 vệt bánh xe/vó sắt.
5. **Hit geometry server:** Khối hộp va chạm di động (Oriented Bounding Box) kích thước dài $7.2\text{m} \times$ rộng $1.6\text{m}$.
6. **Collision:** Xuyên qua toàn bộ kẻ địch trên đường lướt; dừng lại khi gặp tường dày hoặc hết quãng đường.
7. **Lifetime:** Hoàn tất cú lướt trong $0.3\text{s}$ (vận tốc $24\text{ m/s}$).
8. **Damage/CC:** Gây sát thương vật lý và làm chậm $30\%$ ngay khi chạm vào mục tiêu.

### 2.2. Kỹ Năng W — Kim Giáp Thiết Thuẫn (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Vòng hào quang điện từ quanh chân ngựa.
3. **Telegraph:** $0\text{s}$ gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Thiết Mã dậm mạnh móng sắt xuống đất; một quả cầu năng lượng lôi hỏa hình mai rùa đồng cổ bọc lấy toàn bộ cơ thể người và ngựa (bán kính $1.5\text{m}$), bề mặt có các hoa văn mặt trời Đông Sơn xoay tròn phát quang vàng óng.
5. **Hit geometry:** Khối cầu bảo vệ bán kính $1.5\text{m}$ quanh tâm mô hình kỵ mã.
6. **Collision:** Không chặn đạn đạo (chỉ hấp thụ sát thương nhận vào).
7. **Lifetime:** $3.0\text{ giây}$ hoặc vỡ khi hết máu khiên.
8. **Damage/CC:** Hấp thụ sát thương theo chỉ số khiên quy định.

### 2.3. Kỹ Năng E — Lôi Hỏa Trảm (`skill_e`)
1. **Cast targeting:** Diện rộng tỏa tròn quanh thân (Point Blank AoE Circle).
2. **Preview:** Vòng tròn bán kính $3.6\text{m}$ quanh chân Thiết Mã.
3. **Telegraph:** Phù Đổng vung kiếm ra sau lưng trong $0.1\text{s}$; lưỡi kiếm tóe lửa điện.
4. **VFX thái & chất liệu:** Cổ Thần Kiếm chém một vòng tròn $360^\circ$ hoàn chỉnh sát mặt đất; lưỡi chém tạo thành một vành đai lôi hỏa đỏ cam xé toạc không khí, làm bụi đất và đá vụn bắn tung lên cao.
5. **Hit geometry:** Hình trụ tròn bán kính $3.6\text{m}$, chiều cao $2.2\text{m}$.
6. **Collision:** Đi xuyên đơn vị lân cận.
7. **Lifetime:** Quét hoàn tất trong $0.18\text{s}$.
8. **Damage/CC:** Gây sát thương vật lý và làm chậm $25\%$ cho toàn bộ mục tiêu trong phạm vi.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Thiên Lôi Cổ Trúc (Chuẩn Tài Liệu 79)

```yaml
R · Thiên Lôi Cổ Trúc · phu_dong
fantasy:        Phù Đổng thúc ngựa bay vút lên không trung, giáng mạnh xuống đất làm chấn động chiến trường. Thần kiếm vỡ vụn giải phóng lôi năng, nhổ bật cụm Thiên Lôi Cổ Trúc sấm sét quét sạch quân thù.
kit:            aim: area | range: 5.5m | dash: 5.5m | radius: 4.8m | windup: 0.3s | delay: 0.4s | stun: 1.0s | bamboo stance: 6.0s (reach 3.5m) | physical damage
phases:
  - Pha 1 (Cast / Invocation t=0.0–0.3s): Thúc Thiết Mã hí vang, ngựa chồm hai chân trước, toàn thân tích tụ lôi hỏa cực đại, thần kiếm rạn nứt phát sáng chói lòa.
  - Pha 2 (Leap / Multi-beat t=0.3–0.7s): Thiết Mã phóng vút lên không trung cao 4.0m lao về phía điểm chỉ định, dải chiến bào và bờm lửa rực sáng kéo dài thành vệt sao băng lôi hỏa xé gió.
  - Pha 3 (Signature Structure t=0.7s): Tại điểm rơi, một trận đồ sấm sét hoa văn trống đồng Cổ Linh khổng lồ bừng sáng trên mặt đất bán kính 4.8m cảnh báo điểm va chạm.
  - Pha 4 (Impact Đỉnh t=0.7–0.8s): Thiết Mã dậm cả 4 vó sắt xuống tâm chấn; mặt đất vỡ tung thành các khe nham thạch điện quang, toàn bộ kẻ địch trong 4.8m chịu 100% sát thương và bị choáng 1.0s. Cổ Thần Kiếm nổ tung thành ngàn mảnh tinh thạch; Phù Đổng với tay nhổ bật cụm Thiên Lôi Cổ Trúc xanh ngọc sấm sét cao 3.5m từ lòng đất.
  - Pha 5 (Decay / Transformation Stance t=0.8–6.8s): Sóng chấn động tản biến, Phù Đổng cầm Cổ Trúc trong hai tay, toàn thân duy trì hào quang lôi đình, kích hoạt bộ động tác quét tre 3.5m trong 6.0 giây trước khi tích tụ lại thanh kiếm mới.
hitbox:         Hình tròn bán kính 4.8m tại điểm tiếp đất; toàn bộ mục tiêu trong vòng nhận sát thương và choáng 1.0s.
animation:      Clip riêng `phu_dong_r`: Nhảy bổ từ trên không, vó ngựa dậm đất, động tác tay ném chuôi kiếm gãy và rút cụm tre thần uy dũng.
VFX layers:     Layer gồng lôi hỏa -> Layer vệt bay sao băng -> Layer trận đồ trống đồng -> Layer nổ chấn động nứt đất -> Layer hào quang Cổ Trúc 6s.
SFX:            Tiếng ngựa sắt hí vang trời -> Tiếng gió rít lôi đình khi bay -> Tiếng nổ "ẦM ẦM" như sấm sét đánh sập núi -> Âm thanh tre thần sột soạt điện quang.
material:       PBR Shader lôi hỏa đỏ cam kết hợp tinh thạch ngọc bích phát quang emissive cao.
camera read:    Cực kỳ rõ nét ở góc camera MOBA top-down; vùng cảnh báo trống đồng hiện rõ 0.4s trước khi tiếp đất. Không gây che khuất sàn đấu hay thanh máu đồng minh.
performance:    Mảnh vỡ tinh thạch kiếm tối đa 20 hạt GPU particles, tự biến mất sau 1.0s; bảo đảm duy trì 60 FPS trong combat 5v5.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
