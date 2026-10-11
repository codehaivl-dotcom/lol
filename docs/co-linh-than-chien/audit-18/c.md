# Audit-18 · Lane c · Tam Dấu, Thạch Hộ, Trắc Nham, Sắc Nhiên, Sa Tẫn, Vân Ấn

Chỉ audit: không đổi runtime, candidate hay tài liệu dùng chung. Tạo hình lấy từ nhóm **H–J** của doc 74 (lane c). Không có look nào ở đây trùng với 8 prototype trong doc 75 (021, 023, 011, 062, 002, 022, 051, 053) hay với Bách Diện (Vũ Công Gương Đồng). Gợi ý ở bảng ghép roster doc 74 (vd 021 cho Vân Ấn, 059/052 cho Sắc Nhiên) **không dùng**: 021 đã nằm trong doc 75, còn 059/052 thuộc nhóm F của lane b.

**Lab (rev `c3d6603306f2`, cờ `--cand`, roster = 6 tướng lane c + 8 tướng chơi được + Bách Diện):**
- `duel` n=40, phút 6/10 → FLAG
- `combo` n=50, phút 6/10/full → FLAG_RED
- `team` n=40, phút 10 → FLAG (giao tranh 5v5 trung bình 34,9 s, ngoài dải 6–30 s, áp chung cho mọi tướng)

Toàn bộ kết quả là **PASS_MODEL / chưa PASS_ENGINE**. Báo cáo duel chỉ có winrate, không có TTK theo cặp. Vì vậy "TTK" dưới đây dùng % máu một combo gây ra (combo dài 12 s) và độ dài giao tranh của suite team.
Ngưỡng doc 73: 1v1 45–55%, không cặp nào vượt 70/30. Tank và Support xét theo giá trị cho đội (team suite), không xét duel.

Lab chung chưa kiểm tra (NOT_TESTED): địa hình, tầm nhìn, bụi cỏ, đạn bị thân chặn (trừ passMinions); crit/hút máu/sát thương chuẩn/phản sát thương/silence.

---

## 1. Tam Dấu (`tam_dau`) · Hỗ trợ khống chế

**Gap.** Hiện có:
- Kit ứng viên `tam_dau.yml`: ba dấu Sương/Đá/Gió, R Lời Đáp.
- Doc 03 §21: thực thể tiên tri ba lõi + hai avatar tinh thể.
Chưa có: tạo hình doc 74, prototype sheet, model Blender, rig, clip, VFX/SFX riêng, runtime (heroes.yml). Lab chưa mô hình hóa trạng thái dấu và tổ hợp dấu ở R.
Cần làm, theo thứ tự: chọn look → viết lại kit → Lab → Blender, rig, 6 clip → VFX/SFX → runtime.

**Tạo hình.**
- **085 Sứa Chuông** *(đề xuất)*: hỗ trợ có tua chích choáng và nhịp sáng. Chuông đập nhịp đúng là "ba điềm" phát ra thành ba nhịp. Silhouette treo/trôi, không trùng tướng chơi được nào.
- **074 Tiếng Vọng**: hỗ trợ sóng âm, miệng ở ngực. Ba dấu = ba tiếng vọng. Rủi ro: trùng R sao chép của Kính Ngôn, và silhouette kém rõ ở 64 px.
- Giải thích theo thế giới COLINH: một Cổ Linh biển ký ức, chuông lưu ba nhịp của cùng một trận đánh. Đông Sơn chỉ là vân trống mờ trên chuông.

**Skill fit (085).**
- Giữ nguyên ý (đổi tên/nguồn):
  - LMB → *Giọt Lân*: tua búng giọt sáng, đạn là vật thật.
  - Q Dấu Sương → *Tua Chích*: tua phóng thẳng, đánh dấu và làm chậm. Skillshot đường thẳng, khớp doc 76.
- Viết lại (2):
  - **RMB Dấu Đá → *Chuông Rơi***: một chuông sứa rơi trễ xuống vùng tròn 2,4 m, choáng. Khối đá không còn hợp hình sứa.
  - **E Dấu Gió → *Nhịp Đẩy***: chuông co bóp thành xung tròn quanh thân, đẩy lùi kẻ áp sát và phủ màng khiên lên đồng minh gần.
