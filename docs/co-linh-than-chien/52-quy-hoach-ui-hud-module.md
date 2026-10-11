# 52 · Quy hoạch UI, HUD và module theo màn hình

**PLAN LỊCH SỬ:** các phần đã triển khai phải theo docs53 và code world hiện hành; không giao làm lại UI từ bản plan này.

Ngày 2026-10-09. Plan mới theo yêu cầu lukasai; chưa triển khai. Hướng modular/responsive do user yêu cầu; bố trí thư mục và các ngưỡng bổ sung bên dưới là đề xuất triển khai. Đối chiếu origin/main `fbc601062edfdc9a96cd9b04fd5c5d350b467efc`; local dirty được giữ nguyên. Không dùng số audit v1138 làm số hiện tại.

## 1. Mục tiêu và ranh giới

Mỗi màn có layout, HUD layer và vòng đời riêng. Đổi màn phải dọn input/listener/overlay của màn trước. Chia sẻ token, dữ liệu và component nhỏ; không chia sẻ một HUD khổng lồ hay state giao diện toàn cục. Giữ bản tách place đang chạy: sanh lo sảnh, main lo trận theo doc51. Không thay gameplay, camera hoặc số balance trong đợt này.

Map là môi trường 3D và cấu hình gameplay, không phải một màn HTML. Match dùng map adapter để lấy hình minimap, bounds và markers từ dữ liệu map. Hero data là kho dữ liệu; Hero Catalogue là màn xem dữ liệu đó. Không tạo heroes-desktop.yml/heroes-mobile.yml.

Nguồn: doc14 luật, doc40 token và UI, doc48–50 lịch sử kiến trúc, doc51 bàn giao hiện hành. Doc52 quy định hướng tổ chức UI; không thay luật bàn giao của doc51. Mâu thuẫn lịch sử README/doc48 còn nói main là trọng tài duy nhất cần sửa khi Savi tích hợp docs, dẫn sang doc51.

## 2. Kiểm kê màn hiện có

Đã xác minh bằng source: 8 trải nghiệm chính, trong đó Match có 2 layout desktop/mobile; không tính mỗi panel thành một màn mới.

| Màn | Source hiện hành | Module đích / layer sở hữu |
|---|---|---|
| Home | screens/lobby/home.js | home: navigation, hero preview, CTA |
| Heroes: roster + details + demo skill | screens/lobby/heroes.js | heroes: filter, cards, detail, preview controls |
| Lore | screens/lobby/lore.js | lore: nội dung và navigation |
| Room: mode/map/teams/start | screens/lobby/room.js | room: teams, lựa chọn, pending/ack/error |
| Hero Pick | screens/lobby/matching.js: pick | pick: roster, hover/lock, countdown |
| Loading/Versus | matching.js: versus | loading: roster đã khóa, tiến trình/fallback |
| Match | screens/match/desktop.js + mobile.js | match: layout riêng theo device, overlay riêng |
| Results | screens/lobby/results.js | results: outcome, stats, return |

Panel hiện có trong match/common.js: shop, scoreboard, stats, help, ping, tooltip, feed, boss/danger; chuyển thành các module con của Match. Thanh Sân Tập đang nằm trong lobby/index.js: chuyển quyền sở hữu sang Match, giữ lệnh hiện hành. Màn xoay máy hiện ở ui.js: thuộc system overlay. Hall of Honour có nhãn menu nhưng chưa xác minh route màn độc lập trong lobby/index.js; không tính là màn đã hoàn thành. Không tự bổ sung feature cho đủ sơ đồ.

## 3. Sáu lớp và chiều phụ thuộc

