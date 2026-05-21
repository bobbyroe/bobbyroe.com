import * as THREE from "three";
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { color, pass, mrt, output, float, screenUV, uniform } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import WebGPU from 'three/addons/capabilities/WebGPU.js';

if (WebGPU.isAvailable() === false) {
  document.body.appendChild(WebGPU.getErrorMessage());
  throw new Error('No WebGPU support');
}

const body = document.body;
let w = body.clientWidth;
let h = body.clientHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
camera.position.z = 35;
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGPURenderer({ 
  antialias: true, 
  canvas, 
  alpha: true 
});
renderer.setSize(w, h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
await renderer.init();

// background
const bgColor = screenUV.y.mix(color(0x050a1e), color(0x102050));
const bgVignette = screenUV.distance(.35).remapClamp(0.0, 0.6).oneMinus();
const bgIntensity = 1;
scene.backgroundNode = bgColor.mul(bgVignette.mul(bgIntensity));

const hdrLoader = new UltraHDRLoader();
const glbLoader = new GLTFLoader();
const texLoader = new THREE.TextureLoader();

function logAssetError(type, path, error) {
  console.error(`[assets] Failed to load ${type}: ${path}`, error);
}

async function loadTextureWithFallback(paths) {
  for (const path of paths) {
    try {
      return await texLoader.loadAsync(path);
    } catch (error) {
      logAssetError('texture', path, error);
    }
  }
  return null;
}

try {
  const hdr = await hdrLoader.loadAsync('src/envs/studio_garden_4k.jpg');
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = hdr;
  scene.environmentIntensity = 2.0;
} catch (error) {
  logAssetError('environment', 'src/envs/studio_garden_4k.jpg', error);
}

let duckMaterial = new THREE.MeshStandardMaterial({ color: 0xf6c95a, roughness: 0.35 });
let duckGeometry = new THREE.SphereGeometry(0.65, 32, 24);
try {
  const duckGlb = await glbLoader.loadAsync('./src/Duck.glb');
  duckGlb.scene.traverse((child) => {
    if (child.isMesh) {
      duckMaterial = child.material.clone();
      duckGeometry = child.geometry.clone();
      duckGeometry.scale(0.01, 0.01, 0.01);
    }
  });
} catch (error) {
  logAssetError('model', './src/Duck.glb', error);
}

const [woodMap, woodRoughnessMap, woodNormalMap] = await Promise.all([
  loadTextureWithFallback(['./src/wood/baseColor.jpg', './src/wood/baseColor.png']),
  loadTextureWithFallback(['./src/wood/roughness.jpg', './src/wood/roughness.png']),
  loadTextureWithFallback(['./src/wood/normal.jpg', './src/wood/normal.png']),
]);

const wireframeMat = new THREE.MeshBasicNodeMaterial({
  color: 0x00ccff,
  wireframe: true,
});
// wireframeMat.mrtNode = mrt({
//   bloomIntensity: uniform(2.0)
// });

// MATERIALS
const materials = [
  // chrome material
  new THREE.MeshPhysicalMaterial({
    roughness: 0.0,
    metalness: 1.0,
    thickness: 1.0,
    side: THREE.DoubleSide,
  }),
  // wood material
  new THREE.MeshStandardMaterial({
    map: woodMap,
    roughnessMap: woodRoughnessMap,
    normalMap: woodNormalMap,
    normalScale: new THREE.Vector2(6, 6),
  }),
  // glass material
  new THREE.MeshPhysicalMaterial({
    roughness: 0.0,
    transmission: 1.0,
    thickness: 1.0,
    flatShading: true,
    side: THREE.DoubleSide,
  }),
  duckMaterial,
  wireframeMat,
  // blue chrome material
  new THREE.MeshPhysicalMaterial({
    roughness: 0.0,
    metalness: 1.0,
    thickness: 1.0,
    color: 0x0099ff,
    side: THREE.DoubleSide,
  })
];

// GEOMETRIES
const geometries = [
  new THREE.TorusKnotGeometry(0.5, 0.2, 128, 64),
  new RoundedBoxGeometry(1, 1, 1, 4, 0.02),
  new THREE.IcosahedronGeometry(0.75, 6),
  duckGeometry,
  new THREE.IcosahedronGeometry(0.75, 1),
  new TeapotGeometry(0.6),
];
const offsets = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5, Math.PI * 2, 0];
const zPos = [0, 0, 0, 0, 1.5, -1.5];
const radius = 2;
let rate = 0.0001;

const sceneGroup = new THREE.Group();
sceneGroup.position.set(1.5, 7.5, 0.0);
sceneGroup.userData.update = (t) => {
  sceneGroup.children.forEach(child => {
    child.userData.update?.(t);
  });
  sceneGroup.rotation.y = t * rate;
};
scene.add(sceneGroup);

for (let i = 0; i < geometries.length; i++) {
  const mesh = getAnimatedInteractiveMesh(i);
  sceneGroup.add(mesh);
}

function getAnimatedInteractiveMesh(index) {
  const mesh = new THREE.Mesh(geometries[index], materials[index]);
  mesh.position.z = zPos[index];
  function update(t) {
    if (index < 4) {
      mesh.position.x = Math.cos(t * rate + offsets[index]) * radius;
      mesh.position.y = Math.sin(t * rate + offsets[index]) * radius;
    }
  }
  mesh.userData = {
    update,
  }
  return mesh;
}

// post processing
const scenePass = pass(scene, camera);
scenePass.setMRT(mrt({
  output,
  bloomIntensity: float(0) // default bloom intensity
}));

const outputPass = scenePass.getTextureNode();
const bloomIntensityPass = scenePass.getTextureNode('bloomIntensity');

const bloomPass = bloom(outputPass.mul(bloomIntensityPass));

const postProcessing = new THREE.PostProcessing(renderer);
postProcessing.outputColorTransform = false;
postProcessing.outputNode = outputPass.add(bloomPass).renderOutput();

function animate(t = 0) {
  sceneGroup.userData.update(t);
  // postProcessing.render();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

function handleWindowResize() {
  w = document.body.clientWidth;
  h = document.body.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener('resize', handleWindowResize, false);

// add a preloader
// add sound fx to geos
// subtle rapier physics interactions
// light / dark theme toggle
