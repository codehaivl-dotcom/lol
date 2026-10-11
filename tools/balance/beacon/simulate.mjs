import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
import {BeaconModel} from './model.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url));const cfg=JSON.parse(fs.readFileSync(path.join(dir,'config.json'),'utf8'));
const arg=name=>{const i=process.argv.indexOf(name);return i<0?undefined:process.argv[i+1];};
if(process.argv.includes('--help')){console.log('node tools/balance/beacon/simulate.mjs [--n 300] [--seed 1000] [--out reports/production-2026-10-09]');process.exit(0);}
const out=arg('--out')?path.resolve(arg('--out')):path.resolve(dir,'../../../reports/production-2026-10-09');fs.mkdirSync(out,{recursive:true});
const n=Number(arg('--n')||300),seed=Number(arg('--seed')||1000);if(!Number.isInteger(n)||n<1||!Number.isInteger(seed))throw Error('n and seed must be integers; n >= 1');
function rng(s){return()=>{s=(1664525*s+1013904223)>>>0;return s/4294967296;};}
function traceScenario(){const m=new BeaconModel(cfg);m.addPlayer('attacker','red',-12,0);m.addPlayer('defender','blue',-12,0);m.addPlayer('defender2','blue',-12,0);m.begin('attacker','west');m.advance(4);m.buy('defender');m.buy('defender2');m.advance(5);m.useSwitch('defender','west');m.record(m.useSwitch('defender2','west')?'unexpected-spam':'spam-rejected','west');m.begin('attacker','west');m.advance(9);m.advance(19);m.advance(29);return m.log;}
const trace=traceScenario();fs.writeFileSync(path.join(out,'beacon-timeline.json'),JSON.stringify(trace,null,2));fs.writeFileSync(path.join(out,'beacon-timeline.csv'),'time,round,event,beacon,owner,tier,end\n'+trace.map(r=>[r.time,r.round,r.event,r.beacon,r.owner,r.tier,r.end].join(',')).join('\n')+'\n');
const rows=[];
// Synthetic opportunities arrive once per 40 s. 70% reachable is an EXOGENOUS fixture, not learned bot skill or real map accessibility.
for(const radius of [8,12,16])for(const cooldown of [25,35,45])for(const squad of [1,3,5])for(const switchEnabled of [false,true]){
 let ordinary=0,detection=0,switches=0,rejects=0,occupied=0;
 for(let i=0;i<n;i++){
  const c=structuredClone(cfg);c.fixture.visionRadius=radius;c.parameters.switchCooldown=cooldown;c.parameters.beaconSwitchCooldown=cooldown;
  const m=new BeaconModel(c),random=rng(seed+i);m.addPlayer('r','red',-12,0);for(let j=0;j<squad;j++){m.addPlayer(`b${j}`,'blue',-12,0);if(switchEnabled)m.buy(`b${j}`);}
  for(let t=0;t<180;t++){
   m.advance(t);
   if(t%40===0){m.begin('r','west');occupied+=4;}
   if(t%40===5){const reachable=random()<0.7;if(reachable&&switchEnabled)for(let j=0;j<squad;j++){if(m.useSwitch(`b${j}`,'west'))switches++;else rejects++;}}
   const b=m.beacons.west;if(b.owner==='red'){if(b.tier>0)ordinary++;if(b.tier===2)detection++;}
  }
 }
 rows.push({radius,cooldown,squad,switchEnabled,runs:n,redAnyVisionSeconds:ordinary/n,redDetectionSeconds:detection/n,switches:switches/n,rejectedSwitches:rejects/n,channelSecondsScheduled:occupied/n,unoccludedDiscArea:Math.PI*radius*radius});
}
const economics=[];for(const startGold of [0,500])for(const incomePerSecond of [1,3,6])economics.push({startGold,incomePerSecond,affordableAt:Math.max(0,(cfg.parameters.switchPrice-startGold)/incomePerSecond),combatPurchaseDelay:cfg.parameters.switchPrice/incomePerSecond,status:'ISOLATED_BUDGET_FIXTURE_NO_FARM_OR_SHOP_TRAVEL'});
const hashes={};for(const f of ['config.json','model.mjs','test.mjs','simulate.mjs'])hashes[f]=crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,f))).digest('hex');
fs.writeFileSync(path.join(out,'beacon-sweep.json'),JSON.stringify({scope:'OFFLINE_STATE_AND_SYNTHETIC_SCHEDULE_NOT_MATCH_BALANCE',seed,n,remotePin:cfg.remotePin,hashes,assumptions:['180 seconds, opponent channels every 40 seconds, no combat or interruption.', 'Switch opportunity at +5 seconds; fixed 70% reachability Bernoulli per seed, identical paired seeds.', 'Defensive territory west only, all actors co-located. Squad size tests spam pressure, not coordinated real players.', 'Disc area ignores walls and overlaps and must not be reported as map coverage.', 'Economics income 1/3/6 is an experimental sensitivity; 3/s matches reported passive baseline but no last-hit/death/shop simulation.'],rows,economics},null,2));
const csvKeys=Object.keys(rows[0]);fs.writeFileSync(path.join(out,'beacon-sweep.csv'),csvKeys.join(',')+'\n'+rows.map(r=>csvKeys.map(k=>r[k]).join(',')).join('\n')+'\n');
const bar=(x,w,label,color,y)=>`<rect x="${x}" y="${y}" width="${w}" height="32" fill="${color}"/><text x="${x+5}" y="${y+21}" fill="white">${label}</text>`;
const sx=t=>80+t*28;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="980" height="270" viewBox="0 0 980 270"><rect width="980" height="270" fill="#152830"/><g font-family="sans-serif" font-size="14" fill="#e4edef"><text x="25" y="28" font-size="20">Mạch Đăng — offline timing fixture, not engine proof</text><text x="25" y="55">Capture I 1.2 s → II 4 s → defensive switch 5 s → recovery 9 s</text>${bar(sx(1.2),28*2.8,'I','#557b53',80)}${bar(sx(4),28,'II','#236f93',80)}${bar(sx(5),28*4,'I downgraded','#b36b37',80)}${bar(sx(9),28*10,'II restored','#236f93',80)}${bar(sx(19),28*10,'I tail','#557b53',80)}<text x="25" y="150">No new lifetime: II deadline stays 19 s; expiry stays 29 s.</text><text x="25" y="178">Teammate switch at 5 s rejected; shared lock lasts to 40 s.</text><text x="25" y="206">Visibility radius 8 / 12 / 16 m and fixture placements are EXPERIMENTAL.</text>${[0,4,5,9,19,29].map(t=>`<text x="${sx(t)}" y="244">${t}s</text>`).join('')}</g></svg>`;fs.writeFileSync(path.join(out,'beacon-timeline.svg'),svg);
console.log(`Saved ${rows.length} configurations × ${n} paired seeded fixture runs, timeline SVG/CSV/JSON and budget sensitivity.`);
