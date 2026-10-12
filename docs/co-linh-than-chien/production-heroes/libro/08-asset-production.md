# 08 · Asset Production — #28 Libro (Sổ Nợ Nghiệp Báo)

**Trạng thái:** `ASSET_SPEC_FROZEN / READY_FOR_3D_PIPELINE`  
**Khóa định danh:** `#28 / libro`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md), [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md), [Tài liệu 42 (Quản lý Asset)](../../42-quan-ly-asset.md)

---

## 1. Thông Số Hình Thể & Capsule Va Chạm (Physics & Capsule Specs)

Libro là người chép sử thanh nhã lơ lửng trên bệ đá Tinh Thạch nhỏ (Floating Scribe), sử dụng rig Humanoid kết hợp xương phụ cho bệ đá và các phiến sách:

| Thông số kỹ thuật | Giá trị cấu hình | Giải thích & Quy chuẩn Engine |
|---|---|---|
| **Dạng thể hình (Body Category)** | `floating_humanoid` (Người lơ lửng bệ đá) | Rig chuẩn Biped Humanoid 58 bones + 1 bone bệ đá `bone_hover_pad` + 8 bones phiến sách lật mở. |
| **Bán kính Capsule (Capsule Radius)** | `0.45m` | Kích thước chuẩn cho lớp Hỗ Trợ tầm xa. |
| **Chiều cao Capsule (Capsule Height)** | `1.80m` | Bao quát đỉnh đầu và bệ đá lơ lửng. |
| **Độ cao lơ lửng (Hover Height Offset)** | `+0.20m` từ mặt đất | Bệ đá Tinh Thạch luôn cách mặt sàn $0.20\text{m}$. |
| **Trọng tâm (Center of Mass Offset)** | `Y = +0.90m` | Điểm neo cuốn đại thư và thanh máu/thanh nợ. |
| **Vật lý tà áo & thẻ tre (Secondary Physics)** | Spring Bone Simulation | Tà áo choàng buông rủ và các thẻ tre bay lượn có độ nhún vật lý mềm mại. |

---

## 2. Vũ Khí & Điểm Gắn (Weapon Sockets & Grips)

- **Tên vũ khí:** Đại Thư Nghiệp Báo (The Karmic Ledger Relic).
- **Socket gắn kết chính:** `Socket_Book_Core` (Neo lơ lửng phía trước ngực cách xương ngực $0.35\text{m}$).
- **Socket bệ đá:** `Socket_Hover_Disk` (Neo dưới lòng bàn chân, bệ đá tròn đường kính $0.65\text{m}$).
- **Kích thước cuốn sách:** Chiều dài $0.80\text{m}$, rộng $0.55\text{m}$ khi mở bung, dày $0.25\text{m}$.
- **Đặc tính cử động:** Sách tự động lật mở trang theo nhịp thở; khi cast chiêu các thẻ tre tách rời bay lượn theo quỹ đạo định sẵn.

---

## 3. Danh Mục Clip Hoạt Ảnh (Animation Clip List — Chuẩn Doc 28 & 25)

Toàn bộ cử động của Libro toát lên vẻ điềm tĩnh, mực thước của một quan tòa sinh mệnh:

| Mã Clip (Clip ID) | Tên hành động | Thời lượng (s) | Điểm tác động (HIT Frame) | Mô tả chi tiết tư thế & Cử động |
|---|---|---|---|---|
| `libro_idle` | Thế lơ lửng đọc sách (Idle) | 2.4s (Loop) | — | Libro lơ lửng bồng bềnh trên bệ đá, hai tay nâng nhẹ cuốn sách, các trang sách đá tự lật nhẹ nhàng, tà áo choàng rủ êm ái. |
| `libro_locomotion` | Lướt bệ đá (Move / Float) | 1.0s (Loop) | — | Thân người giữ thẳng thong thả, bệ đá dưới chân lướt êm ái trên không trung rẽ gió tiến về phía trước. |
| `libro_basic_attack` | Phóng phiến đá thẻ tre | 0.75s | **0.15s** | Phẩy nhẹ tay phải, cuốn sách rung lên phóng một phiến đá thẻ tre bay vút đi, Libro khẽ gật đầu chuẩn xác. |
| `libro_q` | Trang Sử Trừng Phạt | 0.8s | **0.15s** | Vung mạnh tay chéo về phía trước, một phiến đá cổ tự khổng lồ tách khỏi sách xé gió lao thẳng. |
| `libro_w` | Sổ Nợ Ký Ức | 0.6s | **0.00s (Instant)** | Cuốn sách mở bung $360^\circ$ như đôi cánh, ánh sáng tím bừng nở bao bọc đồng minh; Libro giữ nguyên bước lướt không bị khựng. |
| `libro_e` | Ân Hạn Nghiệp Báo | 0.7s | **0.10s** | Chỉ tay về phía đồng minh, một cuộn thư lụa tím mạ vàng bay vút từ cuốn sách đến bao bọc mục tiêu. |
| `libro_r` | Chung Quyết Phán Thư (Ultimate) | 1.8s | **0.25s (Clap Impact)** | **Clip tối thượng độc bản:** Bay vút lên $1.0\text{m}$, cuốn sách phóng to gấp 3 lần, hai tay đập mạnh trang sách tạo tiếng sấm rền, triệu hồi đại kết giới phán quyết. |
| `libro_dash` | Tốc Biến Lướt D | 0.3s | — | Bệ đá Tinh Thạch tăng tốc chớp nhoáng lướt nhanh $4.5\text{m}$, để lại vệt cổ tự màu vàng tím. |
| `libro_hit` | Phản hồi nhận đòn (Hit React) | 0.35s | — | Thân người hơi ngửa ra sau, cuốn sách khép hờ bảo vệ ngực, các trang sách phát sáng chống đỡ. |
| `libro_death` | Tử vong (Death) | 1.6s | — | Bệ đá vỡ vụn thành các mảnh tinh thạch rơi xuống đất; cuốn sách rơi tự do và khép lại; thân hình Libro tan thành làn sương cổ tự. |

---

## 4. Dự Thảo Hồ Sơ Tài Nguyên (Asset Manifest Draft)

```yaml
manifest:
  hero_id: "libro"
  research_id: "#28"
  version: "1.0.0-w4"
  status: "DRAFT_PENDING_GATE4_SIGNOFF"
  
  geometry_3d:
    mesh_lod0: "assets/heroes/libro/models/geo_libro_lod0.fbx" # Budget: 26,000 tris
    mesh_lod1: "assets/heroes/libro/models/geo_libro_lod1.fbx" # Budget: 13,000 tris
    mesh_lod2: "assets/heroes/libro/models/geo_libro_lod2.fbx" # Budget: 5,500 tris
    book_mesh: "assets/heroes/libro/models/geo_libro_ledger.fbx" # Budget: 3,200 tris
    hover_disk_mesh: "assets/heroes/libro/models/geo_libro_hover_disk.fbx" # Budget: 1,800 tris
    
  materials:
    mat_scholar_robe: "assets/heroes/libro/materials/m_libro_robe.mat"
    mat_ledger_stone: "assets/heroes/libro/materials/m_libro_stone_ledger.mat"
    mat_karmic_violet: "assets/heroes/libro/materials/m_libro_karmic_violet.mat"
    
  rigging_and_sockets:
    skeleton: "assets/heroes/libro/rigs/sk_libro_floating.fbx"
    sockets:
      - name: "Socket_Book_Core"
        parent_bone: "bone_book_center"
      - name: "Socket_Hover_Disk"
        parent_bone: "bone_root_hover"
      - name: "Socket_Hand_R"
        parent_bone: "bone_hand_r"
        
  vfx_packages:
    vfx_debt_bar_ui: "assets/heroes/libro/vfx/vfx_libro_debt_bar_overhead.prefab"
    vfx_skill_q_slate: "assets/heroes/libro/vfx/vfx_libro_q_slate_proj.prefab"
    vfx_skill_w_ledger_aura: "assets/heroes/libro/vfx/vfx_libro_w_ledger_aura.prefab"
    vfx_skill_e_scroll: "assets/heroes/libro/vfx/vfx_libro_e_karmic_scroll.prefab"
    vfx_skill_r_verdict_barrier: "assets/heroes/libro/vfx/vfx_libro_r_verdict_barrier.prefab"
```
