import THREE from "./three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import scene from "./scene";
import camera from "./camera";
import gui from "./controls";
import house from "./components/house";

const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#08001A");

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mouse click event listener
window.addEventListener("click", (event) => {
  if (event.touches && event.touches.length > 0) {
    // Ignore touch events
    return;
  }

  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const intersectionPoint = intersects[0].point;
    controls.target.copy(intersectionPoint);
    camera.lookAt(house)
    // camera.position.copy(intersectionPoint).add(new THREE.Vector3(0, 5, 10));
  }
});
//Animations
const clock = new THREE.Clock();

controls.touches = {
  ONE: THREE.TOUCH.ROTATE,  // One finger rotates
  TWO: THREE.TOUCH.DOLLY_ROTATE, // Two fingers zoom and pan
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
