# 05 · Mechanics Coverage — #46 Dũng Thạch (Thần Rìu & Thiên Cầm)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#46 / dung_thach`  
**File ứng viên YAML:** `tools/sim/candidates/dung_thach.yml`  
**Kiểm thử đơn vị tự động:** `tools/test/wave3-gameplay-toys.test.mjs`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Trảm Kích Rìu Nứt Đất Sát Thương Chuẩn (Đòn 3)** | `passive.cleaveHit: 3`, `passive.trueDmgRatio: 0.35` | Đã hỗ trợ đếm `dt.hitN`, kích hoạt sát thương chuẩn trong `autoAttack()` và proc `passive:fissure_cleave` trong `tools/sim/engine.mjs` | `test("Toy 3: Dung Thach fissure cleave true damage & celestial harp soft-CC cleanse...")` | `SUPPORTED` |
| **Thiên Cầm Xóa Khống Chế Mềm & Giảm 25% Sát Thương** | `passive.harpDmgReduction: 0.25`, `harpDuration: 1.5`, `harpChannel: 1.0` | Đã hỗ trợ xóa `dt.slows` và reset `dt.rootUntil`, áp dụng `dt.lockUntil = W.t + 1.0` và proc `passive:celestial_harp` | `test("Toy 3: Dung Thach fissure cleave true damage & celestial harp soft-CC cleanse...")` | `SUPPORTED` |
| **Khai Sơn Phách Phóng Đường Thẳng Q** | `q.aim: skillshot`, `width: 1.6`, `speed: 24`, `range: 6.8`, `damage`, `effects: [{slow: 0.3}]` | Đã mô phỏng vệt chém đường thẳng và làm chậm $30\%$ trong $1.2\text{s}$ | `tools/sim/run.mjs` (Duel & Teamfight) | `SUPPORTED` |
| **Thiên Cầm Thánh Âm Tự Niệm W (YAML rmb)** | `rmb.aim: self`, `shield: { base: [70..210], duration: 2.5 }` | Đã mô phỏng lớp khiên hấp thụ và kích hoạt logic gảy đàn | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Cuồng Phách Toái Giáp Xoay Tròn E** | `e.aim: area`, `radius: 3.5`, `damage`, `effects: [{slow: 0.25}]` | Đã mô phỏng vùng ảnh hưởng hình tròn quanh tâm nhân vật và hút máu | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Thiên Địa Bạt Sơn Nhảy Vồ Diện Rộng R** | `r.aim: area`, `range: 5.5`, `radius: 4.8`, `dash: {distance: 5.5}`, `stun: 0.8` | Đã mô phỏng lướt tới tâm chấn, gây choáng $0.8\text{s}$ và sát thương khủng | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát $4.5\text{m}$ | Engine combat core | `SUPPORTED` |
| **Kiểm tra điều kiện cứng không được bấm W khi dính Stun** | Chặn bấm chiêu đàn W khi đang bị Hard CC | Simulator kiểm tra điều kiện cast cơ bản; cần kiểm tra input buffer chặt chẽ | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Hoạt ảnh gảy đàn đồng bộ ngắt khi bấm Dash D** | Hủy hoạt ảnh gảy đàn mượt mà khi bấm né D | Simulator xử lý theo cờ trạng thái logic; chưa có animation blending | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo dữ liệu chạy cân bằng mô phỏng của bộ tướng Đấu Sĩ Hài Hòa (`dung_thach`):
- **Phân khúc chỉ số:** Máu cơ bản $740$, Sát thương vật lý $68$, Giáp $38$, Kháng phép $32$, Tốc độ chạy $6.35\text{m/s}$ — thuộc nhóm đấu sĩ cận chiến có sát thương duy trì cao nhất.
- **Tỷ lệ thắng trung bình (Mô hình 200 trận đối đầu):** Nằm trong biên độ chuẩn an toàn $50.1\% - 53.6\%$.
- **Đánh giá sức mạnh:** Rất mạnh trong các pha tay đôi 1v1 kéo dài nhờ sát thương chuẩn đòn thứ 3; chiêu W giúp sống sót tốt trước các pha dồn sát thương của sát thủ đối phương.
- **Trang bị đề xuất đã kiểm chứng:** `[heartforge, oathguard_plate, iron_plate, keeneye, bastion_stone]`.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Khả năng phối hợp âm thanh tiếng đàn hòa bình của W với nhạc nền trận đấu trên Spawn runtime để tạo cảm xúc giải hòa chân thực mà không gây ức chế âm thanh cho người chơi khác.
