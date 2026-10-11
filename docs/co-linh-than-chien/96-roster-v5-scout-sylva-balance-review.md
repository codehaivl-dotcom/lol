# 96 · COLINH Roster V5 — Thẩm Định Chuyên Sâu: Trinh Sát Cổ Mộc (Sylva / Mok) & Khung Cân Bằng Chống Toxic

**Ngày thực hiện:** 12/10/2026  
**Chuyên gia thẩm định:** Đức "Symmetric" — Senior Balance & Combat Systems Designer  
**Vai trò Hội đồng:** Balance & Counterplay Reviewer  
**Trạng thái tài liệu:** `COUNCIL_ADDENDUM / SCOUT_ARCHETYPE_AUDIT / AWAITING_CREATOR_DECISION`  
**Đối tượng thẩm định:** Đề xuất nhân vật Trinh Sát Cổ Mộc (Sylva / Mok — Scout Archetype lấy cảm hứng từ Maokai + Teemo + Lux)

---

## 1. Bản Chất Rủi Ro Cân Bằng Của Scout Archetype Trong MOBA

Sự kết hợp giữa **Cạm bẫy bụi rậm (Maokai)** + **Nấm tàng hình & Bắn mù (Teemo)** + **Trói chân & Tỉa tầm xa (Lux)** là một trong những công thức **dễ sinh ra "quái thai thiết kế" (Toxic Abomination) nhất lịch sử game đối kháng** nếu không được kiểm soát chặt chẽ bằng lăng kính Counterplay.

### Những hội chứng Anti-Fun lịch sử cần tiêu diệt:
1. **Hội chứng Bãi Mìn Rừng (Teemo Shroom Trap):** Đặt bẫy vô hình kéo dài 5 phút, rải kín các lối đi hẹp và bờ sông. Đối thủ không thể giao tranh tranh chấp mục tiêu lớn (Rồng/Thương Lương) vì chưa kịp bước tới hang đã mất 60% máu do giẫm phải nấm vô hình.
2. **Hội chứng Chồi Non Tự Chạy (Maokai Sapling Rush):** Ném chồi non vào bụi, chồi non tự mọc chân đuổi theo mục tiêu với tốc độ cao và nổ tung. Nạn nhân không có bất kỳ cách nào né tránh ngoài việc chịu trận.
3. **Hội chứng Bắn Mù Chỉ Định (Point-and-Click Blind):** Một nút bấm thẳng vào đầu xạ thủ khiến họ đánh trượt 100% trong 2.5 giây mà không cần ngắm bắn hay căn nhịp.

**Mục tiêu của Balance Review:** Chuyển hóa Sylva từ một "kẻ cắm trại rải bẫy bẩn" thành một **Trinh Sát Chiến Thuật Công Bằng (Tactical Fair Scout)** — mạnh về cung cấp thông tin, kiểm soát nhịp độ, nhưng đối thủ luôn có phương án vô hiệu hóa và phản công trừng phạt.

---

## 2. Giải Pháp Triệt Tiêu Cơ Chế Toxic / Anti-Fun Của Hoa Đèn (Lantern Bloom)

Để việc cắm chốt trinh sát trong bụi rậm không biến bản đồ thành bãi mìn kinh hoàng, Hoa Đèn của Sylva phải tuân thủ nghiêm ngặt các tham số cân bằng cơ học:

### A. Quy Chuẩn Về Thời Gian & Số Lượng Tối Đa (Duration & Quota Cap):
1. **Trần số lượng cứng (Hard Cap): Tối đa 3 Hoa Đèn trên toàn bản đồ cùng lúc.**
   - Nếu Sylva cắm bông hoa thứ 4, bông hoa đầu tiên tự động héo tàn và biến mất.
   - Tuyệt đối không có cơ chế tích lũy vô tận để rải đầy một khu rừng.
2. **Thời gian tồn tại hữu hạn: 60 giây (1 phút).**
   - Đủ thời gian để chuẩn bị trước một pha tranh chấp mục tiêu hoặc phòng thủ đẩy trụ, nhưng không thể tồn tại vĩnh viễn từ đầu trận đến cuối trận.
3. **Tài nguyên dự trữ (Ammo Charges): Tối đa giữ 2 bông trong người.**
   - Thời gian hồi mỗi bông hoa là **20 giây**. Sylva không thể spam liên tục 3 bông cùng một lúc trong 2 giây.

### B. Cơ Chế Nhận Biết & Độ Trễ Kích Hoạt (Detection & Fuse Delay):
1. **Không tàng hình tuyệt đối 100% (Proximity Glow):**
   - Khi kẻ địch tiến lại gần trong phạm vi **3.5 mét**, Hoa Đèn sẽ phát ra ánh sáng huỳnh quang màu hổ phách chập chờn và phát ra tiếng đom đóm vo ve báo động.
   - Bụi rậm có hoa sẽ có những đốm sáng li ti bay lơ lửng ra mép ngoài, cung cấp thông tin thị giác cho đối phương biết *"bụi này đã bị cắm chốt"*.
