# 57 · Nợ tồn đọng: map + tướng (2026-10-09)

## RÀ SOÁT 2026-10-11 · TODO theo lô (@lukasai: "kiểm tra lại toàn plan xem còn nợ cái gì. Viết todo trước. Rồi làm theo todo. Tránh làm vặt.")
Nguồn gom: doc 57 (dưới), HANDOFF 10-10/11-10, doc 76/77, spawn todos. Mỗi lô 3–5 việc, xong lô mới mở lô sau. Nhãn: PASS_MODEL / PASS_ENGINE (quan sát thật) / creator duyệt.

**Lô A · Nghiệm thu skill theo doc 76 (đang làm)**
- [x] A1. Bàn test sạch: cờ QA chỉ ở build room tắt đợt lính + trụ bắn, hình nộm đứng đúng toạ độ, overlay debug vẽ hit geometry thật (cùng data heroes.yml) cạnh preview/VFX. → `scripts/lib/qabench.js` (qaBench/qaCases/qaLog), đã dùng cho A2/A3.
- [x] A2. Khả Tận Q: mép 90°/trong-ngoài r 4,5/sau lưng, xoay 0/45/90 → PASS_ENGINE 15/15 (doc 77, 11-10).
- [x] A3. Nhạm Vũ Q: 0/45/90, hình nộm trong khe giữa 2 mũi không trúng, 1 lần/mục tiêu → PASS_ENGINE 18/18 (doc 77, 11-10).
- [x] A4. Hương Mai E: preview giữ E, tường + dải nền 0/45/90, trong/ngoài mép, hình nộm trong vòng 3 m cũ nhưng ngoài tường không trúng, tồn tại 2 s. — 11/10 PASS_ENGINE 21/21 ở 0°, 45° và một góc xiên (~112°): trúng/trượt khớp đúng kitmech.inWall, vòng 3 m cũ ngoài tường không trúng, tường thấy 1.1 → 2.5 s sau thả phím, hết ở 2.9 s (≈2 s sau khi đáp). Preview giữ E là dải ngang, không vòng tròn. Creator duyệt pass 11/10 (tường năng lượng, look: energy). 90° đúng góc chưa đo. Chi tiết doc 77.
- [x] A5. Basic Attack 8 tướng: 10 s đứng một mình + giao tranh, ảnh BEFORE/AFTER, đơn mục tiêu đọc là đơn mục tiêu. — 11/10 ĐỨNG MỘT MÌNH xong cả 8 (client WebGPU, 1 hình nộm, mỗi tướng 10 s, ảnh 0.25/0.4/0.55/3/6/9.5 s): số hit Mộc Lẫm 7, Khả Tận 7, Mị Đăng 7, Hạo Nhật 6, Hỏa Tùy 5, Nhạm Vũ 6, Vân Dao 5, Hương Mai 7; không còn bán nguyệt to, không còn quả cầu chưởng; Nhạm Vũ thấy mũi tên. Ảnh: /cdn/value.0745209cd63cb0db09ea77156ffc2eecd8e15d695cd9460c9183d810bae1887c.png (cận chiến) /cdn/value.94cd8a80328b197f9eee9df6684d52b87dcd94e45d6b446c4a27f5b3ae2669ed.png (tầm xa) /cdn/value.b8515d4d0762f42ae43b2f05908e9fe778d15957067583e8f2852042de59c957.png (Nhạm Vũ). GIAO TRANH 11/10: trận 5v5 thật (tester Hương Mai + 9 bot), 4 cụm giao tranh 6–7 tướng, 12 ảnh: /cdn/value.30b19d39e79128924f1c6f8931978cad3fe73d91336b294b66cb5e4899ab6074.png — đánh thường vẫn nhỏ, không lẫn với Q/W/E/R. THẤY THÊM: một chớp trắng-xanh rất lớn (khung 0:38) phủ gần nửa màn hình và che telegraph; đó là skill, chưa xác định của tướng nào → mở A5b. Creator 11/10 chấp nhận AFTER-only (không có BEFORE). Bảng "Đợt lính tới sau N giây" creator ghi pass.
- [x] A5b. Chớp trắng-xanh khổng lồ trong giao tranh (ảnh /cdn/value.30b19d39e79128924f1c6f8931978cad3fe73d91336b294b66cb5e4899ab6074.png, khung 0:38): tìm skill nào, giảm bloom để không che telegraph (Basic < Skill < Ultimate nhưng không phủ màn hình). — 11/10 XONG (PASS_MODEL + ảnh client WebGPU, chưa có ảnh giao tranh thật mới): đo replay FX 8 tướng × 5 ô tại hình nộm (qabench replayFx), thủ phạm: Khả Tận Q (trắng 18,2 % khung), Mộc Lẫm E (15,7 %, vòng `slash` trắng của engine chồng 2 nét quét), Mộc Lẫm R (10,5 %, sao tuyệt + đèn 30). Sửa ở nguồn chung `look.js heat()`: sprite cộng sáng càng phủ rộng càng bớt trắng (to hơn, dài hơn theo bậc, không trắng hơn) + Khả Tận Q đèn 20→8, Mộc Lẫm R đèn 30→12, bỏ `slash` trắng của Mộc Lẫm E. Sau: 0,6 % / 1,1 % / 2,2 %. Ảnh trước/sau /cdn/value.77f2fd425d718b85168aeeda2223de21d5aa5d1cf7a80dcf60cab95f567372e8.jpg

