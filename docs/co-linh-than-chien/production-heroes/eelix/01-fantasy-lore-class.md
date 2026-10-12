# 01 · Fantasy, Lore & Class — #33 Eelix (Lươn Sóng Thủy Uyên)

**Trạng thái:** `LOCKED_CANON / READY_FOR_PRODUCTION`  
**Khóa định danh:**
- `researchId`: `#33`
- `runtimeId`: `eelix`
- `tên hiển thị`: `Eelix` (Tiếng Việt: `Lươn Đêm` / Tiếng Anh: `Eelix - The Abyssal Surge Assassin`)
- `danh hiệu`: `Lươn Sóng Thủy Uyên` (The Abyssal Surge Assassin / Terror of the Black Wakes)

---

## 1. Câu Pick-up & Cảm Xúc Người Chơi (Player Fantasy)

> *"Tôi pick Eelix vì tôi là một quái thú lươn bóng tối uốn lượn lơ lửng, tạo ra những vệt nước đen rình rập và lao vút theo dòng nước với tốc độ kinh hoàng để kết liễu con mồi bằng những cú phóng điện xé toạc linh hồn."*

- **Cảm giác cốt lõi (Core Emotion):** Sự hung hãn, trơn trượt và chết chóc của loài săn mồi vực sâu. Người chơi Eelix không đi bộ trên đất mà trườn lướt bồng bềnh cách mặt sàn 0.3m, điều khiển một "xa lộ nước bóng tối" do chính mình vạch ra để xâm nhập hậu tuyến đối phương và tẩu thoát không dấu vết.
- **Vòng lặp cảm xúc (Emotional Loop):**
  - *Vạch đường săn mồi:* Phóng Q (Thủy Uyên Trườn Lướt) tạo một dải nước đen dài $7.2\text{m}$ xuyên qua đội hình địch $\rightarrow$
  - *Lướt nước siêu tốc:* Trườn vút dọc vệt nước với tốc độ được tăng thêm $+35\%$, né tránh mọi đòn định hướng nhờ thân hình trơn trượt $\rightarrow$
  - *Cắn xé phóng điện:* Cắn xé mục tiêu chủ lực, kích hoạt nội tại Lôi Điện Lan Tỏa giật sét lan sang các mục tiêu lân cận $\rightarrow$
  - *Lặn ngụp bảo hộ:* Bấm W lặn ngập vào bóng tối vệt nước nhận khiên và tiếp tục duy trì tốc độ trườn $\rightarrow$
  - *Tử thần thâm hải:* Niệm R cuộn tròn thân mình lao thẳng xuyên thủng mục tiêu với sát thương sốc cực đại và làm choáng $0.8\text{s}$, kết liễu con mồi rồi trượt theo vệt nước rút lui an toàn.

---

## 2. Bản Sắc Chiến Đấu & Phân Lớp (Combat Identity & Class)

- **Vai trò chính (Primary Role):** Sát Thủ Trườn Lướt Thủy Uyên (Assassin / Abyssal Wake Skirmisher).
- **Vị trí đi đường khuyến nghị (Lane):** Đi Rừng (Jungle / Roamer) hoặc Sát Thủ Đường Đơn Đột Kích.
- **Tầm tác chiến (Combat Range):** Cận chiến linh hoạt (Đánh thường $1.7\text{m}$, Lướt Q $7.2\text{m}$, Xung điện E $3.6\text{m}$, Lao tới R $7.5\text{m}$).
- **Loại tài nguyên:** Không tốn tài nguyên (Manaless / Cooldown-based).
- **Điểm mạnh nhất:**
  - Tốc độ di chuyển và độ cơ động cao nhất toàn game khi di chuyển trên vệt nước bóng tối (+35% MS).
  - Khả năng áp sát mục tiêu chớp nhoáng từ khoảng cách xa tới $7.2\text{m} - 7.5\text{m}$.
  - Sát thương dồn vật lý bộc phát cực kỳ khủng khiếp kết hợp giật sét lan tỏa dọn dẹp giao tranh.
- **Điểm yếu chí mạng:**
  - Cực kỳ phụ thuộc vào vệt nước: Khi ra khỏi vệt nước, tốc độ trườn giảm về bình thường và mất đòn đánh sét lan.
  - Khả năng chống chịu cơ bản mỏng manh; rất sợ các chiêu thức khống chế cứng chặn đầu vệt nước (như tường đá hay trói chân).
  - Đòi hỏi người chơi phải quy hoạch hướng lao để luôn có đường nước rút lui an toàn.

---

## 3. Thể Hình, Silhouette & Phong Cách Di Chuyển (Locomotion)

