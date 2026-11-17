// AfgedekteStoel (armchair under a dust sheet) - zolder. One lumpy sheet shape: a squarish skirt
// whose corners drape down to the floor, a soft seat, two puffy arms and a tall leaning back.
// Cute, not scary: no face, just a chair hiding under a sheet.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

// Squarish (superellipse) radius factor for direction angle a, so the sheet follows a boxy chair.
const square = (a, n = 3) => Math.pow(Math.pow(Math.abs(Math.cos(a)), n) + Math.pow(Math.abs(Math.sin(a)), n), -1 / n);
// Smooth deterministic lumps (same position -> same offset, so merged parts never tear apart).
const lump = (x, y, z) => Math.sin(x * 13.1 + z * 7.3 + 1.7) * Math.cos(y * 11.7 + x * 5.1) * 0.6
  + Math.sin(z * 17.9 - y * 9.4) * 0.4;

function ellipsoid(sx, sy, sz, x, y, z, rx = 0, ry = 0, rz = 0, ws = 10, hs = 7) {
  const g = new THREE.SphereGeometry(1, ws, hs);
  g.scale(sx, sy, sz);
  if (rx || ry || rz) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz)));
  return g.translate(x, y, z);
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'AfgedekteStoel';
  const sheet = mat(PAL.sheet);

  const TOP = 0.46;                     // where the skirt meets the seat
  const wB = 0.47, dB = 0.43;           // half width / depth at the floor
  const wT = 0.43, dT = 0.385;          // half width / depth at the top of the skirt

  // ---- Skirt: open cylinder reshaped into a squarish, folded drape ----
  const skirt = new THREE.CylinderGeometry(1, 1, 1, 24, 3, true);
  const p = skirt.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const ux = p.getX(i), uz = p.getZ(i), t = p.getY(i) + 0.5; // t: 0 floor .. 1 top
    const a = Math.atan2(uz, ux), k = square(a);
    const fold = 1 + 0.05 * Math.sin(a * 8 + 0.6) * Math.pow(1 - t, 1.3);
    // Hem: corners hang to the floor, sides lift a little, with a soft wave
    let hem = 0.075 * (1 - Math.pow(Math.abs(Math.sin(2 * a)), 3)) + 0.012 * Math.sin(a * 6);
    if (hem < 0.003) hem = 0;
    const w = THREE.MathUtils.lerp(wB, wT, t), d = THREE.MathUtils.lerp(dB, dT, t);
    p.setXYZ(i, ux * k * w * fold, THREE.MathUtils.lerp(hem, TOP, t), uz * k * d * fold);
  }

  // ---- Seat: a soft dome closing the top of the skirt (same squarish outline, a bit larger) ----
  const seat = new THREE.SphereGeometry(1, 24, 5, 0, Math.PI * 2, 0, Math.PI / 2);
  const q = seat.attributes.position;
  for (let i = 0; i < q.count; i++) {
    const x = q.getX(i), y = q.getY(i), z = q.getZ(i);
    const k = square(Math.atan2(z, x));
    q.setXYZ(i, x * k * wT * 1.03, TOP - 0.02 + y * 0.1, z * k * dT * 1.03 + 0.01);
  }

  // ---- Back and arms under the sheet ----
  const back = ellipsoid(0.41, 0.36, 0.16, 0, 0.66, -0.27, -0.14, 0, 0.03, 12, 8);
  const armL = ellipsoid(0.11, 0.125, 0.41, -0.35, 0.56, 0.0, 0.05, 0.03, 0.06);
  const armR = ellipsoid(0.11, 0.13, 0.41, 0.35, 0.555, 0.01, 0.03, -0.02, -0.07);

  const g = mergeGeometries([skirt, seat, back, armL, armR]);
  // Lumpy fabric: push every vertex a little (not down through the floor)
  const r = g.attributes.position;
  for (let i = 0; i < r.count; i++) {
    const x = r.getX(i), y = r.getY(i), z = r.getZ(i);
    const n = lump(x, y, z) * 0.014;
    const up = THREE.MathUtils.clamp((y - 0.05) / 0.15, 0, 1);
    r.setXYZ(i, x + n, y + n * 0.8 * up, z - n * 0.7);
  }
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, sheet); m.name = 'Sheet';
  // A slight list to one side for the wonky feel (the hem stays on the floor)
  m.rotation.y = 0.04;
  root.add(m);

  // Dark block hidden under the sheet so you never see through the gap at the hem
  const under = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.64), mat(PAL.atticBrownDark));
  under.name = 'UnderShadow'; under.position.set(0, 0.05, 0); under.rotation.y = 0.04;
  root.add(under);
  return root;
}
