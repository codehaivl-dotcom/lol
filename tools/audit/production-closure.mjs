import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dir,'../..');
const dir=path.join(root,'reports/production-2026-10-09');
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8').replace(/^\uFEFF/,''));
const register=read('full-gap-register.json');
const latest=read('latest-source-verification.json');
const assign={
 'ITEM-01':['MEASUREMENT_EXPANDED','item-starter-closure.json','Whole-kit balance remains open'],
 'ITEM-02':['SPEC_REPAIRED','item-starter-closure.contract.json','Catalog activation/runtime integration not implemented'],
 'ITEM-03':['SPEC_REPAIRED','item-starter-closure.contract.json','Actual stat/effect consumers require integration'],
 'ITEM-04':['SPEC_REPAIRED','item-starter-closure.contract.json','Proposed itemHP policy needs runtime parity'],
 'ITEM-05':['OPEN_BALANCE','item-starter-closure.json','Stationary AA and static EHP cannot certify full kits/teams'],
 'ITEM-06':['OPEN_ASSET','items-audit.md','No generated registered item icons or client tooltip evidence'],
 'RULE-01':['DOC_REPAIRED_WITH_OPEN_DECISION','slice-closure.json','Solo/all-offline contract remains conflicting; PvP decision receipt recovered'],
 'RULE-02':['DOC_REPAIRED_WITH_OPEN_DECISION','slice-closure.json','Source practice bot vs previous approved label unresolved'],
 'RULE-03':['SCOPE_REPAIRED','slice-closure.json','Future5v5 uniqueness does not force newheroes for Slice'],
 'RULE-04':['DOC_REPAIRED','slice-closure.json','Acceptance current source vs historical explicitly mapped'],
 'RULE-05':['OPEN_ENGINE','slice-closure.json','Extracted source cases do not certify actual client reward/aggro'],
 'RULE-06':['DOC_REPAIRED','slice-closure.json','Observed float/flatpen contract scoped; full consumer parity not engine tested'],
 'RULE-07':['EXPECTED_TRACE_REPAIRED','slice-closure.json','Expected308 documented; source comment still unchanged'],
 'BEACON-01':['SPEC_REPAIRED','vision-closure.json','No integrated client prototype'],
 'BEACON-02':['EXPERIMENT_DEFINED','vision-closure.json','No real contest/comeback measurement'],
 'BEACON-03':['EXPERIMENT_DEFINED','vision-closure.json','No measured support economy or selected final sharedlock'],
 'MAP-01':['ACCEPTANCE_DATA_READY','vision-closure.json','Nav/collision/LOS actualengine open'],
 'HERO-01':['DOC_REPAIRED','slice-closure.json','Melee1.6 current instruction; no fresh playback capture'],
 'HERO-02':['OPEN_ENGINE','content-production-audit.md','Sixhero fullphase runtime acceptance incomplete'],
 'HERO-03':['ROADMAP','content-production-audit.md','21hero batches outside current Slice release'],
 'CONTENT-01':['DOC_REPAIRED','slice-closure.json','Current override precedence and implemented paths repaired'],
 'CONTENT-02':['VERSION_SCOPE_REPAIRED','latest-source-verification.json','48 differences do not mean48errors; old files not destructively merged'],
 'UI-01':['SPEC_REPAIRED','slice-closure.json','48CSSpx current requirement; real multitouch/device acceptance open'],
 'ASSET-01':['ROADMAP','content-production-audit.md','Historical proof not active assetreceipt'],
 'BOSS-01':['ROADMAP','content-production-audit.md','Boss/jungle future5v5 outside Slice'],
 'SYSTEM-01':['OPEN_ENGINE','suite.json','Pure guards are not adversarial runtime validation'],
 'LORE-01':['ROADMAP','content-production-audit.md','Intro rights/master/playback outside current Slice'],
};
const gaps=register.gaps.map(g=>{
 const [status,file,remaining]=assign[g.id]??['UNASSIGNED',null,'Missing owner/output'];
 const p=file&&path.join(dir,file),exists=p&&fs.existsSync(p);
 return {...g,status:exists?status:'MISSING_CLOSURE_ARTIFACT',owner:'Codex council',artifact:file,artifactSha256:exists?crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'):null,remaining,liveStatus:'NOT_VERIFIED_BY_THIS_OFFLINE_RUN'};
});
const report={latest:latest.latest,scope:'Documentation and offline tool repairs; not live release readiness',all27Accounted:gaps.length===27&&gaps.every(g=>g.status!=='MISSING_CLOSURE_ARTIFACT'),gaps};
fs.writeFileSync(path.join(dir,'production-closure.json'),JSON.stringify(report,null,2));
fs.writeFileSync(path.join(dir,'production-closure.md'),'# Kết quả sửa27GAP\n\nNguồn mới nhất: '+report.latest+'. Hội đồng Codex sở hữu sửa docs/data/tool. Không chuyển trạng thái runtime sang PASS bằng giấy.\n\n|ID|Kết quả sửa|Phần chưa được chứng nhận|\n|---|---|---|\n'+gaps.map(g=>`|${g.id}|${g.status}|${g.remaining}|`).join('\n')+'\n');
console.log(JSON.stringify({count:gaps.length,artifactsComplete:report.all27Accounted}));
if(!report.all27Accounted)process.exitCode=1;
