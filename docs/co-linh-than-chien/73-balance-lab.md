# 73 · COLINH Balance Lab — chuẩn giả lập cân bằng vĩnh viễn

> **CURRENT ROUTING (2026-10-12):** [105 · Hero Factory](105-hero-factory-multi-agent-workflow.md) controls agent dispatch, audits and Owner Gate 4; **this file remains authoritative for Balance Lab mechanics/labels/reporting**. The [26-hero campaign runner](../../tools/sim/production-26.mjs) supports all-roster concurrent simulation of authored candidate kits, not automatic kit writing. `gates.yml` thresholds marked `proposal` are not Owner-approved. Do not infer PASS_ENGINE or Gate 4 from PASS_MODEL.

> Quyết định @lukasai 2026-10-10: "dev bộ giả lập thành công cụ tiêu chuẩn luôn. Sau này dùng mãi mãi." · "sau khi xong bộ Lab simu này → đưa vào agents.md như 1 quy trình bắt buộc. Tướng pass → sản xuất". One-Combo Kill Test (item + skill + nội tại) là gate bắt buộc.

## 1. Nguyên tắc
- Đầu vào chỉ là data runtime: `scripts/lib/data/heroes.yml`, `economy.yml` (catalog 24 item `candidate-0.1.0`, kinh tế `mg1v1-0.1`), `structures.yml`, `objectives.yml`. Công thức chép từ `scripts/lib/combat.js` (chỉ số, kháng 100/(100+res−xuyên), `tuning.hp` trên base+growth, `tuning.dmg` chỉ tướng↔tướng), `items.js` (cộng chỉ số đồ), `passives.js` (nội tại đồ). Không tự đặt hệ damage riêng.
- Deterministic theo seed. Mỗi báo cáo mang `revision` = hash mọi file đầu vào + gates.
- Nhãn: bộ giả lập chỉ cho **PASS_MODEL / FLAG / FLAG_RED**. PASS_ENGINE chỉ có từ trận thật trong engine. NOT_TESTED liệt kê trong báo cáo.
- Không tự nerf/buff khi có cờ: báo cáo + replay + breakdown, đề xuất, creator duyệt.
- Mô phỏng tìm vấn đề, không thay trải nghiệm chơi thật (luật 2026-10-08).

## 2. Chạy
```
bun tools/sim/run.mjs <suite> [--n 200] [--profile newbie] [--minutes 3,6,10,15,20,full] [--heroes a,b] [--cand] [--seed 1] [--out dir]
suites: parity progress duel gank team tower wave jungle boss combo all
bun tools/sim/run.mjs compare <before/report.json> <after/report.json>
```
Báo cáo: `reports/sim/<ngày>-<suite>-<rev>/report.json` + `report.html` (bảng 1v1 tô nhiệt, 1v2, đội, combo + breakdown + replay).

## 3. Mô-đun
| file | việc |
|---|---|
| `tools/sim/data.mjs` | đọc data runtime, ứng viên `tools/sim/candidates/*.yml`, revision |
| `tools/sim/progress.mjs` | mốc phút → cấp/XP (290 XP/đợt, 280 lên 2), vàng theo kinh tế thật, mua đồ theo giá + ghép thật, `"full"` = cấp max full build |
| `tools/sim/engine.mjs` | mặt phẳng 2D, 0,05 s, nhiều phe: tướng (chiêu theo cấp chiêu `rankOf`, CC, khiên, hồi, DoT, nội tại tướng + đồ, kích hoạt đồ), trụ (ưu tiên + tăng dần 35%/phát), lính, quái rừng (scaling theo cấp), Cổ Titan (slam/charge/beam) |
| `tools/sim/scenarios.mjs` | fight (NvM), duelRate, soloVs2, towerSolo (±lính), waveClear, campClear, boss, combo |
| `tools/sim/gates.yml` | hồ sơ người chơi (newbie/average/skilled/dummy) + ngưỡng gate |
| `tools/sim/run.mjs`, `html.mjs` | CLI, khoảng tin cậy Wilson 95%, chấm gate, báo cáo, compare |

