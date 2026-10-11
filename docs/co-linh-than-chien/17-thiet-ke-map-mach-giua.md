# 17 — Bản thiết kế/research map Mạch Giữa (tài liệu lịch sử, cần đối chiếu)

> **Trạng thái đã kiểm tra trực tiếp ngày 2026-10-07:** câu “V2 … chờ duyệt, duyệt xong mới dựng” ở bản cũ không còn mô tả đúng repo hiện tại. `scripts/lib/data/map.yml` đang được `scripts/terrain.js`, `scripts/lane.js`, `scripts/ui.js` và `scripts/lib/lobby-ui.js` import; file tự ghi “Mạch Giữa V2” và định nghĩa **một lane**, 4 trụ, 12 bụi, 4 hốc nấp. `places/main/config.yaml` dùng terrain generator hiện hành; scene có 4 trụ và 12 bụi trong `places/main/cells/x0z0.scene`, cùng hai Tâm Mạch/đài suối trong các cell tương ứng. Vì vậy runtime đang dùng data Mạch Giữa một lane, không phải layout Cửu Mạch ba lane ở doc 07.
>
> **Nguồn sự thật cho runtime hiện hành:** `scripts/lib/data/map.yml` là data hình học mà các consumer đang nạp; `places/main/config.yaml` và `places/main/cells/*.scene` là terrain/placement được dựng trong place. Nội dung bên dưới là proposal/research, không ghi đè hai nguồn này. Có các sai khác cần xem là **DISPUTED / không dùng làm chỉ dẫn build** cho tới khi được đối chiếu: doc này ghi T1/T2 tại nhiều vị trí khác nhau giữa phần tổng quan và §3, trong khi runtime có T1 ở ±31.5/±31.5 và T2 ở ±56.7/±56.7; hốc nấp runtime đặt tại ±46/0 và 0/±46, khác các tọa độ ở §5; §4 liệt kê 8 bụi dù runtime có 12 hàng bụi. Các đề xuất trụ, đường, kích thước, màu, decor và nghiệm thu phía dưới cũng không được coi là đã triển khai chỉ vì một phần data/scene đang tồn tại.
>
> Tài liệu này không quyết định hình học 1v1. Trình tự hiện hành là hoàn tất/nghiệm thu trận thử 1v1 trước, rồi mới làm map 5v5 ba đường theo [27 — Handoff map 5v5 ba đường](27-handoff-map-5v5-ba-duong.md). Layout ba đường có tham chiếu riêng ở [07 — Layout map Cửu Mạch](07-layout-ban-do-v1.md).

Sơ đồ V2: `/cdn/value.70a3499808b47723614ec5bbee31a2ca5d67addcd6cdfb88cb4c0e5958bdfbef.png` (Xanh dưới-trái, Đỏ trên-phải). Sơ đồ V1 cũ: `/cdn/value.196801c811392459d499b3c7a796ebf812c9ce852223231e1c2f0edaf43b231e.png`.

## Thay đổi V2 (theo research 18)

- **Thu toàn bộ map Mạch Giữa lại 0,7×.** T1 ở (∓30, ±21), T2 ở (∓57, ±44), Tâm Mạch ở (∓92, ±92), suối ở (∓112, ±112). Khoảng cách T1 đến T1 giảm từ 127 m xuống ~74 m, tức từ 20 s chạy xuống ~12 s. Đây là thay đổi dữ liệu gameplay (`map.yml` và doc 07), cần creator duyệt.
- Tầm trụ giảm từ 16 xuống 14 m, theo tỉ lệ của LoL.
- Bờ chiến hẹp lại còn ±22 m. Hốc nấp dời vào (∓40, ±6) và (∓6, ±40), có 2 miệng.
- Có 12 bụi: 4 bụi sông, 4 bụi sau hông T1, 4 bụi trong hốc.
- Vách là rừng đa và đá thay cho đá trơn.

Nhận xét của creator: "map design cần rõ con đường combat hơn nữa" · "ko làm chắp vá. Lên plan 1 map nghiêm túc. Đường đi., decor. Trụ. Bãi cỏ để nấp.."

## 0. Nguyên tắc (đọc từ góc camera khóa, pitch −56°)

