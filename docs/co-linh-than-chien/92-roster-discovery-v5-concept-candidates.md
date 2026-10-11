# 92 · COLINH Hero Roster Discovery V5 — concept candidates for team audit

**Ngày:** 11/10/2026  
**Trạng thái:** `RESEARCH / TEAM_AUDIT_INPUT / NOT_APPROVED`  
**Scope:** đưa toàn bộ vòng nghiên cứu mới vào repo để một team audit tiếp. Chưa chốt 24 tướng, chưa tạo asset, chưa tạo kit số, chưa chạy Balance Lab, chưa PASS_MODEL/PASS_ENGINE.

## 0. Tóm tắt quyết định của creator

- Làm lại theo dạng đề xuất, không đi thẳng vào production-ready kit.
- Bắt đầu từ **concept / player fantasy / gameplay toy**, chưa cần skill chi tiết.
- Nếu concept ban đầu tệ thì không đáng nghĩ tiếp skill, stat hoặc lore.
- Game được build bằng AI nên mỗi concept phải qua cổng khả thi: model, rig, animation, VFX, skill logic.
- **Pet / drone / summon không được điều khiển thủ công như unit thứ hai.** Chỉ cho phép auto-follow, auto-attack theo target đã mark, point-and-return, mode switch, hoặc one-shot summon.
- Control lock giữ nguyên: **Q/W/E/R = 4 skill**, **R = Ultimate**, **D = dash chung**, basic attack tách riêng.

## 1. Lý do bỏ hướng V4

V4 đã tốt hơn về AI feasibility nhưng vẫn sai trọng tâm: nó bắt đầu bằng danh sách tướng và rig, chưa đủ chứng minh lý do người chơi muốn pick. Hướng V5 bắt đầu bằng câu hỏi:

> Người chơi pick tướng này để được làm điều gì mà tướng khác không làm được?

Một tướng tốt phải có câu bán hàng ngắn: `Tôi pick nó vì tôi được ...`. Tạo hình, lore, skill và production đều phải phục vụ câu đó.

## 2. Tiêu chuẩn lọc concept

| Cổng | Câu hỏi |
|---|---|
| Player fantasy | Nhìn tên + hình + câu bán hàng có muốn thử chơi không? |
| Core gameplay toy | Có một đồ chơi chính khác tướng khác không? |
| Agency | Người chơi có quyết định thú vị hay chỉ bấm skill theo cooldown? |
| Counterplay | Đối thủ có đọc, né, bait hoặc phản chế được không? |
| MOBA fit | Có hợp giao tranh 5v5, lane, objective, camera MOBA không? |
| AI production | Có thể model/rig/animate/implement bằng pipeline AI không? |

Loại ngay nếu: chỉ là humanoid đổi chất liệu; R là Q phóng to; phải micro nhiều unit; cần đổi engine nặng mà không có fallback; quá giống tướng nổi tiếng về tên, silhouette, vũ khí, combo hoặc lore.

## 3. Vòng A — 120 archetype gameplay

Đây chưa phải tướng COLINH. Đây là kho nguyên liệu gameplay.

### A1 · Outplay / lừa / phản nhịp

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 1 | Kẻ Đổi Bóng / Shadow Swapper | đổi chỗ với dấu giả đúng khoảnh khắc | Vừa |
| 2 | Đấu Sĩ Phản Nhịp / Rhythm Parrier | chờ đúng nhịp để phản đòn | Vừa |
| 3 | Kiếm Khách Dấu Vết / Trace Duelist | lưu vị trí chém rồi lặp lại nhát kiếm | Vừa |
| 4 | Kẻ Cười Sau Lưng / Backstep Jester | khiến địch đánh sai hướng | Vừa |
| 5 | Người Mượn Đòn / Borrowed Strike | biến đòn địch thành tài nguyên | Vừa |
| 6 | Kẻ Ăn Cooldown / Cooldown Leech | trừng phạt người spam skill | Vừa |
| 7 | Thợ Săn Sai Số / Error Hunter | tìm lỗi trong chuyển động địch | Vừa |
| 8 | Sát Thủ Dấu Chân / Footprint Assassin | dùng dấu chân giả làm bẫy | Vừa |
| 9 | Kẻ Chẻ Hướng / Angle Splitter | thắng bằng góc đánh hơn sát thương | Dễ |
| 10 | Võ Sư Một Nhịp / One-Beat Master | ít đòn nhưng cực đúng thời điểm | Dễ |
| 11 | Người Bắt Thở / Breath Catcher | đọc thời điểm đối thủ tung chiêu | Vừa |
| 12 | Kẻ Đảo Tay / Hand Reverser | đổi hướng đòn đang chuẩn bị | Khó |

