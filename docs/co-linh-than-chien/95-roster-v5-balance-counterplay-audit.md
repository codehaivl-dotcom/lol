# 95 · COLINH Roster V5 — Báo Cáo Thẩm Định Độc Lập: Cân Bằng & Khắc Chế (Balance & Counterplay Audit)

**Ngày thực hiện:** 12/10/2026  
**Chuyên gia thẩm định:** Đức "Symmetric" — Senior Balance & Combat Systems Designer  
**Vai trò Hội đồng:** Balance & Counterplay Reviewer  
**Trạng thái tài liệu:** `COUNCIL_INDEPENDENT_REPORT / BALANCE_VETO_ACTIVE / AWAITING_CREATOR_DECISION`  
**Tài liệu đối soát:**
- [92 · Hero Roster Discovery V5 Concept Candidates](92-roster-discovery-v5-concept-candidates.md)
- [93 · Hero Roster V5 Team Audit Brief](93-roster-v5-team-audit-brief.md)
- [94 · Hội Đồng Audit Nội Bộ & Tranh Luận Chuyên Sâu 36 Concept](94-roster-v5-team-deep-audit.md)

---

## 1. Triết Lý Thiết Kế Cân Bằng & Nguyên Tắc Đối Kháng (Core Balance Philosophy)

Là người giữ chốt chặn cuối cùng về **Cân Bằng và Cảm Xúc Đối Kháng (Balance & Counterplay)** trong dự án Cổ Linh Thần Chiến, tôi đánh giá một vị tướng không phải qua việc *"khi chơi con đó người ta sướng thế nào"*, mà qua câu hỏi tàn nhẫn hơn nhiều:
> **"Khi bị con này đánh trúng, nạn nhân cảm thấy họ thua vì kỹ năng kém hay thua vì cơ chế rác rưởi không thể chống cự?"**

Một game MOBA esport sống lâu được hay không phụ thuộc vào **sự tôn trọng agency (quyền chủ động) của nạn nhân**. Nếu một cơ chế khiến đối thủ cảm thấy bất lực (loss of control), ức chế tích tụ (anti-fun), hoặc không thể giải thích được nguyên nhân thất bại, đó là một **Degenerate Mechanic (Cơ chế suy biến)** cần phải tiêu diệt từ trứng nước.

### 3 Trụ Cột Cân Bằng Bắt Buộc:
1. **Window of Vulnerability (Cửa sổ sơ hở):** Kỹ năng càng mạnh, đòn đánh càng nặng thì cái giá phải trả khi hụt chiêu càng đắt. Tướng luôn phải có nhịp thở sơ hở để đối thủ trừng phạt.
2. **Telegraph & Human Reaction Time (Cảnh báo nhịp phản xạ):** Mọi kỹ năng khống chế cứng hoặc sốc sát thương lớn phải có thời gian báo trước (wind-up, âm thanh, vệt sàn) tối thiểu từ **250ms – 400ms**, bảo đảm nằm trong ngưỡng phản xạ thần kinh của người chơi để họ có cơ hội bấm Dash (D) hoặc kỹ năng né tránh.
3. **Symmetrical Outplay (Đối kháng hai chiều):** Không có kỹ năng nào là "bấm nút là thắng" (I-win button). Mọi pha thi triển đều phải là một ván cờ tâm lý (mind-game) giữa người ra đòn và người đỡ đòn.

---

## 2. Top 12 Concept Có Counterplay Lành Mạnh, Đối Đầu Công Bằng, Kỹ Năng Cao

Nhóm 12 concept này đại diện cho đỉnh cao thiết kế đối kháng: giàu tính biểu diễn, đòi hỏi kỹ năng cá nhân cao, và đặc biệt là **kẻ địch luôn có phương án khắc chế rõ ràng**.

