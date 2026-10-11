# 90 · Nghiên cứu cảm hứng tướng MOBA cho roster Cổ Linh mới

> **[USER LOCK — 2026-10-11]:** Toàn bộ 24 hero mới có bốn skill **Q/W/E/R** (R = Ultimate), **D = Dash chung**. Không có skill LMB/RMB. Basic Attack là hành động riêng. Theo [91](91-khoa-input-qwer-d.md). Sáu thiết kế đầu được mã hóa ở [`roster24/batch01-06.json`](roster24/batch01-06.json).


**Trạng thái:** RESEARCH / PROPOSAL, chưa duyệt production.  
**Ngày:** 11-10-2026.  
**Phạm vi:** nghiên cứu archetype để xây lại roster tướng Cổ Linh; không đổi source game, assets, số combat, kit production hay 9 tướng đã có.

## 0. Vì sao tài liệu này tồn tại

Bộ tạo hình 18/24 trước đó vẫn bị hẹp: nhiều concept là “người + vật liệu + màu + vũ khí”. Điều đó không đủ cho một MOBA cần người chơi nhìn màn chọn tướng là muốn thử ngay.

Hướng mới: nghiên cứu các archetype hay trong MOBA, anime, truyện tranh, game đối kháng, sci-fi, kaiju, thần thoại và pop culture; tách chúng thành **nguyên tử cảm hứng**, rồi tái tổ hợp thành Cổ Linh độc lập.

**Không copy IP.** Không lấy tên, mặt, trang phục, silhouette, combo skill, lore hoặc vũ khí nhận diện của nhân vật thương mại. Mỗi concept Cổ Linh phải trộn tối thiểu 3 nguồn cảm hứng và được viết lại bằng logic riêng của thế giới: nền văn minh cổ triệu năm, Tinh Thạch Ký Ức, công nghệ sống, dị thể, ký ức bị hiểu sai thành thần thoại.

## 1. Benchmark nhanh từ các MOBA lớn

Các nguồn chính thức xác nhận một điểm chung: MOBA mạnh không khóa roster trong một thẩm mỹ duy nhất.

- Dota 2 nhấn mạnh hơn 100 hero trong 5v5, từ “magical tacticians” tới “fierce brutes” và “cunning rogues”: bài học là biên độ fantasy phải rất rộng.
- League of Legends giới thiệu hơn 170 champion: bài học là mỗi tướng phải có playstyle/fantasy đủ riêng để người chơi tìm thấy “mẫu mình thích”.
- SMITE bán fantasy “legendary mythological icons” với hơn 100 gods nhiều pantheon: bài học là dùng nguồn thần thoại rộng, nhưng gói lại thành chiến đấu rõ vai.
- Heroes of the Storm lấy hero từ nhiều vũ trụ Blizzard: bài học là roster có thể gồm alien, demon, robot, knight, healer, beast, specialist… miễn mỗi tướng có hook dễ hiểu.

Nguồn tham khảo: Dota 2 official home, League of Legends champions page, SMITE learn page, Heroes of the Storm heroes page.

## 2. Luật nghiên cứu IP-safe

1. **Ba nguồn tối thiểu:** mỗi tướng mới phải có ít nhất 3 nguồn cảm hứng khác nhau.
2. **Mỗi nguồn chỉ góp một lớp:** body fantasy, gameplay hook, emotional hook, movement hook hoặc ultimate fantasy.
3. **Không bê nguyên:** cấm tên, vũ khí nhận diện, trang phục nhận diện, silhouette y hệt, lore y hệt, combo skill y hệt.
4. **Cổ Linh hóa bắt buộc:** concept cuối phải có lý do tồn tại trong nền văn minh cổ triệu năm.
5. **Gameplay trước decoration:** tạo hình phải dẫn tới skill, animation, hitbox, basic attack, R và movement khác nhau.
6. **Roster-first:** concept phải làm roster đa dạng hơn; không thêm một humanoid mặc giáp nếu đã có quá nhiều.

## 3. 20 benchmark archetype đáng học

