# 50 · Yêu cầu đánh giá vòng 2: tách Sảnh · Tướng · Map

Trạng thái: **ĐÃ CHỐT HƯỚNG 2026-10-09** (xem §0). Bản gốc: **YÊU CẦU ĐÁNH GIÁ** (lukasai 2026-10-09: "bạn đưa yêu cầu đánh giá tách sảnh, Hero, map ra. tôi cho agent thảo luận lần 2"). Không phải quyết định, chưa triển khai. Mở lại phạm vi doc 48 v3 (D1 "chưa tách sanh") theo lời creator; doc 49 là nền kỹ thuật.

## 0. Chốt của creator (2026-10-09, lukasai)
Thứ tự: **Tướng → Sảnh → Map 5v5**. Chưa đặt mục tiêu MB từ số đo một lần.
- **Tướng (làm trước):** sảnh tải portrait + model tướng **đang xem**; trận tải các tướng **trong roster**. Đo lại (lặp, cùng build) để xác nhận giảm tải thật.
- **Sảnh (sau):** tách khỏi map để cửa vào nhẹ. Phương án A theo **contract doc 49 v2.4 / P-7**, không đọc state chéo place (xem §3 S đã sửa). Thống nhất trước khi giao agent.
- **Map:** giữ `main` = Mạch Giữa hiện tại, không đổi tên, không chuyển toàn bộ. Map 5v5 ba lane = place riêng khi tới lượt.
- **Gallery:** giữ tài nguyên; chỉ tải khi mở xem hoặc dùng công cụ dev.
- **Nghiệm thu gọn:** vào sảnh nhẹ hơn · preview đủ · vào trận đủ asset · quay về sảnh · reconnect đúng luật.

## 1. Vấn đề creator thấy
B1/B2 chỉ tách ruột code (boot 356 KB → 205 KB graph tĩnh). Người chơi vẫn vào **cùng một place `main`**: sảnh = sân khấu đặt trong map trận, gallery x0z1 và đài tướng đứng cạnh đường đánh. "Vẫn đang là lobby cũ."

