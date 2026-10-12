# 04 · Skill Visual Contract — #49 Kymos (Thạch Âm Điểm Rung Hạ Âm)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#49 / kymos`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Vũ khí thực hiện:** Thanh khánh đá ngọc thạch phẳng (Lithophone Stone).
- **Dạng tác động:** Đạn đạo sóng rung chấn tầm xa (Ranged Infrasonic Wave Projectile).
- **Animation cử động:** Kymos dộng nhẹ bàn tay đá vào thanh khánh phẳng lơ lửng, một gợn sóng âm phẳng xé gió bay đi.
- **Thời điểm phóng đạn (Release Frame):** Tại giây $0.16\text{s}$ của animation đòn đánh.
- **Hình thái đạn đạo (Projectile VFX):** Một đĩa sóng âm hình lưỡi rìu ngọc thạch màu xanh rêu viền vàng đất (đường kính $0.4\text{m}$), bay sát mặt đất ($24\text{m/s}$). Đuôi đạn tạo gợn sóng rung làm nứt nhẹ mặt đất.
- **Điểm tiếp xúc & Phản hồi va chạm (Impact Feedback):** Chạm mục tiêu nổ tung thành bụi đá và các vòng sóng âm tròn dập vào ngực đối thủ.
- **SFX:** Tiếng gõ đá trầm đặc "CỘC..." và âm trầm sub-bass rung chuyển lồng ngực. Tuyệt đối không có tiếng leng keng của chuông nước.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Nội Tại — Thạch Âm Điểm Rung Hạ Âm (`passive: acoustic_node`)
1. **Cast targeting:** Kích hoạt tự động khi cắm W.
2. **Preview khi giữ nút:** Vòng tròn bán kính $4.5\text{m}$ màu xanh rêu đất hiển thị quanh điểm cắm.
3. **Telegraph trước khi tác động:** Không có (theo đòn cắm W).
4. **VFX thái & chất liệu:** Một thanh khánh đá cổ màu ngọc thạch xám xanh cắm sâu $0.4\text{m}$ vào sàn đấu, cao $1.2\text{m}$. Từ chân khánh đá tỏa ra các vòng sóng hạ âm hình gợn sóng đồng tâm (Concentric Infrasound Ripples) bán kính $4.5\text{m}$. Mặt đất trong vùng có hiệu ứng rung lắc nhẹ (Screen Shake tinh tế); đồng minh đứng bên trong có hào quang khiên đá trong suốt bao bọc. Khi giảm sát thương sốc: Một đợt sóng phản hồi bùng lên cắt gọt đòn đánh, hiển thị số giảm trừ kèm ký hiệu "Triệt Tiêu".
5. **Hit geometry server:** Khối trụ tròn bán kính $4.5\text{m}$, chiều cao $2.5\text{m}$ quanh cọc cắm.
6. **Collision:** Có mesh cọc tĩnh nhỏ ($r = 0.2\text{m}$); không cản trở di chuyển của tướng và lính.
7. **Lifetime:** Tồn tại chính xác **3.5 giây**.
8. **Damage/CC/Buff:** Giảm $40\%$ sát thương bộc phát cho đồng minh trong vùng.

### 2.2. Kỹ Năng Q — Thạch Ba Kích (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng (Skillshot Line).
2. **Preview khi giữ nút:** Dải decal đường thẳng dài $8.0\text{m}$, rộng $1.5\text{m}$ màu xanh rêu đất trên sàn đấu.
3. **Telegraph trước khi tác động:** Kymos ngửa người vung mạnh tay đá trong $0.15\text{s}$, các thanh khánh rung lên phát ra tiếng gầm hạ âm.
4. **VFX thái & chất liệu:** Một đợt sóng xung chấn hạ âm dạng lưỡi rìu đá xé toạc mặt đất bay thẳng ($26\text{m/s}$), làm bung các phiến đá nhỏ hai bên đường đạn. Khi chạm mục tiêu, sóng nổ tạo vòng chấn động làm chậm kẻ địch.
5. **Hit geometry server:** Khối trụ quét theo hướng (Capsule Sweep), bán kính $0.75\text{m}$ (rộng $1.5\text{m}$), dài $8.0\text{m}$.
6. **Collision:** Dừng lại ở tướng hoặc quái đầu tiên trúng phải.
7. **Lifetime:** Bay tối đa $0.3\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($50 - 170 + 0.45\text{AP}$) và làm chậm $30\%$ trong $1.2\text{s}$.

