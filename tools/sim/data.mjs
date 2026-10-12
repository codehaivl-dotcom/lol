// Bộ giả lập chuẩn Cổ Linh (doc 73) · lớp dữ liệu: đọc ĐÚNG file runtime, không chép số. Ứng viên (doc 23 §0.1) chỉ sống ở đây.
import YAML from "yaml";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const normalizeRel = (p) => path.relative(ROOT, path.resolve(ROOT, p)).replace(/\\/g, "/");

const FILES = ["scripts/lib/data/heroes.yml", "scripts/lib/data/economy.yml", "scripts/lib/data/structures.yml", "scripts/lib/data/objectives.yml"];
const rd = (p) => YAML.parse(readFileSync(path.resolve(ROOT, p), "utf8"));
export const HEROES = rd(FILES[0]), ECO = rd(FILES[1]), ST = rd(FILES[2]), OBJ = rd(FILES[3]);
export const GATES = YAML.parse(readFileSync(new URL("./gates.yml", import.meta.url), "utf8"));
export const CAT_ID = ECO.itemCatalog, CAT = ECO.itemCatalogs[CAT_ID];
export const LIVE = [...HEROES.slice];

// Baseline Comparison Panel đại diện đầy đủ các vai trò runtime chuẩn (Fighter, Tank, Marksman, Mage, Assassin, Support)
export const BASELINE_PANEL = ["moc_lam", "kha_tan", "van_dao", "hoa_tuy", "bach_dien", "mac_lien"];

const KITS = { ...HEROES.heroes }, BUILDS = { ...CAT.builds }, CAND = new Set(), CAND_OVERRIDES = new Set(), CAND_FILES = [];

/**
 * Nạp kit ứng viên từ một file YAML.
 * @param {string} filePath Đường dẫn tương đối hoặc tuyệt đối tới file candidate
 * @param {object} options
 * @param {boolean} options.allowOverride Cho phép đè lên hero đã có trong runtime (VD: rework/tuning)
 */
export function loadCandidates(filePath, { allowOverride = false } = {}) {
  const full = path.isAbsolute(filePath) ? filePath : path.resolve(ROOT, filePath);
  if (!existsSync(full)) throw new Error(`[ENOENT] Không tìm thấy file candidate: ${full}`);
  const c = YAML.parse(readFileSync(full, "utf8"));
  const loaded = [];
  for (const [id, k] of Object.entries(c.heroes ?? {})) {
    if (HEROES.heroes[id]) {
      if (!allowOverride) {
        throw new Error(`[CANDIDATE_DUPLICATE_ID] Tướng '${id}' trong file '${normalizeRel(full)}' trùng với runtime hero ID hiện có trong heroes.yml. Nếu muốn thử nghiệm bản tuning/rework của tướng hiện hữu, bắt buộc kích hoạt cờ --cand-override hoặc { allowOverride: true }.`);
      }
      console.log(`[CANDIDATE_OVERRIDE] Ứng viên '${id}' từ '${normalizeRel(full)}' ghi đè lên runtime hero ID hiện có để phục vụ thử nghiệm.`);
      CAND_OVERRIDES.add(id);
    }
    KITS[id] = k;
    CAND.add(id);
    loaded.push(id);
  }
  Object.assign(BUILDS, c.builds ?? {});
  const relPath = normalizeRel(full);
  if (!CAND_FILES.includes(relPath)) CAND_FILES.push(relPath);
  return loaded;
}

// Chuẩn theo vai (tools/sim/standard): tuning đề xuất đè lên kit TRONG LAB, không đụng file runtime
export const ROLES = YAML.parse(readFileSync(new URL("./standard/roles.yml", import.meta.url), "utf8"));
const STD_FILE = "tools/sim/standard/tuning.yml";
export function loadStandard() {
  const stdFull = path.resolve(ROOT, STD_FILE);
  if (!existsSync(stdFull)) return {};
  const t = YAML.parse(readFileSync(stdFull, "utf8"))?.heroes ?? {};
  for (const [id, tu] of Object.entries(t)) if (KITS[id]) KITS[id] = { ...KITS[id], tuning: { hp: tu.hp, dmg: tu.dmg } };
  // kit đã fit theo chức năng (standard/kits/<id>.yml: stats/growth thay thế, tuning về 1) đè sau cùng
  const kd = path.resolve(ROOT, "tools/sim/standard/kits");
  if (existsSync(kd)) {
    for (const f of readdirSync(kd).filter((x) => x.endsWith(".yml")).sort()) {
      const p = YAML.parse(readFileSync(path.join(kd, f), "utf8"));
      for (const [id, ov] of Object.entries(p.heroes ?? {})) {
        if (KITS[id]) {
          KITS[id] = { ...KITS[id], stats: { ...KITS[id].stats, ...(ov.stats ?? {}) }, growth: { ...KITS[id].growth, ...(ov.growth ?? {}) }, tuning: { hp: 1, dmg: 1 } };
          t[id] = { ...(t[id] ?? {}), P: 1, kit: f };
        }
      }
      const relKit = normalizeRel(path.join(kd, f));
      if (!CAND_FILES.includes(relKit)) CAND_FILES.push(relKit);
    }
  }
  return t;
}

export const hpShare = (id) => ROLES.hpShare[(kit(id).role ?? "").includes("tank") ? "tank" : roleGroup(id)] ?? 0.5;
export function setPower(id, P) { const w = hpShare(id); KITS[id] = { ...KITS[id], tuning: { hp: P ** w, dmg: P ** (1 - w) } }; return KITS[id].tuning; }
export function patchKit(id, fn) { const k = structuredClone(KITS[id]); KITS[id] = fn(k) ?? k; }

export const ROSTER_REGISTRY = YAML.parse(readFileSync(path.resolve(ROOT, "scripts/lib/data/roster-v5-registry.yml"), "utf8"));

export function loadAllCandidates({ allowOverride = false } = {}) {
  const dir = path.resolve(ROOT, "tools/sim/candidates");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".yml") && f !== "README.md")
    .sort()
    .flatMap((f) => loadCandidates(path.join(dir, f), { allowOverride }));
}

export const kit = (id) => { const k = KITS[id]; if (!k) throw new Error(`không có tướng ${id}`); return k; };
export const isCandidate = (id) => CAND.has(id);
export const isCandidateOverride = (id) => CAND_OVERRIDES.has(id);
export const buildOf = (id) => BUILDS[id] ?? [];
export const itemDef = (id) => CAT.items[id];
export const roleOf = (id) => kit(id).role;
export const roleGroup = (id) => (kit(id).role ?? "").split("_")[0]; // fighter/assassin/mage/marksman/support

// revision: băm nội dung mọi file đầu vào (doc 23: ghi cấu hình + revision cùng kết quả)
export function revision() {
  const h = createHash("sha256");
  const allInputFiles = [
    ...FILES,
    ...CAND_FILES,
    "tools/sim/gates.yml",
    "tools/sim/engine.mjs",
    "tools/sim/scenarios.mjs",
    "tools/sim/progress.mjs",
    "tools/sim/data.mjs"
  ];
  for (const f of allInputFiles) {
    const full = path.resolve(ROOT, f);
    if (existsSync(full)) {
      h.update(f.replace(/\\/g, "/") + "\n" + readFileSync(full, "utf8"));
    }
  }
  return h.digest("hex").slice(0, 12);
}

export const inputs = () => ({ files: [...FILES, ...CAND_FILES, "tools/sim/gates.yml"], catalog: CAT_ID, live: LIVE, candidates: [...CAND], overrides: [...CAND_OVERRIDES] });
