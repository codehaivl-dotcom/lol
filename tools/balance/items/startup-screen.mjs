import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {snapshot,stats,purchase,validate} from './simulate.mjs';

export const SOURCE_PIN='9351e23c6c6b4cc55a160dbf7aec268973b6394d';
const here=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(here,'../../..');
const sha=b=>createHash('sha256').update(b).digest('hex');
const key=ids=>[...ids].sort().join(';');
const csv=(rows,keys)=>[keys.join(','),...rows.map(r=>keys.map(k=>JSON.stringify(Array.isArray(r[k])?r[k].join(';'):String(r[k]??''))).join(','))].join('\n')+'\n';

// Canonical multisets; empty bag is a deliberate reference choice. No order duplicates.
export function enumerate(c,budget=500,onlyBasic=false){
  const available=c.items.filter(i=>!onlyBasic||i.tier==='basic'),bags=[];
  function walk(at,ids,spent,relics){
    bags.push({ids,spent,unusedGold:budget-spent,slots:ids.length});
    if(ids.length===c.rules.maxItems)return;
    for(let k=at;k<available.length;k++){
      const i=available[k],nr=relics+(i.tier==='relic'?1:0);
      if(spent+i.cost>budget||nr>c.rules.maxRelics||ids.filter(x=>x===i.id).length>=i.maxCopies)continue;
      walk(k,[...ids,i.id],spent+i.cost,nr);
    }
  }
  walk(0,[],0,0);return bags;
}

// Independent count-vector enumeration catches missing/repeated inventories.
function countVectors(c,budget,onlyBasic){
  const available=c.items.filter(i=>(!onlyBasic||i.tier==='basic')&&i.cost<=budget),keys=[];
  function walk(at,ids,cost,relics){
    if(at===available.length){keys.push(key(ids));return;}
    const i=available[at];
    for(let n=0;n<=Math.min(i.maxCopies,Math.floor((budget-cost)/i.cost),c.rules.maxItems-ids.length);n++){
      const nr=relics+(i.tier==='relic'?n:0);if(nr>c.rules.maxRelics)continue;
      walk(at+1,[...ids,...Array(n).fill(i.id)],cost+n*i.cost,nr);
    }
  }
  walk(0,[],0,0);return keys.sort();
}

