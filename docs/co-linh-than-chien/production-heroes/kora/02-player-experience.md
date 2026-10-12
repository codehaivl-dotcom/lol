# 02 · Player Experience — #32 Kora (Hải Mẫu Cổ Giáp)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#32 / kora`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Chọn vị trí đón đầu & Giương cửa đập W):**
   - Kora bò ngang tiến lên phía trước đội hình, xác định hướng xả đạn đạo của xạ thủ hoặc pháp sư đối phương.
   - Bấm **W (Cửa Đập Phòng Ngự)**: Khép chặt đôi càng thép trước ngực, kích hoạt lá chắn hấp thụ sát thương (Base $[90 - 270] + 9\%$ Max HP trong $3.5\text{s}$) và mở trạng thái giảm $60\%$ sát thương đạn đạo trực diện góc $180^\circ$.
   - Kora chấp nhận di chuyển chậm hơn $20\%$, chủ động điều chỉnh góc xoay thân mình hướng về phía làn đạn địch để bảo vệ xạ thủ phe mình phía sau.
2. **Giây 3–6 (Ủi thân xung kích E mở góc giao tranh):**
   - Khi đối thủ bắt đầu dồn hỏa lực vào khiên hoặc tìm cách tản ra hai bên sườn, Kora tung **E (Hải Triều Xung Kích)**: Thân cua phóng ủi tới trước $5.5\text{m}$ với vận tốc $20\text{ m/s}$, hất dạt kẻ địch sang hai bên đường ủi và làm chậm $35\%$ trong $1.2\text{s}$.
3. **Giây 6–8 (Khóa chặt mục tiêu then chốt với Q):**
   - Tiếp cận mục tiêu chủ lực địch, Kora dùng **Q (Thiết Càng Nghiền Ép)**: Một chiếc càng thép kẹp chặt mục tiêu cự ly $2.2\text{m}$, nghiền nát giáp đối thủ và làm choáng $0.6\text{s}$.
4. **Giây 8–12 (Địa chấn sóng thần Ultimate R dập tắt giao tranh):**
   - Khi đối phương co cụm hoặc cố gắng phản công vào sườn Kora, Kora dồn lực nâng cả hai càng lên cao rồi dập sập xuống đất kích hoạt **R (Hải Trấn Thần Uy)**: Sóng xung kích địa chấn tỏa rộng bán kính $5.5\text{m}$, gây sát thương vật lý cực mạnh và làm choáng toàn bộ kẻ địch xung quanh trong $1.0\text{s}$.
5. **Giây 12–15 (Bọc lót hoặc truy kích với D):**
   - Kora bồi thêm đòn đánh thường bằng càng thép, sử dụng **D (Universal Dash)** trượt ngang $4.0\text{m}$ để che chắn nốt những phát đạn cuối cùng hoặc rút lui an toàn cùng đồng đội.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), tuân thủ chuẩn Doc 105.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Rất dễ hiểu) | Khái niệm "giương khiên phía trước để chặn đạn, hở sườn và lưng" là mô thức vật lý trực quan nhất. Đôi càng to lớn và hướng chắn $180^\circ$ thể hiện rõ ràng trên sàn đấu. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.5 / 5** (Thao tác cơ bản vừa phải) | Bộ chiêu thức của Kora không đòi hỏi bấm combo siêu tốc. Kỹ năng E là đường thẳng $5.5\text{m}$, Q là cận chiến kẹp gần, W là tự niệm, R là tỏa tròn quanh thân. Điểm khó chỉ là thao tác xoay chuột giữ góc càng đối diện với xạ thủ địch. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.0 / 5** (Đòi hỏi tư duy chiến thuật & phán đoán không gian cao) | Khi giương càng, Kora bị làm chậm $20\%$, biến Kora thành mục tiêu dễ bị thả diều hoặc bọc sườn nếu chọn sai góc. Tinh thông Kora nằm ở: (1) Khả năng đọc trước hướng bay của đạn đạo quan trọng (chiêu cuối của xạ thủ/pháp sư địch) để xoay người đón đỡ đúng tích tắc; (2) Giữ khoảng cách che chắn hoàn hảo để đồng đội sau lưng không bị dính sát thương lan (Splash AoE); (3) Biết khi nào nên hủy thế thủ để E lao lên mở giao tranh. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Làm quen dáng bò ngang & Đánh kẹp càng):** Người chơi di chuyển Kora. Nhận thấy góc nhìn thấp bè, dáng bò ngang lạch cạch đầm chắc. Bấm đánh thường thấy chiếc càng đồng thau kẹp đanh thép ở cự ly $1.9\text{m}$.
2. **Bước 2 (Thử nghiệm Cửa Đập W & Giảm sát thương):** Bấm phím **W**. Hai chiếc càng khép lại tạo hình chữ V chắn trước mặt, một lớp khiên ánh sáng thủy triều xanh lam bọc quanh. Cho Dummy bắn đạn thẳng vào mặt: nhận thấy sát thương giảm hơn phân nửa ($60\%$), hiện thông báo block đạn đạo trực diện.
3. **Bước 3 (Thử nghiệm Ủi thân E & Kẹp Q):** Nhắm phím **E** vào Dummy cách $5.0\text{m}$, Kora ủi thẳng tới trước hất văng Dummy làm chậm $35\%$. Ngay sau đó bấm **Q** kẹp nghiến làm choáng $0.6\text{s}$.
4. **Bước 4 (Dập đất địa chấn R):** Đứng giữa cụm Dummy, bấm phím **R**. Kora nhấc bổng 2 càng nện sập sàn đấu, tiếng nổ chấn động phát ra, toàn bộ Dummy bị choáng $1.0\text{s}$ trong hiệu ứng sóng nước bọt trắng tung tóe.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Sườn và sau lưng chịu đủ $100\%$ sát thương:* Khi Kora giương càng thủ, Kora chỉ giảm sát thương ở góc $180^\circ$ phía trước. Nếu đối thủ vòng ra hai bên hông hoặc tập kích sau lưng, Kora hoàn toàn không có giảm trừ đạn đạo.
  - *Tốc độ di chuyển giảm $20\%$ khi thủ:* Khi Kora bật W, Kora bước đi chậm chạp rõ rệt. Đây là cơ hội vàng để đối phương giữ cự ly thả diều (kiting).
  - *Độ trễ windup của chiêu cuối R ($0.3\text{s}$ windup, $0.2\text{s}$ delay):* Kora phải nhấc hai càng lên cao trước khi dập xuống; trong $0.5\text{s}$ này đối thủ hoàn toàn có thể dùng Tốc biến hoặc Dash né ra khỏi vùng bán kính $5.5\text{m}$.
- **Công cụ phản chế của đối thủ:**
  - **Di chuyển tạt sườn (Flanking):** Sát thủ hoặc đấu sĩ cơ động (như Kiko, Vero, Moka) nên chờ Kora quay càng về hướng xạ thủ rồi lướt ra sau lưng tấn công.
  - **Universal Dash (Phím D):** Bấm phím D dạt ngang né đường ủi E của Kora hoặc thoát khỏi tâm dập đất của chiêu R.
  - **Sát thương diện rộng không phải đạn đạo (Ground AoE / DoT):** Các chiêu thức đặt vùng dưới đất (như thảm bom của Aero hay vòng mực của Inka) không bị giảm trừ bởi khiên hướng của Kora.
