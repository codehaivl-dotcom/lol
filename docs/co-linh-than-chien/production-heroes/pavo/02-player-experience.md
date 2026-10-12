# 02 · Player Experience — #35 Pavo (Khổng Tước Quạt Mắt Dọa Sợ)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#35 / pavo`  
**Nhóm phân lớp:** Pháp Sư Khống Chế Hướng Nhìn (Anti-Dive Gaze Controller Mage)

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Rỉa máu diện rộng & Ép góc đối thủ):**
   - Pavo giữ cự ly $6.5\text{m} - 8.0\text{m}$ so với đội hình địch, bước đi đĩnh đạc, quạt đuôi he hé mở.
   - Bấm **Q (Kim Vũ Tiễn)**: Phóng một chùm 3 lông vũ cơ khí hình quạt góc $35^\circ$ dài $8.0\text{m}$ ($30\text{m/s}$). Đạn xé rách kẻ địch, gây sát thương phép ($65 - 205 + 0.65\text{AP}$) và làm chậm $25\%$ trong 1.0s.
2. **Giây 3–7 (Cái bẫy tâm lý & Trừng phạt đòn áp sát):**
   - Đấu sĩ hoặc sát thủ đối phương nhìn thấy Pavo đứng độc lập, liền kích hoạt kỹ năng lướt hoặc tốc biến lao thẳng mặt vào Pavo.
   - Ngay khoảnh khắc kẻ địch lao tới cự ly $5.5\text{m}$ và đang hướng mặt về phía mình: Pavo bấm **W (Khai Mạc Khổng Tước)**:
     - Quạt đuôi bung xòe cực đại $180^\circ$, hàng chục con mắt quang học mở trừng trừng phát ra sóng ánh sáng chói lòa.
     - Kẻ địch đang nhìn vào Pavo lập tức dính hiệu ứng **Hoảng Sợ (Fear / Flee) trong 1.2 giây**: Mất kiểm soát di chuyển và tự động quay đầu chạy ngược về phía sau!
     - Bản thân Pavo nhận một lớp khiên bảo hộ ($65 - 205$) trong 2.5s và làm chậm $35\%$ kẻ địch quanh thân.
3. **Giây 7–11 (Bồi đắp sát thương & Khóa chân mục tiêu):**
   - Nhân lúc kẻ địch đang hoảng sợ chạy lùi, Pavo tung **E (Huyễn Ảnh Quang Tráo)**: Đặt một quả cầu gương ánh sáng ở cự ly $7.0\text{m}$ chặn đường rút lui của nạn nhân.
   - Quả cầu gương phát nổ gây sát thương diện rộng ($50 - 170 + 0.50\text{AP}$) và làm chậm $30\%$ trong 1.2s.
