# Audit 18 · Lane b · Tạo hình × kit × Lab

Phạm vi: `duc_nham`, `nanh_nui`, `kinh_ngon`, `mac_lien`, `tam_vu`, `han_chi`. Chỉ audit: không đổi runtime, candidate hay tài liệu chung. Look lấy từ nhóm E–G của doc 74 (041–070). Không dùng look đã đề xuất/chọn ở doc 75 (gồm bộ Bách Diện: vòng mặt nạ, bọ ngựa, rối nước*, cáo nhiều đuôi, tắc kè, vũ công gương) hay các đề xuất trong bảng "Ghép với 27 tướng" của doc 74 (023, 002, 092/088, **025/039 cho Nanh Núi**, 059/052 cho Sắc Nhiên, 021…). *Rối nước của Bách Diện là một ảnh khác, không phải look 063, nhưng creator đã chê "đáng sợ". Vì vậy 063 chỉ là phương án phụ.

## Hiện trạng chung (cả 6 tướng)

| Hạng mục | Có | Thiếu cho production |
|---|---|---|
| Kit | `tools/sim/candidates/<id>.yml` (chỉ Lab) | duyệt kit sau khi đổi look; chưa có trong `scripts/lib/data/heroes.yml` |
| Doc 03 | §14, 16–20 + hàng "Tạo hình V1" (silhouette cũ) | Doc 03 vẫn mô tả dáng cũ; drift theo AUDIT-TAO-HINH: look V1 chưa qua luật "phi người thường" |
| Look/prototype | Doc 74 ghi "giữ nguyên" (trừ Nanh Núi: 025/039) | chưa có prototype sheet (turnaround, silhouette, xám, 64 px) như Bách Diện |
| Model/rig/clip | **0**: không có trong `assets/registry.yml`, `manifest.yml`, `art/` | Blender build.py, rig, clip Idle/Walk/Basic/Q/RMB/E/R/Death |
| VFX/SFX | **0** trong `vfx-heroes.yml`, `hero-sfx.yml` | hệ VFX theo look, đạn là vật thể thật (`missiles.js`), cue SFX |
| Runtime | không | heroes.yml, bot policy, kitmech, UI icon/lore |

Theo doc 73 §5, mỗi tướng đang ở bước **kit candidate + Lab đỏ/cam**. Chưa tướng nào tới bước look duyệt, nên mọi bước sau còn trống.

## Phương pháp Lab

Lệnh theo doc 73 §2, `--cand`, revision `58663539ed6e`: `combo --n 100`, `duel --n 40 --minutes 6,15`, `team --n 300`. Chưa chạy `all --n 200`, nên các số dưới đây là **mẫu nhỏ**, cần chạy lại đủ trước khi tune. Ngưỡng `gates.yml` (proposal): duel trung bình 40–60 %, team hiện diện 42–58 %, combo <70 theo dõi · 70–89 burst cao · 90–99 cảnh báo · ≥100 review. Giao tranh team trung bình 2v2 20,3 s · 3v3 22,9 s · 5v5 25,0 s (trong dải 6–30 s). Lab không có TTK duel riêng; TTK ở đây là **thời gian hạ trong combo**.
NOT_TESTED chung (báo cáo Lab): chưa chạy engine (PASS_ENGINE); **hút máu, chí mạng, sát thương chuẩn, phản sát thương, câm lặng chưa được giả lập**; địa hình, tầm nhìn, bụi cỏ và thân chặn đạn (trừ passMinions) cũng chưa.

---

## 1. Dực Nham (`duc_nham`) · xạ thủ cơ động

**1. Gap.** Có: candidate (LMB Tia Cuội · Q Mảnh Nóng xuyên hàng · RMB Dấu Gọi gắn nhãn · E Vút Cánh lướt 5 m · R Dòng Sáng 16 m ×3 nhịp), doc 03 §14 "chim nhân cánh panel", doc 74 "giữ nguyên". Thiếu: look mới. Chim nhân sát Hương Mai (thần điểu), con chim của Nham Vũ và Talon/Quinn. Thiếu toàn bộ sheet, model, rig cánh, clip, VFX, SFX và runtime.

