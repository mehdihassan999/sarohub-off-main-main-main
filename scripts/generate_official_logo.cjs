const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// =========================================================================
// SaroHub Technologies Official Emblem Mark Geometry
// Faithfully matching the user's uploaded "final company logo done white.png"
// Coordinate space: 0 0 600 960 (2:1 diagonal slope grid)
// =========================================================================

// 1. Standalone Emblem SVG (White version)
const emblemWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 960" width="600" height="960" fill="none">
  <g fill="#FFFFFF">
    <!-- Shape 1: Top-Left Blade / Wing -->
    <path d="M 382 66
             C 395 32 376 12 345 18
             C 300 28 220 85 145 190
             C 70 295 18 420 8 525
             C 2 590 18 655 58 685
             C 82 702 108 692 118 662
             C 122 650 118 638 112 622
             L 382 66 Z" />

    <!-- Shape 2: Main Body -->
    <path d="M 432 58
             C 455 24 485 18 512 36
             C 548 60 575 118 588 200
             C 600 280 588 380 560 460
             C 545 500 535 525 595 558
             C 602 562 600 572 590 575
             C 560 585 470 595 442 590
             C 432 588 428 596 432 606
             C 458 665 480 735 465 810
             C 445 905 370 955 275 958
             C 185 960 115 905 92 825
             C 70 750 85 660 145 580
             C 178 535 220 480 258 430
             L 432 58 Z" />

    <!-- Shape 3: Bottom Cradle Circle -->
    <circle cx="350" cy="855" r="65" />
  </g>
</svg>`;

// 2. Full Brand Lockup (Emblem on Left + "SAROHUB" Modern Wordmark on Right)
// ViewBox: 0 0 1100 320
const fullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 320" width="1100" height="320" fill="none">
  <defs>
    <linearGradient id="logo-gold-orange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE600" />
      <stop offset="30%" stop-color="#FFA800" />
      <stop offset="65%" stop-color="#FF5C00" />
      <stop offset="100%" stop-color="#FF3800" />
    </linearGradient>
  </defs>

  <!-- Left: The Official SaroHub Emblem (Scaled to 256px height) -->
  <g transform="translate(36, 12) scale(0.31)" fill="#FFFFFF">
    <path d="M 382 66
             C 395 32 376 12 345 18
             C 300 28 220 85 145 190
             C 70 295 18 420 8 525
             C 2 590 18 655 58 685
             C 82 702 108 692 118 662
             C 122 650 118 638 112 622
             L 382 66 Z" />
    <path d="M 432 58
             C 455 24 485 18 512 36
             C 548 60 575 118 588 200
             C 600 280 588 380 560 460
             C 545 500 535 525 595 558
             C 602 562 600 572 590 575
             C 560 585 470 595 442 590
             C 432 588 428 596 432 606
             C 458 665 480 735 465 810
             C 445 905 370 955 275 958
             C 185 960 115 905 92 825
             C 70 750 85 660 145 580
             C 178 535 220 480 258 430
             L 432 58 Z" />
    <circle cx="350" cy="855" r="65" />
  </g>

  <!-- Right: Sleek Corporate Wordmark -->
  <g transform="translate(265, 0)">
    <text x="0" y="185" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" 
          font-size="124" 
          font-weight="900" 
          letter-spacing="2" 
          fill="#FFFFFF">SAROHUB</text>

    <!-- Glowing Accent Dot on Wordmark -->
    <circle cx="682" cy="172" r="9" fill="url(#logo-gold-orange)" />

    <!-- Subtitle: TECHNOLOGIES with Monospace Tracking -->
    <text x="4" y="248" 
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" 
          font-size="25" 
          font-weight="700" 
          letter-spacing="12" 
          fill="#FF5C00">TECHNOLOGIES</text>

    <line x1="390" y1="240" x2="685" y2="240" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
  </g>
</svg>`;

