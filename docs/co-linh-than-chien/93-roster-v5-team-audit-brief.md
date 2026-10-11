# 93 · COLINH Roster V5 — Team Audit Brief

**Ngày:** 11/10/2026  
**Trạng thái:** `AUDIT_BRIEF / NOT_APPROVED / NO_PRODUCTION`  
**Nguồn đầu vào:** [92 · Hero Roster Discovery V5](92-roster-discovery-v5-concept-candidates.md)

## 1. Mục tiêu audit

Team audit cần lọc **36 concept COLINH** xuống một danh sách đề xuất **24 concept đáng phát triển**. Vòng này **không** viết kit số, không tạo ảnh, không tạo model, không chạy Balance Lab.

Audit phải đánh giá concept có đáng nghĩ tiếp hay không. Nếu concept không đủ mạnh, không cố cứu bằng skill chi tiết.

## 2. Nguyên tắc bất biến

1. Tướng phải có câu: `Tôi pick nó vì tôi được ...`.
2. Không bắt đầu từ vật liệu hoặc màu sắc. Bắt đầu từ fantasy chơi.
3. Không copy tên, silhouette, vũ khí biểu tượng, combo skill hoặc lore của nhân vật nổi tiếng.
4. Không làm pet/drone/multi-unit điều khiển tay.
5. Q/W/E/R là skill, R là ultimate, D là dash chung, basic attack tách riêng.
6. Chỉ chuyển sang production khi concept qua audit và creator duyệt.

## 3. Luật pet / drone / summon

Loại ngay nếu concept cần:

- điều khiển drone/pet như unit riêng;
- nhiều unit đồng thời;
- pet có skill bar riêng;
- camera hoặc UI riêng cho pet;
- pathfinding độc lập lâu dài;
- summon có collision chặn đường phức tạp.

Chỉ giữ nếu là một trong các dạng:

- **Attach support:** gắn vào hero/ally, tự hoạt động.
- **Orbit drone:** bay quanh hero/ally, đổi mode đơn giản.
- **Point-and-return:** đi đến điểm, làm việc, quay về.
- **One-shot summon:** xuất hiện ngắn, gây hiệu ứng, biến mất.

## 4. Bảng chấm điểm 100

| Hạng mục | Điểm | Câu hỏi audit |
|---|---:|---|
| Player fantasy | 25 | Người chơi nhìn vào có muốn pick không? |
| Core gameplay toy | 25 | Có đồ chơi riêng không, hay chỉ là Q damage/W slow/E dash/R nổ? |
| Counterplay | 15 | Đối thủ có đọc/né/bait/phản chế được không? |
| Ultimate moment | 15 | Có khoảnh khắc R đáng nhớ không? |
| AI production | 20 | Model/rig/animation/VFX/skill logic có khả thi không? |

**Ngưỡng đề xuất:**

| Điểm | Kết luận |
|---:|---|
| 85–100 | Strong Keep |
| 70–84 | Keep / Needs rewrite |
| 55–69 | Reserve |
| <55 | Cut |

## 5. Cổng loại nhanh

Loại ngay nếu có một trong các lỗi:

- Không có câu bán hàng rõ.
- Core loop trùng một ứng viên mạnh hơn.
- Fantasy chỉ là tạo hình, không có lối chơi.
- Ultimate chỉ là skill thường phóng to.
- Cần engine system mới rất lớn ở vòng đầu.
- Dùng pet/drone/multi-unit điều khiển tay.
- Quá giống một hero nổi tiếng về cảm giác chơi và silhouette.

## 6. Danh sách 36 concept cần audit

