# 99 · Đăng Mộc / Mok — Concept Bible V2 (Tinh Giản & Khóa Core Gameplay)

**Trạng thái tài liệu:** `CONCEPT_REWRITE_V2 / SCOUT_CORE_ONLY / PENDING_OWNER_FINAL_REVIEW`  
**Nhóm phân loại:** `Keep / Needs Rewrite` (Ứng cử viên Hỗ Trợ / Trinh Sát)  
**Tên làm việc thống nhất:** **Đăng Mộc / Mok** (Tên cũ "Sylva" hay "Cổ Đăng Thảo" chỉ mang tính tham khảo lịch sử).  
**Nguyên tắc sửa đổi:** Cắt bỏ toàn bộ tính năng thừa (bẻ đạn, lướt xuyên tường, ngụy trang, trói toàn vùng, chiếm nút D); gỡ các tuyên bố kỹ thuật và marketing chưa kiểm chứng; tập trung vào **một Core Toy duy nhất: Đặt đèn & Quyết định Giữ hay Tiêu thụ đèn**.

---

## 1. Player Fantasy Cốt Lõi
> **"Tôi pick Mok vì tôi muốn soi trước nơi nguy hiểm, đặt đèn ở vị trí thông minh và khiến đối thủ phải trả giá khi cố phục kích đồng đội."**

Mok không phải là sát thủ mở giao tranh, không phải pháp sư trói diện rộng, và không phải cỗ máy bảo kê toàn năng. Mok là một **Trinh Sát Tác Chiến Bằng Cổ Đăng (Combat Lantern Scout)** — kẻ biến thông tin bản đồ thành lợi thế chiến thuật cụ thể cho toàn đội.

---

## 2. Silhouette & Nhận Diện Thị Giác
- **Hình thể:** Thực thể thực vật cơ khí cổ sinh (Biophilic Automaton) nhỏ gọn, tạo thành từ các khối gỗ hóa thạch màu hổ phách kết hợp khung đồng cổ oxy hóa.
- **Vũ khí / Đặc trưng nhận diện:** Một **Nhánh Đăng Mạch** vươn từ sau lưng qua vai, treo lơ lửng một chiếc **Cổ Đăng Tinh Thạch**. Không cầm gậy phép, không cầm ống thổi.
- **Cổ Đăng trên sân đấu:** Là **một loại vật thể duy nhất (Static Prop)** cắm cố định tại chỗ. Đèn phát ra ánh sáng huỳnh quang màu hổ phách dịu mắt. Tuyệt đối không có AI riêng, không có chân chạy đuổi theo mục tiêu, không có hệ thống pathfinding.

---

## 3. Core Gameplay Toy & Hai Quyết Định Cốt Lõi

Toàn bộ gameplay của Mok xoay quanh việc quản lý và đưa ra 2 quyết định đánh đổi liên tục:

```
                            [CỔ ĐĂNG CỦA MOK]
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        ▼                                                       ▼
 [QUYẾT ĐỊNH 1: ĐẶT ĐÈN Ở ĐÂU?]          [QUYẾT ĐỊNH 2: GIỮ HAY TIÊU THỤ ĐÈN?]
 - Thăm dò bụi rậm phía trước             - GIỮ ĐÈN: Lấy tầm nhìn liên tục
 - Soi đường rút lui cho xạ thủ           - TIÊU THỤ ĐÈN: Kích hoạt khống chế mềm,
 - Giành quyền kiểm soát mục tiêu lớn       đèn biến mất ngay lập tức
```

### Quyết định 1: Đặt Đèn Ở Đâu?
- Mok ném một Cổ Đăng tới vị trí chỉ định trong tầm trung. Đèn cắm xuống mở ra vùng sáng xua tan sương mù chiến tranh (Fog of War) trong một bán kính nhất định `[HYPOTHESIS]`.
- Người chơi phải cân nhắc: Dùng đèn để face-check an toàn một bụi rậm đáng ngờ, cắm sau lưng để soi đường rút lui của xạ thủ, hay cắm quanh hang bùa lớn để canh chừng đối phương tiếp cận?

