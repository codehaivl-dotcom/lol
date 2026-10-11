# 82 · Spec asset Boss Thuồng Luồng (Cổ Titan rank I–IV)

**Luồng E · chỉ tài liệu.** Gom từ [35](35-spec-boss-thuong-luong-co-linh-long.md), [36](36-todo-thuong-luong-3d.md), [37](37-skill-thuong-luong.md). Không thêm luật mới.

> ⚠️ **SỐ TẠM.** Mọi số gameplay (HP, sát thương, windup, CD, tầm) là bản tạm trong `scripts/lib/data/objectives.yml` (`provisional: true`), chờ **hội đồng cân bằng**; kết luận hội đồng ghi vào `balance-log.md`. Ghi chú gốc: memory/game/rules/boss-numbers-provisional.md (creator 2026-10-08: “đây là tạm thời. sau này sẽ lập hội đồng điều chỉnh lại”). Số asset (tam giác, texture, giây clip) là số **sản xuất**, không phải balance.

## 1. Hình và kích thước
| Mục | Giá trị | Nguồn |
|---|---|---|
| Vai trò | Hình dạng Cổ Titan rank I–IV (không phải quái farm trong pit) | 35 §1 |
| Hình | Rắn thần cuộn, vảy bazan rêu, mào đá vôi, mắt + vảy bụng phát sáng lục; bản hiện tại: pha lê lưng | 35 §5, 36 |
| Cao | 5,5 m, chân z = 0, căn giữa | 36 Lượt 2 |
| Dài thân (spec gốc) | ~14 m ở rank I | 35 §5 |
| Bounds engine (bản v1) | 7,9 × 6,18 × 7,9 m | 36 |
| Model hiện hành | `thuong-luong-v3` `/cdn/value.e0085bef…c7.glb` (đã khai báo registry) | 36, registry |
| Nguồn tái tạo | `art/thuong-luong/rigged.py` (build.py = lịch sử v1) | 36 |

## 2. Ngân sách
| Mục | Trần | Hiện tại | Trạng thái |
|---|---|---|---|
| Tam giác | ≤ 20 000 | 19 000 | PASS_MODEL (đo Blender) |
| Texture | WEBP 1024, giữ normal map | 4 × 1024 WEBP | PASS_MODEL |
| Dung lượng GLB | — (chưa có trần) | 2,38 MB (bản Lượt 2) | TBD: đề xuất trần 3 MB |
| Material | ít nhất có `glow` phát sáng | theo GLB | — |
| Collider | hitbox boss | **chưa có** | NOT_TESTED |

## 3. Rig (16 xương, bản hiện hành)
`root, coil, spine_1..spine_6, head, jaw, tail_L_1..3, tail_R_1..3`.
- Hàm: xương 68°, môi mở ~58,6°. Pha lê lưng 2 094 đỉnh khoá cứng 100% vào spine gần nhất; giãn cạnh ≤ 0,45%.
- Lệch spec gốc: 35 ghi “xương sống 12 đốt + hàm + đuôi”; bản v1 có 18 xương (spine_01..12). Bản hiện hành là thân **cuộn** nên 6 đốt + coil + 2 đuôi. Giữ bản hiện hành; ghi lệch này để không ai dựng lại theo 12 đốt.

## 4. Clip (30 fps, NLA) — 7 clip gốc + Roar
Brief và 35 nêu 7 clip; creator (36, 09:19) yêu cầu thêm **Roar** → bản hiện hành có 8.

| # | Clip | Dài | Loop | Mốc | Dùng cho (37) |
|---|---|---|---|---|---|
| 1 | Rise | 2,0 s | không | vùi đầu → ngẩng, há hàm 1,1 s | trồi lên (`riseSeconds 2`) |
| 2 | Idle | 3,0 s | có | rình mồi, hàm mở/khép | đứng |
| 3 | Slither | 1,2 s | có | cổ chữ S | đi lane |
| 4 | Attack | 1,6 s | không | cuộn lùi 0–0,5; **sập hàm 0,9 s** (chóp hàm 0,12 m) | Cắn vồ, 1,6 s/nhịp, tầm 3,4 m |
| 5 | Slam | 1,5 s | không | **chạm 0,87–0,9 s** (0,10 m) | Đập đất, tròn 6,12 m |
| 6 | Charge | 1,2 s | không | cúi 0–0,6; **lao 0,6–0,85 s** | Lao vồ 26 m, 16 m/s, rộng 3 m |
| 7 | Die | 2,5 s | không | rung 0,6–1,15; đầu chạm 2,0 s (0,17 m), nằm yên tới 2,5 s | gục, nổ pha lê |
| + | Roar | 2,0 s | không | há rộng nhất 0,8 s | trình diễn khi trồi/đổi mục tiêu, không sát thương |

Luật đồng bộ: giây chạm của clip **phải bằng** windup trong objectives.yml (Slam 0,9; Charge 0,6; Attack 0,9). Đổi số ở hội đồng → đổi tốc độ phát clip, không dựng lại clip.

Trạng thái: engine burst đủ 8 clip — PASS_ENGINE (36 Lượt 2, ghi của crew, preview editor-only). Còn: Die 1,90 s chóp hàm 0,38 m; miệng trong phẳng; **chưa xem ở camera trận 56°** với GLB v3 — NOT_TESTED.

## 5. VFX (cần làm, theo 37)
| Đòn | Telegraph | Lúc trúng |
|---|---|---|
| Cắn vồ | không vòng; đầu rút là tín hiệu | máu/ánh lục bắn + rung nhẹ mục tiêu |
| Slam | vòng mềm đỏ lớn dần 0,9 s, r 6,12 m | shockwave + bụi nước + screenShake người trong vòng |
| Charge | vệt mềm dài 26 × 3 m theo hướng | hất 2 m, tia nước dọc đường lao |
| Roar | — | sóng âm (shockwave nhẹ) |
| Rise | — | nước/đá vỡ quanh chân 2 s |
| Die | — | nổ pha lê lục ở 2,0 s |
Ngân sách theo skill fx (hạt/đèn); telegraph dùng màu cảnh báo game, không dùng lục pha lê.

## 6. SFX
| Tên | Trạng thái |
|---|---|
| sfx-wyrm-roar, -bite, -slam, -charge, -die | đã có, khai báo registry (source art/thuong-luong/build.py) |
| horn gọi Call | chưa có (35 §5) |
| Titan trồi (rise) | chưa có (35 §5) |
| Beam | chỉ Cổ Linh Long rank V+, ngoài phạm vi file này |
Chưa nghe thử trong trận — NOT_TESTED.

## 7. Done cho asset Thuồng Luồng
1. Burst 8 clip ở camera trận (camera.yml, pitch 56) cạnh tướng chuẩn: thấy hàm mở và mốc chạm — PASS_ENGINE.
2. Collider/hitbox khai báo theo số objectives.yml.
3. VFX §5 + 2 SFX còn thiếu, khai báo registry, `manifest.py check` = 0.
4. Số vẫn mang nhãn TẠM cho tới khi hội đồng chốt.
