# 04 · Skill Visual Contract — #01 Kiko (Ảnh Hầu Song Trảo)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#01 / kiko`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** **Song Trảo Cơ Khí Gắn Mu Tay** (`wrist_mechanical_claws`).
- **Dạng tác động:** Cận chiến cào xé cự ly gần ($1.6\text{m}$).
- **Quy cách diễn hoạt & Vệt đánh:**
  - *Animation:* Kiko ở tư thế khom lưng ép sát đất; tay phải cào vát chéo từ trên xuống $\rightarrow$ tay trái xoay cổ tay móc ngược từ dưới lên; các ngón vuốt kim khí co duỗi theo nhịp khớp cơ học.
  - *Thời điểm trúng đòn (HIT frame):* Tại giây $0.10\text{s}$ (tay phải) và $0.12\text{s}$ (tay trái).
  - *Vệt chuyển động (Weapon Trail):* Hai dải ánh sáng mỏng màu tím huỳnh quang (neon purple) sắc lẹm bám theo mũi vuốt. Tuyệt đối không vẽ vệt gậy hay vệt đao to bản.
  - *SFX:* Tiếng vuốt kim loại xé rách không khí sắc lạnh và tiếng "XOẸT - XOẸT" đanh gọn khi găm vào giáp mục tiêu.
- **Phản hồi nội tại khi hấp thụ đòn (1-Hit Absorption Proc):**
  - Khi Ảo ảnh hấp thụ đòn đánh của địch: Một hiệu ứng khúc xạ lăng kính phát sáng "TÁCH" tại vị trí bóng ảo, bóng ảo tan vỡ thành các hạt bụi ánh sáng tím; trên người Kiko bừng sáng hào quang tăng tốc trong $2.0\text{s}$.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Toái Trảo Đột Kích (`skill_q`)
1. **Cast targeting:** Dải thẳng theo hướng trỏ chuột (Skillshot Line Dash).
2. **Preview khi giữ nút:** Dải chữ nhật màu tím nhạt bán trong suốt dài $6.0\text{m}$, rộng $1.3\text{m}$ trên mặt đất.
3. **Telegraph trước khi tác động:** Kiko co gập 4 chi lấy đà trong $0.1\text{s}$; mắt mặt nạ đồng nhấp nháy ánh sáng tím.
4. **VFX thái & chất liệu:** Kiko phóng vút đi như một vệt khói tím quang học với tốc độ $28\text{ m/s}$; tại vị trí xuất phát, một Ảo ảnh quang học đứng nguyên hình dạng trong $3.0\text{s}$.
5. **Hit geometry server:** Khối hộp va chạm di động (Oriented Bounding Box) dài $6.0\text{m} \times$ rộng $1.3\text{m}$.
6. **Collision:** Xuyên qua đơn vị lính; dừng lại khi chạm tường dày hoặc đạt cự ly tối đa.
7. **Lifetime:** Hoàn tất cú lướt trong $0.21\text{s}$.
8. **Damage/CC:** Gây sát thương vật lý lên toàn bộ kẻ địch trên đường lướt.

### 2.2. Kỹ Năng W — Ảo Ảnh Phân Thân (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Mũi tên chỉ hướng lùi ngắn sau lưng.
3. **Telegraph:** $0\text{s}$ gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Kiko đạp đất nhảy giật lùi $2.0\text{m}$; một lớp khiên hình lục giác lăng kính tím bọc quanh thân; đồng thời một ảo ảnh quang học chạy thẳng về phía trước $4.0\text{m}$ đánh lạc hướng thị giác đối thủ.
5. **Hit geometry:** Khối cầu khiên bán kính $1.0\text{m}$ quanh thân Kiko.
6. **Collision:** Không cản đạn đạo; lướt lùi đi xuyên qua đơn vị lính nhỏ.
7. **Lifetime:** Khiên tồn tại $2.0\text{s}$; bóng ảo tồn tại $3.0\text{s}$.
8. **Damage/CC:** Hấp thụ sát thương theo chỉ số khiên quy định.

