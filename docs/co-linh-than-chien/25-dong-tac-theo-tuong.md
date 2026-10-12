# 25 · Kế hoạch động tác theo vóc dáng, lớp và vũ khí

> **CURRENT ROUTING (2026-10-12):** Animation/body/weapon acceptance criteria here remain usable, but prior six/21/27-hero schedules and historical reports do not control today's work. All current 26-hero production tasks follow [105](105-hero-factory-multi-agent-workflow.md), [104](104-full-approved-roster-production-master-plan.md), and [91 QWER/D](91-khoa-input-qwer-d.md).

**Phạm vi:** 6 tướng playable hiện tại · 30 slot hoạt ảnh (LMB/Q/RMB/E/R) · chỉ thay lớp trình bày.

**Trạng thái:** `PLAN READY` · mapping clip đã có trong code · M1 smoke test và M3 code đã được báo cáo · **chưa nghiệm thu trong trận thật**.

Ngày 2026-10-07. Yêu cầu của @lukasai: “Hero chưa được rig animation phù hợp theo thể hình. class, skill, hầu hết là 1 động tác y hệt nhau”. File này chuẩn hóa gói việc, nguồn và bằng chứng; không mở production asset/code trong lượt viết docs.

## 0. Tiến độ mới nhất đã ghi nhận

Nguồn tiến độ: TODO và code ở `origin/main` tới commit `2065c0e` (2026-10-07). Đây là kết quả agent đã báo cáo trong repo, **không phải audit độc lập mới hoặc sign-off của hội đồng**.

| Hạng mục | Tiến độ được báo cáo | Trạng thái nghiệm thu theo hồ sơ này |
|---|---|---|
| M1 · thử 3 clip | Kha Tàn bổ qua, Mị Đăng đâm song dao và Nham Vũ kéo cung đã chạy trên model tướng, mỗi clip có dáng riêng. Cung Nham Vũ lệch khỏi tay ở một số khung. | `PARTIAL`: smoke test clip đã chạy; cung lệch tay chặn PASS kỹ thuật tới khi sửa/duyệt capture. Chưa chứng minh cả ba clip đúng slot/resolve trên model người chơi trong trận. |
| M2 · 30 slot | `skillfx.js` đã chuyển mapping sang 30 clip reference riêng. Đã xem 4/30: Mộc Lẫm R và Hỏa Tủy R được báo cáo đạt; Vân Dao Q khó đọc từ camera trận; Kha Tàn Q xoay khó hiểu, vũ khí chớp mất. 26 ô còn lại chưa xem. | `IN PROGRESS`: 4/30 có nhận xét, không đồng nghĩa 4 PASS của hội đồng; Kha Tàn Q cần làm lại/duyệt lại, Vân Dao Q cần tăng độ đọc bằng hoạt ảnh/pose, không tăng kích thước skill. |
| M3 · thân tướng người chơi | `hero.js` hiện có code đổi body local sang `BODY[hero]`, gắn grip theo hero và trả avatar khi rời trận; comment ghi giữ capsule. | `IMPLEMENTED · NOT VERIFIED`: chưa có trận Đấu Với Máy thật/capture chứng minh người chơi, bot, vũ khí và capsule chạy đúng cùng nhau. |
| M4 · locomotion | Idle/Walk/Run riêng theo vóc dáng. | `NOT RUN`; phụ thuộc model routing M3 được kiểm chứng. |
| M5 · capture tổng | Burst từng slot từ camera trận. | `NOT RUN` cho bộ 30; phải dùng camera/build ghi trong evidence. |

Các trạng thái `PASS` ở bảng này chỉ được ghi sau khi có capture, revision và chữ ký reviewer theo §4–5. Không xóa các phát hiện cũ khi có kết quả mới; thêm ngày/revision/evidence.

## 1. Quy tắc nguồn và hiện trạng đã đối chiếu