**2. Tạo hình.**
- **053 Người Giấy Dó** *(khuyến nghị)*: thân giấy dó cắt, dày 2 cm, bay phấp phới, "gấp mình thành chim". E Vút Cánh là lúc thân gấp thành cánh diều lượn qua vách, và Q/RMB bắn phi tiêu giấy thật. Về COLINH: một Cổ Linh đưa thư của thành phố tầng mây, ký ức in trên giấy. Look này giữ fantasy "lượn vách" mà không cần thân chim.
- **048 Hoa Gạo Tháng Ba**: xạ thủ đúng vai, hoa đỏ bắn như tên. Nhưng look này đi bộ, nên E lượn kém hợp. Đây cũng là phương án phụ của Tầm Vũ: chỉ một trong hai tướng được nhận 048.

**3. Skill fit (053).** Còn hợp: LMB thành phi tiêu giấy (đạn thật), Q Mảnh Nóng thành tờ giấy cháy cạnh xuyên hàng (skillshot, width 1,2), E Vút Cánh thành gấp diều lướt 5 m. Viết lại (1): **RMB Dấu Gọi → "Bùa Dán"**: phóng tờ giấy dán lên tướng; đòn kế xé bùa, nổ. Giữ cơ chế gắn nhãn và độ khó trung bình; chỉ đổi tên/fantasy, số giữ nguyên. Hình học (doc 76): R ghi chú "giữ để quét ngắm" nhưng mô hình là skillshot thẳng, lệch giữa tooltip và hit-test. Q "trúng tướng làm mới hồi chiêu" và RMB "nhãn tăng tầm" chưa mô hình. **R vs doc 79:** Dòng Sáng là tia dài ×3 nhịp, đọc được nhưng chung chung (giống Ezreal/Lucian). Khoảnh khắc riêng đề xuất: hàng trăm tờ giấy xếp thành một dải rồi bắn dọc. Hình học giữ nguyên. R đạt về tell (windup 0,4 s), **chưa đạt về signature**.

**4. Stat.** Duel TB: phút 6 **41,3 %**, phút 15 **34,4 % (UP, cam)**. Team: 2v2 **26,7 %**, 3v3 **30,0 % (UP, cam)**, 5v5 42,7 % (sát mép dưới). One-Combo: combo của Dực Nham không vào dải ≥90 % (an toàn). Ngược lại, Dực Nham bị hạ ≥100 % trong một combo bởi Tầm Vũ, Tĩnh Lôi, Hỏa Tủy, Vân Ấn, Hàn Chi và Mặc Liên (p15). **Kết luận: UP**, mỏng nhưng thiếu sát thương. NOT_TESTED: làm mới hồi Q, nhãn tăng tầm, bay qua địa hình, giữ quét R.

---

## 2. Nanh Núi (`nanh_nui`) · đỡ đòn phản công

**1. Gap.** Có: candidate (LMB Rìu Nanh · Q Tiếng Gầm khiêu khích · RMB Lời Thách chém + hút máu · E Nợ Va Chạm xoay rìu đẩy lùi + khiên · R Phán Núi nhảy 6 m, choáng, kết liễu theo máu mất), doc 03 §16 "thú đá dựng, rìu". Doc 74 đề xuất 025/039 (nhóm C, thuộc lane a). Lane b không lấy 025/039 để khỏi chạm lane a. Thiếu: look duyệt, sheet và toàn bộ sản xuất.

**2. Tạo hình.**
- **069 Cối Xay Thóc** *(khuyến nghị)*: thân trên là hai thớt cối, nghiền liên tục. Fantasy "gánh nợ" thành "thóc dồn vào cối": đòn nhận nạp vào thớt, và E xoay cối xả ra. Khối tròn rộng 1,8 m đọc rõ là tank. Về COLINH: cỗ máy Tinh Thạch nghiền ký ức. Rủi ro Garen/Juggernaut (xoay): xoay là cối, không kiếm.
- **064 Tượng Hộ Lăng**: tank đá cầm hốt, hóa đá. Hợp R giáng hốt nhưng trùng chất đá với Thạch Hộ, Trắc Nham và look 013. Vì vậy chỉ là phương án phụ.

**3. Skill fit (069).** Còn hợp: E Nợ Va Chạm (cối xoay xả, area r 3,5), R Phán Núi (cối bật lên rồi giáng xuống, target 6 m, choáng). Viết lại (2):
- **LMB Rìu Nanh → "Tay Cối"**: quai cối nện cận chiến 2 m.
- **Q Tiếng Gầm → "Tiếng Nghiến"**: cối nghiến kêu rít theo nón trước mặt, khiêu khích.

