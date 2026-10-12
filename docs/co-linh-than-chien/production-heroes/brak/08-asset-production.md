# 08 · Asset Production — #02 Brak (Nhịp Quyền)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#02 / brak`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `brawler_heavy_humanoid` (Võ sĩ quyền cước thể hình nặng) | Thân hình chữ V đồ sộ, cơ bắp cuồn cuộn, hai cánh tay bọc găng kim loại lớn |
| **Chiều cao đỉnh đầu (Height)** | `2.10m` | Cao lớn hơn người thường, tương xứng với vóc dáng võ sĩ Cổ Linh |
| **Bán kính Capsule va chạm (Radius)** | `0.55m` | Capsule chuẩn cho đấu sĩ cận chiến hạng nặng |
| **Chiều cao Capsule (Height)** | `2.10m` | Dùng cho tính toán hitbox đạn đạo và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 14,000$ Triangles | Tối ưu hóa cho combat 5v5 60 FPS trên mobile/PC |
| **Hệ thống LOD** | LOD0: $14.0\text{k}$ tris \| LOD1: $8.0\text{k}$ tris \| LOD2: $3.5\text{k}$ tris | Chuyển đổi linh hoạt theo khoảng cách camera |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho cơ thể; $1024 \times 1024$ cho đôi găng piston đồng |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Tên vũ khí:** Đôi Găng Piston Hơi Nước Đồng Đỏ (`piston_gauntlets`).
- **Cấu tạo:** Cặp găng tay hợp kim đồng đỏ bọc kín từ mu bàn tay lên tới khuỷu tay, phía sau lưng cẳng tay có gắn 2 xi-lanh thủy lực hơi nước có khớp tịnh tiến cơ học khi ra đòn và khi parry.
- **Socket gắn vũ khí (Grip Sockets):**
  - `socket_gauntlet_r`: Gắn cố định vào xương cẳng tay phải (`arm_lower_r`).
  - `socket_gauntlet_l`: Gắn cố định vào xương cẳng tay trái (`arm_lower_l`).
  - `socket_exhaust_shoulder_r`: Điểm xả khói trên vai phải (`shoulder_r`).
  - `socket_exhaust_shoulder_l`: Điểm xả khói trên vai trái (`shoulder_l`).

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ nguyên tắc Doc 28: Động tác toàn thân, hông xoay phát lực từ chân lên tay, gối khuỵu khi đón đòn; nghiêm cấm đẩy tĩnh toàn bộ mô hình.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `brak_idle` | Thủ thế boxing hạng nặng, hai tay nâng ngang cằm, thân người nhấp nhô theo nhịp thở, khói phụt ngắt quãng ở vai | 2.0s loop | Không |
| `brak_run` | Bước chạy đầm chắc dậm đất, hai cánh tay gập vuông góc đung đưa theo nhịp cơ học | 0.85s loop | Không |
| `brak_basic_punch_r` | Tung cú đấm thẳng tay phải, xi-lanh sau tay giật bắn ra sau kèm tia lửa nhỏ | 0.5s / 1.0x | $0.12\text{s}$ (Frame 4) |
| `brak_basic_hook_l` | Vung cú móc sườn tay trái, thân người xoay hông $45^\circ$ dồn trọn trọng lượng | 0.5s / 1.0x | $0.13\text{s}$ (Frame 4) |
| `brak_q_straight_thrust` | Dậm mạnh chân phải xuống đất, phóng nắm đấm nén áp suất xé gió về phía trước | 0.55s / 1.1x | $0.15\text{s}$ (Frame 5) |
| `brak_w_parry_stance` | Hai tay đan chéo trước ngực, gối khuỵu gồng mình, vầng sáng bát giác ánh đồng rực lên | 0.75s / 1.0x | Kích hoạt cửa sổ $0.0\text{s}$ |
| `brak_w_parry_counter` | Ngay khi chặn đòn, xi-lanh bung mở xả khói trắng, Brak xuất cú đấm phản kích sấm sét | 0.4s / 1.2x | $0.08\text{s}$ (Frame 3) |
| `brak_e_slam` | Giơ cao nắm đấm phải nén áp suất rồi nện thẳng xuống đất tạo sóng chấn động | 0.6s / 1.0x | $0.15\text{s}$ (Frame 5) |
| `brak_r_leap_slam` | Nhảy vút lên không trung giương cao hai nắm đấm rồi giáng búa tạ xuống đất bộc phá | 1.2s / 1.0x | $0.50\text{s}$ (Frame 15) |
| `brak_dash_d` | Dậm chân đạp đất phóng người lướt né đạn theo hướng di chuyển | 0.35s / 1.3x | Không |
| `brak_death` | Hai xi-lanh xả hết hơi rít dài, găng tay rơi thõng, Brak quỳ hai gối gục đầu xuống đất | 2.2s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Đến đây! Xem nắm đấm của ai cứng hơn!"
  - *Ban Voice:* "Kẻ sợ gãy xương thì tốt nhất nên đứng ngoài sàn đấu."
  - *Attack Voice:* "Đón lấy!", "Nhịp này!", "Thép nguội!"
  - *Parry Proc (Đón đòn thành công):* "BẮT ĐƯỢC RỒI!", "TRẢ LẠI NÀY!"
  - *Cast R (Hơi nước bộc phá):* "BỘC PHÁ HƠI NƯỚC!"
- **Sound Effects (SFX):**
  - *Hit thường:* Tiếng đấm nặng "BỘP - KENG" xen lẫn tiếng xì áp suất nhỏ.
  - *Parry kích hoạt:* Tiếng thanh kim loại đại bác va chạm "KENGGGG" chói tai kèm tiếng còi hơi xả áp cực đại.
  - *Chiêu cuối R:* Tiếng còi báo động rít giật liên hồi $\rightarrow$ Tiếng rít xé gió $\rightarrow$ Tiếng nổ long trời lở đất "OÀNH - RẦM!".
