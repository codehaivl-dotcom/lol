# Từ điển và localization — Eng–Vi

**Locale tags:** `vi-VN`, `en`.  
**Mặc định lần đầu:** `vi-VN`. **VO V1:** Vietnamese character + announcer VO. **English VO:** không thuộc bản đầu.

## 1. Quy tắc trải nghiệm song ngữ

- Mọi UI, menu, setting, tooltip, tutorial, combat log, system message, scoreboard, chat/system error, item/skill description, subtitle, store text và end screen phải có VI và EN.
- Cho phép đổi ngôn ngữ ở lobby/settings và trong trận; lựa chọn tồn tại qua lần mở game sau. Runtime: `player.state.locale = 'vi-VN' | 'en'`, chuỗi lấy từ bundle `scripts/lib/data/strings.yml` qua `t(key, locale)` (09 §1, 14 §B0.5).
- Bản EN không dịch tên riêng Cổ Linh, địa danh, tên tướng và tổ chức; dịch nghĩa/description trong context.
- Tên kỹ năng, item, boon, camp, map landmark có hai string độc lập; không ghép song song kiểu “Tâm Mạch / Nexus” trong gameplay mặc định.
- Ký hiệu phím, ID, damage type và tên enum là technical tokens; hiển thị phím đúng input mapping trên máy người chơi.
- Subtitle VI phải khớp transcript của voice VI. V1 không có English VO; `en` đã là locale cho UI/text và phụ đề EN. Nếu English VO được duyệt về sau, đó là audio package bổ sung cùng locale `en`, không phải locale mới.

## 2. Thuật ngữ lõi

| ID | VI | EN | Ghi chú |
|---|---|---|---|
| game.title | Cổ Linh Thần Chiến | War of the Ancient Gods | EN là tên làm việc, cần duyệt thương hiệu. |
| setting.civilization | Văn minh Cổ Linh | Ancient Linh Civilization | Nền văn minh giả tưởng một triệu năm trước 2300. |
| entity.ancient_linh | Cổ Linh | Ancient Linh | Thực thể chiến binh trong ký ức. |
| item.memory_crystal | Tinh Thạch Ký Ức | Memory Crystal | Kho ký ức tìm thấy năm 2300. |
| system.synchronization | Hồi Tưởng Đồng Bộ | Memory Synchronization | Giao thức nhập vai mô phỏng. |
| event.great_silence | Đại Tịch | The Great Silence | Sự kiện làm đứt lịch sử cổ. |
| faction.concord | Minh Ước | The Concord | Faction lam. |
| faction.unbinding_tide | Triều Vực | The Unbinding Tide | Faction đỏ. |
| map.ninefold_veins | Cửu Mạch Chiến Trường | Ninefold Veins Battlefield | Map ID `cuu_mach`. |
| map.middle_vein | Mạch Giữa | Middle Vein | Map ID `mach_giua` (Slice 1.5: lane giữa của `cuu_mach`). |
| structure.nexus | Tâm Mạch | Heart of the Veins | Điều kiện thắng. |
| structure.fountain | Giếng Hồi Tưởng | Memory Well | Tên UI cho fountain. |
| structure.tower | Trụ Mạch | Vein Spire | Tower. |
| structure.keep | Trấn Mạch | Vein Bastion | T2/keep nếu cần phân loại. |
| unit.minion | Linh Binh | Veinbound | Lane minion. |
| resource.gold | Vỏ Sáng | Lumen | UI-only display alias cho gold. |
| resource.xp | Kinh Nghiệm | Experience | Không Việt hóa XP thành currency. |
| ability.recall | Hồi Tưởng | Recall | Giữ B. |
| ability.dodge | Lăn Né | Dodge Roll | Giữ V/Space theo input. |
| item.relic | Di Vật | Relic | Giữ slot/phím T. |
| system.shop | Kho Di Vật | Armory | Giữ phím P. |
| ability.boon | Dị Năng Ký Ức | Memory Boon | Mốc cấp 3/6/9/12/15. |
| lane.top | Mạch Thượng | Upper Vein | Lane label; top trong technical data. |
| lane.mid | Mạch Giữa | Middle Vein | Lane label. |
| lane.bot | Mạch Hạ | Lower Vein | Lane label. |

Tên này là proposal display. ID kỹ thuật theo 09 §2.

