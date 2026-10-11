import ECOY from "../../scripts/lib/data/economy.yml";
import YAML from "yaml"; import { readFileSync } from "fs";
const ECO = YAML.parse(readFileSync(new URL("../../", import.meta.url).pathname + "scripts/lib/data/economy.yml","utf8"));
let src = readFileSync(new URL("../../", import.meta.url).pathname + "scripts/lib/items.js","utf8").replace("import ECO from './data/economy.yml'","");
const m = {}; new Function("ECO","exp", src.replace(/export const (\w+)/g,"const $1 = exp.$1").replace(/export function (\w+)/g,"exp.$1 = $1; function $1"))(ECO,m);
const {quote, itemOf, sellPrice, ACTIVE, addItemStats} = m;
const ok=(c,msg)=>console.log(c?"PASS":"FAIL",msg);
ok(ACTIVE===ECOY.itemCatalog,"active = economy.yml itemCatalog ("+ACTIVE+")");
let q=quote([], "iron_plate", 500, "legacy-2"); ok(q.ok&&q.fee===450,"buy iron 450");
ok(!quote(["iron_plate","iron_plate"],"iron_plate",9999,"legacy-2").ok,"iron maxCopies 2");
ok(quote(["phial_of_dawn"],"bastion_stone",9999,"legacy-2").reason==="msg.oneRelic","one relic");
ok(quote(["a","b","c","d","e","f"].map(()=> "iron_plate"),"keeneye",9999,"legacy").reason==="msg.bagFull","bag full");
ok(sellPrice("oathguard_plate","legacy-2")===900,"sell oath 900");
// candidate combine: oathguard = iron_plate + mach_tinh + an_tinh + 200
const C="candidate-0.1.0";
q=quote(["iron_plate","mach_tinh","an_tinh"],"oathguard_plate",200,C); ok(q.ok&&q.fee===200&&q.bag.length===1,"combine oath fee 200 → "+JSON.stringify(q));
q=quote(["dong_van","dong_van","mach_tinh"],"oathguard_plate",9999,C); ok(q.fee===1600-480-250,"recursive credit dong_van×2 fee="+q.fee);
q=quote(["mach_tinh","mach_tinh","mach_tinh","mach_tinh","mach_tinh","an_tinh"],"oathguard_plate",9999,C); ok(q.ok,"full bag combine frees slots");
ok(!itemOf("mach_tinh","legacy-2"),"legacy-2 has no candidate ids");
// infinite money check: buy+sell never profits
let profit=0; for (const v of ["legacy-2",C]) for (const [id,it] of Object.entries(m.itemsOf(v))) { const f=quote([], id, 1e9, v).fee; if (sellPrice(id,v) > f) profit++; } ok(profit===0,"no buy→sell profit");
const st=addItemStats({ad:0,hp:0,armor:0,mr:0,hpRegen:0,moveSpeed:0,attackSpeed:1},["quickstring","quickstring"],"legacy-2"); ok(Math.abs(st.attackSpeed-1.2544)<1e-9,"AS multiplicative "+st.attackSpeed);

// doc 67 bug 09/10: túi chưa stamp mua bộ mới không được lật về legacy
{ const { catOf } = m;
  ok(catOf({items:["qua_mach"]})===C,"unstamped candidate bag stays candidate");
  ok(catOf({items:["phial_of_dawn","bastion_stone"].filter(i=>itemOf(i,"legacy-2")&&!itemOf(i,C))}).length>0,"unstamped legacy-only bag resolves");
  ok(catOf({items:[], itemCat:"nope"})===C,"unknown stamp falls back");
  // đường ghép creator yêu cầu: Giáp Thiết + Mảnh Mạch + Ấn Tĩnh → Giáp Minh Ước
  const I=(id)=>itemOf(id,C); let bag=[], gold=5000, spent=0;
  for (const id of ["iron_plate","mach_tinh","an_tinh"]) { const q=quote(bag,id,gold,C); ok(q.ok,"buy "+id+" "+q.fee); bag=q.bag; gold-=q.fee; spent+=q.fee; }
  const q=quote(bag,"oathguard_plate",gold,C); ok(q.ok && q.fee===I("oathguard_plate").cost-spent,"craft fee = 1600 − components ("+q.fee+")");
  bag=q.bag; gold-=q.fee; ok(bag.length===1&&bag[0]==="oathguard_plate","components consumed, Giáp Minh Ước in bag");
  ok(5000-gold===I("oathguard_plate").cost,"total spend = full price, no double charge");
  ok(sellPrice("oathguard_plate",C)===Math.round(I("oathguard_plate").cost*0.6),"sell 60% = "+sellPrice("oathguard_plate",C));
  ok(quote(bag,"oathguard_plate",9999,C).reason==="msg.maxCopies","second copy refused");
  ok(quote([],"oathguard_plate",10,C).reason==="msg.noGold","no gold refused");
  const full=["mach_tinh","mach_tinh","mach_tinh","mach_tinh","dong_van","ngoc_am"]; ok(quote(full,"nanh_mach",9999,C).reason==="msg.bagFull","full bag refused");
}
