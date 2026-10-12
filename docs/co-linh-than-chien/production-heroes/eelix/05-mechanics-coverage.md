# 05 · Mechanics Coverage — #33 Eelix (Lươn Sóng Thủy Uyên)

**Trạng thái:** `MECHANICS_VERIFIED / SIMULATOR_SUPPORTED`  
**Khóa định danh:** `#33 / eelix`  
**Nguồn dữ liệu:** `tools/sim/candidates/eelix.yml` & `tools/test/wave4-gameplay-toys.test.mjs`

---

## 1. Bảng Ma Trận Phủ Cơ Chế (Feature Coverage Matrix)

Tuân thủ nghiêm ngặt chuẩn Tài liệu 105 (§1 & §S3): Mọi tính năng phải được ánh xạ rõ ràng tới trường YAML, hàm thực thi simulator engine, trạng thái hỗ trợ thực tế và mã kiểm thử. Bình luận (comments) trong YAML không được coi là cơ chế đã triển khai!

| Tính năng cốt lõi / Kỹ năng | Trường dữ liệu trong YAML Candidate | Hàm / Logic thực thi trong Engine Simulator | Trạng thái Simulator | Trạng thái Runtime Spawn | Bằng chứng Kiểm thử (Automated Tests) |
|---|---|---|---|---|---|
| **Chỉ số căn bản & Tăng trưởng** | `stats: { hp: 630, resource: 0, ad: 66, ... }`<br>`growth: { hp: 86, ad: 3.7, ... }` | `heroUnit("eelix")` nạp qua `loadCandidates()` | `SUPPORTED` | `NOT_TESTED` | Test nạp và khởi tạo đơn vị trong `wave4-gameplay-toys.test.mjs` |
| **Đánh thường Cận chiến Cắn xé (LMB)** | `lmb: { aim: melee, range: 1.7 }` | `actAttack()` trong `engine.mjs` cận chiến cắn xé $1.7\text{m}$, tính sát thương vật lý | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng cự ly cận chiến qua simulator loop |
| **Nội tại Lướt Sóng & Sét Lan (Shadow Wake)** | `passive: { type: shadow_wake, wakeDuration: 3.5, wakeSpeedBonus: 0.35, chainLightningAd: 0.45 }` | `engine.mjs` xử lý vệt nước: tăng tốc `ms(u, W.t)` lên $+35\%$ và cộng thêm sát thương giật sét khi đánh thường | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs`:<br>`Toy 6: Eelix shadow wake speed boost & chain lightning strike`<br>Khẳng định `ms > baseMs`, `chainAtkDmg > normalAtkDmg`, và ghi nhận `proc("passive:shadow_wake_strike")` |
| **Q — Thủy Uyên Trườn Lướt** | `q: { aim: skillshot, width: 1.4, speed: 30, range: 7.2, dash: { distance: 7.2, toward: true }, ... }` | `cast()` lướt về phía trước $7.2\text{m}$, gây sát thương vật lý, làm chậm và tạo buff `shadowWakeUntil` | `SUPPORTED` | `NOT_TESTED` | `wave4-gameplay-toys.test.mjs` lines 161–169 kiểm chứng lướt Q và nhận buff vệt nước |
| **W — Hắc Thủy Thuẫn** *(Legacy RMB -> W)* | `rmb: { aim: self, shield: { base: [60..200], duration: 2.5 } }` | `cast()` tức thời tự niệm, gọi `shieldOn()` cấp khiên cho Eelix trong 2.5s | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng nhận khiên tức thời và duy trì lướt trong simulator |
| **E — Lôi Điện Xung Phá** | `e: { aim: area, radius: 3.6, range: 0, damage: { ... }, effects: [{ slow: 0.35 }] }` | `cast()` diện rộng quanh thân, áp dụng sát thương vật lý và làm chậm kẻ địch trong bán kính $3.6\text{m}$ | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng làm chậm và sát thương diện rộng qua simulator engine |
| **R — Thâm Hải Cuồng Nộ** | `r: { aim: single_target, range: 7.5, dash: { distance: 7.5, toward: true }, damage: { ... }, effects: [{ stun: 0.8 }] }` | `cast()` khóa đơn mục tiêu, lướt xuyên thấu $7.5\text{m}$, gây sát thương vật lý lớn và áp dụng `stun` 0.8s | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng sát thương dồn bộc phát và cờ hiệu `stun` trong giả lập |
| **Universal Dash (D)** | Chuẩn hóa hệ thống (Doc 91) | `dash()` phổ quát toàn game, tiêu hao stamina | `SUPPORTED` | `NOT_TESTED` | Module điều khiển chung toàn game |
| **Tương tác Bot AI** | `builds: [keeneye, quickstring, heartforge, ...]` | Logic bot sát thủ ưu tiên lướt Q áp sát chủ lực mỏng máu, tung đòn đánh sét lan rồi dùng R dứt điểm | `PARTIAL` | `NOT_TESTED` | Bot chạy ổn định trong kịch bản Balance Lab 200 matches |

---

## 2. Chi Tiết Triển Khai Trong Simulator Engine (`tools/sim/engine.mjs`)

### 2.1. Logic Vệt Nước và Đòn Đánh Sét Lan
Đoạn mã vận hành độc quyền của Eelix trong `tools/sim/engine.mjs`:
```javascript
// Eelix: Lướt Sóng Thủy Uyên
if (spellId === "q" && u.k?.passive?.type === "shadow_wake") {
  const p = u.k.passive;
  u.shadowWakeUntil = W.t + (p.wakeDuration ?? 3.5);
  proc(u, "passive:shadow_wake");
}

// Cường hóa đòn đánh thường trên vệt nước
if (u.shadowWakeUntil && u.shadowWakeUntil > W.t && u.k?.passive?.type === "shadow_wake") {
  const extraDmg = (u.k.passive.chainLightningAd ?? 0.45) * bonusAd(u);
  hurt(W, u, target, extraDmg, "magic");
  proc(u, "passive:shadow_wake_strike");
}
```

### 2.2. Kiểm Thử Khẳng Định Trong `wave4-gameplay-toys.test.mjs`
Đoạn kiểm thử Toy 6 xác nhận:
- Tốc độ tăng vọt sau khi dùng Q: `expect(ms(eelix, W.t)).toBeGreaterThan(baseMs);`
- Đòn đánh thường giật thêm sát thương điện lan: `expect(chainAtkDmg).toBeGreaterThan(normalAtkDmg);`
- Kích hoạt sự kiện proc: `expect(eelix.procs["passive:shadow_wake_strike"]).toBe(1);`
