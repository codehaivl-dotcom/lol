# Sim profile `slice` — 2026-10-08 (doc14 §G2 bước 2)

**Status: TBD-SIM.** Kết quả mô hình trên số đang ship, chưa hiệu chỉnh bằng đo thật. Không phải balance PASS, không đề xuất đổi số ở vòng này.

## Build / data / lệnh
- Rev2 (2026-10-08, review Codex): sửa 3 lỗi công cụ — `siege()` bỏ qua raw ≤ 0 (không mốc siege giả, không chặn hồi khiên); trong push trụ bắn trước, tướng chết cùng bước không siege; percentile chỉ tính trận kết thúc, timeout 60' đếm riêng. Chạy lại cùng `--n 300 --seed 1000`. Hash LF.
- World build: seq 570 (lane.js log `siegeAt`) + công cụ ở seq 571, báo cáo seq 572; số gameplay không đổi.
- Data (sha256 12 ký tự): `structures.yml` ae6e459b6eb6 · `economy.yml` 358a649c64a4 · `heroes.yml` d2a5707083cb · `slice.mjs` 23eef1005e3a (bản sửa rev2) · `match.mjs` 52f8653e3ad5 · `duel.mjs` 597f65b11ddf.
- Lệnh: `bun tools/balance/match.mjs --profile slice --n 300` (seed 1000–1299 mỗi mode; JSON đầy đủ: `balance-sim-2026-10-08-slice.json`). Profile `v1` (`bun tools/balance/match.mjs`) giữ nguyên.

## Số ship dùng
T1 2800 / T2 5400 (armor 40/65, trụ 150 / 1,2 s) · Tâm Mạch 4000 + khiên 3000 (armor 20, khiên hồi 25%/s sau 12 s) · tia 120 / 1 s, ramp +0,2 mỗi phát, ưu tiên tướng · wave 30 s, đầu T+5 s, 3 melee/2 caster/1 siege (dps công trình 132,6, 171 g, 290 xp; tổng `minions.kinds` × `composition`) · Siêu Linh Binh +1/trụ đổ (dps 82,4, 80 g, 110 xp) · 500 g đầu, 3 g/s, hồi sinh 12 s, kill 300 g/300 xp, trụ đổ 150 g + 120 xp mỗi người.

## Tắt (chưa ship ở Slice)
Call, Titan, camp/rừng, fortify (−70% tới 840 s), keep, boon, bộ HP thử ×3,5.

## Abstraction còn lại / giả định
| Knob | Giá trị | Ghi chú |
|---|---|---|
| `reachSeconds` | 6 | **TBD-MEASURE** — giây dps thô của wave thắng thế đánh vào trụ mỗi chu kỳ; thay bằng đo bước 3 |
| giao tranh | Σ sức tướng ^1,6, xác suất 0,15 / chu kỳ | không mô phỏng chiêu, vị trí, CC |
| sức tướng | `duel.mjs makeHero` (chỉ số + vàng × 0,85 vào build) | |
| hero siege | Σ AD×AS × 2 × chênh lệch | công thức laning của mô hình V1 |
| thủ dưới trụ | ×(1 + 0,6 / 0,9 / 1,3) | hệ số V1 |
| wave đỡ đạn trụ | 75% | tia Tâm Mạch không có wave đỡ |
| Đấu Máy | bot = một tướng cùng mô hình | **không** mô phỏng hành vi bot.yml → kết quả trùng Tái Hiện 1v1 |
| mốc siege | lần đầu công trình nhận damage | chip lẻ sớm kéo dài “thời gian phá” |

## Kết quả rev2 (300 trận / mode, seed 1000–1299; phút)
p10/median/p90 chỉ tính **trận kết thúc**. Timeout = trận chưa kết thúc lúc 60' (censored, không phải kết thúc 60'); “median gồm timeout” coi timeout là 60', là cận dưới.

