# 41 · Thư viện VFX: ra đòn × thuộc tính × trạng thái × cấp độ

Ngày: 2026-10-08 · Trạng thái: **ĐỀ XUẤT**, chờ lukasai duyệt. Chưa sửa code.
Yêu cầu gốc (lukasai): "cần xây dựng thư viện VFX, effect, thuộc tính rõ ràng hơn. Không phải lúc làm mới nghĩ… sẽ có vài chục tướng… ám khí, phi lao phi kiếm, laze, phun độc khói lửa, đạn, tên lửa, gạch đá thiên thạch, biến hình thú/khổng lồ, bắt dính tóm lại, đấm đất bật nảy… nghiên cứu LoL hoặc Liên Quân".
Luật đang giữ: doc 30 (trong suốt qua một nút GLASS, không vẽ vòng hình học dưới đất), doc 28 (mỗi chiêu một động tác riêng).

---

## A. Nguồn nghiên cứu và nguyên tắc rút ra

Nguồn: Riot, *League of Legends VFX Style Guide* (Jin Ho Yang, 2017): https://nexus.leagueoflegends.com/en-us/2017/10/dev-leagues-vfx-style-guide/ · tóm tắt VFX Apprentice: https://www.vfxapprentice.com/blog/10-league-of-legends-vfx-design-tips · LoL wiki, Crowd control: https://wiki.leagueoflegends.com/en-us/Crowd_control

1. **Đọc được trước, đẹp sau.** Mỗi hiệu ứng có **một hình chính** (nói chiêu này làm gì) và hình phụ chỉ để tôn lên. Không chồng hình mâu thuẫn.
2. **Cấp độ quyết định độ to.** Đánh thường < chiêu < tuyệt chiêu về kích cỡ, độ sáng, độ bão hòa. Tuyệt chiêu không được trông như đánh thường.
3. **Độ sáng và bão hòa ở dải giữa.** Tránh 0% và 100% để không lẫn vào nền và UI. Phát sáng dùng để tăng tương phản, không phủ kín.
4. **Màu có nghĩa cố định.** Hồi máu xanh lá, băng xanh lam, thuốc súng cam đỏ. Mỗi hiệu ứng một màu chủ, màu phụ hạ bão hòa.
5. **Ngắn.** Hiệu ứng mà thấy dài là quá dài. Dư âm không được làm rối giao tranh.
6. **Trạng thái đọc giống nhau ở mọi tướng** (rút từ cách LoL chuẩn hóa CC): choáng của tướng nào cũng là một hình.

## B. Năm trục của thư viện

Một chiêu = **ra đòn × thuộc tính × cấp độ + trạng thái gây ra + một nét riêng của tướng**. Thư viện giữ 4 trục đầu; file tướng chỉ còn nét riêng.

### B1. Ra đòn (delivery): cách đòn đi từ tướng tới mục tiêu
Mỗi mục có pha mặc định, hình chính, hình phụ và tham số.

