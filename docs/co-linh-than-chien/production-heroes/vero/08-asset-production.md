# 08 · Asset Production — #03 Vero (Vết Kiếm)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#03 / vero`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `humanoid_medium_biped` (Kiếm khách thanh tú, giáp nhẹ) | Dáng đứng nghiêng thủ thế góc $45^\circ$, trọng tâm linh hoạt |
| **Chiều cao đỉnh đầu (Height)** | `1.82m` | Chiều cao tiêu chuẩn của kiếm sĩ hình người |
| **Bán kính Capsule va chạm (Radius)** | `0.42m` | Bán kính thon gọn giúp lướt luồn lách qua khe hẹp |
| **Chiều cao Capsule (Height)** | `1.82m` | Dùng cho hitbox trúng đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Budget)** | $\le 13,500$ Triangles | Tối ưu hóa cho combat 5v5 không giật lag ở 60 FPS |
| **Hệ thống phân cấp LOD** | LOD0: $13.5\text{k}$ tris \| LOD1: $7.5\text{k}$ tris \| LOD2: $3.0\text{k}$ tris | Giảm tải đa giác theo khoảng cách camera |
| **Chất liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ nhân vật; $1024 \times 1024$ kiếm |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Tên vũ khí:** Thời Không Tinh Kiếm (`chrono_crystal_longsword`).
- **Cấu tạo:** Trường kiếm một lưỡi thon dài, rèn từ thạch anh trắng bạc Cổ Linh trong suốt, chuôi kiếm bọc bạc cổ chạm khắc ký hiệu thời gian.
- **Bao kiếm:** Vỏ kiếm bọc da thuộc màu xanh đêm có viền bạc, gắn sau lưng hoặc đeo bên hông trái.
- **Socket điểm cầm tay (Grip Sockets):**
  - `socket_hand_r`: Cầm chuôi kiếm tay phải khi chiến đấu và thi triển chiêu thức.
  - `socket_sheath_back`: Điểm gắn vỏ kiếm sau lưng khi mang kiếm.
  - `socket_hand_l`: Tay trái giữ vỏ kiếm hoặc tạo thủ ấn thời gian khi niệm W/R.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ nguyên tắc Doc 28: Toàn thân chuyển động tự nhiên, có đà vung, bước dồn lực, hạ gối và thu hồi thế kiếm; cấm trượt mô hình tịnh tiến dạng slide.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `vero_idle` | Dáng đứng thanh thoát, tay phải cầm kiếm xuôi theo chân, áo choàng vạt dài bay nhẹ, hơi thở trầm | 2.0s loop | Không |
| `vero_run` | Bước chạy nhẹ nhàng như lướt trên gió, mũi chân tiếp đất êm, kiếm vung nhịp nhàng sau hông | 0.75s loop | Không |
| `vero_basic_slash_1` | Vung kiếm từ vai phải chém vát xuống hông trái dứt khoát | 0.4s / 1.1x | $0.10\text{s}$ (Frame 3) |
| `vero_basic_slash_2` | Xoay cổ tay chém hất ngang từ trái sang phải, vạt áo bay theo | 0.4s / 1.1x | $0.12\text{s}$ (Frame 4) |
| `vero_q_rift_dash` | Chùng gối phóng lướt người thẳng tới trước, kiếm chĩa thẳng đâm xuyên mục tiêu | 0.45s / 1.3x | $0.10\text{s}$ (Frame 3) |
| `vero_w_chrono_shield` | Tay trái kết ấn trước ngực, chân lùi nửa bước trụ vững, kết giới tinh thể bùng sáng | 0.35s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `vero_e_reverse_spin` | Xoay người $360^\circ$ trên mũi chân trái, kiếm vung một vòng tròn phẳng xé không khí | 0.5s / 1.2x | $0.12\text{s}$ (Frame 4) |
| `vero_r_chrono_execution` | Lướt biến ảnh $\rightarrow$ Tách 3 bóng chém liên hoàn 3 nhát tam giác $\rightarrow$ Thu kiếm tra bao | 0.9s / 1.1x | Hit 1: $0.35\text{s}$ \| Hit 2: $0.45\text{s}$ \| Hit 3: $0.55\text{s}$ |
| `vero_dash_d` | Lướt nghiêng lách người né chiêu theo hướng di chuyển, để lại tàn ảnh bạc mờ | 0.35s / 1.3x | Không |
| `vero_death` | Kiếm cắm xuống đất chống đỡ, tay ôm ngực gục một gối trước khi tan biến thành bụi tinh thể | 2.2s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Thời gian không chờ đợi ai... và kiếm của ta cũng vậy."
  - *Ban Voice:* "Ngươi chỉ đang trì hoãn cái chết không thể tránh khỏi."
  - *Attack Voice:* "Đoạn tuyệt!", "Chậm chạp!", "Vết cắt đã định."
  - *Cast Q:* "Xuyên phá thời không!"
  - *Cast R:* "VẠN KIẾM... QUY THỜI!"
  - *Echo Pop Kill:* "Ngươi đã chết từ 2 giây trước."
- **Sound Effects (SFX):**
  - `sfx_vero_blade_swing`: Tiếng kiếm tinh thể rít thanh mảnh xé gió.
  - `sfx_vero_rift_countdown`: Tiếng tíc tắc đồng hồ đếm ngược nhịp nhàng vang trên đầu nạn nhân.
  - `sfx_vero_echo_pop`: Tiếng nổ thủy tinh tinh thể vỡ toang sắc lạnh "KENGGG!" khi kích nổ vết nứt.
  - `sfx_vero_shield_pulse`: Tiếng ngưng tụ năng lượng thời gian tạo khiên mượt mà.

---

## 5. Điểm Nạp Dữ Liệu Vào Runtime (Runtime Import Pointers)

- Mesh model path: `assets/models/heroes/vero/mesh.glb` (Thực hiện sau Gate 4 Sign-Off).
- Animation clips directory: `assets/animations/heroes/vero/*.glb`
- VFX definition pointer: `scripts/lib/skillfx.js` $\rightarrow$ ánh xạ profile `vero`.
- Candidate YAML sang Live Kit: Sao chép từ `tools/sim/candidates/vero.yml` vào `scripts/lib/data/heroes.yml` chỉ sau khi được Owner chính thức ký duyệt.
