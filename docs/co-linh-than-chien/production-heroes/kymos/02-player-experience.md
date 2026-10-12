# 02 · Player Experience — #49 Kymos (Thạch Âm Điểm Rung Hạ Âm)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#49 / kymos`  
**Nhóm phân lớp:** Hỗ Trợ Triệt Tiêu Sát Thương Bộc Phát (Anti-Burst Shockwave Saver Support)

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Tiền tuyến vững chãi & Cấu rỉa rung chấn):**
   - Kymos đi đầu cùng đấu sĩ hoặc che chắn phía trước xạ thủ $2.5\text{m} - 3.5\text{m}$, từng bước chân rung chuyển mặt đất.
   - Bấm **Q (Thạch Ba Kích)**: Phóng một luồng sóng rung chấn hạ âm theo đường thẳng dài $8.0\text{m}$ ($26\text{m/s}$). Sóng âm xới tung mặt đất, gây sát thương phép ($50 - 170 + 0.45\text{AP}$) và làm chậm $30\%$ kẻ địch trong 1.2s.
2. **Giây 3–7 (Cắm mốc hạ âm & Triệt tiêu sốc đòn):**
   - Sát thủ đối phương (Kiko hoặc Eelix) dùng kỹ năng lướt áp sát xạ thủ đồng minh chuẩn bị xả trọn bộ combo dồn sát thương bốc hơi.
   - Kymos lập tức kích hoạt **W (Điểm Rung Hạ Âm)**:
     - Dộng mạnh thanh khánh đá xuống sàn đấu, tạo ra một vùng Điểm Rung Hạ Âm bán kính $4.5\text{m}$ tồn tại trong **3.5 giây**.
     - Ngay lập tức, bản thân và toàn bộ đồng minh trong bán kính $5.5\text{m}$ nhận một lớp khiên dày ($75 - 215$) và hồi máu ($40 - 140 + 0.25\text{AP}$).
     - **Tác động triệt tiêu cốt lõi:** Mọi đòn sát thương bộc phát đánh vào đồng minh đứng trong vùng bị **cắt giảm tức thì 40%**! Đợt dồn sát thương của sát thủ bị gãy vụn hoàn toàn.
3. **Giây 7–11 (Bóc tách áp sát & Tự vệ cự ly gần):**
   - Sát thủ đối phương bực tức cố bám đuổi xạ thủ: Kymos tung **E (Cộng Hưởng Thạch Cầm)**.
   - Một đợt sóng âm hình đĩa quét ngang mặt đất bán kính $4.0\text{m}$ quanh người, đẩy lùi nhẹ sát thủ ra ngoài và làm chậm $25\%$ trong 1.2s.
   - Kymos kết hợp bấm **D (Universal Dash)** lướt lên che chắn luồng đạn đạo cho xạ thủ.
4. **Giây 11–15 (Vạn âm tĩnh lặng & Chấn định giao tranh tổng):**
   - Khi giao tranh tổng nổ ra hỗn loạn với hàng loạt chiêu cuối bộc phát từ đối phương: Kymos niệm **R (Vạn Âm Tĩnh Lặng)**.
   - Sau 0.25s gồng niệm, một làn sóng hạ âm khổng lồ bán kính $6.5\text{m}$ bùng nổ, triệt tiêu toàn bộ tạp âm chiến trường, ban lượng hồi máu lớn ($110 - 230 + 0.35\text{AP}$) và lớp khiên đại trào ($90 - 190$) cho toàn đội, đồng thời làm chậm $35\%$ toàn bộ quân địch trong 2.0s, ấn định thắng lợi giao tranh.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế & Thực tế trải nghiệm |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Rất trực quan) | Bản chất cơ chế cực kỳ rõ ràng: Cắm cọc xuống đất = vùng an toàn giảm 40% sát thương sốc. Ai đứng trong vòng tròn phát sáng xanh rêu thì được bảo vệ. Chiêu W và R cung cấp cả khiên và máu; E là công cụ đẩy lùi tự vệ. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.0 / 5** (Dễ làm quen) | Thao tác bấm nút không đòi hỏi tốc độ siêu cao: Chiêu W kích hoạt tức thì không khựng bước; chiêu E diện rộng quanh thân; chiêu R niệm nhanh 0.25s. Điểm cơ học duy nhất cần nhắm hướng là sóng rung Q. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.0 / 5** (Đòi hỏi khả năng đọc vị trí & Căn nhịp giao tranh) | Sự khác biệt của một Kymos đỉnh cao nằm ở:<br>1. *Vị trí cắm Điểm Rung (Node Placement):* Đoán trước tọa độ sát thủ sẽ nhảy vào để cắm cọc sẵn, bao bọc được cả xạ thủ và pháp sư của đội mình.<br>2. *Ép đối thủ giao tranh trong vùng suy giảm:* Dùng cơ thể lực lưỡng và chiêu E để đẩy đối phương không cho thoát ra ngoài vùng hạ âm.<br>3. *Không lãng phí cọc 3.5s:* Cắm quá sớm khi địch chưa lao vào sẽ khiến đối phương chỉ việc lùi lại chờ hết 3.5s rồi mới tấn công. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Cảm nhận bước chân đá & Bắn Q — 0 đến 10s):**
   - Kymos xuất hiện tại bệ đá, bước đi nặng nề uy lực.
   - Người chơi bấm **Q**, sóng rung chấn xới tung mặt đất làm chậm hình nộm kẻ địch ở cự ly $8.0\text{m}$.
