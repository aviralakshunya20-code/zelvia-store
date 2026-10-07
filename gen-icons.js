// scripts/gen-icons.js - Generate valid PNG icons for PWA
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(size, bgR, bgG, bgB, fgR, fgG, fgB) {
  const width = size;
  const height = size;

  // Uncompressed raw image data: (width * 3 + 1) * height
  // Filter byte (0 = None) at the beginning of each scanline
  const rowLen = 1 + width * 3;
  const rawData = Buffer.alloc(rowLen * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLen;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;

      // Draw rounded card/ruler in center
      const inBox = (x >= width * 0.25 && x <= width * 0.75 && y >= height * 0.15 && y <= height * 0.85);
      const isBorder = inBox && (
        x <= width * 0.25 + 4 || x >= width * 0.75 - 4 ||
        y <= height * 0.15 + 4 || y >= height * 0.85 - 4
      );

      if (isBorder) {
        rawData[pxOffset] = 43;     // ink
        rawData[pxOffset + 1] = 33;
        rawData[pxOffset + 2] = 24;
      } else if (inBox) {
        rawData[pxOffset] = fgR;   // mustard #F3B73B
        rawData[pxOffset + 1] = fgG;
        rawData[pxOffset + 2] = fgB;
      } else {
        rawData[pxOffset] = bgR;   // paper #F6EFDC
        rawData[pxOffset + 1] = bgG;
        rawData[pxOffset + 2] = bgB;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);

    // CRC32 of type + data
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type: Truecolor (RGB)
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = makeChunk('IHDR', ihdrData);

  // IDAT
  const idat = makeChunk('IDAT', compressed);

  // IEND
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// CRC32 table & function
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

fs.mkdirSync('assets', { recursive: true });
fs.writeFileSync('assets/icon-192.png', createPng(192, 0xF6, 0xEF, 0xDC, 0xF3, 0xB7, 0x3B));
fs.writeFileSync('assets/icon-512.png', createPng(512, 0xF6, 0xEF, 0xDC, 0xF3, 0xB7, 0x3B));
console.log('Generated icon-192.png and icon-512.png');
