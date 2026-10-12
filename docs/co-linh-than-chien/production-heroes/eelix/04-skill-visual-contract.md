# 04 · Skill Visual Contract — #33 Eelix (Lươn Sóng Thủy Uyên)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#33 / eelix`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Vũ khí thực hiện:** Hàm răng điện quang và cú đớp Thủy Uyên.
- **Dạng tác động:** Cận chiến cắn xé điện quang (Melee Electric Bite).
- **Animation cử động:** Eelix uốn mạnh nửa thân trước trong $0.12\text{s}$, lao tới cắn xé mục tiêu bằng hàm răng sắc nhọn phát sáng.
- **Thời điểm tác động (HIT Frame):** Tại giây $0.12\text{s}$ của animation đòn đánh.
- **VFX đòn đánh:** Vệt chém hình hàm răng cá mập màu xanh chàm đen tuyền; nếu kích hoạt nội tại trên vệt nước, các tia sét màu xanh cyan nổ bung ra từ vết cắn, giật lan sang các mục tiêu lân cận thành hình chữ Z rực rỡ.
- **Điểm tiếp xúc & Phản hồi va chạm (Impact Feedback):** Âm thanh cắn xé dứt khoát "XOẠC!" kèm tiếng phóng điện "TÈNG... TÁCH...".

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Lươn Sóng Thủy Uyên (`passive: shadow_wake`)
1. **Cast targeting:** Tự động kích hoạt khi thi triển chiêu Q.
2. **Preview khi giữ nút:** Không có (theo dải chỉ thị của Q).
3. **Telegraph trước khi tác động:** Không có.
4. **VFX thái & chất liệu:** Một dải nước bóng tối màu đen tuyền ánh xanh chàm trải dài trên sàn đấu, rộng $1.4\text{m}$, dài $7.2\text{m}$. Mặt nước lấp lánh như dầu loang bóng đêm, nổi lên các bọt khí và tia lửa điện cyan lăn tăn. Thân hình Eelix khi lướt trên vệt nước phát sáng đường viền điện quang (Electric Rim Light), cơ thể hạ thấp áp sát vệt nước $0.1\text{m}$.
5. **Hit geometry server:** Khối hộp chữ nhật (OBB / Strip Zone) rộng $1.4\text{m}$, dài $7.2\text{m}$, cao $0.4\text{m}$.
6. **Collision:** Đi xuyên mọi đơn vị; không cản trở di chuyển.
7. **Lifetime:** Tồn tại chính xác **3.5 giây** rồi bốc hơi tan vào sàn đấu.
8. **Damage/CC/Buff:** Tăng $+35\%$ tốc độ di chuyển cho Eelix; cường hóa đòn đánh sét lan $+45\%$ bonus AD.

### 2.2. Kỹ Năng Q — Thủy Uyên Trườn Lướt (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng kết hợp Lướt (Skillshot Line + Dash).
2. **Preview khi giữ nút:** Dải decal đường lướt dài $7.2\text{m}$, rộng $1.4\text{m}$ màu đen chàm viền điện cyan trên sàn đấu.
3. **Telegraph trước khi tác động:** Eelix co cụm thân mình hình chữ S trong $0.1\text{s}$, mắt và mang bừng sáng tia sét.
4. **VFX thái & chất liệu:** Eelix phóng vút đi như một mũi tên đen xé gió ($30\text{m/s}$), toàn thân hóa thành luồng sóng nước bóng tối cuộn trào, rải ngay một vệt nước `shadow_wake` đằng sau đuôi. Khi xuyên qua mục tiêu, kẻ địch bị các giọt nước đen tóe vào người làm chậm bước chân.
5. **Hit geometry server:** Khối trụ Capsule Sweep di chuyển theo véc-tơ hướng, bán kính $0.7\text{m}$ (rộng $1.4\text{m}$), cự ly $7.2\text{m}$.
6. **Collision:** Xuyên qua toàn bộ kẻ địch trên hành trình lướt; dừng lại tại điểm cuối $7.2\text{m}$.
7. **Lifetime:** Cú lướt diễn ra trong $0.24\text{s}$; vệt nước tồn tại $3.5\text{s}$.
8. **Damage/CC/Buff:** Sát thương vật lý ($65 - 205 + 0.85\text{bonus AD}$) và làm chậm $25\%$ trong $1.2\text{s}$.

