# 01 · Fantasy, Lore & Class — #36 Rolo (Tê Tê Khiên)

**Trạng thái:** `LOCKED_CANON / READY_FOR_PRODUCTION`  
**Khóa định danh:**
- `researchId`: `#36`
- `runtimeId`: `rolo`
- `tên hiển thị`: `Rolo` (Tiếng Anh: `Rolo - The Iron Pangolin`)
- `danh hiệu`: `Tê Tê Khiên` (The Scale Warden)

---

## 1. Câu Pick-up & Cảm Xúc Người Chơi (Player Fantasy)

> *"Tôi pick Rolo vì tôi muốn điều khiển một cổ thú tê tê thiết giáp bọc vảy sừng kim loại khổng lồ: vừa có thể làm bức tường thép càn quét mở combat, vừa có thể tự tay bung vảy giáp để biến thành một cỗ máy cào xé cuồng nộ xé toạc mọi kẻ thù dám cản đường."*

- **Cảm giác cốt lõi:** Nặng nề, đanh thép, bộc phá và biến chuyển uyển chuyển giữa thế phòng thủ kiên cố sang thế tấn công cuồng loạn. Rolo cho người chơi quyền năng kiểm soát thể trạng của chính mình thông qua cơ chế vảy giáp.
- **Vòng lặp cảm xúc:** Lao vào bằng R Thiết Giáp Càn Quét làm choáng đội hình địch $\rightarrow$ Dập đuôi E tạo địa chấn làm chậm $\rightarrow$ Quất đuôi Q bắn vảy sừng rỉa máu $\rightarrow$ Bấm W bung tung lớp vảy giáp nhận khiên bộc phát tốc đánh/tốc chạy $\rightarrow$ Cào xé điên cuồng dọn dẹp tàn cuộc.

---

## 2. Bản Sắc Chiến Đấu & Phân Lớp (Combat Identity & Class)

- **Vai trò chính:** Đấu Sĩ / Đỡ Đòn Đa Dụng (Fighter / Juggernaut-Tank Hybrid).
- **Vị trí đi đường:** Đường Đơn (Solo Lane / Top) hoặc Đi Rừng (Jungle).
- **Tầm tác chiến:** Cận chiến cự ly gần (Melee: 1.8m), phạm vi chiêu thức tầm trung 6.5m.
- **Loại tài nguyên:** Không tốn tài nguyên (Manaless / Cooldown-gated).
- **Điểm mạnh nhất:**
  - Độ chống chịu tự nhiên cực cao ở trạng thái bọc thép cơ bản (+35 Giáp, +35 Kháng phép);
  - Khả năng mở giao tranh diện rộng mạnh mẽ với chiêu cuối R làm choáng 0.9s;
  - Lượng sát thương đầu ra đột biến khi chuyển sang Dạng Cuồng Chiến (+25% tốc đánh, +20% tốc chạy);
  - Khả năng khống chế diện rộng liên tục với 2 kỹ năng làm chậm (Q làm chậm 25%, E làm chậm 35%).
- **Điểm yếu chí mạng:**
  - Khi bung vảy (Dạng Cuồng Chiến), Rolo bị giảm ngay 25 Giáp; nếu bị đối phương câu kéo qua thời hạn khiên 2.5s, Rolo sẽ trở nên cực kỳ mỏng manh trước sát thương vật lý;
  - Kém cơ động hơn các sát thủ/đấu sĩ lướt nhiều nếu chiêu R và phím D đang hồi chiêu;
  - Tầm đánh cận chiến 1.8m đòi hỏi phải tiếp cận trực diện;
  - **Không có kỹ năng cuộn tròn lăn húc**: Rolo không thể tăng tốc lăn dài như Rammus, mọi pha tiếp cận đều là chạy bộ hoặc phi nước đại dũng mãnh bằng 4 chân.

---

## 3. Thể Hình, Silhouette & Phong Cách Di Chuyển (Locomotion)

