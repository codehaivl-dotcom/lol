# 86 · Cửu Mạch Chiến Trường: concept 5v5 (bản sắc 9 mạch, flow trận, bảng TBD)

**Chỉ là tài liệu, mọi thứ là ĐỀ XUẤT chờ creator duyệt.** Ngày 2026-10-11. Trạng thái: CONCEPT · NOT_TESTED (chưa greybox, chưa engine, chưa sim).
Không có tọa độ mới: số mét chỉ lấy từ [07](07-layout-ban-do-v1.md) / [manifest](data/cuu-mach-manifest.yml) (chỉ đọc, không sửa). Không có số combat mới: mọi khoảng thời gian ghi “đề xuất” đều chờ Balance Lab ([73](73-balance-lab.md)).
Nguồn đọc: 80 (gate), 81 (Hải Tâm, chỉ để đối chiếu), 82 + 35 + 37 (Thuồng Luồng/Cổ Linh Long), 07 (layout V1), 27 §7 (gate owner), 02 (art bible), 08 §5–6 (rừng, The Call), 31 (quái rừng), 61 (Mạch Đăng), `scripts/lib/data/objectives.yml` (chỉ đọc, provisional).

> **5 câu creator cần trả lời (lặp lại từ doc 80; đề xuất in đậm)**
> 1. **G1** · Đóng 1v1 bằng gì? **A: một wisp chơi 1v1 có log T1–T6 (PASS_ENGINE)** / B: creator tự chơi rồi nói “passed”.
> 2. **G2** · Ký doc 07 làm geometry candidate nguyên trạng (TBD điền trong greybox)? **CÓ** / KHÔNG (sửa 07 trước).
> 3. **G3** · Map chạy ở đâu? **A: place riêng `cuu_mach`** / B: cùng place `main`, map-aware.
> 4. **G5** · Đội Đỏ xem minimap? **A: xoay 180° theo camera đội** / B: một hướng chung.
> 5. **G6** · Art shell **không va chạm** như 07 §8? **CÓ** / KHÔNG.
>
> Câu thêm từ tài liệu này (không chặn greybox, xem §7): Q6 lối qua sông ở lane biên (A/B/C) · Q7 lane gắn pit · Q8 cách đếm 9 mạch · Q9 tên lane “Mạch Giữa” trùng tên map 1v1.

---

## 1. Một dòng và khác Hải Tâm ở đâu

Mười Cổ Linh giành nhau **mạch núi** của một đô thị–đấu trường karst: ba lane đá vôi phát sáng, một dòng sông ký ức cắt chéo, hai hõm Trial luân phiên gọi Cổ Titan dậy.

| | Cửu Mạch (map 1, doc 07) | Hải Tâm (map 2, doc 81, chỉ đối chiếu) |
|---|---|---|
| Đất | Đất liền, thung lũng karst, sông chéo 420×32 m | Kinh thành chìm, cầu đá + nền nổi trên biển |
| Objective | **2** Trial Pit đối xứng, Call I theo `matchSeed mod 2` rồi luân phiên | **1** pit trung tâm (đề xuất của 81) |
| Qua sông | 1 cầu tâm 34×78 m; lane biên: TBD (§7) | Nhiều cầu đá (81 §3) |
| Đọc tầm nhìn | Mạch Đăng doc 61 (6–8 đèn ứng viên) | Tháp ký ức (đề xuất riêng của 81) |
| Nước | Cảnh + đáy sông −3,2; mực nước TBD | Cảnh, KHÔNG thuỷ triều |

Hệ quả: Cửu Mạch là map “chuẩn” để đo nhịp trận 20–35 phút; mọi chuẩn manifest/minimap/spawn chốt ở đây trước, Hải Tâm mượn lại.

---

## 2. Bản sắc 9 mạch (ĐỀ XUẤT, Q8)

**Cách đếm đề xuất:** 9 mạch = 9 *vùng nhận diện*. Vùng đối xứng tâm dùng chung motif, chỉ khác accent màu phe. Hai căn cứ là **hai cực** (Giếng Hồi Tưởng + Tâm Mạch), không tính vào 9. Phương án khác cho creator: tính căn cứ là mạch thứ 9 và gộp hai Bến Biên vào Sông Mạch.

