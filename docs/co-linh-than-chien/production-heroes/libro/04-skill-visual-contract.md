# 04 · Skill Visual Contract — #28 Libro (Sổ Nợ Nghiệp Báo)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#28 / libro`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Vũ khí thực hiện:** Cuốn Sổ Nợ Di Vật lơ lửng trước ngực bắn ra thẻ tre phiến đá.
- **Dạng tác động:** Đạn đạo phiến đá cổ tầm xa (Ranged Script Projectile).
- **Animation cử động:** Libro phẩy nhẹ tay phải, cuốn sách lật mở một trang, bắn ra một phiến đá thẻ tre xoay tròn trong gió.
- **Thời điểm phóng đạn (Release Frame):** Tại giây $0.15\text{s}$ của animation đòn đánh.
- **Hình thái đạn đạo (Projectile VFX):** Một phiến đá thẻ tre hình chữ nhật dài $0.4\text{m}$, phát sáng màu tím lam viền chữ cổ vàng kim, xoay tít và bay với tốc độ $24\text{m/s}$. Đuôi đạn để lại vệt mực tím mờ ảo.
- **Điểm tiếp xúc & Phản hồi va chạm (Impact Feedback):** Chạm mục tiêu găm vào ngực địch phát ra tia lửa cổ tự và tiếng va chạm khô giòn của phiến đá.
- **SFX:** Tiếng lật trang sách "XOẠT..." và tiếng đá chạm mục tiêu "CẮCH...".

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Sổ Nợ Nghiệp Báo (`passive: debt_ledger`)
1. **Cast targeting:** Kích hoạt tự động khi nhận hiệu ứng từ chiêu W hoặc R.
2. **Preview khi giữ nút:** Không có.
3. **Telegraph trước khi tác động:** Không có.
4. **VFX thái & chất liệu:** Mục tiêu được bảo vệ xuất hiện một biểu tượng **Cán Cân Nghiệp Báo (Scale of Karma)** màu tím phát quang trên đỉnh đầu. Đồng thời, thanh máu hiển thị một thanh Nợ Treo (Deferred Debt Bar) màu xám viền đỏ bên cạnh máu thực. Mỗi khi dính đòn, $70\%$ lượng máu bị mất biến thành thanh màu xám tăng dần; các con số nợ nảy lên màu tím sẫm.
5. **Hit geometry server:** Gắn trực tiếp lên Entity State của đối tượng.
6. **Collision:** Không có collision vật lý.
7. **Lifetime:** Cửa sổ hoãn nợ kéo dài **2.5 giây**; sát thương DoT đáo hạn kéo dài **3.0 giây**.
8. **Damage/CC/Buff:** Hoãn $70\%$ sát thương, chuyển thành DoT đáo hạn sau 2.5s.

### 2.2. Kỹ Năng Q — Trang Sử Trừng Phạt (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line).
2. **Preview khi giữ nút:** Dải decal mũi tên dài $8.5\text{m}$, rộng $1.4\text{m}$ màu tím chàm trên mặt đất.
3. **Telegraph trước khi tác động:** Libro đưa tay chém chéo trong $0.15\text{s}$, một phiến đá lớn tách khỏi cuốn sách xoay tít nạp linh khí.
4. **VFX thái & chất liệu:** Phiến đá cổ tự khổng lồ xé gió bay thẳng ($28\text{m/s}$), phát ra ánh sáng tím rực rỡ và các ký tự trừng phạt bay quanh thân đạn. Khi chạm địch, phiến đá vỡ vụn làm chậm mục tiêu.
5. **Hit geometry server:** Khối trụ quét theo hướng (Capsule Sweep), bán kính $0.7\text{m}$ (rộng $1.4\text{m}$), dài $8.5\text{m}$.
6. **Collision:** Dừng lại ở tướng hoặc quái đầu tiên trúng phải.
7. **Lifetime:** Bay tối đa $0.3\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($55 - 175 + 0.50\text{AP}$) và làm chậm $25\%$ trong $1.2\text{s}$.

### 2.3. Kỹ Năng W — Sổ Nợ Ký Ức (`skill_w`)
1. **Cast targeting:** Tự niệm tức thời diện rộng quanh thân (Self PBAoE Aura).
2. **Preview khi giữ nút:** Vòng tròn bán kính $6.0\text{m}$ quanh chân Libro.
3. **Telegraph trước khi tác động:** $0\text{s}$ windup (Kích hoạt tức thì).
4. **VFX thái & chất liệu:** Cuốn Đại Thư mở bung $360^\circ$, các phiến đá thẻ tre bay tỏa ra tạo thành một vòng tròn phong ấn bán kính $6.0\text{m}$. Toàn bộ đồng minh nhận được một lớp khiên ánh sáng tím lam có các cổ tự ghi chép bay lượn quanh người, lập tức hồi máu và kích hoạt thanh Nợ Treo.
5. **Hit geometry server:** Khối trụ tròn bán kính $6.0\text{m}$, chiều cao $2.5\text{m}$ quanh Libro.
6. **Collision:** Không cản đường di chuyển.
7. **Lifetime:** Vòng thẻ tre bung ra trong $0.3\text{s}$; khiên tồn tại $3.0\text{s}$; hoãn nợ $2.5\text{s}$.
8. **Damage/CC/Buff:** Cấp khiên ($75 - 235$), hồi máu ($40 - 140 + 0.25\text{AP}$) và hoãn $70\%$ sát thương.

