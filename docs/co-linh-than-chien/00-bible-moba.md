# 00 · MOBA Bible — bản đối chiếu sản xuất local

> **[USER LOCK — 2026-10-11] INPUT MỚI:** bốn phím kỹ năng là **Q / W / E / R** (R = Ultimate), **D = Dash chung**. Không còn skill trên chuột trái/chuột phải. Các dòng LMB/RMB/V/Space trong tài liệu lịch sử bên dưới bị supersede ở tầng thiết kế; chưa ngầm khẳng định runtime Spawn đã đổi. Basic Attack là hành động riêng và input của nó phải được xác định/đồng bộ khi tích hợp; không gán thành skill slot. Xem [91 · Control lock](91-khoa-input-qwer-d.md).


**Cập nhật bàn giao 09/10/2026:** chủ dự án xác nhận luật Sân Tập và reconnect đã fix; hai mục này **ĐÃ ĐÓNG THEO XÁC NHẬN OWNER**, không mở lại hoặc xin duyệt lại. Các report/source fixture 9351 là evidence lịch sử, không xác định trạng thái world sau đó. Ưu tiên [66 · Bàn giao cho Savi](66-ban-giao-cho-savi.md).

**Nguồn kiểm cuối09/10:9351e23c6c6b4cc55a160dbf7aec268973b6394d.** Receipt373b bên dưới là lịch sử lượt đầu;9351 đổi cleanup dấuấn vàUI, không đổi các luật/data được mô tả. Dùng doc64 với lượt source mới nhất và bảng27ID đã sửa; không lấy câu “mới nhất” trong lịch sử làm trạng thái hiện tại.

Ngày 09/10/2026. Merge nội dung Bible remote tại `dcdbfb3d3cfe83ae65ed91a85dd439dceeb38f90` với nghiên cứu/audit local. Đã đối chiếu lại code mới nhất `373bff9e7bca2093e89dfae6cc73fd6e0dd6749c`: toàn cây chỉ đổi `scripts/architecture.json`, source luật/data/docs liên quan giữ blob giống bản ghim cũ. Đây là SOURCE REVIEW code mới nhất, chưa có client live mới. Bản sửa local chưa push; không giả rằng Savi đã nhận.

**Cửa đọc triển khai Slice: [64 · Chỉ dẫn và acceptance đã đính chính](64-slice-authoritative-handoff.md).** Hội đồng Codex đã sửa các chỉ dẫn sai về kiến trúc, đường module thực, Mị Đăng melee và acceptance lịch sử tại cửa 64; các đoạn được nêu tên ở đó bị supersede cho Slice. Đọc [62 · Gói sản xuất và mô phỏng](62-production-bible-va-bo-mo-phong.md) để xem data/biểu đồ. [Report luật](../../reports/production-2026-10-09/rules-report.md) giữ kết quả lịch sử; receipt PvP 15:47 đã tìm thấy và bổ sung ở64, không còn nói chung rằng không có quyết định reconnect.

## 1. Cách dùng và quyền quyết định

- Quyết định trực tiếp của chủ dự án là nguồn duyệt. Runtime data/code cho biết bản đang chạy làm gì, không tự thay quyết định đó.
- Bible giữ luật/lý do/nguồn; data máy đọc giữ số. Khi lệch, ghi rõ **đã code / luật đã duyệt / đề xuất**, không coi yml hoặc văn bản bất kỳ tự thắng mọi trường hợp.
- Nghiên cứu đối thủ không phải số cân bằng của Cổ Linh. Chỉ dùng sources/patch/mode trong doc58/60; không chuyển số cộng đồng thành canon.
- **Đủ giao sản xuất** nghĩa là người làm có dữ liệu, quy tắc đầy đủ, asset brief, bước tích hợp và ca nghiệm thu. **Đã ship đạt** cần evidence engine/client; simulator không thay được.
- Chỉ một writer xử lý reward/ack/mỗi quyết định chung; actor/source và thứ tự phải chỉ rõ trong contract, không dựa vào tên file để đoán.

## 2. Bản sắc và phạm vi

