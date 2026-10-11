# 49 · ROADMAP (phase sau): tách place + hợp đồng chuyển place (nguyên văn doc 48 v2.4)

> **2026-10-09: chuyển thành roadmap.** Theo quyết định kiến trúc V1 (doc 48 v3), mọi spike P-1…P-7, timer T1–T7 qua restart, M2/M3/L1, route reload, PvP routing và Gate H là **roadmap phase sau, không chặn vòng hiện tại**. Chỉ mở lại khi số đo (doc 48 §4) chứng minh cần tách place. Phần A0 (§4.1) và S1/S7/M1a đã được kéo sang doc 48 v3 trong phạm vi `main`.

Trạng thái: **ĐỀ XUẤT. Chưa sẵn sàng cho gate H. Chưa triển khai. Không phải USER LOCK.**
Lịch sử:
- v2 (2026-10-08 23:30): theo Codex audit doc 45–47.
- v2.1 (2026-10-08 23:40): theo Codex review doc 48 v2 (main 56ccc309): "useful proposal, not ready for H". Sửa 3 điểm: (1) 450 KB là mục tiêu đề xuất, không phải khoá; (2) bỏ việc dời kho lobby/match/results/ack sang world.state, giữ schema hiện hành tới khi creator ra quyết định thay; thêm danh sách chứng minh trước H; (3) đưa doc 44 S7 (tách hero.js) và phần cài checker scope vào lịch.
- v2.2 (2026-10-08 23:50): theo hội đồng Codex review v2.1. Ưu tiên kiến trúc, HUD để sau. Sửa: (1) reconnect đúng 60 s, dung sai hết hạn sớm = 0 (bỏ phương án ghi 5 s); (2) thêm spike P-7: người ở `sanh` gửi beat + lobbyReq tới trọng tài `main` và nhận ack; (3) route reload **chưa chốt**, kiểm riêng loading/ingame/results; thêm rollback cho người + state đang ở `sanh`; (4) PvP 1v1/3v3 chỉ là **ứng viên routing** tới khi roster profile được chốt. A0: checker phải có fixture lỗi làm lệnh fail. S7: loại import combat/VFX khỏi đường load sảnh, giữ preview.
- v2.3 (2026-10-08 23:55): theo Codex review v2.2 (origin/main@aa7d5733). Đóng 3 điểm trước H: (1) `ctx.world.players/playerCount` là **giả thuyết** cho tới khi P-7 chạy đường thật; M2 có điều kiện, có nhánh dự phòng; (2) timer: mốc hết hạn định nghĩa theo tick trọng tài, giới hạn độ trễ quan sát, test trước/đúng/sau mốc qua restart khi người ở sảnh; bỏ chữ "sai lệch 0" end-to-end; (3) A0: luật scope + 6 ca fixture, orphan phải fail.
- v2.4 (2026-10-08 23:58): Codex đính chính: `ctx.world.players/playerCount` và `ctx.enterPlace` **có** trong engine 6.0.0. P-7 viết lại theo contract skill rooms-and-matchmaking: thư qua dòng `ctx.world.players` (ghi nguyên key), không getObject chéo place, roster/phase trên bảng tin `audience: "all"`, một người ghi; tiêu chí test user state/ack, room scope, single-writer, place rỗng.

Doc này thay thứ tự bước ở doc 45 §2.3 và doc 46 §4. Luật phòng (doc 14 §B0, design.md) **không đổi**.

## 1. Khuyến nghị của Codex → sửa vào kế hoạch

