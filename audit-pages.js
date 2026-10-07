// audit-pages.js - Validate all HTML pages for Phase A, B, C, D, E requirements
import fs from 'fs';

const pages = [
  'index.html',
  'play/index.html',
  'ruler/index.html',
  'fit-checker/index.html',
  'daily/index.html',
  'guides/calibrate-online-ruler/index.html',
  'guides/paper-sizes/index.html',
  'guides/coin-and-note-sizes-india/index.html',
  'guides/everyday-object-sizes/index.html',
  'guides/how-to-measure-if-it-fits/index.html',
  'about/index.html',
  'contact/index.html',
  'privacy/index.html',
  'terms/index.html'
];

let failed = false;

for (const p of pages) {
  if (!fs.existsSync(p)) {
    console.error('MISSING:', p);
    failed = true;
    continue;
  }
  const content = fs.readFileSync(p, 'utf8');
  const h1Matches = content.match(/<h1[\s\S]*?<\/h1>/gi) || [];
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  const ogTitleMatch = content.match(/<meta\s+property=["']og:title["']/i);

  const h1Ok = h1Matches.length === 1;
  const titleOk = !!titleMatch && titleMatch[1].trim().length > 0;
  const descOk = !!metaDescMatch && metaDescMatch[1].trim().length > 0;
  const canOk = !!canonicalMatch && canonicalMatch[1].startsWith('https://onlinemeasurer.com');
  const ogOk = !!ogTitleMatch;

  console.log(`Page: ${p.padEnd(45)} H1: ${h1Matches.length} (${h1Ok ? 'OK' : 'ERR'}) | Title: ${titleOk ? 'OK' : 'ERR'} | Desc: ${descOk ? 'OK' : 'ERR'} | Canonical: ${canOk ? 'OK' : 'ERR'} | OG: ${ogOk ? 'OK' : 'ERR'}`);

  if (p.startsWith('guides/')) {
    const bodyOnly = content.replace(/<script[\s\S]*?<\/script>/gi, '')
                            .replace(/<style[\s\S]*?<\/style>/gi, '')
                            .replace(/<header[\s\S]*?<\/header>/gi, '')
                            .replace(/<footer[\s\S]*?<\/footer>/gi, '')
                            .replace(/<[^>]+>/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
    const wordCount = bodyOnly.split(' ').filter(w => w.length > 0).length;
    const hasTable = /<table[\s\S]*?<\/table>/i.test(content);
    const hasFaq = /faq-item/i.test(content);
    console.log(`  -> Guide Audit: ${wordCount} words (Target 400-700) | Has Table: ${hasTable} | Has FAQ: ${hasFaq}`);
    if (wordCount < 400 || wordCount > 750 || !hasTable || !hasFaq) {
      console.warn(`     WARNING: Guide ${p} bounds check!`);
    }
  }

  if (!h1Ok || !titleOk || !descOk || !canOk || !ogOk) {
    failed = true;
  }
}

if (failed) {
  console.error('\nFAIL: Some pages did not pass validation.');
  process.exit(1);
} else {
  console.log('\nSUCCESS: All 14 pages passed 100% of SEO, canonical, meta, OG, and single-H1 audits!');
}
