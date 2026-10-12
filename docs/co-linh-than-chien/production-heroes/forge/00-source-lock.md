# 00 · Source Lock — #17 Forge (Lò Cổ / Lò Nung Cổ Linh)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#17`
- `runtimeId`: `forge`
- `displayName`: `Forge`
- `productionWave`: `Wave 1 (Vertical Slice / Beginner Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../104-full-approved-roster-production-master-plan.md) | §1 Mục 6 & §4 Wave 1 | Cấp mã nghiên cứu độc bản `#17`, runtime `forge`, vai trò Tank (Đỡ đòn mở giao tranh), Core toy: Lò nhiệt dâng xả áp. |
| [100 — Rivalry Audit](../100-roster-v5-round4-selection-rivalry-audit.md) | §2.2 (Lò Cổ / Forge #17 từ Strong Keep) | Lao vào giữa lòng địch ăn đòn để tích nhiệt dâng cao, rồi mở van xả sóng lửa áp suất thiêu rụi kẻ bu bám. Đối lập hoàn toàn với Kora (#32 đỡ đòn khiên hướng thụ động). |
| [102 — Beginner Shortlist](../102-roster-v5-beginner-concept-shortlist.md) | §1 & §3 | Tuyển chọn chính thức vào nhóm 5 Tướng Nhập Môn Ưu Tiên cho Wave 1; đại diện cho vai trò Đỡ Đòn Tiền Tuyến. |
| [Candidate YAML](../../../tools/sim/candidates/forge.yml) | `tools/sim/candidates/forge.yml` | Thông số nền tảng, passive `heat_gauge` (heatPerDmgTaken: 0.04, heatPerHit: 12, heatPerCast: 15, shieldPerHeat: 1.6, ventDmgPerHeat: 1.2), Q đột kích hất văng, W khóa áp suất & xả áp, E phun hơi thiêu đốt, R đại bộc phá. |
| [Engine Toy Test](../../../tools/test/wave1-gameplay-toys.test.mjs) | `test("Toy 4: Forge heat gauge...")` | Kiểm chứng thành công việc tích nhiệt khi chịu đòn, tăng kháng và xả áp tạo khiên bộc phát trên simulator engine. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí & Thể hình độc bản:** Golem lò nung cổ đại hình trụ bằng hợp kim đồng thau và đá thô, ngực rực than hồng, hai tay mang Nắm Đấm Kim Loại Piston áp suất.
2. **Cơ chế cốt lõi:** Thanh Nhiệt Lò Nung (Heat Gauge). Tích nhiệt từ việc nhận sát thương (+0.04/dmg) và tung chiêu (+12/hit, +15/cast). Xả áp suất qua W tạo lớp khiên dày và nổ nhiệt diện rộng.
3. **Bản sắc Đỡ Đòn chủ động (Engage Tank):** Không đứng che chắn bị động như Kora. Forge lao thẳng vào đội hình địch, trừng phạt đối thủ vì dám đánh mình bằng cơ chế nhiệt bộc phát.
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng RMB làm skill độc lập trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xếp vào nhóm Strong Keep tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Chọn vào danh mục 5 Tướng Nhập Môn Ưu Tiên trong Tài liệu 102.
- **2026-10-12:** Đưa vào Master Plan Wave 1 tại Tài liệu 104; kiểm chứng engine trong `wave1-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