Luật chung (02 §1, §4): bốn linh vật **long–lân–quy–phượng** chia cho bốn vùng lớn. **Đông Sơn chỉ là điểm nhấn, đúng 2 chỗ:** medallion vòng đồng tâm ở tâm Cầu Mạch và relief chim Lạc trên một cổng mỗi căn cứ. Không trải hoa văn lên sàn lane/rừng. Lớp art = B (không va chạm, 07 §8).

| # | Mạch (tên VI đề xuất) | Vùng theo 07 | Motif | Landmark (art shell, không va chạm) | Bảng màu (nền → nhấn) |
|---|---|---|---|---|---|
| 1 | **Mạch Thượng** | lane top, rộng 14 m, góc ở (−144,−144) | Đá vôi karst xếp tầng, cờ gió dọc mép | Cổng Thạch Môn hai đầu lane (đứng ngoài 14 m) | trắng đá vôi, xanh khoáng → viền lam/son theo nửa phe |
| 2 | **Mạch Giữa** *(tên trùng map 1v1, xem Q9)* | lane mid, rộng 18 m | Đại lộ pha lê thẳng, cột đèn tinh thể (nối tiếp ngôn ngữ map 1v1) | Hai cổng mid + cột đèn đội (họ hàng của P3 Mạch Giữa) | lam ngọc/trắng trai ↔ đỏ son/tím, nhạt dần về cầu |
| 3 | **Mạch Hạ** | lane bot, rộng 14 m, góc ở (144,144) | Ruộng bậc thang phát quang dưới vách | Guồng nước đá ở góc lane (cảnh xa) | hổ phách, lục lúa → viền phe |
| 4 | **Sông Mạch + Cầu Mạch** | sông yaw 45°, cầu tâm (0,0) | Vòng đồng tâm mặt trống (**Đông Sơn điểm nhấn 1**) | Cầu vòng tinh thể xếp lớp, medallion giữa nhịp | ngọc lam sâu, bạc sương → vàng kim lạnh ở medallion |
| 5 | **Hõm Long Mạch** | pit `drake` (+52,+85), r24 | Long văn hư cấu trên vành trống | Vành Long đúc vàng ngọc, 2 cột đèn Mạch Đăng (§5) | vàng ngọc, ngọc lam → cảnh báo Call riêng |
| 6 | **Hõm Quy Mạch** | pit `titan` (−52,−85), r24 | Địa tầng xếp như mai quy | Mai đá khổng lồ làm vành, khe sáng tím | tím lạnh, xám bazan → cảnh báo Call riêng |
| 7 | **Rừng Lân** (nửa Minh Ước) | 6 camp `*-blue` | Vườn mạch sống, sừng/bờm lân trên đá trôi | Cây cổ thụ phát quang cạnh Hộ Mạch Lam | ngọc lục, hổ phách → accent lam ngọc |
| 8 | **Rừng Phượng** (nửa Triều Vực) | 6 camp `*-red` | Lông vũ tinh thể, cây lửa | Tán phượng đỏ cạnh Hộ Mạch Huyền | ngọc lục, san hô → accent son/tím |
| 9 | **Bến Biên** (2 bến) | nơi lane Thượng/Hạ cắt sông, vùng góc (−144…−108, −108…−144) và đối xứng | Hạc và đường sóng, thác treo | Hạc đá ở mép bến; dạng qua sông = Q6 | bạc, ngọc lam → trắng bọt |
| cực | Giếng Hồi Tưởng + Tâm Mạch (×2) | fountain (∓159,±159) r13; nexus (∓132,±132) | Lõi đa diện + vòng cánh chim (02 §3) | Relief chim Lạc trên 1 cổng/căn cứ (**Đông Sơn điểm nhấn 2**) | Minh Ước lam/trắng trai/vàng lạnh · Triều Vực son/tím/đồng |

Luật đọc màu: palette cảnh báo combat và màu phe độc lập (02 §1); vùng 5–6 có màu Call riêng, không trùng màu phe. Lane luôn sáng hơn rừng và bờ pit (02 §3).

**Kiểm trùng.** Ba lane + sông chéo + hai hố objective là khuôn chung của thể loại, không phải biểu đạt riêng của game nào. Khác biệt của Cổ Linh nằm ở: (a) pit **không có quái farm**, chỉ có vòng chiếm The Call, phe thắng **lái** Cổ Titan đi lane (08 §6); (b) đèn cố định thắp tay chiếm tầm nhìn (61), không cắm mắt; (c) bản sắc karst/linh vật Việt. Chỗ cần tránh giống: không có “buff đỏ/xanh” nhìn giống LoL/AoV (Hộ Mạch/Long Tủy phải có silhouette riêng theo 31); camp merc (08 §5) gần ý tưởng merc của HotS, nên giữ cách hiện tại: last-hit mở wave, **không** có vòng chiếm camp.

