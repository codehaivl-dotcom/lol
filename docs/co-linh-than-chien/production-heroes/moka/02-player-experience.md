# 02 · Player Experience — #31 Moka (Hổ Nấm Răng Kiếm)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#31 / moka`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Rình rập & Phóng thích bào tử Q):**
   - Moka nấp trong bụi rậm hoặc di chuyển dọc theo các góc khuất tầm nhìn của rừng.
   - Khi phát hiện xạ thủ hoặc pháp sư đối phương di chuyển hớ hênh, Moka nhắm tung **Q (Bào Tử Phóng Thích)**: Đuôi nấm quất mạnh bắn chùm bào tử đường thẳng $6.5\text{m}$ vào con mồi.
   - Mục tiêu trúng đòn bị sát thương, làm chậm $25\%$ trong $1.2\text{s}$ và bị đánh dấu **Bào Tử Lộ Diện (Spore Mark)** trong suốt **$4.0\text{ giây}$** (`foe.sporeUntil > W.t`).
2. **Giây 3–5 (Tăng áp W & Cú vồ tầm xa kinh hoàng):**
   - Moka bấm **W (Ẩn Tích Bào Quang)**: Kích hoạt bụi nấm xung quanh nhận lớp khiên hấp thụ sát thương (Base $[60 - 200]$ trong $2.5\text{s}$) và tăng mạnh tốc độ di chuyển để rút ngắn khoảng cách.
   - Khi con mồi đang trong tầm $7.0\text{m}$, Moka bấm tấn công thường: Nội tại `spore_pounce` kích hoạt, Moka phóng người như tên bắn vượt cự ly $7.0\text{m}$ vồ sập mục tiêu, gây đòn cắn xé bộc phát cộng thêm **$+40\%$ Bonus AD**.
3. **Giây 5–7 (Cào toái cốt E & Khống chế):**
   - Ngay khi tiếp đất, Moka tung **E (Toái Cốt Trảm Kích)**: Quét móng vuốt diện rộng bán kính $3.2\text{m}$ cào xé vết thương sâu, gây sát thương vật lý và làm chậm mục tiêu thêm $35\%$ trong $1.0\text{s}$.
4. **Giây 7–10 (Mãnh Hổ Tuyệt Sát Ultimate R dứt điểm):**
   - Nếu con mồi tìm cách dùng Tốc biến hoặc Dash tháo chạy, Moka gầm vang kích hoạt **R (Mãnh Hổ Tuyệt Sát)**: Tiếng gầm cảnh báo vang vọng trong $0.25\text{s}$ windup, sau đó Moka phóng vút $7.0\text{m}$ khóa cứng mục tiêu, găm ngập đôi răng kiếm vào gáy đối thủ, gây sát thương bộc phát cực đại và làm choáng $0.8\text{s}$.
5. **Giây 10–13 (Rút lui hoặc dọn tàn cuộc):**
   - Sau khi con mồi gục ngã, Moka dùng **D (Universal Dash)** lướt thoát ra khỏi tầm ngắm của trụ hoặc đồng đội đối phương, biến mất trở lại vào bóng tối của khu rừng.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), tuân thủ chuẩn Doc 105.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.5 / 5** (Dễ nắm bắt) | Lối chơi rình mồi, đánh dấu bào tử rồi vồ từ xa rất trực quan. Con mồi bị dính bào tử có icon nấm huỳnh quang rõ nét trên đầu, báo hiệu tầm vồ $7.0\text{m}$ sẵn sàng. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **3.0 / 5** (Yêu cầu kỹ năng định hướng cơ bản) | Kỹ năng Q đòi hỏi bắn trúng skillshot đường thẳng ($6.5\text{m}$, rộng $1.4\text{m}$) ở tốc độ $28\text{ m/s}$. Nếu bắn hụt Q, Moka mất đi khả năng vồ mồi tầm xa của nội tại và buộc phải tìm cách tiếp cận bằng chân. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.0 / 5** (Yêu cầu tư duy chọn thời điểm & đọc bản đồ cao) | Là một sát thủ có lượng máu mỏng ($640\text{ HP}$), Moka không thể lao vào giữa 5 tướng địch đang tụ tập. Tinh thông Moka nằm ở: (1) Khả năng kiểm soát tầm nhìn trong rừng, kiên nhẫn chờ thời cơ con mồi đi lẻ; (2) Chuỗi kết nối giữa Vồ Nội Tại và Vồ Chiêu Cuối R để truy đuổi 2 lần liên tiếp xuyên qua khoảng cách khổng lồ ($14.0\text{m}$); (3) Xử lý nhịp khi đối phương phản xạ bấm Dash né cú vồ. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Làm quen dáng thú 4 chân & Cào thường):** Người chơi điều khiển Moka. Nhận thấy dáng chạy 4 chân dũng mãnh, các chùm nấm trên lưng phát quang. Bấm đánh thường thấy nanh vuốt cào xé dứt khoát cự ly $1.8\text{m}$.