| Rank | ID | Tên tướng | Vai trò | Gameplay Toy cốt lõi | Cơ chế Counterplay & Cửa sổ trừng phạt |
|:---:|:---:|---|---|---|---|
| **1** | **32** | **Hải Mẫu / Kora** | Đỡ đòn | Cua cửa đập: Chắn hướng sát thương bằng hai càng thép. | **Hướng chắn hở sườn/lưng:** Kora chỉ bất tử ở góc chính diện. Địch có thể flank vòng cung, dùng kỹ năng xuyên thấu hoặc đạn ném cầu vồng (mortar). Khi giơ càng, Kora bị giảm tốc độ xoay hướng (Turn Rate lock). |
| **2** | **02** | **Nhịp Quyền / Brak** | Đấu sĩ | Võ sĩ piston phản nhịp: Thủ thế parry, phản đòn cực nặng. | **Bait parry kinh điển:** Nếu Brak parry hụt (địch giả vờ ra đòn rồi hủy chiêu), piston mất áp suất, Brak trơ trọi chịu đòn trong 3 giây hồi chiêu mà không có giáp. |
| **3** | **17** | **Lò Cổ / Forge** | Đỡ đòn | Tích nhiệt từ đòn đánh rồi xả sóng lửa hình nón. | **Minh bạch tài nguyên:** Cột nhiệt của Forge hiển thị rõ cho địch thấy. Địch chủ động ngừng đánh để ép Forge tụt nhiệt, hoặc bait sóng lửa (có delay xoay người) rồi dash né sang hai bên. |
| **4** | **21** | **Vòng Cấm / Rana** | Pháp sư | Dựng vòng ranh giới luật: Bước qua mép vòng bị phạt choáng. | **Lựa chọn tự do (Choice Agency):** Nạn nhân bên trong vòng không bị bất động vô lý; họ có quyền đứng yên solo trả đòn, hoặc chủ động dùng đồ/kỹ năng giải hiệu ứng để bước ra. |
| **5** | **28** | **Ghi Nợ / Libro** | Hỗ trợ | Ghi nợ sát thương cho team rồi hoàn trả bằng shield/heal. | **Nợ có thể phản phệ:** Kẻ địch nhìn thấy "kho nợ" Libro đang ôm. Nếu dồn khống chế dứt điểm Libro trước khi sổ nợ được giải phóng, toàn bộ lượng nợ nổ tung giết chết Libro và đồng minh. |
| **6** | **07** | **Dạ Neo / Nera** | Xạ thủ | Phóng lao neo hai chiều: Kéo mình tới hoặc giật địch lệch hướng. | **Rủi ro tự đâm đầu vào rọ:** Mũi neo là skillshot né được. Khi neo trúng, nếu Nera chọn kéo mình tới, sát thủ địch có thể giăng bẫy bắt sống một xạ thủ tự nạp mạng vào cự ly gần. |
| **7** | **36** | **Tê Tê Khiên / Rolo** | Đấu sĩ | Tháo từng lớp vảy đổi phòng thủ lấy sức mạnh tấn công. | **Trade-off minh bạch:** Khi Rolo hóa cuồng chiến, hắn tự lột bỏ 50% giáp và kháng phép. Đội hình địch lập tức có cơ hội burst chết Rolo ngay lúc hắn vừa cởi giáp. |
| **8** | **03** | **Vết Kiếm / Vero** | Sát thủ | Vết chém thời gian trễ: Kích nổ sát thương sau 2-3 giây. | **Cửa sổ cứu sinh (Survival Window):** Không sốc chết trong 0.1s. Nạn nhân có 2-3 giây vàng để bấm đồ bảo hộ, tìm hỗ trợ hồi máu, hoặc quay lại all-in hạ gục Vero trước khi vết chém nổ. |
| **9** | **13** | **Huyền Giác / Rako** | Đỡ đòn | Tê giác máy húc thẳng một đường phá vỡ đội hình. | **Quỹ đạo tuyến tính:** Tiếng gầm cơ khí và vệt đất rung cảnh báo hướng chạy. Tướng địch có thể lách nhẹ né đường húc, khiến Rako đâm đầu vào tường hoặc lạc lõng sâu trong lòng địch. |
| **10** | **01** | **Ảnh Hầu / Kiko** | Sát thủ | Lừa đối thủ bằng dấu chân giả, nhảy vào sốc sát thương. | **Đọc bài tâm lý:** Dấu chân giả không tàng hình; người chơi tỉnh táo có thể nhận diện hướng di chuyển bất thường. Khi Kiko đã xài skill nhảy vào mà hụt combo, Kiko không còn đường lui. |
| **11** | **34** | **Sứa Chuông / Jeli** | Hỗ trợ | Hồi máu và làm chậm lan tỏa theo từng nhịp sóng chuông. | **Tấn công giữa nhịp (Off-beat Window):** Sóng lan có tốc độ di chuyển và chu kỳ ngắt quãng. Địch có thể né vòng sóng hoặc tràn lên tấn công đúng khoảng lặng giữa 2 nhịp chuông. |
| **12** | **35** | **Chim Công Sợ Hãi / Pavo** | Pháp sư / Hỗ trợ | Xòe đuôi quạt gây sợ hãi kẻ nào nhìn thẳng vào mắt. | **Cơ chế quay đầu kinh điển:** Nạn nhân chỉ cần quay lưng lại trong khoảnh khắc Pavo phát sáng xòe đuôi là hoàn toàn miễn nhiễm hiệu ứng, biến Pavo thành bia tập bắn khi đang đứng khựng. |

