# 62 · Production Bible và bộ mô phỏng studio

**Cập nhật bàn giao 09/10/2026:** chủ dự án xác nhận luật Sân Tập và reconnect đã fix; hai mục này **ĐÃ ĐÓNG THEO XÁC NHẬN OWNER**, không mở lại hoặc xin duyệt lại. Các report/source fixture 9351 là evidence lịch sử, không xác định trạng thái world sau đó. Ưu tiên [66 · Bàn giao cho Savi](66-ban-giao-cho-savi.md).

**Lượt sửa hiện hành:** doc63→64→65, code9351e23c6c6b4cc55a160dbf7aec268973b6394d sau fetch cuối. Receipt373b dưới đây là lịch sử. Kết quả sửa theo27ID ở `production-closure.json/md`; test/data đã chạy lại theo9351. Gói runnable mới nằm tại `artifacts/production-handoff` của dự án, gồm catalog/tool/sourcefixtures; ZIP báo cáo cũ không đủ chạy độc lập.

Ngày09/10/2026. Nguồn hiện hành đã fetch: `373bff9e7bca2093e89dfae6cc73fd6e0dd6749c`. So với ZIPdcdb, toàn cây chỉ đổi `scripts/architecture.json`; code/data/docs khác có blob giữ nguyên. [Receipt mới](../../reports/production-2026-10-09/latest-source-verification.json). Phạm vi: docs/data/tool về item, luật, vòng chơi, tướng/map/lore/UI và Mạch Đăng. Local dirty được giữ; không reset/merge/push hoặc đổi gameplay trong lượt này. Các lượt đo/ZIPdcdb dưới đây là lịch sử; doc63–65 là lượt sửa mới nhất.

**Mở [bảng báo cáo trực quan](../../reports/production-2026-10-09/index.html) trước.** Có sơ đồ, bảng lọc tài liệu, CSV/JSON, input, seed, trace, test và hash. Bản này đưa tài liệu tới mức có thể kiểm và giao việc, không tự chứng nhận game đã sẵn sàng phát hành.

## 1. Định nghĩa đủ giao sản xuất

Mỗi hệ thống phải giao đủ sáu phần cùng nhau:

1. **Luật:** tình huống vào/ra, quyền ghi, thời gian, thứ tự, lỗi và phản chế; không để agent tự chọn luật.
2. **Dữ liệu:** ID ổn định, đơn vị, công thức, giới hạn, source/version; một nguồn số máy đọc, không nhiều bảng tay lệch nhau.
3. **Hình/âm:** brief riêng đúng lore/class, animation/VFX/SFX/VO theo pha, cách đọc trong trận và asset manifest. Ảnh/âm chưa sản xuất ghi rõ, không bịa URL.
4. **Mô hình:** test và simulator chạy lại được; ghi đầy đủ những cơ chế mô hình bỏ qua. Tối ưu một chỉ số không phải cân bằng toàn game.
5. **Giao việc:** nơi tích hợp, owner, đầu vào/đầu ra, thứ tự, migration và cách quay lại bản trước; mỗi nhóm giao một bản dùng được.
6. **Nghiệm thu:** ca cụ thể, expected result, build/data/seed, file evidence; tác giả và người thẩm định khác nhau.

Trạng thái tách ba trục: **thiết kế** (PROPOSED/APPROVED), **độ sẵn sàng giao việc** (READY/NEEDS WORK), **evidence** (PASS_PURE/PASS_DATA/SOURCE REVIEW/PASS CLIENT/NOT RUN). Không nâng cả ba chỉ vì docs-check hoặc simulator xanh.

## 2. Gói cụ thể đã giao

| Hệ | Data/contract | Công cụ và bằng chứng | Kết luận hiện tại |
|---|---|---|---|
| Item | [59](59-he-trang-bi-de-xuat.md), `tools/balance/items/candidate-v01.json`; 24 món 8/6/8/2 | [Audit item](../../reports/production-2026-10-09/items-audit.md), [summary](../../reports/production-2026-10-09/items-lab/summary.json), recipe/shop/passive replay + CSV/SVG | Đủ triển khai catalog **proposal**; chưa cân bằng kit/team/runtime hoặc đủ asset mới |
| Luật và vòng chơi | [Bible00 local](00-bible-moba.md), data/hàm ở pin, docs14/09/11 liên quan | [Rules report](../../reports/production-2026-10-09/rules-report.md), actual-function fixtures và flow trace | Luật có mâu thuẫn; giữ FAIL visible, chưa production-ready |
| Map một lane | `scripts/lib/data/map.yml` + structures.yml ở pin | [Geometry JSON](../../reports/production-2026-10-09/map-geometry.json), CSV/SVG, 8 checks | Data đối xứng/HP khớp; chưa chứng minh scene/nav/LOS/readability hoặc cân bằng |
| Mạch Đăng | [61](61-mach-dang-va-cong-tac-phong-thu.md), `tools/balance/beacon/config.json` | Model/state tests, sweep, [timeline](../../reports/production-2026-10-09/beacon-timeline.csv), [design review](../../reports/production-2026-10-09/beacon-design-review.md) | Đủ prototype riêng; số V0.1/anti-spam bổ sung chưa duyệt, chưa engine/2-client/kit balance |
| Nghiên cứu/Bible | [58](58-nghien-cuu-va-thiet-ke-he-item.md), [60](60-nghien-cuu-moba-chien-thuat-va-luat.md), [00](00-bible-moba.md) | Nguồn đa game, pinned source, conflict table, coverage/hash | Research không thay canon; source mới và proposal tách rõ |
| Tướng/quái/UI/lore/5v5 | Docs03/23/25/28/30/31/34/38/41/53/54/55/56/57 tại pin và pack đã có | Content audit/coverage trong báo cáo chung; asset/data/spec owner phải khớp | Không lấy giấy thiết kế làm asset hoặc PASS client; roadmap có plan riêng |