2. **Bước 2 (Thử nghiệm cắt sốc sát thương W — 10 đến 20s):**
   - Hình nộm sát thủ chuẩn bị tung cú đâm cực mạnh $400$ sát thương vào hình nộm đồng minh.
   - Người chơi bấm **W**. Thanh khánh đá cắm xuống sàn, vùng sóng hạ âm bừng sáng: Cú đâm của sát thủ chỉ gây $240$ sát thương (giảm đúng $40\%$), lớp khiên hấp thụ phần lớn sát thương. Hướng dẫn hiển thị: *"Điểm Rung Hạ Âm giảm 40% sát thương bộc phát cho đồng minh đứng trong vùng 4.5m!"*.
3. **Bước 3 (Đẩy lùi E & Đại sóng tĩnh lặng R — 20 đến 30s):**
   - Sát thủ cố áp sát: Người chơi bấm **E** đẩy lùi hình nộm ra xa.
   - Bấm **R** kích hoạt đại sóng hạ âm, hồi phục toàn bộ máu và cấp đại khiên cho đồng minh.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được (Clear Failure States):**
  - *Cắm mốc lệch khỏi khu vực giao tranh:* Nếu Kymos cắm W ở một góc mà đồng đội bị đẩy dạt ra ngoài vùng $4.5\text{m}$, hiệu ứng giảm sát thương $40\%$ sẽ hoàn toàn biến mất.
  - *Cắm mốc quá sớm khi đối thủ chưa lao vào:* Cọc hạ âm chỉ tồn tại đúng 3.5 giây. Nếu cắm vội vã, đối phương chỉ cần dừng lại chờ 3.5s rồi mới xả chiêu, Kymos rơi vào khoảng trống 10-14s hồi chiêu.
  - *Bị cô lập ngoài giao tranh:* Kymos di chuyển chậm, nếu bị đối phương thả diều từ cự ly xa ngoài tầm $8.0\text{m}$, Kymos sẽ bị rút máu dần mà không thể che chắn cho ai.
- **Công cụ phản chế minh bạch từ góc nhìn đối thủ (Opponent Agency & Counterplay):**
  - **Đẩy giao tranh ra khỏi vùng Điểm Rung:** Vùng hạ âm cố định tại chỗ. Kẻ địch có thể dùng chiêu hất tung, đẩy lùi hoặc kéo nạn nhân ra khỏi bán kính $4.5\text{m}$ để tiếp tục dồn sát thương sốc nguyên bản.
  - **Chờ hết 3.5 giây:** Hiệu ứng giảm sát thương chỉ tồn tại trong đúng 3.5s. Sát thủ thông minh có thể nhấp nhả nhử Kymos cắm cọc, lùi lại chờ cọc tan biến rồi mới dồn combo hạ gục chủ lực.
  - **Chuyển sang sát thương cấu rỉa DoT:** Sóng hạ âm chuyên trị sát thương sốc (Burst). Các nguồn sát thương duy trì theo thời gian (như đốt máu của Inka hay độc tố) sẽ không bị suy giảm nhiều bởi vùng hạ âm.
