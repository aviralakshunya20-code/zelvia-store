# Naapu: Game Blueprint (SPEC.md)

> Pehle andaaza, phir naap. Ye AI coding tool ke liye poora spec hai.


---

# 0. Ye document kaise use karein

Ye document ek **game ka poora blueprint** hai. Aap isse apne AI coding tool (jaise Claude Code, Cursor, ya koi bhi) ko dete ho, taaki wo guess na kare. Jab AI ko details nahi milti, wo apne default design (gol gol cards, gradient, purple, glass effect) laga deta hai. Isme har number, har rang, har rule likha hai taaki AI ke paas guess karne ki jagah hi na bache.

Aapko game development aati nahi, koi baat nahi. Har chapter simple Hinglish mein hai aur har technical shabd ka matlab last chapter (Glossary) mein hai.


## Document ka structure

| Chapter | Kya hai | Kab padhna hai |
|---|---|---|
| 1 | Game ka idea, kya banega, kya nahi banega | Pehle, khud samajhne ke liye |
| 2 | AI ke liye Golden Rules + Master Prompt | Har baar AI ko kaam dene se pehle copy karo |
| 3 | Technical architecture (files, modules, flow) | Project shuru karte waqt |
| 4 | Design system (rang, font, buttons, hand-made look) | CSS likhte waqt |
| 5 | Har screen ka layout aur behaviour | Screen banate waqt |
| 6 | Game ke systems: calibration, scoring, items, levels | Logic likhte waqt |
| 7 | Characters, effects, sound | Jab game mein jaan daalni ho |
| 8 | Data aur save system | State/save likhte waqt |
| 9 | Code reference + test numbers | Jab AI galat logic likhe |
| 10 | Edge cases + QA checklist | Release se pehle |
| 11 | Step-by-step build order (beginner ke liye) | Kaam ka order yahin se lo |
| 12 | Baad ke ideas (v2) + Glossary | Jab v1 ban jaye |

> **Note:** Ek zaroori baat: Ye PDF ke saath ek .md (Markdown) file bhi di gayi hai. AI tools ko PDF ke bajaye .md file dena behtar hai, kyunki code copy-paste sahi aata hai.


---

# 1. Game ka idea


## 1.1 Naam aur ek line

Game ka kaam-chalau naam: **Naapu** (naapna = to measure). Ek line: *"Pehle andaaza lagao, phir asli cheez ko naapo, aur dekho tum kitne sahi the."*


## 1.2 Ye game aur problem-solver dono kaise hai

| Hissa | Game wala pehlu | Asli kaam wala pehlu |
|---|---|---|
| Guess & Measure | Points, stars, combo, levels | Aapki andaaza-shakti sudharti hai (shopping, furniture, DIY mein kaam aati hai) |
| Daily Hunt | Roz ek naya challenge, streak | Aap apne ghar ki cheezein asli ruler se naapna seekhte ho |
| Ruler Tool | Game ke measure phase mein use hota hai | Screen par asli cm/inch ruler (calibrate hone ke baad) |
| Fit Checker | Bonus tool tab | "Ye sofa/box is jagah mein aayega ya nahi?" ka jawab |


## 1.3 Sabse zaroori sachchai (isko ignore mat karna)

Browser ko apni screen ka **asli size (mm mein) nahi pata hota**. Isliye ruler tab hi sahi hoga jab player ek baar **calibrate** kare. Calibrate ka matlab: ek credit card (85.6 mm lambi, sabki same hoti hai) screen par rakho aur ek outline ko uske size tak khinch do. Uske baad app ko pata chal jata hai ki 1 mm kitne pixel ka hai. Is poore game ki accuracy isi par tiki hai.


## 1.4 v1 mein kya banega

| Feature | v1 mein? | Note |
|---|---|---|
| Calibration (credit card se) | Haan | Sabse pehle banta hai |
| Guess & Measure (8 worlds, 40 items) | Haan | Core game |
| Measure bonus phase | Haan | Sirf tab jab item screen par aa sake |
| Daily Hunt + streak | Haan | Date se same challenge, server nahi chahiye |
| Ruler Tool | Haan | Calibration ke baad |
| Fit Checker (box in box) | Haan | Sabse useful tool |
| Characters (4) + expressions | Haan | SVG se, image files nahi |
| Sound (khud synthesize) | Haan | Koi mp3 file nahi |
| Offline chalna (PWA) | Haan | Chhota service worker |
| AR / hologram / camera | Nahi | v2. Chapter 12 dekho |
| Login, server, leaderboard | Nahi | Sab kuch phone mein hi save hoga |
| Ads, payments | Nahi | Kabhi nahi |


## 1.5 Player ka ek poora session (story)

- 1. Player link kholta hai. 1 second ka splash dikhta hai (Naapu hilta hai).
- 2. Pehli baar: **Calibrate** screen. Credit card screen par rakh kar outline match karta hai. "Ho gaya" dabata hai.
- 3. **Home** screen: 8 worlds ka map. Sirf World 1 khula hai.
- 4. World 1 chuna. 5 rounds ka set shuru. Round 1: "Rs 10 ka sikka kitna bada (diameter) hai?"
- 5. Player slider aur +/- buttons se andaaza lagata hai, "Pakka!" dabata hai.
- 6. Agar item screen par aa sakta hai aur player ke paas sikka hai: "Asli sikka naapo (bonus)" ka option aata hai. Wo sikka screen par rakh kar marker khinchta hai.
- 7. **Reveal**: asli size, apna andaaza, points, combo. Naapu khush ya udaas hota hai.
- 8. 5 rounds ke baad **Summary**: total, stars (0 se 3), XP, agle world ka unlock.
- 9. Roz **Daily Hunt** se streak badhti hai. Kabhi bhi **Fit Checker** use kar sakta hai.


---

# 2. AI ke liye Golden Rules

Ye chapter sabse important hai. Isko AI ko har baar do. Rules ka maksad: AI **apna default look aur apni extra files/libraries na laaye**, aur **sirf wahi banaye jo yahan likha hai**.


## 2.1 Master Prompt (copy-paste karo)

```
Tum ek experienced human web developer ho. Tum "Naapu" naam ka ek chhota browser game bana rahe ho.
SPEC.md ko poora padho. Us mein jo likha hai wahi banao. Jo nahi likha, guess mat karo, mujhse pucho.

HARD RULES:
1. Sirf plain HTML + CSS + vanilla JavaScript (ES modules). Koi framework nahi (React/Vue/Svelte
   nahi), koi build step nahi (npm/webpack/vite nahi), koi CSS library nahi (Tailwind/Bootstrap nahi).
2. Koi external library ya CDN nahi. Koi image file nahi (sab SVG ya CSS se). Sirf ek font file allowed.
3. Look "hand-made" ho: Chapter 4 ke exact rang, border, shadow, radius use karo. Gradient, blur,
   glass effect, neon, purple, emoji-as-icon, bade rounded corners (>16px), soft blurry shadows
   ALLOWED NAHI.
4. Har number (px, ms, points, mm) spec se lo. Naya number invent mat karo.
5. Ek baar mein sirf ek step banao (Chapter 11). Step khatam hone par "Done when" check batao.
6. Code chhota aur seedha rakho: ek file = ek kaam. Comments Hinglish mein, sirf zaroorat par.
7. Pure functions (score, fit, units, daily) alag files mein ho aur Chapter 9 ke test numbers
   se match karein.
8. Agar spec mein kuch contradiction ya kami lage, kaam rokkar mujhse poochho.
```


## 2.2 Forbidden list: AI ke default jo nahi chahiye

| AI aksar kya karta hai | Humein kya chahiye |
|---|---|
| Inter / Roboto font, sab kuch sans-serif | Sirf Patrick Hand font (hand-written feel) |
| Purple-blue gradient background | Garam kagaz jaisa rang #F6EFDC, koi gradient nahi |
| Bade rounded cards (24px+), soft blurry shadow | 3px kaali border, 3px 3px 0 hard shadow, radius 11-16px |
| Glassmorphism, backdrop-filter blur | Kuch bhi transparent/blur nahi |
| Emoji ko icon ki tarah use karna | Chhote hand-drawn SVG icons (Chapter 4.7) |
| Sab kuch perfectly seedha aur symmetrical | Cards par -0.6 / +0.5 degree ka halka ghumav |
| Heavy libraries (lodash, moment, chart libs) | Zero libraries |
| Hover animations par jor (mobile par bekar) | Press (active) animation par jor |
| Loading spinners, skeletons | Koi loading nahi: sab kuch local hai |
| Lorem ipsum ya English marketing text | Chapter 5 ke Hinglish strings exact |


## 2.3 Performance budget

| Cheez | Limit |
|---|---|
| Total JS (sab files milakar, unminified) | 60 KB se kam |
| Total CSS | 25 KB se kam |
| Font file (Patrick Hand TTF) | ~70 KB (ek hi file) |
| Pehla load (sab kuch milakar) | 150 KB se kam |
| Frame rate | 60 fps; animation sirf transform aur opacity par |
| Pehle paint tak ka time | 1 second se kam (4G phone) |
| Ruler ticks ka canvas | Sirf ek baar draw; resize par dobara |
| Ek screen par DOM elements | 300 se kam |


## 2.4 Browser support

Chrome/Edge/Safari/Firefox ke pichhle 2 saal ke versions. Phone: Android Chrome aur iPhone Safari. Minimum width 320 px. Jo features sabme chalte hain wahi use karo: ES modules, Pointer Events, Canvas 2D, Web Audio, localStorage, Web Animations API (element.animate), structuredClone.


---

# 3. Architecture


## 3.1 Folder aur files

```
naapu/
  index.html            <- ek hi page; saari screens <section> hain
  manifest.webmanifest  <- phone par install ke liye
  sw.js                 <- offline cache (chhota)
  tests.html            <- number tests (Chapter 9)
  style-guide.html      <- saare components ek page par (design check)
  assets/
    PatrickHand-Regular.ttf
  css/
    base.css            <- :root tokens, reset, typography
    components.css      <- btn, card, chip, toast, stamp, slider
    screens.css         <- har screen ka layout
  js/
    main.js             <- boot: state load, paper texture, router start
    router.js           <- screen show/hide + #hash
    state.js            <- save/load (localStorage) + default state
    data.js             <- ITEMS, WORLDS, DAILY, TITLES (Chapter 6)
    units.js            <- mm/cm/m/in/ft conversion + fmtMm
    score.js            <- points, bonus, combo, stars, xp, level (pure)
    fit.js              <- box-in-box check (pure)
    daily.js            <- date se target (pure)
    calib.js            <- pxPerMm, plausibility, maxMeasureMm
    ruler.js            <- canvas ticks + drag marker
    game.js             <- round state machine (guess -> measure -> reveal)
    ui.js               <- chhote DOM helpers: $, el(), setText()
    fx.js               <- sound, confetti, shake, pop, paper texture
    chars.js            <- characters ke SVG strings
    screens/
      splash.js calibrate.js home.js world.js guess.js measure.js
      reveal.js summary.js daily.js fit.js tool.js profile.js settings.js
```


## 3.2 Ek module = ek kaam

