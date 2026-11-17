// Wandtafel (console table) - gang. Floor item, base at y = 0, back toward -Z (against the wall),
// front = +Z. Narrow dark-wood table with slightly splayed tapered legs, one small drawer on
// DrawerPivot (pivot = bottom-centre of the drawer back, slides out along +Z) and a brass
// candlestick with a leaning candle on a little lace doily.
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
  const root = new THREE.Group(); root.name = 'Wandtafel';
  const wood = mat(PAL.woodDark);
  const brass = mat(PAL.brass, { rough: 0.55, metal: 0.3 });

  // --- Top (0.9 x 0.04 x 0.3), a hair crooked
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.3), wood);
  top.name = 'Top'; top.position.set(0, 0.78, 0); top.rotation.set(0, 0, 0.006);
  root.add(top);

  // --- Legs + apron with a drawer opening (x -0.2..0.2, y 0.65..0.75 at the front)
  const body = [];
  for (const [x, z] of [[-0.4, -0.11], [0.4, -0.11], [-0.4, 0.11], [0.4, 0.11]]) {
    // square tapered leg (4-sided cylinder turned 45 deg), splayed a little outward
    body.push(tg(new THREE.CylinderGeometry(0.032, 0.021, 0.76, 4).rotateY(Math.PI / 4),
      x, 0.381, z, -Math.sign(z) * 0.025, 0, Math.sign(x) * 0.03));
  }
  // leg feet blobs, also splayed
  for (const [x, z] of [[-0.41, -0.12], [0.41, -0.12], [-0.41, 0.12], [0.41, 0.12]]) {
    body.push(tg(new THREE.BoxGeometry(0.035, 0.02, 0.035), x, 0.01, z));
  }
  body.push(
    tg(new THREE.BoxGeometry(0.21, 0.12, 0.02), -0.305, 0.70, 0.12),   // front apron, left of drawer
    tg(new THREE.BoxGeometry(0.21, 0.12, 0.02), 0.305, 0.70, 0.12),    // front apron, right of drawer
    tg(new THREE.BoxGeometry(0.4, 0.01, 0.02), 0, 0.755, 0.12),        // rail above drawer
    tg(new THREE.BoxGeometry(0.4, 0.01, 0.02), 0, 0.645, 0.12),        // rail below drawer
    tg(new THREE.BoxGeometry(0.82, 0.12, 0.02), 0, 0.70, -0.12),       // back apron
    tg(new THREE.BoxGeometry(0.02, 0.12, 0.22), -0.41, 0.70, 0),       // side apron L
    tg(new THREE.BoxGeometry(0.02, 0.12, 0.22), 0.41, 0.70, 0),        // side apron R
    tg(new THREE.BoxGeometry(0.42, 0.01, 0.22), 0, 0.645, 0),          // drawer floor (runner board)
    tg(new THREE.BoxGeometry(0.01, 0.1, 0.22), -0.205, 0.70, 0),       // drawer cavity side L
    tg(new THREE.BoxGeometry(0.01, 0.1, 0.22), 0.205, 0.70, 0),        // drawer cavity side R
    tg(new THREE.BoxGeometry(0.8, 0.02, 0.03), 0, 0.12, 0),            // low stretcher between the side pairs
    tg(new THREE.BoxGeometry(0.02, 0.02, 0.22), -0.4, 0.12, 0),
    tg(new THREE.BoxGeometry(0.02, 0.02, 0.22), 0.4, 0.12, 0),
  );
  root.add(merged('BodyMerged', body, wood));

  // --- Drawer on its pivot (bottom-centre of the drawer back). Slide along local +Z to open.
  const pivot = new THREE.Group(); pivot.name = 'DrawerPivot';
  pivot.position.set(0, 0.652, -0.08);
  root.add(pivot);
  const drawer = [
    tg(new THREE.BoxGeometry(0.39, 0.092, 0.02), 0, 0.048, 0.2),     // front panel (flush with the apron)
    tg(new THREE.BoxGeometry(0.01, 0.07, 0.19), -0.185, 0.037, 0.095), // side L
    tg(new THREE.BoxGeometry(0.01, 0.07, 0.19), 0.185, 0.037, 0.095),  // side R
    tg(new THREE.BoxGeometry(0.36, 0.07, 0.01), 0, 0.037, 0.005),     // back
    tg(new THREE.BoxGeometry(0.37, 0.008, 0.19), 0, 0.006, 0.095),    // bottom
  ];
  pivot.add(merged('Drawer', drawer, wood));
  const knob = merged('DrawerKnob', [
    tg(new THREE.CylinderGeometry(0.01, 0.01, 0.02, 6), 0, 0.048, 0.22, Math.PI / 2, 0, 0),
    tg(new THREE.SphereGeometry(0.018, 6, 4), 0, 0.048, 0.235),
  ], brass);
  pivot.add(knob);

  // --- Candlestick on a lace doily, right side of the top
  const tx = 0.25, tz = -0.01, ty = 0.8 + tx * 0.006 - 0.001;      // follow the top's tilt
  const doily = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.004, 10), mat(PAL.cream));
  doily.name = 'Doily'; doily.position.set(tx, ty + 0.002, tz);
  root.add(doily);
  root.add(merged('CandleStick', [
    tg(new THREE.CylinderGeometry(0.04, 0.055, 0.016, 8), tx, ty + 0.012, tz),   // foot
    tg(new THREE.CylinderGeometry(0.012, 0.018, 0.13, 6), tx, ty + 0.085, tz),   // stem
    tg(new THREE.SphereGeometry(0.022, 6, 4), tx, ty + 0.07, tz),                // knot on the stem
    tg(new THREE.CylinderGeometry(0.035, 0.02, 0.014, 8), tx, ty + 0.155, tz),   // drip cup
    tg(new THREE.BoxGeometry(0.06, 0.01, 0.012), tx + 0.04, ty + 0.045, tz),      // finger handle (arm)
    tg(new THREE.BoxGeometry(0.01, 0.03, 0.012), tx + 0.068, ty + 0.032, tz),     // finger handle (drop)
  ], brass));
  // Candle leans a bit; its own group so candle, drips and flame lean together
  const candleGrp = new THREE.Group(); candleGrp.name = 'Candle';
  candleGrp.position.set(tx, ty + 0.16, tz); candleGrp.rotation.set(0.05, 0, -0.1);
  root.add(candleGrp);
  candleGrp.add(merged('CandleWax', [
    tg(new THREE.CylinderGeometry(0.016, 0.017, 0.12, 6), 0, 0.06, 0),
    tg(new THREE.SphereGeometry(0.009, 5, 3), 0.015, 0.09, 0.006),             // wax drips
    tg(new THREE.SphereGeometry(0.008, 5, 3), -0.012, 0.05, 0.012),
    tg(new THREE.SphereGeometry(0.012, 5, 3), 0.01, 0.008, -0.012),
  ], mat(PAL.cream)));
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.011, 0.04, 5),
    mat(PAL.flashYellow, { emissive: PAL.flashYellow }));
  flame.name = 'Flame'; flame.position.set(0, 0.145, 0);
  candleGrp.add(flame);

  return root;
}
