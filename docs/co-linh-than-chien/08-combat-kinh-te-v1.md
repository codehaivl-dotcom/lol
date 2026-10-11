# Combat, tiến trình, objective và kinh tế V1

> **[USER LOCK — 2026-10-11 / supersession]:** **Q/W/E/R** là bốn slot kỹ năng; **D** = Dash chung; R Ultimate; không còn LMB/RMB làm slot skill. Bảng điều khiển, rank và các trích dẫn LMB/RMB/V/Space lịch sử bên dưới chưa cập nhật runtime, không còn là nguồn xác định keybinding cho roster mới. Theo [91](91-khoa-input-qwer-d.md). Basic Attack là hành động độc lập.


**Đơn vị:** mét, giây, HP, vàng nội bộ `g`, XP.  
**Khung:** game mới. Mọi số dưới đây là **giá trị khởi điểm** của Cổ Linh, chốt bằng mô phỏng (04 §3) rồi chuyển vào `scripts/lib/data/*.yml`, nơi trở thành canonical. Nhãn theo README: [V1 SPEC], [THAM KHẢO], [TBD-SIM]. Quyết định D1–D12 ở 10 đã chốt.

## 1. IDs, phép tính và thứ tự xử lý

### 1.1 Quy tắc damage

Loại sát thương: physical, magic, true. Công thức của Cổ Linh:

```text
effectiveResistance = max(0, resistance × (1 − percentPen) − flatPen)
mitigated = round(rawDamage × 100 / (100 + effectiveResistance))
true damage: effectiveResistance = 0
```

Physical dùng Armor + Armor Pen; magic dùng MR + Magic Pen; true bỏ qua cả hai. Damage đã mitigation trừ shield trước, phần còn lại trừ HP. Shield hết hạn đặt về 0, không cộng ngầm thành HP. Công thức [V1 SPEC]; đổi phải qua `balance-log`.

### 1.2 Resolve order chuẩn của V1

1. Xác minh nguồn attack hợp lệ, cooldown/resource đủ, target còn sống, target trong tầm/hình đánh.
2. Xác minh dodge/i-frame, untargetable, block, parry và miễn nhiễm theo kit.
3. Tính raw damage/heal/shield bằng payload và scaling của kit trong `heroes.yml`.
4. Áp kháng/penetration; true damage bỏ qua kháng.
5. Shield hấp thụ; phần dư trừ HP.
6. Nếu target còn sống/hợp lệ, áp on-hit, DoT, CC, mark và knockback theo thứ tự data; kiểm tra duration/resistance/cleanse theo system.
7. Chốt assist/kill, XP/vàng, boon progress, combat timer và event log một lần. Không cấp thưởng hai lần do projectile + overlap cùng đánh trúng.

Khi nhiều hiệu ứng cùng sửa một trạng thái: làm chậm lấy mạnh nhất, không cộng dồn; khiên cộng dồn, hết hạn riêng; CC cứng (choáng, trói, mê hoặc) lấy thời gian dài nhất.

## 2. Tướng, chỉ số và level