| # | Nguồn / archetype | Body fantasy | Gameplay hook | Vì sao người chơi muốn pick | COLINH học gì | Không được copy |
|---|---|---|---|---|---|---|
| 1 | Monkey trickster | linh hầu / võ thú | lừa, phân thân, lao vào/thoát ra | vui, tinh quái, cơ động | trickster + combo nhịp nhanh | Ngộ Không, gậy như ý, vòng kim cô |
| 2 | Pilot / vehicle hero | người lái máy | bắn pháo, bay, ném bom | fantasy phi công dễ hiểu | hero không nhất thiết là thân người | Corki/Gyrocopter cụ thể |
| 3 | Blob / elastic mutant | cơ thể dẻo | kéo dài, bật nảy, tách mảnh | hài + lạ + skillshot rõ | thân thể là vũ khí | Zac/Majin Buu silhouette |
| 4 | Living weapon | vũ khí sống | tự biến dạng thành skill | ngầu, hung hãn | tướng là công cụ chiến tranh cổ | Soul Edge/Aatrox trực tiếp |
| 5 | Kaiju tank | quái vật khổng lồ | đẩy lane, phá đội hình | cảm giác sức nặng | scale/impact lớn trong MOBA | Godzilla/Cho'Gath cụ thể |
| 6 | Mecha child | người nhỏ điều khiển khối lớn | stance, robot, avatar | tương phản đáng nhớ | pilot + guardian body | D.Va/Annie/Tibbers trực tiếp |
| 7 | Copycat / mimic | kẻ bắt chước | copy skill, phản đòn | high-skill, bất ngờ | ký ức sao chép hành vi | Sylas/Rubick y hệt |
| 8 | Parasite host | chủ thể bị ký sinh | lây nhiễm, tiến hóa | kinh dị, snowball | nấm/ký ức kiểm soát cơ thể | Venom/Kha'Zix cụ thể |
| 9 | Deep sea horror | thủy quái vực sâu | kéo, làm mù, áp suất | bí ẩn, đáng sợ | biển cổ là nguồn dị thể | Pyke/Fizz/Nami copy |
| 10 | Angelic machine | thiên thần cơ khí | bảo hộ, phán xét, tia sáng | thánh + công nghệ | thiên thần không phải tôn giáo, là máy cổ | Kayle/Tyrael silhouette |
| 11 | Time monk | kẻ điều thời | rewind, delay, lặp nhịp | trí tuệ, skill cao | công nghệ thời gian cổ | Ekko/Zilean bộ skill |
| 12 | Swarm queen | nữ hoàng bầy | gọi đàn, ký sinh, vùng | macro, áp lực map | bầy là ký ức sinh học | Kerrigan/Zagara trực tiếp |
| 13 | Living city | thành phố trên lưng | fortress, terrain, zone | đồ sộ, độc nhất | kiến trúc cổ thành sinh vật | không bê kaiju cụ thể |
| 14 | Dream eater | mộng thể | ngủ, ảo giác, đảo điều khiển | kỳ dị, hỗ trợ/khống chế | ký ức ngủ của nền văn minh | Lillia/Nightmare copy |
| 15 | Gravity mage | trọng lực | kéo, đẩy, neo, orbit | cảm giác cosmic | tinh thạch điều lực | Syndra/Orianna trực tiếp |
| 16 | Sand worm / burrower | sâu đất | đào, phục kích, địa chấn | predator từ dưới đất | cổ thú tầng địa chất | Rek'Sai/Sand King copy |
| 17 | Beast rider | người + thú | điều thú, tách vai | fantasy đồng đội | cộng sinh cổ linh | Rexxar/Sejuani trực tiếp |
| 18 | Mirror thief | gương/kính | phản chiếu, đánh cắp hành vi | mindgame | Tinh Thạch ghi nhớ đòn đánh | Bách Diện/Kính Ngôn trùng |
| 19 | Artillery glass cannon | pháo tầm xa | đặt góc, bắn xa, yếu khi bị áp sát | thỏa mãn kỹ năng | cổ khí bắn map | Xerath/Ziggs/Corki copy |
| 20 | One-body-two-souls | hai ý thức | đổi stance, hai bộ skill | lạ và sâu | Tinh Thạch chứa nhiều người | Kindred/Cho'Gall trực tiếp |

## 4. 40 inspiration atoms

### 4.1 Body fantasy

1. Phi công trong buồng lái cổ.  
2. Sinh vật cao su/ký ức dẻo.  
3. Linh hầu lừa đảo.  
4. Kaiju vực sâu.  
5. Đứa trẻ điều khiển avatar khổng lồ.  
6. Thiên thần máy bị lỗi.  
7. Mắt cơ khí bay.  
8. Thành phố sống trên lưng cua/cá voi.  
9. Cây rừng già không mặt.  
10. Hổ bị nấm ký sinh.  
11. Bọ/côn trùng nhiều chân.  
12. Mực ống lân quang.  
13. Thủy ngân đổi hình.  
14. Tinh thể đen sống.  
15. Khung xương cổ khí.  
16. Quái thể một mắt.  
17. Rồng biến hình.  
18. Sâu cát.  
19. Sứa chuông âm thanh.  
20. Vật thể hai linh hồn.

