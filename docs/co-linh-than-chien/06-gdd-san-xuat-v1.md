# GDD sản xuất V1 — Cổ Linh Thần Chiến

**Phiên bản tài liệu:** 1.1 · **Trạng thái:** baseline nội dung để triển khai vertical slice; xem nhãn nguồn trước khi dùng số liệu.  
**Nguồn quyết định:** user lock ở README; cơ chế/data ở 08–10; nghiệm thu ở 11.  
**Giới hạn:** tài liệu mô tả đích sản phẩm. Nó không xác nhận những hệ thống đã tồn tại trong runtime.

## 1. Quy tắc đọc

Nhãn theo README: [USER LOCK], [V1 SPEC], [THAM KHẢO], [TBD-SIM]. Game mới hoàn toàn; quyết định D1–D12 ở 10.

## 2. Tóm tắt sản phẩm

| Trường | Đích V1 |
|---|---|
| Tên VI | **Cổ Linh Thần Chiến** — [USER LOCK] |
| Tên EN | **War of the Ancient Gods** — [V1 SPEC], working title; cần duyệt thương hiệu trước phát hành |
| Thể loại | MOBA hành động 3D đội 5v5, điều khiển trực tiếp — [USER LOCK] |
| Camera | Khoá kiểu AOV/LoL, số ở `scripts/lib/data/camera.yml` — [USER LOCK, @lukasai #7781, 2026-10-07; supersedes “qua vai, không top-down/isometric”] |
| Nền tảng V1 | Spawn engine (multiplayer có sẵn, `sim.js` làm trọng tài). Desktop bàn phím–chuột là chính; điện thoại chơi được bằng touch layout — [V1 SPEC] D11 |
| Văn bản | VI–EN cho toàn bộ sản phẩm; lần chạy đầu chọn VI; có thể đổi trong lobby/cài đặt và giữ lựa chọn — [USER LOCK] |
| Lồng tiếng | Tiếng Việt cho nhân vật và announcer ở bản đầu; bản EN có subtitle đầy đủ; chưa có English VO — [USER LOCK] |
| Trận chuẩn | 5v5, ba đường, rừng, Trụ Mạch, Trấn Mạch, Tâm Mạch; objective chính là The Call và Cổ Titan — [V1 SPEC] |
| Điều kiện thắng | Phá Tâm Mạch đối phương. Tâm Mạch mở khóa sau khi một Trấn Mạch/keep của phe đó sụp; không kết thúc trận bằng đồng hồ — [V1 SPEC] |
| Xếp hạng | Không nằm trong vertical slice; chỉ bật khi online authoritative, matchmaking và lưu kết quả được nghiệm thu — [V1 SPEC] |

## 3. Bối cảnh dùng trong game

Khoảng một triệu năm trước năm 2300, nền văn minh Cổ Linh phát triển rực rỡ trên vùng đất nay là Việt Nam. Đại Tịch cắt đứt chuỗi lịch sử; sau hàng triệu năm, dấu tích và ký ức về các liên minh gần như biến mất. Năm 2300, người Việt Nam khai thác được **Tinh Thạch Ký Ức** và dùng **Hồi Tưởng Đồng Bộ** để hóa thân vào các Cổ Linh, tái hiện những trận chiến được lưu trong tinh thạch. Đây là mô phỏng ký ức, không phải du hành thời gian.

Trận chơi kể một lát cắt của **Cổ Linh Thần Chiến**: Minh Ước đối đầu Triều Vực trên Cửu Mạch Chiến Trường. Tướng có thể là người, dị chủng, linh thể, thú thần hoặc sinh vật không nhân hình; hoa văn Việt cổ chỉ xuất hiện như dấu ấn chọn lọc. Chi tiết canon nằm ở 01–03.

## 4. Lát cắt có thể hoàn thành

### Vertical slice

> **Phạm vi hiện hành:** vòng Slice 1.5 (sảnh + Mạch Giữa) lấy phạm vi theo `14-todo-lobby-va-playtest.md` §B0.1. Mục này vẫn là đích V1 dài hạn.

- Một map: **Cửu Mạch Chiến Trường**; gameplay points theo tài liệu 07, art theo tài liệu 02.
- Một mode hoàn chỉnh: **Trận Tái Hiện 5v5**. Khi build nội bộ thiếu người, bot lấp slot; không gắn nhãn trận bot là PvP thật.
- Sáu tướng đại diện sáu phong cách: Mộc Lẫm (đỡ đòn/đấu sĩ), Kha Tàn (đấu sĩ dồn sát thương), Mị Đăng (sát thủ), Hỏa Tủy (pháp sư), Nham Vũ (xạ thủ), Vân Dao (hỗ trợ). Kit và số của sáu tướng nằm ở `scripts/lib/data/heroes.yml`; role hiển thị là localization, không đổi hero ID.
- Một trận end-to-end phải chạy đủ: chọn tướng → vào trận → lên cấp/tích tài nguyên → giao tranh/lính/rừng → mua đồ và chọn Dị Năng → tranh The Call → nhận Cổ Titan → đẩy công trình → kết thúc ở Tâm Mạch → màn hình kết quả → chơi lại/lobby.
- Bắt buộc trong slice: điều khiển/camera, combat, sáu kit, cấp/XP/vàng, lính, cấu trúc, shop slice, Dị Năng, camp/bản đồ, The Call, Titan đi lane, HUD/minimap, âm thanh/VFX, VI–EN, VI VO, cài đặt và reset trận.

### Mở rộng nội dung

- **Content alpha:** đủ 27 kit mới, Dị Năng cho cả 27 tướng, catalog vật phẩm của game; tất cả qua ngưỡng mô phỏng 04 §3.
- **Online beta:** phòng công khai, matchmaking, reconnect, lưu hồ sơ; nghiệm thu với người chơi thật.
- **Platform:** tay cầm sau slice; touch layout điện thoại có từ slice (D11).

## 5. Trận chuẩn và vòng lặp

1. Người chơi chọn locale, vào lobby và chọn Cổ Linh (Slice 1.5: luồng sảnh chi tiết ở 14 §B0); lobby hiển thị tên VI hoặc EN nhưng dùng cùng hero ID.
2. Ghép hai đội năm người. Practice/slice có thể thay vị trí thiếu bằng bot; bot hiển thị rõ trong roster.
3. Mỗi tướng vào trận ở cấp 1, 500 Vỏ Sáng, đầy sinh lực/tài nguyên theo baseline 08. Các kỹ năng thường dùng được từ cấp 1; ultimate mở ở cấp 6 và nạp thanh bằng giao tranh (D1, D2).
4. Đội farm Linh Binh và camp, đổi tài nguyên thành trang bị; Dị Năng Ký Ức mở ở các mốc cấp. Chỉ mua ở căn cứ hoặc khi đang chết (D7, 08 §8).
5. Một tiếng tù và báo trước objective. Sau 30 giây, một trong hai vòng Trial sáng lên tại bờ sông. Hai đội tranh tiến độ trong vòng; đội hoàn tất nhận một Cổ Titan cấp tương ứng Call. Vòng không hết hạn bằng đồng hồ.
6. Người chơi đội thắng có thể tới gần Titan, nhận quyền điều khiển theo phím F; nếu không ai nhận trong 20 s, bot đội đó điều khiển. Titan đi dọc lane, có thể bị hạ; camp lính đánh thuê đóng trong thời gian phần thưởng Call còn hoạt động. Nếu Titan đứng yên 60 s, camp mở và lịch Call được tiếp tục dù Titan vẫn còn trong map.
7. Đội đẩy qua Trụ Mạch → Trấn Mạch; một Trấn Mạch sụp mở Tâm Mạch và khiến lính lane tương ứng tăng cường. Đội phá Tâm Mạch địch thắng. Trận không tự kết thúc theo giờ.

Call đầu mở lúc **02:30**, tù và báo lúc **02:00**. Call tiếp theo báo khi Titan trước bị hạ hoặc đứng yên 60 s, rồi mở sau 30 s. Call I chọn pit theo `matchSeed mod 2`, các Call sau luân phiên. Chi tiết ở 08.

## 6. Mode trong V1

> Slice 1.5: `tai_hien` bật không bot (chỉ Mạch Giữa), `san_tap` bật một người, `thu_tran` bật 1 người vs 1 bot (chốt 2026-10-08). Xem 14 §B0.1.

| ID | Tên hiển thị VI / EN | Quy tắc |
|---|---|---|
| `tai_hien` | Trận Tái Hiện / Memory War | Mode chính 5v5, Call/Titan, ba lane, thắng bằng Tâm Mạch. 30 giây giữa horn và objective; wave/camp theo 08. |
| `thu_tran` | Thử Trận / Trial against Bots | Luyện tập: 1 người + 2 bot đồng minh đối đầu 3 bot; không xếp hạng. |
| `san_tap` | Sân Tập / Training | Không có win condition; bia tập và bot tùy chọn, cấp/vàng/cooldown phục vụ thử nghiệm. Chỉ thông số thực có trong runtime/data mới được triển khai; không copy các giá trị chưa truy vết. |

## 7. Input và camera

| Hành động | Phím/mặc định | Hành vi đích |
|---|---|---|
| Di chuyển | WASD / phím mũi tên | Theo mặt phẳng camera, thông số tốc độ theo kit (08) |
| Đánh thường | LMB | Theo chuỗi và hit payload của hero kit |
| Kỹ năng | Q, RMB/K, E | Tương ứng slot Q/RMB/E của hero; tooltip đọc từ localized ability data |
| Tuyệt kỹ | R | Nạp thanh bằng giao tranh (D2) |
| Né lăn | V hoặc Space; tùy chọn double-tap | Dùng stamina và i-frame theo 08. Game **không có nhảy**: Space là né |
| Hồi Tưởng | B | Channel và điều kiện ngắt theo 08 |
| Mua/đổi quyền lái Cổ Titan | P / F | P mở shop; F trong bán kính claim 5 m nhận/nhường quyền lái Titan |
| Kích hoạt Di Vật | T | Active relic đã trang bị |
| Chuột | Con trỏ tự do, không khóa pointer | Chiêu ngắm theo con trỏ (desktop); điện thoại tự nhắm địch gần nhất (#7781) |

Camera trận: camera trận khoá kiểu AOV/LoL (nhìn xuống, yaw cố định theo phe, bám tướng, lăn chuột zoom), ngắm theo con trỏ; số chuẩn ở `scripts/lib/data/camera.yml`. Quyết định @lukasai #7781 (2026-10-07) thay luật “camera qua vai” cũ (4,2 m / lệch vai 1,65 m). Không chép số vào doc; đổi số = sửa `camera.yml`.

> Bảng phím trên có thể lệch runtime; nguồn chuẩn phím là `world.config.yaml` `inputs`.

## 8. Ngôn ngữ, VO và accessibility

- Chuỗi VI/EN dùng một `string_id` ổn định; không dịch ID/enum và không ghép hai ngôn ngữ trong HUD.
- Mọi line VO V1 được thu bằng tiếng Việt, có subtitle VI và EN, cue/timing, speaker, ngữ cảnh, hướng đọc và quyền sử dụng. Announcer gọi combat/objective bằng câu VI ngắn, không che cue âm thanh.
- Setting đổi VI ↔ EN không reset trận; subtitle cho phép bật/tắt. Voice V1 dùng tiếng Việt dù UI đang ở EN.
- Đồng đội/địch không phân biệt chỉ bằng màu; có icon, shape, outline và cue âm thanh. Hỗ trợ remap phím và độ nhạy camera.
- Chuẩn chuỗi, font, number formatting và checklist nằm trong 05.

## 9. Multiplayer trên Spawn

- Mỗi trận là một phòng Spawn; `sim.js` của place làm trọng tài: đồng hồ trận, lính, camp, capture, Titan, công trình, thắng/thua.
- Đòn đánh được phán ở behavior của người đánh và ghi vào state của mục tiêu; phần thưởng chỉ cấp một lần do sim.js.
- Bot lấp chỗ trống bằng cùng data tướng; bot hiển thị rõ trong roster.
- Rời/vào lại phòng giữ team, tướng, vàng, cấp; người lái Titan rời thì bot nhận lái, Titan không biến mất.

## 10. Liên kết giao việc

| Nhóm | Tài liệu chuẩn |
|---|---|
| Canon, timeline, faction | 01 |
| World map look, vật liệu, motif, lighting | 02 |
| 27 hero, lore, silhouette, vũ khí, điểm nhấn | 03 |
| Điều giữ/được phép đổi, quy trình versioning | 04 |
| VI–EN strings, subtitle, voice | 05 |
| Layout/collision/gameplay points | 07 |
| Combat, economy, objective và số liệu | 08 |
| IDs, schema, roster mapping và localization key | 09 |
| Quyết định thiết kế đã chốt (D1–D12) | 10 |
| Gói bàn giao, acceptance, trạng thái verification | 11 |

**Definition of content-ready:** mọi task gắn giá trị [V1 SPEC] hoặc kết quả mô phỏng, technical ID, display ID VI+EN, asset ID, runtime owner, failure/interruption behavior và acceptance. Task có ô `[TBD-SIM]` không được tự chọn số trong code; số đó đến từ mô phỏng và vào data file.
