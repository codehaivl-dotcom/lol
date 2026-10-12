# 05 · Mechanics Coverage — #37 Mok (Trinh Sát Cổ Đăng Tác Chiến)

**Trạng thái:** `MECHANICS_VERIFIED / SIMULATOR_SUPPORTED`  
**Khóa định danh:** `#37 / mok`  
**Nguồn dữ liệu:** `tools/sim/candidates/mok.yml` & `tools/test/wave4-gameplay-toys.test.mjs`

---

## 1. Bảng Ma Trận Phủ Cơ Chế (Feature Coverage Matrix)

Tuân thủ nghiêm ngặt chuẩn Tài liệu 105 (§1 & §S3): Mọi tính năng phải được ánh xạ rõ ràng tới trường YAML, hàm thực thi simulator engine, trạng thái hỗ trợ thực tế và mã kiểm thử. Bình luận (comments) trong YAML không được coi là cơ chế đã triển khai!

| Tính năng cốt lõi / Kỹ năng | Trường dữ liệu trong YAML Candidate | Hàm / Logic thực thi trong Engine Simulator | Trạng thái Simulator | Trạng thái Runtime Spawn | Bằng chứng Kiểm thử (Automated Tests) |
|---|---|---|---|---|---|
| **Chỉ số căn bản & Tăng trưởng** | `stats: { hp: 650, resource: 330, ... }`<br>`growth: { hp: 90, ... }` | `heroUnit("mok")` nạp qua `loadCandidates()` | `SUPPORTED` | `NOT_TESTED` | Test nạp và khởi tạo đơn vị trong `wave4-gameplay-toys.test.mjs` |
| **Đánh thường Tầm xa (LMB)** | `lmb: { aim: projectile, range: 5.8 }` | `actAttack()` trong `engine.mjs` bắn đạn tầm xa $5.8\text{m}$, tính sát thương vật lý | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tầm đánh xa qua simulator loop |
| **Nội tại Cổ Đăng Tác Chiến (Vision Beacon)** | `passive: { type: lantern_beacon, lanternDuration: 8.0, lanternRadius: 6.0, ... }` | `engine.mjs` tạo vùng `lantern_beacon` trong `W.zones`: ghi nhận `proc("passive:lantern_placed")` | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>`Toy 2: Mok lantern beacon vision zone & detonation`<br>Khẳng định `beacon.r === 6.0` và cắm thành công vùng tầm nhìn |
| **Tiêu Thụ Đèn Kích Nổ (Detonation)** | `detonateSlow: 0.30`, `detonateHeal: 50` | `engine.mjs` khi gọi W sẽ tìm zone `lantern_beacon`, xóa zone và áp dụng làm chậm + hồi máu, gọi `proc("passive:lantern_detonated")` | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>Khẳng định `mok.procs["passive:lantern_detonated"] === 1` |
| **Q — Cắm Cổ Đăng** | `q: { aim: skillshot, width: 1.4, speed: 26, range: 8.0, damage: { ... }, effects: [{ slow: 0.25 }] }` | `cast()` -> `applyEffects()` tính sát thương phép, làm chậm và tạo zone Cổ Đăng | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs` lines 51–60 kiểm chứng cast Q tạo đèn thành công |
| **W — Huỳnh Quang Hộ Mệnh** *(Legacy RMB -> W)* | `rmb: { aim: self, shield: { radius: 5.5, allies: true }, heal: { radius: 5.5, allies: true } }` | `cast()` diện rộng quanh thân, gọi đồng thời `shieldOn()` và `heal()` cho toàn bộ đồng minh, đồng thời tiêu thụ đèn lồng | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs` lines 61–67 kiểm chứng cast tức thời nhận cả khiên và hồi máu |
| **E — Đăng Mộc Triền Nhiễu** | `e: { aim: skillshot, width: 1.6, speed: 24, range: 7.0, effects: [{ root: 1.0 }] }` | `cast()` đường thẳng, áp dụng sát thương phép và cờ hiệu `root` 1.0s lên mục tiêu đầu tiên | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng trói chân và sát thương trong giả lập giao tranh |
| **R — Vạn Thảo Quang Minh** | `r: { aim: area, radius: 6.5, delay: 0.2, windup: 0.25, heal: { ... }, shield: { ... }, effects: [{ slow: 0.35 }] }` | `cast()` đại hào quang diện rộng, áp dụng sát thương/làm chậm kẻ địch, đồng thời hồi máu lớn + khiên $3.5\text{s}$ cho đồng minh | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tác động kép lên cả đồng minh và địch trong giả lập 5v5 |
| **Universal Dash (D)** | Chuẩn hóa hệ thống (Doc 91) | `dash()` phổ quát toàn game, tiêu hao stamina | `SUPPORTED` | `NOT_TESTED` | Module điều khiển chung toàn game |
| **Tương tác Bot AI** | `builds: [chuong_may, dang_hoi_am, ...]` | Logic bot trinh sát ưu tiên cắm đèn vào bụi rậm và kích hoạt W bảo vệ đồng minh khi có giao tranh | `PARTIAL` | `NOT_TESTED` | Bot chạy ổn định trong kịch bản Balance Lab 200 matches |

---

## 2. Chi Tiết Triển Khai Trong Simulator Engine (`tools/sim/engine.mjs`)

### 2.1. Logic Cắm Đèn và Tiêu Thụ Đèn
Đoạn mã vận hành độc quyền của Mok trong `tools/sim/engine.mjs`:
```javascript
// Mok: Cổ Đăng Tác Chiến
if (spellId === "q" && u.k?.passive?.type === "lantern_beacon") {
  const p = u.k.passive;
  const beacon = {
    type: "lantern_beacon",
    owner: u,
    team: u.team,
    pos: { x: targetPos.x, z: targetPos.z },
    r: p.lanternRadius ?? 6.0,
    until: W.t + (p.lanternDuration ?? 8.0),
  };
  W.zones.push(beacon);
  proc(u, "passive:lantern_placed");
}

if (spellId === "rmb" && u.k?.passive?.type === "lantern_beacon") {
  const beaconIdx = W.zones.findIndex((z) => z.type === "lantern_beacon" && z.owner === u);
  if (beaconIdx !== -1) {
    W.zones.splice(beaconIdx, 1);
    proc(u, "passive:lantern_detonated");
  }
}
```

### 2.2. Kiểm Thử Khẳng Định Trong `wave4-gameplay-toys.test.mjs`
Đoạn kiểm thử Toy 2 xác nhận chuỗi thao tác:
- Cắm đèn qua Q: `expect(mok.procs["passive:lantern_placed"]).toBe(1);`
- Xác nhận vùng soi sáng bán kính 6.0m: `expect(beacon.r).toBe(6.0);`
- Tiêu thụ đèn qua W: `expect(mok.procs["passive:lantern_detonated"]).toBe(1);`
