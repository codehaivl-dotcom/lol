# 68 — P0 Economy pacing (Mạch Giữa 1v1) — 2026-10-09

Trạng thái: profile mg1v1-0.1 ĐANG BẬT cho map mach_giua (thử nghiệm, chưa nghiệm thu). Rollback: economy.yml economyByMap.mach_giua: base.

## Nguồn vàng thật trong runtime (đã trace)
| nguồn | chỗ code | trước (base) | sau (mg1v1-0.1) |
|---|---|---|---|
| khởi đầu | lib/econ.js stampEcon | 500 | 300 |
| passive (khi sống) | lib/econ.js passiveGold ← hero/match.js, bot.js | 3 g/s | 1 g/s |
| last-hit lính | lane.js → earn('minion') | 171/đợt tối đa, 30 s | x0.7 = 120/đợt |
| hạ tướng | hero/match/life.js, bot.js → earn('kill') | 300 | 150 |
| phá trụ (mỗi tướng đội kia) | lane.js → earn('objective') | 150 | 150 |
| bán đồ | hero/match/economy.js → earn('refund') | 60% | 60% |
| assist / camp / boss | — | KHÔNG có trong runtime Mạch Giữa | — |
Player và Bot đi qua cùng lib/econ.js, cùng profile (không có nguồn riêng cho Bot).

## Telemetry
state.econ = { start, passive, minion, kill, objective, refund, spent }; totalEarned = start + mọi nguồn trừ refund; currentGold = state.gold.
Log 'econ' mỗi phút trận. Đi theo reconnect/stand-in (referee/match.js cache/seed/saved).

## Đo ENGINE (trận thật thu_tran, Kha Tấn AFK ở nhà vs Bot Nham Vũ)
| | thời điểm | số dư | passive | lính | trụ | cs | passive / kiếm được |
|---|---|---|---|---|---|---|---|
| base · AFK | 4:01 | 1220 | 720 | 0 | 0 | 0 | 100% |
| base · Bot | 4:01 | 1477 | 720 | 257 | 0 | 10 | 74% |
| base · AFK | 8:25 | 1990 | 1490 | 0 | 0 | 0 | 100% |
| mg1v1 · Bot | ~4:03 sau khi đổi* | 1120 | 243 | 427 | 150 | 19 | 30% |
→ "1.000 vàng phút 4" của creator = SỐ DƯ (1220 = 500 + 720), xác nhận trong engine.
*Bot bị reset ví khi lưu config giữa trận (hot-reload dev) nên lượt "sau" chỉ có bot, ~4 phút. Người chơi vẫn base vì profile chốt lúc vào trận (đúng thiết kế).

