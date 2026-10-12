# 04 · Skill Visual Contract — #48 Oneira (Mộng Thể Mặt Nạ Hút Khống Chế)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#48 / oneira`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Vũ khí thực hiện:** Mặt Nạ Gốm Hai Mặt và làn khói mộng cảnh.
- **Dạng tác động:** Đạn đạo khói mộng cảnh tầm xa (Ranged Dream Smoke Projectile).
- **Animation cử động:** Oneira xoay nhẹ thân mình khói mờ, chiếc mặt nạ nghiêng một góc $30^\circ$, từ miệng mặt nạ nhả ra một quả cầu khói tím phát quang bay vút đi.
- **Thời điểm phóng đạn (Release Frame):** Tại giây $0.15\text{s}$ của animation đòn đánh.
- **Hình thái đạn đạo (Projectile VFX):** Một quả cầu sương khói tím nhạt viền bột sao vàng kim (đường kính $0.35\text{m}$), bay với tốc độ $24\text{m/s}$. Đuôi đạn để lại vệt khói xoáy mộng ảo lượn sóng.
- **Điểm tiếp xúc & Phản hồi va chạm (Impact Feedback):** Chạm mục tiêu bung tan thành làn sương mờ ảo bao phủ ngực kẻ địch kèm âm thanh gió ngân thì thầm.
- **SFX:** Tiếng gió thở dài êm dịu "VÙ..." và tiếng ngân chuông pha lê mờ ảo "KENG...".

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Mộng Thể Mặt Nạ Hút Khống Chế (`passive: cc_absorb_transmute`)
1. **Cast targeting:** Kích hoạt tự động khi thi triển W.
2. **Preview khi giữ nút:** Không có (theo dải chỉ thị của W).
3. **Telegraph trước khi tác động:** Không có (kích hoạt tức thì khi W bấm).
4. **VFX thái & chất liệu:**
   - **Giai đoạn Hút (0.0s):** Mặt nạ khóc xoay về phía trước bừng sáng ánh xanh đen u uất. Một luồng khói đen xoáy (Curse Vortex) phóng thẳng từ cơ thể đồng minh bị khống chế vào miệng mặt nạ; các xiềng xích đỏ hoặc ký hiệu Stun trên đầu đồng minh vỡ tan biến.
   - **Giai đoạn Chuyển Hóa (0.0s - 2.0s):** Thân khói của Oneira ngưng tụ đậm đặc màu tím sẫm, các tia điện đen xoay quanh mặt nạ biểu thị năng lượng tiêu cực đang bị giam hãm.
   - **Giai đoạn Bùng Nổ Phúc Lành (2.0s):** Mặt nạ xoay $180^\circ$ đưa mặt cười rạng rỡ ra trước, phát nổ một làn sóng ánh sáng vàng kim tinh khiết (Awakening Radiance) bán kính $6.0\text{m}$. Các hạt bụi vàng dâng lên hồi phục máu và tăng tốc cho toàn đội.
5. **Hit geometry server:** Khối trụ tròn bán kính $6.0\text{m}$, chiều cao $2.5\text{m}$ quanh Oneira.
6. **Collision:** Đi xuyên đơn vị; không cản trở di chuyển vật lý.
7. **Lifetime:** Quá trình chuyển hóa kéo dài đúng **2.0 giây**.
8. **Damage/CC/Buff:** Xóa 1 hiệu ứng khống chế; sau 2.0s hồi phục thêm $80$ HP và tăng tốc $25\%$ trong $1.5\text{s}$.

### 2.2. Kỹ Năng Q — Mộng Ảnh Trói Buộc (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line).
2. **Preview khi giữ nút:** Dải decal đường thẳng dài $8.0\text{m}$, rộng $1.5\text{m}$ màu tím lavender trên mặt đất.
3. **Telegraph trước khi tác động:** Mặt nạ khóc hé mở miệng trong $0.15\text{s}$, tích tụ một khối sương khói tím đậm đặc.
4. **VFX thái & chất liệu:** Một quả cầu khói mộng cảnh xoay tròn xé gió bay thẳng ($26\text{m/s}$), lõi quả cầu mang hoa văn mặt nạ mờ ảo. Khi chạm mục tiêu đầu tiên, quả cầu nổ tung, giải phóng các dải lụa khói quấn chặt chân kẻ địch giữ đứng yên trong 1.0s.
5. **Hit geometry server:** Khối trụ Capsule Sweep, bán kính $0.75\text{m}$ (rộng $1.5\text{m}$), cự ly $8.0\text{m}$.
6. **Collision:** Dừng lại ở tướng hoặc lính đầu tiên trúng phải.
7. **Lifetime:** Bay tối đa $0.3\text{s}$; hiệu ứng trói tồn tại $1.0\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($50 - 170 + 0.45\text{AP}$) và Trói Chân (Root) $1.0\text{s}$.

