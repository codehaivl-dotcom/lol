# 77 · Audit hình học skill + đánh thường · 8 tướng · 2026-10-10

Chuẩn: doc 76. Nguồn: `strings.yml` desc · `heroes.yml` kit · `vfx-heroes.yml` · `skillfx.js` · `cues.js` (preview) · `combat.js telegraph`.
Trạng thái: PASS_MODEL = đọc code/dữ liệu khớp · NOT_TESTED · MISMATCH = cần creator quyết.

## TRẠNG THÁI HIỆN HÀNH (đọc mục này trước · cập nhật 2026-10-11)
Bảng "Từng tướng" và "Cần creator chọn" bên dưới là **bản audit gốc lúc phát hiện lỗi** (lịch sử). Hai MISMATCH đã được creator quyết (#70376, #71968).

| Skill | Hình học hiện hành (`heroes.yml`) | Model | Client |
|---|---|---|---|
| Khả Tận Q | quạt 180°, r 4,5, phía trước | PASS_MODEL | đã thấy preview + chém đúng hướng 0/45/90 (máu nhiễu lính) → NOT PASS_ENGINE |
| Nhạm Vũ Q | 3 mũi xoè **30°** (thay 17,1°), width 0,5/mũi, range 10, speed 26, pierce, 1 lần/mục tiêu | PASS_MODEL | chỉ 0°/90°, chưa test khe → NOT PASS_ENGINE |
| Hương Mai E | tường chữ nhật 6 × 0,9, cao 2,6, 2 s, không collision; dải nền đúng hitbox | PASS_MODEL | chỉ 90° (bản tường cũ); tường mới NOT_TESTED |
| Đánh thường 8 tướng | profile riêng (doc 76) | PASS_MODEL | chỉ Nhạm Vũ 5 s → NOT_TESTED các tướng khác |

## Đã sửa ở renderer dùng chung (mọi tướng)
| Lỗi | Sửa | Trạng thái |
|---|---|---|
| Đánh cận chiến bắn act `slash` crescent 1.8 m chung | Bỏ. Vệt ngắn ~1 m tại mục tiêu theo profile: blade / thrust / heavy / claw | engine emit OK, chưa xem trong trận |
| Lớp `vfx-slash` vẽ trăng khuyết bằng cả tầm đánh | Basic không dùng nữa (skill quét vẫn dùng) | PASS_MODEL |
| Đánh phép bay quả cầu 0.46–0.5 m | Nhỏ 0.22–0.34 m, mỗi tướng một hình: lửa / sét / tia / tên | PASS_MODEL |
| Impact đánh thường 0.9–1.1 | 0.42–0.55 | PASS_MODEL |
| Skillshot vẫn vẽ vòng tầm quanh tướng | Vòng tầm chỉ cho area có tầm + target | PASS_MODEL |
| Skill self không vùng vẫn vẽ vòng 1.2 m dưới chân | Không vẽ gì; khiên nổ vẽ đúng bán kính nổ | PASS_MODEL |
| Target skill hụt fx rơi về crescent 2.4 m | Impact trên mục tiêu | PASS_MODEL |

## Từng tướng
| Tướng | Slot | Desc nói | Hitbox | Preview | VFX | Kết luận |
|---|---|---|---|---|---|---|
| Mộc Lẫm | LMB | kiếm | đơn mục tiêu 1.7 | – | blade ngắn | PASS_MODEL |
| | Q | lao thẳng 7.5 m | dải 1.6 | dải | shard + dash | PASS_MODEL |
| | E | quét một vòng quanh thân | tròn 3.6 | tròn quanh thân | 2 vệt quét 360° | PASS_MODEL |
| | R | nhảy tới mục tiêu + khiên đồng đội quanh đó | target | viền mục tiêu | trên mục tiêu | bán kính khiên đồng đội chưa khai trong data |
| Khả Tận | LMB | liềm rìu | đơn 2.3 | – | heavy ngắn | PASS_MODEL |
| | **Q** | **quét nửa vòng phía trước** | **tròn 4.5 quanh thân** | tròn | 2 vệt quét 360° | **MISMATCH** |
| | RMB/E/R | lướt / móc / đòi nợ | target / dải 1.2 / target | khớp | khớp | PASS_MODEL |
| Mị Đăng | LMB | dao đâm | đơn 1.6 | – | thrust ngắn | PASS_MODEL |
| | Q/E | đèn đi-về / vẫy gọi | dải | dải | comet / leaf | PASS_MODEL |
| Hỏa Tuý | LMB | than bay | đơn | – | lửa nhỏ 0.3 | PASS_MODEL |
| | Q/R | cột lửa / thiên thạch tại điểm | tròn 2.6 / 4.0 | tròn | khớp | PASS_MODEL |
| | E | khí nóng quanh thân | tròn 4.0 | tròn | khớp | PASS_MODEL |
| Nhạm Vũ | LMB | tên sỏi | đơn | – | tên 0.34 | PASS_MODEL |
| | **Q** | **ba mũi tên xoè hình quạt** | **dải thẳng rộng 3 m** | dải | 3 tên song song | **MISMATCH** |
| | RMB/R | phát nạp / lao xuyên | dải 1.0 / 2.0 | dải | lance | PASS_MODEL |
| Vân Đao | LMB | tia rẽ | đơn | – | sét 0.26 | PASS_MODEL |
| | E | đẩy lùi kẻ địch sát bên | bán kính đẩy không khai trong mark | không vẽ | khiên | thiếu khai báo bán kính đẩy |
| | Q/R | mây tại điểm / sóng quanh thân | tròn 4 / 6 | tròn | khớp | PASS_MODEL |
| Hạo Nhật | LMB | kiếm | đơn 1.8 | – | blade ngắn vàng | PASS_MODEL |
| | RMB | khiên vỡ → nắng nổ quanh thân | tròn 4 (burst) | tròn 4 (đã sửa từ 1.2) | vòng nổ 4 | PASS_MODEL |
| | R | hai cột nắng một vùng | tròn 4.5 ×2 | tròn | khớp | PASS_MODEL |
| Hương Mai | LMB | tia sớm | đơn | – | tia 0.22 | PASS_MODEL |
| | **E** | **tường ánh sáng chặn lối, chạm bị chậm** | **chữ nhật 6 × 0.9, 2 s** | dải tường + bóng tường | tường sáng; bỏ shockwave tròn + bụi tròn | tường helper 0/45/90° chụp được; hitbox PASS_MODEL; **NOT_TESTED trên client** (preview giữ E + cast thật) |

## Kiểm tường E (hitbox, kitmech.inWall, thân r 0.5)
0°/45°/90°: tâm trúng · đầu tường 2.9 m trúng · quá đầu 3.8 m trượt · trước mặt 0.8 m trúng · trước mặt 1.2 m và 2.5 m (trong vòng 3 m cũ) **trượt**. Collision: không (tường năng lượng, desc không nói chặn đường).
Balance: vùng E đổi từ tròn 3 m sang tường → số Lab cũ của Hương Mai **không còn tương đương**, phải chạy lại.

## Cần creator chọn (ĐÃ QUYẾT — lịch sử)
- Khả Tận Q → quạt 180° (#70376). Nhạm Vũ Q → 3 mũi xoè thật, 30° (#70376, #71968).
1. Khả Tận Q: sửa hitbox thành quạt 180° phía trước (đúng desc), hay sửa desc thành "quét một vòng"?
2. Nhạm Vũ Q: ba tên xoè quạt thật (hitbox 3 dải xoè), hay desc thành "ba tên song song"?


## Sửa 2026-10-10 (sau #70376)

- Đính chính: mọi nhãn "PASS_ENGINE" ở trên cho Hương Mai E là SAI bằng chứng (chỉ là tường do helper dựng + camera tùy chỉnh). Trạng thái thật: **NOT_TESTED trên client** (preview giữ E chưa quan sát được).
- **Khả Tận Q** — Cone AoE 180°, r 4,5 m phía trước (`arc: 180`). Hit người chơi + bot + Lab: `inArc`. Preview giữ Q: quạt theo con trỏ. Telegraph: quạt (combat.js telegraph mark arc). VFX: một vệt quét 180° + mark quạt khi trúng (bỏ vòng tròn, bỏ slash 4,6 m cũ).
  - Test hàm (kitmech, thân r 0,5): 0°/45°/90° → trước 4 m TRÚNG, ngang 4 m TRÚNG (mép góc), sau 1 m/3 m TRƯỢT, 4,8 m TRÚNG (mép tầm tính thân), 5,1 m TRƯỢT. Đã chụp 3 mark quạt trong engine ở 0/45/90 (helper): hướng khớp quy ước hit.
  - PASS_MODEL. NOT_TESTED: cast thật bởi người chơi.
- **Nhạm Vũ Q** — Fan projectiles: 3 mũi, `spread 17,1°` (cũ → nay 30°), `width 0,5` mỗi mũi, `range 10`, `speed 26`, `pierce: true`, `oncePerTarget: true`. Xóa dải 3 m.
  - Nguồn: range/speed giữ nguyên dữ liệu; "xuyên mọi kẻ địch trên đường" từ tooltip gốc. **[ĐÃ THAY bằng 30°, xem mục Quyết định]** đề xuất cũ: góc 17,1° (hai mũi ngoài cách nhau 3 m ở cuối tầm, giữ đúng bề rộng 3 m cũ ở điểm xa nhất), bề rộng va chạm 0,5 m/mũi, một mục tiêu trúng nhiều mũi chỉ tính 1 lần (giữ sát thương mỗi cast như cũ).
  - Test hàm 0°/45°/90°: mục tiêu nhỏ (r 0,1) ở khe giữa 2 mũi tại 9 m → TRƯỢT; trên mũi ngoài → TRÚNG; tướng (r 0,5) ở khe → trúng mũi giữa vì thân chạm (đúng: thân chạm đường bay).
  - PASS_MODEL. NOT_TESTED: cast thật, preview 3 dải trên client.
- Basic Attack mới: NOT_TESTED trong trận thật.

### Balance Lab trước/sau (cùng seed, n 200, 6 tướng cũ, profile newbie)
- duel, combo, team 2v2/3v3/5v5: tỉ lệ thắng và % combo của Khả Tận / Nhạm Vũ **không đổi** (Δ 0,0 mọi ô).
- Danh sách trúng Q có đổi (team, n 40): Khả Tận trước 0/1/2 mục tiêu = 19/142/36, sau 18/149/31 (phía sau không còn trúng). Nhạm Vũ trước 6/232/0, sau 7/189/39/6 (0/1/2/3), vì mỗi mũi xuyên theo `pierce` đã khai rõ.
- Đọc: trong Lab, giao tranh dồn trước mặt nên thay hình học hầu như không đổi kết quả thắng. Không chỉnh damage/cooldown. Kết luận chỉ PASS_MODEL; Lab không mô phỏng người né thật.

### Kiểm lại hợp đồng lane Nhạm Vũ Q (2026-10-10)
- `fanStruck` trả mỗi lane `{ dir, struck, reach, stopped }` (trải từ `skillshotStruck`), nên `ln.reach` ở combat.js/bot.js có giá trị. Test hàm: pierce → reach 10/10/10; không pierce, tướng ở 5 m → 4,94/5/4,94 (mũi dừng tại thân). Không có lỗi `undefined`.
- Tại thời điểm kiểm helper (trước lượt client bên dưới), cast thật của người chơi/bot cho cả Khả Tận Q và Nhạm Vũ Q còn NOT_TESTED; trạng thái được cập nhật ở phần nghiệm thu client thật bên dưới.

### Kiểm thử bằng client thật (2026-10-10, Sân Tập dev) — ĐÃ ĐÍNH CHÍNH, không có PASS_ENGINE
Ngắm bằng `ctx.session.cursor` (pointer ray thật). Hình nộm đặt cạnh lane: lính/trụ đánh thêm vào một số hình nộm → số máu KHÔNG sạch.
- **Khả Tận Q** — cast 0°/45°/90°. Thấy: preview nửa vòng phía trước, nhát chém cùng hướng. Máu phần lớn khớp quạt nhưng có nhiễu lane. Còn mở: mép góc/mép tầm/phía sau ở chỗ không lính, overlay đối chiếu.
- **Nhạm Vũ Q** — chỉ 0° và 90° (KHÔNG có 45° hợp lệ; dòng "0/45/90 giống nhau" trước đây là sai). Thấy preview 3 dải, nhiều vệt xanh. Còn mở: 45°, khe, đường bay từng mũi.
- **Hương Mai E** — chỉ 90°. Thấy preview dải tường, không còn vòng tròn; cast ra tường hồng ngang; điểm trong vòng 3 m cũ ngoài tường không mất máu. Còn mở: 0°/45°, mép không nhiễu, 2 s trên camera MOBA, độ đọc.
- **Basic Nhạm Vũ** — 5 s: chớp nhỏ tại mục tiêu, không bán nguyệt/quả cầu. Còn mở: đường bay, thời điểm trúng, tướng khác.

### Quyết định creator 2026-10-10 ("ok. đồng ý")
- **Nhạm Vũ Q xoè 30°** (15°/bên), thay đề xuất 17,1°. Test hàm (thân r 0,5 ở khe giữa mũi giữa và mũi ngoài; 0°/45°/90° như nhau): 3 m, 5 m TRÚNG (mũi chồng thân); 6/7/8/9,5 m TRƯỢT (né được ở tầm xa); mũi ngoài 9 m TRÚNG; phía sau TRƯỢT. PASS_MODEL. Sim `engine.mjs` bỏ trần 1,5 m cũ. Balance Lab Nhạm Vũ phải chạy lại.
- **Hương Mai E rõ hơn:** mặt tường 2,6 m / 2,0 m, phát sáng 1,8, đục hơn; thêm dải nền sáng đúng hitbox (6 m × 0,9 m, 2 s) để camera MOBA đọc ra hình chữ nhật thật. NOT_TESTED trên client.
- **Lab Nhạm Vũ, xoè 17,1° → 30°** (team, n 40, seed 1, newbie): 2v2 26,5% → 20,6% · 3v3 33,3% → 33,3% · 5v5 42,2% → 42,2%. 2v2 giảm vì ít mục tiêu ở xa bị mũi nào chạm; n 40 còn nhiễu. Nhạm Vũ vốn thấp ở 2v2 từ trước → báo, không tự chỉnh damage/cooldown (luật: đề xuất trước).

### Lab đầy đủ Nhạm Vũ Q 17,1° → 30° (2026-10-11, `validate.mjs team`, n 200/ô × 24 ô = 4800, phút 10)
| | 17,1° | 30° | đối chứng (thay carry) |
|---|---|---|---|
| 2v2 | 40,7% [39,3–42,1] | 40,8% [39,4–42,2] | 43,4% |
| 3v3 | 30,4% [29,1–31,7] | 30,8% [29,5–32,1] | 32,6% |
Kết luận: góc xoè **không làm đổi** tỉ lệ thắng (chênh nằm trong khoảng tin cậy). Mức tụt 26,5→20,6% ở lần n 40 hôm qua là nhiễu. Nhạm Vũ vẫn thấp hơn đối chứng ~2–3 điểm, và mức này có từ trước khi đổi Q → không chỉnh số (luật: đề xuất trước). Báo cáo: `reports/sim/2026-10-11-nv17-n200`, `…-nv30-n200`. PASS_MODEL.

## 2026-10-11 · Khả Tận Q · nghiệm thu client (bàn test sạch)
Bàn test: scripts/lib/qabench.js (chỉ build room): world.state.qaBench { quiet: lính/trụ tắt, dummies: bot-red-1 đứng yên, draw: vẽ hitbox thật lên sàn, log: sổ cast/hit }; world.state.qaCases đặt hình nộm theo kịch bản. Tester thật (Savi's tester 1, client WebGPU), bấm Q bằng phím + chuột.
Kết quả 15/15 khớp (hit thực = dự đoán từ heroes.yml: quạt 180°, r 4.5 + thân 0.5):
| aim thực | mép trong 4.8m | ngoài 5.3m | cạnh 80° | cạnh 115° | sau lưng 2.5m |
|---|---|---|---|---|---|
| 0° | trúng | trượt | trúng | trượt | trượt |
| 44° | trúng | trượt | trúng | trượt | trượt |
| 92° | trúng | trượt | trúng | trượt | trượt |
Ảnh: preview giữ Q (nửa quạt xanh) · telegraph đỏ · khung debug hồng trùng nhau: /cdn/value.3d77f8297bd48be0a8399e1ee0ac30b321c03058f1ac944f92b652c6a7fcc01b.png · góc 90°: /cdn/value.6c6749ab0d84ba469c0b7d9d71f0eb4745d7565ec3449e72cd10ad9bfd3a5354.png
Trạng thái: PASS_ENGINE (hình học hitbox + preview/telegraph). VFX vệt chém chưa đánh giá thẩm mỹ.

## 2026-10-11 · Nhạm Vũ Q · nghiệm thu client
18/18 khớp (3 làn, mỗi làn rộng 0.5 + thân 0.5, xòe ±15°, tầm 10): giữa làn trúng · làn 15° trúng · khe 7.5° ở 8 m trượt · ngoài 25° trượt · 11 m trượt · điểm 4 m nằm trên 2 làn chỉ trúng 1 lần (oncePerTarget). Kiểm ở 0°, 44° và 92°.
Ảnh preview giữ Q (3 làn + 3 đầu mũi tên, không vòng tròn): /cdn/value.3f5276837ce3dfb70e6d353b5c87ea1d8e8fbfd272a89ff1bab6d30d897b852a.png · lúc cast (3 mũi tên thật, khung hitbox hồng): /cdn/value.8e5d59915a6a9c23ff35a24050368c399d47e7a0c0477a68815298cfa19a480c.png
Trạng thái: PASS_ENGINE (hitbox + preview).

## 2026-10-11 · Audit preview toàn bộ skill (8 tướng × Q/RMB/E/R) theo mô tả
Luật (creator, 11/10): "Skill thế nào thì ra hình thế đó", bắn 3 mũi tên thì preview vẽ 3 mũi tên, không vẽ vòng tròn.
Bộ vẽ chung scripts/hero/match/cues.js drawAim chọn hình theo dữ liệu: fan → từng làn · skillshot → dải + mũi tên · cone → quạt · wall → dải tường + bóng tường · target → viền mục tiêu, sàn trống · self không vùng → sàn trống · chỉ vùng tròn thật (area/burst) mới vẽ đĩa tròn.
Đối chiếu mô tả: vòng tròn chỉ còn ở skill tròn thật (Mộc Lẫm E quét quanh thân, Hỏa Tùy Q/E/R, Vân Dao Q/R, Hạo Nhật RMB nổ quanh thân + R, Hương Mai R) và vòng tầm đánh khi chọn điểm/mục tiêu.
Sửa: Nhạm Vũ R, điểm đáp sau cú lùi 6 m đổi từ vòng nhỏ sang mũi tên chỉ hướng lùi (chưa thấy trên client, R khóa tới cấp 6).
Telegraph đỏ (markOf) chỉ bắn cho skill vùng; skillshot không có telegraph tròn.


## Hương Mai E · Chặn Lối · client thật 11/10 (tester WebGPU, bàn test qaBench + qaCursor)
Dữ liệu: area, wall half 3.0 m, dày 0.9 m, hold 2 s, tầm 8 m. Hình nộm bot-red-1 (r 0.5) đứng theo qaCases, Hương Mai đứng (-16, 17.7).
| góc | tâm | mép trong | ngoài mép | sau tường | đầu tường trong | đầu tường ngoài | vòng 3 m cũ |
|---|---|---|---|---|---|---|---|
| 0° | trúng | trúng | trượt | trượt | trúng | trượt | trượt |
| 45° | trúng | trúng | trượt | trượt | trúng | trượt | trượt |
| xiên ~112° (fwd -0.93, 0.37) | trúng | trượt* | trượt | trúng* | trượt | trượt | trượt |
*tường đáp gần hơn dự kiến vì con trỏ bị nút skill chặn; kết quả vẫn đúng 7/7 khi tính lại inWall với tâm và hướng thật trong qaLog.
21/21 khớp hình học. Tồn tại: thấy ở +1.08/+1.38/+1.99/+2.49 s sau thả E, mất ở +2.89 s (đáp ở ~+0.55 s) → ≈2 s. Ảnh: /cdn/value.d7edd4069e0f70feabedf7efc9760ea1fe300aa77693520bd70a32249e1b4cba.jpg, /cdn/value.605e13c33143c169bff2248622e9fa539ba03432b8f370bcd5fa0fc385709efe.png
Còn mở: 90° đúng góc. NOT_TESTED: tiếng, góc nhìn người khác.

## A5 — Basic Attack, đứng một mình 10 s (11/10)
Client WebGPU tester, Sân Tập, hình nộm bot-red-1 đứng yên (qaBench), cận chiến cách 1.3 m, tầm xa 6 m, 1 lần click rồi tự đánh.
| Tướng | hit/10 s | đọc được |
|---|---|---|
| Mộc Lẫm | 7 | ảnh: không thấy bán nguyệt/cầu lớn; chi tiết vệt quá nhỏ ở camera này để mô tả |
| Khả Tận | 7 | ảnh: không thấy bán nguyệt/cầu lớn; chi tiết vệt quá nhỏ ở camera này để mô tả |
| Mị Đăng | 7 | ảnh: không thấy bán nguyệt/cầu lớn; chi tiết vệt quá nhỏ ở camera này để mô tả |
| Hạo Nhật | 6 | ảnh: không thấy bán nguyệt/cầu lớn; chi tiết vệt quá nhỏ ở camera này để mô tả |
| Hỏa Tùy | 5 | ảnh: không thấy bán nguyệt/cầu lớn; chi tiết vệt quá nhỏ ở camera này để mô tả |
| Nhạm Vũ | 6 | mũi tên thấy giữa đường bay (khung 3 s) |
| Vân Dao | 5 | ảnh: không thấy bán nguyệt/cầu lớn; chi tiết vệt quá nhỏ ở camera này để mô tả |
| Hương Mai | 7 | ảnh: không thấy bán nguyệt/cầu lớn; chi tiết vệt quá nhỏ ở camera này để mô tả |
Ảnh: /cdn/value.0745209cd63cb0db09ea77156ffc2eecd8e15d695cd9460c9183d810bae1887c.png · /cdn/value.94cd8a80328b197f9eee9df6684d52b87dcd94e45d6b446c4a27f5b3ae2669ed.png · /cdn/value.b8515d4d0762f42ae43b2f05908e9fe778d15957067583e8f2852042de59c957.png. Chưa đo: giao tranh nhiều tướng, attack speed cao. PASS_ENGINE chỉ cho phần đứng một mình.
### A5 giao tranh (11/10)
Trận 5v5 Tái Hiện, tester Hương Mai + 4 bot xanh + 5 bot đỏ, 4 cụm 6–7 tướng trong 9 m, ảnh /cdn/value.30b19d39e79128924f1c6f8931978cad3fe73d91336b294b66cb5e4899ab6074.png. Đánh thường đọc là đơn mục tiêu, nhỏ hơn hẳn skill. Lỗi mới: một chớp trắng-xanh phủ ~nửa màn hình (0:38) → A5b.
Ghi chú QA: lúc dựng trận, phòng main vẫn giữ trận Sân Tập 17136 đã đóng (letter err.soloLeft đã gửi) với startedAt cũ, chặn vé 17137; chưa tái hiện được nguyên nhân, đóng tay bằng run_script.
