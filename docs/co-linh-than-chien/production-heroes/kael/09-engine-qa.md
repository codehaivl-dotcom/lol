# 09 · Engine QA & Playtest Plan — #39 Kael (Cuồng Đao)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#39 / kael`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-KA-01` | Đánh thường tích tầng Cuồng Nhịp | Cho Kael đánh thường liên tục vào tướng hình nộm | Mỗi phát chém tích đúng 1 tầng, thanh HUD hiển thị từ 1 đến 5 ô đao đỏ, tốc độ đánh tăng từ $0.68 \rightarrow 0.95$ đòn/s | `PENDING_RUNTIME` |
| `QA-KA-02` | Quy tắc suy giảm dần sau 2.0s | Đạt 5 tầng Cuồng Nhịp rồi dừng tấn công, bấm đồng hồ đo thời gian | Đúng 2.0s sau, các tầng bắt đầu suy giảm dần với tốc độ 2 tầng/giây; không bị mất trắng lập tức | `PENDING_RUNTIME` |
| `QA-KA-03` | Phân cấp mục tiêu Lính vs Tướng vs Trụ | Đánh vào lính; sau đó chuyển sang đánh trụ | Đánh lính chỉ tích tối đa 2 tầng; đánh trụ không tăng tầng nhưng giữ nguyên số tầng hiện có không bị decay | `PENDING_RUNTIME` |
| `QA-KA-04` | Kỹ năng lướt Q Cuồng Trảm Lướt | Bấm **Q** nhắm xuyên qua hàng lính tới tướng địch | Lướt mượt mà 6.5m, gây sát thương lên mục tiêu đầu tiên, tích ngay 1 tầng Cuồng Nhịp | `PENDING_RUNTIME` |
| `QA-KA-05` | Chém kép 2 nhịp W Song Đao Toái Kích | Tiếp cận mục tiêu và bấm **W** | Hai vệt chém bán nguyệt quét quanh thân, gây 2 nhịp sát thương riêng biệt và làm chậm đối thủ $25\%$ trong 1.0s | `PENDING_RUNTIME` |
| `QA-KA-06` | Khiên phản ứng E Kích Thích Huyết Mạch | Nhận sát thương và bấm **E** | Lớp khiên trắng hiện lập tức quanh thanh máu ($0\text{s}$ windup), hấp thụ sát thương đúng giá trị trong 2.5s | `PENDING_RUNTIME` |
| `QA-KA-07` | Chiêu cuối R Huyết Cuồng Phong Ma | Bấm **R** chọn vùng đất có tướng địch cách 4.5m | Kael lướt tới và xoay đao 3 nhịp liên hoàn trong 0.4s; toàn bộ mục tiêu trong bán kính 4.0m chịu 3 nhịp sát thương và bị làm chậm $30\%$ | `PENDING_RUNTIME` |
| `QA-KA-08` | Phản hồi điều khiển phím D Universal Dash | Di chuyển và bấm phím **D** trong khi đang duy trì 5 tầng Cuồng Nhịp | Lướt 4.5m né đòn mượt mà, không làm ngắt quãng hoặc mất tầng Cuồng Nhịp | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS khi Kael đạt tốc độ đánh tối đa (3 đòn/s) và thi triển chiêu cuối R trong giao tranh tổng 5v5.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Vệt chém song đao màu đỏ thạch anh sắc nét nhưng thanh mảnh, không tạo thành mảng đỏ đặc che khuất mô hình nhân vật hoặc đạn đạo đối thủ.
   - Hiệu ứng bão đao R có chiều cao vừa phải ($\le 2.5\text{m}$), nhìn rõ ràng dưới camera góc nhìn nghiêng isometric.
3. **Độ trễ mạng & Đồng bộ (Network Replication):**
   - Bộ đếm tầng Cuồng Nhịp và thời gian suy giảm phải được đồng bộ hóa chuẩn xác giữa Server và Client, tránh hiện tượng desync tốc độ đánh trên màn hình người chơi.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kỹ sư QA đã quan sát trực tiếp cả 8 kịch bản trên máy thật có build của Spawn runtime, ghi lại video bằng chứng và đính kèm commit hash thực tế.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi tầng không suy giảm, mất tốc đánh hoặc lỗi kẹt animation chém $\rightarrow$ Mở ticket Defect ID gửi về Gameplay Designer và Mechanics Maintainer sửa lại trước khi cấp nhãn `PLAYABLE PASS`.
