# 08 · Asset Production — #47 Cổ Lỗ (Huyền Quy Thần Cơ Sư)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#47 / co_lo`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `turtle_fortress_artificer` (Thần cơ sư cõng mai rùa đồng cơ khí, tay tích hợp nỏ liên châu) | Khối mai rùa bán cầu bảo vệ lưng, 4 chân cơ khí bung đất khi cắm chốt. |
| **Chiều cao Battle Form** | Đỉnh đầu nhân vật: `2.00m` \| Đỉnh gù mai rùa: `2.20m` | Gọn gàng dưới góc nhìn isometric, không cản camera. |
| **Bán kính Capsule va chạm Di Động** | `0.65m` | Hitbox chuẩn xạ thủ khi di chuyển bình thường. |
| **Bán kính Chân Đế khi Cắm Chốt** | `0.85m` (Vòng sáng chân neo) | Hitbox mở rộng nhẹ để cản lướt cận chiến. |
| **Chiều cao Capsule (Height)** | `2.00m` | Khối va chạm chọn mục tiêu và đạn đạo. |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 17,000$ Triangles | Bao gồm nhân vật, mai rùa cơ khí 4 chân và nỏ liên châu. |
| **Hệ thống LOD** | LOD0: $17.0\text{k}$ tris \| LOD1: $9.5\text{k}$ tris \| LOD2: $4.0\text{k}$ tris | Giảm tải trong combat 5v5 đông tướng. |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture $2048 \times 2048$ cho nhân vật + mai rùa; $1024 \times 1024$ cho nỏ. |

---

## 2. Kế Hoạch Sockets & Điểm Gắn Kết (Sockets Plan)

- **Hệ thống Socket gắn kết mô hình Cổ Lỗ:**
  - `socket_crossbow_arm_r`: Cánh tay phải tích hợp nỏ Liên Châu cơ khí 3 nòng.
  - `socket_crossbow_muzzle_1`, `socket_crossbow_muzzle_2`, `socket_crossbow_muzzle_3`: 3 đầu nòng nỏ phóng tên đánh thường và Q.
  - `socket_crossbow_heavy_slot`: Khay nạp đạn trung tâm để nạp tên cọc đẩy lùi chiêu E.
  - `socket_shell_leg_fl`, `socket_shell_leg_fr`, `socket_shell_leg_bl`, `socket_shell_leg_br`: 4 chân cơ khí bung ra từ mai rùa cắm xuống sàn khi bật W.
  - `socket_ground_anchor`: Điểm neo sàn dưới chân, phát vòng sáng hoa văn thành ốc Tinh Thạch khi cắm chốt.
  - `socket_blindspot_ring`: Neo vòng tròn đỏ cảnh báo Vùng Mù Cận Chiến $2.5\text{m}$.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Phong thái cơ khí tinh xảo, độ giật phản lực của nỏ đanh thép, động tác cắm chân mai rùa dứt khoát kiên cố.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `co_lo_idle_mobile` | Đứng hơi khom người, tay nỏ hạ thấp, bánh răng quay nhẹ nhịp nhàng | 2.5s loop | Không |
| `co_lo_walk` | Bước đi vững chãi mang sức nặng mai rùa, nòng nỏ hướng về phía trước | 0.9s loop | Không |
| `co_lo_attack_mobile` | Nâng nỏ ngang ngực, siết cò bắn 1 mũi tên đồng xuyên phá | 0.55s / 1.0x | $0.15\text{s}$ (Frame 5) |
| `co_lo_w_deploy` | Bốn chân cơ khí bung ra cắm phập xuống đất, nòng nỏ vươn dài chuyển dạng | 0.6s / 1.0x | Hoàn tất $0.60\text{s}$ |
| `co_lo_idle_siege` | Ở thế cắm chốt: Chân cơ khí neo đất, nòng nỏ hơi nâng cao, mắt dõi theo tầm xa | 2.0s loop | Không |
| `co_lo_attack_siege` | Bắn nỏ pháo binh tầm xa, độ giật phản lực giật lùi nhẹ lên mai rùa | 0.5s / 1.1x | $0.14\text{s}$ (Frame 4) |
| `co_lo_w_undeploy` | Bốn chân cơ khí bật ngược thu vào mai rùa, Cổ Lỗ đứng thẳng trở lại thế chạy | 0.4s / 1.2x | Hoàn tất $0.40\text{s}$ |
| `co_lo_q_burst` | Ba nòng nỏ bắn liên hoàn 3 mũi tên liên tiếp cực nhanh | 0.55s / 1.1x | $0.15\text{s}$ (Frame 5) |
| `co_lo_e_knockback` | Nạp tên cọc hạng nặng, bắn phản lực đẩy lùi mục tiêu cận chiến | 0.45s / 1.2x | $0.10\text{s}$ (Frame 3) |
| `co_lo_r_barrage` | Nâng nòng nỏ 75 độ lên trời -> Bánh răng quay rít -> Khai hỏa bão tiễn liên châu | 1.1s / 1.0x | $0.30\text{s}$ (Frame 9) |
| `co_lo_dash_d` | Chốt cơ khí bung gãy, Cổ Lỗ lộn một vòng lướt né $4.5\text{m}$ về sau | 0.35s / 1.3x | Không |
| `co_lo_death` | Mai rùa sập gãy bánh răng tóe tia lửa, nỏ tuột khỏi tay, chàng gục xuống cạnh mai | 2.6s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Thành Cổ Loa chín vòng kiên cố, nỏ thần định đoạt non sông!"
  - *Ban Voice:* "Kẻ không có chí bền sao hiểu được sức mạnh của cỗ máy trường tồn?"
  - *Siege Voice:* "CẮM CHỐT!", "Pháo đài dựng mở!", "Vạn tiễn sẵn sàng!"
  - *Ultimate Voice:* "VẠN TIỄN QUY TÔNG — BÃO SAO BĂNG RỰC SÁNG!"
- **Sound Effects (SFX):**
  - Tiếng chân cơ khí cắm phập xuống đất đá vang dội ("PHẬP - KENG").
  - Tiếng bánh răng Tinh Thạch quay tít đanh gọn và tiếng cò nỏ nảy liên thanh.
  - Tiếng tên xé toạc không khí và tiếng vạn mũi tên dội ầm ầm như sấm rền từ trên trời.
