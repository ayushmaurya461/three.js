// Canvas
import THREE from "./three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import scene from "./utils/scene";
import objects from "./utils/objects";
import * as dat from "dat.gui";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(-3, 3, 3);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const objectsToUpdate = [];
const gui = new dat.GUI();
const debugObject = {};

debugObject.createSphere = () => {
  const { mesh, body } = objects.createSphere(Math.random() * 1, {
    x: (Math.random() - 0.5) * 3,
    y: Math.random() * 3 + 0.5,
    z: (Math.random() - 0.5) * 3,
  });
  objectsToUpdate.push({ mesh, body });
};

debugObject.createBox = () => {
  const { mesh, body } = objects.createBox(
    {
      x: Math.random() * 1,
      y: Math.random() * 1,
      z: Math.random() * 1,
    },
    {
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 3 + 0.5,
      z: (Math.random() - 0.5) * 10,
    }
  );
  objectsToUpdate.push({ mesh, body });
};

debugObject.reset = () => {
  for (const object of objectsToUpdate) {
    object.mesh.geometry.dispose();
    scene.remove(object.mesh);
    objects.world.removeBody(object.body);
  }
  objectsToUpdate.length = 0;
};

gui.add(debugObject, "createSphere");
gui.add(debugObject, "createBox");
gui.add(debugObject, "reset");

//sphere
// const sphereShape = new CANNON.Sphere(0.5);
// const sphereBody = new CANNON.Body({
//   mass: 1,
//   position: new CANNON.Vec3(0, 3, 0),
//   shape: sphereShape,
//   material: plasticMaterial,
// });
// sphereBody.applyLocalForce(
//   new CANNON.Vec3(120, 0, 1),
//   new CANNON.Vec3(0, 0, 0)
// );
// world.addBody(sphereBody);

// const sphere = objects.createSphere(0.5, new THREE.Vector3(0, 3, 0));
// const sphere2 = objects.createSphere(0.5, new THREE.Vector3(2, 3, 2));
// objectsToUpdate.push({ mesh: sphere.mesh, body: sphere.body });
// objectsToUpdate.push({ mesh: sphere2.mesh, body: sphere2.body });

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

camera.position.z = 3;

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
scene.add(camera);

const clock = new THREE.Clock();
let oldElapsedTime = 0;
function tick() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;
  //   update Physics
  objects.world.step(1 / 60, deltaTime, 3);

  //   sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);
  //   objects.sphere.position.copy(sphereBody.position);

  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
