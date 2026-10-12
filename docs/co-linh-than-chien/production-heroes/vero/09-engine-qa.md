# 09 · Engine QA & Playtest Plan — #03 Vero (Vết Kiếm)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#03 / vero`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-VE-01` | Đánh thường găm Vết Nứt Thời Gian | Điều khiển Vero đánh thường vào tướng địch hình nộm | Đòn đánh trúng đích gây sát thương vật lý, kích hoạt dấu ấn Vết Nứt trên đầu mục tiêu kèm đồng hồ đếm ngược 2.5s | `PENDING_RUNTIME` |
| `QA-VE-02` | Tích lũy 30% sát thương và nổ trễ sau 2.5s | Gây 200 sát thương lên nạn nhân trong 2.5s rồi lùi ra xa | Sau đúng 2.5s, vết nứt tự phát nổ gây đúng 60 sát thương phép (30%), font chữ tím nổ bốc lên, thanh máu tụt chuẩn xác | `PENDING_RUNTIME` |
| `QA-VE-03` | Đồng hồ đếm ngược minh bạch trên HUD nạn nhân | Đứng ở góc nhìn người bị Vero đánh (Victim POV) | Nhìn thấy rõ ràng vòng tròn đếm ngược 2.5s trên thanh máu của mình để bấm kỹ năng phòng vệ | `PENDING_RUNTIME` |
| `QA-VE-04` | Kỹ năng lướt Q Vết Chém Thời Không | Bấm **Q** lướt định hướng xuyên qua hàng lính tới tướng | Lướt mượt mà 6.5m xuyên qua lính và tướng, để lại rãnh nứt không gian, gây sát thương lên toàn bộ mục tiêu va chạm | `PENDING_RUNTIME` |
| `QA-VE-05` | Kỹ năng W Thời Không Chi Khiên | Bấm **W** ngay khi đối phương tung chiêu phản kích | Lớp khiên tinh thể hiện tức thì ($0\text{s}$ windup), hấp thụ sát thương đúng giá trị trong 2.5s, nhận thêm 15% tốc chạy | `PENDING_RUNTIME` |
| `QA-VE-06` | Kỹ năng E Vòng Xoáy Nghịch Đảo | Tiếp cận cự ly gần và bấm **E** | Xoay kiếm $360^\circ$ bán kính 3.4m, gây sát thương vật lý và làm chậm toàn bộ kẻ địch $25\%$ trong 1.0s | `PENDING_RUNTIME` |
| `QA-VE-07` | Chiêu cuối R Vạn Kiếm Quy Thời & Kích nổ tức thì | Găm vết nứt bằng Q + đánh thường, sau đó bấm **R** vào mục tiêu ở cự ly 6.5m | Vero lướt áp sát, gây choáng 0.8s, chém 3 nhát liên hoàn; tại nhát chém thứ 3 toàn bộ sát thương vết nứt LẬP TỨC PHÁT NỔ không cần chờ hết 2.5s | `PENDING_RUNTIME` |
| `QA-VE-08` | Phản hồi điều khiển phím D Universal Dash | Di chuyển và bấm phím **D** để né đạn định hướng | Lướt né 4.5m mượt mà, không làm mất dấu ấn Vết Nứt đang đếm trên người đối phương | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong các pha giao tranh tổng 5v5 khi Vero tung chiêu cuối R bùng nổ cột sáng tinh thể thời không.
2. **Độ tương phản và không che khuất góc nhìn (Camera Occlusion Check):**
   - Rãnh nứt thời gian của chiêu Q nằm phẳng trên mặt đất, không che lấp tầm nhìn đường đạn của đồng minh và đối thủ.
   - Vòng tròn đồng hồ đếm ngược 2.5s trên đầu nạn nhân có viền tương phản cao, dễ nhìn thấy trong mọi bối cảnh địa hình bản đồ (cỏ, sông, đá).
3. **Đồng bộ hóa mạng (Network Replication & Latency):**
   - Đảm bảo thời điểm phát nổ Echo Pop ở Server và Client lệch nhau không quá $50\text{ms}$; không xảy ra hiện tượng "nổ ảo" (phantom pop) khi nạn nhân đã bấm khiên/bất tử kịp thời.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được phê duyệt khi đội ngũ QA đã trực tiếp thực hiện đủ 8 kịch bản trên bản build của Spawn runtime, ghi lại video bằng chứng 60 FPS và kiểm tra log không có lỗi null exception hay desync.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi đồng hồ không đếm ngược, vết nứt không nổ, chiêu R không kích nổ sớm hoặc lỗi kẹt mô hình khi lướt Q $\rightarrow$ Tạo ticket Defect ID bàn giao cho Gameplay Designer và Mechanics Maintainer khắc phục trước khi cấp chứng chỉ `PLAYABLE PASS`.
