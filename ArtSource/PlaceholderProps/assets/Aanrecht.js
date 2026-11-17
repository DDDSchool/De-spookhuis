// Aanrecht (kitchen counter run) - keuken. Cream cabinets with three sage doors on pivots
// (DoorPivot1..3), a chunky woodDark worktop with an enamel sink, a leaning copper tap and a
// low checker-tile backsplash with a few crooked tiles (and one that fell off). Front faces +Z.
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
// Box spanning two corners (min -> max)
const BB = (x0, y0, z0, x1, y1, z1) =>
  B(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
// Small deterministic "random" so the wonkiness is the same every export
const rnd = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

const HW = 1.2;              // half width of the run
const ZB = -0.31, ZF = 0.25; // carcass back / front face (doors sit in front of ZF)
const TOP = 0.9, TT = 0.04;  // worktop surface height + thickness
const UNDER = TOP - TT;      // underside of the worktop
const PL = 0.1;              // plinth (toe kick) height
const SX = 0.27, SZ0 = -0.2, SZ1 = 0.17, SBOT = 0.68; // sink hole + basin bottom

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Aanrecht';
  const cream = mat(PAL.cream), sage = mat(PAL.sage), sageDark = mat(PAL.sageDark);
  const copper = mat(PAL.copper), wood = mat(PAL.woodDark), enamel = mat(PAL.enamel);

  // Dark plinth, recessed under the cabinets
  root.add(merged('Plinth', [BB(-HW + 0.03, 0, ZB, HW - 0.03, PL, ZF - 0.06)], mat(PAL.checkerDark)));

  // Hollow cream carcass (so the inside shows when a door opens): ends, bottom, back, dividers, shelves
  root.add(merged('Carcass', [
    BB(-HW, 0, ZB, -HW + 0.03, UNDER, ZF),
    BB(HW - 0.03, 0, ZB, HW, UNDER, ZF),
    BB(-HW + 0.03, PL, ZB, HW - 0.03, PL + 0.03, ZF),
    BB(-HW + 0.03, PL + 0.03, ZB, HW - 0.03, UNDER, ZB + 0.02),
    BB(-0.41, PL + 0.03, ZB + 0.02, -0.39, UNDER, ZF),
    BB(0.39, PL + 0.03, ZB + 0.02, 0.41, UNDER, ZF),
    BB(-HW + 0.03, 0.47, ZB + 0.02, -0.41, 0.49, ZF - 0.03),
    BB(0.41, 0.47, ZB + 0.02, HW - 0.03, 0.49, ZF - 0.03),
  ], cream));

  // Worktop in four pieces around the sink hole, overhanging the doors a bit
  root.add(merged('Worktop', [
    BB(-HW, UNDER, ZB, -SX, TOP, 0.31),
    BB(SX, UNDER, ZB, HW, TOP, 0.31),
    BB(-SX, UNDER, ZB, SX, TOP, SZ0),
    BB(-SX, UNDER, SZ1, SX, TOP, 0.31),
  ], wood));

  // Deep enamel sink basin hanging into the middle cabinet, rim just above the worktop
  const T = 0.03, RIM = TOP + 0.012;
  root.add(merged('Sink', [
    BB(-SX, SBOT, SZ0, SX, SBOT + 0.02, SZ1),
    BB(-SX, SBOT + 0.02, SZ0, -SX + T, RIM, SZ1),
    BB(SX - T, SBOT + 0.02, SZ0, SX, RIM, SZ1),
    BB(-SX + T, SBOT + 0.02, SZ0, SX - T, RIM, SZ0 + T),
    BB(-SX + T, SBOT + 0.02, SZ1 - T, SX - T, RIM, SZ1),
  ], enamel));
  root.add(merged('Drain', [place(C(0.03, 0.03, 0.006, 8), 0, SBOT + 0.023, -0.015)], mat(PAL.iron)));

  // Copper: gooseneck tap (leans a little), two cross valves, and the pipe under the sink
  const tap = mergeGeometries([
    place(C(0.03, 0.036, 0.03, 8), 0, 0.015, 0),
    place(C(0.016, 0.016, 0.22, 8), 0, 0.14, 0),
    place(B(0.04, 0.04, 0.04), 0, 0.25, 0),
    place(C(0.015, 0.015, 0.17, 8), 0, 0.25, 0.085, Math.PI / 2),
    place(C(0.02, 0.013, 0.05, 8), 0, 0.225, 0.17),
  ]);
  place(tap, 0.01, TOP, -0.25, -0.03, 0, 0.07);
  const cu = [tap];
  for (const s of [-1, 1]) {
    const a = s * 0.35 + rnd(s + 5) * 0.4;
    cu.push(place(C(0.013, 0.016, 0.04, 6), s * 0.09, TOP + 0.02, -0.245));
    cu.push(place(B(0.06, 0.014, 0.014), s * 0.09, TOP + 0.045, -0.245, 0, a, 0));
    cu.push(place(B(0.014, 0.014, 0.06), s * 0.09, TOP + 0.045, -0.245, 0, a, 0));
  }
  cu.push(
    place(C(0.022, 0.022, 0.17, 8), 0, SBOT - 0.085, -0.015),
    place(B(0.05, 0.05, 0.05), 0, SBOT - 0.17, -0.015),
    place(C(0.022, 0.022, 0.27, 8), 0, SBOT - 0.17, -0.155, Math.PI / 2),
  );
  root.add(merged('CopperParts', cu, copper));

  // Low tiled backsplash: cream grout board, 2 rows of checker tiles, sageDark cap rail
  const BH = 0.2, GZ = ZB + 0.012, TS = 0.1;
  root.add(merged('BacksplashGrout', [BB(-HW, TOP, ZB, HW, TOP + BH, GZ)], cream));
  const tilesA = [], tilesB = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 24; c++) {
    const i = r * 24 + c;
    if (i === 30) continue;                       // this one fell off
    let rz = (rnd(i) - 0.5) * 0.06, dz = 0;
    if (i === 17) { rz = 0.3; dz = 0.004; }       // one very crooked tile
    const g = place(B(TS - 0.008, TS - 0.008, 0.012), -HW + TS / 2 + c * TS, TOP + TS / 2 + r * TS, GZ + 0.006 + dz, 0, 0, rz);
    ((r + c) % 2 ? tilesB : tilesA).push(g);
  }
  tilesB.push(BB(-HW, TOP + BH, ZB, HW, TOP + BH + 0.018, GZ + 0.016));
  root.add(merged('TilesSage', tilesA, sage));
  root.add(merged('TilesSageDark', tilesB, sageDark));

  // Three cabinet doors, each in a pivot on its hinge edge (door back face, bottom of the door)
  const DW = 0.77, DH = 0.72, DT = 0.025, DY = PL + 0.035;
  const doors = [[1, -HW + 0.015, 1, 0.0], [2, -0.385, 1, 0.014], [3, HW - 0.015, -1, -0.006]];
  for (const [i, hx, dir, tilt] of doors) {
    const piv = new THREE.Group(); piv.name = `DoorPivot${i}`; piv.position.set(hx, DY, ZF);
    const cx = dir * DW / 2;
    piv.add(merged(`Door${i}`, [place(B(DW, DH, DT), cx, DH / 2, DT / 2, 0, 0, tilt)], sage));
    piv.add(merged(`Door${i}Panel`, [place(B(DW - 0.16, DH - 0.18, 0.012), cx, DH / 2, DT + 0.006, 0, 0, tilt)], sageDark));
    const kx = dir * (DW - 0.07), ky = DH - 0.12;
    piv.add(merged(`Door${i}Knob`, [
      place(C(0.012, 0.012, 0.03, 6), kx, ky, DT + 0.015, Math.PI / 2),
      place(C(0.026, 0.022, 0.018, 8), kx, ky, DT + 0.035, Math.PI / 2),
    ], copper));
    root.add(piv);
  }
  return root;
}
