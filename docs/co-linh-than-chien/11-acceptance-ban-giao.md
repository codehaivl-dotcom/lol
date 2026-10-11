# Acceptance và gói bàn giao V1

**Dùng cho:** đóng vertical slice và chuyển việc giữa design, engineering, art, audio, localization, QA.  
**Trạng thái khi viết:** tiêu chí được định nghĩa; chưa chạy build, kiểm thử gameplay, kiểm thử locale hoặc nghiệm thu asset trong lượt này. QA record phải bắt đầu ở `NOT RUN`.

## 1. Cách ghi bằng chứng

Mỗi dòng acceptance có `ID`, `status`, `build/data version`, `evidence link`, `owner`, `date`, `notes`. Trạng thái hợp lệ: `NOT RUN`, `PASS`, `FAIL`, `BLOCKED`. Không dùng `PASS` khi chỉ tồn tại code/class/data file; cần chạy đúng điều kiện và lưu video/log/screenshot/data diff. Test chưa có dữ liệu để `BLOCKED` kèm lý do; không tự bịa kết quả.

## Slice 1.5: nghiệm thu sảnh (nguồn luật: 14 §B0)

| ID | Kiểm | Đạt khi |
|---|---|---|
| LOBBY-01 | Vào game | Thấy màn chính (Chơi · Tướng · Truyền thuyết · VI/EN), không có tướng, không có lính chạy |
| LOBBY-02 | Chủ phòng | Người vào đầu là chủ (♛). Chủ rời đi thì người vào sớm kế tiếp làm chủ trong ≤ 0.5 s |
| LOBBY-03 | Đội | Vào/đổi/rời đội. Tối đa 5 mỗi đội, quá thì báo `team_full`. Ô trống ghi "Trống" |
| LOBBY-04 | Quyền | Người không phải chủ gửi `mode`/`start` thì bị ack kèm `not_host`, trạng thái không đổi |
| LOBBY-05 | Không lặp | Gửi lại cùng seq 3 lần, hoặc khởi động lại trọng tài giữa chừng: trạng thái giống gửi 1 lần (mốc là `lobby.ack` trong place.state) |
| LOBBY-06 | Bắt đầu | `tai_hien`: nút mờ kèm lý do khi một đội 0 người. `san_tap`: luôn bật cho chủ |
| PICK-01 | Chọn tướng | 30 s. Hover hiện cho đồng đội, không trùng trong đội. Hết giờ thì random tướng còn trống. Khoá đủ → loading 3 s → vào trận |
| PICK-02 | Huỷ | Một đội về 0 người khi đang chọn → về sảnh, có thông báo |
| GAME-01 | Vào trận | Tướng/đội đúng roster, cấp 1, vàng khởi điểm. Lính/trụ chỉ chạy trong `ingame` |
| GAME-02 | Rớt mạng | Rời ≤ 60 s rồi vào lại: cùng tướng, đội, cấp, vàng, đồ, K/D/cs |
| PRAC-01 | Sân Tập | Làm lại: reset trận, vẫn trong trận. Kết thúc: về sảnh, không qua kết quả. Phá Tâm Mạch Đỏ: bảng "Hoàn thành", `winner: null` |
| PRAC-02 | Người xem | Chủ chọn Sân Tập thì người khác ra khỏi đội. `join` của họ bị `spectator`, họ không có thân trong trận. Đổi về 5v5: xếp theo joinOrder vào đội ít người hơn (hoà thì Xanh), hết 10 ô thì người còn lại tiếp tục xem |
| RES-01 | Kết quả | Bảng đúng K/D/cs/vàng/cấp *của trận vừa xong* (chụp trước reset). 20 s rồi cả phòng về sảnh, giữ đội và chủ |
| RES-02 | Về phòng sớm | Thấy phòng chỉ xem, nút mờ, có đếm ngược, có nút xem lại kết quả |
| L10N-01 | Ngôn ngữ | Đổi VI/EN ở màn chính và trong trận, áp dụng ngay, giữ sau khi tải lại. Không còn chuỗi viết cứng ngoài bundle |
| MOB-01 | Điện thoại | Mọi màn sảnh vừa 844×390, nút ≥ 44 px. Cụm nút chạm chỉ hiện trong `ingame` |

**QA record Slice 1.5 — 2026-10-08, Savi, v485+** (chi tiết: 14 §E)

