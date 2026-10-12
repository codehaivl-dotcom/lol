# 104 · Kế Hoạch Sản Xuất Roster Toàn Diện Đã Duyệt (Full Approved Roster Production Master Plan)

**Trạng thái tài liệu:** `OWNER_APPROVED_PRODUCTION_DIRECTIVE / MASTER_EXECUTION_PLAN_V2`  
**Chỉ thị tối cao của Owner:**  
> **"Mục tiêu cuối: FULL APPROVED ROSTER PLAYABLE — không phải FULL ROSTER DOCUMENTED. Chấm dứt chuỗi vòng audit concept lặp lại. Đưa TẤT CẢ 26 tướng đã duyệt đi hết dây chuyền production, trở thành nhân vật 3D thực sự có thể chơi trong trận 5v5."**

**Workflow triển khai đa sub-agent cho đủ 26 tướng:** [105 — Hero Factory (source → kit → Lab → 3 audit → Owner → asset → playable)](105-hero-factory-multi-agent-workflow.md). Chỉ đạo điều phối sản xuất, không thay các luật kỹ thuật của 23/62/73/76/79/91.

**Tài liệu tham chiếu:** [100 — Rivalry Audit](100-roster-v5-round4-selection-rivalry-audit.md), [102 — Beginner Concept Shortlist](102-roster-v5-beginner-concept-shortlist.md), [103 — Mythic Quintet Master Concept Bible](103-mythic-quintet-concept-bible.md), [73 — Balance Lab Simulator](73-balance-lab.md), [91 — Khóa Input QWER-D](91-khoa-input-qwer-d.md).  
**Công cụ Balance Lab tích hợp:** `tools/sim/run.mjs` (chuẩn mô phỏng chỉ số theo doc 73, đã tích hợp trực tiếp vào repository).

---

## 1. Khóa Master Registry: Đúng 26 Ứng Cử Viên Duy Nhất

