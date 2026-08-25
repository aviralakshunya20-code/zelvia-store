import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SVG_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
  <defs>
    <linearGradient id="om-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#237B5B" />
      <stop offset="100%" stop-color="#54BE8A" />
    </linearGradient>
    <linearGradient id="om-leaf" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EAF8F1" />
      <stop offset="100%" stop-color="#FFFFFF" />
    </linearGradient>
  </defs>

  <!-- App Icon Squircle Background (22.9% radius) -->
  <rect width="48" height="48" rx="11" fill="url(#om-bg)" />

  <!-- Subtle Scan / Measurement Reticle Marks (Calibrated Cues) -->
  <path d="M 10.5 15.5 L 10.5 10.5 L 15.5 10.5" stroke="#FFFFFF" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.4" />
  <path d="M 37.5 32.5 L 37.5 37.5 L 32.5 37.5" stroke="#FFFFFF" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.4" />

  <!-- Calibration Measurement Ticks -->
  <line x1="12" y1="24" x2="14.5" y2="24" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.55" />
  <line x1="24" y1="36" x2="24" y2="33.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.55" />

  <!-- Circular Nutrition / Progress Ring with Deliberate Top-Right Gap -->
  <path
    d="M 28.5 13.5 A 11.5 11.5 0 1 0 35.5 22.5"
    stroke="#FFFFFF"
    stroke-width="3.2"
    stroke-linecap="round"
  />

  <!-- Natural Leaf Shape Integrated at Upper-Right Arc Endpoint -->
  <path
    d="M 28.5 14 C 28.5 9.2, 35.5 9.2, 37.5 10.5 C 37.5 12.5, 37 18.5, 32.5 18.5 C 29.8 18.5, 28.5 16.2, 28.5 14 Z"
    fill="url(#om-leaf)"
  />

  <!-- Subtle Leaf Central Vein -->
  <path
    d="M 30 15.2 C 32 14.2, 34.5 12.8, 36.5 11.5"
    stroke="#237B5B"
    stroke-width="1.1"
    stroke-linecap="round"
    stroke-opacity="0.8"
  />
</svg>`;

async function generateAssets() {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, "public");
  const appDir = path.join(rootDir, "app");

  // 1. Write favicon.svg
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), SVG_TEMPLATE);
  fs.writeFileSync(path.join(appDir, "icon.svg"), SVG_TEMPLATE);
  console.log("✓ Saved public/favicon.svg and app/icon.svg");

  // 2. Generate PNG icons with Sharp
  const svgBuffer = Buffer.from(SVG_TEMPLATE);

  // apple-touch-icon.png (180x180)
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));
  console.log("✓ Generated apple-touch-icon.png (180x180)");

  // icon-192.png (192x192)
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, "icon-192.png"));
  console.log("✓ Generated icon-192.png (192x192)");

  // icon-512.png (512x512)
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, "icon-512.png"));
  console.log("✓ Generated icon-512.png (512x512)");

  // 3. Write site.webmanifest
  const webmanifest = {
    name: "OnlineMeasurer – AI Calorie & Nutrition Tracker",
    short_name: "OnlineMeasurer",
    description: "Track calories, protein, carbs and nutrition for Indian food with AI photo scanning and natural language logging.",
    start_url: "/",
    display: "standalone",
    background_color: "#18251F",
    theme_color: "#237B5B",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };

  fs.writeFileSync(path.join(publicDir, "site.webmanifest"), JSON.stringify(webmanifest, null, 2));
  console.log("✓ Saved public/site.webmanifest");
}

generateAssets().catch(err => {
  console.error("Asset generation error:", err);
  process.exit(1);
});
