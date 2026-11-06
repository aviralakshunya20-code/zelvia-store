"""Generate three in-depth guides from the paper-sizes guide template (same header, footer, ads, consent)."""
import io, re, os, json, math

TPL = io.open('guides/paper-sizes/index.html', encoding='utf-8').read().replace('\r\n', '\n')
SITE = 'https://www.onlinemeasurer.com'


def build(slug, title, h1, desc, minutes, body, faqs):
    s = TPL
    url = f'{SITE}/guides/{slug}/'
    s = re.sub(r'<title>[^<]*</title>', f'<title>{title}</title>', s, count=1)
    s = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', s, count=1)
    s = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">', s, count=1)
    s = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{h1}">', s, count=1)
    s = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{desc}">', s, count=1)
    s = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">', s, count=1)
    graph = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': f'{SITE}/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Guides', 'item': f'{SITE}/guides/calibrate-online-ruler/'},
            {'@type': 'ListItem', 'position': 3, 'name': h1, 'item': url}]},
        {'@type': 'FAQPage', 'mainEntity': [
            {'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': re.sub(r'<[^>]+>', '', a)}} for q, a in faqs]}]}
    s = re.sub(r'<script type="application/ld\+json">[\s\S]*?</script>',
               '<script type="application/ld+json">\n  ' + json.dumps(graph, ensure_ascii=False, indent=2).replace('\n', '\n  ') + '\n  </script>', s, count=1)
    faq_html = '\n'.join(f'''        <div class="faq-item">
          <h3>{q}</h3>
          <p>{a}</p>
        </div>''' for q, a in faqs)
    article = f'''<article class="content-page">
    <header class="article-header">
      <h1>{h1}</h1>
      <div class="article-meta">
        <span>Updated: November 2026</span>
        <span>&middot;</span>
        <span>Reading time: {minutes} mins</span>
      </div>
    </header>

    <div class="ad-slot-wrapper">
      <div class="ad-slot slot-leaderboard" id="ad-guide-top">

      </div>
    </div>

    <div class="article-body">
{body}
      <h2>Frequently Asked Questions</h2>
      <div class="faq-box">
{faq_html}
      </div>
    </div>

    <div class="ad-slot-wrapper">
      <div class="ad-slot slot-leaderboard" id="ad-guide-bot">

      </div>
    </div>
  </article>'''
    s = re.sub(r'<article class="content-page">[\s\S]*?</article>', lambda m: article, s, count=1)
    os.makedirs(f'guides/{slug}', exist_ok=True)
    io.open(f'guides/{slug}/index.html', 'w', encoding='utf-8', newline='').write(s)
    print('wrote', slug)


MID_AD = '''      <div class="ad-slot-wrapper">
        <div class="ad-slot slot-banner" id="ad-guide-mid">

        </div>
      </div>
'''

# ------------------------------------------------------------------ shoe sizes
men = [(6, 7, 40, 24.6), (7, 8, 41, 25.4), (8, 9, 42, 26.2), (9, 10, 43, 27.1), (10, 11, 44.5, 27.9), (11, 12, 46, 28.8), (12, 13, 47, 29.6)]
women = [(3, 5, 36, 22.0), (4, 6, 37, 22.9), (5, 7, 38, 23.7), (6, 8, 39, 24.6), (7, 9, 40.5, 25.4), (8, 10, 42, 26.2)]


def shoe_rows(rows):
    return '\n'.join(f'            <tr><td>{uk:g}</td><td>{us:g}</td><td>{eu:g}</td><td>{cm:.1f} cm</td><td>{cm / 2.54:.2f} in</td></tr>' for uk, us, eu, cm in rows)


