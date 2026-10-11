# Nghiên cứu và đề xuất hệ trang bị Cổ Linh

Ngày: 09/10/2026. **RESEARCH + PROPOSAL, chưa phải USER LOCK và chưa đổi số ship.** Đối chiếu runtime tại `ad7948ab9710ac1adb2b561049821da8e0cb1da8`. Phạm vi: trang bị dùng vàng trong trận, không phải skin hay chợ vật phẩm tiền thật.

## 1. Kết luận dùng để giao việc

Hệ hiện tại là tám món mua riêng, chưa có cây ghép đồ. Cần xây ba tầng **Cơ bản → Trung cấp → Hoàn chỉnh**. **Core** nghĩa là món chủ lực của một cách chơi/tướng, không phải một tầng cao hơn Hoàn chỉnh. Late game là lúc hoàn thiện và đổi đồ theo đối thủ, không mặc định mở một tầng cộng chỉ số vô hạn.

Không sao chép số HP/giáp từ LoL, Dota hay Liên Quân sang Cổ Linh. So sức mạnh theo tỷ lệ trên tướng, giá vàng, thời điểm mua và hiệu quả mỗi ô túi.

## 2. Đối thủ xây hệ vật phẩm thế nào?

| Game | Điều đã kiểm chứng từ nguồn chính thức | Bài học cho Cổ Linh |
|---|---|---|
| LoL | Riot phân biệt component, Epic và Legendary; vật phẩm có đầu vào/đầu ra, giá ghép, tổng giá, giá bán và chỉ số riêng. Riot 14.19 kiểm soát sức mạnh các món trung gian chống chịu để tránh bóp nghẹt lane. | Đường ghép phải mượt; món hoàn chỉnh cần giá trị theo vai trò, nội tại và hiệu quả ô túi. Không để món đầu trận vừa rẻ vừa giải quyết mọi nhu cầu. |
| Dota 2 | Patch 7.20 công bố công thức thành phần + recipe và tổng giá; 7.00 mô tả backpack không cấp chỉ số, ghép đồ và tháo đồ. | Đồ có thể tạo lựa chọn chiến thuật và quản lý ô túi; Cổ Linh chỉ cần cây ghép trước, chưa cần thêm backpack/courier/tháo đồ. |
| Liên Quân | Học viện Garena có món một chỉ số, món trung gian có nội tại và món hoàn chỉnh kết hợp nhiều chỉ số + nội tại duy nhất. | Phân tầng dễ hiểu trên mobile; người chơi cần thấy món nào nâng cấp được, tác dụng chính và lý do chọn nó. |

