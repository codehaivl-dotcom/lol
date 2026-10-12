# 00 · Source Lock — #46 Dũng Thạch (Thần Rìu & Thiên Cầm)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#46`
- `runtimeId`: `dung_thach`
- `displayName`: `Dũng Thạch` (Tiếng Anh: `Dung Thach - Harmonic Bruiser`)
- `productionWave`: `Wave 3 (Mythic Quintet & Roster Expansion)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 23 & §4 Wave 3 | Cấp mã nghiên cứu độc bản `#46`, runtime `dung_thach`, phân lớp Đấu sĩ cuồng chiến hài hòa (Harmonic Bruiser / Fighter). Core toy: Trảm Kích Rìu Xéo Nứt Đất & Thiên Cầm Thánh Âm Giải Hòa. |
| [103 — Mythic Quintet Bible](../../103-mythic-quintet-concept-bible.md) | §2.4 (Dũng Thạch) | Phê duyệt chuẩn hình thể chiến thần hộ pháp cơ bắp màu đồng đen cổ sẫm, vung Đại Rìu Cổ Linh, lưng mang Thiên Cầm Tinh Thạch 7 dây bằng gỗ lim cổ và tơ ngọc bích, phân định Mythic Form vs Battle Form, core toy tiếng đàn hóa giải khống chế mềm đã audit quyền lực. |
| [102 — Beginner Shortlist](../../102-roster-v5-beginner-concept-shortlist.md) | §1 Danh mục & §3.8 | Cảm hứng truyền thuyết Thạch Sanh chém trăn tinh xé đất song hành cùng tiếng đàn giải hòa vạn quân; sự kết hợp giữa sát thương chuẩn đòn thứ 3 và khúc ca xoa dịu. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | Phân định Đấu sĩ hài hòa | Tách biệt khỏi các đấu sĩ búa rìu cuồng bạo đơn thuần (như Darius/Olaf); Dũng Thạch sở hữu công cụ hỗ trợ phòng ngự bằng tiếng đàn nhưng phải chịu cái giá khựng đòn đánh. |
| [Candidate YAML](../../../../tools/sim/candidates/dung_thach.yml) | `tools/sim/candidates/dung_thach.yml` | Thông số nền tảng, passive `fissure_cleave` (cleaveHit 3, trueDmgRatio 0.35, harpDmgReduction 0.25, harpDuration 1.5, harpChannel 1.0), QWER kit và build trang bị đấu sĩ. |
| [Engine Toy Test](../../../../tools/test/wave3-gameplay-toys.test.mjs) | `test("Toy 3: Dung Thach fissure cleave true damage & celestial harp soft-CC cleanse...")` | Kiểm chứng thành công đòn đánh thứ 3 kích hoạt sát thương chuẩn và chiêu gảy đàn W xóa bỏ làm chậm/trói chân (soft-CC) đồng thời khóa đòn đánh trong 1.0s trên engine simulator. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình Thể Chiến Thần Hộ Pháp (Harmonic Guardian Bruiser):** Thân hình lực lưỡng màu đồng đen cổ sẫm, mình trần khoác giáp dã thú xám bạc. Tay vung Đại Rìu Cổ Linh chém nứt trời đất; sau lưng đeo chiếc Thiên Cầm Tinh Thạch 7 dây viền ngọc bích. Hai biểu tượng đối lập — Rìu Trảm Chiến & Đàn Giải Hòa — cùng tồn tại hài hòa trên một cơ thể.
2. **Cơ chế Cốt Lõi 1 — Trảm Kích Rìu Nứt Đất (Fissure Cleave):** Đòn đánh thường thứ 3 liên tiếp giáng thẳng lưỡi rìu xuống đất tạo rãnh địa chấn ngắn, gây thêm **+35% sát thương chuẩn** (True Damage) dựa trên AD. Đây là công cụ phá vỡ giáp của các đấu sĩ và đỡ đòn hạng nặng.
3. **Cơ chế Cốt Lõi 2 — Thánh Âm Thiên Cầm Giải Hòa (Celestial Harp Resonance — Đã Audit Quyền Lực):**
   - **Điều kiện kích hoạt ngặt nghèo:** Dũng Thạch **KHÔNG THỂ gảy đàn nếu đang bị Choáng Cứng (Stun), Áp Chế (Suppression) hoặc Hất Tung (Airborne)**. Tiếng đàn không phải là nút bất tử vô điều kiện.
   - Khi tự do hoặc chỉ bị dính khống chế mềm (Làm chậm, Trói chân), bấm W gảy đàn sẽ **giải phóng ngay lập tức toàn bộ khống chế mềm** cho bản thân và đồng minh sát cạnh.
   - Phát sóng âm làm dịu, **giảm 25% sát thương gây ra của toàn bộ kẻ địch xung quanh trong 1.5s**.
   - **Cái giá phải trả (Trade-off):** Trong $1.0\text{s}$ gảy đàn, Dũng Thạch bị khựng lại và hoàn toàn không thể vung rìu đánh thường (`lockUntil = t + 1.0`).
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn (W thay thế RMB cũ); D là Universal Dash phổ quát toàn game. Không dùng LMB/RMB làm tên skill trong tài liệu thiết kế.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100).
- **2026-10-11:** Owner phê duyệt Bộ Ngũ Thần Thoại trong Tài liệu 103, xác nhận hình tượng Thần Rìu & Thiên Cầm và luật audit khắt khe của chiêu đàn W.
- **2026-10-12:** Đưa vào Master Plan Wave 3 tại Tài liệu 104; kiểm chứng thành công trong `wave3-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
