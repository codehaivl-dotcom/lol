# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #39 KAEL

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Kael (#39) — Runtime ID: `kael`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [102 — Beginner Concept Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md), [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/91-khoa-input-qwer-d.md), [73 — Balance Lab](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Fantasy song đao chém cuồng nhịp đúng Doc 102 §3.2. Không dính cơ chế Tryndamere/Yi. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **DEFECT_BALANCE** | `DEF-W1-KL-001` (Major: Tỉ lệ thắng sụp đổ ở mid-late 4–11%, quá mỏng manh). `DEF-W1-KL-002` (Minor: Chưa chặn trần 2 tầng trên lính). |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | Pipeline song đao chuẩn biped. Giữ Gate 4 chờ Owner quyết định chỉnh stats. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF & BALANCE TUNING)** | **Cần điều chỉnh độ bền trước khi Owner phê duyệt Gate 4.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 103 & Shortlist 102
- **Fantasy gốc:** *"Cầm đại đao / song đao lao vào chém tay liên thanh: đòn đánh trúng càng nhiều thì nhịp chém càng nhanh, duy trì thế bám đuổi quyết liệt."* (Doc 102 §3.2).
- **Thoát khỏi Master Yi & Tryndamere:**
  - Tuyệt đối không có bất tử 5 giây (Undying Rage).
  - Không có chém lướt không thể chọn làm mục tiêu (Alpha Strike untargetable).
  - Không có cơ chế hồi chiêu tức thì khi có mạng hạ gục (CD reset).
- **Trải nghiệm người mới:** Cơ chế suy giảm tầng dần dần (mất 1 tầng mỗi 1.2s – 2.0s thay vì mất sạch sau 2s) giúp người mới duy trì được sức mạnh trong giao tranh rối ren.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:** 
  - Kael hoàn toàn phụ thuộc vào việc áp sát cận chiến (tầm đánh 1.7m).
  - Nạn nhân có thể dùng kỹ năng làm chậm, choáng hoặc Universal Dash (D) để giãn cự ly quá 2.0s, khiến các tầng Cuồng Nhịp của Kael tiêu biến, tước đi phần lớn tốc độ đánh và lượng hồi phục.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- Bốn kỹ năng rõ ràng: Q (Cuồng trảm lướt), W/RMB (Song đao toái kích), E (Kích thích huyết mạch - nhận khiên), R (Huyết cuồng phong ma - liên hoàn trảm).
- Không xung đột phím Dash D.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Nhịp chém liên kích & suy giảm tầng (Continuous Hit Momentum & Decay)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Dòng 405: Đánh trúng tướng tích 1 tầng, đánh lính tích 0.5 tầng, tối đa 5 tầng. Mỗi tầng tăng 8% tốc độ đánh (`aspdPerStack: 0.08`).
  - Dòng 565: Khi rời giao tranh quá `decayDelay: 2.0s`, số tầng Cuồng Nhịp suy giảm dần với tốc độ `decayRate: 2.0 stacks/s` thay vì tụt về 0 ngay lập tức.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave1-gameplay-toys.test.mjs` chạy PASS bài test `Toy 2: Kael Cuong Nhip - stack accumulation, attack speed bonus & decay` [0.38ms].

### 2.2. Đánh Giá Khách Quan Số Liệu Lab — CẢNH BÁO SỤP ĐỔ SỨC MẠNH
- **Chiến dịch:** `reports/sim/production26/2026-10-12T00-24-57-295Z/` (`kael`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 156.
- **Vấn đề cốt tử được phát hiện:**
  - Hội đồng ban đầu lo ngại Kael bị "vỡ balance lên 80%+" ở full build do cơ chế chém tay tích tốc độ đánh.
  - **KẾT QUẢ THỰC TẾ NGƯỢC LẠI HOÀN TOÀN:** Kael bị **suy sụp sức mạnh nghiêm trọng**:
    - Phút 3: 40.3%
    - Phút 6: 11.7%
    - Phút 10: 6.9%
    - Phút 15: 7.7%
    - Phút 20: 4.1%
    - Full build: 19.9%
  - Kael đối đầu với Mộc Lâm, Kha Tấn, Hỏa Tùy có tỉ lệ thắng **0.0%** từ phút thứ 6 trở đi.
  - **Nguyên nhân kỹ thuật:** Kael là một đấu sĩ cận chiến mỏng manh (670 HP gốc, giáp 34). Khi đối đầu với tướng cấu rỉa tầm xa (Kha Tấn), pháp sư sốc sát thương (Hỏa Tùy) hoặc đấu sĩ khống chế cứng (Mộc Lâm), Kael bị bốc hơi hoặc bị thả diều trước khi kịp chém đủ đòn để tích tầng Cuồng Nhịp. Lớp khiên chiêu E (`55..175`) là quá yếu ở giai đoạn giữa trận.
- **Tỉ lệ giao tranh đội:** 2v2 đạt **31.9%**, 3v3 đạt **33.0%**. Cần sự bảo bọc rất lớn từ đồng đội.

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig):** Biped cơ bắp vừa phải, 2 bone socket cho cặp song đao.
- **Animation:** Đòi hỏi hoạt ảnh đánh thường tốc độ cao (Blend Tree tấn công chuyển tiếp mượt mà theo tốc đánh lên tới 1.5 – 1.8 AS).
- **VFX Performance:** Các vệt chém lưỡi đao đỏ sẫm (Crimson slash trails) dùng unlit ribbon mesh, chi phí render nhẹ nhàng trên URP.
- **Chi phí & Gate 4:** Zero credit lãng phí; chưa tạo asset 3D.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W1-KL-001** | **MAJOR** | Audit 2 (Balance) | **Kael quá mỏng manh ở mid-late game (Thua 1v1 tới 95.9% ở phút 20):** Lượng máu và khiên không đủ để tiếp cận mục tiêu trong meta khống chế và sốc sát thương. | Đã khắc phục trong `kael.yml`: Tăng máu tăng trưởng `growth.hp` từ 88 lên 98; tăng khiên chiêu E lên `[70, 105, 140, 175, 210]`. | `RESOLVED_IN_CANDIDATE` |
| **DEF-W1-KL-002** | **MINOR** | Audit 2 (Mechanics) | Quy tắc tích tầng trên lính trong simulator hiện đang cho 0.5 tầng/hit nhưng chưa chặn cứng trần tối đa 2 tầng như yêu cầu của Doc 102 §3.2. | Bổ sung logic `if (e.kind === 'minion' && h.cuongNhip.stacks >= 2) return;` trong `engine.mjs` trước Gate 7. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: AUDIT 1 PASS — AUDIT 2 PHÁT HIỆN DEFECT CÂN BẰNG — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4.**  
> Kael (#39) có concept tốt và cơ chế Cuồng Nhịp hoạt động chính xác theo unit test. Tuy nhiên, dữ liệu định lượng Lab cho thấy Kael đang bị quá yếu và dễ chết ở giữa và cuối trận (Defect `DEF-W1-KL-001`). Đề nghị S4 Balance Designer tinh chỉnh chỉ số phòng ngự cơ bản trước khi trình Creator ký duyệt Gate 4.
