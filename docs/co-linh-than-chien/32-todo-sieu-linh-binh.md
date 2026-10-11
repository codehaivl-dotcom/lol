# TODO Siêu Linh Binh (2026-10-07)
Nguồn: concept duyệt (doc 31), golem sa thạch, lõi pha lê, băng đồng Đông Sơn trên tay, rêu trên vai.

## Luật
- Phe A phá được 1 trụ của phe B → mỗi đợt lính của A có thêm 1 Siêu Linh Binh; phá 2 trụ → 2. Đi đầu đợt, ngoài laneCap.
- Cận chiến, đánh công trình x2 (ép trụ), đập đất có sóng chấn nhỏ.
- Số khởi điểm (structures.yml minions.kinds.super): hp 2000, dmg 70, tầm 3.0, tốc 4.0, 1.7 s/đòn, 80 vàng, 110 xp, cao 2.7 m.

## Việc
- [x] scripts/gen/minion.js: hàm superm() theo concept, collider 1.3×2.7×1.0
- [x] structures.yml: kinds.super + superPerTower
- [x] combat.js: chiều cao lính đọc từ kinds (thanh máu/hit đúng tầm)
- [x] lane.js: spawnWave thêm siêu lính theo số trụ địch đã đổ; đòn đập + fx + âm; chết vỡ to; feed báo "Siêu Linh Binh xuất trận"
- [ ] Kiểm: render object 2 phe, spawn thử trong dev, đo hp/bounds
- [ ] Audit + ghi balance-log

## Audit
- Render 2 phe cạnh lính thường: đọc rõ golem, tim pha lê theo màu phe, cao gấp đôi lính. 1268 tri ở lod1.
- Chưa xem trong trận thật: cần phá 1 trụ trong Đấu Với Máy để thấy đợt có Siêu Linh Binh.
