# Bản đồ và art bible — Cửu Mạch Chiến Trường

**Map ID:** `cuu_mach`. **Tên hiển thị VI:** Cửu Mạch Chiến Trường. **Tên EN:** Ninefold Veins Battlefield.  
**Trạng thái:** art target mới; macro layout lấy nguyên từ 07, geometry hiện tại không phải art target.

## 1. Art direction

Đây là chiến trường được Tinh Thạch Ký Ức dựng lại từ đỉnh cao văn minh Cổ Linh, không phải một di chỉ tiền sử. Nhìn từ xa, người chơi thấy một đô thị–đấu trường khổng lồ bắc giữa địa hình sông núi Việt Nam cổ: thung lũng karst được mở rộng phi lý, các thềm nổi, hồ mạch phát sáng, trụ hợp kim như cánh hoa và những dải kiến trúc cong chảy như nước. Công nghệ phải cổ xưa với người năm 2300 nhưng rực rỡ, chính xác và sống động với Cổ Linh.

**Mood:** thần thoại vũ trụ, nghi lễ chiến tranh, quy mô văn minh cao, sắc màu rực nhưng có độ tương phản combat. Mốc thời gian là khoảng một triệu năm trước năm 2300. Cảnh vật trong memory battle còn nguyên sinh hoạt và năng lượng; tàn tích chỉ xuất hiện trong intro, menu, hậu cảnh ký ức lỗi và các điểm lore.

### Bảng màu thế giới

- Nền môi trường: ngọc lam sâu, xanh khoáng, đá vôi trắng, xanh đêm và sương bạc.
- Minh Ước: lam ngọc, trắng ánh trai, vàng kim lạnh.
- Triều Vực: đỏ son, tím vũ trụ, đồng sẫm phát quang.
- Neutral/jungle: ngọc lục, hổ phách, san hô và xanh sinh vật.
- Combat warning và team color có palette độc lập; không đổi màu chỉ để hợp moodboard.

### Chữ ký Việt cổ — dùng ít, đặt đúng chỗ

1. **Chim Lạc cách điệu:** relief lớn trên một cửa chính hoặc biểu tượng khai trận; không gắn đại trà lên mọi quân phục.
2. **Vòng đồng tâm gợi mặt trống:** một đại medallion tại cầu trung tâm hoặc sàn pit; đường nét hư cấu, không sao chép chính xác cổ vật có thật.
3. **Long–lân–quy–phượng:** phân bổ vào bốn cấu kiện lớn hoặc bốn loại motif trong environment, không bắt buộc mỗi hero mang cả bốn linh vật.
4. **Hạc và đường sóng:** điểm nhấn cánh/viền giáp, biểu tượng một số hero hoặc đường ánh sáng dẫn mắt.

Mục tiêu trải nghiệm: người chơi nhận ra motif Việt cổ trong một giây nhìn, sau đó vẫn đọc ngay vai trò, vũ khí, trạng thái phe và vùng nguy hiểm của MOBA. Hoa văn hỗ trợ silhouette, không phủ kín silhouette.

## 2. Quy tắc macro được khóa

Bản đồ mới chỉ đổi hình ảnh, địa danh, vật liệu, ánh sáng, props trang trí và âm thanh môi trường. Giữ nguyên: X/Z của mọi điểm, lane waypoint, phía blue/red, bề rộng đường giao tranh, số và vị trí trụ, vùng bụi, camp, pit, base/nexus, bridge, mép vực, va chạm, navigation, tầm nhìn và vùng spawn. Không thêm đường tắt, bậc cao có lợi thế, chỗ nấp, vật cản, đường projectile hoặc độ dốc gameplay trong art pass.

Địa hình mới phải chia thành: (A) gameplay collision/nav mesh cố định; (B) art shell không collision; (C) gameplay blocker có tọa độ từ layout data. Mọi props gần lane/camp/tower đều phải khai báo lớp A/B/C. V1 chỉ sử dụng A và B cho deco; không tạo blocker mới.

## 3. Ngôn ngữ hình khối theo khu vực

