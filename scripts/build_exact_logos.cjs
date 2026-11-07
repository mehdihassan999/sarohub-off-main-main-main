const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// =========================================================================
// SaroHub Authentic Vector Geometry
// Image 1: Full horizontal logo ("final company logo dodne.png")
// Image 2: Standalone emblem icon ("final company logo done white.png")
// =========================================================================

// Standalone Emblem SVG (Matching Image 2 exactly)
// ViewBox: 0 0 520 840
const emblemSvgInner = `
  <!-- Shape 1: Top-Left Aerodynamic Blade / Wing -->
  <path d="M 365 8
           C 374 15 370 26 356 38
           L 74 554
           C 52 588 22 576 10 538
           C 0 495 2 410 45 295
           C 95 165 210 60 330 14
           C 345 8 358 4 365 8 Z" fill="#FFFFFF" />

  <!-- Shape 2: Main Body with Crest, Wing/Beak, and Bottom Loop -->
  <path d="M 390 66
           C 418 20 454 14 485 44
           C 516 75 520 180 500 320
           C 488 400 482 432 518 456
           C 524 460 520 466 508 468
           C 475 474 412 470 386 460
           C 374 455 368 466 376 476
           C 420 535 464 610 445 710
           C 420 810 325 835 240 825
           C 155 815 118 730 115 650
           C 112 580 156 540 215 540
           L 390 66 Z" fill="#FFFFFF" />

  <!-- Shape 3: Nestled Circular Dot -->
  <circle cx="302" cy="744" r="54" fill="#FFFFFF" />
`;

// 1. Standalone Emblem SVG (520 x 840)
const emblemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 840" width="520" height="840" fill="none">
  <g id="sarohub-emblem">
    ${emblemSvgInner}
  </g>
</svg>`;

// 2. Full Horizontal Lockup (Matching Image 1: "final company logo dodne.png")
// Perfectly cropped to exact bounding box (1440 x 840) with zero dead whitespace!
// Left: Emblem (scaled to fit full 840 height)
// Right: "SAROHUB" bold uppercase + "TECHNOLOGIES" clean uppercase directly below
const fullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 840" width="1440" height="840" fill="none">
  <!-- Left: SaroHub Official Emblem Mark -->
  <g id="sarohub-mark" transform="translate(10, 0)">
    ${emblemSvgInner}
  </g>

  <!-- Right: Official Typography (Matching Image 1: Large & Bold) -->
  <g id="sarohub-typography" transform="translate(560, 0)">
    <!-- Line 1: SAROHUB in bold modern geometric caps -->
    <text x="0" y="520" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Arial Black', sans-serif" 
          font-size="240" 
          font-weight="900" 
          letter-spacing="5" 
          fill="#FFFFFF">SAROHUB</text>

    <!-- Line 2: TECHNOLOGIES in clean tracked caps matching SAROHUB width -->
    <text x="6" y="685" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" 
          font-size="96" 
          font-weight="700" 
          letter-spacing="24" 
          fill="#FFFFFF">TECHNOLOGIES</text>
  </g>
</svg>`;

// 3. Favicon (Matching Image 2: "final company logo done white.png")
// Square 512x512 with the emblem centered and prominent for 16x16 / 32x32 visibility
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <!-- Deep sleek dark background -->
  <rect width="512" height="512" rx="100" fill="#08090E" />
  <!-- Centered White Emblem from Image 2 (scaled to 460px height = ~90% canvas) -->
  <g transform="translate(114, 26) scale(0.55)">
    ${emblemSvgInner}
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

// Write SVGs
writeAsset('assets/sarohub-emblem.svg', emblemSvg);
writeAsset('assets/sarohub-logo.svg', fullLogoSvg);
writeAsset('assets/favicon.svg', faviconSvg);
writeAsset('favicon.svg', faviconSvg);
console.log('Saved vector SVGs successfully');

// Render PNGs with Resvg
try {
  // 1. Full Horizontal Logo (Image 1) at high-res 1440px width
  const fullLogoResvg = new Resvg(fullLogoSvg, { fitTo: { mode: 'width', value: 1440 } });
  const fullLogoPng = fullLogoResvg.render().asPng();
  writeAsset('assets/sarohub-logo.png', fullLogoPng);
  writeAsset('sarohub-logo.png', fullLogoPng);
  console.log('Rendered full logo PNG (1440px)');

  // 2. Favicon (Image 2) at 512x512
  const faviconResvg = new Resvg(faviconSvg, { fitTo: { mode: 'width', value: 512 } });
  const faviconPng = faviconResvg.render().asPng();
  writeAsset('assets/favicon.png', faviconPng);
  writeAsset('favicon.png', faviconPng);
  writeAsset('apple-touch-icon.png', faviconPng);

  // Generate valid Windows ICO file with 16x16, 32x32, and 48x48 icons
  const ico16 = new Resvg(faviconSvg, { fitTo: { mode: 'width', value: 16 } }).render().asPng();
  const ico32 = new Resvg(faviconSvg, { fitTo: { mode: 'width', value: 32 } }).render().asPng();
  const ico48 = new Resvg(faviconSvg, { fitTo: { mode: 'width', value: 48 } }).render().asPng();

  writeAsset('assets/favicon-16x16.png', ico16);
  writeAsset('favicon-16x16.png', ico16);
  writeAsset('assets/favicon-32x32.png', ico32);
  writeAsset('favicon-32x32.png', ico32);
  writeAsset('assets/apple-touch-icon.png', faviconPng);
  writeAsset('apple-touch-icon.png', faviconPng);

  const createIco = (images) => {
    const count = images.length;
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // icon type
    header.writeUInt16LE(count, 4); // image count

    let offset = 6 + count * 16;
    const entries = [];
    for (const img of images) {
      const entry = Buffer.alloc(16);
      entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // width
      entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // height
      entry.writeUInt8(0, 2); // color count
      entry.writeUInt8(0, 3); // reserved
      entry.writeUInt16LE(1, 4); // color planes
      entry.writeUInt16LE(32, 6); // bits per pixel
      entry.writeUInt32LE(img.buffer.length, 8); // image size
      entry.writeUInt32LE(offset, 12); // image offset
      entries.push(entry);
      offset += img.buffer.length;
    }

    return Buffer.concat([header, ...entries, ...images.map(i => i.buffer)]);
  };

  const icoBuffer = createIco([
    { size: 16, buffer: ico16 },
    { size: 32, buffer: ico32 },
    { size: 48, buffer: ico48 }
  ]);
  writeAsset('favicon.ico', icoBuffer);
  writeAsset('assets/favicon.ico', icoBuffer);
  console.log('Rendered favicon PNG, valid multi-res ICO, and apple-touch-icon');

  // 3. Standalone Emblem PNG (Image 2)
  const emblemResvg = new Resvg(emblemSvg, { fitTo: { mode: 'width', value: 520 } });
  const emblemPng = emblemResvg.render().asPng();
  writeAsset('assets/sarohub-emblem.png', emblemPng);
  console.log('Rendered sarohub-emblem.png');
} catch (err) {
  console.error('Error rendering PNGs with Resvg:', err);
}
