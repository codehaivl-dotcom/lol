# 08 · Asset Production — #19 Inka (Mực Thư Pháp Tuyến Tính)

**Trạng thái:** `ASSET_SPEC_FROZEN / READY_FOR_3D_PIPELINE`  
**Khóa định danh:** `#19 / inka`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md), [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md), [Tài liệu 42 (Quản lý Asset)](../../42-quan-ly-asset.md)

---

## 1. Thông Số Hình Thể & Capsule Va Chạm (Physics & Capsule Specs)

Inka là nhân vật dạng người thanh tú (Humanoid Biped) với vạt áo dài thư pháp xẻ tà, sử dụng rig chuẩn Humanoid kết hợp xương phụ cho tà áo và ngòi bút:

| Thông số kỹ thuật | Giá trị cấu hình | Giải thích & Quy chuẩn Engine |
|---|---|---|
| **Dạng thể hình (Body Category)** | `humanoid_medium` (Hình người thanh tú) | Rig chuẩn Biped Humanoid 64 bones + 8 bones tà áo phụ + 4 bones ngòi cọ mềm. |
| **Bán kính Capsule (Capsule Radius)** | `0.45m` | Độ rộng tiêu chuẩn cho pháp sư tầm xa. |
| **Chiều cao Capsule (Capsule Height)** | `1.85m` | Bao quát đỉnh đầu và búi tóc thư sinh. |
| **Trọng tâm (Center of Mass Offset)** | `Y = +0.95m` | Vị trí neo thanh máu và hiển thị cấp độ. |
| **Vật lý tà áo & ngòi bút (Cloth & Hair Physics)** | Secondary Spring Bone | Tà áo dài và chùm lông cọ ngậm mực mô phỏng quán tính xoay người mượt mà. |

---

## 2. Vũ Khí & Điểm Gắn (Weapon Sockets & Grips)

- **Tên vũ khí:** Đại Thư Bút (Ancient Colinh Calligraphy Brush).
- **Socket gắn kết chính:** `Socket_Hand_R` (Cầm một tay khi di chuyển và thủ thế) và `Socket_Hand_L` (Bổ trợ hai tay khi gồng thi triển chiêu thức lớn Q và R).
- **Socket đầu cọ phát quang:** `Socket_Brush_Tip` (Neo hệ thống Particle System phát ra giọt mực đen và bụi vàng kim rơi rụng liên tục).
- **Kích thước vũ khí:** Dài $1.85\text{m}$, cán cọ đường kính $0.05\text{m}$, ngòi lông cọ dài $0.35\text{m}$.

---

## 3. Danh Mục Clip Hoạt Ảnh (Animation Clip List — Chuẩn Doc 28 & 25)

Toàn bộ cử động của Inka phải toát lên phong thái nho nhã, uyển chuyển của nghệ thuật thư pháp cổ điển Á Đông:

| Mã Clip (Clip ID) | Tên hành động | Thời lượng (s) | Điểm tác động (HIT Frame) | Mô tả chi tiết tư thế & Cử động |
|---|---|---|---|---|
| `inka_idle` | Thế đứng thủ bút (Idle) | 2.0s (Loop) | — | Inka đứng nghiêng người $45^\circ$, tay phải cầm đại bút tựa sau lưng, tay trái chắp sau hông; tà áo bay nhẹ, đầu cọ nhỏ giọt mực phát quang. |
| `inka_run` | Bước chạy lướt giấy (Run) | 0.8s (Loop) | — | Thân người hướng về phía trước, bước chạy nhẹ nhàng lướt như trên mặt giấy, tà áo tung bay ra sau. |
| `inka_run_ink` | Lướt trên vệt mực (Ink Glide) | 0.6s (Loop) | — | Hai chân đứng song song lướt êm ái trên dải mực đen, hai tay giang nhẹ giữ thăng bằng thanh thoát. |
| `inka_basic_attack` | Vung cọ bắn mực | 0.8s | **0.16s** | Vung cọ chéo từ phải sang trái, đầu cọ xé gió bắn ra giọt mực đen óng ánh viền vàng kim. |
| `inka_q` | Thư Pháp Tuyến Kích | 0.8s | **0.15s** | Xoay người đưa bút ra sau tích lực trong 0.15s rồi chém dọc một nét thẳng tắp về phía trước, sóng mực bùng nổ theo đường vung. |
| `inka_w` | Mặc Thủy Hộ Thể | 0.6s | **0.00s (Instant)** | Xoay tròn cổ tay vẽ một vòng tròn khép kín quanh ngực, quả cầu màng mực lập tức bọc lấy cơ thể, không làm khựng bước di chuyển. |
| `inka_e` | Giao Điểm Kích Nổ | 0.7s | **0.15s** | Cắm mạnh ngọn cọ xuống sàn đấu như hạ ấn triện, mực trên mặt đất bùng nổ các cột khói mực. |
| `inka_r` | Thiên Địa Mặc Họa (Ultimate) | 1.8s | **0.30s (Impact)** | **Clip tối thượng độc bản:** Bay vút lên cao $1.2\text{m}$, giương cao bút dập mạnh xuống tạo trận đồ sơn thủy khổng lồ chia cắt chiến trường. |
| `inka_dash` | Tốc Biến Lướt D | 0.3s | — | Inka biến thành một vệt mực lướt nhanh $4.5\text{m}$ rồi tái hiện hình thể mượt mà. |
| `inka_hit` | Phản hồi nhận đòn (Hit React) | 0.4s | — | Thân người giật lùi nhẹ, tà áo tung lên, các giọt mực văng ra. |
| `inka_death` | Tử vong (Death) | 1.6s | — | Đại bút tuột khỏi tay cắm xuống đất; thân hình Inka tan biến thành một làn khói mực đen lượn vòng rồi tan vào hư không. |

---

## 4. Dự Thảo Hồ Sơ Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "inka"
  research_id: "#19"
  version: "1.0.0-w4"
  status: "DRAFT_PENDING_GATE4_SIGNOFF"
  
  geometry_3d:
    mesh_lod0: "assets/heroes/inka/models/geo_inka_lod0.fbx" # Budget: 28,000 tris
    mesh_lod1: "assets/heroes/inka/models/geo_inka_lod1.fbx" # Budget: 14,000 tris
    mesh_lod2: "assets/heroes/inka/models/geo_inka_lod2.fbx" # Budget: 6,000 tris
    weapon_mesh: "assets/heroes/inka/models/geo_inka_brush.fbx" # Budget: 3,500 tris
    
  materials:
    mat_body: "assets/heroes/inka/materials/m_inka_body.mat"
    mat_cloth: "assets/heroes/inka/materials/m_inka_cloth.mat"
    mat_brush: "assets/heroes/inka/materials/m_inka_brush.mat"
    mat_ink_vfx: "assets/heroes/inka/materials/m_inka_ink_flow.mat"
    
  rigging_and_sockets:
    skeleton: "assets/heroes/inka/rigs/sk_inka_humanoid.fbx"
    sockets:
      - name: "Socket_Hand_R"
        parent_bone: "bone_hand_r"
      - name: "Socket_Brush_Tip"
        parent_bone: "bone_brush_tip"
      - name: "Socket_Chest_Center"
        parent_bone: "bone_spine_02"
        
  vfx_packages:
    vfx_ink_path: "assets/heroes/inka/vfx/vfx_inka_ink_path.prefab"
    vfx_skill_q: "assets/heroes/inka/vfx/vfx_inka_q_slash.prefab"
    vfx_skill_w: "assets/heroes/inka/vfx/vfx_inka_w_shield.prefab"
    vfx_skill_e: "assets/heroes/inka/vfx/vfx_inka_e_detonate.prefab"
    vfx_skill_r: "assets/heroes/inka/vfx/vfx_inka_r_grand_landscape.prefab"
```
