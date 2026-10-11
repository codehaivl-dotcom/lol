# Audit 18 · Lane a · Tạo hình ↔ kit ↔ Lab (6 tướng)

> CHỈ AUDIT. Không đổi runtime, candidate, doc chung. Lane a chọn trong nhóm A–D của doc 74 (001–040); không vượt nhóm.
> Look loại trừ: 002 chỉ dùng cho Tĩnh Lôi (doc 75 đã đề xuất cho chính tướng này); 011, 021, 022, 023, 051, 053, 062 (prototype doc 75) và Vũ Công Gương Đồng (Bách Diện) không dùng. Silhouette tránh trùng 8 tướng đang chơi: Mộc Lẫm (người khiên), Kha Tàn (long thú đuôi dài), Mị Đăng (bán vật chất tím), Hỏa Tủy (lõi dung nham), Nham Vũ (thợ săn cung), Vân Dao (thần gió), Hạo Nhật (khổng nhân giáp vòng), Hương Mai (thần điểu).
> Trong lane, mỗi look chỉ đề xuất cho một tướng.

## Lab đã chạy (rev 58663539ed6e, `--cand`, 12 tướng: 6 tướng lane a + 6 tướng đang chơi)
- `combo --cand --n 200` → `FLAG_RED` (375 cờ đỏ, 165 trong số đó là Ngư Đăng). Chế độ hoàn hảo: bia đứng yên, mọi đòn trúng; chế độ newbie: AI.
- `duel --cand --n 60`, phút 6 và 15 → `FLAG` (0 đỏ, 130 cam: cặp >70/30). Duel chỉ ghi tỉ lệ thắng; **TTK lấy từ thời lượng combo** (`comboSeconds`), vì báo cáo duel không ghi TTK.
- Mốc so sánh: thắng trung bình của các tướng đang chơi: Mộc Lẫm 78/80 %, Kha Tàn 86/75 %, Mị Đăng 84/84 %, Hỏa Tủy 92/95 %, Vân Dao 59/59 %, Nham Vũ 0,5/0,5 % (Nham Vũ là điểm lệch riêng của baseline, không làm mốc cho xạ thủ).
- NOT_TESTED, áp cho cả 6 tướng (doc 73 §6): PASS_ENGINE chưa chạy; địa hình/tường/bụi/tầm nhìn; đường đạn bị thân chặn (trừ `passMinions`); crit/hút máu/sát thương chuẩn/phản sát thương/silence không có field trong data. Các dòng `# chưa mô hình` trong từng candidate được kê ở từng mục.
- Số liệu Lab chỉ là gợi ý cho bước tune; audit này không tune.

**Gap chung (đúng cho cả 6 tướng, đã kiểm 2026-10-11):** chỉ có candidate Lab (`tools/sim/candidates/<id>.yml`) và mục doc 03 (kit + "Tạo hình V1" kiểu cũ). Không có trong `heroes.yml`, `vfx-heroes.yml`, `hero-sfx.yml`, `assets/registry.yml`, `assets/manifest.yml` hay `art/`. Đúng như AUDIT-TAO-HINH.md ghi nhận (drift): kit vẫn viết theo tạo hình cũ. Mỗi tướng còn thiếu cả chuỗi: chọn look → sheet prototype doc 75 (turnaround, bóng đen, test 64 px, uniqueness) → creator duyệt → viết lại kit theo look (như Bách Diện) → Lab PASS → template R doc 79 → Blender + rig + clip (Idle/Walk/Run/Attack/Q/RMB/E/R/Hit/Death) → VFX theo doc 76 + projectile là vật thể thật → SFX → runtime (heroes.yml, bot, preview) → PASS_ENGINE.

---

## 1. Tĩnh Lôi (`tinh_loi`) · đấu sĩ cơ động (`fighter_burst`)

**1 · Gap.** Có: candidate (nội tại Lôi Tàng: đòn thứ ba hiện hai tay năng lượng, nổ sấm; Chưởng Hồi đánh gần 1,8 m; Q Tiếng Vọng skillshot 9 m × 1,3 m đánh dấu; RMB Bước Che tự khiên; E Nện Lôi vùng tròn 3 m; R Cước Dội Trời chỉ định 3,5 m, hất văng + choáng). Doc 03 §4: võ giả bốn tay, quyền giáp lam. Doc 75 đề xuất 002 → Tĩnh Lôi "sau khi đối chiếu kit bốn tay"; phần đối chiếu đó nằm ở đây. Chưa có prototype, model, rig, clip, VFX, SFX hay runtime.

