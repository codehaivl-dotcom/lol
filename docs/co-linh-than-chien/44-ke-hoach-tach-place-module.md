# 44 · Kế hoạch tách Place + Module (Sảnh / Map / Dev)

Ngày: 2026-10-08 · Trạng thái: **KẾ HOẠCH, chưa sửa code.** Chờ lukasai duyệt.
Yêu cầu: "lobby/match/hero/game map 1  3 5 tách riêng hết" · "lập kế hoạch tách … tách layer và module. Vì sao. sau này có thêm map 3v3 5v5 nữa. Nếu gom chung vào 1 file. Load vô nghĩa".
Nền: doc 43 (nguyên lý: sảnh nhẹ, trận nặng, tải tách nhau), doc 40 (tầng UI), doc 42 (manifest).

## 1. Hiện trạng (đọc trong world)

| Thứ | Ở đâu | Vấn đề |
|---|---|---|
| Sảnh (Đài Hồi Tưởng, Điện Vinh Danh hall.js, đuốc) | place `main`, cell x0z0, cạnh vách trên Mạch Giữa (`lobby-stage.js` STAGE 31,26,31) | người mở game tải luôn chiến trường |
| Chiến trường Mạch Giữa (lane, trụ, cầu, vách, thác) | `main`, 15 cell | đúng chỗ, nhưng không có ranh giới với sảnh |
| Phòng trưng quái (11 model mu-*), art-wall/karst thử | `main` cell x0z1 | dev gallery tải cho mọi người chơi |
| Referee sảnh + trận | `places/main/sim.js` (293 dòng) một file | phòng/chọn tướng/trận/kết quả/bot dính nhau |
| Dữ liệu map | `scripts/lib/data/map.yml` import cứng ở 8 file (hero, bot, lane, combat, ui, hud-std, lobby-ui, terrain) | thêm map thứ 2 = sửa 8 file |
| Trạng thái | `place.state.lobby` + `place.state.match` cùng một place | không tách được khi map ở place khác |

## 2. Đích: 5 khối tách riêng

```
SẢNH   place `sanh`          mở game vào đây; phòng, chọn tướng, kết quả. Không lính/trụ/địa hình trận
TRẬN   module `scripts/match/`  luật trận chung (bắt đầu, thắng thua, kết quả, reconnect), không biết map nào
TƯỚNG  thư mục `heroes/<id>/`   mỗi tướng một gói: kit, thân, vũ khí, clip, âm, VFX; thêm tướng = thêm thư mục
MAP    mỗi map một place:
         `map-1v1`  (Mạch Giữa bản 1v1)
         `map-3v3`  (Mạch Giữa bản 3v3)
         `map-5v5`  (Cửu Mạch ba đường, sau này)
DEV    place `dev-gallery`   phòng trưng quái, model thử; chỉ editor
```

Engine Spawn stream theo place: người chơi chỉ tải place đang đứng. Người chơi 1v1 không bao giờ tải 3v3/5v5.

**Ghi chú USER LOCK:** Mạch Giữa hiện là map một đường cho cả 1v1 và 3v3. Tách thành 2 place nghĩa là 2 bản riêng (có thể khác cỡ, số trụ, bụi) dùng chung bộ kit dựng hình. Bản 3v3 lúc đầu chép từ 1v1 rồi chỉnh theo hội đồng; không tự đổi luật gameplay.

## 3. Module: ai sở hữu gì

