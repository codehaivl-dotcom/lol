# Tham chiếu gameplay — LoL / Dota 2 / Arena of Valor

Ngày chọn ảnh: 2026-10-08. Phạm vi: **khả năng đọc và điều khiển trận đấu**; HUD chỉ phục vụ hành động. Sáu ảnh đã được xem trực tiếp, giữ nguyên ảnh nguồn. Không dùng splash art, concept hoặc poster trong bộ này.

## Cách Savi dùng bộ này

1. Đọc README của bộ docs, doc14 và spec liên quan trước. Camera theo quyết định #7781 + `scripts/lib/data/camera.yml`; số gameplay lấy từ data đang ship.
2. Mở ảnh theo từng tình huống dưới đây, đối chiếu screenshot client ở cùng loại tình huống. Ghi khác biệt quan sát được, chỉ ra điều khoản docs; nếu docs chưa quy định thì ghi đề xuất cần quyết định, không tự biến ảnh đối thủ thành spec.
3. Game và sân đấu hiện tại là **dev test** theo xác nhận của lukasai. Ảnh đẹp hoặc source review không thay được nghiệm thu client. Mọi PASS phải kèm build, mode, tướng, trạng thái, thao tác và evidence.
4. Ưu tiên đọc mục tiêu và đòn đánh → tướng trong bụi → cue trụ → chiêu/VFX → HUD desktop/mobile. 21 tướng, map 5v5 ba đường và phim lore vẫn theo roadmap; không mở rộng chúng để chặn Slice hiện tại.

Ảnh là tài liệu nghiên cứu của chủ sở hữu tương ứng, không dùng làm asset trong game. Bản và thời điểm chụp phần lớn không xác minh: không gọi đây là gameplay/HUD mới nhất. Metadata, URL gốc, nguồn và SHA-256 ở [sources.json](sources.json). Ảnh được lưu bằng bytes trên CDN Spawn theo AGENTS.md; repo lưu chỉ mục và hướng dẫn, không nhúng bytes ảnh vào git.

## 1. LoL — đi lane, lính và bụi

**Quan sát:** hai tướng đồng minh đứng khác vị trí quanh wave; thanh máu trên đầu tách khỏi thân. Nền đường ít chi tiết nổi hơn tướng/lính; bụi có hình khối riêng ở mép đường. Ảnh 740×416 nên không dùng để đo cỡ chữ chính xác.

**Đối chiếu:** trong cùng wave, người chơi có chỉ được tướng mình, tướng địch, lính địch và mép bụi mà không phải dò HUD không? Với P1, viền mục tiêu và lệnh đánh phải thống nhất trên model và khoảng trống sát model theo contract hiện hành; ảnh tĩnh không chứng minh hit-test.

## 2. LoL — trụ và khoảng trống di chuyển

**Quan sát:** trụ có silhouette cao, bệ chân và thanh máu riêng; tướng nhỏ hơn trụ nhưng vẫn tách khỏi nền đá. Lane để lại vùng sàn nhìn rõ quanh cả hai. Minimap cho thấy công trình bằng biểu tượng, không phụ thuộc nhìn model trong cảnh.

**Đối chiếu:** phải đọc được thân/bệ trụ và đường có thể đi ở camera đã khóa; click thân trụ phải cho mục tiêu đánh, click sàn phải cho lệnh đi. Khi trụ đổi sang bắn tướng cần cue thực tế theo docs và test client; ảnh này không chứng minh tầm trụ, aggro hay thời điểm gây damage.

## 3. Dota 2 — vùng chiêu và trạng thái khống chế

**Quan sát:** vùng tròn tím có biên rõ; các thanh máu và chữ STUNNED vẫn hiện ở phía trên giao tranh. VFX phủ nhiều diện tích và che một phần thân: đây là điều cần đánh giá có chọn lọc, không lấy độ sáng này làm mức bắt buộc.

**Đối chiếu:** biên chiêu, hướng/đích và trạng thái phải đọc được, không mất thanh máu hoặc mục tiêu cần click. Khóa từng pha cast/active/impact/recovery theo spec skill hiện hành; không suy timing hoặc damage từ ảnh.

## 4. Dota 2 — skill định hướng, thể hình và mép địa hình

**Quan sát:** dây móc nối người tung chiêu và hướng đích; Pudge có khối thân rộng khác rõ Bounty Hunter nhỏ/gọn. Bậc đá, nước, cây tạo các mảng địa hình; nhân vật nằm trên mặt sàn vẫn dễ tìm.

**Đối chiếu:** vũ khí/đòn đánh phải đọc theo class và thể hình của tướng Cổ Linh, đồng thời giữ kit đã khóa. VFX có hướng và điểm xuất phát hợp vũ khí; không sao chép chiêu móc hoặc geometry map. Ảnh không chứng minh collision, navigation hay luật cao độ.

## 5. AoV — đánh gần trụ, lính và cụm thao tác mobile

**Quan sát:** cảnh trong trận có lính, trụ, tướng và đạn vàng; joystick trái, đánh lớn bên phải, chiêu thành cụm quanh đó, minimap trái trên. Mục tiêu địch có vòng đỏ dưới chân, HP/level ở trên đầu. Một phần cảnh dưới bị nút mobile che.

