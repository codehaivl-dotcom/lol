# 94 · COLINH Roster V5 — Hội Đồng Audit Nội Bộ & Tranh Luận Chuyên Sâu 36 Concept

**Ngày thực hiện:** 11/10/2026 – 12/10/2026  
**Trạng thái tài liệu:** `DEEP_AUDIT_REPORT / PROPOSAL_ONLY / NOT_APPROVED_PRODUCTION`  
**Đầu vào đối soát:**
- [92 · Hero Roster Discovery V5 Concept Candidates](92-roster-discovery-v5-concept-candidates.md)
- [93 · Hero Roster V5 Team Audit Brief](93-roster-v5-team-audit-brief.md)
- [Bảng điểm đối chiếu CSV](roster-v5-team-audit-scorecard-filled.csv)

---

## 1. Executive Summary (Tóm tắt điều hành)

Hội đồng Audit Nội bộ Cổ Linh Thần Chiến đã tiến hành thẩm định độc lập và tranh luận đa phương diện đối với **36 concept tướng V5** cùng 2 hạt nhân độc lập (**Aero / Phi Công Cổ Khí** và **Iro / Mắt Thiên Cơ**). 

Mục tiêu duy nhất của đợt audit này không phải là vẽ kit chi tiết, không chạy Balance Lab hay sinh model 3D, mà là trả lời dứt khoát câu hỏi cốt lõi:
> **"Người chơi pick con này để được làm điều gì mà con khác trong game không làm được?"**

### Các phát hiện và quyết định trọng yếu:
1. **Khắc phục lỗi danh sách gốc (Sự cố Hạt nhân Aero & Iro):**
   - Hội đồng phát hiện bảng 36 concept sơ bộ có 2 sai sót nghiêm trọng:
     - Concept #15 (`Thiết Quyền / Brak`) là bản sao chép 100% của Concept #02 (`Nhịp Quyền / Brak`) từ tên gọi tiếng Anh đến lối chơi võ sĩ piston.
     - Concept #30 (`Thủ Kho Lane / Kipa`) là một ý tưởng hỗ trợ macro thuần túy không có tương tác giao tranh (combat fantasy rỗng), vi phạm triết lý hành động MOBA.
     - Trong khi đó, hai hạt nhân xuất sắc nhất từ Vòng B là **Aero** (phi công cổ khí) và **Iro** (sniper mắt cơ khí) lại bị bỏ sót ngoài bảng 36.
   - **Quyết định đồng thuận tuyệt đối:** Thực hiện **Hướng 1** từ Brief 93: Thay thế trực tiếp #15 (Brak trùng lặp) bằng **Aero** và thay thế #30 (Kipa macro vô hồn) bằng **Iro**.
2. **Thiết lập Đề xuất Top 24 Hoàn Hảo:**
   - 24 concept được lựa chọn đạt tỷ lệ phân bổ chuẩn mực: **4 Sát thủ, 4 Đấu sĩ, 4 Đỡ đòn, 4 Xạ thủ, 4 Pháp sư, 4 Hỗ trợ**.
   - Roster loại bỏ triệt để vấn nạn "toàn bộ nhân vật là người đi bộ đổi màu giáp", đưa vào các cơ thể dị thường: Cua khổng lồ bọc thép (Kora), Phi cơ cổ khí (Aero), Nhãn cầu cơ khí bay (Iro), Bào tử hổ ký sinh (Moka), Sứa chuông phát âm (Jeli), và Tê tê vảy tách rời (Rolo).
3. **Thanh lọc triệt để Pet / Drone / Macro RTS:**
   - Cắt bỏ hoàn toàn các ý niệm summon rác gây nghẽn lane (Mora - Vườn Ăn Thịt).
   - Thiết lập lằn ranh đỏ cho cơ chế Ký sinh (Soma): **Tuyệt đối không làm Yuumi thứ hai** (Soma không được tàng hình bất tử; phải giữ cơ thể trên lane và chia sẻ sát thương).
   - Drone (Dron) và Mascot (Boto) bị khóa chặt trong cơ chế Orbit Drone chuyển mode và Mascot thu gom cục bộ, không có micro control.
4. **Quy chế bảo tồn:** Báo cáo này là đề xuất thẩm định, **chưa phải roster chính thức**, không cấp phép tạo model/VFX và không can thiệp vào tài liệu sản xuất cũ (`03-danh-sach-tuong.md`).

---

## 2. Thành phần Hội Đồng Audit (Team Roles)

Để bảo đảm tính khách quan và tranh luận đa chiều chân thực, Hội đồng gồm 7 chuyên gia đại diện cho 7 góc nhìn khắt khe nhất trong phát triển game MOBA:

| # | Vai trò | Chuyên gia phụ trách | Trọng tâm đánh giá |
|---|---|---|---|
| 1 | **Lead MOBA Designer** | *Minh "Vortex"* | Đánh giá gameplay loop, player agency, độ sâu quyết định, tướng có đáng chơi và có tạo highlight 5v5 không. |
| 2 | **Dota/LoL/Hero Archetype Analyst** | *Hoàng "Meta"* | So sánh trực diện với hơn 300 tướng MOBA trên thị trường. Săn lùng sự lỗi thời, nhàm chán hoặc sao chép rập khuôn. |
| 3 | **AI Production Director** | *Kỹ sư Trí "Pipeline"* | Thẩm định tính khả thi của model 3D gen AI, rig khung xương, animation blend, shader VFX trong điều kiện sản xuất tự động. |
| 4 | **Combat Clarity / UX Reviewer** | *Tuấn "Pixel"* | Khả năng đọc trận đấu từ camera isometric góc nghiêng, độ tương phản hitbox, visual noise, telegraph cảnh báo. |
| 5 | **Balance & Counterplay Reviewer** | *Đức "Symmetric"* | Kiểm tra cơ chế counterplay, chống các cơ chế độc hại (toxic kits, binary stat-check, anti-fun, perma-silence). |
| 6 | **Originality / IP Risk Reviewer** | *Luật sư Lâm "Shield"* | Rà soát rủi ro pháp lý và nhận diện thương hiệu. Tuyệt đối không để xảy ra kiện tụng bản quyền với Riot, Valve, Blizzard, anime. |
| 7 | **Player Fantasy / Marketing Reviewer** | *Hương "Viral"* | Nhìn dưới góc độ người chơi và truyền thông: Concept có đủ sức hút để người ta tải game, chọn tướng, và cắt clip triệu view không. |

---

## 3. Tiêu chuẩn & Thang điểm Audit (Audit Methodology)

Mỗi concept được chấm điểm độc lập dựa trên thang 100 điểm với 5 trụ cột bắt buộc:

