// Bộ sưu tập Minh Ước: dev-only viewer. The ten creature models (~29 MB) no longer stand in places/main/cells/x0z1.scene;
// a dev opens them live (run_script persist:false) and closes them after: nothing here rides a player's arrival.
//   import { openGallery, closeGallery } from 'scripts/lib/gallery.js'; openGallery(ctx)  /  closeGallery(ctx)
import G from './data/gallery.yml'
export const GALLERY_IDS = Object.keys(G.rows ?? {})
export function openGallery(ctx) {
  for (const [id, row] of Object.entries(G.rows ?? {})) if (!ctx.place.objects[id]) ctx.spawn(id, { ...row, tags: ['gallery', 'dev'] })
  return GALLERY_IDS
}
export function closeGallery(ctx) { for (const id of GALLERY_IDS) if (ctx.place.objects[id]) delete ctx.place.objects[id]; return GALLERY_IDS }
