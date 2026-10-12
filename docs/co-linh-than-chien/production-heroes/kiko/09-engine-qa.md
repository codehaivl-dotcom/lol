# 09 · Engine QA & Playtest Plan — #01 Kiko (Ảnh Hầu Song Trảo)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#01 / kiko`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-KK-01` | Đánh thường cận chiến song trảo mu tay | Điều khiển Kiko tiếp cận Dummy ở cự ly $\le 1.6\text{m}$, bấm chuột đánh thường liên tục | Hoạt ảnh cào vuốt mượt mà ($0.70\text{ đòn/s}$), vệt chém tím neon sắc nét, âm thanh xé rách đanh thép | `PENDING_RUNTIME` |
| `QA-KK-02` | Hấp thụ 1-hit threshold của Ảo ảnh quang học | Tung **Q** tạo Decoy, để Dummy hoặc Trụ bắn trúng Kiko/bóng ảo | Đòn đánh đầu tiên bị triệt tiêu hoàn toàn về $0\text{ sát thương}$, bóng ảo tan vỡ thành bụi tím, Kiko nhận $+20\%$ MS và đòn đánh sau gây thêm $+35\%$ Bonus AD | `PENDING_RUNTIME` |
| `QA-KK-03` | Nhào lộn Q Toái Trảo Đột Kích | Nhắm **Q** vào mục tiêu cách $5.0\text{m}$ | Kiko nhào lộn 4 chi lướt tới $6.0\text{m}$ xé toạc mục tiêu, để lại bóng ảo màu tím đứng nguyên tại điểm xuất phát trong $3.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-KK-04` | Nhảy lùi W Ảo Ảnh Phân Thân | Bấm phím **W** khi đối mặt kẻ địch | Kiko nhảy lùi $2.0\text{m}$ nhận khiên quang học trong $2.0\text{s}$, đồng thời một ảo ảnh phóng thẳng tới trước $4.0\text{m}$ đánh lạc hướng | `PENDING_RUNTIME` |
| `QA-KK-05` | Quét song trảo E 2 nhát Khúc Xạ Trảm Kích | Đứng giữa 2 dummy, bấm phím **E** | Song trảo quét 2 vòng chéo hình chữ X bán kính $3.2\text{m}$, gây đúng 2 lần sát thương và áp dụng làm chậm $30\%$ trong $1.2\text{s}$ | `PENDING_RUNTIME` |
| `QA-KK-06` | Khóa mục tiêu dồn sát thương Ultimate R | Bấm **R** chọn tướng địch cách $6.5\text{m}$ | Kiko phân tách thành 3 bóng lướt tới, xả chuỗi cào xé trên không làm choáng $0.8\text{s}$ và dồn sát thương bộc phát cực mạnh | `PENDING_RUNTIME` |
| `QA-KK-07` | Phản hồi phím D Universal Dash | Di chuyển và bấm phím **D** sau khi dồn combo | Trườn bò lướt né $4.5\text{m}$ mượt mà, không bị kẹt hay khựng animation | `PENDING_RUNTIME` |
| `QA-KK-08` | Hành vi Bot AI điều khiển Kiko | Đưa Bot Kiko vào trận đấu 1v1 và 5v5 | Bot biết rình trong bụi, dùng Q áp sát mục tiêu yếu máu, lùi W khi bị phản công và khóa R dứt điểm; không lao vào tự sát | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trên cấu hình máy tiêu chuẩn trong giao tranh tổng 5v5 khi Kiko spawn liên tục các ảo ảnh quang học và thi triển Ultimate R.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Ký hiệu mắt lăng kính trên đầu con mồi của chiêu R nhỏ gọn, không che khuất thanh máu hay hiệu ứng debuff khác.
   - Vệt chém tím neon mỏng, không tạo ra các khối màu bão hòa che lấp sàn đấu.
3. **Độ trễ mạng & Đồng bộ (Network Replication):**
   - Vị trí Decoy quang học và tọa độ lướt của Q ($6.0\text{m}$) / R ($6.5\text{m}$) phải đồng bộ chuẩn xác giữa Client và Server; không có hiện tượng bóng ảo bị giật lệch vị trí hiển thị.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kỹ sư QA đã quan sát trực tiếp cả 8 kịch bản trên máy thật có build của Spawn runtime, ghi lại video bằng chứng và đính kèm commit hash thực tế.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi bóng ảo không hấp thụ đòn đánh, dính sát thương xuyên bóng, hoặc cầm sai vũ khí gậy $\rightarrow$ Mở ticket Defect ID gửi về Gameplay Designer và Mechanics Maintainer sửa lại trước khi cấp nhãn `PLAYABLE PASS`.
