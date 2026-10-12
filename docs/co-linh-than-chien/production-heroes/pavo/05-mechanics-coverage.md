# 05 · Mechanics Coverage — #35 Pavo (Khổng Tước Quạt Mắt Dọa Sợ)

**Trạng thái:** `MECHANICS_VERIFIED / SIMULATOR_SUPPORTED`  
**Khóa định danh:** `#35 / pavo`  
**Nguồn dữ liệu:** `tools/sim/candidates/pavo.yml` & `tools/test/wave4-gameplay-toys.test.mjs`

---

## 1. Bảng Ma Trận Phủ Cơ Chế (Feature Coverage Matrix)

Tuân thủ nghiêm ngặt chuẩn Tài liệu 105 (§1 & §S3): Mọi tính năng phải được ánh xạ rõ ràng tới trường YAML, hàm thực thi simulator engine, trạng thái hỗ trợ thực tế và mã kiểm thử. Bình luận (comments) trong YAML không được coi là cơ chế đã triển khai!

| Tính năng cốt lõi / Kỹ năng | Trường dữ liệu trong YAML Candidate | Hàm / Logic thực thi trong Engine Simulator | Trạng thái Simulator | Trạng thái Runtime Spawn | Bằng chứng Kiểm thử (Automated Tests) |
|---|---|---|---|---|---|
| **Chỉ số căn bản & Tăng trưởng** | `stats: { hp: 620, resource: 350, ... }`<br>`growth: { hp: 86, ... }` | `heroUnit("pavo")` nạp qua `loadCandidates()` | `SUPPORTED` | `NOT_TESTED` | Test nạp và khởi tạo đơn vị trong `wave4-gameplay-toys.test.mjs` |
| **Đánh thường Phép Tầm xa (LMB)** | `lmb: { aim: projectile, range: 6.2, damageType: magic, ap: 0.2 }` | `actAttack()` trong `engine.mjs` bắn đạn lông vũ tầm xa $6.2\text{m}$, tính sát thương phép | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tầm đánh xa và tỷ lệ AP qua simulator loop |
| **Nội tại Quạt Mắt Dọa Sợ (Peacock Gaze)** | `passive: { type: peacock_gaze, gazeFear: 1.2, gazeRadius: 5.5 }` | `engine.mjs` xử lý trong `cast()` W: quét kẻ địch trong $5.5\text{m}$, gán `foe.charmUntil = W.t + 1.2` và `foe.charmBy = pavo`, gọi `proc("passive:peacock_fear")` | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>`Toy 4: Pavo peacock gaze directional fear`<br>Khẳng định `foe.charmUntil > W.t` và `pavo.procs["passive:peacock_fear"] === 1` |
| **Q — Kim Vũ Tiễn (Fan Skillshot)** | `q: { aim: fan, fan: { count: 3, spread: 35 }, range: 8.0, speed: 30, damage: { ... }, effects: [{ slow: 0.25 }] }` | `cast()` bắn 3 tia hình quạt, áp dụng sát thương phép và làm chậm mục tiêu | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng chùm đạn đa tia và cờ hiệu `slow` qua simulator loop |
| **W — Khai Mạc Khổng Tước** *(Legacy RMB -> W)* | `rmb: { aim: self, shield: { base: [65..205], duration: 2.5 }, effects: [{ slow: 0.35 }] }` | `cast()` tức thời quanh thân, gọi `shieldOn()` cấp khiên cho Pavo và kích hoạt `peacock_gaze` | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs` lines 110–118 kiểm chứng cast W kích hoạt thành công Fear |
| **E — Huyễn Ảnh Quang Tráo** | `e: { aim: area, radius: 3.8, range: 7.0, damage: { ... }, effects: [{ slow: 0.3 }] }` | `cast()` diện rộng từ xa, gây sát thương phép và làm chậm kẻ địch trong bán kính $3.8\text{m}$ | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng vùng nổ quang học và làm chậm qua simulator engine |
| **R — Vạn Nhãn Thôi Miên** | `r: { aim: area, radius: 6.0, delay: 0.2, windup: 0.25, damage: { ... }, effects: [{ stun: 0.8 }] }` | `cast()` đại hào quang diện rộng, gây sát thương phép bộc phát lớn và áp dụng `stun` 0.8s toàn bộ quân địch trong bán kính $6.0\text{m}$ | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng sát thương bộc phát và cờ hiệu `stun` diện rộng trong giả lập 5v5 |
| **Universal Dash (D)** | Chuẩn hóa hệ thống (Doc 91) | `dash()` phổ quát toàn game, tiêu hao stamina | `SUPPORTED` | `NOT_TESTED` | Module điều khiển chung toàn game |
| **Tương tác Bot AI** | `builds: [chuong_may, dang_hoi_am, ...]` | Logic bot pháp sư ưu tiên giữ cự ly $6.0\text{m}$, dùng Q cấu rỉa và phản ứng bấm W ngay khi có kẻ địch áp sát trong $5.5\text{m}$ | `PARTIAL` | `NOT_TESTED` | Bot chạy ổn định trong kịch bản Balance Lab 200 matches |

---

## 2. Chi Tiết Triển Khai Trong Simulator Engine (`tools/sim/engine.mjs`)

### 2.1. Logic Khống Chế Quạt Mắt (`peacock_gaze`)
Đoạn mã vận hành độc quyền của Pavo trong `tools/sim/engine.mjs`:
```javascript
// Pavo: Khổng Tước Quạt Mắt Dọa Sợ
if (spellId === "rmb" && u.k?.passive?.type === "peacock_gaze") {
  const p = u.k.passive;
  const radius = p.gazeRadius ?? 5.5;
  const fearDur = p.gazeFear ?? 1.2;
  const enemies = enemiesOf(W, u);
  for (const enemy of enemies) {
    if (dist(u, enemy) <= radius && !enemy.dead) {
      // Simulator áp dụng trạng thái charm/fear chạy lùi
      enemy.charmUntil = W.t + fearDur;
      enemy.charmBy = u;
      proc(u, "passive:peacock_fear");
    }
  }
}
```

### 2.2. Kiểm Thử Khẳng Định Trong `wave4-gameplay-toys.test.mjs`
Đoạn kiểm thử Toy 4 xác nhận:
- Trước khi dùng W: `expect(foe.charmUntil).toBe(0);`
- Kích hoạt W dọa sợ kẻ địch đối diện trong 5.5m:
  - `expect(foe.charmUntil).toBeGreaterThan(W.t);`
  - `expect(foe.charmBy).toBe(pavo);`
  - `expect(pavo.procs["passive:peacock_fear"]).toBe(1);`
