// Hutkoffer (old travel trunk) - zolder. Chunky domed trunk with dark straps and brass corners.
// The lid sits in LidPivot (hinge along the back top edge); rotate LidPivot around -X to open it.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

// Box geometry, rotated (radians) then moved to its centre.
function B(w, h, d, x, y, z, rx = 0, ry = 0, rz = 0) {
  const g = new THREE.BoxGeometry(w, h, d);
  if (rx || ry || rz) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz)));
  return g.translate(x, y, z);
}
// Upper half of a cylinder lying along X (a trunk dome), flattened to height h.
function dome(r, len, h, x, y, z, seg = 8) {
  const g = new THREE.CylinderGeometry(r, r, len, seg, 1, false, 0, Math.PI);
  g.rotateZ(Math.PI / 2); // axis along X, the half-circle points up (+Y)
  g.scale(1, h / r, 1);
  return g.translate(x, y, z);
}
function merged(name, geos, material) {
  const m = new THREE.Mesh(mergeGeometries(geos), material); m.name = name; return m;
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Hutkoffer';
  const brown = mat(PAL.atticBrown), strap = mat(PAL.woodDark);
  const brass = mat(PAL.brass, { rough: 0.45, metal: 0.6 });

  const W = 0.9, D = 0.5, HB = 0.36;  // body width, depth, height
  const LB = 0.06, DH = 0.13;         // lid band height, dome height  -> total 0.55

  // ---- Body (static) ----
  root.add(merged('Body', [B(W, HB, D, 0, HB / 2, 0)], brown));

  // Dark straps: two vertical straps wrapping front + back, and a band near top and bottom
  const straps = [];
  for (const x of [-0.25, 0.25]) straps.push(B(0.07, HB - 0.004, D + 0.012, x, HB / 2, 0));
  straps.push(B(W + 0.016, 0.045, D + 0.016, 0, HB - 0.035, 0));
  straps.push(B(W + 0.016, 0.045, D + 0.016, 0, 0.035, 0));
  // Side handles (hanging a little crooked)
  for (const s of [-1, 1]) straps.push(B(0.025, 0.03, 0.2, s * (W / 2 + 0.03), HB * 0.58, 0, s * 0.12, 0, 0));
  root.add(merged('BodyStraps', straps, strap));

  // Brass: 8 corner caps, lock plate, back hinges, handle brackets
  const br = [];
  for (const x of [-1, 1]) for (const z of [-1, 1]) {
    br.push(B(0.08, 0.08, 0.08, x * (W / 2 - 0.03), 0.035, z * (D / 2 - 0.03)));
    br.push(B(0.08, 0.065, 0.08, x * (W / 2 - 0.03), HB - 0.0325, z * (D / 2 - 0.03)));
  }
  br.push(B(0.11, 0.12, 0.015, 0.0, HB - 0.07, D / 2 + 0.012, 0, 0, 0.06)); // lock plate, a bit crooked
  for (const x of [-0.3, 0.3]) br.push(B(0.08, 0.07, 0.012, x, HB - 0.03, -D / 2 - 0.012)); // hinge plates
  for (const s of [-1, 1]) for (const z of [-0.1, 0.1]) br.push(B(0.03, 0.05, 0.03, s * (W / 2 + 0.012), HB * 0.6, z));
  root.add(merged('BodyBrass', br, brass));

  // Keyhole and an old travel label (small accents)
  const key = new THREE.Mesh(B(0.016, 0.036, 0.006, 0.002, HB - 0.08, D / 2 + 0.021, 0, 0, 0.06), mat(PAL.black));
  key.name = 'Keyhole'; root.add(key);
  const label = new THREE.Mesh(B(0.14, 0.09, 0.004, 0.12, 0.16, D / 2 + 0.002, 0, 0, -0.12), mat(PAL.cream));
  label.name = 'Label'; root.add(label);

  // ---- Lid (moves): pivot on the back top edge ----
  const lid = new THREE.Group(); lid.name = 'LidPivot';
  lid.position.set(0, HB, -D / 2);
  root.add(lid);
  // In pivot space the lid runs from z = 0 (hinge) to z = D (front)
  lid.add(merged('Lid', [B(W, LB, D, 0, LB / 2, D / 2), dome(D / 2, W, DH, 0, LB, D / 2)], brown));

  const ls = [];
  for (const x of [-0.25, 0.25]) {
    ls.push(B(0.07, LB, D + 0.012, x, LB / 2, D / 2));
    ls.push(dome(D / 2 + 0.008, 0.07, DH + 0.006, x, LB, D / 2));
  }
  ls.push(B(W + 0.016, 0.03, D + 0.016, 0, 0.022, D / 2));
  lid.add(merged('LidStraps', ls, strap));

  const lb = [];
  for (const x of [-1, 1]) for (const z of [0.03, D - 0.03]) lb.push(B(0.08, 0.065, 0.08, x * (W / 2 - 0.03), 0.034, z));
  lb.push(B(0.05, 0.08, 0.01, 0.0, -0.01, D + 0.026)); // hasp hanging over the lock plate
  lid.add(merged('LidBrass', lb, brass));

  return root;
}