| Mã | Tên | Ví dụ | Hình chính | Tham số |
|---|---|---|---|---|
| `melee.slash` | chém cung | kiếm, liềm | vệt cung theo vũ khí | góc, bán kính, chiều |
| `melee.thrust` | đâm | giáo, kiếm đâm | vệt thẳng nhọn | dài |
| `melee.smash` | đập / đấm đất | búa, nắm đấm | sóng đất tỏa + đá vụn | bán kính, bật nảy? |
| `melee.spin` | xoay quanh thân | Vòng Lau | vòng vệt quanh thân | bán kính, số vòng |
| `melee.combo` | chuỗi đòn | 3 nhát | vệt nối tiếp, nhát cuối nặng nhất | số nhát |
| `proj.hidden` | ám khí | phi tiêu, kim | vật nhỏ xoay + vệt mảnh | số, xòe |
| `proj.thrown` | phi lao / phi kiếm | lao, kiếm bay | vũ khí thật bay + vệt | xuyên?, quay về? |
| `proj.arrow` | tên | cung | mũi tên + vệt | xòe, nặng? |
| `proj.bullet` | đạn | súng | chớp nòng + vệt sáng ngắn | loạt, giật |
| `proj.orb` | cầu phép | than, đốm | lõi sáng + đuôi | quay về?, dội? |
| `proj.rocket` | tên lửa | rocket | đầu đạn + khói đuôi, nổ | cung bay, bán kính nổ |
| `proj.chain` | nảy / dây chuyền | sét nảy | tia nối từng mục tiêu | số lần nảy |
| `beam.laser` | tia / laze | laze | tia liền, nhân sáng ở đầu | rộng, nạp, kéo dài |
| `cone.spray` | phun | độc, lửa, khói | luồng hình nón | góc, tầm, thời gian |
| `zone.linger` | vùng đọng | mây độc, đất cháy | bề mặt sống trong vùng | bán kính, thời gian |
| `zone.burst` | nổ tại chỗ | Mây Tụ | tụ rồi nổ | trễ, bán kính |
| `fall.meteor` | rơi từ trời | thiên thạch, gạch đá | báo trước → vật rơi → nổ | trễ, số, bán kính |
| `ground.erupt` | trồi từ đất | cột lửa, gai đá | báo trước → trồi | trễ, hình |
| `ground.wall` | dựng tường | vách đá | khối dựng lên | dài, thời gian |
| `grab.hook` | móc kéo | Móc Kéo | xích bay + kéo về | tầm, kéo m |
| `grab.seize` | tóm / bắt dính | tay tóm, tơ | vật quấn lên thân | thời gian |
| `move.dash` | lướt | lướt, nhảy lùi | vệt thân + bụi chân | dài |
| `move.leap` | nhảy vồ | Cắm Mạch | vòng cung + chạm đất | cao, dài |
| `move.blink` | dịch chuyển | Ba Bước Mờ | mờ đi → hiện ra | số bước |
| `body.transform` | biến hình | thú, khổng lồ | bùng vỏ + thân mới | dạng, thời gian |
| `body.aura` | hào quang / buff | tăng tốc | viền sáng quanh thân | màu, thời gian |
| `guard.shield` | khiên | Áo Bão | vỏ trong suốt quanh thân | lượng, hướng chắn |
| `guard.block` | đỡ / phản | đỡ đòn | chớp ở mặt chắn | góc chắn |
| `heal.pulse` | hồi máu | hồi vùng | sóng xanh lá đi lên | bán kính |
| `summon.unit` | triệu hồi | chim, trụ, phân thân | vòng triệu → vật hiện | loại |
| `trap.mine` | bẫy | mìn | vật nhỏ nằm im → kích | bán kính |
| `tether.link` | dây nối | trói nối | dây giữa hai thân | tầm đứt |

Thêm loại mới = thêm một dòng ở đây trước, rồi mới viết tướng.

### B2. Thuộc tính (element): mỗi hệ có sẵn bảng màu, bộ hạt, đèn, họ âm
| Mã | Hệ | Màu chủ / phụ | Hạt đặc trưng | Âm | Đang dùng ở |
|---|---|---|---|---|---|
| `kim` | Kim (sắt, ám khí) | bạc thép / vàng đồng | tia lửa, mạt sắt | keng, rít | Kha Tàn |
| `moc` | Mộc | ngọc bích / vàng lá | lá, lau, gỗ vụn | xào xạc | Mộc Lẫm (một phần) |
| `thuy` | Thủy / Băng | lam / trắng | giọt, băng vụn | xối, nứt băng | – |
| `hoa` | Hỏa | cam / đỏ thẫm | lửa, than, khói | bùng, lách tách | Hỏa Tủy |
| `tho` | Thổ / Đá | hổ phách / nâu | đá vụn, bụi | rầm, lạo xạo | Nham Vũ, Mộc Lẫm |
| `loi` | Lôi | xanh trắng / tím | tia, chớp | đùng, rẹt | Vân Dao |
| `phong` | Phong | trắng ngà / lam nhạt | vệt gió, lá cuốn | vù | Vân Dao |
| `doc` | Độc | xanh vàng / tím bầm | khói đặc, bọt | xì, sủi | – |
| `nguyet` | Nguyệt / Bóng | tím / bạc trăng | đốm bóng, sương | ngân, thì thầm | Mị Đăng |
| `huyet` | Huyết | đỏ máu / đen | giọt, vệt máu | phập | Kha Tàn |
| `quang` | Quang / Thánh | vàng trắng | tia sáng, lông vũ | chuông | – |
| `co` | Cơ khí / Thuốc súng | cam đỏ / xám khói | khói, vỏ đạn | nổ, cạch | – |
Quy tắc: một chiêu một hệ chủ, tối đa một hệ phụ. Hồi máu luôn có xanh lá dù hệ gì.

### B3. Pha: mọi ra đòn đi đủ (có thể bỏ pha không cần)
| Pha | Mục đích | Ngân sách thời gian |
|---|---|---|
| báo trước (telegraph) | địch kịp né: chiêu có trễ ≥ 0,4 s phải có | = độ trễ của chiêu |
| vận chiêu (windup) | tụ lực ở tay hoặc vũ khí | ≤ windup của chiêu |
| xuất (release) | chớp, giật, vệt đầu | ≤ 0,15 s |
| bay (travel) | vật bay, tia | theo tầm / tốc |
| trúng (impact) | hình chính to nhất | ≤ 0,3 s |
| dư âm (linger) | bụi lắng, than tàn | ≤ 1 s (trừ `zone.linger`: theo thời gian vùng) |
Báo trước: phe ta nhìn trung tính, phe địch có viền ấm cảnh báo. Theo doc 30, không dùng vòng hình học: báo trước bằng hạt, ánh sáng và bụi trên mặt đất.

