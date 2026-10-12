# 02 · Player Experience — #07 Nera (Dạ Neo)

**Trạng thái:** `EXPERIENCE_SPEC / READY_FOR_TESTING`  
**Khóa định danh:** `#07 / nera`

---

## 1. Vòng Lặp Cơ Bản 5–15 Giây (Basic Combat Loop)

1. **Giây 0–3 (Cấu rỉa tầm xa & Đặt bẫy chặn đường):**
   - Nera đứng sau hàng lính, tung **Q (Xuyên Thấu Tiễn)** cự ly 9.5m xuyên qua lính trúng tướng đối phương, gây sát thương vật lý và làm chậm 25% trong 1.2s.
   - Thả **E (Lưới Neo Dây Bẫy)** cự ly 7.5m vào cửa rừng hoặc tuyến di chuyển dự kiến của kẻ địch, dựng lên một bãi dây cáp gai góc bán kính 3.4m cản bước mọi kẻ có ý định tiếp cận.
2. **Giây 3–7 (Bắn dồn nhịp & Kích hoạt Kiting Tether):**
   - Duy trì cự ly vàng 7.0m, tung 3 phát bắn thường nỏ tời liên tiếp vào mục tiêu.
   - Đòn đánh thứ 3 kích hoạt Nội tại `anchor_tether`: Một sợi xích năng lượng xanh lam găm chặt vào mục tiêu trong 3.0s.
   - Khi Nera di chuyển theo hướng lùi xa khỏi con mồi, cô nhận ngay **+18% Tốc độ di chuyển**, cho phép Nera vừa lùi vừa xả đạn (Kiting) với tốc độ vượt trội, khiến đối thủ bất lực không thể đuổi kịp.
3. **Giây 7–10 (Tự bảo kê phản kích bằng Tời Neo W):**
   - Nếu sát thủ hoặc đấu sĩ đối phương dùng tốc biến / lướt qua bẫy áp sát vào người Nera trong cự ly 5m:
   - Người chơi Nera lập tức nhấn **W (Phóng Tời Hai Chiều)** nhắm thẳng vào kẻ tấn công.
   - Móc neo găm vào người đối thủ làm chậm 35%, đồng thời cuộn tời cơ khí giật căng đẩy Nera lướt bay lùi lại **4.5m**, tái lập cự ly an toàn 8–9m ngay tức khắc!
4. **Giây 10–14 (Trấn áp tối thượng từ cự ly 12m):**
   - Khi kẻ địch trúng combo hoảng loạn quay đầu bỏ chạy: Nera kích hoạt **R (Đại Cực Neo Trấn Áp)**.
   - Một mỏ neo khổng lồ Dạ Thần phóng đi xé gió cự ly 12.0m, ghim sâu vào lưng tướng địch, làm choáng 1.2s và giật mạnh kéo đối thủ lùi ngược 2.0m về phía đội hình của Nera để dứt điểm trận đấu!

---

## 2. Đánh Giá Độ Khó Trên 3 Trục Độc Lập

*Lưu ý: Thang điểm đánh giá dựa trên giả thuyết cơ chế trước playtest (Hypothesis-based), tuân thủ tiêu chuẩn Studio Doc 105.*

| Trục đánh giá | Điểm ước lượng (1–5) | Lý giải cơ chế chuyên sâu |
|---|---|---|
| **Độ dễ hiểu (Intuitiveness / Readability)** | **2.0 / 5** (Dễ hiểu) | Bộ kỹ năng rất rõ ràng cho vị trí Xạ thủ: Q bắn xa, W giật lùi tự cứu, E đặt bẫy làm chậm, R bắn neo xa làm choáng. Cơ chế nội tại "bắn 3 phát được tăng tốc chạy trốn" hiển thị trực quan bằng vòng đếm số trên mục tiêu. |
| **Độ khó thực hiện (Mechanical Execution Floor)** | **2.5 / 5** (Trung bình thấp) | Nera có độ an toàn rất cao so với các xạ thủ cổ điển không cơ động. Chỉ cần nắm vững quy tắc bấm W giật lùi khi bị tiếp cận là người mới đã có thể tự cứu sống bản thân trong hầu hết các pha gank đơn giản mà không cần hỗ trợ kè kè bên cạnh. |
| **Độ khó tinh thông (Mastery Ceiling)** | **4.5 / 5** (Rất cao — Thả diều vi mô) | Đòi hỏi kỹ năng Hit-and-Run (thả diều) đỉnh cao: tận dụng tối đa +18% MS của nội tại để duy trì khoảng cách mấp mé 6.9m–7.0m; căn góc W để lướt lùi qua các bờ tường mỏng trong rừng; dùng chiêu cuối R từ cự ly 12m xuyên qua sương mù để mở combat hoặc ngắt chiêu niệm niệm của đối phương. |

---

## 3. Trải Nghiệm 30 Giây Đầu (First 30 Seconds Tutorial)

1. **Bước 1 (Bắn thường & Kích hoạt tăng tốc):** Đứng bắn 3 phát nỏ tời vào hình nộm; quan sát sợi xích ánh lam xuất hiện nối giữa Nera và hình nộm. Bấm di chuyển lùi lại thấy Nera lướt đi thoăn thoắt với tốc độ vượt trội (+18% MS).
2. **Bước 2 (Thử nghiệm Tời Neo Giật Lùi):** Để hình nộm áp sát, bấm **W** nhắm vào hình nộm. Thấy móc neo bay ra làm chậm hình nộm, đồng thời thân thể Nera bay lùi vút lại 4.5m tạo khoảng cách an toàn.
3. **Bước 3 (Thả bẫy E và Bắn tỉa R):** Rải lưới E ra đất thấy cụm dây cáp bung rộng; lùi ra xa 10m bấm R thấy mỏ neo khổng lồ phóng đi ghim chặt hình nộm, kéo giật một đoạn và làm choáng 1.2s.

---

## 4. Dấu Hiệu Thất Bại & Phản Chế Từ Góc Nhìn Đối Thủ (Counterplay & Readability)

- **Dấu hiệu thất bại có thể đọc được của Nera:**
  - *Dùng W hụt:* Móc neo W có chiều rộng 1.6m; nếu đối thủ né sang một bên khiến móc neo không trúng tướng địch, Nera vẫn lướt lùi nhưng đối thủ không bị làm chậm, và Nera mất kỹ năng thoát hiểm quan trọng nhất trong 13–9 giây.
  - *Lùi vào góc chết / Kẹt tường:* Nếu bấm W giật lùi khi sau lưng là góc tường dày, Nera sẽ bị kẹt lại không lướt hết được 4.5m.
- **Công cụ phản chế từ phía đối thủ:**
  - **Đứng sau hàng lính / Tanker:** Toàn bộ kỹ năng W và R của Nera là đạn đạo định hướng (Skillshot Projectile); đứng nấp sau lưng lính hoặc tanker có thể chặn hoàn toàn mỏ neo của Nera.
  - **Né kỹ năng theo phương vuông góc:** Tốc độ đạn đạo của W là 30 m/s, R là 32 m/s; khi thấy Nera giương nỏ, lập tức dùng Universal Dash (D) lướt ngang $90^\circ$ để né tránh.
  - **Ép Nera dùng W trước:** Sát thủ nên dùng kỹ năng lướt đầu tiên nhử Nera bấm W tẩu thoát, sau đó dùng chiêu tiếp cận thứ hai (hoặc Tốc biến) để bắt chết Nera trong khoảng trống hồi chiêu.
