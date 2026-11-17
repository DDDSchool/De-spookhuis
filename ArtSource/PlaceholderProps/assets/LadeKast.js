// LadeKast (chest of drawers) - woonkamer. Wooden chest on bun feet with three drawers; each
// drawer (front + box + knobs) sits in its own pivot group at the drawer's back so it can slide
// out along +Z. DrawerPivot1 = top, DrawerPivot3 = bottom. Front faces +Z.
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

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'LadeKast';
  const wood = mat(PAL.wood), dark = mat(PAL.woodDark), light = mat(PAL.woodLight), brass = mat(PAL.brass);

  // Bun feet
  const feet = [];
  for (const x of [-0.39, 0.39]) for (const z of [-0.18, 0.18]) feet.push(place(C(0.04, 0.032, 0.065, 8), x, 0.0325, z));
  root.add(merged('FeetMerged', feet, dark));

  // Carcass: thick top (a hair crooked), sides, bottom, back, two runner rails between drawers
  root.add(merged('Carcass', [
    place(B(0.94, 0.04, 0.48), 0, 0.83, 0.005, 0, 0, 0.008),
    place(B(0.04, 0.75, 0.44), -0.43, 0.435, 0),
    place(B(0.04, 0.75, 0.44), 0.43, 0.435, 0),
    place(B(0.82, 0.03, 0.44), 0, 0.075, 0),
    place(B(0.82, 0.72, 0.02), 0, 0.45, -0.21),
    place(B(0.82, 0.015, 0.44), 0, 0.3325, 0),
    place(B(0.82, 0.015, 0.44), 0, 0.5725, 0),
  ], wood));

  // Drawers. Front: 0.84 x 0.225, overlay on the carcass front (z 0.22..0.245).
  // Box: 0.8 wide, 0.17 high, runs from the front back to z = -0.17 (= pivot).
  const BACK_Z = -0.17, FRONT_Z = 0.22, FH = 0.225, FT = 0.025;
  const BOX_D = FRONT_Z - BACK_Z, BOX_H = 0.17, BOX_W = 0.8, T = 0.012;
  const frontBottoms = [0.58, 0.34, 0.10]; // drawer 1 (top) .. 3 (bottom)
  const frontTilt = [0.0, 0.014, -0.006];  // drawer 2 hangs a bit crooked
  frontBottoms.forEach((yb, i) => {
    const n = i + 1;
    const pivot = new THREE.Group(); pivot.name = `DrawerPivot${n}`;
    const yc = yb + FH / 2;
    pivot.position.set(0, yc, BACK_Z);
    // local coords: z = 0 at the drawer back, y = 0 at the middle of the front
    const fz = BOX_D + FT / 2;
    pivot.add(merged(`DrawerFront${n}`, [
      place(B(0.84, FH, FT), 0, 0, fz, 0, 0, frontTilt[i]),
      place(B(0.72, FH - 0.08, 0.01), 0, 0, fz + FT / 2 + 0.004, 0, 0, frontTilt[i]), // raised panel
    ], light));
    const yBot = -FH / 2 + 0.005; // bottom of the box, local
    pivot.add(merged(`DrawerBox${n}`, [
      place(B(BOX_W, T, BOX_D), 0, yBot + T / 2, BOX_D / 2),
      place(B(T, BOX_H, BOX_D), -(BOX_W - T) / 2, yBot + BOX_H / 2, BOX_D / 2),
      place(B(T, BOX_H, BOX_D), (BOX_W - T) / 2, yBot + BOX_H / 2, BOX_D / 2),
      place(B(BOX_W - 2 * T, BOX_H, T), 0, yBot + BOX_H / 2, T / 2),
    ], dark));
    const kz = fz + FT / 2 + 0.024;
    pivot.add(merged(`Knobs${n}`, [-0.22, 0.22].map(kx =>
      place(C(0.024, 0.016, 0.035, 8), kx, kx * Math.sin(frontTilt[i]), kz, Math.PI / 2, 0, 0)), brass));
    root.add(pivot);
  });
  return root;
}
