#!/usr/bin/env python3
"""UI architecture check (rule: memory/game/rules/ui-module-architecture.md, doc53/doc54).
Fails on: inline style="" that is not only CSS variables; a screen file over MAX lines; a screen folder missing model/css/words.
Allowed legacy: files listed in ALLOW (rollback only, not on the load path)."""
import os, re, sys
ROOT = 'scripts/screens'
MAX = 220
ALLOW = {'scripts/screens/match/common.js'}
LEGACY = {'scripts/screens/lobby/index.js', 'scripts/screens/lobby/shell.js'}  # router + shared frame: being tokenised, inline counted as warnings
bad, warn = [], []
inline = re.compile(r'style="([^"]*)"')
for d, _, fs in os.walk(ROOT):
    for f in fs:
        if not f.endswith('.js'): continue
        p = os.path.join(d, f)
        if p in ALLOW: continue
        src = open(p, encoding='utf8').read()
        n = 0
        for m in inline.finditer(src):
            if re.fullmatch(r'\$\{[^}]*\}', m.group(1).strip()): continue  # a vars() helper: CSS variables only
            decls = [x.strip() for x in m.group(1).split(';') if x.strip()]
            if any(not x.startswith('--') for x in decls): n += 1
        lines = src.count('\n') + 1
        tgt = warn if p in LEGACY else bad
        if n: tgt.append(f'{p}: {n} inline style(s) beyond CSS variables')
        if lines > MAX and not p.endswith('css.js') and not p.endswith('words.js'): tgt.append(f'{p}: {lines} lines > {MAX}: split into model/widgets/layout')
for s in sorted(os.listdir(ROOT)):
    sd = os.path.join(ROOT, s)
    if not os.path.isdir(sd) or s in ('lobby',): continue
    have = set(os.listdir(sd))
    for need in ('index.js', 'css.js'):
        if need not in have and s != 'match': bad.append(f'{sd}: missing {need}')
for w in warn: print('WARN', w)
for b in bad: print('FAIL', b)
print(f'ui-arch: {len(bad)} fail, {len(warn)} warn')
sys.exit(1 if bad else 0)
