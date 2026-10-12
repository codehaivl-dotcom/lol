# 02 · Player Experience — #43 Phù Đổng (Thiết Mã Thiên Tướng)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#43 / phu_dong`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Tích tụ Xung Lượng & Thu hẹp cự ly):**
   - Phù Đổng duy trì di chuyển liên tục, thanh Xung Lượng (Mounted Momentum) nạp nhanh $25\text{ điểm/giây}$.
   - Tốc độ di chuyển tăng vọt tới $+20\%$, vó Thiết Mã tóe lửa đỏ cam và tiếng vó ngựa dồn dập báo hiệu trạng thái sẵn sàng chiến đấu.
2. **Giây 3–6 (Mở giao tranh & Húc choáng mở nhịp):**
   - Khi Xung Lượng $\ge 80$, Phù Đổng lao thẳng vào đối phương tung đòn đánh thường: Thiết Mã chồm lên tung cú húc móng sắt lôi hỏa làm choáng $0.6\text{s}$ và gây thêm $+50\%$ AD sát thương.
   - Ngay sau đó, tung **Q (Thiết Mã Đột Kích)** lao xuyên tiếp $7.2\text{m}$, gây thêm sát thương và làm chậm đối thủ $30\%$ trong $1.2\text{s}$, triệt tiêu đường rút của mục tiêu.
3. **Giây 6–9 (Hấp thụ hỏa lực & Chém càn quét):**
   - Bấm **W (Kim Giáp Thiết Thuẫn)** dậm móng sắt tức thì ($0\text{s}$ windup), kích hoạt khiên chắn hấp thụ sát thương theo $8\%$ máu tối đa.
   - Bồi tiếp **E (Lôi Hỏa Trảm)** vung Cổ Thần Kiếm quét vòng cung bán kính $3.6\text{m}$ quanh người, làm chậm tiếp $25\%$ và tạo vùng khống chế dày đặc.
4. **Giây 9–15 (Thiên Lôi Cổ Trúc — Đỉnh điểm giao tranh):**
   - Khi giao tranh nổ ra hỗn loạn, bấm **R (Thiên Lôi Cổ Trúc)**: Phù Đổng lướt tới $5.5\text{m}$ nện xuống tâm chấn bán kính $4.8\text{m}$, làm choáng diện rộng $1.0\text{s}$.
   - Thần Kiếm vỡ vụn giải phóng lôi năng, Phù Đổng nhổ bật cụm Thiên Lôi Cổ Trúc vào tay trong thời gian chuyển dạng $0.4\text{s}$.
   - Trong 6.0 giây tiếp theo, mỗi đòn đánh thường trở thành nhát quất tre quét rộng $3.5\text{m}$ gây thêm $+35\%$ AD sát thương lan, bẻ gãy mọi lá chắn và càn quét hoàn toàn tuyến sau của địch.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), không tự gắn nhãn 'dễ chơi confirmed' khi chưa có dữ liệu kiểm chứng trận thật.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Rất trực quan) | Hình tượng kỵ mã phi nước đại húc người và nhổ tre quét sạch quân thù cực kỳ gần gũi với thần thoại dân gian và trực giác vật lý. Thanh đà Xung Lượng hiển thị rõ ràng trên thanh máu. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.5 / 5** (Trung bình) | Kỹ năng W bật tức thì nhận khiên, E quét tròn quanh người không cần nhắm góc. Tuy nhiên kỹ năng Q đòi hỏi định hướng đường thẳng chính xác và kỹ năng R cần chọn vùng điểm rơi hợp lý. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.0 / 5** (Đòi hỏi kỹ năng điều khiển kỵ mã cao) | Tốc độ cao đi kèm quán tính bẻ lái (Turn Rate): Người chơi phải tính toán góc cua, tránh bị cản bởi góc địa hình hẹp. Quản lý nhịp nạp Xung Lượng $\ge 80$ đúng lúc giao tranh nổ ra và tối ưu hóa 6 giây quét Cổ Trúc $3.5\text{m}$ mà không bị thả diều đòi hỏi tư duy vị trí đỉnh cao. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Làm quen Kỵ Mã & Tích Xung Lượng):** Người chơi điều khiển Phù Đổng chạy vòng quanh sân tập. Nhận thấy thanh đà Xung Lượng dưới chân tăng dần từ 0 lên 100, vó ngựa bốc khói đỏ và tốc độ chạy tăng dần thấy rõ.
2. **Bước 2 (Cú Húc Móng Sắt):** Chạy tích đủ 100 đà rồi click đánh thường vào hình nộm. Ngựa sắt hí vang chồm hai chân trước dậm xuống, hình nộm bị choáng $0.6\text{s}$ kèm chữ "STUN" và số sát thương đỏ bốc lên.
3. **Bước 3 (Thử nghiệm Đột Kích Q & Dậm Khiên W):** Bấm Q phóng ngựa lao thẳng qua cọc tiêu, bấm W tạo quả cầu khiên điện lôi hỏa bọc lấy cả người và ngựa.
4. **Bước 4 (Khai mở Tre Thần R):** Bấm R vào cụm 3 hình nộm. Thần kiếm vỡ tan thành các tia sét vàng kim, Phù Đổng nhổ cụm tre xanh rực sấm sét quất một đường hình quạt khổng lồ $3.5\text{m}$ trúng cả 3 mục tiêu cùng lúc.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Quán tính cua rộng khi chạy nhanh:* Ở vận tốc cực đại, Phù Đổng không thể rẽ ngoặt $90^\circ$ tức thì. Nếu đối thủ lạng lách qua các khe tường hẹp hoặc bụi rậm, Phù Đổng rất dễ bị húc trượt vào khoảng trống.
  - *Húc trượt Q:* Kỹ năng Q có đường đạn thẳng hẹp ($1.6\text{m}$). Nếu đâm trượt mục tiêu, Phù Đổng bị trôi lướt hết cự ly $7.2\text{m}$ và rơi vào thế bị bao vây sau lưng đối phương.
  - *Cửa sổ chuyển dạng R ($0.7\text{s}$):* Trước khi nện trúng đất và nhổ tre, Phù Đổng phải mất $0.3\text{s}$ gồng $+ 0.4\text{s}$ lướt trên không; vùng cảnh báo đỏ hiện rõ trên mặt đất.
- **Công cụ phản chế của đối thủ:**
  - **Universal Dash (Phím D):** Khi thấy Thiết Mã phi thẳng tới hoặc khi vùng nguy hiểm của R xuất hiện, đối thủ bấm phím **D (Dash)** né vuông góc sang hai bên để thoát khỏi đường xung kích.
  - **Khống chế cứng ngắt đà:** Kỹ năng làm choáng, trói chân hoặc hất tung tầm xa có thể triệt tiêu ngay lập tức thanh Xung Lượng của Phù Đổng, biến Thiết Mã trở lại tốc độ chạy bình thường.
  - **Thả diều ngoài tầm quét 3.5m khi bật Cổ Trúc:** Trạng thái Cổ Trúc kéo dài 6.0 giây. Đối thủ cơ động có thể sử dụng kỹ năng làm chậm hoặc rút lui để câu hết 6 giây quý giá này, sau đó quay lại phản công khi Phù Đổng chỉ còn kiếm ngắn và hết chiêu thức.
