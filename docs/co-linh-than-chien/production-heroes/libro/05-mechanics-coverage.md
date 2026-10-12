# 05 · Mechanics Coverage — #28 Libro (Sổ Nợ Nghiệp Báo)

**Trạng thái:** `MECHANICS_VERIFIED / SIMULATOR_SUPPORTED`  
**Khóa định danh:** `#28 / libro`  
**Nguồn dữ liệu:** `tools/sim/candidates/libro.yml` & `tools/test/wave4-gameplay-toys.test.mjs`

---

## 1. Bảng Ma Trận Phủ Cơ Chế (Feature Coverage Matrix)

Tuân thủ nghiêm ngặt chuẩn Tài liệu 105 (§1 & §S3): Mọi tính năng phải được ánh xạ rõ ràng tới trường YAML, hàm thực thi simulator engine, trạng thái hỗ trợ thực tế và mã kiểm thử. Bình luận (comments) trong YAML không được coi là cơ chế đã triển khai!

| Tính năng cốt lõi / Kỹ năng | Trường dữ liệu trong YAML Candidate | Hàm / Logic thực thi trong Engine Simulator | Trạng thái Simulator | Trạng thái Runtime Spawn | Bằng chứng Kiểm thử (Automated Tests) |
|---|---|---|---|---|---|
| **Chỉ số căn bản & Tăng trưởng** | `stats: { hp: 630, resource: 350, ... }`<br>`growth: { hp: 86, ... }` | `heroUnit("libro")` nạp qua `loadCandidates()` | `SUPPORTED` | `NOT_TESTED` | Test nạp và khởi tạo đơn vị trong `wave4-gameplay-toys.test.mjs` |
| **Đánh thường Phép Tầm xa (LMB)** | `lmb: { aim: projectile, range: 6.0, damageType: magic, ap: 0.2 }` | `actAttack()` trong `engine.mjs` bắn đạn tầm xa $6.0\text{m}$, tính sát thương phép | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tầm đánh xa và tỷ lệ AP qua simulator loop |
| **Nội tại Sổ Nợ Hoãn Sát Thương (Debt Ledger)** | `passive: { type: debt_ledger, debtPostponeRatio: 0.70, debtWindow: 2.5, debtPaybackDur: 3.0 }` | `engine.mjs` xử lý trong `hurt()`: hoãn 70% sát thương vào `u.debtPool`, chỉ trừ 30% máu thực, gọi `proc("passive:debt_postponed")` | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>`Toy 3: Libro debt ledger postponement & gradual payback`<br>Khẳng định `immediateDmg < 50` với cú đánh 100 dmg và `u.debtPool > 0` |
| **Cơ Chế Trả Nợ Đáo Hạn (Debt Payback)** | `debtPaybackDur: 3.0` | `tickDots()` trong `engine.mjs`: khi hết thời gian `debtUntil`, nợ trong `debtPool` chuyển thành DoT trừ dần vào máu | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs` lines 92–100 kiểm chứng máu bị trừ dần sau khi nợ đáo hạn |
| **Q — Trang Sử Trừng Phạt** | `q: { aim: skillshot, width: 1.4, speed: 28, range: 8.5, damage: { ... }, effects: [{ slow: 0.25 }] }` | `cast()` -> `applyEffects()` tính sát thương phép và làm chậm mục tiêu | `SUPPORTED` | `NOT_TESTED` | Khẳng định đạn bay nhanh và gán cờ `slow` trên mục tiêu |
| **W — Sổ Nợ Ký Ức** *(Legacy RMB -> W)* | `rmb: { aim: self, shield: { radius: 6.0, allies: true }, heal: { radius: 6.0, allies: true } }` | `cast()` mở Sổ Nợ, thiết lập `u.debtUntil`, `u.debtRatio = 0.70`, cấp khiên và hồi máu cho toàn đội | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs` lines 74–82 kiểm chứng kích hoạt `proc("passive:debt_ledger")` |
| **E — Ân Hạn Nghiệp Báo** | `e: { aim: single_target, range: 7.5, heal: { base: [50..170], ap: 0.35, ally: true } }` | `cast()` đơn mục tiêu, gọi `heal()` ưu tiên khấu trừ nợ trong `debtPool` và tăng tốc chạy | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng hồi máu đơn mục tiêu và trừ nợ treo qua simulator |
| **R — Chung Quyết Phán Thư** | `r: { aim: area, radius: 6.5, delay: 0.2, windup: 0.25, shield: { ... }, heal: { ... }, effects: [{ slow: 0.35 }] }` | `cast()` đại kết giới diện rộng, cấp đại khiên, hồi máu lớn, làm chậm kẻ địch và áp dụng hoãn nợ diện rộng | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tác động bảo vệ toàn đội trong giả lập 5v5 |
| **Universal Dash (D)** | Chuẩn hóa hệ thống (Doc 91) | `dash()` phổ quát toàn game, tiêu hao stamina | `SUPPORTED` | `NOT_TESTED` | Module điều khiển chung toàn game |
| **Tương tác Bot AI** | `builds: [chuong_may, dang_hoi_am, ...]` | Logic bot hỗ trợ ưu tiên bật W khi đồng minh bị dồn sát thương và dùng E cứu mục tiêu có nợ cao nhất | `PARTIAL` | `NOT_TESTED` | Bot chạy ổn định trong kịch bản Balance Lab 200 matches |

---

## 2. Chi Tiết Triển Khai Trong Simulator Engine (`tools/sim/engine.mjs`)

### 2.1. Logic Hoãn Sát Thương Độc Quyền Trong `hurt()`
Đoạn mã vận hành độc quyền của Libro trong `tools/sim/engine.mjs`:
```javascript
// Libro: Hoãn sát thương thành Nợ Treo
if (target.debtUntil && target.debtUntil > W.t && target.debtRatio) {
  const postponed = amt * target.debtRatio;
  target.debtPool = (target.debtPool ?? 0) + postponed;
  amt = amt * (1 - target.debtRatio);
  proc(target, "passive:debt_postponed");
}
```

### 2.2. Kiểm Thử Khẳng Định Trong `wave4-gameplay-toys.test.mjs`
Đoạn kiểm thử Toy 3 xác nhận chuỗi thao tác:
- Mở sổ nợ: `expect(libro.debtRatio).toBe(0.70);`
- Hứng 100 sát thương: `expect(immediateDmg).toBeLessThan(50);`
- Tích lũy nợ: `expect(libro.debtPool).toBeGreaterThan(0);`
- Đáo hạn trừ dần qua DoT: `expect(libro.hp).toBeLessThan(hpAtMaturity);`
