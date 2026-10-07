// scripts/inject-favicons.js - Inject favicon links into all HTML pages
import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.git', '.gemini'].includes(f)) continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res.push(...getHtmlFiles(p));
    else if (f.endsWith('.html')) res.push(p);
  }
  return res;
}

const files = getHtmlFiles('.');
let updated = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('rel="icon"')) {
    console.log('Skipping (already has favicon):', file);
    continue;
  }

  let prefix = '';
  const rel = path.relative('.', file).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;

  if (rel === '404.html') {
    prefix = '/';
  } else if (depth === 1) {
    prefix = '../';
  } else if (depth === 2) {
    prefix = '../../';
  } else {
    prefix = '';
  }

  const faviconBlock = [
    `  <link rel="icon" type="image/x-icon" href="${prefix}favicon.ico">`,
    `  <link rel="icon" type="image/png" sizes="32x32" href="${prefix}assets/favicon-32x32.png">`,
    `  <link rel="icon" type="image/png" sizes="16x16" href="${prefix}assets/favicon-16x16.png">`,
    `  <link rel="apple-touch-icon" sizes="180x180" href="${prefix}assets/apple-touch-icon.png">`
  ].join('\n');

  const manifestMatch = content.match(/([ \t]*<link[^>]*manifest[^>]*>\r?\n)/i);
  if (manifestMatch) {
    content = content.replace(manifestMatch[0], manifestMatch[0] + faviconBlock + '\n');
  } else {
    const headMatch = content.match(/<head[^>]*>\r?\n/i);
    if (headMatch) {
      content = content.replace(headMatch[0], headMatch[0] + faviconBlock + '\n');
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  updated++;
  console.log('Updated:', rel);
}

console.log(`\nSuccessfully updated ${updated} HTML files with favicon links.`);
