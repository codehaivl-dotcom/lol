# 21 · Audit balance + Plan VFX
Ngày 2026-10-07. Yêu cầu của @lukasai: "đọc xong thì audit thông số balance. Lên plan về VFX sẽ thế nào, vfx đang rất chưa rõ ràng, nên chơi game chưa được".

## A. Audit balance

### A1. Phát hiện chính: hệ số balance chưa bao giờ được đưa vào game
`balance-sim-2026-10-07.md` ghi "Hệ số đã áp dụng (mults.json)", nhưng runtime **không đọc** file này (grep `scripts/`: 0 chỗ dùng).
Trận thật đang chạy bằng số thô trong heroes.yml. Mình chạy lại mô phỏng (`bun tools/balance/report.mjs`, n=60, cấp 4/7/10/13) để so sánh:

| Tướng | Tỉ lệ thắng TB, **số thô (đang chạy)** | Tỉ lệ thắng TB, có hệ số | Mục tiêu |
|---|---:|---:|---|
| Mộc Lẫm | **77,5%** | 54,4% | 45–55% |
| Kha Tàn | **29,5%** | 44,6% | |
| Mị Đăng | **39,2%** | 53,1% | |
| Hỏa Tủy | **24,0%** | 50,8% | |
| Nham Vũ | **85,5%** | 50,6% | |
| Vân Dao | 44,3% | 46,5% | |

Hỏa Tủy là tướng @lukasai đang chơi thử, và nó đang là tướng yếu nhất (24%). Nham Vũ thắng Vân Dao 100/0. Như vậy cảm giác "chưa chơi được" có một phần đến từ đây, không chỉ do VFX.

### A2. Cặp vẫn lệch quá 70/30 kể cả khi có hệ số
Mộc Lẫm–Nham Vũ 75/25, Kha Tàn–Vân Dao 73/27, Hỏa Tủy–Vân Dao 30/70, Kha Tàn–Nham Vũ 30/70. Đây là lệch do kit (tầm đánh, khống chế). Doc cũ đã kết luận: cần playtest thật, không chỉnh kit theo mô hình nữa.

### A3. Ảnh hưởng của map V2
Tầm trụ 16→14 m, đường giữa hai trụ T1 ngắn còn khoảng 74 m. Mô hình duel không có trụ và lính nên không đo được thay đổi này. Cần test trận thật.

### A4. Đề xuất
1. Đưa hệ số vào game: heroes.yml thêm `tuning: { hp, dmg }` cho từng tướng (lấy số từ mults.json, làm tròn 2 chữ số). `heroStats` nhân máu tối đa với hp, và mọi sát thương gây ra (đánh thường, chiêu, đốt, chảy máu) nhân với dmg. Bot dùng cùng đường tính nên tự khớp.
2. Ghi một dòng vào balance-log.md.
3. Sau khi VFX đọc được thì test 1v1 thật: Hỏa Tủy với bot Nham Vũ và bot Mộc Lẫm.

## B. Plan VFX

