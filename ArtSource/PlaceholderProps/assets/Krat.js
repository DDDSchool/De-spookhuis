// Krat (wooden crate) - zolder. Open top, slatted sides, chunky corner posts flush with the
// top rim so crates stack neatly. Slats are a tiny bit crooked for the joke-horror feel.
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
  const root = new THREE.Group(); root.name = 'Krat';
  const plank = mat(PAL.atticBrown), dark = mat(PAL.atticBrownDark);

  const W = 0.6, H = 0.45, D = 0.45, T = 0.02;  // outer size, slat thickness
  const rows = [0.07, 0.225, 0.385], SH = 0.11;   // slat centres and height
  const wob = [0.012, -0.01, 0.004, -0.014, 0.009, 0.0, -0.006, 0.013, -0.011, 0.007, -0.003, 0.01];

  // Slats: front/back span the full width, sides fit between them
  const slats = []; let i = 0;
  for (const y of rows) {
    for (const s of [-1, 1]) {
      slats.push(B(W, SH, T, 0, y + wob[i] * 0.3, s * (D / 2 - T / 2), 0, 0, wob[i++]));
      slats.push(B(T, SH, D - 2 * T, s * (W / 2 - T / 2), y, 0, wob[i++], 0, 0));
    }
  }
  root.add(merged('Slats', slats, plank));

  // Corner posts (inside the slats, flush with the top), bottom boards, top rim on the short sides
  const frame = [];
  for (const x of [-1, 1]) for (const z of [-1, 1])
    frame.push(B(0.05, H, 0.05, x * (W / 2 - T - 0.025), H / 2, z * (D / 2 - T - 0.025)));
  frame.push(B(W - 2 * T, 0.02, D - 2 * T, 0, 0.02, 0));
  // Two thin skids under the bottom, and hand-grip rails on the short sides
  for (const z of [-0.15, 0.15]) frame.push(B(W - 0.04, 0.012, 0.06, 0, 0.006, z));
  for (const s of [-1, 1]) frame.push(B(0.03, 0.04, D - 0.1, s * (W / 2 + 0.012), H - 0.06, 0));
  root.add(merged('Frame', frame, dark));

  // A stencilled shipping label on the front
  const label = new THREE.Mesh(B(0.16, 0.08, 0.004, -0.1, 0.225, D / 2 + 0.002, 0, 0, -0.05), mat(PAL.dustLight));
  label.name = 'Label'; root.add(label);
  return root;
}
