# 91 · INPUT CONTROL LOCK — Q/W/E/R + D Dash

**[USER LOCK — 2026-10-11]** Creator xác nhận: **bốn kỹ năng của mỗi tướng = Q, W, E, R; R = Ultimate; D = Dash chung. Không có skill LMB/RMB.** Đây là quyết định điều khiển thay thế cho mọi ví dụ cũ còn dùng `LMB/Q/RMB/E/R`, `V/Space` hoặc `double-tap` làm phím bắt buộc trong các tài liệu trước ngày này.

## 1. Hợp đồng điều khiển để sản xuất

| Action ID | Input | Bản chất | Có dữ liệu theo tướng? |
|---|---|---|---|
| `basic_attack` | **chưa khóa phím chuột cụ thể ở tài liệu này** | đánh thường; phải có profile riêng, không phải Q/W/E/R | animation, attack range, damage, projectile, attack cooldown |
| `skill_q` | **Q** | kỹ năng 1 | có |
| `skill_w` | **W** | kỹ năng 2 | có |
| `skill_e` | **E** | kỹ năng 3 | có |
| `skill_r` | **R** | chiêu cuối / Ultimate | có |
| `universal_dash` | **D** | né/lướt chung | **không** dùng như slot hero kit; tài nguyên/timing chung từ combat system |

Không diễn giải câu “không phải chuột trái phải” thành việc cấm chuột dùng để chọn mục tiêu, đánh thường hoặc tương tác UI. **Chỉ cấm chiêu kích hoạt bằng nút skill LMB/RMB.** Input chính xác của `basic_attack` (click, auto hoặc cả hai) chưa được creator khóa trong câu quyết định này; phải giữ rõ trạng thái chờ xác nhận ở controller mapping thay vì tự bịa.

D là hành động né chung. E vẫn có thể là dash **riêng của một hero** nếu gameplay fantasy yêu cầu; E và D phải có resource/CD và điều kiện va chạm riêng, không nhập làm một.

## 2. Migration compatibility

Với kit tài liệu cũ:
- `passive` → `passive`.
- `lmb` → `basic_attack` **chỉ khi nó thực sự mô tả đánh thường**; nếu tác giả nhồi thêm mechanic vào skill cũ thì đưa sang `passive` hoặc thiết kế lại, không âm thầm tự chuyển.
- `q` → `q`.
- `rmb` → `w` (đổi key, giữ gameplay và geometry khi chưa có quyết định khác).
- `e` → `e`.
- `r` → `r`.
- `d` / dodge cũ → `universal_dash`, **không** đưa vào bộ tướng.

Đây là quy tắc migration của docs/thiết kế, **không khẳng định runtime Spawn đã áp dụng**. Trước khi port, kiểm event handling, server input, bot, UI key hints, tutorial, input rebinding, network/reconnect, VO/SFX và cancel window.

## 3. Skill schema / cấp bậc

- Bốn chiêu Q/W/E/R thuộc mỗi tướng; mỗi chiêu có hình học, range, cost, cooldown, animation, preview, SFX/VFX, timing và AI.
- `passive` và `basic_attack` là hồ sơ tách biệt.
- Q/W/E có 5 rank ở các mốc cấp 1/3/5/7/9; R có 3 rank ở 6/11/15; level tối đa 15. Giữ hệ tự tăng rank hiện có, không tự đổi vì remap key.
- `D` = dash toàn roster; thống số hiện có (cost stamina, i-frame, CD) **không tự đổi** khi đổi phím.
- Tất cả preview/telegraph/VFX/server geometry tuân doc 76. R tuân doc 79.

## 4. QA và source of truth

Kiểm trên client 1v1 và 5v5:
1. Q/W/E/R mỗi nút kích hoạt đúng slot; giữ phím cho preview đúng skill.
2. D dash luôn cùng một hệ hành động; dash không tự cast E.
3. LMB/RMB không cast skill nào; input đánh thường nếu dùng click phải được định nghĩa riêng.
4. Hotbar đúng Q/W/E/R/D, cooldown đúng, phím tutorial đúng, bot dùng action IDs chứ không gán nhầm chuột.
5. Dodge i-frame/stamina không bị duplication khi một hero có E dash.
6. Reconnect, rebinding, camera xoay phe Đỏ và spectate không đổi key action.
7. Combat Lab mapping dùng `basic_attack`, `q`, `w`, `e`, `r`; không còn `rmb` được coi là hero skill.

**Trạng thái:** input **DESIGN_LOCKED**, runtime/controller integration **NOT_TESTED**. Nếu repo docs và repo runtime khác nhau, chỉ sửa code trên repo runtime có quyền/nguồn; không báo PASS_ENGINE từ file markdown.

## 5. Contract cho roster 24

Mỗi hồ sơ tướng mới có: `hero_id, stats, growth, resource, passive, basic_attack, q, w, e, r, visual, rig, animation, vfx, sfx, lore, counterplay, bot, qa`.

Không có field skill `lmb` hoặc `rmb` trong hồ sơ roster mới. R không gán sang `w`, D không phải skill thứ năm để thiết kế theo tướng.