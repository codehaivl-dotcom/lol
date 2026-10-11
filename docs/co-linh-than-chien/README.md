# Cổ Linh Thần Chiến — tài liệu thiết kế

> **Agent đọc trước:** [`HANDOFF.md`](../../HANDOFF.md) → [71 · Sơ đồ hệ thống](71-so-do-he-thong.md) → [72 · Luật handoff](72-luat-handoff.md). Không đọc hết bộ docs.

## Bàn giao Codex → Savi · 09/10/2026

**Cập nhật bàn giao 09/10/2026:** chủ dự án xác nhận luật Sân Tập và reconnect đã fix; hai mục này **ĐÃ ĐÓNG THEO XÁC NHẬN OWNER**, không mở lại hoặc xin duyệt lại. Các report/source fixture 9351 là evidence lịch sử, không xác định trạng thái world sau đó. Ưu tiên [66 · Bàn giao cho Savi](66-ban-giao-cho-savi.md).

Đọc **66 → 63 → 59** để triển khai item; 60 là nghiên cứu, 61/65 là prototype Mạch Đăng. Catalog: `../../tools/balance/items/candidate-v01.json`. [Dashboard mô hình lịch sử](../../reports/production-2026-10-09/index.html).

- [52-quy-hoach-ui-hud-module](52-quy-hoach-ui-hud-module.md)
- [58-nghien-cuu-va-thiet-ke-he-item](58-nghien-cuu-va-thiet-ke-he-item.md)
- [59-he-trang-bi-de-xuat](59-he-trang-bi-de-xuat.md)
- [60-nghien-cuu-moba-chien-thuat-va-luat](60-nghien-cuu-moba-chien-thuat-va-luat.md)
- [61-mach-dang-va-cong-tac-phong-thu](61-mach-dang-va-cong-tac-phong-thu.md)
- [62-production-bible-va-bo-mo-phong](62-production-bible-va-bo-mo-phong.md)
- [63-item-integration-handoff](63-item-integration-handoff.md)
- [64-slice-authoritative-handoff](64-slice-authoritative-handoff.md)
- [65-vision-map-acceptance](65-vision-map-acceptance.md)

**Bản handoff chuẩn V1.** Đây là mục lục duy nhất của bộ docs. Tóm tắt một trang cho Savi nằm ở [design.md](../../design.md).

**[00 · MOBA Bible](00-bible-moba.md)**: luật MOBA của game, cập nhật mỗi khi có luật mới.

## Tài liệu theo thứ tự đọc

1. [Thế giới, lịch sử và cốt truyện](01-the-gioi-va-cot-truyen.md)
2. [Bản đồ và art bible](02-ban-do-va-my-thuat.md)
3. [Roster và tạo hình 27 Cổ Linh](03-danh-sach-tuong.md)
4. [Nguyên tắc thiết kế, tham khảo và cân bằng](04-bao-toan-gameplay.md)
5. [Từ điển và localization VI–EN](05-tu-dien-viet-hoa.md)
6. [GDD sản xuất V1](06-gdd-san-xuat-v1.md)
7. [Layout map Cửu Mạch](07-layout-ban-do-v1.md)
8. [Combat, tiến trình, objectives và kinh tế](08-combat-kinh-te-v1.md)
9. [Data contract, ID và localization schema](09-data-contract-va-roster.md)
10. [Tham khảo và quyết định thiết kế](10-doi-soat-runtime.md)
11. [Acceptance và bàn giao](11-acceptance-ban-giao.md)
12. [Thang chỉ số tham khảo](12-bang-chi-so-tuong.md)
13. [Playtest slice 1: Mạch Giữa](13-playtest-slice-1.md)
14. [**TODO + luật sảnh Slice 1.5** (phạm vi hiện hành)](14-todo-lobby-va-playtest.md)

## Tài liệu bổ sung và kế hoạch đang làm

