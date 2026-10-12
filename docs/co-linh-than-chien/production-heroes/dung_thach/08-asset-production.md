# 08 · Asset Production — #46 Dũng Thạch (Thần Rìu & Thiên Cầm)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#46 / dung_thach`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `muscular_biped_hero` (Chiến binh người cơ bắp lực lưỡng, vác rìu lớn, mang đàn lưng) | Thân hình đồng đen cổ sẫm, khoác giáp dã thú, dáng đi vạm vỡ dũng mãnh. |
| **Chiều cao Battle Form** | Đỉnh đầu nhân vật: `2.20m` | Chuẩn kích thước đấu sĩ cận chiến, không che camera. |
| **Độ rộng sải vai (Shoulder Width)** | `1.40m` | Vóc dáng chữ V khỏe khoắn, cơ bắp nở nang. |
| **Bán kính Capsule va chạm (Radius)** | `0.65m` | Hitbox đấu sĩ tiêu chuẩn, linh hoạt trong địa hình hẹp. |
| **Chiều cao Capsule (Height)** | `2.20m` | Khối va chạm chọn mục tiêu và đạn đạo. |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 16,000$ Triangles | Bao gồm nhân vật, cây đại rìu và đàn Thiên Cầm 7 dây. |
| **Hệ thống LOD** | LOD0: $16.0\text{k}$ tris \| LOD1: $9.0\text{k}$ tris \| LOD2: $3.6\text{k}$ tris | Giảm tải trong combat 5v5 đông tướng. |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture $2048 \times 2048$ cho nhân vật; $1024 \times 1024$ cho rìu và đàn. |

---

## 2. Kế Hoạch Sockets & Điểm Gắn Kết (Sockets Plan)

- **Hệ thống Socket gắn kết mô hình Dũng Thạch:**
  - `socket_hand_r` / `socket_hand_l`: Hai bàn tay cầm cán Đại Rìu Cổ Linh; khi gảy đàn W, tay chuyển sang gảy dây đàn.
  - `socket_axe_blade`: Lưỡi rìu sáng ánh bạc, điểm phát vệt chém (trail) và hiệu ứng nứt đất đòn 3.
  - `socket_back_harp`: Điểm đeo Thiên Cầm Tinh Thạch sau lưng khi không sử dụng.
  - `socket_harp_front`: Điểm giữ Thiên Cầm trước ngực trong $1.0\text{s}$ diễn hoạt chiêu W.
  - `socket_harp_strings`: 7 dây đàn tơ ngọc bích phát quang khi gảy.
  - `socket_ground_stomp`: Dưới bàn chân trần, phát VFX nứt đất và bụi cỏ khi dậm nhảy R.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Nhịp vung rìu dứt khoát uy lực, độ giật cơ bắp chân thực, động tác gảy đàn tao nhã đối lập tương phản rõ rệt.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `dung_thach_idle` | Đứng thẳng vác rìu trên vai phải, tay trái buông tự nhiên, ngực thở nhịp nhàng tràn đầy sinh lực | 2.5s loop | Không |
| `dung_thach_run` | Chạy sải bước dài dũng mãnh, hai tay giữ chặt cán rìu chéo trước ngực | 0.8s loop | Không |
| `dung_thach_attack_1` | Vung rìu chém chéo vát từ vai phải xuống | 0.55s / 1.0x | $0.15\text{s}$ (Frame 5) |
| `dung_thach_attack_2` | Xoay cổ tay chém ngang từ trái sang phải | 0.55s / 1.0x | $0.15\text{s}$ (Frame 5) |
| `dung_thach_attack_3_cleave` | Giơ cao rìu bằng hai tay nện thẳng xuống sàn nứt đất (Sát thương chuẩn) | 0.70s / 1.05x | $0.20\text{s}$ (Frame 6) |
| `dung_thach_q_cleave` | Ngả người lấy đà phóng luồng khí chém xé đất theo đường thẳng | 0.55s / 1.1x | $0.18\text{s}$ (Frame 5) |
| `dung_thach_w_harp_song` | Rút nhanh đàn ra trước ngực, ngón tay lướt êm ái trên 7 dây đàn trong 1.0s | 1.0s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `dung_thach_e_whirlwind` | Xoay tròn người $360^\circ$ vung đại rìu quét gió lốc xung quanh | 0.6s / 1.1x | $0.12\text{s}$ (Frame 4) |
| `dung_thach_r_leap_slam` | Bật nhảy vút lên không -> Bổ đại rìu hai tay sụp sàn đấu -> Đứng thẳng | 1.15s / 1.0x | $0.55\text{s}$ (Frame 17) |
| `dung_thach_dash_d` | Nhún chân lướt dạt ngang né đòn $4.5\text{m}$ cực nhanh | 0.35s / 1.3x | Không |
| `dung_thach_hit_react` | Cơ thể gồng cứng chịu đòn, cơ bắp giật nhẹ nhưng ánh mắt kiên định | 0.25s / 1.0x | Không |
| `dung_thach_death` | Rìu cắm phập xuống đất, chàng ôm lấy cây đàn trước ngực khuỵu gối từ từ nhắm mắt | 2.8s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Rìu này xẻ núi diệt bạo, đàn này giải họa an dân!"
  - *Ban Voice:* "Kẻ chuộng chiến tranh sẽ phải nếm mùi gươm giáo."
  - *Attack Voice:* "Một trảm!", "Hai trảm!", "NỨT ĐẤT!"
  - *Harp Voice:* "Bãi chiến đi thôi...", "Oán thù xin gác lại..."
  - *Ultimate Voice:* "BẠT NÚI TRẢM YÊU — THIÊN ĐỊA BÌNH AN!"
- **Sound Effects (SFX):**
  - Tiếng vung rìu nặng nề xé rách không khí, tiếng nện đất nứt rãnh đanh thép.
  - Tiếng gảy đàn tơ 7 dây thánh thót ngân vang ("TÍNH TÍNH TANG TANG") làm giảm áp lực chiến trường.
  - Tiếng nhảy bổ rúng động mặt đất và tiếng đất đá sụp đổ miệng hố.
