# 04 · Skill Visual Contract — #37 Mok (Trinh Sát Cổ Đăng Tác Chiến)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#37 / mok`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Vũ khí thực hiện:** Nhánh cây sau lưng rung chuyển, bắn ra hạt huỳnh quang.
- **Dạng tác động:** Đạn đạo hạt phấn huỳnh quang tầm xa (Ranged Phosphor Spore Projectile).
- **Animation cử động:** Mok khom người gật nhẹ về phía trước trong $0.15\text{s}$, ngọn Cổ Đăng trên vai lắc nhẹ bắn ra một quả cầu phấn hoa phát sáng.
- **Thời điểm phóng đạn (Release Frame):** Tại giây $0.15\text{s}$ của animation đòn đánh.
- **Hình thái đạn đạo (Projectile VFX):** Một hạt tinh thạch huỳnh quang tròn màu vàng hổ phách viền xanh lục (đường kính $0.3\text{m}$), bay với tốc độ $22\text{m/s}$. Đuôi đạn để lại vệt bụi lân tinh lấp lánh rơi rụng trong gió.
- **Điểm tiếp xúc & Phản hồi va chạm (Impact Feedback):** Chạm mục tiêu vỡ ra thành chùm tia sáng huỳnh quang nhỏ kèm âm thanh lách tách như hạt gỗ nổ giòn.
- **SFX:** Tiếng gỗ gõ nhẹ "CỐC..." và tiếng lách tách "TÁCH..." của phấn hoa phát sáng.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Cổ Đăng Tác Chiến (`passive: lantern_beacon`)
1. **Cast targeting:** Kích hoạt tự động khi Q tiếp đất.
2. **Preview khi giữ nút:** Vòng tròn bán kính $6.0\text{m}$ màu vàng hổ phách hiển thị quanh vị trí cắm dự kiến.
3. **Telegraph trước khi tác động:** Không có (theo đạn ném Q).
4. **VFX thái & chất liệu:** Chiếc Cổ Đăng bằng gỗ hóa thạch cắm vững trên mặt đất, cao $0.9\text{m}$. Từ lồng đèn tỏa ra một vòm ánh sáng huỳnh quang mờ ảo màu vàng hổ phách bán kính $6.0\text{m}$ xua tan sương mù chiến tranh. Bất kỳ kẻ địch nào trong vùng đều có viền hào quang phát quang (True Sight Reveal Outline) quanh thân. Khi bị tiêu thụ qua chiêu W: Đèn phát sáng chói lòa trong $0.2\text{s}$ rồi nổ tung thành một vòng sóng chấn huỳnh quang lan tỏa bán kính $6.0\text{m}$.
5. **Hit geometry server:** Khối trụ tròn bán kính $6.0\text{m}$, chiều cao $4.0\text{m}$ quanh ngọn đèn.
6. **Collision:** Có collider vật lý nhỏ ($r = 0.3\text{m}$) nhận 2 đòn đánh thường của địch; không chặn lính hay người đi qua.
7. **Lifetime:** Tồn tại tối đa **8.0 giây** nếu không bị phá hoặc bị tiêu thụ.
8. **Damage/CC/Buff:** Khi nổ: Làm chậm $30\%$ kẻ địch trong 1.5s; hồi 50 HP cho đồng minh.

### 2.2. Kỹ Năng Q — Cắm Cổ Đăng (`skill_q`)
1. **Cast targeting:** Định hướng ném vật thể theo đường cong (Lobbed Skillshot Projectile).
2. **Preview khi giữ nút:** Đường đạn vòng cung và vòng tròn chỉ thị điểm tiếp đất bán kính $1.4\text{m}$ trong tầm $8.0\text{m}$.
3. **Telegraph trước khi tác động:** Mok với tay ra sau lưng gỡ ngọn đèn trong $0.15\text{s}$, nhánh cây vung mạnh ném đèn đi.
4. **VFX thái & chất liệu:** Chiếc đèn lồng xoay tít trên không trung bay theo quỹ đạo parabol ($26\text{m/s}$), để lại vệt sáng vàng cam. Khi tiếp đất, đèn dộng mạnh xuống sàn đá làm bắn tung bụi đất và lập tức bừng sáng vùng hào quang nội tại.
5. **Hit geometry server:** Hình cầu va chạm bán kính $0.7\text{m}$ (bề rộng $1.4\text{m}$) bay theo quỹ đạo parabol tới điểm chạm.
6. **Collision:** Gây sát thương và làm chậm mục tiêu trên đường rơi; cắm cố định tại điểm tiếp đất.
7. **Lifetime:** Bay trong $0.3\text{s}$; cắm trên sàn $8.0\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($50 - 170 + 0.45\text{AP}$) và làm chậm $25\%$ trong $1.2\text{s}$ nếu ném trúng mục tiêu.