### 2.3. Kỹ Năng E — Khúc Xạ Trảm Kích (`skill_e`)
1. **Cast targeting:** Diện rộng tỏa tròn quanh thân (Point Blank AoE Circle).
2. **Preview:** Vòng tròn bán kính $3.2\text{m}$ quanh chân Kiko.
3. **Telegraph:** Kiko vung hai tay ra sau hông trong $0.1\text{s}$.
4. **VFX thái & chất liệu:** Song trảo quét 2 nhát liên tiếp tạo thành 2 vòng cung lưỡi cắt quang học tím đan chéo hình chữ X; làm nứt vỡ không gian xung quanh với hiệu ứng sóng khúc xạ ánh sáng mờ.
5. **Hit geometry:** Hình trụ tròn bán kính $3.2\text{m}$, chiều cao $1.8\text{m}$.
6. **Collision:** Đi xuyên đơn vị.
7. **Lifetime:** Quét hoàn tất 2 nhát trong $0.22\text{s}$.
8. **Damage/CC:** Gây 2 lần sát thương vật lý và làm chậm $30\%$ trong $1.2\text{s}$.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Vạn Ảnh Trảo Sát (Chuẩn Tài Liệu 79)

```yaml
R · Vạn Ảnh Trảo Sát · kiko
fantasy:        Kiko bẻ cong quang học phân tách thành ba ảo ảnh sát thủ, lao vào con mồi từ các góc chết, tung chuỗi cào xé song trảo liên hoàn xé toạc mục tiêu và làm choáng kẻ thù.
kit:            aim: single_target | range: 6.5m | dash: 6.5m | windup: 0.2s | stun: 0.8s | physical burst damage
phases:
  - Pha 1 (Target Lock / Invocation t=0.0–0.2s): Mắt Kiko lóe sáng tím, giương cao song trảo; trên đầu mục tiêu xuất hiện ký hiệu mắt quang học ba lăng kính màu tím cảnh báo sắp bị ám sát.
  - Pha 2 (Shadow Dash / Multi-angle Strike t=0.2–0.5s): Kiko phân tách thành 3 vệt bóng quang học màu tím sẫm lao từ 3 hướng khác nhau vào mục tiêu với vận tốc cực nhanh ($32 m/s$).
  - Pha 3 (Convergence & Signature Structure t=0.5s): Ba bóng hội tụ tại tâm con mồi, một lồng giam lăng kính quang học tím nứt vỡ bao trùm không gian quanh mục tiêu cự ly 2.0m.
  - Pha 4 (Claw Flurry Impact t=0.5–0.8s): Kiko thật nhập thể tung chuỗi 4 nhát trảo xé toạc chéo người mục tiêu; mặt đất tóe tia lửa điện tím, mục tiêu bị choáng 0.8s và nhận trọn vẹn sát thương bộc phát cực mạnh.
  - Pha 5 (Decay / Re-stealth t=0.8–1.2s): Lăng kính vỡ vụn thành các mảnh bụi quang học tím tản biến vào không khí, Kiko tiếp đất bằng 4 chi trong tư thế dã thú săn mồi.
hitbox:         Khóa chính xác 1 mục tiêu đơn cự ly 6.5m; áp dụng hiệu ứng choáng 0.8s ngay khi va chạm tại Pha 4.
animation:      Clip riêng `kiko_r`: Nhảy vút lên, phân thân 3 bóng, xả chuỗi trảo kích liên hoàn trên không và tiếp đất 4 chân lắt léo.
VFX layers:     Layer khóa mục tiêu (mắt lăng kính) -> Layer 3 bóng lướt -> Layer lồng giam quang học -> Layer cào xé bốc tia lửa tím -> Layer bụi quang học tản biến.
SFX:            Tiếng lăng kính rạn nứt -> Tiếng xé gió rít gầm -> Tiếng cào kim loại chói tai "XOẠC XOẠC" -> Âm thanh nổ vỡ quang học trầm đục.
material:       PBR Shader khúc xạ lăng kính tím huỳnh quang (Prismatic Glass / Refraction Shader).
camera read:    Cực kỳ rõ nét; ký hiệu mắt lăng kính trên đầu nạn nhân hiện rõ 0.2s giúp đồng đội kịp phản ứng; hiệu ứng cào xé gọn gàng không che khuất thanh máu.
performance:    Mảnh vỡ lăng kính tối đa 16 hạt GPU particles, tự thu hồi sau 0.6s; bảo đảm duy trì 60 FPS trong combat 5v5.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
