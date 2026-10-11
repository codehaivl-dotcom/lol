import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {snapshot,run,stats,purchase,sell,validate,validateScenario,PIN} from './simulate.mjs';
import {replayPassives} from './replay.mjs';

const here=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(here,'../../..');
const args=process.argv.slice(2),arg=(k,d)=>{const i=args.indexOf(k);return i<0?d:args[i+1];};
const pin=arg('--commit','9351e23c6c6b4cc55a160dbf7aec268973b6394d');
const out=path.resolve(arg('--out',path.join(repo,'reports/production-2026-10-09/items-lab')));
const seed=Number(arg('--seed',1000)),n=Number(arg('--n',300));
validateScenario({seed,n});
const c=JSON.parse(readFileSync(path.join(here,'candidate-v01.json'),'utf8'));
if(validate(c).length)throw Error(validate(c).join('\n'));
mkdirSync(out,{recursive:true});
const snap=snapshot(pin),old=snapshot(PIN);
const tests=execFileSync(process.execPath,[path.join(here,'test.mjs'),'--commit',pin],{encoding:'utf8',cwd:repo});
writeFileSync(path.join(out,'tests.log'),tests);
const testSummary=JSON.parse(tests.trim().split('\n').at(-1));
const profiles=['core-only','core-plus-alternatives'].map(buildProfile=>run(c,snap,{seed,n,buildProfile}));
for(const r of profiles)writeFileSync(path.join(out,`${r.buildProfile}.json`),JSON.stringify(r,null,2));
const variants=JSON.parse(readFileSync(path.join(here,'sweep-example.json'),'utf8')).map(v=>{
 const changed=structuredClone(c);
 for(const o of v.overrides){const i=changed.items.find(i=>i.id===o.id);if(!i)throw Error('Unknown variant item');i.stats={...i.stats,...o.stats};}
 return {name:v.name,overrides:v.overrides,report:run(changed,snap,{seed,n,buildProfile:'core-only'})};
});
writeFileSync(path.join(out,'sensitivity.json'),JSON.stringify(variants,null,2));

const csv=(rows,keys)=>[keys.join(','),...rows.map(row=>keys.map(k=>JSON.stringify(String(row[k]??''))).join(','))].join('\n')+'\n';
const rows=profiles.flatMap(r=>r.rows.map(x=>({profile:r.buildProfile,hero:x.hero,level:x.level,budget:x.budget,spent:x.spent,unused:x.unusedGold,slots:x.slots,items:x.items.join(';'),hp:x.stats.hp,armor:x.stats.armor,mr:x.stats.mr,physicalEhp:x.stats.physicalEhp,magicEhp:x.stats.magicEhp,basicDps:x.basicRawDps,flags:x.stats.flags.join(';')})));
writeFileSync(path.join(out,'inventory-stats.csv'),csv(rows,Object.keys(rows[0])));
const pairs=profiles.flatMap(r=>r.trials.map(x=>({profile:r.buildProfile,a:x.a,b:x.b,level:x.level,n:x.n,ended:x.ended,censored:x.censored,medianTtk:x.medianTtk,flags:x.flags.join(';')})));
writeFileSync(path.join(out,'controlled-ttk.csv'),csv(pairs,Object.keys(pairs[0])));

