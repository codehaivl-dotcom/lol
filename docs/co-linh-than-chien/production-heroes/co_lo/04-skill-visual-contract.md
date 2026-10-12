# 04 · Skill Visual Contract — #47 Cổ Lỗ (Huyền Quy Thần Cơ Sư)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#47 / co_lo`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Nỏ Thần Cơ Khí Đa Nòng (Liên Châu Nỏ).
- **Dạng tác động:** Đạn đạo tầm xa cơ khí (Ballistic Crossbow Bolt).
- **Trạng thái Di Động (Tầm 5.5m):**
  - *Animation:* Cổ Lỗ hơi khom người, nạp tên và siết cò; một mũi tên đồng bọc ánh sáng vàng kim bắn vút đi.
  - *HIT frame:* Tại giây $0.15\text{s}$. Vận tốc bay: $32\text{ m/s}$.
  - *VFX:* Mũi tên đồng có vệt sáng vàng kim mỏng và khói cơ khí xám phía đuôi.
- **Trạng thái Cắm Chốt (Tầm 8.5m & Vùng mù 2.5m):**
  - *Animation:* Nòng nỏ nâng cao góc bắn, bánh răng tinh thạch xoay tít, mũi tên bắn ra với tần suất dồn dập và uy lực hơn.
  - *VFX neo sàn:* Bốn chân cơ khí cắm phập xuống đất, vòng tròn hoa văn Tinh Thạch màu vàng đồng bừng sáng dưới chân bán kính $0.85\text{m}$.
  - *VFX Vùng Mù:* Một vòng tròn cảnh báo màu đỏ gạch chéo bán kính $2.5\text{m}$ hiển thị mờ quanh chân để báo hiệu góc mù cận chiến.
- **SFX:** Tiếng cót két của bánh răng cơ khí, tiếng nảy cò nỏ đanh thép "TÁCH - PHẬP" và tiếng mũi tên cắm sâu vào mục tiêu.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Liên Châu Xuyên Kích (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line Burst).
2. **Preview khi giữ nút:** Dải mũi tên hẹp dài $8.5\text{m}$, rộng $1.4\text{m}$ trên mặt đất.
3. **Telegraph trước khi tác động:** Cổ Lỗ ghì chặt báng nỏ trong $0.15\text{s}$, 3 nòng nỏ phát quang ánh sáng vàng chói.
4. **VFX trạng thái & chất liệu:** Ba mũi tên thần cơ khí bọc luồng sét vàng óng phóng nối tiếp nhau thành một chùm mũi tên xuyên thấu, để lại vệt sáng rực rỡ xé toạc không khí.
5. **Hit geometry server:** Khối hộp chữ nhật di động kích thước dài $8.5\text{m} \times$ rộng $1.4\text{m}$.
6. **Collision:** Xuyên qua toàn bộ đơn vị trên đường bay.
7. **Lifetime:** Bay hết quãng đường trong $0.26\text{s}$ (tốc độ $32\text{ m/s}$).
8. **Damage/CC:** 3 đợt sát thương vật lý dồn dập và làm chậm $20\%$ trong $1.0\text{s}$.

### 2.2. Kỹ Năng W — Cắm Chốt Huyền Quy (`skill_w`)
1. **Cast targeting:** Tự niệm chuyển dạng (Self Stance Toggle).
2. **Preview:** Vòng tròn tầm bắn pháo đài $8.5\text{m}$ mở rộng cùng vòng tròn mù $2.5\text{m}$ bên trong.
3. **Telegraph:** Thời gian gồng cắm chân $0.6\text{s}$; 4 chân cơ khí từ mai rùa bung ra cắm mạnh xuống đất.
4. **VFX trạng thái & chất liệu:** Bụi đất nổ tung quanh 4 chân cắm; các hoa văn đồng mai rùa phát quang ánh sáng vàng kim, mặt lưng mai rùa khép kín tạo thành một bức tường đồng che chắn phía sau lưng. Một lớp khiên năng lượng lục giác bọc quanh thân.
5. **Hit geometry server:** Cố định vị trí hitbox của Cổ Lỗ tại tọa độ cắm chốt.
6. **Collision:** Tốc độ di chuyển giảm về 0; không thể bị xê dịch bởi các kỹ năng kéo thông thường nếu chưa bị phá vỡ khiên.
7. **Recast VFX:** Bốn chân cơ khí bật ngược thu vào trong mai rùa sau $0.4\text{s}$, vòng sáng dưới đất tắt ngấm.

