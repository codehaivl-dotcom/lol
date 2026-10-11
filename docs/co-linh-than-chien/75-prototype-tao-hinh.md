# 75 — Prototype tạo hình: 8 hướng ưu tiên

**Trạng thái: VISUAL PROTOTYPE — creator thấy ổn (2026-10-10 22:59: "Tôi thấy ổn., tạo hình đa dạng , rất tốt"). Chưa duyệt sản xuất: mỗi tướng cần creator chọn riêng.** Nguồn: doc 74 (CONCEPT_LIBRARY), audit creator 2026-10-10 22:50. Không model 3D, không đổi tướng nào trong engine. Roster ID, kit, stat, hitbox, Hạo Nhật: không đổi.

## Bằng chứng & giới hạn
- Concept: mỗi hướng 1 sheet (trước / ngang / 3/4 + dáng chiêu), ảnh AI vẽ theo mô tả doc 74. Ảnh là hướng tạo hình, không phải concept chính thức.
- Silhouette đen: cắt nền từng sheet → ngưỡng alpha. Bảng: ![silhouette](/cdn/value.57e38d3209a4ef3cfd0171f1b59e6ce6c7987d6db931ec5ae984401a57c2508d.png)
- Thử 64 px: lấy khung 3/4, scale theo chiều cao mục tiêu (~24 px/m, ~ camera khóa), nền cỏ; 4 hàng: màu · xám · silhouette · đứng sát nhau (xám). ![thu 64px](/cdn/value.c8bae78f8116b614b25f91a7713f1db7ed5e8e62aeb3515af20792c0223e9b51.png)
- **Giới hạn:** đây là mô phỏng 2D từ góc ngang. Camera thật nhìn chéo từ trên → silhouette đỉnh đầu/vai khác. VFX bật/tắt và lineup trong engine: NOT_TESTED (cần model 3D, ngoài phạm vi lượt này).

## Kết quả 64 px (theo ảnh, xếp từ dễ đọc nhất)
1. **062 Trống Đồng** — khối tròn vàng, khác mọi thân.
2. **023 Cá Sấu** — ngang thấp, khác mọi thân.
3. **022 Sói** — bốn chân, ngang; bờm trắng chìm ở xám.
4. **011 Lăng Kính** — dáng gai cao mảnh; thân trong suốt nhạt ở xám.
5. **002 Người Sấm** — vai rộng đáy phễu; tím trùng hệ màu Mị Đăng.
6. **021 Hổ** — to, nặng; đứng hai chân gần "đấu sĩ người to".
7. **053 Giấy Dó** — người mảnh + nón; hoa văn mất.
8. **051 Cao Su** — **đọc như người thường.** Cần vẽ lại.

## Ma trận hình thái (8 prototype)

| ID | Chủng | Chất liệu | Vóc (H) | Posture | Di chuyển | Vũ khí | Khoảng âm | Màu chủ | VFX | Nhãn |
|---|---|---|---|---|---|---|---|---|---|---|
| 021 | thú nhân | lông/đồng | 2,1 m | chồm | 2 chân, vồ 4 chân | vuốt + đao | giữa chân, đuôi | đỏ-đen-nâu | huyet | REDESIGN?/NEW |
| 023 | thú | vảy/gỗ thuyền | 1,3 m bò, 2,0 m đứng | ngang thấp | bò 4 chân | mái chèo | dưới bụng | xanh rêu-đồng | thuy | NEW (đề xuất) |
| 011 | khoáng | pha lê | 1,85 m | thẳng cứng | bước cứng | tay lăng kính | giữa cột lưng | trắng cầu vồng | quang | NEW |
| 062 | tạo tác | đồng | 1,6 m | tròn | 4 chân / lăn | dùi | giữa 4 chân | vàng đồng | quang | NEW |
| 002 | nguyên tố | mây/sét | 2,1 m | chúi | trôi, không chân | nắm đấm | giữa tay–thân | xám-tím (đổi lam) | loi | REDESIGN → tinh_loi |
| 022 | thú | lông/sương | 1,4 m vai | ngang | 4 chân | vòng cổ | giữa 4 chân | xám-trắng-lam | nguyet | NEW |
| 051 | vật liệu | cao su | 1,8 m | đứng | nảy | tay giãn | khi giãn | kem-lá | moc | NEW (vẽ lại) |
| 053 | vật liệu | giấy dó | 1,8 m | trôi | bay | giấy, giáo | hoa văn cắt | kem-đỏ son | phong | NEW |

