import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
const canvas = document.getElementById('tiny-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias:true });
renderer.antialias = true;
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;
  renderer.render(scene, camera);
}

animate();
