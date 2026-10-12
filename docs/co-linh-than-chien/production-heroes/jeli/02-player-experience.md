# 02 · Player Experience — #34 Jeli (Sóng Chuông Hộ Vệ & Hồi Phục)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#34 / jeli`  
**Nhóm phân lớp:** Hỗ Trợ Nhập Môn (Beginner Enchanter Support — Giả định trước playtest)

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Chọn vị trí & Cấu rỉa tầm xa):**
   - Jeli giữ vị trí ngay sau lưng Xạ Thủ hoặc Đấu Sĩ đồng minh (khoảng cách $\sim 3.0\text{m} - 4.5\text{m}$), lơ lửng bồng bềnh quan sát thế trận.
   - Bấm đánh thường (LMB) phóng các tia sóng nước nhẹ ở cự ly $6.2\text{m}$ để hỗ trợ dọn lính hoặc cấu rỉa tướng địch.
   - Nhắm tung **Q (Thủy Ba Chấn Động)**: Phóng một quả cầu bọt nước bay chậm ra xa $8.5\text{m}$. Nếu trúng tướng địch, mục tiêu bị làm chậm $35\%$ trong 1.5s, cản trở ý đồ lao lên cấu rỉa của đối phương.
2. **Giây 3–7 (Nhịp thở bảo hộ & Hấp thụ áp lực):**
   - Nội tại **Chime Resonance** tự động kích hoạt mỗi $3.5\text{s}$ một lần (không tốn mana, không cần thao tác bấm phím). Sóng chuông ngân lan tỏa, tự tìm đến đồng minh thấp máu nhất trong tầm để hồi một lượng máu ($35 + 0.3\text{AP}$) và bọc một lớp khiên mỏng ($25 + 0.2\text{AP}$) kéo dài 2.5s.
   - Khi đối phương dồn sát thương hoặc lao vào ép góc chủ lực, Jeli lập tức kích hoạt **W (Chuông Nước Hộ Thể)**. Một hồi chuông ngân bừng sáng bán kính $6.0\text{m}$ bao bọc lấy bản thân và đồng minh: vừa cấp một lớp khiên dày ($60 - 180$) chặn đòn vừa lập tức hồi phục một lượng máu đáng kể ($40 - 140 + 0.25\text{AP}$).
3. **Giây 7–12 (Bóc tách & Tự vệ khi bị áp sát):**
   - Nếu sát thủ hoặc đấu sĩ đối phương cố tình băng qua tuyến trước để áp sát Jeli, Jeli kích hoạt **E (Thủy Luân Âm Vực)**: Vòng sóng nước xoáy tròn quanh thân bán kính $4.2\text{m}$ bung tỏa, gây sát thương phép và làm chậm kẻ địch $30\%$ trong 1.2s.
   - Kết hợp bấm phím **D (Universal Dash)** lướt lùi về sau $4.5\text{m}$, kéo giãn khoảng cách an toàn trong khi nội tại $3.5\text{s}$ tiếp tục chuẩn bị ngân chuông hồi máu cho bản thân.
4. **Giây 12–15 (Cứu nguy tối thượng & Lật ngược giao tranh):**
   - Khi giao tranh tổng nổ ra ác liệt, nhiều đồng minh tụt xuống ngưỡng máu nguy kịch: Jeli niệm **R (Đại Triều Thánh Chuông)**. Đại chuông ngân vang toàn chiến trường trong bán kính $6.5\text{m}$, vừa làm chậm $35\%$ quân địch vừa ban lượng hồi máu khổng lồ ($100 - 240 + 0.35\text{AP}$) và lượng khiên đại thánh chuông vững chắc ($100 - 220$) kéo dài 3.5s cho toàn đội, bẻ gãy hoàn toàn nỗ lực dồn sát thương của đối phương.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Điểm số dưới đây là giả định thiết kế trước playtest (Hypothesis-based Design), tuyệt đối không tự ý gắn nhãn '1 sao newbie confirmed' khi chưa có dữ liệu kiểm chứng trận thật.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế & Thực tế trải nghiệm |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **1.0 / 5** (Cực kỳ trực quan) | Bản chất kỹ năng rất rõ ràng: Chuông ngân = hồi máu và có khiên. Kỹ năng W và R phát tác dạng hào quang tỏa tròn (AoE Aura) quanh nhân vật, người chơi không phải chọn mục tiêu phức tạp hay tính toán stack cộng dồn ẩn. Nội tại tự động phát xung theo nhịp đồng hồ, ai nhìn vào thanh máu cũng hiểu ngay tác dụng. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **1.5 / 5** (Rất dễ làm quen) | Thao tác cơ học đơn giản: Chiêu W kích hoạt tức thì ($0\text{s}$ windup) không làm ngắt di chuyển; chiêu E diện rộng quanh thân; chiêu R niệm nhanh ($0.25\text{s}$). Người chơi mới không bị áp lực phải bấm phím siêu tốc hay hủy animation (anim cancel). Điểm cơ học duy nhất cần nhắm hướng là quả cầu Q. |
