// scripts/remove-brand-sub.js
import fs from 'fs';
import path from 'path';

const htmlFiles = [
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

let updatedCount = 0;
for (const rel of htmlFiles) {
  const full = path.resolve(rel);
  if (!fs.existsSync(full)) continue;
  let text = fs.readFileSync(full, 'utf8');
  const original = text;

  // Remove the brand-sub line and simplify aria-label
  text = text.replace(/\s*<span class="brand-sub">OnlineMeasurer<\/span>/g, '');
  text = text.replace(/aria-label="Mezur OnlineMeasurer Home"/g, 'aria-label="Mezur Home"');

  if (text !== original) {
    fs.writeFileSync(full, text, 'utf8');
    updatedCount++;
    console.log('Removed brand-sub from:', rel);
  }
}

console.log(`Updated ${updatedCount} files successfully.`);
