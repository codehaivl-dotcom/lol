# GAP — Gameplay Mạch Giữa (2026-10-07)

Kết luận chung: **chưa chơi được**. Lobby → vào trận đã chạy, nhưng trong trận thiếu điều khiển, thông tin và độ rõ.

## A. Đánh giá của lukasai (nguyên văn)
- “màn đấu + map cần polish nhiều. HUD cũng phải làm lại. Tóm lại toàn bộ gameplay đang quá nhiều gap, chưa chơi được”
- “HUD che khuất, ASWD ko thích hợp với màn hình bị khóa. Skill ko nhìn rõ”
- “map ko có định hướng, ko bản đồ nhỏ”

## B. Tự đánh giá của Savi (nhìn màn hình lukasai + đọc code)
| # | Gap | Nguyên nhân thấy được | Mức |
|---|-----|------------------------|-----|
| B1 | HUD trải ngang đỉnh màn hình, che tầm nhìn | `.plate{position:relative}` trong ui-theme đè class `absolute` → mọi khung HUD xếp chồng ở trên, rộng 1828px | Chặn chơi |
| B2 | Đốm sáng trắng to trên đường | `ringFx` blast dùng `n=1` (giữ mãi) cho đèn chớp → mỗi chiêu nổ để lại 1 đèn vĩnh viễn (123 cái) | Chặn chơi — **đã sửa** |
| B3 | WASD + camera khóa = sai thể loại | player.js đi theo trục phím tương đối camera; không có click-to-move | Chặn chơi |
| B4 | Không thấy tầm chiêu / hướng chiêu | Không có vòng tầm, mũi tên, vùng AoE trước khi tung; chiêu bắn ngay khi nhấn | Cao |
| B5 | Không có minimap, không định hướng | HUD không vẽ bản đồ; không biết trụ/nhà chính/địch ở đâu | Cao |
| B6 | Map tối, vách đá nâu nuốt sáng, cỏ đen | Giờ 16.6 + vách 15 m đổ bóng lên hành lang; tỉ lệ sáng khung ~2^-4 | Cao |
| B7 | Tướng người chơi là hình nộm trắng | Thân người chơi chưa mặc model tướng trong trận (chỉ gắn vũ khí) | Cao |
| B8 | Lính nhỏ, khó phân biệt phe; không có thanh máu chuẩn MOBA trên lính/trụ | — | Trung bình |
| B9 | Không có chỉ báo click (đi / đánh), không có vòng chọn mục tiêu | — | Trung bình |
| B10 | Đường đi thẳng, hai bên trống — chưa có bụi, rừng, mốc nhận biết | map 1 đường, chưa dress | Trung bình |

## C. Thứ tự sửa
1. [x] B2 đèn rò.
2. [~] B1 + HUD mới kiểu LoL: thanh kỹ năng gọn đáy giữa, minimap góc dưới phải, điểm số gọn góc trên phải.
3. [~] B3 điều khiển LoL (desktop): **chuột phải** = đi / đánh mục tiêu; **Q W E R** = chiêu theo con trỏ; **D/Space** = né về con trỏ; **F** di vật; **B** về nhà; **P** cửa hiệu. Điện thoại giữ cần analog + nút AOV.
4. [~] B4 chỉ báo chiêu: giữ phím → hiện vòng tầm + hướng/vùng; nhả → tung. Chuột phải khi đang ngắm = huỷ.
5. [~] B5 minimap: đường, trụ, nhà chính, tướng mình/địch, lính, khung camera; click minimap để đi tới.
6. [~] B6 ánh sáng + độ rõ map: trời 13h, đường đá cát sáng, cỏ trầm, viền đá 2 mép, 36 cột ánh màu phe (lam/đỏ) mỗi 15 m. Còn: mảng tối loang trên cỏ, trụ gãy biến mất hẳn (nên để lại đống đổ nát).
7. [ ] B7 thân tướng có model trong trận.
8. [ ] B8–B10 polish map + lính.

## D. Test (Savi tự chạy, lukasai nghiệm thu)
- HUD không che giữa màn hình ở 1828×860 và 390×844.
- Chuột phải xuống đất → tướng đi tới, vòng xanh; chuột phải lên lính/tướng địch → đuổi + đánh.
- Giữ Q → vòng tầm hiện; nhả → chiêu bay đúng con trỏ.
- Minimap hiện đúng vị trí tướng/trụ.
- Không còn đèn rò sau 5 phút trận.

`[~]` = code đã vào (2026-10-07 tối), **chưa test tận mắt** — tab lukasai đang ẩn, thân Savi không ở trong trận.

## E. Tự đánh giá dưới góc nhìn MOBA — rút kinh nghiệm (Savi)

