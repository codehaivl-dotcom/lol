# Visual audit: world & environment, Mạch Giữa (place main), 2026-10-08

Reviewer: harsh council, environment seat. The world was read-only for this review.
Bar: "would this ship in Arena of Valor / LoL". References: ref2 `/cdn/map1-1-ref2-u18jczyi7.webp` (layout and mood), ref1 `/cdn/map1-1-ref1-u42ebuyl8.webp` (detail).
Views used: wide [-45,38,45]→[0,0,0] fov 50; gameplay [-30,25,35]→[-20,0,20]; bridge [10,26,-14]→[2,-2,2]; blue base [-74,26,76]→[-60,0,58]; lane-side [-30,25,0]→[-20,0,-14]; isolated close looks at art-karst-1, art-karst-2, art-lac-statue-blue and art-guardian-blue.
**These are preview renders from the dev room. They are NOT a client PASS.** The creator's tab was parked during the review, and the fx fill governor was engaged (mist decks at ~25–31 % of frame).

## Verdict in one line
The lane paving and bridge medallion are nearly at the target language. Everything around them is not. The ground reads as a 2015 heightmap demo: smeared rock lumps, flat lawn green, blob mist, voxel-cube pines. The ref's identity was layered karst stacks, terraced water and dense lush edges. This map does not have it yet.

## Scores (1–10, AoV ship bar)
| # | Item | Score |
|---|------|------:|
| 1 | Terrain shape (relief, rim, cliffs) | 3 |
| 2 | Terrain materials (grass/rock/moss/mud) | 3 |
| 3 | Lane stone / paving | 6 |
| 4 | Banks & river edge | 3 (IN PROGRESS: art-bank-*, art-reed-*) |
| 5 | River / sea water | 5 |
| 6 | Bridge (0,0) | 6 |
| 7 | Karst pillars art-karst-* | 4 |
| 8 | Statues art-lac-statue-*, art-guardian-* | 5 |
| 9 | Trees / pines | 3 |
| 10 | Brushes | 4 |
| 11 | Mist / waterfall fx | 3 (waterfalls IN PROGRESS: art-fall-*) |
| 12 | Composition / sightlines | 3 |
| 13 | Scale vs hero (~2 m) | 4 |

## Faults, ranked by impact

### 1. Terrain rock lumps read as smeared clay, not karst (score 3)
- **What/where:** The heightmap "rock" relief rises as rounded, stretched mounds right against the lane: beside the bridge on both banks (≈(-8..8, ±6..14)), the big hill dominating the lane-side view (≈(-25,-8)), and the outer rim (sample (-80,80) = 12 m rock). In the wide shot the rim is a continuous jagged sawtooth wall.
- **Why it reads cheap:** The rock texture is stretched vertically along every steep face (planar UV on a heightmap), and it is the same beige-grey across the whole map. There are no vertical faces, no ledges, no strata, no AO at the foot. ref2 shows stacked vertical limestone columns with green caps and dark crevices; we show melted dough.
- **Fix:** Stop using heightmap slopes as cliffs. Clamp terrain.js relief near the lane to ≤1.5 m undulation, and drop the heightmap rim to a low shelf. Stand every cliff as Blender-built karst wall modules (the art-wall-* crew, IN PROGRESS) and seat them 0.5 m into the ground. Each module needs vertical fluting, overhangs, moss in crevices (vertex colour) and a dark AO foot band. Give the terrain rock material a triplanar or slope-blend so steep faces never stretch. If triplanar is not available, keep slopes under 45° wherever the rock material shows.

### 2. Ground materials: flat lawn green plus dark mud, no transition language (score 3)
- **What/where:** Large untextured-looking saturated green areas, e.g. around the blue base (≈(-60,58)), between the lane and the river (≈(-16,0) and (-20,20)). The mud at the river bed (0,0) = -3.2 m shows as near-black in the close frames.
- **Why:** AoV ground carries painted detail at 25 m: cracked paving fringes, grass tufts, flower specks, worn dirt where the lane meets grass, and pale bleached grass in the ref. Ours is one tint per material with hard material edges.
- **Fix:** In config terrain materials, add a second grass layer (yellow-olive worn grass) blended by distance-to-lane from map.yml; a 1.5–2 m dirt/cobble fringe along the lane edge; and moss as a broken noise layer, not a region. Lift the mud tint to a teal-silt (oklch ~0.45) so the river bed reads through the water and not as a hole. Raise grass luminance and lower its chroma toward the ref's sage (oklch ~0.62 0.09 130).

