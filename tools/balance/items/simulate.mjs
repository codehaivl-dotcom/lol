import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {readPinned} from '../../audit/source-snapshot.mjs';
export const PIN='ad7948ab9710ac1adb2b561049821da8e0cb1da8';
const here=path.dirname(fileURLToPath(import.meta.url));
const repo=path.resolve(here,'../../..');
const hash=s=>createHash('sha256').update(s).digest('hex');
export function snapshot(commit=PIN){
  if(!globalThis.Bun?.YAML) throw Error('Run with Bun (YAML parser required).');
  if(!/^[0-9a-f]{40}$/.test(commit)) throw Error('Pinned commit must be a full 40-character Git hash.');
  const files=['scripts/lib/data/heroes.yml','scripts/lib/data/economy.yml','scripts/lib/combat.js','scripts/hero/match/combat.js'];
  const raw=Object.fromEntries(files.map(f=>[f,readPinned(commit,f)]));
  return {commit,hashes:Object.fromEntries(files.map(f=>[f,hash(raw[f])])),heroes:Bun.YAML.parse(raw[files[0]]).heroes,economy:Bun.YAML.parse(raw[files[1]])};
}
export function validate(c){
  const errors=[],map=new Map();
  if(!Array.isArray(c.items)||!c.items.length)return ['items must be a non-empty array'];
  const keys=['hp','armor','mr','ad','ap','attackSpeed','hpRegen','moveSpeed','resource','resourceRegen'];
  for(const i of c.items??[]){if(map.has(i.id))errors.push(`duplicate id ${i.id}`);map.set(i.id,i);if(!Number.isFinite(i.cost)||i.cost<0)errors.push(`invalid cost ${i.id}`);if(!['basic','intermediate','completed','relic'].includes(i.tier))errors.push(`invalid tier ${i.id}`);if(!Number.isFinite(i.combineCost)||i.combineCost<0)errors.push(`invalid combineCost ${i.id}`);if(i.sellValue!=null&&(!Number.isFinite(i.sellValue)||i.sellValue<0||i.sellValue>i.cost))errors.push(`invalid sellValue ${i.id}`);if(i.sellRatio!=null&&(!Number.isFinite(i.sellRatio)||i.sellRatio<0||i.sellRatio>1))errors.push(`invalid sellRatio ${i.id}`);if(!Number.isInteger(i.maxCopies)||i.maxCopies<1||i.maxCopies>6)errors.push(`invalid maxCopies ${i.id}`);for(const [k,v]of Object.entries(i.stats??{}))if(!keys.includes(k)||!Number.isFinite(v)||v<0)errors.push(`invalid stat ${i.id}.${k}`);}
  const events=['hero_shield_expired_or_broken','every_nth_basic_hit','nth_basic_hit_same_hero','out_of_hero_combat','ability_damage_to_hero','ability_heal_or_shield','basic_hit_after_ability_cast'];
  const effects=['shield','bonus_damage','slow','hp_regen_bonus','move_speed_bonus_flat','outgoing_heal_shield_multiplier'];
  for(const i of c.items){
    if(typeof i.id!=='string'||!i.id.length)errors.push('invalid item id');
    if(!Array.isArray(i.components))errors.push(`components must be array ${i.id}`);
    if(i.passive){const p=i.passive;
      if(!p.id||!p.group||!events.includes(p.trigger?.event)||!effects.includes(p.effect?.kind))errors.push(`invalid passive contract ${i.id}`);
      for(const k of ['durationSeconds','cooldownSeconds'])if(!Number.isFinite(p[k])||p[k]<0)errors.push(`invalid passive ${i.id}.${k}`);
      if(p.trigger?.n!=null&&(!Number.isInteger(p.trigger.n)||p.trigger.n<1))errors.push(`invalid passive counter ${i.id}`);
      for(const [k,v]of Object.entries(p.effect??{}))if(typeof v==='number'&&(!Number.isFinite(v)||v<0))errors.push(`invalid passive effect ${i.id}.${k}`);
    }
    if(i.active&&(!Number.isFinite(i.active.cooldownSeconds)||i.active.cooldownSeconds<0))errors.push(`invalid active cooldown ${i.id}`);
  }
  const visiting=new Set(),done=new Set();
  function visit(id){if(visiting.has(id)){errors.push(`recipe cycle ${id}`);return;}if(done.has(id))return;const i=map.get(id);if(!i){errors.push(`missing component ${id}`);return;}visiting.add(id);let sum=0;for(const p of (Array.isArray(i.components)?i.components:[])){if(!Number.isInteger(p.qty)||p.qty<1)errors.push(`invalid qty ${id}`);visit(p.id);sum+=(map.get(p.id)?.cost??0)*p.qty;}if((i.components??[]).length&&Math.abs(sum+(i.combineCost??0)-i.cost)>1e-6)errors.push(`recipe accounting ${id}: ${sum}+${i.combineCost??0} != ${i.cost}`);visiting.delete(id);done.add(id);}
  for(const id of map.keys())visit(id);
  for(const [hero,b]of Object.entries(c.builds??{}))for(const id of [...(b.core??[]),...(b.alternatives??[])])if(!map.has(id))errors.push(`unknown build item ${hero}:${id}`);
  return errors;
}
const group=i=>i.passive?.group??i.uniqueGroup??null;
const validState=(s,c)=>s && Number.isFinite(s.gold) && s.gold>=0 && Array.isArray(s.items) && s.items.length<=6 && s.items.every(id=>c.items.some(i=>i.id===id)) && Object.values(s.cooldowns??{}).every(x=>Number.isFinite(x)&&x>=0);
export function purchase(state,id,c){
  if(!validState(state,c)) return {ok:false,reason:'invalid-state',state};
  const map=new Map(c.items.map(i=>[i.id,i])),item=map.get(id);if(!item)return {ok:false,reason:'unknown',state};
  const next=structuredClone(state),used=new Set();let credit=0;
  // Prefer direct components, otherwise recurse. An owned node and its children are never both credited.
  function consume(node,qty){for(let n=0;n<qty;n++){const at=next.items.findIndex((x,k)=>x===node&&!used.has(k));if(at>=0){used.add(at);credit+=map.get(node).cost;}else for(const child of map.get(node)?.components??[])consume(child.id,child.qty);}}
  for(const p of item.components??[])consume(p.id,p.qty);
  const remaining=next.items.filter((_,k)=>!used.has(k));
  if(remaining.filter(x=>x===id).length>=item.maxCopies)return {ok:false,reason:'copies',state};
  if(item.tier==='relic'&&remaining.some(x=>map.get(x)?.tier==='relic'))return {ok:false,reason:'relic',state};
  if(remaining.length>=6)return {ok:false,reason:'slots',state};
  const price=item.cost-credit;if(next.gold<price)return {ok:false,reason:'gold',state};
  next.gold-=price;next.items=[...remaining,id];next.cooldowns??={};
  return {ok:true,price,credit,state:next};
}
export function sell(state,index,c){if(!validState(state,c)||!Number.isInteger(index)||index<0)return {ok:false,reason:'invalid-state',state};const i=c.items.find(x=>x.id===state.items[index]);if(!i)return {ok:false,state};const next=structuredClone(state);next.items.splice(index,1);const refund=i.sellValue??Math.round(i.cost*(i.sellRatio??c.rules?.sellRatio??.6));next.gold+=refund;return {ok:true,refund,state:next};}
export function activate(state,index,now,c){if(!validState(state,c)||!Number.isInteger(index)||index<0||!Number.isFinite(now)||now<0)return {ok:false,reason:'invalid-state',state};const i=c.items.find(x=>x.id===state.items[index]);if(!i?.active)return {ok:false,reason:'no-active',state};if(state.dead&&i.active.usableWhileDead===false)return {ok:false,reason:'dead',state};const key=i.active.group??i.active.cooldownGroup??c.rules?.relicCooldownGroup??'relic';if((state.cooldowns?.[key]??0)>now)return {ok:false,reason:'cooldown',state};const next=structuredClone(state);next.cooldowns??={};next.cooldowns[key]=now+(i.active.cooldownSeconds??60);return {ok:true,effect:i.active,state:next};}
export function hpTransition(currentHp,newMaxHp){return Math.min(currentHp,newMaxHp);}
const supportedPassive=p=>p?.trigger?.event==='every_nth_basic_hit'&&p?.effect?.kind==='bonus_damage'&&Number.isInteger(p.trigger.n)&&p.trigger.n>0;
export function itemProcDamage(ids,hit,target,tuning,c){let amount=0;const seen=new Set();for(const id of ids){const i=c.items.find(x=>x.id===id),p=i?.passive;if(!supportedPassive(p))continue;const g=group(i)??id;if(seen.has(g))continue;seen.add(g);if(hit%p.trigger.n===0)amount+=mitigation((p.effect.base??0)*tuning,p.effect.damageType??'physical',target);}return amount;}
// Pure contract probe with caller-supplied counters/timestamps; not a runtime registry or full passive replay.
export function eventProbe(passive,event,context={}){
  const t=passive.trigger,e=passive.effect;
  if(!event||!['hero','item'].includes(event.source))return {triggered:false,reason:'missing-source'};
  const required=[];
  if(t.minimumLifetimeSeconds)required.push('lifetime');
  if(t.n)required.push('hits','gap');
  if(t.firstHitPerCastOnly)required.push('castHitIndex');
  if(t.afterSeconds)required.push('outOfCombatSeconds');
  if(t.windowSeconds)required.push('secondsSinceAbility');
  if(required.some(k=>!Number.isFinite(event[k])||event[k]<0))return {triggered:false,reason:'missing-history'};
  if(event.source==='item'||event.dead||event.cooldownReady===false||event.kind!==t.event)return {triggered:false};
  if(t.allowedTargets&&!t.allowedTargets.includes(event.target))return {triggered:false};
  if(t.excludeDamageOverTime&&event.dot)return {triggered:false};
  if(t.firstHitPerCastOnly&&event.castHitIndex!==1)return {triggered:false};
  if(t.minimumLifetimeSeconds&&event.lifetime<t.minimumLifetimeSeconds)return {triggered:false};
  if(t.n&&(event.hits%t.n!==0||event.gap>t.counterResetAfterSeconds||(t.counterResetOnTargetSwitch&&event.switchedTarget)))return {triggered:false};
  if(t.afterSeconds&&event.outOfCombatSeconds<t.afterSeconds)return {triggered:false};
  if(t.windowSeconds&&(event.secondsSinceAbility>t.windowSeconds||event.consumed))return {triggered:false};
  const antiHeal=Math.max(0,Math.min(1,context.antiHeal??0));
  let value=null,valueStage='raw_effect_scalar';const excludedRules=['caller-supplied history/counters; no engine event registry'];
  if(e.kind==='bonus_damage'){value=(e.base??0)+(e.apRatio??0)*(context.ap??0);valueStage='raw_damage_before_hero_tuning_and_resistance';}
  else if(e.kind==='shield'){value=(e.base??0)+(e.maxHpRatio??0)*(context.maxHp??0);valueStage='raw_shield_capacity';}
  else if(e.kind==='outgoing_heal_shield_multiplier'){
    if(!['heal','shield'].includes(event.effectType)){excludedRules.push('numeric value requires event.effectType heal or shield');}
    else {value=(context.amount??0)*e.multiplier*(event.effectType==='heal'?1-antiHeal:1);valueStage=event.effectType==='heal'?'heal_after_multiplier_and_antiheal_before_maxhp_clamp':'shield_after_multiplier_no_antiheal';}
  }else if(e.kind==='hp_regen_bonus'){value=(e.amountPerSecond??0)*(e.affectedByAntiHeal?1-antiHeal:1);valueStage='regen_per_second_after_antiheal_before_maxhp_clamp';}
  else value=e.amount??e.ratio??null;
  return {triggered:true,value,valueStage,excludedRules,kind:e.kind,durationSeconds:passive.durationSeconds,cooldownSeconds:passive.cooldownSeconds};
}
export function stats(hero,level,ids,c,profile='proposal'){
  const h=hero,out={};for(const [k,v]of Object.entries(h.stats))out[k]=v+(level-1)*(h.growth[k]??0);out.hp*=h.tuning?.hp??1;out.baseAd=out.ad;
  const flags=[];for(const id of ids){const i=c.items.find(x=>x.id===id);if(!i)throw Error(`unknown item ${id}`);for(const[k,v]of Object.entries(i.stats??{})){if(k==='attackSpeed')out[k]*=1+v;else if(profile==='ship'&&!['ad','hp','armor','hpRegen'].includes(k))flags.push(`ship-unsupported-stat:${id}.${k}`);else out[k]=(out[k]??0)+v;}if(i.passive&&!supportedPassive(i.passive))flags.push(`unmodelled-passive:${id}:${i.passive.id}`);if(i.active)flags.push(`unmodelled-active:${id}`);}
  out.hp=Math.round(out.hp);return {...out,flags,physicalEhp:out.hp*(1+Math.max(0,out.armor)/100),magicEhp:out.hp*(1+Math.max(0,out.mr)/100)};
}
export function mitigation(raw,type,target,pen=0){return type==='true'?raw:raw*100/(100+Math.max(0,(type==='magic'?target.mr:target.armor)-pen));}
function nthDamage(h,s,hit){const p=h.passive;if(p?.type!=='every_nth_hit'||hit%p.n)return 0;return (p.bonusDamage.base??0)+(p.bonusDamage.ad??0)*s.ad;}
export function duel(a,b,ha,hb,ia,ib,c,seed=1000){
  // Controlled autoattacks in range, no movement/skills/CC/projectile travel. Seed chooses first attacker at equal time only.
  let rng=seed>>>0;const rand=()=>{rng=(1664525*rng+1013904223)>>>0;return rng/4294967296;};
  const hp=[a.hp,b.hp],ss=[a,b],hh=[ha,hb],ids=[ia,ib],next=[0,0],hits=[0,0],damage=[0,0];let t=0,last=0;
  for(let events=0;events<10000;events++){
    const who=next[0]===next[1]?(rand()<.5?0:1):(next[0]<next[1]?0:1),other=1-who;t=next[who];if(t>120)return {censored:true,seconds:120,remainingHp:hp};
    for(let k=0;k<2;k++)hp[k]=Math.min(ss[k].hp,hp[k]+ss[k].hpRegen*(t-last));last=t;hits[who]++;
    const type=hh[who].lmb.damageType??'physical';let raw=ss[who].ad+(hh[who].lmb.ap??0)*ss[who].ap+nthDamage(hh[who],ss[who],hits[who]);
    const extra=itemProcDamage(ids[who],hits[who],ss[other],hh[who].tuning?.dmg??1,c);
    const dealt=mitigation(raw*(hh[who].tuning?.dmg??1),type,ss[other])+extra;hp[other]-=dealt;damage[who]+=dealt;if(hp[other]<=0)return {censored:false,seconds:t,winnerIndex:who,remainingHp:hp,hits,damage};next[who]+=1/Math.max(.2,ss[who].attackSpeed);
  }throw Error('event cap');
}
export function loadout(heroId,budget,c,buildProfile='core-only'){let s={gold:budget,items:[],cooldowns:{}};const b=c.builds?.[heroId],choices=[...(b?.core??[]),...(buildProfile==='core-plus-alternatives'?b?.alternatives??[]:[])];
  function acquire(id){const direct=purchase(s,id,c);if(direct.ok){s=direct.state;return;}const i=c.items.find(x=>x.id===id);for(const p of i?.components??[]){const owned=s.items.filter(x=>x===p.id).length;for(let n=owned;n<p.qty;n++)acquire(p.id);}const retry=purchase(s,id,c);if(retry.ok)s=retry.state;}
  for(const id of choices)acquire(id);return s;
}
export function validateScenario({seed=1000,n=30,budgets=[500,1500,3000,6000],buildProfile='core-only'}={}){
  if(!Number.isFinite(seed)||!Number.isInteger(seed)||seed<1||seed>0xffffffff)throw Error('invalid seed: require positive finite uint32 integer');
  if(!Number.isFinite(n)||!Number.isInteger(n)||n<1||n>1000)throw Error('invalid n: require positive finite integer 1..1000');
  if(seed+n-1>0xffffffff)throw Error('invalid seed range: uint32 overflow');
  if(!Array.isArray(budgets)||budgets.length!==4||budgets.some(v=>!Number.isFinite(v)||v<0))throw Error('invalid scenario budgets');
  if(!['core-only','core-plus-alternatives'].includes(buildProfile))throw Error('invalid build profile');
}
export function run(c,snap,{seed=1000,n=30,budgets=[500,1500,3000,6000],buildProfile='core-only'}={}){
  validateScenario({seed,n,budgets,buildProfile});
  const errors=validate(c);if(errors.length)throw Error(errors.join('\n'));const levels=[1,6,11,15],rows=[],trials=[];
  for(let k=0;k<levels.length;k++)for(const [id,h]of Object.entries(snap.heroes)){const bag=loadout(id,budgets[k],c,buildProfile),s=stats(h,levels[k],bag.items,c),base=stats(h,levels[k],[],c);rows.push({hero:id,level:levels[k],budget:budgets[k],spent:budgets[k]-bag.gold,unusedGold:bag.gold,slots:bag.items.length,items:bag.items,stats:s,base,ehpGain:s.physicalEhp/base.physicalEhp-1,basicRawDps:(s.ad+(h.lmb.ap??0)*s.ap)*s.attackSpeed*(h.tuning?.dmg??1)});}
  for(let k=0;k<levels.length;k++){const rs=rows.filter(r=>r.level===levels[k]);for(let a=0;a<rs.length;a++)for(let b=a+1;b<rs.length;b++){const x=rs[a],y=rs[b];const results=Array.from({length:n},(_,i)=>duel(x.stats,y.stats,snap.heroes[x.hero],snap.heroes[y.hero],x.items,y.items,c,seed+i));trials.push({a:x.hero,b:y.hero,level:levels[k],budget:budgets[k],n,seedRange:[seed,seed+n-1],ended:results.filter(r=>!r.censored).length,censored:results.filter(r=>r.censored).length,medianTtk:median(results.filter(r=>!r.censored).map(r=>r.seconds)),flags:[...new Set([...x.stats.flags,...y.stats.flags,'hero-bleed/after-ability/burn/skills/CC omitted'])]});}}
  const saturation=c.items.map(i=>({id:i.id,copies:i.maxCopies,cost:i.cost*i.maxCopies,stats:stats(snap.heroes.nham_vu,15,Array(i.maxCopies).fill(i.id),c)}));
  const shipCatalog={items:Object.entries(snap.economy.items).map(([id,i])=>({id,cost:i.cost,maxCopies:6,components:[],stats:Object.fromEntries(['hp','armor','ad','attackSpeed','hpRegen'].filter(k=>i[k]!=null).map(k=>[k,i[k]]))}))};
  const migrationComparisons=c.items.filter(i=>snap.economy.items[i.id]).map(i=>({id:i.id,shipCost:snap.economy.items[i.id].cost,candidateCost:i.cost,atLevels:levels.map(level=>({level,ship:stats(snap.heroes.nham_vu,level,[i.id],shipCatalog,'ship'),candidate:stats(snap.heroes.nham_vu,level,[i.id],c)}))}));
  const itemScreens=c.items.map(i=>({id:i.id,cost:i.cost,stats:i.stats,physicalEhpPerGold:(stats(snap.heroes.nham_vu,1,[i.id],c).physicalEhp-stats(snap.heroes.nham_vu,1,[],c).physicalEhp)/Math.max(1,i.cost),magicEhpPerGold:(stats(snap.heroes.nham_vu,1,[i.id],c).magicEhp-stats(snap.heroes.nham_vu,1,[],c).magicEhp)/Math.max(1,i.cost),excludedEffects:[...(i.passive&&!supportedPassive(i.passive)?[i.passive.id]:[]),...(i.active?['active']:[])]}));
  const passiveContractProbes=c.items.filter(i=>i.passive).map(i=>{const p=i.passive,event={kind:p.trigger.event,source:'hero',effectType:'heal',target:p.trigger.allowedTargets?.[0]??'hero',hits:p.trigger.n??1,gap:0,castHitIndex:1,lifetime:1,outOfCombatSeconds:8,secondsSinceAbility:1,cooldownReady:true};return {id:i.id,status:'PURE CONTRACT PROBE, NOT ENGINE EFFECT',positive:eventProbe(p,event,{ap:100,maxHp:2000,amount:100,antiHeal:.4}),itemDamageRejected:!eventProbe(p,{...event,source:'item'}).triggered,cooldownRejected:!eventProbe(p,{...event,cooldownReady:false}).triggered,continuousCombatSupported:supportedPassive(p)};});
  return {status:'PROPOSAL SCREEN — NOT ENGINE MATCH BALANCE',source:{commit:snap.commit,hashes:snap.hashes,candidateHash:hash(JSON.stringify(c))},seed,n,budgets,buildProfile,assumptions:['Equal allotted gold, actual spent shown; fixed level independent of game time. Budgets beyond 500 are scenario proposals, not game economic targets.','Proposal extends item AP/MR/etc; ship profile skips unsupported stats.','No skills, CC, kiting, range, towers, waves, map, economy income, projectile delays or active use in autoattack trial.','No winrate or match duration conclusion. Flagged effects excluded, never treated as zero-value balance proof.','Candidate full stat bundles assumed, not sum of consumed components. Attack speed multiplicative matches ship.','HP purchase policy keep_current_hp and sale clamp are proposal rules; runtime currently grants itemHP delta.'],rows,trials,saturation,migrationComparisons,itemScreens,passiveContractProbes};
}
function median(xs){if(!xs.length)return null;const a=xs.sort((x,y)=>x-y);return a[Math.floor(a.length/2)];}
function markdown(r){return `# Item candidate screening\n\n${r.status}\n\nSource: ${r.source.commit}. Seed ${r.seed}, repetitions ${r.n}.\n\n${r.assumptions.map(x=>'- '+x).join('\n')}\n\n|Hero|L|Budget|Spent|Items|HP|Armor|MR|Physical EHP|Basic raw DPS|Flags|\n|---|---:|---:|---:|---|---:|---:|---:|---:|---:|---|\n${r.rows.map(x=>`|${x.hero}|${x.level}|${x.budget}|${x.spent}|${x.items.join(',')}|${x.stats.hp}|${x.stats.armor.toFixed(1)}|${x.stats.mr.toFixed(1)}|${x.stats.physicalEhp.toFixed(1)}|${x.basicRawDps.toFixed(1)}|${x.stats.flags.join(';')}|`).join('\n')}\n\nPairwise controlled TTK, censoring and copy saturation are in JSON. This report does not certify item balance.\n`;}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2),arg=(k,d)=>{const at=args.indexOf(k);return at<0?d:args[at+1];};const file=path.resolve(arg('--catalog',path.join(here,'candidate-v01.json'))),out=path.resolve(arg('--out',path.join(repo,'reports/items-v01')));const c=JSON.parse(readFileSync(file,'utf8'));const opts={seed:Number(arg('--seed',1000)),n:Number(arg('--n',30)),budgets:arg('--budgets','500,1500,3000,6000').split(',').map(Number),buildProfile:arg('--build-profile','core-only')};validateScenario(opts);const snap=snapshot(arg('--commit',PIN)),r=run(c,snap,opts);mkdirSync(out,{recursive:true});writeFileSync(path.join(out,'screen.json'),JSON.stringify(r,null,2));writeFileSync(path.join(out,'screen.md'),markdown(r));const other=run(c,snap,{...opts,buildProfile:opts.buildProfile==='core-only'?'core-plus-alternatives':'core-only'});writeFileSync(path.join(out,`screen-${other.buildProfile}.json`),JSON.stringify(other,null,2));const variantsFile=arg('--variants',null);if(variantsFile){const variants=JSON.parse(readFileSync(variantsFile,'utf8'));const sweeps=variants.map(v=>{const changed=structuredClone(c);for(const o of v.overrides){const it=changed.items.find(i=>i.id===o.id);if(!it)throw Error(`unknown override ${o.id}`);Object.assign(it,o);if(o.stats)it.stats={...c.items.find(i=>i.id===o.id).stats,...o.stats};}return {name:v.name,report:run(changed,snap,opts)};});writeFileSync(path.join(out,'sweeps.json'),JSON.stringify(sweeps,null,2));}console.log(JSON.stringify({status:r.status,out,rows:r.rows.length,pairs:r.trials.length,source:r.source}));
}