- Hình học: E radius 4.5 quanh thân là AoE tròn, đúng doc 76. Không có cone hay fan.
- **R Lời Đáp**: đã có ba nhịp và trói. So với doc 79 thì thiếu signature: cần ba chuông con bung từ thân, mỗi nhịp mang màu dấu đã dùng, nhịp ba là đỉnh. Phần đọc tổ hợp dấu phải được mô hình hóa trước khi coi là đạt. → **R đạt một phần.**

**Stat.**
- Duel: 23,0% (phút 6) / 22,7% (phút 10). Bị Thạch Hộ, Trắc Nham, Vân Ấn, Mộc Lam thắng 100%.
- Team: 3v3 50,0%, 5v5 41,2%.
- One-Combo: tối đa 104,1% máu (Nham Vũ, kịch bản target-behind, phút 6) và 104,9% (phút 10) → **WARN** (giết được từ sau lưng, không giết được khi cùng cấp). Newbie đạt tới 98%.
- Kết luận: UP ở 5v5 với vai Support (41%, dưới dải).
- NOT_TESTED: trạng thái dấu, tổ hợp R, khiên gió theo vị trí đồng minh.

---

## 2. Thạch Hộ (`thach_ho`) · Đỡ đòn bảo kê

**Gap.** Hiện có:
- Kit ứng viên: Mảnh Lạnh, Lướt Bảo Hộ, Vách Chắn, Sừng Băng.
- Doc 03 §22: vệ thần dạng rùa/mai.
Doc 74 đã bỏ rùa vì trùng (thay 033 và 090). Chưa có look, prototype, model, rig, clip, VFX/SFX, runtime.
Hai lỗi Lab: chắn đạn chưa được mô hình hóa; RMB thật lướt về phía đồng minh nhưng Lab cho lướt về phía địch.

**Tạo hình.**
- **082 Cá Ông Nam Hải** *(đề xuất)*: Tank lưng cá voi đứng, H/W 1,7, khối lớn nhất roster. "Nâng sóng cứu đồng minh" chính là Lướt Bảo Hộ. Giải thích COLINH: Cổ Linh biển giữ luồng ký ức của người đi biển, không phải thần tín ngưỡng; dáng trang nghiêm.
- **077 Hư Vô**: Tank, "nuốt đạn nhả thành xung" khớp đúng Vách Chắn chắn đạn. Rủi ro: gần Void/Enigma, và thân là khoảng âm nên khó đọc ở 64 px.

**Skill fit (082).**
- Giữ:
  - RMB Lướt Bảo Hộ → *Sóng Đỡ*: cưỡi sóng tới đồng minh và phủ khiên.
  - E Vách Chắn → *Vây Chắn*: vây ngực dựng thành tường trước mặt, chặn đạn.
- Viết lại (2):
  - **Q Mảnh Lạnh → *Vòi Phun***: cột nước phun thẳng, xuyên, hất lùi và làm chậm. Bỏ chất băng.
  - **R Sừng Băng → *Cá Ông Trườn Bãi***: lao bụng dọc đường thẳng 12 m kéo theo sóng, hất tung kẻ trúng, rồi đập bụng tạo sóng chấn choáng ở điểm cuối.
- Hình học vs doc 76: E chắn đạn phải là **cung chắn theo hướng ngắm** (arc + width), không phải khiên tự thân, và hiện không có field. RMB phải `aim: ally`.
- R vs doc 79: R hiện chỉ có một nhịp (lao), thiếu đỉnh và nhịp tàn → **R không đạt**. Bản viết lại có hai nhịp: lướt → đập bụng là đỉnh → sóng tan.

**Stat.**
- Duel: 57,7% / 58,4%, cao với vai Tank nhưng duel không phải thước đo chính.
- Team: 3v3 50,0%, 5v5 54,5% → ổn theo giá trị đội.
- One-Combo: tối đa 90,9% (phút 6), 76,9% (phút 10), không giết → **PASS**.
- **Cờ đỏ**: passive `cdr_on_hit` kích tới 8 lần trong một combo (46 cờ red). Đây là proc bất thường của mô hình/kit, cần sửa trước mọi kết luận cân bằng.
- NOT_TESTED: chắn đạn, hướng RMB tới đồng minh, ram R qua địa hình.

---

## 3. Trắc Nham (`trac_nham`) · Pháp sư khống chế

**Gap.** Hiện có:
- Kit ứng viên: Đường Rạn, Kẹp Chéo, Chống Vách, Ba Đường Đứt.
- Doc 03 §23: golem địa tầng bốn tay đá. Doc 74 ghi "nhiều tay" trùng Tĩnh Lôi/Trắc Nham.
Chưa có look, prototype, model, rig, clip, VFX/SFX, runtime. Lab chưa có vùng tồn tại (đường nứt lưu trên đất, giao điểm).

