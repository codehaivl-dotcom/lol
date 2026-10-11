# 61 · Mạch Đăng và Công Tắc phòng thủ

Ngày: 2026-10-09. Nguồn: hai đề xuất trực tiếp của lukasai trong chat, cùng sơ đồ “Tranh chấp đèn gần Boss”. Kiến thức đối chiếu: [60 · Nghiên cứu MOBA](60-nghien-cuu-moba-chien-thuat-va-luat.md).

**Trạng thái:** hướng thiết kế được người dùng đồng ý; số V0.1 và cách xử lý tình huống dưới đây là **PROPOSED để prototype**, chưa phải số cân bằng đã khóa. Chưa triển khai, chưa mô phỏng, chưa PASS client. Không thay luật vision đang ship bằng một bản sửa docs.

## 1. Quyết định thiết kế

- Đèn cố định, không mua/di chuyển/phá hủy. Hai phe Minh Ước và Triều Vực đều có thể thắp trực tiếp để chiếm. Chỉ phe giữ đèn nhận vision.
- Thắp trực tiếp là cách chiếm chính: người thắp đứng yên, không đánh thường hoặc cast, vẫn chịu damage. Đồng đội có lý do bảo vệ; đối thủ có thể ngắt hoặc chiếm lại.
- Vision hữu hạn, không xuyên vật cản đặc. Cấp I không lộ địch trong bụi hoặc tàng hình; cấp II phát hiện cả hai nếu còn đường nhìn hợp lệ.
- Công tắc là công cụ phòng thủ: mua một lần, hồi lượt sử dụng, chỉ dùng cho đèn trong lãnh thổ gốc của phe mình. Không chiếm ngay đèn địch và không tạo cấp II.
- Lãnh thổ phòng thủ cố định từ đầu trận; mất trụ không đổi quyền công tắc. Đội thắng có lợi thế thông tin, đội thua vẫn có cơ hội phản công.
- Tướng, lính, căn cứ và trụ vẫn có vision nền theo contract riêng. Người chơi thấy địa hình dưới fog; thông tin địch chưa biết bị che. Không suy bán kính vision từ tầm bắn trụ.

## 2. Thông số V0.1 do người dùng đưa

| Mục | Giá trị thử | Ghi chú |
|---|---|---|
| Cấp I | Channel 1,2 giây; sáng 25 giây | Không phát hiện bụi/tàng hình |
| Cấp II | Tổng channel 4 giây | Không phải thêm 4 giây sau cấp I |
| Thời lượng cấp II | 15 giây, sau đó 10 giây cấp I | Không duy trì vĩnh viễn |
| Công tắc | 180 vàng, mua một lần | Ô công cụ chiến thuật riêng, không chiếm ô trang bị combat |
| Tầm công tắc | 10 m tới đèn | Chỉ một đèn mỗi lần dùng |
| Hồi lượt công tắc | 35 giây, tối đa một lượt | Không tích nhiều lượt; không tự kích hoạt |
| Số đèn | Prototype Mạch Giữa: 2; ứng viên Cửu Mạch: 6–8 | Không suy tọa độ từ sơ đồ hoặc áp 6–8 lên map một lane |
| Bán kính vision / tương tác trực tiếp | TBD-MEASURE | Phải có giá trị rõ trong cấu hình prototype trước khi chạy; không tự dùng 10 m công tắc làm vision |

## 3. Công tắc: bảng chuyển trạng thái

Phe dùng công tắc phải có quyền lãnh thổ tại **đèn**, ở trong tầm, còn lượt và đang sống. Đèn trung tâm trung lập không mặc định thuộc lãnh thổ một phe.

| Đèn trước khi dùng | Kết quả hợp lệ |
|---|---|
| Tắt / trung lập | Cấp I của phe dùng, vòng sáng mới 25 giây |
| Phe mình cấp I | Không tác dụng, không gia hạn |
| Phe mình cấp II | Không tác dụng |
| Địch cấp II | Hạ thành cấp I của địch; mất detection, không đổi chủ |
| Địch cấp I | Tắt, trở lại trung lập |