Vai và độ khó giữ. Hình học (doc 76): **Q được ghi là "nón" nhưng mô hình là area tròn r 4 quanh mình**, cần arc thật. Khiêu khích đang mô hình bằng charm kéo về, không phải taunt. **R vs doc 79:** nhảy giáng + kết liễu là motif quen (Darius/Garen). Với 069, khoảnh khắc riêng là cối rơi úp, đất nứt vòng xay. R đạt về cơ chế, signature cần bàn.

**4. Stat.** Duel TB: phút 6 45,5 %, phút 15 **26,2 % (UP, cam)**. Team (thước đo đúng cho tank): 2v2 **34,1 % (UP)**, 3v3 53,3 %, 5v5 42,4 % → 44,4 % (mép dưới). One-Combo: không gây ≥90 %, đúng vai tank. **Kết luận: UP cuối trận / 2v2.** NOT_TESTED: **hút máu RMB không được giả lập** (field chưa đọc), nên số UP có thể là do thiếu hồi máu; duy trì dây thách; taunt thật.

---

## 3. Kính Ngôn (`kinh_ngon`) · hỗ trợ phép

**1. Gap.** Có: candidate (LMB Mảnh Gương · Q Tia Mượn tự tìm, hồi theo sát thương · RMB Bàn Tay Xa nhấc-ném, choáng · E Phiến Che khiên vùng · R Vỏ Vọng lặp chiêu vừa dùng ×1–1,5), doc 03 §17 "lõi gương pha lê". **Xung đột mới:** Bách Diện đã thành Vũ Công Gương Đồng (doc 75), nên lõi gương của Kính Ngôn trùng chất liệu và trùng fantasy "phản chiếu". Look phải đổi. Thiếu: toàn bộ sản xuất.

**2. Tạo hình.**
- **066 Đèn Kéo Quân** *(khuyến nghị)*: đèn lục giác giấy-tre là thân, bóng chiến binh xoay quanh. R "lặp lại chiêu" thành chiếu bóng của chiêu vừa dùng lên vách đèn rồi phóng ra lần nữa. RMB là một bóng tay vươn ra nhấc địch. Về COLINH: một máy chiếu ký ức Tinh Thạch. Rủi ro Mị Đăng/Thresh (đèn): đèn là thân, không cầm tay, và màu ấm giấy khác tím-khói của Mị Đăng.
- **063 Con Rối Nước**: tay điều khiển vô hình, sát với Bàn Tay Xa. Nhưng creator từng chê bộ rối "đáng sợ", nên chỉ là phương án phụ.

**3. Skill fit (066).** Còn hợp: RMB Bàn Tay Xa (bóng tay, skillshot width 1,3), E Phiến Che (vách giấy đèn dựng quanh đồng minh). Viết lại (3):
- **LMB Mảnh Gương → "Bóng Lướt"**: hình bóng nhỏ bay thẳng, đạn thật.
- **Q Tia Mượn → "Bóng Hút"**: bóng đèn chụp lên địch, hút sinh lực về đồng minh gần nhất. Giữ target/luôn trúng.
- **R Vỏ Vọng → "Chiếu Lại"**: chép **chiêu cuối cùng mà một tướng địch trong tầm 9 m vừa dùng** rồi chiếu lại.

Đây đúng là lời hứa "Người Mượn Phép" ở doc 03; bản Lab chỉ lặp chiêu của chính mình. Độ khó vẫn cao. Hình học: Q luôn trúng là chủ ý (target), không lệch doc 76. R mimic mô hình theo "chiêu thường vừa dùng" của chính mình, không có hình học riêng. **R vs doc 79: KHÔNG ĐẠT**: lặp chiêu của mình không có khoảnh khắc đặc trưng, tell hay counterplay. Bản chép kit địch chưa mô hình.

**4. Stat.** Duel TB: phút 6 **25,5 %**, phút 15 **33,3 % (UP, cam)**. Duel ít quan trọng với support, nhưng team cũng thấp: 2v2 **30,2 % (UP)**, 3v3 46,0 %, 5v5 43,9 % (mép dưới). One-Combo: 107,6 % lên Nham Vũ (target-behind, p6), newbie chỉ 54,6 % và 0 % hạ. Nham Vũ là ngoại lệ mỏng, và combo hoàn hảo tốn 11,9 s, tức có phản ứng. **Kết luận: UP theo giá trị đội.** NOT_TESTED: R chép kit địch; hồi máu đã mô hình qua sát thương nhưng hút máu ở item chưa được giả lập.

