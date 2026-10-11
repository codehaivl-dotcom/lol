# Visual audit: structures, light and grade (2026-10-08)

Reviewer: harsh council, read-only. Bar: "would this ship in Arena of Valor / LoL". Refs: map1-1-ref2 (layout and mood), map1-1-ref1 (detail).
**These are preview looks from custom cameras, not a client PASS.** Sun shadows fit to the player's eye, so shadow judgements below need confirming in a real player frame.
Crew work on cliffs (art-wall-*), waterfalls (art-fall-*) and reeds (art-reed-*, art-bank-*) is **IN PROGRESS** and is not scored.

## Scores

| Item | Score /10 | One line |
|---|---|---|
| Towers (tower-blue-t1/t2, tower-red-t1/t2) | 4 | Thin ivory pole and a small crystal. Reads like a lamp post, not a lane objective. |
| Tâm Mạch nexus (nexus-blue, nexus-red) | 4 | The dais has the right idea, but the core is a white-hot blob with no facets and the base is under-detailed. |
| Fountains (fountain-blue, fountain-red) | 5 | Clean ring and good team cyan, but flat, with no sculpted centrepiece or water life. |
| Shop (shop-blue, shop-red) | 2 | A striped beach-kiosk awning on a wooden box, pushed against a rock. Wrong design language entirely. |
| Lanterns (bridge/lantern-*) | 3 | Knee-high sticks with a dot of green light. Invisible from the gameplay camera. |
| Free crystals (crystal.js placements) | 3 | Blown-out white shards with no colour identity. They pull the eye harder than heroes do. |
| Sun / sky / time of day | 5 | Flat 13.2 h noon light. No warm key versus cool fill, and no long shadows to model form. |
| Fog / aerial depth | 4 | Linear fog 120–520 never touches the play space (camera is about 25–40 m away). There is no depth layering like ref2. |
| Look script / grade / bloom | 4 | Exposure 1.18 plus bloom threshold 1 against HDR emissives of about 4: every crystal clips. Greens are oversaturated. |
| Blue vs red readability | 6 | Hue separation works (cyan versus crimson), but it lives only in small crystals and floor inlays. The structures themselves are team-neutral ivory. |

## Faults, ranked by impact

1. **Emissive and bloom blowout (nexus core, tower crystals, free crystals).**
   - Cause: the kit.js team glow is `blue [0.45, 2.6, 2.45]` and `red [2.9, 0.5, 0.95]`, multiplied by facet scale 0.7–1.45. That puts channel peaks at about 3.8–4.2.
   - Look-default adds exposure 1.18 and bloom with threshold 1.
   - The nexus core (`nexus-blue/core` at y=6, crystal.js h 3, r .95) also carries a point light `glow` with intensity 14 and distance 26.
   - Result: the cyan core tone-maps to white and its facets vanish. Tile 3 (around -22, 2, 4) shows a pure-white shard cluster.
   - Fix (material and grade): cap the glow peak at about 1.6, i.e. `blue [.25, 1.3, 1.25]` and `red [1.5, .25, .45]`. Keep the per-facet variance, but darken alternate facets to 0.35 so the crystal reads faceted.
   - Raise bloom threshold to about 1.3 and strength to about 0.25, so only the true cores bloom.
   - Drop the nexus point light to intensity about 5 and distance about 18.
   - Add an inner darker crystal (a non-emissive, glassy shell around the emissive core) so the core reads as light *inside* stone, the way the ref1 crystals do.
2. **Shop is off-style** (shop-blue at -49.5, 72.1; shop-red at 49.5, -72.1).
   - What reads cheap: a blue-and-white striped awning, a plain brown box, and a placement flush against cliff rock, so the front is half-hidden.
   - Fix: a Blender rebuild as an ivory-and-bronze pavilion matching the tower and nexus kit: a curved tiled roof, a gold trim band, a team-coloured banner, and a crystal display plinth. Note that a Dong Son drum motif may appear only as an accent.
   - Move it about 4 m off the rock face toward the fountain so the front faces the gameplay camera's yaw.
