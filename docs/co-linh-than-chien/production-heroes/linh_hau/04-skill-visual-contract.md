# 04 · Skill Visual Contract — #38 Linh Hầu (Cổ Thần Trượng)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#38 / linh_hau`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Cổ Thần Trượng Tinh Thạch hai đầu bịt đồng cổ.
- **Dạng tác động:** Cận chiến va chạm trực tiếp (Melee Blunt Strike).
- **Thế Đoản Trượng (Mặc định):**
  - *Animation:* Đánh bổ dọc từ trên xuống (Overhead swing) hoặc quật xéo góc 45° đầm tay.
  - *Thời điểm trúng đòn (HIT frame):* Tại giây $0.12\text{s}$ của animation đòn đánh.
  - *Vệt chuyển động (Weapon Trail):* Dải sáng màu vàng hổ phách mỏng bám sát đường quét của hai đầu trượng. Không vẽ bán nguyệt khổng lồ che tầm nhìn.
  - *SFX:* Tiếng vụt gậy nặng và tiếng "BỤP/CỐP" trầm đục khi trúng giáp/thịt.
- **Thế Trường Trượng (Khi kích hoạt Passive):**
  - *Animation:* Thân gậy kéo dài vọt ra 4.8m; Linh Hầu cầm một đầu trượng xoay người quật tầm xa.
  - *Sweetspot Proc Feedback:* Khi trúng mục tiêu ở cự ly 2.8m – 4.8m, đầu trượng phát ra tia chớp Tinh Thạch vàng kim lóe sáng, kèm âm thanh "KENG" vang dội đặc trưng như tiếng chuông đồng va chạm. Dưới chân mục tiêu hiện vòng làm chậm mờ trong 0.8s.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Trượng Kích Xuyên Phá (`skill_q`)
1. **Cast targeting:** Dải thẳng theo hướng trỏ chuột (Skillshot Line).
2. **Preview khi giữ nút:** Dải chữ nhật màu xanh đồng trong suốt dài 7.0m, rộng 1.5m trên mặt đất.
3. **Telegraph trước khi tác động:** Linh Hầu thu gậy ra sau hông trong 0.15s; mặt đất rung nhẹ theo đường đạn ngắm.
4. **VFX thái & chất liệu:** Thần trượng phóng dài cực nhanh như một trụ tinh thạch phát quang hoàng kim, để lại vệt bụi đá và sóng xung kích hình nón nhỏ tại điểm xuất phát.
5. **Hit geometry server:** Khối hộp va chạm (Oriented Bounding Box) kích thước dài 7.0m $\times$ rộng 1.5m.
6. **Collision:** Xuyên qua toàn bộ kẻ địch trên đường bay, không bị cản bởi lính.
7. **Lifetime:** Đâm ra và thu về trong vòng 0.25s.
8. **Damage/CC:** Gây sát thương và làm chậm 25% ngay thời điểm trụ trượng chạm vào mục tiêu.

### 2.2. Kỹ Năng W — Trượng Thủ Nghinh Phong (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Vòng hào quang mờ quanh thân Linh Hầu.
3. **Telegraph:** 0s gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Linh Hầu chống trượng xuống đất bằng một tay; một quả cầu năng lượng tinh thạch hình lồng bát giác màu vàng hổ phách bọc lấy thân thể, bề mặt có hoa văn phù điêu đồng Cổ Linh xoay chậm.
5. **Hit geometry:** Bảo vệ hình cầu bán kính 1.2m quanh tâm capsule nhân vật.
6. **Collision:** Không va chạm vật lý; không chặn đạn đạo của đối thủ (chỉ hấp thụ sát thương nhận vào).
7. **Lifetime:** 3.0 giây hoặc tan biến ngay khi lớp khiên cạn máu.
8. **Damage/CC:** Không gây sát thương; hấp thụ tối đa chỉ số khiên quy định.