### 2.3. Kỹ Năng W — Hắc Thủy Thuẫn (`skill_w`)
1. **Cast targeting:** Tự niệm tức thời (Self Cast).
2. **Preview khi giữ nút:** Vòng tròn bán kính $2.0\text{m}$ quanh chân Eelix.
3. **Telegraph trước khi tác động:** $0\text{s}$ windup (Kích hoạt tức thì).
4. **VFX thái & chất liệu:** Toàn thân Eelix chìm ngập một phần vào bóng tối của vệt nước, cơ thể trở nên trong suốt mờ ảo (Stealth Ripple Distortion). Một lớp màng khiên nước đen tuyền có tia điện chạy dọc sống lưng bọc kín thân hình trong $2.5\text{s}$.
5. **Hit geometry server:** Khối Capsule quanh cơ thể Eelix.
6. **Collision:** Không cản đường di chuyển.
7. **Lifetime:** Khiên tồn tại $2.5\text{s}$.
8. **Damage/CC/Buff:** Cấp khiên ($60 - 200$) và miễn nhiễm làm chậm trong $1.0\text{s}$.

### 2.4. Kỹ Năng E — Lôi Điện Xung Phá (`skill_e`)
1. **Cast targeting:** Tỏa tròn quanh thân (Self PBAoE).
2. **Preview khi giữ nút:** Vòng tròn bán kính $3.6\text{m}$ quanh Eelix.
3. **Telegraph trước khi tác động:** Eelix quẫy mạnh đuôi trong $0.1\text{s}$, toàn bộ cơ thể uốn cong tích điện.
4. **VFX thái & chất liệu:** Một vụ nổ điện quang màu xanh cyan bùng lên $360^\circ$ quanh thân Eelix, các nhánh sét giật xé toạc không khí và đánh thẳng vào mặt đất ẩm ướt, làm biến dạng thị giác không khí. Kẻ địch trúng đòn bị tê liệt làm chậm.
5. **Hit geometry server:** Khối trụ tròn bán kính $3.6\text{m}$, chiều cao $2.0\text{m}$ quanh Eelix.
6. **Collision:** Tác động toàn bộ kẻ địch trong bán kính.
7. **Lifetime:** Vụ nổ sét diễn ra trong $0.2\text{s}$; làm chậm kéo dài $1.0\text{s}$.
8. **Damage/CC/Buff:** Sát thương vật lý ($50 - 170 + 0.50\text{AD}$) và làm chậm $35\%$ trong $1.0\text{s}$.

---

## 3. Đặc Tả 5 Pha Chiêu Cuối R — Thâm Hải Cuồng Nộ (Chuẩn Tài Liệu 79)

Kỹ năng R tuân thủ tuyệt đối cấu trúc 5 pha thời gian của chuẩn Ultimate:

```
[0.0s - 0.2s]        [0.2s]              [0.2s - 0.45s]          [0.45s - 1.5s]            [1.5s - 2.0s]
PHA 1: TELEGRAPH  -> PHA 2: CAST/RELEASE -> PHA 3: PEAK IMPACT -> PHA 4: LINGERING ZONE -> PHA 5: RECOVERY
Cuộn tròn thân mình, Khóa mục tiêu,      Lao xuyên thủng ngực,   Điện giật dư ba,          Trượt nhẹ hạ đất,
tích lũy siêu lôi    bắn vụt như ngư lôi sốc sát thương & choáng làm chậm mục tiêu         thu về thế lơ lửng
```

1. **Pha 1 — Telegraph & Windup (0.0s đến 0.2s):**
   - Eelix cuộn tròn thân mình lại thành một vòng tròn xoắn ốc khổng lồ lơ lửng trên không trung, các cơ quan phát điện dọc sống lưng tích tụ điện quang sáng rực rỡ.
   - Một tia laser khóa mục tiêu màu xanh cyan chiếu thẳng vào ngực tướng địch đã chọn ở cự ly $7.5\text{m}$.
2. **Pha 2 — Cast & Release Frame (Tại giây 0.2s):**
   - Vòng xoắn ốc bung ra cực mạnh, Eelix bắn vụt đi như một quả ngư lôi bóng tối mang dòng điện triệu volt, phát ra tiếng rít xé gió kinh hoàng.
3. **Pha 3 — Peak Impact & Piercing Strike (0.2s đến 0.45s):**
   - Eelix đâm xuyên qua ngực mục tiêu, một cột sóng xung kích điện quang và nước đen dội ngược ra phía sau.
   - Gây toàn bộ sát thương vật lý cực đại ($190 - 390 + 1.20\text{bonus AD}$) và **Làm Choáng (Stun) 0.8 giây** con mồi.
4. **Pha 4 — Lingering Zone & Static Aftershock (0.45s đến 1.5s):**
   - Điểm chạm tiếp đất bốc lên làn khói nước đen và các tia điện tĩnh lăn tăn kéo dài $1.0\text{s}$.
5. **Pha 5 — Recovery & End State (1.5s đến 2.0s):**
   - Eelix trượt nhẹ một vòng theo quán tính, trở về tư thế lơ lửng $0.3\text{m}$ uốn lượn sẵn sàng chiến đấu.