| File | Kaam | Kya import kar sakti hai | DOM chhoo sakti hai? |
|---|---|---|---|
| units.js, score.js, fit.js, daily.js | Sirf hisaab (pure functions) | Kuch bhi nahi (ya sirf data.js) | Nahi, kabhi nahi |
| data.js | Sirf constants | Kuch nahi | Nahi |
| state.js | Save/load | Kuch nahi | Nahi |
| calib.js | Pixel/mm math | state.js | Sirf window size padhna |
| ruler.js | Ticks aur drag | calib.js, units.js | Haan (sirf apna canvas/element) |
| game.js | Round ka flow | score.js, data.js, state.js | Nahi |
| fx.js, chars.js | Effects, SVG | state.js (sound setting) | Haan |
| screens/*.js | Ek screen ka UI | Upar ke sab | Haan |
| main.js, router.js | Boot aur navigation | Sab | Haan |

> **Note:** Rule: pure files (score, fit, units, daily) mein kabhi document ya window nahi aana chahiye. Isse unhe tests.html mein bina game chalaye test kar sakte hain.


## 3.3 Data ka flow

```
  [Player ka tap/drag]
          |
          v
  screens/*.js  --(event)-->  game.js (round state)
          |                        |
          |                        v
          |                  score.js (points)
          |                        |
          v                        v
     ui.js / fx.js  <------  state.js  --> localStorage
     (DOM, sound)             (ek hi JSON, key: naapu.v1)
```

Seedha niyam: **screens sirf game.js ko bolti hain "ye hua", game.js hisaab karke batata hai "ye dikhao"**. Screens apas mein ek doosre ko import nahi karti; navigation sirf router.js ke through.


## 3.4 Screens ki list aur raste

| Screen ID | Hash | Kaam | Kahan se aati hai |
|---|---|---|---|
| s-splash | #splash | 1 second ka logo | App open |
| s-calib | #calib | Calibration | Splash (pehli baar) / Settings |
| s-home | #home | 8 worlds ka map + menu | Splash / har jagah se back |
| s-world | #world/w1 | World ka detail, play button | Home |
| s-guess | #guess | Andaaza lagana | World (play) |
| s-measure | #measure | Asli cheez naapna (bonus) | Guess |
| s-reveal | #reveal | Jawab aur points | Guess / Measure |
| s-summary | #summary | Set ka result, stars | Reveal (5th round ke baad) |
| s-daily | #daily | Daily Hunt | Home |
| s-fit | #fit | Fit Checker | Home |
| s-tool | #tool | Free Ruler | Home |
| s-profile | #profile | Level, stats | Home |
| s-settings | #settings | Sound, haptics, recalibrate, reset | Home |


## 3.5 Router ka code (poora)

```
// router.js
const screens = [...document.querySelectorAll('main > section')];
const listeners = {};          // id -> function jo screen dikhte hi chalegi

export function on(id, fn){ listeners[id] = fn; }

export function go(hash){      // go('#home') ya go('#world/w1')
  if (location.hash !== hash) location.hash = hash;
  else render();
}

function render(){
  const full = location.hash.slice(1) || 'splash';     // 'world/w1'
  const [name, arg] = full.split('/');                 // 'world', 'w1'
  const id = 's-' + name;
  const target = document.getElementById(id);
  if (!target) return go('#home');
  screens.forEach(s => { s.hidden = (s !== target); });
  target.classList.remove('enter'); void target.offsetWidth; target.classList.add('enter');
  if (listeners[id]) listeners[id](arg);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);
export function start(){ render(); }
```

> **Note:** Animation 'enter': opacity 0 se 1 aur translateX 16px se 0, 160ms, ease-out. Purani screen turant hide hoti hai.


## 3.6 Local par chalane ka tareeka

ES modules `file://` se nahi chalte. Isliye VS Code mein **Live Server** extension install karo, index.html par right-click karke "Open with Live Server" dabao. Ya terminal mein `python3 -m http.server 8000` chalao aur browser mein `localhost:8000` kholo.


---

# 4. Design system: hand-made look

Goal: aisa lage jaise kisi ne **kagaz par pen aur sketch-pen se banaya** ho. Simple, thoda tedha, rang sirf kuch. Koi chamak-damak nahi.


## 4.1 Rang (sirf ye 9)

| Naam | Hex | Kahan use hota hai |
|---|---|---|
| paper | #F6EFDC | Page ka background |
| paper2 | #EDE3C8 | Doosra background (alt button, input) |
| card | #FFFBEF | Card ka andar ka rang |
| ink | #2B2118 | Saari borders, text, ticks (kabhi pure black #000 nahi) |
| tomato | #E4572E | Galat, marker, danger, focus ring |
| mustard | #F3B73B | Main button, Naapu ka body, stars |
| leaf | #4C9F70 | Sahi, success, true-size bar |
| sky | #6FB1D6 | Info, Fita ka shell, hint |
| blush | #F4A58A | Gaal (cheeks), halka highlight |

> **Note:** Rule: text hamesha ink rang ka hota hai, kisi bhi coloured button par bhi. White text nahi. Sirf yehi 9 rang use karo. Ek extra rang 'wood' #B9783F sirf Gaj Baba character ke liye allowed hai.


## 4.2 CSS tokens (base.css ka pehla hissa, exact)

```
:root{
  --paper:#F6EFDC; --paper2:#EDE3C8; --card:#FFFBEF; --ink:#2B2118;
  --tomato:#E4572E; --mustard:#F3B73B; --leaf:#4C9F70; --sky:#6FB1D6; --blush:#F4A58A;
  --line:3px;
  --r1:12px 15px 11px 14px;      /* thoda tedha radius: button, input */
  --r2:16px 12px 15px 11px;      /* card */
  --shadow:3px 3px 0 var(--ink); /* hard shadow, blur 0 */
  --font:'Patrick Hand','Segoe Print','Comic Sans MS',cursive;
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:24px; --s6:32px; --s7:48px;
  --ease:cubic-bezier(.2,.7,.4,1);
}
@font-face{ font-family:'Patrick Hand'; src:url(../assets/PatrickHand-Regular.ttf); font-display:swap; }
*{ box-sizing:border-box; margin:0; }
html{ -webkit-text-size-adjust:100%; }
body{ background:var(--paper); color:var(--ink); font:20px/26px var(--font);
      touch-action:manipulation; -webkit-tap-highlight-color:transparent; }
:focus-visible{ outline:3px dashed var(--tomato); outline-offset:3px; }
[hidden]{ display:none !important; }
```


## 4.3 Typography

| Naam | Size / line-height | Kahan |
|---|---|---|
| display | 40px / 44px | Splash title, Summary ka 'STARS' |
| h1 | 32px / 36px | Screen ka title |
| h2 | 26px / 30px | Card ka title |
| body | 20px / 26px | Normal text |
| small | 16px / 20px | Hint, note, captions |
| bignum | 56px / 56px | Andaaze ka number, score |
| ruler-label | 14px / 14px | Ruler par cm ke number |

Sirf ek font: Patrick Hand (Google Fonts, Open Font License, free). Download karke TTF file `assets/` mein rakho. Bold mat lagao (font mein bold nahi hai, browser nakli bold bana deta hai jo bura dikhta hai). Zor dene ke liye size ya rang badlo, ya neeche scribble underline lagao.


## 4.4 Spacing, border, shadow

| Cheez | Value |
|---|---|
| Screen ke side gutter | 16px (--s4) |
| Cards ke beech gap | 12px (--s3) |
| Card ke andar padding | 16px |
| Border | 3px solid var(--ink) sab par |
| Shadow | 3px 3px 0 var(--ink). Blur hamesha 0 |
| Minimum tap target | 48px x 48px |
| Content max width | 480px, center mein. Desktop par bahar ka hissa paper rang |
| Safe area | padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left) |


## 4.5 Components (exact CSS)


## Button

```
.btn{ font:inherit; font-size:22px; color:var(--ink); background:var(--mustard);
  border:var(--line) solid var(--ink); border-radius:var(--r1); box-shadow:var(--shadow);
  padding:10px 20px; min-height:48px; cursor:pointer;
  transition:transform 80ms var(--ease), box-shadow 80ms var(--ease); }
.btn:active{ transform:translate(3px,3px) scale(.97); box-shadow:0 0 0 var(--ink); }
.btn.alt{ background:var(--paper2); }
.btn.go{ background:var(--leaf); }
.btn.bad{ background:var(--tomato); }
.btn[disabled]{ background:var(--paper2); color:var(--ink); border-style:dashed; box-shadow:none; cursor:not-allowed; }
```


## Card

```
.card{ background:var(--card); border:var(--line) solid var(--ink); border-radius:var(--r2);
  box-shadow:var(--shadow); padding:16px; }
.card:nth-child(odd){ transform:rotate(-.6deg); }
.card:nth-child(even){ transform:rotate(.5deg); }
```


## Chip (chhota label)

```
.chip{ display:inline-block; font-size:16px; line-height:20px; padding:2px 10px;
  background:var(--paper2); border:2px solid var(--ink); border-radius:10px 12px 9px 11px; }
```


## Toast (chhoti suchna, 2 second)

```
.toast{ position:fixed; left:50%; bottom:calc(24px + env(safe-area-inset-bottom));
  transform:translateX(-50%); background:var(--ink); color:var(--paper);
  padding:10px 16px; border-radius:var(--r1); font-size:18px; z-index:50; }
```

Ye ek jagah hai jahan light text allowed hai (ink background par paper text). Toast 2000ms rehta hai, phir opacity 1 se 0, 200ms.


## Stamp (stars, 'LEVEL UP' ke liye)

```
.stamp{ display:inline-block; border:4px solid var(--tomato); color:var(--tomato);
  padding:4px 14px; font-size:32px; transform:rotate(-4deg); border-radius:10px 14px 9px 13px; }
```


## Slider (guess ke liye)

```
input[type=range]{ -webkit-appearance:none; appearance:none; width:100%; height:48px; background:none; }
input[type=range]::-webkit-slider-runnable-track{ height:8px; background:var(--paper2);
  border:3px solid var(--ink); border-radius:6px; }
input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; width:34px; height:34px;
  margin-top:-14px; background:var(--mustard); border:3px solid var(--ink); border-radius:50%; }
input[type=range]::-moz-range-track{ height:8px; background:var(--paper2); border:3px solid var(--ink); border-radius:6px; }
input[type=range]::-moz-range-thumb{ width:28px; height:28px; background:var(--mustard); border:3px solid var(--ink); border-radius:50%; }
```


## 4.6 Hand-made tricks (ye hi 'human dev' wala feel dete hain)

- **Tedhe radius**: 4 corners alag alag value (--r1, --r2). Kabhi `border-radius: 12px` ek hi value nahi.
- **Halka ghumav**: cards ±0.5 degree. Lekin ruler aur uski ticks KABHI rotate nahi hote (accuracy).
- **Scribble underline**: h1 ke neeche tomato rang ka wavy SVG (neeche code).
- **Paper texture**: chhote random dots ka canvas, ek baar banta hai, background-image banta hai (code Chapter 7.6). Koi image file nahi.
- **Ink jitter**: ruler ke tick ki LAMBAI mein ±0.6px random (seed fixed). Tick ki JAGAH kabhi nahi hilti.
- **Dashed border**: disabled state ke liye (solid nahi).
- **Koi gradient, blur, transparency nahi.** Overlay ke liye bhi solid paper rang.

```
<!-- scribble underline: h1 ke baad paste karo -->
<svg class="scribble" width="120" height="8" viewBox="0 0 120 8" aria-hidden="true">
  <path d="M2 5 Q30 1 60 5 T118 4" fill="none" stroke="#E4572E" stroke-width="3" stroke-linecap="round"/>
