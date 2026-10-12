# 09 · Engine QA — #19 Inka (Mực Thư Pháp Tuyến Tính)

**Trạng thái:** `QA_SPEC_LOCKED / TEST_PLAN_READY`  
**Khóa định danh:** `#19 / inka`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 11 (Acceptance Bàn Giao)](../../11-acceptance-ban-giao.md), [Tài liệu 10 (Đối Soát Runtime)](../../10-doi-soat-runtime.md) & [Tài liệu 105 (Hero Factory Multi-Agent Workflow)](../../105-hero-factory-multi-agent-workflow.md)

---

## 1. Tóm Tắt Hiện Trạng Nghiệm Thu (Verification Status Summary)

Tuân thủ quy chế kỹ thuật trung thực của dự án: Không ghi `PASS_ENGINE` khống khi chưa có binary Spawn runtime kết nối trực tiếp.

| Hạng mục kiểm thử | Môi trường kiểm thử | Trạng thái hiện tại | Bằng chứng / File log đối soát |
|---|---|---|---|
| **Cơ chế Gameplay Toy 1 (Vệt Mực Thư Pháp & Biến đổi Tốc độ)** | Balance Lab Simulator Engine | **`PASS_SIMULATOR`** | File `tools/test/wave4-gameplay-toys.test.mjs` chạy Bun test: 7/7 Toy PASS (Bao gồm Toy 1 của Inka). |
| **Cân bằng số liệu & Độ dài trận đấu** | Balance Lab 200 Matches Sim | **`PASS_SIMULATOR (RED=0)`** | `tools/sim/candidates/inka.yml` chạy qua `production-26.mjs` đạt chỉ số cân bằng ổn định của một Pháp Sư Kiểm Soát Không Gian. |
| **Tương tác hình học & Hitbox thực chiến** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ kết nối binary Spawn engine và import model/VFX. |
| **Độ mượt hoạt ảnh & Tà áo thư pháp** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ rig và animation clip import theo Doc 28. |
| **Âm thanh cọ vung & Tiếng mực nổ** | Spawn Runtime Match | **`NOT_TESTED`** | Chờ tích hợp ngân hàng âm thanh Wwise/FMOD. |

---

## 2. Kịch Bản Kiểm Thử Thực Chiến Chi Tiết (Spawn Runtime Test Scenarios)

Khi binary game engine Spawn được kết nối, QA Tester thực hiện tuần tự 8 kịch bản kiểm thử sau:

### Kịch bản 1: Kiểm Thử Đòn Đánh Thường & Tầm Bắn (Basic Attack Test)
- **Thiết lập:** Đặt hình nộm đối phương ở cự ly $6.0\text{m}$. Nhấp chuột trái tấn công.
- **Tiêu chí PASS:**
  1. Giọt mực bắn ra từ đầu ngòi cọ sau $0.16\text{s}$ windup, bay với tốc độ $24\text{m/s}$.
  2. Va chạm trúng mục tiêu nảy sát thương phép ($100\%\text{AD} + 20\%\text{AP}$); không tiêu hao năng lượng.
- **Tiêu chí FAIL:** Đạn lệch cự ly, tính nhầm sát thương vật lý thuần, hoặc không có vệt sáng đạn đạo.

### Kịch bản 2: Kiểm Thử Đường Vẽ Mực Q & Gia Tốc Đồng Minh (Ink Path Q Ally Buff Test)
- **Thiết lập:** 1 Inka và 1 tướng đồng minh (Mộc Lẫm) đứng tại đường giữa. Inka bắn Q thẳng về phía trước.
- **Tiêu chí PASS:**
  1. Vệt mực trải dài đúng $8.5\text{m}$, bề rộng $1.5\text{m}$ trên sàn đấu.
  2. Mộc Lẫm và Inka bước lên vệt mực: Tốc độ di chuyển tăng ngay lập tức $+20\%$ so với tốc độ gốc.
  3. Khi bước ra khỏi vệt mực, tốc độ trở về bình thường sau $0.1\text{s}$.
- **Tiêu chí FAIL:** Không tạo được vệt mực; không tăng tốc chạy; hoặc buff tốc chạy vĩnh viễn không mất.

### Kịch bản 3: Kiểm Thử Làm Chậm Kẻ Địch Trên Vệt Mực (Ink Path Enemy Slow Test)
- **Thiết lập:** Đặt tướng địch (Bạch Diện) bước qua vệt mực của Inka.
- **Tiêu chí PASS:**
  1. Khi Bạch Diện chạm vào vệt mực, tốc độ chạy bị giảm đúng $25\%$.
  2. Nếu bị trúng trực tiếp luồng đạn Q, Bạch Diện bị giảm tốc độ $25\%$ trong $1.2\text{s}$ độc lập.
