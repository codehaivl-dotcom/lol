# 02 · Player Experience — #15 Aero (Phi Công Cổ Khí)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#15 / aero`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Bay lượn rìa giao tranh & Bắn tỉa quấy rối):**
   - Aero tận dụng $+15\%$ tốc độ di chuyển nội tại ($7.36\text{ m/s}$) lượn vòng quanh rìa giao tranh.
   - Giữ khoảng cách an toàn $6.2\text{m}$, bấm đòn đánh thường xả các loạt đạn đôi plasma liên tiếp bào mòn dàn chắn phía trước của đối phương.
2. **Giây 3–6 (Vạch đường bay oanh tạc Q chia cắt đội hình):**
   - Khi phát hiện đối phương tụ tập hoặc dàn hàng ngang, Aero nhắm góc và kích hoạt **Q (Tuyến Tính Oanh Tạc)**: Phi cơ phóng lướt tới trước $7.5\text{m}$ với vận tốc $30\text{ m/s}$, thả một vệt thảm bom plasma rực lửa dọc đường bay.
   - Kẻ địch trên đường bay nhận sát thương vật lý bộc phát và bị làm chậm $25\%$ trong $1.2\text{s}$; vệt thảm bom tồn tại trong **$3.0\text{ giây}$** gây thêm $30\%$ AD sát thương mỗi giây, ép đối phương phải phân tán hoặc chịu thiêu đốt.
3. **Giây 6–8 (Tăng áp tua-bin W né phản công):**
   - Bị đấu sĩ hoặc sát thủ đối phương truy đuổi, Aero bật **W (Tăng Áp Lượn Vòng)**: Tua-bin bùng cháy nhận khiên bảo vệ (Base $[65 - 185]$ trong $2.5\text{s}$) và tăng tốc độ bay, lượn ngoặt cánh chữ C để đổi góc bắn ra sau lưng đối thủ.
4. **Giây 8–10 (Pháo sáng phản lực E giật lùi an toàn):**
   - Nếu kẻ địch áp sát quá gần ($\le 3.0\text{m}$), Aero nã **E (Pháo Sáng Phản Lực)**: Bắn chùm pháo sáng $5.5\text{m}$ về phía trước làm chậm kẻ địch $35\%$, đồng thời động cơ phản lực đẩy lùi phi cơ giật lùi $4.5\text{m}$ về phía sau, tái lập khoảng cách an toàn.
5. **Giây 10–14 (Đại Oanh Tạc Chiến Dịch Ultimate R kết thúc giao tranh):**
   - Nhắm vào trung tâm đội hình địch cách tới $10.0\text{m}$, Aero kích hoạt **R (Đại Oanh Tạc Chiến Dịch)**: Cất cánh quét ngang bầu trời dội cơn bão bom plasma diện rộng bán kính $5.5\text{m}$, hủy diệt sinh lực địch và làm chậm $40\%$ trong $2.0\text{s}$, kết liễu giao tranh tổng.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), tuân thủ chuẩn Doc 105.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.5 / 5** (Dễ nắm bắt) | Khái niệm phi cơ bay lượn thả bom chia cắt giao tranh rất rõ ràng. Vệt thảm bom plasma rực sáng trên mặt đất và tầm bắn hiển thị trực quan. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.0 / 5** (Đòi hỏi khả năng điều khiển phương tiện di động) | Khác với xạ thủ đi bộ ngắm bắn tĩnh, Aero di chuyển ở tốc độ cao liên tục ($7.36\text{ m/s}$). Người chơi phải thành thục thao tác vừa di chuyển vừa xả đạn (Kite & Strafe), làm quen với cú lướt tới của Q và cú giật lùi của E để không bị lướt nhầm vào lòng địch. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Cực kỳ khó tinh thông không gian) | Tinh thông Aero nằm ở **Tư duy Kiến Tạo Không Gian (Space Control)**: (1) Vẽ đường bay Q sao cho cắt đôi đường rút lui của chủ lực địch và cô lập dàn tank địch; (2) Quản lý tài nguyên Mana ($320\text{ MP}$ khởi điểm khá eo hẹp); (3) Dùng cú đẩy lùi của E để vừa né kỹ năng vừa vượt qua các góc tường mỏng; (4) Căn nhịp R tầm xa $10.0\text{m}$ có độ trễ $0.55\text{s}$ đón đầu hướng di chuyển của kẻ thù. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Làm quen cảm giác bay lượn & Bắn plasma):** Người chơi điều khiển Aero. Nhận thấy phi cơ bay lơ lửng, tốc độ bay nhanh hơn hẳn các tướng khác ($+15\%$). Bấm đánh thường thấy súng hai nòng xả đạn đôi plasma liên hồi ở cự ly $6.2\text{m}$.
2. **Bước 2 (Thử nghiệm Tuyến Tính Oanh Tạc Q):** Bấm phím **Q** hướng qua hàng 3 Dummy. Phi cơ lướt vút $7.5\text{m}$ để lại vệt thảm bom plasma rực lửa, Dummy đứng trong vệt bị thiêu đốt máu liên tục trong $3.0\text{s}$.
3. **Bước 3 (Thử nghiệm Tăng áp W & Giật lùi E):** Bấm phím **W** tăng tốc lượn vòng nhận khiên, sau đó bấm **E** bắn pháo sáng thấy phi cơ giật lùi ngoạn mục $4.5\text{m}$ về sau.
4. **Bước 4 (Dội bão bom R tầm xa $10.0\text{m}$):** Nhắm **R** vào cụm Dummy cách $9.0\text{m}$. Phi cơ vút lên cao dội thảm bom plasma diện rộng bán kính $5.5\text{m}$, tiếng nổ rền vang, toàn bộ Dummy bị quét sạch máu và làm chậm $40\%$.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Đường bay của Q là đường thẳng có thể đoán trước:* Khi Aero lướt Q, phi cơ bay theo đường thẳng cố định $7.5\text{m}$ với windup $0.1\text{s}$. Nếu đối thủ canh đúng đường bay này, họ có thể tung kỹ năng khống chế cứng đón đầu để ngắt cú lướt và giữ chân Aero.
  - *Máu rất mỏng ($610\text{ HP}$):* Nếu bị áp sát hoặc dính khống chế cứng, Aero hoàn toàn không có chỉ số phòng ngự tự nhiên để chống đỡ.
  - *Độ trễ của chiêu cuối R ($0.25\text{s}$ windup, $0.3\text{s}$ delay):* Vùng cảnh báo bom bán kính $5.5\text{m}$ hiện rõ trên mặt đất $0.55\text{s}$ trước khi bom chạm đất, cho phép kẻ địch kịp dùng Dash (D) thoát ra ngoài.
- **Công cụ phản chế của đối thủ:**
  - **Tung khống chế đón đầu đường bay:** Các tướng có kỹ năng đón đầu (như móc neo Nera, trói chân Mạc Liên, dập đất Kora) có thể dễ dàng chặn đứng Aero khi Aero dám lướt Q vào giao tranh.
  - **Universal Dash (Phím D):** Bấm phím D nhảy thoát khỏi vệt thảm bom plasma để không bị dính sát thương DoT và làm chậm.
  - **Ép góc vào địa hình hẹp:** Dồn Aero vào các góc tường cụt nơi phi cơ không còn không gian lượn vòng thả diều.
