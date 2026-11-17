// Salontafel (coffee table) - woonkamer. Low, chunky, slightly wonky top for the joke-horror feel.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAL, mat, box } from '../palette.js';

export function buildAsset() {
  const root = new THREE.Group(); root.name = 'Salontafel';
  const wood = mat(PAL.wood), dark = mat(PAL.woodDark);

  // Top: thick slab, a tiny tilt so it looks a bit old
  root.add(box('Top', 1.0, 0.06, 0.55, 0, 0.42, 0, wood, [0, 0, 0.01]));
  // Lower shelf
  root.add(box('Shelf', 0.86, 0.03, 0.44, 0, 0.12, 0, wood));

  // Four legs merged into one mesh (same material)
  const legs = [];
  for (const [x, z] of [[-0.44, -0.22], [0.44, -0.22], [-0.44, 0.22], [0.44, 0.22]]) {
    const g = new THREE.BoxGeometry(0.06, 0.39, 0.06); g.translate(x, 0.195, z); legs.push(g);
  }
  const legMesh = new THREE.Mesh(mergeGeometries(legs), dark); legMesh.name = 'Legs';
  root.add(legMesh);

  // A book and a mug on top so it doesn't read as a plain box
  root.add(box('Book', 0.22, 0.04, 0.16, -0.25, 0.47, 0.05, mat(PAL.bordeaux), [0, 0.3, 0]));
  root.add(box('Mug', 0.07, 0.09, 0.07, 0.28, 0.495, -0.08, mat(PAL.cream)));
  return root;
}