### A2 · Kéo / bắt lỗi vị trí

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 13 | Móc Kéo / Hooker | bắt lỗi đứng sai vị trí | Dễ |
| 14 | Neo Dây / Anchor Gunner | bắn neo rồi chọn kéo mình hay kéo mục tiêu | Vừa |
| 15 | Roi Mạch / Vein Whip | quất dây tạo vùng cấm ngắn | Dễ |
| 16 | Cần Câu Chiến Trường / Battle Angler | câu mục tiêu hoặc câu đồng minh cứu ra | Vừa |
| 17 | Kẻ Căng Dây / Line Trapper | đặt hai mốc thành dây bẫy | Vừa |
| 18 | Thợ Săn Lao / Harpoon Hunter | phóng lao ghim rồi kéo theo hướng chạy | Vừa |
| 19 | Xiềng Một Đầu / One-End Chain | tự khóa mình với địch để duel | Dễ |
| 20 | Cột Móc / Pole Grappler | xoay quanh một cột mốc tự tạo | Vừa |
| 21 | Kẻ Kéo Vùng / Zone Tugger | kéo vùng nguy hiểm, không kéo người | Vừa |
| 22 | Chài Lưới / Net Caster | ném lưới làm chậm theo diện | Dễ |
| 23 | Móc Ngược / Reverse Hook | kéo bản thân tới mục tiêu thay vì kéo địch | Dễ |
| 24 | Dây Phán Xét / Judgment Chain | nối hai địch, trừng phạt nếu tách/đứng gần | Vừa |

### A3 · Lao vào / lực đè

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 25 | Quái Vật Húc / Beast Charger | lao thẳng phá đội hình | Dễ |
| 26 | Đô Vật / Grappler | ôm vật một mục tiêu chủ lực | Vừa |
| 27 | Võ Sĩ Piston / Piston Boxer | tích lực tay máy rồi đấm cực nặng | Dễ |
| 28 | Chiến Xa Sống / Living Chariot | ép góc bằng đà chạy | Dễ |
| 29 | Kẻ Đạp Đất / Ground Stomper | thắng bằng nhịp dậm vùng | Dễ |
| 30 | Bò Tót Mạch / Vein Bull | càng chạy lâu càng nguy hiểm | Dễ |
| 31 | Tường Người / Body Wall | dùng thân chắn đường tạm thời | Vừa |
| 32 | Người Tăng Nhiệt / Heat Bruiser | càng bị đánh càng nóng | Dễ |
| 33 | Kẻ Bẻ Đội Hình / Formation Breaker | đẩy tuyến trước vào tuyến sau | Vừa |
| 34 | Búa Quỹ Đạo / Orbit Hammer | quay búa ép vùng quanh thân | Dễ |
| 35 | Khổng Lồ Chậm / Slow Titan | chậm nhưng mỗi bước ép map | Vừa |
| 36 | Người Kéo Trụ / Siege Brute | sinh ra để phá công trình | Vừa |