**2 · Tạo hình.**
- **002 Người Sấm (Thunderborn)** — *khuyến nghị.* Mây giông đặc với hai nắm đấm sấm; hai "tay năng lượng" của nội tại trở thành hai tay tia chớp mọc từ thân mây, nên bốn tay mang nghĩa vật lý chứ không còn là trang phục. Kiểu di chuyển giật cục như tia sét khớp với lối đấu sĩ cơ động. Giải thích trong COLINH: một cơn giông ký ức kết tinh quanh lõi Tinh Thạch.
- **038 Vượn Má Trắng (Gibbon Acrobat)** — phương án dự phòng. Tay dài và bàn chân cầm nắm cho đúng nghĩa "bốn tay"; nhào lộn giữ được cú đá R. Rủi ro uniqueness cao (Wukong, Ngộ Không, Monkey King), phải cấm gậy, phân thân và mũ.

**3 · Skill fit (002).**
- *Vẫn hợp:* nội tại (đòn thứ ba mọc hai tay chớp), LMB chuỗi chưởng → đấm sấm, Q Tiếng Vọng (chưởng phong thành quả cầu sét bay thật, đánh dấu mục tiêu), E Nện Lôi (thân mây nện xuống thành sét rơi tròn).
- *Phải viết lại: 2.*
  - **RMB Bước Che → "Mây Che":** thân tan thành mây, giật một đoạn ngắn và bọc vỏ điện quanh mình. Vẫn là bước ngắn + khiên.
  - **R Cước Dội Trời → "Sấm Dội Trời":** Người Sấm không có chân để đá; thay bằng cú đấm móc của nắm đấm sấm hất mục tiêu lên, rồi một cột sét đánh xuống nơi mục tiêu rơi. Giữ choáng + hất văng và cùng độ khó.
- *Hình học doc 76:* Q chỉ ghi `skillshot`, phải ghi là **một đạn thật**, vì "chưởng phong" dễ bị hiểu thành Cone AoE. Phần tái kích hoạt để lướt tới dấu chưa mô hình. RMB nhảy tới đồng minh và chia khiên chưa mô hình; Lab đang cho nhảy về phía địch. Hai phần này phải mô hình trước khi PASS.
- *R theo doc 79:* bản hiện tại là một cú đá chỉ định, không có cấu trúc signature và chưa mô hình nhịp hai. Bản Sấm Dội Trời có đủ 5 pha: tụ mây → móc hất (nhịp 1) → cột sét từ trời (đỉnh, phải đọc được ở camera MOBA) → choáng → mây tan. R hiện tại: **chưa đạt**.

**4 · Stat.** Duel: thắng trung bình **35 % (phút 6) / 26 % (phút 15)**. Đấu sĩ đang chơi (Kha Tàn) đạt 86/75 %, nên Tĩnh Lôi **UP ở duel** (thua Cốt Bện và Sấm Kha khoảng 97 %). Combo hoàn hảo lại cao: trung bình 90 % máu ở phút 6 và 74 % ở phút 15; hạ trọn 7 tướng ở phút 6, TTK 7,7–12 s. **One-Combo Kill Test: RED**: hạ Bách Diện (đấu sĩ, cùng cấp và vàng) 102,4 % trong 11,95 s; 29 cờ cam (hạ xạ thủ/pháp sư 102 %), 17 cờ vàng. Newbie chỉ gây 27–73 %, không hạ. Kết luận: burst đúng vai nhưng combo dài, đủ để kết liễu đấu sĩ; khả năng trụ duel yếu. Không tune. NOT_TESTED: tái kích hoạt Q, RMB lên đồng minh, R nhịp hai.

---

## 2. Lam Nghi (`lam_nghi`) · hỗ trợ khống chế (`support_control`)

**1 · Gap.** Có: candidate (nội tại: viên sao thứ ba ghim mục tiêu và làm chậm nặng; LMB đạn sao 10 m; Q Chạc Trời skillshot 10 m × 2,4 m xuyên, trói; RMB Sao Trở Về tự khiên; E Sao Rơi vùng 3,5 m nổ trễ 0,9 s, choáng; R Đường Mạch Sáng 20 m × 2,2 m xuyên, làm chậm). Doc 03 §6: dị chủng thiên văn cổ dài, trượng quỹ đạo sao. Chưa có gì khác.