- Roster 27 tướng, ID ở 09 §7. Kit (stat, growth, chiêu, hình học, CC) là thiết kế mới trong `heroes.yml`; data tham khảo chỉ cho thang độ lớn.
- Chỉ số: HP, mana/resource, AD, AP, Armor, MR, move speed, attack speed, HP regen, mana regen; áp dụng đúng stat key, không biến đổi theo locale. Đơn vị là đơn vị thế giới: moveSpeed m/s, regen mỗi giây (09 §3). UI VI dùng Sinh Lực, Năng Lượng, Công Vật Lý, Linh Lực, Giáp, Kháng Phép, Tốc Chạy, Tốc Đánh, Hồi Sinh Lực, Hồi Năng Lượng.
- Stat theo level = `base + (L−1) × growth`. Cấp tối đa 15. Không tự chuẩn hóa giữa các tướng có resource khác nhau.
- Rank chiêu (D1): Q/RMB/E tự lên rank ở cấp 1/3/5/7/9; R mở ở cấp 6, lên rank ở 11 và 15. Không có điểm kỹ năng. Mảng per-rank trong data đi theo index rank.
- Bảng XP [V1 SPEC]: level 1→2: 280; 2→3: 380; 3→4: 480; 4→5: 580; 5→6: 700; 6→7: 820; 7→8: 940; 8→9: 1.080; 9→10: 1.220; 10→11: 1.380; 11→12: 1.540; 12→13: 1.720; 13→14: 1.900; 14→15: 2.100. Tổng từ L1 lên L15: 15.120 XP.
- Lên cấp hồi 35% max HP ngay [V1 SPEC]. Cấp tối đa 15. Ultimate (D2): nạp thanh bằng giao tranh — hạ tướng > gây damage lên tướng > lính/quái; heal, khiên, khống chế đồng minh cũng nạp. Hệ số mỗi sự kiện [TBD-SIM]. Tướng nào không dùng thanh nạp phải ghi rõ trong data.
- Dị Năng Ký Ức (D9) mở ở cấp 3/6/9/12/15, mỗi mốc chọn 1 trong 3 thẻ; 1 reroll/trận; tự chọn thẻ đề xuất sau 30 s; bot chờ 1,5 s. Bộ thẻ của cả 27 tướng là thiết kế mới, viết trong `heroes.yml`.
- Khởi tạo trận `[V1 SPEC]`: level 1, XP 0, 500g, không item/boon, đầy HP/stamina; resource theo kit. 500g, không dùng giá trị mặc định khác trước reset.

### 2.1 Sáu tướng slice (bản đọc, sinh từ `heroes.yml` ngày 2026-10-07)

Bảng là **bản đọc**; số chuẩn ở `scripts/lib/data/heroes.yml`. Chỉ số ghi dạng gốc + mỗi cấp. Kit đầy đủ (passive, LMB, Q, RMB, E, R, hình học, CC) chỉ nằm trong data file.

| ID | Tướng | Vai trò | Resource | HP | AD | Giáp/KP | Tốc chạy (m/s) | Tốc đánh | Tầm LMB (m) | CD R (s) |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|
| `moc_lam` | Mộc Lẫm | fighter_tank | none | 760+104 | 66+4,2 | 38/32 | 6,1 | 0,66 | 3 | 70/60/50 |
| `kha_tan` | Kha Tàn | fighter_burst | mana | 680+106 | 64+4,6 | 34/32 | 6,2 | 0,64 | 3 | 80/70/60 |
| `mi_dang` | Mị Đăng | assassin_magic | mana | 590+92 | 54+3 | 26/30 | 6,3 | 0,66 | 9 | 70/60/50 |
| `hoa_tuy` | Hỏa Tủy | mage_burst | mana | 560+88 | 50+2,8 | 22/30 | 6 | 0,63 | 10,5 | 75/65/55 |
| `nham_vu` | Nham Vũ | marksman | mana | 620+96 | 60+3,4 | 26/30 | 6 | 0,68 | 11 | 70/60/50 |
| `van_dao` | Vân Dao | support_heal | mana | 600+94 | 50+2,8 | 28/32 | 6,25 | 0,63 | 10 | 80/70/60 |

- **Ultimate trong slice:** R dùng cooldown trong `heroes.yml` làm giá trị tạm, cho tới khi hệ số nạp thanh của D2 có số từ mô phỏng `[TBD-SIM]`. Hai cách không chạy song song.
- **Kết quả mô phỏng 1v1 (lượt 2):** 4/6 tướng đạt 45–55%; Mộc Lẫm 55,4% (vượt nhẹ). Hai cặp vượt 70/30: Mộc Lẫm–Nham Vũ 75/25, Kha Tàn–Vân Dao 72/28. Chi tiết ở `balance-sim-2026-10-07.md`, lịch sử ở `balance-log.md`. **BAL-01 chưa đạt.** Hai cặp này được kiểm bằng playtest slice 1 (`13-playtest-slice-1.md`), không sửa kit thêm theo mô hình.
- Hệ số hp/dmg ở `tools/balance/out/mults.json` là đề xuất của optimizer, **chưa** nhập vào data.

