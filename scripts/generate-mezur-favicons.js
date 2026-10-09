// scripts/generate-mezur-favicons.js - Build all Mezur favicons and app icons
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const SOURCE_PATH = path.resolve('scripts/test-badge.png');
const sourceBuf = fs.readFileSync(SOURCE_PATH);

// 1. Decode PNG
let pos = 8;
let idatBufs = [];
let srcW = 0, srcH = 0;
while (pos < sourceBuf.length) {
  const len = sourceBuf.readUInt32BE(pos);
  const type = sourceBuf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    srcW = sourceBuf.readUInt32BE(pos + 8);
    srcH = sourceBuf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatBufs.push(sourceBuf.subarray(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const rawInflated = zlib.inflateSync(Buffer.concat(idatBufs));
const bpp = 4;
const rowLen = 1 + srcW * bpp;
const srcPixels = Buffer.alloc(srcW * srcH * 4);

for (let y = 0; y < srcH; y++) {
  const filter = rawInflated[y * rowLen];
  for (let i = 0; i < srcW * bpp; i++) {
    const rawVal = rawInflated[y * rowLen + 1 + i];
    let upVal = 0, leftVal = 0, diagVal = 0;
    if (filter === 1) { // Sub
      leftVal = i >= bpp ? srcPixels[y * srcW * bpp + i - bpp] : 0;
      srcPixels[y * srcW * bpp + i] = (rawVal + leftVal) & 0xFF;
    } else if (filter === 2) { // Up
      upVal = y > 0 ? srcPixels[(y - 1) * srcW * bpp + i] : 0;
      srcPixels[y * srcW * bpp + i] = (rawVal + upVal) & 0xFF;
    } else if (filter === 3) { // Average
      leftVal = i >= bpp ? srcPixels[y * srcW * bpp + i - bpp] : 0;
      upVal = y > 0 ? srcPixels[(y - 1) * srcW * bpp + i] : 0;
      srcPixels[y * srcW * bpp + i] = (rawVal + Math.floor((leftVal + upVal) / 2)) & 0xFF;
    } else if (filter === 4) { // Paeth
      leftVal = i >= bpp ? srcPixels[y * srcW * bpp + i - bpp] : 0;
      upVal = y > 0 ? srcPixels[(y - 1) * srcW * bpp + i] : 0;
      diagVal = (y > 0 && i >= bpp) ? srcPixels[(y - 1) * srcW * bpp + i - bpp] : 0;
      const p = leftVal + upVal - diagVal;
      const pa = Math.abs(p - leftVal);
      const pb = Math.abs(p - upVal);
      const pc = Math.abs(p - diagVal);
      const pr = (pa <= pb && pa <= pc) ? leftVal : (pb <= pc ? upVal : diagVal);
      srcPixels[y * srcW * bpp + i] = (rawVal + pr) & 0xFF;
    } else { // 0: None
      srcPixels[y * srcW * bpp + i] = rawVal;
    }
  }
}

// 2. Find tight bounding box of the badge
let minX = srcW, maxX = 0, minY = srcH, maxY = 0;
for (let y = 0; y < srcH; y++) {
  for (let x = 0; x < srcW; x++) {
    const idx = (y * srcW + x) * 4;
    const a = srcPixels[idx + 3];
    if (a > 15) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
console.log(`Badge cropped bounding box: ${cropW}x${cropH} at (${minX},${minY})`);

const badgePixels = Buffer.alloc(cropW * cropH * 4);
for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((minY + y) * srcW + (minX + x)) * 4;
    const dstIdx = (y * cropW + x) * 4;
    badgePixels[dstIdx] = srcPixels[srcIdx];
    badgePixels[dstIdx + 1] = srcPixels[srcIdx + 1];
    badgePixels[dstIdx + 2] = srcPixels[srcIdx + 2];
    badgePixels[dstIdx + 3] = srcPixels[srcIdx + 3];
  }
}

// 3. PNG encoder with CRC32
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c;
}
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const buf = Buffer.alloc(12 + data.length);
  buf.writeUInt32BE(data.length, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const c = crc32(buf.subarray(4, 8 + data.length));
  buf.writeUInt32BE(c, 8 + data.length);
  return buf;
}

function encodePng(w, h, rgba) {
  const scanline = 1 + w * 4;
  const raw = Buffer.alloc(scanline * h);
  for (let y = 0; y < h; y++) {
    raw[y * scanline] = 0; // Filter: None
    rgba.copy(raw, y * scanline + 1, y * w * 4, (y + 1) * w * 4);
  }
  const compressed = zlib.deflateSync(raw);

  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdr = makeChunk('IHDR', ihdrData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

// 4. Bilinear sampling resize onto square canvas
function renderOnSquareCanvas(targetDim, scaleFactor = 0.94) {
  const out = Buffer.alloc(targetDim * targetDim * 4);
  const maxAvail = targetDim * scaleFactor;
  const scale = Math.min(maxAvail / cropW, maxAvail / cropH);
  const fitW = Math.max(1, Math.round(cropW * scale));
  const fitH = Math.max(1, Math.round(cropH * scale));
  const startX = Math.round((targetDim - fitW) / 2);
  const startY = Math.round((targetDim - fitH) / 2);

  for (let y = 0; y < fitH; y++) {
    for (let x = 0; x < fitW; x++) {
      const srcX = (x / fitW) * (cropW - 1);
      const srcY = (y / fitH) * (cropH - 1);
      const x0 = Math.floor(srcX), x1 = Math.min(cropW - 1, x0 + 1);
      const y0 = Math.floor(srcY), y1 = Math.min(cropH - 1, y0 + 1);
      const fx = srcX - x0, fy = srcY - y0;

      const idx00 = (y0 * cropW + x0) * 4;
      const idx10 = (y0 * cropW + x1) * 4;
      const idx01 = (y1 * cropW + x0) * 4;
      const idx11 = (y1 * cropW + x1) * 4;

      const outIdx = ((startY + y) * targetDim + (startX + x)) * 4;
      for (let c = 0; c < 4; c++) {
        const top = badgePixels[idx00 + c] * (1 - fx) + badgePixels[idx10 + c] * fx;
        const bot = badgePixels[idx01 + c] * (1 - fx) + badgePixels[idx11 + c] * fx;
        out[outIdx + c] = Math.round(top * (1 - fy) + bot * fy);
      }
    }
  }
  return encodePng(targetDim, targetDim, out);
}

// 5. ICO builder
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(entries.length, 4);

  let dirBuffers = [];
  let dataBuffers = [];
  let currentOffset = 6 + entries.length * 16;

  for (const { size, pngBuf } of entries) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(pngBuf.length, 8);
    entry.writeUInt32LE(currentOffset, 12);

    dirBuffers.push(entry);
    dataBuffers.push(pngBuf);
    currentOffset += pngBuf.length;
  }
  return Buffer.concat([header, ...dirBuffers, ...dataBuffers]);
}

// 6. Generate all files
fs.mkdirSync('assets', { recursive: true });

const badgePng = encodePng(cropW, cropH, badgePixels);
fs.writeFileSync('assets/favicon-badge.png', badgePng);
fs.writeFileSync('assets/favicon.png', badgePng);
fs.writeFileSync('favicon.png', badgePng);

const png16 = renderOnSquareCanvas(16, 0.98);
const png32 = renderOnSquareCanvas(32, 0.96);
const png48 = renderOnSquareCanvas(48, 0.95);
const png180 = renderOnSquareCanvas(180, 0.92);
const png192 = renderOnSquareCanvas(192, 0.90);
const png512 = renderOnSquareCanvas(512, 0.88);

fs.writeFileSync('assets/favicon-16x16.png', png16);
fs.writeFileSync('assets/favicon-32x32.png', png32);
fs.writeFileSync('assets/favicon-48x48.png', png48);
fs.writeFileSync('assets/apple-touch-icon.png', png180);
fs.writeFileSync('assets/icon-192.png', png192);
fs.writeFileSync('assets/icon-512.png', png512);

// Standard ICO file with 16, 32, 48
const icoBuf = buildIco([
  { size: 16, pngBuf: png16 },
  { size: 32, pngBuf: png32 },
  { size: 48, pngBuf: png48 }
]);
fs.writeFileSync('favicon.ico', icoBuf);
fs.writeFileSync('assets/favicon.ico', icoBuf);

// SVG vector wrapper
const base64Png = badgePng.toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cropW} ${cropH}" width="100%" height="100%">
  <image width="${cropW}" height="${cropH}" href="data:image/png;base64,${base64Png}" />
</svg>
`;
fs.writeFileSync('assets/favicon.svg', svgContent);

console.log('✅ All Mezur favicons and app icons generated successfully:');
console.log(' - favicon.ico');
console.log(' - assets/favicon.ico');
console.log(' - favicon.png');
console.log(' - assets/favicon.png');
console.log(' - assets/favicon-badge.png');
console.log(' - assets/favicon-16x16.png');
console.log(' - assets/favicon-32x32.png');
console.log(' - assets/favicon-48x48.png');
console.log(' - assets/apple-touch-icon.png');
console.log(' - assets/icon-192.png');
console.log(' - assets/icon-512.png');
console.log(' - assets/favicon.svg');
