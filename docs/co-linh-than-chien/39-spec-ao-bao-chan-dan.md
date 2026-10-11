# 39 · Áo Bão chắn đạn (Vân Dao E)

**Quyết định:** @lukasai 2026-10-08: “quy tắc vật lý. Phía trước chắn thì phía sau được hưởng” + “có” (xác nhận: khiên chỉ trên thân Vân Dao, nhưng thân cô chặn đòn bắn tới, đồng minh đứng sau được che).

## Luật
- Khi Áo Bão (E) còn khiên (`shield.until > now` và `shield.amt > 0`), thân Vân Dao chắn **đạn có mục tiêu** của phe địch bắn vào **đồng minh của cô** (tướng, lính, trụ, Tâm Mạch).
- Đạn có mục tiêu = đòn thường tầm xa của tướng/bot, đạn lính phép/lính xe, đạn trụ.
- Lúc đạn tới (`landBasic`, `landBolt`, `towerLand`), đoạn thẳng từ người bắn tới mục tiêu được kiểm: Vân Dao đứng **giữa** hai đầu (cách người bắn > 0,4 m, cách mục tiêu > 0,3 m) và lệch khỏi đường đạn ≤ bán kính thân 0,5 m + `block.width/2` → đòn trúng **Vân Dao** thay mục tiêu. Nhiều người chắn: người gần người bắn nhất nhận.
- Sát thương, hiệu ứng (làm chậm, nội tại đòn đánh) áp lên Vân Dao như bị bắn trúng; khiên của cô hút trước. Khiên vỡ → hết chắn.
- Đạn kỹ năng kiểu skillshot đã trúng thân đầu tiên trên đường bay (luật cũ, mọi tướng), không đổi. Kỹ năng vùng, cận chiến: không bị chắn.
- Phản hồi: chữ “chắn” + vòng xanh nhỏ ở điểm chắn, cho mọi người gần đó.

## Số (đề xuất, chưa đo)
- `heroes.yml` `van_dao.e.shield.block.width: 1.0` (đề xuất Savi). Thời lượng = khiên (3 s).
- Balance: **TBD-SIM**. Duel/match simulator (`tools/balance/`) chưa mô hình chắn đạn; theo doc 23 cột B, mọi kết luận cân bằng của Vân Dao sau thay đổi này phải chờ simulator có đường xử lý tương đương.

## Code
- `scripts/lib/combat.js` `interpose(ctx, u, from, shooterTeam)` trả về đơn vị nhận đòn.
- Gọi ở `hero.js landBasic`, `bot.js landBasic`, `lane.js landBolt` / `towerLand`.
- Cờ thân: `state.ward = { until, width }` do `giveShield`/`shieldUp` ghi khi `shield.block`.

## Nghiệm thu
- [ ] Client: Vân Dao bật E đứng giữa lính phép địch và đồng minh, đòn rơi vào Vân Dao, có chữ “chắn” — **NOT RUN**.
- [ ] Client: khiên vỡ/hết giờ → đạn lại trúng đồng minh — **NOT RUN**.
- [ ] Simulator mô hình chắn — **TBD-SIM**.
