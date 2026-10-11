# Tham khảo và quyết định thiết kế mở

**Khung (2026-10-07, @lukasai):** Cổ Linh Thần Chiến là game mới. Tài liệu này không còn đối soát "parity" với game nguồn. Nó ghi (1) những gì đã học được từ data tham khảo và (2) các quyết định thiết kế cần chốt trước khi build.

## 1. Data tham khảo dùng thế nào

| Tham khảo | Dùng để | Không dùng để |
|---|---|---|
| `data/legacy-kits-v1.json`, `legacy-source/kits.yml` | Thang độ lớn chỉ số theo vai trò (HP ~550–700, tầm xạ thủ, nhịp chiêu) | Copy kit, tên chiêu, ID, câu mô tả |
| `trial.yml`, `titan.yml`, `bot-brain.yml` | Ý tưởng objective: vòng chiếm, Titan đi lane, lịch tù và | Copy số làm spec mà không qua mô phỏng |
| `minions.yml`, `boons.yml` | Thứ tự xử lý (cap lính, creep block), cấu trúc Dị Năng 5 mốc × 3 thẻ | Asset `/cdn/`, model, comment tác giả |

Hash trong `source-manifest.json` được tính trên bản CRLF; bản trong repo là LF. Vì đây chỉ là tham khảo, không cần sửa. Không dùng hash này làm cổng kiểm tra.

## 2. Quyết định cần chốt trước build (đã chốt toàn bộ, ghi trong design.md)

| # | Hệ thống | Đề xuất của Savi | Trạng thái |
|---|---|---|---|
| D1 | Rank chiêu | Q/RMB/E tự lên rank theo cấp (1/3/5/7/9), R mở ở cấp 6 và lên ở 11/15; không có điểm kỹ năng | ✅ Chốt 2026-10-07 |
| D2 | Ultimate | Nạp thanh bằng giao tranh: hạ tướng > đánh tướng > lính/quái; chiêu hỗ trợ cũng nạp | ✅ Chốt 2026-10-07 |
| D3 | The Call | Vòng 18 m; một phe đứng một mình chiếm trong 45 s; hai phe cùng đứng thì không ai tiến; phe thua lần trước bắt đầu từ 30% | ✅ Chốt 2026-10-07 |
| D4 | Cổ Titan | Đi lane tới khi bị hạ; người phe thắng bấm F để lái; HP và damage theo rank lấy từ mô phỏng | ✅ Chốt 2026-10-07 |
| D5 | Công trình | Trụ T1 khóa T2 cùng lane; sập ít nhất một Trấn Mạch mở Tâm Mạch; số HP lấy từ mô phỏng nhịp trận 20–35 phút | ✅ Chốt 2026-10-07 |
| D6 | Kinh tế | Vàng thụ động, last-hit, hạ tướng, objective; giá trị chỉnh tới khi mô phỏng đạt nhịp đồ mong muốn | ✅ Chốt 2026-10-07 |
| D7 | Shop | Chỉ mua ở căn cứ hoặc khi đang chết | ✅ Chốt 2026-10-07 |
| D8 | Hồi Tưởng | Kênh 6 s, bị ngắt khi nhận damage, di chuyển, ra chiêu hoặc dính CC | ✅ Chốt 2026-10-07 |
| D9 | Dị Năng | 5 mốc × 3 thẻ cho cả 27 tướng, thiết kế mới | ✅ Chốt hướng; nội dung thiết kế khi build |
| D10 | Vật phẩm | Catalog riêng của game; 8 món ở 08 là bản nháp | ✅ Chốt hướng; nội dung thiết kế khi build |
| D11 | Nền tảng | Spawn engine: phòng multiplayer có sẵn, `sim.js` làm trọng tài, link mở được trên cả máy tính và điện thoại | ✅ Chốt: desktop trước, phone chơi được bằng touch layout |
| D12 | Bụi / đối xứng map | Map đối xứng tâm (x, z) → (−x, −z); bổ sung 12 bụi phía Red | ✅ Chốt, đã thêm vào 07 §6; lane giữa sửa thành đối xứng tâm (2026-10-07) |
| D13 | Phạm vi vòng hiện hành | Slice 1.5 = sảnh kiểu LOL + map `mach_giua`. `cuu_mach` hiện thẻ khoá. 14 §B0 thắng 06/09/11/13 cho vòng này | ✅ Chốt 2026-10-07 (Savi theo uỷ quyền, sau review của @lukasai) |
| D14 | Vào trận | Chỉ qua phase trọng tài `lobby → picking → loading → ingame → results`. Bỏ chọn tướng tức thì và tự chạy ván mới | ✅ Chốt |
| D15 | Mode Slice 1.5 | `tai_hien` bật, chỉ người thật, ≥1 người mỗi đội, cho lệch người. `san_tap` bật, 1 người, có Làm lại/Kết thúc. `thu_tran` khoá đến khi có bot | ✅ Chốt |
| D16 | Danh tính | Khoá người chơi trong mọi state/save = `userId`. Rớt mạng giữa trận giữ ô 60 s, vào lại khôi phục từ `match.saved` | ✅ Chốt |
| D17 | Lệnh sảnh | Một ô `lobbyReq {seq, op}` mỗi người. HUD chờ ack mới gửi lệnh tiếp, gửi lại cùng seq sau 2 s. Mọi op idempotent, có bảng quyền (14 §B0.7) | ✅ Chốt |
| D18 | Chuỗi hiển thị | Một bundle `scripts/lib/data/strings.yml` `{vi-VN, en}`. Khoá `hero.*` sinh từ roster CSV. heroes.yml không chứa chuỗi hiển thị | ✅ Chốt |

## 3. Không đổi gameplay trong art pass

Model, VFX, âm thanh và UI skin được thay tự do. Tầm đánh, hitbox, tọa độ, lane và số liệu chỉ đổi qua `balance-log` kèm mô phỏng (04 §3).
