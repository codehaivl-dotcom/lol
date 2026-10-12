# HANDOFF.md — COLINH Hero Factory: current handoff

**Updated:** 2026-10-12  
**Owner instruction:** Stop serial five-hero audit batches. Open all **26 approved champions** to parallel multi-agent production, governed by the **single workflow authority: Doc 105**. Target: **26/26 PLAYABLE PASS in Spawn**, not merely YAML or documents.

## Read in this order (effective from now)
1. [AGENTS.md](AGENTS.md) — binding guardrails for every agent and sub-agent.
2. [105 · HERO FACTORY workflow](docs/co-linh-than-chien/105-hero-factory-multi-agent-workflow.md) — S0–S9; parallel role agents; independent Audit 1/2/3; Owner Gate 4; art/runtime/QA.
3. [104 · Approved Production Master Plan](docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) + [canonical registry JSON](tools/sim/production-26-roster.json) — precise 26 hero IDs, status and waves.
4. [Documentation routing index](docs/co-linh-than-chien/README.md) — specialty standards by task. Consult specific approved hero concept/visual references, not outdated roster plan schedules.

**Source authority:** Owner's most recent approval > 105 workflow > 104 roster and production gates > 91 QWER/D input lock > latest approved hero's concept and art > applicable specialist contracts (23 A–J, 62, 73, 76, 79, 28, 30, 42, 11) > historical plans and reports. When scope contradicts an older doc, do **not** silently “fix” lore/gameplay or delete the old evidence; surface conflict and use the current decision.

## Current verified repository handoff
- Repository: `codehaivl-dotcom/lol`; game engine target is **Spawn**. This repo contains docs **and a Balance Lab/source data snapshot**; pushing GitHub = version control evidence and production readiness for Gate 4 review, prior to client engine import.
- Master roster: **26 approved production candidates** in canonical registry (`tools/sim/production-26-roster.json`); 4 waves of **5 + 6 + 8 + 7**.
- **Full Roster Packet Completion**: All **26 heroes** now have complete 10-file Hero Production Packets (total **260 markdown files**, 0 missing, 0 broken absolute links) in `docs/co-linh-than-chien/production-heroes/<id>/`.
- **Verified 26-Hero Lab Campaign**: Campaign `2026-10-12T08-15-08-077Z` (`reports/sim/production26/2026-10-12T08-15-08-077Z/summary.json`) ran all 26 candidates concurrently ($n=200, \text{seed}=1, \text{workers}=4$). Result: **26/26 FLAG_REVIEW**, **0 FLAG_RED** (red=0 across entire roster), **0 MISSING_KIT**.
- **Unit Test Suite Coverage (agent-reported; not rerun independently here)**: 44 pass, 0 fail across 8 test files (`bun test tools/test/`), verifying all core gameplay toys for Waves 1, 2, 3, and 4.
- **Wave 1 & 2 Repairs**: All broken absolute links converted to repository-relative paths; Phù Đổng locked to *rider on iron steed* (not Centaur) and Spawn runtime; `DEF-W2-PD-001` resolved with full behavioral test.
- **Independent 3-Round Audits**: All 26 heroes audited across Audit 1 (Canon/Fantasy), Audit 2 (Mechanics/Lab with `FLAG_REVIEW (red: 0)`), and Audit 3 (Production Feasibility & Defect Logs `DEF-W1`, `DEF-W2`, `DEF-W3`, `DEF-W4`).
- **Gate 4 Status**: Strictly locked at **HOLD (CHỜ OWNER KÝ DUYỆT)** across all 26 heroes. No unauthorized 3D production spend or auto-promotion to `heroes.yml`.

## Next execution — close the model-to-game gap (after commit 20bafbb)

**Independent GitHub inspection:** 26 hero packet folders have exactly 10 Markdown files each (260 total). Campaign summary verifies 26 `FLAG_REVIEW`, red=0, 130–177 ORANGE flags per hero. Test files for 15 new gameplay toys exist, but **Bun execution and Spawn integration have not been independently rerun in this handoff**. The 44/44 tests are a team-reported result, not evidence of playable character models.

**Do not commission another 260-file audit round.** Divide next work into three nonblocking tracks:

1. **Model/Bot Calibration (parallel):** Review aggregate ORANGE cause groups against role-matched baselines and team utility, not raw orange count or solo 50%. Confirm candidate/baseline builds, AI target selection, teamfight role composition and whether ability zones actually influence the simulated match. Prioritize pathological **Cổ Lỗ (2v2 14.3%, 3v3 18.7%)**, **Aero (15.4% / 21.6%)**, **Iro (19.8% / 25.1%)**, **Vero (23.1% / 28.7%)** and **Kael (27.5% / 26.3%)** before global stat tuning. Do not excuse all low team rates as "support" or "artillery".
2. **Spawn Feasibility / Greybox (nonpaid, no hero activation):** Validate critical runtime boundaries with simple placeholders: Tản Sơn ridge collision/ally pass-through; Kora directional projectile shielding; Mok beacon vision/FoW; Kiko decoy bot targeting; Cổ Lỗ projectile minimum range; animation/camera for Phù Đổng mounted rider. Simulator zones/state flags do **not** prove actual Spawn systems.
3. **Art Preproduction (parallel, no model-credit spend):** Lock 26 Battle Form specs, 3D/weapon/rig/anim/VFX manifests, estimated asset spend, and one pilot import workflow. No final paid 3D generation or official roster activation before explicit Owner Gate 4.

