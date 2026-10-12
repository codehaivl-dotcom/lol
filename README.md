# CỔ LINH THẦN CHIẾN — Production Repository

**Current production objective:** 26 approved heroes → complete 3D/animation/VFX/SFX/gameplay → **26/26 PLAYABLE PASS** in Spawn. The repository contains documentation, a Balance Lab toolkit and a **source data snapshot**; it does not itself prove live Spawn integration.

## Mandatory reading for all agents

1. [AGENTS.md](AGENTS.md) — mandatory entrypoint and agent rules.
2. [HANDOFF.md](HANDOFF.md) — current work status, assignments and handoff for new sub-agents.
3. **[105 · Hero Factory (single workflow)](docs/co-linh-than-chien/105-hero-factory-multi-agent-workflow.md)** — all 26 heroes, S0–S9, independent Audit 1/2/3, Gate 4 and production.
4. [104 · Master Plan](docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md) + [26-hero registry](tools/sim/production-26-roster.json) — approved scope and IDs.
5. [Documentation routing index](docs/co-linh-than-chien/README.md) — specialist technical standards and historical references.

The previous 6/21/24/27-hero plans and serial three/five-hero batching are **historical**. Do not treat old schedule text as an instruction to override the current 26-hero source of truth.

## All-roster Lab campaign

```bash
bun install
bun test tools/test/
bun tools/sim/production-26.mjs --dry-run
bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1
```

This dispatches **existing candidate kits** in parallel but does not author missing YAML, verify the exact core toy, sign Owner Gate 4, generate 3D assets, or prove the Spawn game is playable. Report all NOT_TESTED/FLAG/BLOCKED states explicitly.

**Archive:** The original design and import snapshot provenance remains in [DOCS-SNAPSHOT.json](DOCS-SNAPSHOT.json). Preserve prior design decisions, audits, old reports and asset receipts; use [the docs index](docs/co-linh-than-chien/README.md) to distinguish current authorities from historical material.
