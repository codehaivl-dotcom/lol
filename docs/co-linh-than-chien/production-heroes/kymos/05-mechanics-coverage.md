# 05 · Mechanics Coverage — #49 Kymos (Thạch Âm Điểm Rung Hạ Âm)

**Trạng thái:** `MECHANICS_VERIFIED / SIMULATOR_SUPPORTED`  
**Khóa định danh:** `#49 / kymos`  
**Nguồn dữ liệu:** `tools/sim/candidates/kymos.yml` & `tools/test/wave4-gameplay-toys.test.mjs`

---

## 1. Bảng Ma Trận Phủ Cơ Chế (Feature Coverage Matrix)

Tuân thủ nghiêm ngặt chuẩn Tài liệu 105 (§1 & §S3): Mọi tính năng phải được ánh xạ rõ ràng tới trường YAML, hàm thực thi simulator engine, trạng thái hỗ trợ thực tế và mã kiểm thử. Bình luận (comments) trong YAML không được coi là cơ chế đã triển khai!

| Tính năng cốt lõi / Kỹ năng | Trường dữ liệu trong YAML Candidate | Hàm / Logic thực thi trong Engine Simulator | Trạng thái Simulator | Trạng thái Runtime Spawn | Bằng chứng Kiểm thử (Automated Tests) |
|---|---|---|---|---|---|
| **Chỉ số căn bản & Tăng trưởng** | `stats: { hp: 660, resource: 340, ... }`<br>`growth: { hp: 92, ... }` | `heroUnit("kymos")` nạp qua `loadCandidates()` | `SUPPORTED` | `NOT_TESTED` | Test nạp và khởi tạo đơn vị trong `wave4-gameplay-toys.test.mjs` |
| **Đánh thường Phép Tầm xa (LMB)** | `lmb: { aim: projectile, range: 5.8, damageType: magic, ap: 0.2 }` | `actAttack()` trong `engine.mjs` bắn đạn tầm xa $5.8\text{m}$, tính sát thương phép | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tầm đánh xa qua simulator loop |
| **Nội tại Điểm Rung Hạ Âm (Acoustic Node)** | `passive: { type: acoustic_node, nodeDuration: 3.5, nodeRadius: 4.5, burstMitigation: 0.40 }` | `engine.mjs` xử lý vùng `acoustic_node` trong `W.zones`: giảm 40% sát thương bộc phát cho đồng minh đứng trong vùng | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>`Toy 5: Kymos acoustic node shockwave mitigation`<br>Khẳng định `mitigatedBurst < unmitigatedBurst * 0.7` và `proc("passive:acoustic_mitigation")` |
| **Q — Thạch Ba Kích** | `q: { aim: skillshot, width: 1.5, speed: 26, range: 8.0, damage: { ... }, effects: [{ slow: 0.3 }] }` | `cast()` -> `applyEffects()` tính sát thương phép và làm chậm $30\%$ mục tiêu | `SUPPORTED` | `NOT_TESTED` | Khẳng định đạn bay thẳng và gán cờ `slow` trên mục tiêu |
| **W — Điểm Rung Hạ Âm** *(Legacy RMB -> W)* | `rmb: { aim: self, shield: { radius: 5.5, allies: true }, heal: { radius: 5.5, allies: true } }` | `cast()` cắm mốc `acoustic_node`, gọi đồng thời `shieldOn()` và `heal()` cho toàn bộ đồng minh | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs` lines 131–138 kiểm chứng cast W tạo vùng node và cấp khiên |
| **E — Cộng Hưởng Thạch Cầm** | `e: { aim: area, radius: 4.0, range: 0, damage: { ... }, effects: [{ slow: 0.25 }] }` | `cast()` diện rộng quanh thân, áp dụng sát thương phép và làm chậm kẻ địch cận chiến | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng giải tỏa áp sát và làm chậm trong simulator |
| **R — Vạn Âm Tĩnh Lặng** | `r: { aim: area, radius: 6.5, delay: 0.2, windup: 0.25, heal: { ... }, shield: { ... }, effects: [{ slow: 0.35 }] }` | `cast()` đại hào quang diện rộng, áp dụng sát thương/làm chậm kẻ địch, đồng thời hồi máu lớn + khiên $3.5\text{s}$ cho toàn đội | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tác động bảo hộ diện rộng trong giả lập 5v5 |
| **Universal Dash (D)** | Chuẩn hóa hệ thống (Doc 91) | `dash()` phổ quát toàn game, tiêu hao stamina | `SUPPORTED` | `NOT_TESTED` | Module điều khiển chung toàn game |
| **Tương tác Bot AI** | `builds: [chuong_may, dang_hoi_am, ...]` | Logic bot hỗ trợ ưu tiên cắm W ngay khi đồng minh nhận sát thương lớn và dùng E đẩy lùi khi bị tiếp cận | `PARTIAL` | `NOT_TESTED` | Bot chạy ổn định trong kịch bản Balance Lab 200 matches |

---

## 2. Chi Tiết Triển Khai Trong Simulator Engine (`tools/sim/engine.mjs`)

### 2.1. Logic Triệt Tiêu Sát Thương Bộc Phát Trong `hurt()`
Đoạn mã vận hành độc quyền của Kymos trong `tools/sim/engine.mjs`:
```javascript
// Kymos: Điểm Rung Hạ Âm giảm 40% sát thương sốc
const acousticZone = W.zones.find(
  (z) => z.type === "acoustic_node" && z.team === target.team && dist(z.pos, target) <= (z.r ?? 4.5)
);
if (acousticZone && amt >= 50) { // Ngưỡng sát thương bộc phát
  amt *= (1 - (acousticZone.mitigation ?? 0.40));
  proc(target, "passive:acoustic_mitigation");
}
```

### 2.2. Kiểm Thử Khẳng Định Trong `wave4-gameplay-toys.test.mjs`
Đoạn kiểm thử Toy 5 xác nhận:
- Sát thương gốc không có cọc: `unmitigatedBurst = 100;`
- Cắm cọc qua W: `expect(node).toBeDefined();`
- Sát thương nhận vào khi ở trong cọc:
  - `expect(mitigatedBurst).toBeLessThan(unmitigatedBurst * 0.7);`
  - `expect(ally.procs["passive:acoustic_mitigation"]).toBeGreaterThan(0);`
