# 04 · Skill Visual Contract — #03 Vero (Vết Kiếm)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#03 / vero`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường & Nội Tại (Basic Attack & Passive Visuals)

### 1.1. Đòn Đánh Thường (LMB — Basic Attack)
- **Vũ khí:** Thời Không Tinh Kiếm (Chrono-Crystal Longsword).
- **Dạng tác động:** Cận chiến chém xẻ ngang hoặc vát chéo một tay.
- **Animation:** 2 chuỗi động tác luân phiên: Nhát 1 vung kiếm từ trên vai phải chém vát xuống hông trái; Nhát 2 xoay cổ tay chém quét ngang từ trái sang phải.
- **Thời điểm HIT frame:** Tại giây $0.10\text{s}$ (nhát 1) và $0.12\text{s}$ (nhát 2).
- **Vệt vũ khí (Weapon Trail):** Dải sáng trắng bạc pha ánh tím nhạt thanh mảnh, sắc lẹm, để lại các hạt bụi tinh thể rơi nhẹ.
- **SFX:** Tiếng "VOOT... XOẸT" thanh mảnh của lưỡi kiếm xé rách không gian, kèm tiếng tinh thể vỡ khẽ khi chạm mục tiêu.

### 1.2. Nội Tại — Vết Nứt Thời Gian (`passive: delayed_echo`)
- **Hiệu ứng trên mục tiêu (Target VFX):**
  - Khi dính sát thương đầu tiên: Một vết cắt không gian màu tím huỳnh quang (Fractured Time Rift) xuất hiện lơ lửng trên ngực nạn nhân, từ đó rỉ ra các hạt ánh sáng thời gian chảy ngược lên trời.
  - **Đồng hồ đếm ngược (Countdown Ticker HUD):** Phía trên thanh máu của nạn nhân xuất hiện một vòng tròn đồng hồ 2.5s chia làm 4 góc phần tư viền bạc sáng. Kim đồng hồ quét trọn vẹn $360^\circ$ trong đúng 2.5 giây. Màu sắc vòng chuyển dần từ Xanh Lam $\rightarrow$ Tím Sáng $\rightarrow$ Đỏ Hồng khi sắp chạm ngưỡng nổ.
  - Khi nhận thêm sát thương trong 2.5s: Vết cắt trên ngực phát sáng rực hơn và các tia nứt lan rộng ra xung quanh.
- **Hiệu ứng Kích Nổ (Echo Pop):**
  - Tại mốc $2.5\text{s}$ (hoặc khi dính R): Vết nứt vỡ toác thành một vụ nổ tinh thể không gian hình ngôi sao 6 cánh (Shattered Chrono Nova), đường kính 1.5m quanh nạn nhân.
  - Con số sát thương phép nhảy lên với font chữ đặc biệt màu tím ánh bạc kèm hiệu ứng rung nhẹ (Crit-style text pop).
- **SFX:** Âm thanh nhịp đếm "tíc... tắc... tíc... tắc..." tăng dần nhịp độ, kết thúc bằng một tiếng "KENGGG!" sắc lạnh như kính cường lực vỡ vụn.

---

## 2. Đặc Tả Hình Học & Thị Giác Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Vết Chém Thời Không (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng chỉ điểm theo chuột (Skillshot Line Dash).
2. **Preview khi giữ phím:** Dải mũi tên lướt màu lam ngọc phát sáng mờ dài 6.5m, rộng 1.4m trên mặt đất.
3. **Telegraph trước khi phóng:** Vero chùng chân phải, tay phải rút kiếm ra sau hông trong 0.1s; một vòng hào quang bạc xoay tít quanh chuôi kiếm.
4. **VFX thái & chất liệu:** Vero biến thành một vệt bóng mờ màu trắng bạc lướt xuyên qua hàng ngũ địch; trên đường lướt để lại một rãnh nứt không gian màu tím lam sâu hoắm trên sàn đấu tồn tại trong 0.8s trước khi khép lại.
5. **Hit geometry server:** Khối hộp di động dài 6.5m $\times$ rộng 1.4m.
6. **Collision:** Xuyên qua toàn bộ đơn vị lính và tướng; dừng lại nếu va chạm góc tường địa hình dày.
7. **Lifetime:** Hoàn tất đường lướt trong 0.23s.
8. **Damage/CC:** Gây sát thương vật lý lên toàn bộ mục tiêu va chạm; găm Vết Nứt Thời Gian lên tướng.

### 2.2. Kỹ Năng W — Thời Không Chi Khiên (`skill_w`)
1. **Cast targeting:** Tự niệm tức thì (Self Cast).
2. **Preview:** Vòng tinh thể bảo hộ mờ quanh nhân vật.
3. **Telegraph:** 0s gồng; phản xạ tức thì.
4. **VFX thái & chất liệu:** Một khối đa diện tinh thể thời không màu lục lam - tím (Prismatic Chrono Shield) bao bọc quanh thân Vero. Khi nhận đòn tấn công, mặt tinh thể lóe sáng và hấp thụ đòn đánh thành các gợn sóng hình học.
5. **Hit geometry:** Khối cầu bảo vệ đường kính 1.2m quanh tâm nhân vật.
6. **Collision:** Không va chạm cơ học; chỉ tính lượng hấp thụ sát thương.
7. **Lifetime:** 2.5 giây hoặc biến mất khi cạn khiên.
8. **Damage/CC:** Không gây sát thương; tăng 15% tốc chạy trong thời gian tồn tại.

