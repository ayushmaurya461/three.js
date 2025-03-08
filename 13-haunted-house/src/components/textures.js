import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

const doorAlpha = textureLoader.load("textures/door/alpha.jpg");
const doorAAmbient = textureLoader.load("textures/door/ambientOcclusion.jpg");
const doorheight = textureLoader.load("textures/door/height.jpg");
const doorNormal = textureLoader.load("textures/door/normal.jpg");
const doorColor = textureLoader.load("textures/door/color.jpg");
const doorMetalness = textureLoader.load("textures/door/metalness.jpg");
const doorRoughness = textureLoader.load("textures/door/roughness.jpg");

const coloredBricks = textureLoader.load("textures/bricks/color.jpg");
const ambientOcclusionBricks = textureLoader.load(
  "textures/bricks/ambientOcclusion.jpg"
);
const normalBricks = textureLoader.load("textures/bricks/normal.jpg")
const roughnessBricks = textureLoader.load("textures/bricks/roughness.jpg")

const coloredGrass = textureLoader.load("textures/grass/color.jpg");
const ambientOcclusionGrass = textureLoader.load(
  "textures/grass/ambientOcclusion.jpg"
);
const normalGrass = textureLoader.load("textures/grass/normal.jpg")
const roughnessGrass = textureLoader.load("textures/grass/roughness.jpg")

export default {
  coloredGrass,
  coloredBricks,
  ambientOcclusionBricks,
  doorAAmbient,
  doorAlpha,
  doorColor,
  doorNormal,
  doorMetalness,
  doorRoughness,
  doorheight,
  normalBricks,
  roughnessBricks,
  ambientOcclusionBricks,
  roughnessGrass,
  normalGrass,
  ambientOcclusionGrass  
};
