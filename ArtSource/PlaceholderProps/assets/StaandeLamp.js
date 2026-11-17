// StaandeLamp (standing floor lamp) - woonkamer. Heavy round wooden base, thin pole that leans a
// hair, and a glowing mustard shade that sits a bit crooked on top. Pull chain faces +Z.
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
  const root = new THREE.Group(); root.name = 'StaandeLamp';

  // Pole from y = 0.1 to 1.41, leaning slightly; compute where its top ends up
  const lean = 0.02, poleBot = 0.1, poleLen = 1.31;
  const poleCy = poleBot + poleLen / 2;
  const topX = -Math.sin(lean) * poleLen / 2, topY = poleCy + Math.cos(lean) * poleLen / 2;
  root.add(merged('StandMerged', [
    place(C(0.15, 0.18, 0.05, 10), 0, 0.025, 0),
    place(C(0.06, 0.085, 0.06, 8), 0, 0.08, 0),
    place(C(0.018, 0.022, poleLen, 6), 0, poleCy, 0, 0, 0, lean),
  ], mat(PAL.woodDark)));

  // Brass bits: knob ring halfway up the pole, socket fitting at the top
  const midX = -Math.sin(lean) * 0.1;
  root.add(merged('BrassMerged', [
    place(C(0.032, 0.032, 0.04, 8), midX, poleCy + 0.1, 0),
    place(C(0.035, 0.03, 0.06, 8), topX, topY - 0.02, 0),
  ], mat(PAL.brass)));

  // Shade group at the pole top, tipped the other way so it looks a bit crooked
  const shade = new THREE.Group(); shade.name = 'ShadeGroup';
  shade.position.set(topX, topY, 0);
  shade.rotation.set(0.04, 0, -0.1);
  const sh = new THREE.Mesh(place(C(0.12, 0.2, 0.26, 8), 0, 0.13, 0), mat(PAL.mustard, { emissive: PAL.mustard }));
  sh.name = 'Shade';
  shade.add(sh);
  // Cream trim bands at the top and bottom edge of the shade
  shade.add(merged('ShadeTrim', [
    place(C(0.205, 0.207, 0.025, 8), 0, 0.012, 0),
    place(C(0.124, 0.127, 0.02, 8), 0, 0.255, 0),
  ], mat(PAL.cream)));
  // Warm glow disc just under the shade + pull chain with a little bead
  const glow = new THREE.Mesh(place(C(0.17, 0.17, 0.006, 8), 0, -0.004, 0), mat(PAL.flashYellow, { emissive: PAL.flashYellow }));
  glow.name = 'GlowDisc';
  shade.add(glow);
  shade.add(merged('PullChain', [
    place(C(0.003, 0.003, 0.16, 4), 0.06, -0.08, 0.09),
    place(B(0.02, 0.028, 0.02), 0.06, -0.165, 0.09, 0, 0.6, 0),
  ], mat(PAL.brass)));
  root.add(shade);
  return root;
}
