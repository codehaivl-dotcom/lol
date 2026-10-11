# 80 · Cửu Mạch — báo cáo cổng G1–G6 + manifest nháp

**Luồng B · tài liệu, không 3D, không đổi runtime.** Ngày 2026-10-11. Nguồn cổng: [27 §7](27-handoff-map-5v5-ba-duong.md). Hình học: [07](07-layout-ban-do-v1.md). 1v1: [15](15-todo-thu-tran-1v1.md).
Manifest nháp: [data/cuu-mach-manifest.yml](data/cuu-mach-manifest.yml) (chỉ số doc 07; thiếu = `TBD`).

Nhãn kết quả: PASS_MODEL (kiểm bằng script/mô hình) · PASS_ENGINE (thấy trong engine) · NOT_TESTED.

## 0. Tóm tắt một bảng

| Gate | Trạng thái | Câu creator cần trả lời (đề xuất in đậm) |
|---|---|---|
| G1 · 1v1 closeout | MỞ: T1–T6 NOT RUN | Đóng 1v1 bằng **A: một buổi chơi 1v1 có log T1–T6** / B: creator chơi rồi nói “passed” |
| G2 · Geometry | MỞ: doc 07 là V1 SPEC, chưa ký | Ký doc 07 làm geometry candidate: **CÓ (ký nguyên trạng, TBD điền sau trong greybox)** / KHÔNG (sửa 07 trước) |
| G3 · Schema/place | GẦN XONG: place-per-map đã có khung | **A: place riêng `cuu_mach`** / B: cùng place `main`, map-aware |
| G4 · Camera | ĐÃ CHỐT (27 §7) | — (chỉ đồng bộ một con số, xem §G4) |
| G5 · Minimap/hướng | MỞ | Đội Đỏ xem minimap: **A: xoay 180° theo camera đội** / B: một hướng chung |
| G6 · Art shell/perf | MỞ | Art shell **không va chạm** như doc 07 §8: **CÓ** / KHÔNG |

Kết luận: sau khi creator trả lời 5 câu trên, chỉ còn G1 (chạy thử) chặn greybox Cửu Mạch.

---

## G1 · 1v1 closeout

**Đã chốt**
- Danh sách test T1–T6 cố định ở [15 §Test](15-todo-thu-tran-1v1.md) (bot ra suối Đỏ; farm; đánh trả; rút/hồi sinh 12 s +300 vàng; không đứng dưới trụ; hết trận về sảnh).
- Map 1v1 Mạch Giữa chạy trong `places/main` với `scripts/lib/data/map.yml` (greybox 50%, “NOT balance-accepted”).

**Còn thiếu**
- 15 dòng 23: “T1–T6 client NOT RUN”. Không có record PASS_ENGINE nào trong `reports/` cho T1–T6.

**Câu hỏi** · A/B: **A (đề xuất)** = một wisp chơi 1v1 bằng thân của mình (`spawn client join`), ghi log từng T vào doc 15 dưới nhãn PASS_ENGINE; creator chỉ duyệt bảng. B = creator tự chơi và nói “passed”.
Lý do chọn A: có evidence lặp lại được, creator mất 1 phút thay vì 10.

**Done khi** 6 dòng T1–T6 trong doc 15 có nhãn PASS_ENGINE + đường dẫn log/ảnh, và creator xác nhận một câu.

## G2 · Geometry `cuu_mach`

**Đã chốt (doc 07, V1 SPEC)**
- Bounds: ground ±192, config 182, clamp hero ±180 (07 §1).
- Sông 420×32 m, yaw 45°, đáy −3,2; cầu tâm 34×78 m (07 §1).
- 2 fountain r13, 2 Tâm Mạch, 6 gate (07 §2); 12 trụ (07 §3); 2 Trial Pit r24, vòng 18 m (07 §4); 12 camp, aggro 8,5 (07 §5); 24 bụi (07 §6); 3 lane waypoint (07 §7), rộng 18/14/14 m.
- Kiểm đối xứng tâm trên manifest nháp: 12/12 trụ, 12/12 camp, lane Thượng↔Hạ, lane Giữa tự đối xứng, 0 giá trị thiếu `source`. **PASS_MODEL** (script python, 2026-10-11).
- Độ dài lane (tính từ waypoint): Thượng/Hạ 480,3 m, Giữa 326,4 m. Với moveSpeed 6,1 m/s (heroes.yml), đi bộ gate→gate ≈ 79 s / 54 s. Mạch Giữa 1v1 dài 143,7 m (gấp 2,3–3,3 lần). PASS_MODEL.

