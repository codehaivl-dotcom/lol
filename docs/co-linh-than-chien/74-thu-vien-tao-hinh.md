# 74 — Thư viện tạo hình tướng Cổ Linh Thần Chiến

**Trạng thái: CONCEPT_LIBRARY — creator duyệt làm tài sản thiết kế lâu dài (2026-10-10 22:50). CHƯA DUYỆT thay tạo hình hàng loạt 27 tướng.**

Luật khóa (creator, audit doc 74):
- Giữ nguyên roster ID, kit, stat, hitbox, capsule và mọi asset đang production. **Hạo Nhật không đổi** (vừa dựng model, kiếm, khiên, 6 clip; chưa xong PASS_ENGINE).
- Dòng **Bộ chiêu** trong mỗi mục chỉ là *gameplay fantasy*, không phải kit. Không bao giờ âm thầm thay kit đang có từ doc này.
- Mỗi mục mang đúng một nhãn: `CURRENT_CANON` (tạo hình đang có giữ nguyên) · `VISUAL_REDESIGN_CANDIDATE` (ứng viên đổi hình cho một tướng có sẵn, phải qua kiểm tương thích §Tương thích) · `NEW_HERO_CONCEPT` (dành cho tướng mới). Mục chưa ghi nhãn trong danh sách = `NEW_HERO_CONCEPT`.
- Tạo hình Việt cổ được giải thích bằng ngôn ngữ thế giới COLINH: nền văn minh nguyên thủy có công nghệ vượt thời đại, về sau bị hiểu thành thần thoại. Không biến roster thành bộ sưu tập thần linh dân gian theo nghĩa đen.
- Không render 100 model 3D. Không thay 27 tướng trong engine. Doc 74 không làm chậm H1–H5.
- **2026-10-10 23:00 creator:** "toàn bộ các tướng còn lại. Sẽ làm theo cách này. Tạo hình sáng tạo. Ko còn là Human bình thường *lâu lâu vẫn có hunman nhưng khác đi 1 chút., ví dụ, Pháp sư, cao béo lùn, thợ cơ khí, xạ thủ, cao bồi, lính công nghệ". → 19 tướng chưa sản xuất (ngoài 8 tướng đã có trong heroes.yml) chọn tạo hình sáng tạo từ thư viện này; người thường hiếm và phải có nét archetype riêng. Mỗi tướng làm prototype kiểu doc 75 trước Blender. 8 tướng đã làm giữ `CURRENT_CANON`.
- Prototype hình ảnh 8 hướng ưu tiên: 021, 023, 011, 062, 002, 022, 051, 053 → doc 75.

Kích thước trong các mục là visual target như doc 03, không phải hitbox.
## Mục đích

Kho 100 tạo hình để audit và làm đa dạng roster 27 Cổ Linh (doc 03): đa chủng tộc, đa chất liệu, đa thuộc tính, đọc được ở camera MOBA khóa (20 m, ảnh xám 64 px). Thế giới: thần thoại Việt cổ qua Tinh Thạch Ký Ức, Minh Ước, ký ức chiến trường vỡ vụn; Đông Sơn chỉ là điểm nhấn; phong cách painterly bán tả thực kiểu LoL / Liên Quân.

Lời creator (@lukasai, 2026-10-10 21:52), nguyên văn:

> "TÔi muốn audit lại toàn bộ tạo hình của hero đa dạng, đa chủng tộc, đa thuộc tính, ví dụ người đá, người sấm, cá sấu, Hổ, Sói... Người tinh thể, người cao su.."

> "lập thư viện ý tưởng. Lập ra cả tram tạo hình"

**Cách đọc mục:** Hệ VFX là một khóa `PAL` trong `scripts/lib/vfx/look.js` (`hoa, dung, loi, phong, moc, thach, huyet, nguyet, thuy, bang, quang, doc, am, thanh`). H/W = cao/rộng đường bao khi idle. "Khoảng âm" = lỗ hở nhìn xuyên giúp silhouette khác nhau. Mỗi mục ghi rõ tướng game khác dễ bị coi là copy và cách tránh.

## Bảng phân nhóm (10 × 10)

| Nhóm | 10 tạo hình (ID) |
|---|---|
| A · Nguyên tố sống | 001 đá sỏi · 002 sấm · 003 lửa đuốc · 004 nước giếng · 005 băng nhũ · 006 gió diều · 007 cát · 008 bùn ruộng · 009 dung nham gánh · 010 sương |
| B · Khoáng & tinh thể | 011 pha lê · 012 ngọc bích · 013 đồng xanh · 014 hổ phách · 015 thủy tinh thổi · 016 muối · 017 sắt rèn · 018 vàng hàn · 019 đá mặt trăng · 020 than hồng |
| C · Thú nhân săn mồi | 021 hổ · 022 sói · 023 cá sấu · 024 báo gấm · 025 gấu ngựa · 026 rắn cạp nong · 027 đại bàng · 028 cú · 029 cá nhám búa · 030 bọ cạp |
| D · Thú nhân hiền & lạ | 031 trâu · 032 voi · 033 ốc sên (thay rùa: trùng Thạch Hộ) · 034 hươu · 035 cá chép · 036 cóc · 037 tê tê · 038 vượn · 039 tê giác · 040 thỏ |
| E · Linh thảo & nấm | 041 cây đa · 042 sen · 043 tre · 044 nấm đèn · 045 dây leo · 046 thanh long (xương rồng Việt) · 047 rêu · 048 hoa gạo · 049 rễ · 050 bào tử |
| F · Vật liệu kỳ dị | 051 cao su · 052 sơn mài (thay mực tàu: trùng Mặc Liên) · 053 giấy dó · 054 sáp · 055 gốm · 056 lụa · 057 khói hương · 058 dây thừng · 059 thạch rau câu · 060 thủy ngân |
| G · Cổ máy & tạo tác | 061 đồng hồ nước · 062 trống đồng · 063 rối nước · 064 tượng đá · 065 giáp rỗng · 066 đèn kéo quân · 067 ấm đất · 068 chiêng · 069 cối xay · 070 bù nhìn |
| H · Linh hồn & bóng | 071 bóng ma · 072 ký ức vỡ · 073 bầy đom đóm (thay gương: trùng Kính Ngôn) · 074 tiếng vọng · 075 sao rơi · 076 nguyệt thực · 077 hư vô · 078 mộng · 079 cờ trận (thay mặt nạ: trùng Bách Diện) · 080 bóng đổ |
| I · Quái & thủy quái | 081 thuồng luồng con · 082 cá Ông (thay giao long: trùng 081) · 083 cua · 084 mực ống · 085 sứa · 086 rết · 087 nhện · 088 dơi · 089 sâu đất · 090 lươn điện (thay ba ba: trùng Thạch Hộ) |
| J · Người phi thường | 091 khổng lồ · 092 tí hon cưỡi gà chọi · 093 song sinh dính · 094 tóc trói (thay nhiều tay: trùng Tĩnh Lôi/Trắc Nham) · 095 người gỗ trầm · 096 người một chân (thay người sắt: trùng 017) · 097 lai rồng · 098 vũ công lông Lạc · 099 người cá · 100 nhà sư hóa đá |

---

## A · Nguyên tố sống

