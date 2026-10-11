# 85 · Đề xuất 18 tướng: tạo hình × bộ chiêu × R × hình học × rủi ro

**Trạng thái: PROPOSAL, CHƯA DUYỆT** (11-10-2026). Chỉ là tài liệu: không đổi `scripts/`, `places/`, `scripts/lib/data/`, không greybox, không chốt tọa độ hay số combat nào. Chỗ ghi "giữ số" nghĩa là giữ số đang có trong candidate Lab (`tools/sim/candidates/<id>.yml`), chưa phải số được duyệt.
Brief: [84](84-brief-review-tao-hinh-18-cuu-mach.md) · chỉ mục [83](83-goi-review-tao-hinh-18-cuu-mach.md) · bảng nhanh cho creator: [`DUYET-TAO-HINH-18.md`](../../DUYET-TAO-HINH-18.md).

## 0. Nguồn và cách đọc

| Nguồn | Phiên bản | Dùng cho |
|---|---|---|
| [74](74-thu-vien-tao-hinh.md) thư viện 100 look, [75](75-prototype-tao-hinh.md) prototype | 2026-10-10 | số look, rủi ro trùng, look đã giữ cho 9 tướng đang có |
| [76](76-chuan-hinh-hoc-skill.md) §Cone AoE ≠ Fan (khóa #70376) | 2026-10-10 | nón/quạt/đường/vòng |
| [79](79-chuan-ultimate.md) chuẩn Ultimate | 2026-10-10 | 5 pha R, 10 kiểm thử |
| [audit-18/a](audit-18/a.md) · [b](audit-18/b.md) · [c](audit-18/c.md) | 2026-10-11 | look đề xuất, chiêu viết lại, số Lab |
| Lab `tools/sim` `--cand`, rev `58663539ed6e` | combo n100, duel n40, team n300 | số Lab. **PASS_MODEL, mẫu nhỏ**; chưa chạy `all --n 200` |
| `tools/sim/candidates/*.yml` trường `role` | hiện tại | cột Vai |

Nguyên lý chung (doc 74/84): mỗi tướng là một **Cổ Linh** do ký ức Tinh Thạch tái hiện, tức một thực thể của nền văn minh một triệu năm trước, không phải thần dân gian hay vật thờ. Motif Việt chỉ là dấu nhận diện. Kit đi theo hình: chiêu nào hình không làm được thì viết lại, nhưng **giữ vai và độ khó**.
Đánh đổi chung: đổi look làm mất mọi so sánh Lab cũ có liên quan hình học, nên mọi số dưới đây là chỉ báo. Phải chạy lại Lab sau khi viết kit mới.
Nhãn: `PASS_MODEL` = Lab mô hình; `NOT_TESTED` = chưa mô hình hoặc chưa chạy engine. Chưa tướng nào có `PASS_ENGINE`.

## 1. Sửa lỗi trùng look và kiểm trùng

| Lỗi | Trước | Đề xuất | Lý do |
|---|---|---|---|
| 048 bị gán cho hai tướng | Dực Nham dự phòng 048, Tầm Vũ dự phòng 048 | **Dực Nham → 006 Người Gió Diều**; **Tầm Vũ → 099 Người Cá Bò Cạn** | 006 là xạ thủ bay, "thả diều" khớp E Vút Cánh hơn 048 đi bộ (audit b đã ghi điểm yếu này). 099 là xạ thủ "phóng lao xa, lặn vũng né", khớp Lao Dài, R Săn Một Bóng và E Bật Lùi |
| 020 trùng tướng đang có (phát hiện thêm) | Lộc Thảo dự phòng 020 Người Than Hồng | **Lộc Thảo → 048 Hoa Gạo Tháng Ba** | Doc 74 §Ghép: `hoa_tuy` chặn 009/020/076. Doc 74 cũng đã gợi ý 048 cho `loc_thao`: xạ thủ thực vật, giữ được chủ đề rễ-cành mà 030 làm mất |

Kết quả: 36 số (18 chính + 18 dự phòng) riêng biệt và không chạm look đã giữ/chặn cho 9 tướng đang có:
`moc_lam` 023 · `kha_tan` 081 · `hao_nhat` 013 (canon khóa) · `nham_vu` 092/088 · `hoa_tuy` chặn 009/020/076 · `bach_dien` 098 (vũ công; giữ để không trùng Vũ Công Gương Đồng). `mi_dang`, `van_dao`, `huong_mai` giữ nguyên, không chiếm số.

Lệnh kiểm (đọc bảng ở cả hai file, thoát 1 nếu trùng, thiếu hoặc lệch nhau):
```
python3 tools/audit/looks18_dupcheck.py
```
Kết quả lần chạy cuối ghi ở §5.

## 2. Bảng tổng

| # | Tướng | Vai (`role` Lab) | Tạo hình đề xuất | Dự phòng | Chiêu viết lại | R (doc 79) | Hình học sai trong Lab | Cờ Lab (PASS_MODEL) | Rủi ro sản xuất |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Tĩnh Lôi | Đấu sĩ dồn (`fighter_burst`) | 002 Người Sấm | 038 | 2 (RMB, R) | làm lại | Q cần ghi rõ là một đạn | **ĐỎ One-Combo**, duel UP | thân mây không chân |
| 2 | Lam Nghi | Hỗ trợ khống chế (`support_control`) | 034 Hươu Sao Gạc Đóm | 019 | 1 (Q) | đạt ý | Q: 1 đường rộng → quạt 3 đạn (bổ sung) | duel thấp, đọc theo đội | rig 4 chân + gạc |
| 3 | Lộc Thảo | Xạ thủ kiểm soát vùng (`marksman`) | 030 Bọ Cạp Đá Ong | 048 | 2 (Q, RMB) | làm lại (cần vách) | — | nghi UP | **rig 8 chân + đuôi** |
| 4 | Ngư Đăng | Đỡ đòn che chở (`tank_protect`) | 025 Gấu Ngựa Đeo Chuông | 005 | 2 (RMB, nội tại) | đạt ý | R thiếu vách chặn | **ĐỎ reset** (8 lần/combo) | thấp |
| 5 | Cốt Bện | Đỡ đòn càn lướt (`tank_engage`) | 008 Người Bùn Ruộng | 031 | 2 (LMB, E) | đạt ý | **RMB nón → đang là vòng** | cân | thấp |
| 6 | Sấm Kha | Đấu sĩ mở giao tranh (`fighter_tank`) | 039 Tê Giác Một Sừng | 017 | 2 (LMB, RMB) | thêm vách đổ | **RMB 2 nhánh → đang là 1 đường rộng** | cân | 4 chân |
| 7 | Dực Nham | Xạ thủ cơ động (`marksman`) | 053 Người Giấy Dó | **006** | 1 (RMB) | cần signature | — | UP (duel p15, 2v2/3v3) | thân giấy mỏng khi xoay cạnh |
| 8 | Nanh Núi | Đỡ đòn phản công (`tank_protect`) | 069 Cối Xay Thóc | 064 | 2 (LMB, Q) | motif quen, làm lại | **Q nón → đang là vòng** | UP muộn | thân máy, không chi người |
| 9 | Kính Ngôn | Hỗ trợ phép (`support_control`) | 066 Đèn Kéo Quân | 063 | 3 (LMB, Q, R) | làm lại | — | UP theo đội | đèn xoay quanh trục, nhiều lớp bóng |
| 10 | Mặc Liên | Pháp sư dọn giao tranh (`mage_burst`) | 052 Người Sơn Mài | 042 | 0 (đổi chất liệu) | đạt | **Q 3 luồng → đang là 1 đường rộng** | cân, burst mép | thấp |
| 11 | Tầm Vũ | Xạ thủ tầm xa (`marksman`) | 043 Tre Đằng Ngà | **099** | 1 (Q) | đạt | — | **ĐỎ One-Combo**, 5v5 61 % | thân tre rất mảnh |
| 12 | Hàn Chi | Pháp sư khống chế (`mage_control`) | 061 Đồng Hồ Nước Đóng Băng | 055 | 1 (Q) | đạt | **E nón → đang là vòng** | OP 5v5 66 %, UP duel p6 | khối tĩnh, cần chuyển động phụ |
| 13 | Tam Dấu | Hỗ trợ khống chế (`support_control`) | 085 Sứa Chuông | 074 | 2 (RMB, E) | thiếu signature | — | UP 5v5 41 %, WARN | **sứa trôi, xúc tu mềm** |
| 14 | Thạch Hộ | Đỡ đòn bảo kê (`tank_protect`) | 082 Cá Ông Nam Hải | 077 | 2 (Q, R) | làm lại | E chắn đạn chưa có cung | **ĐỎ reset** | khối lớn nhất, thân trườn |
| 15 | Trắc Nham | Pháp sư khống chế (`mage_control`) | 087 Nhện Dệt Thổ Cẩm | 089 | 2 (E, R) | cần đỉnh | **RMB + R đường → đang là vòng** | **ĐỎ One-Combo** | **rig 8 chân** |
| 16 | Sắc Nhiên | Pháp sư dồn (`mage_burst`) | 084 Mực Ống Lân Quang | 073 | 2 (Q, R) | gần đạt | — | UP duel nặng, 5v5 60 % | **xúc tu**, nhiều màu |
| 17 | Sa Tẫn | Hỗ trợ hồi/khống chế (`support_heal`) | 078 Người Mộng | 072 | 2 (RMB, R) | làm lại | — | WARN, 3v3 UP | nằm ngang bay, rig lạ |
| 18 | Vân Ấn | Đấu sĩ dồn (`fighter_burst`) | 096 Người Một Chân | 083 | 3 (LMB, Q, R) | làm lại | **Q nón → đang là skillshot** | **ĐỎ One-Combo**, duel OP 73,6 % | **một chân, nhảy lò cò** |

**7 chỗ Lab mô hình sai hình học** (doc 76): Cốt Bện RMB · Sấm Kha RMB · Mặc Liên Q · Hàn Chi E · Nanh Núi Q · Trắc Nham RMB+R (một kit) · Vân Ấn Q. Bổ sung lần này: Lam Nghi Q (một đường rộng 2,4 m phải là quạt đạn) và Thạch Hộ E (chắn đạn chưa có cung). Ở mọi chỗ này Lab đang cho trúng **rộng hơn** tooltip, nên số cũ bị thổi phồng; phải sửa mô hình trước khi kết luận OP/UP.

## 3. Từng tướng

Quy ước dòng chiêu: **giữ** = giữ cơ chế, chỉ đổi hình/tên; **viết lại** = đổi động tác/cơ chế cho khớp hình, giữ vai và độ khó. Hình học ghi theo doc 76: *đạn* (skillshot vật thể thật), *quạt đạn* (`fan`), *nón* (Cone AoE `arc`), *đường* (line có `width`), *vòng* (area tròn), *chỉ định* (target).

### 1. Tĩnh Lôi · Đấu sĩ dồn (`fighter_burst`)
- **Chính 002 Người Sấm:** thân mây đen tụ quanh hai nắm đấm sấm, không chân. **Dự phòng 038 Vượn Má Trắng:** đu nhảy, tay dài.
- **COLINH:** Cổ Linh của cơn bão mùa, ký ức Tinh Thạch lưu nó như một đợt phóng điện có ý chí, không phải Thần Sấm.
- LMB Chưởng Hồi → *Chưởng Sấm*: **giữ** (chuỗi đấm, nhát 3 nổ sấm). Nội tại Lôi Tàng: **giữ** (đòn ba mọc hai tay chớp).
- Q Tiếng Vọng: **giữ**, *đạn* thật (cầu sét), đánh dấu, tái kích lướt tới dấu.
- RMB Bước Che → *Mây Che*: **viết lại** (tan thành mây, giật ngắn + vỏ điện). Đích đúng là **đồng minh**; Lab đang cho nhảy về phía địch.
- E Nện Lôi: **giữ**, *vòng* (sét rơi tròn).
- R Cước Dội Trời → *Sấm Dội Trời*: **viết lại**, vì không có chân để đá. *Chỉ định* gần.
- **R doc 79:** fantasy "kéo trời xuống một điểm". Signature: **cột sét từ trời** đọc được ở camera MOBA. 5 pha: tụ mây → móc hất (nhịp 1) → cột sét giáng (signature) → choáng + chớp trắng (đỉnh) → mây tan.
- **Rủi ro Lab:** One-Combo **ĐỎ** (combo TB 90 % máu p6, hạ cả đấu sĩ cùng cấp) nhưng duel UP (35 %/26 %), tức burst cao và duy trì kém. Hướng đề xuất: chuyển bớt sát thương từ combo mở màn sang nội tại/chuỗi LMB. Chỉ báo, không tự chỉnh số. NOT_TESTED: tái kích Q, khiên chia đồng minh.
- **Sản xuất:** thân mây cần shader/hạt (perf phone), chân ẩn trong mây giúp rig đơn giản. Trùng ý: tránh Volibear/Kennen; không đeo trống sấm thờ.

### 2. Lam Nghi · Hỗ trợ khống chế (`support_control`)
- **Chính 034 Hươu Sao Gạc Đóm:** hươu sao, gạc treo đom đóm sáng. **Dự phòng 019 Người Đá Nguyệt.**
- **COLINH:** Cổ Linh dẫn đường đêm của các bầy di cư; ký ức sao lưu trong đom đóm trên gạc.
- LMB đạn sao → *Đom Đóm*: **giữ**, *đạn*. Nội tại ba sao ghim: **giữ** (ba đom đóm).
- Q Chạc Trời → *Gạc Rẽ Trời*: **viết lại** thành **quạt 3 đạn** từ ba nhánh gạc, mỗi tia trói tướng đầu tiên. Mỗi tia hẹp lại để giữ độ khó. Không vẽ như nón.
- RMB Sao Trở Về: **giữ** (bầy bay ra rồi về che đồng minh). NOT_TESTED: quỹ đạo ra-về.
- E Sao Rơi: **giữ**, *vòng* nổ trễ.
- R Đường Mạch Sáng: **giữ**, *đường* dài xuyên.
- **R doc 79:** fantasy "mở một dải trời". Signature: **dải đom đóm** thành đường sáng. 5 pha: ngửa gạc gom đóm → dòng đóm dồn → dải sáng phóng → chậm/choáng dọc đường → đóm rơi rắc.
- **Rủi ro Lab:** duel 17/24 % (thấp, nhưng vai đọc theo đội); không ĐỎ. Hướng: chấm lại sau khi Q thành quạt.
- **Sản xuất:** rig 4 chân + gạc (có sẵn mẫu thú ở doc 74). Đom đóm: giới hạn population.

### 3. Lộc Thảo · Xạ thủ kiểm soát vùng (`marksman`)
- **Chính 030 Bọ Cạp Đá Ong:** bọ cạp vỏ đá ong, đuôi bắn kim độc. **Dự phòng 048 Hoa Gạo Tháng Ba** (thay 020; giữ chủ đề thực vật nếu creator muốn).
- **COLINH:** Cổ Linh của tầng đá ong cổ, giữ ký ức các lũy đất; nọc là khoáng chất kết tinh.
- LMB → *Kim Độc*: **giữ**, *đạn*. Nội tại Gai Bám → *Nọc Tầng*: **giữ**.
- Q Kéo Cành → *Quất Đuôi*: **viết lại**, *đường* xuyên (đuôi vươn), không phải nón.
- RMB Bứt Nhanh → *Lột Vỏ*: **viết lại**, tự tăng tốc.
- E Mưa Gai → *Mưa Kim*: **giữ**, *vòng* nhiều nhịp (ghi số nhịp và thời lượng).
- R Rễ Chặn → *Neo Vách*: **giữ** mũi trói, **thêm** vách đá ong.
- **R doc 79:** fantasy "đóng cửa trận". Signature: **vách đá ong mọc sau mục tiêu**. 5 pha: cắm càng neo đất → kim neo bay → trói → vách mọc (đỉnh) → vách vỡ vụn.
- **Rủi ro Lab:** duel 26/37 %, combo 36/30 %; không ĐỎ; nghi UP. Phần vách (giá trị vai) chưa mô hình, nên chưa kết luận. Không có mốc xạ thủ đáng tin (Nham Vũ lệch).
- **Sản xuất:** **rig 8 chân + đuôi** là rủi ro cao nhất nhóm. Đề xuất: chân chạy chu kỳ procedural, chỉ đuôi và càng có clip. Trùng ý: tránh Skarner/Sand King (không đào cát, không chích-giữ).

### 4. Ngư Đăng · Đỡ đòn che chở (`tank_protect`)
- **Chính 025 Gấu Ngựa Đeo Chuông:** gấu ngựa ngực trăng, xích-chuông đồng. **Dự phòng 005 Người Băng Nhũ.**
- **COLINH:** Cổ Linh gác đèo, tiếng chuông là tín hiệu gọi đoàn về. Chuông có vân trống mờ, không phải chuông chùa.
- LMB roi xích → *Roi Chuông*: **giữ**. Nội tại Đèn Dẫn Lối → *Chuông Dồn*: **viết lại**.
- Q Móc Dẫn → *Ném Chuông*: **giữ**, *đạn* kéo + choáng; windup 0,5 s cần telegraph đường xích dày.
- RMB Đèn Kết Bạn → *Chuông Kết Bạn*: **viết lại** (chuông cắm đất, khiên quanh chuông).
- E Quét Xích: **giữ**, *vòng*.
- R Lồng Vọng: **giữ**, *vòng* quanh mình + **vách chặn** (chưa mô hình).
- **R doc 79:** fantasy "giam cả giao tranh trong tiếng ngân". Signature: **ba vòng chuông đồng ảo** hạ xuống thành lồng. 5 pha: đứng dậy gầm → giật chuông → lồng hạ (signature) → ngân dội, trói (đỉnh) → vòng vỡ thành tiếng tàn.
- **Rủi ro Lab:** **ĐỎ reset**: `passive:cdr` kích 8 lần/combo (165 cờ). Đây là lỗi kit, không phải sát thương. Hướng đề xuất: trần số lần mỗi chiêu mỗi lượt. Phải sửa trước mọi kết luận. Duel 18/24 % thấp so với tank đang chơi.
- **Sản xuất:** rig gấu đứng 2 chân/4 chân; xích-chuông mềm: dùng bone chain ngắn.

### 5. Cốt Bện · Đỡ đòn càn lướt (`tank_engage`)
- **Chính 008 Người Bùn Ruộng:** golem bùn ruộng, mạ cắm trên lưng, bừa tre. **Dự phòng 031 Trâu Cày Thần.**
- **COLINH:** Cổ Linh của đồng chiêm, bùn lưu ký ức các mùa lũ; nó nuốt kẻ thù như ruộng nuốt chân.
- LMB Cưa Xương → *Vả Bùn*: **viết lại**, đòn đôi (chưa mô hình).
- Q Móc Dài → *Bừa Tre*: **giữ**, *đạn* bị lính chặn, kéo.
- RMB Khạc Mù → *Phun Bùn*: **giữ** ý, **sửa hình học**: **nón** (`arc` + `range`, preview quạt đặc), đang mô hình vòng 3,5 m.
- E Hàm Đá → *Vục Bùn*: **viết lại** động tác, giữ cơ chế theo máu đã mất.
- R Nuốt Bóng → *Vùi Bùn*: **giữ**, *chỉ định*.
- **R doc 79:** fantasy "ruộng nuốt người". Signature: **mục tiêu chìm vào bụng golem, mạ trên lưng dựng đứng**. 5 pha: dang tay bùn → chìm dần → giữ trong bụng → nhả + vũng chậm (đỉnh) → bùn khô nứt.
- **Rủi ro Lab:** cân (duel 53/43 %, combo 39/32 %, không ĐỎ). Số trúng RMB sẽ đổi khi thành nón. NOT_TESTED: hai bên không thể bị chọn khi R.
- **Sản xuất:** thấp (dáng người khối). Trùng ý: tránh Tahm Kench (không lưỡi, không ếch).

### 6. Sấm Kha · Đấu sĩ mở giao tranh (`fighter_tank`)
- **Chính 039 Tê Giác Một Sừng:** tê giác Java, sừng nứt phát sét. **Dự phòng 017 Người Sắt Rèn.**
- **COLINH:** Cổ Linh dẫn đàn qua núi; sét tụ ở sừng là ký ức các trận va chạm đàn.
- LMB Chùy Sấm → *Húc Sừng*: **viết lại** vũ khí, giữ số. Nội tại Tâm Dương: **giữ**.
- Q Trời Chẻ Nhánh: **giữ**, *chỉ định* nảy (Lab chưa mô hình nảy, nên sát thương thật có thể thấp hơn).
- RMB Song Dương → *Song Đà*: **viết lại** thành **quạt 2 đạn** (hai bóng tê giác, lệch khoảng 15°), đang mô hình 1 đường rộng 3,2 m.
- E Nhịp Bão: **giữ** (chạy đà).
- R Đất Tách: **giữ** *đường* choáng, **thêm** vách đổ.
- **R doc 79:** fantasy "xé đất mở lối". Signature: **đường nứt sáng, vách đá dựng hai bên rồi đổ vào giữa** (tách khỏi Fissure của Earthshaker). 5 pha: sừng nạp sáng → giẫm → nứt chạy → vách đổ, choáng (đỉnh) → bụi lắng.
- **Rủi ro Lab:** cân nhất lane (duel 53/54 %, không ĐỎ).
- **Sản xuất:** rig 4 chân nặng, có mẫu thú.

### 7. Dực Nham · Xạ thủ cơ động (`marksman`)
- **Chính 053 Người Giấy Dó:** thân giấy dó cắt dày 2 cm, gấp mình thành chim. **Dự phòng 006 Người Gió Diều** (thay 048).
- **COLINH:** Cổ Linh đưa thư của thành tầng mây; mỗi lớp giấy in một ký ức đường bay.
- LMB Tia Cuội → *Phi Tiêu Giấy*: **giữ**, *đạn*.
- Q Mảnh Nóng → *Giấy Cháy Cạnh*: **giữ**, *đường* xuyên hàng.
- RMB Dấu Gọi → *Bùa Dán*: **viết lại** (dán giấy, đòn kế xé bùa nổ).
- E Vút Cánh → *Gấp Diều*: **giữ** lướt 5 m.
- R Dòng Sáng: **giữ** *đường* 16 m × 3 nhịp, cần signature.
- **R doc 79:** fantasy "đàn chim giấy xé trời". Signature đề xuất: **đàn chim giấy xếp thành một mũi tên khổng lồ**, mỗi nhịp một đợt. 5 pha: xé thân thành chim → 3 đợt bay → đợt ba to nhất (đỉnh) → giấy cháy tàn.
- **Rủi ro Lab:** UP (duel p15 34 %, 2v2 27 %, 3v3 30 %). Bị nhiều tướng hạ trong một combo. Hướng: xem độ bền/cơ động trước sát thương.
- **Sản xuất:** thân mỏng khi xoay cạnh sẽ mất silhouette; giữ viền phe dày và luôn có độ cong. Rig ít xương (gấp-mở bằng shape key).

### 8. Nanh Núi · Đỡ đòn phản công (`tank_protect`)
- **Chính 069 Cối Xay Thóc:** thân trên là hai thớt cối nghiền liên tục, quai cối làm tay. **Dự phòng 064 Tượng Hộ Lăng.**
- **COLINH:** cỗ máy Tinh Thạch nghiền ký ức. Mọi đòn nhận vào là "thóc dồn vào cối", nên fantasy "gánh nợ" vẫn giữ.
- LMB Rìu Nanh → *Tay Cối*: **viết lại**, cận chiến.
- Q Tiếng Gầm → *Tiếng Nghiến*: **viết lại**, **nón** khiêu khích; đang mô hình vòng r 4 quanh mình và là charm kéo chứ không phải taunt.
- RMB Lời Thách: **giữ** (chém + hút máu; hút máu NOT_TESTED trong Lab).
- E Nợ Va Chạm → *Xả Cối*: **giữ**, *vòng*.
- R Phán Núi: **viết lại** phần trình diễn (nhảy giáng + kết liễu là motif quen Darius/Garen).
- **R doc 79:** fantasy "cối nghiền xả". Signature đề xuất: **thớt cối trên bật lên, quay, giáng thành vòng nghiền**, thóc ký ức bắn tung. 5 pha: cối quay nhanh dần → bật → giáng (đỉnh, choáng) → thóc rơi → cối chậm lại.
- **Rủi ro Lab:** UP muộn/2v2 (duel p15 26 %, 2v2 34 %). Hút máu chưa giả lập nên bị chấm thấp. Hướng: sửa Lab trước, rồi mới đánh giá.
- **Sản xuất:** khối tròn quay (rotation đơn giản); không cần chi người. Trùng ý: xoay sát Garen, nên giữ cối quay tại chỗ, không xoay toàn thân.

### 9. Kính Ngôn · Hỗ trợ phép (`support_control`)
- **Chính 066 Đèn Kéo Quân:** đèn lục giác giấy-tre là thân, bóng chiến binh xoay quanh. **Dự phòng 063 Con Rối Nước** (creator từng chê rối "đáng sợ").
- **COLINH:** máy chiếu ký ức Tinh Thạch, mượn bóng của các trận cũ. Bỏ gương để không trùng Bách Diện.
- LMB Mảnh Gương → *Bóng Lướt*: **viết lại**, *đạn*.
- Q Tia Mượn → *Bóng Hút*: **viết lại** hình, giữ *chỉ định* luôn trúng.
- RMB Bàn Tay Xa → *Bóng Tay*: **giữ**, *đạn* width hẹp.
- E Phiến Che → *Vách Đèn*: **giữ**.
- R Vỏ Vọng → *Chiếu Lại*: **viết lại**: chép chiêu cuối của **tướng địch** trong tầm và chiếu lại (đúng lời hứa "Người Mượn Phép").
- **R doc 79:** fantasy "trả lại trận đấu bằng bóng". Signature: **bóng chiêu địch hiện trên vách đèn rồi phóng ra**. 5 pha: đèn quay nhanh → bóng hiện → bóng tách khỏi vách → chiêu chiếu (đỉnh) → đèn chậm, tắt bóng.
- **Rủi ro Lab:** UP theo đội (2v2 30 %, 5v5 44 %). R mimic Lab chỉ chép chiêu mình nên NOT_TESTED; hồi máu item chưa giả lập. Sản xuất R khó: mỗi chiêu địch cần một phiên bản "bóng".
- **Sản xuất:** đèn tĩnh quay trục, rig rẻ; bóng là sprite/silhouette. Sát Mị Đăng (đèn): giữ dáng lục giác cao, màu khác hẳn.

### 10. Mặc Liên · Pháp sư dọn giao tranh (`mage_burst`)
- **Chính 052 Người Sơn Mài:** thân sơn son–đen bóng cứng, khảm vỏ trứng, cọ-lưỡi sơn son. **Dự phòng 042 Linh Sen Hồ.**
- **COLINH:** lớp sơn phủ ký ức qua các địa tầng; mỗi nhát cọ "sơn lại" trận đánh.
- LMB Búng Son: **giữ**, *đạn*.
- Q Ba Nét: **giữ** ý, **sửa hình học**: **quạt 3 đạn**, đang mô hình 1 đường rộng.
- RMB Mực Nở → *Sơn Nở*: **giữ**, *đạn* lớn dần.
- E Lách Nét: **giữ**.
- R Nét Cuối: **giữ**, *vòng* 5,5 + hất.
- **R doc 79:** **đạt**. Signature: **một nhát cọ sơn son khổng lồ**. 5 pha: nhúng cọ → vẽ vòng → nét khép (đỉnh, hất) → sơn khô, bong.
- **Rủi ro Lab:** cân (duel 45/52 %, team 43–54 %). Burst mép: 90–107 % lên mục tiêu mỏng; phần lớn cờ là Nham Vũ. Hạ khi Q thành quạt.
- **Sản xuất:** thấp. Nếu Sắc Nhiên lấy 052 thì đổi; hiện Sắc Nhiên dùng 084, không xung đột.

### 11. Tầm Vũ · Xạ thủ tầm xa (`marksman`)
- **Chính 043 Tre Đằng Ngà:** thân tre ngà 2,3 m, cong, lá xòe đỉnh. **Dự phòng 099 Người Cá Bò Cạn** (thay 048): đuôi chống thân, lao xương cá.
- **COLINH:** Cổ Linh gác tuyến di cư; tre uốn tích lực là ký ức sức bền.
- LMB Lao Dài: **giữ**, *đạn*.
- Q Mưa Đá → *Mưa Dăm Tre*: **viết lại** hình, giữ *vòng* r 3,5.
- RMB Ngắm Tĩnh: **giữ** (cắm gốc).
- E Bật Lùi: **giữ** (bật như cần tre).
- R Săn Một Bóng: **giữ**, *đường* 25 m, windup 1,1 s.
- **R doc 79:** **đạt**. Signature: **cả thân uốn cong thành cung rồi búng**. 5 pha: cắm gốc → uốn dần (tell) → búng (đỉnh) → lao xuyên → thân bật về, lá rung.
- **Rủi ro Lab:** **ĐỎ One-Combo** (hạ Bách Diện đấu sĩ 101–103 %), 5v5 61 % OP. Hướng: giảm phần burst trong combo, giữ duel. Chỉ báo. Trùng ý: snipe sát Jhin/Caitlyn, nên giữ tell uốn thân là bản sắc.
- **Sản xuất:** thân quá mảnh ở camera MOBA, cần lá xòe và viền dày. Rig: chuỗi xương cong (spine chain).

### 12. Hàn Chi · Pháp sư khống chế (`mage_control`)
- **Chính 061 Đồng Hồ Nước Khắc Lậu (đóng băng):** ba bình gốm-đồng tầng, giọt đóng băng thành nanh. **Dự phòng 055 Bình Gốm Men Lam.**
- **COLINH:** lõi điều nhịp của một thành cổ; đếm giọt là đếm ký ức.
- LMB Nanh Sương: **giữ**, *đạn*.
- Q Rắn Lạnh → *Dòng Giá*: **viết lại**, *đường* xuyên lính, dấu lạnh.
- RMB Mưa Nanh: **giữ**, *vòng*.
- E Hơi Giá: **giữ** ý, **sửa hình học**: **nón** trói, đang mô hình vòng.
- R Vành Phán: **giữ**, *vòng* r 6 khép rồi choáng.
- **R doc 79:** **đạt**. Signature: **bình dưới đầy, vành băng khép**. 5 pha: giọt đếm nhanh → vành hiện → khép 0,9 s → xung choáng (đỉnh) → băng tan nhỏ giọt.
- **Rủi ro Lab:** lệch pha: UP duel p6 30 %, **OP 5v5 66 %** (cao nhất lane). E đang trúng rộng hơn thật, nên sửa nón trước khi kết luận. Chủ đề thời gian sát Sa Tẫn: Sa Tẫn đã chuyển sang Người Mộng.
- **Sản xuất:** khối tĩnh dễ dựng, cần chuyển động phụ (nước, nghiêng bình) để không giống prop.

### 13. Tam Dấu · Hỗ trợ khống chế (`support_control`)
- **Chính 085 Sứa Chuông:** chuông sứa trôi, tua chích, nhịp sáng. **Dự phòng 074 Tiếng Vọng.**
- **COLINH:** Cổ Linh biển ký ức; chuông lưu ba nhịp của cùng một trận. Vân trống chỉ mờ trên chuông.
- LMB → *Giọt Lân*: **giữ**, *đạn*.
- Q Dấu Sương → *Tua Chích*: **giữ**, *đường*, đánh dấu + chậm.
- RMB Dấu Đá → *Chuông Rơi*: **viết lại**, *vòng* rơi trễ, choáng.
- E Dấu Gió → *Nhịp Đẩy*: **viết lại**, *vòng* quanh thân, đẩy + khiên đồng minh.
- R Lời Đáp: **giữ** ba nhịp + trói, thêm signature.
- **R doc 79:** fantasy "trả lời bằng ba điềm". Signature: **ba chuông con bung từ thân**, mỗi nhịp mang màu dấu đã dùng. 5 pha: chuông co → ba chuông con → nhịp 1, 2 → nhịp 3 mạnh nhất (đỉnh) → chuông tan thành lân.
- **Rủi ro Lab:** UP 5v5 41 %; One-Combo WARN 104 % (chỉ từ sau lưng lên Nham Vũ). Trạng thái dấu và tổ hợp R chưa mô hình.
- **Sản xuất:** **sứa trôi, tua mềm**: tua cần sim xương/procedural; silhouette treo ở 64 px phải thử trước.

### 14. Thạch Hộ · Đỡ đòn bảo kê (`tank_protect`)
- **Chính 082 Cá Ông Nam Hải:** cá voi đứng, lưng lớn, vây ngực. **Dự phòng 077 Hư Vô.**
- **COLINH:** Cổ Linh biển giữ luồng ký ức người đi biển; dáng trang nghiêm, không phải đối tượng thờ.
- LMB: **giữ** (đập vây).
- Q Mảnh Lạnh → *Vòi Phun*: **viết lại**, *đường* xuyên, hất lùi + chậm.
- RMB Lướt Bảo Hộ → *Sóng Đỡ*: **giữ**; phải là `aim: ally` (Lab đang lướt về địch).
- E Vách Chắn → *Vây Chắn*: **giữ**; **thêm hình học** cung chắn theo hướng ngắm (arc + width); hiện không có field.
- R Sừng Băng → *Cá Ông Trườn Bãi*: **viết lại**, *đường* 12 m + sóng chấn cuối.
- **R doc 79:** fantasy "biển đổ lên bờ". Signature: **thân cá voi trườn bụng kéo sóng**. 5 pha: hít khí → trườn → hất tung dọc đường → đập bụng, sóng chấn choáng (đỉnh) → sóng tan.
- **Rủi ro Lab:** **ĐỎ reset**: `cdr_on_hit` kích 8 lần/combo (46 cờ). Hướng: trần số lần như Ngư Đăng, sửa trước. Duel 58 %, 5v5 54,5 %, ổn theo vai.
- **Sản xuất:** khối lớn nhất roster nên dễ che tầm nhìn; capsule giữ, visual to. Rig thân trườn (spine).

### 15. Trắc Nham · Pháp sư khống chế (`mage_control`)
- **Chính 087 Nhện Dệt Thổ Cẩm:** nhện tám chân dệt sợi sáng trên đất. **Dự phòng 089 Sâu Đất Vành Răng.**
- **COLINH:** Cổ Linh dệt lại bản đồ vết nứt của Mạch Trụ. Hoa văn tự sáng tạo, không chép thổ cẩm của dân tộc cụ thể.
- LMB: **giữ** (búng tơ, *đạn*).
- Q Đường Rạn → *Sợi Căng*: **giữ**, *đường* xuyên, chậm.
- RMB Kẹp Chéo → *Nút Dệt*: **giữ** ý, **sửa hình học**: **hai đường** giao nhau, trói ở giao điểm; đang mô hình vòng 2,8 m.
- E Chống Vách → *Kén Tơ*: **viết lại** (khiên kén + đu tơ lùi).
- R Ba Đường Đứt → *Khung Cửi*: **viết lại** hình; **sửa hình học**: **ba đường** có width; đang mô hình vòng r 4,5.
- **R doc 79:** fantasy "dệt trận đồ". Signature: **khung cửi ba sợi căng trên đất**. 5 pha: giăng → sợi 1, 2 đứt nổ → sợi 3 mạnh nhất (đỉnh, chậm nặng) → tơ rơi tàn.
- **Rủi ro Lab:** **ĐỎ One-Combo** (giết cùng cấp 107 %), nhưng duel 41/37 %, team 39–43 %, tức nặng burst, yếu duy trì. Hai lỗi hình học làm phồng sát thương, nên sửa mô hình trước khi chỉnh. Vùng nứt tồn tại chưa mô hình.
- **Sản xuất:** **rig 8 chân** (dùng chung giải pháp procedural với Lộc Thảo). Nhện có thể gây sợ: giữ dáng tròn, màu ấm.

### 16. Sắc Nhiên · Pháp sư dồn (`mage_burst`)
- **Chính 084 Mực Ống Lân Quang:** mực ống phát sáng nhiều màu. **Dự phòng 073 Bầy Đom Đóm.**
- **COLINH:** Cổ Linh vực sâu chuyển dữ liệu trận thành ánh màu. Mực lân quang nhiều màu, không đen (để không trùng Mặc Liên).
- LMB Búng Màu → *Giọt Mực*: **giữ**, *đạn*.
- Q Vàng Vỡ → *Phun Mực Lân*: **viết lại**, *vòng* 3 m để lại vệt màu.
- RMB Neo Hồng → *Xúc Tu Chộp*: **giữ**, *đạn* kéo.
- E Lướt Lục → *Phụt Lân*: **giữ**, lướt *đường*.
- R Tranh Lớn → *Bức Lân Quang*: **viết lại**, *vòng* 6 m hút vệt màu rồi nổ.
- **R doc 79:** gần đạt. Signature: **các vệt màu hút về tâm**. 5 pha: mực lan → vệt hút → chớp sáng nổ (đỉnh, chậm) → mực phai.
- **Rủi ro Lab:** UP duel nặng (20/21 %), 5v5 60 %; combo 89 % không giết. Vùng màu và chồng màu chưa mô hình.
- **Sản xuất:** **xúc tu** (bone chain); nhiều màu cần một bảng hue giới hạn (`vfx/look.js`) để không loạn.

### 17. Sa Tẫn · Hỗ trợ hồi/khống chế (`support_heal`)
- **Chính 078 Người Mộng:** bay nằm ngang trên gối mây, silhouette ngang duy nhất roster. **Dự phòng 072 Ký Ức Vỡ.**
- **COLINH:** Cổ Linh giữ giấc ngủ của những người sống qua đêm dài; chọn một chất (ngủ), bỏ bong bóng.
- LMB: **giữ**. Nội tại Đá Chốt → *Hạt Mộng*: **giữ** cơ chế.
- Q Dấu Giờ → *Dấu Mộng*: **giữ**.
- RMB Vòng Cạn → *Gối Mây Xoáy*: **viết lại** hình, *vòng* ba nhịp chậm.
- E Quay Hạt → *Tỉnh Giấc*: **giữ** (quay về điểm đặt; Lab đang dùng "lùi 5 m", sai).
- R Mạch Đảo → *Giấc Dài*: **viết lại**, *vòng* 5 m.
- **R doc 79:** fantasy "cả vùng ngủ thiếp". Signature: **mái mây ngủ phủ vùng**. 5 pha: ngáp ru → nhịp hồi đồng minh → địch đóng băng (đỉnh) → duy trì → tiếng thức dậy.
- **Rủi ro Lab:** One-Combo WARN 105 % (từ sau lưng); 3v3 25 % UP, 5v5 48 %. `comboCooldown 0` cho thấy combo có thể chưa tính R; kiểm tra lại Lab. Trùng ý: Lillia/Nami (đã bỏ bong bóng, không hoa).
- **Sản xuất:** rig nằm ngang bay là lạ: hướng nhìn, hit-react và death cần clip riêng.

### 18. Vân Ấn · Đấu sĩ dồn (`fighter_burst`)
- **Chính 096 Người Một Chân:** đấu sĩ một chân, búa đá mốc. **Dự phòng 083 Cua Đồng Một Càng.**
- **COLINH:** Cổ Linh giữ cọc mốc của Mạch Trụ, không phải tượng thờ Độc Cước.
- LMB đại đao → *Búa Mốc*: **viết lại**, chuỗi ba nhát.
- Q Liềm Mạch → *Xoay Một Chân*: **viết lại**; **sửa hình học**: **nón** (arc + range), đang mô hình skillshot 4,5.
- RMB Bổ Thiên Thạch → *Dậm Lò Cò*: **giữ** (nhảy xa bổ xuống, choáng).
- E Lướt Ấn → *Nảy Khắc*: **giữ**.
- R Vòm Dấu → *Cắm Mốc Mạch*: **viết lại**, *vòng* 4 m bảo hộ đồng minh.
- **R doc 79:** fantasy "đóng cọc giữ đất". Signature: **thân cắm xuống thành cọc mốc khổng lồ**. 5 pha: nhảy cao → cắm xuống (đỉnh, sát thương) → vùng mốc giữ khiên/tốc đánh → mốc rung → nổ tàn.
- **Rủi ro Lab:** **ĐỎ One-Combo** (giết 4–5 mục tiêu p6) + duel OP 73,6 %. Đây là tướng lệch nặng nhất. Q sai loại làm phồng số; R Lab chỉ là buff tự thân. Hướng: sửa Q thành nón, mô hình R mới, rồi mới cắt burst.
- **Sản xuất:** **một chân, nhảy lò cò**: locomotion riêng (không dùng humanoid-locomotion có sẵn), root motion nảy, cần chống trượt chân.

## 4. Thứ tự và QA đề xuất

1. Sửa Lab trước (không đổi số): 7+2 chỗ hình học (§2), trần nội tại reset (Ngư Đăng, Thạch Hộ), hút máu, R Sa Tẫn trong combo.
2. Viết kit mới theo §3 cho Lô 1 (Sấm Kha, Cốt Bện, Mặc Liên), chạy `node tools/sim/run.mjs all --cand --n 200`, đối chiếu `gates.yml`.
3. Lô 2 (Lam Nghi, Dực Nham, Hàn Chi), rồi lô cờ đỏ.
4. Mỗi R: template doc 79 §4 viết trước, 10 kiểm thử doc 79 §3 trước PASS_ENGINE.
5. Rig lạ dùng chung giải pháp: 8 chân (Lộc Thảo, Trắc Nham), xúc tu/tua (Sắc Nhiên, Tam Dấu), một chân (Vân Ấn), nằm ngang bay (Sa Tẫn). Mỗi loại cần một spike rig trước khi mở hàng loạt.

## 5. Kiểm trùng: kết quả

Lần chạy 11-10-2026, sau khi sửa 048/020:
```
DUYET-TAO-HINH-18.md: 18 tướng · 36 số look riêng biệt
85-de-xuat-18-tuong.md: 18 tướng · 36 số look riêng biệt
KẾT QUẢ: PASS
```
Script kiểm 3 điều: 36 số không trùng; không chạm `RESERVED` (look của 9 tướng đang có, theo doc 74 §Ghép); hai file khớp nhau từng tướng. Khi đổi look ở một file thì phải đổi file kia và chạy lại.
Ghi chú: doc 74 §Ghép từng gợi ý 006 cho `tam_vu`. Ở đây 006 chuyển sang Dực Nham (chim bay, E lướt), Tầm Vũ lấy 099. Creator có thể đổi chéo; script sẽ vẫn PASS.

## 6. Creator cần quyết
1. Duyệt cột tạo hình chính (hoặc đổi tướng nào sang dự phòng).
2. Lộc Thảo: 030 bọ cạp (rig 8 chân, mất chủ đề rễ) hay 048 Hoa Gạo?
3. Nhận 4 loại rig lạ (8 chân, xúc tu, một chân, nằm bay)? Mỗi loại một spike trước khi sản xuất.
4. Kính Ngôn R chép chiêu cuối địch: chi phí VFX theo số tướng; nhận hay đơn giản hóa (chỉ chiếu lại một chiêu gần nhất ở dạng bóng chung)?
5. Thứ tự: sửa mô hình Lab (9 chỗ hình học + 2 reset) **trước** khi chỉnh số. Đề xuất mặc định là có.

## §6b Audit tài liệu

Audit Savi 11-10 (độc lập, chỉ tài liệu). `python3 tools/audit/looks18_dupcheck.py`, output thật:
```
DUYET-TAO-HINH-18.md: 18 tướng
  36 số look riêng biệt
85-de-xuat-18-tuong.md: 18 tướng
  36 số look riêng biệt
KẾT QUẢ: PASS
```

| Điểm | Nguồn | Đúng/sai | Sửa |
|---|---|---|---|
| 18 tên tướng trong §2–§3 | doc 03 | Đúng (18/18 có trong 03) | — |
| 36 số look không trùng | dupcheck trên | Đúng | — |
| Tên look mẫu 002, 006, 030, 034, 061, 074, 077, 096, 099 | doc 74 | Đúng | — |
| 27 tên look còn lại | doc 74/75 | Chưa đối chiếu từng dòng | [CHƯA KIỂM LẠI] |
| Cột Vai | `tools/sim/candidates/*.yml` `role` (§0) | Chưa đối chiếu từng tướng | [CHƯA KIỂM LẠI] |
| "Đổi tên chiêu" | §1–§3 | Không có câu đổi tên chiêu; chiêu viết lại lấy từ audit-18/b, ghi là đề xuất ở §0 | — |
| Số Lab | §0: PASS_MODEL, mẫu nhỏ, chưa `all --n 200` | Đúng nhãn; không phải PASS_ENGINE | — |
| "4 loại rig lạ" cần spike (§6 câu 3) | không có báo cáo rig trong 85 | Khẳng định không nguồn | [CHƯA NGUỒN] |
| "9 chỗ hình học + 2 reset" Lab (§6 câu 5) | không dẫn file | Khẳng định không nguồn | [CHƯA NGUỒN] |

Tổng: 9 điểm, 0 sai, 2 [CHƯA NGUỒN], 2 chưa kiểm lại.


## §7 Audit Savi 11-10 · PASS_MODEL

Đối chiếu từng điểm doc 85 nêu với nguồn gốc (doc 03, doc 76, comment candidate, legacy `data/legacy-source/kits.yml`). Không đổi số sát thương/HP/hồi chiêu/tầm/bán kính. `scripts/`, `places/`, `heroes.yml` không đụng.

| # | Điểm | Nguồn | Doc 85 | Sửa |
|---|---|---|---|---|
| 1 | cot_ben RMB vùng tròn r3,5 | doc 03 §11 "nón độc"; legacy Gut Crush angle 100 (kits.yml ~298) | ĐÚNG | `arc: 100`; tâm nón ở chân (doc 76), r 3,5 giữ |
| 2 | sam_kha RMB 1 đường rộng 3,2 | doc 03 §13 hai nhánh; legacy Twin Rams count 2 spread 12 (kits.yml ~336) | ĐÚNG | `fan: {count: 2, spread: 12}`; width 3,2 giữ nhưng nay là mỗi nhánh — TBD (legacy 1,8) |
| 3 | mac_lien Q phải quạt 3 đạn | candidates/mac_lien.yml:13 "ba luồng mực **điều hướng**, mỗi luồng trúng một lần"; quạt chỉ có ở doc 85:178 (đề xuất) | SAI/không có nguồn — quạt là đề xuất thiết kế mới, nguồn là ba luồng điều hướng; `hits: 3` khớp | không sửa |
| 4 | han_chi E vùng tròn r4,5 | doc 03 §20 "nón hơi lạnh"; legacy Rimebreath cone angle 50 (kits.yml ~484) | ĐÚNG | `arc: 50` |
| 5 | nanh_nui Q vùng tròn r4 | doc 03 §16 khiêu khích theo nón; legacy Pit Roar cone angle 100 (kits.yml ~418) | ĐÚNG | `arc: 100` |
| 6 | trac_nham RMB phải hai đường giao | candidates/trac_nham.yml:25 "hai vết nứt chéo khép lại tại điểm chọn"; doc 03 §23 | ĐÚNG | engine `lines`; TEMP ±45°, width 1,6 (=Q), length 5,6 (=2r) — nguồn không có số |
| 7 | trac_nham R phải ba đường | candidates/trac_nham.yml:44 "ba đường nứt"; doc 03 §23 | ĐÚNG | `lines` 0/±60°, width 1,6, length 9 — TEMP |
| 8 | van_an Q phải nón | candidate comment "hình liềm rộng phía trước"; doc 76:24 "chém theo hướng = hình quạt" | ĐÚNG | `aim: area, radius 4,5 (= tầm cũ), arc 90` — góc TBD, TEMP |
| 9 | lam_nghi Q phải quạt 3 đạn | candidates/lam_nghi.yml:14 "tia sao rẽ nhánh xuyên hàng" (không số nhánh); quạt 3 chỉ ở doc 85:82 ("viết lại") | SAI/không có nguồn — là đề xuất viết lại, không phải lỗi mô hình | không sửa |
| 10 | thach_ho E thiếu cung chắn đạn | doc 03 §22; comment candidate thach_ho ghi chặn đạn chưa mô hình | ĐÚNG về thiếu | NOT_MODELED: Lab không mô phỏng đạn bị chặn; không bịa |
| 11 | tinh_loi RMB lướt về địch | doc 03 §4 nhảy tới đồng minh; legacy Sheltering Step guard: ally (kits.yml ~135); comment candidate | ĐÚNG | engine `dash.to: ally` (tổng quát: tới đồng minh gần địch nhất trong tầm lướt; không có đồng minh thì không lướt). Khiên chia: chưa mô hình |
| 12 | thach_ho RMB lướt về địch | doc 03 §22 + comment dòng 2 candidates/thach_ho.yml | ĐÚNG | `dash.to: ally` |
| 13 | ngu_dang/thach_ho cdr_on_hit không trần → 8 lần/combo | engine.mjs autoAttack: rút cd mỗi đòn đánh trúng; live `kitmech.cdrOnHit` cũng không trần. Nguồn không ghi trần | MỘT PHẦN: "8 lần" = 8 đòn đánh thường trong combo, mỗi đòn 1 lần, đúng như live | field tổng quát `minGap` (s, mặc định không có = hành vi cũ); ngu_dang/thach_ho `minGap: 0.5` ĐỀ XUẤT. Ghi chú: ngu_dang comment 0,5 s nhưng số 0.8 — không đổi |

Engine (`tools/sim/engine.mjs`): cone area nay tâm ở chân người dùng (trước: điểm cách `range` về phía địch); thêm `lines`, `dash.to: ally`, `passive.minGap`. Tất cả mặc định giữ hành vi cũ cho tướng đang chơi.

**Kiểm:** `validate.mjs` không lỗi · parity 162/162 → 162/162, deterministic, PASS_MODEL · `run.mjs combo --cand --n 100` (theory / newbie % máu, % hạ):

| Tướng | trước | sau |
|---|---|---|
| cot_ben | 32,1 / 30,8 · 0 | 32,1 / 30,2 · 0 |
| sam_kha | 38,2 / 31,9 · 0 | 38,2 / 31,8 · 0 |
| han_chi | 67,6 / 46,4 · 5 | 67,6 / 46,3 · 5 |
| nanh_nui | 29,3 / 28,5 · 0 | 29,3 / 28,5 · 0 |
| trac_nham | 68,3 / 36,0 · 4 | 68,3 / 36,0 · 4 |
| van_an | 72,4 / 34,4 · 19 | 72,4 / 34,6 · 19 |
| thach_ho | 43,7 / 22,5 · 0 | 43,0 / 22,3 · 0 |
| tinh_loi | 76,0 / 30,1 · 14 | 76,0 / 28,0 · 14 |
| ngu_dang | 43,5 / 20,0 · 0 | 43,5 / 20,0 · 0 |

Combo là 1 đấu 1 nhắm thẳng mục tiêu nên nón/đường/quạt gần như không đổi số; khác biệt hình học chỉ lộ ở giao tranh nhiều người (chưa chạy). Cờ đỏ passive:cdr 171+171 giữ nguyên vì trần 0,5 s không chặn một lần mỗi đòn đánh — cờ này đo số đòn, không phải lỗi reset. Tổng cờ đỏ 389 → 389.

### §7.1 Creator duyệt đề xuất 11-10 ("làm theo đề xuất") · PASS_MODEL

Chỉ ở Lab candidate, không đụng `scripts/`, `heroes.yml`, `places/`.

| Tướng | Chiêu | Trước | Sau |
|---|---|---|---|
| mac_lien | Q Ba Nét | 1 đường rộng 2,4, `hits: 3` | `fan: {count: 3, spread: 30, oncePerTarget: false}`, width 1,4 TEMP/luồng (nay 0,8 TEMP theo §7.2, candidate mac_lien.yml:15) (đã sửa §8): gần (≤ 3,4 m) thì 3 luồng cùng trúng, khe mở từ 6,7 m (§7.2); sát thương mỗi luồng giữ |
| lam_nghi | Q Chạc Trời | 1 đường rộng 2,4 xuyên | `fan: {count: 3, spread: 30, oncePerTarget: true}`, width 1,4 TEMP (nay 0,8 TEMP theo §7.2, lam_nghi.yml:16) (đã sửa §8), giữ xuyên + trói 1,2 s; một thân trúng một lần |
| ngu_dang, thach_ho | passive cdr_on_hit | `minGap 0.5` ĐỀ XUẤT | `minGap 0.5` đã duyệt |

Kiểm: `validate.mjs` exit 0 · `run.mjs combo --cand --n 100`, trung bình theory / newbie % máu, số ca hạ (theory), 171 cặp mỗi tướng:
mac_lien 59,9 / 46,2 · 3 · lam_nghi 56,7 / 22,7 · 3 · ngu_dang 43,5 / 20,0 · 0 · thach_ho 43,0 / 22,3 · 0. Không có số "trước" cùng phép đo cho mac_lien/lam_nghi (lượt audit trên không chạy hai tướng này). Tổng cờ đỏ 389 không đổi: cờ passive:cdr "8 lần/combo" đếm 8 đòn đánh, minGap 0,5 s không chặn vì nhịp đánh chậm hơn 0,5 s; đây là cờ đo, không phải lỗi reset. Width 1,4 và spread 30 là TEMP, chờ Lab giao tranh nhiều người. NOT_TESTED trong engine.

### §7.2 Savi tự audit §7.1 (11-10) · PASS_MODEL
- **Lỗi đề xuất của chính Savi:** width 1,4/luồng + spread 30° làm quạt gần như liền khe tới 9 m (khe chỉ mở khi `d·tan15° > w + 2r`). Câu "xa thì né được" ở §7.1 SAI trong tầm 10 m; quạt 1,4 còn rộng hơn đường 2,4 cũ (hàng ngang 3 tướng cách 2 m @6 m: 3/3 so với 1/3; ngắm lệch ±2 m: 99% so với 85%). Trái doc 76 "khe không trúng gì" và trái mục tiêu doc 85 dòng 60 (sửa Lab cho HẸP lại đúng tooltip).
- **Sửa (TEMP, chỉ candidate):** width 0,8/luồng cho mac_lien Q và lam_nghi Q. Khe mở từ 6,7 m; Mặc Liên 3 luồng cùng trúng một thân chỉ khi ≤ 3,4 m (trước 4,5 m). Mốc so sánh: Nhạm Vũ Q 0,5 (khe 5,6 m).
- Kiểm: `validate.mjs` 0 · parity 162/162 deterministic (sau sửa) · `team --cand --n 600` ba bản đường 2,4 / quạt 1,4 / quạt 0,8: chênh lệch nằm trong nhiễu (n ≈ 70/tướng/cỡ đội), giao tranh 22–27 s như nhau ⇒ bộ team không đủ nhạy với hình học Q; quyết định theo phép đo hình học. Bản đường 2,4 của mac_lien thiếu `hits: 3` nên không dùng làm mốc số.
- Phát hiện riêng, KHÔNG tự chỉnh: Lam Nghi đội thắng 30–40% ở 2v2/3v3/5v5 cả ba bản (cờ orange) ⇒ vấn đề nằm ngoài Q; đưa vào lượt Lab kit Lam Nghi.
- NOT_TESTED engine. Width 0,8 vẫn TEMP tới khi có test ngắm thật trong trận.

### §8 Audit nguồn 85–86 (Savi, 11-10)

Mở từng file nguồn trong cây; không đổi số gameplay. Câu SAI đã sửa tại chỗ, có ghi "(đã sửa §8)".

| # | doc:dòng | khẳng định | nguồn file:dòng | kết luận |
|---|---|---|---|---|
| 1 | 85:17 | Nguyên lý Cổ Linh (doc 74/84) | 74-thu-vien-tao-hinh.md:1,17 (84 không có cụm này) | ĐÚNG |
| 2 | 85:41–58 | Vai `role` Lab của 18 tướng | tools/sim/candidates/*.yml dòng 4–5 (18/18 khớp) | ĐÚNG |
| 3 | 85:60 | 7 chỗ Lab sai hình học (doc 76) | 76:24 + comment Audit 11-10 trong cot_ben.yml:27, sam_kha.yml:24, han_chi.yml:41, nanh_nui.yml:17, trac_nham.yml:28,47, van_an.yml:15, mac_lien.yml:13 | ĐÚNG |
| 4 | 85:287 | Template R doc 79 §4, 10 kiểm thử §3 | 79-chuan-ultimate.md:24,30 | ĐÚNG |
| 5 | 85:299 | doc 74 §Ghép từng gợi ý 006 cho tam_vu | 74:1166,1190 | ĐÚNG |
| 6 | 85:294,312 | DUYET-TAO-HINH-18 có 18 tướng | DUYET-TAO-HINH-18.md:21–38 | ĐÚNG |
| 7 | 85:321 | 18 tên tướng có trong doc 03 | 03-danh-sach-tuong.md:43–251 | ĐÚNG |
| 8 | 85:340 | cot_ben RMB là nón 100° | 03:129 'nón độc'; legacy-source/kits.yml:298; cot_ben.yml:27 | ĐÚNG |
| 9 | 85:341 | sam_kha RMB hai nhánh, spread 12 | 03:145; kits.yml:336; sam_kha.yml:24 | ĐÚNG |
| 10 | 85:342 | mac_lien Q quạt 3 luồng | mac_lien.yml:13,16 | ĐÚNG |
| 11 | 85:343 | han_chi E nón 50° | 03:201; kits.yml:484; han_chi.yml:41 | ĐÚNG |
| 12 | 85:344 | nanh_nui Q nón 100° | 03:169; kits.yml:418; nanh_nui.yml:17 | ĐÚNG |
| 13 | 85:345 | trac_nham RMB hai đường giao ±45°, w1,6 | trac_nham.yml:25,28; 03:225 | ĐÚNG |
| 14 | 85:346 | trac_nham R ba đường 0/±60°, length 9 | trac_nham.yml:44,47 | ĐÚNG |
| 15 | 85:347 | van_an Q là nón | van_an.yml:14–15; 76:24 (góc 90 TEMP, van_an.yml:18) | ĐÚNG |
| 16 | 85:348 | lam_nghi Q quạt 3 tia | lam_nghi.yml:14,17 | ĐÚNG |
| 17 | 85:349 | thach_ho E chắn đạn chưa mô hình | 03:217; thach_ho.yml:2,36 | ĐÚNG |
| 18 | 85:350 | tinh_loi RMB nhảy tới đồng minh | 03:73; kits.yml:135 (guard: ally); tinh_loi.yml:32 | ĐÚNG |
| 19 | 85:351 | thach_ho RMB lao tới đồng minh | 03:217; thach_ho.yml:2,33 | ĐÚNG |
| 20 | 85:352 | cdr_on_hit không trần (engine.mjs, live kitmech) | chỉ có trong tools/sim/engine.mjs & scripts/lib/kitmech.js — ngoài danh sách nguồn audit; minGap ở ngu_dang.yml:11/thach_ho.yml:12 là phần sau | KHÔNG NGUỒN |
| 21 | 85:378–379 | §7.1 Q quạt width 1,4 TEMP/luồng | mac_lien.yml:15, lam_nghi.yml:16: width 0.8 TEMP (đổi ở §7.2) | SAI → đã sửa |
| 22 | 85:379 | lam_nghi giữ xuyên + trói 1,2 s | lam_nghi.yml:25 | ĐÚNG |
| 23 | 85:380 | minGap 0.5 đã duyệt | ngu_dang.yml:11; thach_ho.yml:12 | ĐÚNG |
| 24 | 86:4 | Số mét chỉ từ doc 07/manifest | cuu-mach-manifest.yml:1–4 | ĐÚNG |
| 25 | 86:27 | Mạch Đăng 6–8 đèn ứng viên | 61:26 | ĐÚNG |
| 26 | 86:84 | Đi bộ gate→gate ≈79 s / 54 s | 80:44 | ĐÚNG |
| 27 | 86:108 | Camp ngừng khi Titan đi (08 §5–6) | 08:167,172 (§6.3) | ĐÚNG |
| 28 | 86:110 | Calculator doc 31: clear camp 12–32 s/1 tướng | 31:73 | ĐÚNG |
| 29 | 86:131 | objectives.yml rings.cuu_mach r18 khớp 07 | scripts/lib/data/objectives.yml:12; 07:48–51 | ĐÚNG |
| 30 | 86:144 | minimap ứng viên 182 = config half extent, phủ clamp ±180 | manifest:16–18 | ĐÚNG |
| 31 | 86:145 | Mực nước trong (−3,2; 0) | manifest river.floor_y −3,2 | ĐÚNG |
| 32 | 86:148 | lane 480,3/326,4/480,3 m | manifest:61,65,69; 80:44 | ĐÚNG |
| 33 | 86:152 | jungle.respawn_s chưa có số | manifest:114 (TBD) | ĐÚNG |
| 34 | 86:181 | M1 camera 27 §7 (17 m, 11–26) ↔ yml (11, 8–26) | 27:88 (§7); camera.yml:3–5; 80:79 | ĐÚNG |
| 35 | 86:182 | M2 map.yml là Mạch Giữa, extent 88 | 07:131; map.yml:3 | ĐÚNG |
| 36 | 86:183 | M3 07 §4 không spawn quái trong pit | 07:51,133 | ĐÚNG |
| 37 | 86:184 | M4 'Mạch Giữa' lane trong 02 §3 | 02-ban-do-va-my-thuat.md:51 | ĐÚNG |
| 38 | 86:185 | M5 nguồn '07 §5 ↔ 02 §3' | tên camp ở 07:60,62 (§5), tên pit ở 07:48–49 (§4); 02 §3 không có các tên này | SAI → đã sửa (07 §5 ↔ 07 §4) |
| 39 | 86:186 | M6 respawn_s ↔ 08 §6.3 camp lock | manifest:114; 08:167,172 | ĐÚNG |
| 40 | 86:213 | lane rộng 18/14/14 | manifest:59,63,67: Thượng 14 / Giữa 18 / Hạ 14 | SAI → đã sửa |
| 41 | 86:217 | Hải Tâm không thủy triều | 81:6,109 | ĐÚNG |
| 42 | 86:221 | river_serpent 'camp sông' chưa có vị trí doc 07 | 31:27 | ĐÚNG |
| 43 | 86:225 | Titan trồi chỉ có cho Mạch Giữa (35 §3) | 35:44–50; 80:50; manifest:96 | ĐÚNG |
| 44 | 86:232 | Controller từ chối dốc > 45° | engine-reference/skills/heightmap-terrain.md:38 | ĐÚNG |

- ĐÚNG: 40/44
- SAI: 3/44 (85:378–379 width quạt; 86:185 nguồn M5; 86:213 thứ tự bề rộng lane) — đã sửa
- KHÔNG NGUỒN: 1/44 (85:352 cdr_on_hit không trần: chỉ có trong engine.mjs/kitmech.js)