### 3. Composition and sightlines: the lobby hall leaks into the battlefield (score 3)
- **What/where:** `lobby-hall` (feet (31.1,26,31.1), bounds x/z 15.9–50, y 1–39.5) plus `art-karst-1/2` and `lobby-pillar` at (24–28, 27–31). In the wide shot the hall reads as a large dark-brown mass intruding from the upper right, and `visibleRange` is unset.
- **Why:** A match camera should frame the lane with a coherent vignette of cliffs, water and mist. A 34 m dark brown lobby building sitting on the corner breaks the fiction and pulls the eye.
- **Fix:** Move the Điện Vinh Danh stage out of the battlefield frustum (another cell well past the rim, or its own place), or hide it during loading/ingame. The behaviour already exists for bodies in sim.js; extend the same phase gate to the lobby set. Then refill that corner with a karst stack plus a waterfall to match the ref2 top-right.

### 4. Pines are voxel-cube clusters (score 3)
- **What/where:** The pine crowns from scripts/lib/pine.js (lane trees via gen/banyan.js, and karst caps) show as stacked flat green boxes in every view: lane-side (-30,0) left edge, and on art-karst-1/2 tops.
- **Why:** The ref's bonsai pines have layered needle pads with soft silhouettes, two-tone light and dark undersides. Box pads with one green and hard 90° edges read Minecraft, not AoV.
- **Fix:** Rebuild as one Blender bonsai-pine kit (3–4 variants, ~1.5k tris each). Pads should be flattened ellipsoid clusters with alpha-card or displaced needle edges, a vertex-colour gradient (dark underside to sunlit top yellow-green) and a twisted trunk with bark texture. Swap pine.js output for model rows and keep the same placements.

### 5. Mist and spray are white blobs (score 3; waterfalls IN PROGRESS)
- **What/where:** Mist/spray fx decks around the bridge banks and karst feet (bridge view: white confetti clusters at ≈(-6,4) and (8,-4)). Peak fill is ~31 % of frame, and the fill governor engages.
- **Why:** The sprites are small opaque white puffs scattered over dark rock, so they read as snow or paper litter. The ref's mist is low, wide, soft and only at the waterfall base and horizon.
- **Fix:** Cut puff count by ~60 %. Make each card 3–5× larger with alpha ≤ .12, tinted to the sky (pale cyan-grey) rather than pure white. Restrict them to waterfall bases and outside the rim, never over the walkable lane. Move the horizon mist to a fog/height-fog setting in the look instead of particles. This also clears the governor.

### 6. Banks: hard terrain step from grass to water (score 3; IN PROGRESS)
- Banks along the river (≈x ±4..10 near z 0) are a single slope of rock or mud into water. There are no boulders, no stone retaining edge, no reeds at the waterline, and no foam line. Only four `reed-clump` rows exist ((-13,-10), (-3,-15), (6,13), (20,6)).
- **Fix:** The art-bank-* crew should place a modular carved-stone bank wall (ref1 has bronze-capped stone balustrades along the water) with boulder clusters and reed beds every 4–6 m. Add a shallow foam/edge band to the water material where depth < 0.3 m.