## 021 · Hổ Vằn Mực
**Nhãn đề xuất:** VISUAL_REDESIGN_CANDIDATE → van_an (hoặc NEW_HERO_CONCEPT)

![sheet 021](/cdn/value.d7927707608e1a13946bbabc11f58cfc4e8826f2302bb29f6a7abb36a11b0851.png)

- **Tạo hình:** hổ nhân 2,1 m, chồm, vằn mực đỏ, vuốt bọc đồng, đao sau lưng; vồ bốn chân
- **Idle:** đứng chồm, vai nhún theo nhịp thở, đuôi quất chậm · **Chuyển động đặc trưng:** vồ: hạ người, phóng bốn chân, chạm đất cào hai vuốt
- **Blender/rig:** Trung bình–cao: rig người + đuôi (4–6 xương) + bàn chân thú; vồ bốn chân là clip mới hoàn toàn. Vũ khí kiếm của Vân Ấn phải đổi thành vuốt → gốc chiêu đổi từ lưỡi kiếm sang tay.
- **Ảnh nhỏ camera:** 64 px: đọc được thân to, vai rộng; nhưng đứng hai chân thì gần dạng "đấu sĩ người to" — chỉ khác hẳn khi vồ. Màu đỏ-đen nổi trên cỏ.
- **Uniqueness (gần nhất):** Rengar, Udyr (thú nhân hổ). Khóa: vằn mực bút lông sáng khi vồ, không mặt nạ, không xương.
- **Kết luận:** Hợp Vân Ấn nếu kit giữ "nhảy bổ" → vồ; nhưng mất kiếm = đổi identity. Đề xuất: dành NEW_HERO_CONCEPT đấu sĩ thú, giữ Vân Ấn kiếm sĩ.
- Cutout nền trong: `/cdn/value.8ffbec43d528499680e5a3cc39efd1f0e870d04ee0552efb4197bac3e32831f8.png`

## 023 · Cá Sấu Gác Bến
**Nhãn đề xuất:** VISUAL_REDESIGN_CANDIDATE → moc_lam (thận trọng)

![sheet 023](/cdn/value.b422a96f6f81c2abd53f9bdb77a284a82fa37b6c640bee018b36762d7a049da7.png)

- **Tạo hình:** cá sấu bò thấp dài 3 m, lưng mạn thuyền, mõm mũi thuyền, mái chèo đồng; đứng hai chân khi đánh
- **Idle:** nằm thấp, đuôi lắc, mạn thuyền nhấp nhô · **Chuyển động đặc trưng:** đứng dậy vung mái chèo như khiên-tường, nước bắn
- **Blender/rig:** Cao: hai tư thế (bò 4 chân ↔ đứng 2 chân) = rig riêng + đuôi 8–10 xương; mọi clip làm lại; chuyển tư thế mỗi đòn là chi phí lớn nhất trong 8.
- **Ảnh nhỏ camera:** 64 px: silhouette ngang thấp khác hẳn mọi tướng hiện có — tốt nhất bộ cùng 062. Rủi ro: dài 3 m vượt capsule hiện tại của Mộc Lẫm, bị lính/tướng che.
- **Uniqueness (gần nhất):** Renekton (cá sấu đứng). Khóa: bò ngang, mạn thuyền, mái chèo; không đứng cơ bắp.
- **Kết luận:** Hình rất mạnh nhưng capsule + khiên của Mộc Lẫm không khớp thân dài. Đề xuất: NEW_HERO_CONCEPT tank; Mộc Lẫm giữ canon.
- Cutout nền trong: `/cdn/value.fb5a80ca47b6e9d2c111c0187f1f85fa92bd2d9522ad54abedd6700c3ae62de5.png`

## 011 · Người Lăng Kính
**Nhãn đề xuất:** NEW_HERO_CONCEPT (xạ thủ)

![sheet 011](/cdn/value.be13a3effe50986a2f136b1efe6e31fdddde6ae0414d64b8d0d650dba510f90e.png)

- **Tạo hình:** người pha lê lục giác 1,85 m, cột tinh thể sau lưng, tay phải là lăng kính bắn tia
- **Idle:** đứng thẳng cứng, cột lưng lóe cầu vồng từng nhịp · **Chuyển động đặc trưng:** nâng tay lăng kính, tia khúc xạ bẻ góc
- **Blender/rig:** Thấp: rig người chuẩn, khớp cứng (ít biến dạng). Tay-lăng-kính là socket vũ khí. Rẻ nhất trong 8.
- **Ảnh nhỏ camera:** 64 px: thân mảnh + cột trên đầu = dáng "gai" cao, đọc được. Thân trong suốt ở xám bị nhạt — cần viền phe đậm.
- **Uniqueness (gần nhất):** Taric, Skarner (pha lê). Khóa: khúc xạ cầu vồng, không giáp kim cương.
- **Kết luận:** Hợp lore công nghệ ký ức ánh sáng. Dành tướng mới, không ép vào Kính Ngôn.
- Cutout nền trong: `/cdn/value.00a7850d68ccdce6cdc85d393804ae273e37c5b5e967fa746b3a08d351f83d0e.png`

