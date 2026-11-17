// ZwarteDeur (pitch-black door) - shared between all rooms. Chunky dark-wood frame around a
// door panel that reads as a void. Origin at the bottom-centre of the opening, frame depth
// centred on z = 0, front = +Z. The panel sits in DoorPivot (hinge on the left edge, front face):
// a negative Y rotation swings the door open toward +Z without clipping the jamb.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

// Transformed copy of a geometry (rotation in radians, Euler XYZ like Object3D)
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
  const root = new THREE.Group(); root.name = 'ZwarteDeur';
  const wood = mat(PAL.woodDark);
  const brass = mat(PAL.brass, { rough: 0.55, metal: 0.3 });
  const voidBlack = mat(PAL.black, { rough: 1 });

  // --- Frame (static): two jambs, a head that is a tiny bit crooked, keystones, threshold
  const D = 0.18;
  const frame = [
    tg(new THREE.BoxGeometry(0.07, 2.2, D), -0.49, 1.1, 0),          // left jamb  (inner face x = -0.455)
    tg(new THREE.BoxGeometry(0.07, 2.2, D), 0.49, 1.1, 0),           // right jamb (inner face x = +0.455)
    tg(new THREE.BoxGeometry(1.05, 0.08, D), 0, 2.16, 0, 0, 0, 0.008), // head, slightly wonky
    tg(new THREE.BoxGeometry(0.91, 0.01, D), 0, 0.005, 0),          // threshold
    // keystone blocks on both faces of the head
    tg(new THREE.BoxGeometry(0.12, 0.1, 0.025), 0, 2.15, D / 2 + 0.0125, 0, 0, 0.03),
    tg(new THREE.BoxGeometry(0.12, 0.1, 0.025), 0, 2.15, -D / 2 - 0.0125, 0, 0, -0.03),
    // little plinth blocks at the foot of each jamb, both faces
    ...[-0.49, 0.49].flatMap(x => [
      tg(new THREE.BoxGeometry(0.085, 0.14, 0.02), x, 0.07, D / 2 + 0.01),
      tg(new THREE.BoxGeometry(0.085, 0.14, 0.02), x, 0.07, -D / 2 - 0.01),
    ]),
  ];
  root.add(merged('FrameMerged', frame, wood));

  // Brass hinge knuckles on the left jamb (static, at the front face where the pivot is)
  const hinges = [0.3, 1.06, 1.82].map(y =>
    tg(new THREE.CylinderGeometry(0.013, 0.013, 0.09, 6), -0.452, y, 0.022));
  root.add(merged('Hinges', hinges, brass));

  // --- Door on its pivot: hinge line = left edge of the panel, on the front face (z = +0.02)
  const pivot = new THREE.Group(); pivot.name = 'DoorPivot';
  pivot.position.set(-0.45, 0, 0.02);
  root.add(pivot);

  // Panel 0.9 x 2.1 x 0.04, pure black and fully rough so it reads as a hole in the world.
  // Local x 0..0.9 from the hinge, local z -0.04..0 (front face at local z = 0).
  const panel = [
    tg(new THREE.BoxGeometry(0.9, 2.1, 0.04), 0.45, 0.011 + 1.05, -0.02),
    // keyholes (same black, just tiny bumps under the handle so the shape still reads in light)
    tg(new THREE.BoxGeometry(0.012, 0.025, 0.004), 0.83, 0.93, 0.012),
    tg(new THREE.BoxGeometry(0.012, 0.025, 0.004), 0.83, 0.93, -0.052),
  ];
  pivot.add(merged('DoorPanel', panel, voidBlack));

  // Brass lever handle on both faces, near the free (right) edge, lever pointing to the hinge
  const handle = [];
  for (const side of [1, -1]) {
    const face = side > 0 ? 0 : -0.04;               // local z of that face
    const out = (d) => face + side * d;              // offset outward from that face
    handle.push(
      tg(new THREE.BoxGeometry(0.045, 0.16, 0.01), 0.83, 0.97, out(0.005)),            // back plate
      tg(new THREE.CylinderGeometry(0.011, 0.011, 0.04, 6), 0.83, 1.02, out(0.025), Math.PI / 2, 0, 0), // spindle
      tg(new THREE.BoxGeometry(0.12, 0.024, 0.024), 0.78, 1.02, out(0.045), 0, 0, 0.06),     // lever (free end droops a bit)
      tg(new THREE.SphereGeometry(0.018, 6, 4), 0.72, 1.016, out(0.045)),                     // knob end
    );
  }
  pivot.add(merged('Handle', handle, brass));

  return root;
}
