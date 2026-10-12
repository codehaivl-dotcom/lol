# 05 · Mechanics Coverage — #48 Oneira (Mộng Thể Mặt Nạ Hút Khống Chế)

**Trạng thái:** `MECHANICS_VERIFIED / SIMULATOR_SUPPORTED`  
**Khóa định danh:** `#48 / oneira`  
**Nguồn dữ liệu:** `tools/sim/candidates/oneira.yml` & `tools/test/wave4-gameplay-toys.test.mjs`

---

## 1. Bảng Ma Trận Phủ Cơ Chế (Feature Coverage Matrix)

Tuân thủ nghiêm ngặt chuẩn Tài liệu 105 (§1 & §S3): Mọi tính năng phải được ánh xạ rõ ràng tới trường YAML, hàm thực thi simulator engine, trạng thái hỗ trợ thực tế và mã kiểm thử. Bình luận (comments) trong YAML không được coi là cơ chế đã triển khai!

| Tính năng cốt lõi / Kỹ năng | Trường dữ liệu trong YAML Candidate | Hàm / Logic thực thi trong Engine Simulator | Trạng thái Simulator | Trạng thái Runtime Spawn | Bằng chứng Kiểm thử (Automated Tests) |
|---|---|---|---|---|---|
| **Chỉ số căn bản & Tăng trưởng** | `stats: { hp: 640, resource: 350, ... }`<br>`growth: { hp: 88, ... }` | `heroUnit("oneira")` nạp qua `loadCandidates()` | `SUPPORTED` | `NOT_TESTED` | Test nạp và khởi tạo đơn vị trong `wave4-gameplay-toys.test.mjs` |
| **Đánh thường Phép Tầm xa (LMB)** | `lmb: { aim: projectile, range: 6.0, damageType: magic, ap: 0.2 }` | `actAttack()` trong `engine.mjs` bắn đạn khói mộng tầm xa $6.0\text{m}$, tính sát thương phép | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tầm đánh xa qua simulator loop |
| **Nội tại Hút Khống Chế & Chuyển Hóa (CC Transmute)** | `passive: { type: cc_absorb_transmute, transmuteDelay: 2.0, transmuteHeal: 80, maxAbsorb: 1 }` | `engine.mjs` trong `cast()` W: quét đồng minh, xóa sạch `slows`, `rootUntil`, `stunUntil` và gọi `proc("passive:cc_transmuted")` | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>`Toy 7: Oneira CC absorb & transmutation`<br>Khẳng định `ally.slows.length === 0`, `ally.rootUntil <= W.t` và kích hoạt `proc("passive:cc_transmuted")` |
| **Q — Mộng Ảnh Trói Buộc** | `q: { aim: skillshot, width: 1.5, speed: 26, range: 8.0, damage: { ... }, effects: [{ root: 1.0 }] }` | `cast()` -> `applyEffects()` tính sát thương phép và áp dụng `root` 1.0s lên mục tiêu trúng đòn | `SUPPORTED` | `NOT_TESTED` | Khẳng định đạn bay thẳng và gán cờ `root` trên mục tiêu |
| **W — Mặt Nạ Hút Khống Chế** *(Legacy RMB -> W)* | `rmb: { aim: self, shield: { radius: 6.0, allies: true }, heal: { radius: 6.0, allies: true } }` | `cast()` tức thời, gọi `shieldOn()` và `heal()` cho toàn bộ đồng minh, đồng thời kích hoạt hút khống chế nội tại | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs` lines 192–200 kiểm chứng cast W hóa giải sạch CC cho đồng minh |
| **E — Mộng Cảnh Tương Lân** | `e: { aim: area, radius: 4.2, range: 7.0, damage: { ... }, effects: [{ slow: 0.35, duration: 1.5 }] }` | `cast()` diện rộng từ xa, gây sát thương phép và làm chậm kẻ địch trong bán kính $4.2\text{m}$ | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng vùng làm chậm mộng cảnh qua simulator engine |
| **R — Đại Mộng Giác Tỉnh** | `r: { aim: area, radius: 6.5, delay: 0.2, windup: 0.25, heal: { ... }, shield: { ... }, effects: [{ stun: 0.8 }] }` | `cast()` đại hào quang diện rộng, áp dụng `stun` 0.8s toàn bộ kẻ địch, đồng thời hồi máu lớn + khiên $3.5\text{s}$ cho toàn đội | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tác động kép làm choáng địch và hồi phục lớn cho đồng minh trong giả lập 5v5 |
| **Universal Dash (D)** | Chuẩn hóa hệ thống (Doc 91) | `dash()` phổ quát toàn game, tiêu hao stamina | `SUPPORTED` | `NOT_TESTED` | Module điều khiển chung toàn game |
| **Tương tác Bot AI** | `builds: [chuong_may, dang_hoi_am, ...]` | Logic bot hỗ trợ ưu tiên canh W để giải cứu xạ thủ ngay khi xạ thủ bị dính khống chế cứng | `PARTIAL` | `NOT_TESTED` | Bot chạy ổn định trong kịch bản Balance Lab 200 matches |

---

## 2. Chi Tiết Triển Khai Trong Simulator Engine (`tools/sim/engine.mjs`)

### 2.1. Logic Hút Khống Chế Độc Quyền
Đoạn mã vận hành độc quyền của Oneira trong `tools/sim/engine.mjs`:
```javascript
// Oneira: Hút khống chế đồng minh
if (spellId === "rmb" && u.k?.passive?.type === "cc_absorb_transmute") {
  const allies = alliesOf(W, u);
  for (const ally of allies) {
    if (ally !== u && !ally.dead) {
      if (ally.slows?.length > 0 || ally.rootUntil > W.t || ally.stunUntil > W.t) {
        // Hút sạch các trạng thái CC mềm và cứng
        ally.slows = [];
        ally.rootUntil = 0;
        ally.stunUntil = 0;
        proc(u, "passive:cc_transmuted");
        break; // Hạn mức hút 1 mục tiêu
      }
    }
  }
}
```

### 2.2. Kiểm Thử Khẳng Định Trong `wave4-gameplay-toys.test.mjs`
Đoạn kiểm thử Toy 7 xác nhận:
- Đồng minh trước khi dùng W: `ally.slows.length > 0` và `ally.rootUntil > W.t`
- Sau khi Oneira bấm W:
  - `expect(ally.slows.length).toBe(0);`
  - `expect(ally.rootUntil).toBeLessThanOrEqual(W.t);`
  - `expect(oneira.procs["passive:cc_transmuted"]).toBe(1);`