### 7. Karst pillars art-karst-* (score 4)
- **What/where:** art-karst-1 (24,-6,27; 9.3×22×9.2 m) and art-karst-2 (24,-6,31; 15.5×30×14.2 m). Isolated, they are boxy octagonal prisms with flat facets, two tufts of cube pines and thin moss stripes. The base is buried at y -6 into a rounded terrain lump.
- **Why:** The ref's pillars are clusters of fused columns with vertical grooves, weathered tops and vines. Ours read as a single extruded polygon. The pair also sits on the lobby corner and is mostly hidden from gameplay views, so the map's signature element is absent from the lane camera.
- **Fix:** Rebuild in art/karst/build.py as fused clusters (3–7 columns, varied heights), vertical voronoi fluting, top erosion, hanging vine cards and a darkened wet base. Place 6–10 of them along the outer river and rim where the 25 m camera actually sees them (the ref's ring), not at (24,29).

### 8. Statues (score 5)
- art-lac-statue-blue (14.3 m) and art-guardian-blue (14.0 m): the silhouettes are correct and gold/ivory fits the ref. Faults:
  - Materials are flat gold with no patina, wear or trim contrast. The ref uses bronze-gold with verdigris and teal inlay.
  - The plinths are plain light boxes.
  - The surroundings in close frames are near-black, so the statues float with no ground contact (no rubble, roots or moss at the base).
  - The guardian's face and hands are low detail for a 14 m hero landmark.
- **Fix:** Add a verdigris layer (cavity mask baked in Blender) and teal inlay emissive lines on the motif bands. Give the plinths stepped tiers with Dong Son drum rings as an accent band only. Add base dressing (roots, broken slabs, moss). Place the statues so each frames a base corner as in ref2 (the guardian top-left over the blue side, the bird right).

### 9. Brushes (score 4)
- Brush patches read as dark round shrub blobs (bridge view, both sides of the lane). They lack the ref's tall reed-grass tufts with light tips, so stealth zones do not read as gameplay brush at a glance.
- **Fix:** Replace them with dense alpha-card tall grass (1.2–1.5 m), two-tone with bright tips and a wind sway in the material. Keep map.yml footprints exactly.

### 10. Scale vs hero (score 4)
- Hero ~2 m against rock mounds of 6–12 m hugging the lane, a 30 m karst, 14 m statues and a 34 m hall. Near the lane the mid-scale band (2–5 m: boulders, lanterns, balustrades, stumps) is nearly empty, so heroes stand in a void between the flat ground and giant lumps.
- **Fix:** Add a mid-scale prop band within 3–8 m of the lane: balustrade posts with crystal lamps (ref1), boulder clusters, broken pillars and roots. Keep the tall forms beyond 15 m from the lane centreline so they frame rather than crowd.

### 11. Water (score 5)
- The turquoise colour matches ref2. It reads flat: no depth gradient against the mud-dark bed, no flow direction under the bridge, no foam at waterfall bases or karst feet.
- **Fix:** Water material: lower opacity in the shallows with a lightened bed tint (see #2). Add flow normals along the river spline, and foam ring fx (low count) at waterfall impact points (IN PROGRESS crew).

### 12. Lane stone (score 6) and bridge (score 6)
- Lane: the pale ivory paving is the strongest surface. Its tiles are uniform with no wear, and it lacks the ref's gold inlay lines and cracked flagstone variety. The lane edge cuts straight into lawn green (see #2).
  - **Fix:** Paint a 2-tone flagstone texture with occasional cracked slabs and a thin gold-inlay trim along the lane edges.
- Bridge (0,0): the sun medallion is good. The deck is a flat slab and the railing is thin. The ref has stone arches with towers and crystal lamps, and the bridge reads as a landmark from 25 m. Ours reads as a paved strip, and the arches are hidden by the rock lumps pressing in on both banks.
  - **Fix:** Use heavier balustrades with four corner posts carrying crystal lamps (blue/red per side). Clear the rock lumps so the arch is visible from the match camera, and add a soft point light under the arch.

## IN PROGRESS (seen, not judged final)
- art-wall-*, art-fall-*, art-reed-*, art-bank-*: no rows with these ids were present in the place when queried. The waterfall fx (mist/spray) was visible. Only 4 reed-clump rows exist.

## Top 5 fixes
1. Replace heightmap cliffs and lane-hugging rock lumps with Blender karst wall/pillar modules and flatten relief near the lane (faults #1 and #7). This is the single largest gap to ref2.
2. Get the lobby hall (`lobby-hall` at 31,26,31) out of the battlefield frame and fill that corner with a karst stack and waterfall (#3).
3. Rework the ground material: worn-grass blend, lane dirt fringe, sage grass tone and a lighter river bed (#2, #11).
4. Rebuild the pines as a soft-pad bonsai kit, and the brushes as tall two-tone grass cards (#4, #9).
5. Re-author the mist as a few large, low-alpha, sky-tinted cards at waterfall bases plus height fog; add a 2–5 m prop band (balustrades, crystal lamps, boulders) along lane and bridge (#5, #10, #12).
