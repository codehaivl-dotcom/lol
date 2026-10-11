# 19 · Research HUD + Gameplay MOBA → spec cho Cổ Linh (1v1 trước)
Ngày 2026-10-07. Phản hồi của @lukasai: "HUD nhỏ và quá vô nghĩa. Ko hiểu viết tắt là gì. Gameplay phải research rồi dựng cho nghiêm túc, sau đó lập docs → làm."
Quy trình từ nay: research → docs (file này) → TODO → làm → tự test → báo nghiệm thu.

## 1. Nguồn đã đọc

**Bổ sung 2026-10-08:** [Bộ 6 ảnh gameplay đã xem trực tiếp](references/gameplay/README.md), gồm LoL lane/trụ, Dota 2 vùng chiêu/định hướng, AoV đánh gần trụ/bụi với HUD mobile. Ưu tiên gameplay readability và thao tác; ghi rõ nguồn, giới hạn, cách đối chiếu client. Bố cục AoV đã có evidence ảnh từ listing chính thức; input touch vẫn cần nghiệm thu riêng. Các ghi chú chưa kiểm chứng bên dưới là lịch sử research ban đầu, không dùng như bằng chứng mới.

- gamepressure.com, "League of Legends: Graphical user interface": sơ đồ HUD LoL gồm chỉ số tướng, trang bị, vàng + shop, nội tại, 4 chiêu, nút nâng chiêu, phép bổ trợ, nút về nhà (Recall), minimap, cảnh báo, số mạng của đội, K/D/A của người chơi, FPS/ping/thời gian.
- samurai-gamers.com, "AoV The In-Game Screen": trang tải về chủ yếu là bảng trang bị, phần sơ đồ HUD không đọc được. Bố cục AoV mobile bên dưới dựa trên tóm tắt kết quả tìm kiếm và trải nghiệm chung, **chưa kiểm chứng từ nguồn chính**.
- Kết quả tìm kiếm (chỉ đọc tóm tắt): LoL đặt chân dung + máu/năng lượng bên trái dưới, chiêu ở giữa dưới, minimap góc phải dưới, bảng điểm mở bằng TAB. AoV có minimap góc trái trên, cụm chiêu theo hình vòng cung góc phải dưới, nút shop ở cạnh trái, nút về nhà và phép bổ trợ cạnh cụm chiêu.

## 2. Nguyên tắc rút ra (dùng chung cho Web + Mobile)
1. **Không viết tắt.** Mọi ô đều có icon. Tên đầy đủ hiện khi rê chuột (web) hoặc nhấn giữ (mobile). Chữ trên màn hình chỉ dùng cho con số.
2. **Một con số = một nhãn hình.** Vàng có icon đồng xu, lính có icon lính, K/D/A có icon kiếm/đầu lâu/bàn tay. Không để "0/1" hay "lính 2" trơ trọi.
3. **Chữ tối thiểu 13 px trên web, 12 px trên điện thoại.** Số máu 14 px. Số hồi chiêu 20 px trở lên.
4. **Vùng giữa màn hình để trống.** HUD chỉ nằm ở mép. Chiều cao khung dưới không quá 15% màn hình web.
5. **Mỗi chiêu đọc được trong 0,2 s:** viền sáng khi sẵn sàng, phủ tối kèm vòng quét và số giây khi đang hồi, xám kèm "thiếu năng lượng" khi không đủ năng lượng, ổ khóa + dấu ＋ khi có thể nâng.
6. **Máu trên đầu tướng là nguồn thông tin chính khi đánh**, HUD dưới chỉ bổ sung. Thanh máu trên đầu chia vạch mỗi 100 máu như LoL.
7. **Phong cách:** khung tối, viền vàng mảnh và dùng chung một hệ thiết kế giống LoL/AoV. Họa tiết Đông Sơn chỉ làm điểm nhấn ở góc khung (luật đã có trong memory/game/rules).

## 3. Audit HUD hiện tại (đọc DOM thật, ui.js v346)
| Chỗ | Đang hiện | Lỗi |
|---|---|---|
| Ô trang bị | `DCN` `MS` `ỐTG` `BBM` | viết tắt, không có icon, ô 28 px |
| Phép bổ trợ | `NÉ` `DV` | viết tắt, ô 34 px, phím 9 px |
| Góc trên phải | `0 ⚔ 0   0/1   lính 2   22:29` | "0/1" không rõ là K/D, "lính 2" không rõ là số lính đã giết |
| Vàng | `◈ 555` + `B về · P` 10 px | chữ quá nhỏ, nhìn không ra là phím B về nhà và P mở shop |
| Năng lượng | thanh 10 px, số 9 px | không đọc được |
| Chiêu | ô 50 px, phím 11 px, không có tên | ổn hơn, nhưng thiếu tên/tooltip và trạng thái không đủ năng lượng |
| Cấp / XP | vòng cung mỏng 1,6 px | không thấy XP |
| Minimap | 210 px, góc phải dưới | đúng vị trí LoL. Đã đổi sang khung ±130 m của map V2 |

