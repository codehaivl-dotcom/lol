# 28 · Workflow: animation skill cho tướng (chuẩn, không làm mò)

> **CURRENT ROUTING (2026-10-12):** [105 · Hero Factory](105-hero-factory-multi-agent-workflow.md) controls sequencing, multi-agent ownership and sign-off. This file is the **animation specialist checklist only**. Old 21-hero gating and LMB/RMB input references are historical; follow [91 QWER/D](91-khoa-input-qwer-d.md), [79 R standard](79-chuan-ultimate.md) and Owner Gate 4 before costly final production.

Chuẩn của creator: mỗi skill một động tác riêng, hợp với tướng + class (đâm lao, nhảy chém, phi thân, giật lùi khi bắn cung…).
Toàn thân phải chuyển động: gối khuỵu, lưng gập/xoắn, hông lên xuống, tay theo vũ khí. **Đẩy cả người từ A→B không phải animation.**

## Công cụ (art/anim/)
| file | việc |
|---|---|
| `rig.py` | bộ IK trên rig thật của tướng: chân (gối, bàn chân), cột sống, hông, tay theo vị trí; ngón tay KHÔNG key (giữ grip) |
| `moves.py` | dữ liệu: `STANCE` (thế đứng từng tướng), `MOVES` (keyframe từng skill), `HIT` (giây đòn chạm) |
| `build_hero.py` | bake 5 clip của 1 tướng + ảnh proof `/workspace/anim/<hero>_sheet.png` + `.glb` |
| `audit.py` | kiểm tra: đủ 5 slot, không trùng dáng, đòn chạm khớp lúc skill ra đòn; `--write` ghi `skill-clips.yml` |
Model tướng tự tải từ bảng `BODY` trong `scripts/lib/lobby-stage.js`.

## Ultimate (R): chuẩn riêng, doc 79
Clip R riêng, mỗi nhịp một chuyển động, pose tối thượng, không đứng yên rồi bật VFX; viết template doc 79 §4 trước khi key. Proof sheet phải thấy mọi key (build_hero.py vẽ tới 8).

## Quy trình (theo thứ tự, mỗi bước có kiểm)
1. **TODO trước.** Ghi tướng/slot nào, vì sao.
2. **Chốt nguồn trước khi pose**: đọc ID/body/weapon trong doc 03, kit Cổ Linh mới đã được duyệt trong `scripts/lib/data/heroes.yml` và tên VI–EN trong `strings.yml`. Legacy/old-game data chỉ để tham khảo; tuyệt đối không chép mechanic, số, timing hoặc animation behavior làm kit đích. Nếu kit/revision chưa được duyệt hoặc simulator gate doc 23 chưa qua, chỉ làm concept sheet, không bake final clip.
3. **Đọc đúng mechanics**. Động tác phải kể đúng kit mới: dash → cả thân lao theo; area → action theo aim/resolve đã ghi; skillshot cung → giương, buông, giật lùi chỉ khi kit/runtime xác nhận hướng và pha; self → thủ/kết giới theo trạng thái thật. Tên chiêu không phải nguồn mechanics.
4. **Viết keyframe** trong `moves.py`: chuẩn bị → action → resolve/hold → hồi về chỉ khi kit cần; ghi `HIT` theo timing contract đã duyệt. Nếu kit/runtime không khai báo thời điểm va chạm hoặc event tương ứng, ghi `BLOCKED`, không tự đặt HIT để clip trông hợp mắt.
5. **Bake**: `blender -b --factory-startup --python art/anim/build_hero.py -- <hero> [slot,slot]`
6. **Xem proof sheet** (`spawn see`): gối có gập, lưng có cong, vũ khí còn trong tay, chân không xuyên đất, không trùng dáng skill khác. Sai → sửa `moves.py`, bake lại.
7. **Import**: `spawn clip import /workspace/anim/<hero>_<slot>.glb --name "<hero> <slot> body vN"` (đổi N mỗi lần sửa: tên cũ giữ âm thanh/clip cũ mãi).
   Dán địa chỉ mới vào `scripts/lib/data/skill-clips.yml`.
8. **Audit**: `python3 art/anim/audit.py --write` → phải ra `0 issue(s)`.
9. **Xem trong engine** trên thân tướng thật (object thử dùng `skillAnim`), burst look; dọn object/script thử sau đó.
10. **Ghi doc 25** cái đã kiểm và chưa kiểm. Creator nghiệm thu cuối cùng.

Nếu clip cần cue gameplay (release, impact, cancel, recast), chỉ nối vào event/phase đã tồn tại trong kit/runtime; tên clip, `delay`, AI targeting metadata hoặc VFX prototype không tự tạo event. Ghi kit revision, field/event ref, rig/clip asset receipt, camera/build, slot, capture ở doc 25. Thiếu source, owner approval, socket/notify, player-visible telegraph rule hoặc cleanup contract thì giữ `BLOCKED` và không tích hợp như production.

## Luật chơi trong code (scripts/lib/skillfx.js → skillAnim)
- Clip toàn thân, `blend: override`; lớp Hips cũ (`skillMotion`) tắt khi có clip.
- **Lobby**: chạy trọn clip, 0.8x cho dễ xem.
- **Trận**: lúc ra đòn = windup + delay + 60% thời gian dash. Tốc độ clip 0.8–1.6x để `HIT` trùng lúc đó; còn trễ thì cắt bớt phần lấy đà, tối đa 40%. `audit.py` tính cùng công thức.
- Sửa windup/delay trong `heroes.yml` (balance) → chạy lại `audit.py`.

## 21 tướng candidate chưa bật
Chỉ bắt đầu khi creator mở scope riêng và kit Cổ Linh của hero đã được owner duyệt/mô phỏng theo doc 23. Dùng body plan, weapon/grip và tỷ lệ đã duyệt trong doc 03; thêm `BODY` → `STANCE` + 5 `MOVES` + `HIT` chỉ khi timing contract có thật → quy trình bake/audit/review ở trên. Chuẩn bị clip/preview **không** bật hero: không thêm ID vào `heroes.yml → slice` hoặc `lobby.yml → heroes`; chỉ creator duyệt riêng mới mở activation gate.
