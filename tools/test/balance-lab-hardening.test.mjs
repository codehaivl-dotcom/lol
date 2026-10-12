// Test tự động xác minh các cải tiến Hardening cho Balance Lab (P0 & P1)
import { describe, test, expect } from "bun:test";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { 
  ROOT, 
  HEROES, 
  BASELINE_PANEL, 
  loadCandidates, 
  loadAllCandidates, 
  kit, 
  isCandidate, 
  isCandidateOverride 
} from "../sim/data.mjs";
import { heroUnit } from "../sim/engine.mjs";
import { snapshot } from "../sim/progress.mjs";
import { duelRate, combo } from "../sim/scenarios.mjs";

describe("Balance Lab Hardening Tests", () => {
  test("ROOT path resolution is valid directory on current OS", () => {
    expect(ROOT).toBeDefined();
    expect(path.isAbsolute(ROOT)).toBe(true);
  });

  test("Baseline Comparison Panel contains valid representative runtime heroes", () => {
    expect(BASELINE_PANEL.length).toBeGreaterThanOrEqual(5);
    for (const id of BASELINE_PANEL) {
      expect(HEROES.heroes[id]).toBeDefined();
    }
  });

  test("P0-2: Candidate duplicate ID is explicitly rejected when allowOverride = false", () => {
    // hao_nhat exists in runtime heroes.yml
    expect(() => {
      loadCandidates("tools/sim/candidates/hao_nhat.yml", { allowOverride: false });
    }).toThrow(/\[CANDIDATE_DUPLICATE_ID\]/);
  });

  test("P0-2: Candidate duplicate ID is permitted when allowOverride = true", () => {
    const loaded = loadCandidates("tools/sim/candidates/hao_nhat.yml", { allowOverride: true });
    expect(loaded).toContain("hao_nhat");
    expect(isCandidate("hao_nhat")).toBe(true);
    expect(isCandidateOverride("hao_nhat")).toBe(true);
  });

  test("P0-2 Batch Hardening: loadAllCandidates throws when duplicate candidate exists without override", () => {
    expect(() => {
      loadAllCandidates({ allowOverride: false });
    }).toThrow(/\[CANDIDATE_DUPLICATE_ID\]/);
  });

  test("P0-2 CLI Hardening: CLI batch candidate run fails when duplicate candidate exists without override", () => {
    const res = spawnSync("bun", ["tools/sim/run.mjs", "parity", "--cand"], {
      cwd: ROOT,
      encoding: "utf8"
    });
    expect(res.status).not.toBe(0);
    expect(res.stderr || res.stdout).toContain("[CANDIDATE_DUPLICATE_ID]");
  });

  test("P0-3: Single hero duel against baseline panel produces valid winrates without NaN", () => {
    const single = "moc_lam";
    const opponents = BASELINE_PANEL.filter((h) => h !== single);
    expect(opponents.length).toBeGreaterThan(0);
    
    for (const opp of opponents) {
      const res = duelRate(single, opp, 10, { n: 10, seed: 42 });
      expect(res.win).toBeGreaterThanOrEqual(0);
      expect(res.win).toBeLessThanOrEqual(1);
      expect(Number.isNaN(res.win)).toBe(false);
    }
  });

  test("P0-3: Single hero combo test produces valid theory damage percentage without NaN", () => {
    const single = "moc_lam";
    const opp = "van_dao";
    const snapA = snapshot(single, 10);
    const snapT = snapshot(opp, 10);
    const res = combo(single, snapA, opp, snapT, { mode: "theory", seed: 42 });
    expect(res.pct).toBeGreaterThan(0);
    expect(Number.isNaN(res.pct)).toBe(false);
  });
});
