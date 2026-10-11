# 81 · Hải Tâm — Thành Phố Ký Ức Chìm (map 5v5 số 2 · CONCEPT)

**Luồng B · chỉ tài liệu.** Creator duyệt concept 11-10 (NO-TON “KẾ HOẠCH 5 LUỒNG”). Trạng thái: CONCEPT, NOT_TESTED.

> ⛔ **Hai luật cứng**
> 1. **KHÔNG có cơ chế thuỷ triều/nước dâng làm đổi đường.** Nước là cảnh. Mọi lane, cầu, nền nổi luôn đi được, suốt trận, mọi phút. Không mở/đóng lối theo thời gian.
> 2. **Không 3D, không greybox, không tọa độ** cho tới khi Cửu Mạch có manifest đã ký + qua cổng G1–G6 ([80](80-cuu-mach-gate.md)). Mọi số ở đây là tỉ lệ/tương đối; tọa độ mét sẽ đặt theo chuẩn manifest Cửu Mạch.

## 1. Một dòng
Năm đội Cổ Linh giành nhau trái tim một kinh thành cổ đã chìm dưới biển, đánh trên cầu đá và nền đường nổi, giữa những tháp ký ức còn sáng dưới nước.

## 2. Lore (theo thế giới Cổ Linh)
- Năm 2300, mũi khoan Tinh Thạch Ký Ức ngoài thềm biển Đông chạm một tầng tinh thạch **mặn**: ký ức ở đây không nằm trong đá núi mà ngấm trong nước. Đồng bộ với nó, người chơi thấy **Hải Tâm**, thủ phủ ven biển của nền văn minh thần tính một triệu năm trước.
- Hải Tâm chìm trong một đêm khi các liên minh cổ xé đôi Mạch Hải. Thành không vỡ: nó *ghi nhớ*. Các **tháp ký ức** (Đăng Ký Tháp) vẫn phát sáng dưới mặt nước, mỗi tháp giữ một trận đánh cũ.
- Cửu Mạch là trận trên **đất liền, mạch núi**; Hải Tâm là trận trên **biển, mạch nước**. Minh Ước giữ bờ Đông (cảng đá, ánh vàng-lam), Triều Vực giữ bờ Tây (cung điện san hô đá, ánh tím-đỏ) — cùng phe của Cửu Mạch, đổi sân.
- Thuồng Luồng là chủ cũ của Mạch Hải; ở Hải Tâm, The Call đánh thức nó từ lòng giếng thành (tham chiếu 35; số boss vẫn TẠM).

## 3. Topology — 3 lane, đối xứng tâm (x,z)→(−x,−z)

Hướng như Cửu Mạch: Xanh dưới-trái, Đỏ trên-phải, sông chéo. Khác biệt: “sông” là **vịnh nước sâu không đi được**; lối qua chỉ có cầu và nền nổi cố định.

```
  [ĐỎ]  ══════════ Lane Thượng (đê đá thẳng, cầu vòm) ══════════ R·base
   ║                                                    ┌──────┐   ║
   ║  b-jg-2      ≈≈≈ Vịnh Tây ≈≈≈        r-jg-1 [Hõm   │ R-T2 │   ║
   ║ (cảng đổ)   ⊙ Tháp KÝ ỨC Bắc      (cung điện) ĐĂNG]└──────┘   ║
 Lane                ╲      ≈≈≈≈≈≈≈≈        ╱                    Lane
 Thượng        nền nổi ╲  ≈≈ QUẢNG TRƯỜNG ≈≈ ╱ nền nổi              Hạ
   ║                    ╲≈≈  CHÌM (giữa)  ≈≈╱                       ║
   ║             Lane Giữa: cầu đá dài nhất, 1 trục chéo            ║
   ║                    ╱≈≈   ⊙ GIẾNG THÀNH ≈≈╲                     ║
   ║              nền nổi ≈≈ (The Call)  ≈≈ ╲ nền nổi              ║
   ║ b-jg-1 [Hõm   ⊙ Tháp KÝ ỨC Nam  ≈≈≈ Vịnh Đông ≈≈≈  r-jg-2      ║
   ║ ┌──────┐ ĐĂNG]    (cung điện)         (cảng đổ)                ║
 B·base │ B-T2 │                                                    ║
  [XANH] ══════════ Lane Hạ (đê đá thẳng, cầu vòm) ════════════  [ĐỎ]
```
(phác ý, không theo tỉ lệ; `⊙` = điểm sáng cao nhất trong khung hình)

**Node list** (mỗi node Xanh có ảnh đối xứng Đỏ):

| Node | Loại | Ảnh đối xứng | Ghi chú |
|---|---|---|---|
| B-base / R-base | căn cứ + fountain + Tâm Mạch | nhau | cảng đá Xanh / cung điện san hô Đỏ |
| B-top-T1,T2 / R-bot-T1,T2 | trụ lane Thượng/Hạ | nhau | trên đê đá |
| B-mid-T1,T2 / R-mid-T1,T2 | trụ lane Giữa | nhau | đầu cầu dài |
| B-bot-T1,T2 / R-top-T1,T2 | trụ lane Hạ/Thượng | nhau | |
| L-top, L-mid, L-bot | lane | top↔bot, mid tự đối xứng | Mid = cầu đá liền; biên = đê + 1 cầu vòm qua vịnh |
| P-N, P-S | nền đường nổi (4 cái, 2/phía) | P-N↔P-S | nối lane biên ↔ quảng trường; **cố định, luôn đi được** |
| W-centre | Giếng Thành — Trial Pit The Call | tự đối xứng | **một** pit trung tâm (khác Cửu Mạch: 2 pit) — chờ creator, xem §6 |
| MT-N, MT-S | Tháp Ký Ức Bắc/Nam | nhau | landmark + vision (đề xuất, §6) |
| b-jg-1..6 / r-jg-1..6 | camp rừng | nhau | 6/phe như Cửu Mạch, đặt trong phố chìm cạn (nước ngang mắt cá = sàn đi được) |
| Bụi | rong biển cao / mái vòm sập | nhau | 12/phe, cùng luật bụi Cửu Mạch |

