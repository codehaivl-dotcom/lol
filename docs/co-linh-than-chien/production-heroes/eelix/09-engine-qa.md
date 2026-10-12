# 09 · Engine QA — #33 Eelix (Lươn Sóng Thủy Uyên)

**Trạng thái:** `QA_SPEC_LOCKED / TEST_PLAN_READY`  
**Khóa định danh:** `#33 / eelix`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 11 (Acceptance Bàn Giao)](../../11-acceptance-ban-giao.md), [Tài liệu 10 (Đối Soát Runtime)](../../10-doi-soat-runtime.md) & [Tài liệu 105 (Hero Factory Multi-Agent Workflow)](../../105-hero-factory-multi-agent-workflow.md)

---

## 1. Tóm Tắt Hiện Trạng Nghiệm Thu (Verification Status Summary)

Tuân thủ quy chế kỹ thuật trung thực của dự án: Không ghi `PASS_ENGINE` khống khi chưa có binary Spawn runtime kết nối trực tiếp.

| Hạng mục kiểm thử | Môi trường kiểm thử | Trạng thái hiện tại | Bằng chứng / File log đối soát |
|---|---|---|---|
| **Cơ chế Gameplay Toy 6 (Vệt Nước Gia Tốc +35% MS & Đòn Đánh Sét Lan)** | Balance Lab Simulator Engine | **`PASS_SIMULATOR`** | File `tools/test/wave4-gameplay-toys.test.mjs` chạy Bun test: 7/7 Toy PASS (Bao gồm Toy 6 của Eelix). |
| **Cân bằng số liệu & Độ dài trận đấu** | Balance Lab 200 Matches Sim | **`PASS_SIMULATOR (RED=0)`** | `tools/sim/candidates/eelix.yml` chạy qua `production-26.mjs` đạt chỉ số hạ gục và đột kích đúng chuẩn Sát Thủ Cơ Động. |
| **Tương tác hình học & Hitbox thực chiến** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ kết nối binary Spawn engine và import model/VFX. |
| **Độ mượt hoạt ảnh & Trườn lơ lửng 0.3m** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ rig và animation clip import theo Doc 28. |
| **Âm thanh phóng điện & Rít nước Thủy Uyên** | Spawn Runtime Match | **`NOT_TESTED`** | Chờ tích hợp ngân hàng âm thanh Wwise/FMOD. |

---

## 2. Kịch Bản Kiểm Thử Thực Chiến Chi Tiết (Spawn Runtime Test Scenarios)

Khi binary game engine Spawn được kết nối, QA Tester thực hiện tuần tự 8 kịch bản kiểm thử sau:

### Kịch bản 1: Kiểm Thử Đòn Đánh Thường & Tầm Cận Chiến (Basic Attack Test)
- **Thiết lập:** Đặt hình nộm đối phương ở cự ly $1.7\text{m}$. Nhấp chuột trái tấn công.
- **Tiêu chí PASS:**
  1. Cú cắn xé diễn ra sau $0.12\text{s}$ windup, va chạm cận chiến chính xác.
  2. Nảy sát thương vật lý ($100\%\text{AD}$); không tiêu hao bất kỳ tài nguyên nào.
- **Tiêu chí FAIL:** Đòn đánh ngoài tầm 1.7m; tính nhầm sát thương phép; hoặc trừ mana.

### Kịch bản 2: Kiểm Thử Lướt Q & Vệt Nước Bóng Tối (Dash Q & Shadow Wake Test)
- **Thiết lập:** Nhắm Q vào khoảng trống dài $7.2\text{m}$.
- **Tiêu chí PASS:**
  1. Eelix lướt vút đi trọn vẹn $7.2\text{m}$ với tốc độ $30\text{m/s}$ trong $0.24\text{s}$.
  2. Một vệt nước bóng tối đen tuyền trải dài đúng $7.2\text{m}$, rộng $1.4\text{m}$ trên sàn đấu.
  3. Vệt nước tồn tại đúng $3.5\text{s}$ rồi tự phân rã bốc hơi.
- **Tiêu chí FAIL:** Lướt hụt khoảng cách; không tạo vệt nước; hoặc vệt nước tồn tại vĩnh viễn.