---

## 3. Bottom 8 Concept Toxic, Ức Chế, Thiếu Counterplay & Nguy Cơ Mất Cân Bằng

Đây là 8 hiểm họa thiết kế lớn nhất trong bảng 36 concept. Chúng chứa đựng các cơ chế anti-fun, tước đoạt quyền tự quyết của người chơi hoặc phá vỡ cấu trúc cân bằng MOBA:

```
                            [MA TRẬN HIỂM HỌA CÂN BẰNG]
                                         │
        ┌───────────────────┬────────────┴───────┬───────────────────┐
        ▼                   ▼                    ▼                   ▼
  [BẤT KHẢ XÂM PHẠM]  [TRIỆT TIÊU AGENCY]  [ĐỌ CHỈ SỐ NHỊ PHÂN] [CẮM TRẠI BẨN]
    Soma #25 (Yuumi)    Erran #05 (Anti-Key)  Vark #09 (Stat-Check) Teko #20 (Techies)
                        Taxa #23 (Rupture)    Cala #27 (Boss Bias)  Mora #24 (Summon)
```

### 1. #25 · Ký Sinh Hộ Thể / Soma (Hỗ trợ) — HIỂM HỌA YUUMI UNTARGETABLE
- **Bản chất toxic:** Cho phép một hỗ trợ ký sinh gắn vào đồng minh và trở nên **không thể bị chọn làm mục tiêu (Untargetable)**.
- **Tại sao phá hủy game:** 
  - Tước đoạt nguyên tắc nền tảng của giao tranh: *"Muốn hạ gục xạ thủ, trước hết phải hạ hoặc tách hỗ trợ ra"*.
  - Tạo ra những "quái vật bất tử" không thể ngăn cản khi Soma bám vào đấu sĩ/sát thủ xanh xao.
  - Người chơi Soma bị tha hóa kỹ năng: Không cần định vị vị trí (positioning), không cần né chiêu, biến thành một cục buff máu di động lười biếng.
- **Phán quyết:** **VETO TUYỆT ĐỐI NGUYÊN BẢN.** Phải sửa thành: Thân thể Soma giữ nguyên trên mặt đất, chỉ phóng Kén Bào Tử từ xa và gánh chung 30% sát thương đồng minh nhận.

### 2. #05 · Thợ Săn Lỗi / Erran (Sát thủ) — CẢNH SÁT CHỐNG BẤM NÚT (ANTI-ACTION POLICE)
- **Bản chất toxic:** Tự động trừng phạt, khắc dấu và truy sát đối thủ *chỉ vì họ spam hoặc bấm kỹ năng*.
- **Tại sao phá hủy game:**
  - Bấm kỹ năng là nguồn cảm xúc vui vẻ và hành động chính của MOBA. Trừng phạt một người chỉ vì họ bấm phím chiêu thức là triết lý thiết kế thù địch với người chơi (anti-fun).
  - Gây ra "Hội chứng tê liệt thao tác" (Paralysis by Design): Người chơi sợ hãi không dám combo chiêu vì sợ bị Erran khóa mục tiêu tự động.
