# TODO — Đấu Với Máy 1v1 (Mạch Giữa)

**Thứ tự hiện hành theo quyết định của lukasai (2026-10-07):** hoàn tất và nghiệm thu trận 1v1 Mạch Giữa trước; sau khi chủ dự án đóng mốc 1v1 mới bắt đầu map riêng 5v5 ba đường `cuu_mach`, theo handoff [27 — Map 5v5 ba đường](27-handoff-map-5v5-ba-duong.md). Không có mốc 3v3 trung gian.

Mốc 1v1 chỉ được đóng khi các việc và T1–T6 dưới đây có bằng chứng theo format ở [11 — Acceptance và gói bàn giao](11-acceptance-ban-giao.md), rồi chủ dự án xác nhận nghiệm thu. File này giữ phạm vi trận thử 1v1; không chốt hoặc suy ra hình học chưa được duyệt cho map này hay map kế tiếp.

## Làm
1. [x] Mở mode `thu_tran` ở sảnh: chủ phòng một mình phe Xanh; bot phe Đỏ. (code: `scripts/lib/data/lobby.yml` `modes`, `places/main/sim.js` `seatBots`; evidence 14 P4: Codex build 7be6b6c/runtime 560, Đấu Máy quay lại 33.6 s giữ match/tướng/bot/chủ — **PASS có giới hạn**: chỉ kiểm vào trận + reconnect/timeout, chưa đánh hết trận)
2. [~] Bot là một thân tướng thật (model GLB của tướng, vũ khí, Idle/Walk/Run), chạy chung `hero.js` + `player.js` như người: cùng chỉ số, hồi chiêu, năng lượng, lên cấp, chết/hồi sinh 12 s, hồi máu ở suối. (có code: `places/main/sim.js` `spawnBots` (model BODY + `armBody`), `scripts/bot.js` (cùng chỉ số/hồi chiêu/mana/chết/suối; bot chạy `bot.js` riêng, không chạy `hero.js` + `player.js`); client NOT RUN)
3. [~] Mọi luật “tướng” tính cả bot: bị đánh, lính và trụ nhắm, thưởng hạ tướng, thưởng last-hit, thưởng phá trụ. (có code: `scripts/lib/combat.js` `heroBodies`/`units`, `scripts/lane.js`; client NOT RUN)
4. [~] Não bot (`scripts/bot.js` `think()` + `scripts/lib/data/bot.yml` `think: 0.2`, 5 lần/giây; bản cũ ghi nhầm `scripts/lib/bot-brain.js`, file đó không tồn tại): theo lính phe mình, last-hit lính địch, cấu tướng khi lợi máu, tung Q/RMB/E/R khi trong tầm, né trụ địch khi không có lính đỡ, máu < 30% thì về suối, đầy lại thì ra đường. (có code: `scripts/bot.js` `towerThreat`/`allyTanks`, `retreatAt: 0.3`; client NOT RUN — chỉ có b′ đo dev 1 lần: bot lv3, cs 21 lúc 7,55', `reports/wisp-C-2026-10-08.md`, không phải client)
5. [~] Thanh máu đỏ trên đầu bot. (có code: `places/main/sim.js` `spawnBots` ui `state.hpPct`; client NOT RUN)
6. [~] Vỡ Tâm Mạch → thắng/thua thật; về sảnh thì bot biến mất. (có code: `places/main/sim.js` `clearBots`; client NOT RUN — chưa có trận Đấu Máy chạy tới Tâm Mạch vỡ; nút Rời trận ở Đấu Máy NOT RUN theo 14 P4)

## Test (phải thấy tận mắt / log)
- T1 vào trận 1v1: bot xuất hiện ở suối Đỏ, đi ra đường.
- T2 bot đánh lính và ăn vàng (cs/gold tăng).
- T3 người đánh bot: số sát thương, thanh máu tụt; bot đánh trả và dùng chiêu.
- T4 bot máu thấp thì rút về; hạ được bot → +300 vàng, bot hồi sinh sau 12 s.
- T5 bot không đứng dưới trụ địch khi không có lính.
- T6 hết trận → về sảnh, không còn bot.

Trạng thái 2026-10-08: T1–T6 client NOT RUN (theo `reports/doc-status-2026-10-08.md`).

## 2026-10-11 · Đi 5 khung camera trận Mạch Giữa (luồng map 1v1, wisp)
Camera dựng tay theo camera trận (pitch 56°, distance 11, fov 42; xanh nhìn −Z, đỏ nhìn +Z), mắt = tâm + (0, 9.1, ±6.15). Ảnh chụp từ client CPU dùng chung trong room dev, KHÔNG phải màn hình người chơi thật; bụi cỏ là vật local (cues.js) nên không có trong ảnh này.
- K1 căn cứ xanh/fountain (−65.8, 65.8): bệ Giếng Hồi Tưởng nhiều vòng, kênh nước xanh lam, tinh thể + chậu sen; nước trào/giọt tràn mới thấy được trong chậu. PASS_ENGINE (nhìn).
- K2 trụ ngoài xanh T1 (−17.7, 17.7): trụ đứng trên đế, đá vụn + mảng rêu bờ chiến (lane-bank) nằm sát sàn, không lơ lửng. PASS_ENGINE (nhìn). Ghi chú: mảng rêu tròn trên đá lát hơi giống lá súng — để luồng bờ chiến cân nhắc.
- K3 cầu giữa (0, 0): mặt cầu có la bàn chim Lạc, viền xanh, không lỗ sàn. PASS_ENGINE (nhìn).
- K4 bụi ven sông (river-top-blue −46, 15.8; river-bot-blue −18.2, 37.3; river-top-red 46, −15.8): **GAP**. Mắt camera ở y ≈ 9 rơi vào trong vách hẻm/cây phía sau hốc nấp (đo raycast: `art-wall-skirt-18` cắt tia mắt→tướng ở 0.74 m; hốc đỏ và hốc dưới cũng tối/che toàn khung). Tướng đứng trong bụi hốc sẽ thấy đá chứ không thấy mình. Đã thử hạ skirt-18 3.6 m: vẫn bị vách địa hình + tán cây che → hoàn nguyên. Cách sửa cần duyệt: (a) camera.js làm mờ/ẩn vật giữa mắt và tướng, hoặc (b) hạ vách hẻm phía camera của 4 pockets (đổi terrain = gameplay geometry, cần ghi phép).
- K5 căn cứ đỏ (62, −62): fountain đỏ son, nexus, sàn đầy. PASS_ENGINE (nhìn).
Đổi trong lượt: fountain hai bên dùng chung `scripts/effects/fountain-spring.fx.js` (nước trào, giọt tràn, hơi nước, đốm sáng; nhánh lo = low/cảm ứng ≈ 40%) thay chuỗi fx inline; gỡ hàng dev `xpt-watch`. Bụi: đã có sẵn (reed-clump local theo map.yml, cues.js) — không thêm scene.
