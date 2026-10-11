# 27 — Handoff sản xuất map 5v5 ba đường

**Mục đích:** một brief sản xuất map kế tiếp, đủ để chia việc sau khi mốc 1v1 được nghiệm thu. File này nối thứ tự ở [15 — Trận thử 1v1](15-todo-thu-tran-1v1.md) với layout/coordinate candidate ở [07 — Cửu Mạch](07-layout-ban-do-v1.md) và tiêu chí bàn giao ở [11 — Acceptance](11-acceptance-ban-giao.md); không sao chép bảng tọa độ hoặc viết lại checklist acceptance.

**Quyết định hiện hành:** hoàn tất trận 1v1 Mạch Giữa trước; sau khi chủ dự án đóng mốc đó mới thiết kế và sản xuất một map 5v5 ba đường kiểu MOBA. Không có mốc 3v3 trung gian. ID map đã có trong docs là `cuu_mach` (07 §1 và 09 §2); lobby hiện khóa ID này. Giữ `mach_giua` làm map một đường hiện hành, không phóng to/đổi geometry của nó để giả lập ba đường.

**Trạng thái:** `BLOCKED` trước production geometry/runtime. Cần hoàn tất mốc 1v1, chủ dự án chốt các gate §7, và ký nhận geometry/schema trước khi triển khai. Không có tọa độ nào được bổ sung trong file này. Không có runtime/data gameplay nào được sửa trong lượt viết brief.

## 1. Phạm vi và giới hạn

- Làm map riêng **cuu_mach** cho mode 5v5 **tai_hien**, với ba lane, rừng/objectives và hai căn cứ đối xứng theo geometry manifest được duyệt; doc 07 hiện chỉ là candidate layout.
- Giữ nguyên luật tướng, combat, kinh tế, tiến trình và điều khiển. Không tự đổi camera; trong khi G4 còn mở, giữ camera runtime hiện hành và chưa dùng nó làm chuẩn sign-off map. Map art không tự cân bằng lại khoảng cách, tầm trụ, đường đi lính, hitbox, tốc độ hoặc skill.
- Hoàn tất/nghiệm thu scope 1v1 trong doc 15 là dependency bắt buộc. Có thể đọc và chuẩn bị danh sách câu hỏi, nhưng không bắt đầu chọn/đổi tọa độ hoặc dựng map 5v5 trước khi dependency này đóng.
- Không dùng doc 17 để suy ra map 5v5: đó là tài liệu Mạch Giữa, có số liệu proposal không khớp runtime; trạng thái được ghi ở đầu doc 17.
- “Map mới” ở đây là một layout/data ID riêng. Không tái sử dụng geometry một lane `mach_giua` rồi tự nhân tỷ lệ hoặc đặt thêm lane bằng mắt.

## 2. Nguồn sự thật theo phạm vi

| Phạm vi | Nguồn cần dùng | Giới hạn |
|---|---|---|
| Thứ tự công việc | Quyết định gần nhất của chủ dự án, được ghi ở doc 15 và đây | 1v1 trước, `cuu_mach` ba lane sau; không có 3v3 chen giữa |
| Candidate topology, point IDs, tọa độ và ranh giới visual/gameplay | Doc 07, đọc cùng các nhãn `[V1 SPEC]`, `[THAM KHẢO]` và mục acceptance của chính nó | Đây là candidate layout ba lane trong docs, chưa phải map runtime hiện tại. Không tự scale, mirror, nội suy hoặc thay tọa độ có nhãn tham khảo. Mọi giá trị cần dùng phải được chủ dự án/level design khóa trước khi build. |
| Geometry map đang chạy | `scripts/lib/data/map.yml` | Canonical cho map runtime hiện tại `mach_giua` theo doc 09; chỉ có một đường. Không lấy nó làm geometry nguồn cho ba lane. |
| Terrain và placement được dựng trong world | `places/main/config.yaml`, `places/main/cells/*.scene` | Phải được kiểm tra khớp data topology đã khóa; scene không được dùng để lặng lẽ thay tọa độ gameplay. |
| Consumer runtime hiện hành | `scripts/terrain.js`, `scripts/lane.js`, `scripts/ui.js`, `scripts/lib/lobby-ui.js`, `places/main/sim.js` | Mô tả ranh giới tích hợp hiện tại ở §5; các consumer chưa tự chứng minh hỗ trợ nhiều map. |
| Quy tắc data, map ID, locale | Doc 09 §1–2 | ID không đổi sau khi ship; UI text VI/EN lấy từ string table, không làm key gameplay. |
| Acceptance/art handoff | Doc 11, đặc biệt MAP-01–04 và MAP-06, cùng §4 art handoff | Doc 11 là nguồn acceptance. Doc này chỉ ghi phạm vi evidence bổ sung cho lần giao map `cuu_mach`. MAP-05 là acceptance tướng, không phải acceptance map. |
| Ngôn ngữ art/motif văn hóa | Doc 02 · Bản đồ và art bible | Giới hạn thị giác/văn hóa; không đồng nghĩa được thêm hình học hoặc va chạm. |
| Research gameplay MOBA | Doc 18 · Research map MOBA | Chỉ tham khảo pattern gameplay/readability; không dùng làm nguồn tọa độ hoặc runtime. |
**Cách dùng doc 07:** giữ nguyên bảng tọa độ và art contract ở đó. Trước khi mở blockout, level design phải phát hành một bản geometry manifest cho `cuu_mach`, trỏ từng ID/giá trị về đúng dòng của doc 07 và ghi rõ giá trị nào đã được chủ dự án chốt. Nếu có dòng `[THAM KHẢO]`, thiếu waypoint hoặc mâu thuẫn nội bộ, đưa vào owner gate; không tự hoàn thiện bằng phán đoán.