- Khoảng một triệu năm trước năm 2300: nền văn minh tiên tiến khởi nguyên ở vùng đất nay thuộc Việt Nam. Hợp kim ký ức, tinh thể và công nghệ sinh học; không phải triều đại lịch sử hoặc đèn lồng fantasy. Năm 2300 là lớp khám phá TKT/Hồi Tưởng Đồng Bộ. Lore/art canonical: 01/02.
- Hai phe Minh Ước / Triều Vực có lý lẽ riêng. Trận tái dựng ký ức không tự tạo canon lịch sử; mọi tướng được chọn cho cả hai phe.
- Slice: 6 tướng, Mạch Giữa một lane, hướng 1v1/3v3. Cửu Mạch 5v5 ba lane là map riêng. 21 tướng và phim lore giữ roadmap, không lấy asset polish tương lai chặn Slice.
- Không chép nhân vật/icon/lore/cả gói số đối thủ. Mỗi hệ mới đi qua nguyên lý → đánh đổi → thiết kế Cổ Linh → kiểm khác biệt → balance/QA.

## 3. Số và luật đã đối chiếu source

Các dòng dưới là **SOURCE REVIEW tại pin mới nhất 373bff9e**, chưa tự ghi thêm PASS client. Data/hàm bằng byte với pin báo cáo62; kết quả test62 vẫn thuộc lần chạy cũ, không tự đổi nhãn thành retest mới.

| Hệ | Bản code được quan sát | Nguồn |
|---|---|---|
| Chiêu | Q/W/E mở L1 (W dùng input RMB); rank ở L1/3/5/7/9. R mở L6, nâng L11/15 | combat.js `rankOf`, heroes.yml |
| Mị Đăng LMB | Melee1,6m, đâm dao, magic / AP 0,15; cast/impact gần, không fly projectile | heroes.yml; Bible remote §2 #49592; cửa 64 supersede25/41/56 |
| Lên cấp | Tăng MaxHP, giữ CurrentHP; không cộng hồi riêng khi lên cấp | hero/match.js, bot.js, economy.yml |
| Hồi phục | Hồi tự nhiên còn trong heroes.yml; hồi nhà và heal/đồ có nguồn riêng | Câu hỏi bỏ regen tự nhiên vẫn MỞ; không tự xóa |
| Recall | 8 giây, bị đánh/di chuyển/cast/hủy thì ngắt theo consumer | economy.yml và recall consumer; client ngắt vẫn cần trace |
| Trụ | 14 m; 150 gốc; 1,2 giây/phát; ramp +35%, trần +105% | structures.yml; lane.js |
| Chuỗi trụ | Hàm thực cho **150 → 203 → 255 → 308**, đổi mục tiêu về 150 | Trace raw tại pin; comment 307 là lệch. HP mất còn qua giáp/khiên, không phải chuỗi raw |
| Aggro trụ | Tướng đánh tướng đồng minh trong vùng → trụ chuyển sang attacker; player và bot cùng đường | `heroAggressor`, `stepTowers` |
| Aggro lính | Xét tướng aggressor hợp lệ trước fallback thường; không ramp như trụ | `stepMinions`; mô tả “lính trước aggressor” của Bible remote cần sửa |
| Wave | 30 giây; đầu 5 giây; 3 melee + 2 caster + 1 siege | lane.js/structures.yml; 20 giây trong docs cũ không phải code tại pin |
| Last-hit | Hero kết liễu được gold+XP+CS; không có chia XP gần lính trong hàm reward đã rà | lane.js; không suy ra hệ support đã triển khai |
| Shop | Vàng theo profile map (Mạch Giữa 1v1 mg1v1-0.1: 300 đầu, 1 g/s, lính x0.7, hạ tướng 150; base cũ 500/3/300); 6 ô; bán 60%; vùng shop 24 m | economy.yml economyProfiles + lib/econ.js; vị trí/dead-state do consumer kiểm |
| Giáp Thiết đang ship | 450 vàng, 40 giáp, **220 HP** | economy.yml; không sửa thành 200 trong docs |
| Kết quả | Snapshot kết quả, phase 20 giây ở config hiện tại | referee/match.js/lobby.yml; không lấy 15 giây cũ làm thời lượng chuẩn |
| Asset | Bundle theo roster/map, đi qua resolver/database asset | doc53 và resolver; trace tải thực có trạng thái riêng |

