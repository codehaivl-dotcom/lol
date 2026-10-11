import assert from 'node:assert/strict';
import {readPinned} from './source-snapshot.mjs';
const pin='9351e23c6c6b4cc55a160dbf7aec268973b6394d';
let n=0;
function check(f){f();n++;}
check(()=>assert.match(readPinned(pin,'scripts/lib/data/economy.yml'),/iron_plate:/));
check(()=>assert.throws(()=>readPinned('origin/main','scripts/lib/combat.js'),/Invalid/));
check(()=>assert.throws(()=>readPinned(pin,'scripts/../secret'),/Invalid/));
check(()=>assert.throws(()=>readPinned(pin,'C:/secret'),/Invalid/));
check(()=>assert.throws(()=>readPinned(pin,'scripts/not-registered.js'),/not registered/));
check(()=>assert.throws(()=>readPinned('f'.repeat(40),'scripts/lib/combat.js'),/Bundled snapshot unavailable/));
console.log(`${n}/${n} SNAPSHOT_READER assertions; run with COLINH_SNAPSHOT_ONLY=1`);
