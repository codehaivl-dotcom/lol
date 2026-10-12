# 08 · Asset Production — #30 Iro (Mắt Thiên Cơ)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#30 / iro`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `floating_mechanical_oculus` (Khối nhãn cầu máy cổ lơ lửng) | Không có tay chân người; 3 vành đồng tâm xoay gimbal |
| **Kích thước Battle Form** | Đường kính khối cầu: `1.4m` \| Độ cao lơ lửng: `1.2m` | Silhouette hình tròn đồng tâm lơ lửng tĩnh tại |
| **Bán kính Capsule va chạm (Radius)** | `0.50m` | Khối cầu va chạm cân đối, dễ dàng căn chỉnh hitbox |
| **Chiều cao Capsule (Height)** | `1.4m` | Dùng cho va chạm đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 12,000$ Triangles | 3 vành đồng thau hoa văn chữ triện và khối pha lê đa giác |
| **Hệ thống LOD** | LOD0: $12.0\text{k}$ tris \| LOD1: $7.0\text{k}$ tris \| LOD2: $2.5\text{k}$ tris | Giảm tải khi nhiều tia laser và hiệu ứng hạt bloom |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho vành máy; $1024 \times 1024$ cho pha lê |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Vũ khí độc bản — Thấu Kính Pha Lê Đỏ & Lõi Vệ Tinh (`ruby_crystal_aperture`):**
  - Cấu tạo: Khối tinh thể pha lê đỏ đa giác gắn tại tâm trục của 3 vành đồng tâm; tự phát quang màu đỏ hồng ngọc.
  - Gắn trực tiếp vào socket: `socket_oculus_core_lens`.
  - **Tuyệt đối không có socket cầm súng ngắn hay nỏ trên tay.**
- **Hệ thống Socket phụ trợ & Khóa chốt:**
  - `socket_outer_ring_top` / `socket_outer_ring_bottom`: Các vành kim loại mở rộng xòe ra khi tích ngắm tĩnh.
  - `socket_anchor_piston`: Các chốt neo năng lượng cắm xuống không gian khi đứng yên.
  - `socket_laser_emitter`: Điểm phát tia laser thẳng ra phía trước của đòn đánh thường, Q và R.
  - `socket_shield_barycenter`: Điểm phát trường xung kích đẩy lùi W.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Dáng chuyển động lơ lửng tĩnh tại, xoay trục cơ học gimbal êm ái; các vành kim loại xòe rộng và khép lại dứt khoát như khẩu độ máy ảnh cổ đại; không có hoạt ảnh chân bước đi bộ.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `iro_idle` | Nhãn cầu lơ lửng cách mặt đất $1.2\text{m}$, 3 vành kim loại xoay chậm quanh các trục vuông góc | 2.5s loop | Không |
| `iro_float_move` | Trôi nhẹ nhàng về phía trước, các vành nghiêng nhẹ theo hướng di chuyển | 0.8s loop | Không |
| `iro_focus_enter` | Dừng di chuyển, 3 vành mở rộng khóa chốt neo năng lượng, lõi pha lê rực sáng | 0.5s / 1.0x | Không |
| `iro_focus_loop` | Đứng yên ngắm tĩnh, lõi pha lê nhấp nháy ánh đỏ đều đặn, hoa văn chữ triện bừng sáng | 1.0s loop | Không |
| `iro_basic_shot` | Vành ngoài giật lùi triệt tiêu phản lực, lõi chớp sáng bắn tia laser thẳng | 0.45s / 1.1x | $0.15\text{s}$ (Frame 4) |
| `iro_q_beam_charge` | Ba vành ép sát nhau hội tụ năng lượng trong $0.25\text{s}$ rồi nã tia laser Q dày cự ly $12.0\text{m}$ | 0.55s / 1.1x | $0.25\text{s}$ (Frame 7) |
| `iro_w_repulse` | Ba vành xoay tít cực nhanh bung sóng xung kích quang học đẩy lùi $3.0\text{m}$ tạo khiên | 0.4s / 1.2x | Kích hoạt tức thì $0.0\text{s}$ |
| `iro_e_target_lock` | Lõi pha lê chớp sáng quét tia laser mỏng khóa mục tiêu cự ly $9.0\text{m}$ | 0.35s / 1.0x | $0.10\text{s}$ (Frame 3) |
| `iro_r_cannon` | Tách 3 vành thành 3 tầng thấu kính, nạp tụ năng lượng cực hạn rồi nã đại pháo laser $22.0\text{m}$ | 1.3s / 1.0x | $0.50\text{s}$ (Frame 15) |
| `iro_dash_d` | Chớp sáng dịch chuyển vi mô $4.5\text{m}$ theo hướng chỉ định | 0.3s / 1.5x | Không |
| `iro_death` | Lõi pha lê nứt vỡ tắt ngấm ánh sáng, 3 vành kim loại rụng rời rơi sập xuống đất, vỡ vụn thành các mảnh đồng thau | 2.0s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO) (Giọng máy tính cổ đại lạnh lùng, vô cảm và mang tính tiên tri):**
  - *Pick Voice:* "Tọa độ đã xác lập — Mắt Thiên Cơ đã mở."
  - *Ban Voice:* "Tầm nhìn bị gián đoạn... tắt hệ thống quét."
  - *Focus Max Voice:* "TIÊU CỰ HOÀN TẤT — MỤC TIÊU ĐÃ BỊ KHÓA."
  - *Ultimate R Voice:* "THIÊN CƠ HỦY DIỆT PHÁO — XÓA SỔ TỌA ĐỘ!"
- **Sound Effects (SFX):**
  - Tiếng kim loại xoay trục gimbal "RO-RO" nhẹ êm khi lơ lửng.
  - Tiếng khóa chốt cơ học "CẠCH - KENG" đanh thép khi vào thế đứng yên ngắm tĩnh.
  - Tiếng "TÍCH... CHÍU!" xung kích laser đanh gọn của đòn bắn thường.
  - Tiếng nạp năng lượng tần số cao réo rắt và tiếng nổ đại pháo laser chấn động "OÀNH - CHÍU!" của chiêu cuối R.
