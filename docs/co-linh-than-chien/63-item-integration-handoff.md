# 63 — Đóng dữ liệu starter và hợp đồng tích hợp item

**Cập nhật bàn giao 09/10/2026:** chủ dự án xác nhận luật Sân Tập và reconnect đã fix; hai mục này **ĐÃ ĐÓNG THEO XÁC NHẬN OWNER**, không mở lại hoặc xin duyệt lại. Các report/source fixture 9351 là evidence lịch sử, không xác định trạng thái world sau đó. Ưu tiên [66 · Bàn giao cho Savi](66-ban-giao-cho-savi.md).

**Nguồn chốt lại mới nhất:9351e23c6c6b4cc55a160dbf7aec268973b6394d.** Fetch kiểm cuối có10 file thay từ373b; item/data/recipe/hero stats giữ nguyên. `combat.js` chỉ đổi cleanup dấuấn bằng ctx.destroy, không đổi công thức; lane chỉ bỏ comment, còn UI sửa dấu tiếng Việt. Tool/contract/data đã chạy lại trên9351. Các đoạn đối chiếu373b phía dưới giữ lịch sử review, không phải nguồn mới nhất nữa.

09/10/2026. Owner thực hiện và đóng việc: **Codex council**. Đây là đặc tả implementation có dữ liệu chạy được; catalog V0.1 vẫn là proposal, chưa kích hoạt gameplay. Không giao phần chưa làm sang Savi để gọi là đã đóng.

Receipt lịch sử lượt đầu, trước khi cập nhật9351: `origin/main` tại **`373bff9e7bca2093e89dfae6cc73fd6e0dd6749c`**. Công cụ đọc object Git hoặc fixture được kiểm hash tại đúng commit; không dùng checkout local cũ làm runtime. So `dcdbfb3d3cfe83ae65ed91a85dd439dceeb38f90` → commit mới trên `heroes.yml`, `economy.yml`, `lib/combat.js`, `hero/match/{economy,roster,combat}.js`, `bot.js`, `referee/{match,single}.js`: không có diff. Vì vậy các số item và khoảng trống consumer dưới đây vẫn đúng ở nguồn mới. ZIP và review ZIP cũ chỉ là lịch sử; không chứng minh tình trạng live hôm nay.

Đọc [58](58-nghien-cuu-va-thiet-ke-he-item.md) và [59](59-he-trang-bi-de-xuat.md). Số proposal duy nhất vẫn ở [candidate-v01.json](../../tools/balance/items/candidate-v01.json), version **0.1.0**, SHA256 **`e28b03f48eca1741999eaad7f885ea54e46d8315fe2b356ce56c005eb1853b40`**; source thiết kế gốc `ad7948ab9710ac1adb2b561049821da8e0cb1da8` khác source runtime mới được kiểm. Không thay số candidate hoặc file gameplay trong lượt này.

## 1. Dữ liệu starter đã đóng bằng công cụ

Chạy offline tại repo, không truy cập live:

```powershell
bun tools/balance/items/startup-screen.mjs
```

[Công cụ](../../tools/balance/items/startup-screen.mjs), [report đọc](../../reports/production-2026-10-09/item-starter-closure.md), [toàn bộ dữ liệu/assertion](../../reports/production-2026-10-09/item-starter-closure.json), [CSV starter](../../reports/production-2026-10-09/item-starter-closure.csv), [CSV toàn bộ đường mua tiếp](../../reports/production-2026-10-09/item-starter-closure.recipes.csv), [hợp đồng máy đọc](../../reports/production-2026-10-09/item-starter-closure.contract.json).

| Miền kiểm | Túi hợp lệ ≤500 vàng, gồm túi rỗng | Dòng sáu tướng L1 |
|---|---:|---:|
| Đúng tám basic candidate | 23 | 138 |
| Toàn catalog candidate, kể cả relic có thể mua | 34 | 204 |
| Đúng tám món đang ship, kể cả relic | 6 | 36 |

**378 dòng, 1.368 báo giá mua tiếp, 2.822 PASS_MODEL assertions.** Hai cách liệt kê độc lập (multiset và vector số bản sao) có cùng tập túi, không lặp thứ tự. Mỗi túi được mua qua pure transaction với ví 500 vàng; kiểm ví còn lại, số ô và số bản sao. Mỗi túi candidate được quote tất cả 24 món đích, có full credit, số vàng còn thiếu, nguyên liệu tiêu thụ, ô sau ghép và lý do từ chối. Từ chối giữ nguyên state. Thêm fixture full-bag/fee-minus-one, recipe lồng từng phần và golden EHP/AP. Hai miền candidate có chủ ý trùng các túi basic để mỗi miền có coverage riêng; không cộng thành số lựa chọn duy nhất.

