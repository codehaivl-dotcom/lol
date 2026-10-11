# 71 · Sơ đồ hệ thống (đọc ĐẦU TIÊN)

> Một trang để agent mới hiểu game chạy thế nào và **sửa X thì mở file nào**. Cập nhật cùng lượt với thay đổi kiến trúc (luật ở [72](72-luat-handoff.md)).
> Cập nhật: 2026-10-09 · spec v1829.

## 1. Thứ tự đọc cho agent mới

1. `HANDOFF.md` (gốc world): đang làm gì, còn mở gì, đừng đụng gì.
2. File này (71): sơ đồ + bảng tra.
3. `docs/co-linh-than-chien/00-bible-moba.md`: luật MOBA đã chốt.
4. Chỉ khi cần: doc chuyên đề theo bảng §6. **Không đọc hết 80 doc.**

## 2. Bức tranh lớn

```
 người chơi vào world
        │  world.config.yaml (defaultPlace: sanh) → scripts/routing.js chọn room
        ▼
 ┌──────────────── place: sanh (Điện / sảnh) ────────────────┐
 │ places/sanh/sim.js → scripts/referee/lobby.js (+ core.js) │
 │   lobby → picking → loading                               │
 │ UI: scripts/ui.js → scripts/screens/{home,room,pick,...}  │
 └───────────────┬───────────────────────────────────────────┘
                 │ ticket (player.state.ticket: matchId, roster) + cross()
                 ▼
 ┌──────────────── place: main (Mạch Giữa) ──────────────────┐
 │ places/main/sim.js → scripts/referee/match.js             │
 │   ingame → results · ghế, bot thế chỗ, reconnect          │
 │ scripts/lane.js  (vật vô hình): lính, trụ, Tâm Mạch       │
 │ scripts/bot.js   (mỗi bot 1 thân): AI tướng máy           │
 │ player body: templates/player.js                          │
 │   → humanoid-locomotion → scripts/player.js (chân)        │
 │   → scripts/hero.js (heartbeat, lobbyReq)                 │
 │   → import() scripts/hero/match.js (trận)                 │
 │ HUD: scripts/screens/match/{desktop,mobile}.js            │
 └───────────────┬───────────────────────────────────────────┘
                 │ thư về nhà (player.state.home) + cross()
                 ▼
            về sanh, màn results
```

`sanh_thu`, `main_thu`: spike thử tách place (P-7). **Không phải gameplay**, không sửa khi làm trận.

## 3. Ai GHI cái gì (một chủ duy nhất cho mỗi dữ liệu)

| Dữ liệu | Chủ ghi | Người khác chỉ đọc qua |
|---|---|---|
| `place.state.lobby` (phase, mode, teams, pick, matchId) | `referee/lobby.js` ở sanh, `referee/match.js` ở main | `lib/session.js` |
| `place.state.match` (roster, saved, startedAt) | `referee/match.js` | `lib/session.js` |
| `player.state.lobbyReq` (yêu cầu có seq) | `scripts/hero.js` (máy người chơi) | referee đọc, trả `ack/err` |
| level, xp, hp, mana, cd, items của **người chơi** | `scripts/hero/match/*` trên thân người chơi | HUD, combat |
| giống trên của **bot** | `scripts/bot.js` | HUD, combat |
| gold + sổ nguồn vàng | `scripts/lib/econ.js` (earn/spend) | mọi nơi gọi hàm, không cộng tay |
| lính, trụ, nhà chính, đợt lính | `scripts/lane.js` | `place.state.nextWaveAt` cho HUD |
| XP lính chết | `lib/minionxp.js` (12 m, 100%, không cần last-hit) | gọi từ `lane.js` reward() |
| sát thương, trạng thái (stun/slow/…) | người đánh tính bằng `lib/combat.js`, ghi vào state mục tiêu | chủ mục tiêu tick hiệu ứng |
| thân "đang chiến đấu" của mỗi ghế | `lib/bodies.js` heroBodies() | combat, plate, test |

Luật vàng: **một dữ liệu một chủ**. Thấy hai nơi cùng ghi một trường = lỗi kiến trúc, ghi vào HANDOFF trước khi sửa.

## 4. Các dòng chảy chính

**Vào trận:** nút UI → `sendAction` → `hero.js` ghi `lobbyReq{seq,op}` → `referee/core.js handleLobby` kiểm → đổi `lobby` → `finishPicking` đóng băng roster → `referee/lobby.js` ghi ticket + cross sang main → `referee/match.js` xếp ghế → `hero/match/roster.js syncRoster` dựng tướng.

**Rớt mạng / ẩn tab:** beat (2 s, `hero.js`) ngừng > 15 s → `match.js` đánh dấu `disconnected`, ẩn thân người, `spawnSub` sinh bot thế chỗ `sub-<uid>` từ cache. Người quay lại → `takeBackSub` ghi `match.saved[uid]` có `at` → `roster.js takeBack` nhận, đặt `resumedAt = at`. **Bất biến:** dòng saved có `at` chưa được nhận là sự thật; cache sống không được đè lên. Luật: `scripts/referee/handback.js`; test: `node tools/test/handback.mjs`.