## 3. Kết quả tự chạy

- **Item:** 93 tests pure; 5.000 giao dịch seeded kiểm ledger/atomic; 90.000 ca đánh thường/biến thể; 8 lịch sử nội tại. Seed 1000–1299, không censored trong mô hình stationary. JSON lặp lại giống byte. Chưa có kiting, toàn bộ chiêu, CC, wave/trụ, kỹ năng support hoặc đội hình thật trong combat trial.
- **Mạch Đăng:** 43 tests model; 54 cấu hình × 300 fixture = 16.200 lượt. Seed cố định. Cơ hội tiếp cận 70% là giả định công khai, không phải tỷ lệ đo từ người chơi. Restore snapshot chỉ kiểm trạng thái của mô hình, không phải Spawn restart.
- **Luật:** 52 tests source/harness PASS, 4 contract FAIL. Flow thực thi hàm source: START lặp ba lần chỉ áp một lần → picking 30s → loading 3s → ticket vào trận → kích kết thúc bằng fixture → results 20s → lobby. Không giả 30s trận fixture thành trận MOBA đầy đủ.
- **Map:** 8 checks data PASS. T1–T1 khoảng 50,06 m, khoảng ngoài hai tầm trụ 22,06 m; T1–T2 khoảng 32,95 m, khoảng ngoài hai tầm 4,95 m. Không chứng minh LOS qua vật cản hoặc thời gian rút chạy.
- **Docs:** toàn bộ Markdown canonical remote và bản local được kiểm kê/hash/link. Coverage semantic do người đọc ghi riêng; máy quét không tự đánh full-read. Hai file số54 cần phân biệt bằng tên đầy đủ, không dẫn “doc54” mơ hồ.

### Bằng chứng nhìn được

![Đồ đầu trận: sức chịu sát thương vật lý tĩnh](../../reports/production-2026-10-09/items-lab/starting-defense.svg)

Giáp Thiết ship tăng EHP đầu trận khoảng 63–89% tùy tướng. Candidate tối đa 500 vàng tăng khoảng 22–36% khi tối ưu EHP vật lý. Đây là cơ sở đánh giá bước tăng sức mạnh, không phải win rate; chưa duyệt catalog số.

![Vòng chơi chạy bằng source trong harness](../../reports/production-2026-10-09/rules-flow.svg)

![Map data: tọa độ, vùng trụ và bụi](../../reports/production-2026-10-09/map-geometry.svg)

![Mạch Đăng: timeline mô hình](../../reports/production-2026-10-09/beacon-timeline.svg)

## 4. Ba nhóm việc phải đóng

### A. Đồng bộ luật, không tự đổi code theo docs cũ

**Owner Savi, Codex review.** Sân Tập hiện thêm bot; hold source là 900s trong khi docs60s; lobby 10 ghế không đủ tướng unique. Bổ sung nguồn quyết định gần nhất và đồng bộ Bible/14/11/data/consumer. Slice user hướng 1v1/3v3; đừng suy từ `teamSize:5` rằng 5v5 một lane đã nghiệm thu. Giữ test so docs cũ FAIL tới khi update expectation có provenance, không sửa test chỉ để xanh.

Raw trụ thực tế 308 ở phát thứ tư, không phải307; sửa văn bản/comment, không cần đổi damage. Mục acceptance lịch sử về level-heal/recall/range/wave/pick/R tách khỏi Slice. Nếu muốn thay luật, phải ghi như quyết định mới, không núp dưới “sửa docs”.

### B. Item có catalog nhưng cần consumer và combat thật

**Owner Wisp economy/combat, Savi tích hợp.** Nối recipe/tier/stats/passive vào catalog canonical và resolver/UI/bot dùng chung; AP/MR/moveSpeed cần consumer thực. Recipe credit không double; fail atomic; bán/rebuy không reset relic CD; mua/sell không tạo heal ngoài chính sách được chốt.