### 2.3. Kỹ Năng E — Thần Cơ Kích Thoái (`skill_e`)
1. **Cast targeting:** Định hướng đường thẳng cự ly gần (Close-range Line Skillshot).
2. **Preview:** Dải chữ nhật ngắn màu vàng cam dài $5.0\text{m}$, rộng $1.5\text{m}$.
3. **Telegraph:** Cổ Lỗ nạp một mũi tên cọc cơ khí kích thước lớn vào nòng chính trong $0.1\text{s}$.
4. **VFX trạng thái & chất liệu:** Một mũi tên cọc bằng đồng đen có ngạnh sắt to bản bắn ra với luồng phản lực khói trắng cực mạnh, tạo sóng xung kích hất văng mục tiêu đầu tiên trúng đòn ra xa $3.5\text{m}$.
5. **Hit geometry server:** Khối trụ nằm ngang dài $5.0\text{m} \times$ rộng $1.5\text{m}$.
6. **Collision:** Tác động vào mục tiêu đầu tiên va chạm.
7. **Lifetime:** Hoàn tất trong $0.18\text{s}$ (tốc độ $28\text{ m/s}$).
8. **Damage/CC:** Sát thương vật lý, đẩy lùi $3.5\text{m}$ và làm chậm $30\%$.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Vạn Tiễn Quy Tông (Chuẩn Tài Liệu 79)

```yaml
R · Vạn Tiễn Quy Tông · co_lo
fantasy:        Cổ Lỗ nâng góc bắn cỗ nỏ thần cơ lên trời, khai hỏa bão tiễn liên châu hàng vạn mũi tên sao băng xé toạc tầng mây rồi dội bão lửa xuống khu vực chỉ định từ khoảng cách nửa bản đồ.
kit:            aim: area | range: 12.0m | radius: 4.5m | windup: 0.3s | delay: 0.4s | slow: 0.4s | physical damage
phases:
  - Pha 1 (Cast / Invocation t=0.0–0.3s): Cổ Lỗ ngửa cổ nòng nỏ lên góc 75 độ, hệ thống bánh răng Tinh Thạch quay cuồng phát ra tiếng rít cơ khí cực đại, nòng nỏ tích tụ quả cầu năng lượng vàng rực chói lọi.
  - Pha 2 (Launch / Sky Volley t=0.3–0.4s): Một chùm hàng trăm mũi tên ánh sáng phóng vút lên không trung xé toạc bầu trời, để lại dải vệt khói sao băng vàng óng kéo dài lên mây.
  - Pha 3 (Signature Structure t=0.4–0.7s): Tại khu vực chỉ định cách 12.0m, một vòng tròn hoa văn thành ốc Cổ Loa chín vòng phát quang màu đỏ cam cảnh báo vùng tiễn rơi bán kính 4.5m.
  - Pha 4 (Impact Đỉnh t=0.7–1.0s): Hàng vạn mũi tên năng lượng dội thẳng từ trên trời xuống như mưa sao băng; mặt đất nát vụn dưới hỏa lực bão tiễn, toàn bộ kẻ địch trong bán kính 4.5m chịu 100% sát thương khủng (+105% Bonus AD) và bị làm chậm 40% trong 1.5s.
  - Pha 5 (Decay / Arrow Field t=1.0–3.0s): Mưa tiễn dừng lại, hàng trăm mũi tên đồng cắm chi chít trên mặt đất phát quang nhạt rồi tan biến dần thành các hạt bụi ánh sáng trong 2.0 giây.
hitbox:         Hình tròn bán kính 4.5m tại tâm điểm rơi; tác động đồng loạt lên toàn bộ mục tiêu trong phạm vi.
animation:      Clip riêng `co_lo_r`: Nâng nòng nỏ góc cao -> Bánh răng quay -> Khai hỏa giật lùi thân người -> Hạ nòng nỏ về vị trí cũ.
VFX layers:     Layer quả cầu năng lượng nòng nỏ -> Layer vệt bay sao băng lên trời -> Layer trận đồ thành ốc Cổ Loa cảnh báo -> Layer mưa vạn tiễn dội đất -> Layer bụi tiễn tan biến.
SFX:            Tiếng bánh răng cơ khí quay rít gầm -> Tiếng "VÚT VÚT" liên hoàn khi phóng -> Tiếng mưa tiễn rít trên không -> Tiếng vạn mũi tên cắm ầm ầm xuống đất ("PHẬP PHẬP PHẬP").
material:       Shader kim loại đồng cổ kết hợp hạt năng lượng vàng kim rực rỡ và khói bụi cơ khí.
camera read:    Vùng cảnh báo thành ốc Cổ Loa hiện rõ 0.4s trước khi tiễn rơi, tạo cửa sổ cảnh báo chuẩn mực cho đối phương.
performance:    Mưa tiễn sử dụng GPU instanced particles tối ưu hóa, tối đa 60 mũi tên hiển thị cùng lúc; bảo đảm duy trì 60 FPS.
status:         PASS_MODEL (Thiết kế hoàn tất) / TESTED_SIM (Đã kiểm chứng trong wave3-gameplay-toys.test.mjs).
```