| ID | status | evidence |
|---|---|---|
| LOBBY-01 | NOT RUN | cần client người chơi |
| LOBBY-02…06 | PASS (trọng tài) | `bun tools/test/lobby-referee.mjs` |
| PICK-01, PICK-02 | PASS (trọng tài) | như trên |
| GAME-01 | PASS (trọng tài) | roster + `phase` chỉ `playing` ở ingame |
| GAME-02 | PASS (trọng tài) / NOT RUN (thân) | snapshot + giữ ô 60 s qua test; khôi phục trên thân chưa chạy |
| PRAC-01, PRAC-02 | PASS (trọng tài) | như trên |
| RES-01 | PASS (trọng tài) | như trên |
| RES-02 | NOT RUN | cần client |
| L10N-01 | PASS một phần | HUD trận hết chuỗi cứng, ảnh EN ngoài engine; "giữ sau tải lại" NOT RUN |
| MOB-01 | BLOCKED | cần client điện thoại / phòng riêng |

## 2. Release scope V1 slice

> Vòng Slice 1.5 nghiệm thu theo `14-todo-lobby-va-playtest.md` (§B0.1 phạm vi, §D audit). Mục dưới là đích V1.

- 1 map `cuu_mach`, 1 mode `tai_hien`, 6 hero playable, bot để đủ 5v5 offline/local slice.
- Three-lane macro, jungle camps, structures/core, hero leveling/boons, slice shop 8 items, The Call, Call Titan, win/defeat/replay.
- VI–EN text toàn bộ slice; VI voice và subtitle VI/EN; English VO không thuộc scope.
- Spawn engine: desktop là chính, điện thoại chơi được bằng touch layout; chưa có ranked.

## 3. Acceptance matrix

**Phạm vi (G3, 2026-10-08, Codex duyệt hướng):** `Slice` = gate của bản chơi trọn vòng Slice 1.5 / Mạch Giữa; `V1 · DEFERRED (roadmap)` = thuộc map ba lane, rừng, Call/Titan, boon, VO, 21 tướng còn lại; không chặn Slice. DEFERRED chỉ đổi phạm vi, **không** đổi status: cột Status giữ trạng thái thật (NOT RUN/FAIL/BLOCKED/PASS). Dòng nửa Slice nửa V1 ghi rõ phần nào thuộc Slice.

### A. Identity, data integrity, combat

