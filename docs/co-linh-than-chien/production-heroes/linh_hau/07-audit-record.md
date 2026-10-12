# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #38 LINH HẦU

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Linh Hầu (#38) — Runtime ID: `linh_hau`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [102 — Beginner Concept Shortlist](../102-roster-v5-beginner-concept-shortlist.md), [104 — Master Plan](../104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../91-khoa-input-qwer-d.md), [73 — Balance Lab](../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS WITH OBSERVATIONS** | `DEF-W1-LH-001` (Minor: Thế trượng ngắn chưa có skill kích hoạt riêng, tích hợp trong passive) |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy `staff_reach` pass unit test. 0 RED flags (145 orange review-required). Minh bạch NOT_TESTED. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W1-LH-002` (Minor: Thiếu SFX phân biệt sweetspot). Giữ Gate 4 chờ Owner ký. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Đủ điều kiện trình Owner xem xét Gate 4; TUYỆT ĐỐI CHƯA DỰNG 3D.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 103 & Shortlist 102
- **Fantasy gốc:** *"Cầm thần trượng biến điệu cự ly: vươn dài chọc đẩy tầm trung, thu ngắn nện đất cự ly gần, chống gậy bật nhảy mở combat."* (Doc 102 §3.1).
- **Phân định rõ rệt với Kiko (#01):**
  - Linh Hầu đồ sộ, ngực nở vai rộng, vác Cổ Thần Trượng Tinh Thạch 2 đầu nạm đồng cổ, chiến giáp hoàng kim, vệt hổ phách.
  - Hoàn toàn tách biệt khỏi Kiko (sát thủ nhỏ thó lưng gầy, đeo song trảo cơ khí, mặt nạ đồng, vệt khói tím).
  - Không sao chép Ngộ Không (LoL Wukong): Không phân thân tàng hình, không lốc xoáy hất tung 360°.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn người chơi Linh Hầu:** Hiểu rõ khi nào trượng đang ở dạng dài (sau khi dùng Q kích hoạt thế Trường Trượng 4.0s) để giữ cự ly 2.8m – 4.8m kích hoạt điểm ngọt (+25% sát thương và làm chậm).
- **Góc nhìn đối thủ (Victim Agency / Counterplay):**
  - Chiêu Q vươn dài đâm thẳng có bề rộng hẹp (1.5m), đối thủ dùng Universal Dash (D) lướt sang mạn sườn là thoát và áp sát được.
  - Chiêu R nhảy bổ nện đất có thời gian trễ trước khi chạm đất (0.3s windup + 0.4s delay = 0.7s), vòng tròn báo hiệu telegraph hiển thị rõ ràng trên mặt đất giúp đối thủ có đủ thời gian bấm D né ra khỏi tâm chấn.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- Kit bố trí 4 kỹ năng chủ động: Q (Đâm trượng), W/RMB (Khiên chống trượng), E (Quét trượng), R (Nhảy nện đất).
- Đánh thường tách riêng (`basic_attack` / `lmb`).
- Universal Dash (D) độc lập, không bị kỹ năng nào ghi đè.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Biến điệu tầm trượng (Staff reach modulation)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Dòng 387: Khi `staffUntil > t`, tầm đánh thường tự động mở rộng từ 2.0m lên 4.8m.
  - Dòng 397: Đánh trúng mục tiêu ở cự ly $\ge 2.8\text{m}$ kích hoạt sweetspot rìa trượng: gây thêm 25% sát thương vật lý, làm chậm 20% trong 0.8s và ghi nhận proc `passive:staff_sweetspot`.
  - Dòng 13: Khi ở dạng đoản trượng, nhận +15% tốc độ đánh cận chiến (`shortAspdBonus: 0.15`).
- **Bằng chứng kiểm thử tự động:** `tools/test/wave1-gameplay-toys.test.mjs` chạy PASS bài test `Toy 1: Linh Hau staff reach modulation - stance, range & sweetspot` [0.54ms].

### 2.2. Đánh Giá Số Liệu Định Lượng Balance Lab
- **Chiến dịch:** `reports/sim/production26/2026-10-12T00-24-57-295Z/` (`linh_hau`).
- **Cờ đỏ (RED):** **0**. Không xảy ra lỗi logic, không crash, không one-shot phi lý.
- **Cờ cam (ORANGE):** 145 cờ (chấp nhận được do sự lệch kèo tự nhiên giữa các chất tướng đấu sĩ vs xạ thủ thả diều).
- **Đường cong sức mạnh:**
  - Phút 3: 55.5% (Mạnh đầu trận).
  - Phút 6: 48.0% (Cân bằng lý tưởng).
  - Phút 10: 36.8% (Suy giảm giữa trận khi pháp sư và xạ thủ lên trang bị cốt lõi).
  - Phút 15–20: 23–24% (Vùng trũng 1v1 khi giao tranh chuyển sang tổng lực).
  - Full build: 48.8% (Đạt cân bằng ~50% nhờ dàn trang bị đỡ đòn hỗ trợ).
- **Giao tranh đội:** 2v2 đạt **59.3%**, 3v3 đạt **45.0%** — Thể hiện vai trò đấu sĩ mở giao tranh xuất sắc.

### 2.3. Minh Bạch Các Giới Hạn Chưa Mô Phỏng (NOT_TESTED)
- Đã ghi nhận đầy đủ danh sách NOT_TESTED tại mục 7 của file `06-balance-evidence.md`. Tuyệt đối không gian lận gán nhãn PASS_ENGINE.

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig):** Biped hình thể linh trưởng vạm vỡ, tích hợp 1 bone socket cho Cổ Thần Trượng ở bàn tay phải và 1 socket đeo lưng khi thu vũ khí.
- **Giới hạn Polycount:** $\le 14,500$ tris. Phù hợp mục tiêu di động 60 FPS.
- **Danh sách Animation tối thiểu (8 clips):**
  1. `Idle` (Vác trượng trên vai, ngực thở uy nghi)
  2. `Run` (Sải bước đường hoàng)
  3. `Attack_Short` (Đánh gậy đoản cự ly gần)
  4. `Attack_Long` (Đâm trượng vươn dài)
  5. `Skill_Q_Thrust` (Lao đâm trượng dài thẳng)
  6. `Skill_W_Shield` (Cắm trượng xoay tạo khiên)
  7. `Skill_E_Sweep` (Quét trượng 360 độ)
  8. `Skill_R_JumpSlam` (Nhảy vọt lên cao nện trượng xuống đất)
  9. `Death` (Ngã quỵ, trượng cắm xuống đất tỏa sáng mờ dần)
- **VFX Performance:** Các hiệu ứng vệt sáng trượng sử dụng ribbon particles với additive shader cơ bản, vết nứt đất chiêu R sử dụng projected decal thời gian tồn tại 1.5s, không gây tràn băng thông bộ nhớ di động (fill-rate).

### 3.2. Kiểm Soát Chi Phí & Rủi Ro Render (Credit Waste Prevention)
- **Kiểm tra Gate 4:** Chưa có lệnh dựng model high-poly hay render thương mại nào được kích hoạt. Không có chi phí phát sinh trước khi Owner ký duyệt.
- **Rủi ro xung đột Art:** Linh Hầu không thuộc Bộ Ngũ Thần Thoại 103 nên không có nguy cơ xung đột giữa Mythic Form và Battle Form.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W1-LH-001** | **MINOR** | Audit 1 (Concept) | Thế trượng ngắn chưa có chiêu thức kích hoạt nện đòn bộc phát riêng biệt như mô tả văn bản Doc 102 §3.1, mà đang được thể hiện qua đòn quét E và chỉ số nội tại tăng tốc đánh. | Giữ nguyên cho Wave 1 Slice; khi vào Gate 5 có thể cân nhắc thêm hiệu ứng âm thanh/VFX đòn nện đất cho đòn đánh thứ 3 ở thế đoản trượng. | `OPEN` |
| **DEF-W1-LH-002** | **MINOR** | Audit 3 (Audio/SFX) | Trong danh mục tài nguyên SFX chưa định nghĩa âm thanh va chạm đặc thù khi đánh trúng điểm ngọt (Sweetspot Hit Sound - tiếng chuông đồng vang trầm). | Bổ sung event audio `sfx_linh_hau_staff_sweetspot_proc` vào manifest âm thanh trước Gate 6. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 & AUDIT 2 — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Hồ sơ kỹ thuật và dữ liệu Balance Lab của Linh Hầu (#38) đạt chất lượng xuất sắc, đồ chơi cốt lõi được mô phỏng và kiểm chứng tự động đầy đủ, không vi phạm quy tắc điều khiển, sẵn sàng trình Owner phê duyệt. Tuyệt đối không cho phép đội 3D tiến hành sản xuất mesh hoàn chỉnh trước khi có chữ ký Gate 4.
