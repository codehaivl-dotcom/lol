# 08 · Asset Production — #17 Forge (Lò Cổ)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#17 / forge`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `golem_heavy_cylinder` (Cỗ máy đá lò nung hình trụ) | Khối lượng đồ sộ, vai rộng vòm lò, trọng tâm cực thấp |
| **Chiều cao đỉnh đầu (Height)** | `2.25m` | Tướng đỡ đòn có kích thước lớn nhất nhì Wave 1 |
| **Bán kính Capsule va chạm (Radius)** | `0.65m` | Capsule rộng đại diện cho vai trò che chắn tiền tuyến |
| **Chiều cao Capsule (Height)** | `2.25m` | Dùng cho va chạm đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 15,000$ Triangles | Tối ưu hóa cho trận đấu 5v5 60 FPS |
| **Hệ thống LOD** | LOD0: $15.0\text{k}$ tris \| LOD1: $8.8\text{k}$ tris \| LOD2: $3.8\text{k}$ tris | Giảm tải khi nhiều tướng combat |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho thân lò; $1024 \times 1024$ cho vũ khí piston |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Tên vũ khí:** Nắm Đấm Piston Lò Nung (`piston_gauntlets`).
- **Cấu tạo:** Hai khối găng kim loại đồng thau và đá núi lửa bọc kín hai cẳng tay, tích hợp xi-lanh áp suất khí nén có khớp chuyển động tịnh tiến.
- **Socket gắn vũ khí (Grip Sockets):**
  - `socket_forearm_r`: Gắn cố định vào xương cẳng tay phải.
  - `socket_forearm_l`: Gắn cố định vào xương cẳng tay trái.
  - `socket_exhaust_top_r` & `socket_exhaust_top_l`: Điểm gắn khói xả nhiệt trên hai vai.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ nguyên tắc Doc 28: Toàn thân chuyển động, gối khuỵu, lưng gập/xoắn, hông lên xuống theo quán tính; cấm đẩy cả người từ A sang B.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `forge_idle` | Đứng dậm đất vững chãi, hai tay gập trước ngực, lồng lò nung phập phồng thở nhiệt | 2.2s loop | Không |
| `forge_run` | Bước chạy nặng trịch như máy cày, hai cánh tay piston đung đưa theo nhịp cơ học | 0.9s loop | Không |
| `forge_basic_punch_r` | Tung cú đấm thẳng tay phải, piston duỗi ra hết tầm kèm tia lửa phụt nhẹ | 0.55s / 1.0x | $0.14\text{s}$ (Frame 4) |
| `forge_basic_hook_l` | Móc ngang tay trái từ sườn vào tâm, thân người xoay nửa vòng dồn lực nặng | 0.55s / 1.0x | $0.15\text{s}$ (Frame 5) |
| `forge_q_ram_charge` | Hạ thấp vai ghì người lao vút tới trước như khối thiên thạch húc văng mục tiêu | 0.6s / 1.2x | $0.18\text{s}$ (Frame 6) |
| `forge_w_vent_release` | Các van hơi trên vai bung mở, hai tay đập mạnh vào ngực xả bùng sóng nhiệt | 0.5s / 1.1x | Kích hoạt tức thì $0.0\text{s}$ |
| `forge_e_flame_cone` | Ngực ưỡn về trước, hai tay mở rộng xả luồng hơi magma đỏ rực hình quạt | 0.65s / 1.0x | $0.12\text{s}$ (Frame 4) |
| `forge_r_blast_slam` | Nhảy lao lên trời nén áp suất cực đại rồi nện hai tay xuống đất gây nổ chấn động | 1.3s / 1.0x | $0.80\text{s}$ (Frame 24) |
| `forge_dash_d` | Dậm mạnh chân phải phóng người lướt tới né đạn theo hướng di chuyển | 0.4s / 1.3x | Không |
| `forge_death` | Lửa ngực lịm dần, Forge quỳ rạp người xuống biến thành khối tượng đá lò nung nguội lạnh | 2.5s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Lò Nung thức tỉnh, thiêu rụi chiến trường!"
  - *Ban Voice:* "Kẻ yếu đuối không chịu nổi sức nóng này đâu."
  - *Attack Voice:* "Nghiền nát!", "Chịu đòn!", "Nhiệt dâng!"
  - *Cast Q:* "HÚC ĐỔ!"
  - *Cast W (Xả áp):* "XẢ ÁP SUẤT!"
  - *Cast R:* "ĐẠI BỘC PHÁ LÒ CỔ!"
- **Sound Effects (SFX):**
  - `sfx_forge_piston_punch`: Tiếng kim loại va đập nặng kèm tiếng hơi nước xì "XÈO".
  - `sfx_forge_steam_vent`: Tiếng còi hơi nước rít chói tai khi mở van xả áp chiêu W.
  - `sfx_forge_magma_eruption`: Tiếng nổ trầm vang dội như núi lửa bộc phát khi tiếp đất chiêu R.

---

## 5. Điểm Nạp Dữ Liệu Vào Runtime (Runtime Import Pointers)

- Mesh model path: `assets/models/heroes/forge/mesh.glb` (Sau Gate 4).
- Animation clip directory: `assets/animations/heroes/forge/*.glb`
- VFX definition pointer: `scripts/lib/skillfx.js` $\rightarrow$ gán profile `forge`.
- Candidate YAML to live kit: Sao chép từ `tools/sim/candidates/forge.yml` sang `scripts/lib/data/heroes.yml` chỉ sau khi có Owner Gate 4 Sign-Off.
