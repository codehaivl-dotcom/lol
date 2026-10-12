# 02 · Player Experience — #30 Iro (Mắt Thiên Cơ)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#30 / iro`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Chọn vị trí phục kích & Đứng yên tích ngắm):**
   - Iro tìm một vị trí an toàn phía sau tường đá hoặc dưới sự bảo bọc của dàn đỡ đòn đồng minh.
   - Iro dừng di chuyển hoàn toàn: Nội tại `laser_sniper` bắt đầu đếm thời gian `focusTime`. Ba vòng kim loại mở rộng khóa chốt cố định, thấu kính pha lê đỏ nhấp nháy ánh sáng điều chỉnh tiêu cự.
   - Mỗi giây đứng yên tăng $+1.5\text{m}$ cự ly bắn. Sau $4.0\text{s}$, tầm đánh cơ bản tăng tối đa $+6.0\text{m}$, nâng tổng tầm bắn lên tới **$13.5\text{m}$** và kích hoạt mốc thưởng **$+30\%$ sát thương đòn đánh**.
2. **Giây 3–6 (Khóa tia laser đỏ cảnh báo & Nã phát đạn xuyên thấu):**
   - Khi mục tiêu lọt vào tầm bắn $13.5\text{m}$, một tia laser đỏ mỏng chiếu rọi từ mắt Iro thẳng vào ngực con mồi.
   - Sau đúng $1.0\text{s}$ cảnh báo (`laserWarnTime: 1.0`), Iro nã đòn đánh thường cường hóa: Tia xung kích laser đỏ rực xé toạc không gian, gây lượng sát thương vật lý bộc phát khổng lồ.
3. **Giây 6–8 (Tụ Quang Xuyên Phá Q bồi sát thương):**
   - Vẫn giữ nguyên vị trí đứng yên, Iro kích hoạt **Q (Tụ Quang Xuyên Phá)**: Nạp năng lượng $0.8\text{s}$ rồi phóng tia laser đỏ cực đại cự ly $12.0\text{m}$ xuyên qua toàn bộ hàng lính, gây sát thương cực mạnh và làm chậm con mồi $20\%$ trong $1.0\text{s}$.
4. **Giây 8–10 (Tự vệ Thấu Kính W khi bị áp sát):**
   - Nếu sát thủ địch lách qua dàn chắn áp sát cự ly gần ($\le 2.5\text{m}$), Iro lập tức kích hoạt **W (Thấu Kính Phòng Vệ)**: Khối quang học nổ bung đẩy lùi kẻ địch ra xa $3.0\text{m}$ và cung cấp lớp khiên bảo hộ (Base $[65 - 185]$ trong $2.5\text{s}$) giúp Iro bảo toàn tính mạng.
5. **Giây 10–14 (Thiên Cơ Hủy Diệt Pháo Ultimate R kết liễu viễn chinh):**
   - Khi con mồi hấp hối tháo chạy về trụ hoặc trốn vào bụi cách xa tới $20.0\text{m}$, Iro tung **E (Khóa Tiêu Cự)** làm lộ diện và trừ giáp mục tiêu, rồi kích hoạt **R (Thiên Cơ Hủy Diệt Pháo)**: Tia laser vệ tinh quét ngang toàn bản đồ cự ly $22.0\text{m}$, nã phát pháo laser hủy diệt khổng lồ với vận tốc $45\text{ m/s}$, xóa sổ con mồi ngay trước mắt đồng đội của chúng.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), tuân thủ chuẩn Doc 105.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Rất dễ hiểu) | Khái niệm "đứng yên càng lâu ngắm càng xa và bắn càng đau" là quy luật vật lý tự nhiên của súng bắn tỉa. Vòng kim loại mở rộng và tia laser đỏ chỉ rõ tình trạng nạp ngắm. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.0 / 5** (Đòi hỏi khả năng ngắm bắn skillshot chuẩn) | Bộ chiêu thức của Iro phụ thuộc hoàn toàn vào các kỹ năng định hướng đường thẳng hẹp (Q rộng $1.4\text{m}$, R rộng $2.0\text{m}$). Người chơi phải ngắm bắn chuẩn xác ở cự ly xa từ $12.0\text{m} - 22.0\text{m}$. |
