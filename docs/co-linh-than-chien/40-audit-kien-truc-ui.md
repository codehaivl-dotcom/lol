# 40 · Audit kiến trúc UI + Tiêu chuẩn UI đo được

Ngày: 2026-10-08 · Trạng thái: **[USER LOCK]** lukasai duyệt hướng ("duyệt… cấm viết inline và gán bừa size. Mọi thứ phải lập 1 tiêu chuẩn desktop/mobile đo được").
Phạm vi: chỉ kiến trúc và kỹ thuật UI, cùng tải trang. Không đổi gameplay hay map (khóa nghiên cứu ở memory vẫn giữ).
Quy trình: TODO trước → tách từng lớp → so ảnh trước/sau → audit. Chưa sửa code trước khi tài liệu này được duyệt.

---

## A. Studio làm thế nào (LoL / Liên Quân / Unity-UGUI / Riot client)

1. **Dữ liệu tách khỏi hình**: server giữ sự thật → view-model phía client dịch ra "cần hiện gì" → view chỉ vẽ.
2. **Design system**: token (màu, chữ, khoảng cách, bo/vát, lớp z) → bộ component → màn hình. Không ai gõ số trần.
3. **Độ phân giải tham chiếu**: thiết kế trên một khung cố định, neo theo góc và vùng an toàn, scale theo màn (CanvasScaler, match width/height).
4. **Quản lý màn hình**: mỗi màn là một module có vòng đời riêng, tải khi cần (addressables).
5. **Ngân sách**: KB, ms, draw cho mỗi màn, đo trên máy yếu nhất.
6. **Quy trình**: spec → wireframe → dựng → QA theo bảng thiết bị → lint chặn vi phạm.

## B. Hiện trạng (số đo ngày 2026-10-08, v1138)

| Hạng mục | Số đo | Đánh giá |
|---|---|---|
| Server giữ sự thật (sim = trọng tài, UI chỉ đọc) | đúng | ✅ |
| Chuỗi song ngữ tách bảng (strings.yml + i18n.js) | đúng | ✅ |
| Khung tham chiếu compact 820×460 | có | ✅ |
| Khung tham chiếu desktop | **không có**, px trần | ❌ |
| `style="…"` inline | ui.js 169 · lobby-ui.js 201 · hud-touch 19 · hud-std 12 · plate 10 = **411** | ❌ |
| Giá trị px gõ cứng | **1533** lần, **126** giá trị khác nhau | ❌ |
| Cỡ chữ khác nhau | **23** (9 → 104 px, có 10.5, 11.5, 12.5, 13.5) | ❌ |
| Màu trần | 50 hex + 187 oklch khác nhau; ui-theme.js chỉ có ~12 biến | ❌ |
| z-index | 0,2,3,4,5,6,20,99, không đặt tên | ❌ |
| Khối `<style>` | 15, nằm trong 4 file | ⚠️ |
| @media | 12, chỉ trong ui.js; compact() đặt ngưỡng 960×540 hoặc pointer coarse | ⚠️ |
| Kích cỡ file UI | ui.js 66 KB · lobby-ui.js 70 KB · hud-touch 16 KB · hud-std 13 KB | ❌ |
| View-model | không có; widget đọc thẳng state | ❌ |
| Bảng QA thiết bị | không có | ❌ |
| Tải trang: đứng được | ~1.2 MB (world files 1.1 MB) so với chuẩn 450 KB | ❌ |
| Tải trang: hình đầu tiên | 1.6 MB, có lần tới **33.4 MB** (bespoke .bgeo 4.6 + 3.6 + 3.5 MB…) | ❌ |
| Khung hình | máy Savi 6 ms/16.7; máy creator 22 ms (GPU, bản 07/10, cần đo lại) | ⚠️ |

## C. Tiêu chuẩn UI (bắt buộc từ nay)