1. **Data:** hero/kit/item/map/localization và manifest asset chuẩn. Chỉ một nguồn cho từng loại.
2. **Session adapter:** đọc luật phase, roster, ack, results qua session.js; xuất snapshot cho view. Không viết bản sao sự thật phía UI.
3. **UI foundation:** tokens, typography, spacing, icons, buttons, safe-area, device profile. Không import combat hay màn hình.
4. **Screen modules:** Home/Heroes/Lore/Room/Pick/Loading/Match/Results, mỗi màn có view-model và CSS scope riêng.
5. **Screen layers:** content/HUD/panel/modal/toast của màn đó. Match có desktop/touch controls riêng; overlay không vay từ lobby.
6. **App shell/router:** quyết màn theo phase + local view + place, mount/unmount, system loading/error/rotate. Không chứa HTML panel trận hoặc listener joystick.

Chiều: shell → screen → view-model/components → adapter/data/tokens. Game simulation không import UI. Screen không import screen khác; shell điều phối chuyển màn. Component chung chỉ nhận dữ liệu thuần và callback, không đọc ctx hoặc phát lệnh trọng tài trực tiếp.

Tổ chức đích bám thư mục hiện có, không viết lại tất cả:

```text
scripts/ui.js                        # entry/router nhỏ
scripts/lib/session.js               # adapter hiện có
scripts/lib/data/*                   # nguồn data hiện có
scripts/ui/foundation/               # tokens, viewport, components
scripts/ui/system/                   # rotate, load/error, shell lifecycle
scripts/screens/lobby/*             # home, room, heroes, lore
scripts/screens/pick/*              # tách từ matching.js
scripts/screens/loading/*           # tách từ matching.js
scripts/screens/results/*           # tách từ lobby/results.js
scripts/screens/match/
  model.js                          # snapshot/view-model, không HTML
  desktop.js / mobile.js             # layout riêng
  controls/                         # mouse-keyboard / touch
  widgets/                          # hp, skills, minimap, feed...
  panels/                           # shop, board, stats, help, ping
scripts/maps/                       # adapter minimap/bounds/markers, không số tự đặt
```

## 4. HUD layer và input

Mỗi màn có root namespace riêng: home-, heroes-, room-, pick-, loading-, match-, results-. CSS của một màn không đổi nút hay z-index màn khác. Chia sẻ token và component button/bar/card nhỏ, mỗi màn tự bố trí.

Thứ tự trong mỗi root: content → HUD → panels → modal → toast; system rotate/error ở trên root. Dùng token z có tên từ doc40, không gán số mới trong màn. Chỉ layer đang mở nhận pointer; HUD trang trí xuyên input. Shop/board/modal mở thì không click xuyên để di chuyển/đánh. Touch đang kéo phải được cancel khi blur, đổi place, đổi màn hoặc xoay máy.

Lifecycle thống nhất: mount(viewModel, profile), update(snapshot), unmount(). Có thể dùng export/hook phù hợp engine đã xác minh, không giả định API engine có các tên này sẵn. unmount dọn listener, timer, pointer capture và overlay; mount lại không nhân đôi listener. UI-state cục bộ giữ chọn tab/filter khi phù hợp; không giữ joystick đang kéo hay tooltip cũ sau trận.

## 5. Responsive theo viewport và cách nhập

Không dùng một boolean compact để suy ra mọi thiết bị. Tách layout profile (wide/compact/tablet) khỏi input profile (mouse/touch/hybrid). Window desktop nhỏ có thể dùng compact layout nhưng vẫn mouse controls. Tablet/máy có touch không bắt buộc nhận toàn bộ phone layout. Dev override chỉ phục vụ QA, không đổi gameplay.

| Profile | Bố trí |
|---|---|
| Desktop rộng | neo cạnh viewport; panels đọc được; Heroes dùng danh sách + preview + detail |
| Desktop cửa sổ nhỏ | reflow panels và ẩn text phụ có cách mở lại; giữ mouse/keyboard |
| Phone ngang | vùng touch trái/phải; detail và shop có scroll; CTA cố định trong safe-area |
| Tablet ngang/hybrid | tận dụng vùng giữa, controls theo cách nhập thực; không phóng nguyên phone HUD |
| Phone/tablet dọc | giữ rotate overlay theo USER LOCK hiện hành; không có gameplay controls hoạt động phía dưới |

