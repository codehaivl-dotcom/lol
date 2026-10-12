# 02 · Player Experience — #38 Linh Hầu (Cổ Thần Trượng)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#38 / linh_hau`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Tiếp cận & Thăm dò):**
   - Linh Hầu xuất phát ở trạng thái Đoản Trượng.
   - Nhắm tung **Q (Trượng Kích Xuyên Phá)** theo đường thẳng để đâm trúng mục tiêu ở cự ly xa (tối đa 7.0m).
   - Đòn Q làm chậm mục tiêu 25% trong 1.0s và ngay lập tức kích hoạt thế **Trường Trượng (4.0s)**.
2. **Giây 3–7 (Khai thác Sweetspot & Ép góc):**
   - Tầm đánh thường tăng vọt lên **4.8m**.
   - Người chơi di chuyển giữ cự ly ở rìa trượng (vùng sweetspot từ 2.8m đến 4.8m) để đánh thường. Mỗi phát đánh trúng vùng này gây thêm **+25% sát thương** và làm chậm tiếp 20%.
   - Nếu bị đối thủ áp sát cận chiến hoặc dồn đòn, bấm **W (Trượng Thủ Nghinh Phong)** chống trượng nhận khiên chắn năng lượng (hấp thụ sát thương theo % máu tối đa).
3. **Giây 7–12 (Khống chế & Dọn dẹp):**
   - Khi đối thủ bị làm chậm hoặc dồn về góc, tung **E (Hoành Tảo Bát Phương)** quét 360° quanh người trong bán kính 3.8m để gây sát thương diện rộng và tái lập hiệu ứng làm chậm.
   - Khi thế Trường Trượng hết hiệu lực (sau 4s), Linh Hầu tự động quay về Đoản Trượng, nhận ngay **+15% Tốc độ đánh** để lao vào bồi thêm các đòn cận chiến dồn dập ở cự ly 2.0m.
4. **Mở giao tranh tối thượng (Ultimate Combo):**
   - Khi có **R (Cổ Thần Nộ Phách)**: Chống trượng lấy đà bật nhảy lao xa 6.0m vào giữa lòng giao tranh, nện trượng xuống đất tạo chấn động bán kính 4.5m làm choáng 0.8s toàn bộ mục tiêu trong tâm nện $\rightarrow$ Tung E quét xung quanh $\rightarrow$ Tung Q bồi thêm theo đường thẳng $\rightarrow$ Xả đánh thường Trường Trượng sweetspot.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), không tự gắn nhãn '1 sao newbie confirmed' khi chưa có dữ liệu kiểm chứng trận thật.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **1.5 / 5** (Rất dễ hiểu) | Đòn đánh cầm gậy nện, chọc dài, quét tròn và nhảy bổ xuống đất cực kỳ trực quan, phản ánh đúng quán tính vật lý và thị giác. Không có cơ chế trừu tượng, không stack số ẩn. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.0 / 5** (Dễ làm quen) | Bộ chiêu diện rộng và đánh thẳng; kỹ năng Q có tốc độ bay đạn nhanh (26 m/s), W bấm tự thân nhận khiên tức thì, E quét tròn quanh người không cần nhắm góc. Người mới dễ dàng gây sát thương ổn định. |
| **Độ khó tinh thông (Mastery Ceiling)** | **3.5 / 5** (Đòi hỏi căn cự ly cao) | Yêu cầu kỹ năng "Space Control": Luôn duy trì cự ly trong khoảng rìa trượng 2.8m – 4.8m để tối ưu hóa sát thương sweetspot (+25% damage). Nếu để đối thủ áp sát <2.8m, lượng sát thương giảm mạnh. Ngoài ra cần nhắm chuẩn R vào điểm rơi mục tiêu. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Đoản trượng cơ bản):** Đứng gần hình nộm/lính, bấm đánh thường (LMB). Người chơi thấy đòn đánh bổ gậy cận chiến nhanh, đầm tay ở cự ly 2.0m.
2. **Bước 2 (Vươn trượng Q):** Bấm phím **Q**, Linh Hầu vung trượng đâm dài ra phía trước. Màn hình hiện rõ vạch chỉ thị Trường Trượng bừng sáng trên thanh trạng thái trong 4.0s.
3. **Bước 3 (Thử nghiệm Sweetspot):** Giữ khoảng cách lùi lại ~3.5m và bấm đánh thường. Vòng tròn rìa trượng lóe sáng hổ phách kèm âm thanh "KENG" vang dội, số sát thương nảy to hơn và mục tiêu bị làm chậm rõ rệt.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Chọc hụt Q:* Khi Linh Hầu tung Q hụt, trượng bị trơ ra phía trước trong 0.15s windup và không kích hoạt được sweetspot từ xa, để lộ khoảng trống sườn trong thời gian hồi chiêu 8–10s.
  - *Áp sát cự ly gần (<2.8m):* Khi đối thủ dũng cảm lao hẳn vào người Linh Hầu, đòn Trường Trượng mất hoàn toàn bonus 25% sát thương và hiệu ứng làm chậm của rìa trượng.
- **Công cụ phản chế của đối thủ:**
  - **Universal Dash (D):** Kỹ năng Q của Linh Hầu là một đường thẳng hẹp (chiều rộng 1.5m). Đối thủ có thể dễ dàng dùng phím **D (Dash)** né vuông góc sang một bên khi thấy động tác gồng đâm.
  - **Chiêu thức khống chế ngắt nhịp nhảy:** Chiêu R có thời gian lấy đà và bay trên không (0.3s windup + 0.4s delay). Các kỹ năng hất văng hoặc làm choáng tầm xa có thể ngắt cú nhảy của Linh Hầu trước khi trượng chạm đất.
  - **Rút lui khi Linh Hầu bật Trường Trượng:** Trạng thái Trường Trượng chỉ kéo dài 4.0s. Đối thủ có thể chủ động lùi bước thả diều trong 4s này, sau đó quay lại phản công khi Linh Hầu chỉ còn Đoản Trượng cận chiến.