Hội đồng Game Design đã rà soát và chuẩn hóa $100\%$ mã số nhận diện, loại bỏ triệt để mọi nguy cơ trùng lặp hoặc nhầm lẫn ID:
- **Kora:** Khóa chính thức ID **#32** (Runtime ID: `kora`).
- **Nera:** Khóa chính thức ID **#07** (Runtime ID: `nera`).
- **Rolo:** Khóa chính thức ID **#36** (Runtime ID: `rolo`).
- **Oneira:** Cấp mã nghiên cứu độc bản ID **#48** (Runtime ID: `oneira`). Tuyệt đối không dùng chung mã #36 của Rolo.
- **Kymos:** Cấp mã nghiên cứu độc bản ID **#49** (Runtime ID: `kymos`).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               DANH MỤC 26 TƯỚNG SẢN XUẤT CHÍNH THỨC CỦA CỔ LINH THẦN CHIẾN             │
├────┬─────────────┬───────────┬──────────────┬──────────────────┬───────────────────────┤
│ TT │ RESEARCH ID │ RUNTIME ID│ TÊN HIỂN THỊ │ VAI TRÒ CHÍNH    │ FANTASY / GAMEPLAY TOY│
├────┼─────────────┼───────────┼──────────────┼──────────────────┼───────────────────────┤
│ 1  │ #01         │ kiko      │ Kiko         │ Sát thủ (Assassi)│ Ảo ảnh quang học 1-hit│
│ 2  │ #02         │ brak      │ Brak         │ Đấu sĩ (Fighter) │ Parry piston phản đòn │
│ 3  │ #03         │ vero      │ Vero         │ Sát thủ (Assassi)│ Vết chém thời gian trễ│
│ 4  │ #07         │ nera      │ Nera         │ Xạ thủ (Marksman)│ Mỏ neo tời hai chiều  │
│ 5  │ #15         │ aero      │ Aero         │ Xạ thủ (Marksman)│ Phi công rải thảm bom │
│ 6  │ #17         │ forge     │ Forge        │ Đỡ đòn (Tank)    │ Lò nhiệt dâng xả áp   │
│ 7  │ #19         │ inka      │ Inka         │ Pháp sư (Mage)   │ Thư pháp kẻ đường mực │
│ 8  │ #28         │ libro     │ Libro        │ Hỗ trợ (Support) │ Sổ nợ chia sẻ sát thươ│
│ 9  │ #30         │ iro       │ Iro          │ Xạ thủ (Marksman)│ Sniper mắt cơ khí     │
│ 10 │ #31         │ moka      │ Moka         │ Sát thủ (Assassi)│ Hổ nấm săn mùi bào tử │
│ 11 │ #32         │ kora      │ Kora         │ Đỡ đòn (Tank)    │ Khiên hướng giảm sát t│
│ 12 │ #33         │ eelix     │ Eelix        │ Sát thủ (Assassi)│ Lươn điện bóng tối    │
│ 13 │ #34         │ jeli      │ Jeli         │ Hỗ trợ (Support) │ Sứa chuông sóng nước  │
│ 14 │ #35         │ pavo      │ Pavo         │ Pháp sư (Mage)   │ Quạt mắt xòe dọa sợ   │
│ 15 │ #36         │ rolo      │ Rolo         │ Đấu sĩ (Fighter) │ Tê tê bóc vảy chuyển d│
│ 16 │ #37         │ mok       │ Mok          │ Hỗ trợ (Scout)   │ Đặt đèn & tiêu thụ đèn│
│ 17 │ #38         │ linh_hau  │ Linh Hầu     │ Đấu sĩ (Fighter) │ Biến điệu tầm trượng  │
│ 18 │ #39         │ kael      │ Kael         │ Đấu sĩ (Skirmish)│ Cuồng nhịp chém liên h│
│ 19 │ #40         │ lieu_tien │ Liễu Tiễn    │ Xạ thủ (Marksman)│ Vệt sương băng rút lui│
│ 20 │ #43         │ phu_dong  │ Phù Dong     │ Tiên phong (Vang)│ Thiết Mã & Cổ Trúc sét│
│ 21 │ #44         │ tan_son   │ Tản Sơn      │ Đỡ đòn (Jugger)  │ Vách ngọc & Thái Dương│
│ 22 │ #45         │ trieu_ba  │ Triều Bá     │ Pháp sư (Control)│ 3 thủy long & đại hồng│
│ 23 │ #46         │ dung_thach│ Dũng Thạch   │ Đấu sĩ (Bruiser) │ Thần rìu & Thiên cầm  │
│ 24 │ #47         │ co_lo     │ Cổ Lỗ        │ Xạ thủ (Siege)   │ Mai rùa pháo đài vạn t│
│ 25 │ #48         │ oneira    │ Oneira       │ Hỗ trợ (Support) │ Mặt nạ hút truyền CC  │
│ 26 │ #49         │ kymos     │ Kymos        │ Hỗ trợ (Support) │ Khánh đá hạ âm cắt sốc│
└────┴─────────────┴───────────┴──────────────┴──────────────────┴───────────────────────┘
```

> **Phân định rõ ràng ngoài scope:**  
> - **Dương Tiễn (#41)** và **Pyra (#42):** Là các proposal nghiên cứu độc lập, chưa được phê duyệt vào danh mục sản xuất.  
> - **Bác Quân:** Nằm trong Rewrite Pool, chưa có ID sản xuất.  
> - Tuyệt đối không tự ý nạp 3 concept này vào dây chuyền sản xuất chính thức khi chưa có chỉ thị bằng văn bản từ Owner.

---

## 2. Tiêu Chuẩn 5 Cột Trụ Của Một Nhân Vật "Production Complete"

Một nhân vật chỉ được tuyên bố hoàn thành sản xuất khi đạt trọn vẹn 5 cột trụ:

```
                      [PLAYABLE PRODUCTION COMPLETE]
                                    │
    ┌──────────────┬────────────────┼────────────────┬──────────────┐
    ▼              ▼                ▼                ▼              ▼
[1. CONCEPT &  [2. 3D ASSET &   [3. COMPLETE     [4. VFX, SFX &  [5. RUNTIME
 BATTLE FORM]     ANIMATION]     GAMEPLAY KIT]      UI FEEDBACK]   PLAYTEST]
