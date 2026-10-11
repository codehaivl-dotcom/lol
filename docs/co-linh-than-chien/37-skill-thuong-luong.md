# 37 · Skill Thuồng Luồng (TẠM, chờ hội đồng)

> ⚠️ Số lấy từ `scripts/lib/data/objectives.yml` (`provisional: true`). Hội đồng cân bằng sẽ chỉnh. File này chỉ nối **số đã có** với **clip** và **cảm giác đòn**. Không thêm luật mới ngoài 35.

Creator (2026-10-08): “Rig Animation làm cho nó dữ tợn, tấn công cận chiến. skill....” Thuồng Luồng là quái cận chiến, đánh bằng hàm và đuôi.

## Bộ đòn
| Đòn | Clip | Số (objectives.yml) | Giây chạm | Telegraph (workflow 30) | Cảm giác khi trúng |
|---|---|---|---|---|---|
| Cắn vồ (đòn thường) | Attack 1,6 s | fist: 1,6 s/nhịp, tầm 3,4 m | 0,9 s | không vòng; đầu rút về là tín hiệu | máu bắn + thud, rung nhẹ người bị cắn |
| Đập đất | Slam 1,5 s | slam: windup 0,9, CD 6, tròn 6,12 m, chậm 30% 1 s | 0,9 s | vòng mềm đỏ lớn dần 0,9 s | shockwave, bụi nước, rung camera cho người trong vòng |
| Lao vồ | Charge 1,2 s | charge: windup 0,6, CD 10, 26 m, 16 m/s, rộng 3 m, hất 2 m | 0,6 → 0,85 s | vệt mềm dài theo hướng lao | hất văng, tia nước dọc đường lao |
| Gầm | Roar 2,0 s | không sát thương (chỉ trình diễn: lúc trồi lên và lúc đổi mục tiêu) | 0,8 s | — | sóng âm, rung nhẹ cho người gần |
| Trồi / Gục | Rise 2,0 s / Die 2,5 s | riseSeconds 2 | — | — | Die: chạm đất 1,9 s, nổ pha lê |

## Chọn đòn (AI khi không có người lái)
Ưu tiên: Charge nếu mục tiêu 8–26 m và hết CD → Slam nếu ≥ 2 kẻ địch trong 6,12 m và hết CD → Cắn vồ. Sau Charge nghỉ 0,4 s. Người lái (08 §6) bấm LMB = Cắn, Q = Slam, E = Charge.

## SFX (sẽ sinh)
`cdn/moodboard-painterly-fantasy/sfx-wyrm-{roar,bite,slam,charge,die}.mp3`.

## Chưa làm / BLOCKED
- Code The Call + Titan (referee + lane) chưa có; skill chỉ chạy được khi Titan tồn tại. Chờ rig qua kiểm, rồi làm theo thứ tự: Titan thân + AI → skill → HUD → SFX → bot.
- Mọi số TẠM; Beam chỉ thuộc Cổ Linh Long (rank V+).