- **Phán quyết:** **VETO CƠ CHẾ NGUYÊN BẢN.** Sửa thành: Erran chỉ được trừng phạt khi đối thủ **dùng chiêu định hướng bị TRƯỢT** (Skillshot Miss Hunter), biến Erran thành sát thủ bắt bài thực thụ chứ không phải cảnh sát cấm bấm nút.

### 3. #23 · Đếm Bước / Taxa (Pháp sư) — RUPTURE DIỆN RỘNG KHÔNG LỐI THOÁT
- **Bản chất toxic:** Thả một vùng nguyền rủa diện rộng mà "càng chạy trong đó càng bị rút máu/phạt nặng".
- **Tại sao phá hủy game:**
  - Tước đoạt hoàn toàn quyền tự quyết (Agency): Nạn nhân đứng yên thì ăn trọn combo skill của team địch vào mặt; di chuyển chạy trốn thì bị nổ mạch máu chết vì bùa chú.
  - Không có đường thoát khả dĩ nào cho người chơi nếu không có kỹ năng dịch chuyển tức thời. Khác với Vòng Cấm của Rana (chỉ phạt khi cắt qua mép vòng), Taxa phạt ngay trên từng mét vuông mặt đất.
- **Phán quyết:** **VETO / CUT CHUYỂN RESERVE.** Quá độc hại và trùng lặp không gian kiểm soát với Rana.

### 4. #09 · Xiềng Đấu / Vark (Đấu sĩ) — ĐẤU TRƯỜNG ĐỌ CHỈ SỐ THUẦN TÚY (BINARY STAT-CHECK)
- **Bản chất toxic:** Tự khóa xích mình với một mục tiêu trong lồng đấu tử thần, ép solo không thể thoát ra.
- **Tại sao phá hủy game:**
  - Nếu Vark hơn tiền, hơn trang bị $\rightarrow$ Nạn nhân 100% cầm chắc cái chết mà không có bất kỳ cơ hội thả diều (kite) hay outplay nào.
  - Nếu Vark thọt trang bị $\rightarrow$ Vark bấm R là tự biến mình thành con mồi tự sát.
  - Đây là cơ chế thắng bại phụ thuộc thuần túy vào chỉ số (Stat-check), hoàn toàn vắng bóng yếu tố đối kháng kỹ năng.
- **Phán quyết:** **VETO ĐẤU TRƯỜNG ÉP CHẾT.** Phải viết lại thành Lôi Đài Danh Dự: Bên trong lôi đài có luật né đòn/parry; nếu nạn nhân né hoặc đánh trúng Vark 3 đòn, xích vỡ vụn và Vark bị phản phệ choáng váng.

### 5. #20 · Mìn Ký Ức / Teko (Pháp sư / Hỗ trợ) — LỐI CHƠI CẮM TRẠI RẢI BÃY BẨN
- **Bản chất toxic:** Rải bãi mìn dày đặc biến khu vực thành bẫy chờ đối thủ giẫm phải (Hội chứng Techies / Teemo).
- **Tại sao phá hủy game:**
  - Khuyến khích lối chơi tiêu cực trốn trong bóng tối (Toxic Camping), kéo dài thời gian trận đấu (Turtle Game) một cách vô lý.
  - Người chơi chết không phải vì đối phương xử lý giao tranh hay, mà vì vô tình bước chân vào bụi cỏ có sẵn 5 quả mìn. Cảm giác chết tức tưởi và bất lực cùng cực.
- **Phán quyết:** **VETO / RESERVE.** Nếu không có cơ chế rà phá mìn chủ động (quét tầm nhìn, bắn nổ từ xa) và giới hạn cứng tối đa 3 quả mìn cùng lúc thì kiên quyết không đưa vào roster.

### 6. #24 · Vườn Ăn Thịt / Mora (Pháp sư) — SUMMON RÁC PHÁ VỠ HỆ THỐNG
- **Bản chất toxic:** Gieo mầm mọc thành các thực thể săn mồi tự động cắn xé.
- **Tại sao phá hủy game:**
  - Vi phạm nghiêm trọng Luật Pet/Summon của dự án: Tạo ra quá nhiều unit nhỏ trên sàn đấu.
  - Gây nhiễu loạn target lock của tướng đánh xa, vô tình làm lá chắn thịt (meat shield) chặn các mũi tên skillshot quý giá, làm kẹt lính và phá hỏng navmesh di chuyển.
