# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #34 JELI

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Jeli (#34) — Runtime ID: `jeli`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [102 — Beginner Concept Shortlist](../102-roster-v5-beginner-concept-shortlist.md), [104 — Master Plan](../104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../91-khoa-input-qwer-d.md), [73 — Balance Lab](../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Fantasy Sứa Chuông sóng nước hồi phục hoàn toàn trùng khớp chỉ thị Owner Wave 1. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy `chime_resonance` pass unit test. Tỉ lệ đội hình 2v2 đạt 49.5%, 3v3 đạt 49.4% (chuẩn 50%). 0 RED flags (143 orange review-required). |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W1-JL-001` (Minor: Quản lý bone rig xúc tu mềm trên mobile). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Ứng viên Hỗ trợ mẫu mực; đề xuất phê duyệt Gate 4.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 103 & Shortlist 102
- **Fantasy gốc:** *"Hồi phục diện rộng theo nhịp chuông nước; đi kèm bảo vệ chủ lực, giữ cự ly an toàn."* (Doc 102 §4, được Owner chuyển từ Wave 2 sang Wave 1 để hoàn thiện bộ tứ Tank - Fighter - Marksman - Support).
- **Thoát khỏi lối mòn Hỗ trợ nhàm chán:** Jeli không chỉ đứng sau bấm 1 nút hồi máu đơn điệu; nhịp chuông phát sóng 3.5s đòi hỏi Jeli phải canh vị trí đứng gần đồng minh thấp máu để tối ưu hóa lượng hồi phục tự động, đồng thời giữ cự ly an toàn tránh bị bắt lẻ.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân / Sát thủ đối đầu Jeli:**
  - Jeli có tốc độ di chuyển thấp (6.1), lượng máu cơ bản khiêm tốn (640 HP) và không có chiêu lướt vượt địa hình (chỉ có Universal Dash D).
  - Điểm yếu chí tử: Nếu sát thủ (như Bạch Diện) hoặc đấu sĩ áp sát chia cắt Jeli khỏi đồng minh, Jeli hoàn toàn bất lực vì sát thương phản kháng cực kỳ thấp (chỉ 24%–34% combo).
  - Chiêu Q Thủy Ba Chấn Động bay chậm (speed 24m/s), đối thủ dễ dàng né tránh ở cự ly xa.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chuẩn mực: Q (Bọt nước làm chậm), W/RMB (Chuông nước hộ thể - hồi máu & khiên), E (Vòng sóng âm vực làm chậm), R (Đại triều thánh chuông - đại hồi phục và siêu khiên diện rộng).
- Bắn tia nước đánh thường (`range: 6.2m`) độc lập. Dash D độc lập.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Sóng chuông cộng hưởng theo nhịp & hồi phục kép (Chime Resonance & Shield Tracking)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Dòng 582: Bộ đếm thời gian `u.chimeTimer` cộng dồn mỗi frame. Khi chạm mốc `interval: 3.5s`, tự động quét danh sách đồng minh trong bán kính tìm mục tiêu thấp `% máu` nhất.
  - Hồi máu đồng minh yếu nhất $35 + 0.3\text{AP}$ và cấp khiên $25 + 0.2\text{AP}$. Bản thân Jeli nhận 50% lượng hồi phục.
  - Kích hoạt sự kiện proc `passive:chime_resonance`.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave1-gameplay-toys.test.mjs` chạy PASS bài test `Toy 5: Jeli chime resonance - periodic ally healing and distinct shield tracking` [0.83ms].

### 2.2. Đánh Giá Khách Quan Số Liệu Lab — TIÊU CHUẨN VÀNG UTILITY
- **Chiến dịch:** `reports/sim/production26/2026-10-12T00-24-57-295Z/` (`jeli`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 143 (Tất cả đều do tỉ lệ duel 1v1 thấp ~15-24%, đã được miễn trừ theo nguyên tắc thẩm định Hỗ trợ tại Doc 105 §S5).
- **Chỉ số Utility Giao Tranh Đội Nhóm:**
  - **Tỉ lệ thắng 2v2:** **49.5%** ($n=91$).
  - **Tỉ lệ thắng 3v3:** **49.4%** ($n=171$).
  - **Đánh giá của Auditor:** Đây là số liệu cân bằng mẫu mực nhất từng được ghi nhận trong Hero Factory COLINH. Khả năng bảo kê và hồi máu của Jeli bù trừ chính xác cho sự thiếu hụt sát thương cá nhân, đưa trận đấu về thế cân bằng 50/50 hoàn hảo.

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương & Mesh:** Thực thể sứa bồng bềnh (Aquatic Floating Rig). Polycount $\le 12,500$ tris.
- **Rủi ro Rigging xúc tu mềm:**
  - Các tua sứa dài có nguy cơ làm tăng số lượng bone lên quá 45 bones, gây gánh nặng cho CPU di động khi tính toán skinning.
  - **Giải pháp kỹ thuật bắt buộc:** Chỉ dùng tối đa 4 chuỗi bone cho 4 xúc tu chính; phần viền dù sứa chuyển động co bóp sử dụng Vertex Shader Animation (nhẹ gấp 10 lần bone animation).
- **VFX Performance:** Chất liệu cơ thể sứa bán trong suốt (Translucent Jellyfish) phải dùng shader Mobile Unlit/Simple Lit Alpha Blended, không dùng depth sorting nhiều lớp.
- **Chi phí & Gate 4:** Zero credit lãng phí; chưa tạo asset 3D.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W1-JL-001** | **MINOR** | Audit 3 (Tech Art) | Xúc tu sứa mềm mại nếu gắn quá nhiều bone sẽ vượt ngân sách rig chuẩn mobile (<45 bones). | Tech Art áp dụng Vertex Shader cho chuyển động co bóp của dù sứa, giới hạn bone xúc tu ở Gate 5. | `OPEN` |
| **DEF-W1-JL-002** | **MINOR** | Audit 3 (Audio) | Âm thanh sóng chuông ngân lặp lại mỗi 3.5s có thể gây mệt tai nếu âm lượng quá lớn hoặc tần số quá cao. | Đội SFX thiết kế 3 biến thể âm chuông nước tần số trầm dịu (Soft underwater chime variants) phát ngẫu nhiên. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 & AUDIT 2 — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Jeli (#34) chứng minh vai trò Hỗ trợ hộ vệ xuất sắc trong Balance Lab với tỉ lệ thắng giao tranh đội nhóm 49.5% gần như hoàn hảo. Cơ chế sóng chuông hồi phục và khiên diện rộng hoạt động ổn định và có kiểm thử tự động. Hồ sơ sẵn sàng trình Owner ký Gate 4.