---

## 3. Topology (sơ đồ quan hệ, KHÔNG tỷ lệ, không tọa độ mới)

Quy ước vẽ: X tăng sang phải, **Z tăng xuống dưới**, nên Minh Ước ở dưới trái, giống camera đội Xanh. Đội Đỏ thấy sơ đồ xoay 180° (G5-A). Nhãn trụ: x=Xanh, đ=Đỏ.

```
   BẾN THƯỢNG ⑨ ═════[đT1]══════════[đT2]══════ cổng Đỏ ┐
   ║ ≈≈ Sông Mạch ④                               ║  CỰC TRIỀU VỰC
   ║    ≈≈            ⑧ RỪNG PHƯỢNG          [đG2]  Tâm Mạch · Giếng
 [xT1]  ⑥◎≈≈ Hõm Quy     (6 camp đỏ)     [đG1]    ║
   ║  RỪNG ≈≈                         ╱           [đT2]
   ║  LÂN ⑦  ≈≈        ╔═══════╗  ╱               ║
   ║ (6 camp   ≈≈≈≈≈≈≈ ║ CẦU ④ ║ ≈≈≈≈≈             ║
 [xT2]  xanh)     ╱    ╚═══════╝     ≈≈ ⑤◎        [đT1]
   ║        [xG1]   ② Mạch Giữa      Hõm Long ≈≈    ║
 CỰC MINH ƯỚC [xG2]                          ≈≈    ║
 Tâm Mạch · Giếng                               ≈≈ ║
 └ cổng Xanh ═════[xT2]══════════[xT1]═════ BẾN HẠ ⑨
                    ③ Mạch Hạ                    
 ① Mạch Thượng = cạnh trái + cạnh trên (góc Bến Thượng)   G = trụ mid
```

Quan hệ chính rút từ số doc 07 (PASS_MODEL: phép tính khoảng cách tay, không chạy engine):
- Sông theo đường chéo x = z, đi qua hai góc lane biên. Mỗi lane biên cắt sông **đúng một lần**, ở Bến Biên; lane Giữa qua sông bằng Cầu Mạch.
- Hõm Long (+52,+85) nằm phía Minh Ước, cách trục sông ≈ 23 m < r24, tức là **chạm sông**. Hõm Quy đối xứng, nằm phía Triều Vực. Call luân phiên nên mỗi đội lần lượt có một Call “sân nhà” (rủi ro ở §8).
- Lane gần mỗi pit nhất: Hõm Long gần **Mạch Hạ** (≈ 50 m tới điểm lane (45,134,5)), xa lane Giữa (≈ 99,5 m; audit 11-10 sửa từ 97). Hõm Quy đối xứng, gần **Mạch Thượng**. Đây là căn cứ cho đề xuất Q7.
- Đi bộ gate→gate: lane biên ≈ 79 s, lane Giữa ≈ 54 s (doc 80, PASS_MODEL). Map dài gấp 2,3–3,3 lần Mạch Giữa 1v1, nên nhịp rừng và recall quan trọng hơn 1v1 nhiều.

---

## 4. Flow trận theo pha (ĐỀ XUẤT; mốc theo **sự kiện**, phút chỉ để định hướng 20–35 phút)

| Pha | Mở khi | Lane | Rừng | Objective | Đèn/tầm nhìn |
|---|---|---|---|---|---|
| **Đầu** | 0:00 → Call I kết thúc | Wave 30 s (08 mode `tai_hien`); lane biên dài 79 s đi bộ nên đổi lane hiếm | Mở rừng từ camp gần lane mình, gom buff trước horn | Horn **02:00**, pit mở **02:30**, capture 45 s (objectives.yml, provisional). Call I sinh Thuồng Luồng rank I, chưa tự phá nổi trụ (35 §2) | Thắp đèn cạnh pit trước khi pit mở; đó là lý do để rời lane |
| **Giữa** | T1 đầu tiên sụp hoặc Call II | Đẩy theo lane gắn Titan (Q7); merc wave từ camp hỗ trợ đẩy | Camp **đóng** khi Titan đang đi (08 §5), nên rừng là cửa sổ giữa hai Call | Call II–IV: Thuồng Luồng rank II–IV, tự phá được 1–2 trụ ở rank III–IV | Tranh đèn cấp II gần pit (61) quyết định ai vào vòng trước |
| **Cuối** | T2 đầu tiên sụp (Tâm Mạch mở, 08 §7) hoặc Titan rank V | Gom 5 người, đánh đổi lane lấy Call | Ít farm, camp chủ yếu để lấy buff trước giao tranh | Rank V–VIII hoá **Cổ Linh Long** (beam), mối đe doạ kết trận (35 §2) | Đèn trong lãnh thổ phe thua vẫn bật công tắc được (61 §1), làm đường phản công |