- **Phán quyết:** **CUT THẲNG TAY.**

### 7. #27 · Gọi Mục Tiêu / Cala (Hỗ trợ / Đấu sĩ) — BIAS CHỈ SỐ NHỊ PHÂN VÔ CĂN CỨ
- **Bản chất toxic:** Chỉ mạnh vượt trội khi đứng quanh các mục tiêu lớn (Rồng / Boss Cổ Linh).
- **Tại sao phá hủy game:**
  - Một thiết kế nhị phân cực đoan: Giai đoạn đi lane 15 phút đầu hoàn toàn là gánh nặng vô dụng cho đồng đội; nhưng khi vào hang boss thì chỉ số tăng vọt biến thành quái vật.
  - Cực kỳ khó cân bằng: Nếu buff cho đánh được ở lane thì ở hang boss sẽ vô địch thiên hạ; nếu neft thì không ai thèm pick.
- **Phán quyết:** **CUT THẲNG TAY.**

### 8. #18 · Búa Quỹ / Oren (Đấu sĩ) — MÁY XAY THỊT KHÔNG CÓ KỸ NĂNG
- **Bản chất toxic:** Quay búa quanh thân người liên tục để ép không gian.
- **Tại sao phá hủy game:**
  - Lối chơi một chiều nhàm chán (Garen spin copycat). Không có yếu tố căn thời gian (timing), không có hướng đánh (directional skillshot).
  - Tướng cận chiến lao vào chỉ có nước đọ máu xem ai trâu hơn.
- **Phán quyết:** **CUT THẲNG TAY.**

---

## 4. Danh Sách 5 Lằn Ranh Đỏ (VETO Conditions) Kiên Quyết Không Thỏa Hiệp

Dưới quyền hạn của Balance & Counterplay Reviewer, tôi tuyên bố kích hoạt **Quyền Phủ Quyết (VETO)** đối với bất kỳ ý tưởng thiết kế nào vi phạm 5 lằn ranh đỏ sau:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   5 LẰN RANH ĐỎ BẤT DI BẤT DỊCH (VETO)                 │
├────────────────────────────────────────────────────────────────────────┤
│ 1. CẤM TUYỆT ĐỐI HỖ TRỢ KÝ SINH TÀNG HÌNH BẤT TỬ (Zero Untargetable)   │
│ 2. CẤM TRỪNG PHẠT THỤ ĐỘNG HÀNH VI BẤM NÚT / DI CHUYỂN CỦA ĐỐI THỦ     │
│ 3. LỒNG ĐẤU 1v1 PHẢI CÓ CƠ CHẾ NÉ ĐÒN & PHẢN ĐÒN (No Stat-Check Arena) │
│ 4. MỌI CẠM BẪY PHẢI CÓ GIỚI HẠN SỐ LƯỢNG VÀ CƠ CHẾ RÀ PHÁ RÕ RÀNG      │
│ 5. KHỐNG CHẾ CỨNG TRÊN 1.0s BẮT BUỘC PHẢI CÓ TELEGRAPH TỐI THIỂU 300ms │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Lằn ranh đỏ 1: Không bao giờ có trạng thái Ký sinh Không thể Chọn làm mục tiêu (Zero Untargetable Symbiote):**
   - Mọi thực thể tướng trong trận đấu BẮT BUỘC phải tồn tại bằng một thanh máu vật lý trên mặt đất, nhận đủ sát thương và chịu mọi hiệu ứng khống chế.
   - Không có ngoại lệ cho bất kỳ cơ chế "nhập hồn", "chui vào bụng", hay "ẩn náu trong cơ thể đồng đội".

2. **Lằn ranh đỏ 2: Không trừng phạt hành vi bình thường của người chơi một cách thụ động (No Passive Action-Taxing):**
   - Cấm các bùa chú tự động trừ máu hoặc làm choáng khi người chơi bấm skill hoặc di chuyển bình thường.
   - Trừng phạt chỉ được phép diễn ra khi đối thủ thực hiện **SAI** (dùng skill hụt, bước chân qua ranh giới cấm đã được cảnh báo bằng vạch sáng).