## 3. Ranh giới topology và trang trí

| Gameplay topology — khóa trước | Art shell — chỉ làm sau khi topology khóa |
|---|---|
| Spawn/căn cứ/Tâm Mạch; ba đường và waypoint theo thứ tự; gate/trụ theo lane; camp/pit/objective; bounds; vùng brush; đường đi minion/Titan; collision, nav, LOS, vùng nước/cao độ ảnh hưởng di chuyển hoặc projectile. ID, vị trí và vùng tác động lấy từ geometry manifest đã duyệt. | Kiến trúc, đá/rễ/cây/cờ, hoa văn, tượng, nước/particle trang trí, vật liệu, palette và ánh sáng. **[PROPOSAL — chờ duyệt art/cultural owner]** Có thể đánh giá motif chim Lạc, trống đồng, mây nước hoặc hoa văn cổ làm điểm nhấn; không motif nào được coi là đã duyệt từ bảng này. Sau khi được duyệt, vẫn phải để lane, địch, projectile và cảnh báo skill đọc rõ. |

Doc 07 §8 định nghĩa `gameplay_ground`, `gameplay_points`, `art_shell`, `art_fx`; dùng đúng ranh giới đó. `art_shell` không được tự thêm collider, chặn nav, đổi LOS/projectile/camera collision, làm thay đổi truy vấn brush, range trụ, objective ring hoặc path. Một vách, cầu, bờ sông hay vật thể trang trí nếu có ảnh hưởng đi lại/tầm nhìn là topology; phải qua map revision và cập nhật đồng bộ data/collision/nav/LOS, không được lén đưa vào art pass.

## 4. Dependencies và thứ tự giao việc

| Phase | Điều kiện vào | Việc và đầu ra bắt buộc | Gate để sang phase tiếp |
|---|---|---|---|
| 0. Đóng mốc 1v1 | Hoàn thành các việc trong doc 15 | Chạy T1–T6, lưu build/data version, log/video theo doc 11; chủ dự án ghi nhận nghiệm thu | T1–T6 có evidence và owner xác nhận. Chưa có xác nhận thì map 5v5 còn `BLOCKED`. |
| 1. Khóa nguồn geometry | Phase 0 PASS | Đối chiếu từng point/lane/camp/pit/brush của candidate `cuu_mach` với doc 07; phát hành geometry manifest có provenance; đưa mọi thiếu/mâu thuẫn/giá trị tham khảo thành owner decision | Chủ dự án/level design ký geometry manifest và phiên bản doc 07 dùng để build. Không được đoán tọa độ. |
| 2. Khóa data contract và cách chọn map | Geometry manifest PASS | Runtime/data owner thiết kế cách map ID `cuu_mach` chọn đúng topology/terrain/scene/minimap; quyết định place riêng hay cùng place có map-aware data; chỉ ra consumer nào đọc dữ liệu map đã chọn | Owner duyệt schema, luồng chọn map và migration. Chưa có contract thì chưa ghi thêm map rows vào `map.yml` hoặc bật map trong lobby. |
| 3. Greybox topology | Phase 1–2 PASS | Dựng ground/corridor/river/base/lane/gate/structure/camp/pit/brush theo manifest; không đặt art shell để che lỗi; xuất overlay data → scene | MAP-01/02/03 được QA kiểm bằng diff/inventory/route evidence; chủ dự án ký topology. |
| 4. Gameplay integration | Phase 3 PASS | Nối wave, route minion, tower/Nexus, camp/objective và match map ID vào topology mới; xác nhận logic theo lane của 5v5. Không đổi luật hoặc tune stat như một phần của map pass. | MAP-02/03 và các hàng MATCH/CAMP/CALL/TITAN liên quan trong doc 11 có evidence trên map `cuu_mach`. |
| 5. Art pass | Phase 3 PASS, topology đã đóng băng | Tạo zone plan/palette/material, landmark và decor theo doc 07/11; lưu asset manifest; decor không đổi gameplay shell. | MAP-04 PASS, collision/nav/LOS diff không đổi so với topology được ký. |
| 6. Minimap, HUD, camera và readability | Camera gate §7 đã giải quyết | Cùng một map data feed cho scene/minimap/map-click; kiểm tra Blue/Red orientation, landmark VI/EN, combat visibility từng lane; không thêm camera profile mới nếu chưa được duyệt | MAP-06 PASS và evidence camera/readability được owner camera + UI + QA xem độc lập. |
| 7. Bàn giao | Các phase trên PASS | Cập nhật doc 11 record: trạng thái, build/data version, evidence link, owner, ngày, ghi chú; bàn giao geometry manifest, scene inventory, asset manifest và known issues | Chủ dự án chấp nhận gói map; chỉ sau đó mới mở khóa/đưa `cuu_mach` thành lựa chọn chơi được. |

