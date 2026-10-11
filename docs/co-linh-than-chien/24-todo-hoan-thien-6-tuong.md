# 24 · TODO: hoàn thiện 6 tướng hiện tại
Ngày 2026-10-07. @lukasai: "trong time đó bạn làm hoàn thiện 6 tướng hiện tại trước. Tôi đang cho agent làm hud/map/tướng".
Phạm vi của Savi: skillfx.js, hero.js (phần chiêu/đánh), bot.js, combat.js, weapons/grips của 6 tướng. **Không đụng** ui.js, lobby-ui.js, map.yml, terrain.js, cells (agent đang làm).

## TODO
- [~] T1. Chụp từng chiêu (cast/fly/land/hit) + đánh thường của 6 tướng trên đường giữa, ghi kết quả từng ô
- [~] T2. Sửa chiêu nào che thân tướng, quá mờ, quá chói, hoặc rơi về hiệu ứng mặc định
- [x] T3. Skillshot có mũi tên chỉ hướng (Mộc Lẫm Q, Hỏa Tủy chuột phải, Nham Vũ ... theo aim: skillshot) (evidence: doc 20 §4, Codex fef61c6 Mị Đăng Q match26/round42 — PASS có giới hạn)
- [~] T4. Vòng báo trước: màu theo góc nhìn (đồng minh xanh / địch đỏ) thay vì theo phe (có code: scripts/lib/combat.js `watchTele`; client NOT RUN)
- [~] T5. Tay cầm vũ khí 6 tướng: chụp cận tay ở lobby và trong trận (#4821)
- [~] T6. Trận 1v1 với máy thật: mỗi tướng đánh được, bot dùng chiêu, có thắng/thua (có code: scripts/bot.js, places/main/sim.js; client NOT RUN — chỉ có 14 P4 Đấu Máy reconnect runtime 560, chưa có trận tới thắng/thua)
- [~] T7. Audit: cập nhật doc 20/21, ghi những gì đã thấy tận mắt và những gì chưa (2026-10-08: checkbox 20 §3 và 21 B5 đã khớp code/evidence theo `reports/doc-status-2026-10-08.md`; ảnh từng chiêu 6 tướng chưa đủ)

## Chờ làm sau (đã chốt, chưa làm)
- [ ] V1. Phim lore mở đầu (~40 s): tranh vẽ, camera chuyển động, lồng tiếng, nhạc. @lukasai 2026-10-07: "chính xác làm 1 lần đầu tiên. ghi vào todo chưa làm vội"
  - Hồ sơ production có kịch bản VI + subtitle EN, storyboard, cue manifest, tích hợp và nghiệm thu: [26 · Hồ sơ phim lore](26-video-lore-intro.md). Trạng thái: production plan ready, script proposal, chưa duyệt sản xuất.
  - chỉ chiếu ở **lần vào đầu tiên** (đánh dấu trong player.state), có nút Bỏ qua
  - xem lại được ở mục Lore trong lobby
  - cuối phim: "Chào [tên Spawn]" + nút Bắt đầu → vào lobby. Không có ô đặt tên riêng của game, vì Spawn đã đăng nhập sẵn và có tên người chơi.
  - lưu ý: phim không được làm chậm lúc vào game; tải phim sau khi người chơi đã vào

### Đợt 1 (2026-10-07)
- **T1.** Bàn thử `scripts/dev-fxbench.js` (chỉ dùng khi dev, game không tự tạo) phát toàn bộ chiêu của một tướng trên đường giữa. Đã chạy Mộc Lẫm, Hỏa Tủy, Nham Vũ; không chiêu nào của 6 tướng báo lỗi khi gọi.
- **Thấy tận mắt:** nhìn từ góc camera trận, các hạt hiệu ứng chỉ là chấm sáng nhỏ, không cho biết chiêu trúng vùng nào. Đây là lý do "skill không nhìn rõ".
- **T2 (đã sửa phần chính):** `skillfx.js` thêm **hình chính** cho mọi chiêu (theo B1.1):
  - chiêu vùng hoặc quanh mình: vòng đúng bán kính trong heroes.yml, màu riêng của tướng, viền tối để nổi trên mọi nền, đĩa sáng co lại, mất sau 0,45 s
  - skillshot: dải trên mặt đất đúng bề rộng hitbox dọc đường đạn bay
  - chiêu chọn mục tiêu: vòng nhỏ dưới chân mục tiêu
  - lúc niệm (Q/RMB/E/R): vòng nhỏ dưới chân người niệm
  - màu: Mộc Lẫm ngọc lục, Kha Tàn đỏ sắt, Mị Đăng tím, Hỏa Tủy cam, Nham Vũ hổ phách, Vân Dao lam
  - Đã chụp Hỏa Tủy, Mộc Lẫm, Nham Vũ, Vân Dao: hình rõ trên nền gạch và nền đất. Đã xem thêm Kha Tàn và Mị Đăng: ban đầu màu bị chói thành hồng nhạt, nên đã giảm độ phát sáng (vòng 2,4→1,2, dải 1,8→0,9). Sau khi giảm, chụp lại Mị Đăng thì thấy ra tím; Kha Tàn chưa chụp lại.
- **T3.** Khi ngắm skillshot, cuối tầm có đầu mũi tên phẳng (`hero.js` drawAim). Đã chụp riêng hình mũi tên; **chưa chụp lúc ngắm thật trong trận**.
- Còn lại: T4 (màu vòng báo trước theo người xem), T5 (tay cầm vũ khí), T6 (trận 1v1 thật), phần còn lại của T2 (khói che thân tướng, B1.6).


### Đợt 2 (2026-10-07)
- **T1 sửa trạng thái:** chưa chụp đủ từng chiêu của cả 6 tướng (mới có Mộc Lẫm, Hỏa Tủy, Nham Vũ, Vân Dao, Mị Đăng; Kha Tàn chưa chụp lại sau khi giảm sáng) → để [~].
- **T4:** vòng báo trước chuyển sang cách mới: `combat.telegraph` tạo một mốc gắn thẻ `tele` (vị trí, bán kính, thời gian, phe người niệm); mỗi máy tự vẽ vòng của mình (`watchTele` trong hero.js). Thử 2 mốc (một phe mình, một phe địch) trên máy thử: máy đó vẽ đúng 2 bộ vòng, một **đỏ**, một **xanh**, chỉ máy đó thấy. **Chưa chụp trong trận thật**, chưa thử người xem ở cả hai phe cùng lúc.
- **T5:** chụp cả 6 tướng ở sảnh (toàn thân và nửa người). Ở độ phân giải này: Mộc Lẫm đao trong tay phải, khiên tay trái; Kha Tàn qua dựng sát tay; Hỏa Tủy và Vân Dao giơ gậy lên theo động tác; Nham Vũ cung tay trái. Ảnh chưa đủ nét để nói ngón tay có nắm quanh cán hay không → cần chụp cận tay rõ hơn, và chụp trong trận.
- **T5 (tiếp):** dựng 6 tướng (model riêng của tướng, động tác Idle, tay nắm theo grips.yml, giống thân của bot) và chụp cận ở 1,5 m. Thấy tận mắt: Mộc Lẫm đao nằm trong nắm tay, chuôi ở nắm, khiên ở cẳng tay trái; Kha Tàn qua dựng trong tay phải; Mị Đăng mỗi tay một dao găm, nắm quanh chuôi; Hỏa Tủy gậy trong tay phải, ngón quấn quanh cán; Nham Vũ cung trong tay trái; Vân Dao gậy trong tay phải. **Không thấy tay dính vào vũ khí** ở rig này.
  - **Cập nhật routing:** kết quả thử rig `hand_r…` trước đây không chứng minh grip ở trận người chơi. Tới commit `2065c0e`, `hero.js` đã có code đổi player sang model/grip theo hero và khôi phục avatar sau trận; **chưa có capture Đấu Với Máy thật** để xác minh model, grip và capsule. T5 vẫn `[~]`; theo dõi M3/M5 ở [25 · Kế hoạch động tác theo tướng](25-dong-tac-theo-tuong.md).

### Đợt 3 (2026-10-08) — QA tận mắt 30 ô + thân trong trận
**Nguồn ảnh:** bench `scripts/dev-fxbench.js` + `scripts/dev-bodybench.js` (live-only, tag `temp`, đã dọn: `query temp = 0`), camera góc trận cao 12–14 m nghiêng ~56° nhìn đường giữa (x −28…−18, z 28), burst 5–6 khung/1,33 s. **Mọi ảnh từ CPU helper của wisp (không chạy player scripts), KHÔNG phải client người chơi → client NOT RUN.** Hàng a = LMB·Q·RMB (trái→phải), hàng b = E·R·passive.

**T1 — bảng 30 ô (+ passive).** PASS = đọc được, trong, không che thân. Ghi chú “mờ” = không thấy hình rõ trong 5–6 khung (có thể lệch nhịp chụp).

| Tướng | LMB | Q | RMB (W) | E | R | Passive | Ảnh |
|---|---|---|---|---|---|---|---|
| Mộc Lẫm | quá mờ (đốm ngọc nhỏ) | PASS (cột ngọc trong qua thân, thân vẫn đọc) | **đã sửa** → PASS trên helper (3 vòng ngọc, không khối trắng); trước sửa: vòng halo ôm thân | PASS (vệt cung ngọc lớn) | hơi chói (lõi trắng 1 khung; flash đã hạ 60→30) | PASS nhạt (vòng trắng mảnh) | a `/cdn/value.6314f42b850b7f2030e935d105ab066f1ef54f24916b6ed135daa9bd9c7a6688.jpeg` · b `/cdn/value.958df9aab96bc30cfb7748911dadf587d41e4ebf98149ee1b7403817d1fbdacd.jpeg` |
| Kha Tàn | quá mờ (không bắt được) | quá mờ (không bắt được) | PASS (xoáy đỏ cam) | PASS (cột đỏ trong, thân đọc) | PASS (vòng đỏ + dấu) | PASS nhạt (cung trắng) | a `/cdn/value.e89527ed25f642e7b50ee3137538ed85cad3f16724a3270fbb50074163730050.jpeg` · b `/cdn/value.d5e6acf2352ff4e0d3affc822ab345b29fa5c40fc2b61659c4e7473b19ae0cb0.jpeg` |
| Mị Đăng | PASS (cột tím trong) | PASS (vòng tím) | PASS nhạt (lấp lánh trắng) | PASS (cột tím) | PASS (vòng tím) | PASS nhạt (cung trắng) | a `/cdn/value.ea8c216f537dd3b5852e5653c675b18a3e1f843ddd3e17f1c7fdbc99a2d8ea15.jpeg` · b `/cdn/value.9bc984d6a676622bbce353e01419f68f6e4d2581670c5069f1697bbcc4f0fdd5.jpeg` |
| Hỏa Tủy | **quá chói** (lõi cầu lửa trắng) | PASS (vòng lửa dưới chân) | PASS (cột lửa) | PASS (tia lửa chéo) | **quá chói** (2 cầu lửa lớn lõi trắng, khói ~36% khung) | quá mờ (không thấy) | a `/cdn/value.46b479515bf75c001f24e791cc05f22a55af7d4b44a7103cae181f9bb93e2205.jpeg` · b `/cdn/value.9a02aef6ee67511dc1ae0fa2442667dd72eb224820391e21e31848183b23b342.jpeg` · cả bộ `/cdn/value.e5c7cc1edaae4f16b4172e87dc3d3ef754a78b4637dd848b4148aa6feeaf6802.jpeg` |
| Nham Vũ | quá mờ | PASS (màn vàng trong qua thân) | PASS (cột vàng) | PASS (vòng vàng lớn) | PASS / che thân nhẹ (cột vàng dày trên thân, thân vẫn thấy) | PASS (hạt vàng) | a `/cdn/value.bba7f25d721dbeb06f1fdce3198334f3ab6a1e9b641d17a83f8ec1fb91826547.jpeg` · b `/cdn/value.41caff01f354694dda36367b189b9bb49e4b91059344e17d28fa1666c83734d2.jpeg` · cả bộ `/cdn/value.b0cee08647dd6784d6fc4aa67b6f3398c30846e2c0f3495544fdd907f70c737c.jpeg` |
| Vân Dao | PASS (vòng mây xanh lớn) | PASS (cột xanh) | quá mờ | quá mờ (không bắt được) | **che thân** (vòm xanh phủ cả 3 thân 1 khung; trong suốt nhưng sáng) | quá mờ | a `/cdn/value.c32b54ea34a2ce9597818b486623b36f5fbfa7db8c2ffbd38c403ab4ece1a913.jpeg` · b `/cdn/value.cdd3d63a5adb99865416dd17b5b443eb0f1c035cbe1f5a6fc9fb7563ab08cd2c.jpeg` · cả bộ `/cdn/value.356cc13ac7969c3f1809dc4243eec6b244af81f7c1dd4581ae69365de50060b8.jpeg` |

- **Rơi hiệu ứng mặc định: 0/36** — cả 6 tướng có KIT riêng cho mọi slot kể cả passive (`skillfx.js` dòng 49/79/113/135/174/203; `hasFx` đọc KIT).
- Tổng **(preview/helper CPU, KHÔNG phải PASS client)** — **đếm lại 2026-10-08 từ chính bảng trên, thay số cũ "PASS 23 · mờ 9":** PASS 24 (gồm PASS nhạt, Mộc RMB sau sửa, Nham R che nhẹ) · quá mờ **8** · quá chói/hơi chói 3 (Hỏa LMB, Hỏa R, Mộc R) · che thân 1 (Vân R) · mặc định 0 → 24+8+3+1 = 36. Số "9" cũ là đếm sai, không có ô thứ 9. “Quá mờ” phần lớn là chiêu nhỏ/nhanh chụp lệch nhịp — cần client thật xác nhận.

#### Bảng đơn vị đếm (2026-10-08, theo yêu cầu Codex) — dùng một đơn vị khi báo hoàn thành
- **Quy ước (Codex, 2026-10-08):** **36 ô slot = đơn vị nghiệm thu**; **87 ô pha = đơn vị truy vết lỗi** (chỉ để chỉ ra pha nào hỏng). Số 24 PASS · 8 mờ · 3 chói · 1 che thân là kết quả preview/helper, chưa chuyển thành PASS client nào.
- **Phạm vi retest client của Codex:** 8 ô thiếu ảnh + 3 ô vừa sửa (danh sách dưới), silhouette Mộc Lẫm/Nham Vũ (đợt 4), âm thanh `hero-sfx.yml`, động tác chết 6 tướng. Đợt Hạo Nhật → Hương Mai → Bách Diện chỉ triển khai sau khi 6 tướng hoàn thiện và nghiệm thu.
- **30 ô slot** = 6 tướng × 5 slot chủ động (`lmb q rmb e r`). **36 ô slot** = 30 + 6 passive. **87 ô pha** = mọi cặp `<hero>.<slot>.<pha>` có hàm trong `KIT` của `scripts/lib/skillfx.js` (đọc trực tiếp bằng `hasFx`, 2026-10-08). Bảng QA đợt 3 ở trên chấm theo **ô slot (36)**, không theo ô pha; một ô slot PASS không có nghĩa mọi pha của nó đã được thấy riêng.
- ID ô: `<hero>.<slot>`; ID pha: `<hero>.<slot>.<pha>`, pha ∈ `cast` (lúc ra chiêu tại thân) · `swing` (vệt đánh cận chiến) · `fly` (đạn/lao bay) · `land` (vùng chạm đất) · `hit` (trúng mục tiêu).

| hero | lmb | q | rmb | e | r | passive | số pha |
|---|---|---|---|---|---|---|---|
| `moc_lam` | swing, hit | cast, fly, hit | cast, land | cast, land, hit | cast, land, hit | hit | 14 |
| `kha_tan` | swing, hit | cast, land, hit | cast, land, hit | cast, fly, hit | cast, land, hit | hit | 15 |
| `mi_dang` | fly, hit | cast, fly, hit | cast, land, hit | cast, fly, hit | cast, land, hit | hit | 15 |
| `hoa_tuy` | fly, hit | cast, land, hit | cast, fly, hit | cast, land, hit | cast, land, hit | hit | 15 |
| `nham_vu` | fly, hit | cast, fly, hit | cast, fly, hit | cast, land | cast, fly, hit | hit | 14 |
| `van_dao` | fly, hit | cast, land, hit | cast, fly, hit | cast, land | cast, land, hit | hit | 14 |
| **tổng** | 12 | 18 | 17 | 17 | 18 | 6 | **87** |

#### ID các ô chưa có ảnh đọc được (cho Codex kiểm client)
- **Quá mờ / không bắt được trên helper — 8 ô slot:** `moc_lam.lmb` · `kha_tan.lmb` · `kha_tan.q` · `hoa_tuy.passive` · `nham_vu.lmb` · `van_dao.rmb` · `van_dao.e` · `van_dao.passive`. Pha cần nhìn: theo bảng pha ở trên (vd. `kha_tan.q` = cast, land, hit).
- **Đã sửa VFX sau đợt 3, chưa có ảnh sau sửa — 3 ô slot:** `hoa_tuy.lmb` (fly, hit) · `hoa_tuy.r` (cast, land, hit) · `van_dao.r` (cast, land, hit). Thêm `moc_lam.r` (flash 60→30) chỉ có ảnh trước sửa.
- **Client đã FAIL trước đây, helper sau sửa báo hết:** `moc_lam.rmb` (land) — Codex #20303 CHƯA ĐẠT; ảnh helper sau sửa không thay kết quả client.
- Tất cả ô trên và toàn bộ 36 ô: client **NOT RUN** cho tới khi có ảnh/nghe thật trong Đấu Máy; âm thanh (`hero-sfx.yml`) và động tác chết cũng NOT RUN client.


**T2 — đã sửa trong đợt này (`scripts/lib/skillfx.js`, chỉ VFX):** Mộc Lẫm RMB land: veil giảm số/kích thước, sprite alpha (không HDR, không add), flash 6→3 cường độ, 4→3 bán kính; Mộc Lẫm R flash 60→30 / 12→10 / 0.5→0.4. Ảnh trước (halo ôm thân) `/cdn/value.be2ca9832d120fc786e6ebf5c03d53f8296f3413a23722af33cdec55e1453cde.jpeg` → sau `/cdn/value.cc03d68b79af44fe6c83082934ffb9b6b8610fcc14c94bcfaee3944fb4a60583.jpeg` (helper: không còn khối trắng, còn vòng ngọc dưới chân). Chưa xác nhận trên client creator.
- **Savi sửa sau đợt QA (2026-10-08, chỉ VFX `skillfx.js`):** Hỏa Tủy LMB lõi đạn hdr(5,2.4,.7)→hdr(2.4,1,.22); R thiên thạch hdr(5,…)→hdr(2.4,.95,.2) sz 1.3→1, nổ đất lõi hdr(5,3.4,1.4)→hdr(2.8,1.5,.45), flash 140/22→70/18; Vân Dao R shear 160→90 hạt, nhỏ/thấp hơn, hdr(1.6,2.2,3)→hdr(.7,1,1.4), flash 70/14→30/10, shockwave .9→.5. **Chưa chụp lại** (mắt helper lúc đó không trả ảnh) → client NOT RUN.
- Còn mở (đề xuất, chưa làm): Hỏa Tủy LMB/R hạ lõi trắng (hdr→màu cam qua glass); Vân Dao R vòm thấp/mỏng hơn để không phủ thân; Kha LMB/Q, Vân RMB/E, Nham LMB chụp lại ở client thật trước khi tăng sáng.

**T5 / MAP-05 — thân trong trận.** 6 thân BODY (`lobby-stage.js`) + `armBody` dựng cạnh nhau ở đường giữa (live-only, đã dọn). Ảnh màu (helper, tư thế bind/T, vũ khí scripted lúc chụp còn “deriving” trừ khiên Mộc và gậy Vân):
moc_lam `/cdn/value.6c54a296b76370653fd852bcb76a31a58cc47e88c3dc1fa5a6e28b0321d90ffa.jpeg` · kha_tan `/cdn/value.538d6fa8c171d29abb3da50d7084efc538caf37e9f4804387d3342d333dd4b1f.jpeg` · mi_dang `/cdn/value.0eb1920ece4def7273100243cbeca8e3124b2fb7f0e83a5b6be8f3a4d041d937.jpeg` · hoa_tuy `/cdn/value.2e6528bb437d23f4a1fab1ee310c5bbee8860b85a2f6e3b98663d9e24e0a0db2.jpeg` · nham_vu `/cdn/value.0234350eb24e9966bb2cc434a59aecc09a11cc395469e464565d26d56e99c5fd.jpeg` · van_dao `/cdn/value.e3fd1f2ec12271ace9aa3aa9b20dac44413551187bd22d534470e637e682fabc.jpeg`.
- **Silhouette 64 px** (Blender ortho từ chính GLB BODY, alpha → `-threshold 50%`; hàng trên chính diện, hàng dưới góc trận 56°; *không gồm vũ khí*): `/cdn/value.63c0968f8d8f9aef1ae094b72a9bd933f1dfb833ea0b451e604e3d9ece68184c.png`.
- Kết luận phân biệt: **Kha Tàn** (sừng + đuôi cong), **Mị Đăng** (tay áo/dải lụa rủ tua), **Vân Dao** (váy loe tam giác + tay áo rộng), **Hỏa Tủy** (khối vai/thân to) — rõ ở cả 2 góc. **Mộc Lẫm ↔ Nham Vũ** gần nhau nhất ở 64 px (cùng dáng người áo dài thẳng; Mộc vạt áo loe hơn); trong trận phân biệt bằng vũ khí (khiên tròn vs cung) + màu (ngọc tối vs vàng-nâu) — chưa chụp silhouette có vũ khí.
- **Đường code đổi model người chơi** (đọc, không sửa): `scripts/hero.js` `update()` dòng ~1050–1066: khi `ctx.session.armed !== s.hero` → `disarmBody` → `b = BODY[s.hero]` → lưu avatar cũ vào `s.avatarModel` (nếu không phải model tướng) → `ctx.self.model = { id: b.model }; ctx.self.layout = { maxExtents: { y: b.h } }` → `armBody(ctx, ctx.self.id, s.hero)`; `ctx.self.anim.grip = gripChannel(s.hero)`; hết trận (`s.hero` rỗng) khôi phục `s.avatarModel`. Collider giữ capsule người chơi. **Code đã có, không cần patch;** chưa có capture Đấu Với Máy thật trên client.

### Đợt 4 (2026-10-08) — tách silhouette Mộc Lẫm/Nham Vũ

**Mục tiêu:** ở cỡ camera trận (64 px, góc 56°) Mộc Lẫm phải đọc là **bức chắn** (thấp, bè ngang, hình thang), Nham Vũ là **xạ thủ gọn nhẹ** (thân hẹp, chân lộ, quiver + chim tinh thể phá đường viền). Chỉ sửa mesh; khung xương giữ nguyên.

- **Nguồn dựng:** `art/silhouette/build.py` (+ `glbedit.py`, `shapes.py`), chạy lại từ GLB BODY gốc; `art/silhouette/sheet.py` + `render.py` dựng sheet silhouette (ortho, alpha → `-threshold 50%`, cao 64 px, hàng trên chính diện, hàng dưới góc trận 56°).
- **Mộc Lẫm** — vai giáp đá/đồng nhô quá cánh tay, ngực giáp lá nhiều lớp (thân thùng), vạt áo dài cắt ngắn thành tấm giáp đùi nặng, lõi ngọc phát sáng ở ngực; màu ngọc tối + đồng + đá. GLB mới: `/cdn/value.10b7aa799830cc722ace61c3095fff7316329b9e1e1a38ced43ee04bb46ceab3.glb` (cũ `/cdn/value.63a20a06624ea21ba8a8f669b5d37d53d05b5de54dcf452c3f50eaf5b4642dd7.glb`).
- **Nham Vũ** — thân/chi thu gọn, áo săn ngắn (chân lộ rõ, bỏ áo choàng dài), giáp vai da/hổ phách **một bên**, quiver sau lưng có lông tên nhô qua vai, chim trinh sát tinh thể hổ phách (~0.25 m) ở vai trái; màu vàng đất + da nâu. GLB mới: `/cdn/value.308ae32e94f8584b25d2bbbf1793e64880d05ba6190457786405f139b63ab9cc.glb` (cũ `/cdn/value.ec891ff03bee9022fd1b47934376c22ba2d03247665c451a91e0575f8b0454c1.png.glb`).
- **Tam giác:** Mộc 20 719 → 24 039 (×1.16); Nham 21 269 → 22 249 (×1.05) — đều dưới trần ×1.3.
- **Khung xương:** 54 = 54 xương mỗi tướng, so tên + cha + head/tail rest (làm tròn 0.1 mm) giữa GLB cũ và mới → **identical** cả hai. Bàn tay/cẳng tay không dịch đỉnh nào (assert trong build.py) → grips/vũ khí giữ nguyên. Đỉnh cao nhất thân không đổi; `BODY.h` giữ 2.15 / 1.75.
- **Clip trên GLB mới (helper, `art/anim/build_hero.py`):** death Mộc `worst_lowest=-0.012, last=+0.001`, Nham `-0.010, +0.006` (chạm đất đúng); thêm Mộc R, Nham E. Sheet death `/cdn/value.bcede882c5a85da1184193ce2263ecb7373541ab395b2f316933e0fe6a9a1f93.png` — giáp/quiver/chim đi theo xương, không thấy mảnh giáp xuyên chi ở các khung đã xem (tấm giáp đùi Mộc phồng khi ngồi xổm R, chấp nhận được). Không upload clip mới; `skill-clips.yml` không đổi.
- **`art/anim/audit.py`:** **0 issue(s)**.
- **Silhouette 64 px (không vũ khí, đủ 6 tướng):** cũ `/cdn/value.63c0968f8d8f9aef1ae094b72a9bd933f1dfb833ea0b451e604e3d9ece68184c.png` (render lại cùng cách `/cdn/value.29fe881e0020bc049d2518eadbc4409fee1b5296499cd99d70f1031d0a0fe3ab.png`) → mới `/cdn/value.4ce9e839e448d49e4c2801b905086de9e51c11892d855017e8ca3fdce2fb9e86.png`. **Có vũ khí (Mộc/Nham):** `/cdn/value.5d4f8b42aa00ca6e383756b861387bb0d054e05549a2f95f484f1efb6bd74cb9.png`. Kết luận: Mộc khối thang bè vai, Nham dáng hẹp cao, quiver + chim nhô vai — phân biệt được bằng đường viền ở cả hai góc.
- **Đã sửa file:** chỉ 2 chuỗi `model:` của `moc_lam`/`nham_vu` trong `scripts/lib/lobby-stage.js` (h không đổi). Không đụng heroes.yml, hero.js, bot.js, collider, ui, map, terrain, cells, skillfx.
- **Trung thực:** proof helper/CPU (Blender) only — **client trong trận = NOT RUN**.

#### Đợt 4: Codex xem proof (2026-10-08 18:31)
- **Loại evidence:** xem ảnh proof helper trên Chrome. **Đây không phải PASS client.**
- Ghi nhận: Mộc Lẫm mới có thân bè, vai rộng, khối nặng, đọc ra tướng chống chịu. Nham Vũ mới có dáng hẹp, chân dài, vai có điểm nhô, khác rõ Mộc Lẫm, nhất là ở góc nhìn từ trên. Proof cho thấy cải thiện rõ.
- **Còn mở (client, NOT RUN):** (1) xác nhận GLB mới đang chạy trên client trong trận; (2) khiên vẫn chiếm phần lớn silhouette Mộc Lẫm, cần kiểm lúc xoay thân; (3) giáp đùi Mộc Lẫm khi cúi trong R; (4) giáp, ống tên và chim có biến dạng trong animation đi, đánh, skill và chết không.

#### Đợt 4: Codex retest client (2026-10-08 18:44). Report local `artifacts/qa/2026-10-08/silhouette-client/report.md`
- **Mộc Lẫm** match37/round55: thân bè mới hiện trong trận. Đi, xoay và cast W/E **PASS giới hạn** (1 client, L1). Frame W thấy xanh + đất, không còn khối trắng (đóng phát hiện #20303 trong phạm vi này). Giáp mới ở màn pick trông vuông/phẳng hơn đầu và tay: **chưa duyệt final art**.
- **Nham Vũ** match39/round57: thân hẹp, lộ chân, điểm nhô ở vai đã hiện; khác rõ Mộc Lẫm. Thấy W/E vào hồi chiêu dù Codex chỉ click đi: **provenance INCONCLUSIVE**, không chấm animation skill PASS.
- **NOT RUN:** đùi Mộc lúc cúi trong R (R khóa ở L1); animation skill Nham; động tác chết; âm thanh. **Nhóm đợt 4 chưa xong.**
- **Fixture chuẩn bị cho lượt sau:** `tools/measure/silhouette-fixture.js`, gồm `READ` (chỉ đọc), `MOC_L6` (cộng xp một lần L1→L6 qua vòng lên cấp của hero.js để mở R; mục tiêu hợp lệ cho R là lính đỏ trong 5 m) và `DIE` (hp = 0 một lần, chạy die() thật). Chỉ phòng dev, Sân Tập, ingame. Không đổi số ship, không gửi input, không thêm bot. Sau ca: Làm lại về L1. Nham đi/đánh/E chạy ở L1 không cần fixture.