| # | Khuyến nghị | Sửa ở | Trạng thái |
|---|---|---|---|
| C1 | Reload/mất mạng theo doc 14: người trong roster nối lại đúng trận trong 60 s. Sân Tập/Đấu Máy giữ trận + host; rời/hết hạn → huỷ về sảnh; PvP giữ ô/tướng theo luật hiện hành. Ghi route quay lại + xử lý restart. Không tự đổi luật | §3 | khuyến nghị; luật gốc doc 14 dòng 45/55/75, P3/P4 |
| C2 | Gallery x0z1 → place chỉ editor, giữ asset, không xoá | G1 | **gate của creator** |
| C3 | Chưa chốt ngưỡng MB; đo lặp cùng build trên desktop lukasai + điện thoại thật, raw trace; 21.6 / 41.5 MB (và 8.9 MB lần đo 23:39) đều chưa phải baseline. Tách ngân sách code khỏi bytes asset/mạng | §2 | khuyến nghị; máy phone = **gate của creator** |
| C4 | Sảnh không tải toàn bộ combat/VFX runtime, **giữ preview tướng**; scope skillfx theo place/roster bằng import graph + đo | S1, S2 | khuyến nghị |
| R1 | 450 KB là **mục tiêu đề xuất** ở doc 40 C6, không phải khoá | §2 | đã sửa |
| R2 | Giữ schema `place.state.lobby/match/results` + roster đóng băng + ack cùng tick tới khi có quyết định thay của creator | §3.1 | đã sửa; M1b cũ **bị bỏ** |
| R3 | Trước H: map mode→map ID→place; enterPlace là API engine đã kiểm hay helper dự án; chứng minh scope/persistence của kho; test restart sát mốc 60 s kể cả rollback; dung sai ghi lastBeat | §3.5 | chưa chứng minh |
| R4 | Lịch thiếu doc 44 S7 (tách hero.js); checker scope của A1 chưa có | §4 | đã thêm bước |
| V1 | Giữ đúng 60 s, không hết hạn sớm 5 s | §3.1 | đã sửa: dung sai 0 |
| V2 | Chứng minh `sanh` → beat/lobbyReq → trọng tài `main` → ack | §3.5 P-7 | chưa chứng minh |
| V3 | Route reload chưa chốt; kiểm riêng loading/ingame/results; rollback cho người/state ở `sanh` | §3.3, §3.4 | đã ghi; chưa kiểm |
| V4 | PvP 1v1/3v3 = ứng viên routing tới khi chốt roster profile | §3.2 | đã sửa |
| V5 | A0 cần fixture lỗi làm lệnh fail; S7 bỏ import combat/VFX khỏi đường sảnh, giữ preview | §4 | đã sửa gate |
| W1 | API `ctx.world.players/playerCount`, `ctx.enterPlace` **có** trong engine 6.0.0 (Codex đính chính); rủi ro còn lại là semantics/đường dữ liệu, nên P-7 chứng minh đường thật (seq đúng một lần, ack bền đọc từ sanh_thu, cùng room); không có API thì sửa A/B, không đóng đinh M2 | §3.5 | đã sửa |
| W2 | Mốc = lastBeat + 60 s, chuyển trạng thái ở tick đầu tiên ≥ mốc, giới hạn trễ; test quanh mốc qua restart, người ở sảnh | §3.6 | đã thêm; chưa chứng minh |
| W3 | A0: `check` hiện không fail orphan, chưa có scope | §4.1 | đã thêm luật + fixture |

## 2. Đo (gate đầu tiên)

| Ngân sách | Định nghĩa | Mức | Nguồn |
|---|---|---|---|
| Code/arrival | world files + scripts trước khi đứng | **mục tiêu đề xuất ≤ 450 KB** (chưa khoá; engine tự báo vượt 500 KB ở `places/main/config.yaml arrivalBudget`) | doc 40 C6 |
| Asset/mạng | bytes trước hình đầu (bgeo, model, texture, clip) | **chưa có ngưỡng** — chờ baseline | C3 |