**Lô B · Hương Mai hoàn tất (H1b)**
- [x] B1. Cầm gậy ngược (creator "xoay ngược gậy lại là xong"). Xong 2026-10-11: grips.yml huong_mai quat × 90° quanh trục X gậy → gậy dựng đứng, móc + đèn lồng ở trên; engine: tester trong trận (camera MOBA) thấy gậy dựng, PASS_ENGINE + creator PASS 2026-10-11.
- [x] B2. W: vòng hương to, thấy rõ ở camera trận. 2026-10-11: Savi reported missiles.js hoop R 0.66 + tube 0.14 (outer edge = width 1.6; hitbox unchanged), glowing pink lacquer + gold cord; vfx-body.fx.js incense smoke and pink streak along whole rim (row 77114). Match-camera image was captured with deliberately slowed flight; Savi explicitly had not seen a real cast. Do not label natural-speed cast readability PASS_ENGINE: still open under B4; no creator verdict by row 77114.
- [x] B3. R theo mô tả skill (đọc lại mô tả, đúng doc 76). 2026-10-11 client thật (tester): vòng 6 m báo trước màu đội, nổ đúng 1,3 s (windup 0,3 + delay 1), địch trong vùng −74 (100 phép qua kháng), bản thân +140 (base 140). Hình học khớp heroes.yml + doc 76 (area→circle). PASS_ENGINE; ghi chú: hạt hồng gom về mặt trời bị lớp tô vùng xanh lấn, chưa đổi.
- [x] B4. Client cast thật cả 4 chiêu → báo creator duyệt. 2026-10-11: Q tia bay thật, W vòng bay ra rồi về trúng 2 lượt, E tường sáng ngang hướng ngắm, R như B3. Ảnh gửi creator; creator "ok" 2026-10-11.

