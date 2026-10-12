# 08 · Asset Production — #49 Kymos (Thạch Âm Điểm Rung Hạ Âm)

**Trạng thái:** `ASSET_SPEC_FROZEN / READY_FOR_3D_PIPELINE`  
**Khóa định danh:** `#49 / kymos`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md), [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md), [Tài liệu 42 (Quản lý Asset)](../../42-quan-ly-asset.md)

---

## 1. Thông Số Hình Thể & Capsule Va Chạm (Physics & Capsule Specs)

Kymos là hộ vệ nửa người nửa đá thạch lực lưỡng (Stone Warden Biped), sử dụng rig chuẩn Humanoid mở rộng kết hợp xương phụ cho giá khánh đá lơ lửng:

| Thông số kỹ thuật | Giá trị cấu hình | Giải thích & Quy chuẩn Engine |
|---|---|---|
| **Dạng thể hình (Body Category)** | `humanoid_heavy_stone` (Đỡ đòn hộ vệ đá) | Rig chuẩn Biped Humanoid 58 bones + 10 bones cho 5 thanh khánh đá phẳng sau lưng. |
| **Bán kính Capsule (Capsule Radius)** | `0.55m` | Bán kính va chạm dày dặn cho tướng hỗ trợ đỡ đòn tuyến trước. |
| **Chiều cao Capsule (Capsule Height)** | `1.95m` | Bao quát đỉnh đầu và bờ vai đá vạm vỡ. |
| **Trọng tâm (Center of Mass Offset)** | `Y = +1.00m` | Vị trí đặt ngực; điểm neo thanh máu và icon trạng thái. |
| **Vật lý rung động khánh đá (Secondary Physics)** | Spring Bone Simulation | 5 thanh khánh đá đung đưa nhẹ theo nhịp bước chân và rung lên dữ dội khi gõ chiêu. |

---

## 2. Vũ Khí & Điểm Gắn (Weapon Sockets & Grips)

- **Tên vũ khí:** Cổ Thạch Khánh Cầm (Ancient Lithophone Relic).
- **Socket gắn kết chính:** `Socket_Lithophone_Rack` (Neo lơ lửng phía sau lưng cách xương sống $0.3\text{m}$).
- **Socket cắm cọc sàn:** `Socket_Ground_Anchor` (Vị trí cắm thanh khánh đá chính xuống đất khi thi triển W).
- **Socket tay gõ:** `Socket_Hand_R` (Nắm đấm đá dùng để gõ vào khánh đá).
- **Kích thước khánh đá:** Gồm 5 thanh đá phẳng hình chữ nhật sắc sảo, thanh lớn nhất dài $0.9\text{m}$, dày $0.15\text{m}$, rộng $0.35\text{m}$.
- **Vật thể tĩnh cắm sàn (Static Prop):** `geo_kymos_node_prop.fbx` cắm xuống đất trong chiêu W.

---

## 3. Danh Mục Clip Hoạt Ảnh (Animation Clip List — Chuẩn Doc 28 & 25)

Toàn bộ cử động của Kymos toát lên vẻ vững chãi, trầm mặc và uy lực của đất đá ngàn năm:

| Mã Clip (Clip ID) | Tên hành động | Thời lượng (s) | Điểm tác động (HIT Frame) | Mô tả chi tiết tư thế & Cử động |
|---|---|---|---|---|
| `kymos_idle` | Thế đứng bàn thạch (Idle) | 2.2s (Loop) | — | Kymos đứng hai chân dang rộng vững chãi, hai tay nắm hờ trước đùi, các thanh khánh đá sau lưng đung đưa nhẹ phát ra rung cảm hạ âm mờ. |
| `kymos_walk` | Bước chân địa chấn (Walk) | 0.9s (Loop) | — | Bước chân nện nặng nề xuống sàn đấu, thân người nghiêng đầm chắc, đất đá rung chuyển theo từng bước. |
| `kymos_basic_attack` | Gõ khánh phóng sóng | 0.8s | **0.16s** | Vung bàn tay đá gõ mạnh vào thanh khánh trước mặt, sóng âm hình lưỡi rìu ngọc thạch bay vút đi. |
| `kymos_q` | Thạch Ba Kích | 0.8s | **0.15s** | Ngửa người lấy đà rồi quét mạnh tay phải dọc sàn đấu, phóng luồng sóng chấn hạ âm làm nứt toác mặt đất. |
| `kymos_w` | Điểm Rung Hạ Âm | 0.6s | **0.00s (Instant)** | Dộng thẳng nắm đấm đá xuống đất cắm thanh khánh chính xuống sàn, sóng hạ âm lan tỏa bao bọc đồng minh; không làm ngắt di chuyển. |
| `kymos_e` | Cộng Hưởng Thạch Cầm | 0.65s | **0.10s** | Đập mạnh hai bàn tay đá vào nhau trước ngực, phát ra đĩa sóng âm $360^\circ$ quét ngang hất dạt kẻ địch cận chiến. |
| `kymos_r` | Vạn Âm Tĩnh Lặng (Ultimate) | 1.8s | **0.25s (Dual Slam)** | **Clip tối thượng độc bản:** Nâng cả hai nắm đấm đá khổng lồ lên cao, gồng cơ bắp trong 0.25s rồi dộng mạnh xuống sàn, đại sóng hạ âm bùng nổ triệt tiêu toàn bộ âm thanh và sát thương. |
| `kymos_dash` | Tốc Biến Lướt D | 0.3s | — | Kymos húc mạnh cả bờ vai đá lướt nhanh $4.5\text{m}$, để lại vệt nứt đất đá rực sáng xanh rêu. |
| `kymos_hit` | Phản hồi nhận đòn (Hit React) | 0.35s | — | Thân người hơi chùn lại gồng cứng, bụi đá văng nhẹ, không hề tỏ ra đau đớn. |
| `kymos_death` | Tử vong (Death) | 1.7s | — | Cơ thể đá nứt toác thành những tảng đá bazan rơi sụp xuống đất, các thanh khánh gãy đôi, linh khí hạ âm tan biến vào lòng đất. |

---

## 4. Dự Thảo Hồ Sơ Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "kymos"
  research_id: "#49"
  version: "1.0.0-w4"
  status: "DRAFT_PENDING_GATE4_SIGNOFF"
  
  geometry_3d:
    mesh_lod0: "assets/heroes/kymos/models/geo_kymos_lod0.fbx" # Budget: 28,000 tris
    mesh_lod1: "assets/heroes/kymos/models/geo_kymos_lod1.fbx" # Budget: 14,000 tris
    mesh_lod2: "assets/heroes/kymos/models/geo_kymos_lod2.fbx" # Budget: 6,000 tris
    lithophone_mesh: "assets/heroes/kymos/models/geo_kymos_lithophone_chimes.fbx" # Budget: 3,500 tris
    node_prop_mesh: "assets/heroes/kymos/models/geo_kymos_node_prop.fbx" # Budget: 2,200 tris
    
  materials:
    mat_basalt_stone: "assets/heroes/kymos/materials/m_kymos_basalt.mat"
    mat_monk_cloth: "assets/heroes/kymos/materials/m_kymos_earth_cloth.mat"
    mat_jade_resonance: "assets/heroes/kymos/materials/m_kymos_jade_infrasound.mat"
    
  rigging_and_sockets:
    skeleton: "assets/heroes/kymos/rigs/sk_kymos_heavy_biped.fbx"
    sockets:
      - name: "Socket_Lithophone_Rack"
        parent_bone: "bone_spine_03"
      - name: "Socket_Ground_Anchor"
        parent_bone: "bone_root"
      - name: "Socket_Hand_R"
        parent_bone: "bone_hand_r"
        
  vfx_packages:
    vfx_acoustic_node_field: "assets/heroes/kymos/vfx/vfx_kymos_acoustic_node_ripples.prefab"
    vfx_skill_q_shockwave: "assets/heroes/kymos/vfx/vfx_kymos_q_seismic_wave.prefab"
    vfx_skill_w_shield: "assets/heroes/kymos/vfx/vfx_kymos_w_jade_barrier.prefab"
    vfx_skill_e_peel: "assets/heroes/kymos/vfx/vfx_kymos_e_infrasonic_peel.prefab"
    vfx_skill_r_silent_realm: "assets/heroes/kymos/vfx/vfx_kymos_r_silent_infrasound_pulse.prefab"
```