### A4 · Bẫy / kiểm soát vùng

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 37 | Thợ Mìn / Mine Engineer | biến khu vực thành bẫy | Vừa |
| 38 | Họa Sĩ Địa Hình / Terrain Painter | vẽ vùng nguy hiểm trên đất | Vừa |
| 39 | Người Cắm Cọc / Stake Setter | dựng cọc tạm để khống chế đường đi | Vừa |
| 40 | Nhện Dệt Đường / Web Weaver | nối vùng bằng mạng chậm | Vừa |
| 41 | Người Đặt Chuông / Bell Trapper | đặt chuông báo động và slow | Dễ |
| 42 | Kẻ Đếm Bước / Step Taxer | phạt địch di chuyển quá nhiều trong vùng | Vừa |
| 43 | Bẫy Ký Ức / Memory Snare | vùng ghi lại hành động rồi nổ | Khó |
| 44 | Thợ Săn Cỏ / Brush Hunter | mạnh khi kiểm soát bụi/cỏ | Dễ |
| 45 | Vòng Cấm / Ring Warden | tạo vòng ranh giới, đi qua bị phạt | Vừa |
| 46 | Người Dời Bẫy / Trap Mover | đặt bẫy rồi đẩy bẫy đi | Vừa |
| 47 | Kẻ Khóa Lối / Path Denier | tạo đường nguy hiểm thay vì tường thật | Dễ |
| 48 | Vườn Ăn Thịt / Predatory Garden | gieo mầm phục kích | Vừa |

### A5 · Macro / chiến thuật / phá luật trận

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 49 | Ký Sinh Sư / Remote Symbiote | hỗ trợ từ xa qua đồng minh | Khó |
| 50 | Người Điều Drone / Drone Commander | điều một drone đơn giản | Vừa |
| 51 | Ba Đơn Vị Nhỏ / Triple Unit | điều 3 thân yếu khác nhau | Khó |
| 52 | Song Hồn / Two-Mind Hero | một thân, hai bộ kỹ năng theo nhịp | Khó |
| 53 | Thủ Kho Lane / Lane Clerk | buff lính/lane hơn giao tranh trực diện | Vừa |
| 54 | Người Gọi Mục Tiêu / Objective Caller | mạnh quanh mục tiêu trung lập | Dễ |
| 55 | Người Bẻ Sóng Lính / Wave Bender | đổi nhịp wave nhỏ | Khó |
| 56 | Kẻ Đánh Thuế Vàng / Gold Taxer | đánh vào kinh tế nhỏ, không trực tiếp kill | Khó |
| 57 | Người Ghi Nợ / Debt Support | ghi nợ sát thương rồi xử lý | Vừa |
| 58 | Bản Đồ Sống / Living Map | dùng ping/vùng nhìn làm gameplay | Khó |
| 59 | Quản Gia Chiến Trường / Battlefield Butler | dọn dẹp, nhặt, chuyển tài nguyên nhỏ | Vừa |
| 60 | Sứ Giả Cổng / Gate Runner | mở đường ngắn cho team | Khó |

### A6 · Sinh vật lạ nhưng khả thi

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 61 | Hổ Nấm / Mushroom Tiger | săn mục tiêu đã bị đánh dấu | Vừa |
| 62 | Cua Cửa Đập / Floodgate Crab | chắn hướng sát thương bằng càng | Vừa |
| 63 | Lươn Đêm / Night Eel | phục kích theo tuyến nước | Vừa |
| 64 | Sứa Chuông / Bell Jellyfish | hồi/chậm theo nhịp sóng | Vừa |
| 65 | Bọ Ngựa Xạ Thủ / Mantis Marksman | bắn ghim tạo dây bẫy | Vừa |
| 66 | Tê Tê Khiên / Pangolin Guard | tháo vảy làm tài nguyên | Vừa |
| 67 | Rắn Hai Đầu / Twin Serpent | đổi đầu độc/hồi | Khó |
| 68 | Nhím Phản Đòn / Spineback | bị đánh trả gai | Dễ |
| 69 | Cá Mập Cạn / Land Shark | lao dưới mặt đất giả lập | Vừa |
| 70 | Bạch Tuộc Ngắn / Short-Tentacle Octo | dùng 4 tua cố định zone | Vừa |
| 71 | Chim Công Sợ Hãi / Peacock Terror | xòe đuôi gây sợ theo hướng | Vừa |
| 72 | Kỳ Nhông Đổi Màu / Chameleon Scout | đổi màu để lừa target/vision | Vừa |

