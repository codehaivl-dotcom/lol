# Brief review độc lập: Tạo hình 18 và Cửu Mạch

**Nguồn bắt đầu:** [doc 83](83-goi-review-tao-hinh-18-cuu-mach.md).  
**Mục đích:** có một review độc lập, trả về quyết định giao việc được; không biến proposal thành nội dung runtime.

## A. Tạo hình 18 tướng

Đọc [DUYET-TAO-HINH-18](../../DUYET-TAO-HINH-18.md), rồi đối chiếu [thư viện tạo hình](74-thu-vien-tao-hinh.md), [prototype](75-prototype-tao-hinh.md), [chuẩn hình học skill](76-chuan-hinh-hoc-skill.md), [audit skill](77-audit-vfx-skill-2026-10-10.md)–[78](78-audit-skill-2026-10-11.md), [chuẩn Ultimate](79-chuan-ultimate.md) và `tools/sim/candidates/`.

Chấm từng tướng theo năm điểm:

1. Có khớp bible: văn minh ký ức cổ xuất hiện tại Việt Nam hiện đại.
2. Có silhouette và vai trò đọc được từ camera MOBA.
3. Skill phải đổi có vẫn giữ được role/fantasy tướng.
4. Có nguy cơ giống IP cụ thể hoặc dùng biểu tượng văn hóa hời hợt.
5. Có thực tế với rig, hitbox, VFX và ngân sách asset.

**Kết quả cần trả về:** phương án chính, fallback hoặc yêu cầu phương án mới; kèm skill phải viết lại trước art production. Sấm Kha, Cốt Bện và Mặc Liên chỉ là nhóm khởi đầu ít rủi ro theo tài liệu hiện có, chưa phải USER LOCK.

## B. Cửu Mạch 5v5

Đọc [gate Cửu Mạch](80-cuu-mach-gate.md), [manifest](data/cuu-mach-manifest.yml), [layout nguồn](07-layout-ban-do-v1.md), [closeout Mạch Giữa](15-todo-thu-tran-1v1.md), [handoff 5v5](27-handoff-map-5v5-ba-duong.md), [Hải Tâm](81-map-hai-tam.md), [spec boss](82-spec-asset-thuong-luong.md) và [ngân sách tải](57-no-ton-dong.md).

Năm việc review:

1. Gate Slice 1v1 có đủ bằng chứng engine trước khi mở Cửu Mạch không.
2. Mỗi ô `TBD` trong manifest có owner và thứ tự chốt rõ chưa.
3. Route `sanh`/`main` đã data-driven đủ để thêm map 5v5 chưa.
4. Camera và minimap có quyết định rõ cho hai phe chưa.
5. Art shell không collision và ngân sách tải có bảo vệ gameplay/performance chưa.

Không tự chốt tọa độ, số trụ, chỉ số boss, camp hoặc spawn khi chưa có kết quả mô phỏng và test engine.

## Mẫu phản hồi

```md
## Tạo hình 18
| Tướng | Quyết định | Cần sửa trước production | Rủi ro |

## Cửu Mạch
| Gate | Đủ/chưa đủ | Câu phải sửa | Owner/bằng chứng cần có |

## Ba việc ưu tiên
1. ...
2. ...
3. ...
```

## Trạng thái

- Tạo hình 18, kit candidate và Cửu Mạch là **roadmap/proposal**, chưa là asset hay gameplay runtime.
- Slice Mạch Giữa 1v1 phải được nghiệm thu trước khi dựng greybox Cửu Mạch.
- Các file `scripts/` chỉ cho biết convention/consumer hiện tại, không chứng minh 18 tướng hoặc map 5v5 đã triển khai.
