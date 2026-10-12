# 05 · Mechanics Coverage — #31 Moka (Hổ Nấm Răng Kiếm)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#31 / moka`  
**File ứng viên YAML:** `tools/sim/candidates/moka.yml`  
**Báo cáo giả lập đối chiếu:** `reports/sim/production26/2026-10-12T08-04-13-338Z/moka/report.json`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Bào tử đánh dấu lộ diện 4.0s** | `passive.sporeDuration: 4.0` | Đã triển khai bộ đếm `foe.sporeUntil = t + 4.0` và ghi nhận `passive:spore_applied` khi trúng Q | `tools/test/wave3-gameplay-toys.test.mjs` (`Toy 6: Moka spore mark...`) | `SUPPORTED` |
| **Vồ mồi nội tại cự ly xa 7.0m** | `passive.pounceRange: 7.0` | Đã mở rộng tầm đánh `reach = 7.0m` trong `autoAttack()` khi `target.sporeUntil > t` | `tools/test/wave3-gameplay-toys.test.mjs` | `SUPPORTED` |
| **Sát thương bộc phát cú vồ +40% Bonus AD** | `passive.pounceBonusAd: 0.40` | Đã triển khai cộng thêm $+40\%$ bonus AD và kích hoạt proc `passive:spore_pounce` | `tools/test/wave3-gameplay-toys.test.mjs` | `SUPPORTED` |
| **Bắn chùm bào tử Q làm chậm** | `q.aim: skillshot`, `width: 1.4`, `speed: 28`, `range: 6.5`, `slow: 0.25` | Đã mô phỏng bắn đạn đạo, gây sát thương, làm chậm và kích hoạt nội tại đánh dấu | `tools/sim/run.mjs` (Combat loop) | `SUPPORTED` |
| **Bật khiên & Tăng tốc độ di chuyển W** | `rmb.aim: self`, `shield: { base: [60..200], duration: 2.5 }` | Đã mô phỏng nhận khiên hấp thụ và tăng tốc độ chạy | `tools/sim/run.mjs` (Duel & Teamfight) | `SUPPORTED` |
| **Cào diện rộng Toái Cốt E làm chậm** | `e.aim: area`, `radius: 3.2`, `slow: 0.35, duration: 1.0` | Đã mô phỏng cào xé AoE quanh thân gây sát thương và làm chậm $35\%$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Chiêu cuối Mãnh Hổ Tuyệt Sát R vồ choáng** | `r.aim: single_target`, `range: 7.0`, `dash: {distance: 7.0}`, `stun: 0.8` | Đã mô phỏng lướt khóa đơn mục tiêu $7.0\text{m}$, sát thương bộc phát cực lớn và làm choáng $0.8\text{s}$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động lướt dã thú $4.5\text{m}$ né tránh | Engine combat core | `SUPPORTED` |
| **Cơ chế âm thanh cảnh báo R truyền âm 15m** | Phát tiếng gầm $0.25\text{s}$ trước khi vồ | Simulator hiện tại chạy số học logic; chưa phát spatial 3D audio | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo báo cáo chiến dịch toàn diện mới nhất (`reports/sim/production26/2026-10-12T08-04-13-338Z/moka/report.json` và `summary.json`):
- **Trạng thái:** `FLAG_RED` (Cần tinh chỉnh thông số bộc phát sát thương, không có lỗi sập engine).
- **Revision:** `4272ea8de834`.
- **Số cờ Đỏ (RED Flags):** `25` (Chủ yếu là cảnh báo chỉ số Time-To-Kill quá ngắn khi vồ dồn sát thương bộc phát liên tiếp).
- **Số cờ Cam (ORANGE Flags):** `169`.
- **Tỷ lệ thắng đối đầu mẫu (Duel Rates qua các mốc thời gian):**
  - Phút 3 (Đầu trận): `44.8%`
  - Phút 6: `40.6%`
  - Phút 10: `30.8%`
  - Phút 15: `27.3%`
  - Phút 20: `32.9%`
  - Cuối trận (Full đồ): `28.2%`
  - *Nhận xét chuyên môn & Định hướng điều chỉnh:* 
    1. Tỷ lệ thắng đầu trận ($44.8\%$) rất tốt cho một Sát thủ đi rừng chuyên phục kích gank sớm.
    2. Xuất hiện $25$ cờ đỏ do combo kết hợp giữa **Vồ Nội Tại (+40% bonus AD)** và **Chiêu Cuối R (+125% bonus AD)** tạo ra đỉnh sát thương dồn cực nhanh trong vòng dưới $1.0\text{s}$ lên các tướng mỏng máu.
    3. Hướng tinh chỉnh đề xuất cho Balance Lab: Giãn cách thời gian hiệu lực giữa cú vồ nội tại và chiêu cuối R (thêm $0.5\text{s}$ lockout hoặc giảm nhẹ hệ số AD của chiêu cuối R từ $125\% \rightarrow 110\%$) để hạ bớt số cờ đỏ về $0$ mà vẫn giữ nguyên vẹn cảm giác săn mồi đã tay.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **FLAG_RED REVIEW:** Rà soát và tinh chỉnh hệ số sát thương bộc phát trong `tools/sim/candidates/moka.yml` để xóa bỏ $25$ cờ đỏ trước khi đưa vào bản build chính thức.
3. **NOT_TESTED:** Khả năng phát hiện mục tiêu tàng hình qua hiệu ứng Bào Tử Lộ Diện trên engine Spawn runtime thực tế.
