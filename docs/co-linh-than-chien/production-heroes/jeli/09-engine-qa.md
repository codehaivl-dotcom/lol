# 09 · Engine QA — #34 Jeli (Sóng Chuông Hộ Vệ & Hồi Phục)

**Trạng thái:** `QA_SPEC_LOCKED / TEST_PLAN_READY`  
**Khóa định danh:** `#34 / jeli`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 11 (Acceptance Bàn Giao)](../11-acceptance-ban-giao.md), [Tài liệu 10 (Đối Soát Runtime)](../10-doi-soat-runtime.md) & [Tài liệu 105 (Hero Factory Multi-Agent Workflow)](../105-hero-factory-multi-agent-workflow.md)

---

## 1. Tóm Tắt Hiện Trạng Nghiệm Thu (Verification Status Summary)

Tuân thủ quy chế kỹ thuật trung thực của dự án: Không ghi `PASS_ENGINE` khống khi chưa có binary Spawn runtime kết nối trực tiếp.

| Hạng mục kiểm thử | Môi trường kiểm thử | Trạng thái hiện tại | Bằng chứng / File log đối soát |
|---|---|---|---|
| **Cơ chế Gameplay Toy 5 (Sóng Chuông 3.5s & Phân tách Khiên/Hồi máu)** | Balance Lab Simulator Engine | **`PASS_SIMULATOR`** | File `tools/test/wave1-gameplay-toys.test.mjs` chạy Bun test: 5/5 Toy PASS (Bao gồm Toy 5 của Jeli). |
| **Cân bằng số liệu & Độ dài trận đấu** | Balance Lab 200 Matches Sim | **`PASS_SIMULATOR (RED=0)`** | `tools/sim/candidates/jeli.yml` đối đầu với bảng so sánh 6 tướng chuẩn đạt tỷ lệ sống sót và giá trị hỗ trợ đúng chuẩn Enchanter. |
| **Tương tác hình học & Hitbox thực chiến** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ kết nối binary Spawn engine và import model/VFX. |
| **Độ mượt hoạt ảnh & Chuyển động lơ lửng** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ rig và animation clip import theo Doc 28. |
| **Âm thanh chuông ngân & Trực quan giao tranh** | Spawn Runtime Match | **`NOT_TESTED`** | Chờ tích hợp ngân hàng âm thanh Wwise/FMOD. |

---

## 2. Kịch Bản Kiểm Thử Thực Chiến Chi Tiết (Spawn Runtime Test Scenarios)

Khi binary game engine Spawn được kết nối, QA Tester thực hiện tuần tự 8 kịch bản kiểm thử sau:

### Kịch bản 1: Kiểm Thử Nhịp Chuông Nội Tại (Periodic Chime Resonance Test)
- **Thiết lập:** 1 Jeli (người chơi) đi cùng 1 tướng đồng minh (Mộc Lẫm) bị rút máu xuống $30\%$ HP. Đứng yên không bấm phím trong $15\text{s}$.
- **Tiêu chí PASS:**
  1. Cứ mỗi $3.5\text{s}$ ($\pm 0.05\text{s}$), chuông ngân tự động phát sáng và phát ra sóng âm hình tròn.
  2. Máu của Mộc Lẫm tăng lên đúng giá trị ($35 + 0.3\text{AP}$), và thanh máu hiện viền khiên trắng ($25 + 0.2\text{AP}$) kéo dài đúng $2.5\text{s}$.
  3. Máu của Jeli tự tăng lên $50\%$ giá trị hồi phục trên.
  4. Không tiêu hao năng lượng mana của Jeli.
- **Tiêu chí FAIL:** Sóng chuông không nổ, nổ sai chu kỳ (nhanh/chậm hơn 3.5s), hoặc hồi máu cho lính/quái thay vì ưu tiên tướng đồng minh.

### Kịch bản 2: Kiểm Thử Đạn Đạo Q (Skillshot Bubble Path & Slow Test)
- **Thiết lập:** Đặt hình nộm đối phương ở cự ly $8.0\text{m}$. Nhắm và bắn phím Q.
- **Tiêu chí PASS:**
  1. Quả cầu nước bay thẳng với tốc độ $24\text{m/s}$, giữ đúng hình dạng bọt nước xoáy phát quang.
  2. Khi chạm hình nộm ở $8.0\text{m}$, quả cầu phát nổ, số sát thương phép nảy đúng theo cấp kỹ năng.
  3. Tốc độ di chuyển của hình nộm bị giảm đúng $35\%$ trong đúng $1.5\text{s}$.
- **Tiêu chí FAIL:** Đạn bay lệch khỏi đường chỉ thị (decal preview), xuyên qua người không nổ, hoặc làm chậm vĩnh viễn/không làm chậm.

### Kịch bản 3: Kiểm Thử Khiên & Hồi Phục Diện Rộng W (PBAoE Dual Shield & Heal Test)
- **Thiết lập:** Jeli đứng giữa 2 tướng đồng minh và 1 tướng địch trong bán kính $5.0\text{m}$. Bấm phím W.
- **Tiêu chí PASS:**
  1. Kỹ năng kích hoạt tức thì ($0\text{s}$ windup), Jeli không bị khựng bước di chuyển.
  2. Cả Jeli và 2 tướng đồng minh lập tức nhận lớp khiên dày ($60 - 180$) và hồi phục máu ($40 - 140$).
  3. Tướng địch đứng bên cạnh hoàn toàn không bị ảnh hưởng (không mất máu, không bị làm chậm).
  4. Lớp khiên trên 3 tướng tồn tại đúng $3.0\text{s}$ rồi tự phân rã mượt mà.
