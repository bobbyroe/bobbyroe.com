import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import * as TWEEN from "./js/tween.esm.js";
import { getPlane } from "./js/getPlane.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 1;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
let isPaused = false;

function init(props) {

  const { chapters, duration } = props;
  function getPlaneManager() {
    let currentIndex = 0;
    let planes = [];
    let { numPlanes } = chapters[currentIndex];
    function init() {
      for (let i = 0; i < numPlanes; i += 1) {
        addPlane({ index: i, numPlanes, ...chapters[currentIndex]});
      }
    }
    function addPlane(opts) {
      let plane = getPlane(opts);
      planes.push(plane);
      scene.add(plane.mesh);
    }
    function update(t) {
      planes.forEach((p) => p.update(t));
    }
    function transition() {
      
      if (currentIndex >= chapters.length) {
        currentIndex = 0;
      }
      planes.forEach((p) =>
        p.transition(chapters[currentIndex])
      );
      currentIndex += 1;
    }
    return { init, update, transition };
  }

  const planeManager = getPlaneManager();
  planeManager.init();

  let nextTime = 0;
  function animate(timeStep) {
    requestAnimationFrame(animate);
    planeManager.update(timeStep * 1);
    if (timeStep > nextTime && !isPaused) {
      planeManager.transition();
      nextTime = timeStep + duration;
    }
    TWEEN.update();
    renderer.render(scene, camera);
  }
  animate(0);

  window.addEventListener("keyup", (evt) => {
    let key = evt.key;
    const SPACE = " ";
    if (key === SPACE) {
      isPaused = !isPaused;
    }
  });
  
}

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);


fetch("./index.json")
  .then((response) => response.text())
  .then((text) => init(JSON.parse(text))); // START