**Decision:** Core design/scope/packet creation = accepted. Gate 3 = `FLAG_REVIEW` (26/26), Gate 4 = `HOLD` (26/26). **Do not equate zero RED with balanced**. Resolve or evidence-review material flags and mechanics blockers; propose a *shortlist* of hero-by-hero Gate 4 decisions with exact revisions and known risks. Owner alone approves sign-off. Report one consolidated status update, do not reopen fantasy/concept decisions.

## Immediate multi-sub-agent execution

| Role | Responsibility | Output / handoff |
|---|---|---|
| Producer / Integrator | Assign all 26 hero IDs concurrently, deduplicate canonical refs, prevent competing writes, track blockers | Per-hero packets + one 26-row status dashboard, S0 |
| Lore / Class / UX agent | Source-locked fantasy, lore, subclass/roles, onboarding/difficulty, counters | `01-fantasy-lore-class.md`, `02-player-experience.md`, S1 |
| Gameplay agent | Basic attack, passive, Q/W/E/R, hero/core toy states, target/stack/cleanup, bot decisions | `03-gameplay-contract.md`, S1 |
| Art / VFX concept agent | Battle Form, silhouette, 6 slot visual contracts, telegraph, camera readability, animation & audio briefs | `04-skill-visual-contract.md`, S1 |
| Mechanics agent | Align gameplay toy, candidate schema, simulator and runtime; real behavior tests | `05-mechanics-coverage.md`, S1/S3 |
| Balance agent | Per-hero YAML, stats/growth/build and model evidence; correct FLAG/RED | Candidate YAML, `06-balance-evidence.md`, S4/S5 |
| Independent reviewers | Three distinct passes: canon/experience; mechanics/balance; production/red-team | `07-audit-record.md`, S2/S6/S7 |
| Asset/integration QA agents | Only after owner Gate 4: real model/rig/anims/VFX/SFX/VO, integration and game QA | `08-asset-production.md`, `09-engine-qa.md`, S8/S9 |

**No duplicate ownership:** one writer at a time for shared `tools/sim/`, `scripts/lib/`, production registry and central docs; independent agents write separate hero packet files. QA and audits cannot self-certify work they authored.

## Runbook — repo root, machine with Bun and dependencies

```bash
bun install
bun test tools/test/
bun tools/sim/production-26.mjs --dry-run
bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1
```

Before running the full campaign, each candidate must have an actual source-locked gameplay kit and supported/tested core mechanics; missing candidates are **MISSING_KIT**, not a pass. Save campaign `summary.json`, per-hero `report.json`/`report.html`, command, seed, SHA, red/orange flags, NOT_TESTED, reviewer and issue IDs. The campaign may execute partial kits for debugging but cannot promote them. **Owner signs Gate 4 hero by hero (or explicit named group)** before costly final model generation or copying production data into `heroes.yml` / activation.

## Standards kept, not duplicated
- [23 A–J](docs/co-linh-than-chien/23-giao-viec-21-tuong.md) — deliverables and seven specialist reviews; **historic 21-hero schedule superseded by 105**.
- [62](docs/co-linh-than-chien/62-production-bible-va-bo-mo-phong.md) — six-field evidence/handoff.
- [73](docs/co-linh-than-chien/73-balance-lab.md) — simulation rules and creator gates.
- [91](docs/co-linh-than-chien/91-khoa-input-qwer-d.md) — Q/W/E/R plus universal D.
- [76](docs/co-linh-than-chien/76-chuan-hinh-hoc-skill.md) / [79](docs/co-linh-than-chien/79-chuan-ultimate.md) — per-skill geometry and ultimate quality.
- [28](docs/co-linh-than-chien/28-workflow-animation-skill.md) / [30](docs/co-linh-than-chien/30-workflow-vfx-skill.md) — specialized animation/VFX implementation.
- [42](docs/co-linh-than-chien/42-quan-ly-asset.md) / [11](docs/co-linh-than-chien/11-acceptance-ban-giao.md) — manifest and actual build evidence.

## Completion report to Owner
Report **all 26 heroes** in one table with: S0/S1/Audit1/S3/S4/Lab/Audit2/Audit3/Gate4/3D/Anim/VFX/Runtime/Engine QA, mechanics coverage, revision, artifact refs, exact failures and next unblock action. Never claim "ALL PASS" from test existence, commit, clean docs, simulation win rate or screenshot alone.