### A7 · Công nghệ cổ / máy sống

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 73 | Phi Công Cổ Khí / Relic Pilot | lái máy bay đặt góc oanh tạc | Dễ |
| 74 | Mắt Thiên Cơ / Oracle Eye | đứng lấy nét bắn cực chuẩn | Dễ |
| 75 | Lò Phản Ứng / Reactor Tank | tích nhiệt rồi xả áp | Dễ |
| 76 | Sách Máy / Living Book | lưu damage đã chắn thành tài nguyên | Vừa |
| 77 | Vòng Quỹ Đạo / Orbital Support | xoay khiên theo hướng | Vừa |
| 78 | Chiến Xa Gãy / Broken Engine | lăn/đẩy nhưng khó quay đầu | Dễ |
| 79 | Robot Một Tay / One-Arm Automaton | đổi giữa tay khiên/tay pháo | Dễ |
| 80 | Máy Dệt Ánh / Light Loom | dệt tia thành vùng | Vừa |
| 81 | Tháp Đi Bộ / Walking Turret | tự là pháo đài di động | Vừa |
| 82 | Drone Y Tế / Medic Drone | bay quanh ally được chọn | Dễ |
| 83 | Thợ Máy Bom / Bomb Mechanic | ném bom có fuse rõ | Dễ |
| 84 | Cỗ Máy Lỗi / Glitch Machine | đổi hiệu ứng giữa 2 trạng thái lỗi | Vừa |

### A8 · Pháp sư concept mạnh

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 85 | Trọng Lực Sư / Gravity Mage | kéo/đẩy nhẹ để setup combo | Vừa |
| 86 | Pháp Sư Mực / Ink Painter | vẽ đường ép di chuyển | Vừa |
| 87 | Lăng Kính / Prism Mage | bẻ tia theo góc | Vừa |
| 88 | Mộng Sư / Dream Mage | làm địch chọn sai hướng/nhịp | Khó |
| 89 | Thời Gian Trễ / Delay Mage | gây sát thương sau vài giây | Dễ |
| 90 | Kẻ Ghi Sổ / Ledger Mage | ghi nợ damage, trả sau | Vừa |
| 91 | Phù Thủy Âm / Sound Mage | đánh theo nhịp sóng âm | Vừa |
| 92 | Băng Gương / Mirror Ice | phản chiếu một phần projectile | Khó |
| 93 | Cát Ký Ức / Sand Memory | đặt cát lưu vết di chuyển | Vừa |
| 94 | Sao Non / Star Seed | gieo sao nhỏ rồi nổ theo chuỗi | Dễ |
| 95 | Người Đốt Bóng / Shadow Burner | đốt bóng thay vì thân | Vừa |
| 96 | Pháp Sư Đèn / Lantern Mage | đặt đèn tạo vùng an toàn/nguy hiểm | Dễ |

### A9 · Support không nhàm

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 97 | Khiên Hướng / Directional Shield | chắn đúng hướng thay vì shield tròn | Vừa |
| 98 | Người Cứu Kéo / Rescue Puller | kéo đồng minh khỏi nguy hiểm | Vừa |
| 99 | Y Sĩ Nhịp / Pulse Medic | hồi theo nhịp đứng gần | Dễ |
| 100 | Người Ghi Nợ Máu / Blood Accountant | nhận nợ damage cho ally rồi xử lý | Vừa |
| 101 | Hộ Vệ Drone / Drone Guardian | gắn drone bảo kê một ally | Vừa |
| 102 | Người Dẫn Đường / Path Guide | tạo đường tăng tốc cho ally | Dễ |
| 103 | Chuông Cứu Nạn / Rescue Bell | báo trước vùng cứu team | Dễ |
| 104 | Kẻ Chia Khiên / Shield Splitter | chia shield giữa nhiều ally | Vừa |
| 105 | Người Chữa Có Giá / Costly Healer | hồi mạnh nhưng đặt điều kiện/rủi ro | Vừa |
| 106 | Chăn Dắt Linh Vật / Mascot Shepherd | điều một linh vật hỗ trợ đơn giản | Vừa |
| 107 | Cọc Hồi Sinh / Revival Beacon | đặt beacon cứu ally nếu đứng đúng vùng | Khó |
| 108 | Lưới Bảo Hộ / Safety Net | giảm damage nếu ally đi qua lưới | Vừa |

