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
- Repository: `codehaivl-dotcom/lol`; game engine target is **Spawn**. This repo contains docs **and a Balance Lab/source data snapshot**; do not claim that pushing GitHub = importing into or playtesting in the live Spawn world.
- Master roster: **26 approved production candidates** in a machine-readable JSON manifest; 4 waves of **5 + 6 + 8 + 7** allocate later **3D/integration** work only. They do **not** serialize content generation, Lab, or independent audits.
- At commit `55d7d90`, all **11 Wave 1+2 heroes** have 10-file packets (110 authored files total) and candidate YAMLs, and all were included in a real stored campaign report. Presence of packets is NOT completion of audited gameplay.
- **Verified Lab evidence**: [production26 summary](reports/sim/production26/2026-10-12T07-21-06-914Z/summary.json) = **11 FLAG_REVIEW (red=0 but 132–173 ORANGE per hero), 15 MISSING_KIT, 0 clean model review-ready verdict**. Their Gate 3 entries in 104 have been corrected from misleading PASS(red=0) to FLAG_REVIEW. No Gate 4 sign-off; no PASS_ENGINE / PLAYABLE_PASS established.
- **Wave 2 independent defect audit**: the six `07-audit-record.md` packets enumerate **9 OPEN MAJOR + 9 OPEN MINOR** (18 total), not the 7 Major / 10 Minor in the handback narrative. Essential core toys have partial mechanics coverage; some "toy tests" set state manually or assert YAML constants without actually casting abilities.
- **Phu Dong source-lock contradiction**: actual approved art/body is *rider on iron steed* (NOT anatomical centaur); its Audit 3 text referring to "Centaur / Cavalry" and "Unity URP" is incorrect for **Spawn**. Replace broken `file:///d:/...` links in packets with repository-relative links. Do not silently rewrite the signed/historical audit evidence; append correction/review and close defect with proof.
- Old W1 report `DEF-W1-KL-001` was listed as candidate-tuning resolved by the preceding agent; verify the current Lab result (Kael remains FLAG_REVIEW) instead of promoting from prose claims.
- **Concurrency directive:** work on 15 missing YAML/packets **NOW in parallel** with Wave 1/2 flagged repairs. Waves do not serialize Lab. Fix bug/ORANGE/test coverage; rerun with seed/revision evidence; three independent reviewer roles must not self-certify; retain Owner Gate 4 HOLD.
- `tools/sim/production-26.mjs` can dispatch up to N local Lab processes against candidate YAML files; `--dry-run` detects missing kits. It **does not generate missing kits**, implement mechanics, perform conceptual audits, authorize Gate 4, render assets, or verify Spawn behavior.
- No claim is made here that 26/26 have been Lab-tested, Gate 4 signed, or are playable. Lab thresholds are currently proposals; `PASS_MODEL` and `PASS_ENGINE` are separate evidence classes.

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
