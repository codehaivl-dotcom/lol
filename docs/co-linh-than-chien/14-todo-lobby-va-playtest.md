# TODO — Sảnh kiểu LOL + sửa lỗi playtest Mạch Giữa (2026-10-07)

Yêu cầu của @lukasai: "làm như LOL. Cả một lobby hoàn chỉnh. Sau đó chọn mode, tướng. Team vào start mới vào game."
"viết TODO trước. Ko làm mù. Làm todo xong thì audit lại xem đã ổn chưa."

Quy ước: [ ] chưa làm · [~] đang làm · [x] xong và đã kiểm (kèm bằng chứng). Không đánh [x] khi chưa test.

## A. Lỗi playtest đã thấy (ưu tiên trước, vì lobby đổ người vào trận này)
- [~] A1. Lính Xanh kẹt ở Tâm Mạch. *(sửa: điểm sinh lính dời ra 16 m, lính tự lách khi kẹt rồi nhích 2 m sau 3 lần đứng yên. Đo: sau 2 đợt lính Xanh đã hành quân tới wp 6, đánh ở phía Đỏ [28,-19]. Còn lại: kiểm qua nhiều đợt.)*
- [x] A2. Đường lính xuyên tâm Trụ T2. *(waypoint trùng Trụ T2 được đẩy lệch 5.9 m vuông góc lane; lane.js ROUTE.)*
- [x] A3. Tướng rơi xuống lòng sông, camera nhìn gầm cầu. *(nguyên nhân: lệnh dịch chuyển thử của Savi đặt thân dưới mặt cầu, không phải lỗi game. Raycast xác nhận mặt cầu có va chạm ở y 0. Đã thêm: camera không chui qua tường/cầu/đất; lính gỡ kẹt dùng raycast thay heightAt.)*
- [x] A4. Đánh thường không trúng lính. *(đánh thường nhắm tâm ngắm, không có thì tự khoá mục tiêu gần nhất phía trước, giống Liên Quân. Test: 15 s đánh → cs 1, xp +35, vàng tăng.)*
- [x] A5. Chữ có dấu hiện ô vuông. *(Be Vietnam Pro woff2 27 KB, @font-face 'CLTC' trong ui.js và touch style. Ảnh chụp client CPU: "sẵn", "về nhà", "cửa hiệu", "đợt" hiện đúng.)*
- [~] A6. Kỹ năng 6 tướng. *(6 tướng × LMB/Q/RMB/E: log không lỗi behavior. R chưa test vì khoá đến cấp 6.)*

## B. Luồng sảnh kiểu LOL (màn hình toàn phần, trước khi vào trận)

### B0. Luật đã chốt (2026-10-07, Savi chốt theo uỷ quyền "bạn làm + test" của @lukasai; trả lời review 5 điểm)

**1. Nguồn sự thật.** Vòng này gọi là **Slice 1.5 — Sảnh + Mạch Giữa**. Với *phạm vi vòng này*, file 14 thắng 06 §4/§6, 09 §2, 11, 13. Các file 06/11 giữ nguyên làm đích V1 dài hạn, có dòng dẫn sang đây. Bảng phạm vi:

| Hạng mục | Đích V1 (06) | Slice 1.5 (vòng này) |
|---|---|---|
| Map | Cửu Mạch Chiến Trường | **Mạch Giữa** (bật). Cửu Mạch: hiện thẻ khoá "sắp ra mắt", không bấm được |
| `tai_hien` 5v5 | có bot lấp ô | **Bật, không bot.** Chỉ người thật; ô trống ghi **"Trống"** |
| `thu_tran` đấu máy | 1 người vs 1 bot (Mạch Giữa) | **Bật, Slice 1.5** — Tâm Mạch vỡ = thắng/thua thật (2026-10-08 · @lukasai "làm luôn"; trước: khoá) |
| `san_tap` sân tập | bia + bot tuỳ chọn | **Bật**: 1 người (chủ phòng), phe Minh Ước, lính + trụ chạy bình thường, phe địch không có tướng, không có thắng/thua (`winner: null`, §B0.6). Người khác là người xem |
| Call/Titan, rừng, Dị Năng | có | không (giữ như slice 1) |
| Ghép nhiều phòng | có | không: một phòng = một sảnh |

**2. Trận chỉ chạy qua trọng tài.** Bỏ hẳn cách cũ (chọn tướng ở HUD là vào trận ngay, hết trận 12 s tự chạy ván mới). `hero.js` không còn action `pick`. Tướng được gán **duy nhất** từ `place.state.match.roster`. Trọng tài tạo roster **một lần, ở bước `picking → loading`** (mọi người đã khoá, hoặc hết 30 s và người chưa khoá được random): chụp `lobby.teams` + `lobby.pick` thành roster, đóng băng, không đổi trong trận (người rớt mạng vẫn giữ dòng của mình). `hero.js` đọc roster khi thấy `lobby.matchId` mới ở `ingame`. Không có roster thì không có tướng, không có lính. Về `lobby` thì xoá `match`.

**3. Mode bật & điều kiện BẮT ĐẦU.**
- `tai_hien`: cần **≥ 1 người mỗi đội**. Cho lệch người, tối đa 5 mỗi đội. Chủ phòng bấm BẮT ĐẦU khi đủ điều kiện, nút mờ kèm lý do nếu chưa đủ.
- `san_tap`: đúng 1 người (chủ phòng), BẮT ĐẦU luôn bật. Khi chủ chuyển sang `san_tap`, trọng tài đưa chủ vào ô 1 đội `blue` và đưa mọi người khác ra khỏi đội (thành **người xem**). Người xem không có ô, không chọn tướng, không có thân trong trận: HUD của họ là màn phòng chỉ xem "Chủ phòng đang ở Sân Tập". `join` của người xem bị ack kèm `spectator`, trạng thái không đổi. Chủ đổi lại `tai_hien` thì **trọng tài tự xếp đội trong cùng tick** (người xem không phải gửi lệnh): chủ giữ ô ở `blue`; duyệt người xem theo `joinOrder`, mỗi người vào đội đang ít người hơn (bằng nhau thì `blue`), tới khi cả hai đội đủ 5. Ai còn lại tiếp tục là người xem. Khi có ô trống, họ `join` như thường. Người vào phòng mới trong phase `lobby` của `tai_hien` cũng được xếp theo luật này.
- `thu_tran`: thẻ khoá, không chọn được.