| Chủ đề | Nguồn chuẩn | Quy tắc áp dụng |
|---|---|---|
| Kỹ năng, loại ngắm, dash, windup/delay, hit, hiệu ứng | `scripts/lib/data/heroes.yml` — đúng ID playable | Hoạt ảnh chỉ diễn tả hành vi đang có; không đổi YAML, sát thương, tầm, hướng, hitbox, thời gian resolve, cooldown hay điều khiển. |
| Silhouette, anatomy, lớp, vũ khí và điểm nhấn văn hóa | [03 · Roster và tạo hình](03-danh-sach-tuong.md), bảng art direction hiện hành | Dùng đúng body plan và vũ khí; không biến Cổ Linh thành một nhóm humanoid đồng dạng. |
| Slot → clip, speed/duration/mask | `scripts/lib/skillfx.js` → `ANIM`, `skillAnim()` | Code sở hữu mapping hiện hành. Tên clip là CDN reference; không đồng nghĩa asset đã tải, đúng rig hay đúng hành động. |
| Model/fit ở sảnh | `scripts/lib/lobby-stage.js` → `BODY` | `BODY.<id>.h` là giới hạn fit của bục lobby (`layout.maxExtents.y`), **không phải chiều cao cơ thể canon hay rig dimension**. |
| Tay cầm, hand bone, pose vũ khí | `scripts/lib/data/weapons.yml`, generated `scripts/lib/data/grips.yml`, `scripts/lib/weapons.js` | Không sửa file generated bằng tay. Động tác phải giữ vũ khí trong đúng tay/socket và không đổi cách đánh. |
| Progress/grip của 6 tướng | [24 · TODO hoàn thiện 6 tướng](24-todo-hoan-thien-6-tuong.md) | Tách ảnh lobby/rig preview khỏi capture trận; dùng đúng kết luận `đã thấy`/`chưa kiểm tra`. |
| Camera và acceptance | [11 · Acceptance](11-acceptance-ban-giao.md), [27 · Map 5v5](27-handoff-map-5v5-ba-duong.md) §7 G4 | Ghi camera profile của build trong evidence. G4 còn mở thì capture chỉ tham khảo, không ký readability cuối. |
| Asset | `AGENTS.md` và asset API của world | Asset bytes không commit vào Git. CDN name/hash/receipt và revision phải có trong manifest; không đánh dấu có asset chỉ vì `ANIM` chứa URL. |

### Hiện trạng code

- `skillfx.js` hiện có 30 slot LMB/Q/RMB/E/R với tên reference riêng theo tướng/chiêu. 30 tên này thay báo cáo cũ “8 clip dùng chung”; chúng chưa tự chứng minh asset resolve thành clip đúng, đúng rig hoặc đúng hành động.
- `skillAnim()` trả clip, weight, speed, duration, loop (`-loop` trong tên), blend-in 0.08 và mask từ `Spine` trừ khi `full` được bật. Kiểm từng giá trị trong mapping đang dùng; không đặt lại timing gameplay theo chiều dài clip.
- `hero.js` và `bot.js` gọi hoạt ảnh theo slot trong combat. `heroes.yml` là nguồn thời điểm gameplay. Clip/root motion không được tự đẩy nhân vật, thay dash hoặc làm lệch thời điểm đòn trúng.
- Player-body routing theo hero hiện có trong `hero.js`, nhưng M3 chưa qua trận thật. Model/preview ở lobby không thay capture player và bot trong cùng match. Giữ capsule/hurtbox, target, range, movement và điều khiển.
- Idle/Walk/Run của sáu tướng hiện dùng chung bộ. Locomotion riêng là hạng mục sau khi body model/routing được nghiệm thu. Không nhân bản asset chỉ để đủ số nếu rig family và capture chưa chứng minh khác biệt cần thiết.

## 2. Bộ động tác: brief phải khớp kit đang chạy

Các ô dưới đây là **brief hoạt ảnh [PROPOSAL]** đối chiếu với kit hiện tại; không phải chỉ dẫn đổi skill. “BODY.h” là fit reference ở lobby, không phải chiều cao nhân vật. VFX/tell chỉ được căn theo thời điểm/hướng hiện có trong kit.

