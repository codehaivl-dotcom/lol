# 02 · Player Experience — #37 Mok (Trinh Sát Cổ Đăng Tác Chiến)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#37 / mok`  
**Nhóm phân lớp:** Hỗ Trợ Trinh Sát & Kiểm Soát Tầm Nhìn (Combat Lantern Scout Support)

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Thăm dò tầm nhìn & Cắm đèn chiến thuật):**
   - Mok đi trước hoặc đi song song với xạ thủ, quan sát các góc tối sương mù và bụi rậm.
   - Bấm **Q (Cắm Cổ Đăng)**: Ném một chiếc Cổ Đăng bằng gỗ hóa thạch ra xa tới $8.0\text{m}$. Đèn cắm xuống đất mở ra một vùng sáng huỳnh quang bán kính $6.0\text{m}$ trong **8.0 giây**.
   - Bất kỳ kẻ địch nào đang ẩn nấp trong bụi rậm hoặc tàng hình trong vùng sáng đều bị lộ diện hoàn toàn. Nếu đạn đèn ném trúng địch, gây sát thương nhẹ ($50 - 170 + 0.45\text{AP}$) và làm chậm $25\%$ trong 1.2s.
2. **Giây 3–7 (Quan sát & Đưa ra quyết định đánh đổi):**
   - Người chơi đưa ra quyết định: Giữ đèn để lấy thông tin hay tiêu thụ đèn để bảo vệ đồng đội?
   - Kẻ địch phát hiện thấy đèn, lao vào áp sát chủ lực của Mok.
   - Mok bấm **W (Huỳnh Quang Hộ Mệnh)**: Lập tức bộc phát sóng đèn hồi máu ($45 - 145 + 0.25\text{AP}$) và ban khiên ($65 - 185$) trong bán kính $5.5\text{m}$ cho bản thân và toàn bộ đồng minh.
   - Đồng thời, chiếc Cổ Đăng đang cắm trên sàn **lập tức bị tiêu thụ và phát nổ**: Sóng xung kích huỳnh quang lan tỏa làm chậm toàn bộ kẻ địch đứng quanh đèn $30\%$ trong 1.5s và hồi thêm $50$ máu cho đồng minh gần đó. Đèn biến mất ngay lập tức!
3. **Giây 7–11 (Khóa chân & Tự vệ bóc tách):**
   - Kẻ địch bị làm chậm bởi vụ nổ đèn cố gắng tiếp cận: Mok nhắm tung **E (Đăng Mộc Triền Nhiễu)**.
   - Một chùm rễ cây cổ thụ quét theo đường thẳng dài $7.0\text{m}$ trói chân kẻ địch đầu tiên trúng phải trong **1.0 giây**.
   - Mok kết hợp bấm **D (Universal Dash)** lướt lùi $4.5\text{m}$ giữ khoảng cách an toàn.
