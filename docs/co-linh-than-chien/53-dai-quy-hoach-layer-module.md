# 53 · Đại quy hoạch: viết mới theo layer module

Ngày 2026-10-09. Theo yêu cầu @lukasai: "Viết mới. Lên plan, tính toán các màn hình đang có… responsive trên từng device, tách hero data → lobby → match → map… HUD layer từng module ko dùng chung… kiến trúc layer module bền vững về sau."
Kế thừa doc52 (quy hoạch UI/HUD do Codex gửi): sáu lớp, root namespace theo màn, lifecycle mount/update/unmount, tách layout profile khỏi input profile. Doc53 mở rộng phạm vi đó sang **viết mới**, thay vì chỉ sửa trên code cũ, và áp cho cả 4 khối hero / lobby / match / map. Luật bàn giao vé/thư về ở doc51 giữ nguyên.
Trạng thái: PLAN. Chưa triển khai, chưa đo mới.

## 1. Quyết định

- Game đang dev nên không phải giữ code cũ. Khung code (router, thân player, HUD, referee, camera) viết mới theo layer.
- **Giữ nội dung**: model, clip, ảnh, âm thanh, `scripts/gen/*` (hall, tháp, nhà chính…), dữ liệu `scripts/lib/data/*.yml`, luật sảnh/phòng trong `referee/core.js` và hợp đồng vé/thư về của doc51.
- Mỗi khối có thư mục riêng, place riêng (khi khối đó là một nơi chốn), data riêng và HUD riêng. Giữa các khối chỉ có 3 kênh: **data đọc chung** (hero/item/map registry), **vé trận** (sảnh → map) và **thư về** (map → sảnh).
- Không có HUD khổng lồ dùng chung. Chỉ dùng chung token, icon và component thuần (nhận dữ liệu, trả HTML).

## 2. Kiểm kê hiện trạng (đo trên source v1276)

### Màn hình: 8 trải nghiệm, Match có 2 layout

| # | Màn | File hiện tại | Byte | Vấn đề |
|---|---|---|---|---|
| 1 | Home | screens/lobby/home.js | 2.9K | ổn; chung CSS với shell |
| 2 | Heroes (roster + chi tiết + demo skill) | screens/lobby/heroes.js | 20.4K | pick screen cũng import heroInfo/heroStrip của màn này |
| 3 | Lore | screens/lobby/lore.js | 0.4K | gần như trống |
| 4 | Room (mode/map/team/start) | screens/lobby/room.js | 19.8K | map SVG viết cứng trong màn |
| 5 | Hero Pick | screens/lobby/matching.js `pick` | 4.8K (chung) | 2 màn chung một file |
| 6 | Loading/Versus | screens/lobby/matching.js `versus` | | |
| 7 | Match desktop + mobile | screens/match/desktop.js 5.9K, mobile.js 13.9K, **common.js 43.8K** | 63.6K | common.js gom 9 panel, 4 khối style, state in-module (LOC, PRAC) |
| 8 | Results | screens/lobby/results.js | 2.4K | |
| — | Shell sảnh (CSS, header, toast, ctxOf) | screens/lobby/shell.js | 18.3K | CSS cả sảnh nằm một chuỗi |
| — | Router | scripts/ui.js | 5.5K | ôm listener joystick, zoom 9 nấc media, màn xoay inline style |
| — | Lib HUD | lib/hud-std.js 12.9K, hud-touch.js 16.1K, tooltip 4.1K, ui-theme 4.9K | 38K | chồng vai với common.js |

Tổng UI hiện tại: khoảng 180K. Panel trong common.js: shop, scoreboard, stats, help, ping, tooltip, feed, boss bar, danger, suggest, topBar.
Thanh Sân Tập (`practiceBar`) nằm trong lobby/index.js nhưng chỉ vẽ trong trận: sai owner.
Hall of Honour có tab menu nhưng không có màn: không tính, không tự thêm.

### Logic (code chạy)

