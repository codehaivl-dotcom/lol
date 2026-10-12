# 08 · Asset Production — #34 Jeli (Sóng Chuông Hộ Vệ & Hồi Phục)

**Trạng thái:** `ASSET_SPEC_FROZEN / READY_FOR_3D_PIPELINE`  
**Khóa định danh:** `#34 / jeli`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md), [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md), [Tài liệu 42 (Quản lý Asset)](../42-quan-ly-asset.md)

---

## 1. Thông Số Hình Thể & Capsule Va Chạm (Physics & Capsule Specs)

Do Jeli là sinh vật sứa chuông lơ lửng phi nhân hình (Floating Aquatic Creature), thông số capsule va chạm vật lý và vùng chịu đòn (hurtbox) được cấu hình đặc biệt nhằm đảm bảo tính công bằng trong chiến đấu:

| Thông số kỹ thuật | Giá trị cấu hình | Giải thích & Quy chuẩn Engine |
|---|---|---|
| **Dạng thể hình (Body Category)** | `floating_creature` (Sinh vật lơ lửng) | Không sử dụng rig hai chân dạng người (Humanoid Biped). Sử dụng custom armature dạng vòm chuông + chùm xúc tu mềm. |
| **Bán kính Capsule (Capsule Radius)** | `0.65m` | Độ rộng bao trọn vòm sứa gốm ngọc; kích thước chuẩn cho lớp Hỗ Trợ tầm xa. |
| **Chiều cao Capsule (Capsule Height)** | `1.90m` | Tính từ điểm thấp nhất của xúc tu chạm đất đến đỉnh chóp vòm chuông. |
| **Độ cao lơ lửng (Hover Height Offset)** | `+0.45m` từ mặt đất | Tâm vòm sứa luôn giữ khoảng cách cách mặt sàn đấu $0.45\text{m}$, tạo cảm giác bồng bềnh liên tục. |
| **Trọng tâm (Center of Mass Offset)** | `Y = +1.10m` | Vị trí đặt lõi chuông tâm linh; đây cũng là điểm neo (socket) của thanh máu và biểu tượng tên tướng. |
| **Độ nảy xúc tu (Tentacle Physics)** | Spring Bone / Cloth Simulation | 8 dải xúc tu buông rủ sử dụng mô phỏng vật lý mềm (Secondary Physics) với độ cản thủy động học cao ($drag = 0.82$). |

---

## 2. Vũ Khí & Điểm Gắn (Weapon Socket & Grips)

- **Tên vũ khí:** Cổ Thủy Chuông (Water Chime Relic).
- **Socket gắn kết:** `Socket_Chime_Core` (Neo cố định tại trung tâm khoang rỗng bên trong vòm sứa, liên kết với xương ngực trung tâm `bone_bell_core`).
- **Kích thước vũ khí:** Quả chuông gốm ngọc cao $0.40\text{m}$, đường kính đáy chuông $0.32\text{m}$.
- **Hiệu ứng động (Dynamic Behavior):** Chuông đung đưa nhẹ theo quán tính di chuyển; khi thi triển kỹ năng, chuông xoay quanh trục thẳng đứng và phát ra quầng sáng ngọc bích rực rỡ.

---

## 3. Danh Mục Clip Hoạt Ảnh (Animation Clip List — Chuẩn Doc 28 & 25)

Toàn bộ cử động của Jeli phải diễn tả chân thực chuyển động co bóp thủy động học của loài sứa (Aquatic Pulsation), không đẩy trôi cứng nhắc:

| Mã Clip (Clip ID) | Tên hành động | Thời lượng (s) | Điểm tác động (HIT Frame) | Mô tả chi tiết tư thế & Cử động toàn thân |
|---|---|---|---|---|
| `jeli_idle` | Thế đứng lơ lửng (Breathing Idle) | 2.4s (Loop) | — | Vòm sứa co bóp nhịp nhàng theo chu kỳ 2.4s: phồng lên nhẹ đón linh khí rồi xẹp nhẹ, các dải xúc tu buông lượn sóng êm dịu. Quả chuông bên trong phát sáng mờ ảo. |
| `jeli_locomotion` | Lướt nước (Glide / Move) | 1.6s (Loop) | — | Vòm sứa nghiêng góc $15^\circ$ về phía trước, co bóp đẩy nước ra sau tạo lực tiến; các dải xúc tu duỗi thẳng về phía sau theo quán tính dòng chảy. |
| `jeli_basic_attack` | Phóng sóng nước (LMB) | 0.8s | **0.16s** | Vòm sứa đột ngột co thắt trong 0.16s, quả chuông rung lên phóng giọt nước ngọc bích ra phía trước, sau đó vòm sứa nở bung hồi phục lại hình dạng ban đầu. |
| `jeli_q` | Thủy Ba Chấn Động | 0.9s | **0.15s** | Jeli ngả người về phía sau trong 0.15s tụ lực, hai xúc tu trước vươn dài đẩy mạnh quả cầu bọt nước xoáy khổng lồ bay đi, vòm sứa rung lắc nhẹ phản lực. |
| `jeli_w` | Chuông Nước Hộ Thể | 0.8s | **0.00s (Instant)** | Kích hoạt tức thời: Vòm sứa bừng nở bung rộng cực đại, quả chuông gõ vang dội, toàn bộ xúc tu bung xòe thành hình cái lồng bảo hộ rồi nhanh chóng thu về trạng thái bay. |
| `jeli_e` | Thủy Luân Âm Vực | 0.7s | **0.10s** | Jeli xoay tròn thân mình $360^\circ$ theo trục đứng trong 0.1s, các dải xúc tu quất thành một vòng xoáy nước phẳng ngang mặt đất, tạo lực chém âm ba bóc tách kẻ thù. |
| `jeli_r` | Đại Triều Thánh Chuông (Ultimate) | 1.8s | **0.45s (Peak Impact)** | **Clip tối thượng độc bản:** Jeli bay vút lên cao $1.5\text{m}$, vòm sứa phát quang rực rỡ; quả chuông phóng to xoay tròn trên đỉnh đầu; hai xúc tu chính chắp lại gióng chuông; tại 0.45s gióng một đòn thánh âm uy nghi làm chấn động toàn bộ không gian. |
| `jeli_hit` | Phản hồi nhận đòn (Hit React) | 0.4s | — | Vòm sứa bị biến dạng móp nhẹ theo hướng va chạm, các xúc tu giật thót co cụm lại, quầng sáng ngọc bích chớp nhẹ. |
| `jeli_death` | Tử vong (Death) | 1.8s | — | Quả chuông vỡ tan thành những mảnh ngọc nhỏ rơi xuống đất; vòm sứa mất phát quang sinh học, tan biến dần thành một vũng nước trong suốt lấp lánh rồi bốc hơi. |

---

## 4. Dự Thảo Hồ Sơ Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "jeli"
  research_id: "#34"
  version: "1.0.0-w1"
  status: "DRAFT_PENDING_GATE4_SIGNOFF"
  
  geometry_3d:
    model: "art/models/heroes/jeli/jeli_body.glb"
    lod0_triangles: 14500
    lod1_triangles: 7200
    lod2_triangles: 3100
    rig_bones: 34 # 1 Root, 1 Bell Core, 8 Bell Rim, 24 Tentacles (3 bones x 8 tentacles)
    
  materials_and_shaders:
    body_shader: "Shaders/Hero/TranslucentJadeBioluminescent.shader"
    textures:
      albedo: "art/textures/heroes/jeli/jeli_albedo.png" # 2048x2048
      normal: "art/textures/heroes/jeli/jeli_normal.png" # 2048x2048
      roughness_metallic: "art/textures/heroes/jeli/jeli_rough_met.png"
      emission_mask: "art/textures/heroes/jeli/jeli_emission.png" # Bioluminescent channels
      
  audio_sfx_and_vo:
    voice_actor_bank: "audio/vo/heroes/jeli/vo_bank.bank"
    chime_resonance_sfx: "audio/sfx/heroes/jeli/chime_passive_pulse.wav"
    water_bubble_q_sfx: "audio/sfx/heroes/jeli/q_bubble_launch.wav"
    bell_shield_w_sfx: "audio/sfx/heroes/jeli/w_bell_shield_burst.wav"
    water_ring_e_sfx: "audio/sfx/heroes/jeli/e_wave_slice.wav"
    ultimate_r_sfx: "audio/sfx/heroes/jeli/r_grand_tide_bell_peak.wav"
    
  ui_icons:
    portrait_circle: "ui/portraits/jeli_circle.png"
    portrait_lobby: "ui/portraits/jeli_full_bust.png"
    passive_icon: "ui/icons/skills/jeli/passive_chime_resonance.png"
    q_icon: "ui/icons/skills/jeli/q_water_shockwave.png"
    w_icon: "ui/icons/skills/jeli/w_water_bell_shield.png"
    e_icon: "ui/icons/skills/jeli/e_water_chime_zone.png"
    r_icon: "ui/icons/skills/jeli/r_grand_chime_tide.png"
```