| ID | Phạm vi | Điều kiện pass | Evidence tối thiểu | Status |
|---|---|---|---|---|
| DATA-01 | Slice: 6 ID · V1: 27 ID | **Slice:** 6 hero ID của `lobby.yml heroes` khớp đúng một row trong `heroes.yml` và CSV; không có ID của game tham khảo trong code/save/asset. **V1 (DEFERRED):** đủ 27 hero ID ở 09 §7. | Script report ID diff + roster capture | NOT RUN |
| DATA-02 | Slice | Mọi số trong `heroes.yml` khớp `balance-log` mới nhất; mỗi thay đổi có kết quả mô phỏng trước/sau. | Data diff + báo cáo mô phỏng | NOT RUN |
| BAL-01 | Slice (6 tướng) | Mô phỏng 1v1: mỗi tướng thắng 45–55% trung bình; không cặp nào vượt 70/30. | Báo cáo mô phỏng | FAIL (2026-10-07, `balance-sim-2026-10-07.md` lượt 2: 2 cặp vượt 70/30, Mộc Lẫm 55,4%) |
| BAL-02 | V1 (3 lane) | Mô phỏng 5v5 kết thúc trong 20–35 phút ở ≥ 90% trận. | Báo cáo mô phỏng | FAIL (2026-10-07, `match.mjs 300`: 57% trận trong khung; HP công trình chưa chốt) |
| BAL-02S | Slice | Trận Mạch Giữa (1 lane) kết thúc trong khung thời gian **12–20 phút (khung chốt 2026-10-08 · @lukasai "làm luôn")**; HP công trình chốt từ đo thật theo plan 14 §G2. | `reports/balance-sim-2026-10-08-slice.md` (sim, chưa hiệu chỉnh) + `reports/wisp-C-2026-10-08.md` (2026-10-08: profile Slice đọc hình học map.yml, `tools/balance/g2compare.mjs` so với G2 trace: nhịp đợt + thứ tự khoá MATCH; lính một mình phá trụ và tốc độ tướng phá trụ Sân Tập MISMATCH; mô hình chưa hiệu chỉnh) + log trận thật (G2 b/c NOT RUN) | TBD-SIM |
| BOT-01S | Slice | Đấu Máy (`thu_tran`): 1 người vs 1 bot trên Mạch Giữa, bot đi lane/dùng chiêu, chơi tới khi một Tâm Mạch vỡ → results thắng/thua đúng phe → về phòng (chốt 2026-10-08). | Code `scripts/bot.js`, `bot.yml`; reconnect Đấu Máy PASS runtime 560 (14 P4); mock trọng tài `reports/referee-bot-2026-10-08.md` (ngoài engine) | NOT RUN |
| DATA-03 | Slice | Skill tooltip VI/EN của 6 hero slice khớp payload: range/shape/cost/cooldown/damage type/scaling/CC/duration/condition/counterplay; không lộ technical IDs. | Ability screen capture + row-to-string review | BLOCKED: tooltip full VI/EN chưa author trong data bundle |
| DATA-04 | Slice | Ultimate charge/`ult.none` exception đúng từng kit, không bị khóa nhầm bởi level/cooldown; kit không có slot passive/skill phải hiện đúng `not_applicable`. | Combat replay và event log | NOT RUN |
| DATA-05 | Slice | Rank Q/RMB/E lên ở cấp 1/3/5/7/9, R mở ở 6 và lên ở 11/15 (D1); mảng per-rank lấy đúng index. | Bảng rank theo cấp + trace | NOT RUN |
| COMBAT-01 | Slice | Với cùng seed/input/target, armor/MR/penetration/shield/damage/death resolve ổn định; true damage bỏ qua resistance; projectile trúng một lần. | Deterministic combat log | NOT RUN |
| COMBAT-02 | Slice | Né chỉ miễn damage trong i-frame; projectile bắn sau i-frame có thể trúng; cost/cooldown/state được phản ánh trên HUD. | Frame capture + state log | NOT RUN |
| COMBAT-03 | Slice: XP/cấp · V1: boon | **Slice:** L1→L15 theo `economy.yml xpTable`, hồi máu khi lên cấp đúng 08, L15 (`maxLevel`) không nhận cấp vượt cap. **V1 (DEFERRED):** boon milestone (BOON-01). | XP ledger / progression capture | NOT RUN |

### B. Map, navigation, art readability

