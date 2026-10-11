# 102 · COLINH Roster V5 — Danh Mục Tuyển Chọn Tướng Nhập Môn (Beginner Concept Shortlist)

**Thời điểm ban hành:** 12/10/2026  
**Trạng thái tài liệu:** `BEGINNER_CONCEPT_SHORTLIST / PROPOSAL_RESEARCH_POOL / PENDING_OWNER_FINAL_GATE`  
**Mục tiêu:** Xây dựng danh mục tướng dễ tiếp cận (Low Skill Floor) cho người chơi mới, giải quyết triệt để sự thiếu hụt tướng nhập môn mà không sao chép nguyên bản bộ kỹ năng của game khác.  
**Quy chế thiết kế nghiêm ngặt:**
- **Không tự ý ghi đè Roster chính thức.** Đây là danh mục nghiên cứu riêng biệt (Proposal Pool).
- **Không tạo asset 3D, không viết kit chi tiết Q/W/E/R.**
- Mọi thông số thời gian, tầm xa, phần trăm đều là **`[Mục tiêu thiết kế / Giả định thử nghiệm - HYPOTHESIS]`**, chưa phải số liệu nghiệm thu thực tế.
- Bỏ toàn bộ các phát biểu khẳng định thị trường không có nguồn hoặc cam đoan pháp lý cảm tính.

---

## 1. Chuẩn Hóa Master Registry & Kiểm Kê Danh Mục Roster V5

