#!/usr/bin/env python3
"""Static import graph from entry points: static imports vs dynamic import(). Usage: python3 tools/importgraph.py [entry...]"""
import os,re,sys
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
ST=re.compile(r"^\s*import\s+(?:[^'\"]*?from\s+)?['\"]([^'\"]+)['\"]",re.M)
ST2=re.compile(r"^\s*export\s+[^'\"]*?from\s+['\"]([^'\"]+)['\"]",re.M)
DY=re.compile(r"import\(\s*['\"`]([^'\"`]+)['\"`]")
def res(base,spec):
  if spec.startswith('builtin/') or spec.startswith('engine/'): return None
  p=os.path.normpath(os.path.join(os.path.dirname(base),spec)) if spec.startswith('.') else os.path.normpath(spec)
  return p if os.path.exists(os.path.join(ROOT,p)) else None
def walk(entries):
  seen={};dyn=set();stack=list(entries)
  while stack:
    f=stack.pop()
    if f in seen: continue
    t=open(os.path.join(ROOT,f),encoding='utf-8').read()
    seen[f]=len(t.encode())
    if not f.endswith('.js'): continue
    for m in ST.findall(t)+ST2.findall(t):
      r=res(f,m)
      if r: stack.append(r)
    for m in DY.findall(t):
      r=res(f,m)
      if r: dyn.add(r)
  return seen,dyn
if __name__=='__main__':
  E=sys.argv[1:] or ['scripts/humanoid-locomotion.js','scripts/player.js','scripts/hero.js','scripts/camera.js','scripts/ui.js','scripts/arrival.js','scripts/lib/hud-controls.js','scripts/lighting.js','scripts/terrain.js','scripts/look-default.js','scripts/grass.js','scripts/grass-look.js','places/main/sim.js','ui/nametag.js']
  E=[e for e in E if os.path.exists(os.path.join(ROOT,e))]
  s,d=walk(E)
  tot=0
  for f,b in sorted(s.items(),key=lambda x:-x[1]): print(f'{b:>7}  {f}'); tot+=b
  print(f'STATIC TOTAL {tot} B, {len(s)} files'); print('dynamic import() targets:',sorted(d-set(s)))
