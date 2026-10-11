# 46 · Tổng hợp kiến trúc + Audit kiểu studio + Đánh giá

> **Thứ tự bước và hợp đồng chuyển place nay ở doc 48 (v2, theo audit Codex 2026-10-08).** Chỗ nào khác doc 48 thì doc 48 thắng. Mốc 41.5 MB / 21.6 MB không phải baseline.



> **Đã có review độc lập: doc 47.** Chỗ nào 47 nói SAI (mốc 41.5 MB → 21.6 MB; "6 chỗ đọc state" → ~20+; skillfx bị import tĩnh ở hero.js + camera.js + bot.js; M1 không rẻ; thiếu reconnect/enterPlace) thì 47 thắng tới khi sửa xong.

Trạng thái: **TÀI LIỆU ĐỂ DUYỆT. Chưa triển khai.** Lệnh của lukasai (2026-10-08 23:15): "xong plan thì audit như studio game. Rồi mới triển khai. Tóm lại toàn bộ ý tưởng về kiến trúc ta trao đổi nãy giờ → viết → Audit → đánh giá độc lập."
Nguồn: doc 40, 42, 43, 44, 45 và cuộc trao đổi ngày 2026-10-08.

> **Giới hạn của "độc lập":** bản đánh giá này do Savi viết, cũng là người viết kế hoạch, nên **không độc lập thật**. Mình tách riêng phần tự phê bình (§4) và đánh dấu mỗi nhận định là ĐO / ĐỌC CODE / SUY LUẬN. Duyệt độc lập thật = Codex hoặc một người review khác đọc doc này (luật: Codex lo hội đồng/báo cáo).

---

## 1. Tóm tắt các ý kiến trúc đã trao đổi

| # | Ý tưởng | Lời creator | Trạng thái |
|---|---|---|---|
| K1 | Tách layer/module, mỗi màn một module, không viết chung một chỗ (thành luật) | "tách màn hình thành các layer" · "làm luật luôn… theo module" | Luật đã ghi. HUD trận + màn sảnh đã tách (đã làm) |
| K2 | HUD mỗi màn khác nhau; desktop/mobile tách | "tách HUD ra. HUD của mỗi màn hình khác nhau" | Đã làm: `screens/match/{common,desktop,mobile}.js`, `screens/lobby/*`. Chưa thử trong trận thật |
| K3 | Tránh tải cả game: lobby–hero–matching riêng | "tránh load full cả game. Lobby-hero-matching" | Đang: place `sanh` dựng thử, luồng chưa đổi |
| K4 | Map, lobby, match, hero, map 1/3/5 đều tách | "lobby/match/hero/game map 1 3 5 tách riêng hết" | Kế hoạch doc 45 §2 |
| K5 | Chưa làm lại map, ưu tiên lõi kiến trúc | "map sau này sẽ build lại… tách core trước" | Giữ nguyên: chỉ di chuyển, không vẽ lại |
| K6 | Vào trận chỉ tạo "temp" của tướng trong trận, không gọi tất cả tướng/chiêu | "chỉ tạo ra temp của nó thôi" | Kế hoạch doc 45 §1.2 (cột `hero:`/`skill:` + tải trước lúc versus) |
| K7 | Dùng sổ asset để phân phối theo ý muốn | "phân phối content theo ý muốn là quá dễ" | Kế hoạch doc 45 §1.1 (cột `scope/bytes/when`) |
| K8 | CSS UI: cấm inline, cấm gán size bừa, chuẩn desktop/mobile đo được | "cấm viết inline và gán bừa size" | Chưa làm. Đếm: **416 `style="`** trong code UI |
| K9 | Đo trước rồi mới sửa | "đo trước đi" | Theo luật; đọc boot chỉ là số engine đã ghi |

## 2. Kiến trúc đích (một hình)

