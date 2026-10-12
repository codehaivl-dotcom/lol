# 01 · Fantasy, Lore & Class — #43 Phù Đổng (Thiết Mã Thiên Tướng)

**Trạng thái:** `LOCKED_CANON / READY_FOR_PRODUCTION`  
**Khóa định danh:**
- `researchId`: `#43`
- `runtimeId`: `phu_dong`
- `tên hiển thị`: `Phù Đổng` (Tiếng Anh: `Phu Dong - Iron Steed General`)
- `danh hiệu`: `Thiết Mã Thiên Tướng` (The Mythic Iron Cavalier)

---

## 1. Câu Pick-up & Cảm Xúc Người Chơi (Player Fantasy)

> *"Tôi pick Phù Đổng vì tôi muốn hóa thân thành một chiến thần cưỡi ngựa sắt khổng lồ càn lướt qua mọi phòng tuyến; và khi thần kiếm gãy vụn, tôi nhổ bật cả cụm tre sấm sét thần thánh để quét sạch toàn bộ chiến trường!"*

- **Cảm giác cốt lõi:** Dũng mãnh, áp đảo, càn quét và chấn động. Cảm giác cưỡi một chiến mã đồng đen nặng hàng tấn lao đi vun vút, xé toạc đội hình địch bằng vó sắt lôi hỏa.
- **Vòng lặp cảm xúc:** Chạy lấy đà tích tụ Xung Lượng $\rightarrow$ đạt tốc độ cực đại lao vào húc choáng chủ lực đối phương $\rightarrow$ dậm móng sắt dựng khiên lôi hỏa trụ vững giữa tâm combat $\rightarrow$ kích hoạt Ultimate R bẻ gãy thần kiếm, nhổ bật cụm Thiên Lôi Cổ Trúc quét sạch diện rộng $3.5\text{m}$.

---

## 2. Bản Sắc Chiến Đấu & Phân Lớp (Combat Identity & Class)

- **Vai trò chính:** Tiên Phong / Đấu Sĩ Mở Giao Tranh (Vanguard / Initiator / Fighter).
- **Vị trí đi đường:** Đường Đơn (Solo Lane) hoặc Đi Rừng Tiên Phong (Vanguard Jungle).
- **Tầm tác chiến:** Cận chiến kỵ mã ($2.1\text{m}$ ở trạng thái Cổ Thần Kiếm / $3.5\text{m}$ hình quạt quét rộng ở trạng thái Thiên Lôi Cổ Trúc).
- **Loại tài nguyên:** Không tốn tài nguyên (Manaless / Cooldown & Momentum-gated).
- **Điểm mạnh nhất:** Khả năng mở giao tranh trực diện từ xa nhờ tốc độ di chuyển cao; khống chế cứng đơn mục tiêu khi tích đủ đà; sát thương diện rộng cực lớn trong 6 giây hóa Cổ Trúc.
- **Điểm yếu chí mạng:** Quán tính bẻ lái lớn ở tốc độ cao; bộ kỹ năng lao vào theo đường thẳng dễ bị đoán trước; thiếu khả năng thoát giao tranh khi đã dồn hết tài nguyên lao vào.

---

## 3. Thể Hình, Silhouette & Phong Cách Di Chuyển (Locomotion)

