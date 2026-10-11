// The hero registry (doc 44 §10 C3): every per-hero table behind one door. A new hero = rows here and in the
// data files it names; no screen, map or match script imports a hero table directly.
//   HEROES  kit + stats (data/heroes.yml)   BODY  match/lobby model + height   GESTURE  lobby greeting clip
//   heroOf(id) → { id, kit, body, gesture, weapons, clips, sfx }
import KITS from './data/heroes.yml'
import WEAPONS from './data/weapons.yml'
import CLIPS from './data/skill-clips.yml'
import SFX from './data/hero-sfx.yml'
export const HEROES = KITS
export const BODY = {
  moc_lam: { model: '/cdn/value.63a20a06624ea21ba8a8f669b5d37d53d05b5de54dcf452c3f50eaf5b4642dd7.glb', h: 2.15 }, // 2026-10-08 lukasai: moc-lam-2 (10b7aa…) "quá xấu", restored the original body
  kha_tan: { model: '/cdn/value.71db47d4bbe073357e083425a02a6e2963bef881532af695221769680db2e2f0.glb', h: 2.2 },
  mi_dang: { model: '/cdn/value.f5327627a02bc8d53429f24aa35b1902e698d26e55a1f3e1ccf724c3cfca696a.glb', h: 1.8 },
  hoa_tuy: { model: '/cdn/value.e24d61119b31c06db602d2bd226194b318e95c4cb41fb7b61a6181b275d93936.glb', h: 2.0 },
  nham_vu: { model: '/cdn/value.308ae32e94f8584b25d2bbbf1793e64880d05ba6190457786405f139b63ab9cc.glb', h: 1.75 },
  van_dao: { model: '/cdn/value.6078ca61e548cf7632c1872469c0bb0a5c7f4dc548cbf2c9a625c7c94fb437f3.glb', h: 1.85 },
  hao_nhat: { model: '/cdn/value.f0abe6cfd59b92c890dbbad4b5a301654006932c8fe666f87553fdb228a098cc.png.glb', h: 2.1 }, // H1 2026-10-10: image→3D from the body sheet, BALANCE_PROVISIONAL
  huong_mai: { model: '/cdn/value.ac094134cbe745e415644e0f17787b69c155793caa4f1fdf9bb2379872fc4a91.png.glb', h: 1.75 }, // H1b 2026-10-10: image→3D from the body sheet v2, BALANCE_PROVISIONAL
  bach_dien: { model: '/cdn/value.53dc1ac74c34b7d3c1782d574a1dfcd2ff028ff00ab89d265d0d4b816f2736fd.png.glb', h: 1.8 }, // H1c 2026-10-10: Vũ Công Gương Đồng (doc 75), image→3D; R1 2026-10-11 kích hoạt (no kit in heroes.yml)
  ngu_dang: { model: '/cdn/value.e15e378341a3f1ebf6fdeb0d6cbf084185184cf5d2df936e1f4da3f57cd72f67.png.glb', h: 2.3 }, // 2026-10-11: Gấu Ngựa Đeo Chuông (doc 85 #4, 025), image→3D from the body sheet
  mac_lien: { model: '/cdn/value.9b6252517ba70e184a5f30f0e5b97912665b6b7017c150f6ec5a7e74536674d7.png.glb', h: 1.75 }, // R2 2026-10-11: Người Sơn Mài (doc 85 #10, 052), image→3D from the body sheet
  cot_ben: { model: '/cdn/value.8efc621a18e5f10d8de976aed82201c7c13b2e3a41857598f768b060ad768ea7.png.glb', h: 2.2 }, // 2026-10-11: Người Bùn Ruộng (doc 85 #5, 008), image→3D from the body sheet
}
export const GESTURE = {
  moc_lam: 'cdn/clip-salute.glb', kha_tan: 'cdn/clip-angry.glb', mi_dang: 'cdn/clip-bow.glb',
  hoa_tuy: 'cdn/clip-cast.glb', nham_vu: 'cdn/clip-point.glb', van_dao: 'cdn/clip-cast.glb', hao_nhat: 'cdn/clip-salute.glb', huong_mai: 'cdn/clip-cast.glb', bach_dien: 'cdn/clip-bow.glb', ngu_dang: 'cdn/clip-salute.glb', mac_lien: 'cdn/clip-cast.glb', cot_ben: 'cdn/clip-angry.glb',
}
export const HERO_IDS = Object.keys(KITS.heroes ?? {})
export function heroOf(id) {
  if (!KITS.heroes?.[id]) return null
  return { id, kit: KITS.heroes[id], body: BODY[id] ?? null, gesture: GESTURE[id] ?? null, weapons: WEAPONS.heroes?.[id] ?? [], clips: CLIPS[id] ?? null, sfx: SFX.heroes?.[id] ?? null }
}
