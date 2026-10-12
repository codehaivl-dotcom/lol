# 04 · Skill Visual Contract — #30 Iro (Mắt Thiên Cơ)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#30 / iro`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** **Thấu Kính Pha Lê Đỏ & Khối Nhãn Cầu Máy** (`ruby_crystal_aperture`).
- **Dạng tác động:** Đạn đạo laser xung kích tầm xa ($7.5\text{m} \rightarrow 13.5\text{m}$).
- **Quy cách diễn hoạt & Vệt đánh:**
  - *Animation:* Ba vòng kim loại đồng tâm giật khẽ về phía sau để triệt tiêu lực phản chấn; khối cầu pha lê đỏ ở tâm chớp sáng chói lòa; một tia chùm sáng laser đỏ rực bắn thẳng tắp vào ngực mục tiêu.
  - *Thời điểm trúng đòn (HIT frame):* Tại giây $0.15\text{s}$ (đạn laser tốc độ $38\text{ m/s}$).
  - *Vệt chuyển động (Weapon Trail):* Dải laser đỏ hẹp như một sợi chỉ phát sáng kéo dài từ tâm nhãn cầu tới mục tiêu.
  - *SFX:* Tiếng "TÍCH... CHÍU!" xung kích laser đanh gọn, mang đậm âm hưởng công nghệ viễn tưởng cổ đại.
- **Phản hồi khi Đạt Mốc Ngắm Tối Đa (Static Focus Max Proc):**
  - Khi Iro đứng yên đủ $4.0\text{s}$: Ba vòng đồng thau bung rộng khóa chốt neo xuống không gian; một vòng tròn lưới ngắm quang học màu vàng kim rực sáng quanh nhãn cầu; tia laser đỏ mảnh chiếu thẳng vào tim mục tiêu báo trước $1.0\text{s}$ trước phát bắn cường hóa $+30\%$ sát thương.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Tụ Quang Xuyên Phá (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line Beam).
2. **Preview khi giữ nút:** Dải chữ nhật màu đỏ nhạt dài $12.0\text{m}$, rộng $1.4\text{m}$ xuyên qua các chướng ngại vật.
3. **Telegraph trước tác động:** Khối pha lê đỏ xoay tròn nạp tụ năng lượng trong $0.25\text{s}$ windup; các hạt ánh sáng đỏ bị hút mạnh vào tâm nhãn cầu.
4. **VFX thái & chất liệu:** Một chùm tia laser đỏ bản dày rực lửa xé toạc không khí với vận tốc $40\text{ m/s}$; làm nóng chảy không gian trên đường bay và để lại vệt tàn dư nhiệt đỏ rực trong $0.3\text{s}$.
5. **Hit geometry server:** Khối hộp di động dài $12.0\text{m} \times$ rộng $1.4\text{m}$.
6. **Collision:** Xuyên qua toàn bộ lính; xuyên qua mọi mục tiêu trên đường bay.
7. **Lifetime:** Tia laser tồn tại trong $0.3\text{s}$.
8. **Damage/CC:** Sát thương vật lý và làm chậm $20\%$ trong $1.0\text{s}$.

### 2.2. Kỹ Năng W — Thấu Kính Phòng Vệ (`skill_w`)
1. **Cast targeting:** Tự niệm diện rộng quanh thân (Point Blank AoE Knockback).
2. **Preview:** Vòng tròn bán kính $2.5\text{m}$ quanh chân Iro.
3. **Telegraph:** $0\text{s}$ gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Ba vòng kim loại xoay tít cực nhanh tạo ra một làn sóng xung kích quang học hình cầu nổ bung ra ngoài; đẩy lùi kẻ địch cận chiến ra xa $3.0\text{m}$; sau đó một lớp khiên lưới quang học hình bát diện bọc quanh nhãn cầu.
5. **Hit geometry:** Hình cầu bán kính $2.5\text{m}$ quanh tâm Iro.
6. **Collision:** Đẩy lùi đơn vị địch chạm phải; không đẩy lùi lính to hoặc quái khủng.
7. **Lifetime:** Khiên tồn tại $2.5\text{s}$.
8. **Damage/CC:** Hấp thụ sát thương theo chỉ số khiên; đẩy lùi kẻ địch cận chiến.

