// Vloerkleed (rug) - woonkamer. Flat bordeaux rug with a wide mustard border, a simple diamond
// pattern and scruffy cream fringes on the short ends. Long side along X, lies flat on y = 0.
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

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Vloerkleed';
  const L = 2.28, W = 1.6;           // woven part; fringes add 0.06 on each short end
  const FL = 2.04, FW = 1.36;        // bordeaux field inside the border

  // Layer heights (stacked a few mm apart so nothing z-fights)
  // border 0..0.012, field 0..0.016, pattern 0.014..0.018, centre 0.016..0.02
  const Q = Math.PI / 4;
  const mustard = [place(B(L, 0.012, W), 0, 0.006, 0)];
  // thin inner line frame
  const ix = FL / 2 - 0.1, iz = FW / 2 - 0.1, lt = 0.03;
  mustard.push(place(B(2 * ix + lt, 0.004, lt), 0, 0.016, -iz));
  mustard.push(place(B(2 * ix + lt, 0.004, lt), 0, 0.016, iz));
  mustard.push(place(B(lt, 0.004, 2 * iz - lt), -ix, 0.016, 0));
  mustard.push(place(B(lt, 0.004, 2 * iz - lt), ix, 0.016, 0));
  // big centre diamond, stretched along the length
  mustard.push(place(B(0.42, 0.004, 0.42), 0, 0.016, 0, 0, Q, 0).scale(1.5, 1, 1));
  root.add(merged('BorderAndPattern', mustard, mat(PAL.mustard)));

  root.add(merged('Field', [place(B(FL, 0.016, FW), 0, 0.008, 0)], mat(PAL.bordeaux)));

  // moss diamonds in the corners of the line frame + two small ones on the long axis
  const moss = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) moss.push(place(B(0.14, 0.004, 0.14), sx * (ix - 0.17), 0.016, sz * (iz - 0.17), 0, Q, 0));
  for (const sx of [-1, 1]) moss.push(place(B(0.12, 0.004, 0.12), sx * 0.62, 0.016, 0, 0, Q, 0));
  root.add(merged('PatternMoss', moss, mat(PAL.moss)));

  // cream centre diamond + scruffy fringe (random-ish lengths and angles, fixed seed)
  let s = 7; const R = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const cream = [place(B(0.16, 0.004, 0.16), 0, 0.018, 0, 0, Q, 0).scale(1.5, 1, 1)];
  const N = 14;
  for (const sx of [-1, 1]) for (let i = 0; i < N; i++) {
    const len = 0.05 + R() * 0.025;
    const z = -W / 2 + 0.07 + i * (W - 0.14) / (N - 1);
    cream.push(place(B(len, 0.005, 0.022), sx * (L / 2 + len / 2 - 0.01), 0.0025, z, 0, (R() - 0.5) * 0.4, 0));
  }
  root.add(merged('PatternCreamAndFringe', cream, mat(PAL.cream)));
  return root;
}
