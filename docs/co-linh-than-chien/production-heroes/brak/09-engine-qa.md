# 09 · Engine QA & Playtest Plan — #02 Brak (Nhịp Quyền)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#02 / brak`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-BR-01` | Đánh thường đấm tay cận chiến | Bấm chuột đánh thường cận chiến vào hình nộm 4 đòn liên tiếp | Animation đấm tay trái/phải mượt mà, độ trễ ra đòn đúng $0.15\text{s}$, gây đúng 100% AD vật lý, tiếng kim loại va chạm rõ nét | `PENDING_RUNTIME` |
| `QA-BR-02` | Kỹ năng Q Piston Trực Quyền | Bấm **Q** nhắm vào tướng địch cách 5.0m | Nắm đấm nén khí phóng thẳng với tốc độ 26 m/s, gây sát thương vật lý và làm chậm mục tiêu đầu tiên đúng $25\%$ trong 1.0s | `PENDING_RUNTIME` |
| `QA-BR-03` | Cơ chế Parry W thành công khi nhận đòn | Bấm **W** ngay khi đối phương tung chiêu/bắn đạn trúng người trong 0.75s | Sát thương nhận vào giảm đúng $60\%$, nhận khiên cơ bản, tự động tung cú đấm phản kích búa tạ gây thêm $+35\%$ bonus damage và làm choáng kẻ tấn công đúng $0.5\text{s}$ | `PENDING_RUNTIME` |
| `QA-BR-04` | Kịch bản Bait Parry (Thủ hụt) | Bấm **W** nhưng đối thủ không tấn công trong 0.75s | Sau 0.75s thế thủ tự động tắt, không kích hoạt cú đấm phản kích, khiên tồn tại tiếp đến 2.0s rồi mất, W rơi vào hồi chiêu bình thường | `PENDING_RUNTIME` |
| `QA-BR-05` | Kỹ năng E Địa Chấn Xung Kích | Tiếp cận cụm lính/quái và bấm **E** | Nắm đấm nện đất sau 0.15s windup, sóng chấn động tỏa tròn bán kính 3.8m gây sát thương và làm chậm toàn bộ mục tiêu $30\%$ trong 1.2s | `PENDING_RUNTIME` |
| `QA-BR-06` | Chiêu cuối R Hơi Nước Bộc Phá | Bấm **R** chọn cụm 2 bot đối thủ cách 6.0m | Brak nhảy lao tới, telegraph vòng cảnh báo bán kính 4.5m hiện rõ 0.3s; khi tiếp đất tạo vụ nổ hơi nước làm choáng toàn bộ bot $1.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-BR-07` | Phản hồi phím D Universal Dash | Di chuyển và bấm phím **D** né kỹ năng của đối thủ | Lướt 4.5m mượt mà theo hướng di chuyển, i-frame né tránh 0.15s hoạt động bình thường, không hủy thế thủ W nếu đang kích hoạt | `PENDING_RUNTIME` |
| `QA-BR-08` | Hành vi Bot AI điều khiển Brak | Đưa Bot Brak vào trận đấu 5v5 | Bot biết dùng Q áp sát, biết giữ W để parry khi bị dồn sát thương, biết dùng E khống chế và dùng R nhảy mở combat khi thấy đối thủ tụ tập đông | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS khi Brak kích hoạt parry bốc khói hơi nước và tung chiêu cuối R cùng lúc với nhiều hiệu ứng khác trong combat 5v5.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Vầng sáng parry W bao quanh hai cánh tay có độ trong suốt vừa phải, không che lấp thanh máu và thanh trạng thái của Brak.
   - Cột khói xả áp chiêu cuối R bốc lên cao nhưng tan nhanh sau 0.4s, không che góc nhìn camera MOBA $55^\circ$.
3. **Độ trễ mạng & Đồng bộ (Network Replication):**
   - Cửa sổ Parry 0.75s phải được tính toán với cơ chế Server-side hit confirmation để bảo đảm người chơi ở ping 50–80ms vẫn thực hiện thành công các pha parry phản xạ chính xác.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kỹ sư QA đã quan sát và xác nhận cả 8 kịch bản trên máy thật có build của Spawn runtime, ghi lại video bằng chứng và đính kèm commit hash thực tế.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi đòn phản kích parry không làm choáng kẻ địch, lỗi lướt R bị kẹt địa hình hoặc lỗi giảm sát thương không đạt 60% $\rightarrow$ Mở ticket Defect ID gửi về Gameplay Designer và Mechanics Maintainer sửa lại trước khi cấp nhãn `PLAYABLE PASS`.