## 3. Điều khiển chung và nhịp chiến đấu

| Input | Giá trị V1 | Ghi chú |
|---|---|---|
| WASD / arrows | Move theo camera; tốc độ riêng theo kit/controller | Kit data |
| LMB | Đánh thường; chuỗi/hit frame/tầm theo kit | Kit payload |
| Q / RMB (K) / E | Slot kỹ năng tướng | `heroes.yml` |
| R | Ultimate, nạp bằng giao tranh | D2 |
| V / Space / double tap | Né (game không có nhảy); stamina 25, cooldown 1,5 s, i-frame 0,42 s, tốc né 16,5 m/s, double-tap window 280 ms | [V1 SPEC] |
| B | Hồi Tưởng; channel 6 s; ngắt bởi damage, di chuyển, cast hoặc CC | D8 |
| P | Shop | D7: chỉ mua trong căn cứ mình hoặc khi đang chết |
| T | Active relic đã trang bị | Item data |
| F | Nhận/nhường quyền lái Titan trong 5 m | D4; cửa sổ claim 20 s |

Stamina pool 100; hồi 18/s trong combat và 38/s ngoài combat; combat timer 3,5 s `[V1 SPEC]`. Fountain hồi 15% max HP/s và 50 stamina/s trong radius 25 m `[V1 SPEC]`; vùng hồi thêm phải hợp nhất với aura sinh lực của map để không nhân đôi.

Trong combat, các kit có thể tạo thêm vệt đánh/phân thân/projectile/area. Collider/hitbox và timing lấy từ data kit. Dodge khiến đòn đã khóa vào vị trí cũ trượt; projectile được bắn sau khi i-frame kết thúc vẫn có thể trúng.

## 4. Chết, hồi sinh, assist và recall

- Hồi sinh sau 12 s tại fountain đội [V1 SPEC]; tăng theo cấp `[TBD-SIM]`.
- Hạ tướng: last hitter +300g/+300XP [THAM KHẢO]; assist chia 50% vàng cho người gây damage trong 10 s trước đó [V1 SPEC]; cả hai chốt bằng mô phỏng. Mỗi kill cấp thưởng một lần.
- Hồi Tưởng (D8): channel 6 s, hủy khi nhận damage, di chuyển, cast hoặc CC; về fountain phe mình. Không hoàn thành khi chết, bị câm hoặc reset trận.
- Respawn giữ item, boon, level, gold và ultimate charge theo state; reset full match xóa mọi state ngoài setting/locale/account. Reconnect giữ server state, không tạo thêm hero hoặc thưởng.

## 5. Wave lính và camp lính đánh thuê

### 5.1 Lane minion

| Tham số | Giá trị V1 | Nguồn/ghi chú |
|---|---:|---|
| Wave interval | 30 s ở `tai_hien`; 20 s ở `thu_tran` | [V1 SPEC] |
| Composition | 3 melee + 2 caster + 1 siege mỗi lane/phe | [V1 SPEC] |
| Wave đầu | T+5 s sau khi init/reset match | [V1 SPEC] |
| Lane cap | 14 sống mỗi phe/lane | [THAM KHẢO] |
| Global cap | 90 unit sống trên mọi lane | [THAM KHẢO] |
| Spawn spacing | 1 m, mỗi 0,1 s từng unit; jitter lane 3 m | [THAM KHẢO] |
| Creep block | reach 1,9 m; width 1,15 m; maxSlow 0,6; sidestep 0,55 m | [THAM KHẢO] |
| Bolt speed | caster 24 m/s; siege 18 m/s; tower orb 30 m/s | [THAM KHẢO] |
| Tower telegraph | 0,6 s | [THAM KHẢO] |