**Tạo hình.**
- **087 Nhện Dệt Thổ Cẩm** *(đề xuất)*: pháp sư giăng lưới và kéo. "Đường nứt" thành sợi tơ căng trên đất; giao điểm hai sợi là nút lưới. Tám chân thay bốn tay. Giải thích COLINH: Cổ Linh dệt lại bản đồ vết nứt của Mạch Trụ. Hoa văn tự sáng tạo, không chép thổ cẩm của tộc cụ thể; không làm nữ-nhện, không có bầy con.
- **089 Sâu Đất Vành Răng**: chui ngầm, đường hầm trồi thành vết nứt. Rủi ro: doc 74 gán vai Tank, trùng 007/049 và Rek'Sai.

**Skill fit (087).**
- Giữ:
  - Q Đường Rạn → *Sợi Căng*: bắn một sợi tơ thẳng, xuyên, làm chậm.
  - RMB Kẹp Chéo → *Nút Dệt*: hai sợi chéo khép tại điểm chọn, trói ở giao điểm.
- Viết lại (2):
  - **E Chống Vách → *Kén Tơ***: tám chân cuốn kén khiên, sau đó đu tơ lùi tăng tốc.
  - **R Ba Đường Đứt → *Khung Cửi***: căng ba sợi thành khung trên đất; sợi đứt lần lượt rồi nổ, làm chậm nặng.
- Hình học vs doc 76: R hiện là `area radius 4.5` (vòng tròn) nhưng mô tả là ba **đường** → phải là ba line có width. RMB mô hình bằng vòng tròn 2,8 m thay vì hai line giao nhau. Ở hai chỗ này, mô hình và hitbox thật sẽ lệch nhau.
- R vs doc 79: ba nhịp trễ có sẵn; còn thiếu đỉnh (nhịp cuối mạnh hơn) và nhịp tàn → **R đạt cấu trúc, cần thêm đỉnh**.

**Stat.**
- Duel: 40,7% / 37,0% → hơi UP.
- Team: 3v3 38,6%, 5v5 42,9%.
- One-Combo: **FAIL**. Giết Nham Vũ khi cùng cấp, 107,1% (phút 6) và 107,6% (phút 10); 7 band "high". Combo dồn mạnh nhưng duel/team thấp → kit nặng burst, yếu duy trì.
- NOT_TESTED: vùng nứt tồn tại, kẹp giao điểm, R dạng line.

---

## 4. Sắc Nhiên (`sac_nhien`) · Pháp sư dồn sát thương (vùng)

**Gap.** Hiện có:
- Kit ứng viên: Vàng Vỡ, Neo Hồng, Lướt Lục, Tranh Lớn.
- Doc 03 §24: pháp sư pigment, mặt kính màu.
Chưa có look, prototype, model, rig, clip, VFX/SFX, runtime. Lab chưa có vùng màu lưu trên đất và chồng màu.

**Tạo hình.**
- **084 Mực Ống Lân Quang** *(đề xuất)*: pháp sư phun mực, xúc tu chộp (= Neo Hồng kéo), phụt phản lực (= Lướt Lục). Màu lân quang đổi sắc là "pha màu". Mực phải lân quang nhiều màu, không đen (để không trùng Mặc Liên). Giải thích COLINH: Cổ Linh vực sâu chuyển dữ liệu trận thành ánh màu.
- **073 Bầy Đom Đóm**: chấm sáng tụ thành vùng màu. Rủi ro: doc 74 gán vai Xạ thủ, và hạt đốn perf trên điện thoại.

**Skill fit (084).**
- Giữ:
  - RMB Neo Hồng → *Xúc Tu Chộp*: xúc tu phóng thẳng, kéo 3 m rồi ghim.
  - E Lướt Lục → *Phụt Lân*: phụt phản lực xuyên đường thẳng.
- Viết lại (2):
  - **Q Vàng Vỡ → *Phun Mực Lân***: phun mực sáng vào vùng tròn 3 m, để lại vệt màu; sát thương kế tiếp kích nổ.
  - **R Tranh Lớn → *Bức Lân Quang***: mực lan thành vùng 6 m, các vệt màu đã phủ hút về tâm, rồi một nhịp chớp sáng kích nổ và làm chậm.
