// audit-site.js - Automated Lighthouse-style verification for SEO, Accessibility, and Performance
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.gemini') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(ROOT_DIR);
console.log(`Found ${htmlFiles.length} HTML files to audit...\n`);

let totalIssues = 0;

for (const filePath of htmlFiles) {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  const issues = [];

  // 1. Language tag
  if (!/<html[^>]*lang=["'][a-z]{2}["']/i.test(content)) {
    issues.push('Missing or invalid <html lang="..."> attribute');
  }

  // 2. Viewport
  if (!/<meta[^>]*name=["']viewport["']/i.test(content)) {
    issues.push('Missing <meta name="viewport">');
  }

  // 3. Title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    issues.push('Missing or empty <title>');
  }

  // 4. Meta Description
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    issues.push('Missing or empty <meta name="description">');
  }

  // 5. Canonical
  const canonMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (!canonMatch) {
    issues.push('Missing <link rel="canonical">');
  }

  // 6. Exactly ONE <h1> per page
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    issues.push('Missing <h1> heading');
  } else if (h1Matches.length > 1) {
    issues.push(`Multiple <h1> headings found (${h1Matches.length})`);
  }

  // 7. Images without alt
  const imgTags = content.match(/<img[^>]*>/gi) || [];
  for (const img of imgTags) {
    if (!/alt=["'][^"']*["']/i.test(img)) {
      issues.push(`Image missing alt attribute: ${img.slice(0, 40)}...`);
    }
  }

  // 8. Buttons without aria-label or text
  const btnMatches = content.match(/<button[^>]*>([\s\S]*?)<\/button>/gi) || [];
  for (const btn of btnMatches) {
    const hasAria = /aria-label=["'][^"']+["']/i.test(btn);
    const textOnly = btn.replace(/<[^>]*>/g, '').trim();
    if (!hasAria && !textOnly) {
      issues.push(`Button without text or aria-label: ${btn.slice(0, 50)}...`);
    }
  }

  // 9. Links with href
  const linkMatches = content.match(/<a[^>]*>([\s\S]*?)<\/a>/gi) || [];
  for (const a of linkMatches) {
    if (!/href=["'][^"']+["']/i.test(a)) {
      issues.push(`Anchor tag missing href attribute: ${a.slice(0, 40)}...`);
    }
  }

  if (issues.length > 0) {
    console.log(`❌ [${relPath}]:`);
    for (const issue of issues) {
      console.log(`   - ${issue}`);
    }
    totalIssues += issues.length;
  } else {
    console.log(`✅ [${relPath}]: PASSED`);
  }
}

console.log(`\nAudit complete. Total issues found: ${totalIssues}`);
process.exit(totalIssues > 0 ? 1 : 0);
