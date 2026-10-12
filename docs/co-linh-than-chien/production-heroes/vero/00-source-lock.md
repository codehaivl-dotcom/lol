# 00 · Source Lock — #03 Vero (Vết Kiếm / Chém Trễ Vết Nứt Thời Gian)

**Trạng thái:** `LOCKED_CANON / OWNER_APPROVED`  
**Khóa định danh:**
- `researchId`: `#03`
- `runtimeId`: `vero`
- `displayName`: `Vero`
- `productionWave`: `Wave 2 (Competitive Core & Specialist Mechanics)`

---

## 1. Nguồn Gốc Concept Canon & Quyết Định Phê Duyệt

| Tài liệu nguồn | Phần trích dẫn chính xác | Nội dung đã khóa |
|---|---|---|
| [104 — Master Plan](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) | §1 Mục 3 & §4 Wave 2 | Cấp mã nghiên cứu độc bản `#03`, runtime `vero`, vai trò Sát thủ (Assassin / Mage), Core toy: Vết chém thời gian trễ (Delayed Echo Slice). |
| [100 — Rivalry Audit](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/100-roster-v5-round4-selection-rivalry-audit.md) | §3 Mục 6 (Vết Kiếm / Vero #03) | Sát thủ dồn sát thương trễ có tính toán kỷ luật cao, không dựa vào tàng hình may rủi. Chém để lại các vết nứt thời gian, 2.5s sau tự phát nổ gây 30% tổng sát thương đã tích lũy. Nạn nhân có đồng hồ đếm ngược rõ ràng trên đầu để bấm khiên/hồi máu tự cứu; dồn sát thương hạ gục Vero để giảm áp lực. |
| [102 — Beginner Shortlist](file:///d:/Project/Test/24tuong/docs/co-linh-than-chien/102-roster-v5-beginner-concept-shortlist.md) | §1.1 Danh mục Strong Keep (10) | Giữ vững vị trí trong top 10 ý tưởng xuất sắc nhất toàn dự án (Strong Keep); xác nhận tính khả thi cơ chế delayed burst độc bản. |
| [Candidate YAML](file:///d:/Project/Test/24tuong/tools/sim/candidates/vero.yml) | `tools/sim/candidates/vero.yml` | Thông số nền tảng, passive `delayed_echo` (echoDelay: 2.5s, echoRatio: 0.30), Q lướt chém xuyên mục tiêu để lại vết nứt, W (rmb legacy) Thời Không Chi Khiên, E xoay kiếm 360 độ làm chậm, R Vạn Kiếm Quy Thời khóa mục tiêu chém 3 hit làm choáng và lập tức kích nổ vết chém trễ. |
| [Engine Toy Test](file:///d:/Project/Test/24tuong/tools/test/wave2-gameplay-toys.test.mjs) | `test("Toy 5: Vero delayed echo slice...")` | Kiểm chứng thành công cơ chế tích lũy sát thương 30%, thời gian đếm trễ 2.5s và kích nổ tự động gây sát thương phép trên simulator engine (`engine.mjs`). |

---

## 2. Các Yếu Tố Bất Biến (Unchanged Canon)

1. **Vũ khí độc bản:** Trường kiếm Tinh Thạch Thời Không (Silver Chrono-Crystal Blade) — lưỡi kiếm thon dài rèn từ tinh thể thạch anh trắng bạc phát quang lam - tím thời gian.
2. **Cơ chế cốt lõi (Delayed Echo):** Đòn đánh thường và kỹ năng của Vero khi gây sát thương lên tướng địch sẽ găm một "Vết Nứt Thời Gian" (Chrono-Rift). Vết nứt ghi nhận và tích lũy 30% toàn bộ sát thương mà Vero gây ra lên nạn nhân trong 2.5 giây. Sau đúng 2.5 giây, vết nứt tự động phát nổ (Echo Pop) gây lượng sát thương đó thành sát thương phép.
3. **Minh bạch thị giác nạn nhân (Victim Transparency & Fairness):** Khi bị găm vết nứt, trên đầu nạn nhân BẮT BUỘC hiển thị đồng hồ đếm ngược tròn phân đoạn (Radial Countdown Ticker) 2.5s với độ tương phản cao, kèm âm thanh đếm nhịp "tíc tắc... keng" rõ rệt để đối thủ có đủ thời gian phản ứng (bật khiên, hồi máu, bấm Dash né tránh khỏi tầm chiêu R, hoặc quay lại dồn sát thương kết liễu Vero).
4. **Cơ chế kích nổ chủ động bằng Ultimate (R):** Chiêu cuối R "Vạn Kiếm Quy Thời" khi trúng đích không chỉ gây sát thương và làm choáng 0.8s mà còn CƯỠNG BỨC KÍCH NỔ LẬP TỨC toàn bộ lượng sát thương đang tích trong Vết Nứt Thời Gian mà không cần chờ hết 2.5s.
5. **Input Contract chuẩn hóa (Doc 91):** Đánh thường tách riêng; kỹ năng gán 4 slot chuẩn **Q / W / E / R**; phím **D** là Universal Dash. Không dùng LMB/RMB làm tên kỹ năng.

---

## 3. Lịch Sử Phiên Bản & Đơn Vị Phê Duyệt

- **2026-10-10:** Khởi tạo ý tưởng tại Vòng 4 Audit (Tài liệu 100 §3.6).
- **2026-10-11:** Phê duyệt bảo lưu nhóm Strong Keep tại Tài liệu 102.
- **2026-10-12:** Đưa vào Master Plan Wave 2 tại Tài liệu 104; hoàn thiện candidate YAML `tools/sim/candidates/vero.yml`; kiểm chứng engine xanh 100% trong `wave2-gameplay-toys.test.mjs`.
- **Thẩm quyền:** Creator & Lead Game Designer đã ký duyệt canon lock.
