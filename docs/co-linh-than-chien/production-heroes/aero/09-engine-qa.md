# 09 · Engine QA & Playtest Plan — #15 Aero (Phi Công Cổ Khí)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#15 / aero`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-AE-01` | Đánh thường bắn súng plasma hai nòng | Chọn mục tiêu Dummy ở cự ly $\le 6.2\text{m}$, bấm chuột đánh thường liên tục | Đạn plasma bay dứt khoát ($32\text{ m/s}$), âm thanh năng lượng giòn tan, nòng súng giật so le nhịp nhàng | `PENDING_RUNTIME` |
| `QA-AE-02` | Tốc độ di chuyển nội tại +15% thường trực | Đo vận tốc di chuyển của Aero so với tốc độ cơ bản | Vận tốc đạt đúng $7.36\text{ m/s}$ ($6.4 \times 1.15$), hiệu ứng phi cơ bay lơ lửng dập dờn không chạm đất | `PENDING_RUNTIME` |
| `QA-AE-03` | Lướt oanh tạc Q & Vệt thảm bom DoT 3.0s | Nhắm **Q** qua cụm lính cách $6.0\text{m}$ | Lướt bay thẳng $7.5\text{m}$, gây sát thương bộc phát và để lại vệt dung nham plasma $3.0\text{s}$ gây sát thương DoT $30\%$ AD/s | `PENDING_RUNTIME` |
| `QA-AE-04` | Khiên & Tăng tốc độ bay W | Bấm phím **W** khi đang bay | Nhận lớp khiên hấp thụ trong $2.5\text{s}$, tăng tốc bứt phá và phụt lửa phản lực đuôi | `PENDING_RUNTIME` |
| `QA-AE-05` | Pháo sáng phản lực giật lùi E | Tung **E** vào Dummy cận chiến cách $2.5\text{m}$ | Pháo sáng bắn phía trước làm chậm Dummy $35\%$, phi cơ giật lùi $4.5\text{m}$ về sau an toàn | `PENDING_RUNTIME` |
| `QA-AE-06` | Đại Oanh Tạc Chiến Dịch Ultimate R tầm 10.0m | Nhắm **R** vào tọa độ cách $9.5\text{m}$ | Lưới ngắm xanh lam hiện trong $0.55\text{s}$, bão bom plasma dội xuống bán kính $5.5\text{m}$ làm chậm $40\%$ trong $2.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-AE-07` | Ngoặt cánh né đòn phím D Universal Dash | Di chuyển và bấm phím **D** | Ngoặt cánh né đòn $4.5\text{m}$ mượt mà, không bị giật khựng khung hình | `PENDING_RUNTIME` |
| `QA-AE-08` | Hành vi Bot AI điều khiển Aero | Đưa Bot Aero vào trận 5v5 | Bot biết giữ cự ly $6.2\text{m}$ thả diều, biết dùng E giật lùi khi bị tiếp cận, biết dùng Q rải bom cắt đội hình và nã R vào tâm giao tranh | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong combat 5v5 khi Aero xả thảm bom Q và dội bão bom Ultimate R cùng lúc với nhiều chiêu thức khác.
2. **Độ rõ của Vệt Thảm Bom Plasma (Zone Readability):**
   - Vệt thảm bom trên mặt đất phải có viền ranh giới sắc nét rõ ràng, không bị lẫn màu với sông hay cỏ của bản đồ.
   - Hiệu ứng khói của thảm bom không được bốc quá cao làm che khuất tầm nhìn camera MOBA.
3. **Đồng bộ hóa mạng (Network Replication):**
   - Tọa độ lướt tới của Q ($7.5\text{m}$) và giật lùi của E ($4.5\text{m}$) phải đồng bộ tuyệt đối giữa Client và Server; không có hiện tượng "trôi dạt phi cơ" do độ trễ mạng.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ cấp khi kỹ sư QA đã quan sát trực tiếp và quay video kiểm chứng toàn bộ 8 kịch bản trên môi trường chạy thực tế của engine Spawn.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi phi cơ đáp xuống đi bộ bằng 2 chân, lỗi vệt thảm bom không gây sát thương DoT, hoặc lướt Q bị kẹt xuyên địa hình $\rightarrow$ Mở ticket Defect ID gửi về Mechanics Maintainer để sửa lại ngay lập tức.