### 2.3. Kỹ Năng W — Huỳnh Quang Hộ Mệnh (`skill_w`)
1. **Cast targeting:** Tự niệm tức thời diện rộng quanh thân (Self PBAoE Aura).
2. **Preview khi giữ nút:** Vòng tròn bán kính $5.5\text{m}$ quanh chân Mok.
3. **Telegraph trước khi tác động:** $0\text{s}$ windup (Kích hoạt tức thì).
4. **VFX thái & chất liệu:** Mok dậm chân, từ nhánh cây sau lưng bùng nổ một luồng sóng sáng huỳnh quang xanh lục vàng bán kính $5.5\text{m}$. Bản thân Mok và toàn bộ đồng minh trong vùng được bao bọc bởi một lớp khiên ánh sáng gỗ hổ phách có hoa văn vân gỗ cổ thụ, đồng thời các hạt lân tinh dâng lên hồi phục máu. Đồng thời, Cổ Đăng trên sân phát nổ đồng bộ.
5. **Hit geometry server:** Khối trụ tròn bán kính $5.5\text{m}$, chiều cao $2.5\text{m}$ quanh Mok.
6. **Collision:** Không cản đường di chuyển.
7. **Lifetime:** Sóng huỳnh quang lan tỏa trong $0.3\text{s}$; khiên tồn tại $3.0\text{s}$.
8. **Damage/CC/Buff:** Cấp khiên ($65 - 185$) và hồi máu ($45 - 145 + 0.25\text{AP}$) cho đồng minh.

### 2.4. Kỹ Năng E — Đăng Mộc Triền Nhiễu (`skill_e`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line).
2. **Preview khi giữ nút:** Dải decal chỉ thị đường thẳng dài $7.0\text{m}$, rộng $1.6\text{m}$ trên mặt đất.
3. **Telegraph trước khi tác động:** Mok cắm hai tay xuống đất trong $0.15\text{s}$, mặt sàn trước mũi chân nứt toác.
4. **VFX thái & chất liệu:** Một chùm rễ cây cổ thụ gỗ hóa thạch bò trườn cực nhanh dưới mặt đất xới tung đất đá ($24\text{m/s}$). Khi chạm kẻ địch đầu tiên, rễ cây trồi lên quấn chặt từ mắt cá chân lên đùi mục tiêu, phát sáng huỳnh quang xanh rêu.
5. **Hit geometry server:** Khối trụ quét theo hướng (Capsule Sweep), bán kính $0.8\text{m}$ (rộng $1.6\text{m}$), dài $7.0\text{m}$.
6. **Collision:** Dừng lại ở tướng hoặc lính địch đầu tiên trúng phải.
7. **Lifetime:** Hành trình bay tối đa $0.3\text{s}$; hiệu ứng rễ trói tồn tại $1.0\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($45 - 145 + 0.35\text{AP}$) và Trói Chân (Root) $1.0\text{s}$.

---

## 3. Đặc Tả 5 Pha Chiêu Cuối R — Vạn Thảo Quang Minh (Chuẩn Tài Liệu 79)

Kỹ năng R tuân thủ tuyệt đối cấu trúc 5 pha thời gian của chuẩn Ultimate:

```
[0.0s - 0.25s]       [0.25s]             [0.25s - 0.5s]          [0.5s - 3.5s]             [3.5s - 4.0s]
PHA 1: TELEGRAPH  -> PHA 2: CAST/RELEASE -> PHA 3: PEAK IMPACT -> PHA 4: LINGERING ZONE -> PHA 5: RECOVERY
Tích lũy quang năng, Bung ngọn đại đăng, Sóng huỳnh quang cực đại,Đại trận ánh sáng 6.5m, Ánh sáng lắng đọng,
rễ cây bừng sáng     chiếu rọi toàn vùng  hồi máu & bọc khiên     làm chậm kẻ địch          thu về trạng thái
```

1. **Pha 1 — Telegraph & Windup (0.0s đến 0.25s):**
   - Mok gập người sâu xuống đất, chiếc Cổ Đăng trên lưng bừng nở như đóa hoa sen gỗ cổ đại, các bánh răng cơ khí xoay tít rít lên âm thanh nạp năng lượng huỳnh quang.
   - Vòng tròn bán kính $6.5\text{m}$ quanh Mok hiện viền cổ tự thực vật phát sáng.
2. **Pha 2 — Cast & Release Frame (Tại giây 0.25s):**
   - Mok ngửa người phóng thẳng một cột sáng huỳnh quang chói lòa lên bầu trời, tiếng chuông gỗ ngân vang dội "BOONG...".
3. **Pha 3 — Peak Impact & Surge (0.25s đến 0.5s):**
   - Một đợt sóng xung kích huỳnh quang cực đại dội từ trên trời xuống, quét qua bán kính $6.5\text{m}$.
   - Toàn bộ đồng minh nhận ngay lượng hồi máu khổng lồ ($120 - 260 + 0.40\text{AP}$) và bọc một lớp khiên đại trận dày ($80 - 180$).
   - Kẻ địch trong vùng bị dính chấn động làm chậm ngay $35\%$.
4. **Pha 4 — Lingering Zone & Field Control (0.5s đến 3.5s):**
   - Mặt đất trong bán kính $6.5\text{m}$ biến thành một thảm cỏ huỳnh quang phát sáng rực rỡ kéo dài $3.0\text{s}$.
   - Kẻ địch bước trong thảm cỏ bị làm chậm liên tục $35\%$, không thể tàng hình; đồng minh được duy trì lớp khiên đại trận.
5. **Pha 5 — Recovery & End State (3.5s đến 4.0s):**
   - Thảm cỏ huỳnh quang tan thành các đốm đom đóm ánh sáng bay lên không trung.
   - Mok đứng thẳng dậy, ngọn đèn sau lưng thu gọn lại trạng thái bảo vệ ban đầu.