- **Tiêu chí FAIL:** Địch không bị giảm tốc; hoặc bị trói cứng sai quy cách.

### Kịch bản 4: Kiểm Thử Thời Gian Tồn Tại Vệt Mực (Ink Path Lifetime Test)
- **Thiết lập:** Inka bắn Q xuống sàn, bấm đồng hồ đo thời gian tồn tại.
- **Tiêu chí PASS:**
  1. Vệt mực giữ nguyên hiệu ứng trong đúng $4.0\text{s}$ ($\pm 0.05\text{s}$).
  2. Tại giây $4.0$, mực khô mờ dần và biến mất hoàn toàn tại $4.3\text{s}$.
- **Tiêu chí FAIL:** Vệt mực biến mất quá sớm (<3.8s) hoặc tồn tại vĩnh viễn trên bản đồ.

### Kịch bản 5: Kiểm Thử Khiên Tự Vệ W (Instant Shield PBAoE W Test)
- **Thiết lập:** Inka bị quái rừng tấn công. Bấm phím W.
- **Tiêu chí PASS:**
  1. Kỹ năng kích hoạt tức thì ($0\text{s}$ windup), Inka không bị dừng bước chạy.
  2. Nhận ngay lớp khiên ($65 - 205$) tồn tại đúng $2.5\text{s}$.
  3. Lớp khiên hấp thụ đúng lượng sát thương nhận vào trước khi trừ vào máu thực.
- **Tiêu chí FAIL:** Có độ trễ khựng bước; khiên không chặn sát thương; hoặc tồn tại sai thời gian.

### Kịch bản 6: Kiểm Thử Kích Nổ Giao Điểm E (Ink Detonation & Root Test)
- **Thiết lập:** Bắn Q tạo vệt mực, đặt hình nộm địch đứng trên vệt mực. Bấm E vào vùng có vệt mực.
- **Tiêu chí PASS:**
  1. Vệt mực trong bán kính $4.0\text{m}$ phát nổ cột khói mực.
  2. Hình nộm đứng trên mực nhận sát thương phép và bị Trói Chân (Root) đúng $1.0\text{s}$ (không thể di chuyển, vẫn đánh thường được).
  3. Nếu hình nộm đứng ngoài vệt mực (dù vẫn trong bán kính E), chỉ nhận sát thương phép mà KHÔNG bị trói chân.
- **Tiêu chí FAIL:** Trói chân toàn bộ dù không đứng trên mực; hoặc không trói chân mục tiêu trên mực.

### Kịch bản 7: Kiểm Thử Chiêu Cuối Chuẩn Doc 79 (Grand Ultimate R Test)
- **Thiết lập:** Inka tung chiêu R vào khu vực giao tranh tập trung 3 tướng địch và 2 tướng đồng minh.
- **Tiêu chí PASS:**
  1. **Pha 1 (0.0s - 0.3s):** Vòng chỉ thị đại trận $6.5\text{m}$ hiện rõ, âm thanh gồng bút vang dội.
  2. **Pha 2 & 3 (0.3s - 0.6s):** Năng lượng sơn thủy giáng xuống phát nổ, cả 3 tướng địch nhận đủ sát thương phép và bị làm chậm $40\%$ trong $2.0\text{s}$.
  3. **Pha 4 (0.6s - 4.0s):** Toàn bộ vùng $6.5\text{m}$ biến thành đầm mực đại trận, gia tốc $+20\%$ cho 2 tướng đồng minh và làm chậm $25\%$ kẻ địch bước vào.
- **Tiêu chí FAIL:** Bỏ qua giai đoạn gồng $0.3\text{s}$; nổ sai bán kính; hoặc không tạo ra đầm mực đại trận.

### Kịch bản 8: Kiểm Thử Tốc Biến D & Tương Tác Đồng Thời (Universal Dash D Test)
- **Thiết lập:** Inka đang lướt trên vệt mực, bấm phím D để né chiêu.
- **Tiêu chí PASS:**
  1. Inka lướt nhanh $4.5\text{m}$ theo hướng chỉ định trong $0.22\text{s}$.
  2. Không làm mất vệt mực dưới chân; tiếp tục nhận gia tốc sau khi kết thúc lướt.
- **Tiêu chí FAIL:** Bấm D bị kẹt animation hoặc vệt mực bị xóa bỏ.
