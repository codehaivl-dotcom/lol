# 01 · Fantasy, Lore & Class — #34 Jeli (Sóng Chuông Hộ Vệ & Hồi Phục)

**Trạng thái:** `LOCKED_CANON / READY_FOR_PRODUCTION`  
**Khóa định danh:**
- `researchId`: `#34`
- `runtimeId`: `jeli`
- `tên hiển thị`: `Jeli` (Tiếng Việt: `Sứa Chuông` / Tiếng Anh: `Jeli - The Chime Bell Guardian`)
- `danh hiệu`: `Sóng Chuông Hộ Vệ & Hồi Phục` (The Guardian Water Bell / Resonant Chime of the Deep Waters)

---

## 1. Câu Pick-up & Cảm Xúc Người Chơi (Player Fantasy)

> *"Tôi pick Jeli vì tôi muốn hóa thân thành một sinh vật sứa chuông phát quang lơ lửng tuyệt đẹp giữa chiến trường: lướt êm ả như làn nước, phát ra những hồi chuông nước du dương theo nhịp thở để hồi phục bền bỉ cho đồng minh, phủ khiên ngọc bích bảo kê chủ lực và bung đại thánh chuông thanh tẩy mọi hiểm nguy trong giao tranh tổng."*

- **Cảm giác cốt lõi (Core Emotion):** Thanh thản, chở che, nhịp nhàng và tao nhã. Thay vì phải cuống cuồng bấm combo kỹ năng sát thương cơ bắp, người chơi Jeli trải nghiệm cảm giác một "nhạc trưởng điều hòa sự sống", giữ nhịp thở sinh tồn cho cả đội bằng âm luật sóng nước dịu mát.
- **Vòng lặp cảm xúc (Emotional Loop):**
  - *Thong thả kiểm soát:* Lướt bồng bềnh ở cự ly an toàn phía sau đấu sĩ/xạ thủ $\rightarrow$
  - *Chở che tự nhiên:* Nhìn thanh máu đồng minh tự động đầy lên sau mỗi nhịp chuông ngân 3.5s mà không tốn công căn ke $\rightarrow$
  - *Can thiệp nhạy bén:* Bấm W bung chuông hộ thể vừa che chắn vừa hồi máu khi xạ thủ bị cấu rỉa $\rightarrow$
  - *Bảo kê then chốt:* Tung Q làm chậm sát thủ đối phương đang lao tới $\rightarrow$
  - *Thăng hoa giao tranh tổng:* Kích hoạt R đại triều thánh chuông, âm vang vọng khắp bản đồ, lật ngược hoàn toàn cục diện giao tranh khi toàn đội sắp cạn máu.

---

## 2. Bản Sắc Chiến Đấu & Phân Lớp (Combat Identity & Class)

