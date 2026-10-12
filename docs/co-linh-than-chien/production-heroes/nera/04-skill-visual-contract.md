# 04 · Skill Visual Contract — #07 Nera (Dạ Neo)

**Trạng thái:** `VISUAL_CONTRACT_SPEC / READY_FOR_ART`  
**Khóa định danh:** `#07 / nera`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 76 (Chuẩn hình học skill & đánh thường)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/76-chuan-hinh-hoc-skill.md) & [Tài liệu 79 (Chuẩn Ultimate)](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/79-chuan-ultimate.md)

---

## 1. Hồ Sơ Thị Giác Đòn Đánh Thường (Basic Attack Visual Profile)

- **Loại vũ khí:** Nỏ Tời Cơ Khí Dạ Neo (Anchor Winch Crossbow).
- **Dạng tác động:** Đạn đạo cơ khí tầm xa có vệt sáng (Ranged Projectile with Trail).
- **Animation:** Nera giơ cánh tay phải ngắm bắn, ngón tay bóp cò nỏ; cánh nỏ kim loại bật bung đàn hồi phóng mũi tên đồng thau; cuộn tời sau cẳng tay quay tít xả một đoạn cước phát quang xanh lam nhạt.
- **Tốc độ đạn bay:** `38 m/s` (Tầm 7.0m bay tới trong $0.18\text{s}$).
- **Thời điểm ra đòn (HIT frame):** Tại giây $0.10\text{s}$ của animation bắn.
- **Vệt chuyển động (Weapon Trail):** Mũi tên để lại vệt cước phát quang màu xanh đêm (Night Blue) sắc mảnh; đuôi mũi tên có 3 cánh lông vũ Cổ Linh nhỏ.
- **SFX:** Tiếng "TÁCH" cơ khí khi cò nhả $\rightarrow$ Tiếng "XOẸT" xé gió sắc gọn $\rightarrow$ Tiếng "PHẬP" khi ghim vào mục tiêu.

---

## 2. Đặc Tả Hình Học & Thị Giác Bộ Kỹ Năng (Chuẩn Tài Liệu 76)

### 2.1. Kỹ Năng Q — Xuyên Thấu Tiễn (`skill_q`)
1. **Cast targeting:** Định hướng đường thẳng tầm xa (Skillshot Piercing Line).
2. **Preview khi giữ nút:** Dải chữ nhật màu xanh lam dạ quang dài 9.5m, rộng 1.4m trên mặt đất.
3. **Telegraph trước khi tác động:** Cụm nỏ bên tay phải phát sáng rực rỡ, hai cánh nỏ mở rộng tối đa trong 0.12s.
4. **VFX thái & chất liệu:** Một mũi tên năng lượng Cổ Linh cực lớn phóng vút đi; thân mũi tên bọc trong luồng gió xoáy năng lượng xanh lam đậm; khi bay xuyên qua lính tạo hiệu ứng sóng xung kích gợn sóng hai bên sườn; khi trúng tướng địch mũi tên phát nổ tung bọt năng lượng làm chậm.
5. **Hit geometry server:** Khối hộp di động dài 9.5m $\times$ rộng 1.4m.
6. **Collision:** Xuyên qua toàn bộ lính và quái; dừng đạn đạo khi trúng tướng địch đầu tiên.
7. **Lifetime:** Hoàn tất đường bay trong 0.28s (tốc độ 34 m/s).
8. **Damage/CC:** Sát thương đầy đủ cho toàn bộ mục tiêu xuyên qua; làm chậm 25% trong 1.2s tướng đầu tiên.

### 2.2. Kỹ Năng W — Phóng Tời Hai Chiều (`skill_w`)
1. **Cast targeting:** Định hướng phóng móc kèm lướt lùi phản lực (Skillshot Hook & Recoil Dash).
2. **Preview:** Dải mũi tên kép: Một dải phóng móc phía trước dài 7.0m, rộng 1.6m; một dải lướt lùi phía sau lưng dài 4.5m biểu thị hướng rút lui.
3. **Telegraph:** 0.1s; nòng nỏ hạ thấp và cuộn tời cơ khí rít lên âm thanh "KÉTTT".
4. **VFX thái & chất liệu:** Mỏ neo thép ba ngạnh phóng ra phía trước nối với sợi cáp kim loại phát quang; ngay khi neo chạm đích hoặc đạt tầm tối đa, cuộn tời giật mạnh tạo lực đẩy phản hồi; Nera lướt bay lùi lại 4.5m để lại vệt tàn ảnh áo choàng xanh đêm; kẻ địch trúng mỏ neo bị luồng xích quấn quanh chân phát tia lửa cơ khí làm chậm 35%.
5. **Hit geometry:** Hitbox móc neo dài 7.0m $\times$ rộng 1.6m; Hitbox di chuyển lướt lùi 4.5m ngược hướng bắn.
6. **Collision:** Va chạm tướng địch đầu tiên; kéo giật Nera lùi lại ngay lập tức.
7. **Lifetime:** Toàn bộ pha phóng và lướt lùi hoàn tất trong 0.35s.
8. **Damage/CC:** Sát thương vật lý và làm chậm 35% trong 1.5s.

