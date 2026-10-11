# 97 · COLINH Roster V5 — Phân Xử Cơ Chế Tranh Cãi & Khắc Phục Lỗi Logic (Vòng 3)

**Thời điểm thực hiện:** 12/10/2026  
**Trạng thái tài liệu:** `MECHANICS_RESOLUTION / RATIFIED_BY_COUNCIL`  
**Đầu vào đối soát:**
- Phản hồi nghiệm thu Vòng 2 của Owner: Yêu cầu sửa 4 lỗi cơ học và logic then chốt (Liora, Pavo, Rana, Scorecard anomalies).
- [94 · Roster V5 Team Deep Audit (V2)](94-roster-v5-team-deep-audit.md)
- [Bảng điểm đối chiếu CSV](roster-v5-team-audit-scorecard-filled.csv)

---

## 1. Đính Chính & Đồng Bộ Bảng Điểm Scorecard (Rule Consistency)

Hội đồng khắc phục 2 sai lệch quy tắc được Owner chỉ ra:

1. **Mono / Võ Sư Một Nhịp (#06): Chuyển thành `Cut`**
   - *Điểm số:* 53 điểm.
   - *Quy tắc:* Theo Mục 2 của Audit Brief, mọi concept có tổng điểm $< 55$ bắt buộc phải mang nhãn `Cut`.
   - *Quyết định:* Chuyển nhãn từ `Reserve` sang `Cut`. Mono không đáp ứng được chiều sâu thao tác cho hệ thống 4 skill QWER và tạo ra lối chơi nghèo nàn quyết định.
2. **Dron / Drone Tự Hành (#26): Xác định rõ `Reserve (Audit Override / VETO)`**
   - *Điểm số:* 71 điểm.
   - *Lý do:* Điểm 71 thuộc dải 70–84 (Keep / Needs Rewrite), tuy nhiên Dron bị Lead MOBA Designer và Balance Reviewer phủ quyết vì cơ chế đổi 3 mode tự động quanh vai quá nông, thiếu Player Agency, biến hero thành một món item di động.
   - *Quyết định:* Ghi rõ trong Scorecard nhãn `Reserve (Audit Override)`. Không phải kết quả từ ngưỡng điểm số học thông thường mà là quyết định phủ quyết chuyên môn.

---

## 2. Giải Quyết Cơ Chế Dây Phán Của Liora (#10): Bổ Sung Safe Action Độc Lập Cho Từng Nạn Nhân

### 2.1. Vấn đề của thiết kế cũ
Báo cáo V2 quy định: *"Hai nạn nhân chỉ cần bước cùng nhau theo một hướng để dây tự tan biến"*.  
Owner đã chỉ ra lỗ hổng chết người: Trong môi trường MOBA thực tế (đặc biệt là đánh đơn Solo Queue, có hiệu ứng khống chế, hất tung, làm chậm từ nhiều nguồn), **việc bắt 2 người chơi ngẫu nhiên phải phối hợp di chuyển nhịp nhàng là điều bất khả thi**, không thể coi là một Safe Action đáng tin cậy. Nạn nhân sẽ rơi vào cảm giác bất lực vì bị đồng đội kéo chết chùm.

### 2.2. Cơ chế mới: Quyền Tự Quyết Độc Lập Của Từng Nạn Nhân (Independent Victim Agency)

Liora bắn Sợi Dây Từ Tính nối 2 kẻ địch. Mỗi nạn nhân BẮT BUỘC có ít nhất một hành động mà bản thân họ có thể tự thực hiện để tự cứu mình:

```
                          [SỢI DÂY TỪ TÍNH LIORA]
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
  [LỰA CHỌN CÁ NHÂN A]                                    [LỰA CHỌN CÁ NHÂN B]
  (Ngắt tầm nhìn / Địa hình)                              (Tấn công Cột Năng Lượng)
  Núp sau vách đá/tường trong                             Gây 3 đòn đánh/skill vào chốt
  1.0s -> Dây tự đứt an toàn                              dây trên người -> Bung chốt
```

1. **Phương án Độc lập 1 — Ngắt đường truyền bằng Địa hình (Line of Sight Snap):**
   - Nếu bất kỳ nạn nhân nào di chuyển vòng ra sau một bức tường địa hình hoặc chướng ngại vật tự nhiên khiến sợi dây bị gãy góc (mất tầm nhìn trực tiếp giữa 2 người trong 1.0 giây), sợi dây từ tính sẽ tự động đứt gãy mà không gây sát thương hay giật nổ!
   - *Ý nghĩa gameplay:* Người chơi có kỹ năng định vị tốt có thể tự giác nép vào góc tường hoặc bụi rậm để giải thoát cho chính mình mà không cần quan tâm đồng đội đang làm gì.
2. **Phương án Độc lập 2 — Tấn công gỡ Chốt Từ Tính (Anchor Overload):**
   - Khi bị trói, trên người mỗi nạn nhân xuất hiện một Cột Chốt Từ Tính nhỏ.
   - Bất kỳ nạn nhân nào tung 2 đòn đánh thường hoặc 1 kỹ năng trúng vào Cột Chốt trên người mình (hoặc đồng minh phụ cận đánh hộ), chốt sẽ bị quá tải và bung ra, giải thoát cho nạn nhân đó.
3. **Quy tắc khi dây bị kéo căng:** Chỉ khi một nạn nhân dùng kỹ năng lướt tháo chạy mà **không** phá chốt hoặc **không** ngắt tầm nhìn, sợi dây mới phát nổ trừng phạt.

---

## 3. Sửa Lại Toán Học Hướng Nhìn & Đánh Giá UX Cho Pavo (#35)

### 3.1. Sửa lỗi toán học kiểm tra hướng nhìn
Trong báo cáo trước, công thức được đề xuất là tích vô hướng giữa 2 vector hướng mặt: $\vec{F}_{\text{pavo}} \cdot \vec{F}_{\text{target}} < 0$.  
Owner đã chỉ ra chính xác: **Hai vector hướng mặt ngược nhau không có nghĩa là nạn nhân đang nhìn về phía Pavo!** Ví dụ: Pavo đứng ở góc $(0, 10)$ nhìn về hướng Nam $(0, -1)$, nạn nhân đứng ở góc $(10, 0)$ nhìn về hướng Bắc $(0, 1)$. Hai vector hướng mặt ngược nhau nhưng nạn nhân hoàn toàn không nhìn về phía Pavo (họ đang nhìn vào khoảng trống).

### 3.2. Công thức toán học chuẩn xác trên mặt phẳng $(X, Z)$
Để xác định một nạn nhân có đang "nhìn thẳng vào Pavo" hay không, hệ thống phải tính toán theo 3 bước:

1. **Tính Vector Hướng từ Nạn nhân đến Pavo:**
   $$\vec{V}_{\text{to\_pavo}} = \text{Normalize}\left(\vec{P}_{\text{pavo}} - \vec{P}_{\text{target}}\right)$$
   *(Trong đó $\vec{P}_{\text{pavo}}$ và $\vec{P}_{\text{target}}$ là tọa độ vị trí 2D trên sàn đấu).*
2. **Kiểm tra Nạn nhân có nằm trong Hình nón Xòe quạt của Pavo hay không:**
   - Vector từ Pavo đến Nạn nhân: $\vec{V}_{\text{to\_target}} = -\vec{V}_{\text{to\_pavo}}$.
   - Nạn nhân nằm trong nón $60^\circ$ của Pavo nếu:
     $$\vec{F}_{\text{pavo}} \cdot \vec{V}_{\text{to\_target}} \ge \cos\left(\frac{60^\circ}{2}\right) = \cos(30^\circ) \approx 0.866$$
3. **Kiểm tra Hướng mặt Nạn nhân có hướng về phía Pavo hay không (Field of View của Nạn nhân):**
   - Giả định góc nhìn trực diện của nhân vật là nón $90^\circ$ ($\pm 45^\circ$ phía trước mặt).
   - Nạn nhân bị coi là "nhìn vào Pavo" nếu:
     $$\vec{F}_{\text{target}} \cdot \vec{V}_{\text{to\_pavo}} \ge \cos(45^\circ) \approx 0.707$$

```
                         [PAVO] (Vị trí P)
                           │   ▲
             V_to_target   │   │  V_to_pavo
                           ▼   │
                    [NẠN NHÂN] (Vị trí T)
                           │
                           ▼ F_target (Quay lưng) -> AN TOÀN
```

### 3.3. Đánh giá UX: Thao tác quay đầu 180° có tự nhiên trong MOBA isometric không?
- **Đánh giá phản xạ điều khiển:** Trong game MOBA điều khiển bằng chuột phải (Click-to-Move), việc click chuột ngược hướng di chuyển để "quay đầu" (Turn Around / Stutter-step) là một thao tác cơ bản và quen thuộc của người chơi có trình độ (tương tự việc né chiêu hóa đá của Cassiopeia trong LMHT hay Medusa trong Dota 2).
- **Yêu cầu UX bắt buộc:**
  - Pavo có **0.6 giây chuẩn bị (Telegraph Wind-up)**: Xòe quạt đuôi phát ra âm thanh cơ khí rít chói tai và ánh sáng chớp lóa trước khi sóng chấn động tỏa ra.
  - Vòng hiển thị quạt sáng rực trên sàn đấu giúp nạn nhân nhận biết ngay lập tức.
  - Người chơi chỉ cần 1 thao tác click chuột phải quay ngược hướng là bảo đảm an toàn. Thao tác này hoàn toàn tự nhiên và mang lại cảm giác outplay thỏa mãn cực cao.

---

## 4. Xử Lý Xung Đột Logic Giữa Grounded Và Nút Dash (D) Của Rana (#21)

### 4.1. Bản chất xung đột logic
Nếu quy tắc viết: *"Bước qua mép vòng bị Grounded (Khóa lướt), nhưng người chơi có thể dùng nút D để lướt qua"*, thì hệ thống game sẽ gặp lỗi tuần tự (race condition / logic paradox):
- Khi nhân vật chạm mép vòng, hệ thống gắn cờ trạng thái `Grounded = TRUE`.
- Ngay khi `Grounded = TRUE`, nút Dash (D) bị vô hiệu hóa (Disabled).
- Hậu quả: **Người chơi không bao giờ bấm được nút D để thoát thân như hứa hẹn!**

### 4.2. Quy tắc tương tác sạch (Clean Interaction Rule)

Hội đồng tái cấu trúc lại luật tương tác của Ranh Giới Pháp Đình thành **Ranh Giới Thu Phí (Toll Boundary Rule)**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   RANH GIỚI PHÁP ĐÌNH CỦA RANA                        │
├────────────────────────────────────────────────────────────────────────┤
│ TRƯỜNG HỢP 1: ĐI BỘ QUA MÉP (Normal Movement)                          │
│   • Bị giật điện làm chậm 50% trong 1.5 giây.                          │
│   • Gắn cờ Grounded trong 1.5 giây sau khi bước qua.                   │
│   • Hành vi: Người chơi bị phạt vì lười né tránh.                      │
├────────────────────────────────────────────────────────────────────────┤
│ TRƯỜNG HỢP 2: DÙNG NÚT D (DASH) LƯỚT XUYÊN QUA (Active Dash Override)  │
│   • Nút D CÓ THỂ bấm từ bên trong vòng để lướt xuyên mép ra ngoài.     │
│   • Khi hoạt ảnh Dash cắt qua mép vòng: Dash KHÔNG bị ngắt quãng.      │
│   • Trả phí ranh giới: Người chơi nhận một lượng Sát Thương Phản Phệ   │
│     cố định (Toll Damage) ngay khi chạm mép, nhưng lướt thoát an toàn! │
│   • Hành vi: Người chơi chủ động đánh đổi máu lấy sự tự do vị trí.     │
└────────────────────────────────────────────────────────────────────────┘
```

- **Nguyên lý lập trình:** Check va chạm mép vòng phân biệt rõ `MovementType == Dash` vs `MovementType == Walk`. Dash có độ ưu tiên cao hơn (Priority Override) và chỉ kích hoạt trừ máu chứ không gán trạng thái Grounded.

---

## 5. Kết Luận Phân Xử

Toàn bộ 4 vấn đề kỹ thuật và logic do Owner chỉ ra đã được giải quyết dứt điểm:
1. `Mono (#06)` chính thức chuyển thành `Cut` theo đúng luật điểm số.
2. `Dron (#26)` ghi rõ nhãn `Reserve (Audit Override)`.
3. `Liora (#10)` có Safe Action độc lập (ngắt tầm nhìn qua địa hình hoặc đánh bung chốt).
4. `Pavo (#35)` chuẩn hóa công thức toán học hướng nhìn và xác nhận thao tác quay đầu đạt chuẩn UX MOBA.
5. `Rana (#21)` giải quyết triệt để xung đột Dash D và Grounded bằng quy tắc Toll Boundary.
