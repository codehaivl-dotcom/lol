# Data contract, roster và localization mapping

> **[USER LOCK — 2026-10-11 / new roster overlay]:** Với roster 24 mới, skill slots canonical **Q/W/E/R**, **D = Dash chung**, `basic_attack` là hành động riêng. Contract `lmb/rmb` trong nội dung lịch sử là legacy; bản chuyển đổi mapping `old.q→q, old.rmb→w, old.e→e, old.r→r, old.lmb→basic_attack`; **không gán skill lên chuột trái hoặc phải**. Cần cập nhật runtime schemas riêng khi tích hợp. Xem [doc 91](91-khoa-input-qwer-d.md).


**Khung (2026-10-07, @lukasai):** game mới hoàn toàn. Số liệu do dự án tự tune và cân bằng bằng mô phỏng (04). Data của game khác chỉ là tham khảo, không phải source of truth.
**Nguyên tắc:** mỗi số gameplay nằm ở đúng một nơi. Localization là lớp tách rời. Không dùng tên hiển thị làm khóa save/network. Khoá người chơi trong state/save là `userId` (`pa_…`), không phải playerId của phiên.

## 1. Source of truth

| Dữ liệu | File canonical | Khóa | Ai được sửa |
|---|---|---|---|
| Chỉ số, growth, resource, kit (passive/LMB/Q/RMB/E/R), hình học đòn, CC | `scripts/lib/data/heroes.yml` (đã có 6 tướng slice; 21 tướng còn lại thêm khi thiết kế) | `hero_id` | Gameplay owner; mỗi lần đổi ghi `balance-log` kèm kết quả mô phỏng |
| Objective (The Call, Cổ Titan, camp), lính, công trình, kinh tế | `scripts/lib/data/objectives.yml`, `economy.yml`, `structures.yml` | point/unit ID | Gameplay owner, như trên |
| Map: tọa độ, lane, camp, pit, bụi | `scripts/lib/data/map.yml`; bảng 07 là bản đọc | point ID | Level design; art không sửa |
| Tên, epithet, role, tên chiêu VI/EN | `data/roster-display-map.csv` → localization bundle `scripts/lib/data/strings.yml` (khoá `hero.<id>.*`) | `hero_id`, slot, locale | Narrative/localization; không sửa số |
| Thiết kế 27 tướng (lore, tạo hình) | `03-danh-sach-tuong.md` | `hero_id` | Art/narrative |
| Kết quả cân bằng | `balance-log` + báo cáo mô phỏng theo phiên bản | change id | Gameplay owner |
| Tham khảo (không ship) | `data/legacy-source/`, `data/legacy-kits-v1.json` | `reference_id` | Không ai sửa; không import vào runtime |

## 2. ID contract

- Hero ID là ID **của Cổ Linh**: ASCII thường, không dấu, theo tên mới. ID cũ của game tham khảo chỉ còn ở cột `reference_id` trong CSV để tra ngược, và không xuất hiện trong code, network, save hay asset path.
- Ability slot: `passive`, `lmb`, `q`, `rmb`, `e`, `r`. Tướng không có một slot thì ghi `not_applicable`, không bỏ trống.
- Team `blue`/`red`; locale `vi-VN`/`en`. Map ID `cuu_mach` (V1), `mach_giua` (Slice 1.5, một đường giữa; xem 14 §B0); mode ID `tai_hien` (5v5), `thu_tran` (bot), `san_tap` (training).
- ID đã ship không đổi, không tái sử dụng. Đổi tên hiển thị thì không cần migration.

## 3. Schema kit