### B4. Trạng thái (status): chung toàn bộ tướng, không theo hệ
Hình gắn trên thân mục tiêu, trong suốt, luôn cùng một hình dù tướng nào gây ra:

| Mã | Trạng thái | Hình chuẩn | Đang có trong game |
|---|---|---|---|
| `stun` | choáng | vòng sao xoay trên đầu | Cột Lửa |
| `root` | trói / ghim | xích hoặc rễ quấn chân | Xuyên Bờ |
| `slow` | chậm | vệt kéo xuống ở chân, hơi xám | Ba Nhịp Đá, Tên Sỏi, Khí Nóng |
| `airborne` | hất tung / đẩy lùi | vệt bụi theo hướng bay | Khí Nóng, Áo Bão, Gió Đẩy |
| `pull` | bị kéo | vệt kéo về nguồn | Móc Kéo |
| `charm` | mê hoặc | đốm hồng tím bay lên | Vẫy Gọi |
| `silence` | câm | ấn khóa trên đầu | – |
| `fear` / `taunt` | sợ / khiêu khích | dấu trên đầu | – |
| `burn` | cháy (DoT) | lửa nhỏ liếm thân | Than Nhật Đài |
| `bleed` | chảy máu (tầng) | giọt đỏ, đếm tầng | Sổ Nợ Sắt |
| `poison` | độc | khói xanh bốc | – |
| `antiheal` | giảm hồi | dấu nứt đỏ | Than Nhật Đài |
| `shield` | khiên | vỏ sáng quanh thân | Cắm Mạch, Áo Bão |
| `heal` | được hồi | hạt xanh lá đi lên | Mây Tụ, Gió Đẩy |
| `haste` | tăng tốc | vệt gió sau lưng | Chim Mở Lối, Áo Bão |
| `untargetable` | không thể chọn | thân mờ trong suốt | Ba Bước Mờ |
| `stealth` | tàng hình | mờ gần hết (địch không thấy) | – |
| `transformed` | biến hình | (theo `body.transform`) | – |

### B5. Cấp độ (tier): ngân sách đọc được
| Cấp | Kích cỡ | Hạt tối đa | Đèn | Rung màn | Âm |
|---|---|---|---|---|---|
| đánh thường | 1× | 40 | không / rất nhỏ | không | 1 lớp |
| chiêu thường | 1,5× | 120 | nhỏ, ≤ 0,4 s | rất nhẹ, chỉ người trúng | 2 lớp |
| tuyệt chiêu | 2,5× | 300 | vừa, ≤ 0,8 s | nhẹ, người trong tầm thấy | 3 lớp, có lớp trầm |
| đòn kết liễu, đòn cuối của combo | +20% | – | – | hitstop 2 khung cho người đánh | thêm nhấn |

### B6. Phản ứng khi trúng (theo loại sát thương và vật liệu)
- Vật lý: tia lửa trắng ấm + bụi. Phép: hạt màu theo hệ. Chuẩn: chớp trắng gọn.
- Trúng tướng: nảy thân (squash) nhẹ. Trúng lính: bụi. Trúng trụ / đá: mảnh đá vụn và tiếng đá.

## C. Hợp đồng dữ liệu (khi được duyệt mới làm)

Mỗi chiêu trong `heroes.yml` thêm:
```yaml
vfx: { delivery: proj.thrown, element: tho, tier: ult, status: [airborne], sign: nham_vu.lao_vach }
```
Code:
```
scripts/lib/vfx/elements.js     B2: bảng màu, hạt, đèn, âm theo hệ
scripts/lib/vfx/delivery/*.js   B1: mỗi họ một file (melee, proj, beam, cone, zone, fall, ground, grab, move, body, guard, heal, summon, trap, tether)
scripts/lib/vfx/phases.js       B3: lịch pha, báo trước theo phe
scripts/lib/vfx/status.js       B4: hình trạng thái trên thân, bật/tắt theo state mục tiêu
scripts/lib/vfx/tier.js         B5: ngân sách nhân vào mọi hạt, đèn, rung, âm
scripts/lib/vfx/sign/<hero>.js  nét riêng, nhỏ nhất có thể
```
skillfx.js (57 KB, viết tay theo từng chiêu) thu gọn thành bộ lắp ráp đọc data. Tướng mới = viết dòng `vfx:` + file `sign` nhỏ.

## D. Bảng chấm 6 tướng hiện tại (theo mô tả và code; chưa xem lại trong trận lượt này)