| Mode | Kết thúc | Timeout 60' | Trong khung đề xuất 12–20' | p10 | median | p90 | median gồm timeout | Xanh thắng | Kill/trận | Cấp cuối TB | Đổ T1 / T2 / Tâm Mạch (median, phe đỏ) | Phá (đổ − siege) T1 / T2 / TM |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sân Tập (1 người, không địch) | 100% | 0 | 0% | 3,3 | 3,6 | 4,0 | 3,6 | 100% | 9,3 (tướng chết dưới trụ) | 4,0 | 0,6 / 1,8 / 3,6 | 0,6 / 1,3 / 1,6 |
| Đấu Máy 1v1 | 81,3% | 56 | 22,3% | 16,2 | 23,1 | 31,3 | 25,1 | 39,3% | 10,7 | 13,0 | 7,6 / 15,6 / 22,7 | 6,9 / 7,9 / 9,6 |
| Tái Hiện 2v2 | 94,7% | 16 | 8,7% | 20,1 | 32,8 | 46,1 | 33,6 | 44,3% | 13,2 | 11,1 | 7,6 / 19,1 / 32,7 | 7,0 / 9,5 / 13,6 |
| Tái Hiện 5v5 | 99,0% | 3 | 17,0% | 16,2 | 26,7 | 43,1 | 26,7 | 53,0% | 31,7 | 7,0 | 6,2 / 16,6 / 26,7 | 5,7 / 8,5 / 8,6 |

Độ nhạy `reachSeconds` (Tái Hiện 5v5, median trận kết thúc): 3 → 27,7' (khung 14,7%, 3 timeout) · 6 → 26,7' (17,0%) · 10 → 24,6' (24,0%, 2 timeout).

