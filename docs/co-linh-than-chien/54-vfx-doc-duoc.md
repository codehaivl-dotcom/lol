# 54 · VFX đọc được: né đòn, ra đòn, cảm nhận va chạm (2026-10-09)

Nguồn: @lukasai 2026-10-09 + 2 bảng ảnh LoL/Liên Quân (/cdn/image-u2gszzeqe.webp, /cdn/image-u7rqx2ffe.webp):
"skill có phần đẹp mắt, nhưng ko rõ ràng đủ để né đòn, ra đòn, cảm nhận hiệu ứng tác động… đòn đánh thường cũng ko có vfx va đập
hoặc lực… phép+ranger ko nhìn rõ đạn/tên/cầu năng lượng… 1 số tướng cầm kiếm nhưng chém quá xa."

## Audit (đọc code, chưa quay trong trận)
| Lỗ | Nguyên nhân trong code |
|---|---|
| Đạn đánh thường không thấy | đầu đạn 0.30 m, rồi `glass()` nhân alpha 0.24 và hdr 0.36 → ~1/10 độ sáng; bay 38 m/s (10 m = 0.26 s). Camera MOBA ở xa. |
| Va chạm không có lực | `feel.impact`: tia lửa 0.02–0.06 m, chớp 0.6 m: cỡ cho camera gần, ở camera MOBA gần như vô hình. |
| Kiếm chém quá xa | Mộc Lẫm, Kha Tàn `lmb.range 3.0` đo tới **mép** mục tiêu (bán kính 0.5) → tâm-tâm 3.5 m; thân cao 2.15 m, kiếm dài ~1 m. |
| Không biết ai đang bị gì | chưa có thư viện trạng thái trên thân (doc 41 V2). |
| Chiêu khó né | đạn chiêu cũng qua `glass()`; báo trước vùng phía địch mờ. |

## Luật mới
- **Dấu chính đọc gameplay không qua GLASS**: đầu đạn (`pop head`), chớp va chạm, báo trước. GLASS chỉ làm mỏng hạt trang trí.
- Cỡ hình tính cho camera MOBA: đầu đạn đánh thường ≥ 0.5 m, đạn chiêu ≥ 0.8 m hoặc bằng `width` của chiêu.
- Tầm cận chiến = với tới thật của vũ khí: tay + vũ khí, đo tới mép mục tiêu.

## TODO
- [x] T1 Tầm: Mộc Lẫm (đao) 3.0 → 1.7 · Kha Tàn (qua, cán dài) 3.0 → 2.3. Sim balance không mô hình vị trí → không đổi số sim; ghi balance-log.
- [x] T2 Đạn đánh thường 4 tướng xa: đầu đạn rắn ≥ 0.5 m không qua GLASS + vệt; tốc 38 → 26 m/s.
- [x] T3 Va chạm `feel.impact`: chớp + vòng sáng + tia lửa cỡ MOBA theo cấp (thường/chiêu/tuyệt).
- [x] T4 Đạn chiêu (skillshot) cả 6 tướng: thân đạn bằng `width`, rắn, cả hai phe thấy rõ. (nối qua `vfx-heroes.yml` + `vfx/compose.js`; đạn đã xem trên bench, trong trận thật: NOT RUN)
- [ ] T5 Báo trước vùng trễ (Cột Lửa 0.7 s, Than Rơi 1 s): phe địch thấy rõ, đúng bán kính.
- [x] T6 Thư viện trạng thái trên thân (choáng, trói, chậm, mê, hất: đã xem ở góc camera MOBA trên Mạch Giữa; cháy, chảy máu, khiên: chưa) (doc 41 V2): choáng, trói, chậm, cháy, chảy máu, mê hoặc, khiên… bám thân suốt thời gian.
- [ ] T7 Vệt ngắm người cast: chờ @lukasai chọn (giữ nét cọ doc 30 hay vệt sắc như ảnh LoL).
- [ ] T8 Quay trong trận từng tướng, so trước/sau; chưa xem ghi NOT RUN.
