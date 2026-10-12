# 08 · Asset Production — #01 Kiko (Ảnh Hầu Song Trảo)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#01 / kiko`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `humanoid_agile_crawler` (Linh hầu sát thủ lưng cong) | Trọng tâm ép sát mặt đất; xương sống uốn dẻo linh hoạt |
| **Chiều cao Battle Form** | Đứng thẳng: `1.65m` \| Trườn bò chiến đấu: `1.15m` | Tối ưu hóa thu nhỏ silhouette dưới camera isometric |
| **Bán kính Capsule va chạm (Radius)** | `0.45m` | Thân hình mảnh mai, dễ dàng luồn lách qua khe hẹp |
| **Chiều cao Capsule (Height)** | `1.65m` | Dùng cho va chạm đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 12,000$ Triangles | Tối ưu hóa cho combat 5v5 60 FPS (kể cả khi spawn Decoy) |
| **Hệ thống LOD** | LOD0: $12.0\text{k}$ tris \| LOD1: $7.0\text{k}$ tris \| LOD2: $2.8\text{k}$ tris | Giảm tải khi nhiều bóng ảo xuất hiện |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho tướng; $1024 \times 1024$ cho vũ khí vuốt |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Vũ khí độc bản — Song Trảo Cơ Khí Gắn Mu Tay (`wrist_mechanical_claws`):**
  - Cấu tạo: Khung gá bằng hợp kim đồng đen gắn chặt quanh cổ tay và mu bàn tay; 3 lưỡi vuốt thép sắc lẹm vươn dài qua các đầu ngón tay ($0.35\text{m}$).
  - Gắn trực tiếp vào socket: `socket_claw_wrist_r` (tay phải) và `socket_claw_wrist_l` (tay trái).
  - **Tuyệt đối không có socket cầm gậy hay kiếm sau lưng.**
- **Hệ thống Socket phụ trợ quang học:**
  - `socket_head_mask`: Vị trí gắn mặt nạ đồng Cổ Linh và điểm nhấp nháy mắt tím.
  - `socket_spine_prism`: Vị trí các lăng kính Tinh Thạch trên lưng dùng để bung hiệu ứng khúc xạ tạo Ảo ảnh (Decoy Spawn).
  - `socket_claw_tip_r` / `socket_claw_tip_l`: Đầu móng vuốt phát quang vệt chém tím neon.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Dáng chạy trườn bò 4 chi, khớp hông và lưng chuyển động nhịp nhàng như thú săn mồi; không đẩy cả người từ A sang B.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `kiko_idle` | Khom lưng hạ thấp trọng tâm, hai tay chống nhẹ đất, đầu liếc ngang dọc cảnh giác | 2.0s loop | Không |
| `kiko_walk` | Trườn bò 4 chi chậm rãi khi di chuyển ngoài tầm nhìn | 0.8s loop | Không |
| `kiko_run` | Nhào lộn 4 chi cực nhanh sát mặt đất, để lại vệt bụi quang học tím | 0.55s loop | Không |
| `kiko_basic_claw_a` | Tay phải vung vuốt cào vát chéo từ trên xuống | 0.5s / 1.1x | $0.10\text{s}$ (Frame 3) |
| `kiko_basic_claw_b` | Tay trái xoay cổ tay móc vuốt ngược lên hiểm hóc | 0.5s / 1.1x | $0.12\text{s}$ (Frame 4) |
| `kiko_basic_burst` | Hai tay đan chéo vung song trảo cào bộc phát sát thương nội tại | 0.6s / 1.2x | $0.12\text{s}$ (Frame 4) |
| `kiko_q_dash` | Co người nhào lộn phóng vút $6.0\text{m}$ tới trước xé toạc mục tiêu | 0.4s / 1.3x | $0.15\text{s}$ (Frame 5) |
| `kiko_w_backflip` | Đạp đất lộn ngược $2.0\text{m}$ ra sau, hai tay bung sóng lăng kính tạo khiên | 0.5s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `kiko_e_swipe` | Xoay người quét song trảo 2 vòng chéo hình chữ X càn quét kẻ địch | 0.6s / 1.2x | HIT 1: $0.08\text{s}$, HIT 2: $0.18\text{s}$ |
| `kiko_r_strike` | Phân thân 3 hướng lao vút tới, xả chuỗi trảo kích liên hoàn và tiếp đất 4 chân | 1.1s / 1.1x | $0.50\text{s}$ (Frame 16) |
| `kiko_dash_d` | Trườn bò lướt dạt ngang né đòn $4.5\text{m}$ | 0.35s / 1.4x | Không |
| `kiko_death` | Lăng kính vỡ vụn, Kiko ngã sấp mặt đất, song trảo tóe tia lửa ngắn rồi tan thành tro bụi tím | 2.0s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Đừng tin vào những gì mắt ngươi nhìn thấy."
  - *Ban Voice:* "Bóng tối sẽ tìm đến ngươi khi ngươi ít ngờ nhất."
  - *Attack Voice:* "Xé rách!", "Quá chậm!", "Bắt được rồi!"
  - *Ultimate Voice:* "VẠN ẢNH VÂY HÃM — KHÔNG LỐI THOÁT!"
- **Sound Effects (SFX):**
  - Tiếng bước chân 4 chi chạm đất nhẹ tênh như mèo rừng.
  - Tiếng "XOẸT - XOẸT" của song trảo hợp kim khi chém rách không khí.
  - Tiếng "TÁCH" thanh mảnh khi Ảo ảnh quang học hấp thụ đòn đánh của địch.
  - Tiếng lăng kính vỡ vụn và tiếng kim loại va đập liên hồi khi thi triển Ultimate R.