Không bỏ qua thứ tự bằng cách làm concept render trước khi có topology được ký. Concept được phép dùng để trao đổi motif, nhưng không phải evidence về kích thước, đường đi, collision hoặc tầm nhìn.

## 5. Khoảng trống tích hợp đã xác minh

Repo hiện có data và tên map nhưng chưa có luồng runtime đa-map cho `cuu_mach`:

- `scripts/lib/data/map.yml` hiện là một map phẳng: một polyline `lane`, một `laneWidth`, bốn tower, hai base/fountain/nexus, brushes và alcoves. Không có map ID trong file, collection lane có tên, gate, camp hoặc pit.
- `scripts/lane.js` nhập `map.yml` trực tiếp và tạo một tuyến Blue/Red từ `MAP.lane`; `scripts/terrain.js` cũng nhập cùng file để tạo địa hình. `scripts/ui.js` và `scripts/lib/lobby-ui.js` vẽ minimap từ cùng một `MAP` đơn.
- `places/main/config.yaml` có dấu lane-blue/lane-red riêng cho địa hình; scene hiện hành có placement của map Mạch Giữa. Những phần này cần một contract xác định cách nhận geometry của map được chọn, không chỉ thêm `cuu_mach` vào danh sách UI.
- `scripts/lib/data/lobby.yml` hiện mở `mach_giua` và khóa `cuu_mach`; `places/main/sim.js` lưu `map` trong state phòng/trận. Trạng thái lựa chọn map không tự chuyển những import tĩnh nêu trên sang geometry khác.

**Owner gate bắt buộc:** quyết định map-aware runtime trong cùng place hay tách place/map scene. Runtime/data owner phải chứng minh contract mới đưa cùng một map ID tới referee, gameplay, terrain, structures, minimap và map-click. Không để scene dùng một map trong khi UI, lane simulation hoặc lobby báo map khác.

## 6. QA độc lập và evidence gates

Tái sử dụng điều kiện pass trong doc 11; bảng dưới chỉ ánh xạ evidence dành cho lần giao `cuu_mach`. Mọi record có `status`, build/data version, link evidence, owner, ngày và ghi chú. Không chuyển `NOT RUN` thành `PASS` chỉ vì data hoặc scene file đã tồn tại.

| Reviewer độc lập | Evidence cần nộp cho `cuu_mach` | Acceptance liên kết | Trạng thái ban đầu |
|---|---|---|---|
| Gameplay/map systems | Geometry manifest ↔ data diff; scene entity inventory; route capture cho cả hai hướng trên đủ ba lane; kiểm tra từng wave chạy đúng waypoint và tower/Nexus đúng lane | MAP-01, MAP-02, MAP-03; MATCH-02, MATCH-03 | `BLOCKED` cho tới khi geometry/schema được duyệt; sau đó `NOT RUN` |
| Navigation/collision/LOS | Nav/collision export hoặc diff, route đi bộ không kẹt, kiểm tra brush/query và vật cản; projectile/target visibility ở choke points | MAP-04 | `BLOCKED` cho tới khi topology đóng; sau đó `NOT RUN` |
| Map art | Top-down blockout overlay so với geometry manifest; capture trong trận ở từng lane/jungle/base/pit; zone plan/palette/material và kiểm tra landmark/decor không che tell | MAP-04, MAP-06; doc 11 §4 | `NOT RUN` |
| UI/minimap | Capture minimap đối chiếu tọa độ world cho ba lane, structure, camp, pit, base; kiểm tra hướng Blue/Red, map-click và landmark VI/EN | MAP-06; L10N-01 khi chuỗi liên quan | `BLOCKED` cho tới khi schema/map projection được duyệt; sau đó `NOT RUN` |
| Camera/readability | Sau khi G4 được chốt, capture gameplay dùng camera contract ghi trong quyết định đó: lane, combat, hero scale, tower tell, projectile/VFX, landmark; kiểm tra vật thể không cắt khung/che đường và đối chiếu minimap. Trước G4, capture chỉ là tham khảo và không sign-off readability. | MAP-04, MAP-06 | `BLOCKED` cho tới khi camera gate §7 có quyết định; sau đó `NOT RUN` |
| QA tổng hợp | Chạy lại matrix doc 11 trên build và map ID cụ thể; lưu replay/video, log và data version | MAP-01–04, MAP-06 và các hàng match liên quan | `NOT RUN` sau khi các gate upstream đóng |

