# Hệ trang bị Cổ Linh — candidate V0.1

Ngày 09/10/2026. **PROPOSAL dùng nghiên cứu và mô phỏng, chưa phải USER LOCK, chưa đổi gameplay ship, chưa chứng nhận cân bằng.** Nguồn runtime đối chiếu: `ad7948ab9710ac1adb2b561049821da8e0cb1da8`. Đọc [nghiên cứu 58](58-nghien-cuu-va-thiet-ke-he-item.md) trước. Bộ số máy đọc duy nhất của proposal: [candidate-v01.json](../../tools/balance/items/candidate-v01.json). Không chép bảng số này vào một catalog thứ hai.

## 1. Ý tưởng riêng của Cổ Linh

Trang bị là các cấu kiện của văn minh Cổ Linh tồn tại khoảng một triệu năm trước năm 2300, được tái dựng trong Hồi Tưởng Đồng Bộ. Tinh thể lưu ký, hợp kim dẫn mạch và cấu trúc sinh học kết hợp thành thiết bị chiến đấu. Một vài đường tròn đồng tâm, cánh chim cách điệu hay khắc mạch là điểm nhận diện; không biến mọi món thành cổ vật lịch sử hoặc đồ nghi lễ có thật. Năm 2300 là lớp khám phá ký ức, không phải thời đại chế tạo những vũ khí này.

Học cách đối thủ tạo lựa chọn, đường ghép và đánh đổi, không lấy tên, icon, model, lore hay cả gói số của họ. Các cơ chế như giáp, nhịp đánh và hồi máu là ngôn ngữ gameplay phổ biến; ý nghĩa, giới hạn và hình thức của mỗi món dưới đây được thiết kế cho kit sáu tướng Cổ Linh. Không tuyên bố mọi cơ chế là chưa từng xuất hiện ở game khác.

## 2. Phạm vi nhỏ đủ tạo build

24 món: **8 cơ bản, 6 trung cấp, 8 hoàn chỉnh, 2 relic**. Sáu ô đồ và tối đa một relic giữ như baseline. Cơ bản chủ yếu một chỉ số; trung cấp là điểm ghép; hoàn chỉnh có lợi ích theo cách chơi. Core nghĩa là món chủ lực của build, không phải tầng thứ tư. Không thêm courier, backpack, tháo đồ, crit, lifesteal, giảm hồi chiêu hay xuyên kháng trong vòng này.

Mỗi completed tối đa một bản; intermediate tối đa hai; component tối đa sáu, riêng Bước Vân một. Chỉ số AS giữ luật **nhân từng món** như runtime, các chỉ số còn lại cộng. AP/MR/tốc chạy có dữ liệu nhưng runtime phải bổ sung consumer trước khi đưa proposal vào game. Không coi việc tool đọc được field là game đã hỗ trợ.

### Cơ bản và trung cấp

| ID | VI / EN | Giá | Chỉ số proposal | Công thức |
|---|---|---:|---|---|
| mach_tinh | Mảnh Mạch / Vein Shard | 250 | 90 HP | Mua độc lập |
| dong_van | Phiến Đồng Vân / Cloud-Bronze Plate | 240 | 12 giáp | Mua độc lập |
| ngoc_am | Ngọc Âm / Hushed Jade | 240 | 12 kháng phép | Mua độc lập |
| nanh_mach | Nanh Mạch / Vein Fang | 300 | 10 AD | Mua độc lập |
| kinh_luu | Kính Lưu Ký / Memory Lens | 300 | 18 AP | Mua độc lập |
| soi_nhip | Sợi Nhịp / Pulse Filament | 300 | 10% AS | Mua độc lập |
| hat_sinh | Hạt Sinh / Living Seed | 200 | 1 HP/s | Mua độc lập |
| buoc_van | Phù Bước Vân / Cloudstep Token | 300 | 0,25 m/s | Một bản, độc lập, chưa nâng cấp |
| iron_plate | Giáp Thiết Mạch / Vein-Iron Plate | 550 | 24 giáp | 2 Đồng Vân + 70 |
| quickstring | Dây Cung Nhịp / Pulse Bowstring | 650 | 21% AS | 2 Sợi Nhịp + 50 |
| kinh_song | Kính Song Ký / Twin-Memory Lens | 700 | 36 AP, 90 HP | Kính Lưu Ký + Mảnh Mạch + 150 |
| binh_mach | Bình Dưỡng Mạch / Vein-Nurturing Vessel | 750 | 180 HP, 1 HP/s | 2 Mảnh Mạch + Hạt Sinh + 50 |
| nanh_khep | Nanh Khép / Joined Fangs | 750 | 20 AD | 2 Nanh Mạch + 150 |
| an_tinh | Ấn Tĩnh Mạch / Stillvein Seal | 600 | 24 kháng phép | 2 Ngọc Âm + 120 |

