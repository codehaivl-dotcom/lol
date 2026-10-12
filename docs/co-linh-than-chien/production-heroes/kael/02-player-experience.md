# 02 · Player Experience — #39 Kael (Cuồng Đao)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#39 / kael`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–2 (Tiếp cận & Giữ chân):**
   - Kael phát hiện mục tiêu ở cự ly tầm trung.
   - Bấm **Q (Cuồng Trảm Lướt)** để lướt nhanh 6.5m xuyên qua mục tiêu đầu tiên, gây sát thương vật lý tức thời.
   - Ngay lập tức bồi thêm **W (Song Đao Toái Kích)** quét hình bán nguyệt 3.2m, gây 2 nhịp chém sát thương và làm chậm đối thủ 25% trong 1.0s.
2. **Giây 2–6 (Tích tầng Cuồng Nhịp & Bùng nổ DPS):**
   - Nhờ đối thủ bị làm chậm, Kael bám sát ở cự ly 1.7m và xả đánh thường liên tục.
   - Mỗi phát chém trúng tướng tích 1 tầng Cuồng Nhịp. Tốc độ đánh tăng vọt từ $0.68 \rightarrow 0.73 \rightarrow 0.79 \dots$ lên tối đa **+40% AS (5 tầng)** sau khoảng 4 đòn đánh kết hợp kỹ năng.
   - Khi đối thủ phản đòn dồn sát thương, bấm **E (Kích Thích Huyết Mạch)** để nhận ngay một lớp khiên phản ứng tồn tại 2.5s, giúp Kael đứng vững tiếp tục chém tay.
3. **Giây 6–10 (Bám đuổi dứt điểm hoặc Duy trì nhịp):**
   - Nếu đối thủ dùng Dash (D) tháo chạy: Kael dùng phím **D** lướt theo hoặc kích hoạt **R (Huyết Cuồng Phong Ma)** lướt 4.5m vào mục tiêu, tung chuỗi 3 nhát chém xoay bão táp bán kính 4.0m làm chậm 30% trong 1.5s để dứt điểm.
   - Nếu phải tạm ngắt giao tranh: Sau 2.0s không đánh trúng, tầng Cuồng Nhịp suy giảm dần dần (giảm 2 tầng mỗi giây), cho phép Kael còn giữ được 1–2 tầng để chuyển sang mục tiêu kế tiếp trong combat hỗn loạn thay vì mất trắng.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), không tự gắn nhãn '1 sao newbie confirmed' khi chưa có dữ liệu kiểm chứng trận thật.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **1.0 / 5** (Cực kỳ trực quan) | Ý tưởng "càng chém nhiều càng đánh nhanh" là bản năng của mọi game thủ. Giao diện hiển thị rõ 5 vạch đao đỏ rực sáng dần dưới thanh máu. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **1.5 / 5** (Dễ tiếp cận cho người mới) | Không đòi hỏi kỹ năng căn góc phức tạp: Q là đường lướt thẳng, W và R là quét diện rộng quanh người, E là nút bấm tự thân nhận khiên. Người mới chỉ cần bấm Q áp sát rồi click đánh thường. |
| **Độ khó tinh thông (Mastery Ceiling)** | **3.0 / 5** (Quản lý nhịp bám đuổi & Tránh bẫy CC) | Người chơi thành thạo phải biết quản lý bộ đếm 2.0s suy giảm tầng Cuồng Nhịp, căn thời điểm bật E đỡ chiêu sát thương lớn của đối phương, và nhận biết khi nào nên dừng truy đuổi để không bị kéo vào tầm trụ hoặc ổ mai phục. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Đòn chém cơ bản):** Bấm đánh thường vào lính hoặc hình nộm. Người chơi thấy Kael vung đao luân phiên tay phải rồi tay trái, nhịp chém đầm và nhanh gọn.
2. **Bước 2 (Quan sát Cuồng Nhịp):** Đánh liên tục vào hình nộm tướng. Dưới thanh máu hiện 5 ô đao đỏ sáng dần (1, 2, 3, 4, 5). Tốc độ chém tăng rõ rệt, âm thanh chém rít lên theo từng tầng.
3. **Bước 3 (Thử nghiệm suy giảm):** Dừng đánh và lùi lại. Sau đúng 2 giây, các ô đao đỏ bắt đầu tắt dần từng ô một (chứ không tắt vụt cùng lúc), tạo cảm giác nhịp chiến đấu vẫn còn đọng lại trong người Kael.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Bị thả diều quá 2.0s:* Khi đối thủ giữ được cự ly và không để Kael chạm vào người trong 2 giây, quầng sáng đỏ trên song đao lụi tàn dần, tốc độ đánh của Kael rớt mạnh về trạng thái cơ bản.
  - *Lướt Q trượt mục tiêu:* Kỹ năng Q có cự ly 6.5m và độ rộng 1.4m; nếu bị né, Kael bị trơ lại phía sau đối thủ mà không tiếp cận được, dễ bị dồn sát thương ngược lại.
- **Công cụ phản chế của đối thủ:**
  - **Khống chế cứng (Hard CC):** Choáng (Stun), Trói chân (Root) hoặc Đẩy lùi (Knockback) là khắc tinh số một của Kael. Chỉ cần giam giữ Kael trong 2 giây là toàn bộ lợi thế tốc đánh của Cuồng Nhịp sẽ tan biến.
  - **Thả diều bằng kỹ năng làm chậm & Dash (D):** Kael không có kỹ năng tăng tốc chạy nội tại vô hạn như Master Yi. Khi bị làm chậm và đối thủ dùng Dash (D) lùi bước, Kael rất khó để áp sát lại nếu đã dùng hết Q.
  - **Rút lui về phía trụ:** Ở gần trụ, Kael không thể chém trụ để hồi máu hay tích tầng Cuồng Nhịp (đòn đánh vào trụ chỉ đóng băng decay chứ không tăng tầng).
