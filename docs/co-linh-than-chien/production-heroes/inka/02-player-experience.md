# 02 · Player Experience — #19 Inka (Mực Thư Pháp Tuyến Tính)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#19 / inka`  
**Nhóm phân lớp:** Pháp Sư Kiểm Soát Không Gian (Geometric Zone Controller Mage)

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Kiến tạo đường nét & Cấu rỉa tầm xa):**
   - Inka giữ vị trí trung tuyến ($6.0\text{m} - 8.0\text{m}$ phía sau tướng đỡ đòn), quan sát hướng di chuyển của kẻ địch và các hẹp đạo địa hình.
   - Bấm **Q (Thư Pháp Tuyến Kích)**: Vung cọ vẽ một vệt mực thẳng tắp dài $8.5\text{m}$ về phía trước ($28\text{m/s}$). Đạn mực gây sát thương phép, làm chậm kẻ địch $25\%$ trong 1.2s và để lại một đường mực tồn tại trong 4.0s.
   - Đồng minh bước lên vệt mực lập tức nhận thêm $+20\%$ tốc độ di chuyển để lao lên gây áp lực.
2. **Giây 3–7 (Đan dệt ma trận & Kích nổ trói chân):**
   - Inka tiếp tục di chuyển dọc theo vệt mực đầu tiên với tốc độ vượt trội, tìm góc bắn thứ hai.
   - Khi kẻ địch buộc phải băng qua vệt mực hoặc dừng lại ở giao điểm, Inka tung **E (Giao Điểm Kích Nổ)**: Toàn bộ đường mực trong bán kính $4.0\text{m}$ quanh điểm chỉ định bùng nổ năng lượng Cổ Linh, gây sát thương phép và trói chân toàn bộ quân địch đứng trên vệt mực trong đúng **1.0 giây**.
3. **Giây 7–11 (Tự vệ áp sát & Hóa giải tập kích):**
   - Nếu sát thủ hoặc đấu sĩ đối phương lướt qua được bẫy mực để áp sát Inka: Inka kích hoạt **W (Mặc Thủy Hộ Thể)**.
   - Vòng mực xoay tròn quanh người bùng nổ tức thì ($0\text{s}$ windup), bao bọc Inka bằng một lớp khiên bảo hộ ($65 - 205$) trong 2.5s, đồng thời làm mờ tầm nhìn và đẩy lùi nhẹ áp lực của kẻ địch.
   - Kết hợp bấm **D (Universal Dash)** lướt lùi $4.5\text{m}$ để tái lập khoảng cách an toàn.
4. **Giây 11–15 (Đại họa đồ trận & Định đoạt giao tranh):**
   - Trong các pha giao tranh tổng tập trung đông người, Inka niệm **R (Thiên Địa Mặc Họa)**: Sau 0.3s gồng niệm, một đại đồ trận thư pháp khổng lồ bán kính $6.5\text{m}$ bừng sáng từ xa $8.0\text{m}$, phủ kín sàn đấu bằng bức tranh sơn thủy thần trận, gây sát thương phép bộc phát cực đại ($180 - 380 + 0.85\text{AP}$) và làm chậm $40\%$ toàn bộ quân địch trong 2.0s, chia cắt triệt để đội hình địch.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế & Thực tế trải nghiệm |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.5 / 5** (Khá trực quan) | Người chơi dễ dàng nắm bắt: Q bắn đường thẳng để lại mực, đi trên mực thì chạy nhanh, địch đi trên mực thì chạy chậm, E kích nổ mực trói chân, W là khiên tự vệ. Visual đường mực trên sàn đấu rất rõ ràng, không có cơ chế ẩn khó hiểu. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.0 / 5** (Trung bình khá) | Chiêu Q bay nhanh ($28\text{m/s}$) nhưng bề rộng chỉ $1.5\text{m}$, đòi hỏi khả năng ngắm kỹ năng định hướng chuẩn. Chiêu E đòi hỏi nhắm vào vị trí có vệt mực trước khi địch kịp bước ra ngoài. Không đòi hỏi bấm phím tốc độ cực cao, nhưng yêu cầu thao tác đặt góc đường vẽ chính xác. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Đòi hỏi tư duy hình học & Quy hoạch không gian cao) | Sự phân cấp giữa người chơi thông thường và cao thủ Inka nằm ở:<br>1. *Quy hoạch địa hình (Geometric Zoning):* Biết cách vẽ vệt mực khóa chặt các lối đi hẹp (choke points), ép đối thủ vào tình thế tiến thoái lưỡng nan: chịu dẫm lên mực bị trói hay đi đường vòng mất nhịp giao tranh.<br>2. *Kiến tạo giao điểm (Grid Intersection):* Bố trí 2 vệt mực giao nhau đúng vị trí mục tiêu lớn (Rồng/Thương Lương) để tối đa hóa diện tích trói chân của chiêu E.<br>3. *Kéo diều trên mực (Kiting on Ink):* Tận dụng tối đa $+20\%$ tốc độ chạy trên vệt mực để vừa rút lui vừa bắn thường và thả kỹ năng không bị bắt kịp. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Vẽ nét đầu tiên — 0 đến 10s):**
   - Inka bước ra đường, người chơi trỏ chuột và bấm phím **Q**.
   - Một vệt mực đen viền vàng kim kéo dài trên mặt đất. Inka bước lên vệt mực, thanh tốc độ chạy bừng sáng biểu tượng tăng $+20\%$ tốc độ. Hướng dẫn hiển thị: *"Đồng minh đi trên mực được tăng tốc; kẻ địch bị làm chậm 25%"*.
