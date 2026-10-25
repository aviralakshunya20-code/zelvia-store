"""Rewrite the header nav and footer tool links on every page; add new pages to sitemap.xml."""
import io, re, glob, os

NAV = [
    ('/', 'Home'),
    ('/ruler/', 'Ruler'),
    ('/ring-size/', 'Ring Size'),
    ('/actual-size/', 'Actual Size'),
    ('/fit-checker/', 'Fit Checker'),
    ('/play/', 'Game'),
    ('/guides/calibrate-online-ruler/', 'Guides'),
]
TOOLS = [
    ('/ruler/', 'Online Screen Ruler'),
    ('/ring-size/', 'Ring Size Finder'),
    ('/actual-size/', 'Actual Size Objects'),
    ('/fit-checker/', 'Fit Checker'),
    ('/play/', 'Size Guessing Game'),
    ('/daily/', 'Daily Challenge'),
]
SKIP = {'tests.html', 'tests-ads.html', 'style-guide.html', 'scripts/mezur-badge.html'}


def page_path(f):
    p = '/' + f.replace(os.sep, '/').replace('index.html', '')
    return p if p != '/404.html' else '/404'


def active(href, path):
    if href == '/':
        return path == '/'
    if href.startswith('/guides/'):
        return path.startswith('/guides/')
    return path.startswith(href)


for f in glob.glob('**/*.html', recursive=True):
    r = f.replace(os.sep, '/')
    if r in SKIP or r.startswith('.git/'):
        continue
    s = io.open(f, encoding='utf-8').read()
    nl = '\r\n' if '\r\n' in s else '\n'
    s = s.replace('\r\n', '\n')
    path = page_path(r)
    def nav_link(h, t):
        if active(h, path):
            return f'        <a href="{h}" class="nav-link active" aria-current="page">{t}</a>'
        return f'        <a href="{h}" class="nav-link">{t}</a>'
    links = '\n'.join(nav_link(h, t) for h, t in NAV)
    s2 = re.sub(r'(<nav class="site-nav"[^>]*>)\n[\s\S]*?\n(\s*</nav>)', lambda m: m.group(1) + '\n' + links + '\n' + m.group(2), s, count=1)
    tools = '\n'.join(f'            <li><a href="{h}">{t}</a></li>' for h, t in TOOLS)
    s2 = re.sub(r'(<h3>Tools &(?:amp;)? Game</h3>\n\s*<ul>)\n[\s\S]*?\n(\s*</ul>)', lambda m: m.group(1) + '\n' + tools + '\n' + m.group(2), s2, count=1)
    if s2 != s:
        io.open(f, 'w', encoding='utf-8', newline='').write(s2.replace('\n', nl))
        print('updated', r)

sm = io.open('sitemap.xml', encoding='utf-8').read()
for url, freq, prio in [('https://www.onlinemeasurer.com/ring-size/', 'monthly', '0.9'),
                        ('https://www.onlinemeasurer.com/actual-size/', 'monthly', '0.9')]:
    if url not in sm:
        sm = sm.replace('</urlset>', f'  <url>\n    <loc>{url}</loc>\n    <lastmod>2026-10-26</lastmod>\n    <changefreq>{freq}</changefreq>\n    <priority>{prio}</priority>\n  </url>\n</urlset>')
io.open('sitemap.xml', 'w', encoding='utf-8', newline='').write(sm)
print('sitemap ok')
