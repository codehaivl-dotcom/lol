# 00 · Source Lock — #32 Kora (Hải Mẫu Cổ Giáp)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#32`
- `runtimeId`: `kora`
- `displayName`: `Kora` (Tiếng Anh: `Kora - Ancient Carapace Sluice Gate`)
- `productionWave`: `Wave 3 (Specialist Mechanics & Frontline Bulwark)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../104-full-approved-roster-production-master-plan.md) | §1 Mục 1 & §4 Wave 3 | Khóa chính thức ID `#32`, runtime `kora`, vai trò Đỡ đòn (Tank). Core toy: Khiên hướng giảm thiểu hỏa lực đạn đạo che chắn cho xạ thủ phía sau. Đưa vào Wave 3 dây chuyền sản xuất. |
| [100 — Rivalry Audit](../100-roster-v5-round4-selection-rivalry-audit.md) | §2 Mục 1 (Hải Mẫu / Kora #32) | Xác nhận "Strong Keep" (Top 10 hạt nhân độc bản). Trả lời 5 câu hỏi cốt lõi: Làm bức tường sống giương 2 càng thép giảm 60% hỏa lực đạn đạo phía trước. Phản chế: Đột kích vòng ra sườn và sau lưng nơi Kora mở toang. Là tướng đỡ đòn bảo hộ hướng thuần túy duy nhất trong game. |
| [102 — Beginner Shortlist](../102-roster-v5-beginner-concept-shortlist.md) | §1 Danh mục Strong Keep | Xác nhận thuộc nhóm hạt nhân cốt lõi vững chắc, giữ vững bản sắc sinh vật giáp xác cổ đại bọc giáp đá và đồng thau Cổ Linh. |
| [Candidate YAML](../../../tools/sim/candidates/kora.yml) | `tools/sim/candidates/kora.yml` | Thông số nền tảng, passive `directional_shield` (`frontMitigation: 0.60`, `shieldSpeedPenalty: 0.20`), Q kẹp choáng, W (rmb) khiên cửa đập, E ủi thân, R dập sóng thần địa chấn. |
| [Engine Toy Test](../../../tools/test/wave3-gameplay-toys.test.mjs) | `test("Toy 5: Kora directional shield damage mitigation")` | Kiểm chứng thành công cơ chế giương càng kích hoạt `passive:directional_guard`, giảm 60% sát thương đạn đạo trực diện và ghi nhận `passive:directional_shield_block`. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí & Cấu trúc cơ thể — Đôi Càng Thép Cửa Đập Khổng Lồ:** Hai càng lớn bằng hợp kim đồng thau và đá trầm tích Cổ Linh khổng lồ, khi khép lại tạo thành cánh cửa đập chắn nước cơ khí kiên cố (`sluice_gate_claws`). Tuyệt đối không cầm khiên rời của hiệp sĩ người hay chùy xích thông thường.
2. **Cơ chế Cốt Lõi — Hải Mẫu Hộ Giáp Cửa Đập (Directional Shield):** Giương hai càng thép giảm $60\%$ sát thương đạn đạo đến từ góc $180^\circ$ phía trước (`frontMitigation: 0.60`). Sườn và sau lưng chịu đủ $100\%$ sát thương. Khi giương càng, Kora bị giảm $20\%$ tốc độ di chuyển (`shieldSpeedPenalty: 0.20`).
3. **Phân định triệt để với Forge (#17):** Forge là lò nhiệt hiếu chiến lao vào tâm giao tranh ép địch đánh mình để xả áp nổ lửa; Kora là tường thành kiên cố phòng ngự bảo hộ đồng đội phía sau, đòi hỏi chọn góc đứng và xoay chuyển hướng càng theo nhịp giao tranh.
4. **Vóc dáng & Dáng di chuyển độc bản:** Thể hình giáp xác cua khổng lồ cổ đại, mai dẹp bè ngang, trọng tâm cực thấp sát mặt đất, di chuyển bò ngang và bò xéo cơ khí dũng mãnh, vững chãi như một pháo đài lũy thép.
5. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; kỹ năng Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng LMB/RMB làm tên chiêu thức trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100), định hình cơ chế đỡ đòn hướng che chắn đạn đạo duy nhất của game.
- **2026-10-11:** Xác nhận vào Shortlist Roster V5 (Tài liệu 102), khóa ID độc bản `#32`.
- **2026-10-12:** Đưa vào Master Plan Wave 3 (Tài liệu 104); kiểm chứng thành công trên simulator engine trong `wave3-gameplay-toys.test.mjs` (Toy 5).
- **Thẩm quyền:** Lead Game Designer & Technical Combat Designer đã ký duyệt canon lock.