```
Mở game ──► place SANH  (sảnh: điện + đài, HUD sảnh)        sim.js gốc = trọng tài PHÒNG
              │  chọn tướng (module import khi vào phase)      world.state: lobby/match/results
              ▼  versus: tải trước tướng+chiêu của roster
           place <MAP>  (mach_giua | 3v3 | 5v5…)             places/<map>/sim.js = trọng tài TRẬN
              │  HUD trận desktop|mobile                        place.state: phase/round/wave/feed/bots
              ▼  kết quả
           về SANH
Sổ asset: scope = boot | lobby | map:<id> | hero:<id> | skill:<hero>.<slot> | ref
```

## 3. Audit kiểu studio (soi theo 6 trục)

Mức: 🔴 chặn · 🟠 nặng · 🟡 nên sửa · 🟢 ổn

### 3.1 Tải (loading)
| Phát hiện | Bằng chứng | Mức |
|---|---|---|
| Vào sảnh = tải cả map: **41.5 MB** trước hình đầu, 5 khối hình 18.6 MB | ĐO: boot `main`, desktop người chơi, 23:05 | 🔴 |
| Bản thử `sanh` (chỉ đài+điện): hình đầu sau **776 KB** | ĐO, nhưng **máy phụ của Savi** (không chạy script người chơi, không có model tướng) → **không so được** với 41.5 MB. Cần đo trên máy người chơi | 🟡 bằng chứng yếu |
| Gói code lúc vào `main` 578 KB > ngân sách 500 KB. Nặng nhất: ô `x0z0` 118 KB, `hero.js` 56 KB, `skillfx.js` 51 KB | ĐO (engine) | 🟠 |
| `skillfx.js` (VFX mọi tướng) bị kéo vào boot qua `camera.js` | ĐỌC CODE (chuỗi import engine báo) | 🟠 — sảnh không cần VFX chiêu |
| Model tướng chỉ tải khi có thân mang nó | ĐỌC CODE; chưa đo trong trận | 🟢 (chưa xác nhận) |
| 5 khối `.bgeo` lớn chưa biết là asset nào | chưa map hash → tên | 🟡 — cần làm trước khi nói "nén model" |

### 3.2 Phân tách trách nhiệm
| Phát hiện | Bằng chứng | Mức |
|---|---|---|
| Một place gánh 3 vai (sảnh, trận, phòng trưng bày quái) | ĐỌC scene | 🔴 |
| `places/main/sim.js` vừa là trọng tài phòng vừa trọng tài trận | ĐỌC CODE | 🟠 |
| `session.js` đã là cửa đọc duy nhất trên giấy, nhưng **6 chỗ** vẫn đọc thẳng `place.state.lobby/match` (hero.js ×2, bot.js, ui.js, camera.js, lobby-stage.js) | grep | 🟠 — phải dọn trước khi dời state |
| `hero.js` 62 KB: input, combat, kinh tế, hồi sinh, yêu cầu sảnh, nhịp tim… | wc + đọc | 🟡 — to nhưng chưa phải nút thắt; tách sau |

### 3.3 Mở rộng (nhiều map, vài chục tướng)
| Phát hiện | Mức |
|---|---|
| `map.js` đã có `mapOf(id)`, nhưng chỉ một map, map gắn cứng toạ độ trong scene của `main` | 🟠 |
| Thêm tướng hiện = thêm vào `heroes.yml` + `skillfx.js` (một file VFX chung cho mọi tướng) → mỗi tướng mới làm boot nặng thêm | 🔴 cho mục tiêu "vài chục tướng" |
| Sổ asset có `hero` cho 86/526 dòng, chưa có `scope` | 🟡 |

### 3.4 UI
| Phát hiện | Mức |
|---|---|
| 416 inline style; nhiều nhất: `lobby/room.js` 61, `match/common.js` 56, `lobby/heroes.js` 44, `match/mobile.js` 26 | 🟠 (luật đã duyệt cấm) |
| Router HUD đã tách và so byte-for-byte khớp 20 trạng thái (giả lập) | 🟢 giả lập · chưa thử trận thật |

### 3.5 Mạng / trạng thái
| Phát hiện | Mức |
|---|---|
| Đưa người giữa place: state người chơi đi theo, nhưng luật Sân Tập giữ trận 60 s khi reload phải chạy được qua 2 place | 🟠 rủi ro chính của M3 |
| Bot phải sinh trong place map, trọng tài phòng ở world | 🟡 |

