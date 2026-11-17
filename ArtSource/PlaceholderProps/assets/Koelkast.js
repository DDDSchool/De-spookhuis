// Koelkast (old fridge) - keuken. Rounded, bulgy 1950s-style sage body with a thick cream door
// (DoorPivot, hinge on the left), chunky copper latch handle and a crooked blank badge. Hollow
// inside with an enamel liner, glass shelves, a freezer box and a suspicious glowing jelly.
// Front faces +Z.
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

// Rounded rectangle outline (XY) with big top corners (rT) and small bottom corners (rB).
function roundRect(p, x0, y0, x1, y1, rT, rB) {
  p.moveTo(x0 + rB, y0);
  p.lineTo(x1 - rB, y0);
  p.quadraticCurveTo(x1, y0, x1, y0 + rB);
  p.lineTo(x1, y1 - rT);
  p.quadraticCurveTo(x1, y1, x1 - rT, y1);
  p.lineTo(x0 + rT, y1);
  p.quadraticCurveTo(x0, y1, x0, y1 - rT);
  p.lineTo(x0, y0 + rB);
  p.quadraticCurveTo(x0, y0, x0 + rB, y0);
  return p;
}
// Extrude a shape along +Z with rounded (bevelled) edges; the result starts at z0.
function extrude(shape, depth, bevel, z0) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 4,
  });
  g.clearGroups();
  return g.translate(0, 0, z0 + bevel);
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Koelkast';
  const sage = mat(PAL.sage), cream = mat(PAL.cream), enamel = mat(PAL.enamel), copper = mat(PAL.copper);

  // Stubby feet
  const feet = [];
  for (const x of [-0.25, 0.25]) for (const z of [-0.27, 0.12]) feet.push(place(C(0.03, 0.025, 0.06, 6), x, 0.03, z));
  root.add(merged('Feet', feet, mat(PAL.iron)));

  // Body: rounded shell with a through-hole for the inside (0.70 x 1.80, z -0.345 .. 0.205)
  const bodyShape = roundRect(new THREE.Shape(), -0.325, 0.085, 0.325, 1.775, 0.16, 0.04);
  bodyShape.holes.push(roundRect(new THREE.Path(), -0.27, 0.16, 0.27, 1.7, 0.11, 0.03));
  const body = new THREE.Mesh(extrude(bodyShape, 0.5, 0.025, -0.345), sage); body.name = 'Body';
  root.add(body);

  // Enamel inside: back wall + a thin liner tube, freezer box at the top
  const linerShape = roundRect(new THREE.Shape(), -0.247, 0.183, 0.247, 1.677, 0.088, 0.012);
  linerShape.holes.push(roundRect(new THREE.Path(), -0.235, 0.195, 0.235, 1.665, 0.076, 0.01));
  root.add(merged('Liner', [
    extrude(linerShape, 0.48, 0, -0.3),
    BB(-0.25, 0.18, -0.33, 0.25, 1.68, -0.3).toNonIndexed(),   // extrudes are non-indexed
  ], enamel));
  root.add(merged('FreezerBox', [BB(-0.2, 1.4, -0.3, 0.2, 1.62, 0.1)], mat(PAL.ghostWhite)));
  root.add(merged('FreezerFlap', [place(B(0.37, 0.19, 0.012), 0, 1.51, 0.106, 0, 0, -0.02)], mat(PAL.sageDark)));

  // Glass shelves
  root.add(merged('Shelves', [0.55, 0.95, 1.25].map(y => BB(-0.236, y, -0.3, 0.236, y + 0.012, 0.12)), mat(PAL.glass)));

  // Contents: a milk bottle and a jelly that glows a bit too green
  root.add(merged('MilkBottle', [
    place(C(0.035, 0.04, 0.16, 8), 0.12, 0.562 + 0.08, -0.1),
    place(C(0.018, 0.03, 0.05, 8), 0.12, 0.562 + 0.185, -0.1),
  ], mat(PAL.ghostWhite)));
  root.add(merged('Jelly', [place(C(0.055, 0.07, 0.09, 8), -0.1, 0.962 + 0.045, -0.05, 0, 0, 0.04)],
    mat(PAL.ghostGreen, { emissive: PAL.ghostGreen })));

  // Door, hinged on the left (-X) edge at the door's back face
  const HX = -0.34, HZ = 0.21;
  const piv = new THREE.Group(); piv.name = 'DoorPivot'; piv.position.set(HX, 0, HZ);
  const toPiv = g => g.translate(-HX, 0, -HZ);   // geometry built in prop space -> pivot space
  const doorShape = roundRect(new THREE.Shape(), -0.315, 0.1, 0.315, 1.76, 0.15, 0.03);
  piv.add(merged('Door', [toPiv(extrude(doorShape, 0.05, 0.025, HZ))], cream));

  // Chunky copper latch handle on the right, a little crooked
  const handle = mergeGeometries([
    place(B(0.06, 0.32, 0.016), 0, 0, 0.008),
    place(B(0.03, 0.03, 0.04), 0, -0.11, 0.025),
    place(B(0.03, 0.03, 0.04), 0, 0.11, 0.025),
    place(C(0.02, 0.02, 0.3, 8), 0, 0, 0.05),
  ]);
  place(handle, 0.25, 1.12, 0.31, 0, 0, 0.05);
  piv.add(merged('DoorHandle', [toPiv(handle)], copper));
  piv.add(merged('DoorBadge', [toPiv(place(B(0.18, 0.06, 0.012), 0, 1.58, 0.314, 0, 0, 0.07))], mat(PAL.sageDark)));

  // Door racks on the inside of the door
  const racks = [];
  for (const y of [0.45, 0.85, 1.2]) {
    racks.push(toPiv(BB(-0.2, y, 0.13, 0.2, y + 0.012, 0.21)));
    racks.push(toPiv(BB(-0.2, y + 0.012, 0.13, 0.2, y + 0.06, 0.142)));
  }
  piv.add(merged('DoorRacks', racks, enamel));
  root.add(piv);
  return root;
}
