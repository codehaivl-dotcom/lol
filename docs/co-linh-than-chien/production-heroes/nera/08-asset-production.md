# 08 · Asset Production — #07 Nera (Dạ Neo)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#07 / nera`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `hunter_agile_female` (Nữ thợ săn cơ động nhanh nhẹn) | Dáng người thanh thoát, áo choàng bay phất phơ, cẳng tay phải mang cụm nỏ tời |
| **Chiều cao đỉnh đầu (Height)** | `1.72m` | Chiều cao chuẩn cho nhân vật nữ loài người |
| **Bán kính Capsule va chạm (Radius)** | `0.40m` | Capsule hẹp chuẩn cho Xạ thủ cơ động, né đạn đạo tốt |
| **Chiều cao Capsule (Height)** | `1.72m` | Dùng cho va chạm hitbox và chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 12,000$ Triangles | Tối ưu hóa cho combat 5v5 60 FPS trên thiết bị di động |
| **Hệ thống LOD** | LOD0: $12.0\text{k}$ tris \| LOD1: $7.0\text{k}$ tris \| LOD2: $3.0\text{k}$ tris | Giảm tải mượt mà ở khoảng cách xa |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho thân và áo choàng; $1024 \times 1024$ cho nỏ tời |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Tên vũ khí:** Nỏ Tời Cơ Khí Dạ Neo (`anchor_winch_crossbow`).
- **Cấu tạo:** Cụm nỏ bắn đạn cơ khí bằng đồng đen và đá dạ quang gắn cố định trên cẳng tay phải; bên dưới tích hợp cuộn tời cáp thép và cơ chế phóng mỏ neo ba ngạnh.
- **Socket gắn vũ khí (Grip Sockets):**
  - `socket_winch_crossbow_r`: Gắn cố định vào cẳng tay phải (`arm_lower_r`).
  - `socket_cable_spool_back`: Gắn cuộn cáp dự phòng sau lưng (`spine_upper`).
  - `socket_quiver_hip_l`: Hộp đựng đạn cơ khí bên hông trái (`hip_l`).
  - `socket_muzzle_front`: Điểm xuất phát đạn đạo và mỏ neo ở đầu nòng nỏ.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ nguyên tắc Doc 28: Động tác toàn thân, hông lắc chuyển trọng tâm khi bắn lùi, áo choàng bay theo quán tính vật lý; cấm đẩy trượt mô hình cứng nhắc.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Ra đòn |
|---|---|---|---|
| `nera_idle` | Đứng thế chân trước chân sau, nỏ hạ thấp ngang hông, áo choàng bay nhẹ theo gió, cuộn tời quay chậm | 2.0s loop | Không |
| `nera_run_forward` | Bước chạy thoăn thoắt kiểu thợ săn, nỏ hướng chếch về phía trước, tà áo choàng bay về sau | 0.8s loop | Không |
| `nera_run_backward_kite` | Bước chạy lùi vừa đi lùi vừa giữ nỏ hướng vào đối thủ (Kiting Step), trọng tâm nghiêng đón lực | 0.8s loop | Không |
| `nera_shoot_basic` | Nhấc nỏ ngắm nhanh, bóp cò phóng mũi tên cơ khí, nỏ giật nhẹ nảy lên, cuộn tời xả sợi cước sáng | 0.45s / 1.1x | $0.10\text{s}$ (Frame 3) |
| `nera_q_pierce_shot` | Giương nỏ ngang mắt, nạp mũi tên năng lượng xanh lam lớn phóng vút đi xé gió | 0.5s / 1.0x | $0.12\text{s}$ (Frame 4) |
| `nera_w_recoil_hook` | Bắn mỏ neo ra trước đồng thời thân người bị lực phản hồi đẩy lướt bay lùi lại 4.5m trên không | 0.45s / 1.2x | $0.10\text{s}$ (Frame 3) |
| `nera_e_trap_throw` | Vung tay trái ném bọc lưới cơ khí ra điểm chỉ định, chạm đất bung cọc neo | 0.5s / 1.0x | $0.15\text{s}$ (Frame 5) |
| `nera_r_mega_anchor` | Khuỵu gối gồng ngắm nỏ mở rộng, phóng mỏ neo khổng lồ 12m rồi ghì chân kéo căng cuộn tời | 1.3s / 1.0x | $0.25\text{s}$ (Frame 8) |
| `nera_dash_d` | Nhào lộn nhanh nhẹn né đạn theo hướng di chuyển, tiếp đất trong tư thế sẵn sàng bắn | 0.35s / 1.3x | Không |
| `nera_death` | Nỏ rơi khỏi tay, Nera buông lỏng hai tay ngã gục xuống theo tà áo choàng trải rộng | 2.0s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO):**
  - *Pick Voice:* "Biển đêm đầy cạm bẫy... và ta là người giữ mỏ neo."
  - *Ban Voice:* "Ngươi trôi dạt quá xa bờ rồi đấy."
  - *Attack Voice:* "Ghim chặt!", "Một phát!", "Đừng hòng áp sát!"
  - *Cast W (Lướt lùi tự cứu):* "GIẬT TỜI!", "QUÁ GẦN RỒI ĐẤY!"
  - *Cast R (Chiêu cuối):* "ĐẠI CỰC NEO... KHÓA MỤC TIÊU!"
- **Sound Effects (SFX):**
  - *Bắn thường:* Tiếng "TÁCH" cơ khí khi nhả cò $\rightarrow$ Tiếng "XOẸT" xé gió $\rightarrow$ Tiếng "PHẬP" ghim đạn.
  - *Phóng tời W:* Tiếng xích rít căng "RÀO RÀO" kèm tiếng phản lực đẩy lùi "BÙM" thanh thoát.
  - *Chiêu cuối R:* Tiếng cót tời rít lên như còi bão $\rightarrow$ Tiếng đạn đại bác phóng "OÀNH - ROẸT" $\rightarrow$ Tiếng móc neo cắm sâu "KENG" $\rightarrow$ Tiếng tời giật kim loại chói tai.