Hai Sợi Nhịp cho hệ số `1,1 × 1,1 = 1,21`; Dây Cung Nhịp giữ 21%, không giảm tốc đánh khi ghép. Đây là lỗi đã sửa sau review độc lập vòng 1. Vàng đầu 500 cho người chơi chọn hai component phòng thủ hoặc HP+hồi phục; không mua ngay món vừa cộng lớn HP vừa cộng lớn giáp như catalog baseline.

### Hoàn chỉnh: công dụng, bản sắc, đối phó

| ID / VI / EN | Giá và công thức | Chỉ số | Nội tại proposal và cách đối phó |
|---|---|---|---|
| oathguard_plate — Giáp Minh Ước / Concord Plate | 1600 = Giáp Thiết 550 + Mảnh Mạch 250 + Ấn Tĩnh 600 + 200 | 240 HP, 35 giáp, 24 MR | Khi khiên **từ kit** hết hoặc vỡ sau tối thiểu 0,5s, nhận khiên 4% maxHP trong 2s, CD12s. Không kích từ khiên item, không dây chuyền. Đối thủ kéo giao tranh sau khi khiên nhỏ hết. |
| keeneye — Mắt Sắc / Farseeing Eye | 1700 = Dây Cung 650 + Nanh Khép 750 + 300 | 30 AD, 25% AS | Đòn thứ tư thêm 12 vật lý; chỉ tướng/lính/neutral, không công trình. Đếm reset nếu 4s không trúng hoặc chết. Đối thủ cắt nhịp, rời tầm. |
| thornseed_quiver — Ống Tên Gai Ký / Memory-Thorn Quiver | 1400 = Dây Cung 650 + Mảnh Mạch 250 + 500 | 180 HP, 25% AS | Ba đòn liên tiếp cùng một tướng làm chậm 15% trong 1s, CD8s; đổi mục tiêu, chết hoặc quá 4s thì reset đếm. Chậm lấy mức mạnh nhất, không cộng với chậm kit. Đối thủ ngắt chuỗi hoặc áp sát bằng kỹ năng. |
| heartforge — Tâm Lò Dưỡng Ký / Memory-Nurturing Heartforge | 1500 = Bình Dưỡng 750 + Mảnh Mạch 250 + 500 | 350 HP, 3 HP/s | Không gây/nhận damage tướng trong 8s thì thêm 2 HP/s; damage vào khiên cũng tính combat; anti-heal giảm hồi. Chạm lại bằng poke sẽ ngắt hồi bổ sung. |
| lo_than_ky — Lò Than Ký / Ember Archive | 1700 = Kính Song 700 + 2 Kính Lưu 600 + 400 | 85 AP, 120 HP | Hit chiêu đầu gây damage tướng thêm `20 + 0,1 AP` phép, CD8s toàn item. Không tính DOT/item damage, không proc nhiều lần từ chiêu đa-hit. Đối thủ né hit mở đầu hoặc chống phép. |
| dang_hoi_am — Đăng Hồi Âm / Echo Lantern | 1800 = Kính Song 700 + Kính Lưu 300 + Ấn Tĩnh 600 + 200 | 70 AP, 120 HP, 24 MR | Chiêu gây damage tướng cho bản thân +0,3m/s trong 2s, CD8s; DOT/item damage không kích. Không phải dash, không miễn CC. Đối thủ ép giao tranh khi hiệu ứng hết hoặc dùng CC. |
| chuong_may — Chuông Mây Hợp Ký / Cloud-Concord Bell | 1600 = Bình Dưỡng 750 + Kính Song 700 + 150 | 36 AP, 270 HP, 2 HP/s | Heal/khiên từ kit cho self hoặc đồng minh tăng 8%; nhân trước anti-heal; không tăng item heal/khiên, không tăng HPregen. Đối thủ chia cắt vị trí, chống hồi máu; không thêm hiệu ứng miễn phí mỗi cast. |
| qua_mach — Qua Khắc Mạch / Vein-Etched Halberd | 1900 = Nanh Khép 750 + Giáp Thiết 550 + Mảnh Mạch 250 + 350 | 30 AD, 180 HP, 24 giáp | Sau cast chiêu, đòn đầu trúng tướng trong 3s thêm 18 vật lý; CD6s bắt đầu lúc proc; không đánh lính/trụ để kích. Cast lại không tích tầng. Đối thủ lùi khỏi cửa sổ đòn nối. |

