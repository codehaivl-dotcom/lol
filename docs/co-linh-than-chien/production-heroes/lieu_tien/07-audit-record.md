# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #40 LIỄU TIỄN

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Liễu Tiễn (#40) — Runtime ID: `lieu_tien`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [102 — Beginner Concept Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md), [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/91-khoa-input-qwer-d.md), [73 — Balance Lab](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Vệt băng tự động dệt khi lùi bước đúng chỉ thị Owner Doc 102 §3.3. Không phá vỡ navigation. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **PASS_LAB** | Core toy `frost_trail` pass unit test. 0 RED flags. Đường cong tăng tiến Xạ thủ chuẩn mực. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W1-LT-001` (Minor: Quản lý decal vệt băng trên mobile). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Đạt chuẩn thẩm định kỹ thuật; giữ Gate 4 chờ lệnh sản xuất 3D.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 103 & Shortlist 102
- **Fantasy gốc:** *"Làm một cung thủ an toàn từ tầm xa: dệt nên các vệt sương băng trên đường rút lui để vừa đi vừa bắn thả diều và cản bước kẻ truy đuổi."* (Doc 102 §3.3).
- **Tuyệt đối không phá vỡ Navigation:** Không tạo tường băng hay chướng ngại vật vật lý chặn đường lính/tướng; vệt băng chỉ là vùng ảnh hưởng (Zone Area) tăng tốc đồng minh (+20% MS) và làm chậm địch (-25% Slow).
- **Thao tác thân thiện cho tân thủ:** Người mới chỉ cần thực hiện thao tác cơ bản của xạ thủ (vừa bắn vừa lùi) là vệt băng tự động sinh ra dưới chân, không cần phải căn góc đặt bẫy phức tạp.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:**
  - Vệt sương băng mỏng không chặn đạn đạo hay kỹ năng định hướng.
  - Sát thủ có kỹ năng nhảy lướt vượt địa hình hoặc sử dụng Universal Dash (D) để vượt qua vệt băng tiếp cận Liễu Tiễn.
  - Chiêu cuối R Cực Băng Đại Tiễn bay nhanh nhưng có đường đạn thẳng và âm thanh rít băng cảnh báo, cho phép nạn nhân né tránh ở cự ly xa.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng QWER tách bạch hoàn toàn: Q (Băng tiễn xuyên kích), W/RMB (Sương băng thối bộ), E (Mưa tên băng), R (Đại tiễn choáng).
- Đánh thường tầm xa (`range: 7.2m`) độc lập. Dash D không bị đè.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Vệt sương băng rút lui không va chạm (Retreat Frost Trail - No Collision)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Dòng 413: Mỗi 3 phát bắn thường hoặc khi lùi bước (dòng 485), tự động sinh ra một thực thể vùng `frost_trail` trong `W.zones`.
  - Vùng có bán kính `trailRadius: 2.2m`, thời gian tồn tại `trailDuration: 3.0s`.
  - Đồng minh đi qua nhận `speedBoost: 0.20`, kẻ địch đi qua chịu `slowRatio: 0.25`.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave1-gameplay-toys.test.mjs` chạy PASS bài test `Toy 3: Lieu Tien frost trail - kiting speed boost & enemy slow without collision` [0.68ms].

### 2.2. Đánh Giá Khách Quan Số Liệu Lab
- **Chiến dịch:** `reports/sim/production26/2026-10-12T00-24-57-295Z/` (`lieu_tien`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 163.
- **Đường cong tăng tiến chuẩn mực của Xạ thủ gánh đội:**
  - Giai đoạn đầu (Phút 3 & 10): Tỉ lệ thắng solo 19% – 21%, phản ánh đúng sự yếu ớt của xạ thủ cần người bảo kê.
  - Giai đoạn bùng nổ (Phút 20): Vươn lên 40.8%, bắt đầu thả diều áp đảo các đấu sĩ lù đù.
  - Full build (6 món): Đạt **47.9%**, đánh bại hoàn toàn Mộc Lâm (100%), Mặc Liên (100%) và thắng kèo xạ thủ Kha Tấn (52%).
- **Tỉ lệ giao tranh đội:** 2v2 đạt **42.9%**, 3v3 đạt **40.4%**.

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig):** Biped nữ thanh thoát, socket cung băng ở tay trái, socket bao tên sau lưng. Polycount $\le 13,000$ tris.
- **VFX Performance (Lưu ý đặc biệt cho Mobile URP):**
  - Vệt băng dưới đất phải được dựng bằng unlit projector decal hoặc ribbon mesh bám ground surface với shader nhẹ.
  - Phải giới hạn số lượng vệt băng tồn tại đồng thời trên màn hình tối đa là 4 vệt để tránh hiện tượng overdraw gây tụt FPS trên các thiết bị di động tầm trung.
- **Chi phí & Gate 4:** Zero credit lãng phí; chưa tạo asset 3D.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W1-LT-001** | **MINOR** | Audit 3 (VFX Tech) | Nguy cơ overdraw nếu người chơi liên tục lùi bước thả diều tại chỗ sinh ra nhiều decal vệt băng chồng lấn lên nhau. | Đội VFX cần áp dụng cơ chế gộp vệt băng (decay fade-out hoặc pooling tối đa 4 vệt) trong Unity URP. | `OPEN` |
| **DEF-W1-LT-002** | **MINOR** | Audit 2 (Balance) | Năng lượng cơ bản 320 Mana khá eo hẹp so với tổng tiêu hao nguyên chuỗi combo (Q 40 + W 50 + E 60 + R 100 = 250 Mana ở cấp 6). | Cân nhắc tăng nhẹ Mana hồi phục cơ bản từ 1.5 lên 1.8 hoặc giảm tiêu hao chiêu W từ 50 xuống 40 ở cấp 1. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 & AUDIT 2 — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Liễu Tiễn (#40) là một thiết kế Xạ thủ thả diều thanh thoát, cơ chế Vệt Sương Băng tự động hoạt động mượt mà không phá vỡ điều hướng map. Dữ liệu Balance Lab thể hiện đường cong sức mạnh đúng chuẩn xạ thủ. Hồ sơ sẵn sàng cho Gate 4 Owner Sign-Off.
