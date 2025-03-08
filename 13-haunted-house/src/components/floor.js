import {
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  Float32BufferAttribute,
  RepeatWrapping,
  BoxGeometry,
} from "three";
import THREE from "../three";
import textures from "./textures";

const {
  coloredGrass,
  coloredBricks,
  roughnessBricks,
  normalBricks,
  ambientOcclusionBricks,
  normalGrass,
  roughnessGrass,
  ambientOcclusionGrass,
} = textures;

const configureTexture = (texture) => {
  texture.repeat.set(8, 8);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.needsUpdate = true;
};

const configureBricksTexture = (texture) => {
  const textureCopy = texture.clone();
  textureCopy.repeat.set(4, 1);
  textureCopy.wrapS = RepeatWrapping;
  textureCopy.wrapT = RepeatWrapping;
  textureCopy.needsUpdate = true;

  return textureCopy;
};

configureTexture(coloredGrass);
configureTexture(normalGrass);
configureTexture(roughnessGrass);
configureTexture(ambientOcclusionGrass);

const repeatedColoredBricks = configureBricksTexture(coloredBricks);
const repeatedRoughnessBricks = configureBricksTexture(roughnessBricks);
const repeatedNormalBricks = configureBricksTexture(normalBricks);
const repeatedAmbientOcclusionBricks = configureBricksTexture(
  ambientOcclusionBricks
);

const floor = new Group();

const base = new Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    side: DoubleSide,
    map: coloredGrass,
    normalMap: normalGrass,
    roughnessMap: roughnessGrass,
    aoMap: ambientOcclusionGrass,
  })
);

base.geometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(base.geometry.attributes.uv.array, 2)
);
base.rotation.x = -Math.PI * 0.5;
base.position.y = -0.25;

// Walls

const wallMaterial = new MeshStandardMaterial({
  side: DoubleSide,
  map: repeatedColoredBricks,
  aoMap: repeatedAmbientOcclusionBricks,
  normalMap: repeatedNormalBricks,
  roughnessMap: repeatedRoughnessBricks,
  roughness: 1,
});

const rightWall = new Mesh(new BoxGeometry(20, 1.5, 0.2), wallMaterial);
rightWall.position.set(10, 0.5, 0);
rightWall.rotation.y = Math.PI * 0.5;

const leftWall = new Mesh(new BoxGeometry(20, 1.5, 0.2), wallMaterial);
leftWall.position.set(-10, 0.5, 0);
leftWall.rotation.y = Math.PI * 0.5;

const backWall = new Mesh(new BoxGeometry(20, 1.5, 0.2), wallMaterial);
backWall.position.set(0, 0.5, -10);

const frontWall = new Mesh(new BoxGeometry(16, 1.5, 0.2), wallMaterial);
frontWall.position.set(-2, 0.5, 10);

floor.add(base, rightWall, frontWall, leftWall, backWall);
export default floor;
