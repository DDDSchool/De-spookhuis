// TvKast (low TV cabinet) - woonkamer. Wooden cabinet on splayed legs with two doors on hinge
// pivots, an old boxy CRT TV on top (cream case, dark screen, wonky rabbit-ear antenna) and a
// few VHS tapes inside. Front (doors, screen) faces +Z.
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
  const root = new THREE.Group(); root.name = 'TvKast';
  const wood = mat(PAL.wood), dark = mat(PAL.woodDark), light = mat(PAL.woodLight), brass = mat(PAL.brass);

  // Four short legs, splayed outward a little
  const legs = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    legs.push(place(C(0.03, 0.02, 0.075, 6), sx * 0.58, 0.039, sz * 0.16, -sz * 0.08, 0, sx * 0.08));
  }
  root.add(merged('LegsMerged', legs, dark));

  // Carcass: top, bottom, sides, back, centre divider and an inner shelf
  root.add(merged('Carcass', [
    place(B(1.34, 0.04, 0.47), 0, 0.48, 0, 0, 0, 0.006),
    place(B(1.26, 0.03, 0.43), 0, 0.075, -0.005),
    place(B(0.03, 0.37, 0.43), -0.635, 0.275, -0.005),
    place(B(0.03, 0.37, 0.43), 0.635, 0.275, -0.005),
    place(B(1.24, 0.37, 0.02), 0, 0.275, -0.21),
    place(B(0.02, 0.37, 0.41), 0, 0.275, -0.005),
    place(B(1.24, 0.02, 0.38), 0, 0.27, -0.01),
  ], wood));

  // VHS tapes on the inner shelf (left) and lower floor (right)
  const tapes = [];
  for (let i = 0; i < 4; i++) tapes.push(place(B(0.028, 0.19, 0.105), -0.5 + i * 0.034, 0.375, 0.0, 0, 0, i === 3 ? 0.25 : 0));
  for (let i = 0; i < 3; i++) tapes.push(place(B(0.19, 0.028, 0.105), 0.3, 0.104 + i * 0.029, 0.02, 0, i * 0.12 - 0.1, 0));
  root.add(merged('Tapes', tapes, mat(PAL.black)));

  // Doors: pivot at the outer hinge edge, on the back face of the door
  const DW = 0.635, DH = 0.36, DT = 0.025;
  for (const [side, s] of [['L', -1], ['R', 1]]) {
    const pivot = new THREE.Group(); pivot.name = `DoorPivot${side}`;
    pivot.position.set(s * 0.65, 0.275, 0.21);
    const door = merged(`Door${side}`, [
      place(B(DW, DH, DT), -s * DW / 2, 0, DT / 2),
      place(B(DW - 0.12, DH - 0.12, 0.012), -s * DW / 2, 0, DT + 0.004), // raised panel
    ], light);
    pivot.add(door);
    const knob = new THREE.Mesh(place(C(0.02, 0.016, 0.03, 8), -s * (DW - 0.06), 0, DT + 0.015, Math.PI / 2, 0, 0), brass);
    knob.name = `Knob${side}`;
    pivot.add(knob);
    root.add(pivot);
  }

  // CRT TV, turned a little on the cabinet
  const tv = new THREE.Group(); tv.name = 'TV';
  tv.position.set(0.05, 0.5, 0.0); tv.rotation.y = -0.06;
  // Case + tapered picture-tube hump at the back (square frustum)
  const hump = C(0.12 / Math.SQRT1_2, 0.2 / Math.SQRT1_2, 0.13, 4).rotateY(Math.PI / 4).rotateX(-Math.PI / 2);
  tv.add(merged('TVBody', [
    place(B(0.62, 0.44, 0.3), 0, 0.225, 0.05),
    place(hump, 0, 0.215, -0.165),
    place(B(0.5, 0.012, 0.22), 0, 0.006, 0.04), // little plinth under the case
  ], mat(PAL.cream)));
  // Bulging dark screen, offset left of the control strip
  tv.add(merged('TVScreen', [
    place(B(0.42, 0.32, 0.02), -0.07, 0.235, 0.205),
    place(B(0.36, 0.26, 0.02), -0.07, 0.235, 0.215),
  ], mat(PAL.screen)));
  // Speaker grille slats + bezel around the screen
  const grille = [place(B(0.46, 0.36, 0.008), -0.07, 0.235, 0.2)];
  for (let i = 0; i < 4; i++) grille.push(place(B(0.1, 0.012, 0.01), 0.22, 0.07 + i * 0.03, 0.203));
  tv.add(merged('TVTrim', grille, dark));
  // Two chunky knobs
  tv.add(merged('TVKnobs', [
    place(C(0.025, 0.028, 0.025, 8), 0.22, 0.33, 0.21, Math.PI / 2, 0, 0),
    place(C(0.02, 0.023, 0.025, 8), 0.22, 0.24, 0.21, Math.PI / 2, 0, 0),
  ], mat(PAL.mustard)));
  // Rabbit-ear antenna: base dome + two rods at mismatched angles + tip balls
  const ant = [place(C(0.035, 0.055, 0.035, 8), 0.06, 0.4575, -0.02)];
  for (const [a, L] of [[0.55, 0.34], [-0.38, 0.3]]) {
    const cx = 0.06 - Math.sin(a) * L / 2, cy = 0.475 + Math.cos(a) * L / 2;
    ant.push(place(C(0.005, 0.006, L, 5), cx, cy, -0.02, 0, 0, a));
    ant.push(place(B(0.018, 0.018, 0.018), 0.06 - Math.sin(a) * L, 0.475 + Math.cos(a) * L, -0.02, 0.4, 0.4, 0));
  }
  tv.add(merged('TVAntenna', ant, mat(PAL.iron)));
  root.add(tv);
  return root;
}