// Enumerate affordable starting inventories. Maximizing physical EHP alone is NOT a recommended build.
const starters=[];
function enumerate(start,ids,cost){starters.push({ids,cost});if(ids.length===6)return;for(let k=start;k<c.items.length;k++){const i=c.items[k];if(cost+i.cost>500||i.tier==='relic')continue;if(ids.filter(id=>id===i.id).length>=i.maxCopies)continue;enumerate(k,[...ids,i.id],cost+i.cost);}}
enumerate(0,[],0);
const shipped={items:Object.entries(snap.economy.items).map(([id,i])=>({id,stats:Object.fromEntries(['hp','armor','ad','attackSpeed','hpRegen'].map(k=>[k,i[k]??0]))}))};
const startComparison=Object.entries(snap.heroes).map(([hero,h])=>{
 const base=stats(h,1,[],c),iron=stats(h,1,['iron_plate'],shipped,'ship');
 const best=starters.map(b=>({...b,s:stats(h,1,b.ids,c)})).sort((a,b)=>b.s.physicalEhp-a.s.physicalEhp||a.cost-b.cost)[0];
 return {hero,baseEhp:base.physicalEhp,shipIronCost:snap.economy.items.iron_plate.cost,shipIronEhp:iron.physicalEhp,shipGainPercent:100*(iron.physicalEhp/base.physicalEhp-1),candidateItems:best.ids.join(';'),candidateCost:best.cost,candidateEhp:best.s.physicalEhp,candidateGainPercent:100*(best.s.physicalEhp/base.physicalEhp-1),candidateMagicEhp:best.s.magicEhp};
});
writeFileSync(path.join(out,'starting-defense.csv'),csv(startComparison,Object.keys(startComparison[0])));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const W=1040,H=590,scale=5;
const chart=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Starting physical EHP gain: shipped Iron Plate vs candidate inventories"><rect width="100%" height="100%" fill="#13282e"/><g fill="#ecf3ea" font-family="Arial" font-size="16"><text x="30" y="35" font-size="24">Starting physical durability — 500 gold budget</text><text x="30" y="63">Static EHP gain vs naked L1 (%), not win rate or whole-kit balance</text><rect x="32" y="85" width="16" height="16" fill="#ef9265"/><text x="57" y="99">Shipped Iron Plate (450 gold)</text><rect x="385" y="85" width="16" height="16" fill="#68c7ba"/><text x="410" y="99">Candidate: highest physical EHP affordable bag</text>${startComparison.map((r,k)=>{const y=136+k*57;return `<text x="30" y="${y+20}">${esc(r.hero)}</text><rect x="165" y="${y}" width="${r.shipGainPercent*scale}" height="20" fill="#ef9265"/><text x="${174+r.shipGainPercent*scale}" y="${y+16}">${r.shipGainPercent.toFixed(1)}%</text><rect x="165" y="${y+24}" width="${r.candidateGainPercent*scale}" height="20" fill="#68c7ba"/><text x="${174+r.candidateGainPercent*scale}" y="${y+40}">${r.candidateGainPercent.toFixed(1)}% — ${esc(r.candidateItems)}</text>`;}).join('')}<text x="30" y="515">EHP = HP × (1 + armor / 100). No penetration, shields, regen, movement or skills.</text><text x="30" y="540">Candidate numbers are proposals. Max-EHP bag ignores damage, magic defense and utility trade-offs.</text><text x="30" y="566" font-size="13">Runtime ${pin.slice(0,12)} · item stats unchanged vs old pin; Mi Dang basic range changed to 1.6 m.</text></g></svg>`;
writeFileSync(path.join(out,'starting-defense.svg'),chart);

