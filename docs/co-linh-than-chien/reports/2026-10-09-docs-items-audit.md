# Hội đồng audit docs và hệ vật phẩm — 09/10/2026

Nguồn cố định: `ad7948ab9710ac1adb2b561049821da8e0cb1da8`. Ba reviewer độc lập: thiết kế/nội dung, luật runtime/kiến trúc, combat/kinh tế. Root tổng hợp và nghiên cứu online; không sửa runtime, không chạy mô phỏng mới, không push. Checkout dirty giữ nguyên; nguồn mới đọc bằng git show. Báo cáo local không tự trở thành bản remote.

Phạm vi đối chiếu: nhóm docs 01–57 (remote không có 52, có hai file số 54), README/design, YAML hiện hành, consumer runtime liên quan và các sửa/audit local. Kết luận dưới đây là **source review**, không nghiệm thu client. Tài liệu lịch sử/legacy dùng để truy vết, không nhập luật của chúng vào game. Không tuyên bố đã kiểm trực tiếp mọi asset hay đọc lại mọi log evidence trong các thư mục con.

## Ba nhóm ưu tiên cho Savi

### 1. Hệ đồ cần thiết kế lại đường tiến triển

- Tám món chưa có tier/recipe. Giáp Thiết thực tế **40 giáp +220 HP/450 vàng**, không phải +200 HP. Hai bản sao chỉ kém Giáp Minh Ước 40 HP nhưng rẻ hơn 150 vàng, đánh đổi một ô túi.
- Một Giáp Thiết làm EHP vật lý Nham Vũ L1 tăng khoảng 89.5% theo công thức hiện hành; đây là phép tính tĩnh, không phải chứng minh win rate.
- Các bản sao cộng HP/giáp và nhân tốc đánh; nội tại thirdHit chỉ kiểm có món hay không. Luật stack chưa đủ rõ.
- Runtime chưa có cây ghép; simulator dùng stats theo 1000 vàng thay vì inventory thật, có AP/MR/pen mà shop chưa có. Không dùng kết quả đó duyệt số đồ mới.
- Doc08 còn lên cấp hồi 35% HP, trong khi economy.yml đã bỏ theo owner 09/10; hồi căn cứ/recall trong prose cũng lệch data. Sửa prose theo nguồn mới, không khôi phục luật cũ.

Hướng và kế hoạch: [58 — nghiên cứu và thiết kế hệ item](../58-nghien-cuu-va-thiet-ke-he-item.md). Ba tầng cơ bản/trung cấp/hoàn chỉnh; core là vai trò trong build. Giữ số ship cho tới lượt tune mới.

### 2. Luật hiện hành và kiến trúc phải cùng một bản

| Mâu thuẫn | Bản sửa cần làm |
|---|---|
| README, doc48 và design dòng lịch sử nói main duy nhất, chưa tách sanh; source đã split và hai referee | Gắn nhãn lịch sử vào quyết định cũ; mục hiện hành dẫn doc51/53 và cập nhật tóm tắt design. |
| Doc14 B0.8 v2, D16/doc51/doc53 còn 60s | Design chốt disconnect bot thay/ghế giữ, phòng không ai 15 phút dọn; core ABANDON_MS=900000 và match holdUntil theo luật mới. Đồng bộ schema/acceptance; evidence 60s giữ lịch sử. |
| D7/doc06/doc13/ECON-02 cho mua khi chết mọi nơi | Theo owner và buy/sell: chỉ trong shopRadius căn cứ, đủ vàng/ô. Chết không tạo ngoại lệ mua xa. |
| Doc14 vừa mở vừa khoá Đấu Máy; Sân Tập nói không bot Đỏ | Đồng bộ bảng mode với seatBots hiện hành: solo có bot Đỏ. Sân Tập vẫn khác Đấu Máy về kết quả. |
| PICK-01 cấm trùng trong đội và timeout random | Theo luật mới: PvP cấm trùng cả trận; tướng hợp lệ đang hiện là lựa chọn, hết giờ giữ. |
| Doc57 dùng 450KB như cổng bắt buộc; docs khác 500/520KB | Chốt lại một dòng mục tiêu/code đo hiện hành có nguồn quyết định. Không gọi số cũ là FAIL mới hoặc âm thầm duyệt mức tăng. |

Không bắt làm lại split, model routing hay HUD chỉ vì doc cũ nói chưa làm. Mobile thật và cold-cache còn thiếu evidence, ghi mở nhưng không biến tất cả thành chặn việc designer xây cây đồ.

### 3. Brief tướng/VFX/map và backlog cần cập nhật authority

- **Hỏa Tủy Q:** doc03/doc25 ghi hất tung; heroes.yml và doc56 là stun 0.75s. Đồng bộ brief với data đã ship; không tự đổi chiêu sang hất tung.
- **Nham Vũ Q:** brief hình quạt đối lập doc56 dải ba tên song song. Cần giữ một mô tả theo consumer hiện hành rồi sửa cả tooltip/VFX/animation.
- **Call/Titan:** doc35 mở Call Đấu Máy nhưng Slice doc14 tắt. Boss prototype/GLB không đồng nghĩa objective được bật. Doc36 đã có Thuồng Luồng crystal v2 +8clip; doc57 H3 không giao lại dựng 3D+7clip từ đầu.
- **VFX:** doc41 nói chưa có trạng thái; doc54 TODO cũ khác 56. Ghi 54–56 cập nhật behavior, 30 giữ phần presentation còn áp dụng; không ép GLASS cho gameplay chính hay tăng thân đạn vượt width. Audit source 0 issues chưa phải PASS client, A8 còn NOT RUN.
- **Camera:** doc27 G4 vừa chốt vừa BLOCKED, doc25 còn gate cũ; cập nhật camera.yml hiện distance11/min8/mobile9.5. Không xin duyệt lại mốc cũ distance17/min11.
- **Map/glossary:** Mạch Giữa là map một lane riêng, không phải lane giữa Cửu Mạch. Doc05 cấm dịch tên tổ chức nhưng bảng lại The Concord/The Unbinding Tide; thống nhất quy tắc proper-name/localization rồi dùng cho lore/intro. Mạch Giữa hiện tại và Cửu Mạch 5v5 ba lane không gộp tọa độ từ ảnh.

## Giao việc ngắn

Savi sửa canonical docs theo ba nhóm trên, dùng link thay bản sao. Ưu tiên cây đồ + luật shop + sim cùng data; song song đồng bộ tóm tắt luật/brief đã thay. 21 tướng, rừng/map5v5 và intro giữ roadmap có kế hoạch; không lấy chúng làm điều kiện phải xong trước Slice sáu tướng.

**Kết luận:** docs có thể tiếp tục phục vụ phát triển, nhưng chưa đủ để agent tự dựng hệ trang bị hoàn chỉnh mà không đoán. Doc58 là hướng thiết kế và giao việc; bảng stats item mới chưa được duyệt cân bằng. Không có PASS client hay production-ready mới từ lượt audit này.
