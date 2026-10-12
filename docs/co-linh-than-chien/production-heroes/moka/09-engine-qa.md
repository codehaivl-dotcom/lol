# 09 · Engine QA & Playtest Plan — #31 Moka (Hổ Nấm Răng Kiếm)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#31 / moka`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-MK-01` | Đánh thường cận chiến bằng nanh vuốt | Tiếp cận Dummy ở cự ly $\le 1.8\text{m}$, bấm chuột đánh thường liên tục | Chuỗi hoạt ảnh cào vuốt và cắn nanh dứt khoát ($0.68\text{ đòn/s}$), vệt cào cam neon rõ nét, SFX rách thịt đanh thép | `PENDING_RUNTIME` |
| `QA-MK-02` | Bắn bào tử Q & Đánh dấu lộ diện 4.0s | Nhắm **Q** vào Dummy đang nấp trong bụi rậm cách $5.5\text{m}$ | Đạn bào tử trúng mục tiêu, Dummy bị lộ diện hoàn toàn trong $4.0\text{s}$, làm chậm $25\%$ trong $1.2\text{s}$, icon nấm cam trên đầu | `PENDING_RUNTIME` |
| `QA-MK-03` | Cú vồ tầm xa 7.0m của nội tại | Sau khi Dummy trúng Q, Moka đứng cách $6.5\text{m}$ bấm đánh thường | Moka phóng người qua khoảng cách $6.5\text{m}$ vồ sập mục tiêu, gây thêm $+40\%$ Bonus AD sát thương bộc phát | `PENDING_RUNTIME` |
| `QA-MK-04` | Khiên & Tăng tốc độ chạy W | Bấm phím **W** khi đang di chuyển | Nhận khiên hấp thụ trong $2.5\text{s}$ và tăng tốc độ chạy $+30\%$ trong $2.0\text{s}$ mượt mà | `PENDING_RUNTIME` |
| `QA-MK-05` | Quét vuốt toái cốt E làm chậm | Đứng giữa 2 Dummy, bấm phím **E** | Vòng cào xé bán kính $3.2\text{m}$ gây sát thương và áp dụng làm chậm $35\%$ trong $1.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-MK-06` | Mãnh Hổ Tuyệt Sát Ultimate R | Bấm **R** chọn tướng địch cách $7.0\text{m}$ | Tiếng gầm vang dội phát ra trong $0.25\text{s}$ windup, Moka phóng người $7.0\text{m}$ cắn ngập nanh kiếm làm choáng $0.8\text{s}$ | `PENDING_RUNTIME` |
| `QA-MK-07` | Phản hồi phím D Universal Dash né đòn | Di chuyển và bấm phím **D** | Chồm lướt dã thú $4.5\text{m}$ không khựng, có thể vượt qua bờ tường mỏng | `PENDING_RUNTIME` |
| `QA-MK-08` | Hành vi Bot AI điều khiển Moka | Đưa Bot Moka vào trận đấu 5v5 | Bot biết rình bụi rậm, bắn Q tầm xa trước, nếu trúng Q mới vồ vào con mồi máu yếu; không lao thẳng vào giữa 5 người khi chưa có dấu bào tử | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trên cấu hình máy tiêu chuẩn trong giao tranh tổng 5v5 khi Moka liên tục phát tán bụi bào tử nấm và thực hiện các cú vồ tầm xa.
2. **Độ rõ của dấu ấn Bào Tử (Spore Mark Readability):**
   - Icon nấm màu vàng cam phát quang trên đầu mục tiêu phải hiển thị rõ ràng, không bị chìm vào môi trường nền cỏ hay sàn đá.
   - Vòng tròn hiển thị tầm vồ $7.0\text{m}$ của Moka phải hiện mờ dưới chân để người chơi dễ dàng căn cự ly tung đòn.
3. **Đồng bộ hóa mạng (Network Replication):**
   - Tọa độ cú vồ tầm xa ($7.0\text{m}$) giữa Client và Server phải khớp tuyệt đối; không xảy ra hiện tượng "teleport giật cục" khi Moka tiếp đất đè lên mục tiêu.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ cấp khi kỹ sư QA đã quan sát trực tiếp và quay video kiểm chứng toàn bộ 8 kịch bản trên môi trường chạy thực tế của engine Spawn.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi có thể vồ mồi khi mục tiêu KHÔNG dính bào tử, lỗi tiếng gầm không phát ra trước khi vồ R, hoặc cầm sai vũ khí nhân tạo $\rightarrow$ Mở ticket Defect ID gửi về Mechanics Maintainer để sửa lại ngay lập tức.
