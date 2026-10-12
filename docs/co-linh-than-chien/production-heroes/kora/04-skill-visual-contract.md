# 04 · Skill Visual Contract — #32 Kora (Hải Mẫu Cổ Giáp)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#32 / kora`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](../76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](../79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** **Đôi Càng Thép Cửa Đập** (`sluice_gate_claws`).
- **Dạng tác động:** Cận chiến va đập kẹp nghiền cự ly gần ($1.9\text{m}$).
- **Quy cách diễn hoạt & Vệt đánh:**
  - *Animation:* Càng phải vươn ra mở rộng ngàm kẹp cơ khí $\rightarrow$ dập mạnh ngậm chặt vào mục tiêu; thân mai hơi giật lùi tạo lực phản chấn đầm chắc.
  - *Thời điểm trúng đòn (HIT frame):* Tại giây $0.15\text{s}$ (Frame 5 của clip $0.5\text{s}$).
  - *Vệt chuyển động (Weapon Trail):* Một vệt vòng cung kim khí màu đồng thau kết hợp bọt nước xanh lam sẫm.
  - *SFX:* Tiếng "CỐP - KENG" kim loại va đập nặng nề và tiếng xì hơi áp suất thủy lực ngắn từ lưng mai.
- **Phản hồi khi chặn đòn đạn đạo (Directional Shield Block Proc):**
  - Khi đạn đạo bắn vào mặt trước của Kora khi đang bật W: Mặt trước hai càng lóe sáng một màng chắn năng lượng sóng nước màu lục lam; tia lửa kim loại bắn ra kèm tiếng "BOONG" trầm đục dập tắt xung lực đạn.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Thiết Càng Nghiền Ép (`skill_q`)
1. **Cast targeting:** Cận chiến định hướng hình quạt ngắn (Short Cone Melee).
2. **Preview khi giữ nút:** Hình quạt góc $60^\circ$ cự ly $2.2\text{m}$ phía trước.
3. **Telegraph trước tác động:** Chiếc càng trái mở toang ngạc thép trong $0.15\text{s}$; các pít-tông trên càng co lại phát ra tiếng rít cơ khí.
4. **VFX thái & chất liệu:** Càng kẹp nghiến cực mạnh vào con mồi, sóng xung kích màu xanh lam bọt nước nổ tung tại điểm tiếp xúc; mảnh giáp đá vỡ văng tung tóe.
5. **Hit geometry server:** Khối nón góc $60^\circ$, bán kính $2.2\text{m}$.
6. **Collision:** Trúng đơn vị đầu tiên hoặc mọi đơn vị trong hình quạt.
7. **Lifetime:** $0.2\text{s}$.
8. **Damage/CC:** Sát thương vật lý và làm choáng $0.6\text{s}$ (trên đầu nạn nhân hiện icon mỏ neo bị kẹp gãy).

### 2.2. Kỹ Năng W — Cửa Đập Phòng Ngự (`skill_w`)
1. **Cast targeting:** Tự niệm (Self Cast).
2. **Preview:** Một đường bán nguyệt $180^\circ$ màu lục lam sáng hiển thị phía trước mặt Kora.
3. **Telegraph:** $0\text{s}$ gồng; kích hoạt tức thời.
4. **VFX thái & chất liệu:** Hai chiếc càng thép khép chặt lại trước ngực tạo bức tường chắn cơ khí; một màn chắn nước thủy triều hình vòm bao bọc góc $180^\circ$ phía trước; trên lưng mai 2 ống xả áp phun cột hơi nước trắng mờ liên tục.
5. **Hit geometry:** Vòng cung khiên góc $180^\circ$ bán kính $1.5\text{m}$ tính từ tâm Kora.
6. **Collision:** Cản và giảm $60\%$ sát thương đạn đạo bay vào vòm chắn.
7. **Lifetime:** Tồn tại $3.5\text{s}$ hoặc đến khi lớp khiên hấp thụ bị phá hủy.
8. **Damage/CC:** Hấp thụ sát thương và kích hoạt giảm đạn đạo.