1. **Ba tầng đọc**: ĐƯỜNG (sáng nhất, đá lát vàng ấm) → BỜ CHIẾN (cỏ, trung tính, nơi né/đứng) → VÁCH (tối, đá, không đi được). Nhìn 0,5 giây là biết đứng đâu được.
2. **Mọi thứ đi được đều sáng hơn mọi thứ không đi được.** Decor cao chỉ đứng trên vách.
3. **Màu phe chỉ ở công trình + cột mốc**: lam = Xanh, đỏ = Đỏ. Không dùng 2 màu này cho decor trung tính. Đông Sơn chỉ là điểm nhấn (luật game).
4. **Đối xứng tâm** (x,z)→(−x,−z) cho mọi thứ có gameplay. Decor được lệch nhẹ để map sống.
5. V2 đổi dữ liệu gameplay: tỉ lệ 0,7×, xem phần Thay đổi V2. Phép đối xứng và thứ tự waypoint vẫn giữ nguyên.

## 1. Khung kích thước (số V1; V2 nhân 0,7 trừ bề rộng đường 18 m)

| Vùng | Bề rộng / bán kính | Vai trò |
|---|---|---|
| Đường combat (lõi) | 18 m (±9 quanh tim lane) | lính đi, trụ bắn, giao tranh |
| Bờ chiến | ±9 → ±24 m | né chiêu, đi vòng, chứa bụi |
| Hốc nấp (mới) | 4 hốc, bán kính 13 m, khoét vào vách | gank / rút lui / ẩn |
| Vách | > 24 m, cao 15 m | biên map, không đi được |
| Căn cứ | bán kính 38 m | suối hồi + Tâm Mạch |
| Sông | rộng 32 m, chéo 45°, đáy −3,2 | chia đôi map, mốc giữa |
| Cầu | 34 × 78 m, cao 0 | trung tâm, điểm giao tranh chính |

Thời gian chạy (tốc 6 m/s): suối → T2 ≈ 10 s, T2 → T1 ≈ 8 s, T1 → cầu ≈ 9 s. Suối → cầu ≈ 27 s, vừa nhịp một đợt lính (30 s).

## 2. Đường đi (ĐƯỜNG combat)

- Mặt: đá lát cổ màu cát ấm, sáng hơn cỏ ~2 bậc. Mép đều (không răng cưa).
- **Viền**: bó vỉa đá thấp 2 bên (đã có), cao 0,2 m, không chặn đường.
- **Vạch phe**: nửa Xanh có đường khắc lam mảnh chạy giữa mặt lát, nửa Đỏ đỏ; gặp nhau ở cầu.
- **Cột mốc** mỗi 15 m hai bên (đã có 36 cột): giữ, nhưng chuyển thành không chắn đường (đứng ngoài viền 1 m).
- **Mũi tên vết mòn**: mặt lát mòn đậm hơn ở 2 vệt bánh lính, đọc hướng tiến công.
- Đường **không** có decor cao, không cây, không đá chắn. Chỉ có vết nứt, rêu khe, lá rụng.

## 3. Trụ (Trụ Mạch T1/T2) và vùng trụ

- Vị trí giữ nguyên: T1 (±45, ∓45), T2 (±81, ∓81). Tầm bắn 16 m.
- **Vòng tầm bắn vẽ lên đất**: vòng đá khắc mờ bán kính 16 m quanh mỗi trụ, sáng màu phe khi có tướng địch trong vòng (cảnh báo). Đây là thông tin gameplay số 1 của MOBA.
- **Bệ trụ**: bệ đá tròn 6 m, 3 bậc, mặt khắc trống đồng (điểm nhấn).
- Trụ gãy: **để lại đống đổ nát** + vòng tầm tắt; không biến mất (hiện tại biến mất, gap đã ghi).
- Sau T2: cổng căn cứ hai cột + vòm, báo "vào căn cứ".

## 4. Bãi cỏ để nấp (Tán Mạch / bụi)

8 bụi, đối xứng tâm. Bụi = cỏ cao 1,6 m dày, màu xanh lục đậm hơi lam (khác hẳn cỏ thường), đứng trong thì ẩn với địch ngoài bụi (luật đã có trong code).

| Bụi | Tâm (Xanh) | Kích thước | Vai trò |
|---|---|---|---|
| Sông trên / dưới | (−25,5; 4,5) / (−4,5; 25,5) | 4,5×9 | giữ cầu, phục kích (đã có data) |
| Hông T1 | (−58; 34) | 4×8 | đứng farm an toàn, gank vào T1 địch khi đã đẩy |
| Hốc nấp | (−64; 16) / (−16; 64) | 5×8 | mỗi hốc 1 bụi, lối vào rừng tương lai |
| Phe Đỏ | ảnh đối xứng của 4 bụi trên | — | — |