shoe_body = f'''      <p>
        Shoe sizes are confusing because every region numbers them differently. India uses the UK system, the US adds one to one-and-a-half sizes, and Europe uses a completely separate scale. The one number that never changes is the <strong>length of your foot in centimetres</strong>, so this guide starts there.
      </p>

      <h2>How to Measure Your Foot at Home</h2>
      <ol>
        <li>Put a sheet of A4 paper on a hard floor, with one short edge touching a wall.</li>
        <li>Stand on the paper with your heel against the wall and your weight on that foot.</li>
        <li>Ask someone to mark the tip of your longest toe (it is not always the big toe).</li>
        <li>Measure from the wall edge of the paper to the mark in centimetres. Do the same for the other foot and use the longer one.</li>
        <li>Measure in the evening: feet swell slightly during the day, and shoes bought for morning feet can feel tight later.</li>
      </ol>
      <p>
        An A4 sheet is 29.7 cm long, so it is long enough for almost every adult foot. If you do not have a tape measure, the <a href="/ruler/cm/">online cm ruler</a> can measure the mark once your screen is calibrated, or you can compare against a credit card (8.56 cm long).
      </p>

{MID_AD}
      <h2>Men's Shoe Size Chart (UK / India, US, EU)</h2>
      <p>Find your foot length in the last columns and read across. Lengths are typical inside lengths; brands differ by a few millimetres.</p>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>UK / India</th><th>US</th><th>EU</th><th>Foot length</th><th>Foot length</th></tr></thead>
          <tbody>
{shoe_rows(men)}
          </tbody>
        </table>
      </div>

      <h2>Women's Shoe Size Chart (UK / India, US, EU)</h2>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>UK / India</th><th>US</th><th>EU</th><th>Foot length</th><th>Foot length</th></tr></thead>
          <tbody>
{shoe_rows(women)}
          </tbody>
        </table>
      </div>

      <h2>Why Sizes Don't Match Exactly Between Brands</h2>
      <p>
        Shoe size systems were built on different units: UK and US sizes step in thirds of an inch (about 8.5 mm), while EU "Paris points" step in two-thirds of a centimetre (about 6.7 mm). Because the steps are different, a UK size never lines up perfectly with one EU size, and each brand rounds a little differently. That is why the same person can wear EU 42 in one brand and EU 43 in another.
      </p>
      <ul>
        <li><strong>Between two sizes?</strong> Choose the larger one for closed shoes and boots, the smaller one for sandals.</li>
        <li><strong>Wide feet?</strong> Length is only half the story. Many Indian and sports brands offer wide fittings; try a half size up if a brand runs narrow.</li>
        <li><strong>Leave a thumb's width</strong> (about 1 cm) between your longest toe and the front of the shoe for walking and running.</li>
      </ul>

      <div class="guide-cta">
        <h3>Need to measure something small?</h3>
        <p>Use the calibrated on-screen ruler in millimetres, centimetres or inches.</p>
        <a href="/ruler/" class="btn" style="margin-top:12px;">Open the ruler</a>
      </div>
'''

shoe_faqs = [
    ('Is Indian shoe size the same as UK size?', 'Yes. Most Indian brands and stores use UK sizes, so an Indian size 8 is a UK size 8, roughly a US men\'s 9 and EU 42.'),
    ('How do I convert UK to US shoe size?', 'For men, add 1 to the UK size (UK 8 = US 9). For women, add about 2 (UK 5 = US 7). Always check the brand\'s own chart because rounding varies.'),
    ('What foot length is shoe size 8?', 'A men\'s UK/India size 8 fits a foot of about 26.2 cm (10.3 inches). A women\'s UK size 8 is the same length, about 26.2 cm.'),
    ('Should I measure my foot in the morning or evening?', 'In the evening. Feet swell a little during the day, so an evening measurement gives a size that stays comfortable.'),
]

build('shoe-size-chart', 'Shoe Size Chart: UK, India, US &amp; EU with Foot Length in cm | OnlineMeasurer',
      'Shoe Size Chart: UK, India, US and EU Sizes with Foot Length',
      'Convert shoe sizes between UK, India, US and EU, see the foot length in cm for each size, and learn how to measure your foot at home with a sheet of A4 paper.',
      6, shoe_body, shoe_faqs)

