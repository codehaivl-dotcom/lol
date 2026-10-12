# 09 · Engine QA & Playtest Plan — #40 Liễu Tiễn (Băng Cung Chiến Thuật)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#40 / lieu_tien`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-LT-01` | Đánh thường tầm xa Băng Tiễn | Người chơi điều khiển Liễu Tiễn đứng cách dummy $7.0\text{m}$, bấm chuột đánh thường liên tục 10 giây | Hoạt ảnh giương cung kéo tên mượt mà, mũi tên bay với tốc độ $32\text{ m/s}$, không lệch cung khỏi tay, không giật khung hình | `PENDING_RUNTIME` |
| `QA-LT-02` | Kích hoạt và kiểm tra Vệt Sương Băng tự nhiên | Vừa bắn thường vừa click lùi bước (kiting) qua 3 đòn đánh liên tiếp | Vệt băng hình oval bán kính $2.2\text{m}$ tự động trải dưới chân, tồn tại đúng $3.0\text{s}$, tăng tốc chạy $+20\%$ cho Liễu Tiễn | `PENDING_RUNTIME` |
| `QA-LT-03` | Kiểm tra hiệu ứng làm chậm của Vệt Băng lên đối thủ | Cho Bot đối phương chạy đuổi theo Liễu Tiễn và dẫm vào vệt sương băng | Tốc độ chạy của Bot bị giảm ngay $25\%$, dưới chân Bot hiện hiệu ứng tuyết rơi làm chậm, không bị kẹt va chạm vật lý | `PENDING_RUNTIME` |
| `QA-LT-04` | Kỹ năng Q Băng Tiễn Xuyên Kích | Bấm phím **Q** ngắm bắn xuyên qua đàn lính trúng tướng địch ở cự ly $9.5\text{m}$ | Mũi tên bay thẳng đúng chiều rộng $1.3\text{m}$, tầm xa $10.0\text{m}$, gây sát thương vật lý và làm chậm tướng địch $20\%$ trong $1.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-LT-05` | Kỹ năng W Sương Băng Thối Bộ & Đại Vệt Băng | Khi bị Bot áp sát cự ly gần ($<3.0\text{m}$), bấm phím **W** | Nhân vật giật lùi $1.5\text{m}$ tức thì, nhận khiên băng $60-180\text{ HP}$, sinh Đại Vệt Băng bán kính $2.5\text{m}$ tồn tại $3.5\text{s}$ | `PENDING_RUNTIME` |
| `QA-LT-06` | Kỹ năng E Băng Lạc Vũ diện rộng | Bấm phím **E** thả mưa tên vào vị trí cụm lính và tướng địch cách $8.0\text{m}$ | Vòng báo động $3.5\text{m}$ hiện $0.3\text{s}$, sau đó mưa tên dội xuống gây sát thương diện rộng và làm chậm $35\%$ trong $1.5\text{s}$ | `PENDING_RUNTIME` |
| `QA-LT-07` | Chiêu cuối Ultimate R Cực Băng Đại Tiễn | Đứng từ xa ngắm **R** vào tướng địch cách $15.0\text{m}$ đang đứng sau hàng lính | Đại tiễn bay xuyên qua toàn bộ lính, va chạm tướng địch gây Choáng $1.0\text{s}$ và kích nổ Vùng Bão Tuyết $4.5\text{m}$ làm chậm $50\%$ xung quanh | `PENDING_RUNTIME` |
| `QA-LT-08` | Phản hồi điều khiển phím D Universal Dash | Di chuyển và bấm phím **D** trong khi đang kiting thả diều | Lướt mượt $4.5\text{m}$, có i-frame né đòn, không bị ngắt quãng chu kỳ dệt vệt băng sau khi kết thúc dash | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trên thiết bị tiêu chuẩn trong giao tranh tổng 5v5 khi Liễu Tiễn dệt liên tục 3-4 vệt băng và thi triển chiêu cuối R.
2. **Không che khuất tầm nhìn (Camera Occlusion Check):**
   - Vệt sương băng là decal phẳng sát mặt đất (cao tối đa $0.2\text{m}$), tuyệt đối không che thanh máu hoặc hình thể của tướng khác.
   - Vùng Bão Tuyết của chiêu R có vành đai tinh thể trong suốt, không làm lóa trắng màn hình camera góc nhìn isometric $55^\circ$.
3. **Độ trễ mạng & Đồng bộ (Network Replication):**
   - Vị trí của các Vệt Sương Băng và hiệu ứng tăng/giảm tốc độ chạy phải đồng bộ tuyệt đối giữa Server và tất cả Client (sai số vị trí $< 0.1\text{m}$). Không có hiện tượng giật cục (rubberbanding) khi đi trên băng.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được phê duyệt khi kỹ sư QA kiểm thử trực tiếp trên bản build Spawn runtime thực tế, ghi hình đầy đủ 8 kịch bản trên và đối chiếu log không có exception.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi vệt băng tạo vật cản va chạm chặn đường lính, đạn R bị cản bởi lính thường, hoặc kỹ năng W không tạo Đại Vệt Băng $\rightarrow$ Mở ticket Defect ID gửi về Gameplay Designer và Mechanics Maintainer giải quyết trước khi cấp nhãn `PLAYABLE PASS`.
