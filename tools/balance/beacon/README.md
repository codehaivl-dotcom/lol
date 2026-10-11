# Mạch Đăng: runnable offline model

Run from the existing repository, no dependencies:

```sh
node tools/balance/beacon/test.mjs
node tools/balance/beacon/simulate.mjs --n 300 --seed 1000
```

Outputs: `reports/production-2026-10-09/beacon-tests.json`, `beacon-sweep.json/.csv`, `beacon-timeline.json/.csv/.svg`. The SVG is a concrete timing diagram, not a gameplay screenshot.

Both entrypoints accept `--help` and `--out <directory>` (relative to the calling directory). Inputs/config reject invalid clocks, teams, missing parameters, coordinate values and duplicate/reserved IDs. Fixture reset clears alive/CC/connection flags to a healthy connected baseline and resets tool/gold, while retaining fixture player coordinates; this is not the runtime spawn/reset contract.

`config.json` owns trial values from doc61. **All values are experimental**, not approved balance. Radius 12 m, interaction 2 m, coordinate pair ±12 m, axis-aligned LOS boxes and the stun/root/charm mapping are explicit offline fixtures. Sweep radii 8/12/16 m, cooldowns 25/35/45 s, squad sizes 1/3/5 and switch on/off. Do not apply these coordinates to Mạch Giữa or Cửu Mạch.

Model covers tiers, capture, interruption, defensive switch, shared anti-spam, ownership cycles, expiry, persistence/reset, simple LOS, brush/stealth and limited-information bot policy. Snapshot restore models durable state; it does **not** test Spawn restart, ticking, networking, cross-place routing or player reconnect.

Synthetic 180-second opportunities have fixed 70% reachability and no combat. Paired seeds allow a reproducible comparison, not a prediction of win rate/comeback. No navigation, wave opportunity cost, projectile, stealth kit, support farm, UI, art, audio, target selection, minimap or real device simulation. Two-team observations demonstrate a model API's omission of hidden enemies; they are not proof of runtime information safety. Bot policy has five outputs and only observes caller-provided facts; it is a contract probe, not an integrated bot.

No code imports this model into the game. Do not call `PASS_MODEL` a client pass or label the feature production-ready. Next integration owner Savi: implement behind a prototype flag, map states to referee/data, then compare the same scenarios with runtime traces and two clients before release.
