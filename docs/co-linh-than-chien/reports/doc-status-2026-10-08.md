# Trạng thái tài liệu: Cổ Linh Thần Chiến (Wisp D, 2026-10-08)

**Tóm tắt**
1. 38 doc (01–38): DONE 0 · PARTIAL 22 · OPEN 1 · NOT RUN 1 · BLOCKED 4 · ROADMAP 7 · HISTORY 3. Chưa doc nào đạt DONE vì không doc nào vừa có code vừa có evidence client cho mọi mục của nó.
2. Việc mở số 1: chạy trọn một vòng trên client thật, từ sảnh → chọn tướng → trận → Tâm Mạch vỡ → results → về phòng (14 D1, 11 END-01, RES-02, LOBBY-01). Ca PRAC phá Tâm Mạch vẫn NOT RUN (reports/2026-10-08-playtest-codex.md).
3. Việc mở số 2: điện thoại thật và 2 client độc lập (11 MOB-01, NET-02, 14 B9/D3/D5). Đang BLOCKED: chờ creator cho dùng phòng dev hoặc mở phòng riêng (14:136). Fixture Wisp A chạy ngoài engine nên không tính.
4. Việc mở số 3: G2, tức khung độ dài trận Mạch Giữa và HP công trình (11 BAL-02S = TBD-SIM, 08 §7.1 "mở, chưa chốt"). Đang BLOCKED: chờ @lukasai duyệt khung; ca đo (b)/(c) NOT RUN.
5. Các ô checkbox ở 15, 20, 21 đã cũ so với code (bot.js, rayPick, SELF_CAST đã có). Bảng dưới đây ghi theo evidence đã chép trong docs, không ghi theo checkbox.

Quy ước: "có code, chưa client" = grep thấy code trong `scripts/` nhưng docs không ghi match/round/runtime nào kiểm trên client.

## 1. Bảng trạng thái