## 4. Spec HUD mới
### Web (chuột + phím, camera khóa)
- **Dưới giữa** (khung dài 640 px, cao 120 px): chân dung 72 px với số cấp to và vòng XP 4 px → nội tại 40 px → Q W E R 64 px, mỗi ô có phím, tên 12 px bên dưới và số hồi chiêu 22 px → phép bổ trợ D/F 48 px có icon → bên dưới là thanh máu 18 px (chữ 14 px) và năng lượng 12 px (chữ 12 px).
- **Phải của khung dưới**: 6 ô trang bị 40 px có icon, ô 7 là bình máu. Nút vàng lớn "🪙 555 · Cửa hàng (P)". Nút "Về nhà (B)" có icon.
- **Trên phải**: tỉ số đội Xanh ⚔ Đỏ, rồi K/D/A với icon, lính hạ gục với icon, đồng hồ.
- **Phải dưới**: minimap 220 px (giữ nguyên).
- **Trên trái**: thẻ mục tiêu khi chọn hoặc đánh một đơn vị: tên, máu, giáp, kháng phép.
- **Thanh máu trên đầu**: tướng có vạch 100 máu, thêm thanh năng lượng và số cấp; lính có thanh nhỏ; trụ có thanh dài kèm vòng tầm bắn 14 m khi tướng đến gần.

### Mobile (AoV)
- Minimap trên trái 140 px, tỉ số + đồng hồ ở giữa trên, cần di chuyển dưới trái.
- Dưới phải: nút đánh thường 96 px, Q W E R xếp vòng cung 64 px, D/F/Về nhà xếp hàng nhỏ 48 px.
- Cửa hàng là nút dọc ở mép trái kèm số vàng. Có gợi ý "mua đồ đề xuất" giống AoV.

## 5. Gameplay 1v1: vòng chơi phải có (đối chiếu LoL/AoV)
| Hệ thống | LoL/AoV | Cổ Linh hiện tại | Cần làm |
|---|---|---|---|
| Last hit lấy vàng | có, con số vàng bay lên | có vàng, hiệu ứng yếu | số vàng bay + tiếng xu |
| Lên cấp, nâng chiêu | dấu ＋ trên ô chiêu | tự nâng? cần kiểm tra | nút ＋ rõ ràng |
| Aggro trụ khi đánh tướng trong tầm | có | chưa kiểm chứng | test + vòng tầm trụ |
| Bụi cỏ che tầm nhìn | có | dữ liệu có, đã thêm 12 bụi; 2026-10-08 bụi dựng local từ map.yml, bụi chứa tướng mình mờ 32% chỉ trên máy mình + vòng chân. **Client Codex match25/round41 (source e5a5ed9, Sân Tập Mị Đăng L1, không item/bot): PASS local** — trong river-top-blue lau mờ, thân rõ + vòng chân; ra ngoài lau đặc lại, vòng tắt. Góc nhìn địch / 2 client: NOT RUN. Viền xuyên lá (xray) giữ CHƯA ĐẠT, đã thay bằng mờ lau | test ẩn/hiện + mờ khi đứng trong |
| Về nhà 8 s, hồi máu ở bệ | có | có B | thanh kênh + hiệu ứng |
| Chết → đếm hồi sinh | có | có | màn xám + số giây to |
| Thắng/thua khi Tâm Mạch nổ | có | có (test cưỡng bức) | test trận tự nhiên |

## 6. TODO (thứ tự làm)
- [x] Map V2: thu 0,7×, dời trụ/Tâm Mạch/suối/cầu, tầm trụ 14 m, 12 bụi cỏ, 4 hốc nấp (v347+)
- [ ] Map V2 decor: tường đá thấp chạy dọc hai bên lối đi, cổng đá ở trụ, đèn lồng, đá vụn, cây khô mép vực
- [ ] HUD web theo §4 (icon trang bị + phép bổ trợ, không viết tắt, cỡ chữ mới)
- [ ] HUD mobile theo §4
- [ ] Thanh máu trên đầu có vạch + vòng tầm trụ — vòng tầm trụ 14 m local đã code 2026-10-08 (hero.js drawTowerCue: hiện khi tướng mình ≤ tầm+5 m; đỏ + viền trụ + 1 tiếng cảnh báo khi `tower.state.aim` = tướng mình); viền đỏ màn hình khi HP < 35% (ui.js danger). **Client Codex match25/round41 (source e5a5ed9):** vòng trụ nhạt khi lại gần PASS; trụ đang tank lính thì tướng vẫn đủ 767 HP; sau khi lính hết, aim chuyển sang tướng → vòng đỏ + viền đỏ thân trụ PASS (ảnh 10:30, 297/767 HP). Âm cảnh báo một lần và nhịp viền đỏ HP < 35%: CHƯA xác minh (mở). Ngưỡng tầm+5 m và 35% là lựa chọn triển khai, chưa duyệt. Góc nhìn địch / 2 client: NOT RUN. Runtime seq chưa xác minh. Vạch máu: chưa làm.
- [ ] Biên/hướng chiêu (2026-10-08): đối chiếu + sửa ghi ở [doc20 §4](20-gap-skill-vfx-target.md) — dấu ngắm theo mặt cầu, dấu đáp lướt lùi; client PASS có giới hạn (Codex match26–28, local khi giữ phím; R qua fixture dev L6); endpoint/range/hitbox, đổi hướng, cancel, mobile, địch còn mở; telegraph địch BLOCKED.
- [ ] Gameplay §5: vàng bay, nút nâng chiêu, test trụ, test bụi, test trận tự nhiên đến kết thúc
- [ ] Tự chơi 1 trận đầy đủ từ lobby, ghi kết quả vào 16-gap-gameplay.md
