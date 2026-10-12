# 00 · Source Lock — #07 Nera (Dạ Neo / The Anchor Marksman)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#07`
- `runtimeId`: `nera`
- `displayName`: `Nera`
- `productionWave`: `Wave 2 (Core Archetypes & First Mythic)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../104-full-approved-roster-production-master-plan.md) | §1 Khóa định danh & §4 Wave 2 | Khóa chính thức ID `#07` (Runtime ID: `nera`), vai trò Xạ thủ (Marksman), Core toy: Mỏ neo tời hai chiều tự bảo kê. Thuộc Wave 2 sản xuất. |
| [100 — Rivalry Audit](../100-roster-v5-round4-selection-rivalry-audit.md) | §2.2 Mục 5 (Dạ Neo / Nera #07 từ Strong Keep) | Bắn mỏ neo hai chiều: chọn kéo mình tẩu thoát vào tường hoặc giật đối thủ lệch góc combo để tự sinh tồn. Quyết định liên tục: Dùng neo để đào thoát chạy trốn hay dùng neo giật ngắt nhịp lao vào của sát thủ địch? Phản chế: Đứng sau lính/tanker để chặn neo; né theo phương vuông góc. Hình thể: Nữ thợ săn áo choàng Cổ Linh, găng tay phóng tời cơ khí khổng lồ ở tay phải. Vì sao đáng tồn tại: Xạ thủ cơ động tự bảo kê (Self-Peel) độc lập cao nhất, không phụ thuộc tuyệt đối vào support. |
| [92 — Concept Discovery](../92-roster-discovery-v5-concept-candidates.md) | §C2 Mục 07 & §7 Nhóm 12 Hạt Nhân | "Tôi pick nó vì được bắn lao neo rồi chọn kéo mình tới hoặc giật mục tiêu lệch vị trí." Xếp thứ 4 trong nhóm 12 concept hạt nhân giá trị nhất. |
| [102 — Beginner Shortlist](../102-roster-v5-beginner-concept-shortlist.md) | §1 & §3 Nhóm Xạ Thủ Khuyến Nghị | Giữ vai trò Xạ thủ cơ động tự lực cánh sinh đại diện cho Wave 2. |
| [Candidate YAML](../../../tools/sim/candidates/nera.yml) | `tools/sim/candidates/nera.yml` | Thông số: HP 600 (+84), Mana 340 (+40), AD 62 (+3.5), Giáp 28 (+3.2), MR 30 (+1.2), MS 6.2 m/s, AS 0.67 (+0.024), tầm bắn 7.0m. Passive `anchor_tether` (shotsPerAnchor: 3, kitingSpeedBoost: 0.18, anchorDuration: 3.0s). Q Xuyên Thấu Tiễn (tầm 9.5m), W Phóng Tời Hai Chiều (lướt lùi 4.5m làm chậm 35%), E Lưới Neo Dây Bẫy (vùng cản 3.4m), R Đại Cực Neo Trấn Áp (bắn neo 12.0m làm choáng 1.2s và kéo giật). |
| [Engine Toy Test](../../../tools/test/wave2-gameplay-toys.test.mjs) | `it("Toy 4: Nera two-way anchor cable self-peel & kiting boost...")` | Đã kiểm chứng thành công: Khởi tạo Nera, kiểm tra chính xác `passive.type = anchor_tether`, `shotsPerAnchor = 3`, `kitingSpeedBoost = 0.18`. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí & Thể hình độc bản:** Nữ thợ săn Cổ Linh sắc sảo mang Áo Choàng Dạ Thần viền lông vũ phất phơ; cánh tay phải gắn **Cụm Nỏ Tời Cơ Khí Dạ Neo (Ancient Anchor Winch Crossbow)** khổng lồ tích hợp cuộn cáp kim loại phát quang.
2. **Cơ chế cốt lõi (Core Toy):** Tời neo hai chiều tự bảo kê (Self-Peel Two-way Winch Hook). Kỹ năng W bắn neo giật lùi bản thân 4.5m để giữ khoảng cách vàng an toàn và làm chậm kẻ địch lao vào; Nội tại `anchor_tether` tích dồn 3 đòn đánh tăng +18% tốc độ di chuyển khi lùi xa để kiting.
3. **Bản sắc Xạ thủ tự lập (Self-Peel Marksman):** Không đóng vai "con mồi bất lực" phụ thuộc hoàn toàn vào sp/bảo kê; Nera có đầy đủ công cụ kiểm soát không gian, cự ly và trừng phạt những kẻ dám áp sát thiếu tính toán.
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng RMB làm skill độc lập trên runtime mới (W đảm nhận Phóng Tời Hai Chiều).

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xếp vào nhóm Strong Keep tại Vòng 4 Audit (Tài liệu 100 §2.2).
- **2026-10-11:** Đưa vào danh sách Top 12 Concept Hạt Nhân tại Tài liệu 92 (§7 Mục 4).
- **2026-10-12:** Khóa ID độc bản `#07` và ấn định Wave 2 tại Tài liệu 104; kiểm chứng engine trong `wave2-gameplay-toys.test.mjs` (Toy 4 PASS).
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
