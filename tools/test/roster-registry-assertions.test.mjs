// Automated assertion test verifying the 26-hero production registry and wave allocation
import { describe, test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT, ROSTER_REGISTRY } from "../sim/data.mjs";

describe("COLINH Production Master Plan 104 Registry Assertions", () => {
  const docPath = path.resolve(ROOT, "docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md");
  const docContent = readFileSync(docPath, "utf8");

  // Read all approved heroes directly from canonical YAML registry (Single Source of Truth)
  const waves = ROSTER_REGISTRY.waves;
  const APPROVED_26_HEROES = Object.entries(waves).flatMap(([waveKey, waveData]) =>
    waveData.heroes.map((h) => ({
      researchId: `#${String(h.number).padStart(2, "0")}`,
      runtimeId: h.id,
      name: h.name,
      wave: waveKey.replace("wave_", "W")
    }))
  );

  test("Approved production scope contains exactly 26 unique heroes from canonical registry", () => {
    expect(ROSTER_REGISTRY.approvedCount).toBe(26);
    expect(APPROVED_26_HEROES.length).toBe(26);
    const researchIds = new Set(APPROVED_26_HEROES.map((h) => h.researchId));
    expect(researchIds.size).toBe(26);
    const runtimeIds = new Set(APPROVED_26_HEROES.map((h) => h.runtimeId));
    expect(runtimeIds.size).toBe(26);
  });

  test("Kora is uniquely locked to #32, Nera is #07, Rolo is #36", () => {
    const kora = APPROVED_26_HEROES.find((h) => h.runtimeId === "kora");
    expect(kora?.researchId).toBe("#32");

    const nera = APPROVED_26_HEROES.find((h) => h.runtimeId === "nera");
    expect(nera?.researchId).toBe("#07");

    const rolo = APPROVED_26_HEROES.find((h) => h.runtimeId === "rolo");
    expect(rolo?.researchId).toBe("#36");
  });

  test("Oneira is uniquely assigned to #48, not conflicting with Rolo #36", () => {
    const oneira = APPROVED_26_HEROES.find((h) => h.runtimeId === "oneira");
    expect(oneira?.researchId).toBe("#48");
    expect(oneira?.researchId).not.toBe("#36");
  });

  test("Kymos is uniquely assigned to #49", () => {
    const kymos = APPROVED_26_HEROES.find((h) => h.runtimeId === "kymos");
    expect(kymos?.researchId).toBe("#49");
  });

  test("Every hero appears in exactly one wave and wave sums equal 26 in canonical registry", () => {
    const w1 = APPROVED_26_HEROES.filter((h) => h.wave === "W1");
    const w2 = APPROVED_26_HEROES.filter((h) => h.wave === "W2");
    const w3 = APPROVED_26_HEROES.filter((h) => h.wave === "W3");
    const w4 = APPROVED_26_HEROES.filter((h) => h.wave === "W4");

    expect(w1.length).toBe(5);
    expect(w2.length).toBe(6);
    expect(w3.length).toBe(8);
    expect(w4.length).toBe(7);
    expect(w1.length + w2.length + w3.length + w4.length).toBe(26);

    expect(waves.wave_1.count).toBe(5);
    expect(waves.wave_2.count).toBe(6);
    expect(waves.wave_3.count).toBe(8);
    expect(waves.wave_4.count).toBe(7);
  });

  test("Wave 1 contains Support Jeli (#34) for full role interaction testing", () => {
    const w1 = APPROVED_26_HEROES.filter((h) => h.wave === "W1");
    expect(w1.some((h) => h.runtimeId === "jeli")).toBe(true);
    expect(w1.some((h) => h.runtimeId === "kiko")).toBe(false); // Kiko moved to W2
  });

  test("Document 104 text explicitly contains all 26 hero runtime IDs from canonical registry", () => {
    for (const hero of APPROVED_26_HEROES) {
      expect(docContent).toContain(hero.runtimeId);
      expect(docContent).toContain(hero.researchId);
    }
  });

  test("Proposals #41 Duong Tien and #42 Pyra are explicitly marked out of approved scope", () => {
    expect(docContent).toContain("Dương Tiễn (#41)");
    expect(docContent).toContain("Pyra (#42)");
    expect(docContent).toContain("ngoài scope");

    const outOfScope = ROSTER_REGISTRY.proposals_out_of_scope;
    expect(outOfScope.some((p) => p.id === "duong_tien" && p.number === 41)).toBe(true);
    expect(outOfScope.some((p) => p.id === "pyra" && p.number === 42)).toBe(true);
  });
});
