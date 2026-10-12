# 09 · Engine QA & Playtest Plan — #47 Cổ Lỗ (Huyền Quy Thần Cơ Sư)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#47 / co_lo`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-CL-01` | Cắm Chốt W & Mở rộng tầm bắn 8.5m | Bấm **W** cắm 4 chân cơ khí xuống đất | Cổ Lỗ bất động ($0\text{ m/s}$), nhận khiên và $+40$ Giáp/MR; tầm đánh mở rộng tới $8.5\text{m}$, bắn trúng Dummy ở cự ly $7.5\text{m}$ | `PENDING_RUNTIME` |
| `QA-CL-02` | Kiểm chứng VÙNG MÙ CẬN CHIẾN 2.5m | Khi đang Cắm Chốt, đặt Dummy ở cự ly $1.8\text{m}$ sát người và click đánh thường | Cổ Lỗ KHÔNG THỂ bắn trúng Dummy, con trỏ hiện icon cấm bắn màu đỏ, không gây sát thương | `PENDING_RUNTIME` |
| `QA-CL-03` | Đẩy lùi E giải thoát khỏi vùng mù | Dummy đứng ở cự ly $1.8\text{m}$, bấm phím **E** | Mũi tên cọc bắn trúng Dummy, hất văng Dummy ra xa $3.5\text{m}$ (thoát khỏi vùng mù ra cự ly $> 5.0\text{m}$), làm chậm $30\%$ | `PENDING_RUNTIME` |
| `QA-CL-04` | Thu nỏ chuyển về thế di động | Khi đang Cắm Chốt, bấm tái kích hoạt **W** | Sau $0.4\text{s}$ thu chân cơ khí, Cổ Lỗ có thể di chuyển bình thường ($6.1\text{m/s}$), tầm bắn trở về $5.5\text{m}$, có thể bắn cự ly gần | `PENDING_RUNTIME` |
| `QA-CL-05` | Universal Dash D hủy cắm chốt khẩn cấp | Đang ở thế Cắm Chốt, bấm phím **D** | Chốt cơ khí bung tức thì, Cổ Lỗ lướt né $4.5\text{m}$ mượt mà và tự động trở về trạng thái di động | `PENDING_RUNTIME` |
| `QA-CL-06` | Liên Châu Xuyên Kích Q (3 mũi tên) | Nhắm phím **Q** vào hàng 3 lính địch | Ba mũi tên xuyên qua cả 3 lính cự ly $8.5\text{m}$, toàn bộ lính nhận sát thương và bị làm chậm $20\%$ | `PENDING_RUNTIME` |
| `QA-CL-07` | Vạn Tiễn Quy Tông R dội mưa sao băng siêu xa | Bấm **R** nhắm vào cụm Bot địch ở khoảng cách $12.0\text{m}$ | Bão tiễn dội xuống bán kính $4.5\text{m}$, Bot địch chịu sát thương khủng và bị làm chậm $40\%$ trong $1.5\text{s}$ | `PENDING_RUNTIME` |
| `QA-CL-08` | Hành vi Bot AI điều khiển Cổ Lỗ | Đưa Bot Cổ Lỗ vào trận đấu 1v1 và 5v5 | Bot biết tìm vị trí cắm chốt phía sau đồng đội, biết dùng E đẩy lùi khi bị tiếp cận, biết bấm D rút lui khi cạn máu | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong giao tranh 5v5 khi Cổ Lỗ dội mưa bão tiễn R giữa 10 tướng.
2. **Hiển thị trực quan Vùng Mù Cận Chiến:**
   - Vòng tròn đỏ gạch chéo bán kính $2.5\text{m}$ dưới chân Cổ Lỗ phải hiển thị rõ nét cho cả người chơi và đối thủ.
   - Trận đồ thành ốc Cổ Loa của chiêu R phải hiện rõ $0.4\text{s}$ trước khi tiễn rơi để đảm bảo tiêu chuẩn phản xạ và né tránh (Counterplay).
3. **Giảm 50% sát thương lên công trình:** Kiểm tra trực tiếp số sát thương nhảy lên Trụ khi bắn ở thế Cắm Chốt phải giảm đúng $50\%$ so với bắn lên tướng địch có cùng lượng giáp.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kiểm thử viên QA thực hiện thành công toàn bộ 8 kịch bản trên bản dựng Spawn runtime chính thức, có video quay lại và commit hash đối chiếu.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi vẫn có thể bắn thường vào mục tiêu trong phạm vi $2.5\text{m}$ khi đang cắm chốt, hoặc lỗi kẹt vĩnh viễn không thể thu chân cơ khí $\rightarrow$ Đóng nhãn DEFECT nghiêm trọng và hoàn trả về nhóm phát triển.
