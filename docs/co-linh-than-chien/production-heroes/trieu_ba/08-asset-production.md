# 08 · Asset Production — #45 Triều Bá (Hắc Long Thủy Tộc)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#45 / trieu_ba`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `hovering_dragon_mage` (Pháp sư hình thể rồng lơ lửng, bay là là mặt đất) | Thân dưới quấn nước xoáy trong suốt, 3 quả cầu rồng xoay quanh eo. |
| **Chiều cao Battle Form** | Đỉnh mũ miện san hô: `2.10m` \| Độ cao cách mặt sàn: `0.30m` | Tổng chiều cao đỉnh đầu cách mặt đất: `2.40m`. |
| **Độ rộng sải cánh áo choàng** | `1.50m` (khi lơ lửng bay) | Silhouette xòe rộng hình quạt nhận diện từ trên cao. |
| **Bán kính Capsule va chạm (Radius)** | `0.60m` | Hitbox chuẩn pháp sư tầm xa, cân đối và thanh thoát. |
| **Chiều cao Capsule (Height)** | `2.10m` | Khối va chạm chọn mục tiêu và đạn đạo. |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 15,500$ Triangles | Bao gồm cả mô hình Triều Bá và 3 quả cầu rồng xoay quanh. |
| **Hệ thống LOD** | LOD0: $15.5\text{k}$ tris \| LOD1: $8.5\text{k}$ tris \| LOD2: $3.5\text{k}$ tris | Giảm tải tối đa trong combat 5v5. |
| **Vật liệu & Texture (Material)** | PBR kết hợp Water Refraction Shader | Texture $2048 \times 2048$ cho nhân vật + kích; Shader nước động cho 3 rồng và sóng. |

---

## 2. Kế Hoạch Sockets & Điểm Gắn Kết (Sockets Plan)

- **Hệ thống Socket gắn kết mô hình Triều Bá:**
  - `socket_trident_hand_r`: Điểm cầm Thủy Thần Kích ba chĩa ở bàn tay phải.
  - `socket_trident_tip`: Ba đầu mũi kích phát tia nước đánh thường và cắm sàn chiêu R.
  - `socket_hand_l`: Bàn tay trái phóng Thủy Long chiêu Q và nắm tay thu hồi chiêu W.
  - `socket_orbit_dragon_1`, `socket_orbit_dragon_2`, `socket_orbit_dragon_3`: Ba điểm neo di động xoay quanh tâm eo (quỹ đạo bán kính $0.9\text{m}$) để gắn 3 quả cầu rồng.
  - `socket_hover_base`: Điểm chân đế dưới đáy gợn xoáy nước mỏng, gắn VFX gợn sóng lướt đi trên sàn.
  - `socket_crown_head`: Mũ miện san hô phát quang xanh tím.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Phong cách bay lượn mềm mại, uyển chuyển của loài rồng biển, động tác vung kích dứt khoát và quyền uy.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `trieu_ba_idle` | Lơ lửng trên gợn nước, vạt áo choàng đuôi rồng gợn sóng, tay cầm kích tựa nghiêng, 3 rồng lượn quanh | 2.8s loop | Không |
| `trieu_ba_float_move` | Lướt đi nhẹ nhàng về phía trước, thân hơi nghiêng theo hướng gió, gợn nước rẽ sóng | 1.0s loop | Không |
| `trieu_ba_attack` | Chĩa mũi kích về phía trước bắn tia thủy kích ba mũi áp lực cao | 0.6s / 1.0x | $0.14\text{s}$ (Frame 4) |
| `trieu_ba_q_launch` | Vung mạnh tay trái chỉ về hướng mục tiêu, 1 rồng nước gầm lên lao vút đi | 0.5s / 1.1x | $0.15\text{s}$ (Frame 5) |
| `trieu_ba_w_recall` | Siết chặt nắm tay trái trước ngực, dòng xoáy giật ngược, rồng bay về tạo bong bóng khiên | 0.45s / 1.2x | Kích hoạt tức thì $0.0\text{s}$ |
| `trieu_ba_e_geyser` | Xoay tròn mũi kích một vòng quanh người, cột nước xoáy bùng nổ đẩy lùi | 0.55s / 1.1x | $0.10\text{s}$ (Frame 3) |
| `trieu_ba_r_deluge` | Bay vút lên cao -> Cắm phập Thủy Thần Kích xuống sàn -> Dang hai tay dâng sóng thần quét tới | 1.25s / 1.0x | $0.55\text{s}$ (Frame 17) |
| `trieu_ba_dash_d` | Hóa dạng một gợn sóng nước lướt dạt ngang né đòn $4.5\text{m}$ | 0.35s / 1.3x | Không |
| `trieu_ba_hit_react` | Cơ thể ngửa nhẹ ra sau, bọt nước văng tóe quanh người nhưng giữ thăng bằng bay | 0.3s / 1.0x | Không |
| `trieu_ba_death` | Thủy Thần Kích tuột khỏi tay cắm xuống đất, cơ thể rồng tan biến thành vũng nước đen tím ngấm vào sàn | 2.6s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Biển Đông cuộn sóng, kẻ nào dám ngăn bước Hắc Long?"
  - *Ban Voice:* "Chỉ có kẻ sợ chết chìm mới lùi bước trước đại dương."
  - *Skill Voice:* "Cuốn phăng!", "Thủy triều nghịch chuyển!", "Nuốt chửng chúng!"
  - *Ultimate Voice:* "ĐẠI HỒNG THỦY — NHẤN CHÌM CẢ VẠN VẬT!"
- **Sound Effects (SFX):**
  - Tiếng nước chảy róc rách nhịp nhàng khi lơ lửng, tiếng rồng nước gầm nhẹ âm sắc biển sâu.
  - Tiếng tia nước xé gió áp lực cao sắc bén và tiếng nổ bọt khí khi bắn trúng mục tiêu.
  - Tiếng triều cường rút đáy biển gầm rú và tiếng sóng thần đổ sập ầm ầm kinh hoàng.
