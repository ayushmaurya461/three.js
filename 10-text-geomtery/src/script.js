import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// light

const light = new THREE.PointLight("#ffffff", 1);
light.position.set(0, 0, 3);
const helper = new THREE.PointLightHelper(light, 0.1);
scene.add(helper); 
scene.add(light);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
// const matcapTexture = textureLoader.load("textures/matcaps/7.png");
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeomerty = new TextGeometry("Ayush \n Loves \n Aakansha", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const text = new THREE.Mesh(textGeomerty, material);
  //   textGeomerty.computeBoundingBox();
  //   const { max } = textGeomerty.boundingBox;
  //   textGeomerty.translate(-max.x * 0.5, -max.y * 0.5, -max.z * 0.5);
  textGeomerty.center();
  scene.add(text);
});

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
for (let i = 0; i < 500; i++) {
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20
  );
  const randomValue = Math.random();
  cube.scale.x = randomValue;
  cube.scale.y = randomValue;
  cube.scale.z = randomValue;
  //   cube.rotation.x = Math.random() * Math.PI;
  //   cube.rotation.y = Math.random() * Math.PI;
  scene.add(cube);
}

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

gui.add(light, "intensity").min(0).max(1).step(0.01);
gui.add(light.position, "x").min(-20).max(20).step(0.01);
gui.add(light.position, "y").min(-5).max(20).step(0.01);
gui.add(light.position, "z").min(-5).max(20).step(0.01);
gui.add(material, "metalness").min(0).max(1).step(0.01);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
