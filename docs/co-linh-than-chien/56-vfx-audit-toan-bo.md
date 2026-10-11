# 56 · Audit toàn bộ VFX 6 tướng (2026-10-09)

Yêu cầu @lukasai: "Audit lại toàn bộ skill. effect... có mấy chục loại type... Tính toán lại .polish lại".
Công cụ: `python3 tools/audit/vfx-audit.py` in ma trận tướng × chiêu × khoảnh khắc và mọi lỗi số đo (0 lỗi = đạt).

## TODO
- [x] A1 Ma trận: mỗi tướng × lmb/rmb/q/e/r/passive × (vung, bay, trúng, rơi, trạng thái) có hình đọc được từ thư viện.
- [x] A2 Kích thước đạn = hitbox: viền ngoài đạn chiêu = `width` trong heroes.yml (trước đây ≈1.6× width, to hơn vùng né).
- [x] A3 Vòng nổ vùng = `radius` thật (sóng 2.0× bán kính = đường kính), cảnh báo đất có cho mọi vùng có trễ.
- [x] A4 Chém cận chiến = `range` thật (đã đúng: reach = range + 0.3 m mép lưỡi).
- [x] A5 Thư viện trạng thái thêm loại còn thiếu: cháy, chảy máu (theo cộng dồn), dấu ấn (Hỏa Túy), tăng tốc, hồi máu, khiên vỡ.
- [x] A6 Mọi hiệu ứng bám thân phải tự tắt theo thời gian (lỗi vòng kẹt dưới chân 2026-10-09: `count:` không phải burst nên phát mãi).
- [x] A7 Mỗi chương trình ≤ 8 quần thể (giới hạn engine).
- [ ] A8 Kiểm trong trận ở góc camera MOBA: chưa chạy cho tới khi xem thật.

## Kết quả (2026-10-09)
- Vòng kẹt dưới chân: `count:` trần trong vfx-status/recall là bộ phát vô hạn → đổi thành `burst`; vòng đã kẹt trên người chơi + bot đã xoá. Xem trên màn creator: sạch.
- Đạn chiêu: trước to ≈1.6–1.85× hitbox (Mộc Lẫm Q vẽ ~3 m cho vùng né 1.6 m). Giờ viền ngoài = `width`. Bậc chiêu/tuyệt thể hiện bằng ánh sáng, vệt, mảnh rơi, không phồng thân.
- Nhạm Vũ Q: rộng 3 m trước vẽ 1 mũi tên khổng lồ → 3 mũi song song lấp đúng dải 3 m (`volley: 3`).
- Sóng vùng = đúng đường kính 2r. Chiêu vùng quanh thân có gồng ≥ 0.25 s (Kha Tấn Q 0.6 s, Vân Dao R 0.3 s) giờ có cảnh báo đất như chiêu ném.
- Trạng thái mới: cháy (Hỏa Túy nội tại), chảy máu có số khía theo cộng dồn (Kha Tấn), dấu ấn (Hỏa Túy chuột phải, tắt ngay khi kích nổ), tăng tốc (Nhạm Vũ E, Vân Dao E), hồi máu, khiên vỡ (viền khiên tắt cùng).
- Đã xem tĩnh ở góc trên cao: cháy, chảy máu, dấu ấn hiện rõ. Tăng tốc/cháy vòng đất mờ trên nền đá sáng → đã tăng. Hồi máu, khiên vỡ, đạn mới, 3 mũi Nhạm Vũ: NOT RUN trong trận thật.

| tướng | chiêu | kiểu | hình đọc được |
|---|---|---|---|
| moc_lam | lmb | melee | chém slash r=2.0m (tầm 1.7) · va đập |
| moc_lam | rmb | self | tự thân · khiên (viền + vỡ) |
| moc_lam | q | skillshot | đạn Ø1.6m = hitbox, bay 0.34s · root 0.5s |
| moc_lam | e | area | vùng r=3.6m sóng Ø7.2m |
| moc_lam | r | target | đòn lên mục tiêu · khiên (viền + vỡ) |
| moc_lam | passive | every_nth_hit | slow 1.0s |
| kha_tan | lmb | melee | chém sweep r=2.6m (tầm 2.3) · va đập |
| kha_tan | rmb | target | đòn lên mục tiêu · slow 1.5s |
| kha_tan | q | area | vùng r=4.5m sóng Ø9.0m, cảnh báo 0.60s · hồi máu |
| kha_tan | e | skillshot | đạn Ø1.2m = hitbox, bay 0.40s · hất/kéo |
| kha_tan | r | target | đòn lên mục tiêu |
| kha_tan | passive | bleed | bleed 4.0s |
| mi_dang | lmb | projectile | đạn comet Ø0.48m · va đập |
| mi_dang | rmb | target | đòn lên mục tiêu |
| mi_dang | q | skillshot | đạn Ø1.4m = hitbox, bay 0.59s |
| mi_dang | e | skillshot | đạn Ø1.2m = hitbox, bay 0.50s · charm 1.1s |
| mi_dang | r | target | đòn lên mục tiêu |
| mi_dang | passive | after_ability |  |
| hoa_tuy | lmb | projectile | đạn comet Ø0.50m · va đập |
| hoa_tuy | rmb | skillshot | đạn Ø1.2m = hitbox, bay 0.46s · dấu ấn 4s |
| hoa_tuy | q | area | vùng r=2.6m sóng Ø5.2m, cảnh báo 0.90s · stun 0.75s |
| hoa_tuy | e | area | vùng r=4.0m sóng Ø8.0m · slow 1.5s · hất/kéo |
| hoa_tuy | r | area | vùng r=4.0m sóng Ø8.0m, cảnh báo 1.30s |
| hoa_tuy | passive | burn_on_ability | burn 3.0s |
| nham_vu | lmb | projectile | đạn arrow Ø0.50m · va đập |
| nham_vu | rmb | skillshot | đạn Ø1.0m = hitbox, bay 0.47s · slow 2.0s |
| nham_vu | q | skillshot | đạn Ø3.0m = hitbox, bay 0.38s |
| nham_vu | e | self | tự thân · tăng tốc |
| nham_vu | r | skillshot | đạn Ø2.0m = hitbox, bay 0.45s |
| nham_vu | passive | every_nth_hit | slow 1.0s |
| van_dao | lmb | projectile | đạn comet Ø0.48m · va đập |
| van_dao | rmb | skillshot | đạn Ø1.3m = hitbox, bay 0.50s · root 1.5s |
| van_dao | q | area | vùng r=4.0m sóng Ø8.0m, cảnh báo 0.70s · hồi máu |
| van_dao | e | self | tự thân · hất/kéo · khiên (viền + vỡ) · tăng tốc |
| van_dao | r | area | vùng r=6.0m sóng Ø12.0m, cảnh báo 0.30s · hất/kéo · hồi máu |
| van_dao | passive | after_ability |  |

status library: bleed, burn, charm, haste, heal, knock, mark, root, shieldbreak, slow, stun

0 issues