| Khối | File | Byte | Vấn đề |
|---|---|---|---|
| Thân player | templates/player.js → humanoid-locomotion + player.js + hero.js | 5.7K + | một thân dùng cho cả sảnh lẫn trận |
| Trận của hero | hero/match.js | **60.4K / 1147 dòng** | gộp danh tính, kinh tế, combat, skill, chết/hồi sinh, aim, shop |
| Hiệu ứng skill | lib/skillfx.js | 56.6K | 6 tướng chung một file |
| Bot | bot.js | 26.8K | AI, combat, progression chung một file |
| Lane | lane.js | 26.4K | lính, tháp, nhà chính, wave chung một file |
| Camera | camera.js | 11.4K | camera trận và sân khấu sảnh, demo skill, plate chung một file |
| Referee | referee/core 8K, lobby 6.2K, match 11.1K, **single 16.3K** | | single.js chỉ là bản rollback |
| Địa hình sảnh | places/sanh/config.yaml → scripts/terrain.js | | **sảnh dùng địa hình của map, có cả mark lane/sông**: đây là lý do "lobby/map battle vẫn là 1" |

Place thử: main_thu, sanh_thu (P-7). Orphan: titan.js, flat-starter-terrain.js, dev-bodybench.js, clip mv/hop2.

## 3. Kiến trúc đích: 4 khối × 6 lớp

```
                ┌──────────── DATA (đọc chung, không logic) ────────────┐
                │ heroes / kits / items / maps / strings / art registry │
                └───────────────────────────────────────────────────────┘
     HERO (thư viện)        LOBBY (place sanh)       MATCH (runtime)          MAP (mỗi map 1 place)
  body, kit, clip, fx,    referee sảnh, màn sảnh,   referee trận, combat,    địa hình, lane, tháp,
  vũ khí, preview         sân khấu, camera sảnh     kinh tế, bot, HUD trận   lính, minimap adapter
        ▲                        │  vé trận ───────────────▶ │
        └── lobby + match import ◀───────── thư về ───────────┘
```

Chiều phụ thuộc: map → match → hero → data. Lobby → hero(preview) → data. **Lobby không import match/map. Match không import lobby. Hero không import ai.**

### Thư mục đích

```
scripts/
  data/            # (giữ scripts/lib/data/*.yml) + registry.js: một cửa đọc data
  hero/
    registry.js    # BODY, kit, thông số (từ heroes.js/heroes.yml)
    body.js        # dựng thân + vũ khí + grip (từ weapons.js)
    anim.js        # clip theo skill
    fx/<hero>.js   # tách skillfx.js theo tướng, tải theo roster
    preview.js     # sân khấu xem tướng (từ camera.js lobbyCam/stageDemo)
  lobby/
    referee.js     # (referee/lobby.js + core rules)
    body.js        # thân player ở sảnh: không di chuyển, không combat
    camera.js      # shot sân khấu
    ui/            # places/sanh/ui.js gọi vào đây
      shell.js  router.js
      screens/home/ heroes/ lore/ room/ pick/ loading/ results/   # mỗi màn: model.js + view.js + style.css.js
  match/
    referee.js     # (referee/match.js)
    body.js        # thân hero trong trận: input, aim (từ hero.js + hero/match.js)
    combat.js  economy.js  respawn.js  shop.js  skills.js        # tách hero/match.js
    bot/brain.js  bot/body.js
    camera.js      # camera MOBA
    ui/            # places/main/ui.js gọi vào đây
      model.js     # snapshot thuần, không HTML
      desktop.js  mobile.js
      controls/mouse.js  controls/touch.js   # joystick sống ở đây, không ở router
      widgets/ hp, skills, minimap, feed, score, items
      panels/  shop, board, stats, help, ping, practice
  map/
    mach-giua/ terrain.js  lanes.js(wave, lính)  structures.js(tháp, nhà chính)  adapter.js(minimap/bounds/markers)
    (cuu-mach-5v5/ … khi tới lượt)
  ui/
    foundation/ tokens.js(z, màu, spacing theo doc40)  profile.js(layout × input)  components.js(button, bar, card, icon)
    system/ rotate.js  error.js
```

### Mỗi place một ui.js, không còn router chung