## Đọc kết quả (chưa kết luận)
- Mô hình cho Slice dài hơn khung đề xuất 12–20' ở mọi mode có địch; 1v1 có 56/300 trận timeout. Sân Tập đẩy hết trong ~3,6' (bình thường: không ai thủ).
- Ghi chú cũ “mô hình cho trung vị ~5 phút” (14 §G G2) là mô hình khác (V1, không tách mode); không dùng số đó.
- Trước khi đề xuất HP: cần đo thật bước 3 để thay `reachSeconds`, kiểm tốc độ phá Sân Tập (sim 0,6' cho T1 khi solo + wave) và xác nhận Đấu Máy với bot thật.

## Đo thật (bước 3) — PARTIAL (xem Live run 1)
Review công cụ rev2 đã chốt (Codex, main 4a5339c). Chỉ có một dev room `main`, dùng chung với creator. Quyền dùng phòng: @lukasai cho phép “bạn và savi làm, ko cần hỏi gì tôi” (Codex chuyển lời, #16702). Live run 1 đã chạy, kết quả bên dưới. Không sửa routing production.

Fixture: `tools/measure/g2-fixture.js`, gồm 3 khối dán vào `run_script` (room dev). Không script game nào import file này, và nó không đổi số gameplay nào.
- `READ` (readOnly) xuất một dòng log: mode, matchId, round, phút trôi, wave, các tướng (hero/phe/cấp/số item), và mỗi công trình có `siegeMin`/`downMin`/`breakMin`/hp/khiên.
- `ALLY_ON`: chỉ chạy trong dev room + Sân Tập + đang ingame, ngoài ra từ chối. Nó thêm `g2-ally-1`, một tướng `scripts/bot.js` phe xanh, cùng luật với bot Đấu Máy, hero cố định mỗi lần chạy.
- `ALLY_OFF`: gỡ ally và dòng điểm của nó.

| Ca | Thiết lập | Dừng | Status |
|---|---|---|---|
| (a) wave một mình | Sân Tập; host đứng ở bệ xanh, không vào gần công trình đỏ | `nexus-red` đổ hoặc 25' | NOT RUN |
| (b) wave + 1 tướng | Sân Tập; host đi cùng mỗi wave, chỉ đánh công trình khi lính mình đỡ đạn | như trên | NOT RUN |
| (c) wave + 2 tướng cùng phe | (b) + `ALLY_ON`. Nếu có 2 người thật cùng đội Tái Hiện thì dùng 2 người thay ally | như trên | NOT RUN |

Reset giữa các lần chạy: `ALLY_OFF` → host bấm **Làm lại** (round+1, `startedAt` = now, `siegeAt`/`towersDown` = {}, reset lane, tướng về cấp 1/không item/hết hồi chiêu) → chạy `READ` để kiểm `structures` = {} và phút ≈ 0 → `ALLY_ON` (ca c). Kết thúc: `ALLY_OFF` rồi mới bấm **Kết thúc**.

Format một dòng kết quả: `ca | build seq | mode | hero host (+ ally) | đổ T1 / T2 / TM (phút từ startedAt) | phá = đổ − siege T1 / T2 / TM | cấp cuối | ghi chú (host chết, wave kẹt…)`. Số này thay `reachSeconds` và kiểm chỉ số "phá" ở bảng trên. Không suy ra PASS.

Đã dry-run lúc 2026-10-08 trong sảnh: `READ` trả đủ 6 công trình, `structures` = {}; `ALLY_ON` từ chối đúng (`tai_hien`, `lobby`) và không spawn gì. Lúc dry-run phát hiện 3 thân `dummy-a/b/c` (tag `bot-hero`, phe xanh, giữa map) còn sót từ test boss. Chúng được tính là tướng xanh, sẽ nhận thưởng trụ và làm sai số đo, nên đã gỡ khỏi phòng (live-only, không có trong scene).

Log runtime sẵn có từ seq 570: `place.state.siegeAt[id]` (ms từ `startedAt`, lần đầu nhận damage, tính cả khiên Tâm Mạch) và `place.state.towersDown[id]` (ms, có cả `nexus-*`). Reset hoặc vào trận sẽ xoá cả hai. id: `tower-{blue,red}-t{1,2}`, `nexus-{blue,red}`. Từ seq 584 hai map mang `_round` (xem mục Reset trace). Đã có Live run 1.

## Live run 1 — shared dev `main`, 2026-10-08 (Savi operating, Codex not operating)

Build: world seq 580 (creator telemetry showed spec v579; one stable runtime build NOT confirmed). Map Mạch Giữa, mode **Sân Tập**, gameplay data unchanged.
Operator body: lukasai's Savi (helper client), hero Mộc Lâm lv1, 0 items, **stood at the fountain the whole time (dealt no structure damage)**. lukasai watched as a spectator.

| Case | Setup | siegeAt T1 | towersDown T1 | T1 break time | Status |
|---|---|---|---|---|---|
| (a) waves only | round 18, no allies | 170.2 s | — | not broken: 2800→1999 HP after ~196 s of siege (≈4.1 HP/s), stopped at 6.1 min | PARTIAL / censored |
| (b′) waves + 1 dev bot ally | round 19 after Làm lại; fixture `g2-ally-1` Nham Vũ (scripts/bot.js, blue) — at 7.55 min: lv3, 235 xp, [iron_plate], cs 21, 0 deaths | 103.8 s | 471.3 s | **367.5 s** | MEASURED (1 run) |
| (b) waves + host hero | — | — | — | — | NOT RUN (the operator did not fight; (b′) uses a bot ally, not a person) |
| (c) waves + 2 allies | — | — | — | — | NOT RUN (the ~20 min window ran out) |

T2 / Tâm Mạch: untouched in both runs (T2 5400, nexus 4000+3000 shield) → T1→T2→Tâm Mạch chain NOT RUN.

**Instrument issue seen (not fixed):** right after Làm lại (round 18→19, T1 back at 2800), `place.state.siegeAt` still held round 18's `tower-red-t1: 170166` in two reads (0.16 and 0.3 min). sim.js:197 clears it in source; the cause is not established (the reset may not have gone through that path, or the read was stale). siegeAt was cleared by hand before (b′); its 103.8 s value is a fresh write. Check before the next run.

Cleanup checked: fixture removed (0 bot-hero / g2-fixture), lobby phase=lobby, mode tai_hien, host = lukasai, Savi body out.
Status: BAL-02S stays **TBD-SIM**. One run per case is not a balance verdict. HP proposals wait for calibration.

## Reset trace — dev `main`, 2026-10-08 (Savi operating, helper body as host; Codex not operating)

Goal: tell apart "reset never cleared" from "an old writer wrote it back", and stop old-round data mixing into a new round. Gameplay numbers unchanged.

Change (seq 584–586, log only, nothing in gameplay reads it):
- `scripts/lib/g2log.js` (new). `siegeAt` / `towersDown` are now `{ _round, <id>: ms }`. The referee opens each round with whole new objects (`g2Open`, at `beginMatch` and at `practice/reset`). `lane.js` writes through `g2Mark(key, id, laneRound)`, which refuses unless lane's own reset round == `place.state.round` == the row's `_round`; a refusal goes to the trace once per key/id/round.
- `place.state.g2Trace`: the last 24 events (`open:begin|reset`, `laneReset`, `siegeAt`, `towersDown`, `refused:*`), each with `at`, `round`, `startedAt`; `open:*` also keeps a copy of the rows it replaced.
- `tools/measure/g2-fixture.js` READ now returns `logOk` (both rows' `_round` == round) and `logRound`. **A row with `logOk:false` is not recorded.** Hand-clearing is not acceptance.

What was observed:
1. After saving seq 583–585, pressing Làm lại (rounds 21→22, 22→23, 23→24) still gave `siegeAt: {}` with no `_round` and no trace, while a run_script import of the same files showed the new exports. The running dev referee had **not picked up the saved sim.js/lane.js** until `spawn engine restart-rooms` (dev only). This is an observation of this session; whether the same lag caused run 1's stale value is **not proven**.
2. After restart (runtime seq 585, then 586): Làm lại 24→25 → `open:reset` then `laneReset from 24` 33 ms later, rows `{_round:25}`. A test hit (dev write, −300 HP on red T1) → `siegeAt {_round:25, tower-red-t1: 23933}` with a `siegeAt` trace row.
3. **The run-1 situation, repeated:** with that round-25 mark standing, Làm lại 25→26 → rows `{_round:26}`, T1 2800, no refused write, no old value back. After a second restart on seq 586, Làm lại 26→27 → `before` correctly showed round 26's rows, then `{_round:27}`.
4. Map state semantics: assigning a whole new object replaces the row (no merge of old keys) in every read above.

Status: reset clears the log **on seq 585/586 after a room restart — PASS (dev, 3 resets, scripted test hit)**.
Client retest (Codex operating, client source 55249a0, after seq 586; match 17 Sân Tập, hero moc_lam): Làm lại ×3, round 28→29→30→31. Minions made a natural siege on **blue** T1 in round 29 at 139066.67 ms; reset 30's trace `before` kept that mark, after = `{_round:30}` only, `laneReset` 33.33 ms later; reset 31 and cleanup clean. No scripted damage, no hand-clearing, no bot — **PASS client reset with natural siege**. Codex notes the API reported specVersion 0, so runtime 586 is not independently proven by that read. Rời trận in Sân Tập: req 74 op leave, ack 74, lobby at once — PASS (Đấu Máy button NOT RUN). Room returned: lobby / tai_hien / host lukasai / 0 bots. Stale-value root cause in run 1: **not established**. Not yet tested: a real `towersDown` across a reset.
Cleanup: Savi ended the match (Kết thúc), body out; room lobby, mode tai_hien, 0 bot-hero, red T1 2800. Host is empty until lukasai's tab is live again (their body was parked at check time).

## Live run 2 — case (a) full, shared dev `main`, 2026-10-08 (Savi operating, Codex not operating)

Build: world seq 588 (G2 log with `_round`, from seq 584–586). Map Mạch Giữa, mode **Sân Tập**, match 18, round 32. Gameplay data unchanged. Operator body: lukasai's Savi (helper client), Mộc Lâm lv1, 0 items, stood at the blue fountain the whole run, dealt no damage. No bot, no scripted damage, no hand-clearing. Every READ had `_round` == 32.

| Structure | siegeAt | towersDown | break = down − siege | Note |
|---|---|---|---|---|
| tower-red-t1 (2800) | 252.8 s | 1013.6 s (16.89 min) | **760.8 s** (12.7 min) | waves only |
| tower-red-t2 (5400) | 1085.4 s | 1393.3 s (23.22 min) | **307.9 s** (5.1 min) | waves only |
| nexus-red (4000 + 3000 shield) | — | — | — | not reached by 25.0 min → **censored** |
| tower-blue-t1 (2800) | 528.8 s | — | at 25 min: 1056 HP | red waves also pushing |

Stopped at 25.01 min, wave 50. Status: **case (a) MEASURED (1 run), nexus censored** — T1→T2 observed, T2→Tâm Mạch not reached. Run 1's (a) remains PARTIAL; the two runs differ (run 1 T1 siege at 170.2 s, 4.1 HP/s; run 2 252.8 s, ≈3.7 HP/s average to the fall) and one run each is not a distribution.

Reset with a real `towersDown` standing (Làm lại right after the run, round 32→33): trace `before` held round 32's 4 siege and 2 down marks; after = `{_round:33}` in both rows, red T1 2800 / T2 5400 not fallen, `laneReset from 32` 100 ms later — **PASS (dev, Savi operating)**.

Cleanup: Kết thúc → lobby, mode set back to tai_hien, 0 bot-hero, Savi body out. Host empty until lukasai's tab sends its heartbeat again.
Still NOT RUN: (b) waves + host hero pushing, (c) waves + 2 allies, Tâm Mạch break time, Đấu Máy Rời trận button. BAL-02S stays **TBD-SIM**; HP proposals wait for calibration.

## Case (b) setup — 2026-10-08 (not measurements)
- **Excluded / unverified:** match 19, round 34–35, Savi reported a roughly five-minute attempted run after the initial assignment to use Jev; it was stopped after Codex corrected that assignment (only Codex's side has Jev). No structure damage (`siegeAt {_round:35}` empty). The later clarification was that Jev TypeSafe is Codex's model, not a separate agent on Savi's side; this attempt is excluded and not a measurement. Room returned. Not a (b) run.
- **PILOT (Codex operating, creator's body, client source c8ace71, UI v594):** match 20, round 36, Sân Tập, moc_lam, no items. Hero died once near red T1 before pushing, cs 0, no `towersDown`. Ended deliberately (lobbyReq seq 79 `practice/end`) at 5.31 min. Marks seen: siegeAt blue T1 134.2 s, red T1 227.8 s. Not a (b) run.
- Item policy for every (b) run: **no shop** (items []).
- New read-only fixture block `READ_T1` (`tools/measure/g2-fixture.js`): around one structure (default `tower-red-t1`, 24 m), alive minions by team (kind/hp/dist/xz), tower `aim` + kind + distance, heroes (hp/dead/level/dist/xz/in 14 m tower range). Hero `order` is client session state and is not readable server-side (always null). Dry-run in lobby: tower at (31.5, −31.5), 2800 HP, no aim, no units.
Case (b) stays **NOT RUN**.
- **Not counted (input source unclear):** match 21, round 37, creator's body, source `e9d4106`. Lukasai said they controlled the creator Chrome and Savi should only READ/log; Lukasai reported clicking only the minimap and pressing S, yet screenshot/READ showed Q/W cooldowns, CS and movement (26.5,−17.8)→(−8,−5.4) they had not issued. They paused input, requested helper checks and no overlapping End, and explicitly said the source was unknown—not evidence of a game fault. Savi's side: Jev stopped 12:47, Savi body out, no helper running; code inspection found no auto-walk/auto-cast, but the source of the extra input remains unestablished. READ at 10.99 min: siegeAt red T1 258.3 s, blue T1 466.8 s; red T1 1591, blue T1 1206; moc_lam lv2, items [], 0 deaths.
- **INFRA (not a gameplay FAIL):** Codex's own body (fluxby, room uid pa_67cb45098b95c730ec62194b5bd11e5e) joined, but the GPU 1280×720 eye never finished loading and the CPU 640×360 browser exited (code 11); no usable renderer/pixels/input session. Valid (b)/(c) stay **NOT RUN**; host stays lukasai. Follow-up requested: investigate Spawn eye/renderer compatibility and an official usable client route; Savi suggested a regular Chrome tab signed into fluxby at the dev-room link, but this was not tested and is not a client PASS. Keep fixture/simulator evidence distinct from client results.
- **Cleanup after match 21 (2026-10-08 ~11:30Z):** Codex read-only showed match 21 / round 37 back in lobby. Savi read: phase lobby, host lukasai (live beat), 0 bot-hero, 0 g2-fixture; mode was still `san_tap`; Savi's captured writes show one persisted `tai_hien` write (world row 18302); Savi's final reply said twice, but no second write appears in the captured rows. Lukasai's own lobby request (seq 89, `mode san_tap`, acked) chose **Sân Tập** to watch, which stands. Per Codex relay of lukasai's direct ask, the room stays `san_tap`, host lukasai, not started. The pending host-swap script ended `asker_left` and wrote nothing; host was never moved. Parked body `livelyforestfd0a9` (no beat) is not live and holds nothing. Savi body out. Separate Codex client: still **INFRA**; (b)/(c) **NOT RUN**; BAL-02S **TBD-SIM**; gameplay numbers unchanged.