Mỗi tướng trong `heroes.yml` có: `stats` (hp, resource, ad, ap, armor, mr, moveSpeed **m/s**, attackSpeed đòn/s, hpRegen **/s**, resourceRegen **/s**), `growth` (cùng key), `resource` (mana | energy | none) và các slot. Mỗi slot có `type`, `range`/`radius`/`width`/`angle` (m, độ), `windup`, `cooldown` và `cost` theo rank, `damage` { type: physical | magic | true, base[rank], scaling }, `effects[]`. Đơn vị là đơn vị thế giới thật (m, s). Không dùng quy ước MS/50 hay "mỗi 5 s" của game tham khảo.
Rank (D1, 08 §2): Q/RMB/E tự lên rank ở cấp 1/3/5/7/9 (mảng 5 phần tử); R mở ở cấp 6, lên rank ở 11 và 15 (mảng 3 phần tử). Không có điểm kỹ năng.

## 4. CSV roster contract

`data/roster-display-map.csv` là bản kiểm tra cho người viết/QA, không phải runtime parser. Dòng đầu là header, encoding UTF-8, dấu phẩy trong chuỗi phải quote CSV.

Các trường bắt buộc:

| Field | Yêu cầu |
|---|---|
| `hero_id` | ID Cổ Linh duy nhất, khớp `heroes.yml` và màn chọn tướng |
| `reference_id` | ID tướng tham khảo gốc; chỉ để tra ngược, không dùng trong game |
| `name_vi`, `name_en` | Tên riêng; hiện tên tiếng Anh giữ proper name gốc tiếng Việt |
| `epithet_vi`, `epithet_en`, `role_vi`, `role_en` | Mỗi locale đúng nghĩa/role; không suy ra role từ tên |
| `weapon_source_reference` | Gợi ý loại vũ khí; vũ khí thật mô tả ở 03 |
| `passive_vi`, `passive_en` | Tên passive; rỗng chỉ khi kit Cổ Linh thật sự không có passive |
| `<slot>_vi`, `<slot>_en` | Tên display cho LMB, Q, RMB, E, R; không gộp với passive |

Tiêu chí kiểm tra roster: đúng 27 hàng data, không trùng `hero_id`, mỗi ID có một row trong `heroes.yml` và 03, từng locale có đủ name/epithet/role/lore/slot string, không có key hiển thị dùng như key combat. Abilities absent theo kit phải được đánh dấu `not_applicable` trong runtime schema thay vì tự đặt kỹ năng.

## 5. Tình trạng nội dung Eng–Vi hiện tại

Đây là status của **bộ docs**, không phải runtime completion:

| Nội dung | Hiện có | Còn phải author/review |
|---|---|---|
| Hero display name, epithet, role | VI/EN ở CSV | Linguistic review cuối |
| Hero lore | VI prose ở 03 | EN adaptation cho 27 hero; review canon terms |
| Ability labels | VI/EN ở CSV cho passive + 5 active slots | Mô tả short/full VI/EN viết từ `heroes.yml`; tooltip cơ chế cho 27 × chiêu |
| Kit numeric/effect | Chưa có; thiết kế mới trong `heroes.yml` | Thiết kế 27 kit, mô phỏng cân bằng, rồi viết tooltip từ data |
| Dị Năng | Chưa có cho game mới | Thiết kế bộ thẻ cho cả 27 tướng (không còn GAP Orren/Vessa) |
| Vật phẩm | 8 món draft ở 08 | Thiết kế catalog của game, tên và mô tả VI/EN |
| UI/tutorial/system text | Glossary + scope in 05/11 | Full VI/EN string export from runtime screens/events |
| Voice/subtitles | VI voice policy and schema | Actual VI line list/master audio and EN subtitle translations |

Không ship nội dung với fallback EN/VI giả khi key thiếu. String ownership/status và release gate ở 05/11.

## 6. Localization key layout

```text
game.title
hero.<hero_id>.name
hero.<hero_id>.epithet
hero.<hero_id>.role
hero.<hero_id>.lore.short
hero.<hero_id>.lore.full
hero.<hero_id>.ability.<slot>.name
hero.<hero_id>.ability.<slot>.short
hero.<hero_id>.ability.<slot>.full
hero.<hero_id>.voice.<cue_id>.subtitle
item.<item_id>.name / description
boon.<hero_id>.<boon_id>.name / description / quest
map.<map_id>.landmark.<point_id>
ui.<screen>.<control>
system.<event>.title / body
```