| doc | mục đích (≤12 chữ) | trạng thái | evidence | còn mở |
|---|---|---|---|---|
| 01 thế giới & cốt truyện | Lore nền V1, bối cảnh 2300 | PARTIAL | Baseline lore; màn TRUYỀN THUYẾT nằm trong 14 B4 (`scripts/lib/lobby-ui.js`), có code, chưa client | Chưa đối chiếu lore hiển thị trong game; lore 21 tướng còn lại theo roadmap |
| 02 bản đồ & mỹ thuật | Hướng art map và nhân vật | BLOCKED | Doc tự ghi "art target mới; geometry hiện tại không phải art target" | Chờ ảnh map mẫu từ agent ngoài của creator (38) |
| 03 danh sách tướng | Kit 27 Cổ Linh | ROADMAP | 6 kit slice nằm trong `scripts/lib/data/heroes.yml` | 21 tướng còn lại giữ roadmap |
| 04 bảo toàn gameplay | Luật không đổi gameplay khi làm art | PARTIAL | §1.1 camera đã đồng bộ theo 14 G1 (`scripts/lib/data/camera.yml`) | Chưa có bài kiểm art-pass so tọa độ/hitbox |
| 05 từ điển Việt hoá | Thuật ngữ VI/EN chuẩn | OPEN | 14:133 "Super Veinbound" chờ duyệt; 35:70 Marsh Wyrm/Elder Vein Dragon chờ duyệt | Creator duyệt tên EN, sau đó ghi vào 05 |
| 06 GDD sản xuất V1 | Đích V1 5v5 dài hạn | ROADMAP | 06:36 và 06:64 dẫn sang 14 §B0.1 | 06:64 vẫn ghi `thu_tran` khoá (xem gap 1) |
| 07 layout bản đồ V1 | Layout Cửu Mạch 3 lane | ROADMAP | Mạch Giữa lấy từ §7, đã nằm trong `scripts/lib/data/map.yml` | Phần 3 lane, rừng, 12 camp giữ roadmap |
| 08 combat & kinh tế | Công thức damage, vàng, công trình | PARTIAL | `structures.yml`, `economy.yml`; 08:193 "HP công trình (mở, chưa chốt)" | Chốt §7.1 theo G2; Live run 2: T1 đỏ 760.8 s, Tâm Mạch chưa tới ở phút 25 |
| 09 data contract & roster | Schema data và locale roster | PARTIAL | `scripts/lib/data/strings.yml` + `i18n.js` + `tools/l10n/build-strings.py`; 11 DATA-02/04/05 NOT RUN | DATA-03 BLOCKED (tooltip VI/EN chưa author); roster 27 dòng thuộc roadmap |
| 10 đối soát runtime | Sổ quyết định thiết kế D1–D12 | HISTORY | Bảng D1–D12 "✅ Chốt 2026-10-07" | D2 (nạp ult) và D3/D4 (Call/Titan) chưa vào slice (13 §3); D5 HP chờ G2 |
| 11 acceptance bàn giao | Gate nghiệm thu Slice/V1 | PARTIAL | Cột Phạm vi G3 đã có; 9 PASS ghi trong doc | 17 gate Slice còn NOT RUN (COMBAT-01/02, MAP-04..06, END-01, ECON-02/03, LOC-01/02, NET-02, MOB-01, DATA-02/04/05); BAL-02S TBD-SIM |
| 12 bảng chỉ số tướng | Thang chỉ số tham khảo | HISTORY | Bảng tham khảo; số chạy thật nằm ở `heroes.yml` | — |
| 13 playtest slice 1 | Phạm vi và chỉ số đo slice 1 | PARTIAL | 13:10 "đã build… nghiệm thu còn mở theo 14 §A" | §4 bảng SQL `duels` và chọn cấp ở Sân tập không có trong code (grep rỗng), xem gap 3; §5 đo 20 trận/mốc: NOT RUN |
| 14 todo lobby & playtest | Luật Slice 1.5 và nhật ký kiểm | PARTIAL | Mock trọng tài 56/56 (`tools/test/lobby-referee.mjs`); P1 PASS ở runtime v545 (841389e); P4 reconnect/timeout PASS ở runtime 560 (7be6b6c); Rời trận Sân Tập PASS (55249a0); UX-P1 match23/round39, UX-P2a match25/round41 PASS có giới hạn | Checkbox B1–B10, D1–D5 chưa đánh; LOBBY-01, RES-02, MOB-01 BLOCKED; GAME-02 khôi phục chỉ số NOT RUN; nút Rời trận ở Đấu Máy NOT RUN; P2 phone chưa; P5 QA-04 chờ vòng art; G2 mở |
| 15 todo thử trận 1v1 | Đấu Với Máy 1 người vs 1 bot | PARTIAL | Có code: `scripts/bot.js`, `bot.yml`, `places/main/sim.js:21-25`; 14 P4: Đấu Máy reconnect 33.6 s PASS (runtime 560) | 6 checkbox chưa đánh; doc nhắc `bot-brain.js` nhưng code thật là `bot.js`; chưa có client ghi thắng/thua thật với bot (24 T6) |
| 16 gap gameplay | Danh sách lỗi Mạch Giữa ngày 07 | PARTIAL | 16:41 "[~] = code đã vào… chưa test tận mắt" | B1, B3–B6 chưa có client; B7, B8–B10 mở; polish map đang khoá theo 38 |
| 17 thiết kế map Mạch Giữa | Hình học Mạch Giữa hiện hành | PARTIAL | 17:5 nguồn thật là `scripts/lib/data/map.yml` + `places/main/cells/*.scene` | Chưa có PASS client cho MAP-04..06; polish chờ ảnh mẫu (38) |
| 18 research map MOBA | Tham khảo map MOBA | HISTORY | Tài liệu research | — |
| 19 research HUD & gameplay | Spec HUD/gameplay từ research | PARTIAL | Map V2 [x] (v347+); `drawTowerCue` trong `hero.js` (UX-P2b match25/round41 PASS một phần) | HUD web/mobile §4 chưa nghiệm thu client; "tự chơi 1 trận đầy đủ từ lobby" mở |
| 20 gap skill/VFX/target | Thiếu sót skill, VFX, chọn mục tiêu | PARTIAL | Có code: `rayPick` (hero.js), `SELF_CAST` (skillfx.js), `tex-skillmark.js`; Codex m30–m32 r47–49 PASS giới hạn | 9 checkbox đã cũ; telegraph địch BLOCKED; hit trúng lính INCONCLUSIVE (m33 r50) |
| 21 audit balance & plan VFX | Audit cân bằng, kế hoạch VFX | PARTIAL | 21:67-69 "[x]… chưa test bằng hình / chưa test trong trận thật" | Mục 5–6 (rà thời lượng KIT, chụp từng chiêu) mở |
| 22 tài nguyên 27 tướng | Asset cho 27 tướng | ROADMAP | — | 21 tướng còn lại |
| 23 giao việc 21 tướng | Phân việc 21 tướng mới | ROADMAP | 11 dòng BLOCKED trong doc | Giữ roadmap |
| 24 todo hoàn thiện 6 tướng | Hoàn thiện 6 tướng slice | PARTIAL | T3 [x]; báo cáo Wisp B (`reports/wisp-B-2026-10-08.md`): 30 clip, 12 hit (preview dev) | T1/T2/T4/T5 [~]; T6 trận 1v1 với bot có thắng/thua: mở; T7 audit mở; V1 phim lore thuộc roadmap |
| 25 động tác theo tướng | Map động tác/clip từng tướng | PARTIAL | 25:5 "mapping clip đã có trong code… chưa nghiệm thu trong trận thật"; `skill-clips.yml` | Nghiệm thu in-match; 11 dòng BLOCKED |
| 26 video lore intro | Phim lore mở đầu | ROADMAP | 26:5 "NOT APPROVED FOR PRODUCTION" | Giữ roadmap |
| 27 handoff map 5v5 ba đường | Bàn giao map 3 lane | ROADMAP | 27:7 BLOCKED, chờ mốc 1v1 và gate §7 | Giữ roadmap |
| 28 workflow animation skill | Quy trình làm clip skill | PARTIAL | `art/anim/{rig,moves,audit}.py`; Wisp B 30 clip | Clip trong trận chưa nghiệm thu (25) |
| 29 todo VFX trong suốt | Pass trong suốt VFX | PARTIAL | `skillfx.js` GLASS add .24/soft .34; kiểm bằng ảnh helper | 29:13 audit sau khi làm chưa ghi; m34 r52 W Mộc Lẫm trắng; bản sửa `glass()` linear chưa retest client (B2 đã dispatch) |
| 30 workflow VFX skill | Quy trình làm VFX skill | PARTIAL | Quy trình đang áp dụng (skillfx.js, tex-skillmark.js) | Proof màu sau linear: Wisp B2; client NOT RUN |
| 31 concept lính & boss | Concept ảnh lính/boss | PARTIAL | Lính thường và Siêu Linh Binh đã vào game (`gen/minion.js`, GLB lane.js); boss chỉ là preview | Cột "Trong game" của doc đã cũ (siêu lính ghi "chưa") |
| 32 todo Siêu Linh Binh | Siêu lính theo số trụ đổ | PARTIAL | Có code, chưa client: `superm` (gen/minion.js), `superPerTower` (lane.js, structures.yml) | 32:14-15: kiểm render/spawn/đo HP và ghi balance-log chưa làm |
| 33 todo Linh Binh 3D | Model, rig, clip, SFX lính | PARTIAL | Bước 1–7 [x]; `art/linh-binh/*.py`, lane.js | 33:29 "3/5/7 remain partly open" |
| 34 ma trận VO/SFX roster 27 | Kế hoạch phủ VO/SFX | NOT RUN | 34:102 "Tất cả gate hiện là NOT RUN" | 36 ô audio của 6 tướng slice chưa viết; 126 ô còn lại thuộc roadmap |
| 35 spec boss Thuồng Luồng | Spec tạm Call/Titan | BLOCKED | `objectives.yml` (provisional) | Chờ hội đồng cân bằng (35:68) và creator duyệt tên (35:70-71); ngoài Slice 1.5 |
| 36 todo Thuồng Luồng 3D | Model, rig boss | PARTIAL | `art/thuong-luong/build.py`; preview editor tại (−14,−14) trong x0z0.scene | Bản v3 (36:28-31) mở; chỉ có burst Slither/Idle trong engine |
| 37 skill Thuồng Luồng | Nối số tạm với clip boss | BLOCKED | `scripts/titan.js` có code nhưng chưa gắn vào đâu (orphan) | Chờ hội đồng; số trong doc là TẠM |
| 38 brief map mẫu | Brief map mẫu cho agent ngoài | BLOCKED | 38:3 "BRIEF, chưa dựng" | Chờ agent ngoài của creator làm map mẫu và gửi ảnh |

