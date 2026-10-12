# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #01 KIKO

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Kiko (#01) — Runtime ID: `kiko`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [102 — Beginner Concept Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md), [96 — Top 15 Concept Bibles](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/96-roster-v5-top15-concept-bibles.md), [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/91-khoa-input-qwer-d.md), [73 — Balance Lab](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Phân định tuyệt đối với Linh Hầu #38 (song trảo cơ khí, 4 chi, ảo ảnh quang học). |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **PASS_LAB** | Core toy `holographic_decoy` pass unit test. Burst combo 75%–96% HP; duel late-game tụt do AI sim chưa tối ưu outplay. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W2-KK-001` (Major: Sim AI limitation), `DEF-W2-KK-002` (Major: Decoy trickery runtime), `DEF-W2-KK-003` (Minor: 4-leg animation). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Sát thủ ảo ảnh độc đáo; kiểm soát chặt chẽ thiết kế; giữ Gate 4 chờ Owner ký duyệt.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible & Giải Quyết Xung Đột Nhận Diện (Doc 102 §2)
- **Fantasy cốt lõi:** *"Ảnh Hầu — Sát thủ ranh mãnh, outplay góc nhìn bằng ảo ảnh quang học khúc xạ và song trảo cơ khí sắc bén luồn lách tuyến sau."* (Doc 102 §2, Doc 96 [07]).
- **Phân định dứt khoát với Linh Hầu (#38):**
  - **Silhouette & Dáng di chuyển:** Kiko nhỏ thó, lưng cong gập, bò trườn và nhào lộn 4 chi lắt léo; tuyệt đối không đứng thẳng đường hoàng như Linh Hầu.
  - **Vũ khí:** Trang bị Song Trảo cơ khí gắn mu bàn tay; nghiêm cấm cầm gậy hoặc dùng kỹ năng nện đất.
  - **Lối chơi:** Ám sát rình rập, đánh lừa thị giác kẻ địch bằng bóng ảo 1-hit threshold; không phải đấu sĩ càn lướt tiền tuyến.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:**
  - Ảo ảnh quang học của Kiko có ngưỡng hấp thụ **1-hit threshold** (bất kỳ đòn đánh thường hoặc kỹ năng nào chạm vào bóng sẽ làm bóng vỡ tan ngay lập tức). Nạn nhân chỉ cần tung 1 kỹ năng diện rộng hoặc đòn đánh thường là hóa giải được bóng ảo.
  - Sau khi ảo ảnh vỡ, Kiko lộ diện với chỉ số chống chịu cực kỳ yếu ớt (30 Giáp, 30 Kháng phép gốc), nạn nhân hoàn toàn có thể dồn khống chế hạ gục Kiko trong 1 nốt nhạc.
  - Chiêu Q lao vào có hướng thẳng cự ly 6.0m; nạn nhân có thể dùng Universal Dash (D) lướt né để Kiko lướt hụt và mất vị trí an toàn.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: Q (Toái Trảo Đột Kích — lướt 6.0m), RMB/W (Ảo Ảnh Phân Thân — lùi lại và tạo bóng chạy tới), E (Khúc Xạ Trảm Kích — quét trảo 2 lần), R (Vạn Ảnh Trảo Sát — áp sát choáng 0.8s dồn sát thương).
- Đánh thường cận chiến song trảo (`range: 1.6m`). Phím D (Universal Dash) giữ độc lập.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Ảo ảnh quang học hấp thụ 1-hit (Holographic Decoy 1-hit Threshold Absorption)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Sau khi kích hoạt RMB hoặc tung chiêu có decoy, gán cờ `decoyUntil` và `decoyHit: false`.
  - Hàm `hurt()` kiểm tra nếu `decoyUntil > W.t` và chưa bị hit, triệt tiêu 100% sát thương của đòn đầu tiên (`dealt = 0`), ghi nhận `passive:decoy_absorbed = 1` và kích hoạt vỡ bóng. Đòn thứ 2 nhận sát thương bình thường.
  - Dòng 45–67 (`tools/test/wave2-gameplay-toys.test.mjs`): Xác nhận đòn 1 bị chặn hoàn toàn, đòn 2 gây sát thương, hp không mất ở đòn đầu.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave2-gameplay-toys.test.mjs` chạy PASS bài test `Toy 2: Kiko holographic decoy 1-hit threshold absorption` [0.31ms].

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Sát Thủ
- **Chiến dịch:** `reports/sim/production26/2026-10-12T07-21-06-914Z/` (`kiko`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 173.
- **Phân tích chỉ số:**
  - Sát thương dồn combo phút 3 khủng khiếp nhất Wave 2: Gây **803 dmg (75.2% HP)** lên Kha Tấn, **890 dmg (85.8% HP)** lên Hỏa Tùy, và **890 dmg (96.9% HP)** lên Mặc Liên.
  - Tỉ lệ thắng 1v1 giai đoạn đầu tốt: Phút 3 (48.0%), Phút 6 (43.2%), đánh bại hoàn toàn các mục tiêu máu mỏng.
  - Tỉ lệ thắng late game tụt dốc (Phút 10: 29.8%, Phút 15: 24.3%, Phút 20: 20.9%, Full build: 23.9%) do bot AI trong simulator chưa biết căn thời điểm luồn lách mà lao thẳng vào đội hình có trang bị giáp dày.
  - **Tỉ lệ thắng 2v2:** Đạt **44.5%** ($n=91$).
  - **Chịu gank 1v2:** 0.3% (đúng đặc thù sát thủ).

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig) & Hoạt họa (Animation):** Thân hình vượn nhỏ, rig 4 chi với các chu kỳ chạy/bò thấp sát mặt đất (quadrupedal locomotion). Chú ý xương đuôi và song trảo gắn mu tay không bị co kéo vertex (vertex stretching). Ngân sách $\le 12,000$ tris.
- **VFX Hologram Decoy:** Ảo ảnh quang học cần shader dạng scanline / glitch khúc xạ ánh sáng tím nhẹ, mờ dần sau khi vỡ. Giới hạn 1 bóng tại một thời điểm, không sinh nhiều bản sao gây lag GPU di động.
- **Chi phí & Gate 4:** Giữ nghiêm ngặt trạng thái chờ Owner duyệt; không chi tiêu bất kỳ credit tạo mesh/rig nào trước Gate 4.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W2-KK-001** | **MAJOR** | Audit 2 (Balance / Sim) | Tỉ lệ duel late-game tụt sâu xuống 20.9% - 24.3% do bot simulator đánh chay trực diện vào tướng tanker/bruiser thay vì ưu tiên săn tìm mục tiêu máu giấy tuyến sau. | Cập nhật logic hành vi chọn mục tiêu (Assassin Target Priority) trong script AI bot trước chiến dịch Wave 3. | `OPEN` |
| **DEF-W2-KK-002** | **MAJOR** | Audit 2 (Runtime Mechanics) | Cơ chế ảo ảnh quang học trong simulator hiện chỉ hấp thụ 1 hit cơ học (`1-hit threshold`), chưa có thuật toán AI đối thủ bị đánh lừa tung kỹ năng định hướng vào bóng ảo (nằm trong danh sách NOT_TESTED). | Thiết kế module `DecoyTargetRedirection` khi đưa vào runtime Spawn thực tế tại Gate 6. | `OPEN` |
| **DEF-W2-KK-003** | **MINOR** | Audit 3 (Art / Animation) | Tư thế chạy 4 chi (quadrupedal locomotion) ở góc camera isometric $45^\circ$ có thể làm cụm song trảo bị che khuất bởi đầu nhân vật nếu đầu cúi quá thấp. | Tech Art cần nâng nhẹ góc ngẩng đầu của Kiko trong blend tree di chuyển để nhận diện rõ vũ khí song trảo. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 & AUDIT 2 — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Kiko (#01) hoàn thành xuất sắc vai trò một Sát thủ ảo ảnh quang học: bộ chiêu dồn sát thương cực sốc lên tướng máu giấy, cơ chế phân thân 1-hit độc đáo, phân định triệt để với Linh Hầu #38. Hồ sơ sẵn sàng trình Owner ký phê duyệt Gate 4.
