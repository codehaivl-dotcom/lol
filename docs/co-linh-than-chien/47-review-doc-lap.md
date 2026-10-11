# 47 · Review độc lập: kế hoạch 45 và tự audit 46

> **Thứ tự bước và hợp đồng chuyển place nay ở doc 48 (v2, theo audit Codex 2026-10-08).** Chỗ nào khác doc 48 thì doc 48 thắng. Mốc 41.5 MB / 21.6 MB không phải baseline.


Người review: wisp độc lập (chỉ đọc + đo readOnly, không sửa code/scene/config). Ngày 2026-10-08, world ~v1188.
Nhãn: **ĐO** = số engine/lệnh · **ĐỌC CODE** = dòng file dẫn ra · **SUY LUẬN** = suy ra, chưa kiểm.

## 1. Kiểm từng nhận định doc 46 §3

| # | Nhận định 46 | Kết luận | Dẫn chứng | Nhãn |
|---|---|---|---|---|
| 1 | Vào sảnh tải **41.5 MB**, 5 khối 18.6 MB | **CHƯA ĐỦ** làm mốc | `spawn perf --boot` bản sau trên desktop người chơi: hình đầu **21.6 MB**, khối 7.4/4.6/1.9/1.1 MB + 862 KB (khối 3.6 MB biến mất). Hai bản build khác nhau, chưa ai giải thích vì sao giảm 20 MB. Doc 45 M3 vẫn so với 41.5 → mốc sai | ĐO |
| 2 | Boot `sanh` 776 KB không so được | **ĐÚNG** | Đo trên máy builder, không chạy `templates/player.js` (hero.js…), không model tướng | ĐO |
| 3 | Gói code 578 KB; nặng: x0z0 118 KB, hero.js 56 KB, skillfx 51 KB | **ĐÚNG về thứ tự**, số là số nén của engine | `wc -c`: x0z0.scene 112 089 B, hero.js 62 627 B, skillfx.js 56 697 B (thô) | ĐO |
| 4 | skillfx.js vào boot **qua camera.js** | **SAI một nửa** (thiếu đường chính) | Import tĩnh ở `camera.js:10` **và** `hero.js:15` **và** `bot.js`. `templates/player.js` gắn `hero.js` cho mọi người chơi ở **mọi place** → gỡ khỏi camera.js không gỡ được skillfx khỏi boot sảnh | ĐỌC CODE |
| 5 | Model tướng chỉ tải khi có thân mang | **ĐÚNG về code, chưa ĐO** | `heroes.js:11-16` BODY là URL; chỉ dùng khi `armBody`/spawn thân. Nhưng `camera.js:47` dựng thân xem trước ở sảnh → sảnh tải ít nhất 1 model + clip GESTURE (`heroes.js:19-20`). Chưa có số đo trận | ĐỌC CODE |
| 6 | 5 khối .bgeo chưa biết là gì | **ĐÚNG** | Xem §2 | ĐO |
| 7 | Một place gánh 3 vai | **ĐÚNG** | x0z1: 15 model .glb trưng bày + rubble/crystal; x0z0 233 vật gồm đài sảnh tại (31.1, 26, 31.1) | ĐỌC CODE |
| 8 | places/main/sim.js vừa trọng tài phòng vừa trận | **ĐÚNG**; root `sim.js` **rỗng** (`tick(ctx) {}`) | `sim.js` 5 dòng. Bản đồ kiến trúc nói root sim ẩn thân → sai, việc đó không có | ĐỌC CODE |
| 9 | "**6 chỗ** đọc thẳng place.state.lobby/match (hero ×2, bot, ui, camera, lobby-stage)" | **SAI** | grep `place.state` ngoài referee: bot 6, hero 4, lane 3, session 5 (hợp lệ), common 3, hud-std 2, mobile 1+1, shell 1, g2log 1, ui 1, camera 1. `lobby-stage.js` **không** đọc `ctx.place.state` (nhận `ps` qua tham số). Doc 45 ghi `shell.js`, doc 46 ghi `lobby-stage.js` → hai doc tự mâu thuẫn. Phạm vi thật ≈ 20+ chỗ nếu tính phase/bots/feed | ĐỌC CODE |
| 10 | hero.js 62 KB nhiều vai | **ĐÚNG** | 62 627 B, 15 import | ĐỌC CODE |
| 11 | Thêm tướng = phình skillfx | **ĐÚNG** | 1 file 56.7 KB cho 6 tướng, import tĩnh 3 nơi | ĐỌC CODE |
| 12 | **416** inline style; room 61, common 56, heroes 44, mobile 26 | **Số từng file ĐÚNG, tổng CHƯA ĐỦ** | grep `style="`: room 61, common 56, heroes 44, mobile 26 khớp; screens+ui+hud-std+hud-touch = **277**; quét rộng hơn ra 413. Không ra 416 với phạm vi nào đã thử | ĐO |
| 13 | Router HUD khớp 20 trạng thái | **CHƯA ĐỦ** | Chỉ giả lập; chính 46 tự nói | — |
| 14 | Reconnect 60 s phải chạy qua 2 place | **ĐÚNG nhưng thiếu cơ chế** | `places/main/sim.js:18` `lastBeat` là **biến module trong RAM** của sim place; `:240` hạn = lastBeat + 60 s. Đổi place/sim → mất bộ nhớ này | ĐỌC CODE |
| 15 | Bot sinh ở place map, trọng tài ở world | **ĐÚNG, đánh giá nhẹ quá** (🟡) | `places/main/sim.js:41` spawn bot bằng `ctx.spawn` ngay trong place; `place.state.bots` được HUD đọc (`common.js:64,338`). Dời referee là dời cả chỗ sinh + chỗ HUD đọc | ĐỌC CODE |

