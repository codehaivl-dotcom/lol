# Workflow VFX skill — Cổ Linh Thần Chiến

Áp dụng cho mọi tướng mới và mọi lần sửa effect. Chốt từ phản hồi của @lukasai (2026-10-07):
"vẫn hơi đặc", "cứng, quá nắn nót, quá vuông, quá tam giác", "skill đã đẹp rồi. Chỉ còn phần định vị mục tiêu vẫn hình học".

> **Bắt buộc trước mọi bước:** [76-chuan-hinh-hoc-skill.md](76-chuan-hinh-hoc-skill.md): 8 mục hình học, preview = telegraph = VFX = hitbox, profile đánh thường riêng.

## 0. Nguyên tắc
1. **Trong suốt như effect thật**: ánh sáng skill nhìn xuyên được nền. Không khối màu đặc.
2. **Không hình học**: không ring/circle/box/cone primitive cho bất kỳ dấu nào trên đất. Không sprite tam giác (shard).
3. **Một núm cho cả game**: độ đậm chỉnh ở `GLASS` (scripts/lib/skillfx.js), không chỉnh tay từng tướng.
4. **Hạt rắn giữ thân**: chip, giọt máu, lá, cánh hoa alpha không bị làm mờ.
5. **Gameplay không đổi**: VFX không chạm range/radius/damage. Dấu đất vẽ đúng kích thước thật của skill.
6. **Nguồn mechanics là kit Cổ Linh mới**: chỉ dùng `scripts/lib/data/heroes.yml` đã được gameplay owner duyệt và mô phỏng cùng doc 03 cho body/weapon/art. Data game cũ chỉ tham khảo; không nhập số, điều kiện, event hay behavior của game khác vào kit mới. Bộ `GLASS` đã duyệt là chuẩn độ trong suốt chung, không có nghĩa effect theo hero đã được duyệt.

## 0.0 Ultimate (R): doc 79
R có đủ layer mở · duy trì · impact · kết, cấu trúc đặc trưng (vật lý = mesh + chất liệu; năng lượng = ánh sáng), SFX 4 lớp đúng vật liệu, hierarchy Basic < Q/W/E < R mà không phủ màn hình; mười kiểm thử doc 79 §3 trước khi báo.

## 0.1 Hợp đồng theo từng slot — trước khi vẽ effect

Mỗi passive áp dụng và mỗi slot LMB/Q/RMB/E/R phải có một row theo doc 23 A–J và doc 25, gắn đúng hero ID, kit/data revision, exact kit field path, trigger/event do gameplay/runtime owner xác nhận, origin/socket, shape theo geometry đã duyệt, material/palette, phe/đối tượng nhìn thấy, telegraph/counterplay rule, lifetime/cleanup và asset ref/status.

- Chỉ mô tả pha có trong kit/runtime đã duyệt. Cast, release, flight, hit/resolve, loop, recast, cancel và expiry không tự xuất hiện chỉ vì VFX cần một nhịp đẹp. Nếu source không có event hoặc lifecycle, ghi `BLOCKED`; không tự đặt event ID, thời gian, target, team visibility hay cancel rule.
- AI/bot targeting metadata không phải player-facing tell. Telegraph chỉ được production khi kit Cổ Linh mới hoặc gameplay owner ghi rõ hình thức, phe nhìn thấy, thời gian báo trước và điều kiện tắt.
- Ghi trạng thái asset theo doc 09 (`concept`, `in_production`, `approved`, `blocked`); runtime integration/verification theo gate của doc 25. `approved` cần sign-off chuyên môn, còn PASS runtime cần asset resolve trong combat build và capture/review. Không đổi hitbox, timing, range, damage, HUD hoặc camera để vừa VFX.
- Asset ID, CDN name và event ID phải theo schema/provenance hiện hành của doc 09; nếu chưa có asset thật, không giả ref hoàn chỉnh. VO/SFX và subtitle nằm trong cùng per-slot handoff ở doc 23 §1 J, nhưng không sinh file audio trong workflow này.

## 1. Ba lớp của một skill
| Lớp | Ở đâu | Quy tắc |
|---|---|---|
| Dấu chính (đọc gameplay) | `drawShape` trong skillfx.js | plane + `scripts/tex-skillmark.js?k=ring\|disc\|strip`, xoay yaw ngẫu nhiên, sống < 0.5 s |
| Hạt (cảm giác) | `KIT[hero][slot][cast\|fly\|land\|hit]` | viết fx thường; `glass()` tự làm mỏng khi phát |
| Act (slash, shockwave, shake) | cùng KIT | slash tự nhận noise forward + alpha thấp; shockwave × GLASS.wave |

## 2. Dấu trên đất — `scripts/tex-skillmark.js`
Một texture script, alpha là hình, màu do material tint. Viền lệch nhẹ + đứt mờ bằng noise.
- `k=ring` vòng vùng tác dụng / mục tiêu · `k=thin` vòng tầm (range) · `k=disc` nền mờ bên trong
- `k=strip` vệt skillshot, mờ hai đầu · `k=arrow` đầu mũi ngắm dạng nét cọ
- **Kích thước**: viền nằm ở 0.86 nửa cạnh ⇒ plane rộng `r / 0.86 * 2`. Strip: rộng `width / 0.62`.
- **Material**: `{ texture, color, emissive, emissiveIntensity ≤ 0.9, transparent: true, opacity ≤ 0.9, depthWrite: false }`, `rotation: { yaw, pitch: -90 }`.
- Mỗi `k` chỉ một bake (không thêm seed): bake lần đầu mới hiện; canvas 128 px để bake < 50 ms.

Ai dùng: skillfx.js `drawShape` (dấu cast/land/fly), hero.js `drawAim` (vòng tầm, vệt, mũi, vùng) + `markRing` (mục tiêu/đi tới), combat.js `drawTelegraph` (cảnh báo vùng địch).

## 3. Hạt — viết thế nào để không "đặc"
- Hạt phát sáng: `r=sprite(soft-disc|mote|ember|flame-wisp,add)`. Không dùng `shard` (glass tự đổi: add→ember, alpha→chip).
- Kích thước lệch: luôn `size=a..b`, `rot=spin(..)`; đừng một hạt `point()` to đặc giữa tâm.
- Fade luôn có đầu và đuôi: `a=0>.1:1>.6:.6>0`, không `a=1` cố định.
- Đừng tự hạ alpha trong KIT: viết ở mức "đẹp nhất khi đứng riêng", glass lo phần còn lại.

## 4. `GLASS` (giá trị đã duyệt 2026-10-07)
```
add .24  soft .34  hdr .36  count .5  rate .5  wave .4  light .7  ground .6
```
add = alpha hạt phát sáng · soft = alpha khói/soft-disc · hdr = độ sáng màu · count/rate = số hạt burst/rate/.lives ·
wave = shockwave · light = đèn skill · ground = dấu đất. Creator nói "đậm" → giảm add/hdr 15–20%; "mờ quá" → tăng.

## 5. Kiểm trước khi báo
1. TODO trước (docs/…-todo-*.md), làm, rồi audit ghi vào cuối file.
2. `node` chạy texture script với ctx giả: không lỗi, < 50 ms.
3. `look target:object` từng dấu đất (plane + texture) — thấy mềm, không cạnh thẳng.
4. Emit skill trong dev room (`skillFx` với `persist:false`) và chụp scene ngay sau đó.
5. Ghi rõ đã kiểm ở đâu: helper / trận thật / màn hình creator. Creator nghiệm thu cuối.
