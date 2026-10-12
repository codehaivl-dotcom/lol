# 08 · Asset Production — #35 Pavo (Khổng Tước Quạt Mắt Dọa Sợ)

**Trạng thái:** `ASSET_SPEC_FROZEN / READY_FOR_3D_PIPELINE`  
**Khóa định danh:** `#35 / pavo`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md), [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md), [Tài liệu 42 (Quản lý Asset)](../../42-quan-ly-asset.md)

---

## 1. Thông Số Hình Thể & Capsule Va Chạm (Physics & Capsule Specs)

Pavo là nhân vật hình người quý tộc thanh thoát (Noble Humanoid) mang bộ quạt đuôi cơ khí xòe gập sau lưng, sử dụng rig Humanoid kết hợp hệ thống xương cơ khí phức hợp cho 24 nan quạt:

| Thông số kỹ thuật | Giá trị cấu hình | Giải thích & Quy chuẩn Engine |
|---|---|---|
| **Dạng thể hình (Body Category)** | `humanoid_medium_fan` (Hình người mang quạt đuôi) | Rig chuẩn Biped Humanoid 62 bones + 24 bones nan quạt cơ khí `bone_fan_feather_01..24`. |
| **Bán kính Capsule (Capsule Radius)** | `0.45m` | Kích thước chuẩn cho pháp sư tầm xa. |
| **Chiều cao Capsule (Capsule Height)** | `1.85m` | Bao quát đỉnh đầu và vương miện lông công. |
| **Độ mở rộng khi xòe quạt (Fan Spread Width)** | `2.80m` ngang | Khi xòe W/R, quạt đuôi mở rộng $2.8\text{m}$ (không làm thay đổi hurtbox vật lý $0.45\text{m}$). |
| **Trọng tâm (Center of Mass Offset)** | `Y = +0.95m` | Vị trí đặt ngực; điểm neo thanh máu và icon trạng thái. |
| **Vật lý tà áo & nan quạt (Cloth & Tail Physics)** | Secondary Spring Bone | Tà áo lễ phục đung đưa nhịp nhàng, các nan quạt kim loại có độ đàn hồi rung lắc cơ khí khi vung mạnh. |

---

## 2. Vũ Khí & Điểm Gắn (Weapon Sockets & Grips)

- **Tên vũ khí:** Khổng Tước Cơ Khí Quạt (Biomechanical Tail-Fan).
- **Socket gắn kết chính:** `Socket_Tail_Base` (Gắn chặt vào xương cụt `bone_pelvis` sau thắt lưng).
- **Socket phóng lông vũ:** `Socket_Hand_R` (Khi phóng đòn đánh thường và Q) và `Socket_Tail_Tip` (Phóng laser từ các mắt công).
- **Kích thước quạt đuôi:** Dài $1.60\text{m}$ khi gập lại; rộng $2.80\text{m}$, cao $2.50\text{m}$ khi xòe cực đại.
- **Vật liệu đặc biệt:** Shader phản quang óng ánh (Iridescence Thin-Film Shader) đổi màu từ xanh ngọc sang tím tùy góc camera.

---

## 3. Danh Mục Clip Hoạt Ảnh (Animation Clip List — Chuẩn Doc 28 & 25)

Toàn bộ cử động của Pavo toát lên vẻ ngạo nghễ, kiêu sa của bậc vương giả thống trị không gian:

| Mã Clip (Clip ID) | Tên hành động | Thời lượng (s) | Điểm tác động (HIT Frame) | Mô tả chi tiết tư thế & Cử động |
|---|---|---|---|---|
| `pavo_idle` | Thế đứng vương giả (Idle) | 2.0s (Loop) | — | Pavo đứng thẳng lưng kiêu hãnh, một tay chống hông, quạt đuôi xếp gọn hơi rung nhè nhẹ, các mắt công chớp sáng mờ ảo. |
| `pavo_strut` | Bước đi quý tộc (Walk / Strut) | 0.85s (Loop) | — | Bước chân đĩnh đạc, cằm ngẩng cao, tà áo đuôi tôm và quạt kim loại đung đưa theo từng nhịp bước. |
| `pavo_basic_attack` | Phóng lông vũ quang học | 0.75s | **0.15s** | Phẩy nhẹ tay phải ra trước, một phiến lông vũ kim loại tách khỏi đuôi phóng vút đi xé gió. |
| `pavo_q` | Kim Vũ Tiễn (Fan Shoot) | 0.8s | **0.15s** | Xoay người đưa quạt đuôi ra trước, bung nhẹ 3 nan quạt phóng chùm 3 lông vũ khổng lồ bay đi. |
| `pavo_w` | Khai Mạc Khổng Tước | 0.7s | **0.00s (Instant)** | Quạt đuôi bung xòe $180^\circ$ cực đại chớp mắt rực rỡ, Pavo cười ngạo nghễ dọa sợ quân thù; không làm khựng bước di chuyển. |
| `pavo_e` | Huyễn Ảnh Quang Tráo | 0.7s | **0.15s** | Búng tay tạo điểm sáng hội tụ, một quả cầu gương quang học xuất hiện trên không trung rồi nổ tung. |
| `pavo_r` | Vạn Nhãn Thôi Miên (Ultimate) | 1.8s | **0.25s (Laser Flash)** | **Clip tối thượng độc bản:** Xoay tròn người nhón gót, quạt đuôi vươn cao $2.5\text{m}$, 24 mắt công chớp sáng cực đại phóng sóng laser vạn mắt làm choáng toàn đội địch. |
| `pavo_dash` | Tốc Biến Lướt D | 0.3s | — | Pavo lướt nhanh $4.5\text{m}$, quạt đuôi khép chặt xé gió tạo thành vệt sáng quang học ngũ sắc. |
| `pavo_hit` | Phản hồi nhận đòn (Hit React) | 0.35s | — | Hơi nghiêng người né tránh, quạt đuôi khẽ rung giật, ánh mắt lộ vẻ tức giận kiêu kỳ. |
| `pavo_death` | Tử vong (Death) | 1.6s | — | Các khớp cơ khí quạt đuôi gãy vụn rơi lả tả xuống sàn; Pavo ngã xuống trong tư thế quý phái, ánh sáng trên mắt công lịm dần. |

---

## 4. Dự Thảo Hồ Sơ Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "pavo"
  research_id: "#35"
  version: "1.0.0-w4"
  status: "DRAFT_PENDING_GATE4_SIGNOFF"
  
  geometry_3d:
    mesh_lod0: "assets/heroes/pavo/models/geo_pavo_lod0.fbx" # Budget: 28,000 tris
    mesh_lod1: "assets/heroes/pavo/models/geo_pavo_lod1.fbx" # Budget: 14,000 tris
    mesh_lod2: "assets/heroes/pavo/models/geo_pavo_lod2.fbx" # Budget: 6,000 tris
    tail_fan_mesh: "assets/heroes/pavo/models/geo_pavo_tail_fan.fbx" # Budget: 4,500 tris
    
  materials:
    mat_regal_robe: "assets/heroes/pavo/materials/m_pavo_robe.mat"
    mat_peacock_metal: "assets/heroes/pavo/materials/m_pavo_iridescent_metal.mat"
    mat_optical_lens: "assets/heroes/pavo/materials/m_pavo_eyes_lens.mat"
    
  rigging_and_sockets:
    skeleton: "assets/heroes/pavo/rigs/sk_pavo_fan_biped.fbx"
    sockets:
      - name: "Socket_Tail_Base"
        parent_bone: "bone_tail_root"
      - name: "Socket_Hand_R"
        parent_bone: "bone_hand_r"
      - name: "Socket_Head_Crown"
        parent_bone: "bone_head"
        
  vfx_packages:
    vfx_fear_overhead: "assets/heroes/pavo/vfx/vfx_pavo_fear_gaze_eye.prefab"
    vfx_skill_q_fan: "assets/heroes/pavo/vfx/vfx_pavo_q_feather_fan.prefab"
    vfx_skill_w_gaze_burst: "assets/heroes/pavo/vfx/vfx_pavo_w_tail_flash.prefab"
    vfx_skill_e_mirror_ball: "assets/heroes/pavo/vfx/vfx_pavo_e_mirror_shatter.prefab"
    vfx_skill_r_all_eyes_laser: "assets/heroes/pavo/vfx/vfx_pavo_r_grand_gaze_burst.prefab"
```