### Quyết định 2: Giữ Đèn Hay Tiêu Thụ Đèn?
Đây là chiều sâu cơ học lớn nhất của Mok — **phải hy sinh một lợi thế để đổi lấy một lợi thế khác**:
- **Lựa chọn A — Giữ Đèn (Surveillance):** Giữ ngọn đèn tồn tại để cung cấp thông tin vị trí và kiểm soát tầm nhìn liên tục cho toàn đội.
- **Lựa chọn B — Tiêu Thụ Đèn (Tactical Detonation):** Mok kích hoạt lệnh tiêu thụ ngọn đèn. Cổ Đăng lập tức bùng nổ một luồng sóng chấn quang học:
  - Gây một hiệu ứng khống chế mềm có cảnh báo (Làm chậm hoặc Thu hẹp tầm nhìn ngắn hạn `[HYPOTHESIS]`).
  - **Đèn biến mất hoàn toàn ngay sau khi kích hoạt!** Mok mất đi tầm nhìn tại khu vực đó và phải chờ thời gian hồi chiêu để đặt lại đèn mới.

---

## 4. Tương Tác Sạch & Counterplay Minh Bạch

Để đảm bảo đối kháng công bằng và không tạo ra trải nghiệm ức chế:
1. **Quy tắc phát hiện và phá đèn:** Cổ Đăng phát ra ánh sáng mờ mà cả hai phe đều nhìn thấy được. Kẻ địch không cần mắt kiểm soát vẫn có thể nhìn thấy Cổ Đăng nếu bước vào tầm sáng. Đèn có vạch máu cố định `[HYPOTHESIS: 2-3 đòn đánh thường]` để đối thủ chủ động dọn dẹp.
2. **Cảnh báo khi kích nổ đèn:** Khi Mok bấm lệnh tiêu thụ đèn, Cổ Đăng có thời gian trễ phát quang và âm thanh cảnh báo ngắn `[HYPOTHESIS]`, cho phép kẻ địch có phản xạ di chuyển hoặc dùng nút **Dash (D chung)** để thoát ra khỏi bán kính ảnh hưởng.
3. **Tuân thủ quy tắc Input 91:** Mok **hoàn toàn không sử dụng phím D cho bất kỳ kỹ năng lướt riêng nào**. Phím D là nút Dash chung của toàn bộ nhân vật trong game. Mọi thao tác ném đèn và tiêu thụ đèn được bố trí trong bộ kỹ năng Q/W/E/R.

---

## 5. Danh Sách Cơ Chế Đã Bị Cắt Bỏ Khỏi Core Concept

Hội đồng chính thức loại bỏ các cơ chế gây loãng và chồng chéo quyền lực:
- ❌ **CẮT BỎ mạng lưới bẻ góc projectile:** Quá phức tạp và đòi hỏi hệ thống combat hoàn toàn mới.
- ❌ **CẮT BỎ lướt xuyên tường tới đèn:** Biến tướng trinh sát thành sát thủ cơ động cao vô lý.
- ❌ **CẮT BỎ ngụy trang tự động:** Gây trùng lặp với cơ chế của Teemo và sát thủ bóng tối.
- ❌ **CẮT BỎ trói diện rộng toàn vùng:** Gây chồng chéo với pháp sư kiểm soát giao tranh tổng.
- ❌ **CẮT BỎ bẫy nổ độc tố:** Tránh hoàn toàn lối chơi rải mìn gây ức chế.

---

## 6. Rủi Ro Kỹ Thuật & Giả Định Cần Thử Nghiệm `[HYPOTHESIS]`

- **Tương tác Fog of War:** Cần kiểm tra cách hệ thống tầm nhìn của dự án xử lý việc một vật thể tĩnh chia sẻ tầm nhìn qua vách đá và bụi rậm.
- **Ranh giới phá đèn:** Cần playtest thực tế để tìm điểm cân bằng giữa: thời gian tồn tại của đèn, tầm ném, và lượng đòn đánh cần thiết để phá đèn mà không làm người chơi nản lòng.
- **Hình thể AI dựng:** Sinh vật gỗ hóa thạch biped nhỏ gọn là khả thi cho tạo hình sinh vật, nhưng cần thử nghiệm prompt GenAI cụ thể trước khi đánh giá tính sẵn sàng cho production.
