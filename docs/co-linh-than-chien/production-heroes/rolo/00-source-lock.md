# 00 · Source Lock — #36 Rolo (Tê Tê Khiên / Tháo Vảy Chuyển Dạng Công Thủ)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#36`
- `runtimeId`: `rolo`
- `displayName`: `Rolo`
- `productionWave`: `Wave 2 (Competitive Core & Specialist Mechanics)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) | §1 Mục 15, §1 Khóa định danh & §4 Wave 2 | Cấp mã nghiên cứu độc bản `#36`, runtime `rolo` (nghiêm cấm trùng mã #48 của Oneira); vai trò Đấu sĩ (Fighter / Juggernaut); Core toy: Tê tê bóc vảy chuyển dạng công thủ. |
| [100 — Rivalry Audit](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/100-roster-v5-round4-selection-rivalry-audit.md) | §3 Mục 10 (Tê Tê Khiên / Rolo #36) | Tự tay tháo từng lớp vảy để chuyển từ xe tăng bọc thép kiên cố sang máy chém cuồng chiến xé rách đội hình. **Tuyệt đối KHÔNG cuộn tròn lăn húc (không đi theo lối mòn Rammus)**. Phản chế của địch: Dồn sát thương sốc tiêu diệt Rolo ngay thời điểm vừa bung vảy (khi lượng giáp tụt giảm mạnh nhất). |
| [102 — Beginner Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md) | §1.1 Danh mục Strong Keep (10) | Giữ vững vị trí trong nhóm 10 concept cốt lõi được bảo lưu nguyên vẹn; xác nhận tính khả thi của cơ chế quản lý vảy giáp độc bản. |
| [Candidate YAML](file:///d:/Project/Test/24tuong/tools/sim/candidates/rolo.yml) | `tools/sim/candidates/rolo.yml` | Thông số nền tảng, passive `scale_shedding` (baseResistBonus: +35 Giáp/Kháng phép, kích hoạt W bung vảy thành Dạng Cuồng Chiến: shedResistPenalty: -25, shedSpeedBonus: +20% MS, shedAspdBonus: +25% AS trong 5s kèm khiên 2.5s), Q quất đuôi bắn vảy làm chậm, E dập đuôi địa chấn làm chậm, R Thiết Giáp Càn Quét lao dũng mãnh 4 chân cày nát sàn đấu làm choáng 0.9s. |
| [Engine Toy Test](file:///d:/Project/Test/24tuong/tools/test/wave2-gameplay-toys.test.mjs) | `test("Toy 6: Rolo scale shedding defense...")` | Kiểm chứng thành công cơ chế chuyển dạng Tháo Vảy, tăng chỉ số chống chịu nền và hoán đổi sang tốc đánh/tốc chạy trên simulator engine (`engine.mjs`). |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Tạo hình & Thể thức di chuyển (Body Plan & Anti-Trope):** Tê tê khổng lồ cổ đại bọc giáp vảy sừng kim loại xếp lớp từ đầu đến đuôi (`quadruped_beast_pangolin`). **TUYỆT ĐỐI KHÔNG CUỘN TRÒN LĂN HÚC NHƯ TRÁI BÓNG**. Rolo di chuyển và chiến đấu bằng 4 chân lực lưỡng kết hợp đuôi bọc vảy sừng nặng nề và vuốt trước sắc bén.
2. **Cơ chế cốt lõi (Scale Shedding / Tháo Vảy Chuyển Dạng):**
   - **Dạng Bọc Thép (Armored Form - Mặc định):** Rolo được bảo vệ bởi lớp vảy sừng kim loại dày đặc, nhận thêm **+35 Giáp và +35 Kháng phép** nội tại.
   - **Dạng Cuồng Chiến (Berserk Shedding Form - Khi kích hoạt W):** Rolo bung tung các phiến vảy sừng ra ngoài, nhận một lớp khiên bảo vệ tạm thời trong 2.5s, đồng thời rơi vào trạng thái bộc phát cơ bắp trong **5.0 giây**: Chịu giảm trừ **-25 Giáp** nhưng nhận thêm **+20% Tốc độ di chuyển** và **+25% Tốc độ đánh**.
3. **Quyết định liên tục của người chơi:** Khi nào nên giữ vảy để làm bức tường thép che chắn hút sát thương cho đồng đội, và khi nào nên bấm W tháo vảy để hóa thân thành máy cào xé dọn dẹp combat?
4. **Phản chế minh bạch của đối thủ:** Nhìn thấy hoạt ảnh vảy sừng bung ra là biết ngay Rolo đã mất đi 25 Giáp chống chịu; đây là cửa sổ cơ hội vàng để đội địch dồn sát thương sốc kết liễu Rolo trước khi lớp khiên tạm thời hết hiệu lực.
5. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; kỹ năng gán 4 slot chuẩn **Q / W / E / R**; phím **D** là Universal Dash. Không dùng LMB/RMB làm tên kỹ năng.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100 §3.10), xác lập lệnh cấm cuộn tròn lăn húc để tạo bản sắc riêng biệt.
- **2026-10-11:** Bảo lưu trong danh sách Strong Keep tại Tài liệu 102.
- **2026-10-12:** Đưa vào Master Plan Wave 2 tại Tài liệu 104; hoàn thiện candidate YAML `tools/sim/candidates/rolo.yml`; kiểm chứng engine xanh 100% trong `wave2-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
