# 08 · Asset Production — #38 Linh Hầu (Cổ Thần Trượng)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#38 / linh_hau`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `humanoid_heavy_biped` (Vượn chiến binh cơ bắp) | Dáng đứng thẳng, vai rộng ngực nở, trọng tâm vững |
| **Chiều cao đỉnh đầu (Height)** | `2.10m` | Khớp tỷ lệ với thế giới Cổ Linh |
| **Bán kính Capsule va chạm (Radius)** | `0.55m` | Tránh kẹt khi di chuyển qua hẻm núi |
| **Chiều cao Capsule (Height)** | `2.10m` | Dùng cho va chạm đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 14,500$ Triangles | Tối ưu hóa cho trận đấu 5v5 60 FPS |
| **Hệ thống LOD** | LOD0: $14.5\text{k}$ tris \| LOD1: $8.5\text{k}$ tris \| LOD2: $3.5\text{k}$ tris | Giảm tải khi nhiều tướng combat |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho tướng; $1024 \times 1024$ cho vũ khí |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Tên vũ khí:** Cổ Thần Trượng Tinh Thạch (`ancient_staff`).
- **Cấu tạo:** Thân gậy hình bát giác bằng đá tinh thạch hoàng kim Cổ Linh, hai đầu bọc đồng Đông Sơn chạm khắc vân mây sấm sét.
- **Cơ chế co giãn (Bone Rigging):** Trượng có hệ thống xương riêng (`weapon_root`, `bone_staff_tip_top`, `bone_staff_tip_bottom`) để co giãn mượt mà từ 2.2m (Đoản trượng) lên 4.8m (Trường trượng).
- **Socket điểm cầm tay (Grip Sockets):**
  - `socket_hand_r`: Cầm chính ở 1/3 thân dưới khi ở thế Đoản Trượng.
  - `socket_hand_l`: Hỗ trợ cầm hai tay khi bổ cọc hoặc quét gậy E.
  - `socket_back`: Vác trượng sau lưng khi ở thế Idle thư giãn ngoài giao tranh.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ nguyên tắc Doc 28: Toàn thân chuyển động, gối khuỵu, lưng gập/xoắn, hông lên xuống theo quán tính; cấm đẩy cả người từ A sang B.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `linh_hau_idle` | Đứng thẳng uy nghi, thở đều, hai tay nắm lỏng trượng cắm sát chân | 2.0s loop | Không |
| `linh_hau_run` | Sải bước chạy dũng mãnh, lưng hơi khom về trước, một tay vác trượng trên vai | 0.8s loop | Không |
| `linh_hau_basic_short_a` | Vung đoản trượng bổ chéo từ vai phải xuống | 0.6s / 1.0x | $0.12\text{s}$ (Frame 4) |
| `linh_hau_basic_short_b` | Thu gậy quật ngang từ trái sang phải | 0.6s / 1.0x | $0.14\text{s}$ (Frame 5) |
| `linh_hau_basic_long` | Vung trường trượng 4.8m quật tầm xa, cả thân người xoay nửa vòng lấy lực | 0.8s / 0.9x | $0.20\text{s}$ (Frame 6) |
| `linh_hau_q_thrust` | Thu trượng ra sau hông rồi phóng thẳng tới trước với lực đẩy toàn thân | 0.5s / 1.2x | $0.15\text{s}$ (Frame 5) |
| `linh_hau_w_guard` | Cắm mạnh trượng xuống đất bằng tay phải, tay trái kết ấn thủ thế | 0.6s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `linh_hau_e_sweep` | Hạ thấp trọng tâm, xoay cả người $360^\circ$ quét trượng sát mặt đất | 0.7s / 1.1x | $0.18\text{s}$ (Frame 6) |
| `linh_hau_r_leap` | Chống gậy bật nhảy vút lên trời, uốn cong lưng dồn toàn lực nện xuống tâm chấn | 1.2s / 1.0x | $0.70\text{s}$ (Frame 21) |
| `linh_hau_dash_d` | Bước chân đạp mạnh đất lướt nghiêng né tránh theo hướng di chuyển | 0.4s / 1.3x | Không |
| `linh_hau_death` | Trượng cắm xuống đất, Linh Hầu quỳ một gối tựa vào thân gậy trước khi tan biến | 2.2s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Thần Trượng xuất thế, định đoạt Cửu Mạch!"
  - *Ban Voice:* "Chỉ có kẻ nhát gan mới lẩn tránh giao tranh."
  - *Attack Voice:* "Nện!", "Đỡ lấy!", "Thần Trượng phá vỡ!"
  - *Cast Q:* "Xuyên phá!"
  - *Cast R:* "CỔ THẦN NỘ PHÁCH!"
- **Sound Effects (SFX):**
  - `sfx_linh_hau_staff_whoosh`: Tiếng vung gậy rít trong không khí.
  - `sfx_linh_hau_sweetspot_bell`: Tiếng chuông đồng Tinh Thạch vang dội đặc trưng khi trúng rìa trượng.
  - `sfx_linh_hau_r_earthquake`: Tiếng nổ trầm chấn động kèm tiếng đá nứt toác.

---

## 5. Điểm Nạp Dữ Liệu Vào Runtime (Runtime Import Pointers)

- Mesh model path: `assets/models/heroes/linh_hau/mesh.glb` (Sau Gate 4).
- Animation clip directory: `assets/animations/heroes/linh_hau/*.glb`
- VFX definition pointer: `scripts/lib/skillfx.js` $\rightarrow$ gán profile `linh_hau`.
- Candidate YAML to live kit: Sao chép từ `tools/sim/candidates/linh_hau.yml` sang `scripts/lib/data/heroes.yml` chỉ sau khi có Owner Gate 4 Sign-Off.
