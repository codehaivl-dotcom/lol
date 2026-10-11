# 45 · Kế hoạch: phân phối asset theo nhu cầu + mỗi map một place riêng

> **Thứ tự bước và hợp đồng chuyển place nay ở doc 48 (v2, theo audit Codex 2026-10-08).** Chỗ nào khác doc 48 thì doc 48 thắng. Mốc 41.5 MB / 21.6 MB không phải baseline.



> **Đã có review độc lập: doc 47.** Chỗ nào 47 nói SAI (mốc 41.5 MB → 21.6 MB; "6 chỗ đọc state" → ~20+; skillfx bị import tĩnh ở hero.js + camera.js + bot.js; M1 không rẻ; thiếu reconnect/enterPlace) thì 47 thắng tới khi sửa xong.

Trạng thái: **KẾ HOẠCH, chưa làm.** Lệnh của lukasai (2026-10-08 23:13): "đừng làm tất cả ngay, viết xuống plan, 1: kế hoạch database assets phân phối theo yêu cầu (ko load all), tách mọi map ra bản đồ riêng của chính nó."
Chờ creator duyệt rồi mới làm, từng bước một, mỗi bước có số đo.

## 0. Hiện trạng (đo + đọc file, 2026-10-08)

| Điều | Số / sự thật | Nguồn |
|---|---|---|
| Cả game chỉ có 1 place (`main`) | sảnh + Mạch Giữa + phòng trưng bày quái cùng 15 ô | `places/main/cells/` |
| Đài sảnh nằm **giữa map** | `lobby-hall` tại (31, 26, 31) trong ô `x0z0`, trên cột đá | `places/main/cells/x0z0.scene` |
| Thân người chơi ở sảnh đứng ở **giếng xanh** | (-65.8, 65.8) | `places/main/config.yaml` defaultSpawnPoint |
| Vào sảnh = tải cả map | 41.5 MB trước hình đầu; 5 khối hình dựng bằng code = 18.6 MB | `spawn perf --boot`, desktop người chơi |
| Gói code lúc vào | 577 KB (chuẩn 450 KB) | như trên |
| Model/clip tướng | engine chỉ tải khi một vật mang nó → trận chỉ tải tướng có trong trận | đọc code `hero.js`, `heroes.js` |
| Sổ asset | 526 dòng: name, category, declared; 86 có `hero`; **chưa có cột "dùng ở đâu"** | `assets/registry.yml` |
| Đã có | place `sanh` dựng thử (đài + điện, cùng toạ độ), **chưa ai vào, luồng chưa đổi** | `places/sanh/` |

## 1. Database asset phân phối theo nhu cầu

### 1.1 Thêm cột vào `assets/registry.yml`
Mỗi asset thêm:
- `scope`: tải ở đâu. Một trong:
  - `boot` — cần trước khi đứng (logo, khung HUD gốc). Mục tiêu: cực ít.
  - `lobby` — chỉ trong place sảnh.
  - `map:<id>` — chỉ trong place của map đó (`map:mach_giua`, `map:cuu_mach`…).
  - `hero:<id>` — đi theo tướng (thân, vũ khí, clip, âm, VFX).
  - `skill:<hero>.<slot>` — chỉ khi chiêu đó được dùng / tải trước lúc versus.
  - `ref` — ảnh tham chiếu, QA, Blender gốc: **game không bao giờ tải**.
- `bytes`: dung lượng thật (script đo, ghi tự động).
- `when`: `first-picture` | `after-stand` | `on-use` | `prefetch-versus`.

### 1.2 Luật tải (ai tải cái gì, lúc nào)
| Lúc | Tải | Không tải |
|---|---|---|
| Mở game | `boot` + place `sanh` | mọi map, mọi tướng khác tướng đang xem |
| Xem tướng ở sảnh | thân + điệu chào của **tướng đang xem** | tướng khác |
| Chọn tướng | màn chọn (import() khi vào phase) | HUD trận |
| Versus (loading) | place của map được chọn + `hero:` của **10 tướng trong roster** + clip `skill:` của họ | tướng ngoài roster, map khác |
| Trong trận | VFX/âm theo chiêu khi dùng | sảnh |
| Kết quả | quay về `sanh` (đã có sẵn) | — |