Chỉ số lính `[THAM KHẢO]`:

> 2026-10-09 (@lukasai): vàng + CS chỉ cho tướng last-hit. XP tách riêng: lính địch chết vì bất kỳ nguồn hợp lệ nào (tướng, lính, trụ) → mọi tướng địch còn sống trong 12 m (mặt phẳng XZ) nhận 100% XP, đúng một lần; last-hit ngoài 12 m không có XP. Player và Bot cùng luật (lane.js reward(), `minions.xpRange`). Chia XP 5v5: chưa thiết kế.

| Loại | HP | Range | Damage | Speed (m/s) | Attack interval | Vàng last-hit | XP (12 m) |
|---|---:|---:|---:|---:|---:|---:|---:|
| Melee | 480 | 2,4 | 24 | 4,4 | 1,25 s | 25 | 45 |
| Caster | 320 | 8,8 | 36 | 4,1 | 1,5 s | 18 | 35 |
| Siege | 880 | 7,2 | 54 | 3,8 | 2,0 s | 60 | 85 |

Đơn vị vượt lane/global cap khi wave spawn bị bỏ theo thứ tự spawn, không despawn lính đang đánh. Route chính xác ở 07. Lính ưu tiên mục tiêu: lính địch gần nhất → tướng đang đánh tướng đồng minh → công trình [V1 SPEC].

### 5.2 Camp rừng

> 2026-10-08: số neutral **candidate V0.1** (prototype, chưa ship, chưa bật ở Mạch Giữa) ở doc 31 §Candidate V0.1 và `objectives.yml` `neutral_v01`. HP trong bảng merc dưới đây là HP merc wave, **không** phải HP quái neutral.

Hai camp buff giữ lại: Sentinel (năng lượng/CDR) và Emberscale (burn/tốc chạy). Bốn loại còn lại là mercenary camps: người kết liễu quái cuối cùng mở một wave nhỏ cho lane gần nhất. Wave sinh cách nhau 2,2 m, unit đi theo role/rules lane minion, HP/damage tăng theo curve phút. Camps đóng trong lúc Titan reward đang đi; camp không buff không respawn/không phát thêm merc khi objective lock.

| Camp | Thành phần merc wave khi hạ camp | HP gốc / damage gốc |
|---|---|---|
| Wolves | 1 `wolf-alpha` + 2 `wolf`, melee | 900/30; mỗi wolf 420/14 |
| Raptors | 1 `raptor-alpha` + 3 `raptor`, melee | 800/26; mỗi raptor 300/10 |
| Shardpack | 1 `shard-elder` + 1 `shardpup`, melee | 1300/36; shardpup 650/20 |
| Shellwarden | 1 `shellwarden`, siege | 1500/55 |

Giá trị khởi điểm [THAM KHẢO]. HP/damage growth, actual gold/XP, camp spawn/respawn timer, aggro/leash/attack speed, buff numerical effects đều là `[TBD-SIM]` — đặt bằng mô phỏng.

## 6. Trial Call và Cổ Titan

### 6.1 Lịch và capture

| Rule | V1 target |
|---|---|
| Call I | Horn ở 02:00, pit mở ở 02:30 |
| Call sau | Khi Titan trước bị hạ hoặc idle rule giải phóng objective lock, horn; mở pit sau 30 s |
| Pit | Call I: `matchSeed mod 2`; các Call sau luân phiên pit. Lưu trong match state |
| Ring | 18 m từ tâm pit; vùng đứng là mặt sàn pit, không phải cả vành đá |
| Capture solo | 0→100 trong 45 s (D3); thêm hero cùng đội không nhân tốc độ |
| Tranh chấp | Khi hero sống của cả hai phe cùng đứng trong ring, contested=0: không phe nào tăng tiến độ. contestedBy=heads có trong data, nhưng hệ số pace bằng 0 nên lợi thế số người không làm bar tiến lên. Khi ring chỉ còn một phe, một hero đủ capture trong 45 s; thêm đồng minh không tăng tốc. |
| Comeback | Phe thua Call trước bắt đầu Call kế với tiến độ 30% |
| Clock | Không tự đóng objective; không có “Call timer expired” |
| Max timestep | Một update không được tính hơn 1000 ms tiến độ |
| Cảnh báo | Horn/announcer 30 s trước; progress mark 50% và 80% của địch phát warning; ngoài 45 m objective pointer hiện gần reticle |

