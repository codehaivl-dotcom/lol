# 105 · HERO FACTORY — Workflow đa sub-agent cho 26 tướng đã duyệt

**Trạng thái:** `OWNER_LOCK / CANONICAL_HERO_PRODUCTION_WORKFLOW / NOT_ENGINE_VERIFIED`
**Entry points:** [AGENTS.md](../../AGENTS.md) · [HANDOFF.md](../../HANDOFF.md) · [Documentation Router](README.md). All specialist documentation is routed here for 26-hero work; historical batch instructions are superseded, not deleted.
**Mục tiêu Owner:** toàn bộ 26/26 tướng trong `tools/sim/production-26-roster.json` được triển khai đầy đủ tới `PLAYABLE PASS`, không nghiên cứu lại roster, không giam việc thiết kế/Lab theo wave 5 tướng.
**Phạm vi:** design → lore/class/difficulty → kit → skill visual contract → mechanics/test → Balance Lab → audit độc lập → Owner sign-off → 3D/animation/VFX/SFX → playable QA.

## 0. Thẩm quyền — đừng viết lại luật đã có

| Tài liệu | Quy định nguồn phải kế thừa |
|---|---|
| 104 | Owner production scope, 26 tướng, IDs, Gate 0–8, các wave chỉ dành cho kế hoạch asset/tích hợp |
| 100, 102, 103, 96, 99 (đúng từng hero) | Fantasy, silhouette, core toy, originality, art approved; xem status concept từng nhân vật |
| 91 + 09 | **Q/W/E/R** là bốn skill, **D là universal dash**; `basic_attack` tách riêng. Runtime legacy `rmb` ánh xạ sang W; `lmb` thành basic attack; **không tự đổi input/gameplay** |
| 23 §1 A→J + §5.1 | Kit, mechanics, balance, VI/EN, portrait, 5 skill icons, 3D, weapon, animation/VFX, VO/SFX; bảy vai trò review có bằng chứng |
| 62 §1 | Mỗi hệ thống bàn giao cùng **luật, data, art/audio, mô hình, handoff, acceptance**; ba trục trạng thái thiết kế/ready/evidence tách riêng |
| 73 | Candidate tách runtime, baseline/duel/combo/team/tower/wave/jungle/boss, report có seed/revision, cờ/NOT_TESTED, Owner sign-off trước phát sinh chi phí model |
| 76 + 79 | Tám trường geometry mỗi skill; Ultimate có cấu trúc/pha/telegraph/impact riêng, không phải Q phóng to |
| 28 + 25; 30 + 56/78 | Quy trình animation có pose, HIT, rig, capture; VFX đúng hitbox và camera, kiểm từng slot |
| 42 + 11 + 34 | Manifest/provenance bắt buộc; bằng chứng build/seed/capture; VO/SFX và localization đúng event |
| 74/75 | Thư viện tạo hình và bài thử silhouette **tham khảo/kiểm tra**, không đè lên art được Owner khóa (đặc biệt Bộ Ngũ 103) |
| 93 | Tiêu chí fantasy/core toy/counterplay/Ultimate/khả thi dùng cho **audit chất lượng**, không tuyển chọn/cắt bỏ lại 26 tướng |

**Quy tắc xung đột:** chỉ thị Owner mới nhất, doc 91, 104 và bản concept đã duyệt thắng các ví dụ/roster lịch sử; docs 23, 28, 30 được sử dụng làm **checklist chuyên môn** nhưng mọi quy định lịch cũ kiểu 3/5/21/27 tướng, thứ tự làm đợt cũ, `LMB/RMB` làm input, chỉ là legacy. Đừng copy số hoặc skill legacy. Mọi thay đổi scope/hero fantasy, asset render có chi phí, Gate 4, bật tướng runtime đều yêu cầu quyền rõ ràng.

## 1. Đơn vị công việc: MỘT hero = MỘT Hero Production Packet

**Khóa định danh:** `researchId` từ registry + `runtimeId` dạng snake_case, không dùng display name làm khóa file/save. **Mẫu thư mục đề xuất mới** (chưa tự coi đã tồn tại):

`docs/co-linh-than-chien/production-heroes/<runtimeId>/`

