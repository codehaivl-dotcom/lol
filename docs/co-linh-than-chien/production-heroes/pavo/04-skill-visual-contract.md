# 04 · Skill Visual Contract — #35 Pavo (Khổng Tước Quạt Mắt Dọa Sợ)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#35 / pavo`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Vũ khí thực hiện:** Quạt đuôi cơ khí tách phóng lông vũ quang học.
- **Dạng tác động:** Đạn đạo lông vũ quang học tầm xa (Ranged Optical Feather Projectile).
- **Animation cử động:** Pavo nghiêng người quý phái, tay phải phẩy nhẹ về phía trước, một phiến lông vũ kim loại từ đuôi phóng vút đi.
- **Thời điểm phóng đạn (Release Frame):** Tại giây $0.15\text{s}$ của animation đòn đánh.
- **Hình thái đạn đạo (Projectile VFX):** Một phiến lông vũ kim loại mạ vàng dài $0.45\text{m}$, phát sáng màu xanh ngọc bích óng ánh viền tím, bay với tốc độ $26\text{m/s}$. Đuôi đạn để lại vệt sáng quang học lấp lánh (optical trail).
- **Điểm tiếp xúc & Phản hồi va chạm (Impact Feedback):** Chạm mục tiêu găm vào ngực địch phát ra chùm tia sáng ngũ sắc và tiếng kim loại xé gió đanh thép.
- **SFX:** Tiếng kim loại cơ khí "XOẸT..." sắc lẹm và tiếng kính vỡ "KENG..." thanh nhã khi chạm đích.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Khổng Tước Quạt Mắt Dọa Sợ (`passive: peacock_gaze`)
1. **Cast targeting:** Kích hoạt tự động khi thi triển chiêu W.
2. **Preview khi giữ nút:** Vòng tròn bán kính $5.5\text{m}$ quanh Pavo; kèm hình nón $180^\circ$ phía trước mặt biểu thị vùng nhìn trực diện.
3. **Telegraph trước khi tác động:** Tại $0.05\text{s}$ trước khi phát tác, các mắt trên quạt đuôi chớp sáng chói lòa kèm âm thanh cơ khí mở thấu kính "CLACK-CLACK-CLACK!".
4. **VFX thái & chất liệu:** 24 con mắt quang học trên đuôi đồng loạt mở trừng, phóng ra hàng loạt chùm tia sáng tím thôi miên (Hypnotic Magenta Cones) quét qua không gian. Kẻ địch đối diện bị một con mắt quang học lớn màu tím lơ lửng trên đỉnh đầu (Fear Mark), hoảng loạn ôm mặt quay đầu chạy ngược. Kẻ địch quay lưng có làn gió xanh ngọc lướt qua vai (Evaded Glance).
5. **Hit geometry server:** Khối trụ tròn bán kính $5.5\text{m}$ kết hợp kiểm tra tích vô hướng $\vec{F}_{\text{target}} \cdot \vec{V}_{\text{to\_pavo}} > 0.707$.
6. **Collision:** Đi xuyên mọi đơn vị; ngắt chiêu lướt của mục tiêu bị dính Fear.
7. **Lifetime:** Đợt chớp mắt diễn ra trong $0.2\text{s}$; hiệu ứng Fear kéo dài **1.2 giây**.
8. **Damage/CC/Buff:** Hoảng Sợ (Fear / Flee) $1.2\text{s}$ kẻ địch đối diện; làm chậm $35\%$ kẻ địch quay lưng.

### 2.2. Kỹ Năng Q — Kim Vũ Tiễn (`skill_q`)
1. **Cast targeting:** Bắn hình quạt đa tia (Fan Projectiles).
2. **Preview khi giữ nút:** Hình nón 3 nan quạt góc $35^\circ$, tầm xa $8.0\text{m}$ trên mặt đất.
3. **Telegraph trước khi tác động:** Pavo xoay người $90^\circ$ đưa quạt đuôi ra trước trong $0.15\text{s}$, 3 phiến lông vũ lớn phát sáng vàng rực.
4. **VFX thái & chất liệu:** 3 phiến lông vũ cơ khí khổng lồ xé toạc không khí bay theo 3 hướng hình quạt ($30\text{m/s}$), mỗi phiến dài $1.2\text{m}$ phát quang xanh ngọc bích viền vàng kim. Khi chạm mục tiêu, đạn phát nổ thành chùm tia lông vũ nhỏ làm chậm đối thủ.
5. **Hit geometry server:** 3 khối hộp Capsule bay theo 3 véc-tơ góc $-17.5^\circ, 0^\circ, +17.5^\circ$, tầm xa $8.0\text{m}$.
6. **Collision:** Xuyên qua lính, dừng lại ở tướng đầu tiên trúng mỗi tia.
7. **Lifetime:** Bay tối đa $0.27\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($65 - 205 + 0.65\text{AP}$) và làm chậm $25\%$ trong $1.0\text{s}$.