Capture ring và progress bar có ba trạng thái rõ: chưa mở, mở/trống, đội chiếm hoặc tranh chấp. 99% bị giữ phải được diễn giải qua màu/nhãn + announcer, không giả làm 100%. Call winner nhận event một lần, phát tiếng thắng/thua, đổi màu pit tối đa 400 ms/lần, giữ màu thắng 5 s rồi đóng. Âm thanh và câu announcer là asset mới của game (lit, hold, taken, won, lost).

### 6.2 Titan body, rank và lái

| Tham số | Giá trị khởi điểm [THAM KHẢO], chốt bằng mô phỏng |
|---|---|
| Health | 9000 × (1 + 0,06 × (average champion level−1)) × `rankHp`; rank multiplier: 1, 1,15, 1,35, 1,7, 2,1, 2,6, 3,2, 3,9; rank giữ ở giá trị cuối sau VIII |
| Resistance | Armor/MR 40 + 10 mỗi rank sau rank đầu |
| Tower shot | 400 true damage mỗi phát |
| Walk speed | 3,2 m/s; fist range 3,4 m ngoài rim; mỗi 1,6 s; damage vào structure theo % health: 3,4%, 4%, 4,5%, 6%, 7,5%, 9%, 10,5%, 12% theo rank |
| Size | Base height 5,508 m; scale theo rank 1,3; 1,45; 1,6; 1,75; 1,9; 2; 2,1; 2,2; rim 1,2 m |
| Spawn/telegraph | Break free 7 m về phía sông so với tâm pit; rise 2 s |
| Claim | Hero cùng phe trong 5 m nhấn F trong cửa sổ 20 s; hết 20 s không ai nhận thì bot đồng minh lái |
| Drive | 70 s tối đa; mount 3 s (6 s nếu body bị đứng trong Titan); body script stall 4 s; no-input 45 s trả điều khiển cho bot; tự rời sau F hoặc mất quyền; không teleport |
| Khi nhường quyền | Hero được an toàn 1,5 s; rời Titan 1,5 m về phía căn cứ; bot tiếp tục điều khiển/walk |
| Survival | Titan đi cho tới khi bị hạ. Không despawn chỉ do hết timer. Titan idle 60 s (kiểm tra mỗi 10 s) thì không giữ lịch horn/camp lock; vẫn còn trên map cho tới khi hạ hoặc bị Call Titan khác thay theo state rules |
| Titan đầu và hai | Hai rank đầu khóa vào outermost standing structure của lane mục tiêu; Titan chỉ làm damage mục tiêu đó và rơi theo công trình. Nếu công trình không còn là phần thưởng hợp lệ, đi tiếp theo rule Titan. |
| Titan sau | Không bind vào một công trình; bot chọn mục tiêu theo giá trị/damage tương lai, lane break, crew và core eligibility. Người lái có lái, tăng tốc/phanh/xoay, đánh, Slam, Charge và Beam theo `objectives.yml`. |
| Death reward | Team địch 80g +40g/rank; last hitter thêm 150g; 200 XP +100 XP/rank chia cho hero trong vùng, |

