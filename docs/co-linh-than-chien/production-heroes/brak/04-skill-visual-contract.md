# 04 · Skill Visual Contract — #02 Brak (Nhịp Quyền)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#02 / brak`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Đôi Găng Tay Piston Hơi Nước Đồng Đỏ (Steam Hydraulic Gauntlets).
- **Dạng tác động:** Cận chiến va chạm nặng trực tiếp (Melee Heavy Blunt).
- **Animation:** Đấm thẳng tay phải hoặc móc ngang tay trái luân phiên. Khi nắm đấm chạm mục tiêu, xi-lanh sau bắp tay giật lùi 10cm tạo tiếng "KHỤC" cơ khí, phụt nhẹ làn khói trắng qua khe thoát khí.
- **Thời điểm trúng đòn (HIT frame):** Tại giây $0.12\text{s}$ của animation đòn đánh.
- **Vệt chuyển động (Weapon Trail):** Vệt sáng đồng đỏ mờ bám theo đường đấm; không vẽ vệt hào quang ma pháp thừa thãi.
- **SFX:** Tiếng kim loại va đập đanh thép "KENG" kèm tiếng hơi nước xì "XÈO" khi tiếp xúc mục tiêu.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Piston Trực Quyền (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line).
2. **Preview khi giữ nút:** Dải chữ nhật màu đồng thau trong suốt dài 5.5m, rộng 1.5m trên mặt đất.
3. **Telegraph trước khi tác động:** Brak dậm mạnh chân phải xuống đất, thân người xoay nhẹ góc $45^\circ$, ống xả vai phụt ra luồng khói trắng trong 0.15s.
4. **VFX thái & chất liệu:** Cú đấm phóng thẳng tới trước như mũi khoan hơi nước; một luồng sóng xung kích hình nón nén khí màu trắng bạc xé gió bay dọc theo đường đấm; mặt đất dưới đường đấm xuất hiện vệt cày nông bốc khói.
5. **Hit geometry server:** Khối hộp chữ nhật dài 5.5m $\times$ rộng 1.5m.
6. **Collision:** Tác động và dừng lại khi trúng tướng địch đầu tiên; gây sát thương và làm chậm 25% trong 1.0s.
7. **Lifetime:** Đòn đấm hoàn tất trong 0.22s (tốc độ đạn đạo 26 m/s).
8. **Damage/CC:** Kích hoạt ngay khi va chạm hitbox mục tiêu.

### 2.2. Kỹ Năng W — Nghênh Kích Thủ Thế (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Biểu tượng khiên bát giác ánh đồng đỏ hiện mờ quanh thân.
3. **Telegraph:** 0s gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:**
   - *Pha thủ thế (0.0s – 0.75s):* Brak bắt chéo hai cẳng tay bọc găng trước ngực; một vầng sáng hoa văn Thạch Hợp Cổ Phái màu đồng sáng rực bao quanh hai tay trong 0.75s.
   - *Pha phản kích khi đón đòn (Parry Proc):* Ngay khi nhận đòn, một tiếng "KENGGG" cực lớn vang lên; tia lửa kim loại bắn tung tóe $360^\circ$; hai xi-lanh sau tay bung áp suất xả ra cột khói trắng xóa cao 2m; Brak lập tức xuất ra một cú đấm búa tạ phản đòn chớp nhoáng với luồng chấn động nén khí hình cầu làm choáng 0.5s đối thủ.
5. **Hit geometry:** Hình cầu phòng ngự bán kính 1.2m quanh thân; đòn phản kích tác động trong tầm quét hình nón $90^\circ$ cự ly 3.0m phía trước.
6. **Collision:** Chặn đòn trực diện; tiêu hao thế thủ ngay khi phản kích thành công.
7. **Lifetime:** Thế thủ tồn tại 0.75s; khiên cơ bản tồn tại 2.0s; đòn phản kích diễn ra trong 0.18s.
8. **Damage/CC:** Giảm 60% sát thương nhận vào, gây sát thương phản kích và làm choáng 0.5s kẻ tấn công.

