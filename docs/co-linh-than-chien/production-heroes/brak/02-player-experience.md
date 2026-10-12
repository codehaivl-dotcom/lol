# 02 · Player Experience — #02 Brak (Nhịp Quyền)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#02 / brak`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Tiếp cận & Thăm dò nhịp đấu):**
   - Brak tiếp cận mục tiêu trong cự ly 5.5m, tung **Q (Piston Trực Quyền)**: dậm chân phóng nắm đấm nén áp suất xé gió, gây sát thương vật lý và làm chậm đối thủ 25% trong 1.0 giây.
   - Áp sát vào tầm đánh thường 1.8m, tung 1–2 đòn đấm tay bọc thép nặng trịch vào sườn đối thủ, buộc đối phương phải phản ứng tung kỹ năng dồn sát thương để thoát thân hoặc phản đòn.
2. **Giây 3–6 (Đón đòn & Kích hoạt Parry phản kích):**
   - Nhận thấy động tác vung kiếm, tụ pháp hoặc lao vào của đối phương, người chơi Brak lập tức nhấn **W (Nghênh Kích Thủ Thế)**.
   - Brak giơ chéo hai cẳng tay bọc găng piston trước mặt, nhận lớp khiên chắn cơ bản và mở cửa sổ Parry chính xác **0.75 giây**.
   - Nếu đối thủ tung đòn trúng trong cửa sổ này: Sát thương nhận vào bị giảm $50\% - 60\%$, buồng xi-lanh sau tay giật bắn tạo tiếng nổ "OÀNH - KENGGG!", tự động phóng ra cú đấm phản kích piston hơi nước cực nặng: gây thêm **+35% bonus damage** và **làm choáng 0.5 giây** kẻ tấn công!
3. **Giây 6–9 (Khóa chân & Trừng phạt bằng Địa Chấn):**
   - Khi kẻ địch đang bị choáng váng sau cú phản kích, Brak lập tức nện mạnh nắm đấm xuống đất bằng **E (Địa Chấn Xung Kích)**.
   - Sóng chấn động diện rộng bán kính 3.8m quét qua làm chậm đối thủ 30% trong 1.2 giây, ngăn không cho con mồi tẩu thoát.
   - Tiếp tục bồi thêm các đòn đánh thường cận chiến uy lực trong khi kỹ năng Q chuẩn bị hoàn thành thời gian hồi chiêu.
4. **Giây 9–13 (Tối thượng dứt điểm — Ultimate Finish):**
   - Khi đối thủ còn dưới $40\%$ máu hoặc có ý định dùng kỹ năng cơ động rút lui: Kích hoạt **R (Hơi Nước Bộc Phá)**.
   - Toàn bộ 4 buồng áp suất sau lưng xả khói mù mịt, Brak nhảy bổ lao 6.0m tới tâm mục tiêu, giáng hai quả đấm búa tạ liên hoàn xuống mặt đất: gây sát thương vật lý khổng lồ, làm choáng diện rộng 1.0 giây và dứt điểm hoàn toàn giao tranh.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm đánh giá dựa trên giả thuyết cơ chế trước playtest (Hypothesis-based), tuân thủ tiêu chuẩn Studio Doc 105.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế chuyên sâu |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.5 / 5** (Trung bình) | Khái niệm "bấm thủ để đỡ đòn và phản công" là một mô-típ đối kháng kinh điển, rất dễ hình dung đối với game thủ yêu thích hành động/đối kháng. Các kỹ năng Q (đấm thẳng), E (nện đất quanh mình), R (nhảy đập) đều có hình học đơn giản. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.5 / 5** (Khá khó) | Cửa sổ Parry của W chỉ kéo dài vỏn vẹn **0.75 giây**. Người mới không thể spam phím W vô tội vạ; bấm quá sớm thì thế thủ hết hạn trước khi đòn đánh tới, bấm quá muộn thì nhận trọn sát thương. Phải có phản xạ tay và khả năng đọc animation ra chiêu của tướng địch. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Rất cao — Đỉnh cao đối kháng) | Đòi hỏi người chơi phải hiểu rõ bộ kỹ năng và thời gian tung chiêu (windup) của toàn bộ 26 tướng trong game: Biết chọn đòn nào để parry (chọn parry chiêu khống chế hoặc chiêu dồn sốc dame thay vì đòn đánh thường lẻ tẻ); biết dùng Universal Dash (D) để né đòn không thể parry; biết kỹ thuật hủy hoạt ảnh (animation cancel) giữa đòn đánh thường và Q để tối đa hóa DPS. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Cảm giác đòn đấm & Đấm trực quyền):** Đứng trước hình nộm tập luyện, bấm đánh thường thấy hai cú đấm tay bọc thép nặng chịch; bấm phím Q thấy Brak dậm chân phóng người đấm thẳng với tiếng xé gió đanh gọn làm chậm hình nộm.
2. **Bước 2 (Thử nghiệm Parry phản kích):** Đứng cho hình nộm hoặc trụ bắn. Nhìn thấy đạn đạo bay tới, bấm phím **W**. Hai tay Brak đan chéo lóe lên ánh đồng; viên đạn trúng đích lập tức bị tán nhỏ với tiếng "KENG", buồng piston giật lùi và Brak tự động tung một cú đấm hơi nước sấm sét bộc phát làm choáng hình nộm.
3. **Bước 3 (Combo địa chấn và bộc phá):** Nện E xuống đất thấy vết nứt địa hình tỏa tròn; sau đó bấm R chọn điểm cách 6m thấy Brak gầm lên, phóng vút qua không trung nện hai tay nổ tung buồng áp suất làm rung chuyển cả màn hình.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được của Brak:**
  - *Bị lừa thế thủ (Bait Parry):* Khi đối thủ giơ tay giả vờ ra đòn rồi dừng lại (hoặc di chuyển nhử), Brak hoảng hốt bấm W. Sau 0.75s không có đòn nào đánh trúng, thế thủ tan biến, Brak rơi vào thời gian hồi chiêu dài (12–8 giây) và mất hoàn toàn khả năng tự vệ.
  - *Hụt Q Trực Quyền:* Chiều rộng đường đấm là 1.5m, tầm 5.5m; nếu đối thủ dùng Dash (D) né sang bên sườn, Brak mất công cụ tiếp cận và làm chậm đầu tiên.
- **Công cụ phản chế từ phía đối thủ:**
  - **Giữ kỹ năng dồn sát thương:** Tuyệt đối không tung chiêu cuối hoặc đòn dồn damage mạnh nhất ngay khi Brak đang áp sát; dùng đòn đánh thường thăm dò để ép Brak dùng W trước.
  - **Thả diều tầm xa (Kiting ngoài 5.5m):** Các xạ thủ như Nera (#07) hay Liễu Tiễn (#40) có tầm đánh 7.0m hoàn toàn có thể giữ khoảng cách an toàn, bắn tỉa liên tục mà không lo bị Brak parry phản kích trúng.
  - **Dùng khống chế diện rộng từ xa:** Khống chế từ xa (như Đại Cực Neo của Nera từ 12m) khiến Brak dù có parry giảm sát thương thì cú đấm phản kích cận chiến cũng không thể với tới kẻ địch ở xa ngoài 3.0m.