Engine cho mỗi place `places/<p>/ui.js` riêng, đè ui gốc. Dùng tính năng này:
- `places/sanh/ui.js` chỉ biết màn sảnh. Không bao giờ tải HUD trận.
- `places/main/ui.js` chỉ biết HUD trận + kết quả tạm. Không bao giờ tải màn sảnh.
- `scripts/ui.js` gốc còn mỗi màn xoay máy và lỗi hệ thống.

Kết quả: nhánh `inMatch ? … : …` trong router biến mất. Đổi place thì engine tự unmount cả UI cũ, listener của màn trước không còn đường sống sót.

### Thân player theo place

Template player chỉ còn locomotion và một `scripts/body.js` mỏng: tùy `ctx.self.place`, gắn `lobby/body.js` hoặc `match/body.js` (import khi cần). Ở sảnh, thân không có combat, không có input trận. Vào map thì mới tải combat của trận.

### Địa hình riêng cho từng place

- `sanh` có generator riêng `scripts/lobby/terrain.js`: núi đá vôi quanh Điện Vinh Danh, nước ở chân điện. Không có lane, không mark sông, không import map.js.
- `main` dùng `scripts/map/mach-giua/terrain.js`. Map sau là place mới với thư mục mới.

## 4. Chuẩn HUD layer (theo doc52 §4)

- Mỗi màn một root: `home- heroes- lore- room- pick- loading- match- results-`. CSS scope theo prefix, mỗi màn tự sở hữu style.
- Trong root, thứ tự lớp: content → hud → panel → modal → toast. Z dùng token có tên (`--z-hud`, `--z-panel`, `--z-modal`, `--z-toast`, `--z-system`); không ghi số tay.
- Chỉ lớp đang mở nhận pointer. Shop/board mở thì chặn click xuyên. Touch đang kéo bị cancel khi blur, đổi màn, đổi place hoặc xoay máy.
- Mỗi module màn export `model(ctx, player)`: snapshot thuần, test được không cần DOM. Export `view(model, profile)`: HTML. Có thêm `mount`/`unmount` nếu màn có listener.
- Không inline style, không size tùy hứng (luật đã khóa): mọi số đi qua token hoặc biến CSS.

## 5. Responsive: profile = layout × input

| layout \ input | mouse | touch | hybrid |
|---|---|---|---|
| wide (≥1280×720 CSS px) | desktop chuẩn 1920×1080 | tablet lớn: layout desktop + controls touch | layout desktop, cả hai controls |
| compact (cửa sổ nhỏ) | reflow, vẫn chuột/phím | phone ngang 820×460 | phone layout + chuột |
| portrait | màn xoay máy (USER LOCK chơi ngang) | | |

- `profile.js` trả `{ layout, input }` từ viewport + `pointer:coarse` + `any-hover`. Bỏ boolean `compact` dùng chung.
- Chỉ scale ở **một** chỗ: root của màn, qua `--ui-scale` tính từ khung thiết kế. Bỏ 9 nấc `zoom` media hiện có.
- Vùng chạm ≥ 48 CSS px **sau khi đã scale**. Safe-area dùng `--spawn-safe-area-*` và chừa rail phải của Spawn.
- Kiểm theo ma trận doc52 §5: 1366×768, 1920×1080, 844×390, 932×430, 1024×600, 1180×820, cửa sổ nhỏ, portrait.

## 6. Tải theo nhu cầu

- Boot vào sanh: shell sảnh + Home + hero registry (data nhỏ) + body đang xem. Mục tiêu đề xuất 450 KB, chưa phải gate.
- Model karst 3.3 MB đang đứng trước khung hình đầu: chuyển sang spawn sau khi đứng (`onArrive`) hoặc thay bằng geometry gen.
- Các màn sảnh khác tải theo route và prefetch màn kế (Home → Room, Room → Pick).
- Pick prefetch `places/main/ui.js` cùng fx/clip của các tướng trong đội hình.
- Fx tách theo tướng: trận chỉ tải `hero/fx/<id>.js` của roster.

