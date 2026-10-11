// Pure offline model of doc61. Never imports or modifies game runtime.
export const distance = (a, b) => Math.hypot(a.x-b.x,a.z-b.z);
function validateConfig(c) {
  if(!c?.parameters||!c?.fixture||!Array.isArray(c.fixture.beacons)||!Array.isArray(c.fixture.walls)||!Array.isArray(c.fixture.hardCC))throw Error('Invalid fixture configuration');
  for(const [key,value] of Object.entries(c.parameters))if(!Number.isFinite(value)||value<=0)throw Error(`Invalid parameter ${key}`);
  for(const key of ['tierIAt','tierIIAt','tierIDuration','tierIIDuration','tailDuration','switchPrice','switchRange','switchCooldown','beaconSwitchCooldown'])if(!(c.parameters[key]>0))throw Error(`Missing parameter ${key}`);
  if(c.parameters.tierIIAt<=c.parameters.tierIAt)throw Error('II must follow I');
  for(const key of ['visionRadius','interactionRadius'])if(!Number.isFinite(c.fixture[key])||c.fixture[key]<=0)throw Error(`Invalid ${key}`);
  const ids=new Set();for(const b of c.fixture.beacons){if(typeof b.id!=='string'||!b.id||b.id in Object.prototype||ids.has(b.id)||!Number.isFinite(b.x)||!Number.isFinite(b.z)||![null,'blue','red'].includes(b.territory))throw Error('Invalid beacon fixture');ids.add(b.id);}
  for(const w of c.fixture.walls)if(![w.x1,w.z1,w.x2,w.z2].every(Number.isFinite)||w.x1>w.x2||w.z1>w.z2)throw Error('Invalid LOS box');
}
export class BeaconModel {
  constructor(config) { validateConfig(config);this.config=structuredClone(config); this.now=0; this.round=1; this.players={}; this.log=[]; this.beacons={}; this.resetBeacons(); }
  resetBeacons() { for(const b of this.config.fixture.beacons) this.beacons[b.id]={...b,owner:null,tier:0,cycle:0,end:0,iiEnd:0,lockUntil:0,channel:null}; }
  addPlayer(id,team,x=0,z=0,gold=500) { if(typeof id!=='string'||!id||id in Object.prototype||Object.hasOwn(this.players,id)||!['blue','red'].includes(team)||![x,z,gold].every(Number.isFinite)||gold<0)throw Error('Invalid or duplicate fixture player');this.players[id]={id,team,x,z,gold,alive:true,connected:true,cc:null,tool:false,readyAt:0}; return this.players[id]; }
  record(event,id,extra={}) { const b=this.beacons[id]; this.log.push({time:this.now,round:this.round,event,beacon:id??null,owner:b?.owner??null,tier:b?.tier??null,end:b?.end??null,...extra}); }
  expire(b) { if(b.tier && this.now>=b.end) { b.owner=null;b.tier=0;b.iiEnd=0;this.record('expired',b.id); } else if(b.tier===2 && this.now>=b.iiEnd) { b.tier=1;this.record('tierII-ended',b.id); } }
  eligible(p,b,r) { return p?.alive && p.connected && !p.cc && distance(p,b)<=r && lineOfSight(p,b,this.config.fixture.walls); }
  advance(to) {
    if(!Number.isFinite(to)||to<this.now) throw Error('Clock must be finite and cannot move backward');
    let iterations=0;
    while(++iterations<10000) {
      let next=Infinity;
      for(const b of Object.values(this.beacons)) {
        if(b.tier) next=Math.min(next,b.end,b.tier===2?b.iiEnd:Infinity);
        if(b.channel) next=Math.min(next,b.channel.start+(b.channel.stage===0?this.config.parameters.tierIAt:this.config.parameters.tierIIAt));
      }
      if(next>to) break;
      this.now=next;
      for(const b of Object.values(this.beacons)) this.expire(b);
      for(const b of Object.values(this.beacons)) {
        const c=b.channel;if(!c) continue;
        const p=this.players[c.player];
        if(!this.eligible(p,b,this.config.fixture.interactionRadius)) { this.interrupt(c.player,'invalid');continue; }
        const due=c.start+(c.stage===0?this.config.parameters.tierIAt:this.config.parameters.tierIIAt);
        if(due>this.now) continue;
        if(c.recovery) {
          if(b.owner===p.team && b.cycle===c.cycle && this.now<b.iiEnd && b.tier===1) {b.tier=2;this.record('recovered-II',b.id);} else this.record('recovery-rejected',b.id);
          b.channel=null;
        } else if(c.stage===0) {
          b.cycle++;b.owner=p.team;b.tier=1;b.end=this.now+this.config.parameters.tierIDuration;b.iiEnd=0;c.stage=1;c.cycle=b.cycle;this.record('captured-I',b.id);
        } else {
          if(b.owner===p.team && b.cycle===c.cycle) {b.tier=2;b.iiEnd=this.now+this.config.parameters.tierIIDuration;b.end=b.iiEnd+this.config.parameters.tailDuration;this.record('upgraded-II',b.id);}
          else this.record('upgrade-rejected',b.id);
          b.channel=null;
        }
      }
    }
    if(iterations>=10000) throw Error('Event loop did not converge');
    this.now=to;
  }
  begin(player,id) {
    const p=this.players[player],b=this.beacons[id]; if(!b || !this.eligible(p,b,this.config.fixture.interactionRadius)) return false;
    if(b.channel || Object.values(this.beacons).some(x=>x.channel?.player===player)) return false;
    const recovery=b.owner===p.team && b.tier===1 && b.iiEnd>this.now;
    if(b.owner===p.team && !recovery) return false;
    b.channel={player,start:this.now,stage:recovery?1:0,recovery,cycle:b.cycle};this.record('channel-start',id,{player,recovery});return true;
  }
  interrupt(player,reason='released') { for(const b of Object.values(this.beacons)) if(b.channel?.player===player) {b.channel=null;this.record('channel-interrupt',b.id,{player,reason});} }
  playerEvent(id,event) { const p=this.players[id];if(!p||!['death','disconnect','move','cast','attack','damage','released',...this.config.fixture.hardCC].includes(event))return false;if(event==='death') p.alive=false;if(event==='disconnect')p.connected=false;if(this.config.fixture.hardCC.includes(event))p.cc=event;if(event!=='damage')this.interrupt(id,event);return true; }
  buy(id,atShop=true) { const p=this.players[id],v=this.config.parameters;if(!p||!atShop||!p.alive||p.tool||p.gold<v.switchPrice)return false;p.gold-=v.switchPrice;p.tool=true;p.readyAt=this.now;this.record('buy',null,{player:id,gold:p.gold});return true; }
  useSwitch(player,id) {
    const p=this.players[player],b=this.beacons[id],v=this.config.parameters;
    if(!b||!p?.tool||!this.eligible(p,b,v.switchRange)||b.territory!==p.team||this.now<p.readyAt||this.now<b.lockUntil||b.owner===p.team)return false;
    if(b.tier===2)b.tier=1;
    else if(b.tier===1){b.owner=null;b.tier=0;b.iiEnd=0;}
    else {b.cycle++;b.owner=p.team;b.tier=1;b.end=this.now+v.tierIDuration;b.iiEnd=0;}
    p.readyAt=this.now+v.switchCooldown;b.lockUntil=this.now+v.beaconSwitchCooldown;this.record('switch',id,{player});return true;
  }
  snapshot() {return structuredClone({config:this.config,now:this.now,round:this.round,players:this.players,beacons:this.beacons,log:this.log});}
  static restore(s) {
    if(!s||!Number.isFinite(s.now)||s.now<0||!Number.isInteger(s.round)||s.round<1||!s.players||!s.beacons||!Array.isArray(s.log))throw Error('Invalid snapshot');
    const m=new BeaconModel(s.config);
    if(Object.keys(s.beacons).length!==s.config.fixture.beacons.length)throw Error('Invalid snapshot beacons');
    for(const [id,p]of Object.entries(s.players))if(id in Object.prototype||p.id!==id||!['blue','red'].includes(p.team)||![p.x,p.z,p.gold,p.readyAt].every(Number.isFinite)||p.gold<0||p.readyAt<0||typeof p.alive!=='boolean'||typeof p.connected!=='boolean'||typeof p.tool!=='boolean')throw Error('Invalid snapshot player');
    for(const fixture of s.config.fixture.beacons){const b=s.beacons[fixture.id];if(!b||b.id!==fixture.id||b.x!==fixture.x||b.z!==fixture.z||b.territory!==fixture.territory||![null,'blue','red'].includes(b.owner)||![0,1,2].includes(b.tier)||!Number.isInteger(b.cycle)||b.cycle<0||![b.end,b.iiEnd,b.lockUntil].every(x=>Number.isFinite(x)&&x>=0)||(b.tier===0&&b.owner!==null)||(b.tier>0&&b.owner===null))throw Error('Invalid snapshot beacon');
      const c=b.channel;if(c&&(!s.players[c.player]||!Number.isFinite(c.start)||c.start<0||c.start>s.now||![0,1].includes(c.stage)||typeof c.recovery!=='boolean'||!Number.isInteger(c.cycle)||c.cycle<0))throw Error('Invalid snapshot channel');}
    Object.assign(m,structuredClone(s));return m;
  }
  reset() {this.round++;this.now=0;this.resetBeacons();for(const p of Object.values(this.players)){p.tool=false;p.readyAt=0;p.gold=500;p.alive=true;p.connected=true;p.cc=null;}this.record('reset',null);}
  visible(team,target) {return Object.values(this.beacons).some(b=>b.owner===team&&b.tier>0&&distance(b,target)<=this.config.fixture.visionRadius&&lineOfSight(b,target,this.config.fixture.walls)&&(b.tier===2||(!target.brush&&!target.stealth)));}
  observation(team,targets) {return targets.filter(t=>t.team===team||this.visible(team,t)).map(t=>({...t}));}
}
export function lineOfSight(a,b,walls=[]) {
  return !walls.some(w=>{let lo=0,hi=1;for(const [u,v,mn,mx] of [[a.x,b.x,w.x1,w.x2],[a.z,b.z,w.z1,w.z2]]){const d=v-u;if(Math.abs(d)<1e-12){if(u<mn||u>mx)return false;}else{const t1=(mn-u)/d,t2=(mx-u)/d;lo=Math.max(lo,Math.min(t1,t2));hi=Math.min(hi,Math.max(t1,t2));if(lo>hi)return false;}}return lo<=hi;});
}
export function botDecision(observation,{allyChannel=false,objective=false,safeExit=false,threat=false}={}) {
  // Only supplied visible observations, no world-state access.
  if(observation.some(t=>t.enemy&&t.channel))return 'interrupt';
  if(allyChannel)return 'protect';
  if(threat||!safeExit)return 'farm';
  return objective?'channel-II':'channel-I';
}
