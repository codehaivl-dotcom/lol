// Test tự động kiểm chứng 5 Gameplay Toys của Wave 1 trong Balance Lab Engine (Doc 105 §S3)
import { describe, test, expect } from "bun:test";
import { loadCandidates, kit } from "../sim/data.mjs";
import { heroUnit, minionUnit, world, run, hurt } from "../sim/engine.mjs";

describe("Wave 1 Gameplay Toys Verification Tests", () => {
  // Nạp 5 ứng viên Wave 1 với override hợp lệ
  loadCandidates("tools/sim/candidates/linh_hau.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/kael.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/lieu_tien.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/forge.yml", { allowOverride: true });
  loadCandidates("tools/sim/candidates/jeli.yml", { allowOverride: true });

  test("Toy 1: Linh Hau staff reach modulation - stance, range & sweetspot", () => {
    const lh = heroUnit("linh_hau", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("moc_lam", { team: "red", pos: { x: 3.5, z: 0 } });
    foe.idle = true;
    const W = world([lh, foe], { seed: 42, maxT: 2 });

    expect(lh.staffUntil).toBe(0);
    expect(lh.k.passive.type).toBe("staff_reach");

    // Kích hoạt Trường Trượng (tầm đánh tăng lên 4.8m)
    lh.staffUntil = 10.0;
    expect(lh.staffUntil).toBeGreaterThan(0);

    run(W);

    // Linh Hầu đánh trúng ở cự ly 3.5m (ngoài tầm cận chiến thông thường 2.0m) và proc sweetspot rìa trượng
    expect(lh.m.dealt).toBeGreaterThan(0);
    expect(lh.procs["passive:staff_sweetspot"]).toBeGreaterThanOrEqual(1);
  });

  test("Toy 2: Kael Cuong Nhip - stack accumulation, attack speed bonus & decay", () => {
    const kael = heroUnit("kael", { team: "blue", pos: { x: 0, z: 0 } });
    const foeHero = heroUnit("moc_lam", { team: "red", pos: { x: 1.2, z: 0 } });
    foeHero.idle = true;
    const W = world([kael, foeHero], { seed: 42, maxT: 2 });

    expect(kael.k.passive.type).toBe("cuong_nhip");
    expect(kael.cuongNhip).toBeNull();

    // Chạy giao tranh 2 giây
    run(W);

    // Kael phải tích được tầng Cuồng Nhịp
    expect(kael.cuongNhip).toBeDefined();
    expect(kael.cuongNhip.stacks).toBeGreaterThan(0);

    // Kiểm tra quy tắc suy giảm: khi ngừng giao tranh quá delay 2s
    const stacksBefore = kael.cuongNhip.stacks;
    kael.cuongNhip.lastHit = W.t - 5.0; // đã quá delay
    const foeDistant = heroUnit("moc_lam", { team: "red", pos: { x: 50, z: 50 } });
    foeDistant.idle = true;
    const W_decay = world([kael, foeDistant], { seed: 1, maxT: 1.5 });
    run(W_decay);
    expect(kael.cuongNhip.stacks).toBeLessThan(stacksBefore);
  });

  test("Toy 3: Lieu Tien frost trail - kiting speed boost & enemy slow without collision", () => {
    const lt = heroUnit("lieu_tien", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("kha_tan", { team: "red", pos: { x: 5.0, z: 0 } });
    const W = world([lt, foe], { seed: 42, maxT: 3 });

    expect(lt.k.passive.type).toBe("frost_trail");

    // Cho Liễu Tiễn bắn đối thủ và thả diều lùi bước
    run(W);

    // Vệt băng phải được tạo trong W.zones
    expect(W.zones.length).toBeGreaterThan(0);
    const trail = W.zones.find((z) => z.type === "frost_trail");
    expect(trail).toBeDefined();
    expect(trail.team).toBe("blue");
    expect(trail.speedBoost).toBeGreaterThanOrEqual(0.20);
    expect(trail.slowRatio).toBeGreaterThanOrEqual(0.25);
  });

  test("Toy 4: Forge heat gauge - damage intake heating, bonus resist & heat vent", () => {
    const forge = heroUnit("forge", { team: "blue", pos: { x: 0, z: 0 } });
    const foe = heroUnit("van_dao", { team: "red", pos: { x: 1.5, z: 0 } });
    const W = world([forge, foe], { seed: 42, maxT: 1 });

    expect(forge.k.passive.type).toBe("heat_gauge");
    expect(forge.heat).toBe(0);

    // Cho Forge chịu 500 sát thương vật lý
    hurt(W, foe, forge, 500, "physical");

    // Forge phải tích được nhiệt từ việc nhận sát thương
    expect(forge.heat).toBeGreaterThan(10);

    // Kiểm tra cơ chế xả áp (vent heat) khi dùng RMB
    forge.pending = { slot: "rmb", ab: forge.k.rmb, rank: 1, tgt: forge, at: W.t };
    const W_vent = world([forge, foe], { seed: 1, maxT: 0.1 });
    run(W_vent);

    // Sau khi xả áp, nhiệt phải về 0 và kích hoạt proc heat_vent
    expect(forge.heat).toBe(0);
    expect(forge.procs["passive:heat_vent"]).toBe(1);
    expect(forge.m.shieldGiven).toBeGreaterThan(0);
  });

  test("Toy 5: Jeli chime resonance - periodic ally healing and distinct shield tracking", () => {
    const jeli = heroUnit("jeli", { team: "blue", pos: { x: 0, z: 0 } });
    const hurtAlly = heroUnit("moc_lam", { team: "blue", pos: { x: 2.0, z: 0 }, hpPct: 0.4 });
    const foeDistant = heroUnit("kha_tan", { team: "red", pos: { x: 50.0, z: 0 } });
    foeDistant.idle = true;
    const allyHpBefore = hurtAlly.hp;

    const W = world([jeli, hurtAlly, foeDistant], { seed: 42, maxT: 5.0 }); // chạy 5s (vượt chu kỳ chuông 3.5s)
    expect(jeli.k.passive.type).toBe("chime_resonance");

    run(W);

    // Đồng minh bị thương phải được hồi máu bởi sóng chuông
    expect(hurtAlly.hp).toBeGreaterThan(allyHpBefore);
    expect(jeli.m.allyHealed).toBeGreaterThan(0);
    expect(jeli.procs["passive:chime_resonance"]).toBeGreaterThan(0);

    // Kiểm tra Jeli dùng RMB ban khiên và hồi máu cùng lúc
    const jeliSolo = heroUnit("jeli", { team: "blue", pos: { x: 0, z: 0 }, hpPct: 0.5 });
    const ally2 = heroUnit("moc_lam", { team: "blue", pos: { x: 1.5, z: 0 }, hpPct: 0.5 });
    const dummyFoe = heroUnit("kha_tan", { team: "red", pos: { x: 50.0, z: 0 } });
    dummyFoe.idle = true;
    const W_rmb = world([jeliSolo, ally2, dummyFoe], { seed: 1, maxT: 0.5 });
    jeliSolo.pending = { slot: "rmb", ab: jeliSolo.k.rmb, rank: 1, tgt: jeliSolo, at: W_rmb.t };
    run(W_rmb);

    // Cả shield và heal đều được tính và tách biệt độc lập
    expect(jeliSolo.m.shieldGiven).toBeGreaterThan(0);
    expect(jeliSolo.m.allyHealed + jeliSolo.m.healed).toBeGreaterThan(0);
  });
});
