// tools/test/wave2-gameplay-toys.test.mjs
// Unit tests kiem chung thuc te 6 Gameplay Toys cho Wave 2 theo chuan Doc 105 & Doc 102/103/100
// Test day du chuoi hanh vi: cast ability, cooldown/buff window, hit/range expansion, expiry, kiting va counterplay
import { describe, it, expect } from "bun:test";
import { heroUnit, world, hurt, tickDots, castStart, resolve, autoAttack, ms, aspd, DT } from "../sim/engine.mjs";
import { loadCandidates } from "../sim/data.mjs";

describe("Wave 2 Gameplay Toys Verification Tests", () => {
  loadCandidates("tools/sim/candidates/phu_dong.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/kiko.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/brak.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/nera.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/vero.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/rolo.yml", { allowOverride: true });

  it("Toy 1: Phu Dong mounted momentum & bamboo transformation (full cast sequence & reach shift)", () => {
    const pd = heroUnit("phu_dong", { level: 6, team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 3.2, z: 0 } });
    const W = world([pd, foe], { seed: 1234, maxT: 20 });

    // 1. Initial reach check: at distance 3.2m, basic attack cannot reach (base reach is 2.1m + 0.6r + 0.3 = 3.0m)
    expect(pd.k.lmb.range).toBe(2.1);
    const hitBeforeUlt = autoAttack(W, pd, foe);
    expect(hitBeforeUlt).toBe(false);

    // 2. Cast R (Thien Loi Co Truc): triggers bamboo stance transition
    expect(pd.k.r).toBeDefined();
    castStart(W, pd, foe, "r", pd.k.r, 1);
    W.t += (pd.k.r.windup ?? 0.2) + DT;
    resolve(W, pd);

    expect(pd.bambooUntil).toBeGreaterThan(W.t);
    expect(pd.procs["passive:bamboo_transformation"]).toBe(1);

    // 3. R dash placed Phù Đổng near foe. Now test bamboo reach boundary (3.2m):
    // Move foe to 3.2m away from Phù Đổng's new position
    foe.pos.x = pd.pos.x + 3.2;
    foe.pos.z = pd.pos.z;

    // During bamboo transformation (6.0s), reach expands to 3.5m (total reach = 3.5 + 0.6r + 0.3 = 4.4m)!
    // Auto-attack at 3.2m now successfully hits and deals bamboo sweep bonus damage
    const foeHpBeforeSweep = foe.hp;
    pd.atkReady = 0; // ready to attack
    const hitDuringUlt = autoAttack(W, pd, foe);
    expect(hitDuringUlt).toBe(true);
    expect(foe.hp).toBeLessThan(foeHpBeforeSweep);
    expect(pd.procs["passive:bamboo_sweep"]).toBe(1);

    // 4. Advance time past bamboo transformation expiry
    W.t = pd.bambooUntil + 0.5;
    pd.atkReady = 0;

    // Reach returns to normal 2.1m (total reach = 2.1 + 0.6r + 0.3 = 3.0m) -> attack at 3.2m fails!
    const hitAfterExpiry = autoAttack(W, pd, foe);
    expect(hitAfterExpiry).toBe(false);

    // Moving foe to 1.8m restores hit ability with normal lance
    foe.pos.x = pd.pos.x + 1.8;
    const hitAtCloseRange = autoAttack(W, pd, foe);
    expect(hitAtCloseRange).toBe(true);

    // 5. Momentum mechanic: moving increases momentum; at >= 80 first hit stuns and deals bonus damage
    pd.momentum = 0;
    for (let step = 0; step < 10; step++) {
      tickDots(W, pd);
    }
    expect(pd.momentum).toBeGreaterThan(0);

    pd.momentum = 90;
    foe.stunUntil = 0;
    pd.atkReady = 0;
    const hpBeforeCharge = foe.hp;
    autoAttack(W, pd, foe);

    expect(foe.stunUntil).toBeGreaterThan(W.t); // chargeStun applied
    expect(foe.hp).toBeLessThan(hpBeforeCharge); // bonus damage applied
    expect(pd.procs["passive:mounted_momentum_hit"]).toBe(1);
    expect(pd.momentum).toBe(0); // momentum consumed
  });

  it("Toy 2: Kiko holographic decoy 1-hit threshold absorption (cast & damage negation)", () => {
    const kiko = heroUnit("kiko", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([kiko, foe], { seed: 1234, maxT: 10 });

    // 1. Cast Q (or RMB) to spawn holographic decoy
    castStart(W, kiko, foe, "q", kiko.k.q, 1);
    W.t += (kiko.k.q.windup ?? 0.1) + DT;
    resolve(W, kiko);

    expect(kiko.decoyUntil).toBeGreaterThan(W.t);
    expect(kiko.decoyHit).toBe(false);
    expect(kiko.procs["passive:decoy_spawn"]).toBe(1);

    const hpBefore = kiko.hp;

    // 2. First hit from enemy is absorbed by decoy (0 damage dealt to Kiko)
    const dealt1 = hurt(W, foe, kiko, 150, "physical");
    expect(dealt1).toBe(0);
    expect(kiko.hp).toBe(hpBefore);
    expect(kiko.decoyHit).toBe(true);
    expect(kiko.procs["passive:decoy_absorbed"]).toBe(1);

    // 3. Second hit penetrates and deals normal damage
    const dealt2 = hurt(W, foe, kiko, 150, "physical");
    expect(dealt2).toBeGreaterThan(0);
    expect(kiko.hp).toBeLessThan(hpBefore);
  });

  it("Toy 3: Brak rhythm parry piston damage reduction & counter punch (cast & parry reaction)", () => {
    const brak = heroUnit("brak", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([brak, foe], { seed: 1234, maxT: 10 });

    // 1. Cast RMB (Nghênh Kích Thủ Thế) to enter parry stance
    castStart(W, brak, foe, "rmb", brak.k.rmb, 1);
    W.t += (brak.k.rmb.windup ?? 0.05) + DT;
    resolve(W, brak);

    expect(brak.parryUntil).toBeGreaterThan(W.t);
    expect(brak.procs["passive:parry_stance"]).toBe(1);

    const foeHpBefore = foe.hp;

    // 2. Enemy strikes while Brak is in parry stance
    // Damage reduced by 60% and counter-punch fired back at foe with 0.5s stun
    const dealt = hurt(W, foe, brak, 200, "physical");
    expect(dealt).toBeLessThan(200 * 0.5); // reduced by 60% plus armor mitigation
    expect(foe.hp).toBeLessThan(foeHpBefore); // counter damage inflicted
    expect(foe.stunUntil).toBeGreaterThan(W.t); // counterStun 0.5s inflicted
    expect(brak.procs["passive:parry_piston_proc"]).toBe(1);
    expect(brak.parryUntil).toBe(0); // parry stance consumed
  });

  it("Toy 4: Nera two-way anchor cable self-peel & kiting boost (3-hit tether & backward dash)", () => {
    const nera = heroUnit("nera", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 5.0, z: 0 } });
    const W = world([nera, foe], { seed: 1234, maxT: 15 });

    expect(nera.k.passive.type).toBe("anchor_tether");
    const baseSpeed = nera.s.moveSpeed;

    // 1. Perform 3 consecutive basic attacks
    nera.atkReady = 0;
    autoAttack(W, nera, foe); // hit 1
    expect(nera.hitN).toBe(1);

    W.t += 1 / aspd(nera, W.t) + DT;
    nera.atkReady = 0;
    autoAttack(W, nera, foe); // hit 2
    expect(nera.hitN).toBe(2);

    W.t += 1 / aspd(nera, W.t) + DT;
    nera.atkReady = 0;
    autoAttack(W, nera, foe); // hit 3 -> triggers anchor_tether!
    expect(nera.hitN).toBe(3);

    // 2. Verify tether effects: +18% MS for kiting and enemy slowed by 25%
    expect(ms(nera, W.t)).toBeGreaterThan(baseSpeed);
    expect(foe.slows.length).toBeGreaterThan(0);
    expect(foe.slows[0].pct).toBe(0.25);
    expect(nera.procs["passive:anchor_kiting"]).toBe(1);

    // 3. Advance time past tether duration -> speed returns to base
    W.t += (nera.k.passive.anchorDuration ?? 3.0) + 0.5;
    expect(ms(nera, W.t)).toBeCloseTo(baseSpeed, 1);

    // 4. Cast RMB (Phong Toi Hai Chieu - backward dash self-peel)
    const neraXBefore = nera.pos.x;
    castStart(W, nera, foe, "rmb", nera.k.rmb, 1);
    W.t += (nera.k.rmb.windup ?? 0.05) + DT;
    resolve(W, nera);

    // Toward is false -> Nera dashes backward away from foe (x becomes more negative)
    expect(nera.pos.x).toBeLessThan(neraXBefore);
  });

  it("Toy 5: Vero delayed echo slice damage accumulation & pop (damage store & timer pop)", () => {
    const vero = heroUnit("vero", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([vero, foe], { seed: 1234, maxT: 10 });

    // 1. Vero deals 200 physical damage
    hurt(W, vero, foe, 200, "physical");
    expect(foe.echoDmg).toBeGreaterThan(0);
    expect(foe.echoPopAt).toBe(W.t + 2.5);

    // 2. Before 2.5s, echo remains unpopped
    W.t += 1.0;
    tickDots(W, foe);
    expect(foe.echoDmg).toBeGreaterThan(0);

    // 3. Advance past 2.5s -> tickDots triggers delayed echo pop
    const foeHpBeforePop = foe.hp;
    W.t = foe.echoPopAt + DT;
    tickDots(W, foe);

    expect(foe.echoDmg).toBe(0);
    expect(foe.hp).toBeLessThan(foeHpBeforePop);
    expect(vero.procs["passive:delayed_echo_pop"]).toBe(1);
  });

  it("Toy 6: Rolo scale shedding defense and burst transition (base armor & shedding burst mode)", () => {
    const rolo = heroUnit("rolo", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([rolo, foe], { seed: 1234, maxT: 15 });

    const baseSpeed = rolo.s.moveSpeed;
    const baseAspd = rolo.s.attackSpeed;

    // 1. In armored stance (no shedding), incoming physical damage is heavily mitigated (+35 bonus armor)
    const roloHp0 = rolo.hp;
    const dealtArmored = hurt(W, foe, rolo, 200, "physical");
    const armoredHpDamage = roloHp0 - rolo.hp;

    // 2. Cast RMB (Thao Vay Cuong Chien) to enter shed mode (receives 75 shield for 2.5s and shed mode for 5.0s)
    castStart(W, rolo, foe, "rmb", rolo.k.rmb, 1);
    W.t += (rolo.k.rmb.windup ?? 0.05) + DT;
    resolve(W, rolo);

    expect(rolo.shedUntil).toBeGreaterThan(W.t);
    expect(rolo.procs["passive:scale_shedding_burst"]).toBe(1);

    // 3. During shedding mode: +20% MS, +25% AS
    expect(ms(rolo, W.t)).toBeGreaterThan(baseSpeed);
    expect(aspd(rolo, W.t)).toBeGreaterThan(baseAspd);

    // 4. In shed mode, Rolo suffers -25 armor penalty (vs +35 in armored mode)
    // Post-armor damage dealt is strictly higher due to 60 lower armor!
    const dealtShed = hurt(W, foe, rolo, 200, "physical");
    expect(dealtShed).toBeGreaterThan(dealtArmored);

    // 5. Advance time past shield duration (2.5s) while shed mode (5.0s) is still active
    W.t += 2.6;
    const roloHpShed = rolo.hp;
    hurt(W, foe, rolo, 200, "physical");
    const shedHpDamage = roloHpShed - rolo.hp;
    // Without shield, shed mode takes strictly more HP damage than armored mode
    expect(shedHpDamage).toBeGreaterThan(armoredHpDamage);

    // 6. Advance time past shedding duration (5.0s) -> stats and armor return to armored state
    W.t = rolo.shedUntil + 0.5;
    expect(ms(rolo, W.t)).toBeCloseTo(baseSpeed, 1);
    expect(aspd(rolo, W.t)).toBeCloseTo(baseAspd, 1);
    const dealtBackArmored = hurt(W, foe, rolo, 200, "physical");
    expect(dealtBackArmored).toBeCloseTo(dealtArmored, 1);
  });
});
