# AUDIT tạo hình × kit · 11-10-2026

Câu hỏi: tạo hình mới (chốt hôm qua) với skill/data cũ đã khớp chưa, hay drift?

**Kết luận: drift.** Kit của 18 tướng chưa làm vẫn viết theo tạo hình cũ. Chưa tướng nào có tạo hình mới.

## Luật hôm qua (10-10)

- Tướng chưa làm: tạo hình sáng tạo (thú, nguyên tố, máy, chất liệu lạ). Người thì hiếm và phải có nét lạ.
- Chọn tạo hình từ thư viện 100 (doc 74) → prototype (doc 75) → creator duyệt → mới làm Blender.
- Tạo hình phải khớp kit (animation, vũ khí, chỗ chiêu bắn ra).

## Thực tế trong repo

| | Số tướng | Tình trạng |
|---|---|---|
| Đã chơi được | 8 | giữ tạo hình hiện tại, không bị luật mới đụng tới |
| Bách Diện | 1 | **làm đúng quy trình**: chọn tạo hình (Vũ Công Gương Đồng) → viết lại kit kiểu dancer cho khớp → Lab 49,6% |
| Còn lại | 18 | có kit ứng viên trong Lab, nhưng **viết từ doc 03 cũ** (Thân Người Vá, Người Nghe Đá, Kẻ Lượn Vách…). Không file nào gắn tạo hình doc 74/75 |

## Chỗ drift cụ thể

1. **18 kit ứng viên** (`tools/sim/candidates/*.yml`) là tướng-người kiểu cũ. Khi đổi tạo hình (vd thành Hổ, Cá Sấu, Trống Đồng), chiêu, vũ khí, animation sẽ không còn khớp → phải viết lại như Bách Diện.
2. **Chỉ 8 prototype** trong doc 75 (021 Hổ Vằn Mực, 023 Cá Sấu, 011 Lăng Kính, 062 Trống Đồng, 002 Người Sấm, 022 Sói Sương, 051 Cao Su, 053 Giấy Dó). Chưa gán vào tướng nào, vẫn **chờ bạn duyệt**.
3. **Doc 75 tự mâu thuẫn**: mục Bách Diện còn ghi "kit giữ nguyên (Mảnh Mặt… Đổi Bóng)", nhưng kit đã đổi sang dancer theo lệnh bạn. Cần sửa dòng đó.
4. **Không thừa**: `candidates/hao_nhat.yml`, `huong_mai.yml` là bản ×1,0 để A/B với heroes.yml (ghi trong heroes.yml, economy.yml, HANDOFF). Giữ.
5. **Data số (doc 12 + legacy)**: chỉ là gợi ý, đúng luật. Nhưng stat gắn với vai trò cũ; đổi tạo hình mà đổi vai trò thì số phải chạy lại Lab.

## Đề xuất quy trình cho 18 tướng (chờ bạn chốt)

1. **Gán tạo hình**: mỗi tướng chọn 1 hình từ doc 74, giữ vai trò/ID. Mình đề xuất bảng 18 dòng, bạn duyệt một lần.
2. **Viết lại kit cho khớp hình**: giữ vai trò + độ khó, đổi tên chiêu, nguồn chiêu, cách ra đòn (như Bách Diện).
3. **Lab**: chạy lại chỉ số + One-Combo Kill Test.
4. Rồi mới Blender, rig, clip, VFX, SFX.

Kit ứng viên cũ giữ làm bản nháp tham khảo vai trò, không dùng thẳng.

## Việc dọn ngay (nhỏ, không đụng game)

- ✅ Sửa dòng mâu thuẫn ở doc 75 (đã sửa).
- Đánh dấu 18 kit cũ là "NHÁP · chờ tạo hình".
