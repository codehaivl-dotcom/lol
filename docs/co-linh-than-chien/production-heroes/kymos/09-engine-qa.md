# 09 · Engine QA — #49 Kymos (Thạch Âm Điểm Rung Hạ Âm)

**Trạng thái:** `QA_SPEC_LOCKED / TEST_PLAN_READY`  
**Khóa định danh:** `#49 / kymos`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 11 (Acceptance Bàn Giao)](../../11-acceptance-ban-giao.md), [Tài liệu 10 (Đối Soát Runtime)](../../10-doi-soat-runtime.md) & [Tài liệu 105 (Hero Factory Multi-Agent Workflow)](../../105-hero-factory-multi-agent-workflow.md)

---

## 1. Tóm Tắt Hiện Trạng Nghiệm Thu (Verification Status Summary)

Tuân thủ quy chế kỹ thuật trung thực của dự án: Không ghi `PASS_ENGINE` khống khi chưa có binary Spawn runtime kết nối trực tiếp.

| Hạng mục kiểm thử | Môi trường kiểm thử | Trạng thái hiện tại | Bằng chứng / File log đối soát |
|---|---|---|---|
| **Cơ chế Gameplay Toy 5 (Điểm Rung Hạ Âm Triệt Tiêu 40% Sát Thương Sốc)** | Balance Lab Simulator Engine | **`PASS_SIMULATOR`** | File `tools/test/wave4-gameplay-toys.test.mjs` chạy Bun test: 7/7 Toy PASS (Bao gồm Toy 5 của Kymos). |
| **Cân bằng số liệu & Độ dài trận đấu** | Balance Lab 200 Matches Sim | **`PASS_SIMULATOR (RED=0)`** | `tools/sim/candidates/kymos.yml` chạy qua `production-26.mjs` đạt chỉ số chống chịu và bảo kê đúng chuẩn Support Anti-Burst. |
| **Tương tác hình học & Hitbox thực chiến** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ kết nối binary Spawn engine và import model/VFX. |
| **Độ mượt hoạt ảnh & Giá treo khánh đá** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ rig và animation clip import theo Doc 28. |
| **Âm thanh gõ đá & Sóng hạ âm sub-bass** | Spawn Runtime Match | **`NOT_TESTED`** | Chờ tích hợp ngân hàng âm thanh Wwise/FMOD. |

---

## 2. Kịch Bản Kiểm Thử Thực Chiến Chi Tiết (Spawn Runtime Test Scenarios)

Khi binary game engine Spawn được kết nối, QA Tester thực hiện tuần tự 8 kịch bản kiểm thử sau:

### Kịch bản 1: Kiểm Thử Đòn Đánh Thường & Tầm Bắn (Basic Attack Test)
- **Thiết lập:** Đặt hình nộm đối phương ở cự ly $5.8\text{m}$. Nhấp chuột trái tấn công.
- **Tiêu chí PASS:**
  1. Đĩa sóng âm gõ ra từ khánh đá bay với tốc độ $24\text{m/s}$ sau $0.16\text{s}$ windup.
  2. Va chạm trúng mục tiêu nảy sát thương phép ($100\%\text{AD} + 20\%\text{AP}$); không tiêu hao năng lượng.
- **Tiêu chí FAIL:** Đạn bay lệch cự ly, tính nhầm sát thương vật lý thuần, hoặc phát ra tiếng chuông nước sai quy chuẩn.

### Kịch bản 2: Kiểm Thử Sóng Rung Q & Làm Chậm (Skillshot Q Test)
- **Thiết lập:** Nhắm bắn Q vào hình nộm kẻ địch ở cự ly $7.5\text{m}$.
- **Tiêu chí PASS:**
  1. Sóng chấn hạ âm xới tung đất đá bay với tốc độ $26\text{m/s}$.
  2. Chạm hình nộm nảy sát thương phép và làm chậm tốc độ chạy đúng $30\%$ trong $1.2\text{s}$.
- **Tiêu chí FAIL:** Đạn bay lệch đường decal chỉ thị; hoặc không làm chậm mục tiêu.

### Kịch bản 3: Kiểm Thử Giảm 40% Sát Thương Sốc Vùng Cọc W (40% Burst Mitigation Test)
- **Thiết lập:** Kymos cắm Điểm Rung W. Tướng đồng minh (Mộc Lẫm) đứng cách cọc $2.0\text{m}$ (trong bán kính $4.5\text{m}$). Kẻ địch tung cú đâm $100$ sát thương vật lý lên Mộc Lẫm.
- **Tiêu chí PASS:**
  1. Mộc Lẫm chỉ phải chịu tối đa $60$ sát thương (giảm đúng $40\%$).
  2. Kích hoạt sự kiện `proc("passive:acoustic_mitigation")`.
  3. Lớp khiên của W hấp thụ lượng sát thương đã được giảm trừ này.
