# Gói review: Tạo hình 18 và Cửu Mạch

**Mục đích:** giao một agent độc lập review hai nhánh roadmap mà không hiểu nhầm proposal là phần đã chạy trong game.

## Đọc theo thứ tự

1. [Duyệt tạo hình 18](../../DUYET-TAO-HINH-18.md)
2. [Gate Cửu Mạch 5v5](80-cuu-mach-gate.md)
3. Tạo hình: [thư viện](74-thu-vien-tao-hinh.md), [prototype](75-prototype-tao-hinh.md), [chuẩn hình học skill](76-chuan-hinh-hoc-skill.md), [chuẩn ultimate](79-chuan-ultimate.md), audit 77–78 và `tools/sim/candidates/`.
4. Cửu Mạch: [manifest](data/cuu-mach-manifest.yml), [layout nguồn](07-layout-ban-do-v1.md), [closeout Mạch Giữa](15-todo-thu-tran-1v1.md), [handoff 5v5](27-handoff-map-5v5-ba-duong.md), [Hải Tâm](81-map-hai-tam.md), [spec boss](82-spec-asset-thuong-luong.md) và [ngân sách tải](57-no-ton-dong.md).

## Yêu cầu review

- Với mỗi trong 18 tướng: chọn phương án chính, fallback hoặc yêu cầu phương án mới; nêu skill phải viết lại trước art production và rủi ro silhouette/IP/rig/hitbox.
- Với Cửu Mạch: đánh giá sáu gate, owner của mỗi `TBD`, và thứ tự đóng gate. Không tự chốt tọa độ, chỉ số boss, camp hay số trụ khi chưa có mô phỏng và evidence engine.

## Trạng thái đúng

- 18 tạo hình, kit candidate và Cửu Mạch là **roadmap/proposal**; chưa phải asset hay gameplay runtime.
- Mạch Giữa 1v1 hiện hành vẫn là Slice cần nghiệm thu trước khi mở greybox Cửu Mạch.
- Dữ liệu `scripts/` chỉ để hiểu convention/consumer hiện tại, không chứng minh 18 tướng hay map 5v5 đã được triển khai.