- Khớp art duyệt- Model 3D tối ưu- Đánh thường    - Bộ VFX chuẩn URP- Spawn vào map
- Silhouette rõ - Rig chuẩn biped- Q / W / E / R  - Bộ SFX đầm tay  - Bot AI điều khiển
- Footprint chuẩn/ quadruped    - Universal Dash D- Icon chiêu & HUD- Test 1v1 & 5v5
- Không rác visual- 8+ animations- Pass Balance Lab- Feedback máu   - Mượt 60 FPS
```

---

## 3. Quy Trình 9 Cổng Sản Xuất Chuẩn Hóa Theo Tài Liệu 73 (Gate 0 → Gate 8)

Để ngăn chặn việc lãng phí tài nguyên dựng 3D khi lối chơi chưa được kiểm chứng, quy trình sản xuất được sắp xếp nghiêm ngặt theo đúng [Tài liệu 73](73-balance-lab.md):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      QUY TRÌNH 9 CỔNG SẢN XUẤT CHO MỖI TƯỚNG                           │
├────────┬─────────────────────────┬─────────────────────────────────────────────────────┤
│ CỔNG   │ TÊN GIAI ĐOẠN           │ DELIVERABLE & TIÊU CHÍ NGHIỆM THU                   │
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 0 │ Concept Approved        │ Fantasy, Silhouette, Gameplay Toy được duyệt.       │
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 1 │ Battle Form & Manifest  │ Khóa kích thước mesh, footprint, animation list,    │
│        │ (Song song chuẩn bị)    │ tài nguyên VFX/SFX cần thiết.                       │
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 2 │ Candidate Kit YAML      │ Soạn file kit tại `tools/sim/candidates/<id>.yml`   │
│        │                         │ (base stats, growth, Q/RMB/E/R, passive, 5 items).  │
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 3 │ Balance Lab Simulation  │ Chạy `bun tools/sim/run.mjs all --cand --heroes <id>`│
│        │ (COLINH Sim Engine)     │ Kết quả: 0 cờ RED, One-Combo đạt chuẩn, duel 40-60%.│
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 4 │ Owner Sign-Off          │ Creator/Owner xem báo cáo Lab và ký duyệt kit.      │
│        │ [CHẶN CHI PHÍ 3D]       │ TUYỆT ĐỐI KHÔNG DỰNG 3D HOÀN CHỈNH TRƯỚC GATE 4!     │
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 5 │ 3D Model, Texture & Rig │ Model low-poly tối ưu (<15k tris), texture PBR,     │
│        │                         │ rig chuẩn hierarchy không gãy skinning.             │
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 6 │ Animation & VFX Assets  │ Bộ 8+ animations (Idle, Run, Atk, QWER, Die) & VFX  │
│        │                         │ đọc rõ ràng ở camera MOBA.                          │
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 7 │ Runtime Integration     │ Nạp data vào `heroes.yml`, móc hàm vào `kitmech.js` │
│        │                         │ và kiểm tra nạp thành công trong engine.            │
├────────┼─────────────────────────┼─────────────────────────────────────────────────────┤
│ Gate 8 │ Engine QA & Playtest    │ Bot AI dùng được, test 1v1 & 5v5 không crash,       │
│        │                         │ không đè phím Dash D → CHÍNH THỨC PLAYABLE PASS!    │
└────────┴─────────────────────────┴─────────────────────────────────────────────────────┘
```

---

## 4. Lộ Trình Phân Bổ 26 Tướng Theo 4 Production Waves (Đã Điều Chỉnh)

