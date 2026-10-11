import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dir,'../..');
const target=path.resolve(root,'../artifacts/production-handoff');
const latest=JSON.parse(fs.readFileSync(path.join(root,'reports/production-2026-10-09/latest-source-verification.json'),'utf8')).latest;
if(!target.startsWith(path.resolve(root,'../artifacts')+path.sep))throw Error('Invalid handoff target');
const required=['docs/co-linh-than-chien/63-item-integration-handoff.md','docs/co-linh-than-chien/64-slice-authoritative-handoff.md','docs/co-linh-than-chien/65-vision-map-acceptance.md','reports/production-2026-10-09/production-closure.json'];
for(const f of required)if(!fs.existsSync(path.join(root,f)))throw Error(`Missing output ${f}`);
fs.mkdirSync(target,{recursive:true});
for(const rel of ['tools/balance','tools/audit','fixtures/production-source','docs/co-linh-than-chien','reports/production-2026-10-09']){
 fs.cpSync(path.join(root,rel),path.join(target,rel),{recursive:true,filter:p=>!p.endsWith('.zip')});
}
fs.writeFileSync(path.join(target,'README.md'),`# COLINH · Bộ sửa docs/data/tool09/10/2026

Source${latest}; receipt latest-source-verification.json. Các file snapshot là source offline có hash, không phải toàn game live.

Đọc docs63→64→65; xem reports/production-2026-10-09/index.html. Số candidate vẫn proposal, không tự kích hoạt runtime. Các source/UI/kit cũ bị thay phải đọc qua64 trước.

Yêu cầu Bun. Trong folder này chạy:

    bun tools/balance/production.mjs --portable --simulate

Không cần Git, tài khoản hay mạng. Snapshot đọc qua manifest SHA256. Exit1 hiện tại do4 ca diagnostic luật lịch sử còn mâu thuẫn source; xem rules-contract-test.log vàdoc64, không giấu bằng exit0. PASS_MODEL/DATA không thay client hoặc balance toàn kit.

Bản ZIP báo cáo cũ không chứa tool/catalog; bộ này đã có candidate JSON,tools,sourcefixtures,docs vàreports. Các runtime62ca vision/10ca item chưa chạy không được coi hoàn thành.
`);
function walk(dir,rel=''){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name),path.posix.join(rel,e.name)):[path.posix.join(rel,e.name)]);}
const manifest=Object.fromEntries(walk(target).filter(p=>p!=='handoff-manifest.json').map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(path.join(target,p))).digest('hex')]));
fs.writeFileSync(path.join(target,'handoff-manifest.json'),JSON.stringify({scope:'Offline handoff files, not release certificate',sourceCommit:latest,files:manifest},null,2));
console.log(JSON.stringify({target,files:Object.keys(manifest).length}));