| Khối | File (sau tách) | Chạy ở | Sở hữu |
|---|---|---|---|
| Sảnh | `places/sanh/sim.js` → `scripts/lobby/referee.js`; UI `scripts/lobby/ui.js` (từ lobby-ui.js); `scripts/lobby/stage.js` | sanh | joinOrder, host, đội, mode, chọn tướng, ack/lỗi lệnh |
| Phiên (cầu nối) | `world.state.session` | mọi place | matchId, mode, map place, roster, phase, results, hạn reconnect 60 s |
| Trận | `scripts/match/referee.js` (bắt đầu/kết thúc/thắng/thua/kết quả), `scripts/match/hud.js` (HUD trận, doc 40) | place map gọi | luật chung, không chứa tọa độ |
| Map | `places/map-1v1/` (config, cells, sim.js 5 dòng gọi match/referee), `scripts/lib/data/maps/map-1v1.yml` (lane, trụ, nhà chính, bụi, spawn, minimap) | place map | hình học + địa hình riêng; `scripts/lib/map.js` `mapOf(ctx)` trả data theo place |
| Đường/lính/trụ | `scripts/lane.js` (giữ), đọc `mapOf(ctx)` | place map | wave, minion, tower |
| Tướng | `heroes/<id>/kit.yml` (chỉ số, chiêu), `body.yml` (model, chiều cao, động tác sảnh), `weapon.yml`, `clips.yml`, `sfx.yml`, `fx.js`; `scripts/hero/registry.js` gom lại | mọi nơi đọc | thay cho heroes.yml + BODY trong lobby-stage + skill-clips + hero-sfx + weapons + phần per-hero của skillfx |
| Thân người chơi | `scripts/hero.js` tách: `hero/core.js` (stats, kinh tế, combat), `hero/input.js` (lệnh, ray), `hero/presence.js` (lobbyReq, beat, locale) | presence ở sảnh; core+input chỉ ở map |
| Bot | `scripts/bot.js` (giữ), đọc `heroes/<id>` + `mapOf(ctx)` | place map | như cũ |
| Mode | `scripts/lib/data/modes.yml`: `{ id, teamSize, place, bots }` | sảnh đọc | 1v1/3v3/5v5/Sân Tập là dòng data |
| UI gốc | `ui.js` chỉ chọn layer theo `player.place`: sảnh → lobby/ui, map → match/hud | — | doc 40 |

Luật mở rộng:
- **Map mới** = 1 place + 1 file `maps/<id>.yml` + 1 dòng `modes.yml`. Không sửa trận/tướng/sảnh.
- **Tướng mới** = 1 thư mục `heroes/<id>/`. Không sửa map/trận/sảnh.
- **Mode mới** = 1 dòng `modes.yml`.

## 4. Luồng sau tách

1. Mở game → `defaultSpawnPoint` ở `sanh`. Chỉ tải sảnh.
2. Phòng/chọn tướng như hiện nay, referee ở `places/sanh/sim.js`, ghi `world.state.session`.
3. Hết giờ chọn → phase `loading` → referee `cross()` từng người trong roster sang place của mode (`modes.yml` → `map-1v1` / `map-3v3` / `map-5v5`). Trong 3 s chọn tướng/loading, engine stream map; không màn chặn.
4. Map sim đọc `session.roster`, dựng trận (lane.js, bot). Người tới muộn/reconnect: `policy.admits` của map chỉ nhận người có trong roster đang chạy.
5. Hết trận → map sim ghi kết quả vào `session.results`, `cross()` mọi người về `sanh`; sảnh hiện kết quả.
6. Sân Tập / Đấu Máy (solo): luật giữ 60 s của host vẫn ở `session`, đọc được ở cả hai place.

`player.state` đi theo khi cross (engine); tiến trình trong trận vẫn lưu theo matchId như hiện nay.

## 5. Thứ tự làm (mỗi bước chạy được, đo trước/sau, một version riêng)

| Bước | Việc | Rủi ro | Đo |
|---|---|---|---|
| S0 | Đo nền `spawn perf --boot` trên máy người chơi, 2 lần cùng bản | 0 | MB tới hình đầu tiên |
| S1 | Phòng trưng quái x0z1 → place `dev-gallery` | thấp | boot giảm |
| S2 | **Tướng**: gom data từng tướng vào `heroes/<id>/`, `hero/registry.js`; code đọc qua registry | thấp, hành vi y cũ | 6 tướng chơi như cũ |
| S3 | **Map data**: `map.yml` → `maps/map-1v1.yml` + `lib/map.js`; 8 file đổi import | thấp | trận y cũ |
| S4 | **Phiên + trận**: `place.state.lobby/match` → `world.state.session`; sim tách `lobby/referee` + `match/referee`, vẫn cùng place | trung bình | sảnh→trận→kết quả→sảnh, solo 60 s |
| S5 | **Tách place**: dựng `sanh` (object tag `lobby`), `main` → `map-1v1`; cross() vào/ra | cao nhất | boot sảnh; giây vào trận; giây về sảnh |
| S6 | `map-3v3` = bản sao 1v1 + `modes.yml` trỏ vào; chỉnh theo hội đồng | thấp | trận 3v3 chạy, 1v1 không tải nó |
| S7 | `hero.js` tách core/input/presence; `ui.js` chọn layer theo place | trung bình | không lỗi khi chuyển place |
| S8 | Đo trận 1, 2, 5 liên tiếp (doc 43 P8) | 0 | bộ nhớ, thời gian về sảnh |
| sau | `map-5v5` Cửu Mạch theo doc 27, cùng khuôn | — | — |