**2 · Tạo hình.**
- **034 Hươu Sao Gạc Đóm (Firefly Stag)** — *khuyến nghị.* Đúng vai hỗ trợ trong doc 74. Giữ được cổ dài, dáng thanh và không cánh của doc 03. "Sao" của kit thành đom đóm treo trên gạc, nên mọi đạn có nguồn rõ là từ gạc. "Chạc Trời" vốn là chạc nhánh, khớp ngay với gạc phân nhánh. Giải thích trong COLINH: đom đóm là bụi Tinh Thạch phát sáng mà loài hươu cổ này gom về.
- **019 Người Đá Nguyệt (Moonstone)** — phương án dự phòng. Đầu là viên đá đổi pha trăng theo hồi chiêu R, hai vầng khuyết bay làm nguồn đạn. Doc 74 xếp vai pháp sư, nên nét hỗ trợ yếu hơn.

**3 · Skill fit (034).**
- *Vẫn hợp:* nội tại (ba con đom đóm ghim mục tiêu), LMB (đom đóm bay là đạn thật), E Sao Rơi (bầy đom đóm sà xuống vùng rồi nổ), RMB (bầy đom đóm bay ra rồi về che đồng minh).
- *Phải viết lại: 1.*
  - **Q Chạc Trời → "Gạc Rẽ Trời":** hươu cúi gạc, phóng **3 tia ánh sáng tỏa theo fan** từ ba nhánh gạc; mỗi tia trói tướng đầu tiên nó trúng. Giữ vai khống chế; độ khó thấp hơn một chút vì fan dễ trúng hơn, nên mỗi tia phải hẹp lại.
- *Hình học doc 76:* Q là "tia rẽ nhánh" nhưng đang mô hình bằng **một** skillshot rộng 2,4 m. Phải tách thành fan đạn thật (`fan` + số tia) và không vẽ như Cone AoE. RMB quỹ đạo ra-về và sát thương lượt bay chưa mô hình. E chưa mô hình phần tự chọn thời điểm nổ và vùng tồn tại.
- *R theo doc 79:* tên và hình hiện tại ổn: một đường sáng dài 20 m. Bản hươu: hươu ngửa gạc gom đom đóm (cast) → dòng đom đóm phóng thành dải sáng (signature, đọc được ở camera MOBA) → choáng/chậm dọc đường → đom đóm rơi rắc. Cơ chế tích lực / sát thương theo quãng đường chưa mô hình. R: **đạt về ý**, còn thiếu template doc 79 và phần mô hình đó.

**4 · Stat.** Duel: **17 % / 24 %**. Hỗ trợ được chấm theo giá trị đội; Vân Dao đạt 59 %, nên duel thấp chấp nhận được nhưng ở mức thấp. Combo trung bình **60 % / 63 %**. Chỉ hạ được Nham Vũ (104 %, TTK 10,9 s; 3 cờ cam, 2 cờ vàng 95 %), mà Nham Vũ là điểm lệch của baseline. **One-Combo Kill Test: không RED**; newbie 42–46 %. Giá trị đội ở mức tạm: khống chế chuỗi trói Q → choáng E → chậm R. Lab chưa đo giá trị khiên cho đồng minh và giá trị giao tranh 5v5, nên **NOT_TESTED** với vai hỗ trợ. Không cờ OP.

---

## 3. Lộc Thảo (`loc_thao`) · xạ thủ kiểm soát vùng (`marksman`)

**1 · Gap.** Có: candidate (nội tại Gai Bám: chảy máu theo tầng; LMB đạn 10,5 m; Q Kéo Cành skillshot xuyên 10 m × 1,6 m, chậm + 2 tầng; RMB Bứt Nhanh tăng tốc đánh và tốc chạy; E Mưa Gai vùng 3,8 m, 11 m, nhiều nhịp; R Rễ Chặn 16 m × 1,6 m, xuyên lính, trói tướng đầu). Doc 03 §9: sinh thể rễ-cành, cung gai ở cẳng tay. Chưa có gì khác.