**4. Phase & yêu cầu.** `lobby.phase`: `lobby → picking → loading → ingame → results → lobby`.
- `lobby`: vào/ra đội, đổi đội, chủ phòng đổi mode/map, BẮT ĐẦU → `picking`.
- `picking`: 30 s. Hover hiện cho đồng đội, không trùng tướng: **PvP `tai_hien` cấm trùng cả hai đội**; Đấu Máy/Sân Tập chỉ cấm trùng trong một đội, người được lấy trùng tướng bot (@lukasai 2026-10-08). Mọi người khoá xong, hoặc hết giờ (giữ tướng hợp lệ đang chọn/đang hiện; chỉ random khi chưa có lựa chọn hợp lệ — @lukasai #45015), → `loading` 3 s (màn đối đầu 2 đội) → `ingame`.
- `ingame`: trận như slice 1. Tâm Mạch vỡ → `results`.
- `results`: bảng kết quả 20 s. Nút "Về phòng" chỉ đưa *người bấm* về giao diện phòng sớm. Hết 20 s, cả phòng → `lobby`, giữ nguyên đội và chủ phòng.
- **Yêu cầu không xử lý lặp:** người chơi ghi `player.state.lobbyReq = { seq, op, ...args }`, seq tăng dần. **Mốc chống lặp là `lobby.ack[userId]`, nằm trong `place.state` nên còn sau khi trọng tài khởi động lại.** Trọng tài không giữ `lastSeq` riêng trong bộ nhớ: nó chỉ xử lý khi `req.seq > (lobby.ack[userId] ?? 0)`, và ghi hiệu ứng của lệnh cùng `ack` **trong cùng một tick** (cùng một lần ghi state), nên không có lúc nào hiệu ứng đã có mà ack chưa có. Mọi op còn idempotent (join = đặt vào đội, không cộng dồn; lock lần hai không đổi gì) làm lớp bảo vệ thứ hai. HUD thấy `ack` thì bỏ trạng thái "đang gửi". **Lệnh qua trọng tài (có seq + ack):** `join{team}`, `leave`, `mode{mode,map}`, `start`, `hover{hero}`, `lock`, `practice{action}`. **Thao tác cục bộ (không seq, không ack, không qua trọng tài):** "Về phòng" / "Xem lại kết quả" (đổi `player.state.view`), đổi ngôn ngữ (đổi `player.state.locale`).
- **Chủ phòng:** người vào phòng sớm nhất. Chủ rời đi → người vào sớm kế tiếp. Phòng trống → reset về mặc định.
- **Rời / mất kết nối:** ở `lobby`/`picking` thì ô được giải phóng ngay (đang `picking` mà một đội về 0 người → huỷ về `lobby`, báo "đối thủ rời phòng"). Ở `ingame` thì giữ ô 60 s theo userId, quay lại là vào lại đúng tướng/đội/chỉ số. Quá 60 s ô hiện "đã rời", trận vẫn chạy. Cả hai đội 0 người → huỷ trận, về `lobby`.

**5. Kết quả & ngôn ngữ.**
- Ngay khi trọng tài đặt winner, trước mọi reset, nó chụp `place.state.results = { winner, seconds, mode, rows:[{ name, team, hero, k, d, cs, gold, level }] }`. Bảng kết quả chỉ đọc từ đây. `resetHero` chỉ chạy khi `ingame` mới bắt đầu.
- Ngôn ngữ: `player.state.locale = 'vi-VN' | 'en'` (đúng mã của 09 §2), mặc định `vi-VN`, nút đổi VI/EN ở màn chính, lưu trong save người chơi. Mọi chuỗi hiển thị lấy qua **một** bundle: `scripts/lib/data/strings.yml`, khoá → `{ vi-VN, en }`, đọc qua helper `t(key, locale)`. Tên/danh hiệu/vai trò/tên chiêu của tướng: sinh vào bundle từ `data/roster-display-map.csv` (khoá `hero.<hero_id>.name`, `.epithet`, `.role`, `.<slot>`), đúng 09 §1. heroes.yml không chứa chuỗi hiển thị. Kết quả trận hiển thị theo locale của *người xem*.


**6. Sân Tập: kết thúc và reset.** Trong `ingame` của `san_tap`, HUD có thêm 2 nút (P menu trên desktop, nút ☰ trên điện thoại):
- **Làm lại**: op `practice{action:'reset'}`. Trọng tài reset công trình, lính, tướng về cấp 1 nhưng vẫn ở `ingame`.
- **Kết thúc**: op `practice{action:'end'}`. Trọng tài chuyển `ingame → lobby` thẳng, bỏ qua `results` (không có thắng thua).
- Trong Sân Tập, Tâm Mạch Đỏ vỡ → `results` với **`winner: null`**: bảng ghi "Hoàn thành Sân Tập · mm:ss" và chỉ số của người chơi, không có chữ thắng/thua, không cộng gì vào thống kê. Hết 20 s → `lobby` như thường. Tâm Mạch Xanh không bị đánh vì phe Đỏ không có tướng; nếu lính Đỏ phá được thì cũng là `winner: null`. Người tập reload/mất mạng → **giữ trận và quyền chủ tối đa 60 s** (quay lại trong 60 s: khôi phục đúng trận, tướng, chỉ số); quá 60 s hoặc bấm **Kết thúc** (rời chủ động) → huỷ, về `lobby`, báo `err.practiceLeft`. Trong lúc giữ, **không trao quyền chủ cho spectator**. Cùng luật cho Đấu Với Máy (phòng một người). (@lukasai chốt 2026-10-08)
- Cả hai op chỉ chủ phòng gửi được, và chỉ khi `mode == 'san_tap'`.

**7. Lệnh sảnh: một lệnh mỗi lúc, quyền theo lệnh.**
- Mỗi người có đúng một ô `player.state.lobbyReq`. **HUD không gửi lệnh mới khi chưa nhận ack của lệnh trước** (`lobby.ack[userId] < req.seq` thì nút mờ, hiện "…"). Trọng tài xử lý mọi lệnh đang chờ ở mỗi tick 250 ms, nên lệnh được ack trong ≤ 0.25 s. Không hàng đợi.
- HUD đợi ack quá 2 s (mất gói, trọng tài khởi động lại) thì gửi lại *cùng seq*. Op idempotent nên vô hại.
- Quyền:

| op | Ai gửi | Phase hợp lệ | Ghi vào |
|---|---|---|---|
| `join{team}` | ai cũng được, trừ người xem Sân Tập (`spectator`) | lobby | ô của chính mình |
| `leave` | ai cũng được | lobby, picking | ô của chính mình |
| `mode{mode,map}` | chủ phòng | lobby | lobby.mode, lobby.map |
| `start` | chủ phòng | lobby | phase |
| `hover{hero}`, `lock` | người trong roster | picking | lựa chọn của chính mình |
| `practice{action}` | chủ phòng, mode san_tap | ingame | trận |

- Lệnh sai quyền hoặc sai phase vẫn được ack, kèm `lobby.err[userId] = { seq, code }` (`not_host`, `bad_phase`, `team_full`, `hero_taken`, `spectator`). HUD hiện lỗi 2 s.

**8. Danh tính & "Về phòng" sớm.**
- **Khoá duy nhất là `userId`** (`pa_…`, bền qua reconnect), không dùng playerId. roster, ack, err, joinOrder, results đều theo userId. Trọng tài tra người đang online qua `ctx.place.players.find(p => p.userId === uid)`. playerId chỉ dùng trong tick để ghi vào thân người chơi. Quay lại trong 60 s: thân mới có cùng userId nên tự khớp ô cũ, `hero.js` thấy roster có mình thì khôi phục tướng/đội từ `match.saved[userId]` (cấp, xp, vàng, đồ, K/D/cs, chụp lúc rời).
- **Về phòng sớm** (phase vẫn là `results`): `player.state.view = 'room'` thì HUD vẽ giao diện phòng chỉ xem: đội và ô như cũ, các nút mờ, dòng "Trận vừa xong · phòng mở lại sau Ns". Lệnh qua trọng tài gửi lúc này đều bị `bad_phase`, nên HUD làm mờ hết. Chỉ thao tác cục bộ dùng được. Có nút "Xem lại kết quả" để về `view = 'results'`. Phase về `lobby` thì `view` tự bỏ qua.

**9. Schema trạng thái sảnh** (`ctx.place.state.lobby`; chỉ trọng tài ghi, mọi HUD đọc):
```yaml
lobby:
  phase: lobby | picking | loading | ingame | results
  phaseEndsAt: number | null      # ctx.now() ms; picking +30000, loading +3000, results +20000; null ở lobby/ingame
  mode: tai_hien | thu_tran | san_tap   # thu_tran = 1 người vs 1 bot (chốt 2026-10-08)
  map: mach_giua                  # map ID mới, thêm vào 09 §2
  host: userId | null
  joinOrder: [userId]             # thứ tự vào phòng; host = phần tử đầu còn online; rời phòng thì bị xoá
  teams:
    blue: [userId]                # ≤ 5, thứ tự = ô hiển thị
    red:  [userId]                # san_tap: luôn rỗng
  names: { userId: displayName }  # chụp khi join, để vẽ ô của người đã rớt mạng
  pick:                           # chỉ có giá trị ở picking/loading/ingame
    userId: { hero: hero_id | null, locked: boolean }
  ack: { userId: seq }
  err: { userId: { seq, code } }
  matchId: number                 # +1 mỗi lần vào ingame; hero.js reset khi thấy matchId mới
  disconnected: { userId: until } # ms; giữ ô ingame 60 s
match:                            # ctx.place.state.match; tạo ở picking→loading, xoá khi về lobby
  roster:                         # đóng băng cho cả trận; nguồn duy nhất của tướng/đội
    userId: { team: blue | red, slot: 0..4, hero: hero_id, name: displayName }
  startedAt: number | null        # ctx.now() khi vào ingame
  saved: { userId: { hero, team, level, xp, gold, items, k, d, cs } }  # chụp khi người chơi rớt mạng
results:                          # ctx.place.state.results, chụp khi có winner, trước mọi reset
  matchId, winner: blue | red | null, seconds, mode, map   # null = Sân Tập hoàn thành
  rows: [{ userId, name, team, hero, level, k, d, cs, gold }]
```
`player.state` (thân người chơi, mỗi người tự ghi): `lobbyReq: { seq, op, ...args }` (seq bắt đầu từ `lobby.ack[userId] + 1` khi vào phòng), `view: 'room' | 'results' | null`, `locale: 'vi-VN' | 'en'`.
Người xem Sân Tập = có trong `joinOrder` nhưng không có trong `teams`.

### Việc
- [ ] B1. `scripts/lib/data/strings.yml` `{vi-VN,en}` + `t(key, locale)`; script sinh khoá `hero.*` từ roster CSV (6 tướng slice); chuyển mọi chuỗi HUD viết cứng sang bundle.
- [ ] B2. Trọng tài `places/main/sim.js` theo B0.2–B0.4 (phase, seq/ack, chủ phòng, rời/mất kết nối, timer, roster, results snapshot). World `sim.js` để trống.
- [ ] B3. `hero.js`: bỏ `pick`; nhận tướng từ roster khi vào `ingame`; ngoài `ingame` thì không có tướng, đứng ở sảnh. `lane.js`: chỉ chạy lính/trụ khi `ingame`, reset công trình khi trận mới.
- [ ] B4. Màn chính: CHƠI · TƯỚNG (6 tướng, vai trò, kỹ năng) · TRUYỀN THUYẾT (doc 01) · nút VI/EN · tranh nền.
- [ ] B5. Chọn chế độ + map theo bảng B0.1 (thẻ khoá có lý do).
- [ ] B6. Phòng: 2 × 5 ô (tên + ảnh Spawn, "Trống"), đổi đội, rời, chủ phòng đánh dấu ♛, BẮT ĐẦU kèm lý do khi mờ. Chỉ dẫn: mời bạn / chat dùng thanh Spawn bên phải.
- [ ] B7. Chọn tướng 30 s: hover, khoá, không trùng (PvP: cả trận; bot/Sân Tập: trong đội), ngẫu nhiên khi hết giờ. Màn loading đối đầu 3 s.
- [ ] B8. Bảng kết quả 20 s từ `results`, nút "Về phòng".
- [ ] B9. Điện thoại: mọi màn sảnh vừa 390 px chiều ngang (landscape 844×390), nút chạm ≥ 44 px. Trong trận giữ HUD kiểu Liên Quân. Ẩn cụm nút chạm khi không ở `ingame`.
- [ ] B10. Rà soát thao tác và khả năng đọc của sảnh: mọi hành động có affordance rõ; nếu bề mặt UI hỗ trợ bàn phím thì có thứ tự focus nhìn thấy được, mở/đóng overlay không làm mất focus hoặc gửi nhầm lệnh trọng tài; lỗi/trạng thái không chỉ phân biệt bằng màu; VI/EN không bị cắt ở các viewport B9. Không giả định DOM/ARIA hay thêm binding mà host chưa hỗ trợ.

## D. Audit sau khi làm
- [ ] D1. Chạy thử trọn luồng bằng thân thử: màn chính → chế độ → phòng → chọn → vào trận → kết thúc → về phòng. Ảnh chụp từng màn.
- [ ] D2. Đọc log: không lỗi behavior.
- [ ] D3. Xem trên khung điện thoại.
- [ ] D4. Ghi kết quả audit vào cuối file này, mục nào chưa đạt ghi rõ.
- [ ] D5. Ghi evidence cho B10: thao tác keyboard trên các surface hỗ trợ, focus visible/return khi đóng overlay, trạng thái lỗi phân biệt ngoài màu, và capture VI/EN trên viewport đã chốt; phần host không hỗ trợ phải ghi `N/A` kèm surface/build, không tự đánh PASS.

## E. Evidence 2026-10-08 (Savi, build v485+, data `scripts/lib/data/lobby.yml`)

**Bộ kiểm trọng tài:** `bun tools/test/lobby-referee.mjs` chạy `places/main/sim.js` thật với place giả (người chơi, lệnh, đồng hồ; khởi động lại = nạp module mới). Kết quả **39/39 PASS**: LOBBY-02…06, PICK-01/02, GAME-01/02 (phần trọng tài), RES-01, PRAC-01/02. Không sửa luật nào để test qua; một lần FAIL là lỗi của chính bài test (đọc err sau lệnh lock), đã sửa bài test.

**L10N-01 (HUD trong trận):** trước lượt này `scripts/ui.js` viết cứng tiếng Việt (CHỜ/HẾT, lính, Cửa hiệu, tên đồ, Bạn đã gục, Về nhà…, CHIẾN THẮNG/THẤT BẠI, NÉ/DV, gợi ý phím) và `hero.js`/`bot.js`/`lane.js` ghi feed/thông báo bằng câu tiếng Việt. Đã chuyển hết sang khoá bundle (`msg.*`, `feed.*`, `struct.*`, `hud.end/wait/dodgeShort/relicShort/recallShop/respawnShop`); feed giờ là `{ key, vars }`, HUD dịch theo locale của *người xem*. Quét lại: 0 chữ có dấu trong code của `ui.js` / `lobby-ui.js` ngoài comment. Ảnh: render `ui.js` thật ngoài engine (mock ctx, locale `en`): Shop, tên đồ EN, "not enough gold", "Triều Vực lost a Vein Spire", "cs 31", "B recall · P". Ô vuông ở chữ có dấu trong ảnh là do ảnh ngoài engine không nạp font CLTC (A5 đã kiểm trong engine).
- Từ mới chưa có trong 05: **Siêu Linh Binh → "Super Veinbound"** (ghép từ `unit.minion` = Veinbound). Cần chủ dự án duyệt → ghi vào 05.

**Còn NOT RUN / BLOCKED (cần màn hình người chơi thật, không tự đánh PASS):**
- LOBBY-01, RES-02, MOB-01, B9/B10/D3/D5: cần chụp sảnh trên client người chơi; client Savi chỉ có thân thử, phòng dev đang có @lukasai làm chủ phòng, nên mọi lần chạy 5v5 sẽ kéo creator vào trận. **BLOCKED: cần creator cho phép dùng phòng dev hoặc mở phòng riêng.**
- GAME-02 phần khôi phục chỉ số trên thân (`hero.js` đọc `match.saved`) và L10N-01 "giữ sau khi tải lại": cần rớt/vào lại bằng client thật. NOT RUN.
- Ghi chú phạm vi: `lobby.yml` hiện bật `thu_tran` (Đấu máy) vì bot đã được làm sau B0 theo yêu cầu creator; B0.1 viết "khoá" là bản cũ. Không đổi gameplay; chờ creator xác nhận để sửa dòng B0.1/D15.

## Playtest Codex 2026-10-08 (source 60ba2da, runtime v513–516)
- [x] P1. Spectator (không có trong `match.roster`) hiện thân trắng ở căn cứ → `hero.js syncRoster` ẩn thân khi `lobby.phase === 'ingame'` và không có ô. v522: PASS một phần (fluxby ẩn; livelyforestfd0a9 đang preview tướng, thân do room giữ, vẫn hiện). Sửa lần 2: trọng tài `places/main/sim.js` ẩn mọi thân online không có ô roster sống khi `ingame`/`loading`, hiện lại khi về lobby. Test trọng tài 39/39 PASS; CHƯA kiểm trên peer chủ phòng trong trận. **2026-10-08 Codex retest source 841389e / runtime v545: PASS** — spectator online và spectator parked đang preview tướng đều ẩn khi ingame, hiện lại khi End về lobby. Đính chính v522: khối ở mép phải ảnh là mái décor, không phải thân spectator.
- [x] P2. Không có VI/EN trong trận → chip VI/EN cạnh bảng tỉ số (desktop + phone), cùng `sendAction('locale')`. v522 desktop PASS (Codex); phone CHƯA.
- [x] P3. @lukasai chốt 2026-10-08: “Sân Tập khi chủ phòng reload hoặc mất mạng thì giữ trận và quyền chủ tối đa 60 giây. Quay lại trong 60 giây: khôi phục trận. Quá 60 giây hoặc bấm rời chủ động: hủy trận, về sảnh. Không trao quyền chủ cho spectator.” Spec dòng 55 sửa theo. Code `places/main/sim.js`: phòng một người (Sân Tập, Đấu Với Máy) đang `loading`/`ingame` giữ host khi host mất kết nối trong 60 s; hết 60 s không ai trong roster → `toLobby` kèm `err.practiceLeft` (chuỗi VI/EN mới). Rời chủ động = nút Kết thúc, hoặc lệnh `leave` của chủ phòng giữa trận (cả hai huỷ ngay); thoát game qua Spawn không phân biệt được với mất mạng nên đi đường giữ 60 s. Test trọng tài PRAC-03 (8 kiểm) → 47/47 PASS. Client thật: CHƯA kiểm.
- [ ] P4. Client thật (Codex, runtime 551→554, 2026-10-08): reload khôi phục match11/Vân Dao/item/EN, chủ giữ; đóng tab quá hạn → lobby, `err.practiceLeft`, không trao host khi ingame (PASS). Lỗi: hạn dời +58.27 s khi runtime cập nhật; sau huỷ, thân treo `livelyforestfd0a9` (không có tab, không chạy hero.js) làm chủ sảnh. Nguyên nhân giả định: phòng liệt kê thân treo như người online. Sửa: hero.js gửi nhịp `state.beat` mỗi 2 s từ tab sống; trọng tài chỉ coi là có mặt khi nhịp < 15 s; hạn 60 s tính từ nhịp cuối, có log `referee: hold/back`. Lệnh `leave` của chủ giữa trận cũng huỷ ngay. Mock PRAC-04 → 54/54 PASS; phòng dev đã trả chủ về lukasai (đọc state). Retest Codex build 7be6b6c/runtime 560 đứng yên: Sân Tập + Đấu Máy hạn = nhịp cuối + 60000 ms, huỷ đúng hạn, không đổi host khi ingame (PASS timeout); Đấu Máy quay lại 33.6 s giữ match/tướng/bot/chủ (PASS reconnect); Sân Tập End về lobby ngay (PASS).
  - Nút **Rời trận** (`prac.leave`) trên thanh solo của chủ phòng, cả Sân Tập (cạnh Làm lại/Kết thúc) và Đấu Máy; gửi `op: leave` qua cùng đường lobbyReq/ack; trọng tài huỷ ngay, notice `err.soloLeft`, dọn bot. Mock 56/56 PASS. Client thật (Codex, client source 55249a0, sau seq 586): Sân Tập bấm Rời trận → req74 op leave, ack74, về lobby ngay — **PASS Sân Tập**. Đấu Máy: nút CHƯA kiểm (NOT RUN).
- Ghi chú: 39/39 là assertion trọng tài mock, không chứng minh UI/hero.js/mạng.
- [x] P4. (báo cáo `reports/2026-10-08-playtest-codex.md` §source 1–2) Phòng trong `results`: footer có START mờ, không bấm được; nút đổi tên chỉ hiện ở `lobby`; trọng tài trả `bad_phase` cho `rename` ngoài `lobby`. Code + 39/39 PASS; Codex v545 xác nhận code đúng (source review). RES-02 runtime client và mobile vẫn CHƯA nghiệm thu.
- [ ] P5. QA-04 Tâm Mạch quá sáng ở fountain: chưa làm, chờ vòng art.

## Playtest Codex gameplay UX (match22–25, 2026-10-08; report `playtest-report.md` local Codex, chưa push)
Không đổi số gameplay/camera/vision. Phạm vi PASS chỉ đúng những gì client đã thấy.
- [ ] UX-P1. Chọn mục tiêu bằng click thân (hero.js rayPick theo dải chiều cao thân + outline/vòng mục tiêu). match23/round39 (ca498b2): **PASS có giới hạn** — click thân lính nhỏ → outline đỏ + vòng, tướng đánh, CS 0→2; click đất trống → vòng xanh, đi. Trụ target→tiếp cận→đòn trúng: INCONCLUSIVE. Lính xe/tướng/chiêu chỉ định: NOT RUN.
- [ ] UX-P2a. Tướng mình trong bụi. Viền xray xuyên lá (match24/round40, 85fd713): CHƯA ĐẠT. Thay bằng lau mờ local + vòng chân: match25/round41 (e5a5ed9, Mị Đăng L1, không item/bot) **PASS local** — vào river-top-blue lau mờ, thân rõ, vòng chân; ra ngoài lau đặc, vòng tắt. Góc nhìn địch / 2 client: NOT RUN.
- [ ] UX-P2b. Cue trụ (hero.js drawTowerCue, ui.js danger). match25/round41: vòng tầm nhạt PASS; trụ tank lính → tướng giữ 767 HP; lính hết → aim chuyển tướng; vòng đỏ + viền đỏ thân trụ PASS (ảnh 10:30, 297/767 HP). Âm cảnh báo một lần + nhịp viền đỏ HP < 35%: CHƯA xác minh. Ngưỡng tầm+5 m / 35%: chọn khi code, chưa duyệt. 2 client: NOT RUN. Runtime seq chưa xác minh.

## G. Gap docs chặn triển khai (Savi, 2026-10-08, chờ quyết định)
- [x] G1. **Camera — XONG 2026-10-08.**
  - Status: hiện hành = camera trận khoá kiểu AOV/LoL (USER LOCK @lukasai #7781).
  - Nguồn số: `scripts/lib/data/camera.yml` (pitch 56°, distance 17 m, zoom 11–26 m, yaw theo phe); doc không chép số khác.
  - Đã đồng bộ: 04 §1.1, 06 §2 + §7, 11 MAP-05, 13 §2 + §6, 27 G4, design.md.
  - Lịch sử: bản đầu ghi “qua vai, 4,2 m, không top-down/isometric [USER LOCK]”; mốc 24 m / zoom 16–32 m là số trước lượt kéo camera gần (2026-10-07). Cả hai đã bị thay, không còn hiện hành.
- [~] G2. **Mục tiêu độ dài trận Mạch Giữa + HP công trình.** CHỐT KHUNG 2026-10-08 · @lukasai "làm luôn": **12–20 phút**. HP công trình chưa đổi: chỉ đề xuất sau đo (b)/(c), creator duyệt. BAL-02 (20–35 phút, ≥ 90%) viết cho 5v5 ba lane; 08 §7.1 HP công trình “mở, chưa chốt”, mô hình cho trung vị ~5 phút. Slice hiện chỉ 1 lane. Cần: khung thời gian riêng cho Mạch Giữa (đề xuất 12–20 phút) và cho phép chốt HP từ số đo phá trụ thật. Xong khi: 08 §7.1 có số chốt + balance-log + BAL-02 tách dòng Slice/V1.
- [x] G3. **Phạm vi nghiệm thu Slice vs V1.** XONG 2026-10-08: 11 §3 có cột Phạm vi cho mọi dòng; DEFERRED chỉ đổi phạm vi, status giữ thật; thêm BAL-02S (Slice, TBD-SIM). 11 MATCH-01..03, MAP-01..03 đòi 3 lane, 12 camp, 5v5 bot-fill; Slice 1.5 = 1 lane, Đấu Máy 1 bot. Cần: cột “Slice 1.5 / V1” cho mọi dòng 11, dòng V1 ghi `DEFERRED (roadmap)` thay vì NOT RUN chặn. Xong khi: danh sách gate của bản chơi trọn vòng đếm được.

### G2 — plan đo (chưa đổi số, chưa chốt; creator duyệt khung và HP)
Nguyên tắc: baseline = data đang ship; không tự đổi số; không biến đề xuất thành USER LOCK; chưa đạt ghi FAIL/TBD-SIM.

1. **Baseline ship:** `structures.yml` — T1 2800, T2 5400 (armor 40/65, trụ 150 dmg / 1,2 s), Tâm Mạch 4000 + khiên 3000 (hồi sau 12 s), tia 120 / 1 s + ramp 0,2; lính theo `minions` (30 s, 3/2/1, cap 14, Siêu Linh Binh +1 mỗi trụ đổ). `match.mjs` RULES hiện là bộ thử ×3,5 + mô hình V1 → không dùng làm baseline.
2. **Profile `slice` trong `match.mjs`** (công cụ, không đổi gameplay): đọc công trình/lính từ `structures.yml`; 1 lane; **tắt** Call, Titan, `fortify` (−70% tới 840 s), camp; `coreBeam` = 120/1 s + ramp ship thay 260 × T2; roster theo mode: Tái Hiện N người/phe (chạy 1v1, 2v2, 5v5 trên một lane), Đấu Máy 1 người vs 1 bot. Profile `v1` giữ nguyên hiện tại.
   - Abstraction còn lại (ghi trong báo cáo): bước 1 s; giao tranh theo `fightExponent` chứ không mô phỏng chiêu/vị trí; sức tướng từ `duel.mjs makeHero`; wave đẩy trụ qua `siegeDps`/`reachSeconds` (lấy từ đo thật ở bước 3), không mô phỏng từng lính.
3. **Đo thật (dev room, client):** mỗi ca ≥ 3 lần, ghi cấp/đồ/tướng.
   - (a) wave một mình; (b) wave + 1 tướng (Sân Tập hoặc Đấu Máy); (c) wave + 2 tướng **cùng phe**: cần Tái Hiện với 2 người thật cùng đội hoặc fixture dev đặt 2 thân cùng phe. Đấu Máy (1 người + 1 bot địch) không đo được ca (c).
   - Log: `towersDown` hiện là ms từ `startedAt` (mốc đổ). Cần thêm mốc **bắt đầu siege** = lần đầu trụ nhận damage, `siegeAt[id]`, cùng gốc `startedAt` → thời gian phá = `towersDown − siegeAt`. Đây là log đo, không đổi gameplay; thêm khi bắt đầu bước 3.
4. **Hiệu chỉnh:** đưa siegeDps/reachSeconds/thời gian phá đo được vào profile `slice`, chạy 300 trận seed cố định, ghi seed + giả định + phân bố vào `balance-sim-<ngày>.md`.
5. **Đề xuất:** bảng HP công trình + khung thời gian (đề xuất 12–20 phút, chưa duyệt) kèm số đo → creator duyệt. Duyệt xong mới sửa `structures.yml`, 08 §7.1, `balance-log.md`; BAL-02S đổi TBD-SIM → PASS/FAIL theo kết quả.

Tiến độ 2026-10-08: bước 2 XONG (`tools/balance/slice.mjs`, báo cáo `reports/balance-sim-2026-10-08-slice.md`, TBD-SIM); log `siegeAt` + `towersDown` Tâm Mạch đã có trong lane.js; bước 3–5 NOT RUN.
Cập nhật 2026-10-08 (sau): Live run 1 — (a) PARTIAL/censored, (b′) 1 bot dev đo 1 lần, (b)/(c) NOT RUN (`reports/balance-sim-2026-10-08-slice.md`). Log G2 từ seq 584–586 gắn `_round` (`scripts/lib/g2log.js`, `place.state.g2Trace`); READ trả `logOk`, dòng `logOk:false` không ghi nhận. Reset: dev 3 lần PASS; client Codex (55249a0, match17 Sân Tập, round 28→31) với siege tự nhiên T1 xanh round 29 → reset 30 chỉ còn `{_round:30}`, laneReset sau 33 ms — **PASS client reset siege tự nhiên**. Reset khi có `towersDown` thật: PASS dev (run 2, round 32→33). Live run 2 ca (a) đầy đủ: T1 đỏ phá 760.8 s, T2 đỏ 307.9 s, Tâm Mạch chưa tới ở 25 phút (censored); (b)/(c) NOT RUN. Nguyên nhân giá trị cũ ở run 1: chưa chứng minh. BAL-02S giữ TBD-SIM.

Xong khi: có profile `slice` + log đo thật (a/b/c) + báo cáo sim + đề xuất; số ship chưa đổi tới khi creator duyệt.

## W. Nhóm Wisp song song (2026-10-08, yêu cầu lukasai qua Codex)
Savi giữ quyền tích hợp `hero.js`/`bot.js`/`places/main/sim.js`/`lane.js`/`combat.js`, docs canonical và push. Wisp không sửa chung file; cần đổi file của nhóm khác thì giao patch trong report. Report mỗi nhóm: `docs/co-linh-than-chien/reports/wisp-<A|B|C>-2026-10-08.md`; Savi tích hợp vào doc canonical. Phần chưa test giữ NOT RUN.
| Nhóm | Owner | File được sửa | Nguồn docs | Tiêu chí xong | Status |
|---|---|---|---|---|---|
| A UI/mobile | Wisp A | `scripts/ui.js`, module mới `scripts/lib/hud-*.js`, `tools/l10n/ui-strings.yml` → `scripts/lib/data/strings.yml` (qua build-strings.py), `world.config.yaml` chỉ khối `inputs.touch` | doc19 §4 Mobile, doc14 B9, doc11 MOB-*, references/gameplay ảnh 5 | HUD mobile 844×390 + 390×844 theo §4; ô chiêu báo hồi chiêu / thiếu mana / R khoá; VI–EN không cắt; ảnh `look target:player device:phone` từng trạng thái | RETURNED 2026-10-08: `scripts/lib/hud-touch.js`, `hud-controls.js`, nhánh phone trong `ui.js`, `inputs.touch` (stick trái), strings VI–EN. Fixture ngoài engine 8 ảnh (844×390, 390×844 × VI/EN × sống/gục): không đè rail, không tràn, không cắt chữ, nút nhỏ nhất 46 px. Savi: `node --check` 3 file OK; dev room đang ở sảnh nên chưa có trận để xem. **Client điện thoại thật trong trận: NOT RUN** (giao Codex). Mở: O2 stick có thể hiện ở màn loading (chưa kiểm), O3 NÉ chưa hiện thể lực. Report: `reports/wisp-A-2026-10-08.md` |
| B Art/animation | Wisp B | `scripts/lib/skillfx.js`, `scripts/lib/data/skill-clips.yml`, `scripts/tex-skillmark.js`, `scripts/lib/data/{weapons,grips}.yml`, `scripts/gen/weapons.js`, `art/`, `clips/` | doc24 T1/T2/T5, doc25, doc28, doc30 | Bảng ô thiếu (6 tướng × LMB/Q/RMB/E/R × cast/fly/land/hit + clip) lấp hoặc ghi BLOCKED có nguồn; asset manifest (hero, slot, ref/CDN, proof); không đổi kit | RETURNED 2026-10-08: 12 hit mới trong `skillfx.js` (preview dev, NOT RUN trong trận); 30 clip đủ; cast skill tự thân (moc_lam rmb/e, nham_vu e, van_dao e) **đã thêm 2026-10-08 (`SELF_CAST`); Codex client m30–m32 r47–49: PASS giới hạn hiệu ứng quanh thân; W Mộc Lẫm bị trắng (m34 r52 CHƯA ĐẠT) → 2026-10-08 sửa 3 chỗ: (1) `glass()` đổi col/tint của card alpha từ màu màn hình sang linear (^2.2): thử dev, cùng sprite chip col <.36,.31,.24> ra trắng, <.11,.08,.04> ra nâu đất ⇒ mọi đá/bụi/lá alpha của 6 tướng trước đây vẽ nhạt; (2) rmb.land: veil JADE add → alpha xanh, flash 18→6; (3) khiên `highlightSet` glow #9fe8ff (halo trắng ôm thân, hero.js+bot.js) → outline mảnh màu HERO_COL. Chưa retest client**; hit Hỏa Tủy sáng hơn (`HOT`); m33 r50 cast/CD/mana/vùng chạy, hit trúng lính INCONCLUSIVE; xoay hướng click-move đã sửa, NOT RUN; trước đó: Savi đọc `hero.js:674` và `bot.js:184`, cả hai đã phát `skillFx(…,'cast')` cho mọi phím kể cả aim self → chỉ thiếu mục `cast` trong KIT của `skillfx.js`, không cần sửa hero.js; hit additive (hoa_tuy) còn mờ; telegraph địch BLOCKED. Report: `reports/wisp-B-2026-10-08.md` |
| C Balance | Wisp C | `tools/balance/*` (công cụ + out/), report | doc08 §7.1, doc11 BAL-*, doc14 G2, balance-log.md, balance-sim-2026-10-07.md, `tools/measure/g2-fixture.js` | Profile Slice (Mạch Giữa 1 lane, 6 tướng) chạy được có seed; rà giả định vs trace G2 sẵn có; đề xuất kèm evidence; không đổi data ship; b/c giữ NOT RUN | RETURNED 2026-10-08: `tools/balance/slice.mjs` (+ map.yml travelGate, mode `waves`), `tools/balance/g2compare.mjs`, output `tools/balance/out/*-2026-10-08.json`; Savi chạy lại được (seed 1000, n 50). Bảng 13 giả định: 3 MATCH/CONSISTENT, 2 MISMATCH (A4 lính một mình phá trụ, A6 Sân Tập sim nhanh ~6×), còn lại UNKNOWN. P1/P2 đề xuất đo thêm case (a)/(b), P3 khung trận 12–20' **BLOCKED** chờ @lukasai. Không đổi số ship; G2 b/c NOT RUN. Report: `reports/wisp-C-2026-10-08.md` |
| D Docs status | Wisp D | chỉ `reports/doc-status-2026-10-08.md` | README + doc 01–38 | bảng trạng thái từng doc + ≤3 gap (#14293, #16131) | RETURNED 2026-10-08; 3 gap đã chốt cùng ngày (design.md) |
| E Checkbox docs | Wisp | doc 15/20/21/24 | doc-status 2026-10-08 | checkbox khớp code/evidence | RETURNED 2026-10-08: 20 ô đổi, docs-check ALL PASS |
| F Tooltip VI–EN | Wisp → Savi | `scripts/lib/tooltip.js`, `tools/l10n/tip-strings.yml` → `strings.yml`; Savi nối `scripts/ui.js` slotTip | 11 DATA-03, 05 | 39 khoá tip.* vi-VN/en, số từ heroes.yml theo cấp chiêu | RETURNED + nối HUD desktop (title ô chiêu) 2026-10-08; đọc dev OK; client NOT RUN; mobile chưa có chỗ hiện; Vân Dao E = chỉ bản thân (@lukasai chốt 2026-10-08) |
| G Mock Đấu Máy | Wisp | `tools/test/lobby-referee-bot.mjs`, `reports/referee-bot-2026-10-08.md` | 15, 14 §B0 | luồng thu_tran trọn vòng | RETURNED 2026-10-08: 44/44 PASS mock ngoài engine (bộ cũ 56/56); BOT-01S client NOT RUN; chốt: đấu bot được trùng tướng, PvP cấm trùng cả trận (@lukasai 2026-10-08; sim.js pickPool, lobby-referee 56/56 mock) |
| H Áo Bão chắn đạn | Savi | `combat.js interpose`, hero/bot/lane land*, heroes.yml `van_dao.e.shield.block` | 39 | Vân Dao E còn khiên → thân chắn đạn có mục tiêu bắn vào đồng minh phía sau | DEV 2026-10-08: node --check OK, tooltip VI/EN cập nhật; dev chưa có thân tướng để đo; client NOT RUN; balance TBD-SIM (simulator chưa mô hình) |
| I Động tác chết | Wisp (weave-b42441a9) → Savi nối hero/bot | art/anim/*, skill-clips.yml `death` | 25, 28 | 6 clip ngã riêng, audit 0 issue | INTEGRATED 2026-10-08 (hero.js+bot.js: ngã giữ khung cuối, ẩn sau clip+0,6 s, hồi sinh xoá); Kha Tàn đổ úp (đuôi xuyên sàn khi ngửa); trong trận NOT RUN |
| J Tiếng riêng từng chiêu | Wisp → Savi nối | `scripts/lib/data/hero-sfx.yml`, `scripts/lib/hero-sfx.js` | 34 | 36 ô SFX (không VO) | INTEGRATED 2026-10-08 (hero.js+bot.js: chiêu, đánh thường, nội tại, gục); nghe trên client NOT RUN |
| K Kiểm 30 ô chiêu + thân MAP-05 | Wisp | skillfx.js, doc 24/29 | 24 T1/T2/T5, 29, 11 MAP-05 | bảng 30 ô, Mộc W chụp lại, 6 silhouette | DISPATCHED 2026-10-08 |
| B2 Màu VFX | Wisp B2 | `scripts/lib/skillfx.js`, `reports/wisp-B2-2026-10-08.md` | doc30, QA m34 | rà màu alpha sau glass() linear, ảnh proof dev mỗi tướng, client NOT RUN | RETURNED 2026-10-08: rà 82 pop alpha, sửa 6 pop khói Hỏa Tủy (gần đen → khói than); cần client: Hỏa Tủy R/RMB, Mộc Lẫm RMB, Kha Tấn R |

## M. Thu nhỏ toàn map Mạch Giữa — greybox mẫu 50% (2026-10-08, @lukasai qua Codex)
Quyết định: "THU TOÀN BỘ MAP, tỉ lệ hiện tại sai toàn bộ". Mẫu gameplay thô khoảng 50% cho đường, bờ, sông/cầu, bụi/hốc, căn cứ, khoảng công trình. **Giữ nguyên** kích thước tướng, hitbox, kit, speed, damage, camera, tầm trụ 14 m, tầm tia Tâm Mạch 14 m, bán kính hồi máu suối 13 m, bán kính shop 24 m, `towerRadius` 2,4, `nexus.radius` 5,5. Không scale tọa độ máy móc; công trình đặt riêng theo tầm bắn. 50% là **mẫu thử đầu, không phải số balance đã nghiệm thu**. Chưa polish art (doc 38 vẫn giữ).

Trục: u = khoảng cách dọc đường chéo từ tâm cầu về phía căn cứ (Xanh: x = −u/√2, z = +u/√2; Đỏ đối xứng tâm).

| Thứ | Cũ | Mới | Ràng buộc |
|---|---|---|---|
| T1 (u) | 44,5 | **25** → T1–T1 50 m | vùng không trụ nào bắn giữa hai T1: 61 → **22 m** (đủ 2 tướng combat + farm + né, rút về trụ) |
| T2 (u) | 80,2 | **58** → T1–T2 33 m | 14 + 14 = 28 < 33: khe **5 m** ngoài cả hai vùng bắn |
| Tâm Mạch (u) | 130,7 | **77** | T2–nexus 19 m; vùng bắn chồng 9 m trong căn cứ (như LoL) |
| Suối (u) | 157,4 | **93** | nexus–suối 16 m |
| Căn cứ | tâm u 148,5, r 30 | tâm u 87,7, **r 20** | chứa suối r 13 trọn vẹn |
| Mặt đường / bờ chiến | 18 / ±22 | **10 / ±12** | vách leo 9 → 5 m, cao 15 → 7 m (không che camera 56°) |
| Sông | nửa rộng 12 | **6,5** | đáy −3,2, nước −2,0 giữ |
| Hốc nấp | r 11 | **r 6** | 4 hốc, đặt theo phép ánh xạ |
| Bụi | rx 3,5–4,5 rz 6–8 | **≈ ×0,6** | 12 bụi, đặt theo phép ánh xạ |
| Cầu | scale 0,7 | **0,38 ngang, 0,7 cao** | sàn 13 × 30 m, phủ mặt đường 10 m |
| Biên map | ±130 | **±88** | minimap, click bản đồ |
| Hình trụ | nòng 10,5 / 12,5 | **8,4 / 10** (cao ×0,8) | đế, collider, hitbox giữ |
| Tâm Mạch hình | — | cao ×0,85 | collider/hitbox giữ |
| Decor | — | vị trí theo ánh xạ, cỡ ×0,6 | vẫn chỉ trên vách |

Ánh xạ decor/bụi/hốc/đường: u theo từng đoạn 0→0, 44,5→25, 80,2→58, 130,7→77, 157,4→93 (ngoài: ×0,6); khoảng cách ngang ×0,545 (22 → 12).

### TODO
- [x] M1 `map.yml` số mới + `cliffRise/cliffHeight/cliffNoise/riverEdge`; `terrain.js` đọc tham số (đọc dev: tim đường cao 0, sông −3,2, vách +7..11 ở ±15–20 m)
- [x] M2 trụ/Tâm Mạch/suối/shop/cầu đặt lại (đọc dev: vị trí khớp `map.yml`); 42 decor đẩy khỏi bờ chiến ra chân vách; scatter cây ×0,6; `defaultSpawnPoint` (−65.8,65.8). Shop đổi chỗ (−49.5,72.1) vì vành suối 13,8 m đè lên. Cầu scale đều 0,5 (scale không đều làm méo dốc đầu cầu)
- [x] M3 minimap trận + thẻ map sảnh vẽ từ `map.yml` (hành lang, sông, bụi); bỏ ảnh vẽ map cũ vì lệch tỉ lệ; ký hiệu giữ cỡ màn hình
- [x] M4 sơ đồ `assets/mach-giua-greybox-50-2026-10-08.png` (vòng tầm 14 m, suối 13 m, số đo); script `tools/map/diagram-2026-10-08.py`
- [~] M7 dựng map theo ảnh ý tưởng — **USER LOCK 2026-10-08** (@lukasai qua Codex): ĐÃ DUYỆT hướng art `map1-1-ref1` + `map1-1-ref2`; chi tiết + nhóm dựng ở doc 38 §11. Art reference, KHÔNG phải geometry: tọa độ/bụi lấy từ `scripts/lib/data/map.yml` (nguồn geometry hiện hành), tune trên mẫu 50%; kit/hitbox/số combat/camera giữ. Không cần hỏi lại duyệt art; góp ý art cũ của Codex không còn là gate.
- [~] M5 ảnh góc chơi desktop: khung camera 56°/17 m/FOV 42 dựng tay trong dev (render engine, không phải client trận). **Mobile thật: NOT RUN** (cần thiết bị phone được hỗ trợ, như MOB-01)
- [x] M6 doc 38 §3 viết lại; design.md ghi quyết định
- Script tái lập: `tools/map/{gen-map,shrink,push-decor}-2026-10-08.py` (shrink chỉ chạy MỘT lần trên scene cũ)

### Chưa test (NOT RUN)
Trận client thật trên map mới (Codex); lính/bot đi đường và giữ khoảng `towerMargin`; bot/hero bị kẹt vách 7 m hay ở cầu; tầm nhìn bụi; camera có thấy vách che không; HUD minimap trên client; mobile thật; thời lượng trận 12–20' (sim slice đau_may median 23,1' cả trước lẫn sau — mô hình gần như không nhạy với địa hình ngoài thời gian đi bộ ⇒ **TBD-SIM**); balance. Cầu/đèn/cây là greybox, chưa duyệt art.
- [ ] Không chạm: `structures.yml`, `economy.yml`, `heroes.yml`, `camera.yml`, `lane.js` logic

## R. Audit UI responsive theo màn hình (2026-10-08, @lukasai: "toàn bộ UI của game chưa responsive theo device hay màn hình")
Mốc: desktop 1280×720 · 1366×768 · 1600×900 · 1920×1080 · 2560×1440 · ultrawide 2560×1080; tablet 834×1194 + ngang; phone 390×844 + ngang 844×390.
### TODO
- [x] R1 Chụp sảnh (Chơi/Phòng/Chọn tướng) ở từng mốc, ghi chồng lấn/tràn/chữ quá nhỏ.
- [x] R2 Audit code HUD trận: kích thước px cố định ở scripts/ui.js, hud-std.js, lobby-ui.js.
- [x] R3 HUD trận desktop: tỉ lệ tự động theo màn hình (chuẩn 1920×1080) × Cỡ HUD người chơi (H), không đổi bố cục chuẩn v1055.
- [ ] R4 Sảnh: tự co theo chiều cao/rộng, không tràn dưới rail Spawn (phải 50 px).
- [ ] R5 Chụp lại sau sửa ở đủ mốc; phần không chụp được (HUD trận trên máy thật) giữ NOT RUN.
### Kết quả (Savi, v1060, ảnh preview client CPU, không phải nghiệm thu)
- 1280×720 sảnh: vừa, nút Bắt đầu sát đáy. 1194×834 tablet ngang: PASS preview. 2560×1440 trước sửa: chữ ~quá nhỏ (px cố định).
- 390×844 phone dọc: sảnh VỠ: thanh menu tràn phải, cột đội/bản đồ chồng nhau, 17 phần tử nằm dưới rail Spawn. Chưa sửa, chờ quyết định: khoá màn ngang hay dựng bố cục dọc.
- Sửa: ui.js bọc UI desktop trong .hz, zoom theo màn hình (chuẩn 1920×1080: 0.68–1.8 theo bậc media query); sảnh chỉ phóng to (≥1), HUD trận co cả hai chiều; nhân thêm Cỡ HUD (H) ở cụm dưới. Sau sửa: 2560×1440 chữ to hơn, 1280×720 không đổi bố cục.
- NOT RUN: HUD trận ở các mốc (không có trận lúc audit), phone ngang trong trận, máy thật.
- Quyết định @lukasai 2026-10-08: "Moba bắt buộc chơi ngang". Điện thoại cầm dọc (dọc + rộng ≤900 px hoặc cảm ứng) hiện màn "Xoay ngang máy" che toàn bộ; không làm bố cục dọc. Preview 390×844: hiện đúng.
- Sảnh desktop trên cửa sổ thấp/hẹp: zoom .82/.7/.56 theo bậc (≤640/540/440 px cao). Preview 844×390: vừa khung; mép phải panel bản đồ còn chạm rail Spawn ~9 px. NOT RUN: máy thật (client CPU giả lập phân loại là desktop, nhánh mobile của sảnh không chạy trong preview).
### R+ HUD mobile / cửa hàng (Savi, 2026-10-08, ảnh trực tiếp tab creator 888×422, chưa nghiệm thu)
- HUD gọn (mobile) chọn theo kích thước màn: cảm ứng HOẶC ≤960 px rộng / ≤540 px cao (ui.js compact()). Cửa sổ desktop nhỏ cũng dùng HUD mobile.
- Nút Sân Tập (Làm lại/Kết thúc/Rời trận) trên mobile chuyển vào Cài đặt như desktop; Cài đặt xếp: Trận đấu → Ngôn ngữ → Cỡ HUD → Phím tắt; khung co theo màn.
- Cửa hàng mới (desktop + mobile, một hàm): mục Tất cả/Vũ khí/Giáp/Bùa/Di vật, lưới icon (art.yml items), thẻ chi tiết (chỉ số, kích hoạt, lý do không mua được), Mua, Bán lại (+60% giá, hero.js sell có sẵn, nay đọc economy.yml sellRatio 0.6 — không đổi số), túi 6 ô. Chọn món/mục là state trình bày (shopSel/shopCat).
- Gợi ý trang bị có nút ✕ (sgHide), rời nhà thì tự hiện lại lần về sau.
- Nút KHÓA chọn tướng tách khỏi khung thông tin, cố định góc dưới phải.
- NOT RUN: bấm Mua/Bán thật ở nhà, máy cảm ứng thật, màn chọn tướng ở 756×442 sau sửa.

### 2026-10-08 · HUD mobile theo ảnh mẫu /cdn/hud-mobile-u1l5turj9.webp
- [x] mobileHud dựng lại trên canvas thiết kế 1180×480 co theo màn: đồng đội trên-trái + thẻ tướng dưới, crest giữa, địch + menu trên-phải; hàng chiêu dưới (Về · Di vật · Né · Q W E R có tên) + nút Đánh lớn; Cửa hiệu + túi đồ + minimap dưới-phải. (ui.js mobileHud, hud-touch.js touchRow)
- [x] Kiểm bằng mắt trên tab desktop 1280×720 với cờ dev `player.state.devCompact` (chỉ phòng dev). KHÔNG phải điện thoại thật.
- [ ] NOT RUN: màn 844×390 thật, bấm cảm ứng, chồng lên rail Spawn, mở cửa hàng ở chế độ gọn.

## L. Polish sảnh phòng (Phòng / CHƠI) — 2026-10-08, @lukasai: "sảnh lobby cần polish lại design. Design cũ quá chật và ko phù hợp với mobile + desktop"
- [x] L1 Phòng vẽ trên một khung thiết kế cố định, co giãn theo màn hình: desktop 1240×600, mobile 800×330; không thanh cuộn, không tràn, chừa rail Spawn + safe-area.
- [x] L2 Thanh đầu phòng: số người · tên phòng (chủ phòng sửa ✎) · Mời bạn — giữ hành vi cũ.
- [x] L3 Cột chế độ: thẻ có biểu tượng + tên (+ mô tả trên desktop); chế độ khóa mờ "sắp có".
- [x] L4 Đội: ô người chơi lớn, viền màu đội, chân dung, ♛ chủ phòng, ô trống kẻ nét đứt; khán giả dòng dưới.
- [x] L5 Cột bản đồ: ảnh map + tên + mô tả (desktop) + nút BẮT ĐẦU cố định đáy; lý do chưa bắt đầu được hiện dưới nút.
- [ ] L6 Audit: chụp 561×312, ~844×390, 1280×720, 1828×860; không chữ bị cắt, không cuộn. Nút Mời bạn / Bắt đầu: NOT RUN cho tới khi bấm thật. — đã thấy 1504×663 (desktop, v1101); mobile chưa chụp.

## H. Audit + làm lại màn TƯỚNG — 2026-10-08, @lukasai: "audit cả màn hình tướng.. Làm full đi"
Audit 1828×860 (v1102): rail tướng thừa nửa dưới trống; chip vai trò 10px khó đọc; mô tả kỹ năng nhỏ; bản mobile là bố cục cũ (bảng 46% + dải icon), chật, không có chỉ số/cốt truyện đủ.
- [x] H1 Một bố cục cho cả hai dạng, vẽ trên khung cố định co giãn theo màn hình (desktop 1240×600, mobile 800×330), như Phòng.
- [x] H2 Rail trái: lọc vai trò (icon + chữ), lưới 2 cột chân dung lớn, cuộn khi nhiều tướng.
- [x] H3 Bảng phải: vai trò · tên · biệt danh · 3 tab. Kỹ năng: hàng 5 icon, bấm = chọn + thử trên bục; chi tiết kỹ năng chọn bên dưới (desktop: cả danh sách mô tả). Thử tất cả giữ.
- [x] H4 Chỉ số: thanh to, số rõ; Tiểu sử: chữ đọc được.
- [x] H5 Nút CHƠI · <tướng> giữa khoảng trống dưới chân tướng.
- [ ] H6 Audit: 1828×860 đã thấy (v1104, gọn, không cắt; danh sách kỹ năng cuộn trong bảng). Mobile 800×330: chưa chụp. không chữ cắt, không cuộn ngoài ý muốn. Bấm thử: NOT RUN cho tới khi bấm thật.

## KHOÁ tướng · 2026-10-09 (#45015, #45261) — đã chốt sửa
- Vào picking, mỗi người được gán sẵn tướng hợp lệ (ưu tiên tướng đang xem `player.state.browse`, trùng thì tướng trống khác). KHOÁ gửi tướng đang hiện. Hết giờ giữ tướng đang chọn; chỉ random khi chưa có lựa chọn hợp lệ. Chữ dưới nút: "Hết giờ: giữ tướng đang chọn" / "Time out: your shown hero is kept".
- PASS fixture 6/6 (harness Node): browse giữ đúng, timeout giữ pick/hover, không browse có mặc định, PvP trùng browse tách tướng, tướng sai bị từ chối.
- **Desktop PASS client, máy Savi** (Chromium 1280×720, Sân Tập, phòng dev, Savi tạm làm chủ phòng rồi trả lại): hiện Vân Dao → KHOÁ ngay không chạm thẻ → khoá Vân Dao → màn đối đầu. Hết giờ không bấm: giữ Hỏa Tủy đang hiện.
- **Mobile PASS giả lập** (Chromium 844×390, cảm ứng giả lập): hiện Mị Đăng / Nham Vũ → chạm KHOÁ → khoá đúng tướng. Một lần chạm đầu không ăn do viewport giả lập tự trả về desktop giữa chừng (lỗi công cụ, không phải game).
- Điện thoại thật: NOT RUN.

## Thử trận compact (2026-10-09 đêm, Savi)

Setup: shared CPU client của Savi (Chromium desktop 1280×720), bật cảm ứng giả lập bằng CDP và ép HUD compact (`devCompact`). Đây **không phải điện thoại thật** và không phải viewport 844×390 (viewport cứ bị đặt lại về 1280×720). Sân Tập, hero Hoả Tuỳ, phòng dev.

| Mục | Kết quả |
|---|---|
| Vào trận, xuất hiện cạnh bồn (lệch 5 m về phía tâm map) | PASS giả lập, ở khoảng (-62, 62) |
| Joystick di chuyển | PASS giả lập: từ bồn chạy ra đường giữa (29, -24) |
| Cast Q/W/E + đánh thường bằng nút chạm | PASS giả lập: đặt hồi chiêu q/e/rmb, số hồi chiêu hiện trên nút |
| Shop: mở, chọn món, mua, đóng ✕ | PASS giả lập: mua Giáp Thiết (750→165 vàng, túi 1/6); thiếu vàng thì nút mờ kèm dòng “not enough gold” |
| Chết → hồi sinh | PASS giả lập: bị Nham Vũ hạ (thông báo hiện), hồi sinh ở điểm lệch (-62, 62), không kẹt trong bồn |
| Về nhà (BACK) | PASS giả lập: “Recalling… 5.4s”, về bồn, `atShop` true |
| Rời trận → về sảnh | PASS giả lập: ☰ → Cài đặt → Rời trận → hộp đếm ngược → Rời ngay → về `sanh` (Play hub) |
| Đổi VI ↔ EN trong trận | PASS giả lập: tên chiêu, món, nút đổi ngay |
| Điện thoại thật / nhiều ngón | NOT RUN |

Lỗi tìm thấy và sửa cùng lượt:
- Hộp rời trận hiện mã chuỗi (`LEAVE.TITLE`, `leave.cancel`…): thiếu 5 khoá `leave.*` → thêm vào `tools/l10n/ui-strings.yml`, build lại `ok 372 keys`.
- Hộp rời trận làm méo chân dung đồng đội và nút R: class `.lv` trùng huy hiệu cấp → đổi thành `.lvc` (`widgets/leave.js`). Đã xem lại: chân dung đúng.
- Bảng Cài đặt trên thiết bị cảm ứng bỏ danh sách phím và chữ “· H” (`panels/sheets.js`, theo `coarse()`). Trên shared client này con trỏ vẫn báo là chuột, nên danh sách phím vẫn hiện; **chưa thấy trên máy cảm ứng thật**.

Còn mở: khoá chuỗi động `ping.*`, `shop.cat.*`, `stat.*`, `team.*` được ghép lúc chạy (bộ kiểm tĩnh không xác nhận được); click xuyên panel chưa có bài kiểm riêng; arrival `main` chưa có mẫu (khi đi qua cửa vào `main` thì không đo; phải boot/tải lại tab khi đang đứng trong `main`).
Sửa ghi chú cũ: model chưa tải xong thì engine **tự xin lại cho tới khi có**; chỉ file không thể tải mới dừng và báo lỗi. Vì vậy không có “giới hạn engine” cho retry model, và thẻ retry riêng cho model không cần làm.

## Chạm xuyên panel + đa điểm (2026-10-09 chiều, Savi)

Sửa (`screens/match/mobile.js`): khi đang mở cửa hiệu / bảng (cài đặt, điểm, chỉ số) / hộp rời trận thì có một lớp phủ (scrim) bên dưới panel nuốt mọi chạm. Joystick nhả ra; joystick và cụm nút chiêu bị làm mờ và không nhận chạm, nhưng vẫn nằm trong DOM để một chiêu đang giữ vẫn nhận được pointerup. Chạm ra ngoài thì đóng cửa hiệu/bảng; hộp rời trận thì không đóng, phải chọn Ở lại / Rời ngay.

Setup như bài trên: shared CPU client + cảm ứng giả lập CDP (touchStart/Move/End thật ở toạ độ màn hình, không gọi thẳng vào element).

| Bài | Kết quả |
|---|---|
| Cửa hiệu mở → kéo vùng joystick 2.5 s | PASS giả lập: không di chuyển, cửa hiệu vẫn mở |
| Cửa hiệu mở → giữ nút Q | PASS giả lập: không cast, cửa hiệu đóng (chạm ngoài) |
| Cài đặt mở → kéo joystick 2 s | PASS giả lập: không di chuyển, bảng vẫn mở |
| Cài đặt mở → giữ nút đánh | PASS giả lập: không đánh, bảng đóng |
| Hộp rời trận → chạm Q + kéo joystick | PASS giả lập: không cast, không di chuyển, hộp vẫn còn; hết giờ thì về sảnh |
| Đa điểm: giữ + kéo joystick, ngón thứ hai bấm Q | PASS giả lập: vừa di chuyển vừa cast Q |
| Điện thoại thật: vùng chạm, safe area, đa điểm, FPS, nhiệt, chuyển app | NOT RUN, cần máy thật |

Ghi chú: đi chéo thẳng từ bồn ra sẽ chạm vào Tâm Mạch xanh (traverseCheck: `nexus-blue`, bậc 2.1 m) nên phải đi vòng. Đây là bố cục, không phải lỗi joystick.

## Quy định model lỗi vĩnh viễn (đề xuất, chờ creator duyệt)

- Mất mạng: Spawn tự xin lại model, `import()` chờ qua lúc rớt mạng. Game không làm retry riêng.
- File không bao giờ tải được: chặn từ trước khi phát hành. `python3 tools/assets/verify-urls.py` kiểm mọi file tải lên trong `bundles.yml` (2xx + đầu `glTF`); lần chạy đầu `ok 67/67`. Chạy cùng `manifest.py check` trước mỗi lần publish.
- Không có màn chờ model trước gameplay (Spawn không cho loading screen chặn người chơi). Trận không treo vì model.
- Còn mở: lúc chạy, game chưa có cách đã kiểm chứng để biết model tướng đã hiện hay chưa, nên chưa có thân dự phòng. `resolver.bundleFor` có nhưng chưa ai gọi: chưa có tải trước model theo đội hình trong lúc chọn tướng. Hai việc này cần xác nhận cách engine làm trước khi xây.

## Đo tải (theo phân loại của creator)

| Chặng | Trạng thái |
|---|---|
| Cold load → sảnh | Có số engine (máy desktop, v1496): đứng sau ~497–547 KB, phần lớn là catch-up trạng thái phòng (~820 KB trước hình đầu), không phải file world |
| Sảnh → trận | Engine hiện không đo khi đi qua cửa: NOT MEASURED |
| Tải lại tab ngay trong trận | Engine có đo (tính cả những gì sảnh đã tải); cần một lần reload thật trong `main`, chưa có mẫu |
| Trận → sảnh | NOT MEASURED, cùng lý do như sảnh → trận |

**2026-10-09 15:44 · creator (@lukasai) chấm sau khi tự chơi:** “mobile+desktop HUD pass”. Đây là kết quả của creator trên máy của creator, sau bản sửa scrim, `.lvc` và chuỗi `leave.*`. Các mục máy thật chưa nêu tên ở trên (safe area, nhiệt, chuyển app) giữ nguyên trạng thái riêng.

### §B0.8 v2 · Reconnect kiểu MOBA (@lukasai 2026-10-09 15:47)
Luật creator: “Disconnect. game vẫn chạy. Người chơi -> bot -> vào lại -> chiếm điều khiển -> Cố ý endgame = End sau 10s ko vào lại được nữa”.
- Luật cũ: PvP giữ ghế 60 s rồi tính rời, tướng đứng im trong lúc chờ. Luật mới:
  - Rớt mạng (mất nhịp `beat`): trận chạy tiếp; `referee/match.js spawnSub` dựng bot thay `sub-<uid>` (scripts/bot.js) với tướng, cấp, đồ, vàng, máu, vị trí cuối của người chơi.
  - Vào lại lúc nào cũng được, miễn trận chưa hết: `takeBackSub` chép lại những gì bot kiếm được vào `match.saved[uid]` (có `at`), xoá bot; `hero/match/roster.js takeBack` lấy lại cấp/đồ/vàng/máu/vị trí rồi người chơi điều khiển tiếp.
  - Cố ý rời (đếm ngược 10 s rồi `op: leave`): bot thay đánh tiếp cho đội, ghế đóng hẳn (`left`), không vào lại được.
  - Đấu Máy/Sân Tập (một người): giữ luật P3, 60 s không quay lại thì huỷ trận; bot thay đứng chơi trong lúc chờ.
  - Mọi người thật đều mất 60 s → đóng trận (giữ như cũ).
- Trạng thái: code đã đặt, build ok. **Chưa chạy trên client: NOT RUN** (cần một lần reload giữa trận; PvP cần 2 người thật).

### Model tướng hỏng: luật tối thiểu (2026-10-09, theo #46464)
- Trong màn VS (loading), lobby referee dựng một probe ẩn cho mỗi tướng trong roster đã đóng băng (audience all → mọi máy cùng tải).
- Vào trận khi mọi probe có `bounds` sau 3 s VS; trễ nhất VS + 7 s thì vào với những gì đã đứng. Không bao giờ treo.
- Tướng không tải được: roster row `fallback: true` → người chơi giữ avatar của mình + dòng `err.modelFallback`; bot/stand-in thành capsule màu phe. Gameplay giữ nguyên.
- Probe engine: model hợp lệ → bounds 1.9 m sau 6 s; URL hỏng → bounds null (đã đo, sanh, 2026-10-09). Cổng runtime trọn vòng: NOT RUN.
- Reconnect: tab creator ẩn → parked → beat dừng → `sub-<uid>` thay chơi, saved state ghi (quan sát runtime match 79). Reclaim khi tab quay lại: chưa quan sát.