- LMB Búng Màu → *Giọt Mực*: đạn vật thật, giữ.
- Hình học: Q tròn đúng. R gom màu cần mô hình vùng tồn tại. Không có cone hay fan.
- R vs doc 79: gom → nổ là hai nhịp có đỉnh → **đạt nếu thêm nhịp tàn** (mực phai).

**Stat.**
- Duel: 19,8% / 21,1% → **UP nặng** với vai burst.
- Team: 3v3 45,0%, 5v5 60,0%. Team cao còn duel rất thấp: sát thương vùng có giá trị khi đánh nhóm.
- One-Combo: tối đa 88,8% (phút 6), 83,2% (phút 10), không giết → **PASS**, nhưng thấp với vai burst. Newbie 83%.
- NOT_TESTED: vùng màu, chồng màu.

---

## 5. Sa Tẫn (`sa_tan`) · Hỗ trợ hồi phục/khống chế theo thời điểm

**Gap.** Hiện có:
- Kit ứng viên: Dấu Giờ, Vòng Cạn, Quay Hạt, Mạch Đảo.
- Doc 03 §26: thực thể cát-thời gian, đồng hồ sống.
Chưa có look, prototype, model, rig, clip, VFX/SFX, runtime. Lab chưa mô hình hóa đúng: tích hạt, quay về điểm đặt (Lab dùng "lùi 5 m"), hồi theo sát thương lên dấu.

**Tạo hình.**
- **078 Người Mộng** *(đề xuất)*: hỗ trợ bay nằm ngang trên gối mây, silhouette ngang duy nhất trong roster. Quay Hạt thành "tỉnh dậy ở chỗ vừa thiếp đi". Mạch Đảo thành ru ngủ cả vùng = đóng băng thời gian. Chọn một chất (ngủ), bỏ bong bóng để tránh Lillia/Nami. Giải thích COLINH: Cổ Linh lưu giấc mơ cuối của thành phố trước Đại Tịch.
- **072 Ký Ức Vỡ**: "tua lại vị trí ngắn" khớp Quay Hạt. Rủi ro: Ekko, Kính Ngôn, và doc 74 gán vai Pháp sư.

**Skill fit (078).**
- Giữ:
  - Q Dấu Giờ → *Dấu Mộng*: đánh dấu địch, chữa đồng minh yếu nhất.
  - E Quay Hạt → *Tỉnh Giấc*: quay về điểm mộng đã đặt, gỡ chậm/trói, hồi quanh.
- Viết lại (2):
  - **RMB Vòng Cạn → *Gối Mây Xoáy***: vòng mây ru nặng ba nhịp, làm chậm. Bỏ chất cát.
  - **R Mạch Đảo → *Giấc Dài***: vùng 5 m chìm vào mộng; địch đóng băng, đồng minh hồi theo nhịp; cuối cùng là tiếng thức dậy.
- Passive Đá Chốt → *Hạt Mộng* (hạt thứ tư ru trói ngắn): đổi tên, giữ cơ chế.
- Hình học: tất cả là AoE tròn hoặc target, đúng doc 76.
- R vs doc 79: R hiện một nhịp (đóng băng + chữa) → **R không đạt**. Cần có cast (ngáp/ru), duy trì vài nhịp hồi, đỉnh là đóng băng, nhịp tàn là thức dậy.

**Stat.**
- Duel: 33,8% / 27,9%.
- Team: 3v3 25,0% (**UP**), 5v5 48,1% (đạt với vai Support).
- One-Combo: 104,9% Nham Vũ target-behind ở phút 6 → **WARN**; phút 10 92,5%. `comboCooldown 0` trong báo cáo cho thấy combo mô hình có thể chưa tính R → cần kiểm tra lại.
- NOT_TESTED: tích hạt, quay về điểm đặt, hồi theo sát thương lên dấu.

---

## 6. Vân Ấn (`van_an`) · Đấu sĩ dồn sát thương

**Gap.** Hiện có:
- Kit ứng viên: Chém Hồi Văn (chuỗi ba nhát đại đao), Liềm Mạch, Bổ Thiên Thạch, Lướt Ấn, Vòm Dấu.
- Doc 03 §27: kiếm sĩ người thường, giáp nhẹ. Đây là đúng kiểu "người thường" mà luật mới bỏ.
Chưa có look, prototype, model, rig, clip, VFX/SFX, runtime. Lab chưa mô hình hóa vùng bảo hộ đồng minh của R; R chỉ được mô hình là khiên + tăng tốc cho bản thân.

