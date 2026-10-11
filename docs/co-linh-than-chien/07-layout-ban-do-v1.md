# Layout map V1 — Cửu Mạch Chiến Trường

**Map ID kỹ thuật:** `cuu_mach`. **Canonical khi build:** `scripts/lib/data/map-cuu-mach.yml` (chưa có; sinh từ manifest `data/cuu-mach-manifest.yml` sau G2/G3, doc 80). `scripts/lib/data/map.yml` là map 1v1 Mạch Giữa, KHÔNG phải nguồn của bảng này (audit Savi 2026-10-11).  
**Đối xứng:** công bằng hai phe kiểm theo **đối xứng tâm** (x, z) → (−x, −z) cho camp, pit, bụi, căn cứ. Lane Thượng/Hạ là ảnh của nhau qua phép đó (top Blue ↔ bot Red); lane giữa tự đối xứng tâm (đường chữ S nhẹ, T1 mỗi phe cách lane 9,5 m như hai lane biên). Mọi thay đổi phải giữ phép đối xứng này; `tools/audit/docs-check.mjs` kiểm bằng script. Tọa độ là [V1 SPEC]; art có thể thiết kế lại.

## 1. Hệ tọa độ và bounds

- Trục ngang gameplay là X/Z, đơn vị V1 là mét. Y là cao độ. Tọa độ là mét thật; không có hệ số scale.
- Map center: (0,0). Ground blockout hiện tại x/z = −192…+192. Bounds config halfWidth/halfHeight = 182. Hero movement clamp x/z = −180…+180. Ba khái niệm này không thay thế nhau.
- Plateau half 273; gorgeDepth −10; river floor −3.2.
- Mạch nước chéo: 420 × 32 m, tâm (0,0), hướng yaw 45°; mặt sàn river −3.2. Bridge: tâm (0,0), **span vuông góc với dòng sông** (yaw sông + 90° = 135°), deck Y=0, width 34 m, span 78 m, thickness 1.6 m.
- Căn cứ đối diện chéo. Tâm căn cứ Blue (−150,+150); Red (+150,−150). Khi bố trí cảnh, không xoay map để làm đẹp minimap.

## 2. Căn cứ và cổng lane

| Phe | Fountain (X,Z) | Bán kính | Nexus/Tâm Mạch (X,Z) | HP | Shield | Armor/MR | Gate Thượng | Gate Giữa | Gate Hạ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Blue / Minh Ước | (−159,+159) | 13 | (−132,+132) | 4000 | 3000 | 20/20 | (−144,+84.3) | (−103.3,+103.3) | (−84.3,+144) |
| Red / Triều Vực | (+159,−159) | 13 | (+132,−132) | 4000 | 3000 | 20/20 | (+84.3,−144) | (+103.3,−103.3) | (+144,−84.3) |

Shield Tâm Mạch và luật mở khóa ở 08 §7.

## 3. Tower/Trụ Mạch — vị trí và thuộc tính

Mỗi phe có hai cấu trúc mỗi lane: 6 mỗi phe, 12 toàn map. “T1” và “T2” là tier data; T2 hiển thị là Trấn Mạch/Keep. Tọa độ là [V1 SPEC]; HP/damage là giá trị khởi điểm [THAM KHẢO], chốt bằng mô phỏng nhịp trận 20–35 phút.

| Phe | Lane | Tier | X | Z | HP | Armor | MR | Range | Tốc bắn (giây) | Shot damage | T2 slow | T2 answer | T2 well range |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Blue | Thượng | 1 | −144 | −57 | 2800 | 40 | 40 | 16 | 1.2 | 150 | — | — | — |
| Blue | Thượng | 2 | −144 | +33 | 5400 | 65 | 65 | 16 | 1.2 | 150 | 0.3 | 2.7 | 14 |
| Blue | Giữa | 1 | −45 | +45 | 2800 | 40 | 40 | 16 | 1.2 | 150 | — | — | — |
| Blue | Giữa | 2 | −81 | +81 | 5400 | 65 | 65 | 16 | 1.2 | 150 | 0.3 | 2.7 | 14 |
| Blue | Hạ | 1 | +57 | +144 | 2800 | 40 | 40 | 16 | 1.2 | 150 | — | — | — |
| Blue | Hạ | 2 | −33 | +144 | 5400 | 65 | 65 | 16 | 1.2 | 150 | 0.3 | 2.7 | 14 |
| Red | Thượng | 1 | −57 | −144 | 2800 | 40 | 40 | 16 | 1.2 | 150 | — | — | — |
| Red | Thượng | 2 | +33 | −144 | 5400 | 65 | 65 | 16 | 1.2 | 150 | 0.3 | 2.7 | 14 |
| Red | Giữa | 1 | +45 | −45 | 2800 | 40 | 40 | 16 | 1.2 | 150 | — | — | — |
| Red | Giữa | 2 | +81 | −81 | 5400 | 65 | 65 | 16 | 1.2 | 150 | 0.3 | 2.7 | 14 |
| Red | Hạ | 1 | +144 | +57 | 2800 | 40 | 40 | 16 | 1.2 | 150 | — | — | — |
| Red | Hạ | 2 | +144 | −33 | 5400 | 65 | 65 | 16 | 1.2 | 150 | 0.3 | 2.7 | 14 |

