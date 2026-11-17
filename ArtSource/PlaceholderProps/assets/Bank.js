// Bank (3-seat sofa) - woonkamer. Chunky bordeaux sofa with rolled arms, slightly saggy
// cushions that never quite line up, and one mustard throw cushion. Front (seat side) faces +Z.
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
// Octagonal roll lying along Z with a flat top; halfW = half its width.
function rollZ(halfW, len) {
  const r = halfW / Math.cos(Math.PI / 8);
  return C(r, r, len, 8).rotateY(Math.PI / 8).rotateX(Math.PI / 2);
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Bank';
  const frame = mat(PAL.bordeauxDark), uph = mat(PAL.bordeaux);

  // Six stubby tapered wooden feet
  const feet = [];
  for (const x of [-0.9, 0, 0.9]) for (const z of [-0.36, 0.36]) feet.push(place(C(0.035, 0.026, 0.08, 6), x, 0.04, z));
  root.add(merged('FeetMerged', feet, mat(PAL.woodDark)));

  // Frame: base under the seat cushions and the back board (leans back a little)
  root.add(merged('Frame', [
    place(B(1.6, 0.22, 0.86), 0, 0.19, 0),
    place(B(1.6, 0.55, 0.2), 0, 0.575, -0.335, -0.06, 0, 0.004),
  ], frame));

  // Upholstery: rolled arms + seat cushions + back cushions (all bordeaux, one mesh)
  const u = [];
  for (const s of [-1, 1]) {
    u.push(place(B(0.2, 0.54, 0.9), s * 0.9, 0.35, 0));
    u.push(place(rollZ(0.1, 0.9), s * 0.9, 0.62, 0));
  }
  // Seat cushions: top at y = 0.45, each sagging its own way
  const seatTilt = [[0.0, 0.02, 0.02], [0.015, -0.01, -0.012], [-0.01, -0.025, 0.025]];
  [-0.535, 0, 0.535].forEach((x, i) => {
    const [rx, ry, rz] = seatTilt[i];
    u.push(place(B(0.52, 0.16, 0.68), x, 0.37, 0.09, rx, ry, rz));
  });
  // Back cushions lean back against the frame
  const backTilt = [[-0.16, 0.03, 0.03], [-0.2, 0, -0.015], [-0.14, -0.04, -0.04]];
  [-0.535, 0, 0.535].forEach((x, i) => {
    const [rx, ry, rz] = backTilt[i];
    u.push(place(B(0.5, 0.38, 0.14), x, 0.64, -0.18, rx, ry, rz));
  });
  root.add(merged('Upholstery', u, uph));

  // Mustard throw cushion slumped in the right corner
  const throwC = new THREE.Mesh(place(B(0.32, 0.3, 0.1), 0.6, 0.6, -0.03, -0.3, -0.35, 0.35), mat(PAL.mustard));
  throwC.name = 'ThrowCushion';
  root.add(throwC);
  return root;
}