**Đường đi rừng (topology, không tọa độ).** Ghép từ tâm camp doc 07; nửa Minh Ước kể ra, nửa Triều Vực đối xứng:
- **Nhánh Thượng** (sát Mạch Thượng): Quy Giáp Thạch (−115,5,−22,5) → **Hộ Mạch Lam** buff CDR (−84,−9) → Bầy Lang Tinh (−85,5,+25,5). Nhánh này hướng về Hõm Quy (pit phía địch).
- **Nhánh Hạ** (sát Mạch Hạ và lane Giữa): Hạc Trinh Sát (−7,5,+58,5) → **Long Tủy Son** buff burn (−16,5,+94,5) → Đàn Tinh Thạch (+10,5,+114). Nhánh này là cửa sau của Hõm Long (pit nhà).
- Hai vòng đề xuất cho rừng (chờ đo nav, NOT_TESTED): **vòng Long** = Thượng → Hạ, kết ở Hõm Long trước horn; **vòng Quy** = Hạ → Thượng, kết ở Bến Thượng để xâm Rừng Phượng hoặc tranh Hõm Quy. Call I theo seed nên jungler biết vòng nào trước khi horn kêu.
- Camp merc mở wave “cho lane gần nhất” (08 §6.3; §5.2 định nghĩa merc camp). Đề xuất ghi rõ lane gần nhất: Quy Giáp → Thượng, Đàn Tinh Thạch → Hạ, Lang Tinh/Hạc → Giữa. Còn chờ nav đo; Bầy Lang Tinh nằm giữa hai lane nên dễ gây tranh cãi.

**Nhịp hồi camp: ĐỀ XUẤT dạng khoảng, chưa chốt, Balance Lab đo.**

| Loại | Lần đầu xuất hiện | Hồi sau khi hạ | Lý do |
|---|---|---|---|
| Camp merc ×8 | 0:45–1:30 | 60–100 s | Một vòng nửa rừng (3 camp + đi bộ) phải ngắn hơn một chu kỳ hồi, để jungler phải chọn chứ không dọn hết |
| Camp buff ×4 | 1:00–1:45, xong **trước** horn 02:00 | 120–180 s | Buff nên bật được cho Call I; hồi khoảng 2 lần mỗi khoảng giữa hai Call |
| Mọi camp | — | **Ngừng đếm** khi Titan đang đi, đếm tiếp khi Titan bị hạ hoặc idle (08 §5–6) | Giữ luật camp-lock; manifest cần trường “pause” (mâu thuẫn M6) |

Kiểm trùng: không chép mốc của LoL/AoV/MLBB. Khoảng ngắn hơn MOBA 30–40 phút vì camp bị khoá trong lúc Titan đi và trận đích chỉ 20–35 phút. Calculator doc 31 cho clear camp 12–32 s/1 tướng (analytic, không phải sim), phù hợp cửa sổ 60–100 s nhưng **NOT_TESTED**.

---

## 5. Đèn và tầm nhìn: dùng để đọc map, không thêm cơ chế

Chỉ dùng luật Mạch Đăng doc 61 (đèn cố định, thắp tay để chiếm, cấp I/II, công tắc phòng thủ trong lãnh thổ gốc). Số đèn ứng viên cho Cửu Mạch là **6–8** (61 §2). Bán kính vision: TBD-MEASURE. Ở đây chỉ đề xuất **loại vị trí**; tọa độ do Savi đặt trong greybox sau G2.