## 4. Đính chính đã thực hiện và quyết định còn thiếu

1. **Mode/roster:** cửa 64 đã giữ đúng quyết định08/10 bật Đấu Máy1v1bot, PvP unique cả trận, scope 6 tướng/1v1/3v3; bảng10 ghế không phải acceptance5v5. Sân Tập vẫn **OPEN_DECISION**: doc14 B0.1/B0.3/B0.6 không có tướng địch nhưng code Q thêm red bot. Lượt test53 Sân Tập 1v1 bot không phải approval. Cần receipt thay luật có nguồn; không tự duyệt bot hoặc tạo thêm tướng.
2. **Kết nối:** cửa 64 đã supersede blanketPvP60s theo doc14 B0.8v2 **@lukasai 09/10 15:47**, Bible#46822: bot thay, quay lại trước hết trận, deliberateleave 10s đóng ghế. Riêng solo/allhumansoffline vẫn **OPEN_DECISION**: cùng doc14 giữ60s,53§8 USER LOCK 60s; code Q `holdUntil/abandonSeconds` dùng 900s, comment nói bỏ60s nhưng thiếu nguyên văn/timestamp quyết định thay lock. Phần provenance và việc cần Savi xác nhận receipt nằm ở64; không gọi900s là đã được duyệt.
3. **Acceptance:** cửa 64 đã đánh dấu đúng mục08/11/13/19 **SUPERSEDED_FOR_SLICE/HISTORICAL**; dùng no level heal/recall 8/range 14/wave 30/keep valid pick/auto-rank, raw tower 308. Chỉ dẫn Mị Đăng25/41/56, kiến trúc48–50 và budget450 KB của57 đã được thay bằng các hàng hiện hành có nguồn; lịch sử giữ nguyên.

Hội đồng đã thực hiện phần sửa tài liệu ở 00/64 và ghi [closure](../../reports/production-2026-10-09/slice-closure.md). Engine/item/reward/math/client vẫn có trạng thái riêng ở64; tài liệu rõ hơn không tự đóng các ca gameplay. Không dùng đề xuấtHP mua item để thay luật đã duyệt về lên cấp.

## 5. AI Bot

Hướng risk-aware đã được user chốt: FARM / TRADE / RETREAT, biết đi wave/last-hit/đẩy trụ khi lính thực sự tank, dự toán trao đổi và đường rút. Không né trụ/lính tuyệt đối, không dive bằng raw damage.

Commit `0aa9fdb5` đã sửa kiểm aim lính, damage sau giáp và thời gian cast; `ca1176e0` thêm thời gian giữ quyết định. Ba findings ở doc60 pin cũ là lịch sử, không giao sửa lại như đang mở. Source sửa không tự thành PASS client. Counter mỗi tick không phải số lần push/dive; đo theo episode hoặc trace.

Bot chỉ dùng thông tin phe đang biết; không nhìn địch ẩn qua model/minimap/callback damage hoặc state toàn thế giới.

## 6. Các thiết kế mới đang làm

| Hệ | Hướng hiện hành | Trạng thái |
|---|---|---|
| Item phân cấp | 24 candidate, component → intermediate → completed; core là build chủ lực. Recipe, fee, refund, unique, passive/relic có data/test | [59](59-he-trang-bi-de-xuat.md); PROPOSED, pure tool đã chạy; chưa runtime balance |
| Mạch Đăng | Thắp trực tiếp để chiếm I/II; công tắc phòng thủ trong lãnh thổ gốc để bật I/hạ/tắt | [61](61-mach-dang-va-cong-tac-phong-thu.md); user đồng ý nguyên lý, số V0.1 và anti-spam bổ sung còn thử |
| Quái/boss | Phát triển 11 sinh vật trong pack có sẵn; neutral_v01 không tự bật trong Mạch Giữa | doc31/objectives.yml; provisional, không biến preview thành thưởng/buff |
| Cộng Hưởng/Nhịp Mạch | Giả thuyết buff/event | PROPOSED, không tự đưa vào bản đang ship |

