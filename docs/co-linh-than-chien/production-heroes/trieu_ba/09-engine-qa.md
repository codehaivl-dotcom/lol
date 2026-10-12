# 09 · Engine QA & Playtest Plan — #45 Triều Bá (Hắc Long Thủy Tộc)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#45 / trieu_ba`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-TB-01` | Quản lý 3 rồng nội tại & Tăng chỉ số giáp | Quan sát chỉ số bảng C khi vào trận với 3 rồng | Giáp và Kháng phép hiển thị đúng $+36$ so với chỉ số nền tảng; 3 rồng xoay đều quanh thân | `PENDING_RUNTIME` |
| `QA-TB-02` | Phóng Thủy Long Q & Giảm giáp tương ứng | Bấm **Q** phóng 1 rồng vào cọc tiêu cách $7.0\text{m}$ | 1 con rồng phóng đi, trên sàn xuất hiện vệt nước ngập; số rồng giảm còn 2, Giáp/Kháng phép giảm tương ứng về $+24$ | `PENDING_RUNTIME` |
| `QA-TB-03` | Vệt nước Q làm chậm kẻ địch | Cho Bot địch chạy băng qua vệt nước của Q | Tốc độ chạy của Bot bị giảm $25\%$ rõ rệt trong $1.2\text{s}$ kèm hiệu ứng nước ngập bàn chân | `PENDING_RUNTIME` |
| `QA-TB-04` | Thu hồi rồng W & Kéo địch trên vệt nước | Cho Bot địch đứng trên vệt nước, bấm phím **W** | Rồng bay ngược về thân, Triều Bá nhận khiên nước; Bot địch bị kéo trượt $2.0\text{m}$ về phía Triều Bá kèm ngắt bước chạy | `PENDING_RUNTIME` |
| `QA-TB-05` | Thủy Ba Xoáy Ngầm E đẩy lùi cận chiến | Đứng gần Bot sát thủ đang áp sát, bấm phím **E** | Cột nước bùng nổ quanh thân, đẩy Bot lùi ra ngoài bán kính $3.8\text{m}$ và làm chậm $35\%$ trong $1.5\text{s}$ | `PENDING_RUNTIME` |
| `QA-TB-06` | Đại Hồng Thủy R quét sóng diện rộng | Bấm **R** nhắm vào hàng 3 Bot địch cách $6.0\text{m}$ | Đợt sóng thần quét qua $8.0\text{m}$, cả 3 Bot bị cuốn lùi theo hướng sóng, dính choáng $0.8\text{s}$ và bị ngắt kỹ năng đang niệm | `PENDING_RUNTIME` |
| `QA-TB-07` | Phản hồi phím D Universal Dash | Di chuyển và bấm phím **D** | Lướt né $4.5\text{m}$ mượt mà trên gợn sóng nước, không làm mất các con rồng đang xoay quanh thân | `PENDING_RUNTIME` |
| `QA-TB-08` | Hành vi Bot AI điều khiển Triều Bá | Đưa Bot Triều Bá vào trận đấu 1v1 và 5v5 | Bot biết giữ khoảng cách cấu rỉa bằng Q, biết dùng W thu hồi rồng khi bị tấn công để lấy khiên, biết dâng R mở combat | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong giao tranh 5v5 khi Triều Bá tung chiêu R quét sóng thần qua đồng thời 10 tướng và lính.
2. **Độ trong suốt của nước (Water Transparency Check):**
   - Vệt nước `water_trail` và đợt sóng thần `trieu_ba_r` có độ khúc xạ vừa phải, không che khuất mặt sàn, vòng chỉ định kỹ năng của đồng đội hoặc tướng địch.
3. **Tính đồng bộ mạng (Replication Check):** Vị trí kéo của chiêu W phải chính xác giữa client và server, không gây hiện tượng giật cục vị trí của đối phương.

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kiểm thử viên QA xác nhận cả 8 kịch bản hoạt động hoàn hảo trên bản dựng máy khách và máy chủ Spawn runtime thực tế.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi rồng bay mất không hồi lại sau chiêu W, hoặc sóng thần R gây lỗi crash shader trên GPU tầm trung $\rightarrow$ Đóng nhãn DEFECT và yêu cầu sửa lỗi.
