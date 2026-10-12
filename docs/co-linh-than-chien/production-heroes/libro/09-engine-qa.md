# 09 · Engine QA — #28 Libro (Sổ Nợ Nghiệp Báo)

**Trạng thái:** `QA_SPEC_LOCKED / TEST_PLAN_READY`  
**Khóa định danh:** `#28 / libro`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 11 (Acceptance Bàn Giao)](../../11-acceptance-ban-giao.md), [Tài liệu 10 (Đối Soát Runtime)](../../10-doi-soat-runtime.md) & [Tài liệu 105 (Hero Factory Multi-Agent Workflow)](../../105-hero-factory-multi-agent-workflow.md)

---

## 1. Tóm Tắt Hiện Trạng Nghiệm Thu (Verification Status Summary)

Tuân thủ quy chế kỹ thuật trung thực của dự án: Không ghi `PASS_ENGINE` khống khi chưa có binary Spawn runtime kết nối trực tiếp.

| Hạng mục kiểm thử | Môi trường kiểm thử | Trạng thái hiện tại | Bằng chứng / File log đối soát |
|---|---|---|---|
| **Cơ chế Gameplay Toy 3 (Sổ Nợ Hoãn Sát Thương & Trả Nợ Đáo Hạn)** | Balance Lab Simulator Engine | **`PASS_SIMULATOR`** | File `tools/test/wave4-gameplay-toys.test.mjs` chạy Bun test: 7/7 Toy PASS (Bao gồm Toy 3 của Libro). |
| **Cân bằng số liệu & Độ dài trận đấu** | Balance Lab 200 Matches Sim | **`PASS_SIMULATOR (RED=0)`** | `tools/sim/candidates/libro.yml` chạy qua `production-26.mjs` đạt chỉ số sống sót và bảo kê đúng chuẩn Hỗ Trợ Chống Sốc Đòn. |
| **Tương tác hình học & Hitbox thực chiến** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ kết nối binary Spawn engine và import model/VFX. |
| **Độ mượt hoạt ảnh & Bệ đá lơ lửng** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ rig và animation clip import theo Doc 28. |
| **Âm thanh lật sách & Tiếng đập đại thư phán quyết** | Spawn Runtime Match | **`NOT_TESTED`** | Chờ tích hợp ngân hàng âm thanh Wwise/FMOD. |

---

## 2. Kịch Bản Kiểm Thử Thực Chiến Chi Tiết (Spawn Runtime Test Scenarios)

Khi binary game engine Spawn được kết nối, QA Tester thực hiện tuần tự 8 kịch bản kiểm thử sau:

### Kịch bản 1: Kiểm Thử Đòn Đánh Thường & Tầm Bắn (Basic Attack Test)
- **Thiết lập:** Đặt hình nộm đối phương ở cự ly $6.0\text{m}$. Nhấp chuột trái tấn công.
- **Tiêu chí PASS:**
  1. Phiến đá thẻ tre bay ra sau $0.15\text{s}$ windup, bay với tốc độ $24\text{m/s}$.
  2. Va chạm trúng mục tiêu nảy sát thương phép ($100\%\text{AD} + 20\%\text{AP}$); không tốn mana.
- **Tiêu chí FAIL:** Đạn bay lệch hướng, tính nhầm sát thương vật lý thuần, hoặc không có hiệu ứng phát sáng.

### Kịch bản 2: Kiểm Thử Phiến Đá Q & Làm Chậm (Skillshot Q Test)
- **Thiết lập:** Nhắm bắn Q vào hình nộm kẻ địch ở cự ly $8.0\text{m}$.
- **Tiêu chí PASS:**
  1. Phiến đá cổ tự bay nhanh $28\text{m/s}$.
  2. Chạm mục tiêu nảy sát thương phép và làm chậm tốc độ chạy đúng $25\%$ trong $1.2\text{s}$.
- **Tiêu chí FAIL:** Đạn bay lệch đường chỉ thị; hoặc không làm chậm mục tiêu.

### Kịch bản 3: Kiểm Thử Hoãn Sát Thương Sổ Nợ W (70% Debt Postponement Test)
- **Thiết lập:** 1 Libro đi cùng 1 tướng đồng minh (Liễu Tiễn). Libro bấm W. Kẻ địch gây $200$ sát thương lên Liễu Tiễn.
- **Tiêu chí PASS:**
  1. Liễu Tiễn chỉ mất tối đa $60$ máu thực ($30\%$).
  2. $140$ sát thương còn lại ($70\%$) được chuyển thành thanh Nợ Treo màu xám viền đỏ trên đầu Liễu Tiễn.
  3. Kích hoạt sự kiện `proc("passive:debt_postponed")`.