| Tướng / body plan / vũ khí | LMB + chất chuyển động | Q | RMB | E | R |
|---|---|---|---|---|---|
| **Mộc Lẫm** · đấu sĩ chống chịu; thân trụ vững, dao tay phải + khiên tay trái; BODY.h 2.15 | Chém cự ly gần; đòn thứ ba nhấn pose theo passive Ba Nhịp Đá, không thêm hit. | **Xuyên Bờ:** dash thẳng theo hướng ngắm, kết thúc tại lần trúng mục tiêu và đọc được root; **không ném/phóng dao**. | **Vai Núi:** đưa khiên che thân, cho thấy trạng thái tự nhận khiên; không diễn thành counter nếu kit không có. | **Vòng Lau:** quét vòng quanh thân trong khi vẫn được đi; không biến thành cú lao/khiên bash. | **Cắm Mạch:** dash tới mục tiêu, strike, rồi biểu đạt khiên vùng cho đồng minh. Không dùng root-motion jump thay dash. |
| **Kha Tàn** · đấu sĩ dồn; trường qua tay phải, nhịp nặng/có đà; BODY.h 2.20 | Quét cự ly gần, trọng tâm theo đường vũ khí. | **Liềm Rìu:** quét nửa vòng; phần rìa có điểm nhấn heal, không đổi vùng trúng. | **Chém Gân:** dash ngắn tới mục tiêu rồi chém; hậu pose gợi slow nhưng không kéo mục tiêu. | **Móc Kéo:** phóng móc/xích theo skillshot rồi biểu đạt kéo mục tiêu trúng; không đổi projectile. | **Nợ Cuối:** một nhịp execute gắn bleed stacks; không thêm vùng hay knockback. |
| **Mị Đăng** · sát thủ phép; thân thấp/gọn, hai dagger | LMB hiện hành là **melee 1,6m, đâm dao**, damage phép + hệ số AP0,15 theo `heroes.yml` ở373bff9e. Clip swing và impact cận chiến; không spawn projectile. Chỉ dẫn đạn phép trước đây là lịch sử. Chưa có nghiệm thu client mới trong lượt sửa docs này. | **Đèn Đi-Về:** phóng đèn ra rồi thu về; hai lần trúng phải đọc cùng hành trình đi–về. | **Trăng Rẽ:** dash tới mục tiêu rồi chém phép bằng song dao. | **Vẫy Gọi:** niệm skillshot mê hoặc; không tự diễn chuyển vị trí của Mị Đăng. | **Ba Bước Mờ:** ba nhịp dash/trúng tách được; ảnh mờ là VFX phụ, không thay bằng xoay tại chỗ. |
| **Hỏa Tủy** · pháp sư dồn; lõi phi nhân/lơ lửng, lư hương tay phải; BODY.h 2.00 là fit lobby, không phải chiều cao lõi | Đạn phép tầm xa; dao động lư hương ngắn làm điểm release, không giả vờ đánh cận chiến. | **Cột Lửa:** anticipation rõ trước vùng báo; giữ delay hiện có rồi mới release/hất tung. | **Dấu Than:** phóng projectile đánh dấu; không tự cho nổ tức thì—sát thương kế tiếp mới kích nổ. | **Khí Nóng:** xung quanh thân, pushback/slow; giữ nguyên tâm/radius. | **Than Rơi:** niệm/release vùng thiên thạch ở xa sau delay; không kéo tâm skill về chân caster. |
| **Nham Vũ** · xạ thủ; thợ săn mặt đất gọn, cung tay trái; BODY.h 1.75 là fit lobby, theo body plan doc03 | Bắn projectile cung; vòng kéo–nhả giữ đúng hand/grip cung. | **Quạt Đá:** một lần bắn ba tên hình quạt, không ba lần cast riêng. | **Kéo Hổ Phách:** kéo cung nạp/giữ theo windup hiện có rồi nhả phát xa. | **Chim Mở Lối:** nhảy/dash lùi; không gắn đòn đánh; giữ gỡ slow/root và buff, không đổi dash data. | **Lao Vách:** lùi theo dash hiện có rồi bắn một mũi xuyên; **không bắn lên trời**. |
| **Vân Dao** · hỗ trợ hồi phục; thân cao mảnh/khí, trượng chim tay phải; BODY.h 1.85 là fit lobby, không phải chiều cao canon | LMB projectile phép tầm xa; trượng dẫn release, không đánh cận chiến. | **Mây Tụ:** nhắm vùng; release thể hiện damage địch và heal đồng minh/self theo kit; chuyển động phải đọc được từ camera trận. | **Ấn Gió:** phóng skillshot và kết thúc bằng tell/root; không đẩy lùi ở skill này. | **Áo Bão:** dựng khiên/gió hướng ra ngoài; thể hiện buff/cleanse và pushback gần, không thêm dây chuyển sát thương. | **Gió Đẩy:** sóng gió tỏa từ thân, biểu đạt pushback và heal vùng, không tạo cơ chế “gọi giông” mới. |

### Clip references cần kiểm lại với kit và capture

Đây là các rủi ro cụ thể giữa `ANIM` hiện tại, `heroes.yml` và kết quả capture đã báo cáo. Không tự sửa code theo bảng này; reviewer quyết định giữ/thay sau khi xem clip trên rig đích.

