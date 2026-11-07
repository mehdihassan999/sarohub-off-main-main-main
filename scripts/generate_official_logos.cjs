const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// =========================================================================
// Official SaroHub Emblem Vector Path (Matching Image 2: final company logo done white.png)
// Coordinate space: 0 0 500 800
// =========================================================================
const emblemPathData = `
  <!-- Shape 1: Top-Left Aerodynamic Blade / Wing -->
  <path d="M 335 0
           C 345 5 352 16 350 28
           C 348 38 340 50 330 60
           L 100 520
           C 80 545 48 550 28 530
           C 8 510 6 475 22 445
           C 45 400 95 310 165 210
           C 225 125 285 45 335 0 Z" />

  <!-- Shape 2: Main Body: S-Flourish, Crest, Sharp Beak, and Bottom Loop -->
  <path d="M 370 20
           C 415 65 470 145 495 240
           C 505 280 495 320 465 350
           L 420 395
           L 495 485
           L 365 495
           C 385 530 420 570 455 615
           C 490 660 480 730 435 770
           C 385 810 300 815 230 790
           C 160 760 115 695 110 625
           C 105 550 160 485 235 485
           L 405 315
           C 425 295 435 265 425 240
           C 415 210 390 170 355 130
           Z" />

  <!-- Shape 3: Bottom Circle -->
  <circle cx="295" cy="735" r="55" />
`;

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

console.log('Script loaded successfully');