---

## 4. Mặc Liên (`mac_lien`) · pháp sư dọn giao tranh

**1. Gap.** Có: candidate (LMB Búng Son · Q Ba Nét ba luồng mực · RMB Mực Nở cầu xuyên lớn dần · E Lách Nét lướt + nổ · R Nét Cuối quét r 5,5, hất 4 m), doc 03 §18 "thực thể mực, cọ lưỡi". Doc 74 giữ nguyên, nhưng thân "nét cọ" là hình 2D, khó đọc từ trên cao, và sát Sắc Nhiên (họa sĩ). Thiếu: toàn bộ sản xuất.

**2. Tạo hình.**
- **052 Người Sơn Mài** *(khuyến nghị)*: thân sơn mài đen-son bóng, khảm vỏ trứng. Giữ nguyên tên "Vẽ Nước Đỏ" (son = sơn son), nhưng thân **cứng bóng**, không còn là nét mực lỏng. Hai lưỡi mỏng thành **cọ-lưỡi sơn son**. Về COLINH: lớp sơn phủ ký ức qua địa tầng. Vai ở doc 74 là sát thủ; ở đây chuyển sang pháp sư. Rủi ro trùng Mặc Liên được doc 74 tự ghi, chính vì là cùng một ý nên hợp nhất là đúng. Lưu ý: doc 74 ghi 052 là phương án phụ của Sắc Nhiên (đề xuất chính là 059). Nếu Sắc Nhiên nhận 052, chuyển sang look sau.
- **042 Linh Sen Hồ**: pháp sư, sen nổ hạt. Ba Nét thành ba hạt sen theo quạt, R sen nở hất tung. Rủi ro mềm mại kiểu Hương Mai.

**3. Skill fit (052).** Còn hợp: LMB Búng Son, RMB Mực Nở (thành quả sơn đặc), E Lách Nét (trượt bóng, nổ sơn), R Nét Cuối (một nhát cọ sơn son khổng lồ). Viết lại (0) về fantasy, chỉ đổi tên chất liệu mực → sơn. Hình học (doc 76): **Q Ba Nét là "ba luồng" nhưng mô hình là một skillshot width 2,4**: phải là **quạt 3 đạn thật** (`fanDirs`), không phải nón AoE. RMB "lớn dần theo quãng" chưa mô hình. E là `aim: target` nhưng đúng ra là lướt tới điểm (ground). **R vs doc 79:** vùng r 5,5, delay 0,5 s, hất văng, có tell và khoảnh khắc riêng (nhát cọ quét lộ vàng dưới sơn). **Đạt.**

**4. Stat.** Duel TB: phút 6 44,9 %, phút 15 51,5 % (ổn). Team: 43,2 / 51,6 / 53,5 % (ổn). One-Combo: 90–98 % (cảnh báo vàng) lên Dực Nham, Hàn Chi, Tầm Vũ, Sắc Nhiên; 100,6–107,4 % (cam) lên Nham Vũ và Dực Nham p15; newbie hạ Nham Vũ 90 % lượt (target-behind). Burst cao nhưng đúng vai pháp sư burst. **Kết luận: cân, burst ở mép.** NOT_TESTED: cầu lớn dần, quạt 3 luồng thật (hiện là một đường rộng, nên có thể sai lệch sát thương).

---

## 5. Tầm Vũ (`tam_vu`) · xạ thủ tầm xa

**1. Gap.** Có: candidate (LMB Lao Dài 12,5 m · Q Mưa Đá vùng r 3,5 · RMB Ngắm Tĩnh tăng tốc đánh · E Bật Lùi 4 m, đẩy, gỡ trói · R Săn Một Bóng 25 m, windup 1,1 s), doc 03 §19 "dị chủng chân dài như chân máy, lao-bow". Doc 74 giữ nguyên hoặc 006 (nhóm A, lane a). Thiếu: toàn bộ sản xuất.