| Đặc tính | Đặc tả chi tiết nghệ thuật | Tiêu chí nhận diện camera MOBA |
|---|---|---|
| **Vóc dáng & Hình thể (Body Anatomy)** | Quái thú lươn biển bóng tối hoàn toàn phi nhân hình (Non-Humanoid Abyssal Eel). Thân mình thuôn dài $\sim 3.2\text{m}$, đầu dẹt mang hàm răng sắc nhọn phát quang, vây lưng chạy dọc sống lưng mỏng như lưỡi dao. Không chân, không tay. | Silhouette uốn lượn hình chữ S nằm ngang, thon dài và linh hoạt, hoàn toàn tách biệt với các tướng người đứng thẳng. |
| **Locomotion (Di chuyển & Trườn lơ lửng)** | **Phương án A Locomotion Spike:** Toàn bộ cơ thể lơ lửng cách mặt đất đúng **0.3m**, uốn lượn thủy động học mượt mà (Sinusoidal Undulation). Khi lướt trên vệt nước, cơ thể hạ thấp áp sát mặt nước lướt vút đi như tia chớp đen. | Chuyển động lượn sóng tự nhiên, đầu hướng về phía trước, đuôi vẫy nhịp nhàng đẩy luồng khí Thủy Uyên ra sau. |
| **Vũ khí / Lõi tâm linh** | **Hàm Răng Điện Quang & Vây Sống Lưng:** Cơ thể chính là vũ khí. Hai bên mang và dọc sống lưng có các cơ quan phát điện sinh học (Bio-Electric Organs) chớp nháy tia lửa điện màu xanh lơ Thủy Uyên. | Ánh chớp điện dọc sống lưng là điểm nhận diện khi Eelix tích tụ đòn đánh nội tại. |
| **Màu sắc & Chất liệu (Palette & Materials)** | Tone màu chủ đạo: **Đen Nhám Vực Sâu (Abyssal Matte Black)**, **Xanh Chàm Thủy Uyên (Deep Indigo)** kết hợp **Tia Điện Xanh Cyan Lân Tinh (Cyan Bio-Electricity)**. | Lớp da nhẵn bóng có hiệu ứng nước ướt (Wet Specular Shader), các vệt phát quang chạy dọc thân mình. |

---

## 4. Truyền Thuyết Cốt Lõi & Quan Hệ Thế Giới (Lore & World Context)

Dưới đáy vực Thủy Uyên Vô Tận — nơi ánh sáng mặt trời chưa từng rọi tới và áp suất có thể nghiền nát kim loại — Eelix là sinh vật săn mồi đỉnh cao của bóng tối vực sâu. Không cần mắt nhìn, Eelix cảm nhận chiến trường thông qua các dao động tĩnh điện và áp suất nước lan truyền.

Khi các vết nứt không gian mở ra dẫn dòng nước Thủy Uyên tràn vào Đấu Trường Cổ Linh, Eelix trườn theo những mạch nước ngầm trồi lên mặt đất. Với Eelix, mặt sàn khô khốc của chiến trường chỉ là một vùng đất cần được bao phủ bởi những vệt nước bóng tối để biến nó thành lãnh địa săn mồi quen thuộc của mình.

- **Mối quan hệ nhân vật:**
  - *Con mồi ưa thích:* Các xạ thủ và pháp sư mỏng manh như Liễu Tiễn (#40) hay Inka (#19) luôn là mục tiêu săn đuổi hàng đầu.
  - *Khắc tinh tự nhiên:* Rất e ngại quạt mắt dọa sợ của Pavo (#35) vì nếu lao thẳng mặt sẽ bị ép quay đầu chạy ngược; cũng như vùng cắm mốc của Kymos (#49) làm gãy combo sốc sát thương.
  - *Kẻ thù ánh sáng của Mok (#37):* Ánh sáng Cổ Đăng của Mok xua tan vệt nước bóng tối và soi sáng vị trí của Eelix.

---

## 5. Ba Điều Bắt Buộc Phải Giữ (Must-Keep Canon)

1. **Giữ nguyên hình thái Quái Thú Lươn Biển Phi Nhân Hình (Non-Humanoid Eel):**
   - Tuyệt đối không vẽ thành người cá, không chân tay. Cơ thể uốn lượn lơ lửng cách sàn $0.3\text{m}$ theo đúng kết quả Locomotion Spike Phương án A (Doc 100).
2. **Cơ chế Vệt Nước Bóng Tối (Shadow Wake & +35% MS):**
   - Phun vệt nước tồn tại 3.5s trên sàn; trườn trên vệt nước nhận +35% tốc chạy và đòn đánh giật sét lan +45% bonus AD.
3. **Không Sử Dụng Năng Lượng (Manaless Kit):**
   - Vận hành hoàn toàn bằng thời gian hồi chiêu, không tốn mana. Chuẩn hóa Input 91 (D là Universal Dash chung).
