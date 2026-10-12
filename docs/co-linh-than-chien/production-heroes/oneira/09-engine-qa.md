# 09 · Engine QA — #48 Oneira (Mộng Thể Mặt Nạ Hút Khống Chế)

**Trạng thái:** `QA_SPEC_LOCKED / TEST_PLAN_READY`  
**Khóa định danh:** `#48 / oneira`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 11 (Acceptance Bàn Giao)](../../11-acceptance-ban-giao.md), [Tài liệu 10 (Đối Soát Runtime)](../../10-doi-soat-runtime.md) & [Tài liệu 105 (Hero Factory Multi-Agent Workflow)](../../105-hero-factory-multi-agent-workflow.md)

---

## 1. Tóm Tắt Hiện Trạng Nghiệm Thu (Verification Status Summary)

Tuân thủ quy chế kỹ thuật trung thực của dự án: Không ghi `PASS_ENGINE` khống khi chưa có binary Spawn runtime kết nối trực tiếp.

| Hạng mục kiểm thử | Môi trường kiểm thử | Trạng thái hiện tại | Bằng chứng / File log đối soát |
|---|---|---|---|
| **Cơ chế Gameplay Toy 7 (Hút Khống Chế & Chuyển Hóa Hồi Máu)** | Balance Lab Simulator Engine | **`PASS_SIMULATOR`** | File `tools/test/wave4-gameplay-toys.test.mjs` chạy Bun test: 7/7 Toy PASS (Bao gồm Toy 7 của Oneira). |
| **Cân bằng số liệu & Độ dài trận đấu** | Balance Lab 200 Matches Sim | **`PASS_SIMULATOR (RED=0)`** | `tools/sim/candidates/oneira.yml` chạy qua `production-26.mjs` đạt chỉ số sống sót và hỗ trợ đúng chuẩn Enchanter Thanh Tẩy. |
| **Tương tác hình học & Hitbox thực chiến** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ kết nối binary Spawn engine và import model/VFX. |
| **Độ mượt hoạt ảnh & Thân khói bán trong suốt** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ rig và animation clip import theo Doc 28. |
| **Âm thanh gió mộng ảo & Chuông thức tỉnh** | Spawn Runtime Match | **`NOT_TESTED`** | Chờ tích hợp ngân hàng âm thanh Wwise/FMOD. |

---

## 2. Kịch Bản Kiểm Thử Thực Chiến Chi Tiết (Spawn Runtime Test Scenarios)

Khi binary game engine Spawn được kết nối, QA Tester thực hiện tuần tự 8 kịch bản kiểm thử sau:

### Kịch bản 1: Kiểm Thử Đòn Đánh Thường & Tầm Bắn (Basic Attack Test)
- **Thiết lập:** Đặt hình nộm đối phương ở cự ly $6.0\text{m}$. Nhấp chuột trái tấn công.
- **Tiêu chí PASS:**
  1. Quả cầu khói mộng cảnh bay ra sau $0.15\text{s}$ windup, bay với tốc độ $24\text{m/s}$.
  2. Va chạm trúng mục tiêu nảy sát thương phép ($100\%\text{AD} + 20\%\text{AP}$); không tiêu hao năng lượng.
- **Tiêu chí FAIL:** Đạn bay lệch hướng, tính nhầm sát thương vật lý thuần, hoặc không có hiệu ứng khói mờ.

### Kịch bản 2: Kiểm Thử Cầu Khói Q & Trói Chân (Skillshot Q Root Test)
- **Thiết lập:** Nhắm bắn Q vào hình nộm kẻ địch ở cự ly $7.5\text{m}$.
- **Tiêu chí PASS:**
  1. Quả cầu khói bay thẳng với tốc độ $26\text{m/s}$.
  2. Chạm mục tiêu nảy sát thương phép và Trói Chân (Root) mục tiêu đứng yên đúng $1.0\text{s}$.
- **Tiêu chí FAIL:** Đạn bay lệch đường chỉ thị; hoặc không trói chân mục tiêu.

### Kịch bản 3: Kiểm Thử Hút Khống Chế Mềm (Slow & Root Cleanse Test)
- **Thiết lập:** Tướng đồng minh (Mộc Lẫm) bị làm chậm $50\%$ trong 3.0s và bị trói chân trong 2.5s. Oneira đứng cách $4.0\text{m}$ bấm phím W.
- **Tiêu chí PASS:**
  1. Ngay khi bấm W, toàn bộ trạng thái làm chậm và trói chân của Mộc Lẫm biến mất ngay lập tức (`slows = []`, `rootUntil = 0`).
  2. Mộc Lẫm lập tức tự do di chuyển và nhận lớp khiên ($70 - 210$) cùng hồi máu tức thì.
  3. Kích hoạt sự kiện `proc("passive:cc_transmuted")`.
