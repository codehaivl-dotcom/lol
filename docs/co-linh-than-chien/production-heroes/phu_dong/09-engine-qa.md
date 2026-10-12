# 09 · Engine QA & Playtest Plan — #43 Phù Đổng (Thiết Mã Thiên Tướng)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#43 / phu_dong`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-PD-01` | Tích tụ Xung Lượng khi di chuyển liên tục | Điều khiển Phù Đổng chạy vòng quanh sân tập trong 4.0 giây | Thanh Xung Lượng tăng đều $25\text{ điểm/giây}$ lên tối đa 100; tốc độ di chuyển tăng dần thấy rõ ($+20\%$ MS), hiệu ứng bờm lửa rực sáng | `PENDING_RUNTIME` |
| `QA-PD-02` | Kích hoạt Cú Húc Lôi Hỏa khi $\ge 80$ đà | Chạy tích đủ 100 đà rồi bấm đánh thường vào Dummy ở cự ly $2.1\text{m}$ | Ngựa sắt chồm móng dậm xuống, Dummy bị choáng $0.6\text{s}$, gây thêm $+50\%$ AD sát thương, thanh đà tiêu hao về 0 | `PENDING_RUNTIME` |
| `QA-PD-03` | Lướt đâm đường thẳng Q Thiết Mã Đột Kích | Nhắm phím **Q** vào hàng 3 lính địch cách $5.0\text{m}$ | Phù Đổng lướt xuyên thấu cả 3 lính cự ly $7.2\text{m}$, toàn bộ lính nhận sát thương và bị làm chậm $30\%$ trong $1.2\text{s}$ | `PENDING_RUNTIME` |
| `QA-PD-04` | Kích hoạt tức thì Khiên W Kim Giáp | Bị trụ bắn hoặc Bot tấn công, bấm phím **W** | Lớp khiên hấp thụ xuất hiện tức thì ($0\text{s}$ trễ), giá trị khiên hiển thị đúng $8\%$ máu tối đa, tồn tại đúng $3.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-PD-05` | Quét kiếm diện rộng E Lôi Hỏa Trảm | Đứng giữa vòng vây lính, bấm phím **E** | Vệt chém tròn $360^\circ$ quét sạch bán kính $3.6\text{m}$, gây sát thương và làm chậm $25\%$ trong $1.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-PD-06` | Ultimate R nện đất & Chuyển thế Cổ Trúc | Bấm **R** chọn vùng đất cách $5.5\text{m}$ có Bot địch đứng | Phóng ngựa lên không trung ($0.7\text{s}$ telegraph), dậm đất gây choáng $1.0\text{s}$ bán kính $4.8\text{m}$; Thần Kiếm vỡ vụn, nhổ Cổ Trúc vào tay; trong 6.0s tiếp theo tầm đánh đạt $3.5\text{m}$ quét lan $+35\%$ AD | `PENDING_RUNTIME` |
| `QA-PD-07` | Phản hồi phím D Universal Dash | Di chuyển và bấm phím **D** trong các trạng thái khác nhau | Lướt né $4.5\text{m}$ mượt mà, không bị kẹt animation kỵ mã, bảo toàn số điểm Xung Lượng đang có | `PENDING_RUNTIME` |
| `QA-PD-08` | Hành vi Bot AI điều khiển Phù Đổng | Đưa Bot Phù Đổng vào trận đấu 1v1 và 5v5 | Bot biết chạy tích đà trước khi lao vào húc, biết phối hợp combo R mở combat $\rightarrow$ quất Cổ Trúc $\rightarrow$ bật W trụ đòn; không bị kẹt địa hình | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trên cấu hình máy tiêu chuẩn trong giao tranh tổng 5v5 khi Phù Đổng bật Ultimate R nện đất giữa 10 tướng.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Vòng sấm sét trống đồng của R không phủ kín che khuất thanh máu đồng đội hoặc đối thủ.
   - Khi quất cụm tre $3.5\text{m}$, hiệu ứng hồ quang điện trường bám sát mặt đất, không che camera góc nhìn isometric góc nghiêng $55^\circ$.
3. **Độ trễ mạng & Đồng bộ (Network Replication):**
   - Tọa độ lướt của Q ($7.2\text{m}$) và vị trí tiếp đất của R ($5.5\text{m}$) phải đồng bộ chính xác giữa máy chủ và các máy khách. Tuyệt đối không xảy ra hiện tượng "rubber-banding" hoặc giật lùi vị trí ngựa.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kỹ sư QA đã quan sát trực tiếp cả 8 kịch bản trên máy thật có build của Spawn runtime, ghi lại video bằng chứng và đính kèm commit hash thực tế.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi người và ngựa bị tách rời mesh, mất trạng thái Cổ Trúc trước 6.0s, hoặc kẹt dash Q vào góc tường $\rightarrow$ Mở ticket Defect ID gửi về Gameplay Designer và Mechanics Maintainer sửa lại trước khi cấp nhãn `PLAYABLE PASS`.