15. [TODO trận thử 1v1](15-todo-thu-tran-1v1.md)
16. [Khoảng trống gameplay](16-gap-gameplay.md)
17. [Thiết kế map Mạch Giữa](17-thiet-ke-map-mach-giua.md)
18. [Research map MOBA](18-research-map-moba.md)
19. [Research HUD và gameplay](19-research-hud-gameplay.md)
20. [Khoảng trống skill/VFX/target](20-gap-skill-vfx-target.md)
21. [Audit balance và kế hoạch VFX](21-audit-balance-va-plan-vfx.md)
22. [Tài nguyên 27 tướng](22-tai-nguyen-27-tuong.md)
23. [Giao việc 21 tướng](23-giao-viec-21-tuong.md)
24. [TODO hoàn thiện 6 tướng](24-todo-hoan-thien-6-tuong.md)
25. [Kế hoạch động tác theo vóc dáng, class và vũ khí](25-dong-tac-theo-tuong.md)
26. [Hồ sơ sản xuất phim lore](26-video-lore-intro.md)
27. [Handoff sản xuất map 5v5 ba đường](27-handoff-map-5v5-ba-duong.md)
28. [Workflow animation skill cho tướng](28-workflow-animation-skill.md)
29. [TODO VFX trong suốt](29-todo-vfx-trong-suot.md)
30. [Workflow VFX skill](30-workflow-vfx-skill.md)
31. [Concept lính và boss](31-concept-linh-va-boss.md)
32. [TODO Siêu Linh Binh](32-todo-sieu-linh-binh.md)
33. [TODO Linh Binh 3D](33-todo-linh-binh-3d.md)
34. [Ma trận VO/SFX theo slot — roster 27](34-ma-tran-vo-sfx-roster-27.md)
35. [Spec boss Thuồng Luồng / Cổ Linh Long (tạm)](35-spec-boss-thuong-luong-co-linh-long.md)
39. [Áo Bão chắn đạn (Vân Dao E)](39-spec-ao-bao-chan-dan.md)

Báo cáo: [Audit docs](AUDIT-2026-10-07.md) · [Mô phỏng balance](balance-sim-2026-10-07.md) · [Balance log](balance-log.md). Kiểm tự động: `bun tools/audit/docs-check.mjs`.

Playtest client thật: [Hội đồng Codex — 08/10/2026](reports/2026-10-08-playtest-codex.md), kèm snapshot JSON và trạng thái retest. Đây là evidence, không thay luật hiện hành ở doc 14.

## Phạm vi hiện hành: Slice 1.5

Vòng đang làm là **Slice 1.5: Sảnh kiểu LOL + Mạch Giữa**. Luật chốt ở **14 §B0** (B0.1–B0.9: phạm vi, phase, mode, lệnh sảnh, kết quả, ngôn ngữ, Sân Tập, quyền, danh tính, schema). Với vòng này, 14 thắng các mục tương ứng của 06, 09, 11, 13. Các tài liệu đó giữ đích V1 dài hạn và có dòng dẫn sang 14. Quyết định D13–D18 ở 10.

**Thứ tự đọc cho người code vòng này:** 14 (toàn bộ) → 09 §1–2 → 08 (số trận) → 13 (luật trận Mạch Giữa) → 11 §Slice 1.5 (nghiệm thu).

## Nguồn chuẩn

**Game mới hoàn toàn** (quyết định 2026-10-07): tướng, tạo hình, kit và số liệu là của Cổ Linh. Data game khác trong `data/legacy-source/` và `data/legacy-kits-v1.json` **chỉ để tham khảo**, không import, không ship.

- Số gameplay: `scripts/lib/data/*.yml` (tạo khi build), tune bằng mô phỏng theo 04 §3. Trước khi có file đó, 08 là spec khởi điểm.
- Tên, role, tên chiêu VI–EN và ID tướng: `data/roster-display-map.csv`.
- Quyết định đã chốt: 10 (D1–D12). Audit: `AUDIT-2026-10-07.md`.

## Quy ước nhãn

- **[USER LOCK]** chủ dự án đã chốt; không tự đổi.
- **[V1 SPEC]** quyết định thiết kế của dự án; số là giá trị khởi điểm, chỉnh qua `balance-log` + mô phỏng (04 §3).
- **[THAM KHẢO]** giá trị khởi điểm mượn từ data tham khảo; phải qua mô phỏng trước khi khóa.
- **[TBD-SIM]** chưa có số; đặt bằng mô phỏng, không phải chờ "nguồn".
- [37 · Skill Thuồng Luồng (TẠM)](37-skill-thuong-luong.md)
- [40 · Audit kiến trúc UI + tiêu chuẩn UI](40-audit-kien-truc-ui.md)
- [41 · Thư viện VFX](41-thu-vien-vfx.md)
- [42 · Quản lý asset: manifest + luật khai báo](42-quan-ly-asset.md) · index: [assets/INDEX.md](../../assets/INDEX.md)
- [43 · Nghiên cứu tối ưu Sảnh → Chọn tướng → Trận (Liên Quân/LoL, nguyên lý)](43-nghien-cuu-toi-uu-sanh-tran-tuong.md)
- [44 · Kế hoạch tách Place + Module (Sảnh / Map / Dev)](44-ke-hoach-tach-place-module.md)

- 45 kế hoạch phân phối asset + tách map (v1, thứ tự đã thay bởi 48)
- 46 tổng hợp kiến trúc + tự audit
- 47 review độc lập (wisp)
- 48 **quyết định kiến trúc V1 (v3)**: modular trong `main`, `main` là trọng tài duy nhất, giữ schema place.state; 3 bước B1–B3 giao agent
- 49 roadmap phase sau: tách place + hợp đồng chuyển place (doc 48 v2.4 nguyên văn); spike P-1…P-7 không chặn vòng hiện tại
