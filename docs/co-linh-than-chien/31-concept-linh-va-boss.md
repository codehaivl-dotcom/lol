# Concept lính và boss (2026-10-07, chờ creator chọn)
Ảnh vẽ bằng image model, ref từ render 3D của Linh Binh hiện có (scripts/gen/minion.js). Chưa có trong game trừ lính thường.
| Đơn vị | Tên đề xuất | Ảnh | Trong game |
|---|---|---|---|
| Lính (melee/caster/siege) | Linh Binh | /cdn/value.79984379c1714f01a0f3df81cbd9e94e413ba5d3a32a5c4294aebd437c4f1c00.png | có (minion.js) |
| Siêu lính | Siêu Linh Binh: golem sa thạch 3 m, lõi pha lê | /cdn/value.2ec116bec7c6d3d561ef88dfb83247377d0a3fb48558af6c9befed5a591a4d4c.png | chưa |
| Boss | Thuồng Luồng: rắn thần đầm đá | /cdn/value.fe33f0f656b3732726621e17eda2a860487edb69608aec5889d72c24977b8696.png | chưa |
| Siêu boss | Cổ Linh Long: rồng Lạc cổ, tim pha lê | /cdn/value.f22c086365bd9f0658b0c3255cfd182ef26572b7938aeedabcec3bc393299868.png | chưa |
Ảnh siêu boss có chữ trang trí do model vẽ, chỉ là concept.

## Duyệt
- 2026-10-07: lukasai “duyệt” 4 concept (Linh Binh, Siêu Linh Binh, Boss, Siêu Boss). Tên boss vẫn là đề xuất. Chưa dựng 3D.
- 2026-10-08: spec tạm ở [35](35-spec-boss-thuong-luong-co-linh-long.md): Thuồng Luồng là hình dạng Cổ Titan rank I–IV, Cổ Linh Long là rank V–VIII; D4 giữ nguyên.

## Bộ quái Minh Ước (creator gửi 2026-10-08: "bộ quái")
Ảnh concept 3 góc (front/side/back), cùng một ngôn ngữ: đá ngà nứt, viền vàng, mảng ngọc lục, mạch phát sáng xanh lơ. Chưa có trong game.

| # | Ảnh | Vai trong ảnh | Gắn với docs hiện có | Phạm vi |
|---|---|---|---|---|
| 01 | /cdn/01-faction-unit-minion-melee-minh-uoc-u30d6efjs.webp | lính cận chiến, đầu chim, tay vuốt khiên | thay hình Linh Binh melee (doc 33) | Slice |
| 02 | /cdn/02-faction-unit-minion-caster-minh-uoc-u5j5benq5.webp | lính phép, cầu năng lượng ở tay | thay Linh Binh caster (đèn lồng bay) | Slice |
| 03 | /cdn/03-faction-unit-big-minion-siege-beast-minh-uoc-u293163z7.webp | thú công thành 4 chân, nòng ở mõm | thay Linh Binh siege (xe trống đồng) | Slice |
| 04 | /cdn/04-neutral-jungle-jade-hare-u1fi7lj72.webp | thỏ ngọc | camp nhỏ (đề xuất: shardpack) | roadmap 5v5 |
| 05 | /cdn/05-neutral-jungle-mountain-boar-u8sb41k1k.webp | lợn rừng đá | camp (đề xuất: wolves → bầy lợn) | roadmap 5v5 |
| 06 | /cdn/06-neutral-jungle-stone-monkey-u55fdx2iy.webp | khỉ đá | camp (đề xuất: raptors) | roadmap 5v5 |
| 07 | /cdn/07-neutral-jungle-mountain-turtle-u6xekz5oh.webp | Sơn Quy | khớp shellwarden "Quy Giáp Thạch" | roadmap 5v5 |
| 08 | /cdn/08-neutral-jungle-river-serpent-u7yh5hmu4.webp | Thủy Ngư, rắn sông | camp sông (chưa có vị trí trong doc 07) | roadmap 5v5 |
| 09 | /cdn/09-neutral-miniboss-wood-spirit-tree-golem-u5ib1in14.webp | golem gỗ-đá, tán cây trên vai | buff sentinel "Hộ Mạch" (đề xuất) | roadmap 5v5 |
| 10 | /cdn/10-neutral-miniboss-guardian-white-crane-u5w20ehlz.webp | Bạch Hạc Thủ Vệ, có vòng hào quang | buff emberscale (đề xuất) | roadmap 5v5 |
| 11 | /cdn/11-neutral-bigboss-celestial-river-whale-u29fg6d6a.webp | Cá Thần Thiên Hà, bay | chưa khớp: Cổ Titan đã duyệt là Thuồng Luồng/Cổ Linh Long (doc 35) | cần quyết |

Thấy được: ảnh chỉ có một bảng màu (ngà/ngọc/xanh lơ). Không có bản Đỏ.

### Câu cần creator chốt
1. 01–03 **thay** Linh Binh đã duyệt 2026-10-07 (đang chạy trong trận)? Đề xuất: thay; phe Đỏ dùng cùng model, đổi mạch sáng sang đỏ son + vòng chân như hiện tại. Siêu Linh Binh (golem sa thạch) giữ cho tới khi có ảnh mới.
2. Cá Thần Thiên Hà: hình Cổ Titan mới (thay Thuồng Luồng/Cổ Linh Long) hay boss riêng? Đề xuất: boss riêng ở roadmap, không đụng spec 35.
3. 04–10 chỉ dựng art cho bản 5v5 (Slice một đường không có rừng); ánh xạ camp ở bảng trên là đề xuất.