T2 well hồi tướng đồng minh ngoài giao tranh 3% max HP/giây trong bán kính 14 m [V1 SPEC]. Cột `T2 answer` bỏ, không dùng.

## 4. Pit trung lập

| ID | Tên display VI | Tên EN | Tâm (X,Z) | Bán kính | Cao độ sàn |
|---|---|---|---:|---:|---:|
| `drake` | Hõm Long Mạch | Dragon Vein Pit | (+52,+85) | 24 | −3.2 |
| `titan` | Hõm Quy Mạch | Tortoise Vein Pit | (−52,−85) | 24 | −3.2 |

Đây là hai **Trial Pit** của objective The Call; vòng tiến độ bán kính 18 m nằm trong vành pit, không phải bán kính toàn lòng chảo. Cả hai pit đều không spawn quái trung lập trong ruleset Trận Tái Hiện. Call I chọn pit theo `matchSeed mod 2`, các Call sau luân phiên pit. Tham số ring, tiến độ và Cổ Titan ở 08. Không đặt Drake/Titan trung lập để farm trong pit ở mode chuẩn.

## 5. Camp rừng

`radius` là vùng camp; `leash` là khoảng quái đuổi tối đa tính từ tâm camp. Aggro mặc định 8,5 m [V1 SPEC].

| Camp ID | Phe | Type kỹ thuật | Tâm (X,Z) | Radius | Leash data | Tạo hình / tên display VI |
|---|---|---|---:|---:|---:|---|
| sentinel-blue | Blue | buff_cdr | (−84,−9) | 16 | 18 | Hộ Mạch Lam |
| emberscale-blue | Blue | buff_burn | (−16.5,+94.5) | 16 | 18 | Long Tủy Son |
| wolves-blue | Blue | merc_wolves | (−85.5,+25.5) | 13 | 15 | Bầy Lang Tinh |
| shellwarden-blue | Blue | merc_shellwarden | (−115.5,−22.5) | 13 | 15 | Quy Giáp Thạch |
| raptors-blue | Blue | merc_raptors | (−7.5,+58.5) | 13 | 15 | Hạc Trinh Sát |
| shardpack-blue | Blue | merc_shardpack | (+10.5,+114) | 13 | 15 | Đàn Tinh Thạch |
| sentinel-red | Red | buff_cdr | (+84,+9) | 16 | 18 | Hộ Mạch Huyền |
| emberscale-red | Red | buff_burn | (+16.5,−94.5) | 16 | 18 | Long Tủy Tím |
| wolves-red | Red | merc_wolves | (+85.5,−25.5) | 13 | 15 | Bầy Lang Tinh |
| shellwarden-red | Red | merc_shellwarden | (+115.5,+22.5) | 13 | 15 | Quy Giáp Thạch |
| raptors-red | Red | merc_raptors | (+7.5,−58.5) | 13 | 15 | Hạc Trinh Sát |
| shardpack-red | Red | merc_shardpack | (−10.5,−114) | 13 | 15 | Đàn Tinh Thạch |

Hai pit không phải camp monster. Cổ Titan chỉ xuất hiện sau khi một đội hoàn tất The Call; camp rừng còn lại ở 12 vị trí trong bảng. Tên display/art là proposal; camp type ID giữ nguyên.

## 6. Vùng Tán Mạch/brush

Brush là ellipse, rotation là độ quanh trục Y. Mỗi phe 12 vùng; bộ Red là ảnh đối xứng tâm của bộ Blue (xoay 180° giữ nguyên rotation của ellipse).

