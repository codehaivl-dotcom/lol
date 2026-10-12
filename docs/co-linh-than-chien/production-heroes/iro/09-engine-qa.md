# 09 · Engine QA & Playtest Plan — #30 Iro (Mắt Thiên Cơ)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#30 / iro`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-IR-01` | Đánh thường đạn laser tầm cơ bản 7.5m | Chọn Dummy ở cự ly $\le 7.5\text{m}$, bấm chuột đánh thường liên tục | Đạn laser bay thẳng tắp ($38\text{ m/s}$), âm thanh xung kích đanh gọn, lõi pha lê chớp sáng đỏ | `PENDING_RUNTIME` |
| `QA-IR-02` | Tích lũy tiêu cự ngắm tĩnh đứng yên | Đứng yên hoàn toàn trong $4.0\text{ giây}$ | Tầm đánh cơ bản mở rộng từ $7.5\text{m} \rightarrow 13.5\text{m}$, 3 vành mở khóa chốt, bắn trúng Dummy cự ly $11.0\text{m}$ với sát thương $+30\%$ | `PENDING_RUNTIME` |
| `QA-IR-03` | Reset tiêu cự ngay lập tức khi di chuyển | Đang ở thế ngắm tĩnh tối đa ($13.5\text{m}$), bấm di chuyển 1 bước | Tầm đánh co ngay về $7.5\text{m}$, điểm `focusTime` về 0, không thể bắn trúng Dummy cách $11.0\text{m}$ | `PENDING_RUNTIME` |
| `QA-IR-04` | Tia laser cảnh báo 1.0s trước phát bắn xa | Khóa Dummy ở cự ly $10.5\text{m}$ trong thế ngắm tĩnh | Tia laser đỏ mỏng chiếu rọi lên ngực Dummy đúng $1.0\text{s}$ trước khi phát bắn kích hoạt | `PENDING_RUNTIME` |
| `QA-IR-05` | Tụ Quang Xuyên Phá Q xuyên hàng lính 12.0m | Đứng sau hàng lính, nhắm **Q** vào tướng địch cách $11.0\text{m}$ | Tia laser đỏ dày xuyên qua toàn bộ đàn lính không bị cản, gây sát thương lên tướng địch và làm chậm $20\%$ | `PENDING_RUNTIME` |
| `QA-IR-06` | Đẩy lùi cận chiến & Nhận khiên W | Cho Dummy cận chiến áp sát $\le 2.0\text{m}$, bấm phím **W** | Dummy bị đẩy văng ra xa $3.0\text{m}$, Iro nhận lớp khiên quang học bảo hộ trong $2.5\text{s}$ | `PENDING_RUNTIME` |
| `QA-IR-07` | Thiên Cơ Hủy Diệt Pháo Ultimate R tầm 22.0m | Nhắm **R** vào tướng địch ở cự ly $20.0\text{m}$ (ngoài màn hình thông thường) | Đường laser dẫn đường hiện $0.5\text{s}$, phát pháo laser $45\text{ m/s}$ quét xuyên qua bản đồ nã trúng mục tiêu, làm chậm $45\%$ trong $2.0\text{s}$ | `PENDING_RUNTIME` |
| `QA-IR-08` | Hành vi Bot AI điều khiển Iro | Đưa Bot Iro vào trận đấu 5v5 | Bot biết chọn vị trí đứng yên sau lưng đỡ đòn để ngắm tĩnh, biết bấm W đẩy lùi khi bị áp sát, biết nã Q và R xuyên qua lính cấu rỉa | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong combat 5v5 khi Iro nã tia Q dày $12.0\text{m}$ và bắn pháo Ultimate R siêu tầm xa $22.0\text{m}$ cùng các hiệu ứng bloom phát sáng.
2. **Độ rõ của Tia Laser Cảnh Báo (Warning Laser Readability):**
   - Tia laser đỏ cảnh báo phải hiển thị sắc nét trên mọi loại địa hình (cỏ, nước, nền đá), không bị chìm màu.
   - Đường laser dẫn đường của Ultimate R phải nhìn thấy rõ trên cả màn hình camera của nạn nhân ở cự ly xa để kịp phản xạ.
3. **Đồng bộ hóa mạng (Network Replication):**
   - Góc ngắm của tia laser và thời điểm bắn giữa Client và Server phải đồng bộ tuyệt đối; không xảy ra hiện tượng "lệch tia laser" (visual beam lệch so với server damage box).

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ cấp khi kỹ sư QA đã quan sát trực tiếp và quay video kiểm chứng toàn bộ 8 kịch bản trên môi trường chạy thực tế của engine Spawn.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi di chuyển mà KHÔNG bị reset tầm ngắm tĩnh, lỗi tia laser bắn không xuyên qua lính, hoặc nhãn cầu có chân đi bộ $\rightarrow$ Mở ticket Defect ID gửi về Mechanics Maintainer để sửa lại ngay lập tức.