</svg>
```


## 4.7 Icons (9, sab hand-drawn SVG, 24x24, stroke ink 3, round caps)

| Icon | SVG andar ka code |
|---|---|
| back | <path d="M15 4 L7 12 L15 20"/> |
| home | <path d="M3 12 L12 4 L21 12 M6 10 V20 H18 V10"/> |
| check | <path d="M4 13 L9 18 L20 6"/> |
| cross | <path d="M5 5 L19 19 M19 5 L5 19"/> |
| star | <polygon points="12,2 15,9 22,9.5 16.5,14.5 18,22 12,18 6,22 7.5,14.5 2,9.5 9,9"/> |
| lock | <rect x="6" y="11" width="12" height="9" rx="2"/><path d="M8 11 V8 a4 4 0 0 1 8 0 V11"/> |
| sound-on | <path d="M4 9 H8 L13 5 V19 L8 15 H4 Z M16 9 Q19 12 16 15"/> |
| sound-off | <path d="M4 9 H8 L13 5 V19 L8 15 H4 Z M16 9 L21 15 M21 9 L16 15"/> |
| gear | <circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M5 5 L7 7 M17 17 L19 19 M19 5 L17 7 M5 19 L7 17"/> |

> **Note:** Star bharne ke liye fill=mustard, khaali ke liye fill=none (sirf outline). Icon ka size button mein 28px.


## 4.8 Animation timings (sab ek jagah)

| Naam | Kya hota hai | Time | Easing |
|---|---|---|---|
| press | translate(3px,3px) scale(.97), shadow 0 | 80ms | --ease |
| enter | opacity 0 -> 1, translateX 16px -> 0 | 160ms | ease-out |
| pop | scale .4 -> 1.25 -> 1 | 320ms | --ease |
| shake | translateX 0,-4,4,-3,3,0 px | 240ms | linear |
| stamp | scale 2.2 -> 1, rotate -12deg -> random(-6..6) | 280ms | --ease |
| count-up | number 0 se points tak | 600ms | ease-out (rAF) |
| toast-out | opacity 1 -> 0 | 200ms | linear |
| idle-bob | character translateY 0 <-> -4px, steps(2) | 500ms loop | steps(2) |
| blink | eyes 120ms ke liye band, har 3-5 second | 120ms | step |

> **Note:** Sab animation sirf transform ya opacity par. prefers-reduced-motion: reduce ho to shake, confetti, count-up, bob band; enter 0ms.


---

# 5. Har screen ka layout

Reference screen: **390 x 844 px** (phone portrait). Header 56px, bottom bar 72px (jahan buttons hon), baaki content. Desktop par content 480px width mein center. Niche ke ASCII drawings sirf layout dikhane ke liye hain, rang aur look Chapter 4 se aayega.


## 5.1 Strings (jo text screen par aayega)

| Key | Text |
|---|---|
| app.name | Naapu |
| app.tag | Pehle andaaza, phir naap. |
| calib.title | Pehle screen ko samjhao |
| calib.help | Credit/ATM/Aadhaar PVC card screen par rakho. Slider se outline ko card ke barabar karo. |
| calib.done | Ho gaya |
| calib.bad | Ye size sahi nahi lag raha. Dobara try karo. |
| home.title | Kahan chalein? |
| guess.q | {name} ki {part} kitni hogi? |
| guess.lock | Pakka! |
| guess.hint | Hint (-10) |
| measure.offer | Asli {name} naapo (bonus) |
| measure.skip | Rehne do |
| measure.lock | Naap liya |
| reveal.true | Asli size |
| reveal.yours | Tumhara andaaza |
| reveal.next | Aage |
| reveal.great | Bilkul sahi! |
| reveal.ok | Achha tha |
| reveal.bad | Door the |
| summary.title | Set khatam |
| summary.again | Dobara khelo |
| daily.title | Aaj ka Hunt |
| daily.q | Kuch dhoondo jo lagbhag {target} lamba ho |
| daily.ok | Mil gaya! Streak: {n} |
| fit.title | Aayega ya nahi? |
| fit.yes | Aa jayega |
| fit.no | Nahi aayega |
| lock.calib | Pehle calibrate karo |
| lock.world | Pichhla world 1 star se paar karo |
| zoom.warn | Zoom badla hai. Dobara calibrate karo. |


## 5.2 s-splash

```
+------------------------------+
|                              |
|                              |
|          [ Naapu ]           |   Naapu 'idle', 120x164
|           Naapu              |   display 40px
|     ~~~~~~~~~~~~~~~~         |   scribble underline
|   Pehle andaaza, phir naap.  |   body 20px
|                              |
+------------------------------+
```

Time: 1000ms. Phir: agar calibration nahi hui to #calib, nahi to #home. Kahin tap karne par bhi skip ho jata hai.


## 5.3 s-calib

```
+------------------------------+
| < back(hide first time)      |
| Pehle screen ko samjhao      |   h1
| ~~~~~~~~~~~~~~~~             |
| Credit/ATM card screen par   |   body (3 line tak)
| rakho...                     |
|                              |
|  +------------------------+  |
|  |   (card ka outline)    |  |   dashed tomato border 3px
|  |    85.6 mm lamba       |  |   long side = L px
|  +------------------------+  |   short side = L x 0.6306
|                              |
| [-5][-1]  ====O====  [+1][+5]|   slider + fine buttons
| Abhi: 6.02 px per mm         |   small
|                              |
|        [  Ho gaya  ]         |   .btn.go
+------------------------------+
```

- Outline ki long side phone portrait mein **vertical** (upar se neeche), landscape/desktop mein **horizontal**. Rule: jo viewport axis lambi hai, usi par.
- Starting L = 85.6 x 6.0 px agar phone (touch hai aur width <= 600), nahi to 85.6 x 3.78 px.
- Slider range: min = 0.15 x lambi axis (px), max = 0.95 x lambi axis. Step 1 px.
- Fine buttons: -5, -1, +1, +5 px.
- Short side hamesha = L x 53.98 / 85.6 (credit card ratio).
- "Ho gaya": pxPerMm = L / 85.6. Agar 2.5 se kam ya 14 se zyada -> error string calib.bad, save nahi.
- Save mein dpr (devicePixelRatio) aur device signature (screen.width x screen.height x dpr) bhi jata hai (Chapter 8).


## 5.4 s-home

```
+------------------------------+
| Naapu         [gear] [profile]|  header 56px
| Kahan chalein?               |
|                              |
| +--------+  +--------+       |
| | W1     |  | W2     |       |   World cards, 2 columns
| | Jeb ke |  | Battery|       |   har card mein: naam, stars (0-3)
| | * * *  |  | * - -  |       |
| +--------+  +--------+       |
| +--------+  +--------+       |
| | W3 lock|  | W4 lock|       |   lock icon + dhundhla nahi (dashed border)
| ...                          |
|                              |
| [ Daily Hunt ] [ Fit ] [Ruler]|  bottom bar 72px, 3 buttons
+------------------------------+
```

- World card: 2 column grid, gap 12px. Card ki height 120px.
- Locked world: dashed border, lock icon, tap par toast lock.world.
- Bina calibration ke Daily, Ruler aur Fit ke measure wale buttons par lock icon; tap par toast lock.calib. (Fit ke andar number type karna calibration ke bina bhi chalta hai.)
- Top par Naapu ki chhoti image (60px wide) 'idle'.


## 5.5 s-world (#world/w1)

```
+------------------------------+
| < back                       |
| Jeb ke Sikke                 |   h1
| Sikke aur card: sabse aasan  |   small
|                              |
| Best: 410 pts   * * -        |
| 5 items:                     |
|  - Rs 1 ka sikka             |   items ke naam (size nahi)
|  - Rs 2 ka sikka ...         |
|                              |
|        [  Khelo  ]           |
+------------------------------+
```

"Khelo" dabane par world ke 5 items random order mein ek set banta hai (Fisher-Yates shuffle). Pehle round par jao.


## 5.6 s-guess

```
+------------------------------+
| X (chhodo)       Round 2 / 5 |  header, X par confirm
| Combo: x1.2        Score: 83 |  small
|                              |
| Rs 5 ka sikka ki             |   h2
| diameter kitni hogi?         |
|                              |
|        [ Naapu think ]       |
|                              |
|        2.4 cm   <- tap=type  |   bignum, tap karo to keypad
|  [-]  =====O=========  [+]   |   log slider + step buttons
|                              |
| [ Hint (-10) ]   [ Pakka! ]  |   bottom bar
+------------------------------+
```

- Number ek button hai. Tap par `<input inputmode=decimal>` aur unit dropdown (mm, cm, m) khulta hai. Enter par band.
- Slider 0..1000 integer, log scale (formula Chapter 6.4). Slider hilne par number update.
- [-] [+] buttons: step Chapter 6.4 ki table se. Long press (400ms ke baad) har 80ms par repeat.
- Hint dabane par Fita aata hai (thinking) aur hint text card mein dikhta hai. Ek round mein sirf ek baar. Hint ka -10 round ke guessPts se kat'ta hai.
- "Pakka!" dabane par button disable (double tap guard) aur game.js ko guess bhejna.
- Lock hone se pehle guess <= 0 ho to button disabled.


## 5.7 s-measure

```
+------------------------------+
| X                  Bonus naap |
| Asli Rs 5 ka sikka ko        |
| ruler ke 0 se laga kar       |
| marker kheencho              |
|                              |
|0|....|....|....|....|        |   ruler (canvas), 64px thick
| 1    2    3                  |   labels cm
|        |  <- marker (tomato) |
|                              |
|        23.5 mm               |   bignum
|                              |
| [ Rehne do ]  [ Naap liya ]  |
+------------------------------+
```

- Ruler ki lambai = item ki mm + 20 mm (ya maxMeasureMm tak).
- Portrait mein ruler vertical (upar se neeche) aur number side mein; landscape mein horizontal.
- Marker: tomato rang ki 3px line, uske upar 28px ka gol handle. Drag mein handle scale 1.15.
- Marker 0.5 mm ke steps par snap karta hai.
- Keyboard (desktop): Left/Right ya Up/Down se +-1 mm, Shift ke saath +-10 mm.
- Is screen par zoom/pinch ho (visualViewport.scale != 1) to measure disable aur toast zoom.warn.


## 5.8 s-reveal

```
+------------------------------+
|                    Round 2/5 |
|                              |
|       [ Naapu happy ]        |
|        Bilkul sahi!          |   h1 + stamp agar >= 90
|                              |
| Asli size    : 23 mm  ===== |   leaf bar (true scale agar fit ho)
| Tumhara      : 24 mm  ====== |   tomato bar
| Farq         : 4.3 %         |
|                              |
| Guess  +96     Bonus  +30    |
| Combo  x1.2                  |
| Round total    151           |   count-up 600ms
|                              |
|           [  Aage  ]         |
+------------------------------+
```

- Verdict text: guessPts >= 90 -> reveal.great (Naapu happy + confetti 36); 50..89 -> reveal.ok (Naapu idle); < 50 -> reveal.bad (Naapu sad + shake).
- Bars: agar dono values <= maxMeasureMm to bars asli scale par (px = mm x pxPerMm). Warna bars width ka % (bada wala = 100%).
- Bar height 18px, border 3px ink, true = leaf, guess = tomato.
- 5th round par button text "Result dekho" ho jata hai.


## 5.9 s-summary

```
+------------------------------+
|        Set khatam            |   display
|       [ * ] [ * ] [ - ]      |   stamp stars, 200ms gap
|                              |
|  Total        612            |
|  Behtareen round  Rs 2 sikka |
|  XP mila      +61            |
|  Level 2: Inch Inch Seekhu   |   progress bar neeche
|  [=======-----]  161 / 250   |
|  Naya world khula: Battery!  |   agar unlock hua
|                              |
| [ Home ]      [ Dobara ]     |
+------------------------------+
```


## 5.10 s-daily

```
+------------------------------+
| < back                       |
| Aaj ka Hunt        Streak 4  |
|                              |
| Kuch dhoondo jo lagbhag      |
| 6.5 cm lamba ho              |   bignum
| (+- 3.25 mm chalega)         |   small
|                              |
| [ marker wala ruler ]        |
|        66.0 mm               |
|                              |
|        [ Naap liya ]         |
+------------------------------+
```

- Target aur tolerance Chapter 6.8 se. Sahi hone par stamp "MIL GAYA", confetti, streak update.
- Galat hone par Naapu sad aur batata hai kitna door tha (mm mein), dobara koshish unlimited.
- Aaj ho chuka ho to screen par stamp "Aaj ka ho gaya" aur kal ka countdown nahi (sirf text 'Kal phir aana').


## 5.11 s-fit

```
+------------------------------+
| < back                       |
| Aayega ya nahi?              |
|                              |
| Cheez (L x W x H)            |
| [ 200 ] [ 90 ] [ 85 ]  [cm v]|   3 inputs + unit dropdown
|                              |
| Jagah (L x W x H)            |
| [ 210 ] [ 95 ] [ 90 ]  [cm v]|
|                              |
| Gap chhodna hai: [ 0 ] mm    |
|                              |
|         [ Check karo ]       |
|                              |
|  Aa jayega (ya) Nahi aayega  |
|  Dimension 2 mein 5 mm kam   |
+------------------------------+
```

- Har input ke saath ek chhota ruler icon: dabane par Ruler tool khulta hai, naap kar value wapas bharta hai (agar calibrate hai aur value maxMeasureMm se chhoti hai).
- Result Chapter 6.9 ke fitCheck se. Haan -> leaf rang, Naapu happy; Nahi -> tomato, Naapu sad.
- Result mein aakhri line batati hai kaun si dimension kitni kam hai ya kitni bachti hai (sorted order mein).
- Disclaimer small text: "Ye seedha rakh kar fit hone ka check hai. Tirchha karke nikalna alag hota hai."


## 5.12 s-tool, s-profile, s-settings

```
s-tool: ruler (vertical/horizontal) + marker + number
        unit toggle chips [mm][cm][in]   -> number dusre unit mein
        [ Calibrate dobara ]              -> #calib

s-profile:
  Level 3  Cm ka Dost      [======---] 340/450 XP
  Total rounds: 45         Average farq: 14.2 %
  Best round: 100 pts      Perfect (>=98): 6
  Daily streak: 4          Best streak: 9

s-settings:
  Sound        [ON/OFF]    Haptics [ON/OFF]
  Unit default [mm|cm|in]
  [ Dobara calibrate ]
  [ Progress reset ]       (do baar confirm)