Baseline (BL):
- Một build, ghi commit/version; không sửa build trong lúc đo (luật đo).
- Máy: desktop của lukasai + ≥ 1 điện thoại thật (creator chọn). Ghi model, OS, browser + phiên bản, cửa sổ, mức render.
- Mỗi place × máy ≥ 3 boot lạnh; lưu raw `spawn perf --boot --json` ở `reports/perf-baseline-<ngày>/`.
- Báo trung vị + min/max. Không so khác build rồi kết luận nguyên nhân. Máy phụ của Savi không tính.
- Đã thấy cùng `main`, cùng desktop: 41.5 → 21.6 → 8.9 MB qua các bản khác nhau trong một tối → phương sai lớn, càng cần baseline lặp.

Map khối .bgeo (BG): trên **place thử bản sao**, tắt từng nhóm (cỏ, x0z1, karst/rim, đài sảnh), đo cùng máy, ghi hash → nhóm.

## 3. Hợp đồng chuyển place (bản nháp, chưa đủ cho H)

### 3.1 Kho dữ liệu — giữ schema hiện hành
Schema doc 14 §B0.9 giữ nguyên: `place.state.lobby / match / results` của **place trọng tài**, chỉ trọng tài ghi, roster chụp một lần ở `picking → loading` rồi đóng băng, hiệu ứng lệnh + `ack` ghi **cùng một tick**.

| Phương án nơi đặt kho | Mô tả | Cần chứng minh | Trạng thái |
|---|---|---|---|
| **A (mặc định của kế hoạch)** | Kho + trọng tài **ở lại `places/main`** đúng như hiện nay. `sanh` chỉ là sân khấu: màn sảnh đọc kho qua `session.js` từ `ctx.world.places.main.state` | (a) đọc state của place khác từ ui/behavior; (b) **sim của `main` có tick khi không ai đứng trong `main`** (engine: "world ticks near people") — nếu không tick, A không chạy được | chưa chứng minh |
| B | Kho cùng schema chuyển sang `places/sanh` place.state, trọng tài = `places/sanh/sim.js`; map đọc chéo | đổi place trọng tài = đổi owner → cần quyết định creator | không đề xuất trước khi A bị bác bằng số |
| C | Dời sang world.state | xung đột doc 14/design → **bỏ** trừ khi creator ra quyết định thay | bỏ |

| Dữ liệu khác | Hiện tại | Đề xuất |
|---|---|---|
| phase/round/wave/feed/bots/g2 | `places/main` place.state | giữ (map chính là `main`) |
| `lastBeat` | biến RAM của sim (`places/main/sim.js` dòng 18, 218). Mất khi restart → dòng 240 dùng `Math.min(now, lastBeat ?? now)` nên hạn bị **muộn** (tính từ lúc restart), không sớm | ghi bền `lobby.lastBeat[userId]` = đúng giá trị `p.state.beat` **mỗi khi beat đổi** (2 s/người), cùng tick với lần đọc. Giá trị bền luôn bằng giá trị RAM → **timestamp lưu** khớp. Đây mới là khớp dữ liệu, **chưa chứng minh end-to-end**; quy tắc hết hạn + độ trễ ở §3.6. Giá: 1 lần ghi place.state / người / 2 s — đo ở spike P-6 |
| player.state.hero/team/matchId | thân người chơi, đi theo qua place | như cũ; về sảnh sau results → `clearHero` |

### 3.2 Bảng mode → map ID → place
| mode (lobby.yml) | map ID | place | Ghi chú |
|---|---|---|---|
| `san_tap` | `mach_giua` | `main` | 1 người + bot-red-1 |
| `thu_tran` | `mach_giua` | `main` | 1 người + bot |
| PvP 1v1/3v3 | `mach_giua` | `main` (**ứng viên routing**) | chưa chốt tới khi roster profile 1v1/3v3 được chốt; lobby.yml `maps: [mach_giua]` |
| 5v5 3 đường | (chưa có) | (place mới, sau này) | roadmap, không trong đợt này |
Nguồn sự thật: một bảng `mapPlace` trong `scripts/lib/data/lobby.yml` (đề xuất), `map.js` tra; không gắn cứng tên place trong code.

