# Cổ Linh Thần Chiến — báo cáo hội đồng playtest 08/10/2026

## Kết luận

Luồng desktop từ sảnh → Sân Tập → chọn tướng → vào trận → Shop → reload → reset → về sảnh đã được thao tác trên client thật. Có tiến triển rõ, nhưng chưa đủ bằng chứng nghiệm thu toàn bộ Slice 1.5 hoặc production. Các kết quả dưới đây chỉ áp dụng cho bước đã thực hiện; không dùng 39 assertion mock để thay cho nghiệm thu client.

Phản hồi đã gửi qua **Tab → chat Savi**, bằng tài khoản creator đang đăng nhập theo chỉ dẫn của lukasai. Nội dung tự nhận là Codex để phân biệt người viết. Savi đã trả lời xác nhận và sửa trong lúc kiểm thử. Ảnh `03-savi-interim-feedback.png` và `08-savi-retest-feedback.png` ghi cả tin gửi và phản hồi.

## Phạm vi và phiên bản

- Game: https://www.spawn.co/@lukasai/c-linh-th-n-chi-n
- Repo chuẩn: `D:\Project\Test\Prompt1\spawn-game2-push`.
- Source đầu lượt: `60ba2da`; cuối lượt đã cập nhật fast-forward tới `cc3753d`.
- Runtime quan sát: v513–516 ở lượt đầu; v520 khi reset; v522 khi kiểm lại spectator/locale. Savi đang đẩy thay đổi trực tiếp nên đây là phiên kiểm nhiều phiên bản, không phải một build bất biến.
- Client người thật: Chrome đang đăng nhập lukasai, thao tác bằng CUA. Client thứ hai: Spawn @@fluxby, chỉ đọc state và quan sát vai trò người xem; không sửa state gameplay để ép PASS.
- Engine client đầu: `6490eae3`; client đọc state cuối: `103ca3c3`.
- Hội đồng: người điều khiển client/ghi evidence; QA Evidence kiểm độc lập harness và acceptance; UX Review kiểm độc lập luồng, localization và touch. Hai reviewer đọc source, không được tính là hai người chơi trên hai máy.
- Skills: Playtest Report, Test Evidence Review; đã đọc TypeSafe AI. Không có kết quả API TypeSafe trong lượt này, không coi việc nạp skill là đã chơi hoặc test thành công.

## Kết quả thao tác thực tế