## 4. Gate (ngưỡng = đề xuất, creator chốt; status trong gates.yml)
| gate | ngưỡng hiện tại |
|---|---|
| parity | chỉ số sim = runtime 100%, deterministic |
| duel newbie cùng cấp/vàng | TB mỗi tướng 40–60% (mục tiêu 45–55), cặp > 70/30 = cờ (CI95 dưới vượt) |
| 1v2 cùng cấp/vàng | > 15% = cờ; đi trước +1500 XP/+1500 vàng > 45% = cờ |
| đội 2v2/3v3/5v5 (trần 5v5: game tối đa 10 người, creator 2026-10-10) | đội có tướng X thắng ngoài khoảng → cờ; thời lượng giao tranh |
| trụ | phút ≤ 15 phá trụ cấp 1 không lính mà sống = RED |
| lính / rừng / boss | dọn đợt lính, TTK quái, máu còn; solo Titan rank 1 phút 10 = RED |
| **One-Combo Kill** | % máu mất sau MỘT combo: < 70 theo dõi · 70–89 burst cao · 90–99 cảnh báo · ≥ 100 review bắt buộc. RED khi cùng cấp/vàng và (hạ < 1 s, hoặc mục tiêu tank, hoặc cặp vai trò đáng nghi). Tung lại chiêu trong một combo = RED (reset). Proc > 4 lần/combo = RED. Một món làm ≥ 3 tướng tăng ≥ 15 điểm burst = cờ món OP |

One-Combo: mỗi chiêu sẵn có (đủ cấp, đủ mana) đúng một lần, xen đòn thường, một nhịp đánh thường cuối. Hai chế độ: **hoàn hảo** (bia đứng yên, mọi đòn trúng) và **newbie** (hai bên AI newbie, mục tiêu chống trả/né theo mô hình). Mục tiêu: mọi tướng cùng phút, tank full phòng thủ cùng vàng, mục tiêu chậm/nhanh 3 phút. Xuất: damage sau phòng thủ, % máu, có hạ không và lúc nào, thời gian combo, % từ skill/item/nội tại/đòn thường, hồi chiêu toàn combo, máu kẻ tung, replay.

## 5. QUY TRÌNH SẢN XUẤT TƯỚNG (bắt buộc)
1. Kit ứng viên viết thành data `tools/sim/candidates/<id>.yml` (`{ heroes: { id: kit }, builds: { id: [...] } }`, schema như `heroes.yml`), chưa code gameplay, chưa model.
2. `bun tools/sim/run.mjs all --cand --n 200` → báo cáo.
3. Không có RED; mọi ORANGE có giải thích theo vai trò hoặc tuning trong ứng viên rồi chạy lại; `compare` cho thấy 6 tướng cũ không bị đổi rõ rệt.
4. Ghi báo cáo vào `docs/co-linh-than-chien/balance-log.md` (revision, n, profile, cờ còn lại + lý do).
5. Creator duyệt → mới sản xuất (data vào heroes.yml, model, animation doc 28, VFX doc 30, code).
6. Mọi lần sửa số tướng/đồ/kinh tế/trụ/quái: chạy `all` trước và sau, `compare`, ghi balance-log.
Phase C (5v5 đầy đủ, map 3 đường, boss sâu) mở rộng song song, không chặn bước 1–5.

## 6. Chưa mô phỏng (NOT_TESTED)
Địa hình/tường/bụi/tầm nhìn; đường đạn bị thân chặn (trừ `passMinions`); crit, hút máu, sát thương chuẩn, phản sát thương, silence: data hiện chưa có field dùng — khi thêm field, engine phải đọc trước khi ứng viên dùng nó. Newbie là mô hình xác suất (dodge 5%, né ngang 0,4, lùi giữ tầm 40% thời gian, phản xạ 0,4 s), không phải người thật.
