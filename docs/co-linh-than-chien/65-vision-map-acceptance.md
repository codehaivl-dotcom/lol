# 65 · Nghiệm thu vision và map cho prototype hai Mạch Đăng

**Cập nhật bàn giao 09/10/2026:** chủ dự án xác nhận luật Sân Tập và reconnect đã fix; hai mục này **ĐÃ ĐÓNG THEO XÁC NHẬN OWNER**, không mở lại hoặc xin duyệt lại. Các report/source fixture 9351 là evidence lịch sử, không xác định trạng thái world sau đó. Ưu tiên [66 · Bàn giao cho Savi](66-ban-giao-cho-savi.md).

**Nguồn kiểm cuối9351e23c6c6b4cc55a160dbf7aec268973b6394d.** 373b trong receipt phía dưới là lượt trước. Map/structures/heroes/target consumer giữ nguyên; combat cleanup dấuấn và UI accent đổi, không phải vision được tích hợp. Acceptance JSON và validator đã rerun trên9351; fixture geometry dcdb vẫn lịch sử/EXPERIMENTAL.

Ngày 2026-10-09. **EXPERIMENTAL_ACCEPTANCE_CONTRACT**. Hội đồng Codex hoàn thiện trực tiếp đặc tả, dữ liệu ca thử và công cụ kiểm tra trong repo. Đầu ra này đóng phần thiếu acceptance/evidence plan; BEACON-01/02/03 và MAP-01 vẫn cần bằng chứng engine/balance. Không có PASS_CLIENT hoặc placement được duyệt trong gói này.

Receipt nguồn lượt đầu được đọc tại commit `373bff9e7bca2093e89dfae6cc73fd6e0dd6749c`: map, structures, heroes, combat, hero aim/combat, bot, model/minimap/touch UI và ui.js. Nguồn thiết kế là [61](61-mach-dang-va-cong-tac-phong-thu.md). Mô hình beacon có pin lịch sử `dcdbfb3d3cfe83ae65ed91a85dd439dceeb38f90`; giữ nhãn lịch sử đó. ZIP/audit cũ mô tả snapshot, không phải trạng thái phòng live.

Map tại commit mới dùng extent88, laneWidth10, corridorHalf12 và trụ14m attack range. Bản working tree trước đồng bộ dùng extent130; không dùng nó làm nguồn hiện hành. Dữ liệu map giữa hai pin mới/lịch sử có thể giống nhau; provenance vẫn phải ghi đúng từng pin. Tầm bắn trụ14m không xác lập vision radius.

## Gói có thể chạy lại

- [acceptance-v01.json](../../tools/balance/beacon/acceptance-v01.json): 31 nhóm ca có actor, action, expected, reset và observable; mỗi nhóm chạy trên cả west/east, đổi phe tương ứng. Các nhóm có nhiều biến thể phải ghi receipt riêng cho từng biến thể, không gộp một PASS cho cả nhóm khi chưa đủ.
- [acceptance-check.mjs](../../tools/balance/beacon/acceptance-check.mjs): đọc source đúng commit hoặc bundle có manifest/hash, kiểm dữ liệu acceptance/config/map/structures và chạy assertion của mô hình trên cả hai đèn. Mỗi ca mô hình chỉ chứng minh những hành vi thực sự được kiểm; observables engine trong JSON vẫn NOT_RUN.
- [vision-closure.json](../../reports/production-2026-10-09/vision-closure.json) và [bản đọc](../../reports/production-2026-10-09/vision-closure.md): số PASS_DATA/PASS_MODEL thực tế, hash nguồn, phạm vi source review, ca engine chưa chạy và trạng thái đóng từng phần.

```sh
node tools/balance/beacon/acceptance-check.mjs --commit 9351e23c6c6b4cc55a160dbf7aec268973b6394d
```

Công cụ không ghi gameplay hoặc placement. `PASS_DATA`/`PASS_MODEL` không được đổi tên thành PASS_ENGINE/PASS_CLIENT. Bộ source trong `fixtures/production-source/<commit>` cho phép chạy portable khi có đủ file và hash; thiếu file hoặc hash lệch phải dừng, không lấy dữ liệu khác âm thầm.

## Input đã rõ và input runtime có gate

Hai fixture offline là west(-12,0), territory blue; east(12,0), territory red; radius12m, tương tác2m, công tắc10m, LOS bằng hộp và hardCC stun/root/charm. Tất cả là EXPERIMENTAL_OFFLINE_FIXTURE. Tọa độ approved=false; runtimeCoordinates=null. Không chép ±12m lên map, không suy placement từ sơ đồ Boss, không mở thêm Cửu Mạch/5v5.

Các số thử có nguồn trong doc61/config: I sau1.2s, II sau tổng4s; I25s; II15s rồi I10s; giá180g; personal cooldown35s và shared beacon lock35s. Shared lock là đề xuất prototype, chưa phải USER LOCK. Hai cấp dùng cùng radius thử; II thêm detection. Công tắc không làm CC hay tạo II.

