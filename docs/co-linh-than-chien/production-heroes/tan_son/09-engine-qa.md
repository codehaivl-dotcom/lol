# 09 · Engine QA & Playtest Plan — #44 Tản Sơn (Thánh Sơn Cổ Thạch)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#44 / tan_son`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-TS-01` | Dựng Vách Núi Ngọc Bích W & Chặn địch | Nhắm phím **W** đặt vách đá cắt ngang đường di chuyển của Bot địch | Bot địch bị chặn bước di chuyển hoàn toàn, không thể đi qua; đạn đạo bắn vào vách đá bị triệt tiêu | `PENDING_RUNTIME` |
| `QA-TS-02` | Đồng minh đi xuyên vách núi & Nhận khiên | Điều khiển tướng đồng minh chạy thẳng qua vách đá của Tản Sơn | Tướng đồng minh đi xuyên qua mượt mà không bị khựng; lập tức nhận khiên đá bảo hộ hiển thị trên thanh máu | `PENDING_RUNTIME` |
| `QA-TS-03` | Tái kích hoạt W đập vỡ vách đá | Bấm tái kích hoạt **W** khi kẻ địch đứng sát cạnh vách đá | Vách đá vỡ tan thành mảnh tinh thạch, gây sát thương và làm chậm $35\%$ Bot địch xung quanh | `PENDING_RUNTIME` |
| `QA-TS-04` | Dậm nứt đất Q Sơn Thạch Chấn Kích | Nhắm phím **Q** vào hàng lính địch cách $5.0\text{m}$ | Gai đá ngọc bích trồi lên theo đường thẳng $6.5\text{m}$, toàn bộ lính nhận sát thương và bị làm chậm $35\%$ trong $1.2\text{s}$ | `PENDING_RUNTIME` |
| `QA-TS-05` | Hào quang Thái Dương E giảm tốc đánh | Đứng đối diện xạ thủ địch đang đánh thường, bấm phím **E** | Xạ thủ địch bị giảm $25\%$ tốc độ đánh rõ rệt trong $1.5\text{s}$ (quan sát thấy hoạt ảnh bắn bị chậm lại); Tản Sơn nhận diện rõ hướng mặt | `PENDING_RUNTIME` |
| `QA-TS-06` | Ultimate R nhảy dậm địa chấn diện rộng | Bấm **R** chọn vùng đất cách $5.0\text{m}$ có cụm 3 Bot địch đứng | Tản Sơn nhảy lên không, nện đất nổ bão đá bán kính $5.5\text{m}$, cả 3 Bot bị hất tung và choáng $1.0\text{s}$ kèm icon STUN | `PENDING_RUNTIME` |
| `QA-TS-07` | Phản hồi phím D Universal Dash | Di chuyển và bấm phím **D** | Lướt dạt $4.5\text{m}$ mượt mà, phá vỡ hiệu ứng làm chậm nhẹ nếu có | `PENDING_RUNTIME` |
| `QA-TS-08` | Hành vi Bot AI điều khiển Tản Sơn | Đưa Bot Tản Sơn vào trận đấu 1v1 và 5v5 | Bot biết đặt vách đá W chặn lối thoát hiểm của địch, biết mở combat bằng R và dùng E giảm tốc đánh chủ lực địch; không gây kẹt đồng minh | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong giao tranh 5v5 khi Tản Sơn dựng vách đá W đồng thời tung chiêu R nện đất giữa 10 tướng.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Vách Núi Ngọc Bích có chiều cao chuẩn $2.8\text{m}$, vật liệu bán trong suốt góc nhìn camera, không che lấp tầm nhìn của người chơi đối với các tướng đứng sau vách.
   - Trận đồ mặt trời Đông Sơn của R hiển thị sát mặt đất, không che thanh máu.
3. **Tính toàn vẹn NavMesh:** Vách núi trồi lên và biến mất không để lại lỗ hổng NavMesh vĩnh viễn trên bản đồ Spawn runtime.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được phê duyệt khi kiểm thử viên QA thực hiện thành công toàn bộ 8 kịch bản trên bản dựng Spawn runtime chính thức, có video quay lại và commit hash đối chiếu.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi đồng minh bị kẹt không đi xuyên qua được vách núi, hoặc đập vỡ vách đá gây crash server $\rightarrow$ Đóng nhãn BLOCKED và hoàn trả về nhóm phát triển.