### 001 · **Người Đá Sỏi Suối · Pebble Colossus**
- **Chủng/chất liệu:** sỏi suối tròn, rễ nối khớp.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thach`
- **Hình khối:** 2,4 m · H/W 1,4 · khe sỏi ở eo · trục gù.
- **Dấu hiệu:** ba viên sỏi xoay chậm ở eo.
- **Vũ khí/phụ:** tay là hai phiến đá phẳng.
- **Di chuyển:** bước nặng; lao thì rã thành sỏi lăn.
- **Bộ chiêu:** rã thành dòng sỏi cuốn, ghép lại thành tường.
- **Rủi ro:** Malphite/Lumburr/Tiny → cấm đá liền khối, cấm lớn dần; sỏi tròn rời, gam rêu tách Nanh Núi.

### 002 · **Người Sấm · Thunderborn**
- **Chủng/chất liệu:** mây giông tụ đặc, lõi tia chớp.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `loi`
- **Hình khối:** 2,1 m · H/W 1,6 · thân dưới phễu mây · trục chúi.
- **Dấu hiệu:** tia chớp dọc xuyên thân.
- **Vũ khí/phụ:** hai nắm đấm sấm đặc như đầu chùy đá.
- **Di chuyển:** trôi, giật cục từng đoạn như tia sét.
- **Bộ chiêu:** mỗi đòn tích điện, đầy thì xả sét dọc đường lướt.
- **Rủi ro:** Volibear/Kennen/Storm Spirit → không thú, ninja, áo; trùng `loi` Sấm Kha → dùng để thay Tĩnh Lôi.

### 003 · **Người Đuốc Tre · Torchwalker**
- **Chủng/chất liệu:** khung nan tre bện, cháy từ bên trong.
- **Vai:** Pháp sư
- **Hệ VFX:** `hoa`
- **Hình khối:** 1,9 m · H/W 0,45 · khe nan tre · trục đuốc thẳng.
- **Dấu hiệu:** lửa cao nửa thân, ngả một phía.
- **Vũ khí/phụ:** tay trái là bó nan cháy.
- **Di chuyển:** bước nhanh, để lại vệt tàn.
- **Bộ chiêu:** ném nan cháy thành rào lửa; tốn mana thân ngắn lại.
- **Rủi ro:** Brand/Ember Spirit → lửa trong khung tre, không người lửa trần; Hỏa Tủy thấp lệch, đây cao mảnh.

### 004 · **Người Nước Giếng · Wellspring**
- **Chủng/chất liệu:** nước giếng đứng thành người, giữ dáng nhờ vành gốm.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `thuy`
- **Hình khối:** 1,75 m · H/W 0,6 · thân trong thấy lõi ngọc · trục thẳng mềm.
- **Dấu hiệu:** vành gốm giếng quanh hông như váy.
- **Vũ khí/phụ:** gáo dừa.
- **Di chuyển:** trượt, chân hòa vào vũng nước.
- **Bộ chiêu:** múc nước hồi máu, hắt nước đẩy lùi, hóa vũng dưới chân đồng minh.
- **Rủi ro:** Nami/Morphling → không đuôi, không biến hình; dùng gradient đục cho điện thoại.

### 005 · **Người Băng Nhũ · Icicle Sentinel**
- **Chủng/chất liệu:** nhũ băng mọc từ trần hang.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `bang`
- **Hình khối:** 2,3 m · H/W 1,1 · khe giữa các cột nhũ trên vai · trục nghiêng trước.
- **Dấu hiệu:** rèm nhũ băng dài rủ xuống từ hai vai.
- **Vũ khí/phụ:** cánh tay khiên băng mỏng.
- **Di chuyển:** trượt chậm trên lớp băng tự đóng.
- **Bộ chiêu:** dựng cột băng chặn lối, đập vỡ cột làm chậm.
- **Rủi ro:** Lissandra/Winter Wyvern → không nữ hoàng, không cánh; khác vai/dáng Hàn Chi.

### 006 · **Người Gió Diều · Kitewind**
- **Chủng/chất liệu:** linh gió mặc khung diều giấy dó.
- **Vai:** Xạ thủ
- **Hệ VFX:** `phong`
- **Hình khối:** 1,7 m, diều 2,2 m · H/W 0,8 · khoảng âm thoi.
- **Dấu hiệu:** diều sáo hình thoi lớn sau lưng.
- **Vũ khí/phụ:** ống sáo trúc bắn gió.
- **Di chuyển:** lướt sát đất, bay lên khi né.
- **Bộ chiêu:** đạn gió kéo đuôi giấy; R thả diều bay vòng trên đầu xả gió.
- **Rủi ro:** Janna; Vân Dao → khung cứng, không dải khí.

### 007 · **Người Cát Lốc · Dune Strider**
- **Chủng/chất liệu:** cát nén chạy thành người.
- **Vai:** Sát thủ
- **Hệ VFX:** `thach`
- **Hình khối:** 1,8 m · H/W 0,5 · thân dưới tan thành cát · trục chồm thấp.
- **Dấu hiệu:** khăn cát dài phần phật thành đuôi.
- **Vũ khí/phụ:** hai lưỡi cát kết tinh.
- **Di chuyển:** chui xuống đất, trồi sau lưng mục tiêu.
- **Bộ chiêu:** lặn ngầm lao tới, trồi lên kèm lốc cát.
- **Rủi ro:** Sa Tẫn chậm, eo đồng hồ; đây nhanh mảnh. Sand King/Rek'Sai → không bọ, không sâu.

### 008 · **Người Bùn Ruộng · Paddy Golem**
- **Chủng/chất liệu:** bùn ruộng lúa, mạ cắm trên lưng.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `moc`
- **Hình khối:** 2,2 m · H/W 1,5 · khối tròn đặc; khoảng âm chỉ ở hàng mạ răng lược · trục khom.
- **Dấu hiệu:** hàng mạ xanh cắm thẳng như bờm.
- **Vũ khí/phụ:** cái bừa tre.
- **Di chuyển:** lội chậm, để vệt bùn.
- **Bộ chiêu:** kéo địch sa lầy, cấy mạ thành vùng hồi.
- **Rủi ro:** Zac → không co giãn, không tách mảnh; bùn đặc. Rig dễ.

### 009 · **Người Gánh Dung Nham · Magma Porter**
- **Chủng/chất liệu:** đá bazan đen gánh hai nồi dung nham.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `dung`
- **Hình khối:** 2,0 m, gánh 2,6 m · H/W 0,8 · trục chữ T.
- **Dấu hiệu:** đòn gánh hai đầu đỏ rực.
- **Vũ khí/phụ:** đòn gánh là vũ khí.
- **Di chuyển:** chạy lom khom nhịp gánh.
- **Bộ chiêu:** quay đòn gánh hất dung nham, đổ nồi thành vũng cháy.
- **Rủi ro:** trùng `dung` Hỏa Tủy → một bên đổi `hoa`; giữ mặt nghiêm.

### 010 · **Linh Sương Sớm · Mistveil**
- **Chủng/chất liệu:** sương mù đọng thành người không mặt.
- **Vai:** Pháp sư
- **Hệ VFX:** `am`
- **Hình khối:** 1,7 m · H/W 0,5 · đầu trống rỗng · thân dưới loang.
- **Dấu hiệu:** một chiếc nón lá trôi trên làn sương không đầu.
- **Vũ khí/phụ:** không cầm; giọt sương bay quanh.
- **Di chuyển:** trôi, xuyên qua lính.
- **Bộ chiêu:** phủ sương che tầm nhìn; đứng lâu trong sương bị đông cứng.
- **Rủi ro:** Mị Đăng → trắng sữa, không đèn/mặt nạ; nón lá chỉ ở mục này.

## B · Khoáng & tinh thể

### 011 · **Người Lăng Kính · Prismkin**
- **Chủng/chất liệu:** pha lê lục giác.
- **Vai:** Xạ thủ
- **Hệ VFX:** `quang`
- **Hình khối:** 1,85 m · H/W 0,6 · khe tinh thể vai · trục cứng.
- **Dấu hiệu:** cột lục giác lớn sau lưng tách sáng thành dải cầu vồng.
- **Vũ khí/phụ:** tay phải là lăng kính bắn tia.
- **Di chuyển:** bước cứng, ngân leng keng.
- **Bộ chiêu:** tia sáng gãy khúc, xuyên mạnh hơn sau mỗi lần khúc xạ.
- **Rủi ro:** Taric/Skarner → không giáp kim cương; Kính Ngôn phản chiếu, đây khúc xạ.

### 012 · **Người Ngọc Bích · Jadeheart**
- **Chủng/chất liệu:** ngọc bích chạm, ruột rỗng.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `moc`
- **Hình khối:** 1,7 m · H/W 0,7 · lỗ tròn xuyên ngực · trục thẳng.
- **Dấu hiệu:** vòng ngọc (bích) lớn giữa ngực nhìn xuyên.
- **Vũ khí/phụ:** chuông ngọc treo tay.
- **Di chuyển:** trôi chậm sát đất.
- **Bộ chiêu:** gõ chuông tạo khiên; R hóa ngọc đồng minh, miễn sát thương ngắn.
- **Rủi ro:** Taric; Vân Dao dùng ngọc lam → đổi xanh bích đậm.

### 013 · **Tượng Đồng Xanh · Patina Sentinel**
- **Chủng/chất liệu:** đồng gỉ xanh tỉnh giấc.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `quang`
- **Hình khối:** 2,3 m · H/W 1,0 · khe tay-thân · trục nghiêm.
- **Dấu hiệu:** gỉ xanh lốm đốm, chỗ bị đánh bóng lên ánh vàng.
- **Vũ khí/phụ:** rìu xéo cách điệu.
- **Di chuyển:** bước nặng, ngân tiếng đồng.
- **Bộ chiêu:** hứng đòn làm gỉ bong thành mảnh bắn; càng bị đánh càng sáng.
- **Rủi ro:** Galio → không cánh/áo choàng; chọn một với 064; rìu không chép hiện vật.

### 014 · **Người Hổ Phách · Ambersealed**
- **Chủng/chất liệu:** nhựa hổ phách, côn trùng cổ bên trong.
- **Vai:** Pháp sư
- **Hệ VFX:** `thach`
- **Hình khối:** 1,8 m · H/W 0,7 · thân trong mờ thấy lõi · trục hơi chảy xệ.
- **Dấu hiệu:** chuồn chuồn hóa thạch lớn phát sáng trong ngực.
- **Vũ khí/phụ:** hạt hổ phách quay quanh tay.
- **Di chuyển:** chậm, nhựa nhỏ giọt.
- **Bộ chiêu:** nhốt mục tiêu trong khối nhựa, thả côn trùng cổ bay ra.
- **Rủi ro:** Nham Vũ dùng gam hổ phách → nếu chọn, Nham Vũ đổi màu.

### 015 · **Bình Thủy Tinh Thổi · Glassblown**
- **Chủng/chất liệu:** thủy tinh thổi rỗng, lửa xanh bên trong.
- **Vai:** Sát thủ
- **Hệ VFX:** `hoa`
- **Hình khối:** 1,7 m · H/W 0,5 · thân là bình rỗng · trục nghiêng như rót.
- **Dấu hiệu:** cổ bình dài thay đầu, ngọn lửa xanh trong.
- **Vũ khí/phụ:** hai lưỡi thủy tinh vỡ.
- **Di chuyển:** nhanh, lóe phản quang.
- **Bộ chiêu:** vỡ thành mảnh rồi tái hợp sau lưng địch.
- **Rủi ro:** trong suốt dễ mất trên nền → viền phe dày; trùng chất Kính Ngôn.

### 016 · **Người Muối Biển · Saltwraith**
- **Chủng/chất liệu:** muối kết tinh từ ruộng muối.
- **Vai:** Pháp sư
- **Hệ VFX:** `bang`
- **Hình khối:** 1,8 m · H/W 0,7 · khe giữa khối muối vai · trục đứng khô.
- **Dấu hiệu:** vương miện tinh thể muối khối vuông màu kem.
- **Vũ khí/phụ:** cào muối gỗ.
- **Di chuyển:** trượt, để vệt muối trắng.
- **Bộ chiêu:** rắc muối làm khô (giảm hồi máu), kết tinh trói chân.
- **Rủi ro:** dễ đọc thành băng → khối vuông, kem ấm, không xanh lam.

### 017 · **Người Sắt Rèn · Forgeiron**
- **Chủng/chất liệu:** sắt nung, lò rèn trong ngực.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `huyet`
- **Hình khối:** 2,1 m · H/W 1,1 · khe ống bễ sau lưng · trục chúi.
- **Dấu hiệu:** ống bễ trên lưng phì tia lửa theo nhịp đòn.
- **Vũ khí/phụ:** búa đe.
- **Di chuyển:** dồn bước nặng.
- **Bộ chiêu:** mỗi đòn nung đỏ dần; đỏ tối đa thì nện "tôi nước" nổ hơi.
- **Rủi ro:** Ornn → không dê/sừng, không thợ rèn bán đồ; giữ là khối sắt sống.

### 018 · **Người Hàn Vàng · Goldmend**
- **Chủng/chất liệu:** đá đen vỡ, vá bằng mạch vàng chảy.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `quang`
- **Hình khối:** 1,9 m · H/W 0,9 · khe nứt hở sáng · trục thẳng.
- **Dấu hiệu:** lưới mạch vàng chảy qua thân đen.
- **Vũ khí/phụ:** bát vàng lỏng.
- **Di chuyển:** bước chậm, vàng nhỏ giọt.
- **Bộ chiêu:** vá vàng lên vết thương đồng minh thành khiên — "vá ký ức" của Minh Ước.
- **Rủi ro:** Gildur (Liên Quân) → không lùn, không tham vàng; tránh gọi kintsugi, gọi "hàn vàng".

### 019 · **Người Đá Nguyệt · Moonstone**
- **Chủng/chất liệu:** đá nguyệt quang mờ sữa.
- **Vai:** Pháp sư
- **Hệ VFX:** `nguyet`
- **Hình khối:** 1,8 m · H/W 0,6 · khoảng âm giữa hai vầng khuyết · trục nhẹ, lơ lửng.
- **Dấu hiệu:** đầu là viên đá tròn đổi pha trăng theo hồi chiêu R.
- **Vũ khí/phụ:** hai vầng khuyết bay.
- **Di chuyển:** trôi.
- **Bộ chiêu:** pha trăng đổi chất chiêu: khuyết nhanh, tròn mạnh.
- **Rủi ro:** Diana/Aphelios/Luna → không nữ chiến binh giáp bạc, không vầng trăng sau lưng.

### 020 · **Người Than Hồng · Cinderkin**
- **Chủng/chất liệu:** than đá nứt, lửa trong khe.
- **Vai:** Xạ thủ
- **Hệ VFX:** `hoa`
- **Hình khối:** 1,6 m · H/W 0,9 · thấp chắc · khoảng âm giữa ná và thân.
- **Dấu hiệu:** mạng nứt đỏ trên thân đen, khói phì từ đỉnh đầu.
- **Vũ khí/phụ:** ná bắn hòn than.
- **Di chuyển:** lạch bạch nặng.
- **Bộ chiêu:** búng hòn than nổ chậm, tích thành mưa than.
- **Rủi ro:** trùng nặng Hỏa Tủy ("Than Trong Núi") → chỉ dùng nếu Hỏa Tủy giữ hẳn bản sắc lư thiên thạch.

## C · Thú nhân săn mồi

### 021 · **Hổ Vằn Mực · Inkstripe Tiger**
- **Chủng/chất liệu:** hổ nhân, vằn như nét bút lông.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `huyet`
- **Hình khối:** 2,1 m · H/W 0,9 · hở dưới bụng · trục chồm.
- **Dấu hiệu:** vằn mực đen sáng lên khi vồ.
- **Vũ khí/phụ:** vuốt bọc đồng, đao ngắn sau lưng.
- **Di chuyển:** chạy hai chân, phóng bốn chân khi lướt.
- **Bộ chiêu:** vồ để lại vằn trên mục tiêu; vồ tiếp từ vằn đã đánh dấu.
- **Rủi ro:** Rengar/Udyr → cấm mặt nạ, xương, rình bụi; khóa là vằn mực.

### 022 · **Sói Sương Tru · Howling Mistwolf**
- **Chủng/chất liệu:** sói xám bốn chân thật, bờm sương.
- **Vai:** Xạ thủ
- **Hệ VFX:** `nguyet`
- **Hình khối:** vai 1,4 m, dài 2,0 m · hở giữa bốn chân · trục ngang.
- **Dấu hiệu:** bờm sương trắng bay ngược, vòng đồng ở cổ.
- **Vũ khí/phụ:** vòng cổ phát sóng tru.
- **Di chuyển:** bốn chân, chạy vòng quanh mục tiêu.
- **Bộ chiêu:** tiếng tru bắn sóng âm; R gọi bóng sói chạy theo dấu.
- **Rủi ro:** Warwick/Nasus/Lycan/Kindred → bốn chân, không người sói đứng; bầy chỉ là bóng.

### 023 · **Cá Sấu Gác Bến · Ferry Croc**
- **Chủng/chất liệu:** cá sấu nước lợ, lưng như mạn thuyền.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thuy`
- **Hình khối:** 2,0 m đứng, dài 3,0 m · trục thấp ngang.
- **Dấu hiệu:** mõm như mũi thuyền, mái chèo trên lưng.
- **Vũ khí/phụ:** mái chèo đồng làm khiên-chùy.
- **Di chuyển:** bò thấp, chỉ đứng hai chân khi đánh.
- **Bộ chiêu:** kéo mục tiêu "xuống đáy sông", vùng lặn giảm sát thương.
- **Rủi ro:** Renekton → cấm đứng cơ bắp, lưỡi khuyết; Ngư Đăng → thay, không đứng cạnh.