### 3.3 Đường đi
| Sự kiện | Ai | Đi đâu |
|---|---|---|
| Mở game | engine `defaultPlace` | `sanh` (sau M3; trước đó `main`) |
| `loading` | trọng tài | chuyển người **trong roster** sang place của map (§3.2) |
| Không trong roster | — | ở `sanh` |
| `results` | trọng tài | về `sanh` |
| Reload/mất mạng **còn hạn 60 s**, trong roster | **CHƯA CHỐT** | phụ thuộc P-5. Kiểm **riêng từng phase**: `loading`, `ingame`, `results` (bảng P-5). Ý định: về đúng place trận, `hero.js` khôi phục từ `match.saved` (doc 14 dòng 75); `results` → về sảnh xem kết quả |
| Hết hạn | — | ở `sanh`. Solo: trận đã huỷ, `err.practiceLeft`. PvP: ô "đã rời", trận chạy tiếp |
| Chủ bấm Kết thúc / `leave` (solo) | trọng tài | huỷ ngay, mọi người về `sanh` |
| Giữ host 60 s (solo) | như hiện hành | không trao host cho spectator |

### 3.4 Restart + rollback
| Cái restart | Xử lý | Test |
|---|---|---|
| Sim trọng tài | đọc lại kho từ place.state (bền như nay); `lastBeat` từ bản bền; hạn `disconnected` là mốc tuyệt đối `ctx.now()` → không reset | restart ở t = 55 s, 59 s, 61 s sau mất nhịp |
| Sim đổi phiên bản giữa trận (lỗi P4 +58 s) | hạn tính từ lastBeat bền | như P4 |
| Bot thiếu sau restart | sinh lại từ `bots[id]`/`saved` | restart giữa trận Đấu Máy |
| Rollback | công tắc `defaultPlace` một dòng; đài sảnh ở lại `main` tới khi M3 PASS; mỗi bước một commit | **test rollback giữa trận**: đổi `defaultPlace` về `main` khi đang có người ở `sanh`/đang reconnect |

**Rollback cho người + state đang ở `sanh`** (phương án A):
- State: `sanh` **không giữ state có thẩm quyền**. lobby/match/results/ack nằm ở `main` place.state → rollback không phải chuyển hay xoá dòng nào. Gì `sanh` ghi (nếu có) chỉ là trình bày, bỏ được.
- Người đang đứng ở `sanh`: đổi `defaultPlace: main` **không** dời thân đã có (thân là hàng bền). Bước rollback: lệnh một-lần (run_script) chuyển mọi người ở `sanh` sang `main` bằng API chọn ở P-1, `at: "default"`. player.state đi theo (P-2): `lobbyReq.seq`, `team`, `hero`, `matchId` giữ nguyên.
- lobbyReq đang bay: seq + ack idempotent (doc 14 dòng 43) → gửi lại an toàn, không xử lý hai lần.
- Đang trong trận: người ở place trận không bị đụng. Người đang reconnect: hạn `disconnected` là mốc tuyệt đối trong `main` → không đổi.
- Kiểm: rollback ở 3 lúc: sảnh có 2 người đang chọn tướng; giữa `loading`; có người đang trong 60 s reconnect. Gate: không mất ack, không reset phòng, không mất ô.

