# 00 · Source Lock — #38 Linh Hầu (Cổ Thần Trượng)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#38`
- `runtimeId`: `linh_hau`
- `displayName`: `Linh Hầu`
- `productionWave`: `Wave 1 (Vertical Slice / Beginner Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) | §1 Mục 17 & §4 Wave 1 | Cấp mã nghiên cứu độc bản `#38`, runtime `linh_hau`, vai trò Fighter, Core toy: Biến điệu tầm trượng dài/ngắn. |
| [102 — Beginner Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md) | §2 & §3.1 | Phân định rạch ròi với Kiko (#01): Linh Hầu là đấu sĩ dũng mãnh, đứng thẳng, ngực nở vai rộng, cầm Cổ Thần Trượng. |
| [100 — Rivalry Audit](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/100-roster-v5-round4-selection-rivalry-audit.md) | Phân định Kiko vs Linh Hầu | Loại bỏ hoàn toàn phân thân tàng hình và múa lốc xoáy (Cyclone knockup). Đòn đánh đầm tay, trực quan. |
| [Candidate YAML](file:///d:/Project/Test/24tuong/tools/sim/candidates/linh_hau.yml) | `tools/sim/candidates/linh_hau.yml` | Thông số nền tảng, passive `staff_reach` (extended 4.8m, sweetspot 2.8-4.8m), QWER kit. |
| [Engine Toy Test](file:///d:/Project/Test/24tuong/tools/test/wave1-gameplay-toys.test.mjs) | `test("Toy 1: Linh Hau staff reach modulation...")` | Kiểm chứng thành công stance, range & sweetspot rìa trượng trên simulator engine. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí độc bản:** Cổ Thần Trượng Tinh Thạch to bản, hai đầu bịt đồng cổ Cổ Linh. Không bao giờ đổi sang song trảo, đao kiếm hay quyền trượng phép thuật.
2. **Cơ chế cốt lõi:** Biến Điệu Tầm Trượng (Staff Reach Modulation). Đoản trượng đánh nhanh cận chiến 2.0m (+15% AS), Trường trượng vươn dài 4.8m kích hoạt qua chiêu Q với sweetspot rìa trượng (2.8m - 4.8m) gây thêm sát thương và làm chậm.
3. **Thoát bóng LoL Wukong:** Tuyệt đối không có kỹ năng tàng hình phân thân lừa gạt, không múa trượng lốc xoáy hất tung 360 độ. Linh Hầu là đấu sĩ càn lướt dũng mãnh, mở giao tranh bằng đòn nện đất chấn động.
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng RMB làm skill độc lập trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Owner phê duyệt Phương án B phân tách Kiko (#01) và Linh Hầu (#38) trong Tài liệu 102.
- **2026-10-12:** Đưa vào Master Plan Wave 1 tại Tài liệu 104; kiểm chứng engine trong `wave1-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