| Slot | Reference/kết quả hiện tại | Việc hội đồng phải xác nhận |
|---|---|---|
| Mộc Lẫm Q | `sword-and-shield-forward-blade-throw`; kit là dash/đâm thẳng và root. | Thay/giữ chỉ khi capture đọc ra dash-thrust/root; tuyệt đối không phóng vũ khí. |
| Mộc Lẫm E | `sword-and-shield-shield-bash-lunge`; kit là quét vòng trong lúc còn đi. | Hoạt ảnh phải đọc là sweep khi di chuyển, không thêm lunge/bash. |
| Mộc Lẫm R | `sword-and-shield-jump-attack-downward-slam`; báo cáo hiện tại đánh giá clip R đạt. | Giữ PASS có điều kiện chỉ khi jump không thay dash/capsule và pose shield-area sau hit vẫn đọc được. |
| Kha Tàn Q | `heavy-polearm-full-spin-sweep`; capture được báo cáo: dáng xoay khó hiểu, qua chớp mất trong vài khung. | Làm lại/duyệt lại clip; kiểm grip, occlusion và vùng sweep theo kit. |
| Kha Tàn R | `heavy-polearm-overhead-slam`; kit là execute theo bleed/reset, không có knockback/vùng. | Chỉ giữ nếu đọc là một đòn kết liễu; không thêm slam/knockback như gameplay. |
| Mị Đăng R | `assassin-spinning-dagger-flurry`; kit có ba dash/hit và untargetable theo data. | Ba beat chuyển vị trí phải thấy rõ; spin đứng yên không đạt. |
| Hỏa Tủy R | `mage-arms-wide-great-incantation`; báo cáo hiện tại đánh giá clip R đạt. | Capture phải cho thấy niệm vùng xa/meteor tell theo skill, không dời tâm về caster. |
| Nham Vũ LMB/R | `archer-draw-bow-and-shoot`, `archer-shoot-arrow-into-sky`; M1 báo cung lệnh/pose lệch tay. | LMB/RMB/R phải dùng đúng tay-cung và projectile; R là backstep rồi bắn xuyên theo ngắm, không bắn trời. |
| Vân Dao Q | `graceful-staff-twirl-summon`; capture được báo cáo: chuyển động nhỏ, khó đọc từ camera trận. | Tăng biên độ/pose trên thân, không thay radius, timing hoặc thêm hiệu ứng gameplay. |

Các reference còn lại cũng phải được kiểm theo chuẩn này: tên slug không chứng minh clip đúng. Nếu slug được dùng làm generation prompt, technical animator ghi `accept / replace / split phase` và bằng chứng; slug không phải canon.

### Hợp đồng animation/VFX cho slot tướng candidate

Mục này dùng khi doc 23 mở gói cho 21 tướng chưa bật; nó không thay 30 motion brief và TODO nghiệm thu sáu tướng ở trên. Bắt đầu từ kit Cổ Linh mới trong `scripts/lib/data/heroes.yml` đã được owner duyệt sau mô phỏng và body/weapon brief ở doc 03. Data game cũ chỉ là tham khảo, không dùng số, điều kiện, thứ tự hit, duration, target rule hay effect làm behavior đích.

Mỗi slot áp dụng (passive nếu có, LMB, Q, RMB, E, R) cần một row có: hero ID/slot; kit revision và source field; pose/body/weapon intent; clip ref/rig revision; gameplay trigger hoặc event đã được runtime owner xác nhận; VFX shape/material/palette, origin/socket, world/team visibility, lifetime và cleanup; trạng thái/asset ref; capture path, reviewer và issue. Giữ tên animation/VFX trong cột proposal cho đến khi người phụ trách duyệt; không ghi chúng như clip/event runtime đã tồn tại.

- Chỉ diễn các pha có thật trong kit/runtime đã duyệt. Anticipation, release, travel, hit/resolve, recovery, loop, cancel, recast và expiry là các pha riêng; nếu source không có pha hoặc event thì ghi `BLOCKED/NOT SPECIFIED`, không suy ra từ tên skill, clip, delay hay prototype.
- `bot` aim/dodge metadata không chứng minh người chơi thấy telegraph. Nêu riêng tell có/không, phe nhìn thấy, hình dạng, thời gian đọc và điều kiện dọn theo kit mới hoặc quyết định gameplay đã ký. Thiếu quyết định thì không khóa player-facing tell.
- Không bịa frame hit, socket, rig, scale, lifetime hoặc event/API. Giữ timing gameplay, dash/movement, camera, collider/hitbox, range và target logic nguyên vẹn; animation root motion chỉ theo policy đã được duyệt.
- Chỉ đánh `approved` khi kit/runtime owner, character/rig, animation/VFX, camera/readability và QA có đúng revision, asset receipt/hash cùng capture trong trận. Concept/preview hoặc clip có tên đúng không phải nghiệm thu.

