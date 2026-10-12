# 34 · Ma trận VO/SFX theo slot — roster 27

> **CURRENT ROUTING (2026-10-12):** Keep this document as the **VO/SFX specialist coverage template**, NOT the production roster. The legacy **27-hero** inventory and old input labels are historical; [105](105-hero-factory-multi-agent-workflow.md) + [104](104-full-approved-roster-production-master-plan.md) + [91](91-khoa-input-qwer-d.md) govern all 26 current approved heroes. No asset/audio is assumed complete just because a coverage row exists.

**Trạng thái:** `PROPOSAL / COVERAGE PLAN — NOT APPROVED FOR RECORDING OR INTEGRATION`. Chưa có line VO, phụ đề, cue, file âm thanh, quyền sử dụng hay binding runtime nào được duyệt trong tài liệu này.

**Phạm vi:** lập coverage gate cho roster 27 Cổ Linh theo các slot `passive`, `lmb`, `q`, `rmb`, `e`, `r` (tối đa 162 ô kiểm tra). Đây là kế hoạch nội dung/manifest; không mở khóa tướng, đổi gameplay, xác nhận event runtime hoặc tạo asset.

**Nguồn chuẩn:** kit chỉ lấy từ `scripts/lib/data/heroes.yml`; tên/role/slot label từ `data/roster-display-map.csv`; source-of-truth và ID theo [doc09](09-data-contract-va-roster.md). `data/legacy-source/` và `data/legacy-kits-v1.json` chỉ là tài liệu tham khảo theo README, không phải kit để chép lời thoại, cue hay cơ chế sang game mới. Doc15 là TODO trận 1v1; không đổi tên hoặc dùng làm tài liệu audio.

## 1. Creator locks và ranh giới

- VI/EN text; mặc định VI; V1 có VO tiếng Việt, transcript/subtitle VI khớp master và subtitle EN đã review. Không có English VO V1.
- Giọng, chất âm và nhịp phải phân biệt theo hình thể, class, vũ khí, lore và vai trò của từng Cổ Linh. Không ép mọi nhân vật thành một “giọng cổ Việt”; không dùng phương ngữ làm trò cười.
- VO/SFX không được bổ sung mechanic, tell, hit, status, target, range hay thông tin đội. Không phát cue nếu event tương ứng chưa tồn tại trong canonical kit/runtime và được owner xác nhận.
- Roster audio không mở rộng Slice 1.5: playable slice vẫn theo doc14. Tướng ngoài slice giữ trạng thái candidate; tài liệu này không bật họ trong lobby/build.
- Không chép line/cue từ kit tham khảo. Proposal audio chỉ có thể viết sau khi slot/effect hiện hành có nguồn canonical và mechanic owner xác nhận ngôn ngữ event.

## 2. Coverage matrix

Mỗi slot chỉ có thể chuyển từ `KIT_PENDING` sang script/cue work sau khi kit canonical có record tương ứng. Với kit hoàn chỉnh nhưng audio chưa được tạo, trạng thái là `AUDIO_NOT_AUTHORED`; không hiểu trạng thái đó là `NO_VO` hay `NO_SFX`. `N/A` chỉ được ghi khi source kit đã được duyệt xác nhận slot không tồn tại.