### 1.3 Công cụ
- `tools/assets/manifest.py check` thêm: thiếu `scope` = lỗi; asset `ref` mà code/scene dùng = lỗi; asset `map:A` xuất hiện trong place B = lỗi.
- `manifest.py budget`: cộng `bytes` theo scope → bảng "mỗi màn tải bao nhiêu", so với số engine đo.
- Code đọc sổ: `scripts/lib/assets.js` chỉ xuất `heroAssets(id)`, `mapAssets(id)` — danh sách địa chỉ cho prefetch lúc versus. Không import cả sổ vào gói boot (sổ sinh ra file nhỏ theo từng scope).

## 2. Mỗi map một place riêng

### 2.1 Cấu trúc đích
```
places/sanh/        sảnh: Điện Vinh Danh + đài (không có map)
places/mach_giua/   Mạch Giữa 1 đường (1v1/3v3) = phần battle của main hiện nay
places/<map mới>/   3v3, 5v5 3 đường… mỗi cái một thư mục: config, cells, sim.js
scripts/lib/data/maps/<id>.yml   số liệu map (trụ, đường, nhà chính) — map.js chọn theo id
```
- `places/<map>/sim.js` = trọng tài **trận** của map đó (bot, nhà chính vỡ, vòng, đợt lính).
- `sim.js` gốc = trọng tài **phòng** (sảnh, đội, chọn tướng, roster, kết quả), state ở `world.state`.
- Đọc state chỉ qua `scripts/lib/session.js` (đã thiết kế cho việc này).

### 2.2 Luồng người chơi
sảnh (`sanh`) → chọn tướng → versus: trọng tài đưa người trong roster sang place của map → trận → kết quả: về `sanh`. Reload giữa trận: vào `sanh`, trọng tài thấy còn trong roster → đưa lại map.

### 2.3 Các bước (mỗi bước xong mới sang bước sau; sau mỗi bước game vẫn chơi được)
| # | Việc | Xong khi (đo được) |
|---|---|---|
| A1 | Thêm `scope/bytes/when` cho 526 asset; `check` bắt lỗi | check = 0 lỗi; bảng budget theo scope |
| A2 | Gỡ khỏi scene mọi asset `ref` / trưng bày không dùng trong trận (phòng trưng bày quái x0z1) | boot main đo lại |
| M1 | Session: lobby/match/results sang `world.state`; mọi chỗ đọc qua session.js (còn 6 chỗ đọc thẳng: hero.js ×2, bot.js, ui.js, camera.js, shell.js) | grep = 0; chơi Sân Tập 1 vòng như cũ |
| M2 | Trọng tài phòng lên `sim.js` gốc; trọng tài trận ở place map | chơi Sân Tập 1 vòng như cũ |
| M3 | Vào game = `sanh`; đưa qua lại sảnh ↔ map | sảnh boot đo: mục tiêu < 5 MB trước hình đầu (hiện 41.5 MB) |
| M4 | Đổi tên place `main` → `mach_giua`, bỏ đài sảnh khỏi map | boot map đo lại |
| A3 | Versus tải trước tài sản roster (`heroAssets`) | skill đầu tiên không khựng; đọc boot trận |
| M5 | Khung cho map mới: copy thư mục mẫu + `maps/<id>.yml`, không đụng code trọng tài | thêm map thử rỗng chạy được |

### 2.4 Rủi ro đã biết
- Id vật thể là duy nhất toàn world → bản sảnh dùng tiền tố `sanh-`.
- Đưa người giữa place: thân + `player.state` đi theo; cần thử reload/mất mạng 60 s (luật Sân Tập).
- Trọng tài phòng chạy ở cấp world; bot phải spawn trong place map (do sim.js của map làm).
- Không đo trong lúc đang sửa (luật đo).

## 3. Chưa quyết (cần creator)
1. Phòng trưng bày quái (x0z1) có còn cần trong game không, hay chỉ là chỗ xem mẫu → chuyển sang place `gallery` chỉ editor vào?
2. Sảnh có cần nhìn ra thung lũng (địa hình làm nền) hay nền trời/biển mây là đủ? (bản thử đang là biển mây)