2. **Bước 2 (Trói chân bằng Kích nổ E — 10 đến 20s):**
   - Hình nộm kẻ địch bước chân lên vệt mực. Người chơi bấm phím **E** vào vùng mực.
   - Mực dưới chân hình nộm phát nổ, các sợi xích mực quấn chặt giữ hình nộm đứng yên trong 1.0s kèm thông báo: *"Chiêu E trói chân mọi kẻ địch đứng trên vệt mực!"*.
3. **Bước 3 (Tự vệ W & Khóa giao tranh R — 20 đến 30s):**
   - Hình nộm sát thủ nhảy bổ vào Inka: Người chơi bấm **W** bung vòng mực nhận khiên, bấm **D** lướt lùi.
   - Nhắm vào cụm hình nộm phía xa bấm **R**, bức tranh sơn thủy khổng lồ giáng xuống phát nổ quét sạch bãi tập luyện.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được (Clear Failure States):**
  - *Vẽ mực lệch khỏi luồng giao tranh:* Nếu Inka bắn Q trượt vào vách đá hoặc khoảng trống vô nghĩa, vệt mực nằm trơ trọi 4.0s không mang lại giá trị gia tốc hay ép góc.
  - *Kích nổ E khi không có địch trên mực:* Chiêu E nếu nổ vào vùng không có vệt mực hoặc kẻ địch đã bước ra ngoài sẽ chỉ gây lượng sát thương tối thiểu mà hoàn toàn không kích hoạt hiệu ứng trói chân.
  - *Bị cô lập ngoài vệt mực:* Inka không có kỹ năng lướt cơ động nội tại. Nếu bị sát thủ ép góc ra khỏi vệt mực của chính mình, Inka sẽ di chuyển chậm chạp và dễ dàng bị dồn sát thương tiêu diệt.
- **Công cụ phản chế minh bạch từ góc nhìn đối thủ (Opponent Agency & Counterplay):**
  - **Lướt ngang qua vệt mực bằng Dash (D):** Vệt mực chỉ rộng $1.5\text{m}$. Đối thủ có thể dùng phím Dash D lướt nhanh ngang qua vệt mực mà không bị làm chậm hay dính trói của E.
  - **Chờ mực khô (4.0s Lifetime):** Vệt mực chỉ tồn tại đúng 4.0 giây. Khi thấy Inka vẽ đường mực chặn đường, đối phương hoàn toàn có thể kiên nhẫn chờ 4s cho vệt mực tan biến rồi mới tiến công.
  - **Tấn công từ góc không có mực:** Sát thủ cơ động cao (như Kiko, Eelix) có thể vòng sau lưng hoặc vượt địa hình từ các góc mà Inka chưa kịp vẽ mực để dồn combo kết liễu.