### 3.5 Phải chứng minh trước gate H (spike trên place thử, không đụng main)
| # | Câu hỏi | Cách chứng minh | Kết quả |
|---|---|---|---|
| P-1 | Chuyển người giữa place dùng gì? `ctx.enterPlace(entityId, { place, at })` có trong tài liệu engine (`api-reference.md` dòng 253–254, `EnterPlaceOptions` dòng 748); `ctx.cross(entity, "<place>")` có trong hướng dẫn engine nhưng **không** trong api-reference. Chọn một, **không** viết helper riêng trừ khi cả hai đều thiếu | gọi trên place thử với thân thật; ghi trả về + `player.place` | CHƯA |
| P-2 | player.state đi theo khi chuyển place? | đặt cờ, chuyển, đọc | CHƯA |
| P-3 | Đọc `ctx.world.places.<p>.state` từ ui.js / behavior ở place khác? | đọc + ghi log | CHƯA |
| P-4 | Sim của place không có người có tick không? (quyết định A sống hay chết) | đếm tick vào state khi place rỗng | CHƯA |
| P-5 | Reload giữa trận đáp ở đâu (`defaultPlace` hay chỗ cũ)? Engine nói thân là hàng bền "a return lands where you stood" → có thể **không** về sảnh | reload trên place thử | CHƯA |
| P-6 | Restart sát 60 s + rollback; đo giá ghi lastBeat mỗi beat | §3.6 bảng T | CHƯA |
| P-7 | Người ở `sanh` gửi presence/beat + lobbyReq tới trọng tài `main`, nhận ack — **đường thật** | xem tiêu chí P-7 dưới | CHƯA |

**Contract engine dùng cho P-7** (engine 6.0.0: `api-reference.md` §State dòng 60–61 `ctx.world.players/playerCount`, dòng 253–254 `ctx.enterPlace`; skill `rooms-and-matchmaking` §"Matches inside one room"). Codex đã đính chính: các API này **có** trong engine; chỉ thiếu ở tóm tắt AGENTS.md. Rủi ro còn lại là **semantics/đường dữ liệu**:
- **Thư qua tường, đọc không qua:** ghi state lên một dòng `ctx.world.players` tới được người đó ở bất kỳ place nào — **ghi nguyên key cấp một** (`row.state.lobbyAck = { seq, err }`), không ghi mảnh lồng.
- `getObject(id)` từ place khác = null (và null khi người đã rời). **Không dùng getObject chéo place.** Rẽ nhánh theo `row.place` trước.
- Cái hai phía cùng đọc (roster, phase, lobby) nằm trên **một object bảng tin `audience: "all"`**.
- **Một người ghi:** chỉ trọng tài ghi sự thật cấp phòng; không có trọng tài thứ hai "sửa" từ place khác.
- Đồng hồ phải sống qua một place rỗng thì **giao cho manager nơi đến** khi người tới.

**Đường dữ liệu đề xuất cho P-7** (giữ schema doc 14: `place.state.lobby/match/results` của place trọng tài vẫn là bản có thẩm quyền):
| Chiều | Dữ liệu | Đường |
|---|---|---|
| người → trọng tài | `state.beat`, `state.lobbyReq {seq, op…}` | người tự ghi `player.state` của mình (như nay); trọng tài đọc qua dòng `ctx.world.players` (`row.state`, `row.place`) — **cần chứng minh đọc được state của người ở place khác** |
| trọng tài → người | ack/err | (1) bản bền `place.state.lobby.ack[userId]` như nay; (2) thư: `row.state.lobbyAck = { seq, err }` nguyên key, cùng tick với hiệu ứng |
| trọng tài → mọi người | lobby (phase, teams, pick, host, clocks), match.roster, results | bảng tin `audience: "all"` (vd. id `phong-bang-tin`), **chỉ trọng tài ghi**, chép từ place.state trong cùng tick. HUD sảnh đọc bảng tin, không đọc chéo place.state |