### 4.2 Gameplay hook

21. Copy/ăn cắp một hành vi gần nhất.  
22. Kéo dài tay hoặc thân.  
23. Đào đất/ẩn dưới lane.  
24. Bay/vehicle strafing.  
25. Đặt bẫy vùng.  
26. Triệu hồi bầy.  
27. Điều khiển terrain tạm thời.  
28. Đổi stance thân nhỏ/thân lớn.  
29. Tách mảnh rồi ghép lại.  
30. Nuốt/giữ mục tiêu ngắn.  
31. Đảo hướng projectile.  
32. Delay damage theo nhịp thời gian.  
33. Hồi máu theo âm thanh/nhịp.  
34. Cộng sinh với đồng minh.  
35. Đánh dấu ký sinh rồi nổ.  
36. Tạo vùng tối/mù.  
37. Tạo orbit/vệ tinh quanh người.  
38. Biến tướng thành công trình tạm.  
39. Dùng HP làm tài nguyên.  
40. R biến đổi hình thái toàn thân.

## 5. Vì sao bộ tạo hình cũ thất bại

1. Quá nhiều tướng vẫn là humanoid hoặc gần humanoid.  
2. Nhiều concept chỉ đổi chất liệu: sơn, giấy, bùn, sấm, đá.  
3. Skill fantasy chưa sinh ra từ body plan; vẫn giữ kit người rồi dán tạo hình mới.  
4. Thiếu fantasy người chơi muốn pick ngay: pilot, kaiju, trickster, mecha, copycat, parasite, vehicle, city-beast.  
5. Roster chưa đủ đa trục: movement, anatomy, emotional tone, combat hook, scale, camera silhouette.  
6. Một số tạo hình có motif Việt nhưng chưa có cảm giác nền văn minh triệu năm hoặc ngoài hành tinh.  
7. Ultimate chưa thành “signature moment” ở nhiều tướng.

## 6. 12 hướng Cổ Linh mới bản nháp

Các hướng dưới đây chưa phải roster 24 cuối. Đây là bản nháp để chọn prototype.

