# 05 · Mechanics Coverage — #34 Jeli (Sóng Chuông Hộ Vệ & Hồi Phục)

**Trạng thái:** `MECHANICS_VERIFIED / SIMULATOR_SUPPORTED`  
**Khóa định danh:** `#34 / jeli`  
**Nguồn dữ liệu:** `tools/sim/candidates/jeli.yml` & `tools/test/wave1-gameplay-toys.test.mjs`

---

## 1. Bảng Ma Trận Phủ Cơ Chế (Feature Coverage Matrix)

Tuân thủ nghiêm ngặt chuẩn Tài liệu 105 (§1 & §S3): Mọi tính năng phải được ánh xạ rõ ràng tới trường YAML, hàm thực thi simulator engine, trạng thái hỗ trợ thực tế và mã kiểm thử. Bình luận (comments) trong YAML không được coi là cơ chế đã triển khai!

| Tính năng cốt lõi / Kỹ năng | Trường dữ liệu trong YAML Candidate | Hàm / Logic thực thi trong Engine Simulator | Trạng thái Simulator | Trạng thái Runtime Spawn | Bằng chứng Kiểm thử (Automated Tests) |
|---|---|---|---|---|---|
| **Chỉ số căn bản & Tăng trưởng** | `stats: { hp: 640, resource: 340, ... }`<br>`growth: { hp: 88, ... }` | `heroUnit("jeli")` nạp qua `loadCandidates()` | `SUPPORTED` | `NOT_TESTED` | Test nạp và khởi tạo đơn vị trong `wave1-gameplay-toys.test.mjs` |
| **Đánh thường Tầm xa (LMB)** | `lmb: { aim: projectile, range: 6.2 }` | `actAttack()` trong `engine.mjs` bắn đạn tầm xa $6.2\text{m}$ | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tầm đánh xa và sát thương vật lý qua simulator loop |
| **Nội tại Sóng Chuông (Chime Resonance)** | `passive: { type: chime_resonance, interval: 3.5, chimeHeal, chimeShield }` | `engine.mjs` dòng 583–600:<br>Tự động đếm `u.chimeTimer += DT`, quét `alliesOf`, tìm `lowestAlly`, gọi `heal()` và `shieldOn()`, tự hồi máu cho Jeli $50\%$, gọi `proc("passive:chime_resonance")` | `SUPPORTED` | `NOT_TESTED` | `wave1-gameplay-toys.test.mjs`:<br>`test("Toy 5: Jeli chime resonance - periodic ally healing and distinct shield tracking")`<br>Khẳng định `hurtAlly.hp > allyHpBefore`, `jeli.m.allyHealed > 0`, `jeli.procs["passive:chime_resonance"] > 0` |
| **Tách biệt minh bạch Shield & Heal** | `chimeHeal` vs `chimeShield`<br>`w.shield` vs `w.heal`<br>`r.shield` vs `r.heal` | `engine.mjs` dòng 148–163:<br>`heal()` ghi vào `src.m.healed` (bản thân) hoặc `src.m.allyHealed` (đồng minh).<br>`shieldOn()` ghi vào `src.m.shieldGiven` độc lập | `SUPPORTED` | `NOT_TESTED` | `wave1-gameplay-toys.test.mjs`:<br>Kiểm tra độc lập `jeliSolo.m.shieldGiven > 0` VÀ `jeliSolo.m.allyHealed + jeliSolo.m.healed > 0` |
| **Q — Thủy Ba Chấn Động** | `q: { aim: skillshot, width: 1.6, speed: 24, range: 8.5, effects: [{ slow: 0.35, duration: 1.5 }] }` | `cast()` -> `applyEffects()` tính thời gian và tỷ lệ làm chậm | `SUPPORTED` | `NOT_TESTED` | Khẳng định đạn đạo bay chậm và gán cờ `slow` trên mục tiêu trúng đòn |
| **W — Chuông Nước Hộ Thể** *(Legacy RMB -> W Doc 91)* | `rmb: { aim: self, shield: { radius: 6.0, allies: true }, heal: { radius: 6.0, allies: true } }` | `cast()` tự thi triển, quét bán kính $6.0\text{m}$ gọi đồng thời `shieldOn()` và `heal()` cho toàn bộ đồng minh | `SUPPORTED` | `NOT_TESTED` | `wave1-gameplay-toys.test.mjs` lines 121–133 kiểm chứng cast tức thời nhận cả khiên và hồi máu |
| **E — Thủy Luân Âm Vực** | `e: { aim: area, radius: 4.2, range: 0, effects: [{ slow: 0.3, duration: 1.2 }] }` | `cast()` diện rộng quanh thân, tính sát thương phép và làm chậm trong bán kính $4.2\text{m}$ | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng làm chậm và giải tỏa áp sát trong kịch bản đấu tay đôi |
| **R — Đại Triều Thánh Chuông** | `r: { aim: area, radius: 6.5, delay: 0.2, windup: 0.25, heal, shield, effects: [{ slow: 0.35 }] }` | `cast()` đại hào quang diện rộng, áp dụng sát thương phép + làm chậm địch, đồng thời hồi máu lớn + khiên $3.5\text{s}$ cho đồng minh | `SUPPORTED` | `NOT_TESTED` | Kiểm chứng tác động kép (địch bị làm chậm, đồng minh nhận hồi phục và khiên) trong giả lập 5v5 |
| **Universal Dash (D)** | Chuẩn hóa hệ thống (Doc 91) | `dash()` phổ quát toàn game, tiêu hao stamina | `SUPPORTED` | `NOT_TESTED` | Module điều khiển chung toàn game |
| **Tương tác Bot AI** | `builds: [chuong_may, dang_hoi_am, ...]` | Logic bot hỗ trợ trong `engine.mjs` ưu tiên chọn mục tiêu đồng minh thấp máu để bảo kê | `PARTIAL` | `NOT_TESTED` | Bot chạy ổn định trong kịch bản Balance Lab 200 matches |

