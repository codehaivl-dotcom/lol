# 04 · Skill Visual Contract — #17 Forge (Lò Cổ)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#17 / forge`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Nắm Đấm Kim Loại Piston Lò Nung (Heavy Piston Gauntlets).
- **Dạng tác động:** Cận chiến va chạm nặng trực tiếp (Melee Heavy Blunt).
- **Animation:** Tung cú đấm thẳng piston bằng tay phải hoặc móc ngang uy lực bằng tay trái. Khi piston duỗi ra hết tầm, có luồng khí nóng phụt nhẹ ở khớp nối.
- **Thời điểm trúng đòn (HIT frame):** Tại giây $0.14\text{s}$ của animation đòn đánh.
- **Vệt chuyển động (Weapon Trail):** Vệt sáng cam đỏ mờ bám theo đường đấm; không vẽ bán nguyệt khổng lồ.
- **SFX:** Tiếng "KENG - KENG" kim loại nặng va đập kèm âm thanh hơi áp suất xì "XÈO" khi trúng đích.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Đột Kích Lò Nung (`skill_q`)
1. **Cast targeting:** Dải thẳng theo hướng trỏ chuột (Skillshot Dash Line).
2. **Preview khi giữ nút:** Dải chữ nhật màu cam đỏ trong suốt dài 7.0m, rộng 1.6m trên mặt đất.
3. **Telegraph trước khi tác động:** Forge ghì vai xuống, hai ống xả sau lưng phụt ra hai cột khói lửa trong 0.15s.
4. **VFX thái & chất liệu:** Forge lao vút tới trước như một khối thiên thạch bọc thép; mũi lao để lại hai rãnh cày xới mặt đất bốc khói nhiệt; khi va chạm tướng địch tạo ra vụ nổ sóng xung kích nhỏ hất văng mục tiêu.
5. **Hit geometry server:** Khối hộp va chạm di động dài 7.0m $\times$ rộng 1.6m.
6. **Collision:** Dừng lại khi va chạm tướng địch đầu tiên; hất văng và làm choáng 0.8s mục tiêu đó.
7. **Lifetime:** Hoàn tất cú lao trong 0.3s.
8. **Damage/CC:** Sát thương và làm choáng kích hoạt ngay khi chạm tướng địch đầu tiên.

### 2.2. Kỹ Năng W — Khóa Áp Suất & Xả Áp (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Vòng tròn bán kính 4.0m quanh thân biểu thị phạm vi nổ nhiệt.
3. **Telegraph:** 0s gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Các van hơi trên vai và ngực Forge bung mở, xả ra luồng hơi nước áp suất màu trắng cam cực mạnh; một lớp màng khiên năng lượng nhiệt magma hình lục giác bọc lấy thân thể; dưới chân một làn sóng lửa tỏa tròn 4.0m thiêu đốt xung quanh.
5. **Hit geometry:** Hình cầu bảo vệ bán kính 1.3m (khiên) và hình trụ tròn bán kính 4.0m quanh thân (nổ nhiệt).
6. **Collision:** Không va chạm vật lý; sóng nhiệt xuyên qua toàn bộ đơn vị.
7. **Lifetime:** Khiên tồn tại 3.5s; vụ nổ nhiệt diễn ra trong 0.25s.
8. **Damage/CC:** Sát thương phép bộc phát tỷ lệ thuận với số nhiệt xả ra ngay thời điểm mở van.