## 7. Bằng chứng và cách bảo trì

Mọi record có pin/hash/input/seed/phạm vi/kết quả/loại evidence. Chạy bộ tool ở62; lỗi hợp đồng phải giữ đỏ tới khi nguồn và quyết định thống nhất. Snapshot restore của mô hình không chứng minh engine restart; 2-team observations không chứng minh 2 client; autoattack TTK không chứng minh mage/support/team balance.

Khi luật mới được duyệt: cập nhật mục tương ứng ở đây và data canonical cùng lượt triển khai; ghi quyết định và acceptance liên quan. Không tạo thêm catalog số tay trong Bible. Remote chưa có bản local này; lần giao Savi phải review diff theo pin, giữ sửa mới hơn.


## 8. Bản đồ — luật chung (audit Savi 2026-10-11)
- Mỗi map là một place riêng khi có runtime (`lobby.yml mapPlace`); map 1v1 **Mạch Giữa** = `places/main` + `scripts/lib/data/map.yml` (greybox 50%, NOT balance-accepted). **Cửu Mạch** 5v5 = doc 07 + manifest `data/cuu-mach-manifest.yml`, khoá (`lockedMaps`) tới khi qua cổng G1–G6 doc 80. **Hải Tâm** = concept doc 81, không 3D, không thuỷ triều.
- Công trình đặt theo tầm (trụ 14 m, tia Tâm Mạch 14 m), không co giãn theo kích thước map.
- 4 lớp map (07 §8): `gameplay_ground`, `gameplay_points`, `art_shell` (không va chạm, không chặn đạn/LOS/camera), `art_fx` (không dùng màu/hình cảnh báo combat). Thay art không đổi transform, bán kính, waypoint, nav.
- Đối xứng tâm (x,z)→(−x,−z) cho căn cứ, trụ, camp, pit, bụi; kiểm bằng script.
- Nghiệm thu map bằng ảnh ở camera trận thật (`camera.yml`), không bằng ảnh editor.
- Tầm nhìn: Mạch Đăng doc 61/65 là EXPERIMENTAL, chưa vào runtime; trụ 14 m là tầm bắn, không phải tầm nhìn.

## Trạng thái bàn giao hiện tại

Sân Tập/reconnect đã đóng theo owner; các đoạn mâu thuẫn 60/900 hoặc bot/no-bot phía trên là đối chiếu lịch sử, không phải việc còn chờ. Các số item ở9351 chỉ mô tả snapshot: Savi đang sửa tám item live, cần đối chiếu số mới trước tích hợp candidate.
- Kinh tế trận theo MAP (economyProfiles/economyByMap, lib/econ.js), Player và Bot cùng luật, sổ vàng tách nguồn state.econ. 1v1 ≠ 5v5 khi chưa đo. (09/10, doc 68)

- 2026-10-09: Né (D/Space) là phép bổ trợ hồi 15 giây, không phải lăn spam; HUD ô D hiện đếm ngược.

## Opening Phase V0.1 — Mạch Giữa 1v1 (2026-10-09, @lukasai, thử nghiệm)
- 0:00 = referee mở trận (`startedAt`), tướng ở nhà, được mua đồ/mở skill/di chuyển. Màn VS giữ tới khi tướng đứng trên map (không tính loading).
- Đợt lính đầu `structures.yml minions.firstWave = 15` s; chu kỳ `waveInterval = 30` s tính từ đợt đầu. HUD đếm ngược `waveWarn = 5` s ("Linh Binh xuất trận sau Ns"), đọc `place.state.nextWaveAt` do lane.js ghi.
- Đo engine (dev, 1 trận): đợt 1 ở 15,0 s, đợt 2 ở 45,0 s, hai phe 6/6 cùng tick; lính gặp nhau ≈ 0:32 (khoảng cách 128 m → 3 m).
- Chưa đổi: passive gold vẫn chạy từ 0:00 (`mg1v1-0.1` giữ nguyên; bắt đầu từ đợt đầu = biến riêng, phải mô phỏng trước). 5v5 lịch rừng/buff/Mạch Đăng/boss: chỉ thiết kế, chưa tích hợp.
- OPEN: đồng hồ chờ đủ người (PvP, người vào chậm) — hiện tính từ khi vé đầu tiên được nhận; bot chuẩn bị/không lao vào trụ trước lính; first last-hit time; tác động tới mốc mua đồ.