### A10 · Marketing / biểu tượng dễ nhớ

| # | Archetype Việt / English | Người chơi pick để… | Risk |
|---:|---|---|---|
| 109 | Linh Hầu Lừa Đảo / Monkey Trickster | outplay bằng bóng và nhảy | Vừa |
| 110 | Võ Sĩ Đường Phố / Street Brawler | đấm đơn giản nhưng thỏa mãn | Dễ |
| 111 | Phi Công Liều / Reckless Pilot | lái máy bay oanh tạc | Dễ |
| 112 | Quái Vật Kaiju / Kaiju Brute | cảm giác to, nặng, phá đội hình | Vừa |
| 113 | Sách Sống / Living Tome | sách biết đi bảo kê team | Vừa |
| 114 | Mắt Một / One-Eyed Relic | bắn tia khóa hướng | Dễ |
| 115 | Hổ Ký Sinh / Parasite Tiger | săn như thú nhưng có horror hook | Vừa |
| 116 | Sứa Chuông / Bell Jelly | đẹp, lạ, support bằng âm | Vừa |
| 117 | Đô Vật Lôi Đài / Arena Wrestler | vật người vào vị trí nguy hiểm | Vừa |
| 118 | Cua Cửa Đập / Gate Crab | tank bằng càng như cửa thép | Vừa |
| 119 | Lò Sống / Living Furnace | càng đánh càng nóng | Dễ |
| 120 | Người Cầm Dù Kiếm / Parasol Duelist | đổi dù thành kiếm/khiên | Dễ |

## 4. Vòng B — 60 gameplay toys giữ lại

Bảng này là output sau khi loại các archetype trùng, quá generic, quá nặng engine hoặc quá khó production.

| Nhóm | Giữ lại |
|---|---|
| Outplay / phản nhịp | Kẻ Đổi Bóng; Đấu Sĩ Phản Nhịp; Kiếm Khách Dấu Vết; Người Mượn Đòn; Kẻ Ăn Cooldown; Sát Thủ Dấu Chân; Võ Sư Một Nhịp; Người Bắt Thở |
| Kéo / bắt lỗi vị trí | Móc Kéo; Neo Dây; Kẻ Căng Dây; Thợ Săn Lao; Xiềng Một Đầu; Chài Lưới; Dây Phán Xét |
| Lao vào / lực đè | Quái Vật Húc; Đô Vật; Võ Sĩ Piston; Chiến Xa Sống; Người Tăng Nhiệt; Kẻ Bẻ Đội Hình; Búa Quỹ Đạo |
| Bẫy / kiểm soát vùng | Thợ Mìn; Họa Sĩ Địa Hình; Nhện Dệt Đường; Kẻ Đếm Bước; Vòng Cấm; Kẻ Khóa Lối; Vườn Ăn Thịt |
| Macro / chiến thuật | Ký Sinh Hộ Thể; Drone Tự Hành; Thủ Kho Lane; Người Gọi Mục Tiêu; Người Ghi Nợ; Quản Gia Tự Hành |
| Sinh vật lạ | Hổ Nấm; Cua Cửa Đập; Lươn Đêm; Sứa Chuông; Bọ Ngựa Xạ Thủ; Tê Tê Khiên; Chim Công Sợ Hãi |
| Công nghệ cổ | Phi Công Cổ Khí; Mắt Thiên Cơ; Lò Phản Ứng; Sách Máy; Vòng Quỹ Đạo; Chiến Xa Gãy; Thợ Máy Bom |
| Pháp sư concept | Trọng Lực Sư; Pháp Sư Mực; Lăng Kính; Thời Gian Trễ; Kẻ Ghi Sổ; Phù Thủy Âm |
| Support không nhàm | Khiên Hướng; Người Cứu Kéo; Y Sĩ Nhịp; Người Ghi Nợ Máu; Chuông Cứu Nạn |

## 5. Luật audit pet / drone / summon

**Vấn đề được creator chỉ ra:** người điều khiển drone rất khó điều khiển; hầu như nên auto.

### Cấm ở roster giai đoạn này

