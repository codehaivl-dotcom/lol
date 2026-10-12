# 08 · Asset Production — #39 Kael (Cuồng Đao)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#39 / kael`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `humanoid_medium_biped` (Kiếm khách cơ bắp trung bình) | Dáng đứng chùng gối hình chữ V, hạ thấp trọng tâm |
| **Chiều cao đỉnh đầu (Height)** | `1.85m` | Khớp tỷ lệ với các đấu sĩ humanoid |
| **Bán kính Capsule va chạm (Radius)** | `0.45m` | Tối ưu cho việc lướt qua khoảng trống hẹp giữa lính |
| **Chiều cao Capsule (Height)** | `1.85m` | Dùng cho va chạm đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 13,800$ Triangles | Tối ưu hóa cho trận đấu 5v5 60 FPS |
| **Hệ thống LOD** | LOD0: $13.8\text{k}$ tris \| LOD1: $7.8\text{k}$ tris \| LOD2: $3.2\text{k}$ tris | Giảm tải khi nhiều tướng combat |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho tướng; $1024 \times 1024$ cho vũ khí |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Tên vũ khí:** Huyết Thạch Song Đao (`twin_bloodstone_sabers`).
- **Cấu tạo:** Hai thanh loan đao rèn từ tinh thể thạch anh đỏ sẫm, cán bọc da thú buộc thừng đen Cổ Linh.
- **Socket điểm cầm tay (Grip Sockets):**
  - `socket_hand_r`: Cầm thanh đao phải (lưỡi chĩa về phía trước theo chiều thuận).
  - `socket_hand_l`: Cầm thanh đao trái (lưỡi xoay linh hoạt hỗ trợ chém kép).
  - `socket_waist_r` & `socket_waist_l`: Bao đao hai bên hông khi ở trạng thái Idle nghỉ ngơi ngoài giao tranh.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ nguyên tắc Doc 28: Toàn thân chuyển động, gối khuỵu, lưng gập/xoắn, hông lên xuống theo quán tính; cấm đẩy cả người từ A sang B.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `kael_idle` | Thủ thế chùng gối, hai tay cầm song đao ngang hông, nhịp thở nhanh nhẹ | 1.8s loop | Không |
| `kael_run` | Nước rút linh hoạt trên mũi chân, hai đao vung so le theo bước chạy | 0.7s loop | Không |
| `kael_basic_slash_r` | Chém vát từ vai phải xuống hông trái dứt khoát | 0.45s / 1.1x | $0.10\text{s}$ (Frame 3) |
| `kael_basic_slash_l` | Vung đao trái hất chéo từ dưới lên theo đà xoay hông | 0.45s / 1.1x | $0.12\text{s}$ (Frame 4) |
| `kael_basic_frenzy_x` | Chém đan chéo chữ X hai đao cùng lúc ở tốc độ cao (5 tầng) | 0.35s / 1.4x | $0.08\text{s}$ (Frame 2) |
| `kael_q_dash_strike` | Lao vút người tới trước, hai đao kẹp song song xuyên qua mục tiêu | 0.45s / 1.3x | $0.10\text{s}$ (Frame 3) |
| `kael_w_twin_sweep` | Xoay người một vòng rưỡi chém kép 2 nhịp liên hoàn quanh thân | 0.55s / 1.2x | Hit 1: $0.10\text{s}$ \| Hit 2: $0.22\text{s}$ |
| `kael_e_stim` | Bắt chéo hai đao trước ngực gầm nhẹ, ngực ưỡn nhận luồng khí huyết | 0.4s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `kael_r_storm_spin` | Lao tới điểm chọn, xoay người 3 vòng liên hoàn trên không chém bão đao | 0.9s / 1.1x | Hit 1: $0.25\text{s}$ \| Hit 2: $0.40\text{s}$ \| Hit 3: $0.55\text{s}$ |
| `kael_dash_d` | Nhún chân bật lướt nghiêng lách người né đạn theo hướng di chuyển | 0.4s / 1.3x | Không |
| `kael_death` | Hai đao rơi cắm xuống đất, Kael khuỵu hai gối gục xuống trước khi tan biến | 2.0s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Huyết mạch sôi trào, đao không thể dừng lại!"
  - *Ban Voice:* "Kẻ chậm chạp sẽ chẳng bao giờ hiểu được nhịp chém này."
  - *Attack Voice:* "Chém!", "Nhanh hơn!", "Đỡ lấy!"
  - *Cast Q:* "Xé toạc!"
  - *Cast R:* "HUYẾT CUỒNG PHONG MA!"
- **Sound Effects (SFX):**
  - `sfx_kael_blade_swish`: Tiếng song đao rít sắc lẹm xé gió.
  - `sfx_kael_frenzy_heartbeat`: Tiếng nhịp tim dồn dập vang lên khi đạt 5 tầng Cuồng Nhịp.
  - `sfx_kael_r_blade_storm`: Tiếng 3 nhát chém bão liên thanh "XOẸT - XOẸT - ROẸT".

---

## 5. Điểm Nạp Dữ Liệu Vào Runtime (Runtime Import Pointers)

- Mesh model path: `assets/models/heroes/kael/mesh.glb` (Sau Gate 4).
- Animation clip directory: `assets/animations/heroes/kael/*.glb`
- VFX definition pointer: `scripts/lib/skillfx.js` $\rightarrow$ gán profile `kael`.
- Candidate YAML to live kit: Sao chép từ `tools/sim/candidates/kael.yml` sang `scripts/lib/data/heroes.yml` chỉ sau khi có Owner Gate 4 Sign-Off.