### 024 · **Báo Gấm Lá · Leaf Leopard**
- **Chủng/chất liệu:** báo gấm, đốm như lá khô.
- **Vai:** Sát thủ
- **Hệ VFX:** `moc`
- **Hình khối:** 1,7 m · H/W 0,45 · khoảng âm cong của đuôi · trục dài thấp.
- **Dấu hiệu:** đuôi rất dài xoắn như dây leo.
- **Vũ khí/phụ:** hai liềm móc buộc cổ tay.
- **Di chuyển:** leo, bật vách, nhảy giữa cây.
- **Bộ chiêu:** tan vào lá, nhảy giữa các điểm cây.
- **Rủi ro:** Nidalee → không người biến báo; luôn là báo nhân.

### 025 · **Gấu Ngựa Đeo Chuông · Moon Bear**
- **Chủng/chất liệu:** gấu ngựa ngực trăng.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `nguyet`
- **Hình khối:** 2,4 m · H/W 1,3 · khoảng âm giữa hai tay buông · trục gù.
- **Dấu hiệu:** vệt trăng khuyết trắng trên ngực + chuông đồng cổ.
- **Vũ khí/phụ:** móng, chuông.
- **Di chuyển:** bốn chân, đứng dậy khi gầm.
- **Bộ chiêu:** rung chuông gây choáng, ôm siết giữ mục tiêu.
- **Rủi ro:** Volibear/Ursa/Zuka/Brewmaster → không sấm, không gấu trúc, không say.

### 026 · **Rắn Cạp Nong · Banded Krait**
- **Chủng/chất liệu:** rắn thuần, không thân người.
- **Vai:** Xạ thủ
- **Hệ VFX:** `doc`
- **Hình khối:** dựng 2,2 m · H/W 0,4 · khoảng âm trong vòng cuộn · trục chữ S đứng.
- **Dấu hiệu:** vòng vàng-đen xen kẽ rất to.
- **Vũ khí/phụ:** nanh, đuôi quất.
- **Di chuyển:** trườn ngang (sidewinding).
- **Bộ chiêu:** phun độc cánh cung, lột da để lại xác giả.
- **Rủi ro:** Cassiopeia/Viper/Medusa và Hàn Chi (naga) → không tay, không trượng; chỉ dùng nếu Hàn Chi chưa ra mắt.

### 027 · **Đại Bàng Vách Đá · Crag Eagle**
- **Chủng/chất liệu:** đại bàng nhân.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `phong`
- **Hình khối:** 2,0 m, sải 3,2 m · H/W 0,6 gấp cánh · khoảng âm giữa hai chân móng · trục chúi.
- **Dấu hiệu:** chân móng to quá khổ, mỏ móc nặng.
- **Vũ khí/phụ:** đánh bằng chân.
- **Di chuyển:** bật nhảy rồi lượn.
- **Bộ chiêu:** quắp mục tiêu lên rồi thả xuống.
- **Rủi ro:** điểu nhân thứ ba sau Dực Nham, Hương Mai; Azir/Anivia → cánh nâu tự nhiên, chỉ chọn một trong 027/028.

### 028 · **Cú Mèo Canh Đêm · Night Owl**
- **Chủng/chất liệu:** cú mèo tròn.
- **Vai:** Xạ thủ
- **Hệ VFX:** `am`
- **Hình khối:** 1,5 m · H/W 0,9 · khoảng âm dưới cánh khép · trục tròn đứng.
- **Dấu hiệu:** hai mắt tròn khổng lồ phát sáng.
- **Vũ khí/phụ:** lông cánh bắn như phi tiêu.
- **Di chuyển:** bay thấp không tiếng.
- **Bộ chiêu:** đầu xoay 180° bắn ngược; trong vùng tối tầm nhìn xa hơn.
- **Rủi ro:** quá nhiều chim → chọn 027 hoặc 028; Quinn's Valor → không người cưỡi.

### 029 · **Cá Nhám Búa · Hammer Shark**
- **Chủng/chất liệu:** cá nhám búa nhân.
- **Vai:** Sát thủ
- **Hệ VFX:** `huyet`
- **Hình khối:** 2,2 m · H/W 0,9 (đầu búa 1,2 m) · khoảng âm giữa hai mắt búa · trục lao.
- **Dấu hiệu:** đầu búa ngang rộng.
- **Vũ khí/phụ:** vây lưng sắc như lưỡi.
- **Di chuyển:** lặn vào đất chỉ lộ vây.
- **Bộ chiêu:** đánh hơi máu kẻ yếu, lao lên cắn kết liễu.
- **Rủi ro:** Fizz/Pyke/Slark → không đinh ba, không móc; đầu búa là khóa.

### 030 · **Bọ Cạp Đá Ong · Laterite Scorpion**
- **Chủng/chất liệu:** bọ cạp vỏ đá ong đỏ.
- **Vai:** Xạ thủ
- **Hệ VFX:** `doc`
- **Hình khối:** cao 1,3 m, dài 2,4 m · H/W 0,55 · khoảng âm trong vòng đuôi · trục ngang, đuôi vòm.
- **Dấu hiệu:** đuôi cong vượt đầu, kim pha lê sáng.
- **Vũ khí/phụ:** càng, kim đuôi.
- **Di chuyển:** bò tám chân.
- **Bộ chiêu:** bắn kim độc xa; cắm càng neo để tăng tầm.
- **Rủi ro:** Skarner/Sand King → không tinh thể khắp thân, không đào cát; rig tám chân tốn.

## D · Thú nhân hiền & lạ