CSV ghi HP, giáp, MR, AD, AP, AS, HP/s, m/s, physical/magic EHP, tăng theo baseline, vàng đã tiêu/còn lại, damage type của AA và hai cột DPS. EHP = HP × (1 + kháng/100), không xuyên kháng, khiên/hồi/CC/di chuyển. Direct AA raw DPS = `(AD + lmb.ap × AP) × AS × hero-on-hero tuning`. Cột average riêng thêm passive đòn thứ n của tướng và thirdHit của Quickstring baseline; runtime kiểm `includes('quickstring')`, không nhân thirdHit theo số bản sao. Đây là nhịp lý tưởng liên tục, không phải hit timeline, TTK hay win rate. Passive sau chiêu, bleed, burn, chiêu/CC, projectile travel, relic và hồi theo thời gian nằm ngoài các cột damage này.

**Khuyến nghị cụ thể:** giữ cấu trúc tám basic nhỏ và chuyển bundle HP+giáp sang đường ghép sau cho candidate tích hợp V0.1. So tất cả lựa chọn cùng ngân sách chứng minh bước tăng chống chịu ngay nhỏ hơn legacy Giáp Thiết; chưa đủ duyệt chính xác các số cho release. Hai Mảnh Mạch 500 vàng/+180 HP tối đa cả physical lẫn magic EHP tĩnh cho sáu tướng: +21,74–35,86%, trong khi Giáp Thiết baseline 450 vàng/+220 HP/+40 giáp cho physical EHP +63,26–89,48%. Túi hai HP không cho damage, AP, AS, tốc chạy hay hồi và tiêu hết ví.

| Lựa chọn candidate | Đánh đổi thật trong screen | Đường đi sau |
|---|---|---|
| Hai Mảnh Mạch, 500g | EHP hai loại cao nhất; không hồi/offense/speed | Bình Dưỡng Mạch còn 250g; tín dụng HP 500g được giữ |
| Mảnh Mạch + Hạt Sinh, 450g | +90 HP/+1 HP/s; còn 50g; EHP thấp hơn hai HP | Bình Dưỡng còn 300g, cần thêm 250g so ví |
| Hai Đồng Vân, 480g | +24 giáp; không HP/MR; còn 20g | Giáp Thiết còn 70g, cần thêm 50g |
| Hai Ngọc Âm, 480g | +24 MR; không HP/giáp; còn 20g | Ấn Tĩnh còn 120g, cần thêm 100g |
| Nanh/Kính/Sợi/Bước + Hạt, 500g | Một trục AD/AP/AS/mobility và +1 HP/s; không maxHP | Đường core khác nhau, Bước Vân đứng riêng; xem quote từng món |

Kính Lưu + Hạt là lựa chọn AP có đường nâng cấp cho Mị Đăng/Hỏa Tủy/Vân Dao, không thể xếp thấp chỉ vì AA tăng ít; AP của chiêu/heal/khiên chưa nằm trong DPS. Nanh + Hạt phục vụ AD của Mộc Lẫm/Kha Tàn; Nham Vũ có cả Nanh + Hạt và Sợi + Hạt, phải đối chiếu chiêu và khả năng giữ nhịp. Bước + Hạt có thể thay đổi vào/ra tầm nhưng screen tĩnh không đo được. Relic có trong miền đầy đủ; HP heal/khiên active không được cộng vào EHP để tạo bảng xếp hạng giả. Các lựa chọn này là recommendation có điều kiện theo vai trò, chưa là build tối ưu toàn kit.

## 2. Chính sách catalog và migration đã viết cụ thể

Hợp đồng machine-readable ghi owner/action/status. Runtime nguồn duy nhất tiếp tục là `scripts/lib/data/economy.yml`; shape đề xuất `itemCatalogs[version] = {rules, items}`. Candidate JSON là đầu vào thiết kế, không là catalog runtime thứ hai. Import vào nguồn runtime phải bảo toàn số/recipe/trigger và ghi hash đầu vào; mọi consumer chọn cùng version. Không mở `items.yml` song song.

