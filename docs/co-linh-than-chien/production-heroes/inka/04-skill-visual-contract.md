# 04 · Skill Visual Contract — #19 Inka (Mực Thư Pháp Tuyến Tính)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#19 / inka`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Vũ khí thực hiện:** Đại Thư Bút (Ancient Calligraphy Brush) cầm hai tay vung nét cọ.
- **Dạng tác động:** Đạn đạo mực nước phát quang tầm xa (Ranged Ink Projectile).
- **Animation cử động:** Inka vung cọ chéo từ phải sang trái trong $0.16\text{s}$, đầu cọ để lại vệt sáng đen óng ánh rồi bắn ra giọt mực.
- **Thời điểm phóng đạn (Release Frame):** Tại giây $0.16\text{s}$ của animation đòn đánh.
- **Hình thái đạn đạo (Projectile VFX):** Một giọt mực thư pháp hình thoi đen tuyền bọc viền vàng kim óng ánh, đường kính $0.35\text{m}$, bay với tốc độ $24\text{m/s}$. Đuôi đạn để lại vệt khói mực mờ và những hạt bụi vàng kim li ti rơi rụng.
- **Điểm tiếp xúc & Phản hồi va chạm (Impact Feedback):** Chạm mục tiêu giọt mực bung tóe thành vết loang thư pháp trên ngực địch, phát ra tiếng mực vẩy nhẹ "XOẸT..." thanh nhã.
- **SFX:** Tiếng cọ vung trong gió "VUỐT..." thanh mảnh và âm thanh va chạm như giọt mực đặc rơi trên mặt giấy lụa dày.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Vệt Mực Thư Pháp Tuyến Tính (`passive: ink_path`)
1. **Cast targeting:** Tự động kích hoạt khi thi triển chiêu Q và R.
2. **Preview khi giữ nút:** Không có (theo chỉ thị của Q/R).
3. **Telegraph trước khi tác động:** Không có.
4. **VFX thái & chất liệu:** Dải mực đen tuyền trải dài trên mặt sàn đấu, bề rộng $1.5\text{m}$, hai bên mép dải mực có đường viền chỉ thêu bằng bụi vàng kim lấp lánh (Gold-embroidered ink edge). Khói mực bốc lên mờ ảo $0.2\text{m}$ khỏi mặt đất. Đồng minh bước vào có luồng gió vàng quấn dưới gót chân; kẻ địch bước vào có các sợi mực đen quấn quanh cổ chân.
5. **Hit geometry server:** Khối hộp chữ nhật nằm ngang (OBB / Strip Zone) rộng $1.5\text{m}$, dài $8.5\text{m}$, cao $0.5\text{m}$.
6. **Collision:** Đi xuyên đơn vị, không cản trở di chuyển vật lý.
7. **Lifetime:** Tồn tại chính xác **4.0 giây** rồi mực khô mờ dần và biến mất trong $0.3\text{s}$.
8. **Damage/CC/Buff:** Tăng $20\%$ tốc chạy đồng minh, giảm $25\%$ tốc chạy kẻ địch.

### 2.2. Kỹ Năng Q — Thư Pháp Tuyến Kích (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line).
2. **Preview khi giữ nút:** Dải decal chỉ thị mũi tên dài $8.5\text{m}$, rộng $1.5\text{m}$ màu mực đen viền vàng kim trên mặt đất.
3. **Telegraph trước khi tác động:** Inka xoay người $90^\circ$ đưa đại bút ra sau lưng trong $0.15\text{s}$, ngòi cọ phát sáng rực rỡ tích tụ một khối mực đậm đặc.
4. **VFX thái & chất liệu:** Inka vung mạnh cọ phóng ra một luồng sóng mực cuồn cuộn bay thẳng ($28\text{m/s}$), đầu sóng hình ngọn bút lông xé toạc không khí, rải ngay một vệt mực đậm nét bám chặt xuống sàn đấu.
5. **Hit geometry server:** Khối trụ quét theo hướng (Capsule Sweep), bán kính $0.75\text{m}$ (bề rộng $1.5\text{m}$), chiều dài hành trình $8.5\text{m}$.
6. **Collision:** Gây sát thương và làm chậm mục tiêu đầu tiên trúng phải; vệt mực bên dưới trải đủ chiều dài $8.5\text{m}$.
7. **Lifetime:** Đạn bay tối đa $0.30\text{s}$; vệt mực tồn tại $4.0\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($65 - 205 + 0.65\text{AP}$) và làm chậm $25\%$ trong $1.2\text{s}$.

### 2.3. Kỹ Năng W — Mặc Thủy Hộ Thể (`skill_w`)
1. **Cast targeting:** Tự niệm tức thời quanh thân (Self PBAoE).
2. **Preview khi giữ nút:** Vòng tròn bán kính $3.0\text{m}$ quanh chân Inka.
3. **Telegraph trước khi tác động:** $0\text{s}$ windup (Kích hoạt tức thì).
4. **VFX thái & chất liệu:** Inka xoay nhẹ cổ tay, một vòng tròn mực thư pháp thư thái vẽ một đường khép kín $360^\circ$ quanh người, lập tức biến thành một quả cầu màng mực bán trong suốt bọc lấy cơ thể. Bề mặt quả cầu nổi các dòng cổ tự Cổ Linh xoay tròn bảo vệ; các giọt mực văng ra ngoài làm nhòe màn hình đối phương trong bán kính $3.0\text{m}$.
5. **Hit geometry server:** Hình trụ tròn bán kính $3.0\text{m}$, chiều cao $2.0\text{m}$ quanh Inka.
6. **Collision:** Không cản đường di chuyển.
7. **Lifetime:** Vòng xoay mực tồn tại $0.25\text{s}$; khiên bảo hộ tồn tại $2.5\text{s}$.
8. **Damage/CC/Buff:** Cấp khiên ($65 - 205 + 0.3\text{AP}$) cho Inka trong $2.5\text{s}$.

