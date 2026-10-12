import { describe, test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const registry = JSON.parse(readFileSync(resolve(root, "tools/sim/production-26-roster.json"), "utf8"));

describe("Full production 26-hero Lab campaign", () => {
  test("registry has exactly 26 unique heroes assigned to exactly one production wave", () => {
    expect(registry.heroes).toHaveLength(26);
    expect(new Set(registry.heroes.map((h) => h.id)).size).toBe(26);
    expect(new Set(registry.heroes.map((h) => h.researchId)).size).toBe(26);
    expect([1, 2, 3, 4].map((w) => registry.heroes.filter((h) => h.wave === w).length)).toEqual([5, 6, 8, 7]);
    expect(registry.heroes.find((h) => h.id === "kora")?.researchId).toBe("#32");
    expect(registry.heroes.find((h) => h.id === "oneira")?.researchId).toBe("#48");
  });
  test("single dry-run inventories every hero even when YAML is not yet authored", () => {
    const r = spawnSync(process.execPath, ["tools/sim/production-26.mjs", "--dry-run"], {
      cwd: root, encoding: "utf8", timeout: 60000
    });
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("COLINH 26-CAMPAIGN");
    expect(r.stdout).toContain("READY:");
    expect(r.stdout).toContain("MISSING:");
  });
});