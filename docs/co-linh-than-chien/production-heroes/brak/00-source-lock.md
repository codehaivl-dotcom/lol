# 00 · Source Lock — #02 Brak (Nhịp Quyền / Piston Brawler)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#02`
- `runtimeId`: `brak`
- `displayName`: `Brak`
- `productionWave`: `Wave 2 (Core Archetypes & First Mythic)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) | §1 Bảng 26 Tướng (Dòng 2) & §4 Wave 2 | Cấp mã nghiên cứu độc bản `#02`, runtime `brak`, vai trò Đấu sĩ (Fighter), Core toy: Parry piston phản đòn. Thuộc Wave 2 sản xuất. |
| [100 — Rivalry Audit](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/100-roster-v5-round4-selection-rivalry-audit.md) | §2.2 Mục 9 (Nhịp Quyền / Brak #02 từ Strong Keep) | Võ sĩ thép parry chuẩn từng phần trăm giây, phản kích bằng cú đấm piston búa tạ bộc phá đập nát đối phương. Quyết định liên tục: Bấm thủ đúng khoảnh khắc đối thủ vung đòn hay né đòn chờ thời cơ. Counterplay: Giả vờ ra đòn rồi dừng lại (Bait Parry). Hình thể: Võ sĩ vạm vỡ, hai cánh tay bọc giáp piston hơi nước khổng lồ bằng đồng đỏ. |
| [92 — Concept Discovery](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/92-roster-discovery-v5-concept-candidates.md) | §C1 Mục 02 & §7 Nhóm 12 Hạt Nhân | "Tôi pick nó vì được chơi võ sĩ phản nhịp: chờ địch ra đòn, đỡ đúng lúc, rồi phản bằng cú đấm piston nặng." Xếp trong top 12 hạt nhân concept giá trị nhất. |
| [102 — Beginner Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md) | §1 & §3 Nhóm Đấu Sĩ Khuyến Nghị | Giữ vị trí Đấu sĩ phản nhịp cận chiến thuần túy của Wave 2. |
| [Candidate YAML](file:///d:/Project/Test/24tuong/tools/sim/candidates/brak.yml) | `tools/sim/candidates/brak.yml` | Thông số nền tảng: HP 730 (+96), AD 68 (+3.8), Giáp 38 (+3.9), Kháng phép 32 (+1.6), MS 6.2 m/s, AS 0.65 (+0.017). Passive `parry_piston` (parryWindow 0.75s, counterBonusRatio 0.35, counterStun 0.5s), Q Piston Trực Quyền (skillshot thẳng), W Nghênh Kích Thủ Thế (parry shield & phản kích), E Địa Chấn Xung Kích (quét chấn động quanh thân), R Hơi Nước Bộc Phá (nhảy nện búa tạ làm choáng). |
| [Engine Toy Test](file:///d:/Project/Test/24tuong/tools/test/wave2-gameplay-toys.test.mjs) | `it("Toy 3: Brak rhythm parry piston damage reduction & counter punch...")` | Đã kiểm chứng thành công trong test tự động: Brak kích hoạt thế thủ parry trong 0.75s, khi nhận sát thương giảm 60% sát thương, phản kích đòn đấm bộc phát vào kẻ địch, kích hoạt proc `passive:parry_piston_proc` và tiêu hao thế thủ. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí & Thể hình độc bản:** Võ sĩ cự thạch vạm vỡ gân guốc, mang Đôi Găng Tay Piston Hơi Nước Đồng Đỏ (Steam Hydraulic Piston Gauntlets) khổng lồ ở hai cánh tay, tích hợp ống xả hơi nước nghi ngút trên vai và khuỷu tay.
2. **Cơ chế cốt lõi (Core Toy):** Nhịp Quyền Piston Parry (`passive: parry_piston`). Bấm W kích hoạt cửa sổ thủ thế 0.75s; nếu đón đúng đòn đánh/kỹ năng của địch trong cửa sổ này, giảm mạnh sát thương và lập tức bung xi-lanh phản kích bằng cú đấm piston búa tạ (+35% bonus damage, làm choáng 0.5s).
3. **Bản sắc Đấu sĩ phản nhịp (Rhythm Counter-Fighter):** Thắng thua định đoạt bởi sự nhạy bén và phán đoán timing của người chơi; biến áp lực tấn công của đối thủ thành đòn trừng phạt chí mạng.
4. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng RMB làm skill độc lập trên runtime mới (W đảm nhận Nghênh Kích Thủ Thế).

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xếp vào nhóm Strong Keep tại Vòng 4 Audit (Tài liệu 100 §2.2).
- **2026-10-11:** Đưa vào danh sách Top 12 Concept Hạt Nhân tại Tài liệu 92.
- **2026-10-12:** Khóa ID độc bản `#02` và ấn định Wave 2 tại Tài liệu 104; kiểm chứng engine trong `wave2-gameplay-toys.test.mjs` (Toy 3 PASS).
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
