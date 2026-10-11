# Spec boss: Thuồng Luồng và Cổ Linh Long (TẠM, chờ tune)

> ⚠️ **TẠM THỜI.** Toàn bộ số và luật mới trong file này là bản tạm. Sau này **hội đồng cân bằng** sẽ duyệt và chỉnh lại; trước khi hội đồng chốt, không coi là [V1 SPEC].

**Trạng thái:** bản nháp do Savi viết theo lệnh creator ngày 2026-10-08: “bạn tự viết và lên thông số tạm, đưa nó vào docs + khai báo tạm sau này sẽ tunned lại thông số”. Mọi số trong file này là **[TBD-SIM]**. Bảng số chuẩn nằm ở `scripts/lib/data/objectives.yml` (`provisional: true`). Hiện chưa có code nào đọc file đó.

## 1. Đặt boss vào luật đã chốt (không đổi D4)

D4 đã chốt objective chính là **The Call → Cổ Titan**: đội nào chiếm được vòng Trial thì một thân khổng lồ trỗi dậy. Hero phe thắng bấm F để lái, và Titan đi lane cho tới khi bị hạ (08 §6, 10 D4). 07 §4 cấm đặt boss trung lập để farm trong pit. Vì vậy hai concept đã duyệt (31) **không thành quái farm**. Chúng là **hình dạng của Cổ Titan theo rank**:

| Rank | Hình dạng | Concept | Hành động |
|---|---|---|---|
| I–IV | **Thuồng Luồng** (boss): rắn thần đầm đá | 31, ảnh Boss | Đòn thường (quật đuôi/cắn), Slam (đập đuôi), Charge (lao trườn) |
| V–VIII | **Cổ Linh Long** (siêu boss): rồng Lạc cổ, tim pha lê | 31, ảnh Siêu boss | Như trên + Beam (hơi thở pha lê) |

Lịch, cách chiếm vòng, cách nhận quyền lái, đi lane, phần thưởng, camp lock và hành vi khi đứng im **giữ nguyên 08 §6**. File này chỉ thêm hình dạng, số theo rank và luật riêng cho Mạch Giữa.

## 2. Số tạm theo rank

HP = 9000 × (1 + 0,06 × (cấp TB − 1)) × rankHp (08 §6.2). Bảng dưới tính với cấp trung bình giả định. Cột “bị T1/T2 bắn chết” giả định trụ bắn 400 sát thương chuẩn mỗi 1,2 s, Titan đứng một mình và không ai hồi máu. Cột “phá trụ” là thời gian đấm đổ một trụ theo % HP.

| Rank | Hình dạng | Cấp TB giả định | HP | Bị trụ bắn chết | Phá 1 trụ | Kết luận |
|---|---|---:|---:|---:|---:|---|
| I | Thuồng Luồng | 4 | 10 620 | 32 s | 47 s | **không tự phá được trụ**, cần wave/tướng đỡ đòn |
| II | Thuồng Luồng | 6 | 13 455 | 40 s | 40 s | hoà, cần đồng đội |
| III | Thuồng Luồng | 8 | 17 253 | 52 s | 36 s | tự phá được 1 trụ |
| IV | Thuồng Luồng | 10 | 23 562 | 71 s | 27 s | phá 1–2 trụ |
| V | Cổ Linh Long | 12 | 31 374 | 94 s | 21 s | mối đe doạ cuối trận |
| VI–VIII | Cổ Linh Long | 13–15 | 40–65k | 121–194 s | 13–18 s | kết trận nếu không bị chặn |

Đây là ý đồ thiết kế: hai Call đầu là áp lực, phải đi cùng lính. Từ Call thứ ba trở đi, Titan tự đẩy được trụ.

**Sát thương lên tướng (tạm):**

| Hành động | Có từ rank | Windup / CD | Vùng | Sát thương theo rank I→VIII |
|---|---|---|---|---|
| Đòn thường | I | 1,6 s/nhịp | 3,4 m ngoài rìa | 90, 110, 130, 155, 185, 215, 250, 290 |
| Slam (đập đuôi / dậm vuốt) | I | 0,9 s / 6 s | tròn 6,12 m | 160, 190, 220, 260, 310, 360, 420, 480 + chậm 30% 1 s |
| Charge (lao trườn / lao bay thấp) | I | 0,6 s / 10 s | 26 m, 16 m/s, rộng 3 m | 140, 165, 190, 220, 260, 300, 345, 390 + hất 2 m |
| Beam (hơi thở pha lê) | **V** | 1 s / 8 s | 7 m × 5 s, mỗi 0,25 s | 22, 26, 30, 35 mỗi lần (rank V–VIII) |