Mỗi bụi: mép có viền cỏ thấp để đọc ranh giới; khi mình đứng trong, bụi trong suốt 50 % + vòng sáng nhỏ dưới chân.

## 5. Hốc nấp (mới)

Bốn hốc khoét vào vách ở 2 bờ sông, gần cầu: (−64, 16), (−16, 64), (64, −16), (16, −64). Lối vào rộng 10 m từ bờ chiến. Bên trong: 1 bụi, 1 tảng đá lớn chắn tầm nhìn, đèn đá nhỏ. Đây là chỗ cho 3v3 sau này (gank, vòng ra sau), và là nơi để rừng / quái nối vào khi lên map 3 đường.

## 6. Decor (chỉ trên vách và bờ chiến)

| Lớp | Gì | Ở đâu | Luật |
|---|---|---|---|
| Vách | đá phân tầng, rễ đa đổ xuống, thác nhỏ ở 2 mép sông | > 24 m | cao, tối, không va chạm với tướng |
| Bờ chiến | đá vụn, cột đổ, đèn đá, cỏ lau ven sông | 12 – 24 m | thấp < 1 m, không chắn chiêu |
| Sông | đá đạp bước, lau sậy, đom đóm ánh nhẹ | trong sông, ngoài cầu | hiệu ứng nước khi lội |
| Cầu | lan can đá, 2 tượng chim Lạc hai đầu cầu | (0,0) | mốc trung tâm |
| Căn cứ | sân lát, cờ phe, đài suối hồi | bán kính 38 | màu phe đậm nhất |

Mật độ: mỗi khung hình camera trận (~40×25 m) có 1 điểm nhấn + 3-5 chi tiết nhỏ. Không rải đều.

## 7. Ánh sáng và định hướng

- Giờ: 13 h, nắng hơi chéo từ phía Xanh sang Đỏ để bóng đổ cùng hướng, đọc được độ cao.
- Không mảng tối loang trên đường. Mây bóng chỉ trên vách.
- Đèn: mỗi trụ 1 đèn màu phe, cầu 2 đèn ấm, hốc nấp 1 đèn lạnh mờ.
- Minimap khớp 3D: đường vàng, bụi xanh đậm, vách tối, trụ màu phe.

## 8. Đo nghiệm thu (Savi tự test trước khi nộp)

1. Từ camera trận ở 6 điểm (suối, T2, T1, cầu, hốc, bụi): nhìn ảnh là chỉ ra được đường, bờ, vách. Chụp 6 ảnh nộp.
2. Đi bộ từ suối Xanh tới suối Đỏ không kẹt; vào/ra 4 hốc không kẹt.
3. Đứng trong mỗi bụi: bot địch ngoài bụi không nhắm được.
4. Vòng tầm trụ sáng khi vào, tắt khi ra; trụ gãy để lại đổ nát.
5. Tải map: không thêm > 150 KB trước khung hình đầu.

## 9. Thứ tự dựng (mỗi bước xong mới sang bước sau)

1. **Địa hình**: corridor + 4 hốc + rìa sông trong `terrain.js` / `map.yml`; ba tầng màu.
2. **Đường**: mặt lát, viền, vạch phe, vết mòn.
3. **Trụ**: bệ, vòng tầm 16 m có cảnh báo, đổ nát khi gãy.
4. **Bụi**: 8 bụi theo §4, data `map.yml` + hiển thị + trong suốt khi đứng trong.
5. **Decor**: vách → bờ → sông → cầu → căn cứ.
6. **Ánh sáng + minimap** khớp.
7. **Test §8**, chụp 6 ảnh, cập nhật file gap.

## 10. Câu hỏi của proposal cũ (chưa xác nhận; không phải trạng thái runtime)

Các câu dưới đây được giữ lại làm lịch sử research; không dùng chúng để thay geometry 1v1 hoặc mở production map 5v5. Nếu cần quyết định liên quan map ba lane, dùng owner gates ở doc 26.

- Hốc nấp: 4 hốc như trên, hay bạn muốn ít hơn cho 1v1?
- Vòng tầm trụ luôn hiện mờ, hay chỉ hiện khi tướng đến gần (kiểu LoL)? Đề xuất: chỉ hiện khi trong 22 m.
- Giờ chiều 16h (vàng, đẹp) hay 13h (rõ)? Đề xuất 13h cho trận.
