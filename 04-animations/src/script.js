"use strict";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// let time = Date.now();

const clock = new THREE.Clock();

// console.log(gsap);
gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });


const tick = () => {
  //   mesh.rotation.y += 0.01;
  //   mesh.rotation.z += 0.01;
  //   const CurrentTime = Date.now();

  //   const deltaTime = CurrentTime - time;
  //   time = CurrentTime;

  const elapsedTime = clock.getElapsedTime();
  //   mesh.rotation.y += 0.001 * deltaTime;
  //   mesh.rotation.z += 0.0001 * deltaTime;
  //   console.log(mesh.rotation.y, mesh.rotation.z);

  mesh.rotation.y = elapsedTime;
//   mesh.rotation.z = elapsedTime;
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

 tick();
