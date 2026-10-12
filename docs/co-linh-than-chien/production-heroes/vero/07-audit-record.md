# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #03 VERO

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Vero (#03) — Runtime ID: `vero`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [104 — Master Plan](../104-full-approved-roster-production-master-plan.md), [96 — Top 15 Concept Bibles](../96-roster-v5-top15-concept-bibles.md), [105 — Multi-Agent Workflow](../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../91-khoa-input-qwer-d.md), [73 — Balance Lab](../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Sát thủ vết kiếm thời không chuẩn xác theo Doc 96 [06]. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy `delayed_echo` pass unit test thực tế (tích lũy 30% sát thương -> đếm ngược 2.5s -> nổ phép). 161 cờ Orange cần review tiếp. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W2-VR-001` (Major: Delayed echo timing & death pop), `DEF-W2-VR-002` (Major: Hybrid AP stat waste), `DEF-W2-VR-003` (Minor: Time-rift decal visual). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Sát thủ thời không cơ chế sáng tạo; phát hiện defect cơ học cần khắc phục; giữ Gate 4 chờ Owner.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 104 & Concept 96
- **Fantasy cốt lõi:** *"Vết Kiếm — Sát thủ kiếm khách Tinh Thạch thời không. Lối chơi: Găm vết chém trễ (Delayed Echo Slice) lên mục tiêu; sau 2.5s, vết chém tích tụ tự động phát nổ xé toạc không gian gây thêm 30% tổng sát thương."* (Doc 96 [06], Doc 104).
- **Trải nghiệm chiến đấu trực quan:**
  - Kiếm khách thanh thoát mang trường kiếm Tinh Thạch trắng bạc.
  - Cảm giác thỏa mãn khi dồn xong một chuỗi chiêu thức rồi quay lưng bước đi, chứng kiến vết nứt thời gian trên người đối thủ phát nổ chậm rãi tiễn kẻ địch lên bảng.
  - Chiêu R Vạn Kiếm Quy Thời cho phép chủ động kích nổ vết nứt ngay lập tức khi cần kết liễu khẩn cấp.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:**
  - Khi bị Vero găm vết chém trễ, trên người nạn nhân xuất hiện một vết nứt thủy tinh màu tím bạc kèm vòng tròn đếm ngược 2.5 giây.
  - Nạn nhân có đủ 2.5s để bấm phím Universal Dash (D) thoát cự ly, bấm khiên chắn, kích hoạt chiêu hồi máu hoặc dồn sát thương hạ gục Vero trước.
  - Chiêu Q lướt kiếm 6.5m có đường thẳng định hướng, nạn nhân có thể né sang bên hông để tránh bị dính sát thương khởi đầu.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: Q (Vết Chém Thời Không — lướt chém xuyên mục tiêu 6.5m), RMB/W (Thời Không Chi Khiên — tạo khiên phản đòn), E (Vòng Xoáy Nghịch Đảo — xoay kiếm 360 độ làm chậm), R (Vạn Kiếm Quy Thời — khóa mục tiêu chém 3 nhát và kích nổ tức thì).
- Đánh thường cận chiến trường kiếm (`range: 1.8m`). Universal Dash (D) giữ nguyên độc lập.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Vết chém thời không tích sát thương & Phát nổ trễ (Delayed Echo Slice Damage Accumulation & Pop)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Khi Vero gây sát thương, tích lũy `foe.echoDmg += dmg * 0.30` và đặt `foe.echoPopAt = W.t + 2.5`.
  - Trong `tickDots()`: Khi `W.t >= foe.echoPopAt`, kích hoạt nổ sát thương `foe.echoDmg`, reset về 0 và ghi nhận `passive:delayed_echo_pop = 1`.
  - Dòng 100–117 (`tools/test/wave2-gameplay-toys.test.mjs`): Kiểm chứng tích lũy `echoDmg`, pop nổ đúng giờ và reset sạch.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave2-gameplay-toys.test.mjs` chạy PASS bài test `Toy 5: Vero delayed echo slice damage accumulation & pop` [0.07ms].

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Sát Thủ
- **Chiến dịch:** `reports/sim/production26/2026-10-12T07-21-06-914Z/` (`vero`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 161.
- **Phân tích chỉ số:**
  - Tỉ lệ thắng 1v1 trung bình: Phút 3 (24.3%), Phút 6 (11.4%), Phút 10 (7.4%), Phút 15 (6.0%), Phút 20 (11.8%), Full build (17.9%).
  - Nguyên nhân: Thời gian trễ 2.5s trong điều kiện đấu tay đôi 1v1 khiến Vero bị Đấu sĩ trâu bò hạ gục trước khi vết nứt nổ.
  - Sát thương combo phút 3 rất ấn tượng: Gây 606–806 dmg (52%–88% HP mục tiêu), áp đảo hoàn toàn Bạch Diện (100% winrate ở phút 3) và dồn sát thương cực mạnh lên Mặc Liên, Hỏa Tùy.
  - **Tỉ lệ thắng 2v2:** Đạt **37.4%** ($n=91$).

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig) & Mô hình:** Biped kiếm khách thanh mảnh, áo choàng vạt dài chuyển động theo gió (tối ưu bone cloth 3-4 joint thay vì physics cloth). Polycount $\le 12,000$ tris.
- **Shader & VFX Vết Nứt Thời Gian:**
  - Vết nứt thời không trên người nạn nhân cần sử dụng decal hoặc particle vệt sáng tím bạc gắn vào xương ngực (`Spine_Socket`), có hiệu ứng rung nhẹ (jitter) khi sắp nổ.
  - Vụ nổ nứt vỡ không gian (glass shatter) dùng mesh vỡ 12 mảnh bay bung ra, biến mất sau 0.4s để giải phóng draw call.
- **Chi phí & Gate 4:** Không chi tiêu credit tạo asset trước khi Owner phê duyệt.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W2-VR-001** | **MAJOR** | Audit 2 (Runtime Mechanics) | Cơ chế nổ trễ 2.5s bị lỗi triệt tiêu nếu Vero bị hạ gục trước khi hết thời gian đếm ngược: trong simulator, nếu Vero chết, vết nứt không nổ, khiến lượng sát thương tích lũy bị mất trắng. | Bổ sung quy tắc: nếu Vero ngã xuống, vết nứt lập tức phát nổ ngay (`Death Triggered Pop`) hoặc rút ngắn độ trễ từ 2.5s xuống 2.0s tại Gate 6-7. | `OPEN` |
| **DEF-W2-VR-002** | **MAJOR** | Audit 2 (Data Kit Consistency) | Trong YAML `vero.yml`, Vero được cấp chỉ số AP khởi điểm (`ap: 25`, growth `ap: 3.0`), nhưng toàn bộ kỹ năng QWER chỉ scale theo AD/BonusAD và build item hoàn toàn là vật lý, gây lãng phí điểm AP vô ích. | Xóa chỉ số AP thừa (chuyển sang thuần AD) hoặc bổ sung hệ số AP scaling vào chiêu E/R tại Gate 6. | `OPEN` |
| **DEF-W2-VR-003** | **MINOR** | Audit 1 (Visual Telegraph) | Nạn nhân cần có vòng tròn đồng hồ đếm ngược 2.5s hiển thị rõ dưới chân để biết chính xác thời điểm vết nứt sẽ nổ để kịp kích hoạt phòng thủ. | UI/Tech Art cần bổ sung chỉ báo Countdown Telegraph Ring trên đầu hoặc dưới chân mục tiêu bị đánh dấu. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 — FLAG_REVIEW TẠI AUDIT 2 (red: 0, 161 orange) — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Vero (#03) sở hữu ý tưởng sát thủ vết chém thời không rất hấp dẫn và độc đáo; ghi nhận 3 defect (2 Major, 1 Minor) cần chuẩn hóa. Hồ sơ sẵn sàng trình Owner ký phê duyệt Gate 4 sau khi có bằng chứng kiểm thử thực tế.