**Tạo hình.**
- **096 Người Một Chân** *(đề xuất)*: đấu sĩ nhảy lò cò xa (= Bổ Thiên Thạch), xoay một chân (= Liềm Mạch), búa đá. Rig gần người, chi phí thấp. Giải thích COLINH: Cổ Linh giữ cọc mốc của Mạch Trụ, chứ không phải tượng thờ Độc Cước.
- **083 Cua Đồng Một Càng**: càng lớn chém cleave, lướt ngang. Rủi ro: rig mười chân, cao 1,4 m dễ khuất trong giao tranh.

**Skill fit (096).**
- Giữ:
  - RMB Bổ Thiên Thạch → *Dậm Lò Cò*: nhảy xa bổ xuống, choáng.
  - E Lướt Ấn → *Nảy Khắc*: nảy xuyên mục tiêu, khắc ấn.
- Viết lại (3):
  - **LMB đại đao → *Búa Mốc*** (chuỗi ba nhát búa đá).
  - **Q Liềm Mạch → *Xoay Một Chân***: xoay quanh chân trụ, quét **cone** phía trước, xuyên, làm chậm.
  - **R Vòm Dấu → *Cắm Mốc Mạch***: nhảy cao, cắm thân xuống làm cọc. Vùng mốc 4 m gây sát thương khi đáp, rồi giữ khiên + tốc đánh cho đồng minh trong vùng, cuối cùng nổ tàn.
- Hình học vs doc 76: Q "quét liềm rộng phía trước" đang là `aim: skillshot range 4.5` → **sai loại**. Đây là cone AoE (arc + range), không phải đạn đường thẳng.
- R vs doc 79: buff tự thân, không có đỉnh hay khoảnh khắc nhận diện → **R không đạt**.

**Stat.**
- Duel: 73,6% / 71,6% → **OP**.
- Team: 3v3 45,5%, 5v5 48,7%.
- One-Combo: **FAIL**. Giết 4–5 mục tiêu ở phút 6, gồm Sắc Nhiên cùng cấp (107,8%), Hỏa Tủy và Nham Vũ; 9 cờ orange.
- NOT_TESTED: vùng bảo hộ đồng minh của R, tích dấu từ nhát thứ ba.

---

## Tổng kết lane c

| Tướng | Tạo hình đề xuất (doc 74) | Skill cần viết lại | R đạt? | Lab (duel ph6 · 5v5 · One-Combo) | Rủi ro |
|---|---|---|---|---|---|
| Tam Dấu | 085 Sứa Chuông (dự phòng 074) | 2 (RMB, E) | một phần: thiếu signature, tổ hợp chưa mô hình | 23,0% · 41,2% · WARN 104% | UP vai Support; dấu chưa có trong Lab; perf phần trong suốt |
| Thạch Hộ | 082 Cá Ông Nam Hải (dự phòng 077) | 2 (Q, R) | không: một nhịp | 57,7% · 54,5% · PASS 91% | **cờ đỏ** passive CDR 8 proc; chắn đạn và RMB sai hướng trong Lab |
| Trắc Nham | 087 Nhện Dệt Thổ Cẩm (dự phòng 089) | 2 (E, R) | có cấu trúc, cần đỉnh | 40,7% · 42,9% · **FAIL** 107% | R/RMB là line nhưng đang mô hình bằng vòng tròn; nhạy cảm hoa văn |
| Sắc Nhiên | 084 Mực Ống Lân Quang (dự phòng 073) | 2 (Q, R) | đạt nếu thêm nhịp tàn | 19,8% · 60,0% · PASS 89% | UP duel nặng; vùng màu chưa có trong Lab |
| Sa Tẫn | 078 Người Mộng (dự phòng 072) | 2 (RMB, R) | không: một nhịp | 33,8% · 48,1% · WARN 105% | combo cd 0 (R có thể chưa tính); trùng Lillia; 3v3 25% |
| Vân Ấn | 096 Người Một Chân (dự phòng 083) | 3 (LMB, Q, R) | không: buff tự thân | **73,6% OP** · 48,7% · **FAIL** 108% | Q sai loại (skillshot → cone); R chưa mô hình vùng |

Lane c không phải mượn nhóm khác: cả 6 look đề xuất và 6 look dự phòng đều thuộc nhóm H–J. Mọi số liệu ở đây là PASS_MODEL, chưa có PASS_ENGINE. Không tune trong audit này.
