# 66 · Bàn giao docs, catalog và tool cho Savi

09/10/2026. Đây là bộ docs/data/tool từ handoff Codex, đưa vào world theo yêu cầu trực tiếp của lukasai. Bản world trước khi đưa tài liệu: `45b49fc5a80c04a4be1483654e35a2c07a759af6`. Source đã đo trong handoff: `9351e23c6c6b4cc55a160dbf7aec268973b6394d`; không gọi đó là code mới nhất hay runtime hiện tại.

## Làm ngay

1. **Item:** đọc [63](63-item-integration-handoff.md), [59](59-he-trang-bi-de-xuat.md), lấy catalog 24 món ở [candidate-v01.json](../../tools/balance/items/candidate-v01.json). Savi đang sửa tám món live: giữ thay đổi đó, so với candidate trước khi chọn số. Candidate là đề xuất; dữ liệu eight legacy450/40/220 và1050/80/480 chỉ là snapshot9351, không khẳng định world còn những số ấy. Tích hợp một nguồn catalog cho shop/tướng/bot/combat/tooltip; nghiệm thu mua, ghép, bán, HP, nội tại và reconnect theo10ca doc63. Không tự kích hoạt catalog chỉ vì bộ model xanh.
2. **QA:** Codex chịu trách nhiệm review và chơi thử; ưu tiên item cùng sáu tướng/Mạch Giữa. Báo cáo ghi riêng mô hình và client. Không mở thêm vòng nghiên cứu hoặc lặp việc đã xong.
3. **Mạch Đăng:** [61](61-mach-dang-va-cong-tac-phong-thu.md), [65](65-vision-map-acceptance.md) và [tool](../../tools/balance/beacon/README.md) là prototype có số thử nghiệm; không tự biến thành luật đã ship. 5v5,21tướng,boss/rừng và lorefilm là roadmap.

## Đã đóng — không bàn lại

Chủ dự án xác nhận Sân Tập và reconnect đã fix, yêu cầu không bàn lại. Các dòng OPEN_DECISION trong report9351 là lịch sử; không giao Savi sửa lại mode/timeout. Giữ game hiện hành. Đây là xác nhận owner, không giả thành kết quả client Codex.

## Chạy tool

Tại repo, có Bun:

    bun tools/balance/production.mjs --portable --simulate

Bộ này đọc source fixtures9351 cóhash, không cần Git/network. Exit1 của4 diagnostic lịch sử vẫn giữ, không coi cả4 là bug live và không sửa gameplay để làm xanh. [Dashboard](../../reports/production-2026-10-09/index.html), [starter](../../reports/production-2026-10-09/item-starter-closure.md), [closure](../../reports/production-2026-10-09/production-closure.md).

Các diagramSVG trong báo cáo được giữ dưới dạng source `.svg.txt` phù hợp repo Spawn, dashboard nhúng hình trực tiếp. Tool vẫn xuất SVG khi chạy local. File ZIP/ảnh/AGENTS/skill local không thuộc lần đưa tài liệu này.


Source fixtureJS được lưu `.js.txt` để engine không xử lý chúng thành module game. Trình đọc snapshot hỗ trợ cả tên gốc và tên transport; hash source không đổi.
