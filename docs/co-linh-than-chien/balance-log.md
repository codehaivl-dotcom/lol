# Balance log: Cổ Linh Thần Chiến

Mỗi lần đổi số gameplay ghi một dòng (04 §3). Baseline là bản trước **của chính game này**. Kết quả là của mô hình (`tools/balance/`), không phải playtest, trừ khi ghi rõ.

| Change ID | Ngày | Hero / hệ | Field | Cũ → mới | Lý do | Mô phỏng trước → sau |
|---|---|---|---|---|---|---|
| BL-0001 | 2026-10-07 | 6 tướng slice | toàn bộ kit | — → bản đầu trong `heroes.yml` | Kit mới của Cổ Linh, D1 rank | Lượt 1: xem `balance-sim-2026-10-07.md` |
| BL-0002 | 2026-10-07 | van_dao | e | thêm lùi 4 m + gỡ chậm/trói; CD 18 → 14 | Thua cận chiến lao vào quá nặng | lệch nhất 82/18 (lượt 1) |
| BL-0003 | 2026-10-07 | kha_tan | rmb | thêm lướt 4,5 m | Không bám được mục tiêu tầm xa | như trên |
| BL-0004 | 2026-10-07 | build marksman / fighter | armorPenPct; armor/món | 0 → 3,5%/món; 10 → 8 | Xạ thủ yếu muộn trận | như trên |
| BL-0005 | 2026-10-07 | hoa_tuy | passive; e | thêm antiHeal 40%; đẩy 4 → 3 m, chậm 35 → 25% | Khắc chế hồi máu; giảm kite vô hạn | worst 82/18 → 75/25 |
| BL-0006 | 2026-10-07 | van_dao | e; rmb; moveSpeed; q heal | gỡ chảy máu + đẩy 3 m; trói 1,25 → 1,5 s; 6,0 → 6,25; heal 50–150 → 35–95, AP 0,35 → 0,25 | Cặp Kha Tàn–Vân Dao 82/18 | 82/18 → 72/28 |
| BL-0007 | 2026-10-07 | kha_tan | e | bỏ choáng 0,35 s | Chuỗi khống chế quá dài | như BL-0005 |
| BL-0008 | 2026-10-07 | moc_lam | q | trói 0,75 → 0,5 s | Mộc Lẫm–Nham Vũ 78/22 | 78/22 → 75/25 |
| BL-0009 | 2026-10-07 | nham_vu | passive | — → Sỏi Nặng (mũi 4 chậm 20%/1 s) | Xạ thủ không giữ khoảng cách được | như BL-0008 |
| BL-0010 | 2026-10-08 | neutral 04–11 (candidate) | hp/dmg/armor/mr/interval/reward/scale | — → V0.1 trong `objectives.yml` `neutral_v01` | Hội đồng Codex qua lukasai; prototype, chưa ship, không bật Mạch Giữa | chỉ analytic (camp 12–32 s/1 tướng, mini 21–23 s/2, Cá 48 s/4 L10); sim clear quái TBD-SIM |

**Đang mở:** hệ số hp/dmg trong `tools/balance/out/mults.json` là **đề xuất**, chưa nhập vào `heroes.yml`. Chỉ nhập sau playtest slice 1 (`13-playtest-slice-1.md`).

## 2026-10-07 · hệ số mô phỏng vào runtime (doc 21 A4)
Trước đây mults.json chỉ có trong mô phỏng, trận thật vẫn chạy số thô (Hỏa Tủy 24%, Nham Vũ 85,5% theo mô hình). Nay heroes.yml có `tuning: { hp, dmg }` cho từng tướng. heroStats nhân máu tối đa với hp. hurt() nhân sát thương tướng gây lên tướng với dmg; sát thương lên lính và trụ không đổi.

- 2026-10-07: thêm Siêu Linh Binh (hp 2000, dmg 70, x2 vào công trình, 80g/110xp), 1 con mỗi đợt cho mỗi trụ địch đã đổ. Chưa sim.


## 2026-10-08 · Titan / boss (TẠM)
Số Thuồng Luồng / Cổ Linh Long trong `objectives.yml` là bản tạm (35). Chờ hội đồng cân bằng duyệt; chưa qua mô phỏng.
- 2026-10-08 · Wisp C: tools/balance/slice.mjs đọc hình học map.yml (travelGate, siege sớm nhất T1 41,4 s), mode waves (case a), tools/balance/g2compare.mjs so mô phỏng với G2 trace (reports/wisp-C-2026-10-08.md). Không đổi số ship. BAL-02S giữ TBD-SIM.
- 2026-10-09 doc54: lmb.range Mộc Lẫm 3.0→1.7, Kha Tàn 3.0→2.3 (với tới thật của vũ khí; @lukasai: chém quá xa). Sim slice không mô hình vị trí: số sim không đổi.
- 2026-10-09 trụ: nhận lệnh cứu tướng (tướng địch đánh tướng ta trong tầm trụ, cả bot) + dồn sát thương +35%/phát, trần +105% (@lukasai: 'Hit sau mạnh hơn hit trước')
- 2026-10-09 bỏ hồi 35% máu khi lên cấp (@lukasai: 'lên cấp ko hồi máu. Phải về nhà . Bạn bè heal. Uống máu mới hồi')

