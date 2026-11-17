// Schilderij (portrait painting) - gang. WALL item: back on z = 0, faces +Z, origin bottom-centre.
// Chunky brass frame with corner knobs and a red velvet inner lip, hung crooked from a nail.
// The portrait: a very proper wobbly ghost in a plum coat, with a monocle and a red bow tie,
// looking surprised ("oooh") on an old dark-brown oil background.
// The whole frame hangs in 'TiltPivot' at the nail so it can swing/tilt later.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
// Extrude geometry is non-indexed and boxes are indexed, so make them all non-indexed first.
function merged(name, geos, material) {
  const g = mergeGeometries(geos.map(x => (x.index ? x.toNonIndexed() : x)));
  const m = new THREE.Mesh(g, material); m.name = name; return m;
}
// Flat extruded 2D shape, front face at zFront.
function flat(shape, depth, zFront) {
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 6 })
    .translate(0, 0, zFront - depth);
}
// Thin flat disc facing +Z (8 sides), stretched vertically by sy.
function dot(r, sy, x, y, z, t = 0.004) {
  return new THREE.CylinderGeometry(r, r, t, 8).rotateX(Math.PI / 2).scale(1, sy, 1).translate(x, y, z);
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Schilderij';

  const W = 0.6, H = 0.8, D = 0.055, bar = 0.075;   // outer frame size and bar width
  const drop = 0.07;                                 // nail sits this far above the frame top
  const tilt = 0.05;                                 // hung slightly crooked (radians)

  const brass = mat(PAL.brass, { rough: 0.55, metal: 0.35 });
  const pivot = new THREE.Group(); pivot.name = 'TiltPivot';
  root.add(pivot);

  // Picture group: centre of the frame, below the nail
  const pic = new THREE.Group(); pic.name = 'Picture';
  pic.position.set(0, -drop - H / 2, 0);
  pivot.add(pic);

  // Brass frame: four bars + four squat corner knobs (one mesh)
  const ix = W / 2 - bar / 2, iy = H / 2 - bar / 2;
  const frame = [
    B(W, bar, D).translate(0, iy, D / 2),
    B(W, bar, D).translate(0, -iy, D / 2),
    B(bar, H - 2 * bar, D).translate(ix, 0, D / 2),
    B(bar, H - 2 * bar, D).translate(-ix, 0, D / 2),
  ];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
    frame.push(new THREE.CylinderGeometry(0.04, 0.046, 0.016, 6).rotateX(Math.PI / 2)
      .rotateZ(0.3 * sx * sy).translate(sx * ix, sy * iy, D + 0.006));
  }
  pic.add(merged('Frame', frame, brass));

  // Red velvet inner lip just inside the brass
  const ow = W - 2 * bar, oh = H - 2 * bar, lip = 0.02, lipD = 0.04;
  pic.add(merged('InnerLip', [
    B(ow, lip, lipD).translate(0, oh / 2 - lip / 2, lipD / 2),
    B(ow, lip, lipD).translate(0, -oh / 2 + lip / 2, lipD / 2),
    B(lip, oh - 2 * lip, lipD).translate(ow / 2 - lip / 2, 0, lipD / 2),
    B(lip, oh - 2 * lip, lipD).translate(-ow / 2 + lip / 2, 0, lipD / 2),
  ], mat(PAL.runner)));

  // Canvas: old dark-brown oil-painting background, front at z = 0.02
  const canvas = new THREE.Mesh(B(ow, oh, 0.02).translate(0, 0, 0.01), mat(PAL.woodDark));
  canvas.name = 'Canvas';
  pic.add(canvas);

  // Plum coat / shoulders (front at z = 0.024)
  const coat = new THREE.Shape();
  coat.moveTo(-0.205, -oh / 2 + 0.005);
  coat.lineTo(0.205, -oh / 2 + 0.005);
  coat.lineTo(0.18, -0.17);
  coat.lineTo(0.11, -0.125);
  coat.lineTo(-0.1, -0.13);
  coat.lineTo(-0.175, -0.175);
  coat.closePath();
  const coatMesh = new THREE.Mesh(flat(coat, 0.004, 0.024), mat(PAL.wallpaper));
  coatMesh.name = 'Coat';
  pic.add(coatMesh);

  // Wobbly ghost head: round top, wavy sheet bottom, a bit lopsided (front at z = 0.028)
  const head = new THREE.Shape();
  head.moveTo(0.122, 0.07);
  head.absarc(0.0, 0.075, 0.122, -0.04, Math.PI + 0.06, false);
  head.lineTo(-0.135, -0.06);
  head.lineTo(-0.1, -0.115);
  head.lineTo(-0.06, -0.075);
  head.lineTo(-0.015, -0.125);
  head.lineTo(0.03, -0.08);
  head.lineTo(0.075, -0.12);
  head.lineTo(0.13, -0.055);
  head.closePath();
  // Eye glints are ghost-white too, so they share the head mesh
  pic.add(merged('GhostHead', [
    flat(head, 0.004, 0.028),
    dot(0.008, 1, -0.038, 0.075, 0.0335, 0.003),
    dot(0.008, 1, 0.058, 0.085, 0.0335, 0.003),
  ], mat(PAL.ghostWhite)));

  // Big black eyes (one higher than the other) and a surprised "oooh" mouth
  pic.add(merged('Face', [
    dot(0.028, 1.35, -0.045, 0.065, 0.03),
    dot(0.03, 1.35, 0.05, 0.075, 0.03),
    dot(0.022, 1.45, 0.008, -0.025, 0.03),
  ], mat(PAL.black)));

  // Red bow tie under the chin
  const bow = new THREE.Shape();
  bow.moveTo(0, 0); bow.lineTo(-0.055, 0.028); bow.lineTo(-0.05, -0.03); bow.closePath();
  const bow2 = new THREE.Shape();
  bow2.moveTo(0, 0); bow2.lineTo(0.05, -0.026); bow2.lineTo(0.056, 0.03); bow2.closePath();
  pic.add(merged('BowTie', [
    flat(bow, 0.004, 0.032).rotateZ(0.08).translate(0.0, -0.125, 0),
    flat(bow2, 0.004, 0.032).rotateZ(0.08).translate(0.0, -0.125, 0),
    dot(0.014, 1, 0.0, -0.125, 0.032, 0.006),
  ], mat(PAL.danger)));

  // Brass monocle on the right eye, with a little chain hanging down
  pic.add(merged('Monocle', [
    new THREE.TorusGeometry(0.048, 0.006, 4, 10).translate(0.05, 0.075, 0.035),
    B(0.006, 0.12, 0.004).rotateZ(0.35).translate(0.11, 0.0, 0.034),
  ], brass));

  // Hanging wire: an upside-down V from the nail to the frame top
  const topY = -drop, ax = 0.17;
  const len = Math.hypot(ax, drop);
  const ang = Math.atan2(drop, ax);
  pivot.add(merged('Wire', [
    B(len, 0.004, 0.004).rotateZ(ang).translate(-ax / 2, topY / 2, 0.006),
    B(len, 0.004, 0.004).rotateZ(-ang).translate(ax / 2, topY / 2, 0.006),
  ], mat(PAL.iron)));

  // Crooked!
  pivot.rotation.z = tilt;

  // Move so the bounding box bottom sits on y = 0 and is centred on x = 0
  root.updateMatrixWorld(true);
  const bb = new THREE.Box3().setFromObject(root);
  const nailX = -(bb.min.x + bb.max.x) / 2, nailY = -bb.min.y;
  pivot.position.set(nailX, nailY, 0);

  // Nail (static, in the wall) at the pivot point
  const nail = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.02, 6).rotateX(Math.PI / 2)
    .translate(nailX, nailY, 0.01), mat(PAL.iron));
  nail.name = 'Nail';
  root.add(nail);

  return root;
}