## 062 · Trống Đồng Sống
**Nhãn đề xuất:** NEW_HERO_CONCEPT (hỗ trợ)

![sheet 062](/cdn/value.64dd212b73e8f82db6494476583638300e3bdafe6e779c6beaf66e120490c7b1.png)

- **Tạo hình:** trống đồng 1,6 m đi bốn chân đồng, mặt sao 14 cánh hướng camera, hai tay cầm dùi
- **Idle:** nhún bốn chân, mặt trống ngân sáng theo nhịp · **Chuyển động đặc trưng:** lăn nghiêng như bánh xe, tự gõ mặt trống bắn sóng chấn
- **Blender/rig:** Trung bình: thân cứng + 4 chân cơ khí + 2 tay; lăn = xoay cả root (clip riêng). Không có biến dạng da.
- **Ảnh nhỏ camera:** 64 px: khối tròn đặc nổi nhất bộ, mặt vàng đọc từ xa. Đông Sơn đậm → giữ là tướng Đông Sơn chính duy nhất.
- **Uniqueness (gần nhất):** Không có tướng LoL/Liên Quân trống đồng; gần nhất Blitzcrank (khối máy tròn). Khóa: mặt trống sao + lăn.
- **Kết luận:** Rất COLINH (cổ máy văn minh cổ). Tướng mới.
- Cutout nền trong: `/cdn/value.76ae38d1da71da592fb751df24f5d40f06ceed31b1ce8b96ba7a73adb648916b.png`

## 002 · Người Sấm
**Nhãn đề xuất:** VISUAL_REDESIGN_CANDIDATE → tinh_loi

![sheet 002](/cdn/value.70c0847ba3902736a7be6293ed47c6eb4cac06789d524030bc5c9a3b7af2cb7a.png)

