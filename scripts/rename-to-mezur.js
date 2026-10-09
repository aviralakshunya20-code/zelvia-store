// scripts/rename-to-mezur.js
import fs from 'fs';
import path from 'path';

// 1. Process all HTML files
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
  'style-guide.html',
  'guides/calibrate-online-ruler/index.html',
  'guides/coin-and-note-sizes-india/index.html',
  'guides/credit-card-size/index.html',
  'guides/everyday-object-sizes/index.html',
  'guides/how-to-measure-if-it-fits/index.html',
  'guides/inches-to-cm-chart/index.html',
  'guides/paper-sizes/index.html',
  'guides/us-coin-sizes/index.html'
];

let htmlModified = 0;
for (const rel of htmlFiles) {
  const full = path.resolve(rel);
  if (!fs.existsSync(full)) continue;
  let text = fs.readFileSync(full, 'utf8');
  const original = text;

  // Header brand logo
  text = text.replace(/<span class="brand-title">Naapu<\/span>/g, '<span class="brand-title">Mezur</span>');
  text = text.replace(/aria-label="Naapu OnlineMeasurer Home"/g, 'aria-label="Mezur OnlineMeasurer Home"');

  // Footer copyright
  text = text.replace(/&middot; Naapu Game\./g, '&middot; Mezur Game.');
  text = text.replace(/· Naapu Game\./g, '· Mezur Game.');

  // Titles and Meta
  text = text.replace(/Online Measurer \(Naapu\)/g, 'Online Measurer (Mezur)');
  text = text.replace(/Play Naapu/g, 'Play Mezur');
  text = text.replace(/play Naapu/g, 'play Mezur');
  text = text.replace(/About Naapu/g, 'About Mezur');
  text = text.replace(/about Naapu/g, 'about Mezur');
  text = text.replace(/Contact Naapu/g, 'Contact Mezur');
  text = text.replace(/creators of Naapu/g, 'creators of Mezur');
  text = text.replace(/Terms of Service \| Naapu/g, 'Terms of Service | Mezur');
  text = text.replace(/Terms of Service for using Naapu/g, 'Terms of Service for using Mezur');
  text = text.replace(/terms and accuracy disclaimer for Naapu/g, 'terms and accuracy disclaimer for Mezur');
  text = text.replace(/Privacy Policy \| OnlineMeasurer &amp; Naapu/g, 'Privacy Policy | OnlineMeasurer &amp; Mezur');
  text = text.replace(/Privacy Policy \| OnlineMeasurer & Naapu/g, 'Privacy Policy | OnlineMeasurer & Mezur');
  text = text.replace(/Privacy Policy for OnlineMeasurer\.com and Naapu/g, 'Privacy Policy for OnlineMeasurer.com and Mezur');
  text = text.replace(/producers of the <strong>Naapu<\/strong>/g, 'producers of the <strong>Mezur</strong>');
  text = text.replace(/producers of the Naapu/g, 'producers of the Mezur');
  text = text.replace(/hosts the <strong>Naapu<\/strong>/g, 'hosts the <strong>Mezur</strong>');
  text = text.replace(/hosts the Naapu/g, 'hosts the Mezur');
  text = text.replace(/Naapu began with a simple physical observation/g, 'Mezur began with a simple physical observation');
  text = text.replace(/Naapu takes the exact opposite/g, 'Mezur takes the exact opposite');
  text = text.replace(/Naapu Style Guide/g, 'Mezur Style Guide');
  text = text.replace(/<title>Naapu - Style Guide<\/title>/g, '<title>Mezur - Style Guide</title>');

  // Specific about text
  text = text.replace(/<strong>Naapu<\/strong> \(from the Hindi word for <em>measurement<\/em> \/ <em>नाप<\/em>\)/g, '<strong>Mezur</strong> (phonetic for <em>measure</em>)');

  if (text !== original) {
    fs.writeFileSync(full, text, 'utf8');
    htmlModified++;
    console.log('Updated HTML:', rel);
  }
}
console.log(`Updated ${htmlModified} HTML files.`);

// 2. Update manifest.webmanifest
const manifestPath = path.resolve('manifest.webmanifest');
if (fs.existsSync(manifestPath)) {
  let m = fs.readFileSync(manifestPath, 'utf8');
  m = m.replace(/"name": "Naapu"/, '"name": "Mezur"');
  m = m.replace(/"short_name": "Naapu"/, '"short_name": "Mezur"');
  fs.writeFileSync(manifestPath, m, 'utf8');
  console.log('Updated manifest.webmanifest');
}

// 3. Update js/strings.js
const stringsPath = path.resolve('js/strings.js');
if (fs.existsSync(stringsPath)) {
  let s = fs.readFileSync(stringsPath, 'utf8');
  s = s.replace(/homeBrand: 'Naapu'/g, "homeBrand: 'Mezur'");
  fs.writeFileSync(stringsPath, s, 'utf8');
  console.log('Updated js/strings.js');
}

// 4. Update js/screens/splash.js
const splashPath = path.resolve('js/screens/splash.js');
if (fs.existsSync(splashPath)) {
  let sp = fs.readFileSync(splashPath, 'utf8');
  sp = sp.replace(/<div class="display" role="heading" aria-level="2" style="margin-top:16px;">Naapu<\/div>/, '<div class="display" role="heading" aria-level="2" style="margin-top:16px;">Mezur</div>');
  fs.writeFileSync(splashPath, sp, 'utf8');
  console.log('Updated js/screens/splash.js');
}

// 5. Update js/chars.js
const charsPath = path.resolve('js/chars.js');
if (fs.existsSync(charsPath)) {
  let ch = fs.readFileSync(charsPath, 'utf8');
  ch = ch.replace(/aria-label="Naapu \${expr}"/, 'aria-label="Mezur ${expr}"');
  if (!ch.includes('export { naapu as mezur }')) {
    ch += '\nexport { naapu as mezur };\n';
  }
  fs.writeFileSync(charsPath, ch, 'utf8');
  console.log('Updated js/chars.js');
}

// 6. Update assets/og-image.svg
const ogSvgPath = path.resolve('assets/og-image.svg');
if (fs.existsSync(ogSvgPath)) {
  let og = fs.readFileSync(ogSvgPath, 'utf8');
  og = og.replace(/<tspan fill="#E4572E">\(Naapu\)<\/tspan>/, '<tspan fill="#E4572E">(Mezur)</tspan>');
  fs.writeFileSync(ogSvgPath, og, 'utf8');
  console.log('Updated assets/og-image.svg');
}

console.log('All replacements completed successfully!');
