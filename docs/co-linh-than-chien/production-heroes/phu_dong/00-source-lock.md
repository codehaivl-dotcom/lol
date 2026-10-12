# 00 · Source Lock — #43 Phù Đổng (Thiết Mã Thiên Tướng)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#43`
- `runtimeId`: `phu_dong`
- `displayName`: `Phù Đổng` (Tiếng Anh: `Phu Dong - Iron Steed General`)
- `productionWave`: `Wave 2 (Expanded Roster / Mythic Vanguard)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) | §1 Mục 20 & §4 Wave 2 | Cấp mã nghiên cứu độc bản `#43`, runtime `phu_dong`, vai trò Tiên phong (Vanguard / Initiator / Fighter). Core toy: Thiết Mã Xung Lượng & Cổ Trúc Lôi Đình. |
| [103 — Mythic Quintet Bible](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/103-mythic-quintet-concept-bible.md) | §2.1 (Phù Đổng) | Phê duyệt chuẩn hình thể Mounted War Entity (chủ tướng cưỡi ngựa sắt, tuyệt đối không lai ghép Centaur), phân định Mythic Form vs Battle Form, core toy nhổ tre sấm sét. |
| [102 — Beginner Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md) | §1 Danh mục & §3.5 | Cảm hứng truyền thuyết Thánh Gióng; ngựa sắt và chủ tướng là một thực thể điều khiển thống nhất (1 hitbox, 1 controller, 1 thanh máu, không có cơ chế xuống ngựa). |
| [100 — Rivalry Audit](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/100-roster-v5-round4-selection-rivalry-audit.md) | Phân định Đấu sĩ kỵ mã | Tách bạch phong cách kỵ mã lôi hỏa với các tướng kỵ binh phương Tây; đòn đánh nặng uy lực chấn động, khai mở giao tranh trực diện. |
| [Candidate YAML](file:///d:/Project/Test/24tuong/tools/sim/candidates/phu_dong.yml) | `tools/sim/candidates/phu_dong.yml` | Thông số nền tảng, passive `mounted_momentum` (max 100, momentumPerSec 25, bonusMsRatio 0.20, chargeStun 0.6, chargeBonusAd 0.50), QWER kit. |
| [Engine Toy Test](file:///d:/Project/Test/24tuong/tools/test/wave2-gameplay-toys.test.mjs) | `test("Toy 1: Phu Dong mounted momentum & bamboo transformation...")` | Kiểm chứng thành công tích đà Xung Lượng, cú húc gây choáng và trạng thái Cổ Trúc mở rộng tầm quét 3.5m trên simulator engine. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình Thể Kỵ Mã Thần Thoại (Mounted War Entity):** Chủ tướng giáp trụ lôi đình uy nghi ngồi trên lưng Thiết Mã Cổ Linh đúc bằng đồng đen, mắt rực lửa và khớp nối phát quang năng lượng Tinh Thạch đỏ cam. **Tuyệt đối không phải Nhân mã lai ghép cơ thể (không phải Centaur)**; người và ngựa là hai cá thể gắn kết chặt chẽ qua hệ thống yên cương. Một controller điều khiển, một thanh máu, một footprint va chạm chung ($0.75\text{m}$), không có cơ chế xuống ngựa.
2. **Cơ chế Cốt Lõi 1 — Thiết Mã Xung Lượng (Mounted Momentum):** Duy trì di chuyển liên tục để tích tụ Xung Lượng (tối đa 100). Gia tăng tốc độ di chuyển tới $+20\%$. Khi đạt $\ge 80$ Xung Lượng, đòn đánh thường tiếp theo kích hoạt Cú Húc Lôi Hỏa gây thêm $+50\%$ AD sát thương vật lý và làm choáng $0.6\text{s}$ mục tiêu đầu tiên.
3. **Cơ chế Cốt Lõi 2 — Khoảnh Khắc Kiếm Gãy $\rightarrow$ Nhổ Tre Thần (Divine Bamboo Transformation):** Kích hoạt qua Kỹ Năng Tối Thượng (R). Thanh Cổ Thần Kiếm quá tải vỡ vụn, Phù Đổng nhổ bật cụm Thiên Lôi Cổ Trúc từ lòng đất trong thời gian chuyển dạng $0.4\text{s}$. Tầm đánh chuyển từ cự ly gần ($2.1\text{m}$) sang tầm quét hình quạt cực rộng ($3.5\text{m}$), mỗi đòn quét gây thêm $+35\%$ AD sát thương diện rộng trong 6.0 giây.
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng RMB làm skill độc lập trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Owner phê duyệt Bộ Ngũ Thần Thoại (Mythic Quintet) trong Tài liệu 103, xác nhận hình thể Thiết Mã và cơ chế nhổ Cổ Trúc.
- **2026-10-12:** Đưa vào Master Plan Wave 2 tại Tài liệu 104; kiểm chứng engine trong `wave2-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
