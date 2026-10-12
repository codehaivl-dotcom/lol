# 04 · Skill Visual Contract — #31 Moka (Hổ Nấm Răng Kiếm)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#31 / moka`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** **Đôi Răng Kiếm & Móng Vuốt Dã Thú Tiền Sử** (`sabretooth_fangs` & `fossil_claws`).
- **Dạng tác động:** Cận chiến cào cắn xé rách cự ly gần ($1.8\text{m}$).
- **Quy cách diễn hoạt & Vệt đánh:**
  - *Animation:* Moka chồm nhẹ hai chân trước, vuốt phải cào vát chéo từ trên xuống $\rightarrow$ hàm răng kiếm đớp nhanh vào thân mục tiêu; đầu lắc nhẹ tạo lực cắn dứt khoát.
  - *Thời điểm trúng đòn (HIT frame):* Tại giây $0.12\text{s}$ (Frame 4 của clip $0.5\text{s}$).
  - *Vệt chuyển động (Weapon Trail):* Vệt móng cào màu vàng cam huỳnh quang và các đốm phấn bào tử rơi lả tả.
  - *SFX:* Tiếng vuốt dã thú xé rách thịt "XOẸT" và tiếng răng nanh va chạm giòn giã.
- **Phản hồi khi Vồ Mồi Nội Tại (Spore Pounce Proc):**
  - Khi Moka vồ mồi từ xa $7.0\text{m}$: Thân Moka phóng vút đi để lại một vệt bụi nấm màu cam rực rỡ kéo dài; cú tiếp đất gây chấn động nhẹ và nổ tung đám bụi bào tử vàng cam quanh con mồi kèm âm thanh "KHÈ RÍT" hung hãn.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Bào Tử Phóng Thích (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line Missile).
2. **Preview khi giữ nút:** Dải chữ nhật màu cam nhạt dài $6.5\text{m}$, rộng $1.4\text{m}$ trên sàn đấu.
3. **Telegraph trước tác động:** Đuôi chổi của Moka dựng đứng lên, xoay vòng lấy đà trong $0.1\text{s}$; các tán nấm trên đuôi phát sáng rực rỡ.
4. **VFX thái & chất liệu:** Một chùm đạn gồm 3 quả cầu bào tử nấm màu vàng cam xoắn ốc vào nhau lao vút đi với vận tốc $28\text{ m/s}$; khi trúng mục tiêu, chùm bào tử vỡ tung tạo thành một đám mây nấm nhỏ bám chặt lấy con mồi.
5. **Hit geometry server:** Khối hộp di động dài $6.5\text{m} \times$ rộng $1.4\text{m}$.
6. **Collision:** Trúng đơn vị đầu tiên thì dừng lại và bung hiệu ứng; xuyên qua lính nhỏ nếu có nâng cấp hoặc chạm tướng địch.
7. **Lifetime:** Đạn bay tối đa $0.23\text{s}$.
8. **Damage/CC:** Sát thương vật lý, làm chậm $25\%$ trong $1.2\text{s}$ và gắn icon nấm phát sáng trên đầu nạn nhân trong $4.0\text{s}$.

### 2.2. Kỹ Năng W — Ẩn Tích Bào Quang (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Vòng hào quang nhỏ quanh chân Moka.
3. **Telegraph:** $0\text{s}$ gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Moka gầm khẽ, các tán nấm trên lưng bùng nổ một làn sóng bào tử xanh lục bảo - vàng cam bao phủ quanh thân tạo thành một lớp khiên nấm hữu cơ; 4 chân bốc khói bào tử tăng tốc di chuyển.
5. **Hit geometry:** Khối cầu bán kính $1.2\text{m}$ quanh thân Moka.
6. **Collision:** Không cản đạn đạo; tăng tốc độ lướt di chuyển.
7. **Lifetime:** Khiên tồn tại $2.5\text{s}$.
8. **Damage/CC:** Hấp thụ sát thương theo chỉ số khiên.