$$\text{Tổng điểm} = \text{Fantasy (25)} + \text{Gameplay Toy (25)} + \text{Counterplay (15)} + \text{Ultimate (15)} + \text{Production (20)}$$

### Tiêu chí chi tiết:
1. **Player Fantasy (25 điểm):** Trả lời câu "Tôi pick nó vì tôi được...". Cảm giác nhập vai có độc nhất, kích thích và có bản sắc Cổ Linh (văn minh cổ triệu năm) không?
2. **Core Gameplay Toy (25 điểm):** Có cơ chế cơ học riêng biệt để thao tác không? (Không chấp nhận bộ skill chung chung: Q gây dam, W làm chậm, E lướt, R nổ).
3. **Counterplay (15 điểm):** Đối thủ có cơ hội đọc đòn, né tránh, bait hoặc phản công không? Có tạo cảm giác bất lực ức chế không?
4. **Ultimate Moment Tiềm Năng (15 điểm):** Chiêu R có tạo nên khoảnh khắc bùng nổ xoay chuyển giao tranh và đáng nhớ trên trailer không?
5. **AI Production Feasibility (20 điểm):** Rigging có bị gãy không? Animation có tạo được bằng AI tool không? Shader có làm sập FPS mobile không?

### Ngưỡng kết luận:
- **85 – 100 điểm:** `Strong Keep` (Hạt nhân vững chắc, ưu tiên phát triển ngay).
- **70 – 84 điểm:** `Keep / Needs Rewrite` (Giữ lại nhưng bắt buộc viết lại cơ chế ở tầng concept).
- **55 – 69 điểm:** `Reserve` (Chuyển vào kho dự bị, xem xét khi roster thiếu mảnh ghép).
- **< 55 điểm:** `Cut` (Loại bỏ thẳng tay, không cứu vãn bằng skill chi tiết).

---

## 4. Nhật ký Đánh giá Độc lập (Reviewer-by-Reviewer Notes)

Trong Vòng 1, từng reviewer chấm điểm độc lập không thông qua ý kiến của người khác. Dưới đây là biên bản ghi nhận quan điểm cá nhân:

### 4.1. Lead MOBA Designer (Minh "Vortex")
- **Top 12:** Kora (32), Forge (17), Nera (07), Vero (03), Aero, Iro, Inka (19), Libro (28), Brak (02), Kiko (01), Rana (21), Rako (13).
- **Bottom 8:** Kipa (30), Cala (27), Oren (18), Mora (24), Mono (06), Rava (04), Namo (11), Loko (16).
- **Red Flags phát hiện:**
  - *"Roster ban đầu quá nhiều tướng thụ động ngồi chờ đối thủ đánh vào mình (Rava, Brak, Forge). Cần gạt bớt Rava, chỉ giữ Forge vì Forge có chu kỳ xả áp chủ động."*
  - *"Kipa (#30) hoàn toàn không có gameplay MOBA. Bỏ lính chạy vòng ngoài buff tem là lối chơi của game idle, không phải game đối kháng 5v5."*

