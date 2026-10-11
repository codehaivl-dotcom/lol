# 54 · Sảnh mobile theo 5 ảnh mẫu (2026-10-09)

Nguồn: ảnh mẫu mobile của lukasai (#41xxx, 5 ảnh). Luật: "Đây là ý tưởng thôi. Còn content phải khớp với desktop".
=> Bố cục/không khí lấy theo ảnh; NỘI DUNG chỉ là những gì desktop đang có. Không vàng, kim cương, thư, đấu hạng,
bang hội, nhiệm vụ, tìm kiếm, trang phục nếu desktop chưa có. Chỉ ngang (landscape). Desktop không đổi.

## Khung chung
- Mobile = `mobile === true` trong mọi screen(c, mobile). Canvas thiết kế 844×390, scale bằng profile (foundation/profile.js).
- Trang chủ: thanh trên (avatar + tên Spawn, VI/EN) và thanh điều hướng dưới: Trang Chủ · Tướng · Chiến Đấu(room) · Vinh Danh · Truyền Thuyết.
- Màn con (Chiến Đấu, Tướng, Vinh Danh, Truyền Thuyết): mũi tên ‹ + tiêu đề góc trái trên, về Trang chủ; không thanh dưới.
- Tránh rail phải của Spawn (var(--spawn-chrome-reservation-right-inset)) và safe-area trái. Vùng chạm ≥ 44 px.
- 0 inline style ngoài biến CSS động; CSS theo màn; token từ ui/foundation/tokens.js.

## TODO
- [ ] Shell + Trang chủ mobile (Savi): thanh trên, thanh dưới, thẻ Tinh Thạch (→lore), thẻ thành tích Vinh Danh (→hall), 3 nút chế độ, tướng 3D giữa.
- [ ] Chiến Đấu mobile (wisp): dải đội, cổng giữa + Bắt đầu/Thoát, cột phải bản đồ + Tinh Thạch, 4 thẻ chế độ (có Cửu Mạch khoá).
- [ ] Tướng mobile (wisp): lưới tướng 3 cột + lọc vai trò, tướng 3D giữa, panel phải: tên, vai trò, chỉ số, kỹ năng, cốt truyện, Dùng Thử/Chơi.
- [ ] Vinh Danh mobile (wisp): tab, bục top 3, bảng, panel "thành tích của bạn".
- [ ] Truyền Thuyết mobile (wisp): chương trái, tiêu đề + đoạn giữa, thẻ Tinh Thạch phải, dòng thời gian dưới.
- [ ] Audit: chụp từng màn ở 844×390 VI + EN (giả lập, ghi rõ giả lập); cảm ứng thật NOT RUN.