Replay tám passive có counter/cast/target/death/CD/history; chiêu/tuning/kháng phải resolve tại đúng pha trong engine. Sau đó test matchup sáu tướng với kit, farm/tower/travel/team; tool hiện tại không xếp hạng support/mage theo AA DPS. Icon/tooltip không báo đã có khi chỉ có brief.

### C. Mạch Đăng làm nhỏ, đo phản chế trước mở rộng

**Owner Wisp gameplay/map/UI, Savi tích hợp; Codex 2-client QA.** Hai đèn riêng trong map thử; điền radius/territory/LOS/CC từ config EXPERIMENTAL. Thực hiện sáu hành vi user yêu cầu và công tắc năm trạng thái; kiểm minimap/target/bot không rò địch ẩn. Giá180/tầm10/hồi35 và lock chung node35 chưa được coi là cân bằng.

Lock chung35s dài hơn vòng sáng25s: mô hình chặn spam nhưng một/ba/năm người cầm công tắc có hiệu quả giống nhau trong fixture. Cần đo lợi ích bảo vệ và cửa phản công thật. Chưa tự dựng 6–8 đèn/5v5 hoặc mở Boss để làm prototype hai đèn.

## 5. Chạy lại bằng một lệnh

```powershell
bun tools/balance/production.mjs
```

Thêm `--simulate` để chạy cả ba mô phỏng và dựng lại dashboard trong cùng một lệnh. Không có cờ này chỉ chạy các bài kiểm nhanh và dựng dashboard.

Exit1 khi test luật còn conflict là đúng; không coi tất cả xanh nếu một suite đỏ. Nhật ký từng phần ở `reports/production-2026-10-09/*-test.log` và `suite.json`.

Chạy mô phỏng và dựng lại hình/bảng khi đổi data:

```powershell
bun tools/balance/items/production.mjs --commit dcdbfb3d3cfe83ae65ed91a85dd439dceeb38f90 --n 300 --seed 1000
bun tools/balance/beacon/simulate.mjs --n 300 --seed 1000 --out reports/production-2026-10-09
bun tools/balance/production-rules/simulate.mjs
bun tools/audit/production-map.mjs
bun tools/audit/production-dashboard.mjs
```

Không phải simulator trận trọn MOBA. Những ca fixed-input có thể lặp giống nhau nhiều lần; số lượt lớn không thay độ đầy đủ của mô hình. Chỉ gọi BAL-PASS sau khi assumptions được đối chiếu trace và tiêu chí balance đã được chốt.

## 6. Hội đồng và thẩm định

Audit nội dung đọc toàn văn 43 tài liệu art/lore/map/UI, có [receipt/hash](../../reports/production-2026-10-09/content-coverage.json) và [kết quả](../../reports/production-2026-10-09/content-production-audit.md). Đây là coverage chuyên môn, tách khỏi kiểm kê tự động toàn thư mục. Ba việc cần đồng bộ: Mị Đăng melee1,6m nhưng bảng VFX vẫn projectile; chỉ dẫn kiến trúc48–50 đã bị bàn giao51 thay; gói tướng mới phải join kit/event/visibility/cleanup, không chỉ có một dòng look. Roadmap 21 tướng/5v5/phim có kế hoạch nhưng chưa được coi asset hoàn thành.

Chuyên môn: `production_items_lab` (economy/tools), `production_rules_consistency` (luật/flow/consistency), `production_beacon_design` (vision/design/map/art coverage), Codex (Bible/data geometry/packaging). Thẩm định độc lập: `mach_dang_independent_appraisal`, đọc tool và tự chạy lại tests; report [độc lập](../../reports/production-2026-10-09/independent-tool-review.md).

Thẩm định tìm thêm hai lỗi tool: snapshot nhận NaN và item seed không hợp lệ. Đã sửa, thêm regression và chạy lại; không giữ nhận xét lỗi đó như chưa sửa. Số bài test cũ trong report lịch sử phải đọc cùng phụ lục retest.

**Kết luận:** bộ tài liệu nay có data, sơ đồ, tool, trace và test; đủ giao các bước cụ thể ở §4. Chưa chứng nhận toàn bộ production-ready khi mode/reconnect còn lệch, candidate chưa có consumer/evidence kit và Mạch Đăng chưa integration. Không thêm vòng thủ tục để che ba nhóm việc này; xử lý trực tiếp rồi chạy lại cùng ca.


## Trạng thái bàn giao hiện tại

Sân Tập/reconnect đã đóng theo owner; các đoạn mâu thuẫn 60/900 hoặc bot/no-bot phía trên là đối chiếu lịch sử, không phải việc còn chờ. Các số item ở9351 chỉ mô tả snapshot: Savi đang sửa tám item live, cần đối chiếu số mới trước tích hợp candidate.