**Đề xuất xử lý:** thao tác không hợp lệ không mất lượt, không trừ vàng, không bắt đầu hồi. Giá chỉ thu lúc mua; kích hoạt không thu thêm. Mua lặp bị từ chối. Prototype không cho bán, vứt, chuyển hoặc trao đổi công cụ. Chết, hồi sinh, đổi place và reconnect không mất công cụ hoặc làm mới lượt/hồi. Công tắc không gây damage, vàng hoặc buff combat.

Mua tại shop theo luật mua hiện hành; mua lần đầu có một lượt sẵn. Đây là giả định prototype, không mở shop ngoài căn cứ hoặc tự cấp miễn phí.

## 4. Ba điểm phải thống nhất khi dựng prototype

Những quy tắc trong mục này là phương án đề xuất của Codex để đóng khoảng trống, không phải USER LOCK mới.

### A. Một vòng sáng có thời hạn; thắp lại không nối dài vô hạn

- Cấp I bắt đầu đếm từ thời điểm hoàn thành mốc 1,2 giây. Lên cấp II lần đầu ở mốc 4 giây sẽ có 15 giây II + 10 giây I kể từ thời điểm đó.
- Phe đang sở hữu không được thắp thêm để refresh. Nếu công tắc địch hạ II xuống I, **giữ nguyên thời hạn tắt** của vòng sáng đó; không tạo thêm 25 giây.
- Để giữ tình huống user nêu “tới thắp lại II”: chủ có thể channel lại tổng 4 giây sau khi bị hạ cấp, nhưng chỉ khôi phục II trong phần thời gian II ban đầu còn lại. Không mở lại 15 giây mới; hết hạn II cũ thì không thể khôi phục trong vòng đó.
- Khi hoàn tất khôi phục, kiểm còn cùng chủ/vòng sáng và thời điểm hoàn tất phải trước hạn II gốc. Hạn đã hết hoặc vòng đã đổi thì hủy kết quả; tác vụ của vòng cũ không được ghi vào vòng mới.
- Khi đèn tắt hoặc đổi chủ bằng thắp trực tiếp, mở vòng sáng mới. Phe địch hoàn thành 1,2 giây thì chiếm ngay cấp I, tiếp tục tới tổng 4 giây để lên II.
- Ngắt trước cấp I: không đổi đèn. Ngắt sau cấp I: giữ cấp I và timer đã có. Chết/di chuyển/khống chế cứng ngắt channel; damage thường tự nó không ngắt. Tấn công/cast phải kết thúc channel trước khi thực hiện, không làm hai việc cùng lúc.

### B. Chặn cả nhóm spam công tắc

- Hồi riêng từng người chưa đủ: hai đồng đội có thể dùng liên tiếp để II → I → tắt ngay.
- **Phương án prototype:** mỗi đèn cũng có khoảng nghỉ chung sau một công tắc thành công, dùng cùng tham số thử 35 giây. Trong khoảng nghỉ, công tắc khác bị từ chối và không mất lượt; thắp trực tiếp vẫn hoạt động.
- Khoảng nghỉ thuộc đèn, không xóa khi bị chiếm/tắt; mua lại, chết hoặc đổi người không bỏ qua được. Đây là ràng buộc bổ sung cần đánh giá, chưa phải luật được người dùng khóa.
- Một lần sử dụng áp đúng một hàng trong bảng, không chạy tiếp II → I → tắt → phe mình trong cùng lệnh.

### C. Một đèn chỉ có một người channel ở mỗi thời điểm

- Lệnh tương tác được trọng tài xếp thứ tự; người hợp lệ đầu giữ channel, không cộng thời gian của nhiều người. Đồng đội hoặc địch tới sau phải ngắt người đó bằng gameplay rồi mới tương tác được.
- Nếu cùng thời điểm có công tắc và mốc channel, trọng tài xử lý tuần tự, tính lại từ trạng thái vừa cập nhật; không áp cả hai trên cùng trạng thái cũ. Không tự cho tướng đi xuyên vật cản để tương tác.
- Xử lý hết hạn trước các lệnh/mốc channel tại cùng thời điểm. Kiểm lại sống, tầm, LOS, vòng sáng và quyền channel trước mỗi mốc. Sau mốc 4 giây tự kết thúc channel và giải phóng đèn; giữ nút thêm không giữ quyền hay bắt đầu vòng mới, phải thả rồi tương tác mới.
- Công tắc không tự ngắt người đang thắp; người đó vẫn có thể chiếm khi đủ thời gian. Bảng UI phải phản ánh điều này để tránh hiểu công tắc là CC.
- Channel không tiếp tục khi chết, mất kết nối hoặc rời trận; reconnect không nhận phần channel chưa hoàn tất. Timer đèn và công tắc không reset do reload/restart trọng tài; reset trận xóa sạch dữ liệu vòng trước.

