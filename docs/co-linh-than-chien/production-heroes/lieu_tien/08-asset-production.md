# 08 · Asset Production — #40 Liễu Tiễn (Băng Cung Chiến Thuật)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#40 / lieu_tien`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `humanoid_female_ranger` (Nữ xạ thủ thanh mảnh) | Dáng người cao ráo, dáng đi lướt nhẹ, trọng tâm linh hoạt |
| **Chiều cao đỉnh đầu (Height)** | `1.75m` | Tỷ lệ chuẩn của nữ tộc Cổ Linh |
| **Bán kính Capsule va chạm (Radius)** | `0.45m` | Kích thước thon gọn, hạn chế bị kẹt lính khi thả diều |
| **Chiều cao Capsule (Height)** | `1.75m` | Dùng cho hit detection của đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 12,500$ Triangles | Tối ưu hóa hiệu năng render cho mobile/PC 60 FPS |
| **Hệ thống phân cấp LOD** | LOD0: $12.5\text{k}$ tris \| LOD1: $7.0\text{k}$ tris \| LOD2: $2.8\text{k}$ tris | Chuyển đổi mượt mà theo khoảng cách camera |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho nhân vật; $1024 \times 1024$ cho Băng Cung |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Tên vũ khí:** Thần Cung Liễu Diệp (`frost_willow_bow`).
- **Cấu tạo:** Cánh cung đúc từ Băng Tinh Ngàn Năm trong suốt màu xanh ngọc, hai đầu cánh cung bọc hoa văn lá liễu bằng đồng thau cổ. Dây cung ngưng tụ từ sợi tơ sương tuyết phát sáng mờ.
- **Cơ chế hoạt động của xương (Bone Rigging):** Cung có hệ thống xương chuyên biệt:
  - `bow_root`: Gốc cung gắn vào tay trái.
  - `bow_upper_limb`, `bow_lower_limb`: Xương uốn cong cánh cung khi kéo dây.
  - `bow_string`: Xương dây cung đàn hồi theo tay phải kéo mũi tên.
- **Socket điểm cầm tay (Grip Sockets):**
  - `socket_hand_l`: Tay trái nắm chắc giữa thân cung tại vị trí báng cầm.
  - `socket_hand_r`: Tay phải chạm vào dây cung để kéo và ngưng tụ mũi tên năng lượng.
  - `socket_back`: Đeo chéo sau lưng khi ở trạng thái nghỉ ngoài giao tranh.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ nguyên tắc Doc 28: Toàn thân chuyển động, gối khuỵu, lưng gập/xoắn, hông lên xuống theo quán tính; cấm đẩy cả người từ A sang B.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Release |
|---|---|---|---|
| `lieu_tien_idle` | Đứng nghiêng thanh thoát, tay trái cầm cung rủ nhẹ, ngực thở đều, áo choàng tuyết khẽ bay trong gió | 2.0s loop | Không |
| `lieu_tien_run` | Sải bước chạy lướt nhẹ nhàng, thân người hơi nghiêng về trước, tay cầm cung giữ ngang hông | 0.8s loop | Không |
| `lieu_tien_run_ice` | Di chuyển trên vệt băng: Dáng trượt nghiêng uyển chuyển như trượt băng nghệ thuật, gót chân lướt mượt mà | 0.8s loop | Không |
| `lieu_tien_basic_a` | Giương cung bắn phát thứ nhất: Kéo dây dứt khoát, cánh cung rung nhẹ khi buông tên | 0.6s / 1.0x | $0.12\text{s}$ (Frame 4) |
| `lieu_tien_basic_b` | Bắn phát thứ hai: Xoay nhẹ hông đổi góc, bắn mũi tên băng tiếp theo | 0.6s / 1.0x | $0.12\text{s}$ (Frame 4) |
| `lieu_tien_basic_kiting` | Vừa bắn vừa lùi: Chân phải bước lùi, thân người vặn về trước nhả tên, gót chân dệt vệt sương băng | 0.7s / 1.0x | $0.14\text{s}$ (Frame 5) |
| `lieu_tien_q_snipe` | Xoay người dồn trọng tâm, kéo căng dây cung cực đại rồi phóng mũi tên Băng Tiễn bay vút đi | 0.5s / 1.2x | $0.15\text{s}$ (Frame 5) |
| `lieu_tien_w_retreat` | Bật gót chân giật lùi về sau $1.5\text{m}$, hai tay giương lồng khiên băng bảo vệ thân mình | 0.5s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `lieu_tien_e_volley` | Giương cung góc $75^\circ$ bắn loạt mũi tên chỉ thiên lên trời với lực giật toàn thân | 0.6s / 1.1x | $0.20\text{s}$ (Frame 6) |
| `lieu_tien_r_cast` | Clip Ultimate độc bản: Hạ thấp tấn, hai cánh cung bung mở rực sáng, kéo căng đại tiễn khổng lồ rồi buông chấn động | 1.2s / 1.0x | $0.40\text{s}$ (Frame 12) |
| `lieu_tien_dash_d` | Nhảy lướt né tránh thanh thoát sang hướng chỉ định | 0.4s / 1.3x | Không |
| `lieu_tien_death` | Cung rơi khỏi tay cắm xuống đất, Liễu Tiễn ngã nghiêng người và tan biến thành bụi tuyết lấp lánh | 2.0s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Gió lạnh dẫn lối, sương tuyết khóa bước quân thù."
  - *Ban Voice:* "Băng giá sẽ không tan vì nỗi sợ của ngươi."
  - *Attack Voice:* "Xuyên thấu!", "Lạnh lùng!", "Không lối thoát!"
  - *Skill W Voice:* "Lùi bước giữ cự ly!", "Đường băng nâng bước!"
  - *Ultimate R Voice:* "Cực Băng... PHONG TỎA CHIẾN TRƯỜNG!"
