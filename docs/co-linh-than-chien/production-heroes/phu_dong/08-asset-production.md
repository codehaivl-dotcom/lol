# 08 · Asset Production — #43 Phù Đổng (Thiết Mã Thiên Tướng)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#43 / phu_dong`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `mounted_cavalier` (Chiến tướng cưỡi Thiết Mã cơ khí) | **Không phải Centaur**. Người và ngựa là hai khối mesh gắn kết trên cùng 1 hệ xương chung (`root_steed` + `pelvis_rider`). |
| **Chiều cao Battle Form** | Đỉnh đầu chủ tướng: `2.40m` \| Lưng ngựa: `1.45m` | Tối ưu hóa dưới góc camera isometric $55^\circ$ |
| **Chiều dài thân ngựa (Length)** | `2.80m` (từ mũi đến gốc đuôi) | Đảm bảo dáng phi nước đại bề thế, đầm chắc |
| **Bán kính Capsule va chạm (Radius)** | `0.75m` | Chuẩn hitbox kỵ mã lớn, không bị kẹt địa hình |
| **Chiều cao Capsule (Height)** | `2.40m` | Dùng cho va chạm đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 18,500$ Triangles | Tối ưu hóa cho combat 5v5 60 FPS (cả người và ngựa) |
| **Hệ thống LOD** | LOD0: $18.5\text{k}$ tris \| LOD1: $10.5\text{k}$ tris \| LOD2: $4.2\text{k}$ tris | Giảm tải khi nhiều tướng combat |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho tướng + ngựa; $1024 \times 1024$ cho vũ khí |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Vũ khí 1 — Cổ Thần Kiếm (`ancient_sword`):** Kiếm đồng Cổ Linh dài $1.4\text{m}$, lưỡi kiếm chạm vân sấm sét. Cầm tay phải (`socket_hand_r`).
- **Vũ khí 2 — Thiên Lôi Cổ Trúc (`divine_bamboo`):** Cụm tre Tinh Thạch xanh ngọc bọc sấm sét dài $3.5\text{m}$, gốc tre bọc đồng thau. Cầm hai tay (`socket_hand_r` và `socket_hand_l`).
- **Hệ thống Socket gắn kết Kỵ Mã:**
  - `socket_saddle`: Điểm đặt hông của Chủ Tướng trên lưng ngựa.
  - `socket_reins_l` / `socket_reins_r`: Hai điểm tay nắm dây cương.
  - `socket_hoof_fl`, `socket_hoof_fr`, `socket_hoof_bl`, `socket_hoof_br`: Bốn móng sắt để kích hoạt VFX tia lửa và nứt đất.
  - `socket_mane`: Điểm phát quang bờm lửa đồng đỏ rực.
  - `socket_horse_head`: Điểm hí vang và phun khói lôi hỏa.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Toàn thân chuyển động, gập duỗi tự nhiên của loài ngựa và cơ bắp người cưỡi; không dùng chuyển động cứng đơ.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `phu_dong_idle` | Ngựa dậm chân nhẹ, thở phì khói lôi hỏa; tướng ngồi thẳng tay cầm cương tay cầm kiếm tựa đùi | 2.5s loop | Không |
| `phu_dong_walk` | Ngựa bước chậm khoan thai khi ngoài giao tranh | 1.0s loop | Không |
| `phu_dong_trot` | Phi nước kiệu nhịp nhàng khi Xung Lượng $< 50$ đà | 0.8s loop | Không |
| `phu_dong_gallop` | Phi nước đại dũng mãnh khi Xung Lượng $\ge 80$ đà, bờm lửa và chiến bào bay phần phật | 0.6s loop | Không |
| `phu_dong_basic_sword_a` | Chém Cổ Thần Kiếm vát góc $45^\circ$ từ vai phải xuống | 0.6s / 1.0x | $0.14\text{s}$ (Frame 4) |
| `phu_dong_basic_sword_b` | Đâm mũi kiếm thẳng tới trước theo đà ngựa phi | 0.6s / 1.0x | $0.15\text{s}$ (Frame 5) |
| `phu_dong_charge_hoof` | Cú Húc Lôi Hỏa: Ngựa chồm hai chân trước dậm mạnh xuống đầu mục tiêu | 0.7s / 1.1x | $0.16\text{s}$ (Frame 5) |
| `phu_dong_basic_bamboo` | Quất cụm tre $3.5\text{m}$ hình quạt cực đại bằng hai tay xé gió | 0.8s / 0.95x | $0.18\text{s}$ (Frame 6) |
| `phu_dong_q_dash` | Ngựa hạ thấp đầu bọc lôi hỏa lao vút $7.2\text{m}$ tới trước | 0.45s / 1.3x | $0.15\text{s}$ (Frame 5) |
| `phu_dong_w_guard` | Ngựa dậm mạnh móng sắt trước nảy tia lửa, tướng giơ cao kiếm kích hoạt khiên | 0.5s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `phu_dong_e_sweep` | Xoay cả người vung kiếm chém tròn $360^\circ$ quanh sườn ngựa | 0.65s / 1.1x | $0.12\text{s}$ (Frame 4) |
| `phu_dong_r_leap` | Thúc ngựa phóng vút lên không, giáng 4 vó dậm đất, ném kiếm gãy rút cụm tre thần | 1.3s / 1.0x | $0.70\text{s}$ (Frame 21) |
| `phu_dong_dash_d` | Ghìm cương thúc ngựa lướt dạt ngang né đòn $4.5\text{m}$ | 0.4s / 1.3x | Không |
| `phu_dong_death` | Ngựa khuỵu 4 chân gục xuống, tướng chống kiếm ngẩng cao đầu trước khi tan biến | 2.5s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Thiết Mã xuất trận, non sông liền một dải!"
  - *Ban Voice:* "Kẻ không dám đối mặt lôi hỏa chỉ có thể trốn chạy."
  - *Charge Voice:* "Càn quét!", "Phá trận!", "Hí vang non sông!"
  - *Ultimate Voice:* "THẦN TRÚC XUẤT THẾ — DẸP YÊN BẦU TRỜI!"
- **Sound Effects (SFX):**
  - Tiếng vó ngựa đồng nện đất nhịp nhàng $\rightarrow$ dồn dập khi đạt Xung Lượng cao.
  - Tiếng sấm rền vang khi chém kiếm và tiếng nổ đanh gọn khi dậm móng sắt.
  - Tiếng vỡ vụn thủy tinh/tinh thạch khi kiếm gãy và tiếng rít lôi đình khi quất Cổ Trúc.