3. **Lằn ranh đỏ 3: Đấu trường phải có luật thoát hiểm và đối kháng kỹ năng (Arenas Must Have Skill Expression):**
   - Không được nhốt người chơi vào một không gian hẹp rồi ép đọ máu thuần túy.
   - Nạn nhân phải luôn có cơ hội lách né đòn, parry phản kích, hoặc kích hoạt điều kiện giải thoát bằng kỹ năng cá nhân.

4. **Lằn ranh đỏ 4: Cạm bẫy phải có giới hạn tồn tại và cơ chế vô hiệu hóa (Trap Quota & Disarm Mechanic):**
   - Cấm bẫy tồn tại vĩnh viễn trên bản đồ. Giới hạn cứng tối đa không quá 3-4 bẫy cùng lúc trên toàn map.
   - Bẫy bắt buộc phải có âm thanh cảnh báo hoặc để lộ viền mờ khi đối phương tiến lại gần, và có thể bị phá hủy an toàn bằng kỹ năng định hướng.

5. **Lằn ranh đỏ 5: Khống chế cứng trên 1.0 giây bắt buộc có Telegraph rõ ràng:**
   - Cấm toàn bộ các kỹ năng khống chế cứng (choáng, kéo, áp chế) dạng Point-and-Click tức thì từ cự ly xa.
   - Bắt buộc phải có đường đạn (projectile) né được hoặc thời gian vận chiêu (wind-up) tối thiểu **300ms** kèm hiệu ứng báo động âm thanh/hình ảnh.

---

## 5. Đánh Giá Luật Kiểm Soát Pet / Drone (Dron, Soma, Boto, Kipa)

Dưới lăng kính cân bằng, việc đưa pet/drone vào game là "con dao hai lưỡi" cực kỳ nguy hiểm. Nếu pet có thanh máu riêng, chúng sẽ vô tình trở thành bức tường thịt (meat shield) nuốt chửng các chiêu thức định hướng quan trọng; nếu pet tự động đánh quá mạnh, người chơi sẽ thắng mà không cần kỹ năng.

Thẩm định cụ thể 4 trường hợp:

### 1. Dron (#26 - Drone Tự Hành): ĐẠT CHUẨN (KEEP / REWRITE)
- **Đánh giá cân bằng:** Hoàn toàn lành mạnh nếu tuân thủ mô hình **Orbit Drone (Drone Quỹ Đạo Vệ Tinh)**.
- **Quy tắc cân bằng bắt buộc:**
  - Drone không có thanh máu riêng, không nhận collision, không chặn đạn skillshot của địch (trừ khi bật mode Chắn).
  - 3 chế độ (Chắn: dựng khiên hướng nón trước mặt; Bắn: bắn phụ theo đòn đánh cơ bản của Dron; Quét: mở tầm nhìn chống tàng hình cục bộ) hoạt động như một hệ thống Stance tự chuyển đổi.
  - Đối thủ nhìn màu đèn trên drone (Vàng/Đỏ/Xanh) là lập tức nắm được Dron đang chuẩn bị làm gì. Counterplay cực kỳ minh bạch.

### 2. Soma (#25 - Ký Sinh Hộ Thể): GIÁM SÁT ĐẶC BIỆT (KEEP / REWRITE DƯỚI ĐIỀU KIỆN VETO)
- **Đánh giá cân bằng:** Chỉ được tồn tại nếu xóa sổ 100% cơ chế bám thân biến mất dạng Yuumi.
- **Quy tắc cân bằng bắt buộc (Kén Bào Tử Cộng Sinh):**
  - Soma đứng trên mặt đất, cách đồng minh một khoảng cách nhất định (Tether Pod).
  - Khi bám Kén vào đồng minh, Soma nhận **30% sát thương truyền ngược về bản thân**.
  - Đây là cơ chế "chia sẻ rủi ro": Địch dồn sát thương vào chủ lực thì Soma cũng tụt máu; hoặc địch có thể vòng ra sau bắt thẳng vào Soma để giải phóng kén. Tuyệt đối công bằng.