Mọi bonus damage item không kích item khác, không crit, không tự hồi máu bằng hệ số hút máu tương lai. MR/AP/HP Chuông sau review đã sửa để ghép không mất chỉ số thành phần. Giá trị nội tại khác nhau; chưa thể coi các món cùng giá là ngang sức mạnh.

### Relic

Bình Bình Minh 150 vàng: hồi tổng 150 HP trong 4s, bốn tick 37,5 ở giây 1/2/3/4, chịu anti-heal. Thạch Hộ Thân 300 vàng: khiên 180 trong 3s. CD60s **chung theo người chơi/nhóm relic**, không reset khi bán, đổi hoặc mua lại; không dùng khi chết, chết huỷ hiệu ứng. Cả hai là phiên bản số proposal giảm so baseline, không patch âm thầm hai relic đang ship.

## 3. Hình thức đồ và lời ngắn cho agent

Không làm model trang bị gắn vào mọi tướng trong vòng item gameplay; icon/UI trước, reuse asset legacy còn phù hợp. Completed cần icon riêng qua asset resolver; chưa có ảnh mới là **ASSET NOT PRODUCED**.

| Món | Hướng icon original / câu mô tả VI / EN |
|---|---|
| Giáp Minh Ước | Hai mảnh hợp kim ôm lõi lam ngọc, vân vòng mở. “Khi một lớp bảo hộ khép lại, mạch sau tiếp sức.” / “When one ward closes, another vein answers.” |
| Mắt Sắc | Thấu kính hổ phách nằm trong gọng cung lệch, bốn nhịp khắc. “Bốn nhịp quan sát, một đường bắn rõ.” / “Four measured pulses reveal one clear shot.” |
| Ống Tên Gai Ký | Ống sinh học dẹt, ba gai ngọc bất đối xứng; khác icon cung. “Dấu gai bám theo cùng một đường chạy.” / “Memory thorns follow a repeated path.” |
| Tâm Lò Dưỡng Ký | Khoang sinh thể xanh trầm, lõi đỏ đất, hai lá hợp kim; không trái tim người. “Rút khỏi chiến tuyến để mạch sống liền lại.” / “Leave the clash and the living vein reconnects.” |
| Lò Than Ký | Ba vách dẫn năng lượng đen đồng giữ than cam, một nét chim chớp qua gọng; không bát lửa lễ. “Ký ức cháy sáng ở nhịp chạm đầu.” / “Stored embers wake at the first contact.” |
| Đăng Hồi Âm | Lõi tím treo trong khung xoắn lệch có đuôi sáng ngắn; khác đèn giấy. “Ánh ký ức dẫn thêm một bước.” / “An echo of light carries the next step.” |
| Chuông Mây Hợp Ký | Thiết bị cộng hưởng mở, vòng ngọc treo, gió lam trong khe; không chuông tín ngưỡng. “Một nhịp cộng hưởng nâng đỡ nhiều sinh mạch.” / “One shared resonance sustains many living veins.” |
| Qua Khắc Mạch | Lưỡi hợp kim hai tầng, rãnh ký ức ngọc vàng, vòng nối hở. “Niệm mở mạch, đòn nối khắc dấu.” / “A cast opens the vein; a follow-up leaves its mark.” |