Windup, CD và tầm lấy đúng 08 §6.2. Damage, slow, knock và việc Beam chỉ có từ rank V là **số/luật mới của file này**, đều tạm.

## 3. Mạch Giữa (Slice 1.5)

Mạch Giữa chỉ có một đường và không có pit (07 §4 là của Cửu Mạch). Bản tạm:

- **Vòng Trial:** hai ô trên lòng sông, đối xứng qua cầu, ở (−14, −14) và (+14, +14). Bán kính **9 m**, thay cho 18 m vì lòng sông chỉ rộng 24 m. Mỗi ô cách tim đường khoảng 19,8 m, còn trong hành lang đi được (corridorHalf 22).
- **Lịch:** horn lúc 02:00, vòng mở lúc 02:30 (08). Chiếm một mình hết 45 s, tranh chấp thì đứng yên. Phe thua bắt đầu Call sau với 30% tiến độ.
- **Titan:** trồi lên cách tâm vòng 7 m về phía cầu, rồi đi lane về phía trụ địch gần nhất còn đứng. Rank I–II khoá vào trụ ngoài cùng, đúng 08.
- Chế độ **Sân Tập** không có Call. **Đấu máy** có Call. Cách bot chiếm vòng là việc của bot.yml, ghi riêng sau.

## 4. Tạo hình và âm thanh (sản xuất)

- **Thuồng Luồng:** thân rắn dài khoảng 14 m ở rank I, nhô cao ~5,5 m (chiều cao gốc Titan 5,508 m). Vảy đá bazan rêu, mào đá vôi, mắt và đường vảy bụng phát sáng xanh lục mạch. Rig xương sống 12 đốt + hàm + đuôi. Clip: Rise, Idle, Slither, Attack, Slam, Charge, Die.
- **Cổ Linh Long:** rồng Lạc cổ có cánh lông chim Lạc kiểu Đông Sơn, chỉ làm điểm nhấn. Tim pha lê sáng qua lồng ngực. Rig cổ 6 đốt + cánh + đuôi. Clip như trên, thêm Beam.
- **SFX tạm:** horn gọi Call, Titan trồi, quật, slam, gầm lao, hơi thở pha lê, gục. Khi dựng sẽ đặt file trong `cdn/moodboard-painterly-fantasy/sfx-…`.
- Màu phe: vòng sáng chân và mắt theo màu đội đang lái (xanh #4fd8ff / đỏ #ff5560).

## 5. Chờ duyệt / BLOCKED

- Tên EN tạm: Thuồng Luồng → **Marsh Wyrm**, Cổ Linh Long → **Elder Vein Dragon**. Cần creator duyệt rồi ghi vào 05.
- Hiển thị Titan dưới hai tên này mà không đổi tên objective “Cổ Titan”. Cần creator xác nhận.
- Mọi số ở §2 phải qua `tools/balance/match.mjs` khi có Call trong mô hình. Hiện mô hình chưa có Titan.

## TODO

- [ ] **Hội đồng cân bằng** duyệt lại toàn bộ §2 (HP, % phá trụ, damage, Beam từ rank V) và §3 (vòng 9 m trên Mạch Giữa). Ghi kết quả vào `balance-log.md`, rồi bỏ `provisional` trong `objectives.yml`.
- [ ] Đưa Call/Titan vào `tools/balance/match.mjs` và chạy lại BAL-02 (trận 20–35 phút).
- [ ] Creator duyệt tên EN: Marsh Wyrm / Elder Vein Dragon (→ 05).
- [ ] Creator xác nhận giữ tên objective "Cổ Titan" khi hiển thị hai hình dạng.
- [ ] Dựng 3D + rig + clip Thuồng Luồng (theo 28), rồi tới Cổ Linh Long.
- [ ] Code The Call + Titan đọc `objectives.yml` (referee + lane), HUD vòng tiến độ, horn/announcer, SFX.
- [ ] Bot chiếm vòng / lái Titan (bot.yml).

## Nhật ký
- 2026-10-08: tạo bản tạm theo lệnh creator. Chưa dựng 3D, chưa có code.
- 2026-10-08: creator: “ok. ghi lại vào todo vào note đây là tạm thời. sau này sẽ lập hội đồng điều chỉnh lại”. Đã ghi TODO.
