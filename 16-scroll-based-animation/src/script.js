import * as THREE from "three";
import gui from "./controls/gui";
import directionalLight from "./lights";
import meshes, { particles } from "./meshes";
import gsap from "gsap";
import parameters from "./parameters";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const objectsDistance = 4;

// Create wave effect material
const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uGlow;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Add wave effect
    modelPosition.y += sin(modelPosition.x * 4.0 + uTime) * 0.1;
    modelPosition.x += cos(modelPosition.y * 4.0 + uTime) * 0.1;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    vUv = uv;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uGlow;
  
  void main() {
    vec3 color = uColor;
    color += 0.1 * vec3(sin(vUv.x * 10.0 + uTime), sin(vUv.y * 10.0 + uTime), cos(vUv.x * vUv.y * 5.0 + uTime));
    color += uGlow * 0.5;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const customMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(parameters.materialColor) },
    uGlow: { value: 0 },
  },
});

// Apply custom material to meshes
meshes.forEach((mesh) => {
  mesh.material = customMaterial.clone();
});

scene.add(...meshes, particles);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

scene.add(directionalLight);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;

  // Update mouse position for raycaster
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

let currentSection = 0;
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);
  if (newSection !== currentSection) {
    currentSection = newSection;

    // Color transition
    const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF0000"];
    gsap.to(parameters, {
      materialColor: colors[currentSection % colors.length],
      duration: 1,
      onUpdate: () => {
        meshes.forEach((mesh) => {
          mesh.material.uniforms.uColor.value.set(parameters.materialColor);
        });
        particles.material.color.set(parameters.materialColor);
      },
    });

    // Scale pulse animation
    gsap.to(meshes[currentSection].scale, {
      duration: 0.6,
      x: 1.2,
      y: 1.2,
      z: 1.2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    });

    // Rotation animation with twist
    gsap.to(meshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      y: "+=6",
      x: "+=6",
      z: "+=3",
      onUpdate: () => {
        // Add twist effect
        const progress = gsap.getProperty(meshes[currentSection].rotation, "y") % (Math.PI * 2);
        meshes[currentSection].geometry.vertices?.forEach((vertex, i) => {
          const twistAmount = Math.sin(progress + i * 0.1) * 0.1;
          vertex.z += twistAmount;
        });
        meshes[currentSection].geometry.verticesNeedUpdate = true;
      }
    });
  }
});

// Add glow effect on hover
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Animations
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update materials
  meshes.forEach((mesh) => {
    mesh.material.uniforms.uTime.value = elapsedTime;
  });

  // Animate meshes
  for (const mesh of meshes) {
    mesh.rotation.y += deltaTime * 0.1;
    mesh.rotation.x += deltaTime * 0.12;
  }

  // Animate particles in a pattern
  particles.rotation.y = elapsedTime * 0.02;
  particles.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
  
  // Make particles move in a figure-8 pattern
  const particlePositions = particles.geometry.attributes.position.array;
  for(let i = 0; i < particlePositions.length; i += 3) {
    const x = particlePositions[i];
    const y = particlePositions[i + 1];
    const z = particlePositions[i + 2];
    
    particlePositions[i] = x + Math.sin(elapsedTime + y) * 0.01;
    particlePositions[i + 2] = z + Math.cos(elapsedTime + y) * 0.01;
  }
  particles.geometry.attributes.position.needsUpdate = true;

  // Check for mesh hover and add glow effect
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(meshes);
  
  meshes.forEach(mesh => {
    if(mesh.material.uniforms.uGlow) {
      mesh.material.uniforms.uGlow.value *= 0.95; // Fade out glow
    }
  });

  if(intersects.length > 0) {
    const mesh = intersects[0].object;
    if(!mesh.material.uniforms.uGlow) {
      mesh.material.uniforms.uGlow = { value: 0 };
    }
    mesh.material.uniforms.uGlow.value = 1;
  }

  // Mouse distortion effect
  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;

  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 3 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 3 * deltaTime;

  // Add subtle camera rotation based on mouse
  camera.rotation.z = cursor.x * 0.05;
  camera.rotation.x = cursor.y * 0.05;

  camera.position.y = -(window.scrollY / sizes.height) * objectsDistance;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
