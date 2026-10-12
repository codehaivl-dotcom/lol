# 09 · Engine QA & Playtest Plan — #46 Dũng Thạch (Thần Rìu & Thiên Cầm)

**Trạng thái:** `QA_PLAN_READY / PENDING_SPAWN_RUNTIME_INTEGRATION`  
**Khóa định danh:** `#46 / dung_thach`  
**Mục tiêu nghiệm thu:** [Tài liệu 105 §S9 & Tài liệu 104 Gate 8](../../104-full-approved-roster-production-master-plan.md) — Đạt chuẩn `PLAYABLE PASS` trên runtime Spawn thực tế.

---

## 1. Kịch Bản Kiểm Thử Thực Chiến 1v1 & 5v5 (Playable Match Scenarios)

| Mã kiểm thử (Test ID) | Nội dung kịch bản | Thao tác thực hiện | Tiêu chí đạt (Pass Criteria) | Trạng thái hiện tại |
|---|---|---|---|:---:|
| `QA-DT-01` | Nhịp đánh 1-2-3 & Sát thương chuẩn | Đánh thường liên tiếp 3 đòn vào Bot đỡ đòn có giáp cao | Đòn 1 và 2 gây sát thương vật lý bị giảm trừ bởi giáp; đòn 3 nứt đất gây đúng $+35\%$ AD sát thương chuẩn bỏ qua giáp | `PENDING_RUNTIME` |
| `QA-DT-02` | Reset bộ đếm đòn đánh sau 3.5s | Đánh 2 đòn thường rồi dừng lại chờ 4.0 giây | Đòn đánh tiếp theo phải là đòn 1 (không kích hoạt sát thương chuẩn), bộ đếm reset chính xác | `PENDING_RUNTIME` |
| `QA-DT-03` | Giải phóng khống chế mềm bằng W | Cho Bot địch làm chậm hoặc trói chân Dũng Thạch, bấm **W** | Hiệu ứng làm chậm/trói chân biến mất tức thì, Dũng Thạch nhận lớp khiên và bắt đầu gảy đàn | `PENDING_RUNTIME` |
| `QA-DT-04` | Giảm 25% sát thương địch & Khóa đòn 1.0s | Bấm **W** khi Bot địch đang đánh thường | Bot địch bị giảm $25\%$ sát thương gây ra trong $1.5\text{s}$; Dũng Thạch trong $1.0\text{s}$ gảy đàn không thể vung rìu đánh thường | `PENDING_RUNTIME` |
| `QA-DT-05` | Không thể bấm W khi dính Stun | Cho Bot làm choáng cứng Dũng Thạch, cố gắng bấm phím **W** | Kỹ năng W bị khóa, không thể kích hoạt giải choáng; âm thanh báo kỹ năng không khả dụng phát lên | `PENDING_RUNTIME` |
| `QA-DT-06` | Phóng khí chém Q Khai Sơn Phách | Nhắm phím **Q** vào Bot địch cách $5.0\text{m}$ | Vệt chém đường thẳng $6.8\text{m}$ cày nát sàn đấu, gây sát thương và làm chậm Bot $30\%$ trong $1.2\text{s}$ | `PENDING_RUNTIME` |
| `QA-DT-07` | Xoay rìu E Cuồng Phách Toái Giáp | Đứng giữa đám lính địch, bấm phím **E** | Vệt chém $360^\circ$ quét sạch bán kính $3.5\text{m}$, thanh máu Dũng Thạch hồi phục rõ rệt theo sát thương | `PENDING_RUNTIME` |
| `QA-DT-08` | Ultimate R nhảy vồ bổ nứt miệng hố | Bấm **R** chọn vùng đất cách $5.5\text{m}$ có Bot địch đứng | Nhảy vồ lên không ($0.55\text{s}$ telegraph), bổ rìu hất tung và gây choáng $0.8\text{s}$ bán kính $4.8\text{m}$ | `PENDING_RUNTIME` |

---

## 2. Kiểm Tra Hiệu Năng & Độ Rõ Ràng Thị Giác (Performance & Visual Readability)

1. **Tốc độ khung hình (FPS Target):** Đạt ổn định $\ge 60$ FPS trong giao tranh 5v5 khi Dũng Thạch nhảy R bổ rìu nứt đất giữa 10 tướng.
2. **Độ phân biệt giữa Rìu và Đàn:**
   - Trạng thái gảy đàn W phải có tư thế cơ thể hoàn toàn khác biệt so với tư thế vác rìu chiến đấu, tránh gây hiểu lầm cho người chơi đối diện.
   - Icon cành ngô đồng giảm sát thương trên đầu địch hiển thị rõ ràng nhưng không che thanh máu.
3. **Tính chính xác của rãnh nứt đất:** Vết nứt đất của đòn đánh thứ 3 và miệng hố của R phải dọn sạch sau đúng thời gian quy định, không để lại rác bộ nhớ (Memory leak particles).

---

## 3. Quy Tắc Nghiệm Thu Bàn Giao (Sign-off Criteria)

- **PASS_ENGINE:** Chỉ được đóng dấu khi kiểm thử viên QA thực hiện thành công toàn bộ 8 kịch bản trên bản dựng Spawn runtime chính thức, có video quay lại và commit hash đối chiếu.
- **DEFECT / BLOCKED:** Nếu phát hiện lỗi có thể gảy đàn W để thoát khỏi trạng thái Choáng cứng (Stun), hoặc lỗi đòn đánh thứ 3 stack vô hạn $\rightarrow$ Đóng nhãn DEFECT nghiêm trọng và hoàn trả về nhóm phát triển.