## 2. Map 5 khối .bgeo

| Khối | Map được? | Ghi chú |
|---|---|---|
| 7.4 / 4.6 / 3.6 / 1.9 / 1.1 MB (+862 KB bản sau) | **KHÔNG** | perf chỉ trả hash, không trả tên/script/ô. `tools/perf/geo_rows.py main` liệt kê **89** placement scripted trong 15 ô (waterfall, crystal-cluster, ruin-pillar, rubble, bridge, balustrade, drum-stone, reed-clump, tower, bird-head, banyan, roots, …) nhưng không có cột triangles/bytes để ghép hash. ĐO |
| Ứng viên | SUY LUẬN, không dùng làm quyết định | Địa hình + lớp cỏ scripted (`scripts/grass.js`, density 30) và các rim/karst nhiều instance là nghi phạm hợp lý; không có số. Khối 3.6 MB mất giữa hai lần đo cho thấy một thứ đã đổi trong khoảng đó → dò `spawn versions` giữa hai mốc là cách rẻ nhất |
| Cách map đúng | đề xuất | Trên **bản sao place thử** (không phải `main`): bỏ từng nhóm script (tắt cỏ, tắt x0z1, tắt karst) rồi `perf --boot` cùng máy; khối nào biến mất là của nhóm đó. 4–5 lần đo là đủ |

## 3. Bỏ sót / sai trong 45 và 46