### 2.3. Kỹ Năng E — Toái Cốt Trảm Kích (`skill_e`)
1. **Cast targeting:** Tỏa tròn quanh thân (Point Blank AoE Area).
2. **Preview:** Vòng tròn bán kính $3.2\text{m}$ quanh chân Moka.
3. **Telegraph:** Moka hạ thấp trọng tâm, xoay mình gồng vuốt trong $0.1\text{s}$.
4. **VFX thái & chất liệu:** Moka xoay tròn 4 chi quét móng vuốt tạo thành 2 vòng cung lưỡi cào xé màu đỏ cam rực lửa; mặt đất nứt rạn rải rác các chùm nấm nhỏ mọc lên tức thì.
5. **Hit geometry:** Khối trụ tròn bán kính $3.2\text{m}$, chiều cao $1.5\text{m}$.
6. **Collision:** Đi xuyên mọi đơn vị.
7. **Lifetime:** Quét hoàn tất trong $0.2\text{s}$.
8. **Damage/CC:** Sát thương vật lý và làm chậm $35\%$ trong $1.0\text{s}$.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Mãnh Hổ Tuyệt Sát (Chuẩn Tài Liệu 79)

```yaml
R · Mãnh Hổ Tuyệt Sát · moka
fantasy:        Moka phát ra tiếng gầm rợn gáy của kẻ săn mồi tiền sử, phóng vút người qua khoảng cách khổng lồ 7.0m, vồ sập mục tiêu xuống đất và cắn ngập đôi răng kiếm vào gáy đối thủ gây sát thương bộc phát cực đại.
kit:            aim: single_target | range: 7.0m | dash: 7.0m | windup: 0.25s | stun: 0.8s | physical burst execution
phases:
  - Pha 1 (Primal Roar / Windup t=0.0–0.25s): Moka ngửa cổ gầm vang tiếng rống săn mồi rợn gáy (SFX truyền toàn bản đồ cự ly 15m); trên đầu con mồi xuất hiện dấu ấn nanh kiếm đan chéo màu đỏ rực cảnh báo.
  - Pha 2 (Apex Pounce Leap t=0.25–0.5s): Moka đạp mạnh mặt đất làm vỡ sàn đấu, phóng vút lên không trung với vận tốc cực nhanh 30 m/s bay qua khoảng cách tới 7.0m; thân hổ được bao bọc bởi vệt khí động học màu cam bào tử.
  - Pha 3 (Impact Takedown t=0.5s): Moka tiếp đất đè sập hai chân trước lên vai con mồi, ghì chặt mục tiêu xuống sàn đấu; một làn sóng chấn động bụi nấm màu cam nổ tung cự ly 2.5m quanh điểm va chạm.
  - Pha 4 (Fang Execution Flurry t=0.5–0.8s): Moka cắn ngập đôi răng kiếm vào cổ mục tiêu, lắc mạnh hàm xé toạc sinh lực đối thủ; mục tiêu bị choáng 0.8s và nhận trọn sát thương bộc phát khổng lồ.
  - Pha 5 (Predator Stance Recovery t=0.8–1.1s): Moka nhả mồi, lùi một bước ngắn về tư thế 4 chân cảnh giác, hai răng kiếm nhỏ giọt dịch huỳnh quang màu cam; bụi nấm lắng dần.
hitbox:         Khóa chính xác 1 mục tiêu đơn cự ly 7.0m; áp dụng hiệu ứng làm choáng 0.8s ngay khi tiếp đất tại Pha 3.
animation:      Clip riêng `moka_r_pounce`: Gầm rống lấy đà, phóng bổng người trên không, đè sập con mồi cắn ngập nanh kiếm và lùi lại cảnh giác.
VFX layers:     Layer icon nanh kiếm cảnh báo -> Layer vệt bay khí động học cam -> Layer sóng chấn động tiếp đất -> Layer vết cắn xé máu & bào tử tóe ra -> Layer bụi nấm lắng đọng.
SFX:            Tiếng gầm hổ gầm rợn tóc gáy -> Tiếng xé gió rít lao tới -> Tiếng va chạm cơ thể nặng nề "UỴCH" -> Tiếng nanh kiếm găm ngập "PHẬP" sắc lẹm.
material:       PBR Shader bào tử huỳnh quang cam + Shader nanh ngà phát sáng mờ.
camera read:    Độ đọc cực kỳ rõ ràng; dấu ấn nanh kiếm đỏ trên đầu con mồi hiện rõ 0.25s trước khi bay giúp người chơi nhận biết ngay việc mình đang bị săn mồi.
performance:    Hiệu ứng bụi nấm tối đa 20 hạt GPU particles, tự thu hồi sau 0.6s; duy trì ổn định 60 FPS trong mọi tình huống giao tranh.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
