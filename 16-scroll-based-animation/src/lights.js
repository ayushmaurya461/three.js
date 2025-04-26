import * as THREE from "three";
import gui from "./controls/gui";

import parameters from "./parameters";

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

directionalLight.position.x = parameters.directionalLightX;
directionalLight.position.y = parameters.directionalLightY;
directionalLight.position.z = parameters.directionalLightZ;

const lightFolder = gui.addFolder("Directional Light Position");
lightFolder.add(parameters, "directionalLightX", -10, 10, 0.1).onChange(() => {
  directionalLight.position.x = parameters.directionalLightX;
});
lightFolder.add(parameters, "directionalLightY", -10, 10, 0.1).onChange(() => {
  directionalLight.position.y = parameters.directionalLightY;
});
lightFolder.add(parameters, "directionalLightZ", -10, 10, 0.1).onChange(() => {
  directionalLight.position.z = parameters.directionalLightZ;
});

export default directionalLight;