**2. Tạo hình.**
- **043 Tre Đằng Ngà** *(khuyến nghị)*: thân tre ngà cao 2,3 m, mảnh, cong; khớp khung 2,50 × 0,75 m của doc 03. "Uốn tích lực rồi búng lao" chính là R windup dài 1,1 s, và "bật như cần tre" chính là E. Lá xòe trên đỉnh giữ silhouette ở 20 m. Về COLINH: Cổ Linh gác tuyến di cư, thân tre làm cần phóng. Rủi ro: quá mảnh; lá xòe là bắt buộc. Vai ở doc 74 là đấu sĩ cầm giáo; ở đây tre là cần phóng lao.
- **048 Hoa Gạo Tháng Ba**: xạ thủ, hoa bắn như tên. Q Mưa Đá thành mưa hoa gạo cháy. Phương án phụ chung với Dực Nham; chỉ một tướng nhận.

**3. Skill fit (043).** Còn hợp: LMB Lao Dài (lao tre, đạn thật), RMB Ngắm Tĩnh (cắm gốc xuống đất), E Bật Lùi, R Săn Một Bóng (uốn cả thân rồi búng). Viết lại (1): **Q Mưa Đá → "Mưa Dăm Tre"**: búng lên trời một bó dăm rơi nhiều lượt. Giữ vùng r 3,5. Mưa đá không có nguồn từ thân tre: theo luật "chiêu xuất phát từ đâu", đá rơi từ trời không khớp. Hình học: RMB tăng tầm khi ngắm chưa mô hình. **R vs doc 79:** tell dài, tầm 25 m, một phát; đúng counterplay. Nhưng motif snipe toàn bản đồ sát Jhin/Caitlyn/Ashe. Khoảnh khắc riêng: cả thân tre uốn cong thành vòng cung có tell rõ. **Đạt (uniqueness vừa).**

**4. Stat.** Duel TB: phút 6 41,9 %, phút 15 43,3 % (ổn). Team: 2v2 48,9 %, 3v3 55,0 %, **5v5 60,9 % (OP)**. One-Combo: **ĐỎ**: hạ Bách Diện (đấu sĩ) bằng một combo, 101,5–103,0 % ở phút 6/10/15. ≥100 % (cam) lên gần hết mục tiêu mỏng: Dực Nham, Hàn Chi, Mặc Liên, Lộc Thảo, Sắc Nhiên, Tam Dấu, Kính Ngôn (p15)… Newbie hạ Nham Vũ 100 % lượt; nhanh nhất 5,45 s. Cảnh báo `keeneye` proc 5 lần/combo. **Kết luận: OP về burst.** NOT_TESTED: tầm tăng khi ngắm; tầm nhìn 25 m (Lab không có fog, nên R có thể còn mạnh hơn).

---

## 6. Hàn Chi (`han_chi`) · pháp sư khống chế

**1. Gap.** Có: candidate (LMB Nanh Sương · Q Rắn Lạnh xuyên hàng, dấu lạnh · RMB Mưa Nanh vùng làm chậm r 3,5 · E Hơi Giá nón trói · R Vành Phán r 6, khép 0,9 s rồi choáng), doc 03 §20 "naga băng". Naga băng sát Cassiopeia/Lissandra/Naga Siren và trùng thân rắn với Ngư Đăng/Kha Tàn. Thiếu: toàn bộ sản xuất.

**2. Tạo hình.**
- **061 Đồng Hồ Nước Khắc Lậu (đóng băng)** *(khuyến nghị)*: ba bình gốm-đồng xếp tầng nhỏ giọt, tạo khối bậc thang dễ đọc. "Bình dưới đầy thì xung choáng" chính là R Vành Phán (đếm giọt, khép, nổ). Giọt nước đóng băng thành nanh. Về COLINH: lõi điều nhiệt đo ký ức, khớp tiểu sử "quản lý lõi điều nhiệt". Vai ở doc 74 là tank, chuyển sang pháp sư. Rủi ro: Zilean/Clockwerk (không bánh răng) và trùng chủ đề thời gian với Sa Tẫn. Dùng nước/băng, không dùng cát.
- **055 Bình Gốm Men Lam**: men lam trắng-xanh lạnh, mảnh vỡ bắn ra như Mưa Nanh. Rủi ro trùng 018.