# ------------------------------------------------------------------ screen sizes
def wh(d, a, b):
    k = d / math.hypot(a, b)
    return a * k, b * k


tv_rows = []
for d in [24, 27, 32, 40, 43, 50, 55, 65, 75, 85]:
    w, h = wh(d, 16, 9)
    tv_rows.append(f'            <tr><td>{d}"</td><td>{d * 2.54:.0f} cm</td><td>{w * 2.54:.1f} cm ({w:.1f} in)</td><td>{h * 2.54:.1f} cm ({h:.1f} in)</td></tr>')
phone_rows = []
for d, ratio, label in [(6.1, (19.5, 9), '19.5:9'), (6.4, (20, 9), '20:9'), (6.7, (19.5, 9), '19.5:9'), (11, (4, 3), '4:3 tablet')]:
    w, h = wh(d, *ratio)
    phone_rows.append(f'            <tr><td>{d}"</td><td>{label}</td><td>{h * 2.54:.1f} cm</td><td>{w * 2.54:.1f} cm</td></tr>')

screen_body = f'''      <p>
        A "55-inch TV" is not 55 inches wide. Screen sizes are measured <strong>diagonally</strong>, from one corner of the visible picture to the opposite corner, and they leave out the frame. To know whether a TV fits a wall or a cabinet, you need its real width and height, which depend on the diagonal and the shape (aspect ratio) of the screen.
      </p>

      <h2>Screen Size Calculator</h2>
      <div class="tool-panel" id="screen-calc">
        <label class="field-label" for="sc-diag">Diagonal (inches)</label>
        <input class="field-select" id="sc-diag" type="number" inputmode="decimal" min="1" max="150" step="0.1" value="55">
        <label class="field-label" for="sc-ratio">Aspect ratio</label>
        <select class="field-select" id="sc-ratio">
          <option value="16:9">16:9 — TVs, monitors, laptops</option>
          <option value="21:9">21:9 — ultrawide monitors</option>
          <option value="16:10">16:10 — some laptops</option>
          <option value="4:3">4:3 — iPads, older screens</option>
          <option value="19.5:9">19.5:9 — most phones</option>
        </select>
        <div class="result-grid" aria-live="polite">
          <div class="result-main"><span>Width</span><b id="sc-w">—</b></div>
          <div class="result-main"><span>Height</span><b id="sc-h">—</b></div>
          <div><span>Diagonal</span><b id="sc-d">—</b></div>
          <div><span>Screen area</span><b id="sc-a">—</b></div>
        </div>
        <p class="small" style="margin-top:8px;">Add 1–3 cm on each side for the frame (bezel) and check the maker's spec sheet for the stand.</p>
      </div>
      <script>
        (function () {{
          var d = document.getElementById('sc-diag'), r = document.getElementById('sc-ratio');
          function run() {{
            var diag = parseFloat(d.value), p = r.value.split(':'), a = parseFloat(p[0]), b = parseFloat(p[1]);
            if (!(diag > 0)) return;
            var k = diag / Math.sqrt(a * a + b * b), w = a * k, h = b * k;
            document.getElementById('sc-w').textContent = (w * 2.54).toFixed(1) + ' cm · ' + w.toFixed(1) + ' in';
            document.getElementById('sc-h').textContent = (h * 2.54).toFixed(1) + ' cm · ' + h.toFixed(1) + ' in';
            document.getElementById('sc-d').textContent = (diag * 2.54).toFixed(1) + ' cm';
            document.getElementById('sc-a').textContent = Math.round(w * h * 6.4516) + ' cm²';
          }}
          d.addEventListener('input', run); r.addEventListener('change', run); run();
        }})();
      </script>

{MID_AD}
      <h2>TV Sizes in cm (16:9 Screens)</h2>
      <p>Width and height of the visible picture for common TV and monitor sizes, calculated with the 16:9 ratio used by almost all TVs.</p>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Size</th><th>Diagonal</th><th>Width</th><th>Height</th></tr></thead>
          <tbody>
{chr(10).join(tv_rows)}
          </tbody>
        </table>
      </div>

      <h2>Phone and Tablet Screens</h2>
      <p>Phones use taller ratios, so the same diagonal gives a narrower, longer screen. Heights below are for the phone held upright.</p>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Diagonal</th><th>Ratio</th><th>Height</th><th>Width</th></tr></thead>
          <tbody>
{chr(10).join(phone_rows)}
          </tbody>
        </table>
      </div>

      <h2>How the Maths Works</h2>
      <p>
        For a screen with aspect ratio <em>a</em>:<em>b</em> and diagonal <em>d</em>, Pythagoras gives width = <em>d</em> × <em>a</em> ÷ √(<em>a</em>² + <em>b</em>²) and height = <em>d</em> × <em>b</em> ÷ √(<em>a</em>² + <em>b</em>²). For 16:9 that means the width is about 87% of the diagonal and the height about 49%. One inch is exactly 2.54 cm.
      </p>
      <h2>Choosing a TV Size for Your Room</h2>
      <p>
        A common rule for HD and 4K TVs is to sit about 1 to 1.5 times the screen's diagonal away. For a 55-inch TV that is roughly 1.4–2.1 m. Closer than that and you will notice pixels or turn your head; further and the picture feels small. Measure the wall or cabinet first, then use the table to check the full width including the frame.
      </p>
'''

