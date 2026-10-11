# 99 · Cổ Đăng Thảo / Đăng Mộc (Mok) — Master Concept Bible & Hội Đồng Thẩm Định Toàn Diện

**Thời điểm ban hành:** 12/10/2026  
**Trạng thái tài liệu:** `SCOUT_MASTER_BIBLE / RATIFIED_BY_7_ROLES / PENDING_OWNER_FINAL_APPROVAL`  
**Hội đồng thẩm định:** 7 Thành viên độc lập (Gameplay, Archetype, AI Pipeline, UX/Camera, Balance, IP Risk, Marketing).  
**Đầu vào đối soát:** Gợi ý của Owner về Archetype Trinh Sát từ tam giác *Maokai + Teemo + Lux*.

---

## 1. Bản Đồ Hội Tụ Của 7 Chuyên Gia (The 7-Role Consensus & Guardrails)

```
                            [ĐĂNG MỘC / MOK - TRINH SÁT CỔ LINH]
                                            │
        ┌─────────────────────────┬─────────┴─────────┬─────────────────────────┐
        ▼                         ▼                   ▼                         ▼
   [GAMEPLAY LEAD]        [ARCHETYPE ANALYST]   [AI PRODUCTION]           [UX REVIEWER]
- Lantern Warp & Glide  - Mạch rễ quang học   - 9.6/10 Khả thi         - Cấm Flash trắng
- Tầm nhìn đi kèm phạt  - Khúc xạ bẻ góc đạn  - 1.2-1.5m biped         - Safe Pocket 450u
- 3 nhịp combat 5v5     - Thoát bẫy Teemo/AP  - 1 Draw Call instancing - Decal neo sàn Z=0
        │                         │                   │                         │
        └─────────────────────────┼───────────────────┴─────────────────────────┘
                                  ▼
                         [BALANCE REVIEWER]
                      - Tối đa 3 Hoa Đèn trên map
                      - Độ trễ nổ 0.75s (cho phép né bằng Dash D)
                      - Sát thương nhỏ, cấm nuke AP
                      - Skillshot mù có đường bay
                                  │
        ┌─────────────────────────┴─────────────────────────┐
        ▼                                                   ▼
   [IP RISK REVIEWER]                              [MARKETING REVIEWER]
- CẤM sóc/chuột Yordle & ống thổi (Teemo)       - Điểm thị hiếu 93/100 (S-Tier)
- CẤM người cây Treant & chồi chạy (Maokai)     - Mascot quốc dân (Baby Groot vibe)
- CẤM tiểu thư Demacia & laser 7 màu (Lux)      - Highlight "Caught in 4K"
- Biophilic Automaton: Gỗ hổ phách + đồng cổ    - Slogan: "Đêm tối thuộc về các ngươi..."
```

---

## 2. One-Page Concept Bible: Đăng Mộc / Mok (#37-New Candidate)
*Thần Thụ Thắp Sáng — Pháp Sư Trinh Sát / Hỗ Trợ Kiểm Soát Quang Học*

### 1. Player Fantasy
> *"Tôi pick Mok vì không một kẻ nào có thể ẩn nấp trong khu rừng của tôi: Tôi biến bóng tối sợ hãi của đối thủ thành sân khấu ánh sáng của riêng mình. Tôi soi sáng chiến trường từ xa an toàn, giăng mạng lưới mạch rễ báo động và trói nghiến kẻ địch trong hào quang rực rỡ."*

### 2. Silhouette & Nhận Diện Thị Giác
- **Hình thể:** Thực thể thực vật cơ khí cổ sinh (Biophilic Automaton) nhỏ nhắn (cao cỡ $1.3\text{m} - 1.5\text{m}$), đan kết từ gỗ hóa thạch màu hổ phách và khung đồng cổ oxy hóa màu lam ngọc.
- **Vũ khí / Đặc trưng:** Một **Nhánh Đăng Mạch** vươn từ sau gáy vòng qua vai ra phía trước, treo lơ lửng một **Cổ Đăng Tinh Thạch** phát ra ánh sáng huỳnh quang hổ phách dịu mắt.
- **Camera Isometric:** Nhận diện ngay lập tức bằng chiếc đèn lồng đung đưa tự nhiên theo từng bước chạy lon ton; khi cắm cọc đèn, vệt sáng nở ra trên mặt đất theo trục $Z=0$ với viền dạ quang hổ phách ấm.
- **Khóa thiết kế IP (100% An toàn):** Không lông lá chuột Yordle, không mũ thám hiểm ống thổi Teemo; không thân cây cồng kềnh Maokai; không tiểu thư váy áo Lux.