### 2.3. Kỹ Năng E — Khóa Tiêu Cự (`skill_e`)
1. **Cast targeting:** Chọn mục tiêu đơn cự ly xa (Single Target Beam).
2. **Preview:** Tầm thi triển vòng tròn bán kính $9.0\text{m}$.
3. **Telegraph:** Nhãn cầu chớp sáng trong $0.1\text{s}$.
4. **VFX thái & chất liệu:** Một chùm laser quét mỏng màu đỏ tía chiếu rọi cố định lên mục tiêu; trên đầu nạn nhân xuất hiện biểu tượng tâm ngắm Thiên Cơ ba góc nhấp nháy liên tục; giáp đối thủ bốc khói rạn nứt.
5. **Hit geometry:** Khóa mục tiêu đơn không thể né tránh trong cự ly $9.0\text{m}$.
6. **Collision:** Khóa thẳng lên mục tiêu chỉ định.
7. **Lifetime:** Hiệu ứng debuff tồn tại trong $1.5\text{s}$.
8. **Damage/CC:** Sát thương vật lý, giảm $20\%$ Giáp, làm lộ diện và làm chậm $30\%$ trong $1.5\text{s}$.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Thiên Cơ Hủy Diệt Pháo (Chuẩn Tài Liệu 79)

```yaml
R · Thiên Cơ Hủy Diệt Pháo · iro
fantasy:        Iro kích hoạt trạng thái pháo kích vệ tinh cổ đại, ba vành kim loại mở rộng cực hạn, hội tụ năng lượng thiên hà nã một phát đại pháo laser hủy diệt tầm siêu cực đại 22.0m xuyên toạc toàn bộ chiến trường.
kit:            aim: skillshot | width: 2.0m | speed: 45m/s | range: 22.0m | windup: 0.5s | passMinions: true | slow: 0.45 | physical extreme burst
phases:
  - Pha 1 (Satellite Alignment / Calibration t=0.0–0.25s): Ba vòng kim loại đồng tâm tách rời nhau bay lơ lửng thành 3 tầng thấu kính thẳng hàng; một đường laser dẫn đường màu đỏ siêu mỏng quét thẳng tắp qua toàn màn hình cự ly tới 22.0m cảnh báo vị trí bắn.
  - Pha 2 (Critical Energy Fusion t=0.25–0.5s): Lõi pha lê đỏ hút cạn ánh sáng xung quanh, chuyển sang màu trắng đỏ chói lòa; âm thanh nạp tụ năng lượng tần số cực cao réo rắt dồn dập.
  - Pha 3 (Superluminal Laser Discharge t=0.5s): Phát pháo laser hủy diệt khổng lồ đường kính 2.0m nã phụt ra với vận tốc 45 m/s, quét sạch toàn bộ đường thẳng 22.0m; mặt đất bên dưới nứt toác bốc hơi tức thì.
  - Pha 4 (Impact & Seismic Shockwave t=0.5–0.8s): Toàn bộ kẻ địch trúng đòn nhận sát thương hủy diệt khổng lồ và bị làm chậm 45% trong 2.0s; màn hình rung chuyển dữ dội (Camera Shake).
  - Pha 5 (Thermal Vents Dissipation t=0.8–1.3s): Ba vành kim loại đóng chốt trở lại, xả luồng hơi nhiệt đỏ rực ra phía sau; vệt laser trên sàn đấu nguội dần thành vệt than cháy đen.
hitbox:         Khối hộp chữ nhật siêu dài 22.0m x rộng 2.0m xuyên qua mọi địa hình và lính; áp dụng sát thương bộc phát cực đại lên tướng địch.
animation:      Clip riêng `iro_r_cannon`: Tách 3 vành đồng tâm, giật lùi nạp tụ năng lượng, nã phát pháo rung chuyển không gian và thu hồi chốt neo.
VFX layers:     Layer đường ngắm dẫn đường đỏ mảnh -> Layer hạt ánh sáng tụ tâm -> Layer chùm đại pháo laser đỏ rực bản dày -> Layer nứt đất bốc khói nhiệt -> Layer camera shake chấn động.
SFX:            Tiếng máy nạp năng lượng tần số cao rít chói tai -> Tiếng đại pháo bùng nổ "ĐÙNG - CHÍU!" vang dội toàn bản đồ -> Âm vang xé rách không gian kéo dài.
material:       PBR Shader Laser Plasma siêu sáng (Emissive Bloom cực cao) + Shader vệt cháy nung đất đá.
camera read:    Độ đọc cực kỳ rõ nét; đường dẫn đường đỏ hiện rõ 0.5s cho phép đối thủ ở tầm xa có cơ hội phản xạ né tránh bằng Dash D.
performance:    Mesh beam tối ưu hóa tia trụ, hạt tia lửa GPU tối đa 24 hạt; bảo đảm giữ vững 60 FPS trong mọi điều kiện giao tranh tổng.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
