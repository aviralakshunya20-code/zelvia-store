// scripts/build-favicons.js - Generate crisp, multi-size favicons and PWA icons from user badge
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const SOURCE_PATH = 'C:/Users/VICTUS/.gemini/antigravity-ide/brain/8d8c2cc4-1a7a-4163-b6da-2e12c1763318/.user_uploaded/media_1791375676573.png';

// 1. Read and decode source PNG
const sourceBuf = fs.readFileSync(SOURCE_PATH);

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
    const upVal = y > 0 ? srcPixels[(y - 1) * srcW * bpp + i] : 0;
    srcPixels[y * srcW * bpp + i] = (rawVal + upVal) & 0xFF;
  }
}

// 2. Flood-fill background detection
const isBg = new Uint8Array(srcW * srcH);
const queue = [];
function addQueue(x, y) {
  if (x >= 0 && x < srcW && y >= 0 && y < srcH && !isBg[y * srcW + x]) {
    const idx = (y * srcW + x) * 4;
    const r = srcPixels[idx], g = srcPixels[idx+1], b = srcPixels[idx+2];
    if (r > 240 && g > 240 && b > 235) {
      isBg[y * srcW + x] = 1;
      queue.push([x, y]);
    }
  }
}
for (let x = 0; x < srcW; x++) { addQueue(x, 0); addQueue(x, srcH - 1); }
for (let y = 0; y < srcH; y++) { addQueue(0, y); addQueue(srcW - 1, y); }

while (queue.length > 0) {
  const [x, y] = queue.shift();
  for (const [nx, ny] of [[x+1, y], [x-1, y], [x, y+1], [x, y-1]]) {
    addQueue(nx, ny);
  }
}

// 3. Clean alpha and remove white background fringe
const cleanedSrc = Buffer.alloc(srcW * srcH * 4);
for (let y = 0; y < srcH; y++) {
  for (let x = 0; x < srcW; x++) {
    const idx = (y * srcW + x) * 4;
    if (isBg[y * srcW + x]) {
      cleanedSrc[idx] = 0;
      cleanedSrc[idx+1] = 0;
      cleanedSrc[idx+2] = 0;
      cleanedSrc[idx+3] = 0;
    } else {
      let hasBgNeighbor = false;
      for (const [nx, ny] of [[x+1, y], [x-1, y], [x, y+1], [x, y-1]]) {
        if (nx >= 0 && nx < srcW && ny >= 0 && ny < srcH && isBg[ny * srcW + nx]) {
          hasBgNeighbor = true;
          break;
        }
      }
      const r = srcPixels[idx], g = srcPixels[idx+1], b = srcPixels[idx+2];
      if (hasBgNeighbor && r > 200 && g > 200 && b > 190) {
        // Edge anti-aliasing against white: recover alpha
        const a = 1 - (r + g + b) / (3 * 255);
        cleanedSrc[idx] = 43;     // ink
        cleanedSrc[idx+1] = 33;
        cleanedSrc[idx+2] = 24;
        cleanedSrc[idx+3] = Math.max(0, Math.min(255, Math.round(a * 255)));
      } else {
        cleanedSrc[idx] = r;
        cleanedSrc[idx+1] = g;
        cleanedSrc[idx+2] = b;
        cleanedSrc[idx+3] = 255;
      }
    }
  }
}

// 4. Find tight bounding box
let minX = srcW, maxX = 0, minY = srcH, maxY = 0;
for (let y = 0; y < srcH; y++) {
  for (let x = 0; x < srcW; x++) {
    const idx = (y * srcW + x) * 4;
    if (cleanedSrc[idx+3] > 0) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

// Crop to badge buffer
const badgePixels = Buffer.alloc(cropW * cropH * 4);
for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((minY + y) * srcW + (minX + x)) * 4;
    const dstIdx = (y * cropW + x) * 4;
    badgePixels[dstIdx] = cleanedSrc[srcIdx];
    badgePixels[dstIdx+1] = cleanedSrc[srcIdx+1];
    badgePixels[dstIdx+2] = cleanedSrc[srcIdx+2];
    badgePixels[dstIdx+3] = cleanedSrc[srcIdx+3];
  }
}

console.log(`Badge cropped: ${cropW}x${cropH} (aspect ratio ${(cropW / cropH).toFixed(2)})`);

// 5. CRC32 table & helper
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// 6. Encode RGBA buffer to PNG
function encodePng(width, height, rgbaBuf) {
  const rowLen = 1 + width * 4;
  const rawData = Buffer.alloc(rowLen * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLen;
    rawData[rowOffset] = 0; // Filter: None
    const srcOffset = y * width * 4;
    rgbaBuf.copy(rawData, rowOffset + 1, srcOffset, srcOffset + width * 4);
  }

  const compressed = zlib.deflateSync(rawData);
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // RGBA (Truecolor with alpha)
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);

  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// 7. Area-averaging / supersampling / bilinear image resizer onto square canvas