**Kinh tế:** `econ.passiveGold` mỗi tick + `earn(kill|minion|objective)` + `spend(shop)` → `state.gold`, `state.econ` (sổ theo nguồn).

**XP:** lính chết (`lane.js`) → `minionxp.grantMinionXp` cho mọi tướng địch ≤ 12 m; giết tướng → `life.js` cộng `ECO.heroKill.xp`. Ngưỡng cấp ở `lib/data/economy.yml`.

**Kỹ năng:** phím → `hero/match/orders.js`/`combat.js tryCast` → `lib/combat.js` → VFX `scripts/effects/vfx-*.fx.js` qua `lib/skillfx.js`.

## 5. Sửa X thì mở đâu

| Muốn sửa | Mở | Số liệu ở |
|---|---|---|
| Luật sảnh, chế độ, số người, bot trong sảnh | `referee/core.js`, `referee/lobby.js` | `lib/data/lobby.yml` |
| Ghế, reconnect, kết thúc trận | `referee/match.js` | `lobby.yml` reconnectSeconds |
| Chỉ số tướng, cấp, hồi sinh | `hero/match/roster.js`, `life.js` | `lib/data/heroes.yml`, `economy.yml` |
| Chiêu, đòn đánh | `hero/match/combat.js`, `lib/combat.js` | `heroes.yml` |
| AI bot | `scripts/bot.js` | `lib/data/bot.yml` |
| Lính, trụ, đợt lính, phần thưởng | `scripts/lane.js` | `lib/data/structures.yml`, `units.yml` |
| Item, shop | `lib/items.js`, `hero/match/economy.js`, `lib/passives.js` | `economy.yml` |
| Di chuyển, lộn, tường vô hình | `scripts/player.js`, `lib/walkable.js` | `player.yml`, `map.yml` |
| Tường bao vật lý | `gen/arena-wall.js` | `arena-wall.yml` |
| HUD trận | `screens/match/{model,widgets,panels,controls}` | `lib/data/strings.yml` |
| Màn sảnh | `screens/<màn>/` (model → widgets → layout → css → words) | `strings.yml` |
| Chữ hiển thị | `lib/i18n.js` | `strings.yml`, `strings-en.yml` |
| Camera | `scripts/camera.js` | `camera.yml` |
| Asset tướng/lính | `scripts/assets/resolver.js` | `assets/registry.yml` + `manifest.yml` |

## 6. Doc chuyên đề (chỉ mở khi cần)

| Chủ đề | Doc |
|---|---|
| Luật MOBA | 00 |
| Tách place, kiến trúc module | 44, 48, 51, 53 |
| UI/HUD layer | 52, 40 |
| Item + kinh tế | 66 → 63 → 59, 68, 69 |
| VFX / animation skill | 30, 28, 41, 55 |
| Map Mạch Giữa | 17, 38, 65; việc tồn đọng: 57 |
| Map 5v5 | 27 |
| TTK / combat | 70 |

## 7. Công cụ test (không phải gameplay)

- `scripts/test/match-watch.js` trên vật `xpt-watch` (main, dev): ghi cấp, XP, nguồn lính chết, reconnect vào state của chính nó. Đọc bằng run_script `getObject('xpt-watch').state.w`.
- `scripts/test/lane-xp.js`, `minion-xp.js`: harness XP.
- `scripts/dev-*bench.js`: bench dev. `tools/`: python ngoài game (manifest, audit, balance).

- 2026-10-10 · Hình học skill (doc 76): preview `hero/match/cues.js`, telegraph `lib/combat.js drawTelegraph`, hitbox tường `lib/kitmech.js wallOf/inWall`, đánh thường `lib/vfx/compose.js meleeTrail` + `vfx-heroes.yml basic`. Audit: doc 77.

- Skill geometry (doc 76): `scripts/lib/kitmech.js` inArc (cone AoE) · fanDirs/shotLanes/fanStruck (fan projectiles) · markOf (telegraph form) → combat.js, bot.js, cues.js, tools/sim/engine.mjs.

- 2026-10-11 · Ngư Đăng: missile `bell` (scripts/gen/missiles.js) là thân bay thật của Q; nội tại cdr_on_hit có `perCast: 1` = mỗi chiêu tối đa 1 lần rút hồi chiêu mỗi lượt hồi (kitmech.cdrOnHit + state.cdrT).
- 2026-10-11 · `engulf` (effects): nạn nhân ẩn + không thể chọn trong N s, chính thân nạn nhân chạy `scripts/lib/engulf.js engulfStep` (player.js, bot.js); kẻ đánh chỉ ghi row trong `lib/combat.js applyEffects`. Dùng: Cốt Bện R. Lab (engine.mjs) bỏ qua khóa này.