### B1. Nguyên tắc (theo VFX Style Guide của Riot, đọc qua vfxapprentice.com)
1. **Hình chính rõ, hình phụ ít.** Mỗi chiêu có một hình chính nói lên chức năng (cột, vòng, dải, mũi tên). Khói và hạt chỉ là lớp phụ, mờ hơn và ngắn hơn.
2. **Cỡ hiệu ứng tương ứng tầm quan trọng.** Đánh thường < Q/RMB/E < R. Chiêu cuối mới được rung màn hình và sóng chấn động.
3. **Thời lượng ngắn.** Đánh thường ≤ 0,3 s. Chiêu thường ≤ 0,8 s. Chiêu cuối ≤ 1,5 s. Vùng tồn tại kéo dài đúng bằng thời gian có tác dụng, kèm viền sáng, và biến mất ngay khi hết.
4. **Báo trước – bùng nổ – để lại dấu.** Lúc vung tay sáng lên ở tay hoặc vũ khí (cast), sau đó là đạn hoặc vùng (fly/land), cuối cùng là tia lửa và chữ số tại điểm trúng (hit).
5. **Màu theo tướng, viền theo phe.** Lõi hiệu ứng dùng màu riêng của tướng. Mọi vùng báo trước trên mặt đất có viền **xanh nếu là phe mình, đỏ nếu là phe địch**, để nhìn là biết có cần né hay không.
6. **Không che tướng.** Không đặt hiệu ứng che thân tướng quá 0,2 s. Hiệu ứng trên người tướng chỉ được đặt ở chân hoặc dạng viền (sửa lỗi "tướng bị mất details khi dùng skill", #6556).

### B2. Bảng màu theo tướng
| Tướng | Màu lõi | Chất liệu | Đánh thường |
|---|---|---|---|
| Mộc Lẫm | ngọc lục | đá, rễ | vệt chém ngọc + mảnh đá vụn |
| Kha Tàn | sắt nóng + đỏ máu | xích, máu | vệt chém tia lửa sắt + giọt máu |
| Mị Đăng | tím trăng | đèn lồng, cánh hoa | đốm lửa tím bay vòng nhẹ |
| Hỏa Tủy | cam lửa | than, khói | hòn than bay kèm vệt lửa |
| Nham Vũ | hổ phách | sỏi, lông vũ | mũi tên sáng kéo vệt |
| Vân Dao | lam điện | mây, gió | tia sét nhỏ chạy zíc zắc |

### B3. Quy tắc cho từng loại ngắm
| Loại | Lúc ngắm (chỉ người chơi thấy) | Khi tung chiêu (mọi người thấy) |
|---|---|---|
| skillshot | dải có mũi tên, dài đúng tầm và rộng đúng hitbox | đạn mang màu tướng, vệt kéo dài cỡ 0,3 s |
| area có độ trễ | vòng tầm + đĩa ở vị trí sẽ rơi | **vòng báo trên mặt đất, viền theo phe, lấp đầy dần trong thời gian trễ**, rồi bùng nổ |
| target | địch sẽ trúng có viền sáng, vòng tầm chuyển đỏ khi không có ai trong tầm | đường nối từ người tung chiêu đến mục tiêu, rồi đòn đánh |
| self | vòng quanh người | viền sáng ở chân + khiên dạng viền thân |

### B4. Mục tiêu và di chuyển
- Rê chuột lên địch: viền đỏ.
- Mục tiêu đang đánh: vòng đỏ dưới chân, bám theo mục tiêu.
- Click di chuyển: vòng xanh co lại kèm chấm giữ đến khi tới nơi.
- Click tấn công: viền đỏ nháy một lần.

### B5. Thứ tự làm
1. [~] Đánh thường riêng cho 6 tướng, 9 cast còn thiếu (đã làm trong lượt này, chưa test bằng hình) (có code: scripts/lib/skillfx.js; client NOT RUN)
2. [~] Vòng báo trước cho vùng có độ trễ: viền theo màu phe người tung chiêu (xanh lam = phe Xanh, đỏ = phe Đỏ), đĩa lấp đầy dần trong thời gian trễ. Đã chụp trên đường giữa: đọc rõ. Lưu ý: chưa đổi màu theo góc nhìn của từng người (đồng minh/địch), vì phe Đỏ vẫn thấy vòng của mình màu đỏ. (có code: scripts/lib/combat.js `telegraph`/`watchTele`; ảnh chụp dev, client NOT RUN)
3. [x] Mục tiêu và di chuyển theo B4 (code xong, **chưa test trong trận thật**) — cập nhật: 14 UX-P1 match23/round39 (ca498b2) **PASS có giới hạn**: rê/click lính nhỏ → viền đỏ + vòng, click đất → vòng xanh; trụ INCONCLUSIVE, tướng NOT RUN
4. [~] Chiêu chọn mục tiêu: địch sẽ trúng có viền vàng, vòng tầm chuyển đỏ khi không có ai trong tầm (chưa test). Mũi tên ở đầu skillshot: chưa làm. — cập nhật 2026-10-08: viền vàng có code scripts/hero.js `drawMarks`, client NOT RUN; mũi tên skillshot đã làm (`drawAim`), PASS có giới hạn match26/round42 (doc 20 §4).
5. [ ] Rà thời lượng và kích cỡ toàn bộ KIT theo B1.2–B1.3 (cắt hiệu ứng quá dài, giảm khói che thân)
6. [~] Chụp từng chiêu của 6 tướng, ghi kết quả vào 20-gap-skill-vfx-target.md (một phần: doc 20 §4 match26–28, m30–m32 r47–49; chưa đủ 6 tướng × mọi chiêu)