### 3.6 Quy trình
| Phát hiện | Mức |
|---|---|
| Có luật module, luật sổ asset, luật đo, luật TODO trước | 🟢 |
| Báo cáo trước đây có lúc nói nguyên nhân khi số đo đến từ các bản build khác nhau | 🟡 — từ giờ chỉ so đo cùng máy, cùng place, trước/sau một thay đổi |

## 4. Đánh giá (tự phê bình, có giới hạn)

**Hướng đi đúng chưa?** Đúng, và có số đo chống lưng: lý do nặng nhất (41.5 MB) không phải do code hay HUD mà do **sảnh đứng trong map**. Tách place là đòn bẩy lớn nhất, lớn hơn mọi việc tách file JS cộng lại. (ĐO + SUY LUẬN)

**Những gì đã làm có giá trị thật không?**
- Tách HUD/màn: giá trị chính là **dễ bảo trì**, chưa chứng minh được giảm tải (bundling trong một place). Không nên quảng cáo nó là tối ưu tải. (tự sửa lại báo cáo #33278)
- Place `sanh` thử: hứa hẹn nhưng chưa có số trên máy người chơi.

**Điểm yếu của chính kế hoạch doc 45:**
1. Cột `scope` trong sổ là **mô tả**, không tự làm giảm tải. Engine tải theo việc vật nào đứng trong place nào và file nào bị import. Sổ chỉ có ích khi đi kèm *check* (asset map A xuất hiện ở place B = lỗi) và danh sách prefetch. Đừng kỳ vọng "khai báo là xong".
2. `skillfx.js` một file cho mọi tướng mâu thuẫn trực tiếp với K6. Kế hoạch 45 chưa có bước tách nó → **thêm bước A2b: tách skillfx theo tướng, import khi tướng vào trận**.
3. Thứ tự 45: A1 (khai báo 526 dòng) trước M3 (tách sảnh) là **sai thứ tự giá trị**. M1→M3 cho kết quả lớn nhất; A1 có thể làm song song nhưng không nên chặn.
4. Chưa có kế hoạch rollback: nếu luồng sảnh↔map lỗi khi đang test, phải quay về được bằng một `spawn undo` (mỗi bước một commit, place `main` giữ đài sảnh tới khi M3 qua).

**Thứ tự đề xuất sau audit:**
| Ưu tiên | Bước | Vì sao |
|---|---|---|
| 1 | M1 dọn 6 chỗ đọc thẳng → session.js | rẻ, không đổi hành vi, mở khoá mọi bước sau |
| 2 | M2 + M3 tách trọng tài, sảnh = place riêng | đòn bẩy 41.5 MB |
| 3 | Đo boot sảnh trên máy người chơi | chứng minh, không đoán |
| 4 | A2b tách `skillfx.js` theo tướng + gỡ VFX khỏi boot sảnh | K6, mục tiêu vài chục tướng |
| 5 | K8 bỏ inline theo token (bắt đầu `room.js`, `common.js`) | luật đã duyệt |
| 6 | A1 cột scope + check | khi đã có 2+ place để check có nghĩa |
| 7 | M4/M5 đổi tên map, khung map mới | sau khi luồng ổn |

**Đánh giá chung:** kiến trúc hiện tại **bền hơn về code** (module, router, luật), **chưa bền hơn về tải** (một place, VFX chung, 41.5 MB). Kế hoạch 45 đúng hướng nhưng cần 3 sửa ở trên (thêm A2b, đổi thứ tự, rollback). (SUY LUẬN, cần review độc lập)

## 5. Cần creator chốt
1. Duyệt thứ tự §4 (M1 → M3 trước, sổ asset sau)?
2. Phòng trưng bày quái (x0z1): giữ trong game hay chuyển sang place chỉ editor vào?
3. Sảnh nhìn ra thung lũng hay biển mây là đủ?
4. Ai làm review độc lập (Codex)?