### 2.3. Kỹ Năng E — Địa Chấn Xung Kích (`skill_e`)
1. **Cast targeting:** Vòng tròn diện rộng quanh thân (PBAoE Circle).
2. **Preview:** Vòng tròn bán kính 3.8m trên mặt đất.
3. **Telegraph:** Brak giơ cao nắm đấm phải nén áp suất trong 0.15s.
4. **VFX thái & chất liệu:** Nắm đấm giáng mạnh xuống đất; mặt đất trong bán kính 3.8m nứt toác theo hình mạng nhện; các mảnh đất đá nhỏ rung lên bắn lên không trung kèm một luồng sóng chấn động bụi đất màu nâu xám tỏa tròn.
5. **Hit geometry:** Hình trụ tròn bán kính 3.8m tính từ tâm chân Brak.
6. **Collision:** Xuyên qua toàn bộ đơn vị trong vùng tròn.
7. **Lifetime:** Sóng chấn động quét qua trong 0.3s.
8. **Damage/CC:** Gây sát thương vật lý và làm chậm 30% trong 1.2s cho toàn bộ kẻ địch trúng đòn.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Hơi Nước Bộc Phá (Chuẩn Tài Liệu 79)

```
R · Hơi Nước Bộc Phá · brak
fantasy:        Brak xả toàn bộ van áp suất thủy lực, nhảy bổ 6.0m vào giữa vòng vây kẻ thù, giáng hai nắm đấm búa tạ xuống đất giải phóng vụ nổ hơi nước chấn động nghiền nát và làm choáng diện rộng toàn bộ đối phương.
kit:            aim: area ground leap | range: 6.0m | dash: 6.0m | radius: 4.5m | delay: 0.3s | windup: 0.2s | stun: 1.0s | physical damage
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.2s): Brak gập người dậm chân, còi hơi báo động trên vai rít lên từng hồi "ENG-ENG", toàn bộ 4 xi-lanh sau lưng nén áp suất kịch trần, cơ thể rung bần bật, hơi nước bốc lên mù mịt.
  - Pha 2 (Leap Flight t=0.2–0.5s): Brak phóng người bay vút lên không trung hướng về điểm chỉ định cự ly 6.0m; dưới mặt đất xuất hiện vòng tròn cảnh báo màu đồng đỏ đường kính 9.0m (bán kính 4.5m) với các hoa văn bánh răng cơ khí xoay tròn.
  - Pha 3 (Signature Structure t=0.45–0.5s): Trên đỉnh điểm rơi, thân thể đồ sộ của Brak giương cao hai quả đấm bọc giáp đan chặt lại như một chiếc búa tạ khổng lồ, toàn thân phủ lớp ánh sáng động năng trắng bạc.
  - Pha 4 (Impact Đỉnh t=0.5–0.6s): Brak giáng sấm sét hai nắm đấm xuống tâm chấn; một tiếng nổ "OÀM-BÙNG!" long trời lở đất; buồng áp suất bung mở 100% tạo ra cột hơi nước trắng xóa bắn tung cao 4m; mặt đất sụp lún để lại vết nứt địa chấn sâu hoắm; toàn bộ kẻ địch trong bán kính 4.5m bị chấn động làm choáng 1.0s và giật nảy người lên.
  - Pha 5 (Decay / End t=0.6–1.2s): Luồng hơi nước tản dần ra mép ngoài thành sương mù mờ ảo; đất đá rơi lả tả xuống; Brak đứng dậy từ tư thế dậm gối uy nghi, các van hơi xả tiếng "XÈOOOO" dài giải nhiệt.
hitbox:         Hình tròn bán kính 4.5m quanh điểm tiếp đất; 100% mục tiêu bên trong chịu sát thương vật lý bộc phát và làm choáng 1.0s.
animation:      Clip riêng `brak_r_leap_slam`: Pose co người nén áp suất -> Pose bay trên không giơ cao hai găng -> Pose nện búa tạ hai tay xuống đất -> Pose đứng dậy xốc lại găng.
VFX layers:     Layer nén hơi vai ngực -> Layer vệt bay hơi nước trên không -> Layer vòng cảnh báo bánh răng Cổ Linh -> Layer cột hơi nước bộc phát và địa chấn đất đá.
SFX:            Tiếng còi hơi báo động cơ khí -> Tiếng xé gió rít gầm -> Tiếng nổ bộc phá chấn động kim loại "OÀNH" cực nặng -> Tiếng xả áp xì dài giải nhiệt.
material:       Mesh đất nứt rạn cơ học kết hợp particle hơi nước nén trắng PBR.
camera read:    Rõ nét hoàn toàn ở góc nhìn MOBA 55 độ; vòng cảnh báo bán kính 4.5m hiện rõ 0.3s trước khi tiếp đất; không che lấp thanh máu của tướng.
performance:    Giới hạn tối đa 28 particles phát tán; duy trì ổn định 60 FPS khi combat đông người.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