**3. Skill fit (061).** Còn hợp: LMB Nanh Sương (giọt băng), RMB Mưa Nanh (bình trên đổ, nước đóng băng rơi), R Vành Phán. Viết lại (1): **Q Rắn Lạnh → "Dòng Giá"**: một dòng nước tràn từ bình dưới chảy thẳng, đóng băng thành vệt, xuyên lính, để dấu lạnh. Hình học và độ khó giữ; bỏ hình rắn vì thân không còn là naga. Hình học (doc 76): **E Hơi Giá là "nón trước mặt" nhưng mô hình là vùng tròn r 4,5 quanh mình**, cần arc thật. **R vs doc 79:** vòng 6 m khép trong 0,9 s là tell rõ, có lối thoát, choáng cả vùng. Cảnh ba bình đổ một lượt thành vành băng là signature tốt. **Đạt.**

**4. Stat.** Duel TB: phút 6 **30,1 % (UP, cam)**, phút 15 40,1 %. Team: 2v2 46,9 %, 3v3 57,7 %, **5v5 66,1 % (OP, cao nhất lane)**. One-Combo: ≥100 % (cam) lên Nham Vũ, Dực Nham và Tầm Vũ (p15); newbie hạ Nham Vũ 70–90 % lượt (target-behind). **Kết luận: lệch pha**: yếu 1v1 sớm, OP giao tranh lớn vì R r 6 choáng nhiều người. NOT_TESTED: nón thật của E (đang tròn nên trúng nhiều hơn tooltip); thân chặn đạn.

---

## Phát hiện xuyên tướng

1. **Ba lệch hình học cone↔vòng tròn** (Nanh Núi Q, Hàn Chi E) **và quạt↔đường rộng** (Mặc Liên Q): Lab đang cho trúng rộng hơn tooltip, nên mọi số liên quan bị thổi phồng.
2. **Hút máu không được giả lập** làm Nanh Núi và hồi máu item của Kính Ngôn bị đánh giá thấp. Cần sửa engine Lab trước khi tune hai tướng này.
3. **Kính Ngôn trùng gương với Bách Diện**: buộc đổi look, nên không thể "giữ nguyên" như doc 74.
4. Dải One-Combo có nhiều cờ dồn vào **Nham Vũ** làm nạn nhân (ngoại lệ live), nên cần đọc theo mục tiêu.

## Bảng tổng

| hero | recommended look | skills to rewrite (count) | R ok? | Lab verdict | risk |
|---|---|---|---|---|---|
| Dực Nham `duc_nham` | 053 Người Giấy Dó (phụ 048) | 1 (RMB → Bùa Dán) | tell đạt, signature chưa | **UP** (duel p15 34 %, team 2v2 27 %, 3v3 30 %) | giấy mỏng khó đọc khi xoay cạnh; giữ viền phe |
| Nanh Núi `nanh_nui` | 069 Cối Xay Thóc (phụ 064) | 2 (LMB → Tay Cối, Q → Tiếng Nghiến) | cơ chế đạt, motif quen | **UP** muộn/2v2 (duel p15 26 %, team 2v2 34 %); hút máu NOT_TESTED | Q mô hình tròn thay nón; xoay sát Garen |
| Kính Ngôn `kinh_ngon` | 066 Đèn Kéo Quân (phụ 063) | 3 (LMB, Q, R → Chiếu Lại) | **không** (R lặp chiêu mình) | **UP** theo đội (2v2 30 %, 5v5 44 %) | trùng gương Bách Diện; đèn sát Mị Đăng |
| Mặc Liên `mac_lien` | 052 Người Sơn Mài (phụ 042) | 0 (đổi chất mực → sơn) | đạt | cân, burst mép (90–107 %) | Q phải là quạt 3 đạn; 052 có thể bị Sắc Nhiên lấy |
| Tầm Vũ `tam_vu` | 043 Tre Đằng Ngà (phụ 048) | 1 (Q → Mưa Dăm Tre) | đạt, uniqueness vừa | **OP**: combo ĐỎ hạ đấu sĩ, 5v5 61 % | snipe sát Jhin/Caitlyn; thân tre quá mảnh |
| Hàn Chi `han_chi` | 061 Đồng Hồ Nước đóng băng (phụ 055) | 1 (Q → Dòng Giá) | đạt | **OP** 5v5 66 %, UP duel p6 30 % | E tròn thay nón; chủ đề thời gian sát Sa Tẫn |

Mẫu Lab nhỏ (combo n100, duel n40, team n300, rev `58663539ed6e`): chạy `all --cand --n 200` trước khi tune. Không look nào lấy ngoài nhóm E–G.

File: `docs/co-linh-than-chien/audit-18/b.md`