| **Độ khó tinh thông (Mastery Ceiling)** | **5.0 / 5** (Cực đại — Đòi hỏi định vị & kiểm soát tâm lý đỉnh cao) | Iro là một trong những tướng có trần kỹ năng cao nhất game. Tinh thông Iro nằm ở: (1) **Ra quyết định đứng yên hay chạy**: Đứng yên thêm 0.5s có thể dứt điểm con mồi, nhưng cũng có thể biến Iro thành mồi ngon cho sát thủ; (2) **Xử lý tia laser cảnh báo 1.0s**: Đối thủ nhìn thấy tia đỏ sẽ bước né zíc-zắc, buộc người chơi Iro phải đoán trước hướng lách của đối phương; (3) **Chọn góc ngắm R xuyên bản đồ 22.0m**: Cần khả năng đọc minimap và dự đoán đường chạy của tướng địch sau màn sương chiến tranh. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Làm quen dáng bay lơ lửng & Bắn cơ bản):** Người chơi di chuyển Iro. Nhận thấy khối nhãn cầu trôi dạt êm ái, tốc độ di chuyển chậm ($6.0\text{ m/s}$). Bấm đánh thường thấy tia laser đỏ bắn tới cự ly cơ bản $7.5\text{m}$.
2. **Bước 2 (Thử nghiệm Đứng yên ngắm tĩnh):** Dừng di chuyển hoàn toàn trong 4 giây. Nhận thấy 3 vòng kim loại mở rộng khóa chốt, vòng tròn tầm bắn dưới chân nở rộng từ $7.5\text{m} \rightarrow 13.5\text{m}$. Bắn trúng Dummy cách $11.0\text{m}$ với sát thương tăng thêm $+30\%$. Di chuyển 1 bước: tầm bắn co ngay về $7.5\text{m}$.
3. **Bước 3 (Thử nghiệm Tụ Quang Xuyên Phá Q & Đẩy lùi W):** Bấm phím **Q** nạp $0.8\text{s}$ bắn xuyên qua hàng lính trúng Dummy tầm $12.0\text{m}$. Cho Dummy áp sát rồi bấm phím **W** thấy Dummy bị đẩy lùi mạnh ra xa kèm lớp khiên quang học bọc quanh Iro.
4. **Bước 4 (Nã pháo vệ tinh R tầm cực đại $22.0\text{m}$):** Nhắm **R** vào Dummy đặt ở tít xa cuối màn hình. Đường ngắm laser đỏ quét qua bản đồ, sau $0.5\text{s}$ windup phát pháo laser khổng lồ xé toạc màn hình với vận tốc $45\text{ m/s}$ hủy diệt mục tiêu.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Tia laser đỏ cảnh báo rõ ràng trước $1.0\text{s}$:* Khi Iro đạt cự ly ngắm tối đa và chuẩn bị bắn, tia laser đỏ hiển thị rõ nét trên người nạn nhân trong suốt $1.0\text{s}$. Nạn nhân có đủ thời gian để nhận biết nguy hiểm và bước né.
  - *Bất động hoàn toàn khi ngắm:* Để duy trì tầm bắn $13.5\text{m}$, Iro bắt buộc phải đứng yên như một bức tượng máy. Bất kỳ lúc nào Iro đang ngắm cũng là lúc Iro dễ bị ám sát nhất.
  - *Máu cơ bản thấp kỷ lục ($590\text{ HP}$):* Iro bốc hơi chỉ sau 1 combo dồn sát thương của bất kỳ sát thủ nào nếu không được bảo vệ.
- **Công cụ phản chế của đối thủ:**
  - **Bước né vuông góc với tia laser:** Khi thấy tia laser đỏ chỉ vào mình, đối thủ di chuyển vuông góc hoặc bấm phím **D (Universal Dash)** né sang một bên để khiến phát đạn bắn trượt.
  - **Tập kích từ góc khuất / Bọc sườn:** Sát thủ (như Moka, Kiko, Vero) nên luồn rừng vòng ra sau lưng vị trí Iro đang đứng ngắm để tiêu diệt cỗ máy trước khi giao tranh nổ ra.
  - **Dùng tướng Đỡ Đòn chắn đạn:** Kora (#32) với chiếc khiên cửa đập giảm $60\%$ đạn đạo có thể đứng ngay trước mặt đồng đội để triệt tiêu toàn bộ sức mạnh phát bắn của Iro.
