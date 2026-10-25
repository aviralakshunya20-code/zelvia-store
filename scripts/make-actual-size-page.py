"""Generate actual-size/index.html from the ruler page template (same header, footer, consent and ads)."""
import io, re, os, json

tpl = io.open('ruler/index.html', encoding='utf-8').read().replace('\r\n', '\n')
script_line = '  <script type="module" src="../js/main.js"></script>'
assert script_line in tpl

OBJ = [
    ('card', 'Cards & photos', 'Bank / credit card', '85.6 × 53.98 mm'),
    ('passport-photo', 'Cards & photos', 'Passport photo (India, UK, EU)', '35 × 45 mm'),
    ('us-passport-photo', 'Cards & photos', 'US passport photo', '50.8 × 50.8 mm (2 × 2 in)'),
    ('stamp-photo', 'Cards & photos', 'Stamp-size photo', '20 × 25 mm'),
    ('mini-sim', 'SIM & memory cards', 'Mini SIM', '25 × 15 mm'),
    ('micro-sim', 'SIM & memory cards', 'Micro SIM', '15 × 12 mm'),
    ('nano-sim', 'SIM & memory cards', 'Nano SIM', '12.3 × 8.8 mm'),
    ('microsd', 'SIM & memory cards', 'microSD card', '11 × 15 mm'),
    ('sd', 'SIM & memory cards', 'SD card', '24 × 32 mm'),
    ('inr-1', 'Indian coins (2019 series)', '₹1 coin', '20 mm'),
    ('inr-2', 'Indian coins (2019 series)', '₹2 coin', '23 mm'),
    ('inr-5', 'Indian coins (2019 series)', '₹5 coin', '25 mm'),
    ('inr-10', 'Indian coins (2019 series)', '₹10 coin', '27 mm'),
    ('inr-20', 'Indian coins (2019 series)', '₹20 coin', '27 mm (12-sided)'),
    ('us-penny', 'US coins', 'Penny', '19.05 mm'),
    ('us-nickel', 'US coins', 'Nickel', '21.21 mm'),
    ('us-dime', 'US coins', 'Dime', '17.91 mm'),
    ('us-quarter', 'US coins', 'Quarter', '24.26 mm'),
    ('aa', 'Batteries', 'AA battery', '50.5 × 14.5 mm'),
    ('aaa', 'Batteries', 'AAA battery', '44.5 × 10.5 mm'),
    ('cr2032', 'Batteries', 'CR2032 coin cell', '20 mm'),
]
rows = ''.join(f'          <tr><td><a href="#{i}" data-show="{i}">{n}</a></td><td>{g}</td><td>{d}</td></tr>\n' for i, g, n, d in OBJ)

faqs = [
    ('How can I see something at actual size on my screen?',
     'Screens have different pixel densities, so the page first needs your screen scale. Calibrate once by matching a bank card on the ruler page; after that every object here is drawn at its true size in millimetres.'),
    ('What size is a passport photo in India?',
     '35 mm wide by 45 mm high, the same as UK and EU passport photos. US passport photos are 2 × 2 inches (51 × 51 mm).'),
    ('What size are SIM cards?',
     'Mini SIM 25 × 15 mm, micro SIM 15 × 12 mm and nano SIM 12.3 × 8.8 mm.'),
]

body = f'''  <main class="content-page">
    <header class="article-header" style="text-align:center; margin:12px 0 16px;">
      <h1>Actual Size Objects on Your Screen</h1>
      <p class="home-sub">See a bank card, passport photo, SIM card or coin at its real 1:1 size.</p>
    </header>

    <section id="actual-app" class="tool-panel">
      <p id="actual-calib-note" class="note-warn" hidden>
        <b>Approximate scale.</b> For true actual size, <a href="/ruler/#calib">calibrate with a bank card</a> first (10 seconds), then come back.
      </p>
      <label for="actual-select" class="field-label">Show</label>
      <select id="actual-select" class="field-select"></select>
      <div id="actual-stage" class="actual-stage" aria-hidden="true"></div>
      <p id="actual-label" class="actual-label" aria-live="polite"></p>
    </section>

    <h2 class="home-h2">All sizes</h2>
    <div class="table-wrap">
      <table class="size-table">
        <thead><tr><th>Object</th><th>Type</th><th>Size</th></tr></thead>
        <tbody>
{rows}        </tbody>
      </table>
    </div>

    <section style="margin-top:24px;">
FAQ_HTML
    </section>
  </main>
'''

title = 'Actual Size Objects – Bank Card, Passport Photo, SIM &amp; Coins at 1:1 | OnlineMeasurer'
desc = 'See everyday objects at their real size on your screen: bank card, passport photo, SIM cards, Indian and US coins and batteries, with exact dimensions in mm.'
url = 'https://www.onlinemeasurer.com/actual-size/'

s = tpl
s = re.sub(r'<title>[^<]*</title>', f'<title>{title}</title>', s, count=1)
s = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', s, count=1)
s = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">', s, count=1)
s = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{title}">', s, count=1)
s = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{desc}">', s, count=1)
s = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">', s, count=1)
schema = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
    {'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faqs]}
s = s.replace('</head>', '  <script type="application/ld+json">\n  ' + json.dumps(schema, ensure_ascii=False) + '\n  </script>\n</head>', 1)
hs = s.index('  </header>\n', s.index('<body>')) + len('  </header>\n')
fs = s.index('  <!-- Footer Nav')
faq_html = '\n'.join(f'        <details class="home-more"><summary>{q}</summary><div><p>{a}</p></div></details>' for q, a in faqs)
s = s[:hs] + body.replace('FAQ_HTML', faq_html) + '\n' + s[fs:]
s = s.replace(script_line, '  <script type="module" src="../js/actual.js"></script>')
os.makedirs('actual-size', exist_ok=True)
io.open('actual-size/index.html', 'w', encoding='utf-8', newline='').write(s)
print('wrote actual-size/index.html')
