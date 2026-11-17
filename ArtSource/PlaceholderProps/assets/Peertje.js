// Peertje (bare light bulb) - zolder. CEILING item: top (ceiling attach) at y = 0, hangs down.
// A dusty ceiling cap, a short black cord with a silly knot in it, a brass socket and a fat
// pear-shaped glowing bulb. Cord + socket + bulb sit in 'SwingPivot' (at the ceiling) so the
// bulb can sway later; it already hangs a tiny bit crooked.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

const C = (rt, rb, h, seg = 8) => new THREE.CylinderGeometry(rt, rb, h, seg);
// Octahedron geometry is non-indexed and cylinders are indexed, so make them all non-indexed first.
function merged(name, geos, material) {
  const g = mergeGeometries(geos.map(x => (x.index ? x.toNonIndexed() : x)));
  const m = new THREE.Mesh(g, material); m.name = name; return m;
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Peertje';

  // Ceiling cap (static, stays on the ceiling): old dusty plaster cup
  const cap = new THREE.Mesh(C(0.045, 0.034, 0.025, 8).translate(0, -0.0125, 0), mat(PAL.dust));
  cap.name = 'CeilingCap';
  root.add(cap);

  // Everything below the cap swings around the attach point
  const swing = new THREE.Group(); swing.name = 'SwingPivot';
  swing.position.set(0, 0, 0);
  swing.rotation.set(0.04, 0, -0.06);
  root.add(swing);

  // Cord (y -0.015 .. -0.235) with a little knot where someone shortened it
  const cordTop = -0.015, cordBot = -0.235;
  swing.add(merged('Cord', [
    C(0.005, 0.005, cordTop - cordBot, 6).translate(0, (cordTop + cordBot) / 2, 0),
    new THREE.OctahedronGeometry(0.013, 0).scale(1, 0.8, 1).rotateY(0.4).translate(0, -0.1, 0),
  ], mat(PAL.black)));

  // Brass socket: tapered top cap, body, collar ring
  swing.add(merged('Socket', [
    C(0.012, 0.021, 0.02, 8).translate(0, -0.245, 0),
    C(0.022, 0.022, 0.042, 8).translate(0, -0.276, 0),
    C(0.026, 0.026, 0.01, 8).translate(0, -0.295, 0),
  ], mat(PAL.brass, { rough: 0.5, metal: 0.4 })));

  // Pear-shaped bulb (lathe profile from the tip upward so faces point outward)
  const prof = [
    [0.0, -0.13], [0.017, -0.127], [0.034, -0.114], [0.045, -0.094], [0.048, -0.071],
    [0.041, -0.049], [0.028, -0.031], [0.019, -0.015], [0.017, 0.0],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const bulbGeo = new THREE.LatheGeometry(prof, 8).translate(0, -0.298, 0);
  const bulb = new THREE.Mesh(bulbGeo, mat(PAL.flashYellow, { emissive: PAL.flashYellow }));
  bulb.name = 'Bulb';
  swing.add(bulb);

  return root;
}
