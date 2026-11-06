"""Sharper titles for low-CTR pages; list all guides in every footer; add new guides to sitemap.xml."""
import io, re, glob, os

TITLES = {
    'guides/credit-card-size/index.html': ('Credit Card Size in cm, mm &amp; Inches (8.56 × 5.4 cm Actual Size) | OnlineMeasurer',
                                           'Credit Card Size in cm, mm and Inches (8.56 × 5.4 cm)'),
    'ruler/cm/index.html': ('Online Ruler in cm – Actual Size Centimetre Ruler on Your Screen | OnlineMeasurer',
                            'Online Ruler in cm – Actual Size Centimetre Ruler'),
}
for path, (title, og) in TITLES.items():
    s = io.open(path, encoding='utf-8').read()
    s = re.sub(r'<title>[^<]*</title>', f'<title>{title}</title>', s, count=1)
    s = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{og}">', s, count=1)
    io.open(path, 'w', encoding='utf-8', newline='').write(s)
    print('title', path)

GUIDES = [
    ('/guides/calibrate-online-ruler/', 'Calibrate Screen Ruler'),
    ('/guides/shoe-size-chart/', 'Shoe Size Chart (UK, India, US, EU)'),
    ('/guides/tv-screen-size/', 'TV &amp; Screen Sizes in cm'),
    ('/guides/photo-print-sizes/', 'Photo Print Sizes'),
    ('/guides/paper-sizes/', 'Paper Sizes Reference'),
    ('/guides/credit-card-size/', 'Credit Card Size'),
    ('/guides/coin-and-note-sizes-india/', 'Indian Coin &amp; Note Sizes'),
    ('/guides/inches-to-cm-chart/', 'Inches to cm Chart'),
    ('/guides/everyday-object-sizes/', 'Everyday Object Sizes'),
    ('/guides/best-measuring-tools/', 'Best Measuring Tools'),
]
SKIP = {'tests.html', 'tests-ads.html', 'style-guide.html', 'scripts/mezur-badge.html'}
items = '\n'.join(f'            <li><a href="{h}">{t}</a></li>' for h, t in GUIDES)
for f in glob.glob('**/*.html', recursive=True):
    r = f.replace(os.sep, '/')
    if r in SKIP or r.startswith('.git/') or r.startswith('.claude/'):
        continue
    s = io.open(f, encoding='utf-8').read()
    nl = '\r\n' if '\r\n' in s else '\n'
    s = s.replace('\r\n', '\n')
    s2 = re.sub(r'(<h3>Measurement Guides</h3>\n\s*<ul>)\n[\s\S]*?\n(\s*</ul>)', lambda m: m.group(1) + '\n' + items + '\n' + m.group(2), s, count=1)
    if s2 != s:
        io.open(f, 'w', encoding='utf-8', newline='').write(s2.replace('\n', nl))
print('footers updated')

sm = io.open('sitemap.xml', encoding='utf-8').read()
for slug in ['shoe-size-chart', 'tv-screen-size', 'photo-print-sizes', 'best-measuring-tools']:
    url = f'https://www.onlinemeasurer.com/guides/{slug}/'
    if url not in sm:
        sm = sm.replace('</urlset>', f'  <url>\n    <loc>{url}</loc>\n    <lastmod>2026-11-06</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>')
io.open('sitemap.xml', 'w', encoding='utf-8', newline='').write(sm)
print('sitemap', sm.count('<url>'))
