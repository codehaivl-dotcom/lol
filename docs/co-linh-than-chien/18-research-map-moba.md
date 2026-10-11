# 18 — Research map MOBA cho Mạch Giữa

Creator yêu cầu: "bạn làm research game moba rồi design" (2026-10-07). File này là phần research. Bản thiết kế dựa trên nó nằm ở 17 (V2).

## Nguồn đã đọc

- Riot Phlox, "/dev: Season 2024 Map Changes" (leagueoflegends.com, 2023-11-23): bàn về công bằng hai phe, bụi sông, an toàn cho đường giữa, nhiều lối vào thay cho một chỗ thắt.
- Wiki LoL (Lanes, Turret, Movement speed): lane rộng ~1000 unit, tầm trụ 750 unit, tốc chạy tướng 325–355 unit/s, sóng lính mỗi 30 s.
- gamedesignskills.com, "MOBA Game Design" (Alexander Brazie, từng làm ở Riot): nền tảng là tính nhất quán và độ rõ hình ảnh. Rừng/bụi là chỗ để thoát và để phục kích. Dota dùng cây làm tường.
- Wiki Arena of Valor (Gameplay, How to Play): 3 lane, bụi để phục kích, map gọn cho trận ngắn trên điện thoại.
- Không đọc được: blog dev Fault (HTTP 525).

## Quy đổi sang mét của game mình

Lấy tốc chạy làm chuẩn: LoL 345 unit/s tương đương tướng mình 6,2 m/s, nên **1 m ≈ 55 unit**.

| Đại lượng | LoL (unit) | Quy ra m | Mình hiện tại | Kết luận |
|---|---:|---:|---:|---|
| Bề rộng lane | ~1000 | 18 | 18 | ✅ giữ |
| Tầm trụ | 750 | 13,5 | 16 | hơi rộng, đề xuất 14 |
| Tầm đánh xa | 550 | 10 | 9–11 | ✅ |
| Tầm đánh cận chiến | 125–175 | 2,3–3,2 | 3 | ✅ |
| T1 đến T1 (đường giữa) | ~3700 | ~68 | **127** | ❌ dài gần gấp đôi |
| T1 đến T2 cùng phe | ~1800 | ~32 | 51 | ❌ dài |
| Tầm trụ ÷ tốc chạy | 2,2 s | — | 2,6 s | ổn |

Đây là quy đổi xấp xỉ từ số liệu wiki, không phải số đo trong game LoL.

**Phát hiện chính:** lane mình đủ rộng nhưng quá dài. Hai T1 cách nhau 127 m, tức là chạy 20 giây giữa hai trụ. Với 1v1 thì phần lớn thời gian chỉ là đi bộ trên đường trống, và đây là lý do lớn nhất khiến map thấy "không có chỗ combat".

## Bài học áp dụng

1. **Khoảng cách tạo nhịp.** Giữa hai T1 chỉ nên chạy ~11–13 s. Đề xuất thu cả map lại 0,7×: T1 cách tâm ~37 m, T1–T1 ~74 m.
2. **Bụi ở sông là điểm tranh chấp.** Riot đưa bụi vào giữa sông để bên nào cũng phải giành, không lệch về một phe. Mình giữ 2 bụi sông mỗi bên cầu, đặt đối xứng tâm.
3. **Đường giữa phải có đường lui an toàn.** Riot đẩy bụi giữa ra xa để người chơi có thêm khoảng 20 % thời gian phản ứng, và mở lối đi vòng an toàn. Bụi hông T1 của mình đặt **sau** trụ, không đặt ngang trụ.
4. **Nhiều lối vào, không một chỗ thắt.** Mỗi hốc nấp có 2 miệng, mở ra bờ chiến và bờ sông.
5. **Công bằng hai phe.** Mọi thứ có gameplay phải đối xứng tâm. Ánh nắng đổ theo trục chéo để không phe nào bị ngược sáng.
6. **Độ rõ là gameplay.** Trụ chỉ hiện vòng tầm khi mình lại gần, giống LoL. Bụi có màu riêng, khác hẳn cỏ thường. Liên Quân trên điện thoại dùng màu bụi bão hòa và đường lane sáng.
7. **Tường của Dota là cây.** Vách của mình nên là rừng đa + đá thay vì chỉ có đá trơn. Rừng đa vừa là biên map vừa là bản sắc của game.
8. **Map gọn cho trận ngắn (Liên Quân).** Trận thử 1v1 nhắm 8–12 phút, nên lane ngắn hơn LoL.
