# 08 · Asset Production — #33 Eelix (Lươn Sóng Thủy Uyên)

**Trạng thái:** `ASSET_SPEC_FROZEN / READY_FOR_3D_PIPELINE`  
**Khóa định danh:** `#33 / eelix`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md), [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md), [Tài liệu 42 (Quản lý Asset)](../../42-quan-ly-asset.md)

---

## 1. Thông Số Hình Thể & Capsule Va Chạm (Physics & Capsule Specs)

Eelix là sinh vật lươn biển bóng tối hoàn toàn phi nhân hình (Non-Humanoid Aquatic Creature), sử dụng rig chuyên biệt chuỗi xương sống uốn lượn (Serpentine Spine Chain) theo kết quả Phương án A Locomotion Spike (Doc 100):

| Thông số kỹ thuật | Giá trị cấu hình | Giải thích & Quy chuẩn Engine |
|---|---|---|
| **Dạng thể hình (Body Category)** | `serpentine_floating` (Lươn lơ lửng phi nhân hình) | Rig tùy biến 32 bones chuỗi xương sống nối tiếp `bone_spine_01..32` + 6 bones hàm răng và vây lưng. |
| **Bán kính Capsule (Capsule Radius)** | `0.45m` | Độ rộng tiết diện thân lươn; tương đương sát thủ thon gọn. |
| **Chiều dài cơ thể (Total Body Length)** | `3.20m` | Uốn lượn hình chữ S; chiều dài hiển thị co cụm $\sim 2.1\text{m}$. |
| **Độ cao lơ lửng (Hover Height Offset)** | **+0.30m từ mặt sàn** | Theo đúng phán quyết Phương án A (Doc 100); lơ lửng sát mặt sàn tạo cảm giác trườn lướt trên nước. |
| **Trọng tâm (Center of Mass Offset)** | `Y = +0.50m` | Vị trí đặt đầu và ngực trước; điểm neo thanh máu. |
| **Mô phỏng uốn lượn (Procedural Undulation)** | Spline IK / Secondary Physics | Đuôi uốn lượn theo quán tính di chuyển dựa trên thuật toán Spline IK mượt mà. |

---

## 2. Vũ Khí & Điểm Gắn (Weapon Sockets & Grips)

- **Tên vũ khí:** Thân Thể Săn Mồi Điện Quang (Bio-Electric Anatomy). Toàn bộ cơ thể chính là vũ khí.
- **Socket hàm cắn xé:** `Socket_Mouth_Jaws` (Neo hiệu ứng đòn đánh thường và cắn xé cận chiến).
- **Socket vây lưng phát điện:** `Socket_Dorsal_Fin` (Neo hệ thống phóng sét tĩnh điện màu xanh cyan).
- **Socket vệt nước đuôi:** `Socket_Tail_Tip` (Neo hệ thống Particle System phun vệt nước bóng tối `shadow_wake`).

---

## 3. Danh Mục Clip Hoạt Ảnh (Animation Clip List — Chuẩn Doc 28 & 25)

Toàn bộ cử động của Eelix phải thể hiện sự trơn trượt, hung tợn và uốn lượn sống động của loài lươn săn mồi vực sâu:

| Mã Clip (Clip ID) | Tên hành động | Thời lượng (s) | Điểm tác động (HIT Frame) | Mô tả chi tiết tư thế & Cử động |
|---|---|---|---|---|
| `eelix_idle` | Thế trườn lơ lửng (Breathing Idle) | 2.0s (Loop) | — | Eelix lơ lửng cách sàn $0.3\text{m}$, toàn thân uốn lượn hình chữ S nhẹ nhàng theo nhịp thở; mang và vây lưng chớp nháy tia điện cyan mờ ảo. |
| `eelix_locomotion` | Trườn lướt (Slither / Glide) | 0.8s (Loop) | — | Thân mình uốn sóng hình sin cực nhanh, đầu hướng thẳng về phía trước, đuôi vẫy mạnh rẽ không khí tiến tới. |
| `eelix_glide_wake` | Lướt trên vệt nước (Wake Speed) | 0.5s (Loop) | — | Cơ thể hạ thấp áp sát sàn đấu, lướt vút đi như mũi tên nước đen, các tia điện phóng rực rỡ dọc sống lưng. |
| `eelix_basic_attack` | Đớp cắn điện quang | 0.65s | **0.12s** | Lao mạnh nửa thân trước cắn phập vào mục tiêu, hàm răng điện quang phát sáng chớp nhoáng rồi thu về. |
| `eelix_q` | Thủy Uyên Trườn Lướt | 0.6s | **0.10s (Dash Start)** | Co cụm thân mình rồi bắn vụt đi $7.2\text{m}$ xuyên qua kẻ địch, đuôi phun dải nước đen tuyền kéo dài trên sàn. |
| `eelix_w` | Hắc Thủy Thuẫn | 0.5s | **0.00s (Instant)** | Chìm ngập nhẹ vào bóng nước, một màng khiên nước đen óng bọc lấy cơ thể; không làm ngắt đà trườn. |
| `eelix_e` | Lôi Điện Xung Phá | 0.6s | **0.10s** | Quẫy tròn đuôi $360^\circ$ phóng luồng điện cao thế bùng nổ quanh thân, làm tê liệt kẻ địch lân cận. |
| `eelix_r` | Thâm Hải Cuồng Nộ (Ultimate) | 1.6s | **0.25s (Pierce)** | **Clip tối thượng độc bản:** Cuộn tròn thân mình thành vòng xoắn ốc nạp năng lượng trong 0.2s rồi phóng xuyên thủng mục tiêu với tiếng rít xé gió, làm choáng con mồi. |
| `eelix_dash` | Tốc Biến Lướt D | 0.25s | — | Uốn gập thân mình búng mạnh về phía trước $4.5\text{m}$, để lại vệt bọt nước đen mỏng. |
| `eelix_hit` | Phản hồi nhận đòn (Hit React) | 0.3s | — | Thân mình bị giật uốn cong sang một bên, vảy da tóe tia điện nhỏ. |
| `eelix_death` | Tử vong (Death) | 1.5s | — | Tia điện dọc sống lưng tắt hẳn; thân lươn mềm nhũn rơi chạm đất rồi tan biến thành một vũng nước đen bốc hơi. |

---

## 4. Dự Thảo Hồ Sơ Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "eelix"
  research_id: "#33"
  version: "1.0.0-w4"
  status: "DRAFT_PENDING_GATE4_SIGNOFF"
  
  geometry_3d:
    mesh_lod0: "assets/heroes/eelix/models/geo_eelix_lod0.fbx" # Budget: 26,000 tris
    mesh_lod1: "assets/heroes/eelix/models/geo_eelix_lod1.fbx" # Budget: 13,000 tris
    mesh_lod2: "assets/heroes/eelix/models/geo_eelix_lod2.fbx" # Budget: 5,500 tris
    
  materials:
    mat_abyssal_skin: "assets/heroes/eelix/materials/m_eelix_wet_skin.mat"
    mat_cyan_electricity: "assets/heroes/eelix/materials/m_eelix_lightning.mat"
    mat_shadow_wake: "assets/heroes/eelix/materials/m_eelix_water_trail.mat"
    
  rigging_and_sockets:
    skeleton: "assets/heroes/eelix/rigs/sk_eelix_serpentine.fbx"
    sockets:
      - name: "Socket_Mouth_Jaws"
        parent_bone: "bone_head_jaw"
      - name: "Socket_Dorsal_Fin"
        parent_bone: "bone_spine_12"
      - name: "Socket_Tail_Tip"
        parent_bone: "bone_tail_end"
        
  vfx_packages:
    vfx_shadow_wake_strip: "assets/heroes/eelix/vfx/vfx_eelix_shadow_wake.prefab"
    vfx_chain_lightning_hit: "assets/heroes/eelix/vfx/vfx_eelix_chain_lightning.prefab"
    vfx_skill_q_dash: "assets/heroes/eelix/vfx/vfx_eelix_q_abyssal_dash.prefab"
    vfx_skill_w_shield: "assets/heroes/eelix/vfx/vfx_eelix_w_dark_water_shield.prefab"
    vfx_skill_e_burst: "assets/heroes/eelix/vfx/vfx_eelix_e_lightning_burst.prefab"
    vfx_skill_r_drill_impact: "assets/heroes/eelix/vfx/vfx_eelix_r_torpedo_pierce.prefab"
```
