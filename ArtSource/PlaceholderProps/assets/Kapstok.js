// Kapstok (coat rack) - gang. Floor item, base at y = 0, front = +Z. A leaning dark-wood coat
// tree with brass hooks, two lumpy hanging coats (front-right and back-left) and a crooked
// top hat on the top knob. Everything is static (no pivots).
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

// The whole upper rack leans a little (rotation about the base), for the wonky feel.
const LEAN = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(-0.02, 0, 0.025));
const lean = (g) => g.applyMatrix4(LEAN);

// A lumpy coat hanging from a hook. Built facing +Z with its collar at (0, 0, 0),
// then turned to face `phi` (around Y) and moved to (px, py, pz).
function coatParts(phi, px, py, pz, sway) {
  const parts = [
    tg(new THREE.CylinderGeometry(0.15, 0.22, 0.82, 7).scale(1, 1, 0.42), 0, -0.47, 0.02, 0.04, 0, 0),   // body, flares to the hem
    tg(new THREE.SphereGeometry(0.17, 7, 4).scale(1.05, 0.45, 0.5), 0, -0.09, 0.0),                      // droopy shoulders
    tg(new THREE.CylinderGeometry(0.06, 0.075, 0.07, 6), 0, -0.03, -0.01, 0.2, 0, 0),                     // collar
    tg(new THREE.CylinderGeometry(0.045, 0.06, 0.58, 6), -0.17, -0.38, 0.03, 0.05, 0, -0.08),             // sleeve L
    tg(new THREE.CylinderGeometry(0.045, 0.06, 0.55, 6), 0.17, -0.37, 0.04, 0.1, 0, 0.1),                 // sleeve R
    tg(new THREE.BoxGeometry(0.1, 0.03, 0.03), -0.09, -0.62, 0.105, 0.1, 0, 0.05),                        // pocket flap
    tg(new THREE.BoxGeometry(0.1, 0.03, 0.03), 0.09, -0.64, 0.105, 0.1, 0, -0.08),                        // pocket flap
  ];
  const place = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, phi, sway));
  place.setPosition(px, py, pz);
  return parts.map(g => lean(g.applyMatrix4(place)));
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Kapstok';
  const wood = mat(PAL.woodDark);
  const brass = mat(PAL.brass, { rough: 0.55, metal: 0.3 });

  // --- Feet: four chunky feet in an X, with pads at the tips (not leaning)
  const feet = [];
  for (let k = 0; k < 4; k++) {
    const a = Math.PI / 4 + k * Math.PI / 2;
    const dir = new THREE.Vector3(Math.sin(a), 0, Math.cos(a));
    const foot = new THREE.BoxGeometry(0.31, 0.05, 0.055);
    foot.rotateZ(-0.12).translate(0.155, 0.047, 0);               // slopes down toward the tip
    foot.rotateY(a - Math.PI / 2);
    feet.push(foot);
    feet.push(tg(new THREE.BoxGeometry(0.06, 0.025, 0.07), dir.x * 0.3, 0.0125, dir.z * 0.3, 0, a, 0)); // pad
  }
  feet.push(tg(new THREE.CylinderGeometry(0.07, 0.085, 0.09, 8), 0, 0.045, 0));  // hub
  root.add(merged('Feet', feet, wood));

  // --- Pole + collar rings + top knob (leaning)
  const pole = [
    tg(new THREE.CylinderGeometry(0.026, 0.034, 1.54, 8), 0, 0.09 + 0.77, 0),
    tg(new THREE.CylinderGeometry(0.042, 0.042, 0.03, 8), 0, 1.44, 0),
    tg(new THREE.CylinderGeometry(0.04, 0.04, 0.025, 8), 0, 0.5, 0),
    tg(new THREE.SphereGeometry(0.045, 8, 5), 0, 1.66, 0),
  ].map(lean);
  root.add(merged('Pole', pole, wood));

  // --- Six brass hooks just under the knob, pointing out and up
  const hookAngles = [];
  for (let k = 0; k < 6; k++) hookAngles.push(0.6 + k * Math.PI / 3);
  const hooks = [];
  for (const a of hookAngles) {
    const arm = new THREE.CylinderGeometry(0.008, 0.01, 0.13, 5);
    arm.translate(0, 0.065, 0).rotateX(0.95).rotateY(a).translate(0, 1.53, 0);
    hooks.push(lean(arm));
    const tip = tg(new THREE.SphereGeometry(0.016, 6, 4),
      Math.sin(a) * 0.105, 1.53 + 0.075, Math.cos(a) * 0.105);
    hooks.push(lean(tip));
  }
  root.add(merged('Hooks', hooks, brass));

  // --- Two coats: dark red on the front-right hook, charcoal on the back-left hook
  const aF = hookAngles[0], aB = hookAngles[3];
  root.add(merged('CoatRed',
    coatParts(aF, Math.sin(aF) * 0.13, 1.6, Math.cos(aF) * 0.13, 0.04), mat(PAL.runner, { rough: 0.95 })));
  root.add(merged('CoatGrey',
    coatParts(aB, Math.sin(aB) * 0.13, 1.58, Math.cos(aB) * 0.13, -0.05), mat(PAL.iron, { rough: 0.95 })));

  // Brass buttons on the red coat (front side of the coat, turned with it)
  const buttons = [];
  for (const y of [-0.25, -0.38, -0.51]) buttons.push(new THREE.BoxGeometry(0.028, 0.028, 0.014).translate(0, y, 0.1));
  const placeF = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, aF, 0.04));
  placeF.setPosition(Math.sin(aF) * 0.13, 1.6, Math.cos(aF) * 0.13);
  root.add(merged('Buttons', buttons.map(g => lean(g.applyMatrix4(placeF))), brass));

  // --- Crooked top hat on the knob: black with a dark red band
  const hat = new THREE.Group(); hat.name = 'Hat';
  hat.position.set(0, 1.69, 0).applyMatrix4(LEAN);
  hat.rotation.set(0.12, 0.4, -0.22);
  root.add(hat);
  const black = mat(PAL.black, { rough: 0.9 });
  const hatBody = merged('HatBody', [
    new THREE.CylinderGeometry(0.13, 0.13, 0.012, 10),                                // brim
    new THREE.CylinderGeometry(0.085, 0.075, 0.14, 8).translate(0, 0.076, 0),          // crown, wider at the top
  ], black);
  hat.add(hatBody);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.077, 0.025, 8), mat(PAL.runner, { rough: 0.95 }));
  band.name = 'HatBand'; band.position.set(0, 0.022, 0);
  hat.add(band);

  return root;
}
