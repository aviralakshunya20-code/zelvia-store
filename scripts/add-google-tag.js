// scripts/add-google-tag.js
import fs from 'fs';
import path from 'path';

const GA_TAG = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-VDYFXXLNMV"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VDYFXXLNMV');
  </script>\n`;

const targetFiles = [
  'index.html',
  '404.html',
  'about/index.html',
  'contact/index.html',
  'privacy/index.html',
  'terms/index.html',
  'play/index.html',
  'ruler/index.html',
  'ruler/cm/index.html',
  'ruler/inches/index.html',
  'ruler/mm/index.html',
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
  if (!fs.existsSync(full)) {
    console.warn('File not found:', rel);
    continue;
  }
  let content = fs.readFileSync(full, 'utf8');
  if (content.includes('G-VDYFXXLNMV')) {
    console.log('Already has GA tag:', rel);
    continue;
  }
  if (content.includes('<head>')) {
    content = content.replace('<head>', '<head>\n' + GA_TAG);
    fs.writeFileSync(full, content, 'utf8');
    console.log('Injected GA tag into:', rel);
    updated++;
  } else {
    console.warn('No <head> tag found in:', rel);
  }
}

console.log(`Finished! Updated ${updated} HTML files with Google tag G-VDYFXXLNMV.`);