## 3. Gói production khi owner mở việc

Mỗi slot hoạt ảnh/VFX phải có manifest row với các trường:

`hero_id`, `slot`, `kit_source_revision`, `kit_field_path`, `body_model_asset_id/ref`, `rig_revision`, `clip_ref`, `clip_asset_hash_or_CDN_receipt`, `pose_intent`, `weapon_hand/socket`, `loop_or_once`, `speed`, `duration`, `blend/mask/full`, `root_motion_policy`, `gameplay_trigger_ref`, `vfx_ref/hash_or_CDN_receipt`, `vfx_origin/socket`, `vfx_visibility`, `vfx_lifecycle_cleanup`, `telegraph_owner/status`, `camera_profile`, `capture_path`, `reviewer`, `status`, `issue_ref`.

Điền `speed/duration/blend/mask/full` từ mapping thực đã review; không phát minh trị số mới. Asset chưa có receipt/hash hoặc capture chưa cho thấy clip resolve trên model đích thì `BLOCKED`. Lưu burst từ anticipation qua resolve tới recovery, ghi frame resolve theo dữ liệu gameplay; không chỉnh timing kit để khớp animation.

Deliverables: (1) inventory 30 mapping; (2) đóng issue M1 gồm alignment cung; (3) review/revise đủ 30 clip; (4) xác minh body-routing M3 trên trận thật; (5) locomotion review sau M3; (6) 30 slot captures + 6 hero locomotion captures; (7) manifest, issue list, sign-off. Không mở batch sản xuất clip mới khi proof-of-pipeline/rig còn lỗi.

### Hội đồng đa chức danh và quyền ký

Vai trò dưới đây là hội đồng review; điền người thật/revision khi thực hiện. Hội đồng ký tính đúng chuyên môn và evidence, không tự bật skill/tướng hoặc đổi scope. Chủ dự án giữ cổng cuối.

| Vai trò | Phần review / bằng chứng ký | Reviewer · trạng thái · evidence |
|---|---|---|
| Gameplay / kit owner | 30 motion briefs khớp `heroes.yml`; các mismatch §2 được giải quyết; không đổi kit, time, hitbox hay điều khiển. | `________ · PASS/BLOCKED · ref: ________` |
| Character art / animation director | Chuyển động phân biệt thân trụ, nặng đà, thấp nhanh, lõi phi nhân, cung thủ và support; không làm mọi hero thành cùng pose humanoid. | `________ · PASS/BLOCKED · ref: ________` |
| Rig / technical animation | Rig/retarget, pivot, forward axis, clip loop/blend/mask, weapon sockets/grip, root-motion policy, CDN asset identity. | `________ · PASS/BLOCKED · ref: ________` |
| Combat camera / readability | Đánh thường, anticipation, release, resolve, recovery, projectile và tell đọc được qua camera build đã ghi; trước khi đóng G4 chỉ review sơ bộ. | `________ · PASS/BLOCKED · ref: ________` |
| Runtime integration | `skillAnim()` routing; player/body/bot đồng nhất; capsule preservation; no fallback/bind pose. Thay đổi code cần task/ủy quyền riêng. | `________ · PASS/BLOCKED · ref: ________` |
| QA / data provenance | 30 asset refs ↔ manifest/hash ↔ kit revision ↔ capture; đủ 6×5 slot, bot/player đồng nhất sau match test; asset không nằm trong Git tree. | `________ · PASS/BLOCKED · ref: ________` |
| Creator / scope owner | Duyệt hướng art và mở bước tiếp; nghiệm thu cuối, tách biệt với reviewer chuyên môn. | `________ · PASS/BLOCKED · ref: ________` |

## 4. TODO production và điều kiện đóng

