import * as THREE from "three";
import gui from "../controls";

const ambientLight = new THREE.AmbientLight("#b9d4ff", 0.4);
const moonLight = new THREE.DirectionalLight("#ffffff", 0.12);
moonLight.position.set(4, 5, -2);
const pointLight = new THREE.PointLight("#ff9933", 4);
pointLight.decay = 2;
pointLight.distance = 6;

// **Group Ambient Light Controls**
const ambientFolder = gui.addFolder("Ambient Light");
ambientFolder.add(ambientLight, "intensity", 0, 1, 0.001);
ambientFolder.addColor({ color: ambientLight.color.getStyle() }, "color").onChange((val) => {
  ambientLight.color.set(val);
});
ambientFolder.close(); 

// **Group Directional Light Controls**
const moonLightFolder = gui.addFolder("Directional Light");
moonLightFolder.add(moonLight, "intensity", 0, 1, 0.001);
moonLightFolder.add(moonLight.position, "x", -5, 5, 0.001);
moonLightFolder.add(moonLight.position, "y", -5, 5, 0.001);
moonLightFolder.add(moonLight.position, "z", -5, 5, 0.001);
moonLightFolder.close();


export default { ambientLight, moonLight, pointLight };