Không format câu bằng nối chuỗi hoặc lấy tiếng Anh làm fallback trong bản phát hành. Nếu thiếu chuỗi VI/EN ở development build, hiện `[MISSING: string_id]`; content build/release phải fail localization audit cho key thiếu. Plural, thời lượng và binding phím dùng formatter theo locale.

## 7. Bảng ID và tên

| ID mới | Tên | ID tham khảo cũ (không dùng trong game) |
|---|---|---|
| `moc_lam` | Mộc Lẫm | aldric |
| `kha_tan` | Kha Tàn | varkas |
| `hao_nhat` | Hạo Nhật | solvar |
| `tinh_loi` | Tĩnh Lôi | tenzo |
| `mi_dang` | Mị Đăng | seris |
| `lam_nghi` | Lam Nghi | lysara |
| `van_dao` | Vân Dao | zephira |
| `nham_vu` | Nham Vũ | ylva |
| `loc_thao` | Lộc Thảo | vaelor |
| `ngu_dang` | Ngư Đăng | mordrake |
| `cot_ben` | Cốt Bện | stitches |
| `hoa_tuy` | Hỏa Tủy | kaelthas |
| `sam_kha` | Sấm Kha | thrall |
| `duc_nham` | Dực Nham | rook |
| `bach_dien` | Bách Diện | vespera |
| `nanh_nui` | Nanh Núi | axe |
| `kinh_ngon` | Kính Ngôn | rubick |
| `mac_lien` | Mặc Liên | liming |
| `tam_vu` | Tầm Vũ | sniper |
| `han_chi` | Hàn Chi | jaina |
| `tam_dau` | Tam Dấu | ansel |
| `thach_ho` | Thạch Hộ | ysolde |
| `trac_nham` | Trắc Nham | veyran |
| `sac_nhien` | Sắc Nhiên | invoker |
| `huong_mai` | Hương Mai | thordan |
| `sa_tan` | Sa Tẫn | orren |
| `van_an` | Vân Ấn | vessa |

Chi tiết epithet, tạo hình, vũ khí và lore ở 03.

## 8. Asset ID và V1 audio contract

- Hero assets dùng đường dẫn logic: `heroes/<hero_id>/model`, `/portrait`, `/icon`, `/abilities/<slot>/icon`, `/abilities/<slot>/vfx`; file path thực lưu trong asset manifest và có checksum.
- Map assets dùng `maps/<map_id>/<zone>/<asset_role>`; gameplay point giữ point ID của 07. Variant blue/red là material/skin reference, không nhân đôi logic object.
- VO ID: `voice.<speaker_id>.<event_id>.<variant>`; một cue có actor/speaker, trigger, VI master, subtitle VI, subtitle EN, duration/timecode, pronunciation note, rights state và mix review. V1 không yêu cầu file EN voice.
- Asset không có file thực được gắn trạng thái `concept`, `in_production`, `approved` hoặc `blocked`; tên file dự kiến không được giả là asset đã giao.

## 9. Data change protocol

Gameplay field sửa theo quy trình 04: ghi `balance-log` gồm old/new/reason, kết quả mô phỏng trước/sau, version, approver; cập nhật `heroes.yml`, bảng đọc trong docs và tooltip trong cùng một thay đổi. Narrative/localization sửa string table và increment content version, không sửa kit numeric. Mỗi build lưu `data_version`, locale bundle hash và asset manifest hash trong match diagnostics.

Giá trị mới do dự án đặt, rồi kiểm bằng mô phỏng (04 §3). Không ghi "đã cân bằng" khi chưa có kết quả mô phỏng.