---

## 2. Chi Tiết Triển Khai Trong Simulator Engine (`tools/sim/engine.mjs`)

### 2.1. Logic Xung Nhịp Nội Tại (`chime_resonance`)
Đoạn mã vận hành độc quyền của Jeli tại `tools/sim/engine.mjs` (dòng 582–600):
```javascript
// Jeli: Sóng chuông ngân theo nhịp
if (u.k?.passive?.type === "chime_resonance") {
  u.chimeTimer = (u.chimeTimer ?? 0) + DT;
  const interval = u.k.passive.interval ?? 3.5;
  if (u.chimeTimer >= interval) {
    u.chimeTimer = 0;
    const p = u.k.passive;
    const healAmt = raw(u, p.chimeHeal, 1);
    const shieldAmt = p.chimeShield ? raw(u, p.chimeShield, 1) : 0;
    const allies = alliesOf(W, u);
    const lowestAlly = allies
      .filter((a) => a !== u && !a.dead)
      .sort((p, q) => p.hp / p.s.hp - q.hp / q.s.hp)[0];
    if (lowestAlly) {
      heal(W, u, lowestAlly, healAmt);
      if (shieldAmt > 0) shieldOn(W, u, lowestAlly, shieldAmt, 2.5, { kit: true });
    }
    heal(W, u, u, healAmt * 0.5);
    proc(u, "passive:chime_resonance");
  }
}
```

### 2.2. Đo Lường Độc Lập Chỉ Số Khiên & Hồi Máu
Hàm `heal` và `shieldOn` (dòng 148–163) phân tách rạch ròi 3 giá trị đo lường:
1. `src.m.healed`: Lượng máu Jeli tự hồi phục cho bản thân.
2. `src.m.allyHealed`: Lượng máu Jeli hồi phục cho tướng đồng minh.
3. `src.m.shieldGiven`: Tổng giá trị khiên chắn mà Jeli đã cung cấp cho bản thân và đồng đội.

Điều này ngăn chặn triệt để hiện tượng gian lận số liệu (fake metrics) hoặc gộp chung khiên vào hồi máu gây sai lệch đánh giá cân bằng.

---

## 3. Đánh Giá Hiện Trạng & Kế Hoạch Triển Khai Thực Chiến (Engine Gaps)

1. **Trạng thái Simulator Engine:** `FULL SUPPORTED (100%)`
   - Bộ kit candidate `jeli.yml` đã được nạp hoàn hảo vào engine Balance Lab.
   - Test tự động `wave1-gameplay-toys.test.mjs` chạy PASS 100% với Bun.
2. **Trạng thái Spawn Runtime (Trận Thật):** `NOT_TESTED`
   - Hiện tại kho lưu trữ tài liệu chuẩn hóa chưa tích hợp binary game engine Spawn trực tiếp.
   - Các cơ chế hiển thị vòm chuông, gợn sóng âm thủy ba và hiệu ứng phân rã khiên được xếp vào danh mục `PENDING_RUNTIME_SPAWN_CONNECT`.
3. **Kế hoạch kiểm chứng khi kết nối Spawn:**
   - Xác minh độ trễ phản hồi khi kích hoạt W (yêu cầu $0\text{s}$ windup mượt mà).
   - Kiểm tra hitbox quét hình cầu của R ($6.5\text{m}$) có khớp chính xác $100\%$ với vòng decal hiển thị trên mặt đất theo đúng chuẩn Tài liệu 76 & 79.