### 031 · **Trâu Cày Thần · Plough Buffalo**
- **Chủng/chất liệu:** trâu nước.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thach`
- **Hình khối:** 2,3 m · H/W 1,4 · khoảng âm trong vòng sừng · trục còng.
- **Dấu hiệu:** sừng lưỡi liềm ngả ra sau, rộng 1,6 m.
- **Vũ khí/phụ:** cày gỗ kéo sau.
- **Di chuyển:** đi chậm, húc thẳng.
- **Bộ chiêu:** kéo cày xẻ rãnh chắn đường, húc ủi.
- **Rủi ro:** Alistar/Toro/Baldum/Spirit Breaker → cấm minotaur cơ bắp, vòng mũi; sừng ngả sau tách Sấm Kha (sừng chĩa lên).

### 032 · **Voi Mang Bành · Howdah Elephant**
- **Chủng/chất liệu:** voi rừng.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `thanh`
- **Hình khối:** 2,6 m · H/W 1,6 · khoảng âm dưới bụng · trục ngang nặng.
- **Dấu hiệu:** bành nhỏ trên lưng có lọng.
- **Vũ khí/phụ:** vòi, ngà ngắn.
- **Di chuyển:** bốn chân, bước rung đất.
- **Bộ chiêu:** vòi phun nước hồi máu, rống đẩy lùi.
- **Rủi ro:** Magnus → không ma mút; thân to che tầm nhìn → visual target, không đổi capsule.

### 033 · **Ốc Sên Vỏ Xoắn · Spiral Snail**
- **Chủng/chất liệu:** ốc sên khổng lồ.
- **Vai:** Pháp sư
- **Hệ VFX:** `doc`
- **Hình khối:** 1,6 m · H/W 1,0 · khoảng âm giữa vỏ và cổ · trục cong.
- **Dấu hiệu:** vỏ xoắn lớn quay khi tích chiêu.
- **Vũ khí/phụ:** hai râu mắt.
- **Di chuyển:** trượt, để vệt nhớt.
- **Bộ chiêu:** vệt nhớt làm chậm; rút vào vỏ miễn sát thương ngắn.
- **Rủi ro:** chậm chạp dễ hài → vỏ khắc địa tầng; không trùng 27 tướng.

### 034 · **Hươu Sao Gạc Đóm · Firefly Stag**
- **Chủng/chất liệu:** hươu sao.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `moc`
- **Hình khối:** 2,1 m kể gạc · H/W 0,8 · khoảng âm giữa nhánh gạc · trục đứng thanh.
- **Dấu hiệu:** gạc phân nhánh rộng treo đom đóm.
- **Vũ khí/phụ:** gạc.
- **Di chuyển:** nhảy nhẹ.
- **Bộ chiêu:** gạc nở hoa hồi máu, húc hất.
- **Rủi ro:** Lillia → không nữ hươu nhút nhát, không cành hoa cầm tay.

### 035 · **Cá Chép Vượt Vũ Môn · Carp Ascendant**
- **Chủng/chất liệu:** cá chép đang hóa rồng.
- **Vai:** Pháp sư
- **Hệ VFX:** `thuy`
- **Hình khối:** 1,9 m · H/W 0,6 · khoảng âm cong đuôi · trục chữ S.
- **Dấu hiệu:** vảy vàng cam to, râu rồng mới mọc.
- **Vũ khí/phụ:** cầu nước.
- **Di chuyển:** bơi trong không khí.
- **Bộ chiêu:** lướt ngược thác; mỗi bậc chiêu thêm nét rồng.
- **Rủi ro:** trùng long thú Kha Tàn → giữ cá chép làm chủ thể, rồng chỉ là râu.

### 036 · **Cóc Gọi Mưa · Rain Toad**
- **Chủng/chất liệu:** cóc (gợi tích Cóc kiện trời).
- **Vai:** Hỗ trợ
- **Hệ VFX:** `loi`
- **Hình khối:** 1,3 m · H/W 1,2 · khoảng âm giữa chân sau · trục ngồi xổm.
- **Dấu hiệu:** túi kêu phồng sáng dưới cằm.
- **Vũ khí/phụ:** lưỡi dài.
- **Di chuyển:** nhảy.
- **Bộ chiêu:** kêu gọi mưa sấm hồi máu đồng minh, lưỡi kéo đồng minh về.
- **Rủi ro:** Tahm Kench → cấm nuốt, cấm mũ quý ông; ít nhất một tướng Việt cổ mềm mại.

### 037 · **Tê Tê Vảy Ngói · Tiled Pangolin**
- **Chủng/chất liệu:** tê tê.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `thach`
- **Hình khối:** 1,5 m · H/W 0,8 · khoảng âm dưới đuôi · trục khom.
- **Dấu hiệu:** vảy xếp như ngói âm dương.
- **Vũ khí/phụ:** móng đào, đuôi vảy.
- **Di chuyển:** bốn chân, đào đất.
- **Bộ chiêu:** đào lên dưới chân địch, xòe vảy bắn; cuộn chỉ ở R.
- **Rủi ro:** Rammus/Pangolier (lăn cuộn) → lăn không là chiêu chính, không gai, không kiếm.

### 038 · **Vượn Má Trắng · Gibbon Acrobat**
- **Chủng/chất liệu:** vượn đen má trắng.
- **Vai:** Sát thủ
- **Hệ VFX:** `phong`
- **Hình khối:** 1,5 m, sải tay 2,4 m · H/W 0,6 · khoảng âm hai tay chạm đất · trục cong.
- **Dấu hiệu:** tay dài quá đầu gối, má trắng.
- **Vũ khí/phụ:** dây mây.
- **Di chuyển:** đu, chống tay bật.
- **Bộ chiêu:** đu vòng quanh mục tiêu, tiếng hú gây sợ.
- **Rủi ro:** Wukong/Ngộ Không/Monkey King → cấm gậy, phân thân, mũ vàng.

### 039 · **Tê Giác Một Sừng · Javan Rhino**
- **Chủng/chất liệu:** tê giác Java (ký ức loài đã mất).
- **Vai:** Đỡ đòn
- **Hệ VFX:** `quang`
- **Hình khối:** 2,2 m · H/W 1,5 · khoảng âm giữa chân trước · trục lao.
- **Dấu hiệu:** một chiếc sừng nứt phát sáng.
- **Vũ khí/phụ:** da gấp nếp như giáp.
- **Di chuyển:** chạy đà dài.
- **Bộ chiêu:** lao càng xa càng đau, giẫm làm rung đất.
- **Rủi ro:** không giáp kim loại kiểu chiến binh tê giác; trùng mức nặng nề Thạch Hộ.

### 040 · **Thỏ Ngọc Giã Thuốc · Jade Rabbit**
- **Chủng/chất liệu:** thỏ trắng.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `thanh`
- **Hình khối:** 1,1 m + tai 0,4 m · H/W 0,7 · khoảng âm giữa hai tai · trục thẳng nhỏ.
- **Dấu hiệu:** chày giã thuốc to hơn thân.
- **Vũ khí/phụ:** cối và chày.
- **Di chuyển:** nhảy.
- **Bộ chiêu:** giã thuốc thành vùng hồi, ném viên thuốc.
- **Rủi ro:** Aurora → không cô gái tai thỏ; nhỏ dễ khuất → viền phe dày.

## E · Linh thảo & nấm

### 041 · **Cây Đa Đầu Làng · Banyan Elder**
- **Chủng/chất liệu:** cây đa cổ.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `moc`
- **Hình khối:** 2,8 m · H/W 1,3 · khoảng âm giữa rèm rễ phụ · trục to dưới.
- **Dấu hiệu:** rễ phụ thõng như rèm từ hai cánh tay.
- **Vũ khí/phụ:** rễ làm roi.
- **Di chuyển:** rễ bò.
- **Bộ chiêu:** cắm rễ thành chỗ trú cho đồng minh, rễ quấn trói.
- **Rủi ro:** Maokai/Treant/Ivern → mặt là hốc gỗ nhỏ, không mặt người khắc; trùng Lộc Thảo → chọn một.

### 042 · **Linh Sen Hồ · Lotus Dancer**
- **Chủng/chất liệu:** sen hồng.
- **Vai:** Pháp sư
- **Hệ VFX:** `thanh`
- **Hình khối:** 1,75 m · H/W 0,6 · khoảng âm dưới lá sen · trục mảnh.
- **Dấu hiệu:** lá sen lớn ngửa như nón trên đầu.
- **Vũ khí/phụ:** tay búp sen.
- **Di chuyển:** lướt trên mặt nước tự sinh.
- **Bộ chiêu:** nở sen nổ hạt; gương sen bắn ra.
- **Rủi ro:** trùng mềm mại Hương Mai → đổi gam hồng-xanh lá.

### 043 · **Tre Đằng Ngà · Bamboo Lancer**
- **Chủng/chất liệu:** tre ngà.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `moc`
- **Hình khối:** 2,3 m · H/W 0,4 · khoảng âm giữa thân và giáo · trục cong như tre uốn.
- **Dấu hiệu:** đầu ngọn tre xòe lá.
- **Vũ khí/phụ:** ngọn tre vót làm giáo (gợi Gióng nhổ tre).
- **Di chuyển:** bật như cần tre.
- **Bộ chiêu:** uốn tích lực rồi búng lao, mọc cụm tre chắn.
- **Rủi ro:** quá mảnh ở 20 m → lá xòe là bắt buộc.

### 044 · **Nấm Đèn Rừng Sâu · Glowcap**
- **Chủng/chất liệu:** nấm phát quang.
- **Vai:** Pháp sư
- **Hệ VFX:** `doc`
- **Hình khối:** 1,4 m · H/W 1,0 (mũ rộng) · khoảng âm dưới mũ · trục chân ngắn.
- **Dấu hiệu:** mũ nấm phát sáng tím-lục rủ tua.
- **Vũ khí/phụ:** không tay.
- **Di chuyển:** nảy lạch bạch.
- **Bộ chiêu:** vùng sương bào tử gây ảo giác, nổ chậm.
- **Rủi ro:** Teemo → cấm bẫy nấm vô hình; trùng 050 → chọn một.

### 045 · **Lồng Dây Bìm · Morning Vine**
- **Chủng/chất liệu:** dây bìm bìm quấn thành lồng người.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `moc`
- **Hình khối:** 1,8 m · H/W 0,7 · thân là lồng rỗng nhìn xuyên · trục thẳng.
- **Dấu hiệu:** hoa tím nở bung khi đánh.
- **Vũ khí/phụ:** roi dây.
- **Di chuyển:** trườn theo vách.
- **Bộ chiêu:** quăng dây kéo đồng minh, quấn trói địch.
- **Rủi ro:** Zyra/Ivern → không nữ thực vật gợi cảm; lồng rỗng là khóa.

### 046 · **Người Thanh Long · Dragonfruit Brawler**
- **Chủng/chất liệu:** cây thanh long (xương rồng bản địa).
- **Vai:** Đấu sĩ
- **Hệ VFX:** `huyet`
- **Hình khối:** 1,9 m · H/W 1,1 · khoảng âm hai tay chữ U · trục đứng.
- **Dấu hiệu:** quả thanh long đỏ hồng trên vai.
- **Vũ khí/phụ:** cành gai ba cạnh.
- **Di chuyển:** lắc lư, nện bước.
- **Bộ chiêu:** bị đánh bắn gai; ném quả nổ ruột đốm.
- **Rủi ro:** phản sát thương trùng Nanh Núi → giữ gai là chất phụ.

### 047 · **Linh Rêu Đá · Mosscloak**
- **Chủng/chất liệu:** áo rêu dày phủ đá.
- **Vai:** Sát thủ
- **Hệ VFX:** `moc`
- **Hình khối:** 1,6 m · H/W 0,8 · khoảng âm gần như không (cố ý khối) · trục gù.
- **Dấu hiệu:** chỉ hai mắt vàng trong khối rêu.
- **Vũ khí/phụ:** dao đá.
- **Di chuyển:** bò sát vách, đứng im hóa tảng.
- **Bộ chiêu:** nằm im thành tảng rêu rồi vồ.
- **Rủi ro:** khó đọc trên điện thoại; trùng 001/Nanh Núi.

### 048 · **Hoa Gạo Tháng Ba · Kapok Bloom**
- **Chủng/chất liệu:** cây gạo trụi lá.
- **Vai:** Xạ thủ
- **Hệ VFX:** `hoa`
- **Hình khối:** 1,8 m · H/W 0,7 · khe giữa cành khô · trục chĩa nhánh.
- **Dấu hiệu:** cành trơ đầy hoa đỏ rực.
- **Vũ khí/phụ:** hoa bắn như tên.
- **Di chuyển:** bước đi, hoa rụng thành vệt.
- **Bộ chiêu:** hoa đỏ bắn cháy, bông gạo trôi làm chậm.
- **Rủi ro:** đỏ dễ nhầm `huyet` → giữ bông trắng tương phản.

### 049 · **Rễ Ngầm · Rootcrawler**
- **Chủng/chất liệu:** chỉ có rễ quanh củ lõi.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `thach`
- **Hình khối:** 1,7 m, tỏa 2,4 m · H/W 0,7 · khoảng âm giữa các rễ chân · trục củ.
- **Dấu hiệu:** chùm rễ như chân nhện quanh củ.
- **Vũ khí/phụ:** rễ đâm.
- **Di chuyển:** bò bằng rễ, chui đất.
- **Bộ chiêu:** chui ngầm, rễ đâm lên dưới chân địch.
- **Rủi ro:** trùng Lộc Thảo và 041; Rek'Sai → không đào hầm.

### 050 · **Mây Bào Tử · Sporecloud**
- **Chủng/chất liệu:** đám bào tử quanh lõi nấm nhỏ.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `doc`
- **Hình khối:** 1,5 m · H/W 1,2 · đường bao mờ, lõi đặc · trục tròn.
- **Dấu hiệu:** quả cầu phồng-xẹp theo nhịp thở.
- **Vũ khí/phụ:** không.
- **Di chuyển:** trôi.
- **Bộ chiêu:** nổ bào tử: địch trúng độc, đồng minh hít được hồi.
- **Rủi ro:** đường bao mờ khó click → điểm neo đặc ở lõi.

## F · Vật liệu kỳ dị

### 051 · **Người Cao Su · Latex Kin**
- **Chủng/chất liệu:** nhựa mủ cao su đông.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `moc`
- **Hình khối:** 1,8 m, giãn tới 3 m · H/W 0,6 · khoảng âm khi tay kéo dài · trục đàn hồi.
- **Dấu hiệu:** vết cạo mủ xoắn quanh thân, chén hứng mủ ở hông.
- **Vũ khí/phụ:** nắm tay giãn.
- **Di chuyển:** nảy bật.
- **Bộ chiêu:** giãn tay chộp xa, bật nảy khỏi tường.
- **Rủi ro:** Luffy (One Piece)/Zac → cấm đấm liên hoàn kiểu Gomu, cấm thân xanh dẻo; khóa vết cạo + chén.

### 052 · **Người Sơn Mài · Lacquerkin**
- **Chủng/chất liệu:** sơn mài đen-son, khảm vỏ trứng.
- **Vai:** Sát thủ
- **Hệ VFX:** `huyet`
- **Hình khối:** 1,7 m · H/W 0,5 · khoảng âm giữa hai lưỡi · trục nghiêng.
- **Dấu hiệu:** thân bóng như gương đen, đốm vỏ trứng trắng.
- **Vũ khí/phụ:** hai lưỡi mỏng sơn son.
- **Di chuyển:** trượt bóng.
- **Bộ chiêu:** phủ lớp sơn ẩn; chí mạng "mài" lộ vàng.
- **Rủi ro:** trùng Mặc Liên (đen-đỏ) → không nét cọ, thân cứng bóng.

### 053 · **Người Giấy Dó · Dó Cutout**
- **Chủng/chất liệu:** giấy dó cắt.
- **Vai:** Pháp sư
- **Hệ VFX:** `phong`
- **Hình khối:** 1,8 m · H/W 0,7, dày 2 cm · khoảng âm hoa văn cắt · trục phẳng.
- **Dấu hiệu:** thân phẳng như hình cắt, xoay cạnh gần biến mất.
- **Vũ khí/phụ:** tờ giấy bay.
- **Di chuyển:** bay phấp phới.
- **Bộ chiêu:** gấp mình thành chim, khiên, giáo.
- **Rủi ro:** origami Nhật → giấy dó, hoa văn cắt Việt; xoay cạnh khó đọc → giữ viền phe.

### 054 · **Người Sáp Nến · Waxwick**
- **Chủng/chất liệu:** sáp ong đang chảy.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `hoa`
- **Hình khối:** 1,6 m · H/W 0,6 · khoảng âm giữa giọt sáp · trục chảy xuống.
- **Dấu hiệu:** bấc cháy trên đỉnh đầu.
- **Vũ khí/phụ:** đĩa nến.
- **Di chuyển:** trượt, để vệt sáp.
- **Bộ chiêu:** thắp lửa sưởi đồng minh, sáp đông trói chân.
- **Rủi ro:** Thresh/Mị Đăng (đèn) → nến là thân, không đèn cầm tay.

### 055 · **Bình Gốm Men Lam · Glazed Potter**
- **Chủng/chất liệu:** gốm men lam, nối bạc.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thuy`
- **Hình khối:** 2,0 m · H/W 1,0 · thân bình phình, cổ hẹp · trục đứng.
- **Dấu hiệu:** hoa văn men lam trên nền trắng.
- **Vũ khí/phụ:** vò gốm làm khiên.
- **Di chuyển:** bước nặng, lanh canh.
- **Bộ chiêu:** vỡ mảnh bắn ra, ghép lại hồi giáp.
- **Rủi ro:** trùng 018 → nối bạc thay vàng.

