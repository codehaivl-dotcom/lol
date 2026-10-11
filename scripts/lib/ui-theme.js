// Cổ Linh Thần Chiến: the one UI language, lobby and match alike.
// Night-navy glass-free plates, a hairline gold edge with an inner second line, chamfered corners, a cyan crystal accent
// for what is live/selected. Đông Sơn is an accent only: a drum-star glyph on headers, a bird band under titles.
// 2026-10-09 @lukasai: new logo, one per language (cut from black, tagline trimmed for the nav)
export const LOGOS = { 'vi-VN': '/cdn/value.46cf85a24457f36e7c011c26cd0dad1f32e6c702b8d076ec4268d81d983eb139.webp', en: '/cdn/value.ebf1972623bdd71f9519c1f7c64586e4c90aef8a896027c4ff8ec540e406a523.webp' }
export const logoOf = (loc) => LOGOS[loc] ?? LOGOS['vi-VN']
const CH = (n) => `polygon(${n}px 0,calc(100% - ${n}px) 0,100% ${n}px,100% calc(100% - ${n}px),calc(100% - ${n}px) 100%,${n}px 100%,0 calc(100% - ${n}px),0 ${n}px)`
export const THEME = `<style>
@font-face{font-family:'CLTC';src:url('/cdn/value.d45b0dd821f8c7f3397ff355cb0083ca4ea2449f9bd6a71db02d295654e2d14b.woff2') format('woff2');font-weight:100 900;font-display:swap}
#hud{font-family:'CLTC','Be Vietnam Pro','Noto Sans','Segoe UI',Roboto,Arial,sans-serif;font-weight:600;font-size:16px;
 --ink:oklch(.13 .03 255);--navy:oklch(.17 .04 255);--navy2:oklch(.22 .05 255);--gold:oklch(.82 .11 85);--gold2:oklch(.66 .1 75);--goldd:oklch(.5 .07 75);
 --cyan:oklch(.84 .12 200);--paper:oklch(.94 .02 90);--mute:oklch(.75 .02 250);--blue:oklch(.78 .13 225);--red:oklch(.68 .19 22);
 color:var(--paper);text-shadow:0 1px 2px #000c}
.h1{font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.h1:before{content:'✦ ';color:var(--cyan)}
.plate{position:relative;background:linear-gradient(180deg,oklch(.2 .045 255 / .94),oklch(.13 .035 255 / .96));clip-path:${CH(8)};padding:10px 14px;
 box-shadow:inset 0 0 0 1px var(--gold2),inset 0 0 0 3px oklch(.13 .03 255 / .9),inset 0 0 0 4px oklch(.82 .11 85 / .18)}
.plate.lite{background:linear-gradient(180deg,oklch(.17 .04 255 / .78),oklch(.12 .03 255 / .85))}
.rule{height:1px;margin:10px 0;background:linear-gradient(90deg,transparent,var(--gold2),transparent)}
.bar{position:relative;height:14px;background:oklch(.1 .02 255);box-shadow:inset 0 0 0 1px var(--goldd),0 0 0 1px #000}
.bar>i{position:absolute;inset:1px auto 1px 1px;display:block;transition:width .25s}
.bar>i.hp{background:linear-gradient(180deg,oklch(.82 .17 145),oklch(.6 .15 145))}
.bar>i.mp{background:linear-gradient(180deg,oklch(.78 .13 235),oklch(.55 .14 250))}
.bar>i.en{background:linear-gradient(180deg,oklch(.9 .15 95),oklch(.72 .14 85))}
.bar>b{position:absolute;inset:0;text-align:center;font-size:11px;line-height:14px;font-weight:600}
.slot{position:relative;width:62px;height:62px;clip-path:${CH(6)};background:radial-gradient(circle at 50% 30%,oklch(.4 .08 var(--h)),oklch(.16 .04 255));
 box-shadow:inset 0 0 0 1px var(--gold),inset 0 0 0 3px oklch(.13 .03 255),inset 0 0 0 4px oklch(.82 .11 85 / .25);display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--paper)}
.slot.ready{box-shadow:inset 0 0 0 1px var(--cyan),inset 0 0 0 3px oklch(.13 .03 255),inset 0 0 14px oklch(.84 .12 200 / .45)}
.slot .cd{position:absolute;inset:0;background:#000b;display:flex;align-items:center;justify-content:center;font-size:22px;color:var(--paper)}
.slot .key{position:absolute;right:5px;bottom:2px;font-size:11px;color:var(--gold)}
.slot .nm{position:absolute;bottom:-18px;left:-12px;right:-12px;text-align:center;font-size:11px;white-space:nowrap;color:var(--mute)}
.btn{pointer-events:auto;cursor:pointer;color:var(--gold);background:linear-gradient(180deg,oklch(.24 .05 255),oklch(.16 .04 255));clip-path:${CH(5)};padding:7px 14px;letter-spacing:.06em;
 box-shadow:inset 0 0 0 1px var(--gold2);transition:filter .15s}
.btn:hover{filter:brightness(1.3);box-shadow:inset 0 0 0 1px var(--gold),inset 0 0 12px oklch(.82 .11 85 / .3)}
.big{pointer-events:auto;cursor:pointer;font-size:22px;letter-spacing:.14em;text-transform:uppercase;padding:14px 46px;color:oklch(.97 .02 200);
 background:linear-gradient(180deg,oklch(.42 .1 215),oklch(.26 .08 235));clip-path:${CH(10)};
 box-shadow:inset 0 0 0 2px var(--gold),inset 0 0 0 4px oklch(.13 .03 255),inset 0 0 22px oklch(.84 .12 200 / .55);text-shadow:0 0 10px oklch(.84 .12 200 / .8);transition:filter .15s}
.big:hover{filter:brightness(1.2)}.big.dim{filter:grayscale(1);opacity:.5;cursor:default}
.chip{pointer-events:auto;cursor:pointer;padding:4px 12px;font-size:13px;letter-spacing:.08em;color:var(--mute);clip-path:${CH(4)};background:oklch(.17 .04 255 / .9);box-shadow:inset 0 0 0 1px var(--goldd)}
.chip.on{color:var(--ink);background:linear-gradient(180deg,var(--gold),var(--gold2));text-shadow:none}
.dim{opacity:.45}
.av{width:44px;height:44px;flex:none;background:var(--navy2) center/cover;clip-path:${CH(5)};box-shadow:inset 0 0 0 1px var(--gold2)}
@keyframes fade{to{opacity:0}} @keyframes pop{50%{transform:scale(1.3)}} @keyframes rise{from{opacity:0;transform:translateY(14px)}}
@keyframes slidein{from{opacity:0;transform:translateX(30px)}} @keyframes grow{from{width:0}} @keyframes shine{0%,100%{opacity:.5}50%{opacity:1}}
</style>`