### 3. Boto (#29 - Quản Gia Tự Hành): CHUYỂN DỰ BỊ (RESERVE)
- **Đánh giá cân bằng:** Không gây mất cân bằng số liệu nhưng gây **Nhiễu loạn thị giác (Visual Noise) và kẹt hitbox**.
- **Khuyến nghị:** Việc một con mascot chạy lăng xăng quanh giao tranh nhặt vụn năng lượng sẽ làm người chơi tưởng nhầm là bẫy hoặc lính nhỏ. Nếu phát triển tiếp, hãy biến linh vật thành một luồng năng lượng từ tính (Magnetic Pull VFX) bay về người chơi thay vì dựng một unit 3D độc lập. Tạm đưa vào Reserve.

### 4. Kipa (#30 - Thủ Kho Lane): LOẠI BỎ THẲNG TAY (CUT)
- **Đánh giá cân bằng:** Thảm họa thiết kế MOBA.
- **Lý do loại bỏ:**
  - Ngồi trong căn cứ hoặc chạy vòng ngoài dán tem buff lính đẩy đường là lối chơi của game chiến thuật thời gian thực hoặc webgame idle, không phải game đối kháng đồng đội 5v5.
  - Phá vỡ tương tác giao tranh: Hoặc Kipa biến cả trận đấu thành màn PvE đẩy trộm nhàm chán, hoặc khiến đồng đội luôn phải đánh 4v5 chấp người. Không có bất kỳ cơ chế counterplay nào ngoài việc cử người về dọn lính.
  - Quyết định thu hồi slot Kipa để trao cho Iro là hoàn toàn chính xác.

---

## 6. Quan Điểm Cân Bằng Về Aero (Bắn Từ Trên Cao) & Iro (Bắn Cực Xa)

Hai vị tướng hạt nhân này sở hữu 2 ưu thế vị trí nguy hiểm nhất trong MOBA: **Trục Z (độ cao)** và **Tầm bắn ngoài màn hình (Off-screen range)**. Đây là nguồn cơn của vô số thảm họa cân bằng nếu không khóa chặt các lằn ranh kỹ thuật.

### 1. Aero (Phi Công Cổ Khí — Lái Cổ Khí Oanh Tạc)
- **Nguy cơ mất cân bằng:** Lợi dụng trạng thái bay lượn trên không để trở nên bất khả xâm phạm (Untargetable), né tránh kỹ năng cận chiến và địa hình.
- **Giải pháp Cân bằng & Khắc chế bắt buộc:**
  1. **KHÔNG MIỄN NHIỄM SÁT THƯƠNG THEO TRỤC Z:** Độ cao khi bay chỉ là biểu diễn trực quan (Visual Float). Hitbox hình trụ của Aero vẫn chạm mặt đất và nhận đủ 100% sát thương từ đòn đánh thường, skillshot và khống chế. Bị dính trói chân hoặc choáng là phi cơ bị giật rơi rà sát đất ngay lập tức!
  2. **QUÁN TÍNH PHƯƠNG TIỆN (Vehicle Turning Inertia):** Lái phi cơ có bán kính quay đầu và trớn di chuyển, không thể giật lùi hoặc đổi hướng 180 độ tức thì như người đi bộ. Điều này khiến đường bay của Aero dễ đoán, giúp đối thủ căn trước điểm rơi để tung chiêu đón đầu.
  3. **CƠ CHẾ QUÁ NHIỆT / HẠ CÁNH SƠ HỞ (Landing Stall Window):** Khi bay xả bom hết thanh năng lượng, phi cơ rơi vào trạng thái quá nhiệt trong 3 giây: tốc độ giảm mạnh, không thể lướt, tạo cơ hội bằng vàng cho đấu sĩ và sát thủ áp sát trừng phạt.
- **Kết luận:** **STRONG KEEP (Duyệt giữ vững chắc)** nếu tuân thủ 3 ràng buộc trên.

