# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #43 PHÙ ĐỔNG

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Phù Đổng (#43) — Runtime ID: `phu_dong`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [102 — Beginner Concept Shortlist](../102-roster-v5-beginner-concept-shortlist.md), [103 — Mythic Quintet Concept Bible](../103-mythic-quintet-concept-bible.md), [104 — Master Plan](../104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../91-khoa-input-qwer-d.md), [73 — Balance Lab](../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Chuẩn Chiến Tướng Cưỡi Thiết Mã Cổ Linh (Rider on Iron Steed - không phải Centaur); khoảnh khắc huyền thoại gãy kiếm nhổ tre bám sát 102/103. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy `mounted_momentum` pass unit test thực tế (cast R -> bamboo reach 3.5m -> sweep -> expiry). Đạt chuẩn Vanguard xuất sắc (2v2: 70.9%, 3v3: 58.5%). 143 cờ Orange cần tiếp tục theo dõi. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W2-PD-001` (Resolved qua test thực tế), `DEF-W2-PD-002` (Đã khóa spec Spawn collider). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Tướng Thần Thoại biểu tượng số 1 đạt chất lượng cao; giữ nghiêm ngặt trạng thái chờ Owner ký duyệt Gate 4.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 103 & Shortlist 102
- **Fantasy cốt lõi:** *"Thiết Mã Thiên Tướng — Ngựa sắt và Chủ tướng là một thực thể chiến đấu cơ khí thần thoại thống nhất (Unified Mounted Cavalry Entity — Chiến tướng cưỡi thiết mã, KHÔNG PHẢI Centaur nhân mã). Khi kiếm gãy vụn, nhổ Cổ Trúc sấm sét quét sạch chiến trường!"* (Doc 102 §5, Doc 103 §1).
- **Trải nghiệm chiến đấu trực quan:**
  - Vó ngựa phi nước đại dập ra lốc xoáy lôi hỏa; tiếng hí vang cơ khí khi kích hoạt chiêu Q mang lại cảm giác uy phong của một vị tướng lĩnh thần thoại.
  - Chiêu R thể hiện khoảnh khắc biến chuyển ngoạn mục: Thần kiếm vỡ tan thành tia chớp, nhổ bật cụm tre ngọc bích sấm sét quét càn tuyến phòng ngự đối phương.
  - Tuyệt đối không phân tách ngựa và người (không có cơ chế xuống ngựa/lên ngựa rườm rà), đúng tinh thần chỉ đạo của Owner.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:**
  - Chiêu Q (Thiết Mã Đột Kích) lao thẳng theo đường thẳng với cự ly 7.2m, có hiệu ứng windup 0.15s kèm tiếng ngựa hí cảnh báo; nạn nhân có thể dùng Universal Dash (D) lướt chéo góc né tránh.
  - Khi Phù Đổng bị khống chế cứng hoặc làm chậm liên tục (như quả cầu lửa của Hỏa Tùy), thanh Xung Lượng sẽ bị tụt giảm khiến hắn mất đòn húc làm choáng và tốc độ chạy cộng thêm.
  - Lớp khiên Kim Giáp (RMB) kéo dài 3.0s; sau khi khiên hết hạn, Phù Đổng có khoảng trống hồi chiêu 9s để đối phương tập trung phản kích.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: Q (Thiết Mã Đột Kích — lướt húc văng), RMB/W (Kim Giáp Thiết Thuẫn — tạo khiên dậm móng), E (Lôi Hỏa Trảm — quét chém diện rộng), R (Thiên Lôi Cổ Trúc — nhổ tre đập choáng diện rộng).
- Đánh thường cận chiến trên lưng ngựa (`range: 2.1m`). Nút D (Universal Dash) giữ nguyên độc lập.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Xung lượng Thiết Mã & Biến hóa Cổ Trúc (Mounted Momentum & Bamboo Transformation)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Tích lũy xung lượng 25 đà/giây khi di chuyển (`momentumPerSec: 25`).
  - Khi đà $\ge 80$, đòn đánh thường đầu tiên gây thêm 50% bonus AD và làm choáng 0.6s (`chargeStun: 0.6`).
  - Khi dùng R, kích hoạt trạng thái biến đổi tre thần `bambooUntil = t + 6.0`, mở rộng tầm đánh LMB từ 2.1m lên 3.5m và gây thêm 35% sát thương quét (bamboo sweep). Sau 6.0s tầm đánh tự động trở về 2.1m.
- **Bằng chứng kiểm thử tự động hành vi thực tế:** `tools/test/wave2-gameplay-toys.test.mjs` chạy PASS bài test `Toy 1: Phu Dong mounted momentum & bamboo transformation (full cast sequence & reach shift)` với đầy đủ chuỗi cast R -> biến đổi tầm đánh -> đánh trúng mục tiêu ngoài tầm thường -> hết hiệu lực quay về tầm thường -> tích đà di chuyển -> đòn húc gây choáng và tiêu hao đà.

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Utility Tiên Phong
- **Chiến dịch:** `reports/sim/production26/2026-10-12T07-21-06-914Z/` (`phu_dong`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 143 (Yêu cầu review, không tính là PASS_MODEL sạch).
- **Phân tích chỉ số Utility:**
  - Tỉ lệ thắng 1v1 trung bình: Phút 3 (55.0%), Phút 6 (70.4%), Phút 10 (59.1%), Phút 15 (54.4%), Phút 20 (56.5%), Full build (69.5%).
  - Khắc chế triệt để các sát thủ vật lý và đấu sĩ cơ động thấp (Vạn Đao 78-100%, Bạch Diện 55-100%, Mặc Liên 100%).
  - Điểm yếu chiến thuật rõ rệt trước Pháp sư cấu rỉa phép tầm xa (Hỏa Tùy thắng 71-95%), đúng nguyên lý tương khắc MOBA.
  - **Tỉ lệ thắng giao tranh đội nhóm dẫn đầu Wave 2:** 2v2 đạt **70.9%**, 3v3 đạt **58.5%**.
  - **Khả năng lật kèo gank 1v2:** Đạt **16.3%** ở phút 6 (cao nhất Wave 2).
  - **Thời gian chịu trụ:** 26.8 giây (trâu nhất Wave 2).

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Runtime Spawn
- **Khung xương (Rig):** Chiến tướng cưỡi thiết mã (Rider Mounted on Iron Steed — hai thực thể gắn kết qua socket yên cương, KHÔNG PHẢI Centaur lai người ngựa). Animation Root Motion mượt mà khi chạy nước đại và quẹo cua. Polycount ngân sách $\le 18,500$ tris cho cả tướng lẫn ngựa. Target engine là **Spawn**.
- **Shader & VFX Performance:**
  - Chân móng ngựa có hiệu ứng lửa điện (lightning sparks) phát ra theo bước dậm chân; cần sử dụng Particle System với GPU instancing để tránh nghẽn CPU trên runtime di động.
  - Cụm tre thần (Cổ Trúc) xuất hiện trong Ultimate R cần mesh cành tre ngọc bích sấm sét tối ưu polycount $\le 1,200$ tris.
- **Chi phí & Gate 4:** Chưa duyệt chi sản xuất 3D hoàn chỉnh; giữ nghiêm ngặt trạng thái chờ Owner phê duyệt.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W2-PD-001** | **MAJOR** | Audit 2 (Runtime Mechanics) | Cơ chế chuyển đổi vũ khí sau Ultimate R: Cần chứng minh toàn bộ chuỗi cast R -> mở rộng tầm đánh thường (Bamboo stance reach: 3.5m) kéo dài 6s và quét sát thương trong combat loop. | Đã viết unit test hoàn chỉnh tại `wave2-gameplay-toys.test.mjs` chứng minh cast R -> bambooUntil 6.0s -> mở rộng reach 3.5m -> sweep damage -> hết hạn trở về 2.1m. | **RESOLVED_WITH_TEST_PROOF** |
| **DEF-W2-PD-002** | **MINOR** | Audit 3 (Collision/Rig) | Thể hình kỵ mã có chiều dài trục Z lớn hơn nhân vật thông thường, nguy cơ bị kẹt va chạm góc hẹp nếu dùng Capsule Collider chuẩn $r=0.6\text{m}$ trên Spawn runtime. | Tech Art đã khóa spec Capsule Collider chuyên biệt cho kỵ mã (bán kính $0.75\text{m}$, chiều cao $2.4\text{m}$, pivot căn giữa lưng ngựa) theo đúng file `08-asset-production.md` cho engine Spawn. | **RESOLVED_SPEC_LOCKED** |
| **DEF-W2-PD-003** | **MINOR** | Audit 2 (Balance Tuning) | Tỉ lệ thắng 1v1 ở phút 6 đạt 70.4% và Full build đạt 69.5% là hơi cao đối với một Tiên phong (do stats cơ bản 760 HP, 66 AD kèm tuning 1.05 hp / 0.96 dmg và momentum stun 0.6s liên tục). | Cần theo dõi trong các đợt 5v5 để cân nhắc giảm nhẹ 5% scaling AD chiêu Q nếu winrate tổng thể vượt ngưỡng trần 55%. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 — FLAG_REVIEW TẠI AUDIT 2 (red=0, 143 orange) — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Phù Đổng (#43) là tướng thần thoại biểu tượng số 1 của dự án: cốt truyện hào hùng, trải nghiệm kỵ mã dũng mãnh, hiệu quả mở giao tranh dẫn đầu Wave 2 (2v2: 70.9%) và các chỉ số chịu đòn vượt trội. Hồ sơ sẵn sàng trình Owner ký phê duyệt Gate 4 sau khi đã giải quyết 2/3 defect có bằng chứng kiểm thử thực tế.
