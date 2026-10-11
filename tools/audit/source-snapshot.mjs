import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
export function readPinned(commit,file){
  if(!/^[0-9a-f]{40}$/.test(commit)||!/^scripts\/[a-zA-Z0-9_./-]+$/.test(file)||file.split('/').includes('..'))throw Error('Invalid snapshot reference');
  const base=path.join(root,'fixtures/production-source',commit),manifestFile=path.join(base,'manifest.json');
  if(fs.existsSync(manifestFile)){
    const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
    if(manifest.commit!==commit||!manifest.files[file])throw Error(`Snapshot file not registered: ${file}`);
    const rawPath=path.join(base,file);
    const storedPath=fs.existsSync(rawPath)?rawPath:rawPath+'.txt';
    const value=fs.readFileSync(storedPath,'utf8');
    if(crypto.createHash('sha256').update(value).digest('hex')!==manifest.files[file])throw Error(`Snapshot hash mismatch: ${file}`);
    return value;
  }
  if(process.env.COLINH_SNAPSHOT_ONLY==='1')throw Error(`Bundled snapshot unavailable: ${commit}`);
  return execFileSync('git',['show',`${commit}:${file}`],{cwd:root,encoding:'utf8'});
}