- **Tiêu chí FAIL:** Có độ trễ khựng nhân vật; chỉ hồi máu mà không có khiên (hoặc ngược lại); buff nhầm khiên cho tướng địch.

### Kịch bản 4: Kiểm Thử Tự Vệ Bóc Tách E (Self-Peel PBAoE Slow Test)
- **Thiết lập:** Một tướng sát thủ (Kiko) dùng Dash lao vào áp sát Jeli ở cự ly $2.0\text{m}$. Jeli bấm phím E.
- **Tiêu chí PASS:**
  1. Vòng sóng nước xoáy quanh thân quét trúng Kiko trong bán kính $4.2\text{m}$.
  2. Kiko nhận sát thương phép và bị làm chậm $30\%$ trong $1.2\text{s}$, tạo điều kiện cho Jeli lướt Dash D thoát thân.
- **Tiêu chí FAIL:** Hitbox quét lệch khỏi tâm nhân vật; không làm chậm mục tiêu.

### Kịch bản 5: Kiểm Thử Chiêu Cuối Chuẩn Doc 79 (Grand Ultimate R Test)
- **Thiết lập:** Giao tranh mô phỏng 5v5: 4 đồng minh máu dưới $40\%$, 3 kẻ địch đang vây quanh trong bán kính $6.0\text{m}$. Jeli kích hoạt R.
- **Tiêu chí PASS:**
  1. Thực hiện đầy đủ 5 pha theo Doc 79: Tụ lực $0.25\text{s}$ $\rightarrow$ Bay lên thăng hoa $\rightarrow$ Đại Cổ Chuông hiện trên đầu $\rightarrow$ Chấn động nổ ở $0.45\text{s}$ $\rightarrow$ Thánh âm vang rền.
  2. Toàn bộ 4 đồng minh được hồi một lượng máu khổng lồ ($100 - 240 + 0.35\text{AP}$) và nhận lớp Khiên Đại Thánh Chuông vững chãi trong $3.5\text{s}$.
  3. Cả 3 kẻ địch bị làm chậm $35\%$ trong $2.0\text{s}$ và nhận sát thương phép.
  4. Hiệu ứng VFX không che khuất thanh máu và con trỏ chuột của người chơi khác.
- **Tiêu chí FAIL:** Mất pha gióng chuông; lag giật khung hình (<45 FPS); không cấp khiên cho đồng minh ở rìa bán kính $6.5\text{m}$.

### Kịch bản 6: Kiểm Thử Tương Tác Cạnh Biên Với Vết Thương Sâu (Anti-Heal Interaction)
- **Thiết lập:** Jeli và đồng minh bị dính hiệu ứng Vết Thương Sâu ($40\%$ Anti-Heal). Jeli kích hoạt W và R.
- **Tiêu chí PASS:**
  1. Lượng máu hồi phục bị giảm chính xác $40\%$.
  2. **Giá trị Khiên (Shield) giữ nguyên 100%**, không bị suy giảm bởi Vết Thương Sâu.
- **Tiêu chí FAIL:** Lớp khiên bị giảm trừ sai luật.

### Kịch bản 7: Kiểm Thử Điều Khiển & Universal Dash (Input Lock Doc 91 Test)
- **Tiêu chí PASS:**
  1. Phím Q/W/E/R vận hành trơn tru theo đúng 4 slot.
  2. Phím D kích hoạt Universal Dash lướt nhanh $4.5\text{m}$, không xung đột với bất kỳ chiêu thức nào.
  3. Chuột phải (RMB) dùng để di chuyển và điều hướng nhân vật, không bị gán nhầm skill.

### Kịch bản 8: Hiệu Năng & Tải Trận Đấu (Performance & Frame Rate)
- **Tiêu chí PASS:**
  1. Trong combat 5v5 liên tục có W, E, R của Jeli cùng lúc với các chiêu thức của 9 tướng khác, tốc độ khung hình duy trì ổn định $\ge 60\text{ FPS}$ trên cấu hình PC chuẩn và $\ge 45\text{ FPS}$ trên cấu hình Mobile Mid-tier.
  2. Bộ nhớ VRAM dành cho model, texture và VFX của Jeli không vượt quá $35\text{MB}$.

---

## 3. Tiêu Chí Nghiệm Thu Cuối Cùng (Acceptance Gate Pass/Fail)

- **Đạt chuẩn bàn giao (PLAYABLE PASS):**
  - Đạt 8/8 kịch bản kiểm thử trên Spawn runtime với $0$ lỗi nghiêm trọng (Blocker/Critical Defect).
  - Được Lead Gameplay Designer và Art Director ký duyệt đồng thuận.
- **Bị giữ lại (REJECT / HOLD):**
  - Có bất kỳ lỗi nào làm văng client (Crash).
  - Khiên hoặc hồi máu không hoạt động trên đồng minh.
  - Tụt FPS dưới 30 trong combat khi thi triển chiêu cuối R.
