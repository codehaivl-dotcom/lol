# 08 · Asset Production — #31 Moka (Hổ Nấm Răng Kiếm)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#31 / moka`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `quadruped_feline_predator` (Dã thú 4 chân hổ răng kiếm) | Trọng tâm thấp; vai gù dũng mãnh; khớp xương uốn lượn uyển chuyển |
| **Kích thước Battle Form** | Dài: `2.2m` \| Rộng: `1.1m` \| Cao đỉnh vai: `1.3m` | Silhouette thú 4 chân rõ nét dưới camera góc nhìn isometric |
| **Bán kính Capsule va chạm (Radius)** | `0.55m` | Tối ưu hóa kích thước dã thú luồn lách qua bụi rậm và khe hẹp |
| **Chiều cao Capsule (Height)** | `1.4m` | Dùng cho va chạm đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 13,000$ Triangles | Thân hổ cơ bắp, đôi răng kiếm ngà sắc nét và các cụm nấm ký sinh |
| **Hệ thống LOD** | LOD0: $13.0\text{k}$ tris \| LOD1: $7.5\text{k}$ tris \| LOD2: $2.9\text{k}$ tris | Giảm tải khi nhiều hiệu ứng bào tử nấm xuất hiện |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho thân và nấm; $1024 \times 1024$ cho răng kiếm |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Vũ khí độc bản — Răng Kiếm & Vuốt Sừng Cổ Đại (`sabretooth_fangs` & `fossil_claws`):**
  - Cấu tạo: Đôi răng kiếm dài $0.45\text{m}$ gắn liền xương hàm trên; móng vuốt 4 chân gắn trực tiếp vào các đốt ngón chân.
  - Gắn trực tiếp vào socket: `socket_jaw_fang_r` / `socket_jaw_fang_l` và `socket_paw_claw_fl` / `socket_paw_claw_fr`.
  - **Tuyệt đối không có socket cầm đao kiếm nhân tạo.**
- **Hệ thống Socket phụ trợ phát tán bào tử:**
  - `socket_spine_fungus_cluster`: Cụm nấm lớn trên sống lưng dùng để phát hiệu ứng khiên W và hào quang huỳnh quang.
  - `socket_tail_spore_launcher`: Đỉnh đuôi chổi dùng để phóng chùm bào tử Q.
  - `socket_mouth_roar`: Điểm phát âm thanh sóng siêu âm và hiệu ứng tiếng gầm của chiêu cuối R.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Dáng chạy 4 chân dũng mãnh, các bước chuyển trọng tâm cơ thể nhịp nhàng như báo đốm và hổ tiền sử; không đẩy cả người cứng nhắc.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `moka_idle` | 4 chân bám đất, đầu cúi thấp ngửi dấu vết, đuôi khẽ vẫy qua lại, nấm trên lưng nhấp nháy ánh cam | 2.2s loop | Không |
| `moka_walk` | Bước đi rón rén rình mồi uyển chuyển, thân mình uốn lượn theo nhịp bước chân | 0.9s loop | Không |
| `moka_run` | Phi nước đại 4 chân dũng mãnh, lưng gù co duỗi mạnh mẽ, bụi đất và bào tử bốc lên sau gót | 0.6s loop | Không |
| `moka_basic_slash_a` | Chân trước bên phải vung vuốt cào vát chéo từ trên xuống | 0.5s / 1.1x | $0.12\text{s}$ (Frame 4) |
| `moka_basic_bite_b` | Há to hàm đớp mạnh nanh kiếm vào mục tiêu | 0.5s / 1.1x | $0.14\text{s}$ (Frame 4) |
| `moka_passive_pounce` | Phóng vút người $7.0\text{m}$ vồ sập mục tiêu, tiếp đất đè nghiến con mồi | 0.45s / 1.3x | $0.20\text{s}$ (Frame 6) |
| `moka_q_tail_fling` | Quất mạnh đuôi chổi bắn chùm 3 quả cầu bào tử nấm về phía trước | 0.4s / 1.2x | $0.10\text{s}$ (Frame 3) |
| `moka_w_burst` | Gầm khẽ gồng cơ thể, nấm trên lưng bùng nổ làn sóng bào tử tạo khiên | 0.35s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `moka_e_spin_claw` | Xoay tròn 4 chân quét móng vuốt cào xé diện rộng $3.2\text{m}$ | 0.5s / 1.2x | $0.12\text{s}$ (Frame 4) |
| `moka_r_pounce` | Ngửa cổ gầm vang, phóng bổng người $7.0\text{m}$ đè sập mục tiêu cắn ngập nanh kiếm | 1.1s / 1.1x | $0.50\text{s}$ (Frame 15) |
| `moka_dash_d` | Chồm lướt dã thú $4.5\text{m}$ dạt nhanh sang bên né đòn | 0.35s / 1.4x | Không |
| `moka_death` | Nấm trên lưng héo tàn xám xịt, Moka ngã nghiêng sang một bên, thở hắt hơi cuối cùng rồi bất động | 2.0s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO) (Tiếng gầm gừ dã thú kết hợp âm hưởng bào tử thần bí):**
  - *Pick Voice:* (Tiếng gầm dũng mãnh) "GỪ... MÙI CỦA CON MỒI ĐÃ LỘ DIỆN!"
  - *Ban Voice:* "Bóng tối khu rừng sẽ nuốt chửng ngươi..."
  - *Skill Q Voice:* "DÍNH BẪY!", "ĐỪNG HÒNG CHẠY!"
  - *Ultimate R Voice:* (Tiếng gầm rợn gáy vang dội toàn bản đồ) "ROAAAAR! TUYỆT SÁT!"
- **Sound Effects (SFX):**
  - Tiếng 4 đệm chân tiếp đất nhẹ nhàng nhưng chắc nịch trên nền cỏ/đất.
  - Tiếng chùm bào tử phóng đi xé gió vù vù như đạn pháo sinh học.
  - Tiếng nanh kiếm găm ngập vào cơ thể "PHẬP" sắc lạnh.
  - Tiếng gầm hổ tiền sử vang rền có độ trễ $0.25\text{s}$ mang tính cảnh báo toàn sàn đấu.