## Mô hình (PASS_MODEL) — tools/balance/economy.mjs
```
wave 171g / 30s · start 500 · catalog candidate-0.1.0 · map mach_giua 1v1 · MODEL

== A_now passive 3g/s · lính x1 · kill 300
farmer        p2     p4     p6     p8    p10  passive%@6  vs_good@6  completed1600  2nd(+1600)
afk          860   1220   1580   1940   2300     100%      49%       6:07       15:00
poor        1065   1630   2196   2761   3326      64%      68%       3:55        9:36
avg         1236   1972   2709   3445   4181      49%      84%       2:59        7:25
good        1407   2314   3222   4129   5036      40%     100%       2:25        5:55
perfect     1544   2588   3632   4676   5720      34%     113%       2:19        5:25
avg farmer, first completed with 0/1/2/3 kills: 2:59 / 2:22 / 1:25 / 0:36
targets: good MISS · avg MISS · poor ok · afk MISS · afkShare MISS · kill MISS (afk 49%, kill = 2.19 wave)

== B_1_5 passive 1.5g/s · lính x1 · kill 300
farmer        p2     p4     p6     p8    p10  passive%@6  vs_good@6  completed1600  2nd(+1600)
afk          680    860   1040   1220   1400     100%      39%      12:14       30:00
poor         885   1270   1656   2041   2426      47%      62%       5:55       14:03
avg         1056   1612   2169   2725   3281      32%      81%       3:55        9:55
good        1227   1954   2682   3409   4136      25%     100%       3:07        7:25
perfect     1364   2228   3092   3956   4820      21%     115%       2:44        6:25
avg farmer, first completed with 0/1/2/3 kills: 3:55 / 2:55 / 1:55 / 0:55
targets: good MISS · avg MISS · poor ok · afk MISS · afkShare ok · kill MISS (afk 39%, kill = 2.19 wave)

== C_1_0 passive 1g/s · lính x1 · kill 300
farmer        p2     p4     p6     p8    p10  passive%@6  vs_good@6  completed1600  2nd(+1600)
afk          620    740    860    980   1100     100%      34%      18:20       45:00
poor         825   1150   1476   1801   2126      37%      59%       6:55       16:48
avg          996   1492   1989   2485   2981      24%      79%       4:25       10:55
good        1167   1834   2502   3169   3836      18%     100%       3:25        8:25
perfect     1304   2108   2912   3716   4520      15%     116%       2:55        6:55
avg farmer, first completed with 0/1/2/3 kills: 4:25 / 3:25 / 2:04 / 0:55
targets: good MISS · avg MISS · poor ok · afk ok · afkShare ok · kill MISS (afk 34%, kill = 2.19 wave)

== D_1_0k passive 1g/s · lính x1.2 · kill 250
farmer        p2     p4     p6     p8    p10  passive%@6  vs_good@6  completed1600  2nd(+1600)
afk          620    740    860    980   1100     100%      30%      18:20       45:00
poor         866   1232   1599   1965   2331      33%      56%       6:02       14:55
avg         1071   1643   2214   2786   3357      21%      78%       3:55        9:25
good        1277   2053   2830   3607   4383      15%     100%       2:55        6:55
perfect     1441   2382   3322   4263   5204      13%     117%       2:25        5:55
avg farmer, first completed with 0/1/2/3 kills: 3:55 / 2:55 / 2:25 / 1:25
targets: good MISS · avg MISS · poor ok · afk ok · afkShare ok · kill MISS (afk 30%, kill = 1.52 wave)

== E_lean passive 1g/s · lính x0.7 · kill 200
farmer        p2     p4     p6     p8    p10  passive%@6  vs_good@6  completed1600  2nd(+1600)
afk          620    740    860    980   1100     100%      43%      18:20       45:00
poor         764   1027   1291   1555   1818      46%      64%       8:25       20:28
avg          883   1267   1650   2033   2417      31%      82%       5:55       14:17
good        1003   1506   2009   2512   3015      24%     100%       4:25       10:55
perfect     1099   1698   2296   2895   3494      20%     114%       3:55        9:06
avg farmer, first completed with 0/1/2/3 kills: 5:55 / 4:55 / 3:55 / 2:51
targets: good MISS · avg MISS · poor ok · afk ok · afkShare MISS · kill MISS (afk 43%, kill = 2.09 wave)

== F_lean2 passive 1.2g/s · lính x0.6 · kill 200
farmer        p2     p4     p6     p8    p10  passive%@6  vs_good@6  completed1600  2nd(+1600)
afk          644    788    932   1076   1220     100%      49%      15:17       37:30
poor         767   1034   1301   1568   1836      54%      68%       8:25       20:24
avg          870   1239   1609   1979   2349      39%      84%       5:55       14:47
good         972   1445   1917   2389   2862      30%     100%       4:55       11:25
perfect     1054   1609   2163   2718   3272      26%     113%       3:55        9:55
avg farmer, first completed with 0/1/2/3 kills: 5:55 / 4:55 / 3:55 / 2:55
targets: good MISS · avg MISS · poor ok · afk ok · afkShare MISS · kill MISS (afk 49%, kill = 2.44 wave)

== G_start passive 1g/s · lính x0.7 · kill 200
farmer        p2     p4     p6     p8    p10  passive%@6  vs_good@6  completed1600  2nd(+1600)
afk          470    590    710    830    950     100%      38%      20:50       47:30
poor         614    877   1141   1405   1668      46%      61%       9:28       21:46
avg          733   1117   1500   1883   2267      31%      81%       6:35       14:55
good         853   1356   1859   2362   2865      24%     100%       4:55       11:25
perfect      949   1548   2146   2745   3344      20%     115%       4:25        9:36
avg farmer, first completed with 0/1/2/3 kills: 6:35 / 5:26 / 4:25 / 3:25
targets: good MISS · avg ok · poor ok · afk ok · afkShare ok · kill MISS (afk 38%, kill = 2.09 wave)
```
Cửa sổ giả thuyết: món hoàn chỉnh (1600) good 5:30–7:00, avg 6:30–8:30, poor ≤ 11:00, AFK ≥ 14:00, AFK ≤ 40% vàng của good ở phút 6.
mg1v1-0.1 (300 / 1 / x0.7 / 150): good 5:25, avg 6:55, poor 9:55, AFK 21:40, AFK = 36% good.