| Loại vị trí | Số | Lãnh thổ (61 §1) | Đọc map được gì |
|---|---|---|---|
| Vành mỗi Trial Pit (phía sông và phía rừng) | 2×2 = 4 | Đèn phía nửa map của phe nào thì thuộc phe đó. Hõm chạm sông nên mỗi pit có 1 đèn mỗi phe | Ai sắp vào vòng Call; khớp sơ đồ “Tranh chấp đèn gần Boss” của creator |
| Mỗi Bến Biên | 2 | Trung lập (nằm trên trục sông) | Có ai đi rừng xâm qua góc lane biên không |
| Hai đầu Cầu Mạch *(tuỳ chọn, để đủ 8)* | 2 | Mỗi đầu thuộc phe của nửa đó | Lane Giữa có bị roam không |

Đọc map: màu ngọn đèn = phe đang giữ thông tin ở đó (lam/son). Đèn tắt = vùng mù. Icon đèn trên minimap có 3 trạng thái (tắt / cấp I / cấp II) theo màu phe. Đèn là đèn art (FX), **không** phải đèn động thật: giữ ngân sách ≤ 8 đèn động thấy cùng lúc (80 §G6).

---

## 6. Boss/objective: phần nào giữ nguyên, phần nào Cửu Mạch còn thiếu

- **Giữ nguyên** (08 §6, 35, 37, 82): The Call → Cổ Titan. Rank I–IV là Thuồng Luồng (quật đuôi, Slam, Charge), rank V–VIII là Cổ Linh Long (+Beam). Comeback 30%. Mọi số trong `objectives.yml` là `provisional`.
- `objectives.yml` đã có `rings.cuu_mach` (r18, pit drake/titan) khớp doc 07.
- **Còn thiếu cho Cửu Mạch:** chỗ Titan trồi và lane Titan đi (Q7). Doc 35 §3 chỉ có offset 7 m cho Mạch Giữa.
- Đọc ở camera khoá (pitch 56°, 11 m mặc định, xa nhất 26 m): Titan rank I với baseHeight 5,5 m × scale 1,3 phải nằm trọn khung ở 11 m khi đứng giữa pit r24. Đây là việc kiểm của 82 (NOT_TESTED).
- Asset Thuồng Luồng (82 v3: 19k tam, 8 clip) đủ dùng; Cổ Linh Long chưa có model (`model: null`).

---

## 7. Bảng TBD → owner, cách chốt, gate chặn

Owner: **C** = creator · **S** = Savi-greybox · **B** = Balance Lab · **A** = art.

