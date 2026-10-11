// Packages a reproducible offline lab. Does not alter gameplay or push.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dir,'../..');
process.chdir(root);
const latest=execFileSync('git',['rev-parse','origin/main'],{encoding:'utf8'}).trim();
const pins=[latest,'dcdbfb3d3cfe83ae65ed91a85dd439dceeb38f90','ad7948ab9710ac1adb2b561049821da8e0cb1da8'];
const files=['scripts/lib/data/heroes.yml','scripts/lib/data/economy.yml','scripts/lib/data/lobby.yml','scripts/lib/data/map.yml','scripts/lib/data/structures.yml','scripts/lib/combat.js','scripts/referee/core.js','scripts/referee/match.js','scripts/lane.js','scripts/hero/match.js','scripts/hero/match/combat.js','scripts/architecture.json'];
const latestOnly=['scripts/hero/match/aim.js','scripts/hero/match/economy.js','scripts/hero/match/roster.js','scripts/referee/single.js','scripts/bot.js','scripts/screens/match/model.js','scripts/screens/match/widgets/minimap.js','scripts/screens/match/controls/touch.js','scripts/screens/match/controls/stick.js','scripts/ui.js'];
for(const commit of new Set(pins)){
 const dir=path.join(root,'fixtures/production-source',commit),hashes={};
 for(const file of [...files,...commit===latest?latestOnly:[]]){
  const raw=execFileSync('git',['show',`${commit}:${file}`],{encoding:'utf8'});
  const target=path.join(dir,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,raw);
  hashes[file]=crypto.createHash('sha256').update(raw).digest('hex');
 }
 fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify({commit,scope:'Offline source snapshot, not current room state',files:hashes},null,2));
}
const baseline=pins[1];
const changed=execFileSync('git',['diff','--name-only',baseline,latest],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
const report={latest,baseline,changed,verification:'Compared full tracked tree names; selected bundled files SHA256. No live-room verification.'};
fs.writeFileSync('reports/production-2026-10-09/latest-source-verification.json',JSON.stringify(report,null,2));
process.stdout.write(JSON.stringify(report)+'\n');
