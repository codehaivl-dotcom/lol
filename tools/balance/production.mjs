import fs from 'node:fs';
import path from 'node:path';
import {spawnSync,execFileSync} from 'node:child_process';
import crypto from 'node:crypto';

const root=path.resolve(import.meta.dir,'../..');
process.chdir(root);
const out=path.join(root,'reports/production-2026-10-09');
fs.mkdirSync(out,{recursive:true});
const at=process.argv.indexOf('--commit');
const commit=at<0?'9351e23c6c6b4cc55a160dbf7aec268973b6394d':process.argv[at+1];
const portable=process.argv.includes('--portable');
const steps=[
  ['docs-helper',['tools/audit/production-docs.mjs','--test']],
  ['docs-inventory',['tools/audit/production-docs.mjs','--commit',commit]],
  ['map-data',['tools/audit/production-map.mjs','--commit',commit]],
  ['items-contract',['tools/balance/items/test.mjs','--commit',commit]],
  ['starter-screen',['tools/balance/items/startup-screen.mjs']],
  ['rules-contract',['tools/balance/production-rules/test.mjs',commit]],
  ['beacon-contract',['tools/balance/beacon/test.mjs']],
  ['vision-acceptance-data',['tools/balance/beacon/acceptance-check.mjs','--commit',commit]],
];
if(portable)steps.splice(1,1);
if(process.argv.includes('--simulate')) steps.push(
  ['items-simulation',['tools/balance/items/production.mjs','--commit',commit,'--n','300','--seed','1000']],
  ['beacon-simulation',['tools/balance/beacon/simulate.mjs','--n','300','--seed','1000','--out','reports/production-2026-10-09']],
  ...portable?[]:[['rules-simulation',['tools/balance/production-rules/simulate.mjs',commit]]],
);
const results=[];
for(const [name,args] of steps) {
  const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:120000,maxBuffer:8*1024*1024});
  const output=(result.stdout||'')+(result.stderr||'');
  fs.writeFileSync(path.join(out,`${name}-test.log`),output);
  const file=args[0];
  results.push({name,command:['bun',...args],status:result.status===0?'PASS_MODEL':'FAIL',exitCode:result.status,
    error:result.error?.message||null,toolSha256:fs.existsSync(file)?crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'):null,
    log:`${name}-test.log`});
  process.stdout.write(`${name}: ${results.at(-1).status}\n`);
}
const report={schemaVersion:1,sourceCommit:commit,scope:'Offline contracts/fixtures and document inventory. Not engine integration, client acceptance or whole-game balance.',results,
  qualification:'PASS_MODEL proves only the assertions in the linked test source. Read each simulator exclusion before using metrics.'};
fs.writeFileSync(path.join(out,'suite.json'),JSON.stringify(report,null,2));
const dashboard=spawnSync(process.execPath,['tools/audit/production-dashboard.mjs'],{cwd:root,encoding:'utf8',timeout:30000});
if(dashboard.status!==0) process.stderr.write(dashboard.stderr||'Dashboard build failed\n');
process.exitCode=results.some(r=>r.status==='FAIL')||dashboard.status!==0?1:0;
