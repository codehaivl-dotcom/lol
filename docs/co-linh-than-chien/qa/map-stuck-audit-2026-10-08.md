# Mạch Giữa: stuck / fall audit 2026-10-08 (Savi, dev room, engine traverseCheck)

Method: flood fill over walkable ground (raycast to colliders + terrain), forward from the blue lane and reverse back to it;
a cell reachable forward but with no way back = trap. Whole map at 2 m (4-neighbour), river band and four alcoves at 1 m (8-neighbour).

Found:
1. Bridge underside: deck collider was a 0.6 m slab, its underside ~1.4–2.6 m over the riverbed; a hero wading in from the bank met a
   ceiling (traverseCheck reason `ceiling`, blockedBy bridge) and wedged against the rising bank. FIX: scripts/gen/bridge.js collider is
   solid to world y -4.5 (below riverFloor -3.2). The river now meets a wall at the bridge sides; no underpass.
2. Slot behind ruin pillar object/xd4dca5a99abcb4dc/13 at the blue bottom alcove (-10, 23..25): enterable by a drop, no way out.
   FIX: pillar moved into the cliff toe (-10.3, 0.9, 23.4). Mirror pillar /14 (red side) showed no trap.

After: 0 traps in the river band and all four alcoves at 1 m; whole-map 2 m pass found only #2 before its fix.
Outer sea (-5 m, behind the rim) is unreachable from the corridor.
Gameplay coordinates (map.yml) untouched. NOT a client PASS: a real-client walk of the banks, bridge sides and alcoves is NOT RUN.
Boss access: no boss pit exists in map.yml; neutrals are off in Mạch Giữa per council #24902. Open for creator decision.

## Pass 2 (same day, after creator ruling "tường bao sẽ ko làm nhân vật stuck" + ref1 1:1 direction)
- A short-lived ford (bridge removed) was replaced by the ref1 layout: bridge restored (scripts/gen/bridge.js, deck walk top y 0).
- Bridge parapet collider is now one solid wall per side, 1.2 m world (the carved-panel gaps let a body step off).
- River banks walled: scripts/gen/balustrade.js, four runs bank-wall-{blue,red}-{n,s} at ±9.2 m from the river centre (map.yml bankWall),
  each from the bridge parapet into the cliff; collider 1.3 m over ground, footing to -1.2. The water is unreachable; the bridge is the only crossing.
- Flood (raycast floor + traverseCheck, 1.5 m, ±30 m): water cells reached 0; blue→red crossing reachable; 1 flagged cell at (-10.5, 22.5),
  a cliff-toe slope the checker cannot stand on in any direction (reason gap, terrain only, no object). Treated as slope, not a slot: client NOT RUN.
- Client walk NOT RUN.

## Pass 3 (ref1 "làm như ảnh", same day)
- River continues as a gorge through the karst to the outer sea (scripts/terrain.js, map.yml gorgeHalf 6; lip ≤ 8.2 m, all inside bankWall 9.2). Art only; map.yml gameplay coordinates untouched.
- Lane paving widened 10 → 17 m (config.yaml lane-blue/lane-red path width); corridor/collision unchanged.
- Old cliff-end falls (art-waterfall-1..6 + feet) removed: their cliff became gorge, they hung in air. Six waterfall.js sheets (art-fall-9..14) now pour from the gorge walls.
- Flood (raycast colliders + traverseCheck, 1.5 m, ±40 m, from blue lane): 1229 cells reached, water cells reached 0, red side reachable over the bridge.
- Client walk NOT RUN. Visual acceptance NOT RUN.
