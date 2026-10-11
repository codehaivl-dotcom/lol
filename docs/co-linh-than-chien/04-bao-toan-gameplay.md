# Nguyên tắc thiết kế, tham khảo và cân bằng

**Quyết định gốc (2026-10-07, @lukasai):** Cổ Linh Thần Chiến là **game mới hoàn toàn**. Tướng mới, tạo hình mới, kit mới. Mọi chỉ số do dự án tự tune và được cân bằng bằng mô phỏng. Data của game khác chỉ là **gợi ý**.

## 1. Phần chốt ở tầng sản phẩm
1. MOBA hành động 3D 5v5, camera trận khoá kiểu AOV/LoL (nhìn xuống, yaw cố định theo phe, bám tướng, lăn chuột zoom), ngắm theo con trỏ; số chuẩn ở `scripts/lib/data/camera.yml`. Quyết định @lukasai #7781 (2026-10-07) thay luật “camera qua vai” cũ (supersedes: “camera qua vai, không isometric/top-down”).
2. Ba lane, rừng, công trình, mục tiêu trung lập. Thắng khi phá Tâm Mạch của đối phương.
3. Bố cục phím: LMB, Q, RMB, E, R, né, Hồi Tưởng, shop, Di Vật.
4. VI–EN cho toàn bộ text, lồng tiếng VI (xem 05).

Chỉ có bốn điều trên là cố định. Mọi thứ khác, gồm map, chỉ số, kit, objective và kinh tế, là thiết kế của dự án và được phép thay đổi theo quy trình ở §4.

## 2. Vai trò của data tham khảo
- `data/legacy-source/` và `data/legacy-kits-v1.json` **chỉ dùng để tham khảo**: vai trò tướng, thang độ lớn của số, nhịp trận. Không import vào runtime, không ship, không dùng làm đích parity.
- Không dùng lại ID, tên, câu chữ, asset `/cdn/`, model hay âm thanh của game khác.
- Một con số mượn từ tham khảo chỉ thành số của game khi đi qua §3 và có dòng trong data file của Cổ Linh.

## 3. Nguồn sự thật và cân bằng
- **Canonical:** `scripts/lib/data/*.yml` của chính game này (heroes, objectives, economy, structures). Mỗi số tuned nằm ở đúng một nơi. Code và docs đọc từ đó, không chép lại.
- **Mô phỏng cân bằng:** một job headless chạy trận giả lập (1v1 từng cặp tướng, giao tranh 5v5 ngẫu nhiên, nhịp kinh tế và objective) trên chính data này rồi xuất bảng chỉ số. Ngưỡng V1 (duyệt 2026-10-07):
  - tỉ lệ thắng 1v1 mỗi tướng nằm trong 45–55% tính trung bình mọi đối thủ cùng vai trò;
  - không cặp đấu nào vượt 70/30;
  - thời gian hạ gục (TTK) mỗi vai trò nằm trong khung riêng, ví dụ sát thủ hạ xạ thủ trong 1,5–3 s (ngưỡng phụ, chưa đo: `duel.mjs` chưa xuất TTK);
  - trận mô phỏng 5v5 kết thúc trong 20–35 phút.
- **Thay đổi số:** mỗi lần đổi tạo một dòng trong [`balance-log.md`](balance-log.md) gồm id, field, cũ, mới, lý do, kết quả mô phỏng trước/sau và phiên bản. Baseline là **bản trước của chính game**, không phải game tham khảo.

## 4. ID
ID của Cổ Linh là ASCII không dấu, đặt theo tên mới, ví dụ `moc_lam`, `kha_tan`, `hoa_tuy`. ID một khi đã ship thì không đổi, không tái sử dụng. Tên hiển thị là lớp localization tách rời (09).

## 5. Không cho phép
- Không đổi hitbox hay tầm đánh bằng scale model hoặc VFX. Tầm đánh là số trong data.
- Không có hai bản sao cùng một số đang active.
- Không ghi "đã cân bằng" khi chưa chạy mô phỏng và chưa lưu kết quả.
