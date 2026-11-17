// Fauteuil (armchair) - woonkamer. Matches the Bank: rolled arms, chunky cushions, moss green,
// tall rounded back with a crocheted cream doily that is slightly crooked. Front faces +Z.
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
// Octagonal rolls with a flat top; halfW = half the roll's width.
function rollZ(halfW, len) {
  const r = halfW / Math.cos(Math.PI / 8);
  return C(r, r, len, 8).rotateY(Math.PI / 8).rotateX(Math.PI / 2);
}
function rollX(halfW, len) {
  const r = halfW / Math.cos(Math.PI / 8);
  return C(r, r, len, 8).rotateY(Math.PI / 8).rotateZ(Math.PI / 2);
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Fauteuil';
  const frame = mat(PAL.mossDark), uph = mat(PAL.moss);

  // Four tapered wooden feet, the front-left one a bit splayed
  const feet = [];
  for (const [x, z, rz] of [[-0.38, 0.33, 0.12], [0.38, 0.33, 0], [-0.38, -0.33, 0], [0.38, -0.33, 0]]) {
    feet.push(place(C(0.035, 0.026, 0.08, 6), x, rz ? 0.043 : 0.04, z, 0, 0, rz));
  }
  root.add(merged('FeetMerged', feet, mat(PAL.woodDark)));

  // Frame: seat base and tall back board
  root.add(merged('Frame', [
    place(B(0.56, 0.22, 0.8), 0, 0.19, 0),
    place(B(0.72, 0.56, 0.18), 0, 0.58, -0.335, -0.04, 0, 0),
  ], frame));

  // Upholstery: arms, rounded back top, seat cushion, back cushion
  const u = [];
  for (const s of [-1, 1]) {
    u.push(place(B(0.18, 0.54, 0.85), s * 0.36, 0.35, 0));
    u.push(place(rollZ(0.09, 0.85), s * 0.36, 0.62, 0));
  }
  u.push(place(rollX(0.09, 0.76), 0, 0.86, -0.345, 0, 0, 0.015));
  u.push(place(B(0.52, 0.16, 0.62), 0, 0.37, 0.1, 0.01, 0.02, -0.015));
  // Back cushion and doily share one transform, so the doily sits on the cushion face
  const backT = [0, 0.66, -0.18, -0.16, 0, 0.02];
  u.push(place(B(0.5, 0.42, 0.13), ...backT));
  root.add(merged('Upholstery', u, uph));

  const doily = new THREE.Mesh(place(B(0.26, 0.18, 0.008).rotateZ(0.08).translate(0.02, 0.1, 0.07), ...backT), mat(PAL.cream));
  doily.name = 'Doily';
  root.add(doily);
  return root;
}
