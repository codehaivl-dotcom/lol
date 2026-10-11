# Trọng tài Đấu Máy (thu_tran) trọn vòng — 2026-10-08

**Đây là mock ngoài engine, không phải client PASS.** `tools/test/lobby-referee-bot.mjs` gọi thẳng `tick()` của `places/main/sim.js` với một place giả (người chơi, `lobbyReq`, đồng hồ, `objects`). Không chạy engine, lane.js, bot.js, hero.js hay giao diện. Tâm Mạch vỡ được giả bằng cách đặt `objects['nexus-<team>'].state.fallen = true`; việc lane.js dựng lại trụ sau trận do mock thay. `ctx.random` cố định 0.37 → bot luôn nhận `mi_dang`.

Chạy: `bun tools/test/lobby-referee-bot.mjs` → **44/44 PASS** (mock). Bộ cũ `bun tools/test/lobby-referee.mjs` vẫn **56/56 PASS** (mock). Không sửa code game: sim.js, hero.js, bot.js, lane.js, skillfx.js, map, terrain và cells đều giữ nguyên.

Client T1–T6 (doc 15): **NOT RUN**.

## Các ca

| Ca | Nội dung | Kết quả (mock) |
|---|---|---|
| BOT-01 | Chủ chọn `thu_tran`: chủ một mình bên Xanh, bot `bot-red-1` ngồi Đỏ, tên “Máy”, không vào joinOrder, không thể làm chủ; người thứ hai xin vào → `spectator` · BẮT ĐẦU → picking 30 s, bot khoá tướng ngay · chủ hover và khoá → loading ngay (3 s) · roster gồm chủ (Xanh, kha_tan) và bot (Đỏ, `bot:true`, mi_dang, tên “Máy · Mị Đăng”), không có spectator · ingame: sinh thân bot (`scripts/bot.js`, tag `bot-hero`), vũ khí là con của thân · chạy 60 s không tự kết thúc · Tâm Mạch Đỏ vỡ → results, `winner: 'blue'`, bảng kết quả có cả chủ và bot (số đọc từ thân bot) · results giữ 20 s · hết giờ → về sảnh, match xoá, thân bot dọn, mode vẫn Đấu Máy, ghế bot ngồi lại Đỏ · ván 2 mở lại được, `matchId` 2, bot sinh lại | 27/27 PASS |
| BOT-02 | Tâm Mạch Xanh vỡ → results, `winner: 'red'`; hết giờ results → về sảnh, bot dọn | 3/3 PASS |
| BOT-03 | Chủ khoá đúng tướng bot đang giữ → **được phép** | 1/1 PASS |
| BOT-04 | Hết 30 s mà chủ chưa khoá → chủ được gán tướng ngẫu nhiên | 1/1 PASS |
| BOT-05 | Đang ingame: spectator xin rời thì trận không đổi; chủ bấm Rời trận (`op: leave`) → về sảnh ngay, notice `err.soloLeft`, bot dọn, chủ giữ quyền chủ | 3/3 PASS |
| BOT-06 | Chủ Rời trận lúc đang loading → về sảnh, `err.soloLeft`, bot chưa từng sinh | 2/2 PASS |
| BOT-07 | Chủ mất mạng/reload → giữ trận và quyền chủ, spectator không lấy được quyền chủ · quay lại trong 60 s → cùng trận, bot còn · rớt quá 60 s → huỷ về sảnh, `err.practiceLeft`, bot dọn, quyền chủ chuyển cho người còn lại | 5/5 PASS |
| BOT-08 | `practice end` trong Đấu Máy → `bad_phase`, trận vẫn chạy (chỉ Sân Tập có Kết thúc; thanh `practiceBar` của Đấu Máy dùng nút Rời trận) | 1/1 PASS |
| BOT-09 | Mọi người rời giữa trận → phòng về mặc định, bot dọn | 1/1 PASS |

## Luật đọc từ sim.js (không tự đặt luật)
- Rời trận có chủ ý ở Đấu Máy: `handle` case `leave`, dòng 146 (`solo && host && loading|ingame` → `toLobby(..., 'err.soloLeft')`).
- Mất kết nối: dòng 238–240 (`held` giữ quyền chủ), dòng 267–268 (hết 60 s, không còn người trong roster → `err.practiceLeft`).
- Người thắng: dòng 269–271. Đấu Máy tính thắng/thua; chỉ `san_tap` có `winner: null`.
- Dọn bot: `toLobby` → `clearBots` (dòng 80). Thân bot được sinh lại ở `beginMatch` (dòng 121).

## Chênh lệch với đề bài (không phải lỗi sim.js)
- **Đã chốt 2026-10-08 (@lukasai):** đấu bot cho chọn trùng thoải mái; PvP `tai_hien` cấm trùng tướng cả hai đội. sim.js `pickPool` áp dụng; `lobby-referee.mjs` PICK-01 đổi theo, 56/56 mock.
- Đề bài ghi “bot nhận tướng không trùng”. Luật hiện hành ở sim.js dòng 87–88 là bot **khoá ngẫu nhiên** và người **được phép** lấy cùng tướng vì hai bên khác đội. Đây cũng là luật chung cho cùng tướng ở hai đội (PICK-01). BOT-03 kiểm luật này. Nếu creator muốn bot không bao giờ trùng tướng với chủ, đây là quyết định gameplay mới. Patch tham khảo, **chưa áp dụng**: ở `finishPicking`, trước khi lập roster, gán lại tướng bot thành một tướng khác `lb.pick[host].hero` khi hai tướng trùng nhau.
- Ở BOT-04, khi chủ hết giờ chọn, tướng gán ngẫu nhiên có thể trùng tướng bot (với random cố định thì cả hai đều là mi_dang). Kết quả này hợp lệ theo cùng luật trên.

## FAIL / patch đề xuất
Không có ca FAIL, nên không có patch bắt buộc cho sim.js.