| # | TBD (nguồn) | Owner | Đề xuất / cách chốt | Gate chặn |
|---|---|---|---|---|
| 1 | `bounds.minimap_extent` (manifest) | S (+UI) | Ứng viên 182 (= config half extent, phủ clamp ±180). Chốt khi vẽ minimap và kiểm 3 gate + cầu + 2 Tâm Mạch trùng 3D (07 §9) | G5 |
| 2 | `river.water_level_y` (manifest) | A + S | Nằm trong khoảng (−3,2; 0), tức giữa đáy sông và mặt cầu. Nếu Q6 = A thì nước chỉ là lớp art mỏng, không đổi tốc chạy. Chốt bằng ảnh greybox ở camera 11 m | G2 (điền trong greybox), G6 |
| 3 | `river.extra_crossings`: lối qua sông ở lane biên (manifest, 80 §G2) | **C** quyết dạng (Q6), S dựng | **Q6=A: creator OK 11-10 (#'ok làm đi'), chờ kiểm greybox (traverseCheck) — chưa ký G2. Lội cạn**, lane đi xuyên đáy sông ở Bến Biên, dốc thoải, giữ rộng 14 m. B: cầu thấp mỗi bến (thêm `gameplay_ground`, là sửa map). C: đổi route lane (sửa 07). Chốt khi `traverseCheck` gate→gate PASS_ENGINE | G2 |
| 4 | `bases.*.spawn_point` (manifest) | S | Đặt trong vòng fountain r13, đối xứng tâm; ghi vào manifest kèm `source: greybox` | G2 / G3 |
| 5 | `lanes.*.length_m` (manifest) | S | Chỉ điền: 480,3 / 326,4 / 480,3 m (PASS_MODEL), tính lại nếu Q6 đổi route | G2 (thủ tục) |
| 6 | `lanes.nav_polygons` (manifest) | S | Lấy từ nav engine; done khi `findPath` đi được từ fountain tới mọi gate, camp và pit, hai phe đối xứng | G2 → G3 |
| 7 | `objectives.titan_rise_offset` (manifest) | S + B | Trồi trong pit, đi ra lane gắn pit (#8); đo bằng greybox; số boss do hội đồng cân bằng | G2 (vị trí), hội đồng boss (số) |
| 8 | `objectives.call_lane_binding` (manifest, 07 §9) | **C** (Q7) | **Q7=A: creator OK 11-10 (#'ok làm đi'), chờ kiểm greybox (traverseCheck) — chưa ký G2. Hõm Long → Mạch Hạ, Hõm Quy → Mạch Thượng** (lane gần nhất, §3). B: Titan luôn đi lane Giữa. Không đề xuất “người lái chọn lane” vì là cơ chế mới | G2 |
| 9 | `jungle.respawn_s` (manifest, 80 §G2) | B | Khoảng §4; cần trường pause theo camp-lock. Greybox dùng tạm giá trị giữa khoảng, gắn nhãn TEMP | Không chặn greybox; chặn playtest 5v5 |
| 10 | Số trụ/Tâm Mạch: HP, giáp, shield `THAM_KHAO` (manifest, 08 §7) | B | Chốt bằng `tools/balance/match.mjs` theo đích 20–35 phút; mô hình hiện cho trung vị ≈ 5 phút với HP bảng (08 §7), nên **phải tune**. Số lượng trụ (2/lane) giữ theo 07 | Không chặn G2; chặn playtest |
| 11 | Brush 24 ellipse chưa chép vào manifest | S | Chép từ 07 §6 lúc ký, chạy lại script đối xứng | G2 |
| 12 | Vị trí 6–8 Mạch Đăng + bán kính vision (61) | C (số/loại §5), S (đặt), B (bán kính) | Duyệt bảng loại §5, đặt trong greybox. Luật 61 vẫn là prototype ở Mạch Giữa trước | Sau G2; không chặn greybox |
| 13 | Lần xuất hiện đầu của camp | B | Khoảng §4 | Chặn playtest |
| 14 | Tên VI 9 mạch và cách đếm (Q8, Q9) | C + A | Duyệt bảng §2 | G6 |
| 15 | Ngân sách perf map (≤ 500 KB scene, ≤ 8 đèn động, 60 fps phone) | S | Đo ở tâm cầu, pit và căn cứ (80 §G6) | G6 |

---

## 8. Cân bằng / QA (tất cả NOT_TESTED trừ khi ghi khác)

| Kiểm | Cách | Nhãn |
|---|---|---|
| Đối xứng tâm lane/trụ/camp | Script manifest (doc 80) | PASS_MODEL |
| Khoảng cách pit↔lane, pit chạm sông | Tính tay từ số 07 (§3) | PASS_MODEL |
| Call luân phiên sân nhà: số Call lẻ thì phe được seed chọn có thêm 1 Call sân nhà | Sim 200 trận; nếu chênh tỷ lệ thắng > 2 điểm, xem xét Call I ở pit phía phe thua lane nhiều hơn (cần creator duyệt vì đổi luật 07) | NOT_TESTED |
| Lội cạn Bến Biên (Q6-A) không làm chậm, không đổi LOS | `traverseCheck` + đo tốc chạy trong greybox | NOT_TESTED |
| Vòng rừng 3 camp ngắn hơn chu kỳ hồi | Balance Lab đo clear camp bằng kit thật (31 §Kế hoạch đo) | NOT_TESTED |
| Titan rank I nằm trọn khung ở camera 11 m trong pit r24 | Ảnh engine (82) | NOT_TESTED |
| Trận 20–35 phút với 12 trụ + Tâm Mạch | `match.mjs` sau khi tune HP (#10) | NOT_TESTED (đang FAIL mô hình ≈ 5 phút) |
| Minimap xoay 180° cho Đỏ khớp 3D | 3 gate + cầu + 2 nexus (07 §9) | NOT_TESTED |

---

## 9. Mâu thuẫn tìm thấy (không sửa nguồn; ghi để owner xử lý)

| # | Mâu thuẫn | Ở đâu | Đề xuất |
|---|---|---|---|
| M1 | Camera: 27 §7 ghi distance 17 m, zoom 11–26; doc 80 ghi `camera.yml` là 11 m, zoom 8–26 | 27 §7 ↔ 80 §G4 | File yml là nguồn; sửa con số ở 27 khi chạm tới. Kiểm readability ở 11 và 26 m |
| M2 | 07 §9 bảo so mọi hàng với `scripts/lib/data/map.yml`, nhưng file đó là geometry Mạch Giữa 1v1 (extent 88) | 07 §9 | Đổi thành file map Cửu Mạch tương lai (G3); đến lúc đó so với manifest |
| M3 | Pit id `drake`/`titan` trong khi 07 §4 cấm Drake/Titan trung lập; Titan thật trồi ở **cả hai** pit | 07 §4, manifest, `objectives.yml rings` | Giữ id kỹ thuật cho ổn định; UI/log luôn dùng Hõm Long/Hõm Quy. Đổi id (ví dụ `long`/`quy`) là quyết định của owner data |
| M4 | “Mạch Giữa” vừa là tên map 1v1 vừa là tên lane mid Cửu Mạch | 02 §3 glossary ↔ tên map 1v1 | Q9: giữ, hoặc gọi lane là “Mạch Trung” |
| M5 | Camp dùng lại linh vật của pit: Long Tủy (camp buff) ↔ Hõm Long; Quy Giáp Thạch ↔ Hõm Quy. Dễ nhầm khi đọc nhanh | 07 §5 ↔ 07 §4 (đã sửa §8) | Giữ tên nhưng silhouette và màu khác hẳn pit; hoặc A/C đổi tên display |
| M6 | `jungle.respawn_s` là một số, nhưng 08 §6.3 bắt camp đóng/ngừng khi Titan đi | manifest ↔ 08 §6.3 | Khi ký, thêm trường pause hoặc ghi rõ “timer dừng khi lock” |
| M7 | 31 gọi `river_serpent` là “camp sông”, nhưng 07 có 12 camp và không có camp sông | 31 ↔ 07 §5 | Giữ `enabled:false, sandboxOnly` như objectives.yml; không thêm camp thứ 13 |
| M8 | Tên công trình: 08 §7 dùng “Trấn Mạch”, 02 dùng “Trụ Mạch” cho tower và Keep cho T2 | 08 ↔ 02 | Đối chiếu glossary 05 trước khi viết string UI |

---

## 10. Việc tiếp theo (theo 80 “Thứ tự”)

Creator trả lời 5 câu (+ Q6–Q9) → G1 chạy → ký G2 (điền TBD #2–#8, #11 trong greybox) → G3 place → minimap G5 (#1) → art shell 9 mạch theo §2 (G6). Balance Lab chạy #9, #10, #13 song song, không chặn greybox.

---

## Audit Savi 11-10

Audit độc lập (creator: "ko tự mặc định chấp nhận"). Số tính lại bằng python từ `data/cuu-mach-manifest.yml` (điểm = doc 07 §7); trích dẫn mở file kiểm. Chỉ sửa tài liệu, không tọa độ mới.

**Trạng thái quyết định:** Q6=A, Q7=A: creator OK 11-10 (#'ok làm đi'), chờ kiểm greybox (traverseCheck) — chưa ký G2.

| # | Điểm | Nguồn | Đúng/sai | Sửa |
|---|---|---|---|---|
| 1 | Độ dài lane Thượng/Giữa/Hạ 480,3/326,4/480,3 m | manifest `lanes.*.points` → 480,345/326,441/480,345 | Đúng | — |
| 2 | Gate→gate ≈79 s/54 s ở 6,1 m/s | tính: 78,75/53,51 s | Đúng | — |
| 3 | Mạch Giữa 1v1 143,7 m | `scripts/lib/data/map.yml` → 143,698 | Đúng | — |
| 4 | Hõm Long ≈50 m tới điểm lane (45,134,5) | tâm pit (52,85): 49,99 m; tới lane Hạ gần nhất 49,5 m | Đúng | — |
| 5 | Hõm Long xa lane Giữa ≈97 m | khoảng cách tới polyline Giữa = 99,495 m | **Sai** | §3 sửa thành ≈99,5 m. Hõm Quy đối xứng: 49,5 / 99,5 m |
| 6 | Sông theo x = z, mỗi lane biên cắt sông đúng 1 lần | manifest: Thượng chỉ đổi dấu (x−z) ở đoạn (−144,−108)→(−108,−144), giao (−126,−126); Hạ đối xứng (126,126) | Đúng | — |
| 7 | Bến Biên = góc (−144…−108, −108…−144) và đối xứng | đoạn lane trên vuông góc trục sông; phần nằm trong băng sông rộng 32 m dài đúng 32 m | Đúng | — |
| 8 | Sông 420×32, yaw 45°, đáy −3,2; cầu tâm 34×78; lane rộng Thượng 14 / Giữa 18 / Hạ 14 (đã sửa §8) | manifest `river`, `lanes.*.width` | Đúng | — |
| 9 | 27 §7 là gate owner | 27 §7 "Owner gates — không suy đoán" | Đúng | — |
| 10 | M1 camera 27 §7 (17 m, 11–26) ↔ `camera.yml` (11, 8–26) | 27 §7; `scripts/lib/data/camera.yml` distance 11, min 8, max 26 | Đúng (mâu thuẫn thật) | — |
| 11 | Mạch Đăng 6–8 đèn ứng viên | doc 61 §2 (prototype 2 đèn, Cửu Mạch 6–8 ứng viên) | Đúng | — |
| 12 | Hải Tâm không thủy triều, tháp ký ức | doc 81 dòng 6, 10, 14 | Đúng | — |
| 13 | Merc wave "lane gần nhất" (08 §5) | câu nằm ở 08 §6.3 (dòng 173); §5.2 chỉ định nghĩa merc camp | **Sai mục** | Trích đổi thành 08 §6.3 |
| 14 | M6: camp đóng khi Titan đi (08 §5) | 08 §6.3 dòng 172 | **Sai mục** (nội dung đúng) | Trích đổi thành 08 §6.3; dòng "08 §5–6" ở §4 giữ (bao gồm §6) |
| 15 | 07 §4 không spawn quái trung lập trong pit (M3) | 07 §4 | Đúng (mâu thuẫn thật: id `drake`/`titan`) | — |
| 16 | M7 `river_serpent` "camp sông" ↔ 07 12 camp | doc 31; 07 §5 | Đúng (mâu thuẫn thật) | — |
| 17 | M8 Trụ Mạch/Trấn Mạch | 05 glossary: Trụ Mạch = tower, Trấn Mạch = keep/T2; 08 "Trấn Mạch T2" | Đúng một phần: 05 đã phân định, nên không hẳn mâu thuẫn mà là nhầm nghĩa nếu không đọc 05 | Ghi chú: dùng 05 làm chuẩn string |
| 18 | M2 07 §9 so với `map.yml` (Mạch Giữa 1v1) | `map.yml` là lane 1v1 dài 143,7 m | Đúng (mâu thuẫn thật) | — |
| 19 | M4, M5 tên trùng | 02 §3, 07 §5 | Đã kiểm ở doc 85 §8 (#37–38) | M5 sửa nguồn |
| 20 | "Vị trí Titan trồi chỉ có cho Mạch Giữa" (35 §3, qua doc 80) | doc 35 | Đúng: 35:44–50 (doc 85 §8 #44) | — |

**Mâu thuẫn thêm**
- M9: doc 80 §G2 "Còn thiếu" chưa có dòng Q6/Q7 nào; trạng thái nay ghi ở 80 (thêm trong audit này).
- M10: manifest `lanes.*.length_m` để `TBD` nhưng note ghi ≈480,3/326,4 — nhất quán với file header ("số tính ra không ghi ở đây"), chỉ là note; không sửa.

**Rủi ro Q6-A (lội cạn) — chưa phải mâu thuẫn, phải chứng bằng greybox**
- Độ sâu: đáy −3,2 so với mặt lane/cầu 0 → mỗi bờ hạ 3,2 m. Engine: controller từ chối dốc > 45° (`engine-reference/skills/heightmap-terrain.md`). Dốc 20° cần ram ≥ 8,8 m mỗi bờ (17,6 m tổng), vừa trong 32 m băng sông; doc 07 không ghi dạng bờ → greybox phải tự đặt, **không** tọa độ mới trong doc.
- Mực nước `TBD`: nếu mark nước cao hơn đáy, hero/lính có thể vào chế độ bơi giữa lane → đổi tốc độ, lệch 79 s. Điều kiện: mực nước ≤ đáy bến, hoặc bến là bậc nông ngoài mark nước.
- Rộng 14 m giữ được; lane Thượng cắt vuông góc trục sông nên không tranh chỗ cầu tâm 34×78 (cách ~178 m).
- Nav lính/bot (`findPath`) và tầm nhìn bụi/đèn qua chênh 3,2 m chưa kiểm. Done khi `traverseCheck` gate→gate PASS_ENGINE cả hai lane biên, thời gian đi lệch ≤ 5% so với 78,75 s.

**Tổng:** 20 điểm, 3 sai (1 số, 2 trích sai mục), 2 chưa kiểm lại; 0 câu cần creator mới.
