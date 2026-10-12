# 09 · Engine QA & Playtest Plan — #38 Linh Hầu (Cổ Thần Trượng)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#38 / linh_hau`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-LH-01` | Đánh thường cận chiến thế Đoản Trượng | Người chơi điều khiển Linh Hầu tiếp cận dummy ở cự ly $\le 2.0\text{m}$, bấm chuột đánh thường liên tục 10 giây | Hoạt ảnh ra đòn mượt mà, tốc độ đánh đúng $+15\%$ AS, tiếng gậy trúng đòn đầm tay, không giật khung hình | `PENDING_RUNTIME` |
| `QA-LH-02` | Kích hoạt thế Trường Trượng qua chiêu Q | Tung phím **Q** trúng mục tiêu, quan sát thanh buff 4.0s và phạm vi đánh thường mở rộng lên 4.8m | Tầm đánh tự động vươn xa 4.8m, mô hình trượng dài ra trực quan, hết 4s tự thu về 2.0m | `PENDING_RUNTIME` |
| `QA-LH-03` | Xác thực vùng Sweetspot Rìa Trượng | Đứng ở cự ly 3.5m (vùng $2.8\text{m} - 4.8\text{m}$) đánh thường; so sánh với khi đứng ở cự ly 1.5m | Tại cự ly 3.5m: số sát thương tăng đúng $+25\%$, âm thanh "KENG" phát ra, mục tiêu bị làm chậm $20\%$. Tại 1.5m: sát thương bình thường | `PENDING_RUNTIME` |
| `QA-LH-04` | Lớp khiên phản ứng chiêu W | Nhận sát thương từ trụ hoặc bot, bấm **W** kích hoạt khiên chắn | Khiên hiện lập tức không trễ ($0\text{s}$ windup), thanh máu chuyển màu hiển thị lớp khiên trắng, tồn tại đúng 3.0s | `PENDING_RUNTIME` |
| `QA-LH-05` | Quét tròn 360° chiêu E | Đi vào giữa đàn lính địch, bấm **E** | Toàn bộ lính trong bán kính 3.8m nhận sát thương và bị làm chậm $20\%$, không bỏ sót mục tiêu sau lưng | `PENDING_RUNTIME` |
| `QA-LH-06` | Ultimate R bật nhảy và chấn động nện đất | Bấm **R** chọn vùng đất cách 6.0m có bot đối thủ đứng | Linh Hầu nhảy lên không trung ($0.3\text{s}$ gồng + $0.4\text{s}$ bay), vệt telegraph vòng tròn hiện rõ; khi tiếp đất bot bị choáng $0.8\text{s}$ | `PENDING_RUNTIME` |
| `QA-LH-07` | Phản hồi điều khiển phím D Universal Dash | Di chuyển và bấm phím **D** trong các trạng thái (đang chạy, sau khi dùng Q, E) | Lướt mượt 4.5m, i-frame né đòn hoạt động, không bị khóa phím hay tự động kích hoạt kỹ năng khác | `PENDING_RUNTIME` |
| `QA-LH-08` | Hành vi Bot AI điều khiển Linh Hầu | Đưa Bot Linh Hầu vào trận đấu 1v1 và 5v5 | Bot biết dùng Q để rỉa máu, tự bật W khi thấp máu, biết nhảy R vào giao tranh tổng; không bị kẹt địa hình | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trên cấu hình máy tiêu chuẩn trong giao tranh tổng 5v5 có Linh Hầu thi triển chiêu cuối R.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Vòng tròn chấn động của R không phủ trắng màn hình, không che thanh máu của đồng minh hoặc kẻ địch.
   - Vệt trượng quét của E sát mặt đất, không che camera góc nhìn isometric góc nghiêng $55^\circ$.
3. **Độ trễ mạng & Đồng bộ (Network Replication):**
   - Vị trí rơi của R và trạng thái Trường Trượng phải đồng bộ chính xác giữa máy chủ và các máy khách (Client Replication). Không xảy ra hiện tượng "teleport" hoặc giật hình.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kỹ sư QA đã quan sát trực tiếp cả 8 kịch bản trên máy thật có build của Spawn runtime, ghi lại video bằng chứng và đính kèm commit hash thực tế.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi trượng không co giãn, mất buff sweetspot, hoặc kẹt dash D $\rightarrow$ Mở ticket Defect ID gửi về Gameplay Designer và Mechanics Maintainer sửa lại trước khi cấp nhãn `PLAYABLE PASS`.
