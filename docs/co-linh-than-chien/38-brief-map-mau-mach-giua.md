# 38 — Brief map mẫu Mạch Giữa (gửi agent ngoài)

> Trạng thái: **GREYBOX 50% ĐÃ DỰNG 2026-10-08** (@lukasai qua Codex #23265: "THU TOÀN BỘ MAP, tỉ lệ hiện tại sai toàn bộ"). Thay lệnh cũ "chờ ảnh map mẫu, hình học khóa". Hình học mục 3 là **mẫu thử đầu**, chưa phải số balance đã nghiệm thu; vẫn chưa polish art. Sơ đồ có vòng tầm: `assets/mach-giua-greybox-50-2026-10-08.png`. Số và TODO: doc 14 §M.
> Giữ nguyên: kích thước tướng, hitbox, kit, speed, damage, camera, tầm trụ 14 m. Công trình đặt riêng theo tầm bắn, không scale tọa độ máy móc.

## 1. Map này là gì (một câu)

Một hẻm núi karst Việt cổ được ký ức dựng lại thành đấu trường: **một đường combat duy nhất** chạy chéo từ căn cứ Xanh (dưới-trái) lên căn cứ Đỏ (trên-phải), cắt ngang bởi **một dòng sông mạch phát sáng** và **một cây cầu đá có mặt trống đồng** ở giữa. Mood: sáng, rực, sạch, đọc được trong 0,5 s, gần Summoner's Rift / Liên Quân hơn là game phiêu lưu.

## 2. Camera để chụp ảnh và đánh giá

- Góc chơi thật: camera khóa, **nhìn xuống 56°**, cao khoảng 18–22 m, FOV khoảng 45°, phía trên màn hình là hướng −Z/+X (Đỏ ở trên-phải).
- Mọi ảnh map mẫu phải có ít nhất 5 khung **ở góc chơi này** (mục 8). Ảnh hero shot đẹp góc thấp chỉ là phụ.

## 3. Hình học greybox 50% (mét, Y lên, đối xứng tâm (x,z)→(−x,−z); nguồn: `scripts/lib/data/map.yml`)

u = mét dọc trục chéo từ tâm cầu về căn cứ (Xanh: x=−u/√2, z=+u/√2).

| Thứ | Mới (2026-10-08) | Cũ |
|---|---|---|
| Tim đường | (-49.7,49.7) → (-47.0,47.0) → (-41.0,41.0) → (-27.4,19.0) → (-18.6,10.1) → (18.6,-10.1) → (27.4,-19.0) → (41.0,-41.0) → (47.0,-47.0) → (49.7,-49.7) | (−79.8,79.8) … (79.8,−79.8) |
| Mặt đường combat | rộng 10 m | 18 m |
| Bờ chiến đi được | ±12 m quanh tim | ±22 m |
| Vách | leo trong 5 m, cao 7 m (+ nhiễu ≤ ~4 m) | 9 m / 15 m |
| Sông | nửa rộng 6,5 m, đáy −3,2, nước −2,0 | 12 m |
| Cầu | scale 0,5 đều: mặt 17 × 39 m, yaw −61,5° | 0,7, yaw −55,4° |
| Hốc nấp (4) | (-26.0,-3.3) (-3.3,19.3) (26.0,3.3) (3.3,-19.3), r 6 | (±46,0)(0,±46), r 11 |
| Bụi (12, phe Xanh; Đỏ đối xứng) | river-top-blue (-16.2,0.1) rx2.2 rz3.6; river-bot-blue (-4.9,11.4) rx2.2 rz3.6; flank-top-blue (-37.8,20.9) rx2.0 rz3.6; flank-bot-blue (-26.5,32.2) rx2.0 rz3.6; alcove-top-blue (-25.6,-3.0) rx2.6 rz3.2; alcove-bot-blue (-3.7,18.9) rx2.6 rz3.2 | rx 3,5–4,5 rz 6–8 |
| T1 | u 25: Xanh (−17.7,17.7), nòng 8,4 m (hình cao ×0,8) | u 44,5, nòng 10,5 |
| T2 | u 58: Xanh (−41,41), nòng 10 m | u 80,2, nòng 12,5 |
| Tâm Mạch | u 77: Xanh (−54.4,54.4), hình cao ×0,85 | u 130,7 |
| Giếng Hồi Tưởng | u 93: Xanh (−65.8,65.8), vòng hồi 13 m giữ | u 157,4 |
| Shop | Xanh (−49.5,72.1), cách suối 17,5 m (≤ shopRadius 24) | (−98,113.4) |
| Căn cứ | tâm u 87,7, bán kính 20 m | 30 m |
| Biên map | ±88 m | ±130 m |

Khoảng cách theo tầm 14 m (không đổi):
- T1–T1 **50 m** → vùng không trụ nào bắn **22 m** (cũ 61 m) cho 2 tướng combat + farm + né, rút về trụ.
- T1–T2 cùng phe **33 m** → 14 + 14 = 28 m, khe **5 m** ngoài cả hai vùng bắn (cũ 35,6 m, khe 7,6 m).
- T2–Tâm Mạch 19 m (vùng bắn chồng 9 m trong căn cứ, chủ ý); Tâm Mạch–suối 16 m.
- Đường lính: 263 → **157 m**; lính gặp nhau 28,2 → **15,2 s**; siege T1 sớm nhất 41,4 → **23,8 s** (`tools/balance/out/slice-greybox50-2026-10-08.json`, mô hình đi bộ, chưa đo client).

Agent được đổi **hình ảnh, vật liệu, ánh sáng, decor, âm thanh**. Không đổi tọa độ greybox trên khi chưa có quyết định mới, không thêm đường tắt, không thêm vật chắn trên bờ chiến, bụi không tràn khỏi ellipse.

## 4. Ba tầng đọc (luật số 1)

1. **ĐƯỜNG**: sáng nhất. Đá lát lớn màu đá vôi kem/ngà ấm, mạch vữa mảnh, **không phải gạch cam lặp đều** (lỗi của map hiện tại: cả sàn một màu cam, không có tầng). Mép đường có bó vỉa đá thấp 0,2 m; vết mòn hai vệt chân lính đậm hơn nửa bậc.
2. **BỜ CHIẾN**: trung tính, tối hơn đường 1,5–2 bậc. Cỏ ngắn xanh khoáng pha rêu, vài mảng đá lát vỡ lấn vào cỏ, hoa nhỏ rải thưa. Không decor cao.
3. **VÁCH**: tối nhất, không đi được. Đá vôi karst xám-xanh có tầng, rễ đa và dây leo bám, cây đa/tre ở đỉnh vách. Decor cao **chỉ** đứng trên vách.

Thử bằng mắt: thu ảnh về đen trắng 64 px, ba tầng vẫn tách rõ.

## 5. Bảng màu

- Môi trường: ngọc lam sâu, xanh khoáng, đá vôi trắng-ngà, sương bạc. Sông: nước ngọc lam trong, đáy có mạch sáng xanh lơ chảy theo dòng.
- Phe: **chỉ** trên công trình và cột mốc. Xanh = lam ngọc + trắng trai + vàng kim lạnh. Đỏ = đỏ son + đồng sẫm phát quang. Không dùng lam/đỏ cho decor trung tính.
- Đông Sơn là **điểm nhấn**: mặt trống đồng ở giữa cầu, chim Lạc trên cổng căn cứ, vòng đồng tâm trên bệ trụ. Không phủ hoa văn lên sàn đường.
- Ánh sáng: nắng chiều sớm trong, bóng đổ ngắn rõ, bầu trời không lộ ở góc chơi; sương nhẹ ở chân vách để tách lớp.

## 6. Từng vùng (đi từ căn cứ Xanh ra cầu)

1. **Căn cứ Xanh**: sân tròn đá ngà, bậc thấp. Giếng Hồi Tưởng là hồ tròn nước lam phát sáng có vành đá chạm sóng. Tâm Mạch: khối tinh thể đa diện lam, vòng phù điêu cánh chim quanh, cao khoảng 6–8 m. Cổng căn cứ hai cột + vòm có chim Lạc, đặt sau T2 trên đường.
2. **T2**: cổng trụ hai lớp, crown hình lân hoặc quy trừu tượng, bệ tròn 6 m ba bậc, mặt bệ khắc vòng đồng tâm. Vòng tầm bắn là rãnh khắc mờ trên đất.
3. **T2 → T1**: đường hẹp nhất cảm giác, vách hai bên gần. Hai bụi sau hông T1 là cụm lau cao có ánh sáng nhẹ ở ngọn.
4. **T1**: trụ chỉ huy thon, lõi đơn, ngọn chĩa rõ hướng nhắm. Phân biệt T1/T2 bằng silhouette từ góc chơi.
5. **Bờ sông**: đường dốc nhẹ xuống bến; bờ đá xếp, đá trôi nổi nhỏ trên mặt nước, đom đóm/hạt mạch bay. Hai bụi sông là lau nước.
6. **Cầu (landmark cấp 1)**: cầu đá vòm thấp, lan can thấp không che chân tướng, giữa cầu là **medallion mặt trống đồng** lớn đường kính khoảng 10 m. Đây là ảnh đẹp nhất của map.
7. **Hốc nấp**: khoét vào vách bên sông, sàn cỏ tối hơn, một bụi lau, một nguồn sáng ấm nhỏ (đèn đá) để không thành hố đen.
8. **Nửa Đỏ**: đối xứng tâm, cùng hình khối, đổi vật liệu phe (đỏ son, đồng sẫm), cổng có dải vòm mở ra ngoài thay cho phiến cánh ôm lõi.

## 7. Không được

- Sàn một màu, gạch lặp đều, đường không tách khỏi bờ.
- Decor cao trên đường hoặc bờ chiến; lan can cầu cao quá đầu gối tướng.
- Ánh sáng tắt góc làm hốc/bụi đen kịt; bloom làm trắng mặt đường.
- Màu phe trên cây, đá, cỏ.
- Hoa văn Đông Sơn rải khắp mọi bề mặt.
- Sương/hạt che chân tướng hoặc vòng skill.

## 8. Đầu ra agent gửi lại

1. **Top-down** toàn map, chính giữa (0,0), có lưới 10 m và tọa độ trụ/bụi/hốc đè lên.
2. **5 ảnh góc chơi** (nhìn xuống 56°, camera đặt sau-dưới-trái điểm nhìn): suối Xanh (−65.8,65.8); T2 Xanh (−41,41); T1 Xanh (−17.7,17.7); bụi sông river-top-blue (−16.2,0.1); giữa cầu (0,0).
3. 1 ảnh hero shot cầu góc thấp (phụ).
4. Ghi chú vật liệu/màu (hex hoặc oklch) cho đường, bờ, vách, nước, phe Xanh, phe Đỏ.

## 9. Savi làm gì khi có ảnh

Đối chiếu ảnh với mục 3–7, ghi điểm thấy được, rồi đề xuất một kế hoạch dựng lại map trong game theo từng nhóm nhỏ (đường → bờ → vách → sông/cầu → công trình → ánh sáng). Không dựng trước khi creator duyệt kế hoạch. Hình học trong `map.yml` giữ nguyên.

## 10. Ảnh ý tưởng nhận 2026-10-08 (creator: "ảnh ý tưởng map")

Ảnh: `/cdn/map1-1-ref1-u6efsdh7q.webp` (R1, có lính/tướng), `/cdn/map1-1-ref2-u95cs4veo.webp` (R2). Đây là **ảnh ý tưởng**, góc nghiêng ~35–40° có chân trời, không phải 5 ảnh góc chơi 56° của mục 8. Chỉ ghi điều nhìn thấy, không suy ra số balance.

### Thấy được, khớp brief
- Đường đá kem/ngà lát phiến lớn, mạch vữa mảnh, có đường chỉ vàng mờ; đường tách rõ khỏi phần xung quanh (§4.1).
- Cầu đá vòm thấp, lan can thấp, medallion mặt trời/trống đồng lớn ở giữa cầu (§6.6).
- Nước ngọc lam trong, súng/lá sen, sương trắng (§5).
- Màu phe chỉ trên công trình: trụ pha lê lam + vàng phía Xanh, pha lê đỏ + cờ đỏ phía Đỏ; cờ lam trên tường phía Xanh (§5).
- Căn cứ Xanh là sân tròn có bậc, suối pha lê lam phát sáng (§6.1). Chim Lạc/phượng trên phù điêu tường và tượng lớn (§5 điểm nhấn).
- Bụi lau xanh cao cạnh sông và mép đường (R2) (§6.5).

### Thấy được, KHÁC brief (cần quyết)
1. **Hai bên đường là vực rơi xuống** (thác đổ vào biển sương, cột karst đứng xa), không phải vách dựng lên như §3/§4.3. Đường nằm trên cao nguyên đá.
2. **Bờ chiến cỏ gần như không có ở R1**: đường đi thẳng tới tường lan can chạm chim Lạc. R2 có dải cỏ + bụi lau giữa đường và mép.
3. **R2 có lối phụ và cầu nhỏ** bắc qua nhánh sông hai bên. Slice chỉ có một đường; lối phụ đi được sẽ thành đường tắt (§3 cấm).
4. Tượng khổng lồ (chiến binh cầm giáo phía Xanh, chim Lạc/phượng phía Đỏ) đứng trên mỏm đá, cao hơn trụ nhiều lần: đúng vai landmark, chỉ cần đứng ngoài vùng đi được.
5. T1 và T2 trong ảnh cùng một dáng (vòng tròn ôm pha lê); §6.4 cần phân biệt T1/T2 bằng silhouette.
6. Đường chỉ vàng rải trên mặt đường nhiều hơn §7 cho phép ("không phủ hoa văn lên sàn đường").

### Đề xuất (chờ creator duyệt; hình học `map.yml` greybox 50% giữ nguyên)
- Q1 → theo ảnh: hai bên là **mép vực + thác + biển sương**; vùng đi được giữ ±12 m. Ở ±12 m đặt **lan can đá thấp chạm chim Lạc** làm biên (thấp hơn đầu gối tướng), ngoài lan can địa hình rơi xuống. Góc 56° nhìn thấy mép rơi rõ hơn vách dựng, không vách nào che tướng.
- Q2 → giữ bờ ±12 (gameplay cần chỗ né), vẽ theo R2: đường lát 10 m, bờ là đá lát vỡ lẫn rêu cỏ, bụi lau ở đúng các ellipse hiện có.
- Q3 → lối phụ/cầu nhỏ chỉ là **decor ngoài lan can**, không đi được.
- Q5 → T1 thon một lõi pha lê; T2 to hơn, vòng đôi + bệ ba bậc.
- Q6 → chỉ vàng chỉ ở mép đường, quanh bệ trụ và cầu; giữa đường để trơn.

### Kế hoạch dựng (sau khi duyệt), mỗi nhóm một lần lưu, có ảnh góc chơi 56° để duyệt
| # | Nhóm | Việc | Người |
|---|---|---|---|
| A | Đường | texture đá ngà lát phiến + bó vỉa, chỉ vàng ở mép | Savi |
| B | Bờ + lan can | cỏ rêu/đá vỡ, lan can chạm chim Lạc ±12 m, đèn pha lê trên cột | Savi |
| C | Vực | terrain rơi ngoài ±12, cột karst + cây, thác, biển sương | Savi |
| D | Sông/cầu | cầu vòm đá mới + medallion, nước ngọc lam, sen, thác ở hai đầu sông | Wisp Blender (cầu) |
| E | Công trình | T1/T2/Tâm Mạch/suối Xanh–Đỏ theo dáng ảnh, cờ phe | Wisp Blender |
| F | Landmark | tượng chiến binh giáo (Xanh), chim Lạc (Đỏ) trên mỏm ngoài vực | Wisp Blender |
| G | Ánh sáng | nắng chiều trong, sương chân vực, không lộ trời ở 56° | Savi |

NOT RUN cho tới khi dựng: mọi ảnh trên client, mobile, hiệu năng (thác/sương/tượng trên phone).

## 11. USER LOCK 2026-10-08 — hướng art đã duyệt (thay §10 "chờ duyệt")

Nguồn: @lukasai qua Codex. **ĐÃ DUYỆT** hai ảnh `map1-1-ref1.png` (`/cdn/map1-1-ref1-u6efsdh7q.webp`) và `map1-1-ref2.png` (`/cdn/map1-1-ref2-u95cs4veo.webp`) làm hướng đồ họa. Không cần hỏi lại duyệt art. Các góp ý art trước của Codex không còn là gate chặn hướng này.

- **Bố cục art = R2:** một lane chéo; cầu thấp qua nước ngọc lam; đường đá ngà sạch; bờ cỏ/đá có cụm lau; karst + thác nước **ngoài** khu combat; căn cứ tinh thạch xanh/đỏ; trụ thon lõi sáng.
- **Chi tiết lấy từ R1:** tượng chim Lạc; vòng đồng tâm/mặt trời ở cầu; hoa văn cánh chim và mạch nước trên kiến trúc đồng/ngọc.
- **Không chép ảnh thành geometry gameplay.** Sai số số lượng/vị trí trụ trong ảnh creator chấp nhận. Lối phụ/cầu nhỏ ở R2 chỉ là decor ngoài vùng đi được.
- **Geometry là dữ liệu riêng:** `scripts/lib/data/map.yml` (đọc bởi `scripts/terrain.js`, minimap `scripts/ui.js`/`scripts/lobby-ui.js`, đặt công trình trong `places/main/cells/x0z0.scene`). Tọa độ + vùng bụi tune lại trên mẫu 50% (doc 14 §M): hai T1 tạo sân farm/combat/rút an toàn; T1–T2 có khe ngoài vùng bắn. Không nghiệm thu geometry qua ảnh.
- **Giữ:** kit, hitbox, số combat, camera.
- Q1 (§10) chốt theo dữ liệu hiện hành: biên đi được vẫn là vách ±12 m của `map.yml` (vách = karst đá vôi phủ rêu/cây, thác đổ từ đỉnh vách ra ngoài), không đổi sang vực để không đổi va chạm/biên gameplay. Q2/Q3/Q5/Q6 theo đề xuất §10.

### Nhóm dựng (mỗi nhóm một lần lưu)
| # | Nhóm | Trạng thái |
|---|---|---|
| A | Đường đá ngà theo `map.yml` lane, rộng 10 m (path mark đồng bộ lại; mark cũ còn tọa độ 100%) | Savi |
| B | Bờ cỏ/rêu + lau; vách karst đá vôi sáng | Savi |
| C | Nước ngọc lam trong (lake liquid) | Savi |
| D | Cầu vòm thấp + medallion mặt trời/đồng tâm, lan can thấp có cột ngọc | Wisp Blender |
| E | T1 thon lõi sáng / T2 vòng đôi, tinh thạch Xanh/Đỏ | Wisp |
| F | Karst + thác + tượng chim Lạc ngoài vùng đi được | Wisp |

NOT RUN: mọi kiểm client, mobile thật, hiệu năng thác/sương trên phone; không chấm PASS qua ảnh render.

- 2026-10-08 (polish theo ảnh, art-only): ngoài vành tường (corridorHalf+cliffRise+7 m) nền sụt về y −6, biển ngọc lam `sea` y −2 phủ cả map (thay lake r49), sương trôi trên biển (10 điểm `sea-mist-*`). Hành lang đi được, tường ±12 m, sông/cầu, map.yml **không đổi**. Creator: "ko làm được = tam giác thì render" → karst/tượng chuyển sang model Blender. NOT RUN: client, đi bộ kiểm biên.
