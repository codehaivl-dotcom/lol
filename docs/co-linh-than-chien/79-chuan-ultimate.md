# 79 · ULTIMATE (R) STANDARD: chiêu R là đỉnh sức mạnh và đỉnh trình diễn

Creator chốt 2026-10-11 (luật cấp hệ thống, mọi tướng hiện có + tướng mới): "người xem phải nhìn là biết đây là Ultimate".
R hơn hẳn Q/W/E về: animation, VFX, SFX, nhịp dựng chiêu, cảm giác impact, chất liệu/cấu trúc xuất hiện, độ đọc được trong combat.
Cấm: R "hiền", "nhỏ", hoặc là Q/W/E phóng to / đổi màu. Cấm đứng yên rồi bật VFX.
Thứ bậc bắt buộc: Basic < Q/W/E < R (nhưng R không phủ trắng màn hình, không che nhân vật/mục tiêu: doc 57 A5b).

## 1. Năm lớp bắt buộc
| Lớp | Yêu cầu | Kiểm bằng |
|---|---|---|
| A. Animation / Rig | clip cast riêng (không dùng lại clip thường); pose + timing nói "tối thượng"; mỗi nhịp có chuyển động riêng; rig phục vụ ý đồ (xoay, nâng tay, bật vũ khí, dựng vật, triệu hồi, bùng nổ) | proof sheet đủ mọi key (build_hero.py vẽ tới 8 key), audit.py 0 issue, HIT khớp từng nhịp |
| B. VFX | đọc từ mô tả skill; có layer mở chiêu, duy trì, impact, kết thúc; silhouette riêng không lẫn chiêu khác | burst look camera MOBA, so cạnh Q/W/E cùng tướng |
| C. SFX | cast · từng nhịp tác động · đỉnh điểm · tàn âm; chất âm đúng vật liệu (gương, đá, băng, lửa, ánh sáng…) | nghe trên client thật; không ghi PASS khi chưa nghe |
| D. Material / Substance | xác định rõ: năng lượng / gương / đá / băng / khói / ký ức / ánh sáng / lai. Năng lượng = shader ánh sáng; vật lý = mesh + chất liệu, không chỉ mặt phẳng phát sáng | look gần + look camera trận |
| E. Readability | người chơi biết: lúc bắt đầu, vùng nguy hiểm, nhịp nào gây sát thương/choáng/nổ chính, lúc kết thúc; telegraph = VFX = hitbox (doc 76) | qaBench vẽ hitbox thật cạnh VFX |

## 2. Năm pha (bỏ pha nào thì ghi lý do trong template)
1. **Cast / Invocation**: vào thế riêng, dẫn năng lượng; cấu trúc bắt đầu hiện; ánh sáng + tiếng ngân mở dần.
2. **Duy trì / Multi-beat**: mỗi nhịp có phản hồi riêng, mạnh dần (sáng hơn, vật dịch/quay, hoạ tiết hiện, âm dồn lên).
3. **Cấu trúc đặc trưng (signature)**: vật thể/hình thái nhận ra ngay ở camera MOBA, không phải vài hạt lấp lánh.
4. **Impact đỉnh**: flash + shockwave/vòng phản quang, hit reaction + hiệu ứng trạng thái trên mục tiêu (choáng, hất…). Đây là lúc "wow" nhất.
5. **Decay / End**: vỡ, tan, mờ, tắt theo đúng fantasy; đuôi ngắn để chiêu không cụt.

## 3. Mười kiểm thử bắt buộc (mỗi R)
1. Xem trực tiếp trong engine (không chỉ PASS_MODEL). 2. Animation khớp timing hit. 3. Các nhịp khác nhau thật. 4. Cấu trúc đủ rõ ở camera MOBA.
5. Hiệu ứng trạng thái đúng vùng, đúng lúc. 6. VFX không che hết nhân vật/mục tiêu. 7. SFX đủ lực, không lẫn chiêu khác.
8. Performance khi nhiều R trong giao tranh đông (≤ 8 population/effect, bản mobile giảm số lượng). 9. Preview = telegraph = hitbox. 10. So trực tiếp với Q/W/E: R nổi bật hơn hẳn.
Nhãn kết quả giữ như cũ: PASS_MODEL / PASS_ENGINE (quan sát thật) / NOT_TESTED / creator duyệt.

## 4. Template mô tả R (viết TRƯỚC khi làm, đặt trong doc tướng hoặc doc 75)
```
R · <tên chiêu> · <hero_id>
fantasy:        một câu: người xem thấy gì, cảm gì
kit:            aim / radius|width|range / windup / delay / hits / hiệu ứng (đường dẫn heroes.yml hoặc candidates/*.yml)
phases:         cast t=0–? · nhịp 1 t=? · nhịp 2 t=? · đỉnh t=? · kết t=?  (giây từ lúc bấm)
hitbox:         hình + kích thước thật; nhịp nào gây gì
animation:      các beat: pose + chuyển động thân (gối, lưng, hông, tay, vũ khí); HIT từng nhịp
VFX layers:     mở · duy trì · impact · kết; signature structure; màu/bảng (el)
SFX:            cast · nhịp · đỉnh · tàn âm; vật liệu âm
material:       năng lượng | gương | đá | băng | khói | ký ức | ánh sáng | lai → shader hay mesh
camera read:    nhìn rõ ở camera MOBA ở đâu, khi nào; không che gì
performance:    số population, số hạt đỉnh, bản mobile
status:         PASS_MODEL / PASS_ENGINE / NOT_TESTED từng mục 1–10
```

## 5. Áp dụng
- Bách Diện R (đầu tiên, doc 57 lô C+): template ở doc 75 mục Bách Diện.
- Sau đó rà R của toàn roster đang chơi (doc 57 lô R), rồi mọi tướng mới qua template này trước khi làm.