### Reconnect & lịch lính — 2026-10-09 (vòng P0)
- Bot thay (sub-<uid>) nhận đủ: HP, mana, vàng/ledger, item, **cooldown (cd)**, CC/DoT/khiên/bình máu, và **trạng thái chết + respawnAt** (chết thì vẫn chết tới hết giờ). Khi player về: trả lại cùng bộ đó.
- Trận Đấu Với Máy: khi người thật duy nhất rớt mạng, không còn ai gần → mô phỏng lane/vàng thụ động **tạm dừng**; đồng hồ phòng vẫn chạy. Khi quay lại, lane chỉ ra **một** đợt cho các mốc đã lỡ, giữ nhịp lưới 30 s (trace `waveSkip`). Không bao giờ dồn nhiều đợt cùng lúc.
- Engine đã thấy: CC 60 s + cooldown Q 60 s trên player → bot thay mang đúng phần còn lại (5 s / 5 s). Ledger vàng liền mạch qua 2 lần handover (start 300 + passive − spent = gold).

- 2026-10-09 (@lukasai "đứng gần quái địch bị hạ ko hề tăng EXP"): EXP lính: mọi tướng địch còn sống trong `minions.xpRange` (12 m XZ, structures.yml) quanh chỗ lính chết nhận 100%, một lần, bất kể ai kết liễu (tướng/lính/trụ); 5v5 chia XP chưa thiết kế. Vàng vẫn chỉ cho last-hit. Code: lane.js reward().
- 2026-10-09 (@lukasai "làm tường bao chặn xung quanh sân đấu. Ko cho rơi ra ngoài"): tường bao sân Mạch Giữa = 2 dải tường đá có va chạm (scripts/gen/arena-wall.js, dữ liệu scripts/lib/data/arena-wall.yml), chạy theo chân vách, ôm bãi cỏ vào trong, nối vào lan can bờ sông; sông chỉ qua bằng cầu. Tường đá thấp trang trí cũ (lane-wall, không va chạm) đã bỏ.

## Thông báo hạ gục (Slain) — 2026-10-10 (@lukasai: "HUD Slain/Slained chưa có")
- Mỗi lần một tướng gục: banner giữa trên 3,2 s (chân dung kẻ hạ — danh hiệu — chân dung người bị hạ gạch đỏ; xanh = tin tốt cho phe người xem, đỏ = tin xấu) + dòng ở bảng Thông báo + giọng xướng riêng theo góc nhìn và ngôn ngữ người nghe.
- Danh hiệu (theo LoL/AoV): Chiến công đầu (lần hạ tướng đầu tiên của trận) > Song/Tam/Tứ/Ngũ sát (mỗi lần hạ cách nhau ≤ 10 s) > Chặn đứng (nạn nhân đang chuỗi ≥ 3) > chuỗi 3 Liên tiếp hạ gục / 5 Không thể cản phá / ≥7 Huyền thoại. Không danh hiệu: "Bạn đã hạ gục" / "Đồng minh bị hạ" / "Kẻ địch bị hạ". Chết vì trụ/lính: không có kẻ hạ.
- Số: scripts/lib/data/killcall.yml · ghi: scripts/lib/killcall.js (gọi một lần từ life.js / bot.js) · vẽ: scripts/screens/match/widgets/slain.js (desktop + mobile).
- Trạng thái: PASS_MODEL (render HTML banner). Chưa thấy trên client của creator trong một lần hạ thật: NOT_TESTED client.

