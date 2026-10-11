# 43 · Nghiên cứu: Liên Quân / LoL tối ưu Sảnh → Chọn tướng → Trận → Kết quả

Ngày: 2026-10-08 · Trạng thái: **NGHIÊN CỨU + ĐỀ XUẤT**, chưa sửa code. Chờ lukasai duyệt.
Yêu cầu: "cần làm research nghiêm túc về liên quân mobile xem nó design game tối ưu thế nào ở lobby. Match, hero.. Cách ta đang làm chưa hợp lý" · "học theo. Ko ăn cắp kẻo bị kiện".

**Ranh giới pháp lý:** chỉ học **nguyên lý** (luồng màn hình, thứ tự tải, ngân sách, cách đo). Không chép hình, icon, tên chế độ, bố cục pixel, âm thanh, văn bản hay asset của Tencent/Riot. Mọi màn hình của Cổ Linh vẽ lại theo ngôn ngữ thiết kế riêng (doc 40).

## 1. Nguồn đã đọc (sơ cấp trước)

| # | Nguồn | Loại |
|---|---|---|
| S1 | Arena of Valor, *November Patch Note "The Reversal"*, 2019-11-26: arenaofvalor.com/webplat/info/news_version3/26190/33375/33376/33731/m19427/201911/838444.shtml | sơ cấp, nhà phát hành |
| S2 | Riot, *Client Cleanup: Champ Select & End Of Game*, 2020-10-30: leagueoflegends.com/en-us/news/dev/client-cleanup-champ-select-end-of-game/ | sơ cấp, dev blog |
| S3 | Level Infinite, *Honor of Kings' Commitment to Technology*, 2023-10-26 (Ling Fei, trưởng kỹ thuật HoK, TiMi): levelinfinite.com/news/honor-of-kings-commitment-to-technology-its-players-unpacked/ | sơ cấp, phỏng vấn |
| S4 | V. Bulatov, *Arena of Valor: true MOBA on mobile phones*, Game Developer, 2017-12-26 | thứ cấp, phân tích |
| S5 | Riot, *The Architecture of the League Client Update* (technology.riotgames.com) | sơ cấp, chưa đọc hết, chỉ ghi nhận: sảnh là app HTML riêng, tách khỏi engine trận |

Số liệu thứ cấp (blog thiết lập máy, so sánh) **không dùng** làm căn cứ.

## 2. Họ làm gì (rút từ nguồn)

### 2.1 Sảnh nhẹ, trận nặng, tải tách nhau
- Tài nguyên **không cần cho trận** (tướng/skin trưng ở sảnh) chuyển sang **tải động khi cần**, không nằm trong gói vào game (S1 §6.3).
- Tài nguyên trận (skin, giọng, SFX) **xếp hàng tải nền khi đang ở sảnh**; người chơi vào trận được cả khi chưa tải xong (S1 §6.2).
- **Tải theo máy**: máy yếu không bao giờ tải bản chất lượng cao (S1 §6.4). Chế độ *Performance* mặc định cho máy yếu: tắt killcam, tắt xem chi tiết tướng, **chỉ hiện skin mặc định của người khác** trong lúc tải (S1 §5).
- Tài nguyên đã tải, không đổi thì bản cập nhật sau **không tải lại** (S1 §6.6).

### 2.2 Chuyển màn phải nhanh, nhấn phải chắc
- Tối ưu riêng: thời gian khởi động, thời gian tải trận (đa luồng), **quay về sảnh sau trận** (sắp lại thứ tự tải art) (S1 §3).
- Giảm hiệu ứng chuyển trang ở màn chi tiết tướng / chọn tướng / lập đội trên máy yếu; sửa vùng chạm vì người chơi bấm hụt (S1 §4).
- Riot: thứ người chơi quan tâm nhất ở chọn tướng là **biết ngay cú bấm chọn/cấm đã ăn chưa** (phản hồi hình + tiếng nhanh, chắc). Nghi lễ phụ (animation chọn phép, skin mắt) bị **cắt** vì người chơi không coi trọng (S2).
- Riot: đo bằng telemetry từng tính năng chọn tướng; cái nào ít dùng thì bỏ để nhẹ (S2).

### 2.3 Bộ nhớ qua nhiều trận
- AoV: crash iOS do bộ nhớ **phình dần sau mỗi trận liên tiếp**; sửa quản lý bộ nhớ (S1 §2).
- Riot: mỗi lần qua chọn tướng bộ nhớ tăng (481 MB → +56 → +15..25 MB/lần) → client chậm dần (S2). Bài học: **đo trận thứ 1, 2, 5**, không chỉ trận đầu.

### 2.4 Một hệ hình ảnh co giãn theo máy
- HoK: một giải pháp render riêng chạy trong ngân sách cố định, **co từ máy yếu tới máy mạnh**, cân bằng hình ảnh và điện năng (S3).

