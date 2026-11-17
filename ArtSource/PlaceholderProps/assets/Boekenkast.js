// Boekenkast (tall bookcase) - woonkamer. Four compartments stuffed with chunky colourful books,
// some leaning, a stack lying flat, a stubby candle, and one book pulled out crooked (on its own
// pivot so it can become a secret lever later). Front faces +Z, back against the wall at z = -0.175.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

const _e = new THREE.Euler(), _m = new THREE.Matrix4();
function place(geo, x, y, z, rx = 0, ry = 0, rz = 0) {
  if (rx || ry || rz) geo.applyMatrix4(_m.makeRotationFromEuler(_e.set(rx, ry, rz)));
  return geo.translate(x, y, z);
}
function merged(name, geos, material) {
  const m = new THREE.Mesh(mergeGeometries(geos), material); m.name = name; return m;
}
const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const C = (rt, rb, h, seg = 8) => new THREE.CylinderGeometry(rt, rb, h, seg);

// Small seeded RNG so the shelves look the same on every export
function rng(seed) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const BOOK_COLOURS = [
  ['Bordeaux', PAL.bordeaux], ['Moss', PAL.moss], ['Mustard', PAL.mustard],
  ['Cream', PAL.cream], ['MossDark', PAL.mossDark], ['Blue', PAL.moonBlue],
];

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Boekenkast';
  const wood = mat(PAL.wood), dark = mat(PAL.woodDark);
  const R = rng(1984);
  const books = BOOK_COLOURS.map(() => []);
  const pick = () => { const r = R(); return r < 0.24 ? 0 : r < 0.44 ? 1 : r < 0.62 ? 2 : r < 0.78 ? 3 : r < 0.92 ? 4 : 5; };

  // Carcass: sides, crown, bottom board, three shelves (one slightly saggy), kick board, back
  const SHELF_T = 0.03, FLOOR0 = 0.11, COMP = 0.4375;
  const floors = [0, 1, 2, 3].map(i => FLOOR0 + i * (COMP + SHELF_T)); // top surface of each compartment floor
  const carc = [
    place(B(0.05, 1.95, 0.35), -0.475, 0.975, 0),
    place(B(0.05, 1.95, 0.35), 0.475, 0.975, 0),
    place(B(1.04, 0.05, 0.37), 0, 1.975, 0.01, 0, 0, -0.006),
    place(B(0.9, 0.03, 0.33), 0, 0.095, 0.0),
  ];
  for (let i = 1; i < 4; i++) carc.push(place(B(0.9, SHELF_T, 0.32), 0, floors[i] - SHELF_T / 2, 0.005, 0, 0, i === 2 ? 0.01 : 0));
  root.add(merged('Carcass', carc, wood));
  root.add(merged('BackAndKick', [
    place(B(0.9, 1.84, 0.015), 0, 1.03, -0.1625),
    place(B(0.9, 0.08, 0.02), 0, 0.04, 0.155),
  ], dark));

  // Upright book at x (left edge), returns its right edge
  function upright(x, y, w, h, colour = pick()) {
    const d = 0.2 + R() * 0.06;
    books[colour].push(place(B(w, h, d), x + w / 2, y + h / 2, 0.15 - d / 2 - R() * 0.02, 0, 0, (R() - 0.5) * 0.02));
    return x + w;
  }
  // Run of books leaning left (angle a) onto the upright book ending at xPrev; each rests on its
  // bottom-left corner and lies parallel against the one before it. sizes = [[w, h], ...]
  function leanRun(xPrev, y, a, sizes) {
    let px = xPrev + sizes[0][1] * Math.sin(a) + 0.003;
    for (const [w, h] of sizes) {
      const d = 0.22 + R() * 0.03;
      books[pick()].push(place(B(w, h, d).translate(w / 2, h / 2, 0), px, y, 0.15 - d / 2, 0, 0, a));
      px += w / Math.cos(a) + 0.003;
    }
  }
  // Fill [x0, x1] with upright books
  function fill(x0, x1, y, hMin, hMax) {
    let x = x0;
    for (;;) {
      const w = 0.035 + R() * 0.045;
      if (x + w > x1) break;
      x = upright(x, y, w, hMin + R() * (hMax - hMin)) + 0.002;
    }
    return x;
  }
  // Stack of books lying flat
  function stack(cx, y, n) {
    let yy = y;
    for (let i = 0; i < n; i++) {
      const t = 0.035 + R() * 0.025, L = 0.21 + R() * 0.03, d = 0.18 + R() * 0.04;
      books[pick()].push(place(B(L, t, d), cx + (R() - 0.5) * 0.02, yy + t / 2, 0.14 - d / 2, 0, (R() - 0.5) * 0.2, 0));
      yy += t;
    }
  }

  // Row 1 (bottom): big chunky books, two leaning at the end
  let x = fill(-0.445, 0.18, floors[0], 0.28, 0.36);
  leanRun(x, floors[0], 0.25, [[0.06, 0.32], [0.05, 0.3]]);
  // Row 2: books on the left, a flat stack on the right
  x = fill(-0.445, 0.05, floors[1], 0.22, 0.32);
  leanRun(x, floors[1], 0.35, [[0.045, 0.28]]);
  stack(0.32, floors[1], 4);
  // Row 3 (about hip height): candle on the left, books either side of the crooked book's gap
  fill(-0.32, 0.0, floors[2], 0.24, 0.34);
  fill(0.07, 0.445, floors[2], 0.24, 0.34);
  // Row 4 (top): a short run of books, one leaning, a small flat stack
  x = fill(-0.445, -0.05, floors[3], 0.24, 0.33);
  leanRun(x, floors[3], 0.42, [[0.05, 0.3]]);
  stack(0.3, floors[3], 2);

  BOOK_COLOURS.forEach(([n, c], i) => { if (books[i].length) root.add(merged(`Books${n}`, books[i], mat(c))); });

  // Stubby candle with a glowing flame on row 3
  root.add(merged('Candle', [
    place(C(0.03, 0.032, 0.11, 8), -0.39, floors[2] + 0.055, 0.04),
    place(C(0.04, 0.04, 0.01, 8), -0.39, floors[2] + 0.005, 0.04),
  ], mat(PAL.cream)));
  const flame = new THREE.Mesh(place(C(0.0, 0.012, 0.035, 6), -0.39, floors[2] + 0.13, 0.04), mat(PAL.flashYellow, { emissive: PAL.flashYellow }));
  flame.name = 'CandleFlame';
  root.add(flame);

  // The crooked book: pivot at its bottom-front edge, book tipped forward and pulled out
  const pivot = new THREE.Group(); pivot.name = 'CrookedBookPivot';
  pivot.position.set(0.035, floors[2], 0.16);
  const cw = 0.055, ch = 0.31, cd = 0.23;
  const crooked = new THREE.Mesh(B(cw, ch, cd).translate(0, ch / 2, -cd / 2), mat(PAL.bordeaux));
  crooked.name = 'CrookedBook';
  crooked.rotation.set(0.32, 0.12, -0.1);
  pivot.add(crooked);
  root.add(pivot);
  return root;
}