| ID | Việc | Trạng thái theo evidence hiện có | Điều kiện PASS; thiếu thì giữ PARTIAL/BLOCKED |
|---|---|---|---|
| M1 · Proof of pipeline | Smoke test 3 clip đã báo cáo chạy; cung Nham Vũ lệch tay ở một số khung. | Clip resolve trên rig đúng; pose/weapon không vỡ; action đọc đúng skill; capture trước/cast/resolve/recovery; hash/receipt/config. Lobby/preview PASS không đồng nghĩa match PASS. |
| M2 · 30 slot | 30 refs trong code; 4/30 đã có nhận xét, 26 chưa xem. | Đủ 30 manifest rows và capture; clip đọc đúng kit, không fallback/flicker; sửa Kha Tàn Q và Vân Dao Q; art/kit/tech reviewers ký. |
| M3 · Body người chơi | Code route trong `hero.js` đã có; test Đấu Với Máy thật chưa chạy. | Match capture chứng minh player và bot dùng body/weapon đúng hero, avatar được phục hồi sau trận, capsule/target/range/movement không đổi. Không đánh dấu PASS bằng lobby `BODY`. |
| M4 · Locomotion | Chưa làm. | Sau M3: capture Idle/Walk/Run/turn/stop theo body/rig family; cadence/pose đúng brief, tốc độ/điều khiển không đổi. Không cần nhân bản clip nếu cùng rig/capture chứng minh dùng chung phù hợp. |
| M5 · Combat evidence | Chưa có burst nghiệm thu đủ bộ. | Capture toàn bộ 6×5 slot cùng hero ID, slot, build/data revision, camera profile, clip ref, phase resolve; nhìn được phe/tell/target/UI; ghi PASS/BLOCKED và reviewer. |

**Simulator/balance:** chỉ đổi animation/reference không cần chạy simulator vì kit/stat không đổi. Nếu thay đổi animation dẫn tới yêu cầu đổi mechanics/timing, dừng và mở scope gameplay riêng theo [23 · Giao việc 21 tướng](23-giao-viec-21-tuong.md); dùng simulator theo doc 04, lưu report/change log. Không lén gộp thay đổi gameplay vào M1–M5.

## 5. Ranh giới task

- Sáu tướng playable: hồ sơ/kit hiện có; task này hoàn thiện mapping, rig và evidence. Không đổi `heroes.yml`, balance, collider, controls, camera hay gameplay.
- 21 tướng chưa bật: theo [23 · Giao việc 21 tướng](23-giao-viec-21-tuong.md); animation/body/weapon/VFX phải theo kit riêng đã duyệt. Không dùng bảng này làm bằng chứng 21 tướng đã xong.
- Không tạo thêm ảnh, clip, model, audio, code hoặc runtime integration trong công việc docs này. Bất cứ mismatch code nào trong §2 phải được giao cho agent triển khai bằng task riêng; hồ sơ này không sửa code.


## 2026-10-07 · sửa lỗi "sảnh tướng animation vẫn không đổi"
- Nguyên nhân: 30 clip đều dài ~4 s, động tác thật nằm ở 0.4–3.6 s; game chỉ chạy ~1 s đầu (tư thế chuẩn bị) nên nhìn như không đổi.
- Sửa: bảng WIN trong skillfx.js (đo từ xoay xương, 12–88% chuyển động); mỗi clip seek tới đầu động tác (time + timeAt) và nén tốc độ cho vừa nhịp skill (tối đa 3.2x). Sảnh: diễn trọn động tác trong ~2.3 s.
- Thay 2 clip gần như đứng yên: Vân Dao E → van-dao-staff-raise-overhead-protective-ward, Nham Vũ Q → archer-quickly-shoot-three-arrows-in-a-row.
- Sảnh: tướng bước lên đài diễn chiêu cuối (R) của mình thay cho động tác chào chung.
- Đã kiểm (helper render): Kha Tàn R, Vân Dao E chuyển động rõ. Chưa kiểm trong trận thật.

## 2026-10-08 · AUDIT động tác 30 chiêu (đo trên file clip) + TODO

**LỊCH SỬ:** phần này ghi kit/đường module ngày08/10. Mị Đăng LMB búng đạn đã bị melee đâm dao1,6m ở373bff9e thay thế; dùng bảng hiện hành §2 và doc64. Không giao agent thực hiện lại clip búng tia từ bảng lịch sử dưới đây.

Yêu cầu @lukasai: “mỗi skill cần animation khác nhau. Ví dụ. Đâm lao., nhảy chém. phi thân. Giật lùi khi bắn cung..... Còn tùy vào skill và nhân vật + class..”