| Loại | Lý do |
|---|---|
| Điều khiển drone như unit riêng | quá nặng input, UI, pathfinding, target, camera |
| Nhiều unit đồng thời | micro nặng, bot khó, debug khó |
| Pet có bộ skill riêng | thành 2 tướng trong 1 |
| Summon chặn đường có collision phức tạp | dễ phá navmesh/combat |
| Hero remote kiểu Abathur đầy đủ | quá khó cho V1, chỉ học nguyên lý |

### Chỉ cho phép

| Mẫu | Cách chơi |
|---|---|
| Auto-follow | drone bay quanh hero hoặc ally được chọn |
| Auto-attack target | drone bắn mục tiêu hero đang đánh hoặc mục tiêu đã mark |
| Point-and-return | bấm skill đặt drone tới một điểm, nó tự làm việc rồi quay về |
| Mode switch | đổi chế độ Hồi / Chắn / Bắn, nhưng drone vẫn tự vận hành |
| One-shot summon | gọi ra làm một việc rồi biến mất, giống VFX có hitbox |

### Audit các mục liên quan

| Archetype | Quyết định V5 |
|---|---|
| Ký Sinh Sư / Remote Symbiote | đổi thành **Ký Sinh Hộ Thể / Symbiotic Ward**, attach auto vào ally, không remote-control toàn bản đồ |
| Người Điều Drone / Drone Commander | đổi thành **Drone Tự Hành / Auto-Drone Keeper**, auto-follow + mode switch, không micro |
| Ba Đơn Vị Nhỏ / Triple Unit | loại |
| Song Hồn / Two-Mind Hero | loại |
| Thủ Kho Lane / Lane Clerk | giữ tạm, hạ ưu tiên; không điều khiển lính trực tiếp |
| Người Gọi Mục Tiêu / Objective Caller | giữ; macro bằng vị trí/objective, không micro |
| Người Ghi Nợ / Debt Support | giữ mạnh; mechanic trạng thái |
| Quản Gia Chiến Trường / Battlefield Butler | đổi thành **Quản Gia Tự Hành / Auto Butler**, mascot tự gom mảnh do chính skill tạo, không courier/inventory |

## 6. Vòng C — 36 ứng cử viên COLINH concept

Mỗi concept dưới đây là ứng viên để team audit, chưa có skill chi tiết và chưa chốt vào 24.

### C1 · Outplay / sát thủ / đấu tay

| # | Tên Việt / English | Vai đề xuất | Concept pick |
|---:|---|---|---|
| 01 | Ảnh Hầu / Kiko | Sát thủ | Tôi pick nó vì được lừa đối thủ bằng dấu chân giả, nhảy vào đúng khoảnh khắc rồi thoát ra. |
| 02 | Nhịp Quyền / Brak | Đấu sĩ | Tôi pick nó vì được chơi võ sĩ phản nhịp: chờ địch ra đòn, đỡ đúng lúc, rồi phản bằng cú đấm piston nặng. |
| 03 | Vết Kiếm / Vero | Sát thủ | Tôi pick nó vì mỗi nhát kiếm để lại một vết thời gian, vài giây sau vết đó chém lại. |
| 04 | Hấp Đòn / Rava | Đấu sĩ | Tôi pick nó vì càng bị đánh đúng lúc, tôi càng tích lực phản công. |
| 05 | Thợ Săn Lỗi / Erran | Sát thủ | Tôi pick nó vì chuyên bắt lỗi người spam skill: địch dùng chiêu sai thời điểm thì bị đánh dấu và truy sát. |
| 06 | Võ Sư Một Nhịp / Mono | Đấu sĩ | Tôi pick nó vì bộ chiêu ít nhưng mỗi cú có sức nặng; thắng bằng timing, không phải spam. |

### C2 · Kéo / neo / bắt lỗi vị trí

