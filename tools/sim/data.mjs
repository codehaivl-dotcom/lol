// Bộ giả lập chuẩn Cổ Linh (doc 73) · lớp dữ liệu: đọc ĐÚNG file runtime, không chép số. Ứng viên (doc 23 §0.1) chỉ sống ở đây.
import YAML from "yaml";
import { readFileSync, readdirSync, existsSync } from "fs";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
export const ROOT = fileURLToPath(new URL("../../", import.meta.url)).replace(/\\/g, "/");
const FILES = ["scripts/lib/data/heroes.yml", "scripts/lib/data/economy.yml", "scripts/lib/data/structures.yml", "scripts/lib/data/objectives.yml"];
const rd = (p) => YAML.parse(readFileSync(ROOT + p, "utf8"));
export const HEROES = rd(FILES[0]), ECO = rd(FILES[1]), ST = rd(FILES[2]), OBJ = rd(FILES[3]);
export const GATES = YAML.parse(readFileSync(new URL("./gates.yml", import.meta.url), "utf8"));
export const CAT_ID = ECO.itemCatalog, CAT = ECO.itemCatalogs[CAT_ID];
export const LIVE = [...HEROES.slice];

const KITS = { ...HEROES.heroes }, BUILDS = { ...CAT.builds }, CAND = new Set(), CAND_FILES = [];
// một file ứng viên: { heroes: { id: kit (cùng schema heroes.yml) }, builds: { id: [item ids của catalog] } }
export function loadCandidates(path) {
  const full = path.startsWith("/") ? path : ROOT + path;
  const c = YAML.parse(readFileSync(full, "utf8"));
  for (const [id, k] of Object.entries(c.heroes ?? {})) { if (HEROES.heroes[id]) continue; /* đã vào runtime (vd. hao_nhat): số runtime thắng, file ứng viên giữ để A/B */ KITS[id] = k; CAND.add(id); }
  Object.assign(BUILDS, c.builds ?? {});
  CAND_FILES.push(path);
  return Object.keys(c.heroes ?? {}).filter((id) => CAND.has(id));
}
// chuẩn theo vai (tools/sim/standard): tuning đề xuất đè lên kit TRONG LAB, không đụng file runtime
export const ROLES = YAML.parse(readFileSync(new URL("./standard/roles.yml", import.meta.url), "utf8"));
const STD_FILE = "tools/sim/standard/tuning.yml";
export function loadStandard() {
  if (!existsSync(ROOT + STD_FILE)) return {};
  const t = YAML.parse(readFileSync(ROOT + STD_FILE, "utf8"))?.heroes ?? {};
  for (const [id, tu] of Object.entries(t)) if (KITS[id]) KITS[id] = { ...KITS[id], tuning: { hp: tu.hp, dmg: tu.dmg } };
  // kit đã fit theo chức năng (standard/kits/<id>.yml: stats/growth thay thế, tuning về 1) đè sau cùng
  const kd = ROOT + "tools/sim/standard/kits/";
  if (existsSync(kd)) for (const f of readdirSync(kd).filter((x) => x.endsWith(".yml")).sort()) { const p = YAML.parse(readFileSync(kd + f, "utf8")); for (const [id, ov] of Object.entries(p.heroes ?? {})) if (KITS[id]) { KITS[id] = { ...KITS[id], stats: { ...KITS[id].stats, ...(ov.stats ?? {}) }, growth: { ...KITS[id].growth, ...(ov.growth ?? {}) }, tuning: { hp: 1, dmg: 1 } }; t[id] = { ...(t[id] ?? {}), P: 1, kit: f }; } CAND_FILES.push("tools/sim/standard/kits/" + f); }
  return t;
}
export const hpShare = (id) => ROLES.hpShare[(kit(id).role ?? "").includes("tank") ? "tank" : roleGroup(id)] ?? 0.5;
export function setPower(id, P) { const w = hpShare(id); KITS[id] = { ...KITS[id], tuning: { hp: P ** w, dmg: P ** (1 - w) } }; return KITS[id].tuning; }
export function patchKit(id, fn) { const k = structuredClone(KITS[id]); KITS[id] = fn(k) ?? k; }
export function loadAllCandidates() {
  const dir = fileURLToPath(new URL("./candidates/", import.meta.url)).replace(/\\/g, "/");
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith(".yml")).sort().flatMap((f) => loadCandidates(dir + "/" + f));
}
export const kit = (id) => { const k = KITS[id]; if (!k) throw new Error(`không có tướng ${id}`); return k; };
export const isCandidate = (id) => CAND.has(id);
export const buildOf = (id) => BUILDS[id] ?? [];
export const itemDef = (id) => CAT.items[id];
export const roleOf = (id) => kit(id).role;
export const roleGroup = (id) => (kit(id).role ?? "").split("_")[0]; // fighter/assassin/mage/marksman/support

// revision: băm nội dung mọi file đầu vào (doc 23: ghi cấu hình + revision cùng kết quả)
export function revision() {
  const h = createHash("sha256");
  for (const f of [...FILES, ...CAND_FILES.map((p) => (p.startsWith("/") ? p.slice(ROOT.length) : p)), "tools/sim/gates.yml", "tools/sim/engine.mjs", "tools/sim/scenarios.mjs", "tools/sim/progress.mjs", "tools/sim/data.mjs"]) h.update(f + "\n" + readFileSync(ROOT + f, "utf8"));
  return h.digest("hex").slice(0, 12);
}
export const inputs = () => ({ files: [...FILES, ...CAND_FILES, "tools/sim/gates.yml"], catalog: CAT_ID, live: LIVE, candidates: [...CAND] });