// 3. Crisp High-Visibility Favicon SVG (512x512)
// Specifically designed for high visibility at tiny 16x16 and 32x32 browser tab sizes:
// Deep sleek dark background (#08090E) with subtle radiant border and large, bold centered white emblem!
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <!-- Rounded Background Container -->
  <rect width="512" height="512" rx="112" fill="#08090E" />
  <!-- Vibrant Accent Glow Border -->
  <rect x="4" y="4" width="504" height="504" rx="108" stroke="#FF5C00" stroke-opacity="0.35" stroke-width="8" />
  <!-- Radiant Core Aura -->
  <circle cx="256" cy="256" r="180" fill="#FF5C00" opacity="0.12" filter="blur(20px)" />
  <!-- Bold Centered SaroHub Emblem (fills ~90% height for crisp 16x16/32x32 visibility) -->
  <g transform="translate(112, 26) scale(0.48)" fill="#FFFFFF">
    <path d="M 382 66
             C 395 32 376 12 345 18
             C 300 28 220 85 145 190
             C 70 295 18 420 8 525
             C 2 590 18 655 58 685
             C 82 702 108 692 118 662
             C 122 650 118 638 112 622
             L 382 66 Z" />
    <path d="M 432 58
             C 455 24 485 18 512 36
             C 548 60 575 118 588 200
             C 600 280 588 380 560 460
             C 545 500 535 525 595 558
             C 602 562 600 572 590 575
             C 560 585 470 595 442 590
             C 432 588 428 596 432 606
             C 458 665 480 735 465 810
             C 445 905 370 955 275 958
             C 185 960 115 905 92 825
             C 70 750 85 660 145 580
             C 178 535 220 480 258 430
             L 432 58 Z" />
    <circle cx="350" cy="855" r="65" />
  </g>
</svg>`;

// Helper to write files to public and dist
const writeAsset = (relPath, content) => {
  const p1 = path.join('public', relPath);
  fs.mkdirSync(path.dirname(p1), { recursive: true });
  fs.writeFileSync(p1, content);

  if (fs.existsSync('dist')) {
    const p2 = path.join('dist', relPath);
    fs.mkdirSync(path.dirname(p2), { recursive: true });
    fs.writeFileSync(p2, content);
  }
};

writeAsset('assets/sarohub-emblem.svg', emblemWhiteSvg);
writeAsset('assets/sarohub-logo.svg', fullLogoSvg);
writeAsset('assets/favicon.svg', faviconSvg);
writeAsset('favicon.svg', faviconSvg);
console.log('Saved vector SVGs');

try {
  // 1. Full Horizontal Logo PNG (1200px width)
  const logoResvg = new Resvg(fullLogoSvg, { fitTo: { mode: 'width', value: 1200 } });
  const logoPngBuffer = logoResvg.render().asPng();
  writeAsset('assets/sarohub-logo.png', logoPngBuffer);
  writeAsset('sarohub-logo.png', logoPngBuffer);
  console.log('Rendered sarohub-logo.png (1200px)');

  // 2. Favicon PNG (512x512 and 192x192)
  const faviconResvg = new Resvg(faviconSvg, { fitTo: { mode: 'width', value: 512 } });
  const faviconPngBuffer = faviconResvg.render().asPng();
  writeAsset('assets/favicon.png', faviconPngBuffer);
  writeAsset('favicon.png', faviconPngBuffer);
  writeAsset('favicon.ico', faviconPngBuffer); // Direct fallback for root /favicon.ico
  writeAsset('apple-touch-icon.png', faviconPngBuffer);
  console.log('Rendered favicon.png, favicon.ico, and apple-touch-icon.png');

  // 3. Standalone Emblem PNG (600x960)
  const emblemResvg = new Resvg(emblemWhiteSvg, { fitTo: { mode: 'width', value: 600 } });
  const emblemPngBuffer = emblemResvg.render().asPng();
  writeAsset('assets/sarohub-emblem.png', emblemPngBuffer);
  console.log('Rendered sarohub-emblem.png');
} catch (err) {
  console.error('Error rendering PNGs with Resvg:', err);
}