**Tiêu chí P-7** (place thử `sanh_thu` + `main_thu`; trọng tài thử là bản sao; không đụng `main`; người thật ở `sanh_thu`):
1. **Đọc state người:** trọng tài `main_thu` thấy dòng của người ở `sanh_thu` trong `ctx.world.players`, có `row.place = sanh_thu` và đọc đúng `row.state.beat` mỗi 2 s. `ctx.world.playerCount` đếm cả người ở `sanh_thu`.
2. **Áp dụng đúng một lần:** gửi join → hover → lock (seq 1, 2, 3), gửi lại seq 2 hai lần. Log trọng tài: mỗi seq áp dụng **đúng một lần**, theo thứ tự; lặp bị bỏ.
3. **Ack bền + thư:** sau mỗi seq, `sanh_thu` đọc được `player.state.lobbyAck.seq` (thư) khớp `lobby.ack[userId]` (bản bền, xem qua bảng tin). Restart trọng tài → cả hai còn, không áp dụng lại.
4. **Bảng tin:** HUD ở `sanh_thu` đọc được phase/teams/pick từ object `audience: "all"`; thử ghi từ phía `sanh_thu` lên bảng tin bị **cấm trong code** (chỉ trọng tài ghi) — kiểm bằng grep + log, không có writer thứ hai.
5. **Một người ghi:** chỉ một sim (trọng tài `main_thu`) ghi lobby/match/results/bảng tin; `places/sanh_thu/sim.js` không ghi các key này. Log hai phía 5 phút: 0 lần ghi ngoài trọng tài.
6. **Cùng room:** `ctx.getRoomId()` hai place bằng nhau. Room thứ hai (link `/room:` khác): người room 2 không thấy dòng/bảng tin room 1 và trọng tài room 1 không thấy họ.
7. **Place rỗng:** khi mọi người ở `sanh_thu`, sim `main_thu` **có tick** hay không (P-4). Nếu không tick: theo contract, đồng hồ/sự thật phải giao cho manager nơi người đang đứng → nhánh B.
8. Ghi lại API thật sự làm được 1–7.

**Nhánh theo kết quả P-7:**
| Kết quả | Hướng |
|---|---|
| 1–7 PASS (main_thu tick khi rỗng) | A: trọng tài ở `main`, người đọc qua bảng tin, ack qua thư + bản bền → M2 |
| 1–6 PASS, 7 fail (main rỗng không tick) | B: trọng tài/sự thật ở place có người chờ (`sanh`); khi vào trận giao roster đóng băng + đồng hồ cho manager place trận lúc đến. Đổi place trọng tài = **quyết định owner** |
| 1 fail (không đọc được state người ở place khác) | người phải đứng cùng place trọng tài → B, hoặc giữ sảnh trong `main` |
| nhiều fail | giữ sảnh trong `main` (hiện trạng); hoãn tách place |

**Rủi ro P-7 đã thấy trong code** (đọc, chưa chạy):

- Trọng tài chỉ đọc `ctx.place.players` (dòng 19, 215) → người ở `sanh` **không được thấy**: không beat, không lobbyReq, bị coi là rời.
- Dòng 221: `ctx.place.playerCount === 0` → **reset phòng về mặc định**. Khi mọi người ở `sanh`, `main` rỗng → phòng bị xoá mỗi tick.
- Nếu nhánh A: trọng tài đọc người từ nguồn world-level (lọc place `sanh` + place trận), điều kiện reset đổi theo số người cả room. **Chỉ định hướng**, M2 chưa đóng đinh, chờ P-7.

### 3.6 Timer hết hạn reconnect
- **Mốc:** `deadline[u] = lastBeat[u] + 60 000 ms` (doc 14). `lastBeat` = giá trị `state.beat` cuối trọng tài đọc được, đã lưu bền.
- **Chuyển trạng thái:** ở **tick trọng tài đầu tiên có `ctx.now() >= deadline`**. Không bao giờ trước mốc. Tick trước mốc với `now < deadline` không đổi gì.
- **Độ trễ quan sát:** chạy bình thường ≤ 1 cadence (250 ms) + độ lệch lịch tick (đo ở P-6). Qua restart ≤ thời gian trọng tài vắng + 250 ms. Trễ được phép, sớm thì không. Giới hạn trên cho phép: **đề xuất ≤ 1 s khi chạy, ≤ thời gian restart + 1 s** — chờ duyệt.
- **Quay lại trước mốc:** beat mới với `now < deadline` → xoá hold, giữ ô (luật hiện hành).