| # | Vấn đề | Nhãn |
|---|---|---|
| B1 | **Player template là của world**: `hero.js` (+ skillfx, combat, weapons, findPath) chạy ở mọi place. Sảnh riêng vẫn kéo ~120 KB code trận. Mục tiêu "<5 MB" có thể đạt về hình, nhưng ngân sách code 450–500 KB thì không, nếu không cho hero.js import động/ngủ ở sảnh | ĐỌC CODE + SUY LUẬN |
| B2 | **M1 không "rẻ, không đổi hành vi"**: 45 M1 gồm dời lobby/match/results sang `world.state`; hiện **0 chỗ** dùng `world.state` (grep). Đây là đổi chỗ lưu + phạm vi (room) — đổi hành vi. Phải tách M1a (đọc qua session.js, không đổi chỗ lưu) và M1b (đổi kho) | ĐỌC CODE |
| B3 | **Reconnect sau reload rơi về `defaultPlace`**. Khi `defaultPlace: sanh`, người reload giữa trận đáp xuống sảnh; không có bước nào đưa lại map trong 60 s (cần `onArrive`/`arrival.js` gọi `ctx.enterPlace({ place, at: "last" })` theo `match.roster`). 45/46 không nêu | ĐỌC CODE (world.config.yaml:6, engine `enterPlace`) + SUY LUẬN |
| B4 | **`lastBeat` trong RAM sim**: referee phòng ở world sim không thấy beat của người đang ở place map trừ khi đọc `ctx.world.players`; restart sim → mất mốc 60 s | ĐỌC CODE |
| B5 | **player.state đi theo người qua mọi place** (engine: "player.state is the player's saved data"). Hero/team/progression trận cũ sẽ mang vào sảnh; cần quy tắc xoá khi về sảnh, nếu không sảnh hiển thị/ẩn thân sai | ĐỌC CODE + SUY LUẬN |
| B6 | **Camera sảnh gắn cứng** `STAGE = {31.1, 26, 31.1}` (`lobby-stage.js:6`), shot `pick` dùng cả ở phase `loading`. Nếu loading diễn ra khi người đã ở place map và M4 bỏ đài khỏi map → camera nhìn vào khoảng trống. `sanh` hiện giữ đúng toạ độ (scene dòng 47/60) nên trước M4 thì ổn | ĐỌC CODE |
| B7 | **Đổi tên `main` → `mach_giua` (M4)** đổi địa chỉ place: link, portal, `defaultPlace`, bản đồ kiến trúc, mọi `ctx.cross(...,'main')` (arrival.js:6). Lợi ích chỉ là tên; rủi ro thật | ĐỌC CODE + SUY LUẬN |
| B8 | **Rollback**: 46 nói "một `spawn undo`" nhưng M2/M3 chạm ≥4 file + config; một undo chỉ lùi một commit. Cần công tắc: `defaultPlace` là cờ một dòng, giữ đài trong `main` tới hết M3 | SUY LUẬN |
| B9 | **Sổ asset không giảm tải** (46 tự nhận đúng). Thêm: cột `bytes` trong sổ sẽ lệch số engine (engine nén/bgeo); budget phải lấy từ `perf --boot`, không từ sổ | SUY LUẬN |
| B10 | Mốc so sánh: 45 vẫn dùng 41.5 MB sau khi đã có 21.6 MB. Không có mốc phone | ĐO |
| B11 | `sanh` có địa hình + lớp cỏ scripted (density 30) → chính nó có thể sinh .bgeo lớn; chưa đo trên máy người chơi | ĐỌC CODE |

## 4. Chấm điểm (10 = tốt nhất; "rủi ro" 10 = rủi ro được kiểm soát tốt)

| Kế hoạch | Đúng hướng | Rủi ro | Đo được | Khả thi | Ghi chú |
|---|---|---|---|---|---|
| Doc 45 | 7 | 3 | 5 | 5 | Đúng đòn bẩy (tách place) nhưng M1 trộn đổi kho, thiếu reconnect/routing, mốc đo sai, M4 đổi tên thừa |
| Thứ tự 46 §4 | 7 | 4 | 6 | 6 | Sửa đúng thứ tự A1, thêm A2b; nhưng gọi M1 "rẻ", ghép M2+M3 một bước, đặt đo **sau** khi tách, A2b chỉ nhắm camera.js |

## 5. Kết luận

**Nên làm đầu tiên**
1. **Đo trước khi tách**: `perf --boot` trên máy người chơi (desktop + một phone) cho `main` bản hiện tại, rồi map các khối .bgeo bằng loại trừ trên place thử (§2). Không có bước này, M3 không có "trước". (ĐO)
2. **Gỡ skillfx khỏi import tĩnh ở cả 3 nơi** (`hero.js:15`, `camera.js:10`, `bot.js`) → `import()` theo tướng khi vào trận. Độc lập với tách place, đo được ngay bằng gói code boot, đúng K6. (ĐỌC CODE)
3. **Viết hợp đồng chuyển place trước code**: ai gọi `enterPlace`, khi reload giữa trận về đâu trong 60 s, `lastBeat` lưu ở đâu, player.state nào xoá khi về sảnh, camera loading nhìn gì. Rồi M1a (chỉ đọc qua session.js, không đổi kho). (SUY LUẬN)

**Không nên làm**
1. Không dời lobby/match/results sang `world.state` cùng lúc với tách trọng tài (M1b+M2 một commit) — không rollback được.
2. Không đổi tên `main` → `mach_giua` (M4) trong đợt này; tên không giảm byte nào.
3. Không làm A1 (526 dòng scope/bytes) như công việc tối ưu tải; sổ không đổi cái engine tải.

**Creator cần chốt**
1. Reload giữa trận (Sân Tập/Đấu Máy): quay lại **map** đang đánh hay về **sảnh** và huỷ?
2. Phòng trưng bày quái x0z1: bỏ khỏi game, hay place riêng chỉ editor?
3. Máy chuẩn để đo (desktop nào, phone nào) và ngưỡng: "hình đầu < X MB trên phone"?
4. Chấp nhận sảnh vẫn chạy code trận (hero.js) hay muốn đầu tư tách behavior người chơi theo place?