- **Sound Effects (SFX):**
  - `sfx_lt_bow_draw`: Tiếng kéo dây cung kim loại dẻo vang âm tần cao.
  - `sfx_lt_arrow_release`: Tiếng "VÚT" xé gió sắc lạnh của mũi tên băng.
  - `sfx_lt_ice_trail_loop`: Tiếng sương tuyết trượt xào xạc khi di chuyển trên vệt băng.
  - `sfx_lt_w_shield`: Tiếng kết tinh tinh thể băng bọc quanh thân "KENG-RẮC".
  - `sfx_lt_e_ice_rain`: Tiếng mưa tên băng dội rào rào xuống mặt đất.
  - `sfx_lt_r_impact`: Tiếng nổ va chạm đại tiễn đanh thép kèm tiếng nứt toác bão tuyết.

---

## 5. Bản Thảo Hóa Đơn Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "lieu_tien"
  version: "1.0.0-draft"
  model:
    mesh_path: "art/models/heroes/lieu_tien/lieu_tien_base.glb"
    skeleton: "rig_humanoid_female_v2"
    textures:
      albedo: "art/textures/heroes/lieu_tien/t_lieu_tien_d.png"
      normal: "art/textures/heroes/lieu_tien/t_lieu_tien_n.png"
      orm: "art/textures/heroes/lieu_tien/t_lieu_tien_orm.png"
      emissive: "art/textures/heroes/lieu_tien/t_lieu_tien_e.png"
  weapon:
    mesh_path: "art/models/weapons/frost_willow_bow.glb"
    grip_profile: "grips_bow_left_hand"
  clips:
    idle: "art/anim/lieu_tien/lieu_tien_idle.glb"
    run: "art/anim/lieu_tien/lieu_tien_run.glb"
    run_ice: "art/anim/lieu_tien/lieu_tien_run_ice.glb"
    basic_a: "art/anim/lieu_tien/lieu_tien_basic_a.glb"
    basic_b: "art/anim/lieu_tien/lieu_tien_basic_b.glb"
    basic_kiting: "art/anim/lieu_tien/lieu_tien_basic_kiting.glb"
    q_snipe: "art/anim/lieu_tien/lieu_tien_q_snipe.glb"
    w_retreat: "art/anim/lieu_tien/lieu_tien_w_retreat.glb"
    e_volley: "art/anim/lieu_tien/lieu_tien_e_volley.glb"
    r_cast: "art/anim/lieu_tien/lieu_tien_r_cast.glb"
    dash_d: "art/anim/lieu_tien/lieu_tien_dash_d.glb"
    death: "art/anim/lieu_tien/lieu_tien_death.glb"
  rights_and_provenance:
    author: "Studio Co Linh Than Chien - Art Factory"
    license: "Proprietary / In-house Original"
    status: "HOLD_FOR_GATE_4_SIGN_OFF"
```
