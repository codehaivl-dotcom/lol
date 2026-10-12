# 00 · Source Lock — #30 Iro (Mắt Thiên Cơ)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#30`
- `runtimeId`: `iro`
- `displayName`: `Iro` (Tiếng Anh: `Iro - Celestial Oculus Static Sniper`)
- `productionWave`: `Wave 3 (Extreme Range Sniper & Static Focus Artillery)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../104-full-approved-roster-production-master-plan.md) | §1 Mục 1 & §4 Wave 3 | Khóa chính thức ID `#30`, runtime `iro`, vai trò Xạ thủ (Marksman). Core toy: Sniper mắt cơ khí, đứng yên lấy nét tăng cự ly bắn tỉa tầm cực xa. Đưa vào Wave 3 dây chuyền sản xuất. |
| [100 — Rivalry Audit](../100-roster-v5-round4-selection-rivalry-audit.md) | §2 Mục 4 (Mắt Thiên Cơ / Iro #30) | Xác nhận "Strong Keep" (Top 10 hạt nhân độc bản). Trả lời 5 câu hỏi cốt lõi: Nhãn cầu máy ngắm bắn tĩnh kiên nhẫn, đứng yên lấy nét tăng cự ly (+1.5m/s, max +6m) và sát thương (+30%). Phản chế: Nhìn tia laser đỏ báo trước $1.0\text{s}$ để bước né sang hai bên; luồn ra sau bắt Iro đang bất động. |
| [102 — Beginner Shortlist](../102-roster-v5-beginner-concept-shortlist.md) | §1 & §2 (Concept Lịch Sử Đã Thay Thế) | Xác nhận `#30-OLD Kipa` đã bị loại bỏ/thay thế bằng `Iro #30`; giữ vững bản sắc khối nhãn cầu máy cổ lơ lửng gồm 3 vòng kim loại đồng tâm xoay quanh thấu kính pha lê đỏ. |
| [Candidate YAML](../../../tools/sim/candidates/iro.yml) | `tools/sim/candidates/iro.yml` | Thông số nền tảng, passive `laser_sniper` (`focusPerSec: 1.5`, `maxFocusRange: 6.0`, `focusDmgBonus: 0.30`, `laserWarnTime: 1.0`), Q tụ quang xuyên phá $12.0\text{m}$, W (rmb) thấu kính phòng vệ đẩy lùi, E khóa tiêu cự giảm giáp, R thiên cơ hủy diệt pháo vệ tinh $22.0\text{m}$. |
| [Engine Toy Test](../../../tools/test/wave3-gameplay-toys.test.mjs) | `test("Toy 8: Iro static focus sniper range expansion")` | Kiểm chứng thành công cơ chế đứng yên tích lũy `focusTime`, mở rộng cự ly đòn đánh cơ bản từ $7.5\text{m} \rightarrow 13.5\text{m}$ bắn trúng Dummy cách $10.5\text{m}$, di chuyển sẽ lập tức hủy bỏ tiêu cự. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thể & Silhouette — Khối Nhãn Cầu Cơ Khí Cổ Đại Lơ Lửng:** Iro không phải là xạ thủ người cầm súng trường thông thường! Iro là một khối nhãn cầu máy cổ lơ lửng (`floating_celestial_oculus`), gồm 3 vòng kim loại đồng tâm bằng đồng thau chạm khắc hoa văn Cổ Linh xoay quanh thấu kính pha lê đỏ rực ở tâm. Lơ lửng không chân, khi đứng yên các vòng kim loại mở rộng khóa chốt neo năng lượng vào không gian.
2. **Vũ khí chính — Thấu Kính Pha Lê Xung Kích & Pháo Laser Vệ Tinh:** Năng lượng ánh sáng hội tụ qua lăng kính pha lê đỏ, bắn ra các tia xung kích laser thẳng tắp với tầm xa phi thường.
3. **Cơ chế Cốt Lõi — Mắt Thiên Cơ Ngắm Tĩnh Tầm Cực Xa (Laser Sniper / Static Focus):** Khi đứng yên, Iro tích tụ tiêu cự tăng tầm đánh cơ bản $+1.5\text{m}$ mỗi giây (`focusPerSec: 1.5`), tối đa tăng thêm $+6.0\text{m}$ (đạt tổng cự ly $13.5\text{m}$). Khi đạt trạng thái ngắm tối đa, sát thương tăng $+30\%$ (`focusDmgBonus: 0.30`). Tia laser đỏ chiếu rọi mục tiêu cảnh báo trước $1.0\text{s}$ (`laserWarnTime: 1.0`). Bất kỳ hành động di chuyển nào sẽ hủy tiêu cự về 0.
4. **Quyết định liên tục của người chơi:** Đứng yên tích ngắm để lấy tầm bắn và sát thương tối đa hay hủy ngắm để tháo chạy trước sự áp sát của sát thủ đối phương?
5. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; kỹ năng Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng LMB/RMB làm tên chiêu thức trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100), định hình xạ thủ ngắm tĩnh tầm xa độc nhất vô nhị.
- **2026-10-11:** Phê duyệt thay thế Kipa cũ `#30-OLD` bằng Iro `#30` trong Tài liệu 102.
- **2026-10-12:** Đưa vào Master Plan Wave 3 (Tài liệu 104); kiểm chứng thành công trên simulator engine trong `wave3-gameplay-toys.test.mjs` (Toy 8).
- **Thẩm quyền:** Lead Game Designer & Technical Combat Designer đã ký duyệt canon lock.
