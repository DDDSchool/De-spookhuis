// Keukenstoel (kitchen chair) - keuken. Sturdy woodDark chair with a sage seat cushion and a
// backrest that leans back and sits visibly crooked (wonky slats included). Seat faces +Z.
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
const rnd = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

const SY = 0.46;   // seat top height

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Keukenstoel';
  const w = [];

  // Legs (straight, so all four stand on the floor)
  for (const x of [-0.19, 0.19]) {
    w.push(place(B(0.04, SY - 0.03, 0.04), x, (SY - 0.03) / 2, 0.18));
    w.push(place(B(0.042, SY - 0.03, 0.042), x, (SY - 0.03) / 2, -0.18));
  }
  // Stretchers at uneven heights
  w.push(
    place(B(0.025, 0.025, 0.34), -0.19, 0.13, 0), place(B(0.025, 0.025, 0.34), 0.19, 0.11, 0),
    place(B(0.36, 0.025, 0.025), 0, 0.17, 0.18), place(B(0.36, 0.025, 0.025), 0, 0.2, -0.18),
  );
  // Apron + seat board
  w.push(place(B(0.4, 0.05, 0.38), 0, SY - 0.055, 0));
  w.push(place(B(0.45, 0.035, 0.44), 0, SY - 0.0175, 0.01));

  // Backrest, built upright from the seat, then leaned back and twisted crooked
  const back = [
    place(B(0.042, 0.5, 0.042), -0.19, 0.25, 0),
    place(B(0.042, 0.5, 0.042), 0.19, 0.25, 0),
    place(B(0.47, 0.085, 0.04), 0, 0.48, -0.005, 0, 0, 0.03),
    place(B(0.38, 0.035, 0.03), 0, 0.16, 0),
  ];
  [-0.11, 0, 0.11].forEach((x, i) => back.push(place(B(0.045, 0.27, 0.02), x, 0.31, 0, 0, 0, (rnd(i) - 0.5) * 0.12)));
  const backGeo = mergeGeometries(back);
  place(backGeo, 0, SY - 0.02, -0.18, -0.1, 0, 0.035);
  w.push(backGeo);
  root.add(merged('ChairWood', w, mat(PAL.woodDark)));

  // Sage seat cushion, plonked down a bit skew
  root.add(merged('Cushion', [place(B(0.36, 0.045, 0.34), 0.01, SY + 0.0225, 0.04, 0, 0.07, 0.01)], mat(PAL.sage)));
  return root;
}