- `00-source-lock.md`: exact concept refs/sections, owner approval, art refs, unchanged canon, scope, revision.
- `01-fantasy-lore-class.md`: 1 câu “Tôi pick vì…”, core toy, combat identity, class/role/lane, silhouette, loại body/locomotion, story hook và quan hệ thế giới, tên/epithet, VI/EN, 3 điều bắt buộc giữ.
- `02-player-experience.md`: basic loop 5–15 giây, skill floor/skill ceiling, độ dễ hiểu / khó thực hiện / khó tinh thông (ba trục riêng, giả định trước playtest), tutorial first 30s, dấu hiệu thất bại đọc được, counterplay từ góc nhìn đối thủ; tuyệt đối không tự gắn “1 sao newbie confirmed”.
- `03-gameplay-contract.md`: `basic_attack`, passive, Q/W/E/R, D universal không đổi; điều kiện kích hoạt/stack/reset/cleanse/interrupt, mục tiêu ưu tiên, quy tắc với tướng/lính/quái/trụ, tương tác bot, các ca edge, logic phase/state machine; gameplay owner chịu trách nhiệm.
- `04-skill-visual-contract.md`: per applicable basic/passive/Q/W/E/R: targeting, preview, telegraph, VFX material/shape/color/team visibility, geometry hit/collision, lifecycle, animation beats/HIT, SFX/VO event, icon, risk of occlusion, references/prompt visual brief. R theo template doc 79; artist chỉ vẽ **visual concept** trước Gate 4, chưa model/vfx final.
- `05-mechanics-coverage.md`: mỗi feature map tới `YAML field / simulator / runtime player / bot / tests`; nêu rõ `SUPPORTED`, `PARTIAL`, `NOT_TESTED`, `BLOCKED`. Comments trong YAML không phải implementation.
- `06-balance-evidence.md`: candidate YAML path, baseline roster/role peers, commands, exact seed/revision, summary duel theo phút, 1v2, team impact (utility của support/tank), combo, farm/tower/boss, RED/ORANGE, limitations và balance-log changes.
- `07-audit-record.md`: cả ba vòng audit, reviewer độc lập, defect IDs, before/after, links chính xác; không overwrite lịch sử lỗi.
- `08-asset-production.md`: model anatomy/height/capsule/LOD/material, weapon/grips, 3D/rig clip list, VFX/SFX/VO, portraits/icons, asset manifest, source/right/status, runtime import pointers.
- `09-engine-qa.md`: playable test player+bot, 1v1/5v5, match camera, aim/telegraph/hitbox, state interactions, UI, audio, fps/load, 2-client/replication nếu có, screenshot/video/log/commit, PASS/FAIL/BLOCKED.

Mỗi packet cần machine-readable status trong tracker riêng hoặc manifest tổng; một packet Markdown đầy đủ không đồng nghĩa tướng đã qua Gate.

## 2. Quy trình 10 chặng — 26 tướng chạy đồng thời tới điểm gate

### S0 — Producer / Source Lock (tất cả 26)
Input: production-26-roster.json, docs 100/102/103/104, refs nghệ thuật đã duyệt.
Output: exact ID, owner review, frozen core toy/visual must-keep, source versions, phân biệt APPROVED / APPROVED_WITH_REWRITE / SPIKE-BLOCKED.
**Fail:** trùng ID, thiếu concept source, tự sửa fantasy, tự loại tướng.

### S1 — Bốn sub-agent / một hero chạy SONG SONG (không khóa nhau bằng văn bản chung)
- **A — Lore/Class & Player Learning:** file 01 + 02, VI/EN naming/story/epithet, role, intended difficulty 3-axis, tutorial/readability; không quyết định số.
- **B — Gameplay Designer:** file 03, core toy loop + kit QWER/passive/basic, player agency, victim agency, rulebook phase/stack/counterplay; không tự nerf số.
- **C — Character & Skill Art Director:** silhouette, Battle Form (mythic vs battle nếu applicable), file 04 visual brief per skill including R, prompts/concept frame only; không được tự đổi hitbox/impact.
- **D — Mechanics Feasibility:** file 05 preliminary, khảo sát engine/sim/bot/schema/tooling, blocker/spike plan; không phát minh "supported" bằng comment.
Output S1 = các gói mang đúng source hash/revision để ghép, không bốn agent cùng sửa một file.

### S2 — Integrator / Spec Freeze + AUDIT LẦN 1 (Canon & Concept Integrity)
Ghép A–D, conflict matrix lore↔class↔fantasy↔core toy↔skill↔body↔geometry. Reviewer **không phải người viết** trả PASS hoặc DEFECT với bằng chứng:
- Người mới hiểu thắng/thua thế nào; có counterplay thật; khác hero cùng vai.
- Mọi skill có quyết định gameplay, không phải 4 chiêu damage generic.
- Phong cách class, anime/visual, weapon, R đúng fantasy đã duyệt; không dùng mythic art để thay Battle Form.
- Không phá input QWER/D, gameplay geometry, không fake simulator.
Defect về mô tả sửa tại S1; không tự cắt 26 hero.