4. **Giây 11–15 (Đại trận quang minh & Lật ngược giao tranh):**
   - Khi giao tranh tổng bùng nổ ác liệt: Mok kích hoạt **R (Vạn Thảo Quang Minh)**.
   - Đại trận huỳnh quang bừng sáng bán kính $6.5\text{m}$ quanh người: Vừa hồi lượng máu khổng lồ ($120 - 260 + 0.40\text{AP}$) và ban khiên dày ($80 - 180$) trong 3.5s cho toàn đội, vừa làm chậm $35\%$ toàn bộ quân địch trong 2.0s, tạo tiền đề cho chủ lực xả đạn dọn dẹp giao tranh.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế & Thực tế trải nghiệm |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Dễ hiểu) | Khái niệm cắm đèn soi sáng rất gần gũi với mọi người chơi MOBA. Đèn sáng = có tầm nhìn; bấm W = hồi máu/khiên và nổ đèn; E = trói chân; R = đại hồi máu diện rộng. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.0 / 5** (Thao tác cơ bản) | Không đòi hỏi hủy động tác siêu tốc. Đèn ném tầm xa có diện tích quét rộng; W kích hoạt tức thì không cần chọn mục tiêu. Thao tác ngắm đòi hỏi ở kỹ năng ném đèn Q và bắn rễ cây E. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.0 / 5** (Đòi hỏi khả năng đọc bản đồ & Quản lý nhịp đánh đổi) | Sự khác biệt của một cao thủ Mok nằm ở:<br>1. *Vị trí cắm đèn (Lantern Placement):* Cắm ở góc khuất nào để vừa soi được 2 ngã rẽ vừa không để địch dễ dàng đập phá.<br>2. *Thời điểm tiêu thụ đèn (Detonation Timing):* Kiên nhẫn giữ đèn lấy tầm nhìn cho đến đúng giây đối thủ áp sát mới bấm W kích nổ làm chậm, hay bấm hoảng loạn làm mất tầm nhìn oan uổng.<br>3. *Bảo vệ đèn:* Biết cách dụ đối phương tiến vào phá đèn để phối hợp cùng đồng đội phục kích ngược lại. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Cắm ngọn đèn đầu tiên — 0 đến 10s):**
   - Mok xuất hiện ở bờ sông, phía trước là bụi rậm bị che khuất bởi sương mù chiến tranh.
   - Người chơi bấm **Q** ném Cổ Đăng vào bụi rậm. Bụi rậm bừng sáng, làm lộ diện 1 hình nộm sát thủ đang nấp bên trong. Giao diện hiện thông báo: *"Cổ Đăng soi sáng bán kính 6.0m trong 8 giây và phát hiện kẻ địch ẩn nấp!"*.
2. **Bước 2 (Tiêu thụ đèn & Bảo hộ W — 10 đến 20s):**
   - Hình nộm lao ra khỏi bụi hướng về phía Mok. Người chơi bấm phím **W**.
   - Cổ Đăng trong bụi rậm phát nổ làm chậm hình nộm $30\%$; bản thân Mok nhận một lớp khiên vàng huỳnh quang và hồi phục máu. Hướng dẫn hiển thị: *"Chiêu W vừa ban khiên vừa tiêu thụ Cổ Đăng để làm chậm kẻ địch!"*.
3. **Bước 3 (Trói rễ E & Đại trận R — 20 đến 30s):**
   - Người chơi bấm **E** trói chân hình nộm đang tiến tới.
   - Khi hai hình nộm khác xuất hiện, bấm **R** bừng sáng đại trận huỳnh quang, bao bọc toàn bộ đồng minh trong ánh sáng bảo hộ.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được (Clear Failure States):**
  - *Cắm đèn hớ hênh bị phá sớm:* Nếu cắm đèn ngay trước mặt đối phương mà không có đồng minh che chắn, kẻ địch chỉ cần 2 đòn đánh thường là đập vỡ đèn, Mok mất 6-8s hồi chiêu mà không thu được thông tin.
  - *Tiêu thụ đèn quá sớm (Mất tầm nhìn mù mịt):* Bấm W hoảng loạn khi kẻ địch còn ở xa khiến đèn nổ vô ích, làm mất tầm nhìn kiểm soát hang bùa lớn và khiến cả đội bị phục kích ngược.
  - *Ném Q trượt trong giao tranh:* Nếu ném Q vào khoảng trống không có giao tranh, Mok không kích nổ được khống chế làm chậm tại nơi cần thiết.
- **Công cụ phản chế minh bạch từ góc nhìn đối thủ (Opponent Agency & Counterplay):**
  - **Đập vỡ Cổ Đăng (2 Basic Attacks):** Cổ Đăng có 2 vạch máu cố định. Đối thủ có thể chủ động đánh thường 2 nhát để phá hủy đèn, tước bỏ hoàn toàn tầm nhìn và không cho Mok cơ hội kích nổ đèn sau đó.
  - **Né vùng nổ của đèn:** Khi Mok kích hoạt W, đèn có độ trễ cảnh báo âm thanh $0.2\text{s}$ trước khi nổ. Đối thủ có thể dùng Dash D lướt ra khỏi bán kính nổ $6.0\text{m}$.
  - **Dồn sát thương khi Mok hết kỹ năng bảo hộ:** Chiêu W có hồi chiêu từ $9 - 13\text{s}$. Khi Mok đã dùng W, Mok không còn công cụ hồi máu/khiên diện rộng trong hơn 10 giây tiếp theo.