| ID | Phạm vi | Điều kiện pass | Evidence tối thiểu | Status |
|---|---|---|---|---|
| MAP-01 | Slice: Mạch Giữa · V1: 07 | **Slice:** gameplay point ID/transform/radius của Mạch Giữa khớp `map.yml` và doc 17; hai phe đối xứng tâm kiểm bằng script. **V1 (DEFERRED):** khớp 07 (ba lane). | Automated transform diff hoặc editor export | NOT RUN |
| MAP-02 | V1 · DEFERRED (roadmap) | 3 lane có đường chạy đúng waypoint/thứ tự và team đối diện đúng hướng; lính Blue/Red đi ngược chiều đúng trên path. | Minion route video/map overlay | NOT RUN |
| MAP-03 | V1 · DEFERRED (roadmap) | 12 camp, 2 Trial Pit, 24 brush (12/phe), hai fountain, 2 Nexus, 12 tower/keep, gate và pit floor đúng vị trí. Pit standard không có boss để farm. | Scene entity inventory + minimap capture | NOT RUN |
| MAP-04 | Slice | Thay `art_shell` không đổi collider, nav, LOS, camera collision, hitbox, brush query, tower range, objective ring hoặc projectile route. | Collision/nav diff + in-game occlusion review | NOT RUN |
| MAP-05 | Slice | Cả sáu hero dùng model thân riêng ở lobby và trong trận; ở ảnh silhouette đen-trắng 64 px mỗi tướng nhận ra bằng hình thể/pose/vũ khí, không cần màu hoặc tên; class và chiêu đọc được từ vũ khí/VFX; weapon/VFX không che enemy tell/reticle; motif Việt là điểm nhấn riêng, không đồng nhất roster. Visual scale không đổi capsule/hitbox/tầm/camera/gameplay. | Một lineup silhouette cùng tỷ lệ + 6 combat screenshots/video ở camera trận khoá (#7781, `camera.yml`) | NOT RUN |
| MAP-06 | Slice | Art giữ định hướng Blue/Red và minimap projection nhất quán; motif/landmark có tên VI/EN từ string table. | Minimap/world alignment capture | NOT RUN |

### C. Main match, lane, camp, objectives

| ID | Phạm vi | Điều kiện pass | Điều kiện thao tác | Evidence | Status |
|---|---|---|---|---|---|
| MATCH-01 | Slice: roster theo mode · V1: bot-fill 5v5 | **Slice (14 §B0):** Tái Hiện 1–5 người thật mỗi phe, **không bot-fill**; Đấu Máy 1 người vs 1 bot; Sân Tập 1 người. Mọi tướng vào trận L1, 500 g, đầy HP/tài nguyên. **V1 (DEFERRED):** trận chuẩn đủ 5v5, thiếu người bot-fill trong build/mode ghi rõ bot. | **Slice:** vào mỗi mode một lần, kiểm roster + ledger lúc bắt đầu; Làm lại ở Sân Tập. | Session log/capture | NOT RUN |
| MATCH-02 | Slice: 1 lane · V1: cap 90 | **Slice:** wave đầu T+5 s, sau mỗi 30 s, mỗi wave 3 melee/2 caster/1 siege, cap 14/lane/team, Siêu Linh Binh theo `structures.yml minions`. **V1 (DEFERRED):** cap 90 toàn map. | **Slice:** quan sát Mạch Giữa tới ≥ 3 wave + một ca chạm cap 14. **V1:** quan sát 3 lane. | Spawn log | NOT RUN |
| MATCH-03 | Slice: T1→T2→Tâm Mạch · V1: keep, nhiều lane | **Slice:** trên Mạch Giữa T1 khóa T2, T2 khóa Tâm Mạch; công trình đổ không dựng lại; Tâm Mạch về 0 kết thúc trận đúng một lần. **V1 (DEFERRED):** ít nhất một T2 mở Nexus, keep fall tăng wave đúng lane. | **Slice:** một lần push Mạch Giữa T1→T2→Tâm Mạch, thử đánh T2/Tâm Mạch khi còn khoá, kiểm end screen. **V1:** hai lần push lane khác nhau. | Match recording + state events (`siegeAt`/`towersDown`) | NOT RUN |
| CAMP-01 | V1 · DEFERRED (roadmap) | Hạ buff camp nhận đúng buff/duration trong `objectives.yml`; không cấp hai lần/cho sai phe. | Clear Sentinel/Emberscale bằng từng team | Reward log + HUD | NOT RUN |
| CAMP-02 | V1 · DEFERRED (roadmap) | Hạ Wolves/Raptors/Shardpack/Shellwarden spawn đúng merc roster ở 08 trên lane gần nhất; merc thuộc team last-hit và sử dụng lane combat rules. | Một clear cho mỗi camp type/phe | Entity inventory + route video | NOT RUN |
| CAMP-03 | V1 · DEFERRED (roadmap) | Camp merc không respawn/không spawn wave khi Titan reward lock đang hoạt động; camps mở khi Titan chết/idle rule kết thúc lock. | Clear camp, win Call, test lock/unlock | Server/state log | NOT RUN |
| CALL-01 | V1 · DEFERRED (roadmap) | Call I horn đúng 02:00, ring mở 02:30; Call kế horn khi Titan trước chết hoặc Titan idle rule giải phóng lock, ring mở sau 30 s. | Chạy match clock/reduced-time QA fixture | Match state trace | NOT RUN |
| CALL-02 | V1 · DEFERRED (roadmap) | Ring bán kính 18 m; một phe đơn độc capture 0→100 trong 45 s; số đồng minh không nhân tốc độ; holdAt=99 chờ địch rời ring; cả hai phe cùng có hero sống trong ring thì không bar nào tăng; comeback=30; timestep tối đa 1 s. | Solo, thêm đồng minh, đi vào/ra, 99 hold, contested 1v1/1v5 | Capture trace/video | NOT RUN |
| CALL-03 | V1 · DEFERRED (roadmap) | Thử 1v1, 1v2, 1v5 và 5v5 khi hai phe cùng đứng trong ring: mọi bar giữ nguyên do contested=0; sau khi một phe rời ring, phe còn lại tiếp tục capture theo rate solo. | Replay + progress trace | NOT RUN |
| CALL-04 | V1 · DEFERRED (roadmap) | Call I chọn pit theo `matchSeed mod 2`, Call sau luân phiên; vị trí state có thể serialize/replay; horn, 50/80% danger warning, win/loss SFX và V1 Vietnamese announcer line khớp. | 2 seed khác + reconnect/replay | Event log + audio capture | NOT RUN |
| TITAN-01 | V1 · DEFERRED (roadmap) | Rank/health/resistance khớp `objectives.yml`; rank > VIII giữ giá trị cuối; 2 Titan đầu nhắm công trình ngoài cùng còn đứng của lane. | Compare data table + match with first two Calls | Data diff/video | NOT RUN |
| TITAN-02 | V1 · DEFERRED (roadmap) | Titan tự đi/attack, có target/crew/tower-wait rules; không xuyên structure/nav; Titan không biến mất khi hết drive/idle, chỉ khi bị hạ. | Bot pilot, player release, tower encounter, idle timeout | State trace + video | NOT RUN |
| TITAN-03 | V1 · DEFERRED (roadmap) | Người chơi trong 5 m có thể F claim trong 20 s; hết 20 s không ai nhận thì bot lái; exit/AFK 45 s/mount stall trả Titan về bot/walk; reconnect không mất Titan. | Human claim, no-answer, exit, afk, disconnect | Match trace/video | NOT RUN |
| TITAN-04 | V1 · DEFERRED (roadmap) | Fist/Slam/Charge/Beam timing, range, damage, cooldown, structure behavior, CC stagger và per-rank values khớp `objectives.yml`; structure shots hit Titan for flat 400 true damage. | Per-action combat log per rank | Combat logs | NOT RUN |
| TITAN-05 | V1 · DEFERRED (roadmap) | Hạ Titan trả team/last-hit gold và shared XP đúng §6.2; kill credit duy nhất; spawn reward/call rank tăng một lần. | Kill Titan by minion/player/structure and inspect ledger | Reward log | NOT RUN |
| END-01 | Slice | Tâm Mạch về 0 kết thúc match một lần, ngừng reward/tick, hiện kết quả thắng/thua, thống kê và nút replay/lobby hoạt động. | Core push + replay reset | End-to-end capture/state log | NOT RUN |

### D. Economy, item, boon

| ID | Phạm vi | Điều kiện pass | Evidence tối thiểu | Status |
|---|---|---|---|---|
| ECON-01 | Slice (lane, kill, trụ; không camp/objective) | Gold/XP grant đúng `economy.yml`; last-hit/kill/assist/objective/camp/structure events không double-pay. | Economy ledger per event type | NOT RUN |
| ECON-02 | Slice | Mua item bị từ chối nếu thiếu gold hoặc đang ở ngoài base khi sống; mua được ở base hoặc khi chết; T active relic tiêu thụ/use theo row. | Shop interaction + ledger | NOT RUN |
| ECON-03 | Slice | 8 item slice có đúng ID/name/locales/cost/effects; effect có tooltip chỉ khi handler thực hiện; mismatch text/data không được ship. | Shop capture + item effect test | NOT RUN |
| BOON-01 | V1 · DEFERRED (roadmap) | Offer 3 card ở level 3/6/9/12/15; 1 reroll; `rec` là card bot/timeout chọn; quest counter đúng `heroes.yml`. | Test tier, reroll, timeout, quest finish | NOT RUN |
| BOON-02 | V1 · DEFERRED (roadmap) | Locale đổi không thay ID/effect. Cả 27 tướng có đủ 15 thẻ. | CSV/string/data audit | NOT RUN |

### E. Eng–Vi và âm thanh

| ID | Phạm vi | Điều kiện pass | Evidence tối thiểu | Status |
|---|---|---|---|---|
| LOC-01 | Slice | VI/EN có cho mọi text trong slice; locale đổi giữa trận không restart/đổi data/đổi kết quả; lựa chọn persist sau reload. | Locale-switch/reload capture | NOT RUN |
| LOC-02 | Slice | UI không lộ technical key; không thiếu dấu/tofu/clipping; tooltip nêu đủ điều kiện và combat numbers; locale formatter không sửa giá trị. | String report + UI sweep screenshots | NOT RUN |
| LOC-03 | Slice (trừ camp/boon) | Tất cả 6 hero, 8 item, active boons, camps, map landmark, controls, tutorial, alerts, defeat/victory có VI/EN reviewed. | Localization export + signed linguistic review | BLOCKED: gói localization full text chưa author |
| VO-01 | V1 · DEFERRED (roadmap) | Bản đầu có Vietnamese VO nhân vật và announcer; line có `voice_id`, trigger, actor, master file, subtitle VI/EN, timecode, pronunciation, rights và mix status. | Audio manifest + in-game capture | BLOCKED: chưa có line list/master VO |
| VO-02 | V1 · DEFERRED (roadmap) | Voice vẫn tiếng Việt khi UI là EN; subtitle theo locale và bật/tắt được; line ưu tiên gameplay cue không che SFX/crosshair. | Locale/audio QA recording | BLOCKED đến khi VO/subtitle bundle được giao |

### F. Multiplayer và lỗi

| ID | Phạm vi | Điều kiện pass | Evidence tối thiểu | Status |
|---|---|---|---|---|
| NET-01 | Slice: combat/kết quả · V1: capture/Titan | **Slice:** hai người chơi thật trên hai máy cùng một trận Mạch Giữa: damage, vàng, cấp, trụ đổ và kết quả giống nhau ở cả hai. **V1 (DEFERRED):** thêm capture và Titan. | 2 client + state log của sim.js | NOT RUN |
| NET-02 | Slice | Thưởng (vàng, XP, kill, objective) chỉ do sim.js cấp, đúng một lần mỗi sự kiện. | Ledger | NOT RUN |
| NET-03 | Slice: rời/vào · V1: lái Titan | **Slice:** rời/vào lại giữa trận (≤ 60 s) giữ team, tướng, vàng, cấp; thử ở lúc giao tranh và lúc vừa kill. **V1 (DEFERRED):** người lái Titan rời thì bot lái tiếp. | Rời/vào lại, log trước/sau | NOT RUN |
| MOB-01 | Slice | Trên điện thoại: di chuyển, LMB/Q/RMB/E/R, né, Hồi Tưởng và shop dùng được bằng touch; HUD không che giữa màn hình. | Quay màn hình phone | NOT RUN |

## 4. Art handoff package

Cho mỗi hero: approved concept front/side/3-quarter, silhouette check gameplay distance, height/feet pivot/forward axis, rig and retarget notes, model/LOD/material/texture package, weapon socket/hitbox reference, face/eyes readable, portrait, icon set, ability VFX shape/color/warning and memory budget, animation list/event frames, VI/EN display strings, VO brief. Chi tiết tạo hình/vũ khí/motif theo 03.

Cho map: top-down blockout aligned với 07, zone plan/palette/material, full visual pass per lane/jungle/base/pit, minimap crop/projection, collision/nav export, light/fog/water setup, gameplay lighting/tell contrast and performance capture. Không duyệt map bằng render concept nếu thiếu 3D collision/gameplay pass.

Cho audio: VI VO naming/line list, Vietnamese pronunciation guide, subtitle VI/EN, loudness/mix target do audio owner điền trong audio ADR; objective/UI/SFX cues có priority matrix; không có file EN VO yêu cầu ở V1.

## 5. Việc trước khi khóa nội dung

1. Thiết kế 27 kit trong `heroes.yml`; 6 tướng slice trước.
2. Bộ mô phỏng đã có (`tools/balance/`). Playtest slice 1 (13) đo số thật, đưa vào mô hình, chạy tới khi BAL-01/02 pass.
3. Thiết kế Dị Năng cho 27 tướng và catalog vật phẩm.
4. Đặt số camp, công trình, kinh tế, ult bằng mô phỏng (các ô [TBD-SIM] ở 08).
5. Gói dịch VI–EN cho lore, chiêu, Dị Năng, vật phẩm, UI; VO tiếng Việt + subtitle.
6. Chọn ngưỡng hiệu năng (FPS desktop/phone) trước khi duyệt hiệu năng.

## 6. Bảng nghiệm thu để điền

Copy bảng này cho mỗi build candidate; giữ cả FAIL/BLOCKED/NOT RUN, đính kèm artifact versioned.

| Acceptance ID | Status | Build/data version | Evidence path/link | Owner/date | Notes / linked issue |
|---|---|---|---|---|---|
|  | NOT RUN |  |  |  |  |

Không ghi “đã test” nếu chỉ mới có test plan; không chạy test/build trong lần tạo và đối soát bộ docs này.
