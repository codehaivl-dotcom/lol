# Visual audit: characters, creatures & HUD, 2026-10-08

Reviewer: council wisp (read-only). Bar: "would this ship in Arena of Valor?" Scores are 1–10.
**Evidence:** custom-camera scene renders with `reference=` map1-1-ref1/ref2 and concepts 01–11, plus 1280×720 Playwright screenshots of the real lobby UI (home, Tướng tab, 4 heroes, the "Thử tất cả" skill demo).
**Not a client PASS:** custom cameras are not what a player sees. I could not capture the **in-match HUD** (the room was in lobby, and starting a match would have disrupted the creator's room). The creator's tab was parked, so `look ui` returned an empty DOM. In-match HUD scoring is therefore source-only and marked UNVERIFIED.
**Lane minions:** zero active at query time (lobby). Judged from `scripts/lane.js` BODY and the gallery 03/04 models they derive from, not from a lane capture.
**Other crew (IN PROGRESS, not scored):** art-wall-*, art-fall-* and art-reed-*/art-bank-*. In the gameplay and wide shots the lane edges still read as lumpy grey noise-rock mounds with grass blobs, and there are no waterfalls in frame yet.

## Scores
| Item | Score | One-line verdict |
|---|---|---|
| Lobby / hero-select UI chrome | 7 | Closest thing to AoV in the build: gold-on-navy frames, logo, role filters, and kit tags all read. Let down by the 3D stage behind it. |
| Hero bodies (6) | 5 | Generated bodies look high-res on a portrait card, but under the camera they read dark, muddy and soft-silhouetted. Weapons float. |
| Lobby stage environment | 4 | Blocky low-poly pillars, blurry textures, grey smoke puffs, and a sky-and-crystal backdrop where the brief asks for "bản đồ arena phía sau". |
| Minh Ước gallery 03–05, 07 | 5 | Recognisable vs concept, but darker and flatter. The painted texture detail is lost and there is no rim/emissive read. |
| Minh Ước 06, 08, 09, 10 | 3 | Silhouette breaks from the concept (see below). |
| Minh Ước 11 whale | 4 | Reads as a whale; no celestial staging. |
| Gallery staging (x0z1, z≈100) | 3 | Tiled pad on a bare cliff over the sea: a dev showroom, not a presentation. |
| Lane minions (source) | 4 (unverified) | Derived from 03/04 by recolor. At 17 m camera height they will read as small dark blobs (see fix 3). |
| Skill VFX (lobby demo) | 3 | Mị Đăng demo: poses play, but in 4 frames over ~3.6 s no lantern, trail or mark was visible at stage distance. |
| In-match HUD | n/a (unverified) | Same token set as the lobby (`ui-theme.js` gold, `#4fd8ff`/`#ff5560` team colours, `#0b1020` panels), so it is likely consistent. Needs a live capture. |

## Faults, ranked by impact

1. **Hero model pop-in on the lobby home.** The first frame after joining showed an empty dais with the Mộc Lẫm card already up. The body appeared within ~6 s. In AoV the hero never appears after the UI. *Fix:* keep the dais "summon" FX (light column + crystal shards) running until the model's `bounds` is non-null, then fade the body in with a `dissolve` 1→0 over 0.4 s. Every BODY glb is 2–9 MB, so also preload the selected BODY on arrival.
2. **Hero materials are too dark and low-contrast for a 56° MOBA camera.** Mộc Lẫm at the lobby stage (~31, 27, 31.5) is near-black armour with a dark-green coat; the portrait card is steel-blue and bronze. Nham Vũ (1.75 m) is brown-on-brown with no readable bow. At gameplay zoom these collapse into dark blobs; AoV heroes carry one bright, saturated identity colour plus a rim. *Fix:* per-hero material override on the model slots: base colour lifted ~25 % toward the portrait palette, metalness ≤ 0.6 with roughness 0.35–0.5 on the plate slots so the sun reads, and a team-coloured fresnel rim (scripted material or emissive edge) in match. Add a soft key light on the lobby stage from camera-left (point light, intensity ~2, warm) plus a cool rim from behind.
3. **Weapons are not gripped.** Mộc Lẫm's sword hangs vertically in front of the thigh, clipping the coat, and the shield floats off the forearm (Tướng tab, idle). Hỏa Tủy's staff reads OK. *Fix:* re-seat in `scripts/lib/data/grips.yml` / `weapons.yml` for moc_lam: sword in RightHand with the blade angled down and back ~30°, shield seated on LeftForeArm with a 2–3 cm overlap. Verify in the idle and the salute gesture.
4. **Lobby stage reads cheap behind good UI.** Square-section low-poly pillars with blurred banner textures (left), grey `smoke-puff` brazier smoke (a dull grey, not warm), the balustrade as the only horizon, and a floating crystal slab. Design.md asks for a hall "có bản đồ arena phía sau". *Fix:* rebuild the pillars in `gen/hall.js` with chamfered bevels and gold-inlay trim, and use a crisp 1k texture. Recolour the brazier smoke to an additive warm ember/flame (`hdr` flame + ember pops, no grey). Frame the shot so the Mạch Giữa map sits behind the hero (camera yaw toward the lane in `SHOTS`), with a light depth-of-field look on the background.
5. **Gallery creatures 06/08/09/10 break their concept silhouette.** 06 monkey reads squat, dark and angular where the concept is a tall heroic stance. 08 serpent stands as an upright compact coil where the concept is a long S-arc. 09 golem is narrow where the concept is broad and massive with a tree crown. 10 crane is a thin vertical with wings folded; its defining wide wings and halo are missing. *Fix:* Blender rebuild from `art/minh-uoc/<nn>/build.py`. 06: extend the leg and torso proportions ~1.2× and open the stance. 08: re-pose the rest/idle as a horizontal S-curve ~2.5× its height. 09: widen the shoulders and chest 1.4× and enlarge the crown. 10: pose the idle with wings half-spread and add the halo ring as a separate emissive mesh. Each rebuild needs a proof against its concept sheet before upload.
6. **Creature textures lose the concept's painted detail.** The concepts carry ivory porcelain, gold filigree and glowing teal veins. In-engine (03, 04, 05, 07) they read as a flat mid-tone with no glow, and `recolor.py` only shifts hue. *Fix:* split an emissive mask (the teal/crimson vein band the recolor already computes as `m`) into an emissive texture at intensity ~1.5. Add a normal/AO bake from the high-poly in `build.py`. Set the gold areas to metalness ~0.8, roughness 0.3.
7. **Lane minions will not read at gameplay zoom (source judgement).** The 03/04 recolors depend on hue-only team difference over a dark base. Reference ref1 shows minions with bright team-blue and red cloth plus a light ivory body. *Fix:* in addition to the emissive mask (fault 6), scale minions so the melee unit is ~1.1–1.3 m tall on screen, add a team-coloured ground decal ring under each, and do a live gameplay-camera capture before calling it done.
8. **Skill VFX not readable in the lobby demo.** In "Thử tất cả" (Mị Đăng), 4 frames over ~3.6 s showed body motion only. *Fix:* check that the `skillfx.js` lobby path emits at stage scale. Bump the lantern and mark sprites to ≥ 0.6 m with additive `hdr` colour ≥ 3, and add one light per cast (≤ 1 at a time, fx budget).
9. **Gallery staging (x0z1, pad at x=2, z=101).** Bare tiled pad, no plinths, no labels, no lighting, cliff and sea behind. *Fix:* one plinth per creature (gen/dais.js with team trim), a nameplate `ui` panel per plinth, and a warm spot plus cool rim per hero creature. Or, since 04–11 are roadmap previews, hide the island in live mode (`visibleTo: "editors"`) until it is staged.
10. **Thuồng Luồng preview (`thuong-luong-preview`, x0z0) on the lane, wide shot.** It reads as a flat, cyan, plastic-looking ribbon on the plaza at the lane's centre circle, and it blocks the map's focal point. *Fix:* if it is only a preview, move it off the lane or make it editors-only. Otherwise apply a scale material plus emissive fins.
11. **Nham Vũ scale.** At h 1.75 she reads ~20 % smaller than Hỏa Tủy and Mộc Lẫm on the same dais. A marksman needs a bow silhouette larger than the body width. *Fix:* weapon scale ×1.3 and BODY h to 1.85 (visual only; the capsule stays unchanged).

## HUD note (lobby verified, match unverified)
The lobby UI does hold one language: gold frames, navy panels, cyan CTAs, role chips and kit chips. Faults:
- The home screen's left column (logo + one sentence + CHƠI) floats on the 3D with no backing panel, so the body text sits on a bright sky (legibility).
- The "Mời bạn bè…" helper line is dev copy on a release screen.
- The Tướng-tab hero grid shows portraits at ~60 px with no rarity or role frame.
*Fix:* add a translucent navy gradient panel behind the left column, drop or relocate the helper line, and add role-icon corners to the grid tiles. In-match HUD needs a live capture in a solo Sân Tập match before scoring.

## Top 5 fixes
1. Lift the hero materials (fault 2): brighter base colour, PBR plate response, team rim, stage key/rim lights.
2. Rebuild the silhouettes of creatures 06/08/09/10 to their concepts in Blender, with a proof against each sheet (fault 5).
3. Add emissive and normal maps to the Minh Ước/minion textures, plus minion team readability (faults 6–7); then do a live lane capture.
4. Remove the lobby hero pop-in with a summon FX and dissolve-in, and preload the selected BODY (fault 1); re-seat Mộc Lẫm's sword and shield (fault 3).
5. Rebuild the lobby stage backdrop: beveled pillars, warm brazier FX, the arena map framed behind the hero (fault 4).
