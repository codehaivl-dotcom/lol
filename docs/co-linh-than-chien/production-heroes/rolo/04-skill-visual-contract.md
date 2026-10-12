# 04 · Skill Visual Contract — #36 Rolo (Tê Tê Khiên)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#36 / rolo`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường & Trạng Thái Tháo Vảy (Visual Profiles)

### 1.1. Đòn Đánh Thường (LMB — Basic Attack)
- **Vũ khí:** Song Trảo Thép Cổ Kim (Heavy Excavation Claws).
- **Dạng tác động:** Cận chiến cào xé bằng hai chân trước.
- **Animation:** 2 chuỗi động tác: Nhát 1 dậm chân trái cào mạnh vuốt phải từ trên xuống tạo 3 rãnh cào phát sáng; Nhát 2 vung vuốt trái cào hất ngang từ dưới lên, thân mình nghiêng theo đà cào.
- **Thời điểm HIT frame:** Tại giây $0.12\text{s}$ (vuốt phải) và $0.15\text{s}$ (vuốt trái).
- **Vệt vũ khí (Claw Trails):** 3 vệt sáng màu vàng đồng sắc nhọn kéo theo bụi đất văng tung tóe.
- **SFX:** Tiếng "XOẠC... XOẠC" kim loại cào vào đất đá đanh giòn, kèm tiếng gầm gừ trầm đục trong cổ họng.

### 1.2. Trạng Thái Tháo Vảy (Passive / W Visual State)
- **Dạng Bọc Thép (Mặc định):** Các phiến vảy sừng kim loại xám chì viền vàng đồng khép kín, nhẵn bóng và phát ánh kim phản chiếu ánh sáng môi trường.
- **Dạng Cuồng Chiến (Khi bấm W):**
  - Các phiến vảy trên sống lưng và hai bên sườn bật tách mở ra một góc $30^\circ$, để lộ phần da thịt cơ bắp phát quang màu đỏ cam rực lửa bên dưới.
  - Xung quanh thân Rolo xuất hiện các luồng khí nhiệt bốc lên kèm các tia điện tĩnh kim loại màu vàng kim.
  - Lớp khiên bảo vệ là một khối lăng trụ năng lượng màu vàng đất bao bọc quanh thân thể trong 2.5s.
- **SFX:** Tiếng kim loại bật bung "KHẬC... TENG!" khi vảy bung ra, kèm tiếng gầm kích phát cuồng nộ vang dội.

---

## 2. Đặc Tả Hình Học & Thị Giác Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Bộc Phá Vảy Sừng (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng dạng quất đuôi bắn mảnh sừng (Skillshot Line Projectile).
2. **Preview:** Dải mũi tên hình nón hẹp dài 6.5m, rộng 1.5m trên mặt đất màu vàng đất.
3. **Telegraph:** Rolo xoay nửa vòng thân mình sang trái, chiếc đuôi to bè giơ cao trong 0.12s, vảy đuôi dựng đứng.
4. **VFX thái & chất liệu:** Rolo quất mạnh đuôi sang phải bắn ra một loạt các phiến vảy sừng kim loại sắc bén hình tam giác bay vút tới trước; đường bay để lại luồng bụi cát và tia lửa xám đen; kẻ địch trúng đòn bị các mảnh vảy găm vào người kèm hiệu ứng mảnh vỡ rơi lả tả (làm chậm 25%).
5. **Hit geometry server:** Khối hộp di động dài 6.5m $\times$ rộng 1.5m.
6. **Collision:** Xuyên qua lính và tướng địch trên đường bay.
7. **Lifetime:** Đạn đạo hoàn tất quãng đường trong 0.25s.
8. **Damage/CC:** Gây sát thương vật lý và làm chậm 25% trong 1.0 giây.

### 2.2. Kỹ Năng W — Tháo Vảy Cuồng Nộ (`skill_w`)
1. **Cast targeting:** Tự niệm tức thì (Self Cast).
2. **Preview:** Vòng hào quang kim loại quanh thân.
3. **Telegraph:** 0s gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Vảy trên lưng bung nảy hé mở; một vụ nổ sóng xung kích nhỏ màu vàng đất tỏa ra từ tâm nhân vật đẩy nhẹ bụi cát xung quanh; lớp khiên kết tinh bằng năng lượng khoáng thạch màu hổ phách bọc lấy toàn bộ mô hình Rolo.
5. **Hit geometry:** Khối cầu bảo vệ đường kính 1.6m quanh tâm Rolo.
6. **Collision:** Không cản cơ học; chỉ hấp thụ sát thương.
7. **Lifetime:** Khiên tồn tại 2.5s; Dạng Cuồng Chiến tồn tại 5.0s.
8. **Damage/CC:** Không gây sát thương; kích hoạt trạng thái tăng tốc đánh và tốc chạy.