| `hero_id` | Tên VI | Role theo CSV | Kit trong `heroes.yml` | passive | LMB | Q | RMB | E | R | VO/SFX hiện tại |
|---|---|---|---|---|---|---|---|---|---|---|
| `moc_lam` | Mộc Lẫm | Đấu sĩ chống chịu | Có · Slice | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX đề xuất (`hero-sfx.yml`), chưa nối runtime; VO: AUDIO_NOT_AUTHORED |
| `kha_tan` | Kha Tàn | Đấu sĩ dồn sát thương | Có · Slice | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX đề xuất (`hero-sfx.yml`), chưa nối runtime; VO: AUDIO_NOT_AUTHORED |
| `hao_nhat` | Hạo Nhật | Đỡ đòn mở giao tranh | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `tinh_loi` | Tĩnh Lôi | Đấu sĩ cơ động, thiên về khiên và phản công | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `mi_dang` | Mị Đăng | Sát thủ phép thuật | Có · Slice | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX đề xuất (`hero-sfx.yml`), chưa nối runtime; VO: AUDIO_NOT_AUTHORED |
| `lam_nghi` | Lam Nghi | Hỗ trợ khống chế và bảo vệ | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `van_dao` | Vân Dao | Hồi phục/hỗ trợ | Có · Slice | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX đề xuất (`hero-sfx.yml`), chưa nối runtime; VO: AUDIO_NOT_AUTHORED |
| `nham_vu` | Nham Vũ | Xạ thủ | Có · Slice | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX đề xuất (`hero-sfx.yml`), chưa nối runtime; VO: AUDIO_NOT_AUTHORED |
| `loc_thao` | Lộc Thảo | Xạ thủ kiểm soát vùng | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `ngu_dang` | Ngư Đăng | Đỡ đòn mở giao tranh | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `cot_ben` | Cốt Bện | Đỡ đòn càn lướt | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `hoa_tuy` | Hỏa Tủy | Pháp sư dồn sát thương | Có · Slice | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX_PROPOSED | SFX đề xuất (`hero-sfx.yml`), chưa nối runtime; VO: AUDIO_NOT_AUTHORED |
| `sam_kha` | Sấm Kha | Đấu sĩ mở giao tranh | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `duc_nham` | Dực Nham | Xạ thủ cơ động | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `bach_dien` | Bách Diện | Sát thủ | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `nanh_nui` | Nanh Núi | Đỡ đòn phản công | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `kinh_ngon` | Kính Ngôn | Hỗ trợ phép thuật | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `mac_lien` | Mặc Liên | Pháp sư dọn giao tranh | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `tam_vu` | Tầm Vũ | Xạ thủ tầm xa | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `han_chi` | Hàn Chi | Pháp sư khống chế | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `tam_dau` | Tam Dấu | Hỗ trợ phép thuật đa dụng | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `thach_ho` | Thạch Hộ | Đỡ đòn bảo kê | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `trac_nham` | Trắc Nham | Pháp sư chiến trường | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `sac_nhien` | Sắc Nhiên | Pháp sư vùng | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `huong_mai` | Hương Mai | Hồi phục và hỗ trợ | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `sa_tan` | Sa Tẫn | Hồi phục/khống chế theo thời điểm | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |
| `van_an` | Vân Ấn | Đấu sĩ cận chiến | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | KIT_PENDING | Chưa khóa kit; không viết line/cue |

Trạng thái hiện tại: 6 kit có trong slice YAML; 36 ô có SFX ở `SFX_PROPOSED` (2026-10-08, §2b), VO của 36 ô vẫn `AUDIO_NOT_AUTHORED`; 21 kit candidate chưa có trong canonical YAML và 126 ô chưa được mở để author. Bảng slot là coverage tracker, không xác nhận passive của candidate sẽ tồn tại. Khi kit xác định một slot absent, thay đúng ô bằng `N/A · source ref` sau khi gameplay owner ký.

## 2b. SFX_PROPOSED — 6 tướng Slice (2026-10-08)

Nguồn: `scripts/lib/data/hero-sfx.yml` (base `/cdn/moodboard-painterly-fantasy/`), tra bằng `heroSfx(hero, key)` ở `scripts/lib/hero-sfx.js`. Chỉ SFX; **VO cả 36 ô vẫn `AUDIO_NOT_AUTHORED`**. 48 file đã sinh trên CDN và đo (ffprobe/volumedetect, 0,2–2,0 s, không im lặng); chưa nghe trong client, chưa nối runtime (hero.js/bot.js vẫn phát tiếng chung) → chưa `INTEGRATED`. Bảy tên lần đầu dài quá 2 s đã thay bằng bản `-v2` ngắn.

