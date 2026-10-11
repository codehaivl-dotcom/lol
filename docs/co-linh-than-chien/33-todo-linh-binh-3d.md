# TODO: Linh Binh 3D thật (2026-10-07)
Ask (lukasai): "ok con này chưa render. Vẫn là hình khối?" → "mấy con này render đẹp luôn" → "tạo 3d xong rig. Tạo skill, sfx. Đầy đủ luôn nhé"

Nguồn: ảnh concept đã duyệt (doc 31), tách nền từng con:
- super  /cdn/value.c2488df04c98ce4951e68d37aa057ab843ab2173ee9c09383265e793cab18c03.png
- melee  /cdn/value.193c1bdd432f6ce8c5207f995977049266082bd2d96e02f01e0be38ea2e745b2.png
- caster /cdn/value.3319ddf7c6d0de8ae90ff9eeb4938cde59c64782aae63a8491d80281033384b1.png
- siege  /cdn/value.4d3b29ff94a22c8ec882d45774c7b27eed2b9da11112088b0db10870df0ef2f8.png

- [x] 1. Model 3D từ ảnh (CDN image→mesh), 4 file .glb
- [x] 2. Đọc từng model: rig? clip? kích thước, hướng
- [x] 3. Blender: rig + clip riêng từng con (melee/super: art/linh-binh/clips.py trên rig thật; caster/siege: build.py node clip)
      - super: idle thở nặng, walk dậm chân, attack = giơ 2 tay đập đất, die = sụp
      - melee: idle, walk, attack = chém kiếm sau khiên, die
      - caster (đèn lồng bay): hover lắc, attack = giật lùi + pha lê loé, die = rơi
      - siege (xe trống đồng): lăn (bánh xoay), attack = giật lùi khi bắn, die = đổ nghiêng
- [x] 4. lane.js: model thay primitive, đổi clip theo trạng thái (đi / đánh / chết), giữ collider cũ
- [x] 5. SFX riêng: bước chân, đòn đánh, chết cho từng con
- [x] 6. Team màu: viền/vòng dưới chân + thanh máu (ảnh chỉ có pha lê xanh)
- [x] 7. Kiểm: nhìn từng con trong lane, chạy 1 đợt, đo nặng (arrival bar 450 KB: model chỉ tải khi lính ra)

## Audit 2026-10-07
- melee + super: image→3D arrived RIGGED (54-bone humanoid): Idle/Walk built in, attack = library clips sword-slash / two-handed-ground-slam, die = clip-die.
- caster + siege: static meshes → art/linh-binh/build.py decimates (322k→14k / 18k tris, 1.0 / 1.4 MB) and keys Idle/Walk/Attack/Die on the body node (hover, recoil, topple). Not bone rigs: they have no limbs.
- lane.js: BODY table, setBase/playAct (idle↔walk↔attack), die clip 1.6 s then dust + remove; team ring child (ring radius ÷ scale).
- SFX per kind: attack + death; super heavy footstep every 0.65 s.
- Checked: standalone renders of all 4 on the lane; one forced dev wave (12 spawned, walked, met at centre, Attack/Idle switching read back on rows, bolts flew).
- NOT checked: the super in a real wave (needs a fallen tower), death clip on screen, whether cooked attack clips read big enough, siege/caster facing in motion, sound on a player's ears.
- [ ] 3/5/7 remain partly open per above.

## Pass 2 (2026-10-08)
- Nặng: model gốc 7.1 / 8.2 MB → art/linh-binh/rigged.py decimate (9k / 12k tris, giữ rig + Idle/Walk) + texture 512 webp → melee 1.3 MB, super 1.6 MB, caster 0.94 MB, siege 1.2 MB.
- Clip riêng trên rig thật (art/linh-binh/clips.py, bộ IK art/anim/rig.py), proof /workspace/anim/linh-*.png:
  - melee attack `cdn/clip-linh-melee-attack-v1-64cf3b38.glb` (0.7 s, chém chéo, chạm 0.34 s), die `cdn/clip-linh-melee-die-v1-5fc038c5.glb` (1.3 s, khuỵu gục)
  - super attack `cdn/clip-linh-super-attack-v1-cbc97f3d.glb` (1.27 s, giơ 2 tay đập đất), die `cdn/clip-linh-super-die-v1-0d77c064.glb` (1.5 s, sụp quỳ đổ)
- lane.js: sát thương + bụi + shockwave của Siêu Linh Binh rơi lúc tay chạm đất (superSlam, 0.64 s), không còn ra trước động tác.
- SFX: 9 file đều tải được (spawn fetch, 16–54 KB mỗi file).
- KIỂM (dev room, đã trả phòng về waiting/round 8, trụ đứng lại, 0 lính):
  - đổ tower-red-t1 thật (hp 0 → fall) → đợt sau ra 1 Siêu Linh Binh xanh, feed "Siêu Linh Binh Minh Ước xuất trận" ✔
  - siêu lính đi tới trụ T2 đỏ, đánh (clip đập đất thấy trong burst, bụi slam), trụ bắn nó 150 ✔
  - clip die super, attack melee, attack super: burst trong engine trên model nhẹ ✔
- CHƯA: nghe âm thanh trên máy người chơi thật; cú gục trong trận (đã thấy clip chạy độc lập, chưa bắt kịp khung trong trận).
