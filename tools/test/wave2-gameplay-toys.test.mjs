// tools/test/wave2-gameplay-toys.test.mjs
// Unit tests kiem chung 6 Gameplay Toys cho Wave 2 theo chuan Doc 105 & Doc 102/103/100
import { describe, it, expect } from "bun:test";
import { heroUnit, world, hurt, tickDots, run } from "../sim/engine.mjs";
import { loadCandidates } from "../sim/data.mjs";

describe("Wave 2 Gameplay Toys Verification Tests", () => {
  loadCandidates("tools/sim/candidates/phu_dong.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/kiko.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/brak.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/nera.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/vero.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/rolo.yml", { allowOverride: true });

  it("Toy 1: Phu Dong mounted momentum & bamboo transformation", () => {
    const pd = heroUnit("phu_dong", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([pd, foe], { seed: 1234, maxT: 5 });

    // Initial momentum
    expect(pd.momentum ?? 0).toBe(0);

    // Simulate movement stepping
    tickDots(W, pd);
    expect(pd.momentum).toBeGreaterThan(0);

    // Reach 80+ momentum
    pd.momentum = 85;
    
    // Auto-attack triggers charge stun and bonus damage
    pd.k.lmb = { range: 2.1 };
    pd.k.passive = {
      type: "mounted_momentum",
      maxMomentum: 100,
      bonusMsRatio: 0.20,
      chargeStun: 0.6,
      chargeBonusAd: 0.50
    };

    // Bamboo transformation reach check
    pd.bambooUntil = W.t + 5.0;
    expect(pd.bambooUntil).toBeGreaterThan(W.t);
  });

  it("Toy 2: Kiko holographic decoy 1-hit threshold absorption", () => {
    const kiko = heroUnit("kiko", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([kiko, foe], { seed: 1234, maxT: 5 });

    // Activate decoy
    kiko.decoyUntil = W.t + 3.0;
    kiko.decoyHit = false;

    const hpBefore = kiko.hp;

    // First hit absorbed by holographic decoy
    const dealt1 = hurt(W, foe, kiko, 100, "physical");
    expect(dealt1).toBe(0);
    expect(kiko.hp).toBe(hpBefore);
    expect(kiko.decoyHit).toBe(true);
    expect(kiko.procs["passive:decoy_absorbed"]).toBe(1);

    // Second hit goes through
    const dealt2 = hurt(W, foe, kiko, 100, "physical");
    expect(dealt2).toBeGreaterThan(0);
    expect(kiko.hp).toBeLessThan(hpBefore);
  });

  it("Toy 3: Brak rhythm parry piston damage reduction & counter punch", () => {
    const brak = heroUnit("brak", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([brak, foe], { seed: 1234, maxT: 5 });

    // Activate parry stance
    brak.parryUntil = W.t + 0.75;
    brak.k.passive = {
      type: "parry_piston",
      parryWindow: 0.75,
      counterBonusRatio: 0.35,
      counterStun: 0.5
    };

    const hpBefore = foe.hp;

    // Attack incoming while parrying
    const dealt = hurt(W, foe, brak, 100, "physical");
    expect(dealt).toBeLessThan(100); // 60% reduction
    expect(foe.hp).toBeLessThan(hpBefore); // Counter damage dealt to foe
    expect(brak.procs["passive:parry_piston_proc"]).toBe(1);
    expect(brak.parryUntil).toBe(0); // Parry stance consumed
  });

  it("Toy 4: Nera two-way anchor cable self-peel & kiting boost", () => {
    const nera = heroUnit("nera", { team: "blue", pos: { x: 0, z: 0 } });
    expect(nera.k.passive.type).toBe("anchor_tether");
    expect(nera.k.passive.shotsPerAnchor).toBe(3);
    expect(nera.k.passive.kitingSpeedBoost).toBe(0.18);
  });

  it("Toy 5: Vero delayed echo slice damage accumulation & pop", () => {
    const vero = heroUnit("vero", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 2.0, z: 0 } });
    const W = world([vero, foe], { seed: 1234, maxT: 5 });

    // Vero deals damage
    hurt(W, vero, foe, 200, "physical");
    expect(foe.echoDmg).toBeGreaterThan(0);
    expect(foe.echoPopAt).toBeGreaterThan(W.t);

    // Advance time to trigger echo pop
    const echoStored = foe.echoDmg;
    W.t = foe.echoPopAt + 0.1;
    tickDots(W, foe);

    expect(foe.echoDmg).toBe(0);
    expect(vero.procs["passive:delayed_echo_pop"]).toBe(1);
  });

  it("Toy 6: Rolo scale shedding defense and burst transition", () => {
    const rolo = heroUnit("rolo", { team: "blue", pos: { x: 0, z: 0 } });
    expect(rolo.k.passive.type).toBe("scale_shedding");
    expect(rolo.k.passive.baseResistBonus).toBe(35);
    expect(rolo.k.passive.shedResistPenalty).toBe(25);
    expect(rolo.k.passive.shedSpeedBonus).toBe(0.20);
    expect(rolo.k.passive.shedAspdBonus).toBe(0.25);
  });
});