**Lô C · Bách Diện kit vũ công (H1c c1–c5)**
- [x] C1. Kit vũ công vào candidates/bach_dien.yml + Lab đọc field mới (c1–c2). 2026-10-11: kit có sẵn (Nhịp Lụa after_ability+buff, Q passMinions, W dash, E self untargetable 0,5 s + buff, R 3 nhịp + buff); engine.mjs đọc đủ; thêm `effectsOn: last` để choáng R chỉ ở nhịp 3.
- [x] C2. Lab `all --cand`, không RED → balance-log (c3). 2026-10-11: sửa ngân sách chiêu → fit ×1.15 (49.6%), combo không RED của Bách Diện (RED còn lại là Nhạm Vũ đã biết). PASS_MODEL.
- [x] C3. Clip E (xoay lướt) + R (vũ khúc 3 nhịp), proof sheet (c4). 2026-10-11: clip đã bake, HIT e 0,12 (windup 0) và r 0,40 (windup 0,2 + delay 0,2) khớp kit; proof /cdn/value.14dd4b788e54045cf731a88e81e376637fb6fc9a5faf974f556ee1c3507ca090.png. Engine: NOT_TESTED (ứng viên chưa vào trận).
- [x] C4. Báo creator: kit + số + ảnh động tác (c5). 2026-10-11 đã gửi; chờ creator duyệt.

**Lô R · Chuẩn Ultimate (doc 79, creator 2026-10-11) · làm trước lô D**
- [ ] R1. Bách Diện R đủ 5 lớp + 5 pha. Có (11-10): clip 3 nhịp (moves.py); vfx-bach-r.fx.js 8 population: 12 gương đồng 3D (gen/fx-mirror.js) dựng từ đất, quay vòng 4,5 m, loạt sáng mỗi nhịp, vòng sáng loé lan ra ở nhịp 3 + 1 đèn đỉnh nhịp 3, gương vỡ kết chiêu, viền nguy hiểm vàng đúng 4,5 m; SFX 4 lớp hero-sfx.yml (r, r_beat, r_flare, r_tail). ENGINE (qa lặp trên đường, camera trận pitch 56°/11 m/fov 42): viền vàng, vòng gương, loé nhịp 3 ĐỌC RÕ. Bài học: không thử FX ở nền nhà chính (sàn vẽ 0,5 m, collider 0,1 m → lớp sát đất bị chôn); space:'local' làm 'on:' dồn hạt về tâm → bỏ. CHƯA: nghe SFX trên client, thấy pha vỡ gương, gắn nút R + cast thật + choáng/hitbox, nhiều R cùng lúc, mobile.
  - 2026-10-11 (R1, đang làm, CHƯA tick): kit bach_dien vào heroes.yml (số candidate giữ nguyên, tuning hp 1.081/dmg 1.066), roster/lobby/economy/strings vi+en/skill-clips/vfx-heroes; R phát vfx-bach-r.fx.js + 4 lớp SFX qua skillfx.js; bỏ scripts/qa-bach-r.js. PASS_ENGINE (module): beatSpec/nextEcho cho 3 nhịp t=0,4/1,0/1,6 s, choáng 0,75 s chỉ nhịp 3 = B[2] flare. NOT_TESTED: trận thật với dummy trong/ngoài 4,5 m, sát thương đo, bot dùng R, ảnh FX client.
