# 02 · Player Experience — #48 Oneira (Mộng Thể Mặt Nạ Hút Khống Chế)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#48 / oneira`  
**Nhóm phân lớp:** Hỗ Trợ Thanh Tẩy Chuyển Hóa (CC Transmuter & Enchanter Support)

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Chọn vị trí an toàn & Thăm dò khống chế):**
   - Oneira lơ lửng bồng bềnh phía sau Xạ thủ đồng minh $3.5\text{m} - 5.0\text{m}$, tránh đứng quá gần để không bị dính cùng một kỹ năng khống chế diện rộng với chủ lực.
   - Bấm **Q (Mộng Ảnh Trói Buộc)**: Phóng một quả cầu khói mộng cảnh bay nhanh ($26\text{m/s}$) về phía kẻ địch ở cự ly $8.0\text{m}$. Quả cầu nổ tung gây sát thương phép ($50 - 170 + 0.45\text{AP}$) và Trói Chân (Root) mục tiêu trong **1.0 giây**.
2. **Giây 3–7 (Khoảnh khắc thanh tẩy & Gánh vác xiềng xích):**
   - Đội địch mở giao tranh bất ngờ: Tướng mở combat đối phương tung cú làm choáng (Stun) $1.5\text{s}$ trúng thẳng vào Xạ thủ đồng minh.
   - Ngay lập tức, Oneira bấm **W (Mặt Nạ Hút Khống Chế)**:
     - Mặt nạ khóc bừng sáng luồng khói xanh đen, **hút trọn hiệu ứng Choáng** khỏi xạ thủ!
     - Xạ thủ lập tức được giải phóng tự do di chuyển và nhận một lớp khiên bảo hộ dày ($70 - 210$) cùng hồi máu tức thì ($45 - 145 + 0.25\text{AP}$).
     - **Cửa sổ chuyển hóa 2.0s bắt đầu:** Oneira giữ hiệu ứng khống chế trong người, tốc độ di chuyển bị giảm nhẹ và có luồng khói đen quấn quanh thân.
3. **Giây 7–10 (Bùng nổ thức tỉnh & Phản công):**
   - Đúng **2.0 giây** sau, mặt nạ cười xoay ra trước, phát nổ một làn sóng ánh sáng vàng kim thanh tẩy:
     - Toàn bộ đồng minh trong bán kính $6.0\text{m}$ nhận thêm **+80 HP** hồi phục và tăng $25\%$ tốc độ di chuyển trong 1.5s!
   - Xạ thủ vừa được giải phóng và hồi máu liền xả đạn dữ dội vào đội hình địch.
   - Oneira tung **E (Mộng Cảnh Tương Lân)**: Tạo một kết giới sương khói mộng cảnh bán kính $4.2\text{m}$ làm chậm $35\%$ toàn bộ kẻ địch đang cố rút lui.
