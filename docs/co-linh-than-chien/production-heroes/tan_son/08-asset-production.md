# 08 · Asset Production — #44 Tản Sơn (Thánh Sơn Cổ Thạch)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#44 / tan_son`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `colossus_biped` (Người khổng lồ đá hai chân, cấu trúc tam giác ngược) | Khối vai ngọc bích bề thế vát nghiêng $45^\circ$, ngực mang mặt trống đồng Đông Sơn tròn. |
| **Chiều cao Battle Form** | Đỉnh đầu cự thạch: `2.50m` \| Đỉnh vai ngọc bích: `2.65m` | Tối ưu hóa dưới góc camera isometric $55^\circ$, không che tầm nhìn. |
| **Độ rộng sải vai (Shoulder Width)** | `1.90m` | Nhận diện rõ nét hình khối Colossus từ góc nhìn trên cao. |
| **Bán kính Capsule va chạm (Radius)** | `0.80m` | Hitbox tướng đỡ đòn lớn, chắn đòn tốt cho đồng minh phía sau. |
| **Chiều cao Capsule (Height)** | `2.50m` | Khối trụ va chạm đạn đạo và chọn mục tiêu. |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 16,500$ Triangles | Tối ưu hóa cho combat 5v5 60 FPS trên Spawn runtime. |
| **Hệ thống LOD** | LOD0: $16.5\text{k}$ tris \| LOD1: $9.0\text{k}$ tris \| LOD2: $3.8\text{k}$ tris | Giảm tải khi nhiều tướng dồn combat. |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture $2048 \times 2048$ cho thân cự thạch; $1024 \times 1024$ cho mặt trống đồng và vách núi W. |

---

## 2. Kế Hoạch Sockets & Điểm Gắn Kết (Sockets Plan)

- **Hệ thống Socket gắn kết mô hình Tản Sơn:**
  - `socket_chest_dongson`: Điểm gắn tâm mặt Trống Đồng Đông Sơn, phát quang hào quang mặt trời chiêu E.
  - `socket_shoulder_l` / `socket_shoulder_r`: Hai đỉnh vai ngọc bích, gắn VFX hạt tinh thạch xanh ngọc.
  - `socket_fist_l` / `socket_fist_r`: Hai bàn tay nắm đấm cự thạch granite, gắn vệt mờ khi đấm thường và dậm đất chiêu Q.
  - `socket_foot_l` / `socket_foot_r`: Hai bàn chân đá, gắn VFX bụi đất và rạn nứt sàn khi di chuyển và giáng đòn.
  - `socket_ground_impact`: Điểm gốc chân đế dưới sàn, dùng để sinh ra trận đồ trống đồng chiêu R và gốc Vách Núi W.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Động tác nặng nề, cơ học đá tảng đầm chắc, độ khựng lực rõ ràng, không uốn lượn dẻo như người thường.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `tan_son_idle` | Đứng sừng sững như tượng đá, hai tay buông lỏng hơi nắm, ngực rực ánh sáng vàng thở nhịp nhàng | 3.0s loop | Không |
| `tan_son_walk` | Bước đi nặng nề, mỗi bước chân dậm xuống làm rung chuyển nhẹ, vai ngọc bích lắc lư đầm | 1.1s loop | Không |
| `tan_son_attack_a` | Nện thẳng nắm đấm phải từ trên xuống theo góc đứng | 0.65s / 1.0x | $0.16\text{s}$ (Frame 5) |
| `tan_son_attack_b` | Vung tay trái đấm móc ngang đất uy lực làm văng bụi đá | 0.65s / 1.0x | $0.18\text{s}$ (Frame 5) |
| `tan_son_q_stomp` | Nhấc cao chân phải dậm sụp mặt đất, sóng nứt đất phóng thẳng | 0.55s / 1.1x | $0.20\text{s}$ (Frame 6) |
| `tan_son_w_raise_wall` | Đấm cả hai tay xuống đất nâng dãy ngọc bích mọc lên | 0.45s / 1.2x | Kích hoạt $0.10\text{s}$ |
| `tan_son_w_recast_smash` | Vung tay đập vỡ vụn vách đá thành các mảnh tinh thạch | 0.4s / 1.3x | $0.10\text{s}$ |
| `tan_son_e_solar_pulse` | Ưỡn ngực về phía trước, hai tay gồng sang ngang, mặt trống đồng bừng sáng chói lọi | 0.5s / 1.0x | $0.15\text{s}$ (Frame 4) |
| `tan_son_r_leap_slam` | Khuỵu gối dồn lực -> Bật nhảy lên không -> Giáng ầm cả hai tay và hai chân xuống sàn | 1.2s / 1.0x | $0.60\text{s}$ (Frame 18) |
| `tan_son_dash_d` | Gồng mình trượt dạt về hướng chỉ định, tạo vệt cày đá vụn $4.5\text{m}$ | 0.4s / 1.2x | Không |
| `tan_son_hit_react` | Cơ thể rung nhẹ, mảnh đá nhỏ văng ra nhưng chân không lùi bước | 0.3s / 1.0x | Không |
| `tan_son_death` | Mặt trống đồng tắt sáng rạn nứt, cơ thể cự thạch vỡ vụn thành các khối đá tảng đổ sụp xuống | 2.8s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Vững như Tản Viên, trường tồn cùng non nước!"
  - *Ban Voice:* "Núi đá ngàn năm, há vì một cơn bão mà lay động?"
  - *Skill Voice:* "Dựng lũy!", "Thái Dương giáng thế!", "Non sông chuyển mình!"
  - *Ultimate Voice:* "ĐỊA CHẤN KHAI SƠN — BẢO TRỢ ĐẠI VIỆT!"
- **Sound Effects (SFX):**
  - Tiếng đá tảng va đập nặng đục, tiếng rung chuyển mặt đất âm tần thấp (Sub-bass rumble).
  - Tiếng trống đồng ngân vang kim loại trầm ấm mang linh khí tổ tiên thời Đông Sơn.
  - Tiếng vách đá trồi lên từ lòng đất rôm rốp và tiếng tinh thạch ngọc bích vỡ tan vang giòn.