### 2. Iro (Mắt Thiên Cơ — Sniper Cổ Khí Bắn Cực Xa)
- **Nguy cơ mất cân bằng:** Nạn nhân đang di chuyển bị bốc hơi nửa cây máu từ ngoài màn hình mà không hề biết đối thủ đứng ở đâu (Off-screen cheese).
- **Giải pháp Cân bằng & Khắc chế bắt buộc:**
  1. **TIA LASER DẪN ĐƯỜNG CẢNH BÁO (Telegraph Aiming Beam):** Trước khi tia đạn xuyên thấu phóng ra, Iro BẮT BUỘC phải chiếu một đường laser màu đỏ/cam hiển thị rõ trên màn hình nạn nhân trong thời gian tối thiểu **0.6s – 0.8s**. Nạn nhân thấy đường ngắm sẽ có đủ thời gian phản xạ để bấm D (Dash) hoặc bước né.
  2. **CHẾ ĐỘ CHÔN CHÂN CỐ ĐỊNH (Anchor Sniper Stance):** Khi mở rộng tầm ngắm siêu xa, Iro phải tự khóa chặt chân tại chỗ (Root bản thân), không thể di chuyển và tầm nhìn xung quanh thân bị thu hẹp (Tunnel Vision).
  3. **TỰ ĐỘNG LỘ TẦM NHÌN KHI NỔ SÚNG:** Mỗi phát bắn xuyên thấu vang lên tiếng nổ lớn toàn map và để lộ vị trí của Iro trên Minimap trong 2.5 giây. Iro lập tức trở thành con mồi ngon cho Kiko, Vero hoặc Moka vòng ra sau săn lùng.
- **Kết luận:** **STRONG KEEP (Duyệt giữ vững chắc)** nếu khóa cứng cơ chế Laser ngắm bắn cảnh báo.

---

## 7. Bảng Khuyến Nghị Hành Động Cho Toàn Thể Hội Đồng (Action Matrix)

Dưới đây là khuyến nghị xử lý của Balance Reviewer đối với 24 concept trong danh sách đề xuất:

| Nhóm | Số lượng | Danh sách tướng | Chỉ thị thiết kế Cân bằng & Khắc chế |
|---|:---:|---|---|
| **Green Pass (An toàn cao)** | 12 | Kora, Brak, Forge, Rana, Libro, Nera, Rolo, Vero, Rako, Kiko, Jeli, Pavo | Giữ nguyên concept core; thiết kế kit xoay quanh các cửa sổ sơ hở và mind-game đã xác lập. |
| **Yellow Pass (Điều kiện ngặt nghèo)** | 6 | **Aero** (hitbox mặt đất + quán tính), **Iro** (laser báo trước + chôn chân), **Dron** (orbit drone không HP), **Vika** (dây bẫy thấy được), **Inka** (tối đa 2 vệt mực), **Marduk** (vật tại chỗ có wind-up) | Chỉ phê duyệt chuyển sang viết Kit khi tài liệu mô tả cam kết tuân thủ các ràng buộc khắc chế kỹ thuật. |
| **Red Pass (Cải tạo bắt buộc)** | 6 | **Soma** (thân thể trên đất + chia sẻ máu), **Erran** (chỉ bắt lỗi skill trượt), **Vark** (lôi đài có luật né/phản đòn), **Garo** (va chạm từ trường hai chiều), **Liora** (dây phán có tầm đứt hợp lý), **Eelix** (lướt sóng có vệt nước lộ diện) | **VETO kích hoạt** nếu cố tình giữ cơ chế cũ. Bắt buộc viết lại theo bản định hình mới của Hội đồng. |

---

## 8. Lời Kết Của Balance Reviewer

Là người làm cân bằng, tôi không sợ tướng có kỹ năng dị hay độc đáo; **tôi chỉ sợ tướng khiến người chơi đối diện cảm thấy bất công và từ bỏ trận đấu**. 

Roster V5 của Cổ Linh Thần Chiến có tiềm năng trở thành một đấu trường esport mẫu mực nếu chúng ta kiên quyết loại bỏ bóng ma của Yuumi (Soma), dập tắt tư duy trừng phạt bấm phím tiêu cực (Erran), dẹp bỏ bãi mìn cắm trại (Teko) và mở toang cánh cửa outplay cho các tướng tay dài (Aero, Iro). 

Tôi chính thức ký tên phê duyệt bản báo cáo độc lập này và yêu cầu Hội đồng cũng như Creator đưa 5 Lằn Ranh Đỏ vào điều lệ thiết kế bất biến của dự án.

**Ký tên:**  
*Đức "Symmetric" — Balance & Counterplay Reviewer, Hội Đồng Audit COLINH V5.*