### 2.3. Kỹ Năng W — Khai Mạc Khổng Tước (`skill_w`)
1. **Cast targeting:** Tự niệm tức thời diện rộng quanh thân (Self PBAoE Aura).
2. **Preview khi giữ nút:** Vòng tròn bán kính $5.5\text{m}$ quanh chân Pavo.
3. **Telegraph trước khi tác động:** $0\text{s}$ windup (Kích hoạt tức thì).
4. **VFX thái & chất liệu:** Toàn bộ bộ quạt đuôi cơ khí bung xòe $180^\circ$ thành một bức bình phong kim loại lộng lẫy phía sau lưng Pavo. Bản thân Pavo nhận một lớp màng khiên năng lượng hình lông công phát quang bao bọc quanh người; đồng thời kích hoạt hiệu ứng quạt mắt dọa sợ nội tại.
5. **Hit geometry server:** Khối trụ tròn bán kính $5.5\text{m}$, chiều cao $2.5\text{m}$ quanh Pavo.
6. **Collision:** Không cản đường di chuyển.
7. **Lifetime:** Quạt xòe bung trong $0.4\text{s}$; khiên tồn tại $2.5\text{s}$.
8. **Damage/CC/Buff:** Cấp khiên ($65 - 205 + 0.3\text{AP}$) và kích hoạt Fear 1.2s.

### 2.4. Kỹ Năng E — Huyễn Ảnh Quang Tráo (`skill_e`)
1. **Cast targeting:** Vùng chọn hình tròn từ xa (Ground-Targeted Circle).
2. **Preview khi giữ nút:** Vòng tròn bán kính $3.8\text{m}$ trong tầm $7.0\text{m}$.
3. **Telegraph trước khi tác động:** Pavo búng tay trong $0.15\text{s}$, một điểm sáng hội tụ tại vị trí chỉ định.
4. **VFX thái & chất liệu:** Một quả cầu gương quang học khổng lồ xuất hiện trên không trung, phản chiếu méo mó hình ảnh chiến trường (mirror distortion shader), sau đó vỡ tan thành hàng trăm mảnh kính ánh sáng dội xuống sàn đấu, gây sát thương và làm chậm đối thủ.
5. **Hit geometry server:** Khối trụ tròn bán kính $3.8\text{m}$, chiều cao $3.0\text{m}$.
6. **Collision:** Tác động toàn bộ mục tiêu trong vùng.
7. **Lifetime:** Xuất hiện và vỡ tan trong $0.25\text{s}$; vùng làm chậm duy trì $1.2\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($50 - 170 + 0.50\text{AP}$) và làm chậm $30\%$ trong $1.2\text{s}$.

---

## 3. Đặc Tả 5 Pha Chiêu Cuối R — Vạn Nhãn Thôi Miên (Chuẩn Tài Liệu 79)

Kỹ năng R tuân thủ tuyệt đối cấu trúc 5 pha thời gian của chuẩn Ultimate:

```
[0.0s - 0.25s]       [0.25s]             [0.25s - 0.45s]         [0.45s - 2.0s]            [2.0s - 2.5s]
PHA 1: TELEGRAPH  -> PHA 2: CAST/RELEASE -> PHA 3: PEAK IMPACT -> PHA 4: LINGERING ZONE -> PHA 5: RECOVERY
Quạt đuôi vươn cao,  Chớp sáng cực đại,  Sóng laser vạn mắt,     Vùng ánh sáng thôi miên,  Xếp quạt đuôi,
nạp năng lượng quang chấn động không gian làm choáng 0.8s toàn đội duy trì sát thương & mờ   thu về trạng thái
```

1. **Pha 1 — Telegraph & Windup (0.0s đến 0.25s):**
   - Pavo nhón chân xoay một vòng tròn quý tộc, bộ quạt đuôi cơ khí vươn cao cực đại cao $2.5\text{m}$ phủ bóng xuống sàn.
   - 24 thấu kính mắt công nạp năng lượng phát ra tiếng rít cơ khí tần số cao và ánh sáng tím lục chói lòa. Vùng bán kính $6.0\text{m}$ quanh Pavo hiện viền hoa văn lông công cảnh báo.
2. **Pha 2 — Cast & Release Frame (Tại giây 0.25s):**
   - Pavo giang rộng hai tay, toàn bộ 24 thấu kính phát nổ một luồng chớp sáng cực đại (Flashbang Flash).
3. **Pha 3 — Peak Impact & Stun Pulse (0.25s đến 0.45s):**
   - Chùm sóng laser vạn mắt quét qua bán kính $6.0\text{m}$.
   - Toàn bộ kẻ địch trong vùng bị lóa mắt, nhận toàn bộ sát thương phép bộc phát ($180 - 380 + 0.85\text{AP}$) và bị **Làm Choáng (Stun) 0.8 giây** (bất kể hướng nhìn).
4. **Pha 4 — Lingering Zone & Afterglow (0.45s đến 2.0s):**
   - Mặt đất trong bán kính $6.0\text{m}$ tiếp tục phát sáng các hoa văn quang học ma mị kéo dài $1.5\text{s}$, làm giảm tầm nhìn của kẻ địch và duy trì trạng thái lóa sáng.
5. **Pha 5 — Recovery & End State (2.0s đến 2.5s):**
   - Quạt đuôi từ từ khép lại thành thế tà áo choàng kim loại sau lưng.
   - Pavo cúi chào nhẹ nhàng với nụ cười ngạo nghễ, trở về trạng thái chiến đấu bình thường.