**Còn thiếu (đều `TBD` trong manifest)**
- Điểm spawn tách khỏi fountain; extent minimap; mực nước sông.
- Lối qua sông ở lane biên (07 chỉ có một cầu ở tâm, trong khi lane Thượng/Hạ cắt đường chéo sông ở (−144…−108,−108…−144) và đối xứng).
- Lane nào gắn với pit nào khi Titan đi (07 §9 nói “lane đã gắn với Call” nhưng không ghi).
- Vị trí Titan trồi lên ở Cửu Mạch (doc 35 §3 chỉ có cho Mạch Giữa).
- Nav polygon; thời gian hồi camp.
- Số trụ/Tâm Mạch là `[THAM KHẢO]`, chốt bằng mô phỏng nhịp trận 20–35 phút, không phải ở gate này.

- **Q6=A, Q7=A: creator OK 11-10 (#'ok làm đi'), chờ kiểm greybox (traverseCheck) — chưa ký G2.** Q6-A: lane biên lội cạn qua đáy sông ở Bến Biên, rộng 14 m; Q7-A: Hõm Long → Mạch Hạ, Hõm Quy → Mạch Thượng (doc 86 §3, §8; rủi ro ở doc 86 "Audit Savi 11-10").

**Câu hỏi** · Có/Không: ký doc 07 làm geometry candidate chính thức, **nguyên trạng**, các ô TBD trên được điền trong greybox và đưa lại creator một lần? **Đề xuất: CÓ.** Sửa 07 trước khi đứng trong engine là đoán trên giấy; greybox mới cho thấy cầu biên, đường đi bộ dài 80 s có quá chậm không.

**Done khi** manifest `status: SIGNED`, mọi `TBD` có giá trị + nguồn (doc 07 bản sửa hoặc ghi chú greybox), script đối xứng vẫn PASS_MODEL, creator ký một dòng ở doc 10.

## G3 · Schema đa map / place

**Đã chốt (code, đọc file)**
- Sảnh đã tách place: `scripts/lib/data/lobby.yml` `split: true`, `lobbyPlace: sanh`, `mapPlace: { mach_giua: main }`, `lockedMaps: [cuu_mach]`.
- `scripts/data/registry.js` `mapPlaceOf(mapId)`; `scripts/lib/map.js` có `MAPS = { mach_giua }` và `mapOf(ctx)` chọn theo `place.state.mapId`, ghi chú “khi map thành place riêng, mapOf chọn theo ctx.place”.
- Sảnh vẽ thẻ `cuu_mach` khoá (`scripts/screens/room/model-desktop.js`).

**Còn thiếu**
- Chưa có `places/cuu_mach`, chưa có `scripts/lib/data/map-cuu-mach.yml`, `MAPS` chưa có khoá `cuu_mach`.
- Consumer chỉ biết một map: lane.js (waypoint 1 lane), spawnspot.js, minimap HUD, bot (một đường) cần đọc `mapOf(ctx)` thay vì `MAP`. Cần đếm chính xác bằng grep khi mở việc.

**Câu hỏi** · A/B: **A (đề xuất) = place riêng `cuu_mach`**, thêm `mapPlace.cuu_mach: cuu_mach`. B = cùng `main`, map-aware.
Lý do A: khung đã có sẵn (split + mapPlace), Mạch Giữa không bị đụng, scene 5v5 (12 trụ, 12 camp, 24 bụi) không tải khi chơi 1v1, đúng tinh thần stream theo place.

**Done khi** `mapPlaceOf('cuu_mach')` trả place, `mapOf(ctx)` trả geometry Cửu Mạch trong place đó, Mạch Giữa không đổi hành vi (T1–T6 vẫn PASS_ENGINE), `lockedMaps` còn khoá tới khi G1–G6 xong.

## G4 · Camera — ĐÃ CHỐT

- 27 §7: camera khoá AOV/LoL (#7781), số ở `scripts/lib/data/camera.yml`.
- **Lệch cần đồng bộ (không phải câu hỏi):** 27 §7 ghi “distance 17 m”; `camera.yml` hiện là `distance: 11`, zoom 8–26, mobile 9,5, pitch 56, fov 42 (creator 2026-10-08 “tướng quá nhỏ”). File yml là nguồn; doc 27 cần sửa con số khi chạm lần tới. Kiểm readability Cửu Mạch ở 11 m mặc định và 26 m xa nhất.
- Done: đã xong; chỉ còn sửa con số trong doc 27.

## G5 · Minimap, map-click, hướng

**Đã chốt**
- 07 §1: tọa độ mét thật, trục X/Z, không xoay map cho đẹp minimap; 07 §9 “north/south không suy từ hướng màn hình”.
- `camera.yml` `yaw: { blue: 0, red: 180 }`: đội Đỏ xoay camera 180° để căn cứ mình ở dưới trái.
- Mạch Giữa: `map.yml extent: 88` cho minimap/map-click.

**Còn thiếu**
- Extent Cửu Mạch (đề xuất từ số đã có: 182 = config half-extent, 07 §1 — chờ ký, ghi TBD trong manifest).
- Quy tắc đội Đỏ: minimap có xoay theo camera đội không. Nếu camera xoay mà minimap không xoay, click minimap “trên” sẽ khác hướng “trên” màn hình.

**Câu hỏi** · A/B: **A (đề xuất)** = minimap xoay cùng yaw đội (Đỏ cũng thấy căn cứ mình dưới trái, giống camera và giống LoL/AOV); world→minimap là một phép quay 180° quanh (0,0), dữ liệu không đổi. B = một hướng chung cho cả hai đội.

**Done khi** marker trụ/camp/tướng trên minimap trùng vị trí world ở cả hai đội (ảnh PASS_ENGINE mỗi đội), click minimap đi đúng điểm world (sai ≤ 2 m), extent ghi trong map-cuu-mach.yml.

## G6 · Art shell, va chạm, hiệu năng

**Đã chốt**
- 07 §8: 4 lớp `gameplay_ground` / `gameplay_points` / `art_shell` (không va chạm, không đổi LOS/đạn/camera) / `art_fx` (không dùng màu/hình cảnh báo combat). 07 §9: thay art không đổi transform, bán kính, waypoint, nav.
- Ngân sách chung: 60 fps điện thoại; doc 57 Lô E: trận ≤ 500 KB tải, sảnh ≤ 450 KB. Baseline: `reports/perf-baseline-2026-10-09/`.

**Còn thiếu**
- Landmark/motif Cửu Mạch chưa có bảng duyệt (tên camp VI ở 07 §5 là “proposal”).
- Ngân sách riêng map 5v5: tam giác cảnh, số đèn, scatter ở ±182 m.

**Câu hỏi** · Có/Không: giữ luật 07 §8 — **toàn bộ art shell không va chạm**, mọi vật cản gameplay mới là một lần sửa map riêng? **Đề xuất: CÓ** (đã chạy tốt trên Mạch Giữa: tường thấp/cột/đá là art, không va chạm).
Ngân sách số đề xuất kèm (không phải câu hỏi, Savi chốt khi greybox đo): tải scene map ≤ 500 KB như trận hiện tại, ≤ 8 đèn động thấy cùng lúc, 60 fps trên preset phone ở camera 11 m.

**Done khi** bảng landmark từng vùng creator duyệt; đo perf trong engine (PASS_ENGINE) ở 3 vị trí: tâm cầu, pit, căn cứ; giữ trong ngân sách.

---

## Thứ tự sau khi có 5 câu trả lời
1. G1 chạy (A) → 2. ký G2 → 3. tạo place + `map-cuu-mach.yml` từ manifest (G3) → 4. greybox không art, điền TBD → 5. minimap (G5) → 6. art shell theo bảng landmark (G6).
Cho tới lúc đó: `cuu_mach` khoá trong sảnh, không tọa độ nào ngoài doc 07, không 3D.

## Kiểm đã làm
- Manifest: đối xứng tâm trụ/camp/lane/pit + mọi giá trị có `source` — PASS_MODEL.
- Mọi đối chiếu file trên là đọc tài liệu/code — NOT_TESTED trong engine.
