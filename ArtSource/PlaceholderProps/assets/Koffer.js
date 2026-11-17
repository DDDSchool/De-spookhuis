// Koffer (old suitcase) - zolder. Standing upright on its long edge, big face toward +Z,
// canvas body with leather corners, two straps, a floppy handle and a couple of travel stickers.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

function B(w, h, d, x, y, z, rx = 0, ry = 0, rz = 0) {
  const g = new THREE.BoxGeometry(w, h, d);
  if (rx || ry || rz) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz)));
  return g.translate(x, y, z);
}
function merged(name, geos, material) {
  const m = new THREE.Mesh(mergeGeometries(geos), material); m.name = name; return m;
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Koffer';
  const canvas = mat(PAL.dust), leather = mat(PAL.woodDark), seam = mat(PAL.atticBrownDark);
  const brass = mat(PAL.brass, { rough: 0.45, metal: 0.6 });

  const W = 0.64, H = 0.37, D = 0.2, F = 0.015;  // body + little feet
  const cy = F + H / 2, top = F + H;

  root.add(merged('Body', [B(W, H, D, 0, cy, 0)], canvas));
  // Seam where the two halves meet, running around the edge
  root.add(merged('Seam', [B(W + 0.012, H + 0.012, 0.03, 0, cy, 0)], seam));

  // Leather: 8 corner caps, 2 wrap-around straps, 4 feet, handle brackets
  const lt = [];
  for (const x of [-1, 1]) for (const y of [F + 0.0275, top - 0.0275]) for (const z of [-1, 1])
    lt.push(B(0.065, 0.065, 0.08, x * (W / 2 - 0.0275), y, z * (D / 2 - 0.035)));
  lt.push(B(0.045, H + 0.008, D + 0.008, -0.17, cy, 0));
  lt.push(B(0.045, H + 0.008, D + 0.008, 0.17, cy, 0, 0, 0, 0.012)); // a touch crooked
  for (const x of [-0.26, 0.26]) for (const z of [-0.06, 0.06]) lt.push(B(0.03, F, 0.03, x, F / 2, z));
  for (const x of [-0.05, 0.05]) lt.push(B(0.03, 0.02, 0.035, x, top + 0.01, 0));
  root.add(merged('Leather', lt, leather));

  // Handle: half ring between the brackets, flopped forward a bit
  const hg = new THREE.TorusGeometry(0.05, 0.013, 5, 6, Math.PI);
  const handle = new THREE.Mesh(hg, leather); handle.name = 'Handle';
  handle.position.set(0, top + 0.02, 0); handle.rotation.set(0.35, 0, 0);
  root.add(handle);

  // Brass buckles on the straps and two latches on the top edge
  const bb = [];
  bb.push(B(0.06, 0.045, 0.01, -0.17, top - 0.08, D / 2 + 0.009));
  bb.push(B(0.06, 0.045, 0.01, 0.172, top - 0.085, D / 2 + 0.009, 0, 0, 0.1));
  for (const x of [-0.11, 0.11]) bb.push(B(0.05, 0.012, 0.05, x, top + 0.006, 0));
  root.add(merged('Brass', bb, brass));

  // Travel stickers (small accent colours)
  const s1 = new THREE.Mesh(B(0.12, 0.08, 0.003, -0.04, 0.15, D / 2 + 0.0015, 0, 0, 0.15), mat(PAL.cream));
  s1.name = 'StickerA'; root.add(s1);
  const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.003, 8), mat(PAL.moss));
  s2.geometry.rotateX(Math.PI / 2); s2.position.set(0.07, 0.27, D / 2 + 0.0015);
  s2.name = 'StickerB'; root.add(s2);
  return root;
}