### 2.3. Kỹ Năng W — Điểm Rung Hạ Âm (`skill_w`)
1. **Cast targeting:** Tự niệm tức thời diện rộng quanh thân kết hợp cắm cọc (Self PBAoE / Anchor).
2. **Preview khi giữ nút:** Vòng tròn bán kính $5.5\text{m}$ quanh chân Kymos.
3. **Telegraph trước khi tác động:** $0\text{s}$ windup (Kích hoạt tức thì).
4. **VFX thái & chất liệu:** Kymos dộng thẳng tay xuống đất, thanh khánh đá chính cắm phập xuống sàn. Một đợt sóng chấn hạ âm lan tỏa cực nhanh bán kính $5.5\text{m}$, bao bọc toàn bộ đồng minh trong một lớp khiên ngọc thạch vững chắc; các hạt tinh thạch xanh rêu dâng lên hồi máu. Đồng thời kích hoạt vùng nội tại $4.5\text{m}$.
5. **Hit geometry server:** Khối trụ tròn bán kính $5.5\text{m}$, chiều cao $2.5\text{m}$ quanh Kymos.
6. **Collision:** Không cản đường di chuyển.
7. **Lifetime:** Sóng lan tỏa trong $0.3\text{s}$; khiên tồn tại $3.5\text{s}$; cọc tồn tại $3.5\text{s}$.
8. **Damage/CC/Buff:** Cấp khiên ($75 - 215$), hồi máu ($40 - 140 + 0.25\text{AP}$) và kích hoạt vùng giảm $40\%$ sát thương sốc.

### 2.4. Kỹ Năng E — Cộng Hưởng Thạch Cầm (`skill_e`)
1. **Cast targeting:** Tỏa tròn quanh thân (Area PBAoE).
2. **Preview khi giữ nút:** Vòng tròn bán kính $4.0\text{m}$ quanh chân Kymos.
3. **Telegraph trước khi tác động:** Kymos chắp hai tay đá trước ngực trong $0.1\text{s}$, các phiến đá sau lưng phát sáng.
4. **VFX thái & chất liệu:** Kymos đập mạnh hai bàn tay vào nhau, một đĩa sóng âm phẳng $360^\circ$ màu xanh đen quét ngang tầm thắt lưng, hất văng nhẹ các mục tiêu cận chiến ra xa $1.5\text{m}$ kèm bụi đất tung mù mịt.
5. **Hit geometry server:** Khối trụ tròn bán kính $4.0\text{m}$, chiều cao $1.5\text{m}$ quanh Kymos.
6. **Collision:** Đẩy lùi vật lý nhẹ đơn vị địch cận chiến.
7. **Lifetime:** Đĩa sóng quét trong $0.2\text{s}$.
8. **Damage/CC/Buff:** Sát thương phép ($45 - 145 + 0.35\text{AP}$), đẩy lùi $1.5\text{m}$ và làm chậm $25\%$ trong $1.2\text{s}$.

---

## 3. Đặc Tả 5 Pha Chiêu Cuối R — Vạn Âm Tĩnh Lặng (Chuẩn Tài Liệu 79)

Kỹ năng R tuân thủ tuyệt đối cấu trúc 5 pha thời gian của chuẩn Ultimate:

```
[0.0s - 0.25s]       [0.25s]             [0.25s - 0.5s]          [0.5s - 3.5s]             [3.5s - 4.0s]
PHA 1: TELEGRAPH  -> PHA 2: CAST/RELEASE -> PHA 3: PEAK IMPACT -> PHA 4: LINGERING ZONE -> PHA 5: RECOVERY
Dộng hai tay xuống,  Nén xung hạ âm,     Đại sóng chấn dội sàn,  Vùng tĩnh lặng 6.5m,      Khánh đá thu về,
mặt đất nứt toác     âm thanh tắt lịm    đại khiên & hồi phục    làm chậm kẻ địch          thu về trạng thái
```

1. **Pha 1 — Telegraph & Windup (0.0s đến 0.25s):**
   - Kymos nâng cả hai bàn tay đá khổng lồ lên cao, toàn bộ các thanh khánh đá sau lưng bay vòng quanh người xoay tít.
   - Mặt đất trong bán kính $6.5\text{m}$ rung chuyển dữ dội, hiện viền cổ tự thạch âm màu xanh rêu phát sáng. Toàn bộ âm nhạc nền game bị nén nhỏ dần (Audio Ducking).
2. **Pha 2 — Cast & Release Frame (Tại giây 0.25s):**
   - Kymos dộng cả hai nắm đấm đá xuống sàn đấu, một tiếng "ẦM..." cực trầm rung chuyển toàn bộ loa sub-bass, toàn bộ âm thanh tạp âm chiến trường bị triệt tiêu hoàn toàn trong chớp mắt.
3. **Pha 3 — Peak Impact & Surge (0.25s đến 0.5s):**
   - Đại sóng hạ âm khổng lồ bùng nổ từ tâm điểm quét qua bán kính $6.5\text{m}$.
   - Toàn bộ đồng minh nhận ngay lượng hồi phục lớn ($110 - 230 + 0.35\text{AP}$) và lớp khiên đại trào ngọc thạch kiên cố ($90 - 190$).
   - Toàn bộ kẻ địch bị dính chấn động làm chậm $35\%$ trong $2.0\text{s}$.
4. **Pha 4 — Lingering Zone & Field Control (0.5s đến 3.5s):**
   - Toàn bộ mặt sàn trong bán kính $6.5\text{m}$ duy trì trạng thái sóng hạ âm lăn tăn trong $3.0\text{s}$, duy trì lớp khiên và làm chậm đối thủ.
5. **Pha 5 — Recovery & End State (3.5s đến 4.0s):**
   - Các thanh khánh đá bay trở lại vị trí treo sau lưng.
   - Âm thanh chiến trường dần dần mở lại bình thường; Kymos đứng thẳng dậy uy nghiêm.
