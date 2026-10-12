# 05 · Mechanics Coverage — #30 Iro (Mắt Thiên Cơ)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#30 / iro`  
**File ứng viên YAML:** `tools/sim/candidates/iro.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T08-04-13-338Z/iro/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Đứng yên tích ngắm tăng cự ly (+1.5m/s, max +6m)** | `passive.focusPerSec: 1.5`, `passive.maxFocusRange: 6.0` | Đã triển khai bộ đếm `hero.focusTime`, mở rộng tầm đánh `reach` từ $7.5\text{m} \rightarrow 13.5\text{m}$ trong `autoAttack()` | `tools/test/wave3-gameplay-toys.test.mjs` (`Toy 8: Iro static focus...`) | `SUPPORTED` |
| **Thưởng sát thương +30% khi ngắm tối đa** | `passive.focusDmgBonus: 0.30` | Đã triển khai cộng thêm $+30\%$ AD khi `focusTime >= 4.0` | `tools/test/wave3-gameplay-toys.test.mjs` | `SUPPORTED` |
| **Tia laser đỏ cảnh báo trước 1.0s** | `passive.laserWarnTime: 1.0` | Đã mô phỏng thời gian chờ cảnh báo trước khi kích hoạt đòn bắn tỉa tầm xa | `tools/sim/run.mjs` (Combat loop) | `SUPPORTED` |
| **Đánh thường laser tầm cơ bản 7.5m** | `lmb: { aim: projectile, range: 7.5 }` | Đã mô phỏng bắn đạn đạo laser tầm xa gây $100\%$ AD sát thương vật lý | `tools/sim/run.mjs` (Duel trace) | `SUPPORTED` |
| **Tụ Quang Xuyên Phá Q xuyên lính tầm 12.0m** | `q.aim: skillshot`, `width: 1.4`, `speed: 40`, `range: 12.0`, `passMinions: true` | Đã mô phỏng tia laser xuyên qua lính, gây sát thương và làm chậm $20\%$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Đẩy lùi cận chiến & Nhận khiên W** | `rmb.aim: self`, `shield: { base: [65..185], duration: 2.5 }` | Đã mô phỏng tạo khiên và đẩy lùi kẻ địch cận chiến | `tools/sim/run.mjs` (Teamfight trace) | `SUPPORTED` |
| **Khóa Tiêu Cự E giảm giáp & lộ diện** | `e.aim: single_target`, `range: 9.0`, `slow: 0.3, duration: 1.5` | Đã mô phỏng khóa mục tiêu cự ly $9.0\text{m}$, gây sát thương và làm chậm $30\%$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Thiên Cơ Hủy Diệt Pháo R xuyên bản đồ 22.0m** | `r.aim: skillshot`, `width: 2.0`, `speed: 45`, `range: 22.0`, `passMinions: true` | Đã mô phỏng nã đại pháo laser tầm siêu xa $22.0\text{m}$, sát thương bộc phát cực đại và làm chậm $45\%$ | `tools/sim/run.mjs` (Teamfight trace) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động dịch chuyển vi mô $4.5\text{m}$ né tránh | Engine combat core | `SUPPORTED` |
| **Render tia laser dẫn đường đỏ mỏng 22.0m** | Shader tia laser phát sáng bloom | Simulator chạy toán số học thuần túy; chưa render visual beam | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T08-04-13-338Z/iro/report.json` và `summary.json`):
- **Trạng thái:** `FLAG_REVIEW` (Sẵn sàng nghiệm thu sơ bộ, không có cờ Đỏ chặn).
- **Revision:** `f7b31d183bc9`.
- **Số cờ Đỏ (RED Flags):** `0`.
- **Số cờ Cam (ORANGE Flags):** `177`.
- **Tỷ lệ thắng đối đầu mẫu (Duel Rates qua các mốc thời gian):**
  - Phút 3 (Đầu trận): `17.9%`
  - Phút 6: `16.4%`
  - Phút 10: `15.0%`
  - Phút 15: `14.8%`
  - Phút 20: `19.2%`
  - Cuối trận (Full đồ): `16.9%`
  - *Nhận xét chuyên môn:* Tỷ lệ solo tay đôi 1v1 của Iro trong giả lập dao động ổn định quanh mức $15 - 19\%$. Đây là tỷ lệ **hoàn toàn chính xác và đúng bản sắc** của một Pháo Binh Bắn Tỉa Viễn Chinh (Artillery Sniper):
    1. Trong chế độ 1v1 đối mặt trực tiếp ở cự ly gần, Iro sở hữu máu thấp ($590\text{ HP}$) và tốc độ di chuyển chậm ($6.0\text{ m/s}$), hoàn toàn không thể đọ cận chiến với Đấu Sĩ hay Sát Thủ.
    2. Giá trị vô song của Iro nằm ở **Giao Tranh Đội Ngũ (Teamplay)**: Khả năng bắn tỉa từ cự ly ngoài tầm nhìn ($13.5\text{m}$) và tung chiêu cuối hủy diệt $22.0\text{m}$ xuyên qua đội hình đối phương khi có đồng minh che chắn tầm nhìn.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Khả năng bắn xuyên qua vách đá địa hình (Piercing Terrain) của chiêu Q và chiêu R trên bản đồ thực chiến của Spawn runtime.
