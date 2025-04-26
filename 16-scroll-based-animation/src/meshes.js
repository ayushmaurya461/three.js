import * as THREE from "three";
import parameters from "./parameters";
import gui from "./controls/gui";

const textureLoader = new THREE.TextureLoader();
const texture3 = textureLoader.load("/textures/gradients/3.jpg");
const texture5 = textureLoader.load("/textures/gradients/5.jpg");

texture3.magFilter = THREE.NearestFilter;
texture5.magFilter = THREE.NearestFilter;

const objectsDistance = 4;

const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: texture3,
});
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
mesh1.position.x = 2;

const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
mesh2.position.x = -2;

const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
);
mesh3.position.x = 2;

mesh1.position.y = objectsDistance * 0;
mesh2.position.y = -objectsDistance * 1;
mesh3.position.y = -objectsDistance * 2;

const meshes = [mesh1, mesh2, mesh3];

const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] =
    objectsDistance * 0.5 - Math.random() * objectsDistance * meshes.length;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: parameters.materialColor,
  sizeAttenuation: true,
});

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
export const particles = new THREE.Points(particlesGeometry, particlesMaterial);

gui.addColor(material, "color").onChange((e) => {
  particlesMaterial.color.set(e);
});

export default [...meshes];