screen_faqs = [
    ('How wide is a 55 inch TV in cm?', 'The picture of a 16:9 55-inch TV is about 121.8 cm wide and 68.5 cm high. With the frame, most 55-inch TVs are about 123–125 cm wide.'),
    ('Is screen size measured with the frame?', 'No. Screen size is the diagonal of the visible picture only. The frame (bezel) adds width and height on top of the numbers in this guide.'),
    ('How many cm is a 32 inch TV?', 'The diagonal is 81 cm. The picture is about 70.8 cm wide and 39.8 cm high.'),
    ('What size TV should I buy for my room?', 'Sit about 1 to 1.5 times the diagonal away from a 4K TV. For a viewing distance of 2 metres, a 55- to 65-inch screen usually feels right.'),
]

build('tv-screen-size', 'TV Screen Size in cm: Width &amp; Height Calculator (32, 43, 55, 65 inch) | OnlineMeasurer',
      'TV and Screen Sizes: Real Width and Height in cm',
      'What does 55 inch mean in cm? Calculate the real width and height of any TV, monitor or phone screen from its diagonal, with a table of common TV sizes in cm.',
      5, screen_body, screen_faqs)

# ------------------------------------------------------------------ photo print sizes
photos = [
    ('Stamp size (India forms)', 20, 25, 'mm'),
    ('Passport photo (India, UK, EU)', 35, 45, 'mm'),
    ('US passport / visa (2 × 2 in)', 50.8, 50.8, 'mm'),
    ('Wallet (2.5 × 3.5 in)', 63.5, 88.9, 'mm'),
    ('4 × 6 in (standard print)', 101.6, 152.4, 'mm'),
    ('5 × 7 in', 127, 177.8, 'mm'),
    ('A5', 148, 210, 'mm'),
    ('8 × 10 in', 203.2, 254, 'mm'),
    ('A4', 210, 297, 'mm'),
    ('8 × 12 in', 203.2, 304.8, 'mm'),
    ('A3', 297, 420, 'mm'),
]


def px(mm, dpi):
    return round(mm / 25.4 * dpi)


