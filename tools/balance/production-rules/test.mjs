// Offline execution of selected functions from a pinned repository, with fake engine handles.
// This does not contact Spawn or claim client/runtime acceptance.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {readPinned} from '../../audit/source-snapshot.mjs';
const pin = process.argv[2] ?? 'dcdbfb3d3cfe83ae65ed91a85dd439dceeb38f90';
const files = {};
function source(path) { const value = readPinned(pin,path); files[path] = createHash('sha256').update(value).digest('hex'); return value; }
function functionOf(text, name) {
  const at = text.indexOf(`function ${name}(`); assert(at >= 0, `missing ${name}`);
  const brace = text.indexOf('{', at); let depth = 0;
  for (let i = brace; i < text.length; i++) { if (text[i] === '{') depth++; if (text[i] === '}' && --depth === 0) return text.slice(at, i + 1); }
  throw Error(`unclosed ${name}`);
}
function plain(text) { return text.replace(/^import .*\n/gm, '').replace(/^export \{.*\n/gm, '').replace(/\bexport /g, ''); }
const lobby = source('scripts/lib/data/lobby.yml');
const scalar = (text, key) => Number(text.match(new RegExp(`^${key}:\\s*([\\d.]+)`, 'm'))?.[1]);
const L = { teamSize: scalar(lobby, 'teamSize'), pickSeconds: scalar(lobby, 'pickSeconds'), loadSeconds: scalar(lobby, 'loadSeconds'), resultsSeconds: scalar(lobby, 'resultsSeconds'), reconnectSeconds: scalar(lobby, 'reconnectSeconds'), abandonSeconds: scalar(lobby, 'abandonSeconds'), lobbyPlace: 'sanh', mapPlace: { mach_giua: 'main' }, modes: ['tai_hien', 'san_tap', 'thu_tran'], maps: ['mach_giua'], heroes: lobby.match(/^heroes: \[(.*)\]/m)[1].split(',').map(x => x.trim()) };
const core = source('scripts/referee/core.js'), match = source('scripts/referee/match.js'), lane = source('scripts/lane.js'), combat = source('scripts/lib/combat.js'), structures = source('scripts/lib/data/structures.yml');
const heroMatch = source('scripts/hero/match.js');
const economy = source('scripts/lib/data/economy.yml');
const results = []; const traces=[];
function check(id, scope, fn) { try { fn(); results.push({ id, status: 'PASS', scope }); } catch (e) { results.push({ id, status: 'FAIL', scope, error: e.message }); } }
function freshHarness() {
  let time = 100000;
  const ctx = { now: () => time, random: () => 0, place: { players: [], objects: {}, state: {} }, log() {}, emit() {}, cross: () => ({ crossed: true }), query: () => [], spawn(id, spec) { this.place.objects[id] = { id, ...spec }; } };
  const sandbox = { L, BOT: { names: { vi: 'Máy' } }, recordHall() {}, g2Open() {}, heroModel: () => null, armBody() {}, gripChannel: () => null };
  vm.createContext(sandbox); vm.runInContext(plain(core) + '\n' + plain(match) + '\nglobalThis.api={fresh,autoPlace,startPicking,finishPicking,serveRequests,handleLobby,matchTick,adopt,endMatch,closeMatch,holdUntil};', sandbox);
  return { ctx, api: sandbox.api, setTime: x => time = x };
}
const h = freshHarness();
check('ack-replay-once', 'actual core.js function / fake context', () => { const lb=h.api.fresh(); let effects=0; const p={state:{lobbyReq:{seq:1,op:'x'}}}; const online=new Map([['u',p]]); for(let i=0;i<3;i++)h.api.serveRequests(h.ctx,{},lb,online,()=>{effects++;}); assert.equal(effects,1); assert.equal(lb.ack.u,1); });
check('ack-restart-once', 'actual core.js function / fake context', () => { const lb=h.api.fresh(); lb.ack.u=5; const next=freshHarness(); let effects=0; next.api.serveRequests(next.ctx,{},lb,new Map([['u',{state:{lobbyReq:{seq:5}}}]]),()=>{effects++;}); assert.equal(effects,0); });
for (const mode of ['san_tap','thu_tran']) check(`source-roster-${mode}`, 'actual core.js / characterization, not design approval', () => { const lb=h.api.fresh(); lb.mode=mode;lb.host='u';h.api.autoPlace(lb,'u');assert.equal(lb.teams.blue.length,1);assert.deepEqual([...lb.teams.red],['bot-red-1']); });
check('pvp-six-unique', 'actual core.js / fake context', () => { const lb=h.api.fresh();lb.teams={blue:['b1','b2','b3'],red:['r1','r2','r3']};h.api.startPicking(h.ctx,lb); const s={};h.api.finishPicking(h.ctx,s,lb);assert.equal(new Set(Object.values(s.match.roster).map(r=>r.hero)).size,6); });
check('doc-practice-no-enemy-hero', 'actual core.js vs doc14 B0.1 / expected conflict', () => {const lb=h.api.fresh();lb.mode='san_tap';lb.host='u';h.api.autoPlace(lb,'u');assert.equal(lb.teams.red.length,0);});
check('pvp-ten-unique-contract', 'actual core.js vs doc14 PvP unique / expected conflict', () => { const lb=h.api.fresh();lb.teams={blue:['b1','b2','b3','b4','b5'],red:['r1','r2','r3','r4','r5']};h.api.startPicking(h.ctx,lb);const s={};h.api.finishPicking(h.ctx,s,lb);assert.equal(new Set(Object.values(s.match.roster).map(r=>r.hero)).size,10); });
check('roster-snapshot', 'actual core.js / fake context', () => {const lb=h.api.fresh();lb.teams={blue:['b'],red:['r']};h.api.startPicking(h.ctx,lb);const s={};h.api.finishPicking(h.ctx,s,lb);const old=JSON.stringify(s.match.roster);lb.pick.b.hero='van_dao';lb.teams.blue.push('new');assert.equal(JSON.stringify(s.match.roster),old);});
check('results-snapshot-20s', 'actual match.js / fake context', () => {const x=freshHarness(),lb=x.api.fresh(),s=x.ctx.place.state;Object.assign(lb,{mode:'tai_hien',matchId:2});s.lobby=lb;s.match={startedAt:90000,roster:{u:{team:'blue',hero:'moc_lam',name:'u'}},saved:{u:{level:4,gold:888,cs:10}}};x.api.endMatch(x.ctx,s,lb,'blue');assert.equal(s.results.rows[0].gold,888);assert.equal(s.results.seconds,10);assert.equal(lb.phaseEndsAt,120000);s.match.saved.u.gold=0;assert.equal(s.results.rows[0].gold,888);});
check('practice-winner-null', 'actual match.js / fake context', () => {const x=freshHarness(),lb=x.api.fresh(),s=x.ctx.place.state;lb.mode='san_tap';s.lobby=lb;s.match={startedAt:100000,roster:{},saved:{}};x.api.endMatch(x.ctx,s,lb,null);assert.equal(s.results.winner,null);});
check('source-hold-900s', 'actual match.js / characterization, disputed owner rule', () => {const lb=h.api.fresh();lb.seen={u:100000};assert.equal(h.api.holdUntil(lb,'u',100000),100000+900000);});
check('doc-solo-hold-60s', 'actual match.js vs doc14/Bible / expected conflict', () => {const lb=h.api.fresh();lb.seen={u:100000};assert.equal(h.api.holdUntil(lb,'u',100000),160000);});
const ranks=vm.runInNewContext(functionOf(combat,'rankOf')+';rankOf');
for(const slot of ['q','rmb','e'])for(const [level,expect]of [[1,0],[2,0],[3,1],[5,2],[7,3],[9,4],[15,4]])check(`rank-${slot}-${level}`,'actual rankOf / independent doc09 table',()=>assert.equal(ranks(slot,level),expect));
for(const [level,expect]of [[1,-1],[5,-1],[6,0],[10,0],[11,1],[14,1],[15,2]])check(`rank-r-${level}`,'actual rankOf / independent doc09 table',()=>assert.equal(ranks('r',level),expect));
const award=vm.runInNewContext(functionOf(lane,'reward')+';reward',{heroBodies:ctx=>ctx.heroes,SFX:x=>x});
for(const [by,team,expected]of [['hero','blue',25],['hero','red',0],['minion','blue',0],['tower','blue',0]])check(`reward-${by}-${team}`,'actual reward / fake handles',()=>{const p={id:'hero',state:{team,gold:0,xp:0,cs:0}},ctx={heroes:[p],emit(){}};award(ctx,{state:{lastHitBy:by,team:'red'},feetPosition:{x:0,y:0,z:0}},25,45);assert.equal(p.state.gold,expected);assert.equal(p.state.xp,expected?45:0);assert.equal(p.state.cs,expected?1:0);});
check('reward-caller-dead-guard','source invariant only / not execution',()=>{assert.match(lane,/if \(s\.dead\) continue/);assert.match(lane,/m\.state\.dead = true/);});
const aggro=vm.runInNewContext(functionOf(lane,'heroAggressor')+';heroAggressor',{heroBodies:ctx=>ctx.heroes,S:{minions:{heroAggroWindow:3}},dist2d:(a,b)=>Math.hypot(a.x-b.x,a.z-b.z)});
for(const [id,time,pos,victim,dead,expected]of [['player',100000,5,5,false,'player'],['bot',100000,5,5,false,'bot'],['stale',96000,5,5,false,null],['outside',100000,15,5,false,null],['victimOutside',100000,5,15,false,null],['dead',100000,5,5,true,null]])check(`aggro-${id}`,'actual heroAggressor / fake player or bot',()=>{const ctx={now:()=>100000,heroes:[{id,state:{hero:'x',team:'red',dead,hitHeroAt:time,hitHeroPos:{x:victim,z:0}},feetPosition:{x:pos,z:0}}]};assert.equal(aggro(ctx,{feetPosition:{x:0,z:0}},'red',14,14)?.id??null,expected);});
const towerSandbox={TOWER_IDS:['t1'],S:{towerRamp:scalar(structures,'towerRamp'),towerRampMax:scalar(structures,'towerRampMax'),towerOrbSpeed:30,towerTelegraph:.6},towerMem:{},markSiege(){},fall(){},structInfo:()=>({team:'blue',range:14,interval:1.2,damage:150,muzzle:1}),other:()=> 'red',units:ctx=>ctx.near,heroAggressor:()=>null,TEAM_COLOR:{blue:[0,0,1]}};
const stepTowers=vm.runInNewContext(functionOf(lane,'stepTowers')+';stepTowers',towerSandbox);
check('tower-ramp-reset','actual stepTowers / fake handles / raw damage',()=>{let now=100000;const shots=[];const tower={id:'t1',state:{hp:100},feetPosition:{x:0,y:0,z:0}};const ctx={now:()=>now,query:()=>[tower],getObject:()=>tower,place:{objects:{t1:tower}},near:[{id:'a',kind:'hero',d:1,pos:{x:1,y:0,z:0},height:2}],emit(){},after(t,fn,p){shots.push(p.dmg);}};for(let i=0;i<5;i++){stepTowers(ctx);now+=1200;}ctx.near[0].id='b';stepTowers(ctx);traces.push(...shots.map((raw,i)=>({scenario:"tower-ramp-reset",step:i+1,raw})));assert.deepEqual(shots,[150,203,255,308,308,150]);});
check('level-up-no-freeheal','actual extracted level loop / fake stats recompute',()=>{const marker=heroMatch.indexOf('while (s.level < ECO.maxLevel');const brace=heroMatch.indexOf('{',marker);let n=0,end=brace;for(;end<heroMatch.length;end++){if(heroMatch[end]==='{')n++;if(heroMatch[end]==='}'&&--n===0)break;}const block=heroMatch.slice(marker,end+1);const s={level:1,xp:660,hp:120,maxHp:502};const ECO={maxLevel:15,xpTable:[280,380,480]};const ctx={self:{feetPosition:{}},emit(){}};vm.runInNewContext(block,{s,ECO,ctx,SOUND:{level:'x'},recompute(){s.maxHp+=90;s.hp+=90;}});assert.equal(s.level,3);assert.equal(s.hp,120);assert.equal(s.maxHp,682);});
check("tower-comment-307-contract", "structures.yml comment vs actual shot / expected conflict",()=>assert.equal(traces.find(x=>x.step===4).raw,307));
check("tower-negative-golden", "independent rational golden / rejects floor mutation",()=>{const golden=[150,203,255,308];assert.equal(golden[3],Math.floor((150*205+50)/100));assert.notEqual(Math.floor(150*2.05),golden[3]);assert.deepEqual(traces.slice(0,4).map(x=>x.raw),golden);});
const flow=[];
check('flow-lobby-to-results-to-lobby','actual core/match functions; ticket handoff/deadline tick are fixture-controlled, no engine cross',()=>{
 const x=freshHarness(),s=x.ctx.place.state;let lb=x.api.fresh();s.lobby=lb;lb.host='u';lb.teams={blue:['u'],red:['v']};lb.names={u:'U',v:'V'};let now=100000;
 const snap=(event)=>flow.push({scenario:'match-flow',at:now,event,phase:lb.phase,ack:lb.ack.u??0,roster:Object.keys(s.match?.roster??{}).length});
 snap('initial'); const player={state:{lobbyReq:{seq:1,op:'start'}}}, online=new Map([['u',player]]);
 for(let i=0;i<3;i++)x.api.serveRequests(x.ctx,s,lb,online,x.api.handleLobby);
 assert.equal(lb.phase,'picking');assert.equal(lb.ack.u,1);snap('start replayed three times / applied once');
 assert.equal(lb.phaseEndsAt,now+L.pickSeconds*1000);now=lb.phaseEndsAt;x.setTime(now);x.api.finishPicking(x.ctx,s,lb);assert.equal(lb.phase,'loading');snap('pick deadline');
 assert.equal(lb.phaseEndsAt,now+L.loadSeconds*1000);now=lb.phaseEndsAt;x.setTime(now);
 const ticket={matchId:1,mode:lb.mode,map:lb.map,host:'u',roster:s.match.roster,names:lb.names};lb=x.api.adopt(x.ctx,s,lb,ticket);assert.equal(lb.phase,'ingame');snap('fixture passes source roster ticket into adopt');
 lb.seen={u:now};const until=x.api.holdUntil(lb,'u',now);flow.push({scenario:'match-flow',at:now,event:'read hold deadline, no simulated networking',phase:lb.phase,holdUntil:until,holdSeconds:(until-now)/1000});
 now+=30000;x.setTime(now);x.api.endMatch(x.ctx,s,lb,'blue');assert.equal(lb.phase,'results');assert.equal(s.results.seconds,30);snap('fixture ends match blue');
 assert.equal(lb.phaseEndsAt,now+L.resultsSeconds*1000);now=lb.phaseEndsAt;x.setTime(now);x.api.matchTick(x.ctx);lb=s.lobby;assert.equal(lb.phase,'lobby');assert.equal(s.match,null);snap('results deadline / matchTick closes, no live players');
 assert.deepEqual(flow.filter(t=>t.phase).map(t=>t.phase),['lobby','picking','loading','ingame','ingame','results','lobby']);
});
const summary={pin,date:'2026-10-09',scope:'Offline extracted source functions with fake engine handles; no client PASS; expected contract failures remain visible.',passed:results.filter(x=>x.status==='PASS').length,failed:results.filter(x=>x.status==='FAIL').length,sourceHashes:files,traces,flow,results};
mkdirSync('reports/production-2026-10-09',{recursive:true});writeFileSync('reports/production-2026-10-09/rules-tests.json',JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({pin,passed:summary.passed,failed:summary.failed,failures:results.filter(x=>x.status==='FAIL')},null,2));process.exitCode=summary.failed?1:0;






