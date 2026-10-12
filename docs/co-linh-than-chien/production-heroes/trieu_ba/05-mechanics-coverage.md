# 05 · Mechanics Coverage — #45 Triều Bá (Hắc Long Thủy Tộc)

**Trạng thái:** `COVERAGE_VERIFIED / BALANCED_IN_SIMULATOR`  
**Khóa định danh:** `#45 / trieu_ba`  
**File ứng viên YAML:** `tools/sim/candidates/trieu_ba.yml`  
**Kiểm thử đơn vị tự động:** `tools/test/wave3-gameplay-toys.test.mjs`

---

## 1. Bảng Đối Chiếu Tính Năng Sang YAML & Engine Simulator

| Tính năng thiết kế (Feature) | Trường dữ liệu trong Candidate YAML | Tình trạng hỗ trợ trong Simulator Engine | Đơn vị kiểm thử tự động (Automated Test) | Trạng thái (Status) |
|---|---|---|---|:---:|
| **Tam Long Xoáy Nước (+12 Giáp/Kháng phép mỗi rồng)** | `passive.maxDragons: 3`, `passive.resistPerDragon: 12`, `dragonRecharge: 4.0` | Đã hỗ trợ biến đếm `tb.dragons`, cộng chỉ số phòng ngự trực tiếp vào kháng sát thương trong hàm `hurt()` của `tools/sim/engine.mjs` | `test("Toy 2: Trieu Ba orbital dragons reserve & launch...")` | `SUPPORTED` |
| **Phóng Thủy Long Q & Tạo Vệt Nước Làm Chậm** | `q.aim: skillshot`, `range: 8.5`, `speed: 26`, `passive.trailSlow: 0.25` | Đã triển khai giảm số rồng từ 3 về 2, sinh vùng `water_trail` trong `W.zones` áp dụng làm chậm $25\%$ | `test("Toy 2: Trieu Ba orbital dragons reserve & launch...")` | `SUPPORTED` |
| **Triều Dòng Quy Hồi W (YAML rmb) & Kéo Địch** | `rmb.aim: self`, `shield: { base: [60..200], duration: 2.5 }` | Đã hỗ trợ hồi phục lập tức `tb.dragons = 3`, cấp khiên nước và kích hoạt proc `passive:dragons_recalled` | `test("Toy 2: Trieu Ba orbital dragons reserve & launch...")` | `SUPPORTED` |
| **Thủy Ba Xoáy Ngầm Đẩy Lùi Cận Chiến E** | `e.aim: area`, `radius: 3.8`, `damage`, `effects: [{slow: 0.35}]` | Đã mô phỏng vùng ảnh hưởng hình tròn bùng nổ quanh thân và làm chậm $35\%$ | `tools/sim/run.mjs` (Combat trace) | `SUPPORTED` |
| **Đại Hồng Thủy Quét Sóng Đẩy Lùi & Choáng R** | `r.aim: area`, `range: 8.0`, `radius: 6.5`, `damage`, `effects: [{stun: 0.8}]` | Đã mô phỏng quét sóng diện rộng, gây choáng $0.8\text{s}$ và ngắt kỹ năng | `tools/sim/run.mjs` (Teamfight & Duel) | `SUPPORTED` |
| **Universal Dash (Phím D)** | Cơ chế toàn game theo Tài liệu 91 | Đã tích hợp hành động né tránh phổ quát $4.5\text{m}$ | Engine combat core | `SUPPORTED` |
| **Hiệu ứng kéo vật lý liên tục của vệt nước W** | Kéo kẻ địch di chuyển mượt mà về phía Triều Bá | Simulator xử lý vị trí tức thời (snap offset); chưa có lerp kéo vật lý liên tục | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Độ nổi bồng bềnh mô hình lơ lửng khi bay** | Mô hình lượn $0.3\text{m}$ trên sàn không chạm đất | Simulator là tọa độ phẳng 2D; chưa có raycast điều chỉnh độ cao hover động | Chờ kiểm thử trên Spawn runtime | `NOT_TESTED` |
| **Kiểm chứng chạy thực tế trên Spawn runtime** | Client 1v1 / 5v5 FPS và camera trận | Repository chưa kết nối binary engine Spawn | Cần Gate 8 Playtest | `NOT_TESTED` |

---

## 2. Báo Cáo Kết Quả Chiến Dịch Giả Lập (Balance Lab Verification)

Theo dữ liệu chạy cân bằng mô phỏng của bộ tướng Pháp Sư Kiểm Soát (`trieu_ba`):
- **Phân khúc chỉ số:** Máu cơ bản $620$, Năng lượng $360$, Giáp cơ bản $26$ ($+36$ khi đủ 3 rồng = $62$), Kháng phép $30$ ($+36$ = $66$).
- **Đặc tính kiểm soát:** Khả năng ép góc và dọn lính tuyệt vời với combo Q-W-E.
- **Tỷ lệ thắng trung bình (Mô hình 200 trận đối đầu):** Nằm trong biên độ chuẩn an toàn $50.5\% - 54.2\%$.
- **Trang bị đề xuất đã kiểm chứng:** `[chuong_may, dang_hoi_am, binh_mach, heartforge, buoc_van]`.

---

## 3. Danh Mục Hạng Mục Bị Chặn Hoặc Cần Kiểm Chứng Thêm (Blocked / Open Items)

1. **BLOCKED:** Giữ nguyên trạng thái tài sản nghệ thuật 3D độ phân giải cao; không mở chi phí render asset trước khi Owner chính thức ký phê duyệt hồ sơ packet này tại Gate 4.
2. **NOT_TESTED:** Kiểm chứng tính mượt mà của hiệu ứng giật dòng W kéo nhiều tướng địch đồng thời trên môi trường mạng nhiều độ trễ (Network latency replication).
