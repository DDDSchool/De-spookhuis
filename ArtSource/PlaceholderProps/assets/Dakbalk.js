// Dakbalk (rough roof beam) - zolder. One 3 m hand-hewn beam piece along X, a little sagging and
// twisted, with knots, wooden pegs, a few nails and dust lying on top. Repeat it along the roof.
// Origin: bottom-centre (base at y = 0, centred on x and z) like the other floor-based props.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

function T(g, x, y, z, rx = 0, ry = 0, rz = 0) {
  if (rx || ry || rz) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz)));
  return g.translate(x, y, z);
}
function merged(name, geos, material) {
  const m = new THREE.Mesh(mergeGeometries(geos), material); m.name = name; return m;
}
// Deterministic "random" in -1..1 from a position (coincident vertices get the same value).
const hash = (x, y, z) => { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return (s - Math.floor(s)) * 2 - 1; };

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Dakbalk';
  const wood = mat(PAL.atticBrown), dark = mat(PAL.atticBrownDark);
  const L = 3.0, S = 0.18;

  // Beam: segmented box, then hewn (jittered cross-section), twisted and sagging a bit
  const beam = new THREE.BoxGeometry(L, S, S, 10, 2, 2);
  const p = beam.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const k = Math.round(x * 1000) / 1000;
    y += hash(k, y, z) * 0.011; z += hash(k + 3.3, y, z) * 0.011;
    const tw = 0.05 * Math.sin((x / L) * Math.PI * 1.3);                     // gentle twist
    const ty = y * Math.cos(tw) - z * Math.sin(tw), tz = y * Math.sin(tw) + z * Math.cos(tw);
    const sag = -0.025 * (1 - Math.pow((2 * x) / L, 2));                        // dips in the middle
    p.setXYZ(i, x, ty + sag, tz);
  }
  beam.computeVertexNormals();
  // A rough axe-cut end on one side
  const chip = T(new THREE.BoxGeometry(0.07, 0.08, S * 0.9), L / 2 - 0.02, S / 2 - 0.03, 0, 0, 0, 0.5);
  root.add(merged('Beam', [beam], wood));

  // Knots and wooden peg ends on the front and back faces
  const dk = [chip];
  for (const [x, y, s] of [[-0.9, -0.02, 1], [0.35, 0.03, 1], [1.05, -0.01, -1], [-0.2, 0.02, -1]]) {
    const sag = -0.025 * (1 - Math.pow((2 * x) / L, 2));
    dk.push(T(new THREE.CylinderGeometry(0.025, 0.03, 0.02, 6), x, y + sag, s * (S / 2 + 0.002), Math.PI / 2, 0, 0));
  }
  for (const x of [-1.3, 1.3]) {
    const sag = -0.025 * (1 - Math.pow((2 * x) / L, 2));
    dk.push(T(new THREE.CylinderGeometry(0.02, 0.02, S + 0.03, 6), x, sag, 0, Math.PI / 2, 0, 0)); // through-peg
  }
  root.add(merged('KnotsPegs', dk, dark));

  // Two old nails sticking out (iron) and dust patches on top
  const nails = [];
  for (const [x, a] of [[-0.55, 0.25], [0.8, -0.35]]) {
    const sag = -0.025 * (1 - Math.pow((2 * x) / L, 2));
    nails.push(T(new THREE.CylinderGeometry(0.005, 0.005, 0.07, 4), x, sag + 0.02, S / 2 + 0.03, Math.PI / 2, 0, a));
    nails.push(T(new THREE.CylinderGeometry(0.012, 0.012, 0.005, 6), x, sag + 0.02, S / 2 + 0.065, Math.PI / 2, 0, 0));
  }
  root.add(merged('Nails', nails, mat(PAL.iron)));

  const dust = [];
  for (const [x, w] of [[-1.1, 0.5], [-0.2, 0.7], [0.75, 0.4], [1.25, 0.3]]) {
    const sag = -0.025 * (1 - Math.pow((2 * x) / L, 2));
    dust.push(T(new THREE.BoxGeometry(w, 0.012, 0.11), x, S / 2 + sag + 0.004, hash(x, 1, 2) * 0.02));
  }
  root.add(merged('Dust', dust, mat(PAL.dustLight)));

  // Put the base on y = 0 (the sag and jitter move it a little)
  const minY = new THREE.Box3().setFromObject(root).min.y;
  for (const c of root.children) c.position.y -= minY;
  return root;
}