### 2.5 Nhịp trận và màn chờ
- Trận trung bình 15–20 phút; khi trụ mất bản đồ mở ra và thời gian hồi sinh tăng, để trận tự kết thúc mà không "tua nhanh giả" (S4).
- Màn khởi tạo trận cho mỗi người thấy độ thạo tướng của nhau để tự đánh giá cơ hội (S4).

## 3. Cổ Linh đang làm gì (đo trong world, 2026-10-08)

| Hạng mục | Hiện trạng | Đo |
|---|---|---|
| Sảnh và trận cùng một place | `main` chứa cả Điện Vinh Danh 3D (hall.js), Mạch Giữa, phòng trưng quái (x0z1) | 1 place, 15 cell |
| Tải trước hình đầu tiên | máy desktop của người chơi | **12.3 MB**, một lần đo khác **40.3 MB**; khối nặng nhất `bespoke…2db13f` **7.4 MB**, rồi 4.6 / 3.6 / 1.9 / 1.1 MB (khối hình dựng bằng code) |
| Đứng được | | 0.48–1.2 MB (chuẩn engine: 450 KB ≈ 1 s 4G) |
| Phòng trưng quái / model mẫu | dev gallery nằm cùng map người chơi | tải chung cho mọi người |
| Đo nhiều trận liên tiếp | chưa có | NOT RUN |
| Phản hồi bấm KHÓA / chọn tướng | có, chưa đo độ trễ | NOT RUN |

Kết luận: ta đang làm **ngược** nguyên lý 2.1. Người chơi mở game là tải luôn sảnh 3D + chiến trường + phòng trưng, trong khi lúc đó họ chỉ cần sảnh.

## 4. Đề xuất (học nguyên lý, dựng theo cách của engine Spawn)

Engine Spawn đã **stream theo place**: người chơi chỉ tải place họ đang đứng. Đây là công cụ thay cho "gói tải động" của AoV.

| # | Đề xuất | Học từ | Kỳ vọng đo được |
|---|---|---|---|
| P1 | **Tách place**: `sanh` (Điện Vinh Danh + UI phòng/chọn tướng) và `mach-giua` (chiến trường). Vào trận = `cross()` sang `mach-giua`; hết trận về `sanh` | 2.1, S5 | hình đầu tiên ở sảnh không còn chứa chiến trường |
| P2 | **Phòng trưng quái / model mẫu** sang place dev riêng (hoặc `visibleTo: editors`), người chơi không bao giờ tải | 2.1 | bỏ toàn bộ x0z1 khỏi gói người chơi |
| P3 | **Ngân sách hình đầu tiên**: sảnh ≤ 3 MB, chiến trường ≤ 6 MB trên desktop; mọi khối > 1 MB phải có lý do trong manifest (doc 42) | 2.1, 2.4 | `spawn perf --boot` mỗi bản |
| P4 | **Hạ độ dày khối dựng bằng code**: tìm 5 khối nặng nhất, bỏ mặt camera MOBA không thấy (đáy, mặt sau), LOD theo khoảng cách | 2.4 | 7.4 MB → mục tiêu < 1 MB/khối |
| P5 | **Tải trước khi đang chọn tướng**: lúc khóa tướng xong, chỉ chuẩn bị model 2–6 tướng trong trận (không phải cả roster); tướng khác chỉ hiện chân dung 2D | 2.1 §6.2, 2.2 | màn loading ngắn hơn, đo bằng giây |
| P6 | **Chế độ máy yếu**: mặc định trên mobile; tắt màn chi tiết tướng 3D, giảm particle, bỏ animation chuyển trang | 2.1 §5, 2.2 | FPS mobile + thời gian chuyển màn |
| P7 | **Chọn tướng: phản hồi tức thì** khi bấm chọn/KHÓA (sáng + tiếng ngay trên máy mình, không đợi referee), cắt nghi lễ phụ | 2.2 (S2) | trễ bấm → phản hồi < 100 ms |
| P8 | **Đo trận 1, 2, 5 liên tiếp** (bộ nhớ, thời gian về sảnh) trước khi coi là ổn | 2.3 | bảng số liệu D0 (doc 40) |

Thứ tự đề xuất: **P2 → P1 → P4 → P3** (giảm tải lớn nhất, rủi ro thấp nhất), rồi P7, P5, P6, P8.

## 5. Không làm
- Không chép bố cục, hình, tên, âm thanh của Liên Quân/LoL.
- Không màn loading chặn người chơi khi engine đã stream được (luật engine Spawn).
- Không đổi luật gameplay (doc USER LOCK) trong đợt này.

## 6. Câu hỏi cho lukasai
1. Duyệt tách **Sảnh** và **Mạch Giữa** thành 2 place (P1)? Đây là thay đổi kiến trúc lớn nhất; luồng phòng/chọn tướng/reconnect phải viết lại theo cross().
2. Phòng trưng quái (x0z1): chuyển sang place dev riêng hay ẩn với người chơi?