## 3. Bộ yêu cầu từng chuỗi

Mỗi chuỗi runtime phải có: `string_id`, `context`, `vi-VN`, `en`, `max_length` hoặc layout target, `character_limit`, `review_status`, `source_owner` và `last_changed_version`/content revision. Với chuỗi gắn VO, thêm `voice_id` để trỏ tới dòng/asset và `subtitle_string_id` trỏ tới chuỗi subtitle VI/EN. Subtitle là text localization, không phải audio asset; master file, actor, take, duration/timecode, pronunciation, rights và mix review nằm trong audio asset manifest.

Quy ước ID theo 09 §6 (ví dụ `hero.<id>.lore.short`, `hero.<id>.ability.<slot>.short|full`, `hero.<id>.voice.<cue_id>.subtitle`, `voice.<speaker>.<event>.<variant>`). Cinematic text dùng bộ ID đã định nghĩa trong doc26 (`intro.line.*`, `intro.welcome*`, `intro.start`, `intro.skip`, `intro.replay`, `intro.load_error`); không tạo alias hoặc đổi prefix. ID dùng ASCII thường, không dấu, không tái sử dụng sau khi xóa. Không đưa URL/path media vào string table.

## 4. Text, font và layout

- Encoding UTF-8. VI phải hỗ trợ đầy đủ dấu/đúng tổ hợp Unicode; EN dùng sentence case. Không render bằng ảnh chữ nếu nội dung cần localization.
- VI ưu tiên câu ngắn, động từ rõ; EN ưu tiên nghĩa gameplay tương đương, không dịch word-for-word khi khác thứ tự tự nhiên.
- Khối UI quan trọng phải có auto-wrap; không cắt dấu, tên, cooldown hoặc số lượng. Tooltip phải chứa đủ target, range/radius, duration, cost, cooldown, damage type, scaling, CC, condition và counterplay trong dữ liệu skill.
- Số liệu theo locale: phân tách thập phân/chục theo locale hệ điều hành hoặc quy định thống nhất; trong combat use `1,250` EN / `1.250` VI, thời gian `1,5 giây` / `1.5 s`. Data nội bộ luôn numeric, không dùng chuỗi đã format.
- Screen reader, keyboard focus, reduced motion và color-blind status không phụ thuộc riêng màu đội.

## 5. Voice/subtitles V1

Voice package V1 chỉ tiếng Việt. Mỗi dòng VO được liên kết với trigger đã xác nhận, speaker/actor, master take, duration/timecode, pronunciation, rights và mix review trong audio manifest; subtitle dùng string ID VI/EN như §3. Trước duyệt, script VI và EN subtitle là proposal; sau khi thu, transcript VI phải khớp master, EN là adaptation được linguistic review. Announcer đọc gameplay callout bằng tiếng Việt rõ trước; flavor line không được cắt mất cue cần phản xạ.

Hồ sơ cue và coverage VO/SFX theo skill nằm ở [doc34 · Ma trận VO/SFX roster 27](34-ma-tran-vo-sfx-roster-27.md). Nó là proposal/coverage gate, không tự khóa gameplay trigger hoặc xác nhận asset/runtime support. Phim intro chỉ theo script/cue sheet riêng của doc26.

Không dùng giọng vùng miền làm trò cười. Voice casting không cần mọi Cổ Linh có chất giọng “cổ” giống nhau; chỉ dùng treatment cổ đại ở lớp mixing đã duyệt. Bản English hiển thị đủ subtitle và mọi system information ngay cả khi không có English VO.

## 6. QA locale checklist

- Chuyển VI ↔ EN ở lobby và giữa trận; không restart match, mất setting hoặc reset input.
- Kiểm tra toàn bộ 27 hero/profile/skill, items, boons, camps, map landmark, controls, error, victory/defeat và tutorial thuộc release scope.
- Không có key ID bị lộ, chuỗi hay tên của game tham khảo lẫn vào UI, text fallback không dịch, tofu glyph, clipping, hardcoded prompt hay sai dấu.
- Mọi VO VI có transcript/subtitle VI khớp; EN subtitle là adaptation đã review và hiển thị đúng locale. Việc renderer/playback hỗ trợ phải được nghiệm thu riêng, không suy ra từ string table.
- Thời gian, số, gold, cooldown hiển thị nhất quán và không đổi giá trị giữa locale.
