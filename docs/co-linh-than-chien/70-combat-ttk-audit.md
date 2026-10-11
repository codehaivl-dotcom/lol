# 70 · GAP P0 — Combat TTK quá dài (AUDIT, chưa sửa chỉ số tướng)

Mở 2026-10-09 theo @lukasai: "audit combat nền như một vấn đề độc lập; không để việc chỉnh item che lấp lỗi thiết kế tướng".
Công cụ: `bun tools/balance/ttk-audit.mjs --n 8 --json tools/balance/out/ttk-audit-2026-10-09.json` (catalog candidate-0.1.0 sau phương án C).
**Đây là mô hình (PASS_MODEL). Chưa có số đo engine.**

## Con số 13–30 s ở doc 69 là gì
Là **full kit + di chuyển vào bia đứng yên chỉ hồi máu** (`fightReady bIdle`), trung bình 5 kẻ tấn công. Không phải AA-only, không phải giao tranh thật.

## Bốn cách đo (trung bình 30 cặp)
| cấp | đồ | AA-only (s) | 1 vòng combo (% HP mục tiêu) | full kit vs bia (s) | giao tranh 2 bên (s) |
|---|---|---|---|---|---|
| 1 | không | 24.2 | 19% | 20.6 | 19.0 |
| 1 | basic | 23.3 | 20% | 19.3 | 17.8 |
| 1 | completed | 26.8 | 21% | 19.6 | 18.7 |
| 6 | không | 32.0 | 27% | 22.8 | 22.3 |
| 6 | completed | 33.4 | 29% | 20.9 | 21.6 |
| 11 | không | 36.5 | 27% | 21.8 | 22.6 |
| 11 | completed | 37.2 | 27% | 21.7 | 22.5 |

Bảng theo cặp (L1, L6; AA s / combo %HP / kit s / fight s (tỉ lệ thắng)) trong JSON và console của tool. Ví dụ L1: Mi Dang (sát thủ) → Nham Vũ (xạ thủ) combo 21% HP, kit 12.8 s; Mi Dang → Hỏa Tùy 16%, 15.5 s; Kha Tấn → Nham Vũ 38%, 8.5 s; Vân Dao → Mộc Lẫm 8%, 33.8 s.

## Nguyên nhân tìm được (theo số)
1. **Một vòng combo chỉ gây 19–29% HP.** Cần 4–5 vòng kỹ năng (cooldown 7–18 s) → kỹ năng không "có trọng lượng". Đây là nguyên nhân chính, mạnh hơn trang bị.
2. **EHP tăng nhanh hơn sát thương theo cấp.** L1→L11: HP ×2.37–2.57, giáp ~×2.2 (EHP ×~3), AA DPS chỉ ×1.86–2.26, sát thương kỹ năng theo rank không theo kịp → TTK *dài ra* khi lên cấp (AA 24 → 36 s). Chuẩn MOBA ngược lại.
3. **Sát thủ không có vai trò sát thủ:** Mi Dang combo L1 13–21% HP, thua phần lớn cặp. Không có lớp nào thực sự "bắt lẻ được máu giấy".
4. **Trang bị gần như không đổi TTK** (±1–2 s): catalog nặng HP/phòng thủ, ít sát thương; completed bù sát thương bằng HP của đối phương.
5. Giao tranh 2 bên ≈ kit-vs-bia → né/kite/hồi máu không phải nguyên nhân chính ở mô hình. Hồi máu nền 1.1–1.6 HP/s là nhỏ.
6. Công thức giảm sát thương `100/(100+res)` đúng (combat.js). **Chưa kiểm engine:** hit không đăng ký, sát thương thực tế thấp hơn thiết kế, hồi máu ngoài dự kiến → cần trận đo ở bước sau.