### S3 — Mechanics Contract & Tests
Mechanics agent biến mọi ý tưởng thành schema đọc được và triển khai trong candidate-aware simulator; đối chiếu code runtime/player/bot. Kiểm edge cases, CC/cleanse/dash, movement, stacks, collateral, network. **Tập trung thiếu sót đã có:** trượng dài/ngắn Linh Hầu; Cuồng Nhịp Kael; vệt băng Liễu Tiễn; tích nhiệt Forge; hồi máu Jeli.
Feature chưa được hỗ trợ: bổ sung và có tests, hoặc `BLOCKED/NOT_TESTED`. **Không xóa core toy để dễ PASS.** Art/lore nhóm khác có thể chỉnh brief song song.

### S4 — Stats/Build & Candidate Data
Balance Designer viết `tools/sim/candidates/<id>.yml`, growth, stats, ability rank/timing, builds; kiểm schema/range/field coverage và role-specific economics. Đây là số `HYPOTHESIS`, không chép từ game khác, không đặt bảng số làm canon trước sign-off. Khi kit đã xác thực, mới ghi số; mỗi sửa có delta và balance-log.

### S5 — CHIẾN DỊCH LAB CHUNG 26/26
Chạy `bun tools/sim/production-26.mjs --dry-run` rồi `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1` trên máy có Bun. Khởi động các task hero độc lập, 4–6 worker nếu máy cho phép, không phải từng Wave.
- `MISSING_KIT / SIM_FAILED / INVALID_REPORT` không phải PASS.
- `FLAG_RED / FLAG_REVIEW` tạo ticket tự động cho balance+mechanics agent sửa và rerun; `SIM_FINISHED_REVIEW_REQUIRED` không phải Owner Gate 4.
- Nếu 40–60% duel không phù hợp vai Support/Tank, review đội hình/utility + matchup theo vai thay vì ép họ thành đấu sĩ.
- Không chỉ check tỉ lệ thắng: luôn combo burst, không chết quá nhanh, counterplay, pre/post item parity, NOT_TESTED coverage, replay/rng/seed.
- Lưu JSON/HTML/report/summary, sim version, commit; đủ 26 có attempt/evidence trước khi tuyên bố “Lab toàn roster complete”. Tướng NOT_TESTED phải có sidecar targeted validation.

### S6 — AUDIT LẦN 2 (Functional & Quantitative, độc lập)
Reviewer mới, không phải tác giả kit, đối chiếu gameplay contract với **execution thực sự**:
- Mỗi core toy được simulator/runtime harness thực thi chưa? Có assertion chứng minh? Skill visual storyboard đúng hit geometry chứ?
- Build scaling/timing, role matchups/utility, one-combo, 1v2, 5v5, exploit, edge-case; review FLAG/NOT_TESTED, không lấy 0 RED = PASS.
- Nếu sai: quay lại **đúng stage S3 hoặc S4**, tạo defect ID, sửa có giới hạn phạm vi rồi rerun. Không viết lại art/kit toàn bộ chỉ vì một con số.
- Handoff `AUDIT2_PASS` chỉ khi evidence đủ và công việc còn lại được định danh.

### S7 — AUDIT LẦN 3 (Independent Red-Team & Production Feasibility)
Một reviewer khác **không viết S1/S3/S4 và không phải reviewer S6** đọc packet hoàn chỉnh:
- Cặp skill/hero có trùng gameplay toy, nguồn gốc không dẫn đến clone? Gặp phải có đọc được? Script bot/AI có dùng? R telegraph và counterplay? Class/difficulty có được mô tả trung thực?
- Ảnh skill, VFX, animation, 3D/weapon/rig/battle form khả thi với pipeline thật? Tài nguyên/VRAM/credit? Model 3D sẽ bị bottleneck bởi mechanic chưa chốt?
- Tên/ID/source/locale/asset prompts nhất quán, không có mâu thuẫn ví dụ "Jeli heal" mà kit không có heal.
- Kiểm đủ A→J, 6 contract doc 62, so gate evidence; **không tự ký Gate 4**.
Outcome: `AUDIT3_PASS`, `BLOCKED` (reason, owner, reproduction), hoặc `NEEDS_OWNER_DECISION` (chỉ quyết định vượt thẩm quyền).

