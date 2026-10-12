# 08 · Asset Production — #32 Kora (Hải Mẫu Cổ Giáp)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#32 / kora`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `crustacean_heavy_sluice` (Giáp xác cua cổ đại khổng lồ) | Trọng tâm cực thấp; thân mai dẹp bè ngang |
| **Bề ngang / Chiều cao Battle Form** | Bề ngang: `2.4m` \| Chiều cao đỉnh mai: `1.5m` | Tối ưu hóa độ rộng che chắn đạn đạo dưới camera MOBA |
| **Bán kính Capsule va chạm (Radius)** | `0.85m` (Capsule rộng đặc thù) | Đảm bảo diện tích bao phủ che chắn cho xạ thủ sau lưng |
| **Chiều cao Capsule (Height)** | `1.6m` | Dùng cho va chạm đạn đạo và raycast chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 14,000$ Triangles | Thân mai đá gồ ghề, đôi càng thép dày và 6 chân cơ khí |
| **Hệ thống LOD** | LOD0: $14.0\text{k}$ tris \| LOD1: $8.5\text{k}$ tris \| LOD2: $3.2\text{k}$ tris | Duy trì khung hình ổn định khi bật nhiều hiệu ứng nước |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ thân mai; $2048 \times 2048$ đôi càng thép |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Vũ khí độc bản — Đôi Càng Thép Cửa Đập (`sluice_gate_claws`):**
  - Cấu tạo: Đúc bằng hợp kim đồng thau Cổ Linh kết hợp bản lề pít-tông thủy lực; mặt ngoài phẳng có rãnh thoát nước, mặt trong có răng cưa nghiền nát; dài $1.6\text{m}$, rộng $0.9\text{m}$ mỗi càng.
  - Gắn trực tiếp vào socket: `socket_claw_arm_r` (khớp càng phải) và `socket_claw_arm_l` (khớp càng trái).
  - **Tuyệt đối không có socket cầm vũ khí rời như khiên hay kiếm sau lưng.**
- **Hệ thống Socket phụ trợ & Điểm xả áp:**
  - `socket_exhaust_vent_r` / `socket_exhaust_vent_l`: Ống xả áp suất thủy lực trên mai phát hiệu ứng hơi nước trắng.
  - `socket_shield_anchor`: Điểm neo giữa hai càng khi khép lại để bung màng chắn nước W.
  - `socket_slam_impact`: Điểm tiếp xúc giữa 2 ngọn càng và mặt đất khi thi triển chiêu cuối R.
  - `socket_eye_sensor`: Đôi mắt ốc cơ khí rực sáng xanh lam trên đầu mai.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Dáng di chuyển bò ngang 6 chân cơ khí giáp xác, chuyển động nhịp nhàng dứt khoát như cỗ máy công thành; không dùng dáng chạy thẳng hai chân.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `kora_idle` | 6 chân bám đất vững chãi, hai càng khẽ mở đóng nhịp nhàng, ống xả áp xì nhẹ hơi nước | 2.5s loop | Không |
| `kora_walk` | Bò ngang chậm rãi, 6 chân luân phiên nhấc hạ dứt khoát cắm sâu vào mặt đất | 1.0s loop | Không |
| `kora_run` | Bò xéo cơ khí tốc độ cao, thân mai hạ sát sàn đấu, bụi đất tung nhẹ dưới chân | 0.75s loop | Không |
| `kora_basic_clamp_a` | Càng phải vươn tới kẹp mạnh vào con mồi gây tiếng va đập kim loại đanh thép | 0.5s / 1.0x | $0.15\text{s}$ (Frame 5) |
| `kora_basic_clamp_b` | Càng trái kẹp ngang từ sườn vào, pít-tông giật lùi tạo lực phản chấn | 0.5s / 1.0x | $0.16\text{s}$ (Frame 5) |
| `kora_q_crush` | Càng trái mở toang ngạc thép rồi kẹp nghiến cực mạnh làm choáng mục tiêu | 0.45s / 1.1x | $0.15\text{s}$ (Frame 5) |
| `kora_w_brace` | Khép hai càng tạo hình chữ V chắn trước ngực, 6 chân choãi rộng bám đất thủ vững | 0.4s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `kora_w_guard_walk` | Bò ngang trong thế giương càng thủ, bước đi chậm hơn $20\%$, ống xả áp phun liên tục | 1.2s loop | Không |
| `kora_e_charge` | Thu chân gồng mình phóng ủi thẳng $5.5\text{m}$ về phía trước rẽ sóng hất dạt địch | 0.45s / 1.2x | $0.20\text{s}$ (Frame 7) |
| `kora_r_slam` | Nhấc bổng 2 càng lên cao, gồng áp suất tối đa rồi nện sập sàn tạo địa chấn sóng thần | 1.2s / 1.0x | $0.50\text{s}$ (Frame 15) |
| `kora_dash_d` | Trượt dạt ngang nhanh $4.0\text{m}$ né đòn hoặc đổi góc chắn đạn | 0.35s / 1.3x | Không |
| `kora_death` | Các van áp suất nổ bung khói trắng, 6 chân gãy gập, thân mai sập xuống đất, hai càng mở toang bất động | 2.2s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO) (Giọng cơ khí âm hưởng thủy triều trầm đục):**
  - *Pick Voice:* "Bờ đập kiên cố — Không một luồng tên đạn nào được phép vượt qua!"
  - *Ban Voice:* "Thủy triều rút đi... nhưng bờ đập vẫn sừng sững."
  - *Skill W Voice:* "KHÉP CỬA ĐẬP!", "VỮNG NHƯ BÀN THẠCH!"
  - *Ultimate R Voice:* "HẢI TRẤN THẦN UY — SÓNG THẦN NÉN ÉP!"
- **Sound Effects (SFX):**
  - Tiếng 6 chân giáp xác cắm xuống mặt sàn đất đá "CỘP - CỘP - CỘP".
  - Tiếng xì hơi nước áp suất cao "XÈÈÈ..." kéo dài khi giương khiên W.
  - Tiếng "BOONG" kim loại vang dội khi đạn đạo của đối phương va vào càng trước.
  - Tiếng nổ địa chấn "ẦM ĐÙNG" cực nặng và tiếng sóng biển cuộn trào của chiêu cuối R.
