# 51 · Tách sảnh: bàn giao sảnh ↔ trận (2026-10-09, nhánh B của doc 49)

Nguồn: P-7 lượt 2 (`reports/p7-spike-2026-10-09/P7-run2.md`). Place trống không tick, nên mỗi place tự làm trọng tài cho phần người đang đứng trong đó.

| Place | Trọng tài | Phase | Kho |
|---|---|---|---|
| `sanh` (defaultPlace) | `scripts/referee/lobby.js` | lobby · picking · loading (+ `ingame` chờ) | `sanh` place.state.lobby/match/results |
| `main` (Mạch Giữa) | `scripts/referee/match.js` | ingame · results | `main` place.state.lobby/match/results + hàng trận |
Luật chung: `scripts/referee/core.js`. Bản một place để rollback: `scripts/referee/single.js`.

## Bàn giao
1. **Vé (sanh → main).** Hết loading, sanh làm các việc sau: `matchId = max(sanh, main) + 1`; `lobby.inMatch = roster` (đã đóng băng); phase `ingame`; mỗi người trong roster nhận `player.state.ticket = { matchId, roster, mode, map, host, names, ack }`; rồi `cross` sang place của map (bảng `lobby.yml mapPlace`).
2. **Nhận (main).** Vé đầu tiên có `matchId` lớn hơn của main thì được nhận đúng một lần: main bắt đầu trận và sinh bot. Vé cùng id thì chỉ ngồi vào ghế. Trận đang có người, hoặc đang giữ chỗ 60 s, thì không bị vé mới đè.
3. **Thư về (main → sanh).** `player.state.home = { matchId, ack, ended, notice, results, reason }`, rồi `cross` về `sanh`. Có hai loại thư:
   - `ended: true`: hết results, Kết thúc, Rời trận solo, hoặc hết 60 s solo.
   - `reason: left | no_seat`: người bị loại, hoặc người không có ghế.
4. **Sảnh nhận thư.** Gộp ack trước. Thư `ended` đúng matchId thì sảnh về lobby. Thư `left` thì đánh dấu người đó `gone` và không gửi lại vào trận.

## Không xử lý lặp
- Ack là mốc cao nhất và đi theo thân: vé mang ack của sảnh, thư mang ack của trận. Mỗi bên giữ số lớn hơn (`mergeAck`).
- Thân mới vào sảnh: seq nó đang mang được tính là đã xử lý. Như vậy lệnh cũ từ place khác không bị áp dụng lại (phát hiện P-7 lượt 2).
- Trận đóng: ack được ghi **trước** hiệu ứng, nên thư về mang luôn seq vừa xử lý.

## Không mất trận (reconnect 60 s, doc 14)
- `main` có thể đứng im khi trống, nên hạn được chấm bằng mốc thời gian ở tick đầu tiên thấy lại thân, không bao giờ chấm sớm:
  - `disconnected[u] = lastBeat + 60 s`. `lastBeat` lấy từ RAM; nếu sim mới restart thì lấy bản bền `lobby.seen[u]` (ghi mỗi 4 s).
  - Quay lại khi `now > hạn`, hoặc khoảng cách beat lớn hơn 60 + 6 s, là trễ. Khi đó: solo thì huỷ trận; PvP thì người đó thành `left`.
- Reload rơi xuống `sanh`: người trong roster mà chưa bị loại thì được gửi lại vào trận.
- Watchdog ở sảnh: nếu 60 + 15 s không có ai trong roster beat ở bất kỳ place nào thì sảnh về lobby.

## Rollback (một commit)
`lobby.yml split: false` và `world.config.yaml defaultPlace: main`. Khi đó `places/sanh/sim.js` đưa mọi người về `main`, và `main` chạy `single.js` như trước.

## Lượt thử 1 (2026-10-09, dev room): PvP 1v1 lukasai (blue) vs Savi (red)
Lệnh sảnh do Savi ghi vào `lobbyReq` thay cho hai người; không bấm qua UI thật.
- Sảnh → chọn tướng: PASS. Lệnh start/hover/lock được ack 229→231 và 37→39; không lỗi, không áp lệnh lặp.
- Bàn giao: PASS. `sanh` lên matchId 57 và chuyển sang `ingame`. Cả hai thân sang `main` và mang đúng tướng (Nham Vũ, Vân Dao). `main` có roster 57, ack được gộp đúng.
- Reload: PASS ở mức client CPU của Savi; tab của creator không reload. Trang reload 2.3 s thì vẫn giữ ghế.
- Rời phiên rồi vào lại sau khoảng 45 s: vẫn giữ ghế, `left` rỗng.
- Kết quả: PASS. Nexus đỏ được đặt fallen bằng tay, ra results với blue thắng; 15 s sau trận đóng.
- Về sảnh: PASS. Cả hai về `sanh` với thư `ended` của trận 57. Sảnh về `lobby`, có results 57, đội xếp lại blue/red, nexus reset 4000.
- Màn hình creator (chụp tab): thấy phòng sảnh 1v1 sau trận.
- CHƯA CHẠY: hết hạn >60 s (huỷ solo / loại PvP); bot solo (Sân Tập, Đấu Máy) qua bàn giao; UI bấm thật; restart `main` giữa trận.
- Sửa kèm: HUD điện thoại thiếu import `ART`, làm vỡ HUD trận (lỗi có sẵn từ trước).
