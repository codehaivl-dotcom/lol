# 02 · Player Experience — #36 Rolo (Tê Tê Khiên)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#36 / rolo`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Mở giao tranh & Kiểm soát diện rộng):**
   - Rolo cùng đồng đội rình rập hoặc dàn hàng tuyến đầu. Nhờ nội tại Bọc Thép (+35 Giáp, +35 Kháng phép), Rolo tự tin hút đòn cấu rỉa của địch.
   - Nhắm vào cụm đối thủ cách 6.5m, kích hoạt **R (Thiết Giáp Càn Quét)**: Rolo gầm lên, phi nước đại dũng mãnh bằng 4 chân cày xới mặt đất húc thẳng vào đội hình đối phương, gây sát thương diện rộng và **làm choáng 0.9s**.
   - Ngay khi tiếp đất, bồi tiếp **E (Địa Chấn Tê Tê)**: Đập mạnh chiếc đuôi bọc vảy xuống sàn đấu, tạo rung chấn bán kính 3.6m gây thêm sát thương và **làm chậm 35% trong 1.2s** để ngăn địch tản ra.
2. **Giây 3–8 (Tháo Vảy & Bùng nổ Cuồng Chiến):**
   - Khi địch đã bị gom lại và bắt đầu dồn sát thương trả đũa, Rolo bấm **W (Tháo Vảy Cuồng Nộ)**:
     - Lập tức nhận lớp khiên bảo vệ dày hấp thụ sát thương trong 2.5s;
     - Các phiến vảy bung hé mở sang hai bên, kích hoạt **Dạng Cuồng Chiến**: Giảm 25 Giáp, nhưng tăng vọt **+20% Tốc độ chạy** và **+25% Tốc độ đánh** trong 5.0 giây.
   - Với tốc độ di chuyển và tốc độ đánh vượt trội, Rolo lao vào cào xé liên hồi bằng đòn đánh thường (LMB) và quất thêm **Q (Bộc Phá Vảy Sừng)** bắn tung luồng vảy sắc làm chậm 25% mục tiêu đang tháo chạy.
3. **Giây 8–12 (Thu hồi vảy hoặc Truy đuổi dứt điểm):**
   - Sau 5.0 giây, hiệu ứng Cuồng Chiến kết thúc; các phiến vảy sừng tự động khép chặt lại vào lưng, Rolo hồi phục đầy đủ trạng thái Bọc Thép (+35 Giáp/Kháng phép).
   - Nếu đối thủ đã rút chạy: Rolo dùng **Phím D (Universal Dash)** lướt 4.5m né đòn hoặc lui về bảo vệ chủ lực hàng sau.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), không tự gắn nhãn 'dễ chơi' khi chưa có dữ liệu nghiệm thu thực chiến.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **1.5 / 5** (Rất trực quan) | Ý tưởng "tê tê giáp dày $\rightarrow$ bấm nút bung vảy để đánh nhanh chạy nhanh" cực kỳ dễ hiểu đối với mọi người chơi. Giao diện thể hiện rõ ràng thanh trạng thái vảy giáp. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.0 / 5** (Dễ tiếp cận) | Kỹ năng E là diện rộng quanh thân, W là tự niệm không cần nhắm, Q là dải bắn thẳng cự ly trung bình, R là vùng đất chọn điểm. Bộ kỹ năng thân thiện với người chơi thích phong cách đấu sĩ mở combat. |
| **Độ khó tinh thông (Mastery Ceiling)** | **3.5 / 5** (Thời điểm bung vảy & Quản lý rủi ro mất giáp) | Đỉnh cao của Rolo nằm ở việc nhận định thời khắc: Nếu bung vảy quá sớm khi đối phương còn đầy đủ kỹ năng dồn sát thương, Rolo sẽ bị sốc chết ngay khi lượng giáp tụt -25; nếu bung vảy quá muộn, Rolo sẽ không tận dụng được tốc đánh để dọn dẹp các mục tiêu yếu máu. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Đòn đánh vuốt móng & Chỉ số giáp):** Click đánh thường vào hình nộm. Quan sát động tác cào vuốt 4 chân nặng trịch và mở bảng chỉ số thấy Giáp/Kháng phép được cộng thêm +35 cố định.
2. **Bước 2 (Thử nghiệm Tháo Vảy W):** Bấm phím W. Quan sát thấy lớp vảy trên lưng Rolo bật hé ra ngoài kèm một luồng khiên trắng bao bọc thân thể. Thanh trạng thái hiện biểu tượng Cuồng Chiến đếm lùi 5s; nhịp cào vuốt đánh thường tăng tốc rõ rệt và tốc độ chạy vọt lên trông thấy.
3. **Bước 3 (Thử nghiệm chiêu cuối R càn quét):** Bấm R chọn vị trí cách 6.5m. Quan sát Rolo hạ thấp thân mình, phi nước đại dũng mãnh 4 chân cày xới mặt đất lao tới húc tung hình nộm, tạo tiếng gầm rung chuyển và làm choáng mục tiêu.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được của Rolo:**
  - *Bung vảy sai thời điểm (Premature Shedding):* Nếu Rolo kích hoạt W khi đối phương chưa tung hết chiêu thức, người chơi đối phương sẽ thấy rõ các phiến vảy hé mở và hào quang khiên hiện lên. Chỉ cần thả diều câu giờ trong 2.5s cho lớp khiên biến mất, Rolo sẽ bị trần trụi với lượng giáp bị giảm 25, cực kỳ dễ bị xạ thủ dồn sát thương tiêu diệt.
  - *Húc R trượt mục tiêu:* Kỹ năng R có độ trễ thi triển $0.2\text{s} + 0.3\text{s}$ delay; nếu đối thủ dùng Dash (D) lách sang bên, Rolo sẽ lao vào khoảng trống mà không làm choáng được ai, rơi vào thế kẹt giữa đội hình địch.
- **Công cụ phản chế toàn diện của đối thủ:**
  - **Cửa sổ trừng phạt vảy giáp (Armor Penalty Window):** Khi thấy Rolo bung vảy (Dạng Cuồng Chiến), đội đối phương phải tập trung hỏa lực sốc sát thương vật lý vào Rolo.
  - **Thả diều bằng khống chế và làm chậm (Kiting & Peeling):** Mặc dù được tăng 20% tốc chạy trong dạng Cuồng Chiến, Rolo không có khả năng kháng hiệu ứng khống chế cứng; các chiêu trói chân hoặc làm chậm nặng sẽ giữ chân Rolo trong suốt 5s bung vảy mà không chạm được vào ai.
  - **Né tránh chiêu cuối R:** Vùng tác động của chiêu R có telegraph vòng tròn đỏ rõ rệt trên mặt đất trong 0.3s; người chơi có thể dễ dàng phản ứng bằng phím Dash (D) để thoát khỏi tâm chấn.
