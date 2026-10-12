# 09 · Engine QA & Playtest Plan — #36 Rolo (Tê Tê Khiên)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#36 / rolo`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-RO-01` | Kiểm tra nội tại Bọc Thép (+35 Giáp, +35 MR) | Spawn Rolo vào trận cấp độ 1, mở bảng chỉ số thuộc tính | Giáp hiển thị $77$ ($42 + 35$), Kháng phép hiển thị $69$ ($34 + 35$); nhận sát thương giảm trừ chính xác | `PENDING_RUNTIME` |
| `QA-RO-02` | Kích hoạt W Tháo Vảy chuyển Dạng Cuồng Chiến | Bấm phím **W** trong trạng thái bình thường | Lớp khiên vàng đất hiện ngay lập tức trong 2.5s; Giáp giảm 25 điểm; Tốc chạy tăng $20\%$ ($6.1 \rightarrow 7.32$ m/s); Tốc đánh tăng $25\%$ ($0.65 \rightarrow 0.81$ đòn/s) kéo dài đúng 5.0 giây | `PENDING_RUNTIME` |
| `QA-RO-03` | Khôi phục vảy giáp sau 5.0 giây | Chờ hết 5.0s hiệu lực của Dạng Cuồng Chiến | Các phiến vảy trên mô hình tự động khép kín; Giáp phục hồi trở lại mức ban đầu; tốc chạy và tốc đánh trở về bình thường | `PENDING_RUNTIME` |
| `QA-RO-04` | Kỹ năng Q Bộc Phá Vảy Sừng | Nhắm và bấm **Q** theo hướng tướng địch ở cự ly 6.5m | Quất đuôi mượt mà, bắn chùm vảy sừng gây sát thương và làm chậm đối thủ $25\%$ trong 1.0 giây | `PENDING_RUNTIME` |
| `QA-RO-05` | Kỹ năng E Địa Chấn Tê Tê | Tiếp cận cự ly gần và bấm **E** | Đập đuôi tạo chấn động bán kính 3.6m, nứt sàn đấu, gây sát thương và làm chậm toàn bộ kẻ địch $35\%$ trong 1.2s | `PENDING_RUNTIME` |
| `QA-RO-06` | Chiêu cuối R Thiết Giáp Càn Quét (Phi nước đại 4 chân) | Bấm **R** chọn vùng đất cách 6.5m có tướng địch | Vòng đỏ cảnh báo hiện 0.3s; Rolo phi nước đại 4 chân dũng mãnh (**tuyệt đối không cuộn tròn thành quả bóng**), húc sầm xuống đất làm choáng toàn bộ kẻ địch $0.9\text{s}$ | `PENDING_RUNTIME` |
| `QA-RO-07` | Phản hồi điều khiển phím D Universal Dash | Di chuyển và bấm phím **D** | Lướt né 4.5m mượt mà theo hướng di chuyển, bảo lưu toàn vẹn trạng thái vảy giáp | `PENDING_RUNTIME` |
| `QA-RO-08` | Hành vi Bot Rolo trong giao tranh 5v5 | Quan sát Bot Rolo thi đấu cùng 9 bot khác | Bot biết lao R mở combat khi có nhiều mục tiêu; biết bấm W tháo vảy cào xé khi cận chiến; không bị kẹt pathfinding | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong các pha giao tranh tổng 5v5 khi Rolo dậm E địa chấn và tung R húc nổ đất.
2. **Kiểm tra ngoại hình dã thú 4 chân (No-Rolling Anti-Trope Check):**
   - Đảm bảo trong mọi góc nhìn của camera MOBA (kể cả khi nhìn từ trên cao xuống), Rolo luôn duy trì hình thể tê tê 4 chân dũng mãnh, các bước chạy chân trước chân sau rõ ràng, tuyệt đối không bị gập người cuộn tròn thành khối cầu.
3. **Độ đọc tín hiệu tháo vảy (Visual Readability for Opponents):**
   - Khi Rolo bấm W bung vảy, người chơi đối phương phải lập tức nhận biết được nhờ: (1) Hoạt ảnh vảy trên lưng dựng xòe ra ngoài, (2) Khí nhiệt bốc lên từ thớ cơ bắp, (3) Lớp khiên vàng đất bao quanh. Điều này bảo đảm tính công bằng tuyệt đối cho counterplay dồn sát thương sốc.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kỹ sư QA đã quan sát trực tiếp cả 8 kịch bản trên máy thật có build của Spawn runtime, ghi lại video bằng chứng 60 FPS và kiểm tra log không có lỗi null exception hay kẹt animation.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi mô hình cuộn tròn thành quả bóng, lỗi vảy không khép lại sau 5s, hoặc lỗi kẹt chỉ số giáp $\rightarrow$ Tạo ticket Defect ID bàn giao lại Gameplay Designer và Technical Artist sửa chữa trước khi cấp nhãn `PLAYABLE PASS`.