**Câu hỏi gốc của một MOBA:** trong 3 giây đầu ở đường, người chơi có biết *mình là ai, đang ở đâu, địch ở đâu, chiêu với tới đâu, bấm gì để đi và đánh* không? Bản hiện tại trả lời **không** cho cả 5. Đó là lý do “chưa chơi được”, không phải do thiếu tính năng.

### Sai ở đâu
1. **Làm ngược thứ tự.** Mình dồn sức vào sảnh, chọn tướng, lore, rig vũ khí, VFX demo trên bệ — tức là phần *quanh* trận — trong khi vòng lặp 30 giây trong trận (đi → last-hit → trao đổi chiêu → lùi) chưa từng được chơi trọn một lần. MOBA sống ở vòng lặp đó; sảnh đẹp không cứu được trận dở.
2. **Lấy khung game nhập vai góc 3 người áp vào MOBA.** WASD + chuột trái đánh + chiêu bắn ngay là điều khiển của game hành động. Camera đã khóa kiểu LoL nhưng tay vẫn điều khiển kiểu khác → hai hệ đánh nhau. Đúng ra khóa camera và đổi điều khiển phải là **một** thay đổi.
3. **Không có “ngôn ngữ đọc trận”.** MOBA dạy bằng hình: vòng tầm, vùng AoE trước khi tung, thanh máu trên đầu mọi đơn vị, màu phe nhất quán, minimap. Mình có số liệu cân bằng trong yml nhưng người chơi không *thấy* được con số nào.
4. **Test bằng log, không bằng mắt người chơi.** Mình chạy bot, ép máu Tâm Mạch, đọc state → “luồng chạy được”. Nhưng chưa ngồi ở 1828×860 nhìn màn hình như lukasai. Vì vậy HUD xếp chồng che nửa trên (lỗi `.plate` ghi đè `absolute`) và 123 đèn rò sống sót qua nhiều lượt mà mình không thấy.
5. **Map dựng như cảnh, không như sân đấu.** Vách cao, tối, cỏ đen đẹp khi chụp nhưng che đơn vị và không có mốc định hướng. Sân MOBA cần: đường sáng hơn nền, phe Xanh/Đỏ đọc được từ màu đất, trụ/nhà chính nhìn thấy từ xa, mọi thứ quan trọng đọc được ở góc camera cao.
6. **Người chơi vẫn là hình nộm.** Bot có model tướng, người chơi thì không — người chơi thấy mình kém hơn đối thủ. Đây là thứ MOBA không bao giờ được thiếu.

### Bài học (luật cho các lượt sau)
- **Vòng lặp trước, vỏ sau.** Không làm thêm màn hình/tướng/chiêu cho tới khi 1v1 chơi trọn 10 phút mà vui.
- **Một quyết định thiết kế kéo theo mọi hệ liên quan trong cùng lượt** (camera ↔ điều khiển ↔ ngắm ↔ HUD).
- **Mỗi con số người chơi cần đều phải có hình**: tầm, vùng, máu, hồi chiêu, vị trí.
- **Test = nhìn màn hình thật ở cỡ màn hình của lukasai + chơi đủ 1 trận bằng điều khiển thật**, không ép state. Ép state chỉ dùng để kiểm tra một nhánh cụ thể và phải ghi rõ là ép.
- **Mỗi lượt kết thúc bằng 1 ảnh màn hình trận** trước khi báo “xong”.
- **Tham chiếu LoL/AOV ở mức hệ thống, không chỉ thẩm mỹ**: điều khiển, chỉ báo, minimap, thanh máu, màu phe là quy ước thể loại — đi lệch là người chơi bối rối.

### Đánh giá thẳng mức độ hiện tại (thang 10, so với một bản thử nghiệm MOBA chơi được)
| Hạng mục | Điểm | Ghi chú |
|---|---|---|
| Sảnh / vào trận | 6 | chạy, nhưng còn báo thiếu nút Bắt đầu chưa tái hiện |
| Điều khiển | 2 → ? | vừa đổi sang chuột phải + Q W E R, chưa test |
| Đọc trận (tầm, vùng, máu) | 2 → ? | vừa thêm chỉ báo ngắm, thiếu thanh máu chuẩn trên lính/trụ |
| HUD | 3 → ? | làm lại gọn, chưa test cỡ điện thoại |
| Minimap / định hướng | 0 → ? | vừa thêm, chưa test |
| Map / ánh sáng | 3 | tối, thiếu mốc |
| Nhịp combat (chiêu, cảm giác đánh) | 3 | chưa có một pha trao đổi chiêu thật được kiểm chứng |
| Bot | 5 | farm + lên cấp được, trao đổi chiêu chưa kiểm chứng |