```

Reset: pehle dialog "Sab kuch mita dein?" [Haan] [Nahi]; haan par doosra dialog "Pakka? Wapas nahi aayega." Sirf dusre haan par localStorage key delete.


---

# 6. Game ke systems


## 6.1 Calibration ka hisaab

| Cheez | Formula / Value | Kyun |
|---|---|---|
| Card ki lambi side | CARD_MM = 85.6 mm | ISO ID-1 standard: credit, ATM, Aadhaar PVC card sab |
| Card ki chhoti side | 53.98 mm | Outline ka ratio banane ke liye |
| pxPerMm | L / 85.6   (L = outline ki long side px mein) | 1 mm kitne CSS px ka hai |
| Sahi range | 2.5 <= pxPerMm <= 14 | Isse bahar to galti hai |
| Typical phone | lagbhag 5.5 se 7.5 | Reference: 390px / 65mm = 6.0 |
| Typical laptop/desktop | lagbhag 3.8 se 5.7 | 96 dpi = 3.78 |
| maxMeasureMm | floor((lambi axis px - 200) / pxPerMm) | 200 px header/footer ke liye |
| Phone par maxMeasureMm | lagbhag 110 mm | 844 px tall, 6 px/mm -> 107 |
| Measurable item | 5 mm <= item.mm <= maxMeasureMm | Bahut patla ya bada item measure nahi hota |

Calibration invalid ho jati hai agar: (a) devicePixelRatio saved se 0.01 se zyada alag ho (browser zoom badla), ya (b) device signature badal gaya (doosre device par same browser sync). Tab calib.bad ki jagah zoom.warn aur recalibrate button.


## 6.2 Ruler

- Ruler ek canvas hai: 64px moti, lambai = 40 + (mm x pxPerMm) + 20 px. '0 mm' ki position canvas ke start se 40 px andar.
- Ticks: har 1 mm ek tick. 10 mm par bada (24px, line 2.2px) + label (cm number). 5 mm par medium (16px). baaki chhote (9px, line 1.4px).
- Tick ki JAGAH = 40 + mm x pxPerMm (bilkul exact). Sirf lambai mein ±0.6 px jitter (seeded random, har baar same).
- Marker ki value mm = max(0, round(((p - 40) / pxPerMm) x 2) / 2), yaani 0.5 mm snap. p = pointer ki position ruler ke start se px mein.
- Marker ki value 0 se (ruler ki lambai mm) ke beech clamp.
- Pointer events + setPointerCapture. `touch-action: none` sirf ruler par (baaki page scroll ho sakta hai).
- Haptic: har 5 mm par navigator.vibrate(5), maximum har 60ms mein ek baar.


## 6.3 Round ka state machine

| State | Kya hota hai | Agla state | Trigger |
|---|---|---|---|
| INTRO | Round number, item ka naam dikhta hai (300ms) | GUESS | Auto |
| GUESS | Player andaaza lagata hai | MEASURE_OFFER ya REVEAL | "Pakka!" |
| MEASURE_OFFER | Check: item measurable? agar haan, offer dikhta hai | MEASURE ya REVEAL | "Naapo" ya "Rehne do" |
| MEASURE | Marker se asli cheez naapta hai | REVEAL | "Naap liya" ya "Rehne do" |
| REVEAL | Points dikhte hain (count-up) | INTRO (next round) ya SUMMARY | "Aage" |
| SUMMARY | 5 rounds ka total, stars, XP, unlock | HOME / INTRO (naya set) | Buttons |

> **Note:** MEASURE_OFFER ek alag screen nahi: GUESS ke "Pakka!" ke turant baad ek chhota card aata hai. Agar item measurable nahi to ye state skip ho jati hai (player ko pata bhi nahi chalta).


## 6.4 Guess input (slider aur buttons)

Slider 0 se 1000 tak integer t deta hai. Value mm mein **log scale** par: bahut chhote (0.5 mm) se bahut bade (30 000 mm = 30 m) tak ek hi slider.

```
const MIN_MM = 0.5, MAX_MM = 30000;
const mmFromT = t  => MIN_MM * Math.pow(MAX_MM / MIN_MM, t / 1000);
const tFromMm = mm => 1000 * Math.log(mm / MIN_MM) / Math.log(MAX_MM / MIN_MM);
```

| Value (mm) | Snap step |
|---|---|
| 0.5 se 10 se kam | 0.1 mm |
| 10 se 100 se kam | 0.5 mm |
| 100 se 1000 se kam | 1 mm |
| 1000 se 10000 se kam | 10 mm |
| 10000 aur upar | 50 mm |

Slider ki value snap step par round hoti hai. [-] aur [+] buttons isi step se value ghatate/badhate hain. Starting guess har round mein 100 mm. Number par tap karne se type karke bhi daal sakte hain (unit: mm, cm, m).


## 6.5 Scoring (har number)

| Farq (%) | Guess points |
|---|---|
| 0 se 2 | 100 |
| 5 | 94 |
| 10 | 83 |
| 15 | 73 |
| 25 | 52 |
| 30 | 42 |
| 40 | 21 |
| 50 ya zyada | 0 |

```
err = |guess - true| / true
err <= 0.02            -> 100
err >= 0.50            -> 0
warna  round( 100 * (1 - (err - 0.02) / 0.48) )
```

| Cheez | Rule |
|---|---|
| Hint | Guess points se -10 (kam se kam 0) |
| Measure bonus (exact item) | measure err <= 3% -> +30;  <= 6% -> +15;  warna 0 |
| Measure bonus (approx item) | Tolerance double: <= 6% -> +30;  <= 12% -> +15 |
| Combo (streak) badhta hai | jab guess points (hint ke baad) >= 70 |
| Combo toot-ta hai | jab guess points < 70 (streak 0 ho jati hai) |
| Multiplier | streak 0-1: x1.0;  2: x1.2;  3: x1.5;  4 ya zyada: x2.0 |
| Round total | round( (guessPts + bonus) x multiplier ),  streak is round ke BAAD wali |
| Max ek round | (100 + 30) x 2.0 = 260 |
| Max 5 rounds ka set | 130 x (1 + 1.2 + 1.5 + 2 + 2) = 1001 |
| Bina bonus ke max set | 770 |


## 6.6 Stars, XP, Levels

| Set total | Stars |
|---|---|
| 700 ya zyada | 3 |
| 450 se 699 | 2 |
| 200 se 449 | 1 |
| 200 se kam | 0 |

XP = round(set total / 10). World ka best score aur best stars save hote hain (kam aane par purana best nahi ghat-ta). XP har set par jata hai, replay par bhi.

| Level | Title | Total XP chahiye |
|---|---|---|
| 1 | Andaaza Newbie | 0 |
| 2 | Inch Inch Seekhu | 100 |
| 3 | Cm ka Dost | 250 |
| 4 | Mm ka Shagird | 450 |
| 5 | Gaj Wala | 700 |
| 6 | Naap Ustaad | 1000 |
| 7 | Tape Guru | 1400 |
| 8 | Maap Maharaja | 2000 |

Level wahi jo threshold <= XP ho, sabse bada. Level 8 par progress bar poori bhari rehti hai.


## 6.7 Worlds aur Items

8 worlds, har ek mein 5 items, total 40. **Unlock rule**: World 1 hamesha khula. World n tab khulta hai jab World n-1 par best stars >= 1.

| World | Naam | Description |
|---|---|---|
| W1 | Jeb ke Sikke | Sikke aur card: sabse aasan shuruaat |
| W2 | Battery Bazaar | Chhoti batteries aur ek playing card |
| W3 | Gadget Dabba | SIM, USB, cube, CD aur ek bahut patla card |
| W4 | Kaagaz Mela | A6 se A3 tak ke kaagaz |
| W5 | Khel ke Gole | Alag alag khel ki gendein |
| W6 | Note Ginti | Paise ke note: sab ki size bahut paas paas |
| W7 | Bade Naap | Cricket, tennis aur darwaza |
| W8 | Bahut Bade | Maidan aur court ki lambai |

Neeche poori item table hai. 'approx = haan' ka matlab size ek standard nahi balki lagbhag hai (is par measure bonus ki tolerance double hai).

| ID | Naam | Kya | mm | approx | Hint |
|---|---|---|---|---|---|
| w1-1 | Rs 1 ka sikka | diameter | 22.0 | nahi | Rs 1/2/5/10 mein sabse chhota. |
| w1-2 | Rs 2 ka sikka | diameter | 25.0 | nahi | Rs 5 ke sikke se bhi bada hai. |
| w1-3 | Rs 5 ka sikka | diameter | 23.0 | nahi | Rs 2 se chhota, Rs 1 se bada. |
| w1-4 | Rs 10 ka sikka | diameter | 27.0 | nahi | In chaaron mein sabse bada sikka. |
| w1-5 | Credit / Aadhaar PVC card | lambi side | 85.6 | nahi | ATM card ki lambai jitna. |
| w2-1 | CR2032 gol battery | diameter | 20.0 | nahi | Ghadi wali battery; Rs 10 sikke se chhoti. |
| w2-2 | AAA battery | lambai | 44.5 | haan | AA se thodi chhoti. |
| w2-3 | 9V battery | unchai | 48.5 | nahi | AA battery ke lagbhag barabar lambi. |
| w2-4 | AA battery | lambai | 50.5 | haan | Lagbhag 5 cm ke aaspaas. |
| w2-5 | Taash ka patta (playing card) | lambi side | 88.9 | nahi | Credit card se thoda lamba. |
| w3-1 | Nano SIM card | lambi side | 12.3 | nahi | 1.5 cm se bhi chhota. |
| w3-2 | USB-A plug (metal hissa) | chaudai | 12.0 | nahi | Pen drive ke metal ki chaudai. |
| w3-3 | Rubik's cube (3x3) | ek side | 56.0 | nahi | 5 cm se thodi si zyada. |
| w3-4 | CD / DVD | diameter | 120.0 | nahi | Credit card ki lambai se bada. |
| w3-5 | Credit card ki motai | motai | 0.76 | nahi | Ek mm se bhi patla. |
| w4-1 | A6 kaagaz | chhoti side | 105.0 | nahi | Postcard jaisa chhota kaagaz. |
| w4-2 | A6 kaagaz | lambi side | 148.0 | nahi | A5 ki chhoti side ke barabar. |
| w4-3 | A4 kaagaz | chhoti side | 210.0 | nahi | A5 ki lambi side ke barabar. |
| w4-4 | A4 kaagaz | lambi side | 297.0 | nahi | A3 ki chhoti side ke barabar. |
| w4-5 | A3 kaagaz | lambi side | 420.0 | nahi | A4 ki lambi side ka lagbhag 1.4 guna. |
| w5-1 | Golf ball | diameter | 42.7 | nahi | Ping-pong ball se thodi badi. |
| w5-2 | Table tennis (ping-pong) ball | diameter | 40.0 | nahi | Golf ball se thodi si chhoti. |
| w5-3 | Tennis ball | diameter | 67.0 | haan | Cricket ball se thodi chhoti. |
| w5-4 | Cricket ball | diameter | 72.0 | haan | Tennis ball se thodi badi. |
| w5-5 | Football (size 5) | diameter | 220.0 | haan | Cricket ball ka lagbhag teen guna. |
| w6-1 | Rs 10 ka note | lambai | 123.0 | nahi | Is set ka sabse chhota note. |
| w6-2 | Rs 50 ka note | lambai | 135.0 | nahi | Rs 10 se lamba, Rs 100 se chhota. |
| w6-3 | Rs 100 ka note | lambai | 142.0 | nahi | Rs 50 se lamba, Rs 500 se chhota. |
| w6-4 | Rs 500 ka note | lambai | 150.0 | nahi | Rs 100 note se lamba. |
| w6-5 | 1 US dollar ka note | lambai | 156.0 | nahi | Is set ka sabse lamba note. |
| w7-1 | Tennis racket (standard) | lambai | 686.0 | haan | Stump ki unchai ke lagbhag barabar. |
| w7-2 | Cricket stump | unchai | 711.0 | nahi | Bat se chhota. |
| w7-3 | A1 kaagaz | lambi side | 841.0 | nahi | A3 ki lambi side ka lagbhag 2 guna. |
| w7-4 | Cricket bat (sabse lamba allowed) | lambai | 965.0 | nahi | Stump se lamba, par ek meter se kam. |
| w7-5 | Ghar ka darwaza (aam) | unchai | 2100.0 | haan | Lamba aadmi bina jhuke nikal sake. |
| w8-1 | Basketball hoop | zameen se unchai | 3048.0 | nahi | Ek manzil (floor) ki unchai ke aaspaas. |
| w8-2 | Football goal | chaudai | 7320.0 | nahi | Basketball hoop ki unchai ka lagbhag 2.4 guna. |
| w8-3 | Badminton court | lambai | 13400.0 | nahi | Cricket pitch se chhota. |
| w8-4 | Cricket pitch | lambai | 20120.0 | nahi | Tennis court ki lambai se chhota. |
| w8-5 | Tennis court | lambai | 23770.0 | nahi | Cricket pitch se lamba. |

> **Note:** Sikke ke naam mein JS code mein '₹' likh sakte ho; is PDF mein 'Rs' likha hai. Items ki 'name' string dikhate waqt ₹ use karo. Table ke numbers kabhi nahi badalne (sirf tab jab kisi item ki size sach mein galat nikle).


## 6.8 Daily Hunt

- dayIndex = local date (saal-mahina-din) ke liye UTC midnight aur 2026-01-01 UTC midnight ka din-farq (poora integer).
- Target = DAILY[dayIndex % 30], mm mein. 30 values ki list neeche.
- Tolerance = max(3 mm, 5% of target). Sahi: |measured - target| <= tolerance.
- Streak: aaj pehli baar sahi -> agar kal ka din done tha to streak+1, warna streak = 1. best streak bhi update.
- Din ka key 'YYYY-MM-DD' (local). Ek din mein ek hi baar streak badhti hai.
- Ek example: 2026-10-07 ka dayIndex = 279, 279 % 30 = 9, target = 65 mm (6.5 cm), tolerance 3.25 mm.

```
DAILY = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 22, 33, 44, 58, 67, 72, 88, 97, 102, 28, 63]  // sab <= 110 mm taaki phone par bhi measure ho
```


## 6.9 Fit Checker ka logic

- Cheez ke 3 dimension aur jagah ke 3 dimension, dono ko mm mein badlo.
- Dono ko chhote se bade order mein sort karo. Cheez tab aayegi jab sorted cheez[i] + gap <= sorted jagah[i] teeno i ke liye.
- Kam (short) = max(0, cheez[i] + gap - jagah[i]).  Bacha hua (spare) = max(0, jagah[i] - cheez[i] - gap).
- Ye box ko seedha (axes ke saath) rakh kar ghumane (rotate 90 degree) wala check hai. Tirchha karke fit hone wala nahi (v2).


## 6.10 Units

| Unit | mm mein | Dikhana |
|---|---|---|
| mm | 1 | 10 mm se kam: 2 decimal tak; 10 se 100 tak: 1 decimal |
| cm | 10 | 100 mm se 1000 mm tak: 1 decimal |
| m | 1000 | 1000 mm se upar: 2 decimal tak |
| in | 25.4 | Ruler tool mein |
| ft | 304.8 | Fit tool mein |

Dikhane ke examples (fmtMm): 0.76 -> "0.76 mm";  85.6 -> "85.6 mm";  297 -> "29.7 cm";  2100 -> "2.1 m";  3048 -> "3.05 m";  20120 -> "20.12 m". Peeche ke zero hata do (5.00 nahi, 5).


---

# 7. Characters, effects, sound


## 7.1 Characters

| Naam | Kaun hai | Kab dikhta hai | Rang |
|---|---|---|---|
| Naapu | Chhota lakdi ka ruler, aankhein aur muh wala. Game ka host | Splash, Home, Reveal, Summary | mustard body, ink outline |
| Fita | Tape-measure wali ghonghi (snail). Hint deti hai | Hint dabane par (thinking pose) | sky shell, blush body |
| Chhotu | Ek paperclip dost, chhota. Khushi mein uchhalta hai | Reveal par jab guess >= 90 | steel #9AA5AD wire + ink |
| Gaj Baba | Lamba yardstick boss, moochh wala | World 7 aur 8 ke intro par | wood #B9783F + ink |


## 7.2 Naapu ka poora SVG code

Size 120 x 164. 5 expressions: idle, happy, sad, think, wow. Ye function ek SVG string deta hai; `chars.js` mein rakho.

```
const INK = '#2B2118';
export function naapu(expr = 'idle'){
  const eyes = {
    idle:  '<circle cx="48" cy="52" r="5"/><circle cx="72" cy="52" r="5"/>',
    happy: `<path d="M42 54 Q48 45 54 54 M66 54 Q72 45 78 54" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`,
    sad:   `<circle cx="48" cy="54" r="5"/><circle cx="72" cy="54" r="5"/><path d="M40 44 L54 48 M80 44 L66 48" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
    think: '<circle cx="50" cy="50" r="5"/><circle cx="74" cy="50" r="5"/>',
    wow:   `<circle cx="48" cy="52" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="72" cy="52" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="48" cy="52" r="2.5"/><circle cx="72" cy="52" r="2.5"/>`
  }[expr];
  const mouth = {
    idle:  `<path d="M52 74 Q60 80 68 74" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    happy: `<path d="M48 70 Q60 88 72 70 Z" fill="${INK}"/>`,
    sad:   `<path d="M52 80 Q60 72 68 80" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    think: `<path d="M54 76 H66" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    wow:   `<ellipse cx="60" cy="78" rx="6" ry="8" fill="${INK}"/>`
  }[expr];
  const up = expr === 'happy' || expr === 'wow';
  const arms = up ? 'M26 92 L8 70 M94 92 L112 70' : 'M26 96 L10 110 M94 96 L110 110';
  const ticks = Array.from({ length: 20 }, (_, i) => {
    const y = 18 + i * 6, len = i % 5 === 0 ? 14 : 8;
    return `<path d="M26 ${y} H${26 + len}"/>`;
  }).join('');
  return `<svg viewBox="0 0 120 164" width="120" height="164" role="img" aria-label="Naapu ${expr}">
    <g fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"><path d="${arms}"/></g>
    <rect x="40" y="144" width="14" height="14" rx="3" fill="${INK}"/>
    <rect x="66" y="144" width="14" height="14" rx="3" fill="${INK}"/>
    <rect x="26" y="8" width="68" height="138" rx="9" fill="#F3B73B" stroke="${INK}" stroke-width="4"/>
    <g stroke="${INK}" stroke-width="2.5" stroke-linecap="round">${ticks}</g>
    <circle cx="42" cy="64" r="5" fill="#F4A58A"/><circle cx="78" cy="64" r="5" fill="#F4A58A"/>
    <g fill="${INK}">${eyes}</g>${mouth}
  </svg>`;
}
```


## 7.3 Doosre characters (shape list)

| Character | Shapes (viewBox 0 0 120 120 maan kar) |
|---|---|
| Fita (snail) | Shell: circle cx60 cy58 r30 fill sky, stroke ink 4. Spiral: path 'M60 58 a6 6 0 1 1 6 6 a12 12 0 1 1 -12 -12 a18 18 0 1 1 18 18' stroke ink 3, no fill. Body: ellipse cx52 cy98 rx36 ry12 fill blush, stroke ink 4. Head: circle cx24 cy88 r12 fill blush. Eye stalks: do lines (20,78)-(16,62) aur (28,78)-(32,62), tips par circles r4 ink. Tape pattern shell ke kinare 6 chhote tick lines. |
| Chhotu (paperclip) | Wire path: 'M40 20 V90 a20 20 0 0 0 40 0 V30 a10 10 0 0 0 -20 0 V84', stroke #9AA5AD width 8 round, upar outline ink width 3 (do baar draw: pehle ink width 14, phir steel width 8). Aankhein: do circles r3.5 ink at (50,92) aur (70,92). Muh: chhota arc 'M54 102 Q60 108 66 102'. |
| Gaj Baba (yardstick) | Body: rect x10 y40 w100 h36 rx6 fill wood, stroke ink 4. Ticks upar ki edge par har 8 px (lambai 8/14 alternate). Aankhein: do circles r4.5 at (44,58) aur (76,58). Moochh: path 'M44 66 Q60 76 76 66 Q60 70 44 66' fill ink. Bhwein: do tilted lines (36,48)-(52,52) aur (84,48)-(68,52). |

Fita aur Chhotu ke bhi do expressions: idle aur happy/think (aankhein/muh ka swap, Naapu jaisa). Sab ka aspect hand-drawn lage, isliye `stroke-linecap: round` aur `stroke-linejoin: round`.


## 7.4 Expression kab lagta hai

| Moment | Naapu expression | Extra |
|---|---|---|
| Splash | idle | bob |
| Guess screen | think | Hint par Fita bhi aata hai |
| Reveal, guessPts >= 90 | happy (haath upar) | confetti 36, Chhotu uchhalta |
| Reveal, 50..89 | idle | kuch nahi |
| Reveal, < 50 | sad | shake 240ms |
| Summary 3 stars | wow | confetti 60 |
| Summary 0 stars | sad | kuch nahi |
| Level up | happy | stamp LEVEL N, confetti 60 |
| Daily sahi | happy | stamp MIL GAYA |
| Daily galat | sad | farq mm mein dikhao |
| Fit: aayega / nahi aayega | happy / sad |  |


## 7.5 Idle bob aur blink

- Bob: character ka wrapper `animation: bob 500ms steps(2) infinite alternate` jahan bob: translateY(0) to translateY(-4px).
- Blink: har 3000 se 5000 ms (random) par aankhein 120 ms ke liye 'happy' wali line-aankh ban jati hain, phir wapas. Sirf idle aur think par.


## 7.6 Paper texture (koi image file nahi)

```
export function makePaper(){
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#F6EFDC'; g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 260; i++){
    g.fillStyle = Math.random() < .5 ? 'rgba(43,33,24,.05)' : 'rgba(255,255,255,.35)';
    g.fillRect((Math.random() * 128) | 0, (Math.random() * 128) | 0, 1 + ((Math.random() * 2) | 0), 1);
  }
  document.body.style.backgroundImage = 'url(' + c.toDataURL() + ')';
}
```


## 7.7 Sound (WebAudio, mp3 nahi)

| Naam | Kab | Notes (Hz, ms, wave) |
|---|---|---|
| tap | Har button press | 520 Hz, 40 ms, square, vol 0.06 |
| ok | Reveal 50..89 | 523 Hz 90 ms, phir 784 Hz 120 ms (90 ms baad), square |
| great | Reveal >= 90, daily sahi | 523, 659, 784, 1047 Hz, har 90 ms, 80 ms gap, square |
| bad | Reveal < 50 | 196 Hz 120 ms, phir 147 Hz 200 ms (110 ms baad), sawtooth, vol 0.05 |
| star | Har star stamp | 880 Hz, 120 ms, sine; har agle star par +110 Hz |
| levelup | Level up | 523, 659, 784, 1047, 1319 Hz, har 100 ms, 90 ms gap, square |
| lock | Locked item par tap | 130 Hz, 100 ms, square, vol 0.05 |

```
let ctx = null;
const audio = () => ctx || (ctx = new (window.AudioContext || window.webkitAudioContext)());
export function beep(freq, ms, type = 'square', vol = 0.06, delayMs = 0){
  if (!state.get().settings.sound) return;
  const c = audio(), t0 = c.currentTime + delayMs / 1000;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + ms / 1000);
  o.connect(g); g.connect(c.destination);
  o.start(t0); o.stop(t0 + ms / 1000 + 0.02);
}
export const SFX = {
  tap:   () => beep(520, 40),
  ok:    () => { beep(523, 90); beep(784, 120, 'square', .06, 90); },
  great: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 90, 'square', .06, i * 80)),
  bad:   () => { beep(196, 120, 'sawtooth', .05); beep(147, 200, 'sawtooth', .05, 110); },
  star:  n => beep(880 + 110 * n, 120, 'sine', .07)
};
```

> **Note:** AudioContext sirf pehle user tap ke baad banao (browser rule). `audio()` pehli beep par hi bana deta hai, jo user tap se hi chalti hai.


## 7.8 Haptics

| Moment | navigator.vibrate |
|---|---|
| Button press | 8 |
| Ruler har 5 mm | 5 |
| Reveal sahi (>=90) | [20, 40, 20] |
| Reveal bura (<50) | 60 |
| Level up | [30, 50, 30, 50, 60] |

Sirf jab settings mein haptics ON ho aur `navigator.vibrate` maujood ho. iPhone Safari mein ye kaam nahi karta, isliye kuch na ho to chalega.


## 7.9 Confetti, shake, pop (poora code)

```
export function confetti(n = 36){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const host = document.getElementById('fx');      // position:fixed; inset:0; pointer-events:none; z-index:40
  const colors = ['#E4572E', '#F3B73B', '#4C9F70', '#6FB1D6', '#2B2118'];
  for (let i = 0; i < n; i++){
    const s = document.createElement('i');
    s.style.cssText = 'position:absolute;left:50%;top:40%;width:8px;height:5px;background:' + colors[i % 5];
    host.appendChild(s);
    const dx = (Math.random() - .5) * 420, up = 80 + Math.random() * 120;
    const fall = 200 + Math.random() * 320, rot = (Math.random() - .5) * 900;
    s.animate([
      { transform: 'translate(0,0) rotate(0)' },
      { transform: `translate(${dx * .6}px,${-up}px) rotate(${rot * .4}deg)`, offset: .35 },
      { transform: `translate(${dx}px,${fall}px) rotate(${rot}deg)` }
    ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => s.remove();
  }
}
export function shake(el){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  el.animate({ transform: ['translateX(0)', 'translateX(-4px)', 'translateX(4px)', 'translateX(-3px)', 'translateX(3px)', 'translateX(0)'] },
             { duration: 240 });
}
export function pop(el){
  el.animate({ transform: ['scale(.4)', 'scale(1.25)', 'scale(1)'] }, { duration: 320, easing: 'cubic-bezier(.2,.7,.4,1)' });
}
```


## 7.10 Count-up (score ginti)

```
export function countUp(el, to, ms = 600){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = to; return; }
  const t0 = performance.now();
  (function tick(now){
    const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);   // ease-out
    el.textContent = Math.round(to * e);
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}
```


---

# 8. Data aur save system


## 8.1 Kya save hota hai

Sab kuch ek JSON object mein, browser ki localStorage mein, key **naapu.v1**. Koi server nahi, koi login nahi. Agar user browser data saaf kare ya doosra phone use kare, to progress chali jayegi (v1 mein theek hai; Settings mein ye batana hai).

```
{
  "v": 1,
  "calib":   { "pxPerMm": 6.02, "dpr": 3, "sig": "390x844x3" },
  "settings":{ "sound": true, "haptics": true, "units": "cm" },
  "xp": 161,
  "worlds":  { "w1": { "best": 612, "stars": 2, "plays": 3 } },
  "daily":   { "lastDay": "2026-10-06", "streak": 4, "best": 9,
               "done": { "2026-10-06": { "measuredMm": 66, "ok": true } } },
  "stats":   { "rounds": 45, "sumErrPct": 639, "bestRoundPts": 151, "perfects": 6 },
  "seenIntro": true
}
```

| Field | Type | Matlab |
|---|---|---|
| v | number | Schema version. Abhi 1. |
| calib.pxPerMm | number ya null | null = calibrate nahi hua |
| calib.dpr | number | calibrate karte waqt devicePixelRatio |
| calib.sig | string | device signature: chhoti_screen x badi_screen x dpr |
| settings.units | 'mm'\|'cm'\|'in' | Ruler tool ka default unit |
| xp | number | Kul XP |
| worlds[id] | object | best score, best stars, kitni baar khela |
| daily.lastDay | 'YYYY-MM-DD' ya null | Aakhri baar kab sahi kiya |
| daily.done | object | Din key -> result (sirf pichhle 60 din rakho) |
| stats.sumErrPct | number | Sab rounds ka farq % ka jod; average = sumErrPct / rounds |
| stats.perfects | number | Kitne rounds mein guess points >= 98 |


## 8.2 Rules

- Har change ke turant baad save() call karo (sirf chhota JSON, mehnga nahi).
- load() mein default state par saved state deep-merge hoti hai, taaki naye fields purane saves mein bhi aa jayein.
- localStorage error de (private mode) to memory mein chalao aur Home par ek baar toast: "Progress save nahi hoga".
- Agar saved v > 1 (future) ho to usse maano nahi, default se shuru (data mat mitao, bas read-only ignore).
- Future migration: if (s.v === 1) { ...badlo...; s.v = 2; }  Har version ke liye ek chhota block.


## 8.3 state.js (poora code)

```
const KEY = 'naapu.v1';
const DEFAULT = {
  v: 1,
  calib: { pxPerMm: null, dpr: null, sig: null },
  settings: { sound: true, haptics: true, units: 'cm' },
  xp: 0,
  worlds: {},
  daily: { lastDay: null, streak: 0, best: 0, done: {} },
  stats: { rounds: 0, sumErrPct: 0, bestRoundPts: 0, perfects: 0 },
  seenIntro: false
};
let mem = null;

function merge(base, extra){
  for (const k in extra){
    if (extra[k] && typeof extra[k] === 'object' && !Array.isArray(extra[k]) && base[k] && typeof base[k] === 'object')
      merge(base[k], extra[k]);
    else base[k] = extra[k];
  }
  return base;
}
export function load(){
  mem = structuredClone(DEFAULT);
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) merge(mem, JSON.parse(raw));
  } catch (e) { /* private mode ya kharab JSON: default se chalo */ }
  return mem;
}
export function save(){ try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} }
export const get = () => mem;
export function reset(){ try { localStorage.removeItem(KEY); } catch (e) {} load(); }
```


---

# 9. Code reference aur test numbers

Ye files ka **pura asli logic** hai. AI ko bolo: "isko exact aise hi rakho, sirf style/comment badal sakte ho." Har function ke neeche tests.html ke numbers hain; agar AI ka code in numbers se match na kare to AI galat hai.


## 9.1 units.js

```
export const UNITS = { mm: 1, cm: 10, m: 1000, in: 25.4, ft: 304.8 };
export const toMm   = (v, u) => v * UNITS[u];
export const fromMm = (mm, u) => mm / UNITS[u];

