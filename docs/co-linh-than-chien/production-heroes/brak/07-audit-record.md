# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #02 BRAK

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Brak (#02) — Runtime ID: `brak`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [102 — Beginner Concept Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md), [96 — Top 15 Concept Bibles](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/96-roster-v5-top15-concept-bibles.md), [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/91-khoa-input-qwer-d.md), [73 — Balance Lab](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Đấu sĩ nhịp quyền cơ khí hơi nước chuẩn xác theo Doc 96 [09]. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **PASS_LAB** | Core toy `parry_piston` pass unit test. Hiệu quả giao tranh 2v2 rất cao (62.1%). |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W2-BK-001` (Major: Parry bot timing), `DEF-W2-BK-002` (Minor: Parry audio-visual feedback), `DEF-W2-BK-003` (Minor: Visual similarity with Forge). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Đấu sĩ phản đòn cơ giới đầm tay; sẵn sàng trình Owner ký Gate 4.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible & Shortlist 102
- **Fantasy cốt lõi:** *"Nhịp Quyền — Đấu sĩ Cự thạch Piston hơi nước. Chặn đòn (Parry) chuẩn xác và tung ra cú đấm piston hơi nước bộc phát cực mạnh."* (Doc 96 [09], Doc 102 §1).
- **Trải nghiệm chiến đấu trực quan:**
  - Hai nẹp tay bọc giáp đồng đỏ dày dặn gắn ống xilanh piston khí nén.
  - Người chơi có cảm giác "đọc vị" đối thủ: Canh đúng khoảnh khắc đối thủ tung đòn đánh mạnh nhất để bấm RMB Nghênh Kích, kích hoạt tiếng rít hơi nước và đấm phản kích bộc phát.
  - Không phải tanker đứng chịu đòn bị động, mà là võ sĩ giác đấu chủ động trừng phạt kẻ tấn công.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:**
  - Khung thủ thế Parry của Brak chỉ kéo dài **0.75 giây** (`parryWindow: 0.75`). Nếu kẻ địch giả vờ nhử đòn (feint) hoặc chờ Brak giơ tay lên hết 0.75s, Brak sẽ rơi vào khoảng thời gian hồi chiêu 8–12s không thể phản kích.
  - Tầm đánh của Brak hoàn toàn là cận chiến (`range: 1.8m`), chiêu Q đấm thẳng 5.5m; các tướng tầm xa có thể giữ cự ly ngoài tầm đấm để thả diều an toàn.
  - Chiêu R lao tới 6.0m có độ trễ delay 0.3s và windup 0.2s; nạn nhân hoàn toàn đủ thời gian phản xạ bấm Universal Dash (D) thoát hiểm.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: Q (Piston Trực Quyền — đấm xuyên phá), RMB/W (Nghênh Kích Thủ Thế — parry giảm 60% dmg + phản kích), E (Địa Chấn Xung Kích — nện đất sóng quạt), R (Hơi Nước Bộc Phá — lao tới nện búa choáng 1.0s).
- Đánh thường cận chiến đấm tay (`range: 1.8m`). Universal Dash (D) giữ nguyên độc lập.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Thủ thế đỡ đòn Piston & Đấm phản kích (Rhythm Parry Piston & Counter Punch)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Kích hoạt RMB đặt `brak.parryUntil = W.t + 0.75`.
  - Trong hàm `hurt()`: Nếu Brak nhận sát thương trong lúc còn parry, giảm 60% sát thương nhận vào, tự động phản ngược sát thương lên kẻ tấn công (+35% bonus ratio) kèm làm choáng 0.5s, xóa cờ `parryUntil` (chỉ phản đòn 1 lần/lượt), ghi nhận `passive:parry_piston_proc = 1`.
  - Dòng 69–91 (`tools/test/wave2-gameplay-toys.test.mjs`): Xác nhận sát thương nhận giảm <100, máu mục tiêu bị trừ, cờ proc = 1 và parryUntil được tiêu thụ.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave2-gameplay-toys.test.mjs` chạy PASS bài test `Toy 3: Brak rhythm parry piston damage reduction & counter punch` [0.22ms].

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Đấu Sĩ Phản Đòn
- **Chiến dịch:** `reports/sim/production26/2026-10-12T07-21-06-914Z/` (`brak`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 144.
- **Phân tích chỉ số:**
  - Tỉ lệ thắng 1v1 trung bình: Phút 3 (29.5%), Phút 6 (39.7%), Phút 10 (40.5%), Phút 15 (38.8%), Phút 20 (31.2%), Full build (42.5%).
  - Khắc chế tốt các đấu sĩ/sát thủ vật lý cận chiến (Vạn Đao 50–93%, Bạch Diện 50–100%, Mặc Liên 100%).
  - Điểm yếu rõ ràng trước pháp sư/xạ thủ thả diều (Hỏa Tùy, Kha Tấn).
  - **Tỉ lệ thắng 2v2 rất cao:** Đạt **62.1%** ($n=91$, CI95: 51.8% – 71.4%).
  - **Thời gian chịu trụ:** 24.5 giây (độ trâu top 3 Wave 2).

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig) & Mô hình:** Biped cơ bắp thợ máy/giác đấu, hai cánh tay có cụm giáp cơ khí piston nối với lưng. Polycount $\le 13,500$ tris.
- **Shader & VFX Performance:**
  - Hiệu ứng hơi nước xả phụt từ piston khi phản đòn (steam puff) cần sử dụng flipbook particle nhẹ, tránh tạo overdraw dày đặc trên màn hình điện thoại.
  - Khi bật RMB thủ thế, hai tay chụm lại phát ra tia lửa kim loại (deflect spark) báo hiệu rõ ràng trạng thái đỡ đòn.
- **Chi phí & Gate 4:** Zero credit phát sinh trước Gate 4.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W2-BK-001** | **MAJOR** | Audit 2 (Balance / Sim Bot) | Tỉ lệ duel phút 3 thấp (29.5%) do bot AI trong sim kích hoạt RMB ngẫu nhiên theo cooldown timer thay vì phản xạ reactive chặn khi đối phương tung đòn đánh, làm lãng phí khung parryWindow 0.75s. | Bổ sung logic `ReactiveParryTrigger` trong bot simulator để bot chỉ kích hoạt RMB khi đối thủ bắt đầu animation tấn công. | `OPEN` |
| **DEF-W2-BK-002** | **MINOR** | Audit 1 (Feedback Design) | Phản đòn Piston cần tín hiệu âm thanh nghe cực đanh (tiếng "Clang" kim loại va chạm lớn kèm tiếng xả khí nén) để cả người chơi lẫn đối thủ nhận diện tức thì cú phản đòn. | Sound Designer cần chuẩn bị sample SFX phản đòn cơ khí độ tương phản cao tại Gate 5. | `OPEN` |
| **DEF-W2-BK-003** | **MINOR** | Audit 3 (Visual Identity) | Brak và Forge đều thuộc trường phái cơ khí hơi nước/đồng đỏ; cần đảm bảo vũ khí nẹp tay piston của Brak phân biệt rõ với chiếc búa lò nung khổng lồ của Forge. | Art Direction cần khóa vũ khí của Brak là Song Nẹp Tay Piston (Gauntlets), không trang bị vũ khí cầm tay dạng búa. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 & AUDIT 2 — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Brak (#02) là hình mẫu đấu sĩ phản đòn cơ giới đầm tay: cơ chế parry độc đáo mang lại tính đối kháng kỹ năng cao, tỉ lệ 2v2 xuất sắc (62.1%) và độ bền bỉ cao. Hồ sơ sẵn sàng trình Owner ký phê duyệt Gate 4.