### 3. Core Gameplay Toy & Loop
- **Cổ Đăng Trinh Sát & Mạch Rễ Phát Quang (Leyline Lantern Network):**
  - **Phóng Cổ Đăng Tầm Xa (Nhịp Lux E):** Mok ném một Cổ Đăng Tinh Thạch cắm vào vị trí chỉ định cách xa tới 1000 unit (xuyên địa hình/bụi rậm) $\rightarrow$ Ngay lập tức mở toang sương mù (Fog of War) trong bán kính 450 unit mà **không cần face-check**.
  - **Mạch Rễ Báo Động (Nhịp Maokai / Teemo cải tiến):** Cắm từ 2 Đèn Lồng trở lên, rễ cây quang tử sẽ tự động nối ngầm giữa các đèn. Kẻ địch cắt qua đường rễ sẽ làm đứt mạch sáng, rung chuông cơ khí cảnh báo toàn đội và bị gắn ấn "Phơi Bày" (Exposed). Đồng minh di chuyển trên mạch rễ được tăng $25\%$ tốc độ chạy.
  - **Lướt Rễ Thần Tốc (High-mobility Grapple):** Mok có thể kích hoạt phóng dây rễ kéo bản thân lướt xuyên địa hình bay về phía ngọn Cổ Đăng gần nhất để đào thoát hoặc tiếp cận.
- **Nhịp thở giao tranh 5v5:**  
  *Tiền giao tranh:* Ném đèn soi hang Rồng/Baron $\rightarrow$ *Mở giao tranh:* Nối mạch rễ bẻ góc kỹ năng của team và lướt vào $\rightarrow$ *Ultimate:* Kích hoạt toàn bộ đèn bùng nổ quầng hào quang làm chói mắt diện rộng và trói chân kẻ địch trên mạch rễ.

### 4. Player Agency
- Bàn cờ ánh sáng chiến thuật: Người chơi tự quyết định giăng mạng lưới đèn lồng ở các cửa ngõ hiểm yếu (choke points) để biến vùng rừng đối phương thành khu vực sáng đèn an toàn cho toàn đội khai thác tài nguyên.

### 5. Counterplay & Victim Agency (Cửa Sống Tuyệt Đối)
- **Đèn có thể bị phá hủy (3 Hit Wards):** Cổ Đăng phát quang rõ ràng trong sương mù, không tàng hình vô lý. Kẻ địch có thể dùng kỹ năng định hướng rà quét từ xa hoặc đánh 3 đòn đánh thường để phá hủy đèn, nhận thưởng 15 vàng.
- **Độ trễ kích nổ 0.75s:** Nếu đạp trúng nụ hoa bẫy, hoa phồng to và hiện vòng cảnh báo màu đỏ trong 0.75 giây, cho phép nạn nhân bấm nút **Dash (D)** phản xạ thoát ra an toàn.
- **Khóa tầm nhìn (Near-Sight) an toàn sinh lý:** Hiệu ứng làm mù của Mok chỉ kéo dài 1.5s và **luôn giữ lại vòng nhìn an toàn 450 unit quanh người nạn nhân** (vignette màu chàm dịu, KHÔNG chớp trắng flashbang, KHÔNG rung camera, KHÔNG che thanh máu). Nạn nhân vẫn nhìn thấy bản thân và cận chiến để tự vệ hoặc lùi lại.

### 6. Khác Biệt Cùng Vai Trò (Why Pick Over Inka / Libro / Jeli?)
- Inka kiểm soát bằng mực chia cắt đất; Libro hoãn nợ sốc sát thương; Jeli hồi máu nhịp chuông; **Mok là tướng duy nhất làm chủ hoàn toàn sương mù chiến tranh và mạng lưới thông tin tình báo**, biến cả bản đồ tối tăm thành lợi thế tuyệt đối cho team mình.

---

## 3. Khung Quy Chuẩn Sản Xuất AI & Kỹ Thuật Unity 6 Mobile

- **Polycount:** 8.500 Triangles (Hero) + 300 Triangles (Cổ Đăng).
- **Khung xương:** Biped chuẩn 24 bones + 3 bones cuống đèn (`SpringBone` physics nhẹ ~0.02ms).
- **Shader:** URP Stylized PBR với Emission Mask nhịp thở (Zero Realtime Point Light).
- **Batching:** GPU Instancing toàn bộ các Cổ Đăng cắm trên sân thành **1 Draw Call duy nhất**.
- **Luật Cấm Pet/RTS:** Cổ Đăng là Static Prop cắm rễ cố định, **zero NavMesh, zero AI pathfinding**.

---

## 4. Đề Xuất Phân Bổ Roster V5

Hội đồng đề xuất Owner đưa **Đăng Mộc / Mok** vào danh sách ứng cử viên chính thức của nhóm **Hỗ Trợ / Pháp Sư Kiểm Soát (Scout / Control Mage)** để bù đắp hoàn hảo sự thiếu hụt vị trí này trong Roster V5!