## 2. Hiện trạng đo được (2026-10-09)
| Mục | Số | Nguồn |
|---|---|---|
| Graph code tĩnh boot | 204 695 B, 42 file | `tools/importgraph.py` |
| Đứng / hình đầu (desktop lukasai, v1237, 1 lần) | 1.3 MB / 1.3 MB; catch-up phòng 731 KB, world files 566 KB | telemetry engine |
| Đứng / hình đầu (máy builder, 1 lần) | 11.9 MB / **33.2 MB**; nặng nhất: 4 file .glb 2.1–3.0 MB. **Đính chính 2026-10-09:** không phải thân tướng: `bb3a85…` = melee-model, `42edab…` = caster-model (lính, lane.js, trận đang chạy), `09abfd…` = minh-uoc-06-monkey, `bd4121…` = minh-uoc-07-turtle (gallery x0z1) | telemetry engine |
| Cell `main` | x0z0.scene 112 KB, 149 model; x0z1 21 model (gallery); tổng 15 cell | `ls`, grep |
| `places/sanh` | đã có config + 1 cell (12.8 KB), **không** là cửa vào, không trọng tài | repo |
| Code trận | hero/match.js 60 KB, bot.js 27 KB, lane.js 26 KB (đã `import()`) | `wc -c` |
| Màn sảnh | screens/lobby/* ≈ 72 KB (heroes.js 20 KB, room.js 20 KB, shell.js 18 KB) | `wc -c` |

Số 1 lần, khác máy/cache → **không kết luận MB** (luật đo doc 48 §2 B3).

## 3. Đề xuất cần hội đồng đánh giá

### S · Tách Sảnh ra place riêng (`sanh` thành cửa vào)
- `defaultPlace: sanh`. Sảnh = Điện Vinh Danh + đài preview tướng, không terrain trận, không lane/tháp/gallery.
- Trọng tài: **phương án A theo contract doc 49 v2.4 (P-7)**: kho `place.state.lobby/match/results` + `places/main/sim.js` giữ nguyên, là writer duy nhất. Người ở sảnh → trọng tài: tự ghi `player.state.beat` / `lobbyReq` (như nay), trọng tài đọc qua dòng `ctx.world.players` (`row.state`, rẽ nhánh theo `row.place`). Trọng tài → người: thư ghi nguyên key cấp một lên dòng người (`row.state.lobbyAck = { seq, err }`); cái hai phía cùng đọc (phase, teams, pick, host, clocks, roster, results) nằm trên **một object bảng tin `audience: "all"`**, chỉ trọng tài ghi, chép từ place.state cùng tick. **Không** đọc `ctx.world.places.main.state` chéo place, **không** getObject chéo place. Chỉ giao agent sau khi P-7 tiêu chí 1–7 PASS trên place thử.
- Vào trận: `loading` → `ctx.enterPlace`/`cross()` mọi người trong roster sang place map; `results` → về `sanh`.
- Cần chứng minh trước khi làm: P-7 (sảnh → trọng tài → ack đúng một lần), reconnect 60 s khi người reload ở place map (về đúng place), restart giữa chuyển place.

### H · Tách Tướng thành gói tải theo nhu cầu
- Mỗi tướng = một gói: model thân, vũ khí, clip, sfx, skillfx của riêng tướng đó.
- Sảnh: chỉ nạp **portrait + thân của tướng đang xem** (preview), không nạp cả 6 thân trước hình đầu.
- Trận: chỉ nạp gói của tướng trong roster (tối đa 2 ở 1v1, 6 ở 3v3), từ `picking`.
- Câu hỏi: registry `heroes.js` tách bảng nhẹ (tên, vai trò, icon) khỏi bảng nặng (BODY/clip/skill)? Gói nằm ở `assets/registry.yml` với `scope: dynamic`?

### M · Map
- **Chốt:** `main` giữ nguyên làm Mạch Giữa, không đổi tên. Map 5v5 ba lane = place riêng khi tới lượt.
- Gallery x0z1: giữ asset, chỉ tải khi mở xem hoặc công cụ dev.
- `lobby.yml` mode → map ID → place ID một bảng duy nhất.
- Instance: Sân Tập / Đấu Máy `instance: solo`? PvP = một room cho cả roster (routing).

## 4. Hội đồng cần trả lời (mỗi câu: chọn, lý do, rủi ro, gate)
1. Thứ tự: S → H → M, hay H trước (rẻ nhất, không đụng trọng tài)?
2. Trọng tài: A (ở map) hay B (ở sảnh)? Ai giữ `ack` qua restart?
3. Reconnect 60 s qua hai place: người reload rơi vào `sanh` hay map? Luật PRAC-03/04 giữ nguyên thế nào?
4. Gói tướng: đơn vị tải là gì, đo bằng gì (`spawn perf --boot` hình đầu sảnh với 1 tướng vs 6)?
5. Gallery: place editor ngay vòng này (C2) hay giữ?
6. Gate nghiệm thu từng bước, và chỉ số mục tiêu: đứng ≤ 450 KB code, hình đầu sảnh (MB) — số nào?

## 5. Gợi ý của Savi (để hội đồng phản biện)
- ~~H trước: thắng lớn nhất ở hình đầu~~ **Đính chính:** thân tướng đã tải theo nhu cầu (sảnh: camera.js spawn 1 thân `audience: local` của tướng đang xem; trận: theo roster). Phần nặng thật = gallery (10 model ≈ 29 MB) + lính.
- **S với phương án A**: trọng tài ở lại map, sảnh chỉ là sân khấu + cửa vào; ít đổi luật nhất.
- **M** gắn với S: khi sảnh rời `main`, `main` chỉ còn là Mạch Giữa; đổi tên place là bước sau, không bắt buộc.
- Mọi bước: TODO trước, không đổi gameplay/HUD, baseline đo lặp ≥ 3 boot lạnh trước và sau.

## 6. Còn mở từ B2 (không chặn đánh giá)
Reconnect 60 s chưa chấm (reload < 15 s không kích hoạt hold); luồng kết quả → sảnh chưa chạy; HUD trận EN đã hiện sau reload (quan sát Codex, chưa đổi VI↔EN trong trận).

## 7. Đã làm 2026-10-09 (sau chốt)
- **Gallery theo yêu cầu:** 10 hàng `mu-*` rời `places/main/cells/x0z1.scene` sang `scripts/lib/data/gallery.yml`; mở/đóng bằng `scripts/lib/gallery.js` (`openGallery`/`closeGallery`, run_script persist:false). Asset giữ nguyên, khai báo registry không đổi. Bản trước: seq 1242.
- **Tướng:** đọc source xác nhận sảnh chỉ spawn 1 thân tướng đang xem (camera.js, local); 6 BODY không nằm trong cell nào. Còn phải đo lặp để xác nhận; gói clip/sfx/vũ khí theo roster: chưa rà.
- Số đo sau: **NOT RUN** (cần ≥ 3 boot lạnh cùng build).
- **Clip/SFX/vũ khí theo roster (rà source):** không có gì để tách. Dữ liệu `skill-clips.yml` 2.5 KB + `hero-sfx.yml` 3.9 KB + `weapons.yml` 1.9 KB (đủ 6 tướng, nhỏ). File clip .glb và .mp3 chỉ là địa chỉ, engine tải khi phát lần đầu; vũ khí là hình thủ tục (`gen/weapons.js`) chỉ dựng khi trang bị; engine 6.0.0 không có API preload. Rủi ro còn lại: lần đầu một skill phát trong trận có thể trễ do tải clip/âm (chưa đo).
- **Spike P-7 lần 1:** `reports/p7-spike-2026-10-09/P7-run1.md`. Không FAIL; nhánh A còn sống. Phát hiện: `getObject` object `audience: "all"` từ place khác **đọc được** (khác ghi chú doc 49).
- **Spike P-7 lượt 2:** `reports/p7-spike-2026-10-09/P7-run2.md`. Restart PASS (sim), đường UI thật sảnh → trọng tài → ack PASS (client Savi). Phòng thứ hai NOT RUN (client agent không vào được phòng riêng). Tách sảnh thật **chưa triển khai** tới khi phòng 2 đạt. Ghi thêm: một kho ack duy nhất khi người qua place.