| Trường | Giá trị/policy proposal |
|---|---|
| Legacy identity | `legacy@373bff9e7bca2093e89dfae6cc73fd6e0dd6749c` |
| Candidate identity | `candidate-0.1.0@sha256:e28b03f48eca1741999eaad7f885ea54e46d8315fe2b356ce56c005eb1853b40` |
| Kích hoạt | Disabled; chỉ bật sau quyết định catalog và runtime acceptance |
| Lúc chọn version | Tạo trận mới, ghi `match.itemCatalogVersion`; mọi inventory/cache/saved row/stand-in giữ trường đó |
| Trận legacy đang chạy | Thiếu version được stamp legacy một lần; giữ nguyên số, giá, túi, vàng; không reinterpret ID giữa trận |
| Trận mới sau activation | Reset inventory/vàng/counter/cooldown theo khởi tạo trận, rồi stamp candidate; không carry túi qua trận |
| Reconnect/stand-in | Giữ version, inventory, HP/vàng, group cooldown readyAt, active expiry, passive history trong cùng clock domain; không cấp CD mới |
| Không tìm được catalog version | Từ chối giao dịch có thông báo mismatch, không fallback current |
| Rollback | Tắt candidate cho trận mới; trận candidate đang chạy dùng immutable version tới kết thúc |
| Inventory bền qua trận | Chưa chứng minh ở pin. Nếu tìm thấy thì thêm migration riêng trước activation; không bịa alias |

Giữ tám ID migration trong JSON: quickstring, keeneye, iron_plate, oathguard_plate, thornseed_quiver, heartforge, phial_of_dawn, bastion_stone. Giữ ID không có nghĩa giữ số hoặc áp số mới cho túi legacy. Thay số/recipe/rule/semantics serialized phải tăng revision và hash. Bundle legacy chỉ được gỡ sau trận cuối dùng nó. Owner: **Codex council / runtime integration**; action mở: triển khai resolver và propagation trên cả referee match/single, player, bot và takeover.

## 3. Hợp đồng consumer và giao dịch

`heroStats` chung cộng HP/armor/MR/AD/AP/HPregen/moveSpeed; AS nhân `(1+AS item)` theo từng món. Tuning HP áp cho base/growth trước HP item, rồi round maxHP; stats đồ hoàn chỉnh thay stats nguyên liệu đã tiêu, không cộng cả hai. `baseAd` giữ AD trước đồ để `bonusAd` đúng. Player và bot phải cùng kết quả. Ở source mới `heroStats` chưa đọc AP/MR/speed từ item; roster có s.ap/s.mr/s.ms nhưng dữ liệu item chưa đi tới đó.

Damage raw dùng tổng AD/AP, tuning hero-on-hero một lần, rồi resistance đúng type một lần. Magic dùng MR, physical dùng armor, true bỏ resistance. Flat item speed và flat Echo bonus cộng vào base/growth trước buff phần trăm hiện hành và strongest slow; không biến bonus item thành dash. Hồi/khiên từ kit: base formula → Bell 1,08 → antiheal chỉ heal → clamp heal theo maxHP. Bell không nhân HPregen hay item heal/shield.

HP proposal: tăng maxHP do mua/ghép giữ currentHP, giảm maxHP clamp; dead vẫn dead. `recompute` source mới đang cộng chênh maxHP khi tăng nên đây là thay đổi phải thực hiện có chủ đích. Không suy HP item từ quyết định lên cấp của creator.

Mua/ghép: kiểm actor/vị trí shop/version trước; chọn direct component có trong túi trước, thiếu mới recurse con; mỗi slot tín dụng đúng một lần bằng full catalog cost; kiểm bản sao/relic/ô **sau tiêu thụ**; phí = tổng giá target − credit. Publish một state và receipt transactionId duy nhất; retry request không trừ lại. Thất bại không đổi vàng/đồ/HP/cooldown. Bán theo override hoặc `round(cost × 0,6)`. Bot gọi cùng đường mua, không tự append đồ; shop/tooltip/gợi ý build/recipe/bán/icon dùng cùng version, không giữ bảng số riêng.

Receipt tối thiểu: `transactionId, matchId, itemCatalogVersion, consumedSlotIds, grantedItemId, chargedGold, refundedGold, newInventory, newGold`. Inventory slot identity cần ổn định cho request đang chờ; pure tool hiện dùng array và không chứng minh runtime retry/authority.

## 4. Registry nội tại và active

Event adapter chỉ nhận sự kiện cast/hit/damage/heal/shield/death thực đã chấp nhận. Metadata tối thiểu trong contract có eventId/matchId/version/source/target/castId/origin/type/DOT/shieldOrigin. Một eventId xử lý một lần; cast first-hit dùng castId; miss/immune/reject không tăng bộ đếm hit. Damage vào khiên vẫn ghi combat một lần, không cộng hai lần absorption và HP loss. Item damage/heal/shield không kích item khác.

`ctx.now()` là milliseconds, catalog giây đổi ×1.000 đúng một lần; replay dùng giây. Trường clock phải theo session thực. Group passive dedupe theo group; cooldown group bền trong cùng trận qua bán/ghép/chết/reconnect. Counter reset đúng từng trigger trong catalog. Đề xuất policy removal đã đóng: bỏ món dừng trigger tương lai, regen/speed liên tục và bỏ armed counter; giữ readyAt. Damage/khiên/slow đã áp và tick relic đã commit giữ expiry ban đầu, trừ death hủy theo catalog. Mua lại bắt đầu counter mới và giữ CD cũ.