### 056 · **Linh Lụa · Silkwraith**
- **Chủng/chất liệu:** áo lụa rỗng.
- **Vai:** Sát thủ
- **Hệ VFX:** `nguyet`
- **Hình khối:** 1,8 m, dải lụa 6 m · H/W 0,5 · thân rỗng · trục xoắn.
- **Dấu hiệu:** dải lụa màu rất dài bay sau.
- **Vũ khí/phụ:** dải lụa là roi.
- **Di chuyển:** bay lượn.
- **Bộ chiêu:** lụa quấn kéo, xé lụa thành ảo ảnh.
- **Rủi ro:** Amumu (băng vải), Vân Dao (dải khí) → lụa màu, không xác ướp.

### 057 · **Linh Khói Hương · Incense Wisp**
- **Chủng/chất liệu:** khói nhang.
- **Vai:** Pháp sư
- **Hệ VFX:** `am`
- **Hình khối:** 1,9 m · H/W 0,5 · thân xoắn khói · trục cong.
- **Dấu hiệu:** ba que nhang cháy cắm sau lưng.
- **Vũ khí/phụ:** không.
- **Di chuyển:** trôi.
- **Bộ chiêu:** khói che; ai hít khói thấy ký ức (đảo hướng).
- **Rủi ro:** tín ngưỡng thờ cúng nhạy cảm → không bàn thờ, ảnh, bát hương thật; trùng lư Hỏa Tủy.

### 058 · **Người Dây Thừng · Ropebound**
- **Chủng/chất liệu:** thừng đay bện.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thach`
- **Hình khối:** 2,0 m · H/W 0,9 · khoảng âm giữa vòng thừng · trục cuộn.
- **Dấu hiệu:** nút buộc lớn giữa ngực.
- **Vũ khí/phụ:** thừng có neo.
- **Di chuyển:** tháo cuộn lăn.
- **Bộ chiêu:** ném thừng trói hai mục tiêu, kéo co.
- **Rủi ro:** trùng nặng Cốt Bện (cáp bện) → chọn một.

### 059 · **Người Thạch Nhiều Lớp · Layered Jelly**
- **Chủng/chất liệu:** thạch rau câu nhiều tầng màu.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `thanh`
- **Hình khối:** 1,5 m · H/W 0,9 · trong mờ · trục lắc lư.
- **Dấu hiệu:** các tầng màu xếp chồng.
- **Vũ khí/phụ:** không.
- **Di chuyển:** nảy.
- **Bộ chiêu:** tách một tầng làm khiên cho đồng minh, nuốt đạn.
- **Rủi ro:** Zac → không xanh lá, không tách mảnh nhảy; tông dễ hài.

### 060 · **Người Thủy Ngân · Quicksilver**
- **Chủng/chất liệu:** kim loại lỏng.
- **Vai:** Sát thủ
- **Hệ VFX:** `bang`
- **Hình khối:** 1,8 m · H/W 0,5 · khoảng âm khi tay chảy · trục chảy.
- **Dấu hiệu:** thân gương lỏng, giọt rơi ngược lên.
- **Vũ khí/phụ:** tay chảy thành lưỡi.
- **Di chuyển:** tan thành vũng rồi dựng lại.
- **Bộ chiêu:** lướt dạng vũng, bắt chước dáng địch.
- **Rủi ro:** Morphling/T-1000 → không hóa sóng; trùng Bách Diện (đổi bóng).

## G · Cổ máy & tạo tác

### 061 · **Đồng Hồ Nước Khắc Lậu · Clepsydra**
- **Chủng/chất liệu:** ba bình gốm-đồng nhỏ giọt.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thuy`
- **Hình khối:** 2,2 m · H/W 0,8 · khe giữa ba tầng bình · trục bậc thang.
- **Dấu hiệu:** ba bình xếp tầng nhỏ giọt.
- **Vũ khí/phụ:** cánh tay gáo.
- **Di chuyển:** bước đều.
- **Bộ chiêu:** đếm giọt; bình dưới đầy thì phát xung choáng.
- **Rủi ro:** Zilean/Orianna/Clockwerk → không bánh răng; trùng thời gian Sa Tẫn.

### 062 · **Trống Đồng Sống · Living Drum**
- **Chủng/chất liệu:** trống đồng có chân.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `quang`
- **Hình khối:** 1,6 m · H/W 1,3 · khoảng âm giữa chân · trục tròn.
- **Dấu hiệu:** mặt trống ngôi sao giữa, quay về camera.
- **Vũ khí/phụ:** dùi.
- **Di chuyển:** lăn nghiêng như bánh xe.
- **Bộ chiêu:** nhịp trống tăng tốc đồng minh, dồn trống thành sóng chấn.
- **Rủi ro:** Đông Sơn chỉ là điểm nhấn → đây là tướng Đông Sơn duy nhất được phép; không tượng cóc (để 036).

