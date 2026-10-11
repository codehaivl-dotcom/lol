# Thang chỉ số tham khảo

**Chỉ để tham khảo.** Bảng dưới là chỉ số của game tham khảo (`data/legacy-kits-v1.json`), xếp theo ID Cổ Linh để designer có thang độ lớn khi viết kit mới. **Không phải chỉ số của Cổ Linh**, không import vào runtime. Chỉ số thật nằm ở `scripts/lib/data/heroes.yml` sau mô phỏng (04 §3).

Lưu ý khi đọc: MS là quy ước cũ (không phải m/s); một số dòng JSON lệch bản YAML gốc (xem AUDIT B4), ví dụ hàng `moc_lam` có growth mana 30 dù tướng không có resource.

## 2. Bảng chỉ số gốc và growth

| ID | Cổ Linh | Resource | HP | Mana/resource | AD | AP | Armor | MR | MS | AS | R cost |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| moc_lam | Mộc Lẫm | none | 720+104 | 0+30 | 69+4.5 | 0+0 | 40+4.4 | 32+1.55 | 6.8 | 0.625+0.0365 | 1100 |
| kha_tan | Kha Tàn | mana | 652+114 | 263+58 | 64+5 | 0+0 | 37+5.2 | 32+2.05 | 6.8 | 0.625+0.01 | 1300 |
| hao_nhat | Hạo Nhật | mana | 700+110 | 302+40 | 58+3 | 0+0 | 46+5 | 34+2.05 | 6.7 | 0.625+0.029 | 950 |
| tinh_loi | Tĩnh Lôi | energy | 645+108 | 200+0 | 69+3.7 | 0+0 | 36+4.9 | 32+2.05 | 6.9 | 0.651+0.03 | 800 |
| mi_dang | Mị Đăng | mana | 590+104 | 418+25 | 53+3 | 0+0 | 21+4.2 | 30+1.3 | 6.6 | 0.668+0.022 | 1100 |
| lam_nghi | Lam Nghi | mana | 580+99 | 480+23.5 | 54+3.3 | 0+0 | 21+5.2 | 30+1.3 | 6.6 | 0.669+0.03 | 1400 |
| van_dao | Vân Dao | mana | 570+90 | 360+50 | 46+2.5 | 0+0 | 28+4.5 | 28+1.3 | 6.5 | 0.625+0.03 | 1050 |
| nham_vu | Nham Vũ | mana | 610+101 | 280+35 | 59+2.95 | 0+0 | 26+4.6 | 30+1.3 | 6.5 | 0.658+0.0333 | 900 |
| loc_thao | Lộc Thảo | mana | 600+105 | 320+40 | 59+3.4 | 0+0 | 24+4.4 | 30+1.3 | 6.6 | 0.658+0.04 | 1200 |
| ngu_dang | Ngư Đăng | mana | 690+120 | 274+44 | 56+2.2 | 0+0 | 40+0 | 32+1.55 | 6.7 | 0.625+0.035 | 800 |
| cot_ben | Cốt Bện | mana | 660+110 | 300+42 | 62+3.2 | 0+0 | 35+4.2 | 32+1.6 | 6.6 | 0.64+0.025 | 950 |
| hoa_tuy | Hỏa Tủy | mana | 560+96 | 460+26 | 52+3 | 0+0 | 20+4.4 | 30+1.3 | 6.6 | 0.65+0.025 | 1500 |
| sam_kha | Sấm Kha | mana | 650+100 | 320+22 | 66+4 | 0+0 | 34+4.3 | 32+1.4 | 6.8 | 0.64+0.03 | 1000 |
| duc_nham | Dực Nham | mana | 600+102 | 375+25 | 60+2.6 | 0+0 | 24+4.7 | 30+1.3 | 6.8 | 0.625+0.025 | 1250 |
| bach_dien | Bách Diện | mana | 598+93 | 400+25 | 55+3.5 | 0+0 | 22+4.2 | 30+1.3 | 6.9 | 0.658+0.014 | 900 |
| nanh_nui | Nanh Núi | mana | 740+116 | 300+20 | 60+3.4 | 0+0 | 42+4.8 | 34+1.8 | 6.9 | 0.63+0.028 | 900 |
| kinh_ngon | Kính Ngôn | mana | 580+99 | 480+23.5 | 54+3.3 | 0+0 | 21+5.2 | 30+1.3 | 6.6 | 0.669+0.03 | 900 |
| mac_lien | Mặc Liên | mana | 545+92 | 460+26 | 52+3 | 0+0 | 19+4.2 | 30+1.3 | 6.7 | 0.65+0.025 | 1000 |
| tam_vu | Tầm Vũ | mana | 560+96 | 300+36 | 58+3.3 | 0+0 | 22+4.2 | 30+1.3 | 6.4 | 0.66+0.035 | 1150 |
| han_chi | Hàn Chi | mana | 540+90 | 500+28 | 50+3 | 0+0 | 18+4 | 30+1.3 | 6.6 | 0.65+0.02 | 1100 |
| sac_nhien | Sắc Nhiên | mana | 560+92 | 480+30 | 52+3 | 0+0 | 19+4.2 | 30+1.3 | 6.6 | 0.65+0.02 | none |
| huong_mai | Hương Mai | mana | 690+116 | 311+45 | 55+3.2 | 0+0 | 50+5.2 | 34+2.05 | 6.7 | 0.644+0.035 | 1050 |
| sa_tan | Sa Tẫn | mana | 570+96 | 460+26 | 52+3 | 0+0 | 20+4.2 | 30+1.3 | 6.6 | 0.65+0.025 | 800 |
| van_an | Vân Ấn | mana | 590+95 | 450+26 | 52+3 | 0+0 | 20+4.4 | 30+1.3 | 6.7 | 0.65+0.022 | 1300 |
| tam_dau | Tam Dấu | mana | 560+88 | 420+45 | 46+2.4 | 0+0 | 26+4.4 | 30+1.3 | 6.5 | 0.625+0.02 | 900 |
| thach_ho | Thạch Hộ | mana | 550+86 | 400+48 | 47+2.5 | 0+0 | 25+4.3 | 30+1.3 | 6.6 | 0.64+0.022 | 800 |
| trac_nham | Trắc Nham | mana | 650+104 | 300+40 | 66+4.2 | 0+0 | 36+4.4 | 32+1.6 | 6.8 | 0.625+0.028 | 1100 |

Gốc+tăng dùng số thập phân raw, không làm tròn. AP tăng trưởng bằng 0 ở 27 kit trong snapshot. R cost=none là ngoại lệ của Invoker; không tự cấp chiêu R dạng nạp cho tướng này.

## 3. Nguồn canonical

Bảng trên **không** phải số của Cổ Linh. Nguồn canonical duy nhất cho chỉ số và kit là `scripts/lib/data/heroes.yml` (04 §3, 09 §1). `data/legacy-kits-v1.json` chỉ để tra thang độ lớn.

Quy tắc combat, XP, level-up, lịch mở rank, ultimate charge và tám item slice chỉ có một nơi mô tả: [08 — Combat, tiến trình và kinh tế](08-combat-kinh-te-v1.md). Schema và quy tắc ID/localization nằm tại [09 — Data contract](09-data-contract-va-roster.md). Quyết định thiết kế đã chốt ở [10](10-doi-soat-runtime.md).