Không đổi luật gameplay (USER LOCK).

## 6. Không làm
- Không màn loading chặn (luật engine): vào trận dùng 3 s loading sẵn có làm thời gian stream.
- Không gom map 5v5 vào place của Mạch Giữa.
- Không chép giao diện/asset của Liên Quân/LoL.

## 7. Cần lukasai chốt
1. Duyệt 5 khối **sảnh / trận / tướng / map-1v1·3v3·5v5 / dev** và thứ tự S0→S8?
2. Sảnh đứng riêng, không còn nhìn xuống Mạch Giữa: phông nền **cảnh vẽ nhẹ** (đề xuất) hay dựng một mẩu vách nhỏ?
3. Phòng trưng quái: place dev chỉ editor (đề xuất), hay xóa hẳn?

## 8. Audit kiểu studio (2026-10-08, trước khi làm)

Cách studio kiểm một kế hoạch tách kiến trúc: (1) đếm phụ thuộc thật trong code, (2) dựng **giao diện trước, dời dữ liệu sau**, (3) **spike** phần chưa từng chạy trước khi cam kết, (4) mỗi bước có hồi quy + đường lùi, (5) đo trước/sau trên máy người chơi.

### 8.1 Phụ thuộc đo được (grep, không phải ước)

| Chỗ dính | File | Số chỗ |
|---|---|---|
| Đọc `place.state` lobby/match | hero 9, ui 8, sim 6, g2log 6, bot 5, lobby-ui 5, lane 4, hud-std 3, lobby-stage 3, camera 1 | ~50 / 10 file |
| Đọc `MAP.*` | lobby-ui 9, ui 8, hero 6, lane 6, bot 5, combat/hud-std 1 | ~36 / 7 file |
| Mã riêng từng tướng | **skillfx.js 36**, lobby-stage 8, tooltip 3, ui 1, sim 1 | tập trung ở skillfx |
| `cross()` đã dùng trong game | 0 | **chưa từng chạy** |

### 8.2 Phát hiện

| # | Phát hiện | Mức | Sửa kế hoạch |
|---|---|---|---|
| A1 | ~50 chỗ đọc thẳng `place.state.lobby/match`. Dời kho trạng thái mà sửa tay 50 chỗ = dễ vỡ, đúng kiểu chắp vá | cao | thêm **lớp truy cập** `scripts/lib/session.js` (`session(ctx)`), đổi 50 chỗ sang nó khi dữ liệu **chưa dời**; sau đó dời kho chỉ sửa 1 file |
| A2 | Tương tự 36 chỗ `MAP.*` | trung bình | `lib/map.js` `mapOf(ctx)` trước, khi chỉ có 1 map; dời file sau |
| A3 | Tách tướng: data dễ (yml), phần khó là **skillfx.js 36 nhánh theo tên tướng** | trung bình | tướng có `fx.js` riêng, skillfx còn lại thư viện chung (khớp doc 41); làm sau khi doc 41 duyệt, không chặn tách place |
| A4 | `cross()` chưa chạy lần nào trong world: cả đội cùng qua, giữ player.state, camera, bot, reconnect qua place đều **chưa kiểm** | cao | **spike** ở place thử trước S5: 2 người + 1 bot qua lại 10 lần, ghi lỗi/giây |
| A5 | Nguồn khối `bespoke…bgeo` 7.4 MB **chưa xác định**. Nếu nó thuộc chiến trường, tách place chỉ dời tải từ lúc mở game sang lúc vào trận, không giảm tổng | cao | S0 phải **quy được khối nặng về object**, không chỉ đo tổng; giảm hình (doc 43 P4) là việc riêng |
| A6 | Loading hiện 3 s. Map có thể stream lâu hơn → trận bắt đầu khi người chơi chưa thấy gì | trung bình | đo giây vào trận ở S5; nếu thiếu, chỉnh `loadSeconds` hoặc bắt đầu stream từ lúc KHÓA (doc 43 P5). Không màn chặn |
| A7 | Một room = một trận (`world.state.session` dùng chung). Hai trận 1v1 cùng room là không có | thấp, ghi nhận | đúng với hiện nay; nhiều trận song song = matchmaking theo room, việc sau |
| A8 | Sảnh mất cảnh nhìn xuống Mạch Giữa | thấp | câu hỏi 7.2 |
| A9 | `g2log.js` (log playtest Codex) đọc 6 chỗ trạng thái; luật: không đổi build khi đang đo | trung bình | báo Codex trước S4/S5, đổi g2log qua `session()` cùng lượt |
| A10 | Bộ nhớ khi về sảnh có nhả map không: chưa biết | trung bình | S8 đo trận 1/2/5 |
| A11 | Mỗi bước chưa có danh sách hồi quy | trung bình | dùng luồng doc 14 làm checklist: tạo phòng, chọn tướng, KHÓA, trận, kết quả, về sảnh, Sân Tập host reload 60 s |

