// Automated assertion test verifying the 26-hero production registry and wave allocation
import { describe, test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "../sim/data.mjs";

describe("COLINH Production Master Plan 104 Registry Assertions", () => {
  const docPath = path.resolve(ROOT, "docs/co-linh-than-chien/104-full-approved-roster-production-master-plan.md");
  const docContent = readFileSync(docPath, "utf8");

  const APPROVED_26_HEROES = [
    { researchId: "#01", runtimeId: "kiko", name: "Kiko", wave: "W2" },
    { researchId: "#02", runtimeId: "brak", name: "Brak", wave: "W2" },
    { researchId: "#03", runtimeId: "vero", name: "Vero", wave: "W2" },
    { researchId: "#07", runtimeId: "nera", name: "Nera", wave: "W2" },
    { researchId: "#15", runtimeId: "aero", name: "Aero", wave: "W3" },
    { researchId: "#17", runtimeId: "forge", name: "Forge", wave: "W1" },
    { researchId: "#19", runtimeId: "inka", name: "Inka", wave: "W4" },
    { researchId: "#28", runtimeId: "libro", name: "Libro", wave: "W4" },
    { researchId: "#30", runtimeId: "iro", name: "Iro", wave: "W3" },
    { researchId: "#31", runtimeId: "moka", name: "Moka", wave: "W3" },
    { researchId: "#32", runtimeId: "kora", name: "Kora", wave: "W3" },
    { researchId: "#33", runtimeId: "eelix", name: "Eelix", wave: "W4" },
    { researchId: "#34", runtimeId: "jeli", name: "Jeli", wave: "W1" },
    { researchId: "#35", runtimeId: "pavo", name: "Pavo", wave: "W4" },
    { researchId: "#36", runtimeId: "rolo", name: "Rolo", wave: "W2" },
    { researchId: "#37", runtimeId: "mok", name: "Mok", wave: "W4" },
    { researchId: "#38", runtimeId: "linh_hau", name: "Linh Hầu", wave: "W1" },
    { researchId: "#39", runtimeId: "kael", name: "Kael", wave: "W1" },
    { researchId: "#40", runtimeId: "lieu_tien", name: "Liễu Tiễn", wave: "W1" },
    { researchId: "#43", runtimeId: "phu_dong", name: "Phù Dong", wave: "W2" },
    { researchId: "#44", runtimeId: "tan_son", name: "Tản Sơn", wave: "W3" },
    { researchId: "#45", runtimeId: "trieu_ba", name: "Triều Bá", wave: "W3" },
    { researchId: "#46", runtimeId: "dung_thach", name: "Dũng Thạch", wave: "W3" },
    { researchId: "#47", runtimeId: "co_lo", name: "Cổ Lỗ", wave: "W3" },
    { researchId: "#48", runtimeId: "oneira", name: "Oneira", wave: "W4" },
    { researchId: "#49", runtimeId: "kymos", name: "Kymos", wave: "W4" }
  ];

  test("Approved production scope contains exactly 26 unique heroes", () => {
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

  test("Every hero appears in exactly one wave and wave sums equal 26", () => {
    const w1 = APPROVED_26_HEROES.filter((h) => h.wave === "W1");
    const w2 = APPROVED_26_HEROES.filter((h) => h.wave === "W2");
    const w3 = APPROVED_26_HEROES.filter((h) => h.wave === "W3");
    const w4 = APPROVED_26_HEROES.filter((h) => h.wave === "W4");

    expect(w1.length).toBe(5);
    expect(w2.length).toBe(6);
    expect(w3.length).toBe(8);
    expect(w4.length).toBe(7);
    expect(w1.length + w2.length + w3.length + w4.length).toBe(26);
  });

  test("Wave 1 contains Support Jeli (#34) for full role interaction testing", () => {
    const w1 = APPROVED_26_HEROES.filter((h) => h.wave === "W1");
    expect(w1.some((h) => h.runtimeId === "jeli")).toBe(true);
    expect(w1.some((h) => h.runtimeId === "kiko")).toBe(false); // Kiko moved to W2
  });

  test("Document 104 text explicitly contains all 26 hero runtime IDs", () => {
    for (const hero of APPROVED_26_HEROES) {
      expect(docContent).toContain(hero.runtimeId);
      expect(docContent).toContain(hero.researchId);
    }
  });

  test("Proposals #41 Duong Tien and #42 Pyra are explicitly marked out of approved scope", () => {
    expect(docContent).toContain("Dương Tiễn (#41)");
    expect(docContent).toContain("Pyra (#42)");
    expect(docContent).toContain("ngoài scope");
  });
});