### 063 · **Con Rối Nước · Water Puppet**
- **Chủng/chất liệu:** gỗ sung sơn.
- **Vai:** Pháp sư
- **Hệ VFX:** `thuy`
- **Hình khối:** 1,4 m + sào 2 m · H/W 0,6 · khoảng âm dưới sào · trục nghiêng.
- **Dấu hiệu:** sào dài sau lưng chìm xuống vũng nước.
- **Vũ khí/phụ:** quạt gỗ.
- **Di chuyển:** trượt trên vũng tự sinh.
- **Bộ chiêu:** "tay điều khiển" vô hình giật lướt đột ngột.
- **Rủi ro:** Orianna/Shaco → không hề, không bánh răng; không dùng nguyên mặt chú Tễu.

### 064 · **Tượng Hộ Lăng · Tomb Guardian**
- **Chủng/chất liệu:** tượng đá quan võ.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thach`
- **Hình khối:** 2,5 m · H/W 0,9 · khoảng âm hai tay chắp · trục thẳng cứng.
- **Dấu hiệu:** tượng chắp tay cầm hốt, mặt mòn.
- **Vũ khí/phụ:** hốt đá.
- **Di chuyển:** trượt không nhấc chân.
- **Bộ chiêu:** hóa đá miễn khống chế, dậm hốt.
- **Rủi ro:** Galio → không cánh; trùng 013.

### 065 · **Giáp Lá Rỗng · Hollow Scale-Armor**
- **Chủng/chất liệu:** giáp lá sắt mỏng, không người.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `am`
- **Hình khối:** 2,1 m · H/W 0,9 · khe giữa mảnh giáp lơ lửng · trục thẳng.
- **Dấu hiệu:** mũ trụ nhìn xuyên, khói tím trong khe.
- **Vũ khí/phụ:** đại đao.
- **Di chuyển:** các mảnh giáp tách rời, bước rời rạc.
- **Bộ chiêu:** bắn mảnh giáp đi rồi gọi về.
- **Rủi ro:** Mordekaiser/Nautilus → rất dễ copy: cấm giáp gai nặng, chùy; giáp mỏng lộ khoảng trống.

### 066 · **Đèn Kéo Quân · Shadow Carousel**
- **Chủng/chất liệu:** đèn lục giác giấy-tre.
- **Vai:** Pháp sư
- **Hệ VFX:** `nguyet`
- **Hình khối:** 1,7 m · H/W 0,7 · thân đèn rỗng · trục đứng.
- **Dấu hiệu:** bóng chiến binh xoay vòng quanh thân.
- **Vũ khí/phụ:** không tay.
- **Di chuyển:** trôi.
- **Bộ chiêu:** chiếu bóng ra thành lính bóng đánh hộ.
- **Rủi ro:** Thresh/Mị Đăng → đèn là thân, không cầm.

### 067 · **Ấm Đất Pha Trà · Clay Teapot**
- **Chủng/chất liệu:** ấm đất nung.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `thanh`
- **Hình khối:** 1,2 m · H/W 1,1 · khoảng âm quai ấm · trục tròn.
- **Dấu hiệu:** vòi ấm bốc hơi làm mũi.
- **Vũ khí/phụ:** chén bay.
- **Di chuyển:** lạch bạch.
- **Bộ chiêu:** rót trà hồi máu, hơi nóng làm mờ địch.
- **Rủi ro:** tông hài, nhỏ → vẽ cổ kính, viền dày.

### 068 · **Chiêng Đại Ngàn · Gong Warden**
- **Chủng/chất liệu:** chiêng đồng thành thân-khiên.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `loi`
- **Hình khối:** 2,0 m, chiêng 1,4 m · H/W 0,8 · khoảng âm giữa chiêng và tay · trục đứng.
- **Dấu hiệu:** mặt chiêng có núm giữa.
- **Vũ khí/phụ:** dùi gỗ.
- **Di chuyển:** bước trầm.
- **Bộ chiêu:** đánh chiêng sóng âm choáng; khiên chiêng dội đòn.
- **Rủi ro:** di sản cồng chiêng → không chép trang phục dân tộc thật.

### 069 · **Cối Xay Thóc · Millstone**
- **Chủng/chất liệu:** cối tre-đất.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `thach`
- **Hình khối:** 1,8 m · H/W 1,2 · khe giữa hai thớt · trục tròn.
- **Dấu hiệu:** hai thớt cối chồng thay thân trên.
- **Vũ khí/phụ:** tay cối.
- **Di chuyển:** thân trên xoay khi đi.
- **Bộ chiêu:** xoay nghiền liên tục, càng lâu càng nhanh.
- **Rủi ro:** Garen/Juggernaut (xoay) → xoay là cối, không kiếm.

### 070 · **Bù Nhìn Rơm · Strawman**
- **Chủng/chất liệu:** rơm, áo tơi.
- **Vai:** Sát thủ
- **Hệ VFX:** `hoa`
- **Hình khối:** 1,9 m · H/W 0,9 · khoảng âm hai tay thanh ngang · trục chữ thập.
- **Dấu hiệu:** nón mê rách, áo tơi.
- **Vũ khí/phụ:** liềm.
- **Di chuyển:** nhảy cọc một chân.
- **Bộ chiêu:** rơm bốc cháy, châu chấu bay quấy.
- **Rủi ro:** Fiddlesticks → cấm quạ và hoảng sợ; dùng rơm cháy.

## H · Linh hồn & bóng

### 071 · **Bóng Ma Bến Sông · River Wraith**
- **Chủng/chất liệu:** hồn nước.
- **Vai:** Pháp sư
- **Hệ VFX:** `am`
- **Hình khối:** 1,7 m · H/W 0,5 · chân mờ · trục cong.
- **Dấu hiệu:** tóc dài ướt rủ che mặt.
- **Vũ khí/phụ:** không.
- **Di chuyển:** trôi sát mặt đất.
- **Bộ chiêu:** kéo chân xuống nước (trói), lặn xuyên.
- **Rủi ro:** Sadako kinh dị rẻ → giữ painterly; trùng Mị Đăng.

### 072 · **Ký Ức Vỡ · Shardmemory**
- **Chủng/chất liệu:** mảnh hình chiếu Tinh Thạch.
- **Vai:** Pháp sư
- **Hệ VFX:** `nguyet`
- **Hình khối:** 1,8 m · H/W 0,7 · khe giữa các mảnh · trục đứng.
- **Dấu hiệu:** thân ghép mảnh, mỗi mảnh chiếu cảnh khác.
- **Vũ khí/phụ:** mảnh bay.
- **Di chuyển:** nhảy hình, glitch.
- **Bộ chiêu:** tua lại vị trí, mảnh chiếu chém.
- **Rủi ro:** Ekko, Sa Tẫn (tua) → chỉ tua vị trí ngắn; trùng Kính Ngôn.

### 073 · **Bầy Đom Đóm · Firefly Swarm**
- **Chủng/chất liệu:** bầy đom đóm thành hình người.
- **Vai:** Xạ thủ
- **Hệ VFX:** `quang`
- **Hình khối:** 1,7 m · H/W 0,6 · thân thưa · lõi đặc ở ngực.
- **Dấu hiệu:** đám chấm vàng-lục nhấp nháy.
- **Vũ khí/phụ:** đom đóm bắn.
- **Di chuyển:** tản ra rồi tụ lại.
- **Bộ chiêu:** đom đóm bay ra đánh dấu, tụ thành tia.
- **Rủi ro:** perf hạt trên điện thoại → giữ dưới ngân sách fx; khó click → neo ở lõi.

### 074 · **Tiếng Vọng · Echo**
- **Chủng/chất liệu:** sóng âm hữu hình.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `phong`
- **Hình khối:** 1,6 m · H/W 0,8 · vòng sóng mở · trục đứng.
- **Dấu hiệu:** không mặt, miệng lớn ở ngực.
- **Vũ khí/phụ:** vòng sóng.
- **Di chuyển:** trôi.
- **Bộ chiêu:** vọng lại chiêu vừa dùng của đồng minh, yếu hơn.
- **Rủi ro:** trùng R sao chép Kính Ngôn → chỉ vọng đồng minh, không mượn địch.

### 075 · **Sao Rơi · Fallen Star**
- **Chủng/chất liệu:** thiên thạch nhỏ có tay.
- **Vai:** Sát thủ
- **Hệ VFX:** `quang`
- **Hình khối:** 1,5 m · H/W 0,9 · đuôi sáng · trục lao chéo.
- **Dấu hiệu:** vệt đuôi sao kéo sau lưng.
- **Vũ khí/phụ:** móng đá cháy.
- **Di chuyển:** lao xuống từ trên.
- **Bộ chiêu:** rơi xuống điểm, nảy lên lại.
- **Rủi ro:** Aurelion Sol/Zoe; Lam Nghi (sao), Hỏa Tủy (thiên thạch) → chọn một.

### 076 · **Nguyệt Thực · Eclipse**
- **Chủng/chất liệu:** vầng đen viền lửa.
- **Vai:** Pháp sư
- **Hệ VFX:** `am`
- **Hình khối:** 1,9 m · H/W 0,7 · đầu là vòng rỗng · trục thẳng.
- **Dấu hiệu:** vầng đen viền sáng thay đầu.
- **Vũ khí/phụ:** không.
- **Di chuyển:** trôi.
- **Bộ chiêu:** che sáng làm mù một vùng.
- **Rủi ro:** trùng motif nhật thực của Hỏa Tủy → một trong hai bỏ.

### 077 · **Hư Vô · Hollowform**
- **Chủng/chất liệu:** lỗ hổng hình người.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `am`
- **Hình khối:** 2,0 m · H/W 0,9 · cả thân là khoảng âm · trục đứng.
- **Dấu hiệu:** đường cắt trong không gian thấy trời sao.
- **Vũ khí/phụ:** không.
- **Di chuyển:** trượt.
- **Bộ chiêu:** nuốt đạn, nhả lại thành xung.
- **Rủi ro:** Void LoL/Enigma → không tím chitin, không côn trùng.

### 078 · **Người Mộng · Dreamwalker**
- **Chủng/chất liệu:** người ngủ trên gối mây.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `nguyet`
- **Hình khối:** 1,6 m nằm ngang · H/W 0,5 · khoảng âm dưới gối · trục ngang.
- **Dấu hiệu:** bay nằm ngang, bong bóng mộng.
- **Vũ khí/phụ:** bong bóng.
- **Di chuyển:** trôi ngủ.
- **Bộ chiêu:** ru ngủ địch, bong bóng che đồng minh.
- **Rủi ro:** Lillia (ngủ), Nami (bong bóng) → chọn một chất.

### 079 · **Linh Cờ Trận · Banner Spirit**
- **Chủng/chất liệu:** lá cờ trận rách có hồn.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `phong`
- **Hình khối:** 2,4 m kể cán · H/W 0,6 · khoảng âm lỗ thủng cờ · trục cán.
- **Dấu hiệu:** lá cờ rách bay ngang.
- **Vũ khí/phụ:** cán cờ.
- **Di chuyển:** bay theo gió.
- **Bộ chiêu:** cắm cờ tạo vùng tăng sức, giật cờ kéo quân.
- **Rủi ro:** J4 (cắm cờ) → không người cầm cờ, cờ là thân.

### 080 · **Bóng Đổ · Cast Shadow**
- **Chủng/chất liệu:** bóng phẳng.
- **Vai:** Sát thủ
- **Hệ VFX:** `am`
- **Hình khối:** 1,8 m khi dựng · H/W 0,5 · trục nằm.
- **Dấu hiệu:** vệt bóng dài trên đất, không thân.
- **Vũ khí/phụ:** móng bóng.
- **Di chuyển:** trườn trên mặt đất.
- **Bộ chiêu:** chui vào bóng đồng minh/trụ, dựng lên đâm.
- **Rủi ro:** Nocturne/Shadow Fiend; trùng Mị Đăng; phẳng khó click → viền phe + điểm neo.

## I · Quái & thủy quái

### 081 · **Thuồng Luồng Con · Young Thuong Luong**
- **Chủng/chất liệu:** thủy quái rắn-cá sấu.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `thuy`
- **Hình khối:** dựng 2,0 m, dài 4 m · H/W 0,5 · khoảng âm vòng cuộn · trục S.
- **Dấu hiệu:** mào vây dọc lưng.
- **Vũ khí/phụ:** đuôi.
- **Di chuyển:** trườn.
- **Bộ chiêu:** cuộn siết, kéo xuống nước.
- **Rủi ro:** trùng quái Thuồng Luồng ở map (art/thuong-luong), Kha Tàn, Hàn Chi → chỉ chọn nếu quái map đổi hình.

### 082 · **Cá Ông Nam Hải · Whale Lord**
- **Chủng/chất liệu:** cá voi thần (tín ngưỡng ngư dân).
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thuy`
- **Hình khối:** 2,4 m · H/W 1,7 · khoảng âm dưới vây · trục cong.
- **Dấu hiệu:** lưng cá voi đứng, vòi phun nước.
- **Vũ khí/phụ:** vây ngực.
- **Di chuyển:** bước vây, lướt như sóng.
- **Bộ chiêu:** nâng sóng cứu đồng minh, đập bụng tạo sóng chấn.
- **Rủi ro:** tín ngưỡng → vẻ trang nghiêm; Tidehunter → không cá người lùn.