### 2.4. Kỹ Năng E — Ân Hạn Nghiệp Báo (`skill_e`)
1. **Cast targeting:** Chọn 1 mục tiêu đồng minh từ xa (Targeted Cast).
2. **Preview khi giữ nút:** Vòng tròn chọn mục tiêu trong tầm $7.5\text{m}$.
3. **Telegraph trước khi tác động:** Libro chỉ tay về phía mục tiêu trong $0.1\text{s}$.
4. **VFX thái & chất liệu:** Một cuộn thư cổ bằng lụa tím mạ vàng bay vút tới bọc quanh thân đồng minh. Cuộn thư bung nở giải phóng luồng linh khí thanh tẩy, thanh Nợ Treo màu xám trên đầu đồng minh rút ngắn lại rõ rệt, kèm theo hiệu ứng tăng tốc luồng gió vàng quanh chân.
5. **Hit geometry server:** Khối cầu đơn mục tiêu tại vị trí đồng minh chỉ định.
6. **Collision:** Đi thẳng tới mục tiêu, không thể bị cản bởi vật chắn.
7. **Lifetime:** Cuộn thư bao bọc trong $0.3\text{s}$; tăng tốc tồn tại $1.5\text{s}$.
8. **Damage/CC/Buff:** Hồi máu ($50 - 170 + 0.35\text{AP}$), khấu trừ Nợ Treo và tăng tốc $25\%$.

---

## 3. Đặc Tả 5 Pha Chiêu Cuối R — Chung Quyết Phán Thư (Chuẩn Tài Liệu 79)

Kỹ năng R tuân thủ tuyệt đối cấu trúc 5 pha thời gian của chuẩn Ultimate:

```
[0.0s - 0.25s]       [0.25s]             [0.25s - 0.5s]          [0.5s - 3.5s]             [3.5s - 4.0s]
PHA 1: TELEGRAPH  -> PHA 2: CAST/RELEASE -> PHA 3: PEAK IMPACT -> PHA 4: LINGERING ZONE -> PHA 5: RECOVERY
Mở đại thư cực đại,  Đập trang sách,     Đại kết giới bừng nổ,   Thao trường phán thư 6.5m,Thu thẻ tre,
cổ tự tím bao phủ    chấn động sàn đấu   hồi phục & đại khiên    làm chậm kẻ địch          thu về trạng thái
```

1. **Pha 1 — Telegraph & Windup (0.0s đến 0.25s):**
   - Libro bay vút lên cao $1.0\text{m}$, cuốn sách phóng to gấp 3 lần, các trang sách đá lật mở điên cuồng phát ra tiếng sấm rền cổ xưa.
   - Vùng bán kính $6.5\text{m}$ dưới chân xuất hiện một ấn trận vòng tròn bát quái phán quyết rực rỡ.
2. **Pha 2 — Cast & Release Frame (Tại giây 0.25s):**
   - Hai tay Libro chắp lại đập mạnh hai trang sách vào nhau, phát ra tiếng sấm sét "ĐÙNG..." chấn động toàn bộ chiến trường.
3. **Pha 3 — Peak Impact & Surge (0.25s đến 0.5s):**
   - Một cột sóng xung kích cổ tự màu tím lam giáng xuống tâm kết giới bán kính $6.5\text{m}$.
   - Toàn bộ đồng minh nhận ngay lượng hồi máu lớn ($90 - 210 + 0.30\text{AP}$), lớp khiên đại trào vững chắc ($110 - 230$) và trạng thái Sổ Nợ hoãn $70\%$ sát thương.
   - Toàn bộ kẻ địch bị chấn động làm chậm $35\%$ trong $2.0\text{s}$.
4. **Pha 4 — Lingering Zone & Field Control (0.5s đến 3.5s):**
   - Kết giới đại thư duy trì trong $3.0\text{s}$: Các dòng cổ tự phán quyết bay lượn dày đặc như một mái vòm bảo vệ, tiếp tục duy trì trạng thái hoãn nợ cho bất kỳ đồng minh nào đứng trong vùng.
5. **Pha 5 — Recovery & End State (3.5s đến 4.0s):**
   - Mái vòm cổ tự tan biến, cuốn sách thu nhỏ lại kích thước bình thường.
   - Libro từ từ hạ chân xuống bệ đá Tinh Thạch, trở về trạng thái sẵn sàng chiến đấu.
