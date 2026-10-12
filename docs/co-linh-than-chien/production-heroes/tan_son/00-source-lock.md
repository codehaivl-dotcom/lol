# 00 · Source Lock — #44 Tản Sơn (Thánh Sơn Cổ Thạch)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#44`
- `runtimeId`: `tan_son`
- `displayName`: `Tản Sơn` (Tiếng Anh: `Tan Son - Jade Colossus`)
- `productionWave`: `Wave 3 (Mythic Quintet & Roster Expansion)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 21 & §4 Wave 3 | Cấp mã nghiên cứu độc bản `#44`, runtime `tan_son`, phân lớp Đỡ Đòn / Kiến Tạo (Juggernaut / Maker / Tank). Core toy: Địa Hình Ngọc Bích Khả Thông & Thái Dương Đông Sơn Trấn Áp. |
| [103 — Mythic Quintet Bible](../../103-mythic-quintet-concept-bible.md) | §2.2 (Tản Sơn) | Phê duyệt chuẩn hình thể Colossus bán thân núi đá granite xám kết tinh ngọc bích xanh thẫm, ngực mang mặt Trống Đồng Thái Dương vàng rực, phân định Mythic Form vs Battle Form, core toy vách núi khả thông chống griefing. |
| [102 — Beginner Shortlist](../../102-roster-v5-beginner-concept-shortlist.md) | §1 Danh mục & §3.6 | Cảm hứng truyền thuyết Sơn Tinh dời non lấp bể; cơ chế tường ngọc bích đồng minh đi xuyên qua nhận khiên đá, kẻ địch bị chặn hoàn toàn. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | Phân định Đỡ đòn kiến tạo địa hình | Tách biệt phong cách kiến tạo địa hình với tướng phương Tây (Anivia/Trundle/Malphite); tường ngọc bích không gây bóp đồng đội, ngực phát quang mặt trời chỉ rõ hướng quay mặt. |
| [Candidate YAML](../../../../tools/sim/candidates/tan_son.yml) | `tools/sim/candidates/tan_son.yml` | Thông số nền tảng, passive `passable_ridge` (ridgeDuration 3.0s, ridgeShield 80, ridgeSlow 0.35, solarAsSlow 0.25), QWER kit và build đồ tanker. |
| [Engine Toy Test](../../../../tools/test/wave3-gameplay-toys.test.mjs) | `test("Toy 1: Tan Son passable jade ridge & solar aegis...")` | Kiểm chứng thành công dựng vách ngọc bích khả thông tăng chống chịu, vùng khiên đá và hiệu ứng giảm 25% tốc đánh địch của Thái Dương Đông Sơn trên engine simulator. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình Thể Cự Thạch Sống (Living Granite Colossus):** Colossus khổng lồ bán thân núi đá kết tinh từ granite xám ngàn năm đan xen các khối ngọc bích xanh thẫm. Lồng ngực ngự trị một mặt Trống Đồng Thái Dương vàng rực phát quang nguyên thủy. Không phải quái vật đá vô tri mà là một thần hộ mệnh mang bản sắc văn hóa Đông Sơn rực rỡ.
2. **Cơ chế Cốt Lõi 1 — Vách Núi Ngọc Bích Khả Thông (Passable Jade Ridge):** Dựng lũy ngọc bích ngăn hoàn toàn bước chân và đạn đạo của đối phương. Đồng minh được phép đi xuyên qua vách đá (hóa thể năng lượng mờ) và nhận thêm khiên đá bảo hộ. Loại bỏ 100% rủi ro nhốt chết hay cản trở đồng đội. Tái kích hoạt chủ động đập vỡ vách đá bắn mảnh vụn làm chậm kẻ địch xung quanh.
3. **Cơ chế Cốt Lõi 2 — Thái Dương Đông Sơn Trấn Áp (Solar Aegis of Dong Son):** Đĩa trống đồng trên ngực kích hoạt phát luồng sáng hào quang mặt trời nguyên thủy. Kẻ địch đối diện bị giảm tốc độ đánh và giảm tốc độ chạy; đồng thời chỉ rõ hướng quay mặt (facing direction) của Tản Sơn trong giao tranh hỗn loạn.
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn (W thay thế RMB cũ); D là Universal Dash phổ quát toàn game. Không dùng LMB/RMB làm tên skill trong tài liệu thiết kế.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Owner phê duyệt Bộ Ngũ Thần Thoại trong Tài liệu 103, xác nhận hình thể Cự Thạch Đông Sơn và cơ chế vách núi ngọc bích khả thông an toàn.
- **2026-10-12:** Đưa vào Master Plan Wave 3 tại Tài liệu 104; kiểm chứng thành công trong `wave3-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
