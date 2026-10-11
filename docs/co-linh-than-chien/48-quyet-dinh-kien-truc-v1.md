# 48 · Quyết định kiến trúc V1 (v3): modular trong `main`, tách place để sau

Trạng thái: **quyết định phạm vi do creator đề nghị chốt 2026-10-09** (lukasai: "đề nghị chốt phạm vi kiến trúc V1 gọn…"). Thay doc 48 v2.4; bản v2.4 nguyên văn chuyển sang [doc 49 — roadmap](49-roadmap-tach-place-spike.md). Không đổi gameplay, không đổi USER LOCK gameplay. HUD để sau.

## 1. Quyết định

| # | Giữ / làm | Không làm vòng này |
|---|---|---|
| D1 | `main` là place đang chạy **và trọng tài duy nhất** (`places/main/sim.js`) | chưa tách `sanh`, chưa đổi `defaultPlace` |
| D2 | Giữ schema `place.state.lobby / match / results`, roster đóng băng, ack cùng tick (doc 14 §B0, design.md) | chưa chuyển state sang world.state, chưa mailbox/bảng tin cross-place |
| D3 | Tách theo **module màn hình + data** trong `main` (luật module 2026-10-08, doc 44 §11) | — |
| D4 | File không cần trước khi đứng: `import()` sau khi đứng hoặc đọc lúc cần lần đầu; model không cần cho hình đầu: spawn từ `onArrive` | không bỏ asset nào; gallery giữ nguyên (gate creator) |
| D5 | **Giữ preview tướng**; đường sảnh không kéo combat/VFX trận (`combat.js`, phần chiêu `skillfx.js`, `feel.js`, `pings.js`, `lane.js`) | không bỏ preview để đạt số |
| D6 | Không chờ P-1…P-7 mới modularize | P-1…P-7, T1–T7 restart, M2/M3/L1, route reload, PvP routing, Gate H = **roadmap doc 49**, không phải blocker |
| D7 | Reconnect 60 s giữ nguyên luật hiện hành | không viết lại timer |

Mở lại tách place khi: số đo §4 (cùng build, lặp ≥ 3 boot lạnh, desktop lukasai + điện thoại thật) cho thấy modular trong `main` vẫn không đạt mục tiêu arrival/first-picture. Mục tiêu code ≤ 450 KB vẫn là **đề xuất** (doc 40 C6), tách riêng khỏi bytes asset/mạng (chưa có ngưỡng).

## 2. Ba bước giao agent

Mỗi bước: viết TODO trước, làm, tự audit; kết quả của Savi/agent **không phải nghiệm thu** (creator nghiệm thu cuối). Không sửa build lúc đang đo.

### B1 — Import graph + tải muộn trong `main`
- Vẽ import graph từ 3 điểm vào: `templates/player.js` (humanoid-locomotion → player → hero), `templates/camera.js` → `scripts/camera.js`, `scripts/ui.js`; cộng `scripts/bot.js`, `scripts/lane.js`. Đánh dấu từng module: *boot* / *preview* / *trận* / *lúc cần*.
- Module *trận* và *lúc cần* chuyển sang `import()` sau khi đứng hoặc khi vào phase picking/loading/ingame (tải trước từ picking, xem B2); phần chiêu của `skillfx.js` tách khỏi phần preview.
- Model/cell dressing không cần cho hình đầu: spawn từ `onArrive` của place (gallery x0z1 giữ nguyên chỗ cho tới khi creator quyết C2).
- **Gate:** graph từ điểm vào sảnh = 0 module combat/VFX trận; ảnh preview 6 tướng giống trước; Sân Tập + Đấu Máy chơi hết trận như cũ; arrival code đo lại (`spawn perf --boot`) ghi kèm version.

### B2 — Tách module màn hình + data (S7 + M1a trong `main`)
- `hero.js` tách core / input / presence (doc 44 S7): presence (nhịp 2 s, lobbyReq, locale) không import phần chiêu/combat; phần trận (`scripts/hero/match.js`) **tải trước từ phase `picking`** (cùng lúc router tải trước HUD trận), *chạy* chỉ khi có roster. Chủ ý (2026-10-09): `loading` chỉ dài 3 s (`lobby.yml loadSeconds`), graph trận ≈136 KB tĩnh; tải từ `picking` (30 s) cho trận mở không chờ. Trước roster module không ghi roster hay trạng thái gameplay dùng chung (syncRoster chỉ đọc hàng roster khi phase `ingame`); nó vẫn tạo/đổi vật thể cục bộ cho hiệu ứng (bụi, cue). Sảnh (`lobby`) và `results` không tải. Đánh đổi: người huỷ giữa bước chọn đã tải ≈136 KB không dùng.
- Mọi chỗ đọc lobby/match/results/phase/bots/feed đi qua `scripts/lib/session.js` (≈20+ chỗ, doc 47 §1 #9). **Không đổi kho, không đổi schema**, trọng tài vẫn là writer duy nhất.
- Mỗi màn hình một module (`scripts/screens/<area>/<screen>.js`), `ui.js` chỉ là router; không vòng import.
- **Gate:** grep đọc thẳng `place.state.lobby|match|results` ngoài referee + session = 0; luồng sảnh → chọn tướng → trận → kết quả → sảnh như cũ; reconnect 60 s như cũ (PRAC-03/04).

### B3 — Đo baseline + checker scope asset (A0)
- Baseline: một build cố định, desktop lukasai + ≥ 1 điện thoại thật (creator chọn máy), ≥ 3 boot lạnh mỗi máy, raw `spawn perf --boot --json` vào `reports/perf-baseline-<ngày>/`, trung vị + min/max. Đo trước B1 và sau B2.
- Nâng `tools/assets/manifest.py check`: trường `scope` bắt buộc với giá trị `shared` · `place:main` · `dynamic` · `preview` · `docs-only` (`place:<id>` khác chỉ khi phase sau mở place mới); orphan phải fail. Fixture `tools/assets/fixtures/` F0 sạch = 0; F1 sai place, F2 thiếu scope, F3 scope lạ, F4 ref runtime chưa khai báo, F5 orphan = ≠ 0 (chi tiết doc 49 §4.1).
- **Gate:** `python3 tools/assets/manifest.py test` đúng mã thoát 6 ca; bảng baseline trước/sau có raw trace.

## 3. Gate creator còn mở
1. Gallery x0z1 → place chỉ editor (C2)?
2. Điện thoại nào cho baseline?
3. Nghiệm thu cuối B1–B3.

## 4. Ghi chú đo
Telemetry builder 2026-10-09 (v1205, một lần, máy builder, không phải baseline): đứng sau 584 KB, hình đầu sau 876 KB, world files 757 KB trước hình đầu. Đây là điểm xuất phát tham khảo cho B1, không phải số nghiệm thu.