### 2.3. Kỹ Năng E — Vòng Xoáy Nghịch Đảo (`skill_e`)
1. **Cast targeting:** Diện rộng quanh tâm nhân vật (Area PBAoE Circle).
2. **Preview:** Vòng tròn bán kính 3.4m hiển thị viền bạc quanh chân Vero.
3. **Telegraph:** Vero xoay nhẹ gót chân trong 0.1s, lưỡi kiếm phát quang tím rực.
4. **VFX thái & chất liệu:** Vero xoay một vòng $360^\circ$ tung ra nhát chém quét hình đĩa tròn phẳng màu tím bạc (Temporal Disc Slash); mép đĩa tròn tạo ra các vết nứt không gian xoáy tròn kéo theo các hạt bụi thời gian; dưới chân mục tiêu trúng đòn hiện hiệu ứng các kim đồng hồ quay chậm lại (thể hiện làm chậm 25%).
5. **Hit geometry:** Hình trụ tròn bán kính 3.4m quanh tâm nhân vật.
6. **Collision:** Tác động lên toàn bộ mục tiêu bên trong vòng quét.
7. **Lifetime:** Hoạt ảnh xoay kéo dài 0.25s.
8. **Damage/CC:** Gây sát thương vật lý và làm chậm 25% trong 1.0 giây.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Vạn Kiếm Quy Thời (Chuẩn Tài Liệu 79)

```
R · Vạn Kiếm Quy Thời · vero
fantasy:        Vero lướt vút tới khóa chặt mục tiêu, phân thân thành 3 ảo ảnh thời gian chém liên hoàn 3 nhát chém chí mạng từ 3 hướng khác nhau, làm choáng và lập tức kích nổ toàn bộ Vết Nứt Thời Gian.
kit:            aim: single_target | range: 6.5m | dash: 6.5m | hits: 3 | windup: 0.2s | stun: 0.8s | detonate_echo: instant | physical + magic burst
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.2s): Vero đưa tay chỉ mũi kiếm về phía tướng địch; một vòng tròn la bàn thời gian cổ đại màu bạc khóa dưới chân nạn nhân; thân ảnh Vero tan biến thành một luồng ánh sáng trắng bạc lao vút tới mục tiêu.
  - Pha 2 (Delivery & Lockdown t=0.2–0.3s): Vero xuất hiện áp sát lưng nạn nhân, gây choáng 0.8s khiến mục tiêu bị đóng băng hoàn toàn cử động trong một khối tinh thể thời gian mỏng.
  - Pha 3 (Signature Structure & Multi-slash t=0.3–0.6s): Vero tách thành 3 tàn ảnh thời gian chém liên tiếp 3 nhát kiếm hình tam giác bao quanh mục tiêu:
      * Nhát 1 (t=0.35s): Chém chéo từ trái qua, vệt kiếm lam ngọc lóe sáng.
      * Nhát 2 (t=0.45s): Chém chéo từ phải qua, vệt kiếm tím thạch anh xé rách không gian.
      * Nhát 3 (t=0.55s): Đòn trảm từ trên bổ thẳng xuống, hai tàn ảnh nhập lại làm một vào người thật.
  - Pha 4 (Impact Đỉnh & Echo Detonation t=0.55–0.7s): Tại khoảnh khắc nhát chém thứ 3 chạm đích, toàn bộ Vết Nứt Thời Gian trên người nạn nhân LẬP TỨC NỔ TUNG. Một cột trụ ánh sáng thời gian màu tím bạc bùng nổ xuyên thẳng lên trời cao 4.0m, vỡ toang ra hàng nghìn mảnh tinh thể văng tứ tán.
  - Pha 5 (Decay / End t=0.7–1.0s): Khói tinh thể lắng xuống, Vero đáp đất trong tư thế tra kiếm vào bao, tạo âm thanh "KENG" khô khốc lạnh lùng.
hitbox:         Khóa đơn mục tiêu cự ly 6.5m; toàn bộ sát thương tác động trực tiếp lên nạn nhân bị chọn.
animation:      Clip riêng `vero_r_chrono_execution`: Lướt biến ảnh $\rightarrow$ Tách 3 bóng chém liên hoàn tam giác $\rightarrow$ Thu kiếm tra bao khi tiếp đất.
VFX layers:     Layer khóa la bàn chân -> Layer lướt tàn ảnh -> Layer 3 đường chém tam giác phát quang -> Layer cột sáng nổ tinh thể cực đại -> Layer tra kiếm.
SFX:            Tiếng khóa mục tiêu thanh mảnh -> Tiếng lướt tốc biến -> 3 tiếng chém sắc lẹm liên thanh "XOẸT - XOẸT - ROẸT" -> Tiếng nổ bộc phá vang rền "OÀNG - KENGG!" khi vết nứt bị kích nổ tức thì.
material:       Mesh hạt tinh thể pha lê trong suốt kết hợp Additive Shader thời không tím - bạc.
camera read:    Độ đọc sắc nét, camera MOBA nhìn rõ vị trí của Vero và nạn nhân; hiệu ứng tập trung quanh mục tiêu bị khóa, không làm chói mắt hay che khuất combat của 9 người chơi còn lại.
performance:    Giới hạn tối đa 32 particles vụn vỡ; tương thích mượt mà ở 60 FPS trên mobile và PC.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