## 5. Vision và phản chế

- Hai cấp dùng cùng bán kính cấu hình; cấp II thêm detection, không tự tăng radius. Đây là giả định prototype cần đo, không phải số được duyệt.
- Cấp I: địch trong bụi không lộ từ đèn, dù đèn đang sáng cạnh bụi. Vision từ một nguồn khác vẫn tuân luật nguồn đó.
- Cấp II: địch trong bụi/tàng hình được lộ và chọn mục tiêu khi ở trong vùng, có LOS; sau tường đặc không lộ. Ra khỏi vùng, đèn tắt/hạ cấp hoặc mất LOS thì hết detection ngay; vision hợp lệ từ nguồn khác vẫn có thể giữ mục tiêu.
- Minimap, model, quyền chọn mục tiêu mới và bot cùng dùng kết quả visibility; không chỉ làm trong suốt model rồi để bot đọc được địch ẩn. Projectile/DoT đã phát hợp lệ và skillshot/AoE trúng địch ẩn giữ contract combat hiện hành; Mạch Đăng không tự đổi luật gây damage hoặc hủy đạn khi mất vision. Bot không nhận vị trí mới của địch ẩn từ callback damage.
- Thông báo đèn/chủ/timer cho phe nào thấy phải theo thông tin hợp lệ. Không phát toàn bản đồ vị trí người thắp hoặc địch tiếp cận qua một thông báo UI.
- Vị trí đèn có ít nhất hai lối tiếp cận thực tế và đường rút; kiểm đường đi, thời gian tới nơi và LOS, không chỉ nhìn ảnh đẹp. Hai đèn thử nghiệm phải cho cả hai phe cơ hội tranh chấp tương đương. Chưa chốt tọa độ/bụi.

## 6. Art, âm thanh và điều khiển

Mạch Đăng là cấu kiện **hợp kim ký ức hình chim thần khép cánh**, phù hợp văn minh triệu năm trong Bible. Cấp I sáng ngực; cấp II mở cánh và phát vòng sóng quan sát. Không dùng đèn lồng fantasy. Sơ đồ user chỉ giải thích một người thắp, một người bảo vệ và hai hướng tấn công; chưa phải bản đồ Boss, bán kính hoặc placement chính thức.

- Phân biệt cấp/tắt/chủ bằng hình và ký hiệu, không chỉ màu. VFX không che tướng, telegraph hoặc tín hiệu trụ.
- Âm ngắn cho bắt đầu, đạt I, đạt II, ngắt, đổi chủ và công tắc thành công; nghe theo vùng/thông tin hợp lệ, không báo địch ẩn từ xa. File âm/âm lượng là asset-spec tiếp theo, chưa tự coi đã có.
- Desktop: giữ tương tác trong tầm. Mobile: nút Giữ thắp có tiến trình 1,2/4 giây, thả nút thì ngắt. Công tắc chọn một đèn hợp lệ trong tầm rồi kích hoạt bằng thao tác riêng, không tự bật khi đi ngang.
- VI–EN: Mạch Đăng / Meridian Beacon; Thắp / Kindle; Công Tắc Mạch Đăng / Beacon Switch; Cấp I / Tier I; Cấp II / Tier II; Đang bị tranh chấp / Contested. Tên EN là đề xuất localization.

## 7. Bot và công cụ đo

Bot chỉ dùng thông tin phe mình biết: được biết người thắp đồng minh; chỉ biết channel, HP và vị trí người thắp địch khi địch đang được nhìn thấy. Chọn thắp I khi cần kiểm đường nhanh; chỉ đầu tư II khi có nguy cơ phục kích, mục tiêu đáng tranh và đồng đội/đường thoát đủ an toàn. Ưu tiên bảo vệ người thắp hoặc ngắt địch khi lợi ích cao hơn farm; không bỏ wave để chạy bật mọi đèn, không rút tuyệt đối khỏi khu đèn.