| hero | giọng chất liệu | key | file | dài (s) | mean / max dB |
|---|---|---|---|---|---|
| `moc_lam` | đồng thau + khiên đá, nước bờ sông | lmb | `sfx-broad-bronze-short-blade-chop-against-stone-shield-clang.mp3` | 1.51 | -21.3 / -7.5 |
| `moc_lam` | đồng thau + khiên đá, nước bờ sông | q | `sfx-stone-shield-bash-charge-crashing-into-river-rock.mp3` | 1.15 | -15.3 / -4.9 |
| `moc_lam` | đồng thau + khiên đá, nước bờ sông | rmb | `sfx-quick-stone-shield-raised-jade-crystal-ring-short-v2.mp3` | 1.03 | -24.6 / -1.7 |
| `moc_lam` | đồng thau + khiên đá, nước bờ sông | e | `sfx-broad-blade-spinning-sweep-through-dry-reeds-whoosh.mp3` | 1.49 | -25.8 / -6.6 |
| `moc_lam` | đồng thau + khiên đá, nước bờ sông | r | `sfx-giant-stone-shield-slammed-into-earth-crack-boom.mp3` | 1.37 | -14.1 / -2.8 |
| `moc_lam` | đồng thau + khiên đá, nước bờ sông | passive | `sfx-heavy-bronze-blade-third-strike-cracking-stone-crunch.mp3` | 1.51 | -19.5 / -10.8 |
| `moc_lam` | đồng thau + khiên đá, nước bờ sông | hit | `sfx-bronze-blade-hit-on-stone-armor-thunk.mp3` | 0.50 | -20.9 / -6.2 |
| `moc_lam` | đồng thau + khiên đá, nước bờ sông | death | `sfx-stone-shield-dropping-and-cracking-rubble-crumble.mp3` | 1.08 | -24.0 / -8.7 |
| `kha_tan` | sắt nặng + xích tinh thể | lmb | `sfx-hooked-iron-halberd-heavy-swing-whoosh-and-chop.mp3` | 0.74 | -22.0 / -8.6 |
| `kha_tan` | sắt nặng + xích tinh thể | q | `sfx-iron-scythe-wide-sweep-ringing-metal-scrape.mp3` | 1.13 | (đo lại sau đổi tên) |
| `kha_tan` | sắt nặng + xích tinh thể | rmb | `sfx-quick-iron-lunge-slash-tearing-sinew.mp3` | 0.74 | -26.4 / -8.8 |
| `kha_tan` | sắt nặng + xích tinh thể | e | `sfx-quick-crystal-chain-hook-throw-and-yank-short-v2.mp3` | 1.22 | -26.9 / -10.3 |
| `kha_tan` | sắt nặng + xích tinh thể | r | `sfx-massive-iron-cleaver-execution-chop-with-metal-ring.mp3` | 1.63 | -20.7 / -5.8 |
| `kha_tan` | sắt nặng + xích tinh thể | passive | `sfx-iron-hook-tearing-flesh-blood-drip-squelch.mp3` | 1.10 | -27.0 / -6.9 |
| `kha_tan` | sắt nặng + xích tinh thể | hit | `sfx-iron-halberd-hit-on-armor-clank.mp3` | 1.22 | -24.9 / -2.8 |
| `kha_tan` | sắt nặng + xích tinh thể | death | `sfx-heavy-iron-armor-and-chains-collapsing-clatter.mp3` | 1.49 | -21.7 / -5.1 |
| `mi_dang` | đèn kính + lửa ma tím, thì thầm | lmb | `sfx-ghostly-purple-will-o-wisp-spark-flick.mp3` | 1.03 | -26.2 / -4.9 |
| `mi_dang` | đèn kính + lửa ma tím, thì thầm | q | `sfx-glass-lantern-thrown-spinning-swoosh-ghost-flame.mp3` | 1.63 | -24.2 / -3.7 |
| `mi_dang` | đèn kính + lửa ma tím, thì thầm | rmb | `sfx-shadow-dagger-dash-slash-with-eerie-whisper.mp3` | 0.67 | -24.2 / -7.2 |
| `mi_dang` | đèn kính + lửa ma tím, thì thầm | e | `sfx-quick-hypnotic-glass-chime-ghost-lure-short-v2.mp3` | 0.84 | -26.0 / -14.9 |
| `mi_dang` | đèn kính + lửa ma tím, thì thầm | r | `sfx-three-quick-shadow-blinks-with-dagger-swishes.mp3` | 1.56 | -23.9 / -5.0 |
| `mi_dang` | đèn kính + lửa ma tím, thì thầm | passive | `sfx-spirit-flame-ignite-flare-on-dagger.mp3` | 0.79 | -22.4 / -7.2 |
| `mi_dang` | đèn kính + lửa ma tím, thì thầm | hit | `sfx-ghost-flame-hit-crackle-and-glass-tinkle.mp3` | 1.30 | -17.5 / -4.1 |
| `mi_dang` | đèn kính + lửa ma tím, thì thầm | death | `sfx-lantern-glass-shattering-and-flame-snuffed-out.mp3` | 1.18 | -26.5 / -5.7 |
| `hoa_tuy` | than/dung nham, thiên thạch | lmb | `sfx-flying-burning-coal-ember-whoosh.mp3` | 1.37 | -22.7 / -3.9 |
| `hoa_tuy` | than/dung nham, thiên thạch | q | `sfx-erupting-lava-pillar-roar-from-ground.mp3` | 1.97 | -21.7 / -4.3 |
| `hoa_tuy` | than/dung nham, thiên thạch | rmb | `sfx-hot-coal-bolt-sizzle-and-spark.mp3` | 1.49 | -27.4 / -9.8 |
| `hoa_tuy` | than/dung nham, thiên thạch | e | `sfx-blast-of-hot-air-heat-wave-whoosh.mp3` | 1.32 | -26.6 / -10.9 |
| `hoa_tuy` | than/dung nham, thiên thạch | r | `sfx-falling-meteor-whistle-and-fiery-explosion-impact.mp3` | 1.78 | -15.3 / -8.6 |
| `hoa_tuy` | than/dung nham, thiên thạch | passive | `sfx-flesh-burn-sizzle-crackling-fire.mp3` | 1.90 | -26.4 / -5.5 |
| `hoa_tuy` | than/dung nham, thiên thạch | hit | `sfx-molten-ember-impact-hiss.mp3` | 1.13 | -22.6 / -6.6 |
| `hoa_tuy` | than/dung nham, thiên thạch | death | `sfx-quick-magma-core-cracking-into-rock-hiss-short-v2.mp3` | 0.74 | -23.5 / -3.5 |
| `nham_vu` | dây cung + tên sỏi/hổ phách, chim tinh thể | lmb | `sfx-composite-bow-string-twang-with-stone-arrow-whoosh.mp3` | 0.77 | -26.0 / -10.7 |
| `nham_vu` | dây cung + tên sỏi/hổ phách, chim tinh thể | q | `sfx-three-arrows-loosed-at-once-bowstring-snap.mp3` | 0.74 | -21.7 / -4.5 |
| `nham_vu` | dây cung + tên sỏi/hổ phách, chim tinh thể | rmb | `sfx-bowstring-drawn-creaking-and-heavy-amber-arrow-release.mp3` | 1.85 | -25.4 / -1.0 |
| `nham_vu` | dây cung + tên sỏi/hổ phách, chim tinh thể | e | `sfx-crystal-bird-wings-flapping-and-leap-whoosh.mp3` | 1.82 | -25.9 / -3.7 |
| `nham_vu` | dây cung + tên sỏi/hổ phách, chim tinh thể | r | `sfx-powerful-piercing-arrow-shot-sonic-crack.mp3` | 0.70 | -23.1 / -5.7 |
| `nham_vu` | dây cung + tên sỏi/hổ phách, chim tinh thể | passive | `sfx-heavy-pebble-arrowhead-thud-into-target.mp3` | 0.77 | -28.2 / -1.8 |
| `nham_vu` | dây cung + tên sỏi/hổ phách, chim tinh thể | hit | `sfx-stone-arrow-hitting-armor-thwack.mp3` | 0.67 | -21.0 / -4.8 |
| `nham_vu` | dây cung + tên sỏi/hổ phách, chim tinh thể | death | `sfx-wooden-bow-dropped-on-rocks-clatter-and-string-snap.mp3` | 0.60 | -23.4 / -5.3 |
| `van_dao` | gió/mây/sét | lmb | `sfx-forked-lightning-wind-bolt-zap.mp3` | 1.90 | -26.6 / -11.0 |
| `van_dao` | gió/mây/sét | q | `sfx-quick-storm-cloud-thunder-rain-burst-short-v2.mp3` | 1.51 | -18.8 / -2.6 |
| `van_dao` | gió/mây/sét | rmb | `sfx-wind-seal-gust-binding-whoosh.mp3` | 1.37 | -21.2 / -7.9 |
| `van_dao` | gió/mây/sét | e | `sfx-quick-swirling-wind-barrier-whoosh-short-v2.mp3` | 0.98 | -24.6 / -9.1 |
| `van_dao` | gió/mây/sét | r | `sfx-huge-storm-wind-wave-blast-gust.mp3` | 1.44 | -24.9 / -12.6 |
| `van_dao` | gió/mây/sét | passive | `sfx-crackling-lightning-arc-strike.mp3` | 1.44 | -26.5 / -10.4 |
| `van_dao` | gió/mây/sét | hit | `sfx-gust-of-wind-impact-with-electric-snap.mp3` | 0.67 | -24.6 / -9.3 |
| `van_dao` | gió/mây/sét | death | `sfx-quick-wind-gust-fade-and-staff-clatter-short-v2.mp3` | 0.89 | -24.6 / -12.4 |

