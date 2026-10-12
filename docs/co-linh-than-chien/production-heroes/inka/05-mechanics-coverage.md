# 05 · Mechanics Coverage — #19 Inka (Mực Thư Pháp Tuyến Tính)

**Trạng thái:** `MECHANICS_VERIFIED / SIMULATOR_SUPPORTED`  
**Khóa định danh:** `#19 / inka`  
**Nguồn dữ liệu:** `tools/sim/candidates/inka.yml` & `tools/test/wave4-gameplay-toys.test.mjs`

---

## 1. Bảng Ma Trận Phủ Cơ Chế (Feature Coverage Matrix)

Tuân thủ nghiêm ngặt chuẩn Tài liệu 105 (§1 & §S3): Mọi tính năng phải được ánh xạ rõ ràng tới trường YAML, hàm thực thi simulator engine, trạng thái hỗ trợ thực tế và mã kiểm thử. Bình luận (comments) trong YAML không được coi là cơ chế đã triển khai!

| Tính năng cốt lõi / Kỹ năng | Trường dữ liệu trong YAML Candidate | Hàm / Logic thực thi trong Engine Simulator | Trạng thái Simulator | Trạng thái Runtime Spawn | Bằng chứng Kiểm thử (Automated Tests) |
|---|---|---|---|---|---|
| **Chỉ số căn bản & Tăng trưởng** | `stats: { hp: 615, resource: 360, ... }`<br>`growth: { hp: 85, ... }` | `heroUnit("inka")` nạp qua `loadCandidates()` | `SUPPORTED` | `NOT_TESTED` | Test nạp và khởi tạo đơn vị trong `wave4-gameplay-toys.test.mjs` |
| **Đánh thường Phép Tầm xa (LMB)** | `lmb: { aim: projectile, range: 6.0, damageType: magic, ap: 0.2 }` | `actAttack()` trong `engine.mjs` bắn đạn tầm xa $6.0\text{m}$, tính sát thương phép | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tầm đánh xa và tỷ lệ AP qua simulator loop |
| **Nội tại Vệt Mực (Ink Path Zone)** | `passive: { type: ink_path, inkDuration: 4.0, inkAllySpeed: 0.20, inkEnemySlow: 0.25 }` | `engine.mjs` xử lý vùng `ink_path` trong `W.zones`: tăng tốc chạy đồng minh và làm chậm kẻ địch | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>`Toy 1: Inka ink path zone creation & directional speed modulation`<br>Khẳng định `allyMs > baseMs`, `foeMs < baseMs`, và hoàn trả tốc độ sau khi hết 4.0s |
| **Q — Thư Pháp Tuyến Kích** | `q: { aim: skillshot, width: 1.5, speed: 28, range: 8.5, damage: { ... }, effects: [{ slow: 0.25 }] }` | `cast()` -> `applyEffects()` tính sát thương phép và tạo vùng `ink_path` | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>Khẳng định `inka.procs["passive:ink_path"] === 1` và vùng `ink_path` được tạo trên sân |
| **W — Mặc Thủy Hộ Thể** *(Legacy RMB -> W)* | `rmb: { aim: self, shield: { base: [65..205], duration: 2.5 } }` | `cast()` tự thi triển tức thì, gọi `shieldOn()` cấp khiên cho Inka | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng nhận khiên tức thời và phân rã sau 2.5s qua simulator engine |
| **E — Giao Điểm Kích Nổ** | `e: { aim: area, radius: 4.0, range: 7.5, damage: { ... }, effects: [{ root: 1.0 }] }` | `cast()` diện rộng, quét các mục tiêu nằm trên vệt mực để kích hoạt `root` 1.0s | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng sát thương phép và cờ hiệu `root` trên mục tiêu kẻ địch |
| **R — Thiên Địa Mặc Họa** | `r: { aim: area, radius: 6.5, range: 8.0, delay: 0.3, windup: 0.3, damage: { ... }, effects: [{ slow: 0.40 }] }` | `cast()` đại đồ trận diện rộng, gây sát thương phép bộc phát lớn, làm chậm $40\%$ và tạo vùng `ink_path` đại quy mô | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng sát thương bộc phát và làm chậm diện rộng trong giả lập 5v5 |
| **Universal Dash (D)** | Chuẩn hóa hệ thống (Doc 91) | `dash()` phổ quát toàn game, tiêu hao stamina | `SUPPORTED` | `NOT_TESTED` | Module điều khiển chung toàn game |
| **Tương tác Bot AI** | `builds: [chuong_may, dang_hoi_am, ...]` | Logic bot pháp sư giữ khoảng cách $6.5\text{m}$, ưu tiên tung Q tạo mực rồi mới tung E trói chân | `PARTIAL` | `NOT_TESTED` | Bot chạy ổn định trong kịch bản Balance Lab 200 matches |

---

## 2. Chi Tiết Triển Khai Trong Simulator Engine (`tools/sim/engine.mjs`)

### 2.1. Logic Tạo Vùng Vệt Mực (`ink_path`)
Đoạn mã vận hành độc quyền của Inka trong `tools/sim/engine.mjs`:
```javascript
// Inka: Vệt Mực Thư Pháp Tuyến Tính
if (spellId === "q" && u.k?.passive?.type === "ink_path") {
  const p = u.k.passive;
  const zone = {
    type: "ink_path",
    owner: u,
    team: u.team,
    pos: { x: targetPos.x, z: targetPos.z },
    r: 1.5,
    until: W.t + (p.inkDuration ?? 4.0),
    allySpeed: p.inkAllySpeed ?? 0.20,
    enemySlow: p.inkEnemySlow ?? 0.25,
  };
  W.zones.push(zone);
  proc(u, "passive:ink_path");
}
```

### 2.2. Kiểm Thử Khẳng Định Tốc Độ Trong `wave4-gameplay-toys.test.mjs`
Đoạn kiểm thử Toy 1 xác nhận tính toàn vẹn của cơ chế:
- Đồng minh trong vùng: `expect(ms(ally, W.t)).toBeGreaterThan(allyBaseMs);`
- Kẻ địch trong vùng: `expect(ms(foe, W.t)).toBeLessThan(foeBaseMs);`
- Sau 4.0s: Hoàn trả vận tốc ban đầu `expect(ms(ally, W.t)).toBeCloseTo(allyBaseMs, 1);`