- **Tiêu chí FAIL:** Mộc Lẫm nhận trọn $100$ sát thương; hoặc giảm sát thương sai tỷ lệ (<35% hoặc >45%).

### Kịch bản 4: Kiểm Thử Ngoài Vùng Cọc Không Nhận Giảm Sát Thương (Boundary Check Test)
- **Thiết lập:** Cắm cọc W. Tướng đồng minh đứng cách cọc $5.5\text{m}$ (ngoài bán kính $4.5\text{m}$ của cọc nhưng trong bán kính buff khiên). Kẻ địch gây $100$ sát thương.
- **Tiêu chí PASS:**
  1. Đồng minh chỉ nhận lớp khiên nhưng **không nhận buff giảm 40% sát thương sốc**; sát thương nhận vào tính nguyên bản $100$.
- **Tiêu chí FAIL:** Vẫn được giảm 40% sát thương dù đã đứng ngoài bán kính 4.5m của cọc.

### Kịch bản 5: Kiểm Thử Thời Gian Tồn Tại Cọc 3.5s (Node Lifetime Test)
- **Thiết lập:** Kymos cắm W xuống sàn, bấm đồng hồ đo thời gian.
- **Tiêu chí PASS:**
  1. Cọc đá và vùng sóng hạ âm duy trì hiệu lực đúng $3.5\text{s}$ ($\pm 0.05\text{s}$).
  2. Tại giây $3.5$, cọc đá nứt vỡ tan biến và hiệu ứng giảm sát thương chấm dứt ngay lập tức.
- **Tiêu chí FAIL:** Cọc biến mất quá sớm (<3.3s) hoặc tồn tại vĩnh viễn trên sân.

### Kịch bản 6: Kiểm Thử Đẩy Lùi Tự Vệ E (Infrasonic Peel E Test)
- **Thiết lập:** Tướng sát thủ (Kiko) áp sát Kymos ở cự ly $1.5\text{m}$. Kymos bấm phím E.
- **Tiêu chí PASS:**
  1. Đĩa sóng âm quét ngang $360^\circ$ quanh người trong $0.1\text{s}$.
  2. Kiko bị đẩy lùi nhẹ ra xa $1.5\text{m}$, nhận sát thương phép và bị làm chậm $25\%$ trong $1.2\text{s}$.
- **Tiêu chí FAIL:** Không đẩy lùi mục tiêu; hoặc đẩy lùi quá xa (>2.5m) sai quy cách hỗ trợ.

### Kịch bản 7: Kiểm Thử Đại Sóng Hạ Âm R Chuẩn Doc 79 (Grand Ultimate R Test)
- **Thiết lập:** Kymos kích hoạt R trong giao tranh tổng 5v5.
- **Tiêu chí PASS:**
  1. **Pha 1 & 2 (0.0s - 0.25s):** Nâng cao nắm đấm đá, dộng mạnh xuống sàn; toàn bộ âm thanh tạp âm bị nén tắt (audio ducking).
  2. **Pha 3 (0.25s - 0.5s):** Đại sóng hạ âm dội sàn bán kính $6.5\text{m}$, toàn bộ đồng minh nhận đại khiên ($90 - 190$) và hồi phục lớn ($110 - 230$).
  3. **Pha 4 (0.5s - 3.5s):** Toàn bộ kẻ địch bị làm chậm $35\%$ trong $2.0\text{s}$, mặt sàn duy trì sóng rung chấn.
- **Tiêu chí FAIL:** Nổ sai bán kính; không hồi máu/khiên; hoặc không có hiệu ứng âm thanh sub-bass đặc trưng.

### Kịch bản 8: Kiểm Thử Húc Vai Dash D (Universal Dash D Test)
- **Thiết lập:** Kymos bấm D lướt lên chắn trước mặt xạ thủ.
- **Tiêu chí PASS:**
  1. Kymos lướt $4.5\text{m}$ trong $0.22\text{s}$, va chạm mượt mà không bị kẹt địa hình.
  2. Có thể bấm W ngay lập tức tại điểm tiếp đất để cắm cọc bảo vệ.
- **Tiêu chí FAIL:** Khựng bước sau khi lướt hoặc không thể hủy anim để cắm cọc.
