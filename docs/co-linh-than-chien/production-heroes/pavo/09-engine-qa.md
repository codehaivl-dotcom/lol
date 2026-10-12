# 09 · Engine QA — #35 Pavo (Khổng Tước Quạt Mắt Dọa Sợ)

**Trạng thái:** `QA_SPEC_LOCKED / TEST_PLAN_READY`  
**Khóa định danh:** `#35 / pavo`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 11 (Acceptance Bàn Giao)](../../11-acceptance-ban-giao.md), [Tài liệu 10 (Đối Soát Runtime)](../../10-doi-soat-runtime.md) & [Tài liệu 105 (Hero Factory Multi-Agent Workflow)](../../105-hero-factory-multi-agent-workflow.md)

---

## 1. Tóm Tắt Hiện Trạng Nghiệm Thu (Verification Status Summary)

Tuân thủ quy chế kỹ thuật trung thực của dự án: Không ghi `PASS_ENGINE` khống khi chưa có binary Spawn runtime kết nối trực tiếp.

| Hạng mục kiểm thử | Môi trường kiểm thử | Trạng thái hiện tại | Bằng chứng / File log đối soát |
|---|---|---|---|
| **Cơ chế Gameplay Toy 4 (Quạt Mắt Dọa Sợ Theo Hướng Nhìn Facing Vector)** | Balance Lab Simulator Engine | **`PASS_SIMULATOR`** | File `tools/test/wave4-gameplay-toys.test.mjs` chạy Bun test: 7/7 Toy PASS (Bao gồm Toy 4 của Pavo). |
| **Cân bằng số liệu & Độ dài trận đấu** | Balance Lab 200 Matches Sim | **`PASS_SIMULATOR (RED=0)`** | `tools/sim/candidates/pavo.yml` chạy qua `production-26.mjs` đạt chỉ số cân bằng ổn định của một Pháp Sư Khống Chế Anti-Dive. |
| **Tương tác hình học & Hitbox thực chiến** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ kết nối binary Spawn engine và import model/VFX. |
| **Độ mượt hoạt ảnh & Bộ quạt đuôi cơ khí** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ rig và animation clip import theo Doc 28. |
| **Âm thanh mở thấu kính & Tiếng laser vạn mắt** | Spawn Runtime Match | **`NOT_TESTED`** | Chờ tích hợp ngân hàng âm thanh Wwise/FMOD. |

---

## 2. Kịch Bản Kiểm Thử Thực Chiến Chi Tiết (Spawn Runtime Test Scenarios)

Khi binary game engine Spawn được kết nối, QA Tester thực hiện tuần tự 8 kịch bản kiểm thử sau:

### Kịch bản 1: Kiểm Thử Đòn Đánh Thường & Tầm Bắn (Basic Attack Test)
- **Thiết lập:** Đặt hình nộm đối phương ở cự ly $6.2\text{m}$. Nhấp chuột trái tấn công.
- **Tiêu chí PASS:**
  1. Lông vũ kim loại phóng ra sau $0.15\text{s}$ windup, bay với tốc độ $26\text{m/s}$.
  2. Va chạm trúng mục tiêu nảy sát thương phép ($100\%\text{AD} + 20\%\text{AP}$); không tiêu hao năng lượng.
- **Tiêu chí FAIL:** Đạn bay lệch cự ly, tính nhầm sát thương vật lý thuần, hoặc không có hiệu ứng phát quang.

### Kịch bản 2: Kiểm Thử Bắn Hình Quạt Q & Cơ Chế Shotgun (Fan Skillshot Q Test)
- **Thiết lập:** Bắn Q vào 3 hình nộm xếp hàng ngang ở cự ly $7.0\text{m}$; sau đó bắn Q vào 1 hình nộm ở cự ly $2.0\text{m}$.
- **Tiêu chí PASS:**
  1. Ở $7.0\text{m}$: 3 tia lông vũ bay xòe góc $35^\circ$, mỗi hình nộm trúng 1 tia nhận sát thương chuẩn và bị làm chậm $25\%$ trong $1.0\text{s}$.
  2. Ở $2.0\text{m}$: Cả 3 tia trúng cùng 1 hình nộm, gây tổng sát thương lớn hơn ($100\% + 40\% + 40\% = 180\%$).
- **Tiêu chí FAIL:** Đạn không xòe góc; hoặc không làm chậm mục tiêu.