**2 · Tạo hình.** Nhóm A–D không có xạ thủ thực vật. Hai lựa chọn gần nhất giữ được chảy máu/độc và vùng:
- **030 Bọ Cạp Đá Ong (Laterite Scorpion)** — *khuyến nghị.* Đúng vai xạ thủ trong doc 74: kim độc bắn xa, cắm càng neo. Gai Bám chuyển thành nọc độc rỉ máu; mọi đạn bắn ra từ kim đuôi vồng qua đầu, nguồn rất rõ. Silhouette ngang, tám chân, không trùng tướng đang chơi. Giải thích trong COLINH: loài bọ hóa thạch trong tầng đá ong, sống lại nhờ ký ức Tinh Thạch. Rủi ro: so với Skarner và Sand King phải cấm tinh thể phủ thân và cấm đào cát; rig tám chân tốn công.
- **020 Người Than Hồng (Cinderkin)** — phương án dự phòng. Ná bắn hòn than, mưa than; con người thấp chắc. Doc 74 ghi rõ trùng nặng với Hỏa Tủy, nên chỉ dùng nếu Hỏa Tủy giữ hẳn bản sắc lư thiên thạch.

**3 · Skill fit (030).**
- *Vẫn hợp:* nội tại (nọc theo tầng), LMB (kim độc bay là đạn thật), E Mưa Gai → "Mưa Kim" (đuôi bắn vồng một loạt kim xuống vùng), R (kim neo xuyên lính, trói tướng đầu).
- *Phải viết lại: 2.*
  - **Q Kéo Cành → "Quất Đuôi":** đuôi quất thẳng một đường xuyên, làm chậm, cắm 2 tầng nọc. Giữ số liệu.
  - **RMB Bứt Nhanh → "Lột Vỏ":** bong lớp vỏ đá ong, nhẹ người, tăng tốc đánh và tốc chạy. Giữ chức năng và độ khó.
- *Hình học doc 76:* Q "quất" phải là một đường skillshot thật (đuôi vươn), không phải Cone AoE. E là vùng tròn có nhịp; phải ghi số nhịp và thời lượng, và phần ẩn đồng minh trong vùng chưa mô hình. Ở R, hàng rào dựng sau khi trói (bản này là vách đá ong) chưa mô hình, mà đó chính là phần "kiểm soát vùng" của vai.
- *R theo doc 79:* hiện chỉ là một mũi trói, chưa có structure. Bản đá ong: cắm càng neo đất (cast) → kim neo bay thành vật thể thật → trói → **vách đá ong mọc chắn sau mục tiêu** (signature) → vách vỡ vụn. R **đạt khi mô hình được vách**; hiện chưa đạt.

**4 · Stat.** Duel: **26 % / 37 %**. Xạ thủ đang chơi duy nhất là Nham Vũ (0,5 %, lệch), nên không có mốc tin được; trong trường 12 tướng, Lộc Thảo đứng thấp. Combo **36 % / 30 %**, cao nhất 66 % (Nham Vũ), không hạ được ai; TTK combo 0,9 s vì chỉ có chiêu và một đòn thường. **One-Combo Kill Test: không RED** (dưới 70 %). Nghi **UP**: sát thương xạ thủ phải đến từ đòn thường kéo dài, mà duel 26 % cho thấy chưa đủ. NOT_TESTED: giữ để bắn xuyên tầm xa (LMB), vùng E tồn tại và ẩn đồng minh, hàng rào R.

---

## 4. Ngư Đăng (`ngu_dang`) · đỡ đòn che chở (`tank_protect`)

**1 · Gap.** Có: candidate (nội tại Đèn Dẫn Lối: mỗi roi trúng rút 0,5 s hồi chiêu; LMB roi xích 3 m; Q Móc Dẫn skillshot 11 m × 1,2 m, windup 0,5 s, kéo + choáng; RMB Đèn Kết Bạn khiên quanh đèn; E Quét Xích vùng 3,5 m, chậm; R Lồng Vọng vùng 5 m quanh mình, trói). Doc 03 §10: dị chủng vực sâu, móc xích, đèn lõi nước. Chưa có gì khác.

**2 · Tạo hình.**
- **025 Gấu Ngựa Đeo Chuông (Moon Bear)** — *khuyến nghị.* Đúng vai đỡ đòn trong doc 74: rung chuông gây choáng. Thân to vai nặng giữ được dáng 2,15 × 1,45 m. Chuông đồng trên xích thay đèn: roi xích-chuông, ném chuông móc kéo, chuông ngân thành khiên. "Vọng" trong Lồng Vọng thành tiếng chuông dội thành lồng âm. Giải thích trong COLINH: chuông đồng là vật chứa ký ức; tiếng ngân của nó trói người. Đông Sơn chỉ là hoa văn trên chuông. Rủi ro: so với Volibear, Ursa, Zuka và Brewmaster phải cấm sấm, cấm gấu trúc, cấm say.
- **005 Người Băng Nhũ (Icicle Sentinel)** — phương án dự phòng. Doc 74 xếp vai đỡ đòn, có cột băng chặn lối, và lồng cột băng là vách lồng có sẵn. Rủi ro: trùng bảng màu với Hàn Chi (naga băng, tướng chưa làm).

