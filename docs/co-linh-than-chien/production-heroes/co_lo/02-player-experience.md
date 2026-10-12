# 02 · Player Experience — #47 Cổ Lỗ (Huyền Quy Thần Cơ Sư)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#47 / co_lo`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Chọn vị trí địa hình & Cắm Chốt W):**
   - Cổ Lỗ cùng hỗ trợ tiến vào khu vực giao tranh, tìm một vị trí an toàn phía sau vách đá hoặc sau lưng tanker.
   - Bấm **W (Cắm Chốt Huyền Quy)**: Bốn chân cơ khí của mai rùa cắm phập xuống đất sau độ trễ $0.6\text{s}$, tạo vòng sáng neo sàn màu vàng đồng; Cổ Lỗ nhận $+40\text{ Giáp/Kháng phép}$ và một lớp khiên bảo hộ.
   - Tốc độ di chuyển giảm về $0$, nhưng tầm bắn đánh thường mở rộng lên cự ly pháo binh **$8.5\text{m}$**.
2. **Giây 3–6 (Xả hỏa lực pháo binh tầm xa & Chiêu Q):**
   - Đứng ngoài tầm với của đối phương, Cổ Lỗ liên tục xả đòn đánh thường tầm $8.5\text{m}$ vào chủ lực địch.
   - Nhắm **Q (Liên Châu Xuyên Kích)** phóng chùm 3 mũi tên liên tiếp xuyên phá theo đường thẳng $8.5\text{m}$, gây sát thương vật lý dồn dập và làm chậm $20\%$ đối thủ.
3. **Giây 6–9 (Xử lý sát thủ áp sát & Đẩy lùi E):**
   - Một sát thủ đối phương dùng kỹ năng lướt vượt qua phòng tuyến, lao thẳng vào phạm vi $2.5\text{m}$ (rơi vào Vùng Mù Cận Chiến của Cổ Lỗ khiến đòn đánh thường không thể bắn trúng).
   - Cổ Lỗ lập tức kích hoạt **E (Thần Cơ Kích Thoái)**: Bắn một mũi tên cọc cơ khí cực mạnh đẩy lùi sát thủ ra xa $3.5\text{m}$, đưa đối thủ văng ra khỏi vùng mù và làm chậm $30\%$, sau đó lập tức xả tiếp tên nỏ dứt điểm.
4. **Giây 9–15 (Vạn Tiễn Quy Tông R — Bão tiễn dội mưa dứt điểm):**
   - Nhận thấy đội hình địch bắt đầu rút lui hoặc co cụm quanh trụ ngoài tầm bắn thường, Cổ Lỗ nâng góc nòng nỏ lên trời và kích hoạt **R (Vạn Tiễn Quy Tông)**:
   - Một loạt hàng vạn mũi tên sao băng phóng vút lên tầng mây rồi dội xuống khu vực chỉ định cách xa tới $12.0\text{m}$, bán kính nổ $4.5\text{m}$, gây sát thương hủy diệt diện rộng và làm chậm $40\%$, quét sạch tàn quân địch.
   - Sau khi giao tranh kết thúc, Cổ Lỗ bấm tái kích hoạt **W** để thu chân nỏ sau $0.4\text{s}$ và tiếp tục di chuyển cùng đội.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), tuân thủ chuẩn Doc 105.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Dễ nắm bắt) | Hình tượng pháo đài cắm chốt bắn xa và dội mưa tên từ trên trời rất quen thuộc với game thủ chiến thuật và bắn súng. Điểm mù cận chiến có vòng chỉ thị rõ ràng. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.0 / 5** (Khá) | Khi cắm chốt, người chơi không cần thao tác di chuyển né đòn phức tạp (hit & run), chỉ tập trung nhắm bắn và xả chiêu. Tuy nhiên việc xoay nòng nỏ có độ trễ góc đòi hỏi thao tác chuột mượt mà. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Đòi hỏi tư duy vị trí và đọc bản đồ tối thượng) | Tinh hoa nằm ở việc "Cắm chốt ở đâu và khi nào": Cắm sai vị trí trong vùng trống trải không có tầm nhìn sẽ bị sát thủ bọc sườn hạ gục ngay tức thì; quản lý tài nguyên đẩy lùi E để bảo vệ vùng mù cận chiến $2.5\text{m}$; và quyết định dứt khoát khi nào cần bấm D để hủy cắm chốt rút chạy. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Làm quen nỏ cơ bản & Tầm bắn 5.5m):** Người chơi di chuyển Cổ Lỗ ở thế di động, bắn thử nỏ vào Dummy cách $5.0\text{m}$ (bắn trúng), Dummy cách $7.5\text{m}$ (báo ngoài tầm).