**Bảng T — test qua restart, người ở `sanh_thu`** (ghi `now`, `deadline`, tick chuyển, phase):
| Ca | Thao tác | Kỳ vọng |
|---|---|---|
| T1 | quay lại ở deadline − 1 s | giữ ô, không hết hạn |
| T2 | quay lại sát mốc (deadline − 1 tick) | giữ ô |
| T3 | không quay lại | chuyển ở tick đầu ≥ deadline, trễ ≤ giới hạn |
| T4 | quay lại ở deadline + 1 s | đã hết hạn, áp luật hết hạn |
| T5 | restart trọng tài ở deadline − 5 s, người vẫn ở sảnh | sau restart chưa hết hạn; hết hạn ở tick đầu ≥ deadline |
| T6 | restart kéo qua mốc | hết hạn ở tick đầu sau restart, không trước mốc |
| T7 | restart ở deadline − 1 s, quay lại trong lúc trọng tài vắng | nếu beat có trước mốc → giữ ô |
Chỉ khi T1–T7 PASS mới nói "đúng 60 s end-to-end".

**P-5 kiểm riêng theo phase** (reload rồi đọc `player.place` + phase + ô):
| Phase lúc reload | Kỳ vọng theo doc 14 | Kết quả |
|---|---|---|
| `loading` | vẫn trong roster, vào trận khi loading xong | CHƯA |
| `ingame` (còn hạn) | về đúng trận, giữ tướng/vàng/cấp từ `match.saved` | CHƯA |
| `ingame` (hết hạn) | solo: trận huỷ, về sảnh; PvP: ô "đã rời" | CHƯA |
| `results` | thấy bảng kết quả, về sảnh | CHƯA |

P-5 có thể đổi cả §3.3: nếu reload giữ chỗ cũ, người reload còn hạn đã ở đúng place trận, và việc cần làm là đưa người **hết hạn** về sảnh.

## 4. Thứ tự v2.3 (gate PASS mới sang bước sau)