| # | Tên Việt / English | Vai đề xuất | Concept pick |
|---:|---|---|---|
| 07 | Dạ Neo / Nera | Xạ thủ | Tôi pick nó vì được bắn lao neo rồi chọn kéo mình tới hoặc giật mục tiêu lệch vị trí. |
| 08 | Móc Quỷ / Garo | Đỡ đòn | Tôi pick nó vì có cú móc đơn giản nhưng cực đáng sợ: trúng là mở giao tranh. |
| 09 | Xiềng Đấu / Vark | Đấu sĩ | Tôi pick nó vì tự khóa mình với một mục tiêu để ép duel, thắng bằng lì đòn và vị trí. |
| 10 | Dây Phán / Liora | Pháp sư / Hỗ trợ | Tôi pick nó vì nối hai kẻ địch bằng một dây phán xét: tách ra hay đứng gần đều bị phạt. |
| 11 | Chài Mạch / Namo | Đỡ đòn / Hỗ trợ | Tôi pick nó vì quăng lưới mở giao tranh, bắt vùng chứ không chỉ bắt một người. |
| 12 | Thương Nhãn / Vika | Xạ thủ | Tôi pick nó vì bắn ghim tạo dây bẫy tuyến, ép đối thủ di chuyển theo góc tôi muốn. |

### C3 · Lực đè / tank / lao vào

| # | Tên Việt / English | Vai đề xuất | Concept pick |
|---:|---|---|---|
| 13 | Huyền Giác / Rako | Đỡ đòn | Tôi pick nó vì được lao thẳng như tê giác máy, phá đội hình bằng tuyến húc rõ ràng. |
| 14 | Đô Vật Cổ / Marduk | Đấu sĩ / Đỡ đòn | Tôi pick nó vì được vật một mục tiêu chủ lực vào vị trí nguy hiểm. |
| 15 | Thiết Quyền / Brak | Đấu sĩ | Tôi pick nó vì là võ sĩ piston: càng chuẩn bị đúng, cú đấm càng nặng. |
| 16 | Thiết Xa / Loko | Đỡ đòn | Tôi pick nó vì là chiến xa sống, ép góc bằng đà và khó quay đầu. |
| 17 | Lò Cổ / Forge | Đỡ đòn / Đấu sĩ | Tôi pick nó vì càng chịu đòn càng nóng, rồi xả áp thành sóng lửa trước mặt. |
| 18 | Búa Quỹ / Oren | Đấu sĩ | Tôi pick nó vì dùng búa xoay quanh người để chiếm không gian, ép địch không dám lại gần. |

### C4 · Bẫy / kiểm soát vùng

| # | Tên Việt / English | Vai đề xuất | Concept pick |
|---:|---|---|---|
| 19 | Mực Mù / Inka | Pháp sư | Tôi pick nó vì được vẽ mực lên mặt đất, nối các vệt mực thành vùng nguy hiểm. |
| 20 | Mìn Ký Ức / Teko | Pháp sư / Hỗ trợ | Tôi pick nó vì biến một khu vực thành bãi mìn có cảnh báo, ép đối thủ phải đi đường khác. |
| 21 | Vòng Cấm / Rana | Pháp sư | Tôi pick nó vì dựng một vòng luật: bước qua ranh giới là bị phạt. |
| 22 | Nhện Mạch / Sira | Pháp sư / Xạ thủ | Tôi pick nó vì dệt đường mạng giữa các điểm, làm chậm và bắt lỗi di chuyển. |
| 23 | Đếm Bước / Taxa | Pháp sư | Tôi pick nó vì nguyền một vùng: càng chạy trong đó càng bị phạt. |
| 24 | Vườn Ăn Thịt / Mora | Pháp sư | Tôi pick nó vì gieo mầm săn mồi, ép giao tranh quanh vùng mình chuẩn bị. |

### C5 · Macro nhẹ / auto pet / support chiến thuật