2. **Bước 2 (Khai mở Cắm Chốt W & Nhận diện Vùng Mù):** Bấm phím W, 4 chân cơ khí cắm đất. Tầm bắn mở rộng lên $8.5\text{m}$, bắn trúng Dummy cách $7.5\text{m}$. Sau đó tiến Dummy vào cự ly $1.8\text{m}$ sát người: Chuột hiện biểu tượng dấu chéo đỏ báo VÙNG MÙ không thể bắn!
3. **Bước 3 (Thử nghiệm Đẩy lùi E):** Khi Dummy ở cự ly $1.8\text{m}$, bấm phím E bắn tên cọc; Dummy bị hất văng ra xa $3.5\text{m}$ (thoát khỏi vùng mù $2.5\text{m}$) và Cổ Lỗ có thể bắn tiếp bình thường.
4. **Bước 4 (Dội bão tiễn siêu xa R):** Bấm phím R nhắm vào cụm Dummy cách nửa màn hình ($12.0\text{m}$); nỏ nâng nòng bắn vút lên cao, bão tiễn dội xuống nổ tung khu vực, toàn bộ Dummy chịu sát thương và làm chậm.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Tử huyệt bất động hoàn toàn:* Khi Cổ Lỗ đã cắm chốt W, tốc độ chạy là 0. Chàng không thể tự bước đi né kỹ năng định hướng của đối thủ.
  - *VÙNG MÙ CẬN CHIẾN 2.5m:* Có vòng tròn gạch chéo đỏ hiển thị dưới chân Cổ Lỗ; bất kỳ kẻ địch nào lọt vào bên trong vòng tròn này sẽ hoàn toàn miễn nhiễm với đòn đánh thường của Cổ Lỗ.
  - *Tốc độ xoay nòng chậm khi đổi góc:* Khi Cổ Lỗ đang nhắm hướng Bắc mà đối thủ xuất hiện ở hướng Nam, cỗ nỏ mất $0.4\text{s}$ để xoay nòng $180^\circ$.
  - *Thời gian thu nỏ ($0.4\text{s}$):* Muốn nhổ chân cơ khí rút chạy cần $0.4\text{s}$ thu nỏ; nếu bị áp sát bất ngờ, Cổ Lỗ rất dễ bị dồn sát thương trước khi kịp chạy.
- **Công cụ phản chế của đối thủ:**
  - **Lao thẳng vào Vùng Mù Cận Chiến:** Các sát thủ cơ động dùng kỹ năng lướt hoặc phím Dash D áp sát thẳng vào trong phạm vi $2.5\text{m}$ quanh người Cổ Lỗ; lúc này hỏa lực đánh thường của Cổ Lỗ hoàn toàn tê liệt.
  - **Bọc sườn từ góc sau lưng:** Di chuyển vòng ra sau lưng nòng ngắm của Cổ Lỗ để tận dụng độ trễ xoay nòng chậm.
  - **Dồn kỹ năng khống chế cứng từ xa:** Cổ Lỗ đứng yên một chỗ là mục tiêu hoàn hảo cho các kỹ năng làm choáng hoặc kéo tầm xa (như vách đá của Tản Sơn hoặc đợt sóng của Triều Bá).