function contract(c,snap,catalogHash){
  return {
    schemaVersion:1,status:'PROPOSAL_SPEC_CLOSED_RUNTIME_NOT_IMPLEMENTED',owner:'Codex council / item integration',
    catalog:{source:'scripts/lib/data/economy.yml',candidateSource:'tools/balance/items/candidate-v01.json',candidateVersion:c.version,candidateDesignSourceCommit:c.sourceCommit,candidateSha256:catalogHash,sourceCommit:snap.commit,legacyVersion:`legacy@${snap.commit}`,candidateRuntimeVersion:`candidate-${c.version}@sha256:${catalogHash}`,activation:'disabled_pending_catalog_decision_and_runtime_acceptance',versionMustChangeWhen:'catalog numbers/recipes/triggers/rules or serialized semantics change',runtimeShapeProposal:'economy.yml itemCatalogs[version]={rules,items}; match-selected version resolves every item/stat/recipe. Candidate JSON is design input, not a second runtime catalog. Import preserving candidate values/hash; keep immutable legacy records until its final match ends.'},
    migration:{policy:'new_match_boundary_only',owner:'Codex council / runtime integration',action:'Store itemCatalogVersion on match and every inventory/cache/stand-in/saved row; resolve all consumers by that version. Preserve immutable legacy catalog while legacy match exists.',existingMatch:'Treat absent version in an already running match as pinned legacy; stamp it once without reinterpreting inventory. Never restat/refund/recipe-convert mid-match.',newMatch:'Only after activation, reset match inventory/gold/cooldowns/counters with normal match initialization and stamp candidate version; no automatic carry across matches.',reconnect:'Restore same version, inventory, gold, HP, item group readyAt values, active expiries and passive state with original clock domain; reconnect/stand-in cannot reset cooldown.',missingCatalog:'Reject transaction and report version mismatch; never fall back to current catalog.',retainedIds:Object.keys(c.migration),crossMatchDurableInventory:'Not proven at pin; if found, require separate explicit migration before activation. No invented alias mapping.',rollback:'Disable candidate for new matches; running candidate matches retain their immutable catalog through completion.'},
    stats:{owner:'Codex council / combat and bot integration',action:'One version-aware heroStats implementation for player/bot/shop/tooltip/sim.',additive:['hp','armor','mr','ad','ap','hpRegen','moveSpeed'],attackSpeed:'base/growth multiplied by (1+item.attackSpeed) per inventory instance; consumed ingredients cease contributing',hp:'round tuned hero HP + item HP; buy/upgrade keeps currentHP, loss clamps to new maxHP; dead remains dead',damage:'Raw basic/ability uses total AD/AP; hero-on-hero damage tuning once, then typed resistance once; bonusAd excludes baseAd. No item-specific AP scaling multiplier.',speed:'Base/growth + flat item speed + active flat item speed, then existing kit percentage buffs and strongest slow; existing dash distance/speed rules remain separately defined',resistance:'Physical uses armor, magic uses MR, true ignores resistance; max(0,resistance-penetration). No negative-resistance amplification introduced.'},
    events:{owner:'Codex council / passive registry integration',action:'Adapt confirmed cast/hit/damage/heal/shield/death events into replay contract semantics. Pure fixture timestamps are not evidence of actual hits.',clock:'ctx.now milliseconds; convert catalog seconds ×1000 exactly once. Replays use seconds.',identity:['eventId','matchId','itemCatalogVersion','sourceId','sourceKind','targetId','targetKind','castId','damageOrigin','damageType','dot','shieldOrigin'],dedupe:'One accepted eventId; one first eligible damage hit per cast where requested; rejected/immune/missed hits do not count.',damageAccounting:'Emit combat damage including shield absorption once; isolate HP loss and shield absorption to avoid double combat updates.',recursion:'Item-generated damage/heal/shield never triggers item proc; hero kit origin required by trigger.',groups:'Deduplicate by passive.group, persist group cooldown across sale/upgrade/death/reconnect; catalog specifies which counters reset on death/target switch/gap.',removalPolicyProposal:'Removing item stops its future triggers/continuous regen/movement modifier and discards its armed counters. Keep group readyAt. Already applied target damage/shield/slow and committed relic ticks retain original expiry unless death cancels under catalog. Rebuy starts fresh counters, never a fresh cooldown.',effectOrder:'Base hero heal/shield -> Bell 1.08 -> antiheal only for heal -> clamp heal; damage -> hero tuning -> typed resistance -> existing shield/HP consumer.',passives:c.items.filter(i=>i.passive).map(i=>({itemId:i.id,group:i.passive.group,trigger:i.passive.trigger,effect:i.passive.effect,durationSeconds:i.passive.durationSeconds,cooldownSeconds:i.passive.cooldownSeconds,maxStacks:i.passive.maxStacks})),active:'Shared relic cooldown persists through sale/upgrade/reconnect; death cancels effects, use while dead rejected; healing ticks/antiheal/maxHP clamp and shield expiry need actual engine consumer.'},
    transactions:{owner:'Codex council / authoritative shop integration',action:'One atomic validated purchase/sale result; runtime position/ownership/version checks before mutation; idempotent transactionId prevents retry double spending.',rules:'Prefer owned direct component then recurse missing node; full catalog credit once per consumed slot; validate remaining copy/relic/slot limits after consumption; cost = target cost - credit; reject leaves gold/items/HP/cooldowns unchanged.',receipt:['transactionId','matchId','itemCatalogVersion','consumedSlotIds','grantedItemId','chargedGold','refundedGold','newInventory','newGold'],ui:'Generate recipe remainder, owned ingredients, stats/passive text, sell price, VI/EN and icons from same version; bot uses same purchase path.'},
    acceptance:[
      ['CAT-01','Existing legacy match and reconnect preserve 450g/40armor/220HP iron_plate while new activated match resolves candidate 550g/24armor; missing version cannot silently use candidate.'],
      ['SHOP-01','Full six-slot bag containing two dong_van upgrades iron_plate at 70g; consumes exactly two slots, preserves four others, leaves five slots. 69g rejects atomically.'],
      ['SHOP-02','Owned iron_plate + dong_van + mach_tinh + ngoc_am: oathguard_plate credits 550+250+240=1040, costs560; unrelated dong_van remains. 559g rejects.'],
      ['SHOP-03','Duplicate requestId charges once; wrong version/out-of-shop/unknown ID/copy/relic limit fail with equal before/after ledger. Sale equals catalog override or rounded60%.'],
      ['HP-01','Damaged living hero buys90HP: maxHP+90, currentHP equal; sell clamps currentHP only when above new max; buy/sell and upgrade do not heal or revive.'],
      ['STAT-01','18AP,12MR,+0.25m/s apply to player and bot; two10%AS become1.21×; quickstring upgrade stays1.21× and removes ingredients; typed magic damage falls by exact MR formula.'],
      ['PROC-01','All eight passive positive/negative/reset/CD boundary fixtures replay from actual accepted events; reject item recursion/DOT/structures where excluded; death and target-switch rules match catalog.'],
      ['RELIC-01','Use/sale/repurchase/stand-in/reconnect retains shared readyAt; heal150 in four1s ticks for Phial with antiheal/clamp, shield180/3s for Bastion; death cancels.'],
      ['VIEW-01','Player shop, bot choice, VI/EN tooltip, recipe remainder/sale price/icon resolver and simulator match exact catalog hash and version.'],
      ['TRACE-01','Six-hero skill/CC/heal/shield/item traces plus3v3 support income/timing evidence; compare actual trace to tool before numerical balance approval.']
    ].map(([id,action])=>({id,owner:id==='TRACE-01'?'Codex council / Jev QA':'Codex council / item integration and QA',action,status:'NOT_RUN_RUNTIME',closureEvidence:'Actual pinned runtime/client trace with before/after state, receipt/version and expected arithmetic; source/model fixture alone insufficient'}))
  };
}