### C1. Luật viết
- **Cấm `style="…"` inline.** Ngoại lệ duy nhất: biến CSS động `style="--w:42%"` / `--h:140` / `--cd:.6` để truyền số runtime; mọi thuộc tính thật nằm trong class.
- **Cấm px trần ngoài file token.** Mọi kích thước dùng `var(--s-*)`, `var(--f-*)`, `var(--r-*)`, `var(--z-*)` hoặc bội số của chúng.
- **Cấm màu trần ngoài file token.** Kể cả SVG minimap: `fill="var(--team-blue)"`.
- Một component = một class gốc + modifier (`.slot`, `.slot.is-ready`, `.slot.is-cd`). Tên lớp không trùng giữa các màn.
- `<style>` chỉ nằm trong lớp theme (C5). Màn và widget không tự khai báo style.

### C2. Khung tham chiếu & scale
| Chế độ | Khung | Chọn khi | Scale |
|---|---|---|---|
| Desktop | **1920×1080** | không phải compact | `z = clamp(min(vw/1920, vh/1080), 0.6, 1.5) × hudScale` |
| Compact (mobile, cửa sổ nhỏ) | **820×460** (giữ) | `pointer: coarse` hoặc `vw ≤ 960` hoặc `vh ≤ 540` | `z = clamp(min(vw/820, vh/460), 0.5, 1.25) × hudScale` |
- Mọi số thiết kế viết theo đơn vị **px của khung**, scale đúng một chỗ (root transform hoặc `--u`).
- `hudScale` (cài đặt người chơi) 0.8 → 1.2, bước 0.05.
- Vùng an toàn: `env(safe-area-inset-*)` cộng vào lề compact; lề tối thiểu 12 px khung. Rail phải của Spawn (50×360 giữa cạnh phải) luôn trống.
- Chỉ ngang (USER LOCK "Moba bắt buộc chơi ngang"): dọc → màn xoay máy.

