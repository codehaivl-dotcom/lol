# 02 · Player Experience — #28 Libro (Sổ Nợ Nghiệp Báo)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#28 / libro`  
**Nhóm phân lớp:** Hỗ Trợ Chống Dồn Sát Thương (Anti-Burst Life Creditor Support)

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Chọn vị trí bảo hộ & Cấu rỉa thăm dò):**
   - Libro lơ lửng phía sau chủ lực $3.0\text{m} - 5.0\text{m}$, ngón tay lật các trang sách đá, quan sát thanh máu và các mối đe dọa tiềm tàng.
   - Bấm **Q (Trang Sử Trừng Phạt)**: Phóng một phiến đá thẻ tre bay nhanh ($28\text{m/s}$) về phía kẻ địch ở cự ly $8.5\text{m}$. Đạn gây sát thương phép ($55 - 175 + 0.50\text{AP}$) và làm chậm $25\%$ trong 1.2s.
2. **Giây 3–6 (Cửa sổ sinh tử & Mở Sổ Nợ hoãn đòn):**
   - Sát thủ đối phương lao vào dồn combo sát thương bộc phát lên Xạ thủ đồng minh.
   - Ngay khoảnh khắc sát thương ập tới, Libro bấm **W (Sổ Nợ Ký Ức)**:
     - Toàn bộ đồng minh trong bán kính $6.0\text{m}$ nhận ngay lớp khiên dày ($75 - 235$) và hồi máu tức thì ($40 - 140 + 0.25\text{AP}$).
     - **Cơ chế hoãn nợ kích hoạt:** Trong đúng **2.5 giây** tiếp theo, **70% mọi sát thương nhận vào** được hoãn lại, chuyển thành thanh Nợ Treo (Debt Pool) màu xám viền đỏ. Xạ thủ sống sót kỳ diệu qua đợt dồn đòn!
3. **Giây 6–9 (Thanh toán nợ nần & Cứu nguy đáo hạn):**
   - Thanh Nợ Treo của xạ thủ đã tích tụ một lượng lớn sát thương chuẩn bị đáo hạn.
   - Libro lập tức chỉ định tung **E (Ân Hạn Nghiệp Báo)** vào xạ thủ: Một cuộn thư cổ bọc lấy xạ thủ, hồi phục lượng máu lớn ($50 - 170 + 0.35\text{AP}$) và gia tốc di chuyển. Lượng hồi máu này lập tức **khấu trừ trực tiếp vào khoản nợ treo**, triệt tiêu nguy cơ tử vong khi hết hạn 2.5s.
4. **Giây 9–15 (Nợ đáo hạn & Chung quyết phán thư):**
   - Khi hết 2.5s, lượng nợ còn sót lại đáo hạn và bắt đầu trừ dần vào máu dưới dạng DoT trong 3.0s. Lúc này xạ thủ đã kịp lui về góc an toàn.
   - Trong giao tranh tổng nổ ra hỗn loạn, Libro niệm **R (Chung Quyết Phán Thư)**: Cuốn đại thư mở bung cực đại tạo kết giới $6.5\text{m}$, cấp lượng khiên đại trào ($110 - 230$) và hồi phục đại lượng ($90 - 210$) cho toàn đội, đồng thời làm chậm toàn bộ kẻ địch $35\%$ trong 2.0s để dứt điểm giao tranh.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế & Thực tế trải nghiệm |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **3.0 / 5** (Khái niệm mới lạ cần giải thích) | Người chơi mới hiểu cơ bản: Bấm W cho khiên và hồi máu. Tuy nhiên cơ chế "hoãn nợ 70% rồi trả dần trong 3s" đòi hỏi người chơi phải hiểu thanh Nợ Treo màu xám trên đầu đồng đội để kịp thời bơm máu chi trả. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.5 / 5** (Phản xạ bấm nút then chốt) | Chiêu W kích hoạt tức thời quanh thân; chiêu E chọn đơn mục tiêu dễ trúng; chiêu Q bay nhanh. Rào cản cơ học không nằm ở thao tác tay phức tạp mà nằm ở **phản xạ bấm W đúng trong cửa sổ 0.5s** khi địch dồn chiêu. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Đòi hỏi khả năng tính toán tín dụng sinh mệnh) | Đỉnh cao của Libro là nghệ thuật "quản lý tín dụng sinh tồn":<br>1. *Bấm W đúng thời điểm vàng:* Bấm quá sớm thì khi địch lao vào nợ đã hết hạn; bấm quá trễ thì đồng đội bốc hơi trước khi kịp hoãn.<br>2. *Ưu tiên hồi máu trả nợ:* Biết tính toán xem đồng đội có kịp sống qua 3s DoT đáo hạn hay không để dồn chiêu E và trang bị hồi máu đúng lúc.<br>3. *Đọc ý đồ đối thủ:* Phán đoán kẻ địch sẽ dừng đánh chờ nợ hết hay tiếp tục xả chiêu để né tránh kịp thời. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Nhận diện thanh Nợ Treo — 0 đến 10s):**
   - Hình nộm đồng minh bị tháp tấn công nhận một cú bắn cực mạnh $500$ sát thương.
   - Người chơi bấm **W**. Cuốn sách mở bung, hình nộm chỉ mất $150$ máu thực, $350$ sát thương còn lại biến thành một thanh màu xám viền đỏ trên đầu. Thông báo hiển thị: *"Sổ Nợ hoãn 70% sát thương thành Nợ Treo trong 2.5 giây!"*.