Để bảo đảm tính nhất quán của cơ sở dữ liệu trên toàn bộ dự án, Hội đồng phân định rạch ròi 3 nhóm danh mục:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   BẢNG KIỂM KÊ MASTER REGISTRY ROSTER V5                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. NHÓM CONCEPT ĐANG XÉT TRONG ROSTER V5 (47 Concept Hiệu Lực):                  │
│    - Strong Keep (10): Kora, Forge, Aero, Iro, Nera, Vero, Kiko, Moka, Brak, Rolo│
│    - Keep / Needs Rewrite (6): Inka, Libro, Jeli, Pavo, Mok (#37), Kymos         │
│    - Candidate Under Spike (2): Eelix (Locomotion), Oneira (CC Cleanse)          │
│    - Reserve (22): Dron, Soma, Liora, Rana, Boto, Sira, Rava, Namo, Taxa, Loko,  │
│      Marduk, Vark, Vika, Rako, Erran, Garo, Gravi, Mira, Spora, Tethys,          │
│      Magneto, Chrona                                                             │
│    - Cut List (7): Oren, Mora, Cala, Mono, Teko, Vorta, Plasm                    │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 2. BẢN LỊCH SỬ ĐÃ THAY THẾ (2 Concept Lưu Trữ):                                  │
│    - #15-OLD Brak (Đã thay bằng Aero #15)                                        │
│    - #30-OLD Kipa (Đã thay bằng Iro #30)                                         │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 3. NHÓM ĐỀ XUẤT NHẬP MÔN MỚI (Proposal Pool — Giữ ID Nghiên Cứu Riêng):          │
│    - #38 Linh Hầu (Đấu sĩ Cổ Thần Trượng)                                        │
│    - #39 Kael (Đấu sĩ Đánh tay Cuồng Nhịp)                                       │
│    - #40 Liễu Tiễn (Xạ thủ Sương Băng)                                           │
│    - #41 Dương Tiễn (Chiến tướng Tam Tiêm Đao — Bản viết lại)                    │
│    - #42 Pyra (Pháp sư Dung Nham Cổ — Bản viết lại)                              │
│    - [Rewrite Pool]: Bác Quân (Tạm loại kit Jax, chờ ý tưởng cơ học độc bản)     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Giải Quyết Triệt Để Nhận Diện: Kiko (#01) vs. Linh Hầu (#38)

Thực hiện chuẩn xác chỉ đạo của Owner theo **Phương án B**: Giữ nguyên Kiko (#01) là Sát Thủ Ảo Ảnh; Linh Hầu được cấp mã nghiên cứu riêng là **#38 Linh Hầu**. 

Để triệt tiêu hoàn toàn nguy cơ trùng lặp hình thể, hai nhân vật được tách biệt tuyệt đối về ngôn ngữ thiết kế:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│              SO SÁNH NHẬN DIỆN THỊ GIÁC: KIKO (#01) VS. LINH HẦU (#38)           │
├──────────────────────┬────────────────────────────┬──────────────────────────────┤
│ ĐẶC TRƯNG            │ KIKO (#01 — SÁT THỦ)       │ LINH HẦU (#38 — ĐẤU SĨ)      │
├──────────────────────┼────────────────────────────┼──────────────────────────────┤
│ 1. Thể hình          │ Nhỏ thó, gầy gò, lưng cong │ Đồ sộ, ngực nở vai rộng,     │
│    (Body Silhouette) │ nhanh nhẹn, trọng tâm thấp │ đứng thẳng hai chân uy nghi  │
├──────────────────────┼────────────────────────────┼──────────────────────────────┤
│ 2. Dáng di chuyển    │ Nhào lộn 4 chi lắt léo,    │ Bước đi vững chãi, sải bước  │
│    (Locomotion)      │ thoắt ẩn thoắt hiện        │ đường hoàng, vác gậy trên vai│
├──────────────────────┼────────────────────────────┼──────────────────────────────┤
│ 3. Vũ khí            │ Song trảo cơ khí gắn mu tay│ Cổ Thần Trượng Tinh Thạch to │
│                      │ (tuyệt đối không cầm gậy)  │ bản, hai đầu nạm đồng cổ     │
├──────────────────────┼────────────────────────────┼──────────────────────────────┤
│ 4. Trang phục & Màu  │ Giáp da tối màu, mạng che  │ Chiến giáp hoàng kim Cổ Linh,│
│                      │ mặt đồng, vệt tím sương mù │ lông xám bạc, vệt hổ phách   │
├──────────────────────┼────────────────────────────┼──────────────────────────────┤
│ 5. Phong thái        │ Ranh mãnh, cợt nhả, lừa gạt│ Hào hùng, ngạo nghễ, trực    │
│                      │ đối thủ tung chiêu vào hư  │ diện, lao thẳng vào giữa     │
│                      │ không (Outplay tâm lý)     │ quân địch (Đè bẹp tiền tuyến)│
└──────────────────────┴────────────────────────────┴──────────────────────────────┘
```

---

## 3. Chi Tiết Các Concept Nhập Môn Được Tinh Chỉnh & Viết Lại Hoàn Toàn

---

### 3.1. LINH HẦU (#38 — Đấu Sĩ Cổ Thần Trượng)
*Đấu sĩ nhập môn mở giao tranh — Tận dụng cơ chế co giãn trượng trực quan.*

- **Player Fantasy:** *"Tôi pick Linh Hầu vì tôi muốn cầm thần trượng biến điệu cự ly: vươn dài chọc đẩy kẻ địch từ tầm trung, thu ngắn nện đứt gãy mặt đất ở cự ly gần và chống gậy bật nhảy mở combat dũng mãnh."*
- **Core Gameplay Toy — Biến Điệu Tầm Trượng (Staff Reach Modulation):**
  - *Thế Trượng Dài:* Linh Hầu phóng dài đầu trượng ra phía trước, gây sát thương đường thẳng và đẩy lùi nhẹ mục tiêu ở tầm trung `[HYPOTHESIS: ~500 unit]`. Dùng để cấu rỉa và giữ khoảng cách.
  - *Thế Trượng Ngắn:* Thu trượng về nện mạnh xuống mặt đất ở cự ly gần `[HYPOTHESIS: ~200 unit]`, gây sát thương chấn động bộc phát.
  - *Mở giao tranh:* **Chống Trượng Bật Nhảy (Pole Vault Dive)** — Cắm trượng lấy đà nhảy vọt vào tâm giao tranh giáng đòn nện đất làm chậm diện rộng.
- **Thoát khỏi LoL Wukong:** Không tàng hình phân thân, không múa trượng lốc xoáy (Cyclone knockup). Đòn đánh đầm tay, phụ thuộc vào căn cự ly gậy.
- **Dự kiến độ khó:** `[Mục tiêu thiết kế: Sàn kỹ năng thấp ~1.5 sao]`. Người mới chỉ cần nhảy vào và bấm nện đầm tay; người chơi thành thạo căn chuẩn góc vươn dài để giữ an toàn.
- **Counterplay:** Khi vươn dài trượng theo trục thẳng, hai bên sườn bị hở; đối thủ dùng Dash (D) lướt né sang một bên để áp sát.

---

### 3.2. CUỒNG ĐAO / KAEL (#39 — Đấu Sĩ Đánh Tay Cuồng Nhịp)
*Đấu sĩ cận chiến duy trì nhịp chém — Sửa đổi cơ chế gãy nhịp thân thiện với người mới.*

- **Player Fantasy:** *"Tôi pick Kael vì tôi muốn cầm đại đao lao vào chém tay liên thanh: đòn đánh trúng càng nhiều thì nhịp chém càng nhanh, duy trì thế bám đuổi quyết liệt."*
- **Core Gameplay Toy — Nhịp Chém Liên Kích (Continuous Hit Momentum — Bản Sửa Đổi):**
  - Khi Kael chém trúng địch, tích lũy tầng "Cuồng Nhịp" `[HYPOTHESIS: tối đa 5 tầng]`. Mỗi tầng tăng tốc độ đánh và hồi một lượng máu nhỏ cố định.
  - **Sửa lỗi theo chỉ đạo của Owner (Không xóa sạch tức thì):** Khi đổi mục tiêu hoặc khi rời khỏi tầm đánh quá 2.0s, số tầng Cuồng Nhịp **không bị mất trắng ngay lập tức mà suy giảm dần dần** (giảm 1 tầng mỗi 1.2s `[HYPOTHESIS]`). Điều này giúp người mới không bị trừng phạt quá khắc nghiệt khi mục tiêu di chuyển trong giao tranh hỗn loạn.
- **Thoát khỏi Master Yi / Tryndamere:** Không có bất tử 5s, không có chém lướt không thể chọn làm mục tiêu, không có reset toàn bộ hồi chiêu. Kael có 1 chiêu lướt ngắn hướng thẳng vào mục tiêu để duy trì nhịp và 1 chiêu gầm thét tăng kháng làm chậm trong thời gian ngắn `[HYPOTHESIS: ~2.0s]`.
- **Dự kiến độ khó:** `[Mục tiêu thiết kế: Sàn kỹ năng thấp ~1.0 sao]`. Người mới chỉ cần chọn mục tiêu và nhấp chuột chém; người chơi giỏi biết cách luân chuyển giữa các mục tiêu gần nhau để giữ tầng nhịp luôn ở mức tối đa.
- **Counterplay:** Khống chế cứng (choáng/trói) hoặc thả diều kéo dài để các tầng Cuồng Nhịp tụt dốc hoàn toàn.

---

### 3.3. LIỄU TIỄN (#40 — Xạ Thủ Sương Băng Chiến Thuật)
*Xạ thủ giữ cự ly — Sửa đổi cơ chế để không sinh chướng ngại vật va chạm phá vỡ navigation.*

- **Player Fantasy:** *"Tôi pick Liễu Tiễn vì tôi muốn làm một cung thủ an toàn từ tầm xa: bắn ra các vệt sương băng trên mặt đất để làm chậm kẻ truy đuổi và gia tăng tốc độ thả diều cho bản thân."*
- **Core Gameplay Toy — Vệt Sương Băng Chiến Thuật (Frost Path Marking — Bản Sửa Đổi):**
  - **Sửa lỗi theo chỉ đạo của Owner (Không sinh vật thể va chạm):** Liễu Tiễn **KHÔNG tạo ra trụ băng vật lý chặn đường hay thay đổi navigation của map**.
  - Thay vào đó, sau mỗi 3 đòn đánh thường, phát bắn thứ tư rải một **Vệt Sương Băng (Frost Ground Decal)** mỏng trên mặt đất `[HYPOTHESIS: tồn tại ~2.5s]`.
  - Kẻ địch đi trên vệt sương băng bị giảm tốc chạy `[HYPOTHESIS: ~20%]`; Liễu Tiễn đi trên vệt sương băng được tăng tốc chạy `[HYPOTHESIS: ~15%]`, giúp việc thả diều (hit-and-run) cực kỳ mượt mà.
  - Có 1 chiêu lướt lùi bắn mũi tên băng làm chậm kẻ địch gần nhất.
- **Thoát khỏi Ashe:** Không có mưa tên hình nón (Volley), không có đại tiễn xuyên map. Ultimate là **Mưa Băng Rơi (Hailstorm Zone)** thả một quầng sương giá làm chậm diện rộng tầm trung.
- **Dự kiến độ khó:** `[Mục tiêu thiết kế: Sàn kỹ năng thấp ~1.0 sao]`. Rất trực quan, tầm bắn xa, đứng từ xa nhấp bắn và lùi dần trên vệt băng an toàn.
- **Counterplay:** Vệt băng mỏng chỉ nằm trên mặt đất; các tướng lao vào từ trên không hoặc lướt qua nhanh hoàn toàn không bị ảnh hưởng.

---

### 3.4. DƯƠNG TIỄN (#41 — Chiến Tướng Tam Tiêm Đao — Bản Viết Lại Hoàn Toàn)
*Kỳ phùng địch thủ của Linh Hầu — Xóa bỏ hoàn toàn bộ kỹ năng Xin Zhao, phát triển cơ chế Thiên Nhãn độc bản.*

```
┌────────────────────────────────────────────────────────────────────────┐
│ DƯƠNG TIỄN (#41) — BẢN VIẾT LẠI HOÀN TOÀN CƠ CHẾ                      │
├────────────────────────────────────────────────────────────────────────┤
│ • BỎ HOÀN TOÀN: Đòn đánh 3 nhát hất tung + R quét đẩy trừ 1 mục tiêu   │
│ • CƠ CHẾ MỚI: Thiên Nhãn Soi Yếu Điểm & Tam Tiêm Xuyên Kích           │
│   (Truesight Weakpoint & Piercing Thrust)                              │
│ • Độ khó: Dự kiến ~2.0 Sao (Đâm đầm tay, căn góc điểm yếu trực quan)   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Player Fantasy:** *"Tôi pick Dương Tiễn vì tôi muốn làm chiến thần ba mắt uy dũng: mở Thiên Nhãn soi thấu điểm yếu của đối thủ, thả Linh Khuyển khống chế và tung đòn đâm Tam Tiêm Đao xuyên giáp xé toạc điểm yếu."*
- **Silhouette & Nhận diện:** Thần tướng Cổ Linh khôi giáp hoàng kim uy nghiêm, trán có Thiên Nhãn Tinh Thạch rực sáng; tay cầm **Tam Tiêm Lưỡng Nhận Đao** chia 3 mũi sắc bén.
- **Core Gameplay Toy — Thiên Nhãn Soi Yếu Điểm & Tam Tiêm Xuyên Kích:**
  1. **Thiên Nhãn Soi Điểm Yếu (Truesight Scan):** Kỹ năng chủ động mở Thiên Nhãn quét một luồng sáng hình nón trước mặt. Kẻ địch trúng sáng bị lộ diện (kể cả tàng hình) và xuất hiện một **Điểm Yếu Tinh Thạch (Weakpoint)** hiển thị rõ ràng trên một hướng cơ thể (Trước/Sau/Sườn) trong 4.0s `[HYPOTHESIS]`.
  2. **Tam Tiêm Xuyên Kích (Piercing Thrust):** Dương Tiễn tung đòn đâm thương thẳng về phía trước. Nếu đâm trúng góc có Điểm Yếu, đòn đâm sẽ **xuyên qua giáp và gây sát thương bộc phát cực mạnh**; nếu đâm trúng góc thường chỉ gây sát thương cơ bản.
  3. **Linh Khuyển Khóa Chân (Hound Pin):** Phóng một bóng Linh Khuyển Tinh Thạch dạng one-shot projectile lao thẳng tới cắn giữ chân mục tiêu đầu tiên trúng phải trong 1.0s `[HYPOTHESIS]`, giúp Dương Tiễn có đủ thời gian bước tới căn góc đâm vào Điểm Yếu.
- **Thoát khỏi Xin Zhao:** Không có chuỗi 3 đòn hất tung, không có chiêu cuối quét đẩy tạo lôi đài. Lối chơi xoay quanh việc **Soi điểm yếu $\rightarrow$ Khóa chân $\rightarrow$ Chọn góc đâm thương chính xác**.
- **Dự kiến độ khó:** `[Mục tiêu thiết kế: Sàn kỹ năng ~2.0 sao]`. Người mới chỉ cần bấm soi và đâm thẳng; người chơi giỏi di chuyển linh hoạt để đâm đúng góc điểm yếu.
- **Counterplay:** Khi bị đánh dấu Điểm Yếu, đối thủ chỉ cần xoay mặt/đổi hướng đứng để che giấu góc điểm yếu khỏi mũi thương của Dương Tiễn.

---

### 3.5. PYRA (#42 — Viêm Thạch / Dung Nham Cổ — Bản Viết Lại Hoàn Toàn)
*Pháp sư nhập môn kiểm soát không gian — Xóa bỏ bộ chiêu chung chung, phát triển cơ chế Dây Chuyền Dung Nham.*

```
┌────────────────────────────────────────────────────────────────────────┐
│ PYRA (#42) — BẢN VIẾT LẠI HOÀN TOÀN CƠ CHẾ                            │
├────────────────────────────────────────────────────────────────────────┤
│ • BỎ HOÀN TOÀN: Cầu lửa nổ + Bờ tường lửa + Cột lửa rơi tự do          │
│ • CƠ CHẾ MỚI: Dây Chuyền Dung Nham Hai Điểm (Pyre Tether Nodes)        │
│ • Độ khó: Dự kiến ~1.5 Sao (Dễ ngắm, bẫy 2 điểm trực quan)            │
└────────────────────────────────────────────────────────────────────────┘
```

- **Player Fantasy:** *"Tôi pick Pyra vì tôi muốn kiểm soát đường đi bằng bẫy dung nham hai điểm: cắm hai Tinh Thạch Lửa tạo đường nối rực cháy và kích nổ toàn bộ đường nối thiêu rụi kẻ địch."*
- **Silhouette & Nhận diện:** Pháp sư nguyên tố dạng đá lửa Cổ Linh, cơ thể ghép từ các phiến đá bazan đen với các đường nứt dung nham rực cam; hai tay lơ lửng điều khiển hai viên Tinh Thạch Lửa.
- **Core Gameplay Toy — Dây Chuyền Dung Nham Hai Điểm (Pyre Tether Nodes):**
  - Pyra có thể cắm tối đa 2 **Tinh Thạch Lửa (Pyre Stones)** trên mặt đất ở khoảng cách trung bình `[HYPOTHESIS: tầm cắm ~600 unit]`.
  - Khi có đủ 2 viên đá trên sàn, một **Dải Dây Chuyền Dung Nham (Magma Tether)** tự động hình thành nối giữa hai viên đá. Kẻ địch bước ngang qua dải dây bị thiêu đốt liên tục và chịu hiệu ứng làm chậm `[HYPOTHESIS: ~30%]`.
  - **Kích nổ đường nối:** Pyra bắn một tia nhiệt kích hoạt vào 1 trong 2 viên đá: Toàn bộ dải dung nham nối giữa 2 viên đá phát nổ tức thì thành một đợt sóng lửa bộc phát!
- **Thoát khỏi pháp sư lửa generic:** Không phải ném cầu lửa hay thả thiên thạch vô hồn. Dạy người mới cách tư duy hình học đơn giản nhất: **Đặt điểm A $\rightarrow$ Đặt điểm B $\rightarrow$ Tạo ranh giới dung nham $\rightarrow$ Kích nổ**.
- **Dự kiến độ khó:** `[Mục tiêu thiết kế: Sàn kỹ năng ~1.5 sao]`. Người mới chỉ cần cắm 2 điểm ngang lối đi hẹp để chặn đường; người chơi giỏi cắm kẹp đối phương vào giữa để kích nổ kép.
- **Counterplay:** Kẻ địch có thể đánh 2 đòn đánh thường phá hủy một trong hai Tinh Thạch Lửa để làm đứt gãy đường dây trước khi nó phát nổ `[HYPOTHESIS]`.

---

### 3.6. BÁC QUÂN (Tạm Loại Về Rewrite Pool)
- **Quyết định:** Tuân thủ chỉ đạo của Owner, **Bác Quân chính thức được đưa về REWRITE POOL**. Hội đồng không tiếp tục phát triển bộ chiêu thức né đòn + đòn thứ 3 nổ kiểu Jax do chưa tìm được cơ chế Cổ Linh hóa thực sự độc bản và khác biệt.

---

## 4. Roster 6 Tướng Thử Nghiệm Nhập Môn Hoàn Chỉnh (Trải Đều 5 Vai Trò)

Dưới đây là danh sách 6 vị trí thử nghiệm cho người mới đã được rà soát và phê duyệt nguyên tắc:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               DANH SÁCH 6 TƯỚNG THỬ NGHIỆM NHẬP MÔN (TIER 1 ĐỀ XUẤT)                   │
├───────────────┬───────────────────────────┬────────────────────────────────────────────┤
│ VAI TRÒ       │ ỨNG CỬ VIÊN               │ CORE GAMEPLAY TOY & BÀI HỌC CHO TÂN THỦ    │
├───────────────┼───────────────────────────┼────────────────────────────────────────────┤
│ 1. ĐẤU SĨ     │ LINH HẦU (#38)            │ Biến điệu tầm trượng dài/ngắn, nện đất     │
│    (Fighter)  │ (Hầu Vương Thần Trượng)   │ đầm tay, nhảy chống trượng mở giao tranh.  │
├───────────────┼───────────────────────────┼────────────────────────────────────────────┤
│ 2. ĐÁNH TAY   │ CUỒNG ĐAO / KAEL (#39)    │ Tích tầng Cuồng Nhịp chém tay liên tục;    │
│    (Skirmisher│ (Tàn Kiếm Cổ Tộc)         │ nhịp suy giảm dần giúp newbie giữ phong độ.│
├───────────────┼───────────────────────────┼────────────────────────────────────────────┤
│ 3. XẠ THỦ     │ LIỄU TIỄN (#40)           │ Vệt sương băng trên mặt đất hỗ trợ thả     │
│    (Marksman) │ (Thợ Săn Băng Cung)       │ diều; không phá vỡ navigation bản đồ.      │
├───────────────┼───────────────────────────┼────────────────────────────────────────────┤
│ 4. ĐỠ ĐÒN     │ LÒ CỔ / FORGE (#17)       │ Đứng tuyến trước hút đòn, tích nhiệt dâng  │
│    (Tank)     │ (Từ Strong Keep Roster V5)│ cao và xả áp suất mở combat diện rộng.     │
├───────────────┼───────────────────────────┼────────────────────────────────────────────┤
│ 5. HỖ TRỢ     │ SỨA CHUÔNG / JELI (#34)   │ Hồi phục diện rộng theo nhịp chuông nước;  │
│    (Support)  │ (Từ Keep/Rewrite Roster V5) đi kèm bảo vệ chủ lực, giữ cự ly an toàn.  │
├───────────────┼───────────────────────────┼────────────────────────────────────────────┤
│ 6. PHÁP SƯ    │ VIÊM THẠCH / PYRA (#42)   │ Cắm 2 tinh thạch tạo dây dung nham và kích │
│    (Mage)     │ (Pháp Sư Dung Nham Cổ)    │ nổ; tư duy kiểm soát không gian 2 điểm.    │
└───────────────┴───────────────────────────┴────────────────────────────────────────────┘
```

*(Lưu ý: **Dương Tiễn (#41)** được giữ lại trong Proposal Pool như một phương án Đấu Sĩ Thần Binh bổ trợ độc lập, có thể luân chuyển với Linh Hầu hoặc mở rộng sau này).*

---

## 5. Ma Trận Đối Chiếu Tránh Trùng Lặp Trải Nghiệm (Cross-Check Với Shortlist Roster V5)

Bảo đảm 6 tướng nhập môn không cạnh tranh trực tiếp hay triệt tiêu lối chơi của 16 tướng Shortlist hiện tại:

| Tướng Nhập Môn Mới | Tướng Shortlist Hiện Tại Có Nguy Cơ Gần Nhất | Khác Biệt Tuyệt Đối Về Trải Nghiệm Gameplay |
| :--- | :--- | :--- |
| **Linh Hầu (#38)** | **Brak (#02 — Piston Parry)** | Brak là đấu sĩ phản đòn nhịp điệu Sekiro (kỹ năng cực cao); Linh Hầu là đấu sĩ càn lướt trực diện, biến điệu tầm đánh dài/ngắn, ai vào cũng nện trúng ngay. |
| **Linh Hầu (#38)** | **Kiko (#01 — Sát Thủ Ảo Ảnh)** | Kiko là sát thủ nhỏ con lừa góc nhìn bằng ảo ảnh; Linh Hầu là đấu sĩ đồ sộ càn lướt tiền tuyến bằng đại trượng. |
| **Cuồng Đao / Kael (#39)** | **Vero (#03 — Vết Kiếm Thời Gian)** | Vero là sát thủ dồn sát thương trễ tính toán; Kael là đấu sĩ đánh tay đầm đòn duy trì nhịp chém liên thanh tại chỗ. |
| **Liễu Tiễn (#40)** | **Iro (#30) & Aero (#15)** | Iro là sniper ngắm tĩnh xuyên map; Aero là phi cơ lượn rải bom; Liễu Tiễn là xạ thủ bắn cung truyền thống vừa đi vừa bắn an toàn trên vệt băng. |
| **Dương Tiễn (#41)** | **Nera (#07 — Dạ Neo)** | Nera bắn neo cơ động kéo tường/giật lệch; Dương Tiễn lao vào phóng linh khuyển khóa chân và căn góc đâm xuyên điểm yếu của mục tiêu. |
| **Pyra (#42)** | **Inka (#19 — Pháp Sư Thư Pháp)** | Inka vẽ các đường mực hình học phức tạp; Pyra chỉ cắm 2 điểm tạo dây dung nham cực kỳ trực quan, dễ hiểu. |

---

## 6. Kính Trình Owner Nghiệm Thu & Phê Chuẩn

Hội đồng kính trình Owner xem xét các nội dung đã chuẩn hóa:
1. **Xác nhận giải quyết Kiko & Linh Hầu:** Kiko #01 giữ nguyên Sát Thủ Ảo Ảnh; Linh Hầu mang ID nghiên cứu riêng #38 với thể hình và thần trượng độc bản.
2. **Xác nhận sửa đổi Kael & Liễu Tiễn:** Kael suy giảm nhịp dần dần; Liễu Tiễn chỉ rải vệt sương băng trên sàn, không sinh chướng ngại vật va chạm.
3. **Phê duyệt bản viết lại của Dương Tiễn (#41) & Pyra (#42):** Thoát ly hoàn toàn khỏi Xin Zhao và phép lửa generic.
4. **Xác nhận đưa Bác Quân về Rewrite Pool.**
5. **Chấp thuận bộ 6 ứng viên thử nghiệm nhập môn** làm cơ sở nghiên cứu trước khi bước sang giai đoạn Playtest.
