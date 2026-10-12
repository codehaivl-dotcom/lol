# 00 · Source Lock — #45 Triều Bá (Hắc Long Thủy Tộc)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#45`
- `runtimeId`: `trieu_ba`
- `displayName`: `Triều Bá` (Tiếng Anh: `Trieu Ba - Deluge Overlord`)
- `productionWave`: `Wave 3 (Mythic Quintet & Roster Expansion)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 22 & §4 Wave 3 | Cấp mã nghiên cứu độc bản `#45`, runtime `trieu_ba`, phân lớp Pháp sư kiểm soát thủy vực (Deluge Controller / Mage). Core toy: Tam Long Xoáy Nước Đạn Đạo & Dâng Triều Hút / Đẩy Đội Hình. |
| [103 — Mythic Quintet Bible](../../103-mythic-quintet-concept-bible.md) | §2.3 (Triều Bá) | Phê duyệt chuẩn hình thể chúa tể thủy tộc nửa người nửa rồng lơ lửng trên gợn xoáy nước mỏng, cầm Thủy Thần Kích ba chĩa, 3 Thủy Long Nước Đen hiển thị dưới dạng Orbital VFX Serpents (không phải pet độc lập, không có HP/AI riêng). |
| [102 — Beginner Shortlist](../../102-roster-v5-beginner-concept-shortlist.md) | §1 Danh mục & §3.7 | Cảm hứng truyền thuyết Thủy Tinh chúa tể biển sâu dâng đại hồng thủy; quản lý nguồn đạn đạo 3 rồng nước tăng chống chịu tự thân. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | Phân định Pháp sư kiểm soát | Tách biệt phong cách kiểm soát thủy triều với pháp sư nước thông thường; cơ chế phóng rồng để lại vệt nước và giật dòng thu hồi rồng kéo đối thủ. |
| [Candidate YAML](../../../../tools/sim/candidates/trieu_ba.yml) | `tools/sim/candidates/trieu_ba.yml` | Thông số nền tảng, passive `orbital_dragons` (maxDragons 3, resistPerDragon 12, dragonRecharge 4.0s, trailSlow 0.25), QWER kit và build trang bị pháp sư. |
| [Engine Toy Test](../../../../tools/test/wave3-gameplay-toys.test.mjs) | `test("Toy 2: Trieu Ba orbital dragons reserve & launch...")` | Kiểm chứng thành công quản lý 3 rồng xoay quanh thân tăng giáp/kháng phép (+36 tổng cộng), phóng rồng Q để lại vệt nước và thu hồi rồng W trên engine simulator. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình Thể Chúa Tể Thủy Tộc Lơ Lửng (Levitating Tide Overlord):** Nửa người nửa rồng uy nghiêm, mình phủ vảy rồng đen tím thẫm, đầu đội mũ miện san hô hóa thạch. Mô hình bay là là cách mặt đất $\approx 0.3\text{m}$ trên một gợn xoáy nước mỏng trong suốt (không dùng cột nước cao để tránh che khuất camera và đồng đội). Tay phải cầm Thủy Thần Kích ba chĩa phát quang lân tinh xanh biển.
2. **Cơ chế Cốt Lõi 1 — Tam Long Xoáy Nước (Orbital Water Serpents):** Ba con rồng nước đen là nguồn đạn đạo trực quan xoay quanh thân mình. Mỗi con rồng cung cấp **+12 Giáp và +12 Kháng phép** (tối đa +36). Tuyệt đối **không phải pet độc lập, không có AI riêng, không có thanh máu riêng**. Phóng rồng sẽ tạm thời suy giảm chống chịu; thu hồi rồng qua W hoặc tự hồi phục sau thời gian quy định.
3. **Cơ chế Cốt Lõi 2 — Vệt Nước Xoáy & Triều Dòng Quy Hồi (Water Trail & Deluge Pull):** Phóng rồng (Q) để lại một vệt nước ngập làm chậm kẻ địch. Khi kích hoạt Triều Dòng Quy Hồi (W), toàn bộ rồng nước được thu hồi về thân mình, đồng thời kéo nhẹ mọi kẻ địch đang đứng trên vệt nước về phía Triều Bá một khoảng ngắn.
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng (bắn tia thủy kích ba chĩa); Q/W/E/R theo 4 slot chuẩn (W thay thế RMB cũ); D là Universal Dash phổ quát toàn game. Không dùng LMB/RMB làm tên skill trong tài liệu thiết kế.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Owner phê duyệt Bộ Ngũ Thần Thoại trong Tài liệu 103, xác nhận chuẩn hình thể lơ lửng và cơ chế 3 quả cầu rồng xoay quanh thân (Orbital Serpents).
- **2026-10-12:** Đưa vào Master Plan Wave 3 tại Tài liệu 104; kiểm chứng thành công trong `wave3-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