const trim = (n, d) => String(Math.round(n * 10 ** d) / 10 ** d);
export function fmtMm(mm){
  if (mm < 10)   return trim(mm, 2) + ' mm';
  if (mm < 100)  return trim(mm, 1) + ' mm';
  if (mm < 1000) return trim(mm / 10, 1) + ' cm';
  return trim(mm / 1000, 2) + ' m';
}
```


## 9.2 score.js

```
import { TITLES } from './data.js';

export function guessPoints(guessMm, trueMm){
  const err = Math.abs(guessMm - trueMm) / trueMm;
  if (err <= 0.02) return 100;
  if (err >= 0.5)  return 0;
  return Math.round(100 * (1 - (err - 0.02) / 0.48));
}
export function measureBonus(measuredMm, trueMm, tolMul = 1){
  const err = Math.abs(measuredMm - trueMm) / trueMm;
  if (err <= 0.03 * tolMul) return 30;
  if (err <= 0.06 * tolMul) return 15;
  return 0;
}
export function comboMultiplier(streak){
  if (streak >= 4) return 2.0;
  if (streak === 3) return 1.5;
  if (streak === 2) return 1.2;
  return 1.0;
}
export function scoreRound(guessMm, trueMm, measuredMm, streakBefore, hintUsed = false, approx = false){
  let g = guessPoints(guessMm, trueMm);
  if (hintUsed) g = Math.max(0, g - 10);
  const bonus = measuredMm == null ? 0 : measureBonus(measuredMm, trueMm, approx ? 2 : 1);
  const streakAfter = g >= 70 ? streakBefore + 1 : 0;
  const mult = comboMultiplier(streakAfter);
  return { guessPts: g, bonus, streakAfter, mult, total: Math.round((g + bonus) * mult) };
}
export const starsFor = total => total >= 700 ? 3 : total >= 450 ? 2 : total >= 200 ? 1 : 0;
export const xpGain   = total => Math.round(total / 10);
export function levelFor(xp){
  let lv = 1;
  for (const [l, , need] of TITLES) if (xp >= need) lv = l;
  return lv;
}
```


## 9.3 fit.js

```
export function fitCheck(itemMm, spaceMm, gapMm = 0){
  const a = [...itemMm].sort((x, y) => x - y);
  const b = [...spaceMm].sort((x, y) => x - y);
  const short = a.map((v, i) => Math.max(0, v + gapMm - b[i]));
  const spare = a.map((v, i) => Math.max(0, b[i] - v - gapMm));
  return { fits: short.every(s => s === 0), short, spare, itemSorted: a, spaceSorted: b };
}
```


## 9.4 daily.js

```
import { DAILY } from './data.js';
const EPOCH = Date.UTC(2026, 0, 1);

