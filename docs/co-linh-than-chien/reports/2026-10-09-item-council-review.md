# Thẩm định độc lập hệ trang bị V0.1

Ngày 09/10/2026. Reviewer độc lập với tác giả catalog và công cụ. **PASS phạm vi đề xuất dữ liệu + công cụ sàng lọc; chưa phải balanced hoặc sẵn sàng ship.** Không sửa gameplay, không push, không có nghiệm thu client từ lượt này.

## Phạm vi đã đọc và kiểm

- Root/repo AGENTS, local skill `colinh-moba-production`, kiến thức MOBA nền và README canonical trong `docs/co-linh-than-chien/`.
- Doc14, doc58 và báo cáo audit docs/items cùng ngày; runtime shop, stat, HP recompute, damage/basic tại pin `ad7948ab9710ac1adb2b561049821da8e0cb1da8`.
- Doc59 đối chiếu catalog `tools/balance/items/candidate-v01.json`, source `simulate.mjs`, fixture `test.mjs`. Giá, recipe, số stats và contract passive/HP trong doc khớp candidate đã đọc. Đây là proposal riêng, không thay `economy.yml` đang ship.

## Checklist và kết quả

| Hạng mục | Kết quả trong phạm vi |
|---|---|
| Bản sắc và nguồn tham khảo | 24 món có tên VI–EN, nhận diện mạch/ký ức/ngọc/đồng riêng; không thấy tên thương hiệu, icon hoặc lore đối thủ được sao chép trong catalog. Học nguyên tắc recipe/tiers là hợp lý. Không tuyên bố đã kiểm bản quyền asset chưa tạo. |
| Phân tầng và vai trò | 8 cơ bản, 6 trung cấp, 8 hoàn chỉnh, 2 relic; core/alternatives cho đủ sáu tướng. AP/MR/moveSpeed được ghi là mở rộng cần tích hợp, không giả là runtime đang hỗ trợ. |
| Kinh tế và recipe | Giá thành phần + phí ghép khớp, không vòng lặp; full credit cho nguyên liệu; không tính parent và child cùng lần; túi đầy xét sau tiêu thụ; giao dịch bị từ chối không đổi state. |
| Bản sao/nội tại | Có maxCopies và passive group; completed tối đa một bản; sáu ô, một relic. Nội tại chưa mô phỏng được gắn cờ, không dùng giá trị bị bỏ để kết luận yếu. |
| Bán lại và chống lạm dụng | 60% proposal theo luật hiện hành; giá bán vượt giá mua và phí ghép âm bị chặn. Cooldown group giữ qua bán/mua/đổi relic. Proposal tăng maxHP giữ currentHP, giảm maxHP clamp, ngăn mua/bán để tự hồi máu; khác runtime phải được tích hợp rõ. |
| Fidelity số nền | Growth/tuning đọc từ fixed Git pin; HP tuning trước itemHP, maxHP làm tròn, AS nhân theo từng món, giáp/kháng giảm trừ và xuyên tới sàn 0 có fixture. |
| Giới hạn mô phỏng | Autoattack đối mặt trong tầm, cấp/vàng cố định. Không có skill, CC, kite, map, wave, trụ, kinh tế thời gian hoặc active use. Không phải trận MOBA hoàn chỉnh. |

## Các lỗi review đã yêu cầu sửa

1. **Đường nâng cấp tụt chỉ số ngoài ý muốn:** hai Sợi Nhịp cộng AS theo phép nhân thành ×1.21; Quickstring ban đầu ×1.20. Đã sửa 0.21. MR hybrid và AP/HP Chuông Mây cũng nâng tới mức không hụt nguyên liệu tương ứng.
2. **Hợp đồng HP/cooldown và validator:** ban đầu giữ missingHP rồi clamp khi bán có thể hồi qua vòng mua/bán. Đã đổi proposal giữ currentHP; công cụ có fixture. Cooldown đọc group đúng catalog; validator chặn giá/phí bất hợp lệ, stat lạ.
3. **Công cụ sàng lọc:** loadout ban đầu không lần xuống thành phần rẻ khi thiếu vàng; đã sửa recipe walk. Proc phụ ban đầu dùng damage type đòn đánh; đã tách theo type của proc. Unsupported effect được báo rõ.

## Chạy độc lập

Reviewer đã chạy lại `bun tools/balance/items/test.mjs`: **45/45 PASS** ở lượt cuối, gồm proc đúng damage type, tuning trước kháng, nhóm nội tại không proc hai lần, tám event contract probe và sửa anti-heal. Log độc lập: `reports/items-v01-independent/test-log.txt`. Các fixture là giao dịch/stat/cooldown/determinism/event contract, không phải PASS gameplay.

Reviewer đã chạy catalog thực với seed 1000, n=300: **24 hàng tướng×cấp, 60 cặp×cấp, 18.000 lượt autoattack kiểm soát mỗi profile**. CLI xuất core-only và core-plus-alternatives; ba biến thể số cũng chạy trong `sweeps.json`. Evidence độc lập: `reports/items-v01-independent/screen.json`, `screen-core-plus-alternatives.json`, `screen.md`, `sweeps.json`. Ngân sách 500/1500/3000/6000 là kịch bản, không phải mục tiêu kinh tế đã khóa. Report ghi spent thật, hash nguồn/candidate và censored riêng.

Hash file ở lượt cuối: candidate `e28b03f48eca1741999eaad7f885ea54e46d8315fe2b356ce56c005eb1853b40`; simulate `f8c6f3a341bad34e1e980e55bc9239f22461115ff17b18202b8ed3996e66fca0`; test `53ae9bba0ee5e5fe91b992d30376080ebe36de745ec694f08439c14c847ddb04`. CandidateHash trong JSON là hash JSON đã parse/serialize (`fe06a7664cea958676ae4254b8576638e5c29f344560218758292f51b723e922`), khác hash byte file do whitespace; cả hai đều ghi rõ loại.

Tám passive probe chỉ xét sự kiện/bộ đếm/thời gian do caller cung cấp; không tự theo dõi lịch sử combat. Bảy nội tại vẫn bị loại khỏi autoattack liên tục. Reviewer bắt thêm một nhầm lẫn trong probe: hồi Heartforge chưa áp anti-heal, Chuông chưa phân biệt heal với shield. Đã sửa: regen 2 với anti-heal 40% trả 1.2, heal 100×1.08×0.6 trả 64.8, shield trả 108; khi không biết loại hiệu ứng thì không bịa giá trị. `valueStage` và `excludedRules` ghi rõ phần còn ngoài phép thử.

## Quyết định giao việc

Cho phép dùng proposal để xây hệ recipe/shop/consumer theo nhóm nhỏ. Không cần chờ roadmap 21 tướng, map ba lane hay điện thoại thật để bắt đầu phần này. Savi cần triển khai cùng catalog, bộ stat mở rộng và luật giao dịch/HP/cooldown đã ghi, rồi đối chiếu consumer và một trận thật trước khi gọi cân bằng. Các item có passive chưa được mô hình hóa vẫn cần test cơ chế khi tích hợp; không dùng TTK autoattack để duyệt sức mạnh toàn kit.