**3 · Skill fit (025).**
- *Vẫn hợp:* LMB (roi xích-chuông 3 m), Q (ném chuông trên xích là vật thể thật, kéo + choáng), E (quét xích-chuông vòng tròn, chậm), R (lồng ngân quanh mình).
- *Phải viết lại: 2.*
  - **RMB Đèn Kết Bạn → "Chuông Kết Bạn":** ném chuông nhỏ cắm đất; đồng minh quanh chuông nhận khiên khi nó ngân. Giữ phần nhặt đèn thành chạm chuông.
  - **Nội tại Đèn Dẫn Lối → "Chuông Dồn":** mỗi roi trúng cộng một nhịp ngân, rút hồi chiêu thường. Cần **giới hạn số lần mỗi chiêu** để giữ ý và độ khó; xem mục Stat.
- *Hình học doc 76:* Q windup 0,5 s cần telegraph dày (đường xích). Ở R, vách lồng chặn đường và chặn đạn chưa mô hình, mà đó chính là giá trị của tank che chở. Lab đang coi R chỉ là một vùng trói.
- *R theo doc 79:* gấu đứng dậy gầm, giật chuông (cast) → ba vòng chuông đồng ảo hạ xuống thành lồng (signature) → tiếng ngân dội (impact, trói) → vòng vỡ thành tiếng tàn. Hình thì đạt, nhưng phần vách chặn chưa mô hình. R: **đạt về ý**, chưa đạt phần cơ chế.

**4 · Stat.** Duel: **18 % / 24 %**. Tank đang chơi (Mộc Lẫm) đạt 78/80 %. Tank được chấm theo giá trị đội, nhưng duel này vẫn thấp. Combo **52 % / 42 %** (cao nhất 92 % lên Nham Vũ), TTK 12 s, không hạ ai. **One-Combo Kill Test: RED vì reset, không phải vì sát thương**: `passive:cdr` kích 8 lần trong một combo, chiếm 165 cờ đỏ. Theo doc 73, tung lại chiêu trong một combo là RED; nội tại hiện cho phép làm vậy. Đây là **lỗi thiết kế cần sửa trước tune**. Đây là ghi nhận audit; không tune. NOT_TESTED: đèn nằm đất cho đồng minh nhặt, vách lồng chặn đường/đạn, giá trị khiên cho đội.

---

## 5. Cốt Bện (`cot_ben`) · đỡ đòn càn lướt (`tank_engage`)

**1 · Gap.** Có: candidate (nội tại Bình Khóc: chiêu trúng đốt % máu tối đa và giảm hồi máu; LMB cưa 2 m; Q Móc Dài skillshot 12 m × 1,1 m, bị lính chặn, kéo; RMB Khạc Mù "nón độc" chậm nặng; E Hàm Đá chỉ định 2,5 m, sát thương theo máu đã mất, hồi máu; R Nuốt Bóng chỉ định 3 m, nuốt tướng). Doc 03 §11: khổng thể xương-hợp kim, sườn rỗng, móc dài, hàm năng lượng. Chưa có gì khác.

**2 · Tạo hình.**
- **008 Người Bùn Ruộng (Paddy Golem)** — *khuyến nghị.* Đúng vai đỡ đòn trong doc 74: kéo địch sa lầy. Khối tròn đặc khác hẳn Mộc Lẫm và Hạo Nhật. Bừa tre thay móc dài; khạc bùn thay khạc độc; R nuốt thành vùi mục tiêu vào bụng bùn, bớt ghê mà vẫn giữ được fantasy. Giải thích trong COLINH: bùn ruộng thấm ký ức mùa vụ của các Cổ Linh nông thần. Rủi ro: so với Zac phải giữ bùn đặc, không co giãn, không tách mảnh. Rig dễ.
- **031 Trâu Cày Thần (Plough Buffalo)** — phương án dự phòng. Đỡ đòn, húc ủi, cày xẻ rãnh. Nhưng không có nguồn tự nhiên cho móc và nuốt, nên phải viết lại 3 chiêu.