Nguồn evidence phụ: `reports/2026-10-08-playtest-codex.md`, `reports/wisp-{A,B,C}-2026-10-08.md`, `reports/evidence-2026-10-08/`, `balance-log.md` (mults.json chưa nhập runtime), `AUDIT-2026-10-07.md`, `JOURNAL.md`.

## 2. Gap docs (3)

### Gap 1: Đấu Máy (`thu_tran`) có thuộc Slice 1.5 không
- **File nên thắng:** 14 §B0.1 và schema §B0.9, sửa theo 15.
- Mâu thuẫn:
  - 14:26 `| \`thu_tran\` đấu máy | 1 + 2 bot vs 3 bot | **Khoá** ("cần bot AI, vòng sau") |`; 14:83 `mode: tai_hien | san_tap        # thu_tran khoá, không bao giờ được ghi`; 06:64 "`thu_tran` khoá".
  - 14:138 "`lobby.yml` hiện bật `thu_tran` (Đấu máy) vì bot đã được làm sau B0 theo yêu cầu creator; B0.1 viết "khoá" là bản cũ." Code `scripts/lib/data/lobby.yml`: `modes: [tai_hien, thu_tran, san_tap]`, `lockedModes: []`.
- **Creator cần chốt:** Slice 1.5 có Đấu Máy 1 người vs 1 bot không, và có cần thắng/thua thật không? Đề xuất: có, theo 15 (1v1, Tâm Mạch vỡ → thắng/thua thật). Code đã có (`bot.js`) và reconnect Đấu Máy PASS ở runtime 560 (14 P4).
- **Xong khi:** 14:26, 14:83 và 06:64 ghi đúng mode 1v1; 11 có gate Slice cho Đấu Máy (bot chơi tới khi Tâm Mạch vỡ); checkbox 15 cập nhật theo evidence.

