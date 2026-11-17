// Exports every assets/*.js (each exports buildAsset()) to a GLB in the Unity project.
// Usage: node export-all.mjs            -> all assets
//        node export-all.mjs Sofa Bed   -> only these
import { writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

// Node has no FileReader, and GLTFExporter needs it
globalThis.FileReader ??= class {
  #done(r) { this.result = r; this.onload?.({ target: this }); this.onloadend?.({ target: this }); }
  readAsArrayBuffer(b) { b.arrayBuffer().then(r => this.#done(r)); }
  readAsDataURL(b) { b.arrayBuffer().then(r => this.#done('data:application/octet-stream;base64,' + Buffer.from(r).toString('base64'))); }
};

const OUT = path.resolve('..', '..', 'Assets', '_Project', 'Art', 'Models', 'Placeholder');
mkdirSync(OUT, { recursive: true });
const wanted = process.argv.slice(2);
const files = readdirSync('assets').filter(f => f.endsWith('.js') && (!wanted.length || wanted.includes(f.replace('.js', ''))));

for (const f of files) {
  const name = f.replace('.js', '');
  try {
    const { buildAsset } = await import(pathToFileURL(path.resolve('assets', f)).href);
    const scene = buildAsset();
    let tris = 0;
    scene.traverse(o => { if (o.isMesh) { const g = o.geometry; tris += (g.index ? g.index.count : g.attributes.position.count) / 3; } });
    const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
    const min = new THREE.Box3().setFromObject(scene).min;
    const glb = await new GLTFExporter().parseAsync(scene, { binary: true });
    writeFileSync(path.join(OUT, name + '.glb'), Buffer.from(glb));
    console.log(`${name}: ${tris} tris, size ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)} m, minY ${min.y.toFixed(3)}`);
  } catch (e) {
    console.log(`${name}: FAILED ${e.message}`);
  }
}
