// tools/test/wave4-gameplay-toys.test.mjs
// Unit tests kiem chung thuc te 7 Gameplay Toys cho Wave 4 theo chuan Doc 105 & Doc 100/102
// Test day du chuoi hanh vi: cast ability, buff window, zone creation, CC transmute, debt payback va counterplay
import { describe, it, expect } from "bun:test";
import { heroUnit, world, hurt, tickDots, castStart, resolve, autoAttack, ms, aspd, DT } from "../sim/engine.mjs";
import { loadCandidates } from "../sim/data.mjs";

describe("Wave 4 Gameplay Toys Verification Tests", () => {
  loadCandidates("tools/sim/candidates/inka.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/mok.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/libro.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/pavo.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/kymos.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/eelix.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/oneira.yml", { allowOverride: true });

  it("Toy 1: Inka ink path zone creation & directional speed modulation", () => {
    const inka = heroUnit("inka", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const ally = heroUnit("moc_lam", { team: "blue", pos: { x: 1.0, z: 0 } });
    const foe = heroUnit("bach_dien", { team: "red", pos: { x: 1.0, z: 0 } });
    const W = world([inka, ally, foe], { seed: 1901, maxT: 20 });

    const allyBaseMs = ms(ally, W.t);
    const foeBaseMs = ms(foe, W.t);

    // Cast Q (Thư Pháp Tuyến Kích): drops ink path zone
    castStart(W, inka, foe, "q", inka.k.q, 1);
    W.t += 0.15;
    resolve(W, inka);

    expect(inka.procs["passive:ink_path"]).toBe(1);
    const inkZone = W.zones.find((z) => z.type === "ink_path");
    expect(inkZone).toBeDefined();

    // Ally inside ink path gets +20% MS
    expect(ms(ally, W.t)).toBeGreaterThan(allyBaseMs);
    // Foe inside ink path is slowed by 25%
    expect(ms(foe, W.t)).toBeLessThan(foeBaseMs);

    // After ink path expires (4.0s), movement speeds return to normal
    W.t = inkZone.until + 0.5;
    expect(ms(ally, W.t)).toBeCloseTo(allyBaseMs, 1);
    expect(ms(foe, W.t)).toBeCloseTo(foeBaseMs, 1);
  });

  it("Toy 2: Mok lantern beacon vision zone & detonation", () => {
    const mok = heroUnit("mok", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("bach_dien", { team: "red", pos: { x: 4.0, z: 0 } });
    const W = world([mok, foe], { seed: 3701, maxT: 20 });

    // Cast Q (Cắm Cổ Đăng): places lantern beacon zone
    castStart(W, mok, foe, "q", mok.k.q, 1);
    W.t += 0.15;
    resolve(W, mok);

    expect(mok.procs["passive:lantern_placed"]).toBe(1);
    const beacon = W.zones.find((z) => z.type === "lantern_beacon");
    expect(beacon).toBeDefined();
    expect(beacon.r).toBe(6.0);

    // Cast RMB (Huỳnh Quang Hộ Mệnh): detonates lantern
    castStart(W, mok, mok, "rmb", mok.k.rmb, 1);
    W.t += 0.1;
    resolve(W, mok);

    expect(mok.procs["passive:lantern_detonated"]).toBe(1);
  });

  it("Toy 3: Libro debt ledger postponement & gradual payback", () => {
    const libro = heroUnit("libro", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("bach_dien", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([libro, foe], { seed: 2801, maxT: 20 });

    // Cast RMB (Sổ Nợ Ký Ức): opens debt ledger
    castStart(W, libro, libro, "rmb", libro.k.rmb, 1);
    W.t += 0.1;
    resolve(W, libro);

    expect(libro.debtUntil).toBeGreaterThan(W.t);
    expect(libro.debtRatio).toBe(0.70);
    expect(libro.procs["passive:debt_ledger"]).toBe(1);

    // Incoming 100 damage: 70% is postponed into debtPool, only 30% taken immediately
    const hpBeforeDmg = libro.hp;
    hurt(W, foe, libro, 100, "physical");
    const immediateDmg = hpBeforeDmg - libro.hp;

    expect(immediateDmg).toBeLessThan(50);
    expect(libro.debtPool).toBeGreaterThan(0);
    expect(libro.procs["passive:debt_postponed"]).toBeGreaterThan(0);

    // Advance time past debt window (2.5s) and clear temporary shields: debt matures and begins paying back via tickDots
    W.t = libro.debtUntil + 1.0;
    libro.shields = [];
    const hpAtMaturity = libro.hp;
    for (let i = 0; i < 5; i++) {
      W.t += DT;
      tickDots(W, libro);
    }
    expect(libro.hp).toBeLessThan(hpAtMaturity);
  });

  it("Toy 4: Pavo peacock gaze directional fear", () => {
    const pavo = heroUnit("pavo", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("bach_dien", { team: "red", pos: { x: 3.0, z: 0 } });
    const W = world([pavo, foe], { seed: 3501, maxT: 20 });

    expect(foe.charmUntil).toBe(0);

    // Cast RMB (Khai Mạc Khổng Tước): fears enemies facing Pavo within 5.5m
    castStart(W, pavo, pavo, "rmb", pavo.k.rmb, 1);
    W.t += 0.1;
    resolve(W, pavo);

    expect(foe.charmUntil).toBeGreaterThan(W.t);
    expect(foe.charmBy).toBe(pavo);
    expect(pavo.procs["passive:peacock_fear"]).toBe(1);
  });

  it("Toy 5: Kymos acoustic node shockwave mitigation", () => {
    const kymos = heroUnit("kymos", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const ally = heroUnit("moc_lam", { team: "blue", pos: { x: 1.5, z: 0 } });
    const foe = heroUnit("bach_dien", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([kymos, ally, foe], { seed: 4901, maxT: 20 });

    // Baseline unmitigated burst damage to ally
    const allyHp1 = ally.hp;
    hurt(W, foe, ally, 100, "physical");
    const unmitigatedBurst = allyHp1 - ally.hp;

    // Cast RMB (Điểm Rung Hạ Âm): places acoustic node zone
    castStart(W, kymos, kymos, "rmb", kymos.k.rmb, 1);
    W.t += 0.1;
    resolve(W, kymos);

    expect(kymos.procs["passive:acoustic_node"]).toBe(1);
    const node = W.zones.find((z) => z.type === "acoustic_node");
    expect(node).toBeDefined();

    // Burst damage while ally is inside node is reduced by 40%
    const allyHp2 = ally.hp;
    hurt(W, foe, ally, 100, "physical");
    const mitigatedBurst = allyHp2 - ally.hp;

    expect(mitigatedBurst).toBeLessThan(unmitigatedBurst * 0.7);
    expect(ally.procs["passive:acoustic_mitigation"]).toBeGreaterThan(0);
  });

  it("Toy 6: Eelix shadow wake speed boost & chain lightning strike", () => {
    const eelix = heroUnit("eelix", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("bach_dien", { team: "red", pos: { x: 1.5, z: 0 } });
    const W = world([eelix, foe], { seed: 3301, maxT: 20 });

    const baseMs = ms(eelix, W.t);

    // Normal attack without shadow wake
    const foeHp1 = foe.hp;
    autoAttack(W, eelix, foe);
    const normalAtkDmg = foeHp1 - foe.hp;

    // Cast Q (Thủy Uyên Trườn Lướt): drops shadow wake and grants buff
    castStart(W, eelix, foe, "q", eelix.k.q, 1);
    W.t += 0.15;
    resolve(W, eelix);

    expect(eelix.shadowWakeUntil).toBeGreaterThan(W.t);
    expect(ms(eelix, W.t)).toBeGreaterThan(baseMs);
    expect(eelix.procs["passive:shadow_wake"]).toBe(1);

    // Next attack triggers chain lightning magic damage
    eelix.atkReady = 0;
    const foeHp2 = foe.hp;
    autoAttack(W, eelix, foe);
    const chainAtkDmg = foeHp2 - foe.hp;

    expect(chainAtkDmg).toBeGreaterThan(normalAtkDmg);
    expect(eelix.procs["passive:shadow_wake_strike"]).toBe(1);
  });

  it("Toy 7: Oneira CC absorb & transmutation", () => {
    const oneira = heroUnit("oneira", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const ally = heroUnit("moc_lam", { team: "blue", pos: { x: 2.0, z: 0 } });
    const foe = heroUnit("bach_dien", { team: "red", pos: { x: 3.0, z: 0 } });
    const W = world([oneira, ally, foe], { seed: 4801, maxT: 20 });

    // Ally gets hit with soft CC (slow and root)
    ally.slows.push({ pct: 0.5, until: W.t + 3.0 });
    ally.rootUntil = W.t + 2.5;
    expect(ally.slows.length).toBeGreaterThan(0);
    expect(ally.rootUntil).toBeGreaterThan(W.t);

    // Cast RMB (Mặt Nạ Hút Khống Chế): absorbs CC from ally
    castStart(W, oneira, oneira, "rmb", oneira.k.rmb, 1);
    W.t += 0.1;
    resolve(W, oneira);

    expect(ally.slows.length).toBe(0);
    expect(ally.rootUntil).toBeLessThanOrEqual(W.t);
    expect(oneira.procs["passive:cc_transmuted"]).toBe(1);
  });
});