### C3. Token (giá trị khởi điểm, đo ở khung)
- **Khoảng cách** `--s-1..8`: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64
- **Chữ desktop** `--f-xs..2xl`: 12 · 14 · 16 · 20 · 26 · 34 · 48 (7 cỡ, thay 23 cỡ hiện tại)
- **Chữ compact**: 10 · 12 · 14 · 17 · 22 · 28 · 40
- **Vát/bo** `--r-1..4`: 4 · 6 · 8 · 10
- **Icon** `--i-*`: 16 · 24 · 32 · 48 · 64 · 96
- **Ô chiêu**: desktop 66 / bị động 46 / tiện ích 50; compact: tấn công 120, QWER 72, tiện ích 52
- **Vùng chạm** compact ≥ **48 px khung** (≈ 9 mm trên điện thoại 6"), cách nhau ≥ 8
- **Lớp z** đặt tên: `--z-world 0` · `--z-hud 10` · `--z-panel 20` · `--z-shop 30` · `--z-modal 40` · `--z-toast 50` · `--z-system 60`
- **Màu**: giữ bảng ui-theme.js (ink, navy, gold, cyan, paper, mute) + `--team-blue`, `--team-red`, `--hp-ally` (xanh lá thẻ chỉ số), `--hp-enemy`, `--mp`, `--en`, `--gold-coin`, `--warn`, `--ok`. Thêm màu = sửa token, không sửa màn.
- Chữ cuối khung: tối thiểu 12 px desktop / 10 px compact sau khi scale ≥ 9 px thật.

### C4. Đo được: lint + QA
- `tools/ui-lint.py` đếm: inline style không phải `--var`, px trần, màu trần, `<style>` ngoài theme, z-index số. **Ngưỡng: 0** cho file đã tách; báo theo file/dòng.
- Bảng QA (ảnh chụp mỗi màn × mỗi độ phân giải, lưu `docs/co-linh-than-chien/qa/ui/`):
  desktop 1920×1080 · 1366×768 · 2560×1440 · 1828×860 (máy creator); compact 844×390 · 932×430 · 1024×600 · 1180×820 (tablet ngang).
- Tiêu chí mỗi ô: không tràn, không chồng, chữ ≥ ngưỡng, vùng chạm ≥ 48, rail Spawn trống. Ảnh CPU-emulated ghi rõ là emulated; điện thoại thật = NOT RUN cho tới khi đo thật.

### C5. Lớp (thư mục đề xuất)
```
scripts/ui/theme/tokens.js      L0 token → biến CSS (desktop + compact)
scripts/ui/theme/base.css.js    L1 class component (plate, btn, slot, bar, chip, panel…)
scripts/ui/vm/*.js              L2 view-model: state → dữ liệu thuần (hp%, cd, gold, roster…), không HTML
scripts/ui/w/*.js               L3 widget: dữ liệu → HTML chỉ có class + --var
scripts/ui/screens/*.js         L4 màn: lobby, pick, versus, match-desktop, match-compact, shop, board, results
scripts/ui.js                   L5 router: chọn màn theo phase × chế độ; không HTML
```
Phụ thuộc chỉ đi xuống: L5 → L4 → L3 → L2/L1 → L0. Widget không đọc ctx; màn không có CSS.

### C6. Ngân sách
- Mỗi file màn ≤ **25 KB**; widget ≤ 6 KB; theme ≤ 15 KB.
- Tổng code tải trước khi đứng: mục tiêu **≤ 450 KB** (hiện 1.1 MB). UI, map và Titan/gallery chưa dùng phải ra khỏi đường boot.
- ui.render ≤ 2 ms mỗi lần trên máy creator; đo bằng perf.

## D. TODO (thứ tự; mỗi bước: chụp trước → tách → chụp sau so khớp → lint → audit)

- [ ] D0 Chụp ảnh chuẩn hiện tại theo bảng C4 (lobby, pick, versus, trận desktop, trận compact, shop, board, kết quả): ảnh này là đối chứng "không đổi hình".
- [ ] D1 Viết `tools/ui-lint.py`, chạy lấy số nền (411 inline / 1533 px…).
- [ ] D2 L0+L1: gom ui-theme.js, HSTYLE, MSTYLE, PSTYLE, PSTY, STD_STYLE, style lobby → tokens.js + base.css.js. Map 23 cỡ chữ → 7, 126 giá trị px → thang token (lệch ±2 px được ghi lại).
- [ ] D3 L2 view-model: tách phần đọc state trong ui.js, hud-std, hud-touch, lobby-ui.
- [ ] D4 L3 widget: thanh máu, ô chiêu, minimap, feed, crest, ping, item, tooltip, overhead plate.
- [ ] D5 L4 màn: tách ui.js (66 KB) và lobby-ui.js (70 KB) thành từng màn ≤ 25 KB.
- [ ] D6 L5 router: ui.js chỉ còn chọn màn.
- [ ] D7 Desktop sang khung 1920×1080 + scale một chỗ (hiện chỉ compact có khung).
- [ ] D8 Tải: đo lại boot; dời file không cần lúc đứng (gallery x0z1, titan.js, file mồ côi) và model bespoke nặng ra khỏi hình đầu tiên.
- [ ] D9 Chạy lại bảng QA C4, lint = 0, so ảnh với D0, báo một lần.

## E. Câu hỏi mở (phải trả lời bằng thử thật, không đoán)
- UI của engine có hỗ trợ tải màn theo nhu cầu (dynamic import) không? Tra engine-reference không thấy; thử một màn nhỏ trước, không được thì báo team.
- Panel `ui:` gắn trên vật thể (overhead plate) có nhận `<style>`/class chung không? Nếu không, plate là ngoại lệ có ghi chú, vẫn dùng token qua một bảng hằng.
- 33 MB hình đầu: phần nào là địa hình/vách Blender cần cho cảnh mở, phần nào để tải sau.