## Khoảng TTK đề xuất theo loại giao tranh (để duyệt, chưa áp)
| cặp | full combo + AA, cấp 6, đồ ngang | ghi chú |
|---|---|---|
| sát thủ → pháp sư/xạ thủ | 3–5 s | trúng đủ combo gần như hạ được |
| đấu sĩ ↔ đấu sĩ | 7–10 s | |
| xạ thủ/pháp sư ↔ nhau | 5–8 s | phụ thuộc né skillshot |
| bất kỳ → tank | 10–15 s | |
| tank ↔ tank | 15–20 s | không coi là lỗi |
| 1 vòng combo đầy đủ | 35–55% HP máu giấy, 20–30% tank | |

## Ba phương án (chưa sửa — chờ duyệt)
- **P1 · Kỹ năng nặng hơn, HP giữ nguyên:** base damage Q/RMB/E/R ×1.5–1.8 tùy lớp (sát thủ/pháp sư cao nhất, tank thấp nhất). + kỹ năng có trọng lượng, né được thì lợi lớn. − đánh thường vẫn chậm; tăng sức mạnh của poke.
- **P2 · Giảm tăng trưởng HP/giáp theo cấp:** growth HP ~×0.6, giáp ~×0.6, giữ chỉ số cấp 1. + sửa đúng lỗi "càng lên cấp càng lâu chết". − không đổi cảm giác đầu trận.
- **P3 (đề xuất) · P2 + P1 theo lớp vai trò:** giảm growth HP/giáp, tăng damage kỹ năng theo lớp (sát thủ ×1.8, pháp sư ×1.6, đấu sĩ ×1.4, xạ thủ AA +, tank/support ×1.2). Từng tướng tune bằng `tuning` hiện có. − nhiều số đổi cùng lúc, cần đo engine kỹ.
Không tăng damage đồng loạt kiểu máy móc; mỗi lớp có số đích riêng ở bảng trên.

## Còn mở
- Đo engine: trận 1v1 có ghi sát thương mỗi hit để so với mô hình (phát hiện hit hụt/sai).
- Benchmark lại sau khi chọn phương án; item C chạy lại cùng tool.

## 2026-10-09 — Ghi chú toán học (creator)

HP ×2,5 với damage ×2 thì riêng HP/damage chỉ cho TTK ×1,25. Phần còn lại của mức tăng TTK đánh thường (24→37s, ×1,5) đến từ giáp/MR tăng theo cấp (EHP = HP × (1 + giáp/100)), hồi máu và tốc đánh. Đây là giả thuyết; trace engine sẽ xác nhận.

## Engine damage trace (B) — đã gắn

`scripts/lib/trace.js`, bật bằng `world.state.dmgTrace.on = true` (chỉ dev; tắt thì không chạy gì). Mỗi body ghi hàng riêng `world.state.dmgTrace.by[<id>]`:
`[t, kind, slot, srcHero, target, srcL, tgtL, type, raw, res, pen, dealt, hpBefore, maxHp, shield]`
- `cast`: kỹ năng/đánh thường được tung (Player: hero/match/combat.js; Bot: bot.js castAt/basicAttack).
- `miss`: đánh thường không có mục tiêu.
- `hit`: hurt() đã quyết định (raw trước giảm trừ, res giáp/MR, dealt sau giảm trừ, slot gồm q/rmb/e/r/lmb/passive/item:*).
- `dot`: sát thương theo thời gian, gộp mỗi 1s.
Thiếu: khiên hút bao nhiêu (owner trừ khiên sau hurt), heal. Sẽ bổ sung khi đọc trace đầu tiên.

Kế hoạch: Bot vs Bot 1v1 cho các cặp sát thủ→pháp sư, đấu sĩ→sát thủ, pháp sư→tank, tank→tank, support→máu giấy; đọc trace ra bảng damage/hit, damage/combo, TTK thật. P1/P2/P3a/P3b chỉ chạy sau khi có bảng P1.

## Trace trận thật #1 (2026-10-09, Đấu Với Máy, Kha Tàn vs Bot Kha Tàn, cấp 1–2, ~3 phút)

Quyết định creator: giữ nguyên HP/giáp/damage/tốc độ combat, KHÔNG áp P3. Creator chơi thử thấy combat ổn.