Bất biến topology (kiểm khi có tọa độ): 3 lane, 2 trụ/lane/phe, 12 camp, 24 bụi, mọi node có ảnh đối xứng; số lối qua vịnh mỗi phe bằng nhau.

## 4. Landmark từng vùng

| Vùng | Landmark | Đọc ở camera trận |
|---|---|---|
| Căn cứ Xanh (Minh Ước) | Cảng đá bậc thang, cột neo đồng, buồm đá vàng | khối vàng-lam ấm góc dưới-trái |
| Căn cứ Đỏ (Triều Vực) | Cung điện san hô đá, mái vòm tím | khối tím-đỏ góc trên-phải |
| Lane biên | Đê đá thẳng, lan can sóng, một cầu vòm cao qua vịnh | đường sáng thẳng, mép nước rõ |
| Lane Giữa | Cầu đá dài nhất, trụ cầu tạc rùa (Quy) | trục chéo duy nhất băng nước |
| Quảng trường chìm | Sàn đá cạn dưới 10 cm nước, vòng hoa văn trống đồng (điểm nhấn) | mặt gương phản tháp sáng |
| Giếng Thành (pit) | Miệng giếng tròn, vòng ký tự cổ phát sáng khi Call mở | vòng sáng duy nhất ở tâm |
| Tháp Ký Ức | Tháp nghiêng nửa chìm, khe phát sáng lục-ngọc, hình ký ức trôi trên mặt nước | điểm sáng cao nhất mỗi nửa map |
| Rừng (phố chìm) | Nhà mái cong ngập ngang hông, chợ đá, thuyền đá đổ | tối hơn lane, viền đá sáng |

Đông Sơn chỉ là điểm nhấn (design.md): vòng trống ở quảng trường + chim Lạc trên trụ cầu; phần còn lại là kiến trúc biển fantasy.

## 5. Palette

| Vai trò | Màu (oklch) | Ghi chú |
|---|---|---|
| Nước sâu (vịnh, không đi) | oklch(0.32 0.07 230) | tối, bão hoà thấp — đọc là “không vào” |
| Nước cạn (sàn đi được) | oklch(0.62 0.08 195) | sáng hơn rõ, thấy đá dưới |
| Đá cầu/đê | oklch(0.74 0.03 85) | đá vôi ấm — lane đọc như đường sáng |
| Rêu/ rong | oklch(0.48 0.09 150) | rừng |
| Ánh Tháp Ký Ức | oklch(0.85 0.14 170) | lục-ngọc, chỉ ở tháp + giếng |
| Xanh / Đỏ đội | #4fd8ff / #ff5560 | giữ đúng màu đội của game |

Cấm: đỏ/cam cảnh báo trong cảnh (dành cho telegraph combat, 07 §8 `art_fx`). Ánh tháp không trùng màu đội.

## 6. Đọc ở camera khoá

Camera `scripts/lib/data/camera.yml`: pitch 56°, distance 11 (zoom 8–26), fov 42, đỏ xoay 180°.
- **Đi được / không đi được** phải đọc bằng *độ sáng*, không bằng chi tiết: nước sâu tối, sàn cạn + đá sáng. Ranh giới có lan can thấp hoặc gờ đá ≥ 0,4 m.
- Không vật gì cao > ~7 m ở ven lane (luật Mạch Giữa: `cliffHeight 7`), để góc 56° không bị che. Tháp Ký Ức đặt xa lane, nghiêng ra ngoài.
- Phản chiếu nước: chỉ ánh tháp + vòng giếng, không phản chiếu tướng (giữ hiệu năng và không nhầm hai bóng).
- Cầu dài lane Giữa: lan can thấp, không mái che — kỹ năng skillshot phải nhìn rõ trên mặt cầu.

## 7. Chơi khác Cửu Mạch ở đâu

| | Cửu Mạch | Hải Tâm |
|---|---|---|
| Ngăn cách | sông 32 m có cầu tâm | vịnh sâu không đi được; chỉ cầu + nền nổi cố định |
| Lối qua giữa hai nửa | rộng | **hẹp, ít, đoán được** → bẫy/phục kích ở đầu cầu |
| Objective | 2 Trial Pit, luân phiên | đề xuất 1 Giếng Thành trung tâm (tụ giao tranh) |
| Rừng | rừng núi, tầm nhìn khép | phố chìm, đường thẳng, tầm nhìn dài dọc phố |
| Landmark vision | — | đề xuất: Tháp Ký Ức đứng cạnh = thấy vùng quanh tháp (không gây sát thương) |

Đề xuất 1 pit + Tháp vision là **đổi gameplay**, phải creator duyệt; mặc định nếu không duyệt: giữ y luật Cửu Mạch (2 pit, không vision tháp).

## 8. Cổng trước khi làm 3D
1. Cửu Mạch: manifest `SIGNED` + G1–G6 xong (doc 80).
2. Creator duyệt §7 (1 hay 2 pit; có/không vision tháp).
3. Viết `data/hai-tam-manifest.yml` cùng schema Cửu Mạch, kiểm đối xứng bằng cùng script (PASS_MODEL).
4. Mới greybox. Thuỷ triều đổi đường: **không bao giờ** trong V1.