| ID | Tâm X | Tâm Z | Rx | Rz | Rotation |
|---|---:|---:|---:|---:|---:|
| top-lane-blue | −127.5 | −28.5 | 4.5 | 11 | 0° |
| bot-lane-blue | −28.5 | +127.5 | 11 | 4.5 | 0° |
| top-tri-blue | −112.5 | −84 | 9 | 5.5 | +35° |
| bot-tri-blue | +37.5 | +121.5 | 9 | 5.5 | −35° |
| mid-top-blue | −25.5 | +4.5 | 4.5 | 9 | +45° |
| mid-bot-blue | −4.5 | +25.5 | 4.5 | 9 | +45° |
| top-junction-blue | −66 | −9 | 6.5 | 4.5 | +20° |
| bot-junction-blue | +13.5 | +90 | 6.5 | 4.5 | −20° |
| wolves-mouth-blue | −99 | +45 | 4.5 | 7.5 | −30° |
| raptors-mouth-blue | −30 | +67.5 | 7.5 | 4.5 | +30° |
| titan-bank-blue | −81 | −60 | 8 | 4.5 | +45° |
| drake-bank-blue | +36 | +69 | 8 | 4.5 | +45° |
| top-lane-red | +127.5 | +28.5 | 4.5 | 11 | 0° |
| bot-lane-red | +28.5 | −127.5 | 11 | 4.5 | 0° |
| top-tri-red | +112.5 | +84 | 9 | 5.5 | +35° |
| bot-tri-red | −37.5 | −121.5 | 9 | 5.5 | −35° |
| mid-top-red | +25.5 | −4.5 | 4.5 | 9 | +45° |
| mid-bot-red | +4.5 | −25.5 | 4.5 | 9 | +45° |
| top-junction-red | +66 | +9 | 6.5 | 4.5 | +20° |
| bot-junction-red | −13.5 | −90 | 6.5 | 4.5 | −20° |
| wolves-mouth-red | +99 | −45 | 4.5 | 7.5 | −30° |
| raptors-mouth-red | +30 | −67.5 | 7.5 | 4.5 | +30° |
| titan-bank-red | +81 | +60 | 8 | 4.5 | +45° |
| drake-bank-red | −36 | −69 | 8 | 4.5 | +45° |

Foliage mesh có thể lấp đầy ellipse; truy vấn bụi trong gameplay là chuẩn và không đổi bounds.

## 7. Lane path — blue gate to red gate

Red walks these arrays in reverse. These are path control points, not arbitrary concept-art anchors. Keep their order and values.

- **Thượng / top:** (−144,105) → (−144,84.3) → (−144,33) → (−134.5,−45) → (−134.5,−69) → (−144,−108) → (−108,−144) → (−69,−134.5) → (−45,−134.5) → (33,−144) → (84.3,−144) → (105,−144).
- **Giữa / mid:** (−114,114) → (−103.3,103.3) → (−81,81) → (−60.2,46.8) → (−43.2,29.8) → (43.2,−29.8) → (60.2,−46.8) → (81,−81) → (103.3,−103.3) → (114,−114).
- **Hạ / bot:** (−105,144) → (−84.3,144) → (−33,144) → (45,134.5) → (69,134.5) → (108,144) → (144,108) → (134.5,69) → (134.5,45) → (144,−33) → (144,−84.3) → (144,−105).

Current visual lane widths: Mid 18m; Top/Bot 14m. The minion route and ground road are not the same path generator; road visual smoothing must not replace lane waypoints.

## 8. Visual / collision layers

| Layer | Contents | Collision/nav |
|---|---|---|
| `gameplay_ground` | Floor, pit floor, bridge deck, river floor | Existing collision/navigation only. |
| `gameplay_points` | Spawn, tower, camp, nexus, gate, waypoint, brush query, pit | Data-driven; exact IDs in this document. |
| `art_shell` | Architecture, rocks, water curtains, trees, banners, motif, particles | No collision; cannot change LOS, projectiles or camera. |
| `art_fx` | Ambient memory shimmer, lighting, non-combat trails | Does not use combat warning colors/shapes. |

Any future obstacle gameplay requires a map revision with updated layout, collision, navigation, LOS and mirrored fairness checks. It is outside this art pass.

## 9. Blockout acceptance

- Import layout IDs as metres, no scale.
- Compare every table row against `scripts/lib/data/map-cuu-mach.yml` (khi có); north/south and lane names are not inferred from screen orientation.
- Mỗi phe có 3 lane, 2 cấu trúc/lane, 1 fountain, 3 gate và một Tâm Mạch; toàn bản đồ có 12 camp (6/phe), 2 Trial Pit và 24 vùng bụi (12/phe).
- Không spawn quái Drake/Titan trong pit cho mode chuẩn. Khi một Call thắng, Cổ Titan xuất hiện tại pit được chọn và đi trên lane đã gắn với Call; không đổi gameplay waypoint map khi thay mesh/địa hình trang trí.
- Replacing art shells leaves all world transforms, radii, waypoint order, path widths, nav polygons and damage reach unchanged.
- Minimap north arrow and X/Z projections match the 3D map for all three lane gates, bridge center and both nexus.
