// Shared palette and material helper for all placeholder props.
// Colours from the moodboard + GAME_DESIGN.md §9 (flat colours, low/mid poly, joke-horror).
import * as THREE from 'three';

export const PAL = {
  // shared
  ghostWhite: 0xedeff2, ghostGreen: 0x8ff0a4, flashYellow: 0xffd966, moonBlue: 0x3d5a99, danger: 0xc0392b,
  black: 0x0b0b0e, iron: 0x2b2b30, brass: 0xb08d3c,
  // woonkamer: bordeaux / wood / moss green / mustard
  bordeaux: 0x6e1f2b, bordeauxDark: 0x4a1520, wood: 0x8b5a33, woodDark: 0x5a3a22, woodLight: 0xb07a4a,
  moss: 0x5f7a3a, mossDark: 0x46592b, mustard: 0xc9a227, cream: 0xe8dcc0,
  // keuken: sage tiles / cream / copper / checker floor
  sage: 0x8fb3a0, sageDark: 0x6b8f7c, copper: 0xb87333, enamel: 0xdcd6c8, checkerDark: 0x2e2a28,
  // zolder: brown / dust grey
  atticBrown: 0x6b4a2e, atticBrownDark: 0x4a3220, dust: 0x9a958c, dustLight: 0xbdb8ad, sheet: 0xd8d4c8,
  // gang
  wallpaper: 0x3b2f3f, runner: 0x5a1d24,
  glass: 0x9fb8c8, screen: 0x1c2a24,
};

const cache = new Map();
// Flat-shaded standard material, shared per colour so the GLB stays small.
export function mat(color, { rough = 0.85, metal = 0, emissive = null } = {}) {
  const key = `${color}-${rough}-${metal}-${emissive}`;
  if (!cache.has(key)) {
    const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, flatShading: true });
    if (emissive !== null) { m.emissive = new THREE.Color(emissive); m.emissiveIntensity = 1; }
    m.name = `M_${new THREE.Color(color).getHexString()}`;
    cache.set(key, m);
  }
  return cache.get(key);
}

// Box helper: size in metres, position of its centre, optional rotation (radians).
export function box(name, w, h, d, x, y, z, material, rot = null) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.name = name; m.position.set(x, y, z);
  if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
  return m;
}

// Cylinder helper (low segment count for the low-poly look).
export function cyl(name, rTop, rBottom, h, x, y, z, material, seg = 8, rot = null) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, seg), material);
  m.name = name; m.position.set(x, y, z);
  if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
  return m;
}
