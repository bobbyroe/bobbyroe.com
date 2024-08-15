import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

const w = 100;
const h = 100;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 1, 5);
const canvas = document.getElementById('tiny-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias:true });

const geometry = new THREE.IcosahedronGeometry(1.0, 0.0);
const material = new THREE.MeshDepthMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 2;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.0075;
  renderer.render(scene, camera);
}

animate();
