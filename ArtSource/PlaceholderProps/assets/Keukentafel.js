// Keukentafel (kitchen table) - keuken. Chunky woodDark table with turned legs, a slightly
// skewed top and a cream runner (with sageDark stripes) that drapes over both short ends.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

const _e = new THREE.Euler(), _m = new THREE.Matrix4();
// Rotate a geometry about its own origin, then move it into place.
function place(geo, x, y, z, rx = 0, ry = 0, rz = 0) {
  if (rx || ry || rz) geo.applyMatrix4(_m.makeRotationFromEuler(_e.set(rx, ry, rz)));
  return geo.translate(x, y, z);
}
function merged(name, geos, material) {
  const m = new THREE.Mesh(mergeGeometries(geos), material); m.name = name; return m;
}
const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const C = (rt, rb, h, seg = 8) => new THREE.CylinderGeometry(rt, rb, h, seg);
const BB = (x0, y0, z0, x1, y1, z1) =>
  B(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);

const H = 0.75, TT = 0.05;   // table height, top thickness

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Keukentafel';
  const wood = mat(PAL.woodDark);

  // Everything on the top shares one slightly skewed transform (centre of the top slab)
  const topM = new THREE.Matrix4().compose(
    new THREE.Vector3(0, H - TT / 2, 0),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0.006, 0.012, -0.008)),
    new THREE.Vector3(1, 1, 1));
  // The runner sits a bit off-centre and a bit rotated on the top
  const runM = new THREE.Matrix4().compose(
    new THREE.Vector3(0, 0, 0.02),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.03, 0)),
    new THREE.Vector3(1, 1, 1));
  const onTop = g => g.applyMatrix4(topM);
  const onRunner = g => g.applyMatrix4(runM).applyMatrix4(topM);

  // Wood: top slab + four turned legs + apron rails, one mesh
  const w = [onTop(B(1.2, TT, 0.8))];
  for (const x of [-0.52, 0.52]) for (const z of [-0.32, 0.32]) {
    w.push(place(B(0.075, 0.13, 0.075), x, H - TT - 0.065, z));   // square top block
    w.push(place(C(0.034, 0.026, 0.57, 6), x, 0.285, z));        // tapered leg
    w.push(place(C(0.048, 0.048, 0.07, 6), x, 0.42, z));         // turned bulge
    w.push(place(C(0.034, 0.042, 0.03, 6), x, 0.015, z));        // little foot
  }
  w.push(
    BB(-0.5, 0.6, -0.335, 0.5, H - TT, -0.31), BB(-0.5, 0.6, 0.31, 0.5, H - TT, 0.335),
    BB(-0.535, 0.6, -0.3, -0.505, H - TT, 0.3), BB(0.505, 0.6, -0.3, 0.535, H - TT, 0.3),
  );
  root.add(merged('TableWood', w, wood));

  // Cream runner along the length, hanging down over both ends
  const RW = 0.36, top = TT / 2;
  root.add(merged('Runner', [
    onRunner(place(B(1.2, 0.006, RW), 0, top + 0.003, 0)),
    onRunner(place(B(0.006, 0.17, RW), 0.606, top - 0.08, 0, 0, 0, 0.12)),
    onRunner(place(B(0.006, 0.17, RW), -0.606, top - 0.08, 0, 0, 0, -0.12)),
  ], mat(PAL.cream)));
  root.add(merged('RunnerStripes', [
    onRunner(place(B(0.035, 0.007, RW + 0.004), 0.5, top + 0.0035, 0)),
    onRunner(place(B(0.035, 0.007, RW + 0.004), -0.5, top + 0.0035, 0)),
  ], mat(PAL.sageDark)));
  return root;
}