## GAP mở
1. Bot không mua đồ dù có 1120–1477 vàng (cả 2 profile) — logic mua của bot, cần trace.
2. Player farm/good/poor chưa đo engine (mới AFK). Cần trận người farm thật.
3. Stat budget + giá 24 món chưa chỉnh cùng — vòng tiếp theo, chạy duel.mjs với mốc mua mới.
4. Snowball 1–3 mạng: chỉ mô hình. XP chưa đụng.
5. 5v5 / support: chưa thiết kế, không áp mg1v1.
6. Arrival main 523 KB > 500 KB (lib/econ.js + phần trước) — chưa xử lý, không đổi build lúc đo.

## 2026-10-09 — vòng 2: Bot mua đồ + đồng bộ profile (chưa khóa mg1v1-0.1)

**Đính chính:** mẫu "after" ở trận 5087 bị NHIỄM (player `base`, bot `mach_giua-1v1`, cùng một trận đang chạy). Không dùng làm so sánh before/after.

Nguyên nhân Bot giữ vàng không mua (trace build → vàng → về nhà → quote → transaction):
1. `shop()` chỉ chạy khi bot *tình cờ* đứng ở nhà; không có quyết định "về nhà để mua" → bot farm lane với ví đầy. **Sửa:** `wantShopTrip` — đủ vàng cho món kế tiếp ≥ `shopTripMin` (400) hoặc ví ≥ `shopBank` (900) và an toàn (không trong tầm trụ, không có tướng địch < 10 m / có thể giết) → lui về nhà (recall nếu yên, đi bộ nếu không). Vẫn chỉ mua ở nhà, cùng luật người chơi.
2. Build list chỉ chứa món hoàn chỉnh (vd Mắt Sắc 1700g) → bot để dành cả 1700g. **Sửa:** `nextBuy` đi xuống cây ghép, mua bậc thấp nhất còn thiếu (như người chơi), cùng `quote()` của shop.
3. Log quyết định: `ctx.log('bot shop', {what: bought|save|trip|build-done, item, cat, fee, reason, gold, t})` mỗi lần lý do đổi; đếm `state.ai.buys`.

Profile lệch player/bot: người chơi stamp profile từ `place.state.lobby` trên máy client — có thể là bản cũ → `base`. **Sửa:** `resetHero(…, map)` truyền map của roster/vé; `stampEcon(ctx, s, map)`.

Trận engine 17087 (thu_tran, mach_giua, profile `mach_giua-1v1` cho CẢ HAI — PASS đồng bộ):
| t | Player AFK (Kha Tấn) | Bot Nham Vũ |
|---|---|---|
| 0:13 | 312g | mua `soi_nhip` (300g) tại spawn |
| 4:20 | 559g = 300+259 passive | 140g, đã ghép `quickstring` (tổng chi 650), 231 minion, 11 CS, 2 lần mua |
| 8:27 | 806g = 300+506 passive | 544g, 388 minion, 20 CS, đang để dành `nanh_mach` |

- Bot mua đồ: **PASS (engine, 1 trận)** — mua + ghép thật, tại nhà.
- Bot vs Bot: **NOT TESTED**. Player farm (kém/TB/tốt), thua 1–2 mạng: **NOT TESTED**.
- Item 8 legacy giá/chỉ số: **OPEN (P0)**, chưa chỉnh. Catalog đang chạy cho trận này: `candidate-0.1.0` (ACTIVE) — cần creator xác nhận vì creator yêu cầu không dùng candidate chưa duyệt làm dữ liệu chính thức.
- Arrival main 523/500 KB: GAP performance riêng, OPEN.