## 3. Hợp đồng mỗi slot khi đủ nguồn

Không đưa một dòng vào recording queue nếu thiếu bất kỳ trường bắt buộc nào sau đây:

| Trường | Nội dung cần chốt | Quy tắc khóa |
|---|---|---|
| Source join | `hero_id`, `slot`, đường dẫn row `scripts/lib/data/heroes.yml`, `data_version`/revision, string/ability label CSV | Không join bằng `reference_id`, display name hoặc thứ tự roster. |
| Kit fact | Tóm tắt hiệu ứng đã duyệt, mục tiêu/sự kiện resolve thực tế, điều kiện cast/proc/expire/cancel/miss nếu có | Chỉ lấy từ canonical kit và event owner; không dựng mechanic để hợp lời/âm. |
| Voice | `voice_id`, VI line, speaker/voice direction, trigger owner, pronunciation, actor, take/master, duration, rights, mix review | ID theo 09 §8: `voice.<speaker_id>.<event_id>.<variant>`. Mọi lời hiện là proposal cho đến khi narrative + gameplay owner duyệt. |
| Subtitle | `subtitle_string_id`, transcript VI, adaptation EN, locale, string review, cue in/out sau khi master đã khóa | Dùng key theo 09 §6: `hero.<hero_id>.voice.<cue_id>.subtitle`; VI trùng transcript. Text key không phải asset ID. |
| SFX | `sfx_asset_id`, `event_id`, cue intent, layer/type one-shot/loop, in/out theo event, priority/mix, listener/visibility rule, rights/master/hash | `event_id` phải có trong runtime contract; không dùng tên sự kiện tự đặt làm API. Asset ID, file path và event ID là ba trường riêng. |
| Liên kết hình/động tác | ID tham chiếu animation/VFX đã được duyệt (doc25/30), material/vũ khí nếu cue phụ thuộc | Không tạo lại VFX/animation trong doc âm thanh; không buộc cue phải có visual/mechanic mới. |
| Trạng thái/duyệt | `KIT_PENDING`, `SCRIPT_PROPOSAL`, `CUE_PROPOSAL`, `OWNER_REVIEW`, `APPROVED_FOR_RECORD`, `RECORDED`, `INTEGRATED`, `N/A_APPROVED`; owner và version | Không gọi `ready` chỉ vì có lời/cue mô tả. `N/A_APPROVED` cần source kit xác nhận slot absent. |