- **Tiêu chí FAIL:** Mộc Lẫm vẫn bị làm chậm hoặc bị trói; không nhận khiên.

### Kịch bản 4: Kiểm Thử Hút Khống Chế Cứng (Stun Cleanse Test)
- **Thiết lập:** Mộc Lẫm bị dính đòn Làm Choáng (Stun) $1.5\text{s}$. Oneira bấm W.
- **Tiêu chí PASS:**
  1. Trạng thái Choáng trên đầu Mộc Lẫm biến mất ngay lập tức; Mộc Lẫm có thể tung chiêu và di chuyển ngay.
- **Tiêu chí FAIL:** Mộc Lẫm vẫn bị choáng đến hết thời gian; hoặc kỹ năng không kích hoạt được.

### Kịch bản 5: Kiểm Thử Giới Hạn Tuyệt Đối (Airborne & Suppression Immunity Test)
- **Thiết lập:** Mộc Lẫm bị hất tung lên trời (Airborne/Knockback) bởi chiêu của Forge. Oneira bấm W.
- **Tiêu chí PASS:**
  1. Mộc Lẫm **vẫn tiếp tục bị hất tung trên không**, không bị ngắt trạng thái rơi.
  2. Oneira chỉ buff khiên/máu cho Mộc Lẫm mà **không hút được hiệu ứng Hất Tung** vào mặt nạ.
- **Tiêu chí FAIL:** Phá vỡ logic vật lý, làm rớt nhân vật xuống đất tức thì sai quy chuẩn.

### Kịch bản 6: Kiểm Thử Điều Kiện Bản Thân Bị Khống Chế (Self-Disabled Guard Test)
- **Thiết lập:** Oneira bị đối phương tung chiêu Làm Choáng (Stun) $1.5\text{s}$. Người chơi bấm phím W.
- **Tiêu chí PASS:**
  1. Phím W bị khóa màu xám (Disabled); Oneira không thể kích hoạt W để tự giải choáng cho mình hay cho đồng minh.
- **Tiêu chí FAIL:** Oneira tự bấm W giải choáng cho chính mình (vi phạm canon Doc 100).

### Kịch bản 7: Kiểm Thử Chuyển Hóa Hồi Máu Sau 2.0s (Transmute Delay +80 HP Test)
- **Thiết lập:** Oneira hút thành công 1 hiệu ứng CC qua W. Đứng yên quan sát trong $3.0\text{s}$.
- **Tiêu chí PASS:**
  1. Sau đúng $2.0\text{s}$ ($\pm 0.05\text{s}$), mặt nạ xoay đưa nụ cười ra trước, phát nổ sóng hào quang vàng kim.
  2. Toàn bộ đồng minh trong bán kính $6.0\text{m}$ nhận thêm đúng $+80$ HP hồi phục và tăng tốc $25\%$ trong $1.5\text{s}$.
- **Tiêu chí FAIL:** Hồi máu ngay lập tức tại 0s; hoặc không nổ hồi máu sau 2.0s.

### Kịch bản 8: Kiểm Thử Đại Chiêu R Chuẩn Doc 79 (Grand Ultimate R Test)
- **Thiết lập:** Oneira kích hoạt R giữa 3 tướng địch và 2 tướng đồng minh trong bán kính $5.5\text{m}$.
- **Tiêu chí PASS:**
  1. **Pha 1 & 2 (0.0s - 0.25s):** Bay lên $1.5\text{m}$, mặt nạ xoay tít rực rỡ, phóng sóng thức tỉnh chấn động.
  2. **Pha 3 (0.25s - 0.5s):** Cả 3 tướng địch bị **Làm Choáng 0.8 giây**; cả 2 tướng đồng minh nhận đại khiên ($90 - 190$) và hồi phục lớn ($110 - 250$).
  3. **Pha 4 (0.5s - 3.5s):** Thảm hoa sương mộng duy trì hiệu ứng thanh tẩy trên sàn đấu.
- **Tiêu chí FAIL:** Bỏ qua giai đoạn gồng $0.25\text{s}$; nổ sai bán kính; hoặc không làm choáng kẻ địch.