### 2.3. Kỹ Năng E — Địa Chấn Tê Tê (`skill_e`)
1. **Cast targeting:** Diện rộng quanh tâm nhân vật (Area PBAoE Circle).
2. **Preview:** Vòng tròn bán kính 3.6m viền răng cưa màu nâu đất dưới chân.
3. **Telegraph:** Rolo nhấc bổng đuôi nặng nề lên cao trong 0.15s, toàn thân gồng cứng.
4. **VFX thái & chất liệu:** Rolo đập mạnh chiếc đuôi sắt xuống sàn đấu; mặt đất nứt toác thành 6 đường nứt địa chấn lan tỏa ra ngoài bán kính 3.6m; các cột đá nhọn và bụi đất tung lên cao 1.2m; kẻ địch trúng đòn bị rung chấn giật giật gót chân (thể hiện làm chậm 35%).
5. **Hit geometry:** Hình trụ tròn bán kính 3.6m quanh tâm nhân vật.
6. **Collision:** Tác động lên toàn bộ mục tiêu bên trong bán kính.
7. **Lifetime:** Vết nứt trên sàn tồn tại 1.2s trước khi liền lại.
8. **Damage/CC:** Gây sát thương vật lý và làm chậm 35% trong 1.2 giây.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Thiết Giáp Càn Quét (Chuẩn Tài Liệu 79)

```
R · Thiết Giáp Càn Quét · rolo
fantasy:        Rolo dồn toàn bộ sức mạnh vào 4 chân, bọc cứng vảy giáp phi nước đại như một cỗ xe ủi đất bọc thép cày nát sàn đấu, lao thẳng vào tâm đội hình địch và húc tung tất cả lên không trung, làm choáng toàn diện. TUYỆT ĐỐI KHÔNG CUỘN TRÒN LĂN HÚC.
kit:            aim: area | range: 6.5m | dash: 6.5m | radius: 4.5m | windup: 0.2s | delay: 0.3s | stun: 0.9s | physical heavy impact
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.2s): Rolo gầm lên một tiếng dã thú vang dội; 4 chân bấu chặt xuống sàn đấu, đầu chúi thấp, các phiến vảy sừng trên trán và cổ khóa khớp lại thành một chiếc mũi khoan thép kiên cố.
  - Pha 2 (Telegraph & Ground Warning t=0.2–0.3s): Tại điểm rơi cách 6.5m, một vòng tròn cảnh báo màu đỏ đậm bán kính 4.5m xuất hiện trên mặt đất, mặt đất tại tâm chấn rung chuyển dữ dội.
  - Pha 3 (Heavy 4-Leg Gallop Dash t=0.3–0.5s): Rolo phóng vút tới bằng 4 chân lực lưỡng, mỗi bước dậm cày nát đất đá tạo thành hai vệt rãnh sâu hoắm phía sau. Chuyển động cơ thể là cú phi nước đại uy mãnh của quái thú bọc thép, hoàn toàn không cuộn tròn thành quả bóng.
  - Pha 4 (Impact Đỉnh & Shockwave t=0.5–0.6s): Rolo húc sầm chiếc đầu bọc thép và hai chân trước xuống tâm điểm đích; một vụ nổ địa chấn khổng lồ bốc lên cao 3.5m, đá tảng vỡ vụn văng tung tóe; toàn bộ kẻ địch trong bán kính 4.5m bị hất nảy nhẹ và làm choáng 0.9s.
  - Pha 5 (Decay / End t=0.6–0.9s): Rolo đứng sừng sững tại tâm hố va chạm, rũ nhẹ lớp bụi đá trên lưng, chuyển về tư thế chiến đấu 4 chân đanh thép.
hitbox:         Khối cầu va chạm bán kính 4.5m quanh điểm tiếp đất; gây sát thương và làm choáng 0.9s cho toàn bộ kẻ địch bên trong.
animation:      Clip riêng `rolo_r_iron_rampage`: Chuẩn bị gầm chùng gối $\rightarrow$ Phi nước đại 4 chân cày đất $\rightarrow$ Dộng đầu và 2 chân trước cày nát sàn $\rightarrow$ Rũ bụi đứng thẳng.
VFX layers:     Layer vòng tròn cảnh báo đỏ -> Layer rãnh cày xới 4 chân trên đường lao -> Layer vụ nổ đá tảng bộc phá -> Layer khói bụi lắng đọng.
SFX:            Tiếng gầm tê tê trầm vang -> Tiếng bước chân dậm đất "RẦM... RẦM... RẦM" dồn dập -> Cú va chạm nổ đất long trời lở đất "OÀNGGG!" kim loại va đập đá tảng.
material:       Mesh đá vỡ, khói bụi cát kết hợp decal nứt sàn đất PBR chân thực.
camera read:    Độ đọc hoàn hảo; vòng tròn cảnh báo 0.3s đủ cho đối thủ bấm Dash né; vị trí Rolo đáp đất tạo điểm nhấn thị giác rõ ràng cho combat tổng.
performance:    Tối đa 36 particles mảnh đá văng; không tụt FPS trong giao tranh 5v5.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