## 4. Trigger, spam guard và mix contract

Đây là quy tắc thiết kế/QA đề xuất; các nhãn sự kiện dưới đây không phải API hiện hữu.

1. **Active cast:** VO/SFX cast chỉ sau khi lệnh được kit/runtime chấp nhận. Aim/hold/preview không phát cue cast; nếu hold/release là mechanic thì trigger thuộc event release đã duyệt. Cast bị từ chối, cancel, miss, interrupt hoặc expire chỉ có cue nếu authoritative event tương ứng tồn tại và được owner yêu cầu.
2. **Passive:** chỉ phát trên proc đã resolve trong kit; không gắn voice/SFX vào từng stack/hit trừ khi design/audio owner khóa rõ một event có giới hạn tần suất. Không tạo passive/audio cho ô candidate đang `KIT_PENDING`.
3. **LMB:** không VO ở mọi đòn liên tiếp. Voice bank/first-eligible cadence và giới hạn đồng thời phải được Audio ADR chốt; cue SFX gắn nhát/resolve thật và không lặp mỗi frame.
4. **Multi-stage ability:** projectile launch/travel/hit, vùng start/tick/end, shield apply/break, heal apply, kill/reset chỉ được tách cue khi mechanic/runtime có event tương ứng. Không phát hit-confirm khi đòn trượt; không phát heal/shield/kill cue chỉ theo animation.
5. **Priority đề xuất:** gameplay tell bắt buộc và objective đã duyệt → hit/resolve thiết yếu → VO skill → SFX đánh lặp → UI/ambience/music. Không duck tell hoặc thông tin gameplay để ưu tiên câu thoại. Thứ tự cần audio/runtime owner ký và chứng minh được trên target.
6. **Spam/dedupe:** passive và LMB dùng gate/voice bank; cue one-shot dedupe theo event instance; loop gắn lifetime effect và dừng khi effect kết thúc. Không đặt số giây cooldown, simultaneous voice count, queue/steal, ducking, LUFS, peak, codec hay sample rate trong tài liệu này; audio/platform owners nhập chúng vào Audio ADR.
7. **Accessibility/visibility:** subtitle thoại tách khỏi caption SFX; EN UI vẫn có VO VI và subtitle EN; cho phép subtitle thoại bật/tắt theo locale setting đã duyệt. Sound/caption không tiết lộ đối thủ ngoài quy tắc visibility. Tell thiết yếu có biểu đạt hình/HUD/ping được duyệt, không phụ thuộc màu hay âm thanh đơn lẻ.