| Khu vực | Thay thế hình ảnh | Cảm giác/đọc hình |
|---|---|---|
| Hai căn cứ | Hai cực kiến trúc đối xứng, một hình thành từ các phiến cánh ôm lõi, một từ những dải vòm mở ra ngoài. | Đọc căn cứ ngay từ xa; công năng giống hệt nhau. |
| Ba lane | Dải nền tinh thể phẳng với viền dẫn năng lượng; mid rộng, top/bot theo đúng waypoint ở 07 §7. | Lane luôn sáng hơn rừng và bờ pit. |
| Jungle | Vườn mạch sống, mảnh kiến trúc trôi, tán cây phát quang; chia clearings đúng camp. | Mỗi camp có negative space và viền sáng nhận diện. |
| River/gorge | Hẻm nước/cosmic river cắt chéo map, có tầng nước treo và đá nổi. | Không che crosshair, projectile hoặc chân tướng. |
| Bridge | Cầu Mạch bằng các vòng tinh thể xếp lớp, medallion hoa văn ở giữa. | Giữ span 78m, width 34m, height 0, yaw 45°. |
| Trial Pit phía Long | Đấu trường Call chạm sông, vành trống khắc long văn hư cấu, ánh vàng ngọc. | Pit radius 24m tại (+52,+85), floor −3.2; ring capture gameplay bán kính 18m. Không spawn Drake trung lập. |
| Trial Pit phía Quy | Đấu trường Call có tầng địa chất xếp như mai quy, ánh tím lạnh. | Pit radius 24m tại (−52,−85), floor −3.2; ring capture gameplay bán kính 18m. Cổ Titan chỉ xuất hiện tại Call thắng. |
| Brush | Cụm lau phát sáng, cánh hạc, dây tinh thể mảnh. | Biên vùng ẩn phải trùng ellipse; không thêm concealment. |
| Tower T1 | Trụ chỉ huy thon, lõi đơn, ngọn chĩa rõ hướng nhắm. | Nhìn phân biệt T1 với T2; bắn đúng nguyên tầm/rate. |
| Tower T2/Keep | Cổng trụ hai lớp có mô hình lân hoặc quy trừu tượng ở phần crown. | Nhìn rõ tier và vùng bảo vệ; không thêm wall gameplay. |
| Nexus | Tâm Mạch: khối lõi đa diện được bao bởi vòng phù điêu cánh chim/họa tiết đồng tâm. | HP/shield dễ đọc; hiệu ứng vỡ không che HUD. |

Tên hiển thị cho mục tiêu: Nexus = **Tâm Mạch**; Fountain = **Giếng Hồi Tưởng**; Tower = **Trụ Mạch**; lane = **Mạch Thượng / Mạch Giữa / Mạch Hạ**; brush = **Tán Mạch**. Nội dung UI phải dùng đúng glossary 05.

## 4. Landmark và phân cấp visual

- Landmark cấp 1: hai nexus, ba gate, central bridge, hai pit. Silhouette lớn nhất sau hero và boss.
- Cấp 2: tower/keep, cửa lane, camp large monsters. Palette theo đội hoặc loại mục tiêu.
- Cấp 3: deco, cờ năng lượng, hoa văn, bụi cây, đá nổi. Không được cạnh tranh với VFX skill.
- Gameplay target thực tế phải có edge/outline và nameplate ưu tiên cao hơn deco.
- Chỉ dùng motif chim Lạc/đồng tâm/linh vật ở các landmark cấp 1 hoặc một bộ sưu tập tướng hạn chế. Không đặt watermark hoa văn lặp trên mọi mặt sàn.

## 5. Chi tiết bàn giao map art

Map artist nhận layout data ở tài liệu 07 và giao các deliverable:

1. Top-down blockout 1:1 có grid đơn vị mét, toàn bộ tọa độ gameplay hiển thị.
2. Ground/terrain art không collision riêng; navigation/collision mesh giữ độc lập.
3. Landmark kit: base, fountain, nexus, gate, T1/T2, bridge, 12 camp, hai Trial Pit và Cổ Titan; có phiên bản Blue/Red/neutral phù hợp.
4. Brush set đủ 12 vị trí; foliage bounds khớp ellipse, không tràn khỏi vùng target.
5. Minimap atlas và icon cho mỗi ID trong layout, cùng orientation/mapping X/Z.
6. LOD0/1/2, material slots, texture resolution, collision policy, lightmap/real-time light budget và memory target theo engineering decision record trước import.
7. Daylight/atmosphere preset; exposure baseline và readability screenshot ở 16:9 1080p, 16:10, 21:9, cửa sổ nhỏ.
8. Asset manifest có ID ổn định, đường dẫn, scale, pivot, forward axis, dependencies, license/source, owner, revision.

**Open trước khi art production:** polygon/tri budget, texture max, texture memory, GPU baseline, draw-call budget và LOD distances cần được chốt cùng target device. Không tự bịa ngưỡng phần cứng trong tài liệu art.

## 6. Điều kiện duyệt art

- Hero ở camera combat không bị chìm vào map; outline phe và health bar vẫn dễ đọc.
- Minimap landmark, lane, jungle và brush khớp tọa độ data; không suy ra vị trí từ ảnh concept.
- Deco mesh không đổi walkable area, collision, skill target, line of sight hoặc camera collision.
- Chim Lạc/motif vòng đồng tâm được nhận ra trong một frame nhưng không biến toàn map thành bảo tàng.
- Cổ Linh nhìn đa dạng về loài, giới, khối lượng, vùng văn minh, vật liệu và vũ khí; không cùng một gương mặt, áo giáp hay tỷ lệ cơ thể.
- Đồ họa memory-glitch chỉ xuất hiện ở phần framing/lore; không giả cảnh báo đòn đánh hoặc trạng thái low-health.