### 083 · **Cua Đồng Một Càng · Lopsided Crab**
- **Chủng/chất liệu:** cua khổng lồ.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `thach`
- **Hình khối:** cao 1,4 m, rộng 2,6 m · H/W 0,55 · khoảng âm giữa chân · trục ngang.
- **Dấu hiệu:** một càng to gấp ba càng kia.
- **Vũ khí/phụ:** càng lớn.
- **Di chuyển:** đi ngang.
- **Bộ chiêu:** kẹp giữ, lướt ngang.
- **Rủi ro:** rig mười chân; không trùng 27.

### 084 · **Mực Ống Lân Quang · Glow Squid**
- **Chủng/chất liệu:** mực ống khổng lồ.
- **Vai:** Pháp sư
- **Hệ VFX:** `nguyet`
- **Hình khối:** 2,0 m · H/W 0,8 · khoảng âm giữa xúc tu · trục đảo ngược.
- **Dấu hiệu:** đầu tam giác nhọn, xúc tu dưới.
- **Vũ khí/phụ:** hai xúc tu dài.
- **Di chuyển:** phụt phản lực.
- **Bộ chiêu:** phun mực làm mù, xúc tu chộp.
- **Rủi ro:** Illaoi/Kraken; mực trùng Mặc Liên → mực lân quang tím.

### 085 · **Sứa Chuông · Bell Jellyfish**
- **Chủng/chất liệu:** sứa lân quang.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `loi`
- **Hình khối:** 1,8 m (chuông 1 m + tua) · H/W 0,6 · khoảng âm giữa tua · trục treo.
- **Dấu hiệu:** chuông trong đập nhịp.
- **Vũ khí/phụ:** tua dài 2 m.
- **Di chuyển:** trôi nhịp.
- **Bộ chiêu:** tua chích choáng, nhịp sáng hồi máu.
- **Rủi ro:** trong suốt tốn perf; Ngư Đăng (vực sâu) → không đèn lõi.

### 086 · **Rết Núi · Mountain Centipede**
- **Chủng/chất liệu:** rết khổng lồ.
- **Vai:** Đấu sĩ
- **Hệ VFX:** `doc`
- **Hình khối:** ngóc 1,2 m, dài 4 m · H/W 0,3 · khoảng âm dưới thân · trục ngang.
- **Dấu hiệu:** hàng chân đỏ dọc thân dài.
- **Vũ khí/phụ:** hàm kìm.
- **Di chuyển:** bò lượn sóng.
- **Bộ chiêu:** quấn mục tiêu, phun độc.
- **Rủi ro:** rig nhiều đốt → chain procedural; dễ gây ghê.

### 087 · **Nhện Dệt Thổ Cẩm · Loom Spider**
- **Chủng/chất liệu:** nhện.
- **Vai:** Pháp sư
- **Hệ VFX:** `am`
- **Hình khối:** 1,5 m, sải chân 2,8 m · H/W 0,55 · khoảng âm giữa chân · trục thấp.
- **Dấu hiệu:** bụng mang hoa văn dệt.
- **Vũ khí/phụ:** tơ.
- **Di chuyển:** bò, đu tơ.
- **Bộ chiêu:** giăng lưới vùng, kéo mục tiêu.
- **Rủi ro:** Elise/Broodmother/Weaver → không nữ-nhện, không bầy con; hoa văn không chép thổ cẩm tộc cụ thể.

### 088 · **Dơi Quạ Treo Ngược · Fruit Bat**
- **Chủng/chất liệu:** dơi quạ.
- **Vai:** Xạ thủ
- **Hệ VFX:** `am`
- **Hình khối:** 1,6 m, sải 2,6 m · H/W 0,6 · khoảng âm cánh màng · trục ngược khi idle.
- **Dấu hiệu:** đôi tai rất to, treo ngược khi đứng yên.
- **Vũ khí/phụ:** sóng siêu âm.
- **Di chuyển:** bay vỗ.
- **Bộ chiêu:** sóng siêu âm định vị và bắn, hút máu nhẹ.
- **Rủi ro:** Batrider/Night Stalker → không cưỡi, không quỷ.

