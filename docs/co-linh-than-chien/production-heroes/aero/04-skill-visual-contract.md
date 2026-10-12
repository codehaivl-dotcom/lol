# 04 · Skill Visual Contract — #15 Aero (Phi Công Cổ Khí)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#15 / aero`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** **Súng Đôi Plasma Cổ Linh** (`dual_plasma_cannons`).
- **Dạng tác động:** Đạn đạo xung kích tầm xa ($6.2\text{m}$).
- **Quy cách diễn hoạt & Vệt đánh:**
  - *Animation:* Phi cơ hơi giật mũi lên, hai nòng súng gắn hai bên mạn phi cơ bắn so le hai viên đạn plasma hình thoi màu xanh lam sáng chói; ống xả đuôi tóe lửa phản lực.
  - *Thời điểm trúng đòn (HIT frame):* Tại giây $0.11\text{s}$ (đạn rời nòng bay với tốc độ $32\text{ m/s}$).
  - *Vệt chuyển động (Weapon Trail):* Hai dải đạn plasma phát sáng kéo theo vệt khói xanh lam mỏng.
  - *SFX:* Tiếng "PÍU - TÁCH" súng năng lượng giòn tan và tiếng động cơ tua-bin gầm rú êm dịu.
- **Phản hồi khi kích hoạt Thảm Bom Plasma (Plasma Strafe Proc):**
  - Mặt đất dọc theo đường bay của Aero bốc cháy thành một vệt dung nham plasma màu xanh lam - vàng cam; các bong bóng năng lượng sủi bọt liên tục kèm âm thanh "XÈO XÈO" thiêu đốt.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Tuyến Tính Oanh Tạc (`skill_q`)
1. **Cast targeting:** Dải thẳng định hướng lướt tới (Skillshot Line Dash).
2. **Preview khi giữ nút:** Dải chữ nhật màu xanh lam nhạt dài $7.5\text{m}$, rộng $1.8\text{m}$ trên sàn đấu.
3. **Telegraph trước tác động:** Phi cơ hơi chúi mũi xuống, tua-bin gầm vang trong $0.1\text{s}$; các khoang bom dưới bụng máy bay mở hé rực sáng.
4. **VFX thái & chất liệu:** Phi cơ phóng vút đi với tốc độ $30\text{ m/s}$; khoang bom xả một chuỗi 6 quả bom plasma phát nổ liên hoàn dọc đường bay, biến mặt đất thành vệt thảm dung nham plasma thiêu đốt trong $3.0\text{s}$.
5. **Hit geometry server:** Khối hộp di động dài $7.5\text{m} \times$ rộng $1.8\text{m}$.
6. **Collision:** Bay xuyên qua mọi đơn vị lính và tướng địch.
7. **Lifetime:** Hoàn tất đường bay trong $0.25\text{s}$; vệt thảm bom tồn tại $3.0\text{s}$.
8. **Damage/CC:** Sát thương vật lý bộc phát, làm chậm $25\%$ trong $1.2\text{s}$ và sát thương DoT $30\%$ AD/s trong vùng thảm bom.

### 2.2. Kỹ Năng W — Tăng Áp Lượn Vòng (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Mũi tên uốn lượn quanh phi cơ.
3. **Telegraph:** $0\text{s}$ gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Ngọn lửa plasma phụt mạnh từ hai ống xả phản lực phía đuôi; một lồng khí động học hình elip màu xanh lam bọc quanh cỗ phi cơ; bụi gió cuộn tròn dưới cánh khi phi cơ bẻ lái lượn vòng.
5. **Hit geometry:** Khối elip trục dài $2.5\text{m} \times$ trục ngắn $1.8\text{m}$.
6. **Collision:** Tăng tốc độ bay, không cản đạn đạo.
7. **Lifetime:** Khiên tồn tại $2.5\text{s}$.
8. **Damage/CC:** Hấp thụ sát thương theo chỉ số khiên.

