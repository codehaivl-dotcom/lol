# 95 · Thiết Kế Chuyên Sâu Archetype Trinh Sát: Cổ Mộc Đèn Lồng / Sylva (Mok)

**Dự án:** Cổ Linh Thần Chiến (COLINH)  
**Tác giả:** Lead MOBA Designer (Hội Đồng Audit Roster V5)  
**Ngày:** 12/10/2026  
**Trạng thái:** `CONCEPT_PROPOSAL / SCOUT_ARCHETYPE_SPEC`  
**Cảm hứng thiết kế:** Tam giác chiến thuật **Maokai** (kiểm soát bụi) + **Teemo** (mai phục & bẫy rình rập) + **Lux** (dò quét tầm xa an toàn không face-check)

---

## 1. Câu Hỏi Tối Thượng (Player Fantasy & Core Identity)

> **"Tôi pick Sylva vì tôi được biến sương mù chiến tranh (Fog of War) và bụi cỏ thành bàn cờ phục kích của riêng mình: soi sáng từ xa, bẫy góc chết, và tự tay mở giao tranh từ trong bóng tối mà không bao giờ phải face-check mạo hiểm."**

Sylva không phải là một "công nhân cắm mắt" thụ động. Sylva là **Kẻ Thao Túng Bản Đồ & Trinh Sát Tác Chiến (Combat Vanguard Scout)**. Người chơi chọn Sylva để làm chủ hoàn toàn dòng thông tin của trận đấu: biết trước kẻ địch đang ở đâu, ép đối thủ phải bước đi trong lo sợ, và biến chính thông tin tầm nhìn đó thành nguồn sát thương/khống chế dứt điểm mục tiêu.

---

## 2. Giải Pháp Chống "Warding Bot" & Tránh Lối Chơi Cắm Mắt Thụ Động

Các vị tướng trinh sát trong MOBA truyền thống thường chết yểu hoặc biến thành "thảm họa cân bằng" vì 2 thái cực:
1. *Thái cực 1 (Quá chán):* Trở thành một cái máy cắm mắt di động, chỉ đi rải ward rồi đứng sau lưng team buff máu (Zero agency).
2. *Thái cực 2 (Quá toxic):* Trở thành cỗ máy rải mìn tàng hình toàn bản đồ hoặc ném mầm cây cấu rỉa nửa cây máu từ xa 2 màn hình (như AP Maokai E spam hay Teemo nấm cũ), khiến đối phương không có cách đối kháng (Zero interaction).

### Công thức đột phá của Sylva: "Active Surveillance & Combat Payoff" (Tầm nhìn gắn liền với tương tác cơ học)

* **Đèn Lồng Cổ Mộc là Thực Thể Tác Chiến (Interactive Anchor), không phải mắt tĩnh:**
  * Đèn lồng không chỉ đứng im soi sáng. Khi kẻ địch bước vào vùng sáng, người chơi Sylva có quyền **tái kích hoạt chiêu thức chủ động** để bẻ lái tình huống: kích nổ chùm sáng gây lóa mắt (Mù định hướng), hoặc phóng rễ cây trói chân.
* **Tầm nhìn là Tiền Đề để Tấn Công (Target Illumination & Leap):**
  * Kẻ địch bị Đèn Lồng hoặc hạt mầm của Sylva soi trúng sẽ bị khắc dấu ấn **"Huyễn Quang" (Illuminated)**. 
  * Dấu ấn này không chỉ cung cấp tầm nhìn chuẩn mà còn mở khóa cơ chế hành động cho Sylva: Đòn đánh hoặc kỹ năng tiếp theo từ Sylva lên mục tiêu này sẽ được **tăng gấp đôi tầm thi triển hoặc cho phép Sylva lướt bổ vào mục tiêu** từ bóng tối.
  * **Quy tắc thiết kế:** *Soi sáng chỉ là bước đệm, người chơi bắt buộc phải tự tay tham gia combat để thu về phần thưởng (Kill/Assist).*

---

## 3. Core Loop Giao Tranh 5v5: Nhịp Thở Combat Của Sylva

Một Trinh Sát đẳng cấp trong MOBA 5v5 không bao giờ đứng ngoài rìa giao tranh. Nhịp thở combat của Sylva vận hành qua 3 giai đoạn nhịp nhàng:

```
[Giai đoạn 1: Tiền giao tranh] 
Quăng Đèn Lồng thăm dò choke point -> Tước quyền núp bụi của sát thủ/tank địch -> Soi mục tiêu lớn
       │
       ▼
[Giai đoạn 2: Bùng nổ giao tranh]
Lướt xuyên địa hình tới Đèn Lồng -> Tung R "Rễ Cổ Thức Tỉnh" kết nối các vệt sáng trói chân diện rộng
       │
       ▼
[Giai đoạn 3: Truy quét tàn cuộc]
Bắn mầm dẫn đường khóa tầm nhìn kẻ địch tháo chạy -> Cho phép carry kết liễu ngoài Fog of War
```

### Chi tiết 3 nhịp:
1. **Pha Tiền Giao Tranh (Pre-Fight Recon & Choke Denial — Nhịp Lux/Maokai):**
   - Đội hình hai bên đang giằng co quanh hang Rồng/Baron. Sylva phóng **Đèn Lồng Tầm Xa** vào các bụi rậm then chốt.
   - Vùng sáng quét sạch bóng tối. Kẻ địch nào định rình rập mở combat sẽ bị lộ tẩy vị trí, bị làm chậm nhẹ. Đội bạn hoàn toàn miễn nhiễm với hiểm họa bị úp sọt (anti-flank).
2. **Pha Bùng Nổ Giao Tranh (Engage & Area Lockdown — Nhịp Đột Phá):**
   - Sylva tận dụng nội tại **Ẩn Thân Cổ Mộc (Camouflage trong bụi)** để tiếp cận từ sườn. 
   - **Ultimate "Rễ Cổ Thức Tỉnh":** Kích hoạt liên kết ánh sáng giữa bản thân và các Đèn lồng đã đặt trên sân. Mạng lưới rễ cây cổ đại từ mặt đất đồng loạt bùng nổ, kéo giật và trói chân toàn bộ kẻ địch nằm trong vùng tam giác/đa giác ánh sáng.
3. **Pha Dọn Dẹp Chiến Trường (Clean-up & Relentless Hunt):**
   - Tướng địch tàn máu quay đầu tháo chạy vào góc tối rừng rậm? Sylva bắn hạt mầm bám dính, duy trì Tầm Nhìn Chuẩn (True Sight). Không một kẻ địch nào có thể biến về an toàn hoặc kích hoạt tàng hình trốn thoát, dọn đường cho các xạ thủ như Iro hay Nera tung đòn kết liễu từ xa.

---

## 4. Đồ Chơi Cơ Học (Core Gameplay Toy) Tạo Highlight & Outplay

Để Sylva có thể xuất hiện trong các video highlight triệu view, vị tướng này được trang bị món đồ chơi độc bản:

### 🌟 TOY: "ĐÈN LỒNG DẪN LỐI & LƯỚT RỄ THẦN TỐC" (Lantern Warp & Tree Glide)
* **Cơ chế:** Sylva ném Đèn Lồng Cổ Mộc tới một điểm chỉ định cách xa 900 đơn vị (có thể bay qua vách tường). Đèn lồng cắm xuống đất tạo vùng sáng trong 10 giây.
* **Outplay Branching Choice (Quyết định phân nhánh cực đại):**
  * **Nhánh A (Debuff / Zoning):** Tái kích hoạt tại chỗ -> Đèn lồng xả sóng năng lượng gây Mù (Blind - kẻ địch đánh trượt đòn đánh thường) trong 1.5s và làm chậm 40%.
  * **Nhánh B (High Mobility Leap):** Nhấn giữ phím Dash (D) hoặc tái kích hoạt hướng về phía Đèn Lồng -> Sylva biến thành một dải rễ cây **lướt xuyên địa hình bay thẳng tới vị trí Đèn Lồng**.
* **Kịch bản Highlight kinh điển:**
  * *Pha đào thoát không tưởng:* Bị 3 kẻ địch vây hãm trong rừng -> Sylva quăng Đèn Lồng qua tường hang Rồng -> Đèn soi sáng hang -> Sylva lướt xuyên tường thoát thân, đồng thời kích nổ mù khiến kẻ địch đứng bên kia vách tường mất dấu hoàn toàn.
  * *Pha Flank mở combat bất ngờ:* Đặt đèn lồng sau lưng đội hình địch từ góc mù -> Lướt xuyên tường tới đèn -> Kích hoạt R khóa chặt chủ lực đối phương trong sự ngỡ ngàng.

