# 02 · Player Experience — #03 Vero (Vết Kiếm)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#03 / vero`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–2 (Tiếp cận & Đặt dấu ấn Vết Nứt):**
   - Vero quan sát chủ lực hoặc mục tiêu yếu máu của đối phương ở cự ly 6.5m.
   - Bấm **Q (Vết Chém Thời Không)** để lướt nhanh 6.5m xuyên qua mục tiêu, gây sát thương vật lý tức thời và ngay lập tức mở ra bộ đếm **2.5s Vết Nứt Thời Gian** trên người nạn nhân.
   - Tiếp tục bồi ngay **E (Vòng Xoáy Nghịch Đảo)** xoay kiếm $360^\circ$ bán kính 3.4m, gây thêm sát thương và làm chậm đối thủ 25% trong 1.0s.
2. **Giây 2–3.5 (Nhồi sát thương & Phòng ngự phản công):**
   - Lợi dụng lúc đối thủ bị làm chậm, Vero chém bồi thêm 1–2 đòn đánh thường (LMB) cận chiến ở cự ly 1.8m để tích tối đa sát thương vào vết nứt (mỗi phát chém đóng góp thêm 30% giá trị sát thương vào lượng nổ trễ).
   - Khi đối thủ hoặc đồng đội đối phương tung chiêu phản kích, Vero bấm **W (Thời Không Chi Khiên)** nhận ngay lớp khiên bảo vệ tồn tại 2.5s để vô hiệu hóa lượng sát thương dồn trả đũa.
3. **Giây 3.5–5 (Kích nổ kết liễu hoặc Lùi về an toàn):**
   - **Tình huống A (Nổ tự động):** Nếu đối thủ đã tụt máu sâu, Vero dùng **Phím D (Universal Dash)** lướt lùi về an toàn; đúng mốc 2.5s, vết nứt trên đầu đối thủ phát nổ "KENG!" một tiếng giòn tan, gây sát thương phép kết liễu mục tiêu từ xa.
   - **Tình huống B (Kích nổ khẩn cấp bằng R):** Nếu đối thủ có chiêu hồi máu hoặc sắp chạy vào tầm trụ, Vero kích hoạt ngay **R (Vạn Kiếm Quy Thời)** lướt 6.5m áp sát, làm choáng 0.8s, chém 3 nhát liên hoàn và cưỡng bức kích nổ lập tức toàn bộ sát thương vết nứt, dứt điểm mục tiêu ngay tại chỗ.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), không tự gắn nhãn 'dễ chơi' khi chưa có dữ liệu nghiệm thu thực chiến.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Khá trực quan) | Người chơi dễ dàng nắm bắt cơ chế "chém dồn sát thương rồi nổ trễ sau 2.5s". Trên màn hình có thanh đo và vòng đếm ngược hiển thị rõ ràng. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.0 / 5** (Đòi hỏi căn thời gian & combo nhịp nhàng) | Cần kết hợp chuẩn xác chuỗi kỹ năng: Q lướt xuyên $\rightarrow$ E xoay làm chậm $\rightarrow$ đánh thường chèn giữa các nhịp $\rightarrow$ W căn bấm đúng lúc ăn đòn phản kích $\rightarrow$ R ra đúng thời điểm trước hoặc ngay khi nổ. Nếu trượt Q, Vero mất đường vào và không kích hoạt được vết nứt thuận lợi. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Quản lý cửa sổ 2.5s & Phán đoán ngưỡng sát thương nổ) | Bậc thầy Vero phải tính toán chính xác lượng sát thương tích lũy có đủ kết liễu mục tiêu hay không để quyết định "quay lưng bỏ đi" hay phải giữ R lại; biết cách dùng lướt Q và phím D để né kỹ năng định hướng của kẻ địch trong khi vẫn duy trì áp sát. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Đòn chém cơ bản):** Đánh thường vào hình nộm mục tiêu. Quan sát trường kiếm vung ra các dải sáng trắng bạc, để lại một vết cắt mờ phát sáng trên cơ thể hình nộm.
2. **Bước 2 (Quan sát bộ đếm Vết Nứt):** Dùng Q lướt xuyên qua hình nộm rồi bồi 2 đòn đánh thường. Trên đầu hình nộm xuất hiện đồng hồ đếm ngược hình tròn màu tím lam. Khi kim đồng hồ quay đủ 1 vòng (2.5 giây), một tiếng "KENG" vang lên, vết nứt phát nổ tung ra các mảnh vỡ tinh thể và số sát thương phép màu tím nhảy vọt lên.
3. **Bước 3 (Thử nghiệm kích nổ sớm bằng R):** Tung combo Q + E + 1 đòn đánh thường, sau đó bấm R vào hình nộm khi đồng hồ mới chạy được 1.0 giây. Quan sát thấy vết nứt lập tức vỡ tung ngay khi nhát chém thứ 3 của R trúng đích, cộng dồn toàn bộ sát thương mà không cần chờ hết 2.5s.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được của Vero:**
  - *Lướt Q trượt hoặc bị cản:* Q là kỹ năng định hướng; nếu kẻ địch né tránh theo phương vuông góc hoặc dùng Dash (D) lách sang bên, Vero sẽ bị lướt quá đà và rơi vào thế cô lập mà không tích được sát thương đầu vào.
  - *Bị giữ chân trước khi nổ:* Vero là sát thủ cận chiến giáp nhẹ; nếu bị khống chế cứng (Stun/Root) ngay sau khi lướt vào, Vero sẽ không thể bồi thêm đòn đánh thường để tối ưu hóa lượng sát thương nổ trễ.
- **Công cụ phản chế toàn diện của đối thủ:**
  - **Đồng hồ đếm ngược minh bạch (2.5s Window):** Khi bị găm vết nứt, nạn nhân có trọn vẹn 2.5 giây đếm ngược trên đầu. Trong khoảng thời gian này, nạn nhân và hỗ trợ có đủ thời gian để:
    - Bấm nút kỹ năng tạo khiên bảo vệ (như khiên của Forge, Jeli hoặc đồ bảo hộ);
    - Bấm hồi máu khẩn cấp hoặc hồi phục máu trên giây;
    - Dùng phím D (Universal Dash) hoặc kỹ năng di chuyển lùi về tầm bảo vệ của trụ / đồng đội.
  - **Dồn sát thương hạ gục Vero trước:** Trong 2.5s chưa nổ, nếu đồng đội dồn sát thương hạ gục Vero, nạn nhân vẫn nhận sát thương nổ nhưng Vero sẽ không thể tiếp tục bồi thêm chiêu thức hay kích hoạt chiêu cuối R để kết liễu.
  - **Khắc chế cứng bằng khống chế:** Khi Vero vừa lướt Q tới, tung các kỹ năng trói hoặc đẩy lùi sẽ phá vỡ hoàn toàn nhịp combo E và đánh thường của Vero.