### 2.3. Kỹ Năng E — Pháo Sáng Phản Lực (`skill_e`)
1. **Cast targeting:** Định hướng đường thẳng bắn pháo & Giật lùi bản thân (Skillshot Recoil Dash).
2. **Preview:** Hình quạt pháo sáng dài $5.5\text{m}$ phía trước kết hợp mũi tên giật lùi $4.5\text{m}$ phía sau.
3. **Telegraph:** Mũi phi cơ ngửa lên trong $0.1\text{s}$.
4. **VFX thái & chất liệu:** Bắn ra một chùm 4 quả pháo sáng chói lòa màu vàng kim nổ tung phía trước; luồng phản lực nén đẩy giật lùi cỗ phi cơ $4.5\text{m}$ về sau, để lại một làn khói trắng xóa che mắt đối phương.
5. **Hit geometry:** Hình quạt góc $45^\circ$, tầm $5.5\text{m}$ (pháo) và đường lùi $4.5\text{m}$ (thân máy bay).
6. **Collision:** Có thể vượt địa hình mỏng khi giật lùi.
7. **Lifetime:** Giật lùi hoàn tất trong $0.22\text{s}$.
8. **Damage/CC:** Sát thương vật lý và làm chậm $35\%$ trong $1.2\text{s}$.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Đại Oanh Tạc Chiến Dịch (Chuẩn Tài Liệu 79)

```yaml
R · Đại Oanh Tạc Chiến Dịch · aero
fantasy:        Aero kéo cần điều khiển cất cánh vút lên không trung, dội một cơn bão bom chùm plasma khổng lồ xuống tọa độ chiến lược cự ly 10.0m, biến toàn bộ khu vực thành biển lửa plasma chia cắt và tiêu diệt đội hình địch.
kit:            aim: area | radius: 5.5m | range: 10.0m | windup: 0.25s | delay: 0.3s | slow: 0.40 | physical AoE bombardment
phases:
  - Pha 1 (High Altitude Climb / Target Lock t=0.0–0.25s): Aero vít ga bốc đầu phi cơ bay vút lên cao 6.0m khỏi tầm nhìn thông thường; tại tọa độ mục tiêu cách tới 10.0m xuất hiện một vòng tròn lưới ngắm quang học màu xanh lam bán kính 5.5m nhấp nháy báo động.
  - Pha 2 (Carpet Bomb Drop t=0.25–0.4s): Một loạt 12 quả bom plasma chùm được xả đồng loạt từ khoang bụng phi cơ rơi xé gió từ trên trời xuống tâm điểm vòng ngắm.
  - Pha 3 (Massive Cluster Detonation t=0.4–0.55s): Toàn bộ 12 quả bom chạm đất nổ tung thành một chuỗi nổ liên hoàn cực đại; cột khói plasma xanh lam bốc cao 4.0m, mặt đất bị cày xới và biến thành hồ dung nham rực lửa.
  - Pha 4 (Concussion & Slow Wave t=0.55–0.8s): Sóng xung kích nén áp suất lan tỏa khắp bán kính 5.5m, gây sát thương vật lý khổng lồ và làm chậm 40% trong 2.0s cho mọi kẻ địch trong vùng.
  - Pha 5 (Dive Return / Level Off t=0.8–1.2s): Phi cơ lượn một vòng cung tuyệt đẹp trên bầu trời rồi hạ thấp độ cao trở lại trạng thái lơ lửng sát đất quen thuộc.
hitbox:         Khối trụ tròn diện rộng bán kính 5.5m cự ly tối đa 10.0m; áp dụng làm chậm 40% trong 2.0s và sát thương AoE cực lớn.
animation:      Clip riêng `aero_r_bombard`: Bốc đầu phi cơ bay vút lên cao, xả khoang bom bụng, nghiêng cánh lượn vòng và đáp nhẹ xuống sàn đấu.
VFX layers:     Layer lưới ngắm quang học xanh lam -> Layer chùm bom rơi xé gió -> Layer chuỗi nổ plasma liên hoàn -> Layer hồ dung nham bốc khói xanh -> Layer sóng chấn động tỏa rìa.
SFX:            Tiếng còi báo động không kích dồn dập -> Tiếng rít xé gió của bom rơi từ trên cao -> Tiếng nổ dây chuyền "ĐÙNG - ĐOÀNG - OÀNH" chấn động tai -> Tiếng động cơ phản lực gầm rú lượn về.
material:       PBR Shader plasma nổ xanh lam óng ánh + Shader mặt đất cháy nứt dung nham.
camera read:    Độ đọc hoàn hảo; lưới ngắm xanh lam nổi bật trên sàn đấu, độ trễ 0.55s cho phép đối thủ có cơ hội dùng Dash D thoát hiểm; không che khuất thanh máu.
performance:    Mảnh nổ và tia lửa tối đa 28 hạt GPU particles, tự thu hồi sau 0.8s; bảo đảm duy trì 60 FPS trong giao tranh 5v5.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