## Dây chuyền sản xuất tướng — chuẩn (2026-10-10 21:40, @lukasai)
- "Với flow hiện tại, sản xuất thêm tướng ko phải vấn đề nữa. Skill, Combat, vfx/animation đều đạt." → quy trình Hạo Nhật là mẫu cho mọi tướng mới: Lab (doc 73) → creator duyệt → heroes.yml + kitmech → model/rig → clip Blender theo doc 28 → VFX doc 30 → icon/chân dung → chuỗi (roster CSV + tip/ui strings) → registry/bundles → bot dùng kit → test.
- Ghi chú creator (21:40): "Animation và vfx ban đầu ko đạt. Nhưng sau audit thì pass." → bước audit (doc 28 audit.py + đối chiếu chú thích từng chiêu, toàn thân chứ không chỉ tay/khiên; VFX theo kit, không bịa) là bắt buộc, không phải tuỳ chọn; bản đầu tiên không được coi là đạt.
- Bài học Hạo Nhật: chuỗi tooltip (tip.<id>.*), tiểu sử (hero.<id>.bio) và mô tả chiêu (hero.<id>.<slot>.desc) là một phần của tướng; so khoá với một tướng production trước khi giao.
- 2026-10-10 21:46 @lukasai về Hương Mai: "bạn tự quyết. Nếu sau này có vấn đề khi test thì tunned lại" → Savi chọn số từ Lab (đòn bẩy hồi máu Q, độ trâu ×1,0), ghi BALANCE_PROVISIONAL; tune lại khi test thật lộ vấn đề.

## Tạo hình tướng (2026-10-10 23:00, creator)
Tướng chưa sản xuất: tạo hình sáng tạo (thú, nguyên tố, khoáng, cổ máy, vật liệu lạ, linh hồn), không còn người thường. Người vẫn có nhưng hiếm và khác đi (pháp sư lùn béo, thợ cơ khí, cao bồi xạ thủ, lính công nghệ). Nguồn: doc 74; quy trình: prototype doc 75 (sheet, silhouette, thử 64 px) → creator chọn → Blender. 8 tướng đã có giữ nguyên.


- 2026-10-10 (lukasai): Hình ngắm/báo trước do từng skill định nghĩa (heroes.yml `mark.kind`: circle | line | wall | target | none; mặc định theo `aim`). Không vẽ vòng tròn chung dưới chân mỗi lần cast. Skill target chỉ viền mục tiêu, không vẽ trên đất.

### Hình thái skill — một hình, ba lớp (creator 2026-10-10) · chuẩn đầy đủ: doc 76
- Đọc mô tả skill (strings.yml) + kit (heroes.yml) trước khi làm VFX; không đoán.
- Hình ngắm, báo trước, VFX và vùng trúng là MỘT hình do skill định nghĩa (`mark.kind`): tạo tường thì vẽ tường (ngắm = dải nền + bóng tường đứng, không vòng tầm), vùng trúng là chữ nhật của tường; sát thương tỏa tròn thì vẽ đúng vòng tỏa; skillshot = dải đúng bề rộng; target = viền lên mục tiêu.
- Tường: `mark.look: energy` (năng lượng/ánh sáng) = VFX trong suốt; `stone`/`ice`/... (vật lý) = lưới dựng bằng tam giác mang texture vật liệu thật (đá, băng), không dùng mặt phẳng phát sáng.
- `mark.hold` = số giây tường đứng; ai chạm vào trong lúc đó nhận lại hiệu ứng (không nhận lại sát thương).

### ULTIMATE (R) STANDARD (creator 2026-10-11) · chuẩn đầy đủ: doc 79
- R là đỉnh sức mạnh VÀ đỉnh trình diễn: hơn hẳn Q/W/E về animation, VFX, SFX, nhịp, impact, chất liệu, độ đọc. Không làm R hiền/nhỏ/Q phóng to.
- Năm lớp (rig, VFX, SFX, material, readability) + năm pha (mở, duy trì nhiều nhịp, cấu trúc đặc trưng, impact đỉnh, kết) + mười kiểm thử; mỗi R viết template doc 79 §4 trước khi làm.