### 2.3. Kỹ Năng E — Hải Triều Xung Kích (`skill_e`)
1. **Cast targeting:** Định hướng đường thẳng lướt tới (Skillshot Line Dash).
2. **Preview:** Dải chữ nhật dài $5.5\text{m}$, rộng $1.8\text{m}$ trên sàn đấu.
3. **Telegraph:** Kora thu 6 chân co sát đất trong $0.1\text{s}$, hơi nước phụt mạnh phía sau mai.
4. **VFX thái & chất liệu:** Thân cua lao vút tới như một khối đá lũy thép trượt trên lớp sóng nước màu lam đậm; hai bên mạn sườn rẽ sóng cuộn trào bọt trắng.
5. **Hit geometry:** Khối hộp di động dài $5.5\text{m} \times$ rộng $1.8\text{m}$.
6. **Collision:** Đẩy dạt kẻ địch sang 2 bên đường trượt.
7. **Lifetime:** Hoàn tất đường ủi trong $0.275\text{s}$ ($20\text{ m/s}$).
8. **Damage/CC:** Sát thương vật lý và làm chậm $35\%$ trong $1.2\text{s}$.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Hải Trấn Thần Uy (Chuẩn Tài Liệu 79)

```yaml
R · Hải Trấn Thần Uy · kora
fantasy:        Kora tích lũy áp suất thủy lực toàn thân, vươn cao đôi càng khổng lồ rồi nện sập xuống mặt đất, tạo ra trận địa chấn sóng thần cổ đại khóa chân và nghiền nát toàn bộ đội hình đối phương.
kit:            aim: area | radius: 5.5m | windup: 0.3s | delay: 0.2s | stun: 1.0s | physical AoE damage
phases:
  - Pha 1 (Hydraulic Surge / Windup t=0.0–0.3s): Kora gầm vang tiếng máy cơ khí trầm đục, toàn bộ 6 chân cắm sâu xuống đất; hai càng thép giương bổng lên trời, các van áp suất trên mai xả hơi nước trắng xì xì cực mạnh. Vòng tròn cảnh báo bán kính 5.5m hiện rõ trên sàn đấu.
  - Pha 2 (Impact Strike / Slam t=0.3s): Hai càng thép cùng lúc nện sập xuống mặt đất với lực ngàn cân; mặt đất tại tâm chấn nứt toác thành các khe nứt địa chấn rực sáng ánh nước xanh lam.
  - Pha 3 (Tidal Shockwave Propagation t=0.3–0.5s): Một vòng sóng thần nước mặn và đá sỏi cuộn trào từ tâm quét nhanh ra rìa bán kính 5.5m; áp lực nước dâng cao 2.5m hất tung bụi nước.
  - Pha 4 (Concussion & Damage t=0.5s): Toàn bộ kẻ địch trong vòng tròn nhận trọn sát thương vật lý, dính hiệu ứng làm choáng 1.0s; trên đầu hiện vòng xoáy bọt nước vỡ vụn.
  - Pha 5 (Receding Tide / Settle t=0.5–1.0s): Nước rút nhanh để lại các vệt bùn ướt và hơi ẩm bốc lên từ mặt đất nứt rạn; Kora thu càng về tư thế thủ vững chắc.
hitbox:         Khối trụ tròn diện rộng bán kính 5.5m quanh chân Kora; áp dụng choáng 1.0s đồng loạt cho mọi kẻ địch trong vùng.
animation:      Clip riêng `kora_r_slam`: Nhấc bổng thân và đôi càng lên cao, gồng cơ bắp/pít-tông, dập mạnh sập sàn và chống càng gầm vang.
VFX layers:     Layer chỉ báo mặt đất (vòng cảnh báo xanh lam) -> Layer xả hơi nước lưng mai -> Layer chấn động nứt đất -> Layer sóng thần bọt nước quét tròn -> Layer hơi nước lắng đọng.
SFX:            Tiếng còi hơi xả áp suất dồn dập -> Âm thanh "ẦM ĐÙNG" chấn động rung sàn đấu -> Tiếng sóng biển gầm thét -> Tiếng nước róc rách rút đi.
material:       PBR Shader nước mặn khúc xạ bọt trắng + Shader đá nứt rực sáng đồng thau.
camera read:    Độ đọc cực rõ nét; vòng bán kính 5.5m tương phản mạnh với nền đất; không che khuất thanh máu của tướng đồng minh hay đối thủ.
performance:    Hiệu ứng sóng nước sử dụng mesh distortion và ribbon particles tối đa 24 hạt GPU, tự hủy sau 0.8s; duy trì mượt mà 60 FPS trong giao tranh 5v5.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