### 8.3 Thứ tự sau audit

| Bước | Việc | Ghi chú |
|---|---|---|
| S0 | Đo boot 2 lần cùng bản + **quy khối nặng về object** | A5 |
| S1 | Phòng trưng quái → `dev-gallery` | lợi nhanh, rủi ro thấp |
| S2 | Lớp truy cập: `session(ctx)`, `mapOf(ctx)`, `heroOf(id)`; đổi mọi chỗ đọc, **dữ liệu chưa dời** | A1 A2; hành vi y cũ |
| S3 | Spike `cross()` ở place thử | A4; chưa đạt thì dừng, báo |
| S4 | Dời trạng thái → `world.state.session`; sim tách lobby/match referee | A9: báo Codex |
| S5 | Tách place `sanh` / `map-1v1` | A6 đo giây vào trận |
| S6 | `map-3v3` | |
| S7 | Data tướng vào `heroes/<id>/`; `hero.js` tách core/input/presence; fx từng tướng theo doc 41 | A3 |
| S8 | Đo trận 1/2/5 | A10 |

Mỗi bước: checklist A11 + một version riêng (`spawn undo`).

## 9. S0 · Đo nền (2026-10-08 22:40 UTC)

### 9.1 Số tải engine ghi (máy desktop người chơi, bản @f8368bd6, 22:15 UTC)
- Đứng được sau **483 KB** (~1.1 s 4G; chuẩn 450 KB).
- Hình đầu tiên sau **40.3 MB**. Khối nặng: 7.4 / 4.6 / 3.6 / 1.9 / 1.1 MB (`bespoke…bgeo` = hình dựng bằng code).
- Lần đọc trước đó (bản khác): 12.3 MB. Hai lần **khác bản**, chưa so được. Cần 2 lần tải lại trên **cùng bản** để có nền chắc (§9.4).

### 9.2 Attempt to map the heavy blocks to scene objects — not verified

I tried two mock benchmark runs on the scripted geometry. The earlier `/tmp/bench/run.mjs` output totaled 227,154 and gave 552 for `scripts/gen/bridge.js` (row 32572). The later saved `tools/perf/geo-bench.mjs` run printed 66,942 for `bridge`, 41,940 for `lobby-hall`, and 9,660 for `nexus-blue` (row 32586 output from the command at 32581). These results conflict; the saved harness counts `quad`/`tri` calls but stubs `instances` as a no-op (row 32607). A tool verdict also flagged it as a box script importing Node `fs`, not a world-run measurement (row 32586). Therefore the mock counts are not reliable mesh totals or evidence mapping hashed engine blocks to these objects.

**Correction:** the 7.4 / 4.6 / 3.6 / 1.9 / 1.1 MB entries in §9.1 are engine-reported hashed `.bgeo` blocks; their scene-object identities are unknown. Do not treat the bridge/hall/nexus mapping, ~110 bytes per triangle, mock triangle totals, or the estimated 25 MB as validated geometry evidence. The 3.6 and 1.9 MB blocks are also unmapped. This tool pass does not yet connect any block to an object.

### 9.3 What can be concluded

The engine has one available player-desktop boot reading for @f8368bd6, not two repeat readings on the same version. It reports 483 KB before standing and 40.3 MB before first picture (§9.1). No confirmed per-place savings, bridge reduction, or mobile measurement were obtained here. Separate-place benefits and mesh optimization remain hypotheses/planning items; changing the bridge for appearance/performance requires creator review.

