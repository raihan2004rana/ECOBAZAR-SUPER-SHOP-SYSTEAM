const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 1. Ensure directories exist
const webPublicDir = path.join(__dirname, '..', 'apps', 'web', 'public');
const adminPublicDir = path.join(__dirname, '..', 'apps', 'admin', 'public');
const webIconsDir = path.join(webPublicDir, 'icons');
const adminIconsDir = path.join(adminPublicDir, 'icons');

[webIconsDir, adminIconsDir].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// 2. Official SVG Icon for ECOBAZAR App
const svgIconContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- App Background with elegant rounded corner container -->
  <rect width="512" height="512" rx="112" fill="#123C2D" />
  <rect x="12" y="12" width="488" height="488" rx="100" stroke="#2EBD70" stroke-width="6" stroke-opacity="0.35" />

  <!-- Inner Soft Radial Glow -->
  <circle cx="256" cy="240" r="180" fill="#2EBD70" fill-opacity="0.12" />

  <!-- Shopping Basket with Produce Group -->
  <g transform="translate(68, 60) scale(3.76)">
    <defs>
      <linearGradient id="pwaBasketGrad" x1="10" y1="45" x2="90" y2="85" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2EBD70" />
        <stop offset="1" stop-color="#0E3024" />
      </linearGradient>
      <linearGradient id="pwaCarrotGrad" x1="30" y1="20" x2="45" y2="45" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F97316" />
        <stop offset="1" stop-color="#EA580C" />
      </linearGradient>
      <linearGradient id="pwaTomatoGrad" x1="18" y1="22" x2="38" y2="42" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EF4444" />
        <stop offset="1" stop-color="#B91C1C" />
      </linearGradient>
      <linearGradient id="pwaAppleGrad" x1="62" y1="20" x2="82" y2="40" gradientUnits="userSpaceOnUse">
        <stop stop-color="#DC2626" />
        <stop offset="1" stop-color="#991B1B" />
      </linearGradient>
    </defs>

    <!-- Veggies & Fruits popping from basket -->
    <path d="M42 16C42 16 48 8 56 14C64 20 54 28 54 28" fill="#22C55E" />
    <path d="M50 20C50 20 60 12 68 18C76 24 64 32 64 32" fill="#16A34A" />

    <!-- Tomato Left -->
    <circle cx="28" cy="34" r="14" fill="url(#pwaTomatoGrad)" />
    <path d="M28 20C28 20 26 15 28 12C30 15 28 20 28 20Z" fill="#15803D" stroke="#15803D" stroke-width="2" stroke-linecap="round" />
    <path d="M25 18C25 18 20 17 18 19C21 20 25 18 25 18Z" fill="#15803D" />
    <path d="M31 18C31 18 36 17 38 19C35 20 31 18 31 18Z" fill="#15803D" />

    <!-- Carrot Center -->
    <path d="M46 18C44 14 42 8 38 6C42 10 46 14 46 18Z" fill="#22C55E" />
    <path d="M48 18C50 14 54 8 58 6C54 10 50 14 48 18Z" fill="#16A34A" />
    <path d="M38 24L56 22L50 48L44 48Z" fill="url(#pwaCarrotGrad)" />

    <!-- Red Apple Right -->
    <circle cx="72" cy="34" r="13" fill="url(#pwaAppleGrad)" />
    <path d="M72 21C74 17 78 15 80 16C78 19 75 22 72 21Z" fill="#15803D" />

    <!-- Citrus -->
    <ellipse cx="46" cy="38" rx="10" ry="8" fill="#FACC15" />

    <!-- Shopping Basket Body -->
    <path
      d="M12 44C12 40.6863 14.6863 38 18 38H82C85.3137 38 88 40.6863 88 44L80 78C79.2 81.5 76.2 84 72.6 84H27.4C23.8 84 20.8 81.5 20 78L12 44Z"
      fill="url(#pwaBasketGrad)"
    />

    <!-- Basket Rim -->
    <rect x="10" y="38" width="80" height="7" rx="3.5" fill="#0C251C" />

    <!-- Basket Slits -->
    <rect x="25" y="52" width="6" height="18" rx="3" fill="#D8F3DC" opacity="0.9" />
    <rect x="37" y="52" width="6" height="20" rx="3" fill="#D8F3DC" opacity="0.9" />
    <rect x="49" y="52" width="6" height="20" rx="3" fill="#D8F3DC" opacity="0.9" />
    <rect x="61" y="52" width="6" height="20" rx="3" fill="#D8F3DC" opacity="0.9" />
    <rect x="73" y="52" width="6" height="18" rx="3" fill="#D8F3DC" opacity="0.9" />

    <!-- Wheels -->
    <circle cx="34" cy="89" r="6" fill="#0C251C" stroke="#D8F3DC" stroke-width="2" />
    <circle cx="66" cy="89" r="6" fill="#0C251C" stroke="#D8F3DC" stroke-width="2" />
  </g>
