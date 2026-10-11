# Generates the shrunk Mạch Giữa block of map.yml (doc14 §M). Structures by reach; brushes/alcoves in the lane's own frame.
import math
R2 = math.sqrt(2)
def xz(u, v): return ((v - u) / R2, (u + v) / R2)
def uv(x, z): return ((-x + z) / R2, (x + z) / R2)
T1u, T2u, NXu, FTu, BCu = 25, 58, 77, 93, 87.7
# lane in (u, v): base mouth → T2 → jog that keeps T1 6 m off the column → through the bridge
LANE_UV = [(70.3, 0), (66.5, 0), (58, 0), (32.8, -6), (20.3, -6)]
LANE_UV = LANE_UV + [(-u, -v) for u, v in reversed(LANE_UV)]
lane = [xz(u, v) for u, v in LANE_UV]
def lane_v(u):  # lane centre's v at this u (blue half piecewise)
    pts = sorted(LANE_UV)
    for (u0, v0), (u1, v1) in zip(pts, pts[1:]):
        if u0 <= u <= u1: return v0 + (v1 - v0) * (u - u0) / (u1 - u0)
    return 0
def side(u, off):  # a point `off` metres across from the lane centre at u (v axis)
    return xz(u, lane_v(u) + off)
r = lambda p: [round(p[0], 1), round(p[1], 1)]
mir = lambda p: [-p[0], -p[1]]
B = {}
def pair(name, p, **kw):
    B[name + '-blue'] = dict(at=r(p), **kw); B[name + '-red'] = dict(at=mir(r(p)), **kw)
# river: bank side of the 6.5 m half-width, one each side of the column
pair('river-top', side(11.5, -8), rx=2.2, rz=3.6, rot=45)
pair('river-bot', side(11.5, 8), rx=2.2, rz=3.6, rot=45)
# T1–T2 gap (u 39–44 is outside both reaches): flank brushes
pair('flank-top', side(41.5, -8), rx=2.0, rz=3.6, rot=45)
pair('flank-bot', side(41.5, 8), rx=2.0, rz=3.6, rot=45)
ALC = [r(side(16, -16)), r(side(16, 16))]
pair('alcove-top', side(16, -15.5), rx=2.6, rz=3.2, rot=45)
pair('alcove-bot', side(16, 15.5), rx=2.6, rz=3.2, rot=45)
seed = 11
for k in ['river-top-blue','river-bot-blue','river-top-red','river-bot-red','flank-top-blue','flank-bot-blue','flank-top-red','flank-bot-red','alcove-top-blue','alcove-bot-blue','alcove-top-red','alcove-bot-red']:
    B[k]['seed'] = seed; seed += 1
ax = lambda u: r(xz(u, 0))
cu = (lane[4][0] - lane[5][0], lane[4][1] - lane[5][1]); n = math.hypot(*cu)
yaw = round(math.degrees(math.atan2(cu[0] / n, cu[1] / n)), 1)
out = []
P = out.append
P("# Cửu Mạch Chiến Trường, Mạch Giữa — GREYBOX 50% (doc14 §M, 2026-10-08). Metres. First test sample, NOT balance-accepted.")
P("# Structures are placed by reach (tower 14, nexus beam 14), not scaled: T1–T1 50 m (22 m no-fire), T1–T2 33 m (5 m gap).")
P("extent: 88           # minimap / map-click half-size (world ±extent)")
P("lane: [" + ",".join(f"[{p[0]},{p[1]}]" for p in map(r, lane)) + "]")
P("laneWidth: 10")
P("corridorHalf: 12      # flat walkable half-width each side of the lane centre (road 5 + bank 7)")
P("cliffRise: 5          # metres over which the corridor wall climbs")
P("cliffHeight: 7        # low enough that the 56° camera never sees over-the-shoulder wall")
P("cliffNoise: { ridged: 3.5, detail: 1.2, wobble: 2.5, scale: 0.5 }   # amplitudes (m) and wavelength factor of the wall noise")
P("baseRadius: 20")
P(f"bases: {{ blue: {ax(BCu)}, red: {mir(ax(BCu))} }}")
P(f"fountains: {{ blue: {ax(FTu)}, red: {mir(ax(FTu))} }}")
P(f"nexus: {{ blue: {ax(NXu)}, red: {mir(ax(NXu))} }}")
P("riverHalf: 6.5")
P("riverEdge: [2, 3]     # full depth until riverHalf-2, dry ground from riverHalf+3")
P("riverFloor: -3.2")
P("waterLevel: -2.0")
P("# hốc nấp: pockets cut into the canyon wall either side of the river, each holding one brush")
P("alcoves:")
for a in ALC + [mir(a) for a in ALC]: P(f"  - {{ at: {a}, r: 6 }}")
P("# brushes: centre, radii, rotation (deg). Standing inside hides you from enemies outside. Point-symmetric pairs.")
P("brushes:")
for k, b in B.items(): P(f"  {k}: {{ at: {b['at']}, rx: {b['rx']}, rz: {b['rz']}, rot: {b['rot']}, seed: {b['seed']} }}")
P("towers:")
P(f"  tower-blue-t1: {{ team: blue, tier: 1, at: {ax(T1u)}, hp: 2800, muzzle: 8.4 }}")
P(f"  tower-blue-t2: {{ team: blue, tier: 2, at: {ax(T2u)}, hp: 5400, muzzle: 10 }}")
P(f"  tower-red-t1: {{ team: red, tier: 1, at: {mir(ax(T1u))}, hp: 2800, muzzle: 8.4 }}")
P(f"  tower-red-t2: {{ team: red, tier: 2, at: {mir(ax(T2u))}, hp: 5400, muzzle: 10 }}")
P(f"bridgeYaw: {yaw}")
P("bridgeScale: { x: 0.38, y: 0.7, z: 0.38 }")
print("\n".join(out))