| Mục | Kết quả | Bằng chứng / giới hạn |
|---|---|---|
| Vào phòng | PASS cho vào phòng đang tồn tại | Chrome creator và client fluxby cùng thấy phòng; chưa phải ca first-entry sạch của LOBBY-01. |
| Sân Tập / spectator | PASS chuyển vai trò | Chọn Sân Tập đưa fluxby và người còn lại ra khỏi đội; chỉ creator nằm trong roster. Chưa gửi riêng lệnh join trái luật để kiểm ack `spectator`. |
| START / chọn tướng | PASS phần đã thử | Timer 30s; lượt đầu không chọn chân dung, hết giờ tự chọn Kha Tàn. Lượt sau click chân dung Vân Dao → KHOÁ → vào đúng Vân Dao. Chưa kiểm hover giữa đồng đội, trùng tướng hay PICK-02. |
| GAME-01 | PASS một phần | Tướng/đội khớp roster, level1 và tài nguyên đầy; vàng gần 500 rồi tăng theo thời gian. Không đo đúng frame khởi tạo hay toàn bộ lính/trụ. |
| Shop EN | PASS mua item | Mua Phial of Dawn 150, slot thành 1/6, có item và trừ vàng. `02-shop-en.png`, [before-reload.json](evidence-2026-10-08/before-reload.json). |
| Reload / L10N | PASS giữ EN trong ca thử | Chrome tải lại mất khoảng 40s, quay lại với HUD và Shop EN. Không đo độ trễ chính xác bằng instrument. |
| GAME-02 | PASS một phần | Kha Tàn/đội/item trở lại; level1, XP0, K/D/cs0. Vàng tiếp tục tăng trong thời gian chờ. Chưa thử cấp cao, XP/K/D/cs khác 0, vị trí chiến đấu, death/cooldown hay reconnect PvP. [before-reload.json](evidence-2026-10-08/before-reload.json), [after-reload.json](evidence-2026-10-08/after-reload.json), [recovered.json](evidence-2026-10-08/recovered.json). |
| PRAC reset | PASS phần tài nguyên và đồng hồ | Round10→11, level1, XP0, items[], cd{}, HP728/728, mana280; đồng hồ reset. [practice-reset.json](evidence-2026-10-08/practice-reset.json), `04-reset.png`. Vì XP/cấp/CD ban đầu chưa khác mặc định nên chưa chứng minh mọi nhánh reset; chưa kiểm inventory công trình/minion. |
| PRAC End | PASS | End đưa về lobby, không hiện kết quả. |
| PRAC phá Tâm Mạch | NOT RUN | Chưa phá Tâm Mạch tự nhiên; không xác nhận bảng Hoàn thành/winner:null. |
| PRAC-02 thân spectator | FAIL đầu lượt; sửa một phần | Ban đầu fluxby hiện thân trắng ở fountain dù ngoài roster. Sau sửa v522 fluxby visible:false. Spectator parked đang preview vẫn visible:true và xuất hiện ở mép phải. Savi nhận lỗi và báo sửa tiếp; bản sửa tiếp chưa kiểm lại. |
| VI/EN trong trận | FAIL đầu lượt → PASS desktop sau sửa | Vân Dao đang trong trận, bấm EN đổi cs, hướng dẫn, tooltip và menu Training/Restart/End; nút mới hiện cạnh tỉ số. `07-fixed-ingame-en.png`. Mobile và toàn bộ chuỗi chưa nghiệm thu. |
| Trang Tướng | PASS mở trang / xem Vân Dao / CTA | 6/6 tướng và filter hiện; kỹ năng, lore Vân Dao đọc được. CTA Chơi đưa về phòng; vẫn phải chọn chân dung trong màn pick. `06-heroes-vi.png`. Chưa nghiệm thu cả 6 kit/clip/model. |
| Trở lại tai_hien | PASS phần xếp lại đội | Hai phe có người sau chuyển mode; người xem được đưa vào đội. `09-return-pvp-room.png`. Chưa kiểm đúng joinOrder toàn bộ 10 slot. |
| LOBBY-06 đội trống | PASS ca desktop | Chủ rời đội, client fluxby rời phòng: Blue0/Red1. START mờ, có “Each team needs at least 1 player”; click không vào pick. Đã trả creator vào đội Blue. `10-start-disabled.png`. |
| RES-01 / RES-02 | NOT RUN client | Chưa có trận thắng tự nhiên và chưa thao tác Về phòng sớm. Nhận xét source ở phần riêng bên dưới. |
| MOB-01 | BLOCKED trong lượt này | Thử viewport844×390 trên client tự động, nhưng pointer:coarse vẫn false và renderer chết. Không có screenshot mobile hợp lệ, không tính resize desktop là test touch. Cần thiết bị touch thật hoặc client emulation hỗ trợ coarse/hasTouch đã xác nhận. |
| NET hai máy | NOT RUN | Có hai endpoint trên cùng máy, chưa chứng minh hai máy/mạng độc lập. |
| Balance / Call / Titan / VO / map3lane | Không nghiệm thu trong lượt này | Balance FAIL đang ghi trong doc11; Titan đang được Savi cập nhật trong lúc test. Không gán lỗi “chưa có code” dựa trên bản cũ khi code đang thay đổi. |

## Defect và hành động

### QA-01 — P1: spectator hoặc thân preview lọt vào trận

**Repro:** creator chọn Sân Tập; người khác không có trong match.roster. Vào ingame, nhìn khu fountain và mép phải camera. Đầu lượt thấy fluxby thân trắng; sau patch đầu, spectator parked/preview vẫn xuất hiện.

**Evidence:** `01-practice-host-en.png`, `07-fixed-ingame-en.png`, [spectator-retest.json](evidence-2026-10-08/spectator-retest.json). v522: fluxby.visible=false; livelyforestfd0a9.visible=true tại khoảng (-152,25.7,152), ngoài roster chỉ có Vân Dao của creator.

