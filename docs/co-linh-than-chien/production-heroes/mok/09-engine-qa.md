# 09 · Engine QA — #37 Mok (Trinh Sát Cổ Đăng Tác Chiến)

**Trạng thái:** `QA_SPEC_LOCKED / TEST_PLAN_READY`  
**Khóa định danh:** `#37 / mok`  
**Tuân thủ tiêu chuẩn:** [Tài liệu 11 (Acceptance Bàn Giao)](../../11-acceptance-ban-giao.md), [Tài liệu 10 (Đối Soát Runtime)](../../10-doi-soat-runtime.md) & [Tài liệu 105 (Hero Factory Multi-Agent Workflow)](../../105-hero-factory-multi-agent-workflow.md)

---

## 1. Tóm Tắt Hiện Trạng Nghiệm Thu (Verification Status Summary)

Tuân thủ quy chế kỹ thuật trung thực của dự án: Không ghi `PASS_ENGINE` khống khi chưa có binary Spawn runtime kết nối trực tiếp.

| Hạng mục kiểm thử | Môi trường kiểm thử | Trạng thái hiện tại | Bằng chứng / File log đối soát |
|---|---|---|---|
| **Cơ chế Gameplay Toy 2 (Cắm Đèn Tầm Nhìn & Tiêu Thụ Đèn)** | Balance Lab Simulator Engine | **`PASS_SIMULATOR`** | File `tools/test/wave4-gameplay-toys.test.mjs` chạy Bun test: 7/7 Toy PASS (Bao gồm Toy 2 của Mok). |
| **Cân bằng số liệu & Độ dài trận đấu** | Balance Lab 200 Matches Sim | **`PASS_SIMULATOR (RED=0)`** | `tools/sim/candidates/mok.yml` chạy qua `production-26.mjs` đạt tỷ lệ hỗ trợ và sống sót đúng chuẩn Support Trinh Sát. |
| **Tương tác hình học & Hitbox thực chiến** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ kết nối binary Spawn engine và import model/VFX. |
| **Độ mượt hoạt ảnh & Chuyển động người máy gỗ** | Spawn Runtime Client | **`NOT_TESTED`** | Chờ rig và animation clip import theo Doc 28. |
| **Âm thanh gõ gỗ & Chuông nổ huỳnh quang** | Spawn Runtime Match | **`NOT_TESTED`** | Chờ tích hợp ngân hàng âm thanh Wwise/FMOD. |

---

## 2. Kịch Bản Kiểm Thử Thực Chiến Chi Tiết (Spawn Runtime Test Scenarios)

Khi binary game engine Spawn được kết nối, QA Tester thực hiện tuần tự 8 kịch bản kiểm thử sau:

### Kịch bản 1: Kiểm Thử Đòn Đánh Thường & Tầm Bắn (Basic Attack Test)
- **Thiết lập:** Đặt hình nộm đối phương ở cự ly $5.8\text{m}$. Nhấp chuột trái tấn công.
- **Tiêu chí PASS:**
  1. Hạt phấn huỳnh quang bắn ra sau $0.15\text{s}$ windup, bay với tốc độ $22\text{m/s}$.
  2. Va chạm trúng mục tiêu nảy sát thương vật lý ($100\%\text{AD}$); không tốn mana.
- **Tiêu chí FAIL:** Đạn bay lệch hướng, không gây sát thương, hoặc tiêu hao mana.

### Kịch bản 2: Kiểm Thử Cắm Cổ Đăng Q & Xua Tan Sương Mù (Lantern Fog of War Reveal Test)
- **Thiết lập:** Mok đứng ngoài bụi rậm bị che bởi sương mù chiến tranh. Bấm Q ném đèn vào giữa bụi rậm.
- **Tiêu chí PASS:**
  1. Đèn bay theo quỹ đạo parabol và cắm vững xuống đất tại cự ly $8.0\text{m}$.
  2. Sương mù chiến tranh trong bán kính $6.0\text{m}$ quanh đèn tan biến ngay lập tức; toàn bộ bản đồ khu vực đó hiển thị rõ ràng trên minimap.
  3. Đèn duy trì ánh sáng trong đúng $8.0\text{s}$ ($\pm 0.1\text{s}$) rồi biến mất nếu không bị tiêu thụ.
- **Tiêu chí FAIL:** Không xua tan sương mù; đèn cắm sai vị trí; hoặc biến mất quá sớm (<7s).