- **Tạo hình:** mây giông 2,1 m, thân dưới phễu xoáy không chân, tia chớp dọc thân, hai nắm đấm sấm
- **Idle:** trôi, phễu mây xoáy, chớp chạy dọc thân · **Chuyển động đặc trưng:** lướt giật zíc-zắc như tia sét
- **Blender/rig:** Trung bình: thân trên rig người, thân dưới là FX/shader xoáy (không chân → không lo trượt chân). Bốn tay hiện tại của Tĩnh Lôi bỏ → kit dựa "nhiều tay" phải đối chiếu.
- **Ảnh nhỏ camera:** 64 px: vai rộng, đáy thon — dáng phễu đọc được; màu tím dễ trùng Mị Đăng (#b77bff) → đổi sang trắng-xanh lam.
- **Uniqueness (gần nhất):** Volibear, Kennen, Storm Spirit. Khóa: phễu mây không chân, không thú/ninja.
- **Kết luận:** Hợp Tĩnh Lôi nếu kit không cần 4 tay. Cần đọc kit Tĩnh Lôi trước khi duyệt.
- Cutout nền trong: `/cdn/value.3166068d64d63c52ab0c98a88a665e488e7426c076382caf3af95c91ce6a16ab.png`

## 022 · Sói Sương Tru
**Nhãn đề xuất:** NEW_HERO_CONCEPT (xạ thủ)

![sheet 022](/cdn/value.922377049334af9f4d6414f9c54f434e7cdbb82a614fc100b79cc85bcf598376.png)

- **Tạo hình:** sói xám bốn chân thật, vai 1,4 m, bờm sương trắng bay ngược, vòng cổ đồng phát sóng
- **Idle:** đứng bốn chân, bờm sương bay, tai giật · **Chuyển động đặc trưng:** ngửa cổ tru, sóng âm bắn ra từ vòng cổ
- **Blender/rig:** Cao: rig bốn chân riêng (khác toàn bộ roster), chạy vòng mục tiêu; bờm sương là FX. Bắn từ vòng cổ = gốc chiêu ở cổ, không ở tay.
- **Ảnh nhỏ camera:** 64 px: ngang, thấp; bờm trắng ở xám chìm vào nền → cần viền phe. Đọc là "con thú", khác người.
- **Uniqueness (gần nhất):** Warwick, Nasus, Kindred (sói). Khóa: bốn chân thật, vòng cổ âm thanh, bầy chỉ là bóng.
- **Kết luận:** Tướng mới; không có tướng hiện có cùng vai mà hợp thân bốn chân.
- Cutout nền trong: `/cdn/value.cf040167de1aeea9f0795b8b9beb0dfe445363b05a5df71cf2e06aeaac1ecd84.png`

## 051 · Người Cao Su
**Nhãn đề xuất:** NEW_HERO_CONCEPT (đấu sĩ) — CẦN LÀM LẠI HÌNH

![sheet 051](/cdn/value.1eb90c5cbf18fc76545c4aa4cbad5b397a15c7719f007cbda88599ddd1c7e89d.png)

- **Tạo hình:** người mủ cao su 1,8 m màu kem, vết cạo xoắn, chén hứng mủ ở hông, tay giãn
- **Idle:** nảy nhẹ, thân rung như thạch · **Chuyển động đặc trưng:** tay giãn 3 m chộp xa
- **Blender/rig:** Trung bình–cao: giãn tay cần chuỗi xương dài + stretch (scale bone) hoặc shape key; rig người chuẩn còn lại.
- **Ảnh nhỏ camera:** **FAIL 64 px:** đứng yên đọc y hệt người thường cởi trần (silhouette người). Chỉ khác khi giãn tay.
- **Uniqueness (gần nhất):** Luffy, Zac. Khóa đang có (vết cạo, chén) quá nhỏ để đọc ở camera.
- **Kết luận:** Giữ ý tưởng, vẽ lại: thân phồng, khối mủ chảy, dáng bất đối xứng để silhouette khác người. Chưa hợp tướng cũ (Cốt Bện có thể sau).
- Cutout nền trong: `/cdn/value.9e7f2e641e08eeb47451ef518915cfa7f8f9465343a3f115a0a285076a01b9b7.png`

## 053 · Người Giấy Dó
**Nhãn đề xuất:** NEW_HERO_CONCEPT (pháp sư)

![sheet 053](/cdn/value.821feabc96439003e6cfa900848a63fdd41c92f5702eb699368301b71ea74de5.png)

- **Tạo hình:** người giấy dó cắt 1,8 m dày 2 cm, hoa văn cắt đỏ, nón giấy, tờ giấy bay quanh; nghiêng cạnh gần biến mất
- **Idle:** trôi phấp phới, giấy lật · **Chuyển động đặc trưng:** gấp mình thành hạc và giáo giấy
- **Blender/rig:** Trung bình: rig người + vạt giấy (cloth/bone); gấp thành hạc = model thay thế (swap) chứ không biến dạng.
- **Ảnh nhỏ camera:** 64 px: dáng người mảnh + nón, hoa văn mất ở 64 px; xám đọc nhạt. Từ camera trên cao thân phẳng không biến mất (cạnh chỉ thấy từ ngang).
- **Uniqueness (gần nhất):** Origami Nhật; không có tướng giấy nổi bật LoL/Liên Quân. Khóa: giấy dó + cắt hoa văn Việt.
- **Kết luận:** Ý tưởng đẹp, nhưng silhouette cần vạt giấy lớn hơn để không đọc như người. Tướng mới.
- Cutout nền trong: `/cdn/value.b3fe5bf9a74717703e76769459afdb6c7c249a4a1c1a6f98cf0564af4563f7d0.png`

## Đề xuất chờ creator duyệt
- Tướng mới (NEW_HERO_CONCEPT) mạnh nhất: 062, 023, 011, 022.
- Đổi hình tướng cũ chỉ cân nhắc 002 → Tĩnh Lôi (sau khi đối chiếu kit bốn tay). 021 → Vân Ấn: không khuyến nghị (mất kiếm = mất identity).
- 051 và 053: giữ ý tưởng, vẽ lại silhouette trước.
- Không bước nào ở đây chặn H1–H5.

## Bách Diện (`bach_dien`): chọn tạo hình (2026-10-10)
- Lần 1 (vòng mặt nạ / bọ ngựa / rối nước): creator không chọn, “nhìn đáng sợ”. `/cdn/value.33e18506699dad71a3c8b20855c8f2a77c4b77a7ae8a387fb22a17a72c9e9300.png`
- Lần 2 (cáo nhiều đuôi / tắc kè / vũ công gương): creator chọn **art 3: Vũ Công Gương Đồng** (“art3 đẹp”). `/cdn/value.cccd0cd99dff6403cfa9bcc72f654bd33dd5b2c0b4d4ef474e497f9035132ed2.png`
- Trạng thái: VISUAL_REDESIGN_CANDIDATE đã creator chọn hướng; ID giữ; **kit đã viết lại kiểu vũ công** theo lệnh creator 10-10 23:30 ("Kit thì làm kiểu dancer"), xem tools/sim/candidates/bach_dien.yml. Kit Người Đổi Bóng cũ (Mảnh Mặt · Mặt Cười · Lẩn Bước · Dây Trói · Đổi Bóng) bỏ. Chưa sản xuất Blender.

![turnaround](/cdn/value.ff5e8ab849793a377ab4fdffb5efc7e7f4018827dbd2b47e4749feb3db425c35.png)
![silhouette + xám + 64px](/cdn/value.3279845f9895c2b4431687bd639ec5216b74d2d96f9fc0ef51ca2564b5861c0c.png)

- **Tạo hình:** thân sống ghép từ tấm gương đồng đánh bóng, dáng vũ công mảnh; mặt là gương bầu dục phản chiếu biểu cảm thay đổi (= “trăm mặt”); búi tóc đồng có vòng; lụa xanh ngọc/kem bay từ cổ tay và eo; vòng đồng treo; tay cầm gương tròn. Hoa văn trống đồng chỉ là điểm nhấn.
- **Ánh xạ kit (chỉ trình bày, không đổi luật):** Mảnh Mặt = mảnh gương bay vòng; Mặt Cười = mặt gương đổi sang nụ cười khi chớp nổ; Lẩn Bước = thân phản chiếu tan vào nền; Dây Trói = dải lụa quấn; Đổi Bóng = gương tay soi lại chiêu vừa dùng.
- **Idle:** đứng mũi chân, lụa trôi, gương tay xoay nhẹ · **Chuyển động đặc trưng:** xoay múa, vung lụa, ném mảnh gương.
- **Blender/rig:** Trung bình: rig người chuẩn + 4–6 chuỗi xương lụa + vòng treo (secondary). Không cần rig mới.
- **Silhouette (đo trên ảnh 2D):** búi + vòng + gương tay tạo đỉnh rõ; lụa tạo khối váy lớn, che chân ở mặt trước. 64 px: đọc được gương tay + búi + khối lụa sáng; thân mảnh dễ chìm.
- **Rủi ro:** (1) khối lụa có thể đọc như váy người thường → cần giữ mặt gương sáng phản quang ở camera trên cao; (2) phân biệt với Mị Đăng (tím/khói, đèn) bằng bảng màu đồng/xanh ngọc và gương; (3) đây là ảnh 2D, chưa thử camera engine.
- **Uniqueness (gần nhất):** Karma/Irelia (lụa lơ lửng), Lux Elementalist hệ gương; khóa riêng: thân gương đồng Cổ Linh + mặt phản chiếu.
- **Tiếp:** creator duyệt bộ prototype này → Blender (model + rig lụa) theo doc 28/30.

### Bách Diện · Blender/engine v1 (2026-10-10, creator "ok lam")
- Body sheet A-pose: /cdn/value.53dc1ac7….png → image→3D, rig 27 xương (không có xương ngón: như Hương Mai, gương ngồi ở gốc xương tay, chưa bake grip). Model: /cdn/value.53dc1ac7….png.glb, h 1,8 m, nhìn −Z. scripts/lib/heroes.js BODY.bach_dien (chưa bật: không có kit trong heroes.yml, không vào slice/lobby).
- Vũ khí: `handmirror` (scripts/gen/weapons.js) gương đồng mặt sáng ngọc lam, sao trống đồng sau lưng; weapons.yml bach_dien tay phải + đèn ngọc lam nhỏ.
- Động tác (art/anim/moves.py, bake build_hero.py): lmb vẩy gương (HIT 0,28) · Q xoay múa trọn vòng rồi ném ngang (0,30) · RMB nhảy jeté lao tới, đáp chẻ chân dang tay (0,32) · chết xoay nửa vòng, quỳ, nằm nghiêng. Clip v1: lmb 68e6234d, q 1438b4f0, rmb b9aa2846, death aaf0e736. Proof /workspace/anim/bach_dien_skills_sheet.png + death_sheet. Engine: clip Q phát đúng trên rig thật, gương theo tay (look burst sảnh, object thử đã xoá).
- BLOCKED: E và R chờ KIT_REWORK (doc 57 H1c) nên chưa có động tác/HIT. skill-clips.yml chưa ghi (audit.py --write chỉ ghi tướng có kit). VFX/SFX/icon/chân dung: chưa làm. Trận: NOT_TESTED.