### Gap 2: khung độ dài trận Mạch Giữa
- **File nên thắng:** 11 BAL-02S cùng 14 G2.
- Mâu thuẫn:
  - 13:59 "Tốc độ phá trụ đo được đưa vào `match.mjs`, chạy lại tới khi BAL-02 đạt ≥ 90% trận trong 20–35 phút, rồi mới chốt HP ở 08 §7.1."
  - 11:67 "BAL-02S | Slice | Trận Mạch Giữa (1 lane) kết thúc trong khung thời gian **TBD — chờ @lukasai duyệt (G2; đề xuất 12–20 phút, chưa duyệt)**".
- **Creator cần chốt:** khung thời gian cho trận Mạch Giữa 1 lane là bao nhiêu phút? Đề xuất: 12–20 phút (14:162, wisp-C P3). Số đo ca (a) Live run 2 cho thấy chỉ lính thì T1 đỏ cần 760.8 s và Tâm Mạch chưa tới ở phút 25 (14:178), nên HP hiện tại rất có thể phải hạ.
- **Xong khi:** 13:59 trỏ sang BAL-02S; 08 §7.1 có số chốt; balance-log có dòng mới; BAL-02S chuyển TBD-SIM → PASS/FAIL sau khi đo ca (b)/(c).

### Gap 3: Sân Tập có chọn cấp và có ghi `duels` không
- **File nên thắng:** 14 §B0.6 (14:20 ghi 14 thắng 13 trong phạm vi vòng này).
- Mâu thuẫn:
  - 13:32 "`duel` 1v1 và `skirmish` 2v2/3v3. Sân tập có nút chọn cấp 4/7/10/13 + vàng tương ứng để đấu đúng mốc mô phỏng"; §4 và §5 cần bảng SQL `duels`, 20 trận mỗi mốc cấp 7/13.
  - 14:53 "**Làm lại**: op `practice{action:'reset'}`. Trọng tài reset công trình, lính, tướng về cấp 1 nhưng vẫn ở `ingame`." Banner 13:8 chỉ thay "các mode `duel`/`skirmish`", không nhắc nút chọn cấp hay `duels`. Grep `scripts/`, `places/`: không có `duels` và không có bộ chọn cấp.
- **Creator cần chốt:** Slice 1.5 có cần nút chọn cấp 4/7/10/13 và bảng SQL `duels` để đo hai cặp Mộc Lẫm–Nham Vũ và Kha Tàn–Vân Dao không? Đề xuất: hoãn sang sau khi chốt G2. Ghi 13 §2 (dòng Mode), §4, §5 là `DEFERRED`, giữ Sân Tập reset về cấp 1 như 14:53, vì việc đo này cần 2 người thật (13 §5) mà NET-02 chưa chạy.
- **Xong khi:** 13 §2/§4/§5 có nhãn phạm vi rõ (Slice hoặc DEFERRED); nếu chọn Slice thì 14 §B0.6 có op chọn cấp và 11 có gate ghi `duels`.