Icon 256×256 gốc, kiểm đọc ở 32px và 48px, nền tối, một hình chính, không chữ trong ảnh. Màu chỉ gợi thuộc tính; border/tier do UI vẽ nên không phụ thuộc màu để đọc. Component dùng hình đơn lấy từ cấu kiện completed. Đây là hướng art proposal, không invent URL CDN đã tồn tại.

| ID còn lại | Hình chính / màu / điểm nhấn / lore một câu |
|---|---|
| mach_tinh | Mảnh tinh thể bẹt, đỏ đất với lõi xanh, một rãnh mở; đơn vị dẫn sinh mạch. |
| dong_van | Phiến hợp kim đồng xỉn, cạnh cong, hai nét vòng không kín; lớp phân tán lực từ giáp công trình. |
| ngoc_am | Ngọc tím khói, mặt lục giác, khe tối hình sóng; cấu kiện hút nhiễu năng lượng. |
| nanh_mach | Mảnh lưỡi cong màu thép ngọc, cán đen, một rãnh vàng; cấu kiện cắt vật chất của công cụ khai mạch. |
| kinh_luu | Thấu kính lam nhạt trong gọng tối, một chấm ký ức; mắt đọc một lớp dữ liệu TKT. |
| soi_nhip | Sợi dẫn vàng ngọc uốn thành cung lệch, hai nút nhỏ; đồng bộ nhịp chuyển động. |
| hat_sinh | Hạt xanh rêu bọc lưới đồng, đường lá bất đối xứng; mô sinh học sửa mạch sống. |
| buoc_van | Phù dẫn xám ngọc giống bản lề gót, một đuôi gió lam; cấu kiện giảm sức cản chuyển động, không phải giày lịch sử. |
| iron_plate | Hai Phiến Đồng Vân ghép thành tấm dày tối, ba vân ngọc; lớp giáp chống lực đã đóng mạch. |
| quickstring | Hai Sợi Nhịp thành vòng cung kép hổ phách, một đoạn nối sáng; nhịp dẫn kép cho cơ cấu phóng. |
| kinh_song | Hai thấu kính lệch tầng xanh tím, thanh nối đồng; hợp nhất hai lớp ký ức thành một phép tính. |
| binh_mach | Vỏ bình sinh thể xanh tối, hai khoang đỏ đất và một hạt; cấu kiện nuôi mô còn hoạt động. |
| nanh_khep | Hai lưỡi ngọc thép khép hở như chữ V, rãnh vàng; cùng dẫn lực vào một đòn cắt. |
| an_tinh | Cặp Ngọc Âm ôm một khoảng rỗng, viền tím xỉn; triệt nhiễu bằng hai pha đối nhau. |
| phial_of_dawn | Bình hợp kim nhỏ thon, dịch cam dịu, nắp ngọc vân mở; dung dịch khôi phục sinh mạch, không dùng biểu tượng tín ngưỡng. |
| bastion_stone | Tinh thạch lơ lửng giữa ba cánh chắn xám lam, một vân vòng; trường bảo hộ ngắn hạn từ cấu kiện khẩn cấp. |

Tên VI–EN của mỗi ID lấy từ JSON và bảng §2. Art agent chỉ phát triển hình trên, không thay công năng, thêm hiệu ứng gameplay hay gọi ảnh chưa sản xuất là tài nguyên có sẵn.