- [x] R2. Rà R 8 tướng đang chơi theo 10 kiểm thử → bảng thiếu gì (doc 78). Xong 2026-10-11: bảng + 3 lô sửa ở doc 78 (mức PASS_MODEL, chưa client).
- [ ] R3. Sửa R theo bảng R2, lô 3 tướng một lần, ảnh camera trận + so Q/W/E.
  - [x] R3 lô 1 (Hạo Nhật, Mị Đăng, Mộc Lẫm) mã + dữ liệu: 11/10, trạng thái từng mục ở doc 78 (#1,#4,#6 PASS_ENGINE một phần; #2,#3,#5 PASS_MODEL). Còn: nghe + ảnh hạt client, preview khiên Mộc Lẫm.
- [ ] R4. Báo creator duyệt từng lô.

**Lô D · Cổng Vòng 1: 6 tướng cũ (N1–N4)**
- [ ] D1. 6 trận 1v1 tự chơi lobby → kết quả, ghi lỗi chiêu/đánh/bot.
- [ ] D2. Sửa lỗi D1 theo lô, chụp chiêu góc camera trận.
- [ ] D3. Tay cầm + động tác trên bục sảnh từng tướng.
- [ ] D4. Vân Dao E chắn đạn trong trận.

**Lô E · Ổn định + tải**
- [ ] E1. Arrival sảnh 734 KB → ≤ 450 (11-10: −32 KB code combat khỏi boot; còn cell sảnh, strings, bundles.yml, grips.yml).
- [ ] E2. Arrival main 562 → ≤ 500 (tách cell x0z0). 2026-10-11: tách cell vô ích (x0z0 phủ |x|,|z|<64 m, hàng đã đúng cell); template hoá chỉ −38 KB (~523 KB). Cần dời script khỏi arrival (import() sau khi đứng). Chưa áp dụng.
  - 2026-10-11 (luồng tải main): ĐÃ ÁP DỤNG. (1) templatize.py: cell main dùng `templates/map-main.js` (−~38 KB scene). (2) `scripts/lib/i18n.js`: chuỗi dài tách sang `strings-long.yml` (18,7 KB) nạp bằng import() lúc gọi t() đầu tiên; `strings.yml` còn 13,5 KB (build-strings.py gọi split-strings.py). (3) `scripts/referee/match.js`: resolver asset (`scripts/assets/resolver.js`) import() ở tick đầu; bot chờ cờ `botsPending`, stand-in sớm dùng thân dự phòng. (4) `places/main/sim.js`: trọng tài một-place (`referee/single.js`) chỉ import() khi tắt split (~16 KB).
  - Số: TRƯỚC 561 KB arrival set (PASS_ENGINE, desktop người chơi @1076fc03, 10-10). SAU: mô hình import graph (tools/importgraph.py, script hành vi + cell + config) 418 KB — PASS_MODEL; nếu cộng mọi script geometry/fx mà cell main nhắc tới thì 646 KB (cận trên, engine trước đây không tính hết nhóm này, nên mô hình chưa khớp cách engine đếm). **Chưa có số engine sau thay đổi (NOT_TESTED)**: cần một lần vào trận main thật rồi `spawn perf --boot`.
  - Kiểm hồi quy: bot van_dao/moc_lam spawn ở main, onSpawn chạy, về fountain, 0 lỗi mới (PASS_ENGINE). Cast kỹ năng trong trận: NOT_TESTED (không có trận chạy; client thử không vào được main). Asset check: 0 chưa khai báo.
- [ ] E3. P0 reconnect còn lại: park-exploit B, tab sảnh cũ, ẩn thân lúc PENDING.
- [ ] E4. 5v5 regression: 10 chỗ spawn, trùng tướng cùng đội, quyền chủ phòng bot.
- [ ] E5. S1 cảnh báo top-level let; S5 frame/tick trận.

**Sau 5 lô (chưa mở):** map polish P2–P5/P7 · sảnh desktop theo ảnh mẫu (todo fa83210b, H4) · audit tạo hình roster (H1b+) · hội đồng số boss (todo 9b330ec3) · H2 map 5v5 · H3 Thuồng Luồng · H5 phim lore · Nhạm Vũ thấp hơn đối chứng 2–3 điểm (Lab n200 11-10, chờ creator, không tự chỉnh).
Gom từ doc 14, 15, 19, 24, 25, 27, 35, 36. Thứ tự theo cổng đã chốt: 6 tướng nghiệm thu → mới tới đợt Hạo Nhật/Hương Mai/Bách Diện; 1v1 Mạch Giữa nghiệm thu → mới mở map 5v5 Cửu Mạch.

## Vòng 1 · đóng 6 tướng (cổng cho mọi thứ sau)
- [ ] N1. Tự chơi 1 trận 1v1 đến hết cho từng tướng (6 trận, lobby → kết quả), ghi lỗi chiêu/đánh/bot (doc 24 T6, doc 19 §5)
- [ ] N2. Sửa lỗi N1; chụp từng chiêu cast/fly/hit góc camera trận (doc 24 T1/T2)
- [ ] N3. Tay cầm vũ khí + động tác trên bục sảnh, burst từng tướng (doc 24 T5, doc 25 T4/T5)
- [ ] N4. Vân Dao E chắn đạn trong trận (doc 39) + vệt ngắm T7 (chờ chọn nét)
- [ ] N5. Giao Codex chấm client; Savi không tự ghi PASS client

## Vòng 2 · Mạch Giữa hoàn chỉnh
- [x] M1. Decor V2: tường đá thấp hai bên lối, cổng đá ở trụ, đèn lồng, đá vụn, cây khô mép vực (doc 19)
- [ ] M2. Fountain Tâm Mạch quá sáng (doc 14 P5)
- [ ] M3. Bụi: tướng mình trong bụi (UX-P2a), cue trụ (UX-P2b)
- [ ] M4. Boot nhẹ: trận ≤ 450 KB trước khi đứng

## Vòng 3 · sau cổng (chưa mở)
- [ ] H1. Đợt tướng Hạo Nhật → Hương Mai → Bách Diện (doc 03, 23)
  - [x] H1a. Hạo Nhật: creator chốt passed 2026-10-10 21:36 ("theo tôi tướng mới passed"). Balance vẫn BALANCE_PROVISIONAL (×0,9).
  - [ ] H1b. Hương Mai: Lab giá trị đội so với support cùng vai (Vân Dao) → báo cáo + đề xuất → creator duyệt → sản xuất.
  - [ ] H1b+. (#lukasai 21:52 "sau tướng này. TÔi muốn audit lại toàn bộ tạo hình của hero đa dạng, đa chủng tộc, đa thuộc tính, ví dụ người đá, người sấm, cá sấu, Hổ, Sói... Người tinh thể, người cao su..") Sau Hương Mai: audit tạo hình cả roster 27 tướng: mỗi tướng một chủng/chất liệu riêng (đá, sấm, cá sấu, hổ, sói, tinh thể, cao su…), không trùng thân người mặc giáp; bảng đề xuất → creator duyệt → mới vẽ lại.
  - [ ] H1c. Bách Diện: KIT_REWORK nhẹ E/R (balance-log đợt 1) → Lab → duyệt → sản xuất.
    - (#lukasai 23:30 "làm di. Kit thì làm kiểu dancer. Vừa đánh vừa múa nhảy. Uyển chuyển mềm mại.") Kit đổi hẳn sang VŨ CÔNG GƯƠNG ĐỒNG (doc 75). Đợt 1 (3–5 việc):
    - [ ] c1. Kit vũ công vào tools/sim/candidates/bach_dien.yml (thay kit Người Đổi Bóng cũ): nội tại Nhịp Lụa, LMB Vẩy Gương, Q Gương Xoay, RMB Bước Jeté, E Xoay Né Lụa, R Vũ Khúc Trăm Gương
    - [ ] c2. Lab đọc 3 field mới trước khi ứng viên dùng: passive.buff (after_ability), self untargetable + self dash toward, area buff
    - [ ] c3. Lab `all --cand` → không RED → balance-log
    - [ ] c4. Animation E (xoay lướt) + R (vũ khúc 3 nhịp) trên rig Bách Diện, proof sheet, import
    - [ ] c5. Báo creator: kit + số Lab + ảnh động tác → duyệt → đợt 2 (runtime code, heroes.yml, sảnh, VFX/SFX, icon)
- [~] H2. Map 5v5 Cửu Mạch: chờ creator chốt gate §7 doc 27 + geometry manifest
  - [x] 11-10 báo cáo gate G1–G6 → doc 80; manifest nháp data/cuu-mach-manifest.yml (doc07/TBD, đối xứng PASS_MODEL). Còn: creator trả 5 câu, chạy T1–T6.
  - [x] Map 2 Hải Tâm: concept → doc 81 (chỉ tài liệu).
- [~] H3. Thuồng Luồng: ref sạch → 3D → rig 7 clip (doc 36); số boss chờ hội đồng (doc 35)
  - [x] Spec asset → doc 82. Còn: burst ở camera trận, collider, VFX, SFX horn + rise.
- [ ] H4. Sảnh desktop theo ảnh mẫu (todo fa83210b)
- [ ] H5. Phim lore lần đầu (doc 24 V1, doc 26)

- 2026-10-09 · Mạch Giữa decor V2 (đợt 1): tường đá thấp hai mép đường (art, không va chạm), cột cổng ngà ở mỗi trụ, đèn pha lê theo màu đội, đá vụn bazan, cây khô ven vực. Đối xứng tâm xanh/đỏ, tag `art-decor-v2`. Chưa nghiệm thu bởi creator.

## TODO ổn định + polish (2026-10-09 tối, @lukasai: "trong lúc chờ agent làm docs, bạn ổn định hệ thống")
- [x] S0. Dọn bot test tạm `bot-blue-test` khỏi main
- [ ] S1. Lỗi/cảnh báo runtime: destroy id hỏng của dấu ấn (mark) trên bot, top-level let cảnh báo
  - 10/09: clearMark chỉ destroy khi object còn sống (dấu hết lifetime không còn báo). top-level let: chưa xử lý.
- [ ] S2. Soát HUD lệch: sảnh (home, tướng, phòng, chọn, vinh danh, truyền thuyết, kết quả) + HUD trận desktop 1828×860 và 1366×768
  - 10/09 (giả lập desktop 1828×860 + compact 1600×800, chưa PASS client): logo VI/EN theo ngôn ngữ (thanh trên desktop + giữa top bar mobile); dấu tiếng Việt bị cắt ở tên tướng lớn (HỎA → HÓA) và tiêu đề thẻ home/phòng, sửa line-height; vương miện thẻ Vinh Danh không còn đè chữ; mô tả thẻ home 2 dòng, không chạy dưới mũi tên. Còn lại: phòng, chọn, kết quả, HUD trận.
- [ ] S3. M2: fountain Tâm Mạch quá sáng
- [ ] S4. VFX: soát chiêu 6 tướng góc camera trận, sửa cái đọc kém
- [ ] S5. Hiệu năng: frame/tick trận, particle nặng
- [ ] S6. Audit lại sau khi xong, ghi kết quả ở đây (PASS fixture/giả lập, không ghi PASS client)

## TODO polish Mạch Giữa theo ảnh ref R2 (2026-10-09 23:05, @lukasai: "làm map trước. Ý tưởng + ảnh ref đã có")
Nguồn: doc 38 §10–11 (USER LOCK art R2 + chi tiết R1). Geometry `map.yml` giữ nguyên. Ưu tiên cái camera khóa 56° nhìn thấy; cảnh xa chỉ đủ khung (luật camera khóa).
So sánh ảnh engine ↔ R2 (23:04): đường kem phẳng không thấy phiến lát, không chỉ vàng; bờ cỏ trơn, ít lau; mép lane thiếu lan can đá + cột đèn pha lê lam; thiếu thác/sương ở mép vách.
- [~] P1. Mặt đường: phiến đá xám-ngà lớn thấy mạch vữa ở góc chơi, tông tối hơn 1 bậc (không cháy trắng), chỉ vàng chạy dọc hai mép đường
  - 23:15: texture lanestone đổi sang phiến đá cổ không đều, mạch vữa tối, scale 6 (ảnh engine góc 56°: thấy phiến rõ). Chỉ vàng: thử 2 cách (136 box, rồi ribbon theo terrain), bị lơ lửng chỗ đất gồ + gần như không đọc ở 56° → GỠ. Cần cách khác (vẽ vào texture riêng cho dải mép) nếu creator vẫn muốn.
- [x] P2. Bờ chiến: cỏ rêu đậm có vệt đá lát vỡ lấn ra; cụm lau tại mép, không vào ellipse bụi gameplay — 2026-10-11 stream B/1: `scripts/gen/lane-bank.js` part ground (thảm rêu + phiến ngà vỡ + hoa nhỏ, dải 8,7–11,6 m từ tim lane, cao ≤6 cm) ×4 + part reeds (1 cụm lau instanced dọc chân tường sân) ×2. Không collider. PASS_ENGINE ảnh camera trận (pitch 56°, 17 m, fov 42) tại xanh (-36,33), cầu giữa (0,0), đỏ (36,-33): không chạm lane/trụ. Ghi chú: các vệt tối lớn trên mặt đá lane là của terrain, không phải bờ chiến (ảnh cô lập object không có).
- [x] P3. Lan can đá thấp chạm + cột đèn pha lê (Xanh lam / Đỏ son) dọc hai mép hành lang, art-only, dưới gối tướng — 2026-10-11 stream B/1: cột đèn đá huyền vũ + đai đồng + tinh thể đội (lam nửa xanh, son nửa đỏ) đứng trên trụ tường sân `arena-wall` (ngoài vùng đi), lane-bank part lamps ×2; lan can dùng lại arena-wall/balustrade có sẵn. PASS_ENGINE (ảnh 3 điểm như P2). Cell main: 152,9 KB → 155,0 KB (+2,1 KB, 8 hàng).
- [x] P4. Cầu: hai vòm đá + lan can như R2; medallion giữ — 2026-10-11 Stream B/2: `scripts/gen/bridge.js` ARCHES 3→2 vòm (zc ±10,6, nửa nhịp 9,4) + một trụ rẽ nước giữa dưới medallion; lan can/parapet, medallion, collider KHÔNG đổi. PASS_ENGINE (camera 56°, 17 m, fov 42: xanh −27,4/19 · cầu 0/0 · đỏ 27,4/−19): không chạm lane/trụ.
- [x] P5. Thác + sương ở mép vách nhìn thấy trong khung 56° — 2026-10-11 Stream B/2: 14 thác art-fall-* giữ chỗ, chân thác dùng chung `scripts/effects/fall-foot.fx.js` (spray + mist cuộn + veil thấp + foam) thay 14 bản inline. Cell x0z0 115,5→108,5 KB. PASS_ENGINE thấy sương ở chân thác 20,6/11,9 từ camera trận.
- [x] P6. M2 Tâm Mạch quá sáng: pha lê glowScale 0.5 + đèn lõi 5→2.2 (cả 2 phe). Ảnh engine: lõi đọc được, không cháy trắng. NOT RUN client.
- [ ] P7. Walk 5 khung góc chơi (§8 doc 38) + đối chiếu R2; audit; NOT RUN client cho tới khi creator xem

### Map 1 — đợt #55734 (2026-10-09)
- [x] P8. Bỏ 4 bụi cỏ trên cầu (river-*), dời vào túi mới. Data: map.yml brushes. NOT RUN client.
- [x] P9. Toàn bộ sàn đi được lát đá: đường chính 17 m lanestone, hai bên bankstone (cuội xám). terrain.js materialAt; bỏ mark path lane-blue/red. NOT RUN client (ảnh CPU chưa đọc được nền).
- [x] P10. Chặn rơi: scripts/lib/walkable.js fence() cho player (đi, dash, knock) + bot. Vùng sông chỉ đi trên mặt cầu (±7.8 m). PASS dữ liệu điểm mẫu; NOT RUN trong trận.
- [x] P11. Trụ sập → tàn tích: tower.js params.ruin (bệ + gốc thân gãy + đá đổ + pha lê tắt), collider gốc nhỏ; lane.js fall()/initStructures. Ảnh object: đọc được. NOT RUN trong trận.
- [x] P12. 4 túi mở rộng cỏ (map.yml pockets, r 6, cách tâm đường 15 m, giữa T1–T2 mỗi phe), mỗi túi 1 bụi nấp. NOT RUN client.
- [ ] P13. Arrival main 561 KB > 500 KB (x0z0 113 KB) — xem E2: tổ chức scene không đủ; chặn ở byte script/world files.
- [x] P14. (#lukasai 23:22 "tường bao quanh toàn bộ sân đấu, trong sân thì luôn di chuyển được") Lan can cầu chỉ còn trên đoạn qua sông, gặp lan can bờ (bankWall 9.2 m); hai đầu cầu trên đất mở thông ra bãi cỏ hai bên. bridge.js SPAN (hình + collider). Ảnh engine: đầu cầu mở. NOT RUN client.

## TODO vật phóng thật (2026-10-11, @lukasai: "cung tên đạn súng tên lửa → phải có thật, ko chỉ bắn 1 cái tia sáng vô nghĩa… ném rìu ném thương hay ném đá thì phải thực sự ném ra")
Luật: mô tả gameplay nói vật thật (tên, lao, than, móc xích, đèn, vòng) → bay ra một mesh 3D thật (vật liệu thật, đúng hướng bay), ánh sáng chỉ là vệt phụ. Phép thuần (tia, ấn gió, lời gọi, dây sáng) giữ là năng lượng.
Một renderer chung: `scripts/gen/missiles.js` (hình) + hành động `body` trong skillfx.js (spawn + bay a→b đúng t của gameplay) + cột `body:` trong vfx-heroes.yml. Không đổi hitbox/tốc độ/sát thương.
Đợt A (4 loại):
- [x] A1. Tên (Nhạm Vũ: đánh thường Tên Sỏi đầu sỏi; Q ba mũi; RMB tên đầu hổ phách)
- [x] A2. Lao (Nhạm Vũ R Lao Vách)
- [x] A3. Than (Hỏa Tùy: đánh thường Than Bay, RMB Dấu Than, R Than Rơi = khối `meteor` thật rơi 24 m trong 1,25 s; ảnh engine thấy khối đá nứt lửa, NOT RUN trong trận)
- [x] A4. Móc + xích (Khả Tận E Móc Kéo)
Đợt B: Mị Đăng Q đèn bay đi-về · Hương Mai RMB vòng hương thật · soát lại toàn roster sau khi có tướng mới.
Nghiệm thu: ảnh engine từng loại ở góc camera trận; PASS_ENGINE chỉ khi thấy bay thật trong trận.
- 11/10 làm: `scripts/gen/missiles.js` (tên đầu sỏi/hổ phách, lao, than, móc, xích) · `skillfx.js` BODY + flyBody (entity bay theo đồng hồ phòng, `scripts/fx-body-fly.js`) · vệt bám vật `scripts/effects/vfx-body.fx.js`. Thay quả cầu sáng của thư viện ở các ô đó; âm thanh giữ. Hitbox/tốc độ/sát thương không đổi.
  Bằng chứng: ảnh engine (sảnh dev, camera tự đặt) thấy 5 vật thật bay đúng hướng, xích ra theo móc; đọc vị trí sim khớp (x 67.07 tại 2.8/4 s, dự kiến 67.2). NOT RUN trong trận thật, chưa xem ở client người chơi khác (đồng bộ vị trí có thể giật).
- 11/10 11:45: Mị Đăng Q Đèn Đi-Về = đèn lồng thật (nắp đồng, thân giấy tím sáng trong, 6 nan, tua đỏ) bay ra rồi về. Ảnh engine đọc ra đèn lồng; NOT RUN trong trận. Hương Mai RMB giữ vòng fx hiện có (vfx-huong-ring) chờ nhận xét.
