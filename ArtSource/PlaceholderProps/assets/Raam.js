// Raam (window) - gang. WALL item: back on z = 0, sticks out toward +Z, origin at the
// bottom-centre (underside of the sill). Dark-wood frame with a glazing cross, pale glass
// with a little crack, a sill, a brass rod and two short bordeaux curtains (one hangs crooked).
// The curtains have their origin at their top edge so they can sway from the rod later.
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

// A short curtain: a box with zig-zag folds that flares a bit at the hem.
// Origin at the top-centre, hangs down into -y.
function curtainGeometry(w, h, d, folds, flare) {
  const g = new THREE.BoxGeometry(w, h, d, folds * 2, 3, 1);
  const p = g.attributes.position;
  const step = w / (folds * 2);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const t = (y + h / 2) / h;                      // 0 at hem, 1 at top
    const col = Math.round((x + w / 2) / step);     // fold column
    const zig = (col % 2 ? 1 : -1) * 0.014 * (0.6 + 0.4 * (1 - t));
    p.setXYZ(i, x * (1 + flare * (1 - t)), y - h / 2, z + zig);
  }
  g.computeVertexNormals();
  return g;
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Raam';
  const wood = mat(PAL.woodDark);
  const brass = mat(PAL.brass, { rough: 0.55, metal: 0.3 });
  const glass = mat(PAL.glass, { rough: 0.25, metal: 0.1 });
  const cloth = mat(PAL.bordeaux, { rough: 0.95 });

  // --- Frame (1.0 x 1.2, depth 0.12) + glazing cross + sill, all one dark-wood mesh
  const y0 = 0.045;                                   // frame sits on the sill
  const frame = [
    tg(new THREE.BoxGeometry(1.0, 0.08, 0.12), 0, y0 + 0.04, 0.06),        // bottom
    tg(new THREE.BoxGeometry(1.0, 0.08, 0.12), 0, y0 + 1.16, 0.06),        // top
    tg(new THREE.BoxGeometry(0.08, 1.04, 0.12), -0.46, y0 + 0.6, 0.06),    // left
    tg(new THREE.BoxGeometry(0.08, 1.04, 0.12), 0.46, y0 + 0.6, 0.06),     // right
    tg(new THREE.BoxGeometry(0.035, 1.04, 0.05), 0, y0 + 0.6, 0.055),      // glazing bar, vertical
    tg(new THREE.BoxGeometry(0.84, 0.035, 0.05), 0, y0 + 0.7, 0.055, 0, 0, 0.012), // glazing bar, a bit crooked
    tg(new THREE.BoxGeometry(1.16, 0.045, 0.2), 0, 0.0225, 0.1),           // sill
  ];
  root.add(merged('FrameMerged', frame, wood));

  // Pale glass pane behind the glazing bars
  const pane = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.05, 0.01), glass);
  pane.name = 'Glass'; pane.position.set(0, y0 + 0.6, 0.04);
  root.add(pane);

  // A small crack in the upper-right pane (thin dark strokes on the glass)
  const crack = [
    tg(new THREE.BoxGeometry(0.11, 0.004, 0.003), 0.24, y0 + 0.96, 0.0465, 0, 0, -0.6),
    tg(new THREE.BoxGeometry(0.08, 0.004, 0.003), 0.31, y0 + 0.9, 0.0465, 0, 0, 0.5),
    tg(new THREE.BoxGeometry(0.07, 0.004, 0.003), 0.2, y0 + 0.89, 0.0465, 0, 0, -1.9),
  ];
  root.add(merged('Crack', crack, mat(PAL.black)));

  // --- Curtain rod (brass) with ball ends and two wall brackets
  const rodY = 1.34, rodZ = 0.165;
  const rod = [
    tg(new THREE.CylinderGeometry(0.012, 0.012, 1.42, 6), 0, rodY, rodZ, 0, 0, Math.PI / 2),
    tg(new THREE.SphereGeometry(0.026, 6, 4), -0.72, rodY, rodZ),
    tg(new THREE.SphereGeometry(0.026, 6, 4), 0.72, rodY, rodZ),
    tg(new THREE.BoxGeometry(0.02, 0.02, rodZ), -0.62, rodY, rodZ / 2),
    tg(new THREE.BoxGeometry(0.02, 0.02, rodZ), 0.62, rodY, rodZ / 2),
  ];
  root.add(merged('CurtainRod', rod, brass));

  // --- Two short curtains, origin at their top edge just under the rod
  const cl = new THREE.Mesh(curtainGeometry(0.3, 0.86, 0.03, 3, 0.12), cloth);
  cl.name = 'CurtainL'; cl.position.set(-0.53, rodY - 0.015, rodZ); cl.rotation.set(0, 0, -0.015);
  root.add(cl);
  const cr = new THREE.Mesh(curtainGeometry(0.3, 0.8, 0.03, 3, 0.16), cloth);
  cr.name = 'CurtainR'; cr.position.set(0.53, rodY - 0.015, rodZ); cr.rotation.set(0, 0, 0.06); // hangs crooked
  root.add(cr);

  return root;
}
