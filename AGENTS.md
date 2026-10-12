# AGENTS.md — COLINH Hero Production (mandatory entry point)

> **Owner directive, 2026-10-12:** ALL 26 approved heroes must reach PLAYABLE PASS. This is a production project, not a document-only concept audit. Do not process heroes in serial batches of five.

## Start here — required read order
1. [HANDOFF.md](HANDOFF.md) — latest production status, multi-agent task allocation, blockers, and runnable commands.
2. [105 · HERO FACTORY — canonical multi-agent workflow](docs/co-linh-than-chien/105-hero-factory-multi-agent-workflow.md). **S0–S9, three independent audits, complete Hero Production Packet and sign-off are mandatory.** 
3. [104 · Full Approved Roster Production Master Plan](docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) + [26-hero machine-readable registry](tools/sim/production-26-roster.json). Registry is the only current 26-hero scope/ID list; waves schedule assets/integration only, NOT serial concept/kit/Lab work.
4. [Doc routing/authority index](docs/co-linh-than-chien/README.md). Read only relevant specialist standards after 105, e.g. 23 A–J, 62 handoff, 73 Balance Lab, 76 geometry, 79 ultimate, 91 input, 28 animation, 30 VFX, 42 assets, 11 QA.
5. The specific hero's **latest approved concept source and art reference** (docs 100, 102, 103, 96/99 as applicable). Do not replace approved fantasy or mythology artwork with generic kits or legacy designs.

## Do not compromise these rules
- Input: four hero skills **Q/W/E/R**, R = ultimate, **D = universal dash**. Basic attack is separate; old YAML `rmb` means W by migration contract, `lmb` is basic attack. Source: doc 91.
- Hero core toy MUST really execute in candidate simulator/mechanics/runtime. A YAML comment is NOT implementation. If not supported, add tests and implementation or mark BLOCKED/NOT_TESTED; never remove the approved core toy to get PASS.
- Work on all **26 hero packets concurrently** with nonconflicting file ownership. Each packet covers identity/lore/class/difficulty, QWER/passive/basic, stats/build, geometry/VFX/animation, runtime/bot coverage, Lab, three audits, asset plan and engine QA.
- Audit 1: independent canon/player fantasy/counterplay; Audit 2: independent mechanics/sim/balance; Audit 3: independent cross-disciplinary production red team. Reviewer cannot sign their own work.
- Candidate numbers live in `tools/sim/candidates/<id>.yml` pending approval; **do not** add hero to `scripts/lib/data/heroes.yml` or activate in lobby/slice without separate Owner authorization.
- Run full campaign via `bun tools/sim/production-26.mjs --dry-run` then `bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1` **once all appropriate YAML and core-toy mechanics coverage are prepared**. Missing kit, invalid report, flagged balance and unsupported essential mechanic are NOT passes.
- `PASS_MODEL` is simulation only; `PASS_ENGINE` requires real Spawn runtime evidence. All `gates.yml` thresholds currently marked proposal; do not quietly approve them or auto-promote on win rate alone.
- **Owner Gate 4 sign-off** before paid/final 3D production; Battle Form, asset manifest, story, visual briefs and tests can proceed in parallel. Later asset/import and live QA gates remain separate.
- Track files/hero ID, source revision, changed fields, tests, seed/report, owner/reviewer, defects and blockers. Never report fictitious production, generated art or test evidence.

## Authority and cleanup policy
- **105 is the only workflow/process authority for the 26 approved roster.** **104 defines scope, hero IDs, gates and production waves.** Specialist docs retain technical authority *only within their domains*. A specialist doc's obsolete 6/21/27-hero schedule, legacy keybindings, and outdated partial-project status do not override 105/104/91.
- Never delete historical docs, references, art receipts, audit logs or acceptance evidence to create a misleading "clean" PASS. Preserve provenance. The docs README flags older plans as HISTORICAL/REFERENCE.
- Shared files (sim engine, combat, hero data, registry) have **one maintainer/writer at a time**, with regression checks after merging; parallel agents own separate hero packet files.
- If a change would alter approved fantasy, legal rights, scope, owner gates or batch render spend, escalate rather than assuming consent.

## Completion definition
26 unique roster IDs with valid full Hero Production Packets; mechanistically faithful and reviewed kits; reproducible balance evidence; signed Gate 4; real 3D/rig/animation/VFX/SFX/UI; implemented gameplay/bot; live 1v1/5v5 QA evidence; **26/26 PLAYABLE PASS**. Draft documents and simulator status alone never satisfy this requirement.
