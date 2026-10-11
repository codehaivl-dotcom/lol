import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

// Read-only corpus audit. A link/hash check never certifies design completeness.
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const git = (...args) => execFileSync('git', args, {encoding:'utf8', maxBuffer:64*1024*1024});
const root = path.resolve(import.meta.dir, '../..');
process.chdir(root);
export function links(text) {
  return [...text.matchAll(/\[[^\]]*\]\(([^\n)]+)\)/g)].map(m=>m[1].trim().replace(/^<|>$/g,''));
}
export function docNumber(p) { return /\/(\d+)-[^/]+\.md$/.exec(p)?.[1] ?? null; }
export function localTarget(p, href) {
  if (/^(https?:|mailto:|data:|app:|codex:|#)/i.test(href)) return null;
  return path.posix.normalize(path.posix.join(path.posix.dirname(p), decodeURIComponent(href.split('#')[0])));
}
export function duplicateNumbers(paths) {
  const groups = new Map();
  for(const p of paths) { const n=docNumber(p); if(n) groups.set(n,[...(groups.get(n)||[]),p]); }
  return [...groups].filter(([,v])=>v.length>1).map(([number,paths])=>({number,paths}));
}

function walk(dir, rel='') {
  if(!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name),path.posix.join(rel,e.name)):[path.posix.join(rel,e.name)]);
}
const arg = flag => {const i=process.argv.indexOf(flag); return i<0?null:process.argv[i+1];};
if(process.argv.includes('--test')) {
  assert.equal(links('[x](a.md#b) [y](https://example.org)')[0],'a.md#b');
  assert.equal(localTarget('docs/a.md','../data/b.json'),'data/b.json');
  assert.equal(localTarget('docs/a.md','https://example.org'),null);
  assert.equal(duplicateNumbers(['docs/54-a.md','docs/54-b.md']).length,1);
  assert.equal(duplicateNumbers(['docs/53-a.md','docs/54-b.md']).length,0);
  assert.equal(hash('a').length,64);
  process.stdout.write('6/6 pure audit-helper assertions PASS; not game tests.\n');
} else {
  const commit=git('rev-parse',arg('--commit')||'origin/main').trim();
  const out=path.resolve(root,arg('--out')||'reports/production-2026-10-09');
  const remotePaths=git('ls-tree','-r','--name-only',commit).trim().split('\n');
  const remoteSet=new Set(remotePaths);
  const localPaths=walk(path.join(root,'docs/co-linh-than-chien'),'docs/co-linh-than-chien').filter(p=>p.endsWith('.md'));
  const corpus=remotePaths.filter(p=>p.startsWith('docs/co-linh-than-chien/')&&p.endsWith('.md'));
  const documents=[];
  for(const p of new Set([...corpus,...localPaths])) {
    const remote=remoteSet.has(p)?git('show',`${commit}:${p}`):null;
    const local=fs.existsSync(path.join(root,p))?fs.readFileSync(path.join(root,p),'utf8'):null;
    documents.push({path:p,remoteSha256:remote===null?null:hash(remote),localSha256:local===null?null:hash(local),
      origin:remote===null?'LOCAL_ONLY':local===null?'REMOTE_ONLY':hash(remote)===hash(local)?'IDENTICAL':'DIFFERENT',
      title:(remote??local).split('\n').find(s=>/^# /.test(s))?.slice(2)||p,
      headings:[...(remote??local).matchAll(/^#{2,4} (.+)$/gm)].map(m=>m[1]),
      contentReview:'MACHINE_INVENTORY_ONLY',
      bytes:Buffer.byteLength(remote??local)});
  }
  const brokenLinks=[];
  for(const d of documents) {
    // Check remote and local separately; local proposals do not repair remote links.
    for(const side of ['remote','local']) {
      if(!d[side+'Sha256']) continue;
      const text=side==='remote'?git('show',`${commit}:${d.path}`):fs.readFileSync(path.join(root,d.path),'utf8');
      for(const href of links(text)) {
        let target; try {target=localTarget(d.path,href);} catch {brokenLinks.push({path:d.path,side,href,reason:'INVALID_URI'});continue;}
        if(!target) continue;
        const exists=side==='remote'?remoteSet.has(target):fs.existsSync(path.join(root,target));
        if(!exists) brokenLinks.push({path:d.path,side,href,target,reason:'MISSING_TARGET'});
      }
    }
  }
  const report={schemaVersion:1,commit,qualification:'Structural inventory only. Semantic reviews and simulation are separate evidence. No production or client PASS implied.',
    scope:'All Markdown in canonical docs/co-linh-than-chien at the pinned remote plus local versions. Other local folders require explicit separate coverage.',
    summary:{documents:documents.length,remote:corpus.length,local:localPaths.length,localOnly:documents.filter(d=>d.origin==='LOCAL_ONLY').length,
      different:documents.filter(d=>d.origin==='DIFFERENT').length,missingLinkTargets:brokenLinks.length},
    duplicateNumbers:duplicateNumbers(corpus.filter(p=>!p.slice('docs/co-linh-than-chien/'.length).includes('/'))),documents,brokenLinks};
  fs.mkdirSync(out,{recursive:true});
  fs.writeFileSync(path.join(out,'docs-inventory.json'),JSON.stringify(report,null,2));
  const csv=s=>`"${String(s??'').replaceAll('"','""')}"`;
  fs.writeFileSync(path.join(out,'docs-inventory.csv'),['path,origin,remote_sha256,local_sha256,content_review',...documents.map(d=>[d.path,d.origin,d.remoteSha256,d.localSha256,d.contentReview].map(csv).join(','))].join('\n'));
  fs.writeFileSync(path.join(out,'docs-link-findings.csv'),['path,side,href,target,reason',...brokenLinks.map(d=>[d.path,d.side,d.href,d.target,d.reason].map(csv).join(','))].join('\n'));
  process.stdout.write(JSON.stringify({commit,...report.summary,duplicateNumbers:report.duplicateNumbers})+'\n');
}