| Kiểm tra | Kết quả |
|---|---|
| Damage sau giáp = raw×100/(100+giáp−xuyên), 51 hit lên tướng | PASS (0 lệch >1.5) |
| Ví dụ: đánh thường 74 raw, giáp 34 → 55; Q 129 → 97; giáp 38.4 (cấp 2) → 53 | PASS |
| HP trừ khớp chuỗi hit | PASS từng đoạn; trận gương cùng tướng nên trace cũ không tách được 2 bên → đã thêm `hero@team` vào trace |
| Player: Q 2 cast / 2 trúng tướng, E 2/1, chuột phải 3/2, đánh thường 6/6 | không thấy hit lỗi |
| Bot: Q 5 cast, 1 trúng tướng (4 vào lính); E 5, 1 tướng | Bot dùng skill farm lính nhiều — hành vi AI, không phải lỗi hit |
| Shield / heal | 0 shield trong trận; heal chưa ghi vào trace (GAP còn mở) |
| Miss skillshot | chỉ suy ra từ cast − hit; chưa có lý do hụt (né / collision) |
| Lính gây phần lớn damage lên tướng trong các pha giao tranh | quan sát, đúng thiết kế lính phản ứng |

Kết luận: không thấy bug damage/targeting. GAP TTK P0 → **MONITOR**. Còn mở: heal trong trace, lý do miss, harness tự chạy 6 tướng.

## 2026-10-09 — Đối chiếu HP thực tế (trace trận Đấu Với Máy của creator, Kha Tàn vs Kha Tàn)
- Phương pháp: chỉ dùng hàng có nhãn `hero@team` (t ≥ 239.8 s, 233 hit/dot). Cột hp trong trace là **hpBefore**; kiểm `hpBefore(hit kế) = hpBefore − dealt ± hồi máu/DoT` trên cùng mục tiêu, khoảng cách < 3 s.
- Kết quả: 195 cặp; 163 lệch ≤ 2 HP, 186 lệch ≤ 12 HP (giải thích bằng hồi máu ~4 HP/s và DoT). Trụ: 163/169; Bot: 19/22; Player: 4/4.
- Ngoại lệ (9): 3 lần HP tăng +175…+199 giữa hai đòn (hồi máu/bình/nội tại — chưa gắn nguồn heal vào trace), 1 lần qua chết→hồi sinh (−2154), còn lại DoT dồn.
- Trụ dồn sát thương đúng thiết kế trong engine: 83→100→116→133→149→166→183→199→216→232 lên một mục tiêu.
- Bot dùng nội tại item thật (`item:qua_mach` gây 13 dmg) → bot đã sở hữu item C trong trận.
- Bản ghi trước ("HP khớp chuỗi") chỉ là kiểm công thức raw/res/dealt; nay đã có đối chiếu HP độc lập như trên.
- Kết luận: **trace PASS** (damage đăng ký và trừ HP khớp). Chưa log nguồn heal/shield, chưa phân loại miss → OPEN nhỏ. Theo quyết định creator #53981: **GAP TTK chuyển P0 → MONITOR**, giữ nguyên HP/giáp/damage, không áp P3.