| # | Tên | Vai đề xuất | Câu bán hàng |
|---:|---|---|---|
| 01 | Ảnh Hầu / Kiko | Sát thủ | Lừa đối thủ bằng dấu chân giả, nhảy vào đúng khoảnh khắc rồi thoát ra. |
| 02 | Nhịp Quyền / Brak | Đấu sĩ | Chờ địch ra đòn, đỡ đúng lúc, phản bằng cú đấm piston nặng. |
| 03 | Vết Kiếm / Vero | Sát thủ | Mỗi nhát kiếm để lại một vết thời gian, vài giây sau vết đó chém lại. |
| 04 | Hấp Đòn / Rava | Đấu sĩ | Càng bị đánh đúng lúc càng tích lực phản công. |
| 05 | Thợ Săn Lỗi / Erran | Sát thủ | Bắt lỗi người spam skill, đánh dấu và truy sát. |
| 06 | Võ Sư Một Nhịp / Mono | Đấu sĩ | Ít chiêu nhưng mỗi cú có sức nặng; thắng bằng timing. |
| 07 | Dạ Neo / Nera | Xạ thủ | Bắn lao neo rồi chọn kéo mình tới hoặc giật mục tiêu lệch vị trí. |
| 08 | Móc Quỷ / Garo | Đỡ đòn | Cú móc đơn giản nhưng đáng sợ: trúng là mở giao tranh. |
| 09 | Xiềng Đấu / Vark | Đấu sĩ | Tự khóa mình với một mục tiêu để ép duel. |
| 10 | Dây Phán / Liora | Pháp sư / Hỗ trợ | Nối hai kẻ địch bằng dây phán xét; tách ra hay đứng gần đều bị phạt. |
| 11 | Chài Mạch / Namo | Đỡ đòn / Hỗ trợ | Quăng lưới mở giao tranh, bắt vùng chứ không chỉ bắt một người. |
| 12 | Thương Nhãn / Vika | Xạ thủ | Bắn ghim tạo dây bẫy tuyến, ép đối thủ đi theo góc mình muốn. |
| 13 | Huyền Giác / Rako | Đỡ đòn | Lao thẳng như tê giác máy, phá đội hình bằng tuyến húc rõ ràng. |
| 14 | Đô Vật Cổ / Marduk | Đấu sĩ / Đỡ đòn | Vật một mục tiêu chủ lực vào vị trí nguy hiểm. |
| 15 | Thiết Quyền / Brak | Đấu sĩ | Võ sĩ piston: càng chuẩn bị đúng, cú đấm càng nặng. |
| 16 | Thiết Xa / Loko | Đỡ đòn | Chiến xa sống, ép góc bằng đà và khó quay đầu. |
| 17 | Lò Cổ / Forge | Đỡ đòn / Đấu sĩ | Càng chịu đòn càng nóng, rồi xả áp thành sóng lửa trước mặt. |
| 18 | Búa Quỹ / Oren | Đấu sĩ | Dùng búa xoay quanh người để chiếm không gian. |
| 19 | Mực Mù / Inka | Pháp sư | Vẽ mực lên mặt đất, nối các vệt mực thành vùng nguy hiểm. |
| 20 | Mìn Ký Ức / Teko | Pháp sư / Hỗ trợ | Biến một khu vực thành bãi mìn có cảnh báo. |
| 21 | Vòng Cấm / Rana | Pháp sư | Dựng một vòng luật: bước qua ranh giới là bị phạt. |
| 22 | Nhện Mạch / Sira | Pháp sư / Xạ thủ | Dệt đường mạng giữa các điểm, làm chậm và bắt lỗi di chuyển. |
| 23 | Đếm Bước / Taxa | Pháp sư | Nguyền một vùng: càng chạy trong đó càng bị phạt. |
| 24 | Vườn Ăn Thịt / Mora | Pháp sư | Gieo mầm săn mồi, ép giao tranh quanh vùng chuẩn bị. |
| 25 | Ký Sinh Hộ Thể / Soma | Hỗ trợ | Gắn sinh thể phụ vào đồng minh, chọn lúc bung giáp hoặc hồi cứu. |
| 26 | Drone Tự Hành / Dron | Hỗ trợ / Xạ thủ phụ | Drone tự động theo mình, đổi chế độ Chắn / Bắn / Quét, không điều khiển riêng. |
| 27 | Gọi Mục Tiêu / Cala | Hỗ trợ / Đấu sĩ | Mạnh quanh mục tiêu lớn, gọi team đánh đúng thời điểm. |
| 28 | Ghi Nợ / Libro | Hỗ trợ | Biến sát thương đã chắn thành kho nợ để trả lại bằng shield/heal. |
| 29 | Quản Gia Tự Hành / Boto | Hỗ trợ | Linh vật máy tự gom mảnh hỗ trợ quanh combat và phát cho đồng minh gần. |
| 30 | Thủ Kho Lane / Kipa | Hỗ trợ macro | Buff lane nhẹ bằng tem hậu cần, không điều khiển lính trực tiếp. |
| 31 | Hổ Nấm / Moka | Sát thủ | Săn mục tiêu có mùi bào tử, vồ đúng con mồi đã bị đánh dấu. |
| 32 | Hải Mẫu / Kora | Đỡ đòn | Cua cửa đập: xoay càng lớn để chắn hướng sát thương cho team. |
| 33 | Lươn Đêm / Eelix | Sát thủ | Tạo tuyến nước tối rồi lao phục kích theo đúng đường đó. |
| 34 | Sứa Chuông / Jeli | Hỗ trợ | Hồi máu và làm chậm theo nhịp chuông nước lan ra từng vòng. |
| 35 | Chim Công Sợ Hãi / Pavo | Pháp sư / Hỗ trợ | Xòe đuôi thành quạt gây áp lực tinh thần, bắt địch quay mặt hoặc rút lui. |
| 36 | Tê Tê Khiên / Rolo | Đấu sĩ | Tháo từng lớp vảy để đổi phòng thủ lấy tấn công. |

