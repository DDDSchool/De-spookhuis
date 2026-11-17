// Loper (hallway runner rug) - gang. Floor item: base at y = 0, centred, runs along Z (6 m).
// Deep red runner with a mustard border, a thin brass inner line, a row of brass diamonds
// that never quite line up, and mustard tassels at both ends (some a bit longer than others).
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
function merged(name, geos, material) {
  const m = new THREE.Mesh(mergeGeometries(geos), material); m.name = name; return m;
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Loper';

  const W = 1.0, L = 5.92, T = 0.016;      // rug body (tassels add 0.04 at each end -> 6.0 m)
  const hl = L / 2;

  // Rug body
  const body = new THREE.Mesh(B(W, T, L).translate(0, T / 2, 0), mat(PAL.runner));
  body.name = 'Body';
  root.add(body);

  // Mustard border stripe (inset from the edge) + tassels at both ends
  const e = 0.05, s = 0.05, bh = 0.004, by = T + bh / 2;
  const mustard = [
    B(s, bh, L - 2 * e).translate(W / 2 - e - s / 2, by, 0),
    B(s, bh, L - 2 * e).translate(-(W / 2 - e - s / 2), by, 0),
    B(W - 2 * e - 2 * s, bh, s).translate(0, by, hl - e - s / 2),
    B(W - 2 * e - 2 * s, bh, s).translate(0, by, -(hl - e - s / 2)),
  ];
  const nT = 14, tw = 0.026, span = W - 0.1;
  for (let i = 0; i < nT; i++) {
    const x = -span / 2 + (span * i) / (nT - 1);
    for (const sz of [-1, 1]) {
      // Length wobbles between 0.028 and 0.04 (longest reaches exactly 3.0 m from centre)
      const len = 0.028 + 0.012 * Math.abs(Math.sin(i * 2.3 + sz));
      const tassel = B(tw, 0.006, len + 0.01).rotateY(0.12 * Math.sin(i * 1.7 + sz * 0.5));
      mustard.push(tassel.translate(x, 0.003, sz * (hl + (len - 0.01) / 2)));
    }
  }
  root.add(merged('BorderAndTassels', mustard, mat(PAL.mustard)));

  // Thin brass inner line + a row of slightly wonky diamonds down the middle
  const ie = 0.14, lw = 0.015, lh = 0.003, ly = T + lh / 2;
  const brass = [
    B(lw, lh, L - 2 * ie).translate(W / 2 - ie - lw / 2, ly, 0),
    B(lw, lh, L - 2 * ie).translate(-(W / 2 - ie - lw / 2), ly, 0),
    B(W - 2 * ie - 2 * lw, lh, lw).translate(0, ly, hl - ie - lw / 2),
    B(W - 2 * ie - 2 * lw, lh, lw).translate(0, ly, -(hl - ie - lw / 2)),
  ];
  const wob = [0.06, -0.05, 0.0, 0.09, -0.08, 0.03];
  [-2.4, -1.45, -0.5, 0.45, 1.45, 2.4].forEach((z, i) => {
    const d = i % 2 ? 0.15 : 0.18;
    brass.push(B(d, lh, d).rotateY(Math.PI / 4 + wob[i]).translate(wob[i] * 0.2, ly, z));
  });
  root.add(merged('BrassPattern', brass, mat(PAL.brass, { rough: 0.6, metal: 0.3 })));

  return root;
}