## 7. Đợt làm (mỗi đợt kết thúc bằng một bản chơi được)

| Đợt | Việc | Xong khi |
|---|---|---|
| **A · Nền** | `ui/foundation` (tokens, profile, components), `ui/system/rotate`, data registry, asset resolver + bundle theo manifest (§10), `scripts/body.js` chọn thân theo place | import graph đúng chiều; rotate không inline style |
| **B · Hero** | tách registry/body/anim/preview, preview tải qua resolver (§10); skillfx → `hero/fx/<id>.js`; rà clip/SFX/vũ khí theo roster (việc #35940 còn treo) | preview sảnh và trận cùng gọi một `hero/body.js`; fx tải theo roster |
| **C · Lobby** | bundle theo roster lúc loading (§10); `places/sanh/ui.js` + 7 màn viết mới (Home, Heroes, Lore, Room, Pick, Loading, Results); `lobby/terrain.js` riêng; camera sân khấu; referee sảnh dời vào `lobby/` | vào sảnh không thấy lane/map; không tải HUD trận; VI/EN đủ; ma trận viewport đạt |
| **D · Match** | trận chỉ tải bundle roster + map (§10); `places/main/ui.js` + model/widgets/panels/controls; tách hero/match.js thành combat/economy/respawn/shop/skills; bot tách brain/body; practice bar vào panels | HUD không import lobby; joystick sống trong controls/touch; không click xuyên panel |
| **E · Map** | `map/mach-giua/` (terrain, lanes, structures, adapter); minimap đọc adapter; HUD không có tọa độ viết cứng | thêm map mới = thêm thư mục + place, không sửa match/ui |
| **F · Dọn + đo** | xoá single.js, router cũ, common.js, hud-std/hud-touch, orphan, place P-7 sau khi Codex chốt report; một lượt UI thật sảnh → pick → trận → reload → kết quả → về sảnh; đo boot lạnh cùng điều kiện | danh sách PASS đúng phạm vi + lỗi còn lại |

Thứ tự A → B → C → D → E → F. Lane C và D có thể chạy song song sau B: hai owner, không ai sửa file của người kia. Luồng đang chạy giữ tới khi màn mới thay vào. Mỗi đợt là một nhóm commit, có `spawn undo` để quay lui.

## 8. Giữ nguyên trong đợt viết mới

- Số balance, HP/damage, tầm, cooldown (USER LOCK gameplay).
- Luật reconnect 60 giây, luật vé/thư về/ack của doc51.
- Hành vi camera MOBA (yaw/pitch/khoảng cách trong camera.yml).
- Mọi asset đã có trong assets/registry.yml.

## 9. Rủi ro

- Một place một ui.js: cần xác minh trên engine rằng `places/<p>/ui.js` đè ui gốc và tự unmount khi đổi place. Kiểm ở đợt A trước khi viết màn.
- Thân player theo place: thời điểm cross() ở giữa một tick có thể làm thân mang module cũ. Cách xử lý: `body.js` đổi module ở `onArrive`.
- Viết mới HUD trận là phần lớn nhất (khoảng 64K + 38K lib). Đợt D chia theo widget để mỗi bước đều chơi được.

## 10. Phân phối asset qua database — USER LOCK 2026-10-09

User yêu cầu: vào trận chỉ tải các tướng có trong trận, không tải cả roster của game. Việc phân phối phải đi qua database asset đã có.

- **Kho hiện có:** `assets/registry.yml` (khai báo, người viết), `assets/manifest.yml` (bảng sinh tự động, 526 asset tại 2026-10-08: model/hero 8, anim/hero-skill 31, audio/sfx 124…), `INDEX.md`/`manifest.csv` (tra cứu theo doc42). Hiện đây mới là sổ asset/quét tham chiếu, chưa có bằng chứng nó đang là runtime distributor. Việc phải làm là nối resolver/loader vào kho này, không tuyên bố cơ chế đã chạy.
- **Một cửa phân phối:** màn yêu cầu asset bằng ID/bundle; `scripts/assets/resolver.js` lấy phiên bản/URL từ manifest rồi giao cho cơ chế tải của engine. Không rải URL, không tạo bảng model/clip/SFX riêng trong từng màn. Nếu engine cần, cho phép một bảng runtime sinh từ manifest (`tools/assets/manifest.py` xuất `scripts/assets/bundles.yml`); không duy trì tay nguồn thứ hai.
- **Bundle:** khai báo theo trường `hero`/`map`/`mode` có sẵn trong registry. `hero:<id>` = model, rig/clip skill + chết, vũ khí, icon HUD, SFX/VO, `hero/fx/<id>.js`. `map:<id>`, `mode:<id>` = địa hình, công trình, lính, boss. `common` = phần dùng chung, chỉ tải một lần.
- **Sảnh:** UI cần thiết + preview tướng đang xem. Thẻ roster chỉ tải thumbnail/icon đang hiện; xem thẻ không kéo model/clip/VFX của mọi tướng.
- **Trận:** tập hero ID duy nhất lấy từ `match.roster` đã đóng băng, gồm người chơi hai phe và bot đã chốt. Tải bundle của những ID đó; dependency chung tải một lần. Không chỉ tải tướng của mình, vì còn phải hiện đồng minh và địch.
- **Picking** chỉ prefetch tướng đang chọn; **loading** chốt bundle theo roster chính thức. Match không quét toàn manifest rồi tải tất cả. Code VFX không được import một file chứa asset eager của mọi tướng (đây là lý do tách `lib/skillfx.js` 56K thành `hero/fx/<id>.js`).
- **Map/lính/boss** dùng bundle riêng theo map và mode đang chơi; không kéo Cửu Mạch hay gallery vào trận Mạch Giữa. Không xoá asset đã cache hoặc đang được engine dùng chỉ vì rời màn; giải phóng tham chiếu theo lifecycle/capability thật.
- **Lỗi:** asset bắt buộc mà lỗi thì hiện lỗi/retry, không báo ready giả. Asset phụ có fallback được khai báo. Không tự đổi thời gian loading hay luật vào trận; nếu bị "chưa ready" thì xử lý theo contract hiện hành và ghi rõ chỗ cần điều chỉnh.
- **Gán vào đợt:** A xác định manifest + dependency bundle và resolver; B nối preview; C (lobby/loading) và D (match) nối bundle theo roster/map. Không xây database mới.
- **Nghiệm thu** bằng request/asset trace trên cache lạnh: trận chỉ có A/B thì không tải model/clip/SFX/VFX riêng của C; hero hay dependency trùng nhau không tải lặp; đổi sang trận có C thì mới lấy bundle C. Báo rõ cache hit và tải mới. Đây là tiêu chí phải thực hiện, chưa có kết quả.

## 11. Tiến độ

### Đợt A · Nền (2026-10-09): đã làm

TODO và kết quả:
- [x] Rủi ro §9 "mỗi place một ui.js": P-7 đã chạy `places/sanh_thu/ui.js` riêng, nút thật đi tới trọng tài (reports/p7-spike-2026-10-09/P7-run2.md). Engine có hỗ trợ; tự unmount khi đổi place chưa đo, kiểm ở đợt C.
- [x] `scripts/ui/foundation/tokens.js`: màu, spacing, cỡ chữ, z có tên, `--touch-min`, safe-area, khung thiết kế.
- [x] `scripts/ui/foundation/profile.js`: `{ layout: wide|compact|portrait, input: mouse|touch|hybrid, scale }`. Thay boolean `compact` cho các màn viết mới.
- [x] `scripts/ui/foundation/components.js`: button, bar, card, icon thuần, không đọc ctx. Vùng chạm bù theo `--ui-scale`.
- [x] `scripts/ui/foundation/screen.js`: root theo namespace, 5 lớp content/hud/panel/modal/toast, `lifecycle()` gọi unmount màn cũ trước khi mount màn mới.
- [x] `scripts/ui/system/rotate.js`: màn xoay máy không inline style; `scripts/ui.js` đã dùng nó (kiểm bằng look phone 390×844: card phủ kín; desktop: sảnh không đổi).
- [x] `scripts/data/registry.js`: một cửa đọc data.
- [x] §10 asset: `tools/assets/bundles.py` sinh `scripts/assets/bundles.yml` (6 bundle tướng, mỗi bundle 22 asset: model, 7 clip, 8 sfx, 6 ảnh; bundle place: main 25, sanh 7). `scripts/assets/resolver.js` lo `rosterHeroes`, `bundleFor`, sổ `want`/`have`. Kho có 48 sfx tướng trước đây chưa khai báo; `manifest.py` giờ quét hero-sfx.yml và registry đã khai báo đủ (check: 575 asset, chưa khai báo 0).
- [x] Kiểm resolver (node, bản sao bundles): roster {van_dao, nham_vu, bot van_dao} → 2 hero ID, 69 địa chỉ, không có asset hoa_tuy; xin lại van_dao → 0 tải mới; thêm hoa_tuy → 21 tải mới (1 dùng chung). Đây là kiểm logic, chưa phải trace request trên cache lạnh.
- [x] (2026-10-09) Thân theo place đã có dạng thật thay cho body.js: `scripts/hero.js` (113 dòng) là thân sảnh + cửa chuyển tiếp, `scripts/hero/match.js` là thân trận, được import() khi trận gần. Không viết thêm lớp bọc rỗng. Ý cũ: `scripts/body.js` (thân theo place): dời sang đợt C/D, viết cùng `lobby/body.js` và `match/body.js`. Viết riêng ở đợt A thì chỉ là một lớp bọc rỗng quanh hero.js.

Đính chính (spawn perf --boot): model Vân Dao 3.3 MB được tải trong boot của `main` (tướng có trong roster, đúng luật), không phải của `sanh`. Boot sanh: đứng được sau 1.5 MB, khung hình đầu sau 9.2 MB; nặng nhất là avatar mặc định 680 KB, code world 638 KB, karst-pillar a/b 430+440 KB.

### Đợt B · Preview (2026-10-09): bước 1 đã làm
- [x] `scripts/camera.js`: model preview trên đài lấy từ `heroBundle(hero).model` qua resolver, và resolver được `import()` sau khi đứng nên bundles.yml (13 KB) không nằm trên đường boot. Tướng không có bundle thì ghi log, không spawn model đoán. Chiều cao vẫn đọc từ BODY.h.
- [x] Kiểm trên client: Vân Dao hiện trên đài; bấm Hỏa Tủy thì đổi thân, cầm vũ khí, panel đúng.
- [ ] Còn lại: ảnh card/icon qua `images` của bundle; prefetch tướng đang hover ở picking; karst ở sanh (870 KB trước khung hình đầu) thuộc việc tách môi trường sảnh khỏi map.

### Đợt C · Thân tướng theo roster (2026-10-09): bước 1 đã làm
- [x] `resolver.heroModel(id)` → `{ model, h }` lấy từ bundle (bundles.yml giờ có thêm `height`). Đây là cửa duy nhất cho preview sảnh (`scripts/camera.js`), thân người chơi trong trận (`scripts/hero/match.js`) và thân bot (`scripts/referee/match.js` spawnBots). Trận chỉ spawn thân của các hero có trong `match.roster` đã đóng băng, nên chỉ những model đó được kéo về.
- [x] Kiểm logic (node, bản sao bundles): 6/6 tướng khớp địa chỉ và chiều cao với BODY cũ; hero không có bundle → null, có ghi log, không spawn model đoán.
- [x] lukasai chơi một trận sau khi đổi thân tướng và lính (11:23): "chơi tốt. Ko có lỗi gì". Đây là creator chơi thường, chưa phải trace request trên cache lạnh.
- [x] Lính theo map: bảng thân/clip/âm Linh Binh rời khỏi lane.js sang `scripts/lib/data/units.yml` (theo map, hiện có `mach_giua`). bundles.py sinh `units.<map>` { kinds, assets } (18 asset); lane.js đọc `resolver.unitKinds('mach_giua')`. manifest.py quét units.yml: 575 asset, 0 chưa khai báo, 0 mồ côi. Kiểm node: 0 giá trị lệch so với bảng cũ; map khác trả rỗng. lane.js chạy trong main, không lỗi (chưa có trận để thấy lính).
- Trụ, Tâm Mạch, giếng là hình thủ tục (scripts/gen/*), không có model tải; boss Titan chưa gắn vào trận (probable orphan) nên chưa cần bundle.
- [x] (2026-10-09) `HERO_MODELS`/BODY đã bỏ khỏi hero/match: thân tướng nhận qua `resolver.isHeroModel(url)` từ bundle. Clip/SFX vẫn chưa có trace (chuyển xuống mục trace cache lạnh).
- Ý cũ: Đợt C còn lại: `HERO_MODELS` trong hero/match.js vẫn đọc BODY (chỉ dùng để phân biệt avatar với thân tướng); clip/SFX của tướng vốn chỉ tải khi phát, chưa có trace.
- Ghi chú đo: boot sanh 11:15 có model Vân Dao 3.3 MB, vì Vân Dao là tướng đang xem trên đài. Đúng luật (preview tướng đang xem); muốn khung hình đầu nhẹ hơn thì chọn tướng mặc định có model nhẹ.

### Ảnh tướng qua bundle + nền UI sạch inline (2026-10-09, 11:2x)
- [x] Bundle tướng có thêm `portrait` và `icons` theo phím; resolver có `heroPortrait / heroIcon / heroIcons`. 9 màn/HUD (home, heroes, room, matching, results, match common/desktop, hud-std, hud-touch) và `data/registry.js` không còn đọc `ART.portraits / ART.icons`: 0 chỗ còn lại. Kiểm node: 36 ảnh khớp nguồn cũ, lệch 0. Ảnh chỉ tải khi màn vẽ nó; card không kéo model/clip/VFX.
- [x] Nhìn trên client của lukasai trong trận: chân dung Nham Vũ và hàng icon kỹ năng hiện đúng. Chưa nhìn lại các màn sảnh sau thay đổi này.
- [x] Nền UI hết inline style: `--ui-scale` theo bậc 0.05 qua `data-scale` + rule CSS sinh sẵn; thanh `cl-bar` theo bậc 2% qua `data-v`. Các màn sảnh cũ vẫn còn style inline (background-image…), chuyển dần khi tách từng màn ở đợt B.
- [x] Tải trước khi chọn tướng: ở picking, đài preview (camera.js + lobby-stage.shownHero) đã đứng thân tướng đang chọn qua `heroModel`, nên model đó về trước lúc loading. Không tải tướng khác.
- [ ] Còn mở: trace request trên cache lạnh (A/B không kéo C); 3 lần đo boot lạnh; màn lỗi/retry khi asset bắt buộc hỏng.
  - 2026-10-09 giảm tải: 6 model tướng đổi texture PNG→JPEG (q92 màu, q94 normal), raw ~7.2→3.3 MB mỗi tướng, mesh/rig/clip giữ nguyên, ảnh so cạnh nhau không khác (Hỏa Tủy). 3 karst sảnh (≈870 KB) chỉ cho editor vì camera sảnh không bao giờ thấy. Chưa đo boot lạnh 3 lần: chờ số đo client mới.

### Tách hero/match.js · 2026-10-09 (#44026)
- [x] `scripts/hero/match.js` 1.149 dòng → facade 162 dòng + 8 lớp trong `scripts/hero/match/`: base, roster, aim, combat, orders, cues, economy, life. Hướng phụ thuộc một chiều: base → roster, aim → combat → orders, cues → economy, life; không lớp nào import ngược facade. Kiểm: node --check 9/9 file; quét tên: 0 tên thiếu; engine import facade ra đúng 8 export (matchInput, matchUpdate + 6 hook hẹn giờ).
- [x] Chơi thử trên body Savi (Chromium 1280×720, desktop, Sân Tập 1v1 bot, Hỏa Tủy): chọn → khoá → vào trận; di chuyển chuột phải; Q/W/E ra chiêu (cd ghi đúng); 2 last hit (+vàng, +130 XP); chết bởi bot-red-1 rồi hồi sinh; B về nhà → shop mở "At base"; mua Quickstring 400 (vàng 776→376, túi 1); Rời trận → đếm ngược → Hủy (ẩn) → Rời → Rời ngay → về sảnh. 0 lỗi console. Đây là desktop PASS trong phạm vi đã thử, chưa phải máy thật, chưa thử mobile cho bản tách này.
- [x] `tools/assets/bundles.py check` giờ báo lỗi nếu tướng thiếu asset bắt buộc (model, portrait): chặn ở build thay vì để người chơi gặp.
- [ ] Màn lỗi/retry trên client khi một asset bắt buộc tải hỏng: engine reference không có hook báo model tải hỏng mà mình tìm được; chưa làm, cần hỏi đội engine trước khi tự đoán.
- [ ] 3 lần đo boot lạnh: đã chạy 3 lần leave/join + `spawn perf --boot`, nhưng cả 3 dòng trả về là **cùng một mẫu** (12:02 UTC, @8f676e08: đứng sau 1.1 MB, hình đầu sau 13.7 MB, nặng nhất model Hỏa Tủy 2.6 MB vì đài sảnh đang đứng tướng Savi chọn). Chưa có 3 mẫu riêng, chưa phải cache lạnh có kiểm soát.
- Ngân sách tải vào `main` nâng 500 → 520 KB (module trận phải có trước khi đứng; bản tách thêm ~3 KB đầu file).

## Kiểm client HUD trận · 2026-10-09 (body Savi, Chromium 1280×720, không phải máy thật)
- PASS fixture: 8 ca sống/chết × VI/EN × desktop/phone, 0 lỗi render.
- Desktop PASS trong phạm vi đã thử (client desktop, chuột/phím): chuột phải di chuyển, P mở shop, VI→EN, H → Rời trận → về sảnh, sau đó 0 .match-scr / 0 controls. Chưa chốt: Q cast đặt cooldown (lần bấm chưa thấy kết quả rõ), chuột phải trong panel shop không xuyên (quan sát quá ngắn để kết luận). Lớp .match-scr bọc thanh boss chỉ còn mount khi có boss (2026-10-09).
- Phone PASS **giả lập** (devCompact trên desktop, pointer mouse, không phải cảm ứng thật): joystick kéo đi được, Q cast, nút shop mở shop, cụm nút ẩn khi shop mở, ☰ mở drawer, Cài đặt → EN → Rời trận → sảnh, 0 joystick/cụm nút sót.
- Cảm ứng nhiều ngón trên điện thoại thật: NOT RUN.
- Tách touch: controls/touch.js thay lib/hud-touch.js; vị trí/size/ảnh là biến CSS. common.js và hud-touch.js không còn file nào import (chỉ rollback).
- Glyph font (☰ ⚔ ☠ ⚑ ◈ ✕, chip vai trò Heroes) đổi sang SVG: máy thiếu font vẽ ô trống.
- Còn mở: điện thoại thật (cảm ứng đa ngón); một .match-scr rỗng thứ hai trong lớp fixed khi desktop; Room mobile/EN chưa xem live.

### KHOÁ tướng + dọn map main · 2026-10-09
- [x] KHOÁ: tướng đang hiện được chọn hợp lệ, KHOÁ khoá đúng tướng, hết giờ giữ lựa chọn. PASS fixture 6/6; desktop PASS client máy Savi; mobile PASS giả lập; điện thoại thật NOT RUN. Chi tiết ở doc 14.
- [x] Dọn `main`: bỏ 21 décor sảnh cũ + 17 vật ngoài khung camera (push 1476, undo được bằng `spawn undo --of 1476`). Creator đã duyệt kết quả xem 4 góc. `x0z0.scene` 112 → 101 KB (kích thước file, không phải số tải).
- [ ] Số tải `main` mới sau dọn: chưa có mẫu; chưa chấm 500 KB. Model tướng (~2.6 MB) báo riêng, không so với ngân sách code.