## 2026-10-10 · Balance Lab lần chạy đầu (6 tướng, rev 3a502c39d55c, n=200, newbie) · PASS_MODEL/FLAG, không đổi số
Báo cáo: `reports/sim/2026-10-10-all-3a502c39d55c/report.html`. 0 RED · 123 ORANGE · 19 YELLOW. Không chỉnh tướng/đồ.
- 1v1 newbie: **Nham Vũ 0% mọi mốc** (cả profile average). Lab cũ 1D (`tools/balance/duel.mjs`) cho 87% vì xạ thủ thả diều hoàn hảo và không áp `tuning`; `tuning {hp .81, dmg .87}` của Nham Vũ được chốt từ mô hình đó. Cần review: tuning gỡ hoặc xạ thủ cần công cụ giữ khoảng cách. Hoả Tuý 77–92% (quá mạnh), Vân Dao 24–39% (yếu, hỗ trợ — xét theo đội).
- 1v2 cùng cấp/vàng: 0–0,4% mọi tướng (dưới ngưỡng 15%). Đi trước +1500 XP/vàng: Hoả Tuý 47% p6 (cờ > 45%), các tướng khác ≤ 3%.
- Đội 5v5: 46–56% mọi tướng (cân); 2v2/3v3 Hoả Tuý ~70%, Nham Vũ 20–36%.
- Trụ: không ai phá trụ cấp 1 không lính trước phút 15 mà sống; có 1 đợt lính 11–34 s.
- Boss: không ai solo Titan rank 1 ở phút 10; 3 tướng 30 s, chết 0,1.
- One-Combo: cao nhất Hoả Tuý/Mộc Lẫm → Nham Vũ 104–107% (≥100%: review). Không có reset hồi chiêu, không proc vô hạn.

## 2026-10-10 · roster mở rộng 27 tướng (rev 4ae7cce926aa, n 200, PASS_MODEL)
- Creator chốt: 5v5 là trần (game tối đa 10 người); chạy batch nhỏ 3–5 tướng, không chạy gộp.
- Duel vs pool: mạnh van_an 77–88%, sam_kha 60–85%, thach_ho 59–72%; yếu bach_dien 2–6%, huong_mai 5–9%, han_chi 13–42%, kinh_ngon 21–32%.
- Combo: ngu_dang passive cdr kích 8 lần/combo (RED proc); cao nhất tam_vu→nham_vu p6 109%.
- Boss solo 0% mọi tướng; 1v2 ≤ 2,2% (hoa_tuy). Parity 162/162, deterministic.
- n 200 < chuẩn 1.000; chưa tướng nào pass sản xuất.
- 2026-10-10 · creator chốt: 6 tướng cũ là bản test, không làm mốc; phải theo tool + chuẩn thông số theo vai (tools/sim/standard/roles.yml). Hiệu chỉnh: `calibrate.mjs panel` (6 tướng cũ vòng tròn) rồi `fit` từng đợt 3–5 ứng viên; kết quả chỉ ghi standard/tuning.yml (Lab), runtime chưa đổi.
- 2026-10-10 · panel 6 tướng cũ (n=100, phút 6/10/15): moc_lam ×0.81, kha_tan ×1.05, mi_dang ×1.07, hoa_tuy ×0.96, nham_vu ×1.12, van_dao ×1.13 → 48–53%. Đợt 1: hao_nhat ×1.09 (48.6%, trong ngưỡng nướng số); huong_mai ×1.78, bach_dien ×1.82 vượt bakeLimit 1.2 → kit cần sửa thiết kế. PASS_MODEL only; n=100 chưa đạt 1.000.
- 2026-10-10 · đợt 2: tinh_loi ×1.20 (51.3%), loc_thao ×1.08 (50.2%) trong ngưỡng; lam_nghi ×1.41 vượt bakeLimit → sửa kit. PASS_MODEL, n=100.
- 2026-10-10 · đợt 3: cot_ben ×1.06 (49.8%), sam_kha ×0.97 (50.8%) trong ngưỡng; ngu_dang ×1.40 vượt → sửa kit. PASS_MODEL, n=100.
- 2026-10-10 · đợt 4: duc_nham ×1.07 (49.7%) trong ngưỡng; nanh_nui ×1.32, kinh_ngon ×1.41 vượt. Quy luật: support/tank_protect yếu duel 1v1 là hợp vai; cần đánh giá chúng bằng 2v2/3v3 trước khi kết luận sửa kit. PASS_MODEL, n=100.
- 2026-10-10 · đợt 5: mac_lien ×1.06 (51.2%), tam_vu ×1.14 (49.4%), han_chi ×1.17 (51.1%) trong ngưỡng. PASS_MODEL, n=100.
- 2026-10-10 · đợt 6: thach_ho ×0.95 (49.1%), trac_nham ×1.10 (48.8%) trong ngưỡng; tam_dau ×1.36 vượt. PASS_MODEL, n=100.
- 2026-10-10 · đợt 7: van_an ×0.90 (50.0%) trong ngưỡng; sac_nhien ×1.28, sa_tan ×1.28 vượt.
- TỔNG (duel 1v1 vs panel đã chuẩn, n=100, PASS_MODEL, NOT_TESTED engine): 12/21 nướng số được (|P|≤1.2): hao_nhat, tinh_loi, loc_thao, cot_ben, sam_kha, duc_nham, mac_lien, tam_vu, han_chi, thach_ho, trac_nham, van_an. 9 vượt: 7 là support/tank_protect (huong_mai, lam_nghi, ngu_dang, nanh_nui, kinh_ngon, tam_dau, sa_tan) → chấm lại bằng 2v2/3v3; 2 lỗi thật của kit sát thương: bach_dien ×1.82, sac_nhien ×1.28. Tiếp: xác nhận n=1000 + CI; team test cho support/tank.