---

## 5. Những Lằn Ranh Đỏ (Guardrails) Bảo Vệ Tính Đối Kháng MOBA

Để Sylva là một trinh sát lành mạnh, kích thích kỹ năng thay vì phá hoại trải nghiệm đối thủ, 4 lằn ranh đỏ sau đây được thiết lập bất di bất dịch:

1. **Lằn Ranh Đỏ 1: Giới Hạn Cứng Về Số Lượng & Tuổi Thọ Của Đèn (Hard Cap & Decay):**
   - *Quy tắc:* Tối đa chỉ tồn tại **2 Đèn Lồng** trên bản đồ cùng lúc. Thời gian tồn tại giới hạn (45-60 giây), không có chuyện rải đèn vĩnh viễn khắp map.
   - *Counterplay:* Đèn lồng có 3 vạch máu (như mắt cắm). Tướng địch hoàn toàn có thể phá hủy đèn bằng 3 đòn đánh thường để thu về vàng/kinh nghiệm.
2. **Lằn Ranh Đỏ 2: Không True Sight Vĩnh Viễn / Tự Do (No Free Invisibility Denial):**
   - Đèn lồng thông thường **CHỈ SOI SÁNG FOG OF WAR VÀ BỤI CỎ**, không tự động soi tàng hình của sát thủ (như Kiko).
   - Chỉ soi được tàng hình (True Sight) khi kẻ địch **trực tiếp dẫm vào tâm của Đèn Lồng** hoặc bị Sylva dùng chiêu thức trúng đích. Tránh việc Sylva biến toàn bộ lớp tướng tàng hình thành phế vật chỉ bằng cách cắm mắt thụ động.
3. **Lằn Ranh Đỏ 3: Tuyệt Đối Cấm "Cấu Máu Cực Đoan Không Tương Tác" (No Brainless AP Poke):**
   - Đèn lồng và hạt mầm trinh sát **không gây sát thương sốc quá 15% máu**. Sát thương cơ bản ở mức vừa phải, vai trò chính là hiệu ứng khống chế mềm và tầm nhìn.
   - Sát thương bùng nổ của Sylva chỉ xuất hiện khi Sylva trực tiếp lao vào giao tranh hoặc kích hoạt Ultimate. Khai tử hoàn toàn lối chơi "đứng nhà ném chiêu rút máu" gây ức chế.
4. **Lằn Ranh Đỏ 4: Ngụy Trang Có Điều Kiện Rõ Ràng (Conditional Camouflage):**
   - Cơ chế ẩn thân của Sylva tuân theo luật **Ngụy Trang (Camouflage)** giống Evelyn/Twitch: Chỉ tàng hình khi đứng trong bụi cỏ hoặc đứng yên cạnh Đèn lồng của mình quá 1.5 giây. Nếu tướng địch áp sát trong cự ly gần (350 đơn vị), Sylva sẽ bị lộ hình. Kẻ địch hoàn toàn có thể dùng kỹ năng định hướng (skillshot) để quét trúng và lôi Sylva ra ánh sáng.

---

## 6. Kết Luận & Đề Xuất Của Lead Gameplay Designer

Archetype Trinh Sát Cổ Mộc (**Sylva / Mok**) giải quyết trọn vẹn một khoảng trống chiến thuật cực lớn trong roster 24 tướng của COLINH: **Khoảng trống về tướng điều tiết nhịp độ bản đồ (Vision & Map Control Specialist).**

Bằng việc kết hợp cơ chế kiểm soát bụi của Maokai, mai phục của Teemo và thăm dò tầm xa của Lux, nhưng **nâng cấp bằng đồ chơi cơ học lướt xuyên địa hình và kích nổ chủ động**, Sylva sẽ là một tướng Hỗ Trợ / Pháp Sư Kiểm Soát (Utility Support / Control Mage) cực kỳ hấp dẫn, đậm chất trí tuệ, giàu tính thi đấu chuyên nghiệp và tuyệt đối nói không với lối chơi "cắm mắt AFK".
