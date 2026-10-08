// scripts/add-adsense-tag.js
import fs from 'fs';
import path from 'path';

const ADSENSE_SNIPPET = `  <meta name="google-adsense-account" content="ca-pub-4972530077719727">\n  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4972530077719727" crossorigin="anonymous"></script>\n`;

const targetFiles = [
  'index.html',
  '404.html',
  'about/index.html',
  'contact/index.html',
  'privacy/index.html',
  'terms/index.html',
  'play/index.html',
  'ruler/index.html',
  'fit-checker/index.html',
  'daily/index.html',
  'guides/calibrate-online-ruler/index.html',
  'guides/coin-and-note-sizes-india/index.html',
  'guides/credit-card-size/index.html',
  'guides/everyday-object-sizes/index.html',
  'guides/how-to-measure-if-it-fits/index.html',
  'guides/inches-to-cm-chart/index.html',
  'guides/paper-sizes/index.html',
  'guides/us-coin-sizes/index.html'
];

let updated = 0;
for (const rel of targetFiles) {
  const full = path.resolve(rel);
  if (!fs.existsSync(full)) continue;
  let content = fs.readFileSync(full, 'utf8');
  if (content.includes('ca-pub-4972530077719727')) continue;

  if (content.includes('</head>')) {
    content = content.replace('</head>', ADSENSE_SNIPPET + '</head>');
    fs.writeFileSync(full, content, 'utf8');
    updated++;
  }
}

console.log(`Updated ${updated} HTML files with AdSense verification tag ca-pub-4972530077719727.`);