### 2.3. Kỹ Năng E — Phun Hơi Thiêu Đốt (`skill_e`)
1. **Cast targeting:** Hình quạt nón phía trước (PBAoE Cone).
2. **Preview:** Hình quạt góc $60^\circ$, bán kính 4.0m trên mặt đất.
3. **Telegraph:** Lồng ngực Forge bừng sáng màu cam trắng trong 0.1s.
4. **VFX thái & chất liệu:** Forge mở hé song sắt trước ngực, xả ra một luồng khí nóng magma đỏ cam cuồn cuộn phía trước; mặt đất trong vùng quạt bị nung đỏ và bốc hơi mịt mù.
5. **Hit geometry:** Khối nón góc $60^\circ$ bán kính 4.0m tính từ tâm nhân vật.
6. **Collision:** Xuyên qua toàn bộ đơn vị trong vùng quạt.
7. **Lifetime:** Luồng hơi phun trong 0.4s.
8. **Damage/CC:** Gây sát thương phép và áp dụng làm chậm 25% trong 1.2s.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Đại Bộc Phá Lò Cổ (Chuẩn Tài Liệu 79)

```
R · Đại Bộc Phá Lò Cổ · forge
fantasy:        Forge gồng toàn bộ áp suất lò nung nhảy bổ vào giữa lòng địch, phát nổ buồng nhiệt giải phóng sóng chấn động khổng lồ làm choáng toàn bộ đội hình đối phương.
kit:            aim: area | range: 5.0m | dash: 5.0m | radius: 5.5m | delay: 0.5s | windup: 0.3s | stun: 1.1s | magic damage
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.3s): Forge gầm lên tiếng kim loại gầm rú, các van áp suất đóng chặt, cơ thể rung lên bần bật, nhiệt độ lồng ngực đạt mức tới hạn.
  - Pha 2 (Leap / Multi-beat t=0.3–0.8s): Forge nhảy vút lên không trung lao tới điểm chỉ định cự ly 5.0m; dưới mặt đất điểm rơi xuất hiện vòng tròn ký hiệu Lò Nung Cổ Linh màu magma cảnh báo bán kính 5.5m.
  - Pha 3 (Signature Structure t=0.7–0.8s): Cấu trúc lò nung nhiệt khổng lồ bừng sáng trên không trung, các ống xả phụt ra 4 luồng lửa magma hình cánh quạt.
  - Pha 4 (Impact Đỉnh t=0.8–0.9s): Thân thể khổng lồ giáng thẳng xuống tâm chấn, toàn bộ van áp suất bung toang tạo vụ nổ sóng chấn động nhiệt màu cam trắng khổng lồ; mặt đất nứt toác thành các mảng magma sôi sục; toàn bộ kẻ địch bị choáng 1.1s (hiệu ứng bốc khói trên đầu).
  - Pha 5 (Decay / End t=0.9–1.6s): Sóng nhiệt lan tỏa ra mép ngoài rồi tan dần, khói đen bốc lên từ mặt đất, Forge đứng dậy từ tư thế dậm đất uy nghi.
hitbox:         Hình tròn bán kính 5.5m quanh điểm rơi; 100% mục tiêu bên trong chịu sát thương phép và choáng 1.1s.
animation:      Clip riêng `forge_r_blast`: Pose nhảy nén áp suất, hai tay đan lại nện thẳng xuống đất, cơ thể rung chấn mạnh mẽ khi tiếp đất.
VFX layers:     Layer gồng nén (hơi nhiệt tụ vào ngực) -> Layer vệt bay (vệt lửa trên không) -> Layer vùng cảnh báo (vòng magma) -> Layer nổ chấn động (sóng xung kích lửa và đất đá).
SFX:            Tiếng còi hơi báo động rít liên hồi -> Tiếng xé gió nặng nề -> Tiếng "OÀM" như núi lửa phun trào bộc phát -> Tiếng hơi nước xì cực lớn giải nhiệt.
material:       Mesh đất đá nứt vỡ nham thạch kết hợp shader bộc phát lửa magma PBR.
camera read:    Cực kỳ rõ nét ở camera MOBA; vùng nguy hiểm bán kính 5.5m hiện rõ 0.5s trước khi tiếp đất; không che khuất thanh máu tướng.
performance:    Số lượng hạt phát tán tối đa 30 particles; tối ưu hóa để không tụt khung hình dưới 60 FPS khi nhiều tướng đứng trong vòng.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