Hành động của Titan (D4), giá trị khởi điểm, canonical ở `objectives.yml` khi build: fist share 0,35; Slam windup 0,9 s/CD 6 s/radius 6,12 m; Charge windup 0,6 s/CD 10 s/distance 26 m/speed 16 m/s; Beam windup 1 s/CD 8 s/range 7 m/5 s/tick 0,25 s. Mỗi rank có mảng damage riêng; không dùng một hằng số chung. Hình dạng boss theo rank và mảng damage tạm: [35](35-spec-boss-thuong-luong-co-linh-long.md), số ở `scripts/lib/data/objectives.yml` (`provisional: true`, [TBD-SIM]).

### 6.3 Targeting, đội hình và camp lock

- Titan đi lane, không đi xuyên công trình/collider; first target phải được lấy theo map rule, waypoint, structure line và `objectives.yml`. Mỗi lane được team bảo vệ/tấn công tương ứng.
- Autopilot chờ wave/đội hỗ trợ trước turret; có thể Slam/Charge theo số lính/hero/mục tiêu, né bắn dưới turret theo health/minion threshold và ưu tiên cấu trúc có damage plan tốt nhất. Ngưỡng của autopilot nằm trong `objectives.yml`; không dùng behavior "đi thẳng tới Tâm Mạch".
- Bot driver mất input đủ `afkSeconds` thì Titan được trả về bot. Titan bị lỗi mount/stall cũng trả lại quyền walk; không mất event capture/reward.
- Khi Titan đang thực sự tiến/đánh/bị đánh/được lái, jungle camps đóng. Nếu Titan đứng idle quá ngưỡng, camp mở lại và horn kế không bị kẹt; Titan vẫn hiện trên map.
- Các camp không buff được hạ sẽ ghi merc wave thuộc sở hữu phe last hit, spawn ở lane gần nhất. Merc wave là supplementary pressure, yếu hơn Titan; không trao permanent buff giả.

## 7. Công trình và win condition

### 7.1 Chỉ số công trình (khởi điểm)

Tọa độ ở 07. Bảng dưới là `[V1 SPEC]`; luật mở khóa ở §7.2.

| Loại | HP | Armor | MR | Tầm | Nhịp bắn | Damage |
|---|---:|---:|---:|---:|---:|---:|
| Trụ T1 | 2800 | 40 | 40 | 16 m | 1,2 s | 150 |
| Trấn Mạch T2 | 5400 | 65 | 65 | 16 m | 1,2 s | 150 |
| Tâm Mạch | 4000 | 20 | 20 | — | — | Shield 3000, hồi sau 12 s không bị đánh |

### 7.2 Target gameplay structure path

- T1 lane phải sụp trước T2 cùng lane có thể nhận damage.
- T2/Trấn Mạch có thể bị đánh sau T1 cùng lane đã sụp.
- Sụp **ít nhất một** Trấn Mạch mở Tâm Mạch vĩnh viễn trong trận. Shield Tâm Mạch có thể hồi lại sau 12 s không bị ai đánh; HP không hồi; beam phòng thủ ramp trên một target và tăng sức mạnh theo số Trấn Mạch còn đứng. Trị số beam/shield `[TBD-SIM]`.
- Sụp Trấn Mạch tăng cường Linh Binh của lane đó. Wave tăng cường không được nhân đôi khi hai Trấn Mạch cùng lane/state đổi.
- Không tự dựng lại structure. Match thắng khi Tâm Mạch HP về 0; kết thúc simulation một lần, rồi lưu kết quả.

Bảng §7.1 là giá trị khởi điểm; HP cuối chốt bằng mô phỏng nhịp trận 20–35 phút (D5).

**Trạng thái HP công trình (mở, chưa chốt).** Với HP bảng §7.1, mô hình trận (`tools/balance/match.mjs`) cho trung vị khoảng 5 phút, quá ngắn. Bộ tham số thử trong mô hình (HP ×3,5, công trình giảm 70% sát thương trước 14:00, tia Tâm Mạch 260 dps) cho trung vị 20,7 phút nhưng chỉ 57% trận nằm trong 20–35 phút; BAL-02 cần ≥ 90%. Mô hình macro còn thô, nên bộ số này **không** chép vào bảng. Giá trị cuối cần: (1) đo tốc độ phá trụ thật của một wave + 1–2 tướng trong playtest slice 1, (2) đưa số đo vào mô hình, (3) chạy lại. Tới lúc đó bảng §7.1 giữ nguyên làm giá trị khởi điểm.