### Phát hiện (đo xương Hips của 30 clip, tools: /tmp python đọc GLB)
- **Không clip nào di chuyển thân thật.** Hips nâng tối đa 0.28 m, tiến/lùi tối đa 0.23 m. "jump-attack" chỉ nhún 0.21 m, "backward-leap-dodge" lùi 0.05 m. ⇒ mọi chiêu là *đứng tại chỗ vung tay*: đây là lý do nhìn "1 động tác y hệt nhau".
- 24/30 slot bị mask từ Spine ⇒ chân luôn chạy theo dáng đi/đứng, chỉ thân trên khác.
- Clip sai nghĩa so với kit: Mộc Lẫm Q (ném kiếm ≠ lao đâm), Mộc Lẫm E (húc khiên ≠ quét vòng), Mị Đăng LMB (chém dao ≠ đạn phép), Nham Vũ R (bắn lên trời ≠ lùi rồi bắn xuyên).

### Giải pháp
1. **Lớp chuyển động thân (motion layer)**: kênh mixer `motion` ghi thẳng vị trí/xoay Hips theo khung hình mình thiết kế: nhảy, lao, giật lùi, xoay người, bay lên. Chạy song song với clip tay (gesture). Đã thử: Hips track nâng thân 0.67 m rõ ràng trên model Mộc Lẫm.
2. Thay 4 clip sai nghĩa.
3. Mỗi chiêu một động từ thân riêng (bảng dưới).

| Tướng | LMB | Q | RMB | E | R |
|---|---|---|---|---|---|
| Mộc Lẫm (đỡ đòn, kiếm+khiên, đứng vững) | bước chém | **đâm lao** thấp người lao tới | trụ khiên, hạ trọng tâm | **xoay vòng** quét 360° | **nhảy chém** bổ xuống |
| Kha Tàn (trường qua nặng, có đà) | bước quét | xoay người quét, hạ thấp | **đâm lao** dài | ném móc rồi **giật kéo** về | **nhảy chém** cao, nện mạnh |
| Mị Đăng (sát thủ thấp, nhanh) | búng tay phóng đốm | vặn người phóng đèn | **phi thân** lướt vòng cung | ngả người vẫy gọi | **3 lần phi thân** + xoay |
| Hỏa Tủy (lõi lửa lơ lửng) | búng nhẹ, nhấp lên | bay lên rồi nện xuống gọi cột | lấy đà ném cầu lửa | lùi lấy đà rồi đẩy | **bay lên cao** niệm chú |
| Nham Vũ (xạ thủ gọn) | **giật lùi** nhẹ mỗi phát | 3 nhịp giật lùi | hạ người kéo căng, giật lùi mạnh | **bật lùi** nhảy | lùi bước rồi giật lùi mạnh |
| Vân Dao (hỗ trợ mềm) | nghiêng phẩy trượng | kiễng chân **xoay** gọi mây | bước đẩy tay | nhấc người dựng khiên gió | thu người rồi bung lên |

### TODO
- [x] T1 kênh `motion` + bảng MOTION trong skillfx.js (`skillMotion()`)
- [x] T2 gắn vào hero.js, bot.js, camera.js (sảnh)
- [x] T3 4 clip mới: đo, bỏ nếu đứng yên
- [ ] T4 capture từng tướng trên bục sảnh (burst) — tự kiểm
- [ ] T5 audit sau khi xong: ghi PASS/chưa đạt từng ô

### Audit sau khi làm (2026-10-08)
- T1–T3 xong: `skillMotion()` + bảng MOVE (30 ô), gọi ở hero.js/bot.js (mọi chiêu + đánh thường) và camera.js (sảnh: vào sân + demo chiêu). 4 clip sai nghĩa đã thay: Mộc Lẫm Q đâm lao, Mộc Lẫm E chém xoay, Mị Đăng LMB búng tia, Nham Vũ R lùi bước bắn mạnh.
- T4 tự kiểm (burst trên thân có behavior, helper CPU): Mộc Lẫm Q lao tới thấp người ✔, Kha Tàn R bật cao ~1.3 m rồi nện ✔, Nham Vũ E bật lùi ✔, Mị Đăng R lướt ✔. Các ô còn lại CHƯA chụp riêng.
- Lưu ý kỹ thuật: kênh raw-track chỉ chạy khi ghi từ behavior của chính vật thể (ghi từ run_script bị bỏ qua) — hero/bot/camera đều ghi từ behavior của chính mình.
- Chưa test: trong trận thật, góc camera khóa; chưa có nghiệm thu của chủ dự án.