3. **Towers lack mass and silhouette.** The objective reads smaller than the bushes beside it.
   - Fix (Blender rebuild or tower.js scale):
     - widen the base plinth about 1.8× with a stepped, chipped ivory foundation (cracks and edge wear);
     - make the bronze cage wings bigger;
     - put a team-coloured cloth or metal banner and a trim band on the shaft, so team colour is on the *structure*, not only the crystal;
     - set the crystal at about 1.4× its current size, with lower emissive (see fault 1).
   - Target an AoV-scale read: the tower silhouette about 2.5× hero height, readable at a 26 m zoom.
4. **Lighting is flat noon.**
   - Fix (config):
     - set `timeOfDay` about 15.8–16.3 for a warm, low key and long shadows that model the towers;
     - add a cool hemisphere or ambient fill (blue-teal sky, warm ground bounce);
     - make sure the sun shadow is on and covers the full lane frame at max zoom (26 m).
   - Ref2 has golden rim light on ivory against teal shadows. That contrast is the entire mood, and the live scene has none of it.
5. **Grade.**
   - Saturation 1.06 pushes the terrain greens neon (tiles 1 and 3). Drop to about 0.95.
   - Pull the green hue toward yellow-olive and warm the temperature to about 0.08.
   - Add a subtle lift in the shadows toward teal and a split-tone highlight toward warm gold.
   - Keep the vignette at 0.22.
   - Fog: set near about 45 and far about 260, tinted pale teal, so the outer karst and sea recede the way they do in ref2.
6. **Nexus base under-detailed** (nexus-blue at -54.4, 54.4; scale y 0.85).
   - Fix (nexus.js): add carved relief depth (currently a flat band), bitten edges on the dais tiers, a glowing team inlay ring at reduced emissive, and 4–6 floating shards orbiting with a slow rotate behaviour.
   - Add a soft additive ground-glow decal (team colour, radius about 7 m) so the base reads from the wide shot.
7. **Lanterns invisible** (bridge/lantern-blue-a at world -19.87, 0, 2.6; the bridge scale is 0.5, which halves them).
   - Fix: rebuild them at about 2.2 m world height: a bronze post with a hanging lantern and a warm paper or crystal glow.
   - Use a small additive flame or glow sprite rather than a point light (perf), and compensate for the bridge's 0.5 scale.
8. **Fountain flat.**
   - Fix: add a central sculpted crane or Lạc fountain head (accent only) with falling water fx (n≤20 particles, mobile-branch), caustic scrolling on the water material, and a heal-zone rim glow pulsing slowly.
9. **Team readability.**
   - Structures are 90% neutral ivory. Add team trim to every structure's metal (cyan-teal bronze patina for blue, crimson-gold lacquer for red) and team banners.
   - Check hue against the river turquoise: the blue team cyan currently matches the fountain and river water, which muddies blue-side reads. Shift blue toward azure (h about 230).

## Seen, IN PROGRESS (crew)

- Waterfall and mist fx cover about 31% of one frame at peak, and the fx fill governor is engaged. The white puffs read as cotton wool over the cliffs (tile 1, around 0, 5, 10). Flag to the crew: cut size and alpha further and add streak sprites.
- Karst walls: rough, noisy, grey-dark rock with no ivory-limestone tone or vertical striation like ref2. Large dark masses dominate the gameplay frame around the shop and bridge.
- Reeds: not clearly assessable in these captures.

## Top 5 fixes

1. Tame the emissives and bloom: glow peak ≤1.6 with darker alternate facets, bloom threshold 1.3, nexus point light 14→5. This fixes the white-blown core.
2. Rebuild the shop as an ivory, bronze and team-banner pavilion and pull it off the rock.
3. Rebuild the towers for mass: a 1.8× stepped plinth, team banner and trim, a bigger crystal.
4. Relight: timeOfDay about 16, cool hemisphere fill, shadows on across the full zoom range, teal fog at 45–260.
5. Regrade: saturation 0.95, olive greens, warm highlights and teal shadows. Then do a real client PASS from the player's frame.
