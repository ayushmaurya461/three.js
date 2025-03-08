import {
  Group,
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
  ConeGeometry,
  DoubleSide,
  PointLight,
  Float32BufferAttribute,
  BoxGeometry,
} from "three";
import textures from "./textures";

//Walls
const wallMaterial = new MeshStandardMaterial({
  side: DoubleSide,
  map: textures.coloredBricks,
  aoMap: textures.ambientOcclusionBricks,
  normalMap: textures.normalBricks,
  roughnessMap: textures.roughnessBricks,
});

const house = new Group();
const wallFront = new Mesh(new PlaneGeometry(6, 2.5), wallMaterial);
wallFront.position.set(0, 1, -2);
wallFront.geometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(wallFront.geometry.attributes.uv.array, 2)
);

const wallBack = new Mesh(new PlaneGeometry(6, 2.5), wallMaterial);
wallBack.position.set(0, 1, 2);
wallBack.geometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(wallBack.geometry.attributes.uv.array, 2)
);

const wallRight = new Mesh(new PlaneGeometry(4, 2.5), wallMaterial);
wallRight.position.set(-3, 1, 0);
wallRight.rotation.y = Math.PI * 0.5;
wallRight.geometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(wallRight.geometry.attributes.uv.array, 2)
);

const wallLeft = new Mesh(new PlaneGeometry(4, 2.5), wallMaterial);
wallLeft.position.set(3, 1, 0);
wallLeft.rotation.y = Math.PI * 0.5;
wallLeft.geometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(wallLeft.geometry.attributes.uv.array, 2)
);

const base = new Mesh(
  new BoxGeometry(7, 5, 0.04),
  new MeshStandardMaterial({ color: "#550c0c", side: DoubleSide })
);
base.position.set(0, -0.25);
base.rotation.x = -Math.PI * 0.5;

const roof = new Group();
const roofMaterial = new MeshStandardMaterial({
  color: "#2e0007",
  side: DoubleSide,
});

const roofPlane = new Mesh(new PlaneGeometry(7, 5), roofMaterial);
roofPlane.position.set(0, 2.2);
roofPlane.rotation.x = -Math.PI * 0.5;

const roofRight = new Mesh(new ConeGeometry(3.5, 3.5, 2), roofMaterial);
roofRight.rotation.z = Math.PI * 0.255;
roofRight.rotation.y = Math.PI * 0.5;
roofRight.position.set(0, 3.4, -1.25);

const roofLeft = new Mesh(new ConeGeometry(3.5, 3.5, 2), roofMaterial);
roofLeft.rotation.z = Math.PI * 0.255;
roofLeft.rotation.y = -Math.PI * 0.5;
roofLeft.position.set(0, 3.4, 1.25);

const roofBack = new Mesh(new ConeGeometry(2.5, 4.25, 2), roofMaterial);
roofBack.rotation.z = Math.PI * 0.305;
roofBack.position.set(1.78, 3.4, 0);

const roofFront = new Mesh(new ConeGeometry(2.5, 4.25, 2), roofMaterial);
roofFront.rotation.z = -Math.PI * 0.305;
roofFront.position.set(-1.78, 3.4, 0);

roof.add(roofLeft, roofRight, roofPlane, roofBack, roofFront);

const door = new Mesh(
  new PlaneGeometry(1.3, 1.5, 100, 100),
  new MeshStandardMaterial({
    map: textures.doorColor,
    transparent: true,
    alphaMap: textures.doorAlpha,
    aoMap: textures.doorAAmbient,
    displacementMap: textures.doorheight,
    displacementScale: 0.1,
    normalMap: textures.doorNormal,
    metalnessMap: textures.doorMetalness,
    roughnessMap: textures.doorRoughness,
  })
);
door.position.set(1, 0.44, 1.98);
door.geometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

const doorLight = new PointLight("#E67300", 2, 6);
doorLight.position.set(0, 1.4, 3);
doorLight.rotation.y = 120;

house.add(
  wallFront,
  wallBack,
  wallRight,
  wallLeft,
  roof,
  door,
  base,
  doorLight
);
house.position.set(-6, 0, -7);
export default house;