Trước ca engine, runner phải điền tám gate trong JSON: build/engine/room/match/round; hai tọa độ trial và territory cùng nav/LOS/brush; radii runtime thử; mapping hardCC thật; visibility authority và các nguồn vision nền; clock/tick/latency/tolerance; persistence/round/idempotence; thiết bị/gesture/safe-area/rail/touch-size. Giá trị null hiện nay mang nghĩa **REQUIRED_BEFORE_ENGINE_RUN**, không mặc định dùng fixture. Đây là gate thực thi đã có owner và observable, không phải đề nghị mở thêm vòng docs để hỏi lại các số thử.

Mỗi đèn trial phải có hai lối tiếp cận thật và đường rút. Ghi đường đi và thời gian cho hai phe cùng kit/cấp/item, kiểm LOS/collision/brush bằng engine. Ít nhất một đèn có territory phòng thủ cố định từ đầu; neutral territory không cho phe nào dùng công tắc. Mất trụ không đổi quyền territory. Ghi trial placement EXPERIMENTAL; symmetry hoặc ảnh map không đủ duyệt công bằng.

## Những ca phải có receipt

| Nhóm | Actor/action | Expected | Observable chính |
|---|---|---|---|
| B01–06 | Hai client giữ/thả, damage/CC, cướp và yêu cầu đồng thời | I1.2; II4; không cộng channel; cancel trước/sau I; capture tạo cycle mới; expiry trước milestone cùng thời điểm | Thời gian server, owner/tier/cycle/end/iiEnd/channel, hai hình client |
| B07–13 | Hai defender mua/dùng, năm hàng bảng switch, sai range/territory/LOS và spam | Charge180 một lần; activation0g; sai không mất charge; II→I giữ owner/deadline; I→neutral; neutral→own I; lock độc lập từng đèn | Transaction IDs/gold/tool/readyAt/lockUntil; rejection reason; target chọn chính xác |
| B14–16 | Chủ khôi phục sau downgrade; switch khi địch channel | Recovery trước iiEnd giữ deadline; stale cycle/late completion bị từ chối; switch không ngắt channel | Ordered events/cycle/iiEnd/end |
| V01–02 | Địch plain/brush/stealth, radius/LOS và nguồn khác | I không detection; II detection trong cùng radius/LOS; mất grant ngay tại server khi rời/LOS/downgrade/expiry; nguồn hợp lệ khác có thể giữ target | Grant/provider IDs, payload, model/minimap/target client A/B, latency |
| V03–05 | Địch ẩn đổi position/HP/channel; request target; projectile/DoT/AoE; audio/UI | Không lọt thông tin mới sang phe không biết; new-target phải bị chặn; combat đã hợp lệ theo contract hiện hành; damage callback không cấp tọa độ ẩn | Filtered payload/API, bot observation/access log, target denial, event recipients/audio |
| P01–03 | Restart/reconnect/death/cross-place/reset/old event/replay | Same-round giữ timer/tool/locks; disconnected channel không resume; reset round xóa vòng cũ; stale event/duplicate transaction không ghi sai | Before/after durable state, round/clock origin, reset/rejection receipts |
| M01–03 | Phone thật giữ/thả/cancel/blur/lost capture; hai touch; chọn riêng công tắc | Không stuck/restart hold tự động; mỗi lần chỉ một đèn; movement/cast cancel trước action; control đạt touch-size canonical, tránh rail và safe-area | Touch IDs/event order, phone video, measured hitbox/viewport/rail |
| G01–02/AI01 | Đi hai đường/rút, đo coverage/LOS, bot bảo vệ/ngắt/I–II/farm | Traversal thật; coverage theo geometry reachable và nguồn overlap; bot chỉ dùng thông tin hợp lệ | Paths/travel/collision/LOS/camera, bot input/reasons/farm cost |
| E01 | Paired support/carry ahead/behind có/không switch | Đo mua/trì hoãn đồ/reach/contest/II uptime; chưa chứng minh comeback hoặc chọn số từ win rate giả | Gold ledger, farm/shop/travel, kit/build/seed/denominator |

Reset mỗi ca dùng protocol trong JSON. Reset mô hình giữ tọa độ và cấp500g là tiện ích fixture; reset runtime phải ghi spawn/gold thật của mode. Không đưa QA referee trace hoặc vị trí ẩn vào UI/bot người chơi. Ghi rõ round mới và dọn fixture; ca bị input người dùng lẫn vào là INCONCLUSIVE.

Ca B02 dùng hai fixture riêng bắt đầu t0: thả1s giữ neutral; thả2s sau I giữ deadline26.2s, không lấy đồng hồ4s của ca trước làm điểm bắt đầu. Ca B13 thực sự dựng enemy II tại4s rồi downgrade5s để đo lockUntil40s; tiếp đó direct capture và expiry đều giữ lock40, carrier thứ hai bị từ chối35s và thành công40s. Không thay ca downgrade này bằng neutral switch tại0s chỉ vì cả hai có shared lock.

## Ranh giới dữ liệu ẩn cần thực thi

