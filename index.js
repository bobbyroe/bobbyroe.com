import * as THREE from "three";
import getLayer from "./src/getLayer.js";
import { OBJLoader } from "jsm/loaders/OBJLoader.js";
import getStarfield from "./src/getStarfield.js";
import { RoundedBoxGeometry } from "jsm/geometries/RoundedBoxGeometry.js";

const parent = document.getElementsByTagName('header')[0];
let parentRect = parent.getBoundingClientRect();
const w = parentRect.width;
const h = parentRect.height;
console.log(parentRect);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2b192e);
const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
camera.position.z = 7;
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(w, h);

let scrollPosY = 0;
function initScene({ geo }) {
  const geometry = new RoundedBoxGeometry();
//   geometry.center();
  const texLoader = new THREE.TextureLoader();
  const material = new THREE.MeshMatcapMaterial({
    matcap: texLoader.load('./assets/blue.jpg'),
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(2.5, 0.0, 0);
  scene.add(mesh);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(hemiLight);

  const gradientBackground = getLayer({
    hue: 0.0,
    numSprites: 8,
    opacity: 0.1,
    radius: 10,
    size: 24,
    z: -10.5,
  });
  // scene.add(gradientBackground);

  const stars = getStarfield({ numStars: 4500 });
  // scene.add(stars);

  let goalPos = 0;
  const rate = 0.1;
  function animate() {
    requestAnimationFrame(animate);
    goalPos = Math.PI * scrollPosY;;
    mesh.rotation.y -= (mesh.rotation.y - (goalPos * 1.0)) * rate;
    stars.position.z -= (stars.position.z - goalPos * 8) * rate;
    renderer.render(scene, camera);
  }
  animate();
}
const manager = new THREE.LoadingManager();
const loader = new OBJLoader(manager);
let sceneData = {};
manager.onLoad = () => initScene(sceneData);
loader.load("./assets/astronaut.obj", (obj) => {
  let geometry;
  obj.traverse((child) => {
    if (child.type === "Mesh") {
      geometry = child.geometry;
    }
  });
  sceneData.geo = geometry;
});

window.addEventListener("scroll", () => {
  scrollPosY = (window.scrollY / document.body.clientHeight);
});

function handleWindowResize() {
  parentRect = parent.getBoundingClientRect();
  camera.aspect = parentRect.width / parentRect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(parentRect.width, parentRect.height);
}
window.addEventListener('resize', handleWindowResize, false);