### 9.4 Still needed for a defensible baseline
1. Two reload readings on the same version, as requested of lukasai; none are captured in this passage.
2. A benchmark that includes instancing and is valid in the world, then a verified mapping from engine `.bgeo` hashes to authored objects.
3. A mobile-device reading.

## 10. TODO · Tách lõi trước, map sau (lukasai 2026-10-08)

Lệnh: "map sau này sẽ build lại … hiện tại tách core kiến trúc trước" · "vẫn là tách riêng từng màn hình ra. Tránh load full cả game. Lobby-hero-matching…".
Nguyên tắc: hành vi y cũ sau mỗi bước; map/địa hình không đụng.

| # | Việc | Xong khi |
|---|---|---|
| C1 | Lớp truy cập `scripts/lib/session.js` (sảnh/trận/kết quả/vòng đấu/bot/feed) | mọi chỗ ĐỌC ngoài referee đi qua nó |
| C2 | `scripts/lib/map.js`: một cửa vào dữ liệu map (`MAP`, `mapOf(ctx)`) | 0 file import `map.yml` trực tiếp trừ map.js |
| C3 | `scripts/lib/heroes.js`: sổ tướng (kit + thân + điệu sảnh + vũ khí + clip + âm), `heroOf(id)` | 0 file import `heroes.yml` trực tiếp; BODY/GESTURE rời lobby-stage |
| C4 | Màn hình thành module: `scripts/screens/lobby/{shell,home,heroes,lore,room,matching,results,index}.js` thay `lib/lobby-ui.js` | lobby-ui.js xoá; mỗi màn một file |
| C5 | HUD trận thành `scripts/screens/match/*` thay phần trận trong `ui.js`; `ui.js` chỉ định tuyến | ui.js < 150 dòng |
| C6 | Khi tách place (S5): `places/sanh/ui.js` chỉ import `screens/lobby`, place map chỉ import `screens/match` → mỗi nơi chỉ tải màn của mình | đo boot sảnh |
| C7 | Audit sau mỗi bước: render từng màn (home, tướng, phòng, chọn, versus, kết quả, HUD trận), log lỗi = 0, manifest check | ghi vào đây |

Giới hạn thật: trong MỘT place, engine gom ui.js thành một gói; tách file làm code độc lập nhưng chưa giảm tải. Giảm tải thật đến ở C6 (mỗi place một ui.js). Code UI cả game ~230 KB, nhỏ so với hình 40 MB; khối nặng vẫn là hình.

### 10.1 Tiến độ (2026-10-08 22:55 UTC)
| # | Trạng thái | Ghi chú |
|---|---|---|
| C1 | **một phần** | `lib/session.js` có (`session`, `sessionOf`, `postFeed`, `setBotRow`); màn sảnh đọc qua nó. hero/bot/lane/ui-trận còn đọc thẳng → làm cùng C5 |
| C2 | **xong** | `lib/map.js`; chỉ map.js import `map.yml` |
| C3 | **xong** | `lib/heroes.js` (HEROES, BODY, GESTURE, `heroOf`); BODY/GESTURE rời lobby-stage; 0 file ngoài import `heroes.yml` |
| C4 | **xong** | `lib/lobby-ui.js` (70 KB) xoá → `screens/lobby/`: shell 133 · home 22 · heroes 206 · lore 6 · room 176 · matching 43 · results 22 · index 38 dòng. Không vòng import |
| C7 | kiểm | màn Tướng render đúng trên tab lukasai; log lỗi sau lần lưu cuối = 0; manifest 526/0/0/0. Home/phòng/chọn/versus/kết quả: chưa render thử (router y cũ) |

Đồ thị màn sảnh: index → {home, heroes, lore, room, matching, results} → shell. matching dùng heroInfo/heroStrip của heroes, teamCol của room.

## 11. LUẬT MODULE (lukasai 2026-10-08, bắt buộc)
"Sau này dev dự án phải làm theo module ko viết chung vào 1 chỗ. Giảm tải. Dễ dev."
1. Một màn hình = một module: `scripts/screens/lobby/*`, `scripts/screens/match/{common,desktop,mobile}.js`. `scripts/ui.js` chỉ là router.
2. Code dùng chung nằm ở `shell.js` / `common.js`; các màn không import lẫn nhau thành vòng.
3. Màn mà khung hình đầu không cần thì tải bằng `import()` sau khi đứng vào game (engine: file import() rời khỏi gói tải đầu).
4. Dữ liệu đọc qua cửa `lib/session.js`, `lib/map.js`, `lib/heroes.js`.
5. File nào làm quá việc của một màn thì tách ngay trong lượt đó. Kiểm: không vòng import, log 0 lỗi, render thử màn đã đụng.

