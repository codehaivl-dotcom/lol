# 08 · Asset Production — #37 Mok (Trinh Sát Cổ Đăng Tác Chiến)

**Trạng thái:** `ASSET_SPEC_FROZEN / READY_FOR_3D_PIPELINE`  
**Khóa định danh:** `#37 / mok`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md), [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md), [Tài liệu 42 (Quản lý Asset)](../../42-quan-ly-asset.md)

---

## 1. Thông Số Hình Thể & Capsule Va Chạm (Physics & Capsule Specs)

Mok là thực thể thực vật cơ khí cổ sinh nhỏ gọn (Biophilic Automaton), sử dụng rig chuyên biệt cho sinh vật biped nhỏ kết hợp nhánh cây sau lưng:

| Thông số kỹ thuật | Giá trị cấu hình | Giải thích & Quy chuẩn Engine |
|---|---|---|
| **Dạng thể hình (Body Category)** | `biophilic_small` (Sinh vật cơ khí nhỏ) | Custom Biped Rig 54 bones + 6 bones cho nhánh cây sau lưng + 3 bones treo lồng đèn. |
| **Bán kính Capsule (Capsule Radius)** | `0.40m` | Kích thước gọn nhẹ cho tướng trinh sát hỗ trợ. |
| **Chiều cao Capsule (Capsule Height)** | `1.50m` | Tính từ chân đến ngọn đèn cao nhất trên vai. |
| **Trọng tâm (Center of Mass Offset)** | `Y = +0.75m` | Vị trí đặt lõi gỗ cổ sinh trung tâm; điểm neo thanh máu. |
| **Vật lý con lắc lồng đèn (Lantern Physics)** | Secondary Spring Bone | Chiếc đèn lồng treo trên nhánh cây đung đưa tự nhiên theo quán tính di chuyển ($damping = 0.75$). |

---

## 2. Vũ Khí & Điểm Gắn (Weapon Sockets & Grips)

- **Tên vũ khí:** Cổ Đăng Tinh Thạch (Ancient Phosphor Lantern).
- **Socket gắn kết chính:** `Socket_Lantern_Branch` (Treo lơ lửng ở đầu nhánh cây sau lưng mok).
- **Socket ném đèn:** `Socket_Hand_R` (Khi thi triển Q, đèn được rút khỏi nhánh cây gắn vào tay phải để ném đi).
- **Kích thước Cổ Đăng:** Chiều cao lồng đèn $0.45\text{m}$, đường kính $0.30\text{m}$.
- **Vật thể độc lập trên sàn (Static Prop Mesh):** `geo_mok_lantern_prop.fbx` cắm trên đất khi Q tiếp đất.

---

## 3. Danh Mục Clip Hoạt Ảnh (Animation Clip List — Chuẩn Doc 28 & 25)

Toàn bộ cử động của Mok phải diễn tả bước đi lộc cộc linh hoạt của người máy gỗ sinh học, kèm nhịp đung đưa ấm áp của ngọn Cổ Đăng:

| Mã Clip (Clip ID) | Tên hành động | Thời lượng (s) | Điểm tác động (HIT Frame) | Mô tả chi tiết tư thế & Cử động |
|---|---|---|---|---|
| `mok_idle` | Thế đứng canh gác (Idle) | 2.2s (Loop) | — | Mok đứng khom người nhẹ, hai tay chống gối rồi nhìn ngó xung quanh; ngọn đèn trên vai đung đưa nhịp nhàng phát sáng mờ ảo. |
| `mok_run` | Bước chạy trinh sát (Run) | 0.7s (Loop) | — | Bước chạy lộc cộc nhanh nhẹn, thân hơi chúi về phía trước, ngọn đèn lắc lư theo từng nhịp chân. |
| `mok_basic_attack` | Phóng hạt huỳnh quang | 0.7s | **0.15s** | Gật người về phía trước, nhánh cây sau lưng giật nhẹ bắn ra hạt phấn phát quang. |
| `mok_q` | Cắm Cổ Đăng | 0.8s | **0.15s** | Rút ngọn đèn trên vai ném mạnh ra phía trước theo đường vòng cung, nhánh cây sau lưng rung chuyển phản lực. |
| `mok_w` | Huỳnh Quang Hộ Mệnh | 0.6s | **0.00s (Instant)** | Dậm mạnh chân gỗ xuống đất, ngực bừng sáng bung sóng hào quang huỳnh quang bao trùm đồng minh; không làm ngắt di chuyển. |
| `mok_e` | Đăng Mộc Triền Nhiễu | 0.7s | **0.15s** | Cắm hai tay xuống đất phóng chùm rễ cây cổ thụ xới đất lao thẳng về phía trước trói chân kẻ địch. |
| `mok_r` | Vạn Thảo Quang Minh (Ultimate) | 1.8s | **0.25s (Peak Surge)** | **Clip tối thượng độc bản:** Gập người sâu nạp năng lượng trong 0.25s rồi vươn thẳng người phóng cột sáng huỳnh quang cực đại lên trời, triệu hồi đại trận hoa cỏ bảo hộ toàn đội. |
| `mok_dash` | Tốc Biến Lướt D | 0.3s | — | Mok cuộn tròn người thành một khối gỗ lăn vút $4.5\text{m}$ rồi bung ra tư thế đứng. |
| `mok_hit` | Phản hồi nhận đòn (Hit React) | 0.35s | — | Các phiến gỗ trên ngực giật nảy, bụi gỗ và lân tinh vàng rơi rụng nhẹ. |
| `mok_death` | Tử vong (Death) | 1.5s | — | Khung gỗ rã rời thành các khối gỗ cổ, ngọn đèn rơi xuống tắt lịm, rễ cây héo úa thu về đất. |

---

## 4. Dự Thảo Hồ Sơ Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "mok"
  research_id: "#37"
  version: "1.0.0-w4"
  status: "DRAFT_PENDING_GATE4_SIGNOFF"
  
  geometry_3d:
    mesh_lod0: "assets/heroes/mok/models/geo_mok_lod0.fbx" # Budget: 24,000 tris
    mesh_lod1: "assets/heroes/mok/models/geo_mok_lod1.fbx" # Budget: 12,000 tris
    mesh_lod2: "assets/heroes/mok/models/geo_mok_lod2.fbx" # Budget: 5,000 tris
    lantern_prop_mesh: "assets/heroes/mok/models/geo_mok_lantern_prop.fbx" # Budget: 2,800 tris
    
  materials:
    mat_wood_amber: "assets/heroes/mok/materials/m_mok_fossil_wood.mat"
    mat_bronze_oxidized: "assets/heroes/mok/materials/m_mok_bronze.mat"
    mat_phosphor_glow: "assets/heroes/mok/materials/m_mok_phosphor.mat"
    
  rigging_and_sockets:
    skeleton: "assets/heroes/mok/rigs/sk_mok_automaton.fbx"
    sockets:
      - name: "Socket_Lantern_Branch"
        parent_bone: "bone_branch_tip"
      - name: "Socket_Hand_R"
        parent_bone: "bone_hand_r"
      - name: "Socket_Chest_Core"
        parent_bone: "bone_chest_core"
        
  vfx_packages:
    vfx_lantern_beacon: "assets/heroes/mok/vfx/vfx_mok_lantern_vision.prefab"
    vfx_lantern_explode: "assets/heroes/mok/vfx/vfx_mok_lantern_detonate.prefab"
    vfx_skill_w_shield: "assets/heroes/mok/vfx/vfx_mok_w_phosphor_shield.prefab"
    vfx_skill_e_roots: "assets/heroes/mok/vfx/vfx_mok_e_roots.prefab"
    vfx_skill_r_grand: "assets/heroes/mok/vfx/vfx_mok_r_ancient_grove.prefab"
```