| Tướng | Chiêu | Ra đòn | Hệ | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| Mộc Lẫm | Kiếm Bờ | melee.slash | tho | – | |
| | Ba Nhịp Đá | melee.combo (nhát 3) | tho | slow | nhát 3 phải nặng hơn rõ |
| | Xuyên Bờ | move.dash + melee.thrust | tho | root | thiếu hình ghim chuẩn |
| | Vòng Lau | melee.spin | moc | – | |
| | Cắm Mạch | move.leap + melee.smash | tho | shield (đồng đội) | cấp tuyệt chiêu |
| Kha Tàn | Vạch Nợ | melee.slash | kim + huyet | bleed | |
| | Sổ Nợ Sắt | – | huyet | bleed (tầng) | thiếu hình đếm tầng chuẩn |
| | Liềm Rìu | melee.slash (nửa vòng) | kim | heal (bản thân) | |
| | Móc Kéo | grab.hook | kim | pull | |
| | Nợ Cuối | melee.smash (đơn mục tiêu) | huyet | – | sát thương chuẩn: chớp trắng |
| Mị Đăng | Đốm Dẫn | proj.orb | nguyet | – | |
| | Canh Đèn | body.aura (đòn kế) | nguyet | – | |
| | Đèn Đi-Về | proj.orb (quay về) | nguyet | – | |
| | Vẫy Gọi | proj.orb | nguyet | charm | |
| | Ba Bước Mờ | move.blink ×3 + melee.slash | nguyet | untargetable | |
| Hỏa Tủy | Than Bay | proj.orb | hoa | – | |
| | Than Nhật Đài | – | hoa | burn + antiheal | thiếu hình chuẩn |
| | Cột Lửa | ground.erupt | hoa | stun | cần báo trước 0,7 s |
| | Khí Nóng | zone.burst quanh thân | hoa + phong | airborne + slow | |
| | Than Rơi | fall.meteor | hoa | – | cần báo trước 1 s |
| Nham Vũ | Tên Sỏi | proj.arrow | tho | – | |
| | Sỏi Nặng | proj.arrow (nặng) | tho | slow | |
| | Quạt Đá | proj.arrow ×3 xòe | tho | – | |
| | Chim Mở Lối | summon.unit + move.dash | phong | haste | |
| | Lao Vách | move.dash + proj.thrown (xuyên) | tho | – | |
| Vân Dao | Tia Rẽ | proj.chain / proj.orb | loi | – | |
| | Hồi Đáp Của Giông | body.aura | loi | – | |
| | Mây Tụ | zone.burst | loi | heal (ta) | |
| | Áo Bão | guard.shield + body.aura | phong | shield, haste, airborne | |
| | Gió Đẩy | zone.burst quanh thân | phong | airborne + heal | |

**Nhận xét:**
1. 6 tướng mới dùng khoảng 16 trên 32 loại ra đòn. Chưa có: laze, phun, đạn, tên lửa, vùng đọng, ám khí, tóm, biến hình, bẫy, dây nối, tường, khiên chắn hướng.
2. **Chưa có thư viện trạng thái**: code không có hình chuẩn cho choáng, trói, chậm, cháy, chảy máu, mê hoặc. Mỗi chiêu tự vẽ lúc trúng, hết hiệu ứng là mất, nên người chơi không đọc được ai đang bị gì. Đây là lỗ hổng lớn nhất về cảm giác "skill chưa có effect thật".
3. Hệ trùng nhau: Mộc Lẫm và Nham Vũ cùng thổ, Mị Đăng và Vân Dao cùng kiểu đốm "đòn kế tiếp". Cần nét riêng rõ hơn.
4. Chiêu có trễ (Cột Lửa 0,7 s, Than Rơi 1 s) cần pha báo trước chuẩn.
5. Cấp độ chưa được chuẩn hóa: kích cỡ, đèn, rung đang chỉnh tay theo từng chiêu.

## E. TODO (sau khi duyệt)
- [ ] V0 Duyệt bảng B1–B5 (thêm hoặc bớt loại, đổi tên hệ).
- [ ] V1 Bàn thử (sân riêng trong dev): mỗi loại ra đòn × 1 hệ, chụp và quay từng ô.
- [ ] V2 status.js trước: 17 trạng thái chuẩn trên thân, nối vào state hiện có (slow, root, stun…).
- [ ] V3 elements.js + tier.js.
- [ ] V4 Các họ delivery, mỗi họ một file, kèm ảnh bàn thử.
- [ ] V5 Chuyển 6 tướng sang `vfx:` data + sign, so trước và sau từng chiêu (quay clip).
- [ ] V6 Audit: mỗi chiêu có hình chính rõ, đúng cấp, trạng thái hiện đủ thời gian. Quan sát thật mới ghi PASS, chưa xem ghi NOT RUN.
