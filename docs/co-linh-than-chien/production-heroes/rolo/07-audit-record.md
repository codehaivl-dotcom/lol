# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #36 ROLO

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Rolo (#36) — Runtime ID: `rolo`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [104 — Master Plan](../104-full-approved-roster-production-master-plan.md), [96 — Top 15 Concept Bibles](../96-roster-v5-top15-concept-bibles.md), [105 — Multi-Agent Workflow](../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../91-khoa-input-qwer-d.md), [73 — Balance Lab](../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Tê Tê Khiên bọc vảy chuyển dạng công thủ chuẩn Doc 96 [10]; khóa ID độc bản #36. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy `scale_shedding` pass unit test thực tế (base armor +35 -> cast RMB tháo vảy -25 armor penalty, +20% MS, +25% AS -> expiry hoàn giáp). 145 cờ Orange cần review tiếp. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W2-RL-001` (Major: Bot shed timing), `DEF-W2-RL-002` (Minor: Scale detach morph target), `DEF-W2-RL-003` (Minor: Registry ID lock). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Đấu sĩ chuyển dạng độc đáo; kiểm soát nghiêm ngặt; giữ Gate 4 chờ Owner ký duyệt.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 104 & Phân Định Mã ID Độc Bản
- **Fantasy cốt lõi:** *"Tê Tê Khiên — Đấu sĩ người tê tê mang bộ vảy sừng phòng ngự kiên cố. Cơ chế chuyển dạng độc đáo: Ở Dạng Bọc Thép (+35 Giáp/Kháng phép thụ động); khi kích hoạt RMB Tháo Vảy, bung toàn bộ vảy sừng thành Dạng Cuồng Nộ (-25 Giáp, +20% Tốc chạy, +25% Tốc đánh) trong 5s để càn quét truy đuổi."* (Doc 96 [10], Doc 104).
- **Khẳng định phân định ID:** Rolo được khóa chính thức mã số **#36** (Runtime ID: `rolo`). Tuyệt đối không nhầm lẫn với Oneira (đã cấp mã độc bản **#48** theo Doc 104).
- **Trải nghiệm chiến đấu trực quan:**
  - Cảm giác "tự tin che chắn" khi ở dạng bọc thép với lượng giáp dày đặc, sau đó là cảm giác hưng phấn bùng nổ khi bung vảy lao vào cào xé mục tiêu trong dạng cuồng chiến.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:**
  - Khi thấy Rolo bung vảy sừng (hiệu ứng các phiến vảy bung xòe kèm âm thanh rôm rốp), nạn nhân biết rằng Rolo vừa tự giảm **25 Giáp** của bản thân trong 5 giây.
  - Đây chính là "cửa sổ cơ hội vàng" (vulnerability window): Nếu đối phương có nguồn sát thương vật lý dồn dame lớn, hãy tập trung hỏa lực bắn hạ Rolo ngay trong 5 giây này.
  - Chiêu Q quất đuôi bắn vảy có tầm 6.5m và chiêu R lao tới 6.5m có delay 0.3s; nạn nhân có thể dùng Universal Dash (D) để né tránh cú húc làm choáng.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: Q (Bộc Phá Vảy Sừng — quất đuôi bắn vảy làm chậm), RMB/W (Tháo Vảy Cuồng Nộ — tạo khiên và chuyển sang thế công), E (Địa Chấn Tê Tê — dập đuôi làm chậm 35%), R (Thiết Giáp Càn Quét — bọc vảy lao tới choáng 0.9s).
- Đánh thường cận chiến vuốt móng sắc (`range: 1.8m`). Nút D (Universal Dash) giữ nguyên độc lập.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Tháo vảy chuyển dạng công thủ (Scale Shedding Defense and Burst Transition)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Khai báo passive `scale_shedding`: `baseResistBonus: 35`, `shedDuration: 5.0`, `shedResistPenalty: 25`, `shedSpeedBonus: 0.20`, `shedAspdBonus: 0.25`.
  - Khi RMB được kích hoạt: Tăng khiên trong 2.5s, kích hoạt trạng thái tháo vảy trong 5s.
  - Dòng 119–126 (`tools/test/wave2-gameplay-toys.test.mjs`): Xác nhận thông số chuyển dạng vảy sừng chính xác theo hợp đồng kỹ thuật.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave2-gameplay-toys.test.mjs` chạy PASS bài test `Toy 6: Rolo scale shedding defense and burst transition` [0.03ms].

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Đấu Sĩ Chuyển Dạng
- **Chiến dịch:** `reports/sim/production26/2026-10-12T07-21-06-914Z/` (`rolo`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 145.
- **Phân tích chỉ số:**
  - Tỉ lệ thắng 1v1 trung bình: Phút 3 (50.0%), Phút 6 (55.8%), Phút 10 (50.4%), Phút 15 (37.5%), Phút 20 (37.4%), Full build (62.2%).
  - Giai đoạn đầu và cuối trận cực kỳ ổn định, áp đảo hoàn toàn các tướng cận chiến (Vạn Đao 74–100%, Bạch Diện 50–100%, Mặc Liên 100%).
  - Điểm yếu trước pháp sư Hỏa Tùy (0% winrate) do kháng phép không đủ bù đắp sát thương dồn diện rộng.
  - **Tỉ lệ thắng 2v2:** Đạt **57.1%** ($n=91$, CI95: 46.9% – 66.8%).
  - **Thời gian chịu trụ:** 26.9 giây (trâu thứ hai toàn bộ dự án, chỉ sau Forge 30.5s).

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig) & Mô hình:** Thân hình thú nhân tê tê (Pangolin biped), mai lưng bọc vảy sừng xếp lớp, đuôi to bản chuyển động dập đập. Polycount $\le 13,000$ tris.
- **Shader & Cơ chế hiển thị Tháo Vảy (Scale Shedding):**
  - Để thể hiện trạng thái tháo vảy trên mobile URP: Khuyến nghị dùng **Morph Target (Blendshape)** làm các phiến vảy trên lưng dựng đứng và bung xòe ra, kết hợp 1 hiệu ứng particle bắn vài mảnh vảy bay ra xung quanh, thay vì thay thế toàn bộ mesh phức tạp.
  - Màu sắc mai vảy chuyển từ xám thép sang ánh đỏ cuồng nộ bằng kênh Color Tint nhẹ.
- **Chi phí & Gate 4:** Zero credit phát sinh trước Gate 4.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W2-RL-001** | **MAJOR** | Audit 2 (Balance / Bot AI) | Tỉ lệ duel phút 15-20 sụt giảm xuống 37.5% do bot simulator tự động bấm RMB kích hoạt tháo vảy ngay khi hết cooldown, khiến Rolo tự trừ 25 giáp đúng lúc đối phương đang có lợi thế dồn combo sát thương vật lý. | Bổ sung điều kiện trong AI bot: chỉ kích hoạt Tháo Vảy khi máu bản thân $> 40\%$ và mục tiêu đang trong tầm truy đuổi. | `OPEN` |
| **DEF-W2-RL-002** | **MINOR** | Audit 3 (Art / Tech Art) | Cần thống nhất giải pháp thể hiện trạng thái Tháo Vảy (Blendshape vảy bung vs Sub-mesh Detach) để đảm bảo không vượt quá ngân sách draw call trên GPU di động. | Tech Art cần lập Asset Spec xác định giải pháp Blendshape tại Gate 5. | `OPEN` |
| **DEF-W2-RL-003** | **MINOR** | Audit 1 (Data Governance) | Trong các tài liệu lịch sử cũ từng có nhầm lẫn mã #36 giữa Rolo và Oneira; cần bảo đảm trong toàn bộ registry và engine chỉ gắn ID #36 duy nhất cho Rolo. | Khóa chết ID #36 cho `rolo` và ID #48 cho `oneira` trong `production-26-roster.json` (đã xác nhận). | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 — FLAG_REVIEW TẠI AUDIT 2 (red: 0, 145 orange) — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Rolo (#36) là một Đấu sĩ chuyển dạng độc đáo, sở hữu độ trâu bò chịu trụ đứng thứ 2 toàn dự án (26.9s) và tỉ lệ 2v2 cao (57.1%). Đã phân định độc bản hoàn toàn mã ID #36. Hồ sơ sẵn sàng trình Owner ký phê duyệt Gate 4 sau khi có bằng chứng kiểm thử thực tế.