## 4. Build theo kit, không bắt class mặc một bộ

| Tướng | Lựa chọn khởi đầu với 500g | Core theo thứ tự | Điều chỉnh theo đối thủ |
|---|---|---|---|
| Mộc Lẫm | Đồng Vân + Mảnh Mạch = 490 | Minh Ước → Qua Khắc Mạch | Tâm Lò nếu cần hồi ngoài combat; Ngọc/Ấn Tĩnh trước nếu địch phép. Khiên kit tương tác Minh Ước, không tự biến tank thành sát thương phép. |
| Kha Tàn | Nanh Mạch + Hạt Sinh = 500 | Qua Khắc Mạch → Tâm Lò | Minh Ước khi bị focus; Ấn Tĩnh trước burst phép. BonusAD phục vụ kit, proc item không cộng tầng bleed. |
| Mị Đăng | Kính Lưu + Hạt Sinh = 500 | Đăng Hồi Âm → Lò Than Ký | Chuông khi cần sustain nhưng không coi là tối ưu burst; giáp/MR cơ bản theo đối thủ. AP phải thực sự vào resolver damage. |
| Hỏa Tủy | Kính Lưu + Hạt Sinh = 500 | Lò Than Ký → Đăng Hồi Âm | Giáp Thiết trước AD poke, Chuông khi cần khả năng sống/hồi. Burn kit không lặp proc Lò Than. |
| Nham Vũ | Sợi Nhịp + Hạt Sinh = 500 | Mắt Sắc → Ống Tên Gai Ký | Qua Khắc Mạch nếu cần giáp và nối chiêu; Ấn Tĩnh chống burst phép. Chuỗi slow không cộng với slow nội tại. |
| Vân Dao | Mảnh Mạch + Hạt Sinh = 450 | Chuông Mây → Đăng Hồi Âm | Tâm Lò/Minh Ước nếu bị focus; không nhân healer bằng nhiều bản Chuông. |

`builds` trong JSON là gợi ý thứ tự và alternatives; không phải danh sách bắt buộc phải mua đủ. Bot/sim phải chọn nhánh theo ngân sách, không nhận stat tưởng tượng tương đương 1000g. Gold còn lại giữ nguyên trong ví, không tự quy thành chỉ số. Phân tích solo không đủ đánh giá lợi ích đồng đội Chuông.

## 5. Giao dịch, cộng nội tại và HP

1. Từ túi, duyệt cây recipe có số lượng. Ưu tiên component trực tiếp trước con của nó; item đã tiêu thụ không được dùng lại. Khi thiếu một intermediate, được dùng những component con đang có và trả phần còn thiếu để hoàn thành cùng giao dịch. Không cộng cả giá intermediate và giá con của chính bản đó.
2. Vàng phải trả = tổng giá món đích − tổng giá catalog của các instance thực sự tiêu thụ. Mua thẳng trả toàn bộ giá. Giá bán = làm tròn tổng giá ×60%, là chi phí đổi hướng, không dùng để nâng cấp.
3. Kiểm số ô và maxCopies trên **túi sau tiêu thụ**. Nếu không đủ vàng, sai vị trí, vượt limit hoặc recipe lỗi: cả vàng và túi giữ nguyên. Replay cùng lệnh không áp hai lần.
4. CD passive/active theo player + group được lưu qua bán, mua, nâng cấp, chết và reconnect; bộ đếm đòn/reset mô tả trong JSON. Một group có một hiệu lực; buff cùng loại dùng luật mạnh nhất nêu trên.
5. **Delta proposal so runtime:** tăng maxHP bằng mua/nâng cấp giữ currentHP, không cộng freeheal; giảm maxHP thì clamp currentHP về max mới. Mua/bán lặp không hồi HP. Các nguồn hồi hợp lệ vẫn là kit, hồi phục, fountain, relic; đây là điều chỉnh proposal cần tích hợp có chủ ý. Không giữ `preserve_missing_hp` vốn cộng currentHP khi mua HP trong baseline.
6. Faction không khóa đồ; phe đỏ/xanh dùng cùng catalog. Theo round: túi/đếm proc reset khi mở trận mới, lịch sử cooldown chỉ cần sống trong một trận, không mang CD trận cũ sang trận mới.

