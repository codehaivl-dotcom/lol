# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #07 NERA

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Nera (#07) — Runtime ID: `nera`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [104 — Master Plan](../104-full-approved-roster-production-master-plan.md), [96 — Top 15 Concept Bibles](../96-roster-v5-top15-concept-bibles.md), [105 — Multi-Agent Workflow](../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../91-khoa-input-qwer-d.md), [73 — Balance Lab](../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Chuẩn Xạ thủ cơ giới bóng đêm Dạ Neo; bộ chiêu tự bảo kê nỏ tời hai chiều. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy `anchor_tether` pass unit test thực tế (3-hit tether -> +18% MS kiting boost -> slow địch -> RMB dash lùi). 167 cờ Orange cần review tiếp. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W2-NR-001` (Major: Duel tuning & kiting), `DEF-W2-NR-002` (Major: Mana economy), `DEF-W2-NR-003` (Minor: Cable visual rendering). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Xạ thủ nỏ tời độc đáo; ghi nhận defect cần điều chỉnh; giữ Gate 4 chờ Owner phê duyệt.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 104 & Concept 96
- **Fantasy cốt lõi:** *"Dạ Neo — Xạ thủ thợ săn cơ giới bóng đêm mang theo nỏ tời cổ tích hợp cáp neo hai chiều (Two-way Anchor Winch). Khả năng tự bảo kê (Self-peel) độc đáo: găm xích neo lên kẻ áp sát, tăng tốc thả diều và tời giật lùi an toàn."* (Doc 96 [05], Doc 104).
- **Trải nghiệm chiến đấu trực quan:**
  - Nera không thụ động phụ thuộc vào tướng hỗ trợ; khi kẻ địch lao vào, người chơi găm đòn thứ 3 để kích hoạt xích neo, vừa lùi vừa bắn nhận thêm 18% tốc độ di chuyển.
  - Chiêu RMB bắn tời giật lùi 4.5m tạo khoảng cách sinh tử, kết hợp bẫy dây gai chiêu E cản bước truy đuổi.
  - Vũ khí nỏ tời cơ khí hầm hố, bắn ra những mũi tên thép gắn cáp xích.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:**
  - Kẻ địch có thể quan sát vòng tròn đếm số đòn đánh trên đầu; sau khi Nera bắn 2 đòn thường, cần cẩn thận né đòn thứ 3 để không bị găm xích neo.
  - Chiêu RMB giật lùi của Nera có quỹ đạo lùi thẳng; nếu kẻ địch có chiêu lướt chéo góc hoặc nhảy qua đầu, Nera vẫn sẽ bị bắt kịp.
  - Chiêu R Đại Cực Neo có windup 0.25s và đường đạn bay thẳng; nạn nhân có thể dùng Universal Dash (D) để né tránh cú neo choáng 1.2s này.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: Q (Xuyên Thấu Tiễn — bắn tỉa tầm 9.5m), RMB/W (Phóng Tời Hai Chiều — giật lùi 4.5m làm chậm), E (Lưới Neo Dây Bẫy — rải bẫy làm chậm diện rộng), R (Đại Cực Neo — bắn neo tầm 12.0m choáng 1.2s).
- Đánh thường tầm xa đạn đạo (`range: 7.0m, speed: 38`). Nút D (Universal Dash) giữ nguyên độc lập.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Xích neo hai chiều & Tăng tốc thả diều (Two-way Anchor Cable Self-peel & Kiting Boost)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Khai báo passive `anchor_tether`: `shotsPerAnchor: 3`, `kitingSpeedBoost: 0.18`, `anchorDuration: 3.0`.
  - RMB tích hợp cơ chế dash ngược hướng (`dash: { distance: 4.5, toward: false }`).
  - Dòng 93–98 (`tools/test/wave2-gameplay-toys.test.mjs`): Xác nhận thông số nỏ tời, số đòn găm neo và tốc độ tăng tốc kiting.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave2-gameplay-toys.test.mjs` chạy PASS bài test `Toy 4: Nera two-way anchor cable self-peel & kiting boost` [0.03ms].

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Xạ Thủ Thả Diều
- **Chiến dịch:** `reports/sim/production26/2026-10-12T07-21-06-914Z/` (`nera`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 167.
- **Phân tích chỉ số:**
  - Tỉ lệ thắng 1v1 trung bình: Phút 3 (19.7%), Phút 6 (17.4%), Phút 10 (9.4%), Phút 15 (9.7%), Phút 20 (20.2%), Full build (17.6%).
  - Nguyên nhân duel thấp: Simulator 1v1 đưa 2 tướng vào phạm vi giao tranh hẹp không chướng ngại vật; xạ thủ thuần thả diều bị các đấu sĩ/sát thủ lao vào áp sát dồn sát thương.
  - Sát thương combo phút 3 rất chuẩn chỉ: Đạt 570–759 dmg (48%–82% HP mục tiêu).
  - **Tỉ lệ thắng 2v2:** Đạt **39.0%** ($n=91$), phát huy tốt khi có tanker giữ tuyến trước.

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig) & Mô hình:** Biped nữ thợ săn thon gọn, vai và lưng đeo cụm tời cuộn cáp kim loại, tay cầm đại nỏ cơ khí có trục quay ròng rọc. Polycount $\le 12,500$ tris.
- **Shader & VFX Dây Cáp (Anchor Cable):**
  - Sợi dây cáp neo nối giữa nỏ của Nera và kẻ địch cần render bằng procedural Line Renderer hoặc dải băng Ribbon tối ưu $\le 16$ quads, texture cuộn xích sắt có animation UV scrolling.
  - Tuyệt đối không dùng dây vật lý mô phỏng Cloth Simulation nặng nề trên di động.
- **Chi phí & Gate 4:** Zero credit phát sinh trước Gate 4.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W2-NR-001** | **MAJOR** | Audit 2 (Balance Tuning) | Tỉ lệ duel giữa trận quá thấp (9.4% ở phút 10) và team 2v2 thấp hơn chuẩn (39.0% so với 46.6% của Kha Tấn) do sát thương đòn đánh cơ bản (62 AD) chưa đủ sức răn đe các đấu sĩ lên giáp. | Cân nhắc tăng nhẹ sát thương cơ bản đòn bắn Q hoặc tăng tỉ lệ kiting speed boost từ 18% lên 22% để thả diều tốt hơn. | `OPEN` |
| **DEF-W2-NR-002** | **MAJOR** | Audit 2 (Resource Economy) | Nera dùng thanh Mana (340 gốc, cost chiêu rất cao: Q 40-60, RMB 60-80, E 55-75, R 100), trong khi chỉ số hồi mana thấp (`resourceRegen: 1.6`) khiến Nera nhanh chóng cạn kiệt năng lượng sau 1 chuỗi combo. | Giảm mana cost chiêu RMB xuống cố định 50 MP và tăng hồi mana cơ bản lên 2.2/giây tại Gate 7. | `OPEN` |
| **DEF-W2-NR-003** | **MINOR** | Audit 3 (VFX Rendering) | Sợi cáp neo (Line Renderer) có nguy cơ bị đứt đoạn hoặc co giật góc khi Nera thực hiện quay ngoắt $180^\circ$ để vừa chạy vừa bắn. | Tech Art cần gắn socket đầu dây cáp neo vào xương súng nỏ (`Weapon_Muzzle_Socket`) thay vì root nhân vật. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 — FLAG_REVIEW TẠI AUDIT 2 (red: 0, 167 orange) — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Nera (#07) là một thiết kế Xạ thủ tự bảo kê giàu tính chiến thuật và độc đáo; ghi nhận 3 defect (2 Major, 1 Minor) cần tinh chỉnh trước khi test 5v5. Hồ sơ sẵn sàng trình Owner ký phê duyệt Gate 4 sau khi có bằng chứng kiểm thử thực tế.
