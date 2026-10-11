# 36 · TODO Thuồng Luồng 3D (boss, Cổ Titan rank I–IV)

Nguồn: concept 31 (`/cdn/value.fe33f0f656b3732726621e17eda2a860487edb69608aec5889d72c24977b8696.png`), spec tạm 35. Số gameplay chưa đụng, vẫn **TẠM** (chờ hội đồng).

## Việc
- [x] Blender `art/thuong-luong/build.py`: rắn đá bazan rêu, mào đá vôi, vảy bụng + mắt phát sáng xanh mạch; thân ~14 m, nhô ~5,5 m; ≤ 15k tam giác, ≤ 1,5 MB; material slots `scale_stone`, `crest`, `glow`.
- [x] Rig: 12 đốt sống + đầu + hàm + đuôi, skin tự động.
- [x] 7 clip, chuyển động toàn thân (không trượt cứng): Rise, Idle (loop), Slither (loop), Attack (quật/cắn), Slam (đập đuôi, chạm đất ~0,9 s), Charge (lao, windup 0,6 s), Die.
- [x] Proof sheet mỗi clip, kiểm: thân cong sóng, đầu không gãy, không xuyên đất.
- [x] Upload, đặt bản xem trước tại lòng sông (−14, −14), chỉ editor thấy, không collider, không ảnh hưởng trận.
- [x] Nhìn trong engine (burst Slither + Idle tại chỗ; các clip khác chỉ kiểm bằng proof Blender).
- [x] Ghi kết quả + phần chưa kiểm vào file này.

## Chưa làm ở bước này
Code The Call / Titan, HUD, bot, SFX trong trận. Cổ Linh Long làm sau.

