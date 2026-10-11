import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {readPinned} from './source-snapshot.mjs';
const root=path.resolve(import.meta.dir,'../..');process.chdir(root);
const at=process.argv.indexOf('--commit');
const pin=at<0?'9351e23c6c6b4cc55a160dbf7aec268973b6394d':process.argv[at+1];
const get=p=>readPinned(pin,p);
const raw=get('scripts/lib/data/map.yml'),structure=get('scripts/lib/data/structures.yml');
const m=Bun.YAML.parse(raw),s=Bun.YAML.parse(structure),out='reports/production-2026-10-09';
fs.mkdirSync(out,{recursive:true});
const tests=[];const check=(name,ok)=>tests.push({name,status:ok?'PASS_DATA':'FAIL'});
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
check('finite lane / positive widths',m.lane.every(p=>p.length===2&&p.every(Number.isFinite))&&m.laneWidth>0&&m.extent>0);
check('lane point symmetry',m.lane.every((p,i)=>dist(p,m.lane.at(-1-i).map(x=>-x))<1e-8));
check('four tower IDs',Object.keys(m.towers).length===4);
check('tower HP matches structures owner',Object.values(m.towers).every(t=>t.hp===s.tower[t.tier].hp));
check('tower pairs mirrored',Object.entries(m.towers).filter(([id])=>id.includes('blue')).every(([id,t])=>dist(t.at,m.towers[id.replace('blue','red')].at.map(x=>-x))<1e-8));
check('brushes mirrored / positive radii',Object.entries(m.brushes).filter(([id])=>id.endsWith('blue')).every(([id,b])=>b.rx>0&&b.rz>0&&dist(b.at,m.brushes[id.replace('blue','red')].at.map(x=>-x))<1e-8));
check('all points within map extent',[...m.lane,...Object.values(m.towers).map(t=>t.at),...Object.values(m.brushes).map(b=>b.at),...Object.values(m.nexus),...Object.values(m.bases)].every(p=>p.every(v=>Math.abs(v)<=m.extent)));
check('bases/fountains/nexus symmetric',['bases','fountains','nexus'].every(k=>dist(m[k].blue,m[k].red.map(x=>-x))<1e-8));
const ranges={t1ToT1:dist(m.towers['tower-blue-t1'].at,m.towers['tower-red-t1'].at),t1ToT2:dist(m.towers['tower-blue-t1'].at,m.towers['tower-blue-t2'].at),radius:s.tower[1].range};
ranges.openBetweenT1=ranges.t1ToT1-2*ranges.radius;ranges.openBetweenOwnTowers=ranges.t1ToT2-2*ranges.radius;
const hash=x=>createHash('sha256').update(x).digest('hex');
fs.writeFileSync(`${out}/map-geometry.json`,JSON.stringify({pin,status:'DATA_GEOMETRY_ONLY_NOT_NAV_CLIENT',sourceHashes:{map:hash(raw),structures:hash(structure)},map:m,tests,ranges,exclusions:['scene placement','walkability','collision','LOS','hero/model scale','camera readability','balance/travel time']},null,2));
const k=660/(2*m.extent),xy=([x,z])=>[70+(x+m.extent)*k,95+(z+m.extent)*k],p=([x,z])=>`${x.toFixed(2)},${z.toFixed(2)}`;
const lane=m.lane.map(a=>p(xy(a))).join(' ');
let shapes=`<polyline points="${lane}" fill="none" stroke="#c6b995" stroke-width="${m.laneWidth*k}" stroke-linejoin="round"/>`;
for(const [id,t]of Object.entries(m.towers)){const[x,y]=xy(t.at),color=t.team==='blue'?'#2e9cbc':'#d46757';shapes+=`<circle cx="${x}" cy="${y}" r="${s.tower[t.tier].range*k}" fill="${color}" fill-opacity=".09" stroke="${color}" stroke-dasharray="5 4"/><circle cx="${x}" cy="${y}" r="7" fill="${color}"/><text x="${x+9}" y="${y-9}" font-size="12">${t.team} T${t.tier}</text>`;}
for(const b of Object.values(m.brushes)){const[x,y]=xy(b.at);shapes+=`<ellipse cx="${x}" cy="${y}" rx="${b.rx*k}" ry="${b.rz*k}" transform="rotate(${b.rot} ${x} ${y})" fill="#559775"/>`;}
for(const[team,at]of Object.entries(m.nexus)){const[x,y]=xy(at);shapes+=`<rect x="${x-7}" y="${y-7}" width="14" height="14" fill="${team==='blue'?'#2e9cbc':'#d46757'}"/><text x="${x+10}" y="${y+20}" font-size="12">${team} nexus</text>`;}
fs.writeFileSync(`${out}/map-geometry.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="845" viewBox="0 0 800 845"><rect width="800" height="845" fill="#f4f4ed"/><g font-family="Arial,sans-serif" fill="#173334"><text x="30" y="32" font-size="24">Mạch Giữa · dữ liệu geometry đang ghim</text><text x="30" y="58" font-size="13">World X → phải; World Z → dưới. Không phải concept art hoặc chứng nhận nav.</text><rect x="70" y="95" width="660" height="660" fill="#e1e8e0" stroke="#49685e"/>${shapes}<text x="30" y="788" font-size="15">T1–T1 ${ranges.t1ToT1.toFixed(2)} m · khoảng ngoài tầm ${ranges.openBetweenT1.toFixed(2)} m</text><text x="30" y="814" font-size="15">T1–T2 ${ranges.t1ToT2.toFixed(2)} m · khoảng ngoài tầm ${ranges.openBetweenOwnTowers.toFixed(2)} m</text></g></svg>`);
fs.writeFileSync(`${out}/map-geometry.csv`,'id,x,z,tier,range_m,hp\n'+Object.entries(m.towers).map(([id,t])=>[id,...t.at,t.tier,s.tower[t.tier].range,t.hp].join(',')).join('\n'));
console.log(`${tests.filter(t=>t.status==='PASS_DATA').length}/${tests.length} PASS_DATA: coordinates only; not scene/nav/client.`);
if(tests.some(t=>t.status==='FAIL'))process.exitCode=1;