Ví dụ: đã có Đồng Vân + Mảnh Mạch muốn Minh Ước, trả `1600 − 240 − 250 = 1110`, tiêu thụ hai món; không bắt bán Đồng Vân rồi mất 40%. Túi đầy có đủ component vẫn nâng cấp nếu sau giao dịch còn tối đa sáu ô.

## 6. Integration rõ trước khi giao Savi

| Phần | Runtime baseline | Candidate cần thêm |
|---|---|---|
| hp, armor, ad, attackSpeed, hpRegen | Đã có | Inventory thống nhất; HP không freeheal; giữ AS nhân |
| ap, mr, moveSpeed từ item | heroStats chưa cộng | Cộng đúng đơn vị, không thay growth/kit; spell damage/heal dùng tổng AP |
| recipe và maxCopies | Mua riêng, không consume | Transaction atomic, đếm instance, nested components |
| completed passive | Chưa có registry chung | Implement đúng trigger/group/cap/cancel, không proc vòng lặp |
| relic | Heal/shield baseline | Proposal số riêng, CD group không reset |
| UI/bot/VI–EN | Tám món baseline | Consumer chung catalog, cây ghép và vàng thiếu; tooltip được sinh từ data |
| simulator | Build stat trừu tượng | Loadout thật; báo effect unsupported thay vì âm thầm bỏ |

Một active/passive chưa chạy trong tool không được gán PASS balance. Simulator basic-attack, stat EHP và economy giúp lọc lỗi đầu, chưa đại diện combo, vị trí, hồi/khiên đồng minh và mục tiêu map. Chỉ simulator với coverage ghi rõ mới được dùng ra khuyến nghị số.

## 7. Lịch làm và tiêu chí hoàn thành

- **Vòng 1 — ngay:** designer giao JSON; tool kiểm cây/giá, budget L1/6/11/15, duplicate/group, giao dịch upgrade/sell/fullbag/HP, đo stats và basic-attack có seed. Reviewer độc lập sửa lỗi trước khi dùng report.
- **Vòng 2:** Savi tích hợp catalog proposal trên nhánh/test phù hợp, UI/bot/stat/passive cùng nguồn; giữ rollback catalog baseline và chỉ mở sau quyết định chuyển bản. Không push candidate như số đã duyệt.
- **Vòng 3:** Codex/QA chơi sáu tướng, loadout thực, xác minh trade/HP/cooldown và combo; thêm thử 3v3 cho lợi ích hỗ trợ. Hội đồng balance đối chiếu simulator và trận, sửa ít món gây lệch, không mở rộng catalog để trì hoãn.

Đã qua review dữ liệu vòng 1: không tụt AS khi ghép Dây Cung, không tụt MR/AP/HP của nguyên liệu ở đồ hybrid, bỏ HP freeheal. **Chưa qua client, chưa BAL-PASS và chưa production-ready**. Phần cần tạo asset không chặn tool, nhưng chặn nghiệm thu visual cuối. Cập nhật kết quả thực vào report của tool, không sửa nhãn vì chỉ syntax đúng.

## 8. Giữ tám ID cũ

JSON có `migration` cho quickstring, keeneye, iron_plate, oathguard_plate, thornseed_quiver, heartforge, phial_of_dawn, bastion_stone. Tên một số món được mở rộng để rõ bản sắc nhưng ID giữ; resolver cũ có thể dùng icon tạm. Không migrate inventory đang giữa trận sang số mới; kết thúc trận mới áp catalog phiên bản được chọn. Không xóa asset hay lịch sử baseline.