</svg>`;

fs.writeFileSync(path.join(webIconsDir, 'icon.svg'), svgIconContent, 'utf8');
fs.writeFileSync(path.join(adminIconsDir, 'icon.svg'), svgIconContent, 'utf8');
fs.writeFileSync(path.join(webPublicDir, 'favicon.svg'), svgIconContent, 'utf8');
fs.writeFileSync(path.join(adminPublicDir, 'favicon.svg'), svgIconContent, 'utf8');

// 3. PNG Generator with Pure Node
function generatePixelRaster(size) {
  const buf = Buffer.alloc(size * size * 4);

  // Background color: #123C2D (r: 18, g: 60, b: 45)
  const bgR = 18, bgG = 60, bgB = 45;
  // Border color: #2EBD70 (r: 46, g: 189, b: 112)
  const bdrR = 46, bdrG = 189, bdrB = 112;
  // Basket green: #16A36A
  const bsktR = 22, bsktG = 163, bsktB = 106;
  // White/Light: #D8F3DC
  const wtR = 216, wtG = 243, wtB = 220;
  // Red produce: #DC2626
  const rdR = 220, rdG = 38, rdB = 38;
  // Orange carrot: #EA580C
  const orgR = 234, orgG = 88, orgB = 12;
  // Gold/Yellow: #FACC15
  const ylwR = 250, ylwG = 204, ylwB = 21;

  const cornerRadius = size * 0.22;

  function isInsideRoundedRect(x, y, w, h, r) {
    if (x < 0 || x >= w || y < 0 || y >= h) return false;
    if (x < r && y < r) return (x - r) * (x - r) + (y - r) * (y - r) <= r * r;
    if (x > w - r && y < r) return (x - (w - r)) * (x - (w - r)) + (y - r) * (y - r) <= r * r;
    if (x < r && y > h - r) return (x - r) * (x - r) + (y - (h - r)) * (y - (h - r)) <= r * r;
    if (x > w - r && y > h - r) return (x - (w - r)) * (x - (w - r)) + (y - (h - r)) * (y - (h - r)) <= r * r;
    return true;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      
      if (!isInsideRoundedRect(x, y, size, size, cornerRadius)) {
        // Transparent outside
        buf[idx] = 0;
        buf[idx + 1] = 0;
        buf[idx + 2] = 0;
        buf[idx + 3] = 0;
        continue;
      }

      // Inside base background
      let r = bgR, g = bgG, b = bgB, a = 255;

      // Subtle border stroke
      const borderThick = Math.max(2, Math.floor(size * 0.02));
      if (!isInsideRoundedRect(x - borderThick, y - borderThick, size - borderThick * 2, size - borderThick * 2, cornerRadius - borderThick)) {
        r = bdrR; g = bdrG; b = bdrB;
      }

      // Normalized coordinates (0 to 1)
      const nx = x / size;
      const ny = y / size;

      // Draw produce at top:
      // Tomato (Left: nx ~0.35, ny ~0.36, radius ~0.12)
      const dTomato = Math.hypot(nx - 0.35, ny - 0.36);
      if (dTomato < 0.12) {
        r = rdR; g = rdG; b = rdB;
      }

      // Carrot (Center: nx ~0.50, ny ~0.34, radius ~0.09)
      const dCarrot = Math.hypot(nx - 0.50, ny - 0.34);
      if (dCarrot < 0.09) {
        r = orgR; g = orgG; b = orgB;
      }

      // Apple (Right: nx ~0.65, ny ~0.36, radius ~0.11)
      const dApple = Math.hypot(nx - 0.65, ny - 0.36);
      if (dApple < 0.11) {
        r = rdR; g = rdG; b = rdB;
      }

      // Leaf / greens top
      const dLeaf = Math.hypot(nx - 0.50, ny - 0.22);
      if (dLeaf < 0.08) {
        r = 34; g = 197; b = 94;
      }

      // Basket Rim: ny from 0.44 to 0.50, nx from 0.20 to 0.80
      if (ny >= 0.44 && ny <= 0.50 && nx >= 0.20 && nx <= 0.80) {
        r = 12; g = 40; b = 30; // Dark rim
      }

      // Basket Body: ny from 0.50 to 0.76, tapering from top (0.22..0.78) to bottom (0.28..0.72)
      const t = (ny - 0.50) / 0.26;
      if (t >= 0 && t <= 1) {
        const leftBound = 0.22 + t * 0.06;
        const rightBound = 0.78 - t * 0.06;
        if (nx >= leftBound && nx <= rightBound) {
          r = bsktR; g = bsktG; b = bsktB;

          // Vertical white slits
          const slits = [0.33, 0.44, 0.55, 0.66];
          for (const s of slits) {
            if (Math.abs(nx - s) < 0.022 && ny >= 0.55 && ny <= 0.70) {
              r = wtR; g = wtG; b = wtB;
            }
          }
        }
      }

      // Wheels: ny ~0.80, nx ~0.36 and 0.64, radius ~0.04
      const dWheel1 = Math.hypot(nx - 0.38, ny - 0.81);
      const dWheel2 = Math.hypot(nx - 0.62, ny - 0.81);
      if (dWheel1 < 0.045 || dWheel2 < 0.045) {
        r = wtR; g = wtG; b = wtB;
      }

      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = a;
    }
  }

  return buf;
}

function encodePng(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
    return crc ^ -1;
  }

  const crcTable = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[i] = c;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    const crc = crc32(buf.slice(4, 8 + len));
    buf.writeInt32BE(crc, 8 + len);
    return buf;
  }

  const stride = 1 + width * 4;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const offset = y * stride;
    raw[offset] = 0; // Filter None
    const srcOffset = y * width * 4;
    rgbaBuffer.copy(raw, offset + 1, srcOffset, srcOffset + width * 4);
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

console.log('Generating PNG Icons...');
const sizes = [
  { size: 192, filename: 'icon-192x192.png' },
  { size: 512, filename: 'icon-512x512.png' },
  { size: 180, filename: 'apple-touch-icon.png' },
];

for (const { size, filename } of sizes) {
  const rgba = generatePixelRaster(size);
  const png = encodePng(size, size, rgba);
  fs.writeFileSync(path.join(webIconsDir, filename), png);
  fs.writeFileSync(path.join(adminIconsDir, filename), png);
  if (filename === 'apple-touch-icon.png') {
    fs.writeFileSync(path.join(webPublicDir, 'apple-touch-icon.png'), png);
  }
  console.log(`Saved ${filename} (${size}x${size}, ${png.length} bytes)`);
}

// 4. Create Web App Manifest (manifest.json)
const manifestData = {
  name: 'ECOBAZAR Supermarket & Grocery',
  short_name: 'ECOBAZAR',
  description: 'Online supermarket and fresh grocery shopping in Bangladesh. 100% formaline-free organic food, farm-to-table delivery within 30 minutes.',
  start_url: '/',
  display: 'standalone',
  background_color: '#123C2D',
  theme_color: '#123C2D',
  orientation: 'portrait-primary',
  dir: 'ltr',
  lang: 'bn-BD',
  categories: ['shopping', 'food', 'lifestyle'],
  icons: [
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable'
    },
    {
      src: '/icons/icon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any'
    }
  ],
  shortcuts: [
    {
      name: "Today's Best Deals",
      short_name: "Deals",
      url: "/deals",
      icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }]
    },
    {
      name: "Fresh Fruits & Vegetables",
      short_name: "Vegetables",
      url: "/category/fresh-fruits-vegetables",
      icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }]
    },
    {
      name: "Store Outlets & Delivery Hubs",
      short_name: "Branches",
      url: "/branches",
      icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }]
    }
  ],
  prefer_related_applications: false
};

fs.writeFileSync(path.join(webPublicDir, 'manifest.json'), JSON.stringify(manifestData, null, 2), 'utf8');
fs.writeFileSync(path.join(adminPublicDir, 'manifest.json'), JSON.stringify(manifestData, null, 2), 'utf8');
console.log('Saved manifest.json successfully');