| Đặc tính | Đặc tả chi tiết | Tiêu chí nhận diện camera MOBA |
|---|---|---|
| **Cấu trúc hình thể (Body Structure)** | Chiến tướng kỵ mã khổng lồ (Mounted War Entity). Chủ tướng giáp trụ lôi đình uy nghi ngồi trên lưng Thiết Mã Cổ Linh đúc bằng đồng đen, mắt rực lửa và khớp nối phát quang năng lượng Tinh Thạch đỏ cam. | **Tuyệt đối không phải Nhân mã lai (Centaur)**. Người và ngựa là hai cá thể tách bạch nhưng gắn kết qua hệ thống yên cương và năng lượng cộng hưởng. 1 thanh máu, 1 hitbox chung, không xuống ngựa. |
| **Kích thước Battle Form (Trong trận 5v5)** | Chiều cao mô hình co chuẩn về $\approx 2.4\text{m}$ (bề thế hơn đấu sĩ thông thường nhưng gọn gàng dưới camera). Bán kính va chạm chân đế (Collision Radius): $0.75\text{m}$. | Bờm lửa đồng đỏ rực của Thiết Mã và dải lụa chiến bào sau lưng Chủ Tướng bay phần phật theo hướng di chuyển, tạo vệt nhận diện không thể nhầm lẫn. |
| **Locomotion (Di chuyển)** | Thiết Mã phi nước đại, 4 móng sắt gõ xuống đất phát ra tia lửa lôi hỏa và tiếng sấm rền vang. Khi đạt Xung Lượng cao, Thiết Mã chuyển sang trạng thái phi nước kiệu cực nhanh, toàn thân bao phủ hào quang điện trường đỏ cam. | Càng chạy nhanh thì góc quay đầu càng mở rộng theo quán tính vật lý (Turn Rate quán tính). |
| **Vũ khí chính** | **Cổ Thần Kiếm** (trạng thái thường): Kiếm đồng dài cầm tay phải, lưỡi kiếm phát quang vàng kim. <br>**Thiên Lôi Cổ Trúc** (trạng thái R): Cụm tre Tinh Thạch xanh ngọc bọc sấm sét vàng óng, dài $3.5\text{m}$ cầm hai tay quét uy lực. | Chuyển đổi vũ khí rõ ràng: Kiếm gãy vụn bắn mảnh vỡ $\rightarrow$ nhổ tre thần lên tay phát ra tiếng sét chấn động. |
| **Màu sắc chủ đạo** | Đen Đồng Hun (thân Thiết Mã) + Đỏ Hỏa Diệm (bờm ngựa và mắt) + Vàng Kim Hoàng Tộc (giáp trụ và sấm sét) + Xanh Lục Tinh Thạch (Cổ Trúc). | Tone màu tương phản cao, nổi bật trên mọi nền địa hình cỏ, đá, sông của chiến trường 5v5. |

---

## 4. Truyền Thuyết Cốt Lõi & Quan Hệ Thế Giới (Lore & World Context)

Được thai nghén từ khát vọng hộ quốc ngàn năm của cư dân châu thổ sông Hồng thời Cổ Linh hồng hoang, Phù Đổng là hóa thân của ý chí quật cường thần thánh. Khi quân xâm lăng dị giới tràn qua ải Vũ Ninh, cậu bé làng Phù Đổng vươn mình thành người khổng lồ, khoác lên mình chiến giáp lôi đình, rèn nên Thiết Mã từ đồng đen ngàn năm và nhổ bụi tre ngà sấm sét để dẹp tan mọi thế lực hắc ám.

- **Mối quan hệ thế giới:**
  - *Thủ lĩnh Bộ Ngũ Thần Thoại:* Đứng đầu hàng ngũ thần tướng bảo hộ non sông, tương tác chiến thuật chặt chẽ với Tản Sơn (#44 — kiến tạo địa hình hỗ trợ góc húc) và Triệu Bà (#45 — phối hợp chiến xa mở combat).
  - *Đối đầu tự nhiên:* Kỵ rơ các sát thủ cơ động trườn bò như Kiko (#01) nhờ đòn quét Cổ Trúc diện rộng làm gián đoạn ảo ảnh.

---

## 5. Ba Điều Bắt Buộc Phải Giữ (Must-Keep Canon)

1. **Chiến tướng cưỡi Thiết Mã lôi hỏa:** Người và ngựa gắn kết qua yên cương, tuyệt đối không lai ghép cơ thể Centaur. Một thực thể điều khiển thống nhất (1 controller, 1 thanh máu, 1 hitbox $0.75\text{m}$).
2. **Cơ chế Xung Lượng Kỵ Mã (Mounted Momentum):** Chạy liên tục tích đà gia tăng tốc độ di chuyển; đòn đánh khi đủ đà chuyển thành cú húc móng sắt lôi hỏa làm choáng mục tiêu đầu tiên.
3. **Khoảnh khắc Thần Kiếm Gãy $\rightarrow$ Nhổ Cổ Trúc Sấm Sét:** Kích hoạt qua Ultimate R. Kiếm vỡ vụn, Phù Đổng nhổ cụm tre thần quét sạch chiến trường với tầm đánh mở rộng $3.5\text{m}$ (+35% AD diện rộng) trong 6.0 giây.