export function dayIndex(d = new Date()){
  const utcOfLocalDate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((utcOfLocalDate - EPOCH) / 86400000);
}
export const dailyTarget    = (d = new Date()) => DAILY[((dayIndex(d) % 30) + 30) % 30];
export const dailyTolerance = t => Math.max(3, t * 0.05);
export const dailyOk        = (measured, target) => Math.abs(measured - target) <= dailyTolerance(target);
export function dayKey(d = new Date()){
  const m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + m + '-' + day;
}
export const keyOffset = (d, days) => dayKey(new Date(d.getFullYear(), d.getMonth(), d.getDate() + days));

export function applyDailySuccess(daily, todayKey, yesterdayKey){
  if (daily.lastDay === todayKey) return daily;          // aaj pehle hi ho chuka
  daily.streak = daily.lastDay === yesterdayKey ? daily.streak + 1 : 1;
  daily.best = Math.max(daily.best, daily.streak);
  daily.lastDay = todayKey;
  return daily;
}
```


## 9.5 calib.js

```
import * as state from './state.js';
export const CARD_MM = 85.6, CARD_SHORT_MM = 53.98;
export const pxPerMmFromCard = longPx => longPx / CARD_MM;
export const isPlausible = p => p >= 2.5 && p <= 14;
export const longAxis = () => innerWidth >= innerHeight ? 'x' : 'y';
export const maxMeasureMm = (pxPerMm, axisPx) => Math.floor((axisPx - 200) / pxPerMm);
export const deviceSig = () =>
  Math.min(screen.width, screen.height) + 'x' + Math.max(screen.width, screen.height) + 'x' + devicePixelRatio;

export function viewOk(){
  const c = state.get().calib;
  if (!c.pxPerMm) return false;
  const zoomed = window.visualViewport && Math.abs(visualViewport.scale - 1) > 0.01;
  const dprMoved = c.dpr && Math.abs(devicePixelRatio - c.dpr) > 0.01;
  const sigBad = c.sig && c.sig !== deviceSig();
  return !zoomed && !dprMoved && !sigBad;
}
```


## 9.6 ruler.js

```
const ZERO = 40;                          // 0 mm canvas ke start se 40 px andar
const rng = seed => () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

export function drawTicks(canvas, { pxPerMm, vertical, lengthMm }){
  const dpr = devicePixelRatio || 1, thick = 64;
  const long = Math.ceil(ZERO + lengthMm * pxPerMm + 20);
  const w = vertical ? thick : long, h = vertical ? long : thick;
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  const g = canvas.getContext('2d'); g.scale(dpr, dpr);
  g.strokeStyle = g.fillStyle = '#2B2118'; g.lineCap = 'round';
  g.font = '14px "Patrick Hand", cursive'; g.textAlign = 'center';
  const rand = rng(7);
  for (let mm = 0; mm <= lengthMm; mm++){
    const p = ZERO + mm * pxPerMm;                       // JAGAH exact, jitter nahi
    const base = mm % 10 === 0 ? 24 : mm % 5 === 0 ? 16 : 9;
    const len = base + (rand() - .5) * 1.2;              // sirf lambai mein +-0.6
    g.lineWidth = mm % 10 === 0 ? 2.2 : 1.4;
    g.beginPath();
    if (vertical){ g.moveTo(0, p); g.lineTo(len, p); } else { g.moveTo(p, 0); g.lineTo(p, len); }
    g.stroke();
    if (mm % 10 === 0 && mm > 0){
      if (vertical) g.fillText(String(mm / 10), len + 14, p + 5);
      else          g.fillText(String(mm / 10), p, len + 16);
    }
  }
}

export function makeRuler(el, { pxPerMm, vertical, maxMm, onChange }){
  let mm = 0;
  const toMm = e => {
    const r = el.getBoundingClientRect();
    const p = vertical ? e.clientY - r.top : e.clientX - r.left;
    return Math.min(maxMm, Math.max(0, Math.round(((p - ZERO) / pxPerMm) * 2) / 2));
  };
  const move = e => { const v = toMm(e); if (v !== mm){ mm = v; onChange(mm); } };
  el.style.touchAction = 'none';
  el.addEventListener('pointerdown', e => { el.setPointerCapture(e.pointerId); move(e); el.addEventListener('pointermove', move); });
  const up = () => el.removeEventListener('pointermove', move);
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  return { get: () => mm, set: v => { mm = v; onChange(mm); } };
}
```


## 9.7 game.js (round ka flow)

```
import { ITEMS } from './data.js';
import { scoreRound, starsFor, xpGain, levelFor } from './score.js';
import * as state from './state.js';

let run = null;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export function startSet(worldId){
  run = { worldId, items: shuffle(ITEMS.filter(i => i.world === worldId)),
          idx: 0, streak: 0, total: 0, rounds: [], hintUsed: false };
  return run.items[0];
}
export const current = () => run.items[run.idx];
export const info = () => ({ idx: run.idx, of: run.items.length, streak: run.streak, total: run.total });
export function useHint(){ run.hintUsed = true; return current().hint; }

export function submit(guessMm, measuredMm = null){
  const it = current();
  const r = scoreRound(guessMm, it.mm, measuredMm, run.streak, run.hintUsed, it.approx);
  run.streak = r.streakAfter; run.total += r.total;
  run.rounds.push({ id: it.id, guessMm, measuredMm, ...r, errPct: Math.abs(guessMm - it.mm) / it.mm * 100 });
  run.hintUsed = false;
  return r;
}
export function next(){ run.idx++; return run.idx < run.items.length; }   // false = set khatam

export function finish(){
  const s = state.get(), oldLevel = levelFor(s.xp);
  const stars = starsFor(run.total), xp = xpGain(run.total);
  const w = s.worlds[run.worldId] || (s.worlds[run.worldId] = { best: 0, stars: 0, plays: 0 });
  w.best = Math.max(w.best, run.total); w.stars = Math.max(w.stars, stars); w.plays++;
  s.xp += xp;
  for (const r of run.rounds){
    s.stats.rounds++; s.stats.sumErrPct += r.errPct;
    s.stats.bestRoundPts = Math.max(s.stats.bestRoundPts, r.total);
    if (r.guessPts >= 98) s.stats.perfects++;
  }
  state.save();
  return { total: run.total, stars, xp, level: levelFor(s.xp), levelUp: levelFor(s.xp) > oldLevel };
}
export function worldUnlocked(idx, worlds){            // idx 0..7
  if (idx === 0) return true;
  const prev = worlds['w' + idx];
  return !!prev && prev.stars >= 1;
}
```


## 9.8 data.js

Items ki array neeche hai. WORLDS, DAILY aur TITLES bhi isi file mein jaate hain (Chapter 6 ki tables se). Is code mein sikke ke naam mein "Rs" ki jagah "₹" likh sakte ho.

```
export const ITEMS = [
  { id:'w1-1', world:'w1', name:'Rs 1 ka sikka', part:'diameter', mm:22.0, approx:false, hint:'Rs 1/2/5/10 mein sabse chhota.' },
  { id:'w1-2', world:'w1', name:'Rs 2 ka sikka', part:'diameter', mm:25.0, approx:false, hint:'Rs 5 ke sikke se bhi bada hai.' },
  { id:'w1-3', world:'w1', name:'Rs 5 ka sikka', part:'diameter', mm:23.0, approx:false, hint:'Rs 2 se chhota, Rs 1 se bada.' },
  { id:'w1-4', world:'w1', name:'Rs 10 ka sikka', part:'diameter', mm:27.0, approx:false, hint:'In chaaron mein sabse bada sikka.' },
  { id:'w1-5', world:'w1', name:'Credit / Aadhaar PVC card', part:'lambi side', mm:85.6, approx:false, hint:'ATM card ki lambai jitna.' },
  { id:'w2-1', world:'w2', name:'CR2032 gol battery', part:'diameter', mm:20.0, approx:false, hint:'Ghadi wali battery; Rs 10 sikke se chhoti.' },
  { id:'w2-2', world:'w2', name:'AAA battery', part:'lambai', mm:44.5, approx:true, hint:'AA se thodi chhoti.' },
  { id:'w2-3', world:'w2', name:'9V battery', part:'unchai', mm:48.5, approx:false, hint:'AA battery ke lagbhag barabar lambi.' },
  { id:'w2-4', world:'w2', name:'AA battery', part:'lambai', mm:50.5, approx:true, hint:'Lagbhag 5 cm ke aaspaas.' },
  { id:'w2-5', world:'w2', name:'Taash ka patta (playing card)', part:'lambi side', mm:88.9, approx:false, hint:'Credit card se thoda lamba.' },
  { id:'w3-1', world:'w3', name:'Nano SIM card', part:'lambi side', mm:12.3, approx:false, hint:'1.5 cm se bhi chhota.' },
  { id:'w3-2', world:'w3', name:'USB-A plug (metal hissa)', part:'chaudai', mm:12.0, approx:false, hint:'Pen drive ke metal ki chaudai.' },
  { id:'w3-3', world:'w3', name:'Rubik\'s cube (3x3)', part:'ek side', mm:56.0, approx:false, hint:'5 cm se thodi si zyada.' },
  { id:'w3-4', world:'w3', name:'CD / DVD', part:'diameter', mm:120.0, approx:false, hint:'Credit card ki lambai se bada.' },
  { id:'w3-5', world:'w3', name:'Credit card ki motai', part:'motai', mm:0.76, approx:false, hint:'Ek mm se bhi patla.' },
  { id:'w4-1', world:'w4', name:'A6 kaagaz', part:'chhoti side', mm:105.0, approx:false, hint:'Postcard jaisa chhota kaagaz.' },
  { id:'w4-2', world:'w4', name:'A6 kaagaz', part:'lambi side', mm:148.0, approx:false, hint:'A5 ki chhoti side ke barabar.' },
  { id:'w4-3', world:'w4', name:'A4 kaagaz', part:'chhoti side', mm:210.0, approx:false, hint:'A5 ki lambi side ke barabar.' },
  { id:'w4-4', world:'w4', name:'A4 kaagaz', part:'lambi side', mm:297.0, approx:false, hint:'A3 ki chhoti side ke barabar.' },
  { id:'w4-5', world:'w4', name:'A3 kaagaz', part:'lambi side', mm:420.0, approx:false, hint:'A4 ki lambi side ka lagbhag 1.4 guna.' },
  { id:'w5-1', world:'w5', name:'Golf ball', part:'diameter', mm:42.7, approx:false, hint:'Ping-pong ball se thodi badi.' },
  { id:'w5-2', world:'w5', name:'Table tennis (ping-pong) ball', part:'diameter', mm:40.0, approx:false, hint:'Golf ball se thodi si chhoti.' },
  { id:'w5-3', world:'w5', name:'Tennis ball', part:'diameter', mm:67.0, approx:true, hint:'Cricket ball se thodi chhoti.' },
  { id:'w5-4', world:'w5', name:'Cricket ball', part:'diameter', mm:72.0, approx:true, hint:'Tennis ball se thodi badi.' },
  { id:'w5-5', world:'w5', name:'Football (size 5)', part:'diameter', mm:220.0, approx:true, hint:'Cricket ball ka lagbhag teen guna.' },
  { id:'w6-1', world:'w6', name:'Rs 10 ka note', part:'lambai', mm:123.0, approx:false, hint:'Is set ka sabse chhota note.' },
  { id:'w6-2', world:'w6', name:'Rs 50 ka note', part:'lambai', mm:135.0, approx:false, hint:'Rs 10 se lamba, Rs 100 se chhota.' },
  { id:'w6-3', world:'w6', name:'Rs 100 ka note', part:'lambai', mm:142.0, approx:false, hint:'Rs 50 se lamba, Rs 500 se chhota.' },
  { id:'w6-4', world:'w6', name:'Rs 500 ka note', part:'lambai', mm:150.0, approx:false, hint:'Rs 100 note se lamba.' },
  { id:'w6-5', world:'w6', name:'1 US dollar ka note', part:'lambai', mm:156.0, approx:false, hint:'Is set ka sabse lamba note.' },
  { id:'w7-1', world:'w7', name:'Tennis racket (standard)', part:'lambai', mm:686.0, approx:true, hint:'Stump ki unchai ke lagbhag barabar.' },
  { id:'w7-2', world:'w7', name:'Cricket stump', part:'unchai', mm:711.0, approx:false, hint:'Bat se chhota.' },
  { id:'w7-3', world:'w7', name:'A1 kaagaz', part:'lambi side', mm:841.0, approx:false, hint:'A3 ki lambi side ka lagbhag 2 guna.' },
  { id:'w7-4', world:'w7', name:'Cricket bat (sabse lamba allowed)', part:'lambai', mm:965.0, approx:false, hint:'Stump se lamba, par ek meter se kam.' },
  { id:'w7-5', world:'w7', name:'Ghar ka darwaza (aam)', part:'unchai', mm:2100.0, approx:true, hint:'Lamba aadmi bina jhuke nikal sake.' },
  { id:'w8-1', world:'w8', name:'Basketball hoop', part:'zameen se unchai', mm:3048.0, approx:false, hint:'Ek manzil (floor) ki unchai ke aaspaas.' },
  { id:'w8-2', world:'w8', name:'Football goal', part:'chaudai', mm:7320.0, approx:false, hint:'Basketball hoop ki unchai ka lagbhag 2.4 guna.' },
  { id:'w8-3', world:'w8', name:'Badminton court', part:'lambai', mm:13400.0, approx:false, hint:'Cricket pitch se chhota.' },
  { id:'w8-4', world:'w8', name:'Cricket pitch', part:'lambai', mm:20120.0, approx:false, hint:'Tennis court ki lambai se chhota.' },
  { id:'w8-5', world:'w8', name:'Tennis court', part:'lambai', mm:23770.0, approx:false, hint:'Cricket pitch se lamba.' },
];
```

```
export const WORLDS = [
  { id:'w1', name:'Jeb ke Sikke', about:'Sikke aur card: sabse aasan shuruaat' },
  { id:'w2', name:'Battery Bazaar', about:'Chhoti batteries aur ek playing card' },
  { id:'w3', name:'Gadget Dabba', about:'SIM, USB, cube, CD aur ek bahut patla card' },
  { id:'w4', name:'Kaagaz Mela', about:'A6 se A3 tak ke kaagaz' },
  { id:'w5', name:'Khel ke Gole', about:'Alag alag khel ki gendein' },
  { id:'w6', name:'Note Ginti', about:'Paise ke note: sab ki size bahut paas paas' },
  { id:'w7', name:'Bade Naap', about:'Cricket, tennis aur darwaza' },
  { id:'w8', name:'Bahut Bade', about:'Maidan aur court ki lambai' }
];
export const DAILY  = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 22, 33, 44, 58, 67, 72, 88, 97, 102, 28, 63];
export const TITLES = [[1,'Andaaza Newbie',0], [2,'Inch Inch Seekhu',100], [3,'Cm ka Dost',250], [4,'Mm ka Shagird',450], [5,'Gaj Wala',700], [6,'Naap Ustaad',1000], [7,'Tape Guru',1400], [8,'Maap Maharaja',2000]];
```


## 9.9 index.html ka skeleton

```
<!doctype html>
<html lang="hi-Latn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#F6EFDC">
  <title>Naapu</title>
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/screens.css">
</head>
<body>
  <main>
    <section id="s-splash"></section>   <section id="s-calib" hidden></section>
    <section id="s-home" hidden></section>   <section id="s-world" hidden></section>
    <section id="s-guess" hidden></section>  <section id="s-measure" hidden></section>
    <section id="s-reveal" hidden></section> <section id="s-summary" hidden></section>
    <section id="s-daily" hidden></section>  <section id="s-fit" hidden></section>
    <section id="s-tool" hidden></section>   <section id="s-profile" hidden></section>
    <section id="s-settings" hidden></section>
  </main>
  <div id="fx" aria-hidden="true"></div>
  <div id="live" class="sr-only" aria-live="polite"></div>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

