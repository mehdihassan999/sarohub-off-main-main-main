# Python script to generate the exact vector paths for the SaroHub monogram logo
# Matching the user-uploaded 'final company logo done white.png'

# The emblem viewBox is 0 0 500 800
# 1. Top-Left Blade:
#    Inner edge is along line at angle 45 deg: from (100, 560) to (370, 290)
#    Outer curve swells to (5, 450), up to (150, 180), and peaks at (345, 0)
# 2. Main Body:
#    Inner edge parallel with gap of 32px: from (135, 595) to (405, 325)
#    Crest at (430, 240)
#    Right wing/beak at (495, 485)
#    Undercut to (365, 495)
#    Bottom sweeping bowl from (470, 600) -> (310, 790) -> (105, 710) -> (100, 600)
#    Inner hook wrapping around circle
# 3. Solid Circle:
#    Center at (295, 735), radius 55

svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 800" width="500" height="800">
  <defs>
    <linearGradient id="saro-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE600" />
      <stop offset="40%" stop-color="#FF7A00" />
      <stop offset="80%" stop-color="#FF4000" />
      <stop offset="100%" stop-color="#D61800" />
    </linearGradient>
  </defs>

  <!-- Group: SaroHub Monogram Emblem -->
  <g id="sarohub-emblem" fill="#FFFFFF">
    <!-- 1. Top-Left Wing / Blade -->
    <path d="M 335 0
             C 345 5 352 16 350 28
             C 348 38 340 50 330 60
             L 100 520
             C 80 545 48 550 28 530
             C 8 510 6 475 22 445
             C 45 400 95 310 165 210
             C 225 125 285 45 335 0 Z" />

    <!-- 2. Main Body: S-Flourish with Wing and Lower Loop -->
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

    <!-- 3. Bottom Circle -->
    <circle cx="295" cy="735" r="55" />
  </g>
</svg>'''

print("Generated initial SVG")