4. **Giây 10–15 (Đại mộng giác tỉnh & Ấn định giao tranh):**
   - Oneira kích hoạt **R (Đại Mộng Giác Tỉnh)**: Toàn bộ mộng thể bùng nổ, **Làm Choáng 0.8 giây** toàn bộ quân địch trong bán kính $6.5\text{m}$, đồng thời ban lượng hồi máu khổng lồ ($110 - 250 + 0.35\text{AP}$) và đại khiên ($90 - 190$) cho toàn đội, quét sạch hoàn toàn đợt phản công của địch.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế & Thực tế trải nghiệm |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.5 / 5** (Khá trực quan) | Khái niệm "hút choáng cứu bạn rồi đổi thành máu" rất dễ hiểu và nhân văn. Visual mặt nạ khóc hút khói đen và mặt nạ cười nổ ánh sáng vàng rất tương phản và rõ ràng. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.0 / 5** (Đòi hỏi phản xạ thanh tẩy nhanh) | Chiêu W kích hoạt tức thì quanh thân, nhưng đòi hỏi người chơi phải phản xạ bấm nút trong vòng 0.2s khi đồng đội vừa dính CC để tối đa hóa thời gian cứu nguy. Không thể spam W bừa bãi khi đồng đội chưa dính CC. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Đòi hỏi vị trí đứng và bảo toàn bản thân tuyệt đối) | Nghệ thuật chơi Oneira đỉnh cao nằm ở:<br>1. *Giữ mình an toàn (Self-Preservation):* Nếu Oneira bị dính choáng/câm lặng cùng lúc với xạ thủ thì W không thể bấm được. Phải luôn đứng ở góc mù không bị dính CC chùm.<br>2. *Sống sót qua 2.0s chuyển hóa:* Trong 2.0s giữ CC, đối thủ có thể chuyển mục tiêu dồn sát thương vào Oneira. Phải biết dùng Universal Dash D lùi về ngay sau khi bấm W.<br>3. *Canh chuẩn loại CC:* Hiểu rõ kỹ năng nào của địch là Hất tung (không hút được) và kỹ năng nào là Choáng/Trói (hút được) để ra quyết định chính xác. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Nhận diện khống chế trên đồng minh — 0 đến 10s):**
   - Hình nộm đồng minh bị dính bẫy làm chậm và trói chân $2.5\text{s}$, trên đầu hiện biểu tượng xiềng xích đỏ.
   - Người chơi bấm **W**. Mặt nạ khóc hút sạch xiềng xích, hình nộm lập tức bước đi bình thường và nhận khiên bảo hộ. Hướng dẫn hiển thị: *"Chiêu W hút sạch hiệu ứng Choáng, Trói, Làm chậm khỏi đồng minh!"*.
2. **Bước 2 (Chuyển hóa hồi máu sau 2.0s — 10 đến 20s):**
   - Người chơi quan sát đồng hồ chuyển hóa $2.0\text{s}$ trên người Oneira. Đúng 2 giây sau, mặt nạ cười bừng sáng, toàn bộ hình nộm đồng minh được hồi thêm $+80$ máu. Thông báo hiển thị: *"Sau 2.0 giây, khống chế được chuyển hóa thành hồi máu diện rộng!"*.
3. **Bước 3 (Bắn Q & Đại mộng R — 20 đến 30s):**
   - Bấm **Q** trói chân hình nộm địch, sau đó bấm **R** làm choáng toàn bộ bãi tập luyện và đại hồi phục sinh lực.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được (Clear Failure States):**
  - *Bị khống chế trước khi kịp bấm W:* Đứng quá gần chủ lực bị dính choáng diện rộng cùng lúc, Oneira hoàn toàn bất lực không thể bấm W để giải cứu ai.
  - *Bị ngắt quãng hoặc hạ gục trong 2.0s chuyển hóa:* Nếu Oneira hấp tấp lao lên tuyến đầu sau khi hút CC và bị đối phương dồn khống chế thứ hai hoặc sốc sát thương hạ gục, lượng hồi máu $+80$ HP sẽ không bao giờ xuất hiện.
  - *Cố hút hiệu ứng Hất tung / Áp chế:* Bấm W trong khi đồng đội đang bị hất lên trời, kỹ năng tiêu hao mana và hồi chiêu nhưng đồng đội vẫn rơi tự do mà không được giải phóng.
- **Công cụ phản chế minh bạch từ góc nhìn đối thủ (Opponent Agency & Counterplay):**
  - **Khống chế Oneira trước (Focus the Cleanse):** Bắt lẻ và tung choáng/câm lặng vào chính Oneira trước khi mở giao tranh lên xạ thủ.
  - **Sử dụng Hất Tung & Đẩy Lùi (Airborne CC):** Các chiêu hất tung (như của Forge #17) hoàn toàn không thể bị hút bởi mặt nạ của Oneira.
  - **Tung khống chế bồi vào Oneira trong 2.0s chuyển hóa:** Khi thấy Oneira có khói đen chuyển hóa bao quanh, tung ngay một kỹ năng choáng thứ hai vào Oneira để ngắt hoàn toàn đợt hồi phục chuyển hóa.
