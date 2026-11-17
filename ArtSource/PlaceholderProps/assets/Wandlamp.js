// Wandlamp (wall sconce) - gang. WALL item: back plate on z = 0, sticks out ~0.2 m toward +Z,
// origin at the bottom-centre. Brass oval back plate, bent arm, a glowing mustard shade that
// sits a little crooked and a tiny pull chain. No pivots (add a point light at 'Shade' in Unity).
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

function tg(geo, x, y, z, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz));
  m.setPosition(x, y, z);
  return geo.applyMatrix4(m);
}
function merged(name, geos, material) {
  const g = mergeGeometries(geos);
  if (!g) throw new Error(`merge failed for ${name}`);
  const m = new THREE.Mesh(g, material); m.name = name; return m;
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Wandlamp';
  const brass = mat(PAL.brass, { rough: 0.55, metal: 0.3 });
  const glow = mat(PAL.mustard, { rough: 0.9, emissive: PAL.mustard });

  const armZ = 0.12;          // where the shade sits, out from the wall
  // --- Brass: back plate, drop finial, arm, elbow, cup, pull chain (one mesh)
  const metal = [
    tg(new THREE.CylinderGeometry(0.05, 0.05, 0.016, 8).scale(1, 1, 1.6), 0, 0.105, 0.008, Math.PI / 2, 0, 0), // oval plate
    tg(new THREE.ConeGeometry(0.018, 0.03, 6), 0, 0.015, 0.018, Math.PI, 0, 0),              // little drop under the plate
    tg(new THREE.SphereGeometry(0.018, 6, 4), 0, 0.09, 0.02),                                 // arm root boss
    tg(new THREE.CylinderGeometry(0.011, 0.011, 0.1, 6), 0, 0.09, 0.07, Math.PI / 2, 0, 0),   // arm out from the wall
    tg(new THREE.SphereGeometry(0.016, 6, 4), 0, 0.09, armZ),                                 // elbow
    tg(new THREE.CylinderGeometry(0.011, 0.011, 0.07, 6), 0, 0.125, armZ),                    // riser
    tg(new THREE.CylinderGeometry(0.032, 0.022, 0.018, 8), 0, 0.165, armZ),                   // cup under the shade
  ];
  root.add(merged('BrassMerged', metal, brass));

  // --- Glowing mustard shade (wider at the bottom), tilted a bit for the wonky look
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.095, 0.13, 8), glow);
  shade.name = 'Shade';
  shade.position.set(0, 0.24, armZ); shade.rotation.set(0.05, 0, -0.09);
  root.add(shade);
  // brass cap knob on top of the shade + pull chain hanging off the front rim (child of the shade)
  const trim = merged('ShadeTrim', [
    tg(new THREE.SphereGeometry(0.014, 6, 4), 0, 0.072, 0),
    tg(new THREE.BoxGeometry(0.004, 0.06, 0.004), 0, -0.095, 0.08),
    tg(new THREE.SphereGeometry(0.009, 5, 3), 0, -0.13, 0.08),
  ], brass);
  shade.add(trim);

  return root;
}