**3 · Skill fit (008).**
- *Vẫn hợp:* nội tại (bùn chua ăn mòn đốt % máu và giảm hồi), Q (bừa tre ném thành vật thể thật, bị lính chặn, kéo về), R (vùi bùn: nạn nhân bất động trong bụng golem; cả hai không thể bị chọn).
- *Phải viết lại: 2.*
  - **LMB Cưa Xương → "Vả Bùn":** tát bùn hai nhịp. Giữ đòn đôi, vốn chưa mô hình.
  - **E Hàm Đá → "Vục Bùn":** vục bàn tay bùn vào mục tiêu, sát thương theo máu đã mất, hồi máu theo sát thương. Golem không có hàm, nên đổi động tác nhưng giữ số liệu.
- *Hình học doc 76:* **sai lệch rõ nhất của lane.** RMB mô tả "khạc **nón**" nhưng candidate dùng `aim: area`, tròn 3,5 m, tầm 3 m. Phải là **Cone AoE** có `arc` và `range`, vẽ preview hình quạt đặc (một khối bùn phun), không vẽ thành fan đạn. Q bị lính chặn khớp với quy tắc chặn đạn, nhưng chặn bởi thân còn NOT_TESTED.
- *R theo doc 79:* R hiện tại là nuốt chỉ định, ý mạnh nhưng chưa có thời lượng nhịp. Bản golem: dang hai tay bùn (cast) → mục tiêu chìm dần vào bụng, mạ trên lưng dựng đứng (signature) → nhả ra kèm vũng bùn chậm (impact) → bùn khô nứt. R: **đạt về ý**, còn thiếu template và PASS_ENGINE (tình trạng không thể bị chọn của hai bên phải thử trong engine).

**4 · Stat.** Duel: **53 % / 43 %**, cao nhất trong 6 tướng lane a ở phút 6 (thắng Tĩnh Lôi 97 %). Combo **39 % / 32 %**, TTK 0,9 s, không hạ ai. **One-Combo Kill Test: không RED.** Với vai tank, đây là mức hợp lý; giá trị đội gồm kéo, gỡ một mục tiêu bằng R và cắt hồi máu. NOT_TESTED: đòn đôi LMB, Cone RMB (Lab đang tính là vùng tròn, nên số trúng có thể sai), giảm hồi máu trước hút máu (không có field).

---

## 6. Sấm Kha (`sam_kha`) · đấu sĩ mở giao tranh (`fighter_tank`)

**1 · Gap.** Có: candidate (nội tại Tâm Dương: sau chiêu, nhát chùy kế nện sấm; LMB chùy 2 m; Q Trời Chẻ Nhánh chỉ định 7 m, sét nảy; RMB Song Dương skillshot 9 m × 3,2 m xuyên, húc lùi; E Nhịp Bão tự tăng tốc đánh và tốc chạy; R Đất Tách skillshot 13 m × 2,6 m xuyên, choáng). Doc 03 §13: thú nhân dạng ram, sừng chĩa lên, chùy sấm gọi hai ram năng lượng. Chưa có gì khác.

**2 · Tạo hình.**
- **039 Tê Giác Một Sừng (Javan Rhino)** — *khuyến nghị.* Thân đỡ đòn trục lao, chạy đà dài, giẫm rung đất. R Đất Tách thành cú giẫm xẻ đất. Sừng nứt phát sáng là nguồn sét. Giải thích trong COLINH: ký ức một loài đã mất, được Tinh Thạch phục dựng. Không có tê giác trong LoL hoặc Dota, nên uniqueness tốt hơn 031. Rủi ro: phải cấm giáp chiến binh kim loại; độ nặng nề gần Thạch Hộ (tướng chưa làm). Lưu ý: phải đứng hai chân khi đánh để giữ chùy, hoặc bỏ chùy và dùng sừng (xem phần viết lại).
- **017 Người Sắt Rèn (Forgeiron)** — phương án dự phòng. Đấu sĩ dùng búa đe, đòn nung đỏ dần rồi "tôi nước" nổ hơi; khớp nội tại "sau chiêu nện mạnh". Rủi ro: so với Ornn phải không có dê hoặc sừng.

