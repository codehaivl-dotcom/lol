# 08 · Asset Production — #15 Aero (Phi Công Cổ Khí)

**Trạng thái:** `ASSET_SPEC_APPROVED / HOLD_FOR_GATE_4`  
**Khóa định danh:** `#15 / aero`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 28 (Workflow Animation)](../28-workflow-animation-skill.md) & [Tài liệu 25 (Động tác theo tướng)](../25-dong-tac-theo-tuong.md)

---

## 1. Thông Số Hình Thể & Capsule Nhân Vật (Model Specs & Capsule)

| Thông số kỹ thuật | Giá trị quy định | Ghi chú kỹ thuật |
|---|---|---|
| **Loại hình thể (Body Plan)** | `aerial_vehicle_pilot` (Phi cơ cổ khí cánh kép lơ lửng) | Thân phi cơ lơ lửng cách đất $0.5\text{m}$; phi công ngồi buồng lái |
| **Kích thước Battle Form** | Sải cánh: `2.2m` \| Chiều dài thân: `2.5m` \| Chiều cao: `1.4m` | Silhouette cánh máy bay ngang rõ rệt dưới góc nhìn MOBA |
| **Bán kính Capsule va chạm (Radius)** | `0.65m` | Bao trùm thân máy bay và buồng lái phi công |
| **Chiều cao Capsule (Height)** | `1.5m` | Dùng cho va chạm đạn đạo và raycast chọn mục tiêu |
| **Giới hạn lưới đa giác (Polygon Count)** | $\le 13,500$ Triangles | Khung máy bay đồng thau, cánh kép, tua-bin và phi công |
| **Hệ thống LOD** | LOD0: $13.5\text{k}$ tris \| LOD1: $8.0\text{k}$ tris \| LOD2: $3.0\text{k}$ tris | Giảm tải khi nhiều hiệu ứng bom nổ và vệt thảm plasma |
| **Vật liệu & Texture (Material)** | PBR (Albedo, Normal, Metallic-Roughness, Emissive) | Texture size: $2048 \times 2048$ cho phi cơ; $1024 \times 1024$ cho phi công & súng |

---

## 2. Kế Hoạch Vũ Khí & Socket Điểm Cầm (Weapon & Grips Plan)

- **Vũ khí độc bản — Súng Đôi Plasma Cổ Linh (`dual_plasma_cannons`):**
  - Cấu tạo: Hai nòng súng đúc bằng đồng thau Cổ Linh gắn cố định hai bên sườn phi cơ; nòng súng có cuộn cảm plasma phát quang.
  - Gắn trực tiếp vào socket: `socket_cannon_mount_r` và `socket_cannon_mount_l`.
  - **Tuyệt đối không cầm súng ngắn hay súng trường trên tay phi công.**
- **Hệ thống Socket phụ trợ & Xả bom:**
  - `socket_bomb_bay_belly`: Khoang bụng xả bom chùm của chiêu Q và chiêu R.
  - `socket_engine_exhaust`: Ống xả phản lực đuôi phát lửa plasma tăng tốc.
  - `socket_propeller_core`: Trục tua-bin năng lượng phía mũi xoay tít liên tục.
  - `socket_flare_launcher`: Ống phóng pháo sáng của chiêu E dưới mũi máy bay.

---

## 3. Danh Mục Hoạt Ảnh Clip Animation (Animation Clips Manifest)

*Tuân thủ Doc 28/25: Dáng bay lơ lửng dập dờn tự nhiên của cỗ phi cơ cơ khí; thân máy bay nghiêng cánh mượt mà khi đổi hướng; không có hoạt ảnh chân bước đi bộ.*

| Tên Clip (Clip ID) | Hành động diễn hoạt | Thời lượng / Tốc độ | Khung hình HIT / Trúng đòn |
|---|---|---|---|
| `aero_idle` | Phi cơ bập bềnh lơ lửng cách mặt đất $0.5\text{m}$, tua-bin xoay tít, phi công khẽ gật đầu quan sát | 2.0s loop | Không |
| `aero_walk` | Lướt bay chậm rãi trên mặt đất, ống xả phả luồng khói xanh lam nhẹ | 0.8s loop | Không |
| `aero_run` | Bay lượn tốc độ cao, thân phi cơ chúi nhẹ tới trước, cánh nghiêng theo góc rẽ | 0.55s loop | Không |
| `aero_basic_shot_a` | Nòng súng phải giật nảy bắn viên đạn plasma thứ nhất | 0.45s / 1.1x | $0.11\text{s}$ (Frame 3) |
| `aero_basic_shot_b` | Nòng súng trái giật nảy bắn viên đạn plasma thứ hai | 0.45s / 1.1x | $0.11\text{s}$ (Frame 3) |
| `aero_q_strafe_run` | Phóng vút $7.5\text{m}$ tới trước xả chuỗi bom plasma dọc đường bay | 0.4s / 1.2x | $0.15\text{s}$ (Frame 4) |
| `aero_w_afterburner` | Phụt lửa tua-bin đuôi, phi cơ bẻ cánh lượn vòng né tránh nhận khiên | 0.4s / 1.0x | Kích hoạt tức thì $0.0\text{s}$ |
| `aero_e_recoil_flare` | Bắn chùm pháo sáng phía trước, phản lực đẩy giật lùi $4.5\text{m}$ về sau | 0.4s / 1.2x | $0.12\text{s}$ (Frame 3) |
| `aero_r_bombard` | Bốc đầu cất cánh bay cao, xả thảm bão bom plasma tầm xa $10.0\text{m}$ rồi lượn về | 1.2s / 1.0x | $0.55\text{s}$ (Frame 16) |
| `aero_dash_d` | Ngoặt cánh gấp $4.5\text{m}$ né đòn thần tốc | 0.35s / 1.4x | Không |
| `aero_death` | Động cơ bốc khói đen, phi cơ xoay tít rồi đâm sầm xuống đất nổ tung thành tro bụi đồng thau | 2.2s | Không |

---

## 4. Danh Mục Âm Thanh & Lời Thoại Dự Kiến (SFX & VO Manifest Draft)

- **Voice Over (VO) (Giọng phi công tự tin, hào sảng và đam mê tốc độ):**
  - *Pick Voice:* "Bầu trời này là của ta — Hãy dọn sạch đường băng!"
  - *Ban Voice:* "Hạ cánh khẩn cấp sao? Không vui chút nào..."
  - *Skill Q Voice:* "THẢ THẢM BOM!", "CHIA CẮT ĐỘI HÌNH!"
  - *Ultimate R Voice:* "ĐẠI OANH TẠC CHIẾN DỊCH — MỞ KHOANG BOM TỐI THƯỢNG!"
- **Sound Effects (SFX):**
  - Tiếng động cơ tua-bin cổ khí vo vo êm ái khi bay lượn thường trực.
  - Tiếng "PÍU - TÁCH" súng plasma hai nòng nã đạn nhịp nhàng.
  - Tiếng chuỗi bom plasma nổ liên hoàn "BÙM - BÙM - BÙM" dọc đường bay Q.
  - Tiếng còi báo động không kích vang rền của chiêu cuối R.
