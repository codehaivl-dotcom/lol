# 00 · Source Lock — #40 Liễu Tiễn (Băng Cung Chiến Thuật)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#40`
- `runtimeId`: `lieu_tien`
- `displayName`: `Liễu Tiễn` (Tiếng Anh: `Lieu Tien - Frost Trail Ranger`)
- `productionWave`: `Wave 1 (Vertical Slice / Beginner Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) | §1 Mục 19 (Bảng Master 26) & §4 Wave 1 | Cấp mã nghiên cứu độc bản `#40`, runtime `lieu_tien`, vai trò Xạ thủ (Marksman), Wave 1. Core toy: Vệt sương băng rút lui. |
| [102 — Beginner Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md) | §3.3 LIỄU TIỄN (#40 — Xạ Thủ Sương Băng Chiến Thuật) | Khóa định hướng sửa đổi: Không sinh trụ băng va chạm vật lý phá vỡ navigation; dệt vệt băng tự nhiên ngay dưới chân theo hướng di chuyển khi vừa bắn vừa lùi. |
| [101 — Beginner Proposal](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/101-roster-v5-beginner-heroes-proposal.md) | §3.3 LIỄU TIỄN & §5 | Phân định rạch ròi với Ashe (LoL): Không làm chậm 100% mọi phát bắn thường; không bắn mưa tên hình nón (Volley); không đại tiễn choáng toàn bản đồ. |
| [100 — Rivalry Audit](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/100-roster-v5-round4-selection-rivalry-audit.md) | Phân định bộ tứ Xạ thủ (Aero #15, Iro #30, Nera #07, Liễu Tiễn #40) | Liễu Tiễn đại diện cho lối chơi xạ thủ thả diều cơ bản an toàn, bổ trợ kiểm soát không gian rút lui bằng mặt sàn trơn trượt. |
| [Candidate YAML](file:///d:/Project/Test/24tuong/tools/sim/candidates/lieu_tien.yml) | `tools/sim/candidates/lieu_tien.yml` | Thông số căn bản, passive `frost_trail` (shotsPerTrail: 3, trailRadius: 2.2, trailDuration: 3.0, +20% MS đồng minh, -25% MS địch), Q/W/E/R kit, tuning `{hp: 0.96, dmg: 1.02}`. |
| [Engine Toy Test](file:///d:/Project/Test/24tuong/tools/test/wave1-gameplay-toys.test.mjs) | `test("Toy 3: Lieu Tien frost trail - kiting speed boost & enemy slow without collision")` | Kiểm chứng thành công logic zone `frost_trail`, speed boost đồng minh và slow đối thủ trên simulator engine. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí độc bản:** Băng Cung Tinh Thạch Cổ Linh (Thần Cung Liễu Diệp). Thân cung thanh thoát như lá liễu uốn cong, đúc từ Băng Tinh Ngàn Năm kết hợp viền đồng thau cổ, mũi tên ngưng tụ từ khí lạnh Cổ Linh. Không bao giờ đổi sang súng máy, nỏ cơ khí hay gậy phép.
2. **Cơ chế cốt lõi — Vệt Sương Băng Rút Lui (Retreat Frost Trail):**
   - Tuyệt đối **KHÔNG tạo trụ băng hay vách đá va chạm vật lý** (không phá vỡ mesh navmesh tìm đường của lính và tướng).
   - Vệt sương băng xuất hiện tự động dưới chân khi Liễu Tiễn bắn trúng tướng địch trong khi đang di chuyển (vừa bắn vừa lùi) hoặc mỗi 3 phát bắn thường / khi dùng kỹ năng lùi bước W (`Sương Băng Thối Bộ`).
   - Tăng tốc độ chạy cho bản thân và đồng minh (+20%), làm chậm kẻ địch dẫm phải (-25%).
3. **Thoát bóng Ashe (LoL):**
   - Đòn đánh thường **KHÔNG tự động làm chậm 100% mọi phát bắn**. Sát thương đòn đánh là vật lý thuần túy.
   - Không có kỹ năng bắn quạt tên hình nón vô thưởng vô phạt.
   - Chiêu cuối R (`Cực Băng Đại Tiễn`) bắn mũi tên băng khổng lồ tầm xa 18.0m kích nổ Vùng Bão Tuyết Hội Tụ chia cắt tiền tuyến, có điểm rơi và telegraph rõ ràng, không phải đạn bay xuyên bản đồ may rủi.
4. **Input Contract chuẩn hóa (Doc 91):**
   - Đánh thường tách riêng (`basic_attack`).
   - Bốn slot chiêu thức cố định là **Q, W, E, R** (trong đó W thay thế slot rmb của bản nháp cũ).
   - Phím **D** là Universal Dash chung của toàn game, không đưa vào bộ chiêu thức tướng.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Đề xuất concept tại Tài liệu 101 (§3.3) với cơ chế cắm cọc băng (Frost Anchor).
- **2026-10-11:** Hội đồng thiết kế và Owner ghi nhận rủi ro cọc băng chặn lính gây vỡ pathfinding; chính thức duyệt chuyển đổi sang **Vệt Sương Băng Rút Lui không va chạm** tại Tài liệu 102 (§3.3).
- **2026-10-12:** Đưa vào Master Plan Wave 1 tại Tài liệu 104; triển khai candidate YAML và kiểm chứng thành công trong `wave1-gameplay-toys.test.mjs` (5/5 PASS, 0 RED).
- **Thẩm quyền:** Creator, Lead Gameplay Designer & Balance Lead đã ký duyệt canon lock.