Nguồn: [Riot 14.19](https://www.leagueoflegends.com/en-au/news/game-updates/patch-14-19-notes/), [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon_items), [Valve 7.20](https://www.dota2.com/720/), [Valve 7.00](https://www.dota2.com/700/gameplay/), [Học viện trang bị Garena](https://lienquan.garena.vn/hoc-vien/trang-bi/).

**Mốc nguồn:** Valve 7.00/7.20 và Riot 14.19 là ví dụ lịch sử về thiết kế, không phải bảng cân bằng hiện hành 2026. Data Dragon `16.20.1` là snapshot truy cập 09/10/2026; không tự coi là phiên bản live mọi khu vực. Trang Garena không ghi patch nên chỉ dùng đúng dữ liệu hiển thị tại ngày đọc.

### Ví dụ có số: thấy đường nâng cấp, không dùng để tune Cổ Linh

LoL, Data Dragon 16.20.1:

| Món | Tổng giá | Chỉ số | Giá bán | Đường ghép |
|---|---:|---|---:|---|
| Cloth Armor | 300 | 15 giáp | 210 | Thành phần đầu |
| Ruby Crystal | 400 | 150 HP | 280 | Thành phần đầu |
| Chain Vest | 800 | 40 giáp | 560 | Cloth Armor + 500 vàng |
| Thornmail | 2450 | 75 giáp, 150 HP; mô tả có hiệu ứng riêng | 1715 | Bramble Vest + Chain Vest + Ruby Crystal + 450 vàng |
| Doran's Shield | 450 | 110 HP, hồi máu | 180 | Không có đầu ra ghép trong snapshot |

Nguồn số: [item.json chính thức](https://ddragon.leagueoflegends.com/cdn/16.20.1/data/en_US/item.json). Chỉ số trong `stats` không thay toàn bộ mô tả/nội tại.

Liên Quân, trang Garena khi đọc: Giáp nhẹ 220 vàng/90 giáp; Nhẫn hồng ngọc 300 vàng/300 HP; Giáp hiệp sĩ 730 vàng/210 giáp và nội tại giảm tốc đánh người đánh mình; Giáp thống khổ 1940 vàng/300 giáp/1200 HP và phản sát thương. Đây là các mức độ phức tạp khác nhau; trang này chưa đủ để xác minh chính xác mọi cạnh trong cây ghép. Không so trực tiếp 90 giáp Liên Quân với 40 giáp Cổ Linh.

## 3. Bán lại, nâng cấp và hoàn tác là ba việc khác nhau

- **Bán lại:** trả vàng theo giá bán của món, mất món và chỉ số. Đây là chi phí đổi hướng lên đồ.
- **Nâng cấp:** dùng thành phần đang có làm nguyên liệu, được trừ toàn bộ giá thành phần theo công thức. Không bán thành phần rồi mua lại món đích.
- **Hoàn tác mua nhầm:** cơ chế riêng có điều kiện chống lạm dụng; không đồng nghĩa bán lại luôn được 100%.

LoL snapshot: Cloth Armor, Chain Vest và Thornmail bán 70% tổng giá; Doran's Shield bán 40%. Vì vậy không dùng một tỷ lệ chung để khẳng định mọi vật phẩm đối thủ. Valve có xác nhận cơ chế sellback và việc dùng Bottle không còn được hoàn đủ giá trong [Balance of Power](https://www.dota2.com/balanceofpower?l=dutch). Lượt này chưa xác minh được từ nguồn chính thức đủ điều kiện tỷ lệ bán thông thường và cửa sổ thời gian hiện hành của Dota; cũng chưa xác minh được tỷ lệ bán hiện hành Liên Quân. **Không lấy các con số truyền miệng làm luật sản xuất.**

Cổ Linh hiện dùng 60%, `Math.round(cost × 0.6)`, chỉ trong vùng shop căn cứ. Giữ luật này trong vòng thiết kế; thay tỷ lệ phải có phân tích kinh tế riêng. Đề xuất cho phép override giá bán từng món khi có lý do. Hoàn tác và tháo đồ để roadmap, không chặn cây ghép tối thiểu.

## 4. Audit sức mạnh đồ hiện tại

Nguồn: `economy.yml`, `combat.js`, `hero/match/economy.js`, `hero/match/roster.js` ở commit trên.

| Món | Giá | Chỉ số | Vấn đề |
|---|---:|---|---|
| Giáp Thiết | 450 | 40 giáp + 220 HP | Có thể mua ngay với 500 vàng đầu trận; mạnh cho cả tank và tướng máu thấp. Chưa có tầng. |
| Giáp Minh Ước | 1050 | 80 giáp + 480 HP | Chưa có recipe/nội tại phân biệt. Hai Giáp Thiết 900 vàng đã có 80 giáp + 440 HP. |

Với Nham Vũ L1 hiện tại: 502 HP và 26 giáp. Trước đồ, sức chịu sát thương vật lý quy đổi là `502 × 1.26 = 632.52`; sau Giáp Thiết là `722 × 1.66 = 1198.52`, tăng khoảng **89.5%**. Đây là phép tính tĩnh theo công thức giáp runtime, bỏ qua xuyên giáp, hồi phục, khiên, sát thương phép/chuẩn và cách chơi. Không phải kết quả mô phỏng tỷ lệ thắng.

Do đó **40 giáp không tự nó chứng minh quá cao**, nhưng cả HP + giáp ở giá mua ngay khiến bước tăng chống chịu đầu trận quá lớn để bỏ qua. Không giải quyết bằng việc làm late item lớn gấp nhiều lần.

Hiện mua Giáp Minh Ước khi đã có Giáp Thiết vẫn mất thêm 1050 vàng và giữ cả hai món. Bán Giáp Thiết nhận 270 rồi mua món lớn khiến tổng chi ròng 1230 thay vì mua thẳng 1050. Nếu đề xuất Giáp Thiết là thành phần trực tiếp của món lớn, phí nâng cấp minh họa là 600 vàng; **đây chưa phải recipe được duyệt**.

Simulator duel đang dùng chỉ số trừu tượng theo 1000 vàng, không mua danh mục thật: chẳng hạn fighter 8 giáp/1000 vàng, trong khi Giáp Thiết đạt khoảng 88.9 giáp/1000 vàng. Shop chưa có đồ AP/MR/xuyên giáp nhưng sim có các nhánh đó. Kết quả sim hiện tại chưa đủ chứng minh cây đồ thật cân bằng.

## 5. Thiết kế đề xuất đủ cho agent bắt đầu

### 5.1 Ba tầng và các nhánh

- **Cơ bản:** một chỉ số chính; mua để bổ sung nhu cầu cụ thể và ghép tiếp. Đồ khởi đầu nhiều lợi ích phải ghi riêng là starter có đánh đổi, không mặc định coi là component.
- **Trung cấp:** ghép từ cơ bản, tập trung một nhu cầu; có thể có nội tại nhỏ. Giáp Thiết hiện phù hợp để đánh giá làm trung cấp hơn là giữ nhãn cơ bản.
- **Hoàn chỉnh:** nhiều chỉ số có quan hệ với vai trò + một lợi ích khác biệt, có cách đối phó; tiết kiệm ô túi. Tránh tất cả đều chỉ tăng HP/giáp/AD.
- **Nhánh ưu tiên:** đánh thường/tốc đánh, sát thương chiêu vật lý, phép, chống vật lý, chống phép, hỗ trợ/hồi phục. Mỗi tướng có build chủ lực và lựa chọn theo đối thủ; không bắt mọi class dùng cùng bộ giáp.
- **Late:** đổi một món tình huống hoặc starter khi đầy túi, cân nhắc phí bán; không cần thêm tier chỉ để gọi là late.

Danh mục hiện có là điểm xuất phát, không bỏ ID/assets đang dùng. Tên và lore mới đi cùng VI–EN. Số mới và số lượng danh mục xác định sau lượt đo bằng các build thật, không đặt thành USER LOCK trong tài liệu nghiên cứu.

### 5.2 Hợp đồng dữ liệu tối thiểu

Giữ `economy.yml` là nguồn hiện hành; bổ sung theo migration thống nhất: tier, tổng giá, danh sách thành phần và số lượng, phí ghép, stats, passive/active, nhóm nội tại duy nhất, giới hạn bản sao, giá bán hoặc tỷ lệ override, tags vai trò, tên/mô tả VI–EN, icon qua resolver. Bot, shop, tooltip và simulator cùng đọc danh mục này. Không tạo thêm `items.yml` song song chưa có consumer.

Giá cuối = tổng giá thành phần trực tiếp + phí ghép. Khi nâng cấp, chọn thành phần đúng số lượng trong túi, tính giá còn thiếu, kiểm vị trí/vàng và số ô **sau khi tiêu thụ**, rồi đổi một lần. Mua trực tiếp món hoàn chỉnh trả tổng giá. Không được trừ vàng/đồ một nửa khi giao dịch bị từ chối; không tính hai lần thành phần lồng nhau.

Chỉ số và nội tại có luật cộng riêng. Nội tại cùng nhóm không nhân đôi ngoài thiết kế. Hồi chiêu active không được reset bằng bán/mua hay nâng cấp. Túi sáu ô và một relic vẫn giữ cho tới khi có quyết định mới.

### 5.3 Shop phải thể hiện

Ba tầng; cây thành phần; số vàng còn thiếu; thành phần đã có; tác dụng/nội tại duy nhất; giá bán trước xác nhận; gợi ý core và tình huống theo tướng. Nút mua vẫn theo luật căn cứ. Không đưa chỉ số hiệu quả giả vào tooltip.

## 6. Ba lượt giao việc, tránh kéo dài

1. **Designer + balance:** đặt cây cho tám món đang có, bổ sung các nhánh còn thiếu cho sáu tướng; ghi bảng số đề xuất cùng công thức, không tăng late stats máy móc. Đầu ra: một catalog và build theo vai trò.
2. **Gameplay + UI + bot:** triển khai recipe/nhóm nội tại/giá bán từ catalog; shop hiển thị phần còn thiếu. Hoàn thành khi nâng cấp được cả túi đầy có nguyên liệu và không có giao dịch dở dang; bán không reset active.
3. **Balance + QA độc lập:** chuyển sim sang đúng inventory/recipe/stat runtime, đo mốc L1/6/11/15 theo ngân sách vàng ngang nhau và đối chiếu một vòng chơi thật. Ghi seed/hash/mode; nếu sim vẫn khác runtime thì sửa công cụ trước, không chỉnh số để ép report đẹp.

Tiêu chí kết thúc: từng món có tier/recipe/giá/nội tại/mô tả; sáu tướng có lựa chọn dùng được; runtime/UI/bot/sim dùng cùng dữ liệu; các lỗi giao dịch quan trọng đã kiểm. Chưa cần mở toàn bộ item cho 27 tướng hay thêm hệ Dota phức tạp để hoàn thành Slice.

## 7. Sản phẩm đã làm từ nghiên cứu này

- [59 — bộ trang bị V0.1](59-he-trang-bi-de-xuat.md): 24 món riêng của Cổ Linh, recipe, VI–EN, brief icon, counterplay và build sáu tướng. Bảng số là proposal; chưa thay catalog đang ship.
- [Công cụ và cách chạy](../../tools/balance/items/README.md): đọc snapshot runtime cố định, kiểm giao dịch, mô phỏng đánh thường có seed, tính EHP/DPS và chạy biến thể thông số. Có hai profile core-only/core-plus-alternatives, luôn ghi vàng thực sự đã tiêu.
- [Thẩm định độc lập](reports/2026-10-09-item-council-review.md): kết quả chạy và lỗi đã sửa; phân biệt hợp đồng sự kiện với nội tại chạy liên tục trong trận.
- [Kết quả sàng lọc](../../reports/items-v01/screen.md): không phải mô phỏng trận MOBA đầy đủ. Bảy nội tại chưa nằm trong combat loop, chiêu/CC/di chuyển và active vẫn ngoài phạm vi; không dùng kết quả này chốt win rate hay sức mạnh toàn kit.

Nghiên cứu, catalog và công cụ là ba lớp khác nhau. Số đối thủ không được đưa thẳng vào candidate; candidate cũng không tự thành số ship sau khi fixture PASS.