2. **Bước 2 (Dùng chiêu E trả nợ — 10 đến 20s):**
   - Thanh Nợ Treo bắt đầu nhấp nháy chuẩn bị đáo hạn. Người chơi bấm **E** vào hình nộm.
   - Cuộn thư cổ bọc lấy hình nộm, hồi máu và trừ sạch thanh nợ màu xám. Khi hết 2.5s, hình nộm hoàn toàn không mất máu thêm. Thông báo hiển thị: *"Hồi máu và khiên ưu tiên thanh toán Nợ Treo trước khi nợ đáo hạn!"*.
3. **Bước 3 (Bắn Q & Đại kết giới R — 20 đến 30s):**
   - Người chơi phóng Q làm chậm hình nộm địch đang tiến vào, sau đó bấm R bừng sáng đại thư phán quyết bao bọc toàn đội.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được (Clear Failure States):**
  - *Mở Sổ Nợ trễ sau khi đồng đội đã ngã xuống:* Phản xạ kém khiến chủ lực chết trước khi W kịp kích hoạt.
  - *Không kịp trả nợ (Vỡ nợ đáo hạn):* Bật W hoãn được sát thương nhưng sau đó hết mana hoặc trượt chiêu E, dẫn đến khi hết 2.5s, đồng đội tự ngã xuống do lượng DoT nợ đáo hạn cắn sạch lượng máu còn lại.
  - *Bị cô lập và chết trước:* Libro giữ sổ nợ nhưng không có ai bảo vệ bản thân, bị sát thủ chuyển hướng tấn công và tiêu diệt trước.
- **Công cụ phản chế minh bạch từ góc nhìn đối thủ (Opponent Agency & Counterplay):**
  - **Dồn sát thương vượt hạn mức (Overkill):** Sổ Nợ chỉ hoãn $70\%$ sát thương, $30\%$ còn lại vẫn trừ thẳng vào máu. Nếu đối phương dồn sát thương cực lớn vượt ngưỡng máu hiện tại, nạn nhân vẫn sẽ tử trận ngay lập tức.
  - **Chờ nợ đáo hạn (Wait Out The Debt):** Đối thủ thấy rõ thanh Nợ Treo màu xám. Khi thấy đối phương dính một lượng nợ khổng lồ mà không còn kỹ năng hồi phục, đối thủ có thể chủ động lùi lại giữ vị trí, chờ đúng 2.5s cho nợ đáo hạn tự động hạ gục nạn nhân.
  - **Áp dụng Vết Thương Sâu (Anti-Heal):** Vết thương sâu làm giảm lượng hồi phục của Libro, khiến Libro không thể thanh toán kịp khoản nợ treo cho đồng minh.
