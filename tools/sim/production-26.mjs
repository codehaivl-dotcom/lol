// COLINH: single-campaign, bounded-concurrency Balance Lab dispatch for all approved 26 heroes.
// Usage: bun tools/sim/production-26.mjs --workers 4 --n 200 [--seed 1] [--dry-run]
// This runner does NOT generate kits, sign Gate 4, or claim PASS_ENGINE.
import YAML from "yaml";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const REGISTRY_PATH = resolve(ROOT, "tools/sim/production-26-roster.json");
const argv = process.argv.slice(2);
const val = (k, def) => { const i = argv.indexOf(k); return i < 0 ? def : argv[i + 1]; };
const integerArg = (k, def, min, max) => {
  const v = Number(val(k, def));
  if (!Number.isInteger(v) || v < min || v > max) throw Error("Invalid " + k + ": " + v + " (expected " + min + ".." + max + ")");
  return v;
};
const workers = integerArg("--workers", 4, 1, 16);
const n = integerArg("--n", 200, 1, 100000);
const seed = integerArg("--seed", 1, 0, 100000000);
const dryRun = argv.includes("--dry-run");
const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
const heroes = registry.heroes;
if (!Array.isArray(heroes) || heroes.length !== 26) throw Error("Roster must contain exactly 26 heroes.");
if (new Set(heroes.map((h) => h.id)).size !== 26 ||
    new Set(heroes.map((h) => h.researchId)).size !== 26) throw Error("Duplicate production roster IDs.");
for (const h of heroes) {
  if (!/^[a-z][a-z0-9_]*$/.test(h.id) || !/^#\d+$/.test(h.researchId) ||
      ![1, 2, 3, 4].includes(h.wave)) throw Error("Bad roster entry: " + JSON.stringify(h));
}
const waveSizes = [1,2,3,4].map((w) => heroes.filter((h) => h.wave === w).length);
if (waveSizes.join(",") !== "5,6,8,7") throw Error("Unexpected wave allocations: " + waveSizes.join(","));
if (!dryRun && !process.versions.bun) throw Error("Run this campaign with Bun: bun tools/sim/production-26.mjs");

const campaignId = new Date().toISOString().replace(/[:.]/g, "-");
const campaignDir = resolve(ROOT, val("--out", "reports/sim/production26/" + campaignId));
mkdirSync(campaignDir, { recursive: true });
const available = [];
const missing = [];
for (const hero of heroes) {
  const file = resolve(ROOT, "tools/sim/candidates/" + hero.id + ".yml");
  if (!existsSync(file)) { missing.push(hero.id); continue; }
  const data = YAML.parse(readFileSync(file, "utf8"));
  if (!data?.heroes?.[hero.id]) throw Error("Candidate YAML must contain hero ID " + hero.id + " in " + file);
  available.push(hero.id);
}
console.log("COLINH 26-CAMPAIGN: kit ready " + available.length + "/26; missing " + missing.length +
  "; workers=" + workers + "; n=" + n + "; seed=" + seed);
if (dryRun) {
  console.log("READY: " + available.join(", "));
  console.log("MISSING: " + missing.join(", "));
  process.exit(0);
}

const summary = {
  campaignId, createdAt: new Date().toISOString(), rosterTotal: 26,
  maxConcurrent: workers, n, seed, command: "bun tools/sim/production-26.mjs",
  statuses: {}, results: []
};
const pending = heroes.slice();
function runHero(hero) {
  return new Promise((done) => {
    const kit = "tools/sim/candidates/" + hero.id + ".yml";
    if (!existsSync(resolve(ROOT, kit))) {
      done({ ...hero, status: "MISSING_KIT", message: "Candidate YAML not yet authored; no simulation attempted." });
      return;
    }
    const out = join(campaignDir, hero.id);
    mkdirSync(out, { recursive: true });
    const command = ["tools/sim/run.mjs", "all", "--cand-file", kit,
      "--heroes", hero.id, "--n", String(n), "--seed", String(seed), "--out", out];
    const child = spawn(process.execPath, command, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
    let log = "";
    const append = (bytes) => { if (log.length < 1000000) log += bytes.toString("utf8").slice(0, 1000000 - log.length); };
    child.stdout.on("data", append);
    child.stderr.on("data", append);
    child.on("error", (error) => {
      writeFileSync(join(out, "runner.log"), log + "\n" + error.message);
      done({ ...hero, status: "SIM_FAILED", error: error.message });
    });
    child.on("close", (code) => {
      writeFileSync(join(out, "runner.log"), log);
      if (code !== 0) {
        done({ ...hero, status: "SIM_FAILED", exitCode: code, log: join(out, "runner.log") });
        return;
      }
      try {
        const p = join(out, "report.json");
        const report = JSON.parse(readFileSync(p, "utf8"));
        if (!report.heroes?.includes(hero.id) || !report.inputs?.candidates?.includes(hero.id)) {
          throw Error("Report did not actually load candidate " + hero.id);
        }
        const vals = Object.values(report.sections?.duel ?? {}).map((section) => section.avg?.[hero.id]);
        if (vals.length < 5 || vals.some((v) => !Number.isFinite(v))) {
          throw Error("Missing/nonfinite candidate duel values for " + hero.id);
        }
        const red = report.flags?.filter((f) => f.sev === "red").length ?? 0;
        const orange = report.flags?.filter((f) => f.sev === "orange").length ?? 0;
        const status = red ? "FLAG_RED" : orange ? "FLAG_REVIEW" : "SIM_FINISHED_REVIEW_REQUIRED";
        done({ ...hero, status, modelVerdict: report.verdict, revision: report.revision,
          red, orange, notTested: report.notTested ?? [], duelRates: vals, report: p });
      } catch (error) {
        done({ ...hero, status: "INVALID_REPORT", error: String(error), log: join(out, "runner.log") });
      }
    });
  });
}
async function worker() {
  for (;;) {
    const hero = pending.shift();
    if (!hero) return;
    const result = await runHero(hero);
    summary.results.push(result);
    summary.statuses[hero.id] = result.status;
    console.log(hero.researchId + " " + hero.id + ": " + result.status +
      (result.red !== undefined ? " (red=" + result.red + ", orange=" + result.orange + ")" : ""));
    writeFileSync(join(campaignDir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
  }
}
await Promise.all(Array.from({ length: workers }, () => worker()));
summary.finishedAt = new Date().toISOString();
summary.results.sort((a, b) => heroes.findIndex((h) => h.id === a.id) - heroes.findIndex((h) => h.id === b.id));
writeFileSync(join(campaignDir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
const counts = {};
for (const v of Object.values(summary.statuses)) counts[v] = (counts[v] ?? 0) + 1;
console.log("CAMPAIGN COMPLETE: " + JSON.stringify(counts) + "\nEvidence: " + join(campaignDir, "summary.json"));
console.log("No Gate 4 sign-off or gameplay/pass engine approval is issued by this tool.");
// A nonzero exit alerts agents/CI to missing kits, failed jobs or balance flags.
// Even all-green mathematical models require mechanic coverage review and creator sign-off.
if (summary.results.some((r) => r.status !== "SIM_FINISHED_REVIEW_REQUIRED")) process.exitCode = 1;
