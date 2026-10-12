# 02 · Player Experience — #01 Kiko (Ảnh Hầu Song Trảo)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#01 / kiko`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–2 (Tiếp cận & Bẫy Ảo Ảnh):**
   - Kiko rình rập ở rìa giao tranh hoặc trong bụi rậm.
   - Nhắm tung **Q (Toái Trảo Đột Kích)** nhào lộn 4 chi lao vút $6.0\text{m}$ áp sát xé toạc mục tiêu chủ lực.
   - Ngay tại điểm xuất phát, kỹ năng Q tự động để lại một **Ảo Ảnh Quang Học (Holographic Decoy)** tồn tại trong 3.0 giây.
2. **Giây 2–4 (Outplay 1-Hit Threshold & Sốc Sát Thương):**
   - Khi mục tiêu giật mình quay lại tung chiêu khống chế hoặc đòn đánh phản kích mạnh nhất, đòn đó tự động bị Ảo ảnh quang học hấp thụ và triệt tiêu hoàn toàn về $0\text{ sát thương}$ (`passive:decoy_absorbed`).
   - Sau khi ảo ảnh chặn đòn, Kiko nhận ngay **$+20\%$ Tốc độ di chuyển** và đòn đánh thường tiếp theo được tăng thêm **$+35\%$ Bonus AD bộc phát**. Kiko cào đòn đánh thường cực mạnh vào yếu huyệt mục tiêu.
3. **Giây 4–6 (Tái tạo Ảo Ảnh & Thoát góc nguy hiểm):**
   - Nếu bị kẻ địch thứ hai tiếp cận, Kiko bấm **W (Ảo Ảnh Phân Thân)**: Kiko nhảy lùi $2.0\text{m}$ nhận lớp khiên quang học hấp thụ sát thương trong 2.0s, đồng thời phóng một ảo ảnh chạy thẳng về phía trước để đánh lừa đường ngắm của đối phương.
4. **Giây 6–8 (Khống chế & Cắt gân):**
   - Kiko áp sát lại tung **E (Khúc Xạ Trảm Kích)**: Quét song trảo hai bên tung 2 nhát chém chéo liên tiếp trong bán kính $3.2\text{m}$, làm chậm đối thủ $30\%$ trong $1.2\text{s}$.
5. **Giây 8–12 (Kết liễu Vạn Ảnh Trảo Sát):**
   - Khi mục tiêu thấp máu tìm đường tháo chạy, Kiko kích hoạt **R (Vạn Ảnh Trảo Sát)**: Khóa mục tiêu ở cự ly $6.5\text{m}$, Kiko phân tách thành các vệt bóng quang học lao tới cào xé liên hoàn, làm choáng $0.8\text{s}$ và kết liễu hoàn toàn con mồi trước khi dùng phím **D (Dash)** trườn bò rút lui an toàn.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), không tự gắn nhãn 'dễ chơi' khi chưa có dữ liệu kiểm chứng trận thật.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.5 / 5** (Khá dễ nắm bắt) | Ý tưởng dùng bóng ảo để đỡ 1 đòn đánh và dùng vuốt cào xé mục tiêu rất rõ ràng. Thanh đếm ảo ảnh và hiệu ứng khúc xạ tím hiển thị trực quan trên người Kiko. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.5 / 5** (Đòi hỏi thao tác nhanh) | Kỹ năng Q đòi hỏi ngắm lướt chính xác ở tốc độ cao ($28\text{ m/s}$); người chơi phải liên tục đổi hướng di chuyển, canh nhịp giật lùi W và kết nối combo Q $\rightarrow$ AA $\rightarrow$ W $\rightarrow$ E $\rightarrow$ R mượt mà không bị khựng. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Cực kỳ khó tinh thông) | Kiko có lượng máu rất mỏng ($630\text{ HP}$ khởi điểm). Đỉnh cao của Kiko nằm ở **Mind-game**: Canh thời điểm tạo ảo ảnh để hấp thụ đúng kỹ năng chủ lực mạnh nhất của đối phương (ví dụ Ultimate của đối thủ) thay vì để một đòn đánh thường của lính kích nổ mất 1-hit threshold. Sai một nhịp là bốc hơi ngay lập tức. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Làm quen dáng bò & Đánh thường):** Người chơi di chuyển Kiko. Nhận thấy dáng trườn bò 4 chi nhanh nhẹn, bấm đánh thường thấy song trảo chém 2 nhát vuốt tím sắc lẹm ở cự ly gần ($1.6\text{m}$).
2. **Bước 2 (Thử nghiệm Nhào lộn Q & Ảo ảnh):** Bấm phím **Q** vào hình nộm cách $5.0\text{m}$. Kiko phóng vút tới cào rách hình nộm, để lại một cái bóng quang học màu tím đứng nguyên tại chỗ xuất phát.
3. **Bước 3 (Thử nghiệm Ảo ảnh chặn đòn):** Khi trụ bắn hoặc hình nộm phản đòn trúng bóng ảo, một hiệu ứng "TÁCH" quang học lóe lên, sát thương bằng 0 và Kiko tăng tốc chạy bứt phá.
4. **Bước 4 (Combo Lùi W $\rightarrow$ Quét E $\rightarrow$ Khóa R):** Bấm W nhảy lùi bung bóng chạy tới, bấm E quét 2 nhát trảo làm chậm, bấm R khóa hình nộm tung chuỗi cào xé xé toạc thanh máu mục tiêu kèm hiệu ứng choáng $0.8\text{s}$.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Ảo ảnh chỉ có đúng 1-hit threshold:* Ảo ảnh quang học của Kiko biến mất ngay lập tức sau khi nhận **chính xác 1 đòn đánh hoặc kỹ năng bất kỳ**. Nếu đối thủ bình tĩnh dùng đòn đánh thường hoặc chiêu diện rộng yếu để phá bóng, Kiko sẽ mất hoàn toàn lớp bảo vệ.
  - *Máu cơ bản cực thấp:* Với chỉ $630\text{ HP}$ khởi điểm, nếu Kiko lao vào hụt Q hoặc sau khi ảo ảnh đã vỡ, Kiko hoàn toàn không có chỉ số chống chịu để trụ lại giao tranh.
  - *Độ trễ khi khóa R ($0.2\text{s}$ windup):* Khi Kiko bấm R, trên đầu nạn nhân hiện ký hiệu vuốt tím cảnh báo trong $0.2\text{s}$ trước khi đòn cào xé tiếp cận.
- **Công cụ phản chế của đối thủ:**
  - **Dùng đòn đánh thường/chiêu lướt phá bóng sớm:** Đừng bao giờ dồn chiêu cuối vào Kiko ngay khi Kiko vừa lướt vào. Hãy tung 1 đòn đánh thường để bẻ gãy Ảo ảnh quang học trước, sau đó mới dồn sát thương khống chế.
  - **Universal Dash (Phím D):** Kỹ năng Q của Kiko có độ rộng hẹp ($1.3\text{m}$). Khi thấy Kiko gồng lộn nhào, đối thủ bấm phím **D** né sang một bên để khiến Kiko lướt trượt.
  - **Dồn khống chế cứng diện rộng:** Các đấu sĩ đỡ đòn có khống chế cứng xung quanh như Linh Hầu (#38 nện R) hay Phù Đổng (#43 quét Cổ Trúc) có thể dễ dàng triệt tiêu Kiko khi Kiko dám áp sát trong giao tranh tổng.
