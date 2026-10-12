# 08 · Asset Production — #48 Oneira (Mộng Thể Mặt Nạ Hút Khống Chế)

**Trạng thái:** `ASSET_SPEC_FROZEN / READY_FOR_3D_PIPELINE`  
**Khóa định danh:** `#48 / oneira`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md), [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md), [Tài liệu 42 (Quản lý Asset)](../../42-quan-ly-asset.md)

---

## 1. Thông Số Hình Thể & Capsule Va Chạm (Physics & Capsule Specs)

Oneira là thực thể mộng ảo dạng làn khói mờ ngưng tụ bán trong suốt (Ethereal Smoke Entity), sử dụng custom floating rig với tâm điểm là chiếc mặt nạ xoay trục:

| Thông số kỹ thuật | Giá trị cấu hình | Giải thích & Quy chuẩn Engine |
|---|---|---|
| **Dạng thể hình (Body Category)** | `ethereal_floating` (Thực thể khói lơ lửng) | Custom Rig 42 bones chuỗi lụa khói uốn lượn + 1 bone trung tâm mặt nạ `bone_mask_pivot`. |
| **Bán kính Capsule (Capsule Radius)** | `0.45m` | Kích thước chuẩn cho pháp sư/hỗ trợ tầm xa. |
| **Chiều cao Capsule (Capsule Height)** | `1.75m` | Tính từ điểm thấp nhất của đuôi khói đến đỉnh đầu mặt nạ. |
| **Độ cao lơ lửng (Hover Height Offset)** | `+0.40m` từ mặt sàn | Luôn trôi bồng bềnh cách sàn đấu $0.40\text{m}$. |
| **Trọng tâm (Center of Mass Offset)** | `Y = +0.85m` | Vị trí đặt chiếc mặt nạ gốm; điểm neo thanh máu. |
| **Mô phỏng khói mộng (Smoke Shader & Physics)** | Vertex Animation / Volumetric Shader | Thân khói có chuyển động xoáy lượn nội tại kết hợp độ trong suốt mờ ảo (Fresnel Alpha). |

---

## 2. Vũ Khí & Điểm Gắn (Weapon Sockets & Grips)

- **Tên vũ khí:** Mặt Nạ Gốm Hai Mặt Cổ Linh (The Dual-Faced Ceramic Mask).
- **Socket gắn kết chính:** `Socket_Mask_Center` (Neo tại vị trí khuôn mặt trung tâm `bone_mask_pivot`, có khả năng xoay tự do $360^\circ$).
- **Socket tâm khói:** `Socket_Smoke_Core` (Neo luồng khói xoáy phát quang).
- **Kích thước mặt nạ:** Đường kính $0.40\text{m}$, dày $0.12\text{m}$, hai mặt khắc họa đối xứng (khóc u sầu / cười rạng rỡ).

---

## 3. Danh Mục Clip Hoạt Ảnh (Animation Clip List — Chuẩn Doc 28 & 25)

Toàn bộ cử động của Oneira toát lên vẻ huyền ảo, bồng bềnh và thoát tục của một giấc mộng sống động:

| Mã Clip (Clip ID) | Tên hành động | Thời lượng (s) | Điểm tác động (HIT Frame) | Mô tả chi tiết tư thế & Cử động |
|---|---|---|---|---|
| `oneira_idle` | Thế lơ lửng mộng ảo (Idle) | 2.2s (Loop) | — | Oneira lơ lửng bồng bềnh cách sàn $0.4\text{m}$, các dải lụa khói tím uốn lượn nhịp nhàng; mặt nạ nghiêng nhẹ sang hai bên quan sát. |
| `oneira_locomotion` | Trôi sương mộng (Move / Float) | 0.9s (Loop) | — | Thân khói nghiêng nhẹ về phía trước trôi êm ái rẽ không khí, để lại vệt bụi sao lấp lánh phía sau. |
| `oneira_basic_attack` | Nhả khói mộng | 0.75s | **0.15s** | Xoay nhẹ thân khói, mặt nạ hơi nghiêng nhả ra một quả cầu khói tím phát quang bay vút đi. |
| `oneira_q` | Mộng Ảnh Trói Buộc | 0.8s | **0.15s** | Mặt nạ khóc há miệng tích tụ sương khói trong 0.15s rồi phóng mạnh quả cầu mộng cảnh xé gió bay thẳng. |
| `oneira_w` | Mặt Nạ Hút Khống Chế | 0.6s | **0.00s (Instant)** | Mặt nạ khóc xoay ra trước hút luồng khói đen từ đồng minh, thân khói ngưng tụ bảo hộ; không làm ngắt di chuyển. |
| `oneira_w_transmute` | Bùng nổ thức tỉnh (+80 HP) | 0.5s | **0.00s (Proc)** | Đúng 2.0s sau khi hút, mặt nạ xoay ngược $180^\circ$ đưa mặt cười ra trước, phát nổ luồng hào quang vàng kim hồi phục. |
| `oneira_e` | Mộng Cảnh Tương Lân | 0.7s | **0.15s** | Vẫy nhẹ dải lụa khói triệu hồi vùng kết giới sương mộng hoa cỏ tím giáng xuống mặt sàn đấu. |
| `oneira_r` | Đại Mộng Giác Tỉnh (Ultimate) | 1.8s | **0.25s (Awakening Flash)** | **Clip tối thượng độc bản:** Bay vút lên cao $1.5\text{m}$, mặt nạ xoay tít chói lòa trong 0.25s rồi phóng đại sóng quang năng làm choáng toàn đội địch và đại hồi phục sinh lực. |
| `oneira_dash` | Tốc Biến Lướt D | 0.3s | — | Thân khói biến thành một vệt sương mù tím lướt nhanh $4.5\text{m}$ rồi tái hiện hình thể. |
| `oneira_hit` | Phản hồi nhận đòn (Hit React) | 0.35s | — | Thân khói bị phân tán nhẹ rồi nhanh chóng tụ lại, mặt nạ rung lắc chớp sáng. |
| `oneira_death` | Tử vong (Death) | 1.6s | — | Chiếc mặt nạ nứt làm đôi rơi xuống đất vỡ vụn; thân khói mộng cảnh tan biến thành làn sương mỏng bay vào hư vô. |

---

## 4. Dự Thảo Hồ Sơ Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "oneira"
  research_id: "#48"
  version: "1.0.0-w4"
  status: "DRAFT_PENDING_GATE4_SIGNOFF"
  
  geometry_3d:
    mesh_lod0: "assets/heroes/oneira/models/geo_oneira_lod0.fbx" # Budget: 24,000 tris
    mesh_lod1: "assets/heroes/oneira/models/geo_oneira_lod1.fbx" # Budget: 12,000 tris
    mesh_lod2: "assets/heroes/oneira/models/geo_oneira_lod2.fbx" # Budget: 5,000 tris
    mask_mesh: "assets/heroes/oneira/models/geo_oneira_dual_mask.fbx" # Budget: 3,000 tris
    
  materials:
    mat_smoke_body: "assets/heroes/oneira/materials/m_oneira_dream_smoke.mat"
    mat_porcelain_mask: "assets/heroes/oneira/materials/m_oneira_porcelain.mat"
    mat_awakening_gold: "assets/heroes/oneira/materials/m_oneira_awakening_gold.mat"
    
  rigging_and_sockets:
    skeleton: "assets/heroes/oneira/rigs/sk_oneira_floating_smoke.fbx"
    sockets:
      - name: "Socket_Mask_Center"
        parent_bone: "bone_mask_pivot"
      - name: "Socket_Smoke_Core"
        parent_bone: "bone_chest_core"
      - name: "Socket_Trail_Ribbon"
        parent_bone: "bone_ribbon_root"
        
  vfx_packages:
    vfx_curse_absorb_vortex: "assets/heroes/oneira/vfx/vfx_oneira_cc_suck.prefab"
    vfx_transmute_burst_heal: "assets/heroes/oneira/vfx/vfx_oneira_heal_wave.prefab"
    vfx_skill_q_dream_orb: "assets/heroes/oneira/vfx/vfx_oneira_q_root_orb.prefab"
    vfx_skill_w_shield: "assets/heroes/oneira/vfx/vfx_oneira_w_dream_veil.prefab"
    vfx_skill_e_mist_meadow: "assets/heroes/oneira/vfx/vfx_oneira_e_mist_zone.prefab"
    vfx_skill_r_awakening_stun: "assets/heroes/oneira/vfx/vfx_oneira_r_grand_awakening.prefab"
```