## 8. Gold, item và slot

### 8.1 Economy baseline

- Vàng thụ động [V1 SPEC]: +3g/s khi sống. Starting gold: 500g. Giá hiển thị có format locale, data lưu numeric.
- Last hit theo bảng §5.1. Hạ tướng theo §4. Vàng/XP của công trình, camp và objective `[TBD-SIM]`, trừ Titan (§6.2).
- Mua item chỉ ở base phe mình hoặc khi hero đã chết `[THAM KHẢO]`; không mua giữa lane/camp. Shop không pause trận.

### 8.2 Vật phẩm slice đang có

| ID | Tên VI | Tên EN (working) | Loại | Giá | Hiệu ứng |
|---|---|---|---|---:|---|
| `quickstring` | Dây Cung Nhịp | Quickstring | weapon | 400 | +15% attack speed; đòn thứ ba +15 damage |
| `keeneye` | Mắt Sắc | Keen Eye | weapon | 950 | +35 AD, +25% attack speed |
| `iron_plate` | Giáp Thiết | Iron Plate | armor | 450 | +40 Armor, +220 max HP |
| `oathguard_plate` | Giáp Minh Ước | Oathguard Plate | armor | 1050 | +80 Armor, +480 max HP |
| `thornseed_quiver` | Ống Tên Gai | Thornseed Quiver | charm | 500 | +8% attack speed, +180 max HP |
| `heartforge` | Tâm Lò | Heartforge | charm | 1000 | +420 max HP, +5 HP regen/s |
| `phial_of_dawn` | Bình Bình Minh | Phial of Dawn | relic | 150 | T hồi 300 HP trong 4 s |
| `bastion_stone` | Thạch Hộ Thân | Bastion Stone | relic | 300 | T tạo 350 shield trong 5 s |

8 món là bản nháp (D10). Catalog đầy đủ của game (số món, slot, recipe, active) thiết kế mới trong `items.yml`, cân bằng bằng mô phỏng.

## 9. Cài đặt và mode-specific rules

| Mode | Composition | Delta V1 |
|---|---|---|
| `tai_hien` | 5v5 | 30 s wave; The Call/Titan; win bằng Tâm Mạch |
| `thu_tran` | 1 human + 2 ally bots vs 3 enemy bots | 20 s wave; không có Call/Titan |
| `san_tap` | Human, tùy chọn sparring bots/dummies | Không win condition; giá trị test-only phải được gắn flag, không lưu thành kinh tế thật |
| `(ngoài V1)` | Không có trong menu slice | Mode phụ thiết kế sau slice |

Practice bot dùng cùng hero IDs/stats/damage với player; AI decision có thể khác nhưng không sửa damage/reward. Bản offline ghi rõ bot. Tạm dừng bằng modal UI không dừng simulation trong online match; sandbox/local pause là cài đặt mode riêng.

## 10. Nơi số liệu sẽ sống

| Nội dung | File canonical khi build |
|---|---|
| 27 kit: stat, growth, chiêu, Dị Năng | `scripts/lib/data/heroes.yml` |
| The Call, Cổ Titan, camp, merc wave | `scripts/lib/data/objectives.yml` |
| Lính, công trình, Tâm Mạch | `scripts/lib/data/structures.yml` |
| Vàng, XP, vật phẩm | `scripts/lib/data/economy.yml`, `items.yml` |
| Map | `scripts/lib/data/map.yml` |
| Lịch sử cân bằng | `balance-log` + báo cáo mô phỏng theo phiên bản |

Khi các file trên ra đời, bảng số trong tài liệu này chỉ còn là bản đọc; số chuẩn ở data.