### Kịch bản 3: Kiểm Thử Dọa Sợ Mục Tiêu Đối Diện W (Facing Vector Fear Test)
- **Thiết lập:** Cho hình nộm đối phương quay mặt trực diện vào Pavo ở cự ly $4.0\text{m}$ ($\vec{F}_{\text{target}} \cdot \vec{V}_{\text{to\_pavo}} \approx 1.0$). Pavo bấm W.
- **Tiêu chí PASS:**
  1. Quạt đuôi xòe bung tức thời, hình nộm lập tức bị dính hiệu ứng Hoảng Sợ (Fear / Flee) đúng $1.2\text{s}$.
  2. Hình nộm mất kiểm soát di chuyển, tự động quay đầu chạy ngược về phía sau.
  3. Trên đầu hình nộm hiện icon con mắt quang học tím. Ghi nhận `proc("passive:peacock_fear")`.
- **Tiêu chí FAIL:** Hình nộm không bị dính Fear; hoặc đứng yên thay vì chạy tháo thân.

### Kịch bản 4: Kiểm Thử Đối Thủ Quay Lưng Né Fear W (Turn Around Counterplay Test)
- **Thiết lập:** Cho hình nộm đối phương quay lưng lại Pavo ($\vec{F}_{\text{target}} \cdot \vec{V}_{\text{to\_pavo}} \approx -1.0$). Pavo bấm W ở cự ly $4.0\text{m}$.
- **Tiêu chí PASS:**
  1. Hình nộm **hoàn toàn không bị dính Hoảng Sợ (Fear)**; vẫn giữ nguyên quyền kiểm soát di chuyển của người chơi.
  2. Chỉ nhận hiệu ứng làm chậm nhẹ $35\%$ trong $1.2\text{s}$.
- **Tiêu chí FAIL:** Vẫn bị dính Fear dù đã quay lưng lại.

### Kịch bản 5: Kiểm Thử Khiên Tự Vệ W (Instant Shield PBAoE W Test)
- **Thiết lập:** Pavo bấm W khi bị tấn công.
- **Tiêu chí PASS:**
  1. Kỹ năng kích hoạt tức thì ($0\text{s}$ windup), Pavo không bị khựng bước chạy.
  2. Nhận ngay lớp khiên ($65 - 205 + 0.3\text{AP}$) tồn tại đúng $2.5\text{s}$.
  3. Lớp khiên hấp thụ đúng lượng sát thương nhận vào trước khi trừ vào máu thực.
- **Tiêu chí FAIL:** Khựng bước chạy; khiên không nhận sát thương; hoặc tồn tại sai thời gian.

### Kịch bản 6: Kiểm Thử Cầu Gương Quang Học E (Area Shatter E Test)
- **Thiết lập:** Bấm E vào vùng có 2 hình nộm ở cự ly $6.5\text{m}$.
- **Tiêu chí PASS:**
  1. Quả cầu gương xuất hiện sau $0.15\text{s}$ gồng niệm, vỡ tung thành các mảnh kính ánh sáng.
  2. Cả 2 hình nộm nhận sát thương phép ($50 - 170 + 0.50\text{AP}$) và bị làm chậm $30\%$ trong $1.2\text{s}$.
- **Tiêu chí FAIL:** Nổ lệch tâm chọn; hoặc không áp dụng làm chậm.

### Kịch bản 7: Kiểm Thử Chiêu Cuối Chuẩn Doc 79 (Grand Ultimate R Test)
- **Thiết lập:** Pavo tung R giữa 3 tướng địch trong bán kính $5.0\text{m}$.
- **Tiêu chí PASS:**
  1. **Pha 1 (0.0s - 0.25s):** Xoay người nhón gót, quạt đuôi vươn cao $2.5\text{m}$, 24 mắt công chớp sáng rực rỡ có viền hoa văn cảnh báo.
  2. **Pha 2 & 3 (0.25s - 0.45s):** Chớp sáng cực đại nổ tung, cả 3 tướng địch nhận đủ sát thương phép và bị **Làm Choáng (Stun) 0.8 giây** bất kể hướng nhìn.
  3. **Pha 4 (0.45s - 2.0s):** Vùng quang học duy trì lóa sáng trên sàn đấu.
- **Tiêu chí FAIL:** Bỏ qua giai đoạn niệm $0.25\text{s}$; nổ sai bán kính; hoặc không làm choáng mục tiêu.

### Kịch bản 8: Kiểm Thử Tốc Biến Lướt D Phối Hợp (Universal Dash D Test)
- **Thiết lập:** Kẻ địch quay lưng chạy, Pavo bấm D lướt vượt lên trước mặt rồi bấm W.
- **Tiêu chí PASS:**
  1. Pavo lướt $4.5\text{m}$ chớp nhoáng, đổi góc đối mặt thành công.
  2. Cú bấm W sau đó khiến kẻ địch lập tức dính Fear vì đã quay mặt trực diện vào Pavo mới.
- **Tiêu chí FAIL:** Kẹt animation giữa D và W; hoặc tính sai góc nhìn sau khi lướt.