### 4.2. Dota/LoL/Hero Archetype Analyst (Hoàng "Meta")
- **Top 12:** Kora (32), Libro (28), Vero (03), Aero, Iro, Nera (07), Moka (31), Jeli (34), Inka (19), Rolo (36), Dron (26), Vika (12).
- **Bottom 8:** Garo (#08), Oren (#18), Mora (#24), Vark (#09), Mono (#06), Brak-15 (#15), Rava (#04), Cala (#27).
- **Red Flags phát hiện:**
  - *"Garo (#08) quá giống Pudge/Blitzcrank/Thresh. Cú móc nếu chỉ là kéo 1 mục tiêu về thì chẳng có gì mới mẻ cả. Cần phải có biến tấu từ trường Cổ Linh."*
  - *"Oren (#18) quay búa quanh thân là bản sao lỗi của Garen và Juggernaut. Loại ngay lập tức."*
  - *"Vark (#09) nhốt solo là Legion Commander hoặc Camille. Cần cơ chế lôi đài bình đẳng có luật chơi thay vì ép đọ chỉ số thuần túy."*

### 4.3. AI Production Director (Kỹ sư Trí "Pipeline")
- **Top 12:** Forge (17), Iro, Aero, Brak (02), Rako (13), Rana (21), Libro (28), Rolo (36), Dron (26), Nera (07), Garo (08), Kiko (01).
- **Bottom 8:** Sira (#22), Eelix (#33), Jeli (#34), Pavo (#35), Inka (#19), Loko (#16), Marduk (#14), Mora (#24).
- **Red Flags phát hiện:**
  - *"Eelix (#33) là lươn trườn bò trên cạn: Đây là ác mộng rigging lớn nhất lịch sử 3D AI! Xương cột sống uốn lượn liên tục ma sát với mesh đất sẽ gây hiện tượng trượt chân (foot sliding) và xé nát mesh bụng. Phải đổi sang dạng lướt nước hoặc bán nhân ngư!"*
  - *"Sira (#22) có 8 chân nhện: AI rig hiện tại không thể xử lý chân côn trùng bám bề mặt ghồ ghề. Cắt hoặc dự bị."*
  - *"Pavo (#35) xòe đuôi công và Jeli (#34) sứa trong suốt: Cực kỳ nặng shader và spring bone. Phải giới hạn tham số vật lý."*

### 4.4. Combat Clarity / UX Reviewer (Tuấn "Pixel")
- **Top 12:** Kora (32), Rana (21), Forge (17), Rako (13), Brak (02), Iro, Aero, Vero (03), Libro (28), Nera (07), Moka (31), Rolo (36).
- **Bottom 8:** Inka (#19), Teko (#20), Liora (#10), Sira (#22), Boto (#29), Mora (#24), Taxa (#23), Kiko (#01).
- **Red Flags phát hiện:**
  - *"Inka (#19) vẽ mực lên sàn: Nếu cho phép vẽ tự do, giao tranh 5v5 sẽ biến thành một bãi mực đen sì, che lấp toàn bộ vòng tròn báo động skill địch và lính!"*
  - *"Boto (#29) làm rơi mảnh khắp nơi: Quá nhiều vụn năng lượng rơi rớt sẽ khiến người chơi nhầm lẫn với bẫy hoặc đạn định hướng."*

### 4.5. Balance & Counterplay Reviewer (Đức "Symmetric")
- **Top 12:** Kora (32), Brak (02), Rana (21), Forge (17), Libro (28), Nera (07), Rolo (36), Iro, Vero (03), Rako (13), Jeli (34), Aero.
- **Bottom 8:** Soma (#25), Erran (#05), Taxa (#23), Teko (#20), Vark (#09), Cala (#27), Kipa (#30), Mora (#24).
- **Red Flags phát hiện:**
  - *"Soma (#25) ký sinh vào đồng minh: Tôi bỏ phiếu VETO nếu Soma tàng hình không thể chọn làm mục tiêu như Yuumi! Đó là cơ chế hủy hoại tính tương tác. Soma phải giữ nguyên thân thể trên bản đồ và chia sẻ sát thương!"*
  - *"Erran (#05) trừng phạt người bấm skill: Trừng phạt người khác vì họ bấm nút là tư duy thiết kế tiêu cực. Cần sửa thành bắt lỗi khi họ dùng chiêu trượt."*

### 4.6. Originality / IP Risk Reviewer (Luật sư Lâm "Shield")
- **Top 12:** Kora (32), Libro (28), Forge (17), Inka (19), Moka (31), Jeli (34), Rolo (36), Aero, Iro, Vero (03), Brak (02), Rana (21).
- **Bottom 8:** Kiko (#01), Garo (#08), Oren (#18), Vark (#09), Rana (#21), Mora (#24), Brak-15 (#15), Mono (#06).
- **Red Flags phát hiện:**
  - *"Kiko (#01) là khỉ linh hầu: Rất dễ bị quy chụp là Ngộ Không nếu cho cầm gậy như ý hoặc đeo vòng kim cô. Bắt buộc Kiko phải đeo mặt nạ đồng Cổ Linh và dùng vuốt/dao găm di vật."*
  - *"Garo (#08) cầm xích móc thịt là dính ngay vi phạm bản quyền Pudge của Valve. Phải chuyển thành xích từ trường cổ khí."*

### 4.7. Player Fantasy / Marketing Reviewer (Hương "Viral")
- **Top 12:** Kora (32), Aero, Moka (31), Jeli (34), Kiko (01), Forge (17), Iro, Libro (28), Vero (03), Marduk (14), Nera (07), Rako (13).
- **Bottom 8:** Rava (#04), Mono (#06), Kipa (#30), Oren (#18), Namo (#11), Cala (#27), Brak-15 (#15), Loko (#16).
- **Red Flags phát hiện:**
  - *"Trailer cần những cú nổ visual: Kora chặn đứng đạn đại bác bằng hai càng thép; Aero lượn phi cơ rải thảm bom plasma; Moka nhảy vồ xé toạc màn đêm. Những con như Kipa (thủ kho) hay Mono (đấm 1 nhịp) đưa vào trailer sẽ làm người xem tắt video sau 3 giây!"*

---

## 5. Tranh Luận & Xung Đột Nảy Lửa (Conflict Discussion)

Vòng 2 ghi nhận 5 cuộc đối đầu quan điểm gay gắt nhất giữa các thành viên hội đồng:

```
                                  [HỘI ĐỒNG AUDIT V5]
                                           │
         ┌──────────────────┬──────────────┴─────┬──────────────────┐
         ▼                  ▼                    ▼                  ▼
    [TRANH CÃI 1]      [TRANH CÃI 2]        [TRANH CÃI 3]      [TRANH CÃI 4]
   Garo Hook Cũ       Soma Ký Sinh         Eelix Trườn Bò     Sự cố Aero/Iro
  (IP vs MOBA Core)  (Yuumi vs Counter)   (Fantasy vs AI Rig) (Sai lệch Roster)
```

### Tranh cãi 1: Móc Quỷ Garo (#08) — Bản sao rẻ tiền hay Cột trụ bắt buộc của MOBA?
- **Lâm (IP Risk):** *"Garo là một vết nhơ originality. Móc kéo đơn thuần trúng là lôi về? Pudge, Blitzcrank, Thresh, Devourer, Gudge... bao nhiêu game đã xài nát nước rồi! Người chơi sẽ cười vào mặt COLINH nếu thấy một gã đồ tể quăng móc."*
- **Minh (Lead Designer):** *"Nhưng MOBA bắt buộc phải có ít nhất một hero trừng phạt vị trí tầm xa (displacement initiator)! Nếu bỏ hoàn toàn archetype này, giao tranh quanh mục tiêu lớn sẽ cực kỳ bế tắc. Không ai dám mở combat!"*
- **Tuấn (UX Reviewer):** *"Giải pháp ở đây là Cổ Linh hóa cơ chế móc: Không phải sợi xích kéo một chiều. Garo ném một Cọc Từ Trường Cổ Đại. Khi giật, từ trường hút cả nạn nhân VÀ Garo va chạm vào nhau tại điểm trung tâm (Kinetic Collision). Vừa có kéo, vừa có rủi ro lao vào, vừa thoát bóng dáng Pudge!"*
- **Kết luận:** **Giữ Garo ở nhóm Keep / Needs Rewrite** với cơ chế Va chạm Từ trường.

### Tranh cãi 2: Ký Sinh Hộ Thể Soma (#25) — Bóng ma Yuumi phá hủy cân bằng?
- **Đức (Balance):** *"Tôi kiên quyết phủ quyết nếu Soma chui vào người đồng minh và biến mất khỏi thanh target. Yuumi đã phá nát LMHT trong 4 năm trời vì loại bỏ nguyên tắc cơ bản nhất: Muốn bảo vệ xạ thủ thì support phải có nguy cơ chết trước!"*
- **Hương (Marketing):** *"Nhưng fantasy cộng sinh sinh học cổ đại rất cuốn hút! Cảm giác như Venom hoặc một thực thể bảo hộ cổ xưa."*
- **Minh (Lead Designer):** *"Chúng ta giải quyết bằng thiết kế: Soma KHÔNG BAO GIỜ chui vào bụng đồng minh. Thân thể Soma vẫn đứng trên đất, nhận target bình thường. Kỹ năng của Soma là phóng ra một Kén Hộ Thể Bào Tử bám lên đồng minh. 30% sát thương đồng minh nhận sẽ truyền ngược lại thanh máu của Soma. Soma có thể kích hoạt nổ kén để cứu nguy. Nếu kẻ địch focus giết chết Soma, kén trên người đồng minh vỡ vụn!"*
- **Kết luận:** **Giữ Soma ở nhóm Keep / Needs Rewrite** với điều kiện tiên quyết: Không tàng hình, không untargetable.

### Tranh cãi 3: Lươn Đêm Eelix (#33) — Fantasy Vực sâu tuyệt đỉnh vs Ác mộng Rigging AI
- **Trí (AI Production):** *"Tôi cảnh báo lần cuối: Mô hình rắn/lươn bò trên cạn bằng AI tool là không thể chạy trơn tru trong quý này. Mesh sẽ bị kéo giãn vỡ texture ở phần bụng, animation chuyển hướng 180 độ sẽ giật cục và đâm xuyên địa hình!"*
- **Hương (Marketing):** *"Nhưng Eelix là sát thủ mang màu sắc huyền bí vực sâu duy nhất của Cổ Linh! Tạo vệt nước đen tối rồi lao vút theo đường nước là gameplay cực kỳ mãn nhãn!"*
- **Trí (AI Production):** *"Nếu muốn giữ, bắt buộc phải đổi tạo hình: Eelix không phải là con lươn thuần túy bò trườn. Eelix là Bán Nhân Ngư Cổ Đại (nửa thân trên dạng biped hình người, thân dưới là đuôi lướt trên một luồng sóng nước ma thuật lơ lửng - hover glide). Dùng khung xương biped chuẩn kết hợp đuôi phụ, AI pipeline xử lý trong 2 ngày là xong!"*
- **Kết luận:** **Giữ Eelix ở nhóm Keep / Needs Rewrite**, phê duyệt tái cấu trúc rig thành Bán Nhân Ngư lướt sóng.

### Tranh cãi 4: Vụ bê bối Aero & Iro — Tại sao hạt nhân kim cương bị bỏ rơi?
- **Hoàng (Archetype):** *"Tại sao trong bảng 36 lại xuất hiện đến hai ông võ sĩ đấm piston tên là Brak (#02 và #15)? Ai đã copy-paste dòng này vào bảng discovery? Trong khi đó, hai concept xuất sắc nhất là Aero (phi công cổ khí) và Iro (sniper mắt thần) lại biến mất?"*
- **Minh (Lead Designer):** *"Đó là lỗi lọc dữ liệu ở vòng sơ bộ. Brief 93 đã chỉ đích danh điểm này để hội đồng audit xử lý. Chúng ta có 3 lựa chọn từ Creator: Thêm vào thay 2 con yếu, giữ reserve, hoặc cắt."*
- **Cả 7 Reviewer đồng thanh:** *"Thực hiện ngay Lựa chọn 1! Cắt bỏ #15 Brak (bản sao vô nghĩa), cắt bỏ #30 Kipa (ông thủ kho macro vô tích sự). Đưa Aero và Iro vào Roster chính ngay lập tức!"*

### Tranh cãi 5: Mực Mù Inka (#19) — Nghệ thuật thư pháp hay Bãi rác hiển thị?
- **Tuấn (UX Reviewer):** *"Vẽ mực lên đất nghe rất thơ, nhưng khi Inka quẹt 4-5 đường mực đen ngòm trên sông, làm sao người chơi nhìn thấy chiêu lướt của Kiko hay vùng nổ của Forge?"*
- **Lâm (IP Risk):** *"Inka là bản sắc Cổ Linh thuần khiết nhất trong nhóm pháp sư. Nó kết hợp thư pháp Á Đông với năng lượng cổ đại triệu năm. Không thể cắt!"*
- **Minh (Lead Designer):** *"Giải quyết bằng kỹ thuật game design: Giới hạn tối đa Inka chỉ được tồn tại 2 vệt mực cùng lúc. Vệt mực có độ trong suốt (alpha blend) và chỉ phát sáng khi được kích nổ. Sau 4 giây mực tự khô và biến mất. Đây là gameplay toy độc nhất vô nhị."*
- **Kết luận:** **Strong Keep Inka (#19)** với ràng buộc kỹ thuật rõ ràng.

---

## 6. Bảng Điểm Chi Tiết 36 Concept (Score Table)

*Ghi chú: Concept #15 đã được chuyển giao cho **Aero**, Concept #30 đã được chuyển giao cho **Iro** theo nghị quyết thống nhất của Hội đồng.*

| ID | Tên Việt / English | Vai trò | Fantasy (25) | Toy (25) | Counter (15) | Ult (15) | Prod (20) | Tổng | Kết luận |
|:---:|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **01** | **Ảnh Hầu / Kiko** | Sát thủ | 24 | 23 | 12 | 13 | 15 | **87** | **Strong Keep** |
| **02** | **Nhịp Quyền / Brak** | Đấu sĩ | 21 | 23 | 13 | 12 | 16 | **85** | **Strong Keep** |
| **03** | **Vết Kiếm / Vero** | Sát thủ | 23 | 24 | 12 | 14 | 14 | **87** | **Strong Keep** |
| 04 | Hấp Đòn / Rava | Đấu sĩ | 15 | 16 | 11 | 10 | 12 | **64** | Reserve |
| **05** | **Thợ Săn Lỗi / Erran** | Sát thủ | 18 | 20 | 11 | 12 | 14 | **75** | **Keep / Rewrite** |
| 06 | Võ Sư Một Nhịp / Mono | Đấu sĩ | 14 | 15 | 11 | 9 | 10 | **59** | Reserve |
| **07** | **Dạ Neo / Nera** | Xạ thủ | 23 | 24 | 13 | 14 | 15 | **89** | **Strong Keep** |
| **08** | **Móc Quỷ / Garo** | Đỡ đòn | 18 | 20 | 12 | 11 | 13 | **74** | **Keep / Rewrite** |
| **09** | **Xiềng Đấu / Vark** | Đấu sĩ | 19 | 21 | 11 | 11 | 14 | **76** | **Keep / Rewrite** |
| **10** | **Dây Phán / Liora** | Pháp sư / Hỗ trợ | 20 | 23 | 12 | 13 | 13 | **81** | **Keep / Rewrite** |
| 11 | Chài Mạch / Namo | Đỡ đòn / Hỗ trợ | 16 | 17 | 12 | 10 | 10 | **65** | Reserve |
| **12** | **Thương Nhãn / Vika** | Xạ thủ | 21 | 22 | 12 | 13 | 15 | **83** | **Keep / Rewrite** |
| **13** | **Huyền Giác / Rako** | Đỡ đòn | 22 | 22 | 13 | 13 | 16 | **86** | **Strong Keep** |
| **14** | **Đô Vật Cổ / Marduk** | Đấu sĩ / Đỡ đòn | 21 | 22 | 12 | 13 | 14 | **82** | **Keep / Rewrite** |
| **15** | **Phi Công Cổ Khí / Aero** *(Thay Brak)* | Xạ thủ / Oanh tạc | 24 | 23 | 13 | 14 | 17 | **91** | **Strong Keep** |
| 16 | Thiết Xa / Loko | Đỡ đòn | 18 | 17 | 11 | 10 | 7 | **63** | Reserve |
| **17** | **Lò Cổ / Forge** | Đỡ đòn / Đấu sĩ | 23 | 23 | 13 | 14 | 18 | **91** | **Strong Keep** |
| 18 | Búa Quỹ / Oren | Đấu sĩ | 12 | 12 | 11 | 9 | 8 | **52** | **Cut** |
| **19** | **Mực Mù / Inka** | Pháp sư | 23 | 24 | 12 | 14 | 15 | **88** | **Strong Keep** |
| 20 | Mìn Ký Ức / Teko | Pháp sư / Hỗ trợ | 17 | 18 | 11 | 11 | 9 | **66** | Reserve |
| **21** | **Vòng Cấm / Rana** | Pháp sư | 21 | 22 | 13 | 13 | 17 | **86** | **Strong Keep** |
| 22 | Nhện Mạch / Sira | Pháp sư / Xạ thủ | 18 | 19 | 10 | 11 | 9 | **67** | Reserve |
| 23 | Đếm Bước / Taxa | Pháp sư | 16 | 16 | 11 | 10 | 9 | **62** | Reserve |
| 24 | Vườn Ăn Thịt / Mora | Pháp sư | 14 | 13 | 10 | 9 | 8 | **54** | **Cut** |
| **25** | **Ký Sinh Hộ Thể / Soma** | Hỗ trợ | 21 | 21 | 11 | 12 | 12 | **77** | **Keep / Rewrite** |
| **26** | **Drone Tự Hành / Dron** | Hỗ trợ / Xạ thủ phụ | 21 | 22 | 13 | 12 | 14 | **82** | **Keep / Rewrite** |
| 27 | Gọi Mục Tiêu / Cala | Hỗ trợ / Đấu sĩ | 13 | 13 | 10 | 8 | 7 | **51** | **Cut** |
| **28** | **Ghi Nợ / Libro** | Hỗ trợ | 23 | 24 | 13 | 14 | 16 | **90** | **Strong Keep** |
| 29 | Quản Gia Tự Hành / Boto | Hỗ trợ | 18 | 19 | 12 | 11 | 14 | **74** | Reserve |
| **30** | **Mắt Thiên Cơ / Iro** *(Thay Kipa)* | Xạ thủ / Tầm xa | 23 | 23 | 13 | 14 | 18 | **91** | **Strong Keep** |
| **31** | **Hổ Nấm / Moka** | Sát thủ | 24 | 23 | 12 | 14 | 15 | **88** | **Strong Keep** |
| **32** | **Hải Mẫu / Kora** | Đỡ đòn | 24 | 24 | 14 | 14 | 16 | **92** | **Strong Keep** |
| **33** | **Lươn Đêm / Eelix** | Sát thủ | 21 | 21 | 12 | 11 | 13 | **78** | **Keep / Rewrite** |
| **34** | **Sứa Chuông / Jeli** | Hỗ trợ | 24 | 23 | 13 | 14 | 14 | **88** | **Strong Keep** |
| **35** | **Chim Công Sợ Hãi / Pavo** | Pháp sư / Hỗ trợ | 20 | 21 | 13 | 12 | 13 | **79** | **Keep / Rewrite** |
| **36** | **Tê Tê Khiên / Rolo** | Đấu sĩ | 22 | 22 | 13 | 13 | 16 | **86** | **Strong Keep** |

---

## 7. Đề Xuất Danh Sách 24 Tướng V5 (Top 24 Proposal)

Hội đồng đề xuất cấu trúc 24 concept phân bổ chuẩn xác thành **6 vai trò cổ điển (mỗi vai trò đúng 4 tướng)**, tạo nên hệ sinh thái chiến thuật đa dạng, khắc chế lẫn nhau và giàu tính biểu diễn:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        COLINH ROSTER V5 - TOP 24                       │
├──────────────┬──────────────┬──────────────┬──────────────┬────────────┤
│ SÁT THỦ (4)  │ ĐẤU SĨ (4)   │ ĐỠ ĐÒN (4)   │ XẠ THỦ (4)   │ PHÁP SƯ (4)│
├──────────────┼──────────────┼──────────────┼──────────────┼────────────┤
│ 01. Kiko     │ 02. Brak     │ 08. Garo     │ 07. Nera     │ 10. Liora  │
│ 03. Vero     │ 09. Vark     │ 13. Rako     │ 12. Vika     │ 19. Inka   │
│ 05. Erran    │ 14. Marduk   │ 17. Forge    │ 15. Aero     │ 21. Rana   │
│ 31. Moka     │ 36. Rolo     │ 32. Kora     │ 30. Iro      │ 35. Pavo   │
├──────────────┴──────────────┴──────────────┴──────────────┴────────────┤
│                              HỖ TRỢ (4)                                │
│          25. Soma   │   26. Dron   │   28. Libro   │   34. Jeli         │
└────────────────────────────────────────────────────────────────────────┘
```

### Chi tiết 24 concept đề xuất theo vai trò:

#### A. Sát Thủ (Assassins) — 4 Concept
1. **01 · Ảnh Hầu / Kiko (87đ - Strong Keep):**  
   *Câu bán hàng:* "Tôi pick nó vì được lừa đối thủ bằng dấu chân giả, nhảy vào đúng khoảnh khắc rồi thoát ra."  
   *Vai trò trong team:* Sát thủ quấy nhiễu, outplay tâm lý học, tạo highlight né chiêu.
2. **03 · Vết Kiếm / Vero (87đ - Strong Keep):**  
   *Câu bán hàng:* "Tôi pick nó vì mỗi nhát kiếm để lại một vết thời gian, vài giây sau vết đó chém lại."  
   *Vai trò trong team:* Sát thủ dồn sát thương trễ, ép mục tiêu phân tán hoặc bấm đồ tự vệ sớm.
3. **05 · Thợ Săn Lỗi / Erran (75đ - Keep/Rewrite):**  
   *Câu bán hàng:* "Tôi pick nó vì chuyên bắt lỗi kỹ năng trượt của địch; địch hụt chiêu là bị tôi đánh dấu truy sát."  
   *Vai trò trong team:* Khắc tinh của các pháp sư định hướng và tướng cơ động cao.
4. **31 · Hổ Nấm / Moka (88đ - Strong Keep):**  
   *Câu bán hàng:* "Tôi pick nó vì săn con mồi có mùi bào tử, vồ một cú kinh hoàng từ bóng tối kết liễu mục tiêu."  
   *Vai trò trong team:* Quái thú đi rừng săn lẻ, áp lực tâm lý trong bụi rậm.

#### B. Đấu Sĩ (Fighters / Bruisers) — 4 Concept
5. **02 · Nhịp Quyền / Brak (85đ - Strong Keep):**  
   *Câu bán hàng:* "Tôi pick nó vì được làm võ sĩ phản nhịp: đỡ đúng lúc, phản bằng cú đấm piston búa tạ."  
   *Vai trò trong team:* Đấu sĩ tay đôi kỷ luật cao, thắng bằng timing parry.
6. **09 · Xiềng Đấu / Vark (76đ - Keep/Rewrite):**  
   *Câu bán hàng:* "Tôi pick nó vì được dựng Lôi Đài Ký Ức ép địch solo công bằng, thắng nhờ kỹ năng tay đôi."  
   *Vai trò trong team:* Đấu sĩ bắt cóc chủ lực địch vào vùng cách ly giao tranh.
7. **14 · Đô Vật Cổ / Marduk (82đ - Keep/Rewrite):**  
   *Câu bán hàng:* "Tôi pick nó vì được quật ngã suplex chủ lực đối phương dập thẳng xuống đất phá đội hình."  
   *Vai trò trong team:* Đấu sĩ mở combat kiểu vật cổ điển, khống chế cứng đơn mục tiêu.
8. **36 · Tê Tê Khiên / Rolo (86đ - Strong Keep):**  
   *Câu bán hàng:* "Tôi pick nó vì được tháo từng lớp vảy để chuyển từ xe tăng bọc thép sang máy chém cuồng nộ."  
   *Vai trò trong team:* Đấu sĩ chuyển dạng linh hoạt (Tanky Vanguard $\leftrightarrow$ Berserker).

#### C. Đỡ Đòn (Tanks / Initiators) — 4 Concept
9. **08 · Móc Quỷ / Garo (74đ - Keep/Rewrite):**  
   *Câu bán hàng:* "Tôi pick nó vì có cọc từ trường phóng ghim kéo cả tôi và địch va chạm nổ tung tại điểm giữa."  
   *Vai trò trong team:* Tanker mở giao tranh bằng va chạm động năng hai chiều.
10. **13 · Huyền Giác / Rako (86đ - Strong Keep):**  
    *Câu bán hàng:* "Tôi pick nó vì được hóa thành xe bọc thép cổ húc thẳng một đường phá tan đội hình địch."  
    *Vai trò trong team:* Tiên phong càn quét tuyến tính, phân tách hàng tiền tuyến và hậu tuyến.
11. **17 · Lò Cổ / Forge (91đ - Strong Keep):**  
    *Câu bán hàng:* "Tôi pick nó vì càng chịu đòn lò càng nóng, rồi xả luồng sóng lửa áp suất thiêu rụi mặt trận."  
    *Vai trò trong team:* Đỡ đòn hấp thụ nhiệt lượng, trừng phạt đội hình cấu rỉa bằng đòn xả áp hủy diệt.
12. **32 · Hải Mẫu / Kora (92đ - Strong Keep - Điểm số cao nhất):**  
    *Câu bán hàng:* "Tôi pick nó vì là cua cửa đập khổng lồ: xoay hai càng thép dựng tường thành chặn hướng sát thương cho đồng đội."  
    *Vai trò trong team:* Pháo đài cơ động chắn hướng, vị thần bảo hộ của các xạ thủ.

#### D. Xạ Thủ (Marksmen / Carries) — 4 Concept
13. **07 · Dạ Neo / Nera (89đ - Strong Keep):**  
    *Câu bán hàng:* "Tôi pick nó vì được bắn lao neo hai chiều: chọn kéo mình tẩu thoát hoặc giật địch lệch góc bắn."  
    *Vai trò trong team:* Xạ thủ cơ động cao tự tạo khoảng cách và outplay sát thủ.
14. **12 · Thương Nhãn / Vika (83đ - Keep/Rewrite):**  
    *Câu bán hàng:* "Tôi pick nó vì bắn ghim tạo dây bẫy tuyến quang học, ép đối thủ phải bước vào góc ngắm của tôi."  
    *Vai trò trong team:* Xạ thủ kiểm soát khu vực hẹp và vây hãm trụ.
15. **15 · Phi Công Cổ Khí / Aero (91đ - Strong Keep - Hạt nhân thay thế):**  
    *Câu bán hàng:* "Tôi pick nó vì được lái phi cơ cổ lượn vòng trên không, rải thảm bom plasma và pháo kích tầm xa."  
    *Vai trò trong team:* Xạ thủ dội bom diện rộng, cơ động dạng phương tiện cơ giới.
16. **30 · Mắt Thiên Cơ / Iro (91đ - Strong Keep - Hạt nhân thay thế):**  
    *Câu bán hàng:* "Tôi pick nó vì là nhãn cầu máy cổ đại ngắm bắn cực xa, khóa tia laser xuyên thấu bản đồ."  
    *Vai trò trong team:* Xạ thủ bắn tỉa tầm cực xa, cung cấp tầm nhìn chiến lược.

#### E. Pháp Sư (Mages / Controllers) — 4 Concept
17. **10 · Dây Phán / Liora (81đ - Keep/Rewrite):**  
    *Câu bán hàng:* "Tôi pick nó vì nối hai kẻ địch bằng dây năng lượng phán xét: họ tách nhau hay đứng gần đều bị trừng phạt."  
    *Vai trò trong team:* Pháp sư khống chế cặp đôi, trừng phạt đội hình thiếu liên kết.
18. **19 · Mực Mù / Inka (88đ - Strong Keep):**  
    *Câu bán hàng:* "Tôi pick nó vì được vẽ mực lên mặt đất, kích nổ các đường nối mực để làm mù và kiểm soát sàn đấu."  
    *Vai trò trong team:* Pháp sư kiến tạo địa hình, phong tỏa lối đi bằng thư pháp cổ.
19. **21 · Vòng Cấm / Rana (86đ - Strong Keep):**  
    *Câu bán hàng:* "Tôi pick nó vì dựng vòng ranh giới pháp đình: ai dám bước qua mép vòng sẽ bị sét phạt choáng váng."  
    *Vai trò trong team:* Pháp sư phòng thủ khu vực, chặn đứng các pha lao vào của sát thủ.
20. **35 · Chim Công Sợ Hãi / Pavo (79đ - Keep/Rewrite):**  
    *Câu bán hàng:* "Tôi pick nó vì xòe đuôi công cơ khí dọa sợ: kẻ nào dám nhìn thẳng vào mắt tôi sẽ hoảng loạn tháo chạy."  
    *Vai trò trong team:* Pháp sư kiểm soát hướng nhìn (gaze control), đảo ngược giao tranh khi bị truy đuổi.

#### F. Hỗ Trợ (Supports / Enablers) — 4 Concept
21. **25 · Ký Sinh Hộ Thể / Soma (77đ - Keep/Rewrite):**  
    *Câu bán hàng:* "Tôi pick nó vì phóng kén cộng sinh bảo hộ đồng minh, gánh chịu sát thương hộ họ và bung giáp phản chấn."  
    *Vai trò trong team:* Hỗ trợ bảo kê hy sinh thân mình, cứu xạ thủ trong gang tấc.
22. **26 · Drone Tự Hành / Dron (82đ - Keep/Rewrite):**  
    *Câu bán hàng:* "Tôi pick nó vì có Cổ Khí Vệ Tinh lơ lửng trên vai, chỉ cần đổi 3 mode Chắn / Bắn / Quét mà không cần micro."  
    *Vai trò trong team:* Hỗ trợ đa năng linh hoạt theo từng tình huống giao tranh.
23. **28 · Ghi Nợ / Libro (90đ - Strong Keep):**  
    *Câu bán hàng:* "Tôi pick nó vì cầm Sổ Nợ Nghiệp Báo: gom toàn bộ sát thương team gánh thành một món nợ rồi thanh toán bằng hồi máu ồ ạt."  
    *Vai trò trong team:* Hỗ trợ biến nguy thành an, cứu cả đội hình khỏi đòn wombo combo.
24. **34 · Sứa Chuông / Jeli (88đ - Strong Keep):**  
    *Câu bán hàng:* "Tôi pick nó vì phát ra những hồi chuông nước du dương, hồi máu cho bạn và ru ngủ làm chậm kẻ thù."  
    *Vai trò trong team:* Hỗ trợ hồi phục theo nhịp điệu và mở giao tranh ru ngủ diện rộng.

---

## 8. Danh Sách Dự Bị (Reserve List — 8 Concepts)

Nhóm 8 concept này được lưu trữ trong kho thiết kế để tái đánh giá ở các bản mở rộng hoặc khi cần thay thế khẩn cấp:

1. **04 · Hấp Đòn / Rava (64đ):** Đấu sĩ tích lực bị động. Dự bị vì lối chơi quá giống Forge nhưng thiếu sự bùng nổ của sóng lửa.
2. **06 · Võ Sư Một Nhịp / Mono (59đ):** Đấu sĩ ít chiêu. Dự bị vì cơ chế thiếu nút bấm không phù hợp với chuẩn 4 skill QWER của game.
3. **11 · Chài Mạch / Namo (65đ):** Đỡ đòn quăng lưới. Dự bị vì kỹ năng quăng lưới quá đơn điệu, dễ bị lu mờ trước Kora.
4. **16 · Thiết Xa / Loko (63đ):** Xe tăng sống khó quay đầu. Dự bị vì cơ chế lái xe trượt đà gây ức chế góc nhìn camera MOBA trên di động.
5. **20 · Mìn Ký Ức / Teko (66đ):** Pháp sư đặt mìn cảnh báo. Dự bị để tránh lối chơi rải mìn cắm trại tiêu cực (toxic camping).
6. **22 · Nhện Mạch / Sira (67đ):** Xạ thủ dệt mạng nhện. Dự bị vì rig nhện 8 chân và mạng nhện giăng chằng chịt vượt quá ngân sách xử lý của AI pipeline.
7. **23 · Đếm Bước / Taxa (62đ):** Pháp sư thu thuế bước chân. Dự bị vì cơ chế trừng phạt di chuyển trùng lặp với Rana và gây cảm giác bất lực vô lý.
8. **29 · Quản Gia Tự Hành / Boto (74đ):** Linh vật nhặt mảnh vụn. Điểm số khá tốt nhưng tạm đưa vào dự bị để nhường slot cho Dron/Soma nhằm bảo đảm cân bằng 4 tướng Hỗ trợ.

---

## 9. Danh Sách Cắt Bỏ (Cut List — 6 Concepts)

Hội đồng kiên quyết loại bỏ 6 concept này khỏi pipeline thiết kế:

1. **15-OLD · Thiết Quyền / Brak (Cũ):**  
   *Lý do cắt:* Trùng lặp 100% với #02 Nhịp Quyền / Brak (cùng tên, cùng archetype võ sĩ piston). Đã thu hồi slot để trao cho **Aero**.
2. **30-OLD · Thủ Kho Lane / Kipa (Cũ):**  
   *Lý do cắt:* Hỗ trợ hậu cần macro không tham gia combat. Lối chơi ngồi nhà phát tem buff lính phá hỏng nhịp độ thi đấu 5v5. Đã thu hồi slot để trao cho **Iro**.
3. **18 · Búa Quỹ / Oren (52đ):**  
   *Lý do cắt:* Xoay búa quanh người chiếm không gian là bản sao trắng trợn của Garen và Juggernaut. Thiếu hoàn toàn tính sáng tạo của Cổ Linh.
4. **24 · Vườn Ăn Thịt / Mora (54đ):**  
   *Lý do cắt:* Đặt mầm cây mọc thành sinh vật săn mồi vi phạm nghiêm trọng luật cấm summon rác. Làm nghẽn đường lính, xung đột pathfinding và tốn tài nguyên render.
5. **27 · Gọi Mục Tiêu / Cala (51đ):**  
   *Lý do cắt:* Tướng chỉ mạnh khi đứng quanh mục tiêu lớn (rồng/baron) là một sai lầm game design nghiêm trọng. Giai đoạn đi lane hoàn toàn vô dụng, không có giá trị cá nhân.
6. **33-Variant / Lươn Đêm Dạng Rắn Nguyên Bản:**  
   *Lý do cắt:* Cắt bỏ dứt khoát phiên bản lươn trườn bò sát đất (snake crawling) vì bất khả thi về kỹ thuật animation. Chỉ phiên bản Bán Nhân Ngư (Eelix Hybrid) mới được giữ lại.

---

## 10. Ghi Chú Viết Lại Concept (Rewrite Notes)

5 concept trong nhóm `Keep / Needs Rewrite` được tái định hình lại câu bán hàng và lối chơi ở tầng concept:

### 1. Móc Quỷ / Garo (#08)
- *Vấn đề cũ:* Quăng móc kéo 1 mục tiêu đơn thuần giống Pudge/Blitzcrank.
- *Câu bán hàng mới:* **"Tôi pick Garo vì được phóng Cọc Từ Trường ghim mục tiêu, sau đó kích hoạt lực hút kéo cả tôi lẫn mục tiêu va chạm cực mạnh vào nhau tại điểm giữa, gây choáng diện rộng xung quanh điểm va chạm."**
- *Bản sắc Cổ Linh:* Chuyển từ "đồ tể quăng xích" thành "cỗ máy va chạm động năng từ trường".

### 2. Xiềng Đấu / Vark (#09)
- *Vấn đề cũ:* Nhốt mục tiêu solo kiểu Camille/Legion Commander gây đọ chỉ số thuần túy (stat-check).
- *Câu bán hàng mới:* **"Tôi pick Vark vì được phóng Lôi Đài Ký Ức nhốt tôi và chủ lực địch: bên trong lôi đài nhận giảm sát thương từ bên ngoài, hai bên tăng tốc độ đánh; nhưng nếu đối thủ né tránh hoặc parry thành công 3 đòn của tôi, xiềng xích sẽ vỡ tung và tôi bị phản phệ choáng váng."**
- *Bản sắc Cổ Linh:* Cuộc đấu võ có luật danh dự, thưởng phạt dựa trên kỹ năng né đòn của cả hai bên.

### 3. Ký Sinh Hộ Thể / Soma (#25)
- *Vấn đề cũ:* Nguy cơ trở thành ký sinh trùng tàng hình bất tử như Yuumi.
- *Câu bán hàng mới:* **"Tôi pick Soma vì phóng được Kén Bào Tử Cổ Sinh bám lên đồng minh: thân tôi vẫn chạy trên mặt đất và có thể bị tấn công, nhưng kén sẽ chia sẻ 30% sát thương đồng minh phải gánh và tôi có thể kích hoạt nổ kén tạo khiên chắn đẩy lùi kẻ địch xung quanh họ."**
- *Bản sắc Cổ Linh:* Hỗ trợ hy sinh cộng sinh, không phải ký sinh trốn tránh trách nhiệm.

### 4. Drone Tự Hành / Dron (#26)
- *Vấn đề cũ:* Dễ sa đà vào việc điều khiển drone vi mô (micro RTS).
- *Câu bán hàng mới:* **"Tôi pick Dron vì có một Cổ Khí Vệ Tinh bay quanh vai: tôi chỉ việc bấm nút đổi 3 chế độ quay quanh thân (Chắn: đỡ đạn trước mặt; Bắn: tự tỉa mục tiêu tôi đánh dấu; Quét: phát sóng radar quét tàng hình quanh thân), tuyệt đối không cần click chuột điều khiển drone đi lung tung."**
- *Bản sắc Cổ Linh:* Cổ vật công nghệ tự động vận hành quanh chủ thể.

### 5. Lươn Đêm / Eelix (#33)
- *Vấn đề cũ:* Lươn trườn trên cạn gây gãy xương animation và trượt lưới AI.
- *Câu bán hàng mới:* **"Tôi pick Eelix vì là Bán Nhân Ngư Vực Sâu lướt trên làn sóng nước ma thuật: tôi rải các Vệt Thủy Uyên bóng tối rồi lướt trượt với tốc độ kinh hoàng giữa các vệt nước để săn lùng mục tiêu."**
- *Bản sắc Cổ Linh:* Nhân ngư cổ đại cưỡi sóng ngầm thay vì bò lê lết dưới đất.

---

## 11. Đánh Giá Rủi Ro Sản Xuất AI (Production Risk Notes)

Top 5 thách thức kỹ thuật lớn nhất đối với pipeline AI và giải pháp kiểm soát rủi ro:

| Concept | Hạng mục rủi ro | Mức độ | Nguyên nhân kỹ thuật | Giải pháp khắc phục (Mitigation) |
|---|---|:---:|---|---|
| **Eelix (#33)** | Rigging & Locomotion | **Cực cao** | Chuyển động uốn lượn liên tục của loài bò sát/thủy sinh không tương thích với skeleton AI thông thường. | Khóa tạo hình dạng Bán Nhân Ngư (nửa người nửa cá lướt sóng hover), dùng biped rig chuẩn với bone đuôi phụ. |
| **Jeli (#34)** | Shader & Alpha Sorting | **Cao** | Cơ thể sứa trong suốt nhiều lớp và xúc tu dài gây tụt FPS và lỗi hiển thị depth buffer trên mobile URP. | Dùng vật liệu opaque giả trong suốt (dithered transparency) kết hợp rim-light phát quang; xúc tu dùng rig đơn giản. |
| **Pavo (#35)** | Mesh Footprint & Cloth | **Cao** | Đuôi công xòe quạt quá rộng chiếm diện tích màn hình isometric, dễ che khuất unit khác và gãy xương xếp lớp. | Thiết kế đuôi công dạng các phiến lông vũ kim loại cơ khí xếp gọn, chỉ xòe tối đa trong 1.5 giây khi cast skill. |
| **Inka (#19)** | Spline Decal & Memory | **Cao** | Hệ thống vẽ vệt mực thời gian thực và tính toán giao điểm kích nổ tiêu tốn tài nguyên bộ nhớ. | Giới hạn tối đa 2 vệt mực tồn tại cùng lúc; dùng decal máy vẽ cố định chiều rộng; thời gian biến mất cứng là 4 giây. |
| **Marduk (#14)** | Paired Sync Animation | **Cao** | Chiêu thức quật ngã suplex đòi hỏi đồng bộ hóa vị trí và animation giữa 2 character controller qua mạng. | Chuyển động vật tại chỗ (ground slam) thay vì bay lượn trên không; khóa cứng vị trí nạn nhân ngay thời điểm trúng đòn. |

---

## 12. Câu Hỏi Chiến Lược Cần Creator / Owner Quyết Định (Owner Decision Questions)

Hội đồng audit kính trình Creator 5 câu hỏi then chốt trước khi bước sang giai đoạn viết kit chi tiết:

1. **Phê duyệt chính thức Hướng 1 cho Aero & Iro:**  
   *Creator có đồng ý vĩnh viễn thay thế #15 Thiết Quyền (Brak duplicate) bằng **Aero (Phi Công Cổ Khí)** và #30 Thủ Kho Lane (Kipa) bằng **Iro (Mắt Thiên Cơ)** trong danh sách chính thức không?*
2. **Quy chuẩn bất di bất dịch cho Support Ký Sinh (Soma):**  
   *Creator có đồng thuận với quy tắc "Không bao giờ có cơ chế untargetable kiểu Yuumi trong COLINH" để bảo vệ tính công bằng và cảm xúc người chơi không?*
3. **Định vị thẩm mỹ của Kiko vs Tôn Ngộ Không:**  
   *Creator có đồng ý khóa cứng tạo hình của Kiko là "Linh Hầu Mặt Nạ Đồng Di Vật" cầm dao găm/vuốt cơ khí, cấm hoàn toàn gậy dài và vòng kim cô để loại trừ 100% rủi ro đạo nhái Journey to the West không?*
4. **Phê duyệt chuyển đổi hình thái Eelix (Bán Nhân Ngư Lướt Sóng):**  
   *Creator có chấp thuận phương án kỹ thuật chuyển Eelix từ "lươn bò sát đất" sang "bán nhân ngư cưỡi sóng ngầm" để giải phóng pipeline sản xuất 3D cho AI không?*
5. **Kế hoạch Playtest Concept Slice 1:**  
   *Sau đợt audit này, Creator muốn nhóm tiếp tục hoàn thiện khung concept cho toàn bộ 24 tướng, hay chọn ra ngay **Top 6 hạt nhân biểu tượng** (Kora, Forge, Aero, Kiko, Vero, Libro) để viết kit sơ bộ làm mẫu thử nghiệm trước?*

---
*Báo cáo được hoàn thành và ký duyệt bởi 7 thành viên Hội đồng Audit Cổ Linh Thần Chiến.*