// Reproducible shop adversarial sequences: ledger equality + atomic failure at every step.
let rng=seed>>>0;const rand=()=>{rng=(Math.imul(1664525,rng)+1013904223)>>>0;return rng/4294967296;};
let st={gold:100000,items:[],cooldowns:{}},ledger=st.gold,accepted=0,rejected=0;
for(let step=0;step<5000;step++){
 const before=JSON.stringify(st),isSale=rand()<.35;
 const r=isSale?sell(st,Math.floor(rand()*7),c):purchase(st,c.items[Math.floor(rand()*c.items.length)].id,c);
 if(r.ok){ledger+=isSale?r.refund:-r.price;st=r.state;accepted++;if(st.gold!==ledger||st.gold<0||st.items.length>6)throw Error('Transaction ledger invariant failed');}
 else {rejected++;if(JSON.stringify(st)!==before)throw Error('Atomic reject failed');}
}
const transaction={seed,operations:5000,accepted,rejected,finalGold:st.gold,finalItems:st.items,status:'PURE LEDGER/ATOMIC INVARIANTS PASS; NOT SERVER ACK/SHOP POSITION'};
writeFileSync(path.join(out,'transactions.json'),JSON.stringify(transaction,null,2));
const e=(at,kind,extra={})=>({at,kind,source:'hero',...extra});
const basic=at=>e(at,'basic_hit',{target:'hero',targetId:'enemy'});
const replayScenarios=[
 ['oathguard_plate',[e(0,'shield_end',{lifetime:.5}),e(1,'shield_end',{lifetime:1}),e(12,'shield_end',{lifetime:1})]],
 ['keeneye',[0,1,2,3,8,9,10,11].map(basic)],
 ['thornseed_quiver',[0,1,2,3,4,5,10,11,12].map(basic)],
 ['heartforge',[e(10,'tick'),e(11,'hero_damage',{shieldDamage:30}),e(18,'tick'),e(20,'tick')]],
 ['lo_than_ky',[e(0,'ability_hit',{target:'hero',castId:'q1'}),e(1,'ability_hit',{target:'hero',castId:'q1'}),e(8,'ability_hit',{target:'hero',castId:'q2'})]],
 ['dang_hoi_am',[e(0,'ability_hit',{target:'hero',castId:'q1'}),e(1,'ability_hit',{target:'hero',castId:'q2'}),e(8,'ability_hit',{target:'hero',castId:'q3'})]],
 ['chuong_may',[e(0,'heal_or_shield',{target:'ally_hero',effectType:'heal',amount:100}),e(1,'heal_or_shield',{target:'ally_hero',effectType:'shield',amount:100})]],
 ['qua_mach',[e(0,'ability_cast'),basic(1),basic(2),e(8,'ability_cast'),basic(9)]]
].map(([item,events])=>({item,events,...replayPassives(c,[item],events,{ap:100,maxHp:2000,tuning:1,targetResistance:{armor:100,mr:100},antiHeal:.4})}));
writeFileSync(path.join(out,'passive-replays.json'),JSON.stringify(replayScenarios,null,2));
const effectRows=replayScenarios.flatMap(r=>r.effects.map(x=>({...x,status:r.status})));
writeFileSync(path.join(out,'passive-effects.csv'),csv(effectRows,Object.keys(effectRows[0])));
const h=file=>createHash('sha256').update(readFileSync(path.join(here,file))).digest('hex');
const summary={status:'IMPLEMENTATION SPEC + PURE TOOL VALIDATED; ENGINE INTEGRATION AND WHOLE-MOBA BALANCE NOT READY',pin,previousPin:PIN,seed,n,catalogItems:c.items.length,tiers:Object.fromEntries(['basic','intermediate','completed','relic'].map(t=>[t,c.items.filter(i=>i.tier===t).length])),unitTests:testSummary.passed,transaction,passiveReplayScenarios:replayScenarios.length,baseTrials:profiles.reduce((s,r)=>s+r.trials.reduce((a,t)=>a+t.n,0),0),sensitivityTrials:variants.reduce((s,v)=>s+v.report.trials.reduce((a,t)=>a+t.n,0),0),trials:[...profiles,...variants.map(v=>v.report)].reduce((s,r)=>s+r.trials.reduce((a,t)=>a+t.n,0),0),ended:[...profiles,...variants.map(v=>v.report)].reduce((s,r)=>s+r.trials.reduce((a,t)=>a+t.ended,0),0),censored:[...profiles,...variants.map(v=>v.report)].reduce((s,r)=>s+r.trials.reduce((a,t)=>a+t.censored,0),0),sourceHashes:snap.hashes,oldSourceHashes:old.hashes,toolHashes:Object.fromEntries(['candidate-v01.json','simulate.mjs','replay.mjs','test.mjs','production.mjs','sweep-example.json'].map(f=>[f,h(f)])),candidateSourcePin:c.sourceCommit,startComparison};
writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2));
console.log(JSON.stringify({out,unitTests:summary.unitTests,trials:summary.trials,censored:summary.censored,transactions:transaction,passiveReplayScenarios:summary.passiveReplayScenarios}));