**Đối chiếu:** ở kích thước thiết bị thật, ngón tay/nút không che đích cần đọc hoặc buộc người chơi đoán đường đạn. Attack/skill/recall phải phân biệt, cooldown đọc được. Ảnh chỉ xác minh bố cục nhìn thấy; drag aim, hủy chiêu, đa chạm cần test touch riêng.

## 6. AoV — tướng bên bụi, vòng mục tiêu và hướng đạn

**Quan sát:** tướng đang tung đạn, mục tiêu bên phải có vòng đỏ và HP thấp. Bụi được gom ở bờ địa hình, phần đường quanh người tung chiêu vẫn thấy rõ. Ảnh này không có tướng mình nằm sâu trong bụi.

**Đối chiếu:** P2 phải có evidence riêng khi tướng mình thực sự vào bụi: ring/outline giúp tìm lại thân, ra bụi/chết thì tắt theo spec. Không lấy ảnh này làm PASS cho xuyên lá hoặc quyền nhìn địch. Cue mục tiêu, đạn và damage cần khớp thao tác/trace trong client.

## Checklist một lượt review thực dụng

| Tình huống client | Evidence tối thiểu | Điều ảnh tham chiếu không thể chứng minh |
|---|---|---|
| Click thân lính/tướng/trụ, rồi click sàn sát bên | Trước/sau click, viền, lệnh hoặc đòn, HP/CS khi phù hợp | Hit-test, tầm và damage |
| Tướng mình vào/ra bụi | Cùng camera, ảnh trong/ngoài; sống/chết | Vision phe địch, tính riêng local |
| Trụ chuyển mục tiêu lính → tướng | Cue trước đòn, mục tiêu, HP và trace có thời gian | Aggro rule/timing từ ảnh đối thủ |
| Chiêu có vùng hoặc định hướng | Cast → active → impact, biên/hướng/đích, cooldown | Số balance hoặc animation timeline |
| Mobile di chuyển + đánh/chiêu | Touch thật hoặc emulation được ghi rõ, viewport, chuỗi thao tác | Trải nghiệm ngón tay trên điện thoại thật |

Giữ trạng thái NOT RUN nếu thiếu ca. Đối chiếu doc11/doc14 để chốt nghiệm thu; bộ này không tự thay đổi các tiêu chí hoặc kết luận production-ready.

## Ảnh và nguồn

### Ảnh 1 — LoL / lol-lane.jpg

![lol-lane.jpg](https://www.spawn.co/cdn/value.ab85b6b9c2574a84a94e0043a96a10b1d88ebac9cc1d95b43cc701b5024f930f.jpg)

[Nguồn](https://mobalytics.gg/lol/guides/tips-to-improve-early-game-as-support) · 740×416 · Ảnh trong trận, nguồn hướng dẫn Mobalytics; phiên bản không xác minh.

### Ảnh 2 — LoL / lol-tower.jpg

![lol-tower.jpg](https://www.spawn.co/cdn/value.dc6d5debd4893f2561061b525ef3b6780c3d19731be2976c3c8565253f028cbf.jpg)

[Nguồn](https://www.reddit.com/r/leagueoflegends/comments/k08y9r/this_new_chat_size_is_really_unintuitive/) · 1718×966 · Ảnh trong trận do người chơi đăng; phiên bản không xác minh.

### Ảnh 3 — Dota 2 / dota-1.jpg

![dota-1.jpg](https://www.spawn.co/cdn/value.5477fb3a2264c3b99375e1708934793357d4faf803ce80e94d5cc8208039c52f.jpg)

[Nguồn](https://store.steampowered.com/app/570/Dota_2/) · 1920×1080 · Screenshot gameplay của Valve trên Steam; phiên bản không xác minh.

### Ảnh 4 — Dota 2 / dota-2.jpg

![dota-2.jpg](https://www.spawn.co/cdn/value.1a11eebe0a99fa68fc2e55eb643a6dfcefa90cdcd7181a7534f5fbed6c7246ad.jpg)

[Nguồn](https://store.steampowered.com/app/570/Dota_2/) · 1920×1080 · Screenshot gameplay của Valve trên Steam; phiên bản không xác minh.

### Ảnh 5 — Arena of Valor / aov-6.jpg

![aov-6.jpg](https://www.spawn.co/cdn/value.4b840da5900aa1d2fb36d40cbd84a7275cb785124c6877bc94532ba77a460768.jpg)

[Nguồn](https://apps.apple.com/us/app/arena-of-valor/id1150318642) · 1920×1080 · Screenshot gameplay trong listing chính thức; bộ ảnh đường dẫn 2022, không coi là HUD mới nhất.

### Ảnh 6 — Arena of Valor / aov-7.jpg

![aov-7.jpg](https://www.spawn.co/cdn/value.a348564fc2bcef3823a316cb48dd2e0e68127704c292bff608d4208f447fc4ec.jpg)

[Nguồn](https://apps.apple.com/us/app/arena-of-valor/id1150318642) · 1920×1080 · Screenshot gameplay trong listing chính thức; bộ ảnh đường dẫn 2022, không coi là HUD mới nhất.