Source mới có các đường tích hợp cần kiểm: `combat.units()` đọc actor positions/state; aim/ray/cursor/autoTarget và bot dùng danh sách này; `minimapModel()` dựng vị trí player/bot địch từ dữ liệu được cung cấp. Những helper được đọc chưa có filter vision ở chính các hàm đó. Điều này xác định nơi phải nối visibility policy; chưa đủ kết luận engine đã gửi thông tin ẩn đến client thật.

Contract phải xác lập một kết quả visibility có authority, dùng chung cho replication/API, target acquisition, minimap/model, bot observation và notifications/audio. Giữ model trong suốt không đủ. Kiểm negative probe: actor ẩn đổi tọa độ/HP/channel, request target mới từ client phe không biết, đối chiếu payload/bot access và hai ảnh. Phần geometry tĩnh được biết vẫn hiện; thông tin last-seen chỉ có timestamp và không được đổi thành vị trí hiện tại. Projectile/DoT phát hợp lệ và skillshot/AoE follow combat hiện hành; không tự thay damage contract để đóng vision.

Controls combat mới đã có pointer capture/up/cancel/lostcapture và joystick có blur cleanup. Đây là nguồn để thiết kế ca M01–02; không chứng minh nút Mạch Đăng đã tồn tại. Gesture policy phải ghi trước khi chạy; phone emulation không thay receipt thiết bị thật.

## Shared lock35s và lifetime25s

Nếu switch thắp I ở t0, I hết ở t25 nhưng shared lock còn đến t35: **10s lock sau khi ánh sáng mới đã tắt**. Nếu switch hạ II ở t5 của timeline0→II4→end29, lock đến40; ánh sáng hết29, còn11s lock. Nếu sau đó direct capture mở cycle khác, lock vẫn theo beacon, nên không thể dùng một con số10s cho mọi capture cycle. Direct channel luôn có thể tranh chấp trong lock nếu actor hợp lệ.

Các carrier đồng đội thêm vào không bypass lock. Vì vậy mô hình1/3/5 carrier có thể có cùng successful effects nhưng tăng rejects; chưa chứng minh support teamwork ngoài đời. Phương án thử bên cạnh nhau:

| Phương án | Trạng thái | Shared lock | Personal cooldown | Lock vượt newly-lit I25s | Câu hỏi phải đo |
|---|---|---:|---:|---:|---|
| L25 | EXPERIMENTAL |25s|35s|0s|Spam/coordination khi beacon mở lại ở thời điểm I tắt |
| L35 | EXPERIMENTAL |35s|35s|10s|Giá trị defender/carrier thứ hai và cơ hội capture trong lock |
| L45 | EXPERIMENTAL |45s|35s|20s|Mức giảm spam so với mất tác dụng của phối hợp đội |

Chưa ưu tiên phương án nào. Sweep cũ đổi **personal và shared cùng lúc25/35/45**, nên không tách được tác động riêng shared lock. Các phương án mới giữ personal35 để đo shared riêng. Giữ quy tắc recovery không refresh II vô hạn ở cả ba phương án.

## Giới hạn70% reachability và economy

Sweep lịch sử180s áp cơ hội mỗi40s, switch ở+5s, xác suất70% đặt từ ngoài, mọi actor cùng tọa độ, không movement/contest/combat/recovery. Detection75→26.79s là số fixture và không trở thành win rate, skill bot, map reachability hay comeback proof. Diện tíchπr² không phải coverage traversable khi có tường/brush/overlap.

180g ở sensitivity1g/s và3g/s tương ứng180s và60s income opportunity cost.1g/s không phải support income được đo; starting500g mua ngay còn320g không chứng minh giá dễ cho đội thua. E01 phải ghi role/kit/level/items/gold deficit, farm bị mất/denied, shop/travel, time-to-buy và recipe bị trì hoãn; compare paired cùng map/build/seeds và actual reached opportunities. Không đặt ngưỡng PASS cân bằng trước baseline, không chọn lock bằng fake win rate.

## Trạng thái đóng

**Đã hoàn thiện tại repo:** contract máy đọc, input fixture rõ, runtime gates không bị đoán, actor/action/expected/reset/observable, evidence fields, alternative matrix và validator chạy được. Báo cáo sinh ra từ checker chứa số kiểm thực tế và hash.

**Còn mở có lý do thực tế:** BEACON-01 thiếu runtime feature/two-client evidence; BEACON-02 thiếu travel/contest/stealth measurement; BEACON-03 thiếu actual economy và lựa chọn shared lock; MAP-01 thiếu collision/nav/LOS/camera/fairness. Đây là phần engine/balance chưa chạy, không gán thành lỗi live hoặc đóng bằng PASS_MODEL.

Codex chịu trách nhiệm chơi thử khi runtime fixture sẵn: theo USER LOCK trong AGENTS, Jev chọn từ action table quan sát được với reobserve/abstain; CUA thực thi. Không gọi mock là Jev playtest. Receipt phải ghi PASS_CLIENT/FAIL_CLIENT/NOT_RUN/INFRA/INCONCLUSIVE đúng nguồn và dọn phòng; không gửi secret hoặc toàn bộ log riêng sang dịch vụ.