Khung doc40 1920×1080 và 820×460 là khung thiết kế. Reflow trước, scale một chỗ sau; không scale cả sảnh, từng card rồi HUD thêm lần nữa. Khoảng chạm phải đo ở CSS px hiển thị cuối: tối thiểu 48 theo hướng doc40, không tính 48 px trước khi thu nhỏ. Safe-area + vùng chrome Spawn theo biến engine; không hard-code rail thành kích thước mọi máy. HUD scale không được làm nhỏ hit target dưới ngưỡng.

VI/EN dùng cùng data và layout, cho wrap/ellipsis có cách đọc đầy đủ; không giảm chữ tự do để nhét EN. Lobby/content được scroll; khu vực chiến đấu chính không tạo scroll toàn trang. Resize/orientation đổi profile và bố trí, không reset roster/trận. Kiểm nhanh 1366×768,1920×1080; phone844×390,932×430; tablet1024×600,1180×820; thêm cửa sổ nhỏ và portrait rotate. Ảnh giả lập không thay evidence điện thoại thật.

## 6. Tải và mở rộng về sau

Home nạp tối thiểu. Source hiện tại lobby/index.js tải đồng loạt Heroes/Lore/Room/Results/Matching ngay sau render đầu: chuyển sang tải theo màn + prefetch đích gần nhất. Picking được prefetch HUD/asset roster như quyết định hiện có; không hiện input trận trước ingame. Lỗi tải có fallback + retry người dùng, không gọi lại vô hạn mỗi render.

Hero preview chỉ tải tướng đang xem; trận chỉ cần roster. Data nhỏ được share; model/clip/VFX giữ cơ chế tải theo nhu cầu đã có, không tách lại vô ích. Không thêm framework UI, event bus tổng hay ECS chỉ để chia file.

Map adapter Mạch Giữa trước; Cửu Mạch 5v5 thêm adapter sau. HUD không chứa tọa độ/tower/camp tự viết: đọc map config. Dev gallery chỉ trong dev module. Không kéo gallery hoặc combat vào Home vì tiện reuse.

## 7. Bốn đợt giao agent

| Đợt | Việc | Kết quả kết thúc |
|---|---|---|
| A: nền + ranh giới | kê màn theo bảng, thống nhất tokens/profile; dọn router/lifecycle; sửa comment session và README đã lỗi thời sau split | import graph rõ; một màn chỉ một owner; đổi màn không tồn listener |
| B: lobby + hero data | Home/Room/Heroes/Lore responsive, CSS scope; pick/loading/results tách riêng; tải theo route | VI/EN đọc được, pending/ack đúng; preview giữ nguyên; không inline style ngoài CSS vars |
| C: match | tách common.js thành view-model/widget/panel; controls và HUD desktop/touch thuộc Match; chuyển practiceBar | HUD độc lập lobby; không input xuyên panel; minimap theo data; đổi place dọn controls |
| D: tích hợp | chạy một lượt UI thật từ sảnh tới trận và về, resize/VI-EN/touch; đo tải cùng điều kiện | bảng lỗi ngắn kèm build/evidence; module đạt ghi PASS đúng phạm vi |

Song song được: một owner nền/router; một owner lobby/hero; một owner match. Không hai agent sửa cùng file. Savi tích hợp và push theo nhóm nhỏ. Không đợi đổi xong toàn bộ kiến trúc mới có bản chơi: mỗi đợt giữ luồng đang chạy, có rollback commit.

## 8. Nghiệm thu gọn