### 11.1 Tiến độ tách HUD (2026-10-08 23:06 UTC)
- `scripts/ui.js` 66 KB → 5.5 KB: chỉ là router. HUD trận: `screens/match/common.js` (44 KB, phần chung) · `desktop.js` (6 KB) · `mobile.js` (14 KB, cả joystick ảo). desktop/mobile tải bằng `import()` khi cần (bắt đầu tải từ lúc chọn tướng); máy desktop không bao giờ tải HUD mobile và ngược lại. Trong lúc chờ: chữ "Đang vào trận…".
- Sảnh: `home` + `shell` đi theo gói đầu; heroes/lore/room/matching/results tải bằng `import()` ngay sau khung đầu.
- `lib/viewport.js`: coarse/compact dùng chung cho router và HUD.
- Kiểm: harness node render HUD mới vs `ui.js` cũ ở 12 trạng thái (desktop/mobile × thường, shop, chết, bảng, trợ giúp, máu thấp) = **giống từng byte**; 8 màn sảnh render được sau khi tải sau; màn Tướng hiện đúng trên client CPU; log 0 lỗi; manifest 526/0/0/0.
- Số đo engine (`spawn perf --boot`, desktop người chơi): arrival set 706 KB → **577 KB** (−129 KB). Nặng nhất vẫn là mô hình `bespoke.*.bgeo` (7.4 + 4.6 + 3.6 MB…) trước khung hình đầu: 41.5 MB. Đó là việc tiếp theo, không phải UI.
- Chưa: chạy một trận thật để nhìn HUD tải sau trên màn hình (harness ≠ client PASS).

## 12. TODO · Sảnh thành place riêng + tải theo tướng + bỏ inline (lukasai 2026-10-08 23:10 "ok. Làm. Sửa cả inline")

Phát hiện (đo + đọc scene): Đài sảnh (`lobby-hall`, `lobby-dais`… tâm 31,26,31) đứng **giữa Mạch Giữa** trong ô `x0z0`, còn thân người chơi lúc ở sảnh đứng ở **giếng xanh** (-65.8, 65.8). Vào sảnh = tải cả map: 41.5 MB trước khung hình đầu (5 khối hình dựng bằng code 18.6 MB).
Model/clip tướng: engine chỉ tải khi một vật thật sự mang nó (thân tướng, kênh mixer). Trong trận chỉ tướng có trong roster mới có thân → đã "chỉ tải tướng của trận". Code số liệu tướng (heroes.yml…) là text nhỏ, giữ chung.

| # | Việc | Xong khi |
|---|---|---|
| P1 | `places/sanh/`: config (trời, ánh sáng như main, terrain off), đài sảnh chuyển từ x0z0 sang, sàn đứng cho thân người chơi khuất khung | nhìn sảnh trong place mới ra đúng khung home/hero/pick |
| P2 | Referee lên cấp world (`sim.js` gốc): lobby/match/results ở `world.state`; hàng của trận (phase/round/wave/feed/bots/g2) ở lại `places/main` state. Mọi chỗ đọc đi qua `scripts/lib/session.js` | grep 0 chỗ đọc `place.state.lobby/match/results` ngoài session.js |
| P3 | Vào game = `sanh`. loading → referee `cross` người trong roster sang `main`; results → `cross` về `sanh`. Reload giữa trận: về sanh rồi được đưa lại main | tự chơi Sân Tập một vòng: sảnh → chọn → trận → kết quả → sảnh |
| P4 | `places/sanh/ui.js` chỉ import `screens/lobby`; `places/main/ui.js` chỉ import `screens/match`. `practiceBar` ra module riêng | boot sanh đo lại |
| P5 | Bỏ đài sảnh khỏi `main` (sau khi P3 chạy) | boot main/sanh đo lại, ghi số |
| P6 | Inline style → class trong theme (THEME/HZ), số đo theo token; bắt đầu từ HUD trận + màn sảnh | grep `style="` giảm, ghi số trước/sau; render so byte/ảnh |
| P7 | Lúc versus (loading): tải trước clip skill/chết của các tướng trong roster, không tướng khác | đọc boot trận |
