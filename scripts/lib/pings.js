// Team pings (presentation/communication only): the pinging player's own state carries the last ping,
// every teammate's HUD reads it; a marker effect and a chime play for that team alone.
export const PING = {
  gather: { key: 'G', col: '#5dff9a', hue: 150, sound: '/cdn/moodboard-painterly-fantasy/sfx-ping-gather.mp3' },
  attack: { key: 'V', col: '#ff5a4a', hue: 25, sound: '/cdn/moodboard-painterly-fantasy/sfx-ping-attack.mp3' },
  danger: { key: 'X', col: '#ffc23a', hue: 80, sound: '/cdn/moodboard-painterly-fantasy/sfx-ping-danger.mp3' },
  retreat: { key: 'Z', col: '#4fd8ff', hue: 220, sound: '/cdn/moodboard-painterly-fantasy/sfx-ping-retreat.mp3' },
}
export const PING_KINDS = Object.keys(PING)
const MARK = `fx
pop ring burst=1 life=1.6 size=2.4 col=%col|<1,1,1> a=1>.6:.8>0 sz=$size*(.3>1) r=sprite(soft-disc,add)
pop pulse burst=3 life=1.2 size=1.6 col=%col|<1,1,1> a=.9>0 sz=$size*(.2>1.3) r=sprite(soft-disc,add)
pop beam burst=1 life=1.8 pos=<0,1.6,0> size=.35 col=%col|<1,1,1> a=0>.1:1>.7:1>0 sz=$size r=sprite(soft-disc,add,velocity,3.4)
pop motes rate=26 win=0;1 on=disc(.6) life=.6..1 v=up(1.5..3) size=.05..0.1 col=%col|<1,1,1> a=1>0 r=sprite(ember,add)
pop glow burst=1 life=1.6 r=light(%col|<1,1,1>,6,5)`
const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255] }
// called from the pinging hero's onInput; at = a ground point
export function sendPing(ctx, kind, at) {
  const s = ctx.self.state, now = ctx.now(), P = PING[kind]
  if (!P || !s.team || !at) return
  const recent = (s.pingTimes ?? []).filter((t) => now - t < 5000)
  if (recent.length >= 3) return // three a 5 s window, as the big MOBAs cap spam
  s.pingTimes = [...recent, now]
  s.ping = { kind, x: +at.x.toFixed(1), z: +at.z.toFixed(1), at: now }
  const [r, g, b] = hex(P.col)
  const pos = { x: at.x, y: at.y ?? ctx.self.feetPosition.y, z: at.z }
  for (const p of ctx.place.players) {
    if (p.state?.team !== s.team) continue
    ctx.emit('fx', { position: pos, script: MARK, params: { col: [r, g, b] } }, { audience: { player: p.id } })
    ctx.emit('playSound', { clip: P.sound, volume: 0.55 }, { audience: { player: p.id } })
  }
}
