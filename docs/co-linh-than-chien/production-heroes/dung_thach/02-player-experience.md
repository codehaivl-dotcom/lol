# 02 · Player Experience — #46 Dũng Thạch (Thần Rìu & Thiên Cầm)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#46 / dung_thach`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Áp sát & Khai Sơn Phách Q):**
   - Dũng Thạch lao nhanh về phía đấu sĩ địch với tốc độ chạy cơ bản $6.35\text{m/s}$.
   - Nhắm **Q (Khai Sơn Phách)** phóng luồng khí chém xé đất theo đường thẳng $6.8\text{m}$, làm chậm đối thủ $30\%$ trong $1.2\text{s}$ và rút ngắn cự ly tiếp cận.
2. **Giây 3–6 (Nhịp Rìu 1-2-3 & Kích hoạt Sát Thương Chuẩn):**
   - Tiếp cận cự ly cận chiến $2.1\text{m}$, tung đòn đánh thường 1 (chém vát), đòn đánh thường 2 (chém ngang).
   - Đến đòn đánh thường thứ 3: Dũng Thạch giáng mạnh cả hai tay nện đại rìu xuống đất, rãnh địa chấn nứt toác bốc khói, kích hoạt **$+35\%$ Sát thương chuẩn** xé toạc thanh máu đối phương.
3. **Giây 6–9 (Xoay rìu E hồi phục & Đánh giá tình thế):**
   - Đối thủ bắt đầu phản đòn dồn sát thương và tung kỹ năng làm chậm/trói chân; Dũng Thạch bấm **E (Cuồng Phách Toái Giáp)** xoay tròn đại rìu $360^\circ$ quanh thân $3.5\text{m}$, gây sát thương diện rộng và hút máu hồi phục một lượng máu lớn.
4. **Giây 9–12 (Khúc Ca Thiên Cầm W — Thời khắc quyết định):**
   - Bị dính trói chân hoặc thấy kẻ địch chuẩn bị tung combo sát thương lớn, Dũng Thạch rút nhanh Thiên Cầm bấm **W (Thiên Cầm Thánh Âm)**:
   - Hiệu ứng trói chân và làm chậm lập tức tan biến; một vòng sóng âm xanh ngọc bích tỏa ra $4.0\text{m}$, làm giảm ngay $25\%$ sát thương gây ra của đối thủ trong $1.5\text{s}$ đồng thời nhận lớp khiên bảo hộ.
   - Trong $1.0\text{s}$ gảy đàn, Dũng Thạch không thể đánh thường nhưng đã câu kéo thành công toàn bộ thời gian combo của đối thủ mà không hề hấn gì.
5. **Giây 12–15 (Thiên Địa Bạt Sơn R — Nhảy bổ dứt điểm):**
   - Hết $1.0\text{s}$ gảy đàn, Dũng Thạch cất đàn vung đại rìu bấm **R (Thiên Địa Bạt Sơn)**: Bật nhảy vồ cự ly $5.5\text{m}$ giáng búa bổ xuống đầu đối phương bán kính $4.8\text{m}$, gây sát thương vật lý cực khủng $+110\%$ Bonus AD và làm choáng $0.8\text{s}$, kết liễu mục tiêu.

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm giả định trước playtest (Hypothesis-based), tuân thủ chuẩn Doc 105.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Dễ nắm bắt) | Nhịp đánh 1-2-3 sát thương chuẩn rất phổ biến và dễ hiểu trong thể loại MOBA. Chiêu đàn giải hiệu ứng bất lợi và giảm sát thương địch rất trực quan. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.5 / 5** (Trung bình) | Các kỹ năng Q định hướng đường thẳng rộng $1.6\text{m}$, E xoay tròn quanh người, R nhảy vồ diện rộng dễ trúng. Khó khăn chủ yếu nằm ở việc giữ nhịp đòn đánh thường cận chiến. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.0 / 5** (Đòi hỏi khả năng đọc nhịp giao tranh và đánh đổi thời gian) | Đỉnh cao nằm ở việc dùng chiêu W: Người chơi phải đọc được thời điểm kẻ địch chuẩn bị dồn sát thương để bấm W giảm $25\%$ sát thương mà không làm lãng phí nhịp chém rìu của mình; biết dừng nhịp gảy đàn đúng lúc và không để bị dính Hard CC trước khi kịp bấm đàn. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Làm quen nhịp Rìu 1-2-3):** Người chơi di chuyển Dũng Thạch tới hình nộm. Đánh thường liên tiếp 3 đòn: Đòn 1 và đòn 2 hiện sát thương vật lý màu đỏ; đòn thứ 3 nện đất nứt rãnh kèm số sát thương chuẩn màu trắng bốc lên.
2. **Bước 2 (Thử nghiệm vệt chém Q & xoay rìu E):** Bấm Q phóng vệt chém đường thẳng nứt đất làm chậm hình nộm; áp sát bấm E xoay đại rìu một vòng quanh người thấy thanh máu hồi phục.
3. **Bước 3 (Thử nghiệm Tiếng Đàn Giải Khống Chế W):** Kích hoạt bẫy làm chậm/trói chân giả định lên Dũng Thạch. Bấm phím W, vòng sáng ngọc bích tỏa ra, hiệu ứng làm chậm biến mất tức thì, Dũng Thạch nhận lớp khiên và gảy đàn trong $1.0\text{s}$.
4. **Bước 4 (Dứt điểm Thiên Địa Bạt Sơn R):** Bấm R vào cụm 2 hình nộm; Dũng Thạch nhảy vút tới nện rìu làm rung chuyển sàn đấu, cả 2 hình nộm bị hất tung kèm chữ "STUN 0.8s".

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được:**
  - *Cửa sổ khựng 1.0s khi gảy đàn:* Khi Dũng Thạch bấm W, chàng hoàn toàn dừng đánh thường và chỉ di chuyển gảy đàn; đây là lúc hỏa lực tấn công của chàng về 0, đối thủ có thể tranh thủ giữ khoảng cách hoặc chuẩn bị chiêu khống chế cứng.
  - *Hiển thị sẵn sàng của Thiên Cầm:* Cây đàn sau lưng chỉ phát sáng viền ngọc bích khi W đã hồi chiêu; nếu đàn tắt sáng, đối thủ biết chắc Dũng Thạch không còn công cụ tự giải làm chậm.
  - *Nhịp đánh thứ 3 có hoạt ảnh gồng rõ rệt:* Trước khi giáng đòn thứ 3 nứt đất, Dũng Thạch nhấc cao rìu bằng hai tay; đối thủ có thể dùng phím Dash D lùi lại để né cú chém sát thương chuẩn này.
- **Công cụ phản chế của đối thủ:**
  - **Dồn khống chế cứng (Hard CC):** Chiêu W của Dũng Thạch **hoàn toàn không thể bấm được nếu bị Choáng (Stun), Áp Chế hoặc Hất Tung**! Đội hình đối phương dồn khống chế cứng vào trước sẽ khóa chặt Dũng Thạch không thể gảy đàn.
  - **Thả diều ngoài cự ly 2.1m:** Dũng Thạch không có chiêu lướt ngắn liên tục; xạ thủ tầm xa thả diều giữ khoảng cách ngoài tầm rìu sẽ triệt tiêu nhịp tích đòn thứ 3 của chàng.
  - **Universal Dash (Phím D):** Bấm D né cú nhảy vồ R hoặc vệt chém Q của Dũng Thạch.