Tối thiểu, evidence phải cho thấy cả Blue lẫn Red, ba lane và các vùng combat chính; ảnh concept đơn lẻ không thay cho gameplay capture. Chỉ chốt ngưỡng FPS, kích thước tải, thiết bị hoặc format capture khi owner/platform chọn và ghi vào acceptance; file này không tự đặt ngưỡng.

## 7. Owner gates — không suy đoán

| Gate | Câu cần chốt | Vì sao chặn production |
|---|---|---|
| G1 — 1v1 closeout | Chủ dự án xác nhận T1–T6 ở doc 15 đã PASS bằng evidence | Đây là thứ tự người dùng yêu cầu; chưa xong 1v1 thì chưa mở phase map 5v5. |
| G2 — Geometry `cuu_mach` | Chủ dự án/level design ký các hàng trong doc 07 làm geometry candidate chính thức hay yêu cầu sửa doc 07 trước; mọi `[THAM KHẢO]` cần nguồn/chốt riêng | Không được nội suy tọa độ hoặc suy ra đường còn thiếu; 07 có candidate 3 lane nhưng chưa phải geometry runtime đã nghiệm thu. |
| G3 — Multi-map schema/place | Runtime/data owner chọn same-place map-aware hay place riêng, và ký luồng map ID xuyên suốt world | Hiện map ID trong state lobby không chọn được geometry giữa các import tĩnh. |
| G4 — Camera/góc nhìn | **ĐÃ CHỐT 2026-10-08 (G1):** contract là camera khoá kiểu AOV/LoL theo @lukasai #7781; số ở `scripts/lib/data/camera.yml` (pitch 56°, distance 11 m mặc định từ 2026-10-08 “tướng quá nhỏ”, zoom 8–26 m, mobile 9,5 m, fov 42, yaw theo team; yml thắng nếu lệch). Docs 04/06/11/13/design.md đã đồng bộ, “qua vai” chỉ còn là ghi chú supersedes. | Map 3 lane kiểm visibility/readability ở góc này; không tự đổi camera. |
| G5 — Projection và hướng | UI/map owner xác nhận world→minimap, map-click, north/XZ orientation và cách Red xem map | 07 quy định không xoay map chỉ để làm minimap đẹp; mọi marker/path phải trùng world. |
| G6 — Art shell và hiệu năng | Art/gameplay owner ký landmark, motif, collision policy; platform owner khóa ngân sách nếu cần | Không thể nghiệm thu decor/readability/performance bằng một ngưỡng chưa được dự án chọn. |

Cho tới khi G4 được giải quyết, giữ nguyên camera runtime hiện hành và coi việc chốt hình học/art phụ thuộc camera là `BLOCKED`; không sửa camera để ép map vừa khung. G4 chỉ quyết định tiêu chuẩn kiểm tra, không cấp quyền đổi gameplay/camera.

## 8. Tiêu chí handoff cho agent thực hiện

Agent chỉ bắt đầu implementation map `cuu_mach` khi nhận đủ: (1) record PASS của mốc 1v1, (2) geometry manifest có nguồn và chữ ký owner, (3) schema/place strategy được duyệt, (4) camera và minimap projection gate được giải quyết. Gói giao việc phải chỉ ra file canonical sau khi contract được duyệt, map ID, danh sách consumer cần nối, người review độc lập và evidence path/record trong doc 11.

Nếu thiếu một trong bốn điều kiện này, agent chỉ được báo `BLOCKED` kèm đúng quyết định còn thiếu; không tự thêm tọa độ, không thay doc 07 theo phỏng đoán và không bật `cuu_mach` trong lobby/runtime.