- Màn đã chuyển module: lint doc40 =0 trong phần mới; không dùng audit số cũ làm PASS. Phần cũ còn nợ có danh sách, không chặn tất cả bằng nợ ngoài đợt.
- Không chồng UI, CTA/skill không ra ngoài safe-area; touch target đạt ngưỡng ở kích thước cuối; VI/EN đủ nội dung.
- Từ lobby tới match và quay lại: không listener trùng, nút/touch trận không hiện ở loading/lobby, không lệnh ngoài phase.
- Hero/item/map có một nguồn; UI không đổi HP/damage/camera/timeout. Luật ack/roster/reconnect của doc14/doc51 giữ nguyên.
- Báo performance có baseline cùng device/cache/build và số lần đo; không lấy tổng MB manifest làm MB tải thực. 450KB vẫn là mục tiêu đề xuất theo docs kiến trúc, không tự coi là gate đã khóa.

## 9. Kết quả review giới hạn

CONCERNS, chưa nghiệm thu implementation. 3 việc cần giải ngay trong các đợt: router giữ touch input/scale thay screen owner; common.js gom nhiều panel/style/state; boolean compact trộn viewport với input. Không cần mở thêm spike place hay thay kiến trúc trọng tài cho quy hoạch UI này. Doc40 định nghĩa token; doc51 định nghĩa split; doc52 nối hai phần bằng ownership/lifecycle và plan từng đợt. Chưa chạy test hoặc đo mới trong lượt viết plan.

## 10. Phân phối asset qua database — USER LOCK 2026-10-09

User yêu cầu: vào trận chỉ load tướng được chọn, không load toàn roster game; việc phân phối phải qua database asset đã có.

- Kho hiện có: assets/registry.yml là khai báo; assets/manifest.yml là bảng sinh từ công cụ; INDEX.md/manifest.csv dùng tra cứu theo doc42. Đây hiện là sổ asset/quét tham chiếu, chưa có bằng chứng nó đã là runtime distributor. Agent nối resolver/loader vào kho này, không tuyên bố cơ chế đã chạy.
- Một cửa phân phối: màn yêu cầu asset bằng ID/bundle; resolver lấy phiên bản/URL từ manifest và chuyển cho cơ chế tải engine. Không rải URL hoặc tạo bảng model/clip/SFX riêng trong từng màn. Cho phép bảng sinh từ manifest cho runtime nếu engine cần; không duy trì tay nguồn thứ hai.
- Sảnh: UI cần thiết + preview tướng đang xem. Roster cards tải thumbnail/icon cần hiện; xem cards không kéo model/animation/VFX của tất cả tướng.
- Trận: tập hero ID duy nhất từ match.roster đã đóng băng, gồm người chơi hai phe và bot đã chốt. Tải bundle của những ID đó: model, rig/animation, vũ khí, icon HUD, SFX/VO và VFX cần dùng; dependency chung chỉ tải một lần. Không chỉ tải tướng của chính mình vì còn phải hiển thị đồng minh và địch.
- Picking chỉ prefetch tướng đang chọn theo nhu cầu; loading chốt bundle theo roster chính thức. Match không scan toàn manifest rồi tải tất cả. VFX code cũng không được import một file chứa asset eager của mọi tướng làm mất lợi ích bundle.
- Map/lính/boss dùng bundle riêng theo map và mode đang chơi; không kéo Cửu Mạch/gallery vào trận Mạch Giữa. Không xóa asset đã cache hay đang được engine dùng chỉ vì rời màn; giải phóng tham chiếu theo lifecycle/capability thực.
- Asset bắt buộc lỗi: hiển thị lỗi/retry, không báo ready giả. Asset phụ có fallback được khai báo. Không tự đổi thời gian loading hay luật vào trận: vấn đề chưa ready phải được xử lý theo contract hiện hành và ghi rõ nếu cần điều chỉnh.
- Giao việc vào đợt A: xác định manifest và dependency bundle; đợt B nối preview; đợt C nối bundle theo roster/map. Không xây database mới.
- Nghiệm thu bằng request/asset trace trên cache lạnh: trận chỉ có A/B không tải model/clip/SFX/VFX riêng của C; trùng hero/dependency không tải lặp; đổi trận sang C thì mới lấy bundle C. Báo rõ cache hit và tải mới. Đây là tiêu chí cần thực hiện, chưa có kết quả trong lượt cập nhật docs này.
