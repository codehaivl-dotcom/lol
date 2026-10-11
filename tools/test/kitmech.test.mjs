// node tools/tests/kitmech.test.mjs: Hạo Nhật kit mechanics (E xuyên lính, khiên nổ một lần, R hai nhịp choáng nhịp hai, nội tại). Pure functions, PASS_MODEL only.
import * as K from '../../scripts/lib/kitmech.js'
const R=(ok,m)=>console.log(ok?'PASS':'FAIL',m)
const m=(a)=>({u:{kind:'minion'},along:a}), h=(a)=>({u:{kind:'hero'},along:a})
let r=K.skillshotStruck([m(2),m(4),h(6),m(8)],{range:12,width:1.2,passMinions:true}); R(r.struck.length===3&&r.reach===6&&r.stopped,'E xuyên lính, dừng ở tướng đầu')
r=K.skillshotStruck([m(2),h(6)],{range:12,width:1.2}); R(r.struck.length===1&&r.reach===2,'skillshot thường dừng ở lính đầu')
r=K.skillshotStruck([m(2),m(4)],{range:12,width:1.2,passMinions:true}); R(r.struck.length===2&&r.reach===12,'E không có tướng: bay hết tầm')
const now=1000; const s={shield:K.shieldRow(100,{duration:3,burst:{base:[60,90],radius:4}},1,now)}
R(K.dueBurst(s,now+500)===null,'khiên còn: chưa nổ')
s.shield.amt=0; const b=K.dueBurst(s,now+600); R(b&&b.rank===1,'khiên vỡ: nổ'); R(K.dueBurst(s,now+700)===null,'nổ đúng một lần')
const s2={shield:K.shieldRow(100,{duration:3,burst:{base:[60]}},0,now)}; R(K.dueBurst(s2,now+3001)!==null,'khiên hết hạn: nổ')
const spec={hits:2,effects:[{stun:1}]}; let pl={echo:0}
R(K.beatSpec(spec,pl).effects===null,'R nhịp 1: không choáng'); pl=K.nextEcho(spec,pl); R(pl.echo===1&&K.beatSpec(spec,pl).effects.length===1,'R nhịp 2: choáng'); R(K.nextEcho(spec,pl)===null,'R đúng 2 nhịp')
R(K.passiveBonus({bonusDamage:{base:20,ap:0.2,perLevel:6}},{ap:50,ad:0,level:5})===20+10+24,'nội tại: 20+0.2AP+6/cấp')
// Hương Mai (H1b): Cổng Khép, Mạch Lành
const pc={type:'cdr_on_hit',seconds:0.6,ult:false}
let cd=K.cdrOnHit(pc,{q:5000,rmb:1300,e:900,r:90000,lmb:2000},1000)
R(cd.q===4400&&cd.rmb===1000&&cd.e===900&&cd.r===90000&&cd.lmb===2000,'Cổng Khép: rút Q/RMB 0,6 s, không xuống dưới bây giờ, không rút R/đòn thường')
R(K.cdrOnHit({type:'shield_strike'},{q:5000},1000)===null,'Cổng Khép: tướng khác không bị')
const al=[{id:'me',hp:100,maxHp:1000,d:0},{id:'a',hp:500,maxHp:1000,d:5},{id:'b',hp:300,maxHp:1000,d:12},{id:'c',hp:400,maxHp:1000,d:8},{id:'x',hp:0,maxHp:1000,d:3}]
R(K.mendTarget(al,'me',11)?.id==='c','Mạch Lành: đồng minh yếu nhất trong tầm, không phải bản thân, không phải người chết')
R(K.mendTarget([{id:'me',hp:1,maxHp:9,d:0}],'me',11)===null,'Mạch Lành: một mình thì không chữa')
