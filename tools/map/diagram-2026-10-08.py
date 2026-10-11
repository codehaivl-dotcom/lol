# Draws docs/co-linh-than-chien/assets/mach-giua-greybox-50-2026-10-08.png from map.yml (doc14 §M)
import yaml, math
from PIL import Image, ImageDraw, ImageFont
M = yaml.safe_load(open('scripts/lib/data/map.yml'))
E = M['extent']; S = 1100; k = S / (2 * E); R2 = math.sqrt(2)
P = lambda x, z: ((x + E) * k, (z + E) * k)
im = Image.new('RGB', (S, S + 170), (28, 26, 30)); d = ImageDraw.Draw(im, 'RGBA')
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18); Fb = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 22)
G = (66, 104, 58)
d.rectangle([0, 0, S, S], fill=(74, 58, 46))
lane = [P(*p) for p in M['lane']]
def disc(c, r, **kw): d.ellipse([c[0]-r, c[1]-r, c[0]+r, c[1]+r], **kw)
d.line(lane, fill=G, width=int(2 * M['corridorHalf'] * k))
for p in lane: disc(p, M['corridorHalf'] * k, fill=G)
for a in M['alcoves']: disc(P(*a['at']), a['r'] * k, fill=G)
for t in ('blue', 'red'): disc(P(*M['bases'][t]), M['baseRadius'] * k, fill=G)
rw = M['riverHalf'] * k * R2
d.polygon([(0, 0), (rw, 0), (S, S - rw), (S, S), (S - rw, S), (0, rw)], fill=(60, 110, 160))
d.line(lane, fill=(196, 170, 120), width=int(M['laneWidth'] * k))
for p in lane: disc(p, M['laneWidth'] / 2 * k, fill=(196, 170, 120))
a, b = M['lane'][4], M['lane'][5]; dx, dz = b[0] - a[0], b[1] - a[1]; n = math.hypot(dx, dz); dx, dz = dx / n, dz / n
hw, hl = 17 * M['bridgeScale']['x'], 39 * M['bridgeScale']['z']
corn = [(dx * l - dz * w, dz * l + dx * w) for l, w in [(-hl, -hw), (hl, -hw), (hl, hw), (-hl, hw)]]
d.polygon([P(*c) for c in corn], fill=(225, 200, 150), outline=(80, 60, 40))
for bsh in M['brushes'].values(): disc(P(*bsh['at']), (bsh['rx'] + bsh['rz']) / 2 * k, fill=(40, 150, 70, 230))
COL = {'blue': (80, 200, 255), 'red': (255, 90, 100)}
for id, t in M['towers'].items():
    c = P(*t['at']); col = COL[t['team']]
    disc(c, 14 * k, fill=col + (40,), outline=col + (255,), width=3)
    d.rectangle([c[0]-6, c[1]-6, c[0]+6, c[1]+6], fill=col); d.text((c[0]+9, c[1]-26), f"T{t['tier']}", fill='white', font=Fb)
for t, at in M['nexus'].items():
    c = P(*at); col = COL[t]; disc(c, 14 * k, outline=col + (255,), width=2); disc(c, 9, fill=col)
    d.text((c[0] - 120, c[1] - 10) if t == 'red' else (c[0] + 12, c[1] - 10), 'Tâm Mạch', fill='white', font=F)
for t, at in M['fountains'].items():
    c = P(*at); disc(c, 13 * k, outline=(255, 255, 255, 160), width=2); d.text((c[0] - 20, c[1] - 10), 'Suối', fill='white', font=F)
ax = lambda u, v=0: P((v - u) / R2, (u + v) / R2)
def dim(u0, u1, v, txt, col):
    p, q = ax(u0, v), ax(u1, v); d.line([p, q], fill=col, width=3)
    for e in (p, q): disc(e, 4, fill=col)
    d.text(((p[0] + q[0]) / 2 + 10, (p[1] + q[1]) / 2), txt, fill=col, font=Fb)
dim(-11, 11, 22, 'vùng không trụ 22 m', (255, 230, 120))
dim(39, 44, 20, 'khe 5 m', (255, 170, 60))
dim(-25, 25, -30, 'T1–T1 50 m', (200, 220, 255))
dim(25, 58, 26, 'T1–T2 33 m', (200, 220, 255))
d.text((14, 12), 'Mạch Giữa — GREYBOX 50% (2026-10-08) · vòng màu = tầm 14 m · vòng trắng = suối 13 m', fill='white', font=Fb)
y = S + 14
for line in ['T1 u=25 · T2 u=58 · Tâm Mạch u=77 · Suối u=93 · căn cứ r=20 (u = mét dọc trục chéo từ tâm cầu)',
             'Đường 10 m · bờ chiến ±12 m · vách cao 7 m · sông nửa rộng 6,5 m · cầu 13×30 m · 12 bụi · 4 hốc r=6 · biên ±88 m',
             'Cũ: T1–T1 89 m (61 m không trụ), T1–T2 35,6 m (7,6 m khe), Tâm Mạch u=130,7, biên ±130',
             'Giữ: tầm 14 m, hitbox/kích thước tướng, kit, speed, damage, camera. MẪU THỬ — chưa phải số balance.',
             'Trong trận client / mobile thật / bot đi đường / thời lượng trận: NOT RUN']:
    d.text((14, y), line, fill=(230, 230, 230), font=F); y += 30
im.save('docs/co-linh-than-chien/assets/mach-giua-greybox-50-2026-10-08.png')
