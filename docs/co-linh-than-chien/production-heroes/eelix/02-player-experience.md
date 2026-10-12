# 02 · Player Experience — #33 Eelix (Lươn Sóng Thủy Uyên)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#33 / eelix`  
**Nhóm phân lớp:** Sát Thủ Trườn Lướt Thủy Uyên (Abyssal Wake Skirmisher Assassin)

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Rình rập & Khởi tạo vệt nước săn mồi):**
   - Eelix uốn lượn lơ lửng $0.3\text{m}$ trong bóng tối địa hình hoặc bụi rậm, quan sát vị trí của chủ lực đối phương.
   - Bấm **Q (Thủy Uyên Trườn Lướt)**: Phun một vệt nước bóng tối đen tuyền dài $7.2\text{m}$ ($30\text{m/s}$) về phía mục tiêu, đồng thời bản thân Eelix trườn lướt thần tốc dọc theo đường nước xuyên qua mục tiêu.
   - Cú lướt gây sát thương vật lý lớn ($65 - 205 + 0.85\text{bonus AD}$) và làm chậm $25\%$ trong 1.2s.
2. **Giây 3–6 (Áp sát cắn xé & Kích hoạt đòn đánh sét lan):**
   - Eelix tiếp cận mục tiêu trong cự ly cận chiến $1.7\text{m}$.
   - Nhờ đang đứng trên vệt nước bóng tối, tốc độ di chuyển của Eelix tăng vọt $+35\%$ (`ms > baseMs`).
   - Tung đòn đánh thường (LMB): Hàm răng điện quang cắn phập vào mục tiêu, kích hoạt nội tại **Lôi Điện Lan Tỏa (Chain Lightning)** giật thêm sát thương điện ($+45\%\text{bonus AD}$) lan sang 2 mục tiêu bên cạnh.
3. **Giây 6–9 (Xung phá điện quang & Lặn ngập bảo hộ):**
   - Bấm **E (Lôi Điện Xung Phá)**: Phóng luồng điện cao thế bán kính $3.6\text{m}$ xung quanh thân, gây sát thương vật lý ($50 - 170 + 0.50\text{AD}$) và làm chậm $35\%$ trong 1.0s.
   - Khi bị kẻ địch phản công hoặc dồn sát thương: Bấm **W (Hắc Thủy Thuẫn)**. Eelix lặn ngập sâu vào vệt nước nhận một lớp khiên bảo hộ ($60 - 200$) trong 2.5s và duy trì tốc độ trườn tối đa.
4. **Giây 9–15 (Thâm hải cuồng nộ & Rút lui an toàn):**
   - Bấm **R (Thâm Hải Cuồng Nộ)**: Khóa mục tiêu chủ lực ở cự ly $7.5\text{m}$, Eelix cuộn tròn thân mình lao thẳng xuyên thủng mục tiêu với sát thương bộc phát cực đại ($190 - 390 + 1.20\text{bonus AD}$) và **Làm Choáng 0.8 giây**, dứt điểm con mồi.
   - Kết hợp bấm **D (Universal Dash)** và trượt dọc theo vệt nước còn lại rút lui về bóng tối.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế & Thực tế trải nghiệm |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Dễ nắm bắt) | Khái niệm sát thủ lướt nước rất rõ ràng: Vệt nước đen = chạy nhanh và đánh giật sét; lướt Q áp sát, E gây sát thương xung quanh, R dồn sát thương kết liễu, W là khiên. Không dùng mana nên không lo quản lý tài nguyên. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.5 / 5** (Đòi hỏi thao tác tay nhanh và chuẩn xác) | Bộ chiêu lướt tới tấp với tốc độ cao ($30\text{m/s}$) đòi hỏi người chơi phải nhắm chuẩn đường lướt Q và canh đúng cự ly đòn đánh thường 1.7m để kích hoạt sét lan. Cần kết hợp combo Q -> Auto -> E -> R mượt mà. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Quy hoạch vệt nước & Ra vào giao tranh) | Sự khác biệt của một cao thủ Eelix nằm ở:<br>1. *Quy hoạch góc vệt nước (Wake Geometry):* Không chỉ lướt vào để giết người, mà góc vẽ vệt nước phải cho phép trượt lùi về góc an toàn sau khi hạ gục mục tiêu.<br>2. *Quản lý thời gian vệt nước 3.5s:* Biết cách kết thúc combo trước khi vệt nước biến mất để không bị mắc kẹt lại giữa đội hình địch.<br>3. *Né khống chế khi lướt:* Sử dụng tốc độ cao để lượn vòng né tránh các kỹ năng định hướng của đối thủ. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Trườn lơ lửng & Lướt Q — 0 đến 10s):**
   - Eelix xuất hiện, uốn lượn lơ lửng cách sàn $0.3\text{m}$.
   - Người chơi bấm **Q** về phía hình nộm ở xa $7.0\text{m}$. Eelix phóng vệt nước đen và lướt vút xuyên qua hình nộm, gây sát thương. Hướng dẫn hiển thị: *"Chiêu Q tạo vệt nước bóng tối và lướt thẳng tới mục tiêu!"*.
2. **Bước 2 (Đòn đánh giật sét trên vệt nước — 10 đến 20s):**
   - Đang đứng trên vệt nước, người chơi nhấp chuột trái đánh thường vào hình nộm.
   - Cú cắn xé phát ra tia sét giật lan tỏa sang hình nộm bên cạnh kèm thông báo: *"Đòn đánh thường khi đang trên vệt nước kích hoạt Lôi Điện Lan Tỏa (+45% bonus AD)!"*.
3. **Bước 3 (Khiên W & Tuyệt chiêu R — 20 đến 30s):**
   - Người chơi bấm **W** nhận khiên hắc thủy, bấm **E** phóng xung điện, rồi bấm **R** lao thẳng xuyên thủng hình nộm chủ lực tiêu diệt mục tiêu trong chớp mắt.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được (Clear Failure States):**
  - *Lướt Q trượt vào vách đá hoặc khoảng trống:* Eelix mất kỹ năng áp sát chính và không tạo được vệt nước thuận lợi để tiếp cận mục tiêu.
  - *Mắc kẹt ngoài vệt nước:* Khi vệt nước 3.5s hết hạn, Eelix mất $+35\%$ tốc độ chạy và mất đòn đánh giật sét, trở thành một sinh vật cận chiến mỏng manh dễ dàng bị dồn sát thương tiêu diệt.
  - *Lao thẳng vào mặt Pavo:* Bị dính Fear quay đầu chạy ngược hoặc bị Kymos cắm cọc giảm $40\%$ sát thương khiến combo bị gãy.
- **Công cụ phản chế minh bạch từ góc nhìn đối thủ (Opponent Agency & Counterplay):**
  - **Đọc hướng vệt nước đen:** Vệt nước đen xuất hiện trên sàn đấu trước khi Eelix trườn đến. Đối thủ có thể đoán trước hướng lao để né tránh hoặc tung chiêu khống chế chặn ngay đầu đường nước.
  - **Ép Eelix giao tranh ngoài vệt nước:** Dùng chiêu hất tung hoặc lùi lại ngoài vùng vệt nước, buộc Eelix phải bước ra khỏi vệt nước và mất đi lợi thế tốc độ.
  - **Dồn khống chế cứng:** Eelix hoàn toàn không có trạng thái miễn nhiễm khống chế. Một cú làm choáng hoặc trói chân đúng lúc sẽ giữ chân Eelix và dồn sát thương hạ gục trong 1 giây.