### Kịch bản 3: Kiểm Thử Tăng Tốc +35% MS Trên Vệt Nước (Speed Modulation Test)
- **Thiết lập:** Đo tốc độ chạy của Eelix khi ở ngoài vệt nước và khi trườn trên vệt nước.
- **Tiêu chí PASS:**
  1. Ngoài vệt nước: Tốc độ di chuyển đạt chuẩn $6.6\text{m/s}$.
  2. Trên vệt nước: Tốc độ di chuyển tăng vọt đúng $+35\%$ (đạt $\sim 8.91\text{m/s}$).
  3. Khi bước ra khỏi vệt nước, tốc độ trở về $6.6\text{m/s}$ ngay lập tức.
- **Tiêu chí FAIL:** Không tăng tốc chạy; hoặc tăng tốc sai tỷ lệ.

### Kịch bản 4: Kiểm Thử Đòn Đánh Sét Lan (Chain Lightning Passive Test)
- **Thiết lập:** Đặt 2 hình nộm đứng cạnh nhau cự ly $2.0\text{m}$. Eelix đứng trên vệt nước và đánh thường vào hình nộm 1.
- **Tiêu chí PASS:**
  1. Hình nộm 1 nhận sát thương vật lý gốc $100\%\text{AD}$.
  2. Một tia sét cyan giật từ hình nộm 1 sang hình nộm 2, gây thêm sát thương phép $+45\%\text{bonus AD}$.
  3. Kích hoạt sự kiện `proc("passive:shadow_wake_strike")`.
- **Tiêu chí FAIL:** Không giật sét sang mục tiêu 2; hoặc giật sét khi Eelix đang đứng ngoài vệt nước.

### Kịch bản 5: Kiểm Thử Khiên & Chống Làm Chậm W (Instant Shield W Test)
- **Thiết lập:** Eelix bị dính hiệu ứng làm chậm $40\%$. Bấm phím W.
- **Tiêu chí PASS:**
  1. Kỹ năng kích hoạt tức thì ($0\text{s}$ windup), Eelix không bị khựng đà trườn.
  2. Nhận ngay lớp khiên ($60 - 200$) trong $2.5\text{s}$.
  3. Hiệu ứng làm chậm bị xóa bỏ hoàn toàn trong $1.0\text{s}$ đầu tiên (Slow Immunity).
- **Tiêu chí FAIL:** Bị khựng bước; hoặc không miễn nhiễm làm chậm.

### Kịch bản 6: Kiểm Thử Xung Điện Diện Rộng E (Electric Surge E Test)
- **Thiết lập:** Bấm E giữa 2 hình nộm kẻ địch trong bán kính $3.0\text{m}$.
- **Tiêu chí PASS:**
  1. Vụ nổ điện bùng lên quanh thân Eelix trong $0.1\text{s}$.
  2. Cả 2 hình nộm nhận sát thương vật lý ($50 - 170 + 0.50\text{AD}$) và bị làm chậm $35\%$ trong $1.0\text{s}$.
- **Tiêu chí FAIL:** Không gây sát thương; hoặc không làm chậm mục tiêu.

### Kịch bản 7: Kiểm Thử Chiêu Cuối Xuyên Thủng R Chuẩn Doc 79 (Grand Ultimate R Test)
- **Thiết lập:** Khóa R vào hình nộm chủ lực ở cự ly $7.5\text{m}$.
- **Tiêu chí PASS:**
  1. **Pha 1 (0.0s - 0.2s):** Cuộn tròn thân hình xoắn ốc nạp năng lượng, tia laser khóa mục tiêu hiển thị rõ ràng.
  2. **Pha 2 & 3 (0.2s - 0.45s):** Lao thẳng xuyên qua ngực mục tiêu, gây sát thương vật lý bộc phát lớn ($190 - 390 + 1.20\text{bonus AD}$) và **Làm Choáng 0.8 giây**.
  3. **Pha 4 (0.45s - 1.5s):** Điểm va chạm bốc khói nước đen và tia điện tĩnh.
- **Tiêu chí FAIL:** Lao trượt mục tiêu đã khóa; không gây choáng; hoặc bỏ qua thời gian tích lực $0.2\text{s}$.

### Kịch bản 8: Kiểm Thử Toàn Bộ Kit Không Tốn Mana (Manaless Verification Test)
- **Thiết lập:** Xả liên tục toàn bộ combo Q -> W -> E -> R -> D trong 5 giây.
- **Tiêu chí PASS:**
  1. Toàn bộ chuỗi kỹ năng thi triển mượt mà không có bất kỳ thông báo lỗi cạn kiệt mana nào.
  2. Thanh nội năng/mana luôn giữ giá trị 0 hoặc không hiển thị trên HUD.
- **Tiêu chí FAIL:** Xuất hiện lỗi thiếu tài nguyên khi xả chiêu.
