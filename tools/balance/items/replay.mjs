import {eventProbe, mitigation} from './simulate.mjs';

// Pure candidate contract replay. Input events are facts, not AI decisions or engine telemetry.
// Seconds everywhere. Does not simulate movement, hit success, cooldowns of hero skills, or team fights.
export function replayPassives(catalog, ids, events, context={}) {
  const equipped=ids.map(id=>catalog.items.find(i=>i.id===id));
  if(equipped.some(i=>!i))throw Error('Unknown replay item');
  const groups=new Map();
  for(const i of equipped)if(i.passive&&!groups.has(i.passive.group))groups.set(i.passive.group,{item:i,hits:0,lastHit:-Infinity,target:null,readyAt:0,consumed:false,seenCasts:new Set()});
  let lastTime=0,combatAt=0,castAt=-Infinity,dead=false;
  const effects=[];
  for(const ev of events){
    if(!Number.isFinite(ev.at)||ev.at<lastTime)throw Error('Events require finite monotonic seconds');
    const dt=ev.at-lastTime;lastTime=ev.at;
    if(ev.kind==='death'){dead=true;for(const s of groups.values()){s.hits=0;s.target=null;s.consumed=true;}continue;}
    if(ev.kind==='respawn'){dead=false;castAt=-Infinity;combatAt=ev.at;continue;}
    if(dead)continue;
    if(ev.kind==='hero_damage' && (ev.amount>0||ev.shieldDamage>0))combatAt=ev.at;
    if(ev.kind==='ability_cast'&&ev.source==='hero'){castAt=ev.at;for(const s of groups.values())s.consumed=false;}
    for(const s of groups.values()){
      const p=s.item.passive,t=p.trigger;let fact=null;
      if(['every_nth_basic_hit','nth_basic_hit_same_hero'].includes(t.event)&&ev.kind==='basic_hit'&&ev.source==='hero'){
        const allowed=t.allowedTargets??['hero'];if(!allowed.includes(ev.target))continue;
        if(!ev.targetId)throw Error('Basic hit needs targetId');
        const switched=s.target!==null&&s.target!==ev.targetId,gap=ev.at-s.lastHit;
        if(gap>t.counterResetAfterSeconds||(t.counterResetOnTargetSwitch&&switched))s.hits=0;
        s.hits++;s.lastHit=ev.at;s.target=ev.targetId;
        fact={...ev,kind:t.event,hits:s.hits,gap:0,switchedTarget:false};
      } else if(t.event==='basic_hit_after_ability_cast'&&ev.kind==='basic_hit')fact={...ev,kind:t.event,secondsSinceAbility:ev.at-castAt,consumed:s.consumed};
      else if(t.event==='ability_damage_to_hero'&&ev.kind==='ability_hit'&&ev.target==='hero'){
        if(!ev.castId)throw Error('Ability hit needs castId');
        fact={...ev,kind:t.event,castHitIndex:s.seenCasts.has(ev.castId)?2:1};
        s.seenCasts.add(ev.castId);
      } else if(t.event==='hero_shield_expired_or_broken'&&ev.kind==='shield_end')fact={...ev,kind:t.event};
      else if(t.event==='ability_heal_or_shield'&&ev.kind==='heal_or_shield')fact={...ev,kind:t.event};
      else if(t.event==='out_of_hero_combat'&&ev.kind==='tick')fact={...ev,kind:t.event,source:'hero',outOfCombatSeconds:ev.at-combatAt};
      if(!fact)continue;
      fact.dead=dead;fact.cooldownReady=ev.at>=s.readyAt;
      const result=eventProbe(p,fact,{...context,amount:ev.amount??context.amount});
      if(!result.triggered)continue;
      s.readyAt=ev.at+p.cooldownSeconds;
      if(t.consumeOnFirstValidHit)s.consumed=true;
      const rawValue=result.value;
      let effectiveValue=rawValue;
      if(p.effect.kind==='bonus_damage')effectiveValue=mitigation(rawValue*(context.tuning??1),p.effect.damageType,context.targetResistance??{armor:0,mr:0});
      // Interval contains only its eligible tail, never awards eight seconds of retroactive regen.
      if(p.effect.kind==='hp_regen_bonus')effectiveValue=rawValue*Math.max(0,ev.at-Math.max(ev.at-dt,combatAt+t.afterSeconds));
      effects.push({at:ev.at,item:s.item.id,kind:p.effect.kind,rawValue,effectiveValue,until:ev.at+p.durationSeconds,targetId:ev.targetId??'self',valueStage:result.valueStage});
    }
  }
  return {status:'CANDIDATE PURE EVENT REPLAY, NOT ENGINE MATCH',effects,groups:[...groups.values()].map(s=>({item:s.item.id,hits:s.hits,readyAt:s.readyAt})),limits:['Events and confirmed targets supplied by fixture; no hit detection or AI.','Damage includes caller resistance and tuning. Shields and healing are effect outputs; no currentHP clamp or shield absorption model.','Catalog inventory fixed for replay; durable cooldown sale/rebuy tested in transaction suite.','Hero kit skill/CC/range/economy simulation remains excluded.']};
}