| # | Bước | Gate |
|---|---|---|
| BL | Baseline §2 | trace + bảng trung vị desktop + phone |
| BG | Map khối .bgeo | bảng hash → nhóm |
| S1 | Import graph `skillfx`/`death`/`weapons`/`hero.js` từ 3 điểm vào (player template, camera, bot) | sơ đồ: preview vs chiêu/trận |
| SP | Spike P-1…P-7 trên place thử (không đụng `main`) | bảng §3.5 + bảng P-5 theo phase đủ kết quả |
| H | Creator + Codex duyệt hợp đồng §3 (nơi đặt kho A/B, route reload theo phase, rollback sảnh, roster profile PvP) | chữ duyệt |
| M2 | Theo nhánh P-7 đã chọn ở H (A / B). Thêm bảng tin `audience: "all"` + thư ack; trọng tài vẫn là writer duy nhất | P-7 tiêu chí 1–7 lặp lại trên `main`; PRAC-03/04 PASS |
| M1a | Mọi chỗ đọc lobby/match/results/phase/bots/feed qua `session.js` (≈20+ chỗ, doc 47 §1 #9). **Không đổi kho, không đổi schema** | grep = 0 đọc thẳng; Sân Tập + Đấu Máy như cũ; PRAC-03/04 PASS |
| L1 | `lastBeat` bền, ghi mỗi khi beat đổi; hết hạn theo §3.6 | bảng T1–T7 PASS |
| M3 | `defaultPlace: sanh` + route §3.3 | client thật: sảnh→trận→kết quả→sảnh; reload còn/hết hạn đúng luật; rollback giữa trận |
| S7 | (doc 44 S7) `hero.js` tách core / input / presence; phần trận chỉ chạy ở place map, phần presence (nhịp, lobbyReq, locale) chạy mọi place. **Loại import combat/VFX** (`combat.js`, phần chiêu `skillfx.js`, `feel.js`, `pings.js`) khỏi đường load sảnh; preview tướng (BODY, vũ khí, clip preview) giữ | import graph từ điểm vào của `sanh` = 0 module combat/VFX trận; ảnh preview 6 tướng giống trước; reconnect giữ nguyên |
| S2 | skillfx: phần chiêu/trận import theo roster, phần preview giữ ở sảnh | arrival code sảnh đo lại; ảnh preview tướng như trước |
| G1 | Gallery → place chỉ editor (chờ C2) | boot `main` đo lại |
| P5 | Gỡ đài sảnh khỏi `main` | boot `main` đo lại |
| A0 | Nâng `tools/assets/manifest.py check` theo §4.1 | 6 ca fixture §4.1 đúng mã thoát, trong một lệnh test |
| A1 | Điền `scope`/`usedBy` cho 526 asset | `check` = 0 |
| K8 | Bỏ inline style theo token UI | đếm trước/sau; so ảnh |

### 4.1 A0 — luật scope + fixture
Hiện trạng (đọc `tools/assets/manifest.py` dòng 246–257): `check` trả 1 chỉ khi có asset chưa khai báo hoặc sai danh mục. **Orphan (khai báo nhưng không còn dùng) chỉ in ra, không fail.** Chưa có trường `scope`.

Trường `scope` bắt buộc trong `assets/registry.yml`:
| scope | Nghĩa | Được tham chiếu từ |
|---|---|---|
| `shared` | dùng mọi place (font, UI, âm chung) | mọi file |
| `place:<id>` | chỉ một place (`place:main`, `place:sanh`) | `places/<id>/**`, script chỉ place đó gắn |
| `dynamic` | tải theo roster/sự kiện sau khi đứng (chiêu, tướng) | chỉ qua đường import()/onArrive; cấm trong `.scene`/config boot |
| `preview` | preview tướng ở sảnh | place sảnh + module preview |
| `docs-only` | chỉ tài liệu/ảnh tham khảo | `docs/**`; cấm trong runtime |
Giá trị khác = lỗi. Script dùng chung ở nhiều place: lấy scope theo nơi gắn (bảng tra trong manifest).

Ca fixture (`tools/assets/fixtures/<ca>/`, lệnh `python3 tools/assets/manifest.py test`):
| Ca | Nội dung | Mã thoát |
|---|---|---|
| F0 sạch | mỗi scope một asset đúng chỗ | 0 |
| F1 sai place | asset `place:sanh` trong `places/main/cells` | ≠ 0 |
| F2 thiếu scope | dòng registry không có `scope` | ≠ 0 |
| F3 scope lạ | `scope: lobby` | ≠ 0 |
| F4 ref runtime chưa khai báo | `.scene` dùng `/cdn/x` không có trong registry | ≠ 0 |
| F5 orphan | registry khai báo asset không file nào dùng (trừ `docs-only` có tham chiếu trong docs) | ≠ 0 |
Gate A0: F0 PASS, F1–F5 mỗi ca fail đúng lý do in ra. A1 (điền scope 526 asset) chỉ sau A0.

Bỏ: đổi tên `main`; dời kho sang world.state (phương án C). HUD: để sau, ngoài doc này.

## 5. Gate của creator
1. C2 gallery → place chỉ editor?
2. Điện thoại nào cho baseline?
3. Duyệt hợp đồng §3 sau khi spike SP có kết quả (không duyệt trước).
4. Giới hạn trễ hết hạn §3.6 (đề xuất ≤ 1 s / restart + 1 s).
5. Roster profile PvP 1v1/3v3 (để chốt routing).
6. Nếu P-4 / P-7 cho thấy phương án A không chạy được: chọn B (đổi place trọng tài) hay giữ sảnh trong `main`.
