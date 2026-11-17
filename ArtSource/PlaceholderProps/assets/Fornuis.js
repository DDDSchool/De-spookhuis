// Fornuis (old stove/oven) - keuken. Chunky cream-enamel stove on stubby feet, four black hob
// rings with crossed grates, copper knobs turned every which way and a bottom-hinged oven door
// (OvenDoorPivot) with a dark window. The oven cavity is hollow. Front faces +Z.
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
const BB = (x0, y0, z0, x1, y1, z1) =>
  B(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
const rnd = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

const ZB = -0.3, ZF = 0.27;   // body back / front face
const HOB = 0.8;              // hob surface height

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Fornuis';
  const enamel = mat(PAL.enamel), copper = mat(PAL.copper), black = mat(PAL.black);
  const dark = mat(PAL.checkerDark), iron = mat(PAL.iron);

  // Stubby feet
  const feet = [];
  for (const x of [-0.25, 0.25]) for (const z of [-0.25, 0.22]) feet.push(place(C(0.026, 0.02, 0.04, 6), x, 0.02, z));
  root.add(merged('Feet', feet, iron));

  // Enamel body built around an open oven cavity, plus a backguard leaning back a touch
  root.add(merged('Body', [
    BB(-0.3, 0.04, ZB, 0.3, 0.1, ZF),
    BB(-0.3, 0.1, ZB, -0.26, 0.62, ZF),
    BB(0.26, 0.1, ZB, 0.3, 0.62, ZF),
    BB(-0.26, 0.1, ZB, 0.26, 0.62, -0.26),
    BB(-0.3, 0.62, ZB, 0.3, HOB, ZF),
    place(B(0.6, 0.1, 0.035), 0, HOB + 0.05, -0.2825, -0.05),
  ], enamel));

  // Dark parts: control band behind the knobs + oven cavity lining
  root.add(merged('DarkTrim', [
    BB(-0.27, 0.655, ZF, 0.27, 0.765, ZF + 0.005),
    BB(-0.26, 0.1, -0.26, 0.26, 0.11, ZF - 0.01),
    BB(-0.26, 0.61, -0.26, 0.26, 0.62, ZF - 0.01),
    BB(-0.26, 0.11, -0.26, -0.25, 0.61, ZF - 0.01),
    BB(0.25, 0.11, -0.26, 0.26, 0.61, ZF - 0.01),
    BB(-0.25, 0.11, -0.26, 0.25, 0.61, -0.25),
  ], dark));

  // Oven rack
  const rack = [];
  for (let i = 0; i < 6; i++) rack.push(place(B(0.008, 0.008, 0.46), -0.2 + i * 0.08, 0.33, 0));
  rack.push(place(B(0.5, 0.01, 0.012), 0, 0.33, -0.23), place(B(0.5, 0.01, 0.012), 0, 0.33, 0.23));
  root.add(merged('OvenRack', rack, iron));

  // Black hob: 4 rings of different sizes, a centre plate and a crossed grate each, plus knob pointers
  const blk = [];
  const burners = [[-0.14, -0.13, 0.075], [0.14, -0.13, 0.06], [-0.14, 0.12, 0.085], [0.14, 0.12, 0.07]];
  burners.forEach(([x, z, r], i) => {
    const a = rnd(i) * 0.6;
    blk.push(place(new THREE.TorusGeometry(r, 0.013, 4, 10), x, HOB + 0.01, z, Math.PI / 2));
    blk.push(place(C(r * 0.5, r * 0.55, 0.014, 8), x, HOB + 0.007, z));
    blk.push(place(B(r * 2, 0.01, 0.016), x, HOB + 0.018, z, 0, a, 0));
    blk.push(place(B(0.016, 0.01, r * 2), x, HOB + 0.018, z, 0, a, 0));
  });

  // Copper knobs on the control band, each turned to a different (random) setting
  const KY = 0.71, cu = [];
  [-0.2, -0.067, 0.067, 0.2].forEach((x, i) => {
    const b = (rnd(i + 10) - 0.5) * 2.6;
    cu.push(place(C(0.026, 0.03, 0.03, 8).rotateY(b), x, KY, ZF + 0.02, Math.PI / 2));
    blk.push(place(B(0.007, 0.022, 0.006), x - Math.sin(b) * 0.012, KY + Math.cos(b) * 0.012, ZF + 0.038, 0, 0, b));
  });
  // Copper trim along the top of the backguard
  cu.push(place(C(0.016, 0.016, 0.6, 6), 0, HOB + 0.1, -0.285, 0, 0, Math.PI / 2));
  root.add(merged('HobAndPointers', blk, black));
  root.add(merged('CopperParts', cu, copper));

  // Oven door, hinged at the bottom front edge
  const piv = new THREE.Group(); piv.name = 'OvenDoorPivot'; piv.position.set(0, 0.1, ZF);
  const DW = 0.56, DH = 0.505, DT = 0.03, tilt = 0.008;
  piv.add(merged('OvenDoor', [place(B(DW, DH, DT), 0, 0.005 + DH / 2, DT / 2, 0, 0, tilt)], enamel));
  piv.add(merged('OvenWindowFrame', [place(B(0.34, 0.19, 0.006), 0, 0.29, DT + 0.003, 0, 0, tilt)], iron));
  piv.add(merged('OvenWindow', [place(B(0.29, 0.14, 0.006), 0, 0.29, DT + 0.007, 0, 0, tilt)], mat(PAL.screen)));
  piv.add(merged('OvenHandle', [
    place(C(0.013, 0.013, 0.46, 8), 0, 0.45, DT + 0.045, 0, 0, Math.PI / 2),
    place(B(0.024, 0.024, 0.05), -0.19, 0.45, DT + 0.02),
    place(B(0.024, 0.024, 0.05), 0.19, 0.45, DT + 0.02),
  ], copper));
  root.add(piv);
  return root;
}