**Expected:** PRAC-02: người xem không có thân trong trận. Bất kỳ hệ thống dress/preview/parked nào cũng phải giữ luật này trên peer đang chơi.

**Status:** patch đầu đã kiểm lại và chưa đủ; Savi xác nhận sửa preview sau tin thứ hai. Cần retest sau patch mới, gồm spectator mới vào, spectator đang preview, parked và reload cả hai peer; khi về lobby phải hiện lại đúng preview.

### QA-02 — P1: Sân Tập mất kết nối trao chủ phòng cho spectator

**Repro:** host đang Sân Tập, còn spectator; reload Chrome host. Trong thời gian host vắng, ingame tiếp tục, lobby.host chuyển thành fluxby; roster vẫn chỉ creator. Creator quay lại trong grace.

**Evidence:** [after-reload.json](evidence-2026-10-08/after-reload.json); source `places/main/sim.js` xử lý grace/chuyển host chung cho các mode.

**Expected theo doc14 ban đầu:** người tập rời thì hủy về lobby. Thiếu phân biệt mất mạng/reload và rời chủ động khiến code và luật không khớp.

**Khuyến nghị hội đồng:** reload/mất mạng giữ quyền chủ và ô người tập tối đa60s; spectator không nhận host trong khoảng này. Quay lại ≤60s khôi phục; quá60s hoặc rời chủ động hủy về lobby. Sửa decision, doc14, doc11, trọng tài và test đồng bộ. Đây là đề xuất kỹ thuật gửi Savi, không giả danh creator để duyệt.

**Status:** chưa sửa/kiểm lại tại baseline `cc3753d`; Savi ghi BLOCKED chờ chốt decision.

### QA-03 — P2: không có điều khiển ngôn ngữ ingame

**Repro đầu:** đang Kha Tàn trong Sân Tập, HUD EN không có VI/EN.

**Status:** Savi thêm chip, đã kiểm lại desktop với Vân Dao và EN hoạt động. Giữ retest mobile trong backlog; không đóng toàn bộ L10N-01 chỉ vì ca desktop này qua.

### QA-04 — P2: độ sáng Tâm Mạch / khả năng đọc ở fountain

**Quan sát:** lõi trắng sáng bão hòa, tướng nhỏ sát chân lõi; khó đọc tạo hình và pose ở vị trí xuất phát. Ảnh `07-fixed-ingame-en.png`. Đây là nhận xét visual, chưa đo luminance hoặc kết luận ảnh hưởng hitbox.

**Hướng sửa:** điều chỉnh emissive/bloom art, độ tương phản thân và vị trí hiển thị quanh chân lõi trong phạm vi art; giữ collider/tầm/camera đã chốt. Nghiệm thu ở cỡ HUD desktop/mobile, có 2 tướng và VFX chồng nhau.

## Các vấn đề source review, chưa phải lỗi tái hiện bằng UI

1. **RES-02:** `scripts/lib/lobby-ui.js:379` room nhánh results tạo banner/countdown nhưng footer không tạo START mờ; doc11 yêu cầu nút mờ. Kiểm Về phòng sớm sau kết thúc tự nhiên rồi sửa đúng spec.
2. **Phòng chỉ xem trong results:** rename ở `lobby-ui.js:357` dựa quyền host, không chặn theo phase; `places/main/sim.js:161` cũng cần kiểm guard. Ca cần thử: results → về phòng → host đổi tên. Chưa ghi FAIL client.
3. **Cửu Mạch khóa:** data `lobby.yml` có lockedMaps, UI chỉ hiển thị Mạch Giữa. Cần reconcile với card map khóa đã mô tả trong doc14; không bật map3lane khi chưa xong.
4. **Touch EN:** reviewer thấy nhãn ĐÁNH và nhãn touch config có chữ cứng; phải kiểm trong renderer touch thật, không coi text scan là bằng chứng màn hình EN.
5. **Kích thước touch:** topnav mobile CSS40px so với acceptance44px là dấu hiệu cần đo bounding box thực tế; chưa kết luận mọi nút mobile FAIL.
6. **Đấu Với Máy:** đã được creator yêu cầu/duyệt trong lịch sử chat; ghi chú cuối doc14 xác nhận B0.1 cũ. Đây là debt đồng bộ spec, không yêu cầu khóa lại tính năng.