| Món | Consumer phải có | Boundary trọng yếu |
|---|---|---|
| Giáp Minh Ước | Shield kit end/break, lifetime ≥0,5s; khiên 4% maxHP/2s, CD12s | Không item shield, không recursion; lifetime thật |
| Mắt Sắc | Mỗi hit thứ tư, +12 physical | Hero/minion/neutral; exclude structure; gap >4s/death reset |
| Ống Tên Gai Ký | Ba hit cùng hero, slow15%/1s, CD8s | Đổi target/death/gap reset; strongest-only |
| Tâm Lò | Sau 8s không gây/nhận damage hero, +2HP/s | Shield damage tính combat; antiheal; clamp actualHP |
| Lò Than Ký | First damage hit/cast lên hero, +20+0,1AP magic, CD8s | Không DOT/item, đa hit không nhân proc |
| Đăng Hồi Âm | Ability damage hero, +0,3m/s/2s, CD8s | Không DOT/item; flat m/s, không dash |
| Chuông Mây | Kit heal/shield self/ally ×1,08 | Heal trước antiheal; shield không antiheal; không HPregen/item |
| Qua Khắc Mạch | Sau cast, hit hero đầu trong 3s +18physical | CD6s bắt đầu proc; cast không stack; minion không consume valid proc |
| Phial/Bastion | Relic_shared CD60s; Phial4 tick37,5HP tại1/2/3/4s, Bastion180shield/3s | Dead reject/cancel; clamp/antiheal; bán/đổi/reconnect không reset |

Các số trong bảng là tham chiếu candidate, không catalog số thứ hai. Pure replay đã có trigger/effect fixture; hook hit thật, authority damage, shield consumer, tick HP và lưu state chưa được triển khai bởi tài liệu này.

## 5. Acceptance nhỏ, người thực hiện và action

Toàn bộ case có status **NOT_RUN_RUNTIME** trong contract; code source/model không tự nâng thành PASS_CLIENT.

| ID | Owner chịu đóng | Action/evidence cụ thể |
|---|---|---|
| CAT-01 | Codex council / integration+QA | Trận legacy giữ iron450/40armor/220HP qua reconnect; trận mới candidate iron550/24armor; thiếu version không fallback |
| SHOP-01 | Codex council / integration+QA | Túi6 ô có2 Đồng Vân: ghép Giáp Thiết phí70, còn5 ô và4 món khác;69 vàng reject nguyên state |
| SHOP-02 | Codex council / integration+QA | Iron+Đồng+Mảnh+Ngọc ghép Oath: credit1040, trả560, Đồng dư giữ;559 reject |
| SHOP-03 | Codex council / integration+QA | Retry receipt xử lý1 lần; sai version/vị trí/ID/copy/relic reject; giá bán đúng |
| HP-01 | Codex council / integration+QA | Hero bị thương mua90HP giữ currentHP; bán clamp khi cần; loop/ghép không heal/revive |
| STAT-01 | Codex council / integration+QA | Player/bot AP18/MR12/speed0,25 đúng;2×10%AS=1,21; ghép không mất AS; magic mitigated theo MR |
| PROC-01 | Codex council / integration+QA | Cả8 passive có trace positive/negative/CD/reset từ hit thật; nguồn item/DOT/structure excluded đúng |
| RELIC-01 | Codex council / integration+QA | Tick/khiên/death đúng; bán/mua lại/stand-in/reconnect giữ CD chung |
| VIEW-01 | Codex council / integration+QA+art | Shop/bot/VI–EN/recipe/sell/icon/sim cùng hash; icon thật và đọc được32/48px |
| TRACE-01 | Codex council / Jev QA+balance | Sáu hero full-kit traces +3v3 support, income/timing thực; so model với trace trước duyệt số |

Mỗi trace phải có match/round/version, hero/level/loadout, receipt và state trước/sau, clock, expected arithmetic, actual result. Chơi/test người dùng phải theo Jev trong AGENTS; không dựng timeline hit rồi ghi như engine đã chạy.

**Đã đóng:** exhaustive starter, hai trục EHP và damage/utility tradeoff, toàn bộ next-recipe feasibility, revision/hash source mới, migration policy, consumer contract và acceptance owner/action. **Còn mở thật:** activation số; code runtime/UI/bot/version/reconnect/passive/relic/HP; asset icon và parity live; Jev acceptance/full-kit/3v3 balance. Các việc này Codex council tiếp tục chịu trách nhiệm; chưa có bằng chứng thì giữ NOT_RUN_RUNTIME, không gọi toàn game production-ready.
