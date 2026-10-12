# 00 · Source Lock — #47 Cổ Lỗ (Huyền Quy Thần Cơ Sư)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#47`
- `runtimeId`: `co_lo`
- `displayName`: `Cổ Lỗ` (Tiếng Anh: `Co Lo - Siege Crossbowmaster`)
- `productionWave`: `Wave 3 (Mythic Quintet & Roster Expansion)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 24 & §4 Wave 3 | Cấp mã nghiên cứu độc bản `#47`, runtime `co_lo`, phân lớp Xạ thủ pháo đài công thành (Siege Artillery / Marksman). Core toy: Cắm Chốt Pháo Đài Mai Rùa & Bão Tiễn Liên Châu Xuyên Xạ. |
| [103 — Mythic Quintet Bible](../../103-mythic-quintet-concept-bible.md) | §2.5 (Cổ Lỗ) | Phê duyệt chuẩn hình thể Thần Cơ Sư cõng Mai Rùa Đồng Khổng Lồ (Huyền Quy Fortress Shell), tay tích hợp nỏ Liên Châu đa nòng cơ khí, phân định Mythic Form vs Battle Form, core toy cắm chốt tầm $8.5\text{m}$ có điểm mù cận chiến $2.5\text{m}$ đã audit an toàn. |
| [102 — Beginner Shortlist](../../102-roster-v5-beginner-concept-shortlist.md) | §1 Danh mục & §3.9 | Cảm hứng truyền thuyết Nỏ thần Cao Lỗ và thành Cổ Loa ngàn năm; cơ chế chuyển đổi giữa trạng thái di động cơ bản và pháo đài cắm rễ bất động. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | Phân định Xạ thủ pháo binh | Tách biệt khỏi các xạ thủ bắn xa thông thường (như Caitlyn/Jhin/Xerath); Cổ Lỗ thực sự cắm 4 chân mai rùa xuống đất, bất động hoàn toàn, có điểm mù cận chiến thực sự và tốc độ xoay nòng hạn chế. |
| [Candidate YAML](../../../../tools/sim/candidates/co_lo.yml) | `tools/sim/candidates/co_lo.yml` | Thông số nền tảng, passive `siege_stance` (siegeRange 8.5m, blindspotRadius 2.5m, siegeArmorBonus 40, siegeMrBonus 40), QWER kit và build trang bị xạ thủ. |
| [Engine Toy Test](../../../../tools/test/wave3-gameplay-toys.test.mjs) | `test("Toy 4: Co Lo siege stance range expansion & melee blindspot...")` | Kiểm chứng thành công cắm chốt mở rộng tầm bắn $8.5\text{m}$, tốc độ chạy về 0, bắn trúng mục tiêu xa $7.5\text{m}$ nhưng KHÔNG THỂ bắn mục tiêu cận chiến trong điểm mù $1.8\text{m} (< 2.5\text{m})$ trên engine simulator. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình Thể Thần Cơ Sư Mai Rùa Đồng (Huyền Quy Artificer):** Bậc thầy công thành cõng trên lưng chiếc Mai Rùa Đồng Khổng Lồ viền móng rùa sắc bén. Cánh tay phải tích hợp cỗ nỏ cơ khí Liên Châu đa nòng với hệ thống bánh răng Tinh Thạch tự động nạp tiễn. Vóc dáng vững chắc như một pháo đài di động.
2. **Cơ chế Cốt Lõi 1 — Trạng Thái Cắm Chốt Pháo Đài (Siege Fortress Stance):**
   - Kích hoạt qua chiêu W sau $0.6\text{s}$ cắm chân mai rùa xuống đất.
   - Tốc độ di chuyển giảm về **0** (hoàn toàn bất động tại chỗ).
   - Tầm bắn đánh thường mở rộng từ cự ly tiêu chuẩn $5.5\text{m}$ lên cự ly pháo binh **$8.5\text{m}$**.
   - Nhận thêm **+40 Giáp và +40 Kháng phép** từ lớp mai rùa đồng bảo vệ lưng.
3. **Cơ chế Cốt Lõi 2 — Ba Tử Huyệt Sinh Tử (Essential Vulnerabilities — Đã Audit Bắt Buộc):**
   1. **VÙNG MÙ CẬN CHIẾN (Minimum Range Blindspot):** Nỏ thần tầm xa có góc nâng nòng cố định; kẻ địch áp sát trong phạm vi **$2.5\text{m}$ quanh người hoàn toàn không thể bị nỏ bắn trúng**!
   2. **TỐC ĐỘ XOAY NÒNG HẠN CHẾ (Slow Pivot Rate):** Cổ Lỗ xoay góc bắn chậm chạp khi đổi mục tiêu lệch quá $90^\circ$, tạo cơ hội cho sát thủ bọc sườn trừng phạt.
   3. **ÁP TRẦN SÁT THƯƠNG CÔNG TRÌNH:** Mũi tên bắn vào Trụ và Nhà Chính bị giảm $50\%$ sát thương, chỉ mang tính ép góc phòng thủ chứ không thể phá trụ tức thời ngoài tầm bắn của trụ.
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn (W thay thế RMB cũ); D là Universal Dash phổ quát toàn game. Nếu đang cắm chốt mà bấm D, Cổ Lỗ lập tức hủy cắm chốt để lướt né. Không dùng LMB/RMB làm tên skill trong tài liệu thiết kế.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Owner phê duyệt Bộ Ngũ Thần Thoại trong Tài liệu 103, xác nhận chuẩn hình thể Thần Cơ Sư Mai Rùa và 3 điểm yếu tử huyệt bắt buộc của trạng thái Cắm Chốt.
- **2026-10-12:** Đưa vào Master Plan Wave 3 tại Tài liệu 104; kiểm chứng thành công trong `wave3-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
