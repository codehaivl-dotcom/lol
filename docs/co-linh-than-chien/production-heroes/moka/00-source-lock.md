# 00 · Source Lock — #31 Moka (Hổ Nấm Răng Kiếm)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#31`
- `runtimeId`: `moka`
- `displayName`: `Moka` (Tiếng Anh: `Moka - Fungal Sabretooth Stalker`)
- `productionWave`: `Wave 3 (Ambush Assassin & Fungal Tracker)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../104-full-approved-roster-production-master-plan.md) | §1 Mục 1 & §4 Wave 3 | Khóa chính thức ID `#31`, runtime `moka`, vai trò Sát thủ (Assassin). Core toy: Hổ nấm săn mùi bào tử, vồ mồi từ xa gây sát thương bộc phát. Đưa vào Wave 3. |
| [100 — Rivalry Audit](../100-roster-v5-round4-selection-rivalry-audit.md) | §2 Mục 8 & §7 (Moka vs Spora/Teko) | Xác nhận "Strong Keep" (Top 10 hạt nhân độc bản). Spora bị loại vì trùng lặp chủ đề bào tử và gây tranh cãi; Moka được chọn là sát thủ săn mồi cổ sinh, tung cú vồ kinh hoàng từ bụi rậm khi con mồi dính bào tử. Phản chế: Tiếng gầm cảnh báo $0.8\text{s}$ cho đối thủ bấm Dash (D) né tránh. |
| [102 — Beginner Shortlist](../102-roster-v5-beginner-concept-shortlist.md) | §1 Danh mục Strong Keep | Xác nhận thuộc nhóm hạt nhân độc bản, giữ vững hình thái dã thú 4 chân kết hợp hệ sợi nấm bào tử cổ đại. |
| [Candidate YAML](../../../tools/sim/candidates/moka.yml) | `tools/sim/candidates/moka.yml` | Thông số nền tảng, passive `spore_pounce` (`sporeDuration: 4.0`, `pounceBonusAd: 0.40`, `pounceRange: 7.0`), Q phóng bào tử, W (rmb) ẩn tích bào quang khiên & tăng tốc, E cào xé toái cốt, R mãnh hổ tuyệt sát khóa đơn mục tiêu $7.0\text{m}$. |
| [Engine Toy Test](../../../tools/test/wave3-gameplay-toys.test.mjs) | `test("Toy 6: Moka spore mark application & ambush pounce burst")` | Kiểm chứng thành công cơ chế gieo bào tử Q kích hoạt `passive:spore_applied`, con mồi dính dấu lộ diện và đòn vồ sau gây thêm $+40\%$ bonus AD (`passive:spore_pounce`). |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí & Hình thể — Dã Thú Hổ Răng Kiếm Sinh Thái Nấm Cổ Đại:** Hai răng nanh kiếm dài sắc nhọn như lưỡi kiếm ngà (`sabretooth_fangs`), móng vuốt hợp chất sừng cứng và bờm/đuôi phát tán bào tử huỳnh quang. **Tuyệt đối không cầm vũ khí nhân tạo (không cầm đao, kiếm, nỏ hay vuốt cơ khí của Kiko)**.
2. **Cơ chế Cốt Lõi — Hổ Nấm Bào Tử Rình Vồ (Spore Pounce):** Bào tử bám vào mục tiêu làm lộ diện trong $4.0\text{s}$ (`sporeDuration: 4.0`). Khi mục tiêu bị dính bào tử, Moka có thể vồ mồi từ cự ly xa tới $7.0\text{m}$ (`pounceRange: 7.0`), đòn đánh vồ mồi được gia tăng $+40\%$ Bonus AD sát thương bộc phát (`pounceBonusAd: 0.40`).
3. **Phân định nhận diện triệt để với Kiko (#01) & Vero (#03):** Kiko là linh hầu lưng cong trườn bò với song trảo cơ khí và ảo ảnh quang học; Vero là kiếm sĩ thời gian với vết chém trễ; Moka là dã thú săn mồi 4 chân thuần túy (beast-form predator), tấn công bằng nanh vuốt sinh học và phục kích từ bụi rậm.
4. **Cơ chế Cảnh Báo Âm Thanh Rõ Ràng (Telegraph / Sound Readability):** Tiếng gầm rít dã thú cảnh báo $0.8\text{s}$ trước khi tung đòn sát thủ tối thượng hoặc cú vồ tầm xa, cho phép đối thủ có cơ hội bấm Dash (D) phản xạ né đòn.
5. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; kỹ năng Q/W/E/R theo 4 slot chuẩn; D là Universal Dash chung toàn game. Không dùng LMB/RMB làm tên chiêu thức trên runtime mới.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100), giải quyết tranh chấp chủ đề bào tử (chọn Moka, loại Spora và Teko).
- **2026-10-11:** Phê duyệt vào Roster V5 Shortlist (Tài liệu 102), khóa ID độc bản `#31`.
- **2026-10-12:** Đưa vào Master Plan Wave 3 (Tài liệu 104); kiểm chứng thành công trên simulator engine trong `wave3-gameplay-toys.test.mjs` (Toy 6).
- **Thẩm quyền:** Lead Game Designer & Combat Design Specialist đã ký duyệt canon lock.