## 2026-10-10 · Nghiệm thu thống kê đợt 1 (tools/sim/validate.mjs) · PASS_MODEL · NOT_TESTED engine
Mỗi ô (cặp × phút 6/10/15) 1.000 lượt, seed độc lập theo ô, nửa số lượt đảo phe; hồ sơ newbie, kèm average 200/ô. Wilson 95%. Report: reports/sim/2026-10-10-validate-duel-b1, -diag-b1.
- Hạo Nhật ×1.09: newbie 48.9% [48.2–49.6] n=18.000; average 45.8%. Ô lệch: thua Mộc Lẫm 2–5%, thắng Nhâm Vũ 94–97%.
- Hương Mai ×1.78: 50.6% [49.9–51.3]; average **62.2%**. Mộc Lẫm phút 10 là 0.0%, phút 15 lại là 90.6%.
- Bách Diện ×1.82: 47.5% [46.8–48.2]; average **59.4%**.
- Đầu mối mô hình: ô cặp lật kiểu bậc thang theo phút (0% → 90%) → snapshot đồ/cấp tất định + newbie gần tất định làm cặp đấu thành phép so mốc mua đồ. Khoảng tin cậy hẹp ở đây chỉ là độ chính xác của mô hình, không phải độ tin cậy về runtime. Cần nhiễu tiến trình (farm/thứ tự mua đồ) trước khi chấm khắc chế.
- Hệ số fit trên newbie bị khuếch đại khi lên hồ sơ average (Hương Mai, Bách Diện +10 điểm) → fit chỉ theo newbie là không đủ.
Chẩn đoán (500/ô, tách chiêu 200/ô):
- Bách Diện: AI dùng kit đúng (hồi chiêu dùng 96–100%, combo đủ 100%, trúng Q 87%/E 83%). 41% sát thương từ đánh thường. E (trói trễ 1.5 s) bỏ đi chỉ −1.3 điểm, R (bắt chước) chỉ −8.2 điểm, 4.7% sát thương. → không phải lỗi AI; ngân sách skill của E/R quá mỏng. Đề xuất: KIT_REWORK nhẹ cho E/R, không nhân ×1.82.
- Sắc Nhiên: RMB/E chỉ dùng 49–50% hồi chiêu, combo đủ 50%. → policy AI dùng sai/ít, chưa phải lỗi kit. Sửa policy trước, đo lại, chưa buff.