### S8 — GATE 4 OWNER SIGN-OFF và asset production
Owner chỉ cần một bảng 26 dòng: hero, exact version, original toy kept, learner difficulty assumption, kit+sim revision, red/orange/not-tested, audit1/2/3 outcomes, production risk, asset list và cost forecast. Ký theo hero (hoặc ký nhóm có định danh), không ký bằng lời chung chung.
Sau sign-off: dựng model/texture/rig, animation theo doc28/25, VFX doc30/76/79, audio/VO doc34, manifest doc42, icons/portrait, import Spawn runtime theo 104.

### S9 — Engine QA, Final Audit & PLAYABLE PASS
QA riêng (không phải implementer) kiểm camera, skill hit geometry/tell, bot, target/cancel/CC, movement, audio, HUD, 1v1, 5v5, performance, replication và build. Có evidence thực tế theo doc11. Fail mở defect đúng owner; PASS_ENGINE chỉ cho điều **đã chạy/quan sát được**. Owner xác nhận final activation và `PLAYABLE PASS`.

## 3. Quy ước điều phối đa agent

- **26 hero jobs song song**, nhưng chặn xung đột writes: mỗi hero packet có một Integrator/owner; các role agents ghi file riêng; chỉ Mechanics Maintainer sửa module dùng chung `tools/sim/*`, `scripts/lib/*`; Producer merge có kiểm tra.
- **Không có hai agent cùng sửa cùng file canonical** một lúc. Shared source engine thay đổi phải chạy regression panel và báo revision khiến các hero đang chờ phải revalidate.
- **Ba người audit độc lập:** Audit 1 = canon/experience; Audit 2 = mechanical and lab; Audit 3 = cross-disciplinary production red-team. Không cho tác giả tự ký PASS của mình.
- **Rerun targeted**, không reset vòng 1 khi chỉ sai stats; thay đổi core toy mới quay lại S1/S2 và phải có lý do.
- **ID & data contract:** 26 unique IDs từ registry; candidate chỉ ở `tools/sim/candidates/` trước Owner Gate 4; chưa copy vào `heroes.yml` hoặc bật trong `slice`/lobby.
- **Studio quality:** 1 source-of-truth per field; `PASS_MODEL`/technical tests/engine replay/actual game/Owner approval là các nhãn tách biệt; phải có link hoặc file evidence đúng revision.
- **Mỗi agent output**: changed files, exact input sources, acceptance checks, evidence links, unresolved risks, sub-agent signature/version. Không “hoàn tất 100%” chỉ vì file được tạo.
- **No render-credit waste:** Vẽ concept/skill sheets/proto trước sign-off được phép nếu không mở chi phí đáng kể; model final, texture generation, rigging batch chỉ sau Gate 4 và signed asset manifest.

## 4. Báo cáo điều hành duy nhất (không 26 báo cáo dài)

Producer xuất dashboard một dòng/hero:
`researchId | runtimeId | wave | source_sha | s1 | audit1 | mechanics_coverage | yaml | lab_revision | red | orange | not_tested | audit2 | audit3 | gate4_owner | 3d | anim | vfx_sfx | engine | playable | blockers`

Các bộ lọc: **MISSING_KIT, MECHANICS_BLOCKED, LAB_FLAGGED, READY_FOR_OWNER, ASSET_BUILDING, ENGINE_FAIL, PLAYABLE_PASS**.
KPI vận hành = số core toys thực sự implemented, số hero Lab evidence valid, số signed asset-ready và số PLAYABLE_PASS; tuyệt đối không dùng số concept pages làm KPI.

## 5. Nhận diện các giới hạn hiện tại khi mở chiến dịch

- Các file YAML Wave 1 đang có chưa mô phỏng đầy đủ core toy. Không đánh dấu audit2/3 PASS khi mới chỉ chạy sim.
- Registry và bộ điều phối 26 hero đã có ở `tools/sim/production-26-roster.json`, `tools/sim/production-26.mjs`. Chúng **không tự viết** 21 kit còn thiếu và **không thực hiện** đánh giá lore/visual.
- Số liệu giả lập và threshold trong `gates.yml` là proposal; đừng tự đổi thành approved. Creator có quyền final sign-off, agent chỉ report.
- Art được duyệt của Ngũ Thần Thoại trong `art-concepts/` giữ nguyên; Mythic Form cho tranh, Battle Form cho game; không tự đổi Phù Dong thành centaur.
- Workflow này kế thừa tiêu chuẩn các docs; **không thay các checklist A→J, rules 73, 76, 79, 91 hoặc master registry 104**.