### 2.3. Kỹ Năng E — Hoành Tảo Bát Phương (`skill_e`)
1. **Cast targeting:** Diện rộng tỏa tròn quanh thân (PBAoE Circle).
2. **Preview:** Vòng tròn bán kính 3.8m quanh chân tướng.
3. **Telegraph:** Linh Hầu hạ thấp trọng tâm, xoay hông lấy đà trong 0.1s; một vòng gió cát quét nhẹ theo gót chân.
4. **VFX thái & chất liệu:** Trượng quét một vòng tròn $360^\circ$ hoàn chỉnh; vệt trượng tạo thành một lưỡi cắt năng lượng hổ phách quét sát mặt đất, làm bật tung các mảnh đá nhỏ và bụi cát.
5. **Hit geometry:** Hình trụ tròn bán kính 3.8m, chiều cao 2.0m từ mặt đất.
6. **Collision:** Đi xuyên đơn vị, không đẩy lùi địa hình.
7. **Lifetime:** Quét hoàn tất trong 0.2s.
8. **Damage/CC:** Gây sát thương vật lý và áp dụng làm chậm 20% tại khung hình quét trúng mục tiêu.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Cổ Thần Nộ Phách (Chuẩn Tài Liệu 79)

```
R · Cổ Thần Nộ Phách · linh_hau
fantasy:        Linh Hầu chống trượng bật nhảy vút lên không trung rồi giáng thẳng trượng xuống tâm chấn, làm vỡ vụn mặt đất và choáng toàn bộ kẻ địch xung quanh.
kit:            aim: area | range: 6.0m | dash: 6.0m | radius: 4.5m | windup: 0.3s | delay: 0.4s | stun: 0.8s | physical damage
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.3s): Cắm đầu trượng xuống đất, hai chân co gập, năng lượng hổ phách dồn từ đất vào thân gậy.
  - Pha 2 (Leap / Multi-beat t=0.3–0.7s): Bật nhảy vút lên không trung cao 3.5m, thân gậy vung cao qua đầu, camera rung nhẹ theo góc nhảy.
  - Pha 3 (Signature Structure t=0.7s): Tại điểm rơi, một vòng cổ tự Đông Sơn Cổ Linh khổng lồ bừng sáng trên mặt đất bán kính 4.5m báo trước điểm va chạm.
  - Pha 4 (Impact Đỉnh t=0.7–0.8s): Nện thẳng trượng xuống tâm; mặt đất nứt toác thành các khe nham thạch vàng, sóng xung kích đá bay hất tung bụi, hiệu ứng choáng (Stun) kích hoạt với ký hiệu vương miện đá vỡ trên đầu nạn nhân.
  - Pha 5 (Decay / End t=0.8–1.5s): Các khe nứt đất khép lại dần, bụi cát tản biến, Linh Hầu đứng thẳng dậy thu gậy về tư thế chiến đấu.
hitbox:         Hình tròn bán kính 4.5m tại điểm rơi chọn trước; toàn bộ mục tiêu trong vòng chịu 100% sát thương và choáng 0.8s.
animation:      Clip riêng `linh_hau_r`: Pose bật nhảy dũng mãnh, lưng uốn cong trên không, hai tay nắm chặt trượng dồn toàn lực nện thẳng đứng.
VFX layers:     Layer mở (tụ năng lượng) -> Layer phóng (vệt sáng trên không) -> Layer tâm chấn (vòng ấn Cổ Linh) -> Layer nổ chấn động (mặt đất nứt toạc).
SFX:            Tiếng chống gậy rít lên -> Tiếng gió rít xé toạc khi bay trên không -> Tiếng "ĐÙNG" như sấm sét đánh thẳng xuống đất đá -> Tàn âm đá lở.
material:       Mesh đất đá nứt vỡ kết hợp shader phát quang tinh thạch vàng hổ phách (PBR Material).
camera read:    Cực kỳ rõ nét ở camera MOBA; vùng nguy hiểm đỏ/hổ phách hiện rõ 0.4s trước khi đòn nện tiếp đất. Không che khuất thanh máu hay nhân vật lân cận.
performance:    Số lượng mảnh vỡ đá văng tối đa 16 fragments, tự thu hồi sau 0.8s; bảo đảm duy trì 60 FPS trong combat 5v5.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
