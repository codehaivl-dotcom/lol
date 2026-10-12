# 09 · Engine QA & Playtest Plan — #17 Forge (Lò Cổ)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#17 / forge`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-FO-01` | Đánh thường đấm tay tích nhiệt | Bấm chuột đánh thường cận chiến vào hình nộm liên tục 5 đòn | Cú đấm piston có độ trễ $0.18\text{s}$ đầm tay, mỗi đòn tăng đúng $+12$ nhiệt vào thanh HUD | `PENDING_RUNTIME` |
| `QA-FO-02` | Tích nhiệt khi nhận sát thương | Đứng chịu đòn từ trụ hoặc 2 tướng đối thủ | Mỗi 1 sát thương nhận vào tăng đúng $+0.04$ nhiệt; nhận 500 sát thương thanh nhiệt tăng $+20$ | `PENDING_RUNTIME` |
| `QA-FO-03` | Cơ chế Xả Áp W tạo khiên & nổ nhiệt | Tích 100 nhiệt rồi bấm **W** | Thanh nhiệt reset về 0, nhận lớp khiên dày (cơ bản + 160 khiên nhiệt), nổ sóng lửa diện rộng 4.0m gây sát thương phép | `PENDING_RUNTIME` |
| `QA-FO-04` | Kỹ năng húc lao Q Đột Kích Lò Nung | Bấm **Q** nhắm vào tướng địch cách 7.0m | Forge lao vút tới, va chạm mục tiêu đầu tiên hất văng và làm choáng đúng $0.8\text{s}$, không bị kẹt lính | `PENDING_RUNTIME` |
| `QA-FO-05` | Phun hơi nóng E làm chậm | Tiếp cận mục tiêu và bấm **E** | Quạt lửa góc $60^\circ$ bán kính 4.0m phun ra, gây sát thương phép và làm chậm $25\%$ trong 1.2s | `PENDING_RUNTIME` |
| `QA-FO-06` | Chiêu cuối R Đại Bộc Phá Lò Cổ | Bấm **R** chọn cụm 3 bot đối thủ cách 5.0m | Forge nhảy lao tới, telegraph vòng tròn bán kính 5.5m hiện rõ; khi tiếp đất làm choáng toàn bộ bot $1.1\text{s}$ | `PENDING_RUNTIME` |
| `QA-FO-07` | Phản hồi điều khiển phím D Universal Dash | Di chuyển và bấm phím **D** né kỹ năng của đối thủ | Lướt 4.5m né đòn mượt mà, i-frame né tránh hoạt động, không ảnh hưởng tới thanh nhiệt | `PENDING_RUNTIME` |
| `QA-FO-08` | Hành vi Bot AI điều khiển Forge | Đưa Bot Forge vào trận 5v5 | Bot biết dùng Q lao vào mở giao tranh, biết giữ W để xả áp khi nhiệt cao, biết dùng R khi thấy đối thủ tụ tập đông | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS khi Forge xả áp W và tung chiêu cuối R cùng lúc với nhiều hiệu ứng kỹ năng khác trong giao tranh 5v5.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Vòng nổ nhiệt và quạt lửa E là hiệu ứng sát mặt đất, không che camera trận góc nghiêng $55^\circ$.
   - Hiệu ứng bốc khói nhiệt của thân lò nung rõ ràng nhưng không che lấp thanh máu của Forge hay đồng minh.
3. **Độ trễ mạng & Đồng bộ (Network Replication):**
   - Giá trị thanh nhiệt (Heat) và trạng thái xả áp phải được đồng bộ chính xác tức thời giữa máy chủ và các máy khách để bảo đảm phản hồi khiên hiển thị trùng khớp với lượng sát thương hấp thụ.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kỹ sư QA đã quan sát trực tiếp cả 8 kịch bản trên máy thật có build của Spawn runtime, ghi lại video bằng chứng và đính kèm commit hash thực tế.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi thanh nhiệt không tăng khi nhận đòn, mất khiên xả áp hoặc lỗi kẹt húc Q $\rightarrow$ Mở ticket Defect ID gửi về Gameplay Designer và Mechanics Maintainer sửa lại trước khi cấp nhãn `PLAYABLE PASS`.
