# 00 · Source Lock — #39 Kael (Cuồng Đao / Cuồng Nhịp)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#39`
- `runtimeId`: `kael`
- `displayName`: `Kael`
- `productionWave`: `Wave 1 (Vertical Slice / Beginner Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../104-full-approved-roster-production-master-plan.md) | §1 Mục 18 & §4 Wave 1 | Cấp mã nghiên cứu độc bản `#39`, runtime `kael`, vai trò Skirmisher (Đấu sĩ đánh tay), Core toy: Cuồng nhịp chém liên hoàn. |
| [102 — Beginner Shortlist](../102-roster-v5-beginner-concept-shortlist.md) | §3.2 (Kael #39) | Chém tay tích tầng Cuồng Nhịp (+8% AS/tầng, max 5 tầng); suy giảm dần sau 2.0s; phân định rõ quy tắc mục tiêu (Tướng 100%, Lính/quái max 2 tầng 30% hồi phục, Trụ 0 tầng 0 hồi phục). |
| [100 — Rivalry Audit](../100-roster-v5-round4-selection-rivalry-audit.md) | Phân định Đấu sĩ đánh tay | Thoát khỏi Master Yi / Tryndamere: Không bất tử 5s, không untargetable lướt vô tận, không reset hồi chiêu khi hạ gục. |
| [Candidate YAML](../../../tools/sim/candidates/kael.yml) | `tools/sim/candidates/kael.yml` | Thông số nền tảng, passive `cuong_nhip` (max 5 stacks, 8% AS per stack, decay rate 2.0/s sau 2.0s), Q lướt chém, W chém kép 2 hit, E khiên phản ứng, R chém 3 hit liên hoàn. |
| [Engine Toy Test](../../../tools/test/wave1-gameplay-toys.test.mjs) | `test("Toy 2: Kael Cuong Nhip...")` | Kiểm chứng thành công cơ chế tích tầng Cuồng Nhịp, tăng tốc đánh và quy tắc suy giảm dần sau 2s trên simulator engine. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí độc bản:** Song Đao Huyết Thạch Cổ Linh (Twin Bloodstone Sabers) - hai thanh loan đao cán bọc da thú, lưỡi phát quang đỏ sẫm.
2. **Cơ chế cốt lõi:** Cuồng Nhịp (Continuous Hit Momentum). Mỗi đòn chém trúng tích tầng tốc đánh (+8%/tầng, tối đa 5 tầng = +40% AS). Rời giao tranh quá 2.0s, tầng suy giảm dần dần (giảm 2 tầng/giây) chứ không biến mất đột ngột.
3. **Phân định mục tiêu nghiêm ngặt:** Tướng địch cho 100% tầng/hồi phục; lính/quái tối đa 2 tầng và 30% hiệu quả; trụ công trình KHÔNG tích tầng và KHÔNG hồi phục (chỉ tạm dừng bộ đếm decay).
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng RMB làm skill độc lập trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Owner phê duyệt sửa đổi quy tắc mục tiêu chống farm hồi phục vô hạn trong Tài liệu 102.
- **2026-10-12:** Đưa vào Master Plan Wave 1 tại Tài liệu 104; kiểm chứng engine trong `wave1-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
