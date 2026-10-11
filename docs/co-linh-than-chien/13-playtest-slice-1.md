---
summary: Phạm vi bản chơi thử đầu tiên của Cổ Linh, một lane giữa, 6 tướng, để playtest hai cặp mô phỏng còn lệch.
evidence: observed-built (scope chốt từ 06, 07, 08 và balance-sim-2026-10-07; runtime đã build, xem 14 §A)
---

# Playtest slice 1: Mạch Giữa

> **Cập nhật Slice 1.5:** luật trận Mạch Giữa trong file này vẫn đúng. Cách *vào* trận (chọn tướng ở HUD, tự chạy ván mới) và các mode `duel`/`skirmish` được thay bằng sảnh ở 14 §B0 (`tai_hien`, `san_tap`). Map ID `mach_giua`.

**Trạng thái:** đã build trong world (lane, trụ, lính, 6 tướng, shop, HUD); nghiệm thu còn mở theo 14 §A. Đây là bản chơi thử nhỏ nhất đủ để đo những gì mô hình không đo được. Nó không thay vertical slice ở 06 §4.

## 1. Mục đích

1. Đo hai cặp mô phỏng còn vượt 70/30 bằng người chơi thật: **Mộc Lẫm–Nham Vũ** (mô hình 75/25) và **Kha Tàn–Vân Dao** (mô hình 72/28). Mô hình duel là đường thẳng không có lính, trụ, bụi, nên cận chiến lao vào bị phóng đại. Slice có đủ ba thứ đó.
2. Đo tốc độ phá trụ thật (wave + 1–2 tướng) để đưa vào `match.mjs` và chốt HP công trình (08 §7.1, D5).
3. Kiểm cảm giác combat: camera khoá kiểu AOV (#7781, `camera.yml`), né, CC, tầm chiêu đúng như `heroes.yml`.

## 2. Có trong slice

| Phần | Nội dung | Nguồn số |
|---|---|---|
| Map | Chỉ **Mạch Giữa** của `cuu_mach`: lane giữa 07 §7 từ gate Blue (−103.3, +103.3) tới gate Red (+103.3, −103.3), rộng 18 m, sông và cầu ở tâm. Hai bụi `mid-top`/`mid-bot` mỗi phe (07 §6). Ngoài lane là vách, không có rừng | 07 §1, §6, §7 |
| Căn cứ | Mỗi phe: fountain (bán kính 13 m, hồi 15% HP/s), Tâm Mạch, shop | 07 §2, 08 §3 |
| Công trình | Mỗi phe **2 trụ**: T1 (±45, ∓45) và Trấn Mạch T2 (±81, ∓81), rồi Tâm Mạch. T1 khóa T2; T2 sụp mở Tâm Mạch | 07 §3, 08 §7 |
| Lính | Wave 30 s, 3 cận + 2 phép + 1 công thành mỗi phe, wave đầu T+5 s | 08 §5.1 |
| Tướng | 6 tướng slice, kit đủ 6 slot | `heroes.yml` |
| Tiến trình | XP, cấp 1–15, rank D1, vàng thụ động +3/s, last-hit, hạ tướng | 08 §2, §4, §8 |
| Shop | 8 món nháp, mua ở fountain hoặc khi chết | 08 §8.2, D7 |
| Điều khiển | WASD, LMB, Q, RMB, E, R, Space/V né (không nhảy), B Hồi Tưởng, P shop | 06 §7, 08 §3 |
| Camera | Khoá kiểu AOV/LoL; số chuẩn ở `scripts/lib/data/camera.yml` (hiện pitch 56°, 17 m, zoom 11–26 m, yaw theo phe) | @lukasai #7781; 06 §7 |
| Chết | Hồi sinh 12 s + 2 s/cấp tại fountain | 08 §4, `match.mjs` |
| Mode | `duel` 1v1 và `skirmish` 2v2/3v3. Sân tập có nút chọn cấp 4/7/10/13 + vàng tương ứng để đấu đúng mốc mô phỏng | — |
| Phone | Touch layout cơ bản: joystick, LMB, Q, RMB, E, R, né | D11 |

## 3. Không có trong slice

Rừng và camp, The Call, Cổ Titan, Dị Năng, lane Thượng/Hạ, bot AI, lồng tiếng, art cuối (blockout gọn gàng là đủ), thanh nạp ultimate (R dùng cooldown tạm, 08 §2.1), ranked.

## 4. Đo gì

> **DEFERRED (2026-10-08 · @lukasai "làm luôn"):** nút chọn cấp 4/7/10/13 ở Sân Tập và bảng SQL `duels` để sau khi đo G2. Sân Tập giữ reset về cấp 1 (14 §B0.6).

Mỗi trận ghi một dòng vào SQL của game (bảng `duels`):

| Trường | Ý nghĩa |
|---|---|
| `hero_a`, `hero_b`, `level`, `gold` | Cặp đấu và mốc |
| `winner`, `seconds` | Ai thắng, bao lâu (TTK thật) |
| `dmg_by_slot` | Sát thương theo LMB/Q/RMB/E/R/passive mỗi bên |
| `cc_seconds` | Tổng thời gian bị khống chế mỗi bên |
| `hits`, `casts` | Tỉ lệ trúng chiêu skillshot (mô hình đang giả định) |
| `minions_near`, `in_brush` | Đánh có lính/bụi xen vào hay không |

Ngoài ra: thời gian một wave + 1 tướng / 2 tướng phá T1 và T2 (giây), ghi theo phút trận.

## 5. Ngưỡng quyết định

> **DEFERRED (2026-10-08 · @lukasai "làm luôn"):** nút chọn cấp 4/7/10/13 ở Sân Tập và bảng SQL `duels` để sau khi đo G2. Sân Tập giữ reset về cấp 1 (14 §B0.6).

- Mỗi cặp ở hai mốc cấp 7 và 13, ít nhất **20 trận** mỗi mốc, hai người chơi đổi tướng cho nhau để trừ kỹ năng người.
- Tỉ lệ thắng thật trong **35–65%**: giữ kit, nhập hệ số `mults.json` nếu vẫn cần, ghi `balance-log`.
- Ngoài 35–65%: sửa kit cặp đó (tầm, CC, lướt), không dùng hệ số chung.
- Tốc độ phá trụ đo được đưa vào `match.mjs`, chạy lại tới khi trận Mạch Giữa đạt khung BAL-02S **12–20 phút** (11; chốt 2026-10-08), rồi mới đề xuất HP ở 08 §7.1. (20–35 phút là BAL-02 cho 5v5 ba lane.)
- Tỉ lệ trúng skillshot thật thay giả định trong `duel.mjs`, chạy lại BAL-01.

## 6. Thứ tự build

1. Camera + di chuyển + né. (Lịch sử: bản đầu là camera qua vai; #7781 thay bằng camera khoá kiểu AOV, `camera.yml`.)
2. Lane giữa blockout: nền, sông, cầu, vách, 4 bụi, căn cứ.
3. Một tướng chạy đủ 6 slot từ `heroes.yml`, đánh bia tập.
4. Đủ 6 tướng; damage, CC, khiên theo 08 §1.
5. Trụ, Tâm Mạch, lính, `sim.js` trọng tài: XP, vàng, thắng/thua.
6. Shop 8 món, HUD (máu, năng lượng, chiêu, vàng, cấp), bảng chọn tướng.
7. Ghi `duels` vào SQL; sân tập chọn cấp.
8. Touch layout.

## 7. Acceptance dùng cho slice này

Từ 11: DATA-01 (cho 6 tướng), BAL-01, MATCH-01 (thu gọn 1v1–3v3), NET-01, NET-02, MOB-01. Các mục Call, Titan, camp, Dị Năng, VO để sau.
