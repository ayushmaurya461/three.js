import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import seaVertexShader from "./water/vertex.glsl";
import seaFragmentShader from "./water/fragment.glsl";
import createGUI from "./debug.js";

const aspectRatio = window.innerWidth / window.innerHeight;
const canvas = document.querySelector("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
const controls = new OrbitControls(camera, canvas);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
controls.enableDamping = true;
camera.position.set(0, 0, -3.75);
scene.add(camera);

const debugObject = {
  depthColor: "#186691",
  surfaceColor: "#9bd8ff",
};

const planeGeometry = new THREE.PlaneGeometry(2, 2, 1024, 1024);
const material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  vertexShader: seaVertexShader,
  fragmentShader: seaFragmentShader,
  uniforms: {
    uWaveElevation: { value: 0.2 },
    uWaveFrequency: { value: new THREE.Vector2(4, 1.5) },
    uSpeed: { value: 0.5 },
    uTime: { value: 0 },

    uSmallWaveElevation: { value: 0.2 },
    uSmallWaveFrequency: { value: 3 },
    uSmallWaveSpeed: { value: 0.2 },
    uSmallWaveIteration: { value: 4 },

    uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
    uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
    uColorOffset: { value: 0.89 },
    uColorMultiplier: { value: 2.26 },
  },
});

const mesh = new THREE.Mesh(planeGeometry, material);
mesh.rotation.set(1, 0, 0.25);
scene.add(mesh);
createGUI(material, debugObject);

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
