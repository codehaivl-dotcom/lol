# 60 · Nghiên cứu MOBA: chiến thuật, kinh tế, tiến trình và thông tin

Ngày tra cứu: **09/10/2026**. Đối chiếu Cổ Linh tại commit remote **55cc6eb3474cf524bbdebadcc38dab20ec18c00a**. Checkout local có thay đổi chưa commit, được giữ nguyên. Đây là nghiên cứu và đề xuất; chưa sửa runtime, chưa push, chưa chạy nghiệm thu client.

**Cập nhật nguồn:** audit sản xuất ở [62](62-production-bible-va-bo-mo-phong.md) dùng pin mới `dcdbfb3d3cfe83ae65ed91a85dd439dceeb38f90`. Ba phát hiện AI ở §6 dưới đây là lịch sử tại pin cũ; commit `0aa9fdb5` đã sửa dự toán bot. Không giao lại ba lỗi đó như chưa sửa. Dùng report mới để phân biệt source đã sửa và client chưa kiểm.

## 1. Phạm vi và cách dùng

Mục tiêu: học nguyên lý tạo quyết định chiến thuật từ nhiều game, thiết kế riêng cho Cổ Linh. Không lấy tên, nhân vật, hình ảnh, âm thanh, bố cục hay bộ số của đối thủ rồi đổi nhãn. Không coi bảng xếp hạng tướng hoặc một đội hình đang phổ biến ở game khác là meta của Cổ Linh.

- **RESEARCH:** cơ chế tham khảo, có game/mode/phiên bản/nguồn.
- **PROPOSED:** đề xuất thiết kế Cổ Linh, chưa được duyệt.
- **EXPERIMENTAL:** đã làm bản thử riêng, có giới hạn và kết quả đo.
- **APPROVED:** có quyết định của chủ dự án, dẫn nguồn quyết định. Không đồng nghĩa đã PASS client.

Luật hiện hành đọc ở `00-bible-moba.md`, doc14 và data runtime. Khi chúng lệch nhau, ghi mâu thuẫn và người xử lý; không dùng tài liệu nghiên cứu để tự thay luật.

Mạch Giữa hiện làm cho một lane, hướng 1v1/3v3. Cửu Mạch là map 5v5 ba lane riêng. Nghiên cứu support/rừng/boss đi song song; không tự bật hệ thống tương lai trong Slice.

## 2. Nguồn tham khảo và giới hạn

Nguồn lịch sử vẫn có giá trị giải thích lựa chọn thiết kế, nhưng không chứng minh luật live tháng 10/2026. AoV quốc tế, Liên Quân Việt Nam, LoL PC và Wild Rift phải ghi riêng.

| Game / phạm vi | Nội dung đã có nguồn chính chủ | Mốc nguồn |
|---|---|---|
| LoL PC / Summoner’s Rift | Đẩy trụ cùng lính; tiến trình chiêu; support economy; mục tiêu đội và phần thưởng | How to Play; 14.1, 14.19, 26.1, 26.2 |
| Dota 2 | Creep aggro; deny/stack; tiến trình/talent; ngày đêm; mục tiêu rừng | 6.87, 7.00, 7.20; benchmark lịch sử |
| Wild Rift | Kinh tế support cần chống khai thác; thay đổi nhịp wave và XP | 3.4, 3.4a, 5.0; benchmark lịch sử |
| Honor of Kings / Global | Năm vị trí, rừng, bụi, mục tiêu công trình | Trang giới thiệu chính chủ, không ghi patch |
| Mobile Legends: Bang Bang / quốc tế | Địa hình, roam, hành vi tranh Turtle/Lord | Project NEXT2025; báo cáo giải2024 |
| Pokémon UNITE | EXP và điểm, mởchiêu theo cấp, chọn trước đườngchiêu, boss đổi chiến thuật | Hướng dẫn lịch sử; thông báo2025 và27/02/2026 |
| Liên Quân Việt Nam | Quái cấp thông tin; chia sẻ bùa; trang bị chủ động | Cập nhật 08/07/2026 |
| AoV quốc tế | Aggro trụ; kinh tế và leash camp | FAQ 2017; cập nhật 2018; **Beta 34** 2021 |
| Heroes of the Storm | XP đội; camp công thành; đổi mục tiêu khi bất lợi | Core Concepts, tài liệu lịch sử |