2. **Độ trễ kích hoạt nổ (Fuse Time) 0.75 giây khi giẫm phải:**
   - Khi kẻ địch bước chân đạp phải cuống hoa, hoa **KHÔNG NỔ TỨC THÌ 0s**.
   - Hoa phình to, phát ra tiếng rít "xì xì" và hiện một **vòng tròn cảnh báo đỏ** trên mặt đất trong 0.75s.
   - Nạn nhân có đủ thời gian phản xạ (250-400ms) để bấm **Dash (D)** hoặc kỹ năng cơ động thoát ra ngoài trước khi nổ phấn hoa! Nếu thoát kịp, hoa bị phá hủy mà nạn nhân không phải chịu hiệu ứng bất lợi.
3. **Phân định rõ Sát thương vs Tiện ích (Utility over Damage):**
   - Hoa Đèn **KHÔNG PHẢI VŨ KHÍ GÂY SỐC SÁT THƯƠNG**.
   - Sát thương nổ của hoa chỉ ở mức tượng trưng (tương đương 1 đòn đánh cơ bản). Hiệu ứng chính là: **Lộ diện tầm nhìn (Reveal) trong 3 giây** và **Làm chậm nhẹ 20% trong 1.5 giây**. Cấm tiệt việc lên đồ full phép để bẫy nổ chết người.
4. **Hoa Đèn cố định, không có chân chạy (No Chasing):**
   - Hoa Đèn là thực vật cắm rễ cố định tại điểm đặt. Tuyệt đối không học đòi cơ chế Maokai chồi non tự bật dậy đuổi theo mục tiêu.

---

## 3. Thiết Kế Counterplay Toàn Diện & Công Bằng Cho Đối Thủ

Một thiết kế tướng chỉ đạt chuẩn khi đối thủ có đầy đủ công cụ để hóa giải bộ kỹ năng của họ:

### A. Cơ Chế Dọn Dẹp Hoa Đèn An Toàn (Defusal Mechanics):
1. **Thanh máu dạng đòn đánh (3 Hit Points):**
   - Hoa Đèn có 3 vạch máu (tương tự Mắt Kiểm Soát trong MOBA).
   - Đòn đánh thường trừ 1 vạch máu; kỹ năng định hướng diện rộng trừ 1 vạch máu.
2. **Rà phá từ xa bằng Kỹ năng Định Hướng (Skillshot Sweeping):**
   - Bất kỳ kỹ năng định hướng nào của đối phương (ví dụ đạn của Iro, neo của Nera, sóng của Forge) bắn xuyên qua bụi rậm trúng Hoa Đèn sẽ lập tức làm Hoa Đèn **phát sáng lộ diện trong 3 giây** và trừ 1 vạch máu.
   - Điều này cho phép các tướng tay dài dọn bẹp cạm bẫy từ cự ly an toàn mà không cần liều mạng face-check bằng mặt.
3. **Phần thưởng kinh tế & Tầm nhìn khi phá bẫy (Risk vs Reward):**
   - Phá hủy một Hoa Đèn thưởng **15 vàng** cho người phá.
   - Đồng thời, người phá hoa nhận được hiệu ứng **"Mắt Tinh Tường" (True Sight Aura)** trong phạm vi 3 mét quanh bản thân trong 3 giây, cho phép phát hiện các hoa đèn lân cận. Biến hành vi đi phá bẫy thành một pha xử lý có lợi thay vì hình phạt ức chế.

### B. Cơ Chế Bắn Mù / Giảm Tầm Nhìn Của Sylva & Lựa Chọn An Toàn Cho Nạn Nhân:
1. **Bắt buộc là Kỹ năng Định Hướng (Skillshot Projectile):**
   - Kỹ năng bắn mù (Bụi Phấn Đom Đóm / Lantern Flash) của Sylva **BẮT BUỘC PHẢI LÀ SKILLSHOT** có đường đạn bay rõ ràng và tốc độ bay vừa phải (khoảng 1200-1400 units/s), cho phép đối phương né tránh được.
   - Cấm hoàn toàn kỹ năng điểm mặt chỉ tên (Point-and-Click) như Teemo.
2. **Cơ chế "Thu Hẹp Tầm Nhìn Cục Bộ" (Near-Sight) thay vì Mù Đen Tuyệt Đối (Hard Blind):**
   - Không tước đoạt khả năng đánh thường của xạ thủ (vốn làm xạ thủ cực kỳ bất lực).
   - Hiệu ứng trúng chiêu là **Thu hẹp tầm nhìn trong 1.5 giây**: Tầm nhìn xung quanh nạn nhân bị thu hẹp lại trong bán kính 4 mét (màn sương cổ mộc bao phủ bên ngoài).
