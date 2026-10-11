# 55 · Thư viện VFX: tướng mới chỉ cần 1 dòng dữ liệu

Mục tiêu (@lukasai #47482): 30 tướng vẫn đẹp và rõ, không cần nhắc lại, không cần gửi lại ảnh. Savi đọc info tướng trong TODO là đủ để sáng tạo.

## 1. Bốn lớp, mỗi lớp một chủ
| Lớp | File | Ai sửa |
|---|---|---|
| Ngôn ngữ chung (bảng màu theo hệ, cấp, hình dáng, motif) | `scripts/lib/vfx/look.js` | chỉ khi thêm hệ/motif mới |
| Hiệu ứng gốc (4 file) | `scripts/effects/vfx-missile / vfx-impact / vfx-slash / vfx-status .fx.js` | hiếm, có review |
| Dòng của tướng | `scripts/lib/data/vfx-heroes.yml` | **mỗi tướng mới: 1 dòng** |
| Trang trí riêng (âm thanh, bụi, đá, lửa riêng) | `scripts/lib/skillfx.js` KIT | tuỳ chọn, chạy BÊN CẠNH lớp đọc được, không thay nó |

Lớp đọc được (thân đạn, vệt chém, va chạm, viền vùng, CC trên thân) luôn do thư viện vẽ → mọi tướng cùng một ngữ pháp như LoL: nhìn hình là biết né gì, trúng gì.

## 2. Số thật quyết định hình
- Thân đạn = `width` của chiêu trong `heroes.yml` (thứ bạn né = thứ bạn thấy).
- Vệt chém = `lmb.range` (+0.3 m) → kiếm ngắn chém ngắn, qua dài chém dài; hết "cầm kiếm chém quá xa".
- Vùng = `radius`; chiêu trỏ mục tiêu = va chạm cỡ 1.2 tại mục tiêu.
- Cấp: đánh thường 1 · chiêu 2 · tuyệt 3 (độ sáng, số hạt, ánh đèn tăng theo cấp).

## 3. Hiệu ứng khống chế (gắn trong `combat.js`, mọi nguồn đều dùng)
| CC | Hình | Vị trí |
|---|---|---|
| choáng (stun) | 3 sao vàng xoay + vòng | trên đầu |
| khoá/trói (root) | phù văn đất + 4 gai ngọc | dưới chân |
| chậm (slow) | vòng băng xanh + giọt rơi + sương | dưới chân |
| mê hoặc (charm) | vòng hồng + cánh hoa bay lên | trên đầu |
| sốc/hất (knock) | bụi + vòng sóng trắng 1 nhịp | dưới chân |
Sống đúng bằng thời gian hiệu ứng. Trên đầu = mất điều khiển; dưới chân = bị giữ/chậm.

## 4. Quy trình tướng mới (đọc từ TODO)
1. Đọc TODO tướng: hệ (lửa, đá, trăng…), vũ khí, vai trò, chất liệu đặc trưng.
2. Chọn `el` (bảng màu) + `motif` (thứ nó rơi ra: than, cánh hoa, mảnh đá…). Hệ mới → thêm 1 bảng màu vào `look.js`.
3. `basic`: cận chiến → `slash: slash|sweep|thrust`; đánh xa → `shape: comet|arrow|lance|shard|bolt` + `size`.
4. `skills`: chỉ ghi ngoại lệ theo slot (hình đạn khác, đổi hệ cho tuyệt).
5. (Tuỳ chọn) thêm trang trí riêng vào KIT trong `skillfx.js`.
6. Kiểm: quay trong trận ở góc camera thật; chưa xem → ghi NOT RUN.

Ví dụ một dòng:
```yaml
hoa_tuy: { el: hoa, motif: ember, basic: { shape: comet, size: 0.45 }, skills: { rmb: { shape: shard }, r: { el: dung } } }
```
