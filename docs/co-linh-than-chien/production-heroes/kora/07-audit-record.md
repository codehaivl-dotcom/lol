# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #32 KORA

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Kora (#32) — Runtime ID: `kora`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [100 — Roster V5 Round 4 Selection](../../100-roster-v5-round4-selection-rivalry-audit.md), [102 — Beginner Concept Shortlist](../../102-roster-v5-beginner-concept-shortlist.md), [103 — Mythic Quintet Concept Bible](../../103-mythic-quintet-concept-bible.md), [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](../../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../../91-khoa-input-qwer-d.md), [73 — Balance Lab](../../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Bám sát 100% canon nguồn [Doc 100 §2 (Kora #32 Hải Mẫu Cổ Giáp)](../100-roster-v5-round4-selection-rivalry-audit.md); giữ trọn vẹn 3 điều bắt buộc giữ; không bị rập khuôn hay lai tạp dị thể ngoài phê duyệt. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy *Đỡ đòn càng thép cửa đập (Directional Sluice Shield 60% Front Reduction)* thực thi thực tế trong `engine.mjs` và đạt PASS trên unit test. Không có cờ đỏ. Ghi nhận 130 cờ cam cần theo dõi. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | Ghi nhận Defect Log (`DEF-W3-KR-001`, `DEF-W3-KR-002`); xác định target engine là **Spawn runtime** (không phụ thuộc Unity). Giữ Gate 4 chờ Owner ký duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Hồ sơ chuyên môn hoàn tất 100%; giữ nghiêm ngặt trạng thái chờ Owner ký duyệt Gate 4 trước khi chi trả credit 3D.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible & Lựa Chọn Phê Duyệt
- **Fantasy cốt lõi:** Cua cổ sinh khổng lồ mang mai đá san hô và cặp càng thép bản lớn ghép thành cửa đập thủy lực, chặn đứng 60% sát thương đạn đạo phía trước.
- **Độ trung thực:** Hồ sơ 00, 01, 02 và 03 tuân thủ nghiêm ngặt chỉ đạo của Owner và tài liệu gốc. Không có sự pha trộn trái phép phong cách giả tưởng phương Tây hay anime làm mất chất Cổ Linh.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:** Đối thủ luôn có cửa sổ phản ứng rõ ràng (telegraph âm thanh, vệt chỉ thị kỹ năng, thời gian niệm hoặc quỹ đạo bay). Nạn nhân có thể sử dụng Universal Dash (D) hoặc định vị chiến thuật để né tránh hoặc trừng phạt.
- Không có cơ chế tàng hình vĩnh viễn, không thể chọn làm mục tiêu vô lý, hay câm lặng thụ động gây ức chế.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: **Q, W, E, R** (trong đó W kế thừa từ quy ước migration của RMB trong YAML cũ, R là Ultimate).
- Phím **D** độc lập tuyệt đối dành cho Universal Dash. Đòn đánh cơ bản tách biệt hoàn toàn.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Đỡ đòn càng thép cửa đập (Directional Sluice Shield 60% Front Reduction)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):** Đã hiện thực hóa bằng mã nguồn thực tế, không dùng comment giữ chỗ.
- **Bằng chứng kiểm thử tự động:** Bài test `Toy 5: Kora directional shield damage mitigation` trong `tools/test/wave3-gameplay-toys.test.mjs` đạt **PASS** với đầy đủ chuỗi kiểm tra vòng đời (kích hoạt $\rightarrow$ tác động $\rightarrow$ hết hạn).

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Balance Lab
- **Chiến dịch mô phỏng:** `reports/sim/production26/2026-10-12T08-15-08-077Z/` (`kora`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** **130**.
- **Kết luận Audit 2:** Đạt chuẩn `FLAG_REVIEW (red: 0)`. Tỷ lệ thắng 1v1 phản ánh đúng đặc tính lớp nhân vật `sluice_tank`; giá trị đóng góp thực chiến thể hiện qua giao tranh phối hợp 2v2 và 3v3.

---

## 3. CHI TIẾT AUDIT 3 — SẢN XUẤT 3D, RIG, VFX & DEFECT LOG (S7)

### 3.1. Phân Tích Tính Khả Thi Trên Pipeline AI Production & Spawn Runtime
- **Target Engine:** **Spawn runtime** độc lập (loại bỏ hoàn toàn giả định Unity cũ).
- **Body Plan & Rigging:** Đã định nghĩa thông số capsule, body plan và danh mục animation clip tương thích trong file `08-asset-production.md`.
- **Rủi ro chi phí:** Nghiêm cấm xuất model 3D trả phí hoặc sinh texture AI hàng loạt trước khi có phê duyệt Gate 4 bằng văn bản từ Owner.

### 3.2. Sổ Theo Dõi Lỗi Sản Xuất (Production Defect Log)

| Mã Defect | Mức Độ | Mô Tả Vấn Đề | Yêu Cầu Khắc Phục & Tiêu Chí Đóng | Trạng Thái |
|---|:---:|---|---|:---:|
| `DEF-W3-KR-001` | **MAJOR** | Góc chắn đạn đạo directional shield: Cần đồng bộ góc chắn 180 độ phía trước với hướng quay mặt của model cua trên Spawn client. | Tính toán dot product giữa forward vector của Kora và hướng bay của projectile. | **OPEN (TRACKED)** |
| `DEF-W3-KR-002` | **MINOR** | Rigging 6 chân bò ngang: Cần bảo đảm chân cua di chuyển tự nhiên theo địa hình mà không bị trượt chân (foot sliding). | Sử dụng Procedural Foot IK 6 chân trên Spawn runtime controller. | **OPEN (TRACKED)** |

---

## 4. QUYẾT ĐỊNH CỔNG CHẤT LƯỢNG (GATE DECISION)

- **Gate 1 (Concept & Canon):** **PASS** (Đã khóa nguồn tại hồ sơ 00).
- **Gate 2 (Kit Contract & Input 91):** **PASS** (QWER+D hoàn chỉnh tại hồ sơ 03).
- **Gate 3 (Candidate Lab & Mechanics):** **FLAG_REVIEW (red: 0)** (Mô phỏng hoàn tất, không có cờ đỏ).
- **Gate 4 (Owner Sign-off for 3D Production):** **HOLD (CHỜ OWNER KÝ DUYỆT)**.

*Chữ ký xác nhận: Independent Quality Auditor — Hero Factory COLINH*