**3 · Skill fit (039).**
- *Vẫn hợp:* nội tại (sau chiêu, cú húc sừng kế nổ sét), E Nhịp Bão (chạy đà, tăng tốc đánh và tốc chạy, khớp kiểu "chạy đà dài"), R (giẫm hai chân trước xẻ một đường nứt dài).
- *Phải viết lại: 2.*
  - **RMB Song Dương → "Song Đà":** hai bóng tê giác ánh sáng lao ra **theo hai làn (fan 2 đạn thật, lệch khoảng 15°)**, xuyên hàng, húc lùi. Không còn ram vì ram không còn trong look.
  - **LMB Chùy Sấm → "Húc Sừng":** đánh gần 2 m bằng sừng sét. Đổi vũ khí theo look, giữ số liệu.
  - Q Trời Chẻ Nhánh giữ được: sét bắn ra từ sừng nứt.
- *Hình học doc 76:* RMB "hai nhánh" nhưng đang mô hình là **một** skillshot rộng 3,2 m, nên phải tách thành fan 2 đạn. Q nảy sang mục tiêu khác chưa mô hình; Lab cho trúng mục tiêu chính hai lần, nên sát thương thật có thể **thấp hơn** Lab.
- *R theo doc 79:* R hiện tại là đường nứt choáng; rủi ro trùng Fissure của Earthshaker. Bản tê giác cần signature riêng: sừng nạp sáng (cast) → giẫm, **đường nứt phát sáng chạy dọc, vách đá dựng hai bên rồi đổ vào giữa** (signature) → choáng → bụi lắng. R: **đạt nếu thêm vách đổ**; hiện có rủi ro uniqueness.

**4 · Stat.** Duel: **53 % / 54 %**, gần cân. Combo **47 % / 38 %** (cao nhất 84 % lên Nham Vũ), TTK 1,1 s, không hạ ai; newbie đến 68 %. **One-Combo Kill Test: không RED.** Với vai đấu sĩ/tank mở giao tranh, đây là mức cân nhất lane. NOT_TESTED: Q nảy, RMB húc lùi phụ thuộc địa hình.

---

## Bảng tổng hợp

| tướng | look khuyến nghị (doc 74) | chiêu viết lại (số) | R ok? | Lab | rủi ro |
|---|---|---|---|---|---|
| tinh_loi | 002 Người Sấm (dự phòng 038) | 2 (RMB, R) | Không; cần R mới Sấm Dội Trời | duel 35/26 % (UP); combo 90/74 %; **One-Combo RED** (hạ đấu sĩ 102 %) | trùng hệ `loi` với Sấm Kha; burst cao, duel yếu |
| lam_nghi | 034 Hươu Sao Gạc Đóm (dự phòng 019) | 1 (Q → fan) | Đạt về ý; thiếu template/mô hình | duel 17/24 %; combo 60/63 %; không RED; giá trị đội NOT_TESTED | Lillia; Q đang mô hình sai (1 đạn thay vì fan) |
| loc_thao | 030 Bọ Cạp Đá Ong (dự phòng 020) | 2 (Q, RMB) | Chưa; cần vách đá ong | duel 26/37 % (nghi UP); combo 36/30 %; không RED | Skarner/Sand King; rig 8 chân; mất chủ đề thực vật |
| ngu_dang | 025 Gấu Ngựa Đeo Chuông (dự phòng 005) | 2 (RMB, nội tại) | Đạt về ý; vách lồng chưa mô hình | duel 18/24 % (UP); combo 52/42 %; **RED reset**: cdr kích 8 lần mỗi combo | Volibear/Ursa; nội tại phải sửa trước tune |
| cot_ben | 008 Người Bùn Ruộng (dự phòng 031) | 2 (LMB, E) | Đạt về ý; cần PASS_ENGINE | duel 53/43 %; combo 39/32 %; không RED | Zac; RMB "nón" đang mô hình thành vùng tròn (sai doc 76) |
| sam_kha | 039 Tê Giác Một Sừng (dự phòng 017) | 2 (RMB → fan 2, LMB) | Đạt khi thêm vách đổ | duel 53/54 % (cân); combo 47/38 %; không RED | trùng Fissure của Earthshaker; nặng nề như Thạch Hộ |

Không vượt nhóm A–D. Look dùng trong lane a: 002, 034, 030, 025, 008, 039; dự phòng: 038, 019, 020, 005, 031, 017.

File: `docs/co-linh-than-chien/audit-18/a.md`
