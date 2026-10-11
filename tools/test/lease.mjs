// Controller lease + dev PENDING gate (P0 2026-10-10). Drives scripts/referee/handback.js. Run: node tools/test/lease.mjs
import { leaseOf, mayTake } from '../../scripts/referee/handback.js'
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } else console.log('PASS', m) }
ok(leaseOf([{ id: 'A', beat: 5 }], null) === 'A', 'one body takes the seat')
ok(leaseOf([{ id: 'A', beat: 1 }, { id: 'B', beat: 9 }], 'A') === 'A', 'holder keeps the seat while it beats, even if a newer tab beats later')
ok(leaseOf([{ id: 'B', beat: 9 }], 'A') === 'B', 'holder gone: the other tab takes it')
ok(leaseOf([], 'A') === 'A', 'nobody here: lease unchanged (the drop path handles it)')
ok(leaseOf([{ id: 'A', beat: 1 }, { id: 'B', beat: 9 }], null) === 'B', 'no holder yet: freshest beat wins')
const sv = { at: 10, lease: 'B' }
ok(mayTake(sv, 'B'), 'holder takes its hand-back')
ok(!mayTake(sv, 'A'), 'stale tab cannot ack a hand-back stamped for another body')
ok(!mayTake({ ...sv, qaHold: true }, 'B'), 'dev gate keeps it PENDING')
ok(mayTake({ at: 10, lease: null }, 'A'), 'unstamped lease (older row) still taken by the one body')
ok(!mayTake({ lease: 'B' }, 'B'), 'no stamp, nothing to take')
console.log(fail ? `${fail} FAIL` : 'lease: all pass'); process.exit(fail ? 1 : 0)