> **Note:** Zoom ko disable mat karo (maximum-scale=1 mat lagao): accessibility kharab hoti hai. Hum zoom detect karke calibration invalid mark karte hain.


## 9.10 main.js, sw.js, manifest

```
// main.js
import * as state from './state.js';
import * as router from './router.js';
import { makePaper } from './fx.js';
import './screens/splash.js'; import './screens/calibrate.js'; import './screens/home.js';
import './screens/world.js';  import './screens/guess.js';     import './screens/measure.js';
import './screens/reveal.js'; import './screens/summary.js';   import './screens/daily.js';
import './screens/fit.js';    import './screens/tool.js';      import './screens/profile.js';
import './screens/settings.js';
state.load(); makePaper(); router.start();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
```

```
// sw.js  (har release par V badlo, warna purana cache chalega)
const V = 'naapu-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './assets/PatrickHand-Regular.ttf',
  './css/base.css', './css/components.css', './css/screens.css',
  './js/main.js', './js/router.js', './js/state.js', './js/data.js', './js/units.js', './js/score.js',
  './js/fit.js', './js/daily.js', './js/calib.js', './js/ruler.js', './js/game.js', './js/ui.js',
  './js/fx.js', './js/chars.js', './js/screens/splash.js', './js/screens/calibrate.js',
  './js/screens/home.js', './js/screens/world.js', './js/screens/guess.js', './js/screens/measure.js',
  './js/screens/reveal.js', './js/screens/summary.js', './js/screens/daily.js', './js/screens/fit.js',
  './js/screens/tool.js', './js/screens/profile.js', './js/screens/settings.js'];
self.addEventListener('install', e => e.waitUntil(
  caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
```

```
{ "name": "Naapu", "short_name": "Naapu", "start_url": "./index.html", "display": "standalone",
  "background_color": "#F6EFDC", "theme_color": "#F6EFDC",
  "icons": [ { "src": "assets/icon-192.png", "sizes": "192x192", "type": "image/png" },
             { "src": "assets/icon-512.png", "sizes": "512x512", "type": "image/png" } ] }
```

> **Note:** Ye ek exception hai: 'koi image file nahi' rule mein sirf do app icons (192 aur 512 PNG) allowed hain. Naapu ka happy SVG kisi online SVG-to-PNG converter se ek baar PNG bana lo, ya v1 mein icons chhod do (tab install option kuch browsers mein nahi aayega).


## 9.11 tests.html: sab test numbers

Is file ko browser mein kholo (Live Server se). Aakhir mein "SAB PASS" dikhna chahiye. Ye test cases expected answer ke saath hain. Tie wale numbers (jaise exactly x.5 par rounding) jaan boojh kar nahi rakhe.

```
<!doctype html><meta charset="utf-8"><title>tests</title><pre id="o"></pre>
<script type="module">
import { guessPoints, measureBonus, comboMultiplier, scoreRound, starsFor, xpGain, levelFor } from './js/score.js';
import { fitCheck } from './js/fit.js';
import { dayIndex, dailyTarget, dailyTolerance, dailyOk, dayKey, applyDailySuccess } from './js/daily.js';
import { toMm, fromMm, fmtMm } from './js/units.js';
import { pxPerMmFromCard, isPlausible, maxMeasureMm } from './js/calib.js';

const T = [
 // [naam, kya chalana hai, expected]
 ['guess 100/100',   () => guessPoints(100, 100), 100],
 ['guess 102/100',   () => guessPoints(102, 100), 100],
 ['guess 103/100',   () => guessPoints(103, 100), 98],
 ['guess 105/100',   () => guessPoints(105, 100), 94],
 ['guess 110/100',   () => guessPoints(110, 100), 83],
 ['guess 115/100',   () => guessPoints(115, 100), 73],
 ['guess 75/100',    () => guessPoints(75, 100), 52],
 ['guess 130/100',   () => guessPoints(130, 100), 42],
 ['guess 60/100',    () => guessPoints(60, 100), 21],
 ['guess 150/100',   () => guessPoints(150, 100), 0],
 ['guess 50/100',    () => guessPoints(50, 100), 0],
 ['guess 23.5/23',   () => guessPoints(23.5, 23), 100],
 ['guess 1/0.76',    () => guessPoints(1, 0.76), 38],
 ['bonus exact',     () => measureBonus(85.6, 85.6), 30],
 ['bonus 86.5',      () => measureBonus(86.5, 85.6), 30],
 ['bonus 89.5',      () => measureBonus(89.5, 85.6), 15],
 ['bonus 95',        () => measureBonus(95, 85.6), 0],
 ['bonus 3% edge',   () => measureBonus(103, 100), 30],
 ['bonus approx 53', () => measureBonus(53, 50.5, 2), 30],
 ['bonus normal 53', () => measureBonus(53, 50.5, 1), 15],
 ['combo 0,1',       () => [comboMultiplier(0), comboMultiplier(1)], [1, 1]],
 ['combo 2,3',       () => [comboMultiplier(2), comboMultiplier(3)], [1.2, 1.5]],
 ['combo 4,9',       () => [comboMultiplier(4), comboMultiplier(9)], [2, 2]],
 ['round A', () => scoreRound(110, 100, null, 0), { guessPts: 83, bonus: 0, streakAfter: 1, mult: 1, total: 83 }],
 ['round B', () => scoreRound(75, 100, null, 1),  { guessPts: 52, bonus: 0, streakAfter: 0, mult: 1, total: 52 }],
 ['round C', () => scoreRound(100, 100, 100, 3),  { guessPts: 100, bonus: 30, streakAfter: 4, mult: 2, total: 260 }],
 ['round D', () => scoreRound(103, 100, null, 2), { guessPts: 98, bonus: 0, streakAfter: 3, mult: 1.5, total: 147 }],
 ['round E', () => scoreRound(110, 100, 104, 1),  { guessPts: 83, bonus: 15, streakAfter: 2, mult: 1.2, total: 118 }],
 ['round F hint', () => scoreRound(110, 100, null, 0, true),  { guessPts: 73, bonus: 0, streakAfter: 1, mult: 1, total: 73 }],
 ['round G hint', () => scoreRound(115, 100, null, 0, true),  { guessPts: 63, bonus: 0, streakAfter: 0, mult: 1, total: 63 }],
 ['stars', () => [199, 200, 449, 450, 699, 700, 770].map(starsFor), [0, 1, 1, 2, 2, 3, 3]],
 ['xp',    () => [0, 612, 1001].map(xpGain), [0, 61, 100]],
 ['level', () => [0, 99, 100, 249, 250, 450, 700, 1000, 1400, 1999, 2000, 99999].map(levelFor), [1, 1, 2, 2, 3, 4, 5, 6, 7, 7, 8, 8]],
 ['fit T1', () => fitCheck([300, 200, 100], [350, 250, 120]), { fits: true, short: [0, 0, 0], spare: [20, 50, 50], itemSorted: [100, 200, 300], spaceSorted: [120, 250, 350] }],
 ['fit T2', () => fitCheck([400, 300, 100], [350, 250, 120]).fits, false],
 ['fit T2 short', () => fitCheck([400, 300, 100], [350, 250, 120]).short, [0, 50, 50]],
 ['fit T3 gap', () => fitCheck([100, 200, 300], [110, 250, 350], 10).fits, true],
 ['fit T3 spare', () => fitCheck([100, 200, 300], [110, 250, 350], 10).spare, [0, 40, 40]],
 ['fit T4', () => fitCheck([100, 100, 100], [99, 500, 500]).short, [1, 0, 0]],
 ['dayIndex 2026-01-01', () => dayIndex(new Date(2026, 0, 1)), 0],
 ['dayIndex 2026-10-07', () => dayIndex(new Date(2026, 9, 7)), 279],
 ['dayIndex 2027-01-01', () => dayIndex(new Date(2027, 0, 1)), 365],
 ['daily target 10-07',  () => dailyTarget(new Date(2026, 9, 7)), 65],
 ['daily target 12-31',  () => dailyTarget(new Date(2026, 11, 31)), 40],
 ['daily tol',  () => [dailyTolerance(20), dailyTolerance(65), dailyTolerance(110)], [3, 3.25, 5.5]],
 ['daily ok',   () => [dailyOk(68, 65), dailyOk(68.5, 65), dailyOk(17, 20)], [true, false, true]],
 ['dayKey',     () => dayKey(new Date(2026, 9, 7)), '2026-10-07'],
 ['streak +1',  () => applyDailySuccess({ lastDay: '2026-10-06', streak: 3, best: 5 }, '2026-10-07', '2026-10-06'), { lastDay: '2026-10-07', streak: 4, best: 5 }],
 ['streak reset', () => applyDailySuccess({ lastDay: '2026-10-01', streak: 3, best: 3 }, '2026-10-07', '2026-10-06'), { lastDay: '2026-10-07', streak: 1, best: 3 }],
 ['streak same',  () => applyDailySuccess({ lastDay: '2026-10-07', streak: 4, best: 5 }, '2026-10-07', '2026-10-06'), { lastDay: '2026-10-07', streak: 4, best: 5 }],
 ['fmtMm', () => [0.76, 5, 12.3, 85.6, 99, 100, 297, 2100, 3048, 20120].map(fmtMm),
   ['0.76 mm', '5 mm', '12.3 mm', '85.6 mm', '99 mm', '10 cm', '29.7 cm', '2.1 m', '3.05 m', '20.12 m']],
 ['units', () => [toMm(2.5, 'in'), toMm(3, 'cm'), fromMm(25.4, 'in')].map(x => Math.round(x * 1e6) / 1e6), [63.5, 30, 1]],
 ['calib px', () => Math.round(pxPerMmFromCard(513.6) * 1e6) / 1e6, 6],
 ['plausible', () => [2.4, 2.5, 14, 14.1].map(isPlausible), [false, true, true, false]],
 ['maxMeasure', () => maxMeasureMm(6, 844), 107],
];
let fail = 0, out = [];
for (const [n, f, want] of T){
  const got = f(), ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  out.push((ok ? 'OK   ' : 'FAIL ') + n + (ok ? '' : '   got=' + JSON.stringify(got) + ' want=' + JSON.stringify(want)));
}
document.getElementById('o').textContent = out.join('\n') + '\n\n' + (fail ? fail + ' FAIL' : 'SAB PASS');
</script>
```