### 2026-10-09 (2) — Soát lại theo creator: 9 sự kiện lệch, chuỗi trụ
**Chuỗi 83→232 KHÔNG phải trụ.** Raw 120→144→…→336 (+24/phát, mỗi 1,0 s, phép) = **tia Tâm Mạch (nexus)**: `beamDamage 120 × (1 + 0,2·n)`, structures.yml. Dealt = raw × 100/(100+44,6) khớp từng phát (120→83, 336→232). Ghi chú: tia nexus **không có trần** (phát thứ 10 = ×2,8) — chỉ ghi nhận, chưa đổi số (combat đang khóa).
**Trụ (physical, 150 × (1 + 0,35·n), trần +105%)** trong trận: 150→203 (bước 1–2 đúng thiết kế). Đối chiếu giáp: 150×100/186,4 = 80 ✓, 203×100/186,4 = 109 ✓, 150×100/147,2 = 102 ✓. Trận này **chưa lần nào lên phát 3 (255)**: 3 chuỗi đều về 150 sau 2 phát. Nguyên nhân CHƯA chứng minh (trace cũ không ghi trụ nào bắn) → đã thêm `slot = <id trụ>+<heat%>` vào trace.
**9 sự kiện lệch — trạng thái thật:**
- 3 lần HP tăng +194…+199 giữa hai đòn (t 318.8, 328.7 red; 492.7 blue): GIẢ THUYẾT khiên hoàn máu (shield soak trả HP sau hurt) hoặc hồi kỹ năng. CHƯA chứng minh — trace cũ không ghi hồi máu.
- t 316.0 (+562, blue) và t 561.6–563.1 (hpB −1095 → −1385): **hai thân `kha_tan@blue` cùng tồn tại** (thân người chơi + thân thế chỗ `sub-…` khi creator mất kết nối/ẩn tab). Bot tiếp tục đánh thân thế chỗ đã âm máu → **FAIL thật**: tướng 0 HP vẫn nhận đòn. Đã sửa: `hurt()` bỏ qua tướng `dead` hoặc HP ≤ 0. Chưa kiểm lại trong engine.
- Còn lại (+45, +65, ±21…86): DoT tổng hợp mỗi giây + hồi máu, CHƯA có log nguồn.
**Trace bổ sung (từ v này):** hàng `heal` theo loại: regen | fountain | potion | shield | skill | lifesteal (player + bot); nhãn mục tiêu `hero@team#<6 ký tự id thân>` (tách thân người chơi và thân thế chỗ); DoT gắn nhãn đội. Trận kế tiếp sẽ chứng minh được từng ngoại lệ.

## P0 — Hai thân tướng sau mất kết nối (2026-10-09)

**Đính chính:** phần phân tích trace cũ ở trên KHÔNG chứng minh nguyên nhân của 9 sự kiện lệch (hồi máu/DoT) và KHÔNG chứng minh nguyên nhân thân trùng. Chỉ số "186/195" so hai dòng liền kề, không phải đối chiếu từng hit với HP. Các nhận định đó giữ là GIẢ THUYẾT.

**Nguyên nhân (đọc source):** `referee/match.js` sinh thân thế chỗ `sub-<uid>` khi nhịp tim của người chơi dừng (tab ẩn/mất mạng), nhưng thân người chơi vẫn nằm trong `ctx.place.players` với `state.hero`. `lib/bodies.js heroBodies()` liệt kê cả hai → trụ, lính, bot, skill đều nhìn thấy và đánh được hai thân cùng một ghế.

**Sửa tại một nguồn:**
- `lib/bodies.js`: `parked(ctx,p)` = đang có `sub-<uid>`; `heroBodies` bỏ qua thân bị cất → `units()`, trụ, lính, bot, camera plates cùng dùng.
- `referee/match.js spawnSub`: ẩn thân người chơi khi thế chỗ; `takeBackSub`: hiện lại nếu không chết.
- `referee/match.js takeBackSub` + `hero/match/roster.js takeBack`: trả về cả DoT, khiên, stun/root/slow/charm, regenBuff ngoài HP/mana/vàng/đồ/cooldown/level.
- `screens/match/model.js`: bản đồ nhỏ không vẽ thân bị cất.
- Guard HP ≤ 0 trong `hurt()` giữ nguyên như lớp bảo vệ phụ, không phải bản sửa.

**Kiểm thử engine:**
| Case | Kết quả |
|---|---|
| heroBodies: không thế chỗ → 1 thân người; có `sub-` → chỉ thân thế chỗ; xóa `sub-` → thân người trở lại (exec trong place main, thân giả) | PASS_ENGINE (module) |
| Chu kỳ thật: disconnect → bot tiếp quản → reconnect → đánh tiếp | NOT TESTED (client của Savi chưa thành player row trong main) |
| Disconnect khi combat/recall/bị CC/đang chết/đang mua đồ | NOT TESTED |
| Reconnect inventory | NOT TESTED |
| Guard HP ≤ 0 regression | NOT TESTED |
| Tower ramp 4 phát có kiểm soát | NOT TESTED |
| 9 sự kiện lệch | 0 giải thích bằng bằng chứng / 9 chưa giải thích |