| Đặc tính | Đặc tả chi tiết | Tiêu chí nhận diện camera MOBA |
|---|---|---|
| **Vóc dáng (Body)** | Cổ thú tê tê khổng lồ 4 chân (`quadruped_beast_pangolin`). Lưng gù bọc các phiến vảy sừng kim loại xếp lớp hình mái ngói từ trán, cổ, sống lưng kéo dài tới hết đuôi. Chiều cao vai ~1.45m, chiều dài thân ~2.6m (kể cả đuôi). | Dáng đứng 4 chân vững chắc như xe ủi đất bọc thép; đuôi bọc vảy to bè quét sát mặt đất. |
| **Locomotion (Di chuyển)** | Bước đi 4 chân đầm chắc, móng vuốt cào xới đất tạo tiếng "bịch... bịch... xoẹt"; khi tăng tốc (bật W hoặc R), Rolo phi nước đại dũng mãnh bằng 4 chân, lưng nhấp nhô cơ bắp cuồn cuộn. **TUYỆT ĐỐI KHÔNG CUỘN TRÒN LĂN HÚC**. | Mô hình bè ngang vững chãi, các phiến vảy sừng cọ xát vào nhau phát ra tiếng kim loại leng keng. |
| **Vũ khí chính** | **Vảy Sừng Cổ Kim & Song Trảo Thép**: Các phiến vảy hóa thạch bọc quặng đồng đen cổ đại sắc như lưỡi dao xếp lớp trên lưng, cùng bộ vuốt trước dài 45cm chuyên đào bới và xé toạc đá tảng. | Lớp vảy phát ánh kim xám chì và viền vàng đồng; vuốt sáng ánh kim loại lạnh. |
| **Trạng thái Tháo Vảy (Visual Shedding)** | Khi kích hoạt W, các phiến vảy trên lưng bung hé mở ra ngoài như cánh hoa thép hé nở, để lộ thớ cơ bắp đỏ au rực cháy năng lượng bên dưới. | Silhouette chuyển từ tròn trịa bọc thép sang gai góc, dữ tợn và hung hãn. |

---

## 4. Truyền Thuyết Cốt Lõi & Quan Hệ Thế Giới (Lore & World Context)

Rolo là linh thú thủ hộ của Dãy Núi Thiết Thạch – nơi lưu trữ những mạch quặng kim loại cổ xưa nhất của Cổ Linh Thần Giới. Trải qua hàng ngàn năm hấp thụ tinh hoa khoáng thạch, da thịt của Rolo đã đồng hóa cùng kim loại, tạo nên lớp vảy sừng cứng hơn cả thép tôi luyện. Tuy nhiên, đằng sau lớp vỏ bọc tưởng chừng bất hoại ấy là một dòng máu cuồng nộ của dã thú nguyên thủy.

Khi các cuộc chiến tranh giành tài nguyên nổ ra, Rolo không chỉ đứng yên chịu trận như một bia đỡ đạn. Mỗi khi lâm vào hiểm cảnh, nó chủ động tháo bung các phiến vảy giáp nặng nề, giải phóng sức mạnh tiềm tàng của cơ bắp để biến thành cỗ máy cào xé huỷ diệt mọi kẻ thù xâm phạm lãnh địa.

- **Mối quan hệ:**
  - *Bạn đồng hành cứng cỏi:* Rất tôn trọng sự kiên cố của Tản Sơn (#44) và Lò Rèn Forge (#17); thường cùng chia sẻ các mỏ khoáng quý.
  - *Kẻ thù tự nhiên:* Căm ghét những kẻ xảo quyệt dùng độc hoặc vũ khí sắc nhọn cấu rỉa từ xa.

---

## 5. Ba Điều Bắt Buộc Phải Giữ (Must-Keep Canon)

1. **Tuyệt đối KHÔNG cuộn tròn lăn húc (Anti-Rammus Trope):** Rolo chiến đấu và di chuyển hoàn toàn bằng thể hình 4 chân quái thú dũng mãnh, quất đuôi và cào vuốt.
2. **Cơ chế Tháo Vảy Chuyển Dạng (Scale Shedding):** Dạng bọc thép +35 Giáp/Kháng phép nền; bấm W bung vảy nhận khiên tạm thời và đổi sang dạng cuồng chiến (-25 Giáp, +20% MS, +25% AS trong 5s).
3. **Phản chế minh bạch cửa sổ bung vảy:** Đối thủ nhìn rõ thời điểm Rolo bung vảy để dồn sát thương trừng phạt lượng giáp bị sụt giảm.
