# 08 · Asset Production — #36 Rolo (Tê Tê Khiên)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#36 / rolo`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `quadruped_beast_pangolin` (Cổ thú tê tê 4 chân bọc vảy sừng) | Dáng bò 4 chân vững chắc, đuôi to bản quét đất; **tuyệt đối không làm rig cuộn tròn lăn húc** |
| **Chiều cao vai (Shoulder Height)** | `1.45m` | Trọng tâm thấp, bề ngang rộng |
| **Chiều dài thân (Body Length)** | `2.60m` (kể cả đuôi) | Đuôi chiếm ~1.1m chiều dài cơ thể |
| **Bán kính Capsule va chạm (Radius)** | `0.65m` | Bán kính rộng phản ánh thể hình xe tăng bọc thép |
| **Chiều cao Capsule (Height)** | `1.50m` | Dùng cho va chạm cơ học và nhận diện kỹ năng |
| **Giới hạn lưới đa giác (Polygon Budget)** | $\le 14,000$ Triangles | Tối ưu hóa cho các lớp vảy sừng xếp lớp 3D |
| **Hệ thống phân cấp LOD** | LOD0: $14.0\text{k}$ tris \| LOD1: $8.0\text{k}$ tris \| LOD2: $3.5\text{k}$ tris | Giảm tải vảy chi tiết ở khoảng cách xa |
| **Chất liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ thân vảy; $1024 \times 1024$ vuốt móng và chi tiết |

---

## 2. Kế Hoạch Vũ Khí & Khớp Xương Rig (Weapon & Rig Plan)

- **Vũ khí liền thân:**
  - `scales_armor_mesh`: Hệ thống vảy sừng kim loại xếp lớp trên lưng, có xương điều khiển (Blendshape / Bone) để hé mở khi bung vảy trong Dạng Cuồng Chiến.
  - `front_claws`: Bộ vuốt trước sắc bén bằng kim loại hóa thạch dài 45cm.
  - `heavy_tail`: Đuôi bọc vảy cứng nặng nề, có chuỗi 5 khớp xương (Tail Chain Bones) để thực hiện các động tác quất ngang và đập đất uy lực.
- **Socket điểm hiệu ứng (VFX Sockets):**
  - `socket_tail_tip`: Đầu đuôi để kích hoạt vệt quất Q và đập E.
  - `socket_back_crest`: Sống lưng để phát tỏa luồng khí nhiệt và khiên W.
  - `socket_forehead`: Trán bọc thép để hiển thị mũi khoan húc chiêu R.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ nghiêm ngặt Doc 28: Hoạt ảnh 4 chân dã thú chân thực, có quán tính nặng nề, cơ bắp nhấp nhô; cấm tạo chuyển động cuộn tròn thành quả bóng lăn.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `rolo_idle` | Đứng 4 chân thở phì phò, đầu hơi lắc lư, đuôi quét nhẹ sang hai bên, vảy sừng nhấp nhô nhẹ | 2.2s loop | Không |
| `rolo_walk` | Bước đi 4 chân đầm chắc, móng vuốt cào xới đất, đuôi đong đưa cân bằng thân mình | 0.9s loop | Không |
| `rolo_run_gallop` | Phi nước đại 4 chân dũng mãnh, hai chân trước và sau nhịp nhàng đẩy thân mình lao vút | 0.65s loop | Không |
| `rolo_basic_claw_r` | Dậm chân trái, vuốt trước phải cào xé từ trên xuống dưới | 0.45s / 1.1x | $0.12\text{s}$ (Frame 3) |
| `rolo_basic_claw_l` | Vung vuốt trước trái cào xéo ngang từ dưới lên | 0.45s / 1.1x | $0.15\text{s}$ (Frame 4) |
| `rolo_q_tail_whip` | Xoay nửa thân sang trái, quất mạnh đuôi sang phải bắn tung vảy sừng tới trước | 0.5s / 1.2x | $0.12\text{s}$ (Frame 3) |
| `rolo_w_shed_roar` | Dậm 2 chân trước gầm nhẹ, các phiến vảy trên lưng bung hé mở ra ngoài | 0.4s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `rolo_e_tail_slam` | Nhấc bổng đuôi lên cao rồi dập sầm xuống mặt đất tạo sóng xung kích địa chấn | 0.55s / 1.1x | $0.15\text{s}$ (Frame 4) |
| `rolo_r_iron_rampage` | Hạ thấp đầu, phi nước đại 4 chân cày xới mặt đất lao tới húc sầm xuống tâm điểm đích | 0.9s / 1.1x | Va chạm nổ đất: $0.50\text{s}$ |
| `rolo_dash_d` | Nhún 4 chân bật lướt ngang lách người né đạn theo hướng di chuyển | 0.4s / 1.2x | Không |
| `rolo_death` | 4 chân khuỵu xuống, đầu gối lên hai chân trước, các phiến vảy rủ xuống xám xịt | 2.5s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over / Vocalization (Dã thú cổ đại có tri giác):**
  - *Pick Sound:* Tiếng gầm kim loại trầm đục "GRÙUUUM... RẮC!" kèm tiếng vảy kim loại va đập.
  - *Ban Sound:* Tiếng khè gắt gỏng của tê tê cổ đại.
  - *Attack Voice:* Tiếng thở phì phò dồn dập "HÀNH... HỰ!".
  - *Cast W (Bung vảy):* Tiếng gầm bộc phát cuồng loạn "GRAOÒOÒ!".
  - *Cast R:* Tiếng gầm xung trận dũng mãnh làm rung chuyển đất trời.
- **Sound Effects (SFX):**
  - `sfx_rolo_claws_tear`: Tiếng vuốt sắt cào vào đất đá đanh thép.
  - `sfx_rolo_scales_rattle`: Tiếng vảy sừng cọ xát leng keng như áo giáp sắt khi di chuyển.
  - `sfx_rolo_shed_burst`: Tiếng khớp kim loại bật mở "KHẬC... TENG!" khi bung vảy.
  - `sfx_rolo_tail_slam`: Tiếng va đập địa chấn "RẦM... RẮC!" nặng trịch của chiêu E.
  - `sfx_rolo_rampage_impact`: Tiếng nổ va chạm long trời lở đất "OÀNGGG!" của chiêu cuối R.

---

## 5. Điểm Nạp Dữ Liệu Vào Runtime (Runtime Import Pointers)

- Mesh model path: `assets/models/heroes/rolo/mesh.glb` (Thực hiện sau Gate 4 Sign-Off).
- Animation clips directory: `assets/animations/heroes/rolo/*.glb`
- VFX definition pointer: `scripts/lib/skillfx.js` $\rightarrow$ ánh xạ profile `rolo`.
- Candidate YAML sang Live Kit: Chuyển dữ liệu từ `tools/sim/candidates/rolo.yml` vào `scripts/lib/data/heroes.yml` chỉ sau khi được Owner chính thức ký duyệt.
