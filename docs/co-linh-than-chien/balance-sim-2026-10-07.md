# Mô phỏng balance, lượt 1 (2026-10-07)

Đây là kết quả của **mô hình**, chưa phải playtest. Mô hình duel không có địa hình, lính, trụ, đồng đội hay kỹ năng người chơi. Mô hình trận 5v5 là mô hình macro, mỗi bước 1 giây.

## 1v1: 6 tướng (`tools/balance/report.mjs tools/balance/out/mults.json 80`)

Hệ số đã áp dụng (`tools/balance/out/mults.json`, tìm bởi `optimize.mjs`): hp × / dmg ×
moc_lam 1.03/0.94 · kha_tan 1.10/1.08 · mi_dang 1.30/1.00 · hoa_tuy 1.12/1.24 · nham_vu 0.83/0.88 · van_dao 1.25/1.00

Thay đổi kit: Vân Dao E có thêm nhảy lùi 4 m và gỡ chậm/trói, CD 18→14. Kha Tàn RMB lướt 4,5 m. Xạ thủ có xuyên giáp 3,5%/món (tối đa 35%). Đấu sĩ giáp/món 10→8.

| Tướng | TB thắng | Mục tiêu 45–55% |
|---|---:|---|
| moc_lam | 54.8% | ĐẠT |
| kha_tan | 49.8% | ĐẠT |
| mi_dang | 47.9% | ĐẠT |
| hoa_tuy | 52.6% | ĐẠT |
| nham_vu | 47.6% | ĐẠT |
| van_dao | 47.4% | ĐẠT |

**Vượt 70/30 (TRƯỢT):** kha_tan–van_dao 82/18, van_dao–hoa_tuy 79/21, moc_lam–nham_vu 78/22, hoa_tuy–kha_tan 75/25. Đây là counter về kit (tầm/khống chế), hệ số chung không sửa được. Lượt 2 cần sửa kit.

## Trận 5v5 (`tools/balance/match.mjs 300`)

Với HP trụ theo 08 §7: trung vị khoảng 5 phút. Mô hình kết thúc trận quá sớm. Tham số đề xuất trong `RULES`: HP trụ ×3,5, trụ giảm 70% sát thương nhận vào trước 14:00, tia Tâm Mạch 260 dps (+35% cho mỗi Trấn Mạch còn đứng), đội thua vàng nhận thêm tối đa 35% vàng/XP lính.

Kết quả: p10 16.2 · trung vị 20.7 · p90 27.6 phút · **57% trận nằm trong 20–35 phút (TRƯỢT)**, khoảng 57 mạng/trận (cao).

Đánh giá: mô hình macro còn thô. Con số HP trụ ×3,5 nên coi là tín hiệu cần kiểm lại tốc độ phá trụ, không nên chép thẳng vào doc 08. Chưa sửa doc 08.

## Lượt 2: sửa kit cho 4 cặp lệch (2026-10-07)

Kit đổi (scripts/lib/data/heroes.yml):
- Hỏa Tủy: bỏng giảm 40% hồi máu. E Khí Nóng đẩy lùi 4→3 m, làm chậm 35→25%.
- Vân Dao: E Áo Bão gỡ chảy máu, đẩy kẻ địch trong 4 m lùi 3 m (chậm 30%/1 s). RMB trói 1,25→1,5 s. Tốc chạy 6,0→6,25. Q hồi máu bản thân giảm (50–150 → 35–95, AP 0,35→0,25).
- Kha Tàn: E Móc Kéo bỏ choáng 0,35 s, chỉ còn kéo.
- Mộc Lẫm: Q trói 0,75→0,5 s.
- Nham Vũ: nội tại mới Sỏi Nặng, mũi thứ tư làm chậm 20%/1 s.
- Hệ số hp/dmg chạy lại bằng optimize.mjs (out/mults.json).

Đã thử rồi bỏ: rút tầm lướt Q Mộc Lẫm 7,5→6,5 (cặp Mộc Lẫm–Vân Dao lệch thêm), rút lướt RMB Kha Tàn 4,5→3,5 (cặp Hỏa Tủy–Kha Tàn thành 88/12).

Kết quả (n=100 mỗi cấp, cấp 4/7/10/13):
```
level 4,7,10,13
         moc_lam kha_tan mi_dang hoa_tuy nham_vu van_dao avg
moc_lam  -       51      44      39      75      70      55.4
kha_tan  50      -       36      40      31      72      45.5
mi_dang  56      64      -       42      54      37      50.7
hoa_tuy  61      60      58      -       57      32      53.7
nham_vu  26      69      46      43      -       56      47.9
van_dao  30      28      63      68      44      -       46.7
```
Kết luận: lệch nhất từ 82/18 xuống 75/25. Còn trượt: Mộc Lẫm–Nham Vũ 75/25, Kha Tàn–Vân Dao 71–72/28. Trung bình của Mộc Lẫm 55,4%, vượt nhẹ trần 55%. Mô hình duel là một đường thẳng không có lính/địa hình, nên cận chiến lao vào xạ thủ/hỗ trợ bị phóng đại. Hai cặp này cần playtest thật, đừng sửa kit thêm theo mô hình.