photo_rows = '\n'.join(
    f'            <tr><td>{n}</td><td>{w / 10:g} × {h / 10:g} cm</td><td>{w / 25.4:.2f} × {h / 25.4:.2f} in</td><td>{px(w, 300)} × {px(h, 300)}</td><td>{px(w, 150)} × {px(h, 150)}</td></tr>'
    for n, w, h, _ in photos)

photo_body = f'''      <p>
        Photo sizes are a mix of inches (4×6, 5×7), paper sizes (A4, A5) and official millimetre sizes (passport photos). This guide lists them all in centimetres and inches, and shows how many pixels your image needs so the print stays sharp.
      </p>

      <h2>Photo Print Sizes Chart</h2>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Size</th><th>Centimetres</th><th>Inches</th><th>Pixels for sharp print (300 DPI)</th><th>Minimum pixels (150 DPI)</th></tr></thead>
          <tbody>
{photo_rows}
          </tbody>
        </table>
      </div>
      <p>You can check passport and stamp photos at their real size on the <a href="/actual-size/#passport-photo">actual-size objects</a> page.</p>

{MID_AD}
      <h2>How Many Pixels Do You Need?</h2>
      <p>
        Print quality is measured in <strong>dots per inch (DPI)</strong>. At 300 DPI a print looks sharp even close up; 150 DPI is usually acceptable for prints viewed from an arm's length, like posters. To find the pixels needed, multiply the print size in inches by the DPI: a 4 × 6 inch print at 300 DPI needs 1200 × 1800 pixels.
      </p>
      <p>
        Almost every modern phone camera takes photos of 12 megapixels or more (around 3000 × 4000 pixels), which is enough for a sharp A4 or 8 × 10 print. Images downloaded from social media or messaging apps are often compressed to 1000–1600 pixels wide, which is fine for 4 × 6 but will look soft on A4.
      </p>

      <h2>Aspect Ratio: Why Your Photo Gets Cropped</h2>
      <p>
        Phone photos are usually 4:3, while a 4 × 6 print is 3:2 and an A4 sheet is about 1:1.41. When the shapes don't match, the lab either crops the edges or adds white borders. Before printing, crop the photo to the print's shape yourself so nothing important (like the top of a head) is cut off.
      </p>

      <h2>Passport Photo Rules at a Glance</h2>
      <ul>
        <li><strong>India, UK and most of Europe:</strong> 35 × 45 mm, plain light background, face covering most of the height.</li>
        <li><strong>United States:</strong> 2 × 2 inches (51 × 51 mm), white or off-white background.</li>
        <li>Always check the latest rules on the official passport or visa website before printing, as requirements on background and head size change from time to time.</li>
      </ul>
'''

photo_faqs = [
    ('What is the size of a passport photo in India in cm?', '3.5 cm wide by 4.5 cm high (35 × 45 mm). For a sharp print at 300 DPI the image should be at least 413 × 531 pixels.'),
    ('What size is a 4×6 photo in cm?', 'A 4 × 6 inch photo is 10.16 × 15.24 cm, often rounded to 10 × 15 cm. It needs 1200 × 1800 pixels for a sharp print.'),
    ('How many pixels do I need to print A4?', 'For a sharp A4 print at 300 DPI you need about 2480 × 3508 pixels. At 150 DPI, 1240 × 1754 pixels is the minimum for an acceptable print.'),
    ('What is stamp size photo size?', 'Stamp size photos used on many Indian forms are 2 × 2.5 cm (20 × 25 mm). Always check the form, as some ask for a different size.'),
]

build('photo-print-sizes', 'Photo Print Sizes in cm &amp; Inches: Passport, 4×6, 5×7, A4 + Pixels | OnlineMeasurer',
      'Photo Print Sizes in cm and Inches (with Pixels Needed)',
      'All common photo sizes in cm and inches: passport (India, US), stamp size, 4×6, 5×7, 8×10, A4 and A3, plus the pixels you need for a sharp print.',
      5, photo_body, photo_faqs)