Theo chỉ đạo chiến lược của Owner, **Sứa Chuông Jeli (#34)** được đưa vào **Wave 1** để hoàn thiện bộ tứ tương tác cơ bản (Tank - Fighter - Marksman - Support), và **Kiko (#01)** được chuyển sang **Wave 2**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PHÂN BỔ 26 TƯỚNG TRONG CÁC PRODUCTION WAVES                     │
├────────┬───────┬───────────────────────────────────┬───────────────────────────────────┤
│ WAVE   │ SỐ LƯỢNG│ DANH SÁCH TƯỚNG                   │ MỤC TIÊU CHIẾN LƯỢC               │
├────────┼───────┼───────────────────────────────────┼───────────────────────────────────┤
│ Wave 1 │  5    │ 1. Linh Hầu (#38 — Fighter)       │ VERTICAL SLICE WAVE: Đủ 4 vai trò │
│        │       │ 2. Kael (#39 — Skirmisher)        │ cốt lõi (Tank, Fighter, Xạ thủ,   │
│        │       │ 3. Liễu Tiễn (#40 — Marksman)     │ Hỗ trợ) để kiểm thử tương tác     │
│        │       │ 4. Forge (#17 — Tank)             │ hồi máu, bảo kê và mở giao tranh  │
│        │       │ 5. Jeli (#34 — Support)           │ thực tế trên runtime!             │
├────────┼───────┼───────────────────────────────────┼───────────────────────────────────┤
│ Wave 2 │  6    │ 6. Phù Dong (#43 — Vanguard)      │ CORE ARCHETYPES & FIRST MYTHIC:   │
│        │       │ 7. Kiko (#01 — Assassin)          │ Dựng tướng thần thoại đầu tiên    │
│        │       │ 8. Brak (#02 — Fighter)           │ Phù Dong (kỵ mã, gãy kiếm nhổ tre)│
│        │       │ 9. Nera (#07 — Marksman)          │ cùng các sát thủ và đấu sĩ cơ bản │
│        │       │ 10. Vero (#03 — Assassin)         │ của game.                         │
│        │       │ 11. Rolo (#36 — Fighter)          │                                   │
├────────┼───────┼───────────────────────────────────┼───────────────────────────────────┤
│ Wave 3 │  8    │ 12. Tản Sơn (#44 — Tank)          │ MYTHIC HIGH-FANTASY & SPECIALIZED:│
│        │       │ 13. Triều Bá (#45 — Mage)         │ Triển khai 4 Thần Tướng còn lại   │
│        │       │ 14. Dũng Thạch (#46 — Fighter)    │ cùng các đấu sĩ/xạ thủ đặc thù;   │
│        │       │ 15. Cổ Lỗ (#47 — Marksman)        │ đưa Kora (#32) vào dây chuyền.    │
│        │       │ 16. Kora (#32 — Tank)             │                                   │
│        │       │ 17. Moka (#31 — Assassin)         │                                   │
│        │       │ 18. Aero (#15 — Marksman)         │                                   │
│        │       │ 19. Iro (#30 — Marksman)          │                                   │
├────────┼───────┼───────────────────────────────────┼───────────────────────────────────┤
│ Wave 4 │  7    │ 20. Inka (#19 — Mage)             │ COMPLEX MECHANICS & SPIKES:       │
│        │       │ 21. Mok (#37 — Support/Scout)     │ Triển khai các hỗ trợ/pháp sư     │
│        │       │ 22. Libro (#28 — Support)         │ chuyên sâu; đưa Eelix (#33) và    │
│        │       │ 23. Pavo (#35 — Mage)             │ Oneira (#48) vào sản xuất ngay khi│
│        │       │ 24. Kymos (#49 — Support)         │ vượt qua bài thử nghiệm Spike.    │
│        │       │ 25. Eelix (#33 — Assassin Spike)  │                                   │
│        │       │ 26. Oneira (#48 — Support Spike)  │                                   │
├────────┴───────┴───────────────────────────────────┴───────────────────────────────────┤
│ TỔNG CỘNG: 5 + 6 + 8 + 7 = ĐÚNG 26 TƯỚNG DUY NHẤT (100% COVERAGE, KHÔNG TRÙNG, KHÔNG THIẾU)│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Bảng Theo Dõi Tiến Độ Sản Xuất Chi Tiết (Production Tracker Matrix)

| ID | Runtime ID | Tên Tướng | Vai Trò | Wave | G0 Concept | G1 Spec | G2 YAML | G3 Lab | G4 Sign | G5 3D | G6 Anim | G7 Int | G8 Play | Trạng Thái Hiện Tại |
|:---|:---|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| #38 | `linh_hau` | Linh Hầu | Fighter | W1 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W1 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #39 | `kael` | Kael | Skirmisher | W1 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W1 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #40 | `lieu_tien` | Liễu Tiễn | Marksman | W1 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W1 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #17 | `forge` | Forge | Tank | W1 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W1 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #34 | `jeli` | Jeli | Support | W1 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W1 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #43 | `phu_dong` | Phù Dong | Vanguard | W2 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W2 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #01 | `kiko` | Kiko | Assassin | W2 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W2 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #02 | `brak` | Brak | Fighter | W2 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W2 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #07 | `nera` | Nera | Marksman | W2 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W2 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #03 | `vero` | Vero | Assassin | W2 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W2 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #36 | `rolo` | Rolo | Fighter | W2 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W2 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #44 | `tan_son` | Tản Sơn | Tank | W3 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W3 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #45 | `trieu_ba` | Triều Bá | Mage | W3 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W3 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #46 | `dung_thach` | Dũng Thạch | Fighter | W3 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W3 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #47 | `co_lo` | Cổ Lỗ | Marksman | W3 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W3 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #32 | `kora` | Kora | Tank | W3 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W3 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #31 | `moka` | Moka | Assassin | W3 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W3 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #15 | `aero` | Aero | Marksman | W3 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W3 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #30 | `iro` | Iro | Marksman | W3 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W3 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #19 | `inka` | Inka | Mage | W4 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W4 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #37 | `mok` | Mok | Scout | W4 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W4 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #28 | `libro` | Libro | Support | W4 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W4 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #35 | `pavo` | Pavo | Mage | W4 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W4 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #49 | `kymos` | Kymos | Support | W4 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W4 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #33 | `eelix` | Eelix | Assassin | W4 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W4 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |
| #48 | `oneira` | Oneira | Support | W4 | PASS | PASS | PASS | FLAG_REVIEW (red=0) | HOLD | HOLD | HOLD | PEND | PEND | **W4 Active (Gate 3 FLAG_REVIEW / Gate 4 HOLD)** |

---

## 6. Danh Mục Cơ Chế Chưa Mô Phỏng Trong Simulator (NOT_TESTED Mechanics)

Để bảo đảm tính trung thực tuyệt đối, Hội đồng công khai danh sách các cơ chế mà simulator Balance Lab hiện tại **chưa biểu diễn đầy đủ**, do đó không được dùng kết quả Lab đơn thuần để tuyên bố các cơ chế này là hoàn hảo:

1. **Địa hình & Vách đá ngọc bích (Tản Sơn #44):** Chưa mô phỏng va chạm đa giác (mesh collision) và việc chặn đường di chuyển thực tế của đơn vị.
2. **Hệ thống sương mù chiến tranh & Tầm nhìn (Mok #37):** Chưa mô phỏng Fog of War động và cơ chế chia sẻ tầm nhìn qua tường.
3. **Ảo ảnh quang học (Kiko #01):** Chưa mô phỏng hành vi thuật toán của AI đối phương khi bị đánh lừa tung chiêu vào bóng ảo.
4. **Chắn đạn theo góc hướng (Kora #32):** Chưa mô phỏng hình học góc chắn $180^\circ$ theo thời gian thực đối với đạn đạo bay tới.
5. **Crit, hút máu, sát thương chuẩn, phản sát thương, silence:** Chưa có trường dữ liệu chính thức trong runtime schema `heroes.yml`.

> **Quy định nghiệm thu:** Các tướng sở hữu các cơ chế trên phải trải qua bài kiểm thử trực tiếp trên engine game ở **Gate 8 (Engine QA & Playtest)** mới được cấp nhãn `PLAYABLE PASS`.

---

## 7. Hành Động Kế Tiếp (Immediate Action Items)

1. **Khóa Wave 0:** Chạy automated test kiểm tra registry 26/26 hero.
2. **Khai hỏa Wave 1 (5 Tướng Nhập Môn):**
   - Đưa bộ kit thông số YAML của **Linh Hầu (#38)**, **Kael (#39)**, **Liễu Tiễn (#40)**, **Forge (#17)** và **Jeli (#34)** vào `tools/sim/candidates/`.
   - Chạy mô phỏng Balance Lab đối đầu với Baseline Comparison Panel (6 tướng đại diện các vai trò).
   - Xuất báo cáo `report.json` và trình Owner xem xét phê duyệt (Gate 4 Sign-Off) trước khi chuyển sang dựng 3D.


---


### QA RECTIFICATION — Commit 55d7d90 / campaign 2026-10-12T07-21-06-914Z

**Verified source:** [machine summary](../../reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json) (the root repository report path is `reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json`). This is an independent review of recorded output; no fresh Bun run or live Spawn playtest is claimed.

- **26/26 accounted for: 11 FLAG_REVIEW, 15 MISSING_KIT, zero SIM_FINISHED_REVIEW_REQUIRED.** The eleven completed simulator jobs each have **red=0 but orange>0**. `FLAG_REVIEW` is the **actual runner status**, not `PASS_MODEL` clean. The tracker G3 cells have been corrected accordingly.
- Six Wave 2 independent `07-audit-record.md` files contain **9 OPEN MAJOR + 9 OPEN MINOR defects** (18 total), rather than the 7 Major / 10 Minor reported in the narrative. Their Audit2 PASS_LAB claims cannot promote Gate 3 while flags and essential-mechanic coverage remain unresolved.
- Example contradictions: Phu Dong visual is **mounted rider on separate steed, NOT centaur** (doc 103 and its source lock), yet the red-team audit calls for a centaur rig and Unity URP (incorrect for Spawn target); Kiko's decoy targeting AI is NOT_TESTED; several gameplay toy unit tests assert fields or manually set state rather than proving cast→effect→expiry.
- All eleven Gate 4 cells remain **HOLD**. No sign-off is implied by any prior packet label, report, or test count. Costly 3D final-generation stays HOLD. Art spec/visual brief, mechanics work, source fixes and further packets may proceed.
- Parallel policy remains in force: **do not defer 15 missing hero packets/kits until Wave 2 flags close**. Repair flagged 11 and build missing 15 concurrently. Each repaired kit must be rerun; preserve prior reports and defect history.

**Reopen condition:** actual working mechanics tests for core toys + coherent player/bot/runtime semantics; revised seeded model reports with explicit disposition for impactful ORANGE flags and NOT_TESTED; independent audit evidence and decision-ready owner Gate 4 review. Do not auto-green merely by hiding flags or relaxing thresholds.

---

## 10. Toàn Roster: Chạy Balance Lab Song Song 26/26 (Owner Directive 2026-10-12)

**Chỉ thị Owner:** Không chờ kiểm định xong từng Wave mới mở Wave tiếp theo. Mở ngay **26/26 hero trong cùng một chiến dịch Lab**. Wave 1–4 tiếp tục dùng cho thứ tự 3D / runtime / marketing, **không là hàng đợi của Hero Kit và Balance Lab**.

**Registry machine-readable:** tools/sim/production-26-roster.json (26 research IDs và runtime IDs duy nhất). **Bộ điều phối:** tools/sim/production-26.mjs.

    # Kiểm kê đủ 26 tướng, phát hiện những candidate YAML còn thiếu:
    bun tools/sim/production-26.mjs --dry-run

    # Tạo/chỉnh sửa các kit YAML còn thiếu song song theo Concept Bible đã duyệt.
    # Một lệnh nhận và xử lý cả roster; tối đa 4 process Lab đồng thời để tránh nghẽn CPU/RAM.
    bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1

- Phân công song song việc viết kit/spec cho **toàn bộ 26 tướng**, không phân batch 5; mỗi hero phải đối chiếu với canonical Concept Bible, viết kit hợp lệ, thêm hoặc kiểm tra hỗ trợ của simulator cho core gameplay toy; không dùng generic QWER trá hình.
- Runner chỉ kiểm thử YAML có thật. Hero chưa có kit ghi **MISSING_KIT**, không được tính là đã kiểm định. Lệnh chạy chiến dịch tự tiếp tục những tướng còn lại dù một hero lỗi.
- Mỗi hero có log, report.json, report.html; reports/sim/production26/<campaign>/summary.json có trạng thái 26/26, mã ID, số cờ RED/ORANGE, revision, seed, đối chiếu baseline.
- **FLAG_RED** / **FLAG_REVIEW** / **INVALID_REPORT** / **MISSING_KIT** chặn sign-off. **SIM_FINISHED_REVIEW_REQUIRED** vẫn phải được người duyệt kiểm tra cơ chế thật, NOT_TESTED và utility theo vai trò, không phải auto Gate 4.
- Những cơ chế hình học/AI/vision/CC chưa được simulator hỗ trợ bắt buộc có bài test bổ sung trước khi gọi Lab complete. Không được giảm độ khó bằng cách bỏ core toy đã duyệt.
- **Không tự động copy sang heroes.yml, không chi credit 3D trước Gate 4, không tự nhận PASS_ENGINE.** Model/Battle Form/manifest được chuẩn bị song song.
- **Đầu ra của chiến dịch:** 26 kit ứng viên được xây dựng/kiểm tra đầy đủ; kết quả từng hero với blocker rõ ràng; Owner chỉ phải xem các trường hợp FLAG/NOT_TESTED hay đề xuất sign-off, không tổ chức thêm vòng audit concept.

**Trạng thái khi ban hành lệnh:** 5 file YAML Wave 1 hiện hữu, 21 hero production chưa có YAML theo registry; việc commit runner không có nghĩa đã chạy đủ 26 hoặc đã PASS_MODEL. Agent có môi trường Bun cần chủ động viết nốt 21 kit, chạy full-campaign và giao báo cáo thực thi với số PASS/FLAG/MISSING thật.
