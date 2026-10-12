// tools/test/wave3-gameplay-toys.test.mjs
// Unit tests kiem chung thuc te 8 Gameplay Toys cho Wave 3 theo chuan Doc 105 & Doc 103/100
// Test day du chuoi hanh vi: cast ability, buff window, range/mitigation shift, expiry va counterplay
import { describe, it, expect } from "bun:test";
import { heroUnit, world, hurt, tickDots, castStart, resolve, autoAttack, ms, aspd, DT } from "../sim/engine.mjs";
import { loadCandidates } from "../sim/data.mjs";

describe("Wave 3 Gameplay Toys Verification Tests", () => {
  loadCandidates("tools/sim/candidates/tan_son.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/trieu_ba.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/dung_thach.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/co_lo.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/kora.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/moka.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/aero.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/iro.yml", { allowOverride: true });

  it("Toy 1: Tan Son passable jade ridge & solar aegis (full cast, zone shield & aspd slow)", () => {
    const ts = heroUnit("tan_son", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 3.0, z: 0 } });
    const W = world([ts, foe], { seed: 4401, maxT: 20 });

    // 1. Cast RMB (Vách Núi Ngọc Bích): creates passable ridge zone
    castStart(W, ts, foe, "rmb", ts.k.rmb, 1);
    W.t += 0.15;
    resolve(W, ts);

    expect(ts.ridgeUntil).toBeGreaterThan(W.t);
    expect(ts.procs["passive:passable_ridge"]).toBe(1);
    const ridgeZone = W.zones.find((z) => z.type === "passable_ridge");
    expect(ridgeZone).toBeDefined();

    // While ridge is active, Tan Son gains +25 bonus armor and mr against incoming damage
    const initialHp = ts.hp;
    hurt(W, foe, ts, 100, "physical");
    const dmgWithRidge = initialHp - ts.hp;

    // After ridge expires, armor decreases and damage taken increases
    W.t = ts.ridgeUntil + 0.5;
    const hpBeforePostRidge = ts.hp;
    hurt(W, foe, ts, 100, "physical");
    const dmgWithoutRidge = hpBeforePostRidge - ts.hp;
    expect(dmgWithoutRidge).toBeGreaterThan(dmgWithRidge);

    // 2. Cast E (Thái Dương Đông Sơn): slows foe attack speed by 25%
    const foeAspdInitial = aspd(foe, W.t);
    castStart(W, ts, foe, "e", ts.k.e, 1);
    W.t += 0.2;
    resolve(W, ts);

    expect(foe.solarSlowUntil).toBeGreaterThan(W.t);
    expect(aspd(foe, W.t)).toBeLessThan(foeAspdInitial);

    // After solar slow expires, attack speed returns to normal
    W.t = foe.solarSlowUntil + 0.5;
    expect(aspd(foe, W.t)).toBeCloseTo(foeAspdInitial, 2);
  });

  it("Toy 2: Trieu Ba orbital dragons reserve & launch (dragon count, resist scaling & water trail)", () => {
    const tb = heroUnit("trieu_ba", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 4.0, z: 0 } });
    const W = world([tb, foe], { seed: 4501, maxT: 20 });

    // 1. Initial state: 3 orbital dragons provide 3 * 12 = +36 armor & mr
    tb.dragons = 3;
    const hp1 = tb.hp;
    hurt(W, foe, tb, 100, "physical");
    const dmgWith3Dragons = hp1 - tb.hp;

    // 2. Cast Q (Thủy Long Đạn Đạo): launches 1 dragon (dragons decreases to 2)
    castStart(W, tb, foe, "q", tb.k.q, 1);
    W.t += 0.2;
    resolve(W, tb);

    expect(tb.dragons).toBe(2);
    expect(tb.procs["passive:dragon_launch"]).toBe(1);
    const trail = W.zones.find((z) => z.type === "water_trail");
    expect(trail).toBeDefined();

    // Damage with 2 dragons should be slightly higher than with 3 dragons
    const hp2 = tb.hp;
    hurt(W, foe, tb, 100, "physical");
    const dmgWith2Dragons = hp2 - tb.hp;
    expect(dmgWith2Dragons).toBeGreaterThan(dmgWith3Dragons);

    // 3. Cast RMB (Triều Dòng Quy Hồi): recalls all 3 dragons
    castStart(W, tb, tb, "rmb", tb.k.rmb, 1);
    W.t += 0.1;
    resolve(W, tb);

    expect(tb.dragons).toBe(3);
    expect(tb.procs["passive:dragons_recalled"]).toBe(1);
  });

  it("Toy 3: Dung Thach fissure cleave true damage & celestial harp soft-CC cleanse", () => {
    const dt = heroUnit("dung_thach", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 1.8, z: 0 } });
    const W = world([dt, foe], { seed: 4601, maxT: 20 });

    // 1. Hit 1 & 2: normal physical damage
    autoAttack(W, dt, foe);
    expect(dt.hitN).toBe(1);
    autoAttack(W, dt, foe);
    expect(dt.hitN).toBe(2);

    // Hit 3: triggers fissure cleave true damage bonus
    dt.atkReady = 0;
    autoAttack(W, dt, foe);
    expect(dt.hitN).toBe(3);
    expect(dt.procs["passive:fissure_cleave"]).toBe(1);

    // 2. Apply soft CC (slow and root) to Dung Thạch
    dt.slows.push({ pct: 0.4, until: W.t + 3.0 });
    dt.rootUntil = W.t + 2.0;
    expect(dt.slows.length).toBeGreaterThan(0);
    expect(dt.rootUntil).toBeGreaterThan(W.t);

    // Cast RMB (Thiên Cầm Thánh Âm): cleanses soft CC and locks attack for 1.0s
    castStart(W, dt, dt, "rmb", dt.k.rmb, 1);
    W.t += 0.15;
    resolve(W, dt);

    expect(dt.slows.length).toBe(0);
    expect(dt.rootUntil).toBeLessThanOrEqual(W.t);
    expect(dt.lockUntil).toBeGreaterThan(W.t);
    expect(dt.procs["passive:celestial_harp"]).toBe(1);
  });

  it("Toy 4: Co Lo siege stance range expansion & melee blindspot", () => {
    const cl = heroUnit("co_lo", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foeClose = heroUnit("moc_lam", { team: "red", pos: { x: 1.8, z: 0 } });
    const foeFar = heroUnit("bach_dien", { team: "red", pos: { x: 7.5, z: 0 } });
    const W = world([cl, foeClose, foeFar], { seed: 4701, maxT: 20 });

    // 1. In mobile stance: range is 5.5m (can hit close foe at 1.8m, cannot hit far foe at 7.5m)
    expect(autoAttack(W, cl, foeClose)).toBe(true);
    cl.atkReady = 0;
    expect(autoAttack(W, cl, foeFar)).toBe(false);

    // 2. Cast RMB (Cắm Chốt Huyền Quy): enters siege mode
    castStart(W, cl, cl, "rmb", cl.k.rmb, 1);
    W.t += 0.2;
    resolve(W, cl);

    expect(cl.siegeUntil).toBeGreaterThan(W.t);
    expect(ms(cl, W.t)).toBe(0); // Immobile during siege!
    expect(cl.procs["passive:siege_mode"]).toBe(1);

    // In siege mode: far foe at 7.5m is within artillery range (8.5m) and is hit!
    cl.atkReady = 0;
    expect(autoAttack(W, cl, foeFar)).toBe(true);

    // Crucial blindspot check: foe at 1.8m (< 2.5m minimum range) CANNOT be attacked!
    cl.atkReady = 0;
    expect(autoAttack(W, cl, foeClose)).toBe(false);

    // 3. When siege mode expires, mobility is restored and range returns to 5.5m
    W.t = cl.siegeUntil + 0.5;
    expect(ms(cl, W.t)).toBeGreaterThan(0);
    cl.atkReady = 0;
    expect(autoAttack(W, cl, foeFar)).toBe(false);
  });

  it("Toy 5: Kora directional shield damage mitigation", () => {
    const kr = heroUnit("kora", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.5, z: 0 } });
    const W = world([kr, foe], { seed: 3201, maxT: 20 });

    // Baseline unshielded damage
    const hp1 = kr.hp;
    hurt(W, foe, kr, 100, "physical");
    const unmitigatedDmg = hp1 - kr.hp;

    // Cast RMB (Cửa Đập Phòng Ngự): activates directional shield
    castStart(W, kr, kr, "rmb", kr.k.rmb, 1);
    W.t += 0.1;
    resolve(W, kr);

    expect(kr.guardUntil).toBeGreaterThan(W.t);
    expect(kr.procs["passive:directional_guard"]).toBe(1);

    // Damage taken while guard is active is reduced by 60%
    const hp2 = kr.hp;
    hurt(W, foe, kr, 100, "physical");
    const guardedDmg = hp2 - kr.hp;
    expect(guardedDmg).toBeLessThan(unmitigatedDmg * 0.5);
    expect(kr.procs["passive:directional_shield_block"]).toBeGreaterThan(0);

    // After guard expires, full damage is taken again
    W.t = kr.guardUntil + 0.5;
    const hp3 = kr.hp;
    hurt(W, foe, kr, 100, "physical");
    const postExpiryDmg = hp3 - kr.hp;
    expect(postExpiryDmg).toBeGreaterThan(guardedDmg);
  });

  it("Toy 6: Moka spore mark application & ambush pounce burst", () => {
    const mk = heroUnit("moka", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([mk, foe], { seed: 3101, maxT: 20 });

    // Baseline attack without spore mark
    const foeHp1 = foe.hp;
    autoAttack(W, mk, foe);
    const normalAtkDmg = foeHp1 - foe.hp;

    // Cast Q (Bào Tử Phóng Thích): marks foe with spore
    castStart(W, mk, foe, "q", mk.k.q, 1);
    W.t += 0.15;
    resolve(W, mk);

    expect(foe.sporeUntil).toBeGreaterThan(W.t);
    expect(mk.procs["passive:spore_applied"]).toBe(1);

    // Next attack triggers spore pounce bonus damage (+40% bonus AD)
    mk.atkReady = 0;
    const foeHp2 = foe.hp;
    autoAttack(W, mk, foe);
    const pounceAtkDmg = foeHp2 - foe.hp;

    expect(pounceAtkDmg).toBeGreaterThan(normalAtkDmg);
    expect(mk.procs["passive:spore_pounce"]).toBe(1);

    // After spore expires, attack damage returns to normal
    W.t = foe.sporeUntil + 0.5;
    mk.atkReady = 0;
    const foeHp3 = foe.hp;
    autoAttack(W, mk, foe);
    const postExpiryAtkDmg = foeHp3 - foe.hp;
    expect(postExpiryAtkDmg).toBeCloseTo(normalAtkDmg, 1);
  });

  it("Toy 7: Aero continuous strafe speed bonus & plasma strafe zone DoT", () => {
    const aero = heroUnit("aero", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 1.0, z: 0 } });
    const W = world([aero, foe], { seed: 1501, maxT: 20 });

    // Passive strafe speed bonus increases MS by 15%
    expect(ms(aero, W.t)).toBeCloseTo(aero.s.moveSpeed * 1.15, 2);

    // Cast Q (Tuyến Tính Oanh Tạc): drops plasma strafe zone
    castStart(W, aero, foe, "q", aero.k.q, 1);
    W.t += 0.15;
    resolve(W, aero);

    expect(aero.procs["passive:plasma_strafe"]).toBe(1);
    const plasmaZone = W.zones.find((z) => z.type === "plasma_strafe");
    expect(plasmaZone).toBeDefined();

    // Advance time and tick DoT: foe inside zone takes damage
    const foeHpInitial = foe.hp;
    for (let i = 0; i < 5; i++) {
      W.t += DT;
      tickDots(W, foe);
    }
    expect(foe.hp).toBeLessThan(foeHpInitial);
  });

  it("Toy 8: Iro static focus sniper range expansion", () => {
    const iro = heroUnit("iro", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 10.5, z: 0 } });
    const W = world([iro, foe], { seed: 3001, maxT: 20 });

    // Base reach is 7.5m (total reach = 7.5 + 0.6 + 0.3 = 8.4m); at 10.5m, cannot hit!
    expect(autoAttack(W, iro, foe)).toBe(false);

    // Standing still builds focus time (e.g. 2.5s focus = +3.75m reach, total reach > 12m)
    iro.focusTime = 2.5;
    iro.atkReady = 0;

    // With focus accumulated, attack at 10.5m connects!
    const hitWithFocus = autoAttack(W, iro, foe);
    expect(hitWithFocus).toBe(true);

    // Moving resets focus to 0 -> attack at 10.5m fails again
    iro.focusTime = 0;
    iro.atkReady = 0;
    expect(autoAttack(W, iro, foe)).toBe(false);
  });
});
