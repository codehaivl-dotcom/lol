# 09 · Engine QA & Playtest Plan — #07 Nera (Dạ Neo)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#07 / nera`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-NE-01` | Đánh thường bắn nỏ cơ khí tầm xa | Bấm chuột đánh thường vào hình nộm ở cự ly 7.0m | Mũi tên bay tốc độ 38 m/s, windup đúng $0.12\text{s}$, gây 100% AD vật lý, âm thanh xé gió đanh gọn | `PENDING_RUNTIME` |
| `QA-NE-02` | Kích hoạt Nội tại Dạ Neo Kiting Tether | Bắn 3 đòn đánh thường liên tiếp vào cùng 1 tướng địch | Đòn thứ 3 xuất hiện sợi xích nối mờ; khi Nera di chuyển lùi xa nhận ngay $+18\%$ Tốc độ di chuyển trong 3.0s | `PENDING_RUNTIME` |
| `QA-NE-03` | Kỹ năng Q Xuyên Thấu Tiễn | Bấm **Q** nhắm qua hàng 3 lính vào tướng địch cách 9.0m | Mũi tên xuyên qua cả 3 lính không bị cản, gây sát thương đầy đủ và làm chậm tướng địch $25\%$ trong 1.2s | `PENDING_RUNTIME` |
| `QA-NE-04` | Kỹ năng W Phóng Tời lướt giật lùi | Đứng trước bot cận chiến cách 4.0m và bấm **W** | Móc neo bắn trúng bot làm chậm $35\%$, Nera lướt bay lùi lại đúng 4.5m ra cự ly 8.5m an toàn | `PENDING_RUNTIME` |
| `QA-NE-05` | Kỹ năng E Lưới Neo Dây Bẫy | Ném bẫy **E** ra lối vào bụi rậm cách 7.0m | Bẫy bung ra mặt đất bán kính 3.4m trong 3.5s; bot đi qua bị làm chậm $30\%$ trong 1.5s kèm hiệu ứng quấn chân | `PENDING_RUNTIME` |
| `QA-NE-06` | Chiêu cuối R Đại Cực Neo Trấn Áp | Bấm **R** nhắm vào tướng địch cách 11.5m | Mỏ neo khổng lồ phóng đi xé gió, ghim trúng mục tiêu làm choáng $1.2\text{s}$ và giật kéo mục tiêu $2.0\text{m}$ về hướng Nera | `PENDING_RUNTIME` |
| `QA-NE-07` | Phản hồi phím D Universal Dash | Di chuyển và bấm phím **D** né kỹ năng đối thủ | Lướt 4.5m mượt mà theo hướng di chuyển, i-frame né tránh 0.15s hoạt động, hồi chiêu W không bị ảnh hưởng | `PENDING_RUNTIME` |
| `QA-NE-08` | Hành vi Bot AI điều khiển Nera | Đưa Bot Nera vào trận đấu 5v5 | Bot biết giữ khoảng cách 6.0m–7.0m, biết dùng W lùi lại khi bị áp sát dưới 4.0m, biết dùng Q cấu rỉa và R mở combat từ xa | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS khi Nera vừa lướt W vừa bắn tên, thả lưới E và phóng chiêu cuối R trong giao tranh tổng 5v5.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Sợi xích Dạ Neo nối giữa Nera và đối thủ là hiệu ứng laser mờ mỏng sát đất, không che lấp tầm nhìn combat.
   - Đường đạn chiêu cuối R hiển thị rõ nét trên minimap và màn hình chính để người chơi hai bên đều nhận biết được đạn đạo 12m.
3. **Độ trễ mạng & Đồng bộ (Network Replication):**
   - Vị trí lướt lùi 4.5m của W và hiệu ứng kéo giật 2.0m của R phải được đồng bộ chính xác tức thời giữa client và server để tránh tình trạng giật lùi hình ảnh (rubber-banding).

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kỹ sư QA đã quan sát và xác nhận cả 8 kịch bản trên máy thật có build của Spawn runtime, ghi lại video bằng chứng và đính kèm commit hash thực tế.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi móc neo W không giật lùi Nera, lỗi xích nội tại không tăng tốc chạy hoặc lỗi R không làm choáng $\rightarrow$ Mở ticket Defect ID gửi về Gameplay Designer và Mechanics Maintainer sửa lại trước khi cấp nhãn `PLAYABLE PASS`.
