import THREE from "../three";
import scene from "./scene";
import * as CANNON from "cannon";

const audio = new Audio("sounds/hit.mp3");
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);

const playHitSound = (collision) => {
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();
  if (impactStrength > 1.5) {
    audio.volume = Math.min(1, impactStrength / 10);
    audio.currentTime = 0; 
    audio.play();
  }
};
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
const defaultMaterial = new CANNON.Material("concrete");
const hardMaterial = new CANNON.Material("iron");
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.4,
    restitution: 0.7,
  }
);

const hardContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  hardMaterial,
  {
    friction: 0.4,
    restitution: 0,
  }
);
world.addContactMaterial(defaultContactMaterial);
world.addContactMaterial(hardContactMaterial);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
    side: THREE.DoubleSide,
  })
);

floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
  mass: 0,
  material: defaultMaterial,
});
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
floorBody.addShape(floorShape);
world.addBody(floorBody);

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const meshStandardMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
  envMapIntensity: 0.5,
});

const createSphere = (radius, position) => {
  //Three.js sphere
  const mesh = new THREE.Mesh(sphereGeometry, meshStandardMaterial);
  mesh.scale.set(radius, radius, radius);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  // Cannon.js sphere
  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(position.x, position.y, position.z),
    shape,
    material: defaultMaterial,
  });
  body.position.copy(position);
  body.addEventListener("collide", playHitSound);
  body.addShape(shape);
  world.addBody(body);

  return {
    mesh,
    body,
  };
};

const createBox = (size, position) => {
  const mesh = new THREE.Mesh(boxGeometry, meshStandardMaterial);
  mesh.scale.set(size.x, size.y, size.z);
  mesh.position.copy(position);
  mesh.castShadow = true;
  scene.add(mesh);

  const halfExtents = new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2);
  const boxShape = new CANNON.Box(halfExtents);
  const boxBody = new CANNON.Body({
    mass: 1,
    shape: boxShape,
    material: hardMaterial,
    position: new CANNON.Vec3(position.x, position.y, position.z),
  });
  boxBody.addEventListener("collide", playHitSound);
  boxBody.position.copy(mesh.position);
  boxBody.addShape(boxShape);
  world.addBody(boxBody);

  return { mesh, body: boxBody };
};

//Exports
export default {
  floor,
  world,
  createSphere,
  createBox,
  defaultMaterial,
  defaultContactMaterial,
};