## Độ tin cậy của 39/39

`tools/test/lobby-referee.mjs` ghi rõ fake place, fake players/clock, không engine/mạng; 39 là số assertion. GAME-01 chỉ kiểm phase/roster; GAME-02 snapshot và grace không chứng minh hero.js khôi phục trên thân. PRAC reset assertion tăng round không chứng minh item/HP/cooldown/công trình. PRAC roster1 không chứng minh spectator vô hình. RES inject Nexus fallen không chứng minh người chơi đánh thắng hoặc room UI. Thử host quyền/ack cần nhưng không thay keyboard/touch/disabled visual.

File harness còn hardcode `/workspace/world/places/main/sim.js`; chưa chạy lại nguyên file trên Windows. Báo cáo giữ kết quả 39/39 là kết quả Savi báo, không nhận là lượt chạy của Codex.

## Lỗi hạ tầng kiểm thử

- Session CPU đầu dừng code11 “CPU browser stopped”.
- Session gpu sau lỗi “CPU eye's renderer died” khi dùng viewport/touch emulation và capture. Dù join có flaggpu, verdict gọi CPU eye; chưa đủ để quy nguyên nhân cho code game.
- Log client có một `ModuleParserPending` giai đoạn netIngest, cần đối chiếu cold boot engine; chưa chứng minh crash gameplay do lỗi này.
- Log đường dẫn: `%LOCALAPPDATA%\Temp\spawn-client-sessions\logs\cltc-review-20261008.log`, `cltc-review-gpu-20261008.log`. Không đưa token vào evidence.

## Vòng nghiệm thu tiếp theo cho Savi

1. Đóng QA-01 bằng kiểm trên peer creator cả spectator preview/parked và khi trở lại lobby.
2. Chốt/reconcile QA-02, chạy reconnect≤60s, >60s và leave chủ động; chứng minh spectator không nhận host.
3. Chạy trọn trận tự nhiên → results → về phòng sớm → countdown → lobby. Kiểm bảng số liệu trước reset, controls chỉ xem và START mờ.
4. Touch844×390 với pointer:coarse=true, screenshot mỗi màn và đo target44px; đổi EN trong trận, kiểm nút di chuyển/đánh/né và platform rail.
5. Reconnect trong PvP khi hero có cấp/XP/KD/cs/item/CD khác0; tách kiểm net2máy.
6. Giữ balance gates đang FAIL; chạy simulator và lưu data/báo cáo trước-sau khi sửa thông số. Không tự đổi ngưỡng để PASS.

Không sign-off production cho đến khi các gate bắt buộc có bằng chứng runtime phù hợp. Các body của Codex đã rời phòng; creator được trả về lobby tai_hien, EN, đội Blue. Không sửa gameplay code và không push trong lượt báo cáo này.

## Ghi chú khi đưa báo cáo lên repo

Đây là bản ghi phiên playtest, không phải spec mới thay thế doc14/doc11. Repo đã có thay đổi tới `7430f22` khi chuẩn bị gửi báo cáo: doc14 ghi nhận Savi sửa lần hai để trọng tài ẩn spectator preview/parked. Bản sửa này chưa được Codex kiểm lại trên client; giữ trạng thái cần retest, không báo lại như lỗi chưa được sửa code. Theo yêu cầu lukasai, kiểm tra tiếp mỗi30phút và gom phản hồi thay vì gửi liên tục.

Các JSON được lưu cạnh báo cáo. Ảnh chụp gốc nằm tại `D:\Project\Test\Prompt1\league-of-spawn\artifacts\qa\2026-10-08`; danh mục và SHA256 ở [evidence README](evidence-2026-10-08/README.md). Spawn từ chối upload ảnh qua assets door với `carry_is_the_platforms`; không đưa binary hoặc ảnh mã hóa vào git để lách luật. Bản báo cáo này vẫn có state evidence dạng text để reviewer trong repo đối chiếu.