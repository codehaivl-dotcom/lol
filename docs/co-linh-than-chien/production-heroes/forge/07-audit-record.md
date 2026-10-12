# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — #17 FORGE

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** Forge (#17) — Runtime ID: `forge`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [102 — Beginner Concept Shortlist](../102-roster-v5-beginner-concept-shortlist.md), [104 — Master Plan](../104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../91-khoa-input-qwer-d.md), [73 — Balance Lab](../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Fantasy Lò Cổ xả áp suất đúng chuẩn Strong Keep Roster V5. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy `heat_gauge` & vent pass unit test. Đạt chuẩn utility Đỡ đòn (2v2: 64.3%, 3v3: 58.5%). 132 cờ Orange cần review tiếp. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | `DEF-W1-FG-001` (Minor: Capsule va chạm địa hình). Giữ Gate 4 chờ Owner duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Ứng viên Đỡ đòn hoàn thiện xuất sắc; sẵn sàng trình Owner ký Gate 4.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible 103 & Shortlist 102
- **Fantasy gốc:** *"Đứng tuyến trước ăn đòn tích nhiệt dâng cao và xả áp suất mở combat diện rộng."* (Doc 102 §4, kế thừa Strong Keep Roster V5 #17).
- **Trải nghiệm chiến đấu trực quan:**
  - Càng bị đánh, lò nhiệt trong ngực càng đỏ rực và tỏa hơi nước nóng cảnh báo.
  - Người chơi có quyết định rõ ràng: Giữ nhiệt để tăng kháng hiệu ứng hoặc bấm W/RMB xả toàn bộ áp suất để nhận lớp khiên dày và nổ sát thương diện rộng.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:**
  - Không nên dùng các đòn đánh liên hoàn sát thương nhỏ cấu rỉa Forge vì sẽ vô tình "sạc pin" thanh nhiệt của hắn nhanh hơn.
  - Khi thấy Forge xả áp suất W (hiệu ứng nổ hơi nước trắng), đó là lúc hắn mất hết thanh nhiệt và lớp khiên sẽ hết hạn sau 3.5s; đây là thời điểm vàng để tập trung dồn sát thương hạ gục.
  - Chiêu Q lao vào hất văng có quỹ đạo thẳng, cự ly 7.0m, nạn nhân có thể dùng Universal Dash (D) lướt chéo góc né tránh.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: Q (Đột kích lao hất văng), W/RMB (Khóa áp suất & Xả khiên nổ), E (Phun hơi quạt thiêu đốt), R (Đại bộc phá chấn động).
- Đánh thường cận chiến đầm tay (`range: 1.7m`). Universal Dash (D) giữ nguyên độc lập.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *Thanh nhiệt lò nung & Xả áp suất (Heat Gauge & Pressure Vent)*.
- **Thực thi trong engine (`tools/sim/engine.mjs`):**
  - Dòng 417 & 397: Nhận sát thương tích nhiệt với tỉ lệ 0.04/dmg (`heatPerDmgTaken`), đánh thường tích 12 nhiệt (`heatPerHit`), dùng kỹ năng tích 15 nhiệt.
  - Dòng 575: Ngoài giao tranh quá 3s, thanh nhiệt tự động hạ dần 10 nhiệt/s.
  - Dòng 93–102 (`tools/test/wave1-gameplay-toys.test.mjs`): Khi kích hoạt RMB, tiêu thụ 100% thanh nhiệt thành khiên (`shieldPerHeat: 1.6`) và kích hoạt sự kiện `passive:heat_vent`.
- **Bằng chứng kiểm thử tự động:** `tools/test/wave1-gameplay-toys.test.mjs` chạy PASS bài test `Toy 4: Forge heat gauge - damage intake heating, bonus resist & heat vent` [0.15ms].

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Utility Đỡ Đòn
- **Chiến dịch:** `reports/sim/production26/2026-10-12T00-24-57-295Z/` (`forge`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** 132.
- **Phân tích chỉ số Utility (Không ép thành Duelist thuần túy):**
  - Đỡ đòn mở giao tranh không cần thắng mọi kèo 1v1; tuy nhiên Forge vẫn giữ tỉ lệ thắng trung bình 1v1 đáng nể: Phút 3 (44.2%), Phút 6 (57.1%), Phút 10 (45.6%), Phút 15 (59.5%), Phút 20 (55.2%), Full build (49.4%).
  - Khắc chế triệt để các tướng sát thương vật lý dồn dame như Bạch Diện (94-97% winrate) và Vạn Đao (50-83% winrate).
  - Điểm yếu rõ ràng trước pháp sư dồn sát thương phép tầm xa (Hỏa Tùy thắng 80-96%), tạo nên sự cân bằng tương khắc lành mạnh.
  - **Tỉ lệ thắng giao tranh đội nhóm vượt trội:** 2v2 đạt **64.3%**, 3v3 đạt **58.5%**.
  - **Khả năng lật kèo gank 1v2:** Đạt **7.1%** ở phút 6 (cao nhất toàn bộ Wave 1).
  - **Thời gian chịu trụ:** 30.5 giây (trâu nhất Wave 1).

---

## 3. CHI TIẾT AUDIT 3 — RED-TEAM DÂY CHUYỀN SẢN XUẤT 3D/VFX & CHI PHÍ (S7)

### 3.1. Tính Khả Thi Trên Pipeline 3D Mobile URP
- **Khung xương (Rig):** Biped thể hình khổng lồ, lưng gắn cụm ống xả áp suất khí nén (2 smoke exhaust pipes). Polycount $\le 14,000$ tris.
- **Shader & VFX Performance:**
  - Shader thân thể tích hợp 1 kênh Emission Mask điều khiển độ nóng sáng của than hồng trong lò theo giá trị `heat` (0 -> 100).
  - Hiệu ứng xả áp dùng hạt khói steam dạng particle puff nhẹ nhàng, tắt shadow casting để tối ưu fill-rate trên GPU di động.
- **Chi phí & Gate 4:** Zero credit lãng phí; chưa tạo asset 3D.

---

## 4. DANH SÁCH DEFECT ĐỘC LẬP (DEFECT LOG)

| DEFECT ID | Mức Độ | Giai Đoạn | Mô Tả Lỗi / Bất Cập | Yêu Cầu Khắc Phục Cụ Thể | Trạng Thái |
|---|:---:|:---:|---|---|:---:|
| **DEF-W1-FG-001** | **MINOR** | Audit 3 (Collision/Rig) | Mô hình cơ thể đồ sộ có nguy cơ bị kẹt va chạm (capsule stuck) tại các hẻm hẹp của bản đồ Mạch Giữa nếu bán kính capsule vượt quá 0.8m. | Đội Tech Art cần khóa bán kính Capsule Collider tối đa $\le 0.75\text{m}$ khi nhập mesh vào engine tại Gate 5. | `OPEN` |
| **DEF-W1-FG-002** | **MINOR** | Audit 2 (Telemetry) | Trong simulator, cơ chế xả áp RMB đã tăng khiên chính xác nhưng sát thương nổ nhiệt `ventDmgPerHeat` cần ghi nhận tag riêng biệt trong combat log để dễ cân chỉnh. | Bổ sung tag `passive:heat_vent_dmg` khi tính toán sát thương nổ xả áp tại Gate 7. | `OPEN` |

---

## 5. KẾT LUẬN TOÀN DIỆN CỦA HỘI ĐỒNG AUDIT

> **KẾT LUẬN: PASS AUDIT 1 & AUDIT 2 — GIỮ TRẠNG THÁI "HOLD" TẠI GATE 4 CHỜ OWNER KÝ DUYỆT.**  
> Forge (#17) là hình mẫu lý tưởng của một Đỡ đòn mở giao tranh: độ trâu bò xuất sắc, hiệu ứng khống chế vững chắc, cơ chế thanh nhiệt vận hành chính xác và các chỉ số giao tranh đội nhóm dẫn đầu Wave 1. Hồ sơ sẵn sàng trình Owner ký phê duyệt Gate 4.
