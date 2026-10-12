# 02 · Player Experience — #40 Liễu Tiễn (Băng Cung Chiến Thuật)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#40 / lieu_tien`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Thăm dò & Khởi động khoảng cách):**
   - Đứng ở cự ly an toàn $7.2\text{m}$, ngắm bắn **Q (Băng Tiễn Xuyên Kích)** theo đường thẳng xuyên qua đàn lính trúng tướng địch.
   - Mũi tên Q gây sát thương vật lý và làm chậm mục tiêu $20\%$ trong $1.0\text{s}$, tạo khoảng thời gian vàng để bắt đầu xả đòn đánh thường.
2. **Giây 3–7 (Dệt Vệt Băng & Thả Diều Lùi Bước):**
   - Khi tướng địch bắt đầu lao lên áp sát, người chơi thực hiện thao tác thả diều kinh điển: Đánh thường $\rightarrow$ Click lùi bước $\rightarrow$ Đánh thường.
   - Cứ mỗi 3 phát bắn thường (hoặc khi lùi bước bắn), cơ chế **Vệt Sương Băng (Frost Trail)** tự động trải một vùng sương băng mỏng bán kính $2.2\text{m}$ ngay dưới chân Liễu Tiễn tồn tại trong $3.0\text{s}$.
   - Liễu Tiễn chạy trên vệt băng được tăng **$+20\%$ Tốc độ di chuyển**, trong khi kẻ địch truy đuổi dẫm vào bị giảm **$25\%$ Tốc độ di chuyển**.
3. **Giây 7–11 (Cắt đứt áp sát & Bồi sát thương diện rộng):**
   - Nếu đối thủ tung chiêu lướt áp sát đến cự ly nguy hiểm ($<4.0\text{m}$), Liễu Tiễn bấm **W (Sương Băng Thối Bộ)**: Nhảy lùi nhanh một nhịp ngắn, trải ngay một Vệt Sương Băng lớn bán kính $2.5\text{m}$ và nhận một lớp giáp băng nhỏ hấp thụ sát thương.
   - Ngay lập tức tung **E (Băng Lạc Vũ)** vào vùng đường tiến của đối thủ: Mưa tên băng rơi xuống làm chậm diện rộng $35\%$ trong $1.5\text{s}$, trói chân đối thủ trong vũng lầy sương giá.
4. **Giây 11–15 (Kết liễu hoặc Khởi đầu giao tranh tối thượng):**
   - Khi kẻ địch bị làm chậm tối đa hoặc cố gắng quay đầu bỏ chạy, Liễu Tiễn giương cung tung **R (Cực Băng Đại Tiễn)** từ tầm xa $18.0\text{m}$.
   - Mũi đại tiễn xuyên lính cắm thẳng vào tướng địch, gây choáng $1.0\text{s}$ và kích nổ Vùng Bão Tuyết Hội Tụ, mở toang cơ hội cho đồng minh lao lên quét sạch.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Đánh giá giả định theo chuẩn Doc 105 trước playtest (Hypothesis-based), không tự ý gán nhãn '1 sao newbie confirmed' mà không có bằng chứng trận thật.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **1.0 / 5** (Cực kỳ trực quan) | Bản năng xạ thủ: Đứng xa bắn tên, thấy địch tới thì vừa bắn vừa lùi. Cơ chế vệt băng tự động xuất hiện dưới chân hỗ trợ tăng tốc, không cần phải căn góc đặt bẫy hay tính toán cộng dồn phức tạp. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.0 / 5** (Dễ tiếp cận cơ bản) | Bộ kỹ năng có tầm thi triển xa và độ rộng thân thiện ($Q$ rộng $1.3\text{m}$, $E$ bán kính $3.5\text{m}$); $W$ kích hoạt tức thời nhận khiên và lùi bước; $R$ bay nhanh ($30\text{ m/s}$) và đi xuyên lính. Người mới dễ dàng giữ mạng và gây sát thương đều đặn. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.0 / 5** (Đòi hỏi kỹ năng thả diều đỉnh cao) | Tinh hoa nằm ở việc "Vẽ bản đồ băng" (Frost Trail Routing): Người chơi bậc cao không chỉ lùi thẳng, mà di chuyển zíc-zắc để dệt các dải băng nối liền nhau, tạo đường cao tốc tăng tốc cho toàn bộ đội hình rút lui hoặc tiến công. Ngoài ra cần căn bắn R chuẩn xác ở cự ly tối đa $18.0\text{m}$ để ngắt chiêu niệm niệm của đối phương. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Đánh thường tầm xa cơ bản):** Đứng cách lính/hình nộm $7.0\text{m}$, bấm chuột đánh thường. Cung thủ bắn ra mũi tên băng thanh thoát, đòn đánh dứt khoát không có độ trễ thừa.
2. **Bước 2 (Thử nghiệm dệt vệt băng):** Bấm đánh 3 phát liên tiếp vào mục tiêu trong khi di chuyển lùi. Một dải sương tuyết màu xanh lam nhạt bừng sáng dưới chân, tiếng trượt băng vang lên và tốc độ chạy của nhân vật tăng vọt một cách rõ rệt.
3. **Bước 3 (Thử nghiệm né đòn bằng W & ngắm Q):** Cho bot lao tới gần $\rightarrow$ bấm **W** lùi giật một nhịp tạo khiên $\rightarrow$ quay lại tung **Q** xuyên thẳng qua mục tiêu, làm chậm kẻ địch và tiếp tục ung dung thả diều.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được của Liễu Tiễn:**
  - *Hụt chiêu Q hoặc E:* Khi Liễu Tiễn bắn hụt Q hoặc đặt mưa tên E sai vị trí, nàng mất công cụ làm chậm chủ động trong 7–12 giây tiếp theo.
  - *Bị ép góc vào chân tường:* Vệt sương băng chỉ hiệu quả khi có không gian để lùi. Khi Liễu Tiễn bị dồn vào góc tường hoặc bụi rậm cụt, nàng không thể dệt thêm đường lui.
  - *Lượng máu giấy:* Khi mất lớp khiên W ($60-180\text{ HP}$), Liễu Tiễn cực kỳ mỏng manh trước sát thương bộc phát.
- **Công cụ phản chế của đối thủ:**
  - **Universal Dash (D) & Nhảy vượt địa hình:** Vệt băng chỉ làm chậm tốc độ chạy bộ mặt đất (-25%), hoàn toàn **KHÔNG có tường ngăn vật lý**. Sát thủ hoặc đấu sĩ có thể bấm phím **D (Dash)** hoặc dùng kỹ năng nhảy qua vệt băng để tiếp cận thẳng mặt Liễu Tiễn.
  - **Khống chế cứng từ tầm xa:** Bắn kỹ năng choáng hoặc trói vào Liễu Tiễn. Khi bị bất động, nàng không thể di chuyển để dệt thêm vệt băng mới.
  - **Tấn công vòng sườn (Flanking):** Không đuổi theo con đường băng thẳng mà Liễu Tiễn vừa dệt (nơi có hiệu ứng làm chậm). Hãy vòng qua bụi rậm hoặc hai bên hông để chặn đầu đường rút lui.
