# 09 · Engine QA & Playtest Plan — #32 Kora (Hải Mẫu Cổ Giáp)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#32 / kora`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-KR-01` | Đánh thường cận chiến bằng càng thép | Tiếp cận Dummy ở cự ly $\le 1.9\text{m}$, bấm chuột đánh thường liên tục | Đòn kẹp càng dứt khoát ($0.60\text{ đòn/s}$), âm thanh kim khí va đập đanh thép, vệt bọt nước lam mờ | `PENDING_RUNTIME` |
| `QA-KR-02` | Kích hoạt Cửa Đập W & Giảm 60% đạn đạo phía trước | Bật **W** đối diện Dummy xạ thủ (Aero hoặc Iro) đang bắn đạn đạo | Nhận lớp khiên hấp thụ, sát thương đạn đạo bay vào góc $180^\circ$ phía trước giảm chính xác $60\%$, hiển thị proc block đạn | `PENDING_RUNTIME` |
| `QA-KR-03` | Kiểm tra điểm yếu đạn đạo sau lưng và sườn | Bật **W**, cho Dummy xạ thủ bắn từ sườn $90^\circ$ hoặc sau lưng $180^\circ$ | Sát thương đạn đạo KHÔNG bị giảm $60\%$ (chịu đủ $100\%$ sát thương trừ vào khiên/máu), chứng minh đúng cơ chế hướng | `PENDING_RUNTIME` |
| `QA-KR-04` | Phạt tốc độ di chuyển khi giương thủ | Bật **W** và di chuyển liên tục | Tốc độ di chuyển giảm chính xác $20\%$ ($6.2 \rightarrow 4.96\text{ m/s}$), dáng bò xả hơi nước liên tục | `PENDING_RUNTIME` |
| `QA-KR-05` | Kẹp nghiền Thiết Càng Q làm choáng | Tung **Q** vào Dummy cự ly $2.2\text{m}$ | Kẹp nghiến trúng mục tiêu, gây đúng sát thương vật lý và làm choáng $0.6\text{s}$ | `PENDING_RUNTIME` |
| `QA-KR-06` | Ủi thân Hải Triều Xung Kích E | Tung **E** xuyên qua cụm lính và tướng địch | Lướt ủi thẳng $5.5\text{m}$ vận tốc $20\text{ m/s}$, hất dạt mục tiêu sang hai bên và làm chậm $35\%$ trong $1.2\text{s}$ | `PENDING_RUNTIME` |
| `QA-KR-07` | Chiêu cuối Hải Trấn Thần Uy R dập sóng thần | Bấm **R** giữa 3 tướng địch | Windup $0.3\text{s}$ dập 2 càng xuống đất, sóng thần nổ tỏa bán kính $5.5\text{m}$ sau $0.2\text{s}$ delay, làm choáng toàn bộ $1.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-KR-08` | Hành vi Bot AI điều khiển Kora | Đưa Bot Kora vào trận 5v5 | Bot biết đi trước che đạn cho xạ thủ, biết bật W khi bị bắn tỉa, biết ủi E mở giao tranh và dập R khi có từ 2 địch trở lên | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong combat 5v5 khi Kora bật W liên tục chặn đạn và thi triển Ultimate R bung bão sóng thần.
2. **Độ rõ góc chắn đạn ($180^\circ$ Directional Arc):**
   - Vòm chắn sóng nước hình bán nguyệt phía trước phải hiển thị rõ ranh giới góc $180^\circ$ trên sàn đấu, giúp cả người chơi Kora lẫn đối thủ nhận biết rõ đâu là góc được bảo vệ và đâu là góc hở sườn.
   - Không được dùng hiệu ứng khiên kín $360^\circ$ gây hiểu lầm là khiên toàn phần.
3. **Đồng bộ hóa mạng (Network Replication):**
   - Góc quay hướng mặt của Kora khi bật W phải đồng bộ chuẩn xác tức thời giữa Client và Server; không có hiện tượng giật lệch góc khiến đạn bắn thẳng mặt lại bị tính là trúng sườn hoặc ngược lại.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ cấp khi kỹ sư QA đã quan sát trực tiếp và quay video kiểm chứng toàn bộ 8 kịch bản trên môi trường chạy thực tế của engine Spawn.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi giảm sát thương cả sau lưng ($360^\circ$ all-around), lỗi không giảm $20\%$ tốc độ chạy, hoặc càng cua cầm sai mô hình $\rightarrow$ Mở ticket Defect ID gửi về Mechanics Maintainer để sửa lại ngay lập tức.