- **Tiêu chí FAIL:** Trừ thẳng $200$ máu vào thanh máu thực; không hiển thị thanh nợ màu xám.

### Kịch bản 4: Kiểm Thử Khấu Trừ Nợ Bằng Hồi Máu/Khiên (Debt Deduction Test)
- **Thiết lập:** Liễu Tiễn đang có $140$ Nợ Treo. Libro dùng chiêu E hồi phục $100$ máu cho Liễu Tiễn.
- **Tiêu chí PASS:**
  1. Khoản Nợ Treo giảm ngay từ $140$ xuống còn $40$.
  2. Máu thực của Liễu Tiễn không bị tăng vượt quá mức cho đến khi thanh nợ được thanh toán hết.
- **Tiêu chí FAIL:** Máu thực tăng lên trong khi nợ treo vẫn giữ nguyên $140$.

### Kịch bản 5: Kiểm Thử Nợ Đáo Hạn Sau 2.5s (Debt Maturity & DoT Payback Test)
- **Thiết lập:** Mục tiêu có $100$ Nợ Treo, đứng yên không nhận thêm hồi máu trong $3.0\text{s}$.
- **Tiêu chí PASS:**
  1. Sau đúng $2.5\text{s}$, thanh Nợ Treo biến mất.
  2. Mục tiêu bắt đầu nhận sát thương DoT chia đều trong $3.0\text{s}$ tiếp theo, trừ tổng cộng đúng $100$ máu thực.
- **Tiêu chí FAIL:** Nợ biến mất mà không trừ máu (biến thành bất tử sai quy chuẩn); hoặc trừ ngay lập tức $100$ máu trong 1 khung hình.

### Kịch bản 6: Kiểm Thử Cứu Nguy Đơn Mục Tiêu E (Targeted Ally E Heal & Speed Test)
- **Thiết lập:** Chỉ định chiêu E vào tướng đồng minh bị thương ở cự ly $7.0\text{m}$.
- **Tiêu chí PASS:**
  1. Cuộn thư cổ bay tới bao bọc đồng minh trong $0.1\text{s}$.
  2. Hồi lượng máu chuyên biệt ($50 - 170 + 0.35\text{AP}$) và tăng tốc chạy $25\%$ trong $1.5\text{s}$.
- **Tiêu chí FAIL:** Bay trượt mục tiêu; không tăng tốc chạy; hoặc không hồi máu.

### Kịch bản 7: Kiểm Thử Đại Trận Chung Quyết Phán Thư R Chuẩn Doc 79 (Grand Ultimate R Test)
- **Thiết lập:** Libro kích hoạt R trong giao tranh tổng 5v5.
- **Tiêu chí PASS:**
  1. **Pha 1 & 2 (0.0s - 0.25s):** Bay lên $1.0\text{m}$, đại thư mở bung phóng to, hai tay đập trang sách phát tiếng sấm rền.
  2. **Pha 3 (0.25s - 0.5s):** Cột sóng xung kích giáng xuống, toàn bộ đồng minh nhận đại khiên ($110 - 230$), hồi máu lớn ($90 - 210$) và trạng thái hoãn $70\%$ sát thương.
  3. **Pha 4 (0.5s - 3.5s):** Mái vòm cổ tự $6.5\text{m}$ duy trì bảo vệ toàn đội và làm chậm $35\%$ quân địch.
- **Tiêu chí FAIL:** Nổ sai bán kính; không áp dụng hoãn nợ diện rộng; hoặc bỏ qua thời gian niệm $0.25\text{s}$.

### Kịch bản 8: Kiểm Thử Tốc Biến Lướt D (Universal Dash D Test)
- **Thiết lập:** Libro đang lơ lửng, bấm phím D để né đòn tập kích.
- **Tiêu chí PASS:**
  1. Bệ đá Tinh Thạch lướt vút $4.5\text{m}$ trong $0.22\text{s}$.
  2. Không làm gián đoạn trạng thái hoãn nợ của Sổ Nợ nếu đang trong thời gian hiệu lực.
- **Tiêu chí FAIL:** Khựng bước sau khi lướt hoặc làm mất thanh nợ.