- **Vai trò chính (Primary Role):** Hỗ Trợ (Support / Enchanter & Sustain Protector).
- **Vị trí đi đường khuyến nghị (Lane):** Đường Đôi (Duo Lane) đi cùng Xạ Thủ (như Liễu Tiễn #40), hoặc Hỗ Trợ Đảo Đường (Roam Support) trong đội hình giao tranh dài hơi.
- **Tầm tác chiến (Combat Range):** Tầm xa trung bình (Ranged Enchanter: Đánh thường $6.2\text{m}$, Kỹ năng $4.2\text{m} - 8.5\text{m}$, Vùng ảnh hưởng chiêu thức $6.0\text{m} - 6.5\text{m}$).
- **Loại tài nguyên:** Năng lượng (Mana-based). Jeli cần quản lý năng lượng khi thi triển liên tục các kỹ năng chủ động Q/W/E/R.
- **Điểm mạnh nhất:**
  - Khả năng hồi phục duy trì (Sustain) vô song trong các pha giao tranh cù cưa dài hơi nhờ nội tại hồi máu tự động $3.5\text{s}$.
  - Bảo hộ kép toàn diện: Vừa có khiên chặn sát thương tức thời vừa có hồi phục máu thực tế.
  - Vùng bảo kê diện rộng không cần chọn mục tiêu phức tạp, cực kỳ thân thiện với người mới.
- **Điểm yếu chí mạng:**
  - Lượng máu cơ bản thấp, phòng thủ vật lý mỏng manh; cực kỳ sợ sát thủ có khả năng áp sát dồn sát thương bộc phát trong 1 giây (như Kiko #01, Eelix #33).
  - Không có kỹ năng lướt cơ động nội tại (phụ thuộc hoàn toàn vào Universal Dash D).
  - Đòn khống chế (Q, E) chỉ ở mức làm chậm, hoàn toàn không có khống chế cứng (choáng/hất tung) để tự ngắt chiêu lao vào của kẻ địch.

---

## 3. Thể Hình, Silhouette & Phong Cách Di Chuyển (Locomotion)

| Đặc tính | Đặc tả chi tiết nghệ thuật | Tiêu chí nhận diện camera MOBA |
|---|---|---|
| **Vóc dáng & Hình thể (Body Anatomy)** | Sinh vật dị thú sứa chuông hoàn toàn phi nhân hình (Non-Humanoid Jellyfish). Không chân, không tay người. Thân trên là vòm chuông ngọc gốm Cổ Linh bán trong suốt, đường kính vòm $\sim 1.3\text{m}$, bên dưới là chùm xúc tu phát quang buông rủ dài $\sim 1.6\text{m}$. Tổng chiều cao hiển thị $\sim 1.9\text{m}$. | Silhouette hình nón chuông vòm mềm mại, lơ lửng cách mặt đất $0.4\text{m} - 0.5\text{m}$. Không thể nhầm lẫn với bất kỳ tướng hình người nào trong roster. |
| **Locomotion (Di chuyển & Nhịp thở)** | Bay lượn bồng bềnh êm ả (Floating Aquatic Gliding). Di chuyển theo nhịp co bóp nhẹ nhàng của vòm chuông: hút vào phồng lên rồi đẩy nhẹ ra phía sau, các dải xúc tu lượn sóng mềm mại theo quán tính thủy động học. | Trọng tâm bay lơ lửng ổn định, chuyển động mềm mại không giật cục, tạo cảm giác thư thái nổi bật giữa nền đất khô khốc của chiến trường. |
| **Vũ khí / Lõi tâm linh** | **Cổ Thủy Chuông (Ancient Water Chime Relic):** Quả chuông nhỏ bằng gốm ngọc cổ đặt lơ lửng ngay trong khoang rỗng trung tâm của vòm sứa. Mỗi khi thi triển chiêu hoặc nội tại ngân vang, quả chuông đung đưa phát ra quầng sáng ngọc bích và sóng âm hình gợn nước lan tỏa. | Lõi sáng tập trung ở ngực/tâm vòm, phát sáng nhịp nhàng, là điểm nhấn thị giác để định vị hướng mặt của Jeli. |
| **Màu sắc & Chất liệu (Palette & Materials)** | Tone màu chủ đạo: **Xanh Ngọc Bích Nước Biển Sâu (Deep Aqua / Cyan Emerald)** kết hợp **Trắng Men Gốm Sứ Bán Trong Suốt (Translucent Celadon White)**. Điểm xuyết viền vàng kim đồng cổ Cổ Linh trên đỉnh chóp chuông và các hạt lân tinh phát quang sinh học (Bioluminescence). | Độ tương phản cao: Màu xanh ngọc sáng dịu mắt phát quang nổi bật trên cả nền cỏ xanh lẫn đá tối màu của bản đồ Cổ Linh Thần Chiến. |

---

## 4. Truyền Thuyết Cốt Lõi & Quan Hệ Thế Giới (Lore & World Context)

Sâu dưới đáy Thủy Uyên Cổ Mạch — nơi dòng chảy linh khí hội tụ về những rạn san hô ngọc cổ từ thời khai thiên lập địa — loài Sứa Chuông Jeli đã tồn tại qua hàng vạn năm như những linh hồn canh giữ giấc ngủ của biển sâu. Thân thể chúng kết tinh từ tinh hoa nước ngọc và chuông đá Cổ Linh, phát ra những rung cảm âm ba có khả năng hàn gắn mọi vết nứt của sinh mệnh.

Khi cuộc chiến Cửu Mạch bùng nổ, linh khí Thủy Uyên bị dao động dữ dội, Jeli trồi lên khỏi mặt nước sâu, trôi dạt theo các mạch nước ngầm tiến vào Đấu Trường Cổ Linh. Mang theo tiếng chuông ngân của cội nguồn sự sống, Jeli đi theo che chở cho những sinh linh chiến đấu vì sự cân bằng của thần giới.

- **Mối quan hệ nhân vật & Đối trọng:**
  - *Đối trọng âm thanh với Kymos (#41 - Khánh Đá Cổ):* Kymos đại diện cho rung chấn hạ âm của đất đá cứng cỏi, chuyên triệt tiêu sát thương sốc tức thời; trong khi Jeli là sóng chuông du dương của nước mềm mại, nuôi dưỡng sinh lực bền bỉ qua từng hơi thở. Cả hai tôn trọng lẫn nhau nhưng theo đuổi hai trường phái âm luật đối nghịch.
  - *Người đồng hành tin cậy của Xạ thủ:* Tương tác bảo kê hoàn hảo cùng Liễu Tiễn (#40), bù đắp lượng máu hao hụt và giữ chân kẻ địch để Liễu Tiễn yên tâm xả tiễn từ xa.
  - *Khắc tinh tự nhiên của đội hình cấu rỉa (Poke Comp):* Các đội hình dùng chiêu tầm xa rỉa máu sẽ hoàn toàn bất lực trước nhịp hồi phục 3.5s không ngừng nghỉ của Jeli.

---

## 5. Ba Điều Bắt Buộc Phải Giữ (Must-Keep Canon)

1. **Giữ nguyên hình thái Sứa Chuông phi nhân hình (Non-humanoid Jellyfish):**
   - Vòm chuông gốm ngọc bán trong suốt, xúc tu ánh sáng lướt bồng bềnh, không bao giờ biến Jeli thành tiên nữ hay mỹ nhân ngư có tay chân đi bộ.
2. **Cơ chế cốt lõi Chime Resonance (Sóng Chuông Ngân Tự Động 3.5s):**
   - Cứ mỗi 3.5s tự động phát xung sóng hồi phục đồng minh yếu máu nhất và ban khiên nhẹ. Đây là nhịp thở thương hiệu định danh vị trí độc bản của Jeli trong roster.
3. **Bộ chiêu thức phân định độc lập giữa Khiên (Shield) và Hồi Máu (Heal):**
   - Kỹ năng W và R phải luôn cung cấp cả hai công cụ bảo hộ một cách minh bạch, có chỉ số và cơ chế phản chế riêng biệt; toàn bộ hiệu ứng thị giác mang phong cách sóng âm chuông nước xanh ngọc bích Cổ Linh.