export function runStartupScreen(c,snap){
  const errors=validate(c);if(errors.length)throw Error(errors.join('\n'));
  const legacy={rules:{maxItems:snap.economy.maxItems,maxRelics:1,sellRatio:snap.economy.sellRatio},items:Object.entries(snap.economy.items).map(([id,i])=>({id,cost:i.cost,maxCopies:6,tier:i.slot==='relic'?'relic':'basic',components:[],combineCost:i.cost,stats:Object.fromEntries(['hp','armor','ad','attackSpeed','hpRegen'].filter(k=>i[k]!=null).map(k=>[k,i[k]])),legacyThirdHit:i.thirdHit??0,legacyActive:i.active}))};
  const domains=[['candidate-basic',c,true],['candidate-all',c,false],['shipped-all',legacy,false]];
  const assertions=[],rows=[],recipes=[],bagsByDomain={};
  const check=(name,value)=>{if(!value)throw Error(name);assertions.push({name,status:'PASS_MODEL'});};
  for(const [domain,cat,basic] of domains){
    const bags=enumerate(cat,500,basic);bagsByDomain[domain]=bags;
    check(`${domain}: exhaustive independent enumeration`,JSON.stringify(bags.map(b=>key(b.ids)).sort())===JSON.stringify(countVectors(cat,500,basic)));
    check(`${domain}: no duplicate multiset`,new Set(bags.map(b=>key(b.ids))).size===bags.length);
    for(const bag of bags){
      let state={gold:500,items:[],cooldowns:{}};
      for(const id of bag.ids){const result=purchase(state,id,cat);check(`${domain}:${key(bag.ids)} purchase ${state.items.length}:${id}`,result.ok);state=result.state;}
      check(`${domain}:${key(bag.ids)} exact wallet`,state.gold===bag.unusedGold&&key(state.items)===key(bag.ids));
      for(const [hero,h]of Object.entries(snap.heroes)){
        const s=stats(h,1,bag.ids,cat,domain==='shipped-all'?'ship':'proposal'),base=stats(h,1,[],cat),tune=h.tuning?.dmg??1;
        const direct=(s.ad+(h.lmb.ap??0)*s.ap)*s.attackSpeed*tune;
        const nth=h.passive?.type==='every_nth_hit'?((h.passive.bonusDamage.base??0)+(h.passive.bonusDamage.ad??0)*s.ad)/h.passive.n:0;
        // Runtime uses includes(quickstring): legacy copies multiply AS but do NOT multiply third-hit damage.
        const third=domain==='shipped-all'&&bag.ids.includes('quickstring')?(snap.economy.items.quickstring.thirdHit??0)/3:0;
        rows.push({domain,hero,level:1,items:bag.ids,spent:bag.spent,unusedGold:bag.unusedGold,slots:bag.slots,hp:s.hp,armor:s.armor,mr:s.mr,ad:s.ad,ap:s.ap,attackSpeed:s.attackSpeed,hpRegen:s.hpRegen,moveSpeed:s.moveSpeed,physicalEhp:s.physicalEhp,magicEhp:s.magicEhp,physicalGainPct:100*(s.physicalEhp/base.physicalEhp-1),magicGainPct:100*(s.magicEhp/base.magicEhp-1),aaDamageType:h.lmb.damageType??'physical',aaDirectRawVsHeroDps:direct,aaUninterruptedNthRawVsHeroDps:direct+(nth+third)*s.attackSpeed*tune,aaDirectGainPct:100*(direct/((base.ad+(h.lmb.ap??0)*base.ap)*base.attackSpeed*tune)-1),excluded:'skills/CC/kiting/range/travel/conditional hero passive/regen timing/active; AP-MR-speed candidate consumer not shipped'+(bag.ids.some(id=>cat.items.find(i=>i.id===id)?.legacyActive||cat.items.find(i=>i.id===id)?.active)?'; relic effect excluded':'' )});
      }
      if(domain==='shipped-all')continue;
      for(const target of c.items){
        const before={gold:bag.unusedGold,items:bag.ids,cooldowns:{}},quote=purchase({...before,gold:100000},target.id,c),actual=purchase(before,target.id,c);
        const consumed=quote.ok?bag.ids.filter((id,k)=>bag.ids.slice(0,k+1).filter(x=>x===id).length>quote.state.items.filter(x=>x===id).length-(target.id===id?1:0)):[];
        const needed=quote.ok?Math.max(0,quote.price-bag.unusedGold):null;
        recipes.push({domain,items:bag.ids,target:target.id,tier:target.tier,credit:quote.ok?quote.credit:null,remainingPrice:quote.ok?quote.price:null,wallet:bag.unusedGold,additionalGoldNeeded:needed,canBuyNow:actual.ok,reason:actual.ok?'accepted':actual.reason,consumed:consumed,afterItems:quote.ok?quote.state.items:[],afterSlots:quote.ok?quote.state.items.length:null});
        check(`${domain}:${key(bag.ids)} quote:${target.id}`,actual.ok===(quote.ok&&needed===0));
        if(!actual.ok)check(`${domain}:${key(bag.ids)} atomic reject:${target.id}`,actual.state===before);
      }
    }
  }
  check('eight candidate basics',c.items.filter(i=>i.tier==='basic').length===8);
  check('six heroes',Object.keys(snap.heroes).length===6);
  check('HP pair affordable exact500',bagsByDomain['candidate-basic'].some(b=>key(b.ids)==='mach_tinh;mach_tinh'&&b.spent===500));
  check('moveSpeed duplicate excluded',!bagsByDomain['candidate-all'].some(b=>b.ids.filter(id=>id==='buoc_van').length>1));
  check('single relic excluded pair',!bagsByDomain['candidate-all'].some(b=>b.ids.filter(id=>c.items.find(i=>i.id===id).tier==='relic').length>1));
  check('every candidate basic represented',c.items.filter(i=>i.tier==='basic').every(i=>bagsByDomain['candidate-basic'].some(b=>key(b.ids)===i.id)));
  const q=(items,target)=>recipes.find(r=>r.domain==='candidate-basic'&&key(r.items)===key(items)&&r.target===target);
  check('two armor upgrade: 70 price / 50 extra',q(['dong_van','dong_van'],'iron_plate').remainingPrice===70&&q(['dong_van','dong_van'],'iron_plate').additionalGoldNeeded===50);
  check('two MR upgrade: 120 price / 100 extra',q(['ngoc_am','ngoc_am'],'an_tinh').remainingPrice===120&&q(['ngoc_am','ngoc_am'],'an_tinh').additionalGoldNeeded===100);
  check('HP+regen upgrade: 300 price / 250 extra',q(['mach_tinh','hat_sinh'],'binh_mach').remainingPrice===300&&q(['mach_tinh','hat_sinh'],'binh_mach').additionalGoldNeeded===250);
  check('two HP upgrade: 250 price / 250 extra',q(['mach_tinh','mach_tinh'],'binh_mach').remainingPrice===250&&q(['mach_tinh','mach_tinh'],'binh_mach').additionalGoldNeeded===250);
  const fullBag={gold:70,items:['dong_van','dong_van','hat_sinh','hat_sinh','hat_sinh','hat_sinh'],cooldowns:{relic_shared:60000}},up=purchase(fullBag,'iron_plate',c);
  check('full-bag upgrade consumes two and retains four',up.ok&&up.price===70&&up.state.items.length===5&&up.state.items.filter(id=>id==='hat_sinh').length===4&&up.state.cooldowns.relic_shared===60000);
  const short={...fullBag,gold:69},reject=purchase(short,'iron_plate',c);
  check('full-bag fee-minus-one atomic reject',!reject.ok&&reject.reason==='gold'&&reject.state===short);
  const partial={gold:560,items:['iron_plate','dong_van','mach_tinh','ngoc_am'],cooldowns:{}},merged=purchase(partial,'oathguard_plate',c);
  check('nested partial recipe exact1040credit/560fee',merged.ok&&merged.credit===1040&&merged.price===560&&key(merged.state.items)==='dong_van;oathguard_plate');
  const ntham=rows.find(r=>r.domain==='candidate-basic'&&r.hero==='nham_vu'&&key(r.items)==='mach_tinh;mach_tinh');
  check('Nham two HP golden EHP physical859.32 / magic886.6',Math.abs(ntham.physicalEhp-859.32)<1e-8&&Math.abs(ntham.magicEhp-886.6)<1e-8);
  const baseMi=rows.find(r=>r.domain==='candidate-basic'&&r.hero==='mi_dang'&&!r.items.length),apMi=rows.find(r=>r.domain==='candidate-basic'&&r.hero==='mi_dang'&&key(r.items)==='kinh_luu');
  check('Mi 18AP basic delta1.81764DPS, no spell timeline',Math.abs(apMi.aaDirectRawVsHeroDps-baseMi.aaDirectRawVsHeroDps-1.81764)<1e-8);
  const defense=Object.keys(snap.heroes).map(hero=>{
    const subset=rows.filter(r=>r.domain==='candidate-basic'&&r.hero===hero),ship=rows.find(r=>r.domain==='shipped-all'&&r.hero===hero&&key(r.items)==='iron_plate');
    const physical=[...subset].sort((a,b)=>b.physicalEhp-a.physicalEhp||a.spent-b.spent)[0],magic=[...subset].sort((a,b)=>b.magicEhp-a.magicEhp||a.spent-b.spent)[0];
    return {hero,physicalBest:physical.items,physicalGainPct:physical.physicalGainPct,magicBest:magic.items,magicGainPct:magic.magicGainPct,shippedIronPhysicalGainPct:ship.physicalGainPct};
  });
  return {status:'EXHAUSTIVE_OFFLINE_STARTER_SCREEN; CANDIDATE_DECISION_SUPPORT_ONLY',sourceCommit:snap.commit,sourceHashes:snap.hashes,budget:500,domains:Object.fromEntries(Object.entries(bagsByDomain).map(([d,b])=>[d,{inventories:b.length,heroRows:b.length*6,includesEmpty:true}])),assertions,rows,recipes,defense};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2);if(args.length&&!(args.length===2&&args[0]==='--out'))throw Error('Only --out is supported; runtime source is fixed at the newest inspected origin/main pin.');
  const at=args.indexOf('--out');if(at>=0&&!args[at+1])throw Error('--out requires a directory');
  const out=path.resolve(at>=0?args[at+1]:path.join(repo,'reports/production-2026-10-09'));
  const raw=readFileSync(path.join(here,'candidate-v01.json')),c=JSON.parse(raw),snap=snapshot(SOURCE_PIN),r=runStartupScreen(c,snap);
  r.candidateVersion=c.version;r.candidateSha256=sha(raw);r.toolSha256=sha(readFileSync(fileURLToPath(import.meta.url)));
  mkdirSync(out,{recursive:true});const prefix=path.join(out,'item-starter-closure');
  writeFileSync(prefix+'.json',JSON.stringify(r,null,2)+'\n');
  writeFileSync(prefix+'.csv',csv(r.rows,Object.keys(r.rows[0])));
  writeFileSync(prefix+'.recipes.csv',csv(r.recipes,Object.keys(r.recipes[0])));
  writeFileSync(prefix+'.contract.json',JSON.stringify(contract(c,snap,r.candidateSha256),null,2)+'\n');
  const hp= r.defense;
  const markdown=`# Item starter closure — 09/10/2026\n\n${r.status}. Fixed offline source: \`${r.sourceCommit}\`. Candidate ${c.version}, SHA256 \`${r.candidateSha256}\`. No live claim.\n\n|Domain|All legal bags incl. empty|Six-hero L1 rows|\n|---|---:|---:|\n${Object.entries(r.domains).map(([d,x])=>`|${d}|${x.inventories}|${x.heroRows}|`).join('\n')}\n\n${r.assertions.length} PASS_MODEL assertions: independent enumeration parity, legal purchases/exact wallet, every next-item quote and atomic rejection. This is a proposed shop model; shop position, authority, reconnect and actual effects remain NOT RUN.\n\n|Hero|Best physical basics|Physical gain|Best magic basics|Magic gain|Shipped iron physical gain|\n|---|---|---:|---|---:|---:|\n${hp.map(x=>`|${x.hero}|${x.physicalBest.join('+')}|${x.physicalGainPct.toFixed(2)}%|${x.magicBest.join('+')}|${x.magicGainPct.toFixed(2)}%|${x.shippedIronPhysicalGainPct.toFixed(2)}%|`).join('\n')}\n\n## Concrete candidate decision\n\nRecommend retaining V0.1 eight small basic components and moving the HP+armor bundle to later recipe tiers for the integration candidate. The exhaustive screen supports a smaller immediate defensive step; it does not approve the exact numbers for release. Two Mảnh Mạch spend500g, add180HP and maximize both static physical and magic EHP at L1 for all six heroes. They provide no AD/AP/AS/MR/armor/speed/regen and leave no wallet. One Mảnh Mạch + Hạt Sinh spends450g, adds90HP and1HP/s, leaves50g; two dedicated12-resistance components spend480g, add24 armor or MR and leave20g. Their conditional sustain/damage mix must be compared using measured combat.\n\nAD/AP/AS/speed + Hạt Sinh spends500g and supplies one offensive/mobility axis plus1HP/s while gaining no maxHP. AP contributes to magical basics through their pinned coefficient; all AP skill/heal/shield value remains outside AA ranking. Movement can change access and survival but has no value in these static columns. Relics are exhaustively listed in candidate-all and shipped-all; their timed effects are deliberately excluded from EHP/DPS, so comparing their rows cannot establish weakness.\n\nThe CSV exposes HP, both EHP values and percentage gains, armor/MR/AD/AP/AS/regen/speed, raw hero-target direct AA DPS and a separately labelled uninterrupted nth-hit average. Shipped Quickstring third-hit15 is included in the average once because runtime uses includes(), even if copies were possible. No invented hit timeline or TTK. Raw DPS excludes target resistance; divide by(1+appropriate resistance/100) for direct damage against a declared nonnegative-resistance target. Hero-on-hero tuning is applied once.\n\nThe recipes CSV has every candidate bag × all24 targets: credit, remaining price, wallet, additional gold, consumed/remaining slots and accept/reject reason. It includes relic copy conflicts. Prices do not imply an income curve or purchase time. Full-bag and higher-tier runtime acceptance is specified in the contract; starter bags alone cannot prove it.\n\n## Closed and open work\n\nClosed here: exhaustive starter data; both defense axes; AA and utility tradeoffs; concrete next-recipe feasibility; exact versioned migration and consumer contract; named runtime acceptance with owner/action/status. Machine contract is \`item-starter-closure.contract.json\`; implementation handoff is doc63.\n\nOpen with Codex council owners: catalog activation decision; version-aware authoritative shop/stats/bot/UI integration; same-match reconnect/stand-in state; all eight passives and relic consumers; missing icon assets/resolver/live VI–EN parity; Jev runtime receipts/traces and full-kit/3v3 balance. Each remains NOT_RUN_RUNTIME, not passed by these model assertions.\n\nRun: \`bun tools/balance/items/startup-screen.mjs\`. No network or floating source. JSON carries source, catalog and tool hashes plus all assertion names.\n`;
  writeFileSync(prefix+'.md',markdown);
  console.log(JSON.stringify({sourceCommit:r.sourceCommit,candidateVersion:r.candidateVersion,candidateSha256:r.candidateSha256,domains:r.domains,heroRows:r.rows.length,recipeQuotes:r.recipes.length,assertions:r.assertions.length,status:r.status,out}));
}
