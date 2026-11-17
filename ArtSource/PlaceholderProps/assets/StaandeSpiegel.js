// StaandeSpiegel (tall standing mirror) - zolder. Oval wooden frame swinging between two posts,
// leaning back a little and slightly crooked, with a small crack in the glass.
// The mirror sits in MirrorPivot (axis = the brass pins, along X) so it can tilt/swing later.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat } from '../palette.js';

function T(g, x, y, z, rx = 0, ry = 0, rz = 0) {
  if (rx || ry || rz) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz)));
  return g.translate(x, y, z);
}
const B = (w, h, d, x, y, z, rx, ry, rz) => T(new THREE.BoxGeometry(w, h, d), x, y, z, rx, ry, rz);
function merged(name, geos, material) {
  const m = new THREE.Mesh(mergeGeometries(geos), material); m.name = name; return m;
}

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'StaandeSpiegel';
  const stand = mat(PAL.atticBrown), frame = mat(PAL.woodDark);
  const brass = mat(PAL.brass, { rough: 0.45, metal: 0.6 });
  const glass = mat(PAL.glass, { rough: 0.15, metal: 0.2 });

  const PY = 1.02;          // pivot height (centre of the oval)
  const A = 0.215, Bh = 0.54; // oval half width / half height (centre line of the frame)
  const PX = 0.285;         // post centre x

  // ---- Stand (static) ----
  const st = [];
  for (const s of [-1, 1]) {
    st.push(B(0.07, 0.05, 0.45, s * PX, 0.025, 0));                 // foot
    st.push(B(0.05, 1.1, 0.05, s * PX, 0.05 + 0.55, 0, 0, 0, s * 0.01)); // post, leaning in a hair
    st.push(T(new THREE.CylinderGeometry(0.03, 0.035, 0.05, 6), s * (PX - 0.006), 1.17, 0)); // post cap
  }
  st.push(B(2 * PX, 0.04, 0.04, 0, 0.16, 0));                       // stretcher
  root.add(merged('Stand', st, stand));

  // Brass pins through the posts + knobs on the outside
  const pins = [];
  for (const s of [-1, 1]) {
    pins.push(T(new THREE.CylinderGeometry(0.016, 0.016, 0.09, 6), s * (PX - 0.03), PY, 0, 0, 0, Math.PI / 2));
    pins.push(T(new THREE.CylinderGeometry(0.03, 0.03, 0.025, 8), s * (PX + 0.035), PY, 0, 0, 0, Math.PI / 2));
  }
  root.add(merged('Pins', pins, brass));

  // ---- Mirror (moves): pivot on the pin axis ----
  const piv = new THREE.Group(); piv.name = 'MirrorPivot';
  piv.position.set(0, PY, 0); piv.rotation.set(-0.12, 0, 0.025); // leans back, slightly crooked
  root.add(piv);

  // Oval frame as a closed tube following an ellipse
  const pts = [];
  for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * A, Math.sin(a) * Bh, 0)); }
  const ring = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 20, 0.036, 5, true);
  // Back panel (faces -Z) and a little crest on top
  const back = new THREE.CircleGeometry(1, 20); back.scale(A, Bh, 1); back.rotateY(Math.PI); back.translate(0, 0, -0.014);
  const crest = B(0.08, 0.08, 0.035, 0, Bh + 0.06, 0, 0, 0, Math.PI / 4);
  piv.add(merged('Frame', [ring, back, crest], frame));

  const knob = new THREE.Mesh(T(new THREE.SphereGeometry(0.026, 8, 5), 0, Bh + 0.135, 0), brass);
  knob.name = 'CrestKnob'; piv.add(knob);

  const gl = new THREE.CircleGeometry(1, 20); gl.scale(A - 0.005, Bh - 0.005, 1); gl.translate(0, 0, 0.004);
  const g = new THREE.Mesh(gl, glass); g.name = 'Glass'; piv.add(g);

  // A small zig-zag crack in the upper corner of the glass
  const crack = [
    B(0.11, 0.007, 0.003, 0.09, 0.33, 0.008, 0, 0, -0.7),
    B(0.08, 0.007, 0.003, 0.05, 0.27, 0.008, 0, 0, 0.5),
    B(0.06, 0.006, 0.003, 0.14, 0.27, 0.008, 0, 0, 1.2),
  ];
  piv.add(merged('Crack', crack, mat(PAL.iron)));
  return root;
}