### Kịch bản 3: Kiểm Thử Phát Hiện Kẻ Địch Tàng Hình (Stealth Detection Test)
- **Thiết lập:** Cho 1 tướng tàng hình (Kiko đang kích hoạt ngụy trang) đứng trong bụi rậm. Mok ném Cổ Đăng Q vào bụi.
- **Tiêu chí PASS:**
  1. Kiko bị lộ diện hoàn toàn (True Sight Outline màu vàng hổ phách) cho toàn đội Mok nhìn thấy và có thể chọn làm mục tiêu đánh thường/kỹ năng.
- **Tiêu chí FAIL:** Kiko vẫn vô hình; không phát hiện được mục tiêu trong tầm 6.0m.

### Kịch bản 4: Kiểm Thử Đối Thủ Phá Đèn (Lantern Destruction Test)
- **Thiết lập:** Mok cắm đèn. Tướng địch (Bạch Diện) bước lại gần và đánh thường vào ngọn đèn.
- **Tiêu chí PASS:**
  1. Đòn đánh 1: Đèn mất 1 vạch máu, rung lắc nhẹ.
  2. Đòn đánh 2: Đèn vỡ tan thành các mảnh gỗ vụn, vùng sáng biến mất ngay lập tức; Mok mất tầm nhìn.
- **Tiêu chí FAIL:** Đèn không thể bị đánh; hoặc bị phá hủy bởi kỹ năng AoE ngẫu nhiên.

### Kịch bản 5: Kiểm Thử Tiêu Thụ Đèn Kích Nổ W (Lantern Detonation & Slow Test)
- **Thiết lập:** Cắm Cổ Đăng. Cho 1 tướng địch đứng cách đèn $3.0\text{m}$. Mok đứng cách đó $7.0\text{m}$ và bấm phím W.
- **Tiêu chí PASS:**
  1. Mok phát động W, Cổ Đăng trên sân lập tức phát nổ sóng huỳnh quang.
  2. Tướng địch đứng gần đèn bị làm chậm đúng $30\%$ trong $1.5\text{s}$.
  3. Cổ Đăng biến mất hoàn toàn ngay sau vụ nổ (`proc("passive:lantern_detonated")`).
- **Tiêu chí FAIL:** Đèn không nổ; không làm chậm địch; hoặc đèn vẫn còn tồn tại sau khi bấm W.

### Kịch bản 6: Kiểm Thử Khiên & Hồi Phục Diện Rộng W (PBAoE Dual Shield & Heal Test)
- **Thiết lập:** Mok đứng cạnh 2 tướng đồng minh bị rút máu. Bấm phím W.
- **Tiêu chí PASS:**
  1. Kỹ năng kích hoạt tức thì ($0\text{s}$ windup), Mok không bị dừng bước chạy.
  2. Cả Mok và 2 đồng minh lập tức nhận khiên ($65 - 185$) trong 3.0s và hồi máu ($45 - 145$).
  3. Giá trị hồi máu ghi nhận vào `m.allyHealed`; khiên ghi nhận độc lập vào `m.shieldGiven`.
- **Tiêu chí FAIL:** Không hồi máu; hoặc chỉ buff cho bản thân mà bỏ quên đồng minh.

### Kịch bản 7: Kiểm Thử Trói Chân Rễ Cây E (Root Skillshot E Test)
- **Thiết lập:** Nhắm bắn E vào hình nộm kẻ địch ở cự ly $6.5\text{m}$.
- **Tiêu chí PASS:**
  1. Rễ cây xới đất bay với tốc độ $24\text{m/s}$.
  2. Chạm hình nộm nảy sát thương phép và giữ chặt hình nộm đứng yên (Root) đúng $1.0\text{s}$.
- **Tiêu chí FAIL:** Đạn bay lệch cự ly; hoặc không trói chân mục tiêu.

### Kịch bản 8: Kiểm Thử Đại Trận R Chuẩn Doc 79 (Grand Ultimate R Test)
- **Thiết lập:** Mok bấm R giữa giao tranh tổng 5v5.
- **Tiêu chí PASS:**
  1. **Pha 1 & 2 (0.0s - 0.25s):** Gập người nạp năng lượng trong $0.25\text{s}$ rồi phóng cột sáng lên trời.
  2. **Pha 3 (0.25s - 0.5s):** Sóng huỳnh quang dội xuống, toàn đội nhận hồi máu lớn ($120 - 260 + 0.4\text{AP}$) và khiên ($80 - 180$) trong $3.5\text{s}$.
  3. **Pha 4 (0.5s - 3.5s):** Thảm cỏ huỳnh quang $6.5\text{m}$ duy trì làm chậm $35\%$ kẻ địch và soi sáng liên tục.
- **Tiêu chí FAIL:** Bỏ qua giai đoạn niệm; không hồi máu/khiên; hoặc không làm chậm kẻ địch.