2. **Bước 2 (Thử nghiệm Phóng bào tử Q & Đánh dấu):** Bấm phím **Q** vào Dummy cách $5.0\text{m}$. Đuôi quất bắn chùm nấm trúng Dummy, trên đầu Dummy hiện icon nấm phát quang màu cam và thanh đếm $4.0\text{s}$.
3. **Bước 3 (Thử nghiệm Cú Vồ Nội Tại từ xa $7.0\text{m}$):** Đứng cách Dummy $6.5\text{m}$ (khi Dummy vẫn dính bào tử), bấm chuột phải đánh thường. Moka phóng vút người qua khoảng cách, vồ sập Dummy gây sát thương bộc phát cực mạnh kèm âm thanh xé rách đanh thép.
4. **Bước 4 (Combo W $\rightarrow$ E $\rightarrow$ R kết liễu):** Bấm W bật khiên tăng tốc, áp sát quét E làm chậm Dummy, bấm R nghe tiếng gầm vang dội rồi vồ cắn nanh kiếm kết liễu Dummy với hiệu ứng làm choáng $0.8\text{s}$.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Mất dấu bào tử là mất tầm vồ:* Nội tại vồ mồi $7.0\text{m}$ của Moka CHỈ kích hoạt khi mục tiêu đang dính hiệu ứng Bào Tử ($4.0\text{s}$). Nếu Moka bắn trượt Q hoặc hiệu ứng đã hết thời gian, Moka trở thành tướng cận chiến thuần túy tầm $1.8\text{m}$.
  - *Tiếng gầm cảnh báo $0.8\text{s}$ trước chiêu cuối:* Khi Moka kích hoạt R, toàn bộ người chơi trong phạm vi lân cận đều nghe thấy tiếng gầm rít dã thú vang dội $0.25\text{s}$ windup trước khi đòn vồ ập đến.
  - *Máu cơ bản cực mỏng ($640\text{ HP}$):* Nếu Moka vồ vào sai mục tiêu (như vồ trúng Kora đang bật khiên hoặc Forge đang nóng máy), Moka sẽ bị đối phương dồn khống chế hạ gục trong chớp mắt.
- **Công cụ phản chế của đối thủ:**
  - **Né kỹ năng Q:** Chùm bào tử Q có chiều rộng $1.4\text{m}$. Di chuyển bước lắt léo hoặc bấm phím D Universal Dash né Q sẽ tước đi toàn bộ lợi thế phục kích của Moka.
  - **Bấm Universal Dash (Phím D) khi nghe tiếng gầm R:** Ngay khi nghe thấy tiếng gầm dã thú cảnh báo của chiêu cuối R, lập tức bấm phím D lướt dạt sang bên cạnh để khiến cú vồ mất góc áp sát tối ưu.
  - **Cắm mắt kiểm soát bụi rậm:** Moka phụ thuộc hoàn toàn vào yếu tố bất ngờ từ bụi rậm. Cắm mắt sớm sẽ phát hiện bước di chuyển của dã thú trước khi Moka kịp tung Q.
