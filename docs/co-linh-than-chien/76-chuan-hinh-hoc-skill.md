# 76 · Chuẩn hình học skill & hình ảnh đánh thường (BẮT BUỘC)

> Creator chốt 2026-10-10. Áp cho mọi tướng hiện có và mọi tướng mới. Không có ngoại lệ ngầm.
> Nguồn sự thật: mô tả gameplay (`strings.yml` desc) + kit (`heroes.yml`). VFX KHÔNG quyết định hitbox.

## A. Skill Geometry & Visual Consistency

Không được đoán hình VFX hay hitbox từ tên skill. Trước khi dựng skill, đọc mô tả chính thức và ghi đủ 8 mục:

1. Cast targeting: điểm / hướng / mục tiêu / đường thẳng / quạt / tròn …
2. Preview khi giữ nút.
3. Telegraph trước khi tác động.
4. VFX: hình thái + vật liệu.
5. Hit geometry server dùng để xét trúng.
6. Collision: có chặn di chuyển / đạn không.
7. Lifetime từng giai đoạn.
8. Damage/CC: thời điểm + vùng áp.

Các lớp cùng đại diện một vùng tác động phải đọc CÙNG dữ liệu hình học (`heroes.yml`: aim, range, width, radius, `mark`). Skill nhiều giai đoạn (đạn bay rồi nổ) khai báo từng giai đoạn riêng.

| Loại | Preview | VFX | Vùng tác động |
|---|---|---|---|
| Nổ diện rộng | Vòng tròn đúng bán kính | Sóng nổ lan ra | Hình tròn |
| Chém theo hướng | Hình quạt | Vệt chém | Hình quạt |
| Tia / skillshot | Dải thẳng đúng bề rộng | Chùm tia / đạn | Dải thẳng |
| Tường năng lượng | Dải tường + bóng tường | Màng sáng phát quang | Chữ nhật theo tường |
| Tường đá/băng | Dải tường + bóng tường | Mesh 3D tam giác, UV, texture PBR | Thể tích tường; collision nếu skill quy định |
| Khóa mục tiêu | Viền mục tiêu (không vẽ đất) | Hiệu ứng trên mục tiêu | Target ID |
| Đạn bay rồi nổ | Đường bay + vùng nổ | Projectile + explosion | Hai giai đoạn riêng |

Material:
- Tường năng lượng: ánh sáng, phát quang, trong suốt, hạt, SFX. KHÔNG mặc định collision.
- Tường vật lý: mesh tam giác có UV + texture/material thật (đá, băng, đất, kim loại). Collision khi mô tả yêu cầu chặn đường/đạn.
- Ba thứ khác nhau, khai riêng: hình nhìn thấy · hình gây tác động · vật cản.

Renderer: không lớp nào được tự thêm vòng tròn mặc định. Vòng tầm đánh quanh tướng chỉ vẽ khi skill cần chọn điểm/mục tiêu trong tầm (area tròn, target); skillshot và tường không vẽ.

Dữ liệu: `mark: { kind: circle|cone|line|wall|target|none, width, hold, look: energy|stone|ice|…, collide: false }` trong `heroes.yml`. Thiếu `mark` = suy từ aim (area→circle, skillshot→line, target→target).

## B. Basic Attack Visual Standard

Mỗi tướng có Attack Visual Profile riêng (`vfx-heroes.yml` basic), đọc từ vũ khí, cơ thể, animation, mô tả:
attack type · điểm tiếp xúc · animation + thời điểm trúng · trail · projectile (dạng, cỡ, tốc độ, gốc, impact) · SFX theo vật liệu · hit geometry (single / cleave / pierce / splash) · passive proc.

- Kiếm/đao: vệt ngắn bám đường lưỡi. Cấm bán nguyệt khổng lồ khi đánh 1 mục tiêu.
- Búa/chùy: va chạm nặng, bụi/mảnh nhỏ ở điểm trúng. Cấm sóng AoE tự thêm.
- Vuốt: vết cào nhanh theo hướng. Cấm vòng 180°.
- Pháp sư: tia nhỏ, phù văn, tinh thể, luồng năng lượng riêng. Cấm quả cầu chưởng lớn chung.
- Xạ thủ: đạn/tên/tia theo vũ khí.
- Sinh vật: cắn, húc, quất đuôi, phun theo cơ thể.
- Single-target → feedback tại mục tiêu. Cleave/pierce/splash → vẽ đúng vùng đó.
- Phân cấp nổi bật: đánh thường < skill thường < ultimate. Đánh thường không che telegraph.
- Không sửa damage/hitbox để hợp thức hóa VFX sai. Không thêm AoE cho khớp hiệu ứng cũ.
- Sửa renderer/template dùng chung một lần, rồi cấu hình profile theo tướng. Không vá rải rác.

## C. Nghiệm thu

- PASS_ENGINE chỉ khi quan sát cast thật + xác minh hitbox. Code không lỗi ≠ PASS.
- Skill: chụp preview khi giữ, telegraph + VFX khi cast thật; góc 0°/45°/90°; mục tiêu trong/ngoài mép; thời gian tồn tại; đối chiếu bằng debug overlay. Regression: tròn, quạt, thẳng, target, projectile.
- Đánh thường: đánh liên tục 10 s, một mình và giao tranh; đúng điểm/thời điểm trúng; không che nhân vật; không nhầm với Q/W/E/R; khác biệt giữa tướng; hiệu năng khi tốc đánh cao. Bàn giao BEFORE/AFTER.
- Hitbox đổi → chạy lại Balance Lab, đánh dấu số cũ "không còn tương đương".

## Cone AoE ≠ Fan projectiles (khóa 2026-10-10, creator #70376)

Hai hình preview gần giống nhau, cơ chế trúng đòn khác hoàn toàn. Dữ liệu skill PHẢI nói rõ loại nào:

| Loại | Khai báo trong heroes.yml | Vùng gây sát thương | Preview | VFX |
|---|---|---|---|---|
| Cone AoE | `aim: area`, `radius`, `arc: <độ>` | TOÀN BỘ hình quạt, tâm ở chân tướng, hướng theo hướng ngắm; phía sau không trúng | hình quạt (tex-skillmark `k=sector&a=`) | một vệt quét đúng `arc`° (vfx-slash `arc`), mark quạt khi đánh |
| Fan projectiles | `aim: skillshot`, `width` = bề rộng va chạm MỖI viên, `range`, `speed`, `fan: { count, spread, oncePerTarget }`, `pierce` | CHỈ đường bay của từng viên; khe giữa các viên không gây sát thương | `count` dải riêng, mỗi dải rộng `width`, đầu mũi tên ở cuối | `count` viên thật, mỗi viên bay trên dải của nó |

- Hình học dùng chung: `scripts/lib/kitmech.js` `inArc` (quạt) và `fanDirs/shotLanes/fanStruck` (đạn xoè). Người chơi (combat.js), bot (bot.js) và Balance Lab (tools/sim/engine.mjs) gọi cùng các hàm này. Preview (cues.js) và VFX (skillfx/compose) đọc cùng `arc`/`fan`/`width`.
- `spread` = góc giữa hai viên ngoài cùng. `oncePerTarget: true` = một mục tiêu trúng nhiều viên của cùng một lần cast chỉ chịu 1 lần.
- Nếu mô tả không ghi một số, giá trị là ĐỀ XUẤT và ghi rõ trong heroes.yml + doc 77; creator duyệt.