### Kế hoạch dựng (sau khi duyệt), theo doc 33 + doc 28
- Đợt 1 (Slice): 01–03 ảnh → mesh, Blender rig + clip idle/walk/attack/die riêng, đo kích thước bằng collider cũ, SFX, đèn mạch đổi theo phe, proof sheet + kiểm 1 đợt lính trong dev. Wisp Blender, một con một lane.
- Đợt 2+: 04–11 theo thứ tự camp khi map 5v5 mở.
NOT RUN: mọi kiểm client.

## 2026-10-08 — Gói nhân vật Minh Ước (zip creator) → 3D
Creator (#zip): "2 Phe render xong bạn đổi màu là xong. Ngoài ra còn có quái rừng như LoL/AoV, mini boss và boss."
- Quyết định: 01–03 thay lính phe hiện tại; **một model cho cả hai phe**, phe Xanh giữ màu vẽ (teal), phe Đỏ đổi điểm nhấn teal → đỏ thẫm (~352°), ngà/vàng giữ nguyên. Công cụ: `art/minh-uoc/recolor.py` (mask hue 140–225°, sat > 0.18).
- Đã nối vào `scripts/lane.js` (BODY + bodyModel): lính cận chiến 01 (h 1.5 m, đánh `cdn/clip-attack.glb`), lính phép 02 (h 1.6 m, `cdn/clip-cast.glb`), chết `cdn/clip-die.glb`. Lính siege 03 đang rig (wisp), chưa nối. Super giữ model cũ.
- 04–11 (quái rừng, mini boss, boss): đang dựng rig + Idle/Walk/Attack/Die bằng wisp, đứng ở hàng trưng bày z≈100. **Chưa có hệ thống rừng/camp trong trận**: đó là gameplay mới, cần doc thiết kế + duyệt trước khi bật (quy tắc "research → docs → làm").
- Trạng thái: model đã hiện trong engine (look custom camera); client match chưa chạy → NOT RUN.

## 2026-10-08 — Candidate V0.1 số quái (hội đồng Codex qua lukasai) · PROTOTYPE, CHƯA SHIP
Nguồn: tin Codex/hội đồng balance+creature+QA (2026-10-08, sau việc khôi phục Mộc Lẫm). Data: `scripts/lib/data/objectives.yml` khối `neutral_v01` (không code nào đọc; `provisional: true`, `shipped: false`). Log: balance-log BL-0010.

**Lính phe (giữ số ship, không đổi):** melee 480 HP / 24 dmg / 1,25 s; caster 320 / 36 / 1,5 s; siege 880 / 54 / 2 s; armor/MR 0. Siege = concept 03, **không phải** Siêu Linh Binh (super giữ model + số riêng).

**Neutral tại cấp neo** (HP / physical dmg / armor / MR / interval s · reward tổng camp gold/xp):

| # | Quái | Neo | Chỉ số | Reward | Ghi chú |
|---|---|---|---|---|---|
| 04 | Thỏ Ngọc | L4 | 600 / 28 / 10 / 10 / 1,3 | 55 / 100 | merc |
| 05 | Lợn Rừng Đá | L4 | 1000 / 38 / 20 / 15 / 1,5 | 75 / 145 | merc |
| 06 | Khỉ Đá | L4 | 850 / 34 / 15 / 15 / 1,25 | 65 / 125 | merc |
| 07 | Sơn Quy | L4 | 1300 / 42 / 35 / 20 / 1,8 | 90 / 175 | merc |
| 08 | Rắn Sông | L4 | 1000 / 36 / 15 / 25 / 1,35 | 80 / 150 | `enabled:false`, chỉ sandbox |
| 09 | Golem Mộc Linh | L6 | 2400 / 65 / 25 / 25 / 1,6 | 110 / 210 | mini boss |
| 10 | Bạch Hạc Thủ Vệ | L6 | 2200 / 60 / 20 / 30 / 1,5 | 110 / 210 | mini boss |
| 11 | Cá Thần Thiên Hà | L10 | 12000 / 100 / 35 / 35 / 1,6 | 100 g mỗi người phe claim, pool 800 xp | `enabled:false`, chỉ sandbox |

**Scale:** delta = cấp spawn − cấp neo, chụp lúc spawn, cấp 1–15, interval cố định. 04–10: HP ×(1+0,06·delta), DMG ×(1+0,035·delta), hệ số tối thiểu 0,5; armor +1·delta, MR +0,5·delta, kẹp ≥ 0. Cá: HP +0,08·delta, DMG +0,04·delta, armor/MR +1·delta. Reward ×(1+0,03·delta) kẹp 0,5–1,5, làm tròn lúc chết.

**Phạm vi:** preview/trưng bày tắt mọi grant. 04–07 giữ merc wave doc 08 §5.2; HP trong bảng merc **không** phải HP neutral. Một guardian mỗi camp mẫu; alpha/pup chỉ có trong merc. Cá: không buff thắng trận/Titan, không Trial pit, không thay Cổ Titan (doc 35 giữ). Neutral **không bật** ở Mạch Giữa. Câu hỏi 2 ở trên (Cá) được trả lời: boss riêng, sandbox.

**Calculator (chỉ analytic, KHÔNG PASS sim/client):** đánh thường vật lý Mộc/Nham — camp 12–32 s/1 tướng; mini boss 21–23 s/2 tướng; Cá 48 s/4 tướng L10. Tools balance hiện **chưa** mô phỏng clear quái.

**Kế hoạch đo (TBD-SIM):** đo bằng kit thật + HP/mana còn lại; Golem/Hạc bắt buộc thêm ca SOLO (vì buff camp). Chỉnh theo thứ tự HP ±10% → damage → reward; không đổi cả ba cùng lúc. Codex giữ JSON/report local. NOT RUN: sim clear quái, mọi kiểm client.
