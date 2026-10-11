// Tooltip kỹ năng (DATA-03): tipVars() đọc số của một chiêu từ heroes.yml, tip() điền vào chuỗi tip.<hero>.<slot> (i18n t(): vi ở strings.yml, en ở strings-en.yml).
// Chưa nối vào HUD. rank: 1-based (q/rmb/e 1..5, r 1..3); bỏ trống = mọi rank, "60/95/130/165/200". Số theo locale (05 §4): 1,5 / 1.5.
import { HEROES } from './heroes.js'
import { t } from './i18n.js'

// Hằng số runtime trong scripts/hero.js chưa có trong heroes.yml: bản sao để tooltip hiện đúng; chuyển vào data thì xoá ở đây.
const RUNTIME = {
  moc_lam: { r: { allyR: 6 } },                                        // giveShield: alliesNear(..., 6)
  hoa_tuy: { rmb: { markDur: 4 } },                                    // markUntil = now + 4000
  van_dao: { e: { pushR: 4, pushSlow: 30, pushSlowDur: 1 } },          // selfCast knockback: units(…, 4), slow 0.3 / 1 s
  hao_nhat: { r: { gap: 0.6 } },                                       // lib/kitmech.js ECHO_GAP: nhịp hai sau 0,6 s
}

const num = (v, loc) => {
  const r = Math.round(v * 100) / 100
  return loc === 'en' ? String(r) : String(r).replace('.', ',')
}
const pct = (v) => Math.round(v * 1000) / 10
const ord = (n) => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th')

export function tipVars(heroId, slot, rank, locale = 'vi-VN') {
  const kit = HEROES.heroes?.[heroId]
  const sp = kit?.[slot]
  if (!sp) return {}
  const v = {}
  const put = (k, x, scale = 1) => {
    if (x == null) return
    const f = (y) => num(scale === 100 ? pct(y) : y, locale)
    v[k] = Array.isArray(x) ? (rank ? f(x[Math.min(x.length, rank) - 1]) : x.every((y) => y === x[0]) ? f(x[0]) : x.map(f).join('/')) : f(x)
  }
  const P = 100
  if (slot === 'passive') {
    put('n', sp.n); if (sp.n) v.nth = locale === 'en' ? ord(sp.n) : String(sp.n)
    const b = sp.bonusDamage
    if (b) { put('bonus', b.base); put('bonusAd', b.ad, P); put('bonusAp', b.ap, P); put('perLv', b.perLevel) }
    const e = (sp.effects ?? []).find((x) => x.slow != null)
    if (e) { put('slow', e.slow, P); put('slowDur', e.duration) }
    if (sp.perStack) { put('bleed', sp.perStack.base); put('bleedBad', sp.perStack.bonusAd, P) }
    put('sec', sp.seconds); put('stacks', sp.maxStacks); put('dur', sp.duration); put('burn', sp.maxHp, P); put('anti', sp.antiHeal, P)
  } else {
    put('cd', sp.cooldown); put('cost', sp.cost); put('range', sp.range); put('radius', sp.radius)
    put('delay', sp.delay); put('width', sp.width); put('windup', sp.windup); put('hits', sp.hits)
    put('arc', sp.arc); if (sp.fan) { put('count', sp.fan.count); put('spread', sp.fan.spread) }
    put('ap', slot === 'lmb' ? sp.ap : sp.damage?.ap, P)
    put('dash', sp.dash?.distance); put('pull', sp.pull); put('knock', sp.knockback); put('untarget', sp.untargetable)
    const d = sp.damage
    if (d) { put('dmg', d.base); put('ad', d.ad, P); put('bad', d.bonusAd, P); put('miss', d.missingHp, P); put('stk', d.perStack, P) }
    for (const e of sp.effects ?? []) {
      if (e.slow != null) { put('slow', e.slow, P); put('slowDur', e.duration) }
      put('root', e.root); put('stun', e.stun); put('charm', e.charm)
    }
    if (sp.shield) { put('shield', sp.shield.base); put('shHp', sp.shield.maxHp, P); put('shAp', sp.shield.ap, P); put('shDur', sp.shield.duration)
      const b = sp.shield.burst; if (b) { put('burst', b.base); put('burstAp', b.ap, P); put('burstR', b.radius) } }
    if (sp.heal) { put('heal', sp.heal.base); put('healAp', sp.heal.ap, P); put('share', sp.heal.damageShare, P) }
    if (sp.buff) { put('ms', sp.buff.moveSpeed, P); put('as', sp.buff.attackSpeed, P); put('buffDur', sp.buff.duration) }
    if (sp.mark) { put('mark', sp.mark.base); put('markAp', sp.mark.ap, P) }
  }
  for (const [k, x] of Object.entries(RUNTIME[heroId]?.[slot] ?? {})) put(k, x)
  return v
}

// Một dòng tooltip đầy đủ: câu hiệu ứng + dòng phụ hồi chiêu / năng lượng (lmb, passive không có dòng phụ).
export function tip(heroId, slot, rank, locale = 'vi-VN') {
  const v = tipVars(heroId, slot, rank, locale)
  const body = t(`tip.${heroId}.${slot}`, locale, v)
  if (slot === 'lmb' || slot === 'passive') return { body, meta: [] }
  const free = [].concat(HEROES.heroes[heroId][slot].cost ?? 0).every((c) => !c)
  return { body, meta: [t('tip.meta.cd', locale, v), free ? t('tip.meta.free', locale) : t('tip.meta.cost', locale, v)] }
}
