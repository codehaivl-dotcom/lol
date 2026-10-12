# 02 · Player Experience — #17 Forge (Lò Cổ)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#17 / forge`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Mở giao tranh & Áp sát):**
   - Forge nhắm thẳng vào hàng phòng ngự đối phương, bấm **Q (Đột Kích Lò Nung)** để lao nhanh 7.0m hất văng và làm choáng 0.8s tướng đầu tiên trúng phải.
   - Ngay khi tiếp cận, tung **E (Phun Hơi Thiêu Đốt)** quét quạt hơi nóng 4.0m phía trước, gây sát thương phép và làm chậm đối thủ 25% trong 1.2s.
2. **Giây 3–7 (Tích tụ Nhiệt Lượng giữa vòng vây):**
   - Bị kẻ địch bu vào tấn công, mỗi đòn đánh nhận vào tăng nhiệt lượng cực nhanh (+0.04 nhiệt cho mỗi điểm sát thương nhận vào).
   - Đòn đánh thường đấm tay của Forge bồi thêm +12 nhiệt mỗi hit; thanh nhiệt tăng vọt từ 0 lên 70–100.
   - Thân thể Forge chuyển sang màu đỏ rực, tiếng còi hơi nước rít lên cảnh báo lò nung đang ở áp suất tối đa.
3. **Giây 7–10 (Mở van Xả Áp & Lật kèo):**
   - Khi thanh nhiệt đạt đỉnh hoặc khi máu xuống thấp, bấm **W (Khóa Áp Suất & Xả Áp)**.
   - Toàn bộ thanh nhiệt được xả sạch lập tức: Forge nhận một lượng khiên khổng lồ (khiên cơ bản theo % máu tối đa + 1.6 khiên/điểm nhiệt) và phát nổ nhiệt diện rộng gây sát thương phép thiêu rụi kẻ địch xung quanh.
4. **Mở giao tranh tối thượng (Ultimate Combo):**
   - Khi có **R (Đại Bộc Phá Lò Cổ)**: Forge gồng áp suất nhảy lao 5.0m vào tâm đội hình đối phương, kích nổ toàn bộ khoang nhiệt bán kính 5.5m làm choáng 1.1s toàn bộ đội hình địch $\rightarrow$ Phun quạt lửa E $\rightarrow$ Bấm W xả áp bảo vệ bản thân.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), không tự gắn nhãn '1 sao newbie confirmed' khi chưa có dữ liệu kiểm chứng trận thật.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **1.5 / 5** (Rất dễ hiểu) | Cơ chế "ăn đòn tích nhiệt rồi bấm xả bung khiên nổ lửa" cực kỳ tự nhiên đối với một tướng đỡ đòn. Giao diện có thanh nhiệt màu cam đỏ hiển thị rõ ràng từ 0 đến 100. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.0 / 5** (Dễ chơi) | Q lao thẳng đường rộng (1.6m), E là quạt lửa trước mặt, W là nút tự niệm xả áp tức thì, R là dập nổ diện rộng 5.5m. Người mới chỉ cần bấm Q lao vào rồi bật W khi đầy nhiệt là đã hoàn thành nhiệm vụ đỡ đòn. |
| **Độ khó tinh thông (Mastery Ceiling)** | **3.0 / 5** (Tối ưu hóa thời điểm Xả Áp) | Người chơi cao tay phải căn chính xác thời điểm xả áp: xả quá sớm khi nhiệt còn thấp sẽ lãng phí lượng khiên và sát thương nổ; xả quá muộn có thể bị sốc sát thương chết trước khi kịp bấm phím. Ngoài ra cần nhắm góc Q húc trúng đúng chủ lực địch. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Đấm tay & Lao húc):** Bấm đánh thường vào hình nộm thấy cú đấm piston nặng trịch; bấm Q thấy Forge gầm gừ lao vút đi húc văng mục tiêu.
2. **Bước 2 (Quan sát tích nhiệt):** Đứng cho tháp hoặc hình nộm bắn. Thanh nhiệt cam đỏ dưới thanh máu dâng lên cuồn cuộn; lò than trên ngực Forge rực sáng từ đỏ cam chuyển sang trắng rực.
3. **Bước 3 (Thử nghiệm Xả Áp):** Khi thanh nhiệt đầy, bấm **W**. Tiếng còi hơi rít to, một vòng lửa nổ bung quanh người và thanh máu của Forge biến thành một cột khiên trắng khổng lồ bảo vệ cơ thể.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Húc Q trượt:* Forge lao đi trên đường thẳng; nếu đối thủ né được, Forge bị trơ lại phía sau đội hình địch và mất công cụ áp sát trong 8–12s.
  - *Xả áp sớm khi thanh nhiệt rỗng:* Nếu Forge bấm W khi chưa tích nhiệt, lượng khiên nhận được chỉ là mức cơ bản rất mỏng và không có sát thương nổ.
- **Công cụ phản chế của đối thủ:**
  - **Thả diều và ngừng dồn sát thương vô tội vạ:** Khi Forge lao vào nhưng đồng đội chưa theo kịp, không nên dồn toàn bộ kỹ năng đánh Forge (vì sẽ sạc đầy nhiệt cho Forge); thay vào đó dùng làm chậm, trói chân và lùi bước để nhiệt của Forge tự hạ nhiệt.
  - **Dùng Dash (D) né vùng xả áp và chiêu cuối R:** Chiêu R có thời gian gồng 0.3s và trễ 0.5s với vòng cảnh báo nổ đất đỏ rực; người chơi hoàn toàn có thể dùng Dash (D) thoát ra khỏi bán kính 5.5m trước khi vụ nổ xảy ra.