Tái dùng simulator/profile hiện có cho kinh tế và thời gian di chuyển; thêm ca trạng thái đèn riêng để kiểm timer/ownership, không giả simulator hiện đã mô hình LOS/bụi/tàng hình hoặc AI phối hợp. Không gọi kết quả mô hình là PASS client.

Đo: tỷ lệ channel I/II thành công; lần ngắt/chiếm; thời gian giữ vision; số công tắc thành công/bị từ chối; cơ hội phục kích sau hạ II; lượng farm bỏ; tác động với tướng tàng hình; mức bao phủ và chênh lệch quyền vision giữa phe dẫn/thua. Với giá 180 vàng, đo thời điểm mua, món đồ bị trì hoãn và tỷ lệ sở hữu theo chênh lệch vàng, tách support/carry. Chưa khẳng định giá dễ tiếp cận cho đội thua. So cùng seed/kit/kinh tế với và không có công tắc; chưa đặt ngưỡng PASS cân bằng khi chưa có baseline.

## 8. Giao việc ngắn

| Nhóm | Việc | Điều kiện hoàn thành |
|---|---|---|
| Codex + hội đồng | Chốt đặc tả, phân biệt hướng user và giả định thử | Không còn mâu thuẫn timer/capture/spam; số TBD ghi rõ |
| Savi + Wisp gameplay | Prototype riêng hai đèn, một công cụ; dùng config chung cho số V0.1 | Không bật mặc định trong bản đang ship; sáu hành vi user yêu cầu chạy đúng |
| Wisp map/art | Hai placement thử, chim hợp kim; tái dùng map có sẵn | Hai đường tiếp cận, LOS và hình cấp đọc được; không polish toàn map |
| Codex QA + Wisp AI/balance | Kiểm client hai phe và bot; so dữ liệu thử | Báo đúng nguồn/helper/client; có trace, seed, build và lỗi còn mở |

**Sáu ca chính:** thắp I; giữ tới II; ngắt trước/sau I; reveal bụi/tàng hình có/không tường; cướp đèn; bot bảo vệ/ngắt/đánh giá I–II.

**Ca bổ sung bắt buộc:** đủ năm hàng bảng công tắc; dùng sai lãnh thổ/tầm; hai người spam; thắp lại sau downgrade không gia hạn; channel đồng thời; chết/reload/restart/reset; tướng tàng hình ra/vào vùng; desktop/mobile giữ-thả và targeting/minimap hai client.

## 9. Trạng thái bàn giao

Hội đồng đã đọc bản thực tế: `moba_bot_rules_review` (gameplay/vision), `mach_dang_economy` (kinh tế/chống snowball), `mach_dang_qa` (AI/QA). Codex tổng hợp và sửa các lỗ deadline, quyền channel, spam, lượt công cụ và thông tin ẩn. Người thẩm định độc lập `mach_dang_independent_appraisal` không tham gia viết bản: **đủ bàn giao prototype nhỏ, không có blocker tài liệu mới**; đây là review docs, chưa PASS client.

Trước khi chạy, Savi điền config tọa độ/lãnh thổ/bán kính tương tác/bán kính vision/LOS và mapping những trạng thái khống chế cứng hiện có sẽ ngắt channel. Hai đèn mẫu phải có ít nhất một đèn trong lãnh thổ phòng thủ để thử công tắc; không đặt cả hai trung lập rồi báo đã kiểm công tắc. Không cần mở thêm vòng tài liệu để chọn những giá trị thử này; ghi chúng là EXPERIMENTAL trong report, không đổi số ship.

Bản local, chưa push remote. Hướng Mạch Đăng thay ý tưởng Mạch Soi chung ở doc60; Cộng Hưởng Mạch/Nhịp Mạch vẫn là đề xuất khác, không tự bật. Prototype này không tự mở rừng/Boss/5v5 cho Slice. Kết luận: đủ cơ sở làm thử có giới hạn sau khi Savi nhận đặc tả; **chưa chứng minh cân bằng hoặc production-ready**.