| # | Tên nháp | 3 nguồn cảm hứng | Cổ Linh hóa | Silhouette | Movement | Role | Core mechanic | R fantasy | Vì sao đáng pick |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Phi Công Lạc Kỷ** | pilot hero + UFO cổ + truyền thuyết đèn trời | người lái buồng máy rơi ngược thời gian từ nền văn minh triệu năm | thân nhỏ trong phi cơ trống đồng-plasma | bay thấp, lượn vòng | Marksman/artillery | đạn pháo, bom ký ức, strafing | gọi phi đội ảo ảnh cổ khí rải bom theo đường | pick vì được lái máy bay cổ đại |
| 2 | **Mạch Nhựa Bất Tử** | blob + cao su + bio-weapon | vũ khí sinh học làm từ nhựa ký ức; bị chém rơi mảnh rồi tự ghép | khối dẻo có lõi ký ức | nảy, kéo dài | Fighter | kéo tay, bật tường, nhặt mảnh hồi | nổ toàn thân thành nhiều mảnh rồi hút lại | pick vì thân thể là combo |
| 3 | **Linh Hầu Vô Ảnh** | monkey trickster + ninja misdirection + dân gian linh hầu | ký ức chiến binh lừa đảo bị nhân gian gọi nhầm là khỉ thần | thú nhỏ nhanh, đuôi dài, nhiều bóng | nhảy, trèo, đổi vị trí | Assassin | bóng giả, mark, đảo thân | mở sân khấu bóng, tất cả bóng cùng đánh một nhịp | pick vì outplay |
| 4 | **Ấu Trụ Điều Khiển** | mecha child + guardian avatar + Mạch Trụ | đứa trẻ ký ức điều khiển cột năng lượng khổng lồ như thân thứ hai | thân bé + cột lớn đứng sau | đi bộ chậm, avatar đập xa | Hybrid high-skill | điều khiển hai điểm: thân và trụ | nhập vào avatar thành khổng thần 8 giây | pick vì điều khiển hai cơ thể |
| 5 | **Cá Voi Thành Chìm** | kaiju whale + living city + deep sea | thủy quái mang di tích thành phố cổ trên lưng | cực dài, lưng có tháp | trườn/bơi trong không khí | Tank/zone | chặn đường bằng lưng, sóng áp suất | thành phố trên lưng thức dậy bắn đèn ký ức | pick vì scale khổng lồ |
| 6 | **Thiên Sứ Lỗi Quỹ Đạo** | angelic machine + satellite + fallen hero | máy hộ vệ quỹ đạo rơi xuống, bị hiểu thành thiên thần | vòng quỹ đạo, một cánh gãy | lơ lửng | Support/mage | orbit shield, laser phán xét | mở cổng quỹ đạo, tia sáng quét vòng | pick vì thánh nhưng sci-fi |
| 7 | **Thủy Ngân Đa Diện** | liquid metal + mimic + shapeshifter | kim loại ký ức chứa mặt của nhiều chiến binh đã chết | người lỏng không ổn định | tan thành vũng | Assassin/copy | mô phỏng đòn gần nhất, đổi mặt | copy R gần nhất thành phiên bản méo mó yếu hơn | pick vì đánh cắp khoảnh khắc |
| 8 | **Nấm Hổ Ký Sinh** | tiger predator + cordyceps + hunter mark | hổ cổ bị rừng ký ức kiểm soát | hổ bốn chân có nấm phát sáng | rình, vồ | Assassin | bào tử mark, vồ nổ ký sinh | biến mục tiêu bị mark thành ổ bào tử nổ lan | pick vì quái thú đẹp và đáng sợ |
| 9 | **Sứa Chuông Miên Âm** | jellyfish + bell/gong + sleep mage | sinh vật biển sâu phát âm tần khiến ký ức ngủ | chuông trong suốt, xúc tu dài | trôi | Support/control | nhịp chuông hồi/chậm/ngủ | đại hồng chung dưới biển ru ngủ cả vùng | pick vì hỗ trợ khác lạ |
| 10 | **Sâu Cát Hồi Ký** | sand worm + burrower + memory devourer | cổ trùng ăn lớp ký ức dưới đất | thân dài chỉ lộ gai | đào đất | Jungler/fighter | đường hầm, phục kích, rung đất | nuốt cả đoạn lane rồi trồi lên | pick vì predator dưới bản đồ |
| 11 | **Mắt Thiên Cơ** | drone eye + sniper + oracle | mắt quan sát chiến tranh của nền văn minh cổ | nhãn cầu máy với dây sáng | bay | Marksman/vision | scan, lock-on, shot beam | mở con mắt thứ hai trên trời bắn tia khóa | pick vì sniper/vision fantasy |
| 12 | **Kẻ Gánh Lò Mặt Trời** | forge reactor + solar paladin + walking furnace | lò phản ứng mặt trời cổ có thân hộ vệ | lò ngực sáng, giáp nặng | bước nặng | Tank/bruiser | hấp thu damage thành nhiệt | mở lò, biến thành mặt trời nhỏ hút sát thương | pick vì tank càng bị đánh càng nóng |

## 7. Sáu prototype đầu tiên đề xuất

1. **Phi Công Lạc Kỷ** — mở fantasy vehicle/pilot, khác hoàn toàn humanoid.  
2. **Mạch Nhựa Bất Tử** — cơ thể dẻo, dễ tạo gameplay khác.  
3. **Linh Hầu Vô Ảnh** — trickster assassin, nhu cầu người chơi cao.  
4. **Ấu Trụ Điều Khiển** — mecha/avatar hai cơ thể, signature mạnh.  
5. **Cá Voi Thành Chìm** — kaiju/living city, scale lớn nhất roster.  
6. **Thủy Ngân Đa Diện** — copycat/mimic, high-skill, tạo highlight.

## 8. Việc tiếp theo

1. Mở rộng benchmark lên 50–100 archetype.  
2. Từ 12 hướng nháp, lọc ra 24 tướng v2.  
3. Với mỗi tướng v2: viết body plan, basic attack, Q/W/E/R, R theo doc 79, hình học theo doc 76, rig difficulty, IP-risk.  
4. Chạy audit đa dạng: không quá nhiều humanoid, không trùng movement, không trùng R, không trùng emotional hook.  
5. Sau khi creator duyệt 24 v2, mới cho sản xuất concept/model/kit.

## 9. Quyết định pipeline tạm thời

- Tướng cũ: chuyển xuống **LEGACY / RESERVE** trong nghiên cứu roster mới; không xóa khỏi project.
- Bộ 18 tạo hình hiện tại: giữ làm kho phụ, không làm trục chính.
- Hero Factory: tạm dừng sản xuất tướng mới cho tới khi tài liệu 90 có 24 concept v2 được duyệt.
- Map/reconnect/system có thể tiếp tục độc lập nếu không chạm roster.