3. **Ba Lựa Chọn Hành Động An Toàn (Safe Actions) của nạn nhân khi bị giảm tầm nhìn:**
   - **Lựa chọn 1 (Rút lui an toàn):** Nạn nhân vẫn giữ 100% tốc độ chạy và quyền bấm phím Dash (D) để lùi lại theo hướng an toàn đã ghi nhớ.
   - **Lựa chọn 2 (Đánh trả cự ly gần):** Trong bán kính 4 mét, nạn nhân vẫn nhìn thấy rõ Sylva nếu Sylva cố tình áp sát. Điều này tạo cơ hội cho các đấu sĩ/sát thủ cận chiến (Brak, Rolo, Vero) tung combo phản công trừng phạt Sylva.
   - **Lựa chọn 3 (Bắn mù kỹ năng diện rộng):** Nạn nhân vẫn sử dụng được toàn bộ kỹ năng định hướng và chiêu thức diện rộng về hướng nghi ngờ có địch để tự vệ.

---

## 4. Năm Lằn Ranh Đỏ (VETO Conditions) Kiên Quyết Không Thỏa Hiệp Đối Với Sylva

Dưới tư cách Balance & Counterplay Reviewer, tôi tuyên bố áp đặt **5 LẰN RANH ĐỎ VETO** đối với bản thiết kế Sylva / Mok:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   5 LẰN RANH ĐỎ VETO CHO SCOUT SYLVA                  │
├────────────────────────────────────────────────────────────────────────┤
│ 1. CẤM BẪY TÀNG HÌNH VĨNH VIỄN (Max 3 hoa, tồn tại tối đa 60s).        │
│ 2. CẤM NỔ TỨC THÌ 0s (Bắt buộc độ trễ Fuse Time tối thiểu 0.75s).      │
│ 3. CẤM SỐC SÁT THƯƠNG TỪ BẪY TẦM NHÌN (Chỉ gây dam tượng trưng).       │
│ 4. CẤM BẮN MÙ POINT-AND-CLICK (Bắt buộc skillshot projectile).         │
│ 5. CẤM CHỒI NON TỰ CHẠY ĐUỔI NGƯỜI (Bẫy phải cố định tại chỗ).         │
└────────────────────────────────────────────────────────────────────────┘
```

1. **VETO 1: CẤM BẪY TÀNG HÌNH VĨNH VIỄN & VÔ TẬN SỐ LƯỢNG.**
   - Không chấp nhận bất kỳ thông số nào vượt quá **3 hoa đèn** cùng lúc và thời gian sống quá **60 giây**. Hoa phải phát quang cảnh báo khi địch lại gần.
2. **VETO 2: CẤM KÍCH NỔ TỨC THÌ 0 GIÂY KHÔNG CÓ THỜI GIAN TRỄ.**
   - Nạn nhân đạp phải bẫy phải có ít nhất **0.75 giây** để nhìn thấy vòng cảnh báo và có cơ hội bấm Dash (D) thoát hiểm.
3. **VETO 3: CẤM LỐI CHƠI BẪY NỔ BỐC HƠI MÁU (NO AP NUKE TRAPS).**
   - Hoa Đèn được định vị là công cụ Trinh Sát / Hỗ Trợ Tầm Nhìn, không phải nguồn sát thương gánh đội. Tổng sát thương của 1 hoa nổ không được vượt quá 120 (+15% AP) ở cấp tối đa.
4. **VETO 4: CẤM HIỆU ỨNG MÙ HOẶC TRÓI CHÂN DẠNG POINT-AND-CLICK.**
   - Cả chiêu bắn mù lẫn chiêu trói ánh sáng (nếu có từ Lux) bắt buộc phải là đạn định hướng có hitbox công bằng, có thể bị chặn bởi lính hoặc né tránh bằng di chuyển.
5. **VETO 5: CẤM CƠ CHẾ SINH VẬT TỰ ĐỘNG TRUY ĐUỔI BỤI RẬM.**
   - Hoa Đèn là thực vật cắm cọc tĩnh. Cấm hoàn toàn việc cho bẫy tự đứng dậy đuổi theo người chơi như chồi non Maokai.

---

## 5. Kết Luận & Định Vị Khuyên Dùng Cho Sylva / Mok

Nếu tuân thủ đầy đủ 5 Lằn Ranh Đỏ và Khung Thiết Kế Counterplay ở trên, Sylva / Mok sẽ trở thành một **Trinh Sát Cổ Mộc thanh lịch, văn minh và đòi hỏi kỹ năng cao**:
- Đem lại cho đội nhà ưu thế kiểm soát thông tin chiến trường và phục kích mục tiêu lớn.
- Đem lại cho đối phương cảm giác đối đầu trí tuệ (mind-game): biết cách rà phá hoa, căn thời gian né đòn và trừng phạt Sylva khi Sylva cắm hoa lỗi vị trí.

Tôi sẵn sàng phê duyệt concept này bước vào hàng ngũ ứng viên chính thức **Keep / Needs Rewrite** nếu tài liệu thiết kế tích hợp đầy đủ các ràng buộc trên.

**Ký tên:**  
*Đức "Symmetric" — Senior Balance & Combat Systems Designer.*