### Hồ sơ nguồn dùng trong thiết kế

**LoL:** hướng dẫn chính thức khuyên đánh trụ với lính đi trước, trụ cung cấp tầm nhìn hạn chế; XP mở/nâng chiêu. [Riot How to Play](https://www.leagueoflegends.com/en-us/how-to-play/). Patch14.1 từng cho support dùng charge kết liễu lính và chuyển đủ vàng kết liễu cho đồng minh gần nhất. [Riot14.1](https://www.leagueoflegends.com/en-us/news/game-updates/patch-14-1-notes/). Patch14.19 làm hiệu ứng trụ thể hiện rõ chuỗi tăng sát thương. [Riot14.19](https://www.leagueoflegends.com/en-au/news/game-updates/patch-14-19-notes/).

**LoL26.1:** nhiệm vụ vị trí phân biệt thu nhập carry/support/jungle; boss kết thúc trận nhấn mạnh buff và XP hơn vàng. Lịch mục tiêu được giảm bớt khi loại Atakhan; Baron trong Summoner’s Rift thường trở lại20phút, khác Swiftplay12phút. Đây là ví dụ về tránh lịch mục tiêu quá dày, không phải lịch boss Cổ Linh. [Riot26.1](https://www.leagueoflegends.com/en-us/news/game-updates/patch-26-1-notes/). Riot26.2 mô tả support kiểm soát thông tin, jungle kiểm soát objectives và tiếp tục theo dõi thời điểm trụ đổ bằng dữ liệu. [Riot26.2](https://www.leagueoflegends.com/en-us/news/game-updates/patch-26-2-notes/).

**Dota:** Valve6.87 ghi creep theo người tấn công hero; phạm vi/quy tắc aggro cụ thể không được suy từ mô tả này. [Valve6.87](https://www.dota2.com/687?lang=en). Valve7.20 từng thay thưởng deny và thưởng người stack, đồng thời đổi nhịp ngày/đêm; các tỷ lệ cũ không dùng làm luật hiện hành. [Valve7.20](https://www.dota2.com/720/). Talent và tiến trình là một cách tạo lựa chọn sức mạnh ngoài item. [Valve7.00](https://www.dota2.com/700/gameplay/).

**Wild Rift:** patch3.4 thêm nguồn thu nhập support; ngay3.4a phải giảm tốc thu nhập và chặn hai người cạnh nhau cùng khai thác item nhiệm vụ. Bài học: nguồn thu hỗ trợ phải thử cả tình huống lạm dụng nhiều người, không chỉ một support. [RiotWR3.4](https://wildrift.leagueoflegends.com/en-sg/news/game-updates/wild-rift-patch-notes-3-4/), [RiotWR3.4a](https://wildrift.leagueoflegends.com/en-gb/news/game-updates/wild-rift-patch-notes-3-4a/). Patch5.0 thay wave để người chơi kiểm soát thời điểm về nhà/đảo đường tốt hơn và điều chỉnh chia XP. [RiotWR5.0](https://wildrift.leagueoflegends.com/en-us/news/game-updates/wild-rift-patch-notes-5-0/).

**Honor of KingsGlobal:** trangchínhchủ phân biệt Clash/Jungle/Mid/Farm/Roamer, quái là tài nguyên, bụi có thể giấu địch, Crystal là mục tiêu thắng. Học cách tổ chức nhiệm vụ đội, không suy luật chia vàng/buff/timer từ tên vai trò. Chưa xác minh primary các số boss/roaming/vision live. [HoKGlobal](https://www.honorofkings.com/global-en/).

**MLBB:** MOONTONProject NEXT2025 giới thiệu biến thể địa hình với bụi phục kích, lối vào hố boss và tuyến sông hỗ trợ di chuyển. Bài học: rủi ro objective phụ thuộc lối tiếp cận và thông tin. Báo cáo giảiMPLSingapore2024 ghi việc lấy Turtle nới lợi thế và loại đối thủ trước khi lấy Lord; đây là bằng chứng hành vi thi đấu, không phải luật spawn. [MOONTONProject NEXT](https://en.moonton.com/news/237.html), [MOONTONMPL](https://en.moonton.com/news/140.html). Mô tả video chính thức về roam2025 cho thấy mục tiêu cải thiện vàng/XP support; chưa xem video và không trích tỷ lệ. [MLBBroam](https://www.youtube.com/watch?v=iJ2r_NpnWg4).

**PokémonUNITE:** hướng dẫn chính chủ dùng EXP và Aeosenergy để tiến triển và ghi điểm; khác vòng vàng/mua đồ trong trận. Không nhầm AeosCoins tài khoản với năng lượng ghi điểm. [TPCguide](https://www.pokemon.com/us/strategy/a-minute-by-minute-guide-to-pokemon-unite-battles/). Thông báo hiệu lực27/02/2026 cho chọn trước đườngchiêu, vẫn họcchiêu khi lêncấp nhưng không phải chọn giữa trận. Bài học: mởdần và lựa chọn nângchiêu là hai hệ thống riêng. [TPCiadmin](https://community.pokemon.com/en-us/discussion/22593/changes-to-learning-moves-during-battle). ThôngbáoEXP dự kiến18/12/2025 mô tả phânphối khi cùnghạquái, không nêu tỷlệ nên không nhập số cộngđồng. [UNITEupdate](https://www.pokemonunite.jp/archive/ja/news/380/). MốcRanked04/09/2025 đưa Groudon vào Theia; Standard/Custom vẫnRayquaza. Boss xuất hiện khi **còn2phút**, không phải phút2từđầutrận; khôngcoi lịchxoaymode cũ là hiệnhành. [TPCiannouncement](https://community.pokemon.com/en-us/discussion/19885/get-ready-for-a-legendary-update-theia-sky-ruins-groudon).

**Liên Quân Việt Nam08/07/2026:** Bọ Ánh Sáng dẫn đến đường trinh sát; sau10phút, quái bùa cường hóa có cách chia sẻ bùa cho đồng đội gần người hạ. Đây là hai ví dụ phần thưởng thông tin và phân phối buff, không chỉ cộng damage. Không chép tên, loài hay tuyến bay đó vào Cổ Linh. [Garena Việt Nam](https://lienquan.garena.vn/chi-tiet-ban-cap-nhat-ngay-hoi-lien-quan-08-07-2026/).

**AoV:** FAQ2017 xác nhận đánh hero dưới trụ địch khiến trụ nhắm người đánh. [AoV FAQ](https://www.arenaofvalor.com/webplat/info/news_version3/26190/33375/33376/33731/m19427/201712/670374.shtml). Bản2018 từng tăng phần vàng last-hit bổ sung; Beta34 năm2021 tách Modest của support/jungle và làm quái về camp nhanh hơn. Đây là nguồn lịch sử/beta, không xác nhận live Việt Nam. [AoV2018](https://www.arenaofvalor.com/webplat/info/news_version3/26190/34986/34987/34989/m19454/201809/756633.shtml), [AoV Beta34](https://www.arenaofvalor.com/webplat/info/news_version3/26190/33375/33376/33730/m19427/202112/906087.shtml).

**Heroes of the Storm:** tiến trình đội và mốc Heroic tạo lợi thế khi giao tranh; camp có thể tạo áp lực đường trước objective. Blizzard khuyên đổi sang XP/camp không bị tranh khi đội đang bất lợi; một số camp cần chiếm beacon sau khi hạ quái. Bài học: last-hit và quyền sở hữu camp không phải lúc nào cũng cùng một việc. [Blizzard Team Leveling](https://news.blizzard.com/en-us/article/20845104/core-concepts-team-leveling-part-1), [Blizzard Battleground Basics](https://news.blizzard.com/en-us/article/20720248/core-concepts-battleground-basics).

## 3. Meta và chiến thuật: cần thiết kế gì?

Các nhận xét dưới đây là **suy luận thiết kế**, không phải dữ liệu win-rate/meta live.

| Quyết định | Điều tạo chiều sâu | Điều phải đo trong Cổ Linh |
|---|---|---|
| Last-hit hay đẩy nhanh | Chọn thu nhập cá nhân hoặc quyền di chuyển trước | CS có thể lấy, CS lấy được, wave tới trụ và tài nguyên bị bỏ |
| Giữ wave / tích wave / đẩy | Vị trí giao tranh, cửa về nhà, khả năng công thành | Điểm gặp wave; lính tồn tại; thời gian bị trụ giữ |
| Trade hay all-in | Cooldown, mana, cấp, đồ, lính và đường rút | Damage trao đổi, tài nguyên tiêu, khả năng thoát |
| Recall | Hy sinh thời gian trên đường để hồi phục/mua sức mạnh | Lính mất, thời gian trở lại, lần bị ngắt |
| Roam / gank | Tạo hơn người nhưng bỏ tài nguyên nơi khác | Lợi ích giao tranh so với lane/camp bị mất |
| Ăn boss / nhử boss / đổi mục tiêu | Thông tin, quyền đẩy, số người, chiêu quan trọng | Clear time, HP mất, cửa cướp, lợi ích sau buff |
| Mở giao tranh / bảo kê | Support phải chọn vị trí và mục tiêu ưu tiên | Đồng đội được bảo vệ, chiêu khống chế dùng đúng lúc |

Không ấn định “meta đúng” bằng đội hình năm vai trò cho Mạch Giữa. 1v1 cần kit tự vận hành; 3v3 cần kiểm tác động của chia tài nguyên và kỹ năng hỗ trợ; 5v5 mới kiểm phân bổ ba lane/rừng/đảo đường.

## 4. Ma trận thiết kế độc lập

Các phương án mới vẫn **PROPOSED**. Riêng hướng Mạch Đăng + công tắc phòng thủ đã được user đồng ý; số V0.1 và chi tiết prototype xem doc61, chưa thêm feature hoặc đổi số ship.

| Hệ thống | Nguyên lý và đánh đổi | Đề xuất Cổ Linh | Kiểm độ khác biệt | Balance / QA |
|---|---|---|---|---|
| Skill / level | Mở chiêu tạo mốc mạnh; nhiều lựa chọn tăng tải điều khiển | Giữ auto-rank hiện tại làm baseline; thử mở dần chiêu trong profile riêng nếu cần | Không chép cây talent/thứ tự nâng của một đối thủ | So mốc mạnh, thời gian thao tác, khả năng hiểu nút khóa; cùng XP/kit |
| Last-hit | Thưởng kỹ năng farm nhưng có thể làm người mới/support tụt | So luật hiện tại với profile chia XP gần lính và bonus last-hit; chưa chốt tỷ lệ | Không bê nguyên deny/charge support | Bảo toàn tổng thưởng theo luật; đo thu nhập/XP từng vai trò |
| Support | Tạo giá trị không cần giành toàn bộ farm; thu nhập dễ bị lạm dụng | Thử một cơ chế phân phối kinh tế đơn giản, bảo toàn farm người được hỗ trợ | Tránh bản sao item nhiệm vụ; khác biệt phải nằm ở hành vi được thưởng | Hai support, đứng AFK, solo, chết, ra/vào vùng, spam heal: không tạo vàng vô hạn |
| Item | Ghép đồ tạo quyết định đầu/giữa/cuối; passive quá mạnh gây snowball | Dùng bộ24item và recipe đã đề xuất ở58/59 | Tên/art/recipe/passive có nguồn authoring riêng | Dùng tool hiện có; công bố những passive chưa mô phỏng |
| Camp | Tài nguyên và tuyến di chuyển; farm quá tốt làm bỏ lane | Phát triển các loài trong pack có sẵn, mỗi camp một vai trò rõ | Không thay pack bằng quái tương đương của đối thủ | Clear time/HP mất/reward-phút/travel; reset và thưởng đúng một lần |
| Buff | Giá trị tạm thời đổi chiến thuật; stacking gây snowball | **Cộng Hưởng Mạch:** thử một buff hồi phục, bảo vệ, di chuyển hoặc thông tin tùy camp | Không sao red/blue buff chỉ đổi tên; chức năng/phản chế phải chứng minh | Ai nhận, duration, death, stacking, thay thế, cleanse và UI; TBD trước code |
| Boss | Tranh chấp và chuyển lợi thế thành cơ hội kết thúc | Tận dụng boss/camp trong pack, tách quái trung lập khỏi Titan hành quân | Không bê Lord/Baron/Rayquaza thành bản đổi tên | Ownership, reward, clear time, công thành sau buff, khả năng chống trả |
| Vision | Đánh đổi thông tin/vị trí; quá nhiều thông tin xóa phục kích | **Mạch Đăng:** đèn cố định tranh bằng channel; công tắc phòng thủ chỉ bật I/hạ cấp/tắt trong lãnh thổ gốc. [Đặc tả61](61-mach-dang-va-cong-tac-phong-thu.md) | Lựa chọn thắp I/II, bảo vệ/ngắt và cơ hội phản công; không bê hình thức ward đối thủ | Hai client, vật cản, bụi, tàng hình, minimap, bot không đọc địch ẩn; timer và spam nhiều người |
| Event | Báo trước cơ hội đổi kế hoạch; lịch quá dày ép người chơi | **Nhịp Mạch:** tối đa một biến động thử nghiệm, không đổi luật Slice lúc nghiên cứu | Không chép event/boss đặc trưng | Báo trước, tranh/nhường/đổi mục tiêu; đo snowball và comeback |

Ý tưởng Mạch Soi tổng quát được cụ thể hóa bằng Mạch Đăng theo hướng user mới nhất. Cộng Hưởng/Nhịp Mạch vẫn là giả thuyết, không phải feature bắt buộc. Bỏ đề xuất nếu không thêm quyết định đáng giá hoặc làm game khó đọc/khó cân bằng.

## 5. Tầm nhìn và ánh sáng: bốn thứ riêng

1. **Ánh sáng mỹ thuật:** mặt trời, đèn, VFX. Không tự làm địch hiện lên.
2. **Vision đội:** vùng được biết vị trí địch nhờ tướng/lính/trụ/thiết bị.
3. **Fog of War:** cách thể hiện thông tin chưa có hoặc đã mất; không phải chỉ phủ màu tối.
4. **Detection:** phát hiện mục tiêu tàng hình; không mặc định mọi vision đều có detection.

Tầm bắn trụ14m **không chứng minh** bán kính vision14m. Đèn trang trí không mặc định là thiết bị soi. Bụi mờ/viền tướng của mình không chứng minh tướng địch bị ẩn đúng. Chu kỳ ngày/đêm Dota là một lựa chọn có gameplay riêng; không tự thêm vì concept Cổ Linh có cảnh tối.

Trước khi làm vision phải chốt ngắn: nguồn vision, bán kính, vật cản, bụi, thời gian mất dấu, detection, minimap và thông tin bot được đọc. Chưa tìm thấy contract đầy đủ trong các file runtime đã rà; không kết luận engine không có vision chỉ từ việc thiếu một file tên `vision.js`.

## 6. Đối chiếu runtime Cổ Linh hiện tại — SOURCE REVIEW

| Nội dung | Kết quả tại commit đã ghim |
|---|---|
| Vào trận / chiêu | LMB dùng ngay; Q/RMB(W)/E cùng mở ởL1, tự tăng rank tại1/3/5/7/9; R mởL6, tăngL11/L15. `combat.js:rankOf`, `heroes.yml` |
| Mở dần Q/W/E | **Chưa phải runtime hiện tại.** Không mô tả thành đã triển khai; muốn thử phải là đề xuất riêng |
| Lên cấp HP | Bot lưu HP trước recompute rồi khôi phục; tăngMaxHP không hồiCurrentHP. Không flag hàm recompute riêng lẻ là lỗi level-up |
| Trụ | Range14m; interval1.2s; damage gốc150; ramp35%/phát, trần105%; đổi target reset. `structures.yml`, `lane.js` |
| Chuỗi150/203/255/307 | Chuỗi damage gốc được làm tròn trong code; HP mất thực tế còn qua giáp, shield/interpose và trạng thái. Không dùng con số gốc như HP mất |
| Lính phản ứng | Aggressor lấy từ `heroBodies`, dùng được với bot; `stepMinions` xét aggressor trước fallback mục tiêu thường. Bible §4 còn mô tả ưu tiên khác, cần đồng bộ |
| Last-hit lính | `lane.js:reward` cấp gold+XP+CS chohero gây đòn cuối; hàm này không cấp XP theo khoảng cách hoặc phần riêng support. Wave đủ thành phần thường là171gold/290XP trước các điều kiện cap/super |
| Recall | Data8s; bot có channel/hủy. Source không thay nghiệm thu bị đánh/cast/di chuyển ởclient |
| Item đang ship | Shopởnhà,6ô,bán60%; bộ hiện tại khác candidate24item ở59. Giáp Thiết hiện450gold,+40armor,+220HP; không ghi nhầm+200HP |
| Quái/boss | `objectives.yml:neutral_v01` có số nhưng `provisional:true`, `shipped:false`, `enabledInMachGiua:false`; preview không cấp thưởng. Không gọi là rừng đã ship |

### Ba điểm AI cần sửa hoặc làm rõ

Thẩm định độc lập đã đọc cùng commit, không chạy trận và không sửa code.

1. **Tank trụ:** `allyTanks` chỉ kiểm có lính ta trong vùng. Cần xác nhận trụ đang nhắm lính ta còn sống, thay vì suy từ presence; đánh giá lính có sống tới lúc bot thoát không. Hiện có thể coi là an toàn khi trụ đang nhắm một tướng khác.
2. **Khả năng hạ địch:** `readySkills` cộng damage gốc; `killable` cộng thêm2.5sđánh thường. Chưa trừ kháng, xét đầy đủ tầm/cast/skillGap/shield. Dùng heuristic này để dive có thể quá lạc quan.
3. **Chi phí dive:** `towerCost` nhân0.75 cố định. Cần dùng giáp thật và chuỗi/nhịp bắn đang có; cùng bot nhưng cấp/đồ khác sẽ chịu damage khác. Không cần đổi damage trụ để sửa quyết định bot.

Ba trạng thái FARM/TRADE/RETREAT hiện có là đủ làm baseline; siege/chase/recall là hành động có điều kiện. Không cần viết lại cả hệAI để có tên trạng thái đẹp hơn. Dự báo chỉ dùng thông tin hợp lệ người chơi có thể biết; không cho bot đọc vị trí/cooldown địch ẩn mặc định.

## 7. Gắn với bộ quái có sẵn

Dùng `colinh_character_pack_agent_ready/creature-manifest.json` và `AGENT_BUILD_PROMPTS.md` local; không dựng một pack khác.

- Lạc Vệ/Lạc Sứ/Thiết Thú: lane melee/caster/siege; Thiết Thú không tự biến thành super.
- Thỏ Ngọc/Thạch Trư/Thạch Hầu/Sơn Quy: camp candidate; tách phần thưởng hạ quái khỏi quyền điều khiển merc wave nếu contract dùng merc.
- Mộc Linh Hộ Mạch/Bạch Hạc Thủ Vệ: buff/miniboss candidate; chức năng buff chưa được suy từ ngoại hình.
- Thủy Ngư/Cá Thần Thiên Hà: experimental bị tắt; Cá Thần không phải Titan và không tự cấp buff thắng trận.

ID appearance của manifest và key trong `neutral_v01` chưa đồng nhất hoàn toàn (`wood_spirit_golem`/`wood_golem`, `guardian_white_crane`/`white_crane`, `celestial_river_whale`/`river_whale`). Cần một mapping rõ khi tích hợp, không tạo thêm loài vì lệchID.

## 8. Plan ngắn cho studio

| Lượt / owner | Việc làm | Điều kiện xong |
|---|---|---|
| 1 · Codex nghiên cứu/thẩm định | Hoàn thiện nguồn nhiều game, audit runtime và đề xuất; Savi đồng bộ Bible các chỗ lệch | Mỗi đề xuất có nguồn/nguyên lý/đánh đổi/originality/QA và trạng thái |
| 2 · Savi + WispAI | Sửa ba dự toán AI trên; giữ combat và số ship | Bot farm/đẩy trụ có lính tank thật, khôngdive từ damage gốc; testplayer↔botvàbot↔bot |
| 3 · Wispbalance + Codexreview | So kinh tếlast-hit/support và tiến trìnhskill ởprofile riêng; tái dùng tools/balance vàitemtool | Có hash/seed/giả định; báo thu nhập/XP/clear-time, không gọi mô hình thànhclient |
| 4 · Savi thiết kế5v5 | Chốt một bản camp/buff/vision/boss từ tài nguyên đã có, sau khi phạm vi được duyệt | Contract ngắn đủownership/timer/phảnchế/QA; không bật toàn bộ đề xuất cùng lúc |

### Những ca nghiệm thu phải có

- Player đánh hero dưới trụ; bot đánh player; bot đánh bot: trụ đổi mục tiêu đúng cùng một luật.
- Bắn liên tiếp cùng hero rồi đổi mục tiêu: ramp/reset; so damage gốc với HP mất sau giảm trừ.
- Lính đang tank, lính sắp chết, lính vừa chết, trụ đang nhắm hero khác: bot xử lý khác nhau.
- Cùng tình huống thay giáp/shield/range/cooldown: quyết định dive thay đổi hợp lý.
- Mỗi trong6tướng: farm, trade, lùi, đẩy, recall; đủ cậnchiến/xạthủ/pháp sư/support, không chỉ một build chung.
- Last-hit bằng LMB/skill/DoT/player/bot; lính/trụ kết liễu; simultaneous kill: thưởng chỉ một lần đúng owner.
- Lên cấp trong giao tranh: tăngMaxHP nhưng CurrentHP không tăng vì level-up.
- Vision với2client: địchẩn không hiện ởminimap/targeting/bot; hếtvision xử lýnhấtquán.
- Camp reset/death/respawn; boss bị cướp; buff hết hạn/người nhận chết: khôngnhânđôithưởng.

Metrics: CS thành công trên cơ hội có thể lấy, thời gian theo từng hành động, damage trade, số chết vì trụ, push có kết quả, recall hoàn tất/bị ngắt, thời gian mất mục tiêu, phân phối vàng/XP và clear-time. Counter `state.ai.push` hiện tăng mỗi decisiontick nên không phải sốlầncôngthành; `dive` cũng không phải sốlầnlaovào. Muốn báo theo lần phải gom theo episode hoặc phân tíchtrace, không bịa từcounter.

## 9. Kết luận thẩm định

Hội đồng thực hiện: Codex tổng hợp; `moba_support_economy_research` nghiên cứu support/kinh tế/UNITE; `moba_jungle_objectives_research` nghiên cứu rừng/boss/HoK; `moba_bot_rules_review` audit source AI và thẩm định bản tổng hợp độc lập với tác giả. Thẩm định phát hiện một claim Dota7.39 thiếu đường truy xuất trong bản tổng hợp; đã bỏ claim đó, giữ các nguồn lịch sử có link. Không có lượt chơi thật trong nghiên cứu này.

Góp ý ChatGPT về bot đúng hướng; bản mới đã có phần lớn hành vi đó. Ba dự toán AI ở§6 cần cải thiện; luậtramp/level-up không cần báo lại như lỗi đã chứng minh. Research chưa thay nghiệmthuclient. Support/vision/boss có kế hoạch nhưng chưa phải approvedgameplay. Chưa chứng nhận production-ready cho các hệ thống đó.

Tài liệu liên quan: [58 · Nghiên cứu item](58-nghien-cuu-va-thiet-ke-he-item.md), [59 · Bộ item đề xuất](59-he-trang-bi-de-xuat.md), [Toolitem](../../tools/balance/items/README.md), [Bible](00-bible-moba.md), [Doc14](14-todo-lobby-va-playtest.md). LinkBible là đích canonical trên remote tại commit đã ghim; checkoutlocal cũ chưa cófileđó.