---

# 10. Edge cases aur QA


## 10.1 Edge cases (jo aksar bhool jaate hain)

| # | Situation | Kya karna hai |
|---|---|---|
| 1 | Round ke beech phone rotate | Ruler orientation dobara nikalo, ticks dobara draw, marker ki mm value wahi rakho |
| 2 | Browser zoom badla (dpr badla) | Banner zoom.warn + recalibrate button; measure bonus band |
| 3 | Pinch-zoom (visualViewport.scale != 1) | Toast zoom.warn; measure/ruler disable jab tak scale 1 na ho |
| 4 | localStorage band (private mode) | Memory mein chalo; ek baar toast "Progress save nahi hoga" |
| 5 | Calibration nahi hui | Guess-only game chalega. Measure, Daily, Ruler par lock icon + toast lock.calib |
| 6 | Calibration implausible | Save mat karo; calib.bad dikhao |
| 7 | Bahut badi screen (monitor) | maxMeasureMm formula wahi; ruler ki lambai 1000 mm tak cap |
| 8 | Item maxMeasureMm se bada ya 5 mm se chhota | Measure offer dikhao hi mat |
| 9 | Guess 0, negative, NaN ya khali | Min 0.5 mm clamp; invalid par "Pakka!" disabled |
| 10 | "Pakka!" par double tap | Pehle tap par button disable; state guard |
| 11 | Round ke beech back/X | Confirm: "Set chhodna hai? Ye set ka score nahi judega." Haan par home; kuch save nahi |
| 12 | Daily screen khuli hai aur raat 12 baj gaye | Din ka key 'Start' ke waqt ka use karo, submit ke waqt nahi |
| 13 | Phone ka time/timezone badla | Local date hi maano. Cheating rokna v1 ka maksad nahi |
| 14 | Naya version release | sw.js mein V badlo. Naya SW active ho to toast "Naya version. Refresh karo." |
| 15 | Sound pehle tap se pehle | AudioContext tab hi banao jab pehla user tap ho |
| 16 | prefers-reduced-motion | Shake, confetti, count-up, bob band. Enter animation 0ms |
| 17 | Width 320 px se kam | min-width 320; body font 18px; bignum 48px |
| 18 | Desktop keyboard | Marker par Left/Right/Up/Down +-1 mm, Shift +-10 mm; Enter = confirm button |
| 19 | iPhone silent switch | WebAudio kam bajta hai; kuch nahi karna, sirf settings mein note |
| 20 | Same item do baar set mein | Hota hi nahi: ek set mein 5 alag items (world ke exact 5) |


## 10.2 Manual QA checklist

| Check | Kaise | Pass |
|---|---|---|
| Calibration sahi hai | Credit card calibrate karo. Ruler tool mein Rs 10 ka sikka rakho (27 mm). Reading 26.5 se 27.5 aani chahiye |  |
| A4 check | Ruler (desktop) par A4 kaagaz ki chhoti side 210 mm +-1  |  |
| Round poora | World 1 ke 5 round khelo, total aur stars sahi dikhe |  |
| Combo | Lagataar 4 round >= 70 par: multipliers 1.0, 1.2, 1.5, 2.0 |  |
| Unlock | World 1 par >= 1 star pe World 2 khule |  |
| Daily | Aaj sahi karo: streak 1. Device ka date kal par karo: sahi karo: streak 2 |  |
| Fit Checker | T1 aur T2 ke numbers dalo, result tests wale hi aayein |  |
| Offline | Ek baar kholo, airplane mode on karo, dobara kholo, chalna chahiye |  |
| Rotate | Measure screen par phone ghumao, number na bigde |  |
| Reload | Reload karne par progress bani rahe |  |
| Reset | Settings se reset karo, sab shuru se |  |
| Performance | Chrome DevTools > Performance: animation mein dropped frames na hon |  |
| Look check | Forbidden list (2.2) se milao: gradient, blur, purple kuch nahi dikhna chahiye |  |


## 10.3 Kin devices par test karna hai

| Device | Kyun |
|---|---|
| Koi sasta Android phone (Chrome) | Sabse aam device; performance aur calibration |
| iPhone (Safari) | Alag audio/vibrate behaviour |
| Laptop (Chrome) | Desktop layout aur keyboard |
| Tablet (agar ho) | Bada ruler, landscape |


---

# 11. Step-by-step build order (beginner ke liye)


## 11.1 Pehle ye tools lagao (sab free)

- 1. **VS Code** (code editor) aur uski **Live Server** extension.
- 2. **Google Chrome** (DevTools ke liye). Phone par test ke liye usi WiFi par phone se `http://<laptop-ka-IP>:5500` kholo.
- 3. Patrick Hand font: fonts.google.com par "Patrick Hand" search, Download family, `PatrickHand-Regular.ttf` ko `assets/` mein daalo.
- 4. Ek AI coding tool (Claude Code, Cursor ya jo bhi). Is document ki .md file project ke root mein `SPEC.md` naam se rakho.
- 5. (Optional) Git + GitHub account, deploy ke liye.


## 11.2 Kaam ka order

| Step | Kya banana hai | Chapters | Done when (ye dikhe tab hi aage badho) |
|---|---|---|---|
| 1 | index.html skeleton, base.css tokens, router, 3 khaali screens | 3, 4.1-4.4 | Teen buttons se teen screens ke beech ja sakte ho, back button chalta hai |
| 2 | style-guide.html: saare components (button, card, chip, toast, stamp, slider, icons) | 4 | Ek page par sab dikhe, hand-made look (tedhe radius, hard shadow, koi gradient nahi) |
| 3 | state.js + Settings screen (sound/haptics toggle) | 8, 5.12 | Toggle reload ke baad bhi yaad rahe |
| 4 | Calibrate screen + calib.js | 5.3, 6.1, 9.5 | Card outline slider se match; save; reload par pxPerMm wahi |
| 5 | Ruler tool (canvas ticks + marker + units) | 5.12, 6.2, 9.6 | Rs 10 ka sikka 27 mm +-0.5 padhe |
| 6 | data.js, units.js, score.js, fit.js, daily.js + tests.html | 6, 9 | tests.html mein SAB PASS |
| 7 | Guess screen (slider, +/-, type karna) | 5.6, 6.4 | Number sahi snap ho, 0.5 mm se 30 m tak chale |
| 8 | game.js + Reveal + Summary (bina characters ke) | 5.8, 5.9, 6.3-6.6, 9.7 | 5 round khelo, total/stars/XP sahi, unlock chale |
| 9 | Home (worlds map) + World screen + lock rules | 5.4, 5.5, 6.7 | World 2 lock se khule jab W1 par 1 star |
| 10 | Measure phase (bonus) + zoom/dpr checks | 5.7, 6.1 | Bonus +30 ya +15 mile; zoom karne par disable |
| 11 | Characters (chars.js) + expressions + bob/blink | 7.1-7.5 | Naapu ke 5 expressions sahi jagah par |
| 12 | FX: paper texture, sound, confetti, shake, pop, count-up | 7.6-7.10 | Reveal par sahi sound/effect; reduced-motion par band |
| 13 | Daily Hunt + streak | 5.10, 6.8, 9.4 | Streak +1 / reset sahi (QA table) |
| 14 | Fit Checker (+ ruler se value bharna) | 5.11, 6.9 | T1 aayega, T2 nahi aayega |
| 15 | Profile screen + stats | 5.12, 8 | Average farq aur level bar sahi |
| 16 | PWA: manifest, sw.js, icons | 9.10 | Airplane mode mein khulta hai |
| 17 | Edge cases ek-ek karke (10.1) | 10.1 | 20 mein se har ek ka behaviour sahi |
| 18 | QA checklist + 3 devices | 10.2, 10.3 | Sab pass |
| 19 | Deploy (free) | 11.4 | Public link phone par khule |


## 11.3 Har step ke liye AI ko ye prompt do

```
Step <N> banao. Pehle SPEC.md ke Chapters <list> padho.
Sirf in files ko banao/badlo: <files>.
Spec ke numbers/rang/strings exact use karo. Naya kuch invent mat karo.
Koi library, framework, gradient, blur ya emoji-icon nahi.
Khatam hone par batao: (1) kaun si files badli, (2) "Done when" kaise check karun.
Agar spec mein kami lage to pehle mujhse poochho.
```


## 11.4 Free deploy

| Option | Kaise |
|---|---|
| Netlify Drop | app.netlify.com/drop kholo, apne `naapu/` folder ko page par drag-drop karo. Link mil jata hai. |
| GitHub Pages | Repo banao, files upload karo. Settings > Pages > Branch: main, folder: /root. Kuch minute mein link. |
| Cloudflare Pages | Repo ya direct upload; build command khali, output folder `/`. |

> **Note:** Naya version deploy karne se pehle sw.js mein V ka number badlo, warna logon ko purana game dikhta rahega.


## 11.5 Aam galtiyan aur ilaaj

| Problem | Wajah | Ilaaj |
|---|---|---|
| Page khaali dikhta hai | file:// se khola; ES modules nahi chalte | Live Server ya python3 -m http.server |
| Font nahi dikha | Path galat | css/base.css se ../assets/PatrickHand-Regular.ttf; DevTools Network tab dekho |
| Ruler galat naap raha | Calibration galat ya zoom badla | Dobara calibrate, browser zoom 100% |
| Sound nahi aa rahi | Pehle tap se pehle ya silent mode (iPhone) | Pehle tap par audio chalu; silent switch dekho |
| Progress save nahi hoti | Private mode | Normal tab mein kholo |
| Update nahi dikh raha | Service worker ka purana cache | V badlo; DevTools > Application > Clear storage |
| AI ne gradient/purple laga diya | Spec ignore hua | Chapter 2.2 ki list wapas paste karke "hata do" bolo |
| Test FAIL aa raha hai | AI ne formula badal diya | Chapter 9 ka code exact paste karwao |


---

# 12. Baad ke ideas (v2) aur Glossary


## 12.1 v2 ideas (v1 ke baad hi)

| Idea | Sachchai | Kaise |
|---|---|---|
| AR measure (camera se asli cheez naapna) | Sirf kuch phones par (Android Chrome + ARCore). iPhone Safari par WebXR AR limited | WebXR hit-test; do point tap karke doori. Alag mode, calibration ki zaroorat nahi |
| Head-tracking 3D depth | Camera permission chahiye, mehnga | Sirf agar v1 chal jaye aur log maange |
| Personal Ruler (hath ka bitta, kadam) | Aasan aur original | Apne bitte ko calibrate karo, phir andaaze usi mein |
| Tilt check (door se sofa nikalna) | 2D mein tirchha karne par zyada cheezein aati hain | Rectangle-in-rectangle rotation check, alag algorithm |
| Unit Puzzle mode | Aasan | Inch/cm/ft conversion quiz, naye scoring tables |
| Score share image | Canvas se PNG banao | Native share API |
| Hindi (Devanagari) text option | Font alag chahiye | Strings ki table language ke hisaab se |


## 12.2 Glossary (har shabd ka seedha matlab)

| Shabd | Matlab |
|---|---|
| HTML | Page ka dhancha (kaun sa button, kahan text) |
| CSS | Page ka look (rang, size, border) |
| JavaScript (JS) | Page ko chalane wala code (tap karne par kya ho) |
| DOM | Browser ke andar page ke saare elements ki list jise JS badal sakta hai |
| Module | Ek alag JS file jo dusri file se `import` ho sakti hai |
| Pure function | Aisa function jo sirf input se output nikale, kuch aur na chhue. Test karna aasan |
| State | Game ki yaad: score, level, settings |
| localStorage | Browser ka chhota locker jo band karne par bhi data rakhta hai |
| Canvas | Browser ka chitr-patal jis par code se lakeerein/ticks banate hain |
| SVG | Lakeeron se bani image jo kitni bhi bada karo saaf rehti hai |
| CSS px | Browser ka 'pixel' jo asli pixel se alag hota hai. 1 CSS px = kitne mm, wahi hum calibrate karte hain |
| DPR (devicePixelRatio) | 1 CSS px mein kitne asli pixel hain. Retina phone par 2 ya 3 |
| Viewport | Browser ka dikhne wala hissa |
| Pointer events | Ungli, mouse, pen: sab ke liye ek hi tarah ke events (pointerdown/move/up) |
| Service worker | Chhota background program jo files cache karke offline chalne deta hai |
| PWA | Aisi website jo app ki tarah install ho aur offline chale |
| Hash routing | URL ke '#' ke baad wale hisse se screen badalna (#home, #guess) |
| Seed (random) | Random numbers ko har baar ek jaisa banane wala shuruaati number |
| Snap | Value ko nazdeeki tay kadam par 'chipka' dena (0.5 mm ke steps) |
| Log scale | Slider ka aisa naap jahan chhote numbers par bhi mehraan aur bade par bhi kaam kare |
| Easing | Animation ki raftaar ka curve (shuru dheema, beech tez, ant dheema) |
| rAF (requestAnimationFrame) | Har screen-refresh par ek function chalana, smooth animation ke liye |
| Tolerance | Kitna farq maaf hai |
| Streak / Combo | Lagataar kitni baar sahi |
| XP | Experience points: level badhane ke liye |
| Calibration | Screen ko batana ki 1 mm kitna bada hai |

> **Note:** Ye document yahan khatam hota hai. Ye lambai jaan-boojh kar chhoti rakhi gayi hai: har page mein kaam ki baat hai. Agar kisi chapter ko aur gehra chahiye (jaise har screen ka poora CSS, ya har item ki alag fun-fact), to us chapter ka naam batao, wo alag se likh diya jayega.