## Kết quả (2026-10-08)
- GLB: `/cdn/value.9ca72931bd05e905d634cd73b040feb608ef1a635eaa9dffc7304ac32881ec2f.glb` (asset `thuong-luong-v1`), 665 308 byte, **5 310 tam giác**, 1 mesh, 3 material `scale_stone` (vertex color bazan/rêu), `crest` (đá vôi #b9b29c), `glow` (#3fe0b0, emission 4). Không texture.
- Nguồn: `art/thuong-luong/build.py` (chạy lại toàn bộ: `blender -b --factory-startup --python-exit-code 1 --python art/thuong-luong/build.py`, `-- norender` bỏ proof). Thân dựng theo đường cong cột sống (yaw/pitch theo chiều dài), mọi clip là núm điều khiển đường cong theo thời gian → sóng chạy toàn thân.
- Bone (18): root, spine_01..spine_12, tail_tip, neck_1, neck_2, head, jaw. Trọng số nội suy theo chiều dài thân (đầu/hàm cứng), không dùng heat-weights.
- Clip (NLA tracks, 30 fps): Idle 3,0 s loop · Slither 1,2 s loop (đầu giữ yên) · Rise 2,0 s · Attack 1,6 s (cắn trúng 0,9 s) · Slam 1,5 s (đuôi chạm đất 0,9 s) · Charge 1,2 s (windup 0–0,6 s, lao tới 0,85 s, đầu tiến ~3,4 m) · Die 2,5 s (rùng mình 0,6–1,15 s, đổ nghiêng chạm đất 1,9 s).
- Bản xem trước: `thuong-luong-preview` tại (−14, −3,2, −14), visibleTo editors, không physics/behavior, quay về cầu (0,0), `model.forward: "+z"`, mixer.base = Idle loop. Bounds trong engine: 7,9 × 6,18 × 7,9 m (cao 6,2 m, phần lớn khúc sau chìm dưới mặt nước).
- Đã kiểm: proof sheet 7 clip (`/workspace/thuong-luong/<clip>.png`) + hero 4 góc; engine: frame tại lòng sông, burst Slither.
- Chưa kiểm: burst trong engine cho Rise/Attack/Slam/Charge/Die; giao nhau nhỏ của vảy/mào ở đoạn cuộn chặt (Charge windup, Die); chưa có hitbox/collider; mặt hàm/đầu còn khối thô so với concept (thiếu hoa văn chạm, vòng trống đồng, râu dài).

## Lượt 2 (2026-10-08): làm lại, bản 1 bị từ chối
lukasai: “chưa ưng. Nhìn như con trạch rẻ tiền”. Bản 1 (procedural Blender) bị loại.
- [ ] Vẽ lại ref sạch từ concept 31: chỉ con rắn, nền trơn, thân duỗi chữ S, không bồn đá.
- [ ] Image→3D trên CDN từ ref sạch (cách đã dùng cho Siêu Linh Binh).
- [ ] Blender `art/thuong-luong/rigged.py`: giảm ≤ 20k tam giác, texture 1024 webp, rig 12 đốt + cổ + đầu + hàm + đuôi đo theo mesh, skin tự động.
- [ ] 7 clip toàn thân (Rise, Idle, Slither, Attack, Slam, Charge, Die), proof sheet từng clip.
- [ ] Upload, thay model của `thuong-luong-preview` (cùng id, chỉ editor thấy), nâng khỏi mặt nước để thấy cả thân.
- [ ] Xem trong engine cạnh concept; burst đủ 7 clip.

### Cập nhật 09:12: ref sạch cũng bị loại
lukasai: “ảnh vừa rồi cũng ko đạt. Tóm lại thuồng luồng chỉ là tên. Còn tạo hình ra sao do ta sáng tạo. Đừng quá khô cứng”. Prompt không dùng tên/motif Việt.
3 concept tự do: 1 titan pha lê `/cdn/value.9cdcd999ab42c1620744a4dea72052041e3842a37b9ee459f8918e832611eb6a.png` (**chọn**, dáng đặc hợp image→3D, pha lê = Tinh Thạch Ký Ức) · 2 thần bão `/cdn/value.ea7852f0defe3d9749c0456960865f62e60b75f71f3bb0930a80e6670bee86a4.png` · 3 vực sâu `/cdn/value.27ed5371d86b56937e58fc46241026f56ab2b9e891f2221bb01b24b6bd3b306d.png`.
- [~] Image→3D từ concept 1 → `/workspace/thuong-luong2/crystal.glb`.
- [ ] Rig + 7 clip trên mesh này (thân cuộn: clip thiên về ngẩng/quật đầu-cổ, cuộn thân thở).
- 09:12 lukasai: “con số 1 và 2 đẹp”. Đề xuất của Savi: 1 = Thuồng Luồng (rank I–IV), 2 = Cổ Linh Long (rank V+, thay concept rồng Lạc cũ). Image→3D cả hai: `/workspace/thuong-luong2/{crystal,storm}.glb`.
- [x] Image→3D xong cả hai (≈61k mặt, 4×2048 texture, chưa giảm): pha lê `/cdn/value.9cdcd999ab42c1620744a4dea72052041e3842a37b9ee459f8918e832611eb6a.png.glb`, bão `/cdn/value.ea7852f0defe3d9749c0456960865f62e60b75f71f3bb0930a80e6670bee86a4.png.glb`. Ảnh 4 góc: `/workspace/thuong-luong2/{crystal,storm}-views.png` (đèn tối, chỉ kiểm hình khối: dáng giữ đúng concept).
- [x] weave-6a2cb53f: rig + 8 clip (7 clip ban đầu + Roar) + thay model/đặt preview editor-only cho Thuồng Luồng pha lê; engine burst đủ 8 clip, giới hạn contact/jaw xem Lượt 2 dưới.
- [ ] Cổ Linh Long (bão): rig + clip sau khi Thuồng Luồng qua kiểm, dùng lại quy trình rigged.py.
- 09:19 lukasai: “tôi thấy khá ổn. Còn lại là Rig Animation làm cho nó dữ tợn, tấn công cận chiến. skill....” → đã steer crew: Idle rình mồi, thêm clip Roar, Attack cắn vồ há hàm, Slam/Charge nhanh và nặng hơn; bắt buộc có xương hàm.
- [~] Skill boss/runtime: provisional bite, slam, charge/pounce, roar và boss-bar code được nối; dummy test xác nhận một số damage/slow/charge behavior (row 15492). Chưa nghiệm thu trên trận thật, camera trận hoặc audio; số vẫn TẠM theo `objectives.yml`, balance council chưa duyệt. Xem kết quả test ở dưới.

### Lượt 2 · kết quả rig + clip (weave-6a2cb53f)
- [x] GLB: `/cdn/value.ed35c297fa2163c5a8d0c852e87c88f3f8eb9168a70d64bc7975bf95133dc87b.glb` (2.38 MB, 19 000 tam giác, 4 texture WEBP 1024, giữ normal map). Nguồn tái tạo: `art/thuong-luong/rigged.py` (build.py giữ làm lịch sử bản 1).
- Cao 5.5 m, chân z=0, căn giữa. 16 xương: root, coil, spine_1–6, head, jaw, tail_L_1–3, tail_R_1–3. Miệng không tách sạch → hàm khắc theo vị trí (200 đỉnh cằm/mõm dưới, falloff mềm, mở ~30°). Pha lê 1 044 đỉnh khoá cứng 100% vào spine gần nhất. 0 đỉnh không có trọng số; cuộn và hai vòng đuôi không nhấc khi cổ chuyển động.
- 8 clip (30 fps, NLA): Idle 3.0 s loop (rình mồi: đầu thấp chồm tới, hàm mở/khép gầm gừ) · Slither 1.2 s loop · Rise 2.0 s (vùi đầu → ngẩng, há hàm ở 1.1 s) · Roar 2.0 s (há rộng nhất 0.8 s, lắc đầu, pha lê giật) · Attack 1.6 s (cuộn lùi 0–0.5, vồ há hàm, sập hàm ở 0.9 s, quật đầu) · Slam 1.5 s (vượt cao, quật xuống, chạm 0.9 s, nảy nhẹ, đuôi đập cùng nhịp) · Charge 1.2 s (cúi thấp 0–0.6, lao 0.6–0.85 há hàm) · Die 2.5 s (rung 0.6–1.15, đổ nghiêng, đầu chạm ~1.9 s).
- [x] Đặt: `thuong-luong-preview` (x0z0, chỉ editor thấy, không physics/behavior), chân trên mặt nước y=−2 (lòng sông −3.2, mực nước −2) để cả cuộn nổi trên nước; xoay nhìn về cầu (0,0). Bounds engine: size.y 5.5 m, min.y −2.0.
- [x] Engine (burst từng clip, getLogs không báo thiếu clip): Idle đầu nhấp nhô rình, Slither cổ đung đưa chữ S, Rise gục rồi ngẩng, Roar ngửa đầu, Attack chúi đầu tới trước rồi thu, Slam ngửa ra sau rồi quật xuống, Charge cúi thấp rồi lao, Die đổ nghiêng hẳn sang một bên.
- [ ] Chưa đạt/chưa kiểm: đầu chưa chạm hẳn đất ở mốc tiếp xúc (đo Blender: Attack đầu còn 1.92 m ở 0.9 s, Slam 1.43 m ở 0.87 s, Die 1.34 m ở 2.1 s) → cổ cần duỗi/gập sâu hơn hoặc root hạ thấp; vài mảnh pha lê lưng bị kéo dài nhẹ ở tư thế ngửa mạnh (thấy trong proof); hàm mở nhỏ, nhìn từ camera MOBA gần như không thấy; chưa xem với camera trận 56°/24 m; chưa nối vào gameplay (objectives.yml / runtime boss).
- [x] 2026-10-08 · lượt dữ tợn: GLB mới `/cdn/value.e0085bef50cad8a8cd36333bf6e5cd3251b08e317888e863158cf1afca7249c7.glb` (thay model `thuong-luong-preview`; tên/độ dài/mốc clip giữ nguyên). Đo trong `rigged.py` (bước MEASURE, z mét trên mặt đất): Attack chóp hàm 0.12 m @0.90 s (0.22 @0.93, giữ 2 frame) · Slam 0.10 m @0.87 s, 0.13 m @0.90 s · Die 0.17 m @2.00 s và nằm yên tới 2.5 s (0.38 m @1.90 s), mesh không xuyên đất (min z 0.00). Hàm: xương 68°, môi mở 58.6° ở Rise 1.1 s, Roar 0.8 s, Attack 0.70/0.85 s; Charge 58.4°/56.6° @0.70/0.85 s; Attack sập hàm đúng 0.9 s. Pha lê lưng 2 094 đỉnh cứng 100%, giãn cạnh ≤ 0.45% ở tư thế ngửa (Roar, Slam windup, Rise). Proof: `/workspace/thuong-luong2/{Rise,Roar,Attack,Slam,Charge,Die}.png` (có ô camera MOBA 24 m/56°).
- [ ] Còn yếu: ở Die mốc 1.90 s chóp hàm còn 0.38 m (chạm hẳn ở 2.0 s); lưỡi/miệng trong là vùng hồng phẳng; chưa xem burst trong engine với camera trận.
