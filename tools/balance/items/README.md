# Item balance workbench — candidate only

Current repair run uses9351e23c (latest fetched09/10) and doc63. `production.mjs` defaults to this pin; original simulator PIN remains historical for reproducibility. Use `bun tools/balance/production.mjs --portable --simulate` for the complete bundled lab. See `reports/production-2026-10-09/production-closure.md` and independent reviews; no engine balance approval is inferred.

Owner: Codex balance council. No runtime/gameplay changes. Requires Bun and the existing repo Git object `ad7948ab9710ac1adb2b561049821da8e0cb1da8`; reads it with `git show`, never resets or merges the working tree.

## Production lab audit — 2026-10-09

One reproducible command, current pinned runtime:

```powershell
bun tools/balance/items/production.mjs --commit dcdbfb3d3cfe83ae65ed91a85dd439dceeb38f90
```

Writes `reports/production-2026-10-09/items-lab`: 93 named assertions, 5,000 seeded transaction operations, two build profiles and three stat variants (90,000 controlled autoattack trials total, seed 1000–1299), JSON + CSV + a standalone SVG comparing starting physical durability. `summary.json` records complete source/tool hashes. `passive-replays.json` contains input event timelines and numeric outputs for all eight passive contracts.

`replay.mjs` derives counters, gaps, target switching, death resets, cast IDs, group cooldowns and eligible out-of-combat regeneration intervals from supplied events. It improves on caller-supplied contract probes. It still does not generate hit events from geometry, apply shields to an engine body, clamp healing to currentHP, simulate active effects over time or model hero skills. No engine integration or complete MOBA balance verdict follows from its PASS.

The simulator and unit suite also accept `--commit <full 40-character hash>` to compare any available pinned snapshot. The old default remains for historical report reproducibility. Candidate `sourceCommit` records its original design baseline; current report source records the actual runtime used. The new source changes Mị Đăng's basic from projectile range 9 m to melee range 1.6 m; stationary in-range trials cannot evaluate that gameplay change.

See [production item audit](../../../reports/production-2026-10-09/items-audit.md) for readiness and the three integration gates. Production lab is a local tool; candidate numbers remain proposals and runtime remains untouched.

```powershell
bun tools/balance/items/test.mjs
bun tools/balance/items/simulate.mjs --catalog tools/balance/items/candidate-v01.json --seed 1000 --n 30 --out reports/items-v01
bun tools/balance/items/simulate.mjs --budgets 500,2000,4000,7000 --variants tools/balance/items/sweep-example.json --out reports/items-sweep
```

Output `screen.json` contains source hashes, 24 actual-inventory stat rows (six heroes × L1/6/11/15), 60 pairwise controlled autoattack scenarios, censor counts, item physical/magic EHP per gold, copy saturation and eight shipped-ID vs candidate comparisons. `screen.md` gives a short table. `sweeps.json` gives separate candidate variants; change HP/armor/AD/AP/cost with overrides. When changing recipe cost, update combineCost and dependent recipe costs too; invalid accounting is refused.

`--build-profile core-only` is default. `core-plus-alternatives` tries ordered alternatives after core, up to six slots; this is a capacity screen, not a recommended situational build. CLI also writes the other profile JSON into the same report directory. Unused gold and occupied slots are recorded.

All eight passive triggers have pure event contract probes and fixtures: positive trigger, recursion from item rejected and cooldown rejected. These evaluate supplied event/counter/time facts and the numeric effect formula. They do not maintain the complete runtime event history or prove engine effects. Seven remain excluded from continuous combat, while the every-fourth bonus is included.

Each probe labels `valueStage` and `excludedRules`: damage is before hero tuning/resistance; regeneration is after antiheal but before maxHP clamp. Bell requires `event.effectType` heal/shield: antiheal affects healing after the multiplier, never shield capacity. Missing effect type leaves the value null rather than guessing.

Budget values after L1 are test scenarios, not gold earn rates or approved progression. Loadouts walk the specified core recipe deterministically, buying affordable nested ingredients; no automated claim of an optimal build. Allocated gold and spent gold differ and are both recorded.

## Formula scope

Base/growth/tuning/stat rounding/basic type/AP coefficient/armor and MR formula come from pinned files, their SHA256 included. AS multiplies each item. Candidate profile proposes AP/MR/moveSpeed item support that current runtime lacks. `stats(...,'ship')` skips those additions and flags them. Move speed does not influence a stationary in-range trial; AP only influences basic AP coefficients, not omitted skills. Support strength and mage spell builds therefore **cannot be ranked** by this screening.

Controlled scenario: all basic attacks connect immediately; fixed range, no kiting/skills/CC/waves/towers/projectile travel. Hero every-nth basic bonus included; bleed/after-ability/burn/active and conditional item effects excluded with explicit flags. Supported candidate every-nth physical bonus is typed independently of a magic basic. Its counter-gap/death reset is outside the uninterrupted trial. No engine replay, match duration, team winrate or production balance certification.

## Transaction fixtures

DAG/recipe accounting, full component credit, nested consumption without double credit, full-bag upgrade, insufficient-gold atomic failure, duplicate limits, single relic, refund60%, shared persistent relic cooldown, same-seed repeatability, golden runtime stat math. Current HP policy `keep_current_hp` on maxHP gain and clamp on loss is **proposal**; standalone fixture prevents buy/sell HP healing. Current shipped policy differs. Transaction functions model a pure proposed shop; position/dead-state/runtime ack are not engine-tested here.

Flagged passives/actives need separate event scenario or actual runtime consumer before their whole item can be balanced. The tool deliberately preserves this limitation instead of assuming the effect has no value.

Scenario guards require a positive finite uint32 seed, n as an integer in 1..1000, and a seed range that does not wrap. Both CLI and run() refuse NaN, Infinity, negative, zero or fractional inputs before simulation/output. Production command accepts --seed and --n explicitly.