### Team 2v2/3v3 đợt 1 (phút 10, 24 ô × 100 = 2.400/size) · PASS_MODEL
Đội có X vs đội đối chứng thay X bằng một carry; cùng đối thủ (nửa có tank/support, nửa toàn carry), cùng seed, đảo phe.
| | chuẩn vai (tuning.yml) | toàn bộ số gốc (--raw) |
|---|---|---|
| Hạo Nhật 2v2 | 72.4% vs 43.3% → **+29.1** | 41.7% vs 47.3% → −5.6 |
| Hạo Nhật 3v3 | 61.8% vs 32.8% → **+29.0** | 40.8% vs 38.1% → +2.7 |
| Hương Mai 2v2 | 68.2% vs 47.5% → **+20.7** | 19.7% vs 48.5% → −28.7 |
| Hương Mai 3v3 | 64.2% vs 35.7% → **+28.5** | 24.1% vs 37.6% → −13.5 |
Hạo Nhật: khiên hấp thụ 83–91% (lãng phí 9–17%), CC 4–5 s/trận. Hương Mai: hồi 190–270 HP/trận cho đồng đội, gần như không có lần cứu.
Đọc: hệ số fit theo 1v1 đẩy cả hai từ trung tính/yếu lên +20–29 điểm trong team → đúng điều creator cảnh báo: thắng 50% solo vẫn có thể quá mạnh khi đi đội. Lưu ý: --raw đổi số của cả sân (panel cũng về số gốc), nên chưa tách được riêng X; bài sạch tiếp theo là "X số gốc, cả sân theo chuẩn".
Hướng: support/tank fit theo giá trị team (mục tiêu dải dương vừa phải, ví dụ +5…+15 điểm, CHỜ creator duyệt) + sàn duel, không theo duel 50%.

## 2026-10-10 · Hạo Nhật fit theo chuẩn tank mới (creator duyệt, chỉ Lab) — PASS_MODEL
Công cụ: `validate.mjs team2` (so với tank cùng vai cot_ben/thach_ho/sam_kha + carry, đội đối thủ có/không tuyến trước, đảo phe), `fittank` (chỉ hp/armor/mr + growth, sát thương giữ nguyên), nhiễu tiến trình 16 biến thể/tướng (vàng ±25%, XP ±10%, 50% đảo 2 món đầu), CI phân tầng (trung bình đều ô, phương sai Σp(1−p)/n/k²; Wilson chỉ cho từng ô). `--patch` thử kit trong Lab.
- Phát hiện: hệ số ×1,09 cũ gần trung tính (hp ×1,07, dmg ×1,02); +29 lần trước đến từ đối chứng thay carry, không phải hệ số.
- Lưới phòng thủ (n=40/ô): ×0,8 Δtank −7,2 solo 6% · ×0,9 Δtank +4,8 solo 17% · ×1,0 Δtank +13,1 solo 34%.
- Xác nhận ×0,9 (team 100/ô; duel 1.000/ô × 18 ô): 2v2 Δtank +3,5 / Δcarry +12,5 (±3,8); 3v3 Δtank +5,9 / Δcarry +17,6 (±4,2); solo 18,3% [17,8–18,8] phân tầng, ô 0,1–62,9%; 1v2 0%; solo trụ 0% phá; combo: 0 cờ đỏ cho Hạo Nhật; rừng bình thường.
- Thử giảm choáng (R 0,6 s; R 1 lần 0,75 s; Q 0,5 + R 0,6) và thu bán kính R 3 m / nổ khiên 2,5 m: solo và Δtank vẫn đi cùng nhau, không phương án nào tách được → giá trị team trong model đến từ độ lì, không phải CC/AoE.
- Tank tham chiếu solo (150/ô): Cốt Bện 52,2%, Thạch Hổ 44,5%, Sâm Kha 34,7%.
- Giả thuyết (chưa kiểm): AI newbie đánh mục tiêu gần nhất nên mô hình thưởng HP tuyến trước rất mạnh trong team.
- Trạng thái: kit `tools/sim/standard/kits/hao_nhat.yml` (phòng thủ ×0,9) · đề xuất READY_FOR_ENGINE có ghi chú sàn solo thấp; chờ creator.

## 2026-10-11 · Bách Diện kit vũ công (H1c c1–c3) · PASS_MODEL · NOT_TESTED engine
- Kit cũ (Người Đổi Bóng) ×1.82 → kit vũ công số gốc ×1.48 (vẫn vượt bakeLimit 1.2): ngân sách sát thương chiêu mỏng, E thuần cơ động.
- Sửa thiết kế (không nhân chỉ số): Nhịp Lụa 30+0.35AP+7/cấp; Q 65–185 +0.5AP, hồi 7→5 s; RMB 60–180 +0.45AP; R 75/115/155 +0.35AP mỗi nhịp, choáng chỉ ở nhịp 3 (`effectsOn: last`, engine.mjs mới đọc); thân 625 máu, 53 AD, 28 giáp.
- fit vs nhóm mốc (n=100, phút 6/10/15): **×1.15 → 49.6%**, trong bakeLimit, đã ghi standard/tuning.yml.
- Combo (--std, vs 6 tướng cũ): combo của Bách Diện không vào top; RED duy nhất là Nhạm Vũ → Bách Diện p20 100.9% (lỗi đã biết của Nhạm Vũ 104–108%, không phải ứng viên).
- Chưa: validate n=1.000 + hồ sơ average; 2v2/3v3.