| # | Tên Việt / English | Vai đề xuất | Concept pick |
|---:|---|---|---|
| 25 | Ký Sinh Hộ Thể / Soma | Hỗ trợ | Tôi pick nó vì gắn một sinh thể phụ vào đồng minh, chọn lúc bung giáp hoặc hồi cứu. |
| 26 | Drone Tự Hành / Dron | Hỗ trợ / Xạ thủ phụ | Tôi pick nó vì có một drone tự động theo mình, đổi chế độ Chắn / Bắn / Quét, không phải điều khiển riêng. |
| 27 | Gọi Mục Tiêu / Cala | Hỗ trợ / Đấu sĩ | Tôi pick nó vì mạnh quanh mục tiêu lớn, gọi team đánh đúng thời điểm. |
| 28 | Ghi Nợ / Libro | Hỗ trợ | Tôi pick nó vì biến sát thương đã chắn thành “kho nợ” để trả lại bằng shield/heal. |
| 29 | Quản Gia Tự Hành / Boto | Hỗ trợ | Tôi pick nó vì có một linh vật máy tự gom mảnh hỗ trợ quanh combat và phát cho đồng minh gần. |
| 30 | Thủ Kho Lane / Kipa | Hỗ trợ macro | Tôi pick nó vì buff lane nhẹ bằng tem hậu cần, không điều khiển lính trực tiếp. |

### C6 · Sinh vật lạ / quái thú / dễ marketing

| # | Tên Việt / English | Vai đề xuất | Concept pick |
|---:|---|---|---|
| 31 | Hổ Nấm / Moka | Sát thủ | Tôi pick nó vì săn mục tiêu có “mùi bào tử”, vồ đúng con mồi đã bị đánh dấu. |
| 32 | Hải Mẫu / Kora | Đỡ đòn | Tôi pick nó vì là cua cửa đập: xoay càng lớn để chắn hướng sát thương cho team. |
| 33 | Lươn Đêm / Eelix | Sát thủ | Tôi pick nó vì tạo tuyến nước tối rồi lao phục kích theo đúng đường đó. |
| 34 | Sứa Chuông / Jeli | Hỗ trợ | Tôi pick nó vì hồi máu và làm chậm theo nhịp chuông nước lan ra từng vòng. |
| 35 | Chim Công Sợ Hãi / Pavo | Pháp sư / Hỗ trợ | Tôi pick nó vì xòe đuôi thành hình quạt gây áp lực tinh thần, bắt địch quay mặt hoặc rút lui. |
| 36 | Tê Tê Khiên / Rolo | Đấu sĩ | Tôi pick nó vì tháo từng lớp vảy để đổi phòng thủ lấy tấn công. |

## 7. Hạt nhân đề xuất cho vòng audit đầu tiên

Nhóm 12 có giá trị concept tốt nhất hiện tại:

1. **Hải Mẫu / Kora** — tank cửa đập, chắn hướng bằng càng.
2. **Phi Công Cổ Khí / Aero** — xạ thủ/lái cổ khí, đặt góc oanh tạc.
3. **Ảnh Hầu / Kiko** — sát thủ outplay dấu chân giả.
4. **Dạ Neo / Nera** — xạ thủ/neo dây có quyết định hai chiều.
5. **Mực Mù / Inka** — pháp sư vẽ mực kiểm soát vùng.
6. **Lò Cổ / Forge** — tank/bruiser tích nhiệt xả áp.
7. **Hổ Nấm / Moka** — quái thú săn mồi theo bào tử.
8. **Ghi Nợ / Libro** — support ghi nợ damage thành shield/heal.
9. **Sứa Chuông / Jeli** — support nhịp chuông nước.
10. **Nhịp Quyền / Brak** — đấu sĩ phản nhịp, piston punch.
11. **Mắt Thiên Cơ / Iro** — sniper máy một mắt, silhouette rõ.
12. **Vòng Cấm / Rana** — mage ranh giới, vượt vòng bị phạt.

## 8. Gợi ý cho team audit

Team audit không được chấm bằng “tôi thích / không thích” chung chung. Mỗi ứng viên cần trả lời:

- Câu bán hàng có đủ mạnh không?
- Có trùng gameplay với ứng viên khác không?
- Có quá giống hero nổi tiếng không?
- Nếu làm bằng AI, model/rig/animation nằm ở mức nào?
- Skill có thể triển khai bằng primitive MOBA phổ thông không: target, line, cone, circle, projectile, mark, buff, debuff?
- Pet/drone/summon có vi phạm luật auto không?
- Nếu phải bỏ bớt mechanic phức tạp, fantasy còn sống không?

**Kết quả mong muốn của team audit:** lọc 36 xuống 24 concept đáng phát triển, chưa cần số damage/cooldown/stat.