## 5. Hướng thiết kế âm thanh theo hero

Mục tiêu là khác biệt ở vật liệu, transient, không gian, giọng và nhịp — dựa trên concept, vũ khí, class và lore của doc03. Đây là worksheet cho sound direction, không phải cue assignment. Chỉ thêm câu/cue cụ thể trong từng slot sau khi slot có kit canonical và chủ sở hữu duyệt.

| Design input | Cách dùng trong audio review |
|---|---|
| Silhouette/body plan + locomotion | Chọn trọng lượng/nhịp thở/chuyển động chỉ khi animation/audio source xác nhận; không gán tiếng sinh vật hoặc anatomy dựa riêng vào motif. |
| Weapon/grip/material | Chọn chất liệu/transient phù hợp với vũ khí thực ở doc03/weapon source; không lấy tên vũ khí trong legacy bundle làm bằng chứng. |
| Class/role | Điều chỉnh nhịp VO, khoảng thở, độ chắc/linh hoạt; không biến toàn bộ tank thành giọng trầm hoặc healer thành giọng dịu. |
| Lore/faction | Chọn motif cá nhân có chủ đích; họa tiết/nhạc cụ Việt cổ chỉ là điểm nhấn đã được duyệt, không làm âm thanh mọi tướng giống nhau. |
| Mechanics + VFX/animation ref | Khớp âm với event/effect có thật; âm thanh không tự thêm hit, CC, heal, shield, range hoặc target cue. |

## 6. Handoff/acceptance khi creator bật production

| Gate | Điều kiện đóng | Evidence |
|---|---|---|
| AUDIO-ROSTER-01 · Source coverage | 27 ID khớp CSV/03; slot hiện diện hoặc `N/A_APPROVED` đối chiếu canonical kit; candidate vẫn bị khóa theo scope. | Roster diff, kit source revision, owner sign-off |
| AUDIO-ROSTER-02 · Script/LOC | Mỗi applicable slot có line VI hoặc owner-signed `NO_VO`, subtitle transcript VI/EN, cue context, pronunciation và review owner; không copy legacy line. | Localization export + narrative/gameplay approval |
| AUDIO-ROSTER-03 · SFX/event | Mọi cue nối đến event runtime đã xác nhận, source row, owner, VFX/animation ref khi cần; ID unique, không mồ côi/trùng. | Versioned event manifest + event trace |
| AUDIO-ROSTER-04 · Mix/accessibility | Spam, priority, concurrency, mute, visibility, caption/subtitle, device/platform matrix và mix values có Audio ADR được duyệt. | Signed Audio ADR + listen/accessibility capture |
| AUDIO-ROSTER-05 · Asset/provenance | Master/takes, consent/rights, processing notes, checksum, path/CDN receipt, revision và locale đầy đủ. | Signed asset manifest + receipts |
| AUDIO-ROSTER-06 · Runtime | Engine playback, localization, voice/SFX routing, stop/dedupe và output được kiểm thử trên release build; không dựa vào docs là bằng chứng hỗ trợ. | Build/version + event log + audio/locale capture |

Tất cả gate hiện là `NOT RUN`; tài liệu không tự xác nhận runtime/audio capability. Lời thoại hoặc cue không được xem là production-ready nếu kit source, owner approval, translation review, event contract, rights, Audio ADR, media files và runtime evidence còn thiếu.

## 7. Liên kết

- [03 · Roster và tạo hình 27 Cổ Linh](03-danh-sach-tuong.md)
- [05 · Từ điển và localization VI–EN](05-tu-dien-viet-hoa.md)
- [09 · Data contract và roster](09-data-contract-va-roster.md)
- [11 · Acceptance và bàn giao](11-acceptance-ban-giao.md)
- [14 · TODO + luật sảnh Slice 1.5](14-todo-lobby-va-playtest.md)
- [25 · Kế hoạch động tác theo vóc dáng, class và vũ khí](25-dong-tac-theo-tuong.md)
- [26 · Hồ sơ sản xuất phim lore](26-video-lore-intro.md)