function renderOnSquareCanvas(targetSize, paddingFactor = 0.94) {
  const outBuf = Buffer.alloc(targetSize * targetSize * 4, 0); // Transparent black initial

  const maxDrawW = Math.round(targetSize * paddingFactor);
  const drawW = maxDrawW;
  const drawH = Math.max(1, Math.round(drawW * (cropH / cropW)));

  const offsetX = Math.round((targetSize - drawW) / 2);
  const offsetY = Math.round((targetSize - drawH) / 2);

  for (let ty = 0; ty < drawH; ty++) {
    for (let tx = 0; tx < drawW; tx++) {
      const outX = offsetX + tx;
      const outY = offsetY + ty;
      if (outX < 0 || outX >= targetSize || outY < 0 || outY >= targetSize) continue;

      // Area in source coordinates
      const sx0 = (tx / drawW) * cropW;
      const sx1 = ((tx + 1) / drawW) * cropW;
      const sy0 = (ty / drawH) * cropH;
      const sy1 = ((ty + 1) / drawH) * cropH;

      let sumR = 0, sumG = 0, sumB = 0, sumA = 0, totalWeight = 0;

      const startX = Math.floor(sx0);
      const endX = Math.min(cropW - 1, Math.floor(sx1));
      const startY = Math.floor(sy0);
      const endY = Math.min(cropH - 1, Math.floor(sy1));

      for (let sy = startY; sy <= endY; sy++) {
        const yWeight = Math.min(sy + 1, sy1) - Math.max(sy, sy0);
        if (yWeight <= 0) continue;

        for (let sx = startX; sx <= endX; sx++) {
          const xWeight = Math.min(sx + 1, sx1) - Math.max(sx, sx0);
          if (xWeight <= 0) continue;

          const weight = xWeight * yWeight;
          const srcIdx = (sy * cropW + sx) * 4;
          const sa = badgePixels[srcIdx + 3] / 255.0;

          // Premultiply by alpha for accurate blending
          sumR += badgePixels[srcIdx] * sa * weight;
          sumG += badgePixels[srcIdx + 1] * sa * weight;
          sumB += badgePixels[srcIdx + 2] * sa * weight;
          sumA += badgePixels[srcIdx + 3] * weight;
          totalWeight += weight;
        }
      }

      const outIdx = (outY * targetSize + outX) * 4;
      if (totalWeight > 0 && sumA > 0) {
        const finalA = sumA / totalWeight;
        const normFactor = finalA / 255.0;
        if (normFactor > 0.001) {
          outBuf[outIdx] = Math.min(255, Math.max(0, Math.round((sumR / totalWeight) / normFactor)));
          outBuf[outIdx + 1] = Math.min(255, Math.max(0, Math.round((sumG / totalWeight) / normFactor)));
          outBuf[outIdx + 2] = Math.min(255, Math.max(0, Math.round((sumB / totalWeight) / normFactor)));
          outBuf[outIdx + 3] = Math.min(255, Math.max(0, Math.round(finalA)));
        }
      }
    }
  }

  return encodePng(targetSize, targetSize, outBuf);
}

// 8. Create multi-icon ICO buffer from PNG buffers
function buildIco(pngEntries) {
  // Header: 6 bytes
  const count = pngEntries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4);

  // Directory entries: 16 bytes each
  const dirSize = 16 * count;
  let currentOffset = 6 + dirSize;

  const dirBuffers = [];
  const dataBuffers = [];

  for (const { size, pngBuf } of pngEntries) {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size; // width
    entry[1] = size >= 256 ? 0 : size; // height
    entry[2] = 0; // color palette count
    entry[3] = 0; // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(pngBuf.length, 8); // size of data
    entry.writeUInt32LE(currentOffset, 12); // offset

    dirBuffers.push(entry);
    dataBuffers.push(pngBuf);
    currentOffset += pngBuf.length;
  }

  return Buffer.concat([header, ...dirBuffers, ...dataBuffers]);
}

// 9. Generate all sizes
fs.mkdirSync('assets', { recursive: true });

// Raw cropped badge
const badgePng = encodePng(cropW, cropH, badgePixels);
fs.writeFileSync('assets/favicon-badge.png', badgePng);
fs.writeFileSync('assets/favicon.png', badgePng);
fs.writeFileSync('favicon.png', badgePng);

// Square canvases
const png16 = renderOnSquareCanvas(16, 0.96);
const png32 = renderOnSquareCanvas(32, 0.94);
const png48 = renderOnSquareCanvas(48, 0.94);
const png64 = renderOnSquareCanvas(64, 0.94);
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

// SVG vector/wrapper favicon
const base64Png = badgePng.toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cropW} ${cropH}" width="100%" height="100%">
  <image width="${cropW}" height="${cropH}" href="data:image/png;base64,${base64Png}" />
</svg>
`;
fs.writeFileSync('assets/favicon.svg', svgContent);

console.log('✅ Generated:');
console.log(' - favicon.ico (16, 32, 48)');
console.log(' - assets/favicon.ico');
console.log(' - favicon.png');
console.log(' - assets/favicon.png');
console.log(' - assets/favicon-16x16.png');
console.log(' - assets/favicon-32x32.png');
console.log(' - assets/favicon-48x48.png');
console.log(' - assets/apple-touch-icon.png (180x180)');
console.log(' - assets/icon-192.png (PWA)');
console.log(' - assets/icon-512.png (PWA)');
console.log(' - assets/favicon.svg');
