# 00 · Source Lock — #48 Oneira (Mộng Thể Mặt Nạ Hút Khống Chế)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#48`
- `runtimeId`: `oneira`
- `displayName`: `Oneira` (Danh hiệu: `Mộng Thể Mặt Nạ Hút Khống Chế` / English: `Oneira - The Dreamform CC Transmuter`)
- `productionWave`: `Wave 4 (Specialist & Advanced Control Roster)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md) | §1 Mục 19, §4 Bảng Wave 4 & §6 Kế hoạch triển khai | Cấp mã nghiên cứu `#48`, runtime `oneira`, vai trò Hỗ Trợ Thanh Tẩy Chuyển Hóa (Support / CC Transmuter & Enchanter). Bố trí vào Wave 4 chuyên trách cơ chế giải phóng khống chế đồng minh và chuyển hóa thành hồi máu. |
| [100 — Rivalry Audit](../../100-roster-v5-round4-selection-rivalry-audit.md) | §2 Mục 18 & §3 Nhóm 3 Mục 18 | Phán quyết độc lập: Oneira giữ vị trí "Hỗ trợ hóa giải khống chế cứng (Cleanse & Transmute) chuyên trị các đội hình mở giao tranh diện rộng". Khóa điều kiện kỹ thuật: Không hút nếu bản thân đang dính khống chế cứng; chỉ hút Stun/Root/Slow/Silence; tuyệt đối không hút Áp chế và Hất tung; giới hạn 1 hiệu ứng có thời hạn lâu nhất. |
| [98 — Discovery Sprint](../../98-roster-v5-mage-support-discovery-sprint.md) | §3.3 (Oneira / Giấc Mộng Ký Ức) | Khóa câu pick-up nền tảng: *"Tôi pick Oneira vì tôi muốn biến nỗi đau và hiệu ứng bất lợi của đồng đội thành nguồn sống hồi phục."* Khóa hình ảnh Mộng thể dạng làn khói mờ ngưng tụ mang chiếc mặt nạ gốm Cổ Linh hai mặt (mặt khóc / mặt cười). |
| [94 — Fantasy & Marketing Audit](../../94-roster-v5-audit-player-fantasy-marketing.md) | Đánh giá Concept Mộng Thể | Đánh giá cao bản sắc thẩm mỹ ma mị thanh thoát: cơ chế chuyển hóa lời nguyền thành phúc lành (Curse Transmutation). |
| [Candidate YAML](../../../../tools/sim/candidates/oneira.yml) | `tools/sim/candidates/oneira.yml` | Chỉ số gốc (HP: 640, Mana: 350, Speed: 6.2 m/s), nội tại `cc_absorb_transmute` (độ trễ 2.0s, hồi phục 80 HP, hạn mức 1 CC), bộ chiêu Q/W/E/R. |
| [Engine Toy Test](../../../../tools/test/wave4-gameplay-toys.test.mjs) | `Toy 7: Oneira CC absorb & transmutation` | Kiểm chứng thành công việc kích hoạt W hút sạch hiệu ứng làm chậm (`slows.length === 0`) và trói chân (`rootUntil <= W.t`) từ đồng minh, ghi nhận `proc("passive:cc_transmuted")`. |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Hình thái Mộng Thể Khói Mờ & Mặt Nạ Gốm Hai Mặt (Ethereal Mask Entity):**
   - Oneira là một thực thể phi nhân hình dạng làn khói mộng cảnh ngưng tụ bán trong suốt, lơ lửng bồng bềnh cao $\sim 1.75\text{m}$.
   - Trung tâm khuôn mặt là chiếc **Mặt Nạ Gốm Cổ Linh Hai Mặt (The Dual-Faced Ceramic Mask)**: Một nửa mặt khóc u sầu màu xanh đen (hút bất lợi), một nửa mặt cười hoan lạc màu trắng vàng kim (chuyển hóa phúc lành).
   - Tuyệt đối không vẽ thành phù thủy mặc áo choàng đi chân đất thông thường.
2. **Cơ chế cốt lõi — Hút Khống Chế & Chuyển Hóa (CC Absorb & Transmute):**
   - Khi kích hoạt W, Oneira giải phóng **1 hiệu ứng khống chế** (có thời hạn lâu nhất) khỏi đồng minh trong bán kính **6.0m**, hút vào mặt nạ khóc của mình.
   - **Quy tắc giới hạn chặt chẽ (Doc 100):**
     - Bản thân Oneira **không thể bấm chiêu** nếu chính Oneira đang bị Choáng, Câm lặng hay Áp chế.
     - **Chỉ áp dụng cho:** Choáng (Stun), Trói chân (Root), Làm chậm (Slow), Câm lặng (Silence).
     - **Tuyệt đối KHÔNG HÚT:** Áp chế (Suppression) và Hất tung / Đẩy lùi (Airborne / Displacement).
   - Sau **2.0 giây** (`transmuteDelay: 2.0`), mặt nạ cười bừng sáng chuyển hóa toàn bộ năng lượng tiêu cực đó thành một làn sóng hồi máu **80 HP** diện rộng (`transmuteHeal: 80`) và tăng tốc cho toàn đội.
3. **Counterplay Minh Bạch Khi Chuyển Hóa:**
   - Trong 2.0 giây giữ khống chế để chuyển hóa, Oneira bị giảm nhẹ tốc độ di chuyển và có hào quang khói đen cảnh báo. Kẻ địch có thể tung khống chế thứ hai vào Oneira để ngắt quãng quá trình chuyển hóa.
4. **Chuẩn hóa Input Contract (Doc 91):**
   - Đánh thường tách riêng (`basic_attack` tầm 6.0m).
   - Q (Mộng Ảnh Trói Buộc - phóng quả cầu khói trói chân).
   - W (Mặt Nạ Hút Khống Chế - hút CC, bọc khiên và hồi máu, legacy `rmb` đã ánh xạ sang W).
   - E (Mộng Cảnh Tương Lân - sương khói ru ngủ làm chậm).
   - R (Đại Mộng Giác Tỉnh - đại hồi phục và làm choáng diện rộng).
   - D là Universal Dash chung toàn game. Tuyệt đối không dùng RMB hay D làm nút riêng của tướng.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Xác lập concept tại Tài liệu 98; đưa qua Vòng 4 Audit tại Tài liệu 100 §2 Mục 18 với các điều kiện kỹ thuật khóa chặt.
- **2026-10-12:** Đưa vào Master Plan Wave 4 tại Tài liệu 104; kiểm chứng thành công trong `tools/test/wave4-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