### 2.3. Kỹ Năng W — Mặt Nạ Hút Khống Chế (`skill_w`)
1. **Cast targeting:** Tự niệm tức thời diện rộng quanh thân (Self PBAoE Cleanse Aura).
2. **Preview khi giữ nút:** Vòng tròn bán kính $6.0\text{m}$ quanh Oneira.
3. **Telegraph trước khi tác động:** $0\text{s}$ windup (Kích hoạt tức thì).
4. **VFX thái & chất liệu:** Oneira bung xòe các dải lụa khói mộng cảnh bao trùm toàn bộ bán kính $6.0\text{m}$. Bản thân Oneira và toàn bộ đồng minh nhận một lớp màng khiên mộng thể trong suốt óng ánh viền tím vàng; các hạt sương mộng dâng lên hồi phục máu. Đồng thời kích hoạt cơ chế hút khống chế nội tại.
5. **Hit geometry server:** Khối trụ tròn bán kính $6.0\text{m}$, chiều cao $2.5\text{m}$ quanh Oneira.
6. **Collision:** Không cản đường di chuyển.
7. **Lifetime:** Sóng khói tỏa ra trong $0.3\text{s}$; khiên tồn tại $3.0\text{s}$.
8. **Damage/CC/Buff:** Cấp khiên ($70 - 210$), hồi máu ($45 - 145 + 0.25\text{AP}$) và giải phóng khống chế.

### 2.4. Kỹ Năng E — Mộng Cảnh Tương Lân (`skill_e`)
1. **Cast targeting:** Vùng chọn hình tròn từ xa (Ground-Targeted Circle).
2. **Preview khi giữ nút:** Vòng tròn bán kính $4.2\text{m}$ trong tầm $7.0\text{m}$.
3. **Telegraph trước khi tác động:** Oneira vẫy tay áo khói trong $0.15\text{s}$, một đám mây tím ngưng tụ trên không trung.
4. **VFX thái & chất liệu:** Một vùng kết giới sương khói mộng cảnh màu tím hồng giáng xuống mặt đất bán kính $4.2\text{m}$, bên trong có các cánh bướm mộng ảo và đốm lân tinh bay lượn lờ. Kẻ địch bước vào di chuyển chậm chạp như người mộng du; đồng minh bước vào lướt nhanh như gió.
5. **Hit geometry server:** Khối trụ tròn bán kính $4.2\text{m}$, chiều cao $2.0\text{m}$.
6. **Collision:** Đi xuyên đơn vị.
7. **Lifetime:** Vùng sương khói duy trì trong $1.5\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($45 - 145 + 0.35\text{AP}$), làm chậm kẻ địch $35\%$ và tăng tốc đồng minh $20\%$.

---

## 3. Đặc Tả 5 Pha Chiêu Cuối R — Đại Mộng Giác Tỉnh (Chuẩn Tài Liệu 79)

Kỹ năng R tuân thủ tuyệt đối cấu trúc 5 pha thời gian của chuẩn Ultimate:

```
[0.0s - 0.25s]       [0.25s]             [0.25s - 0.5s]          [0.5s - 3.5s]             [3.5s - 4.0s]
PHA 1: TELEGRAPH  -> PHA 2: CAST/RELEASE -> PHA 3: PEAK IMPACT -> PHA 4: LINGERING ZONE -> PHA 5: RECOVERY
Mộng thể bay vút lên,Mặt nạ xoay tít,    Sóng thức tỉnh cực đại, Vùng mộng giới 6.5m,      Sương khói ngưng đọng,
khói tím bao trùm    phóng chùm quang năng làm choáng 0.8s toàn đội duy trì khiên & hồi phục thu về trạng thái
```

1. **Pha 1 — Telegraph & Windup (0.0s đến 0.25s):**
   - Oneira bay vút lên cao $1.5\text{m}$, toàn bộ thân khói bung xòe cực đại che phủ không gian.
   - Chiếc mặt nạ hai mặt xoay tít quanh trục đứng tạo thành một vòng tròn hào quang trắng vàng chói lọi. Vùng bán kính $6.5\text{m}$ xuất hiện hoa văn mộng giới cổ kính cảnh báo.
2. **Pha 2 — Cast & Release Frame (Tại giây 0.25s):**
   - Mặt nạ dừng lại ở nụ cười thức tỉnh hoàn mỹ, phóng thẳng một luồng sóng chấn quang năng tinh khiết xuống mặt đất, phát ra tiếng chuông thánh ngân vang vọng khắp bản đồ.
3. **Pha 3 — Peak Impact & Stun Pulse (0.25s đến 0.5s):**
   - Sóng chấn thức tỉnh quét qua bán kính $6.5\text{m}$.
   - Toàn bộ kẻ địch bị lóa mắt và rơi vào trạng thái kinh ngạc, bị **Làm Choáng (Stun) 0.8 giây**.
   - Toàn bộ đồng minh lập tức nhận lượng hồi phục khổng lồ ($110 - 250 + 0.35\text{AP}$) và lớp đại khiên mộng thể ($90 - 190$).
4. **Pha 4 — Lingering Zone & Field Control (0.5s đến 3.5s):**
   - Toàn bộ vùng $6.5\text{m}$ duy trì một thảm hoa sương mộng lấp lánh trong $3.0\text{s}$, tiếp tục duy trì trạng thái khiên và thanh tẩy tinh thần cho đồng minh.
5. **Pha 5 — Recovery & End State (3.5s đến 4.0s):**
   - Thảm hoa sương mộng tan biến thành các hạt bụi sao bay lên trời.
   - Oneira từ từ hạ độ cao trở về tư thế lơ lửng $0.4\text{m}$, mặt nạ trở về vị trí cân bằng giữa hai thái cực.