## 7. Hạt nhân đề xuất để kiểm đầu tiên

Team audit nên bắt đầu từ 12 concept này trước vì chúng có khả năng cao nhất:

| Ưu tiên | Tên | Lý do |
|---:|---|---|
| 1 | Hải Mẫu / Kora | Tank khác biệt, gameplay chắn hướng bằng càng rất rõ. |
| 2 | Phi Công Cổ Khí / Aero | Fantasy lái cổ khí oanh tạc dễ bán, sản xuất khả thi. |
| 3 | Ảnh Hầu / Kiko | Sát thủ outplay dễ hiểu, dễ marketing. |
| 4 | Dạ Neo / Nera | Hook/neo có quyết định hai chiều. |
| 5 | Mực Mù / Inka | Pháp sư vẽ mực, có bản sắc COLINH. |
| 6 | Lò Cổ / Forge | Tank/bruiser tích nhiệt, dễ production. |
| 7 | Hổ Nấm / Moka | Quái thú săn mồi có horror hook. |
| 8 | Ghi Nợ / Libro | Support không nhàm, mechanic trạng thái tốt. |
| 9 | Sứa Chuông / Jeli | Support đẹp, lạ, có nhịp. |
| 10 | Nhịp Quyền / Brak | Đấu sĩ phản nhịp, piston punch. |
| 11 | Mắt Thiên Cơ / Iro | Sniper máy một mắt, silhouette rõ. |
| 12 | Vòng Cấm / Rana | Mage ranh giới, dễ đọc. |

**Ghi chú:** Aero và Iro là hạt nhân từ Vòng B, nhưng chưa có trong 36 concept table hiện tại. Team audit cần quyết định thêm lại chúng vào nhóm 36 hoặc thay thế hai concept yếu nhất. Đây là một điểm cố ý để audit phát hiện: bảng C đã thiếu hai ứng viên mạnh từ hạt nhân.

## 8. Output audit mong muốn

Team gửi lại một bảng có cột:

| Concept | Score /100 | Keep / Rewrite / Reserve / Cut | Lý do | Rủi ro production | Đề xuất thay thế |
|---|---:|---|---|---|---|

Không cần viết skill chi tiết ở vòng này. Chỉ cần quyết định concept nào đáng phát triển tiếp.
