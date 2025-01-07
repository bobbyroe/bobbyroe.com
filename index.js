import * as THREE from "three";
import getLayer from "./src/getLayer.js";
import { UltraHDRLoader } from 'jsm/loaders/UltraHDRLoader.js';
import { TeapotGeometry } from 'jsm/geometries/TeapotGeometry.js';
import { RoundedBoxGeometry } from 'jsm/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

const body = document.body;
let w = body.clientWidth;
let h = body.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2b192e);
const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
camera.position.z = 25;
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(w, h);

let scrollPosY = 0;


const hdrLoader = new UltraHDRLoader();
hdrLoader.load('src/envs/san_giuseppe_bridge_2k.jpg', (hdr) => {
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = hdr;
});

const glbLoader = new GLTFLoader();
const texLoader = new THREE.TextureLoader();

// load duck
const duckGlb = await glbLoader.loadAsync('./src/Duck.glb');
let duckMaterial = null;
let duckGeometry = null;
duckGlb.scene.traverse((child) => {
  if (child.isMesh) {
    duckMaterial = child.material.clone();
    duckGeometry = child.geometry.clone();
    duckGeometry.scale(0.01, 0.01, 0.01);
  }
});

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
    map: texLoader.load('./src/wood/baseColor.png'),
    roughnessMap: texLoader.load('./src/wood/roughness.png'),
    normalMap: texLoader.load('./src/wood/normal.png'),
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
  // wireframe material
  new THREE.LineBasicMaterial({
    color: 0x44ccff,
  }),
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
  new THREE.IcosahedronGeometry(0.75, 2),
  duckGeometry,
  new THREE.EdgesGeometry(new THREE.SphereGeometry(0.75, 16, 16), 1),
  new TeapotGeometry(0.6),
];
const offsets = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5, Math.PI * 2, 0, 0];
const zPos = [0, 0, 0, 0, 2, -2];
const radius = 2;
let rate = 0.0001;

const sceneGroup = new THREE.Group();
sceneGroup.position.set(2.0, 5.0, 0.0);
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
  const geo = geometries[index];
  let mesh = new THREE.Mesh(geometries[index], materials[index]);
  if (geo.type === "EdgesGeometry") {
    mesh = new THREE.LineSegments(geo, materials[index]);
  }
  mesh.position.z = zPos[index];
  function update(t) {
    if (index < 4) {
      mesh.position.x = Math.cos(t * rate + offsets[index]) * radius;
      mesh.position.y = Math.sin(t * rate + offsets[index]) * radius;
    }
  }
  function toggle(isPointerDown) {
    mesh.material.wireframe = isPointerDown;
  }
  mesh.userData = {
    update,
    toggle,
  }
  return mesh;
}

const gradientBackground = getLayer({
  hue: 0.0,
  numSprites: 8,
  opacity: 0.2,
  radius: 10,
  size: 24,
  z: -20.5,
});
scene.add(gradientBackground);

let goalPos = 0;
const moveRate = 0.1;
function animate(t = 0) {
  requestAnimationFrame(animate);
  goalPos = Math.PI * scrollPosY;
  sceneGroup.userData.update(t);
  // mesh.rotation.y -= (mesh.rotation.y - (goalPos * 1.0)) * moveRate;
  // stars.position.z -= (stars.position.z - goalPos * 8) * moveRate;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("scroll", () => {
  scrollPosY = (window.scrollY / document.body.clientHeight);
});

function handleWindowResize() {
  w = document.body.clientWidth;
  h = document.body.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', handleWindowResize, false);