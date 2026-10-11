// Touch selector (world.config inputs.touch.active), doc14 B9: outside a match (no hero: lobby, pick, loading,
// results) no touch control stands at all; in a match only the engine's move stick does. The attack / skill /
// dodge / relic / recall buttons and the shop are the HUD's own (scripts/lib/hud-touch.js), drawn with their state.
export default (ctx) => (ctx.player.state?.hero ? 'default' : 'lobby')