### 2.4. Kỹ Năng E — Giao Điểm Kích Nổ (`skill_e`)
1. **Cast targeting:** Vùng chọn hình tròn từ xa (Ground-Targeted Circle).
2. **Preview khi giữ nút:** Vòng tròn bán kính $4.0\text{m}$ có tâm chỉ định trong tầm $7.5\text{m}$.
3. **Telegraph trước khi tác động:** Inka cắm ngọn cọ xuống đất trong $0.15\text{s}$, mặt sàn tại vùng chọn nổi lên một ấn chú thư pháp hình bát quái mực đen nhấp nháy.
4. **VFX thái & chất liệu:** Các đoạn vệt mực nằm trong vùng bán kính $4.0\text{m}$ bừng sáng vàng kim dữ dội, sau đó bốc cháy thành các cột lửa mực đen bốc thẳng lên cao $2.5\text{m}$. Kẻ địch đứng trên mực bị các sợi xích mực trói chặt chân xuống sàn.
5. **Hit geometry server:** Hình trụ tròn bán kính $4.0\text{m}$ quét giao cắt với các OBB vệt mực hiện hữu.
6. **Collision:** Tác động toàn bộ mục tiêu địch nằm trên vùng giao cắt.
7. **Lifetime:** Vụ nổ diễn ra trong $0.2\text{s}$; hiệu ứng xích trói hiển thị trong $1.0\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($50 - 170 + 0.50\text{AP}$) và Trói Chân (Root) $1.0\text{s}$.

---

## 3. Đặc Tả 5 Pha Chiêu Cuối R — Thiên Địa Mặc Họa (Chuẩn Tài Liệu 79)

Kỹ năng R tuân thủ tuyệt đối cấu trúc 5 pha thời gian của chuẩn Ultimate:

```
[0.0s - 0.3s]        [0.3s]              [0.3s - 0.6s]           [0.6s - 4.0s]             [4.0s - 4.5s]
PHA 1: TELEGRAPH  -> PHA 2: CAST/RELEASE -> PHA 3: PEAK IMPACT -> PHA 4: LINGERING ZONE -> PHA 5: RECOVERY
Gồng đại bút,        Hạ bút chạm sàn,    Bùng nổ sơn thủy,       Đại trận mực 6.5m,        Mực tan biến,
ấn ký bừng sáng      sóng mực lan tỏa    sát thương cực đại      làm chậm & tăng tốc       hồi trạng thái
```

1. **Pha 1 — Telegraph & Windup (0.0s đến 0.3s):**
   - Inka bay vút lên cách mặt đất $1.2\text{m}$, hai tay giương cao cây Đại Thư Bút.
   - Tại vùng chỉ định bán kính $6.5\text{m}$, một vòng đại ấn chú thư pháp cổ bừng sáng với âm thanh gió rít và tiếng mực sôi sục. Kẻ địch có $0.3\text{s}$ phản xạ dùng Dash D để thoát khỏi rìa vòng tròn.
2. **Pha 2 — Cast & Release Frame (Tại giây 0.3s):**
   - Inka dộng mạnh ngòi cọ xuống không trung, một nhát dập uy lực phát ra tiếng nổ sấm rền "OÀNG...".
   - Luồng năng lượng mực thần giáng thẳng từ trên trời xuống tâm đại trận.
3. **Pha 3 — Peak Impact & Explosion (0.3s đến 0.6s):**
   - Vụ nổ mực sơn thủy cực đại bung tỏa bán kính $6.5\text{m}$. Các hình tượng núi non cổ kính, rồng mực và chữ cổ Cổ Linh dâng trào trong chớp mắt.
   - Gây toàn bộ sát thương phép ($180 - 380 + 0.85\text{AP}$) và áp dụng làm chậm $40\%$ lên toàn bộ kẻ địch trong vùng.
4. **Pha 4 — Lingering Zone & Field Control (0.6s đến 4.0s):**
   - Toàn bộ vùng $6.5\text{m}$ ngưng đọng thành một đầm mực thư pháp sống động óng ánh viền vàng kim kéo dài đúng $3.4\text{s}$ còn lại (tổng thời lượng 4.0s).
   - Vùng này kế thừa toàn bộ thuộc tính của nội tại `ink_path`: gia tốc đồng minh $+20\%$ và làm chậm kẻ địch $25\%$.
5. **Pha 5 — Recovery & End State (4.0s đến 4.5s):**
   - Đầm mực khô dần, các hạt bụi vàng kim thăng hoa bay lên trời rồi tan biến.
   - Inka hạ chân chạm đất, thu cọ về tư thế thủ thế bình thường.