### 089 · **Sâu Đất Vành Răng · Ringmaw Worm**
- **Chủng/chất liệu:** giun đất khổng lồ.
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thach`
- **Hình khối:** 2,0 m trồi · H/W 0,6 · miệng tròn rỗng · trục cột.
- **Dấu hiệu:** nửa thân trồi khỏi đất, miệng vành răng.
- **Vũ khí/phụ:** miệng.
- **Di chuyển:** chui ngầm.
- **Bộ chiêu:** trồi hất tung, nuốt đất thành giáp.
- **Rủi ro:** Rek'Sai/Cho'Gath/Dune; trùng 007, 049.

### 090 · **Lươn Điện Đầm Lầy · Bog Eel**
- **Chủng/chất liệu:** lươn phát điện.
- **Vai:** Sát thủ
- **Hệ VFX:** `loi`
- **Hình khối:** dựng 1,8 m · H/W 0,3 · khoảng âm vòng thân · trục S.
- **Dấu hiệu:** đốm điện chạy dọc thân trơn.
- **Vũ khí/phụ:** đuôi phóng điện.
- **Di chuyển:** trườn lặn.
- **Bộ chiêu:** lặn bùn, quất điện chuỗi.
- **Rủi ro:** quá mảnh → đầu to hơn; trùng 026/081 hình rắn.

## J · Người phi thường

### 091 · **Khổng Lồ Gánh Núi · Mountain Shoulderer**
- **Chủng/chất liệu:** người khổng lồ (gợi Sơn Tinh).
- **Vai:** Đỡ đòn
- **Hệ VFX:** `thach`
- **Hình khối:** 3,0 m visual · H/W 1,2 · khoảng âm dưới tảng núi · trục còng một vai.
- **Dấu hiệu:** ngọn núi nhỏ có cây trên vai.
- **Vũ khí/phụ:** núi vác.
- **Di chuyển:** bước rung.
- **Bộ chiêu:** đặt núi tạo địa hình chắn.
- **Rủi ro:** Tiny/Sion → không lớn dần; capsule giữ nguyên dù visual to.

### 092 · **Tí Hon Cưỡi Gà Chọi · Cockrider**
- **Chủng/chất liệu:** người tí hon + gà chọi.
- **Vai:** Xạ thủ
- **Hệ VFX:** `hoa`
- **Hình khối:** 1,5 m tổng · H/W 0,8 · khoảng âm giữa chân gà · trục gà chồm.
- **Dấu hiệu:** mào gà đỏ to + nỏ nhỏ.
- **Vũ khí/phụ:** nỏ.
- **Di chuyển:** gà chạy, bay ngắn.
- **Bộ chiêu:** nỏ bắn ba tên, gà mổ lùi.
- **Rủi ro:** Kled/Nunu/Teemo/Snapfire → cưỡi gà chọi là khóa; hai rig.

### 093 · **Song Linh Dính · Twinbound**
- **Chủng/chất liệu:** hai linh chung một thân.
- **Vai:** Pháp sư
- **Hệ VFX:** `nguyet`
- **Hình khối:** 1,8 m · H/W 0,9 · khoảng âm giữa hai đầu · trục chữ Y.
- **Dấu hiệu:** hai đầu, hai bên hai màu.
- **Vũ khí/phụ:** hai tay hai phép.
- **Di chuyển:** bước lệch nhịp.
- **Bộ chiêu:** đổi đầu đổi chất chiêu.
- **Rủi ro:** nhạy cảm dị tật → trình bày thần thoại, không y học; Jakiro, Tam Dấu.

### 094 · **Người Tóc Trói · Hairbinder**
- **Chủng/chất liệu:** người, tóc dài sống.
- **Vai:** Sát thủ
- **Hệ VFX:** `huyet`
- **Hình khối:** 1,7 m, tóc 4 m · H/W 0,5 · khoảng âm vòng tóc · trục thẳng.
- **Dấu hiệu:** mái tóc đen dài tạo vòng quanh thân.
- **Vũ khí/phụ:** tóc làm roi, móc.
- **Di chuyển:** tóc móc kéo.
- **Bộ chiêu:** tóc quấn kéo, treo lên.
- **Rủi ro:** trùng 071 tóc ma → chọn một; tóc rig tốn.

### 095 · **Người Gỗ Trầm · Agarwood Man**
- **Chủng/chất liệu:** gỗ trầm vân nhựa.
- **Vai:** Hỗ trợ
- **Hình khối:** 1,8 m · H/W 0,7 · khe vân gỗ · trục đứng.
- **Hệ VFX:** `thanh`
- **Dấu hiệu:** vân nhựa sẫm, khói thơm bay.
- **Vũ khí/phụ:** gậy trầm.
- **Di chuyển:** bước chậm.
- **Bộ chiêu:** khói trầm hồi, dịu khống chế.
- **Rủi ro:** trùng 057 khói hương → chọn một.

### 096 · **Người Một Chân · One-Legged Spirit**
- **Chủng/chất liệu:** linh một chân (gợi Độc Cước).
- **Vai:** Đấu sĩ
- **Hệ VFX:** `phong`
- **Hình khối:** 2,0 m · H/W 0,6 · khoảng âm một bên dưới · trục lệch.
- **Dấu hiệu:** một chân to, tay vung cân bằng.
- **Vũ khí/phụ:** búa đá.
- **Di chuyển:** nhảy lò cò xa.
- **Bộ chiêu:** nhảy dậm, xoay một chân.
- **Rủi ro:** ít game dùng; tín ngưỡng → không chép tượng thờ.

### 097 · **Người Lai Rồng · Dragonblood**
- **Chủng/chất liệu:** người, vảy rồng nửa mặt (dòng Lạc Long).
- **Vai:** Đấu sĩ
- **Hệ VFX:** `dung`
- **Hình khối:** 1,9 m · H/W 0,8 · khoảng âm sừng · trục thẳng.
- **Dấu hiệu:** vảy nửa thân, sừng một bên.
- **Vũ khí/phụ:** giáo.
- **Di chuyển:** chạy, lướt.
- **Bộ chiêu:** hóa vảy thêm giáp, khè lửa ngắn.
- **Rủi ro:** Shyvana → không biến rồng; trùng Kha Tàn.

### 098 · **Vũ Công Lông Lạc · Lạc Plume Dancer**
- **Chủng/chất liệu:** người hóa trang lông chim, không cánh thật.
- **Vai:** Sát thủ
- **Hệ VFX:** `quang`
- **Hình khối:** 1,8 m + mũ lông 0,6 m · H/W 0,6 · khoảng âm giữa lông · trục xoay.
- **Dấu hiệu:** mũ lông cao dựng.
- **Vũ khí/phụ:** rìu ngắn.
- **Di chuyển:** bước múa.
- **Bộ chiêu:** múa xoay chém, lông bay đánh dấu.
- **Rủi ro:** Hương Mai/Dực Nham chim → không cánh; Đông Sơn → chỉ mũ lông.

### 099 · **Người Cá Bò Cạn · Shore Merfolk**
- **Chủng/chất liệu:** người cá đi bằng đuôi.
- **Vai:** Xạ thủ
- **Hệ VFX:** `thuy`
- **Hình khối:** 1,7 m · H/W 0,6 · khoảng âm cong đuôi · trục lưng.
- **Dấu hiệu:** đuôi cá chống thân như hải cẩu.
- **Vũ khí/phụ:** lao xương cá.
- **Di chuyển:** trườn nảy.
- **Bộ chiêu:** phóng lao xa, lặn vũng né.
- **Rủi ro:** Nami → không nữ tiên cá, không bong bóng.

### 100 · **Nhà Sư Hóa Đá · Petrified Monk**
- **Chủng/chất liệu:** người nửa thân hóa đá rêu.
- **Vai:** Hỗ trợ
- **Hệ VFX:** `thach`
- **Hình khối:** 1,8 m · H/W 0,8 · khoảng âm tay chắp · trục ngồi thiền lơ lửng.
- **Dấu hiệu:** nửa thân đá, nửa thân người.
- **Vũ khí/phụ:** chuỗi hạt đá.
- **Di chuyển:** trôi ngồi.
- **Bộ chiêu:** hóa đá đồng minh, tràng hạt che chắn.
- **Rủi ro:** Lee Sin → không mù, không đá đít; tôn giáo → không tượng Phật thật.

---

## Ghép với 27 tướng hiện có

Bảng này là **đề xuất**, chưa duyệt. "giữ nguyên" = `CURRENT_CANON`; ID in đậm = `VISUAL_REDESIGN_CANDIDATE`, chỉ được làm sau khi qua §Tương thích và creator duyệt bằng ảnh.

| ID | Tạo hình hiện tại | Đề xuất ID | Ghi chú |
|---|---|---|---|
| `moc_lam` | người hộ vệ khiên | **023** | "Người Chắn Bờ" hợp cá sấu gác bến; mái chèo thay khiên. |
| `kha_tan` | long thú dài | giữ nguyên | phụ: 081 nếu muốn thủy quái. |
| `hao_nhat` | người cao giáp vòng | `CURRENT_CANON` (khóa) | đang production; 013 về `NEW_HERO_CONCEPT`. |
| `tinh_loi` | võ giả bốn tay | **002** | người sấm; bỏ bốn tay để khỏi trùng Trắc Nham. |
| `mi_dang` | bóng mặt nạ đèn | giữ nguyên | — |
| `lam_nghi` | dị chủng cổ dài | giữ nguyên, 034 | hươu gạc sao nếu cần thú. |
| `van_dao` | thân khí cao | giữ nguyên | — |
| `nham_vu` | thợ săn người | **092**, 088 | cưỡi gà chọi giữ cung/nỏ và lùi bắn. |
| `loc_thao` | rễ-cành | giữ nguyên, 048 | — |
| `ngu_dang` | dị chủng vực sâu | giữ nguyên, 082 | — |
| `cot_ben` | khổng thể bện | giữ nguyên, 051 | cao su giãn hợp móc kéo. |
| `hoa_tuy` | lõi dung nham | giữ nguyên | chặn 009/020/076 trùng. |
| `sam_kha` | ram sấm | giữ nguyên | — |
| `duc_nham` | chim panel | giữ nguyên | — |
| `bach_dien` | vòng mặt nạ | giữ nguyên | — |
| `nanh_nui` | thú đá dựng | **025**, 039 | gấu ngựa phản công. |
| `kinh_ngon` | lõi gương | giữ nguyên, 011 | — |
| `mac_lien` | nét mực | giữ nguyên | — |
| `tam_vu` | chân dài | giữ nguyên, 006 | — |
| `han_chi` | naga băng | giữ nguyên | — |
| `tam_dau` | ba lõi | giữ nguyên | — |
| `thach_ho` | rùa | giữ nguyên | — |
| `trac_nham` | lõi đá tay rời | giữ nguyên, 001 | — |
| `sac_nhien` | pigment người | **059**, 052 | thạch nhiều tầng màu = pha màu. |
| `huong_mai` | thần điểu | giữ nguyên | — |
| `sa_tan` | thân cát | giữ nguyên | — |
| `van_an` | kiếm sĩ người | **021** | hổ vằn mực: nhảy bổ = vồ. |

Nếu mọi đề xuất được duyệt, roster sẽ thêm hổ (Vân Ấn), cá sấu (Mộc Lẫm), gấu (Nanh Núi), người sấm (Tĩnh Lôi). Chưa có kiểm chứng số tướng người thường: phải render và kiểm đủ 27 silhouette (§Ma trận) mới được kết luận.

## Tương thích (bắt buộc cho mỗi VISUAL_REDESIGN_CANDIDATE)

| Kiểm | Câu hỏi | Bằng chứng |
|---|---|---|
| Animation | clip hiện có còn đúng với thân mới? đổi rig = làm lại cả 5 chiêu + chết | proof sheet + audit.py |
| Vũ khí | grips/weapons hiện tại còn cầm được? | ảnh engine |
| Hitbox / capsule | thân mới có lệch capsule hiện tại (bò ngang, dài 3 m)? | so bounds với capsule |
| Gốc chiêu | đạn/tia đi ra từ đâu (tay, mõm, lưng)? khớp tooltip? | ảnh frame chiêu |
| VFX | hệ PAL giữ hay đổi; chồng hệ với tướng khác? | vfx-audit |
| Camera | đọc được ở camera khóa, ảnh xám 64 px, đứng lẫn 5 tướng, VFX bật/tắt | ảnh lineup |

Đổi người → thú bốn chân, sinh vật không chân hay đa chi luôn kèm đánh giá chi phí rig/animation riêng (số xương, clip phải làm lại, rủi ro trượt chân).

## Hướng dẫn đa dạng

Đây là **mục tiêu**, không phải trần cứng; chỉ thành luật khi có lý do gameplay hoặc performance được chứng minh.

1. Roster nên có nhiều chủng: thú, nguyên tố, khoáng, thực vật, tạo tác, linh hồn, người phi thường. Người thường vẫn được, miễn silhouette khác hẳn.
2. Mỗi vai nên có ≥ 3 chủng khác nhau.
3. Một hệ VFX dùng cho nhiều tướng thì phải khác vai và dáng.
4. Nên có đại diện của nhiều nhóm A–J trước khi dồn vào một nhóm.
5. Tướng bay/trôi, bốn chân, nhiều chân: cân nhắc chi phí rig và độ đọc ở camera, không giới hạn số cứng.
6. Motif Đông Sơn dùng có chọn lọc (khuyến nghị 062 và 098), luôn là điểm nhấn.
7. Chiều cao trải nhiều bậc (< 1,6 m, 1,6–2,2 m, > 2,2 m).
8. Silhouette ảnh xám 64 px: không hai tướng giống nhau; kiểm lineup nhiều tướng đứng gần, VFX bật và tắt.
9. Uniqueness review: mỗi tạo hình ghi nhân vật thương mại có ngoại hình gần nhất (LoL/Liên Quân/Dota/khác) và khóa khác biệt, kiểm bằng ảnh chứ không chỉ mô tả.
10. Giữ giọng COLINH: mục thiên hài hước (vd 092) chỉ dùng khi không phá tông thế giới.

## Ma trận hình thái

Cột bắt buộc khi audit 27 tướng (điền ở doc 75 cho 8 prototype trước): chủng · chất liệu · vóc dáng (H, H/W) · posture · cách di chuyển · vũ khí · khoảng âm silhouette · màu chủ đạo · hệ VFX · nhãn.