| **Độ khó tinh thông (Mastery Ceiling)** | **3.5 / 5** (Đòi hỏi cảm quan không gian & Quản lý nhịp) | Sự khác biệt giữa người chơi giỏi và người mới nằm ở: <br>1. *Positioning (Vị trí đứng):* Giữ khoảng cách thế nào để vừa chạm bán kính $6.0\text{m}$ của W/R tới tiền tuyến (Tank/Fighter) và hậu tuyến (Marksman), vừa không tự biến mình thành mồi ngon cho sát thủ.<br>2. *Quản lý tài nguyên & Thời điểm:* Chiêu W tiêu hao năng lượng khá cao ($65 - 85$ mana, hồi chiêu $13 - 9\text{s}$), nếu bấm bừa bãi khi đối phương chưa dồn sát thương sẽ bị cạn mana và lộ khoảng trống phòng thủ chí mạng.<br>3. *Bắn đón đầu Q:* Quả cầu Q bay chậm ($24\text{m/s}$), người chơi đỉnh cao phải đọc hướng di chuyển của địch để ép góc hoặc chặn đường rút lui. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Lơ lửng & Nhịp chuông đầu tiên — 0 đến 10s):**
   - Nhân vật xuất hiện tại Bệ Đá Cổ Linh, người chơi cảm nhận ngay cơ thể sứa lơ lửng bồng bềnh nhẹ nhàng.
   - Đi theo hình nộm đồng minh bị mất máu: Đúng $3.5\text{s}$, một tiếng chuông ngân trong trẻo vang lên, vòng sóng ngọc bích tỏa ra, thanh máu hình nộm lập tức hồi phục kèm một viền khiên mỏng phát sáng. Giao diện hiện thông báo: *"Nội tại: Sóng chuông ngân tự động bảo vệ đồng minh yếu nhất mỗi 3.5 giây"*.
2. **Bước 2 (Chắn đòn với Chuông Hộ Thể W — 10 đến 20s):**
   - Hình nộm chịu một đợt sát thương giả lập từ tháp tập luyện. Người chơi bấm phím **W**.
   - Chuông nước bừng nở bao bọc cả Jeli và đồng minh, sát thương bị chặn đứng hoàn toàn bởi lớp khiên xanh ngọc bích và máu được hồi phục ngay tắp lự.
3. **Bước 3 (Bắn chặn Q & Âm vực E — 20 đến 30s):**
   - Một hình nộm kẻ địch lao tới: Người chơi trỏ chuột bấm **Q**, quả cầu nước bay ra làm chậm mục tiêu. Khi hình nộm tiến lại gần, người chơi bấm **E**, sóng âm nước xoay tròn đẩy bật nhịp tiến của kẻ thù.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được (Clear Failure States):**
  - *Bị cô lập hoặc đứng quá xa đội:* Khi Jeli đứng ngoài tầm $6.0\text{m}$, sóng chuông nội tại và W chỉ có tác dụng lên bản thân mà không cứu được bất kỳ ai. Người chơi lập tức nhận phản hồi thất bại khi thấy đồng minh ngã xuống mà chỉ số hỗ trợ của mình bằng 0.
  - *Bấm W quá sớm khi chưa có giao tranh:* Lớp khiên của W chỉ tồn tại $3.0\text{s}$. Nếu bấm hoảng loạn khi địch chưa xả chiêu, sau 3s khiên tan biến và Jeli rơi vào khoảng trống $10 - 13\text{s}$ hồi chiêu không còn công cụ bảo vệ chủ lực.
  - *Cạn kiệt năng lượng:* Nếu xả Q và W liên tục vô tội vạ, Jeli sẽ cạn sạch mana, trở thành một sinh vật lơ lửng vô hại chỉ biết dựa vào đòn đánh thường yếu ớt.
- **Công cụ phản chế minh bạch từ góc nhìn đối thủ (Opponent Agency & Counterplay):**
  - **Dụ hết khiên rồi mới dồn đòn (Bait the Shield):** Lớp khiên từ W tồn tại đúng $3.0\text{s}$. Đối thủ có thể dùng kỹ năng cấu rỉa nhẹ dụ Jeli bung W, lùi lại chờ đúng 3s cho khiên biến mất, sau đó lập tức tràn lên dồn sát thương kết liễu.
  - **Ngắt nhịp hồi phục bằng Vết Thương Sâu (Anti-Heal Items):** Các trang bị hoặc hiệu ứng giảm hồi máu (như Bào Tử Độc, Thiềm Thừ Cổ Khí) sẽ cắt giảm nghiêm trọng lượng hồi phục từ nội tại và chiêu thức của Jeli, biến ưu thế giao tranh dài hơi thành gánh nặng.
  - **Bắt bài tốc độ bay chậm của Q:** Quả cầu Q bay với tốc độ $24\text{m/s}$ và bề rộng $1.6\text{m}$. Đối thủ có thể dễ dàng dùng phím **D (Dash)** hoặc đơn giản là bước lệch sang bên để né tránh đường đạn.
  - **Tập trung hỏa lực hạ gục Jeli trước (Focus the Enchanter):** Jeli có lượng máu cơ bản rất mỏng ($640\text{HP}$ cấp 1) và không có khống chế cứng để tự giải cứu. Các sát thủ cơ động (như Eelix, Kiko) có thể vòng ra sau lưng hoặc luồn cánh, dồn trọn vẹn combo kết liễu Jeli chỉ trong chưa đầy 1.5 giây trước khi Jeli kịp nhận được nhiều nhịp chuông hồi phục.