4. **Giây 11–15 (Vạn nhãn thôi miên & Kết liễu giao tranh):**
   - Trong giao tranh tổng tập trung, Pavo kích hoạt **R (Vạn Nhãn Thôi Miên)**:
     - Sau 0.25s gồng niệm, toàn bộ 24 con mắt cơ khí trên quạt đuôi chiếu đồng loạt các chùm laser ánh sáng tím lục quét qua bán kính $6.0\text{m}$.
     - Gây sát thương phép bộc phát khổng lồ ($180 - 380 + 0.85\text{AP}$) và **Làm Choáng (Stun) 0.8 giây** toàn bộ quân địch, hủy diệt hoàn toàn đội hình địch.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế & Thực tế trải nghiệm |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.5 / 5** (Khá trực quan) | Kỹ năng Q bắn quạt, E nổ cầu gương, R dồn sát thương rất quen thuộc. Cơ chế độc đáo "nhìn mặt thì bị hoảng sợ, quay lưng thì không sao" rất trực quan như cơ chế Medusa trong Dota hay Cassiopeia trong LMHT. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.0 / 5** (Đòi hỏi căn thời điểm chuẩn) | Chiêu W kích hoạt tức thì nhưng đòi hỏi người chơi phải kiên nhẫn: Không được bấm W quá sớm khi địch chưa vào tầm 5.5m hoặc khi địch chưa quay mặt lại. Phải bấm đúng lúc đối thủ đang trong đà lao tới. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Đấu trí tâm lý hướng nhìn đỉnh cao) | Cuộc đấu giữa Pavo và các cao thủ đối phương là một trò chơi tâm lý bậc thầy:<br>1. *Bắt bài thao tác quay lưng:* Đối thủ giỏi sẽ cố gắng click chuột quay lưng lại trong 0.2s để né Fear. Người chơi Pavo giỏi phải biết nhử đòn hoặc giữ W đến khoảnh khắc đối thủ buộc phải tung đòn đánh thường mới kích hoạt.<br>2. *Quản lý góc quạt Q:* Bắn Q ở cự ly gần để cả 3 tia lông vũ cùng trúng 1 mục tiêu (Shotgun Spread) tối đa hóa sát thương.<br>3. *Phối hợp Combo W -> E -> R:* Khóa chặt hướng chạy của địch để dồn combo kết liễu hoàn hảo. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Bắn quạt lông vũ Q — 0 đến 10s):**
   - Pavo bước ra đường tập luyện, đối diện là 3 hình nộm lính.
   - Người chơi bấm **Q**, 3 phiến lông vũ kim loại xòe ra xé toạc cả 3 hình nộm, gây sát thương và làm chậm. Hướng dẫn hiển thị: *"Chiêu Q phóng 3 lông vũ hình quạt; cự ly gần có thể trúng nhiều tia"*.
2. **Bước 2 (Trừng phạt đòn lao vào W — 10 đến 20s):**
   - Một hình nộm sát thủ lao thẳng mặt vào Pavo. Người chơi bấm **W**.
   - Quạt đuôi xòe bung rực rỡ, hình nộm sát thủ lập tức dính hiệu ứng Fear, quay đầu chạy lùi tán loạn trong 1.2s kèm thông báo: *"Chiêu W dọa sợ kẻ địch đang nhìn vào Pavo!"*.
3. **Bước 3 (Thử thách đối thủ quay lưng — 20 đến 30s):**
   - Một hình nộm khác đang quay lưng bỏ chạy. Người chơi bấm W: Hình nộm không bị dính Fear, chỉ bị làm chậm nhẹ. Hướng dẫn hiển thị: *"Kẻ địch quay lưng lại sẽ miễn nhiễm hiệu ứng Hoảng Sợ!"*.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được (Clear Failure States):**
  - *Bấm W khi đối phương đã quay lưng:* Nếu đối thủ tỉnh táo quay lưng bước đi hoặc Pavo bị móc lốp từ sau lưng, chiêu W hoàn toàn không gây được hiệu ứng khống chế nào, Pavo mất công cụ tự vệ duy nhất.
  - *Bấm W quá sớm ngoài tầm 5.5m:* Kẻ địch thấy quạt xòe ra từ xa sẽ dừng bước, chờ 2.5s khiên của W tan biến rồi mới lao vào kết liễu.
  - *Cạn kiệt mana do spam Q:* Chiêu Q có tầm bắn xa nhưng tiêu hao mana liên tục; nếu spam bừa bãi sẽ không còn mana để tung W và R khi giao tranh nổ ra.
- **Công cụ phản chế minh bạch từ góc nhìn đối thủ (Opponent Agency & Counterplay):**
  - **Thao tác quay lưng 180° (Turn Around Reaction):** Khi Pavo phát ra âm thanh giương quạt cơ khí, người chơi đối phương chỉ cần click chuột quay đầu ngược hướng là hoàn toàn vô hiệu hóa hiệu ứng Hoảng Sợ.
  - **Tập kích từ sau lưng (Flank & Backstab):** Sát thủ vòng ra sau lưng Pavo tấn công sẽ hoàn toàn không bị ảnh hưởng bởi quạt mắt W.
  - **Dụ Pavo dùng W trước:** Dùng chiêu lướt giả vờ lao vào rồi lập tức lùi lại để câu chiêu W của Pavo, sau đó tràn lên tiêu diệt trong 10 giây hồi chiêu.