## 2026-10-08 · Làm lại bằng Blender (phản hồi: "chỉ là dịch chuyển a→b, người vẫn thẳng và cứng")
- Lớp "motion" cũ chỉ đẩy xương Hips → bỏ. skillMotion() trả null khi tướng có clip mới.
- 30 động tác keyframe toàn thân trong Blender trên đúng rig từng tướng: IK chân (gối khuỵu, bước), cột sống gập/xoắn, hông hạ/nâng/xoay cả vòng, IK tay theo vũ khí. Ngón tay không key (giữ grip).
- Nguồn: art/anim/rig.py (bộ IK), art/anim/moves.py (30 động tác), art/anim/build_hero.py (bake + ảnh proof + xuất). Clip: scripts/lib/data/skill-clips.yml.
- skillAnim: blend override toàn thân; trận đấu tốc độ khớp nhịp skill (0.8–1.6x); lobby 0.8x.
- Đã kiểm: ảnh proof Blender 6 tướng × 5 slot; chạy trong engine trên thân tướng thật (máy CPU phụ). Chưa kiểm: trên màn hình creator, trong trận thật.

## 2026-10-08 · Động tác chết (6 tướng)

Trước: `die()` (hero.js, bot.js) phát tiếng + mảnh vỡ rồi `visible=false` ngay: tướng biến mất, không ngã.
Nay mỗi tướng có một clip chết riêng, key trong Blender trên rig của chính tướng đó (`art/anim/moves.py` bảng `DEATH`,
bake bằng `art/anim/build_hero.py <hero> death`, proof `/workspace/anim/<hero>_death_sheet.png`).

| Tướng | Dài | Chạm đất | Động tác |
|---|---|---|---|
| Mộc Lẫm | 1.6 s | 1.2 s | gối phải khuỵu, mép khiên cắm xuống chống, rồi đổ nghiêng sang phía khiên |
| Kha Tàn | 1.7 s | 1.15 s | trúng đòn ngửa người ra sau, trường qua văng rộng, rồi sức nặng kéo đổ sập **úp** xuống |
| Mị Đăng | 1.5 s | 1.1 s | xoay nửa vòng, gục nhẹ nghiêng xuống |
| Hỏa Tủy | 1.6 s | 0.95 s | lõi lửa sụp: co người, quỳ hai gối, gục đầu |
| Nham Vũ | 1.5 s | 1.1 s | cung tuột tay (tay trái buông xuôi), ngã sấp |
| Vân Dao | 1.7 s | 0.95 s | quỵ mềm, trượng chống, rồi nghiêng xuống |

- Kha Tàn: brief là "ngã ngửa". Đuôi của Kha Tàn được skin theo Hips, nên khi nằm ngửa thì đuôi xuyên sàn (đo được
  dưới −0.1 m). Vì vậy đổi thành "ngửa ra sau rồi đổ sập úp xuống": vẫn nặng, không xuyên sàn. Nếu creator muốn nằm ngửa
  thật thì cần thêm xương đuôi vào rig (rig.py), không chỉnh bằng pose được.
- Sàn: build_hero.py lấy mẫu mesh đã deform ở mọi key và nâng hips ở những key bị lún. Điểm thấp nhất giữa các key
  là −0.003…−0.011 m (≈1 cm, che bởi cỏ/đổ bóng); ở khung cuối thì ≥ −0.001 m.
- Vũ khí: gắn vào xương tay trong game (armBody), nên luôn theo tay. Proof chỉ render thân, không render vũ khí.
- Registry: `skill-clips.yml` thêm key `death: [clip, giây, giây chạm đất]`. skillfx.js chỉ tra theo slot nên không
  bao giờ đọc key `death`. audit.py kiểm death (có fall, 1.4–1.8 s, chạm đất < dài, khớp yml) và `--write` vẫn giữ dòng death.
- Phát: `scripts/lib/death.js` `deathAnim(hero, now)` trả row cho kênh `gesture` (weight 4, `blend: 'override'`,
  `loop: 'once'`, không có duration nên giữ khung cuối) + `hideMs` = dài clip + 600 ms. hero.js/bot.js gọi khi chết,
  ẩn thân sau `hideMs`, xoá kênh khi hồi sinh (patch do Savi nối). Thời gian hồi sinh, phần thưởng và hitbox không đổi;
  thân đã `dead` nên không bị chọn làm mục tiêu trong lúc ngã.
