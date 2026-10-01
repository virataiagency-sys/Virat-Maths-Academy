import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Function to generate uncompressed/deflated raw PNG bytes
function createPNG(width, height, getPixel) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA color type
  ihdrData.writeUInt8(0, 10); // deflate
  ihdrData.writeUInt8(0, 11); // adaptive filter
  ihdrData.writeUInt8(0, 12); // no interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image data with filter byte 0 at start of each scanline
  const scanlineLength = width * 4 + 1;
  const rawData = Buffer.alloc(scanlineLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(len + 12);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, len + 8));
  chunk.writeInt32BE(crc, len + 8);
  return chunk;
}

// Standard CRC32 table
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ -1);
}

// Modern gradient with letter "V" and mathematical harmony
function brandPixel(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const nx = x / w;
  const ny = y / h;

  // Background gradient: Deep Indigo to Dark Navy
  const rBg = Math.floor(49 + (15 - 49) * ny);
  const gBg = Math.floor(46 + (23 - 46) * ny);
  const bBg = Math.floor(129 + (42 - 129) * ny);

  // Center radius
  const dx = (x - cx) / (w * 0.5);
  const dy = (y - cy) / (h * 0.5);
  const dist = Math.sqrt(dx * dx + dy * dy);

  // If maskable, fill entirely; if regular, round corners
  if (!isMaskable && dist > 1.25) {
    return [0, 0, 0, 0];
  }

  // Draw stylized "V"
  // Map to unit coordinate -1 to 1
  const uX = (x - cx) / (w * 0.4);
  const uY = (y - cy) / (h * 0.4);

  // Left arm of V: line from (-0.7, -0.7) to (0, 0.7)
  // Right arm of V: line from (0.7, -0.7) to (0, 0.7)
  const distLeftArm = Math.abs(uY - (2 * -uX - 0.7));
  const distRightArm = Math.abs(uY - (2 * uX - 0.7));

  const onV = (uY >= -0.7 && uY <= 0.7) && (
    (uX <= 0.1 && Math.abs(uY - (-2 * uX - 0.7)) < 0.25) ||
    (uX >= -0.1 && Math.abs(uY - (2 * uX - 0.7)) < 0.25)
  );

  if (onV) {
    // Gradient on V: Indigo to Rose Pink
    const rV = Math.floor(129 + (244 - 129) * (0.5 + uY * 0.5));
    const gV = Math.floor(140 + (63 - 140) * (0.5 + uY * 0.5));
    const bV = Math.floor(248 + (94 - 248) * (0.5 + uY * 0.5));
    return [rV, gV, bV, 255];
  }

  // Golden accent dot at top
  const dotDist = Math.hypot(x - cx, y - (cy - h * 0.32));
  if (dotDist < w * 0.04) {
    return [250, 204, 21, 255]; // Golden bead
  }

  return [rBg, gBg, bBg, 255];
}

const outDir = path.resolve('public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Generating PWA compliant icons...');
fs.writeFileSync(path.join(outDir, 'pwa-192x192.png'), createPNG(192, 192, (x, y, w, h) => brandPixel(x, y, w, h, false)));
fs.writeFileSync(path.join(outDir, 'pwa-512x512.png'), createPNG(512, 512, (x, y, w, h) => brandPixel(x, y, w, h, false)));
fs.writeFileSync(path.join(outDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, (x, y, w, h) => brandPixel(x, y, w, h, true)));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), createPNG(180, 180, (x, y, w, h) => brandPixel(x, y, w, h, false)));
console.log('✅ Generated 192x192, 512x512, maskable 512x512, and apple-touch-icon.png successfully!');
