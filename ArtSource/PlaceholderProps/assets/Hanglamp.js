// Hanglamp (ceiling pendant) - keuken. CEILING item: top at y = 0, hangs down. Copper canopy,
// ~0.8 m black cord, copper cone shade (cream inside) with a glowing bulb. Cord + shade + bulb
// sit in SwingPivot at the cord attachment, already hanging a little askew.
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
const C = (rt, rb, h, seg = 8, open = false) => new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);
// Turn a surface inside out (reverse winding + normals) so its inside is visible.
function flip(geo) {
  const idx = geo.index.array;
  for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
  const n = geo.attributes.normal.array;
  for (let i = 0; i < n.length; i++) n[i] = -n[i];
  return geo;
}

const CORD = 0.8;

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Hanglamp';
  const copper = mat(PAL.copper);

  // Ceiling canopy (top face at y = 0)
  root.add(merged('Canopy', [place(C(0.07, 0.04, 0.03, 10), 0, -0.015, 0)], copper));

  const swing = new THREE.Group(); swing.name = 'SwingPivot';
  swing.position.set(0, -0.03, 0); swing.rotation.set(0.03, 0, 0.05);

  swing.add(merged('Cord', [place(C(0.006, 0.006, CORD, 5), 0, -CORD / 2, 0)], mat(PAL.black)));

  const L = -CORD;
  swing.add(merged('Shade', [
    place(C(0.028, 0.034, 0.06, 8), 0, L - 0.02, 0),                // fitting
    place(C(0.05, 0.05, 0.006, 12), 0, L - 0.03, 0),                // cap on top of the cone
    place(C(0.05, 0.21, 0.2, 12, true), 0, L - 0.13, 0),            // cone shade
    place(new THREE.TorusGeometry(0.21, 0.01, 3, 12), 0, L - 0.23, 0, Math.PI / 2), // rolled rim
    place(C(0.022, 0.022, 0.07, 8), 0, L - 0.09, 0),                // bulb socket
  ], copper));
  swing.add(merged('ShadeInside', [flip(place(C(0.047, 0.205, 0.195, 12, true), 0, L - 0.13, 0))], mat(PAL.cream)));

  const bulb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.055, 1), mat(PAL.flashYellow, { emissive: PAL.flashYellow }));
  bulb.name = 'Bulb'; bulb.position.set(0, L - 0.18, 0);
  swing.add(bulb);

  root.add(swing);
  return root;
}