### 2.3. Kỹ Năng E — Lưới Neo Dây Bẫy (`skill_e`)
1. **Cast targeting:** Vòng tròn chọn điểm mặt đất (Ground Target Area Trap).
2. **Preview:** Vòng tròn bán kính 3.4m, tầm chọn điểm 7.5m.
3. **Telegraph:** Nera vung tay trái ném một khối lựu cơ khí chứa cuộn lưới trong 0.15s.
4. **VFX thái & chất liệu:** Khối cơ khí chạm đất bung mở thành một mạng lưới dây cáp gai góc bám sát mặt đất phát quang màu xanh ngọc bích; các cọc neo nhỏ cắm sâu vào mặt đất; khi kẻ địch bước vào, các sợi dây cáp giật siết lại tạo hiệu ứng quấn chân và làm chậm 30%.
5. **Hit geometry:** Hình trụ tròn bán kính 3.4m đặt tại điểm chỉ định.
6. **Collision:** Vùng bẫy tồn tại 3.5s; mọi kẻ địch bước qua đều nhận hiệu ứng.
7. **Lifetime:** Tồn tại trong 3.5s trên mặt đất.
8. **Damage/CC:** Gây sát thương vật lý khi bung lưới và duy trì làm chậm 30% trong 1.5s.

---

## 3. Đặc Tả Chiêu Cuối Ultimate R — Đại Cực Neo Trấn Áp (Chuẩn Tài Liệu 79)

```
R · Đại Cực Neo Trấn Áp · nera
fantasy:        Nera nạp năng lượng cực đại vào cụm nỏ tời, phóng ra Mỏ Neo Dạ Thần khổng lồ từ cự ly 12m ghim xuyên qua lồng ngực đối phương, giật mạnh cuộn tời cơ khí kéo lê mục tiêu lệch vị trí và làm choáng hoàn toàn kẻ địch.
kit:            aim: extreme skillshot | range: 12.0m | width: 1.8m | speed: 32 m/s | delay: 0.0s | windup: 0.25s | stun: 1.2s | pull: 2.0m | physical damage
phases:         
  - Pha 1 (Cast / Invocation t=0.0–0.25s): Nera khuỵu một gối xuống đất giữ thế bắn tỉa vững chắc; toàn bộ khung nỏ bên tay phải mở rộng các ngàm cơ khí; mỏ neo Dạ Thần phát sáng luồng năng lượng xanh lam đậm xoay tít tụ lực; tiếng cuộn tời lên dây cót kêu giòn vang.
  - Pha 2 (Projectile Flight t=0.25–0.62s): Mỏ neo khổng lồ phóng đi xé toạc không gian cự ly 12.0m; sợi xích năng lượng Cổ Linh to bằng bắp tay bám theo đuôi neo rít lên chói tai; luồng sóng gió xoáy cuốn tung đất cát dọc đường bay.
  - Pha 3 (Signature Structure t=0.55–0.62s): Khi chạm trúng tướng địch, mỏ neo bung 4 ngạnh móc thép cắm sâu vào mục tiêu; trên đỉnh đầu nạn nhân bừng sáng phù hiệu Dạ Neo khổng lồ phát quang rực rỡ báo hiệu trạng thái bị khóa cứng.
  - Pha 4 (Impact Đỉnh t=0.62–0.78s): Cuộn tời cơ khí trên tay Nera giật ngược hết tốc lực; sợi xích căng đét kéo giật nạn nhân lê lướt 2.0m về hướng Nera; mặt đất bị cày xới một vệt sâu; mục tiêu bị chấn động làm choáng cứng 1.2s, toàn thân quấn chặt xích năng lượng phát tia lửa điện.
  - Pha 5 (Decay / End t=0.78–1.4s): Sợi xích năng lượng vỡ vụn thành hàng ngàn đốm sáng dạ quang rồi tan biến; mỏ neo tự động thu hồi bằng cơ chế dịch chuyển hư ảnh về nỏ; Nera đứng thẳng dậy xốc lại áo choàng trong tư thế tự tin.
hitbox:         Khối hộp chữ nhật di động dài 12.0m x rộng 1.8m; dừng lại và khóa cứng mục tiêu tướng đầu tiên trúng phải.
animation:      Clip riêng `nera_r_mega_anchor`: Pose quỳ gối gồng ngắm -> Pose giật nảy bắn nỏ cực đại -> Pose ghì chân kéo tời căng người -> Pose đứng dậy thu hồi nỏ.
VFX layers:     Layer tụ sáng nỏ tay -> Layer đường bay xích năng lượng 12m -> Layer ấn chú Dạ Neo khóa ngực -> Layer hiệu ứng giật kéo địa hình và choáng xích.
SFX:            Tiếng cót tời rít căng -> Tiếng đại bác cơ khí phóng "OÀNH - ROẸT" -> Tiếng móc neo cắm sâu "PHẬP - KENG" -> Tiếng tời giật xích kim loại "RÀO RÀO" chói tai.
material:       Mesh xích thép Cổ Linh kết hợp particle ánh sáng Dạ Lam PBR.
camera read:    Đường đạn đạo cực dài 12m cực kỳ rõ ràng trên minimap và màn hình chính; không che khuất góc nhìn combat.
performance:    Giới hạn tối đa 26 particles; bảo đảm 60 FPS khi phóng qua các khu vực rừng nhiều chi tiết.
status:         PASS_MODEL (Thiết kế hoàn tất) / NOT_TESTED (Chờ nghiệm thu trên runtime Spawn).
```
